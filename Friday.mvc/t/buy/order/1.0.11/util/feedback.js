/*pub-1|2013-06-05 17:41:03*/
KISSY.add("order/util/feedback", function (c, d, a) {
    function b(g) {
        var e = this;
        var f = d.create('<div class="fn-feedback"></div>', { html: '<div class="feedback-inner"><div class="feedback-con"><div class="feedback-content"></div><s class="feedback-icon"></s></div><s class="feedback-arrow"></s><s class="feedback-close"></s></div>' });
        e.arrowEl = d.get("s.feedback-arrow", f);
        e.closeEl = d.get("s.feedback-close", f);
        e.contentEl = d.get("div.feedback-content", f);
        e.conEl = e.contentEl.parentNode;
        e.el = f;
        e.params = { cls: "", tip: true, type: "tip", arrow: "", content: "", closable: false };
        e._apply(g);
        a.on(e.closeEl, "click", function () {
            e.hide()
        });
        e._applyTip()
    }
    c.augment(b, c.EventTarget, { _applyTip: function () {
        var e = this;
        var g = [e.el];
        var h;
        var f = e.params.trigger || e.params.node;
        if (f) {
            g.push(f)
        }
        a.on(g, "mouseenter mouseleave", function (i) {
            if (h) {
                h.cancel()
            }
            if (!e.params.tip) {
                return
            }
            if ("mouseenter" === i.type) {
                e.show()
            } else {
                h = c.later(function () {
                    e.hide()
                }, 150)
            }
        })
    }, _apply: function (f) {
        this.params = c.merge(this.params, f);
        for (var e in this.params) {
            this._applyField(e, this.params[e])
        }
    }, _applyField: function (f, e) {
        if (e) {
            if ("type" === f) {
                return d.attr(this.conEl, "class", "feedback-con feedback-" + e)
            } else {
                if ("content" === f) {
                    return d.html(this.contentEl, e)
                } else {
                    if ("cls" === f) {
                        return d.attr(this.el, "class", "fn-feedback " + e)
                    } else {
                        if ("node" === f) {
                            return d.append(this.el, d.get(e))
                        }
                    }
                }
            }
        }
        if ("arrow" === f) {
            if (e) {
                d.attr(this.arrowEl, "class", "feedback-arrow feedback-arrow-" + e);
                return d.css(this.arrowEl, "visibility", "visible")
            } else {
                return d.css(this.arrowEl, "visibility", "hidden")
            }
        }
        if ("closable" === f) {
            return d.css(this.closeEl, "visibility", e ? "visible" : "hidden")
        }
    }, set: function (e, f) {
        this.params[e] = f;
        this._applyField(e, f);
        return this
    }, show: function (e) {
        e && this._apply(e);
        this.el.style.display = "block";
        d.addClass(d.parent(this.el), "fn-feedback-open");
        this.fire("show")
    }, hide: function () {
        this.el.style.display = "none";
        d.removeClass(d.parent(this.el), "fn-feedback-open");
        this.fire("hide")
    } 
    });
    b.render = function (f) {
        var e = '<div class="fn-feedback fn-feedback-static ' + (f.cls || "") + '"><div class="feedback-inner">';
        e += '<div class="feedback-con feedback-' + (f.type || "tip") + '"><div class="feedback-content">' + f.content + '</div><s class="feedback-icon"></s></div>';
        if (f.arrow) {
            e += '<s class="feedback-arrow feedback-arrow-' + f.arrow + '"></s>'
        }
        if (f.closable) {
            e += '<s class="feedback-close" data-evt="util/feedback:close"></s>'
        }
        return e + "</div></div>"
    };
    b.close = function (e) {
        d.remove(d.parent(e, "div.fn-feedback"))
    };
    return b
}, { requires: ["dom", "event"] }); 