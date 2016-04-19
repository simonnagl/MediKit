angular.module('starter.kontakteCtrl', [])


  
  .controller('KontakteCtrl', function($scope, $ionicModal){
    
	//wird erst bei Neuanlage eines Kontakts durch Kombobox definiert
	$scope.kontaktart = ""; 
	
		

	//----------------------------------------
	//Weitere Teststruktur
	$scope.kontakt = [{
		art: "kontaktperson",
		daten:[
			{nachname: "Meyer", vorname: "Thomas"},
			{nachname: "Kontakt2", vorname: "Kontakt2Vorname"}
			]
		},
		{
		art: "arzt",
		daten:[
			{nachname: "Dr. Mueller-Wohlfahrt", vorname: "Hans-Wilhelm", art: "Orthop�de"}
			]
		},
		{
		art: "apotheke",
		daten:[]
		}
	]
	
	
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
	 
	 
	 $scope.kontakt_neu = function() {};
    
    $scope.kontakt_edit = function() {};
  });