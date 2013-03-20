KISSY.add("wangpu/mods/official/page-banner", function (d, f, b) {
    var e = d.DOM,
		a = d.Event;

    function c(h) {
        var g = this;
        g._mod = h.mod;
        if (!g._mod) {
            return
        }
        g._init()
    }
    d.augment(c, {
        _init: function () {
            d.log("PageBanner init start");
            var g = this;
            g._initCatsPopup();
            d.log("PageBanner init end")
        },
        _initCatsPopup: function () {
            var g = e.get("#J_HeadCatsPopup");
            if (g) {
                new b.Popup({
                    srcNode: e.get("#content").appendChild(g),
                    trigger: "#J_HeadCats",
                    triggerType: "mouse",
                    delay: 0.2,
                    elStyle: {
                        display: "block",
                        visibility: "hidden"
                    },
                    align: {
                        node: "#J_HeadCats",
                        points: ["bc", "tl"],
                        offset: [-47, 4]
                    }
                })
            }
        }
    });
    c.selector = ".tshop-pbsm-spb10c";
    return c
}, {
    requires: ["core", "overlay"]
});