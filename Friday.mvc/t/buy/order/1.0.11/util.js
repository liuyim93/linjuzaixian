/*pub-1|2013-06-05 17:41:08*/
KISSY.add("order/util", function (c, k, j, i, a, e, f) {
    var b = {};
    var g = { select: a, counter: f, feedback: i, inputmask: e };
    var h = { daily: location.hostname.indexOf(".daily.") > -1, make: function (l) {
        c.each(k.query(".fn-util", k.get(l) || document.body), function (o) {
            var p = o.className.match(/\bfn-(?!util)(\w+)\b/);
            if (p) {
                var m = p[1];
                var n = d(o) + "/" + m;
                if (b[n]) {
                    return
                }
                b[n] = new g[m](o)
            }
        })
    }, fetch: function (m, l) {
        m = k.get(m);
        return m ? b[d(m) + "/" + l] : null
    }, getOrderId: function (l) {
        return k.attr(k.parent(l, "tr.grid-order"), "data-order")
    }, getBundleId: function (l) {
        return k.attr(k.parent(l, "tr.grid-bundle"), "data-bundle")
    }, getOrderElById: function (l) {
        return k.get("#order" + l)
    } 
    };
    function d(l) {
        var m = k.data(l, "fnid");
        if (!m) {
            m = "fn" + c.guid();
            k.data(l, "fnid", m)
        }
        return m
    }
    return h
}, { requires: ["dom", "event", "order/util/feedback", "order/util/select", "order/util/inputmask", "order/util/counter"] }); /*pub-1|2013-06-05 17:41:08*/
