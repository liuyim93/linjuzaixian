KISSY.add("malldetail/other/itemDesc", function (_kissy_imp) {
    var _kissy = KISSY,
		_dom = _kissy.DOM;
    var _window = window;

    function B(_desc) {
        var _str_J_ItemDesc = "#J_ItemDesc";
        var _dom_id_J_ItemDesc = _kissy.get(_str_J_ItemDesc);
        var _dom_id_J_ItemDesc_clone;
        var I = /(<img[^>]*)(src *= *("[^"]*"|'[^']*'|[^ >]*))/g;
        var L = 0;
        var _spaceball = "http://l.tbcdn.cn/kissy/1.0.0/build/imglazyload/spaceball.gif";
        var M = "_q75.jpg";
        if (!_dom_id_J_ItemDesc) {
            return
        }
        _desc = _desc.replace(I, function (O, T, R, Q) {
            L++;
            if (_kissy_imp.cfg("detail").cdn75 && /img0[1-8]\.taobaocdn\.com/.test(Q)) {
                var S = Q.length;
                var P = Q.substr(S - 1);
                if (P == "'" || P == '"') {
                    Q = Q.substr(0, S - 1) + M + P
                } else {
                    Q += M
                }
            }
            return [T, 'src="' + _spaceball + '" data-ks-lazyload=', Q].join("")
        });
        if (_kissy.UA.IE) {
            _dom.html(_str_J_ItemDesc, _desc)
        } else {
            _dom_id_J_ItemDesc_clone = _dom_id_J_ItemDesc.cloneNode(false);
            _dom_id_J_ItemDesc_clone.innerHTML = _desc;
            _dom_id_J_ItemDesc.parentNode.replaceChild(_dom_id_J_ItemDesc_clone, _dom_id_J_ItemDesc);
            _dom_id_J_ItemDesc = _dom_id_J_ItemDesc_clone
        }
        _kissy_imp.use("malldetail/other/lazy", function (O, P) {
            P.addElements(_dom_id_J_ItemDesc)
        })
    }
    function _init(_itemDesc_config) {
        _itemDesc_config = _itemDesc_config || {};
        if (_kissy_imp.cfg("tag").isAsynDesc) {
            if (typeof _window.desc === "undefined") {
                setTimeout(arguments.callee, 100);
                return
            } else {
                B(_window.desc)
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