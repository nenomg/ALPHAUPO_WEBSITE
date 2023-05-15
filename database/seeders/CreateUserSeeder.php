<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use App\Models\User;
   
class CreateUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = [
            [
               'name'=>'admin',
               'email'=>'admin@itsolutionstuff.com',
                'is_admin'=>'1',
               'password'=> bcrypt('admin'),
            ],
            [
               'name'=>'user',
               'email'=>'user@itsolutionstuff.com',
                'is_admin'=>'0',
               'password'=> bcrypt('user'),
            ],
        ];
  
        foreach ($user as $key => $value) {
            User::create($value);
        }
    }
}