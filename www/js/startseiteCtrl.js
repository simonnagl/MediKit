angular.module('starter.startseiteCtrl', [])

.controller('StartseiteCtrl', function($scope, $ionicModal, $timeout, $log, $location, $ionicPopup) {

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
         //template: '<input type = "text" ng-model = "data.model">',
         //könnte man in eine templateUrl umändern und den viewcode extra auslagern.
         templateUrl:'templates/startseitepopup.html', 
         //template: '    <ion-list><ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox><ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox><ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox><ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox><ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox><ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox><ion-checkbox ng-model="isChecked">Checkbox Label</ion-checkbox></ion-list>',
         title: 'Erinerung',
         subTitle: '',
         scope: $scope,
			
         buttons: [
            { text: 'Abbrechen' }, {
               text: '<b>Ok</b>',
               type: 'button-positive'/*,
                  onTap: function(e) {
						
                      //Ok button wurde gedrückt, übernehme dein Werte
                      $scope.einnahme.repeat = $scope.data.model;
                      console.log('Gesetzte Werte: ', $scope.data.model); 
                      
                  }*/
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });    
   };
   
///Pupup ende

////Liste im Popup

            $scope.toggleItem = function(item){
                item.checked = !item.checked;
            };
            $scope.itemButtons = [
                {
                text: 'Edit',
                type: 'button-assertive',
                onTap: function(item) {
                    alert('Edit Item: ' + item.id);
                }
                }/*,
                {
                text: 'Share',
                type: 'button-calm',
                onTap: function(item) {
                    alert('Share Item: ' + item.id);
                }
                }*/
            ];
            
            $scope.onItemDelete = function(item) {
                $scope.items.splice($scope.items.indexOf(item), 1);
            };
            
            $scope.items = [
                { id: 1 },
                { id: 2 },
                {id: 3}
            ];
            //// Infos https://codepen.io/ionic/pen/hqcju
            //// http://codepen.io/calendee/pen/Enmaw
////Ende Liste im Popup
});