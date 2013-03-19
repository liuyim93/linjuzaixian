﻿KISSY.add("imagezoom", function (i, p, k, A, d) {
    function q(a) {
        var b = a.get("imageNode"),
			e = b.offset(),
			c, n, f, g, l = a.get("bigImageWidth"),
			h = a.get("bigImageHeight"),
			r = a.get("width"),
			j = a.get("height"),
			d;
        c = a.imageLeft = e.left;
        d = a.imageTop = e.top;
        e = a.imageWidth = b.width();
        n = a.imageHeight = b.height();
        f = a.zoomMultipleH = h / n;
        g = a.zoomMultipleW = l / e;
        g = a.lensWidth = r / g;
        f = a.lensHeight = j / f;
        a.minLensLeft = c;
        a.minLensTop = d;
        a.maxLensTop = d + n - f;
        a.maxLensLeft = c + e - g;
        a.maxBigImageLeft = 0;
        a.maxBigImageTop = 0;
        a.minBigImageLeft = -(l - r);
        a.minBigImageTop = -(h - j);
        a.get("type") === s ? a.set("align", {
            node: b,
            points: ["cc", "cc"]
        }) : (c = a.get("align") || {}, l = c.node, delete c.node, c = i.clone(c), c.node = l || b, a.set("align", c));
        a.icon.hide();
        t.on("mousemove mouseleave", u, a)
    }
    function v() {
        var a = this.lens;
        t.detach("mousemove mouseleave", u, this);
        this.icon.show();
        a && a.hide()
    }
    function y(a) {
        var b = a.get("imageNode"),
			e, c = a.get("type"),
			d = function () {
			    function c() {
			        h || (h = i.later(function () {
			            h = 0;
			            o(b);
			            q(a);
			            a.show();
			            a.lens.show().css({
			                width: a.lensWidth,
			                height: a.lensHeight
			            });
			            a.set("currentMouse",
						e)
			        }, 50))
			    }
			    var h;
			    c.stop = function () {
			        h.cancel();
			        h = 0
			    };
			    return c
			} (),
			f = i.buffer(function () {
			    o(b);
			    q(a);
			    a.show();
			    var c = a,
					h = e,
					d = c.bigImage;
			    d.add(c.bigImageCopy);
			    d.stop();
			    d.css({
			        width: c.imageWidth,
			        height: c.imageHeight,
			        left: 0,
			        top: 0
			    });
			    d.animate(i.mix({
			        width: c.get("bigImageWidth"),
			        height: c.get("bigImageHeight")
			    }, w(c, h)), 0.4)
			}, 50),
			g = "inner" == c ? f : d;
        b.on("mouseenter", a.__onImgEnter = function (c) {
            a.get("hasZoom") && (e = c, b.on("mousemove" + m, function (a) {
                e = a;
                g()
            }).on("mouseleave" + m, function () {
                g.stop();
                o(b)
            }), g())
        });
        a.on("afterImageSrcChange",
		z, a);
        a.on("afterHasZoomChange", x, a);
        x.call(a, {
            newVal: a.get("hasZoom")
        })
    }
    function o(a) {
        a.detach("mouseleave" + m);
        a.detach("mousemove" + m)
    }
    function u(a) {
        var b = this.imageLeft,
			e = this.imageTop,
			c = this.imageWidth,
			d = a.pageX,
			f = a.pageY,
			g = this.imageHeight;
        "mouseleave" == "" + a.type ? this.hide() : d > b && d < b + c && f > e && f < e + g ? this.set("currentMouse", {
            pageX: d,
            pageY: f
        }) : this.hide()
    }
    function x(a) {
        this.icon[a.newVal ? "show" : "hide"]()
    }
    function z(a) {
        var a = a.newVal,
			b;
        this.get("imageNode").attr("src", a);
        (b = this.bigImageCopy) && b.attr("src",
		a)
    }
    function w(a, b) {
        var d = a.get("width"),
			c = a.get("height");
        return {
            left: Math.min(Math.max(-(b.pageX - a.imageLeft) * a.zoomMultipleW + d / 2, a.minBigImageLeft), a.maxBigImageLeft),
            top: Math.min(Math.max(-(b.pageY - a.imageTop) * a.zoomMultipleH + c / 2, a.minBigImageTop), a.maxBigImageTop)
        }
    }
    var j = p.all,
		t = j(i.Env.host.document),
		m = ".ks-imagezoom-img-mouse",
		s = "inner",
		k = k.extend({
		    initializer: function () {
		        !this.get("bigImageWidth") || this.get("bigImageHeight");
		        var a, b;
		        b = this.get("imageNode");
		        a = this.imageWrap = j(i.substitute("<span class='{wrapClass}'></span>", {
		            wrapClass: this.get("prefixCls") + "imagezoom-wrap"
		        })).insertBefore(b, d);
		        a.prepend(b);
		        b = this.icon = j(i.substitute("<span class='{iconClass}'></span>", {
		            iconClass: this.get("prefixCls") + "imagezoom-icon"
		        }));
		        a.append(b);
		        y(this)
		    },
		    renderUI: function () {
		        var a = this.get("imageNode"),
					b = this.get("contentEl");
		        this.bigImage = j(i.substitute("<img src={src} {style} />", {
		            src: this.get("bigImageSrc"),
		            style: ' style="position:absolute;top:-9999px;left:-9999px;" '
		        })).appendTo(b, d);
		        this.bigImageCopy = j(i.substitute("<img src={src} {style} />", {
		            src: a.attr("src"),
		            style: ' style="position:absolute;top:-9999px;left:-9999px;" '
		        })).prependTo(b, d);
		        this.get("type") != s && (this.lens = j('<span  style="position:absolute;top:-9999px;left:-9999px;"  class="' + this.get("prefixCls") + 'imagezoom-lens"></span>').appendTo(this.imageWrap, d))
		    },
		    bindUI: function () {
		        this.on("hide", v, this)
		    },
		    destructor: function () {
		        var a = this.get("imageNode"),
					b;
		        v.call(this);
		        if (b = this.imageWrap) a.insertBefore(b, d), b.remove();
		        a.detach("mouseenter", this.__onImgEnter)
		    },
		    _onSetBigImageWidth: function (a) {
		        this.bigImage.width(a);
		        this.bigImageCopy.width(a)
		    },
		    _onSetBigImageHeight: function (a) {
		        this.bigImage.height(a);
		        this.bigImageCopy.height(a)
		    },
		    _onSetBigImageSrc: function (a) {
		        this.bigImage.attr("src", a)
		    },
		    _onSetCurrentMouse: function (a) {
		        var b, d;
		        b = a.pageX;
		        d = a.pageY;
		        var c = this.lens;
		        this.bigImage.isRunning() || (c && (b -= this.lensWidth / 2, d -= this.lensHeight / 2, c.offset({
		            left: this.lensLeft = Math.min(Math.max(b, this.minLensLeft), this.maxLensLeft),
		            top: this.lensTop = Math.min(Math.max(d, this.minLensTop), this.maxLensTop)
		        })), a = w(this, a), this.bigImageCopy.css(a),
				this.bigImage.css(a))
		    }
		}, {
		    ATTRS: {
		        imageNode: {
		            setter: function (a) {
		                return p.one(a)
		            }
		        },
		        imageSrc: {
		            valueFn: function () {
		                return this.get("imageNode").attr("src")
		            }
		        },
		        width: {
		            valueFn: function () {
		                return this.get("imageNode").width()
		            }
		        },
		        height: {
		            valueFn: function () {
		                return this.get("imageNode").height()
		            }
		        },
		        hasZoom: {
		            value: !0,
		            setter: function (a) {
		                return !!a
		            }
		        },
		        type: {
		            value: "standard"
		        },
		        bigImageSrc: {
		            valueFn: function () {
		                return this.get("imageNode").attr("data-ks-imagezoom")
		            }
		        },
		        bigImageWidth: {},
		        bigImageHeight: {},
		        currentMouse: {}
		    }
		}, {
		    xclass: "imagezoom-viewer"
		});
    k.ZoomType = {
        STANDARD: "standard",
        INNER: "inner"
    };
    return k
}, {
    requires: ["node", "overlay"]
});