<?php

class VaccineLot{
    public $id;
    public $lotNumber;
    public $expDate;
    public $quantity;
    public $vaccine;

    function __construct($id, $lotNumber, $expDate, $quantity, $vaccine){
        $this->id = $id;
        $this->lotNumber = $lotNumber;
        $this->expDate = $expDate;
        $this->quantity = $quantity;
        $this->vaccine = $vaccine;
    }
}