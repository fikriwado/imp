<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'name' => 'Moch Fikri Khoirurrizal',
                'email' => 'dev.admin@gmail.com',
                'password' => bcrypt('123123123')
            ]
        ];

        foreach ($data as $item) {
            User::updateOrCreate(['email' => $item['email']], $item);
        }
    }
}
