﻿/*pub-1|2012-11-28 11:25:41*/
(function (win, undefined) {
    var doc = win.document,
		EMPTY = "";
    var SNSFB = {
        isDaily: location.href.indexOf(".daily.") > -1,
        getCookie: function (name) {
            var ret, m;
            if (name) {
                if ((m = document.cookie.match("(?:^| )" + name + "(?:(?:=([^;]*))|;|$)"))) {
                    ret = m[1] ? decodeURIComponent(m[1]) : ""
                }
            }
            return ret
        },
        storage: function (key, value) {
            var ls = window.localStorage;
            if (ls) {
                if (arguments.length >= 2) {
                    ls.setItem(key, value)
                } else {
                    return ls.getItem(key)
                }
            } else {
                try {
                    var useObject = docuemnt.createElement("div");
                    if (!useObject.style.behavior) {
                        useObject.style.behavior = "url(#default#userData)"
                    }
                    if (arguments.length >= 2) {
                        useObject.setAttribute(key, value);
                        useObject.save("sns")
                    } else {
                        useObject.load("sns");
                        return useObject.getAttribute(key)
                    }
                } catch (e) { }
            }
        },
        trim: function (str) {
            var RE_TRIM = /^\s+|\s+$/g;
            return (str == undefined) ? EMPTY : str.toString().replace(RE_TRIM, EMPTY)
        },
        param: function (o, sep) {
            sep = sep || "&";
            var buf = [],
				key, val;
            for (key in o) {
                val = o[key];
                key = encodeURIComponent(key);
                if (val) {
                    buf.push(key, "=", encodeURIComponent(val + EMPTY), sep)
                }
            }
            buf.pop();
            return buf.join(EMPTY)
        },
        unparam: function (str, sep) {
            if (typeof str !== "string" || (str = this.trim(str)).length === 0) {
                return {}
            }
            var ret = {}, pairs = str.split(sep || "&"),
				pair, key, val, m, i = 0,
				len = pairs.length,
				RE_ARR_KEY = /^(\w+)\[\]$/;
            for (; i < len; ++i) {
                pair = pairs[i].split("=");
                key = decodeURIComponent(pair[0]);
                try {
                    val = decodeURIComponent(pair[1] || EMPTY)
                } catch (ex) {
                    val = pair[1] || EMPTY
                }
                if ((m = key.match(RE_ARR_KEY)) && m[1]) {
                    ret[m[1]] = ret[m[1]] || [];
                    ret[m[1]].push(val)
                } else {
                    ret[key] = val
                }
            }
            return ret
        }
    };
    var search = win.location.search.substring(1);
    var param = SNSFB.unparam(search);
    var referrer = document.referrer;
    var SITE_REG = /atpanel\.|taobao\.|alimama\.|tmall\.|\:\d+\/auth\/|taobaocdn\.|tbcdn\.|taofula\.|google\.com\.hk|baidu\.|yigoupai\.|sougou\.|youdao\.|linezing\.|127\./i;

    function sendReq(nick) {
        if (SNSFB.trim(nick) === "") {
            nick = SNSFB.storage("tracknick")
        } else {
            try {
                nick = eval('"' + nick + '"')
            } catch (e) { }
        }
        param.nick = nick;
        param.referrer = referrer;
        if (search.indexOf("snsfb-debug") != -1) { } else {
            if (!param.nick || SNSFB.trim(param.nick) === "") {
                return
            }
            if (!param._fb && !param._u) {
                return
            }
            if (!param._fb && param._u && referrer && SITE_REG.test(referrer)) {
                return
            }
        }
        var requestURI = "http://jianghu." + (SNSFB.isDaily ? "daily.taobao.net" : "taobao.com") + "/feedback/feedback_receiver.htm?_input_charset=utf-8&" + SNSFB.param(param);
        var script = document.createElement("script");
        script.src = requestURI;
        script.charset = "gbk";
        document.getElementsByTagName("head")[0].appendChild(script);
        SNSFB.storage("tracknick", param.nick)
    }
    if (location.hostname.indexOf("tmall") != -1) {
        try {
            TB.Global.loginStatusReady && TB.Global.loginStatusReady(function (userInfo) {
                var nick = userInfo.tracknick;
                sendReq(nick)
            })
        } catch (e) { }
    } else {
        var nick = SNSFB.getCookie("tracknick");
        sendReq(nick)
    }
})(window, undefined);