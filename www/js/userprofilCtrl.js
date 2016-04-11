angular.module('userprofilCtrl', [])



// Übergangsweise werden hier die Daten gespeichert.
// Später per userprofilstorageService der die Daten im Webstorage ablegt 

.controller('objectCtrl', function($scope){
    $scope.daten = { 
      nachname: "Schmidt", 
      vorname: "Hans",
	  strasse: "Hauptstrasse 3", 
	  plz: "80331",
	  ort: "Muenchen",
	 // -----------------------------
	  kontaktnachname: "Meyer",
	  kontaktvorname: "Thomas",
	  kontakttelefon: "0841123456",
	  kontaktemail: "kontakt@web.de",
	 // ------------------------------
	  hausarztnachname: "Dr. Mueller-Wohlfahrt",
	  hausarztvorname: "Hans-Wilhelm",
	  hausarztstrasse: "Dienerstrasse 12",
	  hausarztplz: "80331",
	  hausarztort: "Muenchen",
	  hausarzttelefon: "08945238590",
	  hausarztart: "Sportmedizin",
	 // ------------------------------
	  apothekename: "Marien Apotheke",
	  apothekestrasse: "Kupferstrasse 1",
	  apothekeplz: "85049",
	  apothekeort: "Ingolstadt",
	  apotheketelefon: "0841123456",
	 // -----------------------------
	  blutgruppe: "AB",
	  unvertraeglichkeiten: "Unvertraeglichkeit1",
	  allergien: "Nuesse",
	  erkrankungen: "Aids"
	  	  
    }; 
  })
  

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
    
    
