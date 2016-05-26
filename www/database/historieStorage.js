angular.module('starter.historieStorage', [])

.factory('HistorieStorage', ['$window', '$log', 'WebStorageMain', 
    function($window, $log, WebStorageMain) {
    
	var profilStorage = {
        addTermin : addTermin,
		updateHistorie : updateHistorie,
        loadAll : loadAll
	}


    
    /** 
     * Gibt TRUE zurück wenn alles ok ist
     * Gibt False zurück wenn der Key bereits vorhanden ist
     */   
    function addTermin(termin) {
       // $log.debug("WebStorage: saveProfil -> START");
        var historie =  WebStorageMain.loadObject('Historie')
        if (historie == null) {
            historie = [];
        }           
        historie.push(termin);        
        WebStorageMain.saveObject('Historie', historie);
       // $log.debug("WebStorage: saveProfil -> END WITH SUCCESS");     
    }
    ;
	
	function updateHistorie(historie) {
		WebStorageMain.saveObject('Historie', historie);
	}
    
    function loadAll() {
        var historie = WebStorageMain.loadObject('Historie');
        return historie;
    }

	return profilStorage;
		
}]);