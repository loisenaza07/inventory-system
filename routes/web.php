<?php

use App\Http\Controllers\Barang\DaftarBarangController;
use App\Http\Controllers\Barang\TambahBarangController;
use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\HandleRolesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Pengaduan\RiwayatPengaduanController;
use App\Http\Controllers\Pengaduan\TambahPengaduan;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::middleware(['auth', 'verified'])->group(function () {
    Route::redirect('/', "/dashboard");

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/pengaduan/riwayat-pengaduan', [RiwayatPengaduanController::class, 'index'])->name('riwayat-pengaduan');
    Route::get('/pengaduan/riwayat-pengaduan/details/{id}', [RiwayatPengaduanController::class, 'details'])->name('details-riwayat-pengaduan');
   
    Route::get('/pengaduan/buat-pengaduan', [TambahPengaduan::class, 'index'])->name('buat-pengaduan');
    Route::post('/pengaduan/buat-pengaduan', [TambahPengaduan::class, 'tambahPengaduan'])->name('buat-pengaduan');

    Route::get('/barang/daftar-barang', [DaftarBarangController::class, 'index'])->name('daftar-barang');
    Route::get('/barang/daftar-barang/details/{id}', [DaftarBarangController::class, 'details'])->name('details-daftar-barang');
    
    Route::get('/admin/dashboard', [DashboardController::class, 'adminView'])->name('dashboard-admin');

    Route::get('/admin/barang/tambah-barang', [TambahBarangController::class, 'index'])->name('tambah-barang-view');
    Route::post('/admin/barang/tambah-barang', [TambahBarangController::class, 'tambahBarang'])->name('tambah-barang');
   
    Route::get('/admin/barang/daftar-barang', [DaftarBarangController::class, 'daftarBarangAdmin'])->name('daftar-barang-admin');
    Route::get('/admin/barang/daftar-barang/details/{id}', [DaftarBarangController::class, 'detailsBarangAdmin'])->name('details-daftar-barang');

    Route::get('/admin/pengaduan/daftar-pengaduan', [RiwayatPengaduanController::class, 'adminView'])->name('daftar-pengaduan');
    Route::get('/admin/pengaduan/daftar-pengaduan/details/{id}', [RiwayatPengaduanController::class, 'detailsAdmin'])->name('details-daftar-pengaduan');
    Route::post('/admin/pengaduan/assign-petugas', [TambahPengaduan::class, 'assignPetugas'])->name('assign-petugas');
   
    Route::get('/admin/pengaduan/buat-pengaduan', [TambahPengaduan::class, 'index'])->name('buat-pengaduan');
    Route::post('/admin/pengaduan/buat-pengaduan', [TambahPengaduan::class, 'tambahPengaduan'])->name('buat-pengaduan');

    Route::get('/petugas/dashboard', [DashboardController::class, 'petugasView'])->name('dashboard-petugas');

    Route::get('/petugas/pengaduan/daftar-pengaduan', [RiwayatPengaduanController::class, 'petugasView'])->name('daftar-pengaduan-petugas');
    Route::get('/petugas/pengaduan/daftar-pengaduan/details/{id}', [RiwayatPengaduanController::class, 'detailsPetugas'])->name('details-daftar-pengaduan-petugas');
});

require __DIR__ . '/auth.php';

// Fallback route for handling 404 errors
Route::fallback(function () {
    return Inertia::render('Error/404');
});
