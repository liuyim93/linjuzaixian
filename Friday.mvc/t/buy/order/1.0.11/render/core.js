/*pub-1|2013-06-05 17:41:02*/
KISSY.add("order/render/core", function (j, q, f, k, h, a, i, o, c, m, e, p, g, d, l, n) {
    var b = {};
    j.mix(b, { toBundleHeader: function (s) {
        var t = "shop" === s.type;
        var r = '<div class="bundle-title"><a data-mm="tmalljy.2.6?action=openshop" href="' + s.url + '" title="' + s.title + '">';
        if (t) {
            r += "\u5e97\u94fa\uff1a" + s.title + "</a>" + h.toDog(s.seller)
        } else {
            r += s.title + "</a>"
        }
        r += "</div>";
        r += this.toScrollPromos(s.scrollPromos);
        return '<thead><tr><th class="tube-title"><div class="title-wrap">' + r + '</div></th><th class="tube-price">\u5355\u4ef7\uff08\u5143\uff09</th><th class="tube-amount">\u6570\u91cf</th><th class="tube-promo">\u4f18\u60e0\uff08\u5143\uff09</th><th class="tube-sum">\u5c0f\u8ba1\uff08\u5143\uff09</th><th class="tube-postage">\u914d\u9001\u65b9\u5f0f</th></tr><tr class="row-border"><td></td><td></td><td></td><td></td><td></td><td class="tube-postage"></td></tr></thead>'
    }, toBundleFooter: function (t) {
        var z = this;
        var s = t.id;
        var w = "shop" === t.type;
        var u = "<tfoot><tr>";
        var v = w ? t.bundles[0].id : "";
        u += '<td class="tube-annex" colspan="3">';
        if (w) {
            u += '<div class="gbook"><label class="hd" for="memo' + v + '">\u8865\u5145\u8bf4\u660e\uff1a</label><div class="fn-util fn-inputmask"><textarea class="text fn-util fn-counter" data-maxlength="200" id="memo' + v + '" name="' + v + '|memo"></textarea><label for="memo' + v + '">\u9009\u586b\uff0c\u53ef\u544a\u8bc9\u5356\u5bb6\u60a8\u7684\u7279\u6b8a\u8981\u6c42</label></div></div>'
        }
        u += c.render(t.bundles[0]);
        u += "</td>";
        u += '<td class="tube-bill" colspan="3">' + this.toBundlePromo(t);
        var y;
        var x;
        var r = "wrt" === f.get("mode") && "fullPay" !== f.get("subMode");
        if (r) {
            y = "\u5b9a\u91d1\u5408\u8ba1";
            x = "(\u4e0d\u542b\u8fd0\u8d39\u3001\u670d\u52a1\u8d39)"
        } else {
            y = (w ? "\u5e97\u94fa" : "\u6d3b\u52a8") + "\u5408\u8ba1";
            x = "(\u542b\u8fd0\u8d39)"
        }
        u += '<div class="sum">' + y + '<span class="isIncPostage">' + x + '</span>: <span class="rmb">&yen;</span><strong id="J_BundleSum' + s + '">' + h.toMoney(t._totalFee) + "</strong></div>";
        if (r) {
            u += '<div class="wrt-fee-tip"><p>\u8fd0\u8d39\u3001\u670d\u52a1\u8d39\u5728\u5c3e\u6b3e\u9636\u6bb5\u652f\u4ed8</p></div>'
        }
        u += "</td>";
        return u + "</tr></tfoot>"
    }, toBundlePromo: function (s) {
        if ("shop" === s.type) {
            var r = i.render(s);
            return '<div data-bundle="' + s.id + '" class="bundle-promo" id="shoppromo' + s.id + '">' + r + "</div>"
        }
        if (s.discount) {
            return '\u6d3b\u52a8\u4f18\u60e0\uff1a<span class="promo-discount">-<span class="rmb">&yen;</span><strong>' + h.toMoney(s.discount) + "</strong></span>"
        }
        return ""
    }, toScrollPromos: function (t) {
        var s = q.create("<div></div>");
        var r = "";
        if (j.isArray(t)) {
            j.each(t, function (v) {
                s.innerHTML = v;
                var u = j.trim(q.text(s)).replace(/\s+/g, " ");
                r += '<div class="promo-item" title="' + u + '">' + u + "</div>"
            })
        }
        if (r) {
            r = '<div class="scroll-promos"><div class="ks-switchable-content">' + r + "</div></div>"
        }
        return r
    }, toCheckbar: function () {
        //2013-06-10 wanghaichuan
        //var r = '<div class="main">' + n.render();
        var r = '<div class="main">';
        r += '<div class="due">';
        r += '<p class="pay-info"><span class="hd">\u5b9e\u4ed8\u6b3e\uff1a</span><span class="bd"><span class="rmb">&yen;</span><strong id="J_ActualPaid">' + h.toMoney(f.get("_totalFee")) + "</strong></span></p>";
        //r += '<p class="points-obtain">\u53ef\u83b7\u5f97\u5929\u732b' + (f.get("_shopVipHtml") ? '<span class="multi-point"><span class="multi-inner"></span></span>\u591a\u500d' : "") + '\u79ef\u5206\uff1a<span class="bd"><span id="J_ObtainPoints">' + f.get("_obtainPoints") + "</span>\u70b9</span></p>";
        r += "</div>";
        r += "</div>";
        r += '<div class="option" id="R_option">';
        r += '<div class="opt opt-anony">';
        if (f.get("isForceAnony")) {
            //r += h.toHidden({ name: "anony", value: "one", id: "J_AnnonyBuy" }) + '<input type="checkbox" checked disabled/>'
        } else {
            r += '<input data-mm="tmalljy.2.6?action=anony" id="anonyBuy" type="checkbox" checked name="anony"/>'
        }
        //r += '<label for="anonyBuy">\u533f\u540d\u8d2d\u4e70</label></div>';
        r += '</div>';
        r += g.render() + "</div>";
        r += p.render();
        r += '<div class="action">';
        if (!f.get("isBuyNow")) {
            r += h.toBackCart("tmalljy.2.6?action=showpage")
        } else {
            if ("wrt" === f.get("mode")) {
                r += d.renderAgreeTip()
            }
        }
        r += l.render();
        r += "</div>";
        return r
    }, toOrder: function (t, u) {
        var r = t.id;
        var s = '<tr id="order' + r + '" class="grid-order' + (t.services && t.services.length ? " grid-order-has-service" : "") + '" data-order="' + r + '">';
        s += '<td class="tube-img"><a title="' + t.title + '" class="img" href="' + t.url + '"><img data-mm="tmalljy.2.6?action=openitem_pic" height="50" src="' + t.pic + '" /></a>';
        s += h.toHidden({ name: r + "|ep", value: t.extraParam || "" });
        s += h.toHidden({ name: r + "|codRank", value: t.codRank || "" });
        if (t.cbid) {
            s += h.toHidden({ name: r + "|cbid", value: t.cbid });
            s += h.toHidden({ name: r + "|cbopt", value: t.cbopt })
        }
        s += "</td>";
        s += '<td class="tube-master">';
        s += '<p class="item-title"><a data-mm="tmalljy.2.6?action=openitem_txt" title="' + t.title + '" href="' + t.url + '">' + t.title + "</a></p>";
        s += k.toIcon(t);
        if ("act" === u.type) {
            s += '<p class="shop-title"><a href="' + h.toShopUrl(t.sellerId) + '" title="' + t.shopName + '">' + t.shopName + "</a>" + h.toDog(t.seller) + "</p>"
        }
        if (t.shipTime) {
            s += '<p class="shipTime"><span>\u53d1\u8d27\u65f6\u95f4\uff1a</span>' + t.shipTime + "</p>"
        }
        if (t.trial) {
            s += '<input type="hidden" name="' + u.bundleId + '|trial" value="' + t.trialId + '" />';
            s += '<a href="#" title="' + t.message + '"><img src="http://img04.taobaocdn.com/tps/i4/T1ZUaWXctlXXXXXXXX-16-16.gif"></a>'
        }
        if (t.energy) {
            s += '<a title="\u6bcf\u4ef6\u53ef\u4eab\u53d7\u8282\u80fd\u8865\u8d34' + t.energy + '\u5143" class="icon-energy"></a>'
        }
        s += "</td>";
        s += '<td class="tube-sku">';
        s += k.toSku(t);
        if ("act" === u.type && 0 === u.idx) {
            s += '<div class="sbook"><div class="fn-util fn-inputmask"><textarea id="memo' + r + '" class="text fn-util fn-counter" data-maxlength="200" name="' + u.mainId + '|memo"></textarea><label for="memo' + r + '">\u8865\u5145\u8bf4\u660e\u533a</label></div></div>'
        }
        s += "</td>";
        s += '<td class="tube-price">' + k.toPrice(t) + "</td>";
        s += '<td class="tube-amount">' + m.render(t) + "</td>";
        s += '<td class="tube-promo">' + o.render(t) + "</td>";
        s += '<td class="tube-sum">' + k.toSum(t) + "</td>";
        return s + "</tr>" + e.render(t)
    }, toUnable: function (s) {
        var r = "";
        f.walkUnvalid(function (t) {
            r += '<table class="grid-bundle">';
            r += '<thead><tr><th class="tube-title" colspan="8">';
            r += '<div class="bundle-title"><a class="shop-name" href="' + t.url + '" title="' + t.title + '">' + ("shop" === t.type ? "\u5e97\u94fa\uff1a" : "") + t.title + "</a>" + h.toDog(t.seller) + "</div>";
            r += "</th></tr></thead>";
            r += "<tbody>";
            j.each(t.bundles, function (u) {
                j.each(u.orders, function (v) {
                    r += k.toUnable(v)
                })
            });
            r += "</tbody>";
            r += "</table>"
        });
        return r ? ("<h3>\u4ee5\u4e0b\u5546\u54c1\u5df2\u4e0d\u80fd\u8d2d\u4e70</h3>" + r) : ""
    }
    });
    return b
}, { requires: ["dom", "order/model", "order/render/order", "order/render/common", "order/util/select", "order/biz/shoppromo", "order/biz/promo", "order/biz/invoice", "order/biz/amount", "order/biz/service", "order/biz/checkcode", "order/biz/paytype", "order/biz/wrt", "order/biz/go", "order/biz/point"] });   /*pub-1|2013-06-05 17:41:02*/
