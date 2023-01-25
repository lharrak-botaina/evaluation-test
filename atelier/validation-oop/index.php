<?php
include "clothe.php";

class Womenswear extends Clothe{
     public function display(){
        echo "is a womenswear :{$this->name} ,{$this->get_color()}";
    }

}
class Menswear extends Clothe{
     public function display(){
        echo "is a Menswear: {$this->name} ,{$this->get_color()}";
    }

}


interface Iclothe_management{
   public  function add();
   public function delete();
}
class Clothe_mnagement implements Iclothe_management{
    public $count=0;
    public function add(){
        $this->count++;
    }
    public function delete(){
        $this->count--;
    }
}


$women= new Womenswear();
$women->name="dress";
$women->set_color("pink");

$men=new Menswear();
$men->name="t-shirt";
$men->set_color("black");

$clothe_management=new Clothe_mnagement();
$clothe_management->add($women);
$clothe_management->add($men);
// $clothe_management->delete($men);

echo $clothe_management->count;
echo "<br>";
$clothe_management2=new Clothe_mnagement();
$clothe_management2->add($women);
$clothe_management2->add($men);
$clothe_management2->add($men);

echo $clothe_management2->count;
echo "<br>";
echo $women->display()."<br>";
echo $men->display();



?>