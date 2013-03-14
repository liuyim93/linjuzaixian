KISSY.add("malldetail/sku/popupsimulate", function (B, D) {
    var G = B.mods.SKU, C = KISSY, F = C.DOM, A = C.Event, H = document, E = H.body;
    G.PopupSimulate = function () {
        var I = "tb-act", N = "click", Q = "tb-attention", O = "tb-btn-inbox";
        var R = false;
        var K;
        var M;
        var J = function () {
            var U, T = K.linkAdd, V = K.linkBasket;
            if (!M) {
                return
            }
            var W = document.createElement("p");
            W.className = "tb-note-title";
            W.innerHTML = '\u8bf7\u9009\u62e9\u60a8\u8981\u7684\u5546\u54c1\u4fe1\u606f<b class="J_PanelCloser">\u5173\u95ed</b>';
            var S = C.query("div.tb-skin", M)[0];
            S.insertBefore(W, S.firstChild);
            U = C.query("b.J_PanelCloser", M);
            C.each([K.linkBuy, T, V], function (X) {
                if (X) {
                    A.on(X, N, function () {
                        F.removeClass(C.query("a." + I, M), I);
                        F.addClass(this, I)
                    })
                }
            });
            M.close = function () {
                F.removeClass(M, Q);
                F.removeClass(C.query("a." + O, M), O)
            };
            A.on(U, N, M.close);
            if (K.elmProps) {
                C.each(K.elmProps, function (X) {
                    A.on(X, N, L)
                })
            }
        };
        function L() {
            if (!M) {
                return
            }
            var S = C.query("a." + I, M);
            if (F.hasClass(M, Q)) {
                if (D.run()) {
                    F.addClass(S, O)
                } else {
                    F.removeClass(S, O)
                }
            }
        }
        function P() {
            K = B.cfg();
            M = K.divKeyProp;
            R = true
        }
        return { init: function () {
            if (!R) {
                P()
            }
            J()
        }, checkActs: function () {
            if (!R) {
                P()
            }
            L()
        } 
        }
    } ()
}, { requires: ["malldetail/sku/validator"] }); /*pub-1|2013-01-06 16:13:20*/