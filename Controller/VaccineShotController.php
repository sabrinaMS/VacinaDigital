<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Model/VaccineShot.php";
require_once "Dao/VaccineShotDAO.php";
require_once "Dao/VaccineLotDAO.php";
require_once "Dao/NurseDAO.php";
require_once "Dao/PatientDAO.php";

class VaccineShotController{ //check if date is valid????????
    public function insert(Request $request, Response $response, array $args){
        $dao = new VaccineShotDAO();
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $vaccineLotDAO = new VaccineLotDAO();
        $nurseDAO = new NurseDAO();
        $patientDAO = new PatientDAO();
        $vaccineShot = new VaccineShot(0, 
                        $vaccineLotDAO->listByid($data["vaccineLot_id"]), 
                        $nurseDAO->listById($data["nurse_id"]),
                        $data["date"],
                        $patientDAO->listById($data["patient_id"]));
        $vaccineShot = $dao->insert($vaccineShot);
        $vaccineShotJSON = json_encode($vaccineShot);
        
        $response->getbody()->write($vaccineShotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    }

    public function list(Request $request, Response $response, array $args){
        $dao = new VaccineShotDAO();
        $vaccineShots = $dao->list();
        $vaccineShotsJSON = json_encode($vaccineShots);

        $response->getbody()->write($vaccineShotsJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);        
    }

    public function listById(Request $request, Response $response, array $args){
        $dao = new VaccineShotDAO();
        $id = $args["id"];
        $vaccineShot = $dao->listById($id);
        $vaccineShotJSON = json_encode($vaccineShot);
        
        $response->getbody()->write($vaccineShotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }

    public function listByPatient(Request $request, Response $response, array $args){
        $dao = new VaccineShotDAO();
        $patient_id = $args["id"];
        $vaccineShot = $dao->listByPatient($patient_id);
        $vaccineShotJSON = json_encode($vaccineShot);
        
        $response->getbody()->write($vaccineShotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }

    public function update(Request $request, Response $response, array $args){
        $dao = new VaccineShotDAO();
        $id = $args["id"];
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $vaccineLotDAO = new VaccineLotDAO();
        $nurseDAO = new NurseDAO();
        $patientDAO = new PatientDAO();
        $vaccineShot = new VaccineShot($id, 
                        $vaccineLotDAO->listByid($data["vaccineLot_id"]), 
                        $nurseDAO->listById($data["nurse_id"]),
                        $data["date"],
                        $patientDAO->listById($data["patient_id"]));
        $vaccineShot = $dao->update($vaccineShot);
        $vaccineShotJSON = json_encode($vaccineShot);
        
        $response->getbody()->write($vaccineShotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function delete(Request $request, Response $response, array $args){
        $dao = new VaccineShotDAO();
        $id = $args['id'];
        $vaccineShot = $dao->delete($id);
        $vaccineShotJSON = json_encode($vaccineShot);
        
        $response->getBody()->write($vaccineShotJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }

    public function checkParameters($data){
        $requestedParameters = ["vaccineLot_id", "nurse_id", "date", "patient_id"];
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