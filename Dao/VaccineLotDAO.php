<?php
include_once 'Model/VaccineLot.php';
include_once 'Dao/VaccineDAO.php';
include_once 'Model/PDOFactory.php';

class VaccineLotDAO{
    public function insert(VaccineLot $vaccineLot){
        $qInsert = "INSERT INTO vaccineLot(lotNumber, expDate, quantity, vaccine_id) VALUES (:lotNumber, :expDate, :quantity, :vaccine_id)";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":lotNumber",$vaccineLot->lotNumber);
            $comando->bindParam(":expDate",$vaccineLot->expDate);
            $comando->bindParam(":quantity",$vaccineLot->quantity);
            $comando->bindParam(":vaccine_id",$vaccineLot->vaccine->id);
            $comando->execute();
            $vaccineLot->id = $pdo->lastInsertId();
            return $vaccineLot;
    }

    public function list(){
        $query = 'SELECT * FROM vaccinelot';
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($query);
        $comando->execute();
        $vaccines=array();
        $vaccineDAO = new VaccineDAO();
        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            // var_dump($row);
            // die;
            $vaccines[] = new VaccineLot($row->id, $row->lotNumber, $row->expDate, $row->quantity, $vaccineDAO->listById($row->vaccine_id));
        }
        return $vaccines;
    }

    public function listById($id){
 		    $query = 'SELECT * FROM vaccinelot WHERE id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
            $comando->bindParam(':id', $id);
            $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
            //if the result is ok, return a vaccine
            if (!$result){
                return null;
            }
            $vaccineDAO = new VaccineDAO();
		    return new VaccineLot($result->id, $result->lotNumber, $result->expDate, $result->quantity, $vaccineDAO->listById($result->vaccine_id));           
        }

    public function update(VaccineLot $vaccineLot){
        $qUpdate = "UPDATE vaccinelot SET lotNumber =:lotNumber, expDate =:expDate, quantity =:quantity, vaccine_id =:vaccine_id WHERE id=:id";            
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qUpdate);
        $comando->bindParam(':id', $vaccineLot->id);
        $comando->bindParam(":lotNumber",$vaccineLot->lotNumber);
        $comando->bindParam(":expDate",$vaccineLot->expDate);
        $comando->bindParam(":quantity",$vaccineLot->quantity);
        $comando->bindParam(":vaccine_id",$vaccineLot->vaccine->id);
        $comando->execute();  
    }

    public function delete($id){ // TREAT FOR INTEGRITY CONSTRAINT ERRORS IN FUTURE
        $qDelete = "DELETE from vaccinelot WHERE id=:id";            
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qDelete);
        $comando->bindParam(":id",$id);
        $comando->execute();
        //if there isn`t anything in the row(no deletes), return false
        if ($comando->rowCount() === 0){
            return false;
        } 
        return true;
    }
}
?>
