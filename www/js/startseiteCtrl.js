angular.module('starter.startseiteCtrl', [])

.controller('StartseiteCtrl', function($scope, $ionicModal, $timeout, $log, $location, $ionicPopup, $state) {

    $scope.name = 'John';
    $scope.count = "3";
    $scope.einnahme = [
        {medikament:'Paracetamol',uhrzeit:'14:00'},
        {medikament:'Antibiotika',uhrzeit:'16:00'},
        {medikament:'Ibuprofen',uhrzeit:'17:30'}
    ];

    $scope.navigate = function(path) {
        $location.path(path);
    }
    
    ////Pupup

   // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {};
    
      // Custom popup
      var myPopup = $ionicPopup.show({
         templateUrl:'templates/startseitepopup.html', 
         title: 'Erinerung',
         subTitle: '',
         scope: $scope,
			
         buttons: [
            { text: 'Abbrechen' }, {
               text: '<b>Historie anzeigen</b>',
               type: 'button-positive',
                  onTap: function(e) {
                       
						 $scope.navigate('/app/historie')       
                      
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   };
   
///Pupup ende

////Liste im Popup

    $scope.nichteingenommen = [
        {medikament:'Paracetamol',uhrzeit:'14:00'},
        {medikament:'Antibiotika',uhrzeit:'16:00'},
        {medikament:'Ibuprofen',uhrzeit:'17:30'}
    ];
    
    
    


});