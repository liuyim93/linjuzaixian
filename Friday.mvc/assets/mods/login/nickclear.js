KISSY.add("login/nickclear", function (_kissy) {
    var nickclear_core = function (_options) {
        if (!(this instanceof nickclear_core)) {
            return new nickclear_core(_options)
        }
        this.input = _kissy.one(_options.input);
        this.uid = _kissy.now()
    }, C = false;
    _kissy.augment(nickclear_core, { init: function () {
        if (!this.input) {
            return
        }
        this.wrapper = this.input.parent();
        this.input.on("valuechange", function () {
            if (this.input.val().length) {
                this.show()
            } else {
                this.hide()
            }
        }, this);
        this.input.fire("valuechange")
    }, createHandle: function () {
        var D = _kissy.DOM.create("<span>", { id: "J_NickX" + this.uid, "class": "nickx", href: "javascript:void(0)" });
        this.wrapper.append(D);
        this.handle = _kissy.one("#J_NickX" + this.uid);
        if (!this.fixInterval) {
            this.fixInterval = _kissy.later(function () {
                if (this.isShow()) {
                    this.fix();
                    this.handle.show();
                    this.fixInterval.cancel()
                }
            }, 100, true, this)
        }
        if (!C) {
            _kissy.one(document).delegate("click", ".nickx", function (E) {
                this.input.val("");
                this.input[0].focus();
                this.hide()
            }, this);
            _kissy.one(window).on("resize", function () {
                this.fix()
            }, this)
        }
    }, fix: function () {
    }, show: function () {
        if (!this.handle) {
            this.createHandle()
        } else {
            this.handle.show()
        }
    }, hide: function () {
        if (this.handle) {
            this.handle.hide()
        }
    }, isShow: function () {
        return this.wrapper.width() && this.wrapper.height()
    }
    });
    return nickclear_core
});