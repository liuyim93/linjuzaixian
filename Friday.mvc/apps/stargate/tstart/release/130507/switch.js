/*pub-1|2013-05-08 09:50:40*/
TStart.add("plugin~switch", function (a) {
    a.addPlugin("switch", {
        type: "custom",
        html: '<span id="J_SwitchArea" class="toggle-area"><s class="tstart-item-icon"></s><span class="switch-mini" style="display:none"></span></span><span class="switch-mini-tip J_SwitchTip"></span>'
    })
});
TStart.add("switch~light", function (e) {
    var g = KISSY,
		t = g.DOM,
		v = g.Event,
		j = g.UA,
		b = e.Plugins["switch"],
		f = window,
		w = "TSTART_STATUS_" + (e.getNick() || ""),
		h = e.store,
		l, a = "tstart-minimized",
		c = j.flash && j.flash > 9.1,
		d = e.getHost("http://www.{taobao}/go/rgn/toolbar/switch-popup.php"),
		q = e.cdnPath + "switch/later.css",
		u = false;

    function m() {
        if (!c) {
            return "1"
        }
        return h.getItem(w) || "1"
    }
    function i() {
        if (c) {
            var x = m(),
				y = Math.abs(x - 1),
				z = {
				    HIDE: "31.0.-1",
				    SHOW: "79.0.-1"
				};
            h.setItem(w, y);
            e.sendStatistic(z[y ? "SHOW" : "HIDE"])
        }
    }
    function o(y, x) {
        t.toggleClass(y, a);
        i();
        s()
    }
    function r() {
        if (l) {
            clearTimeout(l);
            l = null
        }
    }
    function s() {
        var y = t.get(".J_SwitchTip", "#tstart"),
			x = t.hasClass("#tstart", a) ? 1 : 0;
        t.removeClass("#tstart-plugin-switch", "hover");
        if (y) {
            if (x) {
                t.addClass(y, "switch-hide");
                t.css(y, "display", "inline-block");
                l = setTimeout(function () {
                    t.css(y, "display", "none");
                    l = null
                }, 4000)
            } else {
                r();
                t.css(y, "display", "none");
                t.removeClass(y, "switch-hide")
            }
        }
    }
    function n(A, y) {
        var z = f._TOOLBAR_SWITCH_POPUP,
			x;
        if (u) {
            return false
        }
        u = true;
        if (z) {
            x = t.get(".switch-tip", A);
            t.removeClass(x, "hidden");
            u = false
        } else {
            e.loadDPL();
            e.addStyleSheet(q);
            g.getScript(d, function () {
                z = f._TOOLBAR_SWITCH_POPUP;
                x = t.create(z);
                t.get(".tstart-areas", A).appendChild(x);
                v.on(x, "click", function (B) {
                    var C = B.target;
                    if (t.hasClass(C, "J_Close")) {
                        B.preventDefault();
                        t.addClass(x, "hidden")
                    }
                    if (t.hasClass(C, "J_Sure")) {
                        B.preventDefault();
                        o(A, y);
                        t.addClass(x, "hidden")
                    }
                });
                u = false
            })
        }
    }
    function p() {
        var B = b,
			A = t.get("#tstart"),
			z = B.getRoot(),
			D = 0,
			y = g.get("a", z),
			x = g.get(".tstart-item-icon", z),
			E;
        E = function () {
            var F = m();
            e.log("switch: \u5b58\u50a8\u72b6\u6001\u4e3a: " + F);
            if (F === "0") {
                t.addClass(A, a)
            } else {
                if (F === "1") {
                    t.removeClass(A, a)
                }
            }
        };
        k(x);
        if (c) {
            e.log("switch: \u652f\u6301 flash");
            try {
                e.store.on("contentReady", E)
            } catch (C) {
                e.log("switch: flash \u51fa\u9519.");
                E()
            }
        } else {
            e.log("switch: \u4e0d\u652f\u6301 flash");
            E()
        }
    }
    function k(x) {
        if (!x) {
            return false
        }
        var z = t.get("#tstart"),
			y = t.get("#tstart-plugin-switch"),
			A = t.get(".J_SwitchTip", y);
        v.on("#J_SwitchArea", "click", function (B) {
            B.preventDefault();
            if (!t.hasClass(z, a)) {
                n(z, x)
            } else {
                o(z, x)
            }
        });
        v.on("#J_SwitchArea", "mouseenter mouseleave", function (B) {
            if (t.hasClass(z, a)) {
                r();
                t.removeClass(A, "switch-hide");
                t.css(A, "display", "none");
                if ("mouseenter" === B.type) {
                    t.addClass(y, "hover")
                } else {
                    t.removeClass(y, "hover")
                }
            }
        })
    }
    e.ready(p)
});