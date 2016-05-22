angular.module('starter.kontakteCtrl', [])

  .controller('KontakteCtrl', function($scope, $log, $ionicModal, ProfilStorage){
    
	$scope.$on('$ionicView.enter', function() {
     // Code you want executed every time view is opened
	 $scope.loadKontakt()
     $log.debug("View opened");
	})
	
    // allKontakt : Alle Kontaktobjekte die gepeichert worden sind
	/*$scope.allKontakt = [
		{kontaktArt: "notfallkontakt", arztArt: "", kontaktBeziehung: "Vater", nachname: "Meyer", vorname: "Thomas", strasse: "Hauptstraße 66", plz: "85072", ort: "Eichstätt", telefon: "0841123456", email: "kontakt@web.de"},
		{kontaktArt: "notfallkontakt", arztArt: "", kontaktBeziehung: "Partner", nachname: "Huber", vorname: "Hans", strasse: "Hauptstraße 12", plz: "10115", ort: "Berlin", telefon: "0841789012", email: "kontakt2@web.de"},
		{kontaktArt: "arzt", arztArt: "Sportmedizin", kontaktBeziehung: "", nachname: "Dr. Mueller-Wohlfahrt", vorname: "Hans-Wilhelm", strasse: "Dienerstraße 12", plz: "80331", ort: "München", telefon: "08945238590", email: "arzt1@web.de"},
		{kontaktArt: "arzt", arztArt: "Orthopäde", kontaktBeziehung: "", nachname: "Dr. Meyer", vorname: "Sepp", strasse: "Hauptstraße 12", plz: "10115", ort: "Berlin", telefon: "08945238590", email: "arzt2@web.de"},
		{kontaktArt: "apotheke", arztArt: "", kontaktBeziehung: "", nachname: "Marien Apotheke", vorname: "", strasse: "Kupferstraße 1", plz: "85049", ort: "Ingolstadt", telefon: "0841123456", email: "apoth@web.de"}
	]
	;*/
	$scope.allKontakt = [];
    
    // selectedKontakt : Der Kontakt der bearbeitet wird.
    $scope.selectedKontakt = null;
    
    // isNewKontakt : Wird auf True gesetzt, wenn ein neuer Kontakt angelegt wird
    $scope.isNewKontakt = false;
	
	 // Create the kontakte_neu modal that we will use later // Sergej
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
				 $scope.allKontakt.push($scope.selectedKontakt);
				 $scope.kontakt.hide();
				 $log.debug("KontakteCtrl: Add Kontakt -> END WITH SUCCESS");
			 } else {
				 //Aktualisierung eines Objektes, weil es nur bearbeitet wurde
				 
				 //TODO: Probleme mit dem doppelten Objekt / Hashkey beim speichern in den Localstorage beheben
				 $scope.allKontakt.push($scope.selectedKontakt)
				 $scope.kontakt.hide();
				 $log.debug("KontakteCtrl: Edit Kontakt -> END WITH SUCCESS");
			 }
			$scope.saveUserprofil();
		 } else {
			 $log.debug("Folgendes ist nicht valide: " + $scope.whichinvalid);
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
	
	$scope.whichinvalid = "";
	
    function validateKontakt() {

		if($scope.selectedKontakt.kontaktArt == "") {
			$scope.whichinvalid = "kontaktArt";
			return false;
		//wird nicht sauber geprüft, weil zu dem Zeitpunkt noch nichts in dem Array drinsteht... ?
		} else if($scope.selectedKontakt.kontaktArt == "notfallkontakt" && $scope.selectedKontakt.kontaktBeziehung == "") {
			$scope.whichinvalid = "kontaktBeziehung";
			return false;	
		} else if($scope.selectedKontakt.kontaktArt == "arzt" && $scope.selectedKontakt.arztArt == "") {
			$scope.whichinvalid = "arztArt";
			return false;
		} else if($scope.selectedKontakt.kontaktArt == "apotheke"  && $scope.selectedKontakt.nachname == "") {
			$scope.whichinvalid = "Apothekenname aka nachname";
			return false;		
		} else if ($scope.selectedKontakt.nachname == "") {
			$scope.whichinvalid = "nachname";
			return false;
		} else if(($scope.selectedKontakt.kontaktArt == "notfallkontakt" || $scope.selectedKontakt.kontaktArt == "arzt") && $scope.selectedKontakt.vorname == "") {
			$scope.whichinvalid = "vorname";
			return false;		
		} else if ($scope.selectedKontakt.strasse == "") {
			$scope.whichinvalid = "strasse";
			return false;
		} else if ($scope.selectedKontakt.plz == "") {
			$scope.whichinvalid = "plz";
			return false;
		} else if ($scope.selectedKontakt.ort == "") {
			$scope.whichinvalid = "ort";
			return false;
		} else if ($scope.selectedKontakt.telefon == "") {
			$scope.whichinvalid = "telefon";
			return false;
		} else if ($scope.selectedKontakt.email == "") {
			$scope.whichinvalid = "email";
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
	
  });
  