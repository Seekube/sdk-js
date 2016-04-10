'use strict';

window.SK = {
   initEventWidget: function() {
       var head = document.getElementsByTagName('head')[0];
       var styleTag = document.createElement("link");
       styleTag.rel = "stylesheet";
       styleTag.type = "text/css";
       styleTag.href =  "style.css";
       styleTag.media = "all";

       var momentScript = document.createElement("script");
       momentScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/moment.min.js';
       momentScript.onload = function(){
           var momentLocale = document.createElement("script");
           momentLocale.src = 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.12.0/locale/fr.js';
           head.appendChild(momentLocale);
       };

       head.appendChild(styleTag);
       head.appendChild(momentScript);

       window.onload = function() {
           moment.locale('fr');

           var embedElement = document.getElementById('skEvent');

           var widget = document.createElement('div');
           widget.id = 'skEventWidget';
           widget.className = 'sk-event-widget';
           widget.innerHTML = '<header class="sk-event-widget-header">Evénements carrière</header>';

           var eventList = document.createElement('ul');
           eventList.className = 'sk-event-list';

           // Get events list
           var xhttp = new XMLHttpRequest();
           
           xhttp.onreadystatechange = function() {
               if (xhttp.readyState == 4 && xhttp.status == 200) {
                   var listHtml = '';
                   var response = JSON.parse(xhttp.responseText);

                   response.data.forEach(function(event) {
                       var eventDate = moment(event.beginAt).format('dddd D MMMM');

                       listHtml += '<li>' +
                           '<a href="' + event.url + '" target="_blank">' + event.name + '</a><br />' +
                           '<span class="sk-event-date">' + eventDate + '</span>' +
                           '</li>';
                   });

                   eventList.innerHTML = listHtml;
                   widget.appendChild(eventList);
                   embedElement.appendChild(widget);
               }
           };
           xhttp.open("GET", "http://dev.seekube.net:3030/events", true);
           xhttp.send();
       };
   }
};