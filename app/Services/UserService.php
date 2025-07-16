<?php

namespace App\Services;

use App\Models\User;
use App\Repositories\UserRepository;
use App\Support\Interfaces\Repositories\UserRepositoryInterface;
use App\Support\Interfaces\Services\UserServiceInterface;
use App\Traits\Services\HandlesPageSizeAll;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserService extends BaseCrudService implements UserServiceInterface {
    use HandlesPageSizeAll;

    public function getAllPaginated(array $search = [], int $pageSize = 15): LengthAwarePaginator {
        $this->handlePageSizeAll();

        return parent::getAllPaginated($search, $pageSize);
    }

    /** @var UserRepository */
    protected $repository;

    protected function getRepositoryClass(): string {
        return UserRepositoryInterface::class;
    }

    public function create(array $data): ?Model {
        // Validate that only one SuperAdmin can exist
        if (isset($data['role']) && $data['role'] === User::ROLE_SUPER_ADMIN) {
            if ($this->repository->countSuperAdmins() > 0) {
                throw ValidationException::withMessages([
                    'role' => ['Only one SuperAdmin can exist in the system.'],
                ]);
            }
        }

        // Hash password if provided
        if (isset($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        }

        return parent::create($data);
    }

    public function findByNip(string $nip) {
        return $this->repository->findByNip($nip);
    }

    public function update($keyOrModel, array $data): ?Model {
        // If keyOrModel is a string (nip), find the user
        if (is_string($keyOrModel)) {
            $user = $this->findByNip($keyOrModel);
            if (!$user) {
                throw new \Exception('User not found');
            }
            $nip = $keyOrModel;
        } else {
            // If keyOrModel is already a model
            $user = $keyOrModel;
            $nip = $user->nip;
        }

        // Validate SuperAdmin role constraint
        if (isset($data['role']) && $data['role'] === User::ROLE_SUPER_ADMIN) {
            $existingSuperAdmin = $this->repository->getSuperAdmin();
            if ($existingSuperAdmin && $existingSuperAdmin->nip !== $nip) {
                throw ValidationException::withMessages([
                    'role' => ['Only one SuperAdmin can exist in the system.'],
                ]);
            }
        }

        // Hash password if provided
        if (isset($data['password']) && $data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        return $this->repository->update($keyOrModel, $data);
    }

    public function delete($keyOrModel): bool {
        // If keyOrModel is a string (nip), find the user
        if (is_string($keyOrModel)) {
            $user = $this->findByNip($keyOrModel);
            if (!$user) {
                throw new \Exception('User not found');
            }
        } else {
            // If keyOrModel is already a model
            $user = $keyOrModel;
        }

        // Prevent deletion of SuperAdmin
        if ($user->isSuperAdmin()) {
            throw ValidationException::withMessages([
                'nip' => ['SuperAdmin cannot be deleted.'],
            ]);
        }

        return parent::delete($keyOrModel);
    }

    public function createSuperAdmin(array $data) {
        // Ensure no SuperAdmin exists
        if ($this->repository->countSuperAdmins() > 0) {
            throw ValidationException::withMessages([
                'role' => ['SuperAdmin already exists in the system.'],
            ]);
        }

        $data['role'] = User::ROLE_SUPER_ADMIN;

        return $this->create($data);
    }
}
