﻿KISSY.add("event/dom/base/api", function (g, f, b, c, j, l, m) {
    function k(a, b) {
        var d = c[b] || {};
        a.originalType || (a.selector ? d.delegateFix && (a.originalType = b, b = d.delegateFix) : d.onFix && (a.originalType = b, b = d.onFix));
        return b
    }
    function n(a, b, d) {
        var i, h, c, d = g.merge(d),
			b = k(d, b);
        i = l.getCustomEvents(a, 1);
        if (!(c = i.handle)) c = i.handle = function (a) {
            var b = a.type,
				i = c.currentTarget;
            if (!(l.triggeredEvent == b || "undefined" == typeof KISSY)) if (b = l.getCustomEvent(i, b)) return a.currentTarget = i, a = new m(a), b.notify(a)
        }, c.currentTarget = a;
        if (!(h = i.events)) h = i.events = {};
        i = h[b];
        i || (i = h[b] = new l({
            type: b,
            fn: c,
            currentTarget: a
        }), i.setup());
        i.on(d);
        a = null
    }
    var i = f._Utils;
    g.mix(f, {
        add: function (a, e, d, c) {
            e = g.trim(e);
            a = b.query(a);
            i.batchForType(function (a, b, d, e) {
                d = i.normalizeParam(b, d, e);
                b = d.type;
                for (e = a.length - 1; 0 <= e; e--) n(a[e], b, d)
            }, 1, a, e, d, c);
            return a
        },
        remove: function (a, e, d, c) {
            e = g.trim(e);
            a = b.query(a);
            i.batchForType(function (a, b, d, e) {
                d = i.normalizeParam(b, d, e);
                b = d.type;
                for (e = a.length - 1; 0 <= e; e--) {
                    var c = a[e],
						p = b,
						f = d,
						f = g.merge(f),
						j = void 0,
						p = k(f, p),
						c = l.getCustomEvents(c),
						j = (c || {}).events;
                    if (c && j) if (p) (j = j[p]) && j.detach(f);
                    else for (p in j) j[p].detach(f)
                }
            }, 1, a, e, d, c);
            return a
        },
        delegate: function (a, b, d, i, c) {
            return f.add(a, b, {
                fn: i,
                context: c,
                selector: d
            })
        },
        undelegate: function (a, b, d, i, c) {
            return f.remove(a, b, {
                fn: i,
                context: c,
                selector: d
            })
        },
        fire: function (a, e, d, c) {
            var h = void 0,
				d = d || {};
            d.synthetic = 1;
            i.splitAndRun(e, function (e) {
                d.type = e;
                var f, j, k, e = i.getTypedGroups(e);
                (j = e[1]) && (j = i.getGroupsRe(j));
                e = e[0];
                g.mix(d, {
                    type: e,
                    _ks_groups: j
                });
                a = b.query(a);
                for (j = a.length - 1; 0 <= j; j--) f = a[j], k = l.getCustomEvent(f, e), !c && !k && (k = new l({
                    type: e,
                    currentTarget: f
                })), k && (f = k.fire(d, c), !1 !== h && (h = f))
            });
            return h
        },
        fireHandler: function (a, b, i) {
            return f.fire(a, b, i, 1)
        },
        _clone: function (a, b) {
            var i;
            (i = l.getCustomEvents(a)) && g.each(i.events, function (a, i) {
                g.each(a.observers, function (a) {
                    n(b, i, a)
                })
            })
        },
        _ObservableDOMEvent: l
    });
    f.on = f.add;
    f.detach = f.remove;
    return f
}, {
    requires: "event/base,dom,./special,./utils,./observable,./object".split(",")
});
KISSY.add("event/dom/base", function (g, f, b, c, j, l) {
    g.mix(f, {
        KeyCodes: b,
        _DOMUtils: c,
        Gesture: j,
        _Special: l
    });
    return f
}, {
    requires: "event/base,./base/key-codes,./base/utils,./base/gesture,./base/special,./base/api,./base/mouseenter,./base/mousewheel,./base/valuechange".split(",")
});
KISSY.add("event/dom/base/gesture", function () {
    return {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup",
        tap: "click",
        doubleTap: "dblclick"
    }
});
KISSY.add("event/dom/base/key-codes", function (g) {
    var f = g.UA,
		b = {
		    MAC_ENTER: 3,
		    BACKSPACE: 8,
		    TAB: 9,
		    NUM_CENTER: 12,
		    ENTER: 13,
		    SHIFT: 16,
		    CTRL: 17,
		    ALT: 18,
		    PAUSE: 19,
		    CAPS_LOCK: 20,
		    ESC: 27,
		    SPACE: 32,
		    PAGE_UP: 33,
		    PAGE_DOWN: 34,
		    END: 35,
		    HOME: 36,
		    LEFT: 37,
		    UP: 38,
		    RIGHT: 39,
		    DOWN: 40,
		    PRINT_SCREEN: 44,
		    INSERT: 45,
		    DELETE: 46,
		    ZERO: 48,
		    ONE: 49,
		    TWO: 50,
		    THREE: 51,
		    FOUR: 52,
		    FIVE: 53,
		    SIX: 54,
		    SEVEN: 55,
		    EIGHT: 56,
		    NINE: 57,
		    QUESTION_MARK: 63,
		    A: 65,
		    B: 66,
		    C: 67,
		    D: 68,
		    E: 69,
		    F: 70,
		    G: 71,
		    H: 72,
		    I: 73,
		    J: 74,
		    K: 75,
		    L: 76,
		    M: 77,
		    N: 78,
		    O: 79,
		    P: 80,
		    Q: 81,
		    R: 82,
		    S: 83,
		    T: 84,
		    U: 85,
		    V: 86,
		    W: 87,
		    X: 88,
		    Y: 89,
		    Z: 90,
		    META: 91,
		    WIN_KEY_RIGHT: 92,
		    CONTEXT_MENU: 93,
		    NUM_ZERO: 96,
		    NUM_ONE: 97,
		    NUM_TWO: 98,
		    NUM_THREE: 99,
		    NUM_FOUR: 100,
		    NUM_FIVE: 101,
		    NUM_SIX: 102,
		    NUM_SEVEN: 103,
		    NUM_EIGHT: 104,
		    NUM_NINE: 105,
		    NUM_MULTIPLY: 106,
		    NUM_PLUS: 107,
		    NUM_MINUS: 109,
		    NUM_PERIOD: 110,
		    NUM_DIVISION: 111,
		    F1: 112,
		    F2: 113,
		    F3: 114,
		    F4: 115,
		    F5: 116,
		    F6: 117,
		    F7: 118,
		    F8: 119,
		    F9: 120,
		    F10: 121,
		    F11: 122,
		    F12: 123,
		    NUMLOCK: 144,
		    SEMICOLON: 186,
		    DASH: 189,
		    EQUALS: 187,
		    COMMA: 188,
		    PERIOD: 190,
		    SLASH: 191,
		    APOSTROPHE: 192,
		    SINGLE_QUOTE: 222,
		    OPEN_SQUARE_BRACKET: 219,
		    BACKSLASH: 220,
		    CLOSE_SQUARE_BRACKET: 221,
		    WIN_KEY: 224,
		    MAC_FF_META: 224,
		    WIN_IME: 229,
		    isTextModifyingKeyEvent: function (c) {
		        if (c.altKey && !c.ctrlKey || c.metaKey || c.keyCode >= b.F1 && c.keyCode <= b.F12) return !1;
		        switch (c.keyCode) {
		            case b.ALT:
		            case b.CAPS_LOCK:
		            case b.CONTEXT_MENU:
		            case b.CTRL:
		            case b.DOWN:
		            case b.END:
		            case b.ESC:
		            case b.HOME:
		            case b.INSERT:
		            case b.LEFT:
		            case b.MAC_FF_META:
		            case b.META:
		            case b.NUMLOCK:
		            case b.NUM_CENTER:
		            case b.PAGE_DOWN:
		            case b.PAGE_UP:
		            case b.PAUSE:
		            case b.PRINT_SCREEN:
		            case b.RIGHT:
		            case b.SHIFT:
		            case b.UP:
		            case b.WIN_KEY:
		            case b.WIN_KEY_RIGHT:
		                return !1;
		            default:
		                return !0
		        }
		    },
		    isCharacterKey: function (c) {
		        if (c >= b.ZERO && c <= b.NINE || c >= b.NUM_ZERO && c <= b.NUM_MULTIPLY || c >= b.A && c <= b.Z || f.webkit && 0 == c) return !0;
		        switch (c) {
		            case b.SPACE:
		            case b.QUESTION_MARK:
		            case b.NUM_PLUS:
		            case b.NUM_MINUS:
		            case b.NUM_PERIOD:
		            case b.NUM_DIVISION:
		            case b.SEMICOLON:
		            case b.DASH:
		            case b.EQUALS:
		            case b.COMMA:
		            case b.PERIOD:
		            case b.SLASH:
		            case b.APOSTROPHE:
		            case b.SINGLE_QUOTE:
		            case b.OPEN_SQUARE_BRACKET:
		            case b.BACKSLASH:
		            case b.CLOSE_SQUARE_BRACKET:
		                return !0;
		            default:
		                return !1
		        }
		    }
		};
    return b
});
KISSY.add("event/dom/base/mouseenter", function (g, f, b, c) {
    g.each([{
        name: "mouseenter",
        fix: "mouseover"
    }, {
        name: "mouseleave",
        fix: "mouseout"
    }], function (f) {
        c[f.name] = {
            onFix: f.fix,
            delegateFix: f.fix,
            handle: function (c, f, j) {
                var g = c.currentTarget,
					i = c.relatedTarget;
                if (!i || i !== g && !b.contains(g, i)) return [f.simpleNotify(c, j)]
            }
        }
    });
    return f
}, {
    requires: ["./api", "dom", "./special"]
});
KISSY.add("event/dom/base/mousewheel", function (g, f) {
    var b = g.UA.gecko ? "DOMMouseScroll" : "mousewheel";
    f.mousewheel = {
        onFix: b,
        delegateFix: b
    }
}, {
    requires: ["./special"]
});
KISSY.add("event/dom/base/object", function (g, f, b) {
    function c(a) {
        this.scale = this.rotation = this.targetTouches = this.touches = this.changedTouches = this.which = this.wheelDelta = this.view = this.toElement = this.srcElement = this.shiftKey = this.screenY = this.screenX = this.relatedTarget = this.relatedNode = this.prevValue = this.pageY = this.pageX = this.offsetY = this.offsetX = this.newValue = this.metaKey = this.keyCode = this.handler = this.fromElement = this.eventPhase = this.detail = this.data = this.ctrlKey = this.clientY = this.clientX = this.charCode = this.cancelable = this.button = this.bubbles = this.attrName = this.attrChange = this.altKey = b;
        c.superclass.constructor.call(this);
        this.originalEvent = a;
        this.isDefaultPrevented = a.defaultPrevented || a.returnValue === n || a.getPreventDefault && a.getPreventDefault() ? function () {
            return k
        } : function () {
            return n
        };
        j(this);
        l(this)
    }
    function j(a) {
        for (var e = a.originalEvent, d = i.length, c, h = e.currentTarget, h = 9 === h.nodeType ? h : h.ownerDocument || m; d; ) c = i[--d], a[c] = e[c];
        a.target || (a.target = a.srcElement || h);
        3 === a.target.nodeType && (a.target = a.target.parentNode);
        !a.relatedTarget && a.fromElement && (a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement);
        a.pageX === b && a.clientX !== b && (e = h.documentElement, d = h.body, a.pageX = a.clientX + (e && e.scrollLeft || d && d.scrollLeft || 0) - (e && e.clientLeft || d && d.clientLeft || 0), a.pageY = a.clientY + (e && e.scrollTop || d && d.scrollTop || 0) - (e && e.clientTop || d && d.clientTop || 0));
        a.which === b && (a.which = a.charCode === b ? a.keyCode : a.charCode);
        a.metaKey === b && (a.metaKey = a.ctrlKey);
        !a.which && a.button !== b && (a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0)
    }
    function l(a) {
        var i, d, c, h = a.detail;
        a.wheelDelta && (c = a.wheelDelta / 120);
        a.detail && (c = -(0 == h % 3 ? h / 3 : h));
        a.axis !== b && (a.axis === a.HORIZONTAL_AXIS ? (d = 0, i = -1 * c) : a.axis === a.VERTICAL_AXIS && (i = 0, d = c));
        a.wheelDeltaY !== b && (d = a.wheelDeltaY / 120);
        a.wheelDeltaX !== b && (i = -1 * a.wheelDeltaX / 120);
        !i && !d && (d = c);
        (i !== b || d !== b || c !== b) && g.mix(a, {
            deltaY: d,
            delta: c,
            deltaX: i
        })
    }
    var m = g.Env.host.document,
		k = !0,
		n = !1,
		i = "type,altKey,attrChange,attrName,bubbles,button,cancelable,charCode,clientX,clientY,ctrlKey,currentTarget,data,detail,eventPhase,fromElement,handler,keyCode,metaKey,newValue,offsetX,offsetY,pageX,pageY,prevValue,relatedNode,relatedTarget,screenX,screenY,shiftKey,srcElement,target,toElement,view,wheelDelta,which,axis,changedTouches,touches,targetTouches,rotation,scale".split(",");
    g.extend(c, f._Object, {
        constructor: c,
        preventDefault: function () {
            var a = this.originalEvent;
            a.preventDefault ? a.preventDefault() : a.returnValue = n;
            c.superclass.preventDefault.call(this)
        },
        stopPropagation: function () {
            var a = this.originalEvent;
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = k;
            c.superclass.stopPropagation.call(this)
        }
    });
    return f.DOMEventObject = c
}, {
    requires: ["event/base"]
});
KISSY.add("event/dom/base/observable", function (g, f, b, c, j, l, m) {
    function k(b) {
        g.mix(this, b);
        this.reset()
    }
    var n = m._Utils;
    g.extend(k, m._ObservableEvent, {
        setup: function () {
            var i = this.type,
				a = b[i] || {}, e = this.currentTarget,
				d = c.data(e).handle;
            (!a.setup || !1 === a.setup.call(e, i)) && c.simpleAdd(e, i, d)
        },
        constructor: k,
        reset: function () {
            k.superclass.reset.call(this);
            this.lastCount = this.delegateCount = 0
        },
        notify: function (b) {
            var a = b.target,
				c = this.currentTarget,
				d = this.observers,
				j = [],
				h, g, r = this.delegateCount || 0,
				l, k;
            if (r && !a.disabled) for (; a != c; ) {
                l = [];
                for (g = 0; g < r; g++) k = d[g], f.test(a, k.selector) && l.push(k);
                l.length && j.push({
                    currentTarget: a,
                    currentTargetObservers: l
                });
                a = a.parentNode || c
            }
            j.push({
                currentTarget: c,
                currentTargetObservers: d.slice(r)
            });
            g = 0;
            for (a = j.length; !b.isPropagationStopped() && g < a; ++g) {
                c = j[g];
                l = c.currentTargetObservers;
                c = c.currentTarget;
                b.currentTarget = c;
                for (c = 0; !b.isImmediatePropagationStopped() && c < l.length; c++) d = l[c], d = d.notify(b, this), !1 !== h && (h = d)
            }
            return h
        },
        fire: function (c, a) {
            var c = c || {}, e = this.type,
				d = b[e];
            d && d.onFix && (e = d.onFix);
            var j, h, d = this.currentTarget,
				m = !0;
            c.type = e;
            c instanceof l || (h = c, c = new l({
                currentTarget: d,
                target: d
            }), g.mix(c, h));
            h = d;
            j = f.getWindow(h.ownerDocument || h);
            var r = j.document,
				s = [],
				n = 0,
				q = "on" + e;
            do s.push(h), h = h.parentNode || h.ownerDocument || h === r && j;
            while (h);
            h = s[n];
            do {
                c.currentTarget = h;
                if (j = k.getCustomEvent(h, e)) j = j.notify(c), !1 !== m && (m = j);
                h[q] && !1 === h[q].call(h) && c.preventDefault();
                h = s[++n]
            } while (!a && h && !c.isPropagationStopped());
            if (!a && !c.isDefaultPrevented()) {
                var o;
                try {
                    if (q && d[e] && ("focus" !== e && "blur" !== e || 0 !== d.offsetWidth) && !g.isWindow(d)) (o = d[q]) && (d[q] = null), k.triggeredEvent = e, d[e]()
                } catch (t) { }
                o && (d[q] = o);
                k.triggeredEvent = ""
            }
            return m
        },
        on: function (c) {
            var a = this.observers,
				e = b[this.type] || {}, c = c instanceof j ? c : new j(c); -1 == this.findObserver(c) && (c.selector ? (a.splice(this.delegateCount, 0, c), this.delegateCount++) : c.last ? (a.push(c), this.lastCount++) : a.splice(a.length - this.lastCount, 0, c), e.add && e.add.call(this.currentTarget, c))
        },
        detach: function (c) {
            var a, e = b[this.type] || {}, d = "selector" in c,
				j = c.selector,
				h = c.context,
				f = c.fn,
				g = this.currentTarget,
				l = this.observers,
				c = c.groups;
            if (l.length) {
                c && (a = n.getGroupsRe(c));
                var k, m, o, t, v = l.length;
                if (f || d || a) {
                    h = h || g;
                    k = c = 0;
                    for (m = []; c < v; ++c) o = l[c], t = o.context || g, h != t || f && f != o.fn || d && (j && j != o.selector || !j && !o.selector) || a && !o.groups.match(a) ? m[k++] = o : (o.selector && this.delegateCount && this.delegateCount--, o.last && this.lastCount && this.lastCount--, e.remove && e.remove.call(g, o));
                    this.observers = m
                } else this.reset();
                this.checkMemory()
            }
        },
        checkMemory: function () {
            var j = this.type,
				a, e, d = b[j] || {}, f = this.currentTarget,
				h = c.data(f);
            if (h && (a = h.events, this.hasObserver() || (e = h.handle, (!d.tearDown || !1 === d.tearDown.call(f, j)) && c.simpleRemove(f, j, e), delete a[j]), g.isEmptyObject(a))) h.handle = null, c.removeData(f)
        }
    });
    k.triggeredEvent = "";
    k.getCustomEvent = function (b, a) {
        var e = c.data(b),
			d;
        e && (d = e.events);
        if (d) return d[a]
    };
    k.getCustomEvents = function (b, a) {
        var e = c.data(b);
        !e && a && c.data(b, e = {});
        return e
    };
    return k
}, {
    requires: "dom,./special,./utils,./observer,./object,event/base".split(",")
});
KISSY.add("event/dom/base/observer", function (g, f, b) {
    function c(b) {
        c.superclass.constructor.apply(this, arguments)
    }
    g.extend(c, b._Observer, {
        keys: "fn,selector,data,context,originalType,groups,last".split(","),
        notifyInternal: function (c, b) {
            var g, k, n = c.type;
            this.originalType && (c.type = this.originalType);
            (g = f[c.type]) && g.handle ? (g = g.handle(c, this, b)) && 0 < g.length && (k = g[0]) : k = this.simpleNotify(c, b);
            c.type = n;
            return k
        }
    });
    return c
}, {
    requires: ["./special", "event/base"]
});
KISSY.add("event/dom/base/special", function () {
    return {}
});
KISSY.add("event/dom/base/utils", function (g, f) {
    var b = g.Env.host.document;
    return {
        simpleAdd: b && b.addEventListener ? function (c, b, f, g) {
            c.addEventListener && c.addEventListener(b, f, !!g)
        } : function (c, b, f) {
            c.attachEvent && c.attachEvent("on" + b, f)
        },
        simpleRemove: b && b.removeEventListener ? function (c, b, f, g) {
            c.removeEventListener && c.removeEventListener(b, f, !!g)
        } : function (b, f, g) {
            b.detachEvent && b.detachEvent("on" + f, g)
        },
        data: function (b, g) {
            return f.data(b, "ksEventTargetId_1.30", g)
        },
        removeData: function (b) {
            return f.removeData(b,
				"ksEventTargetId_1.30")
        }
    }
}, {
    requires: ["dom"]
});
KISSY.add("event/dom/base/valuechange", function (g, f, b, c) {
    function j(a) {
        if (b.hasData(a, h)) {
            var c = b.data(a, h);
            clearTimeout(c);
            b.removeData(a, h)
        }
    }
    function l(b) {
        j(b.target)
    }
    function m(a) {
        var c = a.value,
			d = b.data(a, p);
        c !== d && (f.fireHandler(a, e, {
            prevVal: d,
            newVal: c
        }), b.data(a, p, c))
    }
    function k(a) {
        b.hasData(a, h) || b.data(a, h, setTimeout(function () {
            m(a);
            b.data(a, h, setTimeout(arguments.callee, u))
        }, u))
    }
    function n(a) {
        var c = a.target;
        "focus" == a.type && b.data(c, p, c.value);
        k(c)
    }
    function i(a) {
        m(a.target)
    }
    function a(a) {
        b.removeData(a,
		p);
        j(a);
        f.remove(a, "blur", l);
        f.remove(a, "webkitspeechchange", i);
        f.remove(a, "mousedown keyup keydown focus", n)
    }
    var e = "valuechange",
		d = b.nodeName,
		p = "event/valuechange/history",
		h = "event/valuechange/poll",
		u = 50;
    c[e] = {
        setup: function () {
            var b = d(this);
            if ("input" == b || "textarea" == b) a(this), f.on(this, "blur", l), f.on(this, "webkitspeechchange", i), f.on(this, "mousedown keyup keydown focus", n)
        },
        tearDown: function () {
            a(this)
        }
    };
    return f
}, {
    requires: ["./api", "dom", "./special"]
});