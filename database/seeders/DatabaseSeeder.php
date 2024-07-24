<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            RolesSeeder::class,
            RuanganSeeder::class,
            BidangSeeder::class,
            JabatanSeeder::class,
            UsersSeeder::class,
            RoleUserSeeder::class,
            JenisBarangSeeder::class,
            JenisLayananSeeder::class,
            BarangsSeeder::class,
            PengaduanSeeder::class,
        ]);
    }
}
