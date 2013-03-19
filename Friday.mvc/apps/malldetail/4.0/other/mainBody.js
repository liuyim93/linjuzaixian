KISSY.add("malldetail/other/mainBody", function (C, D, A, E, B) {
    return {
        addLazyCallback: function () {
            var F = arguments;
            C.use("malldetail/other/lazy", function (H, G) {
                G.addCallback.apply(G, F)
            })
        },
        refreshLazy: function () {
            C.use("malldetail/other/lazy", function (G, F) {
                F.refresh()
            })
        },
        init: function (F) {
            var L = window;
            var H = L.g_config;
            var G = this;
            C.mix(G, F);
            B.init({
                success: function () {
                    if (H.offlineShop) {
                        A.on(D.query("a", "#J_ItemDesc"), "click", function (N) {
                            N.halt()
                        })
                    }
                }
            });
            C.log("TMDLOG:itemDesc-domready", "info");
            if (!H.offlineShop) {
                var M = false,
					K = false,
					J = false;
                revRecommendloaded = false;
                C.each(D.query("div.tshop-psm-trb10c"), function (N) {
                    M = true;
                    G.addLazyCallback(N, function () {
                        K = true;
                        C.use("malldetail/tabbar/newRecommend", function (P, O) {
                            O.onModHtml("buy", function (Q) {
                                D.addClass(N, "J_DetailSection ald ald-03013 ald-03013-tab");
                                D.html(N, Q);
                                D.get("ald-inner").addClass("shop-custom").removeClass("ald-inner");
                                P.sendImg("http://ac.atpanel.com/1.gif?cache=" + (+new Date()) + "&com=02&apply=detail&cod=3.1.1&uid=&ver=&ip=&other=")
                            })
                        })
                    })
                });
                C.each(D.query("div.tshop-psm-trv10c"), function (N) {
                    M = true;
                    G.addLazyCallback(N, function () {
                        K = true;
                        C.use("malldetail/tabbar/newRecommend", function (P, O) {
                            O.onModHtml("view", function (Q) {
                                D.addClass(N, "J_DetailSection ald ald-03013 ald-03013-tab");
                                D.html(N, Q);
                                D.get("ald-inner").addClass("shop-custom").removeClass("ald-inner");
                                P.sendImg("http://ac.atpanel.com/1.gif?cache=" + (+new Date()) + "&com=02&apply=detail&cod=3.1.2&uid=&ver=&ip=&other=")
                            })
                        })
                    })
                });
                G.addLazyCallback("#J_TabRecommends", function () {
                    if (H.D950) {
                        J = true;
                        C.use("malldetail/recommend/waterfall", function (Q, R) {
                            R.init()
                        })
                    } else {
                        function P() {
                            return E.curIndex() == "J_TabRecommends" || (E.curIndex() == "description" && !M && !revRecommendloaded)
                        }
                        if (!P()) {
                            D.hide(D.get(".hd", "#J_TabRecommends"));
                            return false
                        }
                        J = true;
                        C.use("malldetail/tabbar/newRecommend", function (R, Q) {
                            Q.init()
                        });
                        var N = false;

                        function O() {
                            if (P() == N) {
                                return
                            }
                            if (N) {
                                D.hide("#J_TabRecommends")
                            } else {
                                D.show("#J_TabRecommends")
                            }
                            N = !N
                        }
                        O();
                        E.onSwitch(O)
                    }
                });
                if (H.D950) {
                    C.use("malldetail/other/atp", function (O, N) {
                        N.tabAld()
                    })
                }
            }
            G.addLazyCallback("#J_Reviews", function () {
                C.use("malldetail/data/data", function (O, N) {
                    N.onReviewCount(function (P) {
                        O.each(D.query("#J_Reviews em.J_ReviewsCountNum"), function (Q) {
                            Q.innerHTML = P.rateTotal;
                            D.show(D.parent(Q))
                        })
                    })
                });
                C.use("malldetail/tabbar/reviewsTmall", function (O, N) {
                    N.init({
                        switchTab: function (P) {
                            E.switchTo(P);
                            E.scrollIntoView()
                        }
                    });
                    if (!D.get("iframe", "#J_Reviews") && E.curIndex() == "J_Reviews" && !K && !J) {
                        revRecommendloaded = true;
                        O.use("malldetail/tabbar/newRecommend", function (Q, P) {
                            P.onHtml(function (S) {
                                var R = D.create(S);
                                D.append(R, "#J_Reviews");
                                Q.sendAcAtpanel("1.gif", {
                                    com: "02",
                                    apply: "detail",
                                    cod: "2.1.1",
                                    uid: "",
                                    ver: "",
                                    ip: "",
                                    other: ""
                                });

                                function T() {
                                    if (E.curIndex() == "description") {
                                        D.hide(R);
                                        D.removeClass("#J_Reviews", "j_hideReviews2Recommend")
                                    } else {
                                        D.show(R);
                                        D.addClass("#J_Reviews", "j_hideReviews2Recommend")
                                    }
                                }
                                T();
                                if (M) {
                                    E.onSwitch(T)
                                }
                            })
                        })
                    }
                })
            });
            G.addLazyCallback("#J_DealRecord", function () {
                C.use("malldetail/tabbar/dealRecord", function (N) {
                    N.mods.DealRecord.init()
                })
            });
            G.addLazyCallback("#J_SellerInfo", function () {
                C.use("malldetail/tabbar/sellerinfo", function (N) {
                    N.mods.SellerInfo.init()
                })
            });
            G.addLazyCallback("#J_AfterSales", function () {
                C.use("malldetail/tabbar/afterSale", function (N) {
                    N.mods.AfterSales.init()
                })
            });
            var I = C.get("#J_TabBar");
            E.init({
                ulNode: I,
                contEl: (D.get("#detail") || {}).parentNode,
                success: F.onTabBarReady
            });
            E.onSwitch(function () {
                setTimeout(function () {
                    G.refreshLazy()
                }, 4)
            })
        },
        switchTab: function (F) {
            E.switchTo(F);
            E.scrollIntoView()
        },
        showTryDetail: function () {
            var F = D.get("#trydetail");
            if (!F) {
                return
            }
            this.addLazyCallback(F, function () {
                C.use("malldetail/tabbar/trydetail", function (G, H) {
                    H.init({
                        container: F
                    })
                })
            })
        }
    }
}, {
    requires: ["dom", "event", "malldetail/tabbar/tabbar", "malldetail/other/itemDesc"]
}); 