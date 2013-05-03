(function (d) {
    var b = d.DOM,
		k = d.Event,
		h = window,
		j = document,
		i = "data-atp",
		l = "atpanel";

    function e(p) {
        var o, n, m = p;
        while (p && p.tagName != "HTML" && p.tagName != "BODY" && p.getAttribute) {
            n = p.getAttribute(i);
            if (n) {
                o = n;
                m = p;
                break
            }
            if (!(p = p.parentNode)) {
                break
            }
        }
        return {
            atpAttr: o,
            el: m
        }
    }
    function f(n) {
        var m = n.split(","),
			o, p = {};
        d.each(m, function (q) {
            if (o = /{(.*)}/.exec(q)) {
                o = o[1]
            }
            if (o) {
                p[o] = ""
            }
        });
        return p
    }
    function c(q, o) {
        if (!q || q.tagName != "A") {
            return
        }
        if (o !== "text") {
            var p = new RegExp("(\\?|\\&)" + o + "=([^&#]*)(\\&|\\#|$)", "g"),
				n = q.href || q.link || "",
				r, m;
            r = (m = p.exec(n)) ? m[2] : b.attr(q, "data-" + o) || ""
        } else {
            r = b.text(q)
        }
        return r
    }
    function g(q) {
        var r = e(q),
			p = r.el,
			m = r.atpAttr,
			n = arguments;
        if (p && m) {
            var s = f(m),
				o = d.query("a", p);
            d.each(o, function (x, t) {
                if (x._atped) {
                    return
                }
                var v = e(x);
                if (v.el == p) {
                    var w, u;
                    for (u in s) {
                        s[u] = c(x, u)
                    }
                    s.loc = t + 1;
                    w = d.substitute(m, s);
                    !b.hasAttr(x, l) && b.attr(x, l, w);
                    x._atped = true
                } else { }
            })
        }
    }
    function a(m) {
        var m = m.split(","),
			p = h.__list_atpanel_param || "",
			q = {
			    pos: m[0] || "",
			    itemid: m[1] || "",
			    clickid: m[1] || "",
			    itemcat: m[2] || "",
			    itemspu: m[3] || "",
			    fromtab: m[4] || "",
			    type: m[5] || "",
			    combo: m[6] || "",
			    shopid: m[7] || ""
			};
        p += d.param(q);
        if (typeof goldlog !== "undefined") {
            goldlog.record("/mallsearch", "tmallsearch", p, "H1449172242")
        } else {
            var n = new Image(),
				o = "_img_" + Math.random();
            h[o] = n;
            n.onload = n.onerror = function () {
                h[o] = null
            };
            n.src = ("https:" == location.protocol ? "https:" : "http:") + "//log.mmstat.com/mallsearch?goldlog=undefined&" + p;
            n = null
        }
    }
    k.delegate && k.delegate(j.body, "mouseenter", "a", function (n) {
        var m = n.currentTarget;
        if (m._atped) {
            return
        }
        if (b.attr(m, l)) {
            m._atped = true;
            return
        }
        g(m)
    });
    if (!h.atpanelFun) {
        k.on(j.body, "click", function (n) {
            var o = n.target || n.srcElement,
				m = b.attr(o, "atpanel") || (b.parent(o) && b.attr(b.parent(o), "atpanel"));
            if (m) {
                a(m)
            }
        });
        h.atpanelFun = a
    }
})(KISSY); 