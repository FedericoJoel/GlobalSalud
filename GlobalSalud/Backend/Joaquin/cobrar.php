<?php

$db = new Conexion();
$data = json_decode(file_get_contents("php://input"));

$cantidad = $db->real_escape_string($data->cantidad);
$id = $db->real_escape_string($data->id);

$query = $db->query("SELECT * FROM bailarines WHERE ID = '$id'") or die("la puta madre");
$bailarin = $db->recorrer($query);

$cantidadActual = $bailarin['CLASES'];
$cantidadModificada = $cantidadActual + $cantidad;

$db->query("UPDATE bailarines SET CLASES = '$cantidadModificada' WHERE ID = '$id'") or die ("no anda update");
?>