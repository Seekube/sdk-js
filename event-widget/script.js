(function (global) {
    // add array index of for old browsers (IE<9)
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(obj, start) {
            var i, j;
            i = start || 0;
            j = this.length;
            while (i < j) {
                if (this[i] === obj) {
                    return i;
                }
                i++;
            }
            return -1;
        };
    }  

    // make a global object to store stuff in
    if(!global.SeekubeSdk) { global.SeekubeSdk = {}; };
    var SeekubeSdk = global.SeekubeSdk;

    // To keep track of which embeds we have already processed
    if(!SeekubeSdk.processedScripts) { SeekubeSdk.processedScripts = []; };
    var processedScripts = SeekubeSdk.processedScripts;

    if(!SeekubeSdk.styleTags) { SeekubeSdk.styleTags = []; };
    var styleTags = SeekubeSdk.styleTags;

    var scriptTags = document.getElementsByTagName('script');

    // add a style tag to the head
    var styleTag = document.createElement("link");
    styleTag.rel = "stylesheet";
    styleTag.type = "text/css";
    styleTag.href =  "style.css";
    styleTag.media = "all";
    document.getElementsByTagName('head')[0].appendChild(styleTag);
    styleTags.push(styleTag);

    var embedElement = document.getElementById('skEvent');

    // Create a div
    var div = document.createElement('div');
    div.id = 'skEventWidget';
    div.className = 'sk-event-widget';

    // add the cleanslate classs for extreme-CSS reset.
    div.innerHTML = '<header class="sk-event-widget-header">Evénements carrière</header>' +
            '<ul class="sk-event-list"><li><a href="#" class="sk-event-title">Forum X</a></li></ul>';

    embedElement.appendChild(div);
})(this);