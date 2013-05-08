KISSY.add("wangpu/decoration/compatible", function (S, Core) {
    var DOM = S.DOM, Event = S.Event, PX = /px[;]{0,1}/g, shim = "http://img04.taobaocdn.com/tps/i4/T1VhujXXBkXXXXXXXX-1-1.gif", applyPositioning = true, PNG = /\w+\.png$/;
    function Compatible(elem, config) {
        var offset = { top: "auto", bottom: "auto", left: "auto", right: "auto" };
        offset.top = DOM.css(elem, "top");
        offset.bottom = DOM.css(elem, "bottom");
        if (offset.bottom !== "auto") {
            offset.top = "auto"
        }
        offset.left = DOM.css(elem, "left");
        offset.right = DOM.css(elem, "right");
        config = config || {};
        config = S.merge(Compatible.Config, config);
        this.offset = offset;
        this.config = config;
        this.elem = S.get(elem);
        this._init()
    }
    Compatible.Config = { fixed: false, png: false, png_bg: false, png_tag: false, png_method: "crop", maxWidth: false, maxHeight: false, minWidth: false, minHeight: false, maxWidthValue: 0, maxHeightValue: 0, minWidthValue: 0, minHeightValue: 0 };
    S.augment(Compatible, { _init: function () {
        var self = this, cfg = self.config;
        if (cfg.fixed) {
            self._fixIE6PositionFixed()
        }
        if (cfg.png) {
            self._fixIE6PngTransparent()
        }
        if (cfg.maxWidth && self._isValidWidthValue()) {
            self._fixMaxWidth()
        }
        if (cfg.maxHeight && self._isValidHeightValue()) {
            self._fixMaxHeight()
        }
        if (cfg.minWidth && self._isValidWidthValue()) {
            self._fixMinWidth()
        }
        if (cfg.minHeight && self._isValidHeightValue()) {
            self._fixMinHeight()
        }
    }, _fixIE6PositionFixed: function () {
        var self = this;
        DOM.css(self.elem, "position", "absolute");
        Event.on(window, "scroll resize", function (e) {
            var top = self.offset.top && self.offset.top !== "auto" ? DOM.scrollTop() + parseInt(self.offset.top.toString().replace(PX, "")) + "px" : "auto", bottom = self.offset.bottom && self.offset.bottom !== "auto" && top === "auto" ? DOM.scrollTop() + DOM.viewportHeight() - parseInt(self.offset.bottom.toString().replace(PX, "")) - DOM.height(self.elem) + "px" : "auto", left = self.offset.left || "auto", right = self.offset.right || "auto";
            if (top == "auto") {
                DOM.css(self.elem, "top", bottom)
            } else {
                DOM.css(self.elem, "top", top)
            }
            DOM.css(self.elem, "left", left);
            DOM.css(self.elem, "right", right);
            DOM.css(self.elem, "bottom", bottom)
        })
    }, _fixIE6PngTransparent: function () {
        var self = this, cfg = self.config;
        if (cfg.png_bg == true) {
            self._bg_fnFixPng(self.elem, cfg)
        }
        if (cfg.png_tag == true) {
            self._el_fnFixPng(self.elem);
            if (applyPositioning && (self.elem.tagName == "A" || self.elem.tagName == "INPUT") && self.elem.style.position == "") {
                self.elem.style.position = "relative"
            }
            self._childrenFix(self.elem)
        }
    }, _bg_fnFixPng: function (obj, cfg) {
        var bg = obj.currentStyle.backgroundImage, src = bg.substring(5, bg.length - 2);
        if (!PNG.test(src)) {
            return
        }
        obj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='" + cfg.png_method + "')";
        obj.style.backgroundImage = "url(" + shim + ")"
    }, _el_fnFixPng: function (img) {
        var src = img.src;
        if (!PNG.test(src)) {
            return
        }
        img.style.width = img.width + "px";
        img.style.height = img.height + "px";
        img.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + src + "', sizingMethod='scale')";
        img.src = shim
    }, _childrenFix: function (elm) {
        var tags = ["a", "input", "select", "textarea", "button"], t = tags.length;
        while (t--) {
            var pFix = elm.all.tags(tags[t]), e = pFix.length;
            while (e--) {
                if (!/relative|absolute/i.test(pFix[e].currentStyle.position)) {
                    pFix[e].style.position = "relative"
                }
            }
        }
    }, _isValidWidthValue: function () {
        var self = this, cfg = self.config;
        if (cfg.maxWidth && cfg.minWidth) {
            if (cfg.maxWidthValue < cfg.minWidthValue) {
                return false
            }
        }
        return true
    }, _isValidHeightValue: function () {
        var self = this, cfg = self.config;
        if (cfg.maxHeight && cfg.minHeight) {
            if (cfg.maxHeightValue < cfg.minHeightValue) {
                return false
            }
        }
        return true
    }, _fixMaxWidth: function () {
        var self = this, cfg = self.config;
        if (self.elem && DOM.width(self.elem) > cfg.maxWidthValue) {
            DOM.css(self.elem, "width", cfg.maxWidthValue + "px")
        }
    }, _fixMaxHeight: function () {
        var self = this, cfg = self.config;
        if (self.elem && DOM.height(self.elem) > cfg.maxHeightValue) {
            DOM.css(self.elem, "height", cfg.maxHeightValue + "px")
        }
    }, _fixMinHeight: function () {
        var self = this, cfg = self.config;
        if (self.elem && DOM.height(self.elem) < cfg.minHeightValue) {
            DOM.css(self.elem, "height", cfg.minHeightValue + "px")
        }
    }, _fixMinWidth: function () {
        var self = this, cfg = self.config;
        if (self.elem && DOM.width(self.elem) < cfg.minWidthValue) {
            DOM.css(self.elem, "width", cfg.minWidthValue + "px")
        }
    } 
    });
    return Compatible
}, { requires: ["core"] });
