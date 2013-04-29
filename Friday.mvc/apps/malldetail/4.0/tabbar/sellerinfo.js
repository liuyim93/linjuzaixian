/*pub-1|2013-01-06 16:13:22*/
KISSY.add("malldetail/tabbar/sellerinfo", function (_kissy_imp) {
    var _kissy = KISSY,
		_dom = _kissy.DOM,
		_event = _kissy.Event,
		_str_callback = "TShop.mods.SellerInfo.callback",
		_str_selected = "selected",
		_dom_id_J_SellerInfo;
    var _is_inited = false;

    function _init() {
        if (!_is_inited && (_dom_id_J_SellerInfo = _kissy.get("#J_SellerInfo"))) {
            _is_inited = true;
            _load()
        }
    }
    function _load() {
        if (!_is_inited) {
            return _init()
        }
        var _data_url = _dom.attr(_dom_id_J_SellerInfo, "data-url");
        if (_data_url) {
            _kissy.use("ajax", function (_kissy_imp_1, _ajax) {
                _ajax = _ajax || _kissy_imp_1.io;
                _ajax({
                    url: _data_url,
                    dataType: "jsonp",
                    jsonpCallback: "jsonpSellerInfo",
                    success: function (_results) {
                        _dom_id_J_SellerInfo.innerHTML += _results[0];
                        var _dom_array_class_J_RateInfoTrigger = _kissy_imp_1.query("#J_sellerRateInfo .J_RateInfoTrigger");
                        _event.on(_dom_array_class_J_RateInfoTrigger, "mouseover", function () {
                            _dom.removeClass(_dom_array_class_J_RateInfoTrigger, _str_selected);
                            _dom.addClass(this, _str_selected)
                        });
                        if (_kissy_imp.mods.TabBar && _kissy_imp.mods.TabBar.curIndex() == "description") {
                            _kissy_imp.sendAcAtpanel("tmalldetail.4.3")
                        }
                    }
                })
            })
        }
    }
    var _sellerInfo = {
        init: _init,
        load: _load
    };
    _kissy_imp.mods.SellerInfo = _sellerInfo
});