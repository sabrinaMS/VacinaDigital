<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Model/Nurse.php";
require_once "Dao/NurseDAO.php";

class NurseController{
    public function insert(Request $request, Response $response, array $args){ 
        $dao = new NurseDAO();
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $nurse = new Nurse(0, $data["name"], $data["coren"], $data["password"]);
        $nurse = $dao->insert($nurse);
        $nurseJSON = json_encode($nurse);
        
        $response->getbody()->write($nurseJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    }
    
    public function list(Request $request, Response $response, array $args){
        $dao = new NurseDAO();
        $nurses = $dao->list();
        $nursesJSON = json_encode($nurses);
        
        $response->getbody()->write($nursesJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);        
    }
    
    public function listById(Request $request, Response $response, array $args){
        $dao = new NurseDAO();
        $id = $args["id"];
        $nurse = $dao->listById($id);
        $nurseJSON = json_encode($nurse);
        
        $response->getbody()->write($nurseJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }
    
    public function listByCoren(Request $request, Response $response, array $args){
        $dao = new NurseDAO();
        $coren = $args["coren"];
        $nurse = $dao->listByCoren($coren);
        $nurseJSON = json_encode($nurse);
        
        $response->getbody()->write($nurseJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }
    
    public function update(Request $request, Response $response, array $args){ //Catch errors of duplicated coren
        $dao = new NurseDAO();
        $id = $args["id"];
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $nurse = new Nurse($id, $data['name'], $data['coren'], $data['password']);
        $nurse = $dao->update($nurse);
        $nurseJSON = json_encode($nurse);
        
        $response->getbody()->write($nurseJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }
    
    public function delete(Request $request, Response $response, array $args){ //CATCH INTEGRITY CONSTRAINT ERRORS IN FUTURE
        $dao = new NurseDAO();
        $id = $args['id'];
        $nurse = $dao->delete($id);
        $nurseJSON = json_encode($nurse);
        
        $response->getbody()->write($nurseJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }

    public function checkParameters($data){
        $requestedParameters = ["name", "coren", "password"];
        $undefinedParameters = array();
        foreach($requestedParameters as $parameter){
            if (!$data[$parameter]){
                $undefinedParameters[] = $parameter;
            }
        }

        if (count($undefinedParameters) > 0){
            $message = "Campos '" . implode(", ", $undefinedParameters) . "' não podem ser nulos";
            $e = new PDOException($message, 23000);
            $e->errorInfo = array(23000, 1048, $message);
            throw $e;
        }
    }
}

?>