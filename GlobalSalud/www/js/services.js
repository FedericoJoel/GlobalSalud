angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('UserSrv', function($q){
    var _dni;
    var _nsocio;

    this.setDNI = function(dni){
        _dni=dni;
    }

    this.getDNI = function(){
        console.log(_dni);
        return _dni;
    }

    this.setNsocio = function(nsocio){
        _nsocio=nsocio;
    }

    this.getNsocio = function(){
        return _nsocio;
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

