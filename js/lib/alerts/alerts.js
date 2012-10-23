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
     /**
      * Alerts control
      *
      * Creates an alerts system in the element passed in the options
      */
     Alerts = can.Control({
         defaults: {
             timeOut : 4000, // 4 seconds
             isSticky: true  // allow the alert to stay (not disappear) on mouseover
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
         * Validates the alert created.
         * @param array options
         *    options for the alert
         */
        _validate: function(options) {
            if (!options.length) {

            }
            else if (!options.type.length) {

            }

            //return 'You have an error in sending your manual alert. Please try again.'
            return {};
        },
        _applyDefaults: function(options) {
            var alertOptions = {};
            can.extend(
                alertOptions, // empty array that will hold results
                this.options, // defaults per control
                options // options for this specific alert
            );

            return alertOptions;
        },
        /**
         * Creates the alert.
         * @param array options
         *    options for the alert
         */
        _create: function(options) {
            // set the defaults
            var alertOptions = this._applyDefaults(options);

            // validate options
            var errors = this._validate(alertOptions);

            // if there are errors handle them
            if (errors.length) {
                return;
            }

            return alertOptions;
        },
        /**
        * Creates a timer for the alert which decides when the alert should expire.
        */
       _setTimerToDestroy: function(alert_id){
           this.timer = setTimeout(function(){
               alrt.destroy()
           }, alrt.attr('timeOut'));
       },
        /**
        * Clear the timer so the alert cannot expire.
        */
        _clearTimer: function(){
            clearTimeout(this.timer);
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
        sendAlert: function(alertText, type){
            // create the alert
            var alrt = this._create({
                alertText: alertText,
                type: type
            });

            this.element.append(can.view('js/views/alertView.ejs', {alrt: alrt}));

            var alrt = this._create({
                alertText: alertText,
                type: type,
                id: 'ids'
            });

            var docFrag = can.view('js/views/alertView.ejs', {alrt: alrt});
            this.element.append(docFrag);
            alrt.element = this.element.find(".alert:last").fadeIn('slow');

            //alrt.element.remove();
            //alrt.setTimerToDestroy();

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
        '.alert created' : function(list, ev, alrt){
            //this.alertsList.push(alrt);
            //alrt.setCls();
            alert('hi');
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
        '.alert destroyed' : function(list, ev, alrt){
            alert('hello');
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
