angular.module('starter.kontakteCtrl', [])


  
  .controller('KontakteCtrl', function($scope, $log, $ionicModal){
    
	//wird erst bei Neuanlage eines Kontakts durch Kombobox definiert
	$scope.kontaktart = ""; 
	
	
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
	 
	 
	 
	 
	 $scope.addKontakt = function () {
		 //Abhängig von $scope.kontaktart (switchcase?) sollen andere Datens�tze abgelegt werden
		 
	 };
	 
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
	 
	 
	 /*
	 Bzw. hier als neuer Wert dann die geänderten Werte reinspeichern lassen
	 -> Das ist also eigentlich meine add bzw. save funkction
	 -> "nachname": $scope.kontaktperson.nachname,  ???ß
	 -> Siehe mediEinnahmeCtrl
	 
	 $scope.kontakt_neu = function() {
		 $log.debug('kontakt_neu');
		 $scope.allKontaktperson.push({
		 "nachname": 'Nachname_neu',
		 "vorname": "Vorname_neu",
		 "telefon": "telefon_neu",
		 "email": "mail_neu",
		 "art": "art_neu"
		 });
		};
	
	 
	 wenn ich neuen kontakt anlege soll quasi die selbe Form kommen, allerdings
	 sollen die Inputfelder leer sein.
	 Das was ich bisher gemacht habe war, dass ich einfach versucht habe 
	 das bisherige Objekt zu leeren(?)
	 Also evtl ein neues Objekt anlegen, aber mit leeren werten und dieses dann 
	 anzeigen lassen in den Inputfeldern?
	 */
  
	

	
	
	
	
	// Testbereich:
	 var tmpDate = new Date();
	 $scope.newField = {};
     $scope.editing = false;

	

	$scope.notfallKontakt_edit = function(field) {
		$scope.editing = $scope.allKontaktperson.indexOf(field);
		$scope.newField = angular.copy(field);
		};

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

	$scope.cancel = function(index) {
			if ($scope.editing !== false) {
			$scope.allKontaktperson[$scope.editing] = $scope.newField;
			$scope.editing = false;
			}       
		};
		
  });