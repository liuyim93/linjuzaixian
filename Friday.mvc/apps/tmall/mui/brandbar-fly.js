﻿KISSY.add("tmall/mui/brandbar-fly", function (_kissy_imp, _dom) {
        var D, C, G, F = _dom || _kissy_imp.DOM;
        return _kissy_imp["tmall/mui/brandbar-fly"] = _kissy_imp["tmall/mui/brandbar-fly"] || { fly: function (M, I, J) {
            J = J || {};
            if (!D) {
                D = I.cloneNode(true);
                document.body.appendChild(D);
                F.css(D, { position: "absolute", zIndex: 100003 })
            }
            if (C) {
                C.stop()
            }
            if (G) {
                G.stop()
            }
            var H = F.offset(I), L = 4, K = 20;
            M = { left: M.left - K / 2, top: M.top - K / 2 };
            H = { left: H.left - L, top: H.top - L };
            F.show(D);
            F.offset(D, M);
            _kissy_imp.UA.ie == 6 && (F.css(D, { opacity: 0 }));
            KISSY.use("anim", function (O, N) {
                N = N || O.Anim;
                C = N(D, { opacity: (O.UA.ie == 6 ? undefined : 1), top: M.top - 32 + "px" }, 0.5, "easeOut", function () {
                    G = N(D, { left: H.left + "px", top: H.top + "px" }, 1, "easeBothStrong", function () {
                        F.hide(D);
                        J.complete && J.complete()
                    }).run()
                }).run()
            })
        }
        }
    }, { requires: ["dom"] })
