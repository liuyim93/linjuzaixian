KISSY.add("login/checkusername", function (_kissy, _tracknick, _nickclear) {
    var checkusername_core = function (_cfg, _checkcode, _longlogin) {
        var _checkusername_core = this;
        if (!_cfg || !_cfg.checkUserNameURL) {
            return
        }
        _checkusername_core.checked = {};
        _checkusername_core.checking = false;
        _checkusername_core.url = _cfg.checkUserNameURL;
        _checkusername_core.checkcode = _checkcode;
        _checkusername_core.longlogin = _longlogin;
        _checkusername_core.elun = _kissy.one("#TPL_username_1");
        _checkusername_core.usePhoneTips = !!_cfg.usePhoneTips;
        _checkusername_core.phoneTips = _kissy.one("#J_PhoneTips");
        _checkusername_core.un = _kissy.trim(_checkusername_core.elun.val());
        _checkusername_core.from = _kissy.one("#J_From") ? _kissy.one("#J_From").val() : "";
        //2013-03-01 basilwang seems not use this. this function will get name from cookie and set name to TPL_username_1
        _tracknick({ input: _checkusername_core.elun, type: _cfg.isCBU ? "CBU" : "" }).init(function () {
            _checkusername_core.elun.fire("blur")
        });
        _nickclear({ input: _checkusername_core.elun }).init();
        if (!!_cfg.isCBU) {
            return
        }
        _kissy.ready(function () {
            if (_checkusername_core.checkcode.isShow()) {
                _checkusername_core.checkcode.show()
            } else {
                _kissy.later(function () {
                    _checkusername_core.check()
                }, 300, false)
            }
        });
        _checkusername_core.elun.on("blur", function () {
            _checkusername_core.check();
            if (_checkusername_core.usePhoneTips && !_checkusername_core.phoneTipsHover) {
                _checkusername_core.phoneTips && _checkusername_core.phoneTips.hide().removeClass("show")
            }
        }).on("keyup focus", function () {
            if (_checkusername_core.usePhoneTips) {
                _checkusername_core.checkPhoneTips()
            }
        })
    };
    _kissy.augment(checkusername_core, { checkCode: function (H) {
        var F = this, E = F.checking, G = H;
        F.checking = false;
        F.checked[E] = G;
        if (G && G.needcode) {
            if (F.checkcode.isShow()) {
                F.checkcode.refresh();
                F.checkcode.focus()
            } else {
                F.checkcode.show()
            }
        } else {
            F.checkcode.hide()
        }
    }, onCheckSuccess: function (F) {
        var E = this;
        E.checkCode(F);
        E.checkLongLogin(F)
    }, onCheckFailure: function () {
        this.checking = false
    }, checkLongLogin: function (F) {
        var E = this;
        if (E.longlogin && F && E.from !== "etao") {
            if (F.tag) {
                E.longlogin.show()
            } else {
                E.longlogin.hide();
                E.longlogin.notcheck()
            }
        }
    },
        /*
        2013-03-01 basilwang I think this maybe use when you type your name in the input box
        */
        check: function () {
        var _checkusername = this;
        _checkusername.un = encodeURIComponent(_kissy.trim(_checkusername.elun.val()));
        if (!_checkusername.un) {
            if (_checkusername.longlogin && _checkusername.from !== "etao") {
                _checkusername.longlogin.hide();
                _checkusername.longlogin.notcheck()
            }
            return
        }
        if (_checkusername.checked.hasOwnProperty(_checkusername.un) && "needcode" in _checkusername.checked[_checkusername.un]) {
            if (_checkusername.checked[_checkusername.un].needcode) {
                _checkusername.checkcode.show()
            } else {
                _checkusername.checkcode.hide()
            }
            _checkusername.checkLongLogin(_checkusername.checked[_checkusername.un]);
            return
        }
        if (_checkusername.checking) {
            return
        }
        _checkusername.checking = _checkusername.un;
        _kissy.io({ type: "GET", url: _checkusername.url + "&username=" + _checkusername.un, cache: false, dataType: "json", success: function (F) {
            _checkusername.onCheckSuccess(F)
        }, error: function () {
            _checkusername.onCheckFailure()
        }
        })
    }, checkPhoneTips: function () {
        var E = this;
        if (!this.phoneTips) {
            this.elun.parent().append('<div class="phone-tips" id="J_PhoneTips"><i></i>\u624b\u673a\u53f7\u7801\u4e5f\u53ef\u4f5c\u4e3a\u8d26\u6237\u540d\u54e6<a href="http://service.taobao.com/support/knowledge-1119899.htm?dkey=catview" target="_blank">?</a></div>');
            this.phoneTips = _kissy.one("#J_PhoneTips");
            this.phoneTips.on("mouseover", function () {
                E.phoneTipsHover = true
            }).on("mouseout", function () {
                E.phoneTipsHover = false
            }).on("click", function () {
                E.phoneTips.hide().removeClass("show")
            })
        }
        if (/^\d+$/.test(this.elun.val()) || this.elun.val().length >= 2) {
            this.phoneTips.hide().removeClass("show")
        } else {
            this.phoneTips.show().addClass("show")
        }
    }
    });
    return checkusername_core
}, { requires: ["login/tracknick", "login/nickclear"] });