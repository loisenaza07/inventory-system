<?php

namespace App\Http\Controllers\Barang;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\GambarBarang;
use App\Models\JenisBarang;
use App\Models\Ruangan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TambahBarangController extends Controller
{
    //
    public function index()
    {
        $jenisBarang = JenisBarang::all();
        $ruangan = Ruangan::all();
        $user = User::all();
        $barang = Barang::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Admin/Barang/TambahBarang', [
            "jenis_barang" => $jenisBarang,
            "barang" => $barang,
            "ruangan" => $ruangan,
            "user" => $user
        ]);
    }

    public function tambahBarang(Request $request)
    {
        $barang = new Barang();
        $barang->jenis_barang_id = $request->jenis_barang;
        $barang->merk = $request->merk;
        $barang->no_bmn = $request->no_bmn;
        $barang->status = $request->status;
        $barang->user_id = $request->penanggung_jawab;
        $barang->ruangan_id = $request->ruangan;
        $barang->tahun_pengadaan = $request->tahun_pengadaan;
        $barang->nilai_pengadaan = $request->nilai_pengadaan;
        $barang->save();

        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images/barang', 'public');
                GambarBarang::create([
                    'barang_id' => $barang->id,
                    'path' => $path,
                ]);
            }
        }

        return response()->json([
            'success' => [
                'message' => 'Barang berhasil ditambah',
            ],
        ], 200);
    }
}
