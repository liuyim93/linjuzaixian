﻿KISSY.add("datalazyload", function (d, e, g, s, m) {
    function n(a, b) {
        a.style.display = t;
        a.className = "";
        var c = e.create("<div>");
        a.parentNode.insertBefore(c, a);
        e.html(c, a.value, b)
    }
    function o(a, b) {
        var c, f;
        if (!(c = a.id)) c = a.id = d.guid("ks-lazyload");
        if (!(f = b.ksLazyloadId)) f = b.ksLazyloadId = d.guid("ks-lazyload");
        return c + f
    }
    function k(a, b, c) {
        if (!a.offsetWidth) return !1;
        var f = e.offset(a),
			d = !0,
			l = f.left,
			f = f.top,
			a = {
			    left: l,
			    top: f,
			    right: l + (a._ks_lazy_width ? a._ks_lazy_width : a._ks_lazy_width = e.outerWidth(a)),
			    bottom: f + (a._ks_lazy_height ? a._ks_lazy_height : a._ks_lazy_height = e.outerHeight(a))
			};
        (b = p(b, a)) && c && (d = p(c, a));
        return d && b
    }
    function i(a, b) {
        if (!(this instanceof i)) return new i(a, b);
        var c = a;
        d.isPlainObject(c) || (c = b || {}, a && (c.container = a));
        i.superclass.constructor.call(this, c);
        this._callbacks = {};
        this._containerIsNotDocument = 9 != this.get("container").nodeType;
        this._filterItems();
        this._initLoadEvent()
    }
    function p(a, b) {
        var c, f, d, e;
        c = Math.max(a.top, b.top);
        f = Math.min(a.bottom, b.bottom);
        d = Math.max(a.left, b.left);
        e = Math.min(a.right, b.right);
        return f >= c && e >= d
    }
    var j = d.Env.host,
		q = j.document,
		t = "none",
		r = function (a, b) {
		    var b = b || "data-ks-lazyload",
				c = a.getAttribute(b);
		    c && a.src != c && (a.src = c, a.removeAttribute(b))
		};
    i.ATTRS = {
        diff: {
            value: "default"
        },
        placeholder: {
            value: "http://a.tbcdn.cn/kissy/1.0.0/build/imglazyload/spaceball.gif"
        },
        execScript: {
            value: !0
        },
        container: {
            setter: function (a) {
                a = a || q;
                d.isWindow(a) ? a = a.document : (a = e.get(a), "body" == e.nodeName(a) && (a = a.ownerDocument));
                return a
            },
            valueFn: function () {
                return q
            }
        },
        autoDestroy: {
            value: !0
        }
    };
    d.extend(i, s, {
        _filterItems: function () {
            var a = this,
				b = a.userConfig,
				c = [],
				f = [],
				h = [a.get("container")];
            d.isArray(b.container) && (a._backCompact = 1, h = b.container);
            d.each(h, function (b) {
                c = c.concat(d.filter(e.query("img", b), a._filterImg, a));
                f = f.concat(e.query("textarea.ks-datalazyload", b))
            });
            a._images = c;
            a._textareas = f
        },
        _filterImg: function (a) {
            var b = this.get("placeholder");
            return a.getAttribute("data-ks-lazyload") ? (a.src || (a.src = b), !0) : m
        },
        _initLoadEvent: function () {
            function a() {
                b._isLoadAllLazyElements() || d.ready(l)
            }
            var b = this,
				c = new Image,
				f = b.get("placeholder"),
				e = b.get("autoDestroy"),
				l = function () {
				    b._loadItems();
				    e && b._isLoadAllLazyElements() && b.destroy()
				};
            b._loadFn = d.buffer(l, 100, b);
            b.resume();
            c.src = f;
            c.complete ? a() : c.onload = a
        },
        refresh: function () {
            this._loadFn()
        },
        _loadItems: function () {
            var a, b = this.get("container");
            if (!this._containerIsNotDocument || b.offsetWidth) b = this._getBoundingRect(), !this._backCompact && this._containerIsNotDocument && (a = this._getBoundingRect(this.get("container"))), this._loadImgs(b, a), this._loadTextAreas(b,
			a), this._fireCallbacks(b, a)
        },
        _loadImgs: function (a, b) {
            this._images = d.filter(this._images, function (c) {
                return k(c, a, b) ? r(c) : !0
            }, this)
        },
        _loadTextAreas: function (a, b) {
            var c = this.get("execScript");
            this._textareas = d.filter(this._textareas, function (f) {
                return k(f, a, b) ? n(f, c) : !0
            }, this)
        },
        _fireCallbacks: function (a, b) {
            var c = this._callbacks;
            d.each(c, function (f, d) {
                var e = f.el,
					g = !1,
					i = f.fn;
                k(e, a, b) && (g = i.call(e));
                !1 !== g && delete c[d]
            })
        },
        addCallback: function (a, b) {
            var c = this._callbacks,
				a = e.get(a);
            c[o(a, b)] = {
                el: e.get(a),
                fn: b
            };
            this._loadFn()
        },
        removeCallback: function (a, b) {
            var c = this._callbacks,
				a = e.get(a);
            delete c[o(a, b)]
        },
        getElements: function () {
            return {
                images: this._images,
                textareas: this._textareas
            }
        },
        addElements: function (a) {
            "string" == typeof a ? a = e.query(a) : d.isArray(a) || (a = [a]);
            var b = this._images || [],
				c = this._textareas || [];
            d.each(a, function (a) {
                var e = a.nodeName.toLowerCase();
                "img" == e ? d.inArray(a, b) || b.push(a) : "textarea" == e && (d.inArray(a, c) || c.push(a))
            });
            this._images = b;
            this._textareas = c
        },
        removeElements: function (a) {
            "string" == typeof a ? a = e.query(a) : d.isArray(a) || (a = [a]);
            var b = [],
				c = [];
            d.each(this._images, function (c) {
                d.inArray(c, a) || b.push(c)
            });
            d.each(this._textareas, function (b) {
                d.inArray(b, a) || c.push(b)
            });
            this._images = b;
            this._textareas = c
        },
        _getBoundingRect: function (a) {
            var b, c, f;
            a !== m ? (b = e.outerHeight(a), c = e.outerWidth(a), f = e.offset(a), a = f.left, f = f.top) : (b = e.viewportHeight(), c = e.viewportWidth(), a = e.scrollLeft(), f = e.scrollTop());
            var h = this.get("diff"),
				g = 0,
				i = "default" === h ? c : h,
				j = 0,
				k = "default" === h ? b : h;
            c = a + c;
            b = f + b;
            d.isObject(h) && (g = h.left || 0, i = h.right || 0, j = h.top || 0, k = h.bottom || 0);
            return {
                left: a - g,
                top: f - j,
                right: c + i,
                bottom: b + k
            }
        },
        _isLoadAllLazyElements: function () {
            return 0 == this._images.length + this._textareas.length + (d.isEmptyObject(this._callbacks) ? 0 : 1)
        },
        pause: function () {
            var a = this._loadFn;
            if (!this._destroyed && (g.remove(j, "scroll", a), g.remove(j, "touchmove", a), g.remove(j, "resize", a), a.stop(), this._containerIsNotDocument)) {
                var b = this.get("container");
                g.remove(b, "scroll", a);
                g.remove(b, "touchmove", a)
            }
        },
        resume: function () {
            var a = this._loadFn;
            if (!this._destroyed && (g.on(j, "scroll", a), g.on(j, "touchmove", a), g.on(j, "resize", a), this._containerIsNotDocument)) {
                var b = this.get("container");
                g.on(b, "scroll", a);
                g.on(b, "touchmove", a)
            }
        },
        destroy: function () {
            this.pause();
            this._callbacks = {};
            this._images = [];
            this._textareas = [];
            this.fire("destroy");
            this._destroyed = 1
        }
    });
    i.loadCustomLazyData = function (a, b, c) {
        "img-src" === b && (b = "img");
        d.isArray(a) || (a = [e.get(a)]);
        var f = c || "data-ks-lazyload-custom",
			g = c || "ks-datalazyload-custom";
        d.each(a, function (a) {
            "img" == b ? e.query("img",
			a).each(function (a) {
			    r(a, f)
			}) : e.query("textarea." + g, a).each(function (a) {
			    n(a, !0)
			})
        })
    };
    return d.DataLazyload = i
}, {
    requires: ["dom", "event", "base"]
});