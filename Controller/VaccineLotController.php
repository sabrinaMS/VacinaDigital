<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Model/VaccineLot.php";
require_once "Dao/VaccineLotDAO.php";
require_once "Dao/VaccineDAO.php";
require_once "Services/ExceptionHandler.php";

class VaccineLotController{
    public function insert(Request $request, Response $response, array $args){ //check if expdate > today?????
        $dao = new VaccineLotDAO();
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $vaccineDAO = new VaccineDAO();
        $vaccineLot = new VaccineLot(0, $data["lotNumber"],
                    $data["expDate"],
                    $data["quantity"],
                    $vaccineDAO->listById($data["vaccine_id"]));
        $vaccineLot = $dao->insert($vaccineLot);
        $vaccineLotJSON = json_encode($vaccineLot);
        
        $response->getbody()->write($vaccineLotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    
    }
    
    public function list(Request $request, Response $response, array $args){
        $dao = new VaccineLotDAO();
        $vaccinesLot = $dao->list();
        $vaccinesLotJSON = json_encode($vaccinesLot);

        $response->getbody()->write($vaccinesLotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);        
    }

    public function listById(Request $request, Response $response, array $args){
        $dao = new VaccineLotDAO();
        $id = $args["id"];
        $vaccineLot = $dao->listById($id);
        $vaccineLotJSON = json_encode($vaccineLot);
        
        $response->getbody()->write($vaccineLotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }
        
    public function update(Request $request, Response $response, array $args){
        $dao = new VaccineLotDAO();
        $id = $args["id"];
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $vaccineDAO = new VaccineDAO();
        $vaccineLot = new VaccineLot($id, $data["lotNumber"],
                    $data["expDate"],
                    $data["quantity"],
                    $vaccineDAO->listById($data["vaccine_id"]));
        $dao->update($vaccineLot);
        $response->getBody()->write(json_encode($vaccineLot));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function delete(Request $request, Response $response, array $args){
        $dao = new VaccineLotDAO();
        $id = $args['id'];
        $vaccineLot = $dao->delete($id);
        if (!$vaccineLot){
            return $response
            ->withStatus(404); 
        }
        $vaccineLotJSON = json_encode($vaccineLot);
        $response->getBody()->write($vaccineLotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }

    public function checkParameters($data){
        $requestedParameters = ["lotNumber", "expDate", "quantity", "vaccine_id"];
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