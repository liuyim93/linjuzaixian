KISSY.add("2012/mods/floor", function (_kissy, _dom, _event, _switchable, _util, _directpromo) {
    var _window = window,
		_mfp = _window.MFP;
    var _g_config = _window.g_config;
    var _recommend_url = "http://ald.taobao.com/recommend.htm?appId=12003";
    var _str_data_src = "data-src";

    function Floor(M) {
        if (!M) {
            return
        }
        this.floor = _kissy.get(M);
        this.floorID = M.split("#floor")[1];
        this._init()
    }
    _kissy.augment(Floor, _kissy.EventTarget, {
        _init: function () {
            var _floor = this;
            _floor._initSlide();
            _kissy.each(_kissy.query(".j_SlideBanner", _floor.floor), function (N) {
                _floor._slideBanner(N)
            });
            _floor._imgSlide();
            _directpromo.render();
            _floor._renderDefData()
        },
        _requestAld: function () {
            var M = this;
            if (_mfp.floorData) {
                M._renderFloorLogo(_mfp.floorData)
            } else {
                if (_mfp.isFloorDataLoad) {
                    _mfp.on("floorDataLoad", function () {
                        M._renderFloorLogo(_mfp.floorData)
                    });
                    setTimeout(function () {
                        M._renderDefData()
                    }, 300)
                } else {
                    _mfp.isFloorDataLoad = true;
                    _kissy.jsonp(_recommend_url, {
                        t: +new Date
                    }, function (N) {
                        if (!N) {
                            return
                        }
                        M._renderFloorLogo(N);
                        _mfp.floorData = N;
                        _mfp.fire("floorDataLoad");
                        if (N.atpanelUrl && N.atpanelUrl !== "") {
                            _mfp.ATP.aldAc(N.atpanelUrl)
                        }
                    });
                    setTimeout(function () {
                        M._renderDefData()
                    }, 300)
                }
            }
        },
        _renderFloorLogo: function (O) {
            var S = this;
            var T = O[parseInt(S.floorID)];
            if (!(T && _kissy.isArray(T) && T.length >= 14)) {
                S._renderDefData();
                return
            }
            var U = _kissy.get(".j_aldLogo", S.floor);
            var R = _dom.children(_kissy.get(".fCl-slide", U));
            var Q = T.slice(0, 5);
            var P = T.slice(5, 10);
            var N = T.slice(10, 14);
            var M = S.logoSlide.activeIndex;
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
        _slideNav: function (N) {
            var P = _kissy.get(".fCs-nav", N);
            var O = 50;
            var M = 0;
            _kissy.each(P.childNodes, function (Q) {
                if (Q.nodeType === 1) {
                    setTimeout(function () {
                        _kissy.Anim(Q, {
                            left: "220px"
                        }, 0.5, "easeOutStrong").run()
                    }, O);
                    O += 80
                }
                if (_kissy.UA.ie && M == 0) {
                    _dom.css(Q, {
                        width: "160px"
                    });
                    M++
                }
            })
        },
        _slideBanner: function (N) {
            this._slideNav(N);
            var P = {
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
            this.slide = new _switchable.Slide(N, P);
            if (_kissy.UA.ie) {
                var M = 0;
                var O = _dom.children(_kissy.get(".fCs-nav", N));
                this.slide.on("beforeSwitch", function (Q) {
                    var R = O[Q.toIndex];
                    if (R.hoverTimer) {
                        clearTimeout(R.hoverTimer)
                    }
                    R.hoverTimer = setTimeout(function () {
                        _kissy.Anim(O[Q.toIndex], {
                            width: "160px"
                        }, 0.2, "linear").run();
                        _kissy.Anim(O[M], {
                            width: "140px"
                        }, 0.2, "linear").run();
                        M = Q.toIndex
                    }, 100)
                })
            }
        },
        _imgSlide: function () {
            if (_kissy.UA.ie) {
                var M = _kissy.get(".j_HoverImg", this.floor);
                _kissy.each(_dom.query(".floorPro-img", M), function (N) {
                    _event.on(N, "mouseenter mouseleave", function (P) {
                        var O = P.type === "mouseenter" ? "-50px" : "110px";
                        if (N.hoverTimer) {
                            clearTimeout(N.hoverTimer)
                        }
                        N.hoverTimer = setTimeout(function () {
                            _kissy.Anim(N, {
                                "margin-left": O
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