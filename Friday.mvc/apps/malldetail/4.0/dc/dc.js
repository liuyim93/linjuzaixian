KISSY.add("malldetail/dc/dc", function (_kissy_F, _ajax, _dom, _ua, _malldetail_shop_shop, _malldetail_other_lazy) {
    var K, B, G;

    function J(N) {
        _ajax({
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
                _dom.hide("#J_DcHd");
                K()
            }
        })
    }
    var C = {
        DcHd: function () {
            var P = _ua.ie;
            if (P && P === 6) {
                var N = _dom.get("#content"),
					O;
                if (_dom.hasClass(N, "head-expand")) {
                    return
                }
                O = _dom.get("#hd", N);
                if (O && O.offsetHeight > 150) {
                    _dom.css(O, "height", "150px")
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
                if (_ua.ie && (_ua.ie < 9)) {
                    var R = U.html.match(/([^>]+?)(?=<\/style>)/gi);
                    if (R) {
                        N.push(R.join(" "))
                    }
                }
                if (Q == "DcLeft" && _kissy_F.get("#side-shop-info")) {
                    var O = T.createElement("div");
                    O.innerHTML = U.html;
                    O.style.cssText = "position:absolute;left:-9999em;bottom:-9999em";
                    _dom.insertBefore(O, document.body.firstChild);
                    var P = _dom.children(O)[0];
                    _dom.remove(_dom.get("#side-shop-info", P));
                    U.html = P.innerHTML;
                    _dom.remove(O);
                    O = P = null
                }
            }
        }
        if (N.length) {
            _dom.addStyleSheet(N.join(""))
        }
        return S
    }
    function E(Q) {
        var N = _kissy_F.query(".J_DcAsyn");
        var R = document.createElement("div");
        var O = _ua.ie && (_ua.ie === 6 || _ua.ie === 7);
        var P = function (T, S) {
            R.innerHTML = "a" + S;
            if (O) {
                _kissy_F.each(_dom.query("input", R), function (V) {
                    if (V.type && V.type.toLowerCase() === "submit" && (V.value === "" || V.value === "\u63d0\u4ea4\u67e5\u8be2\u5185\u5bb9")) {
                        V.value = " "
                    }
                })
            }
            try {
                _dom.html(T, R.innerHTML.substring(1), true)
            } catch (U) {
                _kissy_F.log("DC render error:" + U.message)
            }
        };
        Q = I(Q);
        _kissy_F.each(N, function (W) {
            var U = W.id.replace(/J_/, "");
            if (U !== "DcHd" && (U in Q)) {
                var T = Q[U];
                var S = _dom.create('<div style="display: none"></div>');
                var V = null;
                _dom.prepend(S, document.body);
                P(W, T.html);
                _malldetail_other_lazy.addElements(W)
            }
        });
        _kissy_F.flush()
    }
    function K() {
        _kissy_F.use("malldetail/shop/shop", function (N, O) {
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
            var N = _kissy_F.cfg("api").fetchDcUrl;
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