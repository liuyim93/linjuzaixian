
KISSY.add("malldetail/sku/price", function (F, c) {
    var A = F.mods.SKU;
    var G = KISSY, X = G.DOM, j = G.Event, J = document, l = J.body;
    var B = window.g_config;
    var C = "display", P = "block", o = "hidden", e = "none", E = "", q = "style";
    var M = { showYuan: false };
    var V = X.get("#J_PromoPrice");
    var s;
    var Y = null;
    var g, m, Q, I, d;
    var f = G.merge({}, G.EventTarget);
    var H = "onPriceChange";
    var a = { delPrice: false, promoShow: false, inited: false, yikouPrice: "", priceNeedDel: false };
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
                    v.push(c(S).render(y[t]))
                } else {
                    v.push(c(w).render(y[t]))
                }
            }
            if (v.length) {
                AA += '<ul class="tb-more-promo-slider tb-clearfix" id="J_MorePromoSlider">' + v.join("") + '<li class="post-script">\u4ee5\u4e0a\u4ef7\u683c\u53ef\u5728\u4ed8\u6b3e\u65f6\u9009\u62e9\u4eab\u7528</li></ul>'
            }
            var x = A.getCurrentPriceInfo();
            u.valLimitStatu = x && x.promPrice && x.promPrice.limitTime && x.promPrice.start == false;
            if (u.promotionList.length < 2 || B.offlineShop || F.cfg("is1111")) {
                T = false
            }
            if (T) {
                j.remove("#J_MorePromoOptions", "mouseenter touchstart");
                j.remove("#J_MorePromoOptions", "mouseleave touchend");
                u.moreLink = '<span class="tb-more-promo-options" id="J_MorePromoOptions">\u66f4\u591a\u4fc3\u9500<em class="tb-arrow"></em></span>'
            }
            s.innerHTML = c(AA).render(u);
            if (T) {
                j.on("#J_MorePromoOptions", "mouseenter touchstart", function (AB) {
                    AB.preventDefault();
                    z.showPromolist()
                });
                j.on("#J_MorePromoOptions", "mouseleave touchend", function (AB) {
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
        X.addClass(s, "showList")
    }, hidePromolist: function () {
        X.removeClass(s, "showList")
    }, yikouPrice: function () {
        if (a.priceNeedDel || g.emPointsBuy) {
            if (!a.delPrice) {
                this.yikouPriceDel()
            }
            a.delPrice = true
        } else {
            if (a.delPrice) {
                this.yikouPriceShow()
            }
            a.delPrice = false
        }
    }, yikouPriceDel: function () {
        X.addClass(g.strPrice, "del")
    }, yikouPriceShow: function () {
        X.removeClass(g.strPrice, "del")
    }, promoShow: function (S) {
        if (!a.promoShow) {
            X.removeClass(V, "tb-hidden")
        }
        a.promoShow = true
    }, promoHide: function () {
        if (a.promoShow) {
            X.addClass(V, "tb-hidden")
        }
        a.promoShow = false
    }, allPrice: function (T) {
        if (a.yikouPrice == T) {
            return
        }
        g.strPrice.innerHTML = T;
        var t = G.one(".J_originalPrice");
        if (t) {
            t.html(T)
        }
        if (B.isSpu) {
            var S = G.one(".shop-shoplist");
            if (S) {
                G.one(S.children()[0]).children().each(function (u) {
                    if (u.hasClass("show")) {
                        u.one(".price").html("<strong>" + T + "</strong>");
                        return false
                    }
                })
            }
        }
        a.yikouPrice = T
    } 
    };
    var n = { getYikouPrice: function (u) {
        var S = u.subData;
        var T = u.priceRange;
        var t;
        if (T.priceRange) {
            t = T.priceRange
        } else {
            if (!S && A.selectSkuId) {
                t = r()
            } else {
                if (S) {
                    t = S.price
                } else {
                    t = F.cfg("itemDO").reservePrice || ""
                }
            }
        }
        if (t == "") {
            t = g.detail.defaultItemPrice
        }
        return t
    } 
    };
    function r() {
        var t;
        var T = g.valItemInfo.skuMap;
        for (var S in T) {
            if (T[S].skuId == A.selectSkuId) {
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
        X.insertBefore(X.create('<img id="tm-d12icon" src="http://img02.taobaocdn.com/tps/i2/T1wqMjXoFXXXb6Jk6m-72-17.png" alt="12.12\u5fc3\u613f\u4ef7">'), g.strPrice);
        Z = function () {
        };
        return Z()
    };
    function h() {
        var AC = A.getCurrentPriceInfo(), AD = A.getCurrentPromotionList(), S = A.getCurrentPromotion();
        var w = {};
        var AE = g.valMode & 1;
        if (AC) {
            var x = A.getCurrentPriceInfoList(), AB = [], t = [];
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
                A.onPromotionList(x[v], function (AG) {
                    if (AG && AG[0] && AG[0].price) {
                        t.push(AG[0].price)
                    }
                })
            }
            w = { priceRange: K(AB), promPriceRange: K(t) }
        } else {
            var AA = g.valItemInfo.skuMap;
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
            if (I.umpBigPromotionItem) {
                Z()
            }
            b()
        }
        var S = A.getCurrentPromotion() || {};
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
                a.priceNeedDel = false
            } else {
                a.priceNeedDel = true
            }
        } else {
            a.priceNeedDel = false
        }
        D.main(z);
        f.fire(H, { price: T })
    }
    function b() {
        D.promoHide();
        if (!g.emPointsBuy) {
            D.yikouPriceShow()
        }
    }
    function k() {
        var T = A.getCurrentPromotion();
        if (T) {
            var S = L();
            if (S == 1) {
                X.attr(g.iptAmount, "data-type", "ju")
            }
            if (T.amountRestriction && (S == 1 || T.type == "\u9650\u65f6\u6253\u6298")) {
                if (F.cfg("valStock") >= T.amountRestriction) {
                    F.cfg("valStock", T.amountRestriction);
                    X.html(g.emStock, "(\u6bcf\u4eba\u9650\u8d2d" + T.amountRestriction + "\u4ef6)");
                    if (T.type == "\u9650\u65f6\u6253\u6298") {
                        g.isLimitProm = true
                    }
                    return true
                }
            }
        }
    }
    function U() {
        var u = I.campaignInfo;
        if (!u || B.offlineShop || (typeof u.serviceType == "undefined") || u.serviceType == 2) {
            return
        }
        u.isTeMai = g.detail.isTeMai;
        var S = '<dl><dt>{{#if serviceType == 1}}<i></i>{{#else}}<i class="tb-act-normal"></i>{{/if}}<a target="_blank" href="{{campaignURL}}"><strong>{{campaignName}}</strong><br />\u66f4\u591a\u4fc3\u9500</a></dt><dd class="tb-act-time">{{#if !isWarmUp && leftDays >= 30}}\u6b64\u6d3b\u52a8\u957f\u671f\u6709\u6548{{#else}}{{#if isWarmUp}}{{#if startTime && endTime}}<p>\u8d77\uff1a{{startTime}} <em>\u5373\u5c06\u5f00\u59cb</em></p><p>\u6b62\uff1a{{endTime}} <em>\u656c\u8bf7\u6536\u85cf</em></p>{{#else}}\u6b64\u6d3b\u52a8\u5373\u5c06\u5f00\u59cb{{/if}}{{#else}}{{#if leftDays == 1}}\u6b64\u6d3b\u52a8\u4ec5\u5269\u4e00\u5929 {{#else}}{{#if startTime}}<p>\u8d77\uff1a{{startTime}}</p>{{/if}}{{#if endTime}}<p>\u6b62\uff1a{{endTime}}</p>{{/if}}{{/if}}{{/if}}{{/if}}</dd>{{#if promotionPlan}}<dd class="tb-act-promotion">{{#each promotionPlan as plan index}}{{#if index%2 == 0}}<p>{{/if}}{{plan}} &nbsp;&nbsp;{{#if index%2 == 1 || index == promotionPlan.length - 1}}</p>{{/if}}{{/each}}</dd>{{/if}}{{#if serviceType == 1}}<dd class="tb-act-service"><a target="_blank" href="http://service.tmall.com/support/tmall/knowledge-4920180.htm">\u5168\u573a\u514d\u90ae</a><a class="service-24" target="_blank" href="http://service.tmall.com/support/tmall/knowledge-4781817.htm?pptm=24hour">24\u5c0f\u65f6\u53d1\u8d27</a></dd>{{/if}}</dl>';
        var t = X.create('<div class="tb-activity" id="J_Activity"></div>');
        u.isWarmUp = u.isWarmUp || false;
        if (u.startTime) {
            u.startTime = A.Util.formatDate(u.startTime)
        }
        if (u.endTime) {
            u.endTime = A.Util.formatDate(u.endTime)
        }
        X.html(t, c(S).render(u));
        var T = G.get("#J_SaleCombo");
        if (T) {
            X.insertBefore(t, T)
        } else {
            if (B.D950) {
                X.prepend(t, X.get("#mainwrap") || X.parent("#J_TabBar"))
            } else {
                X.insertAfter(t, ".tb-detail-bd")
            }
        }
    }
    function O(S) {
        var T;
        if (F.cfg("detailMode") != "skipError" && S && (T = A.getPriceInfo(S))) {
            return T.areaSold
        } else {
            return true
        }
    }
    function W() {
        if (I && I.campaignInfo) {
            return I.campaignInfo
        }
    }
    function L() {
        if (I && I.promType) {
            return I.promType
        }
    }
    function R(T) {
        if (!g) {
            g = F.cfg()
        }
        var u = g.valPointRate;
        if (g.valMode & 512) {
            var t = g.emPoint;
            R = function (w) {
                var v;
                if (w.indexOf("-") != -1) {
                    w = w.split("-");
                    v = Math.floor(w[0] * u) + "<span>\u8d77</span>"
                } else {
                    v = Math.floor(w * u)
                }
                X.html(t, v)
            }
        } else {
            R = function () {
                return
            }
        }
        if (g.emPointsBuy) {
            var S = g.emPointsBuy;
            S.replaceChild(J.createTextNode(T * 100), S.firstChild)
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
        var S = X.get(".tb-promo-price-type");
        var T = "\u767b\u5f55\u540e\u67e5\u770b\u662f\u5426\u4eab\u6709\u6b64\u4f18\u60e0";
        return { init: function (w) {
            if (!S) {
                return
            }
            var u, v, t;
            j.on(S, "mouseenter", function () {
                if (!u) {
                    (u = X.create("<span>", { css: { top: X.offset(S).top + 18, left: X.offset(S).left - 30, display: "none"} })).className = "coin-popup";
                    (v = X.create("<span>")).className = "cor";
                    (t = X.create("<span>")).className = "con";
                    u.appendChild(v);
                    u.appendChild(t);
                    l.insertBefore(u, l.firstChild);
                    t.innerHTML = w;
                    j.on(u, "mouseenter", function () {
                        u.style.display = "inline"
                    });
                    j.on(u, "mouseleave", function () {
                        u.style.display = "none"
                    })
                }
                u.style.display = "inline"
            });
            j.on(S, "mouseleave", function () {
                u.style.display = "none"
            })
        } 
        }
    } ();
    function p(S, T) {
        g = F.cfg();
        if (X.get("#J_StrPrice") && G.trim(X.html("#J_StrPrice")) == "") {
            X.html("#J_StrPrice", g.detail.defaultItemPrice || "")
        }
        if (typeof S == "undefined") {
            return
        }
        m = g.elmProps ? g.elmProps.length : 0;
        Q = g.valItemInfo.skuMap;
        I = S;
        if (!V) {
            return false
        }
        s = X.get("#J_PromoBox");
        f.on(H, function (t) {
            i(t)
        });
        if (I.wanrentuanInfo && I.wanrentuanInfo.status != 0) {
            G.use("malldetail/sku/wanrentuan", function (u, t) {
                t.init(I.wanrentuanInfo, T)
            })
        } else {
            if (!a.inited) {
                a.inited = true;
                A.PropertyHandler.onPropertyChange(function (t) {
                    if (g.isSupportCity) {
                        h()
                    }
                });
                U()
            }
            h();
            if (I.wanrentuanInfo && I.wanrentuanInfo.status == 0) {
                A.LinkBuy.statu("wanrenturn", "disabled")
            }
        }
    }
    var N = function (S) {
        var T = F.cfg("emPointsBuy");
        if (T) {
            N = function (t) {
                T.replaceChild(J.createTextNode(t), T.firstChild)
            }
        } else {
            N = function () {
                return false
            }
        }
        return N(S)
    };
    return A.Price = { init: p, getAreaSold: O, getCampaignInfo: W, getPromType: L, limitBuy: k, updatePointsBuyPrice: function (S) {
        return N(S)
    } 
    }
}, { requires: ["template"] }); /*pub-1|2013-02-01 14:30:07*/