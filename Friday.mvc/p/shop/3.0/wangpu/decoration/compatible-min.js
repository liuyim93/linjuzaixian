KISSY.add("wangpu/decoration/compatible", function (e, f) {
    var i = e.DOM,
		h = e.Event,
		d = /px[;]{0,1}/g,
		c = "http://img04.taobaocdn.com/tps/i4/T1VhujXXBkXXXXXXXX-1-1.gif",
		g = true,
		a = /\w+\.png$/;

    function b(k, j) {
        var l = {
            top: "auto",
            bottom: "auto",
            left: "auto",
            right: "auto"
        };
        l.top = i.css(k, "top");
        l.bottom = i.css(k, "bottom");
        if (l.bottom !== "auto") {
            l.top = "auto"
        }
        l.left = i.css(k, "left");
        l.right = i.css(k, "right");
        j = j || {};
        j = e.merge(b.Config, j);
        this.offset = l;
        this.config = j;
        this.elem = e.get(k);
        this._init()
    }
    b.Config = {
        fixed: false,
        png: false,
        png_bg: false,
        png_tag: false,
        png_method: "crop",
        maxWidth: false,
        maxHeight: false,
        minWidth: false,
        minHeight: false,
        maxWidthValue: 0,
        maxHeightValue: 0,
        minWidthValue: 0,
        minHeightValue: 0
    };
    e.augment(b, {
        _init: function () {
            var k = this,
				j = k.config;
            if (j.fixed) {
                k._fixIE6PositionFixed()
            }
            if (j.png) {
                k._fixIE6PngTransparent()
            }
            if (j.maxWidth && k._isValidWidthValue()) {
                k._fixMaxWidth()
            }
            if (j.maxHeight && k._isValidHeightValue()) {
                k._fixMaxHeight()
            }
            if (j.minWidth && k._isValidWidthValue()) {
                k._fixMinWidth()
            }
            if (j.minHeight && k._isValidHeightValue()) {
                k._fixMinHeight()
            }
        },
        _fixIE6PositionFixed: function () {
            var j = this;
            i.css(j.elem, "position", "absolute");
            h.on(window, "scroll resize", function (o) {
                var n = j.offset.top && j.offset.top !== "auto" ? i.scrollTop() + parseInt(j.offset.top.toString().replace(d, "")) + "px" : "auto",
					k = j.offset.bottom && j.offset.bottom !== "auto" && n === "auto" ? i.scrollTop() + i.viewportHeight() - parseInt(j.offset.bottom.toString().replace(d, "")) - i.height(j.elem) + "px" : "auto",
					m = j.offset.left || "auto",
					l = j.offset.right || "auto";
                if (n == "auto") {
                    i.css(j.elem, "top", k)
                } else {
                    i.css(j.elem, "top", n)
                }
                i.css(j.elem, "left", m);
                i.css(j.elem, "right", l);
                i.css(j.elem, "bottom", k)
            })
        },
        _fixIE6PngTransparent: function () {
            var k = this,
				j = k.config;
            if (j.png_bg == true) {
                k._bg_fnFixPng(k.elem, j)
            }
            if (j.png_tag == true) {
                k._el_fnFixPng(k.elem);
                if (g && (k.elem.tagName == "A" || k.elem.tagName == "INPUT") && k.elem.style.position == "") {
                    k.elem.style.position = "relative"
                }
                k._childrenFix(k.elem)
            }
        },
        _bg_fnFixPng: function (l, j) {
            var k = l.currentStyle.backgroundImage,
				m = k.substring(5, k.length - 2);
            if (!a.test(m)) {
                return
            }
            l.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + m + "', sizingMethod='" + j.png_method + "')";
            l.style.backgroundImage = "url(" + c + ")"
        },
        _el_fnFixPng: function (j) {
            var k = j.src;
            if (!a.test(k)) {
                return
            }
            j.style.width = j.width + "px";
            j.style.height = j.height + "px";
            j.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + k + "', sizingMethod='scale')";
            j.src = c
        },
        _childrenFix: function (n) {
            var k = ["a", "input", "select", "textarea", "button"],
				l = k.length;
            while (l--) {
                var j = n.all.tags(k[l]),
					m = j.length;
                while (m--) {
                    if (!/relative|absolute/i.test(j[m].currentStyle.position)) {
                        j[m].style.position = "relative"
                    }
                }
            }
        },
        _isValidWidthValue: function () {
            var k = this,
				j = k.config;
            if (j.maxWidth && j.minWidth) {
                if (j.maxWidthValue < j.minWidthValue) {
                    return false
                }
            }
            return true
        },
        _isValidHeightValue: function () {
            var k = this,
				j = k.config;
            if (j.maxHeight && j.minHeight) {
                if (j.maxHeightValue < j.minHeightValue) {
                    return false
                }
            }
            return true
        },
        _fixMaxWidth: function () {
            var k = this,
				j = k.config;
            if (k.elem && i.width(k.elem) > j.maxWidthValue) {
                i.css(k.elem, "width", j.maxWidthValue + "px")
            }
        },
        _fixMaxHeight: function () {
            var k = this,
				j = k.config;
            if (k.elem && i.height(k.elem) > j.maxHeightValue) {
                i.css(k.elem, "height", j.maxHeightValue + "px")
            }
        },
        _fixMinHeight: function () {
            var k = this,
				j = k.config;
            if (k.elem && i.height(k.elem) < j.minHeightValue) {
                i.css(k.elem, "height", j.minHeightValue + "px")
            }
        },
        _fixMinWidth: function () {
            var k = this,
				j = k.config;
            if (k.elem && i.width(k.elem) < j.minWidthValue) {
                i.css(k.elem, "width", j.minWidthValue + "px")
            }
        }
    });
    return b
}, {
    requires: ["core"]
});