<?php
require_once "Nurse.php";
require_once "VaccineLot.php";

class VaccineShot{
    public $id;
    public $lotNumber; //VaccineLot object
    public $nurse; //Nurse object
    public $patient; //Patient object
    public $date;

    function __construct($id, $lotNumber, $nurse, $date){
        $this->id = $id;
        $this->lotNumber = $lotNumber;
        $this->nurse = $nurse;
        $this->patient = $patient;
        $this->date = $date;
    }
}

?>