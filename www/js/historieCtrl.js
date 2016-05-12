angular.module('starter.historieCtrl', ['ionic'])

.controller('HistorieCtrl', function($scope, $stateParams, $ionicModal, $timeout, $log) {

    //Controller historieCtrl
    
    $scope.medicine = [{id:"123", mediname:"Aspirin", medidosis:"200mg", einnahmemenge:"2Tabletten", einnahmezeitsoll:new Date(2016,04,1, 12,00,00), einnahmezeitist:""},
    {id:"1234", mediname:"Aspirin", medidosis:"200mg", einnahmemenge:"2Tabletten", einnahmezeitsoll:new Date(2016,03,01,18,00,00), einnahmezeitist:"TEst"},
    {id:"12345", mediname:"Aspirin", medidosis:"200mg", einnahmemenge:"2Tabletten", einnahmezeitsoll:new Date(2016,03,23,18,00,00), einnahmezeitist:""},
    {id:"234", mediname:"Paracetamol", medidosis:"100mg", einnahmemenge:"1Tablette", einnahmezeitsoll:new Date(2016,03,12,18,00,00), einnahmezeitist:"2.4.2016 12:05"}];
  

$scope.params = $stateParams.isNichtEingenommen;
if($scope.params == "true")
{
    $scope.nichtGenommen = true;

}else{
    $scope.nichtGenommen = false;
}

$scope.updateToggle = function() {
    if($scope.nichtGenommen == false){
        $scope.nichtGenommen = true;
    }else{
        $scope.nichtGenommen = false;
    }
}

$scope.checkFilter = function(x) {
    if((x.einnahmezeitsoll >= $scope.onezoneDatepickervon.date) && (x.einnahmezeitsoll <= $scope.onezoneDatepickerbis.date)){
        if($scope.nichtGenommen == true)
        {
            if(x.einnahmezeitist == ''){
                return true;
            }else{
                return false;
            }
        }else{
            return true;
        }
        
    }else{
        return false;
    }
    
}


      
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

       $scope.showFilter = function(x) {
           retur(true);
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
        

    }
};
    
});
