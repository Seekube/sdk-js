Seekube Javascript SDK
===================

Career events widget
-------------

### Install widget

Copy paste this code in your HTML :

    <div id="skEvent"></div>
    <script>
    (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id; js.src = "https://cdn.seekube.com/sdk-js/event-widget/script.min.js";
            fjs.parentNode.insertBefore(js, fjs);
            js.onload = function(){
                SK.EventWidget.init();
                SK.EventWidget.loadEvents();
            };
        }(document, 'script', 'seekube-jssdk'));
    </script>

The widget will be loaded in the div with ID "skEvent"

### Option

You can change some settings at the initialization of the widget:

    var settings = {
        url: "https://api.seekube.com/v2/",
        request: "events?dateFilter=future&$limit=20"
    }

And then call:

    SK.EventWidget.init(settings);

### Customize style

Insert an internal stylesheet and override these CSS classes:

    .sk-event-widget {}
    .sk-event-widget-header {}
    .sk-event-body {}
    .sk-event-list {}
    .sk-event-date {}
    .sk-event-day {}
    .sk-event-month {}
    .sk-event-text {}
    .sk-event-name {}
    .sk-event-promoter {}
    .sk-event-footer {}
    .sk-event-footer-link {}
    .sk-event-widget ::-webkit-scrollbar-thumb {
        background-color: color;
    }
