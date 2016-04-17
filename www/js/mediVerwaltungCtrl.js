<<<<<<< HEAD
=======
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
    }).then(function(modal) {
        $scope.medikament = modal;
                                                });
            
    // Triggered in the medimedikament_neu modal to close it
    $scope.save_medi = function() {
        $scope.medikament.hide();
    };

    $scope.delete_medi = function() {
        $scope.medikament.hide();
    };
            
    // Open the medimedikament_neu modal
    $scope.open_medikament_new = function() {
        $scope.medikament.bez = "";
        $scope.medikament.dosier = "";
        $scope.medikament.pck_gr = "";
        $scope.medikament.snooze = "";
        $scope.medikament.beschreibung = "";
        $scope.medikament.show();
    };

    // Open the medimedikament_neu modal
    $scope.open_medikament_edit = function(medikament) {
        $scope.medikament.bez = medikament.bez;
        $scope.medikament.dosier = medikament.dosier;
        $scope.medikament.pck_gr = medikament.pck_gr;
        $scope.medikament.snooze = medikament.snooze;
        $scope.medikament.beschreibung = medikament.beschreibung;
        $scope.medikament.show();
    };
});
>>>>>>> 50c006ca47a3d842d908d0bd6e55790c9e9a563c
