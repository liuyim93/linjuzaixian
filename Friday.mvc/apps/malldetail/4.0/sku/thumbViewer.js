KISSY.add("malldetail/sku/thumbViewer", function (E, P, T, R, D, I) {
    var J = document.body, G, A, B, K, L = 100, F = "tb-selected", N = "hidden", O, Q = (window.g_config.D950) ? { size: [460, 460], smallSize: [60, 60], bigSize: [477, 335]} : { size: [310, 310], smallSize: [40, 40], bigSize: [430, 310] };
    var H = I.createLoader(function (V) {
        if ("ontouchstart" in document) {
            return
        }
        var U = { imageNode: G, width: Q.bigSize[0], height: Q.bigSize[1], bigImageWidth: 800, bigImageHeight: 800, align: { node: P.parent(G), points: ["tr", "tl"], offset: [10, -1] }, hasZoom: !("ontouchstart" in document), preload: false, showIcon: true };
        var S = new R(U);
        if (S.lensIcon) {
            T.on(S.lensIcon, "mouseenter", function () {
                P.hide(this)
            })
        }
        V(S)
    });
    function C(U, W, V) {
        var S = C.images || (C.images = {});
        S[U] = S[U] || (S[U] = I.createLoader(function (Z) {
            var X = new Image();
            T.on(X, "load", function () {
                Z(X)
            });
            X.src = U;
            var Y = C.elem;
            if (!Y) {
                Y = C.elem = P.create('<div style="width:0;height:0;overflow:hidden;">');
                J.insertBefore(Y, J.firstChild)
            }
            Y.appendChild(X)
        }));
        return S[U](W, V)
    }
    function M(S) {
        var U = S.src || P.attr(S, "data-ks-lazyload");
        return U.replace(new RegExp("_" + Q.smallSize.join("x") + "\\.(jpg|png|gif)$"), "")
    }
    return { init: function () {
        var S = this;
        if (!(G = P.get("#J_ImgBooth")) || !(A = P.get("#J_UlThumb"))) {
            return
        }
        B = P.query("li", A);
        O = parseInt(G.getAttribute("data-hasZoom"), 10);
        S._bindEvents();
        E.ready(function () {
            var U = P.query("." + F, A);
            if (U && U.length) {
                S._switchTo(U[0])
            }
        })
    }, _bindEvents: function () {
        var S = this;
        T.on(A, "click", function (U) {
            U.preventDefault()
        });
        T.on(B, "mouseenter", function (U) {
            K && K.cancel();
            K = E.later(function () {
                S._switchTo(U.target);
                E.sendAtpanel("tmalldetail.13.6")
            }, L)
        });
        T.on(B, "mouseleave", function () {
            K && K.cancel()
        })
    }, _switchTo: function (Y) {
        if (!Y) {
            return
        }
        if (Y.tagName !== "LI") {
            Y = P.parent(Y, "li")
        }
        var V = Y.getElementsByTagName("img")[0];
        var W = M(V);
        if (!W) {
            return
        }
        var X = W + "_" + Q.size.join("x") + ".jpg";
        var U = P.attr(Y, "data-size");
        var S = function (Z) {
            if (Z.zm) {
                H(function (a) {
                    a.set(X);
                    a.set("hasZoom", true);
                    a.set("bigImageSrc", W);
                    a.set("bigImageWidth", Z.w);
                    a.set("bigImageHeight", Z.h)
                })
            }
        };
        this.show(X);
        P.addClass(Y, F);
        U = D.parse(U);
        if (U) {
            S(U)
        } else {
            C(W, function (a) {
                var Z = { w: a.width, h: a.height };
                Z.zm = (a.width >= O) ? 1 : 0;
                P.attr(Y, { "data-size": D.stringify(Z) });
                S(Z)
            })
        }
    }, show: function (S) {
        if (!G || !A) {
            G = G || P.get("#J_ImgBooth");
            A = A || P.get("#J_UlThumb")
        }
        if (!G || !A) {
            return
        }
        P.removeClass(B, F);
        G.src = S;
        H(function (U) {
            U && U.set("hasZoom", false)
        })
    } 
    }
}, { requires: ["dom", "event", "imagezoom", "json", "malldetail/common/util"] }); /*pub-1|2013-01-06 16:13:19*/