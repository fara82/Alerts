 (function(){
     AlertsInput = can.Control({
     },{
        init: function(element){
            this.input = this.element.find("input");
            this.input.val("");
            this.alertsSystem = new Alerts("#alerts-display-wrap");
        },
        sendAlert: function(type){
            var alertText = this.input.val();
            this.alertsSystem.sendAlert(alertText, type);
        },
        'a.warn click': function(el){
            this.sendAlert("warning");
            this.input.val("");
        },
        'a.info click': function(el){
            this.sendAlert("info");
            this.input.val("");
        },
        'a.success click': function(el){
            this.sendAlert("success");
            this.input.val("");
        },
        'a.error click': function(el){
            this.sendAlert("error");
            this.input.val("");
        }
    });

     $(document).ready(function(){
         // create the alert input for the demo
         new AlertsInput('#alerts-input');
     });
 })();
