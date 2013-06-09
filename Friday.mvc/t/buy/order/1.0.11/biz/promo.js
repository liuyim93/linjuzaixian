KISSY.add("order/biz/promo", function (d, j, i, c, g, a, h, e) {
    var f = d.mix({}, d.EventTarget);
    d.mix(f, { name: "promo", init: function (k) {
        var l = this;
        var m = false;
        d.each(j.query("div.order-promo-select", j.get(k) || "#J_orders"), function (o) {
            var q = g.fetch(o, "select");
            var n = c.find("order/" + j.attr(j.parent(o, "tr"), "data-order"));
            m = true;
            q.set("width", 108);
            q.on("change", function () {
                var r = this.get("value");
                if (r !== n._promoId) {
                    n.__promoId = r;
                    l.fire("change", { mainData: c.parent(n), orderData: n })
                }
            });
            n._promoId = q.get("value");
            var p = n.promos[q.get("selectedIndex")];
            e.moneyPoint(p.usePoint);
            b(o, p)
        });
        if (!m) {
            e.moneyPoint(false)
        }
    }, render: function (m) {
        var l = m.promos || [];
        var k = l.length;
        if (0 === k) {
            return "-"
        }
        return a.render({ cls: "order-promo-select", name: "bundleList_" + m.id }, l)
    } 
    });
    c.on("updateOrderData", function (k) {
        var l = k.data;
        var m = j.get("td.tube-promo", "#order" + l.id);
        j.html(m, f.render(l));
        g.make(m);
        f.init(m)
    });
    c.on("partError", function (k) {
        var l = k.data;
        if ("itemPromo" !== l.type) {
            return
        }
        var m = g.fetch(j.get("div.order-promo-select", "#order" + l.id), "select");
        m.set("value", c.find("order/" + l.id)._promoId)
    });
    function b(l, m) {
        if (!m.desc) {
            return
        }
        var k = j.create('<span class="promo-desc"></span>');
        j.insertAfter(k, l);
        new h({ type: "tip", node: k, content: m.desc, tip: true, arrow: "top" })
    }
    return f
}, { requires: ["dom", "event", "order/model", "order/util", "order/util/select", "order/util/feedback", "order/biz/point"] });