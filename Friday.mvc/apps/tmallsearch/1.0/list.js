KISSY.add(V + "/list", function (b, t, c, f) {
    var n = b.DOM,
		m = b.Event,
		a = window,
		e = b.get(".j_MinisiteDrop") || b.get("#J_MiniSiteDrop"),
		o = b.get("#J_ItemList"),
		p = b.query(".productImg", o),
		j = n.hasClass(o, "miniView"),
		h = !!n.hasAttr(b.get(".main"), "data-notSwitch"),
		g = b.get("#J_BtmSearch"),
		k = "btmSearch-loading",
		s = false,
		l = a.g_config.view;
    if (j && !h) {
        var u = function () {
            var v = "_160x160",
				i = "_b";
            o.className = o.className.replace(/miniView/g, "view");
            b.each(p, function (x) {
                var w = b.get("img", x),
					y = n.attr(w, "data-ks-lazyload");
                b.log(w.src);
                w.src ? w.src = w.src.replace(v, i) : n.attr(w, "data-ks-lazyload", y.replace(v, i))
            });
            s = true
        };
        l > 0 && u();
        LIST.msg.on("viewchange", function (i) {
            !s && i.view > 0 && u()
        })
    }
    f.setCfg({
        expand: true
    });
    for (var q = 0, r = arguments.length; q < r; q++) {
        var d = arguments[q];
        if (d && d.init) {
            d.init()
        }
    }
    t(o, {
        mod: "manual",
        diff: 500
    });
    LIST.msg.fire("ie6Hover", {
        classname: ["product", "productImg-wrap"]
    });
    new c().init();
    b.ready(function (v) {
        !!e && LIST.msg.fire("expand", {
            el: e,
            classname: "minisite"
        });
        if (g) {
            var i = t(g, {
                mod: "manual",
                execScript: false
            });
            i.addCallback(g, function () {
                n.removeClass(g, k);
                v.use(V + "/mods/btm-search", function (x, w) {
                    w && w.init()
                })
            })
        }
    })
}, {
    requires: ["datalazyload", "./mods/p4p", "./mods/dsr", "./mods/ald", "./mods/crumb", "./mods/attr", "./mods/album", "./mods/filter", "./mods/item-sku", "./mods/product", "./mods/list-view", "./mods/ald03046", "./mods/smc", "./mods/error", "./mods/target", "./mods/minisite", "./mods/accessorie"]
}); 