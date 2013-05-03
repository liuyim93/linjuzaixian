(function () {
    var d = KISSY,
		n = d.DOM,
		l = "http://delta.taobao.com/home/delivery/AllContentByPage.do?resourceIds=",
		f = "J_DirectPromo",
		g = "J_DirectPromo_",
		j = "J_DirectPromoFloatBox",
		e = "__content_results",
		a = /^https?:\/\/\S+$/i,
		h = /^https?:\/\/\S+(png|jpg|gif)$/i,
		i = window,
		c = false,
		k = {}, m = [];

    function b(r, p) {
        var o = r.length,
			q;
        while (o--) {
            q = r[o];
            if (!d.inArray(q, p)) {
                p.push(q)
            }
        }
        return p
    }
    DirectPromo = {
        init: function (r) {
            var o = d.query("." + f),
				p = [],
				q;
            if (!o || o.length === 0) {
                return
            }
            d.each(o, function (s) {
                q = s.getAttribute("data-resid");
                if (q) {
                    p.push(q);
                    k[q] = s
                }
            });
            r && (p = b(r, p));
            this.request(p)
        },
        request: function (s, r, p) {
            var q = this,
				o = l + s.join(",") + "&t=" + +new Date;
            d.getScript(o, function () {
                var t = i[e],
					v, u = 0;
                if (!t || t.length === 0) {
                    return
                }
                if (r && r > 0) {
                    for (; u < r; u++) {
                        v = t[u].content;
                        if (v && h.test(v)) {
                            new Image().src = v
                        }
                    }
                }
                m = m.concat(t);
                q.render(p)
            })
        },
        render: function (q) {
            var p = m.length,
				r, o, s;
            while (p--) {
                r = m[p];
                s = r.id;
                if (!k[s]) {
                    o = d.get("#" + (s === q ? j : g + s));
                    if (o) {
                        k[s] = o
                    } else {
                        continue
                    }
                }
                m.splice(p, 1);
                this._fill(r)
            }
        },
        detect: function (p) {
            var o = 100,
				s = 50,
				r = 0,
				q = this;
            if (c) {
                return
            }
            c = true;
            (function () {
                var u, t;
                d.each(m, function (w, v) {
                    u = w.id;
                    if (!k[u]) {
                        t = d.get("#" + (u === p ? j : g + u));
                        if (t) {
                            k[u] = t
                        }
                    }
                    if (k[u]) {
                        q._fill(m.splice(v, 1)[0]);
                        return false
                    }
                });
                if (m.length > 0 && ++r < s) {
                    setTimeout(arguments.callee, o)
                } else {
                    c = false
                }
            })()
        },
        _fill: function (t) {
            var o = k[t.id],
				s = t.content,
				r = t.link,
				p;
            if (t.id == 315 && s) {
                try {
                    Tmall.SetUserAreaInfo(s)
                } catch (q) { }
                return
            }
            if (!o || !s) {
                return
            }
            if (h.test(s)) {
                p = '<img src="' + s + '" />'
            } else {
                if (s == "http://tms.tms.tms") {
                    return
                } else {
                    if (a.test(s)) {
                        p = '<iframe src="' + s + '" scrolling="no" frameborder="0" width="330" height="200"></iframe>';
                        r = ""
                    } else {
                        if (t.id == 395) {
                            if (s && s == "chaoshi") {
                                n.show(o)
                            } else {
                                n.remove(o)
                            }
                            return
                        } else {
                            p = s
                        }
                    }
                }
            }
            o.innerHTML = r ? '<a target="_blank" href="' + r + '">' + p + "</a>" : p
        }
    };
    DirectPromo.init()
})();