angular.module('starter.historieCtrl', ['ionic'])

.controller('HistorieCtrl', function($scope, $ionicModal, $timeout, $log) {

    //Controller historieCtrl
    
    $scope.medicine = [{id:"123", mediname:"Aspirin", medidosis:"200mg", einnahmemenge:"2Tabletten", einnahmezeitsoll:"1.4.2016 18:00", einnahmezeitist:""},
                        {id:"234", mediname:"Paracetamol", medidosis:"100mg", einnahmemenge:"1Tablette", einnahmezeitsoll:"2.4.2016 12:00", einnahmezeitist:"2.4.2016 12:05"}];
  //  $ionicModal.fromTemplateUrl('templates/datemodal.html', 
  //      function(modal) {
  //          $scope.datemodal = modal;
  //      },
  //      {
        // Use our scope for the scope of the modal to keep it simple
  //      scope: $scope, 
        // The animation we want to use for the modal entrance
  //      animation: 'slide-in-up'
  //      }
  //  );
    
  //  $scope.opendateModal = function() {
  //    $scope.datemodal.show();
  //  };
    
  //  $scope.closedateModal = function(modal) {
  //    $scope.datemodal.hide();
  //    $scope.datepicker = modal;
  //  };
  
  
  
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