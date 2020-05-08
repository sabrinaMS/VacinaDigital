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
        try {
            $vaccineLot = $dao->insert($vaccineLot);
            $vaccineLotJSON = json_encode($vaccineLot);
            
            $response->getbody()->write($vaccineLotJSON);
            return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus(201);
        } catch (\Exception $th) {
            switch ($th->errorInfo[1]) {
                case 1048:
                    $response->getbody()->write("Id de vacina não existente");
                    return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(500);
                    break;
                case 1062:
                    $response->getbody()->write("Número de lote já cadastrado");
                    return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(409);
                    break;
                default:
                    $response->getbody()->write("Erro Desconhecido");
                    return $response
                        ->withHeader('Content-Type', 'application/json')
                        ->withStatus(500);
                    break;
            }
        }               
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

        if ($vaccineLot === null){
            return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(404); 
        }
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
                    $vaccineDAO->listById($data["vaccine_id"]));
        $dao->update($vaccineLot);
    
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function delete(Request $request, Response $response, array $args){
        $dao = new VaccineLotDAO();
        $id = $args['id'];
        
        if ($dao->delete($id)){
            return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        return $response
        ->withHeader('Content-Type', 'application/json')
        ->withStatus(404); 
    }
}

?>