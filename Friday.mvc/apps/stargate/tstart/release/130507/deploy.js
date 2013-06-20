/*pub-1|2013-05-08 09:50:39*/
TStart.add("plugin~deploy", function (b) {
    var c = KISSY,
		a = c.Cookie,
		d = {
		    pickDomain: function (g, h) {
		        h = h || location.hostname;
		        var i = ".",
					f = h.split(i),
					e = f.length;
		        if (e <= 2) {
		            return h
		        }
		        g = g || 1;
		        if (g > e - 2) {
		            g = e - 2
		        }
		        //return f.slice(g).join(i)
		        return f
		    }
		};
    c.ready(function (j) {
        b.log("\u5f00\u59cb\u90e8\u7f72\u6dd8\u5b9d\u5de5\u5177\u6761");
        var i = "x",
			m = location,
			h = c.merge({
			    e: 0,
			    p: "*",
			    s: 0,
			    c: 0,
			    f: 0,
			    g: 0,
			    t: 0
			}, c.unparam(a.get(i))),
			l = window.g_config || {}, e = c.unparam(m.search.substring(1)),
			q = (l.appId === j) ? -1 : parseInt(l.appId, 10),
			f = unescape((a.get("_nk_") || "").replace(/\\u/g, "%u")),
			n = a.get("_l_g_") && f,
			p = "\u98ce\u6e05\u626c,\u94c1\u6728\u771f,\u900d\u9065\u5b50,\u4e8c\u5f53\u5bb6,\u65e0\u5d16\u5b50,\u4ee4\u72d0\u51b2,\u9b3c\u811a\u4e03,\u6b65\u60ca\u4e91,\u4e0a\u5b98\u71d5,\u963f\u9aa8\u6253,\u957f\u5b59\u6cf0,\u516c\u5b59\u5b8f,\u6b27\u9633\u6e05,\u6b27\u9633\u73e0,\u4e0a\u5b98\u7ea8,\u53e4\u897f\u98ce,\u5954\u96f7\u624b,\u516c\u7f8a\u7fbd",
			g = d.pickDomain(2),
			o = function () {
			    a.set(i, c.param(h), 365, g, "/")
			}, k = function (t, v) {
			    t = encodeURIComponent(t + "");
			    if (!(t = c.trim(t))) {
			        return false
			    }
			    var s = 0,
					u = 0,
					r = t.length;
			    for (; u < r; u++) {
			        s += t.charCodeAt(u)
			    }
			    return s % 10 < v
			};
        h.e = 1;
        h.p = "*";
        o();
        b.init();
        if ("undefined" !== typeof Light && !Light.addonIsOK() && f) {
            b.loadDPL();
            b.addStyleSheet(b.getCdn("/apps/lifeas/js/tdog/120917/main.css"));
            c.IO.getScript(b.getCdn("/apps/lifeas/js/tdog/120917/main.js"));
            b.sendStatistic("1001.0.2")
        }
    })
});