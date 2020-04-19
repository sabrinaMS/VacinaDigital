<?php
class Vaccine{
    public $id;
    public $name;
    public $lot;
    public $bestBefore;


    function __construct($id, $name, $lot, $bestBefore){
        $this->id = $id;
        $this->name = $name;
        $this->lot = $lot;
        $this->bestBefore = $bestBefore;
    }

}

?>