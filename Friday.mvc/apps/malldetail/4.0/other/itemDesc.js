KISSY.add("malldetail/other/itemDesc", function (_kissy_imp) {
    var _kissy = KISSY,
		_dom = _kissy.DOM;
    var _window = window;

    function _add_desc_lazy(_desc) {
        var _str_J_ItemDesc = "#J_ItemDesc";
        var _dom_id_J_ItemDesc = _kissy.get(_str_J_ItemDesc);
        var _dom_id_J_ItemDesc_clone;
        var _regex = /(<img[^>]*)(src *= *("[^"]*"|'[^']*'|[^ >]*))/g;
        var _image_count = 0;
        var _spaceball = "http://120.192.31.164:7525/Images/spaceball.gif";
        var _q75_prefix = "_q75.jpg";
        if (!_dom_id_J_ItemDesc) {
            return
        }
        _desc = _desc.replace(_regex, function (_wholeMatched, _imgMatched, _srcMatched, _srcStrippedMatched) {
            _image_count++;
            if (_kissy_imp.cfg("detail").cdn75 && /img0[1-8]\.taobaocdn\.com/.test(_srcStrippedMatched)) {
                var _srcStrippedMatched_len = _srcStrippedMatched.length;
                var _the_last_char = _srcStrippedMatched.substr(_srcStrippedMatched_len - 1);
                if (_the_last_char == "'" || _the_last_char == '"') {
                    _srcStrippedMatched = _srcStrippedMatched.substr(0, _srcStrippedMatched_len - 1) + _q75_prefix + _the_last_char
                } else {
                    _srcStrippedMatched += _q75_prefix
                }
            }
            return [_imgMatched, 'src="' + _spaceball + '" data-ks-lazyload=', _srcStrippedMatched].join("")
        });
        if (_kissy.UA.IE) {
            _dom.html(_str_J_ItemDesc, _desc)
        } else {
            _dom_id_J_ItemDesc_clone = _dom_id_J_ItemDesc.cloneNode(false);
            _dom_id_J_ItemDesc_clone.innerHTML = _desc;
            _dom_id_J_ItemDesc.parentNode.replaceChild(_dom_id_J_ItemDesc_clone, _dom_id_J_ItemDesc);
            _dom_id_J_ItemDesc = _dom_id_J_ItemDesc_clone
        }
        _kissy_imp.use("malldetail/other/lazy", function (O, _malldetail_other_lazy) {
            _malldetail_other_lazy.addElements(_dom_id_J_ItemDesc)
        })
    }
    function _init(_itemDesc_config) {
        _itemDesc_config = _itemDesc_config || {};
        if (_kissy_imp.cfg("tag").isAsynDesc) {
            if (typeof _window.desc === "undefined") {
                setTimeout(arguments.callee, 100);
                return
            } else {
                _add_desc_lazy(_window.desc)
            }
            _itemDesc_config.success && _itemDesc_config.success()
        }
        var _valFlashUrl = _kissy_imp.cfg("valFlashUrl");
        if (_valFlashUrl) {
            _kissy.use("malldetail/other/flashplayer", function (_v) {
                _v.TmdFlv.init(_valFlashUrl)
            })
        }
    }
    return {
        init: function (_itemDesc_config) {
            _init(_itemDesc_config)
        }
    }
}); 