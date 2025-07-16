<?php

namespace App\Support\Interfaces;

use Illuminate\Database\Eloquent\Model;

interface UserServiceInterface {
    public function getAllPaginated(array $filters = []);

    public function create(array $data);

    public function findByNip(string $nip);

    public function update($keyOrModel, array $data): ?Model;

    public function delete($keyOrModel): bool;

    public function createSuperAdmin(array $data);
}
