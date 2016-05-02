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

                        var listHtml = document.createElement('li');
                        listHtml.setAttribute('onclick', 'window.open("' + event.eventUrl + '");');
                        var newLine = document.createElement('br');

                        var date = document.createElement('div');
                        date.className = 'sk-event-date';

                        var text = document.createElement('div');
                        text.className = 'sk-event-text';

                        var title = document.createElement('div');
                        title.className = 'sk-event-title';
                        title.innerHTML = event.title;

                        var promoter = document.createElement('div');
                        promoter.className = 'sk-event-promoter';
                        promoter.setAttribute('onclick', 'window.open("https://www.facebook.com");')
                        promoter.innerHTML = event.city + ' par ' + '<span onclick="window.open(\"https://www.facebook.com\">' + event.promoter + '</span>';

                        var day = document.createElement('span');
                        day.className = 'sk-event-day';
                        day.innerHTML = eventDay;

                        var month= document.createElement('span');
                        month.className = 'sk-event-month';
                        month.innerHTML = eventMonth;


                        date.appendChild(day);
                        date.appendChild(newLine);
                        date.appendChild(month);
                        text.appendChild(title);
                        text.appendChild(promoter);
                        listHtml.appendChild(date);
                        listHtml.appendChild(text);
                        eventList.appendChild(listHtml);
                    });

                    eventBody.appendChild(eventList);
                    widget.appendChild(eventBody);
                    embedElement.appendChild(widget);

                    var eventsTitle = document.getElementsByClassName("sk-event-title");

                    for (var i = 0; i < eventsTitle.length; i++) {

                        while (eventsTitle[i].offsetHeight > 40 || eventsTitle[i].innerHTML.length >= 55) {
                            var cut = true;

                            do {
                                eventsTitle[i].innerHTML = eventsTitle[i].innerHTML.slice(0, -1);
                            } while (eventsTitle[i].innerHTML.slice(-1) != ' ');
                        }

                        if (cut) {
                            eventsTitle[i].innerHTML += '...';
                            cut = false;
                        }
                    }

                }
            };
            xhttp.open("GET", "http://127.0.0.1:3030/api/v2/events", true);
            xhttp.send();
        };
    }
};