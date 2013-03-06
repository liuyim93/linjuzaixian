(function (B) {
    var A = "tgallery/department/common/brandbar";
    (!B.config) && B.add(A, { requires: ["core"] });
    B.add(A, function (F, G, C) {
        var D, H = {};
        G = G || F.DOM;
        C = C || F.Event;
        var E = { show: function (J) {
            F.mix(H, J);
            J = J || {};
            if (!D) {
                G.addStyleSheet('#J_BrandBar{font-size:12px;cursor:pointer;background-color:#EEEEEE;width:120px;margin:2px 5px 0 5px;height:28px;border:solid 1px #d0d0d0;-moz-border-radius: 3px 3px 0px 0px;-khtml-border-radius: 3px 3px 0px 0px;-webkit-border-radius: 3px 3px 0px 0px;border-radius: 3px 3px 0px 0px;}#J_BrandBar:hover,#J_BrandBar.hoverBrandBar{background-color:#d9d1d1;border-color:#bcb0b0}.BrandFlyer{width:20px;height:20px;float:left;margin:4px;background:url(http://img02.taobaocdn.com/tps/i2/T1_360XiFkXXcu5FDa-20-20.png);background-repeat:no-repeat;*background:none;*filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=noscale, src="http://img02.taobaocdn.com/tps/i2/T1_360XiFkXXcu5FDa-20-20.png");}#J_BrandBar a,#J_BrandBar a:hover{line-height:20px;display:block;margin:4px;float:left;color:#181818;text-decoration:none;}');
                D = G.create('<div id="J_BrandBar" order="20">');
                var I = J.urlMyBrand || "http://brand.tmall.com/myBrandsIndex.htm";
                G.html(D, '<div class="BrandFlyer"></div><a href="' + I + '" target="' + (J.newWindow ? ' target="_blank"' : "") + '">\u6211\u5173\u6ce8\u7684\u54c1\u724c</a>');
                C.on(D, "click", function () {
                    G.get("a", D).click()
                });
                if (F.UA.ie == 6) {
                    C.on(D, "mouseenter", function () {
                        G.addClass(D, "hoverBrandBar")
                    });
                    C.on(D, "mouseleave", function () {
                        G.removeClass(D, "hoverBrandBar")
                    })
                }
            }
            F.onTgalleryReady("tgallery/tmall/common/bottombar", function (K, L) {
                L.add(D)
            })
        }, bindEl: function (L, J) {
            var I = this;
            F.mix(H, J);
            J = J || {};
            var K = C.delegate || function (M, N, Q, P, O) {
                C.on(M, N, function (R) {
                    var S = false;
                    F.each(G.query(Q, M), function (T) {
                        if (!S && (T == R.target || G.contains(T, R.target))) {
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
                while (O && !(brandId = G.attr(O, M))) {
                    O = G.parent(O)
                }
                if (!O) {
                    return
                }
                I.flyAdd(O, brandId, J)
            })
        }, flyAdd: function (L, M, J) {
            F.mix(H, J);
            J = J || {};
            var O = G.offset(L), I = this, K = F.mix({}, J);
            O = { left: O.left + G.width(L) / 2, top: O.top + G.height(L) / 2 };
            var N = G.attr(L, "offset-brandfly");
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
                F.onTgalleryReady("tgallery/department/common/brandbar-fly", function (T, R) {
                    T.mix(I, R);
                    I.fly(O, G.get(".BrandFlyer", D), { complete: function () {
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
                        T(F, window.TML);
                        return
                    }
                    F.getScript(F.configTgallery.path + "tmall/tml/1.0/tml/tml-min.js", function () {
                        T(F, window.TML)
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
                    F.getScript(F.configTgallery.path + "tmall/mui/msg/css/msg.css");
                    G.addStyleSheet(".brandMsgTips{margin-top:-10px;}.brandTipsDialog div.tml-stdmod-header{height:24px;background:none;border:none;}.brandTipsDialog .tml-stdmod-body{padding:0 10px;}.brandMsgTips-btn{margin-top:30px;text-align:center;}.brandMsgTips-btn a{padding:0 15px;margin:0 30px;}.brandMsgTips-p{font-size:12px;font-weight:normal;margin-top:10px;}.brandMsgTips-p a{color:#2b76af;}");
                    var X = Q.code == -1 ? "attention" : "error", Z = H.urlMyBrand || "http://brand.tmall.com/myBrandsIndex.htm", Y = '<div class="brandMsgTips"><div class="ui-msg ui-top-tip ui-msg-clean"><div class="ui-msg-con ui-msg-' + X + '">' + Q.message + '<p class="brandMsgTips-p">\u67e5\u770b<a href="' + Z + '">\u6211\u5173\u6ce8\u7684\u54c1\u724c>></a></p><s class="ui-msg-icon"></s></div></div></div>';
                    var W = new U.Dialog({ elCls: "brandTipsDialog", width: 300, height: 110, skin: "gray", closeAction: "destroy", elStyle: { position: F.UA.ie == 6 ? "absolute" : "fixed" }, zIndex: 9999999, headerContent: "", bodyContent: Y, showCat: false, mask: true, align: { points: ["cc", "cc"]} });
                    W.render();
                    W.show()
                }, function (U) {
                    return U.Overlay
                })
            };
            F.onTgalleryReady("tgallery/department/common/brandfollow", function (Q, P) {
                P.add(M, K)
            })
        } 
        };
        F.mix(E, F.EventTarget);
        return F[A] = F[A] || E
    }, { requires: ["dom", "event"] })
})(KISSY);
