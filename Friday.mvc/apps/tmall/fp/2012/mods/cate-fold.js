KISSY.add("2012/mods/cate-fold", function (_kissy_F, _anim) {
    var _dom = _kissy_F.DOM,
		_event = _kissy_F.Event;
    var _window = window,
		_document = document;
    var _g_config = _window.g_config;
    var _mfp = _window.MFP;
    var A = "J_Category";
    var N = "cateFixed";
    var U = "cateLocked";
    var O = "j_ExpandCat";
    var K = "j_SimpleCat";
    var H = "selectedCat";
    var D = "item-col";
    var I = "itemSelected";
    var J = 100;
    var G = 14;
    var L = "static";
    var T = "fixed";
    var R = 200;
    var M = _dom.query(".j_MenuItem");
    var B = _dom.height(M[0]);
    var V = M.length;
    var P = _dom.viewportHeight() / 10;

    function C() {
        C.superclass.constructor.call(this);
        this._init()
    }
    _kissy_F.extend(C, _kissy_F.Base);
    C.ATTRS = {
        status: {
            value: L
        },
        section: {
            value: 0,
            setter: function (S) {
                var b = S - J;
                b = b > 0 ? b : 0;
                return Math.min(parseInt(b / P), V + 1)
            }
        },
        scrollTop: {
            value: 0
        },
        locked: {
            value: false
        }
    };
    _kissy_F.augment(C, _kissy_F.EventTarget, {
        cate: _kissy_F.get("#" + A),
        switchBtn: [_kissy_F.get("." + O), _kissy_F.get("." + K)],
        _init: function () {
            var S = this;
            if (!S.cate) {
                return
            }
            S.cateOffsetTop = _dom.offset(S.cate).top;
            S.animArr = [];
            S._bindEvent();
            _dom.show(S.switchBtn);
            S._initCateStatus(_dom.scrollTop(_window), !!_g_config.cateLocked);
            S._hoverExpand()
        },
        _bindEvent: function () {
            var S = this;
            S.on("afterStatusChange", function (b) {
                if (b.newVal === T) {
                    _dom.addClass(S.cate, N)
                } else {
                    _dom.removeClass(S.cate, N)
                }
            });
            S.on("afterScrollTopChange", function (b) {
                S.set("section", b.newVal)
            });
            S.on("afterSectionChange", function (b) {
                b.newVal === V + 1 ? _dom.hide(S.switchBtn) : _dom.show(S.switchBtn);
                !S.get("locked") && b.prevVal !== b.newVal && S._processFold(b.newVal)
            });
            S.on("afterLockedChange", function (b) { });
            _event.on(S.switchBtn, "click", function (b) {
                S._switchCat(b)
            });
            _event.on(_window, "scroll", function () {
                var b = _dom.scrollTop(_window);
                var c = S.scrollTimer;
                if (c) {
                    clearTimeout(c)
                }
                S.scrollTimer = setTimeout(function () {
                    S.set("scrollTop", b)
                }, R);
                S._scrollFixed(b)
            })
        },
        _switchCat: function (d) {
            if (_dom.hasClass(d.target, H)) {
                return
            }
            var S = this;
            var c = S.switchBtn[0];
            var e = S.switchBtn[1];
            if (d.target === c) {
                _dom.addClass(c, H);
                _dom.removeClass(e, H);
                if (!_kissy_F.UA.ie) {
                    for (var b = 0; b < V; b++) {
                        _dom.css(M[b], {
                            height: "auto"
                        });
                        _dom.removeClass(M[b], "itemHover")
                    }
                    S.set("locked", false)
                } else {
                    _kissy_F.later(function () {
                        S._processFold(1, true);
                        S.set("locked", false)
                    }, 10)
                }
                _mfp.ATP.log("3.1", 1);
                _mfp.ATP.gm({
                    cate_fold: 1
                });
                _mfp.foldBtn = false
            } else {
                _dom.removeClass(c, H);
                _dom.addClass(e, H);
                if (!_kissy_F.UA.ie) {
                    for (var b = 0; b < V; b++) {
                        _dom.height(M[b], G);
                        _dom.replaceClass(M[b], I, "itemHover")
                    }
                    S.set("locked", true)
                } else {
                    S._processFold(V + 1, false);
                    S.set("locked", true)
                }
                _mfp.ATP.log("3.1", 2);
                _mfp.ATP.gm({
                    cate_fold: 2
                });
                _mfp.foldBtn = true
            }
        },
        _initCateStatus: function (f, b) {
            var S = this;
            if (f > S.cateOffsetTop) {
                S.set("status", T);
                S.set("scrollTop", f)
            }
            if (b) {
                var d = S.switchBtn[0];
                var e = S.switchBtn[1];
                _dom.removeClass(d, H);
                _dom.addClass(e, H);
                if (!_kissy_F.UA.ie) {
                    for (var c = 0; c < V; c++) {
                        _dom.height(M[c], G);
                        _dom.replaceClass(M[c], I, "itemHover")
                    }
                    S.set("locked", true)
                } else {
                    S._processFold(V + 1, false);
                    S.set("locked", true)
                }
                _mfp.foldBtn = true
            }
        },
        _scrollFixed: function (b) {
            var S = this;
            S.set("status", b > S.cateOffsetTop ? T : L)
        },
        _clearAnimArr: function () {
            var S = this;
            _kissy_F.each(S.animArr, function (b) {
                b && b.stop(true);
                S.animArr.shift(b)
            })
        },
        _processFold: function (c, S) {
            var b = this;
            b._clearAnimArr();
            for (var d = 0; d < V; d++) {
                b._correctCell(M[d], d >= c - 1, S)
            }
        },
        _correctCell: function (c, b, S) {
            if (_kissy_F.UA.ie) {
                b ? _dom.removeClass(c, I) : "";
                var d = new _kissy_F.Anim(c, {
                    height: (b ? B : G) + "px"
                }, 0.5, "linear", function () {
                    b ? "" : _dom.addClass(c, I)
                });
                this.animArr.push(d);
                setTimeout(function () {
                    d.run()
                }, 100)
            } else {
                _kissy_F.each(_kissy_F.query("." + D), function (g, e) {
                    var f;
                    !(f = _kissy_F.get("b", g)) && _dom.append((f = _dom.create('<b class="overlay ' + (e == 1 ? "odd" : "even") + '"></b>')), g)
                });
                b ? _dom.removeClass(c, I) : _dom.addClass(c, I)
            }
        },
        _hoverCell: function (c, b) {
            var S = this;
            if (_kissy_F.UA.ie) {
                b ? _dom.removeClass(c, I) : _dom.addClass(c, I)
            }
            _dom.height(c, (b ? B : G) + "px")
        },
        _hoverExpand: function () {
            var b = this;
            var S, e;
            _kissy_F.each(M, function (g, f) {
                _event.on(g, "mouseenter", function (h) {
                    if (!b.get("locked")) {
                        return
                    }
                    if (_mfp.triggerIdx !== null && _mfp.triggerIdx !== f) {
                        b._hoverCell(M[_mfp.triggerIdx], false)
                    }
                    b._hoverCell(g, true);
                    _mfp.triggerIdx = f
                })
            });
            var d = _kissy_F.get(".categoryHd");
            var c = function () {
                if (!b.get("locked")) {
                    return
                }
                _mfp.triggerIdx != null && b._hoverCell(M[_mfp.triggerIdx], false);
                _mfp.triggerIdx = null
            };
            _event.on(b.cate, "mouseleave", function (f) {
                c()
            });
            _event.on(d, "mouseenter", function (f) {
                c()
            })
        }
    });
    return C
}, {
    require: ["anim"]
});