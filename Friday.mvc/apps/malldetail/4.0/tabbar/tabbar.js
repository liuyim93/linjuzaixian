KISSY.add("malldetail/tabbar/tabbar", function (_kissy, _dom, _event) {
    var _g_config = window.g_config;
    return _kissy.mods.TabBar = (function () {
        var F, K, J = "h4.hd",
			_Selected_STR = "selected",
			_Display_STR = "display",
			_None_STR = "none",
			_Block_STR = "block",
			_current_tab_id = undefined,
			_false = false;
        var G = function () {
            var _kissy_UA = _kissy.UA,
				_window = window,
				_document = _window.document;
            var P = -1;
            var U;
            var O = false;
            var T = function () {
                var V = function () {
                    _dom.css(F, {
                        display: "block",
                        top: _dom.scrollTop(_document),
                        position: "absolute"
                    });
                    O = false
                };
                if (P == -1) {
                    P = _dom.offset(F).top
                }
                if (P <= _dom.scrollTop(_document)) {
                    if (_kissy_UA.ie <= 6) {
                        if (!O) {
                            _dom.hide(F);
                            O = true
                        }
                        if (U) {
                            clearTimeout(U)
                        }
                        U = setTimeout(V, 100)
                    } else {
                        if (!_false) {
                            _dom.css(F, {
                                position: "fixed",
                                top: 0
                            })
                        }
                    }
                    if (!_false) {
                        _dom.css("#J_Tabbar_placeholder", {
                            height: "30px"
                        })
                    }
                    _false = true
                } else {
                    if (_false) {
                        if (U) {
                            clearTimeout(U)
                        }
                        _dom.css(F, {
                            position: "static",
                            display: "block"
                        });
                        _dom.css("#J_Tabbar_placeholder", {
                            height: "0"
                        });
                        _false = false
                    }
                }
            };
            _dom.insertAfter(_dom.create("<div class='tabbar-placeholder' id='J_Tabbar_placeholder' style='height:0; margin-top:0;overflow:hidden;'></div>"), F);
            _event.on(_window, "scroll", T);
            T()
        };
        return _kissy.mods.TabBar = {
            init: function (P) {
                F = P.ulNode;
                K = P.contEl;
                if (!F || !K) {
                    return
                }
                var R = _dom.parent(F);
                _kissy.use("malldetail/data/data", function (U, T) {
                    T.onReviewCount(function (W) {
                        U.each(_dom.query("#J_TabBar em.J_ReviewsCountNum"), function (X) {
                            X.innerHTML = W.rateTotal;
                            _dom.show(_dom.parent(X))
                        })
                    });
                    var V = _dom.get(".J_MonSalesNum", "#J_TabBar");
                    if (V) {
                        T.onSalesCount(function (W) {
                            V.innerHTML = W.monTotal;
                            _dom.show(_dom.parent(V, ".J_MonSales"))
                        })
                    }
                });
                var Q = this,
					S;
                Q.handles = [];
                _event.on(F, "click", function (T) {
                    T.preventDefault();
                    if ((S = T.target) && (S.nodeName !== "UL") && (S.nodeName !== "LI")) {
                        while (S.nodeName !== "A") {
                            S = S.parentNode
                        }

                        Q.switchTo(S.href.split("#")[1]);
                        if (_false) {
                            Q.scrollIntoView()
                        }
                    }
                }, Q);
                _kissy.each(F.getElementsByTagName("a"), function (U) {
                    var _tab_id = U.href.split("#")[1],
						_li = _dom.parent(U, "li");
                    Q.onSwitch(function (_current_tab_id) {
                        if (_tab_id == _current_tab_id) {
                            _dom.addClass(_li, _Selected_STR)
                        } else {
                            _dom.removeClass(_li, _Selected_STR)
                        }
                    })
                });
                var O;
                Q.onSwitch(function (T, U) {
                    if (!O) {
                        O = {};
                        _kissy.each(F.getElementsByTagName("a"), function (V) {
                            var W = V.href.split("#")[1];
                            O[W] = _dom.get("#" + W, K)
                        })
                    }
                    _kissy.each(O, function (W, V) {
                        if (V == U) {
                            _dom.removeClass(W, "tm-curTab")
                        } else {
                            if (V == T) {
                                _dom.addClass(W, "tm-curTab")
                            }
                        }
                    })
                });
                Q.onSwitch(function (T) {
                    if (T == "description") {
                        _dom.removeClass(R, "tm-tabOther")
                    } else {
                        _dom.addClass(R, "tm-tabOther")
                    }
                });
                Q.onSwitch(function (V) {
                    //根据选中的tab_id找到tab的panel页并请求
                    var _transfer_page_config = {
                        description: "tmalldetail.4.7",
                        J_Reviews: "tmalldetail.4.1",
                        J_DealRecord: "tmalldetail.4.2",
                        J_TabRecommends: "tmalldetail.4.4",
                        J_SellerInfo: "tmalldetail.4.3",
                        J_AfterSales: "tmalldetail.4.5"
                    };
                    var T = _transfer_page_config[V];
                    T && _kissy.sendAtpanel(T);
                    if (_g_config.D950) {
                        if (V == "J_TabRecommends") {
                            if (_kissy.cfg("tag").isHasAttr) {
                                _kissy.sendAcAtpanel("tmalldetail.10.12")
                            } else {
                                _kissy.sendAcAtpanel("tmalldetail.10.13")
                            }
                        }
                    }
                });
                _dom.query("." + _Selected_STR, K).each(function (T) {
                    if (_dom.parent(T) == K) {
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
            switchTo: function (_selected_tab_id_str) {
                //将当前tab的id设为选中的值
                var O = this,
					R;
                var _tab_config = {
                    desc: "descriptio",
                    reviews: "J_Reviews",
                    records: "J_DealRecord",
                    recommends: "J_TabRecommends",
                    aftersales: "J_AfterSales",
                    sellerinfo: "J_SellerInfo"
                };
                _selected_tab_id_str = _tab_config[_selected_tab_id_str] || _selected_tab_id_str;
                if (_current_tab_id == _selected_tab_id_str) {
                    return
                }
                R = _current_tab_id;
                _current_tab_id = _selected_tab_id_str;
                _kissy.each(this.handles, function (S) {
                    S(_current_tab_id, R)
                })
            },
            curIndex: function () {
                return _current_tab_id || "description"
            },
            onSwitch: function (O) {
                if (_kissy.isFunction(O)) {
                    this.handles.push(O)
                }
            },
            scrollIntoView: function () {
                var O = _kissy.get("#J_Tabbar_placeholder") || _kissy.get("#J_TabBar");
                _dom.scrollTop(_dom.offset(O).top - (_dom.height(O) ? 0 : (_dom.height("#J_TabBar") + 1)))
            }
        }
    })()
}, {
    requires: ["dom", "event", "malldetail/data/data"]
}); 