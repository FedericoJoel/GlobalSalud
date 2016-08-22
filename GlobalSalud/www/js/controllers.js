angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope,UserSrv,$ionicPopup,$state,$http) {
	$scope.data = {};

	$scope.login = function(){

        if (!$scope.data.dni || !$scope.data.nafiliado) {
            var alertPopup = $ionicPopup.alert({
                title: 'Debe completar los campos',
                
            });
        }else{
            $http.post("http://localhost:8888/login.php", {'dni':$scope.data.dni, 'nafiliado':$scope.data.nafiliado})
                .success(function(response) {
                    if (response.validacion=="success") {
                        UserSrv.setDNI($scope.data.dni);
                        var dni = UserSrv.getDNI();
                        UserSrv.setNsocio($scope.data.nsocio);
                        $state.go('menu.t_pendientes');
                    }else{
                        console.log(response);
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error al ingresar',
                            subTitle: 'Dni y/o numero de afiliado es incorrecto.'
                        });
                    }
                })
                .error(function(data) {
                   var alertPopup = $ionicPopup.alert({
                       title: 'Error al ingresar',
                       template: 'Compruebe su conexion'
                   });
                });
        }
	}

})

.controller('t_pendientesCtrl', function($scope,UserSrv,$state,$http) {

    $scope.listar = function(){
        var dni = UserSrv.getDNI();

        $http.post("http://localhost:8888/1.php", {'dni':dni, 'estado':'En Espera', 'confimarcion':0, 'tipo':'Turno' })
        
        .success(function(response) {
            $scope.solicitudesEspera = response;
            console.log(response);
        })
        $http.post("http://localhost:8888/1.php", {'dni':dni, 'estado':'Pendiente', 'tipo':'Solicitud' })
        
        .success(function(response) {
            $scope.solicitudesPendiente = response;
            console.log(response);
        })
        $http.post("http://localhost:8888/1.php", {'dni':dni, 'estado':'Abierto', 'tipo':'Solicitud' })
        
        .success(function(response) {
            $scope.solicitudesAbierto = response;
            console.log(response);
        })
    }

    $scope.confirmar = function(id){
        $state.go('menu.confirmacionSolicitud',{id:id});
    }

    $scope.listar();

})

.controller('t_confirmadosCtrl', function($scope,UserSrv,$state,$http) {

    $scope.listar = function(){
        var dni = UserSrv.getDNI();
        $http.post("http://localhost:8888/1.php", {'dni':dni, 'estado':'Confirmado', 'confirmacion':2, 'tipo':'Turno' })
        
        .success(function(response) {
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }

    $scope.listar();
})

.controller('t_rechazadosCtrl', function($scope,UserSrv,$state,$http) {

    $scope.listar = function(){
        var dni = UserSrv.getDNI();
        $http.post("http://localhost:8888/1.php", {'dni':dni, 'estado':'Rechazado', 'confirmacion':1, 'tipo':'Turno'  })
        
        .success(function(response) {
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }

    $scope.listar();

})
   
.controller('busquedaPorPartidoCtrl', function($scope) {

})
   
.controller('clinicasYParticularesCtrl', function($scope) {

})
   
.controller('solicitarTurnoCtrl', function($scope) {

})

.controller('confirmacionSolicitud', function($scope,$http,$state,$stateParams) {

    $scope.listar = function(){
        id = $stateParams.id;
        console.log(id);
        $http.post("http://localhost:8888/mostrarsolicitud.php", {'id':id})
        
        .success(function(response) {
            $scope.solicitud = response;
            console.log(response);
        })
    }

    $scope.listar();
})
 