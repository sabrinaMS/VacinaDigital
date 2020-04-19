<?php
class Vaccine{
    public $id;
    public $vaccine; //id_vaccine
    public $date;
    public $nurse; //id_nurse


    function __construct($id, $vaccine, $date, $nurse){
        $this->id = $id;
        $this->vaccine = $vaccine;
        $this->date = $date;
        $this->nurse = $nurse;
    }

}

?>