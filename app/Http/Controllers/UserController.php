<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function index(){
        $users = User::simplePaginate(50);
        return view('portalAdmin')->with('users', $users);
    }

    
}
