<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StagaireController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Route::resource('stagaire',StagaireController::class);
// // Route::post('check',[StagaireController::class,'check']);
// Route::get('check/{name_prenom}',[StagaireController::class,'check']);
// Route::post('search',[StagaireController::class,'search']);
// Route::post('add/{id}',[StagaireController::class,'add']);
// Route::delete('delete/{id}',[StagaireController::class,'delete']);
// Route::get('list/{id}',[StagaireController::class,'list']);

Route::get('index',[StagaireController::class,'index']);
Route::post('search',[StagaireController::class,'search']);
Route::get('list/{id}',[StagaireController::class,'list']);
