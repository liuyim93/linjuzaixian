/*pub-1|2013-06-05 17:41:03*/
KISSY.add("order/biz/service", function (g, o, n, b, m, e) {
    var c = {};
    c.render = function (q) {
        var s = q.services;
        if (!s.length) {
            return ""
        }
        var r = h(s, q);
        var p = q.id;
        return '<tr id="service' + p + '" class="grid-service grid-service-collapse" data-order="' + p + '"><td class="tube-img"><a class="toggle" data-evt="biz/service:toggle">\u552e\u540e\u670d\u52a1</a></td><td colspan="5" class="tube-service-list">' + r.main + '</td><td class="tube-sum">' + r.fee + "</td></tr>"
    };
    c.toggle = function (s) {
        var r = i(s);
        var q = d(a(r));
        var t = q.services;
        var p = q._isServiceExpand;
        q._isServiceExpand = !p;
        o.toggleClass(r, "grid-service-expand");
        o.toggleClass(r, "grid-service-collapse");
        k(r, p ? h(t, q) : j(t))
    };
    c.select = function (u) {
        var w = i(u);
        var t = d(a(w));
        var z = t.services;
        var x = u.value;
        var v = t._serviceFee;
        var p = t._selectedServiceMap;
        var q;
        g.each(z, function (A) {
            if (x === A.id) {
                q = A;
                return false
            }
        });
        if (!u.checked) {
            v -= q._fee;
            delete p[x];
            q.isSelected = false
        } else {
            q.isSelected = true;
            p[q.id] = true;
            v += q._fee;
            var y = q.mutexGroup;
            if (y) {
                var s = q.spuId;
                var r = q.option;
                g.each(z, function (A) {
                    if (!A.isSelected || x === A.id || !A.mutexGroup) {
                        return
                    }
                    if (y === A.mutexGroup || (s === A.spuId && !r && !A.option)) {
                        A.isSelected = false;
                        v -= A._fee;
                        delete p[A.id]
                    }
                })
            }
        }
        l(t, v, p);
        k(w, j(z));
        b.calculate()
    };
    b.on("fillOrderData", function (p) {
        f(p.data)
    });
    b.on("updateOrderData", function (q) {
        var p = q.data;
        f(p);
        var r = p.services;
        k(o.get("#service" + p.id), p._isServiceExpand ? j(r) : h(r, p))
    });
    function i(p) {
        return o.parent(p, "tr.grid-service")
    }
    function a(p) {
        return o.attr(p, "data-order")
    }
    function d(p) {
        return b.find("order/" + p)
    }
    function f(r) {
        var s = r.services || [];
        var q = r.amount.now;
        var p = 0;
        var t = r._selectedServiceMap || {};
        g.each(s, function (u) {
            u._fee = q * u.now;
            u.amount = q;
            var v = u.id;
            if (u.isSelected || (v in t)) {
                t[v] = true;
                u.isSelected = true;
                p += u._fee
            }
        });
        r.services = s;
        l(r, p, t)
    }
    function l(q, p, s) {
        var r = [];
        g.each(s, function (u, t) {
            r.push(t)
        });
        q._serviceFee = p;
        q._selectedServiceMap = s;
        q._selectedServiceList = r
    }
    function j(r) {
        var q = "";
        var p = "";
        g.each(r, function (t, s) {
            var u = "";
            var v = false;
            if (t.isSelected) {
                u += " checked ";
                v = true
            }
            if (t.isFree) {
                t.promo = "\u5356\u5bb6\u8d60\u9001";
                u += " disabled "
            }
            q += "<tr" + (v ? "" : ' class="service-deactive"') + ">";
            q += '<td class="tube-master">';
            q += '<input data-evt="biz/service:select" type="checkbox" value="' + t.id + '" ' + u + " />";
            q += '<a data-mm="tmalljy.2.6?action=opensic" class="item" title="' + t.title + '" style="background-image:url(' + t.icon + ')"';
            if (t.url) {
                q += ' href="' + t.url + '" '
            }
            q += ">" + t.title + "</a>";
            q += "</td>";
            q += '<td class="tube-price">' + e.toMoney(t.price) + "</td>";
            if (0 === s) {
                q += '<td class="tube-amount" rowspan="' + r.length + '">' + t.amount + "</td>"
            }
            q += '<td class="tube-promo">' + (t.promo || "") + "</td>";
            q += "</tr>";
            p += "<tr" + (v ? "" : ' class="service-deactive"') + "><td>" + e.toMoney(t._fee) + "</tr></td>"
        });
        return { main: "<table>" + q + "</table>", fee: "<table>" + p + "</table>" }
    }
    function h(r, p) {
        var q = "";
        g.each(r, function (s) {
            if (s.isSelected || s.isFree) {
                q += '<a data-mm="tmalljy.2.6?action=opensic" class="item" title="' + s.title + '" style="background-image:url(' + s.icon + ')"';
                if (s.url) {
                    q += ' href="' + s.url + '" '
                }
                q += ">" + s.title + "</a>"
            }
        });
        return { main: q ? (q + '<a class="service-modify" data-evt="biz/service:toggle">\u4fee\u6539</a>') : "\u60a8\u8fd8\u6ca1\u6709\u9009\u62e9\u4efb\u4f55\u670d\u52a1!", fee: e.toMoney(p._serviceFee) }
    }
    function k(p, q) {
        if (p) {
            o.get("td.tube-sum", p).innerHTML = q.fee;
            o.get("td.tube-service-list", p).innerHTML = q.main
        }
    }
    return c
}, { requires: ["dom", "event", "order/model", "order/util", "order/render/common"] }); 