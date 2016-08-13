<?php

$db= new Conexion();
date_default_timezone_set('America/Argentina/Buenos_Aires');
$data = json_decode(file_get_contents("php://input"));
$carnet = $db->real_escape_string($data->carnet);
$date = date("w");

$alumnos = $db->query("SELECT * FROM alumnos WHERE CARNET = '$carnet'") or die("no encontre nada");
$filaAlumnos = $db->recorrer($alumnos);

$inscriptos = $db->query("SELECT * FROM inscriptos WHERE IDALUMNO = '$carnet'") or die("no hay inscriptos");
$i = 0;
$j=0;

while($filaInscriptos = $db->recorrer($inscriptos)){

	$ritmo      = $db->query("SELECT * FROM ritmos WHERE ID = '$filaInscriptos[IDRITMO]'") or die ("no hay ritmos");
	$filaRitmos = $db->recorrer($ritmo);
	$ritmos[$i] = array("id"=>$filaRitmos['ID'], "nombre"=>$filaRitmos['NOMBRE'],"precio"=>$filaRitmos['CLASE'], "asistencia"=>$filaInscriptos['ASISTENCIA'], "idInscripcion"=>$filaInscriptos['ID']);
	
	$clases     = $db->query("SELECT * FROM clases WHERE IDRITMO = '$filaInscriptos[IDRITMO]' AND DIA = '$date' ") or die ("no hay clases");
	$i++;

	while($filaClases = $db->recorrer($clases)){

		$profesores       = $db->query("SELECT * FROM profesores WHERE ID = '$filaClases[IDPROFESOR]'");
		$filaProfesores   = $db->recorrer($profesores);
		$clasesA [$j]     = array("idRitmo"=>$filaClases['IDRITMO'], "ritmo"=>$filaRitmos['NOMBRE'], "dia"=>$filaClases['DIA'], "idInscripcion"=>$filaInscriptos['ID'],"profesor"=>$filaProfesores['NOMBRE'], "hora"=>$filaClases['HORARIO'], "id"=>$filaClases['ID']);
		
		$j++;
	}
}

$datos = array(

			"id"             =>$filaAlumnos['ID'],
			"nombre"         =>$filaAlumnos['NOMBRE'],
			"apellido"       =>$filaAlumnos['APELLIDO'],
			"dni"            =>$filaAlumnos['DNI'],
			"telefono"		 =>$filaAlumnos['TELEFONO'],
			"carnet"		 =>$carnet,
			"ritmos"         =>$ritmos,
			"clases"         =>$clasesA
			
	);

unset($ritmos,$clasesA,$profesoresA);
print json_encode($datos);


?>