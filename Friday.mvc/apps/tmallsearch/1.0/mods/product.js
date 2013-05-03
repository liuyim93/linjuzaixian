KISSY.add(V + "/mods/product", function (d) {
    var g = d.DOM,
		e = d.Event,
		h = g.val("#J_ProductDsr"),
		f = d.query(".j_ProDsr"),
		c = d.query(".j_ProOrderTime");

    function b() {
        if (!(h && f.length > 0)) {
            return
        }
        var i = {
            "1": "TOP20",
            "2": "\u9ad8\u4e8e\u5e73\u5747\u6c34\u5e73"
        };
        d.io({
            url: h + "?t=" + +new Date,
            type: "post",
            success: function (j) {
                d.each(f, function (n, l) {
                    var m = "",
						k, o = j["productDSR" + (l + 1)];
                    if (o.level) {
                        k = i[o.level] || "";
                        m = "\u6ee1\u610f\u5ea6" + o.Score + "<em>" + k + "</em>"
                    }
                    g.html(n, m)
                })
            },
            dataType: "json"
        })
    }
    function a() {
        if (!(c && c.length)) {
            return
        }
        var i = function (o) {
            if (!o) {
                return ""
            }
            var q = o.substr(0, 4) || "0000";
            var p = o.substr(4, 2) || "00";
            var n = o.substr(6, 2) || "00";
            var l = o.substr(8, 2) || "00";
            var j = o.substr(10, 2) || "00";
            var k = o.substr(12, 2) || "00";
            return {
                y: parseInt(q, 10),
                M: parseInt(p, 10),
                d: parseInt(n, 10),
                h: parseInt(l, 10),
                m: parseInt(j, 10),
                s: parseInt(k, 10)
            }
        };
        d.each(c, function (j) {
            d.use(V + "/widget/timer", function (p, q) {
                var o = i(g.attr(j, "data-now") || "");
                var l = i(g.attr(j, "data-end") || "");
                var r = i(g.attr(j, "data-start") || "");
                o = new Date(o.y, o.M, o.d, o.h, o.m, o.s).getTime();
                l = new Date(l.y, l.M, l.d, l.h, l.m, l.s).getTime();
                r = new Date(r.y, r.M, r.d, r.h, r.m, r.s).getTime();
                var n = function (t) {
                    var s = g.parent(t, "p");
                    var u = g.parent(t, ".product");
                    g.addClass(s, "productOrder-end");
                    g.html(s, "<i></i><em>\u9884\u552e\u7ed3\u675f</em>");
                    g.css(s, "width", "auto");
                    g.hide(p.get(".productPrice-tips", u))
                };
                var m = function (u) {
                    var s = g.parent(u, "p");
                    var t = g.get("em", s);
                    console.log(s);
                    t && g.html(t, "\u5373\u5c06\u5f00\u59cb")
                };
                var k = function (s, t, v) {
                    var u = (s - t) / 1000;
                    new q({
                        leftTime: u,
                        container: j,
                        tpl: u <= 86400 ? "{h}:{m}:{s}" : "{d}\u5929 {h}:{m}:{s}"
                    }).run().onStop(function () {
                        v()
                    })
                };
                if (r > o) {
                    m(j);
                    k(r, o, function () {
                        k(l, o, function () {
                            n(j)
                        })
                    })
                } else {
                    if (o >= l) {
                        n(j)
                    } else {
                        k(l, o, function () {
                            n(j)
                        })
                    }
                }
            })
        })
    }
    return {
        init: function () {
            b();
            a()
        }
    }
});