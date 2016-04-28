angular.module('starter.userprofilCtrl', [])


.controller('UserprofilCtrl', function($scope, $log, $ionicModal, $cordovaDialogs){
    
	
	$scope.showDialogConfirm = function(message, title, button1, button2) {		
		$cordovaDialogs.confirm(message, title, [button1,button2])
			.then(function(buttonIndex) {
			  // no button = 0, 'OK' = 1, 'Cancel' = 2
			  var btnIndex = buttonIndex;
			  console.log(btnIndex);
			});
	};
	
	//Returns Object with user input as result.input1 and button index as result.buttonIndex
	$scope.showDialogPrompt= function(message, title, button1, button2, defaulttext) {		
		$cordovaDialogs.prompt(message, title, [button1, button2], defaulttext)
			.then(function(result) {
			var input = result.input1;
			var btnIndex = result.buttonIndex;
			  
			if (result.buttonIndex == 1) {
				// clicked OK
				console.log('Neue Eingabe: ' + result.input1);
				// Zurückspeichern der neuen Eingabe
			} else {
				 // clicked Cancel
				 console.log('Cancel');
				}
			});
	};
	
	
    $scope.allPersoenlicheDaten = [
        {
            nachname: "Schmidt",
            vorname: "Hans",
            strasse: "Hauptstraße 3", 
	        plz: "80331",
	        ort: "München" 
        }   
        	  
     ];
     
     $scope.allAllergie = [
        {name: "Allergie1"},
        {name: "Allergie2"},
        {name: "Allergie3"}
     ];
     
	 $scope.test = "hallo";
     
     $scope.allBlutgruppe = [
		{name: "AB"}
	];
     
     
     $scope.allUnvertraeglichkeit = [
         {name: "Unvertraeglichkeit1"},
         {name: "Unvertraeglichkeit2"},
		 {name: "Unvertraeglichkeit3"},
		 {name: "Unvertraeglichkeit4"}
     ];
     
     
     $scope.allErkrankung = [
         {name: "Erkrankung1"},
         {name: "Erkrankung2"},
		 {name: "Erkrankung3"},
		 {name: "Erkrankung4"},
		 {name: "Erkrankung5"}
     ];
	 
	 
	
	$scope.userprofil_edit = function() {
		$log.debug('userprofil_edit');
		//$log.debug('allErkrankung.name: ' + $scope.allErkrankung.name)
		//$log.debug('allPersoenlicheDaten.nachname: ' + $scope.allPersoenlicheDaten.nachname);
	};
	
	$scope.userprofil_save = function() {
		$log.debug('userprofil_save');
	};
	
	$scope.userprofil_cancel = function() { 
		$log.debug('userprofil_cancel');
	};
	
	
	
});

    
    
