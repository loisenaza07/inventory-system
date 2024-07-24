<?php

namespace Database\Seeders;

use App\Models\Roles;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // Get all roles
        $roles = Roles::all();

        // Get users
        $users = User::all();

        // Define an array to store role_user relationships
        $roleUser = [];

        // Ensure each of the first 4 users gets one distinct role
        foreach ($roles as $index => $role) {
            $user = $users[$index];
            $roleUser[] = [
                'user_id' => $user->id,
                'role_id' => $role->id,
            ];
        }

        // Get the remaining users (those that should have 2 roles each)
        $usersWithTwoRoles = $users->skip(4)->take(3);

        // Assign 2 roles to each of these users
        foreach ($usersWithTwoRoles as $user) {
            $selectedRoles = $roles->random(2);
            foreach ($selectedRoles as $role) {
                $roleUser[] = [
                    'user_id' => $user->id,
                    'role_id' => $role->id,
                ];
            }
        }

        // Insert data into the role_user pivot table
        DB::table('role_user')->insert($roleUser);
    }
}
