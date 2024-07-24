<?php

namespace Database\Seeders;

use App\Models\Pengaduan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PengaduanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Seed Pengaduans
        $user1 = User::first();
        $user2 = User::skip(1)->first();

        Pengaduan::insert([
            'id' => Str::uuid(),
            'keterangan' => 'Barang rusak perlu diperbaiki',
            'hasil_perbaikan' => 'Barang berhasil diperbaiki',
            'status' => 'Selesai',
            'waktu_penyelesaian' => now(),
            'pelapor_user_id' => $user1->id,
            'petugas_user_id' => $user2->id,
            'barang_id' => DB::table('barangs')->first()->id, // adjust to match existing barang_id
            'layanan_id' => DB::table('jenis_layanans')->first()->id, // adjust to match existing layanan_id
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        Pengaduan::insert([
            'id' => Str::uuid(),
            'keterangan' => 'Perlu pemeliharaan rutin',
            'hasil_perbaikan' => 'Barang sudah mendapatkan pemeliharaan',
            'status' => 'Selesai',
            'waktu_penyelesaian' => now(),
            'pelapor_user_id' => $user2->id,
            'petugas_user_id' => $user1->id,
            'barang_id' => DB::table('barangs')->skip(1)->first()->id, // adjust to match another barang_id
            'layanan_id' => DB::table('jenis_layanans')->skip(1)->first()->id, // adjust to match another layanan_id
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
