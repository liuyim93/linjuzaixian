KISSY.add("wangpu/mods/official/recharge-alimama", function (S, Core) {
    var Dom = S.DOM, Event = S.Event, doc = document, oStorage, ie = document.all;
    var ERROR_NUMBER = "\u53f7\u7801\u6709\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165", INCONSISTENT = "\u53f7\u7801\u4e0d\u4e00\u81f4,\u8bf7\u91cd\u65b0\u8f93\u5165", SELECT_PARPRICE = "\u8bf7\u9009\u62e9\u9762\u503c", LACK_ITEMS = "\u8d27\u7269\u6682\u7f3a", DEALING = "\u6b63\u5728\u5904\u7406\u8bf7\u7a0d\u540e\u2026\u2026", GAME_LACK_ITEMS = "\u8d27\u7269\u6682\u7f3a\uff0c\u8d2d\u4e70\u5176\u4ed6", SYSTEM_ERROR = "\u7cfb\u7edf\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5", SELECT_GAME_INFO = "\u8bf7\u9009\u62e9\u76f8\u5e94\u4fe1\u606f",
  DATA_REQUIRE_ERROR = "\u83b7\u53d6\u6570\u636e\u9519\u8bef\uff0c\u8bf7\u91cd\u8bd5";
    var DataStore = { create: function () {
        if (typeof localStorage !== "undefined") {
            oStorage = localStorage
        } else {
            if (ie) {
                oStorage = doc.createElement("input");
                oStorage.type = "hidden";
                doc.body.appendChild(oStorage);
                oStorage.addBehavior("#default#userData")
            }
        }
    }, set: function (key, value) {
        if ("setItem" in oStorage) {
            oStorage.setItem(key, value)
        } else {
            if (ie) {
                try {
                    oStorage.setAttribute(key, value);
                    oStorage.save("IELocalDataStore")
                } catch (e) {
                }
            }
        }
    }, get: function (key) {
        if ("getItem" in oStorage) {
            return oStorage.getItem(key)
        } else {
            if (ie) {
                try {
                    oStorage.load("IELocalDataStore");
                    return oStorage.getAttribute(key)
                } catch (e) {
                }
            }
        }
    } 
    };
    function RechargeAlimama(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        var rechargeData = S.JSON.parse(Dom.attr("#J_AlimRechargeData", "data-value"));
        var taokeDomain = rechargeData.taokeServer, taokePhoneUrlsPath = { phoneList: "/chongzhi/phone_list.do", phoneSearch: "/chongzhi/phone_search.do", phoneCard: "/chongzhi/phone_card.do" }, taokeQQUrlsPath = { qqList: "/chongzhi/qq_list.do", qqCard: "/chongzhi/qq_card.do" }, taokeCardUrlsPath = { cardList: "/chongzhi/dian_ka_list.do", cardBuy: "/chongzhi/dian_ka.do" }, taokeOnlineUrlsPath = { onlineList: "/chongzhi/hot_games.do", onlineBuy: "/chongzhi/game_goods_submit.do" };
        var mmId = "mm_" + rechargeData.taokepid + "_0_0";
        var lackLinks = { tel: "http://s8.taobao.com/search?q=%B3%E4%D6%B5&ex_q=&filterFineness=&atype=&isprepay=1&promoted_service4=4&user_type=1&olu=yes&commend=all&sort=coefp&style=grid&viewIndex=7&p4p_str=lo1%3D0%26lo2%3D0%26nt%3D1&mode=86&${SearchString}&b=zhl347", card: "http://s8.taobao.com/search?q=%B5%E3%BF%A8&${SearchString}&mode=86&rt=1323847099431", gold: "http://s8.taobao.com/search?q=qq&{SearchString}&mode=86&rt=1323847137408", online: "http://s8.taobao.com/search?q=%CD%F8%D3%CE&unid=0&mode=86&${SearchString}&p4p_str=lo1%3D0%26lo2%3D0%26nt%3D1&cat=50017708&from=compass&navlog=compass-3-c-50017708" };
        var Game = function (moduleRootD) {
            this._gameSubbtn = Dom.get("#J_AlimGameSubmit", moduleRootD);
            this._gameCatD = Dom.get("#J_AlimGameCatId", moduleRootD);
            this._catOpts = this._gameCatD.options;
            this._gameCatNameD = Dom.get("#J_AlimGameCatName", moduleRootD);
            this._parPriceLabelD = Dom.get("#J_AlimGameParPrice_label", moduleRootD);
            this._parPriceD = Dom.get("#J_AlimGameParPrice", moduleRootD);
            this._parPriceOpts = this._parPriceD.options;
            this._gameSalePriceEntry = Dom.get("#J_AlimGameSalePriceEntry", moduleRootD);
            this._gameSalePriceLabelD = Dom.get("#J_AlimGameSalePriceLabel", moduleRootD);
            this._gameSalePriceD = Dom.get("#J_AlimGameSalePrice", moduleRootD);
            this._gameCardD = Dom.get("#J_AlimGameCard", moduleRootD);
            this._gameGoldD = Dom.get("#J_AlimGameGold", moduleRootD);
            this._gameOnlineD = Dom.get("#J_AlimGameOnline", moduleRootD);
            this._gameMsgBox = Dom.get("#J_AlimGameMsgBox", moduleRootD);
            this._gameMsgD = Dom.get("#J_AlimGameMsg", moduleRootD);
            this._isGameLackItem = false;
            this._currentGameType = null;
            this.GAME_TYPE = { GOLD: "gold", CARD: "card", ONLINE: "online" };
            this._catIndex = 0;
            this._parPriceIndex = 0;
            this._gameCatsInfo = new Array;
            this._gameItemsInfo = null;
            this._searchMore = null;
            var self = this;
            window.setTimeout(function () {
                self.init()
            }, 200)
        };
        S.augment(Game, { init: function () {
            this._initGameEvent();
            var checkNum = rechargeData.showCard + rechargeData.showGold + rechargeData.showOnline;
            if (checkNum > 1) {
                if (DataStore.get("gameType") == "card") {
                    Dom.attr(this._gameCardD, "checked", "checked");
                    this._displayCatName(this._gameCardD)
                } else {
                    if (DataStore.get("gameType") == "gold") {
                        Dom.attr(this._gameGoldD, "checked", "checked");
                        this._displayCatName(this._gameGoldD)
                    } else {
                        if (DataStore.get("gameType") == "online") {
                            Dom.attr(this._gameOnlineD, "checked", "checked");
                            this._displayCatName(this._gameOnlineD)
                        } else {
                            if (Dom.attr(this._gameCardD, "checked")) {
                                this._displayCatName(this._gameCardD)
                            } else {
                                if (Dom.attr(this._gameGoldD, "checked")) {
                                    this._displayCatName(this._gameGoldD)
                                } else {
                                    if (Dom.attr(this._gameOnlineD, "checked")) {
                                        this._displayCatName(this._gameOnlineD)
                                    } else {
                                        Dom.attr(this._gameCardD, "checked", "checked");
                                        this._displayCatName(this._gameCardD)
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                if (rechargeData.showCard) {
                    this._currentGameType = this.GAME_TYPE.CARD;
                    this._requestCardCatsInfo()
                } else {
                    if (rechargeData.showGold) {
                        this._currentGameType = this.GAME_TYPE.GOLD;
                        this._requestQQCatsInfo()
                    } else {
                        if (rechargeData.showOnline) {
                            this._currentGameType = this.GAME_TYPE.ONLINE;
                            this._togglePriceEntry("hidden");
                            this._requestOnlineCatsInfo()
                        }
                    }
                }
            }
        }, _initGameEvent: function () {
            var self = this;
            S.each([self._gameCardD, self._gameGoldD, self._gameOnlineD], function (d) {
                !!d && Event.on(d, "click", function () {
                    self._msgToRecharge();
                    self._displayCatName(this)
                })
            }, self);
            Event.on(self._gameCatD, "change", function () {
                self._catIndex = this.selectedIndex;
                self._catChange()
            });
            Event.on(self._parPriceD, "change", function () {
                self._parPriceIndex = this.selectedIndex;
                self._parPriceChange()
            })
        }, _clearDataCache: function () {
            this._gameCatsInfo = [];
            this._gameItemsInfo = null
        }, _markGameLackItem: function (type) {
            this._gameSalePriceLabelD.innerHTML = "\u6682\u7f3a\uff1a";
            this._gameSalePriceD.innerHTML = "<a href='" + lackLinks[type].replace(/\$\{SearchString\}/, "pid=" + mmId) + "' target='_blank'>\u70b9\u6b64\u641c\u7d22</a>";
            if (!Dom.hasClass(this._gameSubbtn, "hidden")) {
                Dom.addClass(this._gameSubbtn, "hidden")
            }
        }, _displayCatName: function (game) {
            this._clearDataCache();
            this._clearPrice();
            switch (Dom.attr(game, "id")) {
                case "J_AlimGameGold":
                    this._currentGameType = this.GAME_TYPE.GOLD;
                    DataStore.set("gameType", "gold");
                    Dom.text(this._gameCatNameD, "\u79cd\u7c7b\uff1a");
                    Dom.text(this._parPriceLabelD, "\u9762\u503c\uff1a");
                    this._togglePriceEntry("show");
                    this._requestQQCatsInfo();
                    break;
                case "J_AlimGameCard":
                    this._currentGameType = this.GAME_TYPE.CARD;
                    DataStore.set("gameType", "card");
                    Dom.text(this._gameCatNameD, "\u6e38\u620f\uff1a");
                    Dom.text(this._parPriceLabelD, "\u9762\u503c\uff1a");
                    this._togglePriceEntry("show");
                    this._requestCardCatsInfo();
                    break;
                case "J_AlimGameOnline":
                    this._currentGameType = this.GAME_TYPE.ONLINE;
                    DataStore.set("gameType", "online");
                    Dom.text(this._gameCatNameD, "\u6e38\u620f\uff1a");
                    Dom.text(this._parPriceLabelD, "\u7269\u54c1\uff1a");
                    this._togglePriceEntry("hidden");
                    this._requestOnlineCatsInfo();
                    break
            }
        }, _togglePriceEntry: function (flag) {
            if (flag === "show") {
                Dom.removeClass(this._gameSalePriceEntry, "hidden")
            } else {
                if (flag === "hidden") {
                    if (!Dom.hasClass(this._gameSalePriceEntry, "hidden")) {
                        Dom.addClass(this._gameSalePriceEntry, "hidden")
                    }
                }
            }
        }, _requestOnlineCatsInfo: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: taokeDomain + taokeOnlineUrlsPath.onlineList, success: function (data) {
                if (!data.success) {
                    self._isGameLackItem = true;
                    self._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                    return
                }
                self._isGameLackItem = false;
                self.getOnlineCats(data)
            } 
            })
        }, getOnlineCats: function (data) {
            if (!data.data) {
                self._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                return
            }
            S.each(data.data, function (v, k) {
                this._gameCatsInfo.push({ catId: k, catData: v })
            }, this);
            this._fillCatOpts();
            this._catChange()
        }, _requestCardCatsInfo: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: taokeDomain + taokeCardUrlsPath.cardList, success: function (data) {
                if (!data.success) {
                    self._isGameLackItem = true;
                    self._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                    return
                }
                self._isGameLackItem = false;
                self.getCardCats(data)
            } 
            })
        }, getCardCats: function (data) {
            if (!data.data) {
                self._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                return
            }
            S.each(data.data, function (v, k) {
                this._gameCatsInfo.push({ catId: k, catData: v })
            }, this);
            this._gameCatsInfo.sort(function (a, b) {
                return a.catData.name.localeCompare(b.catData.name)
            });
            this._fillCatOpts();
            this._catChange()
        }, _requestQQCatsInfo: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: taokeDomain + taokeQQUrlsPath.qqList, success: function (data) {
                if (!data.success) {
                    self._isGameLackItem = true;
                    self._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                    return
                }
                self._isGameLackItem = false;
                self.getQQCats(data)
            } 
            })
        }, getQQCats: function (data) {
            if (!data.data) {
                self._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                return
            }
            S.each(data.data, function (v, k) {
                this._gameCatsInfo.push({ catId: k, catData: v })
            }, this);
            this._fillCatOpts();
            this._catChange()
        }, _fillCatOpts: function () {
            var catOpts = this._catOpts;
            this._recoveryCatOpts();
            this._recoveryPrice();
            if (this._gameCatsInfo.length > 0) {
                S.each(this._gameCatsInfo, function (gameCatInfo) {
                    catOpts[catOpts.length] = new Option(gameCatInfo.catData.name, gameCatInfo.catId)
                })
            }
        }, _recoveryCatOpts: function () {
            this._catOpts.length = 0;
            this._catIndex = 0
        }, _recoveryPrice: function () {
            this._parPriceOpts.length = 0;
            this._parPriceIndex = 0;
            Dom.text(this._gameSalePriceD, "")
        }, _catChange: function () {
            this._recoveryPrice();
            this._clearPrice();
            this._gameItemsInfo = this._gameCatsInfo[this._catIndex];
            this._fillParPriceOpts();
            this._parPriceChange()
        }, _fillParPriceOpts: function () {
            var parPriceOpts = this._parPriceOpts, itemPrices, itemPricesVid;
            if (this._currentGameType === this.GAME_TYPE.ONLINE) {
                itemPrices = !!this._gameItemsInfo ? this._gameItemsInfo.catData.goods : [];
                itemPricesVid = itemPrices.length > 0 ? this._gameItemsInfo.catData.pidvid : []
            } else {
                itemPrices = !!this._gameItemsInfo ? this._gameItemsInfo.catData.price : [];
                itemPricesVid = itemPrices.length > 0 ? this._gameItemsInfo.catData.price_vid : []
            }
            this._msgToRecharge();
            S.each(itemPrices, function (price, index) {
                parPriceOpts[parPriceOpts.length] = new Option(price, itemPricesVid[index])
            })
        }, _clearPrice: function () {
            Dom.text(this._gameSalePriceLabelD, "\u552e\u4ef7\uff1a");
            Dom.text(this._gameSalePriceD, "");
            if (Dom.hasClass(this._gameSubbtn, "hidden")) {
                Dom.removeClass(this._gameSubbtn, "hidden")
            }
        }, _parPriceChange: function () {
            this._clearPrice();
            var index = this._parPriceIndex;
            var gameItemsInfo = this._gameItemsInfo;
            switch (this._currentGameType) {
                case this.GAME_TYPE.GOLD:
                    var catData = gameItemsInfo.catData;
                    var self = this;
                    S.io({ dataType: "jsonp", url: taokeDomain + taokeQQUrlsPath.qqCard, data: { cat_id: gameItemsInfo.catId, price_id: catData.price_id, mm_id: mmId, price_vid: catData.price_vid[index], service_id: catData.service_id }, success: function (data) {
                        if (!data.success) {
                            self._isGameLackItem = true;
                            self._markGameLackItem("gold");
                            return
                        }
                        self._isGameLackItem = false;
                        self._fillPriceAndEnableBuy({ clickUrl: data.click_url, price: data.price })
                    } 
                    });
                    break;
                case this.GAME_TYPE.CARD:
                    var catData = gameItemsInfo.catData;
                    var self = this;
                    S.io({ dataType: "jsonp", url: taokeDomain + taokeCardUrlsPath.cardBuy, data: { cat_id: gameItemsInfo.catId, price_id: catData.price_id, mm_id: mmId, price_vid: catData.price_vid[index], service_id: catData.service_id }, success: function (data) {
                        if (!data.success) {
                            self._isGameLackItem = true;
                            self._markGameLackItem("card");
                            return
                        }
                        self._isGameLackItem = false;
                        self._fillPriceAndEnableBuy({ clickUrl: data.click_url, price: data.price })
                    } 
                    });
                    break;
                case this.GAME_TYPE.ONLINE:
                    var catData = gameItemsInfo.catData;
                    var self = this;
                    self._togglePriceEntry("hidden");
                    S.io({ dataType: "jsonp", url: taokeDomain + taokeOnlineUrlsPath.onlineBuy, data: { cat_id: gameItemsInfo.catId, mm_id: mmId, pidvid: catData.pidvid[index] }, success: function (data) {
                        if (!data.success) {
                            self._isGameLackItem = true;
                            self._togglePriceEntry("show");
                            self._markGameLackItem("online");
                            return
                        }
                        self._isGameLackItem = false;
                        self._fillPriceAndEnableBuy({ clickUrl: data.click_url, price: data.price })
                    } 
                    });
                    break
            }
        }, _fillPriceAndEnableBuy: function (data) {
            Dom.text(this._gameSalePriceD, data.price);
            Dom.attr(this._gameSubbtn, "href", data.clickUrl);
            this._msgToRecharge()
        }, _rechargeToMsg: function (msg, iconClass) {
            Dom.text(this._gameMsgD, msg);
            if (!Dom.hasClass(this._gameMsgBox, iconClass)) {
                if (iconClass == "dealing") {
                    if (Dom.hasClass(this._gameMsgBox, "warning")) {
                        Dom.removeClass(this._gameMsgBox, "warning")
                    }
                    if (!Dom.hasClass(this._gameSubbtn, "hidden")) {
                        Dom.addClass(this._gameSubbtn, "hidden")
                    }
                }
                Dom.addClass(this._gameMsgBox, iconClass)
            }
            if (Dom.hasClass(this._gameMsgBox, "hidden")) {
                Dom.removeClass(this._gameMsgBox, "hidden")
            }
            if (S.UA.ie && 8 > S.UA.ie) {
                Dom.css(this._telSubbtn, "zoom", "");
                Dom.css(this._telSubbtn, "zoom", "1")
            }
        }, _msgToRecharge: function () {
            if (!Dom.hasClass(this._gameMsgBox, "hidden")) {
                Dom.addClass(this._gameMsgBox, "hidden")
            }
            if (S.UA.ie && 8 > S.UA.ie) {
                Dom.css(this._telSubbtn, "zoom", "");
                Dom.css(this._telSubbtn, "zoom", "1")
            }
        } 
        });
        var Tel = function (moduleRootD) {
            this._telBoxType = Dom.width(Dom.parent(moduleRootD)) == 190 ? "vt" : "hz";
            this._telPanel = Dom.get(".tel-panel", moduleRootD);
            this._telSubbtn = Dom.get("#J_AlimTelSubmit", moduleRootD);
            this._telMsgBoxD = Dom.get("#J_AlimTelMsgBox", moduleRootD);
            this._telMsgD = Dom.get("#J_AlimTelMsg", moduleRootD);
            this._telOperatorD = Dom.get("#J_AlimTelOperator", moduleRootD);
            this._parPriceD = Dom.get("#J_AlimTelParPrice", moduleRootD);
            this._parPriceOpts = this._parPriceD.options;
            this._telSalePriceLabelD = Dom.get("#J_AlimTelSalePriceLabel", moduleRootD);
            this._telSalePriceD = Dom.get("#J_AlimTelSalePrice", moduleRootD);
            this._telInputD = Dom.get("#J_AlimTelInput", moduleRootD);
            this._telInputCfmD = Dom.get("#J_AlimTelInputCfm", moduleRootD);
            this._telProvinceD = Dom.get("#J_AlimTelProvince", moduleRootD);
            this._telCatNameD = Dom.get("#J_AlimTelCatName", moduleRootD);
            this._isTelLackItem = false;
            this._mobilesInfo = new Array;
            this._getPriceData = {};
            this._getPriceData.mm_id = mmId;
            this._initTelEvent();
            this._getPrice()
        };
        S.augment(Tel, { _initTelEvent: function () {
            var self = this;
            Event.on(self._telInputD, "focus", function () {
                if (Dom.hasClass(this, "prompt")) {
                    Dom.val(this, "");
                    Dom.removeClass(this, "prompt")
                }
                if (Dom.attr(self._telInputCfmD, "disabled")) {
                    Dom.removeAttr(self._telInputCfmD, "disabled")
                }
                self._msgToRecharge()
            });
            Event.on(self._telInputCfmD, "focus", function () {
                if (Dom.hasClass(this, "prompt")) {
                    Dom.val(this, "");
                    Dom.removeClass(this, "prompt")
                }
            });
            Event.on(self._telInputD, "paste", function () {
                return false
            });
            Event.on(self._telInputCfmD, "paste", function () {
                return false
            });
            Event.on(self._telInputD, "contextmenu", function () {
                return false
            });
            Event.on(self._telInputCfmD, "contextmenu", function () {
                return false
            });
            Event.on(self._telInputD, "keyup", function () {
                var regExp = /\D/g;
                var input = Dom.val(this);
                Dom.val(this, input.replace(regExp, ""));
                if (Dom.val(self._telInputCfmD)) {
                    Dom.val(self._telInputCfmD, "\u8bf7\u518d\u6b21\u8f93\u5165");
                    Dom.addClass(self._telInputCfmD, "prompt")
                }
                if (!Dom.hasClass(self._telOperatorD, "hidden")) {
                    Dom.addClass(self._telOperatorD, "hidden")
                }
                self._clearPrice()
            });
            Event.on(self._telInputCfmD, "keyup", function () {
                var regExp = /\D/g;
                var input = Dom.val(this);
                Dom.val(this, input.replace(regExp, ""))
            });
            Event.on(self._telInputD, "blur", function () {
                if (Dom.val(this).charAt(0) !== "1" || Dom.val(this).length < 11) {
                    self._rechargeToMsg(ERROR_NUMBER, "warning");
                    Dom.attr(self._telInputCfmD, "disabled", "disabled")
                }
            });
            Event.on(self._telInputCfmD, "blur", function () {
                if (Dom.val(self._telInputD) !== Dom.val(self._telInputCfmD)) {
                    self._rechargeToMsg(INCONSISTENT, "warning")
                } else {
                    self._msgToRecharge()
                }
            });
            Event.on(self._telInputCfmD, "keyup", function () {
                if (Dom.val(self._telInputCfmD).length === 11) {
                    if (Dom.val(self._telInputD) !== Dom.val(self._telInputCfmD)) {
                        self._rechargeToMsg(INCONSISTENT, "warning")
                    } else {
                        self._msgToRecharge();
                        self._getOperators()
                    }
                }
            });
            Event.on(self._parPriceD, "change", function () {
                self._priceChange(this)
            });
            Event.on(self._telSubbtn, "click", function (e) {
                if (Dom.val(self._telInputD).charAt(0) !== "1" || Dom.val(self._telInputD).length < 11) {
                    self._rechargeToMsg(ERROR_NUMBER, "warning");
                    e.halt()
                } else {
                    if (Dom.val(self._telInputD) !== Dom.val(self._telInputCfmD)) {
                        self._rechargeToMsg(INCONSISTENT, "warning");
                        e.halt()
                    } else {
                        if (self._parPriceOpts.length == 0) {
                            self._rechargeToMsg(LACK_ITEMS, "warning");
                            e.halt()
                        } else {
                            if (self._isTelLackItem) {
                                e.halt()
                            }
                        }
                    }
                }
            })
        }, _isPhoneCheckOK: function (needWarning) {
            var phone = Dom.val(this._telInputD), phoneCfm = Dom.val(this._telInputCfmD);
            if (phone.charAt(0) !== "1" || phone.length !== 11) {
                needWarning && this._rechargeToMsg(ERROR_NUMBER, "warning");
                return false
            }
            if (phone !== phoneCfm) {
                needWarning && this._rechargeToMsg(INCONSISTENT, "warning");
                return false
            }
            return true
        }, _priceChange: function (priceD) {
            var self = this;
            self._clearPrice();
            var index = priceD.selectedIndex;
            self._getPriceData.price_id = self._mobilesInfo[index].id;
            self._getPriceData.phone = Dom.val(self._telInputD);
            if (!self._isPhoneCheckOK()) {
                return
            }
            S.io({ dataType: "jsonp", url: taokeDomain + taokePhoneUrlsPath.phoneCard, data: self._getPriceData, success: function (data) {
                if (!data.success) {
                    self._isTelLackItem = true;
                    self._markLackItem();
                    return
                }
                self._isTelLackItem = false;
                Dom.text(self._telSalePriceD, data.price);
                Dom.attr(self._telSubbtn, "href", data.click_url);
                if (Dom.hasClass(this, "prompt")) {
                    Dom.removeClass(this, "prompt")
                }
                self._msgToRecharge()
            } 
            })
        }, _markLackItem: function () {
            this._telSalePriceLabelD.innerHTML = "\u7f3a\u8d27\uff1a";
            this._telSalePriceD.innerHTML = "<a href='" + lackLinks.tel.replace(/\$\{SearchString\}/, "pid=" + mmId) + "' target='_blank'>\u70b9\u6b64\u641c\u7d22</a>";
            if (!Dom.hasClass(this._telSubbtn, "hidden")) {
                Dom.addClass(this._telSubbtn, "hidden")
            }
        }, _clearPrice: function () {
            this._telSalePriceLabelD.innerHTML = "\u552e\u4ef7\uff1a";
            Dom.text(this._telSalePriceD, "");
            if (Dom.hasClass(this._telSubbtn, "hidden")) {
                Dom.removeClass(this._telSubbtn, "hidden")
            }
        }, _rechargeToMsg: function (msg, iconClass) {
            var self = this;
            Dom.text(self._telMsgD, msg);
            if (iconClass == "warning" && (msg == ERROR_NUMBER || msg == INCONSISTENT)) {
                if (!Dom.hasClass(self._telOperatorD, "hidden")) {
                    Dom.addClass(self._telOperatorD, "hidden")
                }
                if (Dom.hasClass(self._telOperatorD, "operator")) {
                    Dom.removeClass(self._telOperatorD, "operator")
                }
            }
            if (!Dom.hasClass(self._telMsgBoxD, iconClass)) {
                if (iconClass == "dealing") {
                    if (Dom.hasClass(self._telMsgBoxD, "warning")) {
                        Dom.removeClass(self._telMsgBoxD, "warning")
                    }
                    if (!Dom.hasClass(self._telSubbtn, "hidden")) {
                        Dom.addClass(self._telSubbtn, "hidden")
                    }
                }
                Dom.addClass(self._telMsgBoxD, iconClass)
            }
            if (Dom.hasClass(self._telMsgBoxD, "hidden")) {
                Dom.removeClass(self._telMsgBoxD, "hidden")
            }
            if (S.UA.ie && 8 > S.UA.ie) {
                Dom.css(self._telSubbtn, "zoom", "");
                Dom.css(self._telSubbtn, "zoom", "1")
            }
        }, _msgToRecharge: function () {
            if (!Dom.hasClass(this._telMsgBoxD, "hidden")) {
                Dom.addClass(this._telMsgBoxD, "hidden")
            }
            if (S.UA.ie && 8 > S.UA.ie) {
                Dom.css(this._telSubbtn, "zoom", "");
                Dom.css(this._telSubbtn, "zoom", "1")
            }
        }, _getOperators: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: taokeDomain + taokePhoneUrlsPath.phoneSearch, data: { phone: Dom.val(self._telInputD) }, success: function (data) {
                if (!data.success) {
                    self._rechargeToMsg(ERROR_NUMBER, "warning");
                    return
                }
                self.displayOperators(data);
                self._priceChange(self._parPriceD)
            } 
            })
        }, displayOperators: function (data) {
            var self = this;
            self._getPriceData.cat_id = data.cat_id;
            self._getPriceData.province_id = data.province_id;
            var catName = data.cat_name.substr(2);
            Dom.text(self._telOperatorD, data.province_name + catName);
            if (Dom.hasClass(self._telOperatorD, "hidden")) {
                Dom.removeClass(self._telOperatorD, "hidden")
            }
            if (!Dom.hasClass(self._telOperatorD, "operator")) {
                Dom.addClass(self._telOperatorD, "operator")
            }
            Dom.val(self._telProvinceD, data.province);
            Dom.val(self._telCatNameD, catName)
        }, _getPrice: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: taokeDomain + taokePhoneUrlsPath.phoneList, success: function (data) {
                if (!data.success) {
                    self._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                    return
                }
                self.displayPrice(data)
            } 
            })
        }, displayPrice: function (data) {
            var parPriceOpts = this._parPriceOpts;
            if (!data.denomination) {
                this._rechargeToMsg(DATA_REQUIRE_ERROR, "warning");
                return
            }
            this._mobilesInfo = data.denomination;
            if (parPriceOpts.length > 0) {
                parPriceOpts.length = 0
            }
            if (Dom.hasClass(this._parPriceD, "prompt")) {
                Dom.removeClass(this._parPriceD, "prompt")
            }
            Dom.text(this._telSalePriceD, "");
            if (this._mobilesInfo.length > 0) {
                S.each(this._mobilesInfo, function (mobileInfo) {
                    var newOpt = new Option(mobileInfo.name, mobileInfo.id);
                    if (mobileInfo.name === "100\u5143") {
                        newOpt.selected = true
                    }
                    parPriceOpts[parPriceOpts.length] = newOpt
                })
            }
        } 
        });
        self._init(DataStore, rechargeData, Tel, Game)
    }
    S.augment(RechargeAlimama, { _init: function (DataStore, rechargeData, Tel, Game) {
        var self = this;
        S.ready(function (S) {
            S.log("RechargeAlimama init start");
            DataStore.create();
            if (rechargeData.showMobile) {
                var tel = new Tel(self._mod)
            }
            if (rechargeData.showCard || rechargeData.showGold || rechargeData.showOnline) {
                var game = new Game(self._mod)
            }
            S.log("RechargeAlimama init end")
        })
    } 
    });
    RechargeAlimama.selector = ".tshop-pbsm-sra10c";
    return RechargeAlimama
}, { requires: ["core"] });
