/*pub-1|2013-05-08 09:50:37*/
TStart.add("plugin~news", function (a) {
    a.addPlugin("news", {
        type: "drop",
        html: '<a href="#">\u6d88\u606f</a><span class="t-msg-count J_TMsgCount hidden"><span class="tip">\u60a8\u6709<em>0</em>\u6761\u65b0\u6d88\u606f</span><span class="arrow"></span></span>',
        staticCode: "29.0.-1",
        Panel: {
            title: "\u6d88\u606f",
            width: 333,
            height: 360,
            setting: a.getHost("http://i.{taobao}/message/view_message.htm?category=2000&tracelog=msg-trade&op=setting")
        },
        loginNotice: {
            name: "\u6d88\u606f",
            list: ["\u5feb\u6377\u67e5\u770b\u4ea4\u6613\u7269\u6d41\u4fe1\u606f", "\u7b80\u4fbf\u8bc4\u8bba\u7c89\u4e1d\u5185\u5bb9", "\u5373\u523b\u4e86\u89e3\u8c01\u56de\u5e94\u4e86\u4f60\u7684\u5206\u4eab", "\u53ca\u65f6\u4e86\u89e3\u8c01\u5173\u6ce8\u4e86\u4f60"],
            staticCode: "10.10.1.1"
        }
    })
});
TStart.add("news~light", function (d) {
    var e = KISSY,
		m = e.DOM,
		l = e.Event,
		h = e.UA,
		j = document,
		g = d.PLUGIN_TYPE,
		c = d.Config,
		a = d.isOnline,
		i = "http://" + (a ? "i.taobao.com" : "i.daily.taobao.net");

    function n(t) {
        var p = document.body,
			s = location.host,
			r = /^(i|jianghu|quanzi)\.([^\.]+\.)*taobao/i,
			o = r.test(s),
			u = "http://www." + (a ? "taobao.com" : "daily.taobao.net") + "/go/act/toolbar/news/taobao.php?expire=" + (o ? "0" : "6") + (t ? ("clearNews=" + t) : "") + (a ? "" : "&daily=true") + "&domain=" + document.domain,
			q = m.get("#J_Toolbar_News_Tip");
        if (!q) {
            q = m.create('<iframe id="J_Toolbar_News_Tip" class="tstart-news-tip" src="' + u + '" frameborder="0" scrolling="no" allowtransparency="true" width="1" height="1" async></iframe');
            p.appendChild(q)
        } else {
            q.src = u;
            return q
        }
        return q
    }
    function k() {
        var q = d.News,
			w = q.Events,
			s = document.domain;
        if (window.postMessage && (!h.ie || h.ie > 8)) {
            l.on(window, "message", function (x) {
                var y = x.data;
                if (y && e.isString(y) && -1 !== y.indexOf("-1")) {
                    q.fire(e.JSON.parse(y))
                }
                if (y && e.isString(y) && -1 !== y.indexOf("quanmessage")) {
                    q.fireQuan(e.JSON.parse(y)["quanmessage"])
                }
            })
        } else {
            if (s.split(".").length > 2 || -1 !== s.indexOf("tmall")) {
                var p = null,
					t, u, p = null,
					v = true,
					o = encodeURIComponent(unescape((e.Cookie.get("_nk_") || "").replace(/\\u/g, "%u"))),
					r = function () {
					    if (p) {
					        clearTimeout(p);
					        p = null
					    }
					    p = setTimeout(function () {
					        var x = d.traceStore.getItem("SubMessage_Tmsg_" + o),
								y = d.traceStore.getItem("SubMessage_SNS_Tmsg_" + o);
					        if (x !== t) {
					            t = x;
					            q.fire(e.JSON.parse(t))
					        }
					        if (y !== t) {
					            u = y;
					            q.fireQuan(u)
					        }
					        if (v) {
					            p = setTimeout(arguments.callee, 50)
					        }
					    }, 50)
					};
                l.add(window, "focus blur", function (y) {
                    var x = y.type;
                    if ("focus" === x) {
                        v = true;
                        r()
                    } else {
                        v = false
                    }
                });
                r()
            }
        }
    }
    function b(r) {
        var q = m.get(".J_TMsgCount", "#tstart-plugin-news"),
			p = m.get("em", q);
        if (r) {
            var o = r["-1"] || 0;
            if (o > 0) {
                if (o > 30) {
                    o = "30+"
                }
                p.innerHTML = o;
                m.removeClass(q, "hidden");
                return new e.Anim(q, {
                    bottom: "25px"
                }, 1, "easeOut").run()
            }
        }
        m.css(q, "bottom", "-30px");
        m.addClass(q, "hidden")
    }
    function f() {
        d.combo({
            path: "news/notify/",
            js: "quanzi.js",
            css: "quanzi.css"
        })
    }
    d.News = {
        config: {
            url: {
                itaobao: i,
                message: i + "/message/view_message.htm?tracelog=toolmessage&category=1000&msgName=1",
                tracelog: "tracelog=toolmessage"
            },
            status: {
                success: 1,
                unlogin: 0,
                failed: 2
            }
        },
        Events: [],
        QuanEvents: [],
        subscribe: function (o) {
            this.Events.push(o)
        },
        fire: function (o) {
            e.each(this.Events, function (p) {
                p(o)
            })
        },
        subscribeQuan: function (o) {
            this.QuanEvents.push(o)
        },
        fireQuan: function (o) {
            e.each(this.QuanEvents, function (p) {
                p(o)
            })
        },
        clearNews: function (p) {
            var o = o = m.get("#J_Toolbar_News_Tip");
            if (o && o.contentWindow.postMessage && (!e.UA.ie || e.UA.ie > 8)) {
                o.contentWindow.postMessage(p || "*", "*")
            } else {
                n(p || "*")
            }
        }
    };
    d.ready(function () {
        var o = d.Plugins.news;
        if (e.Cookie.get("_nk_")) {
            n();
            k();
            d.News.subscribe(function (p) {
                b(p)
            });
            f()
        }
        d.clearNews = d.News.clearNews;
        o.on("open", function (p) {
            if (!d.getNick()) {
                return this.renderLoginNotice()
            }
            d.News.container = m.get(".tstart-drop-panel-bd", p.getRoot());
            d.News.removeLoading = function () {
                p.hideLoading()
            };
            if (!d.News.Content || !d.News.Navi || !d.News.List) {
                d.combo({
                    path: "news/notify/",
                    js: ["navi.js", "content.js", "list.js"],
                    css: "main.css"
                })
            } else {
                d.News.Navi.go("home");
                d.News.Navi.setIgnoreDisabled(false)
            }
        })
    })
});