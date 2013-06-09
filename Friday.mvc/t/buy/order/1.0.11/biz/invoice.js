KISSY.add("order/biz/invoice", function (e, k, i, c, d, a, g) {
    var b = { modify: function (n) {
        var m = f(n);
        k.addClass(m, "invoice-modify");
        if (!k.get("a.ok", m)) {
            k.insertAfter(k.create('<a class="cancel" data-evt="biz/invoice:cancel">\u53d6\u6d88</a>'), n);
            k.insertAfter(k.create('<a class="ok" data-evt="biz/invoice:ok">\u786e\u5b9a</a>'), n)
        }
        var l = h(m);
        l.innerHTML = '<input type="text" class="text" value="' + j(m).value + '" />';
        k.get("input.text", l).focus()
    }, ok: function (o) {
        var m = f(o);
        var n = e.trim(k.val(k.get("input.text", m)));
        if (!n) {
        }
        k.removeClass(m, "invoice-modify");
        j(m).value = n;
        var l = h(m);
        l.innerHTML = n;
        l.title = n
    }, dd: function (l) {
        k[l.checked ? "removeClass" : "addClass"](k.parent(l, "div.invoice"), "invoice-dd-hide")
    }, cancel: function (m) {
        var l = f(m);
        k.removeClass(l, "invoice-modify");
        h(l).innerHTML = j(l).value
    }, render: function (m) {
        if (!m.needInvoice) {
            return ""
        }
        var q = c.get("_addrData").name;
        var o;
        var l = '<span class="bd"><span title="' + q + '" class="title">' + q + '</span><a title="\u4fee\u6539\u53d1\u7968\u62ac\u5934" tabindex="0" class="modify" data-evt="biz/invoice:modify">\u4fee\u6539</a></span>' + d.toHidden({ cls: "invoice", name: m.id + "|invoice", value: q });
        if (m.invoiceTypes) {
            var p = "J_InvoiceOn" + e.guid();
            o = '<div class="invoice invoice-dd invoice-dd-hide"><div class="invoice-hd"><input type="checkbox" id="' + p + '" data-evt="biz/invoice:dd" /><label for="' + p + '">\u5f00\u5177\u53d1\u7968</label></div><div class="invoice-bd"><span class="hd">\u62ac\u5934\uff1a</span>';
            var n = [];
            e.each(m.invoiceTypes, function (r) {
                n.push({ value: r, title: r })
            });
            o += l + '<span class="types">\u53d1\u7968\u5185\u5bb9\uff1a' + a.render({ name: m.id + "|invoiceType" }, n) + "</span></div>"
        } else {
            o = '<div class="invoice"><span class="hd">\u53d1\u7968\u62ac\u5934\uff1a</span>' + l
        }
        return o + "</div>"
    } 
    };
    g.on("testSubmit", function () {
        var n = k.query("input.invoice", "#J_orders");
        for (var m = 0, l = n.length; m < l; m++) {
            if (!e.trim(n[m].value)) {
                return false
            }
        }
        return true
    });
    g.on("beforeSubmit", function () {
    });
    function f(l) {
        return k.parent(l, "div.invoice")
    }
    function j(l) {
        return k.get("input.invoice", l)
    }
    function h(l) {
        return k.get("span.title", l)
    }
    return b
}, { requires: ["dom", "event", "order/model", "order/render/common", "order/util/select", "order/biz/go"] }); 