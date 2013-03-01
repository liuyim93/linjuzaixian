KISSY.add("login/longlogin", function (_kissy) {
    var _dom = _kissy.DOM, _event = _kissy.Event;
    var longlogin_core = function (_cfg) {
        var _span_container_named_J_LongLogin_c = _kissy.one("#J_LongLogin_c"), 
            _checkbox_named_J_LongLogin_1 = _kissy.one("#J_LongLogin_1");
        this.elCheckBox = _checkbox_named_J_LongLogin_1;
        if (!_span_container_named_J_LongLogin_c || !_checkbox_named_J_LongLogin_1) {
            return
        }
        var _checked = _checkbox_named_J_LongLogin_1[0].checked, _div_classed_login_tips_content = _span_container_named_J_LongLogin_c.parent().one(".login-tips-content");
        function _maybe_autocheck_based_on_what_fuck_llnick1() {
            var _value_of_llnick1 = _dom.val("#llnick1"), _username = _dom.val("#TPL_username_1");
            _checkbox_named_J_LongLogin_1[0].checked = _value_of_llnick1 !== "" && _value_of_llnick1 == _username || _checked
        }
        _span_container_named_J_LongLogin_c.on("mouseenter", function () {
            _span_container_named_J_LongLogin_c.addClass("long-login-hover");
            _div_classed_login_tips_content.html("为了账户安全，请勿在公用电脑上勾选此项");
            _div_classed_login_tips_content.parent().css({ display: "block", visibility: "visible" })
        }).on("mouseleave", function () {
            _span_container_named_J_LongLogin_c.removeClass("long-login-hover");
            _div_classed_login_tips_content.parent().css({ display: "none", visibility: "hidden" })
        });
        _checkbox_named_J_LongLogin_1.on("click", function () {
            if (this.checked) {
                this.value = 1
            } else {
                this.value = 0
            }
        });
        _kissy.ready(function () {
            _maybe_autocheck_based_on_what_fuck_llnick1()
        })
    };
    longlogin_core.prototype.show = function () {
        _dom.removeClass("#J_LoginBox", "no-longlogin")
    };
    longlogin_core.prototype.hide = function () {
        _dom.addClass("#J_LoginBox", "no-longlogin")
    };
    longlogin_core.prototype.notcheck = function () {
        if (!this.elCheckBox) {
            return
        }
        this.elCheckBox.prop("checked", false);
        this.elCheckBox.val(0)
    };
    return longlogin_core
});