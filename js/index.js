 (function(){
     AlertsInput = can.Control({
     },{
        init: function(element){
            this.input = this.element.find("input");
            this.input.val("");
            //this.alertsSystem = new Alerts("#alerts-display-wrap");
        },
        sendAlert: function(type){
            var alrtArr = {
                alertText: this.input.val()
            };

            // allow change of type here
            if (type) {
                can.extend(alrtArr, {type : type});
            }

            AlertsSystem.sendAlert(alrtArr);
        },
        'a.warn click': function(el){
            this.sendAlert("warn");
            this.input.val("");
        },
        'a.info click': function(el){
            this.sendAlert("info");
            this.input.val("");
        },
        'a.success click': function(el){
            this.sendAlert("success");
            this.input.val("");
        }
    });

     $(document).ready(function(){
         // create the alert input for the demo
         new AlertsInput('#alerts-input');
     });
 })();
