(function (_kissy) {
    var _namespace_tbuser = "tgallery/tmall/common/tbuser";
    (!_kissy.config) && _kissy.add(_namespace_tbuser, { requires: ["core"] });
    function C(E) {
        if (window.TML) {
            E(_kissy, window.TML);
            return
        }
        _kissy.getScript(_kissy.configTgallery.path + "tmall/tml/1.0/tml/tml-min.js", function () {
            E(_kissy, window.TML)
        })
    }
    function D(F, G, E) {
        C(function (J, I) {
            if (J.config) {
                I.use(F, G || function () {
                });
                return
            }
            if (E && E(I)) {
                G && G(J, E(I));
                return
            }
            var H = J.configTgallery.path + "tmall/tml/1.0/tml/" + F;
            if (F.indexOf(".") < 0) {
                H += ".js"
            }
            J.getScript(H, function () {
                G && G(J, E && E(I))
            })
        })
    }
    _kissy.add(_namespace_tbuser, function (_kissy_imp, _dom) {
        _dom = _dom || _kissy_imp.DOM;
        var G = false, J, I;
        function E(N, L) {
            L = L || {};
            var M = L.isDaily !== undefined ? L.isDaily : (window.location.hostname.indexOf(".net") > -1);
            _kissy_imp.getScript("http://www." + (M ? "daily.taobao.net" : "tmall.com") + "/go/rgn/malldetail/interface/tb_token.php?v20121015", function () {
                N && N(window.tmd_tb_token)
            })
        }
        function F(P, M) {
            M = M || {};
            if (I || !(/(tmall\.net|tmall\.com)$/.test(document.domain))) {
                P && P("");
                return
            }
            var O = M.isDaily !== undefined ? M.isDaily : (window.location.hostname.indexOf(".net") > -1), L = "http://www." + (O ? "daily.tmall.net" : "tmall.com") + "/go/rgn/mfp2012/token.php";
            I = _dom.create("<iframe>");
            I.src = L + "?t=" + +new Date;
            I.style.display = "none";
            if (O) {
                if (document.domain != "daily.tmall.net" && document.domain != "tmall.net") {
                    document.domain = "daily.tmall.net"
                }
            } else {
                if (document.domain != "tmall.com") {
                    document.domain = "tmall.com"
                }
            }
            function N() {
                J = window._tb_token_ = J || window._tb_token_ || I.contentWindow.getToken();
                P && P(J)
            }
            if (I.attachEvent) {
                I.attachEvent("onload", N)
            } else {
                I.onload = N
            }
            _dom.append(I, "body")
        }
        return _kissy_imp[_namespace_tbuser] = _kissy_imp[_namespace_tbuser] || { onLogin: function (M, L) {
            L = L || {};
            if (L.isLogin || G) {
                M && M();
                return
            }
            _kissy_imp.use("ajax", function () {
                D("minilogin", function (N, O) {
                    D("overlay/css/overlay.css");
                    O.show(function () {
                        G = true;
                        try {
                            TB.Global.updateLoginInfo()
                        } catch (P) {
                        }
                        M && M()
                    })
                }, function (N) {
                    return N.MiniLogin
                })
            })
        }, onLogout: function (M, L) {
            L = L || {};
            new Image().src = "http://" + (~location.host.indexOf(".net") ? "login.daily.taobao.net" : "login.taobao.com") + "/member/logout.jhtml";
            G = false;
            M && M()
        }, onTokenReady: function (M, L) {
            if (J) {
                M && M(J);
                return
            }
            F(function (N) {
                if (N) {
                    J = N
                }
                M && M(J)
            }, L)
        } 
        }
    }, { requires: ["dom"] })
})(KISSY);
