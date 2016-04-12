Seekube Javascript SDK
===================

Career events widget
-------------

###Install widget

Copy paste this code in your HTML :

    <div id="skEvent"></div>
    <script>
    (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id; js.src = "script.js";
            fjs.parentNode.insertBefore(js, fjs);
            js.onload = function(){
                SK.initEventWidget();
            };
        }(document, 'script', 'seekube-jssdk'));
    </script>

The widget will be loaded in the div with ID "skEvent"


###Customize style

Insert an internal stylesheet and override these CSS classes:

    .sk-event-widget {}
    .sk-event-widget-header {}
    .sk-event-list {}
