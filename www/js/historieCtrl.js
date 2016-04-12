angular.module('starter.historieCtrl', ['jkuri.datepicker'])

.controller('HistorieCtrl', function($scope, $ionicModal, $timeout) {

    //Controller historieCtrl
    $ionicModal.fromTemplateUrl('templates/datemodal.html', 
        function(modal) {
            $scope.datemodal = modal;
        },
        {
        // Use our scope for the scope of the modal to keep it simple
        scope: $scope, 
        // The animation we want to use for the modal entrance
        animation: 'slide-in-up'
        }
    );
    
    $scope.opendateModal = function() {
      $scope.datemodal.show();
    };
    
    $scope.closedateModal = function(modal) {
      $scope.datemodal.hide();
      $scope.datepicker = modal;
    };
    
});