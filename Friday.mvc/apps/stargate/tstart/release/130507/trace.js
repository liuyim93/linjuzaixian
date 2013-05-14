/*pub-1|2013-05-08 09:50:40*/
TStart.add("plugin~trace", function (a) {
    a.addPlugin("trace", {
        type: "drop",
        html: '<a href="#">\u6dd8\u8db3\u8ff9</a>',
        staticCode: "27.0.-1",
        Panel: {
            title: "\u6dd8\u8db3\u8ff9",
            width: 478,
            height: 230
        },
        loginNotice: {
            name: "\u6dd8\u8db3\u8ff9",
            list: ["\u5e2e\u4f60\u627e\u56de\u66fe\u7ecf\u6d4f\u89c8\u8fc7\u7684\u5b9d\u8d1d\uff0c\u5373\u4fbf\u5fd8\u8bb0\u4e86\u6536\u85cf", "\u5728\u516c\u53f8\u7684\u7535\u8111\u4e0a\u7528\u81ea\u5df1\u8d26\u53f7\u6d4f\u89c8\u8fc7\u559c\u6b22\u7684\u5b9d\u8d1d\uff0c\u5728\u5bb6\u91cc\u7535\u8111\u4e0a\u767b\u5f55\u540e\u53ef\u4ee5\u770b\u5230"],
            staticCode: "12.10.1.1"
        }
    })
});
TStart.add("trace~light", function (a) {
    var c = KISSY,
		e = c.DOM,
		d = "#",
		f = a.Plugins.trace;

    function b(g) {
        if (!g) {
            return false
        }
        var h = c.JSON.parse(e.attr(g.node, "data-value")) || null,
			i;
        if (!h) {
            return false
        }
        i = h[g.saveId];
        if (i) {
            a.IO.getScript(c.substitute(g.saveURL, {
                saveId: i
            }))
        }
    }
    c.mix(f, {
        record: function () {
            if (a.getNick() && a.isOnline) {
                b({
                    node: "#J_shopViewed",
                    saveId: "shopId",
                    saveURL: "http://track.taobao.com/collect/2.go?pid={saveId}"
                })
            }
        }
    });
    a.ready(function () {
        f.record();
        f.on("open", function (g) {
            if (!a.getNick()) {
                return this.renderLoginNotice()
            }
            if (!f.mod) {
                a.fetchLater("trace", true)
            } else {
                f.mod.init()
            }
        })
    })
});