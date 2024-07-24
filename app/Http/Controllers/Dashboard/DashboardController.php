<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    //
    public function index()
    {
        $pengaduan = Pengaduan::with(['barang', 'jenisLayanan'])
            ->where('pelapor_user_id', Auth::user()->id)->get();
        return Inertia::render('User/Dashboard/Default', [
            "pengaduan" => $pengaduan
        ]);
    }

    public function adminView()
    {
        $pengaduan = Pengaduan::with(['barang', 'jenisLayanan'])
            ->where('pelapor_user_id', Auth::user()->id)->get();
        return Inertia::render('Admin/Dashboard/Default', [
            "pengaduan" => $pengaduan
        ]);
    }

    public function petugasView()
    {
        $pengaduan = Pengaduan::with(['barang', 'jenisLayanan'])
            ->where('pelapor_user_id', Auth::user()->id)->get();
        return Inertia::render('Petugas/Dashboard/Default', [
            "pengaduan" => $pengaduan
        ]);
    }
}
