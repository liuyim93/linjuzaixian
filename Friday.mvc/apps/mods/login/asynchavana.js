KISSY.add("login/asynchavana", function (_kissy, _message) {
    var _message_obj = new _message();
    var A = false;
    return function (_form_type /*static or dynamic or other maybe*/, _cfg) {
        var _dom = _kissy.DOM, _event = _kissy.Event, _havanaConfig = window.havanaConfig;
        var _cfg_obj = _kissy.isObject(_cfg) ? _cfg : {};
        var _dom_form_id_J_StaticForm = _dom.get("#J_StaticForm"), _dom_form_id_J_DynamicForm = _dom.get("#J_DynamicForm");
        var _dom_form = (_form_type && _form_type.toLowerCase() === "dynamic") ? _dom_form_id_J_DynamicForm : _dom_form_id_J_StaticForm;
        if (!window.havanaConfig || !window.havanaConfig.enable) {
            _dom_form.submit();
            return
        }
        try {
            var H = _dom_form.elements.newlogin, Q = _dom_form.elements.callback;
            H && (H.value = "1");
            Q && (Q.value = "1")
        } catch (M) {
        }
        function L() {
            if (A) {
                return
            }
            A = true;
            _kissy.io({ type: "post", dataType: "json", cache: false, url: _havanaConfig.loginUrl, form: _dom_form, timeout: 2, success: function (T) {
                _kissy.log("Result returned after post user login data:" + _kissy.JSON.stringify(T));
                if (!T) {
                    G();
                    return
                }
                if (T.data && T.data.code && T.data.code === 100009) {
                    G();
                    return
                }
                if (T.data && T.data.code && (T.data.code === 3425 || T.data.code === 1000)) {
                    if (!!_cfg_obj.isCBU && _cfg_obj.checkcode && T.data.code === 1000) {
                        _cfg_obj.checkcode.refresh();
                        _cfg_obj.checkcode.focus()
                    } else {
                        _cfg_obj.checkusername && _cfg_obj.checkusername.checkCode({ needcode: true })
                    }
                }
                if (T.state) {
                    if (T.data && T.data.token && (T.data.token !== "")) {
                        I(T.data.token)
                    } else {
                        G()
                    }
                } else {
                    if (T.data && T.data.needrefresh && T.data.url) {
                        window.top.location.href = T.data.url
                    } else {
                        A = false;
                        _message_obj.show(T.message || "\u51fa\u9519\u4e86\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01", "error");
                        _cfg_obj.submitbutton && _cfg_obj.submitbutton.reset();
                        if (_cfg_obj.checkcode && _cfg_obj.checkcode.isShow()) {
                            _cfg_obj.checkcode.refresh()
                        }
                    }
                }
            }, error: function () {
                G()
            }
            })
        }
        function I(T) {
            _kissy.io({ type: "get", dataType: "jsonp", cache: false, scriptCharset: "utf-8", url: _havanaConfig.applyStUrl, data: { site: _havanaConfig.site, token: T }, timeout: 1, success: function (U) {
                _kissy.log("Result returned after get mini apply st:" + _kissy.JSON.stringify(U));
                if (!U) {
                    G();
                    return
                }
                if (U.code !== 200) {
                    G()
                } else {
                    if (U.data && U.data.st && (U.data.st !== "")) {
                        J(U.data.st)
                    } else {
                        G()
                    }
                }
            }, error: function (U) {
                G()
            }
            })
        }
        function G() {
            _kissy.each(_dom_form.elements, function (T) {
                if (T.name == "callback") {
                    T.value = ""
                }
                if (T.name == "newlogin") {
                    T.value = "0"
                }
            });
            _dom_form.submit()
        }
        function J(T) {
            var U = [];
            _kissy.each(_havanaConfig.vstParams, function (X) {
                var W = _kissy.all(X);
                if (!W.length) {
                    return
                }
                var V = W.attr("name");
                if (!V) {
                    return
                }
                var Y = V === "TPL_redirect_url" ? window.encodeURIComponent(W.val()) : W.val();
                U.push(V + "=" + Y)
            });
            _kissy.io({ type: "get", dataType: "jsonp", scriptCharset: "utf-8", cache: false, url: _havanaConfig.vstUrl, data: { st: T, params: window.encodeURIComponent(U.join("&")) }, success: function (V) {
                _kissy.log("Result returned from taobao login server:" + _kissy.JSON.stringify(V));
                if (!V) {
                    G();
                    return
                }
                if (V.data && V.data.url && V.data.url !== "") {
                    if (V.data.script) {
                        window.top.location.href = V.data.url
                    } else {
                        window.location.href = V.data.url
                    }
                } else {
                    G()
                }
            }, error: function () {
                G()
            }
            })
        }
        L()
    }
}, { requires: ["login/message"] });