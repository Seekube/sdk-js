'use strict';

const DEFAULT_SETTINGS = {
        url: "https://api.seekube.com/v2/",
        request: "events?dateFilter=future&$limit=20"
};

const GA = {
    ID: "UA-27503660-5",
    MEASUREMENT_URL: "https://www.google-analytics.com/collect"
};

window.SK = {
    EventWidget: {
        init: function(settings) {
            this.settings = settings ? this.overloadSettings(settings) : DEFAULT_SETTINGS;
            this.settings = this.correctUrl(this.settings);

            this.initStyle();
            this.initStructure();
            this.guid = SeekubeUtils.getOrCreateGUID();

            // Set language for moment
            moment.locale('fr');
        },

        loadEvents: function() {
            var xhttp = new XMLHttpRequest();

            // Function Bind to use this of EventWidget
            xhttp.onload = function() {
                if (xhttp.status == 200) {
                    var eventList = document.createElement('ul');
                    eventList.className = 'sk-event-list';

                    var response = JSON.parse(xhttp.responseText);

                    // Function Bind to use this of EventWidget
                    response.data.forEach(function(event) {
                        this.addEvent(event, eventList);
                    }.bind(this));

                    this.eventBody.appendChild(eventList);
                    this.trimEvents();
                }
            }.bind(this);

            // Get events list
            xhttp.open("GET", this.settings.url + this.settings.request, true);
            xhttp.send();
        },

        correctUrl: function(settings) {
            // If there is no "/" at the end we add it
            if (settings.url.charAt(settings.url.length - 1) !== '/') {
                settings.url += "/";
            }
            // If there is a "/" at the end we remove it
            if (settings.request.charAt(0) === '/') {
                settings.request = settings.request.slice(1);
            }

            return settings;
        },

        overloadSettings: function(settings) {
            settings.url = settings.url || DEFAULT_SETTINGS.url;
            settings.request = settings.request || DEFAULT_SETTINGS.url;

            return settings;
        },

        sendAnalyticsRequest: function(payload) {
            this.xhttpAnalytics = new XMLHttpRequest();

            this.xhttpAnalytics.open("POST", GA.MEASUREMENT_URL, true)
            this.xhttpAnalytics.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            var urlEncodedData = SeekubeUtils.payloadToUrlEncoded(payload);

            this.xhttpAnalytics.send(urlEncodedData);
        },

        initStyle: function() {
            var head = document.getElementsByTagName('head')[0];
            var styleTag = document.createElement("link");

            // Init CSS
            styleTag.rel = "stylesheet";
            styleTag.type = "text/css";
            styleTag.href = "https://cdn.seekube.com/sdk-js/event-widget/style.min.css";
            styleTag.media = "all";

            // Init Font
            var fontOpenSans = document.createElement("link");
            fontOpenSans.rel = "stylesheet";
            fontOpenSans.type = "text/css";
            fontOpenSans.href = "//fonts.googleapis.com/css?family=Open+Sans";
            fontOpenSans.media = "all";

            // Add CSS and Font to <head>
            head.appendChild(fontOpenSans);
            head.appendChild(styleTag);
        },

        initStructure: function() {
            var embedElement = document.getElementById('skEvent');

            // Main Frame
            var widget = document.createElement('div');
            widget.id = 'skEventWidget';
            widget.className = 'sk-event-widget';
            widget.innerHTML = '<header class="sk-event-widget-header">Découvrez les événements carrières</header>';

            // Section with events
            this.eventBody = document.createElement('section');
            this.eventBody.className = 'sk-event-body';

            var footer = document.createElement('footer');
            footer.className = 'sk-event-footer';
            footer.innerHTML = '<a href="http://goo.gl/forms/wAlvsAbfzP" target="_blank" class="sk-event-footer-link">Ajoutez votre événement</a>';

            widget.appendChild(this.eventBody);
            widget.appendChild(footer);
            embedElement.appendChild(widget);
        },

        addEvent: function(event, eventList) {
            var eventDay = moment(event.beginAt).format('DD');
            var eventMonth = moment(event.beginAt).format('MMMM');
            eventMonth = eventMonth.length > 5 ? eventMonth.slice(0, 4) + '.' : eventMonth;

            var listHtml = document.createElement('li');

            listHtml.addEventListener('click', function() {
                window.open(event.url)
            });
            listHtml.addEventListener('click', function() {

                var payload = {
                    v: 1,                                           // Protocol version
                    tid: GA.ID,                                     // GA ID
                    cid: this.guid,                                 // Client ID
                    t: "event",                                     // Event Hit type
                    ec: "Event Widget",                             // Category
                    ea: "click",                                    // Event Action
                    el: event.url,                                  // Label
                    dl: location.href,                              // Document location url
                    dr: location.href,                              // Document Referrer
                    dt: document.title                              // Page title
                };

                this.sendAnalyticsRequest(payload);
            }.bind(this));

            listHtml.setAttribute('data-url', event.url);
            var newLine = document.createElement('br');

            var date = document.createElement('div');
            date.id = 'skEventDate';
            date.className = 'sk-event-date';

            var text = document.createElement('div');
            text.className = 'sk-event-text';

            var name = document.createElement('div');
            name.className = 'sk-event-name';
            name.innerHTML = event.name;

            var promoter = document.createElement('div');
            var organizer = event.promoter != '' ? '<span> - par ' + event.promoter + '</span>' : '';
            promoter.className = 'sk-event-promoter';
            promoter.innerHTML = event.city + organizer;

            var day = document.createElement('span');
            day.className = 'sk-event-day';
            day.innerHTML = eventDay;

            var month= document.createElement('span');
            month.className = 'sk-event-month';
            month.innerHTML = eventMonth;

            date.appendChild(day);
            date.appendChild(newLine);
            date.appendChild(month);
            text.appendChild(name);
            text.appendChild(promoter);
            listHtml.appendChild(date);
            listHtml.appendChild(text);
            eventList.appendChild(listHtml);
        },

        trimEvents: function() {

            var eventsName = document.getElementsByClassName("sk-event-name");

            for (var i = 0; i < eventsName.length; i++) {

                while (eventsName[i].offsetHeight > 40 || eventsName[i].innerHTML.length >= 55) {
                    var cut = true;

                    do {
                        eventsName[i].innerHTML = eventsName[i].innerHTML.slice(0, -1);
                    } while (eventsName[i].innerHTML.slice(-1) != ' ');
                }

                if (cut) {
                    eventsName[i].innerHTML += '...';
                    cut = false;
                }
            }
        }
    }
};
