angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope,UserSrv,$ionicPopup,$state,$http) {
	$scope.data = {};

	$scope.login = function(){

        if (!$scope.data.dni || !$scope.data.nafiliado) {
            var alertPopup = $ionicPopup.alert({
                title: 'Debe completar los campos',
                
            });
        }else{
            $http.post("http://hola-jaccinelli.c9users.io/GlobalSalud/Backend/login.php", {'dni':$scope.data.dni, 'nafiliado':$scope.data.nafiliado})
                .success(function(response) {
                    if (response.validacion=="success") {
                        UserSrv.setDNI($scope.data.dni);
                        var dni = UserSrv.getDNI();
                        UserSrv.setNsocio($scope.data.nsocio);
                        $state.go('menu.t_pendientes');
                    }else{
                        var alertPopup = $ionicPopup.alert({
                            title: 'Error al ingresar',
                            subTitle: 'Dni y/o numero de afiliado incorrecto.'
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
        $http.post("http://localhost:8888/listarsolicitudes.php", {'dni':dni, 'estado':'En Espera' })
        
        .success(function(response) {
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
        $http.post("http://localhost:8888/listarsolicitudes.php", {'dni':dni, 'estado':'' })
        
        .success(function(response) {
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }
<<<<<<< HEAD
    $scope.confirmar = function(){
        $state.go('menu.confirmacionSolicitud');
=======

    $scope.confirmar = function(id){
        $state.go('menu.confirmacionSolicitud',{id:id});
>>>>>>> f33a4d056937c350e6c9d0055effb09c1e77b126
    }

    $scope.listar();

})

.controller('t_confirmadosCtrl', function($scope,UserSrv,$state,$http) {

    $scope.listar = function(){
        var dni = UserSrv.getDNI();
        $http.post("http://localhost:8888/listarsolicitudes.php", {'dni':dni })
        
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
        $http.post("http://localhost:8888/listarsolicitudes.php", {'dni':dni })
        
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
 