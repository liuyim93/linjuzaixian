KISSY.add("2.0/fav", function (_kissy, _dom, _event, _datalazyload, _item, _collect) {
    var _dom = _kissy.DOM,
		_event = _kissy.Event,
		_dom_id_J_BrandTagForm = _kissy.get("#J_BrandTagForm");

    function Fav() {
        new _item();
        new _collect({
            callback: function () {
                location.hash = "newBrand";
                var _url = location.search;
                if (_url.charAt(0) == "?") {
                    _url = _url.substring(1, _url.length)
                }
                _url = _kissy.unparam(_url);
                _url.cache = +new Date;
                location.search = _kissy.param(_url)
            }
        });
        _event.on(".j_PageChange", "click", function (_e) {
            _e.halt();
            var _data_page = _dom.attr(this, "data-page") || "";
            _dom_id_J_BrandTagForm.page.value = _data_page;
            _dom_id_J_BrandTagForm.submit()
        });
        _event.on(".j_PageChangeBtn", "click", function (_e) {
            _e.halt();
            var J = _dom.val(".j_PageChangeInput");
            _dom_id_J_BrandTagForm.page.value = J;
            _dom_id_J_BrandTagForm.submit()
        });
        _datalazyload({
            mod: "manual",
            diff: 100
        });
        _kissy.getScript("http://a.tbcdn.cn/apps/tmall/mui/backtop/js/backtop.js")
    }
    return Fav
}, {
    requires: ["dom", "event", "datalazyload", "2.0/mods/item", "2.0/mods/collect"]
});