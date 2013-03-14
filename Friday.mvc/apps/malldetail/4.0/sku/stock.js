KISSY.add("malldetail/sku/stock", function (E, Y, I) {
    var J = E.mods.SKU;
    var F = KISSY, V = F.DOM, Z = F.Event;
    var D;
    var H, M = true, G = true, L;
    var R, A = false;
    var W;
    var Q;
    var O = { "1": { errMsg: "\u6b64\u5546\u54c1\u6682\u65f6\u7f3a\u8d27" }, "2": { stock: "\u5e93\u5b58\u5145\u8db3", errMsg: "\u6b64\u533a\u57df\u6682\u65f6\u7f3a\u8d27\uff0c\u8bf7\u67e5\u770b\u5176\u4ed6\u533a\u57df" }, "3": { stock: 0, errMsg: "\u6709\u4eba\u8fd8\u672a\u4ed8\u6b3e\uff0c\u82e515\u5206\u949f\u540e\u4ecd\u672a\u4ed8\u6b3e\uff0c\u60a8\u5c06\u6709\u8d2d\u4e70\u673a\u4f1a"} };
    function B(S) {
        E.cfg("valStock", S)
    }
    function U(d, a) {
        var T = (typeof d) == "number" ? "default" : "diy";
        var a = a || "";
        var S = { "default": "(\u5e93\u5b58{{str}}\u4ef6)", diy: '<span class="{{className}}">{{str}}</span>' };
        var b = { str: d, className: a };
        var c = Y(S[T]).render(b);
        if (!F.isUndefined(L) && E.cfg("valStock") > L) {
            E.cfg("limited", L);
            if (L > 0) {
                c = c.replace(")", ",\u9650\u8d2d" + L + "\u4ef6)");
                c = c.replace("\u5e93\u5b58\u5145\u8db3", "(\u5e93\u5b58\u5145\u8db3,\u9650\u8d2d" + L + "\u4ef6)")
            }
        }
        D.innerHTML = c
    }
    function P(a, S) {
        if (!D) {
            return
        }
        if (S == 3) {
            if (!R) {
                var T = V.parent(W.linkBuy, 2);
                R = V.create('<span class="ui-btn-l-primary ui-btn-disable">\u8fd8\u6709\u673a\u4f1a</span>');
                V.append(R, T)
            }
            if (!A) {
                J.LinkBuy.statu("chaoMai", "hide");
                J.LinkBasket.statu("chaoMai", "hide");
                J.LinkAdd.statu("chaoMai", "hide");
                V.show(R)
            }
            A = true
        } else {
            if (A) {
                V.hide(R);
                J.LinkBuy.statu("chaoMai", "show");
                J.LinkBasket.statu("chaoMai", "show");
                J.LinkAdd.statu("chaoMai", "show")
            }
            A = false
        }
        if (a == 0) {
            M = false;
            I.show(O[S]["errMsg"], "stop", "stock");
            V.hide(W.emStock);
            J.LinkBuy.statu("stock", "disabled");
            J.LinkBasket.statu("stock", "disabled");
            J.LinkAdd.statu("stock", "hide")
        } else {
            M = true;
            I.hide("stock");
            V.show(W.emStock);
            J.LinkBuy.statu("stock", "enabled");
            J.LinkBasket.statu("stock", "enabled");
            J.LinkAdd.statu("stock", "show");
            if (S == 2 && G) {
                U(a)
            }
        }
        if (S > 0 && (S != 2 || !G)) {
            if (typeof O[S]["stock"] != "undefined") {
                U(O[S]["stock"])
            } else {
                U(a)
            }
        }
    }
    function X() {
        var b;
        var S = J.selectSkuId;
        var T = C();
        if (S) {
            var a = H.skuQuantity[S];
            if (a) {
                b = a.quantity;
                B(b);
                P(b, T)
            }
        } else {
            b = H.icTotalQuantity;
            B(b);
            P(b, T)
        }
        F.use("malldetail/sku/price", function (d, c) {
            c.limitBuy()
        })
    }
    function C() {
        var a;
        var S = J.selectSkuId;
        if (S) {
            var T = W.valItemInfo.skuQuantity;
            if (T[S]) {
                a = T[S]["type"]
            }
        } else {
            a = W.valItemInfo["type"]
        }
        if (typeof a == "undefined") {
            a = 0
        }
        return a
    }
    function K() {
        if (!W) {
            W = E.cfg()
        }
        if (!M) {
            var S = C();
            J.Msg.show(O[S]["errMsg"], "stop", "stock");
            V.hide(W.emStock);
            J.LinkBuy.statu("stock", "disabled");
            J.LinkBasket.statu("stock", "disabled");
            J.LinkAdd.statu("stock", "hide")
        }
        return M
    }
    function N(b) {
        var T = b.inventoryDO, S = b.soldAreaDO, a = J.getCurrentPromotion();
        if (a) {
            T = T ? T : {}
        }
        if (typeof T == "undefined") {
            H = {};
            return
        }
        T.skuQuantity = T.skuQuantity || {};
        W = E.cfg();
        F.each(W.valItemInfo.skuMap, function (c) {
            if (T.skuQuantity[c.skuId]) {
                c.stock = T.skuQuantity[c.skuId].quantity
            }
        });
        D = W.emStock;
        H = T;
        if (!Q) {
            G = S ? S.allAreaSold : true;
            if (a && a.amountRestriction) {
                L = a.amountRestriction
            }
        }
        X();
        if (!Q) {
            Q = 1;
            J.PropertyHandler.onSkuChange(function () {
                var c = J.selectSkuId;
                if (c && W.isSupportCity) {
                    X()
                }
            })
        }
    }
    return { init: N, getStockStatus: K, rander: U }
}, { requires: ["template", "malldetail/sku/skuMsg"] }); /*pub-1|2013-01-06 16:13:19*/