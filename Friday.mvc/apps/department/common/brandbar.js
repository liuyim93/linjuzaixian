(function (_kissy) {
    var _namespace_brandbar = "tgallery/department/common/brandbar";
    (!_kissy.config) && _kissy.add(_namespace_brandbar, { requires: ["core"] });
    _kissy.add(_namespace_brandbar, function (_kissy_tmp, _dom, _event) {
        var _dom_div_id_J_BrandBar, _options = {};
        _dom = _dom || _kissy_tmp.DOM;
        _event = _event || _kissy_tmp.Event;
        var BrandBar = { show: function (_opts) {
            _kissy_tmp.mix(_options, _opts);
            _opts = _opts || {};
            if (!_dom_div_id_J_BrandBar) {
                _dom.addStyleSheet('#J_BrandBar{font-size:12px;cursor:pointer;background-color:#EEEEEE;width:120px;margin:2px 5px 0 5px;height:28px;border:solid 1px #d0d0d0;-moz-border-radius: 3px 3px 0px 0px;-khtml-border-radius: 3px 3px 0px 0px;-webkit-border-radius: 3px 3px 0px 0px;border-radius: 3px 3px 0px 0px;}#J_BrandBar:hover,#J_BrandBar.hoverBrandBar{background-color:#d9d1d1;border-color:#bcb0b0}.BrandFlyer{width:20px;height:20px;float:left;margin:4px;background:url(http://localhost:7525/Images/T1_360XiFkXXcu5FDa-20-20.png);background-repeat:no-repeat;*background:none;*filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale, src="http://img02.taobaocdn.com/tps/i2/T1_360XiFkXXcu5FDa-20-20.png");}#J_BrandBar a,#J_BrandBar a:hover{line-height:20px;display:block;margin:4px;float:left;color:#181818;text-decoration:none;}');
                _dom_div_id_J_BrandBar = _dom.create('<div id="J_BrandBar" order="20">');
                var _url = _opts.urlMyBrand || "http://brand.tmall.com/myBrandsIndex.html";
                _dom.html(_dom_div_id_J_BrandBar, '<div class="BrandFlyer"></div><a href="' + _url + '" target="' + (_opts.newWindow ? ' target="_blank"' : "") + '">我关注的品牌</a>');
                _event.on(_dom_div_id_J_BrandBar, "click", function () {
                    _dom.get("a", _dom_div_id_J_BrandBar).click()
                });
                if (_kissy_tmp.UA.ie == 6) {
                    _event.on(_dom_div_id_J_BrandBar, "mouseenter", function () {
                        _dom.addClass(_dom_div_id_J_BrandBar, "hoverBrandBar")
                    });
                    _event.on(_dom_div_id_J_BrandBar, "mouseleave", function () {
                        _dom.removeClass(_dom_div_id_J_BrandBar, "hoverBrandBar")
                    })
                }
            }
            _kissy_tmp.onTgalleryReady("tgallery/tmall/common/bottombar", function (_kissy, _bottombar) {
                _bottombar.add(_dom_div_id_J_BrandBar)
            })
        }, bindEl: function (_selector, _opts) {
            var _brandbar = this;
            _kissy_tmp.mix(_options, _opts);
            _opts = _opts || {};
            var _delegate = _event.delegate || function (_targets, _eventtype, _selector, _fn, _data) {
                _event.on(_targets, _eventtype, function (_event) {
                    var _is_find = false;
                    _kissy_tmp.each(_dom.query(_selector, _targets), function (_item) {
                        if (!_is_find && (_item == _event.target || _dom.contains(_item, _event.target))) {
                            _is_find = true
                        }
                    });
                    if (!_is_find) {
                        return
                    }
                    //2013-03-07 basilwang  arguments contains _event  and this means _item
                    _fn && _fn.apply(this, arguments)
                }, _data)
            };
            _delegate(document, "click", _selector, function (_event) {
                _event.halt();
                if (_event.brandCooked) {
                    return
                }
                _event.brandCooked = true;
                var _target = _event.target, _brandid = _opts.attrName || "data-brandid";
                while (_target && !(brandId = _dom.attr(_target, _brandid))) {
                    _target = _dom.parent(_target)
                }
                if (!_target) {
                    return
                }
                _brandbar.flyAdd(_target, brandId, _opts)
            })
        }, flyAdd: function (_dom_span_class_j_CollectBrand, _brandid, _opts) {
            _kissy_tmp.mix(_options, _opts);
            _opts = _opts || {};
            var _offset = _dom.offset(_dom_span_class_j_CollectBrand),
                _brandbar_imp = this,
                _options = _kissy_tmp.mix({}, _opts);
            _offset = {
                        left: _offset.left + _dom.width(_dom_span_class_j_CollectBrand) / 2,
                        top: _offset.top + _dom.height(_dom_span_class_j_CollectBrand) / 2
                       };
            var _offset_brandfly = _dom.attr(_dom_span_class_j_CollectBrand, "offset-brandfly");
            if (_offset_brandfly && (/[\d-]+,[\d-]+/.test(_offset_brandfly))) {
                _offset_brandfly = _offset_brandfly.split(",");
                _options.offset = _options.offset || { left: 0, top: 0 };
                _options.offset.left += parseInt(_offset_brandfly[0]);
                _options.offset.top += parseInt(_offset_brandfly[1])
            }
            if (_options.offset) {
                _offset.left += _options.offset.left;
                _offset.top += _options.offset.top
            }
            _options.success = function (Q) {
                if (_options.flyed) {
                    return
                }
                _options.flyed = true;
                Q = Q || {};
                Q.flyNode = _dom_span_class_j_CollectBrand;
                var P = _opts.success && _opts.success(Q);
                if (_brandbar_imp.fire("success", Q) === false || P === false) {
                    return
                }
                _kissy_tmp.onTgalleryReady("tgallery/department/common/brandbar-fly", function (T, R) {
                    T.mix(_brandbar_imp, R);
                    _brandbar_imp.fly(_offset, _dom.get(".BrandFlyer", _dom_div_id_J_BrandBar), { complete: function () {
                        var S = _opts.flyComplete && _opts.flyComplete();
                        if (_brandbar_imp.fire("flyComplete", Q) === false || S === false) {
                            return
                        }
                    } 
                    })
                })
            };
            _options.error = function (Q) {
                var P = _opts.error && _opts.error(Q);
                Q.flyNode = _dom_span_class_j_CollectBrand;
                if (_brandbar_imp.fire("error", Q) === false || P === false) {
                    return
                }
                function R(T) {
                    if (window.TML) {
                        T(_kissy_tmp, window.TML);
                        return
                    }
                    _kissy_tmp.getScript(_kissy_tmp.configTgallery.path + "tmall/tml/1.0/tml/tml-min.js", function () {
                        T(_kissy_tmp, window.TML)
                    })
                }
                function S(U, V, T) {
                    R(function (Y, X) {
                        if (Y.config) {
                            X.use(U, V || function () {
                            });
                            return
                        }
                        if (T && T(X)) {
                            V && V(Y, T(X));
                            return
                        }
                        var W = Y.configTgallery.path + "tmall/tml/1.0/tml/" + U;
                        if (U.indexOf(".") < 0) {
                            W += ".js"
                        }
                        Y.getScript(W, function () {
                            V && V(Y, T && T(X))
                        })
                    })
                }
                S("overlay", function (V, U) {
                    S("overlay/css/overlay.css");
                    _kissy_tmp.getScript(_kissy_tmp.configTgallery.path + "tmall/mui/msg/css/msg.css");
                    _dom.addStyleSheet(".brandMsgTips{margin-top:-10px;}.brandTipsDialog div.tml-stdmod-header{height:24px;background:none;border:none;}.brandTipsDialog .tml-stdmod-body{padding:0 10px;}.brandMsgTips-btn{margin-top:30px;text-align:center;}.brandMsgTips-btn a{padding:0 15px;margin:0 30px;}.brandMsgTips-p{font-size:12px;font-weight:normal;margin-top:10px;}.brandMsgTips-p a{color:#2b76af;}");
                    var X = Q.code == -1 ? "attention" : "error", Z = _options.urlMyBrand || "http://brand.tmall.com/myBrandsIndex.html", Y = '<div class="brandMsgTips"><div class="ui-msg ui-top-tip ui-msg-clean"><div class="ui-msg-con ui-msg-' + X + '">' + Q.message + '<p class="brandMsgTips-p">\u67e5\u770b<a href="' + Z + '">\u6211\u5173\u6ce8\u7684\u54c1\u724c>></a></p><s class="ui-msg-icon"></s></div></div></div>';
                    var W = new U.Dialog({ elCls: "brandTipsDialog", width: 300, height: 110, skin: "gray", closeAction: "destroy", elStyle: { position: _kissy_tmp.UA.ie == 6 ? "absolute" : "fixed" }, zIndex: 9999999, headerContent: "", bodyContent: Y, showCat: false, mask: true, align: { points: ["cc", "cc"]} });
                    W.render();
                    W.show()
                }, function (U) {
                    return U.Overlay
                })
            };
            _kissy_tmp.onTgalleryReady("tgallery/department/common/brandfollow", function (_kissy, _brandfollow) {
                _brandfollow.add(_brandid, _options)
            })
        } 
        };
        _kissy_tmp.mix(BrandBar, _kissy_tmp.EventTarget);
        return _kissy_tmp[_namespace_brandbar] = _kissy_tmp[_namespace_brandbar] || BrandBar
    }, { requires: ["dom", "event"] })
})(KISSY);
