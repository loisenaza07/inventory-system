<?php

namespace App\Http\Controllers\Pengaduan;

use App\Http\Controllers\Controller;
use App\Http\Requests\TambahPengaduanRequest;
use App\Models\Barang;
use App\Models\GambarPengaduan;
use App\Models\JenisLayanan;
use App\Models\Pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TambahPengaduan extends Controller
{
    //

    public function index()
    {
        $layanan = JenisLayanan::all();
        $barang = Barang::where('user_id', Auth::user()->id)->get();
        return Inertia::render('User/Pengaduan/Form/BuatPengaduan', [
            "layanan" => $layanan,
            "barang" => $barang
        ]);
    }

    public function tambahPengaduan(Request $request)
    {
        logger()->info($request);

        $pengaduan = new Pengaduan();
        $pengaduan->keterangan = $request->keterangan;
        $pengaduan->pelapor_user_id = Auth::user()->id;
        $pengaduan->barang_id = $request->barang;
        $pengaduan->layanan_id = $request->layanan;
        $pengaduan->save();

        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images/pengaduan', 'public');
                GambarPengaduan::create([
                    'pengaduan_id' => $pengaduan->id,
                    'path' => $path,
                ]);
            }
        }

        return response()->json([
            'success' => [
                'message' => 'Pengaduan berhasil ditambah',
            ],
        ], 200);
    }

    public function assignPetugas(Request $request)
    {
        // Validate the request
        $request->validate([
            'pengaduan_id' => 'required|exists:pengaduans,id',
            'petugas_layanan_id' => 'required|exists:users,id'
        ]);

        // Find the relevant Pengaduan record
        $pengaduan = Pengaduan::findOrFail($request->pengaduan_id);

        // Assign the petugas_layanan_id
        $pengaduan->petugas_user_id = $request->petugas_layanan_id;

        // Save the changes
        $pengaduan->save();

        return response()->json([
            'success' => [
                'message' => 'Assign ke petugas berhasil',
            ],
        ], 200);
    }
}
