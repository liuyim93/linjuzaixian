/*pub-1|2013-02-28 11:34:51*/
KISSY.add("malldetail/external/xCrossIframe", function (A) {
    return {
        init: function () {
            var C = function () {
                var I = location.hostname.split("."),
					H = I.length;
                //return I.slice(H - 2).join(".")
                return location.hostname
            };
            //document.domain = C();

            function D(K) {
                var I = location.href;
                var J = new RegExp("(\\?|&)" + K + "=([^&]+)(&|$)");
                var H = I.match(J);
                return H ? H[2] : ""
            }
            if (D("isTmallLogin")) {
                function B(H) {
                    if (window.console && (typeof console.log === "function")) {
                        console.log(H)
                    }
                }
                var G = D("callback");
                if (G) {
                    try {
                        parent.window[G]()
                    } catch (E) {
                        B(E)
                    }
                }
            } else {
                if (D("type")) {
                    switch (D("type")) {
                        case "fastBuy":
                            parent.document.getElementById("J_LoginPopup").style.display = "none";
                            parent.document.getElementById("J_FrmBid").submit();
                            break;
                        case "closeLogin":
                            parent.document.getElementById("J_LoginPopup").style.display = "none";
                            parent.TB.Report.showPop();
                            break;
                        case "buyMedical":
                            parent.document.getElementById("J_LoginPopup").style.display = "none";
                            try {
                                parent.TShop.mods.SKU.FastLogin.checkLogin()
                            } catch (E) { }
                            break;
                        case "minilogin":
                            var F = D("callback");
                            try {
                                parent.window[F]();
                                delete parent.window[F]
                            } catch (E) { }
                            break
                    }
                } else {
                    if (D("closeLogin")) {
                        parent.document.getElementById("J_LoginPopup").style.display = "none";
                        parent.TB.Report.showPop()
                    } else {
                        if (D("closeDingYue")) {
                            parent.TB.app.popDialog.hide()
                        } else {
                            if (D("fastBuy")) {
                                parent.document.getElementById("J_LoginPopup").style.display = "none";
                                parent.document.getElementById("J_FrmBid").submit()
                            } else {
                                A.ready(function () {
                                    TMall.XDomain.doAgent()
                                })
                            }
                        }
                    }
                }
            }
        }
    }
});