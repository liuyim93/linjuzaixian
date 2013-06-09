/*pub-1|2013-06-05 17:41:08*/
KISSY.add("order/util/select/option", function (c, d, a) {
    function b(g, h) {
        var e = this;
        e.el = d.get(g);
        e.params = c.merge({ baseCls: "fn-select" }, h);
        var f = e.params.baseCls;
        e.addAttr("value", { value: d.attr(e.el, "data-value"), setter: function (i) {
            d.attr(this.el, "data-value", i);
            return i
        } 
        });
        e.addAttr("disabled", { value: false, setter: function (i) {
            i = !!i;
            d[i ? "addClass" : "removeClass"](this.el, f + "-option-disabled");
            return i
        } 
        });
        e.on("afterDisabledChange", function (i) {
            if (i.newVal && this.get("selected")) {
                this.set("selected", false)
            }
        });
        e.addAttr("html", { value: d.html(e.el), setter: function (i) {
            this.set("text", i);
            return i
        } 
        });
        e.addAttr("text", { value: d.text(e.el), setter: function (i) {
            var j = this.el;
            j.innerHTML = i;
            j.title = d.text(this.el);
            return j.title
        } 
        });
        e.addAttr("selected", { selected: "true" === d.attr(e.el, "data-selected"), setter: function (i) {
            if (this.get("disabled")) {
                return false
            }
            return !!i
        } 
        });
        e.addAttr("class", { setter: function (i) {
            e.addClass(i);
            return i
        }, getter: function () {
            return e.el.className.replace(new RegExp("\b" + f + "[w-]+\b", "g"), "")
        } 
        });
        e.addAttr("idx");
        a.on(g, "mouseenter", function (i) {
            if (!d.hasClass(this, f + "-option-disabled")) {
                e.active();
                e.fire("mouseenter")
            }
        });
        a.on(g, "click", function (i) {
            if (!d.hasClass(this, f + "-option-disabled")) {
                e.set("selected", true);
                e.fire("select")
            }
        })
    }
    c.augment(b, c.Base.Attribute, c.EventTarget, { addClass: function (e) {
        d.addClass(this.el, e)
    }, removeClass: function (e) {
        if (e.indexOf(this.params.baseCls) == -1) {
            d.removeClass(this.el, e)
        }
    }, attr: function (e, f) {
        if (this.hasAttr(e)) {
            return undefined === f ? this.get(e) : this.set(e, f)
        } else {
            return d.attr(this.el, e, f)
        }
    }, load: function (g) {
        var e = this;
        var f = e.el;
        c.each(g || {}, function (i, h) {
            h = h.toLowerCase();
            e.hasAttr(h) ? e.set(h, i) : d.attr(f, h, i)
        })
    }, remove: function () {
        this.fire("remove");
        this.destory()
    }, destory: function () {
        var e = this.el;
        a.remove(e, "click mouseenter");
        d.remove(e)
    }, active: function () {
        d.addClass(this.el, this.params.baseCls + "-option-active")
    }, deactive: function () {
        d.removeClass(this.el, this.params.baseCls + "-option-active")
    } 
    });
    return b
}, { requires: ["dom", "event"] });
KISSY.add("order/util/select", function (d, e, a, c) {
    function f(g, h) {
        this.el = e.get(g);
        this.params = d.merge({ baseCls: "fn-select" }, h);
        this.addAttr("value");
        this.addAttr("selectedIndex", { value: -1 });
        this.on("afterValueChange afterSelectedIndexChange", function (k) {
            var m;
            var i;
            var l;
            var j = this.options;
            if ("selectedIndex" === k.attrName) {
                i = k.newVal - 0;
                if (i >= 0 && i < this.length) {
                    m = j[i];
                    l = m.get("value")
                }
            } else {
                l = k.newVal;
                d.each(j, function (n) {
                    if (n.get("value") === l) {
                        m = n;
                        i = n.get("idx");
                        return false
                    }
                })
            }
            if (m) {
                if (m.get("disabled")) {
                    return
                }
                this.labelEl.innerHTML = m.get("text");
                m.set({ selected: true }, { silent: true })
            } else {
                this.labelEl.innerHTML = ""
            }
            d.each(j, function (n) {
                if (n !== this) {
                    n.set("selected", false, { silent: true })
                }
            }, m);
            this.valueEl.value = l;
            this.set({ selectedIndex: i, value: l }, { silent: true });
            this._selectedOption = m;
            this.fire("change")
        });
        this.addAttr("width", { value: -1, setter: function (i) {
            e.width(this.el, i);
            e.width(this.labelEl.parentNode, i)
        } 
        });
        this.init()
    }
    d.augment(f, d.Base.Attribute, d.EventTarget, { init: function () {
        var g = this;
        var j = this.params;
        var h = j.baseCls;
        g.labelEl = e.get("div." + h + "-label", g.el);
        g.listEl = e.get("div." + h + "-options", g.el);
        g.valueEl = e.get("input", g.el);
        a.on(g.labelEl.parentNode, "keyup", function (l) {
            var k = g._activeOption || g.getSelectedOption();
            if (!k) {
                return
            }
            var m = l.keyCode;
            var n = function (o) {
                o.set("selected", true);
                g._activeOption = o
            };
            if (39 === m || 40 === m) {
                g._lookAroundOption(k, true, n)
            } else {
                if (37 === m || 38 === m) {
                    g._lookAroundOption(k, false, n)
                }
            }
        });
        a.on(document, "keyup", function (l) {
            if (g._focused) {
                var k = g._activeOption || g.getSelectedOption();
                if (!k) {
                    return
                }
                var m = l.keyCode;
                var n = function (o) {
                    g._active(o);
                    g.labelEl.innerHTML = o.get("text")
                };
                if (39 === m || 40 === m) {
                    g._lookAroundOption(k, true, n)
                } else {
                    if (37 === m || 38 === m) {
                        g._lookAroundOption(k, false, n)
                    } else {
                        if (13 === m) {
                            k.set("selected", true);
                            if (g._isShow) {
                                g._hide();
                                g._focused = true
                            }
                        }
                    }
                }
            }
        });
        a.on(g.labelEl.parentNode, "click", function () {
            g._toggle()
        });
        var i;
        a.on(g.el, "click", function () {
            i = true
        });
        a.on(document, "click", function () {
            if (!i && g._isShow) {
                g._toggle()
            }
            i = false
        });
        g.options = [];
        d.each(e.children(g.listEl), function (k) {
            g._addOption(k)
        });
        if (-1 === g.get("selectedIndex")) {
            g._pickSelectedOption()
        }
        this.set("width", j.width)
    }, _active: function (g) {
        if (this._activeOption) {
            this._activeOption.deactive()
        }
        if (g) {
            g.active();
            this._activeOption = g
        }
    }, _lookAroundOption: function (i, k, n) {
        if (i) {
            var h = this.options;
            var j = this.length;
            var l = k ? 1 : -1;
            var g = i.get("idx") + l;
            n = d.isFunction(n) ? n : function () {
            };
            while (g >= 0 && g < j) {
                var m = h[g];
                if (!m.get("disabled")) {
                    n(m);
                    return m
                }
                g += l
            }
        }
    }, _toggle: function () {
        this._isShow ? this._hide() : this._show()
    }, _hide: function () {
        this._isShow = false;
        this._focused = false;
        e.removeClass(this.el, "fn-select-open");
        this._activeOption && this._activeOption.deactive()
    }, _show: function () {
        this._active(this.getSelectedOption());
        e.addClass(this.el, "fn-select-open");
        e.width(this.listEl, e.width(this.el));
        this._isShow = true;
        this._focused = true
    }, getOption: function (n) {
        var m = typeof n;
        var h = this.options;
        var g = h.length;
        if ("number" === m) {
            if (0 <= n && n < g) {
                return h[n]
            }
        } else {
            var l = "function" === m ? n : function (i) {
                return i.get("value") === n
            };
            for (var j = 0; j < g; j++) {
                var k = h[j];
                if (true === l(k)) {
                    return k
                }
            }
        }
    }, getSelectedOption: function (h) {
        var g = this.getOption(this.get("selectedIndex"));
        if (g && d.isFunction(h)) {
            h(g)
        }
        return g
    }, _addOption: function (j) {
        var h = this;
        var g = this.options.length;
        var i = new c(j);
        i.set("idx", g);
        h.options.push(i);
        h.length = g + 1;
        if (e.hasClass(j, "fn-select-active")) {
            h.set("selectedIndex", g)
        }
        i.on("afterSelectedChange", function (k) {
            if (k.newVal) {
                h.set("selectedIndex", this.get("idx"))
            } else {
                if (k.prevVal) {
                    h._pickSelectedOption()
                }
            }
            return true
        });
        i.on("select", function (k) {
            h._hide()
        });
        i.on("remove", function () {
            var k = [];
            d.each(h.options, function (l) {
                if (l !== this) {
                    l.set("idx", k.length);
                    k.push(l)
                }
            }, this);
            h.options = k;
            h.length = k.length;
            if (this.get("selected")) {
                h._pickSelectedOption()
            }
        });
        i.on("mouseenter", function () {
            if (h._activeOption && h._activeOption !== this) {
                h._activeOption.deactive()
            }
            h._activeOption = this
        })
    }, _pickSelectedOption: function () {
        var g;
        d.each(this.options, function (h) {
            if (false === h.get("disabled")) {
                g = h;
                h.set("selected", true);
                return false
            }
        });
        return g
    }, empty: function () {
        d.each(this.options, function (g) {
            g.destory()
        });
        this.options = [];
        this.length = 0;
        this.set({ value: "", selectedIndex: -1 }, { silent: true });
        this.labelEl.innerHTML = ""
    }, refill: function (h) {
        var g = this;
        var i = "";
        g.empty();
        d.each(h, function (j) {
            i += b(j)
        });
        g.listEl.innerHTML = i;
        d.each(e.children(g.listEl), function (j) {
            g._addOption(j)
        });
        if (-1 === g.get("selectedIndex")) {
            g._pickSelectedOption()
        }
    } 
    });
    f.render = function (i, h) {
        var g;
        var j = "";
        if (d.isArray(h) && h.length) {
            d.each(h, function (k) {
                if (k.isSelected) {
                    g = k
                }
                j += b(k)
            });
            g = g || h[0]
        }
        g = g || { value: "", title: "" };
        return '<div class="fn-util fn-select ' + (i.cls ? i.cls : "") + '"><input type="hidden"' + (i.name ? (' name="' + i.name + '"') : "") + ' value="' + g.value + '"/><div class="fn-select-content"><div class="fn-select-label">' + g.title + '</div><span class="fn-select-arrow"><ins></ins></span></div><div class="fn-select-options">' + j + "</div></div>"
    };
    function b(h) {
        var g = ["fn-select-option"];
        if (h.isSelected) {
            g.push("fn-select-active")
        }
        if (h.isDisabled) {
            g.push("fn-select-disabled")
        }
        return '<div class="' + g.join(" ") + '" title="' + (h.hint || h.title) + '" data-value="' + h.value + '">' + h.title + "</div>"
    }
    return f
}, { requires: ["dom", "event", "order/util/select/option"] }); 