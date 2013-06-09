/*pub-1|2013-06-05 17:41:03*/
KISSY.add("order/biz/coupon", function (i, v, x, c, l, a, f, j, r, s, m) {
    var g;
    var w = { refresh: function () {
        n(function (z) {
            var y = z.errorCode;
            if ("Success" === y) {
                t(z)
            } else {
                q(y)
            }
        })
    }, fill: function (z) {
        var y = this;
        var A = y.fillPopupObj;
        if (!A) {
            A = new j({ cls: "coupon-fill-popup", header: "\u5929\u732b\u70b9\u5238\u5361\u5145\u503c" });
            A.on("hide", function () {
                y.refresh();
                m("tmalljy.2.6?action=dq_closechongzhi")
            });
            y.fillPopupObj = A
        }
        A.set("content", '<iframe frameborder="0" width="596" height="320" src="' + v.attr(z, "href") + "&" + i.now() + '"></iframe>');
        A.show();
        m("tmalljy.2.6?action=dq_showchongzhi")
    } 
    };
    function b() {
        if (!w.feedbackObj) {
            w.feedbackObj = new f({ type: "stop", node: "#R_coupon", arrow: false, tip: false })
        }
        return w.feedbackObj
    }
    function h() {
        if (w.feedbackObj) {
            w.feedbackObj.hide()
        }
    }
    function t(y) {
        l.set("_coupon", { url: y.url, fee: y.couponFee, max: y.maxUseCouponFee, code: y.errorCode, every: y.everyAvailableFee, daily: y.dailyAvailableFee });
        h();
        o();
        p();
        g = y.maxUseCouponFee ? true : false
    }
    function o() {
        var B = l.get("_coupon");
        if (!B) {
            return
        }
        var A = v.get("#R_coupon");
        var y = v.get("span.coupon-rest", A);
        var z = B.code;
        if ("Success" === z) {
            v.removeClass(A, "opt-Coupon-frozen");
            if (0 === B.fee) {
                v.html(y, "\uff08\u65e0\u53ef\u7528\u70b9\u5238\uff09");
                v.addClass(A, "opt-Coupon-empty")
            } else {
                v.html(y, "\uff08\u4f59\u989d" + B.fee + '\u70b9\uff09<ins class="trigger"></ins>');
                v.removeClass(A, "opt-Coupon-empty")
            }
        } else {
            q(z)
        }
        v.attr(v.get("a.fillCoupon", A), "href", B.url);
        d()
    }
    var e = false;
    function n(y) {
        if (e) {
            return
        }
        e = true;
        c({ url: "/json/asyncRenderCoupon.htm?" + i.now(), timeout: 5, dataType: "json", success: function (z) {
            y(z);
            e = false
        }, error: function () {
            q("SystemError");
            e = false
        } 
        })
    }
    function q(y) {
        var z = '\u70b9\u5238\u5361\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u540e<a class="refreshCoupon" data-evt="biz/coupon:refresh">\u91cd\u8bd5</a>';
        if ("AliPayUserNotBind" === y) {
            z = '<a href="http://member1.taobao.com/member/fresh/account_management.htm">\u8bf7\u5148\u7ed1\u5b9a\u652f\u4ed8\u5b9d\u8d26\u53f7</a>'
        } else {
            if ("NoProduct" === y || "CardFrozen" === y) {
                z = "\u8d26\u6237\u88ab\u51bb\u7ed3\uff0c\u70b9\u5238\u5361\u6682\u65f6\u4e0d\u53ef\u7528"
            }
        }
        v.addClass("#R_coupon", "opt-Coupon-frozen");
        b().set("content", z).show()
    }
    function k(z) {
        if (v.get("input.text", z)) {
            return
        }
        var y = '<span class="coupon-detail">\uff1a<input class="text" type="text" name="costCouponFee" autocomplete="off"/>\u70b9<span class="coupon-discount">\uff08\u62b5\u6263<span class="rmb">&yen;</span><strong>0.00</strong>\uff09</span></span>';
        y += '<div class="coupon-msg"><span class="coupon-rest"></span><span class="coupon-prepaid"><a data-mm="tmalljy.2.6?action=dq_chongzhi" data-evt="biz/coupon:fill" class="fillCoupon">\u5145\u503c</a></span></div>';
        v.append(v.create(y), z);
        o();
        w.feedbackObj = null
    }
    function u() {
        var z = v.get("#R_coupon");
        var A = l.get("_coupon");
        var C = "";
        var D = 0;
        var B = i.trim(v.get("input.text", z).value);
        if (B) {
            var y = Math.min(A.max, l.get("_actualPaid"));
            if (!/^[1-9]\d*$/.test(B)) {
                C = "\u5929\u732b\u70b9\u5238\u5fc5\u987b\u4e3a\u5927\u4e8e\u6216\u7b49\u4e8e0\u7684\u6574\u6570"
            } else {
                B = B - 0;
                if (B > y) {
                    C = "\u672c\u6b21\u6700\u591a\u53ef\u4ee5\u4f7f\u7528" + y + "\u70b9\u5238"
                } else {
                    D = B
                }
            }
        }
        b().set("content", C)[C ? "show" : "hide"]();
        v.html(v.get("strong", z), r.toMoney(D));
        s.notify("coupon", !C)
    }
    function d() {
        var z = l.get("_coupon");
        if ("Success" !== z.code || !z.max) {
            return
        }
        var y = v.get("#R_coupon");
        x.on(v.get("input.text", y), "valuechange", u);
        new f({ type: "error", node: v.get("div.coupon-msg", y), trigger: v.get("ins.trigger", y), arrow: "top", content: '<table class="grid-popup"><thead><tr><th>\u5355\u7b14\u9650\u989d\uff08\u70b9\uff09</th><th>\u6bcf\u65e5\u9650\u989d\uff08\u70b9\uff09</th></tr></thead><tbody><tr><td>' + z.every + "</td><td>" + z.daily + "</td></tr></tbody></table>" })
    }
    function p() {
        var z = v.get("#R_coupon");
        var A = l.get("_coupon");
        if (!A) {
            return n(function (B) {
                t(B)
            })
        }
        var y = A.code;
        if ("Success" !== y) {
            return q(y)
        }
        if (v.get("input.paytype-trigger", z).checked && !v.hasClass(z, "opt-Coupon-on") && !v.hasClass(z, "opt-Coupon-empty")) {
            v.addClass(z, "opt-Coupon-on");
            v.get("input.text", z).focus()
        }
    }
    a.on("updateCoupon", function (y) {
        var z = v.get("#R_coupon");
        if (y.enable && y.checked) {
            k(z);
            p()
        } else {
            v.removeClass(z, "opt-Coupon-on");
            v.val(v.get("input.text", z), "");
            v.html(v.get("strong", z), r.toMoney(0));
            h();
            s.notify("coupon", true)
        }
    });
    l.on("reRender", function () {
        var y = v.get("#R_coupon");
        if (y) {
            x.remove(v.get("input.text", y), "valuechange")
        }
    });
    l.on("after_actualPaidChange", function () {
        if (g) {
            u()
        }
    });
    l.on("afterCanUseTmallCouponCardChange", function (y) {
        a.mark("Coupon", y.newVal)
    });
    return w
}, { requires: ["dom", "event", "ajax", "order/model", "order/biz/paytype", "order/util/feedback", "order/util/popup", "order/render/common", "order/biz/go", "order/biz/mmstat"] }); /*pub-1|2013-06-05 17:41:03*/
