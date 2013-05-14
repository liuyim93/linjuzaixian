/*pub-1|2013-05-03 12:21:26*/
KISSY.add("tb-home/js/game/v2/auto-complete", function (f, x, w, i, l, e, h) {
    var u = f.DOM;
    var v = f.Node;
    var k = x.Target;
    var t = v.one("body");
    var g = "callback";
    var n = "dataFormat";
    var m = "dataReturn";
    var b = "beforeShow";
    var a = "dataFilter";
    var q = "dataHandle";
    var o = "dataError";
    var d = "hotSelect";
    var j = "itemSelect";
    var r = "suggest-focus";
    var c = "-nav-selected";
    var p = {
        containerCls: "",
        hotHtml: '<div class="auto-complete-title">(\u652f\u6301\u9996\u5b57\u6bcd/\u6c49\u5b57/\u62fc\u97f3\u8f93\u5165)</div><div class="auto-complete-nav ks-switchable-nav">{{#each results as it}}<span aria-labelledby="game_{{it.tabname}}">{{it.tabname}}<div class="new-service-hide" id="game_{{it.tabname}}">{{it.title}}</div></span>{{/each}}</div><div class="auto-complete-content ks-switchable-content">{{#each results as it}}<div class="auto-complete-pannel ks-switchable-panel-internal">{{#each it.tabdata as data}}<dl><dt>{{data.dt}}</dt><dd>{{#each data.dd as one}}<span><a data-code="{{one.result}}" href="#" title="{{one.key}}">{{one._key}}</a></span>{{/each}}</dd></dl>{{/each}}</div>{{/each}}</div>',
        errorHtml: "",
        hasHot: true,
        hotWidth: 290,
        hotAlign: "left",
        suggestWidth: "",
        hasIcon: false,
        isFillFirstItem: true,
        classPrefix: "auto-complete",
        dataReturn: null
    };

    function s(y, z) {
        var A = this;
        A._inputId = y;
        A._inputNode = f.one(y);
        A.id = f.guid();
        A.inHot = false;
        p = f.merge(p, z);
        A.template = w(p.hotHtml);
        A._init()
    }
    f.augment(s, k, {
        _init: function () {
            var y = this;
            y._setSuggestConfig();
            y.errorBox = new i(y._inputNode);
            y._initSuggest();
            if (p.hasIcon) {
                y._createIcon()
            } else {
                y._inputNodeBox = y._inputNode
            }
            if (p.hasHot) {
                p.hotHtml = f.substitute(p.hotHtml, p, /\\?\%([^{}]+)\%/g)
            }
            y._bindInput();
            y._bindIcon()
        },
        _initSuggest: function () {
            var y = this;
            y._suggest = new l(y._inputId, p.suggestUrl, y.suggestConfig);
            y._suggest.container.id = y.id;
            y.container = v.one("#" + y.id);
            y._suggest.on(j, function (z) {
                y.hide();
                y.fire(j, z)
            });
            y._suggest.on(b, function (A) {
                var z = y.container.one("li");
                if (z) {
                    y._suggest._setSelectedItem(z[0]);
                    y.inHot = false
                }
                y.fire(b, A)
            });
            y._suggest.on(m, function (z) {
                y._suggest._setContainerRegion();
                y.fire(m, z.data)
            });
            y._suggest.on(a, function (z) {
                return y.fire(a, z)
            });
            y._suggest.on(q, function (z) {
                if (z.status) {
                    y.errorBox.set("");
                    y.errorBox.hide()
                } else {
                    if (z.query === "" && p.hasHot) {
                        y.errorBox.set("");
                        y.errorBox.hide();
                        y.showHot();
                        return
                    }
                    y.errorBox.set("\u5bf9\u4e0d\u8d77\u6ca1\u6709\u627e\u5230\u8fd9\u4e2a\u6e38\u620f");
                    y.errorBox.show();
                    x.delegate(document, "click", "body", y._outClick, y)
                }
            })
        },
        _setSuggestConfig: function () {
            var y = this;
            y.suggestConfig = {
                dataType: 2,
                submitOnSelect: false,
                containerWidth: p.suggestWidth,
                contentRenderer: p.contentRenderer,
                containerCls: p.containerCls
            }
        },
        _bindInput: function () {
            var y = this;
            var z = y._inputNode;
            y.isIcon = false;
            y._inputNode.on("focus", this._focus, this);
            y._inputNodeBox.on("keydown", y._keyDown, y);
            p.hasHot && y._bindHotEvent();
            y._inputNode.next().on("click", function () {
                y.isIcon = true;
                (f.UA.ie <= 7) && y._inputNode[0].focus()
            })
        },
        _bindIcon: function () {
            var z = f.one("#game-goods .game-s");
            var y = this;
            z.on("keydown", function (B) {
                var A = B.keyCode;
                if (A === 13) {
                    y._focus(B);
                    y.showHot()
                } else {
                    if (A === 9) {
                        y.hide()
                    }
                }
                B.stopPropagation()
            });
            z.on("click", function (A) {
                if (f.UA.ie <= 9) {
                    y._focus(A)
                }
            })
        },
        _outClick: function (B) {
            var z = this;
            var A = B.target;
            var C = A.nodeName;
            var y = z._inputNodeBox.getDOMNode();
            while (A != y && C != "BODY") {
                A = A.parentNode;
                C = A.nodeName
            }
            if (C == "BODY") {
                if (z.errorBox.isVisible()) {
                    z.fire(o)
                } else {
                    if (!z.inHot) {
                        z._suggest.stop();
                        z._suggest._updateInputFromSelectItem();
                        z._suggest.query = "";
                        z.fire(j)
                    }
                }
                z.hide()
            }
        },
        _focus: function (z) {
            var y = this;
            y._inputNodeBox.addClass(r);
            f.one("#game-goods .game-s").addClass("s-hover");
            if (p.hasHot && (y.isIcon || y._inputNode.val() == "")) {
                y.showHot();
                y._suggest.query = y._inputNode.val();
                y.isIcon = false
            } else {
                y.errorBox.show();
                y._suggest.start();
                x.delegate(document, "click", "body", y._outClick, y)
            }
            setTimeout(function () {
                y._setSelected()
            }, 0)
        },
        _keyDown: function (C) {
            var z = this;
            var y = z._suggest.isVisible();
            var B = C.keyCode;
            if (B == 9 && C.shiftKey) {
                z.hide();
                return
            }
            if (y && B == 9 && z.container.one(".ks-switchable-nav")) {
                C.halt();
                setTimeout(function () {
                    z.switchTab.triggers[0].focus()
                }, 1)
            } else {
                if (y && B == 9) {
                    z.hide();
                    return
                }
            }
            var A = f.one("#game-goods .game-s");
            if (!y && B == 27) {
                A.attr("tabIndex", 1)
            }
            if (!y && B == 9 && A.attr("tabIndex")) {
                C.halt();
                A.getDOMNode().focus();
                A.attr("tabIndex", "")
            }
            if (!y && B == 13) {
                C.halt();
                z._inputNode.getDOMNode().focus()
            }
        },
        _setSelected: function () {
            var B = this,
				A = B._inputNode[0],
				y = A.value.length;
            if (A.createTextRange) {
                var z = A.createTextRange();
                z.moveStart("character", 0);
                z.moveEnd("character", y);
                z.select()
            } else {
                A.setSelectionRange(0, y)
            }
        },
        showHot: function () {
            var y = this;
            y.errorBox.set("");
            if (y.hotDate) {
                y._dealHotDate()
            } else {
                y._getHot()
            }
            x.delegate(document, "click", "body", y._outClick, y)
        },
        _getHot: function () {
            var y = this;
            f.io({
                dataType: "jsonp",
                url: p.hotUrl,
                jsonp: g,
                success: function (z) {
                    z = y.fire(n, {
                        data: z
                    });
                    y._suggest.dataSource = z.source;
                    z = z.data;
                    if (z.results && z.results.length) {
                        y.hotDate = z;
                        y._dealHotDate()
                    }
                }
            })
        },
        _dealHotDate: function () {
            var y = this;
            if (!y._hotDateHTML) {
                y._hotDateHTML = y.template.render(y.hotDate)
            }
            y._suggest._fillContainer(y._hotDateHTML);
            y.show();
            y.container.css("width", p.hotWidth);
            if (p.hotAlign === "right") {
                if (f.UA.ie == 6) {
                    y.container.offset({
                        left: u.offset(y.container).left + y._suggest.textInput.offsetWidth - p.hotWidth - 2
                    })
                } else {
                    y.container.css("left", u.offset(y.container).left + y._suggest.textInput.offsetWidth - p.hotWidth - ((f.UA.ie == 7) ? 4 : 2))
                }
            }
            y.switchTab = new e.Tabs("#" + y.id, {
                autoplay: false,
                switchTo: 0,
                triggerType: "click",
                activeTriggerCls: "ks-switchable-nav",
                activeTriggerCls: "auto-complete-nav-selected",
                aria: true
            })
        },
        _bindHotEvent: function () {
            var z = this,
				y = z._inputNode.getDOMNode();
            z.container.delegate("click keydown", "a", function (C) {
                var B = C.keyCode;
                if (B !== h && B !== 0 && C.keyCode !== 13) {
                    return
                }
                C.preventDefault();
                z.errorBox.set("");
                var A = C.currentTarget;
                z.inHot = true;
                y.value = A.title;
                z.hide();
                z.fire(d, C);
                z.fire(j, C);
                C.stopPropagation()
            });
            z.container.delegate("keydown", "span", function (B) {
                if (B.keyCode == 9 && B.shiftKey) {
                    var A = B.target;
                    if (A.nodeName == "SPAN") {
                        z._inputNode.getDOMNode().focus()
                    }
                }
            });
            z.container.on("click", function (A) {
                A.halt()
            })
        },
        updateDate: function (y) {
            this._suggest.returnedData = y
        },
        show: function () {
            var y = this;
            y._suggest.show();
            x.delegate(document, "click", "body", y._outClick, y)
        },
        hide: function () {
            var y = this;
            y._suggest.stop();
            y._suggest.hide();
            y._inputNodeBox.removeClass(r);
            f.one("#game-goods .game-s").removeClass("s-hover");
            x.undelegate(document, "click", "body", y._outClick, y);
            y.errorBox.hide();
            y.inHot = false
        },
        showErrorMsg: function () {
            var y = this;
            var z = u.create('<div class="' + p.classPrefix + '"></div>');
            z.insertBefore(y.container, y.container.firstChild)
        }
    });
    return s
}, {
    requires: ["event", "template", "tb-home/js/game/v2/errorbox", "tb-home/js/game/v2/auto-suggest", "switchable"]
});