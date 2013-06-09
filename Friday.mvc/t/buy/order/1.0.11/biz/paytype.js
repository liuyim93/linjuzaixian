/*pub-1|2013-06-05 17:41:03*/
KISSY.add("order/biz/paytype", function (f, n, m, d) {
    var c = {};
    var h;
    var j;
    var e = f.mix({}, f.EventTarget);
    f.mix(e, { name: "paytype", init: function () {
        i()
    }, render: function () {
        j = "";
        c = { Agent: 1, Fenqi: d.get("isInstallment") && a(), Coupon: d.get("canUseTmallCouponCard") };
        var o = "";
        if (d.get("isSupportAgentPay")) {
            o += g({ mm: "tmalljy.2.6?action=otherspay", type: "Agent", name: "pay_for_another", value: "true", title: "\u627e\u4eba\u4ee3\u4ed8" })
        }
        if (d.get("isInstallment")) {
            o += g({ mm: "tmalljy.2.6?action=fenqi_pay", type: "Fenqi", name: "payType", title: "\u5206\u671f\u4ed8\u6b3e" })
        }
        o += g({ id: "R_coupon", mm: "tmalljy.2.6?action=dq_check", type: "Coupon", title: "\u4f7f\u7528\u5929\u732b\u70b9\u5238" });
        return o
    }, select: function (o) {
        j = o.checked ? n.attr(o, "data-type") : "";
        k()
    }, mark: function (p, o) {
        c[p] = o;
        k()
    } 
    });
    function g(p) {
        p = f.merge({ mm: "", name: "", value: "on" }, p);
        var o = p.type;
        var q = "R_PT_" + o;
        return "<div " + (p.id ? ('id="' + p.id + '"') : "") + ' class="opt opt-' + o + '"><input id="' + q + '" type="checkbox" name="' + p.name + '" class="paytype-trigger" data-type="' + o + '" data-evt="biz/paytype:select" data-mm="' + p.mm + '" value="' + p.value + '"><label class="paytype-name" for="' + q + '">' + p.title + "</label></div>"
    }
    function b(o) {
        if (h) {
            return false
        }
        if (!c[o]) {
            return false
        }
        if (j && o !== j) {
            return false
        }
        return true
    }
    function l(o) {
        f.each(n.query("input.paytype-trigger", "#R_option"), function (p, q) {
            o(p, n.attr(p, "data-type"))
        })
    }
    function k() {
        var o = n.get("#R_option");
        if (!o) {
            return
        }
        f.each(c, function (p, q) {
            if (!p && q === j) {
                j = "";
                return false
            }
        });
        l(function (q, r) {
            var s = "paytype-" + r + "-disabled";
            var p = b(r);
            if (p) {
                n.prop(q, "disabled", false);
                n.removeClass(o, s)
            } else {
                q.checked = false;
                n.prop(q, "disabled", true);
                n.addClass(o, s)
            }
            n.removeClass(o, "paytype-" + r + "-active");
            e.fire("update" + r, { enable: p, checked: q.checked, trigger: q })
        });
        if (j) {
            n.addClass(o, "paytype-" + j + "-active")
        }
    }
    e.on("updateFenqi", function (o) {
        var p = n.get("#R_option");
        var q = n.get("div.fenqi-pic", p);
        if (o.enable && o.checked) {
            if (!q) {
                q = n.create('<div class="fenqi-pic"></div>', { html: n.val("#fenqi-pic") });
                n.append(q, p)
            }
            n.css(q, "display", "block")
        } else {
            n.css(q, "display", "none")
        }
    });
    function i() {
        h = d.get("isCod");
        if (h) {
            j = ""
        }
        k()
    }
    function a() {
        return d.get("_totalFee") > 60000
    }
    d.on("after_actualPaidChange", function (o) {
        c.Fenqi = a();
        k()
    });
    d.on("afterIsCodChange", i);
    d.on("afterIsSupportAgentPayChange", function (o) {
        c.Agent = o.newVal;
        k()
    });
    return e
}, { requires: ["dom", "event", "order/model"] }); 