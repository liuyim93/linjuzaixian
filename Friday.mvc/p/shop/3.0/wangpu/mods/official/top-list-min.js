KISSY.add("wangpu/mods/official/top-list", function (S, Core, Switchable, Overlay, Node) {
    var doc = document,
		DOM = S.DOM,
		Event = S.Event;

    function TopList(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(TopList, {
        _init: function () {
            S.log("TopList init start");
            var self = this;
            self._initTab();
            self._initPopup();
            S.log("TopList init end")
        },
        _initTab: function () {
            var dataEl, self = this,
				triggers, panels, val, activeIndex = 0,
				tabs;
            if (DOM.get("ul.tab-nav", self._mod) == null) {
                return
            }
            var noPicUrl = "http://img.taobao.com/newshop/nopicture.gif",
				markup = '<li><div class="pic"><a target="_blank" href="#href#"><img width="40px" bigpicurl="#bigpic#" src="#src#"></a></div><div class="desc"><a target="_blank" title="#title#" href="#href#">#title#</a></div><div class="price"><i></i>#price#</div><div class="collecter"><i></i>\u6536\u85cf\u4eba\u6c14&nbsp;&nbsp;#colcount#</div></li>',
				pic_suffix = "_40x40.jpg",
				big_pic_suffix = "_120x120.jpg",
				rankpanel2 = DOM.query(".J_TopColl");
            var conf = DOM.get("#J_dcTopListData"),
				val = DOM.attr(conf, "data-value");
            if (conf && val) {
                val = eval("(" + val + ")")
            }
            if (!val) {
                return
            }
            if (val.list === "topCollect") {
                activeIndex = 1
            } else {
                activeIndex = 0
            }
            triggers = DOM.query("li", DOM.get("ul.tab-nav", self._mod));
            panels = DOM.query("div.rank-panel", self._mod);
            var tabs_cfg = {
                triggers: triggers,
                panels: panels,
                delay: 0.5,
                activeTriggerCls: "selected"
            };
            if (triggers.length === 0) {
                tabs_cfg.hasTriggers = false
            }
            tabs = new Switchable.Tabs(DOM.get("div.rank-tab", self._mod), tabs_cfg);
            tabs.on("switch", function (ev) {
                var tg = ev.target,
					index = ev.currentIndex,
					curr = DOM.get(".J_TopColl", tg.content),
					rindex = -1;
                if (index == 1 && DOM.attr(curr, "init-data") != "true") {
                    window.shop = window.shop || {};
                    S.query("div.J_TopColl").each(function (v, k) {
                        if (curr == v) {
                            rindex = k
                        }
                    });
                    S.getScript(DOM.attr(curr, "data-url") + "&jsoncallback=window.shop.rankCallback&index=" + rindex);
                    window.shop.rankCallback = function (data) {
                        var result = "",
							spm = DOM.attr(DOM.parent("#J_ranktab", 3), "data-spm");
                        spm = spm && spm.substring(0, 3) == "110" ? spm : "";
                        if (data && data.items) {
                            S.each(data.items, function (v, k) {
                                result += markup.replace(/#href#/g, v.link + (spm != "" ? "&spm=" + spm : "")).replace(/#bigpic#/g, v.imageUrl + big_pic_suffix).replace(/#src#/g, v.imageUrl + pic_suffix).replace(/#title#/g, v.title).replace(/#price#/g, v.price).replace(/#colcount#/g, v.collectorCount)
                            });
                            DOM.html(DOM.get("ul", rankpanel2[data.index || 0]), result);
                            DOM.attr(rankpanel2[data.index || 0], "init-data", "true");
                            result = ""
                        }
                    }
                }
            });
            tabs.switchTo(activeIndex)
        },
        _initPopup: function () {
            var self = this,
				popup;
            popup = new Overlay.Popup({
                triggerType: "mouse"
            });
            var rankPanels = DOM.get(".rank-panels", self._mod),
				$ = Node.all;
            Event.delegate(rankPanels, "mouseenter", "div.pic", function (e) {
                var t = $(e.currentTarget);
                popup.set("content", '<img src="' + t.one("img").attr("bigpicurl") + '"/>');
                popup.set("align", {
                    node: t,
                    points: ["tr", "tl"],
                    offset: [0, 0]
                });
                popup.show()
            });
            Event.delegate(rankPanels, "mouseleave", "div.pic", function (e) {
                popup.hide()
            })
        }
    });
    TopList.selector = ".tshop-pbsm-stl10c";
    return TopList
}, {
    requires: ["core", "switchable", "overlay", "node"]
});