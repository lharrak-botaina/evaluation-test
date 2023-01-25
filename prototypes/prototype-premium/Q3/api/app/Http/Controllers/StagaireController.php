<?php

namespace App\Http\Controllers;

use App\Models\stagaire;
use App\Models\stagiaire;
use Illuminate\Http\Request;

class StagaireController extends Controller
{

    public function index()
    {
      return response()->json(stagaire::all());


    }


    public function search(Request $request)
    {
        $Stagiaire= stagaire::where('Nom' ,'LIKE', $request->Nom.'%')->get();

        if(!empty($Stagiaire[0])){
        return ['message'=>$Stagiaire];
    }else{
        return ['message'=>"exist pas"];

    }

    }
    public function list(Request $request,$id)
    {
        $Stagiaire =stagaire::find($id);
        return ['message'=>$Stagiaire];

    }






}
