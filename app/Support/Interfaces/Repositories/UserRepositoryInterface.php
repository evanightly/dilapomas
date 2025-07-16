<?php

namespace App\Support\Interfaces\Repositories;

interface UserRepositoryInterface extends BaseRepositoryInterface {
    public function findByNip(string $nip);

    public function findByEmail(string $email);

    public function getSuperAdmin();

    public function countSuperAdmins(): int;
}
