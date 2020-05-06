<?php

class User{
    public $id;
    public $email;
    public $password;

    function __construct($id, $email, $password){
        $this->id = $id;
        $this->email = $email;
        $this->password = $password;
    }
}

?>