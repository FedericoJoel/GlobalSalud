 var app = angular.module('bailarines', []);
app.controller('ctrlBailarines', function($scope, $http) {


$scope.combosDisponibles = [{"nombre":"Clase", "id":1}, {"nombre":"Combo de 4", "id":2},  {"nombre":"Combo de 8", "id":3},  {"nombre":"Combo de 12", "id":4}];


// TRAE A UN ALUMNO Y SE IMPRIME LA FICHA EN PANTALLA CON SUS DATOS
    $scope.listarBailarines = function (carnet) {
        
      $http.post("ajax.php?mode=listaBailarines", {'carnet':carnet})
      .success(function (response){
           
        $scope.alumno = response;
        $scope.mostrarAlumno = true;
         console.log(response);
      })
    }
       
// BUSCA TODOS LOS RITMOS QUE HAY DISPONIBLES PARA ASIGNARLE A UN ALUMNO
    $scope.buscar = function () {
      $http.get("ajax.php?mode=mostrar&tipo=ritmos")
        .success(function (response) {
          $scope.ritmosDisponibles = response;
          $scope.ritmoSeleccionado = $scope.ritmosDisponibles[0];
      })

  }

// LE AGREGA UN RITMO A UN ALUMNO
    $scope.agregarRitmo = function() {
      
      $http.post("ajax.php?mode=alta&tipo=inscriptos", {'carnet':$scope.carnet, 'ritmo':$scope.ritmoSeleccionado.ID, 'combos':$scope.combos.id})
        .success(function(response){
          $scope.listarBailarines($scope.carnet);
          $("#respuesta").html(response);
          console.log(response);
          
        })
    }
// LE SACA UN RITMO A UN ALUMNO
    $scope.sacarRitmo = function(id) {
      $http.post("ajax.php?mode=borrar&tipo=inscriptos", {'id':id})
        .success(function(response){
           $scope.listarBailarines($scope.carnet);
           $("#respuesta").html(response);
        })
    }
// LE DESCUENTA UNA ASISTENCIA A UN ALUMNO
    $scope.descontar = function(id, idClase) {
      $http.post("ajax.php?mode=modificar&tipo=inscriptos", {'id':id, 'idClase':idClase})
        .success(function(response){
          $scope.listarBailarines($scope.carnet);
          $("#respuesta").html(response);
          $scope.buscarClases();
        })
      
    }

    $scope.buscarClases = function() {
      $http.get("ajax.php?mode=tiempoReal")
        .success(function(response) {
          $scope.clases = response;
          console.log(response);
        })
    }

    });
