KISSY.add("wangpu/mods/official/page-banner", function (S, Core, Overlay) {
    var DOM = S.DOM, Event = S.Event;
    function PageBanner(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(PageBanner, { _init: function () {
        S.log("PageBanner init start");
        var self = this;
        self._initCatsPopup();
        S.log("PageBanner init end")
    }, _initCatsPopup: function () {
        var popup = DOM.get("#J_HeadCatsPopup");
        if (popup) {
            new Overlay.Popup({ srcNode: DOM.get("#content").appendChild(popup), trigger: "#J_HeadCats", triggerType: "mouse", delay: 0.2, elStyle: { display: "block", visibility: "hidden" }, align: { node: "#J_HeadCats", points: ["bc", "tl"], offset: [-47, 4]} })
        }
    } 
    });
    PageBanner.selector = ".tshop-pbsm-spb10c";
    return PageBanner
}, { requires: ["core", "overlay"] });
