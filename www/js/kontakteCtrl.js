angular.module('starter.kontakteCtrl', [])


  
  .controller('KontakteCtrl', function($scope, $log, $ionicModal){
    
    // allKontakt : Alle Kontaktobjekte die gepeichert worden sind
	$scope.allKontakt = [];
    
    // selectedKontakt : Der Kontakt der bearbeitet wird.
    $scope.selectedKontakt = null;
    
    // isNewKontakt : Wird auf True gesetzt, wenn ein neuer Kontakt angelegt wird
    $scope.isNewKontakt = false;
	
	//----------------------------------------
	$scope.allKontaktperson = [
        {nachname: "Meyer", vorname: "Thomas", telefon: "0841123456", email: "kontakt@web.de", art: "Vater"},
		{nachname: "Huber", vorname: "Hans", telefon: "0841789012", email: "kontakt2@web.de", art: "Partner"}
     ];
     
     $scope.allArzt = [
        {nachname: "Dr. Mueller-Wohlfahrt", vorname: "Hans-Wilhelm", strasse: "Dienerstrasse 12", plz: "80331", ort: "Muenchen", telefon: "08945238590", art: "Sportmedizin"},
		{nachname: "Dr. Meyer", vorname: "Sepp", strasse: "Hauptstrasse 12", plz: "10115", ort: "Berlin", telefon: "08945238590", art: "Orthopäde"}
	 ];
	 
	 $scope.allApotheke = [
		{name: "Marien Apotheke", strasse: "Kupferstrasse 1", plz: "85049", ort: "Ingolstadt", telefon: "0841123456"}
	 ];
	 //----------------------------------------
	 
	 // Create the kontakte_neu modal that we will use later // Sergej
	$ionicModal.fromTemplateUrl('templates/kontakte_neu.html', {scope: $scope}).then(function(kontakt) {
        $scope.kontakt = kontakt;
	});
  
	 // Open the kontakte_neu modal // Sergej
     
     /**
        INFO EWALD :::  Codereview     
        $scope.kontakt_neu = function() {   ---> Funktionsname war "kontakt_neu". Allg.: Keine Unterstriche bei Namen benutzen. Die Bezeichnung ist nicht gut gewählt besser ist createNewKontakt. 
        $scope.isNewEin = true;             ---> Diese Variable wird nirgends benutzt nicht im Ctrl und nicht in den Kontaktviews
            $scope.kontakt.show();          
            $log.debug("kontakt_neu");      ---> So ein log sollte beim betreten der View stehen bzw ist nicht aussagekräftig. Siehe Logs in der überarbeiteten Funktion
            //kennzeichne neu bzw. undefined für Delete-Fehler abfangen.    ---> Verstehe ich nicht :D
            $scope.kontakt.index = undefined;   ---> Verstehe nicht wofür man das braucht
            $log.info($scope.kontakt.index);    ---> Das braucht man dann auch nicht
        };
	 */
    
    $scope.createNewKontakt = function() {
        $log.debug("KontakteCtrl: Create new Kontakt -> START");
        $scope.isNewKontakt = true;
        $scope.selectedKontakt = createNewKontaktObject();
        $scope.openKontaktModal();
    }
    ;
    
    $scope.editKontakt = function(kontakt) {
        $log.debug("KontakteCtrl: Edit Kontakt -> START");
        $scope.selectedKontakt = kontakt;
        $scope.openKontaktModal();
    }
    ;
    
    function createNewKontaktObject() {
        $log.debug("KontakteCtrl: Create new empty Konakt Object");
        var emptyKontakt = {
            kontaktArt: "",
            arztArt: "",
            name: "", 
            strasse: "", 
            plz: "", 
            ort: "", 
            telefon: "", 
            email: ""
        };
        
        return emptyKontakt;
    }
    ;
	 
	  // Speichern eines neuen Kontaktes
    $scope.addKontakt = function () {
		 //Abhängig von $scope.kontaktart (switchcase?) sollen andere Datensätze abgelegt werden
		 //.push
		 // Zurücksetzen von $scope.kontaktart
		 $log.debug('addKontakt: ' + $scope.kontaktart);
	 };
	 
	 
/** 
    INFO EWALD :::  Codereview    
 
	// Triggered in the kontakte_neu modal to close it // Sergej
	$scope.closeKontakte_neu = function() {         ---> Diese Bezeichnungsollte auch anders sein da sie eine zu große Abhängig an den Viewnamen hat
                                                         besser ist closeKontaktModal. Das ist auch eindeutiger was die Funktion tut.
		$log.debug('closeKontakte_neu');            ---> Das sollte ausgeben nachdem es erfolgt ist also nach dem hide().
		$scope.kontakt.hide();
    
		//Resetfunktion in billig für alle          ---> Das sollte falls es so notwendig ist in eine extra Funktion ausgelagert werden, da hier sonst 
        $scope.allKontaktperson.nachname = "";           zwei Sachen vermischt werden.
		$scope.allKontaktperson.vorname = "";
		$scope.allKontaktperson.telefon = "";
		$scope.allKontaktperson.email = "";
		$scope.allKontaktperson.art = "";
		
		$scope.allArzt.nachname = "";
		$scope.allArzt.vorname = "";
		$scope.allArzt.strasse = "";
		$scope.allArzt.plz = "";
		$scope.allArzt.ort = "";
		$scope.allArzt.telefon = "";
		
		$scope.allApotheke.name = "";
		$scope.allApotheke.strasse = "";
		$scope.allApotheke.plz = "";
		$scope.allApotheke.ort = ""; 
		$scope.allApotheke.telefon = "";
  };
*/	

    $scope.openKontaktModal = function() {
        $log.debug("KontakteCtrl: Kontakt Modal -> OPEN");
        $scope.kontakt.show();
    }
    ;

    $scope.closeKontaktModal = function () {
        // Als erstes sollte das angelegte bzw bearbeitete Kontaktobjekt validiert werden
        if (validateKontakt("Kontakt")) {
            // Wenn das Objekt valide ist kann allKontakt gespeichert werden
            if($scope.isNewKontakt) {
                // Wenn ein neues Kontaktobjekt erzeugt worden ist muss es zu allKontakt hinzugefügt werden
                $scope.allKontakt.push($scope.selectedKontakt)
            }
            
            // TODO: Hier sollte eine Storage.save() funktion stehen um den Kontakt zu speichern 
            // Nach dem das Kontaktobjekt gespeichert worden ist kann das Modal geschlossen werden und eine log ausgegeben werden
            $log.debug("KontakteCtrl: Create/Edit Kontakt -> END WITH SUCCESS");       
            $scope.kontakt.hide();
            $log.debug("KontakteCtrl: Kontakt Modal -> CLOSE");
        } else {
            // TODO: Wenn das Kontaktobjekt nicht valide ist muss hier was passieren
            $log.debug("KontakteCtrl: Create new Kontakt -> INVALID KONTAKT"); 
        }
    }
    ;
    
    function validateKontakt(kontakt) {
        // TODO: Validierung implementieren
        return true;
    }
    ;
	
	
	// Testbereich für die EDIT, SAVE und CANCEL Funktionen: // Funktionsnamen ändern - siehe Userprofil!
	 var tmpDate = new Date();
	 $scope.newField = {};
     $scope.editing = false;

	
	// Editfunktion in billig nur für allKontaktperson
	$scope.notfallKontakt_edit = function(field) {
		$scope.editing = $scope.allKontaktperson.indexOf(field);
		$scope.newField = angular.copy(field);
    };
    
	// Savefunktion in billig nur für allKontaktperson
	$scope.saveField = function(index) {
		if ($scope.editing !== false) {
			$scope.allKontaktperson[$scope.editing] = $scope.newField;
			$scope.editing = false;
			$log.debug('save done von index ' + $scope.allKontaktperson.indexOf($scope.newField));
			
        } else {
            $log.debug('save failed');
        }
    };
        
	// Cancelfunktion in billig nur für allKontaktperson
	$scope.cancel = function(index) {
			if ($scope.editing !== false) {
			$scope.allKontaktperson[$scope.editing] = $scope.newField;
			$scope.editing = false;
			}       
		};
		
  });