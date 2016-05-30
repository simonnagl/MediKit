angular.module('starter.navigationCtrl', ['ionic'])

.controller('NavigationCtrl', function($scope, $ionicLoading, $compile, $timeout, $log, ProfilStorage) {
      //für die Coordinaten der Kontakte
		$scope.contactCoords = [];
		$scope.contactData = [];
	  function initialize() {		
		
        var myLatlng = new google.maps.LatLng(48.7665351,11.4257541);
        
        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);
        
        //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: 'Uluru (Ayers Rock)'
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
      }
      google.maps.event.addDomListener(window, 'load', initialize);
      
      $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
		
      };
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
      };
      //$scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
	  $scope.map = {center: {latitude: 48.7665351, longitude: 11.4257541 }, zoom: 14 };
      //$scope.options = {scrollwheel: false};
///Marker
	$scope.marker = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };

///Marker2
	$scope.marker2 = {
      id: 0,
      coords: {
        latitude: 40.1451,
        longitude: -99.6680
      },
      options: { draggable: true },
      events: {
        dragend: function (marker, eventName, args) {
          $log.log('marker dragend');
          var lat = marker.getPosition().lat();
          var lon = marker.getPosition().lng();
          $log.log(lat);
          $log.log(lon);

          $scope.marker.options = {
            draggable: true,
            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
            labelAnchor: "100 0",
            labelClass: "marker-labels"
          };
        }
      }
    };
///Markers

//Adresse umwandeln	von den Kontakten //textfield z.B. "85049+Ingolstadt+Oberer Graben 1"
	  $scope.convertToCoords = function(art, nachname, address) {
			$scope.contactCoords = []; //leeren
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { "address": address }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
					 var location = results[0].geometry.location;
					//$scope.myMap.panTo(location);
					var lat = location.lat();
					var lng = location.lng();
					$log.info('Test Umwandlung: ' + lat + ',' + lng);
				    $scope.contactCoords.push({ kontaktArt: art, nachname: nachname ,coordLat: lat, coordLng: lng });
				}
			});
		
	  }
	  ;
	  
///Hinterlegte Kontaktadressen Laden und zum Convertieren übergeben
	$scope.getContactAdressForMap = function() {

		$scope.contactData = ProfilStorage.loadProfil("kontakt");
		if ($scope.contactData.length > 0){
			var convertedCoord = "";
			for (var i=0; i < $scope.contactData.length; i++){
				$scope.convertToCoords($scope.contactData[i].kontaktArt, $scope.contactData[i].nachname ,$scope.contactData[i].plz + '+' + $scope.contactData[i].ort + '+' + $scope.contactData[i].strasse);					
			}
		}
		
	}
	;	
	$scope.getContactAdressForMap();
///getSearchAdresse
	$scope.getSearchAddress = function(address){
		var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { "address": address }, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
					 var location = results[0].geometry.location;
						$scope.loading = $ionicLoading.show({
						content: 'Getting current location...',
						showBackdrop: false
						});
					
					var lat = location.lat();
					var lon = location.lng();
					$log.info('Test Umwandlung: ' + lat + ',' + lon);
					
							  $scope.map = {center: {latitude: lat, longitude: lon }, zoom: 16};
		  
					//marker anpassen
					$scope.marker.coords.latitude = lat;
					$scope.marker.coords.longitude = lon;
		  
					//$scope.loading.hide();			  
					$scope.getContactAdressForMap();
					$ionicLoading.hide();
				}
			})
	}
	;
///updateNavigation
	$scope.updateNavigation = function(selected) {
		$scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
		  });
		  var coords = JSON.parse(selected);
		  var lat = coords.coordLat;
		  var lon = coords.coordLng;
		  $scope.map = {center: {latitude: lat, longitude: lon }, zoom: 16};
		  
		  //marker anpassen
		  $scope.marker.coords.latitude = lat;
		  $scope.marker.coords.longitude = lon;
		  
		  //$scope.loading.hide();			  
		$ionicLoading.hide();
		
	}
///getMyPosition
	  $scope.getMyPosition = function() {
		  if(!$scope.map) {
			  return;
		  }
		  
		navigator.geolocation.getCurrentPosition(function(pos) {
          //$scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		  $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
		  });
		  var lat = pos.coords.latitude;
		  var lon = pos.coords.longitude;
		  $scope.map = {center: {latitude: lat, longitude: lon }, zoom: 16};
		  
		  //marker anpassen
		  $scope.marker.coords.latitude = lat;
		  $scope.marker.coords.longitude = lon;
		  
		  //$scope.loading.hide();			  
		$ionicLoading.hide();
		
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
		
    }
});
		 
