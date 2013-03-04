KISSY.add("login/tracknick", function (_kissy) {
    var tracknick_core = function (_options) {
        if (!(this instanceof tracknick_core)) {
            return new tracknick_core(_options)
        }
        this.input = _kissy.one(_options.input);
        this.type = _kissy.isString(_options.type) ? _options.type.toUpperCase() : "";
        this.ckname = this.type === "CBU" ? "lid" : "tracknick"
    };
    _kissy.augment(tracknick_core, { init: function (_callback) {
        if (!this.input || this.input.val().length) {
            return
        }
        var _ckname_cookie = _kissy.Cookie.get(this.ckname);
        _ckname_cookie = _ckname_cookie ? unescape(_ckname_cookie.replace(/(?:#88)$/, "").replace(/\\u/g, "%u")) : "";
        if (_ckname_cookie) {
            this.input.val(_ckname_cookie);
            _kissy.isFunction(_callback) && _callback()
        }
    }
    });
    return tracknick_core
});