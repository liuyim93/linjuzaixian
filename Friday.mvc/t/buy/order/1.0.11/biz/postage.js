/*pub-1|2013-06-05 17:41:08*/
KISSY.add("order/biz/postage", function (g, o, n, e, f, l, b, m) {
    var h = { postFee: "postFee", codServiceFeeRate: "buyerPayRate", codSellerServiceFee: "codSellerServiceFee" };
    var a = g.mix({}, g.EventTarget);
    g.mix(a, { name: "postage", init: function (p) {
        var q = this;
        g.each(o.query("div.bundle-postage", o.get(p || "#J_orders")), function (t) {
            var r = e.find("main/" + o.attr(o.parent(t, "tr.grid-main"), "data-main"));
            var s = l.fetch(t, "select");
            s.on("change", function () {
                d(s, r);
                q.fire("change")
            });
            d(s, r)
        })
    }, render: function (p) {
        var r = "";
        var s = p.id;
        var q = "line" === p.postagesStyle;
        if (p.postageTip) {
            r += '<p class="postage-msg">' + p.postageTip + "<s></s></p>"
        }
        r += '<div class="bundle-post">';
        r += b.render({ cls: "bundle-postage" + (q ? " bundle-postage-line" : ""), name: s + "|trans" }, p.postages);
        r += '<div class="postage-schedule"></div>';
        r += '<div class="postage-tip"></div>';
        r += "</div>";
        if (q) {
            r += '<p class="postage-line">-</p>'
        }
        g.each(h, function (t, u) {
            r += f.toHidden({ cls: "postage-" + t, name: s + "|" + u })
        });
        return r
    } 
    });
    function d(v, s) {
        var p = v.get("selectedIndex");
        if (0 > p) {
            return
        }
        var u = o.parent(v.el, "td");
        var r = s.postages[p];
        g.each(h, function (w) {
            o.val(o.get("input.postage-" + w, u), r[w])
        });
        s._postageFee = r.fare - 0;
        s._postageValue = r.value;
        e.set("isCod", r.isCod);
        var t = o.get("div.postage-tip", u);
        if (r.tip) {
            t.innerHTML = r.tip;
            o.css(t, "display", "block")
        } else {
            o.css(t, "display", "none")
        }
        var q = o.get("div.postage-schedule", u);
        var u = o.parent(q, "td");
        if (r.postSchedule) {
            i(q, r.postSchedule, s);
            o.addClass(u, "tube-postage-schedule")
        } else {
            o.removeClass(u, "tube-postage-schedule")
        }
    }
    function i(p, x, s) {
        g.use("order/util/calendar,order/util/popup");
        var q = x[0];
        var t = "";
        var v = s.id;
        t += '<div class="schedule-zone">';
        t += '<div class="schedule-calendar"><div class="dateval">' + q.start + "</div></div>";
        t += b.render({ cls: "schedule-opts", name: v + "|osDateF" }, q.opts);
        t += '<input type="hidden" name="' + v + '|osDate" class="date" value="' + q.start + '" />';
        t += "</div>";
        t += '<div class="schedule-tip"></div>';
        p.innerHTML = t;
        var w = new b(o.get("div.schedule-opts", p));
        var u = o.get("div.schedule-tip", p);
        u.innerHTML = k(q.paytimeTip, q.start, q.wayDay);
        var r = o.get("input.date", p);
        n.on(o.get("div.dateval", p), "click", function (y) {
            y.halt();
            j(this, r, function (B, A) {
                c.setSchedule(x);
                var z = function () {
                    g.each(o.query("td", A), function (C) {
                        o[c.getInfoByDay(o.attr(C, "data-date")) ? "removeClass" : "addClass"](C, "disabled")
                    })
                };
                B.on("prevmonth nextmonth", z);
                B.on("dateclick", function () {
                    var D = this.getSelectedDate();
                    var C = c.getInfoByDay(D);
                    u.innerHTML = k(C.paytimeTip, D, C.wayDay);
                    w.refill(C.opts)
                });
                z()
            })
        })
    }
    function k(s, t, p) {
        var r = t.split("-");
        var q = new Date(r[0], r[1] - 1, r[2] - p);
        return "\uff08" + s.replace("{m}", q.getMonth() + 1).replace("{d}", q.getDate()) + "\uff09"
    }
    function j(s, r, w) {
        if (!a.calendar) {
            return g.use("order/util/calendar,order/util/popup", function (z, B, A) {
                var x = new A({ cls: "schedule-calendar-popup", mask: false, center: false });
                a.calendar = new B({ container: x.contentEl, count: 1, isHoliday: false });
                n.on(x.el, "click", function (C) {
                    C.halt()
                });
                n.on(document, "click", function () {
                    x.hide()
                });
                var y = function () {
                    o.removeClass(x.el.parentNode, "schedule-calendar-open");
                    o.append(x.el, document.body)
                };
                x.on("hide", y);
                e.on("reRender", y);
                a.calPopup = x;
                j(s, r, w)
            })
        }
        var p = a.calPopup;
        var t = s.parentNode;
        o.append(p.el, t);
        p.show();
        o.addClass(t, "schedule-calendar-open");
        var v = a.calendar;
        var q = r.value;
        var u = q.split("-");
        v.set("date", new Date(u[0], u[1] - 1, u[2]));
        v.set("selectedDate", q);
        v.render();
        v.detach("dateclick prevmonth nextmonth");
        v.on("dateclick", function () {
            var x = this.getSelectedDate();
            r.value = x;
            s.innerHTML = x;
            p.hide()
        });
        if (g.isFunction(w)) {
            w(v, p.contentEl)
        }
    }
    var c = function () {
        var p = function (r) {
            return r.replace(/-/g, "") - 0
        };
        var q = [];
        return { setSchedule: function (r) {
            q = [];
            g.each(r, function (s) {
                q.push([p(s.start), p(s.end), s])
            })
        }, getInfoByDay: function (v) {
            var t = p(v);
            for (var u = 0, r = q.length; u < r; u++) {
                var s = q[u];
                if (s[0] <= t && t <= s[1]) {
                    return s[2]
                }
            }
            return false
        } 
        }
    } ();
    e.on("updateMainData", function (p) {
        var t = o.get("div.bundle-postage", "#main" + p.data.id);
        if (t) {
            var r = l.fetch(t, "select");
            var q = p.data.postages;
            var s = p.data._postageValue;
            g.each(q, function (u) {
                u.isSelected = u.value === s
            });
            r.refill(q)
        }
    });
    return a
}, { requires: ["dom", "event", "order/model", "order/render/common", "order/util", "order/util/select", "order/util/feedback"] }); /*pub-1|2013-06-05 17:41:02*/
