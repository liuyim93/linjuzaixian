KISSY.add("wangpu/mods/official/self-defined", function (c, f) {
    var e = document,
		d = c.DOM,
		b = c.Event;

    function a(h) {
        var g = this;
        g._mod = h.mod;
        if (!g._mod) {
            return
        }
        g._init()
    }
    c.augment(a, {
        _init: function () {
            c.log("SelfDefined init start");
            var g = this;
            g._initFilter();
            c.log("SelfDefined init end")
        },
        _initFilter: function () {
            var q = this,
				i = "\u60a8\u9009\u4e2d\u7684\u5185\u5bb9\u53ef\u80fd\u6709\u5b89\u5168\u9690\u60a3,\u8bf7\u8c28\u614e\u4f7f\u7528! ",
				h = d.get(".shop-custom", q._mod),
				k = e.createElement("div"),
				o = "<.+(?:",
				p = ").+>",
				m = "\\s*",
				n = /[\r\n]+/g,
				g = [
					["display", "none"],
					["visibility", "hidden"],
					["width", "0"],
					["text-indent", "-\\d{3,}"]
				],
				j = [],
				l, r;
            c.each(g, function (s) {
                j.push(s[0] + m + ":" + m + s[1])
            });
            l = o + j.join("|") + p;
            r = new RegExp(l, "mi");
            b.on(h, "copy", function (t) {
                var s, u;
                if (window.getSelection) {
                    s = window.getSelection()
                } else {
                    if (e.selection) {
                        s = e.selection.createRange()
                    }
                }
                u = s.htmlText || s.getRangeAt(0).cloneContents();
                if ("string" !== typeof u) {
                    k.appendChild(u);
                    u = k.innerHTML
                }
                u = u.replace(n, "");
                if (r.test(u)) {
                    alert(i);
                    t.halt()
                }
                k.innerHTML = ""
            })
        }
    });
    a.selector = ".tshop-pbsm-ssd10c";
    return a
}, {
    requires: ["core"]
});