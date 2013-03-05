/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-3
 * Time: 下午10:01
 * To change this template use File | Settings | File Templates.
 */
/*pub-1|2013-01-15 17:19:40*/
KISSY.add("2012/mods/category",function (_kissy_t, _directpromo) {
        var _kissy = KISSY,
            _dom = _kissy.DOM,
            _event = _kissy.Event,
            _window = window,
            _document = document,
            _is_ie6 = (_kissy.UA.ie == 6),
            _str_selected = "selected",
            _str_hidden = "hidden",
            _str_div = "DIV",
            _str_mouseenter = "mouseenter",
            _str_mouseleave = "mouseleave",
            _str_click = "click";
        var _g_config = _window.g_config;
        var _options = { showDelay: 0.1, hideDelay: 0.1, viewId: null, subViews: null, triggers: null, lazyload: true, dataUrl: null }; var J = "755px"; var Q = 10; var O = 10; var V = true; var G = false; var I = _g_config.isTestEnv ? "http://110.75.14.52/recommend.htm?appId=12001&uid=100028393" : "http://ald.taobao.com/recommend.htm?appId=12001";
        function Category(_selector, _op) {
            var _category = this;
            if (!(_category instanceof Category))
            { return new Category(_selector, _op) }
            _category.container = _kissy.get(_selector);
            _category.config = _kissy.merge(_options, _op || {});
            _category.config.viewer = _kissy.get(_op.viewId, _category.container);
            _category.triggers = _dom.query(_op.triggers, _category.container);
            _category._init()
        }
        function A(S, Z) {
            for (var Y = 0; Y < S.length; Y = Y + 1)
            { if (S[Y] === Z) { return Y } } return -1
        }
        _kissy.mix(Category.prototype, { changeTrigger:
            function (S) {
                var Y = this;
                var a = Y.triggers, Z = a[S];
                _kissy.each(a, function (b) { _dom.removeClass(b, _str_selected) });
                _dom.addClass(Z, _str_selected);
                Y.triggerIdx = S
            },
            changeView: function (Y) {
                var Z = this;
                _kissy.each(Z.subViews, function (a) { _dom.addClass(a, _str_hidden) });
                _dom.removeClass(Y, _str_hidden);
                var S = _dom.height(Y);
                _dom.height(Z.viewer, (S + Q + O) + "px");
                Z.resetPostion();
                if (!Z.shadow) { Z.shadow = _dom.get(".shadow", Z.viewer) }
                _dom.height(Z.shadow, (S + O) + "px")
            }, show: function () {
                var a = this, b = a.config;
                var Z = a.subViews;
                var S = b.idx;
                var Y = a.isDataReady ? Z[S] : Z[0];
                var c = _dom.width(a.viewer);
                if (a.hideTimer) { clearTimeout(a.hideTimer) }
                if (V && c == 0) {
                    if (a.expandTimer)
                    { clearTimeout(a.expandTimer) }
                    a.expandTimer = setTimeout(function () {
                            G = false;
                            V = false;
                            a.changeTrigger(S);
                            a.changeView(Y);
                            if (!_is_ie6) {
                                new _kissy.Anim(a.viewer, { width: J }, 0.2, "linear").run()
                            }
                            else
                            { _dom.width(a.viewer, J) }
                        }
                        , b.showDelay * 500)
                }
                else {
                    if (a.resetTimer) {
                        clearTimeout(a.resetTimer)
                    }
                    a.resetTimer = setTimeout(function () {
                            if (a.status == "visible") {
                                a.changeTrigger(S);
                                a.changeView(Y)
                            }
                        }
                        , b.showDelay * 1000)
                }
            },
            hide: function (S) {
                var Y = this, a = Y.config, b = Y.triggers, Z = b[S];
                Y.status = "hidden";
                V = true;
                Y.triggerIdx = null;
                if (Y.viewer) {
                    if (Y.expandTimer) { clearTimeout(Y.expandTimer) }
                    if (Y.hideTimer) { clearTimeout(Y.hideTimer) }
                    Y.hideTimer = setTimeout(function () {
                        _kissy.each(b, function (c) { _dom.removeClass(c, _str_selected) });
                        _dom.css(Y.viewer, { width: "0" })
                    }, a.hideDelay * 1000)
                }
            }, resetPostion: function () {
                var a = this.triggers[this.config.idx], i = _dom.offset(a).top, e = _dom.offset(this.container), g = _dom.height(a), b = _dom.height(this.viewer), k = _dom.width(a), f = _dom.viewportHeight(), Y = _dom.scrollTop(), j = i - Y, Z = f - b - j, l = f - j, S = i - e.top; if (Z <= 0) { Z = Math.abs(Z); var h = 20; if (l > g) { var d = l - g; if (d > h) { S = S - Z - h + 7 } else { S = S - Z } } else { S = S - Z + h + l + 20 } } if (S < 30) { S = 30 } var c = _kissy.UA.ie ? 0 : Q;
                if (!_is_ie6 && G) { new _kissy.Anim(this.viewer, { top: (S - c) + "px" }, 0.3, "easeOutStrong").run() }
                else {
                    this.viewer.style.top = (S - c) + "px";
                    G = true
                }
            }, _load: function (Z) {
                var S = this, Y = S.config; _kissy.IO.get(Z, _is_ie6 ? { t: +new Date} : {}, function (a) {
                        if (!a) { return } newViewer = _dom.create(a); _dom.html(S.viewer, _dom.html(newViewer)); S.subViews = _dom.query(Y.subViews, S.viewer);
                        S.shadow = _dom.get(".shadow", S.viewer);
                        S.isDataReady = true;
                        if (S.status == "visible") {
                            V = false;
                            S.show()
                        }
                        //2013-03-06 basiwang check direct-promo
                        //2013-02-03 TODO(basilwang) no direct-promo
                        _directpromo.render()
                    }
                    ,
                    "text")
            }
            , _init: function () {
                var S = this, Y = S.config;
                _kissy.each(S.triggers, function (Z) {
                    _event.on(Z, "mouseenter tap", function (b) {
                            b.halt(); var a = A(S.triggers, Z);
                            Y.idx = a; S.status = "visible";
                            if (b.type === "tap" && a === S.triggerIdx)
                            { S.hide(Y.idx); return } if (!S.viewer) {
                                if (!Y.viewer && Y.lazyload) {
                                    S.viewer = _dom.create('<div id="J_SubCategory" class="subCategory"><div class="shadow"></div><div class="subView j_SubView" style="height:520px; text-align:center; line-height:520px;">loading...</div></div>');
                                    S.container.appendChild(S.viewer);
                                    S.subViews = _dom.query(Y.subViews, S.viewer);
                                    S.isDataReady = false;
                                    S._load(Y.dataUrl)
                                }
                                else {
                                    S.viewer = Y.viewer;
                                    S.subViews = _dom.query(Y.subViews, S.viewer);
                                    S.isDataReady = true
                                }
                            }
                            S.show()
                        }
                    )
                    ;
                    _event.on(Z, _str_mouseleave, function (a) { S.status = "triggerLeave" })
                });
                _event.on(S.container, _str_mouseleave, function (Z) { S.hide(Y.idx) });
                _event.on(Y.bottomCl, "mouseenter mouseleave", function (Z) {
                    _dom.toggleClass(Y.bottomCl, _str_selected);
                    if (Z.type === "mouseenter") { S.hide(Y.idx) }
                });
                _event.on(".categoryHd", _str_mouseenter, function (Z) { S.hide(Y.idx) })
            }, getRecData: function () { var S = this; _kissy.jsonp(I, { t: +new Date }, function (Y) { if (!Y) { return } S.renderRecData(Y); S.RecData = Y }) }, renderRecData: function (Z) {
                if (!Z) { return } var Y = this; var S = _dom.query("p.subItem-brand", Y.subViews[Y.config.idx]); _kissy.each(S, function (d) {
                    var b = _dom.attr(d, "recommend-id");
                    var a = ""; if (b && Z[b]) { for (var c = 0; c < Z[b].length; c++) { a += '<a href="' + Z[b][c].linkedUrl + '" target="_blank">' + Z[b][c].brandName + "</a>" } _dom.html(d, a) }
                })
            }
        });
        return Category
    }, { requires: ["2012/mods/direct-promo"] });