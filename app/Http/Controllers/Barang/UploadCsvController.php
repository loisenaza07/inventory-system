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
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UploadCsvController extends Controller
{
    public function index()
    {
        $jenisBarang = JenisBarang::all();
        $ruangan = Ruangan::all();
        $user = User::all();
        $barang = Barang::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Admin/Barang/UploadCsv', [
            "jenis_barang" => $jenisBarang,
            "barang" => $barang,
            "ruangan" => $ruangan,
            "user" => $user
        ]);
    }

    public function uploadCsv(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'jenis_barang' => 'required',
            'merk' => 'required|string|max:255',
            'no_bmn' => 'required|string|max:255',
            'status' => 'required|string',
            'penanggung_jawab' => 'required',
            'ruangan' => 'required',
            'tahun_pengadaan' => 'required|date',
            'nilai_pengadaan' => 'required|numeric',
            'images.*' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'csv_file' => 'nullable|file|mimes:csv,txt',
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
    
        // Process CSV file if exists
        if ($request->hasFile('csv_file')) {
            $csvFile = $request->file('csv_file');
            $csvData = array_map('str_getcsv', file($csvFile->getRealPath()));
    
            $header = $csvData[0];
            $requiredHeaders = [
                'No', 'Kode Satker', 'Nama Satker', 'Kode Barang', 'Nama Barang', 'NUP', 'Kondisi', 'Merek', 'TIPE', 
                'Tgl Perolehan', 'Tgl Awal Pakai', 'Nilai Perolehan Pertama', 'Nilai Mutasi', 'Nilai Perolehan', 
                'Nilai Penyusutan', 'Nilai Buku', 'KUANTITAS', 'Jml Foto', 'Status Penggunaan', 'No PSP', 'Tgl PSP', 
                'No Tiket Usul PSP', 'Intra/Ekstra', 'Status BPYBDS', 'Status Henti Guna', 'Status Kemitraan', 
                'Status Barang Hilang', 'Status Barang DKTP', 'Status Usul Rusak Berat', 'Status Usul Hapus', 
                'Sisa Umur (Semester)', 'Status SAKTI', 'Kode Register SAKTI'
            ];
    
            // Validate CSV headers
            if (array_diff($requiredHeaders, $header)) {
                return response()->json([
                    'errors' => ['csv_file' => 'CSV file header is not valid'],
                ], 422);
            }
    
            $rows = array_slice($csvData, 1);
            foreach ($rows as $index => $row) {
                if (count($row) !== count($requiredHeaders)) {
                    return response()->json([
                        'errors' => ['csv_file' => "CSV file content is not valid at row " . ($index + 2)],
                    ], 422);
                }
    
                // Process each row as necessary
                Barang::create([
                    'jenis_barang_id' => $request->jenis_barang,
                    'merk' => $row[7], // Merek
                    'no_bmn' => $row[5], // NUP
                    'status' => $row[6], // Kondisi
                    'user_id' => $request->penanggung_jawab,
                    'ruangan_id' => $request->ruangan,
                    'tahun_pengadaan' => $row[9], // Tgl Perolehan
                    'nilai_pengadaan' => $row[12], // Nilai Perolehan
                ]);
            }
        } else {
            // If no CSV file, create single Barang entry
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
        }
    
        return response()->json([
            'success' => [
                'message' => 'Barang berhasil ditambah',
            ],
        ], 200);
    }
}
