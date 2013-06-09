/*pub-1|2013-06-05 17:41:08*/
KISSY.add("order/util/popup", function (b, e, a, c) {
    var d = e.create('<div class="order-mask-layer"></div>');
    e.prepend(d, document.body);
    function f(i) {
        var g = this;
        var h = e.create('<div class="order-popup"></div>', { html: '<div class="order-popup-header"></div><div class="order-popup-content"></div><a href="#hide" title="\u5173\u95ed" class="order-popup-hide"></a>' });
        e.insertAfter(h, document.body.lastChild);
        g.el = h;
        g.headerEl = e.get("div.order-popup-header", h);
        g.contentEl = e.get("div.order-popup-content", h);
        a.on(window, "resize scroll", function () {
            if (!g.isShow) {
                return
            }
            g.center()
        });
        a.on(h, "click", function (j) {
            if (e.hasClass(j.target, "order-popup-hide")) {
                j.halt();
                g.hide()
            }
        });
        this.params = { cls: "", mask: true, center: true, header: "", content: "", closable: true };
        this._apply(i)
    }
    b.augment(f, b.EventTarget, { show: function (g) {
        this.isShow = true;
        g && this._apply(g);
        d.style.display = this.params.mask ? "block" : "none";
        this.el.style.display = "block";
        this.center();
        this.fire("show")
    }, hide: function () {
        this.isShow = false;
        this.el.style.display = "none";
        d.style.display = "none";
        this.fire("hide")
    }, _apply: function (h) {
        this.params = b.merge(this.params, h);
        for (var g in this.params) {
            this._applyField(g, this.params[g])
        }
    }, _applyField: function (h, g) {
        if ("cls" === h) {
            this.el.className = "order-popup " + (g || "")
        } else {
            if ("header" === h) {
                if (g) {
                    this.headerEl.innerHTML = g;
                    this.headerEl.style.display = "block"
                } else {
                    this.headerEl.style.display = "none"
                }
            } else {
                if ("content" === h) {
                    this.contentEl.innerHTML = g
                } else {
                    if ("closable" === h) {
                        this[g ? "removeClass" : "addClass"]("order-modal-popup")
                    }
                }
            }
        }
    }, addClass: function (g) {
        e.addClass(this.el, g);
        return this
    }, removeClass: function (g) {
        e.removeClass(this.el, g);
        return this
    }, set: function (g, h) {
        if (b.isPlainObject(g)) {
            b.each(g, function (i, j) {
                this.params[j] = i;
                this._applyField(j, i)
            }, this)
        } else {
            this.params[g] = h;
            this._applyField(g, h)
        }
        return this
    }, center: function () {
        if (!this.params.center) {
            return
        }
        var h = this.el;
        var i = e.scrollTop();
        var g = e.viewportHeight();
        if (6 === c.ie) {
            e.css(d, "top", i);
            e.css(d, "height", g)
        }
        e.css(h, { top: (g - e.outerHeight(h)) * 6 / 13 + i, left: (e.viewportWidth() - e.outerWidth(h)) / 2 })
    } 
    });
    return f
}, { requires: ["dom", "event", "ua"] }); 