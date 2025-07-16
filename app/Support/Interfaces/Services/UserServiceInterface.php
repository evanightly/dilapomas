<?php

namespace App\Support\Interfaces\Services;

interface UserServiceInterface {
    public function getAllPaginated(array $filters = []);

    public function create(array $data);

    public function findByNip(string $nip);

    public function update(string $nip, array $data);

    public function delete(string $nip);

    public function createSuperAdmin(array $data);
}
