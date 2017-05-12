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
    url: '/buscarpartido/:especialidad/:tipo',
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
    url: '/solicitarTurno/:clinica',
    views: {
      'side-menu21': {
        templateUrl: 'templates/solicitarTurno.html',
        controller: 'solicitarTurnoCtrl'
      }
    }
  })

  .state('menu.confirmacionSolicitud', {
    url: '/:id',
    views: {
      'side-menu21': {
        templateUrl: 'templates/confirmacionSolicitud.html',
        controller: 'confirmacionSolicitud'
      }
    }
  })

  .state('menu.listaDeClinicas', {
    url: '/listaDeClinicas/:localidad/:especialidad/:tipo',
    views: {
      'side-menu21': {
        templateUrl: 'templates/listaDeClinicas.html',
        controller: 'listaDeClinicasCtrl'
      }
    }
  })

  .state('menu.clinicas', {
    url: '/clinicas',
    views: {
      'side-menu21': {
        templateUrl: 'templates/clinicas.html',
        controller: 'clinicasCtrl'
      }
    }
  })

  .state('menu.particulares', {
    url: '/particulares',
    views: {
      'side-menu21': {
        templateUrl: 'templates/particulares.html',
        controller: 'clinicasCtrl'
      }
    }
  })

  .state('menu.farmacias', {
    url: '/farmacias',
    views: {
      'side-menu21': {
        templateUrl: 'templates/farmacias.html',
        controller: 'farmaciasCtrl'
      }
    }
  })
  
  .state('menu.infoClinica', {
    url: '/infoClinica/:clinica',
    views: {
      'side-menu21': {
        templateUrl: 'templates/infoClinica.html',
        controller: 'infoClinicaCtrl'
      }
    }
  })

  .state('menu.recomendar', {
    url: '/recomendar',
    views: {
      'side-menu21': {
        templateUrl: 'templates/recomendar.html',
        controller: 'recomendarCtrl'
      }
    }
  })

  .state('menu.contacto', {
    url: '/contacto',
    views: {
      'side-menu21': {
        templateUrl: 'templates/contacto.html',
        controller: 'contactoCtrl'
      }
    }
  })

  .state('menu.seleccionEspecialidad', {
    url: '/seleccionEspecialidad',
    views: {
      'side-menu21': {
        templateUrl: 'templates/seleccionEspecialidad.html',
        controller: 'seleccionEspecialidadCtrl'
      }
    }
  })

  .state('menu.solicitarEspecialista', {
    url: '/solicitarEspecialista/:clinica/:especialidad',
    views: {
      'side-menu21': {
        templateUrl: 'templates/solicitarEspecialista.html',
        controller: 'solicitarEspecialistaCtrl'
      }
    }
  })

  .state('menu.solicitarEstudio', {
    url: '/solicitarEstudio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/solicitarEstudio.html',
        controller: 'solicitarEstudioCtrl'
      }
    }
  })

  .state('menu.seleccionEstudio', {
    url: '/seleccionEstudio',
    views: {
      'side-menu21': {
        templateUrl: 'templates/seleccionEstudio.html',
        controller: 'seleccionEstudioCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/login')

  

});