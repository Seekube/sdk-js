'use strict';

window.SK = {
    EventWidget: {
        init: function() {
            this.initStyle();
            this.initStructure();

            // Set language for moment
            moment.locale('fr');
        },

        loadEvents: function() {
            var xhttp = new XMLHttpRequest();

            // Function Bind to use this of EventWidget
            xhttp.onreadystatechange = function() {
                // readyState == DONE
                if (xhttp.readyState == 4 && xhttp.status == 200) {
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
            xhttp.open("GET", "https://api.seekube.com/v2/events?dateFilter=future&$limit=20", true);
            xhttp.send();
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
