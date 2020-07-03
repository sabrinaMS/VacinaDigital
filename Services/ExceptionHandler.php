<?php
class ExceptionHandler{
    public static function handle(Throwable $e){
        print_r($e);
        switch (get_class($e)){
            //HTTPExceptions
            case "Slim\Exception\HttpNotFoundException":
                return array(
                    "status" => 404,
                    "message" => "Recurso não encontrado. Verifique a URI e tente novamente.",
                    "timestamp" => date("Y-m-d h:i:sa")
                );
            break;
            
            case "Slim\Exception\HttpBadRequestException":
                return array(
                    "status" => 400,
                    "message" => "O servidor não pode processar a requisição devido a um erro aparente no cliente.",
                    "timestamp" => date("Y-m-d h:i:sa")
                );
            break;
            
            case "Slim\Exception\HttpForbiddenException":
                return array(
                    "status" => 403,
                    "message" => "Você não tem permissão para executar essa operação.",
                    "timestamp" => date("Y-m-d h:i:sa")
                );
            break;
            
            case "Slim\Exception\HttpInternalServerErrorException":
                return array(
                    "status" => 500,
                    "message" => "Erro interno no servidor. Requisição não pôde ser concluída",
                    "timestamp" => date("Y-m-d h:i:sa")
                );
            break;
            
            case "Slim\Exception\HttpMethodNotAllowedException":
                return array(
                    "status" => 405,
                    "message" => "Método não permitido. Métodos permitidos: " . implode(", ", $e->getAllowedMethods()),
                    "timestamp" => date("Y-m-d h:i:sa")
                );
            break;
            
            case "Slim\Exception\HttpNotImplementedException":
                return array(
                    "status" => 501,
                    "message" => "O servidor não oferece suporte à funcionalidade requerida para completar a requisição.",
                    "timestamp" => date("Y-m-d h:i:sa")
                );
            break;
            
            case "Slim\Exception\HttpUnauthorizedException":
                return array(
                    "status" => 401,
                    "message" => "Não autorizado. A requisição exige autenticação do usuário.",
                    "timestamp" => date("Y-m-d h:i:sa")
                );
            break;
            
            //PDOExceptions
            case "PDOException":
                //query errors
                $errorInfo = $e->errorInfo;
                switch ($errorInfo[1]){
                    case 2002: //cant connect to database
                        
                    break;

                    case 1048: //empty field
                        $errorMessage = $errorInfo[2];
                        $emptyFields = explode("'", $errorMessage)[1];
                        
                        return array(
                            "status" => 500,
                            "message" => "Requisição contém um ou mais campos obrigatórios nulos: ". $emptyFields,
                            "timestamp" => date("Y-m-d h:i:sa")
                        );
                    break;
                    
                    case 1062: //duplicated unique field
                        $errorMessage = $errorInfo[2];
                        $duplicatedField = explode("'", $errorMessage)[3];
                        $duplicatedValue = explode("'", $errorMessage)[1];
                        
                        return array(
                            "status" => 409,
                            "message" => "Valor '$duplicatedValue' já cadastrado em '$duplicatedField'",
                            "timestamp" => date("Y-m-d h:i:sa")
                        );
                    break;

                    case 1451: //integrity constraints on delete
                        return array (
                            "status" => 400,
                            "message" => "Erro de integridade referencial. Objeto está associado a outras entidades.",
                            "timestamp" => date("Y-m-d h:i:sa")
                        );
                    break;

                    case 9999: //entity not found (custom code)
                        return array(
                            "status" => 404,
                            "message" => $errorInfo[2],
                            "timestamp" => date("Y-m-d h:i:sa")
                        );
                        break;
                    
                    default:
                    return array(
                        "status" => 500,
                        "message" => "Erro interno no servidor",
                        "timestamp" => date("Y-m-d h:i:sa")
                    );
                break;
            }
            default:
            return array(
                "status" => 500,
                "message" => "Erro interno no servidor",
                "timestamp" => date("Y-m-d h:i:sa")
            );
        break;
        
    }
}
}

