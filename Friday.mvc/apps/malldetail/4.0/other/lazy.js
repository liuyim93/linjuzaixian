KISSY.add("malldetail/other/lazy", function (_kissy_imp, _datalazyload, _dom) {
    var _datalazyload_origin = new _datalazyload("#content", {
        mod: "manual",
        autoDestroy: false,
        diff: 150
    });
    return {
        addCallback: function (_item_selected, _fn) {
            setTimeout(function () {
                if (typeof _item_selected == "string") {
                    _item_selected = _dom.query(_item_selected)
                }
                if (!_item_selected || (_item_selected && _item_selected.length == 0)) {
                    return
                }
                _datalazyload_origin.addCallback(_item_selected, function () {
                    if (_dom.css(_item_selected, "display") == "none") {
                        return false
                    }
                    return _fn()
                })
            }, 0)
        },
        addElements: function (_els) {
            _datalazyload(_els, {
                diff: 200
            })
        },
        refresh: function () {
            _datalazyload_origin.refresh()
        }
    }
}, {
    requires: ["datalazyload", "dom"]
});