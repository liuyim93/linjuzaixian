KISSY.add("login/SafeEditTab", function (_kissy) {
    var SafeEditTab = function (_option) {
        this.input = _option.input && _kissy.one(_option.input);
        this.tabindex = Number(_option.tabindex) || 0
    };
    var SafeEditTab_Wrapper = function (_options) {
        return new SafeEditTab(_options)
    };
    _kissy.augment(SafeEditTab, { init: function () {
        if (!this.input || _kissy.UA.ie) {
            return this
        }
        this.input.attr("tabindex", this.tabindex);
        this.input.parent("object").removeAttr("tabindex");
        var _safeedittab = this, _node_input_id_TPL_username_1 = _kissy.one("#TPL_username_1");
        this.input[0].addEventListener("keypress", function (_event) {
            if (_event.keyCode == 9) {
                var F;
                if (_event.shiftKey) {
                    F = _safeedittab.prevSource(_safeedittab.input, _safeedittab.filter)
                } else {
                    F = _safeedittab.nextSource(_safeedittab.input, _safeedittab.filter)
                }
                if (F) {
                    F[0].focus()
                }
            }
        }, false)
    }, nextSource: function (_node_input_password_edit, F) {
        var E = _node_input_password_edit.first();
        if (!E) {
            E = _node_input_password_edit.next()
        }
        var D = _node_input_password_edit;
        while (!E && (D = D.parent())) {
            E = D.next()
        }
        if (!E) {
            return null
        }
        if (this.filter(E)) {
            return E
        }
        return this.nextSource(E, F)
    }, prevSource: function (G, F) {
        var E = _kissy.one(G[0].lastChild);
        if (!E) {
            E = G.prev()
        }
        var D = G;
        while (!E && (D = D.parent())) {
            E = D.prev()
        }
        if (!E) {
            return null
        }
        if (this.filter(E)) {
            return E
        }
        return this.prevSource(E, F)
    }, filter: function (D) {
        return D[0].nodeType == 1 && D[0].offsetHeight && D[0].offsetWidth && D.attr("tabindex") >= 0
    }
    });
    return SafeEditTab_Wrapper
});
