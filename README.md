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
            js = d.createElement(s); js.id = id; js.src = "script.js";
            fjs.parentNode.insertBefore(js, fjs);
            js.onload = function(){
                SK.initEventWidget();
            };
        }(document, 'script', 'seekube-jssdk'));
    </script>

The widget will be loaded in the div with ID "skEvent"

### Attributes

    height: change body size (not header and footer)
    color-one: change the header background and the date color
    color-two: change the background under the event list
    color-three: change the events background and the footer background

### Customize style

Insert an internal stylesheet and override these CSS classes:

    .sk-event-widget {}
    .sk-event-widget-header {}
    .sk-event-body {}
    .sk-event-list {}
    .sk-event-list li{}
    .sk-event-list li:hover {}
    .sk-event-list li a{}
    .sk-event-list li a:hover{}
    .sk-event-date {}
    .sk-event-day {}
    .sk-event-month {}
    .sk-event-text {}
    .sk-event-name {}
    .sk-event-promoter {}
    .sk-event-footer {}
    .sk-event-footer-link {}
    ::-webkit-scrollbar-thumb {
        background-color: color;
    }
