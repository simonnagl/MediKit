angular.module('starter.mediEinnahmeCtrl', [])

.controller('mediEinnahmeCtrl', function($scope, $ionicModal, $timeout) {

    //Controller mediEinnahmeCtrl

   // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  
  // Form data for the mediEinnahme_neu modal
  $scope.mediEinnahmeData = [];
  
  // Create the mediEinnahme_neu modal that we will use later
  $ionicModal.fromTemplateUrl('templates/mediEinnahme_neu.html', {
    scope: $scope
  }).then(function(einnahme) {
    $scope.einnahme = einnahme;
  });
  
  // Create the mediEinnahme_neu modal that we will use later
    $ionicModal.fromTemplateUrl('templates/mediEinnahme_edit.html', {
    scope: $scope
  }).then(function(einnahme) {
    $scope.einnahme = einnahme;
  });
  
  // Triggered in the mediEinnahme_neu modal to close it
  $scope.closeMediEinnahme_neu = function() {
    $scope.einnahme.hide();
    
    //Resetfunktion in Billig:
        $scope.einnahme.medi = "";
        $scope.einnahme.einnahmemenge = "";
        $scope.einnahme.einheit = "";
        $scope.einnahme.data = "";
        $scope.einnahme.repeat = "";
        $scope.einnahme.vibration = "";
  };
  
  // Triggered in the mediEinnahme_edit modal to close it
  $scope.closeMediEinnahme_edit = function() {
    $scope.einnahme.hide();
    
    //Resetfunktion in Billig:
        $scope.einnahme.medi = "";
        $scope.einnahme.einnahmemenge = "";
        $scope.einnahme.einheit = "";
        $scope.einnahme.data = "";
        $scope.einnahme.repeat = "";
        $scope.einnahme.vibration = "";
  };
  
  // deleteMediEinnahme
  $scope.deleteMediEinnahme = function(deleteObjectIndex) {
     console.log('Delete: ' +  $scope.mediEinnahmeData[deleteObjectIndex]);
     $scope.mediEinnahmeData.splice(deleteObjectIndex, 1);
     
     $scope.closeMediEinnahme_edit();
  };

  
  // Open the mediEinnahme_neu modal
  $scope.mediEinnahme_neu = function() {
    $scope.einnahme.show();
  };
  
  // Open the mediEinnahme_edit modal
  $scope.mediEinnahme_edit = function(editOjectIndex) {
      console.log('Edit Object: ', editOjectIndex);
        $scope.einnahme.index = editOjectIndex;
        $scope.einnahme.medi = $scope.mediEinnahmeData[editOjectIndex].medi;
        $scope.einnahme.einnahmemenge = $scope.mediEinnahmeData[editOjectIndex].einnahmemenge;
        $scope.einnahme.einheit = $scope.mediEinnahmeData[editOjectIndex].einheit;
        $scope.einnahme.data = $scope.mediEinnahmeData[editOjectIndex].data;
        $scope.einnahme.repeat = $scope.mediEinnahmeData[editOjectIndex].repeat;
        $scope.einnahme.vibration = $scope.mediEinnahmeData[editOjectIndex].vibration;
        
    $scope.einnahme.show();
  };
  
  // Perform the mediEinnahme_neu action when the user add the einnahme form
  
   $scope.addEinnahme = function () {
     console.log("addEinnahme: " + $scope.einnahme);
        $scope.mediEinnahmeData.push({ //Man könnte auch nur das Objekt $scope.user pushen.
            "medi": $scope.einnahme.medi,
            "einnahmemenge": $scope.einnahme.einnahmemenge,
            "einheit": $scope.einnahme.einheit,
            "data": $scope.einnahme.data,
            "repeat": $scope.einnahme.repeat,
            "vibration": $scope.einnahme.vibration
        });
        //Resetfunktion in Billig:
        $scope.einnahme.medi = "";
        $scope.einnahme.einnahmemenge = "";
        $scope.einnahme.einheit = "";
        $scope.einnahme.data = "";
        $scope.einnahme.repeat = "";
        $scope.einnahme.vibration = "";

    // Simulate a mediEinnahme_neu delay.
    $timeout(function() {
      $scope.closeMediEinnahme_neu();
    }, 1000);
        
    };

});
