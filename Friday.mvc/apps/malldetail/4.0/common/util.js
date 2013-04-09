KISSY.add("malldetail/common/util", function (_kissy, _dom, _event) {
    var D = {};
    return { createLoader: function (H) {
        var G, I, E = [], F;
        return function (K, J) {
            if (J !== 0 && !J) {
                J = 1
            }
            if ((J & 1) && !I) {
                I = true;
                H(function (L) {
                    G = L;
                    while (F = E.shift()) {
                        F && F.apply(null, [G])
                    }
                })
            }
            if (G) {
                K && K.apply(null, [G]);
                return G
            }
            if (!(J & 2)) {
                K && E.push(K)
            }
            return G
        }
    }, createAsyn: function (E, F) {
        var K, J, I, H, G = [];
        E(function (L) {
            J = L;
            while (H = G.shift()) {
                H.handle.apply(null, [J])
            }
        }, 0);
        return function (M, L) {
            if (L !== 0 && !L) {
                L = 1
            }
            if ((L & 1) && !K) {
                setTimeout(function () {
                    if (J !== undefined) {
                        return
                    }
                    I = true;
                    for (var N = 0; N < G.length; N++) {
                        G[N].handle.apply(null, [J]);
                        if (!(G[N].type & 8)) {
                            G.splice(N, 1);
                            N--
                        }
                    }
                }, F || 200);
                E(null, L)
            }
            if (!M) {
                return
            }
            if (J !== undefined || !(L & 4)) {
                E(M, L);
                return
            }
            if (I) {
                M();
                if (L & 8) {
                    E(M, L)
                }
            } else {
                G.push({ handle: M, type: L })
            }
        }
    }, loadAssets: function (G, L, F) {
        var J;
        if (F) {
            if ((J = F()) !== undefined) {
                L && L(J);
                return
            }
        }
        G = G.replace(/^[\/\\]+/g, "").replace(/\?\?/g, "?");
        var E = G.split("?", 2), K = E[0], I = E[1] || "", H = D[K] || (D[K] = { path: K, status: 0, callbacks: [], timestamp: [] });
        if (F) {
            H.getter = F
        }
        if (H.status == 2) {
            L && L(F ? F() : undefined)
        }
        L && H.callbacks.push(L);
        I && H.timestamp.push(I);
        setTimeout(function () {
            var S = {};
            for (var W in D) {
                var Y = D[W];
                if (Y.status) {
                    continue
                }
                Y.status = 1;
                var a = /\.([^\.$]+)$/.test(W), U = (a && a[1]) || "js";
                var X = S[U] || (S[U] = { items: [] });
                X.items.push(Y)
            }
            for (var W in S) {
                //var X = S[W], T = X.items, M = window.g_config.assetsHost || "http://l.tbcdn.cn", Z = [], R = [], Q = undefined, P;
                var X = S[W], T = X.items, M = window.g_config.assetsHost || "http://localhost:7525", Z = [], R = [], Q = undefined, P;
                M += "/";
                for (var O = 0; O < T.length; O++) {
                    var N = T[O].path;
                    if (Q === undefined) {
                        Q = N;
                        P = Q.length
                    } else {
                        while (Q && (N.substring(0, P) != Q)) {
                            var V = Q.lastIndexOf("/", Q.length - 2);
                            if (V < 0) {
                                Q = "";
                                break
                            }
                            Q = Q.substring(0, V + 1);
                            P = Q.length
                        }
                    }
                    Z.push(T[O].path);
                    R = R.concat(T[O].timestamp)
                }
                if (Q && Z.length > 1) {
                    M += Q + "??";
                    for (var O = 0; O < Z.length; O++) {
                        Z[O] = Z[O].substring(P)
                    }
                } else {
                    M += "??"
                }
                M += Z.join(",");
                R.sort();
                for (var O = R.length - 1; O >= 0; O--) {
                    if (R[O] == R[O - 1]) {
                        R.splice(O, 1)
                    }
                }
                if (R[0]) {
                    M += "?" + R.join("&")
                }
                _kissy.getScript(M, function () {
                    for (var c = 0; c < T.length; c++) {
                        T[c].status = 2;
                        var b, d = T[c].callbacks;
                        while (b = d.shift()) {
                            b(T[c].getter ? T[c].getter() : undefined)
                        }
                    }
                })
            }
        }, 16)
    }, initHover: function () {
        var E = arguments.callee._hover;
        if (E === undefined) {
            if (E = arguments.callee._hover = !("ontouchstart" in document)) {
                _dom.addClass("body", "enableHover")
            } else {
                _dom.removeClass("body", "enableHover")
            }
        }
        return E
    }, fixHover: function (H, G, F) {
        var E = this.initHover(), I = _kissy.UA.ie == 6;
        F = F || "hover";
        if (!E || I) {
            G = I ? "mouse" : (G || "click");
            _kissy.each(_dom.query(H), function (L) {
                if (!E || (I && L.nodeName != "A")) {
                    function K(M) {
                        _dom.addClass(L, F)
                    }
                    function J(M) {
                        if (G != "touch" && G != "mouse" && (M.target == L || _dom.contains(L, M.target))) {
                            return
                        }
                        _dom.removeClass(L, F)
                    }
                    if (G == "touch") {
                        _event.on(L, "touchstart", K);
                        _event.on(L, "touchend", J);
                        _dom.style(L, { WebkitTouchCallout: "none" })
                    } else {
                        if (G == "mouse") {
                            _event.on(L, "mouseenter", K);
                            _event.on(L, "mouseleave", J)
                        } else {
                            _event.on(L, "mousedown touchstart", K);
                            _event.on(document, "mousedown touchstart", J)
                        }
                    }
                }
            })
        }
    } 
    }
}, { requires: ["dom", "event"] });