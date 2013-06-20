KISSY.add("malldetail/tabbar/tabbar", function (_kissy, _dom, _event) {
    var _g_config = window.g_config;
    return _kissy.mods.TabBar = (function () {
        var _ulNode, _contEL, J = "h4.hd",
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
                    _dom.css(_ulNode, {
                        display: "block",
                        top: _dom.scrollTop(_document),
                        position: "absolute"
                    });
                    O = false
                };
                if (P == -1) {
                    P = _dom.offset(_ulNode).top
                }
                if (P <= _dom.scrollTop(_document)) {
                    if (_kissy_UA.ie <= 6) {
                        if (!O) {
                            _dom.hide(_ulNode);
                            O = true
                        }
                        if (U) {
                            clearTimeout(U)
                        }
                        U = setTimeout(V, 100)
                    } else {
                        if (!_false) {
                            _dom.css(_ulNode, {
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
                        _dom.css(_ulNode, {
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
            _dom.insertAfter(_dom.create("<div class='tabbar-placeholder' id='J_Tabbar_placeholder' style='height:0; margin-top:0;overflow:hidden;'></div>"), _ulNode);
            _event.on(_window, "scroll", T);
            T()
        };
        return _kissy.mods.TabBar = {
            init: function (_cfg) {
                _ulNode = _cfg.ulNode;
                _contEL = _cfg.contEl;
                if (!_ulNode || !_contEL) {
                    return
                }
                var _ulNode_parent = _dom.parent(_ulNode);
                _kissy.use("malldetail/data/data", function (_kissy_U, _malldetail_data_data) {
                    _malldetail_data_data.onReviewCount(function (_review_cfg) {
                        _kissy_U.each(_dom.query("#J_TabBar em.J_ReviewsCountNum"), function (_dom_reviewsCountNum_item) {
                            _dom_reviewsCountNum_item.innerHTML = _review_cfg.rateTotal;
                            _dom.show(_dom.parent(_dom_reviewsCountNum_item))
                        })
                    });
                    var _dom_class_J_MonSalesNum = _dom.get(".J_MonSalesNum", "#J_TabBar");
                    if (_dom_class_J_MonSalesNum) {
                        _malldetail_data_data.onSalesCount(function (_salescount_cfg) {
                            _dom_class_J_MonSalesNum.innerHTML = _salescount_cfg.monTotal;
                            _dom.show(_dom.parent(_dom_class_J_MonSalesNum, ".J_MonSales"))
                        })
                    }
                });
                var _tabbar = this,
					_target;
                _tabbar.handles = [];
                _event.on(_ulNode, "click", function (_event) {
                    _event.preventDefault();
                    if ((_target = _event.target) && (_target.nodeName !== "UL") && (_target.nodeName !== "LI")) {
                        while (_target.nodeName !== "A") {
                            _target = _target.parentNode
                        }

                        _tabbar.switchTo(_target.href.split("#")[1]);
                        if (_false) {
                            _tabbar.scrollIntoView()
                        }
                    }
                }, _tabbar);
                _kissy.each(_ulNode.getElementsByTagName("a"), function (_dom_a) {
                    var _tab_id = _dom_a.href.split("#")[1],
						_li = _dom.parent(_dom_a, "li");
                    _tabbar.onSwitch(function (_current_tab_id) {
                        if (_tab_id == _current_tab_id) {
                            _dom.addClass(_li, _Selected_STR)
                        } else {
                            _dom.removeClass(_li, _Selected_STR)
                        }
                    })
                });
                var _contEL_array;
                _tabbar.onSwitch(function (_current_tab_id, _last_tab_id) {
                    if (!_contEL_array) {
                        _contEL_array = {};
                        _kissy.each(_ulNode.getElementsByTagName("a"), function (_dom_a) {
                            var _tab_id = _dom_a.href.split("#")[1];
                            _contEL_array[_tab_id] = _dom.get("#" + _tab_id, _contEL)
                        })
                    }
                    _kissy.each(_contEL_array, function (_contEL_item, _tab_id_item) {
                        if (_tab_id_item == _last_tab_id) {
                            _dom.removeClass(_contEL_item, "tm-curTab")
                        } else {
                            if (_tab_id_item == _current_tab_id) {
                                _dom.addClass(_contEL_item, "tm-curTab")
                            }
                        }
                    })
                });
                _tabbar.onSwitch(function (_current_tab_id) {
                    if (_current_tab_id == "description") {
                        _dom.removeClass(_ulNode_parent, "tm-tabOther")
                    } else {
                        _dom.addClass(_ulNode_parent, "tm-tabOther")
                    }
                });
                _tabbar.onSwitch(function (_current_tab_id) {
                    //根据选中的tab_id找到tab的panel页并请求
                    var _atpanel_page_config = {
                        description: "tmalldetail.4.7",
                        J_Reviews: "tmalldetail.4.1",
                        J_DealRecord: "tmalldetail.4.2",
                        J_TabRecommends: "tmalldetail.4.4",
                        J_SellerInfo: "tmalldetail.4.3",
                        J_AfterSales: "tmalldetail.4.5"
                    };
                    var _atpanel = _atpanel_page_config[_current_tab_id];
                    //_atpanel && _kissy.sendAtpanel(_atpanel);
                    if (_g_config.D950) {
                        if (_current_tab_id == "J_TabRecommends") {
                            if (_kissy.cfg("tag").isHasAttr) {
                                _kissy.sendAcAtpanel("tmalldetail.10.12")
                            } else {
                                _kissy.sendAcAtpanel("tmalldetail.10.13")
                            }
                        }
                    }
                });
                _dom.query("." + _Selected_STR, _contEL).each(function (_contEL_selected_item) {
                    if (_dom.parent(_contEL_selected_item) == _contEL) {
                        _tabbar.switchTo(_contEL_selected_item.id || "description");
                        if (_contEL_selected_item.id != "description") {
                            _ulNode.scrollIntoView(true)
                        }
                    }
                });
                _cfg.success && _cfg.success();
                setTimeout(function () {
                    G()
                }, 1500)
            },
            switchTo: function (_selected_tab_id_str) {
                //将当前tab的id设为选中的值
                var _tabbar = this,
					_last_tab_id;
                var _tab_config = {
                    desc: "description",
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
                _last_tab_id = _current_tab_id;
                _current_tab_id = _selected_tab_id_str;
                _kissy.each(this.handles, function (_handle_fn) {
                    _handle_fn(_current_tab_id, _last_tab_id)
                })
            },
            curIndex: function () {
                return _current_tab_id || "description"
            },
            onSwitch: function (_handle_fn) {
                if (_kissy.isFunction(_handle_fn)) {
                    this.handles.push(_handle_fn)
                }
            },
            scrollIntoView: function () {
                var _placeholder = _kissy.get("#J_Tabbar_placeholder") || _kissy.get("#J_TabBar");
                _dom.scrollTop(_dom.offset(_placeholder).top - (_dom.height(_placeholder) ? 0 : (_dom.height("#J_TabBar") + 1)))
            }
        }
    })()
}, {
    requires: ["dom", "event", "malldetail/data/data"]
}); 