/**
  * ALERTS SYSTEM
  * @author Farhana Basrawala
  * @version 1.0
  *
  * This is a small script that allow you to quickly and simply create alerts.
  *
  * Usage:
  *
  * var alertsSystem = new Alerts("#alerts-display-wrap");
  * alertsSystem.sendAlert('An error has occurred. Please try again', 'error');
  *
  */
(function(){
     Alert = can.Model({// Implement local storage handling
         localStore: function(cb){
             var name = 'alerts-canjs-jquery-widget',
             data = JSON.parse( window.localStorage[name] || (window.localStorage[name] = '[]') ),
             res = cb.call(this, data);
         },
         create: function(attrs){
             var def = new can.Deferred();
             this.localStore(function(alerts){
                 attrs.id = attrs.id || parseInt(100000 *Math.random());
                 alerts.push(attrs);
             });

             def.resolve({id : attrs.id});
             return def
         },
         destroy: function(id){
             var def = new can.Deferred();
             this.localStore(function(alerts){
                 for (var i = 0; i < alerts.length; i++) {
                     if (alerts[i].id === id) {
                         alerts.splice(i, 1);
                         break;
                     }
                 }
                 def.resolve({});
             });
             return def
         }
     },{
         /**
          * Creates a timer for the alert which decides when the alert should expire.
          */
         setTimerToDestroy: function(){
             var alrt = this;
             this.timer = setTimeout(function(){ alrt.destroy()},alrt.attr('timeOut'));
         },
         /**
          * Clear the timer so the alert cannot expire.
          */
         clearTimer: function(){
             clearTimeout(this.timer);
         }
     });

     /**
      * Alerts control
      *
      * Creates an alerts system in the element passed in the options
      */
     Alerts = can.Control({
         defaults: {
             timeOut : 4000,
             isSticky: true
         }
     },{
         /**
          * Put a class on the entire block so that it can be placed on the screen
          * (top:0 right:0).
          *
          * @param element
          * @param options
          */
        init: function( element , options ) {
            element.addClass('wrapper');
        },
        /**
         * Validate that the two options: alertText and type are valid
         *
         * @param alertOptions
         * @returns {Boolean}
         */
        _validate: function (alertOptions) {
            var alertTypes = new Array('success', 'error', 'warning', 'info');
            if ( (typeof alertOptions.alertText != 'string')// check if alertText is a string
                || (typeof alertOptions.type != 'string')// check if type is a string
                || (alertOptions.alertText.length < 1)
                || (jQuery.inArray(alertOptions.type, alertTypes) == -1)//check that the type is valids
            ){
                return false;
            }
            return true;
        },
        /**
         * Returns a list of options after the defaults have been applied to them
         *
         * @param options
         * @returns array alertOptions
         */
        _applyDefaults: function(alertText, type) {
            var alertOptions = {};
            can.extend(
                alertOptions, // empty array that will hold results
                this.options, // defaults per control
                {alertText: alertText, type: type} // options for this specific alert
            );

            return alertOptions;
        },
        /**
         * Creates the Alert and saves it.
         *
         * @param alertText
         * @param type
         * 	possible: 'error', 'success', 'info', 'warning'
         */
        sendAlert: function(alertText, type){
            // apply defaults
            var alertOptions = this._applyDefaults(alertText, type);
            if (this._validate(alertOptions)) {
                Alert.model(alertOptions).save();
            }
        },
        /**
         * Event that occurs when an alert has been created
         *
         * @param list
         * @param ev
         * @param alrt
         */
        '{Alert} created' : function(list, ev, alrt){
            this.element.append(can.view('js/lib/alerts/views/alertView.ejs', {alrt: alrt}));
            alrt.element = this.element.find(".alert:last");
            $(alrt.element).fadeIn('slow');
            alrt.setTimerToDestroy();
        },
        /**
         * Event that occurs after an alert has been destroyed.
         *
         * @param list
         * @param ev
         * @param alrt
         */
        '{Alert} destroyed' : function(list, ev, alrt){
            $(alrt.element).fadeOut('slow');
        },
        /**
         * Make the event on the sticky class so that it only listens on those divs
         *
         * @param el
         * @param ev
         */
        '.sticky mouseover': function(el, ev){
            var alrt = el.closest('.alert').data('alrt');
            $(alrt.element).addClass('highlight');
            alrt.clearTimer();
        },
        /**
         * if you would like to make the alert disappear eventually after mouseout
         *
         * @param el
         * @param ev
         */
        '.sticky mouseout': function(el, ev){
            var alrt = el.closest('.alert').data('alrt');
            $(alrt.element).removeClass('highlight');
            alrt.setTimerToDestroy();
        },
        /**
         * Event to remove the alert.
         *
         * @param el
         * @param ev
         */
        '.remove click': function(el, ev){
           el.closest('.alert').data('alrt').destroy();
        }
    });
})();
