'use strict';


window.SK = {
    initEventWidget: function () {
        var head = document.getElementsByTagName('head')[0];
        var styleTag = document.createElement("link");
        styleTag.rel = "stylesheet";
        styleTag.type = "text/css";
        styleTag.href = "style.css";
        styleTag.media = "all";

        var fontOpenSans = document.createElement("link");
        fontOpenSans.rel = "stylesheet";
        fontOpenSans.type = "text/css";
        fontOpenSans.href = "//fonts.googleapis.com/css?family=Open+Sans";
        fontOpenSans.media = "all";

        var momentScript = document.createElement("script");
        momentScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min.js';
        momentScript.onload = function () {
            var momentLocale = document.createElement("script");
            momentLocale.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/locale/fr.js';
            head.appendChild(momentLocale);
        };

        head.appendChild(fontOpenSans);
        head.appendChild(styleTag);
        head.appendChild(momentScript);

        window.onload = function () {
            moment.locale('fr');

            var embedElement = document.getElementById('skEvent');

            var widget = document.createElement('div');
            widget.id = 'skEventWidget';
            widget.className = 'sk-event-widget';
            widget.innerHTML = '<header class="sk-event-widget-header">Découvrez les événements carrières</header>';

            var eventBody = document.createElement('section');
            eventBody.className = 'sk-event-body';

            // Get events list
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                var eventList = document.createElement('ul');
                eventList.className = 'sk-event-list';

                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var response = JSON.parse(xhttp.responseText);

                    response.data.forEach(function (event) {
                        var eventDay = moment(event.beginAt).format('DD');
                        var eventMonth = moment(event.beginAt).format('MMMM');
                        eventMonth = eventMonth.length > 5 ? eventMonth.slice(0, 4) + '.' : eventMonth;

                        var listHtml = document.createElement('li');
                        listHtml.setAttribute('onclick', 'window.open("' + event.url + '");');
                        var newLine = document.createElement('br');

                        var date = document.createElement('div');
                        widget.id = 'skEventDate';
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
                    });

                    var footer = document.createElement('footer');
                    footer.className = 'sk-event-footer';
                    footer.innerHTML = '<a href="http://goo.gl/forms/wAlvsAbfzP" target="_blank" class="sk-event-footer-link">Ajoutez votre événement</a>';

                    eventBody.appendChild(eventList);
                    widget.appendChild(eventBody);
                    widget.appendChild(footer);
                    embedElement.appendChild(widget);

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
            };
            xhttp.open("GET", "http://api.seekube.com/v2/events", true);
            xhttp.send();
        };
    }
};