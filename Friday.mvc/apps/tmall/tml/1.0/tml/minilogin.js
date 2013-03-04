/**
* Created with JetBrains WebStorm.
* User: tangtang
* Date: 13-3-4
* Time: 下午2:51
* To change this template use File | Settings | File Templates.
*/
TML.add("minilogin", function (_tml) {
    function p(b) {
        function a() {
            var _documentElement = document.documentElement;
            _div.style.top = _documentElement.offsetHeight / 2 + _documentElement.scrollTop + "px"
        }
        var _div;
        _div = document.createElement("div");
        _div.id = "tml-mLogin";
        _div.className = "tml-dialog";
        _dom.addStyleSheet("#tml-mLogin{height:360px;width: 396px;z-index:99000;position: fixed;_position: absolute;left: 50%;top: 50%;margin: -190px 0 0 -208px;}");
        _div.innerHTML = '<div class="tml-contentbox"><div class="tml-stdmod-header" style="position: relative;z-index: 2"></div> <div class="tml-stdmod-body" style="background: #FAFAFA;">   <div class="tml-mLogin-mask" style="position: absolute;width: 50px;background: #FAFAFA;height: 100%;"></div>   <iframe style="margin:20px 0 0 40px;" width="310" scrolling="no" height="304" frameborder="no" src="' +
            b + '   " onload="var c=document.getElementById(\'tml-mLogin\');if(c){c.style.height = \'349px\';c.style.height = \'360px\';}"></iframe></div></div><a id="TML_Login_MLogin_Close" href="#" class="tml-ext-close">X</a><div class="tml-dialog-skin" style="height:382px;"></div><i class="tml-dialog-cat"></i>';
        document.body.appendChild(_div);
        _event.on(_kissy.get("#TML_Login_MLogin_Close"), "click", function (d) {
            d.preventDefault();
            _div.style.display = "none"
        });
        if (_kissy.UA.ie == 6) {
            a();
            _event.on(window, "scroll", a)
        }
        return _div
    }
    function l(b) {
        var a =
            document.createElement("a");
        a.href = b;
        return a.hostname === location.hostname
    }
    var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event,
        _segment_function = function (_last_segment_count) {
            var _hostname_array = location.hostname.split(".");
            return _hostname_array.splice(_hostname_array.length - _last_segment_count > 0 ? _hostname_array.length - _last_segment_count : 0, _last_segment_count).join(".")
        } (2),
        is_daily = _segment_function.indexOf(".net") !== -1,
        _domain = is_daily ? "daily.tmall.net" : "tmall.com",
        _url = "http" + (is_daily ? "" : "s") + "://login." + (is_daily ? "daily.taobao.net" : "taobao.com") + "/member/login.jhtml?style=miniall&css_style=tmall&from=tmall&tpl_redirect_url=", j = { needRedirect: false, proxyURL: "http://vip." + _domain + "/miniLoginProxy.htm" };
    MiniLogin = { show: function (_fn, _config) {
        var _mini_login = this;
        if (typeof _fn !== "function") {
            _config = _fn;
            _fn = null
        }
        _config = _kissy.merge(j, _config);
        var _date = new Date;
        _date.setDate(_date.getDate() - 1);
        document.cookie = "cookie2=;expires=" + _date.toGMTString() + ";path=/;domain=.tmall.com";
        _config.check === false ? this._show(_fn, _config) : this._check(function (f) {
            if (f)
                _fn && _fn();
            else
                _mini_login._show(_fn, _config)
        }, _config)
    }, _checkPage: function () {
        return window.TB && window.TB.userInfo && window.TB.userInfo.isLogin
    }, _check: function (b, a) {
        var _mini_login = this, d = a.checkTimeout || 5, f = false, g = _kissy.later(function () {
            f || b(_mini_login._checkPage());
            g && g.cancel()
        }, d * 1E3);
        if (a && a.checkApi &&
            a.checkApi.indexOf(".tmall.") == -1)
            a.checkApi = undefined;
        return _kissy.io({ type: "get", url: a.checkApi || "http://vip." + _domain + "/member/user_login_info.do", success: function (n) {
            f = true;
            b(n.login)
        }, error: function () {
            f = true;
            b(_mini_login._checkPage())
        }, timeout: d, dataType: "jsonp", cache: false
        })
    }, _show: function (b, a) {
        var c = _kissy.get("#tml-mLogin"), d, f = _url, g = "";
        if (a.needRedirect)
            f += encodeURIComponent(location.href.split("#")[0]) + "&full_redirect=true";
        else {
            d = "g_tml_callbak" + (new Date).getTime();
            window[d] = function () {
                c.style.display = "none";
                b && b();
                try {
                    delete window[d]
                } catch (n) {
                }
            };
            g = a.proxyURL + (a.proxyURL.indexOf("?") > 0 ? "&" : "?") + "callback=" + d;
            if (!l(a.proxyURL) && document.domain !== _segment_function)
                document.domain = _segment_function;
            if (l(a.proxyURL) && document.domain === location.hostname)
                g += "&nsdomain=true";
            f += encodeURIComponent(g) + "&full_redirect=false"
        }
        if (c)
            _kissy.get("iframe", c).src = f;
        else
            c = p(f);
        c.style.display = ""
    }, config: function (b) {
        if (b && b.proxyUrl && b.proxyUrl.indexOf(".tmall.") == -1)
            b.proxyUrl = undefined;
        return j = _kissy.merge(j, b)
    } 
    };
    return _tml.MiniLogin = MiniLogin
}, { requires: ["overlay/css/overlay.css"] });
