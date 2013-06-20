var TMall = TMall || {};
TMall.XDomain = function () {
    var b = KISSY,
		c = b.DOM,
		a = b.Event,
		f = window,
		e = document,
		h = b.unparam(location.search.substring(1)),
		d = f;
    f.name = "x-callee";
    var g = {
        pickDomain: function (k, l) {
            l = l || location.hostname;
            var m = ".",
				j = l.split(m),
				i = j.length;
            if (i <= 2) {
                return l
            }
            k = k || 1;
            //return j.slice(i - k).join(m)
            return l
        }
    };
    return {
        doAgent: function () {
            document.domain = g.pickDomain(2);
            d = f.parent.parent;

            function j() {
                if (!d.TMall) {
                    return
                }
                d.TMall.Header.writeLoginInfo({
                    memberServer: "http://member1.taobao.com",
                    loginServer: "https://login.taobao.com",
                    redirectUrl: "",
                    isLogin: h.isLogin,
                    nick: h.nick,
                    msgCount: parseInt(h.msgCount, 10)
                })
            }
            function k(o, n, l) {
                try {
                    var m = d.document.getElementById(o);
                    o = m.getElementsByTagName("iframe")[0];
                    o.setAttribute("height", n || o.getAttribute("height"));
                    o.setAttribute("width", l || o.getAttribute("width"));
                    m.style.height = (n || o.getAttribute("height")).replace("px", "") + "px";
                    m.style.width = (l || o.getAttribute("width")).replace("px", "") + "px"
                } catch (p) { }
            }
            function i(m) {
                try {
                    m = d.document.getElementById(m);
                    if (!m) {
                        return
                    }
                    m.style.display = "none"
                } catch (l) { }
            }
            switch (h.method) {
                case "loginCheck":
                    j();
                    break;
                case "heightReset":
                    k(h.frameId, h.height, h.width);
                    break;
                case "panelClose":
                    i(h.panelId);
                    break;
                default:
                    break
            }
        }
    }
} ();