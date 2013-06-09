/*pub-1|2013-06-05 17:41:04*/
KISSY.add("order/biz/amount", function (d, i, h, b, e) {
    var f = d.mix({}, d.EventTarget);
    d.mix(f, { name: "amount", init: function () {
        var j = this;
        d.each(i.query("div.fn-amount"), function (k) {
            var l = i.get("input", k);
            h.on(l, "keyup", function () {
                g(k, 0)
            });
            g(k, 0)
        })
    }, plus: function (j) {
        if (i.hasClass(j, "plus-off")) {
            return
        }
        g(i.parent(j, "div.fn-amount"), 1)
    }, minus: function (j) {
        if (i.hasClass(j, "minus-off")) {
            return
        }
        g(i.parent(j, "div.fn-amount"), -1)
    }, render: function (l) {
        var j = l.amount.now;
        var k = '<div class="fn-amount" data-order="' + l.id + '">';
        if (b.get("isBuyNow")) {
            k += '<span class="minus" data-evt="biz/amount:minus" data-mm="tmalljy.2.6?action=minus_num"></span>';
            k += '<input type="text" class="text amount" value="' + j + '" />';
            k += '<span class="plus" data-evt="biz/amount:plus" data-mm="tmalljy.2.6?action=add_num"></span>'
        } else {
            k += j
        }
        return k + "</div>"
    } 
    });
    function g(r, o) {
        var k = i.get("input", r);
        if (!k) {
            return
        }
        var m = b.find("order/" + i.attr(r, "data-order"));
        var l = m.amount;
        var p = l.now;
        var q = d.trim(k.value);
        if (!q.match(/^[1-9]\d*$/)) {
            q = p
        } else {
            q = q - 0 + o
        }
        a(r);
        var j = m._maxAmount;
        var n = j.val;
        if (n <= q) {
            c(r, "stock" === j.type ? "\u6700\u591a\u53ea\u80fd\u8d2d\u4e70" + n + "\u4ef6" : "\u8be5\u5546\u54c1\u9650\u8d2d" + n + "\u4ef6");
            q = n
        }
        i[1 == q ? "addClass" : "removeClass"](i.get("span.minus", r), "minus-off");
        i[n <= q ? "addClass" : "removeClass"](i.get("span.plus", r), "plus-off");
        k.value = q;
        l.__now = q;
        if (p !== q) {
            f.fire("change", { mainData: b.parent(m), orderData: m })
        }
    }
    function c(k, l, j) {
        i.append(i.create('<div class="tip"></div>', { html: '<em class="' + (j || "err") + '">' + l + "</em>" }), k)
    }
    function a(j) {
        i.remove(i.query("div.tip", j))
    }
    b.on("fillOrderData", function (j) {
        var k = j.data;
        var l = k.amount;
        var m = { val: l.max, type: "stock" };
        if (l.limit && l.limit < l.max) {
            m.val = l.limit;
            m.type = "limit"
        }
        k._maxAmount = m
    });
    b.on("updateOrderData", function (j) {
        var k = j.data;
        i.html(i.get("td.tube-sum", "#order" + k.id), e.toSum(k))
    });
    b.on("beforeUpdateOrderData", function (j) {
        var k = j.data.amount;
        if (k.__now) {
            k.now = k.__now;
            delete k.__now
        }
    });
    b.on("partError", function (j) {
        var l = j.data;
        if ("num" !== l.type) {
            return
        }
        var k = i.get("input.amount", "#order" + l.id);
        if (k) {
            k.value = b.find("order/" + l.id).amount.now;
            g(k.parentNode, 0)
        }
    });
    return f
}, { requires: ["dom", "event", "order/model", "order/render/order"] }); 