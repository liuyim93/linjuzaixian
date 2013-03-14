
KISSY.add("malldetail/sku/ifclocation", function (D) {
    var M = D.mods.SKU, F = KISSY, R = F.DOM, W = F.Event, L = F.UA, X = document, J = X.body;
    var E;
    var U, P, C, I, N, H, B, G;
    var O = "\u8be5\u89c4\u683c\u6682\u672a\u5728\u4f53\u9a8c\u9986\u5185\u5c55\u793a";
    var V;
    var Q = false;
    var K;
    function A(S) {
        if (S.style == 1) {
            E = R.create('<div class="ifc-location ifc-location-expand" id="J_IFCLocation"></div>')
        } else {
            E = R.create('<div class="ifc-location" id="J_IFCLocation"></div>')
        }
        P = R.create('<div class="ifc-city ifc-lo"></div>');
        B = R.create('<div class="ifc-cities"></div>');
        P.appendChild(B);
        H = R.create('<a class="ifc-more ifc-lo"></a>');
        P.appendChild(H);
        I = R.create('<a class="ifc-control ifc-lo ifc-control-expansion"></a>');
        P.appendChild(I);
        E.appendChild(P);
        K.show().append(E)
    }
    M.IFCLocation = function () {
        return { init: function (Y) {
            U = Y.jzDO["skuMap"];
            if (!U || !(K = F.one("#J_guarantee"))) {
                return
            }
            A(Y);
            if (!U["default"] || U["default"].length == 0) {
                B.innerHTML = O
            } else {
                B.innerHTML = U["default"][0]
            }
            N = R.width(B) + 30;
            if (R.hasClass(E, "ifc-location-expand")) {
                E.style.width = N + "px";
                P.style.display = "block";
                if (Q) {
                    H.style.display = "inline-block"
                } else {
                    H.style.display = "none"
                }
            } else {
                E.style.width = "0px";
                B.style.display = "none";
                H.style.display = "none"
            }
            V = X.createElement("div");
            V.className = "j_IFCLocation_more";
            var S = [];
            if (R.hasClass(E, "ifc-location-expand")) {
                S = U["default"]
            } else {
                for (var T in U) {
                    if (U[T]) {
                        for (var Z = 0; Z < U[T].length; Z++) {
                            S.push(U[T][Z])
                        }
                    }
                }
            }
            for (var T = 1; T < S.length; T++) {
                V.innerHTML += "<a href='javascript:void(0);'>" + S[T] + "</a>"
            }
            if (S.length <= 1) {
                Q = false
            } else {
                Q = true
            }
            (S.length <= 1) && (V.style.display = "none");
            R.css(V, { width: R.width(".ifc-cities") + 28, top: R.offset(".ifc-city").top + R.height(".ifc-city") + (F.UA.ie == 6 ? -6 : 0), left: R.offset(".ifc-city").left - 1, display: "none" });
            J.insertBefore(V, J.childNodes[0]);
            W.on(".ifc-more", "click", function () {
                R.css(V, { width: N - 2, top: R.offset(".ifc-city").top + R.height(".ifc-city") + (F.UA.ie == 6 ? -2 : 0), left: R.offset(".ifc-city").left - 1 + (F.UA.ie == 6 ? -3 : 0) });
                V.style.display = (V.style.display == "block") ? "none" : "block";
                if (V.innerHTML == "") {
                    V.style.display = "none"
                }
            });
            D.onBDclick(function (a) {
                if (a.target != V && !R.hasClass(a.target, "ifc-more")) {
                    if (a.target.parentNode) {
                        if (!R.hasClass(a.target.parentNode, "j_IFCLocation_more")) {
                            V.style.display = "none"
                        }
                    } else {
                        V.style.display = "none"
                    }
                }
            });
            W.on(I, "click", function () {
                if (!R.hasClass(E, "ifc-location-expand")) {
                    R.addClass(E, "ifc-location-expand");
                    var a = new KISSY.Anim(E, { width: N + "px" }, 0.5, "easeOutStrong", function () {
                        if (Q) {
                            R.css(".ifc-more", "display", "inline-block")
                        }
                    });
                    setTimeout(function () {
                        B.style.display = "block"
                    }, 200);
                    a.run()
                } else {
                    R.removeClass(E, "ifc-location-expand");
                    B.style.display = "none";
                    H.style.display = "none";
                    var a = new KISSY.Anim(E, { width: "0px" }, 0.5, "easeOutStrong");
                    a.run()
                }
                V.style.display = "none"
            });
            if (M.selectSkuId) {
                M.IFCLocation.change(M.selectSkuId)
            }
            M.PropertyHandler.onSkuChange(function (a) {
                M.IFCLocation.change(a.skuId)
            })
        }, change: function (Z) {
            if (!Z) {
                Z = "default"
            }
            var Y;
            V.innerHTML = "";
            if (!U[Z] || U[Z].length == 0) {
                Y = O;
                V.style.display = "none";
                Q = false
            } else {
                if (U[Z].length <= 1) {
                    Q = false
                } else {
                    Q = true
                }
                Y = U[Z][0];
                for (var T = 1; T < U[Z].length; T++) {
                    V.innerHTML += "<a>" + U[Z][T] + "</a>"
                }
            }
            B.innerHTML = Y;
            var S = X.createElement("a");
            S.innerHTML = Y;
            J.insertBefore(S, J.childNodes[0]);
            N = R.width(S) + 30;
            S.parentNode.removeChild(S);
            if (R.hasClass(E, "ifc-location-expand")) {
                E.style.width = N + "px"
            }
        } 
        }
    } ()
}, { requires: [] }); /*pub-1|2013-01-06 16:13:20*/