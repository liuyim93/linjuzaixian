KISSY.add("wangpu/mods/official/recharge-center", function (f, k) {
    var g = f.DOM,
		m = f.Event,
		l = document,
		a, b = document.all;
    var i = "\u53f7\u7801\u6709\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165",
		h = "\u53f7\u7801\u4e0d\u4e00\u81f4,\u8bf7\u91cd\u65b0\u8f93\u5165",
		e = "\u8bf7\u9009\u62e9\u9762\u503c",
		j = "\u8d27\u7269\u6682\u7f3a",
		d = "\u6b63\u5728\u5904\u7406\u8bf7\u7a0d\u540e\u2026\u2026",
		p = "\u8d27\u7269\u6682\u7f3a\uff0c\u8d2d\u4e70\u5176\u4ed6",
		n = "\u8bf7\u9009\u62e9\u76f8\u5e94\u4fe1\u606f";
    var c = {
        create: function () {
            if (typeof localStorage !== "undefined") {
                a = localStorage
            } else {
                if (b) {
                    a = l.createElement("input");
                    a.type = "hidden";
                    l.body.appendChild(a);
                    a.addBehavior("#default#userData")
                }
            }
        },
        set: function (q, r) {
            if ("setItem" in a) {
                a.setItem(q, r)
            } else {
                if (b) {
                    try {
                        a.setAttribute(q, r);
                        a.save("IELocalDataStore")
                    } catch (s) { }
                }
            }
        },
        get: function (q) {
            if ("getItem" in a) {
                return a.getItem(q)
            } else {
                if (b) {
                    try {
                        a.load("IELocalDataStore");
                        return a.getAttribute(q)
                    } catch (r) { }
                }
            }
        }
    };

    function o(s) {
        var q = this;
        q._mod = s.mod;
        if (!q._mod) {
            return
        }
        var r = f.JSON.parse(g.attr("#J_RechargeData", "data-value"));
        var u = function () {
            this._catOpts = g.get("#J_GameCatId").options;
            this._parPriceOpts = g.get("#J_GameParPrice").options;
            this._catIndex = 0;
            this._parPriceIndex = 0;
            this._gameCatsInfo = new Array;
            this._gameItemsInfo = new Array;
            this._chargeType;
            this._selectedItemId;
            this._searchMore;
            this.init()
        };
        f.augment(u, {
            init: function () {
                this._initGameEvent();
                if (r.showCard && r.showGold) {
                    if (c.get("gameType") == "card") {
                        g.attr("#J_GameCard", "checked", "checked");
                        this._displayCatName("#J_GameCard")
                    } else {
                        if (c.get("gameType") == "gold") {
                            g.attr("#J_GameGold", "checked", "checked");
                            this._displayCatName("#J_GameGold")
                        } else {
                            if (g.attr("#J_GameCard", "checked")) {
                                this._displayCatName("#J_GameCard")
                            } else {
                                if (g.attr("#J_GameGold", "checked")) {
                                    this._displayCatName("#J_GameGold")
                                } else {
                                    g.attr("#J_GameCard", "checked", "checked");
                                    this._displayCatName("#J_GameCard")
                                }
                            }
                        }
                    }
                } else {
                    if (r.showCard) {
                        this._requestCardCatsInfo()
                    } else {
                        if (r.showGold) {
                            this._requestQQCatsInfo()
                        }
                    }
                }
            },
            _initGameEvent: function () {
                var v = this;
                if (g.get("#J_GameCard") && g.get("#J_GameGold")) {
                    m.on("#J_GameCard", "click", function () {
                        v._msgToRecharge();
                        v._displayCatName(this)
                    });
                    m.on("#J_GameGold", "click", function () {
                        v._msgToRecharge();
                        v._displayCatName(this)
                    })
                }
                m.on("#J_GameCatId", "change", function () {
                    v._catIndex = this.selectedIndex;
                    v._catChange()
                });
                m.on("#J_GameParPrice", "change", function () {
                    v._parPriceIndex = this.selectedIndex;
                    v._parPriceChange()
                });
                m.on(l.gameCardForm, "submit", function () {
                    if (v._formValidate()) {
                        if (v._chargeType !== 1) {
                            if (v._chargeType === 2) {
                                g.val(l.gameCardForm.auto_post, "1")
                            }
                            g.val(l.gameCardForm.auto_post_1, "zhanghao");
                            l.gameCardForm.action = r.buyDomain + "/buy_now.htm"
                        }
                        v._rechargeToMsg(d, "dealing");
                        return true
                    } else {
                        return false
                    }
                })
            },
            _displayCatName: function (v) {
                if (g.attr(v, "id") === "J_GameCard") {
                    c.set("gameType", "card");
                    g.text("#J_GameCatName", "\u6e38\u620f\uff1a");
                    this._requestCardCatsInfo()
                } else {
                    c.set("gameType", "gold");
                    g.text("#J_GameCatName", "\u79cd\u7c7b\uff1a");
                    this._requestQQCatsInfo()
                }
            },
            _requestCardCatsInfo: function () {
                var v = this;
                f.io({
                    dataType: "jsonp",
                    url: r.storeDomain + "/shop/rechargeCenter.htm",
                    data: {
                        type: "game",
                        game_type: "card",
                        user_num_id: r.userNumId,
                        sign: r.sign
                    },
                    success: function (w) {
                        v.getCardCats(w)
                    }
                })
            },
            getCardCats: function (v) {
                this._gameCatsInfo = v.cardIdNameInfos;
                this._fillCatOpts()
            },
            _requestQQCatsInfo: function () {
                var v = this;
                f.io({
                    dataType: "jsonp",
                    url: r.storeDomain + "/shop/rechargeCenter.htm",
                    data: {
                        type: "game",
                        game_type: "qq",
                        user_num_id: r.userNumId,
                        sign: r.sign
                    },
                    success: function (w) {
                        v.getQQCats(w)
                    }
                })
            },
            getQQCats: function (v) {
                if (r.searchMoreQQUrl == "") {
                    this._gameCatsInfo = v.qqsInfo
                } else {
                    this._gameCatsInfo = v.qqIdNameInfos
                }
                this._fillCatOpts()
            },
            _fillCatOpts: function () {
                var v = this._catOpts;
                this._recoveryCatOpts();
                this._recoveryPrice();
                if (this._gameCatsInfo.length > 0) {
                    f.each(this._gameCatsInfo, function (w) {
                        v[v.length] = new Option(w.alias, w.categoryId)
                    })
                }
            },
            _recoveryCatOpts: function () {
                this._catOpts.length = 1;
                this._catIndex = 0;
                if (!g.hasClass("#J_GameCatId", "prompt")) {
                    g.addClass("#J_GameCatId", "prompt")
                }
            },
            _recoveryPrice: function () {
                this._parPriceOpts.length = 1;
                this._parPriceIndex = 0;
                if (!g.hasClass("#J_GameParPrice", "prompt")) {
                    g.addClass("#J_GameParPrice", "prompt")
                }
                g.text("#J_GameSalePrice", "")
            },
            _catChange: function () {
                this._recoveryPrice();
                if (this._catIndex > 0) {
                    if (g.hasClass("#J_GameCatId", "prompt")) {
                        g.removeClass("#J_GameCatId", "prompt")
                    }
                    if (g.attr("#J_GameGold", "checked") && r.searchMoreQQUrl == "") {
                        this._gameItemsInfo = this._gameCatsInfo[this._catIndex - 1].gamePVList;
                        this._fillParPriceOpts()
                    } else {
                        if (g.attr("#J_GameGold", "checked")) {
                            this._requestQQItemsInfo()
                        } else {
                            this._requestCardItemsInfo()
                        }
                    }
                } else {
                    if (!g.hasClass("#J_GameCatId", "prompt")) {
                        g.addClass("#J_GameCatId", "prompt")
                    }
                }
            },
            _requestCardItemsInfo: function () {
                var v = this;
                f.io({
                    dataType: "jsonp",
                    url: r.storeDomain + "/shop/rechargeCenter.htm",
                    data: {
                        type: "game",
                        game_type: "card",
                        cat_id: v._catOpts[v._catIndex].value,
                        user_num_id: r.userNumId,
                        sign: r.sign
                    },
                    success: function (w) {
                        v._gameItemsInfo = w.cardsInfo;
                        v._fillParPriceOpts()
                    }
                })
            },
            _requestQQItemsInfo: function () {
                var v = this;
                f.io({
                    dataType: "jsonp",
                    url: r.storeDomain + "/shop/rechargeCenter.htm",
                    data: {
                        type: "game",
                        game_type: "qq",
                        pid_vid: v._catOpts[v._catIndex].value,
                        user_num_id: r.userNumId,
                        sign: r.sign
                    },
                    success: function (w) {
                        v._gameItemsInfo = w.qqsInfo;
                        v._fillParPriceOpts()
                    }
                })
            },
            _fillParPriceOpts: function () {
                var v = this._parPriceOpts;
                if (this._gameItemsInfo.length > 0) {
                    this._msgToRecharge();
                    f.each(this._gameItemsInfo, function (w) {
                        v[v.length] = new Option(w.parPrice, w.itemNumId)
                    })
                } else {
                    this._rechargeToMsg(p, "warning")
                }
            },
            _parPriceChange: function () {
                var v = this._parPriceIndex;
                if (v > 0) {
                    if (g.hasClass("#J_GameParPrice", "prompt")) {
                        g.removeClass("#J_GameParPrice", "prompt")
                    }
                    var w = this._gameItemsInfo[v - 1];
                    g.text("#J_GameSalePrice", w.salePrice);
                    g.val(l.gameCardForm.sku_id, w.skuId);
                    this._selectedItemId = w.itemNumId;
                    this._chargeType = w.chargeType;
                    this._isAutoRecharge();
                    this._msgToRecharge()
                } else {
                    g.text("#J_GameSalePrice", "");
                    if (!g.hasClass("#J_GameParPrice", "prompt")) {
                        g.addClass("#J_GameParPrice", "prompt")
                    }
                }
            },
            _isAutoRecharge: function () {
                var v = this;
                if (v._chargeType === 1) {
                    f.getScript(r.buyDomain + "/buy.htm?from=tcc&item_id=" + v._selectedItemId, {
                        success: function () {
                            if (window.loginIndicator) {
                                l.gameCardForm.action = window.loginIndicator.isFastBuy ? r.buyDomain + "/buy_now.htm" : r.buyDomain + "/fastbuy/fast_buy.htm"
                            }
                        }
                    })
                }
            },
            _formValidate: function () {
                if (this._catOpts.length == 1 || this._catIndex > 0 && this._parPriceOpts.length == 1) {
                    this._rechargeToMsg(p, "warning");
                    return false
                } else {
                    if (!this._catIndex || !this._parPriceIndex) {
                        this._rechargeToMsg(n, "warning");
                        return false
                    } else {
                        return true
                    }
                }
            },
            _rechargeToMsg: function (w, v) {
                g.text("#J_GameMsg", w);
                if (!g.hasClass("#J_GameMsgBox", v)) {
                    if (v == "dealing") {
                        if (g.hasClass("#J_GameMsgBox", "warning")) {
                            g.removeClass("#J_GameMsgBox", "warning")
                        }
                        if (!g.hasClass("#J_GameSubmit", "hidden")) {
                            g.addClass("#J_GameSubmit", "hidden")
                        }
                    }
                    g.addClass("#J_GameMsgBox", v)
                }
                if (g.hasClass("#J_GameMsgBox", "hidden")) {
                    g.removeClass("#J_GameMsgBox", "hidden")
                }
            },
            _msgToRecharge: function () {
                if (!g.hasClass("#J_GameMsgBox", "hidden")) {
                    g.addClass("#J_GameMsgBox", "hidden")
                }
            }
        });
        var t = function (v) {
            this._telBoxType = g.width(g.parent(v)) == 190 ? "vt" : "hz";
            this._telPanel = g.get(".tel-panel");
            this._telSubbtn = g.get("#J_TelSubmit");
            this._parPriceOpts = g.get("#J_TelParPrice").options;
            this._mobilesInfo = new Array;
            this._initTelEvent()
        };
        f.augment(t, {
            _initTelEvent: function () {
                var v = this;
                m.on("#J_TelInput", "focus", function () {
                    if (g.hasClass(this, "prompt")) {
                        g.val(this, "");
                        g.removeClass(this, "prompt")
                    }
                    if (g.attr("#J_TelInputCfm", "disabled")) {
                        g.removeAttr("#J_TelInputCfm", "disabled")
                    }
                    v._msgToRecharge()
                });
                m.on("#J_TelInputCfm", "focus", function () {
                    if (g.hasClass(this, "prompt")) {
                        g.val(this, "");
                        g.removeClass(this, "prompt")
                    }
                });
                m.on("#J_TelInput", "paste", function () {
                    return false
                });
                m.on("#J_TelInputCfm", "paste", function () {
                    return false
                });
                m.on("#J_TelInput", "contextmenu", function () {
                    return false
                });
                m.on("#J_TelInputCfm", "contextmenu", function () {
                    return false
                });
                m.on("#J_TelInput", "keyup", function () {
                    var x = /\D/g;
                    var w = g.val(this);
                    g.val(this, w.replace(x, ""));
                    if (g.val("#J_TelInputCfm")) {
                        g.val("#J_TelInputCfm", "\u8bf7\u518d\u6b21\u8f93\u5165");
                        g.addClass("#J_TelInputCfm", "prompt")
                    }
                    if (!g.hasClass("#J_TelOperator", "hidden")) {
                        g.addClass("#J_TelOperator", "hidden")
                    }
                });
                m.on("#J_TelInputCfm", "keyup", function () {
                    var x = /\D/g;
                    var w = g.val(this);
                    g.val(this, w.replace(x, ""))
                });
                m.on("#J_TelInput", "blur", function () {
                    if (g.val(this).charAt(0) !== "1" || g.val(this).length < 11) {
                        v._rechargeToMsg(i, "warning");
                        g.attr("#J_TelInputCfm", "disabled", "disabled")
                    }
                });
                m.on("#J_TelInputCfm", "blur", function () {
                    if (g.val("#J_TelInput") !== g.val("#J_TelInputCfm")) {
                        v._rechargeToMsg(h, "warning")
                    } else {
                        v._msgToRecharge()
                    }
                });
                m.on("#J_TelInputCfm", "keyup", function () {
                    if (g.val("#J_TelInputCfm").length === 11) {
                        if (g.val("#J_TelInput") !== g.val("#J_TelInputCfm")) {
                            v._rechargeToMsg(h, "warning")
                        } else {
                            v._msgToRecharge();
                            v._getOperators()
                        }
                    }
                });
                m.on("#J_TelParPrice", "change", function () {
                    var w = this.selectedIndex;
                    if (w > 0) {
                        g.text("#J_TelSalePrice", v._mobilesInfo[w - 1].salePrice);
                        if (g.hasClass(this, "prompt")) {
                            g.removeClass(this, "prompt")
                        }
                        if (v._mobilesInfo[w - 1].auto) {
                            g.val("#J_TelMode", "buynow/PhoneEcardBuyNowAction")
                        } else {
                            g.val("#J_TelMode", "buynow/SmcMobileBuyNowDirectAction")
                        }
                        v._msgToRecharge()
                    } else {
                        g.text("#J_TelSalePrice", "");
                        if (!g.hasClass(this, "prompt")) {
                            g.addClass(this, "prompt")
                        }
                    }
                });
                m.on(l.telForm, "submit", function () {
                    if (g.val("#J_TelInput").charAt(0) !== "1" || g.val("#J_TelInput").length < 11) {
                        v._rechargeToMsg(i, "warning");
                        return false
                    } else {
                        if (g.val("#J_TelInput") !== g.val("#J_TelInputCfm")) {
                            v._rechargeToMsg(h, "warning");
                            return false
                        } else {
                            if (v._parPriceOpts.length == 1) {
                                v._rechargeToMsg(j, "warning");
                                return false
                            } else {
                                if (g.get("#J_TelParPrice").selectedIndex === 0) {
                                    v._rechargeToMsg(e, "warning");
                                    return false
                                } else {
                                    v._rechargeToMsg(d, "dealing");
                                    return true
                                }
                            }
                        }
                    }
                })
            },
            _rechargeToMsg: function (w, v) {
                g.text("#J_TelMsg", w);
                if (v == "warning" && (w == i || w == h)) {
                    if (!g.hasClass("#J_TelOperator", "hidden")) {
                        g.addClass("#J_TelOperator", "hidden")
                    }
                    if (g.hasClass("#J_TelOperator", "operator")) {
                        g.removeClass("#J_TelOperator", "operator")
                    }
                    if (this._parPriceOpts.length > 1) {
                        this._parPriceOpts.length = 1
                    }
                    if (!g.hasClass("#J_TelParPrice", "prompt")) {
                        g.addClass("#J_TelParPrice", "prompt")
                    }
                    g.text("#J_TelSalePrice", "")
                }
                if (!g.hasClass("#J_TelMsgBox", v)) {
                    if (v == "dealing") {
                        if (g.hasClass("#J_TelMsgBox", "warning")) {
                            g.removeClass("#J_TelMsgBox", "warning")
                        }
                        if (!g.hasClass("#J_TelSubmit", "hidden")) {
                            g.addClass("#J_TelSubmit", "hidden")
                        }
                    }
                    g.addClass("#J_TelMsgBox", v)
                }
                if (g.hasClass("#J_TelMsgBox", "hidden")) {
                    g.removeClass("#J_TelMsgBox", "hidden")
                }
                if (this._telBoxType == "vt") {
                    g.css(this._telPanel, "height", "190px");
                    g.css(this._telSubbtn, "top", "162px")
                }
            },
            _msgToRecharge: function () {
                if (!g.hasClass("#J_TelMsgBox", "hidden")) {
                    g.addClass("#J_TelMsgBox", "hidden")
                }
                if (this._telBoxType == "vt") {
                    g.css(this._telPanel, "height", "161px");
                    g.css(this._telSubbtn, "top", "136px")
                }
            },
            _getOperators: function () {
                var v = this;
                f.io({
                    dataType: "jsonp",
                    url: "http://tcc.taobao.com/cc/json/mobile_tel_segment.htm",
                    data: {
                        tel: g.val("#J_TelInput")
                    },
                    success: function (w) {
                        v.displayOperators(w)
                    }
                })
            },
            displayOperators: function (w) {
                var v = w.catName.substr(2);
                g.text("#J_TelOperator", w.province + v);
                if (g.hasClass("#J_TelOperator", "hidden")) {
                    g.removeClass("#J_TelOperator", "hidden")
                }
                if (!g.hasClass("#J_TelOperator", "operator")) {
                    g.addClass("#J_TelOperator", "operator")
                }
                g.val("#J_TelProvince", w.province);
                g.val("#J_TelCatName", v);
                this._getPrice(w)
            },
            _getPrice: function (w) {
                var v = this;
                f.io({
                    dataType: "jsonp",
                    url: r.storeDomain + "/shop/rechargeCenter.htm",
                    data: {
                        type: "mobile",
                        province: w.province,
                        catName: w.catName.substr(2),
                        user_num_id: r.userNumId,
                        sign: r.sign,
                        _input_charset: "utf-8"
                    },
                    success: function (x) {
                        v.displayPrice(x)
                    }
                })
            },
            displayPrice: function (w) {
                this._parPriceOpts = g.get("#J_TelParPrice").options;
                var v = this._parPriceOpts;
                this._mobilesInfo = w.mobilesInfo;
                if (v.length > 1) {
                    v.length = 1
                }
                if (!g.hasClass("#J_TelParPrice", "prompt")) {
                    g.addClass("#J_TelParPrice", "prompt")
                }
                g.text("#J_TelSalePrice", "");
                if (this._mobilesInfo.length > 0) {
                    f.each(this._mobilesInfo, function (x) {
                        v[v.length] = new Option(x.parPrice, x.itemNumId)
                    })
                } else {
                    this._rechargeToMsg(j, "warning")
                }
            }
        });
        q._init(c, r, t, u)
    }
    f.augment(o, {
        _init: function (s, r, u, t) {
            var q = this;
            f.ready(function () {
                f.log("RechargeCenter init start");
                s.create();
                if (r.showMobile) {
                    var w = new u(q._mod)
                }
                if (r.showCard || r.showGold) {
                    var v = new t
                }
                f.log("RechargeCenter init end")
            })
        }
    });
    o.selector = ".tshop-pbsm-src10c";
    return o
}, {
    requires: ["core"]
});