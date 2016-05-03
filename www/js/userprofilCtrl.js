angular.module('starter.userprofilCtrl', [])


.controller('UserprofilCtrl', function($scope, $log, $ionicModal, $cordovaDialogs){
    
	
	$scope.showDialogConfirm = function(message, title, button1, button2) {		
		$cordovaDialogs.confirm(message, title, [button1,button2])
			.then(function(buttonIndex) {
			  // no button = 0, 'OK' = 1, 'Cancel' = 2
			  var btnIndex = buttonIndex;
			  $log.debug(btnIndex);
			});
	};
	
	//Returns Object with user input as result.input1 and button index as result.buttonIndex
	$scope.showDialogPrompt= function(message, title, button1, button2, defaulttext) {		
		$cordovaDialogs.prompt(message, title, [button1, button2], defaulttext)
			.then(function(result) {
			var input = result.input1;
			var btnIndex = result.buttonIndex;
			  
			if (result.buttonIndex == 1) {
				// clicked OK
				$log.debug('Neue Eingabe: ' + result.input1);
				// Zurückspeichern der neuen Eingabe
				$scope.saveUserprofil();
			} else {
				 // clicked Cancel
				 $log.debug('Cancel');
				}
			});
	};
	
	
    $scope.allPersoenlicheDaten = [
        {
            nachname: "Schmidt",
            vorname: "Hans",
            strasse: "Hauptstraße 3", 
	        plz: "80331",
	        ort: "München" 
        }   
     ];
     
	 
	$scope.allBlutgruppe = [
		{name: "AB"}
	];
	
	
     $scope.allAllergie = [
        {name: "Allergie1"},
        {name: "Allergie2"},
        {name: "Allergie3"}
     ];
        
     
     $scope.allUnvertraeglichkeit = [
         {name: "Unvertraeglichkeit1"},
         {name: "Unvertraeglichkeit2"},
		 {name: "Unvertraeglichkeit3"},
		 {name: "Unvertraeglichkeit4"}
     ];
     
     
     $scope.allErkrankung = [
         {name: "Erkrankung1"},
         {name: "Erkrankung2"},
		 {name: "Erkrankung3"},
		 {name: "Erkrankung4"},
		 {name: "Erkrankung5"}
     ];
	 
	
	$scope.saveUserprofil = function() {
		// TODO: Save Funktion implementieren
		// Wenn neuer Wert leer ist, heißt das, dass der Wert gelöscht werden soll
		$log.debug("UserprofilCtrl: Save Userprofil -> END WITH SUCCESS");
	};
	

	$scope.addAllergie = function() {
		$log.debug("UserprofilCtrl: addAllergie -> END WITH SUCCESS");
	}
	
	$scope.addUnvertraeglichkeit = function() {
		$log.debug("UserprofilCtrl: addUnvertraeglichkeit -> END WITH SUCCESS");
	}
	
	$scope.addErkrankung = function() {
		$log.debug("UserprofilCtrl: addErkrankung -> END WITH SUCCESS");
	}
});

    
    
