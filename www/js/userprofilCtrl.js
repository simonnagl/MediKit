angular.module('starter.userprofilCtrl', [])


.controller('UserprofilCtrl', function($scope, $log, $ionicModal, $cordovaDialogs, ProfilStorage){
    
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
	 

	//Returns Object with user input as result.input1 and button index as result.buttonIndex
	$scope.showDialogPrompt= function(message, title, defaulttext) {	
		
		// Zwischenspeicherung
		var tmpVariable = defaulttext;
		
		$cordovaDialogs.prompt(message, title, ['btn 1','btn 2'], tmpVariable)
			.then(function(result) {
			var input = result.input1;
			var btnIndex = result.buttonIndex;
		  
			if (result.buttonIndex == 1) {
				// clicked OK
				$log.debug('Eingabe: ' + result.input1);
				
				//Zurückschreiben
				//defaulttext = angular.copy(result.input1);
				defaulttext = result.input1;
				$log.debug('defaulttext = ' + defaulttext);
				
				// Speicherung
				//$scope.saveUserprofil();
			} else {
				 // clicked Cancel
				 $log.debug('Cancel');
				}
		});
	};
	
	
	$scope.userprofilData = []; 
	
	$scope.saveUserprofil = function(Profil) {
		// TODO: Save Funktion vollständig implementieren
		// Wenn neuer Wert leer ist, heißt das, dass der Wert gelöscht werden soll
		ProfilStorage.saveProfil(Profil);
		$log.debug("UserprofilCtrl: Save Userprofil -> END WITH SUCCESS");
	};
	

	$scope.loadUserprofil = function() {
		$log.debug("UserprofilCtrl: Start loadUserprofil");
		// Alles in ein Key/Value-Paar rein oder nach Persönliche Daten u. Gesunheitsdaten unterscheiden?
		$scope.userprofilData = []; 
		$scope.userprofilData = ProfilStorage.loadProfil(xxxx);
		$log.debug("UserprofilCtrl: Ende loadUserprofil");
	}
	

	$scope.addAllergie = function() {
		// Dialog anzeigen
		$cordovaDialogs.prompt();
		
		// Dialog result.input1 verarbeiten
		//allergieToPush = {name: $scope.dialogRückgabePlatzhalter}
		// if($scope.dialogRückgabePlatzhalter == '') -> Eintrag löschen
		allergieToPush = {name: 'Allergie_NEU'} //Dummy
		
		$scope.allAllergie.push(allergieToPush);

		//$scope.saveUserprofil(xxxx);
		$log.debug("UserprofilCtrl: addAllergie -> END WITH SUCCESS");
	}
	
	$scope.addUnvertraeglichkeit = function() {
		$log.debug("UserprofilCtrl: addUnvertraeglichkeit -> END WITH SUCCESS");
	}
	
	$scope.addErkrankung = function() {
		$log.debug("UserprofilCtrl: addErkrankung -> END WITH SUCCESS");
	}
	
	
});

    
    
