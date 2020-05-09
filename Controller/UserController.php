<?php
    use \Firebase\JWT\JWT;
    use Slim\Psr7\Response;

    //use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;

    include_once 'Model/User.php';
    include_once 'Dao/UserDAO.php';

    class UserController {
        private $secretKey = "ˆHbs!@hajvdj";

        public function insert(Request $request, Response $response) {
            $var = $request->getParsedBody();
            $this->checkParameters($var);

            $user = new User(0, $var['email'], $var['password']);
            
            $dao = new UserDAO;
            try{
                $user = $dao->insert($user);
            }catch(Exception $th){
                $errorData = ExceptionHandler::handle($th);
                $response->getBody->write(json_encode($errorData));
                return $response
                ->withHeader('Content-Type', 'application/json')
                ->withStatus($errorData["status"]);
            }
        
            return $response->withJson($user,201);
        }

        public function authenticate(Request $request, Response $response) {
            $userFromRequest = $request->getParsedBody();
            
            $dao= new UserDAO;    
            $user = $dao->listByEmail($userFromRequest['email']);
            if($user->password == $userFromRequest['password']) {
                $token = array(
                    'user' => strval($user->id),
                    'email' => $user->email
                );
                $jwt = JWT::encode($token, $this->secretKey);
                return $response->withJson(["token" => $jwt], 201)
                    ->withHeader('Content-type', 'application/json');   
            }
            else
                return $response->withStatus(401);
        }
        
        public function validateToken($request, $handler) {
            $response = new Response();
            $token = $request->getHeader('Authorization');

            if($token && $token[0])
            {
                try {
                    $decoded = JWT::decode($token[0], $this->secretKey, array('HS256'));

                    if($decoded){
                        $response = $handler->handle($request);
                        return($response);
                    }
                } catch(Exception $error) {

                    return $response->withStatus(401);
                }
            }
            
            return $response->withStatus(401);
        }

        public function checkParameters($data){
            $requestedParameters = ["email", "password"];
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