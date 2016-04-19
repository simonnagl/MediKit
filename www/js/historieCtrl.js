angular.module('starter.historieCtrl', [])

.controller('HistorieCtrl', function($scope, $ionicModal, $timeout) {

    //Controller historieCtrl
    
    $scope.von = new Date();
    $scope.bis = new Date();
    $scope.medicine = ["Aspirin 200mg 19.4.2016 8:00", "Paracetamol 200mg 19.4.2016 12:00", "Antibiotika 100mg 14:00"];
  //  $ionicModal.fromTemplateUrl('templates/datemodal.html', 
  //      function(modal) {
  //          $scope.datemodal = modal;
  //      },
  //      {
        // Use our scope for the scope of the modal to keep it simple
  //      scope: $scope, 
        // The animation we want to use for the modal entrance
  //      animation: 'slide-in-up'
  //      }
  //  );
    
  //  $scope.opendateModal = function() {
  //    $scope.datemodal.show();
  //  };
    
  //  $scope.closedateModal = function(modal) {
  //    $scope.datemodal.hide();
  //    $scope.datepicker = modal;
  //  };
    
});