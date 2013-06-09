/*pub-1|2013-06-05 17:41:08*/
KISSY.add("order/biz/insure", function (f, l, k, c, e, i, a, j) {
    var g = false;
    var d = { name: "insure", init: function (m) {
        var n = this;
        f.each(l.query("div.insure", l.get(m) || "#J_orders"), function (p) {
            var q = l.get("span.rgCard", p);
            var r = new j({ type: "tip", node: q.parentNode, arrow: "top" });
            l.data(p, "feedback", r);
            var o = l.get("input.toggleInsure", p);
            var s = i.fetch(l.get("div.fn-select", p), "select");
            if (s) {
                s.set("width", 72);
                s.on("change", function () {
                    if (g) {
                        return
                    }
                    o.checked = true;
                    h(p, this);
                    b();
                    c.calculate()
                })
            }
            k.on(o, "click", b);
            h(p, s)
        })
    }, render: function (m) {
        var n = m.insuranceList;
        var p = n.length;
        if (!p) {
            return ""
        }
        var o = '<div class="insure" data-main="' + m.id + '">';
        o += '<input class="toggleInsure" type="checkbox" data-evt="biz/insure:toggle" />';
        o += '<div class="rgCardBox"><span class="rgCard">\u8fd0\u8d39\u9669</span></div>';
        if (1 < p) {
            o += a.render({}, n)
        } else {
            o += n[0].title
        }
        o += e.toHidden({ cls: "newInsuancePi", name: m.id + "|newInsuancePi" });
        return o + "</div>"
    }, toggle: function (m) {
        var n = l.parent(m, "div.insure");
        h(n, i.fetch(l.get("div.fn-select", n), "select"));
        c.calculate()
    } 
    };
    function h(q, t) {
        var n = l.get("input.toggleInsure", q);
        var o = c.find("main/" + l.attr(q, "data-main"));
        var p = o.insuranceList[t ? t.get("selectedIndex") : 0];
        var s = p.tip;
        if (2 === p.type) {
            n.checked = true
        }
        var r = "";
        var m = 0;
        if (n.checked) {
            s = p.tmallCardSelectedTip || p.tip;
            m = p.price;
            r = p.value
        }
        l.val(l.get("input.newInsuancePi", q), r);
        o._insureFee = m;
        l.data(q, "feedback").set("content", s);
        l.attr(n, "disabled", p.readonly)
    }
    function b() {
        var n = 0;
        var q = [];
        var m = [];
        var r = [];
        f.each(l.query("div.insure", "#J_orders"), function (t) {
            var w = i.fetch(l.get("div.fn-select", t), "select");
            var u = c.find("main/" + l.attr(t, "data-main")).insuranceList;
            q.push(w);
            m.push(u);
            var s = w ? w.get("selectedIndex") : 0;
            var v = l.attr(l.get("input.toggleInsure", t), "checked");
            r.push(v);
            if (v && 1 === u[s].type) {
                n++
            }
        });
        var o;
        var p = c.get("returnGoodsCardAmount");
        if (n === p) {
            o = true
        } else {
            if (n + 1 === p) {
                o = false
            }
        }
        if (!f.isBoolean(o)) {
            return
        }
        g = true;
        f.each(m, function (t, s) {
            var v = -1;
            f.each(t, function (w, x) {
                if (w && 1 === w.type) {
                    v = x;
                    return false
                }
            });
            if (-1 === v) {
                return
            }
            var u = q[s].options[v];
            if (o && !r[s] && u.get("selected")) {
                u.set("disabled", true)
            } else {
                u.set("disabled", false)
            }
        });
        g = false
    }
    c.on("afterIsCodChange", function (m) {
        if (!m.newVal) {
            return
        }
        f.each(l.query("div.insure", "#J_orders"), function (n) {
            l.get("input.newInsuancePi", n).value = "";
            var o = l.get("input.toggleInsure", n);
            if (o && !o.disabled) {
                l.attr(o, "checked", false)
            }
            c.find("main/" + l.attr(n, "data-main"))._insureFee = 0
        })
    });
    return d
}, { requires: ["dom", "event", "order/model", "order/render/common", "order/util", "order/util/select", "order/util/feedback"] }); /*pub-1|2013-06-05 17:41:07*/
