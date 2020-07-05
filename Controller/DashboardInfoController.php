<?php
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
require_once "Dao/DashboardInfoDAO.php";
class DashboardInfoController{
    function getInfo(Request $request, Response $response, array $args){
        $dao = new DashboardInfoDAO();
        $info = $dao->getInfo();
        $infoJSON = json_encode($info);

        $response->getbody()->write($infoJSON);
        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);   
    }
}