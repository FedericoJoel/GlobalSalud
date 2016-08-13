<?php

$db= new Conexion();
$data = json_decode(file_get_contents("php://input"));
$id = $db->real_escape_string($data->id);

//if ($id == NULL){
//$query = $db->query("SELECT * FROM ritmos") or die("es una mierda");

//} else {
	$query = $db->query("SELECT * FROM ritmos WHERE IDALUMNO = '$id'") or die ("no anda");

//}

while($row = $db->recorrer($query)) {
    $datos[] = $row;
	
}

print json_encode($datos);


?>