<?php
require_once "VaccineShot.php";

class Patient{
    public $id;
    public $name;
    public $birthDate;
    public $vaccineShots; //list of vaccine type Vaccine Shot
    public $phoneNumber;
    public $email;
    public $password;

    function __construct($id, $name, $birthDate, $vaccineShots, $phoneNumber, $email, $password){
        $this->id = $id;
        $this->name = $name;
        $this->birthDate = $birthDate;
        $this->$vaccineShots = $vaccineShots;
        $this->phoneNumber = $phoneNumber;
        $this->email = $email;
        $this->password = $password;
    }

}

?>