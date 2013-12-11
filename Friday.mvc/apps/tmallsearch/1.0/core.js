var ASSETS_SERVER, DEV_EV, SERVER_URL, V = "1.0",
	ALD_T = "20130117";
(function (_window, _document, _kissy_d) {
    var _url, _timestamp = "",
		_param_map, _location_host = location.host,
		_dom_script_id_J_CoreJs = _kissy_d.get("#J_CoreJs"),
		_corejs_script_src = _dom_script_id_J_CoreJs.src || "",
		_dom_a = _document.createElement("a"),
		_viewportWidth = _kissy_d.DOM.viewportWidth(),
		_g_config = _window.g_config = _kissy_d.merge(_window.g_config || {}, {
		    v: V
		});
    _dom_a.href = _corejs_script_src;
    _param_map = _kissy_d.unparam(_dom_a.search.substring(_dom_a.search.lastIndexOf("?") + 1, _dom_a.search.length));
    _window.LIST = _window.LIST || {};
    LIST.msg = LIST.msg || _kissy_d.mix({}, _kissy_d.EventTarget);
    LIST.util = LIST.util || {};
    /*
    if (_location_host.indexOf("local.") != -1) {
    DEV_EV = "local";
    _url = "assets.local.tmall.net";
    SERVER_URL = "http://local.tmall.net";
    _kissy_d.Config.debug = true
    } else {
    if (_location_host.indexOf("demo.") != -1) {
    DEV_EV = "demo";
    _url = "assets.demo.tmall.net";
    SERVER_URL = "http://demo.tmall.net"
    } else {
    if (_location_host.indexOf("daily.") != -1) {
    DEV_EV = "daily";
    _url = "assets.daily.taobao.net";
    SERVER_URL = "http://list.daily.tmall.net"
    } else {
    DEV_EV = "online";
    _url = "l.tbcdn.cn";
    SERVER_URL = "http://list.tmall.com"
    }
    }
    }
    */
    //2013-05-14 basilwang use our own
    _url = "http://www.linjuzaixian.com/";
    ASSETS_SERVER = _dom_a.host || _url;
    if ("t" in _param_map) {
        _timestamp = _param_map.t
    }
    if ("v" in _param_map) {
        V = _g_config.v = _param_map.v
    }
    ALD_T = _g_config.aldt || ALD_T;
    _kissy_d.config({
        packages: [{
            name: V,
            tag: _timestamp + (_g_config.t || "20110706"),
            path: "http://" + ASSETS_SERVER + "/apps/tmallsearch/",
            charset: "gbk"
        }],
        map: _kissy_d.Config.debug ? [
			[/(.+\/tmallsearch\/.+)-min.js(.*)$/, "$1.js$2"]
		] : [
			[/(.+\/kissy\/.+)(?:datalazyload|template|sizzle)-min.js(.+)$/, "http://l.tbcdn.cn/s/kissy/1.2.0/??datalazyload-min.js,template-min.js,sizzle-min.js"],
			[/(.+\/tmallsearch\/.+)spu\/spu-min.js(.*)$/, "$1??mods/filter.js,mods/dsr.js,spu/spu.js$2"],
			[/(.+\/tmallsearch\/).+\/list-min.js(.*)$/, "$1" + V + "/??mods/ald.js,mods/crumb.js,mods/filter.js,mods/dsr.js,mods/p4p.js,mods/attr.js,mods/item-sku.js,mods/product.js,mods/list-view.js,mods/ald03046.js,mods/smc.js,mods/error.js,mods/target.js,mods/minisite.js,mods/accessorie.js,city-codes.js,mods/album.js,list.js$2"],
			[/(.+\/tmallsearch\/).+\/shop-item-min.js(.*)$/, "$1" + V + "/??mods/crumb.js,mods/attr.js,mods/filter.js,mods/dsr.js,shop-item.js$2"],
			[/(.+\/tmallsearch\/).+\/shop-min.js(.*)$/, "$1" + V + "/??mods/crumb.js,mods/attr.js,mods/filter.js,mods/dsr.js,mods/p4p.js,shop.js$2"],
			[/(.+\/tmallsearch\/).+\/(?:featureguider|spotlight|local-storage)-min.js(.*)$/, "$1" + V + "/widget/??spotlight.js,local-storage.js,featureguider.js$2"],
			[/(.+\/tmallsearch\/.+)-min.js(.*)$/, "$1.js$2"],
			[/(.+\/tmallsearch\/.+)-min.css(.*)$/, "$1.css$2"]
		]
    });
    //2013-08-21 basilwang add for tmall/mui/brandbar
     _kissy_d.config(
        { map:
           [
           ],
            packages: [{ name: "tmall", charset: "gbk", path: "../apps/", tag: _timestamp}]
        }
         );
    if ((DEV_EV === "online" && location.href.indexOf("ks-debug") == -1) || typeof console === "undefined") {
        _window.console = {
            log: function () { }
        }
    }
})(window, document, KISSY);