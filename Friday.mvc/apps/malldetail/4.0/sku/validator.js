KISSY.add("malldetail/sku/validator", function (_kissy_C, _malldetail_sku_skuMsg) {
    var _mods_SKU = _kissy_C.mods.SKU, _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, R = "";
    var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _STR_empty = "";
    var _cfg, O, F, H = 200;
    var M = function (S) {
        if (S) {
            var T = _dom.get("#J_Select_region");
            if (T && (T.value == null || T.value == _STR_empty)) {
                alert("请选择商品兑换地!");
                return false
            }
        }
        return true
    };
    function I() {
        if ((g_config.isEC || g_config.offlineShop) && !_cfg.isHouseholdService) {
            if (!_mods_SKU.dqCity.getOrder()) {
                return false
            }
        }
        return true
    }
    var A = function (_needValidate) {
        return I() && M(_needValidate)
    };
    var _validate_limit_buy = function () {
        var _show_msg = _STR_empty;
        var _valStock = _cfg.valStock;
        var _iptAmount = parseInt(_cfg.iptAmount.value, 10);
        var _limited = _cfg.limited;
        var _iptAmount_data_type = _kissy.trim(_dom.attr(_cfg.iptAmount, "data-type"));
        var _is_limitProm = _cfg.isLimitProm;
        var _inventoryType = _mods_SKU.inventoryType ? _mods_SKU.inventoryType : _cfg.valItemInfo.type;
        if (_limited != null && _valStock > _limited) {
            if (_limited < _iptAmount) {
                _show_msg = "每人限购" + _limited + "件"
            }
        }
        switch (true) {
            case false === /^\d+$/.test(_cfg.iptAmount.value) || 0 >= _iptAmount:
                _show_msg = "请填写正确的商品数量！";
                break;
            case (_valStock < _iptAmount) && _inventoryType != 3:
                _show_msg = _iptAmount_data_type === "ju" ? ("聚划算特价商品,每人限购" + _valStock + "件") : (_is_limitProm ? "您所填写的商品数量超过限购数量！" : "您所填写的商品数量超过库存！");
                break
        }
        if (_STR_empty !== _show_msg) {
            _malldetail_sku_skuMsg.show(_show_msg);
            return false
        } else {
            _malldetail_sku_skuMsg.hide();
            return true
        }
    };
    var K = function (S) {
        if (_cfg.valMode & 1) {
            K = function (T) {
                return G(T) && A(T)
            }
        } else {
            if (null !== _cfg.iptAmount) {
                K = function (T) {
                    var U = A(T);
                    if (!U) {
                        return false
                    }
                    return _validate_limit_buy() && _validate_limit_time()
                }
            } else {
                K = function (T) {
                    return A(T)
                }
            }
        }
        return K(S)
    };
    var G = function (_needValidate) {
        _needValidate = _needValidate || false;
        var _elmProps_length = _cfg.elmProps.length;
        var _selected_prop_and_value_array = [], _unselected_prop_array = [], _index;
        var _seleProp_array = _mods_SKU.PropertyHandler.getSeleProp();
        var _propData_array = _mods_SKU.PropertyHandler.getPropData();
        for (_index = _elmProps_length - 1; 0 <= _index; _index--) {
            var _seleProp_item = _seleProp_array[_index];
            if (_STR_empty === _seleProp_item.pvid) {
                _dom.addClass(_propData_array[_index].elmt, "tb-h");
                _unselected_prop_array.push(_seleProp_item.prop)
            } else {
                _dom.removeClass(_propData_array[_index].elmt, "tb-h");
                _selected_prop_and_value_array.unshift(_seleProp_item.prop + ":" + _seleProp_item.name)
            }
        }
        var _unselected_prop_array_len = _unselected_prop_array.length;
        if (!_unselected_prop_array_len) {
            _mods_SKU.valSkuInfo = _selected_prop_and_value_array.join(";")
        }
        var _is_limit_buy_validated_success = _validate_limit_buy();
        if (0 < _unselected_prop_array_len || !_is_limit_buy_validated_success) {
            if (true === _needValidate && (0 < _unselected_prop_array_len)) {
                _dom.addClass(_cfg.divKeyProp, "tb-attention")
            }
            return false
        } else {
            return _validate_limit_time() && A(_needValidate)
        }
    };
    function _validate_limit_time() {
        _cfg = _kissy_C.cfg();
        var V = _mods_SKU.getCurrentPromotion();
        if (V && V.limitTime) {
            var U = _STR_empty;
            var S = parseInt(_cfg.iptAmount.value, 10);
            var T = V.amountRestriction || 0;
            if (_kissy_C.cfg("statu") == "-1") {
                alert("活动已经结束，你只能用原价购买了");
                return false
            }
            if (T > 0 && S > T) {
                U = "您所填写的商品数量超过限购数量！"
            }
            if (_STR_empty !== U) {
                _malldetail_sku_skuMsg.show(U);
                return false
            } else {
                _malldetail_sku_skuMsg.hide()
            }
        }
        return true
    }
    return { run: function (S) {
        if (!_cfg && !(_cfg = _kissy_C.cfg())) {
            return
        }
        return K(S)
    } 
    }
}, { requires: ["malldetail/sku/skuMsg"] }); /*pub-1|2013-01-30 22:24:59*/