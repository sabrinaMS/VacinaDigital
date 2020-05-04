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

    function __construct($id, $name, $birthDate, $phoneNumber, $email, $password, $vaccineShots = null){
        $this->id = $id;
        $this->name = $name;
        $this->birthDate = $birthDate;
        $this->phoneNumber = $phoneNumber;
        $this->email = $email;
        $this->password = $password;
        if (isset($vaccineShots)){
            $this->vaccineShots = $vaccineShots;
        }
    }

}

?>