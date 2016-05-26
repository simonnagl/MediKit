angular.module('starter.einnahmeCtrl', ['ionic'])

.controller('EinnahmeCtrl', function(	$ionicPlatform,
										$cordovaLocalNotification,
										$scope, 
										$stateParams, 
										$timeout, 
										$log, 
										EinnahmeStorage,
										HistorieStorage) {
	
	$scope.einnahmeId = $stateParams.notificationId;
	$scope.terminIndex = $stateParams.terminIndex;
	
	var einnahme = EinnahmeStorage.loadEinnahme($scope.einnahmeId);
	var einnahmeTermin = einnahme.wanneinnahmen[$scope.terminIndex];
	var termin = {	id: $scope.einnahmeId, 
					mediname: einnahme.mediname, 
					medidosis:"200mg", 
					einnahmemenge: einnahme.einnahmemenge.menge + "" + einnahme.einnahmemenge.einheit,
	 				einnahmezeitsoll: einnahmeTermin.zeitpunkt, 
					einnahmezeitist: null};
	
	$scope.einnahmeBestaetigen = function() {
		$log.debug("Einnahme bestätigt");
		setNextTerminNotification();
		termin.einnahmezeitist = new Date().getTime();
		HistorieStorage.addTermin(termin);
	}
	
	$scope.einnahmeAblehnen = function() {
		$log.debug("Einnahme abgelehnt");
		setNextTerminNotification()
		HistorieStorage.addTermin(termin);
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
					json: $scope.terminIndex + 1
				}).then(function (result) {
					$log.debug('Notification triggered');
				});
			});
		} else {
			$log.debug("Einnahme abgeschlossen");
		}		
	};
})