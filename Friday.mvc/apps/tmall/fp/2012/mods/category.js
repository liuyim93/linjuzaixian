/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-3
 * Time: 下午10:01
 * To change this template use File | Settings | File Templates.
 */
/*pub-1|2013-01-15 17:19:40*/
KISSY.add(function (C, U) {
        var C = KISSY,
            T = C.DOM,
            W = C.Event,
            B = window,
            X = document,
            M = (C.UA.ie == 6),
            F = "selected",
            R = "hidden",
            L = "DIV",
            P = "mouseenter",
            H = "mouseleave",
            E = "click";
        var D = B.g_config;
        var K = { showDelay: 0.1, hideDelay: 0.1, viewId: null, subViews: null, triggers: null, lazyload: true, dataUrl: null }; var J = "755px"; var Q = 10; var O = 10; var V = true; var G = false; var I = D.isTestEnv ? "http://110.75.14.52/recommend.htm?appId=12001&uid=100028393" : "http://ald.taobao.com/recommend.htm?appId=12001";
        function N(S, Z) {
            var Y = this;
            if (!(Y instanceof N))
            { return new N(S, Z) }
            Y.container = C.get(S);
            Y.config = C.merge(K, Z || {});
            Y.config.viewer = C.get(Z.viewId, Y.container);
            Y.triggers = T.query(Z.triggers, Y.container);
            Y._init()
        }
        function A(S, Z) {
            for (var Y = 0; Y < S.length; Y = Y + 1)
            { if (S[Y] === Z) { return Y } } return -1
        }
        C.mix(N.prototype, { changeTrigger:
            function (S) {
                var Y = this;
                var a = Y.triggers, Z = a[S];
                C.each(a, function (b) { T.removeClass(b, F) });
                T.addClass(Z, F);
                Y.triggerIdx = S
            },
            changeView: function (Y) {
                var Z = this;
                C.each(Z.subViews, function (a) { T.addClass(a, R) });
                T.removeClass(Y, R);
                var S = T.height(Y);
                T.height(Z.viewer, (S + Q + O) + "px");
                Z.resetPostion();
                if (!Z.shadow) { Z.shadow = T.get(".shadow", Z.viewer) }
                T.height(Z.shadow, (S + O) + "px")
            }, show: function () {
                var a = this, b = a.config;
                var Z = a.subViews;
                var S = b.idx;
                var Y = a.isDataReady ? Z[S] : Z[0];
                var c = T.width(a.viewer);
                if (a.hideTimer) { clearTimeout(a.hideTimer) }
                if (V && c == 0) {
                    if (a.expandTimer)
                    { clearTimeout(a.expandTimer) }
                    a.expandTimer = setTimeout(function () {
                            G = false;
                            V = false;
                            a.changeTrigger(S);
                            a.changeView(Y);
                            if (!M) {
                                new C.Anim(a.viewer, { width: J }, 0.2, "linear").run()
                            }
                            else
                            { T.width(a.viewer, J) }
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
                        C.each(b, function (c) { T.removeClass(c, F) });
                        T.css(Y.viewer, { width: "0" })
                    }, a.hideDelay * 1000)
                }
            }, resetPostion: function () {
                var a = this.triggers[this.config.idx], i = T.offset(a).top, e = T.offset(this.container), g = T.height(a), b = T.height(this.viewer), k = T.width(a), f = T.viewportHeight(), Y = T.scrollTop(), j = i - Y, Z = f - b - j, l = f - j, S = i - e.top; if (Z <= 0) { Z = Math.abs(Z); var h = 20; if (l > g) { var d = l - g; if (d > h) { S = S - Z - h + 7 } else { S = S - Z } } else { S = S - Z + h + l + 20 } } if (S < 30) { S = 30 } var c = C.UA.ie ? 0 : Q;
                if (!M && G) { new C.Anim(this.viewer, { top: (S - c) + "px" }, 0.3, "easeOutStrong").run() }
                else {
                    this.viewer.style.top = (S - c) + "px";
                    G = true
                }
            }, _load: function (Z) {
                var S = this, Y = S.config; C.IO.get(Z, M ? { t: +new Date} : {}, function (a) {
                        if (!a) { return } newViewer = T.create(a); T.html(S.viewer, T.html(newViewer)); S.subViews = T.query(Y.subViews, S.viewer);
                        S.shadow = T.get(".shadow", S.viewer);
                        S.isDataReady = true;
                        if (S.status == "visible") {
                            V = false;
                            S.show()
                        }
                        //2013-02-03 TODO(basilwang) no direct-promo
                        //U.render()
                    }
                    ,
                    "text")
            }
            , _init: function () {
                var S = this, Y = S.config;
                C.each(S.triggers, function (Z) {
                    W.on(Z, "mouseenter tap", function (b) {
                            b.halt(); var a = A(S.triggers, Z);
                            Y.idx = a; S.status = "visible";
                            if (b.type === "tap" && a === S.triggerIdx)
                            { S.hide(Y.idx); return } if (!S.viewer) {
                                if (!Y.viewer && Y.lazyload) {
                                    S.viewer = T.create('<div id="J_SubCategory" class="subCategory"><div class="shadow"></div><div class="subView j_SubView" style="height:520px; text-align:center; line-height:520px;">loading...</div></div>');
                                    S.container.appendChild(S.viewer);
                                    S.subViews = T.query(Y.subViews, S.viewer);
                                    S.isDataReady = false;
                                    S._load(Y.dataUrl)
                                }
                                else {
                                    S.viewer = Y.viewer;
                                    S.subViews = T.query(Y.subViews, S.viewer);
                                    S.isDataReady = true
                                }
                            }
                            S.show()
                        }
                    )
                    ;
                    W.on(Z, H, function (a) { S.status = "triggerLeave" })
                });
                W.on(S.container, H, function (Z) { S.hide(Y.idx) });
                W.on(Y.bottomCl, "mouseenter mouseleave", function (Z) {
                    T.toggleClass(Y.bottomCl, F);
                    if (Z.type === "mouseenter") { S.hide(Y.idx) }
                });
                W.on(".categoryHd", P, function (Z) { S.hide(Y.idx) })
            }, getRecData: function () { var S = this; C.jsonp(I, { t: +new Date }, function (Y) { if (!Y) { return } S.renderRecData(Y); S.RecData = Y }) }, renderRecData: function (Z) {
                if (!Z) { return } var Y = this; var S = T.query("p.subItem-brand", Y.subViews[Y.config.idx]); C.each(S, function (d) {
                    var b = T.attr(d, "recommend-id");
                    var a = ""; if (b && Z[b]) { for (var c = 0; c < Z[b].length; c++) { a += '<a href="' + Z[b][c].linkedUrl + '" target="_blank">' + Z[b][c].brandName + "</a>" } T.html(d, a) }
                })
            }
        });
        return N
    }, { requires: ["./direct-promo"] });