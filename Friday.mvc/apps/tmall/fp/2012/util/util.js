KISSY.add("2012/util/util", function(S, DOM, Event, Node) {
    var win = window;
    var util = {};
    var iframe;
    util.getToken = function(callback) {
        if (typeof callback !== "function")
            return;
        var tokenUrl = "http://www." + (~location.host.indexOf("tmall.net") ? "daily.tmall.net" : "tmall.com") + "/go/rgn/mfp2012/token.php";
        if (!(win._tb_token_ && iframe)) {
            iframe = DOM.create("<iframe>");
            iframe.src = tokenUrl + "?t=" + +new Date;
            iframe.style.display = "none";
            if (iframe.attachEvent) {
                iframe.attachEvent("onload", function() {
                    win._tb_token_ = win._tb_token_ || iframe.contentWindow.getToken();
                    callback()
                })
            } else {
                iframe.onload = function() {
                    win._tb_token_ = win._tb_token_ || iframe.contentWindow.getToken();
                    callback()
                }
            }
            DOM.append(iframe, "body")
        } else {
            callback()
        }
    };
    util.randomImgUrl = function(str, suf) {
        var num = 0, random, strNum = str.charAt(1);
        if (strNum && !isNaN(strNum) && strNum > 0 && strNum < 5) {
            random = strNum
        } else {
            S.each(str.split(""), function(c) {
                num += parseInt(c.charCodeAt(0))
            });
            random = num % 4 + 1
        }
        return "http://img0" + random + ".taobaocdn.com/tps/" + str + (suf || "")
    };
    util.miniLogin = function(loginCallback, showCallback) {
        S.use("tml/minilogin,tml/overlay/css/overlay.css", function(S, MiniLogin) {
            typeof showCallback === "function" && showCallback();
            typeof loginCallback === "function" && MiniLogin.show(function() {
                loginCallback();
                try {
                    if (TB && TB.Global && TB.Global.writeLoginInfo) {
                        TB._isMemberInfoReady = false;
                        TB._isLoginStatusReady = false;
                        TB.Global.writeLoginInfo({isApp: false})
                    }
                } catch (e) {
                }
            })
        })
    };
    return util
}, {requires: ["dom", "event", "node"]});