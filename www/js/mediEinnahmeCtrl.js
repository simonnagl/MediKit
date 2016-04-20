angular.module('starter.mediEinnahmeCtrl', [])

.controller('mediEinnahmeCtrl', function($log, $scope, $ionicModal, $timeout, $ionicPopup) {

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
    $ionicModal.fromTemplateUrl('templates/mediEinnahme_edit.html', {
    scope: $scope
  }).then(function(einnahme) {
    $scope.einnahme = einnahme;
  });
  
  // Triggered in the mediEinnahme_neu modal to close it
  $scope.closeMediEinnahmeNeu = function() {
    $scope.einnahme.hide();
    
    //Resetfunktion in Billig:
        $scope.einnahme.mediname = "";
        $scope.einnahme.einnahmemenge = "";
        $scope.einnahme.uhrzeit = "";
        $scope.einnahme.wiederholungstag = "";
        $scope.einnahme.wiederholungsbeginn = "";
        $scope.einnahme.wiederholungsende = "";
        $scope.einnahme.vibration = "";
  };
  
  // Triggered in the mediEinnahme_edit modal to close it
  $scope.closeMediEinnahmeEdit = function() {
    $scope.einnahme.hide();
    
    //Resetfunktion in Billig:
        $scope.einnahme.mediname = "";
        $scope.einnahme.einnahmemenge = "";
        $scope.einnahme.uhrzeit = "";
        $scope.einnahme.wiederholungstag = "";
        $scope.einnahme.wiederholungsbeginn = "";
        $scope.einnahme.wiederholungsende = "";
        $scope.einnahme.vibration = "";
  };
  
  // deleteMediEinnahme
  $scope.deleteMediEinnahme = function(deleteObjectIndex) {
     //Abfangen ob es sich um ein neues Objekt handelt
     if (deleteObjectIndex != undefined){
          $log.info('Delete: ' + deleteObjectIndex);
          $scope.mediEinnahmeData.splice(deleteObjectIndex, 1);
     } else {
        //Objekt soll nicht gelöscht werden, da es ein neues Objekt war 
          $log.info('Neues Objekt, wird nur verworfen: ' + deleteObjectIndex);
     }
     
     $scope.closeMediEinnahmeEdit();
  };

  
  // Open the mediEinnahme_neu modal
  $scope.mediEinnahmeNeu = function() {
    $scope.isNewEin = true;
    $scope.einnahme.show();
    
    //kennzeichne neu bzw. undefined für Delete-Fehler abfangen.
    $scope.einnahme.index = undefined;
    $log.info($scope.einnahme.index);
  };
  
  // Open the mediEinnahme_edit modal
  $scope.mediEinnahmeEdit = function(editObjectIndex) {
    $scope.isNewEin = false;
      $log.info('Edit Object: ', editObjectIndex);
        $scope.einnahme.index = editObjectIndex;
        $scope.einnahme.mediname = $scope.mediEinnahmeData[editObjectIndex].mediname;
        $scope.einnahme.einnahmemenge = $scope.mediEinnahmeData[editObjectIndex].einnahmemenge;
        $scope.einnahme.uhrzeit = $scope.mediEinnahmeData[editObjectIndex].uhrzeit;
        $scope.einnahme.wiederholungstag = $scope.mediEinnahmeData[editObjectIndex].wiederholungstag;
        $scope.einnahme.wiederholungsbeginn = $scope.mediEinnahmeData[editObjectIndex].wiederholungsbeginn;
        $scope.einnahme.wiederholungsende = $scope.mediEinnahmeData[editObjectIndex].wiederholungsende;
        $scope.einnahme.vibration = $scope.mediEinnahmeData[editObjectIndex].vibration;
    $scope.einnahme.show();
  };
  
  // Perform the mediEinnahme_neu action when the user add the einnahme form
  
   $scope.addEinnahme = function () {
     $log.info("addEinnahme: " + $scope.einnahme.mediname);
     
     if ($scope.einnahme.index == undefined){
          
        //undefined zeigt, das es eine neue Einnahme ist, somit einfach das Objekt pushen.
        $scope.mediEinnahmeData.push({ //Man könnte auch nur das Objekt $scope.user pushen.
            "mediname": $scope.einnahme.mediname,
            "einnahmemenge": $scope.einnahme.einnahmemenge,
            "uhrzeit": $scope.einnahme.uhrzeit,
            "wiederholungstag": $scope.einnahme.wiederholungstag,
            "wiederholungsbeginn": $scope.einnahme.wiederholungsbeginn,
            "wiederholungsende": $scope.einnahme.wiederholungsende,
            "vibration": $scope.einnahme.vibration
        }); 
      } else {
        //Andernfalls soll die Einnahme aktuallisiert werden                
          $scope.mediEinnahmeData[$scope.einnahme.index].mediname = $scope.einnahme.mediname;
          $scope.mediEinnahmeData[$scope.einnahme.index].einnahmemenge = $scope.einnahme.einnahmemenge;
          $scope.mediEinnahmeData[$scope.einnahme.index].uhrzeit = $scope.einnahme.uhrzeit;
          $scope.mediEinnahmeData[$scope.einnahme.index].wiederholungstag = $scope.einnahme.wiederholungstag;
          $scope.mediEinnahmeData[$scope.einnahme.index].wiederholungsbeginn = $scope.einnahme.wiederholungsbeginn;
          $scope.mediEinnahmeData[$scope.einnahme.index].wiederholungsende = $scope.einnahme.wiederholungsende;
          $scope.mediEinnahmeData[$scope.einnahme.index].vibration = $scope.einnahme.vibration;
      }
        //Resetfunktion in Billig:
        $scope.einnahme.mediname = "";
        $scope.einnahme.einnahmemenge = "";
        $scope.einnahme.uhrzeit = "";
        $scope.einnahme.wiederholungstag = "";
        $scope.einnahme.wiederholungsbeginn = "";
        $scope.einnahme.wiederholungsende = "";
        $scope.einnahme.vibration = "";

    // Simulate a mediEinnahme_neu delay.
    $timeout(function() {
      $scope.closeMediEinnahmeNeu();
    }, 10);
        
    };


////Pupup

   // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {}
      $scope.data.model = $scope.einnahme.wiederholungstag;
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         //template: '<input type = "text" ng-model = "data.model">',
         //könnte man in eine templateUrl umändern und den viewcode extra auslagern.
         template: '<ion-list><ion-checkbox ng-model="data.model.mo">Montag</ion-checkbox><ion-checkbox ng-model="data.model.di">Dienstag</ion-checkbox><ion-checkbox ng-model="data.model.mi">Mittwoch</ion-checkbox><ion-checkbox ng-model="data.model.do">Donnerstag</ion-checkbox><ion-checkbox ng-model="data.model.fr">Freitag</ion-checkbox><ion-checkbox ng-model="data.model.sa">Samstag</ion-checkbox><ion-checkbox ng-model="data.model.so">Sonntag</ion-checkbox></ion-list>',
         title: 'Wiederholen',
         subTitle: '',
         scope: $scope,
			
         buttons: [
            { text: 'Abbrechen' }, {
               text: '<b>Ok</b>',
               type: 'button-positive',
                  onTap: function(e) {
						
                      //Ok button wurde gedrückt, übernehme dein Werte
                      $scope.einnahme.wiederholungstag = $scope.data.model;
                      $log.info('Gesetzte Werte: ', $scope.data.model); 
                      
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         $log.info('Tapped!', res);
      });    
   };
///Pupup ende


});


