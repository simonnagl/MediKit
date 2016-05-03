angular.module('starter.historieCtrl', ['ionic'])

.controller('HistorieCtrl', function($scope, $ionicModal, $timeout, $log) {

    //Controller historieCtrl
    
    $scope.medicine = [{id:"123", mediname:"Aspirin", medidosis:"200mg", einnahmemenge:"2Tabletten", einnahmezeitsoll:"09.04.2016 18:00", einnahmezeitist:""},
    {id:"1234", mediname:"Aspirin", medidosis:"200mg", einnahmemenge:"2Tabletten", einnahmezeitsoll:"10.04.2016 18:00", einnahmezeitist:""},
    {id:"12345", mediname:"Aspirin", medidosis:"200mg", einnahmemenge:"2Tabletten", einnahmezeitsoll:"11.04.2016 18:00", einnahmezeitist:""},
    {id:"234", mediname:"Paracetamol", medidosis:"100mg", einnahmemenge:"1Tablette", einnahmezeitsoll:"02.04.2016 12:00", einnahmezeitist:"2.4.2016 12:05"}];
  

       
$scope.currentDate = new Date();
$scope.minDate = new Date(2000, 6, 1);
$scope.maxDate = new Date();
 
$scope.onezoneDatepickervon = {
    date: new Date(), // MANDATORY                    
    mondayFirst: false,             
   // months: months,                 
   // daysOfTheWeek: daysOfTheWeek,   
    startDate: new Date(1900, 1, 1),           
    endDate: new Date(),                   
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
   // disableDates: disableDates,
   // disableDaysOfWeek: disableDaysOfWeek,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    //highlights: highlights,
    callback: function(value){
        
        // your code



       
       $scope.von = $scope.onezoneDatepickervon.date.toString().split(" ");
       $scope.vonTag = $scope.von[2];
       $scope.vonMonat = $scope.von[1];
       $scope.vonJahr = $scope.von[3];

       $scope.bis = $scope.onezoneDatepickerbis.date.toString().split(" ");
       $scope.bisTag = $scope.bis[2];
       $scope.vonMonat = $scope.von[1];
       $scope.vonJahr = $scope.von[3];
       
       switch($scope.vonMonat){
           case "Jan":
                $scope.vonMonat = "1";
                break;
           case "Feb":
                $scope.vonMonat = "2";
                break;
           case "Mar":
                $scope.vonMonat = "3";
                break;
           case "Apr":
                $scope.vonMonat = "4";
                break;
           case "May":
                $scope.vonMonat = "5";
                break;
           case "Jun":
                $scope.vonMonat = "6";
                break;
           case "Jul":
                $scope.vonMonat = "7";
                break;
           case "Aug":
                $scope.vonMonat = "8";
                break;
           case "Sep":
                $scope.vonMonat = "9";
                break;
           case "Oct":
                $scope.vonMonat = "10";
                break;
           case "Nov":
                $scope.vonMonat = "11";
                break;
           case "Dec":
                $scope.vonMonat = "12";
                break;
       }
              switch($scope.bisMonat){
           case "Jan":
                $scope.vonMonat = "1";
                break;
           case "Feb":
                $scope.vonMonat = "2";
                break;
           case "Mar":
                $scope.vonMonat = "3";
                break;
           case "Apr":
                $scope.vonMonat = "4";
                break;
           case "May":
                $scope.vonMonat = "5";
                break;
           case "Jun":
                $scope.vonMonat = "6";
                break;
           case "Jul":
                $scope.vonMonat = "7";
                break;
           case "Aug":
                $scope.vonMonat = "8";
                break;
           case "Sep":
                $scope.vonMonat = "9";
                break;
           case "Oct":
                $scope.vonMonat = "10";
                break;
           case "Nov":
                $scope.vonMonat = "11";
                break;
           case "Dec":
                $scope.vonMonat = "12";
                break;
       }
        for(var i = 0; i <$scope.medicine.length; i++)
        {
             $scope.einnahmeJahr = $scope.medicine[i].einnahmezeitsoll.substr(4,4);
             $scope.einnahmeMonat = $scope.medicine[i].einnahmezeitsoll.substr(2,2);
             $scope.einnahmeTag = $scope.medicine[i].einnahmezeitsoll.substr(0,2);
           
            if($scope.einnahmeJahr < $scope.vonJahr || $scope.einnahmeJahr > $scope.bisJahr){
              $scope.medicine.splice(i,1);  
            }else if($scope.einnahmeJahr == $scope.vonJahr){
                if($scope.einnahmeMonat < $scope.vonMonat){
                    if($scope.einnahmeTag < $scope.vonTag){
                        $scope.medicine.splice(i,1);
                    }
                }
            }else if($scope.einnahmeJahr == $scope.bisJahr){
                if($scope.einnameMonat > $scope.bisMonat){
                    if($scope.einnahmeTag > $scope.bisTag){
                        $scope.medicine.splice(i,1);
                    }
                }
            }
        
    }
    }
};

$scope.onezoneDatepickerbis = {
    date: new Date(), // MANDATORY                    
    mondayFirst: false,             
   // months: months,                 
   // daysOfTheWeek: daysOfTheWeek,   
    startDate: new Date(1900, 1, 1),           
    endDate: new Date(),                   
    disablePastDays: false,
    disableSwipe: false,
    disableWeekend: false,
   // disableDates: disableDates,
   // disableDaysOfWeek: disableDaysOfWeek,
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    //highlights: highlights,
    callback: function(value){
        // your code
        $scope.medicine = $scope.medicine1;
                $scope.vonJahr = $scope.onezoneDatepickervon.date;
        $scope.vonJahr = $scope.vonJahr.toString().substr(11,4);
        $scope.vonMonat = $scope.onezoneDatepickervon.date;
        $scope.vonMonat = $scope.vonMonat.toString().substr(4,2);
        $scope.vonTag = $scope.onezoneDatepickervon.date;
        $scope.vonTag = $scope.vonTag.toString().substr(7,2);
        
        $scope.bisJahr = $scope.onezoneDatepickerbis.date;
        $scope.bisJahr = $scope.bisJahr.toString().substr(11,4);
        $scope.bisMonat = $scope.onezoneDatepickerbis.date;
        $scope.bisMonat = $scope.bisMonat.toString().substr(4,2);
        $scope.bisTag = $scope.onezoneDatepickerbis.date;
        $scope.bisTag = $scope.bisTag.toString().substr(7,2);
        
        for(var i = 0; i <$scope.medicine.length; i++)
        {
             $scope.einnahmeJahr = $scope.medicine[i].einnahmezeitsoll.substr(4,4);
             $scope.einnahmeMonat = $scope.medicine[i].einnahmezeitsoll.substr(2,2);
             $scope.einnahmeTag = $scope.medicine[i].einnahmezeitsoll.substr(0,2);
           
            if($scope.einnahmeJahr < $scope.vonJahr || $scope.einnahmeJahr > $scope.bisJahr){
              $scope.medicine.splice(i,1);  
            }else if($scope.einnahmeJahr == $scope.vonJahr){
                if($scope.einnahmeMonat < $scope.vonMonat){
                    if($scope.einnahmeTag < $scope.vonTag){
                        $scope.medicine.splice(i,1);
                    }
                }
            }else if($scope.einnahmeJahr == $scope.bisJahr){
                if($scope.einnameMonat > $scope.bisMonat){
                    if($scope.einnahmeTag > $scope.bisTag){
                        $scope.medicine.splice(i,1);
                    }
                }
            }
        
    }
    }
};
    
});
