// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 
			    'ngCordova',
                            'onezone-datepicker',
                            'uiGmapgoogle-maps',
                            'starter.einnahmeCtrl',
                            'starter.controllers',
                            'starter.einnahmeStorage',
                            'starter.historieCtrl',
                            'starter.kontakteCtrl',
                            'starter.mediEinnahmeCtrl',
                            'starter.mediStorage',
                            'starter.mediVerwaltungCtrl',
                            'starter.profilStorage',
                            'starter.historieStorage',
                            'starter.startseiteCtrl',
                            'starter.userprofilCtrl',
                            'starter.navigationCtrl',
                            'starter.webStorageMain'])

.run(function($location, $ionicPlatform, $cordovaLocalNotification, $timeout, $rootScope, $log) {
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
  
    cordova.plugins.notification.local.on("click", function (notification) {
        $location.path('/app/einnahme/' + notification.id + ',' + notification.data );
    });
    
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
      url: '/historie/{isNichtEingenommen}',
      views: {
        'menuContent': {
          templateUrl: 'templates/historie.html',
          controller: 'HistorieCtrl',
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
    
    .state('app.navigation', {
      url: '/navigation',
      views: {
        'menuContent': {
          templateUrl: 'templates/navigation.html',
          controller: 'NavigationCtrl',
        }
      }
    })
    
    .state('app.einnahme', {
      url: '/einnahme/{notificationId},{terminIndex}',
      views: {
        'menuContent': {
          templateUrl: 'templates/einnahme.html',
          controller: 'EinnahmeCtrl',
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
