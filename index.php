<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require "Model/VaccineDAO.php";

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->addBodyParsingMiddleware();
//return a list of vaccines
$app->get('/api/vaccines', function (Request $request, Response $response, array $args) {
    $vaccineDAO = new VaccineDAO;    
    $vaccineList = $vaccineDAO->list();
    //retornar codigo HTTP 200
    return $response->withJson($vaccineList);
});

//return a vaccine by Id
$app->get('/api/vaccines/{id}', function (Request $request, Response $response, array $args) {
    $id = $args['id'];
    
    $vaccineDAO= new ProdutoDAO;    
    $vaccine = $vaccineDAO->searchById($id);
    //retornar codigo HTTP 200    
    return $response->withJson($vaccine)->setStatus(200);
});

$app->run();
?>