KISSY.add("order/biz/go", function (e, n, l, a, d, j) {
    var k = {};
    var m = false;
    var g = e.mix({}, e.EventTarget);
    e.mix(g, { submit: function (p) {
        var o = this;
        if (m || n.hasClass(n.parent(p), "go-disable")) {
            return
        }
        m = true;
        var q = n.get("span.uic-err", n.query("div.gbook", "#J_orders"));
        if (q) {
            n.scrollTop(n.offset(q).top - 100);
            return f()
        }
        if (false === o.fire("testSubmit")) {
            return f()
        }
        j.validate(function () {
            if (d.get("isDurex")) {
                return b()
            }
            h()
        }, function () {
            f()
        })
    }, notify: function (p, o) {
        k[p] = o;
        n[c() ? "removeClass" : "addClass"](n.parent("#J_Go"), "go-disable")
    }, render: function () {
        var o = d.get("isCod");
        var p = o ? "\u4e0b\u4e00\u6b65" : "\u63d0\u4ea4\u8ba2\u5355";
        return "<span" + (c() ? "" : ' class="go-btn-disable"') + '><button id="J_Go" data-mm="tmalljy.2.6?action=submit" class="go-btn' + (o ? " cod-go-btn" : "") + '" type="button" data-evt="biz/go:submit" title="' + p + '">' + p + "</button></span>"
    } 
    });
    function c() {
        for (var o in k) {
            if (false === k[o]) {
                return false
            }
        }
        return true
    }
    function b() {
        var o = {};
        d.walk(function (s) {
            if ("shop" !== s.type) {
                return
            }
            var p = 0;
            var q = [];
            var u = [];
            var t = [];
            var r = { total: s._totalFee, sellerId: s.seller };
            d.children(s, function (v) {
                d.children(v, function (w) {
                    p++;
                    q.push(w.itemId);
                    u.push(w.rootCat || "");
                    t.push(w.realRootCat || "")
                });
                r.invoice = v.needInvoice
            });
            r.len = p;
            r.itemIds = q;
            r.rootCatList = u;
            r.realRootCatList = t;
            o[s.id] = r
        });
        a({ url: "/order/trustAuth.htm?_input_charset=utf-8", type: "post", data: { phone: n.val("#F_deliveryMobile"), address: n.val("#F_deliveryAddr"), isCod: d.get("isCod"), orderData: e.JSON.stringify(o), totalFee: d.get("_totalFee"), rewardPoints: d.get("_usedPoints") }, dataType: "json", success: function (p) {
            if (p.needCheck) {
                return i(p.url)
            }
            h()
        }, error: function () {
            h()
        } 
        })
    }
    function i(p) {
        var o = window.AQPop;
        if (!o) {
            return e.getScript("http://a.tbcdn.cn/apps/durex/js/aqpop.js", { timeout: 5, success: function () {
                i(p)
            }, error: function () {
                h()
            } 
            })
        }
        var q = new o({ title: "\u4e0b\u5355\u9a8c\u8bc1", style: "durex", type: "dialog", width: 320, height: 280 });
        q.on("close", function () {
            f();
            q.hide()
        });
        o.addMethod({ success: function () {
            q.hide();
            h({ durex: 1 })
        }, cancel: function () {
            f();
            q.hide()
        } 
        });
        i = function (r) {
            q.render({ url: r });
            l.on(n.get("a.aq_durex_overlay_x", q._popup), "click", function (s) {
                s.preventDefault()
            });
            q.show()
        };
        i(p)
    }
    function h(p) {
        var o = n.get("#J_orderForm");
        if (e.isPlainObject(p)) {
            e.each(p, function (r, q) {
                o.appendChild(n.create('<input type="hidden" name="' + q + '" value="' + r + '"'))
            })
        }
        g.fire("beforeSubmit");
        n.val("#F_isCod", d.get("isCod"));
        o.submit()
    }
    function f() {
        m = false
    }
    d.on("afterIsCodChange", function (q) {
        var o = n.get("#J_Go");
        if (!o) {
            return
        }
        var p = q.newVal;
        n[p ? "addClass" : "removeClass"](o, "cod-go-btn");
        o.title = p ? "\u4e0b\u4e00\u6b65" : "\u63d0\u4ea4\u8ba2\u5355";
        if (q.newVal) {
            return
        }
    });
    return g
}, { requires: ["dom", "event", "ajax", "order/model", "order/biz/checkcode"] }); 