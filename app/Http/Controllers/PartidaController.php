<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\partida;
use DB;

class PartidaController extends Controller
{
    public function index(){
        $partidas = partida::simplePaginate(25);
        $eventos = DB::table('partida')->select('Event')->distinct()->get();
        $jugadores = DB::table('partida')->select('White')->distinct()->get();

        
        return view('basededatos')->with(
            [
                'partidas' => $partidas,
                'eventos'   => $eventos,
                'jugadores' => $jugadores
            ]
        );
    }

    public function getJugadores(Request $request){
        $partidas = partida::where('White', $request['jugador'])->orWhere('Black', $request['jugador'])->simplePaginate(50);
        $eventos = DB::table('partida')->select('Event')->distinct()->get();
        $jugadores = DB::table('partida')->select('White')->distinct()->get();
        
        $partidas->appends(request()->query());

        return view('basededatos')->with(
            [
                'jugador' => $request['jugador'],
                'partidas' => $partidas,
                'eventos'   => $eventos,
                'jugadores' => $jugadores
            ]
        );
    }

    public function getEventos(Request $request){
        $partidas = partida::where('Event', $request['evento'])->simplePaginate(50);
        $eventos = DB::table('partida')->select('Event')->distinct()->get();
        $jugadores = DB::table('partida')->select('White')->distinct()->get();
        $partidas->appends(request()->query());

        return view('basededatos')->with(
            [
                'evento' => $request['evento'],
                'partidas' => $partidas,
                'eventos'   => $eventos,
                'jugadores' => $jugadores
            ]
        );
    }

    public function getNextDatabaseMove($game){

            $aux = array("White" => DB::select("
                    SELECT LEFT(SUBSTRING(Game,LENGTH('%".$game."%')), InStr(SUBSTRING(Game,LENGTH('%".$game."%')),' ') - 1) as n_move, count(*) as number FROM `partida`
                    WHERE Game LIKE '%".$game."%' AND Result = '1-0'
                    GROUP BY n_move
                    ORDER BY number DESC LIMIT 3;
                "));

            $aux2 = array("Black" => DB::select("
                SELECT LEFT(SUBSTRING(Game,LENGTH('%".$game."%')), InStr(SUBSTRING(Game,LENGTH('%".$game."%')),' ') - 1) as n_move, count(*) as number FROM `partida`
                WHERE Game LIKE '%".$game."%' AND Result = '0-1'
                GROUP BY n_move
                ORDER BY number DESC LIMIT 3;
            "));
        echo json_encode(array_merge($aux, $aux2));

    }

    public function firstDatabaseMove(){
                
            $aux = array("White" => DB::select("
                    SELECT REPLACE(LEFT(SUBSTRING(Game,LENGTH('%%')), InStr(SUBSTRING(Game,LENGTH('%%')),' ') - 1), '.','') as n_move, count(*) as number FROM `partida`
                    WHERE Game LIKE '%%' AND Result = '1-0'
                    GROUP BY n_move
                    ORDER BY number DESC LIMIT 3;
                "));

            $aux2 = array("Black" => DB::select("
                SELECT REPLACE(LEFT(SUBSTRING(Game,LENGTH('%%')), InStr(SUBSTRING(Game,LENGTH('%%')),' ') - 1), '.','') as n_move, count(*) as number FROM `partida`
                WHERE Game LIKE '%%' AND Result = '0-1'
                GROUP BY n_move
                ORDER BY number DESC LIMIT 3;
            "));
        echo json_encode(array_merge($aux, $aux2));
    }

}
