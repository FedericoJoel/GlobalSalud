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

	$estado = $db->real_escape_string($data->estado);
	$dni = $db->real_escape_string($data->dni);
    $confirmacion = $db->real_escape_string($data->confirmacion);
    $tipo = $db->real_escape_string($data->tipo);

    switch($tipo){
        case 'Turno': //En Espera
             $query = $db->query("SELECT Solicitudes.IDS, Solicitudes.MEDICO, Climed.NOMBRE AS CLINICA, Climed.DIRECCION, Especialidad.NOMBRE AS ESP, Turnos.MEDICOASIGNADO, Turnos.FECHAT, Turnos.HORAT,Turnos.MOTIVOT FROM Solicitudes INNER JOIN Turnos ON Solicitudes.IDS = Turnos.IDSOLICITUD INNER JOIN Climed ON Solicitudes.IDCLIMED = Climed.IDCLI INNER JOIN Especialidad ON Solicitudes.ESPECIALIDAD = Especialidad.IDESPECIALIDAD WHERE Solicitudes.ESTADO='$estado' AND Solicitudes.DNISOLICITANTE = '$dni' AND Turnos.CONFIRMACION = '$confirmacion' ") or die ("vacio");
             break;
        case 'Pendiente': //Pendientes
            $query = $db->query("SELECT Solicitudes.IDS, Solicitudes.MEDICO,Solicitudes.FECHAS,Climed.NOMBRE AS CLINICA,Climed.DIRECCION,Especialidad.NOMBRE AS ESP FROM Solicitudes INNER JOIN Climed ON Solicitudes.IDCLIMED = Climed.IDCLI INNER JOIN Especialidad ON Solicitudes.ESPECIALIDAD = Especialidad.IDESPECIALIDAD WHERE Solicitudes.ESTADO='$estado' AND Solicitudes.DNISOLICITANTE = '$dni'") or die ("FALLO CONSULTA PENDIENTE");
            break;
        default:
            echo 'no anda el switch del php 1';
            break;
    }
    
   
   
	while($row = $db->recorrer($query)) {
	    $datos[] = $row;
		
	}
	
	print json_encode($datos);

?>