<?php
include_once 'Vaccine.php';
include_once 'PDOFactory.php';

class VaccineDAO{
    public function insert(Vaccine $vaccine){
        $qInsert = "INSERT INTO vaccine(name) VALUES (:name)";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":name",$vaccine->name);
            $comando->execute();
            $vaccine->id = $pdo->lastInsertId();
            return $vaccine;
    }

    public function list(){
        $query = 'SELECT * FROM vaccine';
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($query);
        $comando->execute();
        $vaccines=array();	
        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            $vaccines[] = new Vaccine($row->id, $row->name);
        }
        return $vaccines;
    }

    public function listById($id){
 		    $query = 'SELECT * FROM vaccine WHERE id_vaccine=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam (':id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Vaccine($result->id,$result->name);           
        }

    public function update(Vaccine $vaccine){
        $qUpdate = "UPDATE vaccine SET name=:name WHERE id_vaccine=:id";            
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qUpdate);
        $comando->bindParam(":name",$vaccine->name);
        $comando->bindParam(":lot",$vaccine->lot);
        $comando->bindParam(":expDate",$vaccine->expDate);
        $comando->bindParam(":id",$vaccine->id);
        $comando->execute();    
        return($vaccine);    
    }

    public function delete($id){
        $qDelete = "DELETE from vaccine WHERE id_vaccine=:id";            
        $vaccine = $this->buscarPorId($id);
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qDelete);
        $comando->bindParam(":id",$id);
        $comando->execute();
        return $vaccine;
    }

    public function getAmountInStock($vaccine){
        $qGetTotal = "SELECT sum(amountInStock) FROM vaccineLot JOIN Vaccine ON vaccine.id = vaccineLot.vaccineId WHERE id = :id";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qGetTotal);
        $comando->bindParam(":id",$vaccine->id);
        $comando->execute();
        $result = $comando->fetch(PDO::FETCH_OBJ);
        return $result;
    }
}
?>
