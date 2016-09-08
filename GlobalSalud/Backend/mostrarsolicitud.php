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
	$id = $db->real_escape_string($data->id);

	$query = $db->query("SELECT Solicitudes.IDS,Solicitudes.DNISOLICITANTE, Solicitudes.MEDICO,Solicitudes.FECHAS,Climed.NOMBRE AS CLINICA,Climed.DIRECCION,Turnos.MEDICOASIGNADO,Turnos.FECHAT,Turnos.HORAT FROM Solicitudes INNER JOIN Climed ON Solicitudes.IDCLIMED = Climed.IDCLI INNER JOIN Turnos ON Solicitudes.IDS = Turnos.IDSOLICITUD WHERE Solicitudes.IDS = '$id'") or die ("FALLO CARGAR SOLICITUD");

	$row = $db->recorrer($query);
	
	//$datos[] = $row;
		

	print json_encode($row);

?>

