<?php
class Vaccine{
    public $id;
    public $name;
    public $quantityInStock;

    function __construct($id, $name, $quantity = 0){
        $this->id = $id;
        $this->name = $name;
        $this->quantityInStock = $quantity;
    }
}

?>