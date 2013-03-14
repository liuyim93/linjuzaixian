KISSY.add("malldetail/sku/basketAnim", function (G) {
    var D = G.mods.SKU;
    var H = KISSY, Q = H.DOM, O = H.Event;
    var M = document, K = M.body;
    var C = H.merge({}, H.EventTarget);
    var B;
    var L = false;
    var P = 0;
    var N, J;
    var I = "onAnimStop";
    function E() {
        var R = Q.get(".tmMCHandler", N), T;
        var S = N.clientWidth;
        T = Q.offset(R);
        return { top: T.top - 40, left: T.left + (Math.floor(S / 2) - 18) }
    }
    function A() {
        if (!(J = Q.get("#J_MiniCartAnim"))) {
            J = Q.create('<div id="J_MiniCartAnim" class="tb-miniCartAnim"></div>');
            K.insertBefore(J, K.firstChild)
        }
    }
    function F(W) {
        if (!J) {
            A()
        }
        var R = H.one("#J_ImgBooth");
        if (R) {
            R = R.attr("src");
            R = R.replace(/(_310x310.jpg)|(_460x460.jpg)/, "_40x40.jpg")
        } else {
            R = "http://img.taobao.com/newshop/nopicture.gif"
        }
        J.innerHTML = '<p><img src="' + R + '"></p>';
        if (!N) {
            N = Q.get("#J_TMiniCart")
        }
        if (!N || !W) {
            return
        }
        var U;
        var S;
        var T = Q.offset(W), V = E();
        if (!T) {
            return
        }
        Q.css(J, { display: "block", top: T.top + "px", left: T.left + "px" });
        U = Math.ceil((V.top - T.top) / 100);
        switch (U) {
            case 1:
                S = 0.4;
                break;
            case 2:
                S = 0.5;
                break;
            case 3:
                S = 0.6;
                break;
            case 4:
                S = 0.7;
                break;
            default:
                S = 0.8
        }
        H.Anim(J, { top: V.top + "px", left: V.left + "px" }, S, "easeOut", function () {
            H.Anim(J, { top: V.top + 40 + "px" }, 0.5, "easeOut", function () {
                J.style.display = "none";
                P--;
                if (P > 0) {
                    F(W)
                }
                G.flush();
                C.fire(I)
            }).run()
        }).run()
    }
    D.basketAnim = function () {
        return { init: function () {
            A()
        }, run: function (R) {
            if (P == 0) {
                F(R)
            }
            if (P < 2) {
                P++
            }
        }, onstop: function (R) {
            if (H.isFunction(R)) {
                C.on(I, R)
            }
        } 
        }
    } ()
}, { requires: [] }); /*pub-1|2013-01-06 16:13:22*/