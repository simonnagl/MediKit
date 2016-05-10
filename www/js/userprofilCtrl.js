angular.module('starter.userprofilCtrl', [])


.controller('UserprofilCtrl', function($scope, $log, $ionicModal, $q, $cordovaDialogs, ProfilStorage){
    
    $scope.allPersoenlicheDaten = [
        {
            nachname: "Schmidt",
            vorname: "Hans",
            strasse: "Hauptstraße 3", 
	        plz: "80331",
	        ort: "München" 
        }   
     ];
     


	
	$scope.showDialogPrompt= function(message, title, object) {
		var deferred = $q.defer();
		var tmpObject = object;
		
		$cordovaDialogs.prompt(message, title, ['btn 1','btn 2'], tmpObject.name)
			.then(function(result) {
		  
			if (result.buttonIndex == 1) {
				$log.debug('Eingabe: ' + result.input1);
				if(result.input1 != "") {
					deferred.resolve(result.input1);
					//$scope.saveUserprofil("testvalue");
				} else {
					//Dialog Input leer
					$log.debug("Dialog Input leer");
					deferred.reject();
				}
			} else {
				 $log.debug('Cancel');
			}
		});
		
		return deferred.promise;
	}
	;
	
// -------------------------------------------------------------------------------------------	

	$scope.changeNachname = function(nachname) {
		$scope.showDialogPrompt("Geben Sie den Nachname ein.", "Nachname", nachname.nachname)
		.then(function(result) {
			nachname.nachname = result;
		});
	}
	;
	
	$scope.addNewNachname = function() {
	}
	;
	
	// Falls noch kein Profil gepflegt wurde
	$scope.isNachnameEmptyBool = true;
	$scope.isNachnameEmpty = function() {
	}
	;
// -------------------------------------------------------------------------------------------	

	$scope.changeVorname = function(vorname) {
		$scope.showDialogPrompt("Geben Sie den Vorname ein.", "Nachname", vorname.vorname)
		.then(function(result) {
			vorname.vorname = result;
			//save();
		});
	}
	;
	
	$scope.addNewVorname = function() {
	}
	;
	
	// Falls noch kein Profil gepflegt wurde
	$scope.isVornameEmptyBool = true;
	$scope.isVornameEmpty = function() {
	}
	;

// -------------------------------------------------------------------------------------------
	
	$scope.changeBlutgruppe = function(blutgruppe) {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die Blutgruppe ein.", "Blutgruppe", blutgruppe)
		.then(function(result) {
			//Positivfall (der showDialogPromt())
			$log.debug("result = " + result);
			blutgruppe.name = result;
			$scope.saveUserprofil();
		},function() {
			//Negativfall
			
			$scope.allBlutgruppe.splice($scope.allBlutgruppe.indexOf(blutgruppe), 1);
			$scope.isBlutgruppeEmptyBool = true;
			
			$log.debug("Wert gelöscht");
			$log.debug("Inhalt allBlutgruppe: " + $scope.allBlutgruppe);
			$log.debug("Länge: " + $scope.allBlutgruppe.length);
			$log.debug("$scope.isBlutgruppeEmptyBool = " + $scope.isBlutgruppeEmptyBool);
			$scope.saveUserprofil();
		});
	}
	;
	
	$scope.addNewBlutgruppe = function() {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die Blutgruppe ein.", "Blutgruppe", "")
		.then(function(result) {
			$scope.allBlutgruppe.push({name:result})
			$scope.isBlutgruppeEmptyBool = false;
			$scope.saveUserprofil();
		});
	}
	;
	
	// Falls noch kein Profil gepflegt wurde
	$scope.isBlutgruppeEmptyBool = true;
	$scope.isBlutgruppeEmpty = function() {
		if($scope.allBlutgruppe.length > 0){   
			//this array is not empty 
			$scope.isBlutgruppeEmptyBool = false;
		}else{
			//this array is empty
		}
	}
	;

// -------------------------------------------------------------------------------------------
	
	$scope.changeAllergie = function(allergie) {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die Allergie ein.", "Allergie", allergie)
		.then(function(result) {
			allergie.name = result;
		});
	}
	;
	
	$scope.addNewAllergie = function() {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die neue Allergie ein.", "Allergie", "")
		.then(function(result) {
			$scope.allAllergie.push({name:result})
		});
	}
	;

// -------------------------------------------------------------------------------------------
	
	$scope.changeErkrankung = function(erkrankung) {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die Erkrankung ein.", "Erkrankung", erkrankung)
		.then(function(result) {
			erkrankung.name = result;
		});
	}
	;
	
	$scope.addNewErkrankung = function() {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die neue Erkrankung ein.", "Erkrankung", "")
		.then(function(result) {
			$scope.allErkrankung.push({name:result})
		});
	}
	;

// -------------------------------------------------------------------------------------------
	
	$scope.changeUnvertraeglichkeit = function(unvertraeglichkeit) {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die Unvertraeglichkeit ein.", "Unvertraeglichkeit", unvertraeglichkeit)
		.then(function(result) {
			unvertraeglichkeit.name = result;
		});
	}
	;
	
	$scope.addNewUnvertraeglichkeit = function() {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die neue Unvertraeglichkeit ein.", "Unvertraeglichkeit", "")
		.then(function(result) {
			$scope.allUnvertraeglichkeit.push({name:result})
		});
	}
	;

// -------------------------------------------------------------------------------------------
	$scope.allBlutgruppe = [];
	$scope.saveUserprofil = function() {
		// TODO: Save Funktion vollständig implementieren
		// Wenn neuer Wert leer ist, heißt das, dass der Wert gelöscht werden soll
		var profil = {
				blutgruppe: $scope.allBlutgruppe,
				allergie: $scope.allAllergie,
				unvertraeglichkeit: $scope.allUnvertraeglichkeit,
				erkrankung: $scope.allErkrankung
		}
		ProfilStorage.saveProfil(profil);
		$log.debug("UserprofilCtrl: Save Userprofil -> END WITH SUCCESS");
	}
	;
	

	$scope.loadUserprofil = function() {
		$log.debug("UserprofilCtrl: Start loadUserprofil");
		
		//Profil aus Storage in UserprofilData Array speichern
		$scope.userprofilData = ProfilStorage.loadProfil("profil");

		$scope.allBlutgruppe = $scope.userprofilData.blutgruppe;

		//$scope.allBlutgruppe = $scope.userprofilData.allBlutgruppe;
		//$scope.allAllergie = $scope.userProfilData.allergie;
		
		// Prüfen zur Anpassung der View
		/*$scope.isNachnameEmpty();
		$scope.isVornameEmpty();
		$scope.isBlutgruppeEmpty(); */
	
		$log.debug("UserprofilCtrl: Ende loadUserprofil");
	}
	;
	
	$scope.ausgabe = function() {
		$log.debug("------------------------------------");
		$log.debug("userprofilData = " + $scope.userprofilData);
		$log.debug("$scope.allBlutgruppe = " + $scope.allBlutgruppe);
		$log.debug("$scope.userprofilData.blutgruppe = " + $scope.userprofilData.blutgruppe);
	};
	
	
});

    
    
