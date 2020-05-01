<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

require_once "Controller/VaccineController.php";

require __DIR__ . '/vendor/autoload.php';

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->group('/api/vacinas', function (RouteCollectorProxy $group) {
    $group->post('[/]', 'VaccineController:insert');
    $group->get('[/]', 'VaccineController:list');  
    $group->get('/{id:[0-9]+}', 'VaccineController:listById');
    $group->put('/{id:[0-9]+}', 'VaccineController:update');
    $group->delete('/{id:[0-9]+}', 'VaccineController:delete');
});


$app->run();
?>