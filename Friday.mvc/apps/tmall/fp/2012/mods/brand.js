KISSY.add("2012/mods/brand", function (_kissy, _template, _util) {
    var _kissy = KISSY,
		_dom = _kissy.DOM,
		_event = _kissy.Event,
		_window = window,
		_document = document,
		_is_ie6 = (_kissy.UA.ie == 6),
		_g_config = _window.g_config,
		_is_test_env = window.g_config.isTestEnv,
		_str_mouseenter = "mouseenter",
		_str_mouseleave = "mouseleave",
		_str_click = "click";
    var _options = {
        container: "#J_Brand",
        brands: "#J_BrandAd a",
        marks: ".j_CollectBrand",
        brandExpand: ".j_BrandExpand",
        brandList: ".brand-list",
        bigBrand: ".greatBrand",
        temai: ".temai"
    };
    var _config;
    var _isLogin = false;
    var _nickname = "";
    var F = [];
    var K = false;
    var _recommend_url = "http://" + (_is_test_env ? "ald.taobao.com" : "ald.taobao.com") + "/recommend.htm?appId=12002";
    var O = "http://" + (_is_test_env ? "brand.daily.tmall.net" : "brand.tmall.com") + "/ajax/brandAddToFav.htm";
    var J = "http://" + (_is_test_env ? "brand.daily.tmall.net" : "brand.tmall.com") + "/ajax/homePageGetBrand.htm";
    var A = "http://" + (~location.host.indexOf(".net") ? "login.daily.taobao.net" : "login.taobao.com") + "/member/logout.jhtml";

    function Brand(_op) {
        var _brand = this;
        _brand.config = _kissy.merge(_options, _op || {});
        _brand._init()
    }
    _kissy.mix(Brand.prototype, {
        brandRecommend: function () {
            var _param_array = _kissy.unparam(_document.location.search.substring(1));
            var _uid = _param_array.uid || "";
            MFP.POC.add("ald_brand_start");
            _kissy.jsonp(_recommend_url, {
                uid: _uid,
                t: +new Date
            }, function (_data) {
                MFP.POC.add("ald_brand_end");
                if (!_data || !_data.bBrands || !_data.sBrands) {
                    return
                }
                if (_data.atpanelUrl && _data.atpanelUrl !== "") {
                    MFP.ATP.aldAc(_data.atpanelUrl)
                }
                var _bBrands = _data.bBrands;
                var _sBrands = _data.sBrands;
                var e = 50,
					d = 50;
                _kissy.each(_dom.query(_config.brands), function (_bnd) {
                    var _brand_to_be_applied, _str_img_snippet;
                    var j = _dom.children(_bnd);
                    if (_dom.attr(_bnd, "keep") == "true") {
                        return
                    }
                    if (_dom.hasClass(_bnd, "brandAd-b")) {
                        _brand_to_be_applied = _bBrands[0];
                        _str_img_snippet = '<img width="130" height="225" src="' + _util.randomImgUrl(_brand_to_be_applied.logo) + '" alt="" />';
                        _bBrands.splice(0, 1)
                    } else {
                        if (_dom.hasClass(_bnd, "brandAd-s")) {
                            _brand_to_be_applied = _sBrands[0];
                            var _width = _brand_to_be_applied.logoPicType == "sBrand" ? "130" : "90";
                            var _height = _brand_to_be_applied.logoPicType == "sBrand" ? "82" : "45";
                            var _class = _brand_to_be_applied.logoPicType == "sBrand" ? "" : 'class="logo"';
                            _str_img_snippet = "<img " + _class + ' width="' + _width + '" height="' + _height + '" src="' + _util.randomImgUrl(_brand_to_be_applied.logo) + '" alt="" />';
                            _sBrands.splice(0, 1)
                        } else {
                            return
                        }
                    }
                    var i = _brand_to_be_applied.actDesc !== "" ? _brand_to_be_applied.actDesc : _brand_to_be_applied.brandDesc;
                    var l = i !== "" ? i : _brand_to_be_applied.brandName;
                    _dom.attr(_bnd, "href", _brand_to_be_applied.linkedUrl);
                    _dom.attr(_bnd, "title", l);
                    _dom.attr(j[3], "data-brandid", _brand_to_be_applied.brandId);
                    _dom.attr(j[3], "offset-brandfly", "17,0");
                    _dom.html(j[1], "[" + _brand_to_be_applied.brandName + "]");
                    _dom.html(j[2], i);
                    if (_brand_to_be_applied.isCol && _isLogin) {
                        _dom.removeClass(j[3], "mark j_CollectBrand");
                        _dom.html(_dom.get("b", j[3]), "\u60a8\u5df2\u5173\u6ce8\u8be5\u54c1\u724c")
                    } else {
                        _dom.addClass(j[3], "mark");
                        if (!_dom.get("b", j[3])) {
                            _dom.append(_dom.create("<b>\u5173\u6ce8</b>"), j[3])
                        }
                    }
                    var h = _dom.create(_str_img_snippet);
                    _dom.prepend(h, _bnd);
                    _dom.hide(h);
                    setTimeout(function () {
                        _kissy.one(j[0]).fadeOut(0.5);
                        _kissy.one(h).fadeIn(0.8)
                    }, e);
                    e += d
                })
            })
        },
        initBrandBar: function () {
            var S = 32;

            function Z() {
                if (!_kissy.onTgalleryReady) {
                    if (S > 0) {
                        setTimeout(Z, 512)
                    }
                    S--;
                    return
                }
                _kissy.use("tgallery/department/common/brandbar", function (a, c) {
                    var b = function (f) {
                        var d = _dom.get("s", f);
                        var e = _dom.get("b", f);
                        _dom.css(f, {
                            opacity: "0.9"
                        });
                        _dom.css(d, {
                            "background-color": "#b90000"
                        });
                        _dom.html(e, "\u60a8\u5df2\u5173\u6ce8\u8be5\u54c1\u724c");
                        _dom.removeClass(f, "mark");
                        _event.detach(d, "click")
                    };
                    c.on("success", function (d) {
                        if (d.flyNode) {
                            b(d.flyNode)
                        }
                    });
                    c.on("error", function (d) {
                        if (d.code && d.code == "-1" && d.flyNode) {
                            b(d.flyNode)
                        }
                    })
                })
            }
            Z()
        },
        brandHover: function () {
            var _brand = this;
            _kissy.each(_dom.query(_config.brands), function (_dom_a_brand) {
                _event.on(_dom_a_brand, "mouseenter mouseleave", function (_event) {
                    var _opacity = _event.type === "mouseenter" ? 0.9 : 0;
                    var _span = _dom.get("span", _dom_a_brand);
                    if (_dom.hasClass(_span, "mark") && !_span.isMarking && !_g_config.closeExtra) {
                        _event.halt();
                        if (_span.hoverTimer) {
                            clearTimeout(_span.hoverTimer)
                        }
                        _span.hoverTimer = setTimeout(function () {
                            new _kissy.Anim(_span, {
                                opacity: _opacity
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                    if (_kissy.UA.ie) {
                        var _color = _event.type === "mouseenter" ? "#BD0000" : "#999";
                        if (_dom_a_brand.hoverTimer) {
                            clearTimeout(_dom_a_brand.hoverTimer)
                        }
                        _dom_a_brand.hoverTimer = setTimeout(function () {
                            new _kissy.Anim(_dom_a_brand, {
                                color: _color
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                })
            })
        },
        brandMark: function () {
            var S = this;
            _kissy.each(_dom.query(_config.marks), function (a) {
                var Z = _dom.get("s", a);
                _event.on(a, "mouseenter mouseleave", function (b) {
                    var c = b.type === "mouseenter" ? "#b90000" : "#C3C3C3";
                    if (_dom.hasClass(a, "mark") && !a.isMarking && !_g_config.closeExtra) {
                        if (Z.markTimer) {
                            clearTimeout(Z.markTimer)
                        }
                        Z.markTimer = setTimeout(function () {
                            new _kissy.Anim(Z, {
                                "background-color": c
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                });
                _event.on(Z, "mouseenter mouseleave", function (c) {
                    var d = c.type === "mouseenter" ? "108" : "10px";
                    var b = c.type === "mouseenter" ? "0.6" : "0";
                    if (!_dom.hasClass(a, "mark") && !a.isMarking && !_g_config.closeExtra) {
                        if (Z.markTimer) {
                            clearTimeout(Z.markTimer)
                        }
                        Z.markTimer = setTimeout(function () {
                            new _kissy.Anim(_dom.get("b", a), {
                                width: d,
                                opacity: b
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                })
            })
        },
        bigBrandHover: function () {
            _event.on(_config.bigBrand, "mouseenter mouseleave", function (Z) {
                var b = _dom.get("p", _config.bigBrand);
                if (!_kissy.UA.ie) {
                    _dom.toggleClass(b, "hovered")
                } else {
                    var S = Z.type === "mouseenter" ? 0 : 27;
                    var a = Z.type === "mouseenter" ? "#fff" : "#513a16";
                    if (b.moveTimer) {
                        clearTimeout(b.moveTimer)
                    }
                    b.moveTimer = setTimeout(function () {
                        _kissy.Anim(_dom.get("b", b), {
                            color: a
                        }, 0.5, "easeOutStrong").run();
                        _kissy.Anim(_dom.get("span", b), {
                            top: S
                        }, 0.5, "easeOutStrong").run()
                    }, 200)
                }
            })
        },
        temaiHover: function () {
            _event.on(_config.temai, "mouseenter mouseleave", function (a) {
                var S = _dom.get("p", _config.temai);
                if (!_kissy.UA.ie) {
                    _dom.toggleClass(S, "hovered")
                } else {
                    var Z = a.type === "mouseenter" ? 0 : 20;
                    if (S.moveTimer) {
                        clearTimeout(S.moveTimer)
                    }
                    S.moveTimer = setTimeout(function () {
                        _kissy.Anim(_dom.get("span", S), {
                            top: Z
                        }, 0.5, "easeOutStrong").run()
                    }, 200)
                }
            })
        },
        _getLogin: function () {
            TB.Global.loginStatusReady(function (_userinfo) {
                _isLogin = _userinfo.isLogin;
                _nickname = _userinfo.nick;
                if (_nickname != "") {
                    _dom.html(".j_UserName", _nickname)
                }
            })
        },
        _init: function () {
            var _brand = this;
            _config = _brand.config;
            _kissy.ready(function () {
                if (!_g_config.closeExtra) {
                    _brand.brandRecommend()
                }
                _brand._getLogin();
                _brand.brandHover();
                _brand.initBrandBar();
                _brand.brandMark();
                _brand.bigBrandHover();
                _brand.temaiHover()
            })
        }
    });
    return Brand
}, {
    requires: ["template", "2012/util/util"]
});