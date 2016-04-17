angular.module('starter.kontakteCtrl', [])


  
  .controller('kontakteCtrl', function($scope){
    $scope.kontakt = [
        {nachname: "Meyer", vorname: "Thomas", telefon: "0841123456", email: "kontakt@web.de"},
		{nachname: "Kontakt2", vorname: "Kontakt2Vorname", telefon: "0841789012", email: "kontakt2@web.de"}
     ];
     
     $scope.arzt = [
        {nachname: "Dr. Mueller-Wohlfahrt", vorname: "Hans-Wilhelm", strasse: "Dienerstrasse 12", plz: "80331", ort: "Muenchen", telefon: "08945238590", art: "Sportmedizin"},
		{nachname: "Arzt2", vorname: "Arzt2Vorname", strasse: "Arzt2Strasse 12", plz: "80331", ort: "Arzt2Ort", telefon: "08945238590", art: "Arzt2Art"}
	 ];
	 
	 $scope.apotheke = [
		{name: "Marien Apotheke", strasse: "Kupferstrasse 1", plz: "85049", ort: "Ingolstadt", telefon: "0841123456"}
	 ];
  });