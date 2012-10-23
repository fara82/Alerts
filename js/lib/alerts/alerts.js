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
  * alertsSystem.sendAlert({
  * 	alertText: 'An error has occurred. Please try again',
  * 	type	 : 'error' // type of alert possible: 'warning', 'success', 'error', 'info'
  * 	isSticky : true // if true then the alert will stay after a mouseover
  * 	timeOut  : 5000 // 5 seconds til the alert fades out
  * });
  *
  *	alertText: string
  * type	 : string
  * isSticky : bool
  * timeOut: int
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
         }/*,
         findAll: function(params){
         var def = new can.Deferred();
         this.localStore(function(alerts){
             var instances = [],
             self = this;
             can.each(alerts, function(alt) {
                 instances.push(new self(alt));
             });
             def.resolve({data: instances});
         });
         return def
     },*/
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
         pluginName: 'alerts',
         defaults: {
             timeOut : 4000,
             type	: 'success',
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
         * Creates the Alert and saves it.
         *
         * @param options
         * 	possible options
         * 	  alertText
         * 	  type
         * 	  isSticky
         * 	  timeOut
         */
        sendAlert: function(options){
            var alertText = options.alertText;
            var alertOptions = {};

            if ((alertText !== '') && alertText){
                can.extend(alertOptions, this.options, options);
            } else {
                can.extend(alertOptions, this.options, {
                    alertText : 'You have an error in sending your manual alert. Please try again.',
                    type	: 'error'
                });
            }
            Alert.model(alertOptions).save();
        },
        /**
         * Event to remove the alert.
         */
        '.remove click': function(el, ev){
           el.closest('.alert').data('alrt').destroy();
        },
        /**
         * Event that occurs when an lert has been created
         *
         * @param list
         * @param ev
         * @param alrt
         */
        '{Alert} created' : function(list, ev, alrt){
            //this.alertsList.push(alrt);
            //alrt.setCls();
            var append = this.element.append(can.view('js/views/alertView.ejs', {alrt: alrt}));
            alrt.element = append.find("#alert-id-" + alrt.attr('id'));
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
            var alrtEl = el.closest('.alert');
            var alrt = alrtEl.data('alrt');
            $(alrt.element).addClass('highlight');
            alrt.clearTimer();
        }
        /*,
         * if you would like to make the alert disappear eventually after mouseout
        '.sticky mouseout': function(el, ev){
            var alrtEl = el.closest('.alert');
            var alrt = alrtEl.data('alrt');
            alrt.setTimerToDestroy();
        }*/
    });
})();
