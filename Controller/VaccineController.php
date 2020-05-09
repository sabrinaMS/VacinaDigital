<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Model/Vaccine.php";
require_once "Dao/VaccineDAO.php";
require_once "Services/ExceptionHandler.php";


class VaccineController{
    public function insert(Request $request, Response $response, array $args){
        $dao = new VaccineDAO();
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $vaccine = new Vaccine(0, $data["name"]);
        $vaccine = $dao->insert($vaccine);
        $vaccineJSON = json_encode($vaccine);
        
        $response->getbody()->write($vaccineJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    
    }
    
    public function list(Request $request, Response $response, array $args){
        $dao = new VaccineDAO();
        $vaccines = $dao->list();
        $vaccinesJSON = json_encode($vaccines);

        $response->getbody()->write($vaccinesJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);        
    }

    public function listById(Request $request, Response $response, array $args){
        $dao = new VaccineDAO();
        $id = $args["id"];
        $vaccine = $dao->listById($id);
        $vaccineJSON = json_encode($vaccine);
        
        $response->getbody()->write($vaccineJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function update(Request $request, Response $response, array $args){
        $dao = new VaccineDAO();
        $id = $args["id"];
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $vaccine = new Vaccine($id, $data['name']);
        $vaccine = $dao->update($vaccine);
        $vaccineJSON = json_encode($vaccine);
        
        $response->getbody()->write($vaccineJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function delete(Request $request, Response $response, array $args){
        $dao = new VaccineDAO();
        $id = $args['id'];
        $vaccine = $dao->delete($id);
        $vaccineJSON = json_encode($vaccine);
        
        $response->getbody()->write($vaccineJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }

    public function checkParameters($data){
        $requestedParameters = ["name"];
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