
KISSY.add("malldetail/sku/stat", function (E, I, H, B) {
    var D, F, A, G, C = "";
    return { init: function () {
        var J = this;
        if (!(D = E.cfg()) || !(G = D.itemDO.itemId)) {
            return
        }
        E.later(function () {
            if (D.apiItemCollects && (F = I.get("#J_CollectCount"))) {
                B.jsonp(E.addTimeStamp(D.apiItemCollects), J.setCollectCount)
            }
            if (D.apiBidCount && (A = I.get("#J_BidRecord"))) {
                B.jsonp(E.addTimeStamp(D.apiBidCount), J.setBidCount)
            }
            if (E.isBid()) {
                if (D.apiItemViews) {
                    E.use("ajax", function (L, K) {
                        K.jsonp(D.apiItemViews, function (M) {
                            I.html("#J_EmItemViews", M["ICVT_7_" + window.g_config.itemId])
                        })
                    })
                }
            }
        });
        H.on("#J_ReviewTabTrigger", "click", function () {
            //E.sendAtpanel("jsclick", { auc_detail: "b_already_feedback" })
        });
        H.on("#J_ScrollToTabBar", "click", function () {
            //E.sendAtpanel("jsclick", { auc_detail: "c_read_security" })
        })
    }, setCollectCount: function (K) {
        var J;
        if (K) {
            J = parseInt(K["ICCP_1_" + G], 10);
            if (J > 0 && J < 1000000) {
                F.innerHTML = J;
                I.css(F.parentNode, "display", C)
            }
        }
    }, setBidCount: function (J) {
        J = J || 0;
        E.each(I.query("em.J_BidCount", document), function (K) {
            K.innerHTML = J
        })
    } 
    }
}, { requires: ["dom", "event", "ajax"] }); /*pub-1|2013-02-28 21:14:24*/