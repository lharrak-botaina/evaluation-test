<?php

namespace App\Http\Controllers;

use App\Models\weather;
use Illuminate\Http\Request;

class WeatherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function CityList()
    {
        $list = weather::all();
        return response()->json([
            'saved' => $list,
        ]);
    }

    public function SaveCity(Request $request) {

        $city =  $request->city;

       $cityData= weather::where('name',$city)->get();
        // dd($cityData);

        if(!empty($cityData[0])){
            return response()->json([
                'status' => 'errur',
            ]);
        }
            else{


        $city_name = $request->input('city');
        $city = new weather();
        $city->name = $city_name;
        $city->save();

        $list = weather::all();

        return response()->json([
            'status' => 'success',
            'saved' => $list
        ]);
    }

    }

    public function checkCity(Request $request) {

        $city =  $request->city;

       $cityData= weather::where('name',$city)->get();
        // dd($cityData);

        if(!empty($cityData[0])){
            return response()->json([
                'status' => 'errur',
            ]);
        }
            else{
        return response()->json([
            'status' => 'success',

        ]);
    }

    }


    public function DeleteCity($id)
    {
        weather::where("id",$id)->delete();
        $list = weather::all();
        return response()->json([
            'saved' => $list,
        ]);

    }
    public function DeleteCityName($name)
    {
        weather::where("name",$name)->delete();
        $list = weather::all();
        return response()->json([
            'saved' => $list,
        ]);

    }




}
