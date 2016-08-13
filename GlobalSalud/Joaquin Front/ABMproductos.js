var app = angular.module('ABMproducto', []);
app.controller('ctrlABM', function($scope, $http) {

$scope.alta = function () {
	
	$http.post("ajax.php?mode=alta&tipo=productos", {'nombre':$scope.nombre, 'precio':$scope.precio, 'stock':$scope.stock})
		.success(function(response) {
			
			$('#respuesta').html(response);
			$scope.mostrar();
		})
}

$scope.mostrar = function () {
	$http.get("ajax.php?mode=mostrar&tipo=productos")
		.success(function(response) {

			$scope.productos = response;
		})
}
$scope.llenarModal = function (id) {
	
	$http.post("ajax.php?mode=llenarModal&tipo=productos", {'id':id})
		.success(function(response) {
			
			$scope.nombreedi = response.NOMBRE;
			$scope.precioedi = response.PRECIO;
			$scope.stockedi = response.STOCK;
			$scope.id = response.ID;
			$scope.produc = response;
		})
}
$scope.modificar = function () {
	
	
	$http.post("ajax.php?mode=modificar&tipo=productos", {'id':$scope.id, 'nombre':$scope.nombreedi, 'precio':$scope.precioedi, 'stock':$scope.stockedi})
		.success(function(response) {
			$("#respuesta").html(response);
			$scope.mostrar();
			$("html, body").animate({scrollTop:"0px"});
		})
}
$scope.borrar = function (id) {
	$http.post("ajax.php?mode=borrar&tipo=productos", {'id':id})
		.success(function(response) {
			
			$("#respuesta").html(response);
			$scope.mostrar();
			$("html, body").animate({scrollTop:"0px"});
		})
}

});