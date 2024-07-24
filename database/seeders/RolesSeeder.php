<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Roles;
use Database\Factories\RolesFactory;
use Illuminate\Support\Str;

class RolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = ['admin', 'user', 'pimpinan', 'petugas_layanan'];

        foreach ($roles as $role) {
            Roles::updateOrCreate(
                ['name' => $role],
                ['id' => (string) Str::uuid()]
            );
        }
    }
}
