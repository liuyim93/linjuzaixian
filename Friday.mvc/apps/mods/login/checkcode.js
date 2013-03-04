KISSY.add("login/checkcode", function (_kissy, _audiocheckcode) {
    var _dom = _kissy.DOM, _event = _kissy.Event;
    CheckCode = function (_cfg) {
        var _checkcode = this, _form_id_J_StaticForm = _dom.get("#J_StaticForm");
        _checkcode.elImg = _kissy.one(_cfg.codeImg);
        _checkcode.elHandle = _kissy.one(_cfg.codeHandle);
        _checkcode.holder = _kissy.one("#l_f_code");
        _checkcode.holder2 = _kissy.one(_cfg.codeImg).parent(".field");
        _checkcode.elInput = _kissy.one(_form_id_J_StaticForm.elements.TPL_checkcode);
        _checkcode.elNeedCheck = _kissy.one(_form_id_J_StaticForm.elements.need_check_code);
        _checkcode.url = _checkcode.elImg.attr("data-src");
        _checkcode._refreshed = false;
        _checkcode.elHandle.on("click", function (H) {
            H.halt();
            _checkcode.refresh();
            _checkcode.focus()
        });
        _checkcode.elImg.on("click", function () {
            _checkcode.refresh();
            _checkcode.focus()
        });
        _audiocheckcode({ input: _checkcode.elInput, url: _cfg.audioCodeURL, handle: _cfg.audioCodeHandle }).init()
    };
    CheckCode.prototype.refresh = function () {
        this.elImg.attr("src", this.url + "&r=" + new Date().getTime());
        this._refreshed = true
    };
    CheckCode.prototype.show = function () {
        if (this.elImg.attr("src").indexOf("blank") >= 0 || (!this._refreshed && top != window && this.isShow())) {
            this.refresh()
        }
        this.holder.removeClass("hidden");
        this.holder2 && this.holder2.removeClass("hidden");
        this.elInput.val("");
        this.elNeedCheck.val("true")
    };
    CheckCode.prototype.isShow = function () {
        return !(this.holder.hasClass("hidden"))
    };
    CheckCode.prototype.hide = function () {
        this.holder.addClass("hidden");
        this.holder2 && this.holder2.addClass("hidden");
        this.elNeedCheck.val("")
    };
    CheckCode.prototype.focus = function () {
        this.elInput[0].focus()
    };
    return CheckCode
}, { requires: ["login/AudioCheckCode"] });