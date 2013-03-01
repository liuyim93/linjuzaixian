KISSY.add("login/moduleswitch", function (_kissy) {
    var _event = _kissy.Event, G = "dynamic", H = "quick", E = "static", C = "module-dynamic", F = "module-quick", B = "module-static";
    var ModuleSwitch = function (_dom_div_id_J_LoginBox, K) {
        if (!(this instanceof ModuleSwitch)) {
            return new ModuleSwitch(cfg)
        }
        this.elDynamicForm = _kissy.one(K);
        this.elLoginBox = _kissy.one(_dom_div_id_J_LoginBox);
        this.init()
    };
    _kissy.augment(ModuleSwitch, _event.Target, { init: function () {
        var _moduleswitch = this;
        _kissy.each(["#J_VisitorLink_2", "#J_StaticLink", "#J_Quick2Static"], function (K) {
            _event.on(K, "click", function (L) {
                L.halt();
                _moduleswitch.switchTo(E)
            })
        });
        _kissy.each(["#J_VisitorLink_1", "#J_DynamicLink"], function (K) {
            _event.on(K, "click", function (L) {
                L.halt();
                _moduleswitch.switchTo(G)
            })
        })
    }, switchTo: function (J) {
        var L = this, K = L.elDynamicForm[0];
        switch (J) {
            case E:
                this.fire("switch", E);
                this.elLoginBox.addClass(B).removeClass(F).removeClass(C);
                break;
            case G:
                this.fire("switch", G);
                this.elLoginBox.addClass(C).removeClass(B).removeClass(F);
                K.elements.TPL_mobilephone.value = "";
                K.elements.TPL_PhoneCode.value = "";
                break;
            case H:
                this.fire("switch", H);
                this.elLoginBox.addClass(F).removeClass(B).removeClass(C);
                break
        }
    }
    });
    return ModuleSwitch
});