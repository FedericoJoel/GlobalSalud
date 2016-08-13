<?php

require("conexion.php");

	$resultados = array();

if (!empty($_GET['DNI']) and !empty($_GET['nAfiliado'])) {

	$db = new Conexion();
	$DNIenviado = $_GET['DNI'];
	$nAfiliadoenviado = $_GET['nAfiliado'];

	$sql = "SELECT ID FROM Afiliados WHERE DNI = '$DNIenviado' AND NAFILIADO = '$nAfiliadoenviado'";
	$view = $db->query($sql);

	if($db->rows($view) > 0 ) {
	    $id = $db->recorrer($view);
	    $db->liberar($view);

	    $resultados["mensaje"] = "Validacion Correcta";
		$resultados["validacion"] = "ok";
	}else{
		$resultados["mensaje"] = "Usuario y password incorrectos";
		$resultados["validacion"] = "error";
	}
}else{
	$resultados["mensaje"] = "Llena los campos pajero";
	$resultados["validacion"] = "error";
}

/*convierte los resultados a formato json*/
$resultadosJson = json_encode($resultados);
/*muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
?>