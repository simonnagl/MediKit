angular.module('starter.einnahmeStorage', [])

.factory('EinnahmeStorage', ['$ionicPlatform', '$cordovaLocalNotification', '$window', '$log', 'WebStorageMain', 
    function($ionicPlatform, $cordovaLocalNotification, $window, $log, WebStorageMain) {
    
	var einnahmeStorage = {
        loadAllEinnahme : loadAllEinnahme,
        loadEinnahme : loadEinnahme,
        updateEinnahme : updateEinnahme,
        saveEinnahme : saveEinnahme,
        deleteEinnahme : deleteEinnahme
	}
    
    // Gibt ein Array mit allen Einnahmeenobjekten zurück
    function loadAllEinnahme() {
        $log.debug("WebStorage: loadAllEinnahme -> START");
        var allEinnahme = []; 
        allEinnahme = WebStorageMain.loadAllObject('e-e-');
        $log.debug("WebStorage: loadAllEinnahme -> END WITH SUCCESS");
        return allEinnahme;
    }
    
    function loadEinnahme(einnahme) {
        $log.debug("WebStorage: loadEinnahme -> START");
        var value = WebStorageMain.loadObject("e-" + einnahme.id);  
        
        if (value != null) {
            $log.debug("WebStorage: loadEinnahme -> END WITH SUCCESS");
            return value;
        } else {
            $log.debug("WebStorage: loadEinnahme -> END WITH INFO -> Einnahme not found");
            return null;
        }

    }
    ;
    
    //Wird aufgerufen wenn ein Einnahme bearbeitet wurde
    function updateEinnahme(einnahme) {
        $log.debug("WebStorage: updateEinnahme -> START"); 
        WebStorageMain.saveObject("e-" + einnahme.id, einnahme);
        $log.debug("WebStorage: updateEinnahme -> END WITH SUCCESS");  
    }
    ;
    
    /** 
     * Gibt TRUE zurück wenn alles ok ist
     * Gibt False zurück wenn der Key bereits vorhanden ist
     */   
    function saveEinnahme(einnahme) {
        $log.debug("WebStorage: saveEinnahme -> START");          
        WebStorageMain.saveObject("e-" + einnahme.id, einnahme);
        $log.debug("WebStorage: saveEinnahme -> END WITH SUCCESS");      
                      
        $ionicPlatform.ready(function () {
            var now = new Date().getTime();
            var _10SecondsFromNow = new Date(now + 10 * 1000);
            var tmpAllEinnahme = einnahme.wanneinnahmen;
            
            for (var i = 0; i < tmpAllEinnahme.length; i++) {
                // Hier ist noch keine implementierung wegen möglich, da
                // ein Bug im Medieinnahmenverwaltung
            }
            
            $cordovaLocalNotification.schedule({
                id: einnahme.id,
                title: 'Medikit',
                text: 'Medikament: ' + einnahme.mediname + ' - '
                        + einnahme.einnahmemenge.menge + ''
                        + einnahme.einnahmemenge.einheit + ' einnehmen',
                at: _10SecondsFromNow
            }).then(function (result) {
                $log.debug('Notification 2 triggered');
            });
    });
    }
    ;
    
    function deleteEinnahme(id) {
        $log.debug("WebStorage: deleteEinnahme -> START");  
        WebStorageMain.deleteObject("e-" + id);
        $log.debug("WebStorage: deleteEinnahme -> END WITH SUCCESS");
    }
    ;

	return einnahmeStorage;
		
}]);