KISSY.add(V + "/mods/filter", function (_kissy_J, _city_codes) {
    var _dom = _kissy_J.DOM,
		_event = _kissy_J.Event,
		_document = document,
		_window = window,
		_is_ie6 = _kissy_J.UA.ie == 6,
		_dom_class_main = _kissy_J.get(".main"),
		_dom_id_J_Filter = _kissy_J.get("#J_Filter"),
		_dom_id_J_FForm = _kissy_J.get("#J_FForm"),
		_STR_FILTER_FIX = "filter-fix",
		_dom_id_J_FPrice = _kissy_J.get("#J_FPrice"),
		_dom_class_j_FPInput = _kissy_J.query(".j_FPInput"),
		_dom_id_J_FPEnter = _kissy_J.get("#J_FPEnter"),
		_dom_id_J_FPCancel = _kissy_J.get("#J_FPCancel"),
		_STR_FPRICE_HOVER = "fPrice-hover",
		_dom_id_J_FOriginArea = _kissy_J.get("#J_FOriginArea"),
		_dom_id_J_FOAInput = _kissy_J.get("#J_FOAInput"),
		_dom_form_in_J_FOriginArea = _kissy_J.get("form", _dom_id_J_FOriginArea),
		_dom_button_in_J_FOriginArea = _kissy_J.get("button", _dom_id_J_FOriginArea),
		_dom_id_J_FDestArea = _kissy_J.get("#J_FDestArea"),
		_dom_id_J_DestAreaForm = _kissy_J.get("#J_DestAreaForm"),
		_STR_FA_TEXT = "fA-text",
		_STR_FA_LIST = "fA-list",
		_STR_FALL_CITIES = "fAll-cities",
		_STR_FAL_CUR = "fAl-cur",
		_STR_FALL_CITIES_CUR = "fAll-cities-cur",
		_city_codes_imp = new _city_codes(),
		_dom_id_J_FMenu = _kissy_J.get("#J_FMenu"),
		_dom_class_j_FMcExpand = _kissy_J.get(".j_FMcExpand");

    function Mods_Filter() {
        if (!(this instanceof Mods_Filter)) {
            return new Mods_Filter()
        }
        this.isPriceFocus = false;
        this._init()
    }
    _kissy_J.augment(Mods_Filter, _kissy_J.EventTarget, {
        _init: function () {
            if (!_dom_id_J_Filter) {
                return
            }
            LIST.msg.fire("ie6Hover", {
                classname: ["fArea", "fRange"]
            });
            this._priceInit();
            this._priceEvent();
            this._originAreaEvent();
            this._destAreaInit();
            this._destAreaEvent();
            this._menuInit();
            this._menuEvent();
            this._fix();
            this._tipCtrl(true);
            this._disctOpts()
        },
        _priceInit: function () {
            var _set_value_from_search_param = function (_dom_item, _search_param) {
                var _location_search = location.search,
					_param_match = _location_search.match(new RegExp("\\b" + _search_param + "=(\\d+)\\b"));
                _param_match && (_dom_item.value = _param_match[1])
            };
            _set_value_from_search_param(_dom_class_j_FPInput[0], "start_price");
            _set_value_from_search_param(_dom_class_j_FPInput[1], "end_price")
        },
        _priceEvent: function () {
            if (!_dom_id_J_FPrice) {
                return
            }
            var D = this,
				E = null;
            _event.on(_dom_class_j_FPInput, "blur", function () {
                E = setTimeout(function () {
                    D.isPriceFocus = false;
                    _dom.removeClass(_dom_id_J_FPrice, _STR_FPRICE_HOVER)
                }, 300)
            });
            _event.on(_dom_class_j_FPInput, "focus", function () {
                clearTimeout(E);
                D.isPriceFocus = true;
                _dom.addClass(_dom_id_J_FPrice, _STR_FPRICE_HOVER)
            });
            _event.on(_dom_class_j_FPInput, "keyup", function () {
                var S = this.value;
                if (!/^\d+\.?\d*$/.test(S)) {
                    S = Math.abs(parseFloat(S));
                    this.value = isNaN(S) ? "" : S
                }
            });
            _event.on(_dom_id_J_FPEnter, "click", function (S) {
                _dom_id_J_FForm.submit();
                _kissy_J.log(_dom_id_J_FForm);
                S.preventDefault()
            });
            _event.on(_dom_id_J_FPCancel, "click", function (S) {
                _dom.val(_dom_class_j_FPInput, "");
                _dom_class_j_FPInput[0].focus();
                S.preventDefault()
            });
            _event.on(_dom_id_J_Filter, "keypress", function (S) {
                if (S.keyCode == 13 && D.isPriceFocus) {
                    _dom_id_J_FForm.submit()
                }
            })
        },
        _originAreaEvent: function () {
            if (!_dom_id_J_FOAInput) {
                return
            }
            var D = _dom.attr(_dom_id_J_FOAInput, "data-val") || "";
            if (_dom_id_J_FOAInput.value == "") {
                _dom_id_J_FOAInput.value = D
            }
            _event.on(_dom_id_J_FOAInput, "focus", function () {
                if (_dom_id_J_FOAInput.value == D) {
                    _dom_id_J_FOAInput.value = ""
                }
            });
            _event.on(_dom_id_J_FOAInput, "blur", function () {
                if (_dom_id_J_FOAInput.value == "") {
                    _dom_id_J_FOAInput.value = D
                }
            });
            _event.on(_kissy_J.query("a", _dom_id_J_FOriginArea), "click", function (E) {
                E.preventDefault();
                var S = _dom.attr(this, "data-val") || _dom.html(this);
                _dom_id_J_FOAInput.value = S == "\u6240\u6709\u5730\u533a" ? "" : S;
                _dom_form_in_J_FOriginArea.submit()
            });
            _event.on(_dom_button_in_J_FOriginArea, "click", function () {
                if (_dom_id_J_FOAInput.value == D) {
                    _dom_id_J_FOAInput.value = ""
                }
            })
        },
        _updateDestAreaBoxHtml: function (j, S, E) {
            var l = ['<ul class="fAl-loc">'];
            for (var D in S) {
                l[l.length] = "<li" + ((E == D) ? ' class="' + _STR_FAL_CUR + '"' : "") + '><a href="" code="' + D + '" atpanel="3,' + S[D] + ',,,spu-toloc,20,toloc,">' + S[D] + "</a></li>"
            }
            l[l.length] = "</ul>";
            _dom.html(j, l.join(""))
        },
        _data: {},
        _destAreaInit: function () {
            if (!_dom_id_J_FDestArea) {
                return
            }
            var D = _dom.get("." + _STR_FA_LIST, _dom_id_J_FDestArea),
				m = _dom.get("." + _STR_FA_TEXT, _dom_id_J_FDestArea),
				S = _dom.query("a", D),
				s = _dom.val(_dom_id_J_DestAreaForm.area_code),
				j = _city_codes_imp[s];
            if (!j) {
                var n = s.replace(/([\d]{2})\d+/g, "$10000"),
					E = _city_codes_imp[n],
					q = E && E.length == 2 ? E[1] : null,
					l;
                if (q) {
                    for (var k = 0, o = S.length; k < o; k++) {
                        var p = S[k];
                        if (_dom.attr(p, "code") == n) {
                            var r = p.parentNode;
                            l = _dom.next(r, "." + _STR_FALL_CITIES);
                            this._updateDestAreaBoxHtml(l, q, s);
                            if (!_dom.get("i", p)) {
                                _dom.append(_dom.create('<i class="f-ico-triangle-mt" />'), p)
                            }
                            _dom.addClass(r, _STR_FAL_CUR);
                            _dom.addClass(l, _STR_FALL_CITIES_CUR);
                            _dom.html(m, q[s]);
                            this._data.lastBox = l;
                            this._data.lastLi = r;
                            this._data.lastChildLi = _dom.get("." + _STR_FAL_CUR, l);
                            break
                        }
                    }
                }
            } else {
                for (var k = 0, o = S.length; k < o; k++) {
                    var p = S[k],
						r = p.parentNode;
                    if (_dom.attr(p, "code") == s) {
                        _dom.addClass(r, _STR_FAL_CUR);
                        this._data.lastLi = r;
                        break
                    }
                }
            }
        },
        _destAreaEvent: function () {
            if (!_dom_id_J_FDestArea) {
                return
            }
            var D = this,
				j = _dom.get("." + _STR_FA_LIST, _dom_id_J_FDestArea),
				S = D._data.lastChildLi,
				k = D._data.lastLi,
				E = D._data.lastBox;
            _event.delegate(j, "click", "a", function (q) {
                var m = q.currentTarget,
					l = m.parentNode,
					n = _dom.attr(m, "code"),
					p = [],
					o = null;
                if (_dom.hasClass(l, _STR_FALL_CITIES)) {
                    return
                }
                _dom.addClass(l, _STR_FAL_CUR);
                n && (p = _city_codes_imp[n] || []);
                l.grade = p.length !== 0 ? 1 : 2;
                E && l.grade == 1 && _dom.removeClass(E, _STR_FALL_CITIES_CUR);
                p.length == 2 && (function () {
                    if (o = _dom.next(l, "." + _STR_FALL_CITIES)) {
                        D._updateDestAreaBoxHtml(o, p[1]);
                        if (!_dom.get("i", m)) {
                            _dom.append(_dom.create('<i class="f-ico-triangle-mt" />'), m)
                        }
                        _dom.addClass(o, _STR_FALL_CITIES_CUR);
                        E = o
                    }
                })();
                switch (l.grade) {
                    case 1:
                        if (k != l) {
                            _dom.removeClass(k, _STR_FAL_CUR);
                            k = l
                        }
                        break;
                    case 2:
                        if (S != l) {
                            _dom.removeClass(S, _STR_FAL_CUR);
                            S = l
                        }
                        break
                }
                q.preventDefault();
                if (p.length !== 2) {
                    _dom.val(_dom_id_J_DestAreaForm.area_code, n);
                    _dom_id_J_DestAreaForm.submit()
                }
            })
        },
        _menuEvent: function () {
            if (!_dom_id_J_FMenu) {
                return
            }
            _event.on(_kissy_J.query("input", _dom_id_J_FMenu), "click", function () {
                _dom_id_J_FForm.submit()
            })
        },
        _menuInit: function () {
            if (!_dom_id_J_FMenu) {
                return
            }
            var S = "drop",
				E = _dom.children(_dom_id_J_FMenu, function (k) {
				    return k.tagName == "INPUT" && k.type == "checkbox"
				}),
				D = E.length;
            for (var j = 3; j < D; j++) {
                if (E[j].checked) {
                    S = "expand";
                    break
                }
            }
            LIST.msg.fire("expand", {
                el: _dom_class_j_FMcExpand,
                classname: "fMenu",
                status: S
            })
        },
        _fix: function () {
            var S = _dom.create('<div id="J_FilterPlaceholder" />', {
                css: {
                    height: _dom.outerHeight(_dom_id_J_Filter, true),
                    display: "none"
                }
            });
            _dom.insertAfter(S, _dom_id_J_Filter);
            this.needFixTop = true;
            var E = Math.max(_dom.offset(_dom_id_J_Filter).top, 130),
				D = function () {
				    var j = _dom.scrollTop(_window);
				    if (j > E) {
				        if (!_dom.hasClass(_dom_id_J_Filter, _STR_FILTER_FIX)) {
				            _dom.addClass(_dom_id_J_Filter, _STR_FILTER_FIX);
				            _dom.show(S)
				        }
				        if (_is_ie6) {
				            _dom.css(_dom_id_J_Filter, "top", j - 10 - _dom.offset(_dom_class_main).top)
				        }
				    } else {
				        _dom.removeClass(_dom_id_J_Filter, _STR_FILTER_FIX);
				        _dom.hide(S);
				        E = Math.max(_dom.offset(_dom_id_J_Filter).top, 130)
				    }
				};
            D();
            _event.on(_window, "scroll", D)
        },
        _tipCtrl: function (S) {
            if (S || !_dom_id_J_FMenu) {
                return
            }
            var j = _dom.query("label", _dom_id_J_FMenu);
            if (!j.length) {
                return
            }
            var E = [1, -1, 0, 0],
				D = E.length;
            _kissy_J.query(".j_FTip").each(function (o) {
                var l = _dom.attr(o, "data-cfg"),
					k = E;
                if (l) {
                    k = l.split(",");
                    for (var n = 0; n < D; n++) {
                        k[n] = parseInt(k[n]) || E[n]
                    }
                }
                var m = j[k[0] - 1];
                if (m) {
                    var p = m.offsetLeft + _dom.outerWidth(m) / 2 - _dom.outerWidth(o) / 2;
                    _dom.css(o, "left", p + "px")
                }
                k[1] !== -1 && setTimeout(function () {
                    _dom.hide(".j_FTip")
                }, k[1] < 0 ? 0 : k[1]);
                k[2] && _dom.show(_dom.get(".j_FTCat", o));
                k[3] && _dom.show(_dom.get(".j_FTX", o));
                _dom.show(o)
            })
        },
        _disctOpts: function () {
            var D = "#J_FDisctOpts";
            if (!_dom.get(D)) {
                return
            }
            _kissy_J.UA.ie == 7 && _dom.query(D + " a").each(function (E) {
                E.setAttribute("hideFocus", "true")
            });
            _event.delegate(D, "click", "a", function (j) {
                var S = j.target,
					E = "fDO-cur",
					k = "fDO-disable";
                if (_dom.hasClass(S, k)) {
                    return
                }
                _dom.query(D + " a").each(function (l) {
                    _dom.removeClass(l, E)
                });
                _dom.addClass(S, E)
            })
        }
    });
    return {
        init: function () {
            new Mods_Filter()
        }
    }
}, {
    requires: [V + "/city-codes"]
});