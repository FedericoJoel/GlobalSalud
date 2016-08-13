angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('menu', {
    url: '/menu',
    templateUrl: 'templates/menu.html',
    abstract:true
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('menu.t_pendientes', {
    url: '/t_pendientes',
    views: {
      'side-menu21': {
        templateUrl: 'templates/t_pendientes.html',
        controller: 't_pendientesCtrl'
      }
    }
  })

  .state('menu.t_confirmados', {
    url: '/t_confirmados',
    views: {
      'side-menu21': {
        templateUrl: 'templates/t_confirmados.html',
        controller: 't_confirmadosCtrl'
      }
    }
  })

  .state('menu.t_rechazados', {
    url: '/t_rechazados',
    views: {
      'side-menu21': {
        templateUrl: 'templates/t_rechazados.html',
        controller: 't_rechazadosCtrl'
      }
    }
  })

  .state('menu.busquedaPorPartido', {
    url: '/buscarpartido',
    views: {
      'side-menu21': {
        templateUrl: 'templates/busquedaPorPartido.html',
        controller: 'busquedaPorPartidoCtrl'
      }
    }
  })

  .state('menu.clinicasYParticulares', {
    url: '/page9',
    views: {
      'side-menu21': {
        templateUrl: 'templates/clinicasYParticulares.html',
        controller: 'clinicasYParticularesCtrl'
      }
    }
  })

  .state('menu.solicitarTurno', {
    url: '/solicitarTurno',
    views: {
      'side-menu21': {
        templateUrl: 'templates/solicitarTurno.html',
        controller: 'solicitarTurnoCtrl'
      }
    }
  })

  .state('menu.confirmacionSolicitud', {
    url: '/confirmacionSolicitud/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmacionSolicitud.html',
        controller: 'confirmacionSolicitud'
      }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});