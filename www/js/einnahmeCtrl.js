angular.module('starter.einnahmeCtrl', ['ionic'])

.controller('EinnahmeCtrl', function(	$ionicPlatform,
										$cordovaLocalNotification,
										$scope, 
                                        $cordovaSms,
										$stateParams, 
										$timeout, 
										$log, 
                                        $ionicHistory,
										EinnahmeStorage,
										HistorieStorage) {
	
	$scope.einnahmeId = $stateParams.notificationId;
	$scope.terminIndex = $stateParams.terminIndex;
    $log.debug($scope.terminIndex);
	
	var einnahme = EinnahmeStorage.loadEinnahme($scope.einnahmeId);
	var einnahmeTermin = einnahme.wanneinnahmen[$scope.terminIndex];
    $log.debug(einnahme);
	$scope.termin = {	id: $scope.einnahmeId, 
					mediname: einnahme.mediname, 
					medidosis:"200mg", 
					einnahmemenge: einnahme.einnahmemenge.menge + "" + einnahme.einnahmemenge.einheit,
	 				einnahmezeitsoll: einnahmeTermin.zeitpunkt, 
					einnahmezeitist: null};
	
	$scope.einnahmeBestaetigen = function() {
		$log.debug("Einnahme bestätigt");
		setNextTerminNotification();
		$scope.termin.einnahmezeitist = new Date().getTime();
		HistorieStorage.addTermin($scope.termin);
        trackMedimenge();
        $ionicHistory.goBack();
	}
	
	$scope.einnahmeAblehnen = function() {
		$log.debug("Einnahme abgelehnt");
		setNextTerminNotification()
		HistorieStorage.addTermin($scope.termin);
        sendSmsToAllNotfallkontakt('Medikament wurde nicht eingenommen');
        $ionicHistory.goBack();
	}
    
    $scope.einnahmeVerschieben = function() {
        $ionicPlatform.ready(function () {
            var now = new Date().getTime();
            snoozemin = parseInt(einnahme.snoozemin);
            var snoozeTime = new Date(now + snoozemin * 60 * 1000);
            
            $cordovaLocalNotification.schedule({
                id: einnahme.id,
                title: 'Medikit',
                text: 'Wiederholung! Medikament: ' + einnahme.mediname + ' - '
                        + einnahme.einnahmemenge.menge + ''
                        + einnahme.einnahmemenge.einheit + ' einnehmen',
                at: snoozeTime,
                json: parseInt($scope.terminIndex) + 1
            }).then(function (result) {
                $log.debug('Notification triggered');
            });
        });
        $ionicHistory.goBack();
    }
	
	function setNextTerminNotification() {
		if(einnahme.wanneinnahmen[parseInt($scope.terminIndex) + 1] != undefined) {	
			$ionicPlatform.ready(function () {
				var now = new Date().getTime();
				var _10SecondsFromNow = new Date(now + 10 * 1000);
				
				$cordovaLocalNotification.schedule({
					id: einnahme.id,
					title: 'Medikit',
					text: 'Medikament: ' + einnahme.mediname + ' - '
							+ einnahme.einnahmemenge.menge + ''
							+ einnahme.einnahmemenge.einheit + ' einnehmen',
					at: _10SecondsFromNow,
					json: parseInt($scope.terminIndex) + 1
				}).then(function (result) {
					$log.debug('Notification triggered');
				});
			});
		} else {
			sendSmsToAllNotfallkontakt("Einnahme abgeschlossen");
		}		
	};
    
    function trackMedimenge () {
        $log.debug("Alter Packungsinhalt" + einnahme.packungsgroesse);
        $log.debug(einnahme.packungsgroesse);
        $log.debug(einnahme.einnahmemenge);
        var neuPackungsinhalt = einnahme.packungsgroesse - einnahme.einnahmemenge.menge;
        $log.debug("Neuer Packungsinhalt" + neuPackungsinhalt);
        
        if(einnahme.wanneinnahmen[parseInt($scope.terminIndex) + 1] != undefined) {
            if(neuPackungsinhalt <= 2 * einnahme.einnahmemenge.menge) {
                $ionicPlatform.ready(function () {
                    var now = new Date().getTime();
                    var _10SecondsFromNow = new Date(now + 10 * 1000);
                    
                    $cordovaLocalNotification.schedule({
                        id: 9999,
                        title: 'Medikit',
                        text: 'Medikament: ' + einnahme.mediname + ', muss gekauft werden',
                        at: _10SecondsFromNow
                    }).then(function (result) {
                        $log.debug('Notification triggered');
                    });
                });
                
                sendSmsToAllNotfallkontakt ('Medikament: ' + einnahme.mediname + ', muss gekauft werden');
            }
        }
        
        einnahme.packungsgroesse = neuPackungsinhalt;
        EinnahmeStorage.updateEinnahme(einnahme);
    }
    
    function sendSmsToAllNotfallkontakt (msg) {
        document.addEventListener("deviceready", function () {
            
            var options = {
                replaceLineBreaks: false, // true to replace \n by a new line, false by default
                android: {
                intent: '' // send SMS with the native android SMS messaging
                    //intent: '' // send SMS without open any other app
                    //intent: 'INTENT' // send SMS inside a default SMS app
                }
            };
            
            $cordovaSms.send('01707303365', msg, options)
            .then(function() {
                $log.debug("SMS wurde versendet");
            }, function(error) {
                $log.debug("SMS konnte nicht gesendet werden!")
            });
        });
    }    
})