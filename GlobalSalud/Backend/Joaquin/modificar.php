<?php 

$db = new Conexion();
$data = json_decode(file_get_contents("php://input"));
$id = $db->real_escape_string($data->id);
$base = $_GET['tipo'];
switch($base){
	case 'alumnos':
		$nombre     = $db->real_escape_string($data->nombre);
		$apellido   = $db->real_escape_string($data->apellido);
		$telefono   = $db->real_escape_string($data->telefono);
		$mail       = $db->real_escape_string($data->mail);
		$carnet     = $db->real_escape_string($data->carnet);
		$dni        = $db->real_escape_string($data->dni);
		$nacimiento = $db->real_escape_string($data->nacimiento);
		$barrio     = $db->real_escape_string($data->barrio);
		$conocio    = $db->real_escape_string($data->conocio);
		$aptitud    = $db->real_escape_string($data->aptitud);
		$ingreso 	= $db->real_escape_string($data->ingreso);

		$db->query("UPDATE $base SET NOMBRE = '$nombre', APELLIDO = '$apellido', TELEFONO = '$telefono', MAIL = '$mail', CARNET = '$carnet', DNI = '$dni', NACIMIENTO = '$nacimiento', BARRIO = '$barrio', CONOCIO = '$conocio', APTITUD = '$aptitud', INGRESO = '$ingreso' WHERE ID = '$id'") or die("no anda la modificacion bailarines");

		echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El alumno ha sido modificado.
						</div>';

		break;
	case 'ritmos':
		$nombre = $db->real_escape_string($data->nombre);
		$clase = $db->real_escape_string($data->clase);
		$combo1 = $db->real_escape_string($data->combo1);
		$combo2 = $db->real_escape_string($data->combo2);
		$combo3 = $db->real_escape_string($data->combo3);

		$db->query("UPDATE $base SET NOMBRE = '$nombre', CLASE = '$clase', COMBO1 = '$combo1', COMBO2 = '$combo2', COMBO3 = '$combo3' WHERE ID = '$id'") or die("no anda la modificacion ritmos");

		echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El ritmo ha sido modificado.
						</div>';

		break;

	case 'productos':
		$nombre = $db->real_escape_string($data->nombre);
		$precio = $db->real_escape_string($data->precio);
		$stock = $db->real_escape_string($data->stock);
		
		$db->query("UPDATE $base SET NOMBRE = '$nombre', PRECIO = '$precio', STOCK = '$stock' WHERE ID = '$id' ") or die("no anda la modificacion productos");

		echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El producto ha sido modificado.
						</div>';
		break;
	case 'profesores':
		$nombre         = $db->real_escape_string($data->nombre);
		$apellido       = $db->real_escape_string($data->apellido);
		$telefono       = $db->real_escape_string($data->telefono);
		$mail           = $db->real_escape_string($data->mail);
		$nacimiento     = $db->real_escape_string($data->nacimiento);
		$barrio         = $db->real_escape_string($data->barrio);
		$ingreso        = $db->real_escape_string($data->ingreso);
		$monotributista = $db->real_escape_string($data->monotributista);
		$cuit           = $db->real_escape_string($data->cuit);
		$dni            = $db->real_escape_string($data->dni);

		$db->query("UPDATE $base SET NOMBRE = '$nombre', APELLIDO = '$apellido', TELEFONO = '$telefono', MAIL = '$mail', NACIMIENTO = '$nacimiento', BARRIO = '$barrio', INGRESO = '$ingreso', MONOTRIBUTISTA = '$monotributista', CUIT = '$cuit', DNI = '$dni' WHERE ID = '$id' ") or die ("no anda la modificacion productos");

		echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El profesor ha sido modificado.
						</div>';

		break;
	case 'inscriptos':

		$busqueda             = $db->query("SELECT * FROM $base WHERE ID = '$id'") or die("no anda la modificacion de inscriptos");
		$inscriptos           = $db->recorrer($busqueda);
		$idClase              = $db->real_escape_string($data->idClase);
		$asistencia           = $inscriptos['ASISTENCIA'];
		$asistenciaModificada = $asistencia - 1;
	

		$db->query("UPDATE $base SET ASISTENCIA = '$asistenciaModificada' WHERE ID = '$id'") or die("no se ha hecho la modificacion de inscriptos");

		echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> La clase ha sido descontada.
						</div>';

		$cl = $db->query("SELECT * FROM clases WHERE ID = '$idClase'");	
		$clase = $db->recorrer($cl);
		$asistenciaActual = $clase['ASISTENCIAS'];
		$asistenciaTotal = $asistenciaActual + 1;	
		$porcentaje = $clase['PORCENTAJE'];
		$h = $db->query("SELECT * FROM ritmos WHERE ID = '$inscriptos[IDRITMO]'");

		$filaRitmos = $db->recorrer($h);

		switch ($inscriptos['PAGO']) {
			case 1:
				$precio = $filaRitmos['CLASE'] * ($porcentaje / 100);
				break;
			case 2:
				$precio = ($filaRitmos['COMBO1']/4) * ($porcentaje / 100);
				break;
			case 3:
				$precio = ($filaRitmos['COMBO2']/8) * ($porcentaje / 100);
				break;
			case 4:
				$precio = ($filaRitmos['COMBO3']/12) * ($porcentaje / 100);
				break;
			default:
				# code...
				break;
		}
		$precioActual = $clase['PAGAR'];

		$precioTotal = $precioActual + $precio;
	
		$db->query("UPDATE clases SET ASISTENCIAS = '$asistenciaTotal', PAGAR = '$precioTotal' WHERE ID = '$idClase'");

		

		
		
	




	break;
	default:
		echo "no anda el switch modificacion";
		break;
}




?>