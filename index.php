<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

require_once "Controller/VaccineController.php";
require_once "Controller/NurseController.php";
require_once "Controller/PatientController.php";
require_once "Controller/VaccineLotController.php";

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

$app->group('/api/enfermeiros', function (RouteCollectorProxy $group) {
    $group->post('[/]', 'NurseController:insert');
    $group->get('[/]', 'NurseController:list');  
    $group->get('/{id:[0-9]+}', 'NurseController:listById');
    $group->get('/coren/{coren:[0-9]+}', 'NurseController:listByCoren');
    $group->put('/{id:[0-9]+}', 'NurseController:update');
    $group->delete('/{id:[0-9]+}', 'NurseController:delete');
});

$app->group('/api/pacientes', function (RouteCollectorProxy $group) {
    $group->post('[/]', 'PatientController:insert');
    $group->get('[/]', 'PatientController:list');  
    //$group->get('/{id:[0-9]+}', 'PatientController:listByName'); ??????
    $group->get('/{id:[0-9]+}', 'PatientController:listById');
    $group->put('/{id:[0-9]+}', 'PatientController:update');
    $group->delete('/{id:[0-9]+}', 'PatientController:delete');
});

$app->group('/api/lotesvacina', function (RouteCollectorProxy $group) {
    $group->post('[/]', 'VaccineLotController:insert');
    $group->get('[/]', 'VaccineLotController:list');  
    //$group->get('/{id:[0-9]+}', 'VaccineLotController:listByName'); ??????
    $group->get('/{id:[0-9]+}', 'VaccineLotController:listById');
    $group->put('/{id:[0-9]+}', 'VaccineLotController:update');
    $group->delete('/{id:[0-9]+}', 'VaccineLotController:delete');
});


$app->run();
?>