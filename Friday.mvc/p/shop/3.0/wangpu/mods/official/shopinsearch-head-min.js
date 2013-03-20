KISSY.add("wangpu/mods/official/shopinsearch-head", function (c, f) {
    var e = document,
		d = c.DOM,
		a = c.Event;

    function b(h) {
        var g = this;
        g._mod = h.mod;
        if (!g._mod) {
            return
        }
        g._init()
    }
    c.augment(b, {
        _init: function () {
            c.log("ShopinsearchHead init start");
            this._inputHint("#J_ShopSKey");
            c.log("ShopinsearchHead init end")
        },
        _inputHint: function (j) {
            j = d.get(j);
            if (!j) {
                return
            }
            var i = j.parentNode,
				g = "focus",
				h = function () {
				    "" !== j.value ? d.addClass(i, g) : d.removeClass(i, g)
				};
            a.on(j, g, function (k) {
                d.addClass(i, g)
            });
            a.on(j, "blur", h);
            setTimeout(h, 0)
        }
    });
    b.selector = ".tshop-pbsm-ssish10c";
    return b
}, {
    requires: ["core"]
});