TB.loginHttp = TB.loginHttp || "https";
KISSY.add("malldetail/sku/setup", function (_kissy_imp, _cookie, _malldetail_common_util, _malldetail_data_data, _malldetail_sku_util, _malldetail_sku_fastlogin, _malldetail_sku_buylink, _malldetail_sku_thumbViewer, _malldetail_sku_skuFeatureIcon, _malldetail_sku_sellCount, _malldetail_sku_skuLade, _malldetail_sku_paymethods, _malldetail_sku_skuTmVip, _malldetail_sku_skuAmount, _malldetail_sku_editEntry, _malldetail_sku_freight, _malldetail_sku_stock, _malldetail_sku_basketAnim, _malldetail_sku_shiptime) {
    var _mods_SKU = _kissy_imp.namespace("mods.SKU"), _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _ua = _kissy.UA;
    var _window = window, _document = document, _body = _document.body;
    var _g_config = _window.g_config;
    var G = "";
    var _sku_cfg = {};
    var _event_target = _kissy.merge({}, _kissy.EventTarget);
    var V = "configChange";
    var _str_sku_inited_event = "skuInited";
    var p = {};
    _mods_SKU.selectSkuId = 0;
    _mods_SKU.valSkuInfo = "";
    var _get_skuQuantity = function (_inventoryDO) {
        var w = _sku_cfg.valItemInfo.skuMap;
        if (_inventoryDO && _inventoryDO.success) {
            var _skuQuantity = _inventoryDO.skuQuantity;
            if (_sku_cfg.valMode & 1 && _skuQuantity) {
                for (var v in w) {
                    var S = w[v]["skuId"];
                    if (_skuQuantity[S]) {
                        w[v].type = _skuQuantity[S]["type"];
                        w[v].stock = _skuQuantity[S]["quantity"]
                    }
                }
            }
            _sku_cfg.valItemInfo.type = _inventoryDO.type;
            _sku_cfg.valItemInfo.skuQuantity = _skuQuantity
        }
    };
    function L() {
        var y = _kissy.unparam(_window.location.href.split("?")[1]);
        var x = [];
        var w;
        var T = _sku_cfg.elmProps && _sku_cfg.elmProps.length;
        if (!T) {
            return
        }
        if (y.skuId) {
            var w = _sku_cfg.valItemInfo.skuMap;
            var S = y.skuId;
            for (var v in w) {
                if (w[v]["skuId"] == S) {
                    v = v.split(";");
                    x = v.slice(1, v.length - 1);
                    break
                }
            }
        } else {
            if (y.sku_properties) {
                x = y.sku_properties.split(";")
            }
        }
        if (x.length) {
            _sku_cfg.valItemInfo.defSelected = x;
            _kissy.log(x)
        }
    }
    function O() {
        var S = _sku_cfg.valMode;
        L();
        _malldetail_sku_thumbViewer.init();
        _mods_SKU.LinkAdd = new _mods_SKU.Util.BuyLinkStatu("#J_LinkAdd", 2);
        if (_window.g_config.offlineShop) {
            _kissy.getScript(_g_config.assetsHost + "/??p/mall/jz/popup/popup.js,p/mall/jz/scroll/scroll.js", function () {
                _kissy.ready(function () {
                    window.Scroll.init(_dom.get("#content"), 880);
                    _dom.css("#content", "width", "100%")
                })
            });
            _mods_SKU.cardManager = new window.JZ.CardManager({ cardCookie: "xx1", loginCookie: "xx4", timeout: 10000 });
            if (S & 2) {
                _kissy_imp.use("malldetail/cart/cart", function (v, w) {
                    w.init()
                })
            }
        }
        _mods_SKU.PopupSimulate.init();
        if (G !== _sku_cfg.valLoginIndicator || G !== _sku_cfg.valLoginUrl) {
            _mods_SKU.FastLogin.init()
        }
        _malldetail_sku_skuAmount.init();
        if (_dom.get("#J_ExSelect")) {
            _kissy.use("malldetail/sku/codeexchange", function () {
                _kissy_imp.mods.CodeExchange.init()
            })
        }
    }
    function _item_visible_check(_defaultMode) {
        var _visible = false;
        var _auctionStatus = _sku_cfg.itemDO.auctionStatus;
        var _is_AuthSeller = _sku_cfg.detail.isAuthSeller;
        var T = "";
        if (!_defaultMode.userInfoDO.loginUserType) {
            _visible = _sku_cfg.itemDO.canView;
            T = 1
        } else {
            var _is_seller = _defaultMode.userInfoDO.loginUserType == "seller" ? true : false;
            if (_defaultMode.userInfoDO.loginCC) {
                if (_is_seller && _sku_cfg.detail.isItemAllowSellerView) {
                    T = 2;
                    _visible = true
                } else {
                    T = 3;
                    _visible = false
                }
            } else {
                if (!_is_seller) {
                    T = 4;
                    _visible = _sku_cfg.itemDO.canView
                } else {
                    if (_sku_cfg.detail.isItemAllowSellerView) {
                        T = 5;
                        _visible = true
                    } else {
                        T = 6;
                        _visible = false
                    }
                }
            }
            if ((_auctionStatus != 0 && _auctionStatus != 1) && !_is_seller) {
                if (!_is_AuthSeller) {
                    T = 83;
                    _visible = false
                }
            }
        }
        if (_sku_cfg.itemDO.sellerFreeze) {
            T = 7;
            _visible = false
        }
        if (!_visible) {
            _window.location.href = "http://detail.tmall.com/auction/noitem.htm?type=" + T
        }
    }
    function M(S) {
        _malldetail_sku_skuLade.init();
        _malldetail_sku_skuTmVip.init(S);
        if (_sku_cfg.isHouseholdService) {
            _kissy_imp.use("malldetail/sku/jia", function (T, v) {
                v.init()
            })
        }
        _malldetail_sku_sellCount.init(S.sellCountDO);
        _malldetail_common_util.loadAssets("cps/trace.js?t=20120618", function () {
            var T = _g_config.isSpu ? 1 : ((_sku_cfg.userInfoDO && _sku_cfg.userInfoDO.juKeBuyerLogin) ? 4 : 2);
            try {
                window.CPS.trace({ type: 1, subtype: T, itemid: _sku_cfg.itemDO.itemId, sellerid: _sku_cfg.itemDO.userId })
            } catch (v) {
            }
        })
    }
    function _toggleStockArea(_isRemoveClass) {
        var _id_array_to_be_hidden = ["#J_RSPostageCont", "#J_EmStock"];
        var _str_class = _isRemoveClass ? "removeClass" : "addClass";
        _kissy.each(_id_array_to_be_hidden, function (_item) {
            _dom[_str_class](_item, "tb-hidden")
        })
    }
    function l() {
        var _form_init = function (_defaultMode) {
            var _valMode = _sku_cfg.valMode;
            _item_visible_check(_defaultMode);
            _render_form_wrapper(_defaultMode);
            if (!_mods_SKU.LinkBuy) {
                _mods_SKU.LinkBuy = new _mods_SKU.Util.BuyLinkStatu("#J_LinkBuy", 3)
            }
            _mods_SKU.Price.init(_defaultMode.itemPriceResultDO, _defaultMode.inventoryDO);
            _kissy_imp.use("malldetail/sku/double11", function (x, y) {
                y.init(_defaultMode.detailPageTipsDO, _defaultMode.tradeResult, _defaultMode.itemPriceResultDO, _defaultMode.miscDO)
            });
            T(_defaultMode);
            _malldetail_sku_freight.init(_defaultMode.deliveryDO);
            _malldetail_sku_stock.init(_defaultMode);
            p = _defaultMode
        };
        var T = function (v) {
            var w = _sku_cfg.valMode;
            if (w & 2048) {
                _mods_SKU.BasketHandler.init()
            } else {
                if (v.tradeResult.miniTmallCartEnable) {
                    _mods_SKU.BasketHandler.load()
                }
            }
            _malldetail_sku_skuAmount.init(v.itemPriceResultDO);
            _malldetail_sku_buylink.init(v);
            _sku_cfg.onBuyEnable && _sku_cfg.onBuyEnable();
            _mods_SKU.Service.init(v.serviceDO);
            _malldetail_sku_skuFeatureIcon.init(v.specialServiceList);
            if (_dom.attr("#J_TreeSelectTrigger", "combo-level") != 3) {
                _mods_SKU.L2Selector.init(_sku_cfg);
                _mods_SKU.dqCity.init(v.soldAreaDO)
            } else {
                _mods_SKU.areaSell.init(v.soldAreaDO)
            }
            M(v);
            _event_target.fire(_str_sku_inited_event, v);
            T = function (x) {
            };
            return T(v)
        };
        _malldetail_data_data.setMdskipTimeout(_sku_cfg.noSkipMode.timeout || 3000);
        _malldetail_data_data.onModel(function (_defaultModel) {
            if (_defaultModel.isSuccess) {
                _get_skuQuantity(_defaultModel.inventoryDO)
            }
            _form_init(_defaultModel);
            _toggleStockArea(_defaultModel.isSuccess)
        }, 13)
    }
    _mods_SKU.getCurrentSkuList = function () {
        if (_mods_SKU.selectSkuId) {
            return [_mods_SKU.selectSkuId]
        }
        var _selArr = _mods_SKU.selArr || [], S = [], _skuMap = _sku_cfg.valItemInfo.skuMap;
        if (!_skuMap) {
            return null
        }
        for (var _skuMapItem in _skuMap) {
            var v = true;
            for (var _index = 0; _index < _selArr.length; _index++) {
                var w = new RegExp(";" + _selArr[_index] + ";");
                if (!_sku_cfg.detail.isDownShelf && !w.test(_skuMapItem)) {
                    v = false;
                    break
                }
            }
            if (v) {
                S.push(_skuMap[_skuMapItem]["skuId"])
            }
        }
        return S
    };
    _mods_SKU.getCurrentPromotion = function () {
        var S;
        _mods_SKU.onCurrentPromotion(function (T) {
            S = T
        });
        return S
    };
    _mods_SKU.onCurrentPromotion = function (S) {
        _mods_SKU.onCurrentPromotionList(function (T) {
            if (!T) {
                S();
                return
            }
            S(T[0])
        })
    };
    _mods_SKU.getCurrentPromotionList = function () {
        var S;
        _mods_SKU.onCurrentPromotionList(function (T) {
            S = T
        });
        return S
    };
    _mods_SKU.onCurrentPromotionList = function (S) {
        _mods_SKU.onCurrentPriceInfo(function (T) {
            _mods_SKU.onPromotionList(T, S)
        })
    };
    _mods_SKU.getPriceInfo = function (S) {
        var T;
        _mods_SKU.onPriceInfo(S, function (v) {
            T = v
        });
        return T
    };
    _mods_SKU.onPromotionList = function (S, T) {
        _mods_SKU.onPriceInfo(S, function (y) {
            if (!y) {
                T();
                return
            }
            var v = y.promPrice, w = y.promotionList;
            if (v) {
                var x = [v];
                if (w) {
                    x = x.concat(w)
                }
                T(x);
                return
            }
            T(w)
        })
    };
    _mods_SKU.onPriceData = function (T) {
        var _areaid = _mods_SKU.buyerLocation && _mods_SKU.buyerLocation.areaId;
        _malldetail_data_data.onPriceInfo({ areaId: _areaid }, T, 13)
    };
    _mods_SKU.onPriceInfo = function (S, T) {
        _mods_SKU.onPriceData(function (v) {
            if ((typeof S) == "object") {
                T(S);
                return
            }
            T(v[S || "def"])
        }, 13)
    };
    _mods_SKU.getCurrentPriceInfo = function () {
        var S;
        _mods_SKU.onCurrentPriceInfo(function (T) {
            S = T
        });
        return S
    };
    _mods_SKU.onCurrentPriceInfo = function (S) {
        _mods_SKU.onCurrentPriceInfoList(function (T) {
            S(T[0])
        })
    };
    _mods_SKU.getCurrentPriceInfoList = function () {
        var S;
        _mods_SKU.onCurrentPriceInfoList(function (T) {
            S = T
        });
        return S
    };
    _mods_SKU.onCurrentPriceInfoList = function (S) {
        _mods_SKU.onPriceData(function (_priceInfoArray) {
            var T = _mods_SKU.getCurrentSkuList();
            var v = [];
            if (T) {
                _kissy.each(T, function (x) {
                    if (_priceInfoArray[x]) {
                        v.push(_priceInfoArray[x])
                    }
                })
            } else {
                _kissy.each(_priceInfoArray, function (x) {
                    if (x) {
                        v.push(x)
                    }
                })
            }
            v = v.sort(function (y, x) {
                return (y.promPrice ? y.promPrice.price : y.price) - (x.promPrice ? x.promPrice.price : x.price)
            });
            S(v)
        })
    };
    _mods_SKU.changeLocation = function (w) {
        _mods_SKU.buyerLocation = w;
        var v = _sku_cfg.changeLocationApi;
        var T = _kissy_imp.getUrlParams;
        var x = p.gatewayDO;
        var S = T(["campaignId", "abt", "key"]);
        S.ref = encodeURIComponent(_document.referrer);
        S.areaId = w ? w.areaId : "";
        if (v.indexOf("tmallBuySupport") == -1) {
            S.tmallBuySupport = _sku_cfg.tradeType == 2 ? "true" : "false"
        }
        if (x && x.changeLocationGateway) {
            _kissy.mix(S, x.changeLocationGateway)
        }
        _kissy.use("ajax", function (z, y) {
            y.jsonp(v, S, function (AA) {
                if (AA.isSuccess) {
                    var AB = AA.defaultModel;
                    _malldetail_data_data.setLocationModel(w.areaId, AB);
                    _get_skuQuantity(AB.inventoryDO);
                    _mods_SKU.Price.init(AB.itemPriceResultDO, AB.inventoryDO);
                    _mods_SKU.Service.init(AB.serviceDO);
                    _malldetail_sku_stock.init(AB);
                    _malldetail_sku_freight.init(AB.deliveryDO);
                    _malldetail_sku_buylink.init(AB);
                    _malldetail_sku_skuFeatureIcon.init(AB.specialServiceList);
                    _mods_SKU.PropertyHandler.reset()
                }
            })
        })
    };
    function _sold_out() {
        var _str_snippet_sold_out = '<li class="sold-out-recommend" id="J_Sold-out-recommend">                            <p><strong class="sold-out-tit">\u6b64\u5546\u54c1\u5df2\u4e0b\u67b6</strong>\uff08<a target="_blank" href="http://service.taobao.com/support/knowledge-1102683.htm"><img src="http://img03.taobaocdn.com/tps/i3/T1Tj4wXkVhXXXXXXXX-12-12.png" alt="\u4e3a\u4ec0\u4e48"></a>\uff09</p>                            <div id="J_FE_soldout"></div>                        </li>';
        var _dom_div_array_meta = _dom.children("#J_DetailMeta .tb-wrap");
        var _meta_sold_out_holder, _price_related_list;
        _kissy.each(_dom_div_array_meta, function (_meta_item, _index) {
            if (_index == 0 && _meta_item.className == "tb-meta") {
                _meta_sold_out_holder = _meta_item;
                _price_related_list = _dom.children(_meta_item)
            } else {
                if (_index == 1 && !_price_related_list) {
                    _meta_sold_out_holder = _meta_item;
                    _price_related_list = _dom.children(_meta_item)
                } else {
                    _dom.remove(_meta_item)
                }
            }
        });
        if (!_price_related_list) {
            return
        }
        _kissy.each(_price_related_list, function (_price_item, _index) {
            if (!_price_item.id || (_price_item.id != "J_StrPriceModBox" && _price_item.id != "J_PromoPrice")) {
                _dom.remove(_price_item);
                delete _price_related_list[_index]
            }
        });
        if (_meta_sold_out_holder) {
            var _dom_sold_out = _dom.create(_str_snippet_sold_out);
            _dom.append(_dom_sold_out, _meta_sold_out_holder)
        }
        _dom_div_array_meta = _meta_sold_out_holder = _price_related_list = null;
        _kissy_imp.use("malldetail/recommend/common", function (_kissy_imp, _malldetail_recommend_common) {
            _malldetail_recommend_common.install("soldOut", "#J_FE_soldout")
        })
    }
    function Q(S) {
        if (_sku_cfg.valMode & 1) {
            _mods_SKU.PropertyHandler.init()
        }
        _kissy.ready(function (T) {
            _malldetail_sku_shiptime.init();
            _malldetail_sku_editEntry.init(S);
            if (_sku_cfg.detail.isDownFe) {
                _sold_out()
            } else {
                if (S.jzDO) {
                    _mods_SKU.IFCLocation.init(S)
                }
                if (_sku_cfg.isMeiz) {
                    _kissy_imp.use("malldetail/meiz/meiz", function (v) {
                        v.mods.Meiz.init(S)
                    })
                }
                if (T.one(".J_Calculator", "#detail")) {
                    T.use("malldetail/sku/calculator", function (w, v) {
                        v.init()
                    })
                }
                _malldetail_sku_paymethods.init(S)
            }
            if (_sku_cfg.isTmallComboSupport) {
                _kissy_imp.use("malldetail/combos/combos", function (v) {
                    v.mods.Token.onInited(function () {
                        v.mods.Combos.init()
                    })
                })
            }
        })
    }
    function _render_form_wrapper(w) {
        var _fn_getUrlParams = _kissy_imp.getUrlParams;
        var _dom_form_id_J_FrmBid = _sku_cfg.frmBid;
        if (!_dom_form_id_J_FrmBid) {
            return
        }
        var _form_wrapper = { arr: [], set: function (_key, _value, _id) {
            if (_dom_form_id_J_FrmBid[_key]) {
                _dom_form_id_J_FrmBid[_key].value = _value
            } else {
                this.arr.push({ k: _key, v: _value, id: _id })
            }
            return this
        }, rander: function () {
            var _arr_snippet = [];
            var _arr = this.arr;
            for (var _index = 0; _index < _arr.length; _index++) {
                var _str = "";
                if (typeof _arr[_index]["id"] != "undefined") {
                    _str = 'id="' + _arr[_index]["id"] + '"'
                }
                _arr_snippet.push('<input type="hidden" name="' + _arr[_index]["k"] + '" value="' + _arr[_index]["v"] + '" ' + _str + ">")
            }
            if (_arr_snippet.length) {
                _dom_form_id_J_FrmBid.innerHTML += _arr_snippet.join("")
            }
            return this
        } 
        };
        if (w.secKillDO && w.secKillDO.timeKillKeyName && typeof w.secKillDO.timeKillKey != "undefined") {
            if (_g_config.isSpu || (_sku_cfg.itemDO.isOnline && (_sku_cfg.itemDO.isSecondKillFromPC || _sku_cfg.itemDO.isSecondKillFromPCAndWap || (_sku_cfg.detail.timeKillAuction && w.userInfoDO.loginUserType)))) {
                _form_wrapper.set(w.secKillDO.timeKillKeyName, w.secKillDO.timeKillKey)
            }
        }
        if (w.gatewayDO.trade) {
            for (var v in w.gatewayDO.trade.addToBuyNow) {
                _form_wrapper.set(v, w.gatewayDO.trade.addToBuyNow[v])
            }
            delete w.gatewayDO.trade.addToBuyNow
        }
        var y = _sku_cfg.itemDO.quantity || "", x;
        if (w.itemPriceResultDO.promType == 1 && (x = _mods_SKU.getCurrentPromotion()) && x.amountRestriction && x.amountRestriction < y) {
            y = x.amountRestriction
        }
        _form_wrapper.set("allow_quantity", y);
        _form_wrapper.set("quantity", 1, "quantity");
        _form_wrapper.set("skuId", "", "skuId");
        _form_wrapper.set("skuInfo", "", "skuInfo");
        if (w.itemPriceResultDO.promType == 1) {
            _form_wrapper.set("key", _fn_getUrlParams("key"))
        }
        if (!_g_config.isSpu) {
            _form_wrapper.set("activity", _fn_getUrlParams("activity"));
            var AA = _fn_getUrlParams("buytraceid");
            if (AA) {
                _form_wrapper.set("buytraceid", AA)
            }
        }
        _form_wrapper.set("bankfrom", _fn_getUrlParams("bankfrom"));
        _form_wrapper.set("destination", _sku_cfg.destination);
        if (_sku_cfg.tradeType == 1) {
            _form_wrapper.set("item_url_refer", _document.referrer || "OTHER")
        }
        _form_wrapper.set("buyer_from", _g_config.isSpu ? "spu" : _fn_getUrlParams("buyer_from"));
        _form_wrapper.set("item_id_num", _sku_cfg.itemDO.itemId);
        _form_wrapper.set("item_id", _sku_cfg.itemDO.itemId);
        _form_wrapper.set("auction_id", _sku_cfg.itemDO.itemId);
        _form_wrapper.set("seller_rank", "0");
        _form_wrapper.set("seller_rate_sum", "0");
        _form_wrapper.set("is_orginal", "no");
        _form_wrapper.set("point_price", "false");
        _form_wrapper.set("secure_pay", "true");
        _form_wrapper.set("pay_method", "款到发货");
        _form_wrapper.set("from", "item_detail");
        _form_wrapper.set("buy_now", _sku_cfg.itemDO.reservePrice);
        _form_wrapper.set("current_price", _sku_cfg.itemDO.reservePrice);
        _form_wrapper.set("auction_type", _sku_cfg.itemDO.auctionType);
        _form_wrapper.set("seller_num_id", _sku_cfg.itemDO.userId);
        if (!_g_config.isSpu) {
            _form_wrapper.set("activity", "");
            _form_wrapper.set("chargeTypeId", "", "J_ChargeTypeId")
        }
        _form_wrapper.set("_tb_token_", "", "J_TokenField");
        _form_wrapper.rander();
        _kissy_imp.mods.Token.onInited(function () {
            _dom_form_id_J_FrmBid._tb_token_.value = _sku_cfg.valToken
        })
    }
    function _sku_cfg_further() {
        var _get_elem_by_id = function (_id_selector) {
            return _document.getElementById(_id_selector)
        };
        _sku_cfg = _kissy.mix(_sku_cfg || {}, { strPrice: _get_elem_by_id("J_StrPrice"), emStock: _get_elem_by_id("J_EmStock"), linkBuy: _get_elem_by_id("J_LinkBuy"), dlChoice: _get_elem_by_id("J_DlChoice"), frmBid: _get_elem_by_id("J_FrmBid"), valItemInfo: {}, linkAdd: _get_elem_by_id("J_LinkAdd"), apiAddCart: G, valCartInfo: {}, linkBasket: _get_elem_by_id("J_LinkBasket"), divDetail: _get_elem_by_id("detail").parentNode, valExpanded: false, destination: "330100", emPoint: _get_elem_by_id("J_EmPoint"), valPointRate: 0, emPointsBuy: _get_elem_by_id("J_EmPointsBuy"), apiBidCount: G, valLoginUrl: G, valLoginIndicator: G, isDaily: (_g_config.assetsHost.indexOf("taobao.net") != -1), isHouseholdService: 0, varPromotionId: 0, limited: null, valMode: 0 }, false);
        _sku_cfg.valCartInfo.ct = _cookie.get("t");
        _sku_cfg.valCartInfo.statsUrl += "&userid=" + _cookie.get("cookie17");
        if (null !== _sku_cfg.dlChoice) {
            _sku_cfg.valMode += 1;
            _sku_cfg.elmProps = _kissy.query(".J_TSaleProp", "#detail");
            _sku_cfg.divKeyProp = _dom.parent(_sku_cfg.dlChoice, ".tb-key");
            if (_sku_cfg.elmProps.length == 0) {
                _sku_cfg.valMode -= 1
            }
        } else {
            if (_sku_cfg.isMeiz) {
                if (_kissy.get("#J_MeizTry")) {
                    _sku_cfg.divKeyProp = _dom.parent("#J_MeizTry", ".tb-key")
                }
            }
        }
        if (_sku_cfg.linkAdd && G !== _sku_cfg.valCartInfo.itemId) {
            _sku_cfg.valMode += 2
        }
        if (null !== _sku_cfg.emPoint && 0 !== _sku_cfg.valPointRate) {
            _sku_cfg.valMode += 512
        }
        _sku_cfg.isLoadDealRecord = true;
        _sku_cfg.isLimitProm = false;
        _sku_cfg.isSupportCity = true;
        _kissy_imp.mods.Token.init()
    }
    _kissy_imp.mods.Token = { counter: 0, init: function () {
        var S = _sku_cfg.isDaily ? "daily.taobao.net" : "tmall.com";
        var T = "http://www." + (_sku_cfg.isDaily ? "daily.tmall.net" : "tmall.com") + "/go/rgn/tmall/t.php?t=20121104";
        var v = _dom.create('<iframe style="display:none" width="0" onload="TShop.mods.Token.getIfrToken(this)" height="0" src="' + T + '"></iframe>');
        _document.domain = _document.domain.split(".").slice(-2).join(".");
        _body.insertBefore(v, _body.firstChild)
    }, onInited: function (S) {
        if (_kissy.isFunction(S)) {
            if (this.inited) {
                S()
            } else {
                _kissy_imp.on("tokenInited", S)
            }
        }
    }, getIfrToken: function (z) {
        var y = null;
        var T = this;
        var S = function () {
            if (y) {
                clearTimeout(y)
            }
            _sku_cfg.valToken = z.contentWindow.getToken();
            _kissy.log("TMLOG::tbtoken inited =" + _sku_cfg.valToken, "info");
            T.inited = true;
            _kissy_imp.fire("tokenInited")
        };
        try {
            var v = z.contentWindow.getToken();
            S()
        } catch (x) {
            T.counter++;
            if (T.counter < 10) {
                var w = arguments.callee;
                y = setTimeout(function () {
                    w.apply(T, [z])
                }, 50)
            } else {
                _kissy_imp.fire("tokenInited");
                _kissy.sendErr("getToken", { t: _sku_cfg.valCartInfo.ct });
                _kissy.log("tokenInited error:" + x.description, "error")
            }
        }
    } 
    };
    _mods_SKU.init = function (_config) {
        _sku_cfg = _config;
        _sku_cfg_further();
        O();
        _event_target.on(_str_sku_inited_event, function (v) {
            Q(v)
        });
        l();
        _kissy.ready(function (v) {
            _mods_SKU.Promotion.init();
            _kissy_imp.use("malldetail/sku/stat", function (x, w) {
                w.init()
            })
        });
        var _dom_id_J_Stars = _dom.get("#J_Stars");
        if (_dom_id_J_Stars) {
            _malldetail_data_data.onReviewCount(function (v) {
                var x = v.gradeAvg, w = x.split(".").join("d");
                _dom_id_J_Stars.innerHTML = '<p><span class="c-value-no c-value-' + w + '"><em>' + x + "</em></span>" + x + '分<span>(<a href="#" id="J_MallReviewTabTrigger">累计评价<em>' + v.rateTotal + "</em></a>)</span></p>";
                _dom.show("#J_ItemRates");
                _kissy.later(function () {
                    if (_sku_cfg.onReviewClick) {
                        _event.on("#J_MallReviewTabTrigger", "click", function (y) {
                            y.preventDefault();
                            _sku_cfg.onReviewClick();
                            _kissy.sendAtpanel("tmalldetail.12.1")
                        })
                    }
                }, 25)
            })
        }
        if (!_g_config.offlineShop) {
            _window._poc.push(["_trackCustom", "tpl", "S13"])
        }
    };
    _mods_SKU.Setup = { config: function () {
        return _kissy_imp.cfg.apply(this, arguments)
    } 
    }
}, { requires: ["cookie", "malldetail/common/util", "malldetail/data/data", "malldetail/sku/util", "malldetail/sku/fastlogin", "malldetail/sku/buylink", "malldetail/sku/thumbViewer", "malldetail/sku/skuFeatureIcon", "malldetail/sku/sellCount", "malldetail/sku/skuLade", "malldetail/sku/paymethods", "malldetail/sku/skuTmVip", "malldetail/sku/skuAmount", "malldetail/sku/editEntry", "malldetail/sku/freight", "malldetail/sku/stock", "malldetail/sku/basketAnim", "malldetail/sku/shiptime", "malldetail/sku/linkbasket", "malldetail/sku/popupsimulate", "malldetail/sku/promotion", "malldetail/sku/ifclocation", "malldetail/sku/common", "malldetail/sku/propertyHandler", "malldetail/sku/3c", "malldetail/sku/areaSell", "malldetail/sku/price", "malldetail/sku/service", "malldetail/sku/stat", "malldetail/sku/double11"] }); /*pub-1|2013-02-28 21:14:22*/
