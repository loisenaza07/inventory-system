<?php

namespace Database\Factories;

use App\Models\Barang;
use App\Models\JenisBarang;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class BarangFactory extends Factory
{
    protected $model = Barang::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // Get all jenis barang IDs
        $kodeBarangIds = JenisBarang::pluck('id')->toArray();
        return [
            'id' => $this->faker->uuid,
            'nama_barang' => Str::random(10),
            'kondisi' => $this->faker->word,
            'merek' => $this->faker->word,
            'tgl_perolehan' => $this->faker->dateTime,
            'nilai_perolehan_pertama' => $this->faker->numberBetween(1000, 100000),
            'merek' => $this->faker->word,
            // 'riwayat_perbaikan' => $this->faker->optional()->dateTime,
            // 'status' => $this->faker->randomElement(['available', 'unavailable', 'in repair']),
            'kode_barang_id' => $this->faker->randomElement($kodeBarangIds),
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
