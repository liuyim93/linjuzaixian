KISSY.add("wangpu/decoration/shopmonitor", function (b, e) {
    var j = b.DOM,
        i = b.Event,
        f = b.UA;
    var c = window.g_hb_monitor_st || +new Date,
        h = -1,
        k = -1;
    var g = !!j.get("#shop-head");
    b.ready(function () {
        k = new Date - c
    });
    b.Event.on(window, "load", function () {
        h = new Date - c
    });

    function a() {
        var l = this;
        b.later(function () {
            if (window.goldlog) {
                l._init()
            } else {
                b.later(arguments.callee, 500)
            }
        }, 500)
    }
    function d(n, l) {
        var m = Math.floor(Math.random() * 100);
        if (m >= 0 && m <= n) {
            if (l) {
                l.call()
            }
            return true
        } else {
            return false
        }
    }
    b.augment(a, {
        _init: function () {
            var l = this;
            try {
                b.each(l._monitor_func_list, function (n) {
                    n.call(l)
                })
            } catch (m) {
                b.error(m)
            }
        },
        _monitor_func_list: [function () {
            var l = this;
            if (Math.floor(Math.random() * 20) === 10) {
                window.goldlog.emit("shop_monitor_mobile", {
                    mobile: f.mobile,
                    os: f.os,
                    ipad: f.ipad,
                    ipod: f.ipod,
                    iphone: f.iphone,
                    android: f.android
                })
            }
        }, function () {
            if (!window.thisShop) {
                return
            }
            var m = {};
            m.domReadyTime = k;
            m.onloadTime = h;

            function l() {
                m.shopId = window.shop_config.shopId;
                m.q75 = window.login_config.q75;
                m.UA = "";
                m.shopCategoryId = window.shop_config.shopCategoryId;
                m.extraTime = Boolean(window.g_hb_monitor_st);
                m.isNew = Boolean(j.get("#LineZing").attributes.isNew);
                m.isNewAndOld = Boolean(window.shop_config.isView);
                m.imgCount = document.getElementById("content").getElementsByTagName("img").length;
                m.moduleCount = j.query(".J_TModule").length;
                m.widgetCount = function () {
                    if (document.querySelectorAll) {
                        return document.body.querySelectorAll("[data-widget-type]").length
                    } else {
                        var n = 0;
                        b.each(j.query("*", "#content"), function (o) {
                            if (o.attributes["data-widget-type"]) {
                                n++
                            }
                        });
                        return n
                    }
                } ();
                m.Rank = function () {
                    if (j.get(".rank")) {
                        return j.get(".rank").src.replace("http://pics.taobaocdn.com/newrank/s_", "").replace(".gif", "")
                    } else {
                        return 0
                    }
                } ();
                window.goldlog.emit("shop_data_platform_image_q75", m)
            }
            b.ready(function () {
                window.setTimeout(l, 5000)
            })
        }, function () {
            if (!g && d(5)) {
                window.goldlog.emit("shop_constru", {
                    fisrtm: KISSY.DOM.attr("#bd .J_TModule", "data-componentid")
                })
            }
        } ]
    });
    return a
}, {
    requires: ["core"]
});