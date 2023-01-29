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
    public function listLocation()
    {
        $list =weather::all();
        return $list;
    }


    public function location($id)
    {
        $list=weather::where("id",$id)->get();
        return $list;
    }


    public function addToFavorite(Request $request)
    {
        $location=new weather();
        $location->id=$request->id;
        $location->name=$request->name;
        $location->country=$request->country;
        $location->coulds=$request->coulds;
        $location->temp=$request->temp;
        $location->feels_Like=$request->feels_Like;
        $location->humudity=$request->humudity;
        $location->wind=$request->wind;

       $location->save();
    }


    public function delete($id)
    {
        weather::where("id",$id)->delete();
    }



}
