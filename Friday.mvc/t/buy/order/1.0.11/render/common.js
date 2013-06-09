/*pub-1|2013-06-05 17:41:08*/
KISSY.add("order/render/common", function (b, c) {
    var a = "http://store." + (c.daily ? "daily.taobao.net" : "taobao.com") + "/shop/view_shop.htm?user_number_id={{userId}}";
    return { toMoney: function (e, d) {
        if ("number" !== e) {
            e = e - 0
        }
        if (!d) {
            e = e / 100
        }
        return isNaN(e) ? "" : e.toFixed(2)
    }, toHidden: function (f) {
        var e = f.value;
        e = (b.isNull(e) || b.isUndefined(e)) ? "" : e;
        var d = [f.id ? ('id="' + f.id + '"') : "", f.cls ? ('class="' + f.cls + '"') : "", 'name="' + f.name + '"', 'value="' + e + '"'];
        return '<input type="hidden" ' + d.join(" ") + "/>"
    }, toDog: function (d) {
        return '<span class="J_WangWang" data-nick="' + d + '" data-display="inline" data-icon="small"></span>'
    }, toBackCart: function (d) {
        var e = "http://cart." + (c.daily ? "daily.tmall.net" : "tmall.com") + "/cart/myCart.htm";
        return '<a data-mm="' + d + '" class="back-cart" href="' + e + '" title="\u8fd4\u56de\u8d2d\u7269\u8f66\u4fee\u6539" target="_self">\u8fd4\u56de\u8d2d\u7269\u8f66\u4fee\u6539</a>'
    }, toShopUrl: function (d) {
        return d ? a.replace("{{userId}}", d) : ""
    } 
    }
}, { requires: ["order/util"] }); 