<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class weather extends Model
{
    use HasFactory;
    protected $table = 'weatherfavorite';
    protected $fillable=[
        "id",
        'name',
        "country",
        "coulds",
        "temp",
        "feels_Like",
        "humudity",
        "wind"
    ];
}
