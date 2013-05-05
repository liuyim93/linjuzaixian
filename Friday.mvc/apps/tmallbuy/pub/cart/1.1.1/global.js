/*pub-1|2013-04-11 10:17:01*/
KISSY.add("cart/global", function (D, K, H, G) {
    var J = D.isPlainObject;
    var E = D.isArray;
    var F;
    var I = -1 == location.hostname.indexOf(".com");
    var C = "http://store." + (I ? "daily.taobao.net" : "taobao.com") + "/shop/view_shop.htm?user_number_id={{userId}}";
    var A = G.ie;
    if (A) {
        K.addClass(document.body, "ie-" + A)
    }
    var B = {
        mode: function () {
            var M = document.body;
            var L = /\bmode-(\w+)\b/.exec(M.className);
            if (L) {
                L = L[1]
            } else {
                L = "def";
                M.className = M.className + " mode-" + L
            }
            return L
        } (),
        setConfig: function (L) {
            F = L
        },
        getConfig: function (N) {
            if (N) {
                var M = N.split("/");
                var O = F;
                var L;
                while (L = M.shift()) {
                    if (J(O) && L in O) {
                        O = O[L]
                    } else {
                        return
                    }
                }
                return O
            }
            return F
        },
        promos: {},
        icons: {
            "xb-truth": '<a class="xb-truth" title="\u6d88\u8d39\u8005\u4fdd\u969c\u670d\u52a1\uff0c\u5356\u5bb6\u627f\u8bfa\u5546\u54c1\u5982\u5b9e\u63cf\u8ff0" target="_blank" href="http://www.taobao.com/go/act/315/xfzbz_rsms.php?ad_id=&am_id=130011830696bce9eda3&cm_id=&pm_id=">\u5982\u5b9e\u63cf\u8ff0</a>',
            "xb-auth": '<a class="xb-auth" title="\u6d88\u8d39\u8005\u4fdd\u969c\u670d\u52a1\uff0c\u5356\u5bb6\u627f\u8bfa\u5047\u4e00\u8d54\u4e09" target="_blank" href="http://www.taobao.com/go/act/315/xfzbz_jyps.php?ad_id=&am_id=1300118304240d56fca9&cm_id=&pm_id=">\u5047\u4e00\u8d54\u4e09</a>',
            "xb-return": '<a class="xb-return" title="\u6d88\u8d39\u8005\u4fdd\u969c\u670d\u52a1\uff0c\u5356\u5bb6\u627f\u8bfa7\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27" target="_blank" href="http://www.taobao.com/go/act/315/xbqt090304.php?ad_id=&am_id=130011831021c2f3caab&cm_id=&pm_id=">7\u5929\u9000\u6362</a>',
            "xb-thunder": '<a class="xb-thunder" title="\u5356\u5bb6\u627f\u8bfa\u4ed8\u6b3e\u540e1\u5c0f\u65f6\u5185\u53d1\u8d27" href="http://www.taobao.com/go/act/315/xfzbz_sdfh.php?ad_id=&am_id=13001183083c787ce2b4&cm_id=&pm_id=">\u95ea\u7535\u53d1\u8d27</a>',
            "xb-thunder-24": '<a class="xb-thunder" title="\u5356\u5bb6\u627f\u8bfa\u4ed8\u6b3e\u540e24\u5c0f\u65f6\u5185\u53d1\u8d27" href="http://www.taobao.com/go/act/315/xfzbz_sdfh.php?ad_id=&am_id=13001183083c787ce2b4&cm_id=&pm_id=">\u95ea\u7535\u53d1\u8d27</a>',
            "xb-guarantee": '<a class="xb-guarantee" title="\u6d88\u8d39\u8005\u4fdd\u969c\u670d\u52a1\uff0c\u5356\u5bb6\u627f\u8bfa30\u5929\u7ef4\u4fee" href="http://www.taobao.com/go/act/315/xfzbz_wx.php?ad_id=&am_id=13001183050ce2498755&cm_id=&pm_id=">30\u5929\u7ef4\u4fee</a>',
            "xb-zhijian": '<a class="xb-zhijian" title="\u5356\u5bb6\u627f\u8bfa\u7b2c\u4e09\u65b9\u8d28\u68c0" href="http://www.taobao.com/go/act/315/xb_20100707.php?ad_id=&am_id=1300268931aef04f0cdc&cm_id=&pm_id=#disanfang">\u7b2c\u4e09\u65b9\u8d28\u68c0</a>',
            "xb-guarantee-az": '<a class="xb-guarantee" title="\u5356\u5bb6\u627f\u8bfa\u914d\u9001\u5b89\u88c5" href="http://service.taobao.com/support/knowledge-1138450.htm">\u914d\u9001\u5b89\u88c5</a>',
            "xb-goldseller": '<a class="xb-goldseller" title="\u4f18\u8d28\u5e97\u94fa\uff0c\u54c1\u8d28\u4fdd\u8bc1\uff0c7\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27" target="_blank" href="http://www.taobao.com/go/act/315/you.php">\u6dd8\u5b9d\u91d1\u724c\u5356\u5bb6</a>',
            "3c": '<a title="\u7535\u5668\u57ce" class="icon-3c"></a>',
            xcard: '<a title="\u652f\u6301\u4fe1\u7528\u5361\u652f\u4ed8" class="icon-xcard"></a>',
            hitao: '<a title="\u55e8\u6dd8\u5546\u54c1" class="icon-hitao"></a>',
            cod: '<a title="\u8d27\u5230\u4ed8\u6b3e" class="icon-cod"></a>',
            trial: '<a title="{title}" class="icon-trial"></a>',
            energy: '<a class="icon-energy" title="\u6bcf\u4ef6\u53ef\u4eab\u53d7\u8282\u80fd\u8865\u8d34{fee}\u5143"></a>',
            delivery123: '<a class="icon-delivery123" title="123\u65f6\u6548\u670d\u52a1" target="_blank" href="http://www.tmall.com/go/act/tmall/wlsdfh.php"></a>',
            ju123: '<a class="icon-ju123" title="12.3\u8d8a\u805a\u8d8a\u5212\u7b97" target="_blank" href="http://ju.taobao.com/tg/home.htm?id={itemId}"></a>',
            preOfficial: '<a class="icon-preOfficial" title="10\u6708\u72c2\u6b22\u8282"></a>',
            preDown: '<a class="icon-preDown" title="5\u6298\u53ca\u4ee5\u4e0b"></a>',
            official: '<a class="icon-official" title="\u6b64\u5546\u54c1\u4e3a\u201c1111\u8d2d\u7269\u72c2\u6b22\u8282\u201d\u5b98\u65b9\u6d3b\u52a8\u5546\u54c1\uff0c11.11\u5f53\u5929\u4ef7\u683c\u4e3a\u8fd130\u5929\u6700\u4f18\u60e0\uff0c\u8bf7\u63d0\u524d\u5145\u503c\u5230\u652f\u4ed8\u5b9d"></a>',
            down: '<a class="icon-down" title="\u6b64\u5546\u54c1\u572811.11\u5f53\u5929\u4ee5\u4e13\u67dc\u4ef7\u4e94\u6298\u53ca\u4ee5\u4e0b\u4fc3\u9500\uff0c\u8bf7\u63d0\u524d\u5145\u503c\u5230\u652f\u4ed8\u5b9d"></a>'
        },
        isDaily: function () {
            return I
        },
        toMoney: function (L) {
            L = L - 0;
            return isNaN(L) ? "" : (L / 100).toFixed(2)
        },
        toHtml: function (L, M) {
            return L || M || ""
        },
        ww: function (L) {
            return L ? '<span class="m-ww"><span class="J_WangWang" data-icon="small" data-nick="' + L + '" data-display="inline"></span></span>' : ""
        },
        toShopUrl: function (L) {
            return L ? C.replace("{{userId}}", L) : ""
        },
        pointUrl: function (M) {
            var L = K.attr(M, "data-point-url");
            if (!L) {
                return
            }
            new Image().src = L + "&" + +new Date
        },
        Event: D.mix({}, D.EventTarget)
    };
    H.on(document.body, "click", function (L) {
        B.pointUrl(L.target)
    });
    return B
}, {
    requires: ["dom", "event", "ua"]
}); 