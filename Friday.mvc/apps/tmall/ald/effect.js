(function (A, B) {
    if (A.effect) {
        return
    }
    var D = B.isFunction;
    var C = {
        tab: function (F, H) {
            var G = B.DOM,
				E = B.Event;
            B.each(G.query(".ald-tab"), function (I) {
                var L = G.query(".ald-tab-trigger", I);
                var J = G.query(".ald-tab-panel", I);
                if (L.length && L.length === J.length) {
                    var M, K;
                    B.each(L, function (O, N) {
                        if (G.hasClass(O, "ald-tab-trigger-active")) {
                            K = O;
                            M = J[N]
                        }
                        E.on(O, "click", function (P) {
                            P.halt();
                            if (M) {
                                M.style.display = "none";
                                G.removeClass(K, "ald-tab-trigger-active")
                            }
                            K = this;
                            M = J[N];
                            M.style.display = "block";
                            G.addClass(K, "ald-tab-trigger-active")
                        })
                    });
                    if (!K) {
                        L[0].click()
                    }
                }
            })
        },
        carousel: function (F, H, I) {
            var G = B.DOM;
            var E = G.hasClass(F, "ald-carousel") ? F : G.get(".ald-carousel", F);
            if (!E) {
                return
            }
            B.use("switchable,datalazyload", function (K, J) {
                var M = K.Carousel || J.Carousel;
                var L = new M(E, K.merge({
                    contentCls: "ald-switchable-content",
                    triggerCls: "ald-switchable-trigger",
                    effect: "scrolly",
                    circular: true,
                    hasTriggers: false,
                    prevBtnCls: "ald-switchable-prev-btn",
                    nextBtnCls: "ald-switchable-next-btn",
                    disableBtnCls: "ald-switchable-disable-btn",
                    easing: "easeOutStrong",
                    viewSize: [150, 450],
                    lazyDataType: "img-src",
                    steps: 3
                }, H));
                G.data(F, "ald-carousel", L);
                if (D(I)) {
                    I()
                }
            })
        }
    };
    A.effect = function (G, H, I) {
        if (D(H)) {
            I = H;
            H = {}
        }
        for (var F in C) {
            var E = C[F];
            if (D(E)) {
                E(G, H, I)
            }
        }
    };
    A.effects = C
})(ALD.util, KISSY); 