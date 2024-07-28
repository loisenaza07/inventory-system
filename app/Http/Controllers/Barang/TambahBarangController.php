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
        $request->validate([
            'kode_barang' => 'required|string|unique:barangs,kode_barang',
            'nama_barang' => 'required|string',
            'nup' => 'required|string',
            'merek' => 'required|string',
            'tgl_perolehan' => 'required|date',
            'nilai_perolehan_pertama' => 'required|integer',
            'pemegang_bmn' => 'required|integer',
            'jenis_barang' => 'required|uuid',
            'ruangan' => 'required|uuid',
            'penanggung_jawab' => 'required|uuid'
        ]);

        $barang = new Barang();
        $barang->kode_barang = $request->kode_barang;
        $barang->nama_barang = $request->nama_barang;
        $barang->nup = $request->nup;
        $barang->merek = $request->merek;
        $barang->tgl_perolehan = $request->tgl_perolehan;
        $barang->nilai_perolehan_pertama = $request->nilai_perolehan_pertama;
        $barang->pemegang_bmn = $request->pemegang_bmn;
        $barang->jenis_barang_id = $request->jenis_barang;
        $barang->ruangan_id = $request->ruangan;
        $barang->user_id = $request->penanggung_jawab;
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
