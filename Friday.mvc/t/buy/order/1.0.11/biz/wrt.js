KISSY.add("order/biz/wrt", function (e, k, j, c, g, d, i) {
    var h;
    var b;
    var f;
    var a = { toAttention: function () {
        h = c.get("_addrData").mobi || "";
        var l = '<div id="wrtRemind" class="wrt-remind' + (h ? "" : " wrt-remind-modify wrt-remind-empty") + '">';
        l += '<span class="wrt-hd">' + (h ? "\u5c3e\u6b3e\u652f\u4ed8\u4fe1\u606f\u901a\u77e5\u53f7\u7801" : "\u5f53\u524d\u6536\u8d27\u5730\u5740\u65e0\u6709\u6548\u624b\u673a\u53f7\u7801\uff0c\u8bf7\u8f93\u5165\u5c3e\u6b3e\u652f\u4ed8\u4fe1\u606f\u901a\u77e5\u53f7\u7801") + "\uff1a</span>";
        l += '<input class="presellPhone" name="presellPhone" type="hidden" value="' + h + '" />';
        l += '<span class="wrt-mobi">' + (h || '<input type="text" />') + "</span>";
        l += '<a class="modifyPhone" data-evt="biz/wrt:modifyPhone">\u4fee\u6539\u53f7\u7801</a>';
        l += '<a class="modifyOk" data-evt="biz/wrt:modifyOk">\u786e\u8ba4</a>';
        l += '<a class="modifyCancel" data-evt="biz/wrt:modifyCancel">\u53d6\u6d88</a>';
        return l + "</div>"
    }, modifyPhone: function (n) {
        var m = k.get("#wrtRemind");
        var l = k.get("span.wrt-mobi", m);
        k.html(l, '<input type="text" value="' + h + '" />');
        k.addClass(m, "wrt-remind-modify");
        k.get("input", l).select()
    }, modifyOk: function (o) {
        var m = k.get("#wrtRemind");
        var l = k.get("span.wrt-mobi", m);
        var n = k.get("input", l);
        var p = e.trim(k.val(n));
        if (!p.match(/^\d{11}$/)) {
            if (!b) {
                b = new i({ type: "error", arrow: "top", tip: false })
            }
            b.set("node", n.parentNode).set("content", "\u8bf7\u6b63\u786e\u8f93\u516511\u4f4d\u624b\u673a\u53f7\u7801").show();
            return
        }
        h = p;
        l.innerHTML = p;
        b && b.hide();
        k.get("input.presellPhone", m).value = p;
        k.get("span.wrt-hd", m).innerHTML = "\u5c3e\u6b3e\u652f\u4ed8\u4fe1\u606f\u901a\u77e5\u53f7\u7801\uff1a";
        k.removeClass(m, "wrt-remind-modify wrt-remind-empty")
    }, modifyCancel: function (n) {
        var m = k.get("#wrtRemind");
        var l = k.get("span.wrt-mobi", m);
        l.innerHTML = h;
        b && b.hide();
        k.removeClass(m, "wrt-remind-modify")
    }, renderAgreeTip: function () {
        g.notify("wrtAgree", false);
        f = null;
        var l = c.get("subMode");
        var m = "\u540c\u610f\u652f\u4ed8\u5b9a\u91d1";
        if ("fullPay" === l) {
            c.on("updateOrderData", function (o) {
                k.html("#agreeWrtDj", d.toMoney(o.data.price.prepay))
            });
            var n;
            c.find("order", function (o) {
                n = d.toMoney(o.price.prepay)
            });
            m = '\u5b9e\u4ed8\u6b3e\u542b\u5b9a\u91d1<span class="incDj">&yen; <label id="agreeWrtDj">' + n + "</label> (\u4e0d\u53ef\u9000)</span>\uff0c\u786e\u8ba4\u652f\u4ed8"
        }
        return '<span class="wrt-agree"><input id="agreePayDJ" type="checkbox" data-evt="biz/wrt:agreePayDJ"/><label for="agreePayDJ">' + m + "</label></span>"
    }, agreePayDJ: function (l) {
        var m = l.checked;
        g.notify("wrtAgree", m);
        if (m) {
            if (!f) {
                f = new i({ type: "attention", node: l.parentNode, content: '<p class="red"><ins></ins>\u5b9a\u91d1\u6055\u4e0d\u9000\u8fd8</p><p><ins></ins>\u9884\u552e\u5546\u54c1\u4e0d\u652f\u63017\u5929\u65e0\u7406\u7531\u9000\u6362\u8d27</p><p><ins></ins><a href="http://service.tmall.com/support/tmall/knowledge-5215992.htm">\u66f4\u591a\u89c4\u5219</a></p>', tip: false })
            }
            return f.show()
        }
        f && f.hide()
    } 
    };
    return a
}, { requires: ["dom", "event", "order/model", "order/biz/go", "order/render/common", "order/util/feedback"] }); 