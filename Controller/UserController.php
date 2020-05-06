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

            $user = new User(0, $var['email'], $var['password']);
            
            $dao = new UserDAO;    
            $user = $dao->insert($user);
        
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
    }

?>