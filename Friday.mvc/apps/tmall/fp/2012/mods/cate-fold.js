KISSY.add("2012/mods/cate-fold", function (F, Y) {
    var W = F.DOM,
		Z = F.Event;
    var E = window,
		a = document;
    var X = E.g_config;
    var Q = E.MFP;
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
    var M = W.query(".j_MenuItem");
    var B = W.height(M[0]);
    var V = M.length;
    var P = W.viewportHeight() / 10;

    function C() {
        C.superclass.constructor.call(this);
        this._init()
    }
    F.extend(C, F.Base);
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
    F.augment(C, F.EventTarget, {
        cate: F.get("#" + A),
        switchBtn: [F.get("." + O), F.get("." + K)],
        _init: function () {
            var S = this;
            if (!S.cate) {
                return
            }
            S.cateOffsetTop = W.offset(S.cate).top;
            S.animArr = [];
            S._bindEvent();
            W.show(S.switchBtn);
            S._initCateStatus(W.scrollTop(E), !!X.cateLocked);
            S._hoverExpand()
        },
        _bindEvent: function () {
            var S = this;
            S.on("afterStatusChange", function (b) {
                if (b.newVal === T) {
                    W.addClass(S.cate, N)
                } else {
                    W.removeClass(S.cate, N)
                }
            });
            S.on("afterScrollTopChange", function (b) {
                S.set("section", b.newVal)
            });
            S.on("afterSectionChange", function (b) {
                b.newVal === V + 1 ? W.hide(S.switchBtn) : W.show(S.switchBtn);
                !S.get("locked") && b.prevVal !== b.newVal && S._processFold(b.newVal)
            });
            S.on("afterLockedChange", function (b) { });
            Z.on(S.switchBtn, "click", function (b) {
                S._switchCat(b)
            });
            Z.on(E, "scroll", function () {
                var b = W.scrollTop(E);
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
            if (W.hasClass(d.target, H)) {
                return
            }
            var S = this;
            var c = S.switchBtn[0];
            var e = S.switchBtn[1];
            if (d.target === c) {
                W.addClass(c, H);
                W.removeClass(e, H);
                if (!F.UA.ie) {
                    for (var b = 0; b < V; b++) {
                        W.css(M[b], {
                            height: "auto"
                        });
                        W.removeClass(M[b], "itemHover")
                    }
                    S.set("locked", false)
                } else {
                    F.later(function () {
                        S._processFold(1, true);
                        S.set("locked", false)
                    }, 10)
                }
                Q.ATP.log("3.1", 1);
                Q.ATP.gm({
                    cate_fold: 1
                });
                Q.foldBtn = false
            } else {
                W.removeClass(c, H);
                W.addClass(e, H);
                if (!F.UA.ie) {
                    for (var b = 0; b < V; b++) {
                        W.height(M[b], G);
                        W.replaceClass(M[b], I, "itemHover")
                    }
                    S.set("locked", true)
                } else {
                    S._processFold(V + 1, false);
                    S.set("locked", true)
                }
                Q.ATP.log("3.1", 2);
                Q.ATP.gm({
                    cate_fold: 2
                });
                Q.foldBtn = true
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
                W.removeClass(d, H);
                W.addClass(e, H);
                if (!F.UA.ie) {
                    for (var c = 0; c < V; c++) {
                        W.height(M[c], G);
                        W.replaceClass(M[c], I, "itemHover")
                    }
                    S.set("locked", true)
                } else {
                    S._processFold(V + 1, false);
                    S.set("locked", true)
                }
                Q.foldBtn = true
            }
        },
        _scrollFixed: function (b) {
            var S = this;
            S.set("status", b > S.cateOffsetTop ? T : L)
        },
        _clearAnimArr: function () {
            var S = this;
            F.each(S.animArr, function (b) {
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
            if (F.UA.ie) {
                b ? W.removeClass(c, I) : "";
                var d = new F.Anim(c, {
                    height: (b ? B : G) + "px"
                }, 0.5, "linear", function () {
                    b ? "" : W.addClass(c, I)
                });
                this.animArr.push(d);
                setTimeout(function () {
                    d.run()
                }, 100)
            } else {
                F.each(F.query("." + D), function (g, e) {
                    var f;
                    !(f = F.get("b", g)) && W.append((f = W.create('<b class="overlay ' + (e == 1 ? "odd" : "even") + '"></b>')), g)
                });
                b ? W.removeClass(c, I) : W.addClass(c, I)
            }
        },
        _hoverCell: function (c, b) {
            var S = this;
            if (F.UA.ie) {
                b ? W.removeClass(c, I) : W.addClass(c, I)
            }
            W.height(c, (b ? B : G) + "px")
        },
        _hoverExpand: function () {
            var b = this;
            var S, e;
            F.each(M, function (g, f) {
                Z.on(g, "mouseenter", function (h) {
                    if (!b.get("locked")) {
                        return
                    }
                    if (Q.triggerIdx !== null && Q.triggerIdx !== f) {
                        b._hoverCell(M[Q.triggerIdx], false)
                    }
                    b._hoverCell(g, true);
                    Q.triggerIdx = f
                })
            });
            var d = F.get(".categoryHd");
            var c = function () {
                if (!b.get("locked")) {
                    return
                }
                Q.triggerIdx != null && b._hoverCell(M[Q.triggerIdx], false);
                Q.triggerIdx = null
            };
            Z.on(b.cate, "mouseleave", function (f) {
                c()
            });
            Z.on(d, "mouseenter", function (f) {
                c()
            })
        }
    });
    return C
}, {
    require: ["anim"]
});