/*pub-1|2013-06-05 17:41:07*/
KISSY.add("order/util/inputmask", function (c, d, b) {
    function a(e) {
        this.el = d.get(e);
        this.labelEl = d.get("label", this.el);
        this.inputEl = d.get("#" + d.attr(this.labelEl, "for"));
        this.init()
    }
    c.augment(a, { init: function () {
        var e = this;
        b.on(e.inputEl, "focus", function () {
            d.addClass(e.el, "inputmask-active")
        });
        b.on(e.inputEl, "blur", function () {
            if ("" === c.trim(this.value)) {
                this.value = "";
                d.removeClass(e.el, "inputmask-active")
            }
        })
    } 
    });
    return a
}, { requires: ["dom", "event"] }); 