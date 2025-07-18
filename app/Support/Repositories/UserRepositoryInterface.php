<?php

namespace App\Support\Repositories;

use App\Support\Interfaces\Repositories\BaseRepositoryInterface;

interface UserRepositoryInterface extends BaseRepositoryInterface {
    public function findByNip(string $nip);

    public function findByEmail(string $email);

    public function getSuperAdmin();

    public function countSuperAdmins(): int;
}
