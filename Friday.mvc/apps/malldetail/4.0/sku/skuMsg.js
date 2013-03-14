KISSY.add("malldetail/sku/skuMsg", function (F, J) {
    var E = F.mods.SKU;
    var C;
    var G = KISSY, M = G.DOM;
    var D = {};
    var B;
    var I;
    var A = true;
    var H = {};
    function L() {
        var O = {};
        for (var N in D) {
            O = D[N];
            if (N == "error" || N == "stop") {
                break
            }
        }
        return O
    }
    function K(O) {
        var N = '<div class="ui-msg"><div class="ui-msg-con ui-msg-{{type}}">{{msg}}<s class="ui-msg-icon"></s></div></div>';
        C = M.create('<div class="tm-clear"></div>');
        M.insertBefore(C, M.get(".tb-action", "#detail"));
        K = function (P) {
            if (P) {
                M.removeClass(C, "hidden");
                C.innerHTML = J(N).render(P);
                A = false;
                G.mix(H, P)
            }
        };
        return K(O)
    }
    return { hide: function (N) {
        N = N || "global";
        if (D[N]) {
            delete D[N]
        }
        if (I) {
            clearTimeout(I)
        }
        if (A) {
            return
        }
        I = setTimeout(function () {
            var O = L();
            if (H.msg && O.msg && O.msg == H.msg) {
                return
            }
            if (!O.msg) {
                M.addClass(C, "hidden")
            } else {
                K(O)
            }
        }, 500)
    }, show: function (P, N, O) {
        N = N || "stop";
        O = O || "global";
        if (I) {
            clearTimeout(I)
        }
        if (B) {
            clearTimeout(B)
        }
        D[O] = { type: N, msg: P };
        B = setTimeout(function () {
            var Q = L();
            if (Q.msg) {
                K(Q)
            }
        }, 500)
    } 
    }
}, { requires: ["template"] }); /*pub-1|2013-02-01 16:46:37*/