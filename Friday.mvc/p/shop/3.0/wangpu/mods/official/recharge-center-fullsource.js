KISSY.add("wangpu/mods/official/recharge-center", function (S, Core) {
    var Dom = S.DOM, Event = S.Event, doc = document, oStorage, ie = document.all;
    var ERROR_NUMBER = "\u53f7\u7801\u6709\u8bef,\u8bf7\u91cd\u65b0\u8f93\u5165", INCONSISTENT = "\u53f7\u7801\u4e0d\u4e00\u81f4,\u8bf7\u91cd\u65b0\u8f93\u5165", SELECT_PARPRICE = "\u8bf7\u9009\u62e9\u9762\u503c", LACK_ITEMS = "\u8d27\u7269\u6682\u7f3a", DEALING = "\u6b63\u5728\u5904\u7406\u8bf7\u7a0d\u540e\u2026\u2026", GAME_LACK_ITEMS = "\u8d27\u7269\u6682\u7f3a\uff0c\u8d2d\u4e70\u5176\u4ed6", SELECT_GAME_INFO = "\u8bf7\u9009\u62e9\u76f8\u5e94\u4fe1\u606f";
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
    function RechargeCenter(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        var rechargeData = S.JSON.parse(Dom.attr("#J_RechargeData", "data-value"));
        var Game = function () {
            this._catOpts = Dom.get("#J_GameCatId").options;
            this._parPriceOpts = Dom.get("#J_GameParPrice").options;
            this._catIndex = 0;
            this._parPriceIndex = 0;
            this._gameCatsInfo = new Array;
            this._gameItemsInfo = new Array;
            this._chargeType;
            this._selectedItemId;
            this._searchMore;
            this.init()
        };
        S.augment(Game, { init: function () {
            this._initGameEvent();
            if (rechargeData.showCard && rechargeData.showGold) {
                if (DataStore.get("gameType") == "card") {
                    Dom.attr("#J_GameCard", "checked", "checked");
                    this._displayCatName("#J_GameCard")
                } else {
                    if (DataStore.get("gameType") == "gold") {
                        Dom.attr("#J_GameGold", "checked", "checked");
                        this._displayCatName("#J_GameGold")
                    } else {
                        if (Dom.attr("#J_GameCard", "checked")) {
                            this._displayCatName("#J_GameCard")
                        } else {
                            if (Dom.attr("#J_GameGold", "checked")) {
                                this._displayCatName("#J_GameGold")
                            } else {
                                Dom.attr("#J_GameCard", "checked", "checked");
                                this._displayCatName("#J_GameCard")
                            }
                        }
                    }
                }
            } else {
                if (rechargeData.showCard) {
                    this._requestCardCatsInfo()
                } else {
                    if (rechargeData.showGold) {
                        this._requestQQCatsInfo()
                    }
                }
            }
        }, _initGameEvent: function () {
            var self = this;
            if (Dom.get("#J_GameCard") && Dom.get("#J_GameGold")) {
                Event.on("#J_GameCard", "click", function () {
                    self._msgToRecharge();
                    self._displayCatName(this)
                });
                Event.on("#J_GameGold", "click", function () {
                    self._msgToRecharge();
                    self._displayCatName(this)
                })
            }
            Event.on("#J_GameCatId", "change", function () {
                self._catIndex = this.selectedIndex;
                self._catChange()
            });
            Event.on("#J_GameParPrice", "change", function () {
                self._parPriceIndex = this.selectedIndex;
                self._parPriceChange()
            });
            Event.on(doc.gameCardForm, "submit", function () {
                if (self._formValidate()) {
                    if (self._chargeType !== 1) {
                        if (self._chargeType === 2) {
                            Dom.val(doc.gameCardForm.auto_post, "1")
                        }
                        Dom.val(doc.gameCardForm.auto_post_1, "zhanghao");
                        doc.gameCardForm.action = rechargeData.buyDomain + "/buy_now.htm"
                    }
                    self._rechargeToMsg(DEALING, "dealing");
                    return true
                } else {
                    return false
                }
            })
        }, _displayCatName: function (game) {
            if (Dom.attr(game, "id") === "J_GameCard") {
                DataStore.set("gameType", "card");
                Dom.text("#J_GameCatName", "\u6e38\u620f\uff1a");
                this._requestCardCatsInfo()
            } else {
                DataStore.set("gameType", "gold");
                Dom.text("#J_GameCatName", "\u79cd\u7c7b\uff1a");
                this._requestQQCatsInfo()
            }
        }, _requestCardCatsInfo: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: rechargeData.storeDomain + "/shop/rechargeCenter.htm", data: { type: "game", game_type: "card", user_num_id: rechargeData.userNumId, sign: rechargeData.sign }, success: function (data) {
                self.getCardCats(data)
            } 
            })
        }, getCardCats: function (data) {
            this._gameCatsInfo = data.cardIdNameInfos;
            this._fillCatOpts()
        }, _requestQQCatsInfo: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: rechargeData.storeDomain + "/shop/rechargeCenter.htm", data: { type: "game", game_type: "qq", user_num_id: rechargeData.userNumId, sign: rechargeData.sign }, success: function (data) {
                self.getQQCats(data)
            } 
            })
        }, getQQCats: function (data) {
            if (rechargeData.searchMoreQQUrl == "") {
                this._gameCatsInfo = data.qqsInfo
            } else {
                this._gameCatsInfo = data.qqIdNameInfos
            }
            this._fillCatOpts()
        }, _fillCatOpts: function () {
            var catOpts = this._catOpts;
            this._recoveryCatOpts();
            this._recoveryPrice();
            if (this._gameCatsInfo.length > 0) {
                S.each(this._gameCatsInfo, function (gameCatInfo) {
                    catOpts[catOpts.length] = new Option(gameCatInfo.alias, gameCatInfo.categoryId)
                })
            }
        }, _recoveryCatOpts: function () {
            this._catOpts.length = 1;
            this._catIndex = 0;
            if (!Dom.hasClass("#J_GameCatId", "prompt")) {
                Dom.addClass("#J_GameCatId", "prompt")
            }
        }, _recoveryPrice: function () {
            this._parPriceOpts.length = 1;
            this._parPriceIndex = 0;
            if (!Dom.hasClass("#J_GameParPrice", "prompt")) {
                Dom.addClass("#J_GameParPrice", "prompt")
            }
            Dom.text("#J_GameSalePrice", "")
        }, _catChange: function () {
            this._recoveryPrice();
            if (this._catIndex > 0) {
                if (Dom.hasClass("#J_GameCatId", "prompt")) {
                    Dom.removeClass("#J_GameCatId", "prompt")
                }
                if (Dom.attr("#J_GameGold", "checked") && rechargeData.searchMoreQQUrl == "") {
                    this._gameItemsInfo = this._gameCatsInfo[this._catIndex - 1].gamePVList;
                    this._fillParPriceOpts()
                } else {
                    if (Dom.attr("#J_GameGold", "checked")) {
                        this._requestQQItemsInfo()
                    } else {
                        this._requestCardItemsInfo()
                    }
                }
            } else {
                if (!Dom.hasClass("#J_GameCatId", "prompt")) {
                    Dom.addClass("#J_GameCatId", "prompt")
                }
            }
        }, _requestCardItemsInfo: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: rechargeData.storeDomain + "/shop/rechargeCenter.htm", data: { type: "game", game_type: "card", cat_id: self._catOpts[self._catIndex].value, user_num_id: rechargeData.userNumId, sign: rechargeData.sign }, success: function (data) {
                self._gameItemsInfo = data.cardsInfo;
                self._fillParPriceOpts()
            } 
            })
        }, _requestQQItemsInfo: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: rechargeData.storeDomain + "/shop/rechargeCenter.htm", data: { type: "game", game_type: "qq", pid_vid: self._catOpts[self._catIndex].value, user_num_id: rechargeData.userNumId, sign: rechargeData.sign }, success: function (data) {
                self._gameItemsInfo = data.qqsInfo;
                self._fillParPriceOpts()
            } 
            })
        }, _fillParPriceOpts: function () {
            var parPriceOpts = this._parPriceOpts;
            if (this._gameItemsInfo.length > 0) {
                this._msgToRecharge();
                S.each(this._gameItemsInfo, function (gameItemInfo) {
                    parPriceOpts[parPriceOpts.length] = new Option(gameItemInfo.parPrice, gameItemInfo.itemNumId)
                })
            } else {
                this._rechargeToMsg(GAME_LACK_ITEMS, "warning")
            }
        }, _parPriceChange: function () {
            var index = this._parPriceIndex;
            if (index > 0) {
                if (Dom.hasClass("#J_GameParPrice", "prompt")) {
                    Dom.removeClass("#J_GameParPrice", "prompt")
                }
                var gameItemInfo = this._gameItemsInfo[index - 1];
                Dom.text("#J_GameSalePrice", gameItemInfo.salePrice);
                Dom.val(doc.gameCardForm.sku_id, gameItemInfo.skuId);
                this._selectedItemId = gameItemInfo.itemNumId;
                this._chargeType = gameItemInfo.chargeType;
                this._isAutoRecharge();
                this._msgToRecharge()
            } else {
                Dom.text("#J_GameSalePrice", "");
                if (!Dom.hasClass("#J_GameParPrice", "prompt")) {
                    Dom.addClass("#J_GameParPrice", "prompt")
                }
            }
        }, _isAutoRecharge: function () {
            var self = this;
            if (self._chargeType === 1) {
                S.getScript(rechargeData.buyDomain + "/buy.htm?from=tcc&item_id=" + self._selectedItemId, { success: function () {
                    if (window.loginIndicator) {
                        doc.gameCardForm.action = window.loginIndicator.isFastBuy ? rechargeData.buyDomain + "/buy_now.htm" : rechargeData.buyDomain + "/fastbuy/fast_buy.htm"
                    }
                } 
                })
            }
        }, _formValidate: function () {
            if (this._catOpts.length == 1 || this._catIndex > 0 && this._parPriceOpts.length == 1) {
                this._rechargeToMsg(GAME_LACK_ITEMS, "warning");
                return false
            } else {
                if (!this._catIndex || !this._parPriceIndex) {
                    this._rechargeToMsg(SELECT_GAME_INFO, "warning");
                    return false
                } else {
                    return true
                }
            }
        }, _rechargeToMsg: function (msg, iconClass) {
            Dom.text("#J_GameMsg", msg);
            if (!Dom.hasClass("#J_GameMsgBox", iconClass)) {
                if (iconClass == "dealing") {
                    if (Dom.hasClass("#J_GameMsgBox", "warning")) {
                        Dom.removeClass("#J_GameMsgBox", "warning")
                    }
                    if (!Dom.hasClass("#J_GameSubmit", "hidden")) {
                        Dom.addClass("#J_GameSubmit", "hidden")
                    }
                }
                Dom.addClass("#J_GameMsgBox", iconClass)
            }
            if (Dom.hasClass("#J_GameMsgBox", "hidden")) {
                Dom.removeClass("#J_GameMsgBox", "hidden")
            }
        }, _msgToRecharge: function () {
            if (!Dom.hasClass("#J_GameMsgBox", "hidden")) {
                Dom.addClass("#J_GameMsgBox", "hidden")
            }
        } 
        });
        var Tel = function (mod) {
            this._telBoxType = Dom.width(Dom.parent(mod)) == 190 ? "vt" : "hz";
            this._telPanel = Dom.get(".tel-panel");
            this._telSubbtn = Dom.get("#J_TelSubmit");
            this._parPriceOpts = Dom.get("#J_TelParPrice").options;
            this._mobilesInfo = new Array;
            this._initTelEvent()
        };
        S.augment(Tel, { _initTelEvent: function () {
            var self = this;
            Event.on("#J_TelInput", "focus", function () {
                if (Dom.hasClass(this, "prompt")) {
                    Dom.val(this, "");
                    Dom.removeClass(this, "prompt")
                }
                if (Dom.attr("#J_TelInputCfm", "disabled")) {
                    Dom.removeAttr("#J_TelInputCfm", "disabled")
                }
                self._msgToRecharge()
            });
            Event.on("#J_TelInputCfm", "focus", function () {
                if (Dom.hasClass(this, "prompt")) {
                    Dom.val(this, "");
                    Dom.removeClass(this, "prompt")
                }
            });
            Event.on("#J_TelInput", "paste", function () {
                return false
            });
            Event.on("#J_TelInputCfm", "paste", function () {
                return false
            });
            Event.on("#J_TelInput", "contextmenu", function () {
                return false
            });
            Event.on("#J_TelInputCfm", "contextmenu", function () {
                return false
            });
            Event.on("#J_TelInput", "keyup", function () {
                var regExp = /\D/g;
                var input = Dom.val(this);
                Dom.val(this, input.replace(regExp, ""));
                if (Dom.val("#J_TelInputCfm")) {
                    Dom.val("#J_TelInputCfm", "\u8bf7\u518d\u6b21\u8f93\u5165");
                    Dom.addClass("#J_TelInputCfm", "prompt")
                }
                if (!Dom.hasClass("#J_TelOperator", "hidden")) {
                    Dom.addClass("#J_TelOperator", "hidden")
                }
            });
            Event.on("#J_TelInputCfm", "keyup", function () {
                var regExp = /\D/g;
                var input = Dom.val(this);
                Dom.val(this, input.replace(regExp, ""))
            });
            Event.on("#J_TelInput", "blur", function () {
                if (Dom.val(this).charAt(0) !== "1" || Dom.val(this).length < 11) {
                    self._rechargeToMsg(ERROR_NUMBER, "warning");
                    Dom.attr("#J_TelInputCfm", "disabled", "disabled")
                }
            });
            Event.on("#J_TelInputCfm", "blur", function () {
                if (Dom.val("#J_TelInput") !== Dom.val("#J_TelInputCfm")) {
                    self._rechargeToMsg(INCONSISTENT, "warning")
                } else {
                    self._msgToRecharge()
                }
            });
            Event.on("#J_TelInputCfm", "keyup", function () {
                if (Dom.val("#J_TelInputCfm").length === 11) {
                    if (Dom.val("#J_TelInput") !== Dom.val("#J_TelInputCfm")) {
                        self._rechargeToMsg(INCONSISTENT, "warning")
                    } else {
                        self._msgToRecharge();
                        self._getOperators()
                    }
                }
            });
            Event.on("#J_TelParPrice", "change", function () {
                var index = this.selectedIndex;
                if (index > 0) {
                    Dom.text("#J_TelSalePrice", self._mobilesInfo[index - 1].salePrice);
                    if (Dom.hasClass(this, "prompt")) {
                        Dom.removeClass(this, "prompt")
                    }
                    if (self._mobilesInfo[index - 1].auto) {
                        Dom.val("#J_TelMode", "buynow/PhoneEcardBuyNowAction")
                    } else {
                        Dom.val("#J_TelMode", "buynow/SmcMobileBuyNowDirectAction")
                    }
                    self._msgToRecharge()
                } else {
                    Dom.text("#J_TelSalePrice", "");
                    if (!Dom.hasClass(this, "prompt")) {
                        Dom.addClass(this, "prompt")
                    }
                }
            });
            Event.on(doc.telForm, "submit", function () {
                if (Dom.val("#J_TelInput").charAt(0) !== "1" || Dom.val("#J_TelInput").length < 11) {
                    self._rechargeToMsg(ERROR_NUMBER, "warning");
                    return false
                } else {
                    if (Dom.val("#J_TelInput") !== Dom.val("#J_TelInputCfm")) {
                        self._rechargeToMsg(INCONSISTENT, "warning");
                        return false
                    } else {
                        if (self._parPriceOpts.length == 1) {
                            self._rechargeToMsg(LACK_ITEMS, "warning");
                            return false
                        } else {
                            if (Dom.get("#J_TelParPrice").selectedIndex === 0) {
                                self._rechargeToMsg(SELECT_PARPRICE, "warning");
                                return false
                            } else {
                                self._rechargeToMsg(DEALING, "dealing");
                                return true
                            }
                        }
                    }
                }
            })
        }, _rechargeToMsg: function (msg, iconClass) {
            Dom.text("#J_TelMsg", msg);
            if (iconClass == "warning" && (msg == ERROR_NUMBER || msg == INCONSISTENT)) {
                if (!Dom.hasClass("#J_TelOperator", "hidden")) {
                    Dom.addClass("#J_TelOperator", "hidden")
                }
                if (Dom.hasClass("#J_TelOperator", "operator")) {
                    Dom.removeClass("#J_TelOperator", "operator")
                }
                if (this._parPriceOpts.length > 1) {
                    this._parPriceOpts.length = 1
                }
                if (!Dom.hasClass("#J_TelParPrice", "prompt")) {
                    Dom.addClass("#J_TelParPrice", "prompt")
                }
                Dom.text("#J_TelSalePrice", "")
            }
            if (!Dom.hasClass("#J_TelMsgBox", iconClass)) {
                if (iconClass == "dealing") {
                    if (Dom.hasClass("#J_TelMsgBox", "warning")) {
                        Dom.removeClass("#J_TelMsgBox", "warning")
                    }
                    if (!Dom.hasClass("#J_TelSubmit", "hidden")) {
                        Dom.addClass("#J_TelSubmit", "hidden")
                    }
                }
                Dom.addClass("#J_TelMsgBox", iconClass)
            }
            if (Dom.hasClass("#J_TelMsgBox", "hidden")) {
                Dom.removeClass("#J_TelMsgBox", "hidden")
            }
            if (this._telBoxType == "vt") {
                Dom.css(this._telPanel, "height", "190px");
                Dom.css(this._telSubbtn, "top", "162px")
            }
        }, _msgToRecharge: function () {
            if (!Dom.hasClass("#J_TelMsgBox", "hidden")) {
                Dom.addClass("#J_TelMsgBox", "hidden")
            }
            if (this._telBoxType == "vt") {
                Dom.css(this._telPanel, "height", "161px");
                Dom.css(this._telSubbtn, "top", "136px")
            }
        }, _getOperators: function () {
            var self = this;
            S.io({ dataType: "jsonp", url: "http://tcc.taobao.com/cc/json/mobile_tel_segment.htm", data: { tel: Dom.val("#J_TelInput") }, success: function (data) {
                self.displayOperators(data)
            } 
            })
        }, displayOperators: function (data) {
            var catName = data.catName.substr(2);
            Dom.text("#J_TelOperator", data.province + catName);
            if (Dom.hasClass("#J_TelOperator", "hidden")) {
                Dom.removeClass("#J_TelOperator", "hidden")
            }
            if (!Dom.hasClass("#J_TelOperator", "operator")) {
                Dom.addClass("#J_TelOperator", "operator")
            }
            Dom.val("#J_TelProvince", data.province);
            Dom.val("#J_TelCatName", catName);
            this._getPrice(data)
        }, _getPrice: function (data) {
            var self = this;
            S.io({ dataType: "jsonp", url: rechargeData.storeDomain + "/shop/rechargeCenter.htm", data: { type: "mobile", province: data.province, catName: data.catName.substr(2), user_num_id: rechargeData.userNumId, sign: rechargeData.sign, _input_charset: "utf-8" }, success: function (data) {
                self.displayPrice(data)
            } 
            })
        }, displayPrice: function (data) {
            this._parPriceOpts = Dom.get("#J_TelParPrice").options;
            var parPriceOpts = this._parPriceOpts;
            this._mobilesInfo = data.mobilesInfo;
            if (parPriceOpts.length > 1) {
                parPriceOpts.length = 1
            }
            if (!Dom.hasClass("#J_TelParPrice", "prompt")) {
                Dom.addClass("#J_TelParPrice", "prompt")
            }
            Dom.text("#J_TelSalePrice", "");
            if (this._mobilesInfo.length > 0) {
                S.each(this._mobilesInfo, function (mobileInfo) {
                    parPriceOpts[parPriceOpts.length] = new Option(mobileInfo.parPrice, mobileInfo.itemNumId)
                })
            } else {
                this._rechargeToMsg(LACK_ITEMS, "warning")
            }
        } 
        });
        self._init(DataStore, rechargeData, Tel, Game)
    }
    S.augment(RechargeCenter, { _init: function (DataStore, rechargeData, Tel, Game) {
        var self = this;
        S.ready(function () {
            S.log("RechargeCenter init start");
            DataStore.create();
            if (rechargeData.showMobile) {
                var tel = new Tel(self._mod)
            }
            if (rechargeData.showCard || rechargeData.showGold) {
                var game = new Game
            }
            S.log("RechargeCenter init end")
        })
    } 
    });
    RechargeCenter.selector = ".tshop-pbsm-src10c";
    return RechargeCenter
}, { requires: ["core"] });
