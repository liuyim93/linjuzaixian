
KISSY.add("malldetail/sku/sellCount", function (B, C) {
    var A;
    function D(F) {
        if (!F) {
            return
        }
        A = B.cfg();
        if (typeof F.sellCount != "undefined" && F.sellCount != null) {
            var G = F.sellCount;
            B.cfg("valSaleNum", G);
            B.fire("data:saleNum:success", { monTotal: G });
            B.ready(function (I) {
                var J = I.get("#J_listBuyerOnView");
                if (J) {
                    var H = C.attr(J, "detail:params").split(",")[0];
                    if (C.attr(J, "data-checkSoldNum")) {
                        if (G > 0) {
                            H += "&sold_total_num=" + G
                        } else {
                            A.isLoadDealRecord = false
                        }
                    } else {
                        H += "&sold_total_num=" + G
                    }
                    C.attr(J, "detail:params", H)
                }
            });
            var E = C.get(".J_MonSalesNum", "#detail");
            if (E) {
                B.use("malldetail/data/data", function (I, H) {
                    H.onSalesCount(function (J) {
                        E.innerHTML = J.monTotal;
                        C.show(".J_MonSales")
                    })
                })
            }
        }
    }
    return { init: D }
}, { requires: ["dom"] }); /*pub-1|2013-01-06 16:13:22*/