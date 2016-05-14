angular.module('starter.userprofilCtrl', [])


.controller('UserprofilCtrl', function($scope, $log, $ionicModal, $q, $cordovaDialogs, ProfilStorage){
    
	$scope.$on('$ionicView.enter', function() {
     // Code you want executed every time view is opened
	 $scope.loadUserprofil()
     $log.debug("View opened");
	})
  
    $scope.allPersoenlicheDaten = [
        {
            nachname: "Schmidt",
            vorname: "Hans",
            strasse: "Hauptstraße 3", 
	        plz: "80331",
	        ort: "München" 
        }   
     ];
 
     
	$scope.allBlutgruppe = [];
	$scope.allAllergie = [];
	$scope.allUnvertraeglichkeit = [];
	$scope.allErkrankung = [];
	
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
		},function() {
			//Negativfall
			
		});
	}
	;
	
	$scope.addNewNachname = function() {
	}
	;
	
	// Falls noch kein Profil gepflegt wurde
	$scope.isNachnameEmptyBool = false; //wieder auf true setzen, wenn geklärt wie view ausschauen soll bei leeren persönlichen Daten
	$scope.isNachnameEmpty = function() {
		if($scope.allPersoenlicheDaten.vorname.length > 0) {
			//this array is not empty
			$scope.isNachnameEmptyBool = false;
		} else {
			//this array is empty
		}
	}
	;
// -------------------------------------------------------------------------------------------	

	$scope.changeVorname = function(vorname) {
		$scope.showDialogPrompt("Geben Sie den Vorname ein.", "Nachname", vorname.vorname)
		.then(function(result) {
			vorname.vorname = result;
			$scope.saveUserprofil();
		},function() {
			//Negativfall - gespeicherte leere Eingabe entspricht löschen
			
		});
	}
	;
	
	$scope.addNewVorname = function() {
	}
	;
	
	// Falls noch kein Profil gepflegt wurde
	$scope.isVornameEmptyBool = false; //wieder auf true setzen, wenn geklärt wie view ausschauen soll bei leeren persönlichen Daten
	$scope.isVornameEmpty = function() {
		if($scope.allPersoenlicheDaten.vorname.length > 0) {
			//this array is not empty
			$scope.isVornameEmptyBool = false;
		} else {
			//this array is empty
		}
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
			//Negativfall - gespeicherte leere Eingabe entspricht löschen
			$scope.allBlutgruppe.splice($scope.allBlutgruppe.indexOf(blutgruppe), 1);
			$scope.isBlutgruppeEmptyBool = true;
			$log.debug("Wert gelöscht");
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
			$scope.saveUserprofil();
		},function() {
			//Negativfall - gespeicherte leere Eingabe entspricht löschen
			$scope.allAllergie.splice($scope.allAllergie.indexOf(allergie), 1);
			$log.debug("Wert gelöscht");
			$scope.saveUserprofil();
		});
	}
	;
	
	$scope.addNewAllergie = function() {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die neue Allergie ein.", "Allergie", "")
		.then(function(result) {
			$scope.allAllergie.push({name:result})
			$scope.saveUserprofil();
		});
	}
	;

// -------------------------------------------------------------------------------------------
	
	$scope.changeErkrankung = function(erkrankung) {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die Erkrankung ein.", "Erkrankung", erkrankung)
		.then(function(result) {
			erkrankung.name = result;
			$scope.saveUserprofil();
		},function() {
			//Negativfall - gespeicherte leere Eingabe entspricht löschen
			$scope.allErkrankung.splice($scope.allErkrankung.indexOf(erkrankung), 1);
			$log.debug("Wert gelöscht");
			$scope.saveUserprofil();
		});
	}
	;
	
	$scope.addNewErkrankung = function() {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die neue Erkrankung ein.", "Erkrankung", "")
		.then(function(result) {
			$scope.allErkrankung.push({name:result})
			$scope.saveUserprofil();
		});
	}
	;

// -------------------------------------------------------------------------------------------
	
	$scope.changeUnvertraeglichkeit = function(unvertraeglichkeit) {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die Unvertraeglichkeit ein.", "Unvertraeglichkeit", unvertraeglichkeit)
		.then(function(result) {
			unvertraeglichkeit.name = result;
			$scope.saveUserprofil();
		},function() {
			//Negativfall - gespeicherte leere Eingabe entspricht löschen
			$scope.allUnvertraeglichkeit.splice($scope.allUnvertraeglichkeit.indexOf(unvertraeglichkeit), 1);
			$log.debug("Wert gelöscht");
			$scope.saveUserprofil();
		});
	}
	;
	
	$scope.addNewUnvertraeglichkeit = function() {
		$scope.showDialogPrompt("Geben Sie die Bezeichnung für die neue Unvertraeglichkeit ein.", "Unvertraeglichkeit", "")
		.then(function(result) {
			$scope.allUnvertraeglichkeit.push({name:result})
			$scope.saveUserprofil();
		});
	}
	;

// -------------------------------------------------------------------------------------------

	$scope.saveUserprofil = function() {
		var profil = {
				//nachname:...
				//vorname:...
				//vorname: $scope.allPersoenlicheDaten.vorname,
				blutgruppe: $scope.allBlutgruppe,
				allergie: $scope.allAllergie,
				unvertraeglichkeit: $scope.allUnvertraeglichkeit,
				erkrankung: $scope.allErkrankung
		}
		ProfilStorage.saveProfil("profil", profil);
		$log.debug("UserprofilCtrl: Save Userprofil -> END WITH SUCCESS");
	}
	;
	

	$scope.loadUserprofil = function() {
		$log.debug("UserprofilCtrl: Start loadUserprofil");
		
		//Profil aus Storage in UserprofilData Array speichern
		$scope.userprofilData = [];
		$scope.userprofilData = ProfilStorage.loadProfil("profil");
		
		if($scope.userprofilData == null) {
			//do initialize
			$log.debug("do initialize");
		} else {
			//nachname
			//vorname
			//$scope.allPersoenlicheDaten.vorname = $scope.userprofilData.vorname;
			$scope.allBlutgruppe = $scope.userprofilData.blutgruppe;
			$scope.allAllergie = $scope.userprofilData.allergie;
			$scope.allUnvertraeglichkeit = $scope.userprofilData.unvertraeglichkeit;
			$scope.allErkrankung = $scope.userprofilData.erkrankung;
			
			// Prüfen zur Anpassung der View
			//$scope.isNachnameEmpty();
			//$scope.isVornameEmpty();
			//$scope.isBlutgruppeEmpty();
		
			$log.debug("UserprofilCtrl: Ende loadUserprofil");
		}
	}
	;
	
	$scope.ausgabe = function() {
		$log.debug("------------------------------------");
		$log.debug("userprofilData = " + $scope.userprofilData);
		$log.debug("$scope.userprofilData.blutgruppe = " + $scope.userprofilData.blutgruppe);
		$log.debug("$scope.allBlutgruppe = " + $scope.allBlutgruppe);
	};
	
	
});

    
    
