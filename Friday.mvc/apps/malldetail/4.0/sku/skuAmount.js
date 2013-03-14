KISSY.add("malldetail/sku/skuAmount", function (H, E) {
    var D = H.mods.SKU;
    var I = KISSY, P = I.DOM, M = I.Event;
    var C = I.merge({}, I.EventTarget);
    var F = "onbind", J = "onchange";
    var O = this;
    var K = { value: 1, oldValue: 1 };
    var B;
    function L(R) {
        var Q = H.cfg("iptAmount");
        var S = Q.value;
        var T = parseInt(S, 10) || 1;
        switch (R) {
            case "decrease":
                H.sendAtpanel("tmalldetail.13.8");
                T = T == 1 ? 1 : T - 1;
                break;
            case "increase":
                H.sendAtpanel("tmalldetail.13.7");
                T = T + 1;
                break
        }
        G(T)
    }
    function N() {
        var Q = I.get("#J_Amount"), R;
        var T;
        var S = P.hasClass(Q, "tm-hideAmount");
        H.cfg("hideAmount", S);
        if (Q) {
            R = '<span class="tb-amount-widget" id="J_AmountWidget"><input id="J_IptAmount" type="text" class="tb-text" value="1" maxlength="8" title="\u8bf7\u8f93\u5165\u8d2d\u4e70\u91cf"/><span class="increase"></span><span class="decrease"></span></span>';
            if (!S) {
                R += "\u4ef6"
            }
            P.insertBefore(P.create(R), B.emStock);
            if (S) {
                P.remove(B.emStock)
            }
            M.on("#J_AmountWidget", "click", function (V) {
                var U = V.target;
                L(U.className)
            });
            C.fire(F, {});
            M.on("#J_IptAmount", "blur", function (U) {
                G(U.target.value)
            });
            H.cfg("iptAmount", I.get("#J_IptAmount"))
        }
    }
    function G(Q) {
        if (Q != K.value) {
            var R = H.cfg("iptAmount");
            K.oldValue = K.value;
            K.value = R.value = Q;
            C.fire(J, { value: K.value, oldValue: K.oldValue })
        }
    }
    function A(U) {
        var S = I.get("#J_Amount");
        var T;
        var W;
        var V = function () {
            M.remove("#J_AmountWidget", "click");
            M.remove("#J_IptAmount", "blur");
            S.innerHTML = "";
            var X = P.create('<em id="J_EmStock">' + H.cfg("emStock").innerHTML + "</em>");
            P.append(X, S);
            H.cfg("emStock", X)
        };
        if (S) {
            if (U && !U.promType && B.itemDO.isEcardAuction && B.detail.quantityList && B.detail.quantityList.length > 0) {
                V();
                T = '<select id="J_IptAmount">';
                var Q = B.detail.quantityList;
                for (var R = 0; R < Q.length; R++) {
                    T += '<option value="' + Q[R] + '">' + Q[R] + "</option>"
                }
                T += "</select>";
                K.value = Q[0];
                K.oldValue = Q[0];
                P.insertBefore(P.create(T), B.emStock);
                M.on("#J_IptAmount", "blur", function (X) {
                    G(X.target.value)
                });
                H.cfg("iptAmount", I.get("#J_IptAmount"))
            }
            C.on(J, function () {
                if (W) {
                    clearTimeout(W)
                }
                W = setTimeout(function () {
                    if (E.run()) {
                        D.PopupSimulate.checkActs()
                    }
                }, 1000)
            })
        }
    }
    I.mix(K, { init: function (Q) {
        Q = Q || null;
        B = H.cfg();
        if (!Q) {
            N()
        } else {
            A(Q)
        }
    }, onBind: function (Q) {
        C.on(F, Q)
    }, setValue: function (Q) {
        G(Q)
    }, onChange: function (Q) {
        C.on(J, Q)
    } 
    });
    return K
}, { requires: ["malldetail/sku/validator"] }); /*pub-1|2013-02-28 21:14:22*/