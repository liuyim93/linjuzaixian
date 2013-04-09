
KISSY.add("malldetail/sku/price", function (_kissy_imp, _template) {
    var _mods_sku = _kissy_imp.mods.SKU;
    var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _document = document, _body = _document.body;
    var _g_config = window.g_config;
    var C = "display", P = "block", o = "hidden", e = "none", E = "", q = "style";
    var M = { showYuan: false };
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
    function k() {
        var T = _mods_sku.getCurrentPromotion();
        if (T) {
            var S = L();
            if (S == 1) {
                _dom.attr(_cfg.iptAmount, "data-type", "ju")
            }
            if (T.amountRestriction && (S == 1 || T.type == "\u9650\u65f6\u6253\u6298")) {
                if (_kissy_imp.cfg("valStock") >= T.amountRestriction) {
                    _kissy_imp.cfg("valStock", T.amountRestriction);
                    _dom.html(_cfg.emStock, "(\u6bcf\u4eba\u9650\u8d2d" + T.amountRestriction + "\u4ef6)");
                    if (T.type == "\u9650\u65f6\u6253\u6298") {
                        _cfg.isLimitProm = true
                    }
                    return true
                }
            }
        }
    }
    function U() {
        var u = _itemPriceResultDO_t.campaignInfo;
        if (!u || _g_config.offlineShop || (typeof u.serviceType == "undefined") || u.serviceType == 2) {
            return
        }
        u.isTeMai = _cfg.detail.isTeMai;
        var S = '<dl><dt>{{#if serviceType == 1}}<i></i>{{#else}}<i class="tb-act-normal"></i>{{/if}}<a target="_blank" href="{{campaignURL}}"><strong>{{campaignName}}</strong><br />更多促销</a></dt><dd class="tb-act-time">{{#if !isWarmUp && leftDays >= 30}}此活动长期有效{{#else}}{{#if isWarmUp}}{{#if startTime && endTime}}<p>起：{{startTime}} <em>即将开始</em></p><p>\u6b62\uff1a{{endTime}} <em>\u656c\u8bf7\u6536\u85cf</em></p>{{#else}}\u6b64\u6d3b\u52a8\u5373\u5c06\u5f00\u59cb{{/if}}{{#else}}{{#if leftDays == 1}}\u6b64\u6d3b\u52a8\u4ec5\u5269\u4e00\u5929 {{#else}}{{#if startTime}}<p>\u8d77\uff1a{{startTime}}</p>{{/if}}{{#if endTime}}<p>\u6b62\uff1a{{endTime}}</p>{{/if}}{{/if}}{{/if}}{{/if}}</dd>{{#if promotionPlan}}<dd class="tb-act-promotion">{{#each promotionPlan as plan index}}{{#if index%2 == 0}}<p>{{/if}}{{plan}} &nbsp;&nbsp;{{#if index%2 == 1 || index == promotionPlan.length - 1}}</p>{{/if}}{{/each}}</dd>{{/if}}{{#if serviceType == 1}}<dd class="tb-act-service"><a target="_blank" href="http://service.tmall.com/support/tmall/knowledge-4920180.htm">\u5168\u573a\u514d\u90ae</a><a class="service-24" target="_blank" href="http://service.tmall.com/support/tmall/knowledge-4781817.htm?pptm=24hour">24\u5c0f\u65f6\u53d1\u8d27</a></dd>{{/if}}</dl>';
        var t = _dom.create('<div class="tb-activity" id="J_Activity"></div>');
        u.isWarmUp = u.isWarmUp || false;
        if (u.startTime) {
            u.startTime = _mods_sku.Util.formatDate(u.startTime)
        }
        if (u.endTime) {
            u.endTime = _mods_sku.Util.formatDate(u.endTime)
        }
        _dom.html(t, _template(S).render(u));
        var T = _kissy.get("#J_SaleCombo");
        if (T) {
            _dom.insertBefore(t, T)
        } else {
            if (_g_config.D950) {
                _dom.prepend(t, _dom.get("#mainwrap") || _dom.parent("#J_TabBar"))
            } else {
                _dom.insertAfter(t, ".tb-detail-bd")
            }
        }
    }
    function O(S) {
        var T;
        if (_kissy_imp.cfg("detailMode") != "skipError" && S && (T = _mods_sku.getPriceInfo(S))) {
            return T.areaSold
        } else {
            return true
        }
    }
    function W() {
        if (_itemPriceResultDO_t && _itemPriceResultDO_t.campaignInfo) {
            return _itemPriceResultDO_t.campaignInfo
        }
    }
    function L() {
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
        var S = _dom.get(".tb-promo-price-type");
        var T = "\u767b\u5f55\u540e\u67e5\u770b\u662f\u5426\u4eab\u6709\u6b64\u4f18\u60e0";
        return { init: function (w) {
            if (!S) {
                return
            }
            var u, v, t;
            _event.on(S, "mouseenter", function () {
                if (!u) {
                    (u = _dom.create("<span>", { css: { top: _dom.offset(S).top + 18, left: _dom.offset(S).left - 30, display: "none"} })).className = "coin-popup";
                    (v = _dom.create("<span>")).className = "cor";
                    (t = _dom.create("<span>")).className = "con";
                    u.appendChild(v);
                    u.appendChild(t);
                    _body.insertBefore(u, _body.firstChild);
                    t.innerHTML = w;
                    _event.on(u, "mouseenter", function () {
                        u.style.display = "inline"
                    });
                    _event.on(u, "mouseleave", function () {
                        u.style.display = "none"
                    })
                }
                u.style.display = "inline"
            });
            _event.on(S, "mouseleave", function () {
                u.style.display = "none"
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
    var N = function (S) {
        var T = _kissy_imp.cfg("emPointsBuy");
        if (T) {
            N = function (t) {
                T.replaceChild(_document.createTextNode(t), T.firstChild)
            }
        } else {
            N = function () {
                return false
            }
        }
        return N(S)
    };
    return _mods_sku.Price = { init: _init, getAreaSold: O, getCampaignInfo: W, getPromType: L, limitBuy: k, updatePointsBuyPrice: function (S) {
        return N(S)
    } 
    }
}, { requires: ["template"] }); /*pub-1|2013-02-01 14:30:07*/