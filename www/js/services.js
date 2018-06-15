angular.module('app.services', [])

.factory('APIInterceptor', function ($q, $rootScope) {
    return {
      // optional method
      'request': function (config) {
        // do something on success
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        return config;
      },

      // optional method
      'requestError': function (rejection) {
        // do something on error
        return $q.reject(rejection);
      },
      // optional method
      'response': function (response) {
        // do something on success
        return response;
      },
      // optional method
      'responseError': function (rejection) {
        // do something on error
          return  $q.reject(rejection);
      }
    }
  })

.factory('BlankFactory', [function(){

}])

.service('UserSrv', function($q, $ionicLoading, $ionicPopup){
    var _dni;
    var _nsocio;
    var _path = "http://www.gestionarturnos.com/Fede"
    var _ruta = "https://guarded-oasis-37936.herokuapp.com"
    var _confirmados
    var _rechazados
    var _pendientes
    // var _path = "http://localhost:8888";

    this.getRuta = function(ruta){
        return _ruta;
    }

    this.setRuta = function(ruta){
        _ruta=ruta;
    }

    this.setPendientes = function(num){
        _pendientes=num;
    }

    this.getPendientes= function(){
        return _pendientes;
    }

    this.setRechazados = function(num){
        _rechazados=num;
    }

    this.getRechazados= function(){
        return _rechazados;
    }

    this.setConfirmados = function(num){
        _confirmados=num;
    }

    this.getConfirmados= function(){
        return _confirmados;
    }

    this.getDNI = function(){
        return localStorage.getItem('dni');
    }
    this.getNsocio = function(){
        return localStorage.getItem('nafiliado');
    }

    this.getPath = function(){
        return _path;
    }

    this.showLoading = function(){
        $ionicLoading.show({
            template: '<div class="icon ion-loading-a"></div> Loading... ',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 500,
            showDelay: 100
        });
    }

    this.hideLoadingerror = function(msj){
        $ionicLoading.hide();
        var alertPopup = $ionicPopup.alert({
            title: msj,
        });
    }

    this.hideLoading = function(){
        $ionicLoading.hide();
    }
	// this.login = function(dni,nsocio){
	// 	var deferred = $q.defer();
	// 	var promise = deferred.promise;

	// 	if (dni == 'user' && nsocio == 'secret') {
 //        	deferred.resolve('Bienvenido ' + name + '!');
 //        } else {
 //        	deferred.reject('Wrong credentials.');
 //        }

 //        promise.success = function(fn) {
 //                promise.then(fn);
 //                return promise;
 //            }
 //        promise.error = function(fn) {
 //                promise.then(null, fn);
 //                return promise;
 //            }
 //            return promise;
	// }

});

