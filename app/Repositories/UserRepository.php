<?php

namespace App\Repositories;

use App\Models\User;
use App\Support\Interfaces\Repositories\UserRepositoryInterface;

class UserRepository extends BaseRepository implements UserRepositoryInterface {
    public function __construct(User $model) {
        parent::__construct($model);
    }

    protected function getModelClass(): string {
        return User::class;
    }

    public function findByNip(string $nip) {
        return $this->modelClass->where('nip', $nip)->first();
    }

    public function findByEmail(string $email) {
        return $this->modelClass->where('email', $email)->first();
    }

    public function getSuperAdmin() {
        return $this->modelClass->where('role', User::ROLE_SUPER_ADMIN)->first();
    }

    public function countSuperAdmins(): int {
        return $this->modelClass->where('role', User::ROLE_SUPER_ADMIN)->count();
    }
}
