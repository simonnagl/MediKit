angular.module('starter.mediVerwaltungCtrl', [])

.controller('mediVerwaltungCtrl', function($scope) {
  
    $scope.mediData = [
        { 
            name : "Penicilin",
            dose : "200mg",
            pack_gr : 20

        },
        {
            name : "Aspirin",
            dose : "200mg",
            pack_gr : 50
        } 
  ];


  // Eingabe mit Popup
  // Layout keine Präferenz

  $scope.edit_medi = function(mediName) {
      $scope.mediData.push( mediName );
  }
});
