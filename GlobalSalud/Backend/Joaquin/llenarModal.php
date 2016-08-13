<?php 

$db = new Conexion();
$data = json_decode(file_get_contents("php://input"));
$id = $db->real_escape_string($data->id);
$base = $_GET['tipo'];
$valor = $db->query("SELECT * FROM $base WHERE ID = '$id'") or die(" la puta madre");
$datos = $db->recorrer($valor);

echo json_encode($datos);

?>