﻿/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Jan 8 21:42
*/
KISSY.add("waterfall/base", function (h, q, u) {
    function j() {
        j.superclass.constructor.apply(this, arguments);
        this._init()
    }
    function r(a, b, c, f) {
        var k = {}, s, g;
        k.stop = function () {
            s && (clearTimeout(s), g = [], a.each(function (a) {
                a.stop()
            }))
        };
        k.start = function () {
            g = [].concat(h.makeArray(a));
            0 < g.length ? function () {
                var k = +new Date;
                do {
                    var n = g.shift();
                    b.call(c, n)
                } while (0 < g.length && 50 > +new Date - k);
                0 < g.length ? s = setTimeout(arguments.callee, 25) : f && f.call(c, a)
            } () : f && f.call(c, a)
        };
        return k
    }
    function v() {
        var a = this.get("container"),
			b = this._containerRegion || {};
        a[0].offsetWidth && !(b && a.width() === b.width) && this.adjust()
    }
    function t() {
        var a = this.get("container").width(),
			b = this.get("curColHeights");
        b.length = Math.max(Math.floor(a / this.get("colWidth")), this.get("minColCount"));
        this._containerRegion = {
            width: a
        };
        h.each(b, function (a, f) {
            b[f] = 0
        });
        this.set("colItems", [])
    }
    function p(a, b, c, f) {
        function k(c) {
            d[i] += g.outerHeight(!0);
            var b = a.get("colItems");
            b[i] = b[i] || [];
            b[i].push(g);
            g.attr("data-waterfall-col", i);
            b = g[0].className.replace(/\s*ks-waterfall-col-(?:first|last|\d+)/g,
				"");
            b += " ks-waterfall-col-" + i;
            0 == i ? b += " ks-waterfall-col-first" : i == d.length - 1 && (b += " ks-waterfall-col-last");
            g[0].className = b;
            c || f && f()
        }
        var s = a.get("effect"),
			g = m(c),
			o = a.get("align"),
			n, d = a.get("curColHeights"),
			c = a.get("container"),
			h = a.get("colWidth"),
			l = d.length,
			i = 0,
			j = a._containerRegion;
        n = Number.MAX_VALUE;
        if (l) {
            if (g.hasClass("ks-waterfall-fixed-left")) i = 0;
            else if (g.hasClass("ks-waterfall-fixed-right")) i = 0 < l ? l - 1 : 0;
            else for (var e = 0; e < l; e++) d[e] < n && (n = d[e], i = e);
            n = "left" === o ? 0 : Math.max(j.width - l * a.get("colWidth"),
			0);
            "center" === o && (n /= 2);
            "justify" === o && 1 < l && (n = 0 < i ? Math.max((j.width - h) / (l - 1) - h, 0) * i : 0);
            o = {
                left: i * h + n,
                top: d[i]
            };
            b ? (g.css(o), s && s.effect && g.css("visibility", "hidden"), c.append(g), k()) : (b = a.get("adjustEffect")) ? (k(1), g.animate(o, b.duration, b.easing, f)) : (g.css(o), k());
            return g
        }
    }
    function e(a) {
        var a = p(this, !0, a),
			b = this.get("effect");
        a && b && b.effect && (a.hide(), a.css("visibility", ""), a[b.effect](b.duration, 0, b.easing))
    }
    var m = q.all,
		d = h.Env.host;
    j.ATTRS = {
        container: {
            setter: function (a) {
                return m(a)
            }
        },
        curColHeights: {
            value: []
        },
        align: {
            value: "center"
        },
        minColCount: {
            value: 1
        },
        effect: {
            value: {
                effect: "fadeIn",
                duration: 1
            }
        },
        colWidth: {},
        colItems: {
            value: []
        },
        adjustEffect: {}
    };
    h.extend(j, u, {
        isAdjusting: function () {
            return !!this._adjuster
        },
        isAdding: function () {
            return !!this._adder
        },
        _init: function () {
            var a;
            a = this.__onResize = h.buffer(v, 50, this);
            a();
            m(d).on("resize", a)
        },
        adjustItem: function (a, b) {
            function c() {
                i--;
                0 >= i && (f._adjuster = 0, b.callback && b.callback.call(f))
            }
            var f = this,
				b = b || {};
            if (!f.isAdjusting()) {
                var k = a.outerHeight(!0),
					d;
                b.process && (d = b.process.call(f));
                void 0 === d && (d = a.outerHeight(!0));
                var g = d - k,
					e = f.get("curColHeights"),
					h = parseInt(a.attr("data-waterfall-col")),
					j = f.get("colItems")[h],
					k = [];
                d = Math.max.apply(Math, e);
                for (var m = 0; m < j.length && j[m][0] !== a[0]; m++);
                for (m++; m < j.length; ) k.push(j[m]), m++;
                e[h] += g;
                e = Math.max.apply(Math, e);
                e != d && f.get("container").height(e);
                var l = b.effect,
					i = k.length;
                if (!i) return b.callback && b.callback.call(f);
                void 0 === l && (l = f.get("adjustEffect"));
                f._adjuster = r(k, function (a) {
                    l ? a.animate({
                        top: parseInt(a.css("top")) + g
                    }, l.duration, l.easing, c) : (a.css("top", parseInt(a.css("top")) + g), c())
                });
                f._adjuster.start();
                return f._adjuster
            }
        },
        removeItem: function (a, b) {
            var b = b || {}, c = this,
				f = b.callback;
            c.adjustItem(a, h.mix(b, {
                process: function () {
                    a.remove();
                    return 0
                },
                callback: function () {
                    for (var b = parseInt(a.attr("data-waterfall-col")), b = c.get("colItems")[b], d = 0; d < b.length; d++) if (b[d][0] == a[0]) {
                        b.splice(d, 1);
                        break
                    }
                    f && f()
                }
            }))
        },
        adjust: function (a) {
            function b() {
                e--;
                0 >= e && (c.get("container").height(Math.max.apply(Math, c.get("curColHeights"))),
				c._adjuster = 0, a && a.call(c), c.fire("adjustComplete", {
				    items: d
				}))
            }
            var c = this,
				d = c.get("container").all(".ks-waterfall");
            c.isAdjusting() && (c._adjuster.stop(), c._adjuster = 0);
            t.call(c);
            var e = d.length;
            if (!e) return a && a.call(c);
            c._adjuster = r(d, function (a) {
                p(c, false, a, b)
            });
            c._adjuster.start();
            return c._adjuster
        },
        addItems: function (a, b) {
            var c = this;
            c._adder = r(a, e, c, function () {
                c.get("container").height(Math.max.apply(Math, c.get("curColHeights")));
                c._adder = 0;
                b && b.call(c);
                c.fire("addComplete", {
                    items: a
                })
            });
            c._adder.start();
            return c._adder
        },
        destroy: function () {
            var a = this.__onResize;
            m(d).detach("resize", a);
            a.stop();
            this.fire("destroy");
            this.__destroyed = 1
        }
    });
    return j
}, {
    requires: ["node", "base"]
});
KISSY.add("waterfall/loader", function (h, q, u) {
    function j() {
        j.superclass.constructor.apply(this, arguments)
    }
    function r() {
        if (!this.__loading) if (this.isAdjusting()) this.__onScroll();
        else {
            var e = this.get("container");
            if (e[0].offsetWidth) {
                var e = e.offset().top,
					h = this.get("diff"),
					d = this.get("curColHeights");
                d.length && (e += Math.min.apply(Math, d));
                h + t(p).scrollTop() + t(p).height() >= e && v.call(this)
            }
        }
    }
    function v() {
        function e(a, c) {
            d.__loading = 0;
            d.addItems(a, function () {
                c && c.apply(this, arguments);
                r.call(d)
            })
        }
        function h() {
            d.end()
        }
        var d = this;
        d.get("container");
        d.__loading = 1;
        var a = d.get("load");
        a && a(e, h)
    }
    var t = q.all,
		p = h.Env.host;
    j.ATTRS = {
        diff: {
            value: 0
        }
    };
    h.extend(j, u, {
        _init: function () {
            j.superclass._init.apply(this, arguments);
            this.__onScroll = h.buffer(r, 50, this);
            this.__onScroll();
            this.start()
        },
        start: function () {
            this.resume()
        },
        end: function () {
            this.pause()
        },
        pause: function () {
            this.__destroyed || (t(p).detach("scroll", this.__onScroll), this.__onScroll.stop())
        },
        resume: function () {
            this.__destroyed || (t(p).on("scroll", this.__onScroll), this.__started = 1)
        },
        destroy: function () {
            this.end();
            j.superclass.destroy.apply(this, arguments)
        }
    });
    return j
}, {
    requires: ["node", "./base"]
});
KISSY.add("waterfall", function (h, q, u) {
    q.Loader = u;
    return q
}, {
    requires: ["waterfall/base", "waterfall/loader"]
});