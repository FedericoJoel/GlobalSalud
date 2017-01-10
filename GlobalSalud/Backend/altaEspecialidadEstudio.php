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
    $clinica = $db->real_escape_string($data->clinica);
    $nafiliado = $db->real_escape_string($data->nafiliado);
    $sugerido = $db->real_escape_string($data->sugerido);
    $especialidad = $db->real_escape_string($data->especialidad);
    $tipo = $db->real_escape_string($data->tipo);

    echo($sugerido);
    echo($especialidad);

    date_default_timezone_set('America/Argentina/Buenos_Aires');
    $fecha = date("Y-m-d");

    
    $idesp = $db->query("SELECT IDESPECIALIDAD FROM Especialidad WHERE NOMBRE = $especialidad");
    echo($idesp);

    $query = $db->query("INSERT INTO Solicitudes (DNISOLICITANTE,MEDICO,FECHAS,ESTADO,IDAFILIADO,IDCLIMED,ESPECIALIDAD,TIPO) VALUES ('$dni','$sugerido','$fecha','Pendiente','$nafiliado','$clinica','$idesp','$tipo')");
    
?>

    
	