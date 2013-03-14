
KISSY.add("malldetail/sku/shiptime", function (B, J, H) {
    var D;
    var L = null;
    var F = null;
    var C = false;
    var A = function (O) {
        var M = false;
        if (O) {
            for (var N in O) {
                if (O[N]["shipTime"]) {
                    M = true;
                    break
                }
            }
        }
        return M
    };
    var E = function () {
        var M = J.parent("#J_Amount");
        if (M) {
            L = J.create('<ul class="tb-meta tb-clear tb-hidden"><li><span class="tb-metatit">\u53d1\u8d27\u65f6\u95f4</span><span id="J_ShipTime"></span></li></ul>');
            J.insertBefore(L, M);
            F = J.get("#J_ShipTime")
        }
    };
    var K = function () {
        if (!C) {
            J.removeClass(L, "tb-hidden");
            C = true
        }
    };
    var G = function () {
        if (C) {
            J.addClass(L, "tb-hidden");
            C = false
        }
    };
    var I = function (N) {
        var M = N.skuId;
        if (D[N.skuFlag] && D[N.skuFlag]["shipTime"]) {
            K();
            F.innerHTML = D[N.skuFlag]["shipTime"]
        } else {
            G()
        }
    };
    return { init: function () {
        D = B.cfg("valItemInfo").skuMap;
        if (A(D)) {
            E();
            B.mods.SKU.PropertyHandler.onSkuChange(function (M) {
                I(M)
            })
        }
    } 
    }
}, { requires: ["dom", "event", "malldetail/sku/propertyHandler"] }); /*pub-1|2013-02-28 21:14:21*/