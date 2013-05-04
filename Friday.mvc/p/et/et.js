 /*pub-2|2011-11-24 14:06:32*/(function() {
    this._useragent = {get: function(a) {
            return a = "_get_" + a, this[a] && this[a].call(this)
        },_get_os: function() {
            var a = [["Windows NT 5.1", "WinXP"], ["Windows NT 6.0", "WinVista"], ["Windows NT 6.1", "Win7"], ["Windows NT 5.2", "Win2003"], ["Windows NT 5.0", "Win2000"], ["Macintosh", "Macintosh"], ["Windows", "WinOther"], ["Ubuntu", "Ubuntu"], ["Linux", "Linux"], ["iPod", "iPod"], ["iPad", "iPad"], ["iPhone", "iPhone"]];
            for (var b = 0, c = a.length; b < c; ++b)
                if (navigator.userAgent.indexOf(a[b][0]) != -1)
                    return a[b][1];
            return "Unknown"
        },_get_browserstring: function() {
            var a = this.get("browser");
            return a.shell + (a[a.shell] || "")
        },_get_browser: function() {
            var a = {}, b, c = "", d = "", e = function(a) {
                var b = 0;
                return parseFloat(a.replace(/\./g, function() {
                    return b++ === 0 ? "." : ""
                }))
            }, f = navigator.userAgent;
            if ((b = f.match(/AppleWebKit\/([\d.]*)/)) && b[1]) {
                a[d = "webkit"] = e(b[1]), (b = f.match(/Chrome\/([\d.]*)/)) && b[1] ? a[c = "chrome"] = e(b[1]) : (b = f.match(/\/([\d.]*) Safari/)) && b[1] && (a[c = "safari"] = e(b[1]));
                if ((b = f.match(/\/([\d.]*) Mobile/)) && b[1])
                    a[c = "mobile safari"] = e(b[1]);
                else if (b = f.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))
                    a[c = "mobile webkit"] = b[0]
            } else if ((b = f.match(/Presto\/([\d.]*)/)) && b[1])
                a[d = "presto"] = e(b[1]), (b = f.match(/Opera\/([\d.]*)/)) && b[1] && (a[c = "opera"] = e(b[1]), (b = f.match(/Opera\/.* Version\/([\d.]*)/)) && b[1] && (a[c] = e(b[1])), (b = f.match(/Opera Mini[^;]*/)) && b ? a[c = "opera mini"] = b[0] : (b = f.match(/Opera Mobi[^;]*/)) && b && (a[c = "opera mobi"] = b[0]));
            else if ((b = f.match(/MSIE\s([^;]*)/)) && b[1]) {
                a[d = "trident"] = .1, a[c = "ie"] = e(b[1]);
                do {
                    var g = window.external;
                    if (undefined === g || null === g)
                        continue;
                    if (!("anyFakeMethod" in g))
                        continue;
                    if (/\b(?:TheWorld|TencentTraveler|QQBrowser)\b/.test(f))
                        continue;
                    a[c = "otherIE"] = e(b[1])
                } while (0);
                (b = f.match(/Trident\/([\d.]*)/)) && b[1] && (a[d] = e(b[1]))
            } else if (b = f.match(/Gecko/))
                a[d = "gecko"] = .1, (b = f.match(/rv:([\d.]*)/)) && b[1] && (a[d] = e(b[1])), (b = f.match(/Firefox\/([\d.]*)/)) && b[1] && (a[c = "firefox"] = e(b[1]));
            return c && (a.shell = c), d && (a.core = d), a.documentMode = document.documentMode || 0, c || (a.shell = a.core = "unknown"), a
        },_get_screen: function() {
            var a = window.screen;
            return a ? a.width + "x" + a.height : ""
        }}
})(), function() {
    this._userpath = {_data: [],push: function(a, b) {
            if (!a || typeof a != "string" || a.length > 10)
                return;
            this._data.push([a, b || 1, +(new Date)])
        },_get_data: function(a, b) {
            a = a || 1;
            var c = [];
            for (var d = 0, e = this._data.length; d < e; d++)
                this._data[d][1] <= a && c.push(this._data[d][0]);
            return c.join(b || "^")
        },get: function(a) {
            return a = "_get_" + a, this[a] && this[a].apply(this, Array.prototype.slice.call(arguments, 1))
        },clear: function() {
            this._data = []
        }}
}(), function() {
    function a(a) {
        var b = document.cookie.match("(?:^|;)\\s*" + a + "=([^;]*)");
        return b && b[1] ? decodeURIComponent(b[1]) : ""
    }
    function b() {
        var b = a("tracknick"), c = a("_nk_") || b;
        return !!(a("_l_g_") && c || a("ck1") && b)
    }
    if (parseInt(Math.random() * 100) !== 0)
        return;
    var c = 0, d = 10;
    window.onerror = function(e, f, g) {
        if (!window._useragent || ++c > d)
            return;
        var h = "http://110.75.1.110/monitor.htm?errortracer";
        window.g_config && (h += "&appid=" + (g_config.appId || 0)), h += "&os=" + encodeURIComponent(_useragent.get("os")), h += "&br=" + encodeURIComponent(_useragent.get("browserstring")), h += "&sc=" + encodeURIComponent(_useragent.get("screen")), h += "&url=" + encodeURIComponent(location.href), h += "&nick=" + encodeURIComponent(a("_nk_") || a("tracknick")), h += "&login=" + (b() ? 1 : 0), h += "&st=" + (document.body || document.documentElement).scrollTop, h += "&message=" + encodeURIComponent(e), h += "&file=" + encodeURIComponent(f), h += "&line=" + encodeURIComponent(g), h += "&t=" + +(new Date), window._userpath && (h += "&up=" + encodeURIComponent(_userpath.get("data"))), _useragent.get("browserstring").indexOf("ie6") === 0 && h.length > 2083 && (h = h.slice(0, 2078) + "..."), window["_et_image_" + c] = new Image, window["_et_image_" + c].src = h
    }
}();
