angular.module('starter.startseiteCtrl', [])

.controller('StartseiteCtrl', function($scope, $ionicModal, $timeout, $log, $location, $ionicPopup, $state, EinnahmeStorage) {
    
    $scope.zukunftEinnahmen = [];    
    $scope.$on("$ionicView.enter", function(){
    $scope.zukunftEinnahmen = EinnahmeStorage.loadAllEinnahme();
    })     
      
   
         
    $scope.seen = 'false';
    $scope.name = 'John';
    $scope.count = "3";

    $log.debug("Ausgabe Einnahmen " + $scope.zukunftEinnahmen);
        $log.debug("Ausgabe test " + $scope.test);
    
    $scope.navigate = function(path) {
        $location.path(path);
    }
    if($scope.seen =='false'){
    $scope.$on("$ionicView.loaded", function(){
        $scope.showPopup();
        $scope.seen ='true';
        });}
        
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
            { text: 'Abbrechen',
               }, {
               text: '<b>Historie anzeigen</b>',
               type: 'button-positive',
                  onTap: function(e) {
                       
						 $scope.navigate('/app/historie/true')      
                      
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
