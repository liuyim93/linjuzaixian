KISSY.add("malldetail/common/tbskip", function (C, G) {
    var J = C.DOM,
		E = C.UA;
    var I, F = "TB_recentViewedItems",
		B = "~",
		A = "-",
		D = 6,
		H = "#J_itemViewed";
    return {
        init: function () {
            var L = this,
				N;
            var M = 1;
            if (!G.fpv()) {
                return
            }
            N = window.g_config.assetsHost + "/app/tbskip/lsoSaver.swf?t=_1.swf";
            N = N.replace(/l\.tbcdn\.cn/, "a.tbcdn.cn");

            function K() {
                if (I && I.read && I.save) {
                    L._saveData();
                    C.log("tbskip: save", "info")
                } else {
                    if (M > 20) {
                        C.log("tbskip: end", "info")
                    } else {
                        C.later(arguments.callee, 100);
                        M++
                    }
                }
            }
            I = new G({
                src: N,
                attrs: {
                    width: 1,
                    height: 1
                },
                params: {
                    allowScriptAccess: "always"
                }
            }).get("el");
            K()
        },
        _saveData: function () {
            var N = this,
				M = "",
				L = N._getCurrentItem();
            if (!L) {
                return
            }
            M = I && I.read(F);
            if (K()) {
                M = M ? (M.split(B)) : [];
                while (M.length > D - 1) {
                    M.pop()
                }
                I.save(F, [].concat(L.flashString, M).join(B))
            }
            function K() {
                var O = parseInt(L.itemId, 10).toString(32);
                return L && (!M || M.indexOf(O) === -1)
            }
        },
        _getCurrentItem: function () {
            function M(T) {
                T = T.replace(/^\{|\}$/g, "");
                T = T.split(",");
                var P = 0,
					N = T.length,
					Q, O, S, R = {};
                for (; P < N; P++) {
                    Q = T[P].split(":");
                    if (Q[0] && Q[1]) {
                        O = Q[0].replace(/^"|"$/g, "");
                        S = Q[1].replace(/^"|"$/g, "").replace(/"/g, "&quote;");
                        R[O] = S
                    }
                }
                return R
            }
            var L = J.get(H),
				K;
            if (L && (L = L.getAttribute("data-value"))) {
                K = L;
                L = M(K);
                L.flashString = [parseInt(L.itemId, 10).toString(32), L.xid.substring(L.xid.length - 1), L.pic, parseInt(L.price, 10).toString(32), L.itemIdStr, L.title].join(A)
            }
            return L
        }
    }
}, {
    requires: ["swf"]
});