KISSY.add("login/submitbutton", function (_kissy) {
    var SubmitButton = function (_options) {
        if (!(this instanceof SubmitButton)) {
            return new SubmitButton(_options)
        }
        var _options_tmp = _options || {};
        this.el = _kissy.one(_options_tmp.el);
        this._init()
    };
    _kissy.augment(SubmitButton, { _init: function () {
        if (!this.el) {
            return
        }
        this.text = this.el.text();
        return this
    }, ing: function (C) {
        this.el.text(C);
        return this
    }, reset: function () {
        this.el.prop("disabled", false);
        this.el.text(this.text);
        return this
    }
    });
    return SubmitButton
});