KISSY.add("login/safemode", function (_kissy, _safeedit, _pluginpop, _safeedittab) {
    var _dom = _kissy.DOM, _event = _kissy.Event;
    var SafeMode = function (_selector, _input_id_TPL_password_1) {
        var _safemode = this;
        _safemode.elEdit = null;
        _safemode.elPassword = _kissy.one(_input_id_TPL_password_1);
        _safemode.elOption = _kissy.one(_selector);
        _safemode.elWrap = _kissy.all(".safe-login");
        _safemode.elStaticForm = _kissy.one("#J_StaticForm");
        _safemode.elOption.on("click", function () {
            if (this.checked) {
                _safemode.turnon()
            } else {
                _safemode.elPassword.val("");
                _safemode.turnoff()
            }
        });
        if (!_safeedit.src) {
            _safemode.elOption[0].disabled = "true";
            _safemode.elOption.parent().hide()
        } else {
            _dom.html("#J_PasswordEdit", _safeedit.objectIE);
            _dom.html("#J_PasswordEditTmp", _safeedit.objectNoIE);
            _safemode.elEdit = (_kissy.UA.ie) ? _dom.get("#Password_Edit_IE") : _dom.get("#Password_Edit_NoIE");
            _safeedittab({ input: _safemode.elEdit, tabindex: 2 }).init();
            _safemode.elEdit.onkeydown = function (K) {
                if (!K) {
                    K = window.event
                }
                if (K.keyCode == 13) {
                    _safemode.fire("enter_key_down")
                }
            }
        }
    };
    _kissy.augment(SafeMode, _kissy.EventTarget, { ison: false, turnon: function (I) {
        var _safemode = this;
        if (_safemode.ison) {
            return
        }
        if (_safeedit.support && _safemode.elEdit) {
            if (!!I && !_safeedit.uaSupport) {
                this.turnoff();
                return
            }
            _dom.addClass("#J_Static", "safe_login");
            _dom.css("#J_StandardPwd", "display", "none");
            _dom.css("#J_PasswordEdit", "display", "");
            _safemode.elOption[0].checked = true;
            _safemode.elStaticForm[0].elements.loginType.value = 4;
            _safemode.elPassword[0].maxLength = 10000;
            _safemode.ison = true;
            _safemode.fire("switch", "on")
        } else {
            setTimeout(function () {
                _safemode.elOption[0].checked = false
            }, 0);
            _pluginpop.show()
        }
    }, turnoff: function () {
        var _safemode = this;
        if (!_safemode.ison) {
            return
        }
        _safemode.fire("switch", "off");
        _dom.css("#J_PasswordEdit", "display", "none");
        _dom.css("#J_StandardPwd", "display", "");
        _dom.css("#J_CapsLockTip", "display", "none");
        _safemode.elOption[0].checked = false;
        _safemode.elStaticForm[0].elements.loginType.value = 3;
        _safemode.elPassword.val("")[0].maxLength = 20;
        _safemode.ison = false
    }
    });
    return SafeMode
}, { requires: ["login/safeedit", "login/pluginpop", "login/SafeEditTab"] });