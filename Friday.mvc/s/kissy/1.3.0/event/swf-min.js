﻿KISSY.add("swf", function (h, e, r, s, k, p) {
    function i(a) {
        i.superclass.constructor.apply(this, arguments);
        var b = this.get("expressInstall"),
			l, d, g = this.get("htmlMode");
        d = this.get("params");
        var f = this.get("attrs"),
			q = this.get("document"),
			j = e.create("<span>", p, q),
			o = this.get("elBefore"),
			m = this.get("src"),
			k = this.get("version");
        l = f.id = f.id || h.guid("ks-swf-");
        if (A()) {
            if (k && !y(k) && (this.set("status", i.Status.TOO_LOW), b)) {
                m = b;
                if (!("width" in f) || !/%$/.test(f.width) && 310 > parseInt(f.width, 10)) f.width = "310";
                if (!("height" in f) || !/%$/.test(f.height) && 137 > parseInt(f.height, 10)) f.height = "137";
                b = d.flashVars = d.flashVars || {};
                h.mix(b, {
                    MMredirectURL: location.href,
                    MMplayerType: n.ie ? "ActiveX" : "PlugIn",
                    MMdoctitle: q.title.slice(0, 47) + " - Flash Player Installation"
                })
            }
            "full" == g ? (n.ie ? (b = c(m, f, d, 1), delete f.id, delete f.style, k = c(m, f, d, 0)) : (k = c(m, f, d, 0), delete f.id, delete f.style, b = c(m, f, d, 1)), d = b + k + t + "/" + u + v + t + "/" + u + v) : d = c(m, f, d, n.ie) + t + "/" + u + v;
            this.set("html", d);
            o ? e.insertBefore(j, o) : e.append(j, this.get("render"));
            "outerHTML" in j ? j.outerHTML = d : j.parentNode.replaceChild(e.create(d), j);
            l = e.get("#" + l, q);
            this.set("swfObject", l);
            "full" == g && (n.ie ? this.set("swfObject", l) : this.set("swfObject", l.parentNode));
            this.set("el", l);
            this.get("status") || this.set("status", i.Status.SUCCESS)
        } else this.set("status", i.Status.NOT_INSTALLED)
    }
    function z(a) {
        var b = g;
        h.each(a, function (a, d) {
            d = d.toLowerCase();
            d in B ? b += o(d, a) : d == C && (b += o(d, q(a)))
        });
        return b
    }
    function c(a, b, l, d) {
        var c = g,
			f = g;
        d == p && (d = n.ie);
        h.each(b, function (a, b) {
            c = c + (w + b + x + j + a + j)
        });
        d ? (c += w + "classid" + x + j + D + j, f += o("movie", a)) : (c += w + "data" + x + j + a + j, c += w + "type" + x + j + E + j);
        f += z(l);
        return t + u + c + v + f
    }
    function q(a) {
        var b = [];
        h.each(a, function (a, d) {
            "string" != typeof a && (a = r.stringify(a));
            a && b.push(d + "=" + F(a))
        });
        return b.join("&")
    }
    function o(a, b) {
        return '<param name="' + a + '" value="' + b + '"></param>'
    }
    var n = h.UA,
		E = "application/x-shockwave-flash",
		D = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
		C = "flashvars",
		g = "",
		w = " ",
		x = "=",
		j = '"',
		t = "<",
		v = ">",
		G = h.Env.host.document,
		A = k.fpv,
		y = k.fpvGTE,
		u = "object",
		F = encodeURIComponent,
		B = {
		    wmode: g,
		    allowscriptaccess: g,
		    allownetworking: g,
		    allowfullscreen: g,
		    play: "false",
		    loop: g,
		    menu: g,
		    quality: g,
		    scale: g,
		    salign: g,
		    bgcolor: g,
		    devicefont: g,
		    hasPriority: g,
		    base: g,
		    swliveconnect: g,
		    seamlesstabbing: g
		};
    h.extend(i, s, {
        callSWF: function (a, b) {
            var c = this.get("el"),
				d, b = b || [];
            try {
                c[a] && (d = c[a].apply(c, b))
            } catch (g) {
                d = "", 0 !== b.length && (d = "'" + b.join("', '") + "'"), d = (new Function("swf", "return swf." + a + "(" + d + ");"))(c)
            }
            return d
        },
        destroy: function () {
            this.detach();
            var a = this.get("swfObject");
            n.ie ? (a.style.display = "none",

			function () {
			    if (4 == a.readyState) {
			        for (var b in a) "function" == typeof a[b] && (a[b] = null);
			        a.parentNode.removeChild(a)
			    } else setTimeout(arguments.callee, 10)
			} ()) : a.parentNode.removeChild(a)
        }
    }, {
        ATTRS: {
            expressInstall: {
                value: h.config("base") + "swf/assets/expressInstall.swf"
            },
            src: {},
            version: {
                value: "9"
            },
            params: {
                value: {}
            },
            attrs: {
                value: {}
            },
            render: {
                setter: function (a) {
                    "string" == typeof a && (a = e.get(a, this.get("document")));
                    return a
                },
                valueFn: function () {
                    return document.body
                }
            },
            elBefore: {
                setter: function (a) {
                    "string" == typeof a && (a = e.get(a, this.get("document")));
                    return a
                }
            },
            document: {
                value: G
            },
            status: {},
            el: {},
            swfObject: {},
            html: {},
            htmlMode: {
                value: "default"
            }
        },
        fpv: A,
        fpvGTE: y
    });
    i.fpvGEQ = y;
    i.getSrc = function (a) {
        var b = a = e.get(a),
			c = "",
			d, a = [],
			c = e.nodeName(b);
        if ("object" == c) {
            (c = e.attr(b, "data")) && a.push(b);
            b = b.childNodes;
            for (c = 0; c < b.length; c++) d = b[c], 1 == d.nodeType && ("movie" == (e.attr(d, "name") || "").toLowerCase() ? a.push(d) : "embed" == e.nodeName(d) ? a.push(d) : "object" == e.nodeName(b[c]) && a.push(d))
        } else "embed" == c && a.push(b);
        b = (a = a[0]) && e.nodeName(a);
        return "embed" == b ? e.attr(a, "src") : "object" == b ? e.attr(a, "data") : "param" == b ? e.attr(a, "value") : null
    };
    i.Status = {
        TOO_LOW: "flash version is too low",
        NOT_INSTALLED: "flash is not installed",
        SUCCESS: "success"
    };
    i.HtmlMode = {
        DEFAULT: "default",
        FULL: "full"
    };
    return i
}, {
    requires: ["dom", "json", "base", "swf/ua"]
});
KISSY.add("swf/ua", function (h, e) {
    function r(c) {
        var e = "string" == typeof c ? c.match(/\d+/g).splice(0, 3) : c;
        h.isArray(e) && (c = parseFloat(e[0] + "." + s(e[1], 3) + s(e[2], 5)));
        return c || 0
    }
    function s(c, e) {
        var c = (c || 0) + "",
			i = e + 1 - c.length;
        return Array(0 < i ? i : 0).join("0") + c
    }
    function k(c) {
        if (c || i) {
            i = !1;
            var h;
            if (navigator.plugins && navigator.mimeTypes.length) h = (navigator.plugins["Shockwave Flash"] || 0).description;
            else if (z.ActiveXObject) try {
                h = (new ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")
            } catch (k) { }
            p = !h ? e : h.match(/\d+/g).splice(0, 3)
        }
        return p
    }
    var p, i = !0,
		z = h.Env.host;
    return {
        fpv: k,
        fpvGTE: function (c, e) {
            return r(k(e)) >= r(c)
        }
    }
});