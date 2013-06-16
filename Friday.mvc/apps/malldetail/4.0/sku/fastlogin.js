KISSY.add("malldetail/sku/fastlogin", function (_kissy_D, _cookie) {
    var _mods_SKU = _kissy_D.mods.SKU, _dom = _kissy_D.DOM, _event = _kissy_D.Event;
    var _window = window, _g_config = _window.g_config;
    var _cfg = {},
        K = (_g_config.assetsHost.indexOf("taobao.net") != -1),
        M = K ? "daily.tmall.net" : "tmall.com",
        G = K ? "daily.taobao.net" : "taobao.com",
        A = K ? "http://wt.daily.taobao.net" : "http://wt.taobao.com",
        X = "",
        _eventTarget = _kissy_D.merge({}, _kissy_D.EventTarget),
        _STR_BeforeSubmit = "beforeSubmit";
    var Q = function (Y, a) {
        var S = Y.length, d = [];
        for (var b = 0; b < S; b++) {
            var Z = Y[b];
            var c = a[Y[b]].value;
            d.push(Z + ":" + c)
        }
        return d.join(",")
    };
    var B = function () {
        var Y = _cfg.frmBid, Z = "", S = "";
        if (!Y) {
            return
        }
        var a = Q(["item_id_num", "skuId", "quantity"], Y);
        Z = "&state=" + a;
        S = Y.action + Z;
        return S
    };
    var P = function () {
        var S = B();
        location.href = S
    };
    var I = function () {
        var _frmBid = _cfg.frmBid;
        if (_g_config.offlineShop && _frmBid.buy_param) {
            _window.location.href = _frmBid.action + "?buyer_from=ifc0001&buy_param=" + _frmBid.buy_param.value
        } else {
            if (_cfg.tradeType == 4) {
                P()
            } else {
                if (_cfg.isWTContract) {
                    if (_dom.get("#J_WTSkuId", _frmBid) && _dom.get("#J_WTSkuPrice", _frmBid)) {
                        _window.location.href = A + "/select_plan.html?item_id=" + _cfg.itemDO.itemId + "&sku_id=" + _frmBid.wt_skuId.value + "&step=contract%2Ccombo%2Cnumber&buy_select_price=" + _frmBid.wt_skuPrice.value + "&from=tmall"
                    } else {
                        _frmBid.submit()
                    }
                } else {
                    _frmBid.submit()
                }
            }
        }
    };
    var J = function (Y) {
        var _frmBid = _cfg.frmBid;
        var Y = Y || {};
        if (Y.fastBuy) {
            _frmBid.action = _cfg.url["buyBase"] + "/fastbuy/fast_buy.htm";
            I()
        } else {
            if (_cfg.isWTContract) {
                if (_dom.get("#J_WTSkuId", _frmBid) && _dom.get("#J_WTSkuPrice", _frmBid)) {
                    location.href = A + "/select_plan.html?item_id=" + _cfg.itemDO.itemId + "&sku_id=" + _frmBid.wt_skuId.value + "&step=contract%2Ccombo%2Cnumber&buy_select_price=" + _frmBid.wt_skuPrice.value + "&from=tmall&full_redirect=true";
                    return
                }
            }
            if (_frmBid.etm && _frmBid.etm.value == "") {
                _frmBid.action = _cfg.tradeConfig[1]
            } else {
                _frmBid.action = _cfg.tradeConfig[_cfg.tradeType]
            }
            I()
        }
    };
    function U(S, Z, Y) {
        Y = Y || _cfg.frmBid;
        if (Y[S]) {
            Y[S].value = Z
        } else {
            Y.innerHTML += '<input type="hidden" name="' + S + '" value="' + Z + '">'
        }
    }
    function O() {
        var Y = _cfg.frmBid;
        var Z = _mods_SKU.cardManager;
        Y.action = _cfg.tradeConfig[3];
        Y.buyer_from.value = "ifc0001";
        if (Z.isIn()) {
            var S = MFP.LoginPopup;
            S.oncallback(function () {
                I()
            });
            S.check({ cardPSW: true })
        } else {
            Z.begin("#J_LinkBuy");
            Z.onCardIn(function () {
                var a = MFP.LoginPopup;
                a.oncallback(function () {
                    I()
                });
                a.check({ cardPSW: true })
            })
        }
    }
    function _buglogin(a, _fastbuy_cfg_t) {
        //var _buy_url = "http://buy." + M + "/login/buy.do?from=itemDetail&var=login_indicator&id=" + _cfg.itemDO.itemId + "&shop_id=" + _cfg.rstShopId + "&cart_ids=";
        var _buy_url = "http://localhost:7525/Account/Home/buy_do/?from=itemDetail&var=login_indicator&id=" + _cfg.itemDO.itemId + "&shop_id=" + _cfg.rstShopId + "&cart_ids=";
        var _fastbuy_cfg = _kissy_D.mix({ fastbuy: true }, _fastbuy_cfg_t);
        var _frmBid = _cfg.frmBid;
        _cookie.remove("cookie2", "");
            debugger

        _kissy_D.getScript(_buy_url + "&t=" + _kissy_D.now(), { success: function () {
            var _login_indicator = _window.login_indicator;
            var _linkBuy = _cfg.linkBuy;
            var h = (_linkBuy) ? _dom.attr(_linkBuy, "data-noFastBuy") : false;
            if (_login_indicator.success && _login_indicator.token && _login_indicator.token.length > 0) {
                var e = _login_indicator.token, d;
                for (var c = 0, b = e.length; c < b; c++) {
                    if (!_dom.get("#J_" + e[c][0])) {
                        d = _dom.create('<input id="J_' + e[c][0] + '" type="hidden" name="' + e[c][0] + '">');
                        _frmBid.appendChild(d)
                    } else {
                        d = _dom.get("#J_" + e[c][0])
                    }
                    d.value = e[c][1]
                }
            }
            _login_indicator.fastBuy = _login_indicator.fastBuy && _fastbuy_cfg.fastbuy;
            if ((_login_indicator.success && _login_indicator.hasLoggedIn) || !_login_indicator.success) {
                a()
            } else {
                if (!_login_indicator.hasLoggedIn) {
                    if (_login_indicator.fastBuy) {
                        a(_login_indicator)
                    } else {
                        _kissy_D.onLogin(function () {
                            a()
                        }, { check: false })
                    }
                }
            }
        }, error: function () {
            a({ hasLoggedIn: true, success: false, fastBuy: false })
        }, timeout: 10, charset: "gbk"
        })
    }
    return _mods_SKU.FastLogin = { init: function () {
        if (!(_cfg = _kissy_D.cfg())) {
            return
        }
    }, onBeforeSubmit: function (S) {
        if (_kissy_D.isFunction(S)) {
            _eventTarget.on(_STR_BeforeSubmit, S)
        }
    }, checkLogin: function (b) {
        var _frmBid = _cfg.frmBid;
        var _linkBuy = _cfg.linkBuy;
        var _data_noFastBuy = (_linkBuy) ? _dom.attr(_linkBuy, "data-noFastBuy") : false;
        var _is_fastbuy = (!_data_noFastBuy && _g_config.offlineShop != "1" && _cfg.tradeType != 2);
        _eventTarget.fire(_STR_BeforeSubmit, { frmBid: _cfg.frmBid });
        if (_cfg.tradeType == 2 && !_cfg.isHouseholdService && !_mods_SKU.dqCity.getOrder()) {
            return
        }
        if (_g_config.offlineShop) {
            return O()
        }
        if (!_kissy_D.isFunction(b)) {
            b = J
        }
        _buglogin(b, { fastbuy: _is_fastbuy })
    }, buylogin: function (Y, S) {
        return _buglogin(Y, S)
    } 
    }
}, { requires: ["cookie"] }); /*pub-1|2013-02-28 21:14:22*/