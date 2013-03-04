KISSY.add("login/capslocktip", function (_kissy) {
    var CapslockTip = function (_dom_input_id_TPL_password, _tip_selector) {
        var _dom_capslock_tip = _kissy.one(_tip_selector);
        _kissy.one(_dom_input_id_TPL_password).on("keypress", function (_event) {
            var _keycode = _event.keyCode || _event.which;
            var _shiftkey = _event.shiftKey || (_keycode == 16) || false;
            if (((_keycode >= 65 && _keycode <= 90) && !_shiftkey) || ((_keycode >= 97 && _keycode <= 122) && _shiftkey)) {
                _dom_capslock_tip.css("display", "")
            } else {
                _dom_capslock_tip.css("display", "none")
            }
        })
    };
    return CapslockTip
});