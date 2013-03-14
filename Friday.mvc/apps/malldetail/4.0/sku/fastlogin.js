KISSY.add("malldetail/sku/fastlogin", function (D, H) {
    var N = D.mods.SKU, T = D.DOM, W = D.Event;
    var C = window, E = C.g_config;
    var V = {}, K = (E.assetsHost.indexOf("taobao.net") != -1), M = K ? "daily.tmall.net" : "tmall.com", G = K ? "daily.taobao.net" : "taobao.com", A = K ? "http://wt.daily.taobao.net" : "http://wt.taobao.com", X = "", L = D.merge({}, D.EventTarget), F = "beforeSubmit";
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
        var Y = V.frmBid, Z = "", S = "";
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
        var S = V.frmBid;
        if (E.offlineShop && S.buy_param) {
            C.location.href = S.action + "?buyer_from=ifc0001&buy_param=" + S.buy_param.value
        } else {
            if (V.tradeType == 4) {
                P()
            } else {
                if (V.isWTContract) {
                    if (T.get("#J_WTSkuId", S) && T.get("#J_WTSkuPrice", S)) {
                        C.location.href = A + "/select_plan.html?item_id=" + V.itemDO.itemId + "&sku_id=" + S.wt_skuId.value + "&step=contract%2Ccombo%2Cnumber&buy_select_price=" + S.wt_skuPrice.value + "&from=tmall"
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
        var S = V.frmBid;
        var Y = Y || {};
        if (Y.fastBuy) {
            S.action = V.url["buyBase"] + "/fastbuy/fast_buy.htm";
            I()
        } else {
            if (V.isWTContract) {
                if (T.get("#J_WTSkuId", S) && T.get("#J_WTSkuPrice", S)) {
                    location.href = A + "/select_plan.html?item_id=" + V.itemDO.itemId + "&sku_id=" + S.wt_skuId.value + "&step=contract%2Ccombo%2Cnumber&buy_select_price=" + S.wt_skuPrice.value + "&from=tmall&full_redirect=true";
                    return
                }
            }
            if (S.etm && S.etm.value == "") {
                S.action = V.tradeConfig[1]
            } else {
                S.action = V.tradeConfig[V.tradeType]
            }
            I()
        }
    };
    function U(S, Z, Y) {
        Y = Y || V.frmBid;
        if (Y[S]) {
            Y[S].value = Z
        } else {
            Y.innerHTML += '<input type="hidden" name="' + S + '" value="' + Z + '">'
        }
    }
    function O() {
        var Y = V.frmBid;
        var Z = N.cardManager;
        Y.action = V.tradeConfig[3];
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
    function R(a, S) {
        var Z = "http://buy." + M + "/login/buy.do?from=itemDetail&var=login_indicator&id=" + V.itemDO.itemId + "&shop_id=" + V.rstShopId + "&cart_ids=";
        var S = D.mix({ fastbuy: true }, S);
        var Y = V.frmBid;
        H.remove("cookie2", "");
        D.getScript(Z + "&t=" + D.now(), { success: function () {
            var g = C.login_indicator;
            var f = V.linkBuy;
            var h = (f) ? T.attr(f, "data-noFastBuy") : false;
            if (g.success && g.token && g.token.length > 0) {
                var e = g.token, d;
                for (var c = 0, b = e.length; c < b; c++) {
                    if (!T.get("#J_" + e[c][0])) {
                        d = T.create('<input id="J_' + e[c][0] + '" type="hidden" name="' + e[c][0] + '">');
                        Y.appendChild(d)
                    } else {
                        d = T.get("#J_" + e[c][0])
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
                        D.onLogin(function () {
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
    return N.FastLogin = { init: function () {
        if (!(V = D.cfg())) {
            return
        }
    }, onBeforeSubmit: function (S) {
        if (D.isFunction(S)) {
            L.on(F, S)
        }
    }, checkLogin: function (b) {
        var S = V.frmBid;
        var Z = V.linkBuy;
        var Z = V.linkBuy;
        var a = (Z) ? T.attr(Z, "data-noFastBuy") : false;
        var Y = (!a && E.offlineShop != "1" && V.tradeType != 2);
        L.fire(F, { frmBid: V.frmBid });
        if (V.tradeType == 2 && !V.isHouseholdService && !N.dqCity.getOrder()) {
            return
        }
        if (E.offlineShop) {
            return O()
        }
        if (!D.isFunction(b)) {
            b = J
        }
        R(b, { fastbuy: Y })
    }, buylogin: function (Y, S) {
        return R(Y, S)
    } 
    }
}, { requires: ["cookie"] }); /*pub-1|2013-02-28 21:14:22*/