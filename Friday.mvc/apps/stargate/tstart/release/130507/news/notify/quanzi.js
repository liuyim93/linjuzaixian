/*pub-1|2013-05-08 09:50:39*/
(function (n, e) {
    var B = document,
		f = window,
		s = n.DOM,
		q = n.Event,
		h = "contentEl",
		A = "config",
		g = "click",
		a = "timer",
		c = "events",
		o = "filter",
		t = "autoHide",
		l = "visibility",
		x = "hidden",
		u = "visible",
		b = "mask",
		w = "display",
		m = "none",
		y = "block",
		v = "srcNode",
		j = "callback",
		z = "J_Close",
		k = "px",
		d = false,
		r = n.UA,
		p = {
		    elCls: "",
		    content: ""
		};

    function i(C) {
        this._init(C)
    }
    i.prototype = {
        _init: function (G) {
            var I = this,
				F = s.create('<div class="ts-popup" style="position:' + (6 === r.ie ? "absolute" : "fixed") + ';z-index:10001;visibility:hidden"></div>'),
				H = n.merge(p, G),
				C = H.srcNode || B.body;
            I.prepend(F, C);
            F.innerHTML = H.content;
            H.style && s.css(F, H.style);
            s.addClass(F, H.elCls);
            I[h] = F;
            I[A] = H;
            if (H.mask) {
                I.createMask()
            }
            I._bindEvent()
        },
        _bindEvent: function () {
            var C = this;
            q.on(C[h], g, function (I) {
                var J = I.target,
					H, F, G = C[A][c];
                if (s.hasClass(J, z)) {
                    I.preventDefault();
                    C.hide()
                }
                if (G && G.length > 0) {
                    for (H = 0, F = G.length; H < F; H++) {
                        if (G[H][o](J)) {
                            G[H][j](J)
                        }
                    }
                }
            })
        },
        position: function (O, N, I) {
            var S = this,
				F = S[A],
				C = S[h],
				G = s.get(O),
				T = s.offset(G),
				P = G.offsetWidth,
				K = G.offsetHeight,
				Q = C.offsetWidth,
				L = C.offsetHeight,
				R = I || [0, 0],
				J = F[v],
				I, M, H;
            switch (N) {
                case "tr":
                    M = T.left + P - Q + R[0];
                    H = T.top - L + R[1];
                    break;
                case "tl":
                    M = T.left + R[0];
                    H = T.top - L + R[1];
                    break;
                case "br":
                    M = T.left + P - Q + R[0];
                    H = T.top + K + R[1];
                    break;
                default:
                    M = T.left + R[0];
                    H = T.top + K + R[1]
            }
            if (J) {
                I = s.offset(J);
                M -= I.left;
                H -= I.top
            }
            s.css(C, {
                left: M + k,
                top: H + k
            })
        },
        prepend: function (F, G) {
            var C = s.children(G),
				H;
            if (C.length > 0) {
                H = C[0];
                s.insertBefore(F, H)
            } else {
                s.get(G).appendChild(F)
            }
        },
        center: function () {
            var C = this;
            C.centerAlign();
            C.centerValign()
        },
        centerValign: function () {
            var H = this,
				F = H[A],
				C = H[h],
				G = 6 === r.ie ? s.scrollTop() : 0,
				J = s.viewportHeight(),
				I = C.offsetHeight;
            s.css(C, {
                top: G + (J - I) / 2 + k
            })
        },
        centerAlign: function () {
            var I = this,
				G = I[A],
				C = I[h],
				H = s.viewportWidth(),
				F = C.offsetWidth;
            s.css(C, {
                left: (H - F) / 2 + k
            })
        },
        fix: function () {
            var F = this,
				C;
            if (6 === r.ie) {
                if (F.hasFixedEvent) {
                    return false
                }
                q.on(f, "scroll resize", function (G) {
                    if (F[d]) {
                        F.centerValign();
                        F.hasFixedEvent = true
                    }
                })
            }
        },
        setContent: function (F) {
            var H = this,
				C = H[h],
				G;
            C.innerHTML = "";
            G = n.isString(F) ? s.create(F) : F;
            C.appendChild(G)
        },
        createMask: function () {
            var H = this,
				C = s.docHeight(),
				G = s.docWidth(),
				F = s.create('<div class="ts-mask" style="height:' + C + 'px;display:none">' + (6 === r.ie ? ('<iframe scrolling="no" frameborder="0" src="about:blank" width="' + G + '" height="' + C + '" style="filter:alpha(opacity=0.1)"></iframe>') : "") + "</div>");
            H.prepend(F, B.body);
            H[b] = F
        },
        showMask: function () {
            var C = this[b];
            C && s.css(C, w, y)
        },
        hideMask: function () {
            var C = this[b];
            C && s.css(C, w, m)
        },
        show: function () {
            var C = this,
				F;
            if (C[A][t]) {
                F = C[a];
                if (F) {
                    clearTimeout(F)
                }
                C[a] = setTimeout(function () {
                    C.hide();
                    C[a] = null
                }, 3000)
            }
            C.showMask();
            s.css(C[h], l, u);
            C[d] = true;
            return C
        },
        hide: function () {
            var C = this;
            s.css(C[h], l, x);
            C.hideMask();
            C[d] = false;
            return C
        },
        destroy: function () {
            var F = this,
				C = F[h];
            C.parentNode.removeChild(C);
            F[d] = false;
            return F
        }
    };
    return e.Popup = i
})(KISSY, TStart);
(function (d) {
    var f = KISSY,
		h = f.all;
    var m = 1000001;
    var b = d.isOnline;
    var n = b ? "taobao.com" : "daily.taobao.net";
    var q;
    var k;
    var j = '<div class="tstart-quanzi-panel"><div class="tstart-quanzi-hd"><span class="tstart-quanzi-close">×</span><h3>\u901a\u77e5</h3></div><div class="tstart-quanzi-bd"><iframe src="{{link}}" width="315" height="178" scrolling="no" frameborder="0"></iframe></div>{{#if !ignorekg}}<div class="tstart-quanzi-ft"><a href="#" class="tstart-quanzi-ignore J_TstartIgnore">\u4e0d\u8981\u518d\u63d0\u9192\u6211</a> </div>{{/if}}</div>';

    function a(r) {
        if (f.isPlainObject(r)) {
            f.mix(this, r)
        }
    }
    var p = "http://i." + n + "feed/cancel_popup_notice.htm";
    var g = {
        "1100055_3": {
            link: "http://yiqi." + n + "/plus/notice/popNoticeInfo.htm"
        },
        "1100055_4": {
            link: "http://yiqi." + n + "/plus/notice/popNoticeInfo.htm"
        },
        "1_0": {
            link: "http://www.taobao.com/go/act/toolbar/cut.php",
            ignoreKg: "true",
            hideKg: "true"
        },
        "1100065_0": {
            link: "http://www.taobao.com/go/act/toolbar/seller.php",
            ignoreKg: "true"
        },
        "3_0": {
            link: "http://www.taobao.com/go/act/toolbar/create.php",
            ignoreKg: "true"
        },
        "3_1": {
            link: "http://www.taobao.com/go/act/toolbar/daren.php",
            ignoreKg: "true"
        },
        "4_1": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi01.php"
        },
        "4_2": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi02.php"
        },
        "4_3": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi03.php"
        },
        "4_4": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi04.php"
        },
        "4_5": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi05.php"
        },
        "4_6": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi06.php"
        },
        "4_7": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi07.php"
        },
        "4_8": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi08.php"
        },
        "4_9": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi09.php"
        },
        "4_10": {
            link: "http://www.taobao.com/go/act/other/toolbarfuqi10.php"
        }
    };
    var l;
    var c;
    var i;
    var e;
    var o;
    f.mix(a, {
        init: function (s) {
            c = null;
            e = null;
            m = m + 1;
            i = f.isPlainObject(s) ? s : JSON.parse(s);
            o = i.type.split("_");
            k = g[i.type].hasOwnProperty("ignoreKg") ? 1 : 0;
            q = g[i.type].hasOwnProperty("hidekg") ? 1 : 0;
            q = i.hasOwnProperty("auto_hide") ? i.hasOwnProperty("auto_hide") : q;
            k = i.hasOwnProperty("show_ignore") ? i.hasOwnProperty("show_ignore") : k;
            var r = this;
            r._show()
        },
        _show: function () {
            var r = this;
            d.log("quanzi start");
            r._getTemplate();
            return r
        },
        _getTemplate: function () {
            d.log("quanzi is getting template");
            var r = this;
            var s = f.param(i.param);
            l = g[i.type]["link"] + "?" + s;
            r.render()
        },
        render: function () {
            var r = this;
            var s = {
                link: l,
                ignorekg: k
            };
            e = new d.Popup({
                content: new d.Template(j).render(s),
                elCls: "tb-quanzi-widget-popup",
                style: {
                    zIndex: m
                }
            });
            r.bindEvent(e.contentEl);
            e.show();
            if (!q) {
                c = f.later(function () {
                    h(e.contentEl).remove()
                }, 10000)
            }
            if (6 === f.UA.ie) {
                E.on(window, "scroll resize", function () {
                    var t = e.contentEl;
                    t.style.top = D.scrollTop() + D.viewportHeight() - t.offsetHeight - 38 + "px"
                })
            }
        },
        bindEvent: function (r) {
            var s = this;
            h(r).on("click", function (u) {
                $target = h(u.target);
                par = $target.parent(".tstart-quanzi-panel");
                if ($target.hasClass("tstart-quanzi-close")) {
                    u.preventDefault();
                    h(r).remove()
                }
                if ($target.hasClass("J_TstartIgnore")) {
                    u.preventDefault();
                    h(".tstart-quanzi-panel").remove();
                    var t = p + "?appId=" + o[0] + "&type=" + o[1];
                    new Image().src = t
                }
            });
            if (!q) {
                h(r).on("mouseover", function () {
                    c.cancel()
                }).on("mouseleave", function () {
                    c = f.later(function () {
                        h(r).remove()
                    }, 10000)
                })
            }
        }
    });
    d.ready(function () {
        var s = 128;
        var r = "item_price";
        d.News.subscribeQuan(function (t) {
            if (t && t[0]["type"] == s) {
                a.init(t[0].content)
            }
        });
        d.News.subscribe(function (t) {
            if (t && t[r]) {
                var t = {
                    param: {
                        count: t[r]
                    },
                    type: "1_0"
                };
                a.init(t)
            }
        })
    })
})(TStart);