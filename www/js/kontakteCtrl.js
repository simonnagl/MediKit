angular.module('starter.kontakteCtrl', [])

  .controller('KontakteCtrl', function($scope, $log, $ionicModal){
    
    // allKontakt : Alle Kontaktobjekte die gepeichert worden sind
	$scope.allKontakt = [
		{kontaktArt: "notfallkontakt", arztArt: "", kontaktBeziehung: "Vater", nachname: "Meyer", vorname: "Thomas", strasse: "Hauptstraße 66", plz: "85072", ort: "Eichstätt", telefon: "0841123456", email: "kontakt@web.de"},
		{kontaktArt: "notfallkontakt", arztArt: "", kontaktBeziehung: "Partner", nachname: "Huber", vorname: "Hans", strasse: "Hauptstraße 12", plz: "10115", ort: "Berlin", telefon: "0841789012", email: "kontakt2@web.de"},
		{kontaktArt: "arzt", arztArt: "Sportmedizin", kontaktBeziehung: "", nachname: "Dr. Mueller-Wohlfahrt", vorname: "Hans-Wilhelm", strasse: "Dienerstraße 12", plz: "80331", ort: "München", telefon: "08945238590", email: "arzt1@web.de"},
		{kontaktArt: "arzt", arztArt: "Orthopäde", kontaktBeziehung: "", nachname: "Dr. Meyer", vorname: "Sepp", strasse: "Hauptstraße 12", plz: "10115", ort: "Berlin", telefon: "08945238590", email: "arzt2@web.de"},
		{kontaktArt: "apotheke", arztArt: "", kontaktBeziehung: "", nachname: "Marien Apotheke", vorname: "", strasse: "Kupferstraße 1", plz: "85049", ort: "Ingolstadt", telefon: "0841123456", email: "apoth@web.de"}
	];
    
    // selectedKontakt : Der Kontakt der bearbeitet wird.
    $scope.selectedKontakt = null;
    
    // isNewKontakt : Wird auf True gesetzt, wenn ein neuer Kontakt angelegt wird
    $scope.isNewKontakt = false;
	
	 // Create the kontakte_neu modal that we will use later // Sergej
	$ionicModal.fromTemplateUrl('templates/kontakte_neu.html', {scope: $scope}).then(function(kontakt) {
        $scope.kontakt = kontakt;
	});
  
    $scope.createNewKontakt = function() {
        $log.debug("KontakteCtrl: Create new Kontakt -> START");
        $scope.isNewKontakt = true;
        $scope.selectedKontakt = createNewKontaktObject();
        $scope.openKontaktModal();
    };
    
    $scope.editKontakt = function(kontakt) {
        $log.debug("KontakteCtrl: Edit Kontakt -> START");
        $scope.selectedKontakt = kontakt;
        $scope.openKontaktModal();
    };
    
    function createNewKontaktObject() {
        $log.debug("KontakteCtrl: Create new empty Kontakt Object");
        var emptyKontakt = {
            kontaktArt: "",
            arztArt: "",
			nachname: "",
            vorname: "", 
            strasse: "", 
            plz: "", 
            ort: "", 
            telefon: "", 
            email: ""
        };
        
        return emptyKontakt;
    };
	 
	 
	// Speichern eines neuen oder bearbeiteten Kontaktes
	// Jedesmal das komplette allKontakt Array mit allen Objekten speichern
    $scope.addKontakt = function () {
		 if($scope.isNewKontakt){
			 //Ein neues Kontaktobjekt erstellen, pushen und speichern
			 $scope.kontakt.hide();
			 $log.debug("KontakteCtrl: Add Kontakt -> END WITH SUCCESS");
		 } else {
			 //Aktualisierung eines Objektes, weil es nur bearbeitet wurde
			 $scope.allKontakt.push($scope.selectedKontakt)
			 $scope.kontakt.hide();
			 $log.debug("KontakteCtrl: Edit Kontakt -> END WITH SUCCESS");
			 
		 }
	 };
	 

    $scope.openKontaktModal = function() {
        $log.debug("KontakteCtrl: Kontakt Modal -> OPEN");
        $scope.kontakt.show();
    };
	

	$scope.closeKontaktModal = function () {
		$scope.kontakt.hide();
		$log.debug("KontakteCtrl: Kontakt Modal -> CLOSE");
	};
	
    function validateKontakt(kontakt) {
        // TODO: Validierung implementieren
        return true;
    };

	$scope.deleteKontakt = function () {
		// TODO: Delete des Kontaktobjekts implementieren (splice?)
		$scope.kontakt.hide();
		$log.debug("KontakteCtrl: Delete Kontakt -> END WITH SUCCESS");
	}
	
  });
  