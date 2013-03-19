KISSY.add("malldetail/dc/dc", function (F, D, L, H, A, M) {
    var K, B, G;

    function J(N) {
        D({
            url: N,
            jsonpCallback: "jsonpDC",
            cache: true,
            dataType: "jsonp",
            success: function (O) {
                if (O.isSuccess) {
                    E(O)
                }
                K()
            },
            timeout: 10000,
            error: function () {
                L.hide("#J_DcHd");
                K()
            }
        })
    }
    var C = {
        DcHd: function () {
            var P = H.ie;
            if (P && P === 6) {
                var N = L.get("#content"),
					O;
                if (L.hasClass(N, "head-expand")) {
                    return
                }
                O = L.get("#hd", N);
                if (O && O.offsetHeight > 150) {
                    L.css(O, "height", "150px")
                }
            }
        }
    };

    function I(S) {
        var T = document;
        var N = [];
        for (var Q in S) {
            var U = S[Q];
            if (U.html) {
                if (H.ie && (H.ie < 9)) {
                    var R = U.html.match(/([^>]+?)(?=<\/style>)/gi);
                    if (R) {
                        N.push(R.join(" "))
                    }
                }
                if (Q == "DcLeft" && F.get("#side-shop-info")) {
                    var O = T.createElement("div");
                    O.innerHTML = U.html;
                    O.style.cssText = "position:absolute;left:-9999em;bottom:-9999em";
                    L.insertBefore(O, document.body.firstChild);
                    var P = L.children(O)[0];
                    L.remove(L.get("#side-shop-info", P));
                    U.html = P.innerHTML;
                    L.remove(O);
                    O = P = null
                }
            }
        }
        if (N.length) {
            L.addStyleSheet(N.join(""))
        }
        return S
    }
    function E(Q) {
        var N = F.query(".J_DcAsyn");
        var R = document.createElement("div");
        var O = H.ie && (H.ie === 6 || H.ie === 7);
        var P = function (T, S) {
            R.innerHTML = "a" + S;
            if (O) {
                F.each(L.query("input", R), function (V) {
                    if (V.type && V.type.toLowerCase() === "submit" && (V.value === "" || V.value === "\u63d0\u4ea4\u67e5\u8be2\u5185\u5bb9")) {
                        V.value = " "
                    }
                })
            }
            try {
                L.html(T, R.innerHTML.substring(1), true)
            } catch (U) {
                F.log("DC render error:" + U.message)
            }
        };
        Q = I(Q);
        F.each(N, function (W) {
            var U = W.id.replace(/J_/, "");
            if (U !== "DcHd" && (U in Q)) {
                var T = Q[U];
                var S = L.create('<div style="display: none"></div>');
                var V = null;
                L.prepend(S, document.body);
                P(W, T.html);
                M.addElements(W)
            }
        });
        F.flush()
    }
    function K() {
        F.use("malldetail/shop/shop", function (N, O) {
            if (!N.mods.Token) {
                O.init(B);
                return
            }
            setTimeout(function () {
                N.mods.Token.onInited(function () {
                    O.init(B)
                })
            }, 30)
        });
        K = function () { };
        return K()
    }
    return {
        init: function (O) {
            B = O;
            var N = F.cfg("api").fetchDcUrl;
            if (N) {
                J(N)
            } else {
                K()
            }
        }
    }
}, {
    requires: ["ajax", "dom", "ua", "malldetail/shop/shop", "malldetail/other/lazy"]
});