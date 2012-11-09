NOTIFICATION SYSTEM
===================
@author Farhana Basrawala
@version 1.0
***

What is this?
-------------

This is a simple js script that sends the page a notification.
It is implemented using CanJS (<http://canjs.us/>).
***

Why would I need it?
--------------------

One would use this send an alert or a message.
***

How can I use it?
-----------------

1. Include, in this order, the jquery lib, the canjs lib, and alerts.js file.
> #####* This can be found in the js/lib/alerts folder.
> ######Source:
``<head>``
>>``<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.js"></script>``
``<script src="js/lib/can.jquery.js"></script>``
``<script src="js/lib/alerts/alerts.js"></script>``
``</head>``

2. Create an element in the dom where the alert will appear.
> ######Source:
> ``<div id="#alerts-display-wrap"></div>``

3. Create an instance of the Alerts control.
> #####* Pass in the element into the constructor where you would like your alert to appear.
>> ######Source:
``var NS = new Alerts("#alerts-display-wrap");``

4. Send alerts.
> #####* The Alerts::sendAlert(message, alert_type) function takes two string parameters.
>>#####1. (string) message - text to display
>>#####2. (string) alert_type - possible values: 'error', 'success', 'info', 'warning'

>> ######Source:
``NS.sendAlert('An error has occurred. Please try again', 'error');``
``NS.sendAlert('Success, you are entered to win.', 'success');``
``NS.sendAlert('Use the user panel to delete the post.', 'info');``
``NS.sendAlert('Your credit card is about expire.', 'warning');``
* * *
How can I trust it?
-------------------
It has been tested using qUnit (<http://qunitjs.com/>).
Tests will be added to the repo soon.
