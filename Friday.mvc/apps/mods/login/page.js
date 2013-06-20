/*pub-1|2013-01-31 04:23:57*/
KISSY.add("login/page", function (_kissy, _safeedit, _submitbutton, _safemode, _longlogin, _capslocktip, _moduleswitch, _message, _checkcode, _checkusername, _placeholder, _asynchavana) {
    var _client_version = _kissy.UA, _dom = _kissy.DOM, _event = _kissy.Event;
    var login_core = {
        cfg:
        {
            dynamicPasswordUrl: "request_dynamic_password.do",
            codeImg: "#J_StandardCode_m",
            codeHandle: "#J_StandardCode",
            codeInput: "#J_CodeInput_i",
            codeURL: "https://regcheckcode.taobao.com/auction/checkcode?sessionID=0",
            audioCodeURL: "http://voicecheckcode.taobao.com/vcc/checkcode?sessionID=0",
            audioCodeHandle: "#J_audioHandle",
            checkUserNameURL: "",
            defaultView: "static",
            isCBU: (_kissy.one("#J_loginsite") ? _kissy.one("#J_loginsite").val() : "") === "3"
        },
        _checkStaticForm: function () {
        debugger
            var _login_core = this,
            _dom_form_id_J_StaticForm = _login_core.elStaticForm,
            _dom_input_name_TPL_username = _dom_form_id_J_StaticForm.elements.TPL_username,
            _dom_input_name_TPL_checkcode = _dom_form_id_J_StaticForm.elements.TPL_checkcode,
            _dom_input_name_TPL_password = _login_core.elPassword;
            _login_core.message.clearHighlights();
            _login_core.staticButton = _submitbutton({ el: _kissy.one(".J_Submit", _dom_form_id_J_StaticForm) });
            var _str_please = "请输入您的", _str_error = _str_please;
            if (_dom_input_name_TPL_username.value == "" || _dom_input_name_TPL_username.value == _dom_input_name_TPL_username.title) {
                _str_error += "账户名";
                _login_core.message.highlight(_dom_input_name_TPL_username);
                _dom_input_name_TPL_username.focus()
            }
            if (this.safemode.ison) {
                try {
                    var V = _dom_input_name_TPL_password.value = this._pwdEdit.TextData;
                    _dom_form_id_J_StaticForm.elements.tid.value = this._pwdEdit.ci1();
                    if (V == "") {
                        if (_str_error == _str_please) {
                            _str_error += "密码";
                            try {
                                this._pwdEdit.focus()
                            } catch (X) {
                            }
                        } else {
                            _str_error += "和密码"
                        }
                    }
                    if (_client_version.ie) {
                        _dom_form_id_J_StaticForm.elements.poy.value = this._pwdEdit.ci2() || ""
                    }
                } catch (T) {
                    _str_error = "请您安装安全控件后，再尝试登录"
                }
            } else {
                //2013-03-01 basilwang we should close safemode  TODO
                var _dom_password_edit = (function () {
                    if (_client_version.ie) {
                        return _dom.get("#Password_Edit_Tmp_IE")
                    } else {
                        return _dom.get("#Password_Edit_Tmp_NoIE")
                    }
                })();
                try {
                    _dom_form_id_J_StaticForm.elements.tid.value = _dom_password_edit.ci1();
                    if (_client_version.ie) {
                        _dom_form_id_J_StaticForm.elements.poy.value = _dom_password_edit.ci2() || ""
                    }
                } catch (T) {
                }
                if (_dom_input_name_TPL_password.value == "") {
                    _login_core.message.highlight(_dom_input_name_TPL_password);
                    if (_str_error == _str_please) {
                        _str_error += "密码";
                        try {
                            _dom_input_name_TPL_password.focus()
                        } catch (X) {
                        }
                    } else {
                        _str_error += "和密码"
                    }
                } else {
                    //2013-03-01 basilwang we don't use PwdIntensity
                    //_dom_form_id_J_StaticForm.elements.pstrong.value = PwdIntensity(_dom_input_name_TPL_password.value)
                }
            }
            if (_str_error == _str_please) {
                if (_login_core.checkcode.isShow() && _dom_input_name_TPL_checkcode.value == "") {
                    _str_error = "请先输入验证码";
                    _login_core.message.show(_str_error);
                    _login_core.message.highlight(_dom_input_name_TPL_checkcode);
                    _dom_input_name_TPL_checkcode.focus();
                    return false
                }
                _login_core.message.hide();
                _login_core.staticButton.ing("正在登陆...");
                return true
            } else {
                _login_core.message.show(_str_error);
                return false
            }
        },
        //2013-03-01 basilwang we don't use dynamicForm
        /*
        _checkDynamicForm: function () {
        var R = this, T = this.elDynamicForm, V = T.elements.TPL_mobilephone, Q = T.elements.TPL_PhoneCode;
        R.dynamicButton = _submitbutton({ el: _kissy.one(".J_Submit", T) });
        R.message.clearHighlights();
        var S = "\u8bf7\u8f93\u5165\u60a8\u7684", U = S;
        if (_kissy.trim(V.value) == "") {
        U += "\u624b\u673a";
        R.message.highlight(V);
        V.focus();
        R.message.show(U);
        return false
        }
        if (!/^\d+$/g.test(_kissy.trim(V.value))) {
        U = "\u624b\u673a\u53f7\u53ea\u80fd\u4e3a\u6570\u5b57\u3002";
        R.message.highlight(V);
        R.message.show(U);
        return false
        }
        if (_kissy.trim(Q.value) == "") {
        R.message.highlight(Q);
        if (U == S) {
        U += "\u52a8\u6001\u5bc6\u7801";
        Q.focus()
        } else {
        U += "\u548c\u52a8\u6001\u5bc6\u7801"
        }
        }
        if (U == S) {
        R.message.hide();
        R.dynamicButton.ing("\u6b63\u5728\u767b\u5f55...");
        return true
        } else {
        R.message.show(U);
        return false
        }
        },  */
        //2013-03-01 basilwang don't know what does _check_um mean  _dom.get("#um_to") is null
        _check_um: function (_callback) {
            var S, T = _dom.get("#um_to"), W = 1500, Q = 200, U = 0;
            try {
                if (um && um.getStatus) {
                    S = setInterval(function () {
                        U = U + Q;
                        if (um.getStatus() || U >= W) {
                            if (T) {
                                T.value += U
                            }
                            clearInterval(S);
                            _callback()
                        }
                    }, Q)
                } else {
                    _callback()
                }
            } catch (V) {
                _callback()
            }
        }, init: function (_options) {
            this.initialize(_options)
        }, initialize: function (_options) {
            if (_options) {
                this.cfg = _kissy.merge(this.cfg, _options)
            }
            var _login_core = this, _form_id_J_StaticForm = _dom.get("#J_StaticForm");
            //var _domain = window.location.hostname.split(".").slice(-2).join(".");
            var _domain = window.location.hostname;
            if (_domain.indexOf("taobao") !== -1) {
                document.domain = _domain
            }
            _kissy.mix(login_core, { elStaticForm: _form_id_J_StaticForm, elUserName: _form_id_J_StaticForm.elements.TPL_username, elPassword: _form_id_J_StaticForm.elements.TPL_password, elDynamicForm: _dom.get("#J_DynamicForm"), elQuickLogin: _dom.get("#J_QuickLogin"), elLoginBox: _dom.get("#J_LoginBox") });
            this.longlogin = new _longlogin(this.cfg);
            this.checkcode = new _checkcode(this.cfg);
            _login_core.safemode = new _safemode("#J_SafeLoginCheck", _login_core.elPassword);
            this._pwdEdit = _login_core.safemode.elEdit;
            this.safemode.on("enter_key_down", function () {
                if (_login_core._checkStaticForm()) {
                    _asynchavana("static", { checkusername: _login_core.checkusername, submitbutton: _login_core.staticButton, checkcode: _login_core.checkcode, isCBU: _login_core.cfg.isCBU })
                }
            });
            setTimeout(function () {
                var U = (typeof _login_core.cfg.useAliedit !== "undefined") ? _login_core.cfg.useAliedit : _safeedit.support;
                if (U && _login_core._pwdEdit) {
                    _login_core.safemode.turnon(1)
                } else {
                    _login_core.safemode.turnoff()
                }
            }, 0);
            _kissy.ready(function () {
                _login_core.checkusername = new _checkusername(_login_core.cfg, _login_core.checkcode, _login_core.longlogin);
                new _capslocktip(_login_core.elPassword, "#J_CapsLockTip");
                _event.on(_login_core.elStaticForm, "submit", function (_event) {
                    _event.preventDefault();
                    if (_login_core._checkStaticForm()) {
                        _login_core._check_um(function () {
                            _asynchavana("static", { checkusername: _login_core.checkusername, submitbutton: _login_core.staticButton, checkcode: _login_core.checkcode, isCBU: _login_core.cfg.isCBU })
                        })
                    }
                });
                //2013-03-01 basilwang don't use dynamicForm
                /*
                _event.on(_login_core.elDynamicForm, "submit", function (W) {
                W.preventDefault();
                if (_login_core._checkDynamicForm()) {
                _login_core._check_um(function () {
                _asynchavana("dynamic", { submitbutton: _login_core.dynamicButton })
                })
                }
                });
                */
                _kissy.each(_dom.query(".ph-label"), function (W) {
                    new _placeholder(W)
                });
                //2013-03-01 basilwang don't use _moduleswitch
                /*
                var _moduleswitch_tmp = new _moduleswitch(_login_core.elLoginBox, _login_core.elDynamicForm);
                _moduleswitch_tmp.switchTo(_options.defaultView);
                */
                var U = _dom.get("#J_SC_Guide");
                if (U) {
                    _event.on(U, "click", function (_event) {
                        _event.preventDefault();
                        _login_core.safemode.turnoff();
                        try {
                            _login_core.elUserName.select()
                        } catch (X) {
                        }
                        _dom.hide(U)
                    })
                }
                //2013-03-01 basilwang don't use _moduleswitch
                /*
                _moduleswitch_tmp.on("switch", function () {
                _login_core.message.reset()
                });*/
                _login_core.message = new _message();
                //2013-03-01 basilwang don't use _moduleswitch
                /*
                if (!_options.disableQuickLogin) {
                _kissy.use("login/quicklogin-pkg", function (X, W) {
                var Y = W({ onFailure: function () {
                _moduleswitch_tmp.switchTo(_options.defaultView)
                }, onSuccess: function () {
                _moduleswitch_tmp.switchTo("quick")
                }
                }, _moduleswitch_tmp, _login_core.cfg.isCBU)
                })
                }
                */
            })
        }
    };
    return login_core
}, { requires: ["login/safeedit", "login/submitbutton", "login/safemode", "login/longlogin", "login/capslocktip", "login/moduleswitch", "login/message", "login/checkcode", "login/checkusername", "login/placeholder", "login/asynchavana"] });
