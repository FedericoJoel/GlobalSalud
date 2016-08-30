angular.module('app.controllers', [])
     
.controller('loginCtrl', function($scope,UserSrv,$ionicPopup,$state,$http) {
	$scope.data = {};

	$scope.login = function(){
        //ruta = UserSrv.getPath();

        if (!$scope.data.dni || !$scope.data.nafiliado) {
            var alertPopup = $ionicPopup.alert({
                title: 'Debe completar los campos',
                
            });
        }else{
            $http.post( UserSrv.getPath() + "/login.php", {'dni':$scope.data.dni, 'nafiliado':$scope.data.nafiliado})
                .success(function(response) {
                    if (response.validacion=="success") {
                        UserSrv.setDNI($scope.data.dni);
                        var dni = UserSrv.getDNI();
                        UserSrv.setNsocio($scope.data.nafiliado);
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


        // EN ESPERA
        $http.post( UserSrv.getPath() + "/1.php", {'dni':dni, 'estado':'En Espera', 'confimarcion':0, 'tipo':'Turno' })
        
        .success(function(response) {
            $scope.solicitudesEspera = response;
            console.log(response);
        })

        // PENDIENTES
        $http.post( UserSrv.getPath() + "/1.php", {'dni':dni, 'estado':'Pendiente', 'tipo':'Pendiente' })
        
        .success(function(response) {
            $scope.solicitudesPendiente = response;
            console.log(response);
        })

        // ABIERTOS
        $http.post( UserSrv.getPath() + "/1.php", {'dni':dni, 'estado':'Abierto', 'tipo':'Pendiente' })
        
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
        $http.post( UserSrv.getPath() + "/1.php", {'dni':dni, 'estado':'Confirmado', 'confirmacion':2, 'tipo':'Turno' })
        
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
        $http.post( UserSrv.getPath() + "/1.php", {'dni':dni, 'estado':'Rechazado', 'confirmacion':1, 'tipo':'Turno'  })
        
        .success(function(response) {
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }

    $scope.listar();

})
   
.controller('busquedaPorPartidoCtrl', function($scope,$http,$state,$stateParams,UserSrv) {

    $scope.esp = $stateParams.especialidad;

    $scope.listarLocalidades = function(){

        $http.post( UserSrv.getPath() + "/listarLocalidades.php", {'especialidad':$scope.esp})
        
        .success(function(response) {
            $scope.localidades = response;
        })
    }

    $scope.listarLocalidades();

    $scope.elegirLocalidad = function(localidad){

        $state.go('menu.listaDeClinicas',{localidad:localidad, especialidad:$scope.esp});
        
    }

})
   
.controller('clinicasYParticularesCtrl', function($scope) {

})

.controller('listaDeClinicasCtrl', function($scope,$http,$state,$stateParams,UserSrv) {

    $scope.listar = function(){
        localidad = $stateParams.localidad;
        especialidad = $stateParams.especialidad;

        $http.post( UserSrv.getPath() + "/listarClinicas.php", {'localidad':localidad,'especialidad':especialidad})
        
        .success(function(response) {
            $scope.clinicas = response;
            console.log(response);
        })
    }

    $scope.listar();

    console.log($scope.clinicas);

    $scope.elegirClinica = function(clinica){

        $state.go('menu.solicitarTurno',{clinica:clinica});

    }

})
   
.controller('solicitarTurnoCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {

    $scope.listar = function(){
        clinica = $stateParams.clinica;
        $http.post( UserSrv.getPath() + "/mostrarClinica.php", {'clinica':clinica})
        
        .success(function(response) {
            $scope.clinica = response;
        })
    }


    $scope.listar();


    $scope.enviar = function(){

        clinica = $stateParams.clinica;
        dni = UserSrv.getDNI();
        carnet = UserSrv.getNsocio();
        sugerido = $scope.sugerido;

        $http.post( UserSrv.getPath() + "/altaSolicitud.php", {'clinica':clinica,'dni':dni,'nafiliado':carnet,'sugerido':sugerido,'especialidad':1})
        
        .success(function() {
            var alertPopup = $ionicPopup.alert({
                title: 'Su solicitud se ha enviado',
            });

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('menu.t_pendientes');


        })
    }

})

.controller('confirmacionSolicitud', function($scope,$http,$state,$stateParams,UserSrv) {

    $scope.listar = function(){
        id = $stateParams.id;
        $http.post( UserSrv.getPath() + "/mostrarsolicitud.php", {'id':id})
        
        .success(function(response) {
            $scope.solicitud = response;
        })
    }

    $scope.listar();

    $scope.confirmar = function(){
        id = $stateParams.id;
        $http.post( UserSrv.getPath() + "/confirmacionSolicitud.php", {'idsolicitud':id, 'accion':'confirmar','motivo':$scope.motivo})
        
        .success(function(response) {
            $scope.solicitud = response;
        })
    }

    $scope.rechazar = function(){
        id = $stateParams.id;
        $http.post( UserSrv.getPath() + "/confirmacionSolicitud.php", {'idsolicitud':id, 'accion':'rechazar','motivo':$scope.motivo})
        
        .success(function(response) {
            $scope.solicitud = response;
        })
    }

})
 