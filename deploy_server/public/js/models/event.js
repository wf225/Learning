'use strict';

define([
    'BaseClass'
], function (BaseClass) {
    
    var Event = BaseClass.extend({
        ee_id: -1,
        date: "",
        event_catalogs: [],
               
        init: function (ee_id, date) {
            this.ee_id = ee_id;
            this.date = date;
            this.event_catalogs = new Array;
        },
        
        add: function (event_catalog) {
            this.event_catalogs.push(event);
        },
        
        remove: function (event_catalog) {
            array_remove(this.event_catalogs, event_catalog);
        }
        
    });
    
     // Find and remove item from an array
    function array_remove(array, obj) {
        var i = array.indexOf(obj);
        if(i != -1) {
            array.splice(i, 1);
        }
    };
  
    return Event;
});