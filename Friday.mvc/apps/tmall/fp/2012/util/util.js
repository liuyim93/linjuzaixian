KISSY.add("2012/util/util", function (C) {
    var F = window;
    var C = KISSY,
		E = C.DOM,
		B = C.Event;
    var A = {};
    var D;
    A.getToken = function (H) {
        if (typeof H !== "function") {
            return
        }
        var G = "http://www." + (~location.host.indexOf("tmall.net") ? "daily.tmall.net" : "tmall.com") + "/go/rgn/mfp2012/token.php";
        if (!(F._tb_token_ && D)) {
            D = E.create("<iframe>");
            D.src = G + "?t=" + +new Date;
            D.style.display = "none";
            if (D.attachEvent) {
                D.attachEvent("onload", function () {
                    F._tb_token_ = F._tb_token_ || D.contentWindow.getToken();
                    H()
                })
            } else {
                D.onload = function () {
                    F._tb_token_ = F._tb_token_ || D.contentWindow.getToken();
                    H()
                }
            }
            E.append(D, "body")
        } else {
            H()
        }
    };
    A.randomImgUrl = function (K, G) {
        var H = 0,
			I, J = K.charAt(1);
        if (J && !isNaN(J)) {
            I = J
        } else {
            C.each(K.split(""), function (L) {
                H += parseInt(L.charCodeAt(0))
            });
            I = H % 4 + 1
        }
        return "http://img0" + I + ".taobaocdn.com/tps/" + K + (G || "")
    };
    A.miniLogin = function (H, G) {
        C.use("tml/minilogin,tml/overlay/css/overlay.css", function (J, I) {
            typeof G === "function" && G();
            typeof H === "function" && I.show(function () {
                H();
                try {
                    if (TB && TB.Global && TB.Global.writeLoginInfo) {
                        TB._isMemberInfoReady = false;
                        TB._isLoginStatusReady = false;
                        TB.Global.writeLoginInfo({
                            isApp: false
                        })
                    }
                } catch (K) { }
            })
        })
    };
    return A
});