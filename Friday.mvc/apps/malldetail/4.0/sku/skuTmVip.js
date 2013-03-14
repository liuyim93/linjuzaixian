KISSY.add("malldetail/sku/skuTmVip", function (E, I) {
    var C = E.mods.SKU;
    var G = KISSY, P = G.DOM, M = G.Event;
    var N = false;
    var B = false;
    var H = '<span  class="tb-metatit"><a href="{{drUrl}}" target="_blank" title="{{drTip}}" class="tb-tmviptit">\u8fbe\u4eba\u4e13\u4eab</a></span><ul><li class="tb-item-thcart"><a href="http://vip.tmall.com/vip/privilege.htm?priv=returngurantee&spm={{bzUrlSpm}}" target="_blank"><s></s>\u9000\u8d27\u4fdd\u969c\u5361</a></li></ul>';
    var J = { drUrl: "", bzUrlSpm: "", drTip: "" };
    function A(R) {
        var Q = G.one("#J_ItemTmVip");
        if (N && Q) {
            Q.html(I(H).render(J));
            Q.show();
            if (G.isFunction(R)) {
                R.call(this)
            }
        }
    }
    function O() {
        if (TB.Global && TB.Global.memberInfoReady) {
            TB.Global.memberInfoReady(function (Q) {
                B = (D()) && Q.isLogin;
                K(Q)
            })
        }
    }
    function K(R) {
        var S = E.cfg("apiMember") || E.cfg("apiVipBirth");
        var U = (window.g_config["assetsHost"].indexOf("taobao.net") != -1), T = U ? "daily.tmall.net" : "tmall.com", Q = U ? "daily.taobao.net" : "taobao.com";
        if (!S) {
            return
        }
        if (!R.isLogin || R.memberInfo.activeStatus < 1) {
            J.drTip = "\u6210\u4e3a\u5929\u732b\u8fbe\u4eba\u53ef\u4e13\u4eab\u4ee5\u4e0b\u8d2d\u7269\u7279\u6743";
            J.bzUrlSpm = "3.1000728.0.0";
            J.drUrl = "http://vip.tmall.com/vip/index.htm?&layer=activation&spm=3.1000727.0.0";
            if (B) {
                M.remove(".tb-tmviptit", "click");
                A()
            } else {
                A(function () {
                    var V = G.one(".tb-tmviptit", "#J_ItemTmVip");
                    M.on(".tb-tmviptit", "click", function (W) {
                        if (!R.isLogin) {
                            W.preventDefault();
                            E.onLogin(function () {
                                F()
                            })
                        }
                    })
                })
            }
        }
        if (R.isLogin) {
            G.use("ajax", function (W, V) {
                V.jsonp(S, function (X) {
                    if (R.memberInfo.activeStatus > 0) {
                        J.drUrl = "http://vip.tmall.com?spm=3.1000726.0.0";
                        if (X.props && X.props["\u9000\u8d27\u4fdd\u969c\u5361"] && X.props["\u9000\u8d27\u4fdd\u969c\u5361"].amount > 0) {
                            J.bzUrlSpm = "3.1000729.0.0";
                            A()
                        }
                    }
                    L(X)
                })
            })
        }
    }
    function L(S) {
        var Q = G.one(".tb-item-bonus");
        var R = E.cfg("vipBirthJumpLink");
        if (Q && S && S.inBirthWeek) {
            P.append(P.create('<ins>\u751f\u65e5\u5468\u53ef\u83b7\u53cc\u500d\u79ef\u5206\uff0c<a href="' + R + '" target="_blank">\u70b9\u6b64\u9886\u53d6</a></ins>'), Q)
        }
    }
    function D() {
        var Q = window.location.href;
        return (Q.indexOf("tmvipLogin") != -1) ? true : false
    }
    function F() {
        if (D()) {
            window.location.reload()
        } else {
            window.location.href = window.location.href + "&tmvipLogin=1"
        }
    }
    return { init: function (Q) {
        N = (E.cfg("tradeType") == 2 && Q.itemPriceResultDO.promType != 1);
        O()
    } 
    }
}, { requires: ["template"] }); /*pub-1|2013-01-06 16:13:23*/