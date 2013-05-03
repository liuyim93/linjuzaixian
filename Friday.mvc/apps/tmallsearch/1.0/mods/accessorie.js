KISSY.add(V + "/mods/accessorie", function (B) {
    var G = B.DOM,
		C = B.Event;
    var F = G.get("#J_Accessories"),
		A = G.attr(F, "data-url");
    return {
        init: function () {
            F && B.io.get(A, {
                t: +new Date
            }, function (J) {
                G.html(F, J);
                var I = G.get(".j_QTotal"),
					E = G.get(".j_QMore"),
					H = G.get(".product", F);
                if (I && E) {
                    var L = G.html(I).match(/\d+/),
						L = L ? L[0] : "",
						K = parseInt(L),
						D = function () {
						    var O = Math.floor(G.innerWidth(F) / G.outerWidth(H)),
								N = Math.floor(G.innerHeight(F) / G.outerHeight(H)),
								M = O * N;
						    K <= M && G.hide(E)
						};
                    D();
                    LIST.msg.on("viewchange", function (M) {
                        D()
                    })
                }
            })
        }
    }
}); 