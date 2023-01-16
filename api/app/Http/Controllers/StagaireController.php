<?php

namespace App\Http\Controllers;

use App\Models\stagaire;
use GuzzleHttp\Psr7\Message;
use Illuminate\Http\Request;
use Symfony\Component\Console\Input\Input;

class StagaireController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $stagaire=stagaire::all();

        return $stagaire;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function check(Request $request,$name_prenom)
    {



         $filter = stagaire::where('nom', 'like', '%' . $name_prenom . '%')
                ->orWhere('prenom', 'like', '%'.$name_prenom.'%')
                ->get();
                if($filter->count()>=1){
                    return response()->json([
                        'message' => "existe"
                    ]);
                }
                else{
                    return response()->json([
                        'message' => "n'extest pas"
                    ]);
                }

    }
    public function search(Request $request){
    //     // $searchbar=stagaire::where('nom','Like','%'.$request->searchbar.'%')
    //     // ->orWhere('prenom','Like','%'.$request->searchbar.'%')->get();
    //     // return response(['search'=>$searchbar]);

        $Stagiaire= stagaire::where('nom' ,'LIKE', $request->nom.'%')->get();

        if(!empty($Stagiaire[0])){
        return ['message'=>$Stagiaire];
     }else{
        return ['message'=>"exist pas"];




        // $users = stagaire::all();

        // return [
        //     'data' => $users,
        // ];





    }
}

}
