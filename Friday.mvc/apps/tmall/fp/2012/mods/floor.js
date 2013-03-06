KISSY.add("2012/mods/floor", function (D, K, I, L, H, G) {
    var F = window,
		J = F.MFP;
    var B = F.g_config;
    var C = "http://ald.taobao.com/recommend.htm?appId=12003";
    var E = "data-src";

    function A(M) {
        if (!M) {
            return
        }
        this.floor = D.get(M);
        this.floorID = M.split("#floor")[1];
        this._init()
    }
    D.augment(A, D.EventTarget, {
        _init: function () {
            var M = this;
            M._initSlide();
            D.each(D.query(".j_SlideBanner", M.floor), function (N) {
                M._slideBanner(N)
            });
            M._imgSlide();
            G.render();
            M._renderDefData()
        },
        _requestAld: function () {
            var M = this;
            if (J.floorData) {
                M._renderFloorLogo(J.floorData)
            } else {
                if (J.isFloorDataLoad) {
                    J.on("floorDataLoad", function () {
                        M._renderFloorLogo(J.floorData)
                    });
                    setTimeout(function () {
                        M._renderDefData()
                    }, 300)
                } else {
                    J.isFloorDataLoad = true;
                    D.jsonp(C, {
                        t: +new Date
                    }, function (N) {
                        if (!N) {
                            return
                        }
                        M._renderFloorLogo(N);
                        J.floorData = N;
                        J.fire("floorDataLoad");
                        if (N.atpanelUrl && N.atpanelUrl !== "") {
                            J.ATP.aldAc(N.atpanelUrl)
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
            if (!(T && D.isArray(T) && T.length >= 14)) {
                S._renderDefData();
                return
            }
            var U = D.get(".j_aldLogo", S.floor);
            var R = K.children(D.get(".fCl-slide", U));
            var Q = T.slice(0, 5);
            var P = T.slice(5, 10);
            var N = T.slice(10, 14);
            var M = S.logoSlide.activeIndex;
            D.each([Q, P, N], function (Y, W) {
                var V = R[W];
                var Z = "";
                D.each(Y, function (a) {
                    Z += '<a href="' + a.linkedUrl + '" title="' + a.brandName + '" target="_blank"><img width="90" height="45" ' + (M == W ? "src" : "data-src") + '="' + H.randomImgUrl(a.logo) + '" /></a>'
                });
                if (W == 2) {
                    var X = K.children(V)[4];
                    Z += '<a href="' + K.attr(X, "href") + '" title="" target="_blank">\u66f4\u591a\u54c1\u724c>></a>'
                }
                K.html(V, Z)
            })
        },
        _renderDefData: function () {
            var M = this.logoSlide;
            if (!M) {
                return
            }
            var N = M.panels[M.activeIndex];
            D.each(D.query("img", N), function (O) {
                if (K.hasAttr(O, E)) {
                    O.src = K.attr(O, E);
                    K.removeAttr(O, E)
                }
            })
        },
        _initSlide: function () {
            var M = this;
            var N = D.get(".j_aldLogo", M.floor);
            M.logoSlide = new L.Slide(N, {
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
            M.logoSlide.switchTo(parseInt(Math.random() * 3));
            M._slideLazyLoad()
        },
        _slideLazyLoad: function () {
            var M = this.logoSlide;
            M.on("beforeSwitch", function (N) {
                var O = M.panels[N.toIndex];
                D.each(D.query("img", O), function (P) {
                    if (K.hasAttr(P, E)) {
                        P.src = K.attr(P, E);
                        K.removeAttr(P, E)
                    }
                })
            })
        },
        _slideNav: function (N) {
            var P = D.get(".fCs-nav", N);
            var O = 50;
            var M = 0;
            D.each(P.childNodes, function (Q) {
                if (Q.nodeType === 1) {
                    setTimeout(function () {
                        D.Anim(Q, {
                            left: "220px"
                        }, 0.5, "easeOutStrong").run()
                    }, O);
                    O += 80
                }
                if (D.UA.ie && M == 0) {
                    K.css(Q, {
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
            this.slide = new L.Slide(N, P);
            if (D.UA.ie) {
                var M = 0;
                var O = K.children(D.get(".fCs-nav", N));
                this.slide.on("beforeSwitch", function (Q) {
                    var R = O[Q.toIndex];
                    if (R.hoverTimer) {
                        clearTimeout(R.hoverTimer)
                    }
                    R.hoverTimer = setTimeout(function () {
                        D.Anim(O[Q.toIndex], {
                            width: "160px"
                        }, 0.2, "linear").run();
                        D.Anim(O[M], {
                            width: "140px"
                        }, 0.2, "linear").run();
                        M = Q.toIndex
                    }, 100)
                })
            }
        },
        _imgSlide: function () {
            if (D.UA.ie) {
                var M = D.get(".j_HoverImg", this.floor);
                D.each(K.query(".floorPro-img", M), function (N) {
                    I.on(N, "mouseenter mouseleave", function (P) {
                        var O = P.type === "mouseenter" ? "-50px" : "110px";
                        if (N.hoverTimer) {
                            clearTimeout(N.hoverTimer)
                        }
                        N.hoverTimer = setTimeout(function () {
                            D.Anim(N, {
                                "margin-left": O
                            }, 0.3, "linear").run()
                        }, 100)
                    })
                })
            }
        }
    });
    return A
}, {
    requires: ["dom", "event", "switchable", "2012/util/util", "2012/mods/direct-promo"]
});