(function (_kissy) {
    var _namespace_brandbar = "tgallery/department/common/brandbar";
    (!_kissy.config) && _kissy.add(_namespace_brandbar, { requires: ["core"] });
    _kissy.add(_namespace_brandbar, function (_kissy_tmp, _dom, _event) {
        var _dom_div_id_J_BrandBar, H = {};
        _dom = _dom || _kissy_tmp.DOM;
        _event = _event || _kissy_tmp.Event;
        var BrandBar = { show: function (_opts) {
            _kissy_tmp.mix(H, _opts);
            _opts = _opts || {};
            if (!_dom_div_id_J_BrandBar) {
                _dom.addStyleSheet('#J_BrandBar{font-size:12px;cursor:pointer;background-color:#EEEEEE;width:120px;margin:2px 5px 0 5px;height:28px;border:solid 1px #d0d0d0;-moz-border-radius: 3px 3px 0px 0px;-khtml-border-radius: 3px 3px 0px 0px;-webkit-border-radius: 3px 3px 0px 0px;border-radius: 3px 3px 0px 0px;}#J_BrandBar:hover,#J_BrandBar.hoverBrandBar{background-color:#d9d1d1;border-color:#bcb0b0}.BrandFlyer{width:20px;height:20px;float:left;margin:4px;background:url(http://img02.taobaocdn.com/tps/i2/T1_360XiFkXXcu5FDa-20-20.png);background-repeat:no-repeat;*background:none;*filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale, src="http://img02.taobaocdn.com/tps/i2/T1_360XiFkXXcu5FDa-20-20.png");}#J_BrandBar a,#J_BrandBar a:hover{line-height:20px;display:block;margin:4px;float:left;color:#181818;text-decoration:none;}');
                _dom_div_id_J_BrandBar = _dom.create('<div id="J_BrandBar" order="20">');
                var _url = _opts.urlMyBrand || "http://brand.tmall.com/myBrandsIndex.htm";
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
        }, bindEl: function (L, J) {
            var I = this;
            _kissy_tmp.mix(H, J);
            J = J || {};
            var K = _event.delegate || function (M, N, Q, P, O) {
                _event.on(M, N, function (R) {
                    var S = false;
                    _kissy_tmp.each(_dom.query(Q, M), function (T) {
                        if (!S && (T == R.target || _dom.contains(T, R.target))) {
                            S = true
                        }
                    });
                    if (!S) {
                        return
                    }
                    P && P.apply(this, arguments)
                }, O)
            };
            K(document, "click", L, function (N) {
                N.halt();
                if (N.brandCooked) {
                    return
                }
                N.brandCooked = true;
                var O = N.target, M = J.attrName || "data-brandid";
                while (O && !(brandId = _dom.attr(O, M))) {
                    O = _dom.parent(O)
                }
                if (!O) {
                    return
                }
                I.flyAdd(O, brandId, J)
            })
        }, flyAdd: function (L, M, J) {
            _kissy_tmp.mix(H, J);
            J = J || {};
            var O = _dom.offset(L), I = this, K = _kissy_tmp.mix({}, J);
            O = { left: O.left + _dom.width(L) / 2, top: O.top + _dom.height(L) / 2 };
            var N = _dom.attr(L, "offset-brandfly");
            if (N && (/[\d-]+,[\d-]+/.test(N))) {
                N = N.split(",");
                K.offset = K.offset || { left: 0, top: 0 };
                K.offset.left += parseInt(N[0]);
                K.offset.top += parseInt(N[1])
            }
            if (K.offset) {
                O.left += K.offset.left;
                O.top += K.offset.top
            }
            K.success = function (Q) {
                if (K.flyed) {
                    return
                }
                K.flyed = true;
                Q = Q || {};
                Q.flyNode = L;
                var P = J.success && J.success(Q);
                if (I.fire("success", Q) === false || P === false) {
                    return
                }
                _kissy_tmp.onTgalleryReady("tgallery/department/common/brandbar-fly", function (T, R) {
                    T.mix(I, R);
                    I.fly(O, _dom.get(".BrandFlyer", _dom_div_id_J_BrandBar), { complete: function () {
                        var S = J.flyComplete && J.flyComplete();
                        if (I.fire("flyComplete", Q) === false || S === false) {
                            return
                        }
                    } 
                    })
                })
            };
            K.error = function (Q) {
                var P = J.error && J.error(Q);
                Q.flyNode = L;
                if (I.fire("error", Q) === false || P === false) {
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
                    var X = Q.code == -1 ? "attention" : "error", Z = H.urlMyBrand || "http://brand.tmall.com/myBrandsIndex.htm", Y = '<div class="brandMsgTips"><div class="ui-msg ui-top-tip ui-msg-clean"><div class="ui-msg-con ui-msg-' + X + '">' + Q.message + '<p class="brandMsgTips-p">\u67e5\u770b<a href="' + Z + '">\u6211\u5173\u6ce8\u7684\u54c1\u724c>></a></p><s class="ui-msg-icon"></s></div></div></div>';
                    var W = new U.Dialog({ elCls: "brandTipsDialog", width: 300, height: 110, skin: "gray", closeAction: "destroy", elStyle: { position: _kissy_tmp.UA.ie == 6 ? "absolute" : "fixed" }, zIndex: 9999999, headerContent: "", bodyContent: Y, showCat: false, mask: true, align: { points: ["cc", "cc"]} });
                    W.render();
                    W.show()
                }, function (U) {
                    return U.Overlay
                })
            };
            _kissy_tmp.onTgalleryReady("tgallery/department/common/brandfollow", function (Q, P) {
                P.add(M, K)
            })
        } 
        };
        _kissy_tmp.mix(BrandBar, _kissy_tmp.EventTarget);
        return _kissy_tmp[_namespace_brandbar] = _kissy_tmp[_namespace_brandbar] || BrandBar
    }, { requires: ["dom", "event"] })
})(KISSY);
