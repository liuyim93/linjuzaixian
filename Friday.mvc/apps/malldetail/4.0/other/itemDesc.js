KISSY.add("malldetail/other/itemDesc", function (C) {
    var D = KISSY,
		E = D.DOM;
    var F = window;

    function B(N) {
        var H = "#J_ItemDesc";
        var J = D.get(H);
        var G;
        var I = /(<img[^>]*)(src *= *("[^"]*"|'[^']*'|[^ >]*))/g;
        var L = 0;
        var K = "http://l.tbcdn.cn/kissy/1.0.0/build/imglazyload/spaceball.gif";
        var M = "_q75.jpg";
        if (!J) {
            return
        }
        N = N.replace(I, function (O, T, R, Q) {
            L++;
            if (C.cfg("detail").cdn75 && /img0[1-8]\.taobaocdn\.com/.test(Q)) {
                var S = Q.length;
                var P = Q.substr(S - 1);
                if (P == "'" || P == '"') {
                    Q = Q.substr(0, S - 1) + M + P
                } else {
                    Q += M
                }
            }
            return [T, 'src="' + K + '" data-ks-lazyload=', Q].join("")
        });
        if (D.UA.IE) {
            E.html(H, N)
        } else {
            G = J.cloneNode(false);
            G.innerHTML = N;
            J.parentNode.replaceChild(G, J);
            J = G
        }
        C.use("malldetail/other/lazy", function (O, P) {
            P.addElements(J)
        })
    }
    function A(H) {
        H = H || {};
        if (C.cfg("tag").isAsynDesc) {
            if (typeof F.desc === "undefined") {
                setTimeout(arguments.callee, 100);
                return
            } else {
                B(F.desc)
            }
            H.success && H.success()
        }
        var G = C.cfg("valFlashUrl");
        if (G) {
            D.use("malldetail/other/flashplayer", function (I) {
                I.TmdFlv.init(G)
            })
        }
    }
    return {
        init: function (G) {
            A(G)
        }
    }
}); 