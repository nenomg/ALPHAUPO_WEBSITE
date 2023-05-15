<?php

namespace App\Http\Controllers;
use App\Models\partida;
use DB;

use Illuminate\Http\Request;

class AdminPartidaController extends Controller
{

    public function destroy(Request $request){

        
        $partida = DB::delete('delete from partida where Id = '.$request['idPartida']);

        return redirect('/admin/partidas');
    }


    public function editView($id){

    }


    public function index(){
        $partidas = partida::simplePaginate(50);
        return view('portalAdminPartidas')->with('partidas', $partidas);
    }


    public function edit(Request $request){

    }
}
