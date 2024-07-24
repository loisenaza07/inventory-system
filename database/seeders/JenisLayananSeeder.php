<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class JenisLayananSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed JenisLayanans
        DB::table('jenis_layanans')->insert([
            'id' => Str::uuid(),
            'jenis_layanan' => 'Barang TI',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('jenis_layanans')->insert([
            'id' => Str::uuid(),
            'jenis_layanan' => 'Layanan TI',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
