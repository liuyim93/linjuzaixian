KISSY.add("wangpu/mods/official/recharge-alimama", function (f, a) {
    var d = f.DOM,
		q = f.Event,
		r = document,
		p, k = document.all;
    var i = "\u53f7\u7801\u6709\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165",
		h = "\u53f7\u7801\u4e0d\u4e00\u81f4,\u8bf7\u91cd\u65b0\u8f93\u5165",
		n = "\u8bf7\u9009\u62e9\u9762\u503c",
		l = "\u8d27\u7269\u6682\u7f3a",
		m = "\u6b63\u5728\u5904\u7406\u8bf7\u7a0d\u540e\u2026\u2026",
		b = "\u8d27\u7269\u6682\u7f3a\uff0c\u8d2d\u4e70\u5176\u4ed6",
		o = "\u7cfb\u7edf\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5",
		g = "\u8bf7\u9009\u62e9\u76f8\u5e94\u4fe1\u606f",
		e = "\u83b7\u53d6\u6570\u636e\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5";
    var c = {
        create: function () {
            if (typeof localStorage !== "undefined") {
                p = localStorage
            } else {
                if (k) {
                    p = r.createElement("input");
                    p.type = "hidden";
                    r.body.appendChild(p);
                    p.addBehavior("#default#userData")
                }
            }
        },
        set: function (s, t) {
            if ("setItem" in p) {
                p.setItem(s, t)
            } else {
                if (k) {
                    try {
                        p.setAttribute(s, t);
                        p.save("IELocalDataStore")
                    } catch (u) { }
                }
            }
        },
        get: function (s) {
            if ("getItem" in p) {
                return p.getItem(s)
            } else {
                if (k) {
                    try {
                        p.load("IELocalDataStore");
                        return p.getAttribute(s)
                    } catch (t) { }
                }
            }
        }
    };

    function j(t) {
        var D = this;
        D._mod = t.mod;
        if (!D._mod) {
            return
        }
        var s = f.JSON.parse(d.attr("#J_AlimRechargeData", "data-value"));
        var C = s.taokeServer,
			B = {
			    phoneList: "/chongzhi/phone_list.do",
			    phoneSearch: "/chongzhi/phone_search.do",
			    phoneCard: "/chongzhi/phone_card.do"
			}, v = {
			    qqList: "/chongzhi/qq_list.do",
			    qqCard: "/chongzhi/qq_card.do"
			}, u = {
			    cardList: "/chongzhi/dian_ka_list.do",
			    cardBuy: "/chongzhi/dian_ka.do"
			}, A = {
			    onlineList: "/chongzhi/hot_games.do",
			    onlineBuy: "/chongzhi/game_goods_submit.do"
			};
        var y = "mm_" + s.taokepid + "_0_0";
        var z = {
            tel: "http://s8.taobao.com/search?q=%B3%E4%D6%B5&ex_q=&filterFineness=&atype=&isprepay=1&promoted_service4=4&user_type=1&olu=yes&commend=all&sort=coefp&style=grid&viewIndex=7&p4p_str=lo1%3D0%26lo2%3D0%26nt%3D1&mode=86&${SearchString}&b=zhl347",
            card: "http://s8.taobao.com/search?q=%B5%E3%BF%A8&${SearchString}&mode=86&rt=1323847099431",
            gold: "http://s8.taobao.com/search?q=qq&{SearchString}&mode=86&rt=1323847137408",
            online: "http://s8.taobao.com/search?q=%CD%F8%D3%CE&unid=0&mode=86&${SearchString}&p4p_str=lo1%3D0%26lo2%3D0%26nt%3D1&cat=50017708&from=compass&navlog=compass-3-c-50017708"
        };
        var w = function (F) {
            this._gameSubbtn = d.get("#J_AlimGameSubmit", F);
            this._gameCatD = d.get("#J_AlimGameCatId", F);
            this._catOpts = this._gameCatD.options;
            this._gameCatNameD = d.get("#J_AlimGameCatName", F);
            this._parPriceLabelD = d.get("#J_AlimGameParPrice_label", F);
            this._parPriceD = d.get("#J_AlimGameParPrice", F);
            this._parPriceOpts = this._parPriceD.options;
            this._gameSalePriceEntry = d.get("#J_AlimGameSalePriceEntry", F);
            this._gameSalePriceLabelD = d.get("#J_AlimGameSalePriceLabel", F);
            this._gameSalePriceD = d.get("#J_AlimGameSalePrice", F);
            this._gameCardD = d.get("#J_AlimGameCard", F);
            this._gameGoldD = d.get("#J_AlimGameGold", F);
            this._gameOnlineD = d.get("#J_AlimGameOnline", F);
            this._gameMsgBox = d.get("#J_AlimGameMsgBox", F);
            this._gameMsgD = d.get("#J_AlimGameMsg", F);
            this._isGameLackItem = false;
            this._currentGameType = null;
            this.GAME_TYPE = {
                GOLD: "gold",
                CARD: "card",
                ONLINE: "online"
            };
            this._catIndex = 0;
            this._parPriceIndex = 0;
            this._gameCatsInfo = new Array;
            this._gameItemsInfo = null;
            this._searchMore = null;
            var E = this;
            window.setTimeout(function () {
                E.init()
            }, 200)
        };
        f.augment(w, {
            init: function () {
                this._initGameEvent();
                var E = s.showCard + s.showGold + s.showOnline;
                if (E > 1) {
                    if (c.get("gameType") == "card") {
                        d.attr(this._gameCardD, "checked", "checked");
                        this._displayCatName(this._gameCardD)
                    } else {
                        if (c.get("gameType") == "gold") {
                            d.attr(this._gameGoldD, "checked", "checked");
                            this._displayCatName(this._gameGoldD)
                        } else {
                            if (c.get("gameType") == "online") {
                                d.attr(this._gameOnlineD, "checked", "checked");
                                this._displayCatName(this._gameOnlineD)
                            } else {
                                if (d.attr(this._gameCardD, "checked")) {
                                    this._displayCatName(this._gameCardD)
                                } else {
                                    if (d.attr(this._gameGoldD, "checked")) {
                                        this._displayCatName(this._gameGoldD)
                                    } else {
                                        if (d.attr(this._gameOnlineD, "checked")) {
                                            this._displayCatName(this._gameOnlineD)
                                        } else {
                                            d.attr(this._gameCardD, "checked", "checked");
                                            this._displayCatName(this._gameCardD)
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (s.showCard) {
                        this._currentGameType = this.GAME_TYPE.CARD;
                        this._requestCardCatsInfo()
                    } else {
                        if (s.showGold) {
                            this._currentGameType = this.GAME_TYPE.GOLD;
                            this._requestQQCatsInfo()
                        } else {
                            if (s.showOnline) {
                                this._currentGameType = this.GAME_TYPE.ONLINE;
                                this._togglePriceEntry("hidden");
                                this._requestOnlineCatsInfo()
                            }
                        }
                    }
                }
            },
            _initGameEvent: function () {
                var E = this;
                f.each([E._gameCardD, E._gameGoldD, E._gameOnlineD], function (F) {
                    !!F && q.on(F, "click", function () {
                        E._msgToRecharge();
                        E._displayCatName(this)
                    })
                }, E);
                q.on(E._gameCatD, "change", function () {
                    E._catIndex = this.selectedIndex;
                    E._catChange()
                });
                q.on(E._parPriceD, "change", function () {
                    E._parPriceIndex = this.selectedIndex;
                    E._parPriceChange()
                })
            },
            _clearDataCache: function () {
                this._gameCatsInfo = [];
                this._gameItemsInfo = null
            },
            _markGameLackItem: function (E) {
                this._gameSalePriceLabelD.innerHTML = "\u6682\u7f3a\uff1a";
                this._gameSalePriceD.innerHTML = "<a href='" + z[E].replace(/\$\{SearchString\}/, "pid=" + y) + "' target='_blank'>\u70b9\u6b64\u641c\u7d22</a>";
                if (!d.hasClass(this._gameSubbtn, "hidden")) {
                    d.addClass(this._gameSubbtn, "hidden")
                }
            },
            _displayCatName: function (E) {
                this._clearDataCache();
                this._clearPrice();
                switch (d.attr(E, "id")) {
                    case "J_AlimGameGold":
                        this._currentGameType = this.GAME_TYPE.GOLD;
                        c.set("gameType", "gold");
                        d.text(this._gameCatNameD, "\u79cd\u7c7b\uff1a");
                        d.text(this._parPriceLabelD, "\u9762\u503c\uff1a");
                        this._togglePriceEntry("show");
                        this._requestQQCatsInfo();
                        break;
                    case "J_AlimGameCard":
                        this._currentGameType = this.GAME_TYPE.CARD;
                        c.set("gameType", "card");
                        d.text(this._gameCatNameD, "\u6e38\u620f\uff1a");
                        d.text(this._parPriceLabelD, "\u9762\u503c\uff1a");
                        this._togglePriceEntry("show");
                        this._requestCardCatsInfo();
                        break;
                    case "J_AlimGameOnline":
                        this._currentGameType = this.GAME_TYPE.ONLINE;
                        c.set("gameType", "online");
                        d.text(this._gameCatNameD, "\u6e38\u620f\uff1a");
                        d.text(this._parPriceLabelD, "\u7269\u54c1\uff1a");
                        this._togglePriceEntry("hidden");
                        this._requestOnlineCatsInfo();
                        break
                }
            },
            _togglePriceEntry: function (E) {
                if (E === "show") {
                    d.removeClass(this._gameSalePriceEntry, "hidden")
                } else {
                    if (E === "hidden") {
                        if (!d.hasClass(this._gameSalePriceEntry, "hidden")) {
                            d.addClass(this._gameSalePriceEntry, "hidden")
                        }
                    }
                }
            },
            _requestOnlineCatsInfo: function () {
                var E = this;
                f.io({
                    dataType: "jsonp",
                    url: C + A.onlineList,
                    success: function (F) {
                        if (!F.success) {
                            E._isGameLackItem = true;
                            E._rechargeToMsg(e, "warning");
                            return
                        }
                        E._isGameLackItem = false;
                        E.getOnlineCats(F)
                    }
                })
            },
            getOnlineCats: function (E) {
                if (!E.data) {
                    D._rechargeToMsg(e, "warning");
                    return
                }
                f.each(E.data, function (G, F) {
                    this._gameCatsInfo.push({
                        catId: F,
                        catData: G
                    })
                }, this);
                this._fillCatOpts();
                this._catChange()
            },
            _requestCardCatsInfo: function () {
                var E = this;
                f.io({
                    dataType: "jsonp",
                    url: C + u.cardList,
                    success: function (F) {
                        if (!F.success) {
                            E._isGameLackItem = true;
                            E._rechargeToMsg(e, "warning");
                            return
                        }
                        E._isGameLackItem = false;
                        E.getCardCats(F)
                    }
                })
            },
            getCardCats: function (E) {
                if (!E.data) {
                    D._rechargeToMsg(e, "warning");
                    return
                }
                f.each(E.data, function (G, F) {
                    this._gameCatsInfo.push({
                        catId: F,
                        catData: G
                    })
                }, this);
                this._gameCatsInfo.sort(function (G, F) {
                    return G.catData.name.localeCompare(F.catData.name)
                });
                this._fillCatOpts();
                this._catChange()
            },
            _requestQQCatsInfo: function () {
                var E = this;
                f.io({
                    dataType: "jsonp",
                    url: C + v.qqList,
                    success: function (F) {
                        if (!F.success) {
                            E._isGameLackItem = true;
                            E._rechargeToMsg(e, "warning");
                            return
                        }
                        E._isGameLackItem = false;
                        E.getQQCats(F)
                    }
                })
            },
            getQQCats: function (E) {
                if (!E.data) {
                    D._rechargeToMsg(e, "warning");
                    return
                }
                f.each(E.data, function (G, F) {
                    this._gameCatsInfo.push({
                        catId: F,
                        catData: G
                    })
                }, this);
                this._fillCatOpts();
                this._catChange()
            },
            _fillCatOpts: function () {
                var E = this._catOpts;
                this._recoveryCatOpts();
                this._recoveryPrice();
                if (this._gameCatsInfo.length > 0) {
                    f.each(this._gameCatsInfo, function (F) {
                        E[E.length] = new Option(F.catData.name, F.catId)
                    })
                }
            },
            _recoveryCatOpts: function () {
                this._catOpts.length = 0;
                this._catIndex = 0
            },
            _recoveryPrice: function () {
                this._parPriceOpts.length = 0;
                this._parPriceIndex = 0;
                d.text(this._gameSalePriceD, "")
            },
            _catChange: function () {
                this._recoveryPrice();
                this._clearPrice();
                this._gameItemsInfo = this._gameCatsInfo[this._catIndex];
                this._fillParPriceOpts();
                this._parPriceChange()
            },
            _fillParPriceOpts: function () {
                var G = this._parPriceOpts,
					F, E;
                if (this._currentGameType === this.GAME_TYPE.ONLINE) {
                    F = !!this._gameItemsInfo ? this._gameItemsInfo.catData.goods : [];
                    E = F.length > 0 ? this._gameItemsInfo.catData.pidvid : []
                } else {
                    F = !!this._gameItemsInfo ? this._gameItemsInfo.catData.price : [];
                    E = F.length > 0 ? this._gameItemsInfo.catData.price_vid : []
                }
                this._msgToRecharge();
                f.each(F, function (I, H) {
                    G[G.length] = new Option(I, E[H])
                })
            },
            _clearPrice: function () {
                d.text(this._gameSalePriceLabelD, "\u552e\u4ef7\uff1a");
                d.text(this._gameSalePriceD, "");
                if (d.hasClass(this._gameSubbtn, "hidden")) {
                    d.removeClass(this._gameSubbtn, "hidden")
                }
            },
            _parPriceChange: function () {
                this._clearPrice();
                var F = this._parPriceIndex;
                var H = this._gameItemsInfo;
                switch (this._currentGameType) {
                    case this.GAME_TYPE.GOLD:
                        var G = H.catData;
                        var E = this;
                        f.io({
                            dataType: "jsonp",
                            url: C + v.qqCard,
                            data: {
                                cat_id: H.catId,
                                price_id: G.price_id,
                                mm_id: y,
                                price_vid: G.price_vid[F],
                                service_id: G.service_id
                            },
                            success: function (I) {
                                if (!I.success) {
                                    E._isGameLackItem = true;
                                    E._markGameLackItem("gold");
                                    return
                                }
                                E._isGameLackItem = false;
                                E._fillPriceAndEnableBuy({
                                    clickUrl: I.click_url,
                                    price: I.price
                                })
                            }
                        });
                        break;
                    case this.GAME_TYPE.CARD:
                        var G = H.catData;
                        var E = this;
                        f.io({
                            dataType: "jsonp",
                            url: C + u.cardBuy,
                            data: {
                                cat_id: H.catId,
                                price_id: G.price_id,
                                mm_id: y,
                                price_vid: G.price_vid[F],
                                service_id: G.service_id
                            },
                            success: function (I) {
                                if (!I.success) {
                                    E._isGameLackItem = true;
                                    E._markGameLackItem("card");
                                    return
                                }
                                E._isGameLackItem = false;
                                E._fillPriceAndEnableBuy({
                                    clickUrl: I.click_url,
                                    price: I.price
                                })
                            }
                        });
                        break;
                    case this.GAME_TYPE.ONLINE:
                        var G = H.catData;
                        var E = this;
                        E._togglePriceEntry("hidden");
                        f.io({
                            dataType: "jsonp",
                            url: C + A.onlineBuy,
                            data: {
                                cat_id: H.catId,
                                mm_id: y,
                                pidvid: G.pidvid[F]
                            },
                            success: function (I) {
                                if (!I.success) {
                                    E._isGameLackItem = true;
                                    E._togglePriceEntry("show");
                                    E._markGameLackItem("online");
                                    return
                                }
                                E._isGameLackItem = false;
                                E._fillPriceAndEnableBuy({
                                    clickUrl: I.click_url,
                                    price: I.price
                                })
                            }
                        });
                        break
                }
            },
            _fillPriceAndEnableBuy: function (E) {
                d.text(this._gameSalePriceD, E.price);
                d.attr(this._gameSubbtn, "href", E.clickUrl);
                this._msgToRecharge()
            },
            _rechargeToMsg: function (F, E) {
                d.text(this._gameMsgD, F);
                if (!d.hasClass(this._gameMsgBox, E)) {
                    if (E == "dealing") {
                        if (d.hasClass(this._gameMsgBox, "warning")) {
                            d.removeClass(this._gameMsgBox, "warning")
                        }
                        if (!d.hasClass(this._gameSubbtn, "hidden")) {
                            d.addClass(this._gameSubbtn, "hidden")
                        }
                    }
                    d.addClass(this._gameMsgBox, E)
                }
                if (d.hasClass(this._gameMsgBox, "hidden")) {
                    d.removeClass(this._gameMsgBox, "hidden")
                }
                if (f.UA.ie && 8 > f.UA.ie) {
                    d.css(this._telSubbtn, "zoom", "");
                    d.css(this._telSubbtn, "zoom", "1")
                }
            },
            _msgToRecharge: function () {
                if (!d.hasClass(this._gameMsgBox, "hidden")) {
                    d.addClass(this._gameMsgBox, "hidden")
                }
                if (f.UA.ie && 8 > f.UA.ie) {
                    d.css(this._telSubbtn, "zoom", "");
                    d.css(this._telSubbtn, "zoom", "1")
                }
            }
        });
        var x = function (E) {
            this._telBoxType = d.width(d.parent(E)) == 190 ? "vt" : "hz";
            this._telPanel = d.get(".tel-panel", E);
            this._telSubbtn = d.get("#J_AlimTelSubmit", E);
            this._telMsgBoxD = d.get("#J_AlimTelMsgBox", E);
            this._telMsgD = d.get("#J_AlimTelMsg", E);
            this._telOperatorD = d.get("#J_AlimTelOperator", E);
            this._parPriceD = d.get("#J_AlimTelParPrice", E);
            this._parPriceOpts = this._parPriceD.options;
            this._telSalePriceLabelD = d.get("#J_AlimTelSalePriceLabel", E);
            this._telSalePriceD = d.get("#J_AlimTelSalePrice", E);
            this._telInputD = d.get("#J_AlimTelInput", E);
            this._telInputCfmD = d.get("#J_AlimTelInputCfm", E);
            this._telProvinceD = d.get("#J_AlimTelProvince", E);
            this._telCatNameD = d.get("#J_AlimTelCatName", E);
            this._isTelLackItem = false;
            this._mobilesInfo = new Array;
            this._getPriceData = {};
            this._getPriceData.mm_id = y;
            this._initTelEvent();
            this._getPrice()
        };
        f.augment(x, {
            _initTelEvent: function () {
                var E = this;
                q.on(E._telInputD, "focus", function () {
                    if (d.hasClass(this, "prompt")) {
                        d.val(this, "");
                        d.removeClass(this, "prompt")
                    }
                    if (d.attr(E._telInputCfmD, "disabled")) {
                        d.removeAttr(E._telInputCfmD, "disabled")
                    }
                    E._msgToRecharge()
                });
                q.on(E._telInputCfmD, "focus", function () {
                    if (d.hasClass(this, "prompt")) {
                        d.val(this, "");
                        d.removeClass(this, "prompt")
                    }
                });
                q.on(E._telInputD, "paste", function () {
                    return false
                });
                q.on(E._telInputCfmD, "paste", function () {
                    return false
                });
                q.on(E._telInputD, "contextmenu", function () {
                    return false
                });
                q.on(E._telInputCfmD, "contextmenu", function () {
                    return false
                });
                q.on(E._telInputD, "keyup", function () {
                    var G = /\D/g;
                    var F = d.val(this);
                    d.val(this, F.replace(G, ""));
                    if (d.val(E._telInputCfmD)) {
                        d.val(E._telInputCfmD, "\u8bf7\u518d\u6b21\u8f93\u5165");
                        d.addClass(E._telInputCfmD, "prompt")
                    }
                    if (!d.hasClass(E._telOperatorD, "hidden")) {
                        d.addClass(E._telOperatorD, "hidden")
                    }
                    E._clearPrice()
                });
                q.on(E._telInputCfmD, "keyup", function () {
                    var G = /\D/g;
                    var F = d.val(this);
                    d.val(this, F.replace(G, ""))
                });
                q.on(E._telInputD, "blur", function () {
                    if (d.val(this).charAt(0) !== "1" || d.val(this).length < 11) {
                        E._rechargeToMsg(i, "warning");
                        d.attr(E._telInputCfmD, "disabled", "disabled")
                    }
                });
                q.on(E._telInputCfmD, "blur", function () {
                    if (d.val(E._telInputD) !== d.val(E._telInputCfmD)) {
                        E._rechargeToMsg(h, "warning")
                    } else {
                        E._msgToRecharge()
                    }
                });
                q.on(E._telInputCfmD, "keyup", function () {
                    if (d.val(E._telInputCfmD).length === 11) {
                        if (d.val(E._telInputD) !== d.val(E._telInputCfmD)) {
                            E._rechargeToMsg(h, "warning")
                        } else {
                            E._msgToRecharge();
                            E._getOperators()
                        }
                    }
                });
                q.on(E._parPriceD, "change", function () {
                    E._priceChange(this)
                });
                q.on(E._telSubbtn, "click", function (F) {
                    if (d.val(E._telInputD).charAt(0) !== "1" || d.val(E._telInputD).length < 11) {
                        E._rechargeToMsg(i, "warning");
                        F.halt()
                    } else {
                        if (d.val(E._telInputD) !== d.val(E._telInputCfmD)) {
                            E._rechargeToMsg(h, "warning");
                            F.halt()
                        } else {
                            if (E._parPriceOpts.length == 0) {
                                E._rechargeToMsg(l, "warning");
                                F.halt()
                            } else {
                                if (E._isTelLackItem) {
                                    F.halt()
                                }
                            }
                        }
                    }
                })
            },
            _isPhoneCheckOK: function (F) {
                var E = d.val(this._telInputD),
					G = d.val(this._telInputCfmD);
                if (E.charAt(0) !== "1" || E.length !== 11) {
                    F && this._rechargeToMsg(i, "warning");
                    return false
                }
                if (E !== G) {
                    F && this._rechargeToMsg(h, "warning");
                    return false
                }
                return true
            },
            _priceChange: function (G) {
                var E = this;
                E._clearPrice();
                var F = G.selectedIndex;
                E._getPriceData.price_id = E._mobilesInfo[F].id;
                E._getPriceData.phone = d.val(E._telInputD);
                if (!E._isPhoneCheckOK()) {
                    return
                }
                f.io({
                    dataType: "jsonp",
                    url: C + B.phoneCard,
                    data: E._getPriceData,
                    success: function (H) {
                        if (!H.success) {
                            E._isTelLackItem = true;
                            E._markLackItem();
                            return
                        }
                        E._isTelLackItem = false;
                        d.text(E._telSalePriceD, H.price);
                        d.attr(E._telSubbtn, "href", H.click_url);
                        if (d.hasClass(this, "prompt")) {
                            d.removeClass(this, "prompt")
                        }
                        E._msgToRecharge()
                    }
                })
            },
            _markLackItem: function () {
                this._telSalePriceLabelD.innerHTML = "\u7f3a\u8d27\uff1a";
                this._telSalePriceD.innerHTML = "<a href='" + z.tel.replace(/\$\{SearchString\}/, "pid=" + y) + "' target='_blank'>\u70b9\u6b64\u641c\u7d22</a>";
                if (!d.hasClass(this._telSubbtn, "hidden")) {
                    d.addClass(this._telSubbtn, "hidden")
                }
            },
            _clearPrice: function () {
                this._telSalePriceLabelD.innerHTML = "\u552e\u4ef7\uff1a";
                d.text(this._telSalePriceD, "");
                if (d.hasClass(this._telSubbtn, "hidden")) {
                    d.removeClass(this._telSubbtn, "hidden")
                }
            },
            _rechargeToMsg: function (G, E) {
                var F = this;
                d.text(F._telMsgD, G);
                if (E == "warning" && (G == i || G == h)) {
                    if (!d.hasClass(F._telOperatorD, "hidden")) {
                        d.addClass(F._telOperatorD, "hidden")
                    }
                    if (d.hasClass(F._telOperatorD, "operator")) {
                        d.removeClass(F._telOperatorD, "operator")
                    }
                }
                if (!d.hasClass(F._telMsgBoxD, E)) {
                    if (E == "dealing") {
                        if (d.hasClass(F._telMsgBoxD, "warning")) {
                            d.removeClass(F._telMsgBoxD, "warning")
                        }
                        if (!d.hasClass(F._telSubbtn, "hidden")) {
                            d.addClass(F._telSubbtn, "hidden")
                        }
                    }
                    d.addClass(F._telMsgBoxD, E)
                }
                if (d.hasClass(F._telMsgBoxD, "hidden")) {
                    d.removeClass(F._telMsgBoxD, "hidden")
                }
                if (f.UA.ie && 8 > f.UA.ie) {
                    d.css(F._telSubbtn, "zoom", "");
                    d.css(F._telSubbtn, "zoom", "1")
                }
            },
            _msgToRecharge: function () {
                if (!d.hasClass(this._telMsgBoxD, "hidden")) {
                    d.addClass(this._telMsgBoxD, "hidden")
                }
                if (f.UA.ie && 8 > f.UA.ie) {
                    d.css(this._telSubbtn, "zoom", "");
                    d.css(this._telSubbtn, "zoom", "1")
                }
            },
            _getOperators: function () {
                var E = this;
                f.io({
                    dataType: "jsonp",
                    url: C + B.phoneSearch,
                    data: {
                        phone: d.val(E._telInputD)
                    },
                    success: function (F) {
                        if (!F.success) {
                            E._rechargeToMsg(i, "warning");
                            return
                        }
                        E.displayOperators(F);
                        E._priceChange(E._parPriceD)
                    }
                })
            },
            displayOperators: function (G) {
                var F = this;
                F._getPriceData.cat_id = G.cat_id;
                F._getPriceData.province_id = G.province_id;
                var E = G.cat_name.substr(2);
                d.text(F._telOperatorD, G.province_name + E);
                if (d.hasClass(F._telOperatorD, "hidden")) {
                    d.removeClass(F._telOperatorD, "hidden")
                }
                if (!d.hasClass(F._telOperatorD, "operator")) {
                    d.addClass(F._telOperatorD, "operator")
                }
                d.val(F._telProvinceD, G.province);
                d.val(F._telCatNameD, E)
            },
            _getPrice: function () {
                var E = this;
                f.io({
                    dataType: "jsonp",
                    url: C + B.phoneList,
                    success: function (F) {
                        if (!F.success) {
                            E._rechargeToMsg(e, "warning");
                            return
                        }
                        E.displayPrice(F)
                    }
                })
            },
            displayPrice: function (F) {
                var E = this._parPriceOpts;
                if (!F.denomination) {
                    this._rechargeToMsg(e, "warning");
                    return
                }
                this._mobilesInfo = F.denomination;
                if (E.length > 0) {
                    E.length = 0
                }
                if (d.hasClass(this._parPriceD, "prompt")) {
                    d.removeClass(this._parPriceD, "prompt")
                }
                d.text(this._telSalePriceD, "");
                if (this._mobilesInfo.length > 0) {
                    f.each(this._mobilesInfo, function (H) {
                        var G = new Option(H.name, H.id);
                        if (H.name === "100\u5143") {
                            G.selected = true
                        }
                        E[E.length] = G
                    })
                }
            }
        });
        D._init(c, s, x, w)
    }
    f.augment(j, {
        _init: function (u, t, w, v) {
            var s = this;
            f.ready(function (z) {
                z.log("RechargeAlimama init start");
                u.create();
                if (t.showMobile) {
                    var y = new w(s._mod)
                }
                if (t.showCard || t.showGold || t.showOnline) {
                    var x = new v(s._mod)
                }
                z.log("RechargeAlimama init end")
            })
        }
    });
    j.selector = ".tshop-pbsm-sra10c";
    return j
}, {
    requires: ["core"]
});