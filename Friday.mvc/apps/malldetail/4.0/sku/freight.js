KISSY.add("malldetail/sku/freight", function (_kissy_B, _template) {
    var _mods_SKU = _kissy_B.mods.SKU, _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event;
    var _dom_id_info, _deliveryDO_t, _selectSkuId_t, _set_info_html_fn, C, _template_snippet_t, F, _cfg, O, P,
        _prescription_template = '<p><i class="i-prescription"></i>{{#if name}}<span class="tb-label">{{name}}</span>{{/if}}{{#if money}}<em>&yen;{{money}}元</em> {{/if}}{{#if signText}}<b>{{signText}}</b>{{/if}}</p>',
        _signText_template = "{{#if name}}{{name}}: {{/if}}{{#if money}}{{money}}\u5143 {{/if}}{{#if signText}}<b>({{signText}})</b>{{/if}}",
        _postage_template = "<span>{{postage}}</span>";
    var _document = document, _body = _document.body;
    function _calculate_freight() {
        if (!_deliveryDO_t || !_deliveryDO_t.deliverySkuMap) {
            return
        }
        var _deliverySkuMap = _deliveryDO_t.deliverySkuMap;
        var _template_snippet = "";
        var _selected_template = _postage_template, _deliverySku;
        _selectSkuId_t = _mods_SKU.selectSkuId;
        var S = _selectSkuId_t && _deliverySkuMap[_selectSkuId_t] ? _selectSkuId_t : "default";
        _deliverySku = _deliverySkuMap[S];
        if (typeof _deliverySku == "undefined") {
            for (var _selectSkuId_t in _deliverySkuMap) {
                if (typeof _deliverySkuMap[_selectSkuId_t] == "object") {
                    _deliverySku = _deliverySkuMap[_selectSkuId_t];
                    break
                }
            }
        }
        if (_deliverySku) {
            var _type = _deliverySku[0] ? _deliverySku[0]["type"] : _deliverySku.type;
            _type == 1 && (_selected_template = _prescription_template);
            if (_deliverySku.length) {
                _kissy.each(_deliverySku, function (_deliverySku_item) {
                    _template_snippet += _template(_selected_template).render(_deliverySku_item)
                })
            } else {
                _template_snippet += _template(_selected_template).render(_deliverySku)
            }
        }
        _render_freight(_template_snippet)
    }
    function _render() {
        if (!P) {
            P = 1;
            if (!_mods_SKU.dqCity.getFirstAreaSold() || !_mods_SKU.areaSell.getFirstAreaSold()) {
                _mods_SKU.dqCity.notSell();
                return false
            }
        }
        if (!_mods_SKU.Price.getAreaSold(_mods_SKU.selectSkuId)) {
            _mods_SKU.dqCity.notSell()
        } else {
            if (_mods_SKU.Service.getHouseService()) {
                _render_freight("")
            } else {
                _calculate_freight()
            }
            _mods_SKU.dqCity.sell()
        }
    }
    function _render_freight(_template_snippet, S) {
        if (_dom_id_info) {
            if (S) {
                C = _template_snippet
            }
            _template_snippet_t = C || _template_snippet;
            if (_set_info_html_fn) {
                clearTimeout(_set_info_html_fn)
            }
            _set_info_html_fn = setTimeout(function () {
                _dom_id_info.html(_template_snippet_t);
                C = null;
                _template_snippet_t = null;
                _set_info_html_fn = null
            }, 100)
        }
    }
    function J() {
        var _dom_id_J_dqPostAgeCont = _kissy.one("#J_dqPostAgeCont");
        if (_dom_id_J_dqPostAgeCont) {
            var _dom_id_friInfo = _kissy.one("#friInfo");
            var _dom_id_info = _kissy.one("#info");
            var _dom_class_postAge = _dom_id_J_dqPostAgeCont.parent();
            _dom_id_friInfo.show();
            _dom_id_friInfo.html("确认收货地，以确保在商家销售区域");
            _dom_id_info.hide();
            _dom_class_postAge.addClass(".tb-postLight");
            setTimeout(function () {
                _dom_class_postAge.removeClass(".tb-postLight");
                _dom_id_info.show();
                _dom_id_friInfo.hide();
                _dom_class_postAge = _dom_id_friInfo = _dom_id_info = null
            }, 4000)
        }
    }
    function _init(_deliveryDO) {
        if (typeof _deliveryDO == "undefined") {
            _deliveryDO_t = {};
            return
        }
        _deliveryDO_t = _deliveryDO;
        _cfg = _kissy_B.cfg();
        _selectSkuId_t = _mods_SKU.selectSkuId;
        if (!_dom_id_info) {
            var _dom_id_J_dqPostAgeCont = _kissy.one("#J_dqPostAgeCont") || _kissy.one("#J_TreeSelectTrigger");
            if (_dom_id_J_dqPostAgeCont) {
                var _dom_id_J_PostageToogleCont = _kissy.one("#J_PostageToggleCont");
                _dom_id_J_PostageToogleCont.html("<div id='friInfo'  style='display:none;'></div><div id='info' class='tmallPost'></div>");
                _dom_id_info = _kissy.one("#info")
            } else {
                _dom_id_info = _kissy.one("#info")
            }
        }
        _render();
        if (!O) {
            O = 1;
            _mods_SKU.PropertyHandler.onSkuChange(function () {
                if (_cfg.isSupportCity) {
                    _render()
                }
            });
            if (_dom_id_info) {
                var _dom_span, _dom_span_inner1, _dom_span_inner2;
                var _set_invisible_timeout_fn = null;
                _event.on(_dom_id_info, "mouseenter", function (_e) {
                    var _dom_id_J_Tmpost = _dom.get("#J_Tmpost");
                    if (_dom_id_J_Tmpost) {
                        if (_set_invisible_timeout_fn) {
                            clearTimeout(_set_invisible_timeout_fn)
                        }
                        if (!_dom_span) {
                            _dom_span = _dom.create("<span>");
                            _dom_span.className = "coin-popup";
                            _dom_span.style.cssText = "top:" + (_dom.offset(_dom_id_J_Tmpost).top + 18) + "px;left:" + (_dom.offset(_dom_id_J_Tmpost).left - 24) + "px;display:none";
                            _dom_span_inner1 = _dom.create("<span>");
                            _dom_span_inner1.className = "cor";
                            _dom_span_inner2 = _dom.create("<span>");
                            _dom_span_inner2.className = "con";
                            _dom_span_inner2.innerHTML = '全力为您准时送达~<a href="http://bbs.taobao.com/catalog/thread/567766-257748016.htm" target="_blank">更多物流保障&gt;&gt;</a>';
                            _dom_span.appendChild(_dom_span_inner1);
                            _dom_span.appendChild(_dom_span_inner2);
                            _body.insertBefore(_dom_span, _body.firstChild);
                            _event.on(_dom_span, "mouseenter", function () {
                                if (_set_invisible_timeout_fn) {
                                    clearTimeout(_set_invisible_timeout_fn)
                                }
                                _dom_span.style.display = "inline"
                            });
                            _event.on(_dom_span, "mouseleave", function () {
                                _dom_span.style.display = "none"
                            })
                        }
                        _dom_span.style.display = "inline"
                    }
                });
                _event.on(_dom_id_info, "mouseleave", function () {
                    _set_invisible_timeout_fn = setTimeout(function () {
                        if (_dom_span) {
                            _dom_span.style.display = "none"
                        }
                    }, 100)
                })
            }
        }
        if (!F && _cfg.isAreaSell && _cfg.tradeType == 2) {
            J();
            F = true
        }
    }
    return { init: _init, render: _render, renderNoSell: _render_freight }
}, { requires: ["template"] }); /*pub-1|2013-02-28 21:14:23*/