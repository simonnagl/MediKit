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
										HistorieStorage,
                                        ProfilStorage) {
                                            
    $scope.$on('$ionicView.beforeEnter', function (e,config) {
        config.enableBack = false;
    });                                        
	
    // Die NotificationID und der TerminIndex werden über StateParams ausgelesen
	$scope.einnahmeId = $stateParams.notificationId;
	$scope.terminIndex = $stateParams.terminIndex;
	$log.debug("EinnahmeCtrl: INIT StateParams -> EinnahmeID: " + $scope.einnahmeId + " TerminIndex: " + $scope.terminIndex);
    
    // Anhand der EinnahmeID == NotificationID wird die Einahme aus dem Storage geladen
	var einnahme = EinnahmeStorage.loadEinnahme($scope.einnahmeId);
	var einnahmeTermin = einnahme.wanneinnahmen[$scope.terminIndex];
    $log.debug("EinnahmeCtrl: INIT Einahme" + JSON.stringify(einnahme));
    
    // Ein neues Terminobjekt wird erzeugt. Dieses wird nach der Bearbeitung in den HistorieStorage gespeichert
	$scope.termin = {	id: $scope.einnahmeId, 
                        mediname: einnahme.mediname,
                        einnahmemenge: einnahme.einnahmemenge.menge + " " + einnahme.einnahmemenge.einheit,
                        einnahmezeitsoll: einnahmeTermin.zeitpunkt, 
                        einnahmezeitist: null
                    };
	$log.debug("EinnahmeCtrl: INIT Termin" + JSON.stringify($scope.termin));
    
    /**
	 * @ngdoc method
	 * @name $scope.einnahmeBestaetigen
	 * @methodOf Medikit.controller: EinnahmeCtrl
	 * @description Wird beim Bestaetigen einer Einnahme ausgeführt
	 */
	$scope.einnahmeBestaetigen = function() {
		$log.debug("EinnahmeCtrl: Einahme wurde bestätigt");
		setNextTerminNotification();
		$scope.termin.einnahmezeitist = new Date().getTime();
		HistorieStorage.addTermin($scope.termin);
        trackMedimenge();
        $ionicHistory.goBack();
	}
	
    /**
	 * @ngdoc method
	 * @name $scope.einnahmeAblehnen
	 * @methodOf Medikit.controller: EinnahmeCtrl
	 * @description Wird beim Ablehnen einer Einnahme ausgeführt
	 */
	$scope.einnahmeAblehnen = function() {
		$log.debug("EinnahmeCtrl: Einahme wurde abgelehnt");
		setNextTerminNotification()
		HistorieStorage.addTermin($scope.termin);
        sendSmsToAllNotfallkontakt('Medikament wurde nicht eingenommen');
        $ionicHistory.goBack();
	}
    
    /**
	 * @ngdoc method
	 * @name $scope.einnahmeVerschieben
	 * @methodOf Medikit.controller: EinnahmeCtrl
	 * @description Wird beim Verschieben einer Einnahme ausgeführt
	 */
    $scope.einnahmeVerschieben = function() {
        $log.debug("EinnahmeCtrl: Einahme wurde verschoben");
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
	
    /**
	 * @ngdoc method
	 * @name $scope.setNextTerminNotification
	 * @methodOf Medikit.controller: EinnahmeCtrl
	 * @description Funktion für das setzten der Nächsten Terminnotification
	 */
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
			sendSmsToAllNotfallkontakt("MEDIKIT - Einnahme des Medikamentes: " + einnahme.mediname + " abgeschlossen");
		}		
	};
    
    
    /**
	 * @ngdoc method
	 * @name $scope.trackMedimenge
	 * @methodOf Medikit.controller: EinnahmeCtrl
	 * @description Überprüft den aktuellen Packungsinhalt nach einer Einahme.
     *              Wenn der stand des Packungsinhalt gering ist wird eine Notification
     *              ausgelöst und eine SMS an alle Kontaktpersonen versendet. 
	 */
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
                
                sendSmsToAllNotfallkontakt('MEDIKIT - Medikament: ' + einnahme.mediname + ', muss gekauft werden');
            }
        }
        
        einnahme.packungsgroesse = neuPackungsinhalt;
        EinnahmeStorage.updateEinnahme(einnahme);
    }
    
    
    /**
	 * @ngdoc method
	 * @name $scope.sendSmsToAllNotfallkontakt
	 * @methodOf Medikit.controller: EinnahmeCtrl
	 * @description Überprüft die Kontakte auf Notfallkontakte und sendet falls welche 
     *              vorhanden ist an diese eine SMS mit dem übergebenen Text.
	 */
    function sendSmsToAllNotfallkontakt (msg) {
        // Alle Kontakte laden
        var allKontakt = ProfilStorage.loadProfil("kontakt");
        $log.debug(allKontakt);
        
        // Wenn noch keine Kontakte angelegt wurden passiert nichts weiter...
        if (allKontakt != null) {
            var options = {replaceLineBreaks: false, android: {intent: ''}};
            
            // ... sonst wird bei jedem Kontakt überprüft ob es sich um einen Notfallkontakt handelt
            allKontakt.forEach(function(kontakt) {
                if (kontakt.notfallkontakt == true) {
                    $log.debug("EinnahmeCtrl: SendSmsToAllNotfallkontakt -> SMS an " + kontakt.nachname + " wird gesendet.");
                    // Wenn es ein Notallkontakt ist wird eine SMS an diesen Kontakt versendet
                    document.addEventListener("deviceready", function () { 
                        $cordovaSms.send(kontakt.telefon, msg, options)
                        .then(function() {
                            $log.debug("EinnahmeCtrl: SendSmsToAllNotfallkontakt -> SMS wurde versendet.");
                        }, function(error) {
                            $log.debug("EinnahmeCtrl: SendSmsToAllNotfallkontakt -> SMS konnte nicht gesendet werden.");
                        });
                    });  
                }         
            });   
        } else {
            $log.debug("EinnahmeCtrl: SendSmsToAllNotfallkontakt -> Keine Kontakte vorhanden");
        }   
    }    
})