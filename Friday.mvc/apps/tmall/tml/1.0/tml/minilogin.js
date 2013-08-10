/**
* Created with JetBrains WebStorm.
* User: tangtang
* Date: 13-3-4
* Time: 下午2:51
* To change this template use File | Settings | File Templates.
*/
TML.add("minilogin", function (_tml) {
    function _get_minilogin_dialog(_show_url) {
        function _set_center() {
            var _documentElement = document.documentElement;
            _div.style.top = _documentElement.offsetHeight / 2 + _documentElement.scrollTop + "px"
        }
        var _div;
        _div = document.createElement("div");
        _div.id = "tml-mLogin";
        _div.className = "tml-dialog";
        _dom.addStyleSheet("#tml-mLogin{height:360px;width: 396px;z-index:99000;position: fixed;_position: absolute;left: 50%;top: 50%;margin: -190px 0 0 -208px;}");
        _div.innerHTML =
            '<div class="tml-contentbox">' +
              '  <div class="tml-stdmod-header" style="position: relative;z-index: 2"></div>' +
              ' <div class="tml-stdmod-body" style="background: #FAFAFA;">  ' +
                    '<div class="tml-mLogin-mask" style="position: absolute;width: 50px;background: #FAFAFA;height: 100%;"></div>' +
                    '<iframe style="margin:20px 0 0 40px;" ' +
                      'width="310" scrolling="no" height="304" frameborder="no" ' +
                      'src="' + _show_url +
                      '" onload="var c=document.getElementById(\'tml-mLogin\');if(c){c.style.height = \'349px\';c.style.height = \'360px\';}"></iframe>' +
              '</div>' +
            '</div>' +
            '<a id="TML_Login_MLogin_Close" href="#" class="tml-ext-close">X</a>' +
            '<div class="tml-dialog-skin" style="height:382px;"></div>' +
            '<i class="tml-dialog-cat"></i>';
        document.body.appendChild(_div);
        _event.on(_kissy.get("#TML_Login_MLogin_Close"), "click", function (_event) {
            _event.preventDefault();
            _div.style.display = "none"
        });
        if (_kissy.UA.ie == 6) {
            _set_center();
            _event.on(window, "scroll", _set_center)
        }
        return _div
    }
    function _is_same_hostname(_url_for_href) {
        var _a_tag =
            document.createElement("_a_tag");
        _a_tag.href = _url_for_href;
        return _a_tag.hostname === location.hostname
    }
    var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event,
//        _segment_function = function (_last_segment_count) {
//            var _hostname_array = location.hostname.split(".");
//            return _hostname_array.splice(_hostname_array.length - _last_segment_count > 0 ? _hostname_array.length - _last_segment_count : 0, _last_segment_count).join(".")
//        } (2),
     _segment_function = location.hostname,
        //2013-03-04 basilwang daily means localhost in our context
        //is_daily = _segment_function.indexOf(".net") !== -1,
        is_daily = true,
        //2013-03-04 basilwang daily means localhost in our context
        //_domain = is_daily ? "daily.tmall.net" : "tmall.com",
        _domain = is_daily ? "http://www.linjuzaixian.com/" : "tmall.com",
        //2013-03-04 basilwang we use localhost
        //_url = "http" + (is_daily ? "" : "s") + "://login." + (is_daily ? "daily.taobao.net" : "taobao.com") + "/member/login.jhtml?style=miniall&css_style=tmall&from=tmall&tpl_redirect_url=",
        _url = _domain + "/member/login.jhtml?style=miniall&css_style=tmall&from=tmall&tpl_redirect_url=",
        //2013-03-04 basilwang we use localhost
        //_default_config = { needRedirect: false, proxyURL: "http://vip." + _domain + "/miniLoginProxy.htm" };
        _default_config = { needRedirect: false, proxyURL:  _domain + "/miniLoginProxy.htm" };
    MiniLogin = { show: function (_fn, _config) {
        var _mini_login = this;
        if (typeof _fn !== "function") {
            _config = _fn;
            _fn = null
        }
        _config = _kissy.merge(_default_config, _config);
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
    }, _check: function (_fn, _config) {
        var _mini_login = this, _timeout = _config.checkTimeout || 5, f = false, _later_fn = _kissy.later(function () {
            f || _fn(_mini_login._checkPage());
            _later_fn && _later_fn.cancel()
        }, _timeout * 1E3);
        if (_config && _config.checkApi &&
            _config.checkApi.indexOf(".tmall.") == -1)
            _config.checkApi = undefined;
        //2013-03-04 basilwang use localhost domain
        //return _kissy.io({ type: "get", url: _config.checkApi || "http://vip." + _domain + "/member/user_login_info.do", success: function (_callback_info) {
        debugger
        return _kissy.io({ type: "get", url: _config.checkApi || "http://" + _domain + "/member/user_login_info.do", success: function (_callback_info) {
            f = true;
            _fn(_callback_info.login)
        }, error: function () {
            f = true;
            _fn(_mini_login._checkPage())
        }, timeout: _timeout, dataType: "jsonp", cache: false
        })
    }, _show: function (_fn, _config) {
        debugger;
        var _dom_div_id_tml_mLogin = _kissy.get("#tml-mLogin"), _callbak, _show_url = _url, _proxy_url = "";
        if (_config.needRedirect)
            _show_url += encodeURIComponent(location.href.split("#")[0]) + "&full_redirect=true";
        else {
            _callbak = "g_tml_callbak" + (new Date).getTime();
            window[_callbak] = function () {
                _dom_div_id_tml_mLogin.style.display = "none";
                _fn && _fn();
                try {
                    delete window[_callbak]
                } catch (n) {
                }
            };
            _proxy_url = _config.proxyURL + (_config.proxyURL.indexOf("?") > 0 ? "&" : "?") + "callback=" + _callbak;
            if (!_is_same_hostname(_config.proxyURL) && document.domain !== _segment_function)
                //document.domain = _segment_function;
            if (_is_same_hostname(_config.proxyURL) && document.domain === location.hostname)
                _proxy_url += "&nsdomain=true";
            _show_url += encodeURIComponent(_proxy_url) + "&full_redirect=false"
        }
        /*2013-03-09 basilwang to judge if iframe exists */
        if (_dom_div_id_tml_mLogin)
            _kissy.get("iframe", _dom_div_id_tml_mLogin).src = _show_url;
        else
            _dom_div_id_tml_mLogin = _get_minilogin_dialog(_show_url);
        _dom_div_id_tml_mLogin.style.display = ""
    }, config: function (b) {
        if (b && b.proxyUrl && b.proxyUrl.indexOf(".tmall.") == -1)
            b.proxyUrl = undefined;
        return _default_config = _kissy.merge(_default_config, b)
    } 
    };
    return _tml.MiniLogin = MiniLogin
}, { requires: ["overlay/css/overlay.css"] });
