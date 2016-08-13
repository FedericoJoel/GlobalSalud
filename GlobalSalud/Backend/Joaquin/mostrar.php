<?php

$db = new Conexion();
$base = $_GET['tipo'];
$valores = $db->query("SELECT * FROM $base");
while($row = $db->recorrer($valores)){
	$datos[] = $row;
}


echo json_encode($datos);



?>