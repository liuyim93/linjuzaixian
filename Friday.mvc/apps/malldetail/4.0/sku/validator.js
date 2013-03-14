KISSY.add("malldetail/sku/validator", function (C, J) {
    var L = C.mods.SKU, D = KISSY, N = D.DOM, Q = D.Event, R = "";
    var D = KISSY, N = D.DOM, Q = D.Event, R = "";
    var P, O, F, H = 200;
    var M = function (S) {
        if (S) {
            var T = N.get("#J_Select_region");
            if (T && (T.value == null || T.value == R)) {
                alert("\u8bf7\u9009\u62e9\u5546\u54c1\u5151\u6362\u5730!");
                return false
            }
        }
        return true
    };
    function I() {
        if ((g_config.isEC || g_config.offlineShop) && !P.isHouseholdService) {
            if (!L.dqCity.getOrder()) {
                return false
            }
        }
        return true
    }
    var A = function (S) {
        return I() && M(S)
    };
    var B = function () {
        var V = R;
        var Y = P.valStock;
        var T = parseInt(P.iptAmount.value, 10);
        var S = P.limited;
        var X = D.trim(N.attr(P.iptAmount, "data-type"));
        var W = P.isLimitProm;
        var U = L.inventoryType ? L.inventoryType : P.valItemInfo.type;
        if (S != null && Y > S) {
            if (S < T) {
                V = "\u6bcf\u4eba\u9650\u8d2d" + S + "\u4ef6"
            }
        }
        switch (true) {
            case false === /^\d+$/.test(P.iptAmount.value) || 0 >= T:
                V = "\u8bf7\u586b\u5199\u6b63\u786e\u7684\u5546\u54c1\u6570\u91cf\uff01";
                break;
            case (Y < T) && U != 3:
                V = X === "ju" ? ("\u805a\u5212\u7b97\u7279\u4ef7\u5546\u54c1,\u6bcf\u4eba\u9650\u8d2d" + Y + "\u4ef6") : (W ? "\u60a8\u6240\u586b\u5199\u7684\u5546\u54c1\u6570\u91cf\u8d85\u8fc7\u9650\u8d2d\u6570\u91cf\uff01" : "\u60a8\u6240\u586b\u5199\u7684\u5546\u54c1\u6570\u91cf\u8d85\u8fc7\u5e93\u5b58\uff01");
                break
        }
        if (R !== V) {
            J.show(V);
            return false
        } else {
            J.hide();
            return true
        }
    };
    var K = function (S) {
        if (P.valMode & 1) {
            K = function (T) {
                return G(T) && A(T)
            }
        } else {
            if (null !== P.iptAmount) {
                K = function (T) {
                    var U = A(T);
                    if (!U) {
                        return false
                    }
                    return B() && E()
                }
            } else {
                K = function (T) {
                    return A(T)
                }
            }
        }
        return K(S)
    };
    var G = function (X) {
        X = X || false;
        var U = P.elmProps.length;
        var Y = [], a = [], V;
        var T = L.PropertyHandler.getSeleProp();
        var Z = L.PropertyHandler.getPropData();
        for (V = U - 1; 0 <= V; V--) {
            var S = T[V];
            if (R === S.pvid) {
                N.addClass(Z[V].elmt, "tb-h");
                a.push(S.prop)
            } else {
                N.removeClass(Z[V].elmt, "tb-h");
                Y.unshift(S.prop + ":" + S.name)
            }
        }
        var b = a.length;
        if (!b) {
            L.valSkuInfo = Y.join(";")
        }
        var W = B();
        if (0 < b || !W) {
            if (true === X && (0 < b)) {
                N.addClass(P.divKeyProp, "tb-attention")
            }
            return false
        } else {
            return E() && A(X)
        }
    };
    function E() {
        P = C.cfg();
        var V = L.getCurrentPromotion();
        if (V && V.limitTime) {
            var U = R;
            var S = parseInt(P.iptAmount.value, 10);
            var T = V.amountRestriction || 0;
            if (C.cfg("statu") == "-1") {
                alert("\u6d3b\u52a8\u5df2\u7ecf\u7ed3\u675f\uff0c\u4f60\u53ea\u80fd\u7528\u539f\u4ef7\u8d2d\u4e70\u4e86");
                return false
            }
            if (T > 0 && S > T) {
                U = "\u60a8\u6240\u586b\u5199\u7684\u5546\u54c1\u6570\u91cf\u8d85\u8fc7\u9650\u8d2d\u6570\u91cf\uff01"
            }
            if (R !== U) {
                J.show(U);
                return false
            } else {
                J.hide()
            }
        }
        return true
    }
    return { run: function (S) {
        if (!P && !(P = C.cfg())) {
            return
        }
        return K(S)
    } 
    }
}, { requires: ["malldetail/sku/skuMsg"] }); /*pub-1|2013-01-30 22:24:59*/