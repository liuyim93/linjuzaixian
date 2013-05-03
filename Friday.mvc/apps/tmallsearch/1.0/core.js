var ASSETS_SERVER, DEV_EV, SERVER_URL, V = "1.0",
	ALD_T = "20130117";
(function (f, j, d) {
    var h, g = "",
		k, l = location.host,
		i = d.get("#J_CoreJs"),
		a = i.src || "",
		c = j.createElement("a"),
		b = d.DOM.viewportWidth(),
		e = f.g_config = d.merge(f.g_config || {}, {
		    v: V
		});
    c.href = a;
    k = d.unparam(c.search.substring(c.search.lastIndexOf("?") + 1, c.search.length));
    f.LIST = f.LIST || {};
    LIST.msg = LIST.msg || d.mix({}, d.EventTarget);
    LIST.util = LIST.util || {};
    if (l.indexOf("local.") != -1) {
        DEV_EV = "local";
        h = "assets.local.tmall.net";
        SERVER_URL = "http://local.tmall.net";
        d.Config.debug = true
    } else {
        if (l.indexOf("demo.") != -1) {
            DEV_EV = "demo";
            h = "assets.demo.tmall.net";
            SERVER_URL = "http://demo.tmall.net"
        } else {
            if (l.indexOf("daily.") != -1) {
                DEV_EV = "daily";
                h = "assets.daily.taobao.net";
                SERVER_URL = "http://list.daily.tmall.net"
            } else {
                DEV_EV = "online";
                h = "l.tbcdn.cn";
                SERVER_URL = "http://list.tmall.com"
            }
        }
    }
    ASSETS_SERVER = c.host || h;
    if ("t" in k) {
        g = k.t
    }
    if ("v" in k) {
        V = e.v = k.v
    }
    ALD_T = e.aldt || ALD_T;
    d.config({
        packages: [{
            name: V,
            tag: g + (e.t || "20110706"),
            path: "http://" + ASSETS_SERVER + "/apps/tmallsearch/",
            charset: "gbk"
        }],
        map: d.Config.debug ? [
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
    if ((DEV_EV === "online" && location.href.indexOf("ks-debug") == -1) || typeof console === "undefined") {
        f.console = {
            log: function () { }
        }
    }
})(window, document, KISSY);