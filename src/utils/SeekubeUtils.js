const SEEKUBE_LOCAL_STORAGE_KEY = 'seekube:clientId';

var SeekubeUtils = {

    _generateGUID: function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    },

    getOrCreateGUID: function() {
        var guid;

        if (localStorage) {
            guid = localStorage.getItem(SEEKUBE_LOCAL_STORAGE_KEY);
        }
        if (!guid) {
            guid = this._generateGUID();
            localStorage.setItem(SEEKUBE_LOCAL_STORAGE_KEY, guid);
        }
        return guid;
    },

    payloadToUrlEncoded: function(payload) {
        var urlEncodedData = "";
        var urlEncodedDataPairs = [];
        var name;

        for(name in payload) {
            urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(payload[name]));
        }

        urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

        return urlEncodedData;
    }
};