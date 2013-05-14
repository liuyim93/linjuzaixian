KISSY.add("tbr/control/qq/index", function (e, t, n) {
    function a(i) {
        var o = this;
        a.superclass.constructor.call(this), i.containerNode.all("a, input").on("keydown", function (e) {
            e.stopPropagation()
        }), this.number = new t({
            label: "QQ\u53f7"
        }), this.sku = new n, this.on("afterValueChange", function () {
            e.log("[qq-control]value is changed")
        }), this.number.on("afterValueChange", function (t) {
            o.set("value", e.merge(o.get("value"), t.newVal, {
                request: !1
            }))
        }), this.sku.on("afterValueChange", function (t) {
            o.set("value", e.merge(o.get("value"), t.newVal, {
                request: !0
            }))
        })
    }
    return e.extend(a, e.Base, {
        init: function () {
            this.set("value", e.merge(this.get("value"), this.sku.get("value"), {
                request: !0
            }))
        },
        snapshot: function () {
            this.number.snapshot()
        },
        validate: function () {
            this.number.validate()
        }
    }, {
        ATTRS: {
            value: {
                value: {}
            }
        }
    }), a
}, {
    requires: ["./number", "./sku"]
}), KISSY.add("tbr/control/qq/number", function (e, t, n, a, i, o, r) {
    function s(e) {
        var t, n = e.length;
        return 4 == n ? t = e : n > 4 && 8 >= n ? t = e.substring(0, 4) + "-" + e.substring(4, n) : n > 8 && 10 >= n && (t = e.substring(0, 4) + "-" + e.substring(4, 8) + "-" + e.substring(8, n)), t
    }
    function l(e) {
        var t, n = e.length;
        return 4 > n ? t = e : n >= 4 && 8 > n ? t = e.substring(0, 4) + "-" + e.substring(4, n) : n >= 8 && 10 >= n && (t = e.substring(0, 4) + "-" + e.substring(4, 8) + "-" + e.substring(8, n)), t
    }
    function u(s) {
        var l = this;
        u.superclass.constructor.apply(this, arguments);
        try {
            this._inputNode = e.one("#tbr-qq-number input"), this._appendTo = this._inputNode.parent(".tbr-container").getDOMNode(), this._inputNode.prop("maxlength", 11), this.set("logNode", e.one(e.DOM.create('<div id="tbr-qq-number-log" class="tbr-log" role="log" aria-live="assertive" aria-relevant="all" aria-atomic="true"></div>'))), this.get("logNode").insertAfter(this._inputNode)
        } catch (h) {
            e.error("\u521d\u59cb\u5316\u5931\u8d25")
        }
        this._numberInput = new t(this._inputNode, s), this._menu = new a(this._inputNode), this._tip = new n(this._inputNode, {
            appendTo: this._appendTo
        }), this._inputNode.attr({
            role: "combobox",
            "aria-owns": this._menu.get("id"),
            "aria-haspopup": "true"
        }), this._tip.on("show", function (e) {
            l.get("logNode").html(e.node.text())
        }), this._numberInput.on("focus", function () {
            var t = this;
            l._tip.hide(), "" == this.getValue() ? i.get(function (t) {
                t.length > 0 && (l._menu.set("itemTemplate", d), e.each(t, function (e) {
                    e.value = e.number
                }), l._menu.show(t), l.set("menuName", "\u5145\u503c\u5386\u53f2\u53f7\u7801\u83dc\u5355"), l.get("logNode").html(l.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), l._menu.getMenuNode().one("ul").addClass("tbr-history"))
            }) : (l._menu.set("itemTemplate", c), i.get(function (e) {
                e = l._filter(t.getValue(), e), l._menu.show(e), l.set("menuName", "\u8054\u60f3\u53f7\u7801\u83dc\u5355"), l.get("logNode").html(l.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), l._menu.getMenuNode().one("ul").removeClass("tbr-history")
            })), l._lastInputValue = this.getValue()
        }).on("blur", function () {
            var e = this.getValue();
            l._menu.hide(), l.get("logNode").html(l.set("menuName") + "\u83dc\u5355\u6536\u8d77\u4e86"), l._tip.hide(), /^\d{4,10}$/.test(e) ? l.set("value", {
                number: e
            }) : l.set("value", {
                number: ""
            })
        }).on("keydown", function (e) {
            var t;
            l._menu.isHidden() || (t = e.keyCode, t == o.UP ? l._menu.set("selectedIndex", l._menu.get("selectedIndex") - 1) : t == o.DOWN ? l._menu.set("selectedIndex", l._menu.get("selectedIndex") + 1) : t == o.ENTER ? (r.goldlog("/wanle.10.13", "", "47700902"), l._menu.hide(), this.load(l._menu.getValue()), l.get("logNode").html(l.set("menuName") + "\u83dc\u5355\u6536\u8d77\u4e86\uff0c\u4f60\u9009\u62e9\u4e86" + l._menu.getValue())) : (t == o.ESC || t == o.TAB) && (l._menu.hide(), l.get("logNode").html(l.set("menuName") + "\u83dc\u5355\u6536\u8d77\u4e86")))
        }).on("keyup", function (t) {
            var n = (t.keyCode, this.getValue());
            n != l._lastInputValue && (l._lastInputValue = n, l._tip.hide(), l._menu.hide(), "" == n ? i.get(function (t) {
                t.length > 0 && (l._menu.set("itemTemplate", d), e.each(t, function (e) {
                    e.value = e.number
                }), l._menu.show(t), l.set("menuName", "\u5145\u503c\u5386\u53f2\u53f7\u7801\u83dc\u5355"), l.get("logNode").html(l.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), l._menu.getMenuNode().one("ul").addClass("tbr-history"))
            }) : (l._menu.set("itemTemplate", c), i.get(function (e) {
                e = l._filter(n, e), l._menu.show(e), l.set("menuName", "\u8054\u60f3\u53f7\u7801\u83dc\u5355"), l.get("logNode").html(l.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), l._menu.getMenuNode().one("ul").removeClass("tbr-history")
            })))
        }), this._menu.on("select", function (e) {
            r.goldlog("/wanle.10.13", "", "47700902"), l._numberInput.load(e.value), l.get("logNode").html("\u4f60\u9009\u62e9\u4e86" + e.value)
        }).on("highlight", function (e) {
            l._inputNode.attr("aria-activedescendant", e.node.prop("id"))
        })
    }
    var d = '<span class="tbr-number">{{data.number}}</span>',
		c = '<span class="tbr-hit">{{data.hit}}</span><span class="tbr-left">{{data.left}}</span>';
    return e.extend(u, e.Base, {
        _filter: function (t, n) {
            var a = l(t),
				i = RegExp("^(" + a + ")(.*)$"),
				o = [];
            return e.each(n, function (t) {
                var n, a, r = s(t.number);
                i.test(r) && (n = r.match(i), a = e.mix({}, t), a.hit = n[1], a.left = n[2], a.value = t.number, o.push(a))
            }), 0 == o.length && o.push({
                hit: a,
                value: t,
                left: ""
            }), o
        },
        _showError: function (t) {
            e.isString(t) && t && this._tip.show(t), this.set("value", {
                number: ""
            })
        },
        snapshot: function () {
            i.addToLocalStorage(this.get("value").number)
        },
        validate: function () {
            var e, t = this._numberInput.getValue();
            "" != t ? (r.goldlog("/wanle.10.14", "", "47700902"), e = /^\d{5,11}$/.test(t) ? "" : "\u8bf7\u8f93\u5165\u6b63\u786e\u7684QQ\u53f7", e && this._showError(e)) : this._showError("\u8bf7\u8f93\u5165QQ\u53f7")
        }
    }, {
        ATTRS: {
            value: {
                number: ""
            },
            logNode: {
                value: null
            },
            menuName: {
                value: "",
                validator: function (t) {
                    return e.isString(t)
                }
            }
        }
    }), u
}, {
    requires: ["../../comp/numberTextInput", "../../comp/textInputTip", "../../comp/textInputMenu", "../../history/qqNumber", "../../utils/keycode", "../../utils/monitor"]
}), KISSY.add("tbr/comp/numberTextInput", function (e, t, n) {
    function a(e) {
        var t = e;
        return /^\d*$/.test(e) || (t = e.replace(/\D/g, "")), t
    }
    e.DOM;
    var i = function (e, i) {
        var o = this;
        this.textInputNode = e, this.textInputNode.addClass("tbr-number-input"), this.textInput = new t(this.textInputNode, i), this.textInput.on("focus", function (e) {
            o.fire("focus", e)
        }).on("blur", function (e) {
            o.fire("blur", e)
        }).on("keydown", function (e) {
            n.inNumberBlacklist(e) ? e.preventDefault() : o.fire("keydown", e)
        }).on("keyup", function (e) {
            var t, n = this.getValue();
            t = a(n), t != n && this.load(t), this.updateMaxLength(/^1/.test(t) ? 11 : 12), o.fire("keyup", e)
        }).on("change", function (e) {
            o.fire("change", e)
        })
    };
    return e.augment(i, e.EventTarget, {
        validate: function () {
            return ""
        },
        load: function (t, n) {
            e.isString(t) && /^\d*$/.test(t) && (e.log("[number-input]load " + t), this.textInput.load(t, n))
        },
        getValue: function () {
            return this.textInput.getValue()
        },
        getTextInputNode: function () {
            return this.textInputNode
        },
        getTextInput: function () {
            return this.textInput
        }
    }), i
}, {
    requires: ["./textInput", "../utils/keycode"]
}), KISSY.add("tbr/comp/textInput", function (e) {
    var t = "tbr-placeholder",
		n = !1,
		a = e.UA,
		i = a.ie || a.firefox || a.safari || a.chrome,
		o = function (a, r) {
		    var s = this;
		    o.superclass.constructor.apply(this, arguments), this.textInputNode = a, r && r.selectAll && (this._selectAll = !0), r && !e.isUndefined(r.aria) && this.set("aira", r.aria), this.get("aria") && (this.textInputNode.attr("role", "textbox"), r && r.label && this.set("label", r.label)), this.placeholder = this.textInputNode.attr("placeholder") || "", n || this.textInputNode.prop("placeholder", ""), this.valueBeforeChange = "", n ? this.textInputNode.attr("placeholder", this.placeholder) : "" == this.textInputNode.val() ? (this.textInputNode.val(this.placeholder), this.textInputNode.addClass(t)) : (this.placeholder_on = !1, this.textInputNode.removeClass(t)), this.isPasteDisabled = "disabled" == this.textInputNode.attr("data-paste"), this.textInputNode.on("focus", function () {
		        var a = s.getValue(),
					i = s.textInputNode;
		        s._blurTimeout && (e.log("[text-input]blurring is cancelled"), s._blurTimeout.cancel(), s._blurTimeout = null), e.one(this).parent(".tbr-input").addClass("tbr-input-active"), s.fire("focus"), "" != a ? s.selectAll() : n || (i.val(""), i.removeClass(t)), s.valueBeforeChange = a
		    }).on("keydown", function (e) {
		        var t = e.keyCode;
		        s.isPasteDisabled || e.ctrlKey && 86 == t && e.preventDefault(), s.fire("keydown", e)
		    }).on("keyup", function (t) {
		        var n, a = s.getValue();
		        n = e.trim(a), n != a && (this.value = n), s.fire("keyup", t)
		    }).on("blur", function (a) {
		        var i = this;
		        e.log("[text-input]blurring is delayed"), s._blurTimeout = e.later(function () {
		            var o = s.getValue(),
						r = s.textInputNode;
		            e.log("[text-input]blurring happens"), e.one(i).parent(".tbr-input").removeClass("tbr-input-active"), "" != o || n || (r.val(s.placeholder), r.addClass(t)), s.fire("blur", a)
		        }, 150)
		    }).on("change", function (t) {
		        s.fire("change", e.mix(t, {
		            preVal: s.valueBeforeChange,
		            newVal: s.getValue()
		        }))
		    }), i && !s.isPasteDisabled && this.textInputNode.on("paste contextmenu", function (e) {
		        e.preventDefault()
		    })
		};
    return e.extend(o, e.Base, {
        getValue: function () {
            var e;
            return e = n || !this.textInputNode.hasClass(t) ? this.textInputNode.val() : ""
        },
        load: function (a, i) {
            var o = this.getValue();
            a = e.trim(a), a != o && (e.log("[text-input]load " + a), "" != a || n ? "" == a || n ? this.textInputNode.val(a) : (this.textInputNode.removeClass(t), this.textInputNode.val(a)) : (this.textInputNode.addClass(t), this.textInputNode.val(this.placeholder)), i || this.fire("change", {
                preVal: o,
                newVal: a
            }))
        },
        updateMaxLength: function (e) {
            0 > e || (this.textInputNode.prop("maxLength") > e && this.load(this.getValue().substring(0, e)), this.textInputNode.prop(e, e))
        },
        selectAll: function () {
            if (this._selectAll) {
                var t, n = this.textInputNode.getDOMNode(),
					a = n.value.length,
					i = 100;
                e.UA.ie ? e.later(function () {
                    t = n.createTextRange(), t.collapse(!0), t.moveStart("character", 0), t.moveEnd("character", a), t.select()
                }, i) : e.later(function () {
                    n.setSelectionRange(0, a)
                }, i)
            }
        },
        activate: function () {
            this.textInputNode.parent(".tbr-input").addClass("tbr-input-active")
        },
        inactivate: function () {
            this.textInputNode.parent(".tbr-input").removeClass("tbr-input-active")
        }
    }, {
        ATTRS: {
            aria: {
                value: !0,
                validator: function (t) {
                    return e.isBoolean(t)
                }
            },
            label: {
                value: "",
                validator: function (t) {
                    return e.isString(t)
                }
            }
        }
    }), o
}, {
    requires: ["base"]
}), KISSY.add("tbr/utils/keycode", function () {
    return {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        ENTER: 13,
        ESC: 27,
        TAB: 9,
        inNumberBlacklist: function (e) {
            var t = !1,
				n = e.keyCode,
				a = e.shiftKey,
				i = (e.ctrlKey, e.metaKey);
            return n && (n = 1 * n, ((n >= 96 && 105 >= n || n >= 48 && 57 >= n) && a || n >= 65 && 90 >= n && !i || n >= 219 && 222 >= n || n >= 186 && 192 >= n) && (t = !0)), t
        }
    }
}), KISSY.add("tbr/comp/textInputTip", function (e) {
    var t = e.DOM,
		n = e.Base,
		a = function (e, n) {
		    var i = this;
		    a.superclass.constructor.call(this), this._inputNode = e, this._isInitialized = !1, this.on("afterContentChange", function (e) {
		        i._isInitialized && i._contentNode.html(e.newVal)
		    }).on("afterAppendToChange", function (e) {
		        i._isInitialized && (i._node.appendTo(e.newVal), i._locate()), /absolute|relative/.test(t.css(e.newVal, "position")) || t.css(e.newVal, "position", "relative")
		    }), n && (n.content && this.set("content", n.content), n.appendTo && this.set("appendTo", n.appendTo))
		};
    return e.extend(a, n, {
        show: function (e) {
            this._isInitialized || (this._build(), this._isInitialized = !0), this._locate(), e && this.set("content", e), this._node.show(), this.fire("show", {
                node: this._node
            })
        },
        hide: function () {
            this._isInitialized && this._node.hide()
        },
        _build: function () {
            this._node = e.one(t.create('<div class="tbr-input-tip"><p></p></div>')), !this.get("appendTo") && this.set("appendTo", document.body), this._node.appendTo(this.get("appendTo")), this._contentNode = this._node.one("p"), this._contentNode.html(this.get("content")), this._node.prop("id", this._inputNode.prop("id") + "-tip" || "")
        },
        _locate: function () {
            var e = this._inputNode.parent(".tbr-input"),
				n = e.offset(),
				a = t.offset(this.get("appendTo")),
				i = e.css("border-bottom-width") + "",
				o = i.match(/^(\d+)(px)?$/);
            i = o ? 1 * o[1] : 0, this._node.css("left", n.left - a.left + "px"), this._node.css("top", n.top - a.top + e.outerHeight() - i + "px")
        },
        isHidden: function () {
            var e;
            return e = this._node ? "none" == this._node.css("display") : !0
        }
    }, {
        ATTRS: {
            content: {
                value: "tbr text input tip.",
                validator: function (e) {
                    return !!e
                }
            },
            appendTo: {
                value: null,
                validator: function (e) {
                    return !!e
                }
            }
        }
    }), a
}), KISSY.add("tbr/comp/textInputMenu", function (e, t) {
    var n = e.DOM,
		a = e.Base,
		i = '{{#each arr as data}}<li id="{{data.id}}-opt-{{data.index}}" class="{{#if _ks_index == 0}} tbr-top tbr-left{{/if}}" data-index="{{data.index}}">{{#if data.value}}<a href="http://www.taobao.com" tabindex="-1" style="zoom:1;" target="_blank">',
		o = "</a>{{/if}}</li>{{/each}}",
		r = function (t, n) {
		    var a = this;
		    r.superclass.constructor.call(this), this._isInitialized = !1, this._inputNode = t, this.config = e.mix({}, n), this.set("id", this._inputNode.prop("id") + "-menu" || ""), this.on("afterSelectedIndexChange", function (t) {
		        var n; -1 != t.newVal && a._node && (n = a._node.all("li"), t.prevVal >= 0 && e.one(n[t.prevVal]).removeClass("tbr-active"), t.newVal >= 0 && e.one(n[t.newVal]).addClass("tbr-active"), this.fire("highlight", {
		            node: e.one(n[t.newVal])
		        }))
		    })
		};
    return e.extend(r, a, {
        _show: function () {
            this.isHidden() && (this._node && this._node.show(), this._node.attr("aria-expanded", "true"), this.fire("show"))
        },
        _hide: function (e) {
            this.isHidden() || (this._node.hide(), e && e.silent || (this._node.attr("aria-expanded", "false"), this.fire("hide")))
        },
        _build: function () {
            var t = this;
            this._node = e.one(n.create(e.substitute('<div class="tbr-input-menu" id="{id}" role="listbox" aria-expanded="false" style="display:none;"><ul></ul></div>', {
                id: this.get("id")
            }))), this._node.appendTo(document.body), this._node.delegate("mouseover", "a", function (n) {
                t.set("selectedIndex", 1 * e.one(n.target).parent("li").attr("data-index"))
            }).delegate("click", "a", function (e) {
                e.preventDefault()
            }), this._mousedownMenuItemDOMNode = null, this._node.one("ul").on("mousedown", function (n) {
                e.log("mousedown: " + n.target.nodeName);
                var a, i = e.one(n.target),
					o = i.prop("nodeName").toUpperCase();
                n.target != this && (a = "LI" != o ? i.parent("li") : i, t._mousedownMenuItemDOMNode = a.getDOMNode())
            }).on("mouseup", function (n) {
                e.log("mouseup: " + n.target.nodeName);
                var a, i, o = e.one(n.target),
					r = o.prop("nodeName").toUpperCase();
                n.target != this && (i = "LI" != r ? o.parent("li") : o, i.getDOMNode() == t._mousedownMenuItemDOMNode && (a = i.attr("data-index"), a > -1 && (t.hide(), t.fire("select", {
                    value: t.get("dataArr")[a].value
                }))))
            }).on("click", function (t) {
                e.log("click: " + t.target.nodeName), ("A" == t.target.nodeName || e.one(t.target).parent("a")) && t.preventDefault()
            }), this._node.on("mousedown", function (n) {
                e.log("container mousedown: " + n.target.nodeName), e.UA.ie && 9 > e.UA.ie && (t._inputNode.getDOMNode().onbeforedeactivate = function () {
                    window.event.returnValue = !1, this.onbeforedeactivate = null
                }), n.preventDefault()
            }), this.fire("init")
        },
        _load: function (n) {
            var a, i = [],
				o = this;
            e.each(n, function (t, r) {
                var s = e.mix({}, t);
                s.index = r, s.len = n.length, s.id = o.get("id"), i.push(s), t.selected && (a = r)
            }), this._node.one("ul").html(t(this._getTemplate()).render({
                arr: i
            })), this.set("dataArr", i), e.isUndefined(a) ? (this.reset("selectedIndex"), this.set("selectedIndex", 0)) : this.set("selectedIndex", a), this.fire("load")
        },
        show: function (t) {
            if (!this._isInitialized) {
                if (!(e.isArray(t) && t.length > 0)) return;
                this._build(), this._isInitialized = !0
            }
            e.isArray(t) && t.length > 0 && this._load(t), this._show(), this._locate()
        },
        _locate: function () {
            var t = this._inputNode.parent(".tbr-input"),
				n = t.offset(),
				a = t.css("border-bottom-width") + "",
				i = a.match(/^(\d+)(px)?$/),
				o = 0;
            a = i ? 1 * i[1] : 0, 8 > e.UA.ie && (o = 0), this._node.css("left", n.left + "px"), this._node.css("top", n.top + t.outerHeight() - a + o + "px")
        },
        hide: function (e) {
            this._hide(e)
        },
        getMenuNode: function () {
            return this._node
        },
        _getTemplate: function () {
            return i + this.get("itemTemplate") + o
        },
        getValue: function () {
            var e = "",
				t = this.get("selectedIndex");
            return t >= 0 && (e = this.get("dataArr")[t].value), e
        },
        isHidden: function () {
            var e;
            return e = this._node ? "none" == this._node.css("display") : !0
        }
    }, {
        ATTRS: {
            itemTemplate: {
                value: "{{data.value}}"
            },
            dataArr: {
                value: []
            },
            selectedIndex: {
                value: -1,
                validator: function (t) {
                    var n = !1;
                    return this.get("selectedIndex"), (e.isNumber(t) && t >= 0 && this.get("dataArr").length > t || -1 == t) && (n = !0), n
                }
            },
            id: {
                value: "",
                validator: function (t) {
                    return e.isString(t)
                }
            }
        }
    }), r
}, {
    requires: ["template"]
}), KISSY.add("tbr/history/qqNumber", function (e, t) {
    var n = {};
    return e.mix(n, {
        _getLocalStorage: function () {
            var n, a = [];
            return n = t.getItem("tbr.numberHistory.qq"), e.log("[history-qqnumber]local storage string is: " + n || "empty"), n && (a = this._unparam(n), a && a.dataArr && (a = a.dataArr)), a
        },
        get: function (t) {
            var n;
            e.log("[history-qqnumber]checking cache..."), n = e.namespace("tbr.numberHistory").qq, n ? e.log("[history-qqnumber]found " + n.length + " numbers") : (e.log("[history-qqnumber]found nothing..."), e.log("[history-qqnumber]get localstorage..."), n = this._getLocalStorage(), e.log("[history-qqnumber]found " + n.length + " numbers"), e.namespace("tbr.numberHistory").qq = n), e.isFunction(t) && t(n)
        },
        addToLocalStorage: function (n) {
            var a, i;
            e.log("[history-qqnumber]start to add number to localstorage " + n), e.log("[history-qqnumber]checking cache..."), a = e.namespace("tbr.numberHistory").qq, a || (e.log("[history-qqnumber]get from local storage"), a = this._getLocalStorage()), i = this._indexOf(n, a), -1 != i && (e.log("[history-qqnumber]find that the number is already in local storage"), e.log("[history-qqnumber]remove it first"), a.splice(i, 1)), e.log("[history-qqnumber]add the number"), a.unshift({
                number: n
            }), a.length > 10 && (e.log("[history-qqnumber]too many items, clean..."), a.splice(10)), e.log("[history-qqnumber]update..."), t.setItem("tbr.numberHistory.qq", this._param(a)), e.log("[history-qqnumber]local storage string is: " + t.getItem("tbr.numberHistory.qq") || "empty")
        },
        _indexOf: function (t, n) {
            var a = -1;
            return e.each(n, function (e, n) {
                return e.number == t ? (a = n, !1) : void 0
            }), a
        },
        _param: function (t) {
            var n = [];
            return e.each(t, function (e) {
                n.push(e.number)
            }), n.join(",")
        },
        _unparam: function (t) {
            var n = t.split(","),
				a = [];
            return e.each(n, function (e) {
                a.push({
                    number: e,
                    value: e
                })
            }), a
        }
    }), n
}, {
    requires: ["gallery/local-storage/1.0/index"]
}), KISSY.add("tbr/utils/monitor", function (e) {
    var t = {}, n = window,
		a = !/assets\.daily\.taobao\.net/.test(e.Config.base);
    return t.sendPmid = function (t) {
        e.log("[monitor]pmid: " + t), a && e.isString(t) && "" != t && (e.log("[monitor]\u6b63\u5e38\u73af\u5883\uff0c\u53d1\u9001pmid"), n.document.createElement("img").src = "http://ju.mmstat.com/?url=http://www.atpanel.com?ad_id=&am_id=&cm_id=&pm_id=" + t)
    }, t.goldlog = function (e, t, i) {
        a && (n.goldlog_queue || (n.goldlog_queue = [])).push({
            action: "goldlog.record",
            arguments: [e, "", t, i]
        })
    }, t
}), KISSY.add("tbr/control/qq/sku", function (e, t) {
    function n() {
        var a = e.namespace("tbr.qq");
        return n.superclass.constructor.call(this), this._skuDataMap = a.skuDataMap, this._skuDataList = a.skuDataList, this._skuDataMap && this._skuDataList ? (this.catDropdown = new t(e.one("#tbr-qq-cat select"), {
            groupFilter: function (t) {
                var n = [
					[],
					[],
					[]
				];
                return e.each(t, function (e, t) {
                    0 == t % 3 ? n[0].push(e) : 1 == t % 3 ? n[1].push(e) : n[2].push(e)
                }), n
            },
            label: "\u7c7b\u578b"
        }), this.denomDropdown = new t(e.one("#tbr-qq-denom select"), {
            groupFilter: function (t) {
                var n = [
					[],
					[]
				],
					a = t.length / 2;
                return e.each(t, function (t, i) {
                    var o = t.optionDOMNode.innerHTML,
						r = o.match(/^(\d+)(.*)$/);
                    e.isArray(r) && 3 == r.length ? (t.text = '<span class="tbr-figure">' + r[1] + "</span>" + r[2], a > i ? n[1].push(t) : n[0].push(t)) : e.error("[card-sku]\u9762\u503c\u6570\u636e\u9519\u8bef")
                }), n
            },
            label: "\u9762\u503c"
        }), this._bindEvents(), this._init(), void 0) : (e.error("qq sku \u6570\u636e\u6709\u8bef"), void 0)
    }
    return e.extend(n, e.Base, {
        _bindEvents: function () {
            var t = this;
            this.catDropdown.on("afterValueChange", function (e) {
                t._loadDenomDropdown(e.newVal.value)
            }), this.denomDropdown.on("afterValueChange", function () {
                t.set("value", {
                    catId: t.catDropdown.get("value").value,
                    denomVId: t.denomDropdown.get("value").value
                })
            }), this.on("afterValueChange", function (t) {
                e.log(e.substitute('[qq.sku]value is changed: catId("{prevCatId}") denomVId("{prevDenomVId}") -> catId("{newCatId}") denomVId("{newDenomVId}")', {
                    prevCatId: t.prevVal.catId,
                    prevDenomVId: t.prevVal.denomVId,
                    newCatId: t.newVal.catId,
                    newDenomVId: t.newVal.denomVId
                }))
            })
        },
        _init: function () {
            var t = [],
				n = [];
            e.each(this._skuDataList, function (e) {
                t.push(e.name), n.push(e.catId)
            }), this.catDropdown.load(t, n, {
                silent: !0
            }), this._loadDenomDropdown(this.catDropdown.get("value").value)
        },
        _loadDenomDropdown: function (e) {
            var t = this._skuDataMap[e];
            this.denomDropdown.load(t.denomText.split(","), t.denomVId.split(","))
        }
    }, {
        ATTRS: {
            value: {
                value: {
                    catId: "",
                    denomVId: ""
                }
            }
        }
    }), n
}, {
    requires: ["../../comp/dropdown"]
}), KISSY.add("tbr/comp/dropdown", function (e, t, n, a) {
    function i(t, n) {
        return i.superclass.constructor.call(this), t ? (this._init(t, n), void 0) : (e.error("\u627e\u4e0d\u5230selectNode"), void 0)
    }
    var o = e.DOM,
		r = '<li id="{{id}}-opt-{{index}}" class="tbr-item{{#if selected}} tbr-active{{/if}}{{#if row == 1}} tbr-top{{/if}}{{#if col == 1}} tbr-left{{/if}}" data-index={{index}} data-rows={{rows}} data-cols={{cols}} data-row={{row}} data-col={{col}}{{#if aria}} role="option"{{/if}}>{{#if text}}<a href="http://www.taobao.com" tabindex="-1" target="_blank" hidefocus="true">{{text}}</a>{{/if}}</li>';
    return e.extend(i, e.Base, {
        _bindEvents: function () {
            var t = this;
            this.on("afterValueChange", function (t) {
                e.log(e.substitute('[dropdown]value is changed: text("{prevText}") value("{prevValue}") -> text("{newText}") value("{newValue}")', {
                    prevText: t.prevVal.text,
                    prevValue: t.prevVal.value,
                    newText: t.newVal.text,
                    newValue: t.newVal.value
                })), this.get("logNode").html("\u4f60\u9009\u62e9\u4e86" + t.newVal.text)
            }), this.on("afterDisabledChange", function (e) {
                var n = this.get("labelNode"),
					a = this.get("labelLinkNode");
                e.newVal ? (a.prop("tabindex", "-1"), n.addClass("tbr-dropdown-disabled"), t.get("aria") && a.attr("aria-disabled", "true")) : (n.removeClass("tbr-dropdown-disabled"), a.prop("tabindex", "0"), t.get("aria") && a.attr("aria-disabled", "false"))
            }), this.on("afterActiveMenuItemNodeChange", function (e) {
                e.prevVal && e.prevVal.removeClass("tbr-active"), e.newVal && (e.newVal.addClass("tbr-active"), this.get("labelLinkNode").attr("aria-activedescendant", e.newVal.prop("id")))
            }), this.on("afterBlankLabelChange", function (e) {
                t.get("labelLinkNode").html(e.newVal)
            }), this._selectUI.on("afterValueChange", function (n) {
                var a = n.newVal.selectedIndex;
                e.each(t._dataArr, function (e) {
                    e.index == a && t.get("labelLinkNode").html(e.text)
                }), t.set("value", n.newVal)
            })
        },
        _init: function (t, a) {
            var i, r, s, l, u, d = this;
            this._selectNode = t, this._selectUI = new n(t), this.set("label", a.label), this.set("aria", a.aria), this.set("groupFilter", a.groupFilter), this.set("labelledBy", a.labelledBy), this.set("id", this._selectNode.attr("data-id")), this._selectNode.hide(), this._id = this.get("id") + "-dropdown" || "", i = e.one(o.create(e.substitute('<div class="tbr-dropdown" id="{id}-label"><a href="http://www.taobao.com" target="_blank" hidefocus="true"></a><span class="tbr-icon"></span><div class="tbr-log" role="log" aria-live="assertive" aria-relevant="all" aria-atomic="true"></div></div>', {
                id: this._id
            }))), this.set("labelNode", i), this.set("logNode", i.one(".tbr-log")), r = e.one(o.create(e.substitute('<div class="tbr-dropdown-menu" id="{id}-menu"><ul></ul></div>', {
                id: this._id
            }))), this.set("menuNode", r), i.insertAfter(t), r.appendTo(document.body), this.get("labelledBy") && (u = e.one(e.DOM.create('<label class="tbr-dropdown-label">' + (this._selectNode.attr("data-label") || this.get("label")) + "</label>")), u.prop("id", this._id + "-labelledby"), this.get("logNode").prop("id", this._id + "-log"), i.append(u), this.set("labelledByNode", u)), r.delegate("mouseover", "a", function (t) {
                d.set("activeMenuItemNode", e.one(t.target).parent("li"))
            }), this._mousedownMenuItemDOMNode = null, r.one("ul").on("mousedown", function (t) {
                e.log("mousedown: " + t.target.nodeName);
                var n, a = e.one(t.target),
					i = a.prop("nodeName").toUpperCase();
                t.target != this && (n = "LI" != i ? a.parent("li") : a, d._mousedownMenuItemDOMNode = n.getDOMNode())
            }).on("mouseup", function (t) {
                e.log("mouseup: " + t.target.nodeName);
                var n, a, i = e.one(t.target),
					o = i.prop("nodeName").toUpperCase();
                t.target != this && (a = "LI" != o ? i.parent("li") : i, a.getDOMNode() == d._mousedownMenuItemDOMNode && (n = a.attr("data-index"), n > -1 && (d.collapse(), d.selectByIndex(n), d.fire("select"), d.set("activeMenuItemNode", a))))
            }).on("click", function (t) {
                e.log("click: " + t.target.nodeName), ("A" == t.target.nodeName.toUpperCase() || e.one(t.target).parent("a")) && t.preventDefault()
            }).on("mousedown", function (t) {
                e.log("container mousedown: " + t.target.nodeName), e.UA.ie && 9 > e.UA.ie && (d.get("labelLinkNode").getDOMNode().onbeforedeactivate = function () {
                    window.event.returnValue = !1, this.onbeforedeactivate = null
                }), t.preventDefault()
            }), i.on("click", function (t) {
                e.log("label clicked: " + t.target.nodeName), ("A" == t.target.nodeName.toUpperCase() || e.one(t.target).parent("a")) && t.preventDefault(), d.get("disabled") || d.expand()
            }), s = i.one("a"), this.set("labelLinkNode", s), s.on("blur", function () {
                e.log("[dropdown]blur"), d.blurTimeout || (e.log("set timeout"), d.blurTimeout = e.later(function () {
                    e.log("blur happens"), d._collapse(), d.get("labelNode").removeClass("tbr-dropdown-active")
                }, 100))
            }).on("focus", function () {
                e.log("[dropdown]focus"), d.blurTimeout && (e.log("blur cancelled"), d.blurTimeout.cancel(), d.blurTimeout = null), d.get("disabled") || d.get("labelNode").addClass("tbr-dropdown-active"), d.get("disabled") || d.expand()
            }), this._load(), this._collapse(), l = r.prop("id"), this.get("aria") && (s.attr({
                role: "combobox",
                "aria-haspopup": "true",
                "aria-owns": l,
                "aria-disabled": "false"
            }), r.attr({
                role: "listbox",
                "aria-expanded": "false"
            }), this.get("label") ? (s.attr("aria-label", this.get("label")), this.get("logNode").attr("aria-label", this.get("label"))) : this.get("labelledByNode") && (s.attr("aria-labelledby", this.get("labelledByNode").prop("id")), this.get("logNode").attr("aria-labelledby", this.get("labelledByNode").prop("id")))), this._bindEvents()
        },
        load: function (e, t, n) {
            this._selectUI.load(e, t, {
                silent: !0
            }), this._load(n)
        },
        _getDataArrFromOptionDOMNodeArr: function (t) {
            var n = [];
            return e.each(t, function (e, t) {
                n.push({
                    text: e.innerHTML,
                    index: t,
                    selected: e.selected,
                    optionDOMNode: e
                })
            }), n
        },
        _load: function (n) {
            var a, i, o = this._selectUI.getOptionNodeList().getDOMNodes(),
				s = "",
				l = 0,
				u = t(r),
				d = this;
            this._dataArr = [], a = this.get("groupFilter") ? this.get("groupFilter")(this._getDataArrFromOptionDOMNodeArr(o)) : [this._getDataArrFromOptionDOMNodeArr(o)], e.each(a, function (e) {
                var t = e.length;
                t > l && (l = t)
            }), e.each(a, function (e) {
                var t = e.length;
                if (l > t) for (; l >= t; ) e.push(null), t++
            });
            for (var c = 0; l > c; c++) for (var h = 0, p = a.length; p > h; h++) {
                var m = a[h][c];
                m || (m = {
                    index: -1,
                    text: "",
                    selected: !1
                }), m.id = d.get("id"), m.row = c + 1, m.col = h + 1, m.rows = l, m.cols = a.length, m.aria = this.get("aria"), s += u.render(m), d._dataArr.push(m), m.selected && (i = m.text)
            }
            this.get("menuNode").one("ul").html(s), this.get("labelLinkNode").html(i || this.get("blankLabel")), this.set("value", this._selectUI.get("value"), n), i ? this.set("disabled", !1) : this.set("disabled", !0), this.fire("load")
        },
        selectByText: function (e, t) {
            this._selectUI.selectByText(e, t)
        },
        selectByValue: function (e, t) {
            this._selectUI.selectByValue(e, t)
        },
        selectByIndex: function (e, t) {
            this._selectUI.selectByIndex(e, t)
        },
        expand: function () {
            this._expand(), this.get("labelLinkNode").getDOMNode().focus()
        },
        collapse: function () {
            this._collapse()
        },
        _expand: function () {
            var t = this;
            this._changeActiveMenuItem(), this.get("menuNode").show(), this.get("logNode").html((this.get("label") || this.get("labelledByNode").text()) + "\u83dc\u5355\u5c55\u5f00\u4e86\uff0c\u6309\u65b9\u5411\u952e\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), this.fire("expand"), this.get("aria") && this.get("menuNode").attr("aria-expanded", "true"), this._locate(), this.get("labelNode").detach("keydown").on("keydown", function (n) {
                var i = n.keyCode,
					o = e.one(n.target),
					r = (o.parent("li"), t.get("activeMenuItemNode")),
					s = 1 * r.attr("data-col"),
					l = 1 * r.attr("data-row"),
					u = 0,
					d = 0,
					c = !1,
					h = r.attr("data-rows"),
					p = r.attr("data-cols");
                e.log("[dropdown]keydown"), n.stopPropagation(), i == a.UP ? (n.preventDefault(), l > 1 && (u = l - 1, c = !0)) : i == a.DOWN ? (n.preventDefault(), h > l && (u = l + 1, c = !0)) : i == a.LEFT ? (n.preventDefault(), s > 1 && (d = s - 1, c = !0)) : i == a.RIGHT ? (n.preventDefault(), p > s && (d = s + 1, c = !0)) : i == a.ENTER ? (n.preventDefault(), t._collapse(), t.selectByIndex(t.get("activeMenuItemNode").attr("data-index")), t.fire("select")) : i == a.ESC && t._collapse(), c && (0 == u && (u = l), 0 == d && (d = s), t._changeActiveMenuItem(u, d))
            })
        },
        _locate: function () {
            var e = this.get("labelNode"),
				t = this.get("menuNode"),
				n = e.offset(),
				a = this.get("labelNode").css("border-bottom-width") + "",
				i = a.match(/^(\d+)(px)?$/),
				o = 0;
            a = i ? 1 * i[1] : 0, t.css("left", n.left + e.outerWidth() - t.outerWidth() + "px"), t.css("top", n.top + e.outerHeight() - a + o + "px")
        },
        _collapse: function () {
            var t = this;
            this.get("menuNode").hide(), this.get("logNode").html((this.get("label") || this.get("labelledByNode").text()) + "\u83dc\u5355\u6536\u8d77\u4e86"), this.fire("collapse"), this.get("aria") && this.get("menuNode").attr("aria-expanded", "false"), this.get("labelNode").detach("keydown").on("keydown", function (n) {
                var i = n.keyCode;
                e.log("[dropdown]keydown"), n.stopPropagation(), i == a.UP ? (n.preventDefault(), t._selectPrev()) : i == a.DOWN ? (n.preventDefault(), t._selectNext()) : i == a.ENTER && n.preventDefault()
            })
        },
        _changeActiveMenuItem: function (e, t) {
            var n, a = this,
				i = this.get("menuNode");
            e && t ? i.all("li").each(function (n) {
                return n.attr("data-col") == t && n.attr("data-row") == e ? ("" != n.html() && a.set("activeMenuItemNode", n), !1) : void 0
            }) : (n = this._selectNode.prop("selectedIndex"), n >= 0 && i.all("li").each(function (e) {
                return e.attr("data-index") == n ? (a.set("activeMenuItemNode", e), !1) : void 0
            }))
        },
        _selectPrev: function () {
            var e = this._selectNode.prop("selectedIndex");
            e > 0 && this.selectByIndex(e - 1)
        },
        _selectNext: function () {
            var e = this._selectNode.prop("selectedIndex");
            e >= 0 && this._selectNode.prop("options").length - 1 > e && this.selectByIndex(e + 1)
        },
        _isOpened: function () {
            return "none" != this.get("menuNode").css("display")
        }
    }, {
        ATTRS: {
            value: {
                value: {
                    text: "",
                    value: "",
                    node: null,
                    selectedIndex: -1
                }
            },
            activeMenuItemNode: {
                value: null
            },
            blankLabel: {
                value: "\u8bf7\u9009\u62e9"
            },
            disabled: {
                value: !1
            },
            aria: {
                value: !0,
                validator: function (t) {
                    return e.isBoolean(t)
                }
            },
            label: {
                value: "",
                validator: function (t) {
                    return e.isString(t)
                }
            },
            labelledBy: {
                value: !1,
                validator: function (t) {
                    return e.isBoolean(t)
                }
            },
            labelledByNode: {
                value: !1
            },
            groupFilter: {
                value: function () { },
                validator: function (t) {
                    return e.isFunction(t)
                }
            },
            labelNode: {
                value: null
            },
            labelLinkNode: {
                value: null
            },
            menuNode: {
                value: null
            },
            logNode: {
                value: null
            },
            id: {
                value: "",
                validator: function (t) {
                    return e.isString(t)
                }
            }
        }
    }), i
}, {
    requires: ["template", "./select", "../utils/keycode"]
}), KISSY.add("tbr/comp/select", function (e) {
    function t(e) {
        t.superclass.constructor.call(this), this._selectNode = e, this._bindEvents(), this._setValue()
    }
    return e.extend(t, e.Base, {
        _bindEvents: function () {
            var t = this;
            this._changeTimeout = null, this._selectNode.on("change", function () {
                t._changeTimeout && (t._changeTimeout.cancel(), t._changeTimeout = null), t._changeTimeout = e.later(function () {
                    t._setValue()
                }, 50)
            }), this.on("afterValueChange", function (t) {
                e.log(e.substitute('[select]value is changed: text("{prevText}") value("{prevValue}") -> text("{newText}") value("{newValue}")', {
                    prevText: t.prevVal.text,
                    prevValue: t.prevVal.value,
                    newText: t.newVal.text,
                    newValue: t.newVal.value
                }))
            })
        },
        _setValue: function (t) {
            var n, a, i = this._selectNode.prop("options");
            i.length > 0 ? (n = this._selectNode.prop("selectedIndex"), a = e.one(i[n]), this.set("value", {
                value: a.val(),
                text: a.html(),
                node: a,
                selectedIndex: n
            }, t)) : this.reset("value", t)
        },
        _selectByCondition: function (t, n) {
            var a = !1,
				i = this._selectNode.getDOMNode(),
				o = i.selectedIndex,
				r = -1,
				s = this;
            return e.each(i.options, function (e, n) {
                return t(e, n) ? (e.selected = !0, r = n, a = !0, !1) : void 0
            }), e.log(o), e.log(r), a && o != r && !n && s._setValue(), a
        },
        selectByText: function (t, n) {
            return e.isString(t) ? this._selectByCondition(function (e) {
                return e.innerHTML == t
            }, n) : !1
        },
        selectByValue: function (t, n) {
            return e.isString(t) ? this._selectByCondition(function (e) {
                return e.value == t
            }, n) : !1
        },
        selectByIndex: function (e, t) {
            var n = this._selectNode.getDOMNode();
            return n.selectedIndex, 0 > e || e > n.options.length - 1 ? !1 : this._selectByCondition(function (t, n) {
                return e == n
            }, t)
        },
        load: function (t, n, a) {
            var i, o = this._selectNode.getDOMNode(),
				r = !1;
            return e.isArray(t) && e.isArray(n) && t.length == n.length && (e.UA.ie ? (o.options.length = 0, e.each(t, function (e, a) {
                var i = new Option(t[a], n[a]);
                o.options[a] = i
            })) : (i = "", e.each(t, function (e, t) {
                i += '<option value="' + n[t] + '">' + e + "</option>"
            }), this._selectNode.html(i)), o.selectedIndex = 0, r = !0), this._setValue(a), r
        },
        getOptionNodeList: function () {
            return this._selectNode.all("option")
        },
        getLabel: function () {
            return this._selectNode.attr("data-label") || ""
        }
    }, {
        ATTRS: {
            value: {
                value: {
                    text: "",
                    value: "",
                    node: null,
                    selectedIndex: -1
                }
            }
        }
    }), t
}, {
    requires: ["template"]
}), KISSY.add("tbr/url/qq", function (e, t) {
    function n(t) {
        n.superclass.constructor.call(this, e.mix({
            type: "qq"
        }, t))
    }
    return e.extend(n, t, {
        _validateForReqeust: function (e) {
            return this._validateParamArr([e.catId, e.denomVId, e.itemType])
        },
        _validateForSearch: function (e) {
            return this._validateParamArr([e.catId, e.denomVId, e.itemType])
        },
        _generateRequestUrlData: function (t) {
            var n = {}, a = this._skuDataMap[t.catId],
				i = this._denomDataMap[t.catId][t.denomVId];
            if (n.cat = t.catId, n.reserve_price = i.text, n.filter = "reserve_price[" + i.filter + "]", "50005462" == n.cat ? (n.newpidvid = e.substitute("{denomPId}:{denomVId};", {
                denomPId: a.denomPId,
                denomVId: t.denomVId
            }), n.pidvid = "21971:6076017;" + n.newpidvid) : (n.newpidvid = e.substitute("{serviceId}:{catId};{denomPId}:{denomVId};", {
                denomPId: a.denomPId,
                denomVId: t.denomVId,
                serviceId: a.serviceId,
                catId: a.catId
            }), n.pidvid = n.newpidvid + "1626534:6076017;"), n.itemType = t.itemType, "" != this._promotion) switch (n.select_type = "QQ", this._promotion) {
                case "taojinbi":
                    n.tbcoin = "1";
                    break;
                case "etao":
                    n.ptype = "etao"
            }
            return n.urlBase = this._requestUrlBase, n._input_charset = "utf-8", n.env = this._env, n.url = n.urlBase + "?" + e.param(n), n
        },
        _generateSearchUrlData: function (t) {
            var n = {}, a = this._skuDataMap[t.catId],
				i = this._denomDataMap[t.catId][t.denomVId];
            if (n.cat = t.catId, n.reserve_price = i.text, n.filter = "reserve_price[" + i.filter + "]", "50005462" == n.cat ? (n.newpidvid = e.substitute("{denomPId}:{denomVId};", {
                denomPId: a.denomPId,
                denomVId: t.denomVId
            }), n.pidvid = "21971:6076017;" + n.newpidvid) : (n.newpidvid = e.substitute("{serviceId}:{catId};{denomPId}:{denomVId};", {
                denomPId: a.denomPId,
                denomVId: t.denomVId,
                serviceId: a.serviceId,
                catId: a.catId
            }), n.pidvid = n.newpidvid + "1626534:6076017;"), n.itemType = t.itemType, "" != this._promotion) switch (n.select_type = "QQ", this._promotion) {
                case "taojinbi":
                    n.tbcoin = "1";
                    break;
                case "etao":
                    n.ptype = "etao"
            }
            return n.urlBase = this._searchUrlBase, n._input_charset = "utf-8", n.env = t.env, n.url = n.urlBase + "?" + e.param(n), n
        },
        _getRequestUrlSPU: function (t) {
            return e.substitute("{catId}-{denomVId}-{itemType}", t)
        },
        _getSearchUrlSPU: function (t) {
            return e.substitute("{catId}-{denomVId}-{itemType}", t)
        },
        getIntervalArr: function (t) {
            return Data.DENOM_INTERVAL_TO_SHOW[e.substitute("{itemType}-{denom}", t)].split(",")
        }
    }), n
}, {
    requires: ["./base"]
}), KISSY.add("tbr/url/base", function (e) {
    function t(e) {
        this._env = e.env, this._init(e.type)
    }
    return e.augment(t, {
        _init: function (t) {
            var n;
            t && e.inArray(t, ["phone", "qq", "card"]) || e.error("[url]\u7c7b\u522b\u9519\u8bef"), n = e.namespace("tbr"), n && n[t] || e.error("[url]\u6570\u636e\u9519\u8bef"), this._skuDataMap = n[t].skuDataMap, this._denomDataMap = n[t].denomDataMap, this._promotion = n.promotion, this._requestUrlBase = n.requestUrlBase[t], this._searchUrlBase = n.searchUrlBase, this._requestUrlDataCache = {}, this._searchUrlDataCache = {}
        },
        _validateParamArr: function (t) {
            var n = !0;
            return e.each(t, function (t) {
                return e.isString(t) && "" != t ? void 0 : (n = !1, !1)
            }), n
        },
        _validateForReqeust: function () {
            return !1
        },
        _validateForSearch: function () {
            return !1
        },
        _generateRequestUrlData: function () {
            return null
        },
        _generateSearchUrlData: function () {
            return null
        },
        _getRequestUrlSPU: function () {
            return ""
        },
        _getSearchUrlSPU: function () {
            return ""
        },
        _getRequestUrlData: function (e) {
            var t, n;
            return this._validateForReqeust(e) ? (t = this._getRequestUrlSPU(e), n = this._requestUrlDataCache[t], n || (n = this._generateRequestUrlData(e)), n || (this._requestUrlDataCache[t] = n)) : n = {
                url: ""
            }, n
        },
        getRequestUrl: function (e) {
            return this._getRequestUrlData(e).url
        },
        _getSearchUrlData: function (e) {
            var t, n;
            return this._validateForSearch(e) ? (t = this._getSearchUrlSPU(e), n = this._searchUrlDataCache[t], n || (n = this._generateSearchUrlData(e)), n || (this._searchUrlDataCache[t] = n)) : n = {
                url: ""
            }, n
        },
        getSearchUrl: function (e) {
            return this._getSearchUrlData(e).url
        }
    }), t
}), KISSY.add("tbr/init/qq", function () { });