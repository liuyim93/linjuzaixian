/*pub-1|2013-05-03 12:21:25*/
KISSY.add("tb-home/js/game/v2/accessible-tabs", function (d, f, b, a) {
    var e = "game:tabsFocus",
		c = "game:tabsHide";

    function g(h, j) {
        var i = this;
        if (!(i instanceof g)) {
            return new g(h, j)
        }
        g.superclass.constructor.call(i, h, j);
        return 0
    }
    d.extend(g, a);
    d.augment(g, {
        _init: function () {
            var h = this;
            g.superclass._init.call(h);
            h._setOriginalTabsIndex();
            h._bindInternalEvent()
        },
        _setOriginalTabsIndex: function () {
            var h = this,
				i = h.triggers;
            d.each(i, function (j) {
                f.attr(j, "tabindex", "-1")
            })
        },
        _setCurrentTabIndex: function () {
            var h = this,
				i = h.triggers[h.activeIndex];
            h._setOriginalTabsIndex();
            f.attr(i, "tabindex", "0")
        },
        _getCurrentTab: function () {
            var i = this;
            var h = null;
            d.each(i.triggers, function (j) {
                if (f.attr(j, "tabindex") === 0) {
                    h = j
                }
            });
            return h
        },
        _bindInternalEvent: function () {
            var h = this;
            b.on(h.container, "keydown", h._switchTabs, h)
        },
        _switchTabs: function (j) {
            var h = this;
            var i = j.keyCode;
            if (i === 37) {
                h.prev();
                h.triggers[h.activeIndex].focus();
                h._setCurrentTabIndex()
            } else {
                if (i === 39) {
                    h.next();
                    h.triggers[h.activeIndex].focus();
                    h._setCurrentTabIndex()
                }
            }
            j.stopPropagation()
        },
        detachEvent: function () {
            var h = this;
            b.remove("body", e);
            b.remove(h.container, "keydown", h._switchTabs, h)
        }
    });
    return g
}, {
    requires: ["dom", "event", "switchable"]
});