angular.module('starter.mediVerwaltungCtrl', [])

.controller('mediVerwaltungCtrl', function($scope, $ionicModal) {
    $scope.medikamente = [
        {
            bez : "Penicilin",
            dosier : "200 mg",
            pck_gr : 20
        },
        {
            bez : "Aspirin",
            dosier : "200 mg",
            pck_gr : 50
        },
        {
            bez : "Citerizin",
            dosier : "10 mg",
            pck_gr : 50
        }
    ];
            
    // Create the mediVerwaltung_edit modal that we will use later
    $ionicModal.fromTemplateUrl('templates/mediVerwaltung_edit.html', {
        scope: $scope
    }).then(function(medikament) {
        $scope.medikament = medikament;
                                                });
            
    // Triggered in the medimedikament_neu modal to close it
    $scope.close_medimedikament_neu = function() {
        $scope.medikament.hide();
    };
            
    // Open the medimedikament_neu modal
    $scope.open_medikament_edit = function() {
        $scope.medikament.show();
    };
});
