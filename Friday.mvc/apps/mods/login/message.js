KISSY.add("login/message", function (_kissy) {
    var _message = null;
    var Message = function () {
        if (_message) {
            return _message
        } else {
            _message = this
        }
        this.wrap = _kissy.one("#J_Message");
        this.el = this.wrap.one("p");
        this._init()
    };
    _kissy.augment(Message, { _init: function () {
        if (!this.wrap || !this.content) {
            return
        }
        return this
    }, show: function (D, G) {
        var F = this.el, E = this.wrap;
        if (!F || !E) {
            return
        }
        F.html(D)[0].className = G || "error";
        E.show()
    }, hide: function () {
        if (!this.wrap) {
            return
        }
        this.wrap.hide()
    }, _highlighted: [], highlight: function (D) {
        _kissy.one(D).addClass("highlight");
        this._highlighted.push(D)
    }, clearHighlights: function () {
        try {
            this._highlighted.forEach(function (_element_highlighting) {
                Dom.removeClass(_element_highlighting, "highlight")
            })
        } catch (D) {
        }
        this._highlighted.length = 0
    }, reset: function () {
        this.hide();
        this.clearHighlights()
    }
    });
    return Message
});