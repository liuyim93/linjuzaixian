KISSY.add("malldetail/other/atp", function (B, E) {
    var D = KISSY,
		J = D.DOM,
		I = D.Event;
    var G = window;
    var A = G.g_config;

    function C(K, L) {
        if (K && /&?\bscm=[^&#]*/.test(K)) {
            K = K.replace(/&?\bscm=[^&#]*/g, "&scm=" + L)
        } else { }
        return K
    }
    function F(N, L) {
        var K = {
            J_TabRecommends: {
                newAttr: "1003.3.03043.2"
            },
            description: {
                newAttr: "1003.3.03040.2"
            }
        };
        var O = E.curIndex();
        var M = B.inBucket("50%") ? "new" : "old";
        if (B.cfg("tag").isHasAttr) {
            M += "Attr";
            L = L || K[O][M];
            N.href = C(N.href, L)
        }
    }
    function H(N, L) {
        var M = N.target;
        var K = 0;
        while (M) {
            if (M.tagName == "A") {
                F(M);
                break
            } else {
                if (K > 4) {
                    break
                }
            }
            K++;
            M = M.parentNode
        }
    }
    return {
        tabAld: function () {
            I.on("#J_TabRecommends", "mousedown", H)
        }
    }
}, {
    requires: ["malldetail/tabbar/tabbar"]
});