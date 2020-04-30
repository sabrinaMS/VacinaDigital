<?php 
class VaccineLot{
    public $lotNumber;
    public $expDate;
    public $amountInStock;
    
    function __contruct($lotNumber, $expDate, $amountInStock){
        $this->lotNumber = $lotNumber;
        $this->expDate = $expDate;
        $this->amountInStock = $amountInStock;
    }
}