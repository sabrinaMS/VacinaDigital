<?php 
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Model/Patient.php";
require_once "Dao/PatientDAO.php";

class PatientController{
    public function insert(Request $request, Response $response, array $args){
        $dao = new PatientDAO();
        $data = $request->getParsedBody();
        $this->checkParameters($data);
        $patient = new Patient(0, $data["name"],
                        $data["birthDate"], 
                        $data["phoneNumber"],
                        $data["email"],
                        $data["password"],
                        array());

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
        $this->checkParameters($data);
        $patient = new Patient($id, $data["name"],
                        $data["birthDate"],
                        $data["phoneNumber"],
                        $data["email"],
                        $data["password"]);
        $dao->update($patient);
        $response->getBody()->write(json_encode($patient));
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
        }
        
    public function delete(Request $request, Response $response, array $args){
        $dao = new PatientDAO();
        $id = $args['id'];
        $patient = $dao->delete($id);
        $patientJSON = json_encode($patient);
        
        $response->getBody()->write($patientJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200); 
    }

    public function checkParameters($data){
        $requestedParameters = ["name", "birthDate", "phoneNumber", "email", "password"];
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