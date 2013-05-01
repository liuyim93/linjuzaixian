KISSY.add("malldetail/other/leftSlide", function (_kissy_D, _dom, _event, _ajax) {
    var _g_config = window.g_config;
    var G = function (H, I) {
        var J = H.dsrMoreInfo;
        if (_dom.get("#J_shopList")) {
            _kissy_D.each(_kissy_D.query("#J_shopList .list"), function (P, L) {
                if (J[L]) {
                    var N = (J[L].gradeAvg + "").length > 3 ? (J[L].gradeAvg + "").substr(0, 3) : (J[L].gradeAvg + "");
                    var M = _dom.get(".c-value-no", P);
                    M.className = "c-value-no c-value-" + ((N + "").split(".").join("d"));
                    M.children[0].innerHTML = N;
                    var O = _dom.get(".spuDsr-count", P);
                    O.innerHTML = N + "分(<a href='#J_Reviews' class='J_FocusReviews'>累计评价" + J[L].rateTotal + "</a>)";
                    if (I.onReviewClick) {
                        var K = _dom.get(".J_FocusReviews", O);
                        _event.on(K, "click", function (Q) {
                            Q.preventDefault();
                            I.onReviewClick()
                        })
                    }
                }
            })
        } else {
            _kissy_D.each(_dom.query("#J_spuShopList .shop-box"), function (N, K) {
                if (J[K]) {
                    var M = (J[K].gradeAvg + "").length > 3 ? (J[K].gradeAvg + "").substr(0, 3) : (J[K].gradeAvg + "");
                    if (K == 0) {
                        _dom.get("a", N).innerHTML = '<span class="c-value-no c-value-' + ((M + "").split(".").join("d")) + ' "><em>' + J[K].gradeAvg + "\u5206</em></span>";
                        _dom.get(".spuDsr-count", N).innerHTML = M + "\u5206"
                    } else {
                        var L = _dom.get(".c-value-no", N);
                        L.className = "c-value-no c-value-" + ((M + "").split(".").join("d"));
                        L.children[0].innerHTML = M;
                        _dom.get(".spuDsr-count", N).innerHTML = M + "\u5206"
                    }
                }
            })
        }
    };

    function _init(_leftSlide_cfg) {
        if (!_g_config.isSpu || _dom.get("#J_spuShopList") == null) {
            return false
        }
        var H = _dom.attr("#J_spuShopList", "dsr-url");
        _ajax({
            url: H,
            data: {},
            dataType: "jsonp",
            jsonpCallback: "spuDsrLoad",
            success: function (J) {
                G(J, _leftSlide_cfg)
            }
        });
        if (_kissy_D.cfg("detail").rateEnable) {
            _kissy_D.use("malldetail/data/data", function (_kissy_K, _malldetail_data_data) {
                _malldetail_data_data.onReviewCount(function () {
                    if (_kissy_K.cfg("isMeiz")) {
                        _dom.show("#J_spuShopList .bts-grade")
                    } else {
                        _dom.show("#J_shopList .good_com_num")
                    }
                })
            })
        }
    }
    return {
        init: function (_leftSlide_cfg) {
            _init(_leftSlide_cfg)
        },
        initRelative: function (H) {
            _kissy_D.use("malldetail/recommend/a", function (J, I) {
                I.relativeCommendInit(H.itemDO.categoryId, H.itemDO.brandId, H.loginUserId, H.itemDO.spuId)
            })
        }
    }
}, {
    requires: ["dom", "event", "ajax"]
}); 