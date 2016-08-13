var app = angular.module('ABMprofe', []);
app.controller('ctrlABM', function($scope, $http) {

$scope.alta = function () {
	
	$http.post("ajax.php?mode=alta&tipo=profesores", {'nombre':$scope.nombre, 'apellido':$scope.apellido, 'telefono':$scope.telefono, 'mail':$scope.mail, 'nacimiento':$scope.nacimiento, 'barrio':$scope.barrio, 'ingreso':$scope.ingreso, 'monotributista':$scope.monotributista, 'cuit':$scope.cuit, 'dni':$scope.dni})
		.success(function(response) {
			
			$("#respuesta").html(response);
			$scope.mostrar();
		})
}

$scope.mostrar = function () {
	$http.get("ajax.php?mode=mostrar&tipo=profesores")
		.success(function(response) {

			$scope.profes = response;
		})
}
$scope.llenarModal = function (id) {
	
	$http.post("ajax.php?mode=llenarModal&tipo=profesores", {'id':id})
		.success(function(response) {
			
			$scope.nombreedi         = response.NOMBRE;
			$scope.apellidoedi       = response.APELLIDO;
			$scope.telefonoedi       = response.TELEFONO;
			$scope.mailedi           = response.MAIL;
			$scope.nacimientoedi     = response.NACIMIENTO;
			$scope.barrioedi         = response.BARRIO;
			$scope.ingresoedi        = response.INGRESO;
			$scope.monotributistaedi = response.MONOTRIBUTISTA;
			$scope.cuitedi           = response.CUIT;
			$scope.dniedi            = response.DNI;
			$scope.id                = response.ID;
			$scope.prof              = response;
			$('#ingresoedi').val(response.INGRESO);
			$('#Nacimientoedi').val(response.NACIMIENTO);
		})
}
$scope.modificar = function () {
	
	
	$http.post("ajax.php?mode=modificar&tipo=profesores", {'id':$scope.id, 'nombre':$scope.nombreedi, 'apellido':$scope.apellidoedi, 'telefono':$scope.telefonoedi, 'mail':$scope.mailedi, 'nacimiento':$scope.nacimientoedi, 'barrio':$scope.barrioedi, 'ingreso':$scope.ingresoedi, 'monotributista':$scope.monotributistaedi, 'cuit':$scope.cuitedi, 'dni':$scope.dniedi})
		.success(function(response) {
			$("#respuesta").html(response);
			$scope.mostrar();
			$("html, body").animate({scrollTop:"0px"});
		})
}
$scope.borrar = function (id) {
	$http.post("ajax.php?mode=borrar&tipo=profesores", {'id':id})
		.success(function(response) {
			
			$("#respuesta").html(response);
			$scope.mostrar();
			$("html, body").animate({scrollTop:"0px"});
		})
}

});