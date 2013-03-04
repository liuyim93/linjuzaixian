
KISSY.add("login/pluginpop", function (C) {
    var D = C.DOM, A = C.Event;
    var B = { _init: function () {
        if (this._el) {
            return
        }
        this._el = D.get("#J_PluginPopup");
        if (C.UA.ie && C.UA.ie < 7) {
            this._shim = D.create('<iframe class="popup-shim" style="display:none;">');
            document.body.appendChild(this._shim)
        }
        this._mask = D.create('<div class="popup-mask" style="display:none;">');
        document.body.appendChild(this._mask);
        document.body.appendChild(this._el);
        var E = this;
        C.all(".J_Close", this._el).on("click", function () {
            E.hide()
        });
        A.on(window, "resize", function () {
            E.adjustMask()
        })
    }, adjustMask: function () {
        if (this._hidden) {
            return
        }
        var E = this;
        setTimeout(function () {
            var F = D.docWidth() + "px", G = D.docHeight() + "px";
            C.one(E._mask).css("width", F).css("height", G).show();
            if (C.UA.ie && C.UA.ie < 7) {
                C.one(E._shim).css("width", F).css("height", G).show()
            }
        }, 0)
    }, _hidden: true, show: function () {
        this._init();
        this._el.style.display = "";
        this._hidden = false;
        this.adjustMask()
    }, hide: function () {
        this._init();
        this._el.style.display = "none";
        this._hidden = true;
        this._mask.style.display = "none";
        if (this._shim) {
            this._shim.style.display = "none"
        }
    }
    };
    return B
});