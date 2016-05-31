angular.module('starter.mediVerwaltungCtrl', [])

.controller('mediVerwaltungCtrl', function($scope, $ionicModal, $cordovaDialogs, $log, MediStorage) {
    $scope.medis = [];

	$scope.medis = MediStorage.loadAllMedikament();

    defaultMedi = {
		id : "",
        mediname : "",
        packungsgroesse : {
            menge : undefined,
            einheit : "ml"
        },
        snoozemin : 15,
        medibeschreibung: "",
    }

    // Create the mediVerwaltung_edit modal that we will use later
    $ionicModal.fromTemplateUrl('templates/mediVerwaltung_edit.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.medikament = modal;
    });
    
    $scope.validateMedi = function(medi) {
        for(prop in medi) {
            switch(prop) {
                case "id":
                    break;
                case "mediname":
                    if(medi[prop] == undefined || medi[prop] == "") {
                        $cordovaDialogs.alert('Medikamentenname ist leer.', 'Bitte eintragen.', 'OK')
                        .then(function() {
                        return false;
                    });
                    }
                    break;
                case "packungsgroesse":
                    if(!$scope.validateEinheit(medi.packungsgroesse)) {
                        return false;
                    };
                    break;
                case "snoozemin":
                    break;
                case "medibeschreibung":
                    break;
                default:
                    $log.debug('BUG: Property ' + prop + ': ' + medi[prop] + 'in Medikament.');
                    break;
            }
        }
        return true;
    };
    
    $scope.validateEinheit = function(groesse) {
        for(prop in groesse) {
            switch(prop) {
                case "menge":
                    if(groesse[prop] == undefined || groesse[prop] == "") {
                        $cordovaDialogs.alert('Menge ist leer.', 'Bitte eintragen.', 'OK')
                        .then(function() {
                        return false;
                    });
                };
                if(groesse[prop] < '0') {
                    $cordovaDialogs.alert('Menge ist negativ.', 'Bitte korrigieren.', 'OK')
                    .then(function() {
                        return false;
                    });
                };
                break;
                case "einheit":
                    break;
                default:
                    $log.debug('BUG: Property ' + prop + ': ' + medi[prop] + 'in Menge.');
                    break;
            }
        }
        return true;
    };
            
    // Triggered in the medimedikament_neu modal to close it
    $scope.saveMedi = function() {
        if(!$scope.validateMedi($scope.medi)) {
            return false;
        }
        if($scope.isNewMedi) {
            MediStorage.saveMedikament($scope.medi);
        } else {
            MediStorage.updateMedikament($scope.medi);
        }
        $scope.medikament.hide();
        $scope.isNewMedi = undefined;
        $scope.medis = MediStorage.loadAllMedikament();
    };

    $scope.deleteMedi = function() {
        $scope.medikament.hide();
        MediStorage.deleteMedikament($scope.medi);
        $scope.isNewMedi = undefined;
        $scope.medis = MediStorage.loadAllMedikament();
        
    };
            
    // Open the medimedikament_neu modal
    $scope.openNewMedi = function() {
        $scope.isNewMedi = true;
        $scope.medi = angular.copy(defaultMedi);
		$scope.medi.id = Date.now();
        $scope.medikament.show();
    };

    // Open the medimedikament_neu modal
    $scope.openEditMedi = function(medi) {
        $scope.isNewMedi = false;
        $scope.medi = medi;
        $scope.medikament.show();
    };
});
