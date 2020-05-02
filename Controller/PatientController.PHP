<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Model/Patient.php";
require_once "Dao/PatientDAO.php";

class PatientController{
    public function insert(Request $request, Response $response, array $args){
        $dao = new PatientDAO();
        $data = $request->getParsedBody();
        $patient = new Patient(0, $data["name"],
                        $data["birthDate"], 
                        "",
                        $data["phoneNumber"],
                        $data["email"],
                        $data["password"]);
        $patient = $dao->insert($patient);
        $patientJSON = json_encode($patient);
        
        $response->getbody()->write($patientJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    }

    public function list(Request $request, Response $response, array $args){
        $dao = new PatientDAO();
        $patients = $dao->list();
        $patientsJSON = json_encode($patients);

        $response->getbody()->write($patientsJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);        
    }

    public function listById(Request $request, Response $response, array $args){
        $dao = new PatientDAO();
        $id = $args["id"];
        $patient = $dao->listById($id);
        $patientJSON = json_encode($patient);
        
        $response->getbody()->write($patientJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
    
    public function update(Request $request, Response $response, array $args){
        $dao = new PatientDAO();
        $id = $args["id"];
        $data = $request->getParsedBody();
        $patient = new Patient(0, $data["name"],
                        $data["birthDate"],
                        array(),
                        $data["phoneNumber"],
                        $data["email"],
                        $data["password"]);
        $patient = $dao->update($patient);
        $patientJSON = json_encode($patient);
        
        $response->getbody()->write($patientJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function delete(Request $request, Response $response, array $args){
        $dao = new PatientDAO();
        $id = $args['id'];
        $patient = $dao->delete($id);
        $patientJSON = json_encode($patient);
        
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }
}

?>