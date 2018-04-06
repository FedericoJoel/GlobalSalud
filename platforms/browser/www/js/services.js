angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('UserSrv', function($q, $ionicLoading, $ionicPopup){
    var _dni;
    var _nsocio;
    var _path = "http://www.gestionarturnos.com/Fede"
    // var _path = "http://localhost:8888";
    this.setDNI = function(dni){
        _dni=dni;
    }

    this.getDNI = function(){
        return _dni;
    }

    this.setNsocio = function(nsocio){
        _nsocio=nsocio;
    }

    this.getNsocio = function(){
        return _nsocio;
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

