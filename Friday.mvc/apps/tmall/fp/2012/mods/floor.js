KISSY.add("2012/mods/floor", function (_kissy, _dom, _event, _switchable, _util, _directpromo) {
    var _window = window,
		_mfp = _window.MFP;
    var _g_config = _window.g_config;
    var _recommend_url = "http://ald.taobao.com/recommend.htm?appId=12003";
    var _str_data_src = "data-src";

    function Floor(_dom_selector) {
        if (!_dom_selector) {
            return
        }
        this.floor = _kissy.get(_dom_selector);
        this.floorID = _dom_selector.split("#floor")[1];
        this._init()
    }
    _kissy.augment(Floor, _kissy.EventTarget, {
        _init: function () {
            var _floor = this;
            _floor._initSlide();
            _kissy.each(_kissy.query(".j_SlideBanner", _floor.floor), function (_dom_div_class_j_SlideBanner) {
                _floor._slideBanner(_dom_div_class_j_SlideBanner)
            });
            _floor._imgSlide();
            _directpromo.render();
            _floor._renderDefData()
        },
        _requestAld: function () {
            var _floor = this;
            if (_mfp.floorData) {
                _floor._renderFloorLogo(_mfp.floorData)
            } else {
                if (_mfp.isFloorDataLoad) {
                    _mfp.on("floorDataLoad", function () {
                        _floor._renderFloorLogo(_mfp.floorData)
                    });
                    setTimeout(function () {
                        _floor._renderDefData()
                    }, 300)
                } else {
                    _mfp.isFloorDataLoad = true;
                    _kissy.jsonp(_recommend_url, {
                        t: +new Date
                    }, function (N) {
                        if (!N) {
                            return
                        }
                        _floor._renderFloorLogo(N);
                        _mfp.floorData = N;
                        _mfp.fire("floorDataLoad");
                        if (N.atpanelUrl && N.atpanelUrl !== "") {
                            _mfp.ATP.aldAc(N.atpanelUrl)
                        }
                    });
                    setTimeout(function () {
                        _floor._renderDefData()
                    }, 300)
                }
            }
        },
        _renderFloorLogo: function (O) {
            var _floor = this;
            var T = O[parseInt(_floor.floorID)];
            if (!(T && _kissy.isArray(T) && T.length >= 14)) {
                _floor._renderDefData();
                return
            }
            var U = _kissy.get(".j_aldLogo", _floor.floor);
            var R = _dom.children(_kissy.get(".fCl-slide", U));
            var Q = T.slice(0, 5);
            var P = T.slice(5, 10);
            var N = T.slice(10, 14);
            var M = _floor.logoSlide.activeIndex;
            _kissy.each([Q, P, N], function (Y, W) {
                var V = R[W];
                var Z = "";
                _kissy.each(Y, function (a) {
                    Z += '<a href="' + a.linkedUrl + '" title="' + a.brandName + '" target="_blank"><img width="90" height="45" ' + (M == W ? "src" : "data-src") + '="' + _util.randomImgUrl(a.logo) + '" /></a>'
                });
                if (W == 2) {
                    var X = _dom.children(V)[4];
                    Z += '<a href="' + _dom.attr(X, "href") + '" title="" target="_blank">\u66f4\u591a\u54c1\u724c>></a>'
                }
                _dom.html(V, Z)
            })
        },
        _renderDefData: function () {
            var _logoSlide = this.logoSlide;
            if (!_logoSlide) {
                return
            }
            var _panel = _logoSlide.panels[_logoSlide.activeIndex];
            _kissy.each(_kissy.query("img", _panel), function (_dom_img) {
                if (_dom.hasAttr(_dom_img, _str_data_src)) {
                    _dom_img.src = _dom.attr(_dom_img, _str_data_src);
                    _dom.removeAttr(_dom_img, _str_data_src)
                }
            })
        },
        _initSlide: function () {
            var _floor = this;
            var _dom_class_j_aldLogo = _kissy.get(".j_aldLogo", _floor.floor);
            _floor.logoSlide = new _switchable.Slide(_dom_class_j_aldLogo, {
                contentCls: "fCl-slide",
                navCls: "fCl-nav",
                activeTriggerCls: "active",
                effect: "scrollx",
                easing: "easeOut",
                autoplay: false,
                lazyDataType: "img-src",
                duration: 0.3,
                triggerType: "mouse"
            });
            _floor.logoSlide.switchTo(parseInt(Math.random() * 3));
            _floor._slideLazyLoad()
        },
        _slideLazyLoad: function () {
            var _logoSlide = this.logoSlide;
            _logoSlide.on("beforeSwitch", function (_op) {
                var _panel = _logoSlide.panels[_op.toIndex];
                _kissy.each(_kissy.query("img", _panel), function (_dom_img) {
                    if (_dom.hasAttr(_dom_img, _str_data_src)) {
                        _dom_img.src = _dom.attr(_dom_img, _str_data_src);
                        _dom.removeAttr(_dom_img, _str_data_src)
                    }
                })
            })
        },
        _slideNav: function (_dom_div_j_SlideBanner) {
            var _doms_li_class_fCs_nav = _kissy.get(".fCs-nav", _dom_div_j_SlideBanner);
            var _init_speed = 50;
            var _load_times = 0;
            _kissy.each(_doms_li_class_fCs_nav.childNodes, function (_dom_li_class_fCs_nav) {
                if (_dom_li_class_fCs_nav.nodeType === 1) {
                    setTimeout(function () {
                        _kissy.Anim(_dom_li_class_fCs_nav, {
                            left: "220px"
                        }, 0.5, "easeOutStrong").run()
                    }, _init_speed);
                    _init_speed += 80
                }
                if (_kissy.UA.ie && _load_times == 0) {
                    _dom.css(_dom_li_class_fCs_nav, {
                        width: "160px"
                    });
                    _load_times++
                }
            })
        },
        _slideBanner: function (_dom_div_j_SlideBanner) {
            this._slideNav(_dom_div_j_SlideBanner);
            var _options = {
                contentCls: "fCs-con",
                navCls: "fCs-nav",
                activeTriggerCls: "active",
                effect: "scrollx",
                easing: "easeOut",
                autoplay: false,
                lazyDataType: "img-src",
                view: [200, 320],
                duration: 0.5,
                triggerType: "mouse"
            };
            this.slide = new _switchable.Slide(_dom_div_j_SlideBanner, _options);
            if (_kissy.UA.ie) {
                var _old_index = 0;
                var _doms_li_parent_class_fCs_nav = _dom.children(_kissy.get(".fCs-nav", _dom_div_j_SlideBanner));
                this.slide.on("beforeSwitch", function (_data) {
                    var _dom_li = _doms_li_parent_class_fCs_nav[_data.toIndex];
                    if (_dom_li.hoverTimer) {
                        clearTimeout(_dom_li.hoverTimer)
                    }
                    _dom_li.hoverTimer = setTimeout(function () {
                        _kissy.Anim(_doms_li_parent_class_fCs_nav[_data.toIndex], {
                            width: "160px"
                        }, 0.2, "linear").run();
                        _kissy.Anim(_doms_li_parent_class_fCs_nav[_old_index], {
                            width: "140px"
                        }, 0.2, "linear").run();
                        _old_index = _data.toIndex
                    }, 100)
                })
            }
        },
        _imgSlide: function () {
            if (_kissy.UA.ie) {
                var _dom_div_class_j_HoverImg = _kissy.get(".j_HoverImg", this.floor);
                _kissy.each(_dom.query(".floorPro-img", _dom_div_class_j_HoverImg), function (_dom_img_class_floorPro_img) {
                    _event.on(_dom_img_class_floorPro_img, "mouseenter mouseleave", function (_event) {
                        var _margin_left = _event.type === "mouseenter" ? "-50px" : "110px";
                        if (_dom_img_class_floorPro_img.hoverTimer) {
                            clearTimeout(_dom_img_class_floorPro_img.hoverTimer)
                        }
                        _dom_img_class_floorPro_img.hoverTimer = setTimeout(function () {
                            _kissy.Anim(_dom_img_class_floorPro_img, {
                                "margin-left": _margin_left
                            }, 0.3, "linear").run()
                        }, 100)
                    })
                })
            }
        }
    });
    return Floor
}, {
    requires: ["dom", "event", "switchable", "2012/util/util", "2012/mods/direct-promo"]
});