KISSY.add("wangpu/decoration/init", function (f, g, l, b, d, a, c, e) {
    var i = document,
		k = f.DOM,
		j = f.Event;

    function h(n) {
        var m = this;
        m._mod = n.mod;
        m._context = n;
        if (!m._mod) {
            return
        }
        m.init()
    }
    f.augment(h, {
        init: function () {
            var p = (new Date).getTime();
            f.log("Decoration init start");
            var o = this,
				n = o._context.pageType;
            if (!n) {
                n = "wangpu"
            }
            switch (n) {
                case "wangpu":
                    o.initForShopPage();
                    break;
                default:
                    o.initForOtherPage()
            }
            var m = (new Date).getTime();
            f.log("Decoration init end");
            f.log("Decoration init spend time ms:" + (m - p))
        },
        initForShopPage: function () {
            var m = this;
            f.ready(function () {
                m.initWidget("J_TWidget", m._mod);
                m.initPicLazyload();
                m.initCartPlugin();
                m.initISV();
                m.initBuriedStatistics();
                m.handleDesignEntr()
            })
        },
        initForOtherPage: function () {
            var m = this;
            f.ready(function () {
                m.initWidget("J_TWidget", m._mod);
                m.initPicLazyload();
                m.initCartPlugin();
                m.initISV()
            })
        },
        preprocessImg: function () {
            var o = [],
				n = 0,
				m = 0;
            if (!f.isArray(this._context.lazyContainers)) {
                o[0] = this._context.lazyContainers
            } else {
                o = this._context.lazyContainers
            }
            f.each(o, function (p) {
                f.each(k.query("img", p), function (q) {
                    if (!q.offsetWidth && k.attr(q, "data-ks-lazyload")) {
                        k.attr(q, "src", k.attr(q, "data-ks-lazyload"));
                        k.removeAttr(q, "data-ks-lazyload");
                        m++
                    }
                    n++
                })
            });
            f.log("img nums:" + n);
            f.log("display none img nums:" + m)
        },
        initPicLazyload: function () {
            this.preprocessImg();
            new c(this._context.lazyContainers, {
                mod: "manual",
                diff: {
                    left: 9999,
                    right: 9999,
                    top: 0,
                    bottom: 500
                }
            })
        },
        initWidget: function (t, n) {
            var v = this;
            var o = (new Date).getTime();
            t = "." + (t || "KS_Widget");
            var m = {
                switchable: "Tabs Slide Carousel Accordion",
                overlay: "Popup",
                compatible: "Compatible",
                countdown: "Countdown"
            }, p, x = f.query(t, "#content");
            q();

            function q() {
                f.later(function () {
                    if (x.length !== 0) {
                        s(x.shift());
                        q()
                    }
                }, 0)
            }
            function s(B) {
                var A = B.getAttribute("data-widget-type"),
					y;
                if (!A) {
                    return
                }
                try {
                    y = B.getAttribute("data-widget-config");
                    if (y) {
                        y = y.replace(/'/g, '"')
                    }
                    y = f.JSON.parse(y);
                    switch (true) {
                        case m.switchable.indexOf(A) > -1:
                            r(B, f.merge(l.Config, f.merge(l[A].Config, y)));
                            if (A == "Carousel" && !(k.get("." + y.prevBtnCls, B) && k.get("." + y.nextBtnCls, B))) {
                                new l(B, f.merge(y, {
                                    lazyDataType: "img-src"
                                }))
                            } else {
                                new l[A](B, f.merge(y, {
                                    lazyDataType: "img-src"
                                }))
                            }
                            break;
                        case m.overlay.indexOf(A) > -1:
                            w(y, B);
                            break;
                        case m.compatible.indexOf(A) > -1:
                            if (f.UA.ie && f.UA.ie < 7) {
                                new d(B, y)
                            }
                            break;
                        case m.countdown.indexOf(A) > -1:
                            new a(B, y.endTime, y);
                            break;
                        default:
                            f.log("\u5728kissy\u5e93\u4e2d\u6ca1\u6709\u67e5\u627e\u5230\u4f60\u60f3\u8981\u521d\u59cb\u5316\u7684\u7ec4\u4ef6")
                    }
                } catch (z) {
                    f.log("widget " + z, "warn")
                }
            }
            function r(y, z) {
                var H = z.activeIndex;
                if (H > -1) { } else {
                    if (typeof z.switchTo == "number") { } else {
                        H = 0
                    }
                }
                var B, D = ".",
					C, F = z.steps,
					G = H * F,
					A = [];
                var E = y.getAttribute("data-widget-type");
                switch (z.markupType) {
                    case 0:
                        B = k.get(D + z.contentCls, y);
                        C = k.children(B);
                        break;
                    case 1:
                        C = k.query(D + z.panelCls, y);
                        break;
                    case 2:
                        C = z.panels;
                        break
                }
                f.each(C, function (I, J) {
                    if (G <= J && J < G + F) {
                        f.each(k.query("img", I), function (K) {
                            if (k.attr(K, "data-ks-lazyload")) {
                                k.attr(K, "src", k.attr(K, "data-ks-lazyload"));
                                k.removeAttr(K, "data-ks-lazyload")
                            }
                        })
                    } else {
                        A = A.concat(k.query("img", I));
                        if (E == "Slide") {
                            k.css(I, "display", "none")
                        }
                    }
                });
                f.each(A, function (I) {
                    if (k.attr(I, "data-ks-lazyload")) {
                        k.attr(I, "data-ks-lazyload-custom", k.attr(I, "data-ks-lazyload"));
                        k.removeAttr(I, "data-ks-lazyload")
                    }
                })
            }
            function w(A, D) {
                if (!("type" in A)) {
                    if (!A.content) {
                        A.type = "one-one"
                    } else {
                        A.type = "multi-one"
                    }
                }
                if (!A.triggerType) {
                    A.triggerType = "mouse"
                }
                if (!A.zIndex || A.zIndex > 299 || A.zIndex < 200) {
                    A.zIndex = 299
                }
                if (A.type == "one-one") {
                    new b.Popup({
                        trigger: k.get(A.trigger, v._mod),
                        triggerType: A.triggerType,
                        srcNode: D,
                        elStyle: {
                            display: "block",
                            visibility: "hidden",
                            position: "absolute",
                            left: "-9999px",
                            top: "-9999px"
                        },
                        align: A.align,
                        zIndex: A.zIndex
                    })
                } else {
                    var z = new b({
                        effect: A.effect ? A.effect : {},
                        zIndex: A.zIndex
                    });
                    var y = k.get(A.container),
						B = k.query(A.trigger, y),
						C = k.query(A.content, y);
                    f.each(B, function (F, E) {
                        var G, H;
                        j.on(F, "mouseenter", function () {
                            if (G) {
                                G.cancel()
                            }
                            G = f.later(function () {
                                if (C[E]) {
                                    z.set("content", C[E].value);
                                    z.set("align", f.merge(A.align, {
                                        node: F
                                    }));
                                    z.show()
                                }
                                G.cancel()
                            }, 100)
                        });
                        j.on(F, "mouseleave", function () {
                            if (H) {
                                H.cancel()
                            }
                            H = f.later(function () {
                                z.hide();
                                H.cancel()
                            }, 100)
                        })
                    })
                }
            }
            var u = (new Date).getTime();
            f.log("widget init spend time ms:" + (u - o))
        },
        initCartPlugin: function () {
            var m = this;
            if (k.get(".J_CartPluginTrigger")) {
                f.getScript("http://a.tbcdn.cn/apps/cart/plugin/1.2/cartplugin.js", function () {
                    if (typeof CartPlugin !== "undefined") {
                        CartPlugin.init(m._mod, {
                            preventAll: true
                        })
                    }
                })
            }
        },
        initBuriedStatistics: function () {
            f.getScript("http://a.tbcdn.cn/apps/lz/hc.js?v=5");
            f.getScript("http://a.tbcdn.cn/s/tb-tracer-min.js?t=20110628")
        },
        initISV: function () {
            e.init(this._context.isvParams)
        },
        handleDesignEntr: function () {
            if (window.shop_config && window.login_config) {
                if (shop_config.userId == login_config.loginUserId) {
                    k.removeClass("#J_DesignPage", "hidden")
                }
            }
        }
    });
    h.selector = "#content";
    h.type = "decoration";
    return h
}, {
    requires: ["core", "switchable", "overlay", "./compatible", "./countdown", "datalazyload", "./isv"]
});