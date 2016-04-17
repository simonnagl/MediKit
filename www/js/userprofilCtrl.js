angular.module('starter.userprofilCtrl', [])



// Übergangsweise werden hier die Daten gespeichert.
// Später per userprofilstorageService der die Daten im Webstorage ablegt 

.controller('userprofilCtrl', function($scope){
    $scope.persoenlicheDaten = [
        {
            nachname: "Schmidt",
            vorname: "Hans",
            strasse: "Hauptstrasse 3", 
	        plz: "80331",
	        ort: "Muenchen" 
        }   
        	  
     ];
     
     $scope.allergie = [
        {name: "Allergie1"},
        {name: "Allergie2"},
        {name: "Allergie3"}
     ];
     
     
     $scope.blutgruppe = [
		{name: "AB"}
	];
     
     
     $scope.unvertraglichkeit = [
         {name: "Unvertraeglichkeit1"},
         {name: "Unvertraeglichkeit2"}
     ];
     
     
     $scope.erkrankung = [
         {name: "Erkrankung1"},
         {name: "Erkrankung2"}
     ];
});
      
	 

 .controller('ExampleController', ['$scope', function($scope) {
      $scope.master = {};

      $scope.update = function(user) {
        $scope.master = angular.copy(user);
      };

      $scope.reset = function() {
        $scope.user = angular.copy($scope.master);
      };

      $scope.reset();
    }]);
    
    
