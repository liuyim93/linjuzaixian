﻿KISSY.add("component/base", function (d, g, e, c, h, a, b, i) {
    d.mix(g, {
        Controller: e,
        Render: c,
        Container: h,
        DelegateChildren: a,
        DecorateChild: i,
        DecorateChildren: b
    });
    return g
}, {
    requires: "./base/impl,./base/controller,./base/render,./base/container,./base/delegate-children,./base/decorate-children,./base/decorate-child".split(",")
});
KISSY.add("component/base/box-render", function (d) {
    function g() { }
    var e = d.all,
		c = d.UA,
		h = d.Env.host.document;
    g.ATTRS = {
        el: {
            setter: function (a) {
                return e(a)
            }
        },
        elCls: {},
        elStyle: {},
        width: {},
        height: {},
        elTagName: {
            value: "div"
        },
        elAttrs: {},
        content: {},
        elBefore: {},
        render: {},
        visible: {
            value: !0
        },
        visibleMode: {
            value: "display"
        },
        contentEl: {
            valueFn: function () {
                return this.get("el")
            }
        }
    };
    g.HTML_PARSER = {
        el: function (a) {
            return a
        },
        content: function (a) {
            return (this.get("contentEl") || a).html()
        }
    };
    g.prototype = {
        __createDom: function () {
            var a,
			b;
            this.get("srcNode") || (b = this.get("contentEl"), a = e("<" + this.get("elTagName") + ">"), b && a.append(b), this.setInternal("el", a), b || this.setInternal("contentEl", a))
        },
        __renderUI: function () {
            if (!this.get("srcNode")) {
                var a = this.get("render"),
					b = this.get("el"),
					i = this.get("elBefore");
                i ? b.insertBefore(i, void 0) : a ? b.appendTo(a, void 0) : b.appendTo(h.body, void 0)
            }
        },
        _onSetElAttrs: function (a) {
            this.get("el").attr(a)
        },
        _onSetElCls: function (a) {
            this.get("el").addClass(a)
        },
        _onSetElStyle: function (a) {
            this.get("el").css(a)
        },
        _onSetWidth: function (a) {
            this.get("el").width(a)
        },
        _onSetHeight: function (a) {
            this.get("el").height(a)
        },
        _onSetContent: function (a) {
            var b = this.get("contentEl");
            if (!this.get("srcNode") || this.get("rendered")) "string" == typeof a ? b.html(a) : a && b.empty().append(a);
            9 > c.ie && !this.get("allowTextSelection") && b.unselectable(void 0)
        },
        _onSetVisible: function (a) {
            var b = this.get("el"),
				i = this.getCssClassWithState("-shown"),
				c = this.getCssClassWithState("-hidden"),
				d = this.get("visibleMode");
            a ? (b.removeClass(c), b.addClass(i)) : (b.removeClass(i), b.addClass(c));
            "visibility" == d ? b.css("visibility", a ? "visible" : "hidden") : b.css("display", a ? "" : "none")
        },
        __destructor: function () {
            var a = this.get("el");
            a && a.remove()
        }
    };
    return g
}, {
    requires: ["node"]
});
KISSY.add("component/base/box", function () {
    function d() { }
    d.ATTRS = {
        content: {
            view: 1
        },
        width: {
            view: 1
        },
        height: {
            view: 1
        },
        elCls: {
            view: 1
        },
        elStyle: {
            view: 1
        },
        elAttrs: {
            view: 1
        },
        elBefore: {
            view: 1
        },
        el: {
            view: 1
        },
        render: {
            view: 1
        },
        visibleMode: {
            view: 1
        },
        visible: {
            value: !0,
            view: 1
        },
        srcNode: {
            view: 1
        }
    };
    d.prototype = {
        _onSetVisible: function (d) {
            this.get("rendered") && this.fire(d ? "show" : "hide")
        },
        show: function () {
            this.render();
            this.set("visible", !0);
            return this
        },
        hide: function () {
            this.set("visible", !1);
            return this
        }
    };
    return d
});
KISSY.add("component/base/container", function (d, g, e, c) {
    return g.extend([e, c])
}, {
    requires: ["./controller", "./delegate-children", "./decorate-children"]
});
KISSY.add("component/base/controller", function (d, g, e, c, h, a, b, i) {
    function o(a) {
        return function (b) {
            this == b.target && (b = b.newVal, this.get("view").set(a, b))
        }
    }
    function t(a) {
        return function (b) {
            var c = this.get("view");
            return b === i ? c.get(a) : b
        }
    }
    function u(j) {
        var b, c, e, f = {}, h, g = j.get("xrender");
        b = j.getAttrs();
        for (e in b) if (c = b[e], c.view) {
            if ((h = j.get(e)) !== i) f[e] = h;
            j.on("after" + d.ucfirst(e) + "Change", o(e));
            c.getter = t(e)
        }
        j = j.constructor;
        for (c = []; j && j != r; ) (b = a.getXClassByConstructor(j)) && c.push(b), j = j.superclass && j.superclass.constructor;
        j = c.join(" ");
        f.ksComponentCss = j;
        return new g(f)
    }
    function s(a, b) {
        var c = a.relatedTarget;
        return c && (c === b[0] || b.contains(c))
    }
    function f(a, b) {
        return function (c) {
            if (!a.get("disabled")) a[b](c)
        }
    }
    var k = d.Env.host.document.documentMode || d.UA.ie,
		l = d.Features,
		p = e.Gesture,
		n = ".-ks-component-focus" + d.now(),
		m = ".-ks-component-mouse" + d.now(),
		q = l.isTouchSupported(),
		r = h.extend([g], {
		    isController: !0,
		    getCssClassWithPrefix: a.getCssClassWithPrefix,
		    initializer: function () {
		        this.setInternal("view",
				u(this))
		    },
		    createDom: function () {
		        var a;
		        a = this.get("view");
		        a.create(i);
		        a = a.getKeyEventTarget();
		        this.get("allowTextSelection") || a.unselectable(i)
		    },
		    renderUI: function () {
		        var a, b, c;
		        this.get("view").render();
		        b = this.get("children").concat();
		        for (a = this.get("children").length = 0; a < b.length; a++) c = this.addChild(b[a]), c.render()
		    },
		    _onSetFocusable: function (a) {
		        var b = this.getKeyEventTarget();
		        if (a) b.attr("tabIndex", 0).attr("hideFocus", !0).on("focus" + n, f(this, "handleFocus")).on("blur" + n, f(this, "handleBlur")).on("keydown" + n, f(this, "handleKeydown"));
		        else b.removeAttr("tabIndex"), b.detach(n)
		    },
		    _onSetHandleMouseEvents: function (a) {
		        var b = this.get("el");
		        if (a) {
		            if (!q) b.on("mouseenter" + m, f(this, "handleMouseEnter")).on("mouseleave" + m, f(this, "handleMouseLeave")).on("contextmenu" + m, f(this, "handleContextMenu"));
		            b.on(p.start + m, f(this, "handleMouseDown")).on(p.end + m, f(this, "handleMouseUp")).on(p.tap + m, f(this, "performActionInternal"));
		            if (k && 9 > k) b.on("dblclick" + m, f(this, "handleDblClick"))
		        } else b.detach(m)
		    },
		    _onSetFocused: function (a) {
		        a && this.getKeyEventTarget()[0].focus()
		    },
		    getContentElement: function () {
		        return this.get("view").getContentElement()
		    },
		    getKeyEventTarget: function () {
		        return this.get("view").getKeyEventTarget()
		    },
		    addChild: function (a, b) {
		        var d = this.get("children"),
					e;
		        b === i && (b = d.length);
		        e = d[b] && d[b].get("el") || null;
		        var f = a;
		        this.create();
		        var h = this.getContentElement(),
					f = c.create(f, this);
		        f.setInternal("parent", this);
		        f.set("render", h);
		        f.set("elBefore", e);
		        f.create(i);
		        a = f;
		        d.splice(b, 0, a);
		        this.get("rendered") && a.render();
		        return a
		    },
		    removeChild: function (a,
			b) {
		        var c = this.get("children"),
					i = d.indexOf(a, c); -1 != i && c.splice(i, 1);
		        b && a.destroy && a.destroy();
		        return a
		    },
		    removeChildren: function (a) {
		        var b, c = [].concat(this.get("children"));
		        for (b = 0; b < c.length; b++) this.removeChild(c[b], a);
		        return this
		    },
		    getChildAt: function (a) {
		        return this.get("children")[a] || null
		    },
		    handleDblClick: function (a) {
		        this.performActionInternal(a)
		    },
		    handleMouseOver: function (a) {
		        var b = this.get("el");
		        s(a, b) || this.handleMouseEnter(a)
		    },
		    handleMouseOut: function (a) {
		        var b = this.get("el");
		        s(a, b) || this.handleMouseLeave(a)
		    },
		    handleMouseEnter: function (a) {
		        this.set("highlighted", !!a)
		    },
		    handleMouseLeave: function (a) {
		        this.set("active", !1);
		        this.set("highlighted", !a)
		    },
		    handleMouseDown: function (a) {
		        var b;
		        if (1 == a.which || q) if (b = this.getKeyEventTarget(), this.get("activeable") && this.set("active", !0), this.get("focusable") && (b[0].focus(), this.set("focused", !0)), !this.get("allowTextSelection")) b = (b = a.target.nodeName) && b.toLowerCase(), "input" != b && "textarea" != b && a.preventDefault()
		    },
		    handleMouseUp: function (a) {
		        this.get("active") && (1 == a.which || q) && this.set("active", !1)
		    },
		    handleContextMenu: function () { },
		    handleFocus: function (a) {
		        this.set("focused", !!a);
		        this.fire("focus")
		    },
		    handleBlur: function (a) {
		        this.set("focused", !a);
		        this.fire("blur")
		    },
		    handleKeyEventInternal: function (a) {
		        if (a.keyCode == e.KeyCodes.ENTER) return this.performActionInternal(a)
		    },
		    handleKeydown: function (a) {
		        if (this.handleKeyEventInternal(a)) return a.halt(), !0
		    },
		    performActionInternal: function () { },
		    destructor: function () {
		        var a, b = this.get("children");
		        for (a = 0; a < b.length; a++) b[a].destroy && b[a].destroy();
		        this.get("view").destroy()
		    }
		}, {
		    ATTRS: {
		        handleMouseEvents: {
		            value: !0
		        },
		        focusable: {
		            value: !0,
		            view: 1
		        },
		        allowTextSelection: {
		            view: 1,
		            value: !1
		        },
		        activeable: {
		            value: !0
		        },
		        focused: {
		            view: 1
		        },
		        active: {
		            view: 1
		        },
		        highlighted: {
		            view: 1
		        },
		        children: {
		            value: []
		        },
		        prefixCls: {
		            value: d.config("component/prefixCls") || "ks-",
		            view: 1
		        },
		        parent: {
		            setter: function (a) {
		                this.addTarget(a)
		            }
		        },
		        disabled: {
		            view: 1
		        },
		        xrender: {
		            value: b
		        },
		        defaultChildXClass: {}
		    }
		}, {
		    xclass: "controller"
		});
    return r
}, {
    requires: "./box,event,./impl,./uibase,./manager,./render".split(",")
});
KISSY.add("component/base/decorate-child", function (d, g) {
    function e() { }
    d.augment(e, g, {
        decorateInternal: function (c) {
            this.set("el", c);
            var d = this.get("decorateChildCls"),
				a = this.get("prefixCls");
            if (c = c.one("." + d)) (a = this.findUIConstructorByNode(a, c, 1)) ? this.decorateChildrenInternal(a, c) : this.decorateChildren(c)
        }
    });
    return e
}, {
    requires: ["./decorate-children"]
});
KISSY.add("component/base/decorate-children", function (d, g) {
    function e() { }
    d.augment(e, {
        decorateInternal: function (c) {
            this.set("el", c);
            this.decorateChildren(c)
        },
        findUIConstructorByNode: function (c, d, a, b) {
            d = d[0].className || "";
            d = d.replace(RegExp("\\b" + c, "ig"), "");
            return g.getConstructorByXClass(d) || b && g.getConstructorByXClass(b)
        },
        decorateChildrenInternal: function (c, d) {
            this.addChild(new c({
                srcNode: d,
                prefixCls: this.get("prefixCls")
            }))
        },
        decorateChildren: function (c) {
            var d = this,
				a = d.get("prefixCls"),
				b = d.get("defaultChildXClass");
            c.children().each(function (c) {
                var e = d.findUIConstructorByNode(a, c, 0, b);
                d.decorateChildrenInternal(e, c)
            })
        }
    });
    return e
}, {
    requires: ["./manager"]
});
KISSY.add("component/base/delegate-children", function (d, g) {
    function e() { }
    function c(a) {
        if (!this.get("disabled")) {
            var c = this.getOwnerControl(a.target, a);
            if (c && !c.get("disabled")) switch (a.type) {
                case b.start:
                    c.handleMouseDown(a);
                    break;
                case b.end:
                    c.handleMouseUp(a);
                    break;
                case b.tap:
                    c.performActionInternal(a);
                    break;
                case "mouseover":
                    c.handleMouseOver(a);
                    break;
                case "mouseout":
                    c.handleMouseOut(a);
                    break;
                case "contextmenu":
                    c.handleContextMenu(a);
                    break;
                case "dblclick":
                    c.handleDblClick(a)
            }
        }
    }
    var h = d.UA,
		a = d.Env.host.document.documentMode || h.ie,
		b = g.Gesture,
		i = d.Features.isTouchSupported();
    e.ATTRS = {
        delegateChildren: {
            value: !0
        }
    };
    d.augment(e, {
        __bindUI: function () {
            var d;
            this.get("delegateChildren") && (d = b.start + " " + b.end + " " + b.tap + " ", i || (d += "mouseover mouseout contextmenu " + (a && 9 > a ? "dblclick " : "")), this.get("el").on(d, c, this))
        },
        getOwnerControl: function (a) {
            for (var b = this.get("children"), c = b.length, d = this.get("el")[0]; a && a !== d; ) {
                for (var i = 0; i < c; i++) if (b[i].get("el")[0] === a) return b[i];
                a = a.parentNode
            }
            return null
        }
    });
    return e
}, {
    requires: ["event"]
});
KISSY.add("component/base/impl", function (d, g, e) {
    return {
        Manager: e,
        UIBase: g,
        create: function (c, d) {
            var a;
            c && !c.isController && !c.xclass && (c.xclass = d.get("defaultChildXClass"));
            if (c && (a = c.xclass)) d && !c.prefixCls && (c.prefixCls = d.get("prefixCls")), a = e.getConstructorByXClass(a), c = new a(c);
            return c
        }
    }
}, {
    requires: ["./uibase", "./manager"]
});
KISSY.add("component/base/manager", function (d) {
    function g(a) {
        for (var a = d.trim(a).split(/\s+/), b = 0; b < a.length; b++) a[b] && (a[b] = this.get("prefixCls") + a[b]);
        return a.join(" ")
    }
    var e = {}, c = {}, h = {
        __instances: c,
        addComponent: function (a, b) {
            c[a] = b
        },
        removeComponent: function (a) {
            delete c[a]
        },
        getComponent: function (a) {
            return c[a]
        },
        getCssClassWithPrefix: g,
        getXClassByConstructor: function (a) {
            for (var b in e) if (e[b].constructor == a) return b;
            return 0
        },
        getConstructorByXClass: function (a) {
            for (var a = a.split(/\s+/), b = -1, c, d = null, g = 0; g < a.length; g++) {
                var h = e[a[g]];
                if (h && (c = h.priority) > b) b = c, d = h.constructor
            }
            return d
        },
        setConstructorByXClass: function (a, b) {
            d.isFunction(b) ? e[a] = {
                constructor: b,
                priority: 0
            } : (b.priority = b.priority || 0, e[a] = b)
        }
    };
    h.getCssClassWithPrefix = g;
    return h
});
KISSY.add("component/base/render", function (d, g, e, c, h) {
    return c.extend([g], {
        getCssClassWithState: function (a) {
            var b = this.get("ksComponentCss") || "",
				a = a || "";
            return this.getCssClassWithPrefix(b.split(/\s+/).join(a + " ") + a)
        },
        getCssClassWithPrefix: h.getCssClassWithPrefix,
        createDom: function () {
            this.get("el").addClass(this.getCssClassWithState())
        },
        getKeyEventTarget: function () {
            return this.get("el")
        },
        _onSetHighlighted: function (a) {
            var b = this.getCssClassWithState("-hover");
            this.get("el")[a ? "addClass" : "removeClass"](b)
        },
        _onSetDisabled: function (a) {
            var b = this.getCssClassWithState("-disabled");
            this.get("el")[a ? "addClass" : "removeClass"](b).attr("aria-disabled", a);
            this.get("focusable") && this.getKeyEventTarget().attr("tabIndex", a ? -1 : 0)
        },
        _onSetActive: function (a) {
            var b = this.getCssClassWithState("-active");
            this.get("el")[a ? "addClass" : "removeClass"](b).attr("aria-pressed", !!a)
        },
        _onSetFocused: function (a) {
            var b = this.get("el"),
				c = this.getCssClassWithState("-focused");
            b[a ? "addClass" : "removeClass"](c)
        },
        getContentElement: function () {
            return this.get("contentEl") || this.get("el")
        }
    }, {
        ATTRS: {
            prefixCls: {
                value: "ks-"
            },
            focusable: {
                value: !0
            },
            focused: {},
            active: {},
            disabled: {},
            highlighted: {}
        },
        HTML_PARSER: {
            disabled: function () {
                var a = this.getCssClassWithState("-disabled");
                return this.get("el").hasClass(a)
            }
        }
    })
}, {
    requires: ["./box-render", "./impl", "./uibase", "./manager"]
});
KISSY.add("component/base/uibase", function (d, g, e, c, h) {
    var e = d.noop,
		a = g.extend({
		    constructor: function () {
		        var b;
		        a.superclass.constructor.apply(this, arguments);
		        this.decorateInternal && (b = this.get("srcNode")) && this.decorateInternal(b);
		        this.get("autoRender") && this.render()
		    },
		    bindInternal: e,
		    syncInternal: e,
		    initializer: function () {
		        var a, b = d.one(this.get("srcNode"));
		        (a = this.get("id")) && c.addComponent(a, this);
		        if (b) {
		            var e = this.constructor,
						g, h;
		            h = this.collectConstructorChains();
		            for (a = h.length - 1; 0 <= a; a--) if (e = h[a],
					g = e.HTML_PARSER) {
		                var e = b,
							f = void 0,
							k = void 0,
							l = this.userConfig || {};
		                for (f in g) f in l || (k = g[f], d.isFunction(k) ? this.setInternal(f, k.call(this, e)) : "string" == typeof k ? this.setInternal(f, e.one(k)) : d.isArray(k) && k[0] && this.setInternal(f, e.all(k[0])))
		            }
		            this.setInternal("srcNode", b)
		        }
		    },
		    create: function () {
		        this.get("created") || (this.fire("beforeCreateDom"), this.callMethodByHierarchy("createDom", "__createDom"), this.setInternal("created", !0), this.fire("afterCreateDom"), this.callPluginsMethod("createDom"));
		        return this
		    },
		    render: function () {
		        this.get("rendered") || (this.create(h), this.fire("beforeRenderUI"), this.callMethodByHierarchy("renderUI", "__renderUI"), this.fire("afterRenderUI"), this.callPluginsMethod("renderUI"), this.fire("beforeBindUI"), a.superclass.bindInternal.call(this), this.callMethodByHierarchy("bindUI", "__bindUI"), this.fire("afterBindUI"), this.callPluginsMethod("bindUI"), this.fire("beforeSyncUI"), a.superclass.syncInternal.call(this), this.callMethodByHierarchy("syncUI", "__syncUI"), this.fire("afterSyncUI"),
				this.callPluginsMethod("syncUI"), this.setInternal("rendered", !0));
		        return this
		    },
		    createDom: e,
		    renderUI: e,
		    bindUI: e,
		    syncUI: e,
		    plug: function () {
		        var b;
		        b = this.get("plugins");
		        a.superclass.plug.apply(this, arguments);
		        b = b[b.length - 1];
		        this.get("rendered") ? (b.pluginCreateDom && b.pluginCreateDom(this), b.pluginRenderUI && b.pluginRenderUI(this), b.pluginBindUI && b.pluginBindUI(this), b.pluginSyncUI && b.pluginSyncUI(this)) : this.get("created") && b.pluginCreateDom && b.pluginCreateDom(this);
		        return this
		    },
		    destructor: function () {
		        var a;
		        (a = this.get("id")) && c.removeComponent(a)
		    }
		}, {
		    ATTRS: {
		        rendered: {
		            value: !1
		        },
		        created: {
		            value: !1
		        },
		        xclass: {
		            valueFn: function () {
		                return c.getXClassByConstructor(this.constructor)
		            }
		        }
		    }
		}),
		b = a.extend;
    d.mix(a, {
        HTML_PARSER: {},
        extend: function o(a, e, g) {
            var f = d.makeArray(arguments),
				h = {}, l = f[f.length - 1];
            l.xclass && (f.pop(), f.push(l.xclass));
            f = b.apply(this, f);
            d.isArray(a) && (d.each(a.concat(f), function (a) {
                a && d.each(a.HTML_PARSER, function (a, b) {
                    h[b] = a
                })
            }), f.HTML_PARSER = h);
            l.xclass && c.setConstructorByXClass(l.xclass, {
                constructor: f,
                priority: l.priority
            });
            f.extend = o;
            return f
        }
    });
    return a
}, {
    requires: ["rich-base", "node", "./manager"]
});