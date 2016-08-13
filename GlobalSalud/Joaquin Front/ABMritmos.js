var app = angular.module('ABMritmo', []);
app.controller('ctrlABM', function($scope, $http) {

$scope.alta = function () {
	
	$http.post("ajax.php?mode=alta&tipo=ritmos", {'nombre':$scope.nombre, 'clase':$scope.precioc, 'combo1':$scope.combo1, 'combo2':$scope.combo2, 'combo3':$scope.combo3})
		.success(function(response) {
			
			$("#respuesta").html(response);

			$scope.mostrar();
		})
}

$scope.mostrar = function () {
	$http.get("ajax.php?mode=mostrar&tipo=ritmos")
		.success(function(response) {

			$scope.ritmos = response;
		})
}
$scope.llenarModal = function (id) {
	
	$http.post("ajax.php?mode=llenarModal&tipo=ritmos", {'id':id})
		.success(function(response) {
			$scope.nombreedi = response.NOMBRE;
			$scope.preciocedi = response.CLASE;
			$scope.combo1edi = response.COMBO1;
			$scope.combo2edi = response.COMBO2;
			$scope.combo3edi = response.COMBO3;
			$scope.id = response.ID;
			$scope.rit = response;
		})
}
$scope.modificar = function () {
	
	
	$http.post("ajax.php?mode=modificar&tipo=ritmos", {'id':$scope.id, 'nombre':$scope.nombreedi, 'clase':$scope.preciocedi, 'combo1':$scope.combo1edi, 'combo2':$scope.combo2edi, 'combo3':$scope.combo3edi})
		.success(function(response) {
			$("#respuesta").html(response);
			$("html, body").animate({scrollTop:"0px"});
			$scope.mostrar();
		})
}
$scope.borrar = function (id) {
	$http.post("ajax.php?mode=borrar&tipo=ritmos", {'id':id})
		.success(function(response) {
		
			$("#respuesta").html(response);
			$("html, body").animate({scrollTop:"0px"});
			$scope.mostrar();
		})
}

});