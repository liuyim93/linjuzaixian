/*pub-1|2013-05-03 12:21:26*/
KISSY.add("tb-home/js/game/v2/errorbox", function (d, q, r, e) {
    var m = d.UA,
		b = window,
		h = r.Target,
		s = b.document,
		c, o = m.ie,
		g = (o === 6),
		j = "ks-error-box",
		k = "ks-error-box-style",
		i = "ks-error-shim",
		p = "hidden",
		t = "",
		l = {
		    boxCls: t,
		    width: t,
		    shim: g,
		    offset: -1,
		    align: "bl"
		};

    function f(w, v) {
        var u = this;
        if (!(u instanceof f)) {
            return new f(textInput, dataArray, v)
        }
        u.node = q.get(w);
        u.config = v = d.merge(l, v);
        u._init();
        return 0
    }
    d.augment(f, h, {
        _init: function () {
            var u = this;
            c = s.body;
            u._initBox();
            if (u.config.shim) {
                u._initShim()
            }
            u._initStyle()
        },
        _initBox: function () {
            var u = this,
				w = u.config.boxCls;
            var v = q.create("<div>", {
                "class": j + (w ? " " + w : t),
                style: "position:absolute;visibility:hidden"
            });
            c.insertBefore(v, c.firstChild);
            u.box = v;
            u._setRegion()
        },
        _initStyle: function () {
            var u = q.get("#" + k);
            if (u) {
                return
            }
            q.addStyleSheet(".ks-error-box{background:#fff2e8;border:1px solid #ff5500;z-index:99999;color:#000;padding:0 6px;line-height:22px;}.ks-error-box .highlight{color:#ff5500}.ks-error-shim{z-index:99998}.ks-error-box{*margin-left:2px;_margin-top:2px}", k)
        },
        _setRegion: function () {
            var u = this,
				v = u.config,
				x = u.node,
				y = q.offset(x),
				w = u.box;
            q.css(w, {
                left: (o == 7) ? (y.left - 2) : y.left,
                top: y.top + x.offsetHeight + v.offset
            });
            if (g) {
                q.offset(w, {
                    left: y.left,
                    top: y.top + x.offsetHeight + v.offset
                })
            }
            q.width(w, v.width || x.offsetWidth - 14)
        },
        _initShim: function () {
            var u = this,
				v = q.create("<iframe>", {
				    src: "about:blank",
				    "class": i,
				    style: "position:absolute;visibility:hidden;border:none"
				});
            this.box.shim = v;
            c.insertBefore(v, c.firstChild);
            u._setShimRegion()
        },
        _setShimRegion: function () {
            var u = this,
				w = u.box,
				v = w.style,
				x = w.shim;
            if (x) {
                q.css(x, {
                    left: parseInt(v.left) + 2,
                    top: parseInt(v.top) + 2,
                    width: parseInt(v.width) + 2,
                    height: q.height(w) - 2
                })
            }
        },
        set: function (u) {
            this.box.innerHTML = u
        },
        show: function () {
            var u = this;
            if (u.isVisible()) {
                return
            }
            var v = u.box,
				w = v.shim;
            if (!q.html(v)) {
                return
            }
            u._setRegion();
            u._setShimRegion();
            a(v);
            if (w) {
                a(w)
            }
        },
        hide: function () {
            if (!this.isVisible()) {
                return
            }
            var u = this.box,
				v = u.shim;
            if (v) {
                n(v)
            }
            n(u)
        },
        isVisible: function () {
            return this.box.style.visibility != p
        }
    });

    function a(u) {
        u.style.visibility = t
    }
    function n(u) {
        u.style.visibility = p
    }
    f.version = 1;
    d.ErrorBox = f;
    return f
}, {
    requires: ["dom", "event"]
});