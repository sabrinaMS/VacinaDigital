<?php
require_once "Dao/VaccineLotDAO.php";
class VaccineShotDAO{
    public function insert(VaccineShot $vaccineShot){
        $qInsert = "INSERT INTO vaccineshot(date, vaccineLot_id, nurse_id, patient_id) VALUES (:date, :vaccineLot_id, :nurse_id, :patient_id)";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qInsert);
        $comando->bindParam(":date",$vaccineShot->date);
        $comando->bindParam(":vaccineLot_id",$vaccineShot->lot->id);
        $comando->bindParam(":nurse_id",$vaccineShot->nurse->id);
        $comando->bindParam(":patient_id",$vaccineShot->patient->id);
        $comando->execute();
        $vaccineShot->id = $pdo->lastInsertId();
        return $vaccineShot;
    }
    
    public function list(){
        $query = 'SELECT * FROM vaccineshot';
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($query);
        $comando->execute();
        $shots=array();
        $vaccineLotDAO = new VaccineLotDAO();
        $nurseDAO = new NurseDAO();
        $patientDAO = new PatientDAO();
        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            // var_dump($row);
            // die;
            $shots[] = new VaccineShot($row->id, $vaccineLotDAO->listById($row->vaccineLot_id), $nurseDAO->listById($row->nurse_id), $row->date, $patientDAO->listByShot($row->id));
        }

        return $shots;
    }
    
    public function listById($id){
        $query = 'SELECT * FROM vaccineshot WHERE id=:id';		
        $pdo = PDOFactory::getConexao(); 
        $comando = $pdo->prepare($query);
        $comando->bindParam(':id', $id);
        $comando->execute();
        $result = $comando->fetch(PDO::FETCH_OBJ);
        if(!$result){
            $e = new PDOException("Não foi possível encontrar uma vacinação com id $id", 23000);
            $e->errorInfo = array(23000, 9999, "Não foi possível encontrar uma vacinação com id $id");
            throw $e;
        }
        $vaccineLotDAO = new VaccineLotDAO();
        $nurseDAO = new NurseDAO();
        $patientDAO = new PatientDAO();
        $shot = new VaccineShot($result->id, $vaccineLotDAO->listById($result->vaccineLot_id), $nurseDAO->listById($result->nurse_id), $result->date, $patientDAO->listByShot($result->id));

        return $shot;           
    }

    public function listByPatient($id){
        $query = 'SELECT * FROM vaccineshot WHERE patient_id=:id';		
        $pdo = PDOFactory::getConexao(); 
        $comando = $pdo->prepare($query);
        $comando->bindParam(':id', $id);
        $comando->execute();
        $result = $comando->fetch(PDO::FETCH_OBJ);
        $vaccineLotDAO = new VaccineLotDAO();
        $nurseDAO = new NurseDAO();
        $patientDAO = new PatientDAO();
        $shots = array();
        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            // var_dump($row);
            // die;
            $shots[] = new VaccineShot($row->id, $vaccineLotDAO->listById($row->vaccineLot_id), $nurseDAO->listById($row->nurse_id), $row->date);
        }
        return $shots;           
    }
    
    public function update(VaccineShot $vaccineShot){
        $this->listById($vaccineShot->id); //checks is shot exists
        $qUpdate = "UPDATE vaccineshot SET date =:date, vaccineLot_id =:vaccineLot_id, nurse_id =:nurse_id, patient_id =:patient_id WHERE id=:id";            
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qUpdate);
        $comando->bindParam(':id', $vaccineShot->id);
        $comando->bindParam(":date",$vaccineShot->date);
        $comando->bindParam(":vaccineLot_id",$vaccineShot->lot->id);
        $comando->bindParam(":nurse_id",$vaccineShot->nurse->id);
        $comando->bindParam(":patient_id",$vaccineShot->patient->id);
        $comando->execute();    
        return($vaccineShot);    
    }
    
    public function delete($id){ // CATCH INTEGRITY CONSTRAINT ERRORS IN FUTURE
        $qDelete = "DELETE from vaccineshot WHERE id=:id";            
        $vaccineShot = $this->listById($id);
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qDelete);
        $comando->bindParam(":id",$id);
        $comando->execute();
        return $vaccineShot;
    }
}


?>