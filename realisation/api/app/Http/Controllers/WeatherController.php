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

        $city_name = $request->input('city');
        $city = new weather();
        $city->name = $city_name;
        $city->save();

        return response()->json([
            'status' => 'success',
        ]);

    }


    public function DeleteCity($id)
    {
        weather::where("id",$id)->delete();
    }




}
