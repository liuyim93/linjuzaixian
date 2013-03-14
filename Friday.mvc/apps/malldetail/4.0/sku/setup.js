TB.loginHttp = TB.loginHttp || "https";
KISSY.add("malldetail/sku/setup", function (H, D, K, o, F, s, b, E, c, q, W, u, P, f, R, U, g, X, t) {
    var A = H.namespace("mods.SKU"), I = KISSY, a = I.DOM, j = I.Event, e = I.UA;
    var n = window, J = document, k = J.body;
    var B = n.g_config;
    var G = "";
    var i = {};
    var h = I.merge({}, I.EventTarget);
    var V = "configChange";
    var N = "skuInited";
    var p = {};
    A.selectSkuId = 0;
    A.valSkuInfo = "";
    var m = function (x) {
        var w = i.valItemInfo.skuMap;
        if (x && x.success) {
            var T = x.skuQuantity;
            if (i.valMode & 1 && T) {
                for (var v in w) {
                    var S = w[v]["skuId"];
                    if (T[S]) {
                        w[v].type = T[S]["type"];
                        w[v].stock = T[S]["quantity"]
                    }
                }
            }
            i.valItemInfo.type = x.type;
            i.valItemInfo.skuQuantity = T
        }
    };
    function L() {
        var y = I.unparam(n.location.href.split("?")[1]);
        var x = [];
        var w;
        var T = i.elmProps && i.elmProps.length;
        if (!T) {
            return
        }
        if (y.skuId) {
            var w = i.valItemInfo.skuMap;
            var S = y.skuId;
            for (var v in w) {
                if (w[v]["skuId"] == S) {
                    v = v.split(";");
                    x = v.slice(1, v.length - 1);
                    break
                }
            }
        } else {
            if (y.sku_properties) {
                x = y.sku_properties.split(";")
            }
        }
        if (x.length) {
            i.valItemInfo.defSelected = x;
            I.log(x)
        }
    }
    function O() {
        var S = i.valMode;
        L();
        E.init();
        A.LinkAdd = new A.Util.BuyLinkStatu("#J_LinkAdd", 2);
        if (n.g_config.offlineShop) {
            I.getScript(B.assetsHost + "/??p/mall/jz/popup/popup.js,p/mall/jz/scroll/scroll.js", function () {
                I.ready(function () {
                    window.Scroll.init(a.get("#content"), 880);
                    a.css("#content", "width", "100%")
                })
            });
            A.cardManager = new window.JZ.CardManager({ cardCookie: "xx1", loginCookie: "xx4", timeout: 10000 });
            if (S & 2) {
                H.use("malldetail/cart/cart", function (v, w) {
                    w.init()
                })
            }
        }
        A.PopupSimulate.init();
        if (G !== i.valLoginIndicator || G !== i.valLoginUrl) {
            A.FastLogin.init()
        }
        f.init();
        if (a.get("#J_ExSelect")) {
            I.use("malldetail/sku/codeexchange", function () {
                H.mods.CodeExchange.init()
            })
        }
    }
    function r(w) {
        var v = false;
        var S = i.itemDO.auctionStatus;
        var y = i.detail.isAuthSeller;
        var T = "";
        if (!w.userInfoDO.loginUserType) {
            v = i.itemDO.canView;
            T = 1
        } else {
            var x = w.userInfoDO.loginUserType == "seller" ? true : false;
            if (w.userInfoDO.loginCC) {
                if (x && i.detail.isItemAllowSellerView) {
                    T = 2;
                    v = true
                } else {
                    T = 3;
                    v = false
                }
            } else {
                if (!x) {
                    T = 4;
                    v = i.itemDO.canView
                } else {
                    if (i.detail.isItemAllowSellerView) {
                        T = 5;
                        v = true
                    } else {
                        T = 6;
                        v = false
                    }
                }
            }
            if ((S != 0 && S != 1) && !x) {
                if (!y) {
                    T = 83;
                    v = false
                }
            }
        }
        if (i.itemDO.sellerFreeze) {
            T = 7;
            v = false
        }
        if (!v) {
            n.location.href = "http://detail.tmall.com/auction/noitem.htm?type=" + T
        }
    }
    function M(S) {
        W.init();
        P.init(S);
        if (i.isHouseholdService) {
            H.use("malldetail/sku/jia", function (T, v) {
                v.init()
            })
        }
        q.init(S.sellCountDO);
        K.loadAssets("cps/trace.js?t=20120618", function () {
            var T = B.isSpu ? 1 : ((i.userInfoDO && i.userInfoDO.juKeBuyerLogin) ? 4 : 2);
            try {
                window.CPS.trace({ type: 1, subtype: T, itemid: i.itemDO.itemId, sellerid: i.itemDO.userId })
            } catch (v) {
            }
        })
    }
    function d(S) {
        var v = ["#J_RSPostageCont", "#J_EmStock"];
        var T = S ? "removeClass" : "addClass";
        I.each(v, function (w) {
            a[T](w, "tb-hidden")
        })
    }
    function l() {
        var S = function (v) {
            var w = i.valMode;
            r(v);
            C(v);
            if (!A.LinkBuy) {
                A.LinkBuy = new A.Util.BuyLinkStatu("#J_LinkBuy", 3)
            }
            A.Price.init(v.itemPriceResultDO, v.inventoryDO);
            H.use("malldetail/sku/double11", function (x, y) {
                y.init(v.detailPageTipsDO, v.tradeResult, v.itemPriceResultDO, v.miscDO)
            });
            T(v);
            U.init(v.deliveryDO);
            g.init(v);
            p = v
        };
        var T = function (v) {
            var w = i.valMode;
            if (w & 2048) {
                A.BasketHandler.init()
            } else {
                if (v.tradeResult.miniTmallCartEnable) {
                    A.BasketHandler.load()
                }
            }
            f.init(v.itemPriceResultDO);
            b.init(v);
            i.onBuyEnable && i.onBuyEnable();
            A.Service.init(v.serviceDO);
            c.init(v.specialServiceList);
            if (a.attr("#J_TreeSelectTrigger", "combo-level") != 3) {
                A.L2Selector.init(i);
                A.dqCity.init(v.soldAreaDO)
            } else {
                A.areaSell.init(v.soldAreaDO)
            }
            M(v);
            h.fire(N, v);
            T = function (x) {
            };
            return T(v)
        };
        o.setMdskipTimeout(i.noSkipMode.timeout || 3000);
        o.onModel(function (v) {
            if (v.isSuccess) {
                m(v.inventoryDO)
            }
            S(v);
            d(v.isSuccess)
        }, 13)
    }
    A.getCurrentSkuList = function () {
        if (A.selectSkuId) {
            return [A.selectSkuId]
        }
        var y = A.selArr || [], S = [], x = i.valItemInfo.skuMap;
        if (!x) {
            return null
        }
        for (var z in x) {
            var v = true;
            for (var T = 0; T < y.length; T++) {
                var w = new RegExp(";" + y[T] + ";");
                if (!i.detail.isDownShelf && !w.test(z)) {
                    v = false;
                    break
                }
            }
            if (v) {
                S.push(x[z]["skuId"])
            }
        }
        return S
    };
    A.getCurrentPromotion = function () {
        var S;
        A.onCurrentPromotion(function (T) {
            S = T
        });
        return S
    };
    A.onCurrentPromotion = function (S) {
        A.onCurrentPromotionList(function (T) {
            if (!T) {
                S();
                return
            }
            S(T[0])
        })
    };
    A.getCurrentPromotionList = function () {
        var S;
        A.onCurrentPromotionList(function (T) {
            S = T
        });
        return S
    };
    A.onCurrentPromotionList = function (S) {
        A.onCurrentPriceInfo(function (T) {
            A.onPromotionList(T, S)
        })
    };
    A.getPriceInfo = function (S) {
        var T;
        A.onPriceInfo(S, function (v) {
            T = v
        });
        return T
    };
    A.onPromotionList = function (S, T) {
        A.onPriceInfo(S, function (y) {
            if (!y) {
                T();
                return
            }
            var v = y.promPrice, w = y.promotionList;
            if (v) {
                var x = [v];
                if (w) {
                    x = x.concat(w)
                }
                T(x);
                return
            }
            T(w)
        })
    };
    A.onPriceData = function (T) {
        var S = A.buyerLocation && A.buyerLocation.areaId;
        o.onPriceInfo({ areaId: S }, T, 13)
    };
    A.onPriceInfo = function (S, T) {
        A.onPriceData(function (v) {
            if ((typeof S) == "object") {
                T(S);
                return
            }
            T(v[S || "def"])
        }, 13)
    };
    A.getCurrentPriceInfo = function () {
        var S;
        A.onCurrentPriceInfo(function (T) {
            S = T
        });
        return S
    };
    A.onCurrentPriceInfo = function (S) {
        A.onCurrentPriceInfoList(function (T) {
            S(T[0])
        })
    };
    A.getCurrentPriceInfoList = function () {
        var S;
        A.onCurrentPriceInfoList(function (T) {
            S = T
        });
        return S
    };
    A.onCurrentPriceInfoList = function (S) {
        A.onPriceData(function (w) {
            var T = A.getCurrentSkuList();
            var v = [];
            if (T) {
                I.each(T, function (x) {
                    if (w[x]) {
                        v.push(w[x])
                    }
                })
            } else {
                I.each(w, function (x) {
                    if (x) {
                        v.push(x)
                    }
                })
            }
            v = v.sort(function (y, x) {
                return (y.promPrice ? y.promPrice.price : y.price) - (x.promPrice ? x.promPrice.price : x.price)
            });
            S(v)
        })
    };
    A.changeLocation = function (w) {
        A.buyerLocation = w;
        var v = i.changeLocationApi;
        var T = H.getUrlParams;
        var x = p.gatewayDO;
        var S = T(["campaignId", "abt", "key"]);
        S.ref = encodeURIComponent(J.referrer);
        S.areaId = w ? w.areaId : "";
        if (v.indexOf("tmallBuySupport") == -1) {
            S.tmallBuySupport = i.tradeType == 2 ? "true" : "false"
        }
        if (x && x.changeLocationGateway) {
            I.mix(S, x.changeLocationGateway)
        }
        I.use("ajax", function (z, y) {
            y.jsonp(v, S, function (AA) {
                if (AA.isSuccess) {
                    var AB = AA.defaultModel;
                    o.setLocationModel(w.areaId, AB);
                    m(AB.inventoryDO);
                    A.Price.init(AB.itemPriceResultDO, AB.inventoryDO);
                    A.Service.init(AB.serviceDO);
                    g.init(AB);
                    U.init(AB.deliveryDO);
                    b.init(AB);
                    c.init(AB.specialServiceList);
                    A.PropertyHandler.reset()
                }
            })
        })
    };
    function Z() {
        var T = '<li class="sold-out-recommend" id="J_Sold-out-recommend">                            <p><strong class="sold-out-tit">\u6b64\u5546\u54c1\u5df2\u4e0b\u67b6</strong>\uff08<a target="_blank" href="http://service.taobao.com/support/knowledge-1102683.htm"><img src="http://img03.taobaocdn.com/tps/i3/T1Tj4wXkVhXXXXXXXX-12-12.png" alt="\u4e3a\u4ec0\u4e48"></a>\uff09</p>                            <div id="J_FE_soldout"></div>                        </li>';
        var S = a.children("#J_DetailMeta .tb-wrap");
        var w, v;
        I.each(S, function (z, y) {
            if (y == 0 && z.className == "tb-meta") {
                w = z;
                v = a.children(z)
            } else {
                if (y == 1 && !v) {
                    w = z;
                    v = a.children(z)
                } else {
                    a.remove(z)
                }
            }
        });
        if (!v) {
            return
        }
        I.each(v, function (y, z) {
            if (!y.id || (y.id != "J_StrPriceModBox" && y.id != "J_PromoPrice")) {
                a.remove(y);
                delete v[z]
            }
        });
        if (w) {
            var x = a.create(T);
            a.append(x, w)
        }
        S = w = v = null;
        H.use("malldetail/recommend/common", function (y, z) {
            z.install("soldOut", "#J_FE_soldout")
        })
    }
    function Q(S) {
        if (i.valMode & 1) {
            A.PropertyHandler.init()
        }
        I.ready(function (T) {
            t.init();
            R.init(S);
            if (i.detail.isDownFe) {
                Z()
            } else {
                if (S.jzDO) {
                    A.IFCLocation.init(S)
                }
                if (i.isMeiz) {
                    H.use("malldetail/meiz/meiz", function (v) {
                        v.mods.Meiz.init(S)
                    })
                }
                if (T.one(".J_Calculator", "#detail")) {
                    T.use("malldetail/sku/calculator", function (w, v) {
                        v.init()
                    })
                }
                u.init(S)
            }
            if (i.isTmallComboSupport) {
                H.use("malldetail/combos/combos", function (v) {
                    v.mods.Token.onInited(function () {
                        v.mods.Combos.init()
                    })
                })
            }
        })
    }
    function C(w) {
        var T = H.getUrlParams;
        var z = i.frmBid;
        if (!z) {
            return
        }
        var S = { arr: [], set: function (AB, AC, AD) {
            if (z[AB]) {
                z[AB].value = AC
            } else {
                this.arr.push({ k: AB, v: AC, id: AD })
            }
            return this
        }, rander: function () {
            var AE = [];
            var AB = this.arr;
            for (var AC = 0; AC < AB.length; AC++) {
                var AD = "";
                if (typeof AB[AC]["id"] != "undefined") {
                    AD = 'id="' + AB[AC]["id"] + '"'
                }
                AE.push('<input type="hidden" name="' + AB[AC]["k"] + '" value="' + AB[AC]["v"] + '" ' + AD + ">")
            }
            if (AE.length) {
                z.innerHTML += AE.join("")
            }
            return this
        } 
        };
        if (w.secKillDO && w.secKillDO.timeKillKeyName && typeof w.secKillDO.timeKillKey != "undefined") {
            if (B.isSpu || (i.itemDO.isOnline && (i.itemDO.isSecondKillFromPC || i.itemDO.isSecondKillFromPCAndWap || (i.detail.timeKillAuction && w.userInfoDO.loginUserType)))) {
                S.set(w.secKillDO.timeKillKeyName, w.secKillDO.timeKillKey)
            }
        }
        if (w.gatewayDO.trade) {
            for (var v in w.gatewayDO.trade.addToBuyNow) {
                S.set(v, w.gatewayDO.trade.addToBuyNow[v])
            }
            delete w.gatewayDO.trade.addToBuyNow
        }
        var y = i.itemDO.quantity || "", x;
        if (w.itemPriceResultDO.promType == 1 && (x = A.getCurrentPromotion()) && x.amountRestriction && x.amountRestriction < y) {
            y = x.amountRestriction
        }
        S.set("allow_quantity", y);
        S.set("quantity", 1, "quantity");
        S.set("skuId", "", "skuId");
        S.set("skuInfo", "", "skuInfo");
        if (w.itemPriceResultDO.promType == 1) {
            S.set("key", T("key"))
        }
        if (!B.isSpu) {
            S.set("activity", T("activity"));
            var AA = T("buytraceid");
            if (AA) {
                S.set("buytraceid", AA)
            }
        }
        S.set("bankfrom", T("bankfrom"));
        S.set("destination", i.destination);
        if (i.tradeType == 1) {
            S.set("item_url_refer", J.referrer || "OTHER")
        }
        S.set("buyer_from", B.isSpu ? "spu" : T("buyer_from"));
        S.set("item_id_num", i.itemDO.itemId);
        S.set("item_id", i.itemDO.itemId);
        S.set("auction_id", i.itemDO.itemId);
        S.set("seller_rank", "0");
        S.set("seller_rate_sum", "0");
        S.set("is_orginal", "no");
        S.set("point_price", "false");
        S.set("secure_pay", "true");
        S.set("pay_method", "\u6b3e\u5230\u53d1\u8d27");
        S.set("from", "item_detail");
        S.set("buy_now", i.itemDO.reservePrice);
        S.set("current_price", i.itemDO.reservePrice);
        S.set("auction_type", i.itemDO.auctionType);
        S.set("seller_num_id", i.itemDO.userId);
        if (!B.isSpu) {
            S.set("activity", "");
            S.set("chargeTypeId", "", "J_ChargeTypeId")
        }
        S.set("_tb_token_", "", "J_TokenField");
        S.rander();
        H.mods.Token.onInited(function () {
            z._tb_token_.value = i.valToken
        })
    }
    function Y() {
        var S = function (T) {
            return J.getElementById(T)
        };
        i = I.mix(i || {}, { strPrice: S("J_StrPrice"), emStock: S("J_EmStock"), linkBuy: S("J_LinkBuy"), dlChoice: S("J_DlChoice"), frmBid: S("J_FrmBid"), valItemInfo: {}, linkAdd: S("J_LinkAdd"), apiAddCart: G, valCartInfo: {}, linkBasket: S("J_LinkBasket"), divDetail: S("detail").parentNode, valExpanded: false, destination: "330100", emPoint: S("J_EmPoint"), valPointRate: 0, emPointsBuy: S("J_EmPointsBuy"), apiBidCount: G, valLoginUrl: G, valLoginIndicator: G, isDaily: (B.assetsHost.indexOf("taobao.net") != -1), isHouseholdService: 0, varPromotionId: 0, limited: null, valMode: 0 }, false);
        i.valCartInfo.ct = D.get("t");
        i.valCartInfo.statsUrl += "&userid=" + D.get("cookie17");
        if (null !== i.dlChoice) {
            i.valMode += 1;
            i.elmProps = I.query(".J_TSaleProp", "#detail");
            i.divKeyProp = a.parent(i.dlChoice, ".tb-key");
            if (i.elmProps.length == 0) {
                i.valMode -= 1
            }
        } else {
            if (i.isMeiz) {
                if (I.get("#J_MeizTry")) {
                    i.divKeyProp = a.parent("#J_MeizTry", ".tb-key")
                }
            }
        }
        if (i.linkAdd && G !== i.valCartInfo.itemId) {
            i.valMode += 2
        }
        if (null !== i.emPoint && 0 !== i.valPointRate) {
            i.valMode += 512
        }
        i.isLoadDealRecord = true;
        i.isLimitProm = false;
        i.isSupportCity = true;
        H.mods.Token.init()
    }
    H.mods.Token = { counter: 0, init: function () {
        var S = i.isDaily ? "daily.taobao.net" : "tmall.com";
        var T = "http://www." + (i.isDaily ? "daily.tmall.net" : "tmall.com") + "/go/rgn/tmall/t.php?t=20121104";
        var v = a.create('<iframe style="display:none" width="0" onload="TShop.mods.Token.getIfrToken(this)" height="0" src="' + T + '"></iframe>');
        J.domain = J.domain.split(".").slice(-2).join(".");
        k.insertBefore(v, k.firstChild)
    }, onInited: function (S) {
        if (I.isFunction(S)) {
            if (this.inited) {
                S()
            } else {
                H.on("tokenInited", S)
            }
        }
    }, getIfrToken: function (z) {
        var y = null;
        var T = this;
        var S = function () {
            if (y) {
                clearTimeout(y)
            }
            i.valToken = z.contentWindow.getToken();
            I.log("TMLOG::tbtoken inited =" + i.valToken, "info");
            T.inited = true;
            H.fire("tokenInited")
        };
        try {
            var v = z.contentWindow.getToken();
            S()
        } catch (x) {
            T.counter++;
            if (T.counter < 10) {
                var w = arguments.callee;
                y = setTimeout(function () {
                    w.apply(T, [z])
                }, 50)
            } else {
                H.fire("tokenInited");
                I.sendErr("getToken", { t: i.valCartInfo.ct });
                I.log("tokenInited error:" + x.description, "error")
            }
        }
    } 
    };
    A.init = function (T) {
        i = T;
        Y();
        O();
        h.on(N, function (v) {
            Q(v)
        });
        l();
        I.ready(function (v) {
            A.Promotion.init();
            H.use("malldetail/sku/stat", function (x, w) {
                w.init()
            })
        });
        var S = a.get("#J_Stars");
        if (S) {
            o.onReviewCount(function (v) {
                var x = v.gradeAvg, w = x.split(".").join("d");
                S.innerHTML = '<p><span class="c-value-no c-value-' + w + '"><em>' + x + "</em></span>" + x + '\u5206<span>(<a href="#" id="J_MallReviewTabTrigger">\u7d2f\u8ba1\u8bc4\u4ef7<em>' + v.rateTotal + "</em></a>)</span></p>";
                a.show("#J_ItemRates");
                I.later(function () {
                    if (i.onReviewClick) {
                        j.on("#J_MallReviewTabTrigger", "click", function (y) {
                            y.preventDefault();
                            i.onReviewClick();
                            I.sendAtpanel("tmalldetail.12.1")
                        })
                    }
                }, 25)
            })
        }
        if (!B.offlineShop) {
            n._poc.push(["_trackCustom", "tpl", "S13"])
        }
    };
    A.Setup = { config: function () {
        return H.cfg.apply(this, arguments)
    } 
    }
}, { requires: ["cookie", "malldetail/common/util", "malldetail/data/data", "malldetail/sku/util", "malldetail/sku/fastlogin", "malldetail/sku/buylink", "malldetail/sku/thumbViewer", "malldetail/sku/skuFeatureIcon", "malldetail/sku/sellCount", "malldetail/sku/skuLade", "malldetail/sku/paymethods", "malldetail/sku/skuTmVip", "malldetail/sku/skuAmount", "malldetail/sku/editEntry", "malldetail/sku/freight", "malldetail/sku/stock", "malldetail/sku/basketAnim", "malldetail/sku/shiptime", "malldetail/sku/linkbasket", "malldetail/sku/popupsimulate", "malldetail/sku/promotion", "malldetail/sku/ifclocation", "malldetail/sku/common", "malldetail/sku/propertyHandler", "malldetail/sku/3c", "malldetail/sku/areaSell", "malldetail/sku/price", "malldetail/sku/service", "malldetail/sku/stat", "malldetail/sku/double11"] }); /*pub-1|2013-02-28 21:14:22*/
