<?php 
include_once 'Model/Nurse.php';
include_once 'Model/PDOFactory.php';

class NurseDAO{
    public function insert(Nurse $nurse){
        $qInsert = "INSERT INTO nurse(name, coren, password) VALUES (:name, :coren, :password)";
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qInsert);
            $comando->bindParam(":name",$nurse->name);
            $comando->bindParam(":coren",$nurse->coren);
            $comando->bindParam(":password",$nurse->password);
            $comando->execute();
            $nurse->id = $pdo->lastInsertId();
            return $nurse;
    }

    public function list(){
        $query = 'SELECT * FROM nurse';
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($query);
        $comando->execute();
        $nurses=array();	
        while($row = $comando->fetch(PDO::FETCH_OBJ)){
            $nurses[] = new Nurse($row->id, $row->name, $row->coren, $row->password);
        }
        return $nurses;
    }

    public function listById($id){
        $query = 'SELECT * FROM nurse WHERE id=:id';		
        $pdo = PDOFactory::getConexao(); 
        $comando = $pdo->prepare($query);
        $comando->bindParam (':id', $id);
        $comando->execute();
        $result = $comando->fetch(PDO::FETCH_OBJ);
        return new Nurse($result->id,$result->name, $result->coren, $result->password);           
    }

    public function listByCoren($coren){
        $query = 'SELECT * FROM nurse WHERE coren=:coren';		
        $pdo = PDOFactory::getConexao(); 
        $comando = $pdo->prepare($query);
        $comando->bindParam (':coren', $coren);
        $comando->execute();
        $result = $comando->fetch(PDO::FETCH_OBJ);
        return new Nurse($result->id,$result->name, $result->coren, $result->password);           
    }

    public function update(Nurse $nurse){
        $qUpdate = "UPDATE nurse SET name=:name, coren=:coren, password=:password WHERE id=:id";            
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qUpdate);
        $comando->bindParam(":name",$nurse->name);
        $comando->bindParam(":coren",$nurse->coren);
        $comando->bindParam(":password",$nurse->password);
        $comando->bindParam(":id",$nurse->id);
        $comando->execute();    
        return($nurse);    
    }

    public function delete($id){ // TREAT FOR INTEGRITY CONSTRAINT ERRORS IN FUTURE
        $qDelete = "DELETE from nurse WHERE id=:id";            
        $nurse = $this->listById($id);
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($qDelete);
        $comando->bindParam(":id",$id);
        $comando->execute();
        return $nurse;
    }
}
?>
