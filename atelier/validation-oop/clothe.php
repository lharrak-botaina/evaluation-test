<?php


abstract class Clothe{
    public $name;
    private $color;

    public function display(){
        echo 'is a clothes';
    }
    public function get_color(){
        return $this->color;
    }
    public function set_color($Color){
        $this->color=$Color;
    }
}
?>