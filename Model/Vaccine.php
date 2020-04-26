<?php
class Vaccine{
    public $id;
    public $name;
    public $lot;
    public $expDate;

    function __construct($id, $name, $lot, $expDate){
        $this->id = $id;
        $this->name = $name;
        $this->lot = $lot;
        $this->expDate = $expDate;
    }
}

?>