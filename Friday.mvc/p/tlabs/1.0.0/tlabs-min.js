﻿(function (r) {
    var f = document.domain,
		i = window,
		o = document,
		c = {}, l = (f.indexOf("taobao.com") + f.indexOf("tmall.com")) === -2,
		n = {
		    cookieName: "l",
		    baseUrl: "http://megatron." + (l ? "daily.taobao.net" : "labs.taobao.com") + "/services",
		    remoteDevUrl: "http://dev.labs." + (l ? "daily.taobao.net:8080" : "taobao.com") + "/",
		    queryParams: "?{nick}",
		    featureUrl: "http://" + (l ? "img01.daily.taobaocdn.net/L1/98/8628/" : "tu.taobaocdn.com/s1/")
		}, e = {
		    base: "http://" + (l ? "assets.daily.taobao.net" : "a.tbcdn.cn") + "/libs/",
		    alias: {
		        jquery: "jquery/1.6.2/jquery",
		        mustache: "mustache/0.3.1/mustache",
		        underscore: "underscore/1.1.6/underscore",
		        backbone: "backbone/0.5.1/backbone",
		        "jquery-1.6.1": "jquery/1.6.1/jquery"
		    }
		};
    for (var d in e.alias) {
        e.alias[d] = e.base + e.alias[d]
    }
    r.TLabs = {
        version: "1.0.0",
        loaded: false,
        description: "TLabs is taobao labs JS engine, cc @macji<xiaomacji@gmail.com>",
        features: [],
        _errorFeatures: [],
        addFeature: function (u) {
            var k = u.mods,
				t = 0,
				s = k.length,
				v;
            for (; t < s; t++) {
                if (k[t].matches && this.isMatchCurrentPage(k[t].matches)) {
                    this.features.push(u)
                } else {
                    this._errorFeatures.push(u)
                }
            }
        },
        isMatchCurrentPage: function (s) {
            if (s === "*") {
                return true
            }
            try {
                return new RegExp(s, "i").test(location.href)
            } catch (k) {
                return false
            }
        },
        _loadFeature: function () {
            var A = this,
				v = 0,
				t = A.features.length,
				z = "http://dev.tlabs/",
				k = A.config.featureUrl,
				s = A.config.remoteDevUrl,
				u, w, B, y, x;
            for (; v < t; v++) {
                B = A.features[v];
                y = B.id;
                x = y && y.split("/");
                for (u = 0, w = B.mods.length; u < w; u++) {
                    if (A.dev && A.dev_feature_id === B.id) {
                        seajs.use(z + A.dev_feature_mod)
                    } else {
                        if ((!!x && x[0]) && x[0] === "dev") {
                            seajs.use(s + y + "/" + B.mods[u].path)
                        } else {
                            seajs.use(k + y + "/" + B.mods[u].path)
                        }
                    }
                }
            }
            if (A.dev && A.dev_feature_mod) {
                seajs.use(z + A.dev_feature_mod)
            }
        },
        init: function (u) {
            var s = this,
				w = r.location + "",
				k, v, t = s.loaded;
            s.config = q(n, u || {});
            if (w.indexOf("__tlabs-dev") !== -1) {
                s.dev = true;
                s.dev_feature_id = (w.match(/__tlabs_feature_id\=([^&]+)/i) || [])[1];
                s.dev_feature_mod = (w.match(/__tlabs_feature_mod\=([^&]+)/i) || [])[1]
            }
            if (!s.dev && (t || a(u.nick))) {
                return
            }
            if (!s.dev && !j()) {
                return
            }
            v = g(s.config.queryParams, s.config, function (z) {
                var y = s.config,
					x;
                switch (z) {
                    case "nick":
                        x = !!y.nick && j() ? "nick=" + y.nick : "";
                        break;
                    default:
                        x = y.key;
                        break
                }
                return x
            });
            b(s.config.baseUrl + v, function () {
                s.loaded = true;
                if (s.features.length === 0) {
                    return
                }
                if (window.seajs) {
                    seajs.config(e);
                    return s._loadFeature()
                }
                b(e.base + "seajs/1.0.0/sea.js", function () {
                    seajs.config(e);
                    s._loadFeature()
                })
            })
        }
    };

    function b(k, w, v) {
        var u = document,
			s = u.getElementsByTagName("head")[0],
			t = u.createElement("script");
        t.src = k;
        t.async = true;
        if (v) {
            t.charset = v
        }
        h(t, function () {
            w && w.call(t);
            try {
                if (t.clearAttributes) {
                    t.clearAttributes()
                } else {
                    for (var z in t) {
                        delete t[z]
                    }
                }
            } catch (y) { }
            s.removeChild(t)
        });
        s.insertBefore(t, s.firstChild);
        return t
    }
    function h(k, s) {
        return document.addEventListener ? k.addEventListener("load", s, false) : (function () {
            var t = k.onreadystatechange;
            k.onreadystatechange = function () {
                var u = k.readyState;
                if (/loaded|complete/i.test(u)) {
                    k.onreadystatechange = null;
                    t && t();
                    s.call(this)
                }
            }
        })()
    }
    function q(v, u) {
        for (var t in u) {
            v[t] = u[t]
        }
        return v
    }
    function g(k, u, t) {
        return ((k.replace) ? k.replace(/\{(\w+)\}/g, function (v, w) {
            var s = !t ? u[w] : t(w);
            return s !== undefined ? s : v
        }) : "")
    }
    function p(s) {
        var t = o.createElement("div"),
			k = o.createTextNode(s);
        t.appendChild(k);
        return t.innerHTML
    }
    function m(s) {
        if (i.userCookie && !i.userCookie[s] !== undefined) {
            return i.userCookie[s]
        }
        if (c[s] === undefined) {
            var k = o.cookie.match("(?:^|;)\\s*" + s + "=([^;]*)");
            c[s] = (k && k[1]) ? decodeURIComponent(k[1]) : ""
        }
        return c[s]
    }
    function j() {
        var s = m("tracknick"),
			k = m("_nk_") || s;
        return !!(m("_l_g_") && k || m("ck1") && s)
    }
    function a(u) {
        var v = m("l"),
			t = v.split("::"),
			u = j() ? u : "",
			x = false,
			s = t[0],
			y = t[1],
			k = t[2] || "",
			w;
        w = k.substring(0, 1) === "1";
        s = encodeURIComponent(p(unescape(s.replace(/\\u/g, "%u"))));
        if (s !== undefined) {
            x = s === u && w && new Date().getTime() < y
        }
        return x
    }
    r.LabsJS = r
})(this);