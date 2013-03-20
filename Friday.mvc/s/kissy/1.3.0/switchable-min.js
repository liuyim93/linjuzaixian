﻿/*
Copyright 2012, KISSY UI Library v1.30
MIT Licensed
build time: Dec 20 22:28
*/
KISSY.add("switchable/accordion/aria", function (f, b, h, i, j, m) {
    function p(a) {
        var c = null;
        f.each(this.triggers, function (n) {
            if (n == a || b.contains(n, a)) c = n
        });
        return c
    }
    function k(a) {
        var c = null;
        f.each(this.panels, function (n) {
            if (n == a || b.contains(n, a)) c = n
        });
        return c
    }
    function q(a) {
        var c = p.call(this, a);
        c || (a = k.call(this, a), c = this.triggers[f.indexOf(a, this.panels)]);
        return c
    }
    function d(a) {
        switch (a.keyCode) {
            case n:
            case o:
                a.ctrlKey && !a.altKey && !a.shiftKey && a.halt();
                break;
            case v:
                a.ctrlKey && !a.altKey && a.halt()
        }
    }
    function g(c) {
        var b = c.target,
			k = this.triggers,
			d = !c.ctrlKey && !c.shiftKey && !c.altKey,
			g = c.ctrlKey && !c.shiftKey && !c.altKey;
        switch (c.keyCode) {
            case A:
            case t:
                if ((b = p.call(this, b)) && d) this.switchTo(f.indexOf(b, this.triggers)), c.halt();
                break;
            case l:
            case x:
                if (b = p.call(this, b)) s.call(this, b), c.halt();
                break;
            case y:
            case u:
                if (b = p.call(this, b)) a.call(this, b), c.halt();
                break;
            case o:
                g && (c.halt(), b = q.call(this, b), a.call(this, b));
                break;
            case n:
                g && (c.halt(), b = q.call(this, b), s.call(this, b));
                break;
            case r:
                d && (q.call(this, b), e.call(this, 0, !0),
				c.halt());
                break;
            case w:
                d && (q.call(this, b), e.call(this, k.length - 1, !0), c.halt());
                break;
            case v:
                c.ctrlKey && !c.altKey && (c.halt(), b = q.call(this, b), c.shiftKey ? s.call(this, b) : a.call(this, b))
        }
    }
    function e(a, c) {
        var n = this.triggers,
			o = n[a];
        f.each(n, function (a) {
            a !== o && (z(a, "-1"), b.removeClass(a, "ks-switchable-select"), a.setAttribute("aria-selected", "false"))
        });
        c && o.focus();
        z(o, "0");
        b.addClass(o, "ks-switchable-select");
        o.setAttribute("aria-selected", "true")
    }
    function s(a) {
        var c = this.triggers,
			a = f.indexOf(a, c);
        e.call(this,
		0 == a ? c.length - 1 : a - 1, !0)
    }
    function a(a) {
        var c = this.triggers,
			a = f.indexOf(a, c);
        e.call(this, a == c.length - 1 ? 0 : a + 1, !0)
    }
    function c(a) {
        var c = a.originalEvent && !(!a.originalEvent.target && !a.originalEvent.srcElement),
			a = a.currentIndex,
			b = this.panels,
			n = this.triggers,
			o = n[a],
			l = b[a];
        this.config.multiple || (f.each(b, function (a) {
            a !== l && a.setAttribute("aria-hidden", "true")
        }), f.each(n, function (a) {
            a !== o && a.setAttribute("aria-hidden", "true")
        }));
        b = l.getAttribute("aria-hidden");
        l.setAttribute("aria-hidden", "false" == b ? "true" :
			"false");
        o.setAttribute("aria-expanded", "false" == b ? "false" : "true");
        e.call(this, a, c)
    }
    var n = 33,
		o = 34,
		w = 35,
		r = 36,
		l = 37,
		x = 38,
		y = 39,
		u = 40,
		v = 9,
		t = 32,
		A = 13;
    f.mix(j.Config, {
        aria: !0
    });
    m.addPlugin({
        name: "aria",
        init: function (a) {
            if (a.config.aria) {
                var n = a.container,
					o = a.activeIndex;
                b.attr(n, "aria-multiselectable", a.config.multiple ? "true" : "false");
                a.nav && b.attr(a.nav, "role", "tablist");
                var l = a.triggers,
					k = a.panels,
					e = 0;
                f.each(k, function (a) {
                    a.id || (a.id = f.guid("ks-accordion-tab-panel"))
                });
                f.each(l, function (a) {
                    a.id || (a.id = f.guid("ks-accordion-tab"))
                });
                f.each(l, function (a) {
                    a.setAttribute("role", "tab");
                    a.setAttribute("aria-expanded", o == e ? "true" : "false");
                    a.setAttribute("aria-selected", o == e ? "true" : "false");
                    a.setAttribute("aria-controls", k[e].id);
                    z(a, o == e ? "0" : "-1");
                    e++
                });
                e = 0;
                f.each(k, function (a) {
                    var c = l[e];
                    a.setAttribute("role", "tabpanel");
                    a.setAttribute("aria-hidden", o == e ? "false" : "true");
                    a.setAttribute("aria-labelledby", c.id);
                    e++
                });
                a.on("switch", c, a);
                h.on(n, "keydown", g, a);
                h.on(n, "keypress", d, a)
            }
        }
    }, j);
    var z = i.setTabIndex
}, {
    requires: ["dom", "event", "../aria",
		"./base", "../base"]
});
KISSY.add("switchable/accordion/base", function (f, b, h) {
    function i(b, f) {
        if (!(this instanceof i)) return new i(b, f);
        i.superclass.constructor.apply(this, arguments)
    }
    f.extend(i, h, {
        _switchTrigger: function (f, m) {
            var h = this.config;
            h.multiple ? b.toggleClass(m, h.activeTriggerCls) : i.superclass._switchTrigger.apply(this, arguments)
        },
        _triggerIsValid: function (b) {
            return this.config.multiple || i.superclass._triggerIsValid.call(this, b)
        },
        _switchView: function (f, m, h) {
            var k = this.config,
				q = this._getFromToPanels().toPanels;
            k.multiple ? (b.toggle(q), this._fireOnSwitch(m), h && h.call(this)) : i.superclass._switchView.apply(this, arguments)
        }
    });
    i.Config = {
        markupType: 1,
        triggerType: "click",
        multiple: !1
    };
    return i
}, {
    requires: ["dom", "../base"]
});
KISSY.add("switchable/aria", function (f, b, h, i) {
    function j() {
        this.stop && this.stop()
    }
    function m() {
        this.start && this.start()
    }
    i.addPlugin({
        name: "aria",
        init: function (b) {
            if (b.config.aria) {
                var f = b.container;
                h.on(f, "focusin", j, b);
                h.on(f, "focusout", m, b)
            }
        }
    });
    var p = ["a", "input", "button", "object"];
    return {
        setTabIndex: function (k, q) {
            k.tabIndex = q;
            f.each(b.query("*", k), function (d) {
                var g = d.nodeName.toLowerCase();
                f.inArray(g, p) && (b.hasAttr(d, "oriTabIndex") || b.attr(d, "oriTabIndex", d.tabIndex), d.tabIndex = -1 != q ? b.attr(d,
					"oriTabIndex") : q)
            })
        }
    }
}, {
    requires: ["dom", "event", "./base"]
});
KISSY.add("switchable/autoplay", function (f, b, h, i, j) {
    var m = f.Env.host,
		p = function (k) {
		    var f = b.scrollTop(),
				d = b.viewportHeight(),
				g = b.offset(k),
				k = b.height(k);
		    return g.top > f && g.top + k < f + d
		};
    f.mix(i.Config, {
        pauseOnScroll: !1,
        autoplay: !1,
        interval: 5,
        pauseOnHover: !0
    });
    i.addPlugin({
        name: "autoplay",
        init: function (b) {
            function i() {
                e = f.later(function () {
                    b.paused || b.next()
                }, g, !0)
            }
            var d = b.config,
				g = 1E3 * d.interval,
				e;
            if (d.autoplay && (d.pauseOnScroll && (b.__scrollDetect = f.buffer(function () {
                b[p(b.container) ? "start" : "stop"]()
            },
			200), h.on(m, "scroll", b.__scrollDetect)), i(), b.stop = function () {
			    if (e) {
			        e.cancel();
			        e = j
			    }
			    b.paused = true
			}, b.start = function () {
			    if (e) {
			        e.cancel();
			        e = j
			    }
			    b.paused = false;
			    i()
			}, d.pauseOnHover)) h.on(b.container, "mouseenter", b.stop, b), h.on(b.container, "mouseleave", b.start, b)
        },
        destroy: function (b) {
            b.__scrollDetect && (h.remove(m, "scroll", b.__scrollDetect), b.__scrollDetect.stop())
        }
    });
    return i
}, {
    requires: ["dom", "event", "./base"]
});
KISSY.add("switchable/base", function (f, b, h, i) {
    function j(a, c) {
        this._triggerInternalCls = f.guid(e);
        this._panelInternalCls = f.guid(s);
        c = c || {};
        "markupType" in c || (c.panelCls ? c.markupType = 1 : c.panels && (c.markupType = 2));
        for (var n = this.constructor; n; ) c = f.merge(n.Config, c), n = n.superclass ? n.superclass.constructor : null;
        this.container = b.get(a);
        this.config = c;
        this.activeIndex = c.activeIndex;
        var o; -1 < this.activeIndex || ("number" == typeof c.switchTo ? o = c.switchTo : this.activeIndex = 0);
        this._init();
        this._initPlugins();
        this.fire(d);
        o !== i && this.switchTo(o)
    }
    function m(a) {
        if (!a || !a.length) return null;
        if (1 == a.length) return a[0].parentNode;
        for (var c = a[0], n = 0; !n && c != document.body; ) for (var c = c.parentNode, o = n = 1; o < a.length; o++) if (!b.contains(c, a[o])) {
            n = 0;
            break
        }
        return c
    }
    function p(a) {
        var c = {};
        c.type = a.type;
        c.target = a.target;
        return {
            originalEvent: c
        }
    }
    var k = f.makeArray,
		q = h.Target,
		d = "init",
		g = "remove",
		e = "ks-switchable-trigger-internal",
		s = "ks-switchable-panel-internal";
    j.getDomEvent = p;
    j.addPlugin = function (a, c) {
        for (var c = c || j, b = a.priority = a.priority || 0, o = 0, e = c.Plugins = c.Plugins || []; o < e.length && !(e[o].priority < b); o++);
        e.splice(o, 0, a)
    };
    j.Config = {
        markupType: 0,
        navCls: "ks-switchable-nav",
        contentCls: "ks-switchable-content",
        triggerCls: "ks-switchable-trigger",
        panelCls: "ks-switchable-panel",
        triggers: [],
        panels: [],
        hasTriggers: !0,
        triggerType: "mouse",
        delay: 0.1,
        activeIndex: -1,
        activeTriggerCls: "ks-active",
        switchTo: i,
        steps: 1,
        viewSize: []
    };
    f.augment(j, q, {
        _initPlugins: function () {
            for (var a = this, c = [], b = a.constructor; b; ) b.Plugins && c.push.apply(c, [].concat(b.Plugins).reverse()),
			b = b.superclass ? b.superclass.constructor : null;
            c.reverse();
            f.each(c, function (c) {
                c.init && c.init(a)
            })
        },
        _init: function () {
            var a = this.config;
            this._parseMarkup();
            a.hasTriggers && this._bindTriggers();
            this._bindPanels()
        },
        _parseMarkup: function () {
            var a = this.container,
				c = this.config,
				n, o, e = [],
				d = [];
            switch (c.markupType) {
                case 0:
                    (n = b.get("." + c.navCls, a)) && (e = b.children(n));
                    o = b.get("." + c.contentCls, a);
                    d = b.children(o);
                    break;
                case 1:
                    e = b.query("." + c.triggerCls, a);
                    d = b.query("." + c.panelCls, a);
                    break;
                case 2:
                    e = c.triggers, d = c.panels,
					n = c.nav, o = c.content
            }
            this.length = Math.ceil(d.length / c.steps);
            this.nav = n || c.hasTriggers && m(e);
            if (c.hasTriggers && (!this.nav || 0 == e.length)) e = this._generateTriggersMarkup(this.length);
            this.triggers = k(e);
            this.panels = k(d);
            this.content = o || m(d)
        },
        _generateTriggersMarkup: function (a) {
            var c = this.config,
				n = this.nav || b.create("<ul>"),
				e, d;
            n.className = c.navCls;
            for (d = 0; d < a; d++) e = b.create("<li>"), d === this.activeIndex && (e.className = c.activeTriggerCls), e.innerHTML = d + 1, n.appendChild(e);
            this.container.appendChild(n);
            this.nav = n;
            return b.children(n)
        },
        _bindTriggers: function () {
            var a = this,
				c = a.config,
				b = a._triggerInternalCls,
				e = a.nav;
            f.each(a.triggers, function (c) {
                a._initTrigger(c)
            });
            h.delegate(e, "click", "." + b, function (c) {
                var b = a._getTriggerIndex(c.currentTarget);
                a._onFocusTrigger(b, c)
            });
            "mouse" === c.triggerType && (h.delegate(e, "mouseenter", "." + b, function (c) {
                var b = a._getTriggerIndex(c.currentTarget);
                a._onMouseEnterTrigger(b, c)
            }), h.delegate(e, "mouseleave", "." + b, function () {
                a._onMouseLeaveTrigger()
            }))
        },
        _initTrigger: function (a) {
            b.addClass(a,
			this._triggerInternalCls)
        },
        _bindPanels: function () {
            var a = this;
            f.each(a.panels, function (c) {
                a._initPanel(c)
            })
        },
        _initPanel: function (a) {
            b.addClass(a, this._panelInternalCls)
        },
        _onFocusTrigger: function (a, c) {
            this._triggerIsValid(a) && (this._cancelSwitchTimer(), this.switchTo(a, i, p(c)))
        },
        _onMouseEnterTrigger: function (a, c) {
            var b = this;
            if (b._triggerIsValid(a)) {
                var e = p(c);
                b.switchTimer = f.later(function () {
                    b.switchTo(a, i, e)
                }, 1E3 * b.config.delay)
            }
        },
        _onMouseLeaveTrigger: function () {
            this._cancelSwitchTimer()
        },
        _triggerIsValid: function (a) {
            return this.activeIndex !== a
        },
        _cancelSwitchTimer: function () {
            this.switchTimer && (this.switchTimer.cancel(), this.switchTimer = i)
        },
        _getTriggerIndex: function (a) {
            return f.indexOf(a, this.triggers)
        },
        _resetLength: function () {
            this.length = this._getLength()
        },
        _getLength: function (a) {
            var c = this.config;
            a === i && (a = this.panels.length);
            return Math.ceil(a / c.steps)
        },
        _afterAdd: function (a, c, b) {
            this._resetLength();
            a = this._getLength(a + 1) - 1;
            1 == this.config.steps && this.activeIndex >= a && (this.activeIndex += 1);
            var e = this.activeIndex;
            this.activeIndex = -1;
            this.switchTo(e);
            c ? this.switchTo(a, i, i, b) : b()
        },
        add: function (a) {
            var c = a.callback || f.noop,
				e = this.nav,
				d = this.content,
				g = a.trigger,
				k = a.panel,
				l = a.active,
				i = this.panels.length,
				a = null != a.index ? a.index : i,
				m = this.triggers,
				u = this.panels,
				v = this.length,
				t = null,
				t = null,
				a = Math.max(0, Math.min(a, i)),
				i = u[a] || null;
            u.splice(a, 0, k);
            d.insertBefore(k, i);
            1 == this.config.steps ? (t = m[a], e.insertBefore(g, t), m.splice(a, 0, g)) : (t = this._getLength(), t != v && (b.append(g, e), m.push(g)));
            this._initPanel(k);
            this._initTrigger(g);
            this._afterAdd(a, l, c);
            this.fire("add", {
                index: a,
                trigger: g,
                panel: k
            })
        },
        remove: function (a) {
            function c() {
                v && (b.remove(v), s.splice(l, 1));
                if (u) {
                    b.remove(u);
                    for (var a = 0; a < h.length; a++) if (h[a] == u) {
                        d.triggers.splice(a, 1);
                        break
                    }
                }
                d._resetLength();
                d.fire(g, {
                    index: l,
                    trigger: u,
                    panel: v
                })
            }
            var e = a.callback || f.noop,
				d = this,
				k = d.config.steps,
				m = d.length,
				l, s = d.panels;
            l = "index" in a ? a.index : a.panel;
            var a = d._getLength(s.length - 1),
				h = d.triggers,
				u = null,
				v = null;
            if (s.length && (l = f.isNumber(l) ? Math.max(0, Math.min(l, s.length - 1)) : f.indexOf(l, s), u = 1 == k ? h[l] : a !== m ? h[m - 1] : null, v = s[l], !1 !== d.fire("beforeRemove", {
                index: l,
                panel: v,
                trigger: u
            }))) if (0 == a) c(), e();
            else {
                var t = d.activeIndex;
                1 < k ? t == a ? d.switchTo(t - 1, i, i, function () {
                    c();
                    e()
                }) : (c(), d.activeIndex = -1, d.switchTo(t, i, i, function () {
                    e()
                })) : t == l ? d.switchTo(0 < t ? t - 1 : t + 1, i, i, function () {
                    c();
                    0 == t && (d.activeIndex = 0);
                    e()
                }) : (t > l && (t--, d.activeIndex = t), c(), e())
            }
        },
        switchTo: function (a, c, b, e) {
            var d = this,
				g = d.config,
				l = d.activeIndex,
				f = d.triggers;
            if (!d._triggerIsValid(a) || !1 === d.fire("beforeSwitch", {
                fromIndex: l,
                toIndex: a
            })) return d;
            d.fromIndex = l;
            g.hasTriggers && d._switchTrigger(f[l] || null, f[a]);
            c === i && (c = a > l ? "forward" : "backward");
            d.activeIndex = a;
            d._switchView(c, b, function () {
                e && e.call(d)
            });
            return d
        },
        _switchTrigger: function (a, c) {
            var d = this.config.activeTriggerCls;
            a && b.removeClass(a, d);
            b.addClass(c, d)
        },
        _getFromToPanels: function () {
            var a = this.fromIndex,
				c;
            c = this.config.steps;
            var b = this.panels,
				d = this.activeIndex,
				a = -1 < a ? b.slice(a * c, (a + 1) * c) : null;
            c = b.slice(d * c, (d + 1) * c);
            return {
                fromPanels: a,
                toPanels: c
            }
        },
        _switchView: function (a, c, d) {
            var e = this,
				g = e._getFromToPanels(),
				a = g.fromPanels,
				g = g.toPanels;
            a && b.css(a, "display", "none");
            b.css(g, "display", "block");
            setTimeout(function () {
                e._fireOnSwitch(c)
            }, 0);
            d && d.call(this)
        },
        _fireOnSwitch: function (a) {
            this.fire("switch", f.merge(a, {
                fromIndex: this.fromIndex,
                currentIndex: this.activeIndex
            }))
        },
        prev: function (a) {
            this.switchTo((this.activeIndex - 1 + this.length) % this.length, "backward", a)
        },
        next: function (a) {
            this.switchTo((this.activeIndex + 1) % this.length, "forward", a)
        },
        destroy: function (a) {
            for (var c = this, d = c.constructor; d; ) f.each(d.Plugins,

			function (a) {
			    a.destroy && a.destroy(c)
			}), d = d.superclass ? d.superclass.constructor : null;
            a ? h.remove(c.container) : b.remove(c.container);
            c.nav = null;
            c.content = null;
            c.container = null;
            c.triggers = [];
            c.panels = [];
            c.detach()
        }
    });
    return j
}, {
    requires: ["dom", "event"]
});
KISSY.add("switchable/carousel/aria", function (f, b, h, i, j, m) {
    function p(a) {
        var b = a.currentIndex,
			c = this.activeIndex,
			d = this.panels,
			e = d[b * this.config.steps],
			g = this.triggers,
			b = g[b];
        if ((a = a.originalEvent && !(!a.originalEvent.target && !a.originalEvent.srcElement)) || -1 == c) f.each(g, function (a) {
            r(a, -1)
        }), f.each(d, function (a) {
            r(a, -1)
        }), b && r(b, 0), r(e, 0), a && e.focus()
    }
    function k(a) {
        var c = null;
        f.each(this.triggers, function (d) {
            if (d == a || b.contains(d, a)) return c = d, !1
        });
        return c
    }
    function q(d) {
        var e = d.target;
        switch (d.keyCode) {
            case n:
            case c:
                if (e = k.call(this, e)) {
                    var g = b.next(e),
						i = this.triggers;
                    g || (g = i[0]);
                    r(e, -1);
                    g && (r(g, 0), g.focus());
                    d.halt()
                }
                break;
            case a:
            case s:
                if (e = k.call(this, e)) g = b.prev(e), i = this.triggers, g || (g = i[i.length - 1]), r(e, -1), g && (r(g, 0), g.focus()), d.halt();
                break;
            case w:
            case o:
                if (e = k.call(this, e)) this.switchTo(f.indexOf(e, this.triggers), void 0, l), d.halt()
        }
    }
    function d(a) {
        var c = null;
        f.each(this.panels, function (d) {
            if (d == a || b.contains(d, a)) return c = d, !1
        });
        return c
    }
    function g(a, c) {
        var b = f.indexOf(a, this.panels),
			d = this.config.steps,
			e = Math.floor(b / d);
        return e == this.activeIndex ? 1 : 0 == b % d || b % d == d - 1 ? (this.switchTo(e, c, l), 0) : 1
    }
    function e(e) {
        var l = e.target;
        switch (e.keyCode) {
            case n:
            case c:
                if (l = d.call(this, l)) {
                    var f = b.next(l),
						k = this.panels;
                    f || (f = k[0]);
                    r(l, -1);
                    r(f, 0);
                    g.call(this, f, x) && f.focus();
                    e.halt()
                }
                break;
            case a:
            case s:
                if (l = d.call(this, l)) f = b.prev(l), k = this.panels, f || (f = k[k.length - 1]), r(l, -1), r(f, 0), g.call(this, f, y) && f.focus(), e.halt();
                break;
            case w:
            case o:
                if (l = d.call(this, l)) this.fire("itemSelected", {
                    item: l
                }), e.halt()
        }
    }
    var s = 37,
		a = 38,
		c = 39,
		n = 40,
		o = 32,
		w = 13,
		r = i.setTabIndex,
		l = {
		    originalEvent: {
		        target: 1
		    }
		}, x = "forward",
		y = "backward";
    f.mix(j.Config, {
        aria: !1
    });
    m.addPlugin({
        name: "aria",
        init: function (a) {
            if (a.config.aria) {
                var b = a.triggers,
					c = a.panels,
					d = a.content,
					g = a.activeIndex;
                d.id || (d.id = f.guid("ks-switchbale-content"));
                d.setAttribute("role", "listbox");
                var k = 0;
                f.each(b, function (a) {
                    r(a, g == k ? "0" : "-1");
                    a.setAttribute("role", "button");
                    a.setAttribute("aria-controls", d.id);
                    k++
                });
                k = 0;
                f.each(c, function (a) {
                    r(a, "-1");
                    a.setAttribute("role", "option");
                    k++
                });
                a.on("switch", p, a);
                if (b = a.nav) h.on(b, "keydown", q, a);
                h.on(d, "keydown", e, a);
                b = a.prevBtn;
                c = a.nextBtn;
                b && (r(b, 0), b.setAttribute("role", "button"), h.on(b, "keydown", function (b) {
                    if (b.keyCode == w || b.keyCode == o) {
                        a.prev(l);
                        b.preventDefault()
                    }
                }));
                c && (r(c, 0), c.setAttribute("role", "button"), h.on(c, "keydown", function (b) {
                    if (b.keyCode == w || b.keyCode == o) {
                        a.next(l);
                        b.preventDefault()
                    }
                }))
            }
        }
    }, j)
}, {
    requires: ["dom", "event", "../aria", "./base", "../base"]
});
KISSY.add("switchable/carousel/base", function (f, b, h, i) {
    function j(b, d) {
        if (!(this instanceof j)) return new j(b, d);
        j.superclass.constructor.apply(this, arguments)
    }
    var m = "prevBtn",
		p = "nextBtn",
		k = {
		    originalEvent: {
		        target: 1
		    }
		};
    j.Config = {
        circular: !0,
        prevBtnCls: "ks-switchable-prev-btn",
        nextBtnCls: "ks-switchable-next-btn",
        disableBtnCls: "ks-switchable-disable-btn"
    };
    f.extend(j, i, {
        _init: function () {
            function i(g) {
                b.removeClass([d[m], d[p]], e);
                0 == g && b.addClass(d[m], e);
                g == d.length - 1 && b.addClass(d[p], e)
            }
            var d = this;
            j.superclass._init.call(d);
            var g = d.config,
				e = g.disableBtnCls;
            f.each(["prev", "next"], function (e) {
                var a = d[e + "Btn"] = b.get("." + g[e + "BtnCls"], d.container);
                h.on(a, "mousedown", function (a) {
                    a.preventDefault();
                    a = d.activeIndex;
                    if ("prev" == e && (0 != a || g.circular)) d[e](k);
                    if ("next" == e && (a != d.length - 1 || g.circular)) d[e](k)
                })
            });
            g.circular || (d.on("added removed", function () {
                i(d.activeIndex)
            }), d.on("switch", function (b) {
                i(b.currentIndex)
            }));
            h.delegate(d.content, "click", "." + d._panelInternalCls, function (b) {
                d.fire("itemSelected", {
                    item: b.currentTarget
                })
            })
        }
    });
    return j
}, {
    requires: ["dom", "event", "../base"]
});
KISSY.add("switchable/circular", function (f, b, h, i) {
    function j(d) {
        var g = this,
			e = g.fromIndex,
			f = g.config,
			a = g.length,
			c = "scrollx" === f.scrollType,
			k = c ? "left" : "top",
			i = g.activeIndex,
			c = g.viewSize[c ? 0 : 1],
			m = g.panels,
			j = {}, l = {}, x, p = g._realStep;
        x = c * a;
        j[k] = -c * i; -1 == e ? (b.css(g.content, j), d && d()) : (i + p > a ? (l = {
            position: "relative"
        }, l[k] = x, x = i + p - a, b.css(m.slice(0, x), l), b.css(m.slice(x, p), q)) : b.css(m.slice(0, p), q), m = b.css(m[e], "position"), (e + a - i) % a < (i - e + a) % a && "relative" == m ? b.css(g.content, k, -(c * (a + e))) : e == a - 1 && 0 == i ? b.css(g.content,
		k, c) : b.css(g.content, k, -(c * e)), g.anim && g.anim.stop(), g.anim = (new h(g.content, j, f.duration, f.easing, function () {
		    g.anim = 0;
		    d && d()
		})).run())
    }
    function m(d, g) {
        var e = this,
			f = e.fromIndex,
			a = e.config,
			c = e.length,
			i = "scrollx" === a.scrollType,
			m = i ? "left" : "top",
			j = e.activeIndex,
			q = e.viewSize[i ? 0 : 1],
			i = -q * j,
			l = e.panels,
			x = e.config.steps,
			y = {}, u, v = "backward" === g;
        u = v && 0 === f && j === c - 1 || !v && f === c - 1 && 0 === j;
        e.anim && (e.anim.stop(), "relative" == l[f * x].style.position && k.call(e, l, f, m, q, 1));
        u && (i = p.call(e, l, j, m, q));
        y[m] = i + "px"; -1 < f ? e.anim = (new h(e.content, y, a.duration, a.easing, function () {
            u && k.call(e, l, j, m, q, 1);
            e.anim = void 0;
            d && d()
        })).run() : (b.css(e.content, y), d && d())
    }
    function p(d, g, e, f) {
        var a = this.config.steps,
			c = this.length,
			d = d.slice(g * a, (g + 1) * a);
        b.css(d, "position", "relative");
        b.css(d, e, (g ? -1 : 1) * f * c);
        return g ? f : -f * c
    }
    function k(d, g, e, f, a) {
        var c = this.config.steps,
			k = this.length,
			d = d.slice(g * c, (g + 1) * c);
        b.css(d, "position", "");
        b.css(d, e, "");
        a && b.css(this.content, e, g ? -f * (k - 1) : "")
    }
    var q = {
        position: "",
        left: "",
        top: ""
    };
    f.mix(i.Config, {
        circular: !1
    });
    i.adjustPosition = p;
    i.resetPosition = k;
    i.addPlugin({
        name: "circular",
        priority: 5,
        init: function (b) {
            var g = b.config,
				e = g.effect;
            if (g.circular && ("scrollx" === e || "scrolly" === e)) g.scrollType = e, g.effect = b._realStep ? j : m
        }
    })
}, {
    requires: ["dom", "anim", "./base", "./effect"]
});
KISSY.add("switchable/effect", function (f, b, h, i, j, m) {
    var p;
    f.mix(j.Config, {
        effect: "none",
        duration: 0.5,
        easing: "easeNone"
    });
    j.Effects = {
        none: function (f) {
            var i = this._getFromToPanels(),
				d = i.fromPanels,
				i = i.toPanels;
            d && b.css(d, "display", "none");
            b.css(i, "display", "block");
            f && f()
        },
        fade: function (f) {
            var h = this,
				d = h._getFromToPanels(),
				g = d.fromPanels,
				e = h.config,
				j = g ? g[0] : null,
				a = d.toPanels[0];
            h.anim && (h.anim.stop(), b.css(h.anim.fromEl, {
                zIndex: 1,
                opacity: 0
            }), b.css(h.anim.toEl, "zIndex", 9));
            b.css(a, "opacity", 1);
            j ? (h.anim = (new i(j, {
                opacity: 0
            }, e.duration, e.easing, function () {
                h.anim = m;
                b.css(a, "z-index", 9);
                b.css(j, "z-index", 1);
                f && f()
            })).run(), h.anim.toEl = a, h.anim.fromEl = j) : (b.css(a, "z-index", 9), f && f())
        },
        scroll: function (f, h, d) {
            var g = this,
				h = g.fromIndex,
				e = g.config,
				j = "scrollx" === e.effect,
				a = {};
            a[j ? "left" : "top"] = -(g.viewSize[j ? 0 : 1] * g.activeIndex) + "px";
            g.anim && g.anim.stop();
            d || -1 < h ? g.anim = (new i(g.content, a, e.duration, e.easing, function () {
                g.anim = m;
                f && f()
            })).run() : (b.css(g.content, a), f && f())
        }
    };
    p = j.Effects;
    p.scrollx = p.scrolly = p.scroll;
    j.addPlugin({
        priority: 10,
        name: "effect",
        init: function (i) {
            var m = i.config,
				d = m.effect,
				g = i.panels,
				e = i.content,
				h = m.steps,
				a = g[0],
				c = i.container,
				j = i.activeIndex;
            if ("none" !== d) switch (b.css(g, "display", "block"), d) {
                case "scrollx":
                case "scrolly":
                    b.css(e, "position", "absolute");
                    "static" == b.css(e.parentNode, "position") && b.css(e.parentNode, "position", "relative");
                    "scrollx" === d && (b.css(g, "float", "left"), b.width(e, "999999px"));
                    i.viewSize = [m.viewSize[0] || a && b.outerWidth(a, !0) * h, m.viewSize[1] || a && b.outerHeight(a, !0) * h];
                    1 == h && a && (g = 1, e = i.viewSize, a = a.parentNode.parentNode, c = [Math.min(b.width(c), b.width(a)), Math.min(b.height(c), b.height(a))], "scrollx" == d ? g = Math.floor(c[0] / e[0]) : "scrolly" == d && (g = Math.floor(c[1] / e[1])), g > m.steps && (i._realStep = g));
                    break;
                case "fade":
                    var o = j * h,
						p = o + h - 1,
						r;
                    f.each(g, function (a, c) {
                        r = c >= o && c <= p;
                        b.css(a, {
                            opacity: r ? 1 : 0,
                            position: "absolute",
                            zIndex: r ? 9 : 1
                        })
                    })
            }
        }
    });
    f.augment(j, {
        _switchView: function (b, i, d) {
            var g = this,
				e = g.config.effect;
            (f.isFunction(e) ? e : p[e]).call(g, function () {
                g._fireOnSwitch(i);
                d && d.call(g)
            }, b)
        }
    });
    return j
}, {
    requires: ["dom", "event", "anim", "./base"]
});
KISSY.add("switchable/lazyload", function (f, b, h) {
    var i = "beforeSwitch",
		j = "img",
		m = "textarea",
		p = {};
    p[j] = "lazyImgAttribute";
    p[m] = "lazyTextareaClass";
    f.mix(h.Config, {
        lazyImgAttribute: "data-ks-lazyload-custom",
        lazyTextareaClass: "ks-datalazyload-custom",
        lazyDataType: m
    });
    h.addPlugin({
        name: "lazyload",
        init: function (h) {
            function q(a) {
                var c = h._realStep || g.steps,
					a = a.toIndex * c;
                d.loadCustomLazyData(h.panels.slice(a, a + c), e, s);
                a: 
                {
                    var f, o, p;
                    if (a = (c = e === j) ? "img" : e === m ? "textarea" : "") {
                        a = b.query(a, h.container);
                        f = 0;
                        for (p = a.length; f < p; f++) if (o = a[f], c ? b.attr(o, s) : b.hasClass(o, s)) {
                            c = !1;
                            break a
                        }
                    }
                    c = !0
                }
                c && h.detach(i, q)
            }
            var d = f.require("datalazyload"),
				g = h.config,
				e = g.lazyDataType,
				s;
            "img-src" === e ? e = j : "area-data" === e && (e = m);
            g.lazyDataType = e;
            s = g[p[e]];
            d && e && s && (h.on(i, q), q({
                toIndex: h.activeIndex
            }))
        }
    });
    return h
}, {
    requires: ["dom", "./base"]
});
KISSY.add("switchable/slide/base", function (f, b) {
    function h(b, f) {
        if (!(this instanceof h)) return new h(b, f);
        h.superclass.constructor.apply(this, arguments)
    }
    h.Config = {
        autoplay: !0,
        circular: !0
    };
    f.extend(h, b);
    return h
}, {
    requires: ["../base"]
});
KISSY.add("switchable", function (f, b, h, i, j, m) {
    f.mix(b, {
        Accordion: h,
        Carousel: i,
        Slide: j,
        Tabs: m
    });
    return f.Switchable = b
}, {
    requires: "switchable/base,switchable/accordion/base,switchable/carousel/base,switchable/slide/base,switchable/tabs/base,switchable/lazyload,switchable/effect,switchable/circular,switchable/carousel/aria,switchable/autoplay,switchable/aria,switchable/tabs/aria,switchable/accordion/aria,switchable/touch".split(",")
});
KISSY.add("switchable/tabs/aria", function (f, b, h, i, j, m) {
    function p(a) {
        var c = null;
        f.each(this.triggers, function (d) {
            if (d == a || b.contains(d, a)) c = d
        });
        return c
    }
    function k(a) {
        switch (a.keyCode) {
            case g:
            case e:
                a.ctrlKey && !a.altKey && !a.shiftKey && a.halt();
                break;
            case o:
                a.ctrlKey && !a.altKey && a.halt()
        }
    }
    function q(b) {
        var d = b.target,
			f = b.ctrlKey && !b.shiftKey && !b.altKey;
        switch (b.keyCode) {
            case s:
            case a:
                p.call(this, d) && (this.prev(r(b)), b.halt());
                break;
            case c:
            case n:
                p.call(this, d) && (this.next(r(b)), b.halt());
                break;
            case e:
                f && (b.halt(), this.next(r(b)));
                break;
            case g:
                f && (b.halt(), this.prev(r(b)));
                break;
            case o:
                b.ctrlKey && !b.altKey && (b.halt(), b.shiftKey ? this.prev(r(b)) : this.next(r(b)))
        }
    }
    function d(a) {
        var b = a.originalEvent && !(!a.originalEvent.target && !a.originalEvent.srcElement),
			c = a.fromIndex,
			d = a.currentIndex;
        if (c != d) {
            var a = this.triggers[c],
				e = this.triggers[d],
				c = this.panels[c],
				d = this.panels[d];
            a && w(a, "-1");
            w(e, "0");
            b && e.focus();
            c && c.setAttribute("aria-hidden", "true");
            d.setAttribute("aria-hidden", "false")
        }
    }
    var g = 33,
		e = 34,
		s = 37,
		a = 38,
		c = 39,
		n = 40,
		o = 9;
    f.mix(m.Config, {
        aria: !0
    });
    i.addPlugin({
        name: "aria",
        init: function (a) {
            function c(a) {
                a.setAttribute("role", "tab");
                w(a, "-1");
                a.id || (a.id = f.guid("ks-switchable"))
            }
            function e(a, b) {
                a.setAttribute("role", "tabpanel");
                a.setAttribute("aria-hidden", "true");
                a.setAttribute("aria-labelledby", b.id)
            }
            if (a.config.aria) {
                var g = a.triggers,
					i = a.activeIndex,
					m = a.panels,
					j = a.container;
                a.nav && b.attr(a.nav, "role", "tablist");
                var n = 0;
                f.each(g, c);
                a.on("added", function (a) {
                    var b;
                    c(b = a.trigger);
                    e(a.panel, b)
                });
                n = 0;
                f.each(m, function (a) {
                    e(a, g[n]);
                    n++
                }); -1 < i && (w(g[i], "0"), m[i].setAttribute("aria-hidden", "false"));
                a.on("switch", d, a);
                h.on(j, "keydown", q, a);
                h.on(j, "keypress", k, a)
            }
        }
    }, m);
    var w = j.setTabIndex,
		r = i.getDomEvent
}, {
    requires: ["dom", "event", "../base", "../aria", "./base"]
});
KISSY.add("switchable/tabs/base", function (f, b) {
    function h(b, f) {
        if (!(this instanceof h)) return new h(b, f);
        h.superclass.constructor.call(this, b, f);
        return 0
    }
    f.extend(h, b);
    h.Config = {};
    return h
}, {
    requires: ["../base"]
});
KISSY.add("switchable/touch", function (f, b, h, i, j) {
    f.mix(i.Config, {
        mouseAsTouch: !1
    });
    i.addPlugin({
        name: "touch",
        init: function (h) {
            if (!h._realStep) {
                var p = h.config,
					k = p.scrollType || p.effect;
                if ("scrolly" == k || "scrollx" == k) {
                    var q = h.content,
						d = h.container,
						g, e, s = {}, a = {}, c = "left",
						n, o;
                    "scrolly" == k && (c = "top");
                    var w = function (d) {
                        var f = {};
                        "scrolly" == k ? (o = h.viewSize[1], n = d.pageY - e, f.top = s.top + n, d = d.pageY >= a.top && d.pageY <= a.bottom) : (o = h.viewSize[0], n = d.pageX - g, f.left = s.left + n, d = d.pageX >= a.left && d.pageX <= a.right);
                        h.anim && (h.anim.stop(), h.anim = void 0);
                        if (d) {
                            if (p.circular) {
                                var d = h.activeIndex,
									j = h.length - 1;
                                d == j ? i.adjustPosition.call(h, h.panels, 0, c, o) : 0 == d && i.adjustPosition.call(h, h.panels, j, c, o)
                            }
                            b.offset(q, f)
                        } else l.stopDrag()
                    }, r = function () {
                        var a = h.activeIndex,
							b = h.length - 1;
                        if (!p.circular && (0 > n && a == b || 0 < n && 0 == a)) i.Effects[k].call(h, void 0, void 0, !0);
                        else {
                            if (!(0 > n && a == b) && !(0 < n && 0 == a) && (0 == a || a == b)) i.resetPosition.call(h, h.panels, 0 == a ? b : 0, c, o);
                            h[0 > n ? "next" : "prev"]();
                            h.start && h.start()
                        }
                    };
                    p.mouseAsTouch && (j = f.require("dd/base"));
                    if (j) {
                        var l = new j.Draggable({
                            node: q
                        });
                        l.on("dragstart", function () {
                            if ("relative" == h.panels[h.activeIndex].style.position) l.stopDrag();
                            else {
                                h.stop && h.stop();
                                s = b.offset(q);
                                var c = b.offset(d);
                                c.bottom = c.top + d.offsetHeight;
                                c.right = c.left + d.offsetWidth;
                                a = c
                            }
                            g = l.get("startMousePos").left;
                            e = l.get("startMousePos").top
                        });
                        l.on("drag", w);
                        l.on("dragend", r);
                        h.__touchDD = l
                    }
                }
            }
        },
        destroy: function (b) {
            var f;
            (f = b.__touchDD) && f.destroy()
        }
    })
}, {
    requires: ["dom", "event", "./base", KISSY.Features.isTouchSupported() ? "dd/base" : ""]
});