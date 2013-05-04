
KISSY.add("malldetail/sku/3c", function (_kissy_F, _malldetail_sku_areaSelector, _malldetail_sku_freight, _malldetail_sku_stock, _malldetail_sku_skuMsg) {
    var _kissy = KISSY, _dom_A = KISSY.DOM, _dom_M = KISSY.DOM, _event = KISSY.Event, _ua = _kissy.UA, _mods_SKU = _kissy_F.mods.SKU, _document = document, _body = _document.body;
    _mods_SKU.L2Selector = { selector: null, init: function () {
        var _l2selector = this;
        var _cfg = _kissy_F.cfg();
        this.selector = new _malldetail_sku_areaSelector({ node: _kissy.get("#J_dqPostAgeCont"), selectCity: _cfg.destination })
    } 
    };
    _mods_SKU.dqCity = function () {
        var _cfg, X, U = true;
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
            if (!_cfg) {
                _cfg = _kissy_F.cfg()
            }
            _dom_M.show(_cfg.emStock);
            _mods_SKU.LinkBuy.statu("areaSold", "enabled");
            _mods_SKU.LinkBasket.statu("areaSold", "enabled");
            _mods_SKU.LinkAdd.statu("areaSold", "show")
        }, notSell: function () {
            if (!_cfg) {
                _cfg = _kissy_F.cfg()
            }
            _malldetail_sku_freight.renderNoSell('<span class="error">此区域不销售，请查看其他区域</span>');
            _dom_M.hide(_cfg.emStock);
            _malldetail_sku_skuMsg.hide();
            _mods_SKU.LinkBuy.statu("areaSold", "disabled");
            _mods_SKU.LinkBasket.statu("areaSold", "disabled");
            _mods_SKU.LinkAdd.statu("areaSold", "hide")
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
            _kissy.all("#J_regionSellServer li").each(function () {
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
            var d = _mods_SKU.selectSkuId;
            var c = true;
            if (!_mods_SKU.Price.getAreaSold(d)) {
                return false
            }
            if (X && !W && !R) {
                if (!Q.checkAreaSell()) {
                    return false
                }
            }
            if (!_malldetail_sku_stock.getStockStatus()) {
                return false
            }
            return c
        };
        var b = function () {
            if (!V) {
                return true
            }
            var d = _mods_SKU.selectSkuId;
            var c = _kissy.one("#J_IptAmount").val();
            var f = [a, c, d];
            if (P) {
                var g = Z();
                var e = [];
                _kissy.each(g, function (i, h) {
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
            _cfg = _kissy_F.cfg();
            X = _cfg.isAreaSell;
            a = _cfg.itemDO.itemId;
            P = _cfg.isService;
            V = _cfg.frmBid;
            O = _mods_SKU.L2Selector.selector;
            Q.init(c);
            O.onSelectBlackCityCallBack(function () {
                _malldetail_sku_freight.renderNoSell('<span class="error">此区域不销售，请查看其他区域</span>');
                _dom_M.hide(_cfg.emStock);
                _malldetail_sku_skuMsg.hide();
                _mods_SKU.LinkBuy.statu("areaSold", "disabled");
                _mods_SKU.LinkBasket.statu("areaSold", "disabled");
                _mods_SKU.LinkAdd.statu("areaSold", "hide");
                O.close();
                _cfg.isSupportCity = false
            });
            O.onCityChange(function () {
                if (!_cfg.isDoule11) {
                    _malldetail_sku_freight.renderNoSell("")
                }
                _mods_SKU.LinkBuy.statu("areaSold", "enabled");
                _mods_SKU.LinkBasket.statu("areaSold", "enabled");
                _mods_SKU.LinkAdd.statu("areaSold", "show");
                O.close();
                _cfg.isSupportCity = true;
                var d = { areaId: O.selectCity };
                _mods_SKU.changeLocation(d)
            })
        } 
        }
    } ()
}, { requires: ["malldetail/sku/areaSeletor", "malldetail/sku/freight", "malldetail/sku/stock", "malldetail/sku/skuMsg"] }); /*pub-1|2013-01-06 16:13:21*/
