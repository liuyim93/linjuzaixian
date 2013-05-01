KISSY.add("malldetail/other/mainBody", function (_kissy_imp, _dom, _event, _malldetail_tabbar_tabbar, _malldetail_other_itemDesc) {
    return {
        addLazyCallback: function () {
            var _arguments = arguments;
            _kissy_imp.use("malldetail/other/lazy", function (_kissy_imp_1, _malldetail_other_lazy) {
                _malldetail_other_lazy.addCallback.apply(_malldetail_other_lazy, _arguments)
            })
        },
        refreshLazy: function () {
            _kissy_imp.use("malldetail/other/lazy", function (_kissy_G, _malldetail_other_lazy) {
                _malldetail_other_lazy.refresh()
            })
        },
        init: function (_to_be_extended_collections) {
            var _window = window;
            var _g_config = _window.g_config;
            var _mainBody = this;
            _kissy_imp.mix(_mainBody, _to_be_extended_collections);
            _malldetail_other_itemDesc.init({
                success: function () {
                    if (_g_config.offlineShop) {
                        _event.on(_dom.query("a", "#J_ItemDesc"), "click", function (N) {
                            N.halt()
                        })
                    }
                }
            });
            _kissy_imp.log("TMDLOG:itemDesc-domready", "info");
            if (!_g_config.offlineShop) {
                var M = false,
					K = false,
					J = false;
                revRecommendloaded = false;
                _kissy_imp.each(_dom.query("div.tshop-psm-trb10c"), function (N) {
                    M = true;
                    _mainBody.addLazyCallback(N, function () {
                        K = true;
                        _kissy_imp.use("malldetail/tabbar/newRecommend", function (P, O) {
                            O.onModHtml("buy", function (Q) {
                                _dom.addClass(N, "J_DetailSection ald ald-03013 ald-03013-tab");
                                _dom.html(N, Q);
                                _dom.get("ald-inner").addClass("shop-custom").removeClass("ald-inner");
                                P.sendImg("http://ac.atpanel.com/1.gif?cache=" + (+new Date()) + "&com=02&apply=detail&cod=3.1.1&uid=&ver=&ip=&other=")
                            })
                        })
                    })
                });
                _kissy_imp.each(_dom.query("div.tshop-psm-trv10c"), function (N) {
                    M = true;
                    _mainBody.addLazyCallback(N, function () {
                        K = true;
                        _kissy_imp.use("malldetail/tabbar/newRecommend", function (P, O) {
                            O.onModHtml("view", function (Q) {
                                _dom.addClass(N, "J_DetailSection ald ald-03013 ald-03013-tab");
                                _dom.html(N, Q);
                                _dom.get("ald-inner").addClass("shop-custom").removeClass("ald-inner");
                                P.sendImg("http://ac.atpanel.com/1.gif?cache=" + (+new Date()) + "&com=02&apply=detail&cod=3.1.2&uid=&ver=&ip=&other=")
                            })
                        })
                    })
                });
                _mainBody.addLazyCallback("#J_TabRecommends", function () {
                    if (_g_config.D950) {
                        J = true;
                        _kissy_imp.use("malldetail/recommend/waterfall", function (Q, R) {
                            R.init()
                        })
                    } else {
                        function P() {
                            return _malldetail_tabbar_tabbar.curIndex() == "J_TabRecommends" || (_malldetail_tabbar_tabbar.curIndex() == "description" && !M && !revRecommendloaded)
                        }
                        if (!P()) {
                            _dom.hide(_dom.get(".hd", "#J_TabRecommends"));
                            return false
                        }
                        J = true;
                        _kissy_imp.use("malldetail/tabbar/newRecommend", function (R, Q) {
                            Q.init()
                        });
                        var N = false;

                        function O() {
                            if (P() == N) {
                                return
                            }
                            if (N) {
                                _dom.hide("#J_TabRecommends")
                            } else {
                                _dom.show("#J_TabRecommends")
                            }
                            N = !N
                        }
                        O();
                        _malldetail_tabbar_tabbar.onSwitch(O)
                    }
                });
                if (_g_config.D950) {
                    _kissy_imp.use("malldetail/other/atp", function (O, N) {
                        N.tabAld()
                    })
                }
            }
            _mainBody.addLazyCallback("#J_Reviews", function () {
                _kissy_imp.use("malldetail/data/data", function (_kissy_imp_data, _malldetail_data_data) {
                    _malldetail_data_data.onReviewCount(function (P) {
                        _kissy_imp_data.each(_dom.query("#J_Reviews em.J_ReviewsCountNum"), function (_em_item) {
                            _em_item.innerHTML = P.rateTotal;
                            _dom.show(_dom.parent(_em_item))
                        })
                    })
                });
                _kissy_imp.use("malldetail/tabbar/reviewsTmall", function (_kissy_O, _malldetail_tabbar_reviewsTmall) {
                    _malldetail_tabbar_reviewsTmall.init({
                        switchTab: function (P) {
                            _malldetail_tabbar_tabbar.switchTo(P);
                            _malldetail_tabbar_tabbar.scrollIntoView()
                        }
                    });
                    if (!_dom.get("iframe", "#J_Reviews") && _malldetail_tabbar_tabbar.curIndex() == "J_Reviews" && !K && !J) {
                        revRecommendloaded = true;
                        _kissy_O.use("malldetail/tabbar/newRecommend", function (Q, P) {
                            P.onHtml(function (S) {
                                var R = _dom.create(S);
                                _dom.append(R, "#J_Reviews");
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
                                    if (_malldetail_tabbar_tabbar.curIndex() == "description") {
                                        _dom.hide(R);
                                        _dom.removeClass("#J_Reviews", "j_hideReviews2Recommend")
                                    } else {
                                        _dom.show(R);
                                        _dom.addClass("#J_Reviews", "j_hideReviews2Recommend")
                                    }
                                }
                                T();
                                if (M) {
                                    _malldetail_tabbar_tabbar.onSwitch(T)
                                }
                            })
                        })
                    }
                })
            });
            _mainBody.addLazyCallback("#J_DealRecord", function () {
                _kissy_imp.use("malldetail/tabbar/dealRecord", function (N) {
                    N.mods.DealRecord.init()
                })
            });
            _mainBody.addLazyCallback("#J_SellerInfo", function () {
                _kissy_imp.use("malldetail/tabbar/sellerinfo", function (_kissy_imp_sellerinfo) {
                    _kissy_imp_sellerinfo.mods.SellerInfo.init()
                })
            });
            _mainBody.addLazyCallback("#J_AfterSales", function () {
                _kissy_imp.use("malldetail/tabbar/afterSale", function (N) {
                    N.mods.AfterSales.init()
                })
            });
            var _dom_ul_id_J_TabBar = _kissy_imp.get("#J_TabBar");
            _malldetail_tabbar_tabbar.init({
                ulNode: _dom_ul_id_J_TabBar,
                contEl: (_dom.get("#detail") || {}).parentNode,      // 2013-04-18 basilwang <div id="content" ><div id="detail"></div></div>
                success: _to_be_extended_collections.onTabBarReady
            });
            _malldetail_tabbar_tabbar.onSwitch(function () {
                setTimeout(function () {
                    _mainBody.refreshLazy()
                }, 4)
            })
        },
        switchTab: function (_selected_tab) {
            _malldetail_tabbar_tabbar.switchTo(_selected_tab);
            _malldetail_tabbar_tabbar.scrollIntoView()
        },
        showTryDetail: function () {
            var F = _dom.get("#trydetail");
            if (!F) {
                return
            }
            this.addLazyCallback(F, function () {
                _kissy_imp.use("malldetail/tabbar/trydetail", function (G, H) {
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