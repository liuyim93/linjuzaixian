KISSY.add(V + "/mods/smc", function (f) {
    var a = f.DOM,
		l = f.Event,
		e = f.UA.ie == 6;
    var k = "product",
		c = "productIcons",
		b = "productAttrs",
		h = "product-iWrap";
    var i = /^https?:\/\/\S+$/i;
    var g = f.get("#J_ItemList");
    var d = (DEV_EV == "online" ? "http://smc.tmall.com" : "http://smc.tmall.net") + "/doGetNewSmcService.htm";

    function j() {
        if (!(this instanceof j)) {
            return new j()
        }
        this._init()
    }
    f.augment(j, f.EventTarget, {
        _init: function () {
            if (!(g && d)) {
                return
            }
            this._request()
        },
        _request: function () {
            var m = this;
            f.ready(function () {
                var q = a.query("." + k, g),
					n = 15,
					s = 90,
					r = s / n,
					t = [],
					o = (document.getElementsByName("area_code")[0] || {
					    value: ""
					}).value,
					u = a.attr(g, "data-area");
                for (var p = 0; p < r; p++) {
                    t.push(q.slice(p * n, (p + 1) * n))
                }
                f.each(t, function (x, v) {
                    var w = x[0];
                    w && LIST.util.bindScrollAsync(w, function () {
                        var z = [],
							A, y;
                        f.each(x, function (B) {
                            A = a.attr(B, "data-id");
                            A && (z[z.length] = A)
                        });
                        z.length && f.io({
                            dataType: "jsonp",
                            url: d,
                            data: {
                                itemIds: z.join(","),
                                areaId: o,
                                t: e ? +new Date : 0
                            },
                            jsonp: "callback",
                            jsonpCallback: "jsonp_smc_" + v,
                            success: function (B) {
                                f.log(B);
                                m._render(B, x, u)
                            }
                        })
                    }, 0, !v)
                })
            })
        },
        _render: function (n, m, o) {
            if (!(n && f.isObject(n))) {
                return
            }
            f.each(m, function (v) {
                var w = a.attr(v, "data-id");
                if (w && n[w]) {
                    var u = n[w],
						s = u.icons,
						q = u.date;
                    var p = f.get("." + c, v);
                    if (!p) {
                        p = a.create('<p class="' + c + '"></p>');
                        var t = a.get("." + b, v);
                        if (t) {
                            a.insertBefore(p, t)
                        } else {
                            a.append(p, a.get("." + h, v))
                        }
                    }
                    var r = "";
                    if (q && q !== "0") {
                        r += '<span class="productPostDay">\u9884\u8ba1<em>' + q + "</em>\u9001\u8fbe" + (o ? "<b>" + o + "</b>" : "") + "</span>"
                    }
                    s.length && f.each(s, function (x) {
                        r += i.test(x.imgsrc) ? (i.test(x.link) ? '<a href="' + x.link + '" title="' + x.alt + '" target="_blank"><img src="' + x.imgsrc + '" /></a>' : '<img src="' + x.imgsrc + '" title="' + x.alt + '" />') : ""
                    });
                    r && a.html(p, r)
                }
            })
        }
    });
    return {
        init: function () {
            //2013-08-21 basilwang we don't want load smc
            //new j()
        }
    }
});