<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('jenis_barangs')) {
            Schema::create('jenis_barangs', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('jenis_barang');
                $table->timestamps();
            });
        }

        if (!Schema::hasTable('jenis_layanans')) {
            Schema::create('jenis_layanans', function (Blueprint $table) {
                $table->uuid("id")->primary();
                $table->string('jenis_layanan');
                $table->timestamps();
            });
        }

        Schema::create('barangs', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('kode_barang')->unique();
            $table->string('nama_barang');
            $table->string('nup');
            $table->string('kondisi');
            $table->string('merek');
            $table->dateTime('tgl_perolehan');
            $table->integer('nilai_perolehan_pertama');
            $table->integer('pemegang_bmn');
            $table->uuid("user_id")->nullable(false);
            $table->uuid("jenis_barang_id")->nullable(false);
            $table->uuid("ruangan_id")->nullable(false);
            $table->foreign("user_id")->references("id")->on("users");
            $table->foreign("jenis_barang_id")->references("id")->on("jenis_barangs");
            $table->foreign("ruangan_id")->references("id")->on("ruangans");
            $table->timestamps();
        });

        Schema::create('pengaduans', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->longText('keterangan');
            $table->string("hasil_perbaikan")->nullable();
            $table->string('status')->nullable(false)->default("pending");
            $table->dateTime('waktu_penyelesaian')->nullable();
            $table->uuid("pelapor_user_id")->nullable(false);
            $table->uuid("petugas_user_id")->nullable();
            $table->uuid("barang_id")->nullable(false);
            $table->uuid("layanan_id")->nullable(false);
            $table->foreign("pelapor_user_id")->references("id")->on("users");
            $table->foreign("petugas_user_id")->references("id")->on("users");
            $table->foreign("barang_id")->references("id")->on("barangs");
            $table->foreign("layanan_id")->references("id")->on("jenis_layanans");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduans');
        Schema::dropIfExists('barangs');
        Schema::dropIfExists('jenis_layanans');
        Schema::dropIfExists('jenis_barangs');
    }
};
