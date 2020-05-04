<?php
include_once 'Model/Patient.php';
include_once 'Model/PDOFactory.php';
include_once 'Model/VaccineShot.php';
include_once 'Dao/VaccineShotDAO.php';

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
        $vaccineShotDAO = new VaccineShotDAO();
        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            //buscar vacinas tomadas
            $patients[] = new Patient($row->id,
                $row->name,
                $row->birthdate,
                $row->phone,
                $row->email,
                $row->password,
                $vaccineShotDAO->listByPatient($row->id));
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
            $vaccineShotDAO = new VaccineShotDAO();
		    return new Patient($result->id,
                $result->name,
                $result->birthdate,
                $result->phone,
                $result->email,
                $result->password,           
                $vaccineShotDAO->listByPatient($result->id));
        }

    public function listByShot($id){
 		    $query = 'SELECT * FROM patient JOIN vaccineshot ON patient.id = vaccineshot.patient_id  WHERE vaccineshot.id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam(':id', $id);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
            $vaccineShotDAO = new VaccineShotDAO();
		    return new Patient($result->id,
                $result->name,
                $result->birthdate,
                $result->phone,
                $result->email,
                $result->password);
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
}
?>
