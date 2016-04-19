angular.module('starter.userprofilCtrl', [])



// Übergangsweise werden hier die Daten gespeichert.
// Später per userprofilstorageService der die Daten im Webstorage ablegt 

.controller('UserprofilCtrl', function($scope){
    
    $scope.allPersoenlicheDaten = [
        {
            nachname: "Schmidt",
            vorname: "Hans",
            strasse: "Hauptstrasse 3", 
	        plz: "80331",
	        ort: "Muenchen" 
        }   
        	  
     ];
     
     $scope.allAllergie = [
        {name: "Allergie1"},
        {name: "Allergie2"},
        {name: "Allergie3"}
     ];
     
     
     $scope.allBlutgruppe = [
		{name: "AB"}
	];
     
     
     $scope.allUnvertraeglichkeit = [
         {name: "Unvertraeglichkeit1"},
         {name: "Unvertraeglichkeit2"},
		 {name: "Unvertraeglichkeit3"},
		 {name: "Unvertraeglichkeit4"}
     ];
     
     
     $scope.allErkrankung = [
         {name: "Erkrankung1"},
         {name: "Erkrankung2"},
		 {name: "Erkrankung3"},
		 {name: "Erkrankung4"},
		 {name: "Erkrankung5"}
     ];
});

    
    
