<?php
include_once 'Model/Patient.php';
include_once 'Model/PDOFactory.php';
include_once 'Model/VaccineShot.php';

class PatientDAO{
    public function insert(Patient $patient){
        //shotsTaken?
        $qInsert = "INSERT INTO patient(name, birthdate, phone, email, password) VALUES (:name, :birthDate, :phoneNumber, :email, :password)";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":name",$patient->name);
            $comando->bindParam(":birthDate",$patient->birthDate);
            $comando->bindParam(":phoneNumber",$patient->phoneNumber);
            $comando->bindParam(":email",$patient->email);
            $comando->bindParam(":password",$patient->password);
            $comando->execute();
            $patient->id = $pdo->lastInsertId();
            return $patient;
    }

    public function list(){
        $query = 'SELECT * FROM patient';
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($query);
        $comando->execute();
        $patients=array();	
        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            //buscar vacinas tomadas
            $patients[] = new Patient($row->id,
                $row->name,
                $row->birthDate,
                getTakenShots($row->id),
                $row->phone,
                $row->email,
                $row->password);
        }
        return $patients;
    }
    //list by name
    public function listById($id){
 		    $query = 'SELECT * FROM patient WHERE id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam(':id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Patient($row->id,
                $row->name,
                $row->birthDate,
                getTakenShots($row->id),
                $row->phone,
                $row->email,
                $row->password);           
        }

    public function update(Patient $patient){
        $qUpdate = "UPDATE patient SET name = :name, birthdate = :birthDate, phone = :phoneNumber, email = :email WHERE id = :id";            
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qUpdate);
        $comando->bindParam(":id",$patient->id);
        $comando->bindParam(":name",$patient->name);
        $comando->bindParam(":birthDate",$patient->birthDate);
        $comando->bindParam(":phoneNumber",$patient->phoneNumber);
        $comando->bindParam(":email",$patient->email);
        $comando->execute();    
        return($patient);    
    }

    public function delete($id){ // TREAT FOR INTEGRITY CONSTRAINT ERRORS IN FUTURE
        $qDelete = "DELETE from patient WHERE id =:id";            
        $patient = $this->listById($id);
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qDelete);
        $comando->bindParam(":id",$id);
        $comando->execute();
    }
    
    // MOVE TO VaccineShotDAO!
    public function getTakenShots($patientId){
        $qGetShots = "SELECT * FROM vaccineshot WHERE patient_id = :patientId";
        $shotsTaken = 
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($query);
        $comando->execute();
        $shotsTaken = array();	

        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            $shotsTaken[] = new VaccineShot($row->id, $row->lot, $row->nurse, $row->patient, $row->date);
        }
        return $patients;
    }
}
?>
