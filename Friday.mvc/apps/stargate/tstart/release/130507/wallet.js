/*pub-1|2013-05-08 09:50:38*/
TStart.add("plugin~wallet", function (a) {
    a.addPlugin("wallet", {
        type: "drop",
        html: '<a href="#">\u6211\u7684\u94b1\u5305</a>',
        staticCode: "200.0.-1",
        Panel: {
            width: 410,
            height: 250,
            title: "\u6211\u7684\u94b1\u5305"
        },
        loginNotice: {
            name: "\u6211\u7684\u94b1\u5305",
            list: ["\u5feb\u901f\u67e5\u770b\u4f59\u989d\uff0c\u7ea2\u5305\uff0c\u6dd8\u91d1\u5e01\uff0c\u79ef\u5206\uff0c\u96c6\u5206\u5b9d\uff0c\u4f18\u60e0\u5238\u7b49\u8d44\u4ea7\u4fe1\u606f", "\u4f18\u60e0\u5238\u3001\u7ea2\u5305\u3001\u6c34\u7535\u7164\u4ea4\u8d39\u7b49\u751f\u6d3b\u8d26\u5355\u63d0\u9192"],
            staticCode: "13.10.1.1"
        }
    })
});
TStart.add("wallet~light", function (c) {
    var d = KISSY,
		f = d.DOM,
		a = c.IO,
		b = c.Plugins.wallet;

    function e() {
        var h = c.traceStore,
			g = "___Test___";
        h.setItem(g, "test");
        if (h.getItem(g)) {
            h.setItem(g, null);
            return true
        }
        c.sendStatistic("229.0.0");
        return false
    }
    d.mix(b, {
        getDay: function () {
            var g = new Date();
            return g.getMonth() + "" + g.getDate()
        },
        saveMsg: function (j) {
            var g = d.Cookie.get("_nk_"),
				i = c.traceStore,
				h = g + "_WalletCount";
            i.setItem(h, j)
        },
        readMsg: function () {
            var g = d.Cookie.get("_nk_"),
				i = c.traceStore,
				h = g + "_WalletCount";
            return i.getItem(h) ? d.JSON.parse(i.getItem(h)) : {}
        },
        renderCount: function (j) {
            var g = this.getRoot(),
				i = f.get(".msg-count", g);
            if (j && "0" != j && j * 1 > 0) {
                if (!i) {
                    i = f.create('<span class="msg-count"><span>' + j + "</span></span>");
                    f.append(i, f.children(g)[0])
                }
                var h = f.get(".icon-new", "#tstart-plugin-wallet");
                if (h) {
                    f.remove(h)
                }
            } else {
                i = f.get(".msg-count", g);
                if (i) {
                    f.addClass(i, "hidden")
                }
            }
        },
        updateMsg: function (h, g) {
            var i = this,
				j = i.readMsg();
            j.count -= g * 1;
            j[h] = 0;
            i.saveMsg(j);
            i.renderCount(j.count)
        },
        checkMsg: function () {
            var q = this,
				g = d.Cookie.get("_nk_"),
				p = q.getDay(),
				i, n, o, k, j, h, m, l = 0;
            if (!g || !e()) {
                return false
            }
            i = q.readMsg();
            if (i) {
                h = i.yesterday;
                m = i.today;
                l = i.count || 0
            }
            if (m) {
                n = m.split("|");
                o = n[1];
                if (p == n[0]) {
                    return q.renderCount(l)
                }
                h = m;
                j = o
            }
            a.jsonp(c.getHost("http://yingyong.{taobao}/json/toolbar/getMyPurseNum.htm"), function (r) {
                if (!r || (r && d.isObject(r) && d.isBoolean(r.login) && !r.login)) {
                    return false
                }
                if (!j || (j && j != r.count)) {
                    l = r.count
                }
                q.saveMsg(d.merge(r, {
                    count: l,
                    yesterday: h,
                    today: (p + "|" + r.count)
                }));
                q.renderCount(l)
            })
        }
    });
    c.ready(function () {
        var h = b,
			g = false;
        c.traceStore.on("contentReady", function () {
            h.checkMsg()
        });
        h.on("open", function (i) {
            if (!c.getNick()) {
                return this.renderLoginNotice()
            }
            if (!g) {
                g = true;
                c.fetchLater("wallet", true)
            } else {
                try {
                    h.hideRemain()
                } catch (j) { }
                h.selectTab()
            }
        })
    })
});