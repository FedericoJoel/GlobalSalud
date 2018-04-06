var app = angular.module('ABMalumno', []);
app.controller('ctrlABM', function($scope, $http) {

$scope.alta = function () {
	
	$http.post("ajax.php?mode=alta&tipo=alumnos", {'nombre':$scope.nombre, 'apellido':$scope.apellido, 'telefono':$scope.telefono, 'mail':$scope.mail, 'carnet':$scope.carnet, 'dni':$scope.dni, 'nacimiento':$scope.nacimiento, 'barrio':$scope.barrio, 'conocio':$scope.conocio, 'aptitud':$scope.aptitud, 'ingreso':$scope.ingreso})
		.success(function(response) {
			$("#respuesta").html(response);
			$scope.mostrar();
		})
}

$scope.mostrar = function () {
	$http.get("ajax.php?mode=mostrar&tipo=alumnos")
		.success(function(response) {
			$scope.alumnos = response;
		})
}
$scope.llenarModal = function (id) {
	
	$http.post("ajax.php?mode=llenarModal&tipo=alumnos", {'id':id})
		.success(function(response) {
			$scope.nombreedi = response.NOMBRE;
			$scope.apellidoedi = response.APELLIDO;
			$scope.telefonoedi = response.TELEFONO;
			$scope.mailedi = response.MAIL;
			$scope.carnetedi = response.CARNET;
			$scope.dniedi = response.DNI;
			$('#ingresoedi').val(response.INGRESO);
			$scope.ingresoedi = response.INGRESO;
			$('#Nacimientoedi').val(response.NACIMIENTO);
			$scope.nacimientoedi = response.NACIMIENTO;
			$scope.barrioedi = response.BARRIO;
			$scope.conocioedi = response.CONOCIO;
			$scope.aptitudedi = response.APTITUD;
			$scope.id = response.ID;
			$scope.alum = response;
		})
}
$scope.modificar = function () {
	
	var fecha = $('#Nacimientoedi').val();
	$http.post("ajax.php?mode=modificar&tipo=alumnos", {'id':$scope.id, 'nombre':$scope.nombreedi, 'apellido':$scope.apellidoedi, 'telefono':$scope.telefonoedi, 'mail':$scope.mailedi, 'carnet':$scope.carnetedi, 'dni':$scope.dniedi, 'nacimiento':fecha, 'barrio':$scope.barrioedi, 'conocio':$scope.conocioedi, 'aptitud':$scope.aptitudedi, 'ingreso':$scope.ingresoedi })
		.success(function(response) {
			$("#respuesta").html(response);
			$scope.mostrar();
			$("html, body").animate({scrollTop:"0px"});
		})
}

$scope.borrar = function (id) {
	
	$http.post("ajax.php?mode=borrar&tipo=alumnos", {'id':id})
		.success(function(response) {
			
			$scope.mostrar();
			$("#respuesta").html(response);
			$("html, body").animate({scrollTop:"0px"});
		})
}

});