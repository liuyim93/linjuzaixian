// JScript source code
KISSY.add("2012/mods/slide2", function (_kissy, _switchable) {
    var _dom = _kissy.DOM, _event = _kissy.Event; var _window = window; var _is_ie6 = _kissy.UA.ie == 6;
    var _is_under_ie9 = _kissy.UA.ie && _kissy.UA.ie < 9;
    var _closeSlideAutoPlay = !_window.g_config.closeSlideAutoPlay;
    var _closeTriggerAnim = _window.g_config.closeTriggerAnim;
    var _mfp = _window.MFP;
    var _str_J_MfpSlide = "J_MfpSlide";
    var _str_j_SlideTanxAd = "j_SlideTanxAd";
    var _str_j_MSDirect_ = "j_MSDirect_";
    var _str_J_DirectPromo = "J_DirectPromo";
    var _str_j_MaskBanner = "j_MaskBanner";
    var _origin_content_result = [285, 333, 337];  /*2013-03-06 basilwang what the fuck?*/

    var K = ["mm_12852562_1778064_10953677", "mm_12852562_1778064_10953701"];
    var _str_data_text_src = "data-text-src";
    var _str_data_image = "data-image";
    var V = /^https?:\/\/\S+$/i;
    var H = /^https?:\/\/\S+(png|jpg|gif)$/i;
    var R = /^#[0-9a-fA-F]{6}$/;
    var _config = { contentCls: "mfpSlide-con", navCls: "mfpSlide-nav", activeTriggerCls: "selected", effect: "fade", easing: "easeOut", lazyDataType: "img-src", duration: 0.5, triggerType: "mouse", autoplay: _closeSlideAutoPlay, pauseOnScroll: true, delay: 0.2 };
    function Slide2() {
        var _slide2 = this;
        _slide2.mfpSlide = null;
        if (!(this instanceof Slide2))
        { return new Slide2() }
        _slide2._init()
    }
    _kissy.augment(Slide2, _kissy.EventTarget,
            { _init: function () {
                var _slide2 = this; if (!_kissy.get("#" + _str_J_MfpSlide))
                { return }
                var _slide = _slide2.slide = new _switchable.Slide("#" + _str_J_MfpSlide, _config);
                _window.g_config.Slide = _slide;
                _is_ie6 && _kissy.ready(function () { _slide2._fixPng24() });
                _slide.on("beforeSwitch", function(_op){
                    _slide2._textAnim(_op);
                    _slide2._lazyLoad(_op)
                });
                //2013-02-19 basilwang don't use direct-promo
                //_mfp.on("directSuccess", function (_event) { _slide2._directImg(_event.data) });
                _dom.show(_slide.nav);
                //2013-02-19 basilwang remove tanx
                //E.ready(function () { Z._tanxAd() });
                ; _slide2._hoverMask();
                !_closeSlideAutoPlay && _slide.switchTo(parseInt(Math.random() * _slide.triggers.length))
            }, _lazyLoad: function (_op /*_op includes fromIndex and toIndex*/) {
                var _slide = this.slide;
                var _panel_to_Index = _slide.panels[_op.toIndex];
                var _b_on_panel_to_Index = _kissy.get("b", _panel_to_Index);
                var _img_on_panel_to_Index = _kissy.get("img", _b_on_panel_to_Index);
                if (_dom.hasAttr(_panel_to_Index, _str_data_image) && _img_on_panel_to_Index) {
                    _dom.css(_panel_to_Index, "background-image", "url(" + _dom.attr(_panel_to_Index, _str_data_image) + ")");
                    !_is_ie6 && _dom.attr(_img_on_panel_to_Index, "src", _dom.attr(_img_on_panel_to_Index, _str_data_text_src));
                    _dom.removeAttr(_panel_to_Index, _str_data_image);
                    _dom.removeAttr(_img_on_panel_to_Index, _str_data_text_src)
                }
            },
                _textAnim: function (_op /*_op includes fromIndex and toIndex*/) {
                    var _slide = this.slide;
                    var _panel_activeIndex = _slide.panels[_slide.activeIndex];
                    var _panel_to_Index = _slide.panels[_op.toIndex];
                    var _b_on_panel_activeIndex = _kissy.get("b", _panel_activeIndex);
                    var _b_on_panel_to_Index = _kissy.get("b", _panel_to_Index);
                    var _img_on_panel_to_Index = _kissy.get("img", _b_on_panel_to_Index);
                    !!_b_on_panel_activeIndex && new _kissy.Anim(_b_on_panel_activeIndex, { top: "-40px", opacity: _is_under_ie9 ? 1 : 0 }, 0.8, "easeOutStrong").run();
                    !!_b_on_panel_to_Index && new _kissy.Anim(_b_on_panel_to_Index, { top: "-10px", opacity: 1 }, 0.8, "easeOutStrong").run()
                },
                _directImg: function (_content_result_array) {
                    if (!(_content_result_array && _kissy.isArray(_content_result_array)))
                    { return }
                    var _slide2 = this;
                    var _slide = _slide2.slide;
                    _kissy.later(function () {
                        _kissy.each(_kissy.query("." + _str_J_DirectPromo, _slide.content),
                                function (_direct_promo) {
                                    var _a_on_direct_promo = _kissy.get("a", _direct_promo);
                                    !_kissy.get("s", _a_on_direct_promo) && _dom.append(_dom.create("<s>"), _a_on_direct_promo)
                                })
                    },
                        10);
                    _kissy.each(_content_result_array,
                        function (_content_result) {
                            if (_kissy.inArray(_content_result.id, _origin_content_result)) {
                                var f = _content_result.content.split(";;");
                                var d = _content_result.link.split(";;");
                                var b = _kissy.get("." + _str_j_MSDirect_ + _content_result.id);
                                if (!(b && V.test(d[0]) && H.test(f[0]) && H.test(f[1]) && R.test(f[3])))
                                { return }
                                var e = _kissy.get("a", b);
                                var c = _kissy.get("img", _kissy.get("b", b));
                                e.href = d[0];
                                if (_dom.hasAttr(b, _str_data_image)) {
                                    _dom.css(b, "background-color", f[3]);
                                    _dom.attr(b, _str_data_image, _slide2._optimizeImg(f[0]));
                                    _is_ie6 ? _slide2._fixPng24(c, f[1]) : _dom.attr(c, _str_data_text_src, f[1])
                                }
                                else {
                                    _dom.css(b, { "background-color": f[3], "background-image": "url(" + _slide2._optimizeImg(f[0]) + ")" });
                                    _is_ie6 ? _slide2._fixPng24(c, f[1]) : c.src = f[1]
                                }
                            }
                        })
                },
                //2013-02-17 basilwang we don't need _tanxAdd
                _tanxAd: function () {
                    _kissy.each(K, function (S) {
                        _kissy.getScript("http://p.tanx.com/ex?i=" + S,
                            function () {
                                var b = _kissy.get("#tanx-a-" + S),
                                    Z, c, d = 0;
                                if (!b) { return }
                                Z = _dom.parent(b, "li");
                                _kissy.later(function () {
                                    c = _dom.prev(b, "a");
                                    if (!c && d < 30) { setTimeout(arguments.callee, 100); d++ }
                                    else {
                                        var a = _kissy.get("img", c);
                                        var e = _kissy.get("a", Z);
                                        _dom.css(Z, "background-image", "url(" + a.src + ")");
                                        e.href = c.href; _dom.hide("." + _str_j_SlideTanxAd)
                                    }
                                }, 20)
                            })
                    })
                }
                , _hoverMask: function () {
                    var _slide2 = this;
                    var _node_ul_class_j_MaskBanner = _kissy.all("." + _str_j_MaskBanner, _slide2.slide.container);
                    _kissy.each(_node_ul_class_j_MaskBanner, function (_node) {
                        var _lis = _kissy.query("li", _node);
                        _event.on(_lis, "mouseenter mouseleave", function (f) {
                            var _li_mouse_related = this;
                            var _opacity = f.type === "mouseenter" ? 0.3 : 0;
                            _kissy.each(_lis, function (_li) {
                                var _dom_i_on_a, _dom_a_on_li = _kissy.get("a", _li);
                                if (!(_dom_i_on_a = _kissy.get("i", _dom_a_on_li))) {
                                    _dom_i_on_a = _dom.create("<i>");
                                    _dom.append(_dom_i_on_a, _dom_a_on_li)
                                }
                                if (_li_mouse_related === _li) { _dom.css(_dom_i_on_a, "opacity", 0) }
                                else {
                                    if (_dom_i_on_a.timer)
                                    { clearTimeout(_dom_i_on_a.timer) }
                                    _dom_i_on_a.timer = setTimeout(function ()
                                    { new _kissy.Anim(_dom_i_on_a, { opacity: _opacity }, 0.5, "easeOutStrong").run() }, 200)
                                }
                            })
                        })
                    })
                },
                _fixPng24: function (Z, a) {
                    var _slide = this.slide;
                    var b = function (c) {
                        _dom.css(c, { filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + (a || _dom.attr(c, _str_data_text_src) || c.src) + '",enabled="true", sizinMethod="scale");' });
                        c.src = "http://a.tbcdn.cn/kissy/1.0.0/build/imglazyload/spaceball.gif";
                        _dom.show(c)
                    };
                    Z ? b(Z) : _kissy.each(_slide.panels, function (d) { var c = _kissy.get("b", d), e; if (c) { if (e = _kissy.get("img", c)) { b(e) } _dom.show(c) } })
                },
                _optimizeImg: function (S) {
                    var Z = "_q90.jpg";
                    if (!g_config.closeOptSlideImg) { S += Z } return S
                },
                 _triggerAnim: function () {
                    var h = this.slide; var Z; var k; var a; var m; var d, j; var e = 0; var g;
                    function S(o) {
                        var n = "rotate(" + o + "deg)";
                        a.css({ "-webkit-transform": n, "-moz-transform": n, "-o-transform": n })
                     }
                    function i(o) {
                        if (g) { return } var n = o || (5000 / 180); clearInterval(d); d = setInterval(function (p) {
                            if (e < 360) { e += 2; S(e) } if (e > 180)
                            { k.addClass("move"); a.addClass("move"); m.addClass("move") } if (e > 359) { c() }
                        }, n)
                    }
                    function c() {
                        clearInterval(d)
                     }
                    function f() {
                        k.removeClass("move");
                        a.removeClass("move");
                        m.removeClass("move");
                        clearInterval(d); e = 0; S(e)
                    }
                    function b(n) {
                        var o = -336 + (14 + 8) * n;
                        _dom.css(Z, { "margin-left": o + "px" })
                    }
                    function l() {
                        if (!Z) {
                            var n = '<div class="timer"><span class="gray"></span><span class="mask"><span class="rotator"></span></span></div>';
                            Z = _dom.create(n);
                            _dom.append(Z, h.container);
                            Z = _kissy.one(".timer");
                            k = _kissy.one(".gray");
                            a = _kissy.one(".rotator");
                            m = _kissy.one(".mask")
                        } i();
                        h.on("beforeSwitch", function (o) {
                            f();
                            b(o.toIndex);
                            i()
                        });
                        _event.on(h.container, "mouseenter", function () { g = true; c() });
                        _event.on(h.container, "mouseleave", function () {
                            g = false; if (j) { clearTimeout(j) }
                            j = setTimeout(
                            function ()
                            { i(10000 / (360 - e)) }, 200)
                        })
                    }
                    l()

                }

            }); return Slide2
}, { requires: ["switchable"] });