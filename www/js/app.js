// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 
                            'starter.startseiteCtrl',
                            'starter.controllers',
                            'starter.einnahmeStorage',
                            'starter.mediStorage',
                            'starter.profilStorage',
                            'starter.mediEinnahmeCtrl',
                            'starter.kontakteCtrl',
                            'starter.userprofilCtrl',
                            'starter.webStorageMain'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.mediVerwaltung', {
    url: '/mediVerwaltung',
    views: {
      'menuContent': {
        templateUrl: 'templates/mediVerwaltung.html',
        controller: 'mediVerwaltungCtrl',
      }
    }
  })

  .state('app.userprofil', {
    url: '/userprofil',
    views: {
      'menuContent': {
        templateUrl: 'templates/userprofil.html',
        controller: 'UserprofilCtrl',
      }
    }
  })

  .state('app.mediEinnahme', {
      url: '/mediEinnahme',
      views: {
        'menuContent': {
          templateUrl: 'templates/mediEinnahme.html',
          controller: 'MediEinnahmeCtrl',
        }
      }
    })
    .state('app.historie', {
      url: '/historie',
      views: {
        'menuContent': {
          templateUrl: 'templates/historie.html',
          controller: 'historieCtrl',
        }
      }
    })
	
	.state('app.kontakte', {
      url: '/kontakte',
      views: {
        'menuContent': {
          templateUrl: 'templates/kontakte.html',
          controller: 'KontakteCtrl',
        }
      }
    })

  .state('app.startseite', {
    url: '/startseite',
    views: {
      'menuContent': {
        templateUrl: 'templates/startseite.html',
        controller: 'StartseiteCtrl',
      }
    }
  });
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/startseite');
});
