﻿(function (c) {
    var m = "130307",
		l = -1 !== location.search.indexOf("ts-debug"),
		o = c.Cookie.get("_nk_") || "",
		p = "apps/stargate/tstart/release/" + (l ? "debug" : m) + "/",
		j = ["tstart", "switch", "xiami", "u", "wallet", "trace", "quanzi", "news", "nanny", "deploy"],
		b = window,
		r = document;
    b._TOOLBAR_TIME_STAMP = {
        tstart: "20120406",
        tdog: "20110726",
        startTime: "2012/02/06",
        endTime: "2012/02/15"
    };

    function h() {
        var s = /daily/i;
        return s.test(location.host)
    }
    function n() {
        return b.g_config
    }
    function i() {
        var s = n();
        if (!s) {
            return false
        }
        return s.toolbar
    }
    function q() {
        var s = n();
        if (!s) {
            return false
        }
        return s.webww
    }
    function g() {
        var t = n(),
			u = i(),
			s = b.top || b.parent;
        if (s && s != b) {
            return false
        }
        if (!t || -1 !== location.search.indexOf("tclose") || "undefined" !== typeof TStart || (c.isBoolean(u) && !u)) {
            return false
        }
        return true
    }
    function a() {
        var s = n(),
			u = i(),
			t = q();
        if ((c.isBoolean(u) && !u) && (c.isBoolean(t) && t) && o) {
            return true
        }
        return false
    }
    function f() {
        if ("undefined" === typeof TStart) {
            var s = !h();
            b.TStart = {
                isOnline: s,
                isDebug: l,
                cdnPath: "http://" + (s ? "a.tbcdn.cn" : "assets.daily.taobao.net") + "/" + p,
                version: m
            }
        }
        return TStart
    }
    function e(s) {
        if ("1.30" != c.version) {
            c.IO.getScript(s)
        } else {
            try {
                c.use("dom, event, ajax, anim, json", function (x, y, v, u, w, z) {
                    u.getScript(s)
                })
            } catch (t) { }
        }
    }
    function k() {
        var u = i(),
			t = u ? (u.delay || 1) : 1,
			s;
        setTimeout(function () {
            s = f();
            if (!s._Loaded) {
                s._Loaded = true;
                e(s.cdnPath + "??" + j.join(".js,") + ".js")
            }
        }, (t - 1) * 1000)
    }
    function d() {
        if ("undefined" !== typeof Light && !Light.addonIsOK()) {
            p = "apps/lifeas/js/tdog/";
            j = ["tstart", "deploy"];
            var s = f();
            if (!s._Loaded) {
                s._Loaded = true;
                e(s.cdnPath + "??" + j.join(".js,") + ".js")
            }
        }
    }
    c.ready(function () {
        if (g()) {
            setTimeout(k, 1000)
        } else {
            if (a()) {
                setTimeout(d, 1000)
            }
        }
    })
})(KISSY);