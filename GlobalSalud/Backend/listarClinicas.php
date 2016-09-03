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
	$especialidad = $db->real_escape_string($data->especialidad);
	$localidad = $db->real_escape_string($data->localidad);

//	$query = $db->query("SELECT * FROM Solicitudes WHERE DNISOLICITANTE='1' AND ESTADO='En Espera'") or die ("vacio");
    $query = $db->query("SELECT Climed.IDCLI,Climed.NOMBRE,Climed.DIRECCION,Climed.LOCALIDAD, joined.NOMBRE AS ESPECIALIDAD FROM Climed INNER JOIN (SELECT * FROM ClimedEsp INNER JOIN Especialidad ON (ClimedEsp.IDESP = Especialidad.IDESPECIALIDAD)) AS joined ON (Climed.IDCLI = joined.IDCLIMED) WHERE joined.NOMBRE = '$especialidad' AND Climed.LOCALIDAD = '$localidad'  ORDER BY Climed.NOMBRE ASC") or die ("error en busqueda clinicas");


	while($row = $db->recorrer($query)) {
	    $datos[] = $row;
		
	}
	
	print json_encode($datos);

?>