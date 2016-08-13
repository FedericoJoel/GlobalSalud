<?php 
$db = new Conexion();
$data = json_decode(file_get_contents("php://input"));
$id = $db->real_escape_string($data->id);
$base = $_GET['tipo'];
$db->query("DELETE FROM $base WHERE ID = '$id'") or die("no funciono");

echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> Se ha eliminado correctamente.
						</div>';


?>