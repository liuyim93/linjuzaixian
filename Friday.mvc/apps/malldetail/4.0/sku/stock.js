KISSY.add("malldetail/sku/stock", function (_kissy_E, _template, _malldetail_sku_skuMsg) {
    var _mods_SKU = _kissy_E.mods.SKU;
    var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event;
    var _emStock;
    var H, M = true, G = true, L;
    var R, A = false;
    var _cfg;
    var Q;
    var _errMsg_map = { "1": { errMsg: "此商品暂时缺货" }, "2": { stock: "库存充足", errMsg: "此区域暂时缺货，请查看其他区域" }, "3": { stock: 0, errMsg: "有人还未付款，若15分钟后仍未付款，您将有购买机会"} };
    function _set_valStock_value(_stock_value) {
        _kissy_E.cfg("valStock", _stock_value)
    }
    function _rander(d, a) {
        var _render_type = (typeof d) == "number" ? "default" : "diy";
        var a = a || "";
        var _render_type_template = { "default": "(库存{{str}}件)", diy: '<span class="{{className}}">{{str}}</span>' };
        var _meta = { str: d, className: a };
        var _stock_snippet = _template(_render_type_template[_render_type]).render(_meta);
        if (!_kissy.isUndefined(L) && _kissy_E.cfg("valStock") > L) {
            _kissy_E.cfg("limited", L);
            if (L > 0) {
                _stock_snippet = _stock_snippet.replace(")", ",限购" + L + "件)");
                _stock_snippet = _stock_snippet.replace("库存充足", "(库存充足" + L + "件)")
            }
        }
        _emStock.innerHTML = _stock_snippet
    }
    function P(_icTotalQuantity, _valItemInfo_type) {
        if (!_emStock) {
            return
        }
        if (_valItemInfo_type == 3) {
            if (!R) {
                var T = _dom.parent(_cfg.linkBuy, 2);
                R = _dom.create('<span class="ui-btn-l-primary ui-btn-disable">还有机会</span>');
                _dom.append(R, T)
            }
            if (!A) {
                _mods_SKU.LinkBuy.statu("chaoMai", "hide");
                _mods_SKU.LinkBasket.statu("chaoMai", "hide");
                _mods_SKU.LinkAdd.statu("chaoMai", "hide");
                _dom.show(R)
            }
            A = true
        } else {
            if (A) {
                _dom.hide(R);
                _mods_SKU.LinkBuy.statu("chaoMai", "show");
                _mods_SKU.LinkBasket.statu("chaoMai", "show");
                _mods_SKU.LinkAdd.statu("chaoMai", "show")
            }
            A = false
        }
        if (_icTotalQuantity == 0) {
            M = false;
            _malldetail_sku_skuMsg.show(_errMsg_map[_valItemInfo_type]["errMsg"], "stop", "stock");
            _dom.hide(_cfg.emStock);
            _mods_SKU.LinkBuy.statu("stock", "disabled");
            _mods_SKU.LinkBasket.statu("stock", "disabled");
            _mods_SKU.LinkAdd.statu("stock", "hide")
        } else {
            M = true;
            _malldetail_sku_skuMsg.hide("stock");
            _dom.show(_cfg.emStock);
            _mods_SKU.LinkBuy.statu("stock", "enabled");
            _mods_SKU.LinkBasket.statu("stock", "enabled");
            _mods_SKU.LinkAdd.statu("stock", "show");
            if (_valItemInfo_type == 2 && G) {
                _rander(_icTotalQuantity)
            }
        }
        if (_valItemInfo_type > 0 && (_valItemInfo_type != 2 || !G)) {
            if (typeof _errMsg_map[_valItemInfo_type]["stock"] != "undefined") {
                _rander(_errMsg_map[_valItemInfo_type]["stock"])
            } else {
                _rander(_icTotalQuantity)
            }
        }
    }
    function X() {
        var _icTotalQuantity;
        var _selectSkuId = _mods_SKU.selectSkuId;
        var _valItemInfo_type = _get_valItemInfo_type();
        if (_selectSkuId) {
            var a = H.skuQuantity[_selectSkuId];
            if (a) {
                _icTotalQuantity = a.quantity;
                _set_valStock_value(_icTotalQuantity);
                P(_icTotalQuantity, _valItemInfo_type)
            }
        } else {
            _icTotalQuantity = H.icTotalQuantity;
            _set_valStock_value(_icTotalQuantity);
            P(_icTotalQuantity, _valItemInfo_type)
        }
        _kissy.use("malldetail/sku/price", function (_kissy_d, _malldetail_sku_price) {
            _malldetail_sku_price.limitBuy()
        })
    }
    function _get_valItemInfo_type() {
        var _type;
        var _selectSkuId = _mods_SKU.selectSkuId;
        if (_selectSkuId) {
            var _skuQuantity = _cfg.valItemInfo.skuQuantity;
            if (_skuQuantity[_selectSkuId]) {
                _type = _skuQuantity[_selectSkuId]["type"]
            }
        } else {
            _type = _cfg.valItemInfo["type"]
        }
        if (typeof _type == "undefined") {
            _type = 0
        }
        return _type
    }
    function _getStockStatus() {
        if (!_cfg) {
            _cfg = _kissy_E.cfg()
        }
        if (!M) {
            var S = _get_valItemInfo_type();
            _mods_SKU.Msg.show(_errMsg_map[S]["errMsg"], "stop", "stock");
            _dom.hide(_cfg.emStock);
            _mods_SKU.LinkBuy.statu("stock", "disabled");
            _mods_SKU.LinkBasket.statu("stock", "disabled");
            _mods_SKU.LinkAdd.statu("stock", "hide")
        }
        return M
    }
    function _init(_defaultModel) {
        var _inventoryDO = _defaultModel.inventoryDO, _soldAreaDO = _defaultModel.soldAreaDO, _currentPromotion = _mods_SKU.getCurrentPromotion();
        if (_currentPromotion) {
            _inventoryDO = _inventoryDO ? _inventoryDO : {}
        }
        if (typeof _inventoryDO == "undefined") {
            H = {};
            return
        }
        _inventoryDO.skuQuantity = _inventoryDO.skuQuantity || {};
        _cfg = _kissy_E.cfg();
        _kissy.each(_cfg.valItemInfo.skuMap, function (_skuMap_item) {
            if (_inventoryDO.skuQuantity[_skuMap_item.skuId]) {
                _skuMap_item.stock = _inventoryDO.skuQuantity[_skuMap_item.skuId].quantity
            }
        });
        _emStock = _cfg.emStock;
        H = _inventoryDO;
        if (!Q) {
            G = _soldAreaDO ? _soldAreaDO.allAreaSold : true;
            if (_currentPromotion && _currentPromotion.amountRestriction) {
                L = _currentPromotion.amountRestriction
            }
        }
        X();
        if (!Q) {
            Q = 1;
            _mods_SKU.PropertyHandler.onSkuChange(function () {
                var c = _mods_SKU.selectSkuId;
                if (c && _cfg.isSupportCity) {
                    X()
                }
            })
        }
    }
    return { init: _init, getStockStatus: _getStockStatus, rander: _rander }
}, { requires: ["template", "malldetail/sku/skuMsg"] }); /*pub-1|2013-01-06 16:13:19*/