<?php
require("conexion.php");

$db = new Conexion();

$resultados = array();


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

		$dni = $db->real_escape_string($data->dni);
		$nafiliado = $db->real_escape_string($data->nafiliado);

		$valores = $db->query("SELECT ID FROM Afiliados WHERE DNI = '$dni' AND NAFILIADO = '$nafiliado'") or die ("asdasd");

		if($db->rows($valores) > 0 ) {
	   		$id = $db->recorrer($valores);
	   		$db->liberar($valores);

	    	$resultados["mensaje"] = "Ingreso Correctamente";
			$resultados["validacion"] = "success";
		}else{
			$resultados["mensaje"] = "Usuario y/o password incorrectos";
			$resultados["validacion"] = "error";
		}

		print json_encode($resultados);

?>