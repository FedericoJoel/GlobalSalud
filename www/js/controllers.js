angular.module('app.controllers', [])

.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('APIInterceptor');
  }])
     
.controller('loginCtrl', function($scope,UserSrv,$ionicPopup,$state,$http,$ionicScrollDelegate) {
	$scope.data = {};

    $scope.scroll = function(){

        $ionicScrollDelegate.scrollBottom();
    }

	$scope.login = function(){
        //ruta = UserSrv.getPath();

        if (!$scope.data.dni || !$scope.data.nafiliado) {
            var alertPopup = $ionicPopup.alert({
                title: 'Debe completar los campos',
                
            });
        }else{

            UserSrv.showLoading();
            var credenciales = {
                'name': $scope.data.dni,
                'password': $scope.data.nafiliado
              }
            $http.post( UserSrv.getRuta() + "/login", credenciales)
                .success(function(response) {
                    var token = response.data.token
                    var decoded = jwt_decode(token);
                    localStorage.setItem('token', token);
                    localStorage.setItem('logueado', true);
                    localStorage.setItem('dni', $scope.data.dni);
                    localStorage.setItem('nafiliado', $scope.data.nafiliado);
                    var dni = UserSrv.getDNI();
                    UserSrv.hideLoading();
                    $state.go('menu.t_pendientes');
                })
                .error(function(data) {
                    UserSrv.hideLoadingerror("Combinacion de usuario y contraseña incorrectos");
                });
        }
	}

    $scope.invitado = function(){
        //ruta = UserSrv.getPath();
            UserSrv.showLoading();

            $http.post( UserSrv.getPath() + "/login.php", {'dni':1  , 'nafiliado':1})
                .success(function(response) {
                    if (response.validacion=="success") {
                        UserSrv.setDNI(1);
                        var dni = UserSrv.getDNI();
                        UserSrv.setNsocio(2);
                        UserSrv.hideLoading();
                        $state.go('menu.t_pendientes');
                    }else{
                        UserSrv.hideLoadingerror("Tenemos problemas para ingresar como invitado en este momento, intenta mas tarde.");
                    }
                })
                .error(function(data) {
                    UserSrv.hideLoadingerror("Verifica tu conexion a internet");
                });
    }
    

})

.controller('t_pendientesCtrl', function($scope,UserSrv,$state,$http) {


    $scope.listar = function(){
        var dni = UserSrv.getDNI();


        // EN ESPERA
        UserSrv.showLoading();
        $http.get(UserSrv.getRuta() + "/solicitud/enespera/" + dni) // /solicitud/enespera
        
        .success(function(response) {
            if (typeof response == "string") {
                $scope.solicitudesEspera = [];
            }
            else{
               $scope.solicitudesEspera = response;
            //    response.length();
               UserSrv.setPendientes(response.length);
               console.log(UserSrv.getPendientes());
            }
            
            console.log($scope.solicitudesEspera);
        })


        // PENDIENTES Y ABIERTOS
        $http.get( UserSrv.getRuta() + "/solicitud/pendientesyabiertas/" + dni)
        
        .success(function(response) {
            if (typeof response == "string"){
                $scope.solicitudesPendiente = [];
            }
            else{
                $scope.solicitudesPendiente = response;
            }
            console.log(response);
            UserSrv.hideLoading();
        })

    }

    $scope.refresh = function(){
        var dni = UserSrv.getDNI();


        // EN ESPERA
        $http.get( UserSrv.getRuta() + "/solicitud/enespera/" + dni)
        
        .success(function(response) {
            if (typeof response == "string") {
                $scope.solicitudesEspera = [];
                // count  = response.length;
                // UserSrv.setPendientes(count);
                // console.log(UserSrv.getPendientes());
            }
            else{
               $scope.solicitudesEspera = response;
            //    response.length();
            //    UserSrv.setPendientes(response.length);

            }
            console.log(response);
        })


        // PENDIENTES Y ABIERTOS
        $http.get( UserSrv.getRuta() + "/solicitud/pendientesyabiertas/" + dni)
        
        .success(function(response) {
            if (typeof response == "string"){
                $scope.solicitudesPendiente = [];
            }
            else{
                $scope.solicitudesPendiente = response;
            }
            console.log(response);
        })

        /*$http({   
            method: 'POST',   
            url: 'http://api.gestionarturnos.com/solicitud/pendientesyabiertas', 
            data:{'dni':dni} 
        })
            .then(
                function successCallback(response) {     
                    console.log(response);
                }
            )*/
    }

    $scope.confirmar = function(id){
        $state.go('menu.confirmacionSolicitud',{id:id});
    }

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.listar();

})

.controller('t_confirmadosCtrl', function($scope,UserSrv,$state,$http) {

    $scope.listar = function(){
        var dni = UserSrv.getDNI();
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/solicitud/confirmadas/" + dni) // /solicitud/confirmadas

        .success(function(response) {
            UserSrv.hideLoading();
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }

    $scope.refresh = function(){
        var dni = UserSrv.getDNI();
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/solicitud/confirmadas/" + dni)
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.listar();
})

.controller('t_rechazadosCtrl', function($scope,UserSrv,$state,$http) {

    $scope.listar = function(){
        var dni = UserSrv.getDNI();
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/solicitud/rechazadas/" + dni)// /solicitud/rechazadas
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }

    $scope.refresh = function(){
        var dni = UserSrv.getDNI();
        $http.get( UserSrv.getRuta() + "/solicitud/rechazadas/" + dni)// /solicitud/rechazadas
        
        .success(function(response) {
            $scope.solicitudes = response;
            console.log($scope.solicitudes);
        })
    }

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.listar();

})
   
.controller('busquedaPorPartidoCtrl', function($scope,$http,$state,$stateParams,UserSrv,$ionicNavBarDelegate) {

    esp = $stateParams.especialidad;
    tipo = $stateParams.tipo;

    console.log(esp);

    $ionicNavBarDelegate.showBackButton(true);

    $scope.listarLocalidades = function(){
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/climedApp/localidades/" + esp) // /climed/clinicasPorEspecialidad/id
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.localidades = response;
        })
    }

    $scope.refresh = function(){
        $http.get( UserSrv.getRuta() + "/climedApp/localidades/" + esp)
        
        .success(function(response) {
            $scope.localidades = response;
        })
    }

    $scope.listarLocalidades();

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.elegirLocalidad = function(localidad){
        $state.go('menu.listaDeClinicas',{localidad:localidad, especialidad:esp,tipo:tipo});
    }

})
   
.controller('clinicasYParticularesCtrl', function($scope) {

})

.controller('listaDeClinicasCtrl', function($scope,$http,$state,$stateParams,UserSrv) {

    localidad = $stateParams.localidad;
    especialidad = $stateParams.especialidad;
    tipo = $stateParams.tipo;

    $scope.listar = function(){
        UserSrv.showLoading();
        $http.post( UserSrv.getRuta() + "/climedApp/clinicasPorEspecialidadYLocalidad", {'localidad':localidad,'especialidad':especialidad}) //aca dejo en minuscula 
        // POST /climed/clinicasPorEspecialidadYLocalidad 
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.clinicas = response;
            console.log(response);
        })
    }

    $scope.refresh = function(){
        localidad = $stateParams.localidad;
        especialidad = $stateParams.especialidad;

        $http.post( UserSrv.getRuta() + "/climedApp/clinicasPorEspecialidadYLocalidad", {'localidad':localidad,'especialidad':especialidad})
        
        .success(function(response) {
            $scope.clinicas = response;
            console.log(response);
        })
    }

    $scope.listar();


    $scope.elegirClinica = function(clinica){
        
        if (especialidad == '40'){
            $state.go('menu.solicitarTurno',{clinica:clinica});
        }
        else if(tipo == '2'){
            $state.go('menu.solicitarEspecialista',{clinica:clinica, especialidad:especialidad});
        }
        else {
            $state.go('menu.solicitarEstudio',{clinica:clinica, especialidad:especialidad});
        }

    }

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

})
   
.controller('solicitarTurnoCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {

    $scope.listar = function(){
        clinica = $stateParams.clinica;
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/climedApp/" + clinica) //GET /climed/:id
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.clinica = response;
        })
    }


    $scope.listar();


    $scope.enviar = function(){

        clinica = $stateParams.clinica;
        dni = UserSrv.getDNI();
        carnet = UserSrv.getNsocio();
        sugerido = $scope.sugerido;

        UserSrv.showLoading();
        $http.post( UserSrv.getRuta() + "/solicitud/createClinico", {'IDCLIMED':clinica,'DNISOLICITANTE':dni,'IDAFILIADO':carnet,'MEDICO':sugerido,'ESPECIALIDAD':40})
        
        .success(function() {
            UserSrv.hideLoadingerror("Su solicitud se ha enviado con exito");

            $scope.sugerido = "";
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('menu.t_pendientes');
        })
        .error(function() {
            UserSrv.hideLoadingerror("Hubo un error al procesar la solicitud.");
        })
    }

})

.controller('confirmacionSolicitud', function($scope,$http,$state,$stateParams,UserSrv) {

    $scope.listar = function(){
        id = $stateParams.id;
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/solicitud/solicitudApp/" + id)// get solicitud/solicitudApp/:id
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.solicitud = response[0];
        })
    }

    $scope.listar();

    $scope.refresh = function(){
        id = $stateParams.id;
        $http.get( UserSrv.getRuta() + "/solicitud/solicitudApp/" + id)
        
        .success(function(response) {
            $scope.solicitud = response[0];
        })
    }

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

    $scope.confirmar = function(){
        id = $stateParams.id;
        UserSrv.showLoading();
        $http.post( UserSrv.getRuta() + "/turno/confirmar", {'IDSOLICITUD':id})
        // post solo id solicitud/confirmar
        .success(function() {
            UserSrv.hideLoadingerror("Su solicitud se ha enviado con exito");
            $scope.motivo = "";
            // $ionicHistory.nextViewOptions({
            //     disableBack: true
            // });  
            $state.go('menu.t_pendientes');

        })
    }

    $scope.rechazar = function(){
        id = $stateParams.id;
        UserSrv.showLoading();
        $http.post( UserSrv.getRuta() + "/turno/rechazar", {'IDSOLICITUD':id,'motivo':$scope.motivo})
        //POST /solicitud/rechazar
        .success(function(response) {
            UserSrv.hideLoadingerror("Se solicito el cambio de fecha, a la brevedad recibira un nuevo turno");
            $scope.motivo = "";
            $scope.solicitud = response;
            $state.go('menu.t_pendientes');
        })
    }

})
 
// .controller('particularesCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {


//     $scope.listar = function(){
//         UserSrv.showLoading();
//         $http.get( UserSrv.getRuta() + "/climedApp/all")
        
//         .success(function(response) {
//             UserSrv.hideLoading();
//             $scope.clinicas = response;
//             console.log(response);
//         })
//     }

//     $scope.refresh = function(){

//         $http.get( UserSrv.getRuta() + "/climedApp/all")
        
//         .success(function(response) {
//             $scope.clinicas = response;
//             console.log(response);
//         })
//     }

//     $scope.listar();


//     $scope.elegirClinica = function(clinica){

//         $state.go('menu.infoClinica',{clinica:clinica});

//     }

//     $scope.doRefresh = function() {
    
//         console.log('Refreshing!');

//         $scope.refresh();
//         $scope.$broadcast('scroll.refreshComplete');
//     };

// })


.controller('clinicasCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {


    $scope.listar = function(){
        UserSrv.showLoading();
        $http.get(UserSrv.getRuta() + "/climedApp/all")
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.clinicas = response;
            console.log(response);
        })
    }
    $scope.refresh = function(){
        $http.get(UserSrv.getRuta() + "/climedApp/all")
        .success(function(response) {
            $scope.clinicas = response;
            console.log(response);
        })
    }

    $scope.elegirClinica = function(clinica){
        $state.go('menu.infoClinica',{clinica:clinica});
    }

    $scope.doRefresh = function() {
        console.log('Refreshing!');
        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };
    $scope.listar();

})

.controller('particularesCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {


    $scope.listar = function(){
        UserSrv.showLoading();
        $http.get(UserSrv.getRuta() + "/climedApp/allParticulares")
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.clinicas = response;
            console.log(response);
        })
    }

    $scope.refresh = function(){

        $http.get(UserSrv.getRuta() + "/climedApp/allParticulares")
        
        .success(function(response) {
            $scope.clinicas = response;
            console.log(response);
        })
    }

    $scope.listar();

    $scope.elegirClinica = function(clinica){

        $state.go('menu.infoClinica',{clinica:clinica});

    }

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

})


.controller('farmaciasCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {


    $scope.listar = function(){
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/farmaciaApp/all")
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.farmacias = response;
            console.log(response);
        })
    }

    $scope.refresh = function(){

        $http.get( UserSrv.getRuta() + "/farmaciaApp/all")
        
        .success(function(response) {
            $scope.farmacias = response;
            console.log(response);
        })
    }

    $scope.listar();

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };

})

.controller('infoClinicaCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {

    $scope.listar = function(){
        clinica = $stateParams.clinica;
        UserSrv.showLoading();
        $http.get( UserSrv.getRuta() + "/climedApp/" + clinica)
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.clinica = response;
        })

    }

    $scope.listarEsp = function(){
        
        clinica = $stateParams.clinica;
        UserSrv.showLoading();

        $http.get( UserSrv.getRuta() + "/climedApp/especialidades/" + clinica)
        
        .success(function(response) {
                    console.log(response);
            UserSrv.hideLoading();
            $scope.especialidades = response;
        })

    }

    $scope.listar();

    $scope.listarEsp();

})

.controller('recomendarCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {

    $scope.enviar = function(){

        UserSrv.showLoading();
        $http.post( UserSrv.getRuta() + "/recomendacionApp", {'NOMBRE':$scope.nombre,'APELLIDO':$scope.apellido,'NRO':$scope.nro})
        
        .success(function() {
            UserSrv.hideLoadingerror("Su recomendacion se envio correctamente. Sera contactado a la brevedad.");
            $scope.clearContent();
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('menu.t_pendientes');
        })
    }

    $scope.clearContent = function(){
        $scope.nombre = "";
        $scope.apellido = "";
        $scope.nro = "";
    }

})

.controller('contactoCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory) {

    $scope.enviar = function(){

        UserSrv.showLoading();
        $http.post( UserSrv.getPath() + "/altaRecomendacion.php", {'nombre':$scope.nombre,'apellido':$scope.apellido,'nro':$scope.nro})
        
        .success(function() {
            UserSrv.hideLoadingerror("Su recomendacion se envio correctamente. Sera contactado a la brevedad.");

            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('menu.t_pendientes');


        })
    }

})

.controller('seleccionEspecialidadCtrl', function($scope,$http,$state,$stateParams,UserSrv,$ionicHistory,$location) {

    $scope.listarEspecialidades = function(){
        UserSrv.showLoading();
       $http.get( UserSrv.getRuta() + "/especialidadApp/all")
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.especialidades = response;
        })
    }

    $scope.refresh = function(){
        $http.get( UserSrv.getRuta() + "/especialidadApp/all")
        
        .success(function(response) {
            $scope.especialidades = response;
        })
    }

    $scope.listarEspecialidades();

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.elegirEspecialidad = function(especialidad){
        $state.go('menu.busquedaPorPartido', {especialidad:especialidad,tipo:'2'});
    }

})

.controller('solicitarEspecialistaCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory,$cordovaCamera,$cordovaFileTransfer) {

    clinica = $stateParams.clinica;
    $scope.especialidad = $stateParams.especialidad;
    console.log($scope.especialidad);
    dni = UserSrv.getDNI();
    carnet = UserSrv.getNsocio();
    sugerido = $scope.sugerido;
    console.log($scope.especialidad);

    $scope.srcImage = "";

    $scope.listar = function(){
        UserSrv.showLoading();
        $http.post( UserSrv.getPath() + "/mostrarClinica.php", {'clinica':clinica})// get /climed/:id
        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.clinica = response;
            $scope.confirmacion = " Debe tomar una foto";
            $scope.icon = "icon ion-close-round";
            $scope.color = "button-assertive"
        })
    }

    $scope.listar();

    $scope.tomarFoto = function(){

        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 250,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
            $scope.icon="ion-checkmark-round";
            $scope.color="button-balanced";
            $scope.confirmacion=" Enviar solicitud";
           
        }, function(err) {
            // error
        });

    }

    $scope.enviar = function(){
     
        // Destination URL 
        var url = "http://www.gestionarturnos.com/upload.php";
          
         //File for Upload
        var targetPath = $scope.srcImage;
          
         // File name only
        var d = new Date();
        tiempo = d.getTime();
        var filename = tiempo.toString() + '.jpg';

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg",
            params : {'directory':'certificados', 'fileName':filename}
            
        };
            
       if($scope.srcImage==""){
            var alertPopup = $ionicPopup.alert({
            title: 'Debe tomar una foto de la orden para poder enviar la solicitud.',
            });
        }else{   
            
            UserSrv.showLoading();
            $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {

                console.log("SUCCESS: " + JSON.stringify(result.response));

                $http.post( UserSrv.getRuta() + "/solicitud/createEspecialidad", {'IDCLIMED':clinica,'DNISOLICITANTE':dni,'IDAFILIADO':carnet,'MEDICO':$scope.sugerido,'ESPECIALIDAD':$scope.especialidad,'FOTO':filename})
        
                .success(function() {

                    UserSrv.hideLoadingerror("Tu solicitud fue enviada correctamente");
                    $scope.sugerido = "";

                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $scope.confirmacion = " Debe tomar una foto";
                    $scope.icon = "icon ion-close-round";
                    $scope.color = "button-assertive"

                    $state.go('menu.t_pendientes');
                })

            }, function (err) {

                UserSrv.hideLoadingerror("Encontramos un problema al enviar su turno, verifique su conexion a internet e intente nuevamente");
                console.log("ERROR: " + JSON.stringify(err));

            }, function (progress) {
                // PROGRESS HANDLING GOES HERE
            });
        }

        // })
    }

})

.controller('solicitarEstudioCtrl', function($scope,UserSrv,$stateParams,$state,$http,$ionicPopup,$ionicHistory,$cordovaCamera,$cordovaFileTransfer) {

    // clinica = $stateParams.clinica;
    // $scope.especialidad = $stateParams.especialidad;
    dni = UserSrv.getDNI();
    carnet = UserSrv.getNsocio();
    sugerido = $scope.sugerido;
    $scope.confirmacion = " Debe tomar una foto";
    $scope.icon = "icon ion-close-round";
    $scope.color = "button-assertive"

    $scope.srcImage="";

    // $scope.listar = function(){
    //     UserSrv.showLoading();
    //     $http.post( UserSrv.getPath() + "/mostrarClinica.php", {'clinica':clinica})
        
    //     .success(function(response) {
    //         UserSrv.hideLoading();
    //         $scope.clinica = response;
    //         $scope.confirmacion = " Debe tomar una foto";
    //         $scope.icon = "icon ion-close-round";
    //         $scope.color = "button-assertive"
    //     })
    // }


    $scope.enviar = function(){

       var url = "http://www.gestionarturnos.com/upload.php";
          
         //File for Upload
        var targetPath = $scope.srcImage;
          
         // File name only
        var d = new Date();
        tiempo = d.getTime();
        var filename = tiempo.toString() + '.jpg';

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "image/jpg",
            params : {'directory':'certificados', 'fileName':filename}
        };
            
       if($scope.srcImage==""){
            var alertPopup = $ionicPopup.alert({
            title: 'Debe tomar una foto de la orden para poder enviar la solicitud.',
            });
        }else{
            UserSrv.showLoading();
            $cordovaFileTransfer.upload(url, targetPath, options).then(function (result) {

                console.log("SUCCESS: " + JSON.stringify(result.response));

                $http.post( UserSrv.getRuta() + "/solicitud/createEstudio", {'DNISOLICITANTE':dni,'IDAFILIADO':carnet,'MEDICO':$scope.sugerido,'FOTO':filename})
        
                .success(function() {

                    UserSrv.hideLoadingerror("Tu solicitud fue enviada correctamente");
                    $scope.sugerido = "";

                    $ionicHistory.nextViewOptions({
                        disableBack: true
                    });

                    $scope.confirmacion = " Debe tomar una foto";
                    $scope.icon = "icon ion-close-round";
                    $scope.color = "button-assertive"
                    $state.go('menu.t_pendientes');
                })

            }, function (err) {

                UserSrv.hideLoadingerror("Encontramos un problema al enviar su turno, verifique su conexion a internet e intente nuevamente");
                console.log("ERROR: " + JSON.stringify(err));

            }, function (progress) {
                // PROGRESS HANDLING GOES HERE
            });
        }

    }

    $scope.tomarFoto = function(){

        var options = {
            quality: 80,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 250,
            targetHeight: 250,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };
         
        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.srcImage = "data:image/jpeg;base64," + imageData;
            $scope.icon="ion-checkmark-round";
            $scope.color="button-balanced";
            $scope.confirmacion=" Enviar solicitud";
        }, function(err) {
            // error
        });
    }

})

.controller('seleccionEstudioCtrl', function($scope,$http,$state,$stateParams,UserSrv,$ionicHistory,$location) {

    $scope.listarEstudios = function(){
        UserSrv.showLoading();
        $http.post( UserSrv.getPath() + "/listarEspecialidadoEstudio.php", {'tipo':'estudio'})

        
        .success(function(response) {
            UserSrv.hideLoading();
            $scope.estudios = response;
        })
    }

    $scope.refresh = function(){
        $http.post( UserSrv.getPath() + "/listarEspecialidadoEstudio.php", {'tipo':'estudio'})
        
        .success(function(response) {
            $scope.estudios = response;
        })
    }

    $scope.listarEstudios();

    $scope.doRefresh = function() {
    
        console.log('Refreshing!');

        $scope.refresh();
        $scope.$broadcast('scroll.refreshComplete');
    };


    $scope.elegirEstudio= function(estudio){
        $state.go('menu.busquedaPorPartido', {especialidad:estudio,tipo:'3'});
    }

})
