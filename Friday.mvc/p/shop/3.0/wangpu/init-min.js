﻿KISSY.add("wangpu/init", function (d) {
    KISSY.config("modules", {
        "wangpu/decoration/init": {
            requires: ["core", "switchable", "overlay", "wangpu/decoration/compatible", "wangpu/decoration/countdown", "datalazyload", "wangpu/decoration/isv"]
        },
        "wangpu/base": {
            requires: ["core", "overlay"]
        },
        "wangpu/mods/other/shop-factionswapper": {
            requires: ["core"]
        },
        "wangpu/mods/official/page-banner": {
            requires: ["core", "overlay"]
        },
        "wangpu/mods/official/shopinsearch-head": {
            requires: ["core"]
        },
        "wangpu/mods/official/top-list": {
            requires: ["core", "switchable", "overlay", "node"]
        },
        "wangpu/decoration/countdown": {
            requires: ["core"]
        },
        "wangpu/mods/official/customer-service": {
            requires: ["core", "cookie"]
        },
        "wangpu/decoration/compatible": {
            requires: ["core"]
        },
        "wangpu/mods/other/guest-youlike": {
            requires: ["core"]
        },
        "wangpu/mods/official/search-list": {
            requires: ["core"]
        },
        "wangpu/mods/official/recharge-center": {
            requires: ["core"]
        },
        "wangpu/mods/official/self-defined": {
            requires: ["core"]
        },
        "wangpu/mods/official/c2c-head": {
            requires: ["core", "overlay", "suggest"]
        },
        "wangpu/mods/official/recharge-alimama": {
            requires: ["core"]
        }
    });
    var b = {
        assetsHost: "http://a.tbcdn.cn",
        pageType: "wangpu",
        lazyContainers: "body",
        isvParams: {}
    }, a = {
        wangpu: ["c2c-head", "page-banner", "shopinsearch-head", "customer-service", "search-list", "top-list", "self-defined", "recharge-center", "recharge-alimama"],
        cdetail: ["page-banner", "shopinsearch-head", "customer-service", "top-list", "self-defined"],
        tmalldetail: ["page-banner", "shopinsearch-head", "customer-service", "top-list", "self-defined"],
        rate: ["c2c-head", "page-banner"]
    };
    var c = {
        init: function (g) {
            d.log("wangpu  init start");
            var k = (new Date()).getTime();
            var f = d.merge(b, g),
				j = [],
				e = [];
            KISSY.config({
                combine: true,
                packages: [{
                    name: "wangpu",
                    tag: "201301151318",
                    path: f.assetsHost + "/p/shop/3.0/",
                    charset: "utf-8"
                }]
            });
            j = a[f.pageType];
            e.push("wangpu/base");
            for (var h = 0; h < j.length; h++) {
                e.push("wangpu/mods/official/" + j[h])
            }
            e.push("wangpu/decoration/init");
            KISSY.use(e, function (i) {
                var l = i.makeArray(arguments).slice(1);
                i.ready(function (o) {
                    if (window.g_hb_monitor_st) {
                        var n = (new Date()).getTime();
                        o.log("wangpu  dom ready spend time ms:" + (n - window.g_hb_monitor_st))
                    }
                    var q = o.DOM,
						r = {};
                    o.each(l, function (s) {
                        p(s)
                    });

                    function p(s) {
                        if (s.type == "base") {
                            r = {
                                pageType: f.pageType,
                                mod: q.get("body")
                            };
                            new s(r)
                        } else {
                            if (s.type == "decoration") {
                                r = {
                                    pageType: f.pageType,
                                    lazyContainers: f.lazyContainers,
                                    isvParams: f.isvParams,
                                    mod: q.get("#content")
                                };
                                new s(r)
                            } else {
                                if (s.selector == "#shop-head") {
                                    new s({
                                        mod: q.get(s.selector)
                                    })
                                } else {
                                    o.each(q.query(s.selector, "#content"), function (t) {
                                        new s({
                                            mod: t
                                        })
                                    })
                                }
                            }
                        }
                    }
                    o.log("wangpu  init end");
                    var m = (new Date()).getTime();
                    o.log("wangpu  init spend time ms:" + (m - k))
                })
            })
        }
    };
    return c
});
if (window.shop_config) {
    KISSY.use("wangpu/init", function (b, a) {
        a.init({
            assetsHost: window.g_config.assetsHost,
            pageType: "wangpu",
            lazyContainers: "body",
            isvParams: window.shop_config ? window.shop_config.isvStat : {}
        })
    }, true)
};