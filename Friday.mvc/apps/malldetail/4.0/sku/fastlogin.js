KISSY.add("malldetail/sku/fastlogin", function (_kissy_D, _cookie) {
    var _mods_SKU = _kissy_D.mods.SKU, _dom = _kissy_D.DOM, _event = _kissy_D.Event;
    var _window = window, _g_config = _window.g_config;
    var _cfg = {},
        K = (_g_config.assetsHost.indexOf("taobao.net") != -1),
        M = K ? "daily.tmall.net" : "tmall.com",
        G = K ? "daily.taobao.net" : "taobao.com",
        A = K ? "http://wt.daily.taobao.net" : "http://wt.taobao.com",
        X = "",
        L = _kissy_D.merge({}, _kissy_D.EventTarget),
        F = "beforeSubmit";
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
        var S = _cfg.frmBid;
        if (_g_config.offlineShop && S.buy_param) {
            _window.location.href = S.action + "?buyer_from=ifc0001&buy_param=" + S.buy_param.value
        } else {
            if (_cfg.tradeType == 4) {
                P()
            } else {
                if (_cfg.isWTContract) {
                    if (_dom.get("#J_WTSkuId", S) && _dom.get("#J_WTSkuPrice", S)) {
                        _window.location.href = A + "/select_plan.html?item_id=" + _cfg.itemDO.itemId + "&sku_id=" + S.wt_skuId.value + "&step=contract%2Ccombo%2Cnumber&buy_select_price=" + S.wt_skuPrice.value + "&from=tmall"
                    } else {
                        S.submit()
                    }
                } else {
                    S.submit()
                }
            }
        }
    };
    var J = function (Y) {
        var S = _cfg.frmBid;
        var Y = Y || {};
        if (Y.fastBuy) {
            S.action = _cfg.url["buyBase"] + "/fastbuy/fast_buy.htm";
            I()
        } else {
            if (_cfg.isWTContract) {
                if (_dom.get("#J_WTSkuId", S) && _dom.get("#J_WTSkuPrice", S)) {
                    location.href = A + "/select_plan.html?item_id=" + _cfg.itemDO.itemId + "&sku_id=" + S.wt_skuId.value + "&step=contract%2Ccombo%2Cnumber&buy_select_price=" + S.wt_skuPrice.value + "&from=tmall&full_redirect=true";
                    return
                }
            }
            if (S.etm && S.etm.value == "") {
                S.action = _cfg.tradeConfig[1]
            } else {
                S.action = _cfg.tradeConfig[_cfg.tradeType]
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
    function _buglogin(a, S) {
        var Z = "http://buy." + M + "/login/buy.do?from=itemDetail&var=login_indicator&id=" + _cfg.itemDO.itemId + "&shop_id=" + _cfg.rstShopId + "&cart_ids=";
        var S = _kissy_D.mix({ fastbuy: true }, S);
        var Y = _cfg.frmBid;
        _cookie.remove("cookie2", "");
        _kissy_D.getScript(Z + "&t=" + _kissy_D.now(), { success: function () {
            var g = _window.login_indicator;
            var f = _cfg.linkBuy;
            var h = (f) ? _dom.attr(f, "data-noFastBuy") : false;
            if (g.success && g.token && g.token.length > 0) {
                var e = g.token, d;
                for (var c = 0, b = e.length; c < b; c++) {
                    if (!_dom.get("#J_" + e[c][0])) {
                        d = _dom.create('<input id="J_' + e[c][0] + '" type="hidden" name="' + e[c][0] + '">');
                        Y.appendChild(d)
                    } else {
                        d = _dom.get("#J_" + e[c][0])
                    }
                    d.value = e[c][1]
                }
            }
            g.fastBuy = g.fastBuy && S.fastbuy;
            if ((g.success && g.hasLoggedIn) || !g.success) {
                a()
            } else {
                if (!g.hasLoggedIn) {
                    if (g.fastBuy) {
                        a(g)
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
            L.on(F, S)
        }
    }, checkLogin: function (b) {
        var S = _cfg.frmBid;
        var Z = _cfg.linkBuy;
        var Z = _cfg.linkBuy;
        var a = (Z) ? _dom.attr(Z, "data-noFastBuy") : false;
        var Y = (!a && _g_config.offlineShop != "1" && _cfg.tradeType != 2);
        L.fire(F, { frmBid: _cfg.frmBid });
        if (_cfg.tradeType == 2 && !_cfg.isHouseholdService && !_mods_SKU.dqCity.getOrder()) {
            return
        }
        if (_g_config.offlineShop) {
            return O()
        }
        if (!_kissy_D.isFunction(b)) {
            b = J
        }
        _buglogin(b, { fastbuy: Y })
    }, buylogin: function (Y, S) {
        return _buglogin(Y, S)
    } 
    }
}, { requires: ["cookie"] }); /*pub-1|2013-02-28 21:14:22*/