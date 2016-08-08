'use strict';

define([
    'BaseClass'
  , 'models/event'
], function (BaseClass, Event) {
    
    var Schedule = BaseClass.extend({
        ee_id: 0,
        ee_name: "",
        events: [],
        total_time: 0,
        arrears_time: 0,
               
        init: function (ee_id, ee_name) {
            this.ee_id = ee_id,
            this.ee_name = ee_name;
            this.events = new Array;
        },
        
        add: function (event) {
            this.events.push(event);
        },
        
        cal_total_time: function () {
            var total_minutes = 0;
            var original_date = "2016/01/01 "
            
            for (var i = 0; i < this.events.length; i++) {
                var event = this.events[i];
                
                for (var j = 0; j < event.event_catalogs.length; j++) {
                    var event_catalog = event.event_catalogs[j];
                    // ignore the public holiday.
                    if (event_catalog.event_type_id == 2) {
                        continue;
                    }
                    
                    var total_time = original_date + event_catalog.total_time;                    
                    var tTime = new Date(total_time);
                    var hour = tTime.getHours();
                    var minutes = tTime.getMinutes();
                    
                    total_minutes += hour * 60 + minutes;
                }
            }
            
            var total_hour = parseInt (total_minutes / 60);
            total_minutes -= total_hour * 60;
            total_minutes = total_minutes / 60.0;
            this.total_time = total_hour + total_minutes;
            // if (this.total_time > 0) {
            //     this.arrears_time = this.total_time - 40; // 40 hours working one week.
            // }            
        }
        
    });

    Schedule.resetStartEndDate = function($scope, date) {
        var oneDayMillisec = 1000 * 3600 * 24;
        var is_start_with_monday = true;
        
        var day = date.getDay();
        var currentTime = date.getTime();        
        var weekStartTime;
        var dayToMonday = day;
        
        if(is_start_with_monday) {            
            dayToMonday = day - 1;
            if(day == 0) {
               dayToMonday += 7;
            }
        }
        
        weekStartTime = currentTime - dayToMonday * oneDayMillisec; // week start with Monday       
        $scope.start_date.setTime(weekStartTime);                    
        $scope.end_date.setTime(weekStartTime + 6 * oneDayMillisec);
        
        $scope.start_date.setHours(0, 0, 0);
        $scope.end_date.setHours(23, 59, 59);
        
        if($scope.weekdays != null) {
            $scope.weekdays.length = 0; // clear the array        
            for(var i = 0; i < 7; i++) {
                var iTime = weekStartTime + i * oneDayMillisec;
                var iDate = new Date();
                iDate.setTime(iTime);
                $scope.weekdays.push(iDate);
            }
        }            
    };
    
    return Schedule;
});
