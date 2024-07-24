<?php

namespace App\Http\Controllers\Pengaduan;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class RiwayatPengaduanController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang', 'jenisLayanan'])
            ->where('pelapor_user_id', Auth::id())
            ->get();

        return Inertia::render('User/Pengaduan/RiwayatPengaduan', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan
        ]);
    }

    public function details($id)
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang.jenisBarang', 'jenisLayanan', 'gambar'])
            ->findOrFail($id);

        return Inertia::render('User/Pengaduan/Details', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan
        ]);
    }

    public function adminView()
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang', 'jenisLayanan'])
            ->get();

        return Inertia::render('Admin/Pengaduan/RiwayatPengaduan', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan
        ]);
    }

    public function detailsAdmin($id)
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang.jenisBarang', 'jenisLayanan', 'gambar'])
            ->findOrFail($id);
        $petugasLayanan = User::whereHas('roles', function ($query) {
            $query->where('name', 'petugas_layanan');
        })->get();
        return Inertia::render('Admin/Pengaduan/Details', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan,
            "petugas_layanan" => $petugasLayanan
        ]);
    }

    public function petugasView()
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang', 'jenisLayanan'])
            ->where('petugas_user_id', $user->id)
            ->get();

        return Inertia::render('Petugas/Pengaduan/RiwayatPengaduan', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan
        ]);
    }

    public function detailsPetugas($id)
    {
        $user = Auth::user();
        $pengaduan = Pengaduan::with(['userPelapor', 'userPetugas', 'barang.jenisBarang', 'jenisLayanan', 'gambar'])
            ->findOrFail($id);
        $petugasLayanan = User::whereHas('roles', function ($query) {
            $query->where('name', 'petugas_layanan');
        })->get();
        return Inertia::render('Petugas/Pengaduan/Details', [
            'user' => $user,
            'riwayatPengaduan' => $pengaduan,
            "petugas_layanan" => $petugasLayanan
        ]);
    }
}
