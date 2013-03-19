KISSY.add("malldetail/tabbar/tabbar", function (C, D, A) {
    var B = window.g_config;
    return C.mods.TabBar = (function () {
        var F, K, J = "h4.hd",
			H = "selected",
			I = "display",
			L = "none",
			E = "block",
			M = undefined,
			N = false;
        var G = function () {
            var Q = C.UA,
				S = window,
				R = S.document;
            var P = -1;
            var U;
            var O = false;
            var T = function () {
                var V = function () {
                    D.css(F, {
                        display: "block",
                        top: D.scrollTop(R),
                        position: "absolute"
                    });
                    O = false
                };
                if (P == -1) {
                    P = D.offset(F).top
                }
                if (P <= D.scrollTop(R)) {
                    if (Q.ie <= 6) {
                        if (!O) {
                            D.hide(F);
                            O = true
                        }
                        if (U) {
                            clearTimeout(U)
                        }
                        U = setTimeout(V, 100)
                    } else {
                        if (!N) {
                            D.css(F, {
                                position: "fixed",
                                top: 0
                            })
                        }
                    }
                    if (!N) {
                        D.css("#J_Tabbar_placeholder", {
                            height: "30px"
                        })
                    }
                    N = true
                } else {
                    if (N) {
                        if (U) {
                            clearTimeout(U)
                        }
                        D.css(F, {
                            position: "static",
                            display: "block"
                        });
                        D.css("#J_Tabbar_placeholder", {
                            height: "0"
                        });
                        N = false
                    }
                }
            };
            D.insertAfter(D.create("<div class='tabbar-placeholder' id='J_Tabbar_placeholder' style='height:0; margin-top:0;overflow:hidden;'></div>"), F);
            A.on(S, "scroll", T);
            T()
        };
        return C.mods.TabBar = {
            init: function (P) {
                F = P.ulNode;
                K = P.contEl;
                if (!F || !K) {
                    return
                }
                var R = D.parent(F);
                C.use("malldetail/data/data", function (U, T) {
                    T.onReviewCount(function (W) {
                        U.each(D.query("#J_TabBar em.J_ReviewsCountNum"), function (X) {
                            X.innerHTML = W.rateTotal;
                            D.show(D.parent(X))
                        })
                    });
                    var V = D.get(".J_MonSalesNum", "#J_TabBar");
                    if (V) {
                        T.onSalesCount(function (W) {
                            V.innerHTML = W.monTotal;
                            D.show(D.parent(V, ".J_MonSales"))
                        })
                    }
                });
                var Q = this,
					S;
                Q.handles = [];
                A.on(F, "click", function (T) {
                    T.preventDefault();
                    if ((S = T.target) && (S.nodeName !== "UL") && (S.nodeName !== "LI")) {
                        while (S.nodeName !== "A") {
                            S = S.parentNode
                        }
                        Q.switchTo(S.href.split("#")[1]);
                        if (N) {
                            Q.scrollIntoView()
                        }
                    }
                }, Q);
                C.each(F.getElementsByTagName("a"), function (U) {
                    var V = U.href.split("#")[1],
						T = D.parent(U, "li");
                    Q.onSwitch(function (W) {
                        if (V == W) {
                            D.addClass(T, H)
                        } else {
                            D.removeClass(T, H)
                        }
                    })
                });
                var O;
                Q.onSwitch(function (T, U) {
                    if (!O) {
                        O = {};
                        C.each(F.getElementsByTagName("a"), function (V) {
                            var W = V.href.split("#")[1];
                            O[W] = D.get("#" + W, K)
                        })
                    }
                    C.each(O, function (W, V) {
                        if (V == U) {
                            D.removeClass(W, "tm-curTab")
                        } else {
                            if (V == T) {
                                D.addClass(W, "tm-curTab")
                            }
                        }
                    })
                });
                Q.onSwitch(function (T) {
                    if (T == "description") {
                        D.removeClass(R, "tm-tabOther")
                    } else {
                        D.addClass(R, "tm-tabOther")
                    }
                });
                Q.onSwitch(function (V) {
                    var U = {
                        description: "tmalldetail.4.7",
                        J_Reviews: "tmalldetail.4.1",
                        J_DealRecord: "tmalldetail.4.2",
                        J_TabRecommends: "tmalldetail.4.4",
                        J_SellerInfo: "tmalldetail.4.3",
                        J_AfterSales: "tmalldetail.4.5"
                    };
                    var T = U[V];
                    T && C.sendAtpanel(T);
                    if (B.D950) {
                        if (V == "J_TabRecommends") {
                            if (C.cfg("tag").isHasAttr) {
                                C.sendAcAtpanel("tmalldetail.10.12")
                            } else {
                                C.sendAcAtpanel("tmalldetail.10.13")
                            }
                        }
                    }
                });
                D.query("." + H, K).each(function (T) {
                    if (D.parent(T) == K) {
                        Q.switchTo(T.id || "description");
                        if (T.id != "description") {
                            F.scrollIntoView(true)
                        }
                    }
                });
                P.success && P.success();
                setTimeout(function () {
                    G()
                }, 1500)
            },
            switchTo: function (P) {
                var O = this,
					R;
                var Q = {
                    desc: "descriptio",
                    reviews: "J_Reviews",
                    records: "J_DealRecord",
                    recommends: "J_TabRecommends",
                    aftersales: "J_AfterSales",
                    sellerinfo: "J_SellerInfo"
                };
                P = Q[P] || P;
                if (M == P) {
                    return
                }
                R = M;
                M = P;
                C.each(this.handles, function (S) {
                    S(M, R)
                })
            },
            curIndex: function () {
                return M || "description"
            },
            onSwitch: function (O) {
                if (C.isFunction(O)) {
                    this.handles.push(O)
                }
            },
            scrollIntoView: function () {
                var O = C.get("#J_Tabbar_placeholder") || C.get("#J_TabBar");
                D.scrollTop(D.offset(O).top - (D.height(O) ? 0 : (D.height("#J_TabBar") + 1)))
            }
        }
    })()
}, {
    requires: ["dom", "event", "malldetail/data/data"]
}); 