angular.module('starter.kontakteCtrl', [])


  
  .controller('kontakteCtrl', function($scope, $ionicModal){
    
	//wird erst bei Neuanlage eines Kontakts durch Kombobox definiert
	$scope.kontaktart = ""; 
	
		

	//----------------------------------------
	//Weitere Teststruktur
	$scope.kontakt = [{
		"art": "kontaktperson",
		"daten":[
			{"nachname": "Meyer", "vorname": "Thomas"},
			{"nachname": "Kontakt2", "vorname": "Kontakt2Vorname"}
			]
		},
		{
		"art": "arzt",
		"daten":[
			{"nachname": "Dr. Mueller-Wohlfahrt", "vorname": "Hans-Wilhelm", "art": "Orthop�de"}
			]
		},
		{
		"art": "apotheke",
		"daten":[]
		}
	]
	
	
	//----------------------------------------
	$scope.kontaktperson = [
        {nachname: "Meyer", vorname: "Thomas", telefon: "0841123456", email: "kontakt@web.de", art: "Vater"},
		{nachname: "Kontakt2", vorname: "Kontakt2Vorname", telefon: "0841789012", email: "kontakt2@web.de", art: "Partner"}
     ];
     
     $scope.arzt = [
        {nachname: "Dr. Mueller-Wohlfahrt", vorname: "Hans-Wilhelm", strasse: "Dienerstrasse 12", plz: "80331", ort: "Muenchen", telefon: "08945238590", art: "Sportmedizin"},
		{nachname: "Arzt2", vorname: "Arzt2Vorname", strasse: "Arzt2Strasse 12", plz: "80331", ort: "Arzt2Ort", telefon: "08945238590", art: "Arzt2Art"}
	 ];
	 
	 $scope.apotheke = [
		{name: "Marien Apotheke", strasse: "Kupferstrasse 1", plz: "85049", ort: "Ingolstadt", telefon: "0841123456"}
	 ];
	 //----------------------------------------
	 
	 
	 
	 
	 $scope.addKontakt = function () {
		 //Abhängig von $scope.kontaktart (switchcase?) sollen andere Datens�tze abgelegt werden
		 
	 };
	 
	 
	 $scope.kontakt_neu = function() {};
    
    $scope.kontakt_edit = function() {};
  });