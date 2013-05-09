KISSY.add("wangpu/mods/official/shopinsearch-head", function (S, Core) {
    var doc = document, DOM = S.DOM, Event = S.Event;
    function ShopinsearchHead(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(ShopinsearchHead, { _init: function () {
        S.log("ShopinsearchHead init start");
        this._inputHint("#J_ShopSKey");
        S.log("ShopinsearchHead init end")
    }, _inputHint: function (elem) {
        elem = DOM.get(elem);
        if (!elem) {
            return
        }
        var elemParent = elem.parentNode, FOCUS = "focus", blurHandle = function () {
            "" !== elem.value ? DOM.addClass(elemParent, FOCUS) : DOM.removeClass(elemParent, FOCUS)
        };
        Event.on(elem, FOCUS, function (evt) {
            DOM.addClass(elemParent, FOCUS)
        });
        Event.on(elem, "blur", blurHandle);
        setTimeout(blurHandle, 0)
    } 
    });
    ShopinsearchHead.selector = ".tshop-pbsm-ssish10c";
    return ShopinsearchHead
}, { requires: ["core"] });
