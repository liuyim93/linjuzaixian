/*pub-1|2013-06-05 17:41:08*/
KISSY.add("order/biz/shoppromo", function (f, j, i, c, d, g, a, h) {
    var e = f.mix({}, f.EventTarget);
    f.mix(e, { name: "shoppromo", init: function (k) {
        var l = this;
        f.each(j.query("div.bundle-promo-select", j.get(k) || "#J_orders"), function (m) {
            var n = c.find("bundle/" + j.attr(j.parent(m, "div.bundle-promo"), "data-bundle"));
            var p = g.fetch(m, "select");
            p.set("width", 127);
            p.on("change", function () {
                var q = this.get("value");
                if (n._promoId !== q) {
                    n.__promoId = q;
                    l.fire("change", { bundleData: n })
                }
            });
            var o = n.promos[p.get("selectedIndex")];
            n._promoId = o.value;
            n._promoFee = o.discount;
            j.html(j.get("strong", j.next(m, "span.promo-discount")), d.toMoney(o.discount));
            b(m, o)
        })
    }, render: function (l) {
        var k = l.promos || [];
        if (!k.length) {
            return ""
        }
        var m = l.id;
        return "\u5e97\u94fa\u4f18\u60e0\uff1a" + a.render({ name: "bundleList_" + m, cls: "bundle-promo-select", bundle: m }, k) + '<span class="promo-discount">-<span class="rmb">&yen;</span><strong>0.00</strong></span>'
    } 
    });
    function b(l, m) {
        if (!m.desc) {
            return
        }
        var k = j.create('<span class="promo-desc"></span>');
        j.insertAfter(k, l);
        new h({ type: "tip", node: k, content: m.desc, tip: true, arrow: "top" })
    }
    c.on("updateBundleData", function (k) {
        var m = k.data;
        var l = j.get("#shoppromo" + m.id);
        j.html(l, e.render(m));
        g.make(l);
        e.init(l)
    });
    c.on("partError", function (k) {
        var l = k.data;
        if ("shopPromo" !== l.type) {
            return
        }
        var m = g.fetch(j.get("div.bundle-promo-select", "#shoppromo" + l.id), "select");
        m.set("value", c.find("bundle/" + l.id)._promoId)
    });
    return e
}, { requires: ["dom", "event", "order/model", "order/render/common", "order/util", "order/util/select", "order/util/feedback"] }); /*pub-1|2013-06-05 17:41:03*/
