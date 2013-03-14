KISSY.add("malldetail/sku/buylink", function (E, G, C) {
    var B = E.mods.SKU;
    var F = KISSY, H = F.Event, J = F.DOM, D = window.g_config;
    function I(O) {
        var N = KISSY, T = N.DOM;
        var Q = "";
        var K = null;
        var L = E.cfg();
        var M = O.tradeResult;
        var P;
        if (O.miscDO && O.miscDO.sellCountDown > 0) {
            P = 5
        } else {
            if (!M) {
                return
            }
            if (!M.tradeEnable) {
                P = M.tradeDisableTypeEnum
            }
        }
        if (!M.tradeEnable) {
            B.LinkBuy.statu("init", "hide")
        }
        if (P) {
            T.addClass(T.parent("#J_LinkBuy"), "tb-hidden");
            switch (P) {
                case 1:
                    Q = '<div class="tb-key tb-out-of-date"><div class="tb-skin"><p>\u805a\u5212\u7b97\u6d3b\u52a8\u5546\u54c1\uff0c<a href="{{tgDomain}}/tg/home.htm?itemId={{itemId}}&{{param}}">\u70b9\u51fb\u6b64\u5904</a>\u4eab\u53d7\u56e2\u8d2d\u4f18\u60e0\u4ef7\u3002</p></div></div>';
                    break;
                case 2:
                    Q = '<div class="tb-key tb-out-of-date"><div class="tb-skin"><p>\u60a8\u53ea\u6709\u5728\u805a\u5212\u7b97\u9875\u9762\u70b9\u51fb\u201c\u53c2\u56e2\u201d\uff0c\u624d\u53ef\u4eab\u53d7\u6b64\u5546\u54c1\u7684\u4f18\u60e0\u4ef7\u683c\uff0c<a href="{{tgDomain}}/tg/home.htm?itemId={{itemId}}&{{param}}">\u70b9\u6b64\u8fdb\u5165</a></p></div></div>';
                    break;
                case 3:
                    Q = '<div class="tb-key tb-out-of-date"><div class="tb-skin"><p>\u60a8\u53ea\u6709\u5728\u805a\u5212\u7b97\u9875\u9762\u70b9\u51fb\u201c\u53c2\u56e2\u201d\uff0c\u624d\u53ef\u4eab\u53d7\u6b64\u5546\u54c1\u7684\u4f18\u60e0\u4ef7\u683c\uff0c<a href="{{tgDomain}}/tg/jukeHome.htm?itemId={{itemId}}&{{param}}">\u70b9\u6b64\u8fdb\u5165</a></p></div></div>';
                    break;
                case 4:
                    Q = '<div class="tb-key tb-out-of-date"><div class="tb-skin"><p>\u6b64\u5546\u54c1\u4e0d\u80fd\u5355\u72ec\u8d2d\u4e70</p></div></div>';
                    break;
                case 5:
                    if (!O.itemPriceResultDO["wanrentuanInfo"]) {
                        Q = '<div class="ui-msg">                            <div class="ui-msg-con ui-msg-tip">                                <span id="J_SellCountDownTip"></span><s class="ui-msg-icon"></s>                            </div>                        </div>';
                        K = function () {
                            N.use("malldetail/util/timer", function (V, W) {
                                new W({ leftTime: O.miscDO.sellCountDown, container: "#J_SellCountDownTip", template: 2, tpl: "\u8fd8\u5269{date},\u8bf7\u5148\u6536\u85cf\u5546\u54c1" }).onStop(function () {
                                    window.location.reload()
                                })
                            })
                        }
                    }
                    Q += '<div class="tb-action tb-clear"><div class="tb-btn-wait tb-btn-sku"><a href="javascript:;">\u5373\u5c06\u5f00\u59cb<b></b></a></div></div>';
                    break
            }
            if (Q) {
                var U = T.get(".tb-action", "#detail");
                if (U) {
                    T.removeClass(U, "tb-action");
                    var R = G(Q).render({ param: N.param(M.param), tgDomain: L.url.tgDomain, itemId: D.itemId });
                    T.html(U, R, false, K)
                }
            }
        }
        if (!M) {
            return
        }
        if (M.cartEnable && M.cartType == 1) {
            B.LinkAdd.statu("init", "show")
        }
        if (!M.cartEnable || M.cartType != 2 || D.offlineShop) {
            B.LinkBasket.statu("init", "hide")
        }
        if (L.tradeType == 1 || L.tradeType == 3) {
            T.hide("#dianbaobao")
        }
        A()
    }
    var A = function () {
        var L = E.cfg();
        var M = L.linkBuy;
        var K;
        if (M) {
            H.on(M, "click", function (N) {
                N.preventDefault();
                E.sendAtpanel("tmalldetail.50.1");
                if (J.hasClass(J.parent(N.target), "noPost")) {
                    return
                }
                if (C.run(true) && false !== B.PropertyHandler.beforeBuyValidateCheck()) {
                    L.frmBid.quantity.value = parseInt(L.iptAmount.value, 10);
                    L.frmBid.skuId.value = B.selectSkuId || "";
                    L.frmBid.skuInfo.value = B.valSkuInfo;
                    L.frmBid.strSkuId && (L.frmBid.strSkuId.value = B.selectSkuId);
                    if (D.offlineShop) {
                        L.frmBid.buyer_from.value = "ifc0001"
                    }
                    if (L.divKeyProp && L.divKeyProp.close) {
                        L.divKeyProp.close()
                    }
                    B.FastLogin.checkLogin()
                }
            });
            H.on(M, "mouseenter mouseleave", function (N) {
                K && K.cancel();
                if (N.type === "mouseenter" && B.LinkBuy.getStatu() !== 1) {
                    K = F.later(C.run, 200)
                }
            })
        }
    };
    return { init: function (K) {
        I(K)
    } 
    }
}, { requires: ["template", "malldetail/sku/validator"] }); /*pub-1|2013-02-28 21:14:24*/