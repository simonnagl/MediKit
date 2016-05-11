angular.module('starter.webStorageMain', [])

.factory('WebStorageMain', ['$window', '$log', function($window, $log) {
    
	var webStorage = {
        loadObject : loadObject,
        loadAllObject : loadAllObject,
        saveObject : saveObject,
        deleteObject : deleteObject,
        isKeyAvailable : isKeyAvailable
	}
    
    function loadObject(key) {
        try {
            $log.debug("WebStorage: LoadObject -> START");
            var value = JSON.parse($window.localStorage.getItem(key));  
            $log.debug("WebStorage: LoadObject : ObjectKey -> " + JSON.stringify(key) + " ObjectValue -> " + JSON.stringify(value));
            $log.debug("WebStorage: LoadObject -> END WITH SUCCESS");
            return value;
            
        } catch (e) {
            $log.debug("WebStorage: LoadObject -> END WITH ERROR ->" + JSON.stringify(e));
        }
    }
    ;
    
    function loadAllObject(prefix) {
        try {
            $log.debug("WebStorage: loadAllObject -> START");
            var allObject = []
            var storageLength = $window.localStorage.length
            for(var i = 0; i < storageLength; i++){
                var key = $window.localStorage.key(i);
                if (key.indexOf(prefix) == 0) {
                    var object = JSON.parse($window.localStorage.getItem(key));
                    allObject.push(object);
                }
            }
            
            $log.debug("WebStorage: loadAllObject : AllObject -> " + allObject);
            $log.debug("WebStorage: loadAllObject -> END WITH SUCCESS");
            return allObject;
            
        } catch (e) {
            $log.debug("WebStorage: loadAllObject -> END WITH ERROR ->" + JSON.stringify(e));
        }  
    }
    ;
    
    function saveObject(key, value) {
        try {
            $log.debug("WebStorage: SaveObject -> START");  
            $window.localStorage.setItem(key, JSON.stringify(value));
            $log.debug("WebStorage: SaveObject : ObjectKey -> " + JSON.stringify(key) + " ObjectValue -> " + JSON.stringify(value));
            $log.debug("WebStorage: SaveObject -> END WITH SUCCESS");
            
        } catch (e) {
            $log.debug("WebStorage: SaveObject -> END WITH ERROR ->" + JSON.stringify(e));
        }
    }
    ;
    
    function deleteObject(key) {
        try {
            $log.debug("WebStorage: DeleteObject -> START");  
            $window.localStorage.removeItem(key);
            $log.debug("WebStorage: DeleteObject : ObjectKey -> " + JSON.stringify(key));
            $log.debug("WebStorage: DeleteObject -> END WITH SUCCESS");
            
        } catch (e) {
            $log.debug("WebStorage: DeleteObject -> END WITH ERROR ->" + JSON.stringify(e));
        }
    }
    ;
    
    // Gibt true zurück wenn der Übergebene Key noch nicht existiert
    function isKeyAvailable(key) {
        try {
            $log.debug("WebStorage: isKeyAvailable -> START");
            var value = $window.localStorage.getItem(key);  
            $log.debug("WebStorage: isKeyAvailable : ObjectKey -> " + JSON.stringify(key));
                      
            if(value == null) {
                $log.debug("WebStorage: isKeyAvailable -> END WITH SUCCESS -> Key available");
                return true;
                
            } else {
                $log.debug("WebStorage: isKeyAvailable -> END WITH SUCCESS -> Key not available");
                return false;
            }
            
        } catch (e) {
            $log.debug("WebStorage: isKeyAvailable -> END WITH ERROR ->" + JSON.stringify(e));
        }
    }

	return webStorage;
		
}]);