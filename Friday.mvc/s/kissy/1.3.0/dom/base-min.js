﻿/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Jan 29 20:38
*/
KISSY.add("dom/base/api", function (c) {
    var b = c.Env.host,
		i = c.UA,
		p = {
		    ELEMENT_NODE: 1,
		    ATTRIBUTE_NODE: 2,
		    TEXT_NODE: 3,
		    CDATA_SECTION_NODE: 4,
		    ENTITY_REFERENCE_NODE: 5,
		    ENTITY_NODE: 6,
		    PROCESSING_INSTRUCTION_NODE: 7,
		    COMMENT_NODE: 8,
		    DOCUMENT_NODE: 9,
		    DOCUMENT_TYPE_NODE: 10,
		    DOCUMENT_FRAGMENT_NODE: 11,
		    NOTATION_NODE: 12
		}, j = {
		    isCustomDomain: function (c) {
		        var c = c || b,
					i = c.document.domain,
					c = c.location.hostname;
		        return i != c && i != "[" + c + "]"
		    },
		    getEmptyIframeSrc: function (c) {
		        c = c || b;
		        return i.ie && j.isCustomDomain(c) ? "javascript:void(function(){" + encodeURIComponent("document.open();document.domain='" + c.document.domain + "';document.close();") + "}())" : ""
		    },
		    NodeType: p,
		    getWindow: function (c) {
		        return !c ? b : "scrollTo" in c && c.document ? c : c.nodeType == p.DOCUMENT_NODE ? c.defaultView || c.parentWindow : !1
		    },
		    _isNodeList: function (b) {
		        return b && !b.nodeType && b.item && !b.setTimeout
		    },
		    nodeName: function (b) {
		        var c = j.get(b),
					b = c.nodeName.toLowerCase();
		        i.ie && (c = c.scopeName) && "HTML" != c && (b = c.toLowerCase() + ":" + b);
		        return b
		    },
		    _RE_NUM_NO_PX: RegExp("^(" + /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source +
				")(?!px)[a-z%]+$", "i")
		};
    c.mix(j, p);
    return j
});
KISSY.add("dom/base/attr", function (c, b, i) {
    function p(b, d) {
        var d = y[d] || d,
			a = z[d];
        return a && a.get ? a.get(b, d) : b[d]
    }
    var j = c.Env.host.document,
		m = b.NodeType,
		t = (j = j && j.documentElement) && j.textContent === i ? "innerText" : "textContent",
		k = b.nodeName,
		e = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
		g = /^(?:button|input|object|select|textarea)$/i,
		s = /^a(?:rea)?$/i,
		d = /:|^on/,
		a = /\r/g,
		r = {}, f = {
		    val: 1,
		    css: 1,
		    html: 1,
		    text: 1,
		    data: 1,
		    width: 1,
		    height: 1,
		    offset: 1,
		    scrollTop: 1,
		    scrollLeft: 1
		}, x = {
		    tabindex: {
		        get: function (b) {
		            var d = b.getAttributeNode("tabindex");
		            return d && d.specified ? parseInt(d.value, 10) : g.test(b.nodeName) || s.test(b.nodeName) && b.href ? 0 : i
		        }
		    }
		}, y = {
		    hidefocus: "hideFocus",
		    tabindex: "tabIndex",
		    readonly: "readOnly",
		    "for": "htmlFor",
		    "class": "className",
		    maxlength: "maxLength",
		    cellspacing: "cellSpacing",
		    cellpadding: "cellPadding",
		    rowspan: "rowSpan",
		    colspan: "colSpan",
		    usemap: "useMap",
		    frameborder: "frameBorder",
		    contenteditable: "contentEditable"
		}, B = {
		    get: function (d,
			a) {
		        return b.prop(d, a) ? a.toLowerCase() : i
		    },
		    set: function (d, a, c) {
		        !1 === a ? b.removeAttr(d, c) : (a = y[c] || c, a in d && (d[a] = !0), d.setAttribute(c, c.toLowerCase()));
		        return c
		    }
		}, z = {}, w = {}, C = {
		    select: {
		        get: function (d) {
		            var a = d.selectedIndex,
						c = d.options,
						h;
		            if (0 > a) return null;
		            if ("select-one" === d.type) return b.val(c[a]);
		            d = [];
		            a = 0;
		            for (h = c.length; a < h; ++a) c[a].selected && d.push(b.val(c[a]));
		            return d
		        },
		        set: function (d, a) {
		            var f = c.makeArray(a);
		            c.each(d.options, function (h) {
		                h.selected = c.inArray(b.val(h), f)
		            });
		            f.length || (d.selectedIndex = -1);
		            return f
		        }
		    }
		};
    c.each(["radio", "checkbox"], function (d) {
        C[d] = {
            get: function (b) {
                return null === b.getAttribute("value") ? "on" : b.value
            },
            set: function (d, a) {
                if (c.isArray(a)) return d.checked = c.inArray(b.val(d), a)
            }
        }
    });
    x.style = {
        get: function (b) {
            return b.style.cssText
        }
    };
    c.mix(b, {
        _valHooks: C,
        _propFix: y,
        _attrHooks: x,
        _propHooks: z,
        _attrNodeHook: w,
        _attrFix: r,
        prop: function (d, a, f) {
            var h = b.query(d),
				l, n;
            if (c.isPlainObject(a)) return c.each(a, function (d, l) {
                b.prop(h, l, d)
            }), i;
            a = y[a] || a;
            n = z[a];
            if (f !== i) for (d = h.length - 1; 0 <= d; d--) l = h[d], n && n.set ? n.set(l, f, a) : l[a] = f;
            else if (h.length) return p(h[0], a);
            return i
        },
        hasProp: function (d, a) {
            var c = b.query(d),
				h, l = c.length,
				n;
            for (h = 0; h < l; h++) if (n = c[h], p(n, a) !== i) return !0;
            return !1
        },
        removeProp: function (d, a) {
            var a = y[a] || a,
				c = b.query(d),
				h, l;
            for (h = c.length - 1; 0 <= h; h--) {
                l = c[h];
                try {
                    l[a] = i, delete l[a]
                } catch (n) { }
            }
        },
        attr: function (a, g, A, h) {
            var l = b.query(a),
				n = l[0];
            if (c.isPlainObject(g)) {
                var h = A,
					u;
                for (u in g) b.attr(l, u, g[u], h);
                return i
            }
            if (!(g = c.trim(g))) return i;
            if (h && f[g]) return b[g](a, A);
            g = g.toLowerCase();
            if (h && f[g]) return b[g](a, A);
            g = r[g] || g;
            a = e.test(g) ? B : d.test(g) ? w : x[g];
            if (A === i) {
                if (n && n.nodeType === m.ELEMENT_NODE) {
                    "form" == k(n) && (a = w);
                    if (a && a.get) return a.get(n, g);
                    g = n.getAttribute(g);
                    return null === g ? i : g
                }
            } else for (h = l.length - 1; 0 <= h; h--) if ((n = l[h]) && n.nodeType === m.ELEMENT_NODE) "form" == k(n) && (a = w), a && a.set ? a.set(n, A, g) : n.setAttribute(g, "" + A);
            return i
        },
        removeAttr: function (a, d) {
            var d = d.toLowerCase(),
				d = r[d] || d,
				c = b.query(a),
				h, l, n;
            for (n = c.length - 1; 0 <= n; n--) if (l = c[n], l.nodeType == m.ELEMENT_NODE && (l.removeAttribute(d),
			e.test(d) && (h = y[d] || d) in l)) l[h] = !1
        },
        hasAttr: j && !j.hasAttribute ? function (a, d) {
            var d = d.toLowerCase(),
				c = b.query(a),
				h, l;
            for (h = 0; h < c.length; h++) if (l = c[h], (l = l.getAttributeNode(d)) && l.specified) return !0;
            return !1
        } : function (d, a) {
            var c = b.query(d),
				h, l = c.length;
            for (h = 0; h < l; h++) if (c[h].hasAttribute(a)) return !0;
            return !1
        },
        val: function (d, g) {
            var f, h, l, n, u;
            if (g === i) {
                if (l = b.get(d)) {
                    if ((f = C[k(l)] || C[l.type]) && "get" in f && (h = f.get(l, "value")) !== i) return h;
                    h = l.value;
                    return "string" === typeof h ? h.replace(a, "") : null == h ? "" : h
                }
                return i
            }
            h = b.query(d);
            for (n = h.length - 1; 0 <= n; n--) {
                l = h[n];
                if (1 !== l.nodeType) break;
                u = g;
                null == u ? u = "" : "number" === typeof u ? u += "" : c.isArray(u) && (u = c.map(u, function (b) {
                    return b == null ? "" : b + ""
                }));
                f = C[k(l)] || C[l.type];
                if (!f || !("set" in f) || f.set(l, u, "value") === i) l.value = u
            }
            return i
        },
        text: function (d, a) {
            var c, h, l;
            if (a === i) {
                c = b.get(d);
                if (c.nodeType == m.ELEMENT_NODE) return c[t] || "";
                if (c.nodeType == m.TEXT_NODE) return c.nodeValue
            } else {
                h = b.query(d);
                for (l = h.length - 1; 0 <= l; l--) c = h[l], c.nodeType == m.ELEMENT_NODE ? c[t] = a : c.nodeType == m.TEXT_NODE && (c.nodeValue = a)
            }
            return i
        }
    });
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base", function (c, b) {
    c.mix(c, {
        DOM: b,
        get: b.get,
        query: b.query
    });
    return b
}, {
    requires: "./base/api,./base/attr,./base/class,./base/create,./base/data,./base/insertion,./base/offset,./base/style,./base/selector,./base/traversal".split(",")
});
KISSY.add("dom/base/class", function (c, b, i) {
    function p(k, e, g, s) {
        if (!(e = c.trim(e))) return s ? !1 : i;
        var k = b.query(k),
			d = k.length,
			a = e.split(m),
			e = [],
			r, f;
        for (f = 0; f < a.length; f++) (r = c.trim(a[f])) && e.push(r);
        for (f = 0; f < d; f++) if (a = k[f], a.nodeType == j.ELEMENT_NODE && (a = g(a, e, e.length), a !== i)) return a;
        return s ? !1 : i
    }
    var j = b.NodeType,
		m = /[\.\s]\s*\.?/,
		t = /[\n\t]/g;
    c.mix(b, {
        hasClass: function (b, c) {
            return p(b, c, function (b, c, d) {
                var b = b.className,
					a, r;
                if (b) {
                    b = (" " + b + " ").replace(t, " ");
                    a = 0;
                    for (r = !0; a < d; a++) if (0 > b.indexOf(" " + c[a] + " ")) {
                        r = !1;
                        break
                    }
                    if (r) return !0
                }
            }, !0)
        },
        addClass: function (b, e) {
            p(b, e, function (b, i, d) {
                var a = b.className,
					r, f;
                if (a) {
                    r = (" " + a + " ").replace(t, " ");
                    for (f = 0; f < d; f++) 0 > r.indexOf(" " + i[f] + " ") && (a += " " + i[f]);
                    b.className = c.trim(a)
                } else b.className = e
            }, i)
        },
        removeClass: function (b, e) {
            p(b, e, function (b, i, d) {
                var a = b.className,
					r, f;
                if (a) if (d) {
                    a = (" " + a + " ").replace(t, " ");
                    for (r = 0; r < d; r++) for (f = " " + i[r] + " "; 0 <= a.indexOf(f); ) a = a.replace(f, " ");
                    b.className = c.trim(a)
                } else b.className = ""
            }, i)
        },
        replaceClass: function (c, i,
		g) {
            b.removeClass(c, i);
            b.addClass(c, g)
        },
        toggleClass: function (k, e, g) {
            var j = c.isBoolean(g),
				d, a;
            p(k, e, function (c, f, i) {
                for (a = 0; a < i; a++) e = f[a], d = j ? !g : b.hasClass(c, e), b[d ? "removeClass" : "addClass"](c, e)
            }, i)
        }
    });
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base/create", function (c, b, i) {
    function p(h) {
        var d = c.require("event/dom");
        d && d.detach(h);
        b.removeData(h)
    }
    function j(b, l) {
        var c = l && l != e ? l.createElement(d) : a;
        c.innerHTML = "m<div>" + b + "</div>";
        return c.lastChild
    }
    function m(b, d, a) {
        var c = d.nodeType;
        if (c == g.DOCUMENT_FRAGMENT_NODE) {
            d = d.childNodes;
            a = a.childNodes;
            for (c = 0; d[c]; ) a[c] && m(b, d[c], a[c]), c++
        } else if (c == g.ELEMENT_NODE) {
            d = d.getElementsByTagName("*");
            a = a.getElementsByTagName("*");
            for (c = 0; d[c]; ) a[c] && b(d[c], a[c]), c++
        }
    }
    function t(h, d) {
        var a = c.require("event/dom"),
			f, o;
        if (d.nodeType != g.ELEMENT_NODE || b.hasData(h)) {
            f = b.data(h);
            for (o in f) b.data(d, o, f[o]);
            a && (a._DOMUtils.removeData(d), a._clone(h, d))
        }
    }
    function k(b) {
        var d = null,
			a, f;
        if (b && (b.push || b.item) && b[0]) {
            d = b[0].ownerDocument;
            d = d.createDocumentFragment();
            b = c.makeArray(b);
            a = 0;
            for (f = b.length; a < f; a++) d.appendChild(b[a])
        }
        return d
    }
    var e = c.Env.host.document,
		g = b.NodeType,
		s = c.UA.ie,
		d = "div",
		a = e && e.createElement(d),
		r = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,
		f = /<([\w:]+)/,
		x = /^\s+/,
		y = s && 9 > s,
		B = /<|&#?\w+;/,
		z = e && "outerHTML" in e.documentElement,
		w = /^<(\w+)\s*\/?>(?:<\/\1>)?$/;
    c.mix(b, {
        create: function (h, a, n, u) {
            var o = null;
            if (!h) return o;
            if (h.nodeType) return b.clone(h);
            if ("string" != typeof h) return o;
            u === i && (u = !0);
            u && (h = c.trim(h));
            var u = b._creators,
				q, v, n = n || e,
				F, G = d;
            if (B.test(h)) if (F = w.exec(h)) o = n.createElement(F[1]);
            else {
                h = h.replace(r, "<$1></$2>");
                if ((F = f.exec(h)) && (q = F[1])) G = q.toLowerCase();
                q = (u[G] || j)(h, n);
                y && (v = h.match(x)) && q.insertBefore(n.createTextNode(v[0]), q.firstChild);
                h = q.childNodes;
                1 === h.length ? o = h[0].parentNode.removeChild(h[0]) : h.length && (o = k(h))
            } else o = n.createTextNode(h);
            c.isPlainObject(a) && (o.nodeType == g.ELEMENT_NODE ? b.attr(o, a, !0) : o.nodeType == g.DOCUMENT_FRAGMENT_NODE && b.attr(o.childNodes, a, !0));
            return o
        },
        _fixCloneAttributes: null,
        _creators: {
            div: j
        },
        _defaultCreator: j,
        html: function (d, a, c, r) {
            var d = b.query(d),
				o = d[0],
				q = !1,
				v, e;
            if (o) {
                if (a === i) return o.nodeType == g.ELEMENT_NODE ? o.innerHTML : null;
                a += "";
                if (!a.match(/<(?:script|style|link)/i) && (!y || !a.match(x)) && !D[(a.match(f) || ["", ""])[1].toLowerCase()]) try {
                    for (v = d.length - 1; 0 <= v; v--) e = d[v], e.nodeType == g.ELEMENT_NODE && (p(e.getElementsByTagName("*")), e.innerHTML = a);
                    q = !0
                } catch (k) { }
                q || (a = b.create(a, 0, o.ownerDocument, 0), b.empty(d), b.append(a, d, c));
                r && r()
            }
        },
        outerHTML: function (h, c, n) {
            var f = b.query(h),
				o = f.length;
            if (h = f[0]) {
                if (c === i) {
                    if (z) return h.outerHTML;
                    c = (c = h.ownerDocument) && c != e ? c.createElement(d) : a;
                    c.innerHTML = "";
                    c.appendChild(b.clone(h, !0));
                    return c.innerHTML
                }
                c += "";
                if (!c.match(/<(?:script|style|link)/i) && z) for (n = o - 1; 0 <= n; n--) h = f[n], h.nodeType == g.ELEMENT_NODE && (p(h), p(h.getElementsByTagName("*")), h.outerHTML = c);
                else h = b.create(c, 0, h.ownerDocument, 0), b.insertBefore(h, f, n), b.remove(f)
            }
        },
        remove: function (d, a) {
            var c, f = b.query(d),
				o, q;
            for (q = f.length - 1; 0 <= q; q--) c = f[q], !a && c.nodeType == g.ELEMENT_NODE && (o = c.getElementsByTagName("*"), p(o), p(c)), c.parentNode && c.parentNode.removeChild(c)
        },
        clone: function (d, a, c, f) {
            "object" === typeof a && (f = a.deepWithDataAndEvent, c = a.withDataAndEvent, a = a.deep);
            var d = b.get(d),
				o, q = b._fixCloneAttributes,
				v;
            if (!d) return null;
            v = d.nodeType;
            o = d.cloneNode(a);
            if (v == g.ELEMENT_NODE || v == g.DOCUMENT_FRAGMENT_NODE) q && v == g.ELEMENT_NODE && q(d, o), a && q && m(q, d, o);
            c && (t(d, o), a && f && m(t, d, o));
            return o
        },
        empty: function (d) {
            var d = b.query(d),
				a, c;
            for (c = d.length - 1; 0 <= c; c--) a = d[c], b.remove(a.childNodes)
        },
        _nodeListToFragment: k
    });
    var C = b._creators,
		E = b.create,
		D = {
		    option: "select",
		    optgroup: "select",
		    area: "map",
		    thead: "table",
		    td: "tr",
		    th: "tr",
		    tr: "tbody",
		    tbody: "table",
		    tfoot: "table",
		    caption: "table",
		    colgroup: "table",
		    col: "colgroup",
		    legend: "fieldset"
		},
		A;
    for (A in D) (function (b) {
        C[A] = function (d, a) {
            return E("<" + b + ">" + d + "</" + b + ">", null, a)
        }
    })(D[A]);
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base/data", function (c, b, i) {
    var p = c.Env.host,
		j = "__ks_data_" + c.now(),
		m = {}, t = {}, k = {
		    applet: 1,
		    object: 1,
		    embed: 1
		}, e = {
		    hasData: function (b, a) {
		        if (b) if (a !== i) {
		            if (a in b) return !0
		        } else if (!c.isEmptyObject(b)) return !0;
		        return !1
		    }
		}, g = {
		    hasData: function (b, a) {
		        return b == p ? g.hasData(t, a) : e.hasData(b[j], a)
		    },
		    data: function (b, a, c) {
		        if (b == p) return g.data(t, a, c);
		        var f = b[j];
		        if (c !== i) f = b[j] = b[j] || {}, f[a] = c;
		        else return a !== i ? f && f[a] : f = b[j] = b[j] || {}
		    },
		    removeData: function (b, a) {
		        if (b == p) return g.removeData(t, a);
		        var e = b[j];
		        if (a !== i) delete e[a], c.isEmptyObject(e) && g.removeData(b);
		        else try {
		            delete b[j]
		        } catch (f) {
		            b[j] = i
		        }
		    }
		}, s = {
		    hasData: function (b, a) {
		        var c = b[j];
		        return !c ? !1 : e.hasData(m[c], a)
		    },
		    data: function (b, a, g) {
		        if (k[b.nodeName.toLowerCase()]) return i;
		        var f = b[j];
		        if (!f) {
		            if (a !== i && g === i) return i;
		            f = b[j] = c.guid()
		        }
		        b = m[f];
		        if (g !== i) b = m[f] = m[f] || {}, b[a] = g;
		        else return a !== i ? b && b[a] : b = m[f] = m[f] || {}
		    },
		    removeData: function (b, a) {
		        var g = b[j],
					f;
		        if (g) if (f = m[g], a !== i) delete f[a], c.isEmptyObject(f) && s.removeData(b);
		        else {
		            delete m[g];
		            try {
		                delete b[j]
		            } catch (e) {
		                b[j] = i
		            }
		            b.removeAttribute && b.removeAttribute(j)
		        }
		    }
		};
    c.mix(b, {
        __EXPANDO: j,
        hasData: function (d, a) {
            for (var c = !1, f = b.query(d), i = 0; i < f.length && !(c = f[i], c = c.nodeType ? s.hasData(c, a) : g.hasData(c, a)); i++);
            return c
        },
        data: function (d, a, e) {
            var d = b.query(d),
				f = d[0];
            if (c.isPlainObject(a)) {
                for (var k in a) b.data(d, k, a[k]);
                return i
            }
            if (e === i) {
                if (f) return f.nodeType ? s.data(f, a) : g.data(f, a)
            } else for (k = d.length - 1; 0 <= k; k--) f = d[k], f.nodeType ? s.data(f, a, e) : g.data(f, a, e);
            return i
        },
        removeData: function (c, a) {
            var i = b.query(c),
				f, e;
            for (e = i.length - 1; 0 <= e; e--) f = i[e], f.nodeType ? s.removeData(f, a) : g.removeData(f, a)
        }
    });
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base/insertion", function (c, b) {
    function i(b, a) {
        var c = [],
			f, j, p;
        for (f = 0; b[f]; f++) if (j = b[f], p = k(j), j.nodeType == m.DOCUMENT_FRAGMENT_NODE) c.push.apply(c, i(e(j.childNodes), a));
        else if ("script" === p && (!j.type || s.test(j.type))) j.parentNode && j.parentNode.removeChild(j), a && a.push(j);
        else {
            if (j.nodeType == m.ELEMENT_NODE && !t.test(p)) {
                p = [];
                var B, z, w = j.getElementsByTagName("script");
                for (z = 0; z < w.length; z++) B = w[z], (!B.type || s.test(B.type)) && p.push(B);
                g.apply(b, [f + 1, 0].concat(p))
            }
            c.push(j)
        }
        return c
    }
    function p(b) {
        b.src ? c.getScript(b.src) : (b = c.trim(b.text || b.textContent || b.innerHTML || "")) && c.globalEval(b)
    }
    function j(d, a, g, f) {
        d = b.query(d);
        f && (f = []);
        d = i(d, f);
        b._fixInsertionChecked && b._fixInsertionChecked(d);
        var a = b.query(a),
			e, k, j, z, w = a.length;
        if ((d.length || f && f.length) && w) {
            d = b._nodeListToFragment(d);
            1 < w && (z = b.clone(d, !0), a = c.makeArray(a));
            for (e = 0; e < w; e++) k = a[e], d && (j = 0 < e ? b.clone(z, !0) : d, g(j, k)), f && f.length && c.each(f, p)
        }
    }
    var m = b.NodeType,
		t = /^(?:button|input|object|select|textarea)$/i,
		k = b.nodeName,
		e = c.makeArray,
		g = [].splice,
		s = /\/(java|ecma)script/i;
    c.mix(b, {
        _fixInsertionChecked: null,
        insertBefore: function (b, a, c) {
            j(b, a, function (b, a) {
                a.parentNode && a.parentNode.insertBefore(b, a)
            }, c)
        },
        insertAfter: function (b, a, c) {
            j(b, a, function (b, a) {
                a.parentNode && a.parentNode.insertBefore(b, a.nextSibling)
            }, c)
        },
        appendTo: function (b, a, c) {
            j(b, a, function (b, a) {
                a.appendChild(b)
            }, c)
        },
        prependTo: function (b, a, c) {
            j(b, a, function (b, a) {
                a.insertBefore(b, a.firstChild)
            }, c)
        },
        wrapAll: function (c, a) {
            a = b.clone(b.get(a), !0);
            c = b.query(c);
            c[0].parentNode && b.insertBefore(a,
			c[0]);
            for (var g;
			(g = a.firstChild) && 1 == g.nodeType; ) a = g;
            b.appendTo(c, a)
        },
        wrap: function (d, a) {
            d = b.query(d);
            a = b.get(a);
            c.each(d, function (c) {
                b.wrapAll(c, a)
            })
        },
        wrapInner: function (d, a) {
            d = b.query(d);
            a = b.get(a);
            c.each(d, function (c) {
                var d = c.childNodes;
                d.length ? b.wrapAll(d, a) : c.appendChild(a)
            })
        },
        unwrap: function (d) {
            d = b.query(d);
            c.each(d, function (a) {
                a = a.parentNode;
                b.replaceWith(a, a.childNodes)
            })
        },
        replaceWith: function (c, a) {
            var g = b.query(c),
				a = b.query(a);
            b.remove(a, !0);
            b.insertBefore(a, g);
            b.remove(g)
        }
    });
    c.each({
        prepend: "prependTo",
        append: "appendTo",
        before: "insertBefore",
        after: "insertAfter"
    }, function (c, a) {
        b[a] = b[c]
    });
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base/offset", function (c, b, i) {
    function p(b) {
        var a, c = b.ownerDocument.body;
        if (!b.getBoundingClientRect) return {
            left: 0,
            top: 0
        };
        a = b.getBoundingClientRect();
        b = a[r];
        a = a[f];
        b -= e.clientLeft || c.clientLeft || 0;
        a -= e.clientTop || c.clientTop || 0;
        return {
            left: b,
            top: a
        }
    }
    function j(c, d) {
        var f = {
            left: 0,
            top: 0
        }, e = g(c[a]),
			i, k = c,
			d = d || e;
        do {
            if (e == d) {
                var h = k;
                i = p(h);
                h = g(h[a]);
                i.left += b[y](h);
                i.top += b[B](h)
            } else i = p(k);
            f.left += i.left;
            f.top += i.top
        } while (e && e != d && (k = e.frameElement) && (e = e.parent));
        return f
    }
    var m = c.Env.host,
		t = m.document,
		k = b.NodeType,
		e = t && t.documentElement,
		g = b.getWindow,
		s = Math.max,
		d = parseInt,
		a = "ownerDocument",
		r = "left",
		f = "top",
		x = c.isNumber,
		y = "scrollLeft",
		B = "scrollTop";
    c.mix(b, {
        offset: function (a, c, f) {
            if (c === i) {
                var a = b.get(a),
					g;
                a && (g = j(a, f));
                return g
            }
            f = b.query(a);
            for (g = f.length - 1; 0 <= g; g--) {
                var a = f[g],
					e = c;
                "static" === b.css(a, "position") && (a.style.position = "relative");
                var k = j(a),
					h = {}, l = void 0,
					n = void 0;
                for (n in e) l = d(b.css(a, n), 10) || 0, h[n] = l + e[n] - k[n];
                b.css(a, h)
            }
            return i
        },
        scrollIntoView: function (a, e, j, p) {
            var s,
			m, h, l;
            if (h = b.get(a)) {
                e && (e = b.get(e));
                e || (e = h.ownerDocument);
                e.nodeType == k.DOCUMENT_NODE && (e = g(e));
                c.isPlainObject(j) && (p = j.allowHorizontalScroll, l = j.onlyScrollIfNeeded, j = j.alignWithTop);
                p = p === i ? !0 : p;
                m = !!g(e);
                var a = b.offset(h),
					n = b.outerHeight(h);
                s = b.outerWidth(h);
                var u, o, q, v;
                m ? (m = e, u = b.height(m), o = b.width(m), v = {
                    left: b.scrollLeft(m),
                    top: b.scrollTop(m)
                }, m = a[r] - v[r], h = a[f] - v[f], s = a[r] + s - (v[r] + o), a = a[f] + n - (v[f] + u)) : (u = b.offset(e), o = e.clientHeight, q = e.clientWidth, v = {
                    left: b.scrollLeft(e),
                    top: b.scrollTop(e)
                },
				m = a[r] - (u[r] + (d(b.css(e, "borderLeftWidth")) || 0)), h = a[f] - (u[f] + (d(b.css(e, "borderTopWidth")) || 0)), s = a[r] + s - (u[r] + q + (d(b.css(e, "borderRightWidth")) || 0)), a = a[f] + n - (u[f] + o + (d(b.css(e, "borderBottomWidth")) || 0)));
                if (l) {
                    if (0 > h || 0 < a) !0 === j ? b.scrollTop(e, v.top + h) : !1 === j ? b.scrollTop(e, v.top + a) : 0 > h ? b.scrollTop(e, v.top + h) : b.scrollTop(e, v.top + a)
                } else (j = j === i ? !0 : !!j) ? b.scrollTop(e, v.top + h) : b.scrollTop(e, v.top + a);
                if (p) if (l) {
                    if (0 > m || 0 < s) !0 === j ? b.scrollLeft(e, v.left + m) : !1 === j ? b.scrollLeft(e, v.left + s) : 0 > m ? b.scrollLeft(e,
					v.left + m) : b.scrollLeft(e, v.left + s)
                } else (j = j === i ? !0 : !!j) ? b.scrollLeft(e, v.left + m) : b.scrollLeft(e, v.left + s)
            }
        },
        docWidth: 0,
        docHeight: 0,
        viewportHeight: 0,
        viewportWidth: 0,
        scrollTop: 0,
        scrollLeft: 0
    });
    c.each(["Left", "Top"], function (a, c) {
        var d = "scroll" + a;
        b[d] = function (e, f) {
            if (x(e)) return arguments.callee(m, e);
            var e = b.get(e),
				j, h, l, n = g(e);
            n ? f !== i ? (f = parseFloat(f), h = "Left" == a ? f : b.scrollLeft(n), l = "Top" == a ? f : b.scrollTop(n), n.scrollTo(h, l)) : (j = n["page" + (c ? "Y" : "X") + "Offset"], x(j) || (h = n.document, j = h.documentElement[d],
			x(j) || (j = h.body[d]))) : e.nodeType == k.ELEMENT_NODE && (f !== i ? e[d] = parseFloat(f) : j = e[d]);
            return j
        }
    });
    c.each(["Width", "Height"], function (a) {
        b["doc" + a] = function (c) {
            c = b.get(c);
            c = g(c).document;
            return s(c.documentElement["scroll" + a], c.body["scroll" + a], b["viewport" + a](c))
        };
        b["viewport" + a] = function (c) {
            var c = b.get(c),
				d = "client" + a,
				c = g(c).document,
				e = c.body,
				f = c.documentElement[d];
            return "CSS1Compat" === c.compatMode && f || e && e[d] || f
        }
    });
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base/selector", function (c, b, i) {
    function p(b) {
        var a, c;
        for (c = 0; c < this.length && !(a = this[c], !1 === b(a, c)); c++);
    }
    function j(a, e) {
        var g, k, o = "string" == typeof a,
			q = e == i && (k = 1) ? [d] : j(e);
        a ? o ? (a = E(a), k && "body" == a ? g = [d.body] : 1 == q.length && a && (g = t(a, q[0]))) : k && (g = a.nodeType || a.setTimeout ? [a] : a.getDOMNodes ? a.getDOMNodes() : f(a) ? a : y(a) ? c.makeArray(a) : [a]) : g = [];
        if (!g && (g = [], a)) {
            for (k = 0; k < q.length; k++) z.apply(g, m(a, q[k]));
            1 < g.length && (1 < q.length || o && -1 < a.indexOf(C)) && b.unique(g)
        }
        g.each = p;
        return g
    }
    function m(b,
	a) {
        var d = "string" == typeof b;
        if (d && b.match(A) || !d) d = k(b, a);
        else if (d && -1 < b.replace(/"(?:(?:\\.)|[^"])*"/g, "").replace(/'(?:(?:\\.)|[^'])*'/g, "").indexOf(C)) {
            var d = [],
				e, o = b.split(/\s*,\s*/);
            for (e = 0; e < o.length; e++) z.apply(d, m(o[e], a))
        } else d = [], (e = c.require("sizzle")) && e(b, a, d);
        return d
    }
    function t(a, c) {
        var d, f, o, q;
        if (D.test(a)) d = (f = e(a.slice(1), c)) ? [f] : [];
        else if (o = A.exec(a)) {
            f = o[1];
            q = o[2];
            o = o[3];
            if (c = f ? e(f, c) : c) o ? !f || -1 != a.indexOf(w) ? d = [].concat(b._getElementsByClassName(o, q, c)) : (f = e(f, c), g(f, o) && (d = [f])) : q && (d = x(b._getElementsByTagName(q, c)));
            d = d || []
        }
        return d
    }
    function k(a, c) {
        var e;
        "string" == typeof a ? e = t(a, c) || [] : f(a) || y(a) ? e = r(a, function (a) {
            return !a ? !1 : c == d ? !0 : b._contains(c, a)
        }) : (!a ? 0 : c == d || b._contains(c, a)) && (e = [a]);
        return e
    }
    function e(c, d) {
        var e = d.nodeType == a.DOCUMENT_NODE;
        return b._getElementById(c, d, e ? d : d.ownerDocument, e)
    }
    function g(b, a) {
        var c = b && b.className;
        return c && -1 < (w + c + w).indexOf(w + a + w)
    }
    function s(b, a) {
        var c = b && b.getAttributeNode(a);
        return c && c.nodeValue
    }
    var d = c.Env.host.document,
		a = b.NodeType,
		r = c.filter,
		f = c.isArray,
		x = c.makeArray,
		y = b._isNodeList,
		B = b.nodeName,
		z = Array.prototype.push,
		w = " ",
		C = ",",
		E = c.trim,
		D = /^#[\w-]+$/,
		A = /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/;
    c.mix(b, {
        _getAttr: s,
        _hasSingleClass: g,
        _getElementById: function (a, c, d, e) {
            var o = d.getElementById(a),
				f = b._getAttr(o, "id");
            return !o && !e && !b._contains(d, c) || o && f != a ? b.filter("*", "#" + a, c)[0] || null : e || o && b._contains(c, o) ? o : null
        },
        _getElementsByTagName: function (b, a) {
            return a.getElementsByTagName(b)
        },
        _getElementsByClassName: function (b,
		a, c) {
            return x(c.querySelectorAll((a || "") + "." + b))
        },
        _compareNodeOrder: function (b, a) {
            return !b.compareDocumentPosition || !a.compareDocumentPosition ? b.compareDocumentPosition ? -1 : 1 : b.compareDocumentPosition(a) & 4 ? -1 : 1
        },
        query: j,
        get: function (b, a) {
            return j(b, a)[0] || null
        },
        unique: function () {
            function a(d, e) {
                return d == e ? (c = !0, 0) : b._compareNodeOrder(d, e)
            }
            var c, d = !0;
            [0, 0].sort(function () {
                d = !1;
                return 0
            });
            return function (b) {
                c = d;
                b.sort(a);
                if (c) for (var e = 1, f = b.length; e < f; ) b[e] === b[e - 1] ? b.splice(e, 1) : e++;
                return b
            }
        } (),
        filter: function (b, a, d) {
            var b = j(b, d),
				d = c.require("sizzle"),
				e, f, q, i, k = [];
            if ("string" == typeof a && (a = E(a)) && (e = A.exec(a))) q = e[1], f = e[2], i = e[3], q ? q && !f && !i && (a = function (b) {
                return s(b, "id") == q
            }) : a = function (b) {
                var a = !0,
					c = !0;
                f && (a = B(b) == f.toLowerCase());
                i && (c = g(b, i));
                return c && a
            };
            c.isFunction(a) ? k = c.filter(b, a) : a && d && (k = d.matches(a, b));
            return k
        },
        test: function (a, c, d) {
            a = j(a, d);
            return a.length && b.filter(a, c, d).length === a.length
        }
    });
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base/style", function (c, b, i) {
    function p(b) {
        return b.replace(z, "ms-").replace(w, C)
    }
    function j(b, c, d) {
        var e = {}, f;
        for (f in c) e[f] = b[a][f], b[a][f] = c[f];
        d.call(b);
        for (f in c) b[a][f] = e[f]
    }
    function m(b, c, d) {
        var e, f, g;
        if (3 === b.nodeType || 8 === b.nodeType || !(e = b[a])) return i;
        c = p(c);
        g = h[c];
        c = l[c] || c;
        if (d !== i) {
            null === d || d === D ? d = D : !isNaN(Number(d)) && !B[c] && (d += A);
            g && g.set && (d = g.set(b, d));
            if (d !== i) {
                try {
                    e[c] = d
                } catch (k) { }
                d === D && e.removeAttribute && e.removeAttribute(c)
            }
            e.cssText || b.removeAttribute("style");
            return i
        }
        if (!g || !("get" in g && (f = g.get(b, !1)) !== i)) f = e[c];
        return f === i ? "" : f
    }
    function t(b) {
        var a, c = arguments;
        0 !== b.offsetWidth ? a = k.apply(i, c) : j(b, u, function () {
            a = k.apply(i, c)
        });
        return a
    }
    function k(a, d, e) {
        if (c.isWindow(a)) return d == f ? b.viewportWidth(a) : b.viewportHeight(a);
        if (9 == a.nodeType) return d == f ? b.docWidth(a) : b.docHeight(a);
        var g = d === f ? ["Left", "Right"] : ["Top", "Bottom"],
			h = d === f ? a.offsetWidth : a.offsetHeight;
        if (0 < h) return "border" !== e && c.each(g, function (c) {
            e || (h -= parseFloat(b.css(a, "padding" + c)) || 0);
            h = "margin" === e ? h + (parseFloat(b.css(a, e + c)) || 0) : h - (parseFloat(b.css(a, "border" + c + "Width")) || 0)
        }), h;
        h = b._getComputedStyle(a, d);
        if (null == h || 0 > Number(h)) h = a.style[d] || 0;
        h = parseFloat(h) || 0;
        e && c.each(g, function (c) {
            h += parseFloat(b.css(a, "padding" + c)) || 0;
            "padding" !== e && (h += parseFloat(b.css(a, "border" + c + "Width")) || 0);
            "margin" === e && (h += parseFloat(b.css(a, e + c)) || 0)
        });
        return h
    }
    var e = c.Env.host,
		g = c.UA,
		s = b.nodeName,
		d = e.document,
		a = "style",
		r = /^margin/,
		f = "width",
		x = "display" + c.now(),
		y = parseInt,
		B = {
		    fillOpacity: 1,
		    fontWeight: 1,
		    lineHeight: 1,
		    opacity: 1,
		    orphans: 1,
		    widows: 1,
		    zIndex: 1,
		    zoom: 1
		}, z = /^-ms-/,
		w = /-([a-z])/ig,
		C = function (b, a) {
		    return a.toUpperCase()
		}, E = /([A-Z]|^ms)/g,
		D = "",
		A = "px",
		h = {}, l = {}, n = {};
    l["float"] = "cssFloat";
    c.mix(b, {
        _camelCase: p,
        _CUSTOM_STYLES: h,
        _cssProps: l,
        _getComputedStyle: function (c, d) {
            var e = "",
				f, g, h, i, k;
            g = c.ownerDocument;
            d = d.replace(E, "-$1").toLowerCase();
            if (f = g.defaultView.getComputedStyle(c, null)) e = f.getPropertyValue(d) || f[d];
            "" === e && !b.contains(g, c) && (d = l[d] || d, e = c[a][d]);
            b._RE_NUM_NO_PX.test(e) && r.test(d) && (k = c.style, g = k.width, h = k.minWidth, i = k.maxWidth, k.minWidth = k.maxWidth = k.width = e, e = f.width, k.width = g, k.minWidth = h, k.maxWidth = i);
            return e
        },
        style: function (a, d, e) {
            var a = b.query(a),
				f, g = a[0];
            if (c.isPlainObject(d)) {
                for (f in d) for (g = a.length - 1; 0 <= g; g--) m(a[g], f, d[f]);
                return i
            }
            if (e === i) return f = "", g && (f = m(g, d, e)), f;
            for (g = a.length - 1; 0 <= g; g--) m(a[g], d, e);
            return i
        },
        css: function (a, d, e) {
            var a = b.query(a),
				f = a[0],
				g;
            if (c.isPlainObject(d)) {
                for (g in d) for (f = a.length - 1; 0 <= f; f--) m(a[f], g, d[g]);
                return i
            }
            d = p(d);
            g = h[d];
            if (e === i) {
                e = "";
                if (f && (!g || !("get" in g && (e = g.get(f, !0)) !== i))) e = b._getComputedStyle(f, d);
                return e === i ? "" : e
            }
            for (f = a.length - 1; 0 <= f; f--) m(a[f], d, e);
            return i
        },
        show: function (c) {
            var c = b.query(c),
				e, f, g;
            for (g = c.length - 1; 0 <= g; g--) if (f = c[g], f[a].display = b.data(f, x) || D, "none" === b.css(f, "display")) {
                e = f.tagName.toLowerCase();
                var h = void 0,
					i = n[e],
					k = void 0;
                n[e] || (h = d.body || d.documentElement, k = d.createElement(e), b.prepend(k, h), i = b.css(k, "display"), h.removeChild(k), n[e] = i);
                e = i;
                b.data(f, x, e);
                f[a].display = e
            }
        },
        hide: function (c) {
            var c = b.query(c),
				d, e;
            for (e = c.length - 1; 0 <= e; e--) {
                d = c[e];
                var f = d[a],
					g = f.display;
                "none" !== g && (g && b.data(d, x, g), f.display = "none")
            }
        },
        toggle: function (a) {
            var a = b.query(a),
				c, d;
            for (d = a.length - 1; 0 <= d; d--) c = a[d], "none" === b.css(c, "display") ? b.show(c) : b.hide(c)
        },
        addStyleSheet: function (a, c, d) {
            a = a || e;
            "string" == typeof a && (d = c, c = a, a = e);
            var a = b.get(a),
				a = b.getWindow(a).document,
				f;
            if (d && (d = d.replace("#", D))) f = b.get("#" + d, a);
            f || (f = b.create("<style>", {
                id: d
            }, a), b.get("head", a).appendChild(f), f.styleSheet ? f.styleSheet.cssText = c : f.appendChild(a.createTextNode(c)))
        },
        unselectable: function (d) {
            var d = b.query(d),
				e, f, h = 0,
				i, k;
            for (f = d.length - 1; 0 <= f; f--) if (e = d[f], g.gecko) e[a].MozUserSelect = "none";
            else if (g.webkit) e[a].KhtmlUserSelect = "none";
            else if (g.ie || g.opera) {
                k = e.getElementsByTagName("*");
                e.setAttribute("unselectable", "on");
                for (i = ["iframe", "textarea", "input", "select"]; e = k[h++]; ) c.inArray(s(e), i) || e.setAttribute("unselectable", "on")
            }
        },
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0,
        width: 0,
        height: 0
    });
    c.each([f, "height"],

	function (a) {
	    b["inner" + c.ucfirst(a)] = function (c) {
	        return (c = b.get(c)) && t(c, a, "padding")
	    };
	    b["outer" + c.ucfirst(a)] = function (c, d) {
	        var e = b.get(c);
	        return e && t(e, a, d ? "margin" : "border")
	    };
	    b[a] = function (c, d) {
	        var e = b.css(c, a, d);
	        e && (e = parseFloat(e));
	        return e
	    }
	});
    var u = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    };
    c.each(["height", "width"], function (a) {
        h[a] = {
            get: function (b, c) {
                return c ? t(b, a) + "px" : i
            }
        }
    });
    c.each(["left", "top"], function (a) {
        h[a] = {
            get: function (e, f) {
                var h;
                if (f && (h = b._getComputedStyle(e, a), "auto" === h)) {
                    h = 0;
                    if (c.inArray(b.css(e, "position"), ["absolute", "fixed"])) {
                        h = e["left" === a ? "offsetLeft" : "offsetTop"];
                        if (g.ie && 9 > (d.documentMode || 0) || g.opera) h -= e.offsetParent && e.offsetParent["client" + ("left" == a ? "Left" : "Top")] || 0;
                        h -= y(b.css(e, "margin-" + a)) || 0
                    }
                    h += "px"
                }
                return h
            }
        }
    });
    return b
}, {
    requires: ["./api"]
});
KISSY.add("dom/base/traversal", function (c, b, i) {
    function p(k, e, g, m, d, a, p) {
        if (!(k = b.get(k))) return null;
        if (0 === e) return k;
        a || (k = k[g]);
        if (!k) return null;
        d = d && b.get(d) || null;
        e === i && (e = 1);
        var a = [],
			f = c.isArray(e),
			x, y;
        c.isNumber(e) && (x = 0, y = e, e = function () {
            return ++x === y
        });
        for (; k && k != d; ) {
            if ((k.nodeType == t.ELEMENT_NODE || k.nodeType == t.TEXT_NODE && p) && j(k, e) && (!m || m(k))) if (a.push(k), !f) break;
            k = k[g]
        }
        return f ? a : a[0] || null
    }
    function j(i, e) {
        if (!e) return !0;
        if (c.isArray(e)) {
            var g, j = e.length;
            if (!j) return !0;
            for (g = 0; g < j; g++) if (b.test(i,
			e[g])) return !0
        } else if (b.test(i, e)) return !0;
        return !1
    }
    function m(i, e, g, j) {
        var d = [],
			a, m;
        if ((a = i = b.get(i)) && g) a = i.parentNode;
        if (a) {
            g = c.makeArray(a.childNodes);
            for (a = 0; a < g.length; a++) m = g[a], (j || m.nodeType == t.ELEMENT_NODE) && m != i && d.push(m);
            e && (d = b.filter(d, e))
        }
        return d
    }
    var t = b.NodeType;
    c.mix(b, {
        _contains: function (b, c) {
            return !!(b.compareDocumentPosition(c) & 16)
        },
        closest: function (b, c, g, i) {
            return p(b, c, "parentNode", function (b) {
                return b.nodeType != t.DOCUMENT_FRAGMENT_NODE
            }, g, !0, i)
        },
        parent: function (b, c, g) {
            return p(b,
			c, "parentNode", function (b) {
			    return b.nodeType != t.DOCUMENT_FRAGMENT_NODE
			}, g, i)
        },
        first: function (c, e, g) {
            c = b.get(c);
            return p(c && c.firstChild, e, "nextSibling", i, i, !0, g)
        },
        last: function (c, e, g) {
            c = b.get(c);
            return p(c && c.lastChild, e, "previousSibling", i, i, !0, g)
        },
        next: function (b, c, g) {
            return p(b, c, "nextSibling", i, i, i, g)
        },
        prev: function (b, c, g) {
            return p(b, c, "previousSibling", i, i, i, g)
        },
        siblings: function (b, c, g) {
            return m(b, c, !0, g)
        },
        children: function (b, c) {
            return m(b, c, i)
        },
        contents: function (b, c) {
            return m(b, c, i, 1)
        },
        contains: function (c,
		e) {
            c = b.get(c);
            e = b.get(e);
            return c && e ? b._contains(c, e) : !1
        },
        index: function (i, e) {
            var g = b.query(i),
				j, d = 0;
            j = g[0];
            if (!e) {
                g = j && j.parentNode;
                if (!g) return -1;
                for (; j = j.previousSibling; ) j.nodeType == t.ELEMENT_NODE && d++;
                return d
            }
            d = b.query(e);
            return "string" === typeof e ? c.indexOf(j, d) : c.indexOf(d[0], g)
        },
        equals: function (c, e) {
            c = b.query(c);
            e = b.query(e);
            if (c.length != e.length) return !1;
            for (var g = c.length; 0 <= g; g--) if (c[g] != e[g]) return !1;
            return !0
        }
    });
    return b
}, {
    requires: ["./api"]
});