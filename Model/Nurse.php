<?php
class Nurse{
    public $id;
    public $name;
    public $coren;
    public $password;

    public function __construct($id, $name, $coren, $password){
        $this->id = $id;
        $this->name = $name;
        $this->coren = $coren;
        $this->password = $password;
    }

}

?>