<?php

$db= new Conexion();

$data = json_decode(file_get_contents("php://input"));
$id = $db->real_escape_string($data->id);
$idRitmo = $db->real_escape_string($data->idRitmo);

$inscriptos = $db->query("SELECT * FROM inscriptos WHERE IDALUMNO = '$id' AND IDRITMO = '$idRitmo'");
$filaInscriptos = $db->recorrer($inscriptos);

$asistencias = $filaInscriptos['ASISTENCIA'];
$asistenciaActual = $asistencias - 1;

$db->query("UPDATE inscriptos SET ASISTENCIA = '$asistenciaActual' WHERE IDALUMNO = '$id' AND IDRITMO = '$idRitmo'");

print $asistenciaActual;
?>