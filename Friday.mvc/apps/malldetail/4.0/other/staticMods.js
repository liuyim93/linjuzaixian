KISSY.add("malldetail/other/staticMods", function (C, E) {
    var D = C.DOM;

    function B() {
        return C.query(".J_TMDStaticMod")
    }
    function F(G) {
        var H = B();
        C.each(H, function (J) {
            var K = D.attr(J, "data-type");
            var M = D.attr(J, "data-params");
            if (M) {
                M = C.JSON.parse(M);
                K = K || M.type
            }
            if (G[K]) {
                var L = G[K];
                var I = L.html;
                var I = M ? E(I).render(M) : I;
                D.html(J, I, false, function () {
                    if (L.callBack && C.isFunction(L.callBack)) {
                        L.callBack()
                    }
                });
                delete G[K]
            }
        })
    }
    function A() {
        C.use("malldetail/data/ajax", function (G, H) {
            F(H)
        })
    }
    return {
        init: function () {
            A()
        }
    }
}, {
    requires: ["template", "malldetail/data/ajax"]
}); 