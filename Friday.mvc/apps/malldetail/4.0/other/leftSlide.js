KISSY.add("malldetail/other/leftSlide", function (D, E, B, A) {
    var C = window.g_config;
    var G = function (H, I) {
        var J = H.dsrMoreInfo;
        if (E.get("#J_shopList")) {
            D.each(D.query("#J_shopList .list"), function (P, L) {
                if (J[L]) {
                    var N = (J[L].gradeAvg + "").length > 3 ? (J[L].gradeAvg + "").substr(0, 3) : (J[L].gradeAvg + "");
                    var M = E.get(".c-value-no", P);
                    M.className = "c-value-no c-value-" + ((N + "").split(".").join("d"));
                    M.children[0].innerHTML = N;
                    var O = E.get(".spuDsr-count", P);
                    O.innerHTML = N + "\u5206(<a href='#J_Reviews' class='J_FocusReviews'>\u7d2f\u8ba1\u8bc4\u4ef7" + J[L].rateTotal + "</a>)";
                    if (I.onReviewClick) {
                        var K = E.get(".J_FocusReviews", O);
                        B.on(K, "click", function (Q) {
                            Q.preventDefault();
                            I.onReviewClick()
                        })
                    }
                }
            })
        } else {
            D.each(E.query("#J_spuShopList .shop-box"), function (N, K) {
                if (J[K]) {
                    var M = (J[K].gradeAvg + "").length > 3 ? (J[K].gradeAvg + "").substr(0, 3) : (J[K].gradeAvg + "");
                    if (K == 0) {
                        E.get("a", N).innerHTML = '<span class="c-value-no c-value-' + ((M + "").split(".").join("d")) + ' "><em>' + J[K].gradeAvg + "\u5206</em></span>";
                        E.get(".spuDsr-count", N).innerHTML = M + "\u5206"
                    } else {
                        var L = E.get(".c-value-no", N);
                        L.className = "c-value-no c-value-" + ((M + "").split(".").join("d"));
                        L.children[0].innerHTML = M;
                        E.get(".spuDsr-count", N).innerHTML = M + "\u5206"
                    }
                }
            })
        }
    };

    function F(I) {
        if (!C.isSpu || E.get("#J_spuShopList") == null) {
            return false
        }
        var H = E.attr("#J_spuShopList", "dsr-url");
        A({
            url: H,
            data: {},
            dataType: "jsonp",
            jsonpCallback: "spuDsrLoad",
            success: function (J) {
                G(J, I)
            }
        });
        if (D.cfg("detail").rateEnable) {
            D.use("malldetail/data/data", function (K, J) {
                J.onReviewCount(function () {
                    if (K.cfg("isMeiz")) {
                        E.show("#J_spuShopList .bts-grade")
                    } else {
                        E.show("#J_shopList .good_com_num")
                    }
                })
            })
        }
    }
    return {
        init: function (H) {
            F(H)
        },
        initRelative: function (H) {
            D.use("malldetail/recommend/a", function (J, I) {
                I.relativeCommendInit(H.itemDO.categoryId, H.itemDO.brandId, H.loginUserId, H.itemDO.spuId)
            })
        }
    }
}, {
    requires: ["dom", "event", "ajax"]
}); 