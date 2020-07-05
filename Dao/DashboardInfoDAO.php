<?php
include_once 'Model/PDOFactory.php';
// pacientes cadastrados
// vacinados na ultima semana
// media de vacinas
// doses em estoque
// vacinas em falta
// com data de validade expirada

class DashboardInfoDAO{
    function getInfo(){
        $query = "SELECT *
                  FROM
                  (SELECT count(*) AS patients_total FROM patient) as a,
                  (SELECT count(DISTINCT patient.id) AS patients_lastWeek FROM patient JOIN vaccineshot ON patient.id = vaccineshot.patient_id WHERE vaccineshot.date BETWEEN CURDATE() and CURDATE() - 7) as b,
                  (SELECT ROUND(AVG(shotsTaken)) as patients_avg FROM (SELECT count(*) AS shotsTaken FROM patient JOIN vaccineshot on patient.id = vaccineshot.patient_id GROUP BY patient.id) as counts) as c,
                  (SELECT sum(quantity) as shots_inStock FROM vaccinelot) as d,
                  (SELECT COUNT(vaccine.id) as vaccines_outOfStock from vaccine EXCEPT (SELECT DISTINCT vaccine.id FROM vaccine JOIN vaccineLot ON vaccine.id = vaccineLot.vaccine_id)) as e,
                  (SELECT sum(quantity) as shots_expired FROM vaccinelot WHERE expDate < CURDATE()) as f";
        
        $pdo = PDOFactory::getConexao();
        $comando = $pdo->prepare($query);
        $comando->execute();
        $result = $comando->fetch(PDO::FETCH_OBJ);

        return $result;

    }
}

