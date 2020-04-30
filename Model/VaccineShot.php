<?php
require_once "Nurse.php";
require_once "VaccineLot.php";

class VaccineShot{
    public $id;
    public $lot; //VaccineLot object
    public $nurse; //Nurse object
    public $date;


    function __construct($id, $lot, $nurse, $date){
        $this->id = $id;
        $this->lot = $lot;
        $this->nurse = $nurse;
        $this->date = $date;
    }

}

?>