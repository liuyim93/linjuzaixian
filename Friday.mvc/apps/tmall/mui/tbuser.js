
    KISSY.add("tmall/mui/tbuser", function (_kissy_imp, _dom) {
        _dom = _dom || _kissy_imp.DOM;
        var G = false, _tb_token, _dom_iframe;
        function E(N, L) {
            L = L || {};
            var M = L.isDaily !== undefined ? L.isDaily : (window.location.hostname.indexOf(".net") > -1);
            _kissy_imp.getScript("http://www." + (M ? "daily.taobao.net" : "tmall.com") + "/go/rgn/malldetail/interface/tb_token.php?v20121015", function () {
                N && N(window.tmd_tb_token)
            })
        }
        function _ensure_token(_fn_on_token_ready_wrapper, _opts) {
            _opts = _opts || {};
            if (_dom_iframe || !(/(tmall\.net|tmall\.com)$/.test(document.domain))) {
                _fn_on_token_ready_wrapper && _fn_on_token_ready_wrapper("");
                return
            }
            var _is_daily = _opts.isDaily !== undefined ? _opts.isDaily : (window.location.hostname.indexOf(".net") > -1), L = "http://www." + (_is_daily ? "daily.tmall.net" : "tmall.com") + "/go/rgn/mfp2012/token.php";
            _dom_iframe = _dom.create("<iframe>");
            _dom_iframe.src = L + "?t=" + +new Date;
            _dom_iframe.style.display = "none";
            if (_is_daily) {
                if (document.domain != "daily.tmall.net" && document.domain != "tmall.net") {
                    document.domain = "daily.tmall.net"
                }
            } else {
                if (document.domain != "tmall.com") {
                    document.domain = "tmall.com"
                }
            }
            function _fn_for_dom_onload() {
                _tb_token = window._tb_token_ = _tb_token || window._tb_token_ || _dom_iframe.contentWindow.getToken();
                _fn_on_token_ready_wrapper && _fn_on_token_ready_wrapper(_tb_token)
            }
            if (_dom_iframe.attachEvent) {
                _dom_iframe.attachEvent("onload", _fn_for_dom_onload)
            } else {
                _dom_iframe.onload = _fn_for_dom_onload
            }
            _dom.append(_dom_iframe, "body")
        }
        return _kissy_imp["tmall/mui/tbuser"] = _kissy_imp["tmall/mui/tbuser"] || { onLogin: function (_fn, _opts) {
            _opts = _opts || {};
            if (_opts.isLogin || G) {
                _fn && _fn();
                return
            }
            _kissy_imp.use("ajax", function () {
                TML.use("minilogin", function (_tml, _minilogin) {
                    _minilogin.show(function () {
                        G = true;
                        try {
                            TB.Global.updateLoginInfo()
                        } catch (P) {
                        }
                        _fn && _fn()
                    })
                }, function (_tml_imp) {
                    return _tml_imp.MiniLogin
                })
            })
        }, onLogout: function (_fn, _opts) {
            _opts = _opts || {};
            new Image().src = "http://" + (~location.host.indexOf(".net") ? "login.daily.taobao.net" : "login.taobao.com") + "/member/logout.jhtml";
            G = false;
            _fn && _fn()
        }, onTokenReady: function (_fn_on_token_ready, _opts) {
            if (_tb_token) {
                _fn_on_token_ready && _fn_on_token_ready(_tb_token);
                return
            }
            _ensure_token(function (_token_t) {
                if (_token_t) {
                    _tb_token = _token_t
                }
                _fn_on_token_ready && _fn_on_token_ready(_tb_token)
            }, _opts)
        }
        }
    }, { requires: ["dom"] })
