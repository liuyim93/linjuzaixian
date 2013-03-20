KISSY.add("wangpu/mods/official/search-list", function (c, e) {
    var d = c.DOM,
		b = c.Event;

    function a(g) {
        var f = this;
        f._mod = g.mod;
        if (!f._mod) {
            return
        }
        f._init()
    }
    c.augment(a, {
        _init: function () {
            c.log("SearchList init start");
            b.on(d.query("#J_AttrBox .x-more"), "click", function () {
                var l = d.parent(this, "tr");
                var g = d.query("li", l);
                if (g.length > 6) {
                    for (var f = 6; f < g.length; f++) {
                        d.toggleClass(g[f], "hidden")
                    }
                }
                var h = d.query("i", this);
                var k = d.query("span", this);
                d.toggleClass(h, "part");
                d.toggleClass(k, "hidden")
            });
            b.on(d.query("#J_PropSingle .more"), "click", function () {
                var f = d.query("#J_AttrBox tr");
                if (f.length > 3) {
                    for (var g = 3; g < f.length; g++) {
                        d.toggleClass(f[g], "hidden")
                    }
                }
                var g = d.query("i", this);
                var h = d.query("span", this);
                d.toggleClass(g, "part");
                d.toggleClass(h, "hidden")
            });
            b.on(d.query("#J_TBaotypeBox"), "click", function () {
                var f = document.getElementById("baobei_type").value;
                if (f == "1003") {
                    document.getElementById("baobei_type").value = ""
                } else {
                    document.getElementById("baobei_type").value = "1003"
                }
                document.getElementById("shop-search-list").submit()
            });
            c.log("SearchList init end")
        }
    });
    a.selector = ".tshop-pbsm-ssl10w";
    return a
}, {
    requires: ["core"]
});