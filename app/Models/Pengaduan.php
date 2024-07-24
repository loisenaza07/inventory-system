<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Pengaduan extends Model
{
    use HasFactory;

    public $incrementing = false;

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = (string) Str::uuid();
        });
    }

    public function userPelapor(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pelapor_user_id', 'id');
    }

    public function userPetugas(): BelongsTo
    {
        return $this->belongsTo(User::class, 'petugas_user_id', 'id');
    }

    public function barang(): BelongsTo
    {
        return $this->belongsTo(Barang::class, 'barang_id', 'id');
    }

    public function jenisLayanan(): BelongsTo
    {
        return $this->belongsTo(JenisLayanan::class, 'layanan_id', 'id');
    }

    public function gambar(): HasMany
    {
        return $this->hasMany(GambarPengaduan::class, 'pengaduan_id', 'id');
    }
}
