KISSY.add("malldetail/other/lazy", function (A, D, C) {
    var B = new D("#content", {
        mod: "manual",
        autoDestroy: false,
        diff: 150
    });
    return {
        addCallback: function (E, F) {
            setTimeout(function () {
                if (typeof E == "string") {
                    E = C.query(E)
                }
                if (!E || (E && E.length == 0)) {
                    return
                }
                B.addCallback(E, function () {
                    if (C.css(E, "display") == "none") {
                        return false
                    }
                    return F()
                })
            }, 0)
        },
        addElements: function (E) {
            D(E, {
                diff: 200
            })
        },
        refresh: function () {
            B.refresh()
        }
    }
}, {
    requires: ["datalazyload", "dom"]
});