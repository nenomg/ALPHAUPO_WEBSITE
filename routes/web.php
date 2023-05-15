<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PartidaController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdminPartidaController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/



Route::get('/', function () {
    return view('portada');
})->name('portada');


Route::get('/Play', function () {
    return view('juega');
})->name('juega')->middleware('auth');

Route::get('/Database',[PartidaController::class, 'index'])->name('basededatos')->middleware('auth');
Route::get('/DatabaseEvent',[PartidaController::class, 'getEventos'])->name('basededatosEventos')->middleware('auth');
Route::get('/DatabasePlayer',[PartidaController::class, 'getJugadores'])->name('basededatosJugadores')->middleware('auth');


Route::get('gamenextmove/{game}', [PartidaController::class, 'getNextDatabaseMove'])->name('getNextMoveDatabase')->middleware('auth');
Route::get('gamenextmove', [PartidaController::class, 'firstDatabaseMove'])->name('firstDatabaseMove')->middleware('auth');
Auth::routes();

Route::get('/user/home', [HomeController::class, 'userHome'])->name('user.home')->middleware('auth');

Route::get('/admin/home', [HomeController::class, 'adminHome'])->name('admin.home')->middleware('is_admin');



Route::get('/admin',[AdminController::class, 'index'])->name('admin')->middleware('is_admin');
Route::get('/admin/users',[AdminController::class, 'userView'])->name('admin.users')->middleware('is_admin');

Route::post('/user/delete',[AdminController::class, 'destroy'])->name('admin.delete')->middleware('is_admin');

Route::get('/user/edit/{id}',[AdminController::class, 'editView'])->name('admin.edit')->middleware('is_admin');

Route::post('/user/edit',[AdminController::class, 'edit'])->name('userEdit')->middleware('is_admin');



Route::get('/admin/partidas',[AdminPartidaController::class, 'index'])->name('admin.partidas')->middleware('is_admin');
Route::post('/admin/partidas/delete',[AdminPartidaController::class, 'destroy'])->name('admin.partidas.delete')->middleware('is_admin');