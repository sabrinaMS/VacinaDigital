<?php
class Patient{
    public $id;
    public $name;
    public $birthDate;
    public $vaccineCard; //id_vaccinecARD
    public $phoneNumber;
    public $email;
    public $password;


    function __construct($id, $name, $birthDate, $vaccines){
        $this->id = $id;
        $this->name = $name;
        $this->birthDate = $birthDate;
        $this->$vaccineCard = $vaccineCard;
        $this->phoneNumber = $phoneNumber;
        $this->email = $email;
        $this->password = $password;
    }

}

?>