KISSY.add("malldetail/sku/buylink", function (_kissy_imp, _template, _malldetail_sku_validator) {
    var _mods_SKU = _kissy_imp.mods.SKU;
    var _kissy = KISSY, _event = _kissy.Event, _dom = _kissy.DOM, _g_config = window.g_config;
    function _init(O) {
        var _kissy_inner = KISSY, _dom_inner = _kissy_inner.DOM;
        var Q = "";
        var K = null;
        var _cfg = _kissy_imp.cfg();
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
            _mods_SKU.LinkBuy.statu("init", "hide")
        }
        if (P) {
            _dom_inner.addClass(_dom_inner.parent("#J_LinkBuy"), "tb-hidden");
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
                            _kissy_inner.use("malldetail/util/timer", function (V, W) {
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
                var U = _dom_inner.get(".tb-action", "#detail");
                if (U) {
                    _dom_inner.removeClass(U, "tb-action");
                    var R = _template(Q).render({ param: _kissy_inner.param(M.param), tgDomain: _cfg.url.tgDomain, itemId: _g_config.itemId });
                    _dom_inner.html(U, R, false, K)
                }
            }
        }
        if (!M) {
            return
        }
        if (M.cartEnable && M.cartType == 1) {
            _mods_SKU.LinkAdd.statu("init", "show")
        }
        if (!M.cartEnable || M.cartType != 2 || _g_config.offlineShop) {
            _mods_SKU.LinkBasket.statu("init", "hide")
        }
        if (_cfg.tradeType == 1 || _cfg.tradeType == 3) {
            _dom_inner.hide("#dianbaobao")
        }
        A()
    }
    var A = function () {
        var _cfg = _kissy_imp.cfg();
        var _linkbuy = _cfg.linkBuy;
        var _later_validator_fn;
        if (_linkbuy) {
            _event.on(_linkbuy, "click", function (_event) {
                _event.preventDefault();
                //_kissy_imp.sendAtpanel("tmalldetail.50.1");
                if (_dom.hasClass(_dom.parent(_event.target), "noPost")) {
                    return
                }
                if (_malldetail_sku_validator.run(true) && false !== _mods_SKU.PropertyHandler.beforeBuyValidateCheck()) {
                    _cfg.frmBid.quantity.value = parseInt(_cfg.iptAmount.value, 10);
                    _cfg.frmBid.skuId.value = _mods_SKU.selectSkuId || "";
                    _cfg.frmBid.skuInfo.value = _mods_SKU.valSkuInfo;
                    _cfg.frmBid.strSkuId && (_cfg.frmBid.strSkuId.value = _mods_SKU.selectSkuId);
                    if (_g_config.offlineShop) {
                        _cfg.frmBid.buyer_from.value = "ifc0001"
                    }
                    if (_cfg.divKeyProp && _cfg.divKeyProp.close) {
                        _cfg.divKeyProp.close()
                    }
                    _mods_SKU.FastLogin.checkLogin()
                }
            });
            _event.on(_linkbuy, "mouseenter mouseleave", function (_event) {
                _later_validator_fn && _later_validator_fn.cancel();
                if (_event.type === "mouseenter" && _mods_SKU.LinkBuy.getStatu() !== 1) {
                    _later_validator_fn = _kissy.later(_malldetail_sku_validator.run, 200)
                }
            })
        }
    };
    return { init: function (K) {
        _init(K)
    } 
    }
}, { requires: ["template", "malldetail/sku/validator"] }); /*pub-1|2013-02-28 21:14:24*/