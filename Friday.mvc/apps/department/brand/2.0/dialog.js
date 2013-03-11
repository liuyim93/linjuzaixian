KISSY.add("2.0/mods/dialog", function (_kissy, _dom, _event, _overlay) {

    var _default_options = {
        width: 300,
        height: 110,
        type: "ok",
        bodyTpl: '<div class="brandMsgTips"><div class="ui-msg ui-top-tip ui-msg-clean"><div class="ui-msg-con ui-msg-{type}">{text}<s class="ui-msg-icon"></s></div></div></div>',
        content: "",
        confirm: false,
        closeCallBack: new Function(),
        callback: new Function()
    };

    function Dialog(_opts) {
        var _options = _kissy.merge(_default_options, _opts || {}),
			I = _kissy.substitute(_options.bodyTpl, {
			    type: _options.type,
			    text: _options.content
			}),
			_dialog;
        if (_options.confirm) {
            var M = _dom.create('<a class="ui-btn-l" href="">\u5426</a>'),
				L = _dom.create('<a class="ui-btn-l-primary" href="">\u662f</a>'),
				H = _dom.create('<p class="brandMsgTips-btn"></p>');
            _dom.append(L, H);
            _dom.append(M, H);
            I = _dom.create(I);
            _dom.append(H, I)
        }
        _dialog = new _overlay.Dialog({
            elCls: "brandTipsDialog",
            width: _options.width,
            height: _options.height,
            skin: "gray",
            closeAction: "destroy",
            elStyle: {
                position: _kissy.UA.ie == 6 ? "absolute" : "fixed"
            },
            zIndex: 9999999,
            headerContent: "",
            bodyContent: I,
            showCat: false,
            mask: true,
            align: {
                points: ["cc", "cc"]
            }
        });
        this.el = _dialog;
        _dialog.render();
        _dialog.show();
        if (_options.closeCallBack && typeof _options.closeCallBack == "function") {
            _dialog.on("destroy", function () {
                _options.closeCallBack()
            })
        }
        if (_options.confirm) {
            _event.on(M, "click", function (N) {
                N.halt();
                _dialog.hide()
            });
            _event.on(L, "click", function (N) {
                N.halt();
                _dialog.hide();
                _options.callback()
            })
        }
    }
    return Dialog
}, {
    requires: ["dom", "event", "tml/overlay", "tml/overlay/css/overlay.css"]
});
