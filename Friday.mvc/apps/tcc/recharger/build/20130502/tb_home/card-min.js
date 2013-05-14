KISSY.add("tbr/control/card/index", function (e, t, a) {
    function n(i) {
        var o = this;
        n.superclass.constructor.call(this), i.containerNode.all("a, input").on("keydown", function (e) {
            e.stopPropagation()
        }), this.sku = new t, this.itemTypeRadioGroup = new a(e.one("#tbr-card-itemtype")), this.itemTypeRadioGroup.on("afterValueChange", function (t) {
            o.set("value", e.merge(o.get("value"), {
                itemType: t.newVal.value
            }, {
                request: !0
            }))
        }), this.sku.on("afterValueChange", function (t) {
            o.set("value", e.merge(o.get("value"), t.newVal, {
                request: !0
            }))
        }), this.sku.on("tab-blur", function () {
            o.itemTypeRadioGroup.get("inputDOMNodeArr")[o.itemTypeRadioGroup.get("selectedIndex")].focus()
        })
    }
    return e.extend(n, e.Base, {
        init: function () {
            this.set("value", e.merge(this.get("value"), this.sku.get("value"), {
                itemType: this.itemTypeRadioGroup.get("value").value
            }, {
                request: !0
            }))
        },
        snapshot: function () { },
        validate: function () {
            this.sku.validate()
        }
    }, {
        ATTRS: {
            value: {
                value: {
                    itemType: "auto"
                }
            }
        }
    }), n
}, {
    requires: ["./sku", "../../comp/radio"]
}), KISSY.add("tbr/control/card/sku", function (e, t, a) {
    function n() {
        return n.superclass.constructor.call(this), this._data = e.namespace("tbr.card"), this._data.skuDataList && this._data.skuDataMap ? (this.catInput = new t(e.one("#tbr-card-cat input"), {
            label: "\u6e38\u620f"
        }), this.denomDropdown = new a(e.one("#tbr-card-denom select"), {
            groupFilter: function (t) {
                var a = [
					[],
					[]
				],
					n = t.length / 2;
                return e.each(t, function (t, i) {
                    var o = t.optionDOMNode.innerHTML,
						r = o.match(/^(\d+)(.*)$/);
                    e.isArray(r) && 3 == r.length ? (t.text = '<span class="tbr-figure">' + r[1] + "</span>" + r[2], n > i ? a[1].push(t) : a[0].push(t)) : e.error("[card-sku]\u9762\u503c\u6570\u636e\u9519\u8bef")
                }), a
            },
            labelledBy: !0
        }), this._bindEvents(), this._init(), void 0) : (e.error("card sku \u6570\u636e\u6709\u8bef"), void 0)
    }
    return e.extend(n, e.Base, {
        _bindEvents: function () {
            var t = this;
            this.catInput.on("afterValueChange", function (e) {
                var a, n = e.newVal.catId;
                n ? (a = t._data.skuDataMap[n], t.denomDropdown.load(a.denomText.split(","), a.denomVId.split(","))) : (t.denomDropdown.load([], []), t.denomDropdown.set("blankLabel", "\u8bf7\u9009\u62e9"))
            }).on("panel-tab-blur", function () {
                t.denomDropdown.get("disabled") ? t.fire("tab-blur") : t.denomDropdown.expand()
            }), this.denomDropdown.on("afterValueChange", function () {
                t.set("value", {
                    catId: t.catInput.get("value").catId,
                    denomVId: t.denomDropdown.get("value").value
                })
            }), this.on("afterValueChange", function (t) {
                e.log(e.substitute('[card.sku]value is changed: catId("{prevCatId}") denomVId("{prevDenomVId}") -> catId("{newCatId}") denomVId("{newDenomVId}")', {
                    prevCatId: t.prevVal.catId,
                    prevDenomVId: t.prevVal.denomVId,
                    newCatId: t.newVal.catId,
                    newDenomVId: t.newVal.denomVId
                }))
            })
        },
        _init: function () {
            this.catInput.load(this._data.skuDataMap[this._data.defaultCatId].name)
        },
        validate: function () {
            this.catInput.validate()
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
    requires: ["./cardCatInput", "../../comp/dropdown"]
}), KISSY.add("tbr/control/card/cardCatInput", function (e, t, a, n, i, o, r) {
    function s(d, l) {
        var u = this;
        s.superclass.constructor.call(this);
        try {
            this._dataArr = e.namespace("tbr").card.skuDataList, this._nameToCatIdMap = {}, e.each(this._dataArr, function (e) {
                u._nameToCatIdMap[e.name] = e.catId
            })
        } catch (c) {
            e.error("[card-cat-input]\u6570\u636e\u9519\u8bef")
        }
        this._inputNode = d, this._iconNode = e.one(e.DOM.create('<a class="tbr-icon" title="\u70b9\u51fb\u9009\u62e9\u6e38\u620f" target="_blank" tabindex="0">\u70b9\u51fb\u6216\u6309ENTER\u952e\u5c55\u5f00\u6e38\u620f\u9009\u62e9\u9762\u677f</a>')), this._iconNode.insertAfter(this._inputNode), this.set("logNode", e.one(e.DOM.create('<div id="tbr-card-cat-log" aria-label="\u6e38\u620f" class="tbr-log" role="log" aria-live="assertive" aria-relevant="all" aria-atomic="true"></div>'))), this.get("logNode").insertAfter(this._inputNode), this._textInput = new t(this._inputNode, l), this._menu = new n(this._inputNode), this._menu.on("init", function () {
            this.getMenuNode().one("ul").addClass("tbr-history")
        }), this._tip = new a(this._inputNode, {
            appendTo: this._inputNode.parent(".tbr-container").getDOMNode()
        }), this._panel = new i(this._inputNode), this._inputNode.attr({
            role: "combobox",
            "aria-owns": this._menu.get("id"),
            "aria-haspopup": "true"
        }), this._tip.on("show", function (e) {
            u.get("logNode").html(e.node.text())
        }), this._textInput.on("focus", function () {
            var t = this.getValue();
            u._tip.isHidden() && u._panel.isHidden() && ("" == t ? u._panel.show() : u.get("suggest") && u._suggest(t)), u.reset("suggest"), u._lastInputValue = t, u._panel.set("hideFlag", !1), e.later(function () {
                u._panel.set("hideFlag", !0)
            }, 100)
        }).on("blur", function () {
            u._tip.hide(), u._menu.hide(), u._panel.get("hideFlag") && (e.log("[card-cat-input]input blurs, hide the panel"), u._panel.hide())
        }).on("change", function (e) {
            u.set("value.catId", u._nameToCatIdMap[e.newVal])
        }).on("keydown", function (t) {
            var a = t.keyCode;
            e.log("[card-cat-input]keydown"), u._menu.isHidden() ? u._panel.isHidden() || (a == o.ESC ? u._panel.hide() : a != o.TAB || t.shiftKey || u._focusPanel()) : a == o.UP ? u._menu.set("selectedIndex", u._menu.get("selectedIndex") - 1) : a == o.DOWN ? u._menu.set("selectedIndex", u._menu.get("selectedIndex") + 1) : a == o.ENTER ? (r.goldlog("/wanle.10.9", "", "47700902"), u.load(u._menu.getValue()), u.get("logNode").html("\u4f60\u9009\u62e9\u4e86" + u._menu.getValue())) : (a == o.ESC || a == o.TAB) && u._menu.hide()
        }).on("keyup", function (t) {
            var a, n = t.keyCode;
            e.inArray(n, [o.ENTER, o.ESC, o.TAB]) || (a = this.getValue(), a != u._lastInputValue && ("" == a ? (u._menu.hide(), u._tip.hide(), u._panel.show()) : (u._panel.hide(), u._suggest(a))), u._lastInputValue = a)
        }), this._iconNode.on("click", function (e) {
            e.preventDefault(), r.goldlog("/wanle.10.7", "", "47700902"), u._menu.hide(), u._tip.hide(), u._panel.set("hideFlag", !1), u._panel.show(), u._focusPanel()
        }).on("keydown", function (t) {
            t.keyCode == o.ENTER ? (e.log("keydown:enter"), r.goldlog("/wanle.10.7", "", "47700902"), u._menu.hide(), u._tip.hide(), u._panel.show(), u._focusPanel()) : t.keyCode == o.TAB && u.inactivate()
        }).on("focus", function () {
            u.activate()
        }), this._menu.on("select", function (e) {
            r.goldlog("/wanle.10.9", "", "47700902"), this.hide(), u.load(e.value), u.get("logNode").html("\u4f60\u9009\u62e9\u4e86" + e.value)
        }).on("hide", function () {
            u.get("logNode").html(u.set("menuName") + "\u83dc\u5355\u6536\u8d77\u4e86")
        }).on("highlight", function (e) {
            u._inputNode.attr("aria-activedescendant", e.node.prop("id"))
        }), this._panel.on("select", function (e) {
            this.hide(), u.load(e.text), u.set("suggest", !1), u._inputNode.getDOMNode().focus()
        }).on("mousedown", function () { }).on("mouseup", function () { }).on("click", function () {
            u._inputNode.getDOMNode().focus()
        }).on("blur", function () {
            e.log("[card-cat-input]fake inactive"), u.inactivate()
        }).on("shift-tab-blur", function () {
            e.log("[card-cat-input]panel shift tab blur"), e.later(function () {
                u._inputNode.getDOMNode().focus()
            }, 100)
        }).on("tab-blur", function () {
            u.fire("panel-tab-blur")
        }).on("exit", function () {
            e.log("[card-cat-input]panel exits"), u._inputNode.getDOMNode().focus()
        })
    }
    return e.extend(s, e.Base, {
        load: function (e) {
            this._textInput.load(e), this._menu.hide()
        },
        _suggest: function (e) {
            var t = this._getMatchedDataArr(e);
            0 == t.length ? (this._menu.hide(), this._tip.show('\u5bf9\u4e0d\u8d77\uff0c\u6ca1\u6709\u627e\u5230"<span class="tbr-hl">' + e + '</span>"')) : (this._tip.hide(), this._menu.show(t), this.set("menuName", "\u8054\u60f3\u53f7\u7801\u83dc\u5355"), this.get("logNode").html(this.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"))
        },
        validate: function () {
            var t, a, n = this._textInput.getValue();
            "" == n ? (this._tip.show("\u8bf7\u8f93\u5165\u6e38\u620f\u540d\u79f0"), this._inputNode.getDOMNode().focus()) : (t = this._getMatchedDataArr(n), 0 == t.length ? (this._tip.show('\u5bf9\u4e0d\u8d77\uff0c\u6ca1\u6709\u627e\u5230"<span class="tbr-hl">' + n + '</span>"'), this._inputNode.getDOMNode().focus()) : (a = !1, e.each(t, function (e) {
                return e.name == n ? (a = !0, !1) : void 0
            }), a || (this._tip.show("\u8bf7\u8f93\u5165\u5b8c\u6574\u7684\u6e38\u620f\u540d\u79f0"), this._inputNode.getDOMNode().focus())))
        },
        _getMatchedDataArr: function (e) {
            var t, a;
            return t = this._filterByInitalLetter(e), a = this._filterByText(e), this._mergeArrays(t, a)
        },
        _filterByText: function (t) {
            var a = [];
            return e.each(this._dataArr, function (n) {
                var i;
                RegExp(t).test(n.name) && (i = e.mix({}, n), i.value = i.name, a.push(i))
            }), a
        },
        _filterByInitalLetter: function (t) {
            var a = [],
				n = t.toUpperCase();
            return e.each(this._dataArr, function (t) {
                var i;
                t.initialLetter.toUpperCase() == n && (i = e.mix({}, t), i.value = i.name, a.push(i))
            }), a
        },
        _mergeArrays: function (t, a) {
            var n = [];
            return e.each(t, function (t) {
                e.inArray(t, n) || n.push(t)
            }), e.each(a, function (t) {
                e.inArray(t, n) || n.push(t)
            }), n
        },
        _focusPanel: function () {
            this._panel.focus(), this.activate()
        },
        activate: function () {
            this._inputNode.parent(".tbr-input").addClass("tbr-input-active-fake")
        },
        inactivate: function () {
            this._inputNode.parent(".tbr-input").removeClass("tbr-input-active-fake")
        }
    }, {
        ATTRS: {
            value: {
                value: {
                    catId: ""
                }
            },
            logNode: {
                value: null
            },
            menuName: {
                value: "",
                validator: function (t) {
                    return e.isString(t)
                }
            },
            suggest: {
                value: !0,
                validator: function (t) {
                    return e.isBoolean(t)
                }
            }
        }
    }), s
}, {
    requires: ["../../comp/textInput", "../../comp/textInputTip", "../../comp/textInputMenu", "./cardCatInputPanel", "../../utils/keycode", "../../utils/monitor"]
}), KISSY.add("tbr/comp/textInput", function (e) {
    var t = "tbr-placeholder",
		a = !1,
		n = e.UA,
		i = n.ie || n.firefox || n.safari || n.chrome,
		o = function (n, r) {
		    var s = this;
		    o.superclass.constructor.apply(this, arguments), this.textInputNode = n, r && r.selectAll && (this._selectAll = !0), r && !e.isUndefined(r.aria) && this.set("aira", r.aria), this.get("aria") && (this.textInputNode.attr("role", "textbox"), r && r.label && this.set("label", r.label)), this.placeholder = this.textInputNode.attr("placeholder") || "", a || this.textInputNode.prop("placeholder", ""), this.valueBeforeChange = "", a ? this.textInputNode.attr("placeholder", this.placeholder) : "" == this.textInputNode.val() ? (this.textInputNode.val(this.placeholder), this.textInputNode.addClass(t)) : (this.placeholder_on = !1, this.textInputNode.removeClass(t)), this.isPasteDisabled = "disabled" == this.textInputNode.attr("data-paste"), this.textInputNode.on("focus", function () {
		        var n = s.getValue(),
					i = s.textInputNode;
		        s._blurTimeout && (e.log("[text-input]blurring is cancelled"), s._blurTimeout.cancel(), s._blurTimeout = null), e.one(this).parent(".tbr-input").addClass("tbr-input-active"), s.fire("focus"), "" != n ? s.selectAll() : a || (i.val(""), i.removeClass(t)), s.valueBeforeChange = n
		    }).on("keydown", function (e) {
		        var t = e.keyCode;
		        s.isPasteDisabled || e.ctrlKey && 86 == t && e.preventDefault(), s.fire("keydown", e)
		    }).on("keyup", function (t) {
		        var a, n = s.getValue();
		        a = e.trim(n), a != n && (this.value = a), s.fire("keyup", t)
		    }).on("blur", function (n) {
		        var i = this;
		        e.log("[text-input]blurring is delayed"), s._blurTimeout = e.later(function () {
		            var o = s.getValue(),
						r = s.textInputNode;
		            e.log("[text-input]blurring happens"), e.one(i).parent(".tbr-input").removeClass("tbr-input-active"), "" != o || a || (r.val(s.placeholder), r.addClass(t)), s.fire("blur", n)
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
            return e = a || !this.textInputNode.hasClass(t) ? this.textInputNode.val() : ""
        },
        load: function (n, i) {
            var o = this.getValue();
            n = e.trim(n), n != o && (e.log("[text-input]load " + n), "" != n || a ? "" == n || a ? this.textInputNode.val(n) : (this.textInputNode.removeClass(t), this.textInputNode.val(n)) : (this.textInputNode.addClass(t), this.textInputNode.val(this.placeholder)), i || this.fire("change", {
                preVal: o,
                newVal: n
            }))
        },
        updateMaxLength: function (e) {
            0 > e || (this.textInputNode.prop("maxLength") > e && this.load(this.getValue().substring(0, e)), this.textInputNode.prop(e, e))
        },
        selectAll: function () {
            if (this._selectAll) {
                var t, a = this.textInputNode.getDOMNode(),
					n = a.value.length,
					i = 100;
                e.UA.ie ? e.later(function () {
                    t = a.createTextRange(), t.collapse(!0), t.moveStart("character", 0), t.moveEnd("character", n), t.select()
                }, i) : e.later(function () {
                    a.setSelectionRange(0, n)
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
}), KISSY.add("tbr/comp/textInputTip", function (e) {
    var t = e.DOM,
		a = e.Base,
		n = function (e, a) {
		    var i = this;
		    n.superclass.constructor.call(this), this._inputNode = e, this._isInitialized = !1, this.on("afterContentChange", function (e) {
		        i._isInitialized && i._contentNode.html(e.newVal)
		    }).on("afterAppendToChange", function (e) {
		        i._isInitialized && (i._node.appendTo(e.newVal), i._locate()), /absolute|relative/.test(t.css(e.newVal, "position")) || t.css(e.newVal, "position", "relative")
		    }), a && (a.content && this.set("content", a.content), a.appendTo && this.set("appendTo", a.appendTo))
		};
    return e.extend(n, a, {
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
				a = e.offset(),
				n = t.offset(this.get("appendTo")),
				i = e.css("border-bottom-width") + "",
				o = i.match(/^(\d+)(px)?$/);
            i = o ? 1 * o[1] : 0, this._node.css("left", a.left - n.left + "px"), this._node.css("top", a.top - n.top + e.outerHeight() - i + "px")
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
    }), n
}), KISSY.add("tbr/comp/textInputMenu", function (e, t) {
    var a = e.DOM,
		n = e.Base,
		i = '{{#each arr as data}}<li id="{{data.id}}-opt-{{data.index}}" class="{{#if _ks_index == 0}} tbr-top tbr-left{{/if}}" data-index="{{data.index}}">{{#if data.value}}<a href="http://www.taobao.com" tabindex="-1" style="zoom:1;" target="_blank">',
		o = "</a>{{/if}}</li>{{/each}}",
		r = function (t, a) {
		    var n = this;
		    r.superclass.constructor.call(this), this._isInitialized = !1, this._inputNode = t, this.config = e.mix({}, a), this.set("id", this._inputNode.prop("id") + "-menu" || ""), this.on("afterSelectedIndexChange", function (t) {
		        var a; -1 != t.newVal && n._node && (a = n._node.all("li"), t.prevVal >= 0 && e.one(a[t.prevVal]).removeClass("tbr-active"), t.newVal >= 0 && e.one(a[t.newVal]).addClass("tbr-active"), this.fire("highlight", {
		            node: e.one(a[t.newVal])
		        }))
		    })
		};
    return e.extend(r, n, {
        _show: function () {
            this.isHidden() && (this._node && this._node.show(), this._node.attr("aria-expanded", "true"), this.fire("show"))
        },
        _hide: function (e) {
            this.isHidden() || (this._node.hide(), e && e.silent || (this._node.attr("aria-expanded", "false"), this.fire("hide")))
        },
        _build: function () {
            var t = this;
            this._node = e.one(a.create(e.substitute('<div class="tbr-input-menu" id="{id}" role="listbox" aria-expanded="false" style="display:none;"><ul></ul></div>', {
                id: this.get("id")
            }))), this._node.appendTo(document.body), this._node.delegate("mouseover", "a", function (a) {
                t.set("selectedIndex", 1 * e.one(a.target).parent("li").attr("data-index"))
            }).delegate("click", "a", function (e) {
                e.preventDefault()
            }), this._mousedownMenuItemDOMNode = null, this._node.one("ul").on("mousedown", function (a) {
                e.log("mousedown: " + a.target.nodeName);
                var n, i = e.one(a.target),
					o = i.prop("nodeName").toUpperCase();
                a.target != this && (n = "LI" != o ? i.parent("li") : i, t._mousedownMenuItemDOMNode = n.getDOMNode())
            }).on("mouseup", function (a) {
                e.log("mouseup: " + a.target.nodeName);
                var n, i, o = e.one(a.target),
					r = o.prop("nodeName").toUpperCase();
                a.target != this && (i = "LI" != r ? o.parent("li") : o, i.getDOMNode() == t._mousedownMenuItemDOMNode && (n = i.attr("data-index"), n > -1 && (t.hide(), t.fire("select", {
                    value: t.get("dataArr")[n].value
                }))))
            }).on("click", function (t) {
                e.log("click: " + t.target.nodeName), ("A" == t.target.nodeName || e.one(t.target).parent("a")) && t.preventDefault()
            }), this._node.on("mousedown", function (a) {
                e.log("container mousedown: " + a.target.nodeName), e.UA.ie && 9 > e.UA.ie && (t._inputNode.getDOMNode().onbeforedeactivate = function () {
                    window.event.returnValue = !1, this.onbeforedeactivate = null
                }), a.preventDefault()
            }), this.fire("init")
        },
        _load: function (a) {
            var n, i = [],
				o = this;
            e.each(a, function (t, r) {
                var s = e.mix({}, t);
                s.index = r, s.len = a.length, s.id = o.get("id"), i.push(s), t.selected && (n = r)
            }), this._node.one("ul").html(t(this._getTemplate()).render({
                arr: i
            })), this.set("dataArr", i), e.isUndefined(n) ? (this.reset("selectedIndex"), this.set("selectedIndex", 0)) : this.set("selectedIndex", n), this.fire("load")
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
				a = t.offset(),
				n = t.css("border-bottom-width") + "",
				i = n.match(/^(\d+)(px)?$/),
				o = 0;
            n = i ? 1 * i[1] : 0, 8 > e.UA.ie && (o = 0), this._node.css("left", a.left + "px"), this._node.css("top", a.top + t.outerHeight() - n + o + "px")
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
                    var a = !1;
                    return this.get("selectedIndex"), (e.isNumber(t) && t >= 0 && this.get("dataArr").length > t || -1 == t) && (a = !0), a
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
}), KISSY.add("tbr/control/card/cardCatInputPanel", function (e, t, a, n, i, o) {
    var r = function (e) {
        r.superclass.constructor.apply(this, arguments), this.inputNode = e, this._isInitialized = !1
    };
    return e.extend(r, t, {
        show: function () {
            this._isInitialized || (this._build(), this._isInitialized = !0), this._show()
        },
        isHidden: function () {
            return this.node ? "none" == this.node.css("display") : !0
        },
        hide: function () {
            this._hide()
        },
        _show: function () {
            this.node && this.node.show(), this.set("active", !0)
        },
        _hide: function () {
            this.node && this.node.hide(), this.set("active", !1)
        },
        _build: function () {
            var t = this;
            this._dataArr || (this._dataArr = e.namespace("tbr.card").skuDataList, this._dataArr || e.error("[card-cat-panel]no data"));
            var a = this.inputNode.prop("id");
            this.node = e.one(e.DOM.create('<div class="tbr-panel mod"><div class="mod-hd">(\u652f\u6301\u6c49\u5b57/\u9996\u5b57\u6bcd\u8f93\u5165)</div><div class="mod-bd"><ul class="ks-switchable-nav"><li class="ks-active">\u70ed\u95e8\u6e38\u620f</li><li aria-labelledby="' + a + "-nav-2" + '" title="\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aA\u5230H\u7684\u6e38\u620f">ABCDEFGH<span class="tbr-panel-nav-label" id="' + a + "-nav-2" + '">\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aA\u5230H\u7684\u6e38\u620f</span></li>' + '<li aria-labelledby="' + a + "-nav-3" + '" title="\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aI\u5230P\u7684\u6e38\u620f">IJKLMNOP<span class="tbr-panel-nav-label" id="' + a + "-nav-3" + '">\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aI\u5230P\u7684\u6e38\u620f</span></li>' + '<li aria-labelledby="' + a + "-nav-4" + '" title="\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aQ\u5230Z\u7684\u6e38\u620f">QRSTUVWXYZ<span class="tbr-panel-nav-label" id="' + a + "-nav-4" + '">\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aQ\u5230Z\u7684\u6e38\u620f</span></li>' + "</ul>" + '<div class="ks-switchable-content">' + "</div></div></div>")), this.node.appendTo(document.body), this.node.one(".ks-switchable-content").html(this._filter(this._dataArr)), this.node.prop("id", a + "-panel" || ""), this._locate(), this._switchable = new n.Tabs(this.node.getDOMNode(), {
                triggerType: "click",
                aria: !0
            }), this._switchable.on("switch", function (e) {
                e.currentIndex > 0 && i.goldlog("/wanle.10.8", "", "47700902")
            }), this.navNode = this.node.one(".ks-switchable-nav"), this.contentNode = this.node.one(".ks-switchable-content"), this.node.on("mousedown", function (a) {
                a.preventDefault(), e.log("[card-cat-panel]mousedown: " + a.target.nodeName + "[" + a.target.innerHTML + "]"), t.fire("mousedown")
            }).on("mouseup", function () {
                t.fire("mouseup")
            }), this.node.on("click", function (e) {
                this.navNode.contains(e.target) || this.contentNode.contains(e.target) || this.fire("click")
            }, this), this.node.delegate("click", ".mtb-g-item", function (a) {
                var n = e.one(a.target);
                a.preventDefault(), t.fire("select", {
                    value: n.attr("data-cat"),
                    text: n.html()
                })
            }), this.node.delegate("focus", ".ks-switchable-nav li, .mtb-g-item", function (a) {
                e.log("[card-cat-panel]focus: " + a.target.nodeName + "[" + a.target.innerHTML + "]"), t.set("hideFlag", !1)
            }), this.node.delegate("blur", ".ks-switchable-nav li, .mtb-g-item", function (a) {
                e.log("[card-cat-panel]blur: " + a.target.nodeName + "[" + a.target.innerHTML + "]"), t.set("hideFlag", !0), e.later(function () {
                    e.log("[card-cat-panel]hide flag: " + t.get("hideFlag")), t.get("hideFlag") && (e.log("[card-cat-panel]hide the panel"), t.hide(), t.fire("blur"))
                }, 100)
            }), this.node.delegate("keydown", ".mtb-g-item", function (a) {
                n.getDomEvent, a.keyCode != o.TAB || a.shiftKey ? a.keyCode == o.LEFT || a.keyCode == o.UP ? a.preventDefault() : a.keyCode == o.RIGHT || a.keyCode == o.DOWN ? a.preventDefault() : a.keyCode == o.ESC && (t.hide(), t.fire("exit")) : "true" == e.one(a.target).attr("data-last") && (a.preventDefault(), t.fire("tab-blur"))
            }), this.node.delegate("keydown", ".ks-switchable-nav li", function (e) {
                e.keyCode == o.TAB && e.shiftKey ? (e.preventDefault(), t.set("hideFlag", !0), t.fire("shift-tab-blur")) : e.keyCode == o.ESC && (t.hide(), t.fire("exit"))
            })
        },
        _locate: function () {
            var t = this.inputNode.parent(".tbr-input"),
				a = t.offset(),
				n = t.css("border-bottom-width") + "",
				i = n.match(/^(\d+)(px)?$/),
				o = 0;
            n = i ? 1 * i[1] : 0, 8 > e.UA.ie && (o = 0), this.node.css("left", a.left + t.outerWidth() - this.node.outerWidth() + "px"), this.node.css("top", a.top + t.outerHeight() - n + o + "px")
        },
        focus: function () {
            e.log("[card-cat-panel]panel get focused"), e.one(this._switchable.container).one(".ks-switchable-nav").all(".ks-active").getDOMNode().focus()
        },
        _filter: function () {
            var t = {}, n = "";
            e.each(this._dataArr, function (a) {
                var n = e.mix({}, a),
					i = a.initialLetter.toUpperCase();
                a.isHot && (t.hot || (t.hot = {
                    list: [],
                    title: "",
                    valid: !0,
                    last: !0
                }), t.hot.list.push(n)), t[i] || (t[i] = {
                    list: [],
                    title: i,
                    valid: !0,
                    last: !1
                }), t[i].list.push(n)
            });
            var i = a('{{#if valid}}<dt>{{title}}</dt><dd>{{#each list}}<a data-catid="{{_ks_value.catId}}" href="http://www.taobao.com" target="_blank" class="mtb-g-item" data-last="{{#if last && _ks_index == list.length - 1}}true{{#else}}false{{/if}}">{{_ks_value.name}}</a>{{/each}}</dd>{{/if}}');
            return n += "<div><dl>" + i.render(t.hot) + "</dl></div>", n += '<div style="display: none;"><dl>' + i.render(t.A) + i.render(t.B) + i.render(t.C) + i.render(t.D) + i.render(t.E) + i.render(t.F) + i.render(t.G) + i.render(e.mix(t.H, {
                last: !0
            })) + "</dl></div>", n += '<div style="display: none;"><dl>' + i.render(t.I) + i.render(t.J) + i.render(t.K) + i.render(t.L) + i.render(t.M) + i.render(t.N) + i.render(t.O) + i.render(e.mix(t.P, {
                last: !0
            })) + "</dl></div>", n += '<div style="display: none;"><dl>' + i.render(t.Q) + i.render(t.R) + i.render(t.S) + i.render(t.T) + i.render(t.U) + i.render(t.V) + i.render(t.W) + i.render(t.X) + i.render(t.Y) + i.render(e.mix(t.Z, {
                last: !0
            })) + "</dl></div>"
        }
    }, {
        ATTRS: {
            hideFlag: {
                value: !0,
                validator: function (t) {
                    return e.isBoolean(t)
                }
            },
            active: {
                value: !1,
                validator: function (t) {
                    return e.isBoolean(t)
                }
            }
        }
    }), r
}, {
    requires: ["base", "template", "switchable", "../../utils/monitor", "../../utils/keycode"]
}), KISSY.add("tbr/utils/monitor", function (e) {
    var t = {}, a = window,
		n = !/assets\.daily\.taobao\.net/.test(e.Config.base);
    return t.sendPmid = function (t) {
        e.log("[monitor]pmid: " + t), n && e.isString(t) && "" != t && (e.log("[monitor]\u6b63\u5e38\u73af\u5883\uff0c\u53d1\u9001pmid"), a.document.createElement("img").src = "http://ju.mmstat.com/?url=http://www.atpanel.com?ad_id=&am_id=&cm_id=&pm_id=" + t)
    }, t.goldlog = function (e, t, i) {
        n && (a.goldlog_queue || (a.goldlog_queue = [])).push({
            action: "goldlog.record",
            arguments: [e, "", t, i]
        })
    }, t
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
				a = e.keyCode,
				n = e.shiftKey,
				i = (e.ctrlKey, e.metaKey);
            return a && (a = 1 * a, ((a >= 96 && 105 >= a || a >= 48 && 57 >= a) && n || a >= 65 && 90 >= a && !i || a >= 219 && 222 >= a || a >= 186 && 192 >= a) && (t = !0)), t
        }
    }
}), KISSY.add("tbr/comp/dropdown", function (e, t, a, n) {
    function i(t, a) {
        return i.superclass.constructor.call(this), t ? (this._init(t, a), void 0) : (e.error("\u627e\u4e0d\u5230selectNode"), void 0)
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
                var a = this.get("labelNode"),
					n = this.get("labelLinkNode");
                e.newVal ? (n.prop("tabindex", "-1"), a.addClass("tbr-dropdown-disabled"), t.get("aria") && n.attr("aria-disabled", "true")) : (a.removeClass("tbr-dropdown-disabled"), n.prop("tabindex", "0"), t.get("aria") && n.attr("aria-disabled", "false"))
            }), this.on("afterActiveMenuItemNodeChange", function (e) {
                e.prevVal && e.prevVal.removeClass("tbr-active"), e.newVal && (e.newVal.addClass("tbr-active"), this.get("labelLinkNode").attr("aria-activedescendant", e.newVal.prop("id")))
            }), this.on("afterBlankLabelChange", function (e) {
                t.get("labelLinkNode").html(e.newVal)
            }), this._selectUI.on("afterValueChange", function (a) {
                var n = a.newVal.selectedIndex;
                e.each(t._dataArr, function (e) {
                    e.index == n && t.get("labelLinkNode").html(e.text)
                }), t.set("value", a.newVal)
            })
        },
        _init: function (t, n) {
            var i, r, s, d, l, u = this;
            this._selectNode = t, this._selectUI = new a(t), this.set("label", n.label), this.set("aria", n.aria), this.set("groupFilter", n.groupFilter), this.set("labelledBy", n.labelledBy), this.set("id", this._selectNode.attr("data-id")), this._selectNode.hide(), this._id = this.get("id") + "-dropdown" || "", i = e.one(o.create(e.substitute('<div class="tbr-dropdown" id="{id}-label"><a href="http://www.taobao.com" target="_blank" hidefocus="true"></a><span class="tbr-icon"></span><div class="tbr-log" role="log" aria-live="assertive" aria-relevant="all" aria-atomic="true"></div></div>', {
                id: this._id
            }))), this.set("labelNode", i), this.set("logNode", i.one(".tbr-log")), r = e.one(o.create(e.substitute('<div class="tbr-dropdown-menu" id="{id}-menu"><ul></ul></div>', {
                id: this._id
            }))), this.set("menuNode", r), i.insertAfter(t), r.appendTo(document.body), this.get("labelledBy") && (l = e.one(e.DOM.create('<label class="tbr-dropdown-label">' + (this._selectNode.attr("data-label") || this.get("label")) + "</label>")), l.prop("id", this._id + "-labelledby"), this.get("logNode").prop("id", this._id + "-log"), i.append(l), this.set("labelledByNode", l)), r.delegate("mouseover", "a", function (t) {
                u.set("activeMenuItemNode", e.one(t.target).parent("li"))
            }), this._mousedownMenuItemDOMNode = null, r.one("ul").on("mousedown", function (t) {
                e.log("mousedown: " + t.target.nodeName);
                var a, n = e.one(t.target),
					i = n.prop("nodeName").toUpperCase();
                t.target != this && (a = "LI" != i ? n.parent("li") : n, u._mousedownMenuItemDOMNode = a.getDOMNode())
            }).on("mouseup", function (t) {
                e.log("mouseup: " + t.target.nodeName);
                var a, n, i = e.one(t.target),
					o = i.prop("nodeName").toUpperCase();
                t.target != this && (n = "LI" != o ? i.parent("li") : i, n.getDOMNode() == u._mousedownMenuItemDOMNode && (a = n.attr("data-index"), a > -1 && (u.collapse(), u.selectByIndex(a), u.fire("select"), u.set("activeMenuItemNode", n))))
            }).on("click", function (t) {
                e.log("click: " + t.target.nodeName), ("A" == t.target.nodeName.toUpperCase() || e.one(t.target).parent("a")) && t.preventDefault()
            }).on("mousedown", function (t) {
                e.log("container mousedown: " + t.target.nodeName), e.UA.ie && 9 > e.UA.ie && (u.get("labelLinkNode").getDOMNode().onbeforedeactivate = function () {
                    window.event.returnValue = !1, this.onbeforedeactivate = null
                }), t.preventDefault()
            }), i.on("click", function (t) {
                e.log("label clicked: " + t.target.nodeName), ("A" == t.target.nodeName.toUpperCase() || e.one(t.target).parent("a")) && t.preventDefault(), u.get("disabled") || u.expand()
            }), s = i.one("a"), this.set("labelLinkNode", s), s.on("blur", function () {
                e.log("[dropdown]blur"), u.blurTimeout || (e.log("set timeout"), u.blurTimeout = e.later(function () {
                    e.log("blur happens"), u._collapse(), u.get("labelNode").removeClass("tbr-dropdown-active")
                }, 100))
            }).on("focus", function () {
                e.log("[dropdown]focus"), u.blurTimeout && (e.log("blur cancelled"), u.blurTimeout.cancel(), u.blurTimeout = null), u.get("disabled") || u.get("labelNode").addClass("tbr-dropdown-active"), u.get("disabled") || u.expand()
            }), this._load(), this._collapse(), d = r.prop("id"), this.get("aria") && (s.attr({
                role: "combobox",
                "aria-haspopup": "true",
                "aria-owns": d,
                "aria-disabled": "false"
            }), r.attr({
                role: "listbox",
                "aria-expanded": "false"
            }), this.get("label") ? (s.attr("aria-label", this.get("label")), this.get("logNode").attr("aria-label", this.get("label"))) : this.get("labelledByNode") && (s.attr("aria-labelledby", this.get("labelledByNode").prop("id")), this.get("logNode").attr("aria-labelledby", this.get("labelledByNode").prop("id")))), this._bindEvents()
        },
        load: function (e, t, a) {
            this._selectUI.load(e, t, {
                silent: !0
            }), this._load(a)
        },
        _getDataArrFromOptionDOMNodeArr: function (t) {
            var a = [];
            return e.each(t, function (e, t) {
                a.push({
                    text: e.innerHTML,
                    index: t,
                    selected: e.selected,
                    optionDOMNode: e
                })
            }), a
        },
        _load: function (a) {
            var n, i, o = this._selectUI.getOptionNodeList().getDOMNodes(),
				s = "",
				d = 0,
				l = t(r),
				u = this;
            this._dataArr = [], n = this.get("groupFilter") ? this.get("groupFilter")(this._getDataArrFromOptionDOMNodeArr(o)) : [this._getDataArrFromOptionDOMNodeArr(o)], e.each(n, function (e) {
                var t = e.length;
                t > d && (d = t)
            }), e.each(n, function (e) {
                var t = e.length;
                if (d > t) for (; d >= t; ) e.push(null), t++
            });
            for (var c = 0; d > c; c++) for (var h = 0, p = n.length; p > h; h++) {
                var f = n[h][c];
                f || (f = {
                    index: -1,
                    text: "",
                    selected: !1
                }), f.id = u.get("id"), f.row = c + 1, f.col = h + 1, f.rows = d, f.cols = n.length, f.aria = this.get("aria"), s += l.render(f), u._dataArr.push(f), f.selected && (i = f.text)
            }
            this.get("menuNode").one("ul").html(s), this.get("labelLinkNode").html(i || this.get("blankLabel")), this.set("value", this._selectUI.get("value"), a), i ? this.set("disabled", !1) : this.set("disabled", !0), this.fire("load")
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
            this._changeActiveMenuItem(), this.get("menuNode").show(), this.get("logNode").html((this.get("label") || this.get("labelledByNode").text()) + "\u83dc\u5355\u5c55\u5f00\u4e86\uff0c\u6309\u65b9\u5411\u952e\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), this.fire("expand"), this.get("aria") && this.get("menuNode").attr("aria-expanded", "true"), this._locate(), this.get("labelNode").detach("keydown").on("keydown", function (a) {
                var i = a.keyCode,
					o = e.one(a.target),
					r = (o.parent("li"), t.get("activeMenuItemNode")),
					s = 1 * r.attr("data-col"),
					d = 1 * r.attr("data-row"),
					l = 0,
					u = 0,
					c = !1,
					h = r.attr("data-rows"),
					p = r.attr("data-cols");
                e.log("[dropdown]keydown"), a.stopPropagation(), i == n.UP ? (a.preventDefault(), d > 1 && (l = d - 1, c = !0)) : i == n.DOWN ? (a.preventDefault(), h > d && (l = d + 1, c = !0)) : i == n.LEFT ? (a.preventDefault(), s > 1 && (u = s - 1, c = !0)) : i == n.RIGHT ? (a.preventDefault(), p > s && (u = s + 1, c = !0)) : i == n.ENTER ? (a.preventDefault(), t._collapse(), t.selectByIndex(t.get("activeMenuItemNode").attr("data-index")), t.fire("select")) : i == n.ESC && t._collapse(), c && (0 == l && (l = d), 0 == u && (u = s), t._changeActiveMenuItem(l, u))
            })
        },
        _locate: function () {
            var e = this.get("labelNode"),
				t = this.get("menuNode"),
				a = e.offset(),
				n = this.get("labelNode").css("border-bottom-width") + "",
				i = n.match(/^(\d+)(px)?$/),
				o = 0;
            n = i ? 1 * i[1] : 0, t.css("left", a.left + e.outerWidth() - t.outerWidth() + "px"), t.css("top", a.top + e.outerHeight() - n + o + "px")
        },
        _collapse: function () {
            var t = this;
            this.get("menuNode").hide(), this.get("logNode").html((this.get("label") || this.get("labelledByNode").text()) + "\u83dc\u5355\u6536\u8d77\u4e86"), this.fire("collapse"), this.get("aria") && this.get("menuNode").attr("aria-expanded", "false"), this.get("labelNode").detach("keydown").on("keydown", function (a) {
                var i = a.keyCode;
                e.log("[dropdown]keydown"), a.stopPropagation(), i == n.UP ? (a.preventDefault(), t._selectPrev()) : i == n.DOWN ? (a.preventDefault(), t._selectNext()) : i == n.ENTER && a.preventDefault()
            })
        },
        _changeActiveMenuItem: function (e, t) {
            var a, n = this,
				i = this.get("menuNode");
            e && t ? i.all("li").each(function (a) {
                return a.attr("data-col") == t && a.attr("data-row") == e ? ("" != a.html() && n.set("activeMenuItemNode", a), !1) : void 0
            }) : (a = this._selectNode.prop("selectedIndex"), a >= 0 && i.all("li").each(function (e) {
                return e.attr("data-index") == a ? (n.set("activeMenuItemNode", e), !1) : void 0
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
            var a, n, i = this._selectNode.prop("options");
            i.length > 0 ? (a = this._selectNode.prop("selectedIndex"), n = e.one(i[a]), this.set("value", {
                value: n.val(),
                text: n.html(),
                node: n,
                selectedIndex: a
            }, t)) : this.reset("value", t)
        },
        _selectByCondition: function (t, a) {
            var n = !1,
				i = this._selectNode.getDOMNode(),
				o = i.selectedIndex,
				r = -1,
				s = this;
            return e.each(i.options, function (e, a) {
                return t(e, a) ? (e.selected = !0, r = a, n = !0, !1) : void 0
            }), e.log(o), e.log(r), n && o != r && !a && s._setValue(), n
        },
        selectByText: function (t, a) {
            return e.isString(t) ? this._selectByCondition(function (e) {
                return e.innerHTML == t
            }, a) : !1
        },
        selectByValue: function (t, a) {
            return e.isString(t) ? this._selectByCondition(function (e) {
                return e.value == t
            }, a) : !1
        },
        selectByIndex: function (e, t) {
            var a = this._selectNode.getDOMNode();
            return a.selectedIndex, 0 > e || e > a.options.length - 1 ? !1 : this._selectByCondition(function (t, a) {
                return e == a
            }, t)
        },
        load: function (t, a, n) {
            var i, o = this._selectNode.getDOMNode(),
				r = !1;
            return e.isArray(t) && e.isArray(a) && t.length == a.length && (e.UA.ie ? (o.options.length = 0, e.each(t, function (e, n) {
                var i = new Option(t[n], a[n]);
                o.options[n] = i
            })) : (i = "", e.each(t, function (e, t) {
                i += '<option value="' + a[t] + '">' + e + "</option>"
            }), this._selectNode.html(i)), o.selectedIndex = 0, r = !0), this._setValue(n), r
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
}), KISSY.add("tbr/comp/radio", function (e) {
    function t(a) {
        var n = this;
        t.superclass.constructor.call(this), this.set("inputDOMNodeArr", a.all(".tbr-radio-input").getDOMNodes()), this._labelNodeArr = [], this.on("afterSelectedIndexChange", function (e) {
            e.prevVal >= 0 && this._labelNodeArr[e.prevVal].removeClass("tbr-active"), e.newVal >= 0 && this._labelNodeArr[e.newVal].addClass("tbr-active"), this.set("value", {
                value: n.get("inputDOMNodeArr")[e.newVal].value,
                text: n._getLabel(n._labelNodeArr[e.newVal].html())
            })
        }), e.each(this.get("inputDOMNodeArr"), function (t, a) {
            var i, o, r = e.one(t);
            i = r.parent("label"), n._labelNodeArr.push(i), o = "radio" + e.guid(), i && (r.prop("id", o), i.prop("htmlFor", o)), r.prop("checked") && n.set("selectedIndex", a), r.on("click", function () {
                n.set("selectedIndex", a)
            })
        })
    }
    return e.extend(t, e.Base, {
        checkByValue: function (t, a) {
            return e.isString(t) || (t = ""), this._checkByCondition(function (e) {
                return e.value == t
            }, a)
        },
        _checkByCondition: function (e, t) {
            var a = !1,
				n = 0;
            return this._nodeList.each(function (t, i) {
                return e(t) ? (t.checked = !0, a = !0, n = i, !1) : void 0
            }), a || (n = 0), this.set("selectedIndex", n, {
                silent: t
            }), a
        },
        _getLabel: function (t) {
            var a = t.match(/^<input.*\/?>(.*)$/);
            return e.isArray(a) && 2 == a.length ? a[1] : ""
        }
    }, {
        ATTRS: {
            value: {
                value: {
                    value: "",
                    text: ""
                }
            },
            selectedIndex: {
                value: -1,
                validator: function (e) {
                    return e >= -1 && this.get("inputDOMNodeArr").length > e
                }
            },
            inputDOMNodeArr: {
                value: null
            }
        }
    }), t
}), KISSY.add("tbr/request", function (e, t) {
    var a = function (t) {
        return t && e.inArray(t.type, ["phone", "card", "qq"]) ? (this.type = t.type, void 0) : (e.error("request obj needs a type"), void 0)
    }, n = {};
    return n.get = function (a, n) {
        var i = null,
			o = this;
        i = e.later(function () {
            o.fire("loading")
        }, 1e3), t({
            url: a,
            dataType: "jsonp",
            timeout: 5,
            cache: !1,
            complete: function () {
                i.cancel(), i = null
            },
            error: function (e, t) {
                o.fire("error", {
                    errorType: t,
                    itemId: "",
                    skuId: "",
                    itemType: ""
                })
            },
            success: function (e) {
                var t, a;
                "phone" == o.type ? "" == e.item_id_num ? o.fire("error", {
                    errorType: "exception",
                    itemId: "",
                    skuId: "",
                    itemType: ""
                }) : "\u6682\u7f3a" == e.item_id_num ? o.fire("error", {
                    errorType: "stockout",
                    itemId: "",
                    skuId: "",
                    itemType: ""
                }) : (e.itemType = e.platform ? "tbcp" : "ecard", e.itemId = e.item_id_num, e.skuId = e.sku_id, o.fire("success", {
                    result: e
                })) : ("card" == o.type ? "auto" == n.itemType ? (a = e.ecard, a ? t = "ecard" : (a = e.tbcp, a && (t = "tbcp"))) : (a = e.cardcode, a && (t = "cardcode")) : "qq" == o.type && (a = e.ecard, a ? t = "ecard" : (a = e.tbcp, a && (t = "tbcp"))), a ? (a.itemType = t, o.fire("success", {
                    result: a
                })) : o.fire("error", {
                    errorType: "stockout",
                    itemId: "",
                    skuId: "",
                    itemType: ""
                }))
            }
        })
    }, e.augment(a, e.EventTarget, n), a
}, {
    requires: ["ajax"]
}), KISSY.add("tbr/url/card", function (e, t) {
    function a(t) {
        a.superclass.constructor.call(this, e.mix({
            type: "card"
        }, t))
    }
    return e.extend(a, t, {
        _validateForReqeust: function (e) {
            return this._validateParamArr([e.catId, e.denomVId, e.itemType])
        },
        _validateForSearch: function (e) {
            return this._validateParamArr([e.catId, e.denomVId, e.itemType])
        },
        _generateRequestUrlData: function (t) {
            var a = {}, n = this._skuDataMap[t.catId],
				i = this._denomDataMap[t.catId][t.denomVId];
            return a.cat = t.catId, a.reserve_price = i.text, a.filter = "reserve_price[" + i.filter + "]", a.newpidvid = n.denomPId + ":" + t.denomVId + ";", a.pidvid = "20435:6076017;" + a.newpidvid, a.itemType = t.itemType, a.urlBase = this._requestUrlBase, a._input_charset = "utf-8", a.env = this._env, a.url = a.urlBase + "?" + e.param(a), a
        },
        _generateSearchUrlData: function (t) {
            var a = {};
            return a.urlBase = this._searchUrlBase, skuData = this._skuDataMap[t.catId], a.ppath = skuData.denomPId + ":" + skuData.denomVId, a.url = a.urlBase + "?" + e.param(a), a
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
    }), a
}, {
    requires: ["./base", "../data/phone"]
}), KISSY.add("tbr/url/base", function (e) {
    function t(e) {
        this._env = e.env, this._init(e.type)
    }
    return e.augment(t, {
        _init: function (t) {
            var a;
            t && e.inArray(t, ["phone", "qq", "card"]) || e.error("[url]\u7c7b\u522b\u9519\u8bef"), a = e.namespace("tbr"), a && a[t] || e.error("[url]\u6570\u636e\u9519\u8bef"), this._skuDataMap = a[t].skuDataMap, this._denomDataMap = a[t].denomDataMap, this._promotion = a.promotion, this._requestUrlBase = a.requestUrlBase[t], this._searchUrlBase = a.searchUrlBase, this._requestUrlDataCache = {}, this._searchUrlDataCache = {}
        },
        _validateParamArr: function (t) {
            var a = !0;
            return e.each(t, function (t) {
                return e.isString(t) && "" != t ? void 0 : (a = !1, !1)
            }), a
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
            var t, a;
            return this._validateForReqeust(e) ? (t = this._getRequestUrlSPU(e), a = this._requestUrlDataCache[t], a || (a = this._generateRequestUrlData(e)), a || (this._requestUrlDataCache[t] = a)) : a = {
                url: ""
            }, a
        },
        getRequestUrl: function (e) {
            return this._getRequestUrlData(e).url
        },
        _getSearchUrlData: function (e) {
            var t, a;
            return this._validateForSearch(e) ? (t = this._getSearchUrlSPU(e), a = this._searchUrlDataCache[t], a || (a = this._generateSearchUrlData(e)), a || (this._searchUrlDataCache[t] = a)) : a = {
                url: ""
            }, a
        },
        getSearchUrl: function (e) {
            return this._getSearchUrlData(e).url
        }
    }), t
}), KISSY.add("tbr/data/phone", function () {
    var e = {
        "\u79fb\u52a8": ["20779", "20780", "20789"],
        "\u8054\u901a": ["20781", "20782", "20790"],
        "\u7535\u4fe1": ["1626917", "1626918", "1626919"],
        "\u56fa\u8bdd": ["20791", "20792"]
    }, t = {
        "\u79fb\u52a8": "150401",
        "\u8054\u901a": "150402",
        "\u7535\u4fe1": "50011814"
    }, a = {
        "\u79fb\u52a8": "150401",
        "\u8054\u901a": "150402",
        "\u7535\u4fe1": "50018446",
        "\u56fa\u8bdd": "150406"
    }, n = {
        "\u897f\u85cf": "27009",
        "\u5317\u4eac": "29400",
        "\u91cd\u5e86": "29404",
        "\u4e0a\u6d77": "29423",
        "\u5929\u6d25": "29428",
        "\u5185\u8499\u53e4": "30495",
        "\u9ed1\u9f99\u6c5f": "30496",
        "\u5409\u6797": "30497",
        "\u8fbd\u5b81": "30498",
        "\u6cb3\u5317": "30499",
        "\u6cb3\u5357": "30500",
        "\u5c71\u4e1c": "30501",
        "\u5c71\u897f": "30502",
        "\u9655\u897f": "30503",
        "\u9752\u6d77": "30504",
        "\u7518\u8083": "30505",
        "\u65b0\u7586": "30506",
        "\u5b81\u590f": "30507",
        "\u56db\u5ddd": "30508",
        "\u5b89\u5fbd": "30509",
        "\u6d59\u6c5f": "30510",
        "\u6c5f\u82cf": "30511",
        "\u6c5f\u897f": "30512",
        "\u6e56\u5317": "30513",
        "\u6e56\u5357": "30514",
        "\u4e91\u5357": "30515",
        "\u8d35\u5dde": "30516",
        "\u5e7f\u4e1c": "30517",
        "\u5e7f\u897f": "30518",
        "\u798f\u5efa": "30519",
        "\u6d77\u5357": "30520"
    }, i = {
        1: "30675",
        10: "30676",
        20: "30677",
        30: "30688",
        50: "30678",
        100: "30679",
        133: "38584",
        200: "30690",
        300: "30691",
        500: "30692",
        1000: "38182"
    }, o = {
        "150401-tbcp-1": "1.2,2",
        "150401-tbcp-10": "9.9,12",
        "150401-tbcp-20": "20,23",
        "150401-tbcp-30": "29.5,32",
        "150401-tbcp-50": "49,50",
        "150401-tbcp-100": "98,100",
        "150401-tbcp-200": "196.4,200",
        "150401-tbcp-300": "294.6,300",
        "150401-tbcp-500": "490,500",
        "150401-tbcp-1000": "984,1000",
        "150402-tbcp-1": "1.2,2",
        "150402-tbcp-10": "9.7,12",
        "150402-tbcp-20": "19.4,23",
        "150402-tbcp-30": "29.4,32",
        "150402-tbcp-50": "49,50",
        "150402-tbcp-100": "98,100",
        "150402-tbcp-133": "130,135",
        "150402-tbcp-200": "196.4,200",
        "150402-tbcp-300": "294.6,300",
        "150402-tbcp-500": "490,500",
        "150402-tbcp-1000": "984,1000",
        "50011814-tbcp-1": "1.2,2",
        "50011814-tbcp-10": "9.9,12",
        "50011814-tbcp-20": "20,23",
        "50011814-tbcp-30": "29.5,32",
        "50011814-tbcp-50": "49,50",
        "50011814-tbcp-100": "98,100",
        "50011814-tbcp-200": "196.4,200",
        "50011814-tbcp-300": "294.6,300",
        "50011814-tbcp-500": "490,500",
        "50011814-tbcp-1000": "984,1000",
        "150401-ecard-10": "9,10.6",
        "150401-ecard-20": "18,20.5",
        "150401-ecard-30": "28,30.5",
        "150401-ecard-50": "45.0,49.98",
        "150401-ecard-100": "96.0,99.98",
        "150401-ecard-200": "190,199.6",
        "150401-ecard-300": "290,299.5",
        "150401-ecard-500": "490,498",
        "150401-ecard-1000": "990,999",
        "150402-ecard-10": "9,10.5",
        "150402-ecard-20": "19,20.5",
        "150402-ecard-30": "29,30.5",
        "150402-ecard-50": "45.0,49.98",
        "150402-ecard-100": "96.0,99.98",
        "150402-ecard-133": "130,133",
        "150402-ecard-200": "199,199.9",
        "150402-ecard-300": "290,299",
        "150402-ecard-500": "490,499",
        "150402-ecard-1000": "990,999",
        "50011814-ecard-10": "9,10.5",
        "50011814-ecard-20": "19,20.5",
        "50011814-ecard-30": "29,30.5",
        "50011814-ecard-50": "45.0,49.98",
        "50011814-ecard-100": "96.0,99.98",
        "50011814-ecard-200": "190,199.9",
        "50011814-ecard-300": "290,298",
        "50011814-ecard-500": "490,499",
        "50011814-ecard-1000": "990,999"
    }, r = {
        "tbcp-1": "0.98,1.5",
        "tbcp-10": "10,10.6",
        "tbcp-20": "19.84,20.8",
        "tbcp-30": "29.58,31.5",
        "tbcp-50": "49.3,49.9",
        "tbcp-100": "98,99.6",
        "tbcp-133": "130.3,131.6",
        "tbcp-200": "199,199.5",
        "tbcp-300": "299,299.3",
        "tbcp-500": "498,498.9",
        "tbcp-1000": "980,990",
        "ecard-1": "0.98,1.5",
        "ecard-10": "9.8,9.9",
        "ecard-20": "19.6,20",
        "ecard-30": "29.4,30",
        "ecard-50": "49,49.8",
        "ecard-100": "98,99.5",
        "ecard-133": "130.3,131.6",
        "ecard-200": "196,199",
        "ecard-300": "294,299",
        "ecard-500": "490,498",
        "ecard-1000": "980,990"
    };
    return {
        CARRIER_CODES: e,
        CARRIER_ID_TO_REQUEST: t,
        CARRIER_ID_TO_SEARCH: a,
        PROVINCE_CODES: n,
        DENOM_CODES: i,
        DENOM_INTERVAL_TO_REQUEST: o,
        DENOM_INTERVAL_TO_SHOW: r
    }
}), KISSY.add("tbr/result/general2", function (e) {
    var t = "&yen;",
		a = "\u5143",
		n = function (t) {
		    try {
		        this.resultNode = t.containerNode.one(".tbr-result"), this.bdNode = this.resultNode.one(".tbr-block-bd"), this.hdLabelNode = this.resultNode.one(".tbr-result-label"), this.priceStyle = e.namespace("tbr").priceStyle || "taobao", this.buyBtnNode = t.containerNode.one(".tbr-btn-buy"), this.type = t.type
		    } catch (a) {
		        e.error("result initialization fails")
		    }
		};
    return e.augment(n, e.EventTarget, {
        printPrice: function (n) {
            var i = n.price;
            this.resultNode.show(), this.buyBtnNode.show(), this.hdLabelNode && this.hdLabelNode.html("\u552e\u4ef7"), "taobao" != this.priceStyle ? this.bdNode.html(e.substitute('<span class="tbr-price"><strong>{price}</strong><span>{unit}</span></span>', {
                unit: a,
                price: i
            })) : this.bdNode.html(e.substitute('<span class="tbr-price"><span>{unit}</span><strong>{price}</strong></span>', {
                unit: t,
                price: i
            }))
        },
        printStockout: function (t) {
            var a, n = t.url;
            this.resultNode.show(), this.buyBtnNode.hide(), this.hdLabelNode ? (this.hdLabelNode.html("\u6682\u7f3a"), a = "\u70b9\u51fb\u641c\u7d22\u6216\u9009\u62e9\u5176\u4ed6\u9762\u503c") : a = "\u7f3a\u8d27\uff0c\u70b9\u51fb\u641c\u7d22\u6216\u9009\u62e9\u5176\u4ed6\u9762\u503c", this.bdNode.html(e.substitute('<a href="{url}" target="_blank" class="tbr-stockout">{text}</a>', {
                url: n,
                text: a
            })), this.bdNode.one("a").on("click", function () {
                "phone" == this.type ? Monitor.goldlog("/wanle.10.5", "", "47700902") : "qq" == this.type ? Monitor.goldlog("/wanle.10.15", "", "47700902") : "card" == this.type && Monitor.goldlog("/wanle.10.11", "", "47700902")
            })
        },
        printLoading: function () {
            this.resultNode.show(), this.buyBtnNode.show(), this.bdNode.html('<span class="tbr-loading">\u6b63\u5728\u67e5\u8be2...</span>')
        },
        printError: function () {
            this.buyBtnNode.show(), this.resultNode.hide()
        },
        printPriceIntervals: function (n) {
            this.buyBtnNode.show(), this.resultNode.show(), this.hdLabelNode && this.hdLabelNode.html("\u552e\u4ef7"), "taobao" != this.priceStyle ? this.bdNode.html(e.substitute('<span class="tbr-price"><strong>{price1}</strong><span>{unit}</span>-<strong>{price2}</strong><span>{unit}</span></span>', {
                unit: a,
                price1: n[0],
                price2: n[1]
            })) : this.bdNode.html(e.substitute('<span class="tbr-price"><span>{unit}</span><strong>{price1}-{price2}</strong></span>', {
                unit: t,
                price1: n[0],
                price2: n[1]
            }))
        },
        getContainer: function () {
            return this.resultNode
        }
    }), n
}), KISSY.add("tbr/buy", function (e) {
    function t(a) {
        a && a.containerNode && a.type || e.error("[buy]\u53c2\u6570\u9519\u8bef"), t.superclass.constructor.call(this), this._type = a.type, this._fastbuy = e.namespace("tbr").fastbuy || !1, e.log("[buy]\u8bbf\u5ba2: " + !!this._fastbuy), this._containerNode = a.containerNode, this._btnNode = this._containerNode.one(".tbr-btn-buy"), this._bindEvents()
    }
    return e.extend(t, e.Base, {
        _bindEvents: function () {
            var t = this;
            this._btnNode.on("click", function (a) {
                a.preventDefault(), e.log("[buy]\u5145\u503c\u6309\u94ae\u88ab\u70b9\u51fb"), t.fire("click"), t._validate() ? t.fire("submit", {
                    formNode: t._formNode
                }) : e.log("[buy]\u9a8c\u8bc1\u5931\u8d25")
            }), this.on("afterDisabledChnage", function (e) {
                e.newVal ? t._btnNode.addClass("tbr-disabled") : t._btnNode.removeClass("tbr-disabled")
            })
        },
        _validate: function () {
            var t = !1,
				a = e.namespace("tbr")[this._type].data,
				n = e.namespace("tbr")[this._type].itemData;
            return "phone" == this._type ? (t = n.success && n.itemId && a.number, t && (this._formNode = this._containerNode.one(".tbr-form-buy"), this._formNode.prop("phone").value = a.number, this._formNode.prop("item_id_num").value = n.itemId)) : "qq" == this._type ? (t = n.success && n.itemId && a.number && e.isString(n.skuId) && "" != n.skuId, t && (this._fastbuy && "ecard" == n.itemType ? this._formNode = this._containerNode.one(".tbr-form-fastbuy") : (this._formNode = this._containerNode.one(".tbr-form-buy"), this._formNode.prop("qqnum").value = a.number, this._formNode.prop("action").value = e.one(this._formNode.prop("action")).attr("data-" + n.itemType)), this._formNode.prop("item_id_num").value = n.itemId, this._formNode.prop("sku_id").value = n.skuId)) : "card" == this._type && (t = n.success && n.itemId && e.isString(n.skuId) && "" != n.skuId, t && (this._fastbuy && "ecard" == n.itemType ? this._formNode = this._containerNode.one(".tbr-form-fastbuy") : (this._formNode = this._containerNode.one(".tbr-form-buy"), this._formNode.prop("action").value = "cardcode" == n.itemType ? e.one(this._formNode.prop("action")).attr("data-cardcode") : ""), this._formNode.prop("item_id_num").value = n.itemId, this._formNode.prop("sku_id").value = n.skuId)), e.log("[buy]validate result " + t), t
        },
        submit: function () {
            var t = this;
            e.log("[buy]\u63d0\u4ea4\u8868\u5355"), this._formNode.getDOMNode().submit(), this.set("disabled", !0), e.later(function () {
                t.set("disabled", !1)
            }, 1e3)
        }
    }, {
        ATTRS: {
            disabled: {
                value: !0
            }
        }
    }), t
}, {
    requires: ["./utils/monitor"]
}), KISSY.add("tbr/config", function (e) {
    var t = /assets\.daily\.taobao\.net/.test(e.Config.base),
		a = t ? "tcc.daily.taobao.net" : "tcc.taobao.com";
    return {
        start: function (t, a, n) {
            e.log("[config]start to config " + t), "phone" == t ? this._startPhone(a) : "qq" == t ? this._startQQ(a) : this._startCard(a), this._start(t, a, n)
        },
        _start: function (t, n, i) {
            var o = e.namespace("tbr"),
				r = t;
            "mytaobao" == n && (o._startBasic || e.mix(o, {
                priceStyle: "taobao",
                searchUrlBase: "http://list.taobao.com/browse/browse/search_auction.htm?atype=b&commend=all&sort=bid&olu=yes&",
                numberHistory: {
                    max: 5
                },
                resultType: "general2",
                _startBasic: !0
            }), o._startData ? (e.log("[config]completed with " + t), i && i()) : (("card" == t || "qq" == t) && (r = "game"), e.IO({
                url: e.substitute("http://{hostname}/cc/json/loginInfo.htm?env={env}&type={type}", {
                    hostname: a,
                    env: "fp" == n ? "fp_2012" : n,
                    type: r
                }),
                dataType: "jsonp",
                timeout: 5,
                cache: !1,
                scriptCharset: "gbk",
                error: function () {
                    e.error("\u6570\u636e\u63a5\u53e3\u8bf7\u6c42\u51fa\u9519")
                },
                success: function (a) {
                    var n = e.namespace("tbr");
                    a && a.success ? (e.mix(n, {
                        fastbuy: a.isFastBuy,
                        loggedIn: a.hasLoggedIn,
                        phone: {
                            ad1: {
                                text: "",
                                href: ""
                            },
                            ad2: {
                                text: "",
                                href: ""
                            }
                        }
                    }, void 0, void 0, !0), "game" == r && (e.log("[config]read game data"), n._startData = !0, e.mix(n, {
                        card: {
                            skuDataList: a.card,
                            skuDataMap: {},
                            denomDataMap: {}
                        }
                    }, void 0, void 0, !0), e.each(e.tbr.card.skuDataList, function (t) {
                        var a, n, i;
                        e.tbr.card.skuDataMap[t.catId] = t, n = t.denomVId.split(","), a = t.denomText.split(","), i = t.denomFilter.split(";"), e.tbr.card.denomDataMap[t.catId] || (e.tbr.card.denomDataMap[t.catId] = {}), e.each(n, function (n, o) {
                            e.tbr.card.denomDataMap[t.catId][n] = {
                                text: a[o],
                                filter: i[o]
                            }
                        }), t.isDefault && (e.tbr.card.defaultCatIdArr || (e.tbr.card.defaultCatIdArr = []), e.tbr.card.defaultCatIdArr.push(t.catId))
                    }), e.tbr.card.defaultCatIdArr.length > 0 && (e.tbr.card.defaultCatId = e.tbr.card.defaultCatIdArr[Math.floor(Math.random() * e.tbr.card.defaultCatIdArr.length)]), e.mix(n, {
                        qq: {
                            skuDataList: a.qq,
                            skuDataMap: {},
                            denomDataMap: {}
                        }
                    }, void 0, void 0, !0), e.each(e.tbr.qq.skuDataList, function (t) {
                        var a, n, i;
                        e.tbr.qq.skuDataMap[t.catId] = t, n = t.denomVId.split(","), a = t.denomText.split(","), i = t.denomFilter.split(";"), e.tbr.qq.denomDataMap[t.catId] || (e.tbr.qq.denomDataMap[t.catId] = {}), e.each(n, function (n, o) {
                            e.tbr.qq.denomDataMap[t.catId][n] = {
                                text: a[o],
                                filter: i[o]
                            }
                        }), t.isDefault && !e.tbr.qq.defaultCatId && (e.tbr.qq.defaultCatId = t.catId)
                    })), e.log("[config]completed with " + t), i && i()) : e.error("\u6570\u636e\u63a5\u53e3\u5f02\u5e38")
                }
            })))
        },
        _startPhone: function (t) {
            var n = e.namespace("tbr");
            "mytaobao" == t && e.mix(n, {
                requestUrlBase: {
                    phone: "http://" + a + "/cc/json/mobile_price.htm"
                },
                phone: {
                    pmid: "1501042928119d6d9f31"
                }
            }, void 0, void 0, !0)
        },
        _startQQ: function (t) {
            var n = e.namespace("tbr");
            "mytaobao" == t && e.mix(n, {
                requestUrlBase: {
                    qq: "http://" + a + "/cc/game_card_choose.htm"
                },
                qq: {
                    pmid: "15005743000a9d9fe2a2"
                }
            }, void 0, void 0, !0)
        },
        _startCard: function (t) {
            var n = e.namespace("tbr");
            "mytaobao" == t && e.mix(n, {
                requestUrlBase: {
                    card: "http://" + a + "/cc/json/game_card_price.htm"
                },
                card: {
                    pmid: "15005742994f5cd3af3d"
                }
            }, void 0, void 0, !0)
        }
    }
}), KISSY.add("tbr/init/card", function () { }), KISSY.add("tbr/loader", function (e, t) {
    return {
        load: function (a, n, i) {
            e.inArray(a, ["phone", "qq", "card"]) || e.error("\u4e0d\u652f\u6301\u6b64\u7c7b\u578b\u7684\u5145\u503c\u6846"), t.start(a, n, function () {
                e.log("[loader]start to load " + a), e.use(e.substitute("tbr/control/{rechargerType}/index,tbr/request,tbr/url/{rechargerType},tbr/result/{resultType},tbr/buy", {
                    rechargerType: a,
                    resultType: e.namespace("tbr").resultType || "general"
                }), function (e, t, o, r, s, d) {
                    function l() {
                        this.publish("submit", {
                            bubbles: !0
                        })
                    }
                    function u(i) {
                        var u = this,
							c = e.namespace("tbr." + a).data = {}, h = e.namespace("tbr." + a).itemData = {
							    success: !1
							}, p = null,
							f = e.one("#tbr-" + i.type);
                        e.mix(i, {
                            containerNode: f
                        }), "1000386" == e.one("body").attr("data-spm") ? f.parent().addClass("tbr-env-fp1") : f.parent().addClass("tbr-env-fp2"), this.request = new o(i), this.result = new s(i), this.buy = new d(i), this.control = new t(i), this.urlGenerator = new r({
                            env: "fp" == n ? "fp_2012" : n
                        }), this.control.on("afterValueChange", function (t) {
                            var a;
                            e.mix(c, t.newVal), c.request && ("qq" == i.type && (Math.floor(10 * Math.random()) + 1 > 8 ? (e.log("[loader]requested itemtype is ecard"), c.itemType = "ecard") : (e.log("[loader]requested itemtype is tbcp"), c.itemType = "tbcp")), a = u.urlGenerator.getRequestUrl(c), "" != a ? (e.log("request item via " + a), u.request.get(a, c), p && (p.cancel(), p = null), p = e.later(function () {
                                u.result.printLoading()
                            }, 1e3)) : "phone" == i.type ? (u.result.printPriceIntervals(u.urlGenerator.getIntervalArr(c)), h.success = !1) : (u.result.printError(), h.success = !1))
                        }), this.request.on("success", function (t) {
                            h.success = !0, e.mix(h, t.result), p && (p.cancel(), p = null), u.result.printPrice(t.result)
                        }), this.request.on("error", function () {
                            h.success = !1, p && (p.cancel(), p = null), u.result.printStockout({
                                url: u.urlGenerator.getSearchUrl(c)
                            })
                        }), this.eventTarget = new l, this.eventTarget.on("submit", function () {
                            u.control.snapshot(), u.buy.submit()
                        }), this.publish("submit", {
                            bubbles: !0
                        }), this.addTarget(this.eventTarget), this.buy.on("click", function () {
                            u.control.validate()
                        }), this.buy.on("submit", function () {
                            u.fire("submit")
                        }), this.control.init()
                    }
                    e.augment(l, e.EventTarget), e.augment(u, e.EventTarget), i && i(new u({
                        type: a
                    }))
                })
            })
        }
    }
}, {
    requires: ["tbr/config"]
});