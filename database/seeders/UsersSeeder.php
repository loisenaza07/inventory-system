<?php

namespace Database\Seeders;

use App\Models\Bidang;
use App\Models\Jabatan;
use App\Models\Ruangan;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get necessary data
        $ruangan1 = Ruangan::first();
        $ruangan2 = Ruangan::skip(1)->first();
        $bidangA = Bidang::first();
        $bidangB = Bidang::skip(1)->first();
        $manager = Jabatan::first();
        $staff = Jabatan::skip(1)->first();

        // Users with 1 role each
        $users = [
            [
                'name' => 'John Doe',
                'nip' => '12345',
                'email' => 'john.doe@example.com',
                'ruangan_id' => $ruangan1->id,
                'bidang_id' => $bidangA->id,
                'jabatan_id' => $manager->id,
            ],
            [
                'name' => 'Jane Smith',
                'nip' => '54321',
                'email' => 'jane.smith@example.com',
                'ruangan_id' => $ruangan2->id,
                'bidang_id' => $bidangB->id,
                'jabatan_id' => $staff->id,
            ],
            [
                'name' => 'John Alex',
                'nip' => '11111',
                'email' => 'user.one@example.com',
                'ruangan_id' => $ruangan1->id,
                'bidang_id' => $bidangA->id,
                'jabatan_id' => $staff->id,
            ],
            [
                'name' => 'Avril Laurel',
                'nip' => '22222',
                'email' => 'user.two@example.com',
                'ruangan_id' => $ruangan2->id,
                'bidang_id' => $bidangB->id,
                'jabatan_id' => $manager->id,
            ],
        ];

        // Users with 2 roles each
        $usersWithTwoRoles = [
            [
                'name' => 'User Three',
                'nip' => '33333',
                'email' => 'user.three@example.com',
                'ruangan_id' => $ruangan1->id,
                'bidang_id' => $bidangA->id,
                'jabatan_id' => $staff->id,
            ],
            [
                'name' => 'User Four',
                'nip' => '44444',
                'email' => 'user.four@example.com',
                'ruangan_id' => $ruangan2->id,
                'bidang_id' => $bidangB->id,
                'jabatan_id' => $manager->id,
            ],
            [
                'name' => 'User Five',
                'nip' => '55555',
                'email' => 'user.five@example.com',
                'ruangan_id' => $ruangan1->id,
                'bidang_id' => $bidangA->id,
                'jabatan_id' => $manager->id,
            ],
        ];

        foreach (array_merge($users, $usersWithTwoRoles) as $userData) {
            User::create([
                'id' => Str::uuid(),
                'name' => $userData['name'],
                'nip' => $userData['nip'],
                'email' => $userData['email'],
                'password' => Hash::make('password'),
                'ruangan_id' => $userData['ruangan_id'],
                'bidang_id' => $userData['bidang_id'],
                'jabatan_id' => $userData['jabatan_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
