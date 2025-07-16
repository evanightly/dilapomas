<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Create super admin if not exists
        $existingSuperAdmin = User::where('role', User::ROLE_SUPER_ADMIN)->first();

        if (!$existingSuperAdmin) {
            User::create([
                'nip' => 'SUPERADMIN001',
                'name' => 'Super Administrator',
                'email' => 'superadmin@rri.co.id',
                'home_address' => 'Jakarta, Indonesia',
                'role' => User::ROLE_SUPER_ADMIN,
                'password' => Hash::make('password123'),
                'phone_number' => '+62812345678',
            ]);

            $this->command->info('Super Admin created successfully!');
            $this->command->info('NIP: SUPERADMIN001');
            $this->command->info('Email: superadmin@rri.co.id');
            $this->command->info('Password: password123');
        } else {
            $this->command->info('Super Admin already exists!');
        }
    }
}
