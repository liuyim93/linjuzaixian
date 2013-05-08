KISSY.add("wangpu/mods/official/search-list", function (S, Core) {
    var DOM = S.DOM, Event = S.Event;
    function SearchList(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(SearchList, { _init: function () {
        S.log("SearchList init start");
        Event.on(DOM.query("#J_AttrBox .x-more"), "click", function () {
            var tr = DOM.parent(this, "tr");
            var lis = DOM.query("li", tr);
            if (lis.length > 6) {
                for (var j = 6; j < lis.length; j++) {
                    DOM.toggleClass(lis[j], "hidden")
                }
            }
            var i = DOM.query("i", this);
            var span = DOM.query("span", this);
            DOM.toggleClass(i, "part");
            DOM.toggleClass(span, "hidden")
        });
        Event.on(DOM.query("#J_PropSingle .more"), "click", function () {
            var trs = DOM.query("#J_AttrBox tr");
            if (trs.length > 3) {
                for (var i = 3; i < trs.length; i++) {
                    DOM.toggleClass(trs[i], "hidden")
                }
            }
            var i = DOM.query("i", this);
            var span = DOM.query("span", this);
            DOM.toggleClass(i, "part");
            DOM.toggleClass(span, "hidden")
        });
        Event.on(DOM.query("#J_TBaotypeBox"), "click", function () {
            var baobei_type = document.getElementById("baobei_type").value;
            if (baobei_type == "1003") {
                document.getElementById("baobei_type").value = ""
            } else {
                document.getElementById("baobei_type").value = "1003"
            }
            document.getElementById("shop-search-list").submit()
        });
        S.log("SearchList init end")
    } 
    });
    SearchList.selector = ".tshop-pbsm-ssl10w";
    return SearchList
}, { requires: ["core"] });
