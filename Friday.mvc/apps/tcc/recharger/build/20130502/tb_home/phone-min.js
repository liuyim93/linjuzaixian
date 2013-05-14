KISSY.add("tbr/control/phone/index", function (e, t, a) {
    function n(i) {
        var r = this;
        n.superclass.constructor.call(this), i.containerNode.all("a, input").on("keydown", function (e) {
            e.stopPropagation()
        }), this.number = new t, this.denomDropdown = new a(e.one("#tbr-phone-denom select"), {
            groupFilter: function (t) {
                var a = [
					[],
					[]
				];
                return e.each(t, function (e) {
                    var t = e.optionDOMNode.value;
                    e.text = '<span class="tbr-figure">' + t + "</span>\u5143", 100 > t ? a[1].push(e) : a[0].push(e)
                }), a
            },
            labelledBy: !0
        }), this.on("afterValueChange", function () {
            e.log("[phone-control]value is changed")
        }), this.number.on("afterValueChange", function (t) {
            r.set("value", e.merge(r.get("value"), t.newVal, {
                request: !0
            }))
        }), this.denomDropdown.on("afterValueChange", function () {
            r.set("value", e.merge(r.get("value"), {
                denom: this.get("value").value
            }, {
                request: !0
            }))
        })
    }
    return e.extend(n, e.Base, {
        init: function () {
            this.set("value", e.merge(this.get("value"), {
                denom: this.denomDropdown.get("value").value
            }, this.number.get("value"), {
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
                value: {
                    itemType: "ecard"
                }
            }
        }
    }), n
}, {
    requires: ["./number", "../../comp/dropdown"]
}), KISSY.add("tbr/control/phone/number", function (e, t, a, n, i, r, o, s) {
    function l(h) {
        var p = this;
        l.superclass.constructor.apply(this, arguments);
        try {
            this._inputNode = e.one("#tbr-phone-number input"), this._appendTo = this._inputNode.parent(".tbr-container").getDOMNode(), this._iconNode = e.one(e.DOM.create('<span class="tbr-icon" title="\u70b9\u51fb\u67e5\u770b\u5145\u503c\u5386\u53f2"></span>')), this._iconNode.insertAfter(this._inputNode), this.set("logNode", e.one(e.DOM.create('<div id="tbr-phone-number-log" aria-labelledby="tbr-phone-number-label" class="tbr-log" role="log" aria-live="assertive" aria-relevant="all" aria-atomic="true"></div>'))), this.get("logNode").insertAfter(this._inputNode)
        } catch (b) {
            e.error("\u521d\u59cb\u5316\u5931\u8d25")
        }
        this._accept = e.namespace("tbr.phone.number").accept, !e.isNumber(this._accept) || this._accept == d.FIXED && this._accept == d.TEL || (this._accept = 1 * this._inputNode.attr("data-accept")), !e.isNumber(this._accept) || this._accept == d.FIXED && this._accept == d.TEL || (this._accept = d.UNKNOWN), this._numberInput = new t(this._inputNode, h), this.menu = new n(this._inputNode), this._tip = new a(this._inputNode, {
            appendTo: this._appendTo
        }), this._inputNode.parent().append(e.DOM.create('<label id="tbr-phone-number-label" class="tbr-input-label" for="' + this._inputNode.prop("id") + '">\u53f7\u7801:</label>')), this._showHistory = !1, this._lastValidNumber = "", this._inputNode.attr({
            role: "combobox",
            "aria-owns": this.menu.get("id"),
            "aria-haspopup": "true"
        }), this._tip.on("show", function (e) {
            p.get("logNode").html(e.node.text())
        }), this._numberInput.on("focus", function () {
            var t = this;
            e.log("[phone-number]input focuses"), p._lastInputValue = this.getValue(), !p._showHistory && p.menu.isHidden() && ("" == this.getValue() ? i.get(function (t, a) {
                t.length > 0 && (p.menu.set("itemTemplate", u), e.each(t, function (e) {
                    e.value = e.number
                }), p.menu.show(t), p.set("menuName", "\u5145\u503c\u5386\u53f2\u53f7\u7801\u83dc\u5355"), p.get("logNode").html(p.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), p.menu.getMenuNode().one("ul").addClass("tbr-history"), a && "cloud" == a && p.menu.getMenuNode().one("ul").addClass("tbr-history-cloud"))
            }) : (p.menu.set("itemTemplate", c), i.get(function (e, a) {
                e = p._filter(t.getValue(), e), p.menu.show(e), p.set("menuName", "\u8054\u60f3\u53f7\u7801\u83dc\u5355"), p.get("logNode").html(p.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), p.menu.getMenuNode().one("ul").removeClass("tbr-history"), a && "cloud" == a && p.menu.getMenuNode().one("ul").removeClass("tbr-history-cloud")
            })))
        }).on("blur", function () {
            e.log("[phone-number]input blurs, hide popups"), p.menu.isHidden() || (e.log("[phone-number]menu is visible, hide it"), p.menu.hide(), p.get("logNode").html(p.set("menuName") + "\u83dc\u5355\u6536\u8d77\u4e86")), p._tip.hide()
        }).on("keyup", function () {
            var t = this.getValue(),
				a = this;
            p._updateMaxLength(t), t != p._lastInputValue && (p._lastInputValue = t, p.menu.hide(), p._tip.hide(), p._accept != d.FIXED && r.isTelNumber(t) ? (e.log("[phone-number]user inputs a telephone number" + t), e.log("[phone-number]change the last valid number to " + t), e.log("[phone-number]try to show the number's info"), p._lastValidNumber = t, p._showTelNumberInfo(t)) : "" == t ? (e.log("[phone-number]user inputs a empty number"), e.log("[phone-number]try to show his charging history"), i.get(function (t, a) {
                t.length > 0 && (p.menu.set("itemTemplate", u), e.each(t, function (e) {
                    e.value = e.number
                }), p.menu.show(t), p.set("menuName", "\u5145\u503c\u5386\u53f2\u53f7\u7801\u83dc\u5355"), p.get("logNode").html(p.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), p.menu.getMenuNode().one("ul").addClass("tbr-history"), a && "cloud" == a && p.menu.getMenuNode().one("ul").addClass("tbr-history-cloud"))
            })) : (e.log("[phone-number]user inputs some numbers"), e.log("[phone-number]try to show suggestion"), i.get(function (e, t) {
                p.menu.set("itemTemplate", c), e = p._filter(a.getValue(), e), p.menu.show(e), p.set("menuName", "\u8054\u60f3\u53f7\u7801\u83dc\u5355"), p.get("logNode").html(p.set("menuName") + "\u5c55\u5f00\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952e\u6536\u8d77\u83dc\u5355"), p.menu.getMenuNode().one("ul").removeClass("tbr-history"), t && "cloud" == t && p.menu.getMenuNode().one("ul").removeClass("tbr-history-cloud")
            })))
        }).on("keydown", function (t) {
            var a;
            p.menu.isHidden() || (a = t.keyCode, a == o.UP ? p.menu.set("selectedIndex", p.menu.get("selectedIndex") - 1) : a == o.DOWN ? p.menu.set("selectedIndex", p.menu.get("selectedIndex") + 1) : a == o.ENTER ? (p.menu.hide(), p._updateMaxLength(p.menu.getValue()), e.log("[phone-number]menu's value " + p.menu.getValue()), this.load(p.menu.getValue()), p.get("logNode").html(p.set("menuName") + "\u83dc\u5355\u6536\u8d77\u4e86\uff0c\u4f60\u9009\u62e9\u4e86" + p.menu.getValue()), s.goldlog("/wanle.10.3", "", "47700902")) : (a == o.ESC || a == o.TAB) && (p.menu.hide(), p.get("logNode").html(p.set("menuName") + "\u83dc\u5355\u6536\u8d77\u4e86")))
        }).on("change", function (t) {
            var a, n;
            e.log("[phone-number]number is changed to " + t.newVal), e.log("[phone-number]last valid number is " + p._lastValidNumber), n = t.newVal, n != p._lastValidNumber && (a = r.validate(n, p._accept), a ? (e.log("[phone-number]wrong number " + n), p._showError(), p._lastValidNumber = "") : (p._tip.hide(), e.log("[phone-number]last valid number is " + n), p._lastValidNumber = n, r.isTelNumber(n) ? p._showTelNumberInfo(n) : p._showFixedNumberInfo(n)))
        }), this._iconNode.on("click", function () {
            e.log("[phone-number]icon is clicked"), s.goldlog("/wanle.10.2", "", "47700902"), p._showHistory = !0, p._inputNode.getDOMNode().focus(), i.get(function (t, a) {
                p._showHistory = !1, t.length > 0 ? (p.menu.set("itemTemplate", u), e.each(t, function (e) {
                    e.value = e.number
                }), p.menu.show(t), p.set("menuName", "\u5145\u503c\u5386\u53f2\u53f7\u7801\u83dc\u5355"), p.get("logNode").html(p.set("menuName") + "\u5c55\u4e86\uff0c\u6309\u4e0a\u4e0b\u65b9\u5411\u952e\u8fdb\u884c\u5207\u6362\u9009\u9879\uff0c\u6309ENTER\u952e\u9009\u62e9\uff0c\u6309ESC\u952et\u83dc\u5355"), p.menu.getMenuNode().one("ul").addClass("tbr-history"), a && "cloud" == a && p.menu.getMenuNode().one("ul").addClass("tbr-history-cloud")) : p._tip.show("\u60a8\u8fd8\u6ca1\u6709\u5145\u503c\u8bb0\u5f55")
            })
        }), this.menu.on("select", function (t) {
            var a = t.value;
            e.log("[phone-number]menu item is selected: " + a), s.goldlog("/wanle.10.3", "", "47700902"), p._updateMaxLength(a), p._numberInput.load(a), p._inputNode.getDOMNode().blur(), p.get("logNode").html("\u4f60\u9009\u62e9\u4e86" + a)
        }).on("highlight", function (e) {
            p._inputNode.attr("aria-activedescendant", e.node.prop("id"))
        })
    }
    var d = r.NUMBER_TYPE,
		u = '<span class="tbr-number tbr-figure">{{data.number}}</span><span class="tbr-name">{{data.name}}</span>',
		c = '<span class="tbr-hit tbr-figure">{{data.hit}}</span><span class="tbr-left tbr-figure">{{data.left}}</span>';
    return e.extend(l, e.Base, {
        _filter: function (t, a) {
            var n = r.format2(t),
				i = RegExp("^(" + n + ")(.*)$"),
				o = [];
            return e.each(a, function (t) {
                var a, n, s = r.format(t.number);
                i.test(s) && (a = s.match(i), n = e.mix({}, t), n.hit = a[1], n.left = a[2], n.value = t.number, o.push(n))
            }), 0 == o.length && o.push({
                hit: n,
                value: t,
                left: ""
            }), o
        },
        _showTelNumberInfo: function (t) {
            var a = this;
            this._infoTimeout && (this._infoTimeout.cancel(), this._infoTimeout = null), this._infoTimeout = e.later(function () {
                a._showNumberInfo('<p class="tbr-loading">\u8bf7\u7a0d\u5019...</p>')
            }, 1e3), r.getNumberInfo(t, function (n) {
                a._infoTimeout && (a._infoTimeout.cancel(), a._infoTimeout = null), e.log("[phone-number]info html text: " + e.substitute('<p class="tbr-success">{area}{carrier}</p>', n)), a._showNumberInfo(e.substitute('<p class="tbr-success">{area}{carrier}</p>', n)), a.set("value", {
                    numberType: d.TEL,
                    number: t,
                    carrier: n.carrier,
                    area: n.area
                })
            }, function (n) {
                a._infoTimeout && (a._infoTimeout.cancel(), a._infoTimeout = null), a._showNumberInfo(e.substitute('<p class="tbr-error"><a href=http://bangpai.taobao.com/group/233792.htm target="_blank">\u53f7\u7801\u4fe1\u606f\u672a\u77e5</a></p>', n)), a.set("value", {
                    numberType: d.TEL,
                    number: t,
                    carrier: "",
                    area: ""
                })
            })
        },
        _showFixedNumberInfo: function (t) {
            var a = r.getProvince(t);
            "" != a ? (this._showNumberInfo(e.substitute('<p class="tbr-success">{area}{carrier}</p>', {
                carrier: "\u56fa\u8bdd",
                area: a
            })), this.set("value", {
                numberType: d.FIXED,
                number: t,
                carrier: "\u56fa\u8bdd",
                area: a
            })) : (this._showNumberInfo(e.substitute('<p class="tbr-error"><a href=http://bangpai.taobao.com/group/233792.htm target="_blank">\u53f7\u7801\u4fe1\u606f\u672a\u77e5</a></p>', data)), this.set("value", {
                numberType: d.FIXED,
                number: t,
                carrier: "",
                area: ""
            }))
        },
        _showNumberInfo: function (t) {
            e.log("[phone-number]show number info"), this._infoNode || (this._infoNode = e.one(e.DOM.create('<div class="tbr-numberinfo"></div>')), this._infoNode.appendTo(e.one("#tbr-phone-number .tbr-block-bd"))), this._infoNode.html(t), this.get("logNode").html(this._infoNode.text()), this._infoNode.show()
        },
        _hideNumberInfo: function () {
            e.log("[phone-number]hide number info"), this._infoNode && this._infoNode.hide()
        },
        _showError: function (t) {
            e.isString(t) && t && (e.log("[phone-number]show msg " + t), this._tip.show(t)), this._hideNumberInfo(), this.reset("value")
        },
        _updateMaxLength: function (e) {
            /^1/.test(e) && this._accept != d.FIXED ? (this._inputNode.prop("maxlength", "11"), e.length > 11 && this._numberInput.load(e.substring(0, 11))) : "" != e && this._accept != d.TEL && this._inputNode.prop("maxlength", "12")
        },
        snapshot: function () {
            e.log("[phone-number]save " + this.get("value").number + " into localstorage"), i.addToLocalStorage(this.get("value").number)
        },
        validate: function () {
            e.log("[phone-number]validating...");
            var t, a = this._numberInput.getValue();
            "" != a ? (t = r.validate(a, this._accept), t ? ("\u53f7\u7801\u6709\u8bef\uff0c\u56fa\u8bdd\u8bf7\u52a0\u533a\u53f7" == t && s.goldlog("/wanle.10.4", "", "47700902"), this._showError(t)) : this._tip.hide()) : this._showError("\u8bf7\u8f93\u5165\u53f7\u7801")
        }
    }, {
        ATTRS: {
            value: {
                value: {
                    number: "",
                    numberType: d.UNKNOWN,
                    carrier: "",
                    area: ""
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
            }
        }
    }), l
}, {
    requires: ["../../comp/numberTextInput", "../../comp/textInputTip", "../../comp/textInputMenu", "../../history/phoneNumber", "../../utils/numberUtils", "../../utils/keycode", "../../utils/monitor"]
}), KISSY.add("tbr/comp/numberTextInput", function (e, t, a) {
    function n(e) {
        var t = e;
        return /^\d*$/.test(e) || (t = e.replace(/\D/g, "")), t
    }
    e.DOM;
    var i = function (e, i) {
        var r = this;
        this.textInputNode = e, this.textInputNode.addClass("tbr-number-input"), this.textInput = new t(this.textInputNode, i), this.textInput.on("focus", function (e) {
            r.fire("focus", e)
        }).on("blur", function (e) {
            r.fire("blur", e)
        }).on("keydown", function (e) {
            a.inNumberBlacklist(e) ? e.preventDefault() : r.fire("keydown", e)
        }).on("keyup", function (e) {
            var t, a = this.getValue();
            t = n(a), t != a && this.load(t), this.updateMaxLength(/^1/.test(t) ? 11 : 12), r.fire("keyup", e)
        }).on("change", function (e) {
            r.fire("change", e)
        })
    };
    return e.augment(i, e.EventTarget, {
        validate: function () {
            return ""
        },
        load: function (t, a) {
            e.isString(t) && /^\d*$/.test(t) && (e.log("[number-input]load " + t), this.textInput.load(t, a))
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
		a = !1,
		n = e.UA,
		i = n.ie || n.firefox || n.safari || n.chrome,
		r = function (n, o) {
		    var s = this;
		    r.superclass.constructor.apply(this, arguments), this.textInputNode = n, o && o.selectAll && (this._selectAll = !0), o && !e.isUndefined(o.aria) && this.set("aira", o.aria), this.get("aria") && (this.textInputNode.attr("role", "textbox"), o && o.label && this.set("label", o.label)), this.placeholder = this.textInputNode.attr("placeholder") || "", a || this.textInputNode.prop("placeholder", ""), this.valueBeforeChange = "", a ? this.textInputNode.attr("placeholder", this.placeholder) : "" == this.textInputNode.val() ? (this.textInputNode.val(this.placeholder), this.textInputNode.addClass(t)) : (this.placeholder_on = !1, this.textInputNode.removeClass(t)), this.isPasteDisabled = "disabled" == this.textInputNode.attr("data-paste"), this.textInputNode.on("focus", function () {
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
		            var r = s.getValue(),
						o = s.textInputNode;
		            e.log("[text-input]blurring happens"), e.one(i).parent(".tbr-input").removeClass("tbr-input-active"), "" != r || a || (o.val(s.placeholder), o.addClass(t)), s.fire("blur", n)
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
    return e.extend(r, e.Base, {
        getValue: function () {
            var e;
            return e = a || !this.textInputNode.hasClass(t) ? this.textInputNode.val() : ""
        },
        load: function (n, i) {
            var r = this.getValue();
            n = e.trim(n), n != r && (e.log("[text-input]load " + n), "" != n || a ? "" == n || a ? this.textInputNode.val(n) : (this.textInputNode.removeClass(t), this.textInputNode.val(n)) : (this.textInputNode.addClass(t), this.textInputNode.val(this.placeholder)), i || this.fire("change", {
                preVal: r,
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
    }), r
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
				a = e.keyCode,
				n = e.shiftKey,
				i = (e.ctrlKey, e.metaKey);
            return a && (a = 1 * a, ((a >= 96 && 105 >= a || a >= 48 && 57 >= a) && n || a >= 65 && 90 >= a && !i || a >= 219 && 222 >= a || a >= 186 && 192 >= a) && (t = !0)), t
        }
    }
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
				r = i.match(/^(\d+)(px)?$/);
            i = r ? 1 * r[1] : 0, this._node.css("left", a.left - n.left + "px"), this._node.css("top", a.top - n.top + e.outerHeight() - i + "px")
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
		r = "</a>{{/if}}</li>{{/each}}",
		o = function (t, a) {
		    var n = this;
		    o.superclass.constructor.call(this), this._isInitialized = !1, this._inputNode = t, this.config = e.mix({}, a), this.set("id", this._inputNode.prop("id") + "-menu" || ""), this.on("afterSelectedIndexChange", function (t) {
		        var a; -1 != t.newVal && n._node && (a = n._node.all("li"), t.prevVal >= 0 && e.one(a[t.prevVal]).removeClass("tbr-active"), t.newVal >= 0 && e.one(a[t.newVal]).addClass("tbr-active"), this.fire("highlight", {
		            node: e.one(a[t.newVal])
		        }))
		    })
		};
    return e.extend(o, n, {
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
					r = i.prop("nodeName").toUpperCase();
                a.target != this && (n = "LI" != r ? i.parent("li") : i, t._mousedownMenuItemDOMNode = n.getDOMNode())
            }).on("mouseup", function (a) {
                e.log("mouseup: " + a.target.nodeName);
                var n, i, r = e.one(a.target),
					o = r.prop("nodeName").toUpperCase();
                a.target != this && (i = "LI" != o ? r.parent("li") : r, i.getDOMNode() == t._mousedownMenuItemDOMNode && (n = i.attr("data-index"), n > -1 && (t.hide(), t.fire("select", {
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
				r = this;
            e.each(a, function (t, o) {
                var s = e.mix({}, t);
                s.index = o, s.len = a.length, s.id = r.get("id"), i.push(s), t.selected && (n = o)
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
				r = 0;
            n = i ? 1 * i[1] : 0, 8 > e.UA.ie && (r = 0), this._node.css("left", a.left + "px"), this._node.css("top", a.top + t.outerHeight() - n + r + "px")
        },
        hide: function (e) {
            this._hide(e)
        },
        getMenuNode: function () {
            return this._node
        },
        _getTemplate: function () {
            return i + this.get("itemTemplate") + r
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
    }), o
}, {
    requires: ["template"]
}), KISSY.add("tbr/history/phoneNumber", function (e, t) {
    var a = {};
    return e.mix(a, {
        _get: function (t) {
            var a, n = e.tbr.numberHistory.max;
            e.tbr.loggedIn ? (e.log("[history-phonenumber]get history from user's phonebook"), e.IO({
                url: e.substitute("http://{hostname}/chargecontact/query_lastcharge_contact.htm", {
                    hostname: /assets\.daily\.taobao\.net/.test(e.Config.base) ? "tcc.daily.taobao.net" : "tcc.taobao.com"
                }),
                dataType: "jsonp",
                cache: !1,
                timeout: 5,
                error: function (e, t) {
                    throw Error(t)
                },
                success: function (a) {
                    var i = [],
						r = [];
                    a.success ? (e.each(a.phoneBook, function (t) {
                        return n && r.length == n ? !1 : (e.inArray(t.phoneNum, r) || (r.push(t.phoneNum), i.push({
                            number: t.phoneNum,
                            name: t.userName
                        })), void 0)
                    }), e.log("[history-phonenumber]history is founded"), 0 == i.length && e.log("[history-phonenumber]history is empty")) : e.log("[history-phonenumber]shit happens, make the history empty"), e.namespace("tbr.numberHistory").phone = i, e.namespace("tbr.numberHistory").phoneSrc = "cloud", e.isFunction(t) && t(i, "cloud")
                }
            })) : (e.log("[history-phonenumber]get history from local storage"), a = this._getLocalStorage().splice(0, n), e.namespace("tbr.numberHistory").phone = a, e.namespace("tbr.numberHistory").phoneSrc = "local", e.isFunction(t) && t(a, "local"))
        },
        get: function (t) {
            var a, n;
            e.log("[history-phonenumber]checking cache..."), a = e.namespace("tbr.numberHistory").phone, n = e.namespace("tbr.numberHistory").phoneSrc, a ? (e.log("[history-phonenumber]history is found"), e.isFunction(t) && t(a, n)) : this._get(t)
        },
        addToLocalStorage: function (a) {
            var n, i;
            e.log("[history-phonenumber]checking cache..."), n = e.namespace("tbr.numberHistory").phone, n || (e.log("[history-phonenumber]get from local storage"), n = this._getLocalStorage()), i = this._indexOf(a, n), -1 != i && (e.log("[history-phonenumber]find that the number is already in local storage"), e.log("[history-phonenumber]remove it first"), n.splice(i, 1)), e.log("[history-phonenumber]add the number"), n.unshift({
                number: a
            }), n.length > 10 && (e.log("[history-phonenumber]too many items, clean..."), n.splice(10)), e.log("[history-phonenumber]update..."), e.tbr.loggedIn || (e.tbr.numberHistory.phone = n), t.setItem("tbr.numberHistory.phone", this._param(n)), e.log("[history-phonenumber]local storage string is: " + t.getItem("tbr.numberHistory.phone") || "empty")
        },
        _getLocalStorage: function () {
            var a, n = [];
            return a = t.getItem("tbr.numberHistory.phone"), e.log("[history-phonenumber]local storage string is: " + a || "empty"), a && (n = this._unparam(a), n && n.dataArr && (n = n.dataArr)), n
        },
        _indexOf: function (t, a) {
            var n = -1;
            return e.each(a, function (e, a) {
                return e.number == t ? (n = a, !1) : void 0
            }), n
        },
        _param: function (t) {
            var a = [];
            return e.each(t, function (e) {
                a.push(e.number)
            }), a.join(",")
        },
        _unparam: function (t) {
            var a = t.split(","),
				n = [];
            return e.each(a, function (e) {
                n.push({
                    number: e,
                    value: e
                })
            }), n
        }
    }), a
}, {
    requires: ["gallery/local-storage/1.0/index"]
}), KISSY.add("tbr/utils/numberUtils", function (e) {
    var t = e.IO,
		a = {};
    return a.format = function (e) {
        var t = e;
        if (/^1\d{10}$/.test(e)) {
            var a = e.match(/^(\d{3})(\d{4})(\d{4})$/);
            t = a[1] + "-" + a[2] + "-" + a[3]
        } else if (/^0\d{9,11}$/.test(e)) {
            var n = this.getDistrictNumber(e);
            "" !== n && (t = n + "-" + e.substring(n.length))
        }
        return t
    }, a.format2 = function (e) {
        var t = "",
			a = e.length;
        return "1" == e.charAt(0) ? (4 > a ? t = e : (t = e.substring(0, 3), t += 8 > a ? "-" + e.substring(3, a) : "-" + e.substring(3, 7) + "-" + e.substring(7, a)), (3 == a || 7 == a) && (t += "-")) : t = "0" == e.charAt(0) ? 2 >= a ? e : /^0(10|2([0-5]||[7-9]))/.test(e) ? e.substring(0, 3) + "-" + e.substring(3, a) : 4 > e.length ? e : e.substring(0, 4) + "-" + e.substring(4, a) : e, t
    }, a.getDistrictNumber = function (e) {
        var t = "";
        return /^0\d{9,11}$/.test(e) && (t = /^0(10|2([0-5]||[7-9]))/.test(e) ? e.substring(0, 3) : e.substring(0, 4)), t
    }, a.getProvince = function (t) {
        var a = "";
        if (e.isString(t) && /^0[1-9]\d{2}/.test(t)) switch (t.substring(1, 3)) {
            case "10":
                a = "\u5317\u4eac";
                break;
            case "21":
                a = "\u4e0a\u6d77";
                break;
            case "22":
                a = "\u5929\u6d25";
                break;
            case "23":
                a = "\u91cd\u5e86";
                break;
            case "24":
                a = "\u8fbd\u5b81";
                break;
            case "25":
                a = "\u6c5f\u82cf";
                break;
            case "27":
                a = "\u6e56\u5317";
                break;
            case "28":
                a = "\u56db\u5ddd";
                break;
            case "29":
                a = "\u9655\u897f";
                break;
            case "20":
                a = "\u5e7f\u4e1c";
                break;
            case "31":
            case "32":
            case "33":
                a = "\u6cb3\u5317";
                break;
            case "34":
            case "35":
                a = "\u5c71\u897f";
                break;
            case "37":
            case "38":
            case "39":
                a = "\u6cb3\u5357";
                break;
            case "41":
            case "42":
                a = "\u8fbd\u5b81";
                break;
            case "43":
            case "44":
                a = "\u5409\u6797";
                break;
            case "45":
            case "46":
                a = "\u9ed1\u9f99\u6c5f";
                break;
            case "47":
            case "48":
                a = "\u5185\u8499\u53e4";
                break;
            case "51":
            case "52":
                a = "\u6c5f\u82cf";
                break;
            case "53":
            case "54":
            case "63":
                a = "\u5c71\u4e1c";
                break;
            case "55":
            case "56":
                a = "\u5b89\u5fbd";
                break;
            case "57":
            case "58":
                a = "\u6d59\u6c5f";
                break;
            case "59":
                a = "\u798f\u5efa";
                break;
            case "71":
            case "72":
                a = "\u6e56\u5317";
                break;
            case "73":
            case "74":
                a = "\u6e56\u5357";
                break;
            case "75":
            case "76":
            case "66":
                a = "\u5e7f\u4e1c";
                break;
            case "77":
                a = "\u5e7f\u897f";
                break;
            case "79":
            case "70":
                a = "\u6c5f\u897f";
                break;
            case "81":
            case "82":
            case "83":
                a = "\u6c5f\u897f";
                break;
            case "85":
                a = "\u8d35\u5dde";
                break;
            case "87":
            case "88":
            case "69":
                a = "\u4e91\u5357";
                break;
            case "89":
                a = "8" === t.charAt(3) ? "\u6d77\u5357" : "\u897f\u85cf";
                break;
            case "91":
                a = "\u9655\u897f";
                break;
            case "93":
            case "94":
                a = "\u7518\u8083";
                break;
            case "95":
                a = "\u5b81\u590f";
                break;
            case "97":
                a = "\u9752\u6d77";
                break;
            case "99":
            case "90":
                a = "\u65b0\u7586"
        }
        return a
    }, a.NUMBER_TYPE = {
        UNKNOWN: 0,
        TEL: 1,
        FIXED: 2,
        ARR: [0, 1, 2]
    }, a.validate = function (e, t) {
        var a = "";
        return t || (t = this.NUMBER_TYPE.UNKNOWN), a = "" == e ? t == this.NUMBER_TYPE.TEL ? "\u8bf7\u8f93\u5165\u624b\u673a\u53f7\u7801" : t == this.NUMBER_TYPE.FIXED ? "\u8bf7\u8f93\u5165\u56fa\u5b9a\u7535\u8bdd\u53f7\u7801" : "\u8bf7\u8f93\u5165\u5145\u503c\u53f7\u7801" : t == this.NUMBER_TYPE.TEL ? /^1\d{10}$/.test(e) ? "" : /^0/.test(e) ? "\u4e0d\u652f\u6301\u56fa\u5b9a\u7535\u8bdd\u53f7\u7801" : "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801" : t == this.NUMBER_TYPE.FIXED ? /^0\d{9,11}$/.test(e) ? "" : /^1/.test(e) ? "\u4e0d\u652f\u6301\u624b\u673a\u53f7\u7801" : "\u53f7\u7801\u6709\u8bef\uff0c\u56fa\u8bdd\u8bf7\u52a0\u533a\u53f7" : /^(1\d{10})|(0\d{9,11})$/.test(e) ? "" : /^1/.test(e) ? "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7" : "\u53f7\u7801\u6709\u8bef\uff0c\u56fa\u8bdd\u8bf7\u52a0\u533a\u53f7"
    }, a.isFixedNumber = function (e) {
        return /^(0\d{9,11})$/.test(e)
    }, a.isTelNumber = function (e) {
        return /^(1\d{10})$/.test(e)
    }, a._getCarrierStr = function (e) {
        var t = e.match(/\u79fb\u52a8|\u8054\u901a|\u7535\u4fe1/);
        return t && t[0] || ""
    }, a._numberInfoCache = {}, a._tccUrlBase = e.substitute("http://{hostname}/cc/json/mobile_tel_segment.htm", {
        hostname: /assets\.daily\.taobao\.net/.test(e.Config.base) ? "tcc.daily.taobao.net" : "tcc.taobao.com"
    }), a.getNumberInfo = function (a, n, i) {
        var r, o, s = this;
        e.log("[number-utils]start to get info of " + a), /^\d+$/.test(a) && (e.log("[number-utils]number is valid"), e.log("[number-utils]check cache"), r = this._numberInfoCache[a], r ? (e.log("[number-utils]cache is found"), 1 == r.code ? n(r) : i(r)) : (e.log("[number-utils]no cache"), r = {}, "1" == a.charAt(0) ? (e.log("[number-utils]it's a telephone number, get its info from remote server"), t({
            url: this._tccUrlBase,
            dataType: "script",
            scriptCharset: "gbk",
            data: {
                tel: a
            },
            cache: !1,
            timeout: 5,
            error: function () {
                e.log("[number-utils]error happens during requesting, make the info unknown"), r.msg = "\u53f7\u7801\u4fe1\u606f\u672a\u77e5", r.code = -1, e.isFunction(i) && i(r)
            },
            success: function () {
                var t = window.__GetZoneResult_;
                r.msg = "", t.telString ? (e.log("[number-utils]info: " + t.province + ", " + s._getCarrierStr(t.catName)), r.code = 1, e.mix(r, {
                    carrier: s._getCarrierStr(t.catName),
                    area: t.province,
                    number: a
                }), e.log("[number-utils]caching..."), s._numberInfoCache[a] = r, e.isFunction(n) && n(r)) : (r.code = -1, e.log("[number-utils]the info remains unknown"), r.error = "\u53f7\u7801\u4fe1\u606f\u672a\u77e5", e.log("[number-utils]caching..."), s._numberInfoCache[a] = r, e.isFunction(i) && i(r))
            }
        })) : (e.log("[number-utils]it's a fixed number, try to guess its area info"), o = s.getProvince(a), "" != o ? (e.mix(r, {
            carrier: "\u56fa\u8bdd",
            area: o,
            number: a
        }), s._numberInfoCache[a] = r, e.isFunction(n) && n(r)) : (r.error = "\u53f7\u7801\u4fe1\u606f\u672a\u77e5", s._numberInfoCache[a] = r, e.isFunction(i) && i(infoObj)))))
    }, a
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
}), KISSY.add("tbr/comp/dropdown", function (e, t, a, n) {
    function i(t, a) {
        return i.superclass.constructor.call(this), t ? (this._init(t, a), void 0) : (e.error("\u627e\u4e0d\u5230selectNode"), void 0)
    }
    var r = e.DOM,
		o = '<li id="{{id}}-opt-{{index}}" class="tbr-item{{#if selected}} tbr-active{{/if}}{{#if row == 1}} tbr-top{{/if}}{{#if col == 1}} tbr-left{{/if}}" data-index={{index}} data-rows={{rows}} data-cols={{cols}} data-row={{row}} data-col={{col}}{{#if aria}} role="option"{{/if}}>{{#if text}}<a href="http://www.taobao.com" tabindex="-1" target="_blank" hidefocus="true">{{text}}</a>{{/if}}</li>';
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
            var i, o, s, l, d, u = this;
            this._selectNode = t, this._selectUI = new a(t), this.set("label", n.label), this.set("aria", n.aria), this.set("groupFilter", n.groupFilter), this.set("labelledBy", n.labelledBy), this.set("id", this._selectNode.attr("data-id")), this._selectNode.hide(), this._id = this.get("id") + "-dropdown" || "", i = e.one(r.create(e.substitute('<div class="tbr-dropdown" id="{id}-label"><a href="http://www.taobao.com" target="_blank" hidefocus="true"></a><span class="tbr-icon"></span><div class="tbr-log" role="log" aria-live="assertive" aria-relevant="all" aria-atomic="true"></div></div>', {
                id: this._id
            }))), this.set("labelNode", i), this.set("logNode", i.one(".tbr-log")), o = e.one(r.create(e.substitute('<div class="tbr-dropdown-menu" id="{id}-menu"><ul></ul></div>', {
                id: this._id
            }))), this.set("menuNode", o), i.insertAfter(t), o.appendTo(document.body), this.get("labelledBy") && (d = e.one(e.DOM.create('<label class="tbr-dropdown-label">' + (this._selectNode.attr("data-label") || this.get("label")) + "</label>")), d.prop("id", this._id + "-labelledby"), this.get("logNode").prop("id", this._id + "-log"), i.append(d), this.set("labelledByNode", d)), o.delegate("mouseover", "a", function (t) {
                u.set("activeMenuItemNode", e.one(t.target).parent("li"))
            }), this._mousedownMenuItemDOMNode = null, o.one("ul").on("mousedown", function (t) {
                e.log("mousedown: " + t.target.nodeName);
                var a, n = e.one(t.target),
					i = n.prop("nodeName").toUpperCase();
                t.target != this && (a = "LI" != i ? n.parent("li") : n, u._mousedownMenuItemDOMNode = a.getDOMNode())
            }).on("mouseup", function (t) {
                e.log("mouseup: " + t.target.nodeName);
                var a, n, i = e.one(t.target),
					r = i.prop("nodeName").toUpperCase();
                t.target != this && (n = "LI" != r ? i.parent("li") : i, n.getDOMNode() == u._mousedownMenuItemDOMNode && (a = n.attr("data-index"), a > -1 && (u.collapse(), u.selectByIndex(a), u.fire("select"), u.set("activeMenuItemNode", n))))
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
            }), this._load(), this._collapse(), l = o.prop("id"), this.get("aria") && (s.attr({
                role: "combobox",
                "aria-haspopup": "true",
                "aria-owns": l,
                "aria-disabled": "false"
            }), o.attr({
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
            var n, i, r = this._selectUI.getOptionNodeList().getDOMNodes(),
				s = "",
				l = 0,
				d = t(o),
				u = this;
            this._dataArr = [], n = this.get("groupFilter") ? this.get("groupFilter")(this._getDataArrFromOptionDOMNodeArr(r)) : [this._getDataArrFromOptionDOMNodeArr(r)], e.each(n, function (e) {
                var t = e.length;
                t > l && (l = t)
            }), e.each(n, function (e) {
                var t = e.length;
                if (l > t) for (; l >= t; ) e.push(null), t++
            });
            for (var c = 0; l > c; c++) for (var h = 0, p = n.length; p > h; h++) {
                var b = n[h][c];
                b || (b = {
                    index: -1,
                    text: "",
                    selected: !1
                }), b.id = u.get("id"), b.row = c + 1, b.col = h + 1, b.rows = l, b.cols = n.length, b.aria = this.get("aria"), s += d.render(b), u._dataArr.push(b), b.selected && (i = b.text)
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
					r = e.one(a.target),
					o = (r.parent("li"), t.get("activeMenuItemNode")),
					s = 1 * o.attr("data-col"),
					l = 1 * o.attr("data-row"),
					d = 0,
					u = 0,
					c = !1,
					h = o.attr("data-rows"),
					p = o.attr("data-cols");
                e.log("[dropdown]keydown"), a.stopPropagation(), i == n.UP ? (a.preventDefault(), l > 1 && (d = l - 1, c = !0)) : i == n.DOWN ? (a.preventDefault(), h > l && (d = l + 1, c = !0)) : i == n.LEFT ? (a.preventDefault(), s > 1 && (u = s - 1, c = !0)) : i == n.RIGHT ? (a.preventDefault(), p > s && (u = s + 1, c = !0)) : i == n.ENTER ? (a.preventDefault(), t._collapse(), t.selectByIndex(t.get("activeMenuItemNode").attr("data-index")), t.fire("select")) : i == n.ESC && t._collapse(), c && (0 == d && (d = l), 0 == u && (u = s), t._changeActiveMenuItem(d, u))
            })
        },
        _locate: function () {
            var e = this.get("labelNode"),
				t = this.get("menuNode"),
				a = e.offset(),
				n = this.get("labelNode").css("border-bottom-width") + "",
				i = n.match(/^(\d+)(px)?$/),
				r = 0;
            n = i ? 1 * i[1] : 0, t.css("left", a.left + e.outerWidth() - t.outerWidth() + "px"), t.css("top", a.top + e.outerHeight() - n + r + "px")
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
				r = i.selectedIndex,
				o = -1,
				s = this;
            return e.each(i.options, function (e, a) {
                return t(e, a) ? (e.selected = !0, o = a, n = !0, !1) : void 0
            }), e.log(r), e.log(o), n && r != o && !a && s._setValue(), n
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
            var i, r = this._selectNode.getDOMNode(),
				o = !1;
            return e.isArray(t) && e.isArray(a) && t.length == a.length && (e.UA.ie ? (r.options.length = 0, e.each(t, function (e, n) {
                var i = new Option(t[n], a[n]);
                r.options[n] = i
            })) : (i = "", e.each(t, function (e, t) {
                i += '<option value="' + a[t] + '">' + e + "</option>"
            }), this._selectNode.html(i)), r.selectedIndex = 0, o = !0), this._setValue(n), o
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
}), KISSY.add("tbr/request", function (e, t) {
    var a = function (t) {
        return t && e.inArray(t.type, ["phone", "card", "qq"]) ? (this.type = t.type, void 0) : (e.error("request obj needs a type"), void 0)
    }, n = {};
    return n.get = function (a, n) {
        var i = null,
			r = this;
        i = e.later(function () {
            r.fire("loading")
        }, 1e3), t({
            url: a,
            dataType: "jsonp",
            timeout: 5,
            cache: !1,
            complete: function () {
                i.cancel(), i = null
            },
            error: function (e, t) {
                r.fire("error", {
                    errorType: t,
                    itemId: "",
                    skuId: "",
                    itemType: ""
                })
            },
            success: function (e) {
                var t, a;
                "phone" == r.type ? "" == e.item_id_num ? r.fire("error", {
                    errorType: "exception",
                    itemId: "",
                    skuId: "",
                    itemType: ""
                }) : "\u6682\u7f3a" == e.item_id_num ? r.fire("error", {
                    errorType: "stockout",
                    itemId: "",
                    skuId: "",
                    itemType: ""
                }) : (e.itemType = e.platform ? "tbcp" : "ecard", e.itemId = e.item_id_num, e.skuId = e.sku_id, r.fire("success", {
                    result: e
                })) : ("card" == r.type ? "auto" == n.itemType ? (a = e.ecard, a ? t = "ecard" : (a = e.tbcp, a && (t = "tbcp"))) : (a = e.cardcode, a && (t = "cardcode")) : "qq" == r.type && (a = e.ecard, a ? t = "ecard" : (a = e.tbcp, a && (t = "tbcp"))), a ? (a.itemType = t, r.fire("success", {
                    result: a
                })) : r.fire("error", {
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
}), KISSY.add("tbr/url/phone", function (e, t, a) {
    function n(t) {
        n.superclass.constructor.call(this, e.mix({
            type: "phone"
        }, t))
    }
    return e.extend(n, t, {
        _validateForReqeust: function (e) {
            return this._validateParamArr([e.denom, e.carrier, e.area, e.itemType])
        },
        _validateForSearch: function (e) {
            return this._validateParamArr([e.denom, e.carrier, e.area, e.itemType])
        },
        _generateRequestUrlData: function (t) {
            var n = {};
            if (carrier = t.carrier, "\u56fa\u8bdd" == t.carrier && (carrier = "\u7535\u4fe1"), carrier_codes = a.CARRIER_CODES[carrier], n.cat = a.CARRIER_ID_TO_REQUEST[carrier], n.reserve_price = t.denom + "\u5143", "fixed" == t.numberType && (n.fix = "1"), n.search_type = "ecard" == t.itemType ? "ecard_auction" : "mobile_card", n.pidvid = carrier_codes[0] + ":" + a.DENOM_CODES[t.denom] + ";" + carrier_codes[1] + ":" + a.PROVINCE_CODES[t.area] + ";", n.filter = "reserve_price[" + a.DENOM_INTERVAL_TO_REQUEST[n.cat + "-" + t.itemType + "-" + t.denom] + "]", "" != this._promotion) switch (this._promotion) {
                case "taojinbi":
                    n.tbcoin = "1";
                    break;
                case "jhs":
                    n.ptype = "jhs", n.feetype = "1";
                    break;
                case "etao":
                    n.ptype = "etao"
            }
            return n.commend = "all", n._input_charset = "utf-8", n.css = this._env, n.url = this._requestUrlBase + "?" + e.param(n), n
        },
        _generateSearchUrlData: function (t) {
            var n = {};
            return n.cat = a.CARRIER_ID_TO_SEARCH[t.carrier], carrier_codes = a.CARRIER_CODES[t.carrier], n.pidvid = carrier_codes[0] + ":" + a.DENOM_CODES[t.denom] + ";" + carrier_codes[1] + ":" + a.PROVINCE_CODES[t.area] + ";", "fixed" != t.numberType && (itemTypeVId = "ecard" == t.itemType ? "6076017" : "\u79fb\u52a8" == t.carrier ? "84923" : "90682", n.pidvid += carrier_codes[2] + ":" + itemTypeVId), "tbcp" == t.itemType && (n.viewIndex = 1, n.ptdc = 1), n.url = this._searchUrlBase + "?" + e.param(n), n
        },
        _getRequestUrlSPU: function (t) {
            return e.substitute("{area}-{carrier}-{denom}-{itemType}", t)
        },
        _getSearchUrlSPU: function (t) {
            return e.substitute("{area}-{carrier}-{denom}-{itemType}", t)
        },
        getIntervalArr: function (t) {
            return a.DENOM_INTERVAL_TO_SHOW[e.substitute("{itemType}-{denom}", t)].split(",")
        }
    }), n
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
    }, r = {
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
    }, o = {
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
        DENOM_INTERVAL_TO_REQUEST: r,
        DENOM_INTERVAL_TO_SHOW: o
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
            var r = e.namespace("tbr"),
				o = t;
            "mytaobao" == n && (r._startBasic || e.mix(r, {
                priceStyle: "taobao",
                searchUrlBase: "http://list.taobao.com/browse/browse/search_auction.htm?atype=b&commend=all&sort=bid&olu=yes&",
                numberHistory: {
                    max: 5
                },
                resultType: "general2",
                _startBasic: !0
            }), r._startData ? (e.log("[config]completed with " + t), i && i()) : (("card" == t || "qq" == t) && (o = "game"), e.IO({
                url: e.substitute("http://{hostname}/cc/json/loginInfo.htm?env={env}&type={type}", {
                    hostname: a,
                    env: "fp" == n ? "fp_2012" : n,
                    type: o
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
                    }, void 0, void 0, !0), "game" == o && (e.log("[config]read game data"), n._startData = !0, e.mix(n, {
                        card: {
                            skuDataList: a.card,
                            skuDataMap: {},
                            denomDataMap: {}
                        }
                    }, void 0, void 0, !0), e.each(e.tbr.card.skuDataList, function (t) {
                        var a, n, i;
                        e.tbr.card.skuDataMap[t.catId] = t, n = t.denomVId.split(","), a = t.denomText.split(","), i = t.denomFilter.split(";"), e.tbr.card.denomDataMap[t.catId] || (e.tbr.card.denomDataMap[t.catId] = {}), e.each(n, function (n, r) {
                            e.tbr.card.denomDataMap[t.catId][n] = {
                                text: a[r],
                                filter: i[r]
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
                        e.tbr.qq.skuDataMap[t.catId] = t, n = t.denomVId.split(","), a = t.denomText.split(","), i = t.denomFilter.split(";"), e.tbr.qq.denomDataMap[t.catId] || (e.tbr.qq.denomDataMap[t.catId] = {}), e.each(n, function (n, r) {
                            e.tbr.qq.denomDataMap[t.catId][n] = {
                                text: a[r],
                                filter: i[r]
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
}), KISSY.add("tbr/init/phone", function () { }), KISSY.add("tbr/loader", function (e, t) {
    return {
        load: function (a, n, i) {
            e.inArray(a, ["phone", "qq", "card"]) || e.error("\u4e0d\u652f\u6301\u6b64\u7c7b\u578b\u7684\u5145\u503c\u6846"), t.start(a, n, function () {
                e.log("[loader]start to load " + a), e.use(e.substitute("tbr/control/{rechargerType}/index,tbr/request,tbr/url/{rechargerType},tbr/result/{resultType},tbr/buy", {
                    rechargerType: a,
                    resultType: e.namespace("tbr").resultType || "general"
                }), function (e, t, r, o, s, l) {
                    function d() {
                        this.publish("submit", {
                            bubbles: !0
                        })
                    }
                    function u(i) {
                        var u = this,
							c = e.namespace("tbr." + a).data = {}, h = e.namespace("tbr." + a).itemData = {
							    success: !1
							}, p = null,
							b = e.one("#tbr-" + i.type);
                        e.mix(i, {
                            containerNode: b
                        }), "1000386" == e.one("body").attr("data-spm") ? b.parent().addClass("tbr-env-fp1") : b.parent().addClass("tbr-env-fp2"), this.request = new r(i), this.result = new s(i), this.buy = new l(i), this.control = new t(i), this.urlGenerator = new o({
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
                        }), this.eventTarget = new d, this.eventTarget.on("submit", function () {
                            u.control.snapshot(), u.buy.submit()
                        }), this.publish("submit", {
                            bubbles: !0
                        }), this.addTarget(this.eventTarget), this.buy.on("click", function () {
                            u.control.validate()
                        }), this.buy.on("submit", function () {
                            u.fire("submit")
                        }), this.control.init()
                    }
                    e.augment(d, e.EventTarget), e.augment(u, e.EventTarget), i && i(new u({
                        type: a
                    }))
                })
            })
        }
    }
}, {
    requires: ["tbr/config"]
});