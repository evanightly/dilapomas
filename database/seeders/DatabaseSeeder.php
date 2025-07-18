<?php

namespace Database\Seeders;

use App\Models\Complaint;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    /**
     * Seed the application's database.
     */
    public function run(): void {
        $this->call([
            SuperAdminSeeder::class,
        ]);

        // Complaint::factory(100)->create();
    }
}
