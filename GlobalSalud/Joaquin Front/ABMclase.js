var app = angular.module('ABMclases', []);
app.controller('ctrlABM', function($scope, $http) {


$scope.buscar = function () {
	$http.get("ajax.php?mode=mostrar&tipo=ritmos")
		.success(function (response) {
			$scope.ritmos = response;
			$scope.ritmoSeleccionado = $scope.ritmos[0];
		})

	$http.get("ajax.php?mode=mostrar&tipo=profesores")
		.success(function (response) {
			$scope.profesores = response;
			$scope.profesorSeleccionado = $scope.profesores[0];
		})
	$scope.dias = [{"nombre":"Lunes", "id":1}, {"nombre":"Martes", "id":2}, {"nombre":"Miercoles","id":3}, {"nombre":"Jueves","id":4}, {"nombre":"Viernes","id":5}, {"nombre":"Sabado","id":6}, {"nombre":"Domingo", "id":0}];
	$scope.dia = $scope.dias[0];
}

$scope.alta = function () {
	console.log($scope.horario);
	$http.post("ajax.php?mode=alta&tipo=clases", {'ritmo':$scope.ritmoSeleccionado.ID, 'profesor':$scope.profesorSeleccionado.ID, 'dia':$scope.dia.id, 'horario':$scope.horario, 'porcentaje':$scope.porcentaje})
	.success(function(response){
		$("#respuesta").html(response);
		$scope.mostrar();
	})
}

$scope.mostrar = function () {
	$http.get("ajax.php?mode=mostrar&tipo=clases")
		.success(function(response) {

			$scope.clases = response;
		})
	}



});