
KISSY.add("malldetail/sku/propertyHandler", function (_kissy_imp, _malldetail_sku_price) {
    var _mods_SKU = _kissy_imp.mods.SKU, _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _ua = _kissy.UA, _document = document, _is_ie = (0 < _ua.ie), _is_ie6 = (6 == _ua.ie), _string_for_empty = "";
    _mods_SKU.PropertyHandler = function () {
        var _cfg = {}, R = [], P = [], _defaultSelected = [], _eleProps_length = 0, U = _kissy.merge({}, _kissy.EventTarget), a = "skuChange", M = "PropertyChange", T = [];
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
        var _filter_by_pvid = function (_pvid_array) {
            var _skuMap = _kissy_imp.cfg("valItemInfo").skuMap;
            var _pvid_array_length = _pvid_array.length;
            var d = [];
            var _pvid_sort_fn = function (_array) {
                _array.sort(function (_x, _y) {
                    _x = parseInt(_x.split(":")[0], 10);
                    _y = parseInt(_y.split(":")[0], 10);
                    return _x - _y || -1
                });
                return _array.length ? _array : ""
            };
            _pvid_array = _pvid_sort_fn(_pvid_array);
            if (_pvid_array.length) {
                var _pvid_array_join_regex = new RegExp(";" + _pvid_array.join(";(-?\\d+:-?\\d+;)*") + ";");
                for (var _item in _skuMap) {
                    if (_pvid_array_join_regex.test(_item)) {
                        d.push(_item)
                    }
                }
            } else {
                d = _skuMap
            }
            return d
        };
        var V = function (d) {
            if (_dom.hasClass(d, "tb-selected")) {
                O(d)
            }
            _dom.addClass(d, "tb-out-of-stock")
        };
        var O = function (e) {
            if (!!_document.createEvent) {
                var d = _document.createEvent("HTMLEvents");
                d.initEvent("click", false, true);
                e.children[0].dispatchEvent(d)
            } else {
                e.children[0].fireEvent("onclick")
            }
        };
        var S = function (_array_filtered_by_pvid) {
            var _totalStock = 0;
            var k = false;
            var _skuMap = _cfg.valItemInfo.skuMap;
            var g;
            var d = true;
            for (var _index = 0, _array_length = _array_filtered_by_pvid.length; _index < _array_length; _index++) {
                var _pvid = _array_filtered_by_pvid[_index];
                _totalStock += _skuMap[_pvid].stock;
                if (_skuMap[_pvid]["type"] == 3) {
                    k = true
                }
            }
            if (_array_filtered_by_pvid.length && (_totalStock > 0 || k)) {
                d = false
            }
            return d
        };
        var N = {};
        var Q = function () {
            _eleProps_length = _cfg.elmProps.length;
            var _skuMap = _cfg.valItemInfo.skuMap, _strPrice = _cfg.strPrice, v = [], _hasDefaultSelected = ("undefined" !== typeof _defaultSelected);
            _defaultSelected = _cfg.valItemInfo.defSelected;
            var f = [], h, w;
            for (var _index = _eleProps_length - 1; 0 <= _index; _index--) {
                var _elmProp = _cfg.elmProps[_index], g = R[_index] = { prop: _string_for_empty, elmt: null, data: [], hasImg: null }, k = P[_index] = { pvid: _string_for_empty, prop: _string_for_empty, name: _string_for_empty, elmt: null, oos: [] };
                var _dom_i = _document.createElement("i");
                _dom_i.appendChild(_document.createTextNode("已选中"));
                if (_cfg.isWTContract && _dom.attr(_elmProp, "data-contract")) {
                    var l = _dom.query("li", _elmProp);
                    for (var n = 0; n < l.length; n++) {
                        f[n] = { wtSpan: _dom.get("span", l[n]), wtValue: _dom.attr(l[n], "data-value") }
                    }
                }
                g.prop = k.prop = _elmProp.getAttribute("data-property");
                g.elmt = _dom.prev(_elmProp.parentNode);   //dt颜色分类
                g.hasImg = _dom.hasClass(_elmProp, "tb-img");
                var _dom_span_array = _elmProp.getElementsByTagName("span");  //eg. 010黑 011白
                for (var _dom_span_index = _dom_span_array.length - 1; 0 <= _dom_span_index; _dom_span_index--) {
                    var _dom_span = _dom_span_array[_dom_span_index],
                        _dom_a = _dom_span.parentNode,
                        _dom_li = _dom_a.parentNode,
                        _elmt_package = { name: _dom_span.firstChild ? _dom_span.firstChild.nodeValue : "", pvid: _dom_li.getAttribute("data-value"), elmt: _dom_li, img: _string_for_empty };
                    if (true === g.hasImg) {
                        var _background_image_css = _dom.css(_dom_a, "background-image");
                        var _image_size = window.g_config.D950 ? "460x460" : "310x310";
                        if (-1 !== _background_image_css.indexOf("url(")) {
                            _elmt_package.img = _background_image_css.match(/url\("?([^\)^"]*)/)[1].replace("30x30", _image_size)
                        }
                    }
                    g.data.unshift(_elmt_package);
                    if (true === _is_ie) {
                        _dom_a.hideFocus = true
                    }
                    if (!_kissy.inArray(_elmt_package.pvid, _defaultSelected)) {
                        if (S(_filter_by_pvid([_elmt_package.pvid]))) {
                            V(_elmt_package.elmt)
                        }
                    }
                    (function () {
                        var AG = _index, AD = g.prop, AF = _elmProp, j = _dom_span, y = _dom_li, AH = _elmt_package, i = _dom_a, AC = k, AE = _dom_i;
                        var AI = function (Ab, Ag, AV) {
                            Ab && Ab.preventDefault();
                            if (Ab) {
                                _kissy_imp.sendAtpanel("tmalldetail.13.1")
                            }
                            if (_dom.hasClass(y, "tb-out-of-stock")) {
                                return
                            }
                            if (AC.pvid === AH.pvid && typeof Ag == "undefined") {
                                _dom.removeClass(y, "tb-selected");
                                AC.pvid = _string_for_empty;
                                AC.name = _string_for_empty;
                                AC.elmt = null;
                                if (_cfg.isWTContract) {
                                    if (!_dom.attr(AF, "data-contract")) {
                                        var AK = y.getAttribute("data-value");
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
                                if (AC.elmt) {
                                    O(AC.elmt)
                                }
                                _dom.addClass(y, "tb-selected");
                                y.appendChild(AE);
                                AC.pvid = AH.pvid;
                                AC.name = AH.name;
                                AC.elmt = y;
                                if (_cfg.isWTContract) {
                                    if (!_dom.attr(AF, "data-contract")) {
                                        var AK = y.getAttribute("data-value");
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
                                            var AW = _filter_by_pvid([AK, f[AU]["wtValue"]])[0];
                                            var Af = _skuMap[AW];
                                            if (Af && Af.wtDesc) {
                                                _dom.html(f[AU]["wtSpan"], '<em class="icon-wt"></em>' + Af.wtDesc)
                                            }
                                        }
                                        h = AK
                                    } else {
                                        w = AH.pvid
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
                            if (_string_for_empty !== AH.img) {
                                _kissy.use("malldetail/sku/thumbViewer", function (Ah, Ai) {
                                    Ai.show(AH.img)
                                })
                            }
                            var Ac = [];
                            for (var AY = 0; _eleProps_length > AY; AY++) {
                                var Ae = P[AY], AS = Ae.pvid;
                                if (_string_for_empty !== AS) {
                                    Ac.push(AS)
                                }
                            }
                            for (var AY = 0; _eleProps_length > AY; AY++) {
                                var Ae = P[AY], AS = Ae.pvid;
                                var AL = R[AY].data, AQ = AL.length;
                                for (var AX = 0; AX < AQ; AX++) {
                                    var AZ = AL[AX];
                                    var AJ = [].concat(Ac);
                                    if (AC.pvid === AH.pvid) {
                                        if (_dom.hasClass(AZ.elmt, "tb-out-of-stock")) {
                                            continue
                                        }
                                        if (_string_for_empty !== AS) {
                                            if (AS == AZ.pvid) {
                                                continue
                                            }
                                            var Ad = _kissy.indexOf(AS, AJ);
                                            AJ = AJ.slice(0, Ad).concat(AJ.slice(1 + Ad, AJ.length))
                                        }
                                        AJ.push(AZ.pvid);
                                        AW = _filter_by_pvid(AJ);
                                        if (S(AW)) {
                                            V(AZ.elmt)
                                        }
                                    } else {
                                        if (!_dom.hasClass(AZ.elmt, "tb-out-of-stock")) {
                                            continue
                                        }
                                        if (_string_for_empty !== AS) {
                                            var Ad = _kissy.indexOf(AS, AJ);
                                            AJ = AJ.slice(0, Ad).concat(AJ.slice(1 + Ad, AJ.length))
                                        }
                                        AJ.push(AZ.pvid);
                                        AW = _filter_by_pvid(AJ);
                                        if (!S(AW)) {
                                            _dom.removeClass(AZ.elmt, "tb-out-of-stock")
                                        }
                                    }
                                }
                            }
                            var AM;
                            if (Ac.length === _eleProps_length) {
                                var Aa = ";" + Ac.join(";") + ";";
                                if ("undefined" !== typeof _skuMap[Aa]) {
                                    AM = _skuMap[Aa];
                                    _malldetail_sku_price.updatePointsBuyPrice((AM.price * 100).toFixed(0))
                                }
                            }
                            var AT = AM ? AM.skuId : "";
                            var AP = _mods_SKU.selectSkuId || "";
                            if (AP != AT) {
                                _mods_SKU.selectSkuId = AT;
                                _mods_SKU.inventoryType = AM ? AM.type : 0;
                                _mods_SKU.skuFlag = Aa;
                                U.fire(a, { price: _dom.text(_strPrice), isSelectAll: Ac.length === _eleProps_length, skuId: AT, skuIdOld: AP, skuFlag: Aa || "" })
                            }
                            _mods_SKU.selArr = Ac;
                            _kissy_imp.fire(M, { selArr: Ac })
                        };
                        _event.on(i, "click", AI);
                        N[AH.pvid] = function (AJ) {
                            AI(null, AJ)
                        };
                        if ((true === AB && _kissy.inArray(_elmt_package.pvid, _defaultSelected)) || (1 === _dom_span_array.length && typeof _dom_span_array[0] != undefined && _dom_span_array[0].parentNode.style.background == "")) {
                            v.push(AI)
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
        var b = function () {
            var o = _dom.query("#J_DetailMeta .tb-selected");
            var q = _mods_SKU.PropertyHandler.getdataLinkList();
            var l;
            _kissy.each(o, function (i) {
                if (_dom.attr(i, "data-value") != undefined) {
                    l = true;
                    q[_dom.attr(i, "data-value")](true)
                }
            });
            if (!l) {
                for (var k = 0, h = R.length; k < h; k++) {
                    var e = R[k]["data"];
                    for (var g = 0, f = e.length; g < f; g++) {
                        var d = e[g];
                        var p = d.pvid;
                        if (!_kissy.inArray(p, _defaultSelected)) {
                            if (S(_filter_by_pvid([p]))) {
                                V(d.elmt)
                            } else {
                                _dom.removeClass(d.elmt, "tb-out-of-stock")
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
        }, onSkuChange: function (d) {
            if (_kissy.isFunction(d)) {
                U.on(a, d)
            }
        }, onPropertyChange: function (d) {
            if (_kissy.isFunction(d)) {
                _kissy_imp.on(M, d)
            }
        }, getSeleProp: function () {
            return P
        }, getPropData: function () {
            return R
        }, propClick: function (d) {
            return O(d)
        }, getdataLinkList: function () {
            return N
        }, reset: function () {
            return b()
        }, onBeforeBuySubmitValidate: function (d) {
            if (_kissy.isFunction(d)) {
                T.push(d)
            }
        }, beforeBuyValidateCheck: Z
        }
    } ()
}, { requires: ["malldetail/sku/price"] }); /*pub-1|2013-02-28 21:14:21*/