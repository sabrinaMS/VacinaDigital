<?php
    use \Firebase\JWT\JWT;
    use Slim\Psr7\Response as MiddlewareResponse;

    use Psr\Http\Message\ResponseInterface as Response;
    use Psr\Http\Message\ServerRequestInterface as Request;

    include_once 'Model/User.php';
    include_once 'Dao/UserDAO.php';

    use Slim\Exception\HttpUnauthorizedException as HttpUnauthorizedException;

    class UserController {
        private $secretKey = "ˆHbs!@hajvdj";

        public function insert(Request $request, Response $response) {
            $var = $request->getParsedBody();
            $this->checkParameters($var);

            $user = new User(0, $var['email'], $var['password']);
            
            $dao = new UserDAO;
            $user = $dao->insert($user);
        
            return $response->withJson($user,201, JSON_UNESCAPED_UNICODE);
        }

        public function authenticate(Request $request, Response $response) {
            $userFromRequest = $request->getParsedBody();
            $this->checkParameters($userFromRequest);
            
            $dao= new UserDAO;    
            $user = $dao->listByEmail($userFromRequest['email']);
            if($user->password == $userFromRequest['password']) {
                $token = array(
                    'user' => strval($user->id),
                    'email' => $user->email
                );
                $jwt = JWT::encode($token, $this->secretKey);
                return $response->withJson(["token" => $jwt], 201, JSON_UNESCAPED_UNICODE)
                    ->withHeader('Content-type', 'application/json');   
            }
            else
                throw new HttpUnauthorizedException($request);
        }
        
        public function validateToken($request, $handler) {
            $response = new MiddlewareResponse();
            $token = $request->getHeader('Authorization');

            if($token && $token[0])
            {
                $decoded = null;
                try {
                    $decoded = JWT::decode($token[0], $this->secretKey, array('HS256'));      
                } catch(Exception $error) {
                    throw new HttpUnauthorizedException($request);
                }

                if($decoded){
                    $response = $handler->handle($request);
                    return($response);
                }
            }
            
            throw new HttpUnauthorizedException($request);
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