<?php

namespace App\Http\Controllers\Barang;

use App\Http\Controllers\Controller;
use App\Models\Barang;
use App\Models\GambarBarang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DaftarBarangController extends Controller
{
    //
    public function index()
    {
        $user = Auth::user();
        $barang = Barang::with(['user', 'ruangan', 'jenisBarang', 'gambar'])
            ->where('user_id', Auth::id())
            ->get();

        return Inertia::render('User/Barang/DaftarBarang', [
            'user' => $user,
            'barang' => $barang
        ]);
    }

    public function daftarBarangAdmin()
    {
        $user = Auth::user();
        $barang = Barang::with(['user', 'ruangan', 'jenisBarang', 'gambar'])
            ->get();

        return Inertia::render('Admin/Barang/DaftarBarang', [
            'user' => $user,
            'barang' => $barang
        ]);
    }

    public function details($id)
    {
        $user = Auth::user();
        $barang = Barang::with(['pengaduans.barang', 'pengaduans.userPelapor', 'ruangan', 'jenisBarang', 'gambar', 'user'])
            ->findOrFail($id);
        $allBarang = Barang::with(['pengaduans', 'ruangan', 'jenisBarang', 'gambar', 'user'])
            ->where('id', '!=', $id)
            ->where('user_id', $user->id)
            ->get();

        return Inertia::render('User/Barang/DetailsBarang', [
            'user' => $user,
            'barang' => $barang,
            'semuaBarang' => $allBarang
        ]);
    }

    public function detailsBarangAdmin($id)
    {
        $user = Auth::user();
        $barang = Barang::with(['pengaduans', 'ruangan', 'jenisBarang', 'gambar', 'user'])
            ->findOrFail($id);
        $allBarang = Barang::with(['pengaduans', 'ruangan', 'jenisBarang', 'gambar', 'user'])
            ->where('id', '!=', $id)
            ->get();

        return Inertia::render('Admin/Barang/DetailsBarang', [
            'user' => $user,
            'barang' => $barang,
            'semuaBarang' => $allBarang
        ]);
    }

    public function tambahBarang(Request $request)
    {
        logger()->info($request);

        $barang = new Barang();
        $barang->keterangan = $request->keterangan;
        $barang->pelapor_user_id = Auth::user()->id;
        $barang->barang_id = $request->barang;
        $barang->layanan_id = $request->layanan;
        $barang->save();

        if ($request->has('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('images/pengaduan', 'public');
                GambarBarang::create([
                    'barang_id' => $barang->id,
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
}
