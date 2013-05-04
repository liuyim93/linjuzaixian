﻿ /*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Apr 15 11:58
*/
var KISSY = function(a) {
    var b = this, j, k = 0;
    j = {__BUILD_TIME: "20130415115744",Env: {host: b,nodejs: "function" == typeof require && "object" == typeof exports},Config: {debug: "",fns: {}},version: "1.30",config: function(b, i) {
            var l, g, f = this, d, c = j.Config, e = c.fns;
            j.isObject(b) ? j.each(b, function(m, a) {
                (d = e[a]) ? d.call(f, m) : c[a] = m
            }) : (l = e[b], i === a ? g = l ? l.call(f) : c[b] : l ? g = l.call(f, i) : c[b] = i);
            return g
        },log: function(h, i, l) {
            if (j.Config.debug && (l && (h = l + ": " + h), b.console !== a && console.log))
                console[i && console[i] ? i : "log"](h)
        },
        error: function(a) {
            if (j.Config.debug)
                throw a instanceof Error ? a : Error(a);
        },guid: function(a) {
            return (a || "") + k++
        }};
    j.Env.nodejs && (j.KISSY = j, module.exports = j);
    return j
}();
(function(a, b) {
    function j() {
    }
    function k(e, a) {
        var b;
        d ? b = d(e) : (j.prototype = e, b = new j);
        b.constructor = a;
        return b
    }
    function h(e, d, c, g, h, j) {
        if (!d || !e)
            return e;
        c === b && (c = f);
        var k = 0, s, u, v;
        d[l] = e;
        j.push(d);
        if (g) {
            v = g.length;
            for (k = 0; k < v; k++)
                s = g[k], s in d && i(s, e, d, c, g, h, j)
        } else {
            u = a.keys(d);
            v = u.length;
            for (k = 0; k < v; k++)
                s = u[k], s != l && i(s, e, d, c, g, h, j)
        }
        return e
    }
    function i(e, d, c, g, i, j, k) {
        if (g || !(e in d) || j) {
            var s = d[e], c = c[e];
            if (s === c)
                s === b && (d[e] = s);
            else if (j && c && (a.isArray(c) || a.isPlainObject(c)))
                c[l] ? d[e] = c[l] : (j = s && 
                (a.isArray(s) || a.isPlainObject(s)) ? s : a.isArray(c) ? [] : {}, d[e] = j, h(j, c, g, i, f, k));
            else if (c !== b && (g || !(e in d)))
                d[e] = c
        }
    }
    var l = "__MIX_CIRCULAR", g = this, f = !0, d = Object.create, c = !{toString: 1}.propertyIsEnumerable("toString"), e = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toString,toLocaleString,valueOf".split(",");
    (function(e, a) {
        for (var d in a)
            e[d] = a[d]
    })(a, {stamp: function(e, d, c) {
            if (!e)
                return e;
            var c = c || "__~ks_stamped", f = e[c];
            if (!f && !d)
                try {
                    f = e[c] = a.guid(c)
                } catch (g) {
                    f = b
                }
            return f
        },keys: function(a) {
            var d = 
            [], b, f;
            for (b in a)
                d.push(b);
            if (c)
                for (f = e.length - 1; 0 <= f; f--)
                    b = e[f], a.hasOwnProperty(b) && d.push(b);
            return d
        },mix: function(e, a, d, b, c) {
            "object" === typeof d && (b = d.whitelist, c = d.deep, d = d.overwrite);
            var f = [], g = 0;
            for (h(e, a, d, b, c, f); a = f[g++]; )
                delete a[l];
            return e
        },merge: function(e) {
            var e = a.makeArray(arguments), d = {}, b, c = e.length;
            for (b = 0; b < c; b++)
                a.mix(d, e[b]);
            return d
        },augment: function(e, d) {
            var c = a.makeArray(arguments), f = c.length - 2, g = 1, i = c[f], h = c[f + 1];
            a.isArray(h) || (i = h, h = b, f++);
            a.isBoolean(i) || (i = b, f++);
            for (; g < 
            f; g++)
                a.mix(e.prototype, c[g].prototype || c[g], i, h);
            return e
        },extend: function(e, d, c, b) {
            if (!d || !e)
                return e;
            var f = d.prototype, g;
            g = k(f, e);
            e.prototype = a.mix(g, e.prototype);
            e.superclass = k(f, d);
            c && a.mix(g, c);
            b && a.mix(e, b);
            return e
        },namespace: function() {
            var e = a.makeArray(arguments), d = e.length, c = null, b, i, h, j = e[d - 1] === f && d--;
            for (b = 0; b < d; b++) {
                h = ("" + e[b]).split(".");
                c = j ? g : this;
                for (i = g[h[0]] === c ? 1 : 0; i < h.length; ++i)
                    c = c[h[i]] = c[h[i]] || {}
            }
            return c
        }})
})(KISSY);
(function(a, b) {
    var j = Array.prototype, k = j.indexOf, h = j.lastIndexOf, i = j.filter, l = j.every, g = j.some, f = j.map;
    a.mix(a, {each: function(d, c, e) {
            if (d) {
                var m, f, g = 0;
                m = d && d.length;
                f = m === b || "function" === a.type(d);
                e = e || null;
                if (f)
                    for (f = a.keys(d); g < f.length && !(m = f[g], !1 === c.call(e, d[m], m, d)); g++)
                        ;
                else
                    for (f = d[0]; g < m && !1 !== c.call(e, f, g, d); f = d[++g])
                        ;
            }
            return d
        },indexOf: k ? function(d, a) {
            return k.call(a, d)
        } : function(d, a) {
            for (var e = 0, b = a.length; e < b; ++e)
                if (a[e] === d)
                    return e;
            return -1
        },lastIndexOf: h ? function(d, a) {
            return h.call(a, 
            d)
        } : function(d, a) {
            for (var e = a.length - 1; 0 <= e && a[e] !== d; e--)
                ;
            return e
        },unique: function(d, b) {
            var e = d.slice();
            b && e.reverse();
            for (var m = 0, f, g; m < e.length; ) {
                for (g = e[m]; (f = a.lastIndexOf(g, e)) !== m; )
                    e.splice(f, 1);
                m += 1
            }
            b && e.reverse();
            return e
        },inArray: function(d, b) {
            return -1 < a.indexOf(d, b)
        },filter: i ? function(a, b, e) {
            return i.call(a, b, e || this)
        } : function(d, b, e) {
            var m = [];
            a.each(d, function(a, d, f) {
                b.call(e || this, a, d, f) && m.push(a)
            });
            return m
        },map: f ? function(a, b, e) {
            return f.call(a, b, e || this)
        } : function(a, b, e) {
            for (var m = 
            a.length, f = Array(m), g = 0; g < m; g++) {
                var i = "string" == typeof a ? a.charAt(g) : a[g];
                if (i || g in a)
                    f[g] = b.call(e || this, i, g, a)
            }
            return f
        },reduce: function(a, c, e) {
            var m = a.length;
            if ("function" !== typeof c)
                throw new TypeError("callback is not function!");
            if (0 === m && 2 == arguments.length)
                throw new TypeError("arguments invalid");
            var f = 0, g;
            if (3 <= arguments.length)
                g = arguments[2];
            else {
                do {
                    if (f in a) {
                        g = a[f++];
                        break
                    }
                    f += 1;
                    if (f >= m)
                        throw new TypeError;
                } while (1)
            }
            for (; f < m; )
                f in a && (g = c.call(b, g, a[f], f, a)), f++;
            return g
        },every: l ? function(a, 
        b, e) {
            return l.call(a, b, e || this)
        } : function(a, b, e) {
            for (var f = a && a.length || 0, g = 0; g < f; g++)
                if (g in a && !b.call(e, a[g], g, a))
                    return !1;
            return !0
        },some: g ? function(a, b, e) {
            return g.call(a, b, e || this)
        } : function(a, b, e) {
            for (var f = a && a.length || 0, g = 0; g < f; g++)
                if (g in a && b.call(e, a[g], g, a))
                    return !0;
            return !1
        },makeArray: function(b) {
            if (null == b)
                return [];
            if (a.isArray(b))
                return b;
            if ("number" !== typeof b.length || b.alert || "string" == typeof b || a.isFunction(b))
                return [b];
            for (var f = [], e = 0, m = b.length; e < m; e++)
                f[e] = b[e];
            return f
        }})
})(KISSY);
(function(a, b) {
    function j(e) {
        var a = typeof e;
        return null == e || "object" !== a && "function" !== a
    }
    function k() {
        if (f)
            return f;
        var e = i;
        a.each(l, function(a) {
            e += a + "|"
        });
        e = e.slice(0, -1);
        return f = RegExp(e, "g")
    }
    function h() {
        if (d)
            return d;
        var e = i;
        a.each(g, function(a) {
            e += a + "|"
        });
        e += "&#(\\d{1,5});";
        return d = RegExp(e, "g")
    }
    var i = "", l = {"&amp;": "&","&gt;": ">","&lt;": "<","&#x60;": "`","&#x2F;": "/","&quot;": '"',"&#x27;": "'"}, g = {}, f, d, c = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
    (function() {
        for (var a in l)
            g[l[a]] = a
    })();
    a.mix(a, {urlEncode: function(a) {
            return encodeURIComponent("" + 
            a)
        },urlDecode: function(a) {
            return decodeURIComponent(a.replace(/\+/g, " "))
        },fromUnicode: function(a) {
            return a.replace(/\\u([a-f\d]{4})/ig, function(a, e) {
                return String.fromCharCode(parseInt(e, 16))
            })
        },escapeHTML: function(a) {
            return (a + "").replace(k(), function(a) {
                return g[a]
            })
        },escapeRegExp: function(a) {
            return a.replace(c, "\\$&")
        },unEscapeHTML: function(a) {
            return a.replace(h(), function(a, e) {
                return l[a] || String.fromCharCode(+e)
            })
        },param: function(e, d, f, g) {
            if (!a.isPlainObject(e))
                return i;
            d = d || "&";
            f = f || "=";
            a.isUndefined(g) && 
            (g = !0);
            var c = [], h, l, k, s, u, v = a.urlEncode;
            for (h in e)
                if (u = e[h], h = v(h), j(u))
                    c.push(h), u !== b && c.push(f, v(u + i)), c.push(d);
                else if (a.isArray(u) && u.length) {
                    l = 0;
                    for (s = u.length; l < s; ++l)
                        k = u[l], j(k) && (c.push(h, g ? v("[]") : i), k !== b && c.push(f, v(k + i)), c.push(d))
                }
            c.pop();
            return c.join(i)
        },unparam: function(e, d, f) {
            if ("string" != typeof e || !(e = a.trim(e)))
                return {};
            for (var f = f || "=", g = {}, c, i = a.urlDecode, e = e.split(d || "&"), h = 0, j = e.length; h < j; ++h) {
                c = e[h].indexOf(f);
                if (-1 == c)
                    d = i(e[h]), c = b;
                else {
                    d = i(e[h].substring(0, c));
                    c = e[h].substring(c + 
                    1);
                    try {
                        c = i(c)
                    } catch (l) {
                    }
                    a.endsWith(d, "[]") && (d = d.substring(0, d.length - 2))
                }
                d in g ? a.isArray(g[d]) ? g[d].push(c) : g[d] = [g[d], c] : g[d] = c
            }
            return g
        }})
})(KISSY);
(function(a) {
    function b(a, b, h) {
        var i = [].slice, l = i.call(arguments, 3), g = function() {
        }, f = function() {
            var d = i.call(arguments);
            return b.apply(this instanceof g ? this : h, a ? d.concat(l) : l.concat(d))
        };
        g.prototype = b.prototype;
        f.prototype = new g;
        return f
    }
    a.mix(a, {noop: function() {
        },bind: b(0, b, null, 0),rbind: b(0, b, null, 1),later: function(b, k, h, i, l) {
            var k = k || 0, g = b, f = a.makeArray(l), d;
            "string" == typeof b && (g = i[b]);
            b = function() {
                g.apply(i, f)
            };
            d = h ? setInterval(b, k) : setTimeout(b, k);
            return {id: d,interval: h,cancel: function() {
                    this.interval ? 
                    clearInterval(d) : clearTimeout(d)
                }}
        },throttle: function(b, k, h) {
            k = k || 150;
            if (-1 === k)
                return function() {
                    b.apply(h || this, arguments)
                };
            var i = a.now();
            return function() {
                var l = a.now();
                l - i > k && (i = l, b.apply(h || this, arguments))
            }
        },buffer: function(b, k, h) {
            function i() {
                i.stop();
                l = a.later(b, k, 0, h || this, arguments)
            }
            k = k || 150;
            if (-1 === k)
                return function() {
                    b.apply(h || this, arguments)
                };
            var l = null;
            i.stop = function() {
                l && (l.cancel(), l = 0)
            };
            return i
        }})
})(KISSY);
(function(a, b) {
    function j(b, d, c) {
        var e = b, g, o, h, n;
        if (!b)
            return e;
        if (b[l])
            return c[b[l]].destination;
        if ("object" === typeof b) {
            n = b.constructor;
            if (a.inArray(n, [Boolean, String, Number, Date, RegExp]))
                e = new n(b.valueOf());
            else if (g = a.isArray(b))
                e = d ? a.filter(b, d) : b.concat();
            else if (o = a.isPlainObject(b))
                e = {};
            b[l] = n = a.guid();
            c[n] = {destination: e,input: b}
        }
        if (g)
            for (b = 0; b < e.length; b++)
                e[b] = j(e[b], d, c);
        else if (o)
            for (h in b)
                if (h !== l && (!d || d.call(b, b[h], h, b) !== i))
                    e[h] = j(b[h], d, c);
        return e
    }
    function k(f, d, c, e) {
        if (f[g] === 
        d && d[g] === f)
            return h;
        f[g] = d;
        d[g] = f;
        var m = function(a, e) {
            return null !== a && a !== b && a[e] !== b
        }, i;
        for (i in d)
            !m(f, i) && m(d, i) && c.push("expected has key '" + i + "', but missing from actual.");
        for (i in f)
            !m(d, i) && m(f, i) && c.push("expected missing key '" + i + "', but present in actual.");
        for (i in d)
            i != g && (a.equals(f[i], d[i], c, e) || e.push("'" + i + "' was '" + (d[i] ? d[i].toString() : d[i]) + "' in expected, but was '" + (f[i] ? f[i].toString() : f[i]) + "' in actual."));
        a.isArray(f) && a.isArray(d) && f.length != d.length && e.push("arrays were not the same length");
        delete f[g];
        delete d[g];
        return 0 === c.length && 0 === e.length
    }
    var h = !0, i = !1, l = "__~ks_cloned", g = "__~ks_compared";
    a.mix(a, {equals: function(g, d, c, e) {
            c = c || [];
            e = e || [];
            return g === d ? h : g === b || null === g || d === b || null === d ? null == g && null == d : g instanceof Date && d instanceof Date ? g.getTime() == d.getTime() : "string" == typeof g && "string" == typeof d || a.isNumber(g) && a.isNumber(d) ? g == d : "object" === typeof g && "object" === typeof d ? k(g, d, c, e) : g === d
        },clone: function(g, d) {
            var c = {}, e = j(g, d, c);
            a.each(c, function(a) {
                a = a.input;
                if (a[l])
                    try {
                        delete a[l]
                    } catch (e) {
                        a[l] = 
                        b
                    }
            });
            c = null;
            return e
        },now: Date.now || function() {
            return +new Date
        }})
})(KISSY);
(function(a, b) {
    var j = /^[\s\xa0]+|[\s\xa0]+$/g, k = String.prototype.trim, h = /\\?\{([^{}]+)\}/g;
    a.mix(a, {trim: k ? function(a) {
            return null == a ? "" : k.call(a)
        } : function(a) {
            return null == a ? "" : (a + "").replace(j, "")
        },substitute: function(a, j, g) {
            return "string" != typeof a || !j ? a : a.replace(g || h, function(a, d) {
                return "\\" === a.charAt(0) ? a.slice(1) : j[d] === b ? "" : j[d]
            })
        },ucfirst: function(a) {
            a += "";
            return a.charAt(0).toUpperCase() + a.substring(1)
        },startsWith: function(a, b) {
            return 0 === a.lastIndexOf(b, 0)
        },endsWith: function(a, b) {
            var g = 
            a.length - b.length;
            return 0 <= g && a.indexOf(b, g) == g
        }})
})(KISSY);
(function(a, b) {
    var j = {}, k = Object.prototype.toString;
    a.mix(a, {isBoolean: 0,isNumber: 0,isString: 0,isFunction: 0,isArray: 0,isDate: 0,isRegExp: 0,isObject: 0,type: function(a) {
            return null == a ? "" + a : j[k.call(a)] || "object"
        },isNull: function(a) {
            return null === a
        },isUndefined: function(a) {
            return a === b
        },isEmptyObject: function(a) {
            for (var i in a)
                if (i !== b)
                    return !1;
            return !0
        },isPlainObject: function(h) {
            if (!h || "object" !== a.type(h) || h.nodeType || h.window == h)
                return !1;
            try {
                if (h.constructor && !Object.prototype.hasOwnProperty.call(h, 
                "constructor") && !Object.prototype.hasOwnProperty.call(h.constructor.prototype, "isPrototypeOf"))
                    return !1
            } catch (i) {
                return !1
            }
            for (var j in h)
                ;
            return j === b || Object.prototype.hasOwnProperty.call(h, j)
        }});
    a.each("Boolean,Number,String,Function,Array,Date,RegExp,Object".split(","), function(b, i) {
        j["[object " + b + "]"] = i = b.toLowerCase();
        a["is" + b] = function(b) {
            return a.type(b) == i
        }
    })
})(KISSY);
(function(a, b) {
    function j(a, d, g) {
        if (a instanceof l)
            return g(a[c]);
        var f = a[c];
        if (a = a[e])
            a.push([d, g]);
        else if (h(f))
            j(f, d, g);
        else
            return d && d(f);
        return b
    }
    function k(a) {
        if (!(this instanceof k))
            return new k(a);
        this.promise = a || new i
    }
    function h(a) {
        return a && a instanceof i
    }
    function i(a) {
        this[c] = a;
        a === b && (this[e] = [])
    }
    function l(a) {
        if (a instanceof l)
            return a;
        i.apply(this, arguments);
        return b
    }
    function g(a, b, e) {
        function d(a) {
            try {
                return b ? b(a) : a
            } catch (e) {
                return new l(e)
            }
        }
        function g(a) {
            try {
                return e ? e(a) : new l(a)
            } catch (b) {
                return new l(b)
            }
        }
        function c(a) {
            h || (h = 1, f.resolve(d(a)))
        }
        var f = new k, h = 0;
        a instanceof i ? j(a, c, function(a) {
            h || (h = 1, f.resolve(g(a)))
        }) : c(a);
        return f.promise
    }
    function f(a) {
        return !d(a) && h(a) && a[e] === b && (!h(a[c]) || f(a[c]))
    }
    function d(a) {
        return h(a) && a[e] === b && a[c] instanceof l
    }
    var c = "__promise_value", e = "__promise_pendings";
    k.prototype = {constructor: k,resolve: function(d) {
            var g = this.promise, f;
            if (!(f = g[e]))
                return b;
            g[c] = d;
            f = [].concat(f);
            g[e] = b;
            a.each(f, function(a) {
                j(g, a[0], a[1])
            });
            return d
        },reject: function(a) {
            return this.resolve(new l(a))
        }};
    i.prototype = {constructor: i,then: function(a, b) {
            return g(this, a, b)
        },fail: function(a) {
            return g(this, 0, a)
        },fin: function(a) {
            return g(this, function(b) {
                return a(b, !0)
            }, function(b) {
                return a(b, !1)
            })
        },isResolved: function() {
            return f(this)
        },isRejected: function() {
            return d(this)
        }};
    a.extend(l, i);
    KISSY.Defer = k;
    KISSY.Promise = i;
    i.Defer = k;
    a.mix(i, {when: g,isPromise: h,isResolved: f,isRejected: d,all: function(a) {
            var b = a.length;
            if (!b)
                return a;
            for (var e = k(), d = 0; d < a.length; d++)
                (function(d, c) {
                    g(d, function(d) {
                        a[c] = d;
                        0 === --b && 
                        e.resolve(a)
                    }, function(a) {
                        e.reject(a)
                    })
                })(a[d], d);
            return e.promise
        }})
})(KISSY);
(function(a) {
    function b(a, b) {
        for (var j = 0, g = a.length - 1, f = [], d; 0 <= g; g--)
            d = a[g], "." != d && (".." === d ? j++ : j ? j-- : f[f.length] = d);
        if (b)
            for (; j--; j)
                f[f.length] = "..";
        return f = f.reverse()
    }
    var j = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/, k = {resolve: function() {
            var h = "", i, j = arguments, g, f = 0;
            for (i = j.length - 1; 0 <= i && !f; i--)
                g = j[i], "string" == typeof g && g && (h = g + "/" + h, f = "/" == g.charAt(0));
            h = b(a.filter(h.split("/"), function(a) {
                return !!a
            }), !f).join("/");
            return (f ? "/" : "") + h || "."
        },normalize: function(h) {
            var i = 
            "/" == h.charAt(0), j = "/" == h.slice(-1), h = b(a.filter(h.split("/"), function(a) {
                return !!a
            }), !i).join("/");
            !h && !i && (h = ".");
            h && j && (h += "/");
            return (i ? "/" : "") + h
        },join: function() {
            var b = a.makeArray(arguments);
            return k.normalize(a.filter(b, function(a) {
                return a && "string" == typeof a
            }).join("/"))
        },relative: function(b, i) {
            var b = k.normalize(b), i = k.normalize(i), j = a.filter(b.split("/"), function(a) {
                return !!a
            }), g = [], f, d, c = a.filter(i.split("/"), function(a) {
                return !!a
            });
            d = Math.min(j.length, c.length);
            for (f = 0; f < d && j[f] == c[f]; f++)
                ;
            for (d = f; f < j.length; )
                g.push(".."), f++;
            g = g.concat(c.slice(d));
            return g = g.join("/")
        },basename: function(a, b) {
            var l;
            l = (a.match(j) || [])[3] || "";
            b && l && l.slice(-1 * b.length) == b && (l = l.slice(0, -1 * b.length));
            return l
        },dirname: function(a) {
            var b = a.match(j) || [], a = b[1] || "", b = b[2] || "";
            if (!a && !b)
                return ".";
            b && (b = b.substring(0, b.length - 1));
            return a + b
        },extname: function(a) {
            return (a.match(j) || [])[4] || ""
        }};
    a.Path = k
})(KISSY);
(function(a, b) {
    function j(b) {
        b._queryMap || (b._queryMap = a.unparam(b._query))
    }
    function k(a) {
        this._query = a || ""
    }
    function h(a, b) {
        return encodeURI(a).replace(b, function(a) {
            a = a.charCodeAt(0).toString(16);
            return "%" + (1 == a.length ? "0" + a : a)
        })
    }
    function i(b) {
        if (b instanceof i)
            return b.clone();
        var e = this;
        a.mix(e, {scheme: "",userInfo: "",hostname: "",port: "",path: "",query: "",fragment: ""});
        b = i.getComponents(b);
        a.each(b, function(b, d) {
            b = b || "";
            if ("query" == d)
                e.query = new k(b);
            else {
                try {
                    b = a.urlDecode(b)
                } catch (g) {
                }
                e[d] = b
            }
        });
        return e
    }
    var l = /[#\/\?@]/g, g = /[#\?]/g, f = /[#@]/g, d = /#/g, c = RegExp("^(?:([\\w\\d+.-]+):)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"), e = a.Path, m = {scheme: 1,userInfo: 2,hostname: 3,port: 4,path: 5,query: 6,fragment: 7};
    k.prototype = {constructor: k,clone: function() {
            return new k(this.toString())
        },reset: function(a) {
            this._query = a || "";
            this._queryMap = null;
            return this
        },count: function() {
            var b = 0, e = this._queryMap, d;
            j(this);
            for (d in e)
                a.isArray(e[d]) ? 
                b += e[d].length : b++;
            return b
        },has: function(b) {
            var e;
            j(this);
            e = this._queryMap;
            return b ? b in e : !a.isEmptyObject(e)
        },get: function(a) {
            var b;
            j(this);
            b = this._queryMap;
            return a ? b[a] : b
        },keys: function() {
            j(this);
            return a.keys(this._queryMap)
        },set: function(b, e) {
            var d;
            j(this);
            d = this._queryMap;
            "string" == typeof b ? this._queryMap[b] = e : (b instanceof k && (b = b.get()), a.each(b, function(a, b) {
                d[b] = a
            }));
            return this
        },remove: function(a) {
            j(this);
            a ? delete this._queryMap[a] : this._queryMap = {};
            return this
        },add: function(e, d) {
            var g = 
            this, c, f;
            a.isObject(e) ? (e instanceof k && (e = e.get()), a.each(e, function(a, b) {
                g.add(b, a)
            })) : (j(g), c = g._queryMap, f = c[e], f = f === b ? d : [].concat(f).concat(d), c[e] = f);
            return g
        },toString: function(e) {
            j(this);
            return a.param(this._queryMap, b, b, e)
        }};
    i.prototype = {constructor: i,clone: function() {
            var b = new i, e = this;
            a.each(m, function(a, d) {
                b[d] = e[d]
            });
            b.query = b.query.clone();
            return b
        },resolve: function(b) {
            "string" == typeof b && (b = new i(b));
            var d = 0, g, c = this.clone();
            a.each("scheme,userInfo,hostname,port,path,query,fragment".split(","), 
            function(f) {
                if (f == "path")
                    if (d)
                        c[f] = b[f];
                    else {
                        if (f = b.path) {
                            d = 1;
                            if (!a.startsWith(f, "/"))
                                if (c.hostname && !c.path)
                                    f = "/" + f;
                                else if (c.path) {
                                    g = c.path.lastIndexOf("/");
                                    g != -1 && (f = c.path.slice(0, g + 1) + f)
                                }
                            c.path = e.normalize(f)
                        }
                    }
                else if (f == "query") {
                    if (d || b.query.toString()) {
                        c.query = b.query.clone();
                        d = 1
                    }
                } else if (d || b[f]) {
                    c[f] = b[f];
                    d = 1
                }
            });
            return c
        },getScheme: function() {
            return this.scheme
        },setScheme: function(a) {
            this.scheme = a;
            return this
        },getHostname: function() {
            return this.hostname
        },setHostname: function(a) {
            this.hostname = 
            a;
            return this
        },setUserInfo: function(a) {
            this.userInfo = a;
            return this
        },getUserInfo: function() {
            return this.userInfo
        },setPort: function(a) {
            this.port = a;
            return this
        },getPort: function() {
            return this.port
        },setPath: function(a) {
            this.path = a;
            return this
        },getPath: function() {
            return this.path
        },setQuery: function(b) {
            "string" == typeof b && (a.startsWith(b, "?") && (b = b.slice(1)), b = new k(h(b, f)));
            this.query = b;
            return this
        },getQuery: function() {
            return this.query
        },getFragment: function() {
            return this.fragment
        },setFragment: function(b) {
            a.startsWith(b, 
            "#") && (b = b.slice(1));
            this.fragment = b;
            return this
        },isSameOriginAs: function(a) {
            return this.hostname.toLowerCase() == a.hostname.toLowerCase() && this.scheme.toLowerCase() == a.scheme.toLowerCase() && this.port.toLowerCase() == a.port.toLowerCase()
        },toString: function(b) {
            var c = [], f, m;
            if (f = this.scheme)
                c.push(h(f, l)), c.push(":");
            if (f = this.hostname) {
                c.push("//");
                if (m = this.userInfo)
                    c.push(h(m, l)), c.push("@");
                c.push(encodeURIComponent(f));
                if (m = this.port)
                    c.push(":"), c.push(m)
            }
            if (m = this.path)
                f && !a.startsWith(m, "/") && 
                (m = "/" + m), m = e.normalize(m), c.push(h(m, g));
            if (b = this.query.toString.call(this.query, b))
                c.push("?"), c.push(b);
            if (b = this.fragment)
                c.push("#"), c.push(h(b, d));
            return c.join("")
        }};
    i.Query = k;
    i.getComponents = function(b) {
        var e = (b || "").match(c) || [], d = {};
        a.each(m, function(a, b) {
            d[b] = e[a]
        });
        return d
    };
    a.Uri = i
})(KISSY);
(function(a, b) {
    function j(a) {
        var b;
        return (b = a.match(/MSIE\s([^;]*)/)) && b[1] ? o(b[1]) : 0
    }
    var k = a.Env.host, h = k.document, k = (k = k.navigator) && k.userAgent || "", i, l = "", g = "", f, d = [6, 9], c = h && h.createElement("div"), e = [], m = KISSY.UA = {webkit: b,trident: b,gecko: b,presto: b,chrome: b,safari: b,firefox: b,ie: b,opera: b,mobile: b,core: b,shell: b,phantomjs: b,os: b,ipad: b,iphone: b,ipod: b,ios: b,android: b,nodejs: b}, o = function(a) {
        var b = 0;
        return parseFloat(a.replace(/\./g, function() {
            return 0 === b++ ? "." : ""
        }))
    };
    c && (c.innerHTML = "<\!--[if IE {{version}}]><s></s><![endif]--\>".replace("{{version}}", 
    ""), e = c.getElementsByTagName("s"));
    if (0 < e.length) {
        g = "ie";
        m[l = "trident"] = 0.1;
        if ((f = k.match(/Trident\/([\d.]*)/)) && f[1])
            m[l] = o(f[1]);
        f = d[0];
        for (d = d[1]; f <= d; f++)
            if (c.innerHTML = "<\!--[if IE {{version}}]><s></s><![endif]--\>".replace("{{version}}", f), 0 < e.length) {
                m[g] = f;
                break
            }
        var p;
        if (!m.ie && (p = j(k)))
            m[g = "ie"] = p
    } else if ((f = k.match(/AppleWebKit\/([\d.]*)/)) && f[1]) {
        m[l = "webkit"] = o(f[1]);
        if ((f = k.match(/Chrome\/([\d.]*)/)) && f[1])
            m[g = "chrome"] = o(f[1]);
        else if ((f = k.match(/\/([\d.]*) Safari/)) && f[1])
            m[g = "safari"] = 
            o(f[1]);
        if (/ Mobile\//.test(k) && k.match(/iPad|iPod|iPhone/)) {
            m.mobile = "apple";
            if ((f = k.match(/OS ([^\s]*)/)) && f[1])
                m.ios = o(f[1].replace("_", "."));
            i = "ios";
            if ((f = k.match(/iPad|iPod|iPhone/)) && f[0])
                m[f[0].toLowerCase()] = m.ios
        } else if (/ Android/.test(k)) {
            if (/Mobile/.test(k) && (i = m.mobile = "android"), (f = k.match(/Android ([^\s]*);/)) && f[1])
                m.android = o(f[1])
        } else if (f = k.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))
            m.mobile = f[0].toLowerCase();
        if ((f = k.match(/PhantomJS\/([^\s]*)/)) && f[1])
            m.phantomjs = o(f[1])
    } else if ((f = 
    k.match(/Presto\/([\d.]*)/)) && f[1]) {
        if (m[l = "presto"] = o(f[1]), (f = k.match(/Opera\/([\d.]*)/)) && f[1]) {
            m[g = "opera"] = o(f[1]);
            if ((f = k.match(/Opera\/.* Version\/([\d.]*)/)) && f[1])
                m[g] = o(f[1]);
            if ((f = k.match(/Opera Mini[^;]*/)) && f)
                m.mobile = f[0].toLowerCase();
            else if ((f = k.match(/Opera Mobi[^;]*/)) && f)
                m.mobile = f[0]
        }
    } else if ((f = k.match(/MSIE\s([^;]*)/)) && f[1]) {
        if (m[l = "trident"] = 0.1, m[g = "ie"] = o(f[1]), (f = k.match(/Trident\/([\d.]*)/)) && f[1])
            m[l] = o(f[1])
    } else if (f = k.match(/Gecko/)) {
        m[l = "gecko"] = 0.1;
        if ((f = k.match(/rv:([\d.]*)/)) && 
        f[1])
            m[l] = o(f[1]);
        if ((f = k.match(/Firefox\/([\d.]*)/)) && f[1])
            m[g = "firefox"] = o(f[1])
    }
    i || (/windows|win32/i.test(k) ? i = "windows" : /macintosh|mac_powerpc/i.test(k) ? i = "macintosh" : /linux/i.test(k) ? i = "linux" : /rhino/i.test(k) && (i = "rhino"));
    if ("object" === typeof process) {
        var n, q;
        if ((n = process.versions) && (q = n.node))
            i = process.platform, m.nodejs = o(q)
    }
    m.os = i;
    m.core = l;
    m.shell = g;
    m._numberify = o;
    i = "webkit,trident,gecko,presto,chrome,safari,firefox,ie,opera".split(",");
    var h = h && h.documentElement, r = "";
    h && (a.each(i, function(a) {
        var b = 
        m[a];
        if (b) {
            r = r + (" ks-" + a + (parseInt(b) + ""));
            r = r + (" ks-" + a)
        }
    }), a.trim(r) && (h.className = a.trim(h.className + r)))
})(KISSY);
(function(a) {
    var b = a.Env, j = b.host, k = a.UA, h = j.document || {}, i = "ontouchstart" in h && !k.phantomjs, l = (h = h.documentMode) || k.ie, g = (b.nodejs && "object" === typeof global ? global : j).JSON;
    h && 9 > h && (g = 0);
    a.Features = {isTouchSupported: function() {
            return i
        },isDeviceMotionSupported: function() {
            return !!j.DeviceMotionEvent
        },isHashChangeSupported: function() {
            return "onhashchange" in j && (!l || 7 < l)
        },isNativeJSONSupported: function() {
            return g
        }}
})(KISSY);
(function(a) {
    function b(a) {
        this.runtime = a
    }
    b.Status = {INIT: 0,LOADING: 1,LOADED: 2,ERROR: 3,ATTACHED: 4};
    a.Loader = b;
    a.Loader.Status = b.Status
})(KISSY);
(function(a) {
    function b(a, b, i) {
        a = a[j] || (a[j] = {});
        i && (a[b] = a[b] || []);
        return a[b]
    }
    a.namespace("Loader");
    var j = "__events__" + a.now();
    KISSY.Loader.Target = {on: function(a, h) {
            b(this, a, 1).push(h)
        },detach: function(k, h) {
            var i, l;
            if (k) {
                if (i = b(this, k))
                    h && (l = a.indexOf(h, i), -1 != l && i.splice(l, 1)), (!h || !i.length) && delete (this[j] || (this[j] = {}))[k]
            } else
                delete this[j]
        },fire: function(a, h) {
            var i = b(this, a) || [], j, g = i.length;
            for (j = 0; j < g; j++)
                i[j].call(null, h)
        }}
})(KISSY);
(function(a) {
    function b(a) {
        if ("string" == typeof a)
            return j(a);
        for (var b = [], e = 0, d = a.length; e < d; e++)
            b[e] = j(a[e]);
        return b
    }
    function j(a) {
        "/" == a.charAt(a.length - 1) && (a += "index");
        return a
    }
    function k(b, e, d) {
        var b = b.Env.mods, g, c, e = a.makeArray(e);
        for (c = 0; c < e.length; c++)
            if (g = b[e[c]], !g || g.status !== d)
                return 0;
        return 1
    }
    var h = a.Loader, i = a.Path, l = a.Env.host, g = a.startsWith, f = h.Status, d = f.ATTACHED, c = f.LOADED, e = a.Loader.Utils = {}, m = l.document;
    a.mix(e, {docHead: function() {
            return m.getElementsByTagName("head")[0] || m.documentElement
        },
        normalDepModuleName: function(a, b) {
            var d = 0, c;
            if (!b)
                return b;
            if ("string" == typeof b)
                return g(b, "../") || g(b, "./") ? i.resolve(i.dirname(a), b) : i.normalize(b);
            for (c = b.length; d < c; d++)
                b[d] = e.normalDepModuleName(a, b[d]);
            return b
        },createModulesInfo: function(b, d) {
            a.each(d, function(a) {
                e.createModuleInfo(b, a)
            })
        },createModuleInfo: function(b, e, d) {
            var e = j(e), c = b.Env.mods, g = c[e];
            return g ? g : c[e] = g = new h.Module(a.mix({name: e,runtime: b}, d))
        },isAttached: function(a, b) {
            return k(a, b, d)
        },isLoaded: function(a, b) {
            return k(a, b, 
            c)
        },getModules: function(b, c) {
            var g = [b], f, m, i, h, j = b.Env.mods;
            a.each(c, function(c) {
                f = j[c];
                if (!f || "css" != f.getType())
                    m = e.unalias(b, c), (i = a.reduce(m, function(a, b) {
                        h = j[b];
                        return a && h && h.status == d
                    }, !0)) ? g.push(j[m[0]].value) : g.push(null)
            });
            return g
        },attachModsRecursively: function(a, b, d) {
            var d = d || [], c, g = 1, f = a.length, m = d.length;
            for (c = 0; c < f; c++)
                g = e.attachModRecursively(a[c], b, d) && g, d.length = m;
            return g
        },attachModRecursively: function(b, g, f) {
            var m, i = g.Env.mods[b];
            if (!i)
                return 0;
            m = i.status;
            if (m == d)
                return 1;
            if (m != 
            c)
                return 0;
            if (a.Config.debug) {
                if (a.inArray(b, f))
                    return f.push(b), 0;
                f.push(b)
            }
            return e.attachModsRecursively(i.getNormalizedRequires(), g, f) ? (e.attachMod(g, i), 1) : 0
        },attachMod: function(a, b) {
            if (b.status == c) {
                var g = b.fn;
                g && (b.value = g.apply(b, e.getModules(a, b.getRequiresWithAlias())));
                b.status = d;
                a.getLoader().fire("afterModAttached", {mod: b})
            }
        },getModNamesAsArray: function(a) {
            "string" == typeof a && (a = a.replace(/\s+/g, "").split(","));
            return a
        },normalizeModNames: function(a, b, d) {
            return e.unalias(a, e.normalizeModNamesWithAlias(a, 
            b, d))
        },unalias: function(a, e) {
            for (var d = [].concat(e), g, c, f, m = 0, i, h = a.Env.mods; !m; ) {
                m = 1;
                for (g = d.length - 1; 0 <= g; g--)
                    if ((c = h[d[g]]) && (f = c.alias)) {
                        m = 0;
                        for (i = f.length - 1; 0 <= i; i--)
                            f[i] || f.splice(i, 1);
                        d.splice.apply(d, [g, 1].concat(b(f)))
                    }
            }
            return d
        },normalizeModNamesWithAlias: function(a, d, g) {
            var a = [], c, f;
            if (d) {
                c = 0;
                for (f = d.length; c < f; c++)
                    d[c] && a.push(b(d[c]))
            }
            g && (a = e.normalDepModuleName(g, a));
            return a
        },registerModule: function(b, d, g, f) {
            var m = b.Env.mods, i = m[d];
            if (!i || !i.fn)
                e.createModuleInfo(b, d), i = m[d], a.mix(i, 
                {name: d,status: c,fn: g}), a.mix(i, f)
        },getMappedPath: function(a, b, e) {
            for (var a = e || a.Config.mappedRules || [], d, e = 0; e < a.length; e++)
                if (d = a[e], b.match(d[0]))
                    return b.replace(d[0], d[1]);
            return b
        }})
})(KISSY);
(function(a) {
    function b(a, b) {
        return b in a ? a[b] : a.runtime.Config[b]
    }
    function j(b) {
        a.mix(this, b)
    }
    function k(b) {
        this.status = i.Status.INIT;
        a.mix(this, b)
    }
    var h = a.Path, i = a.Loader, l = i.Utils;
    a.augment(j, {getTag: function() {
            return b(this, "tag")
        },getName: function() {
            return this.name
        },getBase: function() {
            return b(this, "base")
        },getPrefixUriForCombo: function() {
            var a = this.getName();
            return this.getBase() + (a && !this.isIgnorePackageNameInUri() ? a + "/" : "")
        },getBaseUri: function() {
            return b(this, "baseUri")
        },isDebug: function() {
            return b(this, 
            "debug")
        },isIgnorePackageNameInUri: function() {
            return b(this, "ignorePackageNameInUri")
        },getCharset: function() {
            return b(this, "charset")
        },isCombine: function() {
            return b(this, "combine")
        }});
    i.Package = j;
    a.augment(k, {setValue: function(a) {
            this.value = a
        },getType: function() {
            var a = this.type;
            a || (this.type = a = ".css" == h.extname(this.name).toLowerCase() ? "css" : "js");
            return a
        },getFullPath: function() {
            var a, b, d, c, e;
            if (!this.fullpath) {
                d = this.getPackage();
                b = d.getBaseUri();
                e = this.getPath();
                if (d.isIgnorePackageNameInUri() && 
                (c = d.getName()))
                    e = h.relative(c, e);
                b = b.resolve(e);
                (a = this.getTag()) && b.query.set("t", a);
                this.fullpath = l.getMappedPath(this.runtime, b.toString())
            }
            return this.fullpath
        },getPath: function() {
            var a;
            if (!(a = this.path)) {
                a = this.name;
                var b = "." + this.getType(), d = "-min";
                a = h.join(h.dirname(a), h.basename(a, b));
                this.getPackage().isDebug() && (d = "");
                a = this.path = a + d + b
            }
            return a
        },getValue: function() {
            return this.value
        },getName: function() {
            return this.name
        },getPackage: function() {
            var b;
            if (!(b = this.packageInfo)) {
                b = this.runtime;
                var f = this.name, d = b.config("packages"), c = "", e;
                for (e in d)
                    a.startsWith(f, e) && e.length > c.length && (c = e);
                b = this.packageInfo = d[c] || b.config("systemPackage")
            }
            return b
        },getTag: function() {
            return this.tag || this.getPackage().getTag()
        },getCharset: function() {
            return this.charset || this.getPackage().getCharset()
        },getRequiredMods: function() {
            var b = this.runtime;
            return a.map(this.getNormalizedRequires(), function(a) {
                return l.createModuleInfo(b, a)
            })
        },getRequiresWithAlias: function() {
            var a = this.requiresWithAlias, b = this.requires;
            if (!b || 0 == b.length)
                return b || [];
            a || (this.requiresWithAlias = a = l.normalizeModNamesWithAlias(this.runtime, b, this.name));
            return a
        },getNormalizedRequires: function() {
            var a, b = this.normalizedRequiresStatus, d = this.status, c = this.requires;
            if (!c || 0 == c.length)
                return c || [];
            if ((a = this.normalizedRequires) && b == d)
                return a;
            this.normalizedRequiresStatus = d;
            return this.normalizedRequires = l.normalizeModNames(this.runtime, c, this.name)
        }});
    i.Module = k
})(KISSY);
(function(a) {
    function b() {
        for (var l in i) {
            var g = i[l], f = g.node, d, c = 0;
            if (k.webkit)
                f.sheet && (c = 1);
            else if (f.sheet)
                try {
                    f.sheet.cssRules && (c = 1)
                } catch (e) {
                    d = e.name, "NS_ERROR_DOM_SECURITY_ERR" == d && (c = 1)
                }
            c && (g.callback && g.callback.call(f), delete i[l])
        }
        h = a.isEmptyObject(i) ? 0 : setTimeout(b, j)
    }
    var j = 30, k = a.UA, h = 0, i = {};
    a.mix(a.Loader.Utils, {pollCss: function(a, g) {
            var f;
            f = i[a.href] = {};
            f.node = a;
            f.callback = g;
            h || b()
        }})
})(KISSY);
(function(a) {
    var b = a.Env.host.document, j = a.Loader.Utils, k = a.Path, h = {}, i = 536 > a.UA.webkit;
    a.mix(a, {getScript: function(l, g, f) {
            var d = g, c = 0, e, m, o, p;
            a.startsWith(k.extname(l).toLowerCase(), ".css") && (c = 1);
            a.isPlainObject(d) && (g = d.success, e = d.error, m = d.timeout, f = d.charset, o = d.attrs);
            d = h[l] = h[l] || [];
            d.push([g, e]);
            if (1 < d.length)
                return d.node;
            var g = j.docHead(), n = b.createElement(c ? "link" : "script");
            o && a.each(o, function(a, b) {
                n.setAttribute(b, a)
            });
            c ? (n.href = l, n.rel = "stylesheet") : (n.src = l, n.async = !0);
            d.node = n;
            f && 
            (n.charset = f);
            var q = function(b) {
                var e;
                if (p) {
                    p.cancel();
                    p = void 0
                }
                a.each(h[l], function(a) {
                    (e = a[b]) && e.call(n)
                });
                delete h[l]
            }, f = !c;
            c && (f = i ? !1 : "onload" in n);
            f ? (n.onload = n.onreadystatechange = function() {
                var a = n.readyState;
                if (!a || a == "loaded" || a == "complete") {
                    n.onreadystatechange = n.onload = null;
                    q(0)
                }
            }, n.onerror = function() {
                n.onerror = null;
                q(1)
            }) : j.pollCss(n, function() {
                q(0)
            });
            m && (p = a.later(function() {
                q(1)
            }, 1E3 * m));
            c ? g.appendChild(n) : g.insertBefore(n, g.firstChild);
            return n
        }})
})(KISSY);
(function(a, b) {
    function j(b) {
        "/" != b.charAt(b.length - 1) && (b += "/");
        l ? b = l.resolve(b) : (a.startsWith(b, "file:") || (b = "file:" + b), b = new a.Uri(b));
        return b
    }
    var k = a.Loader, h = k.Utils, i = a.Env.host.location, l, g, f = a.Config.fns;
    if (!a.Env.nodejs && i && (g = i.href))
        l = new a.Uri(g);
    f.map = function(a) {
        var b = this.Config;
        return !1 === a ? b.mappedRules = [] : b.mappedRules = (b.mappedRules || []).concat(a || [])
    };
    f.mapCombo = function(a) {
        var b = this.Config;
        return !1 === a ? b.mappedComboRules = [] : b.mappedComboRules = (b.mappedComboRules || []).concat(a || 
        [])
    };
    f.packages = function(d) {
        var c, e = this.Config, g = e.packages = e.packages || {};
        return d ? (a.each(d, function(b, e) {
            c = b.name || e;
            var d = j(b.base || b.path);
            b.name = c;
            b.base = d.toString();
            b.baseUri = d;
            b.runtime = a;
            delete b.path;
            g[c] = new k.Package(b)
        }), b) : !1 === d ? (e.packages = {}, b) : g
    };
    f.modules = function(b) {
        var c = this, e = c.Env;
        b && a.each(b, function(b, d) {
            h.createModuleInfo(c, d, b);
            a.mix(e.mods[d], b)
        })
    };
    f.base = function(a) {
        var c = this.Config;
        if (!a)
            return c.base;
        a = j(a);
        c.base = a.toString();
        c.baseUri = a;
        return b
    }
})(KISSY);
(function(a) {
    var b = a.Loader, j = a.UA, k = b.Utils;
    a.augment(b, b.Target, {__currentMod: null,__startLoadTime: 0,__startLoadModName: null,add: function(b, i, l) {
            var g = this.runtime;
            if ("string" == typeof b)
                k.registerModule(g, b, i, l);
            else if (a.isFunction(b))
                if (l = i, i = b, j.ie) {
                    var b = a.Env.host.document.getElementsByTagName("script"), f, d, c;
                    for (d = b.length - 1; 0 <= d; d--)
                        if (c = b[d], "interactive" == c.readyState) {
                            f = c;
                            break
                        }
                    b = f ? f.getAttribute("data-mod-name") : this.__startLoadModName;
                    k.registerModule(g, b, i, l);
                    this.__startLoadModName = 
                    null;
                    this.__startLoadTime = 0
                } else
                    this.__currentMod = {fn: i,config: l}
        }})
})(KISSY);
(function(a, b) {
    function j(b) {
        a.mix(this, {fn: b,waitMods: {},requireLoadedMods: {}})
    }
    function k(a, b, d) {
        var f, m = b.length;
        for (f = 0; f < m; f++) {
            var i = a, j = b[f], l = d, k = i.runtime, w = void 0, A = void 0, w = k.Env.mods, y = w[j];
            y || (g.createModuleInfo(k, j), y = w[j]);
            w = y.status;
            w != o && (w === e ? l.loadModRequires(i, y) : (A = l.isModWait(j), A || (l.addWaitMod(j), w <= c && h(i, y, l))))
        }
    }
    function h(e, i, h) {
        function j() {
            i.fn ? (d[k] || (d[k] = 1), h.loadModRequires(e, i), h.removeWaitMod(k), h.check()) : i.status = m
        }
        var l = e.runtime, k = i.getName(), o = i.getCharset(), 
        v = i.getFullPath(), x = 0, w = f.ie, A = "css" == i.getType();
        i.status = c;
        w && !A && (e.__startLoadModName = k, e.__startLoadTime = Number(+new Date));
        a.getScript(v, {attrs: w ? {"data-mod-name": k} : b,success: function() {
                if (i.status == c)
                    if (A)
                        g.registerModule(l, k, a.noop);
                    else if (x = e.__currentMod) {
                        g.registerModule(l, k, x.fn, x.config);
                        e.__currentMod = null
                    }
                a.later(j)
            },error: j,charset: o})
    }
    var i, l, g, f, d = {}, c, e, m, o;
    i = a.Loader;
    l = i.Status;
    g = i.Utils;
    f = a.UA;
    c = l.LOADING;
    e = l.LOADED;
    m = l.ERROR;
    o = l.ATTACHED;
    j.prototype = {check: function() {
            var b = 
            this.fn;
            b && a.isEmptyObject(this.waitMods) && (b(), this.fn = null)
        },addWaitMod: function(a) {
            this.waitMods[a] = 1
        },removeWaitMod: function(a) {
            delete this.waitMods[a]
        },isModWait: function(a) {
            return this.waitMods[a]
        },loadModRequires: function(a, b) {
            var e = this.requireLoadedMods, d = b.name;
            e[d] || (e[d] = 1, e = b.getNormalizedRequires(), k(a, e, this))
        }};
    a.augment(i, {use: function(a, b, e) {
            var d, c = new j(function() {
                g.attachModsRecursively(d, f);
                b && b.apply(f, g.getModules(f, a))
            }), f = this.runtime, a = g.getModNamesAsArray(a), a = g.normalizeModNamesWithAlias(f, 
            a);
            d = g.unalias(f, a);
            k(this, d, c);
            e ? c.check() : setTimeout(function() {
                c.check()
            }, 0);
            return this
        }})
})(KISSY);
(function(a, b) {
    function j(b, e, d) {
        var c = b && b.length;
        c ? a.each(b, function(b) {
            a.getScript(b, function() {
                --c || e()
            }, d)
        }) : e()
    }
    function k(b) {
        a.mix(this, {runtime: b,queue: [],loading: 0})
    }
    function h(a) {
        if (a.queue.length) {
            var b = a.queue.shift();
            l(a, b)
        }
    }
    function i(a, b) {
        a.queue.push(b)
    }
    function l(b, e) {
        function d() {
            w && x && (m.attachModsRecursively(i, B) ? h.apply(null, m.getModules(B, c)) : l(b, e))
        }
        var c = e.modNames, i = e.unaliasModNames, h = e.fn, k, u, v, x, w, A, y, B = b.runtime;
        b.loading = 1;
        k = b.calculate(i);
        m.createModulesInfo(B, k);
        k = 
        b.getComboUrls(k);
        u = k.css;
        A = 0;
        for (y in u)
            A++;
        x = 0;
        w = !A;
        for (y in u)
            j(u[y], function() {
                if (!--A) {
                    for (y in u)
                        a.each(u[y].mods, function(b) {
                            m.registerModule(B, b.name, a.noop)
                        });
                    g(u);
                    w = 1;
                    d()
                }
            }, u[y].charset);
        v = k.js;
        f(v, function(a) {
            (x = a) && g(v);
            d()
        })
    }
    function g(b) {
        if (a.Config.debug) {
            var e = [], d, c = [];
            for (d in b)
                c.push.apply(c, b[d]), a.each(b[d].mods, function(a) {
                    e.push(a.name)
                })
        }
    }
    function f(d, c) {
        var g, f, i = 0;
        for (g in d)
            i++;
        if (i)
            for (g in f = 1, d)
                (function(g) {
                    j(d[g], function() {
                        a.each(d[g].mods, function(a) {
                            return !a.fn ? 
                            (a.status = e.ERROR, f = 0, !1) : b
                        });
                        f && !--i && c(1)
                    }, d[g].charset)
                })(g);
        else
            c(1)
    }
    function d(b, e, c) {
        var g = b.runtime, f, i;
        f = b.runtime.Env.mods[e];
        var h = c[e];
        if (h)
            return h;
        c[e] = h = {};
        if (f && !m.isAttached(g, e)) {
            e = f.getNormalizedRequires();
            for (f = 0; f < e.length; f++)
                i = e[f], !m.isLoaded(g, i) && !m.isAttached(g, i) && (h[i] = 1), i = d(b, i, c), a.mix(h, i)
        }
        return h
    }
    var c = a.Loader, e = c.Status, m = c.Utils;
    a.augment(k, c.Target);
    a.augment(k, {clear: function() {
            this.loading = 0
        },use: function(a, b, e) {
            var d = this, c = d.runtime, a = m.getModNamesAsArray(a), 
            a = m.normalizeModNamesWithAlias(c, a), g = m.unalias(c, a);
            m.isAttached(c, g) ? b && (e ? b.apply(null, m.getModules(c, a)) : setTimeout(function() {
                b.apply(null, m.getModules(c, a))
            }, 0)) : (i(d, {modNames: a,unaliasModNames: g,fn: function() {
                    setTimeout(function() {
                        d.loading = 0;
                        h(d)
                    }, 0);
                    b && b.apply(this, arguments)
                }}), d.loading || h(d))
        },add: function(a, b, e) {
            m.registerModule(this.runtime, a, b, e)
        },calculate: function(b) {
            var e = {}, c, g, f, i = this.runtime, h = {};
            for (c = 0; c < b.length; c++)
                g = b[c], m.isAttached(i, g) || (m.isLoaded(i, g) || (e[g] = 1), a.mix(e, 
                d(this, g, h)));
            b = [];
            for (f in e)
                b.push(f);
            return b
        },getComboUrls: function(b) {
            var e = this, d, c = e.runtime, g = c.Config, f = {};
            a.each(b, function(a) {
                var a = e.runtime.Env.mods[a], b = a.getPackage(), d = a.getType(), c, g = b.getName();
                f[g] = f[g] || {};
                if (!(c = f[g][d]))
                    c = f[g][d] = f[g][d] || [], c.packageInfo = b;
                c.push(a)
            });
            var i = {js: {},css: {}}, h, j, k, b = g.comboPrefix, l = g.comboSep, A = g.comboMaxFileNum, y = g.comboMaxUrlLength;
            for (j in f)
                for (k in f[j]) {
                    h = [];
                    var B = f[j][k], D = B.packageInfo, C = (d = D.getTag()) ? "?t=" + encodeURIComponent(d) : "", I = 
                    C.length, z, F, K, J = D.getPrefixUriForCombo();
                    i[k][j] = [];
                    i[k][j].charset = D.getCharset();
                    i[k][j].mods = [];
                    z = J + b;
                    K = z.length;
                    var L = function() {
                        i[k][j].push(m.getMappedPath(c, z + h.join(l) + C, g.mappedComboRules))
                    };
                    for (d = 0; d < B.length; d++)
                        if (F = B[d].getFullPath(), i[k][j].mods.push(B[d]), !D.isCombine() || !a.startsWith(F, J))
                            i[k][j].push(F);
                        else if (F = F.slice(J.length).replace(/\?.*$/, ""), h.push(F), h.length > A || K + h.join(l).length + I > y)
                            h.pop(), L(), h = [], d--;
                    h.length && L()
                }
            return i
        }});
    c.Combo = k
})(KISSY);
(function(a, b) {
    function j() {
        var g = /^(.*)(seed|kissy)(?:-min)?\.js[^/]*/i, f = /(seed|kissy)(?:-min)?\.js/i, d, c, e = h.host.document.getElementsByTagName("script"), i = e[e.length - 1], e = i.src, i = (i = i.getAttribute("data-config")) ? (new Function("return " + i))() : {};
        d = i.comboPrefix = i.comboPrefix || "??";
        c = i.comboSep = i.comboSep || ",";
        var j, k = e.indexOf(d);
        -1 == k ? j = e.replace(g, "$1") : (j = e.substring(0, k), "/" != j.charAt(j.length - 1) && (j += "/"), e = e.substring(k + d.length).split(c), a.each(e, function(a) {
            return a.match(f) ? (j += a.replace(g, 
            "$1"), !1) : b
        }));
        return a.mix({base: j}, i)
    }
    a.mix(a, {add: function(a, b, d) {
            this.getLoader().add(a, b, d)
        },use: function(a, b) {
            var d = this.getLoader();
            d.use.apply(d, arguments)
        },getLoader: function() {
            var a = this.Env;
            return this.Config.combine && !a.nodejs ? a._comboLoader : a._loader
        },require: function(a) {
            return i.getModules(this, [a])[1]
        }});
    var k = a.Loader, h = a.Env, i = k.Utils, l = a.Loader.Combo;
    a.Env.nodejs ? a.config({charset: "utf-8",base: __dirname.replace(/\\/g, "/").replace(/\/$/, "") + "/"}) : a.config(a.mix({comboMaxUrlLength: 2E3,
        comboMaxFileNum: 40,charset: "utf-8",tag: "20130415115744"}, j()));
    a.config("systemPackage", new k.Package({name: "",runtime: a}));
    h.mods = {};
    h._loader = new k(a);
    l && (h._comboLoader = new l(a))
})(KISSY);
(function(a, b) {
    function j() {
        i && n(k, o, j);
        f.resolve(a)
    }
    var k = a.Env.host, h = a.UA, i = k.document, l = i && i.documentElement, g = k.location, f = new a.Defer, d = f.promise, c = /^#?([\w-]+)$/, e = /\S/, m = !(!i || !i.addEventListener), o = "load", p = m ? function(a, b, e) {
        a.addEventListener(b, e, !1)
    } : function(a, b, e) {
        a.attachEvent("on" + b, e)
    }, n = m ? function(a, b, e) {
        a.removeEventListener(b, e, !1)
    } : function(a, b, e) {
        a.detachEvent("on" + b, e)
    };
    a.mix(a, {isWindow: function(a) {
            return null != a && a == a.window
        },parseXML: function(a) {
            if (a.documentElement)
                return a;
            var e;
            try {
                k.DOMParser ? e = (new DOMParser).parseFromString(a, "text/xml") : (e = new ActiveXObject("Microsoft.XMLDOM"), e.async = !1, e.loadXML(a))
            } catch (d) {
                e = b
            }
            !e || !e.documentElement || e.getElementsByTagName("parsererror");
            return e
        },globalEval: function(a) {
            a && e.test(a) && (k.execScript || function(a) {
                k.eval.call(k, a)
            })(a)
        },ready: function(a) {
            d.then(a);
            return this
        },available: function(b, e) {
            var b = (b + "").match(c)[1], d = 1, g, f = a.later(function() {
                ((g = i.getElementById(b)) && (e(g) || 1) || 500 < ++d) && f.cancel()
            }, 40, !0)
        }});
    if (g && -1 !== 
    (g.search || "").indexOf("ks-debug"))
        a.Config.debug = !0;
    (function() {
        if (!i || "complete" === i.readyState)
            j();
        else if (p(k, o, j), m) {
            var a = function() {
                n(i, "DOMContentLoaded", a);
                j()
            };
            p(i, "DOMContentLoaded", a)
        } else {
            var b = function() {
                "complete" === i.readyState && (n(i, "readystatechange", b), j())
            };
            p(i, "readystatechange", b);
            var e, d = l && l.doScroll;
            try {
                e = null === k.frameElement
            } catch (c) {
                e = !1
            }
            if (d && e) {
                var g = function() {
                    try {
                        d("left"), j()
                    } catch (a) {
                        setTimeout(g, 40)
                    }
                };
                g()
            }
        }
    })();
    if (h.ie)
        try {
            i.execCommand("BackgroundImageCache", !1, 
            !0)
        } catch (q) {
        }
})(KISSY, void 0);
(function(a) {
    a.config({packages: {gallery: {base: a.Config.baseUri.resolve("../").toString()}},modules: {core: {alias: "dom,event,ajax,anim,base,node,json,ua".split(",")}}})
})(KISSY);
(function(a, b, j) {
    a({ajax: {requires: ["dom", "json", "event"]}});
    a({anim: {requires: ["dom", "event"]}});
    a({base: {requires: ["event/custom"]}});
    a({button: {requires: ["component/base", "event"]}});
    a({calendar: {requires: ["node", "event"]}});
    a({color: {requires: ["base"]}});
    a({combobox: {requires: ["dom", "component/base", "node", "menu", "ajax"]}});
    a({"component/base": {requires: ["rich-base", "node", "event"]}});
    a({"component/extension": {requires: ["dom", "node"]}});
    a({"component/plugin/drag": {requires: ["rich-base", "dd/base"]}});
    a({"component/plugin/resize": {requires: ["resizable"]}});
    a({datalazyload: {requires: ["dom", "event", "base"]}});
    a({dd: {alias: ["dd/base", "dd/droppable"]}});
    a({"dd/base": {requires: ["dom", "node", "event", "rich-base", "base"]}});
    a({"dd/droppable": {requires: ["dd/base", "dom", "node", "rich-base"]}});
    a({"dd/plugin/constrain": {requires: ["base", "node"]}});
    a({"dd/plugin/proxy": {requires: ["node", "base", "dd/base"]}});
    a({"dd/plugin/scroll": {requires: ["dd/base", "base", "node", "dom"]}});
    a({dom: {alias: ["dom/base", 9 > j.ie ? 
                "dom/ie" : ""]}});
    a({"dom/ie": {requires: ["dom/base"]}});
    a({editor: {requires: ["htmlparser", "component/base", "core"]}});
    a({event: {alias: ["event/base", "event/dom", "event/custom"]}});
    a({"event/custom": {requires: ["event/base"]}});
    a({"event/dom": {alias: ["event/dom/base", b.isTouchSupported() ? "event/dom/touch" : "", b.isDeviceMotionSupported() ? "event/dom/shake" : "", b.isHashChangeSupported() ? "" : "event/dom/hashchange", 9 > j.ie ? "event/dom/ie" : "", j.ie ? "" : "event/dom/focusin"]}});
    a({"event/dom/base": {requires: ["dom", "event/base"]}});
    a({"event/dom/focusin": {requires: ["event/dom/base"]}});
    a({"event/dom/hashchange": {requires: ["event/dom/base", "dom"]}});
    a({"event/dom/ie": {requires: ["event/dom/base", "dom"]}});
    a({"event/dom/shake": {requires: ["event/dom/base"]}});
    a({"event/dom/touch": {requires: ["event/dom/base", "dom"]}});
    a({imagezoom: {requires: ["node", "overlay"]}});
    a({json: {requires: [KISSY.Features.isNativeJSONSupported() ? "" : "json/json2"]}});
    a({kison: {requires: ["base"]}});
    a({menu: {requires: ["component/extension", "node", "component/base", 
                "event"]}});
    a({menubutton: {requires: ["node", "menu", "button", "component/base"]}});
    a({mvc: {requires: ["event", "base", "ajax", "json", "node"]}});
    a({node: {requires: ["dom", "event/dom", "anim"]}});
    a({overlay: {requires: ["node", "component/base", "component/extension", "event"]}});
    a({resizable: {requires: ["node", "rich-base", "dd/base"]}});
    a({"rich-base": {requires: ["base"]}});
    a({separator: {requires: ["component/base"]}});
    a({"split-button": {requires: ["component/base", "button", "menubutton"]}});
    a({stylesheet: {requires: ["dom"]}});
    a({swf: {requires: ["dom", "json", "base"]}});
    a({switchable: {requires: ["dom", "event", "anim", KISSY.Features.isTouchSupported() ? "dd/base" : ""]}});
    a({tabs: {requires: ["button", "toolbar", "component/base"]}});
    a({toolbar: {requires: ["component/base", "node"]}});
    a({tree: {requires: ["node", "component/base", "event"]}});
    a({waterfall: {requires: ["node", "base"]}});
    a({xtemplate: {alias: ["xtemplate/facade"]}});
    a({"xtemplate/compiler": {requires: ["xtemplate/runtime"]}});
    a({"xtemplate/facade": {requires: ["xtemplate/runtime", 
                "xtemplate/compiler"]}})
})(function(a) {
    KISSY.config("modules", a)
}, KISSY.Features, KISSY.UA);
(function(a) {
    a.add("empty", a.noop);
    a.add("promise", function() {
        return a.Promise
    });
    a.add("ua", function() {
        return a.UA
    });
    a.add("uri", function() {
        return a.Uri
    });
    a.add("path", function() {
        return a.Path
    })
})(KISSY);
KISSY.add("dom/base/api", function(a) {
    var b = a.Env.host, j = a.UA, k = {ELEMENT_NODE: 1,ATTRIBUTE_NODE: 2,TEXT_NODE: 3,CDATA_SECTION_NODE: 4,ENTITY_REFERENCE_NODE: 5,ENTITY_NODE: 6,PROCESSING_INSTRUCTION_NODE: 7,COMMENT_NODE: 8,DOCUMENT_NODE: 9,DOCUMENT_TYPE_NODE: 10,DOCUMENT_FRAGMENT_NODE: 11,NOTATION_NODE: 12}, h = {isCustomDomain: function(a) {
            var a = a || b, h = a.document.domain, a = a.location.hostname;
            return h != a && h != "[" + a + "]"
        },getEmptyIframeSrc: function(a) {
            a = a || b;
            return j.ie && h.isCustomDomain(a) ? "javascript:void(function(){" + 
            encodeURIComponent("document.open();document.domain='" + a.document.domain + "';document.close();") + "}())" : ""
        },NodeType: k,getWindow: function(a) {
            return !a ? b : "scrollTo" in a && a.document ? a : a.nodeType == k.DOCUMENT_NODE ? a.defaultView || a.parentWindow : !1
        },_isNodeList: function(a) {
            return a && !a.nodeType && a.item && !a.setTimeout
        },nodeName: function(a) {
            var b = h.get(a), a = b.nodeName.toLowerCase();
            j.ie && (b = b.scopeName) && "HTML" != b && (a = b.toLowerCase() + ":" + a);
            return a
        },_RE_NUM_NO_PX: RegExp("^(" + /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source + 
        ")(?!px)[a-z%]+$", "i")};
    a.mix(h, k);
    return h
});
KISSY.add("dom/base/attr", function(a, b, j) {
    function k(a, b) {
        var b = q[b] || b, e = t[b];
        return e && e.get ? e.get(a, b) : a[b]
    }
    var h = a.Env.host.document, i = b.NodeType, l = (h = h && h.documentElement) && h.textContent === j ? "innerText" : "textContent", g = b.nodeName, f = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, d = /^(?:button|input|object|select|textarea)$/i, c = /^a(?:rea)?$/i, e = /:|^on/, m = /\r/g, o = {}, p = {val: 1,css: 1,html: 1,text: 1,data: 1,width: 1,height: 1,
        offset: 1,scrollTop: 1,scrollLeft: 1}, n = {tabindex: {get: function(a) {
                var b = a.getAttributeNode("tabindex");
                return b && b.specified ? parseInt(b.value, 10) : d.test(a.nodeName) || c.test(a.nodeName) && a.href ? 0 : j
            }}}, q = {hidefocus: "hideFocus",tabindex: "tabIndex",readonly: "readOnly","for": "htmlFor","class": "className",maxlength: "maxLength",cellspacing: "cellSpacing",cellpadding: "cellPadding",rowspan: "rowSpan",colspan: "colSpan",usemap: "useMap",frameborder: "frameBorder",contenteditable: "contentEditable"}, r = {get: function(a, 
        e) {
            return b.prop(a, e) ? e.toLowerCase() : j
        },set: function(a, e, d) {
            !1 === e ? b.removeAttr(a, d) : (e = q[d] || d, e in a && (a[e] = !0), a.setAttribute(d, d.toLowerCase()));
            return d
        }}, t = {}, s = {}, u = {select: {get: function(a) {
                var e = a.selectedIndex, d = a.options, c;
                if (0 > e)
                    return null;
                if ("select-one" === a.type)
                    return b.val(d[e]);
                a = [];
                e = 0;
                for (c = d.length; e < c; ++e)
                    d[e].selected && a.push(b.val(d[e]));
                return a
            },set: function(e, d) {
                var c = a.makeArray(d);
                a.each(e.options, function(e) {
                    e.selected = a.inArray(b.val(e), c)
                });
                c.length || (e.selectedIndex = 
                -1);
                return c
            }}};
    a.each(["radio", "checkbox"], function(e) {
        u[e] = {get: function(a) {
                return null === a.getAttribute("value") ? "on" : a.value
            },set: function(e, d) {
                if (a.isArray(d))
                    return e.checked = a.inArray(b.val(e), d)
            }}
    });
    n.style = {get: function(a) {
            return a.style.cssText
        }};
    a.mix(b, {_valHooks: u,_propFix: q,_attrHooks: n,_propHooks: t,_attrNodeHook: s,_attrFix: o,prop: function(e, d, c) {
            var g = b.query(e), f, i;
            if (a.isPlainObject(d))
                return a.each(d, function(a, e) {
                    b.prop(g, e, a)
                }), j;
            d = q[d] || d;
            i = t[d];
            if (c !== j)
                for (e = g.length - 1; 0 <= e; e--)
                    f = 
                    g[e], i && i.set ? i.set(f, c, d) : f[d] = c;
            else if (g.length)
                return k(g[0], d);
            return j
        },hasProp: function(a, e) {
            var d = b.query(a), c, g = d.length, f;
            for (c = 0; c < g; c++)
                if (f = d[c], k(f, e) !== j)
                    return !0;
            return !1
        },removeProp: function(a, e) {
            var e = q[e] || e, d = b.query(a), c, g;
            for (c = d.length - 1; 0 <= c; c--) {
                g = d[c];
                try {
                    g[e] = j, delete g[e]
                } catch (f) {
                }
            }
        },attr: function(d, c, m, h) {
            var k = b.query(d), l = k[0];
            if (a.isPlainObject(c)) {
                var h = m, q;
                for (q in c)
                    b.attr(k, q, c[q], h);
                return j
            }
            if (!(c = a.trim(c)))
                return j;
            if (h && p[c])
                return b[c](d, m);
            c = c.toLowerCase();
            if (h && p[c])
                return b[c](d, m);
            c = o[c] || c;
            d = f.test(c) ? r : e.test(c) ? s : n[c];
            if (m === j) {
                if (l && l.nodeType === i.ELEMENT_NODE) {
                    "form" == g(l) && (d = s);
                    if (d && d.get)
                        return d.get(l, c);
                    c = l.getAttribute(c);
                    return null === c ? j : c
                }
            } else
                for (h = k.length - 1; 0 <= h; h--)
                    if ((l = k[h]) && l.nodeType === i.ELEMENT_NODE)
                        "form" == g(l) && (d = s), d && d.set ? d.set(l, m, c) : l.setAttribute(c, "" + m);
            return j
        },removeAttr: function(a, e) {
            var e = e.toLowerCase(), e = o[e] || e, d = b.query(a), c, g, m;
            for (m = d.length - 1; 0 <= m; m--)
                if (g = d[m], g.nodeType == i.ELEMENT_NODE && (g.removeAttribute(e), 
                f.test(e) && (c = q[e] || e) in g))
                    g[c] = !1
        },hasAttr: h && !h.hasAttribute ? function(a, e) {
            var e = e.toLowerCase(), d = b.query(a), c, g;
            for (c = 0; c < d.length; c++)
                if (g = d[c], (g = g.getAttributeNode(e)) && g.specified)
                    return !0;
            return !1
        } : function(a, e) {
            var d = b.query(a), c, g = d.length;
            for (c = 0; c < g; c++)
                if (d[c].hasAttribute(e))
                    return !0;
            return !1
        },val: function(e, d) {
            var c, f, i, h, k;
            if (d === j) {
                if (i = b.get(e)) {
                    if ((c = u[g(i)] || u[i.type]) && "get" in c && (f = c.get(i, "value")) !== j)
                        return f;
                    f = i.value;
                    return "string" === typeof f ? f.replace(m, "") : null == f ? "" : 
                    f
                }
                return j
            }
            f = b.query(e);
            for (h = f.length - 1; 0 <= h; h--) {
                i = f[h];
                if (1 !== i.nodeType)
                    break;
                k = d;
                null == k ? k = "" : "number" === typeof k ? k += "" : a.isArray(k) && (k = a.map(k, function(a) {
                    return a == null ? "" : a + ""
                }));
                c = u[g(i)] || u[i.type];
                if (!c || !("set" in c) || c.set(i, k, "value") === j)
                    i.value = k
            }
            return j
        },text: function(a, e) {
            var d, c, g;
            if (e === j) {
                d = b.get(a);
                if (d.nodeType == i.ELEMENT_NODE)
                    return d[l] || "";
                if (d.nodeType == i.TEXT_NODE)
                    return d.nodeValue
            } else {
                c = b.query(a);
                for (g = c.length - 1; 0 <= g; g--)
                    d = c[g], d.nodeType == i.ELEMENT_NODE ? d[l] = e : d.nodeType == 
                    i.TEXT_NODE && (d.nodeValue = e)
            }
            return j
        }});
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base", function(a, b) {
    a.mix(a, {DOM: b,get: b.get,query: b.query});
    return b
}, {requires: "./base/api,./base/attr,./base/class,./base/create,./base/data,./base/insertion,./base/offset,./base/style,./base/selector,./base/traversal".split(",")});
KISSY.add("dom/base/class", function(a, b, j) {
    function k(g, f, d, c) {
        if (!(f = a.trim(f)))
            return c ? !1 : j;
        var g = b.query(g), e = g.length, m = f.split(i), f = [], k, l;
        for (l = 0; l < m.length; l++)
            (k = a.trim(m[l])) && f.push(k);
        for (l = 0; l < e; l++)
            if (m = g[l], m.nodeType == h.ELEMENT_NODE && (m = d(m, f, f.length), m !== j))
                return m;
        return c ? !1 : j
    }
    var h = b.NodeType, i = /[\.\s]\s*\.?/, l = /[\n\t]/g;
    a.mix(b, {hasClass: function(a, b) {
            return k(a, b, function(a, b, e) {
                var a = a.className, g, f;
                if (a) {
                    a = (" " + a + " ").replace(l, " ");
                    g = 0;
                    for (f = !0; g < e; g++)
                        if (0 > a.indexOf(" " + 
                        b[g] + " ")) {
                            f = !1;
                            break
                        }
                    if (f)
                        return !0
                }
            }, !0)
        },addClass: function(b, f) {
            k(b, f, function(b, c, e) {
                var g = b.className, i, h;
                if (g) {
                    i = (" " + g + " ").replace(l, " ");
                    for (h = 0; h < e; h++)
                        0 > i.indexOf(" " + c[h] + " ") && (g += " " + c[h]);
                    b.className = a.trim(g)
                } else
                    b.className = f
            }, j)
        },removeClass: function(b, f) {
            k(b, f, function(b, c, e) {
                var g = b.className, f, i;
                if (g)
                    if (e) {
                        g = (" " + g + " ").replace(l, " ");
                        for (f = 0; f < e; f++)
                            for (i = " " + c[f] + " "; 0 <= g.indexOf(i); )
                                g = g.replace(i, " ");
                        b.className = a.trim(g)
                    } else
                        b.className = ""
            }, j)
        },replaceClass: function(a, f, 
        d) {
            b.removeClass(a, f);
            b.addClass(a, d)
        },toggleClass: function(g, f, d) {
            var c = a.isBoolean(d), e, i;
            k(g, f, function(a, g, h) {
                for (i = 0; i < h; i++)
                    f = g[i], e = c ? !d : b.hasClass(a, f), b[e ? "removeClass" : "addClass"](a, f)
            }, j)
        }});
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base/create", function(a, b, j) {
    function k(e) {
        var d = a.require("event/dom");
        d && d.detach(e);
        b.removeData(e)
    }
    function h(a, b) {
        var d = b && b != f ? b.createElement(e) : m;
        d.innerHTML = "m<div>" + a + "</div>";
        return d.lastChild
    }
    function i(a, b, e) {
        var c = b.nodeType;
        if (c == d.DOCUMENT_FRAGMENT_NODE) {
            b = b.childNodes;
            e = e.childNodes;
            for (c = 0; b[c]; )
                e[c] && i(a, b[c], e[c]), c++
        } else if (c == d.ELEMENT_NODE) {
            b = b.getElementsByTagName("*");
            e = e.getElementsByTagName("*");
            for (c = 0; b[c]; )
                e[c] && a(b[c], e[c]), c++
        }
    }
    function l(e, c) {
        var g = 
        a.require("event/dom"), f, i;
        if (c.nodeType != d.ELEMENT_NODE || b.hasData(e)) {
            f = b.data(e);
            for (i in f)
                b.data(c, i, f[i]);
            g && (g._DOMUtils.removeData(c), g._clone(e, c))
        }
    }
    function g(b) {
        var e = null, d, c;
        if (b && (b.push || b.item) && b[0]) {
            e = b[0].ownerDocument;
            e = e.createDocumentFragment();
            b = a.makeArray(b);
            d = 0;
            for (c = b.length; d < c; d++)
                e.appendChild(b[d])
        }
        return e
    }
    var f = a.Env.host.document, d = b.NodeType, c = a.UA.ie, e = "div", m = f && f.createElement(e), o = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, p = /<([\w:]+)/, 
    n = /^\s+/, q = c && 9 > c, r = /<|&#?\w+;/, t = f && "outerHTML" in f.documentElement, s = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    a.mix(b, {create: function(c, i, m, k) {
            var l = null;
            if (!c)
                return l;
            if (c.nodeType)
                return b.clone(c);
            if ("string" != typeof c)
                return l;
            k === j && (k = !0);
            k && (c = a.trim(c));
            var k = b._creators, t, u, m = m || f, w, v = e;
            if (r.test(c))
                if (w = s.exec(c))
                    l = m.createElement(w[1]);
                else {
                    c = c.replace(o, "<$1></$2>");
                    if ((w = p.exec(c)) && (t = w[1]))
                        v = t.toLowerCase();
                    t = (k[v] || h)(c, m);
                    q && (u = c.match(n)) && t.insertBefore(m.createTextNode(u[0]), t.firstChild);
                    c = t.childNodes;
                    1 === c.length ? l = c[0].parentNode.removeChild(c[0]) : c.length && (l = g(c))
                }
            else
                l = m.createTextNode(c);
            a.isPlainObject(i) && (l.nodeType == d.ELEMENT_NODE ? b.attr(l, i, !0) : l.nodeType == d.DOCUMENT_FRAGMENT_NODE && b.attr(l.childNodes, i, !0));
            return l
        },_fixCloneAttributes: null,_creators: {div: h},_defaultCreator: h,html: function(a, e, c, g) {
            var a = b.query(a), f = a[0], i = !1, h, m;
            if (f) {
                if (e === j)
                    return f.nodeType == d.ELEMENT_NODE ? f.innerHTML : null;
                e += "";
                if (!e.match(/<(?:script|style|link)/i) && (!q || !e.match(n)) && !x[(e.match(p) || 
                ["", ""])[1].toLowerCase()])
                    try {
                        for (h = a.length - 1; 0 <= h; h--)
                            m = a[h], m.nodeType == d.ELEMENT_NODE && (k(m.getElementsByTagName("*")), m.innerHTML = e);
                        i = !0
                    } catch (l) {
                    }
                i || (e = b.create(e, 0, f.ownerDocument, 0), b.empty(a), b.append(e, a, c));
                g && g()
            }
        },outerHTML: function(a, c, g) {
            var i = b.query(a), h = i.length;
            if (a = i[0]) {
                if (c === j) {
                    if (t)
                        return a.outerHTML;
                    c = (c = a.ownerDocument) && c != f ? c.createElement(e) : m;
                    c.innerHTML = "";
                    c.appendChild(b.clone(a, !0));
                    return c.innerHTML
                }
                c += "";
                if (!c.match(/<(?:script|style|link)/i) && t)
                    for (g = h - 1; 0 <= 
                    g; g--)
                        a = i[g], a.nodeType == d.ELEMENT_NODE && (k(a), k(a.getElementsByTagName("*")), a.outerHTML = c);
                else
                    a = b.create(c, 0, a.ownerDocument, 0), b.insertBefore(a, i, g), b.remove(i)
            }
        },remove: function(a, e) {
            var c, g = b.query(a), f, i;
            for (i = g.length - 1; 0 <= i; i--)
                c = g[i], !e && c.nodeType == d.ELEMENT_NODE && (f = c.getElementsByTagName("*"), k(f), k(c)), c.parentNode && c.parentNode.removeChild(c)
        },clone: function(a, e, c, g) {
            "object" === typeof e && (g = e.deepWithDataAndEvent, c = e.withDataAndEvent, e = e.deep);
            var a = b.get(a), f, h = b._fixCloneAttributes, 
            m;
            if (!a)
                return null;
            m = a.nodeType;
            f = a.cloneNode(e);
            if (m == d.ELEMENT_NODE || m == d.DOCUMENT_FRAGMENT_NODE)
                h && m == d.ELEMENT_NODE && h(a, f), e && h && i(h, a, f);
            c && (l(a, f), e && g && i(l, a, f));
            return f
        },empty: function(a) {
            var a = b.query(a), e, c;
            for (c = a.length - 1; 0 <= c; c--)
                e = a[c], b.remove(e.childNodes)
        },_nodeListToFragment: g});
    var u = b._creators, v = b.create, x = {option: "select",optgroup: "select",area: "map",thead: "table",td: "tr",th: "tr",tr: "tbody",tbody: "table",tfoot: "table",caption: "table",colgroup: "table",col: "colgroup",legend: "fieldset"}, 
    w;
    for (w in x)
        (function(a) {
            u[w] = function(b, e) {
                return v("<" + a + ">" + b + "</" + a + ">", null, e)
            }
        })(x[w]);
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base/data", function(a, b, j) {
    var k = a.Env.host, h = "__ks_data_" + a.now(), i = {}, l = {}, g = {applet: 1,object: 1,embed: 1}, f = {hasData: function(b, c) {
            if (b)
                if (c !== j) {
                    if (c in b)
                        return !0
                } else if (!a.isEmptyObject(b))
                    return !0;
            return !1
        }}, d = {hasData: function(a, b) {
            return a == k ? d.hasData(l, b) : f.hasData(a[h], b)
        },data: function(a, b, c) {
            if (a == k)
                return d.data(l, b, c);
            var g = a[h];
            if (c !== j)
                g = a[h] = a[h] || {}, g[b] = c;
            else
                return b !== j ? g && g[b] : g = a[h] = a[h] || {}
        },removeData: function(b, c) {
            if (b == k)
                return d.removeData(l, c);
            var g = b[h];
            if (c !== j)
                delete g[c], a.isEmptyObject(g) && d.removeData(b);
            else
                try {
                    delete b[h]
                } catch (f) {
                    b[h] = j
                }
        }}, c = {hasData: function(a, b) {
            var c = a[h];
            return !c ? !1 : f.hasData(i[c], b)
        },data: function(b, c, d) {
            if (g[b.nodeName.toLowerCase()])
                return j;
            var f = b[h];
            if (!f) {
                if (c !== j && d === j)
                    return j;
                f = b[h] = a.guid()
            }
            b = i[f];
            if (d !== j)
                b = i[f] = i[f] || {}, b[c] = d;
            else
                return c !== j ? b && b[c] : b = i[f] = i[f] || {}
        },removeData: function(b, d) {
            var g = b[h], f;
            if (g)
                if (f = i[g], d !== j)
                    delete f[d], a.isEmptyObject(f) && c.removeData(b);
                else {
                    delete i[g];
                    try {
                        delete b[h]
                    } catch (k) {
                        b[h] = 
                        j
                    }
                    b.removeAttribute && b.removeAttribute(h)
                }
        }};
    a.mix(b, {__EXPANDO: h,hasData: function(a, g) {
            for (var f = !1, i = b.query(a), h = 0; h < i.length && !(f = i[h], f = f.nodeType ? c.hasData(f, g) : d.hasData(f, g)); h++)
                ;
            return f
        },data: function(e, g, f) {
            var e = b.query(e), i = e[0];
            if (a.isPlainObject(g)) {
                for (var h in g)
                    b.data(e, h, g[h]);
                return j
            }
            if (f === j) {
                if (i)
                    return i.nodeType ? c.data(i, g) : d.data(i, g)
            } else
                for (h = e.length - 1; 0 <= h; h--)
                    i = e[h], i.nodeType ? c.data(i, g, f) : d.data(i, g, f);
            return j
        },removeData: function(a, g) {
            var f = b.query(a), i, h;
            for (h = 
            f.length - 1; 0 <= h; h--)
                i = f[h], i.nodeType ? c.removeData(i, g) : d.removeData(i, g)
        }});
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base/insertion", function(a, b) {
    function j(a, b) {
        var h = [], k, n, q;
        for (k = 0; a[k]; k++)
            if (n = a[k], q = g(n), n.nodeType == i.DOCUMENT_FRAGMENT_NODE)
                h.push.apply(h, j(f(n.childNodes), b));
            else if ("script" === q && (!n.type || c.test(n.type)))
                n.parentNode && n.parentNode.removeChild(n), b && b.push(n);
            else {
                if (n.nodeType == i.ELEMENT_NODE && !l.test(q)) {
                    q = [];
                    var r, t, s = n.getElementsByTagName("script");
                    for (t = 0; t < s.length; t++)
                        r = s[t], (!r.type || c.test(r.type)) && q.push(r);
                    d.apply(a, [k + 1, 0].concat(q))
                }
                h.push(n)
            }
        return h
    }
    function k(b) {
        b.src ? 
        a.getScript(b.src) : (b = a.trim(b.text || b.textContent || b.innerHTML || "")) && a.globalEval(b)
    }
    function h(e, c, d, g) {
        e = b.query(e);
        g && (g = []);
        e = j(e, g);
        b._fixInsertionChecked && b._fixInsertionChecked(e);
        var c = b.query(c), f, i, h, l, s = c.length;
        if ((e.length || g && g.length) && s) {
            e = b._nodeListToFragment(e);
            1 < s && (l = b.clone(e, !0), c = a.makeArray(c));
            for (f = 0; f < s; f++)
                i = c[f], e && (h = 0 < f ? b.clone(l, !0) : e, d(h, i)), g && g.length && a.each(g, k)
        }
    }
    var i = b.NodeType, l = /^(?:button|input|object|select|textarea)$/i, g = b.nodeName, f = a.makeArray, d = [].splice, 
    c = /\/(java|ecma)script/i;
    a.mix(b, {_fixInsertionChecked: null,insertBefore: function(a, b, c) {
            h(a, b, function(a, b) {
                b.parentNode && b.parentNode.insertBefore(a, b)
            }, c)
        },insertAfter: function(a, b, c) {
            h(a, b, function(a, b) {
                b.parentNode && b.parentNode.insertBefore(a, b.nextSibling)
            }, c)
        },appendTo: function(a, b, c) {
            h(a, b, function(a, b) {
                b.appendChild(a)
            }, c)
        },prependTo: function(a, b, c) {
            h(a, b, function(a, b) {
                b.insertBefore(a, b.firstChild)
            }, c)
        },wrapAll: function(a, c) {
            c = b.clone(b.get(c), !0);
            a = b.query(a);
            a[0].parentNode && b.insertBefore(c, 
            a[0]);
            for (var d; (d = c.firstChild) && 1 == d.nodeType; )
                c = d;
            b.appendTo(a, c)
        },wrap: function(c, d) {
            c = b.query(c);
            d = b.get(d);
            a.each(c, function(a) {
                b.wrapAll(a, d)
            })
        },wrapInner: function(c, d) {
            c = b.query(c);
            d = b.get(d);
            a.each(c, function(a) {
                var c = a.childNodes;
                c.length ? b.wrapAll(c, d) : a.appendChild(d)
            })
        },unwrap: function(c) {
            c = b.query(c);
            a.each(c, function(a) {
                a = a.parentNode;
                b.replaceWith(a, a.childNodes)
            })
        },replaceWith: function(a, c) {
            var d = b.query(a), c = b.query(c);
            b.remove(c, !0);
            b.insertBefore(c, d);
            b.remove(d)
        }});
    a.each({prepend: "prependTo",
        append: "appendTo",before: "insertBefore",after: "insertAfter"}, function(a, c) {
        b[c] = b[a]
    });
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base/offset", function(a, b, j) {
    function k(a) {
        var b, c = a.ownerDocument.body;
        if (!a.getBoundingClientRect)
            return {left: 0,top: 0};
        b = a.getBoundingClientRect();
        a = b[o];
        b = b[p];
        a -= f.clientLeft || c.clientLeft || 0;
        b -= f.clientTop || c.clientTop || 0;
        return {left: a,top: b}
    }
    function h(a, c) {
        var e = {left: 0,top: 0}, g = d(a[m]), f, i = a, c = c || g;
        do {
            if (g == c) {
                var h = i;
                f = k(h);
                h = d(h[m]);
                f.left += b[q](h);
                f.top += b[r](h)
            } else
                f = k(i);
            e.left += f.left;
            e.top += f.top
        } while (g && g != c && (i = g.frameElement) && (g = g.parent));
        return e
    }
    var i = a.Env.host, 
    l = i.document, g = b.NodeType, f = l && l.documentElement, d = b.getWindow, c = Math.max, e = parseInt, m = "ownerDocument", o = "left", p = "top", n = a.isNumber, q = "scrollLeft", r = "scrollTop";
    a.mix(b, {offset: function(a, c, d) {
            if (c === j) {
                var a = b.get(a), g;
                a && (g = h(a, d));
                return g
            }
            d = b.query(a);
            for (g = d.length - 1; 0 <= g; g--) {
                var a = d[g], f = c;
                "static" === b.css(a, "position") && (a.style.position = "relative");
                var i = h(a), k = {}, m = void 0, l = void 0;
                for (l in f)
                    m = e(b.css(a, l), 10) || 0, k[l] = m + f[l] - i[l];
                b.css(a, k)
            }
            return j
        },scrollIntoView: function(c, f, i, h) {
            var k, 
            l, m, n;
            if (m = b.get(c)) {
                f && (f = b.get(f));
                f || (f = m.ownerDocument);
                f.nodeType == g.DOCUMENT_NODE && (f = d(f));
                a.isPlainObject(i) && (h = i.allowHorizontalScroll, n = i.onlyScrollIfNeeded, i = i.alignWithTop);
                h = h === j ? !0 : h;
                l = !!d(f);
                var c = b.offset(m), q = b.outerHeight(m);
                k = b.outerWidth(m);
                var r, C, I, z;
                l ? (l = f, r = b.height(l), C = b.width(l), z = {left: b.scrollLeft(l),top: b.scrollTop(l)}, l = c[o] - z[o], m = c[p] - z[p], k = c[o] + k - (z[o] + C), c = c[p] + q - (z[p] + r)) : (r = b.offset(f), C = f.clientHeight, I = f.clientWidth, z = {left: b.scrollLeft(f),top: b.scrollTop(f)}, 
                l = c[o] - (r[o] + (e(b.css(f, "borderLeftWidth")) || 0)), m = c[p] - (r[p] + (e(b.css(f, "borderTopWidth")) || 0)), k = c[o] + k - (r[o] + I + (e(b.css(f, "borderRightWidth")) || 0)), c = c[p] + q - (r[p] + C + (e(b.css(f, "borderBottomWidth")) || 0)));
                if (n) {
                    if (0 > m || 0 < c)
                        !0 === i ? b.scrollTop(f, z.top + m) : !1 === i ? b.scrollTop(f, z.top + c) : 0 > m ? b.scrollTop(f, z.top + m) : b.scrollTop(f, z.top + c)
                } else
                    (i = i === j ? !0 : !!i) ? b.scrollTop(f, z.top + m) : b.scrollTop(f, z.top + c);
                if (h)
                    if (n) {
                        if (0 > l || 0 < k)
                            !0 === i ? b.scrollLeft(f, z.left + l) : !1 === i ? b.scrollLeft(f, z.left + k) : 0 > l ? b.scrollLeft(f, 
                            z.left + l) : b.scrollLeft(f, z.left + k)
                    } else
                        (i = i === j ? !0 : !!i) ? b.scrollLeft(f, z.left + l) : b.scrollLeft(f, z.left + k)
            }
        },docWidth: 0,docHeight: 0,viewportHeight: 0,viewportWidth: 0,scrollTop: 0,scrollLeft: 0});
    a.each(["Left", "Top"], function(a, c) {
        var e = "scroll" + a;
        b[e] = function(f, h) {
            if (n(f))
                return arguments.callee(i, f);
            var f = b.get(f), k, l, m, o = d(f);
            o ? h !== j ? (h = parseFloat(h), l = "Left" == a ? h : b.scrollLeft(o), m = "Top" == a ? h : b.scrollTop(o), o.scrollTo(l, m)) : (k = o["page" + (c ? "Y" : "X") + "Offset"], n(k) || (l = o.document, k = l.documentElement[e], 
            n(k) || (k = l.body[e]))) : f.nodeType == g.ELEMENT_NODE && (h !== j ? f[e] = parseFloat(h) : k = f[e]);
            return k
        }
    });
    a.each(["Width", "Height"], function(a) {
        b["doc" + a] = function(e) {
            e = b.get(e);
            e = d(e).document;
            return c(e.documentElement["scroll" + a], e.body["scroll" + a], b["viewport" + a](e))
        };
        b["viewport" + a] = function(c) {
            var c = b.get(c), e = "client" + a, c = d(c).document, f = c.body, g = c.documentElement[e];
            return "CSS1Compat" === c.compatMode && g || f && f[e] || g
        }
    });
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base/selector", function(a, b, j) {
    function k(a) {
        var b, c;
        for (c = 0; c < this.length && !(b = this[c], !1 === a(b, c)); c++)
            ;
    }
    function h(c, d) {
        var f, g, m = "string" == typeof c, n = d == j && (g = 1) ? [e] : h(d);
        c ? m ? (c = v(c), g && "body" == c ? f = [e.body] : 1 == n.length && c && (f = l(c, n[0]))) : g && (f = c.nodeType || c.setTimeout ? [c] : c.getDOMNodes ? c.getDOMNodes() : p(c) ? c : q(c) ? a.makeArray(c) : [c]) : f = [];
        if (!f && (f = [], c)) {
            for (g = 0; g < n.length; g++)
                t.apply(f, i(c, n[g]));
            1 < f.length && (1 < n.length || m && -1 < c.indexOf(u)) && b.unique(f)
        }
        f.each = k;
        return f
    }
    function i(b, 
    c) {
        var e = "string" == typeof b;
        if (e && b.match(w) || !e)
            e = g(b, c);
        else if (e && -1 < b.replace(/"(?:(?:\\.)|[^"])*"/g, "").replace(/'(?:(?:\\.)|[^'])*'/g, "").indexOf(u)) {
            var e = [], d, f = b.split(/\s*,\s*/);
            for (d = 0; d < f.length; d++)
                t.apply(e, i(f[d], c))
        } else
            e = [], (d = a.require("sizzle")) && d(b, c, e);
        return e
    }
    function l(a, c) {
        var e, g, i, h;
        if (x.test(a))
            e = (g = f(a.slice(1), c)) ? [g] : [];
        else if (i = w.exec(a)) {
            g = i[1];
            h = i[2];
            i = i[3];
            if (c = g ? f(g, c) : c)
                i ? !g || -1 != a.indexOf(s) ? e = [].concat(b._getElementsByClassName(i, h, c)) : (g = f(g, c), d(g, i) && (e = 
                [g])) : h && (e = n(b._getElementsByTagName(h, c)));
            e = e || []
        }
        return e
    }
    function g(a, c) {
        var d;
        "string" == typeof a ? d = l(a, c) || [] : p(a) || q(a) ? d = o(a, function(a) {
            return !a ? !1 : c == e ? !0 : b._contains(c, a)
        }) : (!a ? 0 : c == e || b._contains(c, a)) && (d = [a]);
        return d
    }
    function f(a, c) {
        var e = c.nodeType == m.DOCUMENT_NODE;
        return b._getElementById(a, c, e ? c : c.ownerDocument, e)
    }
    function d(a, b) {
        var c = a && a.className;
        return c && -1 < (s + c + s).indexOf(s + b + s)
    }
    function c(a, b) {
        var c = a && a.getAttributeNode(b);
        return c && c.nodeValue
    }
    var e = a.Env.host.document, 
    m = b.NodeType, o = a.filter, p = a.isArray, n = a.makeArray, q = b._isNodeList, r = b.nodeName, t = Array.prototype.push, s = " ", u = ",", v = a.trim, x = /^#[\w-]+$/, w = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;
    a.mix(b, {_getAttr: c,_hasSingleClass: d,_getElementById: function(a, c, e, d) {
            var f = e.getElementById(a), g = b._getAttr(f, "id");
            return !f && !d && !b._contains(e, c) || f && g != a ? b.filter("*", "#" + a, c)[0] || null : d || f && b._contains(c, f) ? f : null
        },_getElementsByTagName: function(a, b) {
            return b.getElementsByTagName(a)
        },_getElementsByClassName: function(a, 
        b, c) {
            return n(c.querySelectorAll((b || "") + "." + a))
        },_compareNodeOrder: function(a, b) {
            return !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1
        },query: h,get: function(a, b) {
            return h(a, b)[0] || null
        },unique: function() {
            function a(e, d) {
                return e == d ? (c = !0, 0) : b._compareNodeOrder(e, d)
            }
            var c, e = !0;
            [0, 0].sort(function() {
                e = !1;
                return 0
            });
            return function(b) {
                c = e;
                b.sort(a);
                if (c)
                    for (var d = 1, f = b.length; d < f; )
                        b[d] === b[d - 1] ? b.splice(d, 1) : d++;
                return b
            }
        }(),
        filter: function(b, e, f) {
            var b = h(b, f), f = a.require("sizzle"), g, i, j, k, l = [];
            if ("string" == typeof e && (e = v(e)) && (g = w.exec(e)))
                j = g[1], i = g[2], k = g[3], j ? j && !i && !k && (e = function(a) {
                    return c(a, "id") == j
                }) : e = function(a) {
                    var b = !0, c = !0;
                    i && (b = r(a) == i.toLowerCase());
                    k && (c = d(a, k));
                    return c && b
                };
            a.isFunction(e) ? l = a.filter(b, e) : e && f && (l = f.matches(e, b));
            return l
        },test: function(a, c, e) {
            a = h(a, e);
            return a.length && b.filter(a, c, e).length === a.length
        }});
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base/style", function(a, b, j) {
    function k(a) {
        return a.replace(t, "ms-").replace(s, u)
    }
    function h(a, b, c) {
        var e = {}, d;
        for (d in b)
            e[d] = a[m][d], a[m][d] = b[d];
        c.call(a);
        for (d in b)
            a[m][d] = e[d]
    }
    function i(a, b, c) {
        var e, d, f;
        if (3 === a.nodeType || 8 === a.nodeType || !(e = a[m]))
            return j;
        b = k(b);
        f = A[b];
        b = y[b] || b;
        if (c !== j) {
            null === c || c === x ? c = x : !isNaN(Number(c)) && !r[b] && (c += w);
            f && f.set && (c = f.set(a, c));
            if (c !== j) {
                try {
                    e[b] = c
                } catch (g) {
                }
                c === x && e.removeAttribute && e.removeAttribute(b)
            }
            e.cssText || a.removeAttribute("style");
            return j
        }
        if (!f || !("get" in f && (d = f.get(a, !1)) !== j))
            d = e[b];
        return d === j ? "" : d
    }
    function l(a) {
        var b, c = arguments;
        0 !== a.offsetWidth ? b = g.apply(j, c) : h(a, D, function() {
            b = g.apply(j, c)
        });
        return b
    }
    function g(c, e, d) {
        if (a.isWindow(c))
            return e == p ? b.viewportWidth(c) : b.viewportHeight(c);
        if (9 == c.nodeType)
            return e == p ? b.docWidth(c) : b.docHeight(c);
        var f = e === p ? ["Left", "Right"] : ["Top", "Bottom"], g = e === p ? c.offsetWidth : c.offsetHeight;
        if (0 < g)
            return "border" !== d && a.each(f, function(a) {
                d || (g -= parseFloat(b.css(c, "padding" + a)) || 0);
                g = "margin" === d ? g + (parseFloat(b.css(c, d + a)) || 0) : g - (parseFloat(b.css(c, "border" + a + "Width")) || 0)
            }), g;
        g = b._getComputedStyle(c, e);
        if (null == g || 0 > Number(g))
            g = c.style[e] || 0;
        g = parseFloat(g) || 0;
        d && a.each(f, function(a) {
            g += parseFloat(b.css(c, "padding" + a)) || 0;
            "padding" !== d && (g += parseFloat(b.css(c, "border" + a + "Width")) || 0);
            "margin" === d && (g += parseFloat(b.css(c, d + a)) || 0)
        });
        return g
    }
    var f = a.Env.host, d = a.UA, c = b.nodeName, e = f.document, m = "style", o = /^margin/, p = "width", n = "display" + a.now(), q = parseInt, r = {fillOpacity: 1,fontWeight: 1,
        lineHeight: 1,opacity: 1,orphans: 1,widows: 1,zIndex: 1,zoom: 1}, t = /^-ms-/, s = /-([a-z])/ig, u = function(a, b) {
        return b.toUpperCase()
    }, v = /([A-Z]|^ms)/g, x = "", w = "px", A = {}, y = {}, B = {};
    y["float"] = "cssFloat";
    a.mix(b, {_camelCase: k,_CUSTOM_STYLES: A,_cssProps: y,_getComputedStyle: function(a, c) {
            var e = "", d, g, f, i, h;
            g = a.ownerDocument;
            c = c.replace(v, "-$1").toLowerCase();
            if (d = g.defaultView.getComputedStyle(a, null))
                e = d.getPropertyValue(c) || d[c];
            "" === e && !b.contains(g, a) && (c = y[c] || c, e = a[m][c]);
            b._RE_NUM_NO_PX.test(e) && o.test(c) && 
            (h = a.style, g = h.width, f = h.minWidth, i = h.maxWidth, h.minWidth = h.maxWidth = h.width = e, e = d.width, h.width = g, h.minWidth = f, h.maxWidth = i);
            return e
        },style: function(c, e, d) {
            var c = b.query(c), g, f = c[0];
            if (a.isPlainObject(e)) {
                for (g in e)
                    for (f = c.length - 1; 0 <= f; f--)
                        i(c[f], g, e[g]);
                return j
            }
            if (d === j)
                return g = "", f && (g = i(f, e, d)), g;
            for (f = c.length - 1; 0 <= f; f--)
                i(c[f], e, d);
            return j
        },css: function(c, e, d) {
            var c = b.query(c), g = c[0], f;
            if (a.isPlainObject(e)) {
                for (f in e)
                    for (g = c.length - 1; 0 <= g; g--)
                        i(c[g], f, e[f]);
                return j
            }
            e = k(e);
            f = A[e];
            if (d === 
            j) {
                d = "";
                if (g && (!f || !("get" in f && (d = f.get(g, !0)) !== j)))
                    d = b._getComputedStyle(g, e);
                return d === j ? "" : d
            }
            for (g = c.length - 1; 0 <= g; g--)
                i(c[g], e, d);
            return j
        },show: function(a) {
            var a = b.query(a), c, d, g;
            for (g = a.length - 1; 0 <= g; g--)
                if (d = a[g], d[m].display = b.data(d, n) || x, "none" === b.css(d, "display")) {
                    c = d.tagName.toLowerCase();
                    var f = void 0, i = B[c], h = void 0;
                    B[c] || (f = e.body || e.documentElement, h = e.createElement(c), b.prepend(h, f), i = b.css(h, "display"), f.removeChild(h), B[c] = i);
                    c = i;
                    b.data(d, n, c);
                    d[m].display = c
                }
        },hide: function(a) {
            var a = 
            b.query(a), c, e;
            for (e = a.length - 1; 0 <= e; e--) {
                c = a[e];
                var d = c[m], g = d.display;
                "none" !== g && (g && b.data(c, n, g), d.display = "none")
            }
        },toggle: function(a) {
            var a = b.query(a), c, e;
            for (e = a.length - 1; 0 <= e; e--)
                c = a[e], "none" === b.css(c, "display") ? b.show(c) : b.hide(c)
        },addStyleSheet: function(a, c, e) {
            a = a || f;
            "string" == typeof a && (e = c, c = a, a = f);
            var a = b.get(a), a = b.getWindow(a).document, d;
            if (e && (e = e.replace("#", x)))
                d = b.get("#" + e, a);
            d || (d = b.create("<style>", {id: e}, a), b.get("head", a).appendChild(d), d.styleSheet ? d.styleSheet.cssText = 
            c : d.appendChild(a.createTextNode(c)))
        },unselectable: function(e) {
            var e = b.query(e), g, f, i = 0, h, j;
            for (f = e.length - 1; 0 <= f; f--)
                if (g = e[f], d.gecko)
                    g[m].MozUserSelect = "none";
                else if (d.webkit)
                    g[m].KhtmlUserSelect = "none";
                else if (d.ie || d.opera) {
                    j = g.getElementsByTagName("*");
                    g.setAttribute("unselectable", "on");
                    for (h = ["iframe", "textarea", "input", "select"]; g = j[i++]; )
                        a.inArray(c(g), h) || g.setAttribute("unselectable", "on")
                }
        },innerWidth: 0,innerHeight: 0,outerWidth: 0,outerHeight: 0,width: 0,height: 0});
    a.each([p, "height"], 
    function(c) {
        b["inner" + a.ucfirst(c)] = function(a) {
            return (a = b.get(a)) && l(a, c, "padding")
        };
        b["outer" + a.ucfirst(c)] = function(a, e) {
            var d = b.get(a);
            return d && l(d, c, e ? "margin" : "border")
        };
        b[c] = function(a, e) {
            var d = b.css(a, c, e);
            d && (d = parseFloat(d));
            return d
        }
    });
    var D = {position: "absolute",visibility: "hidden",display: "block"};
    a.each(["height", "width"], function(a) {
        A[a] = {get: function(b, c) {
                return c ? l(b, a) + "px" : j
            }}
    });
    a.each(["left", "top"], function(c) {
        A[c] = {get: function(g, f) {
                var i;
                if (f && (i = b._getComputedStyle(g, c), "auto" === 
                i)) {
                    i = 0;
                    if (a.inArray(b.css(g, "position"), ["absolute", "fixed"])) {
                        i = g["left" === c ? "offsetLeft" : "offsetTop"];
                        if (d.ie && 9 > (e.documentMode || 0) || d.opera)
                            i -= g.offsetParent && g.offsetParent["client" + ("left" == c ? "Left" : "Top")] || 0;
                        i -= q(b.css(g, "margin-" + c)) || 0
                    }
                    i += "px"
                }
                return i
            }}
    });
    return b
}, {requires: ["./api"]});
KISSY.add("dom/base/traversal", function(a, b, j) {
    function k(g, f, d, c, e, i, k) {
        if (!(g = b.get(g)))
            return null;
        if (0 === f)
            return g;
        i || (g = g[d]);
        if (!g)
            return null;
        e = e && b.get(e) || null;
        f === j && (f = 1);
        var i = [], p = a.isArray(f), n, q;
        a.isNumber(f) && (n = 0, q = f, f = function() {
            return ++n === q
        });
        for (; g && g != e; ) {
            if ((g.nodeType == l.ELEMENT_NODE || g.nodeType == l.TEXT_NODE && k) && h(g, f) && (!c || c(g)))
                if (i.push(g), !p)
                    break;
            g = g[d]
        }
        return p ? i : i[0] || null
    }
    function h(g, f) {
        if (!f)
            return !0;
        if (a.isArray(f)) {
            var d, c = f.length;
            if (!c)
                return !0;
            for (d = 0; d < c; d++)
                if (b.test(g, 
                f[d]))
                    return !0
        } else if (b.test(g, f))
            return !0;
        return !1
    }
    function i(g, f, d, c) {
        var e = [], i, h;
        if ((i = g = b.get(g)) && d)
            i = g.parentNode;
        if (i) {
            d = a.makeArray(i.childNodes);
            for (i = 0; i < d.length; i++)
                h = d[i], (c || h.nodeType == l.ELEMENT_NODE) && h != g && e.push(h);
            f && (e = b.filter(e, f))
        }
        return e
    }
    var l = b.NodeType;
    a.mix(b, {_contains: function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16)
        },closest: function(a, b, d, c) {
            return k(a, b, "parentNode", function(a) {
                return a.nodeType != l.DOCUMENT_FRAGMENT_NODE
            }, d, !0, c)
        },parent: function(a, b, d) {
            return k(a, 
            b, "parentNode", function(a) {
                return a.nodeType != l.DOCUMENT_FRAGMENT_NODE
            }, d, j)
        },first: function(a, f, d) {
            a = b.get(a);
            return k(a && a.firstChild, f, "nextSibling", j, j, !0, d)
        },last: function(a, f, d) {
            a = b.get(a);
            return k(a && a.lastChild, f, "previousSibling", j, j, !0, d)
        },next: function(a, b, d) {
            return k(a, b, "nextSibling", j, j, j, d)
        },prev: function(a, b, d) {
            return k(a, b, "previousSibling", j, j, j, d)
        },siblings: function(a, b, d) {
            return i(a, b, !0, d)
        },children: function(a, b) {
            return i(a, b, j)
        },contents: function(a, b) {
            return i(a, b, j, 1)
        },contains: function(a, 
        f) {
            a = b.get(a);
            f = b.get(f);
            return a && f ? b._contains(a, f) : !1
        },index: function(g, f) {
            var d = b.query(g), c, e = 0;
            c = d[0];
            if (!f) {
                d = c && c.parentNode;
                if (!d)
                    return -1;
                for (; c = c.previousSibling; )
                    c.nodeType == l.ELEMENT_NODE && e++;
                return e
            }
            e = b.query(f);
            return "string" === typeof f ? a.indexOf(c, e) : a.indexOf(e[0], d)
        },equals: function(a, f) {
            a = b.query(a);
            f = b.query(f);
            if (a.length != f.length)
                return !1;
            for (var d = a.length; 0 <= d; d--)
                if (a[d] != f[d])
                    return !1;
            return !0
        }});
    return b
}, {requires: ["./api"]});
KISSY.add("dom/ie/attr", function(a, b) {
    var j = b._attrHooks, k = b._attrNodeHook, h = b.NodeType, i = b._valHooks, l = b._propFix;
    8 > a.UA.ie && (j.style.set = function(a, b) {
        a.style.cssText = b
    }, a.mix(k, {get: function(a, b) {
            var d = a.getAttributeNode(b);
            return d && (d.specified || d.nodeValue) ? d.nodeValue : void 0
        },set: function(a, b, d) {
            var c = a.getAttributeNode(d), e;
            if (c)
                c.nodeValue = b;
            else
                try {
                    e = a.ownerDocument.createAttribute(d), e.value = b, a.setAttributeNode(e)
                } catch (i) {
                    return a.setAttribute(d, b, 0)
                }
        }}), a.mix(b._attrFix, l), j.tabIndex = 
    j.tabindex, a.each("href,src,width,height,colSpan,rowSpan".split(","), function(a) {
        j[a] = {get: function(b) {
                b = b.getAttribute(a, 2);
                return b === null ? void 0 : b
            }}
    }), i.button = j.value = k, i.option = {get: function(a) {
            var b = a.attributes.value;
            return !b || b.specified ? a.value : a.text
        }});
    (j.href = j.href || {}).set = function(a, b, d) {
        for (var c = a.childNodes, e, i = c.length, j = i > 0, i = i - 1; i >= 0; i--)
            c[i].nodeType != h.TEXT_NODE && (j = 0);
        if (j) {
            e = a.ownerDocument.createElement("b");
            e.style.display = "none";
            a.appendChild(e)
        }
        a.setAttribute(d, "" + b);
        e && a.removeChild(e)
    };
    return b
}, {requires: ["dom/base"]});
KISSY.add("dom/ie/create", function(a, b) {
    b._fixCloneAttributes = function(a, h) {
        h.clearAttributes && h.clearAttributes();
        h.mergeAttributes && h.mergeAttributes(a);
        var g = h.nodeName.toLowerCase(), f = a.childNodes;
        if ("object" === g && !h.childNodes.length)
            for (g = 0; g < f.length; g++)
                h.appendChild(f[g].cloneNode(!0));
        else if ("input" === g && ("checkbox" === a.type || "radio" === a.type)) {
            if (a.checked && (h.defaultChecked = h.checked = a.checked), h.value !== a.value)
                h.value = a.value
        } else if ("option" === g)
            h.selected = a.defaultSelected;
        else if ("input" === 
        g || "textarea" === g)
            h.defaultValue = a.defaultValue;
        h.removeAttribute(b.__EXPANDO)
    };
    var j = b._creators, k = b._defaultCreator, h = /<tbody/i;
    8 > a.UA.ie && (j.table = function(i, j) {
        var g = k(i, j);
        if (h.test(i))
            return g;
        var f = g.firstChild, d = a.makeArray(f.childNodes);
        a.each(d, function(a) {
            "tbody" == b.nodeName(a) && !a.childNodes.length && f.removeChild(a)
        });
        return g
    })
}, {requires: ["dom/base"]});
KISSY.add("dom/ie", function(a, b) {
    return b
}, {requires: "./ie/attr,./ie/create,./ie/insertion,./ie/selector,./ie/style,./ie/traversal,./ie/input-selection".split(",")});
KISSY.add("dom/ie/input-selection", function(a, b) {
    function j(a, b) {
        var d = 0, c = 0, e = a.ownerDocument.selection.createRange(), h = k(a);
        h.inRange(e) && (h.setEndPoint("EndToStart", e), d = i(a, h).length, b && (c = d + i(a, e).length));
        return [d, c]
    }
    function k(a) {
        if ("textarea" == a.type) {
            var b = a.document.body.createTextRange();
            b.moveToElementText(a);
            return b
        }
        return a.createTextRange()
    }
    function h(a, b, d) {
        var c = Math.min(b, d), e = Math.max(b, d);
        return c == e ? 0 : "textarea" == a.type ? (a = a.value.substring(c, e).replace(/\r\n/g, "\n").length, 
        b > d && (a = -a), a) : d - b
    }
    function i(a, b) {
        if ("textarea" == a.type) {
            var d = b.text, c = b.duplicate();
            if (0 == c.compareEndPoints("StartToEnd", c))
                return d;
            c.moveEnd("character", -1);
            c.text == d && (d += "\r\n");
            return d
        }
        return b.text
    }
    var l = b._propHooks;
    l.selectionStart = {set: function(a, b) {
            var d = a.ownerDocument.selection.createRange();
            if (k(a).inRange(d)) {
                var c = j(a, 1)[1], e = h(a, b, c);
                d.collapse(!1);
                d.moveStart("character", -e);
                b > c && d.collapse(!0);
                d.select()
            }
        },get: function(a) {
            return j(a)[0]
        }};
    l.selectionEnd = {set: function(a, b) {
            var d = 
            a.ownerDocument.selection.createRange();
            if (k(a).inRange(d)) {
                var c = j(a)[0], e = h(a, c, b);
                d.collapse(!0);
                d.moveEnd("character", e);
                c > b && d.collapse(!1);
                d.select()
            }
        },get: function(a) {
            return j(a, 1)[1]
        }}
}, {requires: ["dom/base"]});
KISSY.add("dom/ie/insertion", function(a, b) {
    8 > a.UA.ie && (b._fixInsertionChecked = function k(a) {
        for (var i = 0; i < a.length; i++) {
            var l = a[i];
            if (l.nodeType == b.NodeType.DOCUMENT_FRAGMENT_NODE)
                k(l.childNodes);
            else if ("input" == b.nodeName(l)) {
                if ("checkbox" === l.type || "radio" === l.type)
                    l.defaultChecked = l.checked
            } else if (l.nodeType == b.NodeType.ELEMENT_NODE)
                for (var l = l.getElementsByTagName("input"), g = 0; g < l.length; g++)
                    k(l[g])
        }
    })
}, {requires: ["dom/base"]});
KISSY.add("dom/ie/selector", function(a, b) {
    var j = a.Env.host.document;
    b._compareNodeOrder = function(a, b) {
        return a.sourceIndex - b.sourceIndex
    };
    j.querySelectorAll || (b._getElementsByClassName = function(a, h, i) {
        if (!i)
            return [];
        for (var h = i.getElementsByTagName(h || "*"), i = [], j = 0, g = 0, f = h.length, d; j < f; ++j)
            d = h[j], b._hasSingleClass(d, a) && (i[g++] = d);
        return i
    });
    b._getElementsByTagName = function(b, h) {
        var i = a.makeArray(h.getElementsByTagName(b)), j, g, f, d;
        if (b === "*") {
            j = [];
            for (f = g = 0; d = i[g++]; )
                d.nodeType === 1 && (j[f++] = d);
            i = 
            j
        }
        return i
    }
}, {requires: ["dom/base"]});
KISSY.add("dom/ie/style", function(a, b) {
    var j = b._cssProps, k = a.UA, h = a.Env.host.document, h = h && h.documentElement, i = /^(top|right|bottom|left)$/, l = b._CUSTOM_STYLES, g = /opacity\s*=\s*([^)]*)/, f = /alpha\([^)]*\)/i;
    j["float"] = "styleFloat";
    l.backgroundPosition = {get: function(a, b) {
            return b ? a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY : a.style.backgroundPosition
        }};
    try {
        null == h.style.opacity && (l.opacity = {get: function(a, b) {
                return g.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || 
                "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : ""
            },set: function(b, c) {
                var c = parseFloat(c), d = b.style, g = b.currentStyle, i = isNaN(c) ? "" : "alpha(opacity=" + 100 * c + ")", h = a.trim(g && g.filter || d.filter || "");
                d.zoom = 1;
                if ((1 <= c || !i) && !a.trim(h.replace(f, "")))
                    if (d.removeAttribute("filter"), !i || g && !g.filter)
                        return;
                d.filter = f.test(h) ? h.replace(f, i) : h + (h ? ", " : "") + i
            }})
    } catch (d) {
    }
    var k = 8 == k.ie, c = {};
    c.thin = k ? "1px" : "2px";
    c.medium = k ? "3px" : "4px";
    c.thick = k ? "5px" : "6px";
    a.each(["", "Top", "Left", "Right", "Bottom"], function(a) {
        var b = "border" + 
        a + "Width", d = "border" + a + "Style";
        l[b] = {get: function(a, e) {
                var f = e ? a.currentStyle : 0, g = f && "" + f[b] || void 0;
                g && 0 > g.indexOf("px") && (g = c[g] && "none" !== f[d] ? c[g] : 0);
                return g
            }}
    });
    b._getComputedStyle = function(a, c) {
        var c = j[c] || c, d = a.currentStyle && a.currentStyle[c];
        if (b._RE_NUM_NO_PX.test(d) && !i.test(c)) {
            var f = a.style, g = f.left, h = a.runtimeStyle.left;
            a.runtimeStyle.left = a.currentStyle.left;
            f.left = "fontSize" === c ? "1em" : d || 0;
            d = f.pixelLeft + "px";
            f.left = g;
            a.runtimeStyle.left = h
        }
        return "" === d ? "auto" : d
    }
}, {requires: ["dom/base"]});
KISSY.add("dom/ie/traversal", function(a, b) {
    b._contains = function(a, k) {
        a.nodeType == b.NodeType.DOCUMENT_NODE && (a = a.documentElement);
        k = k.parentNode;
        return a == k ? !0 : k && k.nodeType == b.NodeType.ELEMENT_NODE ? a.contains && a.contains(k) : !1
    }
}, {requires: ["dom/base"]});
KISSY.add("event/base", function(a, b, j, k, h) {
    return a.Event = {_Utils: b,_Object: j,_Observer: k,_ObservableEvent: h}
}, {requires: ["./base/utils", "./base/object", "./base/observer", "./base/observable"]});
KISSY.add("event/base/object", function(a) {
    function b() {
        this.timeStamp = a.now()
    }
    var j = function() {
        return !1
    }, k = function() {
        return !0
    };
    b.prototype = {constructor: b,isDefaultPrevented: j,isPropagationStopped: j,isImmediatePropagationStopped: j,preventDefault: function() {
            this.isDefaultPrevented = k
        },stopPropagation: function() {
            this.isPropagationStopped = k
        },stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = k;
            this.stopPropagation()
        },halt: function(a) {
            a ? this.stopImmediatePropagation() : this.stopPropagation();
            this.preventDefault()
        }};
    return b
});
KISSY.add("event/base/observable", function(a) {
    function b(b) {
        a.mix(this, b);
        this.reset()
    }
    b.prototype = {constructor: b,hasObserver: function() {
            return !!this.observers.length
        },reset: function() {
            this.observers = []
        },removeObserver: function(a) {
            var b, h = this.observers, i = h.length;
            for (b = 0; b < i; b++)
                if (h[b] == a) {
                    h.splice(b, 1);
                    break
                }
            this.checkMemory()
        },checkMemory: function() {
        },findObserver: function(a) {
            var b = this.observers, h;
            for (h = b.length - 1; 0 <= h; --h)
                if (a.equals(b[h]))
                    return h;
            return -1
        }};
    return b
});
KISSY.add("event/base/observer", function(a) {
    function b(b) {
        a.mix(this, b)
    }
    b.prototype = {constructor: b,equals: function(b) {
            var k = this;
            return !!a.reduce(k.keys, function(a, i) {
                return a && k[i] === b[i]
            }, 1)
        },simpleNotify: function(a, b) {
            var h;
            h = this.fn.call(this.context || b.currentTarget, a, this.data);
            this.once && b.removeObserver(this);
            return h
        },notifyInternal: function(a, b) {
            return this.simpleNotify(a, b)
        },notify: function(a, b) {
            var h;
            h = a._ks_groups;
            if (!h || this.groups && this.groups.match(h))
                return h = this.notifyInternal(a, 
                b), !1 === h && a.halt(), h
        }};
    return b
});
KISSY.add("event/base/utils", function(a) {
    var b, j;
    return {splitAndRun: j = function(b, h) {
            b = a.trim(b);
            -1 == b.indexOf(" ") ? h(b) : a.each(b.split(/\s+/), h)
        },normalizeParam: function(j, h, i) {
            var l = h || {}, l = a.isFunction(h) ? {fn: h,context: i} : a.merge(l), h = b(j), j = h[0];
            l.groups = h[1];
            l.type = j;
            return l
        },batchForType: function(b, h) {
            var i = a.makeArray(arguments);
            j(i[2 + h], function(a) {
                var g = [].concat(i);
                g.splice(0, 2);
                g[h] = a;
                b.apply(null, g)
            })
        },getTypedGroups: b = function(a) {
            if (0 > a.indexOf("."))
                return [a, ""];
            var b = a.match(/([^.]+)?(\..+)?$/), 
            a = [b[1]];
            (b = b[2]) ? (b = b.split(".").sort(), a.push(b.join("."))) : a.push("");
            return a
        },getGroupsRe: function(a) {
            return RegExp(a.split(".").join(".*\\.") + "(?:\\.|$)")
        }}
});
KISSY.add("event/custom/api-impl", function(a, b, j, k) {
    var h = a.trim, i = j._Utils, l = i.splitAndRun;
    return a.mix(b, {fire: function(a, b, d) {
            var c = void 0, d = d || {};
            l(b, function(b) {
                var f, b = i.getTypedGroups(b);
                f = b[1];
                b = b[0];
                f && (f = i.getGroupsRe(f), d._ks_groups = f);
                f = (k.getCustomEvent(a, b) || new k({currentTarget: a,type: b})).fire(d);
                !1 !== c && (c = f)
            });
            return c
        },publish: function(b, f, d) {
            var c;
            l(f, function(e) {
                c = k.getCustomEvent(b, e, 1);
                a.mix(c, d)
            });
            return b
        },addTarget: function(g, f) {
            var d = b.getTargets(g);
            a.inArray(f, d) || d.push(f);
            return g
        },removeTarget: function(g, f) {
            var d = b.getTargets(g), c = a.indexOf(f, d);
            -1 != c && d.splice(c, 1);
            return g
        },getTargets: function(a) {
            a["__~ks_bubble_targets"] = a["__~ks_bubble_targets"] || [];
            return a["__~ks_bubble_targets"]
        },on: function(a, b, d, c) {
            b = h(b);
            i.batchForType(function(b, c, d) {
                c = i.normalizeParam(b, c, d);
                b = c.type;
                if (b = k.getCustomEvent(a, b, 1))
                    b.on(c)
            }, 0, b, d, c);
            return a
        },detach: function(b, f, d, c) {
            f = h(f);
            i.batchForType(function(c, d, f) {
                var h = i.normalizeParam(c, d, f);
                (c = h.type) ? (c = k.getCustomEvent(b, c, 1)) && 
                c.detach(h) : (c = k.getCustomEvents(b), a.each(c, function(a) {
                    a.detach(h)
                }))
            }, 0, f, d, c);
            return b
        }})
}, {requires: ["./api", "event/base", "./observable"]});
KISSY.add("event/custom/api", function() {
    return {}
});
KISSY.add("event/custom", function(a, b, j, k) {
    var h = {};
    a.each(j, function(b, j) {
        h[j] = function() {
            var g = a.makeArray(arguments);
            g.unshift(this);
            return b.apply(null, g)
        }
    });
    j = a.mix({_ObservableCustomEvent: k,Target: h}, j);
    a.mix(b, {Target: h,custom: j});
    a.EventTarget = h;
    return j
}, {requires: ["./base", "./custom/api-impl", "./custom/observable"]});
KISSY.add("event/custom/object", function(a, b) {
    function j(b) {
        j.superclass.constructor.call(this);
        a.mix(this, b)
    }
    a.extend(j, b._Object);
    return j
}, {requires: ["event/base"]});
KISSY.add("event/custom/observable", function(a, b, j, k, h) {
    function i() {
        i.superclass.constructor.apply(this, arguments);
        this.defaultFn = null;
        this.defaultTargetOnly = !1;
        this.bubbles = !0
    }
    var l = h._Utils;
    a.extend(i, h._ObservableEvent, {constructor: i,on: function(a) {
            a = new j(a);
            -1 == this.findObserver(a) && this.observers.push(a)
        },checkMemory: function() {
            var b = this.currentTarget, d = i.getCustomEvents(b);
            d && (this.hasObserver() || delete d[this.type], a.isEmptyObject(d) && delete b[g])
        },fire: function(a) {
            if (this.hasObserver() || 
            this.bubbles) {
                var a = a || {}, d = this.type, c = this.defaultFn, e, g, h;
                e = this.currentTarget;
                var j = a, l;
                a.type = d;
                j instanceof k || (j.target = e, j = new k(j));
                j.currentTarget = e;
                a = this.notify(j);
                !1 !== l && (l = a);
                if (this.bubbles) {
                    h = (g = b.getTargets(e)) && g.length || 0;
                    for (e = 0; e < h && !j.isPropagationStopped(); e++)
                        a = b.fire(g[e], d, j), !1 !== l && (l = a)
                }
                c && !j.isDefaultPrevented() && (d = i.getCustomEvent(j.target, j.type), (!this.defaultTargetOnly && !d.defaultTargetOnly || this == j.target) && c.call(this));
                return l
            }
        },notify: function(a) {
            var b = this.observers, 
            c, e, g = b.length, i;
            for (i = 0; i < g && !a.isImmediatePropagationStopped(); i++)
                c = b[i].notify(a, this), !1 !== e && (e = c), !1 === c && a.halt();
            return e
        },detach: function(a) {
            var b, c = a.fn, e = a.context, g = this.currentTarget, i = this.observers, a = a.groups;
            if (i.length) {
                a && (b = l.getGroupsRe(a));
                var h, j, k, r, t = i.length;
                if (c || b) {
                    e = e || g;
                    h = a = 0;
                    for (j = []; a < t; ++a)
                        if (k = i[a], r = k.context || g, e != r || c && c != k.fn || b && !k.groups.match(b))
                            j[h++] = k;
                    this.observers = j
                } else
                    this.reset();
                this.checkMemory()
            }
        }});
    var g = "__~ks_custom_events";
    i.getCustomEvent = 
    function(a, b, c) {
        var e, g = i.getCustomEvents(a, c);
        e = g && g[b];
        !e && c && (e = g[b] = new i({currentTarget: a,type: b}));
        return e
    };
    i.getCustomEvents = function(a, b) {
        !a[g] && b && (a[g] = {});
        return a[g]
    };
    return i
}, {requires: ["./api", "./observer", "./object", "event/base"]});
KISSY.add("event/custom/observer", function(a, b) {
    function j() {
        j.superclass.constructor.apply(this, arguments)
    }
    a.extend(j, b._Observer, {keys: ["fn", "context", "groups"]});
    return j
}, {requires: ["event/base"]});
KISSY.add("event/dom/base/api", function(a, b, j, k, h, i, l) {
    function g(a, b) {
        var d = k[b] || {};
        a.originalType || (a.selector ? d.delegateFix && (a.originalType = b, b = d.delegateFix) : d.onFix && (a.originalType = b, b = d.onFix));
        return b
    }
    function f(b, d, f) {
        var h, j, k, f = a.merge(f), d = g(f, d);
        h = i.getCustomEvents(b, 1);
        if (!(k = h.handle))
            k = h.handle = function(a) {
                var b = a.type, c = k.currentTarget;
                if (!(i.triggeredEvent == b || "undefined" == typeof KISSY))
                    if (b = i.getCustomEvent(c, b))
                        return a.currentTarget = c, a = new l(a), b.notify(a)
            }, k.currentTarget = 
            b;
        if (!(j = h.events))
            j = h.events = {};
        h = j[d];
        h || (h = j[d] = new i({type: d,fn: k,currentTarget: b}), h.setup());
        h.on(f);
        b = null
    }
    var d = b._Utils;
    a.mix(b, {add: function(b, e, g, i) {
            e = a.trim(e);
            b = j.query(b);
            d.batchForType(function(a, b, c, e) {
                c = d.normalizeParam(b, c, e);
                b = c.type;
                for (e = a.length - 1; 0 <= e; e--)
                    f(a[e], b, c)
            }, 1, b, e, g, i);
            return b
        },remove: function(b, e, f, h) {
            e = a.trim(e);
            b = j.query(b);
            d.batchForType(function(b, c, e, f) {
                e = d.normalizeParam(c, e, f);
                c = e.type;
                for (f = b.length - 1; 0 <= f; f--) {
                    var h = b[f], j = c, k = e, k = a.merge(k), l = void 0, j = 
                    g(k, j), h = i.getCustomEvents(h), l = (h || {}).events;
                    if (h && l)
                        if (j)
                            (l = l[j]) && l.detach(k);
                        else
                            for (j in l)
                                l[j].detach(k)
                }
            }, 1, b, e, f, h);
            return b
        },delegate: function(a, d, g, f, i) {
            return b.add(a, d, {fn: f,context: i,selector: g})
        },undelegate: function(a, d, g, f, i) {
            return b.remove(a, d, {fn: f,context: i,selector: g})
        },fire: function(b, e, g, f) {
            var h = void 0, g = g || {};
            g.synthetic = 1;
            d.splitAndRun(e, function(e) {
                g.type = e;
                var k, l, t, e = d.getTypedGroups(e);
                (l = e[1]) && (l = d.getGroupsRe(l));
                e = e[0];
                a.mix(g, {type: e,_ks_groups: l});
                b = j.query(b);
                for (l = b.length - 1; 0 <= l; l--)
                    k = b[l], t = i.getCustomEvent(k, e), !f && !t && (t = new i({type: e,currentTarget: k})), t && (k = t.fire(g, f), !1 !== h && (h = k))
            });
            return h
        },fireHandler: function(a, d, g) {
            return b.fire(a, d, g, 1)
        },_clone: function(b, d) {
            var g;
            (g = i.getCustomEvents(b)) && a.each(g.events, function(b, c) {
                a.each(b.observers, function(a) {
                    f(d, c, a)
                })
            })
        },_ObservableDOMEvent: i});
    b.on = b.add;
    b.detach = b.remove;
    return b
}, {requires: "event/base,dom,./special,./utils,./observable,./object".split(",")});
KISSY.add("event/dom/base", function(a, b, j, k, h, i) {
    a.mix(b, {KeyCodes: j,_DOMUtils: k,Gesture: h,_Special: i});
    return b
}, {requires: "event/base,./base/key-codes,./base/utils,./base/gesture,./base/special,./base/api,./base/mouseenter,./base/mousewheel,./base/valuechange".split(",")});
KISSY.add("event/dom/base/gesture", function() {
    return {start: "mousedown",move: "mousemove",end: "mouseup",tap: "click",doubleTap: "dblclick"}
});
KISSY.add("event/dom/base/key-codes", function(a) {
    var b = a.UA, j = {MAC_ENTER: 3,BACKSPACE: 8,TAB: 9,NUM_CENTER: 12,ENTER: 13,SHIFT: 16,CTRL: 17,ALT: 18,PAUSE: 19,CAPS_LOCK: 20,ESC: 27,SPACE: 32,PAGE_UP: 33,PAGE_DOWN: 34,END: 35,HOME: 36,LEFT: 37,UP: 38,RIGHT: 39,DOWN: 40,PRINT_SCREEN: 44,INSERT: 45,DELETE: 46,ZERO: 48,ONE: 49,TWO: 50,THREE: 51,FOUR: 52,FIVE: 53,SIX: 54,SEVEN: 55,EIGHT: 56,NINE: 57,QUESTION_MARK: 63,A: 65,B: 66,C: 67,D: 68,E: 69,F: 70,G: 71,H: 72,I: 73,J: 74,K: 75,L: 76,M: 77,N: 78,O: 79,P: 80,Q: 81,R: 82,S: 83,T: 84,U: 85,V: 86,W: 87,X: 88,
        Y: 89,Z: 90,META: 91,WIN_KEY_RIGHT: 92,CONTEXT_MENU: 93,NUM_ZERO: 96,NUM_ONE: 97,NUM_TWO: 98,NUM_THREE: 99,NUM_FOUR: 100,NUM_FIVE: 101,NUM_SIX: 102,NUM_SEVEN: 103,NUM_EIGHT: 104,NUM_NINE: 105,NUM_MULTIPLY: 106,NUM_PLUS: 107,NUM_MINUS: 109,NUM_PERIOD: 110,NUM_DIVISION: 111,F1: 112,F2: 113,F3: 114,F4: 115,F5: 116,F6: 117,F7: 118,F8: 119,F9: 120,F10: 121,F11: 122,F12: 123,NUMLOCK: 144,SEMICOLON: 186,DASH: 189,EQUALS: 187,COMMA: 188,PERIOD: 190,SLASH: 191,APOSTROPHE: 192,SINGLE_QUOTE: 222,OPEN_SQUARE_BRACKET: 219,BACKSLASH: 220,CLOSE_SQUARE_BRACKET: 221,
        WIN_KEY: 224,MAC_FF_META: 224,WIN_IME: 229,isTextModifyingKeyEvent: function(a) {
            if (a.altKey && !a.ctrlKey || a.metaKey || a.keyCode >= j.F1 && a.keyCode <= j.F12)
                return !1;
            switch (a.keyCode) {
                case j.ALT:
                case j.CAPS_LOCK:
                case j.CONTEXT_MENU:
                case j.CTRL:
                case j.DOWN:
                case j.END:
                case j.ESC:
                case j.HOME:
                case j.INSERT:
                case j.LEFT:
                case j.MAC_FF_META:
                case j.META:
                case j.NUMLOCK:
                case j.NUM_CENTER:
                case j.PAGE_DOWN:
                case j.PAGE_UP:
                case j.PAUSE:
                case j.PRINT_SCREEN:
                case j.RIGHT:
                case j.SHIFT:
                case j.UP:
                case j.WIN_KEY:
                case j.WIN_KEY_RIGHT:
                    return !1;
                default:
                    return !0
            }
        },isCharacterKey: function(a) {
            if (a >= j.ZERO && a <= j.NINE || a >= j.NUM_ZERO && a <= j.NUM_MULTIPLY || a >= j.A && a <= j.Z || b.webkit && 0 == a)
                return !0;
            switch (a) {
                case j.SPACE:
                case j.QUESTION_MARK:
                case j.NUM_PLUS:
                case j.NUM_MINUS:
                case j.NUM_PERIOD:
                case j.NUM_DIVISION:
                case j.SEMICOLON:
                case j.DASH:
                case j.EQUALS:
                case j.COMMA:
                case j.PERIOD:
                case j.SLASH:
                case j.APOSTROPHE:
                case j.SINGLE_QUOTE:
                case j.OPEN_SQUARE_BRACKET:
                case j.BACKSLASH:
                case j.CLOSE_SQUARE_BRACKET:
                    return !0;
                default:
                    return !1
            }
        }};
    return j
});
KISSY.add("event/dom/base/mouseenter", function(a, b, j, k) {
    a.each([{name: "mouseenter",fix: "mouseover"}, {name: "mouseleave",fix: "mouseout"}], function(a) {
        k[a.name] = {onFix: a.fix,delegateFix: a.fix,handle: function(a, b, g) {
                var f = a.currentTarget, d = a.relatedTarget;
                if (!d || d !== f && !j.contains(f, d))
                    return [b.simpleNotify(a, g)]
            }}
    });
    return b
}, {requires: ["./api", "dom", "./special"]});
KISSY.add("event/dom/base/mousewheel", function(a, b) {
    var j = a.UA.gecko ? "DOMMouseScroll" : "mousewheel";
    b.mousewheel = {onFix: j,delegateFix: j}
}, {requires: ["./special"]});
KISSY.add("event/dom/base/object", function(a, b, j) {
    function k(a) {
        this.scale = this.rotation = this.targetTouches = this.touches = this.changedTouches = this.which = this.wheelDelta = this.view = this.toElement = this.srcElement = this.shiftKey = this.screenY = this.screenX = this.relatedTarget = this.relatedNode = this.prevValue = this.pageY = this.pageX = this.offsetY = this.offsetX = this.newValue = this.metaKey = this.keyCode = this.handler = this.fromElement = this.eventPhase = this.detail = this.data = this.ctrlKey = this.clientY = this.clientX = this.charCode = 
        this.cancelable = this.button = this.bubbles = this.attrName = this.attrChange = this.altKey = j;
        k.superclass.constructor.call(this);
        this.originalEvent = a;
        this.isDefaultPrevented = a.defaultPrevented || a.returnValue === f || a.getPreventDefault && a.getPreventDefault() ? function() {
            return g
        } : function() {
            return f
        };
        h(this);
        i(this)
    }
    function h(a) {
        for (var b = a.originalEvent, g = d.length, f, i = b.currentTarget, i = 9 === i.nodeType ? i : i.ownerDocument || l; g; )
            f = d[--g], a[f] = b[f];
        a.target || (a.target = a.srcElement || i);
        3 === a.target.nodeType && (a.target = 
        a.target.parentNode);
        !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
        a.pageX === j && a.clientX !== j && (b = i.documentElement, g = i.body, a.pageX = a.clientX + (b && b.scrollLeft || g && g.scrollLeft || 0) - (b && b.clientLeft || g && g.clientLeft || 0), a.pageY = a.clientY + (b && b.scrollTop || g && g.scrollTop || 0) - (b && b.clientTop || g && g.clientTop || 0));
        a.which === j && (a.which = a.charCode === j ? a.keyCode : a.charCode);
        a.metaKey === j && (a.metaKey = a.ctrlKey);
        !a.which && a.button !== j && (a.which = a.button & 
        1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0)
    }
    function i(b) {
        var d, g, f, i = b.detail;
        b.wheelDelta && (f = b.wheelDelta / 120);
        b.detail && (f = -(0 == i % 3 ? i / 3 : i));
        b.axis !== j && (b.axis === b.HORIZONTAL_AXIS ? (g = 0, d = -1 * f) : b.axis === b.VERTICAL_AXIS && (d = 0, g = f));
        b.wheelDeltaY !== j && (g = b.wheelDeltaY / 120);
        b.wheelDeltaX !== j && (d = -1 * b.wheelDeltaX / 120);
        !d && !g && (g = f);
        (d !== j || g !== j || f !== j) && a.mix(b, {deltaY: g,delta: f,deltaX: d})
    }
    var l = a.Env.host.document, g = !0, f = !1, d = "type,altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,data,detail,eventPhase,fromElement,handler,keyCode,metaKey,newValue,offsetX,offsetY,pageX,pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which,axis,changedTouches,touches,targetTouches,rotation,scale".split(",");
    a.extend(k, b._Object, {constructor: k,preventDefault: function() {
            var a = this.originalEvent;
            a.preventDefault ? a.preventDefault() : a.returnValue = f;
            k.superclass.preventDefault.call(this)
        },stopPropagation: function() {
            var a = this.originalEvent;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = g;
            k.superclass.stopPropagation.call(this)
        }});
    return b.DOMEventObject = k
}, {requires: ["event/base"]});
KISSY.add("event/dom/base/observable", function(a, b, j, k, h, i, l) {
    function g(b) {
        a.mix(this, b);
        this.reset()
    }
    var f = l._Utils;
    a.extend(g, l._ObservableEvent, {setup: function() {
            var a = this.type, b = j[a] || {}, e = this.currentTarget, g = k.data(e).handle;
            (!b.setup || !1 === b.setup.call(e, a)) && k.simpleAdd(e, a, g)
        },constructor: g,reset: function() {
            g.superclass.reset.call(this);
            this.lastCount = this.delegateCount = 0
        },notify: function(a) {
            var c = a.target, e = this.currentTarget, g = this.observers, f = [], i, h, j = this.delegateCount || 0, l, k;
            if (j && 
            !c.disabled)
                for (; c != e; ) {
                    l = [];
                    for (h = 0; h < j; h++)
                        k = g[h], b.test(c, k.selector) && l.push(k);
                    l.length && f.push({currentTarget: c,currentTargetObservers: l});
                    c = c.parentNode || e
                }
            f.push({currentTarget: e,currentTargetObservers: g.slice(j)});
            h = 0;
            for (c = f.length; !a.isPropagationStopped() && h < c; ++h) {
                e = f[h];
                l = e.currentTargetObservers;
                e = e.currentTarget;
                a.currentTarget = e;
                for (e = 0; !a.isImmediatePropagationStopped() && e < l.length; e++)
                    g = l[e], g = g.notify(a, this), !1 !== i && (i = g)
            }
            return i
        },fire: function(d, c) {
            var d = d || {}, e = this.type, f = 
            j[e];
            f && f.onFix && (e = f.onFix);
            var h, l, f = this.currentTarget, k = !0;
            d.type = e;
            d instanceof i || (l = d, d = new i({currentTarget: f,target: f}), a.mix(d, l));
            l = f;
            h = b.getWindow(l.ownerDocument || l);
            var q = h.document, r = [], t = 0, s = "on" + e;
            do
                r.push(l), l = l.parentNode || l.ownerDocument || l === q && h;
            while (l);
            l = r[t];
            do {
                d.currentTarget = l;
                if (h = g.getCustomEvent(l, e))
                    h = h.notify(d), !1 !== k && (k = h);
                l[s] && !1 === l[s].call(l) && d.preventDefault();
                l = r[++t]
            } while (!c && l && !d.isPropagationStopped());
            if (!c && !d.isDefaultPrevented()) {
                var u;
                try {
                    if (s && 
                    f[e] && ("focus" !== e && "blur" !== e || 0 !== f.offsetWidth) && !a.isWindow(f))
                        (u = f[s]) && (f[s] = null), g.triggeredEvent = e, f[e]()
                } catch (v) {
                }
                u && (f[s] = u);
                g.triggeredEvent = ""
            }
            return k
        },on: function(a) {
            var b = this.observers, e = j[this.type] || {}, a = a instanceof h ? a : new h(a);
            -1 == this.findObserver(a) && (a.selector ? (b.splice(this.delegateCount, 0, a), this.delegateCount++) : a.last ? (b.push(a), this.lastCount++) : b.splice(b.length - this.lastCount, 0, a), e.add && e.add.call(this.currentTarget, a))
        },detach: function(a) {
            var b, e = j[this.type] || 
            {}, g = "selector" in a, i = a.selector, h = a.context, l = a.fn, k = this.currentTarget, r = this.observers, a = a.groups;
            if (r.length) {
                a && (b = f.getGroupsRe(a));
                var t, s, u, v, x = r.length;
                if (l || g || b) {
                    h = h || k;
                    t = a = 0;
                    for (s = []; a < x; ++a)
                        u = r[a], v = u.context || k, h != v || l && l != u.fn || g && (i && i != u.selector || !i && !u.selector) || b && !u.groups.match(b) ? s[t++] = u : (u.selector && this.delegateCount && this.delegateCount--, u.last && this.lastCount && this.lastCount--, e.remove && e.remove.call(k, u));
                    this.observers = s
                } else
                    this.reset();
                this.checkMemory()
            }
        },checkMemory: function() {
            var b = 
            this.type, c, e, g = j[b] || {}, f = this.currentTarget, i = k.data(f);
            if (i && (c = i.events, this.hasObserver() || (e = i.handle, (!g.tearDown || !1 === g.tearDown.call(f, b)) && k.simpleRemove(f, b, e), delete c[b]), a.isEmptyObject(c)))
                i.handle = null, k.removeData(f)
        }});
    g.triggeredEvent = "";
    g.getCustomEvent = function(a, b) {
        var e = k.data(a), g;
        e && (g = e.events);
        if (g)
            return g[b]
    };
    g.getCustomEvents = function(a, b) {
        var e = k.data(a);
        !e && b && k.data(a, e = {});
        return e
    };
    return g
}, {requires: "dom,./special,./utils,./observer,./object,event/base".split(",")});
KISSY.add("event/dom/base/observer", function(a, b, j) {
    function k(a) {
        k.superclass.constructor.apply(this, arguments)
    }
    a.extend(k, j._Observer, {keys: "fn,selector,data,context,originalType,groups,last".split(","),notifyInternal: function(a, i) {
            var j, g, f = a.type;
            this.originalType && (a.type = this.originalType);
            (j = b[a.type]) && j.handle ? (j = j.handle(a, this, i)) && 0 < j.length && (g = j[0]) : g = this.simpleNotify(a, i);
            a.type = f;
            return g
        }});
    return k
}, {requires: ["./special", "event/base"]});
KISSY.add("event/dom/base/special", function() {
    return {}
});
KISSY.add("event/dom/base/utils", function(a, b) {
    var j = a.Env.host.document;
    return {simpleAdd: j && j.addEventListener ? function(a, b, i, j) {
            a.addEventListener && a.addEventListener(b, i, !!j)
        } : function(a, b, i) {
            a.attachEvent && a.attachEvent("on" + b, i)
        },simpleRemove: j && j.removeEventListener ? function(a, b, i, j) {
            a.removeEventListener && a.removeEventListener(b, i, !!j)
        } : function(a, b, i) {
            a.detachEvent && a.detachEvent("on" + b, i)
        },data: function(a, h) {
            return b.data(a, "ksEventTargetId_1.30", h)
        },removeData: function(a) {
            return b.removeData(a, 
            "ksEventTargetId_1.30")
        }}
}, {requires: ["dom"]});
KISSY.add("event/dom/base/valuechange", function(a, b, j, k) {
    function h(a) {
        if (j.hasData(a, p)) {
            var b = j.data(a, p);
            clearTimeout(b);
            j.removeData(a, p)
        }
    }
    function i(a) {
        h(a.target)
    }
    function l(a) {
        var c = a.value, d = j.data(a, o);
        c !== d && (b.fireHandler(a, e, {prevVal: d,newVal: c}), j.data(a, o, c))
    }
    function g(a) {
        j.hasData(a, p) || j.data(a, p, setTimeout(function() {
            l(a);
            j.data(a, p, setTimeout(arguments.callee, n))
        }, n))
    }
    function f(a) {
        var b = a.target;
        "focus" == a.type && j.data(b, o, b.value);
        g(b)
    }
    function d(a) {
        l(a.target)
    }
    function c(a) {
        j.removeData(a, 
        o);
        h(a);
        b.remove(a, "blur", i);
        b.remove(a, "webkitspeechchange", d);
        b.remove(a, "mousedown keyup keydown focus", f)
    }
    var e = "valuechange", m = j.nodeName, o = "event/valuechange/history", p = "event/valuechange/poll", n = 50;
    k[e] = {setup: function() {
            var a = m(this);
            if ("input" == a || "textarea" == a)
                c(this), b.on(this, "blur", i), b.on(this, "webkitspeechchange", d), b.on(this, "mousedown keyup keydown focus", f)
        },tearDown: function() {
            c(this)
        }};
    return b
}, {requires: ["./api", "dom", "./special"]});
KISSY.add("event/dom/focusin", function(a, b) {
    var j = b._Special;
    a.each([{name: "focusin",fix: "focus"}, {name: "focusout",fix: "blur"}], function(k) {
        function h(a) {
            return b.fire(a.target, k.name)
        }
        var i = a.guid("attaches_" + a.now() + "_");
        j[k.name] = {setup: function() {
                var a = this.ownerDocument || this;
                i in a || (a[i] = 0);
                a[i] += 1;
                1 === a[i] && a.addEventListener(k.fix, h, !0)
            },tearDown: function() {
                var a = this.ownerDocument || this;
                a[i] -= 1;
                0 === a[i] && a.removeEventListener(k.fix, h, !0)
            }}
    });
    return b
}, {requires: ["event/dom/base"]});
KISSY.add("event/dom/hashchange", function(a, b, j) {
    var k = a.UA, h = b._Special, i = a.Env.host, l = i.document, g = l && l.documentMode, f = "__replace_history_" + a.now(), k = g || k.ie;
    b.REPLACE_HISTORY = f;
    var d = "<html><head><title>" + (l && l.title || "") + " - {hash}</title>{head}</head><body>{hash}</body></html>", c = function() {
        return "#" + (new a.Uri(location.href)).getFragment()
    }, e, m, o = function() {
        var b = c(), d;
        if (d = a.endsWith(b, f))
            b = b.slice(0, -f.length), location.hash = b;
        b !== m && (m = b, p(b, d));
        e = setTimeout(o, 50)
    }, p = k && 8 > k ? function(b, c) {
        var e = 
        a.substitute(d, {hash: a.escapeHTML(b),head: j.isCustomDomain() ? "<script>document.domain = '" + l.domain + "';<\/script>" : ""}), g = r.contentWindow.document;
        try {
            c ? g.open("text/html", "replace") : g.open(), g.write(e), g.close()
        } catch (f) {
        }
    } : function() {
        b.fireHandler(i, "hashchange")
    }, n = function() {
        e || o()
    }, q = function() {
        e && clearTimeout(e);
        e = 0
    }, r;
    k && 8 > k && (n = function() {
        if (!r) {
            var e = j.getEmptyIframeSrc();
            r = j.create("<iframe " + (e ? 'src="' + e + '"' : "") + ' style="display: none" height="0" width="0" tabindex="-1" title="empty"/>');
            j.prepend(r, l.documentElement);
            b.add(r, "load", function() {
                b.remove(r, "load");
                p(c());
                b.add(r, "load", d);
                o()
            });
            l.onpropertychange = function() {
                try {
                    "title" === event.propertyName && (r.contentWindow.document.title = l.title + " - " + c())
                } catch (a) {
                }
            };
            var d = function() {
                var e = a.trim(r.contentWindow.document.body.innerText), d = c();
                e != d && (m = location.hash = e);
                b.fireHandler(i, "hashchange")
            }
        }
    }, q = function() {
        e && clearTimeout(e);
        e = 0;
        b.detach(r);
        j.remove(r);
        r = 0
    });
    h.hashchange = {setup: function() {
            if (this === i) {
                m = c();
                n()
            }
        },tearDown: function() {
            this === 
            i && q()
        }}
}, {requires: ["event/dom/base", "dom"]});
KISSY.add("event/dom/ie/change", function(a, b, j) {
    function k(a) {
        a = a.type;
        return "checkbox" == a || "radio" == a
    }
    function h(a) {
        "checked" == a.originalEvent.propertyName && (this.__changed = 1)
    }
    function i(a) {
        this.__changed && (this.__changed = 0, b.fire(this, "change", a))
    }
    function l(a) {
        a = a.target;
        f.test(a.nodeName) && !a.__changeHandler && (a.__changeHandler = 1, b.on(a, "change", {fn: g,last: 1}))
    }
    function g(a) {
        if (!a.isPropagationStopped() && !k(this)) {
            var c;
            (c = this.parentNode) && b.fire(c, "change", a)
        }
    }
    var f = /^(?:textarea|input|select)$/i;
    b._Special.change = {setup: function() {
            if (f.test(this.nodeName))
                if (k(this))
                    b.on(this, "propertychange", h), b.on(this, "click", i);
                else
                    return !1;
            else
                b.on(this, "beforeactivate", l)
        },tearDown: function() {
            if (f.test(this.nodeName))
                if (k(this))
                    b.remove(this, "propertychange", h), b.remove(this, "click", i);
                else
                    return !1;
            else
                b.remove(this, "beforeactivate", l), a.each(j.query("textarea,input,select", this), function(a) {
                    a.__changeHandler && (a.__changeHandler = 0, b.remove(a, "change", {fn: g,last: 1}))
                })
        }}
}, {requires: ["event/dom/base", 
        "dom"]});
KISSY.add("event/dom/ie", function() {
}, {requires: ["./ie/change", "./ie/submit"]});
KISSY.add("event/dom/ie/submit", function(a, b, j) {
    function k(a) {
        var a = a.target, g = i(a);
        if ((a = "input" == g || "button" == g ? a.form : null) && !a.__submit__fix)
            a.__submit__fix = 1, b.on(a, "submit", {fn: h,last: 1})
    }
    function h(a) {
        this.parentNode && !a.isPropagationStopped() && !a.synthetic && b.fire(this.parentNode, "submit", a)
    }
    var i = j.nodeName;
    b._Special.submit = {setup: function() {
            if ("form" == i(this))
                return !1;
            b.on(this, "click keypress", k)
        },tearDown: function() {
            if ("form" == i(this))
                return !1;
            b.remove(this, "click keypress", k);
            a.each(j.query("form", 
            this), function(a) {
                a.__submit__fix && (a.__submit__fix = 0, b.remove(a, "submit", {fn: h,last: 1}))
            })
        }}
}, {requires: ["event/dom/base", "dom"]});
KISSY.add("event/dom/shake", function(a, b, j) {
    function k(a) {
        var b = a.accelerationIncludingGravity, a = b.x, h = b.y, b = b.z, k;
        f !== j && (k = e(m(a - f), m(h - d), m(b - c)), k > i && p(), k > l && (g = 1));
        f = a;
        d = h;
        c = b
    }
    var h = b._Special, i = 5, l = 20, g = 0, f, d, c, e = Math.max, m = Math.abs, o = a.Env.host, p = a.buffer(function() {
        g && (b.fireHandler(o, "shake", {accelerationIncludingGravity: {x: f,y: d,z: c}}), f = j, g = 0)
    }, 250);
    h.shake = {setup: function() {
            this == o && o.addEventListener("devicemotion", k, !1)
        },tearDown: function() {
            this == o && (p.stop(), f = j, g = 0, o.removeEventListener("devicemotion", 
            k, !1))
        }}
}, {requires: ["event/dom/base"]});
KISSY.add("event/dom/touch/double-tap", function(a, b, j, k) {
    function h() {
    }
    a.extend(h, k, {onTouchStart: function(a) {
            if (!1 === h.superclass.onTouchStart.apply(this, arguments))
                return !1;
            this.startTime = a.timeStamp;
            this.singleTapTimer && (clearTimeout(this.singleTapTimer), this.singleTapTimer = 0)
        },onTouchMove: function() {
            return !1
        },onTouchEnd: function(a) {
            var b = this.lastEndTime, g = a.timeStamp, f = a.target, d = a.changedTouches[0], c = g - this.startTime;
            this.lastEndTime = g;
            if (b && (c = g - b, 300 > c)) {
                this.lastEndTime = 0;
                j.fire(f, "doubleTap", 
                {touch: d,duration: c / 1E3});
                return
            }
            c = g - this.startTime;
            300 < c ? j.fire(f, "singleTap", {touch: d,duration: c / 1E3}) : this.singleTapTimer = setTimeout(function() {
                j.fire(f, "singleTap", {touch: d,duration: c / 1E3})
            }, 300)
        }});
    b.singleTap = b.doubleTap = {handle: new h};
    return h
}, {requires: ["./handle-map", "event/dom/base", "./single-touch"]});
KISSY.add("event/dom/touch/gesture", function(a, b) {
    var j = b.Gesture, k, h, i;
    a.Features.isTouchSupported() && (k = "touchstart", h = "touchmove", i = "touchend");
    k && (j.start = k, j.move = h, j.end = i, j.tap = "tap", j.doubleTap = "doubleTap");
    return j
}, {requires: ["event/dom/base"]});
KISSY.add("event/dom/touch/handle-map", function() {
    return {}
});
KISSY.add("event/dom/touch/handle", function(a, b, j, k, h) {
    function i(a) {
        this.doc = a;
        this.eventHandle = {};
        this.init()
    }
    var l = a.guid("touch-handle"), g = a.Features, f = {};
    f[h.start] = "onTouchStart";
    f[h.move] = "onTouchMove";
    f[h.end] = "onTouchEnd";
    "mousedown" !== h.start && (f.touchcancel = "onTouchEnd");
    var d = a.throttle(function(a) {
        this.callEventHandle("onTouchMove", a)
    }, 30);
    i.prototype = {init: function() {
            var a = this.doc, b, d;
            for (b in f) {
                d = f[b];
                k.on(a, b, this[d], this)
            }
        },normalize: function(a) {
            var b = a.type, d;
            if (!g.isTouchSupported()) {
                if (b.indexOf("mouse") != 
                -1 && a.which != 1)
                    return;
                d = [a];
                b = !b.match(/up$/i);
                a.touches = b ? d : [];
                a.targetTouches = b ? d : [];
                a.changedTouches = d
            }
            return a
        },onTouchMove: function(a) {
            d.call(this, a)
        },onTouchStart: function(a) {
            var b, d, g = this.eventHandle;
            for (b in g) {
                d = g[b].handle;
                d.isActive = 1
            }
            this.callEventHandle("onTouchStart", a)
        },onTouchEnd: function(a) {
            this.callEventHandle("onTouchEnd", a)
        },callEventHandle: function(a, b) {
            var d = this.eventHandle, g, f;
            if (b = this.normalize(b)) {
                for (g in d) {
                    f = d[g].handle;
                    if (!f.processed) {
                        f.processed = 1;
                        if (f.isActive && 
                        f[a](b) === false)
                            f.isActive = 0
                    }
                }
                for (g in d) {
                    f = d[g].handle;
                    f.processed = 0
                }
            }
        },addEventHandle: function(a) {
            var b = this.eventHandle, d = j[a].handle;
            b[a] ? b[a].count++ : b[a] = {count: 1,handle: d}
        },removeEventHandle: function(a) {
            var b = this.eventHandle;
            if (b[a]) {
                b[a].count--;
                b[a].count || delete b[a]
            }
        },destroy: function() {
            var a = this.doc, b, d;
            for (b in f) {
                d = f[b];
                k.detach(a, b, this[d], this)
            }
        }};
    return {addDocumentHandle: function(a, d) {
            var g = b.getWindow(a.ownerDocument || a).document, f = j[d].setup, h = b.data(g, l);
            h || b.data(g, l, h = new i(g));
            f && f.call(a, d);
            h.addEventHandle(d)
        },removeDocumentHandle: function(c, d) {
            var g = b.getWindow(c.ownerDocument || c).document, f = j[d].tearDown, i = b.data(g, l);
            f && f.call(c, d);
            if (i) {
                i.removeEventHandle(d);
                if (a.isEmptyObject(i.eventHandle)) {
                    i.destroy();
                    b.removeData(g, l)
                }
            }
        }}
}, {requires: "dom,./handle-map,event/dom/base,./gesture,./tap,./swipe,./double-tap,./pinch,./tap-hold,./rotate".split(",")});
KISSY.add("event/dom/touch/multi-touch", function(a, b) {
    function j() {
    }
    j.prototype = {requiredTouchCount: 2,onTouchStart: function(a) {
            var b = this.requiredTouchCount, i = a.touches.length;
            i === b ? this.start() : i > b && this.end(a)
        },onTouchEnd: function(a) {
            this.end(a)
        },start: function() {
            this.isTracking || (this.isTracking = !0, this.isStarted = !1)
        },fireEnd: a.noop,getCommonTarget: function(a) {
            var h = a.touches, a = h[0].target, h = h[1].target;
            if (a == h || b.contains(a, h))
                return a;
            for (; ; ) {
                if (b.contains(h, a))
                    return h;
                h = h.parentNode
            }
        },end: function(a) {
            this.isTracking && 
            (this.isTracking = !1, this.isStarted && (this.isStarted = !1, this.fireEnd(a)))
        }};
    return j
}, {requires: ["dom"]});
KISSY.add("event/dom/touch/pinch", function(a, b, j, k, h) {
    function i() {
    }
    function l(a) {
        (!a.touches || 2 == a.touches.length) && a.preventDefault()
    }
    a.extend(i, k, {onTouchMove: function(b) {
            if (this.isTracking) {
                var f = b.touches, d, c = f[0], e = f[1];
                d = c.pageX - e.pageX;
                c = c.pageY - e.pageY;
                d = Math.sqrt(d * d + c * c);
                this.lastTouches = f;
                this.isStarted ? j.fire(this.target, "pinch", a.mix(b, {distance: d,scale: d / this.startDistance})) : (this.isStarted = !0, this.startDistance = d, f = this.target = this.getCommonTarget(b), j.fire(f, "pinchStart", a.mix(b, 
                {distance: d,scale: 1})))
            }
        },fireEnd: function(b) {
            j.fire(this.target, "pinchEnd", a.mix(b, {touches: this.lastTouches}))
        }});
    k = new i;
    b.pinchStart = b.pinchEnd = {handle: k};
    b.pinch = {handle: k,setup: function() {
            j.on(this, h.move, l)
        },tearDown: function() {
            j.detach(this, h.move, l)
        }};
    return i
}, {requires: ["./handle-map", "event/dom/base", "./multi-touch", "./gesture"]});
KISSY.add("event/dom/touch/rotate", function(a, b, j, k, h, i) {
    function l() {
    }
    function g(a) {
        (!a.touches || 2 == a.touches.length) && a.preventDefault()
    }
    var f = 180 / Math.PI;
    a.extend(l, j, {onTouchMove: function(b) {
            if (this.isTracking) {
                var c = b.touches, e = c[0], g = c[1], h = this.lastAngle, e = Math.atan2(g.pageY - e.pageY, g.pageX - e.pageX) * f;
                if (h !== i) {
                    var g = Math.abs(e - h), j = (e + 360) % 360, l = (e - 360) % 360;
                    Math.abs(j - h) < g ? e = j : Math.abs(l - h) < g && (e = l)
                }
                this.lastTouches = c;
                this.lastAngle = e;
                this.isStarted ? k.fire(this.target, "rotate", a.mix(b, {angle: e,
                    rotation: e - this.startAngle})) : (this.isStarted = !0, this.startAngle = e, this.target = this.getCommonTarget(b), k.fire(this.target, "rotateStart", a.mix(b, {angle: e,rotation: 0})))
            }
        },end: function() {
            this.lastAngle = i;
            l.superclass.end.apply(this, arguments)
        },fireEnd: function(b) {
            k.fire(this.target, "rotateEnd", a.mix(b, {touches: this.lastTouches}))
        }});
    j = new l;
    b.rotateEnd = b.rotateStart = {handle: j};
    b.rotate = {handle: j,setup: function() {
            k.on(this, h.move, g)
        },tearDown: function() {
            k.detach(this, h.move, g)
        }};
    return l
}, {requires: ["./handle-map", 
        "./multi-touch", "event/dom/base", "./gesture"]});
KISSY.add("event/dom/touch/single-touch", function(a) {
    function b() {
    }
    b.prototype = {requiredTouchCount: 1,onTouchStart: function(a) {
            if (a.touches.length != this.requiredTouchCount)
                return !1;
            this.lastTouches = a.touches
        },onTouchMove: a.noop,onTouchEnd: a.noop};
    return b
});
KISSY.add("event/dom/touch/swipe", function(a, b, j, k) {
    function h(a, b, e) {
        var i = b.changedTouches[0], h = i.pageX - a.startX, k = i.pageY - a.startY, n = Math.abs(h), q = Math.abs(k);
        if (e)
            a.isVertical && a.isHorizontal && (q > n ? a.isHorizontal = 0 : a.isVertical = 0);
        else if (a.isVertical && q < f && (a.isVertical = 0), a.isHorizontal && n < f)
            a.isHorizontal = 0;
        if (a.isHorizontal)
            h = 0 > h ? "left" : "right";
        else if (a.isVertical)
            h = 0 > k ? "up" : "down", n = q;
        else
            return !1;
        j.fire(b.target, e ? g : l, {originalEvent: b.originalEvent,touch: i,direction: h,distance: n,duration: (b.timeStamp - 
            a.startTime) / 1E3})
    }
    function i() {
    }
    var l = "swipe", g = "swiping", f = 50;
    a.extend(i, k, {onTouchStart: function(a) {
            if (!1 === i.superclass.onTouchStart.apply(this, arguments))
                return !1;
            var b = a.touches[0];
            this.startTime = a.timeStamp;
            this.isVertical = this.isHorizontal = 1;
            this.startX = b.pageX;
            this.startY = b.pageY;
            -1 != a.type.indexOf("mouse") && a.preventDefault()
        },onTouchMove: function(a) {
            var b = a.changedTouches[0], e = b.pageY - this.startY, b = Math.abs(b.pageX - this.startX), e = Math.abs(e);
            if (1E3 < a.timeStamp - this.startTime)
                return !1;
            this.isVertical && 
            35 < b && (this.isVertical = 0);
            this.isHorizontal && 35 < e && (this.isHorizontal = 0);
            return h(this, a, 1)
        },onTouchEnd: function(a) {
            return !1 === this.onTouchMove(a) ? !1 : h(this, a, 0)
        }});
    b[l] = b[g] = {handle: new i};
    return i
}, {requires: ["./handle-map", "event/dom/base", "./single-touch"]});
KISSY.add("event/dom/touch/tap-hold", function(a, b, j, k, h) {
    function i() {
    }
    function l(a) {
        (!a.touches || 1 == a.touches.length) && a.preventDefault()
    }
    a.extend(i, j, {onTouchStart: function(b) {
            if (!1 === i.superclass.onTouchStart.call(this, b))
                return !1;
            this.timer = setTimeout(function() {
                k.fire(b.target, "tapHold", {touch: b.touches[0],duration: (a.now() - b.timeStamp) / 1E3})
            }, 1E3)
        },onTouchMove: function() {
            clearTimeout(this.timer);
            return !1
        },onTouchEnd: function() {
            clearTimeout(this.timer)
        }});
    b.tapHold = {setup: function() {
            k.on(this, 
            h.start, l)
        },tearDown: function() {
            k.detach(this, h.start, l)
        },handle: new i};
    return i
}, {requires: ["./handle-map", "./single-touch", "event/dom/base", "./gesture"]});
KISSY.add("event/dom/touch/tap", function(a, b, j, k) {
    function h() {
    }
    a.extend(h, k, {onTouchMove: function() {
            return !1
        },onTouchEnd: function(a) {
            j.fire(a.target, "tap", {touch: a.changedTouches[0]})
        }});
    b.tap = {handle: new h};
    return h
}, {requires: ["./handle-map", "event/dom/base", "./single-touch"]});
KISSY.add("event/dom/touch", function(a, b, j, k) {
    var a = b._Special, b = {setup: function(a) {
            k.addDocumentHandle(this, a)
        },tearDown: function(a) {
            k.removeDocumentHandle(this, a)
        }}, h;
    for (h in j)
        a[h] = b
}, {requires: ["event/dom/base", "./touch/handle-map", "./touch/handle"]});
KISSY.add("json/json2", function() {
    function a(a) {
        return 10 > a ? "0" + a : a
    }
    function b(a) {
        i.lastIndex = 0;
        return i.test(a) ? '"' + a.replace(i, function(a) {
            var b = f[a];
            return "string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function j(a, e) {
        var f, i, h, k, q = l, r, t = e[a];
        t && "object" === typeof t && "function" === typeof t.toJSON && (t = t.toJSON(a));
        "function" === typeof d && (t = d.call(e, a, t));
        switch (typeof t) {
            case "string":
                return b(t);
            case "number":
                return isFinite(t) ? "" + t : "null";
            case "boolean":
            case "null":
                return "" + 
                t;
            case "object":
                if (!t)
                    return "null";
                l += g;
                r = [];
                if ("[object Array]" === Object.prototype.toString.apply(t)) {
                    k = t.length;
                    for (f = 0; f < k; f += 1)
                        r[f] = j(f, t) || "null";
                    h = 0 === r.length ? "[]" : l ? "[\n" + l + r.join(",\n" + l) + "\n" + q + "]" : "[" + r.join(",") + "]";
                    l = q;
                    return h
                }
                if (d && "object" === typeof d) {
                    k = d.length;
                    for (f = 0; f < k; f += 1)
                        i = d[f], "string" === typeof i && (h = j(i, t)) && r.push(b(i) + (l ? ": " : ":") + h)
                } else
                    for (i in t)
                        Object.hasOwnProperty.call(t, i) && (h = j(i, t)) && r.push(b(i) + (l ? ": " : ":") + h);
                h = 0 === r.length ? "{}" : l ? "{\n" + l + r.join(",\n" + l) + "\n" + 
                q + "}" : "{" + r.join(",") + "}";
                l = q;
                return h
        }
    }
    var k = {};
    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + a(this.getUTCMonth() + 1) + "-" + a(this.getUTCDate()) + "T" + a(this.getUTCHours()) + ":" + a(this.getUTCMinutes()) + ":" + a(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, 
    i = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, l, g, f = {"": "\\b","\t": "\\t","\n": "\\n","": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, d;
    k.stringify = function(a, b, f) {
        var i;
        g = l = "";
        if (typeof f === "number")
            for (i = 0; i < f; i = i + 1)
                g = g + " ";
        else
            typeof f === "string" && (g = f);
        if ((d = b) && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number"))
            throw Error("JSON.stringify");
        return j("", {"": a})
    };
    k.parse = function(a, b) {
        function d(a, 
        c) {
            var f, g, i = a[c];
            if (i && typeof i === "object")
                for (f in i)
                    if (Object.hasOwnProperty.call(i, f)) {
                        g = d(i, f);
                        g !== void 0 ? i[f] = g : delete i[f]
                    }
            return b.call(a, c, i)
        }
        var f, a = "" + a;
        h.lastIndex = 0;
        h.test(a) && (a = a.replace(h, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            f = eval("(" + a + ")");
            return typeof b === 
            "function" ? d({"": f}, "") : f
        }
        throw new SyntaxError("JSON.parse");
    };
    return k
});
KISSY.add("json", function(a, b) {
    b || (b = JSON);
    return a.JSON = {parse: function(a) {
            return null == a || "" === a ? null : b.parse(a)
        },stringify: b.stringify}
}, {requires: [KISSY.Features.isNativeJSONSupported() ? "" : "json/json2"]});
KISSY.add("ajax", function(a, b, j) {
    function k(b, l, g, f, d) {
        a.isFunction(l) && (f = g, g = l, l = h);
        return j({type: d || "get",url: b,data: l,success: g,dataType: f})
    }
    var h = void 0;
    a.mix(j, {serialize: b.serialize,get: k,post: function(b, j, g, f) {
            a.isFunction(j) && (f = g, g = j, j = h);
            return k(b, j, g, f, "post")
        },jsonp: function(b, j, g) {
            a.isFunction(j) && (g = j, j = h);
            return k(b, j, g, "jsonp")
        },getScript: a.getScript,getJSON: function(b, j, g) {
            a.isFunction(j) && (g = j, j = h);
            return k(b, j, g, "json")
        },upload: function(b, k, g, f, d) {
            a.isFunction(g) && (d = f, f = g, g = 
            h);
            return j({url: b,type: "post",dataType: d,form: k,data: g,success: f})
        }});
    a.mix(a, {Ajax: j,IO: j,ajax: j,io: j,jsonp: j.jsonp});
    return j
}, {requires: "ajax/form-serializer,ajax/base,ajax/xhr-transport,ajax/script-transport,ajax/jsonp,ajax/form,ajax/iframe-transport,ajax/methods".split(",")});
KISSY.add("ajax/base", function(a, b, j, k) {
    function h(b) {
        var c = b.context;
        delete b.context;
        b = a.mix(a.clone(p), b, {deep: !0});
        b.context = c || b;
        var d, g = b.type, i = b.dataType, c = b.uri = m.resolve(b.url);
        b.uri.setQuery("");
        "crossDomain" in b || (b.crossDomain = !b.uri.isSameOriginAs(m));
        g = b.type = g.toUpperCase();
        b.hasContent = !e.test(g);
        if (b.processData && (d = b.data) && "string" != typeof d)
            b.data = a.param(d, k, k, b.serializeArray);
        i = b.dataType = a.trim(i || "*").split(f);
        !("cache" in b) && a.inArray(i[0], ["script", "jsonp"]) && (b.cache = 
        !1);
        b.hasContent || (b.data && c.query.add(a.unparam(b.data)), !1 === b.cache && c.query.set("_ksTS", a.now() + "_" + a.guid()));
        return b
    }
    function i(a, b) {
        l.fire(a, {ajaxConfig: b.config,io: b})
    }
    function l(b) {
        function d(a) {
            return function(c) {
                if (j = e.timeoutTimer)
                    clearTimeout(j), e.timeoutTimer = 0;
                var d = b[a];
                d && d.apply(w, c);
                i(a, e)
            }
        }
        var e = this;
        if (!(e instanceof l))
            return new l(b);
        c.call(e);
        b = h(b);
        a.mix(e, {responseData: null,config: b || {},timeoutTimer: null,responseText: null,responseXML: null,responseHeadersString: "",responseHeaders: null,
            requestHeaders: {},readyState: 0,state: 0,statusText: null,status: 0,transport: null,_defer: new a.Defer(this)});
        var f;
        i("start", e);
        f = new (o[b.dataType[0]] || o["*"])(e);
        e.transport = f;
        b.contentType && e.setRequestHeader("Content-Type", b.contentType);
        var g = b.dataType[0], j, k, m = b.timeout, w = b.context, p = b.headers, y = b.accepts;
        e.setRequestHeader("Accept", g && y[g] ? y[g] + ("*" === g ? "" : ", */*; q=0.01") : y["*"]);
        for (k in p)
            e.setRequestHeader(k, p[k]);
        if (b.beforeSend && !1 === b.beforeSend.call(w, e, b))
            return e;
        e.then(d("success"), 
        d("error"));
        e.fin(d("complete"));
        e.readyState = 1;
        i("send", e);
        b.async && 0 < m && (e.timeoutTimer = setTimeout(function() {
            e.abort("timeout")
        }, 1E3 * m));
        try {
            e.state = 1, f.send()
        } catch (B) {
            2 > e.state && e._ioReady(-1, B.message)
        }
        return e
    }
    var g = /^(?:about|app|app\-storage|.+\-extension|file|widget)$/, f = /\s+/, d = function(a) {
        return a
    }, c = a.Promise, e = /^(?:GET|HEAD)$/, m = new a.Uri((a.Env.host.location || {}).href), g = m && g.test(m.getScheme()), o = {}, p = {type: "GET",contentType: "application/x-www-form-urlencoded; charset=UTF-8",async: !0,
        serializeArray: !0,processData: !0,accepts: {xml: "application/xml, text/xml",html: "text/html",text: "text/plain",json: "application/json, text/javascript","*": "*/*"},converters: {text: {json: b.parse,html: d,text: d,xml: a.parseXML}},contents: {xml: /xml/,html: /html/,json: /json/}};
    p.converters.html = p.converters.text;
    a.mix(l, j.Target);
    a.mix(l, {isLocal: g,setupConfig: function(b) {
            a.mix(p, b, {deep: !0})
        },setupTransport: function(a, b) {
            o[a] = b
        },getTransport: function(a) {
            return o[a]
        },getConfig: function() {
            return p
        }});
    return l
}, 
{requires: ["json", "event"]});
KISSY.add("ajax/form-serializer", function(a, b) {
    function j(a) {
        return a.replace(h, "\r\n")
    }
    var k = /^(?:select|textarea)/i, h = /\r?\n/g, i, l = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
    return i = {serialize: function(b, f) {
            return a.param(i.getFormData(b), void 0, void 0, f || !1)
        },getFormData: function(g) {
            var f = [], d = {};
            a.each(b.query(g), function(b) {
                b = b.elements ? a.makeArray(b.elements) : [b];
                f.push.apply(f, b)
            });
            f = a.filter(f, function(a) {
                return a.name && !a.disabled && 
                (a.checked || k.test(a.nodeName) || l.test(a.type))
            });
            a.each(f, function(c) {
                var e = b.val(c), f;
                null !== e && (e = a.isArray(e) ? a.map(e, j) : j(e), (f = d[c.name]) ? (f && !a.isArray(f) && (f = d[c.name] = [f]), f.push.apply(f, a.makeArray(e))) : d[c.name] = e)
            });
            return d
        }}
}, {requires: ["dom"]});
KISSY.add("ajax/form", function(a, b, j, k) {
    b.on("start", function(b) {
        var i, l, g, b = b.io.config;
        if (g = b.form)
            i = j.get(g), l = i.encoding || i.enctype, g = b.data, "multipart/form-data" != l.toLowerCase() ? (i = k.getFormData(i), b.hasContent ? (i = a.param(i, void 0, void 0, b.serializeArray), b.data = g ? b.data + ("&" + i) : i) : b.uri.query.add(i)) : (g = b.dataType, b = g[0], "*" == b && (b = "text"), g.length = 2, g[0] = "iframe", g[1] = b)
    });
    return b
}, {requires: ["./base", "dom", "./form-serializer"]});
KISSY.add("ajax/iframe-transport", function(a, b, j, k) {
    function h(f) {
        var d = a.guid("io-iframe"), c = b.getEmptyIframeSrc(), f = f.iframe = b.create("<iframe " + (c ? ' src="' + c + '" ' : "") + ' id="' + d + '" name="' + d + '" style="position:absolute;left:-9999px;top:-9999px;"/>');
        b.prepend(f, g.body || g.documentElement);
        return f
    }
    function i(f, d, c) {
        var e = [], i, h, j, k;
        a.each(f, function(f, l) {
            i = a.isArray(f);
            h = a.makeArray(f);
            for (j = 0; j < h.length; j++)
                k = g.createElement("input"), k.type = "hidden", k.name = l + (i && c ? "[]" : ""), k.value = h[j], b.append(k, 
                d), e.push(k)
        });
        return e
    }
    function l(a) {
        this.io = a
    }
    var g = a.Env.host.document;
    k.setupConfig({converters: {iframe: k.getConfig().converters.text,text: {iframe: function(a) {
                    return a
                }},xml: {iframe: function(a) {
                    return a
                }}}});
    a.augment(l, {send: function() {
            function f() {
                j.on(k, "load error", d._callback, d);
                q.submit()
            }
            var d = this, c = d.io, e = c.config, g, k, l, n = e.data, q = b.get(e.form);
            d.attrs = {target: b.attr(q, "target") || "",action: b.attr(q, "action") || "",method: b.attr(q, "method")};
            d.form = q;
            k = h(c);
            b.attr(q, {target: k.id,action: c._getUrlForSend(),
                method: "post"});
            n && (l = a.unparam(n));
            l && (g = i(l, q, e.serializeArray));
            d.fields = g;
            6 == a.UA.ie ? setTimeout(f, 0) : f()
        },_callback: function(f) {
            var d = this, c = d.form, e = d.io, f = f.type, g, i = e.iframe;
            if (i)
                if ("abort" == f && 6 == a.UA.ie ? setTimeout(function() {
                    b.attr(c, d.attrs)
                }, 0) : b.attr(c, d.attrs), b.remove(this.fields), j.detach(i), setTimeout(function() {
                    b.remove(i)
                }, 30), e.iframe = null, "load" == f)
                    try {
                        if ((g = i.contentWindow.document) && g.body)
                            e.responseText = a.trim(b.text(g.body)), a.startsWith(e.responseText, "<?xml") && (e.responseText = 
                            void 0);
                        e.responseXML = g && g.XMLDocument ? g.XMLDocument : g;
                        g ? e._ioReady(200, "success") : e._ioReady(500, "parser error")
                    } catch (h) {
                        e._ioReady(500, "parser error")
                    }
                else
                    "error" == f && e._ioReady(500, "error")
        },abort: function() {
            this._callback({type: "abort"})
        }});
    k.setupTransport("iframe", l);
    return k
}, {requires: ["dom", "event", "./base"]});
KISSY.add("ajax/jsonp", function(a, b) {
    var j = a.Env.host;
    b.setupConfig({jsonp: "callback",jsonpCallback: function() {
            return a.guid("jsonp")
        }});
    b.on("start", function(b) {
        var h = b.io, i = h.config, b = i.dataType;
        if ("jsonp" == b[0]) {
            var l, g = i.jsonpCallback, f = a.isFunction(g) ? g() : g, d = j[f];
            i.uri.query.set(i.jsonp, f);
            j[f] = function(b) {
                1 < arguments.length && (b = a.makeArray(arguments));
                l = [b]
            };
            h.fin(function() {
                j[f] = d;
                if (void 0 === d)
                    try {
                        delete j[f]
                    } catch (a) {
                    }
                else
                    l && d(l[0])
            });
            h = h.converters = h.converters || {};
            h.script = h.script || 
            {};
            h.script.json = function() {
                return l[0]
            };
            b.length = 2;
            b[0] = "script";
            b[1] = "json"
        }
    });
    return b
}, {requires: ["./base"]});
KISSY.add("ajax/methods", function(a, b, j) {
    function k(b) {
        var h = b.responseText, g = b.responseXML, f = b.config, d = f.converters, c = b.converters || {}, e, k, o = f.contents, p = f.dataType;
        if (h || g) {
            for (f = b.mimeType || b.getResponseHeader("Content-Type"); "*" == p[0]; )
                p.shift();
            if (!p.length)
                for (e in o)
                    if (o[e].test(f)) {
                        p[0] != e && p.unshift(e);
                        break
                    }
            p[0] = p[0] || "text";
            if ("text" == p[0] && h !== j)
                k = h;
            else if ("xml" == p[0] && g !== j)
                k = g;
            else {
                var n = {text: h,xml: g};
                a.each(["text", "xml"], function(a) {
                    var b = p[0];
                    return (c[a] && c[a][b] || d[a] && d[a][b]) && 
                    n[a] ? (p.unshift(a), k = "text" == a ? h : g, !1) : j
                })
            }
        }
        o = p[0];
        for (f = 1; f < p.length; f++) {
            e = p[f];
            var q = c[o] && c[o][e] || d[o] && d[o][e];
            if (!q)
                throw "no covert for " + o + " => " + e;
            k = q(k);
            o = e
        }
        b.responseData = k
    }
    var h = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg;
    a.extend(b, a.Promise, {setRequestHeader: function(a, b) {
            this.requestHeaders[a] = b;
            return this
        },getAllResponseHeaders: function() {
            return 2 === this.state ? this.responseHeadersString : null
        },getResponseHeader: function(a) {
            var b, g;
            if (2 === this.state) {
                if (!(g = this.responseHeaders))
                    for (g = this.responseHeaders = 
                    {}; b = h.exec(this.responseHeadersString); )
                        g[b[1]] = b[2];
                b = g[a]
            }
            return b === j ? null : b
        },overrideMimeType: function(a) {
            this.state || (this.mimeType = a);
            return this
        },abort: function(a) {
            a = a || "abort";
            this.transport && this.transport.abort(a);
            this._ioReady(0, a);
            return this
        },getNativeXhr: function() {
            var a;
            return (a = this.transport) ? a.nativeXhr : null
        },_ioReady: function(a, b) {
            if (2 != this.state) {
                this.state = 2;
                this.readyState = 4;
                var g;
                if (200 <= a && 300 > a || 304 == a)
                    if (304 == a)
                        b = "not modified", g = !0;
                    else
                        try {
                            k(this), b = "success", g = !0
                        } catch (f) {
                            b = 
                            "parser error"
                        }
                else
                    0 > a && (a = 0);
                this.status = a;
                this.statusText = b;
                this._defer[g ? "resolve" : "reject"]([this.responseData, b, this])
            }
        },_getUrlForSend: function() {
            var b = this.config, h = b.uri, g = a.Uri.getComponents(b.url).query || "";
            return h.toString(b.serializeArray) + (g ? (h.query.has() ? "&" : "?") + g : g)
        }})
}, {requires: ["./base"]});
KISSY.add("ajax/script-transport", function(a, b, j, k) {
    function h(a) {
        if (!a.config.crossDomain)
            return new (b.getTransport("*"))(a);
        this.io = a;
        return this
    }
    var i = a.Env.host, l = i.document;
    b.setupConfig({accepts: {script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents: {script: /javascript|ecmascript/},converters: {text: {script: function(b) {
                    a.globalEval(b);
                    return b
                }}}});
    a.augment(h, {send: function() {
            var a = this, b, d = a.io, c = d.config, e = l.head || l.getElementsByTagName("head")[0] || 
            l.documentElement;
            a.head = e;
            b = l.createElement("script");
            a.script = b;
            b.async = !0;
            c.scriptCharset && (b.charset = c.scriptCharset);
            b.src = d._getUrlForSend();
            b.onerror = b.onload = b.onreadystatechange = function(b) {
                b = b || i.event;
                a._callback((b.type || "error").toLowerCase())
            };
            e.insertBefore(b, e.firstChild)
        },_callback: function(a, b) {
            var d = this.script, c = this.io, e = this.head;
            if (d && (b || !d.readyState || /loaded|complete/.test(d.readyState) || "error" == a))
                d.onerror = d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), 
                this.head = this.script = k, !b && "error" != a ? c._ioReady(200, "success") : "error" == a && c._ioReady(500, "script error")
        },abort: function() {
            this._callback(0, 1)
        }});
    b.setupTransport("script", h);
    return b
}, {requires: ["./base", "./xhr-transport"]});
KISSY.add("ajax/sub-domain-transport", function(a, b, j, k) {
    function h(a) {
        var b = a.config;
        this.io = a;
        b.crossDomain = !1
    }
    function i() {
        var a = this.io.config.uri.getHostname(), a = g[a];
        a.ready = 1;
        j.detach(a.iframe, "load", i, this);
        this.send()
    }
    var l = a.Env.host.document, g = {};
    a.augment(h, b.proto, {send: function() {
            var f = this.io.config, d = f.uri, c = d.getHostname(), e;
            e = g[c];
            var h = "/sub_domain_proxy.html";
            f.xdr && f.xdr.subDomain && f.xdr.subDomain.proxy && (h = f.xdr.subDomain.proxy);
            e && e.ready ? (this.nativeXhr = b.nativeXhr(0, e.iframe.contentWindow)) && 
            this.sendInternal() : (e ? f = e.iframe : (e = g[c] = {}, f = e.iframe = l.createElement("iframe"), k.css(f, {position: "absolute",left: "-9999px",top: "-9999px"}), k.prepend(f, l.body || l.documentElement), e = new a.Uri, e.setScheme(d.getScheme()), e.setPort(d.getPort()), e.setHostname(c), e.setPath(h), f.src = e.toString()), j.on(f, "load", i, this))
        }});
    return h
}, {requires: ["./xhr-transport-base", "event", "dom"]});
KISSY.add("ajax/xdr-flash-transport", function(a, b, j) {
    function k(a, b, g) {
        d || (d = !0, a = '<object id="' + l + '" type="application/x-shockwave-flash" data="' + a + '" width="0" height="0"><param name="movie" value="' + a + '" /><param name="FlashVars" value="yid=' + b + "&uid=" + g + '&host=KISSY.IO" /><param name="allowScriptAccess" value="always" /></object>', b = f.createElement("div"), j.prepend(b, f.body || f.documentElement), b.innerHTML = a)
    }
    function h(a) {
        this.io = a
    }
    var i = {}, l = "io_swf", g, f = a.Env.host.document, d = !1;
    a.augment(h, 
    {send: function() {
            var b = this, d = b.io, f = d.config;
            k((f.xdr || {}).src || a.Config.base + "ajax/io.swf", 1, 1);
            g ? (b._uid = a.guid(), i[b._uid] = b, g.send(d._getUrlForSend(), {id: b._uid,uid: b._uid,method: f.type,data: f.hasContent && f.data || {}})) : setTimeout(function() {
                b.send()
            }, 200)
        },abort: function() {
            g.abort(this._uid)
        },_xdrResponse: function(a, b) {
            var d, f = b.id, g, h = b.c, j = this.io;
            if (h && (g = h.responseText))
                j.responseText = decodeURI(g);
            switch (a) {
                case "success":
                    d = {status: 200,statusText: "success"};
                    delete i[f];
                    break;
                case "abort":
                    delete i[f];
                    break;
                case "timeout":
                case "transport error":
                case "failure":
                    delete i[f], d = {status: "status" in h ? h.status : 500,statusText: h.statusText || a}
            }
            d && j._ioReady(d.status, d.statusText)
        }});
    b.applyTo = function(c, d, f) {
        var c = d.split(".").slice(1), g = b;
        a.each(c, function(a) {
            g = g[a]
        });
        g.apply(null, f)
    };
    b.xdrReady = function() {
        g = f.getElementById(l)
    };
    b.xdrResponse = function(a, b) {
        var d = i[b.uid];
        d && d._xdrResponse(a, b)
    };
    return h
}, {requires: ["./base", "dom"]});
KISSY.add("ajax/xhr-transport-base", function(a, b) {
    function j(a, b) {
        try {
            return new (b || h).XMLHttpRequest
        } catch (e) {
        }
    }
    function k(a) {
        var b;
        a.ifModified && (b = a.uri, !1 === a.cache && (b = b.clone(), b.query.remove("_ksTS")), b = b.toString());
        return b
    }
    var h = a.Env.host, i = 7 < a.UA.ie && h.XDomainRequest, l = {proto: {}}, g = {}, f = {};
    b.__lastModifiedCached = g;
    b.__eTagCached = f;
    l.nativeXhr = h.ActiveXObject ? function(a, c) {
        var e;
        if (!l.supportCORS && a && i)
            e = new i;
        else if (!(e = !b.isLocal && j(a, c)))
            a: {
                try {
                    e = new (c || h).ActiveXObject("Microsoft.XMLHTTP");
                    break a
                } catch (f) {
                }
                e = void 0
            }
        return e
    } : j;
    l._XDomainRequest = i;
    l.supportCORS = "withCredentials" in l.nativeXhr();
    a.mix(l.proto, {sendInternal: function() {
            var a = this, b = a.io, e = b.config, h = a.nativeXhr, j = e.type, l = e.async, n, q = b.mimeType, r = b.requestHeaders || {}, b = b._getUrlForSend(), t = k(e), s, u;
            if (t) {
                if (s = g[t])
                    r["If-Modified-Since"] = s;
                if (s = f[t])
                    r["If-None-Match"] = s
            }
            (n = e.username) ? h.open(j, b, l, n, e.password) : h.open(j, b, l);
            if (j = e.xhrFields)
                for (u in j)
                    h[u] = j[u];
            q && h.overrideMimeType && h.overrideMimeType(q);
            r["X-Requested-With"] || 
            (r["X-Requested-With"] = "XMLHttpRequest");
            if ("undefined" !== typeof h.setRequestHeader)
                for (u in r)
                    h.setRequestHeader(u, r[u]);
            h.send(e.hasContent && e.data || null);
            !l || 4 == h.readyState ? a._callback() : i && h instanceof i ? (h.onload = function() {
                h.readyState = 4;
                h.status = 200;
                a._callback()
            }, h.onerror = function() {
                h.readyState = 4;
                h.status = 500;
                a._callback()
            }) : h.onreadystatechange = function() {
                a._callback()
            }
        },abort: function() {
            this._callback(0, 1)
        },_callback: function(d, c) {
            var e = this.nativeXhr, h = this.io, j, l, n, q, r, t = h.config;
            try {
                if (c || 
                4 == e.readyState)
                    if (i && e instanceof i ? (e.onerror = a.noop, e.onload = a.noop) : e.onreadystatechange = a.noop, c)
                        4 !== e.readyState && e.abort();
                    else {
                        j = k(t);
                        var s = e.status;
                        i && e instanceof i || (h.responseHeadersString = e.getAllResponseHeaders());
                        j && (l = e.getResponseHeader("Last-Modified"), n = e.getResponseHeader("ETag"), l && (g[j] = l), n && (f[n] = n));
                        if ((r = e.responseXML) && r.documentElement)
                            h.responseXML = r;
                        h.responseText = e.responseText;
                        try {
                            q = e.statusText
                        } catch (u) {
                            q = ""
                        }
                        !s && b.isLocal && !t.crossDomain ? s = h.responseText ? 200 : 404 : 1223 === 
                        s && (s = 204);
                        h._ioReady(s, q)
                    }
            } catch (v) {
                e.onreadystatechange = a.noop, c || h._ioReady(-1, v)
            }
        }});
    return l
}, {requires: ["./base"]});
KISSY.add("ajax/xhr-transport", function(a, b, j, k, h) {
    function i(b) {
        var d = b.config, c = d.crossDomain, e = d.xdr || {}, i = e.subDomain = e.subDomain || {};
        this.io = b;
        if (c) {
            d = d.uri.getHostname();
            if (l.domain && a.endsWith(d, l.domain) && !1 !== i.proxy)
                return new k(b);
            if (!j.supportCORS && ("flash" === "" + e.use || !g))
                return new h(b)
        }
        this.nativeXhr = j.nativeXhr(c);
        return this
    }
    var l = a.Env.host.document, g = j._XDomainRequest;
    a.augment(i, j.proto, {send: function() {
            this.sendInternal()
        }});
    b.setupTransport("*", i);
    return b
}, {requires: ["./base", 
        "./xhr-transport-base", "./sub-domain-transport", "./xdr-flash-transport"]});
KISSY.add("cookie", function(a) {
    function b(a) {
        return "string" == typeof a && "" !== a
    }
    var j = a.Env.host.document, k = encodeURIComponent, h = a.urlDecode;
    return a.Cookie = {get: function(a) {
            var k, g;
            if (b(a) && (g = ("" + j.cookie).match(RegExp("(?:^| )" + a + "(?:(?:=([^;]*))|;|$)"))))
                k = g[1] ? h(g[1]) : "";
            return k
        },set: function(a, h, g, f, d, c) {
            var h = "" + k(h), e = g;
            "number" === typeof e && (e = new Date, e.setTime(e.getTime() + 864E5 * g));
            e instanceof Date && (h += "; expires=" + e.toUTCString());
            b(f) && (h += "; domain=" + f);
            b(d) && (h += "; path=" + d);
            c && (h += 
            "; secure");
            j.cookie = a + "=" + h
        },remove: function(a, b, g, f) {
            this.set(a, "", -1, b, g, f)
        }}
});
KISSY.add("base/attribute", function(a, b) {
    function j(a, b) {
        return "string" == typeof b ? a[b] : b
    }
    function k(b, c, d, e, f, g, h) {
        h = h || d;
        return b.fire(c + a.ucfirst(d) + "Change", {attrName: h,subAttrName: g,prevVal: e,newVal: f})
    }
    function h(a, b, c) {
        var d = a[b] || {};
        c && (a[b] = d);
        return d
    }
    function i(a) {
        return h(a, "__attrs", !0)
    }
    function l(a) {
        return h(a, "__attrVals", !0)
    }
    function g(a, c) {
        for (var d = 0, e = c.length; a != b && d < e; d++)
            a = a[c[d]];
        return a
    }
    function f(a, b) {
        var c;
        !a.hasAttr(b) && -1 !== b.indexOf(".") && (c = b.split("."), b = c.shift());
        return {path: c,name: b}
    }
    function d(c, d, e) {
        var f = e;
        if (d) {
            var c = f = c === b ? {} : a.clone(c), g = d.length - 1;
            if (0 <= g) {
                for (var h = 0; h < g; h++)
                    c = c[d[h]];
                c != b && (c[d[h]] = e)
            }
        }
        return f
    }
    function c(a, c, e, h, i) {
        var h = h || {}, j, m, o;
        o = f(a, c);
        var w = c, c = o.name;
        j = o.path;
        o = a.get(c);
        j && (m = g(o, j));
        if (!j && o === e || j && m === e)
            return b;
        e = d(o, j, e);
        if (!h.silent && !1 === k(a, "before", c, o, e, w))
            return !1;
        e = a.setInternal(c, e, h);
        if (!1 === e)
            return e;
        h.silent || (e = l(a)[c], k(a, "after", c, o, e, w), i ? i.push({prevVal: o,newVal: e,attrName: c,subAttrName: w}) : k(a, "", 
        "*", [o], [e], [w], [c]));
        return a
    }
    function e() {
    }
    function m(a, c) {
        var d = i(a), e = h(d, c), f = e.valueFn;
        if (f && (f = j(a, f)))
            f = f.call(a), f !== b && (e.value = f), delete e.valueFn, d[c] = e;
        return e.value
    }
    function o(a, c, e, g) {
        var k, l;
        k = f(a, c);
        c = k.name;
        if (k = k.path)
            l = a.get(c), e = d(l, k, e);
        if ((k = h(i(a), c, !0).validator) && (k = j(a, k)))
            if (a = k.call(a, e, c, g), a !== b && !0 !== a)
                return a;
        return b
    }
    e.INVALID = {};
    var p = e.INVALID;
    e.prototype = {getAttrs: function() {
            return i(this)
        },getAttrVals: function() {
            var a = {}, b, c = i(this);
            for (b in c)
                a[b] = this.get(b);
            return a
        },addAttr: function(b, c, d) {
            var e = i(this), c = a.clone(c);
            e[b] ? a.mix(e[b], c, d) : e[b] = c;
            return this
        },addAttrs: function(b, c) {
            var d = this;
            a.each(b, function(a, b) {
                d.addAttr(b, a)
            });
            c && d.set(c);
            return d
        },hasAttr: function(a) {
            return i(this).hasOwnProperty(a)
        },removeAttr: function(a) {
            this.hasAttr(a) && (delete i(this)[a], delete l(this)[a]);
            return this
        },set: function(d, e, f) {
            if (a.isPlainObject(d)) {
                var f = e, e = Object(d), g = [], h, i = [];
                for (d in e)
                    (h = o(this, d, e[d], e)) !== b && i.push(h);
                if (i.length)
                    return f && f.error && f.error(i), 
                    !1;
                for (d in e)
                    c(this, d, e[d], f, g);
                var j = [], l = [], m = [], p = [];
                a.each(g, function(a) {
                    l.push(a.prevVal);
                    m.push(a.newVal);
                    j.push(a.attrName);
                    p.push(a.subAttrName)
                });
                j.length && k(this, "", "*", l, m, p, j);
                return this
            }
            return c(this, d, e, f)
        },setInternal: function(a, c, d) {
            var e, f, g = h(i(this), a, !0).setter;
            f = o(this, a, c);
            if (f !== b)
                return d.error && d.error(f), !1;
            if (g && (g = j(this, g)))
                e = g.call(this, c, a);
            if (e === p)
                return !1;
            e !== b && (c = e);
            l(this)[a] = c
        },get: function(a) {
            var c, d = this.hasAttr(a), e = l(this), f;
            !d && -1 !== a.indexOf(".") && (c = 
            a.split("."), a = c.shift());
            d = h(i(this), a).getter;
            f = a in e ? e[a] : m(this, a);
            if (d && (d = j(this, d)))
                f = d.call(this, f, a);
            !(a in e) && f !== b && (e[a] = f);
            c && (f = g(f, c));
            return f
        },reset: function(a, b) {
            if ("string" == typeof a)
                return this.hasAttr(a) ? this.set(a, m(this, a), b) : this;
            var b = a, c = i(this), d = {};
            for (a in c)
                d[a] = m(this, a);
            this.set(d, b);
            return this
        }};
    return e
});
KISSY.add("base", function(a, b, j) {
    function k(a) {
        var b = this.constructor;
        for (this.userConfig = a; b; ) {
            var j = b.ATTRS;
            if (j) {
                var g = void 0;
                for (g in j)
                    this.addAttr(g, j[g], !1)
            }
            b = b.superclass ? b.superclass.constructor : null
        }
        if (a)
            for (var f in a)
                this.setInternal(f, a[f])
    }
    a.augment(k, j.Target, b);
    k.Attribute = b;
    return a.Base = k
}, {requires: ["base/attribute", "event/custom"]});
KISSY.add("anim", function(a, b, j) {
    b.Easing = j;
    a.mix(a, {Anim: b,Easing: b.Easing});
    return b
}, {requires: ["anim/base", "anim/easing", "anim/color", "anim/background-position"]});
KISSY.add("anim/background-position", function(a, b, j, k) {
    function h(a) {
        a = a.replace(/left|top/g, "0px").replace(/right|bottom/g, "100%").replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2");
        a = a.match(/(-?[0-9\.]+)(px|%|em|pt)\s(-?[0-9\.]+)(px|%|em|pt)/);
        return [parseFloat(a[1]), a[2], parseFloat(a[3]), a[4]]
    }
    function i() {
        i.superclass.constructor.apply(this, arguments)
    }
    a.extend(i, k, {load: function() {
            i.superclass.load.apply(this, arguments);
            this.unit = ["px", "px"];
            if (this.from) {
                var a = h(this.from);
                this.from = [a[0], a[2]]
            } else
                this.from = 
                [0, 0];
            this.to ? (a = h(this.to), this.to = [a[0], a[2]], this.unit = [a[1], a[3]]) : this.to = [0, 0]
        },interpolate: function(a, b, f) {
            var d = this.unit, c = i.superclass.interpolate;
            return c(a[0], b[0], f) + d[0] + " " + c(a[1], b[1], f) + d[1]
        },cur: function() {
            return b.css(this.anim.config.el, "backgroundPosition")
        },update: function() {
            var a = this.prop, g = this.anim.config.el, f = this.interpolate(this.from, this.to, this.pos);
            b.css(g, a, f)
        }});
    return k.Factories.backgroundPosition = i
}, {requires: ["dom", "./base", "./fx"]});
KISSY.add("anim/base", function(a, b, j, k, h, i, l) {
    function g(c, d, e, h, i) {
        if (c.el)
            return e = c.el, d = c.props, delete c.el, delete c.props, new g(e, d, c);
        if (c = b.get(c)) {
            if (!(this instanceof g))
                return new g(c, d, e, h, i);
            d = "string" == typeof d ? a.unparam("" + d, ";", ":") : a.clone(d);
            a.each(d, function(b, c) {
                var e = a.trim(n(c));
                e ? c != e && (d[e] = d[c], delete d[c]) : delete d[c]
            });
            e = a.isPlainObject(e) ? a.clone(e) : {duration: parseFloat(e) || void 0,easing: h,complete: i};
            e = a.merge(s, e);
            e.el = c;
            e.props = d;
            this.config = e;
            this._duration = 1E3 * e.duration;
            this.domEl = c;
            this._backupProps = {};
            this._fxs = {};
            this.on("complete", f)
        }
    }
    function f(c) {
        var d, e, f = this.config;
        a.isEmptyObject(d = this._backupProps) || b.css(f.el, d);
        (e = f.complete) && e.call(this, c)
    }
    function d() {
        var d = this.config, e = this._backupProps, f = d.el, g, j, l, m = d.specialEasing || {}, o = this._fxs, n = d.props;
        c(this);
        if (!1 === this.fire("beforeStart"))
            this.stop(0);
        else {
            if (f.nodeType == q.ELEMENT_NODE)
                for (l in j = "none" === b.css(f, "display"), n)
                    if (g = n[l], "hide" == g && j || "show" == g && !j) {
                        this.stop(1);
                        return
                    }
            if (f.nodeType == 
            q.ELEMENT_NODE && (n.width || n.height))
                g = f.style, a.mix(e, {overflow: g.overflow,"overflow-x": g.overflowX,"overflow-y": g.overflowY}), g.overflow = "hidden", "inline" === b.css(f, "display") && "none" === b.css(f, "float") && (p.ie ? g.zoom = 1 : g.display = "inline-block");
            a.each(n, function(b, c) {
                var e;
                a.isArray(b) ? (e = m[c] = b[1], n[c] = b[0]) : e = m[c] = m[c] || d.easing;
                "string" == typeof e && (e = m[c] = k[e]);
                m[c] = e || k.easeNone
            });
            a.each(t, function(c, d) {
                var e, g;
                if (g = n[d])
                    e = {}, a.each(c, function(a) {
                        e[a] = b.css(f, a);
                        m[a] = m[d]
                    }), b.css(f, d, g), a.each(e, 
                    function(a, c) {
                        n[c] = b.css(f, c);
                        b.css(f, c, a)
                    }), delete n[d]
            });
            for (l in n) {
                g = a.trim(n[l]);
                var s, v, x = {prop: l,anim: this,easing: m[l]}, E = i.getFx(x);
                a.inArray(g, r) ? (e[l] = b.style(f, l), "toggle" == g && (g = j ? "show" : "hide"), "hide" == g ? (s = 0, v = E.cur(), e.display = "none") : (v = 0, s = E.cur(), b.css(f, l, v), b.show(f)), g = s) : (s = g, v = E.cur());
                g += "";
                var H = "", G = g.match(u);
                if (G) {
                    s = parseFloat(G[2]);
                    if ((H = G[3]) && "px" !== H)
                        b.css(f, l, g), v *= s / E.cur(), b.css(f, l, v + H);
                    G[1] && (s = ("-=" === G[1] ? -1 : 1) * s + v)
                }
                x.from = v;
                x.to = s;
                x.unit = H;
                E.load(x);
                o[l] = E
            }
            this._startTime = 
            a.now();
            h.start(this)
        }
    }
    function c(c) {
        var d = c.config.el, e = b.data(d, v);
        e || b.data(d, v, e = {});
        e[a.stamp(c)] = c
    }
    function e(c) {
        var d = c.config.el, e = b.data(d, v);
        e && (delete e[a.stamp(c)], a.isEmptyObject(e) && b.removeData(d, v))
    }
    function m(c, e, d) {
        c = b.data(c, "resume" == d ? x : v);
        c = a.merge(c);
        a.each(c, function(a) {
            if (void 0 === e || a.config.queue == e)
                a[d]()
        })
    }
    function o(c, e, d, f) {
        d && !1 !== f && l.removeQueue(c, f);
        c = b.data(c, v);
        c = a.merge(c);
        a.each(c, function(a) {
            a.config.queue == f && a.stop(e)
        })
    }
    var p = a.UA, n = b._camelCase, q = b.NodeType, 
    r = ["hide", "show", "toggle"], t = {background: ["backgroundPosition"],border: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],borderBottom: ["borderBottomWidth"],borderLeft: ["borderLeftWidth"],borderTop: ["borderTopWidth"],borderRight: ["borderRightWidth"],font: ["fontSize", "fontWeight"],margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"]}, s = {duration: 1,easing: "easeNone"}, u = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;
    g.SHORT_HANDS = t;
    g.prototype = {constructor: g,isRunning: function() {
            var c = b.data(this.config.el, v);
            return c ? !!c[a.stamp(this)] : 0
        },isPaused: function() {
            var c = b.data(this.config.el, x);
            return c ? !!c[a.stamp(this)] : 0
        },pause: function() {
            if (this.isRunning()) {
                this._pauseDiff = a.now() - this._startTime;
                h.stop(this);
                e(this);
                var c = this.config.el, d = b.data(c, x);
                d || b.data(c, x, d = {});
                d[a.stamp(this)] = this
            }
            return this
        },resume: function() {
            if (this.isPaused()) {
                this._startTime = a.now() - this._pauseDiff;
                var d = this.config.el, e = b.data(d, 
                x);
                e && (delete e[a.stamp(this)], a.isEmptyObject(e) && b.removeData(d, x));
                c(this);
                h.start(this)
            }
            return this
        },_runInternal: d,run: function() {
            !1 === this.config.queue ? d.call(this) : l.queue(this);
            return this
        },_frame: function() {
            var a, b = this.config, c = 1, d, e, f = this._fxs;
            for (a in f)
                if (!(e = f[a]).finished)
                    b.frame && (d = b.frame(e)), 1 == d || 0 == d ? (e.finished = d, c &= d) : (c &= e.frame()) && b.frame && b.frame(e);
            (!1 === this.fire("step") || c) && this.stop(c)
        },stop: function(a) {
            var b = this.config, c = b.queue, d, f = this._fxs;
            if (!this.isRunning())
                return !1 !== 
                c && l.remove(this), this;
            if (a) {
                for (d in f)
                    if (!(a = f[d]).finished)
                        b.frame ? b.frame(a, 1) : a.frame(1);
                this.fire("complete")
            }
            h.stop(this);
            e(this);
            !1 !== c && l.dequeue(this);
            return this
        }};
    a.augment(g, j.Target);
    var v = a.guid("ks-anim-unqueued-" + a.now() + "-"), x = a.guid("ks-anim-paused-" + a.now() + "-");
    g.stop = function(c, d, e, f) {
        if (null === f || "string" == typeof f || !1 === f)
            return o.apply(void 0, arguments);
        e && l.removeQueues(c);
        var g = b.data(c, v), g = a.merge(g);
        a.each(g, function(a) {
            a.stop(d)
        })
    };
    a.each(["pause", "resume"], function(a) {
        g[a] = 
        function(b, c) {
            if (null === c || "string" == typeof c || !1 === c)
                return m(b, c, a);
            m(b, void 0, a)
        }
    });
    g.isRunning = function(c) {
        return (c = b.data(c, v)) && !a.isEmptyObject(c)
    };
    g.isPaused = function(c) {
        return (c = b.data(c, x)) && !a.isEmptyObject(c)
    };
    g.Q = l;
    return g
}, {requires: "dom,event,./easing,./manager,./fx,./queue".split(",")});
KISSY.add("anim/color", function(a, b, j, k) {
    function h(a) {
        var a = a + "", b;
        if (b = a.match(d))
            return [parseInt(b[1]), parseInt(b[2]), parseInt(b[3])];
        if (b = a.match(c))
            return [parseInt(b[1]), parseInt(b[2]), parseInt(b[3]), parseInt(b[4])];
        if (b = a.match(e)) {
            for (a = 1; a < b.length; a++)
                2 > b[a].length && (b[a] += b[a]);
            return [parseInt(b[1], l), parseInt(b[2], l), parseInt(b[3], l)]
        }
        return f[a = a.toLowerCase()] ? f[a] : [255, 255, 255]
    }
    function i() {
        i.superclass.constructor.apply(this, arguments)
    }
    var l = 16, g = Math.floor, f = {black: [0, 0, 0],silver: [192, 
            192, 192],gray: [128, 128, 128],white: [255, 255, 255],maroon: [128, 0, 0],red: [255, 0, 0],purple: [128, 0, 128],fuchsia: [255, 0, 255],green: [0, 128, 0],lime: [0, 255, 0],olive: [128, 128, 0],yellow: [255, 255, 0],navy: [0, 0, 128],blue: [0, 0, 255],teal: [0, 128, 128],aqua: [0, 255, 255]}, d = /^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i, c = /^rgba\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+),\s*([0-9]+)\)$/i, e = /^#?([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$/i, b = j.SHORT_HANDS;
    b.background = b.background || [];
    b.background.push("backgroundColor");
    b.borderColor = ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"];
    b.border.push("borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor");
    b.borderBottom.push("borderBottomColor");
    b.borderLeft.push("borderLeftColor");
    b.borderRight.push("borderRightColor");
    b.borderTop.push("borderTopColor");
    a.extend(i, k, {load: function() {
            i.superclass.load.apply(this, arguments);
            this.from && (this.from = h(this.from));
            this.to && (this.to = h(this.to))
        },interpolate: function(a, b, c) {
            var d = 
            i.superclass.interpolate;
            if (3 == a.length && 3 == b.length)
                return "rgb(" + [g(d(a[0], b[0], c)), g(d(a[1], b[1], c)), g(d(a[2], b[2], c))].join(", ") + ")";
            if (4 == a.length || 4 == b.length)
                return "rgba(" + [g(d(a[0], b[0], c)), g(d(a[1], b[1], c)), g(d(a[2], b[2], c)), g(d(a[3] || 1, b[3] || 1, c))].join(", ") + ")"
        }});
    a.each("backgroundColor,borderBottomColor,borderLeftColor,borderRightColor,borderTopColor,color,outlineColor".split(","), function(a) {
        k.Factories[a] = i
    });
    return i
}, {requires: ["dom", "./base", "./fx"]});
KISSY.add("anim/easing", function() {
    var a = Math.PI, b = Math.pow, j = Math.sin, k = {swing: function(b) {
            return -Math.cos(b * a) / 2 + 0.5
        },easeNone: function(a) {
            return a
        },easeIn: function(a) {
            return a * a
        },easeOut: function(a) {
            return (2 - a) * a
        },easeBoth: function(a) {
            return 1 > (a *= 2) ? 0.5 * a * a : 0.5 * (1 - --a * (a - 2))
        },easeInStrong: function(a) {
            return a * a * a * a
        },easeOutStrong: function(a) {
            return 1 - --a * a * a * a
        },easeBothStrong: function(a) {
            return 1 > (a *= 2) ? 0.5 * a * a * a * a : 0.5 * (2 - (a -= 2) * a * a * a)
        },elasticIn: function(h) {
            return 0 === h || 1 === h ? h : -(b(2, 10 * (h -= 
            1)) * j((h - 0.075) * 2 * a / 0.3))
        },elasticOut: function(h) {
            return 0 === h || 1 === h ? h : b(2, -10 * h) * j((h - 0.075) * 2 * a / 0.3) + 1
        },elasticBoth: function(h) {
            return 0 === h || 2 === (h *= 2) ? h : 1 > h ? -0.5 * b(2, 10 * (h -= 1)) * j((h - 0.1125) * 2 * a / 0.45) : 0.5 * b(2, -10 * (h -= 1)) * j((h - 0.1125) * 2 * a / 0.45) + 1
        },backIn: function(a) {
            1 === a && (a -= 0.001);
            return a * a * (2.70158 * a - 1.70158)
        },backOut: function(a) {
            return (a -= 1) * a * (2.70158 * a + 1.70158) + 1
        },backBoth: function(a) {
            var b, j = (b = 2.5949095) + 1;
            return 1 > (a *= 2) ? 0.5 * a * a * (j * a - b) : 0.5 * ((a -= 2) * a * (j * a + b) + 2)
        },bounceIn: function(a) {
            return 1 - 
            k.bounceOut(1 - a)
        },bounceOut: function(a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
        },bounceBoth: function(a) {
            return 0.5 > a ? 0.5 * k.bounceIn(2 * a) : 0.5 * k.bounceOut(2 * a - 1) + 0.5
        }};
    return k
});
KISSY.add("anim/fx", function(a, b, j) {
    function k(a) {
        this.load(a)
    }
    function h(a, h) {
        return (!a.style || null == a.style[h]) && null != b.attr(a, h, j, 1) ? 1 : 0
    }
    k.prototype = {constructor: k,load: function(b) {
            a.mix(this, b);
            this.pos = 0;
            this.unit = this.unit || ""
        },frame: function(b) {
            var h = this.anim, g = 0;
            if (this.finished)
                return 1;
            var f = a.now(), d = h._startTime, h = h._duration;
            b || f >= h + d ? g = this.pos = 1 : this.pos = this.easing((f - d) / h);
            this.update();
            this.finished = this.finished || g;
            return g
        },interpolate: function(b, h, g) {
            return a.isNumber(b) && a.isNumber(h) ? 
            (b + (h - b) * g).toFixed(3) : j
        },update: function() {
            var a = this.prop, k = this.anim.config.el, g = this.to, f = this.interpolate(this.from, g, this.pos);
            f === j ? this.finished || (this.finished = 1, b.css(k, a, g)) : (f += this.unit, h(k, a) ? b.attr(k, a, f, 1) : b.css(k, a, f))
        },cur: function() {
            var a = this.prop, k = this.anim.config.el;
            if (h(k, a))
                return b.attr(k, a, j, 1);
            var g, a = b.css(k, a);
            return isNaN(g = parseFloat(a)) ? !a || "auto" === a ? 0 : a : g
        }};
    k.Factories = {};
    k.getFx = function(a) {
        return new (k.Factories[a.prop] || k)(a)
    };
    return k
}, {requires: ["dom"]});
KISSY.add("anim/manager", function(a) {
    var b = a.stamp;
    return {interval: 15,runnings: {},timer: null,start: function(a) {
            var k = b(a);
            this.runnings[k] || (this.runnings[k] = a, this.startTimer())
        },stop: function(a) {
            this.notRun(a)
        },notRun: function(j) {
            delete this.runnings[b(j)];
            a.isEmptyObject(this.runnings) && this.stopTimer()
        },pause: function(a) {
            this.notRun(a)
        },resume: function(a) {
            this.start(a)
        },startTimer: function() {
            var a = this;
            a.timer || (a.timer = setTimeout(function() {
                a.runFrames() ? a.stopTimer() : (a.timer = 0, a.startTimer())
            }, 
            a.interval))
        },stopTimer: function() {
            var a = this.timer;
            a && (clearTimeout(a), this.timer = 0)
        },runFrames: function() {
            var a = 1, b, h = this.runnings;
            for (b in h)
                a = 0, h[b]._frame();
            return a
        }}
});
KISSY.add("anim/queue", function(a, b) {
    function j(a, f, d) {
        var f = f || i, c, e = b.data(a, h);
        !e && !d && b.data(a, h, e = {});
        e && (c = e[f], !c && !d && (c = e[f] = []));
        return c
    }
    function k(g, f) {
        var f = f || i, d = b.data(g, h);
        d && delete d[f];
        a.isEmptyObject(d) && b.removeData(g, h)
    }
    var h = a.guid("ks-queue-" + a.now() + "-"), i = a.guid("ks-queue-" + a.now() + "-"), l = {queueCollectionKey: h,queue: function(a) {
            var b = j(a.config.el, a.config.queue);
            b.push(a);
            "..." !== b[0] && l.dequeue(a);
            return b
        },remove: function(b) {
            var f = j(b.config.el, b.config.queue, 1);
            f && (b = 
            a.indexOf(b, f), -1 < b && f.splice(b, 1))
        },removeQueues: function(a) {
            b.removeData(a, h)
        },removeQueue: k,dequeue: function(a) {
            var b = a.config.el, a = a.config.queue, d = j(b, a, 1), c = d && d.shift();
            "..." == c && (c = d.shift());
            c ? (d.unshift("..."), c._runInternal()) : k(b, a)
        }};
    return l
}, {requires: ["dom"]});
KISSY.add("node/anim", function(a, b, j, k, h) {
    function i(a, b, d) {
        for (var c = [], e = {}, d = d || 0; d < b; d++)
            c.push.apply(c, l[d]);
        for (d = 0; d < c.length; d++)
            e[c[d]] = a;
        return e
    }
    var l = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
    a.augment(k, {animate: function(b) {
            var f = a.makeArray(arguments);
            a.each(this, function(b) {
                var c = a.clone(f), e = c[0];
                e.props ? (e.el = b, j(e).run()) : j.apply(h, [b].concat(c)).run()
            });
            return this
        },stop: function(b, 
        f, d) {
            a.each(this, function(a) {
                j.stop(a, b, f, d)
            });
            return this
        },pause: function(b, f) {
            a.each(this, function(a) {
                j.pause(a, f)
            });
            return this
        },resume: function(b, f) {
            a.each(this, function(a) {
                j.resume(a, f)
            });
            return this
        },isRunning: function() {
            for (var a = 0; a < this.length; a++)
                if (j.isRunning(this[a]))
                    return !0;
            return !1
        },isPaused: function() {
            for (var a = 0; a < this.length; a++)
                if (j.isPaused(this[a]))
                    return 1;
            return 0
        }});
    a.each({show: i("show", 3),hide: i("hide", 3),toggle: i("toggle", 3),fadeIn: i("show", 3, 2),fadeOut: i("hide", 3, 2),fadeToggle: i("toggle", 
        3, 2),slideDown: i("show", 1),slideUp: i("hide", 1),slideToggle: i("toggle", 1)}, function(g, f) {
        k.prototype[f] = function(d, c, e) {
            if (b[f] && !d)
                b[f](this);
            else
                a.each(this, function(a) {
                    j(a, g, d, e || "easeOut", c).run()
                });
            return this
        }
    })
}, {requires: ["dom", "anim", "./base"]});
KISSY.add("node/attach", function(a, b, j, k, h) {
    function i(a, d, c) {
        c.unshift(d);
        a = b[a].apply(b, c);
        return a === h ? d : a
    }
    var l = k.prototype, g = a.makeArray;
    k.KeyCodes = j.KeyCodes;
    a.each("nodeName,equals,contains,index,scrollTop,scrollLeft,height,width,innerHeight,innerWidth,outerHeight,outerWidth,addStyleSheet,appendTo,prependTo,insertBefore,before,after,insertAfter,test,hasClass,addClass,removeClass,replaceClass,toggleClass,removeAttr,hasAttr,hasProp,scrollIntoView,remove,empty,removeData,hasData,unselectable,wrap,wrapAll,replaceWith,wrapInner,unwrap".split(","), function(a) {
        l[a] = 
        function() {
            var b = g(arguments);
            return i(a, this, b)
        }
    });
    a.each("filter,first,last,parent,closest,next,prev,clone,siblings,contents,children".split(","), function(a) {
        l[a] = function() {
            var d = g(arguments);
            d.unshift(this);
            d = b[a].apply(b, d);
            return d === h ? this : d === null ? null : new k(d)
        }
    });
    a.each({attr: 1,text: 0,css: 1,style: 1,val: 0,prop: 1,offset: 0,html: 0,outerHTML: 0,data: 1}, function(f, d) {
        l[d] = function() {
            var c;
            c = g(arguments);
            c[f] === h && !a.isObject(c[0]) ? (c.unshift(this), c = b[d].apply(b, c)) : c = i(d, this, c);
            return c
        }
    });
    a.each("on,detach,fire,fireHandler,delegate,undelegate".split(","), 
    function(a) {
        l[a] = function() {
            var b = g(arguments);
            b.unshift(this);
            j[a].apply(j, b);
            return this
        }
    })
}, {requires: ["dom", "event/dom", "./base"]});
KISSY.add("node/base", function(a, b, j) {
    function k(c, e, h) {
        if (!(this instanceof k))
            return new k(c, e, h);
        if (c)
            if ("string" == typeof c) {
                if (c = b.create(c, e, h), c.nodeType === l.DOCUMENT_FRAGMENT_NODE)
                    return g.apply(this, f(c.childNodes)), this
            } else {
                if (a.isArray(c) || d(c))
                    return g.apply(this, f(c)), this
            }
        else
            return this;
        this[0] = c;
        this.length = 1;
        return this
    }
    var h = Array.prototype, i = h.slice, l = b.NodeType, g = h.push, f = a.makeArray, d = b._isNodeList;
    k.prototype = {constructor: k,length: 0,item: function(b) {
            return a.isNumber(b) ? b >= 
            this.length ? null : new k(this[b]) : new k(b)
        },add: function(b, d, f) {
            a.isNumber(d) && (f = d, d = j);
            b = k.all(b, d).getDOMNodes();
            d = new k(this);
            f === j ? g.apply(d, b) : (f = [f, 0], f.push.apply(f, b), h.splice.apply(d, f));
            return d
        },slice: function(a, b) {
            return new k(i.apply(this, arguments))
        },getDOMNodes: function() {
            return i.call(this)
        },each: function(b, d) {
            var f = this;
            a.each(f, function(a, g) {
                a = new k(a);
                return b.call(d || a, a, g, f)
            });
            return f
        },getDOMNode: function() {
            return this[0]
        },end: function() {
            return this.__parent || this
        },all: function(a) {
            a = 
            0 < this.length ? k.all(a, this) : new k;
            a.__parent = this;
            return a
        },one: function(a) {
            a = this.all(a);
            if (a = a.length ? a.slice(0, 1) : null)
                a.__parent = this;
            return a
        }};
    a.mix(k, {all: function(c, d) {
            return "string" == typeof c && (c = a.trim(c)) && 3 <= c.length && a.startsWith(c, "<") && a.endsWith(c, ">") ? (d && (d.getDOMNode && (d = d[0]), d = d.ownerDocument || d), new k(c, j, d)) : new k(b.query(c, d))
        },one: function(a, b) {
            var d = k.all(a, b);
            return d.length ? d.slice(0, 1) : null
        }});
    k.NodeType = l;
    return k
}, {requires: ["dom"]});
KISSY.add("node", function(a, b) {
    a.mix(a, {Node: b,NodeList: b,one: b.one,all: b.all});
    return b
}, {requires: ["node/base", "node/attach", "node/override", "node/anim"]});
KISSY.add("node/override", function(a, b, j) {
    var k = j.prototype;
    a.each(["append", "prepend", "before", "after"], function(a) {
        k[a] = function(i) {
            "string" == typeof i && (i = b.create(i));
            if (i)
                b[a](i, this);
            return this
        }
    });
    a.each(["wrap", "wrapAll", "replaceWith", "wrapInner"], function(a) {
        var b = k[a];
        k[a] = function(a) {
            "string" == typeof a && (a = j.all(a, this[0].ownerDocument));
            return b.call(this, a)
        }
    })
}, {requires: ["dom", "./base"]});
KISSY.use("ua,dom,event,node,json,ajax,anim,base,cookie", 0, 1);
var TB = window.TB || {};
TB.namespace = TB.namespace || function() {
    KISSY.namespace.apply(TB, arguments)
};
(function() {
    var g = KISSY, l = !"0"[0], L = l && !window.XMLHttpRequest, q = !!window.ActiveXObject, j = document, I = window, H, p, b = " ", B = "hover", d, s = "g_config" in I ? ("appId" in I.g_config ? parseInt(I.g_config["appId"]) : undefined) : undefined, M = "mini-cart", o = "mini-cart-no-layer", v = location.hostname.split("."), x = j.domain, C = x.indexOf("tmall.com") > -1, J = ~location.hostname.indexOf("daily.taobao.net") || ~location.hostname.indexOf("daily.tmall.net"), y = J ? ".daily.taobao.net" : ".taobao.com", f = "", u = false, A = null, G = (j.location.href.indexOf("https://") === 0), r = {}, k = {siteNav: function() {
            if (!d) {
                return
            }
            d.setAttribute("role", "navigation");
            g.each(z("menu", "*", d), function(T) {
                TB.Global._addMenu(T)
            });
            var S = j.forms.topSearch;
            m(S, "submit", function() {
                if (S.q.value == f) {
                    S.action = "http://list.taobao.com/browse/cat-0.htm"
                }
            });
            var i = z("cart", "li", d)[0];
            m(i, "click", function(U) {
                var T = U.target || U.srcElement;
                if (T.nodeName != "A" && T.parentNode.nodeName === "A") {
                    T = T.parentNode
                }
                if (T.nodeName === "A" && T.href.indexOf("my_cart.htm") > -1) {
                    F(U);
                    w(i, "hover");
                    TB.Cart && TB.Cart.redirect(T, T.href);
                    if (I.MiniCart) {
                        I.MiniCart._clicked = false
                    }
                }
            });
            var O = "g_mytaobao_set_dynamic_count";
            var Q = false;
            var R = z("mytaobao", "li", d)[0];
            m(R, "mouseover", function(U) {
                if (Q) {
                    return
                }
                if (!TB.Global.isLogin()) {
                    return
                }
                Q = true;
                window[O] = function(W) {
                    if (!W || !W[5] || !W[6] || !W[7]) {
                        return
                    }
                    var V = parseInt(W[6]) + parseInt(W[7]);
                    el = document.getElementById("myTaobaoPanel").getElementsByTagName("a")[1];
                    el2 = document.getElementById("myTaobaoPanel").getElementsByTagName("a")[2];
                    if (W[5] != 0) {
                        el2.innerHTML += '<span style="color:#f50;"> ' + W[5] + "</span>"
                    }
                    if (V == 0) {
                        return
                    }
                    if (V > 20) {
                        el.innerHTML += '<span style="color:#f50;"> 20+</span>'
                    } else {
                        el.innerHTML += '<span style="color:#f50;"> ' + V + "</span>"
                    }
                };
                var T = "http://i" + y + "/json/my_taobao_remind_data.htm?from=newsite&t=";
                g.getScript(T + g.now() + "&callback=" + O)
            });
            var N = false;
            var P = z("user", "span", d)[0];
            m(P, "mouseover", function(X) {
                var Z = z("vip-stepleft", "a", d)[0];
                var Y = z("vip-stepright", "a", d)[0];
                var W;
                var U = "g_my_vip_icon";
                if (!TB.Global.isLogin()) {
                    return
                }
                if (N) {
                    return
                }
                N = true;
                window[U] = function(ag) {
                    var af = document.getElementById("J_VipContent");
                    var ab = document.getElementById("J_VipMedal");
                    if (!ag || ag.isSuccess === false) {
                        af.removeChild(ab);
                        af.style.height = "100px";
                        return
                    }
                    W = Math.ceil(ag.userMedals.length / 5);
                    var ah = [];
                    for (var ae = 0; ae < ag.userMedals.length; ae++) {
                        ah.push('<a title="' + ag.userMedals[ae].medalName + '" target="_self" href="' + ag.userMedals[ae].medalUrl + '"><img src="' + ag.userMedals[ae].pic + '" /></a>')
                    }
                    if (ah.length === 0) {
                        af.removeChild(ab);
                        af.style.height = "100px"
                    } else {
                        var ad = document.getElementById("J_VipMedalContent");
                        var ac = new RegExp("(\\s|^)vip-loading(\\s|$)");
                        ab.className = ab.className.replace(ac, "");
                        ad.innerHTML = ah.join("");
                        if (ah.length <= 5) {
                            Y.style.display = Z.style.display = "none"
                        }
                        ad.setAttribute("pageid", "1");
                        var aa = parseInt(ad.getAttribute("pageid"));
                        m(Z, "click", function(ai) {
                            if (aa > 1) {
                                aa = aa - 1;
                                ad.style.left = "-" + (aa - 1) * 205 + "px";
                                ad.setAttribute("pageid", aa)
                            }
                        });
                        m(Y, "click", function(ai) {
                            if (aa < W) {
                                ad.style.left = "-" + aa * 205 + "px";
                                aa = aa + 1;
                                ad.setAttribute("pageid", aa)
                            }
                        })
                    }
                };
                var T = h("_nk_") || h("tracknick");
                var V = "http://vipservice" + y + "/medal/GetUserVisibleMedals.do?from=diaoding&nick=";
                g.getScript(V + T + "&t=" + g.now() + "&callback=" + U, {charset: "utf-8"})
            })
        },tDog: function() {
            if ((s && s != -1) || "tstart" in p || "tdog" in p) {
                var i = "http://" + H + "/p/header/webww-min.js?t=20110629.js", N = 0;
                g.ready(function() {
                    if (g.DOM) {
                        g.getScript(i)
                    } else {
                        if (N < 10) {
                            setTimeout(arguments.callee, 1000);
                            N++
                        } else {
                            g.use("core", function() {
                                g.getScript(i)
                            })
                        }
                    }
                })
            }
        },tLabs: function() {
            if (location.href.indexOf("tms.taobao.com") !== -1) {
                return
            }
            var T = window.location.href.indexOf("__tlabs-dev") !== -1, R = TB.Global.isLogin();
            if (!T) {
                if (R) {
                    var Q = h("l");
                    if (Q) {
                        var P = h("_nk_") || h("tracknick"), O = Q.split("::"), N = O[0], S = O[1], i = O[2].substring(0, 1) === "1";
                        N = encodeURIComponent(a(unescape(N.replace(/\\u/g, "%u"))));
                        if (N === P && i && new Date().getTime() < S) {
                            return
                        }
                    }
                } else {
                    return
                }
            }
            g.ready(function() {
                var V = "http://" + H + "/p/tlabs/1.0.0/tlabs-min.js?t=1.0.0.js", U = h("_nk_") || h("tracknick");
                U = encodeURIComponent(a(unescape(U.replace(/\\u/g, "%u"))));
                g.getScript(V, function() {
                    if (typeof TLabs !== "undefined") {
                        TLabs.init({nick: U})
                    }
                })
            })
        },POCMonitor: function() {
            var R = I._poc || [], Q, O = 0, N = [["_setAccount", (I.g_config || 0).appId], ["_setStartTime", (I.g_config || 0).startTime || I.HUBBLE_st || I.g_hb_monitor_st]], P = 10000;
            while ((Q = R[O++])) {
                if (Q[0] === "_setRate") {
                    P = Q[1]
                } else {
                    if (Q[0] === "_setAccount") {
                        N[0] = Q
                    } else {
                        if (Q[0] === "_setStartTime") {
                            N[1] = Q
                        } else {
                            N.push(Q)
                        }
                    }
                }
            }
            if (parseInt(Math.random() * P) === 0) {
                I._poc = N;
                g.getScript("http://a.tbcdn.cn/p/poc/m.js?v=0.0.1.js")
            }
        },initHeaderLinks: function() {
            if (x.indexOf(".taobao.net") === -1) {
                return
            }
            var P = d ? d.getElementsByTagName("a") : [], O = 0, N = P.length, Q = v;
            while (Q.length > 3) {
                Q.shift()
            }
            Q = Q.join(".");
            for (; O < N; O++) {
                P[O].href = P[O].href.replace("taobao.com", Q)
            }
        },initSiteNav: function() {
            var O = j.getElementById("J_Service"), N = j.getElementById("J_ServicesContainer"), Q, i = "http://www.taobao.com/index_inc/2010c/includes/get-services.php", R = "__services_results";
            if (!O || !N) {
                return
            }
            m(O, "mouseover", P);
            m(O, "keydown", P);
            function P(S) {
                if (S.type === "keydown" && S.keyCode !== 39 && S.keyCode !== 40) {
                    return
                }
                Q = g.getScript(i + "?cb=" + R, {charset: "gbk"});
                F(S)
            }
            window[R] = function(S) {
                if (Q) {
                    Q.parentNode.removeChild(Q)
                }
                Q = null;
                try {
                    N.innerHTML = S;
                    N.style.height = "auto";
                    c(O, "mouseover", P);
                    c(O, "keydown", P)
                } catch (T) {
                    N.style.display = "none"
                }
            }
        },test: function() {
            var i = false;
            var N = function() {
                if (i) {
                    return
                }
                i = true;
                if (location.href.indexOf("__cloudyrun__") > -1) {
                    g.getScript("http://assets.daily.taobao.net/p/cloudyrun/1.0/cloudyrun-taobao-pkg.js?t=" + (+new Date()))
                }
            };
            g.ready(N);
            setTimeout(N, 4000)
        },assist: function() {
            if (h("test_accouts") && document.domain.indexOf("taobao.net") > -1) {
                g.ready(function() {
                    g.getScript("http://assets.daily.taobao.net/p/assist/login/login.js")
                })
            }
        },miniCart: function() {
            var i = TB.Global;
            if (i._OFF) {
                return
            }
            if (C || x.indexOf("tmall.net") > -1) {
                if (g.isUndefined(s)) {
                    return
                } else {
                    if (!(h("uc2") && h("mt"))) {
                        g.getScript("http://www" + y + "/go/app/tmall/login-api.php?t=" + g.now());
                        return
                    }
                }
            }
            i.initMiniCart()
        },shareFB: function() {
            g.ready(function() {
                var i = "http://" + H + "/apps/matrix-mission/feedback/feedback.js";
                g.getScript(i)
            })
        },checkB2BUser: function() {
            var O = g.unparam(h("uc1"));
            var i = encodeURIComponent(location.href);
            if (!O.cbu) {
                return
            }
            if (i.indexOf("www.taobao.com") > -1 && !/taobao\.com\/(\w+)/g.test(i)) {
                return
            }
            if (i.indexOf("list.taobao.com") > -1 || i.indexOf("service.taobao.com") > -1) {
                return
            }
            var P = document.createElement("div");
            P.className = "cbu-cover";
            P.innerHTML = "<!--[if lte IE 6.5]><iframe></iframe><![endif]-->";
            document.body.appendChild(P);
            var N = document.createElement("iframe");
            N.src = "http://reg" + y + "/member/changeNick2B.jhtml?t=" + g.now() + "&url=" + i;
            N.className = "cbu-iframe";
            N.allowTransparency = "true";
            document.body.appendChild(N);
            document.documentElement.style.overflow = "hidden"
        }};
    var E = ["tDog", "tLabs", "test"];
    for (var K = 0; K < E.length; K++) {
        (function(N) {
            var i = k[N];
            k[N] = function() {
                setTimeout(i, 1000)
            }
        })(E[K])
    }
    TB.Global = {_addMenu: function(Q) {
            if (!Q) {
                return
            }
            var N = this, R = z("menu-hd", "*", Q)[0], P = z("menu-bd", "*", Q)[0];
            if (!P || !R) {
                return
            }
            R.tabIndex = 0;
            N._subMenus.push(P);
            P.setAttribute("role", "menu");
            P.setAttribute("aria-hidden", "true");
            if (!P.getAttribute("id")) {
                P.setAttribute("id", g.guid("menu-"))
            }
            R.setAttribute("aria-haspopup", P.getAttribute("id"));
            R.setAttribute("aria-label", "\u53f3\u952e\u5f39\u51fa\u83dc\u5355\uff0ctab\u952e\u5bfc\u822a\uff0cesc\u5173\u95ed\u5f53\u524d\u83dc\u5355");
            var O = false;
            if (!G && L) {
                O = j.createElement("iframe");
                O.src = "about: blank";
                O.className = "menu-bd";
                Q.insertBefore(O, P)
            }
            m(Q, "mouseover", function(T) {
                var S = T.relatedTarget;
                while (S && S !== Q) {
                    S = S.parentNode
                }
                if (S !== Q) {
                    g.each(N._subMenus, function(U) {
                        if (U !== P) {
                            w(U.parentNode, B);
                            U.setAttribute("aria-hidden", "true")
                        }
                    });
                    D(Q, B);
                    P.setAttribute("aria-hidden", "false");
                    if (!O) {
                        return
                    }
                    O.style.height = parseInt(P.offsetHeight) + 25 + "px";
                    O.style.width = parseInt(P.offsetWidth) + 1 + "px"
                }
            });
            m(Q, "mouseout", function(T) {
                var S = T.relatedTarget;
                while (S && S !== Q) {
                    S = S.parentNode
                }
                if (S !== Q) {
                    w(Q, B);
                    P.setAttribute("aria-hidden", "true");
                    g.each(P.getElementsByTagName("input"), function(U) {
                        if (U.getAttribute("type") !== "hidden") {
                            U.blur()
                        }
                    })
                }
            });
            m(Q, "keydown", function(T) {
                var S = T.keyCode;
                if (S == 27 || S == 37 || S == 38) {
                    w(Q, B);
                    P.setAttribute("aria-hidden", "true");
                    R.focus();
                    F(T)
                } else {
                    if (S == 39 || S == 40) {
                        D(Q, B);
                        P.setAttribute("aria-hidden", "false");
                        F(T)
                    }
                }
            });
            var i;
            m(Q, q ? "focusin" : "focus", function() {
                if (i) {
                    clearTimeout(i);
                    i = null
                }
            }, !q);
            m(Q, q ? "focusout" : "blur", function() {
                i = setTimeout(function() {
                    w(Q, B);
                    P.setAttribute("aria-hidden", "true")
                }, 100)
            }, !q)
        },_fixIE6: function(N, i) {
            if (!this._sharedShim) {
                this._sharedShim = j.createElement("iframe");
                this._sharedShim.src = "about: blank";
                this._sharedShim.className = "menu-bd"
            }
            N.insertBefore(this._sharedShim, i);
            return this._sharedShim
        },init: function(i) {
            if (u) {
                return
            }
            u = true;
            H = J ? "assets.daily.taobao.net" : "a.tbcdn.cn";
            p = g.unparam(location.search.substring(1));
            d = j.getElementById("site-nav");
            this._OFF = !!!d;
            this.config = i;
            if (i && i.mc && i.mc === -1) {
                this._OFF = true
            }
            if (window.top !== window.self) {
                this._OFF = true
            }
            this._subMenus = [];
            for (var N in k) {
                k[N]()
            }
            if (~location.search.indexOf("__test__=global.js")) {
                g.ready(function() {
                    g.later(O, 3000)
                });
                function O() {
                    var P = ["Light", "TLabs"];
                    for (var Q = 0; Q < P.length; Q++) {
                        if (typeof P === "undefined") {
                            alert("test case: failure");
                            return
                        }
                    }
                    alert("test case: success")
                }
            }
        },writeLoginInfo: function(al, R) {
            al = al || {};
            var aa = this, ak = h("_nk_") || h("tracknick"), O = n(h("uc1")), af = parseInt(O._msg_) || 0, W = g.now(), Y = "http://login.taobao.com", i = "http://reg.taobao.com", ah = al.outmemServer || "http://outmem.taobao.com", N = al.loginServer || "https://login.taobao.com", ab = al.loginUrl || N + "/member/login.jhtml?f=top", S = location.href, ac, ai, Q, aj, ag, X = f;
            if (/^http.*(\/member\/login\.jhtml)$/i.test(S)) {
                S = f
            }
            ac = al.redirectUrl || S;
            if (ac) {
                ab += "&redirectURL=" + encodeURIComponent(ac)
            }
            ai = al.logoutUrl || Y + "/member/logout.jhtml?f=top&out=true&redirectURL=" + encodeURIComponent(ac);
            Q = i + "/member/new_register.jhtml?from=tbtop&ex_info=&ex_sign=";
            aj = ah + "/message/list_private_msg.htm?t=" + W;
            ag = "http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739";
            A = ai;
            if (aa.isLogin()) {
                X = aa.showVIP(ai)
            } else {
                X = '\u4eb2\uff0c\u6b22\u8fce\u6765\u6dd8\u5b9d\uff01\u8bf7<a href="' + ab + '" target="_top">\u767b\u5f55</a>';
                X += '<a href="' + Q + '" target="_top">\u514d\u8d39\u6ce8\u518c</a>'
            }
            if (R) {
                var T = document.getElementById("site-nav");
                if (T) {
                    var ad = z("login-info", "*", T)[0];
                    if (ad && ad.className === "login-info") {
                        ad.innerHTML = X
                    }
                }
                return
            }
            j.write(X);
            if (aa.showVIP(ai).length < 1) {
                return
            }
            var ae = document.getElementById("J_Vip_Areas");
            var Z = null;
            m(ae, "mouseover", function(am) {
                if (U(am, this)) {
                    Z && Z.cancel();
                    D(ae, "user-hover")
                }
            });
            m(ae, "mouseout", function(am) {
                if (U(am, this)) {
                    Z && Z.cancel();
                    Z = g.later(function() {
                        w(ae, "user-hover")
                    }, 300)
                }
            });
            function V(am, an) {
                while (an && an.nodeName !== "BODY") {
                    if (am === an.parentNode) {
                        return true
                    }
                    an = an.parentNode
                }
                return false
            }
            function U(an, am) {
                if (P(an).type == "mouseover") {
                    return !V(am, P(an).relatedTarget || P(an).fromElement) && !((P(an).relatedTarget || P(an).fromElement) === am)
                } else {
                    return !V(am, P(an).relatedTarget || P(an).toElement) && !((P(an).relatedTarget || P(an).toElement) === am)
                }
            }
            function P(am) {
                return am || window.event
            }
        },showVIP: function(P) {
            var V = parseInt(n(h("uc1"))["tag"]), Q = f, N = f, R = f, S = "http://vip" + y, O = g.now(), i = h("_nk_") || h("tracknick"), U = "http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739";
            if (V === 0 || V === -1) {
                N = '<a class="vip-my-power" href="http://vip.taobao.com/new.htm" rel="nofollow" target="_top">\u65b0\u624b\u7279\u8bad\u8425\u8d2d\u7269\u5165\u95e8</a>'
            } else {
                if (V === 7) {
                    N = '<a class="vip-my-power" href="http://vip.taobao.com/vip_club.htm" rel="nofollow" target="_top">\u7acb\u523b\u6fc0\u6d3b\u6211\u7684\u8eab\u4efd</a>'
                } else {
                    N = '<a class="vip-my-power" href="http://vip.taobao.com/growth_info.htm" rel="nofollow" target="_top">\u67e5\u770b\u6211\u7684\u4f1a\u5458\u7279\u6743</a>'
                }
            }
            if (V === 0 || V === -1) {
                R = '<a class="vip-my-service" href="http://vip.taobao.com/newuser/newGift.htm" rel="nofollow" target="_top">\u5feb\u53bb\u9886\u65b0\u4eba\u793c\u91d1!</a>'
            } else {
                if (V > 2 && V < 7) {
                    R = '<a class="vip-my-service" href="http://service.taobao.com/support/minerva/robot_main.htm?dcs=2&sourceId=400&businessId=100&moduleGroupId=taobaocrm" rel="nofollow" target="_top">\u6211\u7684\u5ba2\u670d</a>'
                } else {
                    R = '<a class="vip-my-service" href="http://vip.taobao.com/growth_info.htm" rel="nofollow" target="_top">\u6211\u7684\u6210\u957f</a>'
                }
            }
            if (g.indexOf(V, [0, 1, 2, 3, 4, 5, 6, 7]) > -1) {
                Q = '<span class="vip-areas user" id="J_Vip_Areas"><span class="vip-head"><a class="user-nick" href="' + U + '" target="_top">' + a(unescape(i.replace(/\\u/g, "%u"))) + '</a><a class="vip-icon' + V + '" id="J_VipIcon" rel="nofollow" target="_top" href="http://vip.taobao.com/"></a><b></b></span><span class="vip-content" id="J_VipContent"><a href="http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739" class="avatar"><img src="http://wwc.taobaocdn.com/avatar/getAvatar.do?userNick=' + T(a(unescape(i.replace(/\\u/g, "%u")))).toLowerCase() + '&width=80&height=80&type=sns" width="80" height="80"/></a><span class="vip-operate"><a href="http://member1.taobao.com/member/fresh/account_security.htm" target="_top">\u5e10\u53f7\u7ba1\u7406</a><a target="_top" href="' + P + '" id="J_Logout">\u9000\u51fa</a></span><span class="vip-my-level"><a class="vip-my-level' + V + '" target="_top" href="http://vip.taobao.com/growth_info.htm" rel="nofollow" target="_top"></a></span>' + N + R + '<span class="vip-medal vip-loading" id="J_VipMedal"><span class="vip-medalgroup"><span class="vip-medal-content" id="J_VipMedalContent"></span></span><span class="vip-step"><a href="javascript:;" target="_self" class="vip-stepleft"><s class="arrow arrow-lthin"><s></s></s></a><a href="javascript:;" target="_self" class="vip-stepright"><s class="arrow arrow-rthin"><s></s></s></a></span></span></span></span>'
            } else {
                Q = '<span class="vip-areas user user-special" id="J_Vip_Areas"><span class="vip-head vip-head-special"><a class="user-nick" href="' + U + '" target="_top">' + a(unescape(i.replace(/\\u/g, "%u"))) + '</a><b></b></span><span class="vip-content vip-content-special" id="J_VipContent"><a href="http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739" class="avatar"><img src="http://wwc.taobaocdn.com/avatar/getAvatar.do?userNick=' + encodeURIComponent(i) + '&width=80&height=80&type=sns" width="80" height="80"/></a><span class="vip-operate"><a href="http://member1.taobao.com/member/fresh/account_security.htm" target="_top">\u5e10\u53f7\u7ba1\u7406</a><a target="_top" href="' + P + '" id="J_Logout">\u9000\u51fa</a></span>' + N + R + '<span class="vip-medal vip-loading" id="J_VipMedal"><span class="vip-medalgroup"><span class="vip-medal-content" id="J_VipMedalContent"></span></span><span class="vip-step"><a href="javascript:;" target="_self" class="vip-stepleft"><s class="arrow arrow-lthin"><s></s></s></a><a href="javascript:;" target="_self" class="vip-stepright"><s class="arrow arrow-rthin"><s></s></s></a></span></span></span></span>'
            }
            function T(Y) {
                var X = document.createElement("img");
                function W(Z) {
                    if (!Z) {
                        return ""
                    }
                    if (window.ActiveXObject) {
                        execScript('SetLocale "zh-cn"', "vbscript");
                        return Z.replace(/[\d\D]/g, function(aa) {
                            window.vbsval = "";
                            execScript('window.vbsval=Hex(Asc("' + aa + '"))', "vbscript");
                            return "%" + window.vbsval.slice(0, 2) + "%" + window.vbsval.slice(-2)
                        })
                    }
                    X.src = "http://www.atpanel.com/jsclick?globaljs=1&separator=" + Z;
                    return X.src.split("&separator=").pop()
                }
                return Y.replace(/([^\x00-\xff]+)|([\x00-\xff]+)/g, function(aa, Z, ab) {
                    return W(Z) + encodeURIComponent(ab || "")
                })
            }
            return Q
        },isLogin: function() {
            var N = h("tracknick"), i = h("_nk_") || N;
            return !!(h("_l_g_") && i || h("ck1") && N)
        },getCartElem: function() {
            return d && z("cart", "li", d)[0]
        },initMiniCart: function() {
            var U = this;
            if (U._OFF = (U._OFF || !!!U.getCartElem())) {
                return
            }
            var i = n(h("mt")), V = i && i.ci ? i.ci.split("_") : [undefined, undefined], S = parseInt(V[0], 10), O = parseInt(V[1], 10), R = i ? i.cp : undefined, Q = U.isLogin(), P = "http://cart" + y + "/top_cart_quantity.htm?", N = "http://count." + (J ? "config-vip.taobao.net:8888" : "tbcdn.cn") + "/counter6";
            request = function(W) {
                W = W || 0;
                if (W) {
                    var X = {keys: "TCART_234_" + W + "_q",t: g.now()};
                    g.jsonp(N, X, function(Z) {
                        if (Z) {
                            var Y = O >= 0 ? O : (Q ? 1 : 0);
                            TB.Global.setCartNum(Z[X.keys]);
                            t("mt", "ci=" + Z[X.keys] + "_" + Y + (R ? "&" + R : ""), 7, y)
                        } else {
                            if (Q) {
                                request()
                            }
                        }
                    })
                } else {
                    g.getScript(P + "callback=TB.Global.setCartNum&t=" + g.now() + (s ? "&appid=" + s : f))
                }
            };
            U._OFF = V < 0;
            if (Q) {
                if (i) {
                    if (O == 1) {
                        TB.Global.setCartNum(S)
                    } else {
                        request()
                    }
                } else {
                    request(h("unb"))
                }
            } else {
                var T = h("t");
                if (T) {
                    if (S >= 0) {
                        TB.Global.setCartNum(S)
                    } else {
                        request(T)
                    }
                } else {
                    TB.Global.setCartNum(0)
                }
            }
        },setCartNum: function(O) {
            if (!g.isNumber(O) || TB.Global._OFF) {
                return
            }
            var N = TB.Global.getCartElem();
            if (!N) {
                return
            }
            var P = N.getElementsByTagName("a")[0], Q = '<span class="mini-cart-line"></span><s></s>\u8d2d\u7269\u8f66', i = s !== 19;
            if (O < 0) {
                TB.Global._OFF = O === -1;
                P.innerHTML = Q;
                w(N, M);
                I.MiniCart && I.MiniCart.hide();
                return
            }
            P.innerHTML = Q + '<span class="mc-count' + (O < 10 ? " mc-pt3" : f) + '">' + O + "</span>\u4ef6" + (i ? "<b></b>" : f);
            P.href = "http://ju.mmstat.com/?url=http://cart.taobao.com/my_cart.htm?from=mini&ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739";
            D(N, M);
            if (!i) {
                D(N, o)
            }
            D(N, "menu");
            D(P, "menu-hd");
            P.id = "mc-menu-hd";
            if (I.MiniCart) {
                I.MiniCart.cartNum = O;
                I.MiniCart.isExpired = true
            } else {
                g.ready(function() {
                    var R = 0;
                    g.getScript("http://" + H + "/apps/cart/mini/minicart-min.js?t=20130328.js", function() {
                        if (g.DOM) {
                            if (I.MiniCart) {
                                I.MiniCart.init(O, i)
                            }
                        } else {
                            if (R < 10) {
                                setTimeout(arguments.callee, 1000);
                                R++
                            } else {
                                g.use("core", function() {
                                    I.MiniCart.init(O, i)
                                })
                            }
                        }
                    })
                })
            }
        },run: function(i) {
            var N = this;
            N.initMiniCart();
            if (N.isLogin()) {
                var O = 0;
                g.later(function() {
                    var Q = j.getElementById("J_Logout");
                    if (!Q) {
                        if (O < 20) {
                            setTimeout(arguments.callee, 20);
                            O++
                        }
                        return
                    }
                    var P = N.showVIP(A || "");
                    if (P.length < 1) {
                        return
                    }
                    var R = j.createElement("div");
                    R.innerHTML = P;
                    Q.parentNode.insertBefore(R.firstChild, Q);
                    N._addMenu(R.firstChild)
                }, 30)
            }
        },setUserMsg: function(P) {
            if (P.success && P.success === "true") {
                var O = g.DOM;
                if (!O) {
                    return
                }
                var R = O.get(".login-info", d), Q = O.offset(R), N = O.get("#gb-msg-notice"), i;
                if (!N) {
                    N = O.create('<div id="gb-msg-notice"><div class="gb-msg-inner gb-msg-info"><p class="gb-msg-content">' + P.result["messages"][0] + '</p><div class="gb-msg-icon gb-msg-close" title="\u5173\u95ed"></div></div><div class="gb-msg-icon gb-msg-tri"><div class="gb-msg-icon gb-msg-tri-inner"></div></div></div>');
                    O.append(N, d.parentNode);
                    O.offset(N, {left: Q.left + 30,top: Q.top + O.height(R) + 1});
                    g.Event.on(N, "click", function(T) {
                        var S = T.target;
                        if (O.hasClass(S, "gb-msg-close")) {
                            O.hide(N)
                        }
                    })
                } else {
                    i = O.get(".gb-msg-content", N);
                    O.html(i, P.result["messages"][0]);
                    O.show(N)
                }
            }
        }};
    TB.Cart = g.merge({}, {domain: document.domain.indexOf("taobao.net") > -1 ? "daily.taobao.net" : "taobao.com",API: "http://cart.%domain%/check_cart_login.htm",cache: {},popup: null,redirect: function(Q, P) {
            var O = g.makeArray(arguments);
            var R = arguments.callee;
            var i = this;
            if (P.indexOf("ct=") === -1 && h("t")) {
                P = P + (P.indexOf("?") === -1 ? "?" : "&") + "ct=" + h("t")
            }
            if (!g.DOM || !g.Event) {
                g.getScript("http://a.tbcdn.cn/s/kissy/1.1.6/packages/core-min.js", function() {
                    R.apply(i, O)
                });
                return
            }
            this._addStyleSheetOnce();
            var N = g.guid();
            this.cache[N] = g.makeArray(arguments);
            g.getScript(this.API.replace("%domain%", this.domain) + "?callback=TB.Cart.redirectCallback&guid=" + N, {timeout: 4000,error: function() {
                    window.top.location.href = P
                }})
        },redirectCallback: function(O) {
            var N = O.guid;
            var i = g.trim(this.cache[N][1]);
            if (!O.needLogin) {
                window.top.location.href = i;
                return
            }
            if (!N) {
                throw Error("[error] guid not found in callback data")
            }
            if (!this.popup) {
                this.popup = this._initPopup()
            }
            this._initLoginIframe(i)
        },hidePopup: function(i) {
            i && i.preventDefault && i.preventDefault();
            g.DOM.css(this.popup, "visibility", "hidden")
        },showPopup: function() {
            this._centerPopup();
            g.DOM.css(this.popup, "visibility", "visible")
        },_centerPopup: function() {
            var i = (g.DOM.viewportHeight() - parseInt(g.DOM.css(this.popup, "height"), 10)) / 2;
            i = i < 0 ? 0 : i;
            g.DOM.css(this.popup, "top", i)
        },_addStyleSheetOnce: function() {
            if (!this._stylesheetAdded) {
                g.DOM.addStyleSheet("#g-cartlogin{position:fixed;_position:absolute;border:1px solid #aaa;left:50%;top:120px;margin-left:-206px;width:412px;height:272px;z-index:100000000;background:#fafafa;-moz-box-shadow:rgba(0,0,0,0.2) 3px 3px 3px;-webkit-box-shadow:3px 3px 3px rgba(0,0,0,0.2);filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=3,OffY=3,Color=#16000000,Positive=true);} #g_minicart_login_close{position:absolute;right:5px;top:5px;width:17px;height:17px;background:url(http://img01.taobaocdn.com/tps/i1/T1krl0Xk8zXXXXXXXX-194-382.png) no-repeat -100px -69px;text-indent:-999em;overflow:hidden;}#g-cartlogin-close{cursor:pointer;position:absolute;right:5px;top:5px;width:17px;height:17px;line-height:0;overflow:hidden;background:url(http://img03.taobaocdn.com/tps/i1/T1k.tYXadGXXXXXXXX-146-77.png) no-repeat -132px 0;text-indent:-999em;}");
                this._stylesheetAdded = true
            }
        },_initPopup: function() {
            var i = g.DOM.create('<div id="g-cartlogin"></div>');
            g.DOM.append(i, g.DOM.get("body"));
            return i
        },_initLoginIframe: function(i) {
            var N = "https://login." + this.domain + "/member/login.jhtml?from=globalcart&style=mini&redirectURL=" + encodeURIComponent(i) + "&full_redirect=true";
            this.popup.innerHTML = '<iframe src="' + N + '" width="410" height="270" frameborder="0" scrolling="0"></iframe><span title="\u5173\u95ed" id="g-cartlogin-close">\u5173\u95ed</span>';
            g.Event.on("#g-cartlogin-close", "click", this.hidePopup, this);
            this.showPopup()
        }});
    function e(i) {
        return (typeof i == "string") && i !== ""
    }
    function h(N) {
        if (I.userCookie && !g.isUndefined(I.userCookie[N])) {
            return I.userCookie[N]
        }
        if (g.isUndefined(r[N])) {
            var i = j.cookie.match("(?:^|;)\\s*" + N + "=([^;]*)");
            r[N] = (i && i[1]) ? decodeURIComponent(i[1]) : f
        }
        return r[N]
    }
    function t(O, T, i, P, R, Q) {
        var S = String(T), N = i;
        if (typeof N === "number") {
            N = new Date();
            N.setTime(N.getTime() + i * 24 * 60 * 60 * 1000)
        }
        if (N instanceof Date) {
            S += "; expires=" + N.toUTCString()
        }
        if (e(P)) {
            S += "; domain=" + P
        }
        if (e(R)) {
            S += "; path=" + R
        }
        if (Q) {
            S += "; secure"
        }
        j.cookie = O + "=" + S
    }
    function a(N) {
        var O = j.createElement("div"), i = j.createTextNode(N);
        O.appendChild(i);
        return O.innerHTML
    }
    function z(V, W, N) {
        var P = N.getElementsByTagName(W || "*"), T = [], R = 0, Q = 0, S = P.length, O, U;
        V = b + V + b;
        for (; R < S; ++R) {
            O = P[R];
            U = O.className;
            if (U && (b + U + b).indexOf(V) > -1) {
                T[Q++] = O
            }
        }
        return T
    }
    function m(P, O, N, i) {
        if (!P) {
            return
        }
        if (P.addEventListener) {
            P.addEventListener(O, N, !!i)
        } else {
            if (P.attachEvent) {
                P.attachEvent("on" + O, N)
            }
        }
    }
    function c(P, O, N, i) {
        if (!P) {
            return
        }
        if (P.removeEventListener) {
            P.removeEventListener(O, N, !!i)
        } else {
            if (P.detachEvent) {
                P.detachEvent("on" + O, N)
            }
        }
    }
    function D(O, i) {
        var N = b + O.className + b;
        if (N.indexOf(b + i + b) === -1) {
            N += i;
            O.className = g.trim(N)
        }
    }
    function w(O, i) {
        var N = b + O.className + b;
        if (N.indexOf(b + i + b) !== -1) {
            N = N.replace(b + i + b, b);
            O.className = g.trim(N)
        }
    }
    function n(i) {
        if (I.userCookie && I.userCookie.version == "2") {
            return g.unparam(i, "&amp;")
        }
        return g.unparam(i)
    }
    function F(i) {
        if (i.preventDefault) {
            i.preventDefault()
        } else {
            i.returnValue = false
        }
    }
})();
