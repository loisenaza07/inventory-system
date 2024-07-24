<?php

namespace Database\Seeders;

use App\Models\Jabatan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class JabatanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Jabatans
        Jabatan::create([
            'id' => Str::uuid(),
            'jabatan' => 'Manager',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Jabatan::create([
            'id' => Str::uuid(),
            'jabatan' => 'Staff',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
