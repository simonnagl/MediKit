angular.module('starter.kontakteCtrl', [])

  .controller('KontakteCtrl', function($scope, $log, $ionicModal, $cordovaDialogs, ProfilStorage){
    
	$scope.$on('$ionicView.enter', function() {
     // Code executed every time view is opened
	 $scope.loadKontakt()
     $log.debug("View opened");
	})
	
    // allKontakt: Alle Kontaktobjekte
	$scope.allKontakt = [];
    
    // selectedKontakt: Der Kontakt der bearbeitet wird
    $scope.selectedKontakt = null;
    
    // isNewKontakt : Wird auf True gesetzt, wenn ein neuer Kontakt angelegt wird
    $scope.isNewKontakt = false;
	
	 // Create the kontakte_neu modal that we will use later
	$ionicModal.fromTemplateUrl('templates/kontakte_neu.html', {scope: $scope}).then(function(kontakt) {
        $scope.kontakt = kontakt;
	})
	;
  
    $scope.createNewKontakt = function() {
        $log.debug("KontakteCtrl: Create new Kontakt -> START");
        $scope.isNewKontakt = true;
        $scope.selectedKontakt = createNewKontaktObject();
        $scope.openKontaktModal();
    }
	;
    
    $scope.editKontakt = function(kontakt) {
        $log.debug("KontakteCtrl: Edit Kontakt -> START");
        $scope.selectedKontakt = kontakt;
		$scope.isNewKontakt = false;
        $scope.openKontaktModal();
		$log.debug("isNewKontakt = " + $scope.isNewKontakt);
    }
	;
    
    function createNewKontaktObject() {
        $log.debug("KontakteCtrl: Create new empty Kontakt Object");
        var emptyKontakt = {
            kontaktArt: "",
            arztArt: "",
			kontaktBeziehung: "",
			nachname: "",
            vorname: "", 
            strasse: "", 
            plz: "", 
            ort: "", 
            telefon: "", 
            email: ""
        };
        return emptyKontakt;
    }
	;
	 
	 
	// Speichern eines neuen oder bearbeiteten Kontaktes
	// Jedesmal das komplette allKontakt Array mit allen Objekten speichern
    $scope.addKontakt = function () {
		 if(validateKontakt()){
			 if($scope.isNewKontakt){
				 //Neues Objekt hinzufügen
				 $scope.allKontakt.push($scope.selectedKontakt);
				 $scope.kontakt.hide();
				 $log.debug("KontakteCtrl: Add Kontakt -> END WITH SUCCESS");
			 } else {
				 //Aktualisierung eines Objektes, weil es nur bearbeitet wurde
				 $scope.kontakt.hide();
				 $log.debug("KontakteCtrl: Edit Kontakt -> END WITH SUCCESS");
			 }
			$scope.saveUserprofil();
		 } else {
			 $log.debug("Folgendes ist nicht valide: " + $scope.whichinvalid);
			 $cordovaDialogs.alert("Folgender Eintrag ist nicht gültig: " + $scope.whichinvalid, 'Eintrag fehlerhaft', 'OK')
             .then(function() {
             // callback success
          });
		}
	 }
	 ;
	 

    $scope.openKontaktModal = function() {
        $log.debug("KontakteCtrl: Kontakt Modal -> OPEN");
        $scope.kontakt.show();
    }
	;
	
	$scope.closeKontaktModal = function () {
		$scope.kontakt.hide();
		$log.debug("KontakteCtrl: Kontakt Modal -> CLOSE");
	}
	;
	
	//Welcher Userinput ist nicht gültig / nicht gepflegt
	$scope.whichinvalid = "";
	
    function validateKontakt() {
		if($scope.selectedKontakt.kontaktArt == "") {
			$scope.whichinvalid = "Kontaktart";
			return false;
		} else if($scope.selectedKontakt.kontaktArt == "notfallkontakt" && $scope.selectedKontakt.kontaktBeziehung == "") {
			$scope.whichinvalid = "Kontaktbeziehung";
			return false;	
		} else if($scope.selectedKontakt.kontaktArt == "arzt" && $scope.selectedKontakt.arztArt == "") {
			$scope.whichinvalid = "Arztart";
			return false;
		} else if($scope.selectedKontakt.kontaktArt == "apotheke"  && $scope.selectedKontakt.nachname == "") {
			$scope.whichinvalid = "Apothekenname";
			return false;		
		} else if ($scope.selectedKontakt.nachname == "") {
			$scope.whichinvalid = "Nachname";
			return false;
		} else if(($scope.selectedKontakt.kontaktArt == "notfallkontakt" || $scope.selectedKontakt.kontaktArt == "arzt") && $scope.selectedKontakt.vorname == "") {
			$scope.whichinvalid = "Vorname";
			return false;		
		} else if ($scope.selectedKontakt.strasse == "") {
			$scope.whichinvalid = "Strasse";
			return false;
		} else if ($scope.selectedKontakt.plz == "") {
			$scope.whichinvalid = "PLZ";
			return false;
		} else if ($scope.selectedKontakt.ort == "") {
			$scope.whichinvalid = "Ort";
			return false;
		} else if ($scope.selectedKontakt.telefon == "") {
			$scope.whichinvalid = "Telefon";
			return false;
		} else if ($scope.selectedKontakt.email == "") {
			$scope.whichinvalid = "Email";
			return false;			
		}	else {
			return true;
		} 
    }
	;

	$scope.deleteKontakt = function (kontakt) {
		$scope.allKontakt.splice($scope.allKontakt.indexOf(kontakt), 1);
		$scope.saveUserprofil();
		$scope.kontakt.hide();
		$log.debug("KontakteCtrl: Delete Kontakt -> END WITH SUCCESS");
	}
	;
	
	$scope.saveUserprofil = function() {
		ProfilStorage.saveProfil("kontakt", $scope.allKontakt);
		$log.debug("KontaktCtrl: Save Kontakt -> END WITH SUCCESS");
	}
	;
	
	$scope.loadKontakt = function() {
		$log.debug("UserprofilCtrl: Start loadUserprofil");
		$scope.kontaktData = [];
		$scope.kontaktData = ProfilStorage.loadProfil("kontakt");
		
		if($scope.kontaktData == null) {
			//do initialize
			$log.debug("do initialize");
		} else {
			$scope.allKontakt = $scope.kontaktData;
			$log.debug("UserprofilCtrl: Ende loadUserprofil");
		}
	}
	;
	
  });
  