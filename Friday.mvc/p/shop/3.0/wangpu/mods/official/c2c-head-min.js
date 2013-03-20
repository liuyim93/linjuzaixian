KISSY.add("wangpu/mods/official/c2c-head", function (d, g, b, k) {
    var h = document,
		m = d.DOM,
		i = d.Event,
		f = d.UA.ie,
		l = location.hostname.indexOf("taobao.com") != -1 ? "taobao.com" : "daily.taobao.net",
		c = "http://s." + l + "/search";

    function j(o) {
        var n = this;
        n._mod = o.mod;
        if (!n._mod) {
            return
        }
        n._init()
    }
    d.augment(j, {
        _init: function () {
            d.log("C2CHead init start");
            this._initArchive();
            this._initSearch();
            this._someFix();
            d.log("C2CHead init start")
        },
        _initArchive: function () {
            var n = this;
            n._initRankPopup();
            n._initShopStat()
        },
        _initRankPopup: function () {
            new b.Popup({
                srcNode: "#shop-rank-popup",
                trigger: "#shop-rank",
                triggerType: "mouse",
                elStyle: {
                    display: "block",
                    visibility: "hidden",
                    position: "absolute",
                    left: "-9999px",
                    top: "-9999px"
                },
                align: {
                    node: "#shop-rank",
                    points: ["bc", "tl"],
                    offset: [-20, 10]
                }
            })
        },
        _initShopStat: function () {
            var o = m.get("#J_SCollCount"),
				n;
            if (!o || !(n = d.unparam(o.getAttribute("data-info")))) {
                return
            }
            window.setShopStat = function (p) {
                p = parseInt(p[n.param], 10);
                if (p > 0) {
                    o.innerHTML = '<span>\u6536\u85cf\u4eba\u6c14\uff1a</span> <a href="' + n.mecuryUrl + '">' + p + "</a>"
                }
            };
            d.getScript(a(n.countUrl) + "&keys=" + n.param + "&callback=setShopStat")
        },
        _initSearch: function () {
            this._inputHit("#shop-q");
            this._initTBSearch("#J_TBSearchForm")
        },
        _inputHit: function (p) {
            p = m.get(p);
            if (!p) {
                return
            }
            var q = p.parentNode,
				n = "focus",
				o = function () {
				    "" !== p.value ? m.addClass(q, n) : m.removeClass(q, n)
				};
            i.on(p, n, function (r) {
                m.addClass(q, n)
            });
            i.on(p, "blur", o);
            setTimeout(o, 0)
        },
        _initTBSearch: function (o) {
            if (!(o = m.get(o))) {
                return
            }
            var r = o["shop-q"],
				p, s;
            if (!r) {
                return
            }
            i.on(m.query("button", o), "click", function (q) {
                var t = this;
                o.action = m.hasClass(t, "searchtb") ? c : m.attr(t, "data-action");
                o.submit()
            });
            var n = new k(r, "http://suggest.taobao.com/sug?code=utf-8", {
                resultFormat: "\u7ea6%result%\u4e2a\u5b9d\u8d1d",
                containerWidth: "312px"
            });
            if (window.g_config && (s = window.g_config.appId)) {
                p = 16 === s ? "ratez" : "shopz";
                (function (u) {
                    var q = document.createElement("input");
                    q.setAttribute("type", "hidden");
                    q.setAttribute("name", "initiative_id");

                    function t() {
                        var w = new Date;
                        var x = w.getMonth() + 1;
                        if (x < 10) {
                            x = "0" + x
                        }
                        var v = w.getDate();
                        if (v < 10) {
                            v = "0" + v
                        }
                        return [w.getFullYear(), x, v].join("")
                    }
                    q.value = u + "_" + t();
                    m.append(q, o)
                })(p)
            }
        },
        _someFix: function () {
            d.each(["#shop-info", "#shop-search .searchmy", "#shop-search .searchtb"], function (n) {
                e(n)
            })
        }
    });
    j.selector = "#shop-head";
    return j;

    function e(n) {
        if (f && 6 === f) {
            n = m.get(n);
            if (!n) {
                return
            }
            i.add(n, "mouseenter", function (o) {
                m.addClass(this, "hover")
            });
            i.add(n, "mouseleave", function (o) {
                m.removeClass(this, "hover")
            })
        }
    }
    function a(o) {
        var n = d.now();
        return o + (o.indexOf("?") === -1 ? "?" : "&") + "t=" + n
    }
}, {
    requires: ["core", "overlay", "suggest"]
});