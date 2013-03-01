// JScript source code
KISSY.add(function (E, C) {
        var T = E.DOM, Y = E.Event; var D = window; var M = E.UA.ie == 6;
        var I = E.UA.ie && E.UA.ie < 9;
        var O = !D.g_config.closeSlideAutoPlay;
        var Q = D.g_config.closeTriggerAnim;
        var N = D.MFP;
        var A = "J_MfpSlide";
        var G = "j_SlideTanxAd";
        var P = "j_MSDirect_";
        var L = "J_DirectPromo";
        var U = "j_MaskBanner";
        var X = [285, 333, 337];
        var K = ["mm_12852562_1778064_10953677", "mm_12852562_1778064_10953701"];
        var W = "data-text-src";
        var B = "data-image";
        var V = /^https?:\/\/\S+$/i;
        var H = /^https?:\/\/\S+(png|jpg|gif)$/i;
        var R = /^#[0-9a-fA-F]{6}$/;
        var J = { contentCls: "mfpSlide-con", navCls: "mfpSlide-nav", activeTriggerCls: "selected", effect: "fade", easing: "easeOut", lazyDataType: "img-src", duration: 0.5, triggerType: "mouse", autoplay: O, pauseOnScroll: true, delay: 0.2 };
        function F() {
            var S = this;
            S.mfpSlide = null;
            if (!(this instanceof F))
            { return new F() }
            S._init()
        }
        E.augment(F, E.EventTarget,
            { _init: function () {
                var Z = this; if (!E.get("#" + A))
                { return }
                var S = Z.slide = new C.Slide("#" + A, J);
                D.g_config.Slide = S;
                M && E.ready(function () { Z._fixPng24() });
                S.on("beforeSwitch", function (a) {
                    Z._textAnim(a);
                    Z._lazyLoad(a)
                });
                N.on("directSuccess", function (a) { Z._directImg(a.data) });
                T.show(S.nav);
                //2013-02-19 basilwang remove tanx
                //E.ready(function () { Z._tanxAd() });
                ; Z._hoverMask();
                !O && S.switchTo(parseInt(Math.random() * S.triggers.length))
            }, _lazyLoad: function (b) {
                var S = this.slide;
                var c = S.panels[b.toIndex];
                var a = E.get("b", c);
                var Z = E.get("img", a);
                if (T.hasAttr(c, B) && Z) {
                    T.css(c, "background-image", "url(" + T.attr(c, B) + ")"); !M && T.attr(Z, "src", T.attr(Z, W));
                    T.removeAttr(c, B);
                    T.removeAttr(Z, W)
                }
            },
                _textAnim: function (c) {
                    var S = this.slide;
                    var e = S.panels[S.activeIndex];
                    var d = S.panels[c.toIndex];
                    var b = E.get("b", e);
                    var a = E.get("b", d);
                    var Z = E.get("img", a);
                    !!b && new E.Anim(b, { top: "-40px", opacity: I ? 1 : 0 }, 0.8, "easeOutStrong").run();
                    !!a && new E.Anim(a, { top: "-10px", opacity: 1 }, 0.8, "easeOutStrong").run()
                },
                _directImg: function (a) {
                    if (!(a && E.isArray(a)))
                    { return }
                    var Z = this;
                    var S = Z.slide;
                    E.later(function () {
                            E.each(E.query("." + L, S.content),
                                function (b) {
                                    var c = E.get("a", b);
                                    !E.get("s", c) && T.append(T.create("<s>"), c)
                                })
                        },
                        10);
                    E.each(a,
                        function (g) {
                            if (E.inArray(g.id, X)) {
                                var f = g.content.split(";;");
                                var d = g.link.split(";;");
                                var b = E.get("." + P + g.id);
                                if (!(b && V.test(d[0]) && H.test(f[0]) && H.test(f[1]) && R.test(f[3])))
                                { return }
                                var e = E.get("a", b);
                                var c = E.get("img", E.get("b", b));
                                e.href = d[0];
                                if (T.hasAttr(b, B)) {
                                    T.css(b, "background-color", f[3]);
                                    T.attr(b, B, Z._optimizeImg(f[0]));
                                    M ? Z._fixPng24(c, f[1]) : T.attr(c, W, f[1])
                                }
                                else {
                                    T.css(b, { "background-color": f[3], "background-image": "url(" + Z._optimizeImg(f[0]) + ")" });
                                    M ? Z._fixPng24(c, f[1]) : c.src = f[1]
                                }
                            }
                        })
                },
                //2013-02-17 basilwang we don't need _tanxAdd
                _tanxAd: function () {
                    E.each(K, function (S) {
                        E.getScript("http://p.tanx.com/ex?i=" + S,
                            function () {
                                var b = E.get("#tanx-a-" + S),
                                    Z, c, d = 0;
                                if (!b) { return }
                                Z = T.parent(b, "li");
                                E.later(function () {
                                    c = T.prev(b, "a");
                                    if (!c && d < 30) { setTimeout(arguments.callee, 100); d++ }
                                    else {
                                        var a = E.get("img", c);
                                        var e = E.get("a", Z);
                                        T.css(Z, "background-image", "url(" + a.src + ")");
                                        e.href = c.href; T.hide("." + G)
                                    }
                                }, 20)
                            })
                    })
                }
                , _hoverMask: function () {
                var S = this;
                var Z = E.all("." + U, S.slide.container);
                E.each(Z, function (b) {
                    var a = E.query("li", b);
                    Y.on(a, "mouseenter mouseleave", function (f) {
                        var c = this;
                        var d = f.type === "mouseenter" ? 0.3 : 0;
                        E.each(a, function (e) {
                            var h, g = E.get("a", e);
                            if (!(h = E.get("i", g))) {
                                h = T.create("<i>");
                                T.append(h, g)
                            }
                            if (c === e) { T.css(h, "opacity", 0) }
                            else {
                                if (h.timer)
                                { clearTimeout(h.timer) }
                                h.timer = setTimeout(function ()
                                { new E.Anim(h, { opacity: d }, 0.5, "easeOutStrong").run() }, 200)
                            }
                        })
                    })
                })
            },
                _fixPng24: function (Z, a) {
                    var S = this.slide;
                    var b = function (c) {
                        T.css(c, { filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + (a || T.attr(c, W) || c.src) + '",enabled="true", sizinMethod="scale");' });
                        c.src = "http://a.tbcdn.cn/kissy/1.0.0/build/imglazyload/spaceball.gif";
                        T.show(c)
                    };
                    Z ? b(Z) : E.each(S.panels, function (d) { var c = E.get("b", d), e; if (c) { if (e = E.get("img", c)) { b(e) } T.show(c) } })
                },
                _optimizeImg: function (S) {
                    var Z = "_q90.jpg";
                    if (!g_config.closeOptSlideImg) { S += Z } return S
                }, _triggerAnim: function () {
                var h = this.slide; var Z; var k; var a; var m; var d, j; var e = 0; var g;
                function S(o) { var n = "rotate(" + o + "deg)"; a.css({ "-webkit-transform": n, "-moz-transform": n, "-o-transform": n }) }
                function i(o) {
                    if (g) { return } var n = o || (5000 / 180); clearInterval(d); d = setInterval(function (p) {
                        if (e < 360) { e += 2; S(e) } if (e > 180)
                        { k.addClass("move"); a.addClass("move"); m.addClass("move") } if (e > 359) { c() }
                    }, n)
                }
                function c() { clearInterval(d) }
                function f() {
                    k.removeClass("move");
                    a.removeClass("move");
                    m.removeClass("move");
                    clearInterval(d); e = 0; S(e)
                }
                function b(n) {
                    var o = -336 + (14 + 8) * n;
                    T.css(Z, { "margin-left": o + "px" })
                }
                function l() {
                    if (!Z) {
                        var n = '<div class="timer"><span class="gray"></span><span class="mask"><span class="rotator"></span></span></div>';
                        Z = T.create(n);
                        T.append(Z, h.container);
                        Z = E.one(".timer");
                        k = E.one(".gray");
                        a = E.one(".rotator");
                        m = E.one(".mask")
                    } i();
                    h.on("beforeSwitch", function (o) {
                        f();
                        b(o.toIndex);
                        i()
                    });
                    Y.on(h.container, "mouseenter", function () { g = true; c() });
                    Y.on(h.container, "mouseleave", function () {
                        g = false; if (j) { clearTimeout(j) }
                        j = setTimeout(
                            function ()
                            { i(10000 / (360 - e)) }, 200)
                    })
                }
                l()

            }

            }); return F
    }, { requires: ["switchable"]});