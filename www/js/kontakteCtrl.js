angular.module('starter.kontakteCtrl', [])


  
  .controller('KontakteCtrl', function($scope, $log, $ionicModal){
    
	
	
	//----------------------------------------
	$scope.allKontaktperson = [
        {nachname: "Meyer", vorname: "Thomas", telefon: "0841123456", email: "kontakt@web.de", art: "Vater"},
		{nachname: "Huber", vorname: "Hans", telefon: "0841789012", email: "kontakt2@web.de", art: "Partner"}
     ];
     
     $scope.allArzt = [
        {nachname: "Dr. Mueller-Wohlfahrt", vorname: "Hans-Wilhelm", strasse: "Dienerstrasse 12", plz: "80331", ort: "Muenchen", telefon: "08945238590", art: "Sportmedizin"},
		{nachname: "Dr. Meyer", vorname: "Sepp", strasse: "Hauptstrasse 12", plz: "10115", ort: "Berlin", telefon: "08945238590", art: "Orthopäde"}
	 ];
	 
	 $scope.allApotheke = [
		{name: "Marien Apotheke", strasse: "Kupferstrasse 1", plz: "85049", ort: "Ingolstadt", telefon: "0841123456"}
	 ];
	 //----------------------------------------
	 
	 
	//Kontaktart -> 1 = Notfallkontakt // 2 = Arzt // 3 = Apotheke
	//wird erst bei Neuanlage eines Kontakts durch Kombobox definiert
	//Je nach Comboboxwahl werden die Werte der Kontakte_neu.html Form in das jeweilige Objekt gespeichert
	//Nach dem speichern eines neuen Kontaktes muss die kontaktart noch reseted werden!!
	$scope.kontaktart = ""; 
	
	// ALTERNATIVE: Kontaktart prüfen per Funktion, welche von ng-if aufgerufen wird.
	//$scope.kontaktart = function() {}
	 
	 // Create the kontakte_neu modal that we will use later // Sergej
	$ionicModal.fromTemplateUrl('templates/kontakte_neu.html', {
		scope: $scope
		}).then(function(kontakt) {
		$scope.kontakt = kontakt;
	});
  
	 // Open the kontakte_neu modal // Sergej
	 $scope.kontakt_neu = function() {
		$scope.isNewEin = true;
		$scope.kontakt.show();
		$log.debug("kontakt_neu");
		//kennzeichne neu bzw. undefined für Delete-Fehler abfangen.
		$scope.kontakt.index = undefined;
		$log.info($scope.kontakt.index);
	 };
	 
	 
	  // Speichern eines neuen Kontaktes
	 $scope.addKontakt = function () {
		 //Abhängig von $scope.kontaktart (switchcase?) sollen andere Datensätze abgelegt werden
		 //.push
		 // Zurücksetzen von $scope.kontaktart
		 $log.debug('addKontakt: ' + $scope.kontaktart);
	 };
	 
	 

	// Triggered in the kontakte_neu modal to close it // Sergej
	$scope.closeKontakte_neu = function() {
		$log.debug('closeKontakte_neu');
		$scope.kontakt.hide();
    
		//Resetfunktion in billig für alle
        $scope.allKontaktperson.nachname = "";
		$scope.allKontaktperson.vorname = "";
		$scope.allKontaktperson.telefon = "";
		$scope.allKontaktperson.email = "";
		$scope.allKontaktperson.art = "";
		
		$scope.allArzt.nachname = "";
		$scope.allArzt.vorname = "";
		$scope.allArzt.strasse = "";
		$scope.allArzt.plz = "";
		$scope.allArzt.ort = "";
		$scope.allArzt.telefon = "";
		
		$scope.allApotheke.name = "";
		$scope.allApotheke.strasse = "";
		$scope.allApotheke.plz = "";
		$scope.allApotheke.ort = ""; 
		$scope.allApotheke.telefon = "";
  };
	
	
	
	// Testbereich für die EDIT, SAVE und CANCEL Funktionen: // Funktionsnamen ändern - siehe Userprofil!
	 var tmpDate = new Date();
	 $scope.newField = {};
     $scope.editing = false;

	
	// Editfunktion in billig nur für allKontaktperson
	$scope.notfallKontakt_edit = function(field) {
		$scope.editing = $scope.allKontaktperson.indexOf(field);
		$scope.newField = angular.copy(field);
		};
	// Savefunktion in billig nur für allKontaktperson
	$scope.saveField = function(index) {
		if ($scope.editing !== false) {
			$scope.allKontaktperson[$scope.editing] = $scope.newField;
			$scope.editing = false;
			$log.debug('save done von index ' + $scope.allKontaktperson.indexOf($scope.newField));
			
			}      
		else {
			$log.debug('save failed');
			}
		};
	// Cancelfunktion in billig nur für allKontaktperson
	$scope.cancel = function(index) {
			if ($scope.editing !== false) {
			$scope.allKontaktperson[$scope.editing] = $scope.newField;
			$scope.editing = false;
			}       
		};
		
  });