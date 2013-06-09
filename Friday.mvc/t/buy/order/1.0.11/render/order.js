KISSY.add("order/render/order", function (a, c, b) {
    return { toPrice: function (e) {
        var g;
        var f = e.price;
        if ("wrt" === b.get("mode")) {
            var d = b.get("subMode");
            if ("oneStep" === d || "fullPay" === d) {
                g = f.now
            }
        } else {
            g = f.now
        }
        return g ? c.toMoney(g) : "-"
    }, toSum: function (f) {
        var g = f.price;
        var d = b.get("subMode");
        if ("wrt" === b.get("mode") && "fullPay" !== d) {
            var e = '<ins class="wrt-dj-ico">\u5b9a\u91d1</ins>' + c.toMoney(g.prepay);
            if ("oneStep" === d) {
                e += '<p class="wrt-finalpay">\uff08\u5c3e\u6b3e ' + c.toMoney(g.finalpay) + "\uff09</p>"
            }
            return e
        }
        return c.toMoney(g.sum)
    }, toSku: function (e) {
        var f = e.skus || [];
        var d = "";
        a.each(f, function (h, g) {
            d += '<p><span class="hd">' + g + '\uff1a</span><span class="bd">' + h + "</span></p>"
        });
        return d
    }, toIcon: function (e) {
        var d = "";
        var f = e.itemIcon || {};
        a.each([f.BUY_XIAOBAO, f.PAYMENT, f.BUY_IDENTITY, f.BUY_YULIU, f.OTHER], function (h, g) {
            if (h) {
                d += '<span class="icon-group">';
                a.each(h, function (i) {
                    var j = '<a title="' + i.title + '"' + (i.link ? (' href="' + i.link + '"') : "") + '><img src="' + i.img + '" /></a>';
                    if (i.name) {
                        j += c.toHidden({ name: i.name, value: i.value })
                    }
                    d += j
                });
                d += "</span>"
            }
        });
        return d ? ('<p class="iconlist">' + d + "</p>") : ""
    }, toUnable: function (e) {
        var d = "<tr>";
        d += '<td class="tube-title">';
        d += '<div class="tube-img"><a title="' + e.title + '" class="img" href="' + e.url + '"><img height="50" src="' + e.pic + '" /></a></div>';
        d += '<div class="tube-master"><p class="item-title"><a title="' + e.title + '" href="' + e.url + '">' + e.title + "</a></p></div>";
        d += "</td>";
        d += '<td class="tube-price">' + c.toMoney(e.price.now) + "</td>";
        d += '<td class="tube-amount">' + e.amount.now + "</td>";
        d += '<td class="tube-error" colspan="3">' + (e.errorMsg || "") + "</td>";
        return d + "</tr>"
    } 
    }
}, { requires: ["order/render/common", "order/model"] }); 