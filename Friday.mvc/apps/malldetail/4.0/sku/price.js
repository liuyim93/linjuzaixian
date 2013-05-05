
KISSY.add("malldetail/sku/price", function (_kissy_imp, _template) {
    var _mods_sku = _kissy_imp.mods.SKU;
    var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _document = document, _body = _document.body;
    var _g_config = window.g_config;
    var _str_display = "display", _str_block = "block", _str_hidden = "hidden", _str_none = "none", E = "", q = "style";
    var _showYuan_combo = { showYuan: false };
    var _dom_li_id_J_PromoPrice = _dom.get("#J_PromoPrice");
    var _dom_id_J_PromoBox;
    var Y = null;
    var _cfg, _elmProps, _skuMap, _itemPriceResultDO_t, d;
    var _eventtarget = _kissy.merge({}, _kissy.EventTarget);
    var _str_onPriceChange = "onPriceChange";
    var _price_cfg = { delPrice: false, promoShow: false, inited: false, yikouPrice: "", priceNeedDel: false };
    var D = { main: function (u) {
        var y = u.promotionList || {};
        var T = true;
        if (y.length) {
            var z = this;
            var S = '<li><em class="tb-promo-price-type">{{type}}</em><em class="tb-promo-info">\u767b\u5f55\u540e\u786e\u8ba4\u662f\u5426\u4eab\u6709\u6b64\u4f18\u60e0</em></li>';
            var w = '<li><em class="tb-promo-price-type">{{type}}</em> <strong class="price">{{price}}</strong><em class="add"> {{addInfo}}</em></li>';
            var AA = '{{#if promotionList[0].promType == "umpBigPromotionProm"}}<img style="float:left;margin:8px 4px 0 0" src="http://img02.taobaocdn.com/tps/i2/T1wqMjXoFXXXb6Jk6m-72-17.png" alt="12.12\u5fc3\u613f\u4ef7">{{#else}}{{#if (promotionList[0].type && (promotionList[0].promText || (priceRange.promPriceRange.indexOf("-") == -1)))}}<em class="tb-promo-price-type">{{promotionList[0].type}}</em>{{/if}}{{/if}}{{#if !promotionList[0].promText}}<strong{{#if valLimitStatu}} style="font-size:12px;color:#404040;padding-right:0;vertical-align:baseline"{{/if}}>{{promotionList[0].buyPrice||promotionList[0].price}}</strong><span>\u5143</span>{{/if}}{{#if promotionList[0].addInfo}}<em class="add">{{promotionList[0].addInfo}}</em>{{/if}}{{#if promotionList[0].promText}}<em class="tb-promo-info">{{promotionList[0].promText}}</em>{{/if}}{{moreLink}}';
            var v = [];
            for (var t = 1; t < y.length; t++) {
                if (y[t]["promText"]) {
                    v.push(_template(S).render(y[t]))
                } else {
                    v.push(_template(w).render(y[t]))
                }
            }
            if (v.length) {
                AA += '<ul class="tb-more-promo-slider tb-clearfix" id="J_MorePromoSlider">' + v.join("") + '<li class="post-script">\u4ee5\u4e0a\u4ef7\u683c\u53ef\u5728\u4ed8\u6b3e\u65f6\u9009\u62e9\u4eab\u7528</li></ul>'
            }
            var x = _mods_sku.getCurrentPriceInfo();
            u.valLimitStatu = x && x.promPrice && x.promPrice.limitTime && x.promPrice.start == false;
            if (u.promotionList.length < 2 || _g_config.offlineShop || _kissy_imp.cfg("is1111")) {
                T = false
            }
            if (T) {
                _event.remove("#J_MorePromoOptions", "mouseenter touchstart");
                _event.remove("#J_MorePromoOptions", "mouseleave touchend");
                u.moreLink = '<span class="tb-more-promo-options" id="J_MorePromoOptions">\u66f4\u591a\u4fc3\u9500<em class="tb-arrow"></em></span>'
            }
            _dom_id_J_PromoBox.innerHTML = _template(AA).render(u);
            if (T) {
                _event.on("#J_MorePromoOptions", "mouseenter touchstart", function (AB) {
                    AB.preventDefault();
                    z.showPromolist()
                });
                _event.on("#J_MorePromoOptions", "mouseleave touchend", function (AB) {
                    AB.preventDefault();
                    z.hidePromolist()
                })
            }
            if (u.promotionList[0]["promText"]) {
                d.init(u.promotionList[0]["promText"])
            }
            this.promoShow()
        }
        this.yikouPrice()
    }, showPromolist: function () {
        _dom.addClass(_dom_id_J_PromoBox, "showList")
    }, hidePromolist: function () {
        _dom.removeClass(_dom_id_J_PromoBox, "showList")
    }, yikouPrice: function () {
        if (_price_cfg.priceNeedDel || _cfg.emPointsBuy) {
            if (!_price_cfg.delPrice) {
                this.yikouPriceDel()
            }
            _price_cfg.delPrice = true
        } else {
            if (_price_cfg.delPrice) {
                this.yikouPriceShow()
            }
            _price_cfg.delPrice = false
        }
    }, yikouPriceDel: function () {
        _dom.addClass(_cfg.strPrice, "del")
    }, yikouPriceShow: function () {
        _dom.removeClass(_cfg.strPrice, "del")
    }, promoShow: function (S) {
        if (!_price_cfg.promoShow) {
            _dom.removeClass(_dom_li_id_J_PromoPrice, "tb-hidden")
        }
        _price_cfg.promoShow = true
    }, promoHide: function () {
        if (_price_cfg.promoShow) {
            _dom.addClass(_dom_li_id_J_PromoPrice, "tb-hidden")
        }
        _price_cfg.promoShow = false
    }, allPrice: function (T) {
        if (_price_cfg.yikouPrice == T) {
            return
        }
        _cfg.strPrice.innerHTML = T;
        var t = _kissy.one(".J_originalPrice");
        if (t) {
            t.html(T)
        }
        if (_g_config.isSpu) {
            var S = _kissy.one(".shop-shoplist");
            if (S) {
                _kissy.one(S.children()[0]).children().each(function (u) {
                    if (u.hasClass("show")) {
                        u.one(".price").html("<strong>" + T + "</strong>");
                        return false
                    }
                })
            }
        }
        _price_cfg.yikouPrice = T
    } 
    };
    var n = { getYikouPrice: function (u) {
        var S = u.subData;
        var T = u.priceRange;
        var t;
        if (T.priceRange) {
            t = T.priceRange
        } else {
            if (!S && _mods_sku.selectSkuId) {
                t = r()
            } else {
                if (S) {
                    t = S.price
                } else {
                    t = _kissy_imp.cfg("itemDO").reservePrice || ""
                }
            }
        }
        if (t == "") {
            t = _cfg.detail.defaultItemPrice
        }
        return t
    } 
    };
    function r() {
        var t;
        var T = _cfg.valItemInfo.skuMap;
        for (var S in T) {
            if (T[S].skuId == _mods_sku.selectSkuId) {
                t = T[S].price;
                break
            }
        }
        return t
    }
    function K(t) {
        var S;
        t.sort(function (w, v) {
            return w - v
        });
        var T = t[0];
        var u = t[t.length - 1];
        if (T == u) {
            S = T
        } else {
            S = T + " - " + u
        }
        return S
    }
    var Z = function () {
        _dom.insertBefore(_dom.create('<img id="tm-d12icon" src="http://img02.taobaocdn.com/tps/i2/T1wqMjXoFXXXb6Jk6m-72-17.png" alt="12.12\u5fc3\u613f\u4ef7">'), _cfg.strPrice);
        Z = function () {
        };
        return Z()
    };
    function h() {
        var AC = _mods_sku.getCurrentPriceInfo(), AD = _mods_sku.getCurrentPromotionList(), S = _mods_sku.getCurrentPromotion();
        var w = {};
        var AE = _cfg.valMode & 1;
        if (AC) {
            var x = _mods_sku.getCurrentPriceInfoList(), AB = [], t = [];
            if (AD) {
                for (var v = 0, u = AD.length; v < u; v++) {
                    var AF = AD[v];
                    AF.addInfo = [AF.add, AF.gift, AF.limitTime].join("")
                }
            }
            for (var v in x) {
                if (x[v].price) {
                    AB.push(x[v].price)
                }
                _mods_sku.onPromotionList(x[v], function (AG) {
                    if (AG && AG[0] && AG[0].price) {
                        t.push(AG[0].price)
                    }
                })
            }
            w = { priceRange: K(AB), promPriceRange: K(t) }
        } else {
            var AA = _cfg.valItemInfo.skuMap;
            var AB = [];
            for (var v in AA) {
                if (AA[v].price) {
                    AB.push(AA[v].price)
                }
            }
            w = { priceRange: K(AB), promPriceRange: null }
        }
        var z = { subData: AC, priceRange: w, promotionList: AD };
        var y = n.getYikouPrice(z);
        if (typeof y != "undefined") {
            D.allPrice(y)
        }
        if (!AC) {
            return b()
        }
        if (!S) {
            if (_itemPriceResultDO_t.umpBigPromotionItem) {
                Z()
            }
            b()
        }
        var S = _mods_sku.getCurrentPromotion() || {};
        var T = S.price;
        if (w.promPriceRange && !S.promText) {
            T = w.promPriceRange
        }
        if (S.promText) {
            T = null
        }
        T = T || y;
        S.buyPrice = T;
        if (S) {
            if ((S.limitTime && S.start == false) || S.promText || !S.price) {
                _price_cfg.priceNeedDel = false
            } else {
                _price_cfg.priceNeedDel = true
            }
        } else {
            _price_cfg.priceNeedDel = false
        }
        D.main(z);
        _eventtarget.fire(_str_onPriceChange, { price: T })
    }
    function b() {
        D.promoHide();
        if (!_cfg.emPointsBuy) {
            D.yikouPriceShow()
        }
    }
    function _limitBuy() {
        var _currentPromotion = _mods_sku.getCurrentPromotion();
        if (_currentPromotion) {
            var _promotionType = _getPromType();
            if (_promotionType == 1) {
                _dom.attr(_cfg.iptAmount, "data-type", "ju")
            }
            if (_currentPromotion.amountRestriction && (_promotionType == 1 || _currentPromotion.type == "限时打折")) {
                if (_kissy_imp.cfg("valStock") >= _currentPromotion.amountRestriction) {
                    _kissy_imp.cfg("valStock", _currentPromotion.amountRestriction);
                    _dom.html(_cfg.emStock, "(每人限购" + _currentPromotion.amountRestriction + "件)");
                    if (_currentPromotion.type == "限时打折") {
                        _cfg.isLimitProm = true
                    }
                    return true
                }
            }
        }
    }
    function U() {
        var _campaignInfo = _itemPriceResultDO_t.campaignInfo;
        if (!_campaignInfo || _g_config.offlineShop || (typeof _campaignInfo.serviceType == "undefined") || _campaignInfo.serviceType == 2) {
            return
        }
        _campaignInfo.isTeMai = _cfg.detail.isTeMai;
        var _template_snippet = '<dl><dt>{{#if serviceType == 1}}<i></i>{{#else}}<i class="tb-act-normal"></i>{{/if}}<a target="_blank" href="{{campaignURL}}"><strong>{{campaignName}}</strong><br />更多促销</a></dt><dd class="tb-act-time">{{#if !isWarmUp && leftDays >= 30}}此活动长期有效{{#else}}{{#if isWarmUp}}{{#if startTime && endTime}}<p>起：{{startTime}} <em>即将开始</em></p><p>止：{{endTime}} <em>敬请收藏</em></p>{{#else}}此活动即将开始{{/if}}{{#else}}{{#if leftDays == 1}}此活动仅剩一天 {{#else}}{{#if startTime}}<p>起：{{startTime}}</p>{{/if}}{{#if endTime}}<p>止：{{endTime}}</p>{{/if}}{{/if}}{{/if}}{{/if}}</dd>{{#if promotionPlan}}<dd class="tb-act-promotion">{{#each promotionPlan as plan index}}{{#if index%2 == 0}}<p>{{/if}}{{plan}} &nbsp;&nbsp;{{#if index%2 == 1 || index == promotionPlan.length - 1}}</p>{{/if}}{{/each}}</dd>{{/if}}{{#if serviceType == 1}}<dd class="tb-act-service"><a target="_blank" href="http://service.tmall.com/support/tmall/knowledge-4920180.htm">全场免邮</a><a class="service-24" target="_blank" href="http://service.tmall.com/support/tmall/knowledge-4781817.htm?pptm=24hour">24小时发货</a></dd>{{/if}}</dl>';
        var t = _dom.create('<div class="tb-activity" id="J_Activity"></div>');
        _campaignInfo.isWarmUp = _campaignInfo.isWarmUp || false;
        if (_campaignInfo.startTime) {
            _campaignInfo.startTime = _mods_sku.Util.formatDate(_campaignInfo.startTime)
        }
        if (_campaignInfo.endTime) {
            _campaignInfo.endTime = _mods_sku.Util.formatDate(_campaignInfo.endTime)
        }
        _dom.html(t, _template(_template_snippet).render(_campaignInfo));
        var _dom_id_J_SaleCombo = _kissy.get("#J_SaleCombo");
        if (_dom_id_J_SaleCombo) {
            _dom.insertBefore(t, _dom_id_J_SaleCombo)
        } else {
            if (_g_config.D950) {
                _dom.prepend(t, _dom.get("#mainwrap") || _dom.parent("#J_TabBar"))
            } else {
                _dom.insertAfter(t, ".tb-detail-bd")
            }
        }
    }
    function _getAreaSold(_selectSkuId_t) {
        var _sku_price_info;
        if (_kissy_imp.cfg("detailMode") != "skipError" && _selectSkuId_t && (_sku_price_info = _mods_sku.getPriceInfo(_selectSkuId_t))) {
            return _sku_price_info.areaSold
        } else {
            return true
        }
    }
    function _getCampaignInfo() {
        if (_itemPriceResultDO_t && _itemPriceResultDO_t.campaignInfo) {
            return _itemPriceResultDO_t.campaignInfo
        }
    }
    function _getPromType() {
        if (_itemPriceResultDO_t && _itemPriceResultDO_t.promType) {
            return _itemPriceResultDO_t.promType
        }
    }
    function R(T) {
        if (!_cfg) {
            _cfg = _kissy_imp.cfg()
        }
        var u = _cfg.valPointRate;
        if (_cfg.valMode & 512) {
            var t = _cfg.emPoint;
            R = function (w) {
                var v;
                if (w.indexOf("-") != -1) {
                    w = w.split("-");
                    v = Math.floor(w[0] * u) + "<span>\u8d77</span>"
                } else {
                    v = Math.floor(w * u)
                }
                _dom.html(t, v)
            }
        } else {
            R = function () {
                return
            }
        }
        if (_cfg.emPointsBuy) {
            var S = _cfg.emPointsBuy;
            S.replaceChild(_document.createTextNode(T * 100), S.firstChild)
        }
        return R(T)
    }
    function i(T) {
        var S = T.price || "";
        if (S) {
            R(S)
        }
    }
    var d = function () {
        var _dom_class_tb_promo_price_type = _dom.get(".tb-promo-price-type");
        var _str = "登录后查看是否享有此优惠";
        return { init: function (w) {
            if (!_dom_class_tb_promo_price_type) {
                return
            }
            var _span, _dom_class_cor, _dom_class_con;
            _event.on(_dom_class_tb_promo_price_type, "mouseenter", function () {
                if (!_span) {
                    (_span = _dom.create("<span>", { css: { top: _dom.offset(_dom_class_tb_promo_price_type).top + 18, left: _dom.offset(_dom_class_tb_promo_price_type).left - 30, display: "none"} })).className = "coin-popup";
                    (_dom_class_cor = _dom.create("<span>")).className = "cor";
                    (_dom_class_con = _dom.create("<span>")).className = "con";
                    _span.appendChild(_dom_class_cor);
                    _span.appendChild(_dom_class_con);
                    _body.insertBefore(_span, _body.firstChild);
                    _dom_class_con.innerHTML = w;
                    _event.on(_span, "mouseenter", function () {
                        _span.style.display = "inline"
                    });
                    _event.on(_span, "mouseleave", function () {
                        _span.style.display = "none"
                    })
                }
                _span.style.display = "inline"
            });
            _event.on(_dom_class_tb_promo_price_type, "mouseleave", function () {
                _span.style.display = "none"
            })
        } 
        }
    } ();
    function _init(_itemPriceResultDO, _inventoryDO) {
        _cfg = _kissy_imp.cfg();
        if (_dom.get("#J_StrPrice") && _kissy.trim(_dom.html("#J_StrPrice")) == "") {
            _dom.html("#J_StrPrice", _cfg.detail.defaultItemPrice || "")
        }
        if (typeof _itemPriceResultDO == "undefined") {
            return
        }
        //2013-04-09 basilwang size & color
        _elmProps = _cfg.elmProps ? _cfg.elmProps.length : 0;
        _skuMap = _cfg.valItemInfo.skuMap;
        _itemPriceResultDO_t = _itemPriceResultDO;
        if (!_dom_li_id_J_PromoPrice) {
            return false
        }
        _dom_id_J_PromoBox = _dom.get("#J_PromoBox");
        _eventtarget.on(_str_onPriceChange, function (_e) {
            i(_e)
        });
        if (_itemPriceResultDO_t.wanrentuanInfo && _itemPriceResultDO_t.wanrentuanInfo.status != 0) {
            _kissy.use("malldetail/sku/wanrentuan", function (u, t) {
                t.init(_itemPriceResultDO_t.wanrentuanInfo, _inventoryDO)
            })
        } else {
            if (!_price_cfg.inited) {
                _price_cfg.inited = true;
                _mods_sku.PropertyHandler.onPropertyChange(function (_e) {
                    if (_cfg.isSupportCity) {
                        h()
                    }
                });
                U()
            }
            h();
            if (_itemPriceResultDO_t.wanrentuanInfo && _itemPriceResultDO_t.wanrentuanInfo.status == 0) {
                _mods_sku.LinkBuy.statu("wanrenturn", "disabled")
            }
        }
    }
    var _updatePointsBuyPrice = function (_price) {
        var _emPointsBuy = _kissy_imp.cfg("emPointsBuy");
        if (_emPointsBuy) {
            _updatePointsBuyPrice = function (_price) {
                _emPointsBuy.replaceChild(_document.createTextNode(_price), _emPointsBuy.firstChild)
            }
        } else {
            _updatePointsBuyPrice = function () {
                return false
            }
        }
        return _updatePointsBuyPrice(_price)
    };
    return _mods_sku.Price = { init: _init, getAreaSold: _getAreaSold, getCampaignInfo: _getCampaignInfo, getPromType: _getPromType, limitBuy: _limitBuy, updatePointsBuyPrice: function (_price) {
        return _updatePointsBuyPrice(_price)
    } 
    }
}, { requires: ["template"] }); /*pub-1|2013-02-01 14:30:07*/