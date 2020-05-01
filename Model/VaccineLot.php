<?php 
class VaccineLot{
    public $id;
    public $lotNumber;
    public $expDate;
    public $quantity;

    function __contruct($id, $lotNumber, $expDate, $quantity){
        $this->id = $id;
        $this->lotNumber = $lotNumber;
        $this->expDate = $expDate;
        $this->quantity = $quantity;
    }
}