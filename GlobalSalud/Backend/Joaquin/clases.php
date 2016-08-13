<?php 

$db = new Conexion();
date_default_timezone_set('America/Argentina/Buenos_Aires');
$date = date("w");
$hora = date("H:i:s");
$data = json_decode(file_get_contents("php://input"));
$tiempo = $db->real_escape_string($data->tiempo);

// lunes 15:00 16 
// martes 15:00 16 
// lunes 15:30 16:30


$q = $db->query("SELECT * FROM clases WHERE DIA = '$date' AND (HORARIO <= '$hora' AND FIN >= '$hora') ") or die("no anda la seleccion de fechas");

while($h = $db->recorrer($q)){

	$ritmos = $db->query("SELECT * FROM ritmos WHERE ID = '$h[IDRITMO]' ");
	$ritmo = $db->recorrer($ritmos);
	$profesores = $db->query("SELECT * FROM profesores WHERE ID = '$h[IDPROFESOR]' ");
	$profesor = $db->recorrer($profesores);

	$datos[] = array(


		'profesor' => $h['PROFESOR'],
		'inicio' => $h['HORARIO'],
		'fin' => $h['FIN'],
		'ritmo' => $ritmo['NOMBRE'],
		'profesor' => $profesor['NOMBRE'],
		'total' => $h['ASISTENCIAS'],
		'pagar' => $h['PAGAR']



		);
	
}
print json_encode($datos);
?>