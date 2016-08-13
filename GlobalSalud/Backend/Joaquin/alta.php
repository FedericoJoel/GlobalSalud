<?php

$db = new Conexion();
$data = json_decode(file_get_contents("php://input"));
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
		
		$valores = $db->query("SELECT * FROM $base");
		
		while($row = $db->recorrer($valores)){
			if($row['MAIL'] == $mail){
				$error = 1;
				break;
			}
			if ($row['CARNET'] == $carnet){
				$error = 2;
				break;
			}
		}
		
		switch($error){
			case 1:
				echo '<div class="alert alert-warning alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Cuidado!</strong> El mail ingresado ya existe porfavor ingrese el correcto.
						</div>';
				break;
			case 2: 
				echo '<div class="alert alert-warning alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Cuidado!</strong> El numero de carnet ya existe porfavor ingrese el correcto.
						</div>';
				break;
			default:
				$db->query("INSERT INTO $base (NOMBRE, APELLIDO, TELEFONO, DNI, MAIL, NACIMIENTO, BARRIO, CONOCIO, APTITUD, CARNET, INGRESO)
				 VALUES ('$nombre', '$apellido', '$telefono', '$dni', '$mail', '$nacimiento', '$barrio', '$conocio', '$aptitud', '$carnet', '$ingreso')") or die("no anda el insert alumnos");
				echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El alumno ha sido dado de alta.
						</div>';

				break;
		}
		break;
	case 'ritmos':
		$nombre = $db->real_escape_string($data->nombre);
		$clase = $db->real_escape_string($data->clase);
		$combo1 = $db->real_escape_string($data->combo1);
		$combo2 = $db->real_escape_string($data->combo2);
		$combo3 = $db->real_escape_string($data->combo3);

		$valores = $db->query("SELECT * FROM $base");

		while($row = $db->recorrer($valores)){
			if($row['NOMBRE'] == $nombre){
				$error = 1;
				break;
			}
		}

		switch($error){
			case 1:
				echo '<div class="alert alert-warning alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Cuidado!</strong> El nombre del ritmo ingresado ya existe en la base de datos.
						</div>';
				break;
			default:
				$db->query("INSERT INTO $base (NOMBRE, CLASE, COMBO1, COMBO2, COMBO3) VALUES ('$nombre', '$clase', '$combo1', '$combo2', '$combo3')") or die("no anda el insert ritmos");
				echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El ritmo ha sido dado de alta.
						</div>';
				break;
		}
		break;
	case 'profesores':
		$nombre = $db->real_escape_string($data->nombre);
		$apellido = $db->real_escape_string($data->apellido);
		$telefono = $db->real_escape_string($data->telefono);
		$mail = $db->real_escape_string($data->mail);
		$nacimiento = $db->real_escape_string($data->nacimiento);
		$barrio = $db->real_escape_string($data->barrio);
		$ingreso = $db->real_escape_string($data->ingreso);
		$monotributista = $db->real_escape_string($data->monotributista);
		$cuit = $db->real_escape_string($data->cuit);
		$dni = $db->real_escape_string($data->dni);
		$valores = $db->query("SELECT * FROM $base");
		
		while($row = $db->recorrer($valores)){
			if($row['MAIL'] == $mail){
				$error = 1;
				break;
			}
		}
		
		switch($error){
			case 1:
				echo '<div class="alert alert-warning alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Cuidado!</strong> El profesor ingresado ya existe por favor ingrese el correcto.
						</div>';
				break;
			default:
				$db->query("INSERT INTO $base (NOMBRE, APELLIDO, TELEFONO, MAIL, NACIMIENTO, BARRIO, INGRESO, MONOTRIBUTISTA, CUIT, DNI) VALUES ('$nombre', '$apellido', '$telefono', '$mail', '$nacimiento', '$barrio', '$ingreso', '$monotributista', '$cuit', '$dni')") or die("no anda el insert profesores");
				echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El profesor ha sido dado de alta.
						</div>';
				break;
		}
		break;
	case 'productos':
		$nombre = $db->real_escape_string($data->nombre);
		$precio = $db->real_escape_string($data->precio);
		$stock = $db->real_escape_string($data->stock);

		$valores = $db->query("SELECT * FROM $base");
		
		while($row = $db->recorrer($valores)){
			if($row['NOMBRE'] == $nombre){
				$error = 1;
				break;
			}
		}
		
		switch($error){
			case 1:
				echo '<div class="alert alert-warning alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Cuidado!</strong> El producto ingresado ya existe por favor ingrese el correcto.
						</div>';
				break;
			default:
				$db->query("INSERT INTO $base (NOMBRE, PRECIO, STOCK) VALUES ('$nombre', '$precio', '$stock')") or die("no anda el insert productos");

				echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> El producto ha sido dado de alta.
						</div>';
				break;
		}
		break;
	case 'clases':
		$ritmo      = $db->real_escape_string($data->ritmo);
		$profesor   = $db->real_escape_string($data->profesor);
		$dia        = $db->real_escape_string($data->dia);
		$horario = $db->real_escape_string($data->horario);
		$porcentaje = $db->real_escape_string($data->porcentaje);
		echo $horario;

		$db->query("INSERT INTO $base (IDRITMO, IDPROFESOR, DIA, HORARIO, PORCENTAJE) VALUES ('$ritmo', '$profesor', '$dia', '$horario', '$porcentaje') ") or die ("no anda el insert clases");
		echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> La clase ha sido dado de alta.
						</div>';
		break;
	case 'inscriptos':
		$carnet = $db->real_escape_string($data->carnet);
		$ritmo = $db->real_escape_string($data->ritmo);
		$asistencias = $db->real_escape_string($data->asistencias);
		$combos = $db->real_escape_string($data->combos);

		switch($combos){
			case 1:
				$asistencias = 1;
				break;
			case 2: 
				$asistencias = 4;
				break;
			case 3:
				$asistencias = 8;
				break;
			case 4:
				$asistencias = 12;
				break;
			default:
				break; 
		}


		$inscripciones = $db->query("SELECT * FROM $base WHERE IDALUMNO = '$carnet'") or die ("no se puede buscar");
		while($row = $db->recorrer($inscripciones)){
			if($row['IDRITMO'] == $ritmo){
				$error = 0;
				echo $row['IDRITMO']. 'no hay nada';
				echo $ritmo;
				break;
			} else { $error = 1;} 

		}
		if($error === 0){

				echo '<div class="alert alert-warning alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Cuidado!</strong> El alumno ya esta inscripto a este ritmo.
						</div>'; 
						echo $row['IDRITMO'] . 'no hay nada';
						echo $ritmo;
					} else {


		$db->query("INSERT INTO $base (IDALUMNO, IDRITMO, ASISTENCIA, PAGO) VALUES ('$carnet', '$ritmo','$asistencias', '$combos')") or die ("no anda el alta inscriptos");

		echo '<div class="alert alert-success alert-dismissable">
 					 <button type="button" class="close" data-dismiss="alert">&times;</button>
 					 <strong>¡Bien!</strong> Se ha inscripto a un ritmo.
						</div>';
					}



		break;
	default:
		echo "no esta entrando al switch tipo";
		break;
}





?>