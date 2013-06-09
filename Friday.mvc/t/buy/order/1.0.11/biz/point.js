/*pub-1|2013-06-05 17:41:07*/
KISSY.add("order/biz/point", function (e, m, l, c, g, k) {
    var a;
    var f;
    var h = { name: "point", toggle: function () {
        var n = this.rootEl;
        var o = this.inputEl;
        if (this.chkEl.checked) {
            m.removeClass(n, "points-off");
            o.focus();
            b()
        } else {
            o.value = "";
            m.addClass(n, "points-off");
            d(0);
            a.hide()
        }
    }, init: function () {
        var n = this;
        n.rootEl = m.get("#R_points");
        if (!n.rootEl) {
            return
        }
        n.chkEl = m.get("input.togglePoint", n.rootEl);
        n.inputEl = m.get("input.costPoint", n.rootEl);
        n.dischargeEl = m.get("#J_Discharge");
        c.set({ _usedPoints: 0, _obtainPoints: 0, _availablePoints: 0 }, { silent: true });
        a = new k({ type: "error", node: n.inputEl.parentNode, arrow: "top", tip: false });
        l.on(n.inputEl, "valuechange", b);
        i()
    }, render: function () {
        if (0 === c.get("totalPoint")) {
            return ""
        }
        var n = '<div class="points points-off" id="R_points">';
        n += '<div class="hd"><input class="togglePoint" data-mm="tmalljy.2.6?action=usepoints" data-evt="biz/point:toggle" type="checkbox" id="J_UsePoints"/><label for="J_UsePoints">\u4f7f\u7528\u5929\u732b\u79ef\u5206</label><p>&nbsp;</p></div>';
        n += '<div class="bd"><span class="colon">\uff1a</span><span class="txtBox"><input class="text costPoint" type="text" name="costPoint" autocomplete="off" />\u70b9</span>';
        n += '<span class="discharge">- <span class="rmb">&yen;</span><strong id="J_Discharge">0.00</strong></span>';
        n += '<p><span>\uff08\u53ef\u7528<span class="usablePoints">' + c.get("totalPoint") + "</span>\u70b9\uff09</span></p></div>";
        return n + "</div>"
    }, moneyPoint: function (o) {
        if (!this.rootEl) {
            return
        }
        f = !!o;
        if (!o) {
            m.removeClass(this.rootEl, "points-buy");
            m.addClass(this.rootEl, "points-off");
            this.inputEl.value = "";
            this.chkEl.checked = false
        } else {
            m.addClass(this.rootEl, "points-buy");
            m.removeClass(this.rootEl, "points-off");
            var n = m.get("span.usePoint", this.rootEl);
            if (!n) {
                n = m.create('<span class="usePoint"></span>');
                m.insertAfter(n, this.inputEl)
            }
            n.innerHTML = o;
            this.inputEl.value = o
        }
        d(0)
    } 
    };
    c.on("after_availablePointsChange after_obtainPointsChange", function () {
        m.html("#J_ObtainPoints", this.get("_obtainPoints"));
        if (h.inputEl) {
            b()
        }
    });
    c.on("afterIsCodChange", function (n) {
        if (!h.rootEl) {
            return
        }
        if (n.newVal) {
            h.chkEl.checked = false;
            h.toggle()
        }
    });
    function b() {
        if (f) {
            return
        }
        var o = e.trim(h.inputEl.value);
        if (o) {
            if (!/^[1-9]\d*$/.test(o)) {
                return j("\u4f7f\u7528\u5929\u732b\u79ef\u5206\u70b9\u6570\u5fc5\u987b\u4e3a\u5927\u4e8e\u6216\u7b49\u4e8e0\u7684\u6574\u6570")
            }
            var n = c.get("_maxUseablePoints");
            if (n <= 0) {
                return j("\u60a8\u5f53\u524d\u6ca1\u6709\u53ef\u7528\u79ef\u5206")
            }
            o = o - 0;
            if (o > n) {
                return j("\u672c\u6b21\u6700\u591a\u53ef\u7528" + n + "\u79ef\u5206")
            }
        }
        a.hide();
        d(o)
    }
    function j(n) {
        g.notify("point", false);
        a.set("content", n).show()
    }
    function d(n) {
        g.notify("point", true);
        h.dischargeEl.innerHTML = (n / 100).toFixed(2);
        c.set("_usedPoints", n)
    }
    function i() {
        var o = m.get("span.multi-point", "#J_checkbar");
        if (!o) {
            return
        }
        var n = new k({ arrow: "top", node: o, content: c.get("_shopVipHtml") });
        n.on("show", function () {
            var s = m.offset(o);
            var q = m.outerWidth(o);
            var r = (q - m.outerWidth(this.el)) / 2;
            var p = 990 + (m.viewportWidth() - 990) / 2;
            var t = s.left + q - r - p;
            if (0 < t) {
                r += t
            }
            m.css(this.el, "right", r);
            m.css(m.get("s.feedback-arrow", this.el), "right", 0 - r + q / 2 - 4)
        })
    }
    return h
}, { requires: ["dom", "event", "order/model", "order/biz/go", "order/util/feedback"] }); 