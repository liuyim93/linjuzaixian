/*pub-1|2013-06-05 17:41:07*/
KISSY.add("order/util/counter", function (b, c, a) {
    function d(f) {
        var e = this;
        e.el = c.get(f);
        e.maxLength = e.el.getAttribute("data-maxlength") - 0;
        e.tipEl = c.create('<span class="fn-counter-tip"></span>');
        c.insertAfter(e.tipEl, e.el);
        a.on(e.el, "valuechange", function () {
            e.update()
        });
        e.update()
    }
    b.augment(d, { update: function () {
        var f = this;
        var e = f.len();
        var g = f.maxLength - e;
        if (g >= 0) {
            f.tipEl.innerHTML = "\u8fd8\u53ef\u4ee5\u8f93\u5165<span>" + g + "<span>\u5b57"
        } else {
            g = 0 - g;
            f.tipEl.innerHTML = '\u5df2\u8d85\u51fa<span class="uic-err">' + g + "</span>\u5b57"
        }
    }, len: function () {
        return b.trim(c.val(this.el)).length
    } 
    });
    return d
}, { requires: ["dom", "event"] }); 