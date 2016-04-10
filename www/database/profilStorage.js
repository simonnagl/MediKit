angular.module('starter.profilStorage', [])

.factory('ProfilStorage', ['$window', '$log', '_', 'WebStorageMain', 
    function($window, $log, _, WebStorageMain) {
    
	var profilStorage = {
        loadProfil : loadProfil,
        saveProfil : saveProfil,
	}
    
    function loadProfil(Profil) {
        $log.debug("WebStorage: loadProfil -> START");
        var value = WebStorageMain.loadObject("profil");  
        
        if (value != null) {
            $log.debug("WebStorage: loadProfil -> END WITH SUCCESS");
            return value;
        } else {
            $log.debug("WebStorage: loadProfil -> END WITH INFO -> Profil not found");
            return null;
        }

    }
    ;

    
    /** 
     * Gibt TRUE zurück wenn alles ok ist
     * Gibt False zurück wenn der Key bereits vorhanden ist
     */   
    function saveProfil(Profil) {
        $log.debug("WebStorage: saveProfil -> START");                     
        WebStorageMain.saveObject("profil");
        $log.debug("WebStorage: saveProfil -> END WITH SUCCESS");     
    }
    ;

	return profilStorage;
		
}]);