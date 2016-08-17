<?php
	require("conexion.php");

	$db= new Conexion();

	if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
     
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
     
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
     
        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
     
        exit(0);
   	}


	$data = json_decode(file_get_contents("php://input"));

	//$estado = $db->real_escape_string($data->estado);
	$dni = $db->real_escape_string($data->dni);
    $medico = $db->real_escape_string($data->medico);
    $fechas = $db->real_escape_string($data->fechas);
    $idclimed = $db->real_escape_string($data->idclimed);
//	$query = $db->query("SELECT * FROM Solicitudes WHERE DNISOLICITANTE='1' AND ESTADO='En Espera'") or die ("vacio");
//    $query = $db->query("SELECT * FROM Solicitudes INNER JOIN Turnos ON (Solicitudes.IDS = Turnos.IDSOLICITUD) WHERE Solicitudes.ESTADO='En Espera' AND Solicitudes.DNISOLICITANTE = '1'") or die ("vacio");
	$query = $db->query("INSERT INTO Solicitudes (DNISOLICITANTE,MEDICO,FECHAS,ESTADO,IDCLIMED) VALUES ('$dni','$medico','$fechas','Pendiente','$idclimed')");
	
?>