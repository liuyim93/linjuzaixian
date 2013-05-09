KISSY.add("wangpu/mods/official/self-defined", function (S, Core) {
    var doc = document, DOM = S.DOM, Event = S.Event;
    function SelfDefined(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(SelfDefined, { _init: function () {
        S.log("SelfDefined init start");
        var self = this;
        self._initFilter();
        S.log("SelfDefined init end")
    }, _initFilter: function () {
        var self = this, HINT = "\u60a8\u9009\u4e2d\u7684\u5185\u5bb9\u53ef\u80fd\u6709\u5b89\u5168\u9690\u60a3,\u8bf7\u8c28\u614e\u4f7f\u7528! ", container = DOM.get(".shop-custom", self._mod), tmp = doc.createElement("div"), START = "<.+(?:", END = ").+>", SPACE = "\\s*", LINE_FEED = /[\r\n]+/g, shitProps = [["display", "none"], ["visibility", "hidden"], ["width", "0"], ["text-indent", "-\\d{3,}"]], shitRegArr = [], shitRegStr, shitReg;
        S.each(shitProps, function (prop) {
            shitRegArr.push(prop[0] + SPACE + ":" + SPACE + prop[1])
        });
        shitRegStr = START + shitRegArr.join("|") + END;
        shitReg = new RegExp(shitRegStr, "mi");
        Event.on(container, "copy", function (evt) {
            var userSelection, selectedHtml;
            if (window.getSelection) {
                userSelection = window.getSelection()
            } else {
                if (doc.selection) {
                    userSelection = doc.selection.createRange()
                }
            }
            selectedHtml = userSelection.htmlText || userSelection.getRangeAt(0).cloneContents();
            if ("string" !== typeof selectedHtml) {
                tmp.appendChild(selectedHtml);
                selectedHtml = tmp.innerHTML
            }
            selectedHtml = selectedHtml.replace(LINE_FEED, "");
            if (shitReg.test(selectedHtml)) {
                alert(HINT);
                evt.halt()
            }
            tmp.innerHTML = ""
        })
    } 
    });
    SelfDefined.selector = ".tshop-pbsm-ssd10c";
    return SelfDefined
}, { requires: ["core"] });
