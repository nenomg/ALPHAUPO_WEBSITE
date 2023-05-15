<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(){
        return view('portalAdmin');
    }

    public function destroy(Request $request){
        $user = User::destroy($request['idUser']);

        return redirect('/admin');
    }


    public function editView($id){
        $user = User::find($id);
        return view('editUser')->with('user', $user);
    }


    public function userView(){
        $users = User::simplePaginate(50);
        return view('portalAdminUsuarios')->with('users', $users);
    }


    public function edit(Request $request){
        $user = User::find($request->idUser);
        $user->name = $request->name;
        $user->email = $request->email;

        if(isset($request->esAdmin)){
            $user->is_admin = 1;
        }else{
            $user->is_admin = 0;
        }

        $user->save();

        return redirect('/admin');
    }
}
