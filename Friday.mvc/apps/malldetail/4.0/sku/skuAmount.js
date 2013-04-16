KISSY.add("malldetail/sku/skuAmount", function (_kissy_imp, _malldetail_sku_validator) {
    var _mods_SKU = _kissy_imp.mods.SKU;
    var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event;
    var _eventTarget = _kissy.merge({}, _kissy.EventTarget);
    var _str_onbind = "onbind", _str_onchange = "onchange";
    var O = this;
    var _value_combo = { value: 1, oldValue: 1 };
    var _cfg;
    function L(R) {
        var Q = _kissy_imp.cfg("iptAmount");
        var S = Q.value;
        var T = parseInt(S, 10) || 1;
        switch (R) {
            case "decrease":
                _kissy_imp.sendAtpanel("tmalldetail.13.8");
                T = T == 1 ? 1 : T - 1;
                break;
            case "increase":
                _kissy_imp.sendAtpanel("tmalldetail.13.7");
                T = T + 1;
                break
        }
        G(T)
    }
    function N() {
        var Q = _kissy.get("#J_Amount"), R;
        var T;
        var S = _dom.hasClass(Q, "tm-hideAmount");
        _kissy_imp.cfg("hideAmount", S);
        if (Q) {
            R = '<span class="tb-amount-widget" id="J_AmountWidget"><input id="J_IptAmount" type="text" class="tb-text" value="1" maxlength="8" title="\u8bf7\u8f93\u5165\u8d2d\u4e70\u91cf"/><span class="increase"></span><span class="decrease"></span></span>';
            if (!S) {
                R += "\u4ef6"
            }
            _dom.insertBefore(_dom.create(R), _cfg.emStock);
            if (S) {
                _dom.remove(_cfg.emStock)
            }
            _event.on("#J_AmountWidget", "click", function (V) {
                var U = V.target;
                L(U.className)
            });
            _eventTarget.fire(_str_onbind, {});
            _event.on("#J_IptAmount", "blur", function (U) {
                G(U.target.value)
            });
            _kissy_imp.cfg("iptAmount", _kissy.get("#J_IptAmount"))
        }
    }
    function G(Q) {
        if (Q != _value_combo.value) {
            var R = _kissy_imp.cfg("iptAmount");
            _value_combo.oldValue = _value_combo.value;
            _value_combo.value = R.value = Q;
            _eventTarget.fire(_str_onchange, { value: _value_combo.value, oldValue: _value_combo.oldValue })
        }
    }
    function A(_itemPriceResultDO) {
        var _dom_dd_J_Amount = _kissy.get("#J_Amount");
        var T;
        var W;
        var V = function () {
            _event.remove("#J_AmountWidget", "click");
            _event.remove("#J_IptAmount", "blur");
            _dom_dd_J_Amount.innerHTML = "";
            var X = _dom.create('<em id="J_EmStock">' + _kissy_imp.cfg("emStock").innerHTML + "</em>");
            _dom.append(X, _dom_dd_J_Amount);
            _kissy_imp.cfg("emStock", X)
        };
        if (_dom_dd_J_Amount) {
            if (_itemPriceResultDO && !_itemPriceResultDO.promType && _cfg.itemDO.isEcardAuction && _cfg.detail.quantityList && _cfg.detail.quantityList.length > 0) {
                V();
                T = '<select id="J_IptAmount">';
                var Q = _cfg.detail.quantityList;
                for (var R = 0; R < Q.length; R++) {
                    T += '<option value="' + Q[R] + '">' + Q[R] + "</option>"
                }
                T += "</select>";
                _value_combo.value = Q[0];
                _value_combo.oldValue = Q[0];
                _dom.insertBefore(_dom.create(T), _cfg.emStock);
                _event.on("#J_IptAmount", "blur", function (X) {
                    G(X.target.value)
                });
                _kissy_imp.cfg("iptAmount", _kissy.get("#J_IptAmount"))
            }
            _eventTarget.on(_str_onchange, function () {
                if (W) {
                    clearTimeout(W)
                }
                W = setTimeout(function () {
                    if (_malldetail_sku_validator.run()) {
                        _mods_SKU.PopupSimulate.checkActs()
                    }
                }, 1000)
            })
        }
    }
    _kissy.mix(_value_combo, { init: function (_itemPriceResultDO) {
        _itemPriceResultDO = _itemPriceResultDO || null;
        _cfg = _kissy_imp.cfg();
        if (!_itemPriceResultDO) {
            N()
        } else {
            A(_itemPriceResultDO)
        }
    }, onBind: function (Q) {
        _eventTarget.on(_str_onbind, Q)
    }, setValue: function (Q) {
        G(Q)
    }, onChange: function (Q) {
        _eventTarget.on(_str_onchange, Q)
    } 
    });
    return _value_combo
}, { requires: ["malldetail/sku/validator"] }); /*pub-1|2013-02-28 21:14:22*/