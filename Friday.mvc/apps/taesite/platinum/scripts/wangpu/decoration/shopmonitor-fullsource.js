KISSY.add("wangpu/decoration/shopmonitor", function (S, Core) {
    var DOM = S.DOM, Event = S.Event, UA = S.UA;
    var beginTime = window.g_hb_monitor_st || +new Date, onloadTime = -1, domReadyTime = -1;
    var isOldShop = !!DOM.get("#shop-head");
    S.ready(function () {
        domReadyTime = new Date - beginTime
    });
    S.Event.on(window, "load", function () {
        onloadTime = new Date - beginTime
    });
    function ShopMonitor() {
        var self = this;
        S.later(function () {
            if (window.goldlog) {
                self._init()
            } else {
                S.later(arguments.callee, 500)
            }
        }, 500)
    }
    function rate(percent, cbk) {
        var seed = Math.floor(Math.random() * 100);
        if (seed >= 0 && seed <= percent) {
            if (cbk) {
                cbk.call()
            }
            return true
        } else {
            return false
        }
    }
    S.augment(ShopMonitor, { _init: function () {
        var self = this;
        try {
            S.each(self._monitor_func_list, function (func) {
                func.call(self)
            })
        } catch (e) {
            S.error(e)
        }
    }, _monitor_func_list: [function () {
        var self = this;
        if (Math.floor(Math.random() * 20) === 10) {
            window.goldlog.emit("shop_monitor_mobile", { mobile: UA.mobile, os: UA.os, ipad: UA.ipad, ipod: UA.ipod, iphone: UA.iphone, android: UA.android })
        }
    }, function () {
        if (!window.thisShop) {
            return
        }
        var Obj = {};
        Obj.domReadyTime = domReadyTime;
        Obj.onloadTime = onloadTime;
        function emit() {
            Obj.shopId = window.shop_config.shopId;
            Obj.q75 = window.login_config.q75;
            Obj.UA = "";
            Obj.shopCategoryId = window.shop_config.shopCategoryId;
            Obj.extraTime = Boolean(window.g_hb_monitor_st);
            Obj.isNew = Boolean(DOM.get("#LineZing").attributes["isNew"]);
            Obj.isNewAndOld = Boolean(window.shop_config.isView);
            Obj.imgCount = document.getElementById("content").getElementsByTagName("img").length;
            Obj.moduleCount = DOM.query(".J_TModule").length;
            Obj.widgetCount = function () {
                if (document.querySelectorAll) {
                    return document.body.querySelectorAll("[data-widget-type]").length
                } else {
                    var count = 0;
                    S.each(DOM.query("*", "#content"), function (el) {
                        if (el.attributes["data-widget-type"]) {
                            count++
                        }
                    });
                    return count
                }
            } ();
            Obj.Rank = function () {
                if (DOM.get(".rank")) {
                    return DOM.get(".rank").src.replace("http://pics.taobaocdn.com/newrank/s_", "").replace(".gif", "")
                } else {
                    return 0
                }
            } ();
            window.goldlog.emit("shop_data_platform_image_q75", Obj)
        }
        S.ready(function () {
            window.setTimeout(emit, 5E3)
        })
    }, function () {
        if (!isOldShop && rate(5)) {
            window.goldlog.emit("shop_constru", { fisrtm: KISSY.DOM.attr("#bd .J_TModule", "data-componentid") })
        }
    } ]
    });
    return ShopMonitor
}, { requires: ["core"] });
