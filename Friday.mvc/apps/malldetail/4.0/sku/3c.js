
KISSY.add("malldetail/sku/3c", function (F, B, N, I, E) {
    var G = KISSY, A = KISSY.DOM, M = KISSY.DOM, L = KISSY.Event, J = G.UA, C = F.mods.SKU, K = document, H = K.body;
    C.L2Selector = { selector: null, init: function () {
        var O = this;
        var D = F.cfg();
        this.selector = new B({ node: G.get("#J_dqPostAgeCont"), selectCity: D.destination })
    } 
    };
    C.dqCity = function () {
        var S, X, U = true;
        var R;
        var a;
        var P;
        var O;
        var W;
        var V;
        var Q = { areaList: [], area: {}, skuList: {}, price: 0, SkuChange: false, init: function (g) {
            if (X) {
                var f = this;
                if (typeof g == "undefined") {
                    R = true
                }
                if (typeof g != "undefined" && g && typeof g.allAreaSold != "undefined" && typeof g.soldAreas != "undefined") {
                    W = g.allAreaSold;
                    if (!W) {
                        var d = g.soldAreas;
                        var c = d.slice(0);
                        for (var e = 0; e < d.length; e++) {
                            c.push(O.getFatherAndChildren(d[e]))
                        }
                        O.setWhite(c);
                        this.areaList = g.soldAreas;
                        f.checkAreaSell()
                    }
                }
            }
        }, sell: function () {
            if (!S) {
                S = F.cfg()
            }
            M.show(S.emStock);
            C.LinkBuy.statu("areaSold", "enabled");
            C.LinkBasket.statu("areaSold", "enabled");
            C.LinkAdd.statu("areaSold", "show")
        }, notSell: function () {
            if (!S) {
                S = F.cfg()
            }
            N.renderNoSell('<span class="error">\u6b64\u533a\u57df\u4e0d\u9500\u552e\uff0c\u8bf7\u67e5\u770b\u5176\u4ed6\u533a\u57df</span>');
            M.hide(S.emStock);
            E.hide();
            C.LinkBuy.statu("areaSold", "disabled");
            C.LinkBasket.statu("areaSold", "disabled");
            C.LinkAdd.statu("areaSold", "hide")
        }, checkAreaSell: function () {
            var e = this;
            var d = T();
            if (d != 0) {
                for (var c = 0; c < e.areaList.length; c++) {
                    if (d == e.areaList[c]) {
                        e.sell();
                        U = true;
                        return true
                    }
                }
                e.notSell();
                U = false;
                return false
            }
            return true
        } 
        };
        var T = function () {
            return O.selectCity
        };
        var Z = function () {
            var c = {};
            G.all("#J_regionSellServer li").each(function () {
                if (this.hasClass("tb-selected")) {
                    if (this.attr("date-value").split("-").length > 1) {
                        if (typeof c[this.attr("date-value").split("-")[0]] == "undefined") {
                            c[this.attr("date-value").split("-")[0]] = 0
                        }
                        c[this.attr("date-value").split("-")[0]] = this.attr("date-value").split("-")[1]
                    } else {
                        c[this.attr("date-value")] = 0
                    }
                }
            });
            return c
        };
        var Y = function (e, c, d) {
            if (e[c]) {
                e[c].value = d
            } else {
                e.innerHTML += '<input type="hidden" name="' + c + '" value="' + d + '">'
            }
        };
        var D = function () {
            var d = C.selectSkuId;
            var c = true;
            if (!C.Price.getAreaSold(d)) {
                return false
            }
            if (X && !W && !R) {
                if (!Q.checkAreaSell()) {
                    return false
                }
            }
            if (!I.getStockStatus()) {
                return false
            }
            return c
        };
        var b = function () {
            if (!V) {
                return true
            }
            var d = C.selectSkuId;
            var c = G.one("#J_IptAmount").val();
            var f = [a, c, d];
            if (P) {
                var g = Z();
                var e = [];
                G.each(g, function (i, h) {
                    e.push(h + "|" + i)
                });
                if (e.length > 0) {
                    f.push(e.join("-"))
                }
            }
            Y(V, "buyer_from", "ecity");
            Y(V, "use_cod", "false");
            Y(V, "buy_param", f.join("_"));
            Y(V, "_input_charset", "UTF-8");
            if (T() != 0) {
                Y(V, "destination", T())
            }
            return D()
        };
        return { getFirstAreaSold: function () {
            return U
        }, notSell: function () {
            return Q.notSell()
        }, sell: function () {
            return Q.sell()
        }, getOrder: function () {
            return b()
        }, init: function (c) {
            S = F.cfg();
            X = S.isAreaSell;
            a = S.itemDO.itemId;
            P = S.isService;
            V = S.frmBid;
            O = C.L2Selector.selector;
            Q.init(c);
            O.onSelectBlackCityCallBack(function () {
                N.renderNoSell('<span class="error">\u6b64\u533a\u57df\u4e0d\u9500\u552e\uff0c\u8bf7\u67e5\u770b\u5176\u4ed6\u533a\u57df</span>');
                M.hide(S.emStock);
                E.hide();
                C.LinkBuy.statu("areaSold", "disabled");
                C.LinkBasket.statu("areaSold", "disabled");
                C.LinkAdd.statu("areaSold", "hide");
                O.close();
                S.isSupportCity = false
            });
            O.onCityChange(function () {
                if (!S.isDoule11) {
                    N.renderNoSell("")
                }
                C.LinkBuy.statu("areaSold", "enabled");
                C.LinkBasket.statu("areaSold", "enabled");
                C.LinkAdd.statu("areaSold", "show");
                O.close();
                S.isSupportCity = true;
                var d = { areaId: O.selectCity };
                C.changeLocation(d)
            })
        } 
        }
    } ()
}, { requires: ["malldetail/sku/areaSeletor", "malldetail/sku/freight", "malldetail/sku/stock", "malldetail/sku/skuMsg"] }); /*pub-1|2013-01-06 16:13:21*/
