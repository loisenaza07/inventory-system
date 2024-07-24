<?php

namespace Database\Seeders;

use App\Models\Bidang;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class BidangSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bidang = [
            [
                "nama_bidang" => "Bagian Umum",
            ],
            [
                "nama_bidang" => "Fungsi Statistik Sosial",
            ],
            [
                "nama_bidang" => "Fungsi Statistik Produksi",
            ],
            [
                "nama_bidang" => "Fungsi Statistik Distribusi",
            ],
            [
                "nama_bidang" => "Fungsi Nerwilis",
            ],
            [
                "nama_bidang" => "Fungsi IPDS",
            ],
            [
                "nama_bidang" => "Pimpinan",
            ],
        ];

        foreach ($bidang as $nama_bidang) {
            Bidang::create([
                'id' => Str::uuid(),
                'nama_bidang' => $nama_bidang['nama_bidang'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
