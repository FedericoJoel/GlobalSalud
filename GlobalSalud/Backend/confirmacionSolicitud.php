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

	$idsolicitud = $db->real_escape_string($data->idsolicitud);
    $accion = $db->real_escape_string($data->accion);
    $motivo = $db->real_escape_string($data->motivo);
    switch ($accion) {
        case 'confirmar': //CONFIRMA SOLICITUD
        	$query = $db->query("UPDATE Solicitudes SET ESTADO='Confirmado' WHERE IDS='$idsolicitud'") or die("no anda el update de confirmar 1");
        	$query2 = $db->query("UPDATE Turnos SET CONFIRMACION='2' WHERE IDSOLICITUD='$idsolicitud' AND CONFIRMACION='0'") or die("no anda el update de confirmar 2");
            
            break;
        case 'rechazar': //RECHAZA SOLICITUD
            $query = $db->query("UPDATE Solicitudes SET ESTADO = 'Pendiente' WHERE IDS='$idsolicitud'") or die("no anda el update de rechazar 1");
            $query2 = $db->query("UPDATE Turnos SET CONFIRMACION='1', MOTIVOT='$motivo' WHERE IDSOLICITUD='$idsolicitud' AND CONFIRMACION='0'") or die("no anda el update de rechazar 2");
            break;
        default:
            echo 'no anda el switch de la confirmacion del turno';
            break;
    }
?>