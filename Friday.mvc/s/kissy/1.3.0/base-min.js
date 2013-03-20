﻿/*
Copyright 2012, KISSY UI Library v1.30
MIT Licensed
build time: Dec 20 22:23
*/
KISSY.add("base/attribute", function (j, i) {
    function k(a, b) {
        return "string" == typeof b ? a[b] : b
    }
    function m(a, b, c, d, e, g, f) {
        f = f || c;
        return a.fire(b + j.ucfirst(c) + "Change", {
            attrName: f,
            subAttrName: g,
            prevVal: d,
            newVal: e
        })
    }
    function h(a, b, c) {
        var d = a[b] || {};
        c && (a[b] = d);
        return d
    }
    function f(a) {
        return h(a, "__attrs", !0)
    }
    function n(a) {
        return h(a, "__attrVals", !0)
    }
    function q(a, b) {
        for (var c = 0, d = b.length; a != i && c < d; c++) a = a[b[c]];
        return a
    }
    function r(a, b) {
        var c;
        !a.hasAttr(b) && -1 !== b.indexOf(".") && (c = b.split("."), b = c.shift());
        return {
            path: c,
            name: b
        }
    }
    function s(a, b, c) {
        var d = c;
        if (b) {
            var a = d = a === i ? {} : j.clone(a),
				e = b.length - 1;
            if (0 <= e) {
                for (var g = 0; g < e; g++) a = a[b[g]];
                a != i && (a[b[g]] = c)
            }
        }
        return d
    }
    function t(a, b, c, d, e) {
        var d = d || {}, g, f, l;
        l = r(a, b);
        var h = b,
			b = l.name;
        g = l.path;
        l = a.get(b);
        g && (f = q(l, g));
        if (!g && l === c || g && f === c) return i;
        c = s(l, g, c);
        if (!d.silent && !1 === m(a, "before", b, l, c, h)) return !1;
        c = a.setInternal(b, c, d);
        if (!1 === c) return c;
        d.silent || (c = n(a)[b], m(a, "after", b, l, c, h), e ? e.push({
            prevVal: l,
            newVal: c,
            attrName: b,
            subAttrName: h
        }) : m(a, "",
			"*", [l], [c], [h], [b]));
        return a
    }
    function o() { }
    function p(a, b) {
        var c = f(a),
			d = h(c, b),
			e = d.valueFn;
        if (e && (e = k(a, e))) e = e.call(a), e !== i && (d.value = e), delete d.valueFn, c[b] = d;
        return d.value
    }
    function u(a, b, c, d) {
        var e, g;
        e = r(a, b);
        b = e.name;
        if (e = e.path) g = a.get(b), c = s(g, e, c);
        if ((e = h(f(a), b, !0).validator) && (e = k(a, e))) if (a = e.call(a, c, b, d), a !== i && !0 !== a) return a;
        return i
    }
    o.INVALID = {};
    var v = o.INVALID;
    o.prototype = {
        getAttrs: function () {
            return f(this)
        },
        getAttrVals: function () {
            var a = {}, b, c = f(this);
            for (b in c) a[b] = this.get(b);
            return a
        },
        addAttr: function (a, b, c) {
            var d = f(this),
				b = j.clone(b);
            d[a] ? j.mix(d[a], b, c) : d[a] = b;
            return this
        },
        addAttrs: function (a, b) {
            var c = this;
            j.each(a, function (a, b) {
                c.addAttr(b, a)
            });
            b && c.set(b);
            return c
        },
        hasAttr: function (a) {
            return f(this).hasOwnProperty(a)
        },
        removeAttr: function (a) {
            this.hasAttr(a) && (delete f(this)[a], delete n(this)[a]);
            return this
        },
        set: function (a, b, c) {
            if (j.isPlainObject(a)) {
                var c = b,
					b = Object(a),
					d = [],
					e, g = [];
                for (a in b) (e = u(this, a, b[a], b)) !== i && g.push(e);
                if (g.length) return c && c.error && c.error(g), !1;
                for (a in b) t(this, a, b[a], c, d);
                var f = [],
					h = [],
					n = [],
					k = [];
                j.each(d, function (a) {
                    h.push(a.prevVal);
                    n.push(a.newVal);
                    f.push(a.attrName);
                    k.push(a.subAttrName)
                });
                f.length && m(this, "", "*", h, n, k, f);
                return this
            }
            return t(this, a, b, c)
        },
        setInternal: function (a, b, c) {
            var d, e, g = h(f(this), a, !0).setter;
            e = u(this, a, b);
            if (e !== i) return c.error && c.error(e), !1;
            if (g && (g = k(this, g))) d = g.call(this, b, a);
            if (d === v) return !1;
            d !== i && (b = d);
            n(this)[a] = b
        },
        get: function (a) {
            var b, c = this.hasAttr(a),
				d = n(this),
				e;
            !c && -1 !== a.indexOf(".") && (b = a.split("."), a = b.shift());
            c = h(f(this), a).getter;
            e = a in d ? d[a] : p(this, a);
            if (c && (c = k(this, c))) e = c.call(this, e, a);
            !(a in d) && e !== i && (d[a] = e);
            b && (e = q(e, b));
            return e
        },
        reset: function (a, b) {
            if ("string" == typeof a) return this.hasAttr(a) ? this.set(a, p(this, a), b) : this;
            var b = a,
				c = f(this),
				d = {};
            for (a in c) d[a] = p(this, a);
            this.set(d, b);
            return this
        }
    };
    return o
});
KISSY.add("base", function (j, i, k) {
    function m(h) {
        var f = this.constructor;
        for (this.userConfig = h; f; ) {
            var i = f.ATTRS;
            if (i) {
                var j = void 0;
                for (j in i) this.addAttr(j, i[j], !1)
            }
            f = f.superclass ? f.superclass.constructor : null
        }
        if (h) for (var k in h) this.setInternal(k, h[k])
    }
    j.augment(m, k.Target, i);
    m.Attribute = i;
    return j.Base = m
}, {
    requires: ["base/attribute", "event/custom"]
});