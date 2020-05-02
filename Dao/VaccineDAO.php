<?php
include_once 'Model/Vaccine.php';
include_once 'Model/PDOFactory.php';

class VaccineDAO{
    public function insert(Vaccine $vaccine){
        $qInsert = "INSERT INTO vaccine(name) VALUES (:name)";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qInsert);
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
            $vaccines[] = new Vaccine($row->id, $row->name, $this->getQuantityInStock($row->id));
        }
        return $vaccines;
    }

    public function listById($id){
 		    $query = 'SELECT * FROM vaccine WHERE id=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam(':id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Vaccine($result->id,$result->name, $this->getQuantityInStock($result->id));           
        }

    public function update(Vaccine $vaccine){
        $qUpdate = "UPDATE vaccine SET name=:name WHERE id=:id";            
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qUpdate);
        $comando->bindParam(":name",$vaccine->name);
        $comando->bindParam(":id",$vaccine->id);
        $comando->execute();    
        return($vaccine);    
    }

    public function delete($id){ // TREAT FOR INTEGRITY CONSTRAINT ERRORS IN FUTURE
        $qDelete = "DELETE from vaccine WHERE id=:id";            
        $vaccine = $this->listById($id);
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qDelete);
        $comando->bindParam(":id",$id);
        $comando->execute();
        return $vaccine;
    }

    public function getQuantityInStock($id){
        $qGetTotal = "SELECT sum(quantity) AS `sum` FROM vaccineLot JOIN vaccine ON vaccine.id = vaccineLot.vaccine_id WHERE vaccineLot.vaccine_id = :id";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qGetTotal);
        $comando->bindParam(":id",$id);
        $comando->execute();
        $result = $comando->fetch(PDO::FETCH_OBJ);
        return $result->sum ? (int)$result->sum : 0;
    }
}
?>
