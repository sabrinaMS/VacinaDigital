<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Model/VaccineLot.php";
require_once "Dao/VaccineLotDAO.php";
require_once "Dao/VaccineDAO.php";

class VaccineLotController{
    public function insert(Request $request, Response $response, array $args){
        $dao = new VaccineLotDAO();
        $data = $request->getParsedBody();
        $vaccineDAO = new VaccineDAO();
        $vaccineLot = new VaccineLot(0, $data["lotNumber"],
                    $data["expDate"],
                    $data["quantity"],
                    $vaccineDAO->listById($data["vaccineId"]));
                    //var_dump($data, $vaccineDAO->listById($data["vaccineId"]));
                    //die;
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
        $vaccineDAO = new VaccineDAO();
        $vaccineLot = new VaccineLot(0, $data["lotNumber"],
                    $data["expDate"],
                    $data["quantity"],
                    $vaccineDAO->listById($data["vaccineId"]));
        $vaccineLot = $dao->update($vaccineLot);
        $vaccineLotJSON = json_encode($vaccineLot);
        
        $response->getbody()->write($vaccineLotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function delete(Request $request, Response $response, array $args){
        $dao = new VaccineLotDAO();
        $id = $args['id'];
        $vaccineLot = $dao->delete($id);
        $vaccineLotJSON = json_encode($vaccineLot);
        
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }
}

?>