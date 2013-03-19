/*pub-1|2013-01-06 16:13:22*/
KISSY.add("malldetail/tabbar/sellerinfo", function (C) {
    var D = KISSY,
		J = D.DOM,
		H = D.Event,
		B = "TShop.mods.SellerInfo.callback",
		E = "selected",
		A;
    var K = false;

    function I() {
        if (!K && (A = D.get("#J_SellerInfo"))) {
            K = true;
            G()
        }
    }
    function G() {
        if (!K) {
            return I()
        }
        var L = J.attr(A, "data-url");
        if (L) {
            D.use("ajax", function (N, M) {
                M = M || N.io;
                M({
                    url: L,
                    dataType: "jsonp",
                    jsonpCallback: "jsonpSellerInfo",
                    success: function (P) {
                        A.innerHTML += P[0];
                        var O = N.query("#J_sellerRateInfo .J_RateInfoTrigger");
                        H.on(O, "mouseover", function () {
                            J.removeClass(O, E);
                            J.addClass(this, E)
                        });
                        if (C.mods.TabBar && C.mods.TabBar.curIndex() == "description") {
                            C.sendAcAtpanel("tmalldetail.4.3")
                        }
                    }
                })
            })
        }
    }
    var F = {
        init: I,
        load: G
    };
    C.mods.SellerInfo = F
});