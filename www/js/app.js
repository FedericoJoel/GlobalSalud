// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic','ngCordova', 'app.controllers', 'app.routes', 'app.services', 'app.directives'])

.run(function($ionicPlatform) {

  $ionicPlatform.registerBackButtonAction(function () {
  }, 1000);

  $ionicPlatform.ready(function() {

    var notificationOpenedCallback = function(jsonData) {
      alert("Notification opened:\n" + JSON.stringify(jsonData));
      console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };

    // TODO: Update with your OneSignal AppId before running.
    window.plugins.OneSignal
      .startInit("87df9918-c6d2-4081-8d97-e640811d37cd")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit();
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})