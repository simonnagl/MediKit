angular.module('starter.mediVerwaltungCtrl', [])

.controller('mediVerwaltungCtrl', function($scope, $ionicModal, $log) {
    $scope.medis = [
        {
            mediname : "Aspirin",
            packungsgroesse : {
                menge : 150,
                einheit : "ml"
            },
            snoozemin : 50,
        },
        {
            mediname : "Citerizin",
            packungsgroesse : {
                menge : 150,
                einheit : "ml"
            },
            snoozemin : 65,
        },
        {
            mediname : "Nikotin",
            packungsgroesse : {
                menge : 30,
                einheit : "Tabletten"
            },
            snoozemin : 65,
        }
    ];

    default_medi = {
        mediname : "",
        packungsgroesse : {
            menge : undefined,
            einheit : "ml"
        },
        snoozemin : 15,
    }

    // Create the mediVerwaltung_edit modal that we will use later
    $ionicModal.fromTemplateUrl('templates/mediVerwaltung_edit.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.medikament = modal;
                                                });
            
    // Triggered in the medimedikament_neu modal to close it
    $scope.saveMedi = function() {
        $scope.medis.push($scope.medi);
        $scope.medikament.hide();
    };

    $scope.deleteMedi = function() {
        index = $scope.medis.indexOf($scope.medi);
        $scope.medis.splice(index, 1);
        $scope.medikament.hide();
    };
            
    // Open the medimedikament_neu modal
    $scope.openNewMedi = function() {
        $scope.medi = angular.copy(default_medi);
        $scope.medikament.show();
    };

    // Open the medimedikament_neu modal
    $scope.openEditMedi = function(medi) {
        $scope.medi = medi;
        $scope.medikament.show();
    };
});
