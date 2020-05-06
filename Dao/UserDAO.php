<?php
    include_once 'Model/PDOFactory.php';
    include_once 'Model/User.php';

    class UserDAO {
        public function insert(User $user) {
            $qInserir = "INSERT INTO user (email, password) VALUES (:email, :password)";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":email",$user->email);
            $comando->bindParam(":password",$user->password);
            $comando->execute();
            $user->id = $pdo->lastInsertId();
            return $user;
        }

        public function update(User $user) {
            $qAtualizar = "UPDATE user SET email=:email, password=:password WHERE id=:id";            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":email",$user->email);
            $comando->bindParam(":password",$user->password);
            $comando->bindParam(":id",$user->id);
            $comando->execute();
            return $user;        
        }

        public function list() {
		    $query = 'SELECT * FROM user';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $usuarios=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $usuarios[] = new Usuarios($row->id, $row->email, $row->password);
            }
            return $usuarios;
        }

        public function listByEmail($email) {
 		    $query = 'SELECT * FROM user WHERE email=:email';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('email', $email);
		    $comando->execute();
            $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new User($result->id, $result->email, $result->password);           
        }
    }
?>