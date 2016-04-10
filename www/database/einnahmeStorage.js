angular.module('starter.einnahmeStorage', [])

.factory('EinnahmeStorage', ['$window', '$log', '_', 'WebStorageMain', 
    function($window, $log, _, WebStorageMain) {
    
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
        allEinnahme = WebStorageMain.loadAllObject('e-');
        $log.debug("WebStorage: loadAllEinnahme -> END WITH SUCCESS");
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

    }
    ;
    
    function deleteEinnahme() {
        $log.debug("WebStorage: deleteEinnahme -> START");  
        WebStorageMain.deleteObject("e-" + einnahme.id);
        $log.debug("WebStorage: deleteEinnahme -> END WITH SUCCESS");
    }
    ;

	return einnahmeStorage;
		
}]);