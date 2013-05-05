
KISSY.add("malldetail/sku/3c", function (_kissy_F, _malldetail_sku_areaSelector, _malldetail_sku_freight, _malldetail_sku_stock, _malldetail_sku_skuMsg) {
    var _kissy = KISSY, _dom_A = KISSY.DOM, _dom_M = KISSY.DOM, _event = KISSY.Event, _ua = _kissy.UA, _mods_SKU = _kissy_F.mods.SKU, _document = document, _body = _document.body;
    _mods_SKU.L2Selector = { selector: null, init: function () {
        var _l2selector = this;
        var _cfg = _kissy_F.cfg();
        this.selector = new _malldetail_sku_areaSelector({ node: _kissy.get("#J_dqPostAgeCont"), selectCity: _cfg.destination })
    } 
    };
    _mods_SKU.dqCity = function () {
        var _cfg, _isAreaSell, U = true;
        var R;
        var _itemId;
        var _isService;
        var _L2Selector_selector;
        var W;
        var _frmBid;
        var _dqCity_core = { areaList: [], area: {}, skuList: {}, price: 0, SkuChange: false, init: function (g) {
            if (_isAreaSell) {
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
                            c.push(_L2Selector_selector.getFatherAndChildren(d[e]))
                        }
                        _L2Selector_selector.setWhite(c);
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
            var _selected_city = _get_selected_city();
            if (_selected_city != 0) {
                for (var c = 0; c < e.areaList.length; c++) {
                    if (_selected_city == e.areaList[c]) {
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
        var _get_selected_city = function () {
            return _L2Selector_selector.selectCity
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
        var _create_or_update_frmBid_item_value = function (_frmBid, _name, _value) {
            if (_frmBid[_name]) {
                _frmBid[_name].value = _value
            } else {
                _frmBid.innerHTML += '<input type="hidden" name="' + _name + '" value="' + _value + '">'
            }
        };
        var D = function () {
            var _selectSkuId = _mods_SKU.selectSkuId;
            var c = true;
            if (!_mods_SKU.Price.getAreaSold(_selectSkuId)) {
                return false
            }
            if (_isAreaSell && !W && !R) {
                if (!_dqCity_core.checkAreaSell()) {
                    return false
                }
            }
            if (!_malldetail_sku_stock.getStockStatus()) {
                return false
            }
            return c
        };
        var _getOrder = function () {
            if (!_frmBid) {
                return true
            }
            var _selectSkuId = _mods_SKU.selectSkuId;
            var _amount = _kissy.one("#J_IptAmount").val();
            var _buy_param_array = [_itemId, _amount, _selectSkuId];
            if (_isService) {
                var g = Z();
                var e = [];
                _kissy.each(g, function (i, h) {
                    e.push(h + "|" + i)
                });
                if (e.length > 0) {
                    _buy_param_array.push(e.join("-"))
                }
            }
            _create_or_update_frmBid_item_value(_frmBid, "buyer_from", "ecity");
            _create_or_update_frmBid_item_value(_frmBid, "use_cod", "false");
            _create_or_update_frmBid_item_value(_frmBid, "buy_param", _buy_param_array.join("_"));
            _create_or_update_frmBid_item_value(_frmBid, "_input_charset", "UTF-8");
            if (_get_selected_city() != 0) {
                _create_or_update_frmBid_item_value(_frmBid, "destination", _get_selected_city())
            }
            return D()
        };
        return { getFirstAreaSold: function () {
            return U
        }, notSell: function () {
            return _dqCity_core.notSell()
        }, sell: function () {
            return _dqCity_core.sell()
        }, getOrder: function () {
            return _getOrder()
        }, init: function (c) {
            _cfg = _kissy_F.cfg();
            _isAreaSell = _cfg.isAreaSell;
            _itemId = _cfg.itemDO.itemId;
            _isService = _cfg.isService;
            _frmBid = _cfg.frmBid;
            _L2Selector_selector = _mods_SKU.L2Selector.selector;
            _dqCity_core.init(c);
            _L2Selector_selector.onSelectBlackCityCallBack(function () {
                _malldetail_sku_freight.renderNoSell('<span class="error">此区域不销售，请查看其他区域</span>');
                _dom_M.hide(_cfg.emStock);
                _malldetail_sku_skuMsg.hide();
                _mods_SKU.LinkBuy.statu("areaSold", "disabled");
                _mods_SKU.LinkBasket.statu("areaSold", "disabled");
                _mods_SKU.LinkAdd.statu("areaSold", "hide");
                _L2Selector_selector.close();
                _cfg.isSupportCity = false
            });
            _L2Selector_selector.onCityChange(function () {
                if (!_cfg.isDoule11) {
                    _malldetail_sku_freight.renderNoSell("")
                }
                _mods_SKU.LinkBuy.statu("areaSold", "enabled");
                _mods_SKU.LinkBasket.statu("areaSold", "enabled");
                _mods_SKU.LinkAdd.statu("areaSold", "show");
                _L2Selector_selector.close();
                _cfg.isSupportCity = true;
                var _areaid = { areaId: _L2Selector_selector.selectCity };
                _mods_SKU.changeLocation(_areaid)
            })
        } 
        }
    } ()
}, { requires: ["malldetail/sku/areaSeletor", "malldetail/sku/freight", "malldetail/sku/stock", "malldetail/sku/skuMsg"] }); /*pub-1|2013-01-06 16:13:21*/
