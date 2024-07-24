<?php

namespace Database\Seeders;

use App\Models\Ruangan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class RuanganSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         // Seed Ruangans
         Ruangan::create([
            'id' => Str::uuid(),
            'nama_ruangan' => 'Ruang 1',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Ruangan::create([
            'id' => Str::uuid(),
            'nama_ruangan' => 'Ruang 2',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
