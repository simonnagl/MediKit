angular.module('starter.startseiteCtrl', [])

.controller('StartseiteCtrl', function( $cordovaLocalNotification, 
                                        $ionicPlatform,
                                        $scope, 
                                        $ionicModal, 
                                        $timeout, 
                                        $log, 
                                        $location, 
                                        $ionicPopup, 
                                        $state, 
                                        EinnahmeStorage,
                                        HistorieStorage,
                                        ProfilStorage) {
    
    $scope.zukunftEinnahmen = [];
    $scope.historieEinnahmen = [];
    $scope.user =[];    
    $scope.count = 0;
    
    $scope.$on("$ionicView.enter", function(){
        $scope.zukunftEinnahmen = EinnahmeStorage.loadAllEinnahme();
        $scope.historieEinnahmen = HistorieStorage.loadAll();
        $scope.historieEinnahmen.forEach(function(einnahme) {
            if (einnahme.einnahmezeitist == null) {
                $scope.count++;
            }
        })
        $scope.user = ProfilStorage.loadProfil();
    })
    

    $scope.seen = 'false';
    
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
         title: 'Erinnerung',
         subTitle: '',
         scope: $scope,
			
         buttons: [
            { text: 'Abbrechen',
               }, {
               text: '<b>Historie anzeigen</b>',
               type: 'button-positive button-dark',
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
