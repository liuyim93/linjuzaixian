KISSY.add(V + "/mods/list-view", function (C, A) {
    var H = C.DOM,
		G = C.Event;

    function F() {
        var D = ["ui-more-drop-l", "ui-more-drop-l-arrow"],
			I = ["ui-more-expand-l", "ui-more-expand-l-arrow"],
			K, E, J = function (M, L) {
			    H.replaceClass(K, M[0], L[0]);
			    H.replaceClass(E, M[1], L[1])
			};
        G.on(".j_Pro", "mouseenter mouseleave", function (M) {
            var L = this;
            K = H.get(".j_ProInfoSPUHd", L);
            if (K) {
                E = H.get("i", K);
                if (M.type === "mouseenter") {
                    J(D, I)
                } else {
                    J(I, D)
                }
            }
        })
    }
    function B() {
        if (C.UA.ie == 6) {
            G.on(".j_ProInfoSPUBd", "mouseenter", function (D) {
                if (this.inited) {
                    G.detach(this, "mouseenter")
                } else {
                    G.on(C.query("li", this), "mouseenter mouseleave", function (E) {
                        if (E.type == "mouseenter") {
                            H.addClass(this, "li-hover")
                        } else {
                            H.removeClass(this, "li-hover")
                        }
                    });
                    this.inited = true
                }
            });
            G.on(".j_Pro", "mouseenter", function () {
                H.addClass(this, "product-hover")
            });
            G.on(".j_Pro", "mouseleave", function () {
                H.removeClass(this, "product-hover")
            })
        }
    }
    return {
        init: function () {
            F();
            B();
            A("#J_ItemList", {
                mod: "manual",
                diff: 0
            })
        }
    }
}, {
    requires: ["datalazyload"]
});