angular.module('starter.mediVerwaltungCtrl', [])

.controller('mediVerwaltungCtrl', function($scope) {
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
});
