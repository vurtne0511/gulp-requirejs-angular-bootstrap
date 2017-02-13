/**
 * 浏览器识别类
 */

'use strict';

define(function () {

    var browserdetect = {
        init: function () {
            this.browser = this.searchString(this.dataBrowser) || "an unknown browser";
            this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
            this.OS = this.searchString(this.dataOS) || "an unknown OS";
        },
        searchString: function (data) {
            for (var i = 0; i < data.length; i++) {
                var dataString = data[i].string;
                var dataProp = data[i].prop;
                this.versionSearchString = data[i].versionSearch || data[i].identity;
                if (dataString) {
                    if (dataString.indexOf(data[i].subString) !== -1) {
                        return data[i].identity;
                    }
                } else if (dataProp) {
                    return data[i].identity;
                }
            }
        },
        searchVersion: function (dataString) {
            var index = dataString.indexOf(this.versionSearchString);
            if (index === -1) { return; }
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        },
        dataBrowser: [
            { string: navigator.userAgent, subString: "Edge", identity: "Edge", versionSearch: "Edge" },
            { prop: window.opera, identity: "Opera", versionSearch: "Version" },
            { string: navigator.userAgent, subString: "OPR", identity: "Opera", versionSearch: "OPR" },
            { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
            { string: navigator.userAgent, subString: "MSIE", identity: "IE", versionSearch: "MSIE" },
            // IE 11 识别
            { string: navigator.userAgent, subString: "Trident", identity: "IE", versionSearch: "rv" },
            { string: navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version" },
            { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
            { string: navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv" },
            { string: navigator.userAgent, subString: "Netscape", identity: "Netscape" },
            { string: navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla" },
            { string: navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb" },
            { string: navigator.vendor, subString: "Camino", identity: "Camino" },
            { string: navigator.vendor, subString: "KDE", identity: "Konqueror" },
            { string: navigator.vendor, subString: "iCab", identity: "iCab" }
        ],
        dataOS: [
            { string: navigator.platform, subString: "Win", identity: "Windows" },
            { string: navigator.platform, subString: "Mac", identity: "Mac" },
            { string: navigator.userAgent, subString: "iPhone", identity: "iOS" },
            { string: navigator.userAgent, subString: "iPad", identity: "iOS" },
            { string: navigator.platform, subString: "Linux", identity: "Linux" },
            { string: navigator.platform, subString: "Android", identity: "Android" }
        ]
    };

    return browserdetect;
});
