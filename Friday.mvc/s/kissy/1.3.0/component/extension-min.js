﻿KISSY.add("component/extension/align", function (e, c, m) {
    function h(a) {
        var d = a.ownerDocument.body,
			g = c.css(a, "position");
        if (!("fixed" == g || "absolute" == g)) return "html" == a.nodeName.toLowerCase() ? null : a.parentNode;
        for (a = a.parentNode; a && a != d; a = a.parentNode) if (g = c.css(a, "position"), "static" != g) return a;
        return null
    }
    function n(a) {
        var d, g, b = {
            left: 0,
            right: Infinity,
            top: 0,
            bottom: Infinity
        }, k;
        g = a.ownerDocument;
        d = g.body;
        for (g = g.documentElement; a = h(a); ) if ((!t.ie || 0 != a.clientWidth) && a != d && a != g && "visible" != c.css(a, "overflow")) k = c.offset(a), k.left += a.clientLeft, k.top += a.clientTop, b.top = Math.max(b.top, k.top), b.right = Math.min(b.right, k.left + a.clientWidth), b.bottom = Math.min(b.bottom, k.top + a.clientHeight), b.left = Math.max(b.left, k.left);
        a = c.scrollLeft();
        k = c.scrollTop();
        b.left = Math.max(b.left, a);
        b.top = Math.max(b.top, k);
        d = c.viewportWidth();
        g = c.viewportHeight();
        b.right = Math.min(b.right, a + d);
        b.bottom = Math.min(b.bottom, k + g);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    }
    function p(a, d, g, b) {
        var c, j;
        c = a.left;
        j = a.top;
        d = r(d, g[0]);
        a = r(a, g[1]);
        a = [a.left - d.left, a.top - d.top];
        return {
            left: c - a[0] + +b[0],
            top: j - a[1] + +b[1]
        }
    }
    function q(a, d, g) {
        var b = [];
        e.each(a, function (a) {
            b.push(a.replace(d, function (a) {
                return g[a]
            }))
        });
        return b
    }
    function o() { }
    function s(a) {
        var d, g;
        e.isWindow(a[0]) ? (d = {
            left: c.scrollLeft(),
            top: c.scrollTop()
        }, g = c.viewportWidth(), a = c.viewportHeight()) : (d = a.offset(), g = a.outerWidth(), a = a.outerHeight());
        d.width = g;
        d.height = a;
        return d
    }
    function r(a, d) {
        var g = d.charAt(0),
			b = d.charAt(1),
			c = a.width,
			e = a.height,
			f, i;
        f = a.left;
        i = a.top;
        "c" === g ? i += e / 2 : "b" === g && (i += e);
        "c" === b ? f += c / 2 : "r" === b && (f += c);
        return {
            left: f,
            top: i
        }
    }
    var u = e.Env.host,
		t = e.UA;
    o.__getOffsetParent = h;
    o.__getVisibleRectForElement = n;
    o.ATTRS = {
        align: {
            value: {}
        }
    };
    o.prototype = {
        _onSetAlign: function (a) {
            a && a.points && this.align(a.node, a.points, a.offset, a.overflow)
        },
        align: function (a, d, c, b) {
            var a = m.one(a || u),
				c = c && [].concat(c) || [0, 0],
				b = b || {}, k = this.get("el"),
				j = 0,
				f = n(k[0]),
				i = s(k),
				h = s(a),
				a = p(i, h, d, c),
				l = e.merge(i, a);
            if (f && (b.adjustX || b.adjustY)) {
                if (a.left < f.left || a.left + i.width > f.right) j = 1, d = q(d, /[lr]/ig, {
                    l: "r",
                    r: "l"
                }), c[0] = -c[0];
                if (a.top < f.top || a.top + i.height > f.bottom) j = 1, d = q(d, /[tb]/ig, {
                    t: "b",
                    b: "t"
                }), c[1] = -c[1];
                j && (a = p(i, h, d, c), e.mix(l, a));
                d = {};
                d.adjustX = b.adjustX && (a.left < f.left || a.left + i.width > f.right);
                d.adjustY = b.adjustY && (a.top < f.top || a.top + i.height > f.bottom);
                if (d.adjustX || d.adjustY) b = e.clone(a), j = {
                    width: i.width,
                    height: i.height
                }, d.adjustX && b.left < f.left && (b.left = f.left), d.resizeWidth && b.left >= f.left && b.left + j.width > f.right && (j.width -= b.left + j.width - f.right), d.adjustX && b.left + j.width > f.right && (b.left = Math.max(f.right - j.width, f.left)), d.adjustY && b.top < f.top && (b.top = f.top), d.resizeHeight && b.top >= f.top && b.top + j.height > f.bottom && (j.height -= b.top + j.height - f.bottom), d.adjustY && b.top + j.height > f.bottom && (b.top = Math.max(f.bottom - j.height, f.top)), l = e.mix(b, j)
            }
            l.left != i.left && (this.setInternal("x", null), this.get("view").setInternal("x", null), this.set("x", l.left));
            l.top != i.top && (this.setInternal("y", null), this.get("view").setInternal("y", null), this.set("y", l.top));
            l.width != i.width && k.width(k.width() + l.width - i.width);
            l.height != i.height && k.height(k.height() + l.height - i.height);
            return this
        },
        center: function (a) {
            this.set("align", {
                node: a,
                points: ["cc", "cc"],
                offset: [0, 0]
            });
            return this
        }
    };
    return o
}, {
    requires: ["dom", "node"]
});
KISSY.add("component/extension/content-box-render", function (e, c, m) {
    function h() { }
    h.ATTRS = {
        contentEl: {}
    };
    h.prototype = {
        __createDom: function () {
            var e, h = this.get("el");
            e = h[0].childNodes;
            e = e.length && m._nodeListToFragment(e);
            e = c.all("<div class='" + this.get("prefixCls") + "contentbox'></div>").append(e);
            h.append(e);
            this.setInternal("contentEl", e)
        }
    };
    return h
}, {
    requires: ["node", "dom"]
});
KISSY.add("component/extension/content-box", function () {
    function e() { }
    e.ATTRS = {
        contentEl: {
            view: 1
        }
    };
    return e
});
KISSY.add("component/extension", function (e, c, m, h, n, p, q) {
    n.Render = p;
    m.Render = h;
    return {
        Align: c,
        ContentBox: m,
        Position: n,
        Shim: {
            Render: q
        }
    }
}, {
    requires: "./extension/align,./extension/content-box,./extension/content-box-render,./extension/position,./extension/position-render,./extension/shim-render".split(",")
});
KISSY.add("component/extension/position-render", function () {
    function e() { }
    e.ATTRS = {
        x: {},
        y: {},
        zIndex: {},
        visibleMode: {
            value: "visibility"
        }
    };
    e.prototype = {
        __createDom: function () {
            this.get("el").addClass(this.get("prefixCls") + "ext-position")
        },
        _onSetZIndex: function (c) {
            this.get("el").css("z-index", c)
        },
        _onSetX: function (c) {
            null != c && this.get("el").offset({
                left: c
            })
        },
        _onSetY: function (c) {
            null != c && this.get("el").offset({
                top: c
            })
        }
    };
    return e
});
KISSY.add("component/extension/position", function (e) {
    function c() { }
    c.ATTRS = {
        x: {
            view: 1
        },
        y: {
            view: 1
        },
        xy: {
            setter: function (c) {
                var h = e.makeArray(c);
                h.length && (h[0] && this.set("x", h[0]), h[1] && this.set("y", h[1]));
                return c
            },
            getter: function () {
                return [this.get("x"), this.get("y")]
            }
        },
        zIndex: {
            view: 1
        },
        visible: {
            value: !1
        }
    };
    c.prototype = {
        move: function (c, h) {
            e.isArray(c) && (h = c[1], c = c[0]);
            this.set("xy", [c, h]);
            return this
        }
    };
    return c
});
KISSY.add("component/extension/shim-render", function () {
    function e() { }
    e.prototype = {
        __createDom: function () {
            this.get("el").prepend("<iframe style='position: absolute;border: none;width: expression(this.parentNode.clientWidth);top: 0;opacity: 0;filter: alpha(opacity=0);left: 0;z-index: -1;height: expression(this.parentNode.clientHeight);'/>")
        }
    };
    return e
});