angular.module('starter.startseiteCtrl', [])

.controller('StartseiteCtrl', function($scope, $ionicModal, $timeout) {

    $scope.name = 'John';
    $scope.count = "3";
    $scope.einnahme = [
        {medikament:'Paracetamol',uhrzeit:'14:00'},
        {medikament:'Antibiotika',uhrzeit:'16:00'},
        {medikament:'Ibuprofen',uhrzeit:'17:30'}
    ];
});