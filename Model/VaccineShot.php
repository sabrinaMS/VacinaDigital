<?php
require_once "Nurse.php";
require_once "VaccineLot.php";

class VaccineShot{
    function __construct($id, $lot, $nurse, $date, $patient=null){
        $this->id = $id;
        $this->lot = $lot;
        $this->nurse = $nurse;
        $this->date = $date;

        if(isset($patient)){
            $this->patient = $patient;
        }
    }
}

?>