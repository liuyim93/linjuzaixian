﻿
KISSY.add("malldetail/sku/propertyHandler", function (_kissy_imp, _malldetail_sku_price) {
    var _mods_SKU = _kissy_imp.mods.SKU, _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _ua = _kissy.UA, _document = document, _is_ie = (0 < _ua.ie), _is_ie6 = (6 == _ua.ie), _string_for_empty = "";
    _mods_SKU.PropertyHandler = function () {
        var _cfg = {},
            _prop_array = [],
            _pvid_array = [],
            _defaultSelected = [],
            _elmProps_length = 0,
            _eventTarget = _kissy.merge({}, _kissy.EventTarget),
            _str_skuChange = "skuChange",
            _str_PropertyChange = "PropertyChange", T = [];
        var Y = 0;
        function Z() {
            var e = true, d = T.length;
            for (var f = 0; f < d; f++) {
                if (false === T[f]()) {
                    e = false;
                    break
                }
            }
            return e
        }
        var _filter_by_pvid = function (_pvid_array_t) {
            var _skuMap = _kissy_imp.cfg("valItemInfo").skuMap;
            var _pvid_array_length = _pvid_array_t.length;
            var _skuMap_filtered_by_pvid = [];
            var _pvid_sort_fn = function (_array) {
                _array.sort(function (_x, _y) {
                    _x = parseInt(_x.split(":")[0], 10);
                    _y = parseInt(_y.split(":")[0], 10);
                    return _x - _y || -1
                });
                return _array.length ? _array : ""
            };
            _pvid_array_t = _pvid_sort_fn(_pvid_array_t);
            if (_pvid_array_t.length) {
                var _pvid_array_join_regex = new RegExp(";" + _pvid_array_t.join(";(-?\\d+:-?\\d+;)*") + ";");
                for (var _key in _skuMap) {
                    if (_pvid_array_join_regex.test(_key)) {
                        _skuMap_filtered_by_pvid.push(_key)
                    }
                }
            } else {
                _skuMap_filtered_by_pvid = _skuMap
            }
            return _skuMap_filtered_by_pvid
        };
        var _set_stock_state = function (_dom_li) {
            if (_dom.hasClass(_dom_li, "tb-selected")) {
                _fireEvent(_dom_li)
            }
            _dom.addClass(_dom_li, "tb-out-of-stock")
        };
        var _fireEvent = function (_dom_li) {
            if (!!_document.createEvent) {
                var _htmlEvents = _document.createEvent("HTMLEvents");
                _htmlEvents.initEvent("click", false, true);
                _dom_li.children[0].dispatchEvent(_htmlEvents)
            } else {
                _dom_li.children[0].fireEvent("onclick")
            }
        };
        var _calculate_total_stock = function (_array_filtered_by_pvid) {
            var _totalStock = 0;
            var _is_unlimited_stock = false;
            var _skuMap = _cfg.valItemInfo.skuMap;
            var g;
            var _is_out_of_stock = true;
            for (var _index = 0, _array_length = _array_filtered_by_pvid.length; _index < _array_length; _index++) {
                var _pvid = _array_filtered_by_pvid[_index];
                _totalStock += _skuMap[_pvid].stock;
                if (_skuMap[_pvid]["type"] == 3) {     //2013-04-16 basilwang I think type=3 is unlimited stock
                    _is_unlimited_stock = true
                }
            }
            if (_array_filtered_by_pvid.length && (_totalStock > 0 || _is_unlimited_stock)) {
                _is_out_of_stock = false
            }
            return _is_out_of_stock
        };
        var _dataLink_list = {};
        var Q = function () {
            _elmProps_length = _cfg.elmProps.length;
            var _skuMap = _cfg.valItemInfo.skuMap,
                _strPrice = _cfg.strPrice,
                v = [],
                _hasDefaultSelected = ("undefined" !== typeof _defaultSelected);
            _defaultSelected = _cfg.valItemInfo.defSelected;
            var f = [], h, w;
            for (var _index = _elmProps_length - 1; 0 <= _index; _index--) {
                var _elmProp = _cfg.elmProps[_index],
                    _prop_array_item = _prop_array[_index] = { prop: _string_for_empty, elmt: null, data: [], hasImg: null },
                    _pvid_array_item = _pvid_array[_index] = { pvid: _string_for_empty, prop: _string_for_empty, name: _string_for_empty, elmt: null, oos: [] };
                var _dom_i = _document.createElement("i");
                _dom_i.appendChild(_document.createTextNode("已选中"));
                if (_cfg.isWTContract && _dom.attr(_elmProp, "data-contract")) {
                    var l = _dom.query("li", _elmProp);
                    for (var n = 0; n < l.length; n++) {
                        f[n] = { wtSpan: _dom.get("span", l[n]), wtValue: _dom.attr(l[n], "data-value") }
                    }
                }
                _prop_array_item.prop = _pvid_array_item.prop = _elmProp.getAttribute("data-property");    //<ul data-property="颜色分类" class="tm-clear J_TSaleProp tb-img  ">
                _prop_array_item.elmt = _dom.prev(_elmProp.parentNode);   //dt颜色分类
                _prop_array_item.hasImg = _dom.hasClass(_elmProp, "tb-img");
                var _dom_span_array_for_elmProp = _elmProp.getElementsByTagName("span");  //eg. 010黑 011白
                for (var _dom_span_index = _dom_span_array_for_elmProp.length - 1; 0 <= _dom_span_index; _dom_span_index--) {
                    var _dom_span = _dom_span_array_for_elmProp[_dom_span_index],
                        _dom_a = _dom_span.parentNode,
                        _dom_li = _dom_a.parentNode,
                        _elmt_package = { name: _dom_span.firstChild ? _dom_span.firstChild.nodeValue : "", pvid: _dom_li.getAttribute("data-value"), elmt: _dom_li, img: _string_for_empty };
                    if (true === _prop_array_item.hasImg) {
                        var _background_image_css = _dom.css(_dom_a, "background-image");
                        var _image_size = window.g_config.D950 ? "460x460" : "310x310";
                        if (-1 !== _background_image_css.indexOf("url(")) {
                            _elmt_package.img = _background_image_css.match(/url\("?([^\)^"]*)/)[1].replace("30x30", _image_size)
                        }
                    }
                    _prop_array_item.data.unshift(_elmt_package);
                    if (true === _is_ie) {
                        _dom_a.hideFocus = true
                    }
                    if (!_kissy.inArray(_elmt_package.pvid, _defaultSelected)) {
                        if (_calculate_total_stock(_filter_by_pvid([_elmt_package.pvid]))) {
                            _set_stock_state(_elmt_package.elmt)
                        }
                    }
                    (function () {
                        var AG = _index,
                            _prop_tmp = _prop_array_item.prop,
                            _elmProp_tmp = _elmProp,
                            _dom_span_tmp = _dom_span,
                            _dom_li_tmp = _dom_li,
                            _elmt_package_tmp = _elmt_package,
                            _dom_a_tmp = _dom_a,
                            _pvid_array_item_tmp = _pvid_array_item,
                            _dom_i_tmp = _dom_i;
                        var _click_fn = function (_event, Ag, AV) {
                            _event && _event.preventDefault();
                            if (_event) {
                                //_kissy_imp.sendAtpanel("tmalldetail.13.1")
                            }
                            if (_dom.hasClass(_dom_li_tmp, "tb-out-of-stock")) {
                                return
                            }
                            if (_pvid_array_item_tmp.pvid === _elmt_package_tmp.pvid && typeof Ag == "undefined") {
                                _dom.removeClass(_dom_li_tmp, "tb-selected");
                                _pvid_array_item_tmp.pvid = _string_for_empty;
                                _pvid_array_item_tmp.name = _string_for_empty;
                                _pvid_array_item_tmp.elmt = null;
                                if (_cfg.isWTContract) {
                                    if (!_dom.attr(_elmProp_tmp, "data-contract")) {
                                        var AK = _dom_li_tmp.getAttribute("data-value");
                                        for (var AU = 0; AU < f.length; AU++) {
                                            var AW = _filter_by_pvid([AK, f[AU]["wtValue"]])[0];
                                            var Af = _skuMap[AW];
                                            if (Af && Af.wtDesc) {
                                                _dom.html(f[AU]["wtSpan"], Af.origin)
                                            }
                                        }
                                        h = null
                                    } else {
                                        w = null
                                    }
                                    _mods_SKU.LinkAdd.statu("wt", "show");
                                    _mods_SKU.LinkBasket.statu("wt", "show");
                                    _dom.remove("#J_WTSkuId", _cfg.frmBid);
                                    _dom.remove("#J_WTSkuPrice", _cfg.frmBid)
                                }
                                var AO = _dom.query("#J_DetailMeta .tb-selected");
                                _kissy.each(AO, function (Ah) {
                                    if (_dom.attr(Ah, "data-value") != undefined) {
                                    }
                                })
                            } else {
                                if (_pvid_array_item_tmp.elmt) {
                                    _fireEvent(_pvid_array_item_tmp.elmt)
                                }
                                _dom.addClass(_dom_li_tmp, "tb-selected");
                                _dom_li_tmp.appendChild(_dom_i_tmp);
                                _pvid_array_item_tmp.pvid = _elmt_package_tmp.pvid;
                                _pvid_array_item_tmp.name = _elmt_package_tmp.name;
                                _pvid_array_item_tmp.elmt = _dom_li_tmp;
                                if (_cfg.isWTContract) {
                                    if (!_dom.attr(_elmProp_tmp, "data-contract")) {
                                        var _data_value = _dom_li_tmp.getAttribute("data-value");
                                        if (h) {
                                            for (var AU = 0; AU < f.length; AU++) {
                                                var AW = _filter_by_pvid([h, f[AU]["wtValue"]])[0];
                                                var Af = _skuMap[AW];
                                                if (Af && Af.origin) {
                                                    _dom.html(f[AU]["wtSpan"], Af.origin)
                                                }
                                            }
                                        }
                                        for (var AU = 0; AU < f.length; AU++) {
                                            var AW = _filter_by_pvid([_data_value, f[AU]["wtValue"]])[0];
                                            var Af = _skuMap[AW];
                                            if (Af && Af.wtDesc) {
                                                _dom.html(f[AU]["wtSpan"], '<em class="icon-wt"></em>' + Af.wtDesc)
                                            }
                                        }
                                        h = _data_value
                                    } else {
                                        w = _elmt_package_tmp.pvid
                                    }
                                    if (h && w) {
                                        var AW = _filter_by_pvid([h, w])[0];
                                        var Af = _skuMap[AW];
                                        if (Af && Af.wtDesc) {
                                            _mods_SKU.LinkAdd.statu("wt", "hide");
                                            _mods_SKU.LinkBasket.statu("wt", "hide");
                                            var AN = _dom.get("#J_WTSkuId", _cfg.frmBid);
                                            var AR = _dom.get("#J_WTSkuPrice", _cfg.frmBid);
                                            if (!AN) {
                                                var AN = _dom.create('<input id="J_WTSkuId" type="hidden" name="wt_skuId" value="' + Af.skuId + '" />');
                                                _cfg.frmBid.appendChild(AN)
                                            } else {
                                                _dom.attr(AN, "value", Af.skuId)
                                            }
                                            if (!AR) {
                                                var AR = _dom.create('<input id="J_WTSkuPrice" type="hidden" name="wt_skuPrice" value="' + Af.price + '" />');
                                                _cfg.frmBid.appendChild(AR)
                                            } else {
                                                _dom.attr(AR, "value", Af.price)
                                            }
                                        } else {
                                            _mods_SKU.LinkAdd.statu("wt", "show");
                                            _mods_SKU.LinkBasket.statu("wt", "show");
                                            _dom.remove("#J_WTSkuId", _cfg.frmBid);
                                            _dom.remove("#J_WTSkuPrice", _cfg.frmBid)
                                        }
                                    }
                                }
                            }
                            if (_string_for_empty !== _elmt_package_tmp.img) {
                                _kissy.use("malldetail/sku/thumbViewer", function (_kissy_imp_t, _thumbViewer) {
                                    _thumbViewer.show(_elmt_package_tmp.img)
                                })
                            }
                            var _pvid_combo = [];
                            for (var _eleProp_index = 0; _elmProps_length > _eleProp_index; _eleProp_index++) {
                                var _pvid_array_item_t_t = _pvid_array[_eleProp_index], _pvid = _pvid_array_item_t_t.pvid;
                                if (_string_for_empty !== _pvid) {
                                    _pvid_combo.push(_pvid)
                                }
                            }
                            for (var _eleProps_index = 0; _elmProps_length > _eleProps_index; _eleProps_index++) {
                                var _pvid_array_item_t_t = _pvid_array[_eleProps_index], _pvid = _pvid_array_item_t_t.pvid;
                                var _prop_array_index_data = _prop_array[_eleProps_index].data, _prop_array_index_data_length = _prop_array_index_data.length;
                                for (var _prop_array_index_data_index = 0; _prop_array_index_data_index < _prop_array_index_data_length; _prop_array_index_data_index++) {
                                    var _prop_array_index_data_item = _prop_array_index_data[_prop_array_index_data_index];
                                    var _skuMap_key = [].concat(_pvid_combo);
                                    if (_pvid_array_item_tmp.pvid === _elmt_package_tmp.pvid) {
                                        if (_dom.hasClass(_prop_array_index_data_item.elmt, "tb-out-of-stock")) {
                                            continue
                                        }
                                        if (_string_for_empty !== _pvid) {
                                            if (_pvid == _prop_array_index_data_item.pvid) {
                                                continue
                                            }
                                            var Ad = _kissy.indexOf(_pvid, _skuMap_key);
                                            _skuMap_key = _skuMap_key.slice(0, Ad).concat(_skuMap_key.slice(1 + Ad, _skuMap_key.length))
                                        }
                                        _skuMap_key.push(_prop_array_index_data_item.pvid);
                                        AW = _filter_by_pvid(_skuMap_key);
                                        if (_calculate_total_stock(AW)) {
                                            _set_stock_state(_prop_array_index_data_item.elmt)
                                        }
                                    } else {
                                        if (!_dom.hasClass(_prop_array_index_data_item.elmt, "tb-out-of-stock")) {
                                            continue
                                        }
                                        if (_string_for_empty !== _pvid) {
                                            var Ad = _kissy.indexOf(_pvid, _skuMap_key);
                                            _skuMap_key = _skuMap_key.slice(0, Ad).concat(_skuMap_key.slice(1 + Ad, _skuMap_key.length))
                                        }
                                        _skuMap_key.push(_prop_array_index_data_item.pvid);
                                        AW = _filter_by_pvid(_skuMap_key);
                                        if (!_calculate_total_stock(AW)) {
                                            _dom.removeClass(_prop_array_index_data_item.elmt, "tb-out-of-stock")
                                        }
                                    }
                                }
                            }
                            var _skuMap_value;
                            if (_pvid_combo.length === _elmProps_length) {
                                var _skuMap_key = ";" + _pvid_combo.join(";") + ";";
                                if ("undefined" !== typeof _skuMap[_skuMap_key]) {
                                    _skuMap_value = _skuMap[_skuMap_key];
                                    _malldetail_sku_price.updatePointsBuyPrice((_skuMap_value.price * 100).toFixed(0))
                                }
                            }
                            var _skuid = _skuMap_value ? _skuMap_value.skuId : "";
                            var _selectSkuId = _mods_SKU.selectSkuId || "";
                            if (_selectSkuId != _skuid) {
                                _mods_SKU.selectSkuId = _skuid;
                                _mods_SKU.inventoryType = _skuMap_value ? _skuMap_value.type : 0;
                                _mods_SKU.skuFlag = _skuMap_key;
                                _eventTarget.fire(_str_skuChange, { price: _dom.text(_strPrice), isSelectAll: _pvid_combo.length === _elmProps_length, skuId: _skuid, skuIdOld: _selectSkuId, skuFlag: _skuMap_key || "" })
                            }
                            _mods_SKU.selArr = _pvid_combo;
                            _kissy_imp.fire(_str_PropertyChange, { selArr: _pvid_combo })
                        };
                        _event.on(_dom_a_tmp, "click", _click_fn);
                        _dataLink_list[_elmt_package_tmp.pvid] = function (AJ) {
                            _click_fn(null, AJ)
                        };
                        if ((true === _hasDefaultSelected && _kissy.inArray(_elmt_package.pvid, _defaultSelected)) || (1 === _dom_span_array_for_elmProp.length && typeof _dom_span_array_for_elmProp[0] != undefined && _dom_span_array_for_elmProp[0].parentNode.style.background == "")) {
                            v.push(_click_fn)
                        }
                    })()
                }
            }
            _kissy.each(v, function (i) {
                i(null, null, "22")
            });
            if (_is_ie6) {
                _event.on(_cfg.divKeyProp, "mouseenter mouseleave", function (i) {
                    _dom[i.type === "mouseenter" ? "addClass" : "removeClass"](_cfg.divKeyProp, "tb-key-hover")
                })
            }
        };
        var _reset = function () {
            var _dom_lis_tb_selected = _dom.query("#J_DetailMeta .tb-selected");
            var _dataLink_list = _mods_SKU.PropertyHandler.getdataLinkList();
            var l;
            _kissy.each(_dom_lis_tb_selected, function (_index_t) {
                if (_dom.attr(_index_t, "data-value") != undefined) {
                    l = true;
                    _dataLink_list[_dom.attr(_index_t, "data-value")](true)
                }
            });
            if (!l) {
                for (var _prop_array_index = 0, h = _prop_array.length; _prop_array_index < h; _prop_array_index++) {
                    var _prop_array_item_data = _prop_array[_prop_array_index]["data"];
                    for (var _prop_array_item_data_index = 0, _prop_array_item_data_length = _prop_array_item_data.length; _prop_array_item_data_index < _prop_array_item_data_length; _prop_array_item_data_index++) {
                        var _prop_array_item_data_item = _prop_array_item_data[_prop_array_item_data_index];
                        var _pvid_in_data = _prop_array_item_data_item.pvid;
                        if (!_kissy.inArray(_pvid_in_data, _defaultSelected)) {
                            if (_calculate_total_stock(_filter_by_pvid([_pvid_in_data]))) {
                                _set_stock_state(_prop_array_item_data_item.elmt)
                            } else {
                                _dom.removeClass(_prop_array_item_data_item.elmt, "tb-out-of-stock")
                            }
                        }
                    }
                }
            }
        };
        return { init: function () {
            if (!(_cfg = _kissy_imp.cfg())) {
                return
            }
            Q()
        }, onSkuChange: function (_fn) {
            if (_kissy.isFunction(_fn)) {
                _eventTarget.on(_str_skuChange, _fn)
            }
        }, onPropertyChange: function (_fn) {
            if (_kissy.isFunction(_fn)) {
                _kissy_imp.on(_str_PropertyChange, _fn)
            }
        }, getSeleProp: function () {
            return _pvid_array
        }, getPropData: function () {
            return _prop_array
        }, propClick: function (d) {
            return _fireEvent(d)
        }, getdataLinkList: function () {
            return _dataLink_list
        }, reset: function () {
            return _reset()
        }, onBeforeBuySubmitValidate: function (d) {
            if (_kissy.isFunction(d)) {
                T.push(d)
            }
        }, beforeBuyValidateCheck: Z
        }
    } ()
}, { requires: ["malldetail/sku/price"] }); /*pub-1|2013-02-28 21:14:21*/