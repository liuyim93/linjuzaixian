KISSY.add("wangpu/decoration/init", function (S, Core, Switchable, Overlay, Compatible, Countdown, DataLazyload, ISVStat) {
    var doc = document, DOM = S.DOM, Event = S.Event;
    function Decoration(context) {
        var self = this;
        self._mod = context.mod;
        self._context = context;
        if (!self._mod) {
            return
        }
        self.init()
    }
    S.augment(Decoration, { init: function () {
        var start = (new Date).getTime();
        S.log("Decoration init start");
        var self = this, pageType = self._context.pageType;
        if (!pageType) {
            pageType = "wangpu"
        }
        switch (pageType) {
            case "wangpu":
                self.initForShopPage();
                break;
            default:
                self.initForOtherPage()
        }
        var end = (new Date).getTime();
        S.log("Decoration init end");
        S.log("Decoration init spend time ms:" + (end - start))
    }, initForShopPage: function () {
        var self = this;
        S.ready(function () {
            self.initWidget("J_TWidget", self._mod);
            self.initPicLazyload();
            self.initCartPlugin();
            self.initISV();
            self.initBuriedStatistics();
            self.handleDesignEntr()
        })
    }, initForOtherPage: function () {
        var self = this;
        S.ready(function () {
            self.initWidget("J_TWidget", self._mod);
            self.initPicLazyload();
            self.initCartPlugin();
            self.initISV()
        })
    }, preprocessImg: function () {
        var containers = [], count = 0, displaynoneCount = 0;
        if (!S.isArray(this._context.lazyContainers)) {
            containers[0] = this._context.lazyContainers
        } else {
            containers = this._context.lazyContainers
        }
        S.each(containers, function (container) {
            S.each(DOM.query("img", container), function (img) {
                if (!img.offsetWidth && DOM.attr(img, "data-ks-lazyload")) {
                    DOM.attr(img, "src", DOM.attr(img, "data-ks-lazyload"));
                    DOM.removeAttr(img, "data-ks-lazyload");
                    displaynoneCount++
                }
                count++
            })
        });
        S.log("img nums:" + count);
        S.log("display none img nums:" + displaynoneCount)
    }, initPicLazyload: function () {
        this.preprocessImg();
        new DataLazyload(this._context.lazyContainers, { mod: "manual", diff: { left: 9999, right: 9999, top: 0, bottom: 500} })
    }, initWidget: function (hook, container) {
        var self = this;
        var widgetInitStart = (new Date).getTime();
        hook = "." + (hook || "KS_Widget");
        var wds = { switchable: "Tabs Slide Carousel Accordion", overlay: "Popup", compatible: "Compatible", countdown: "Countdown" }, swObj, widgetElems = S.query(hook, "#content");
        eachElem();
        function eachElem() {
            S.later(function () {
                if (widgetElems.length !== 0) {
                    initEachWidget(widgetElems.shift());
                    eachElem()
                }
            }, 0)
        }
        function initEachWidget(elem) {
            var type = elem.getAttribute("data-widget-type"), config;
            if (!type) {
                return
            }
            try {
                config = elem.getAttribute("data-widget-config");
                if (config) {
                    config = config.replace(/'/g, '"')
                }
                config = S.JSON.parse(config);
                switch (true) {
                    case wds.switchable.indexOf(type) > -1:
                        changeLazyloadFlag(elem, S.merge(Switchable.Config, S.merge(Switchable[type].Config, config)));
                        if (type == "Carousel" && !(DOM.get("." + config.prevBtnCls, elem) && DOM.get("." + config.nextBtnCls, elem))) {
                            new Switchable(elem, S.merge(config, { lazyDataType: "img-src" }))
                        } else {
                            new Switchable[type](elem, S.merge(config, { lazyDataType: "img-src" }))
                        }
                        break;
                    case wds.overlay.indexOf(type) > -1:
                        initPopup(config, elem);
                        break;
                    case wds.compatible.indexOf(type) > -1:
                        if (S.UA.ie && S.UA.ie < 7) {
                            new Compatible(elem, config)
                        }
                        break;
                    case wds.countdown.indexOf(type) > -1:
                        new Countdown(elem, config.endTime, config);
                        break;
                    default:
                        S.log("\u5728kissy\u5e93\u4e2d\u6ca1\u6709\u67e5\u627e\u5230\u4f60\u60f3\u8981\u521d\u59cb\u5316\u7684\u7ec4\u4ef6")
                }
            } catch (ex) {
                S.log("widget " + ex, "warn")
            }
        }
        function changeLazyloadFlag(container, config) {
            var activeIndex = config.activeIndex;
            if (activeIndex > -1) {
            } else {
                if (typeof config.switchTo == "number") {
                } else {
                    activeIndex = 0
                }
            }
            var content, DOT = ".", panels, steps = config.steps, ingIndex = activeIndex * steps, imgs = [];
            var type = container.getAttribute("data-widget-type");
            switch (config.markupType) {
                case 0:
                    content = DOM.get(DOT + config.contentCls, container);
                    panels = DOM.children(content);
                    break;
                case 1:
                    panels = DOM.query(DOT + config.panelCls, container);
                    break;
                case 2:
                    panels = config.panels;
                    break
            }
            S.each(panels, function (panel, i) {
                if (ingIndex <= i && i < ingIndex + steps) {
                    S.each(DOM.query("img", panel), function (img) {
                        if (DOM.attr(img, "data-ks-lazyload")) {
                            DOM.attr(img, "src", DOM.attr(img, "data-ks-lazyload"));
                            DOM.removeAttr(img, "data-ks-lazyload")
                        }
                    })
                } else {
                    imgs = imgs.concat(DOM.query("img", panel));
                    if (type == "Slide") {
                        DOM.css(panel, "display", "none")
                    }
                }
            });
            S.each(imgs, function (img) {
                if (DOM.attr(img, "data-ks-lazyload")) {
                    DOM.attr(img, "data-ks-lazyload-custom", DOM.attr(img, "data-ks-lazyload"));
                    DOM.removeAttr(img, "data-ks-lazyload")
                }
            })
        }
        function initPopup(config, elem) {
            if (!("type" in config)) {
                if (!config.content) {
                    config.type = "one-one"
                } else {
                    config.type = "multi-one"
                }
            }
            if (!config.triggerType) {
                config.triggerType = "mouse"
            }
            if (!config.zIndex || config.zIndex > 299 || config.zIndex < 200) {
                config.zIndex = 299
            }
            if (config.type == "one-one") {
                new Overlay.Popup({ trigger: DOM.get(config.trigger, self._mod), triggerType: config.triggerType, srcNode: elem, elStyle: { display: "block", visibility: "hidden", position: "absolute", left: "-9999px", top: "-9999px" }, align: config.align, zIndex: config.zIndex })
            } else {
                var popup = new Overlay({ effect: config.effect ? config.effect : {}, zIndex: config.zIndex });
                var container = DOM.get(config.container), triggers = DOM.query(config.trigger, container), contents = DOM.query(config.content, container);
                S.each(triggers, function (trigger, index) {
                    var mouseEnterTimer, mouseLeaveTimer;
                    Event.on(trigger, "mouseenter", function () {
                        if (mouseEnterTimer) {
                            mouseEnterTimer.cancel()
                        }
                        mouseEnterTimer = S.later(function () {
                            if (contents[index]) {
                                popup.set("content", contents[index].value);
                                popup.set("align", S.merge(config.align, { node: trigger }));
                                popup.show()
                            }
                            mouseEnterTimer.cancel()
                        }, 100)
                    });
                    Event.on(trigger, "mouseleave", function () {
                        if (mouseLeaveTimer) {
                            mouseLeaveTimer.cancel()
                        }
                        mouseLeaveTimer = S.later(function () {
                            popup.hide();
                            mouseLeaveTimer.cancel()
                        }, 100)
                    })
                })
            }
        }
        var widgetInitEnd = (new Date).getTime();
        S.log("widget init spend time ms:" + (widgetInitEnd - widgetInitStart))
    }, initCartPlugin: function () {
        var self = this;
        if (DOM.get(".J_CartPluginTrigger")) {
            S.getScript("http://a.tbcdn.cn/apps/cart/plugin/1.2/cartplugin.js", function () {
                if (typeof CartPlugin !== "undefined") {
                    CartPlugin.init(self._mod, { preventAll: true })
                }
            })
        }
    }, initBuriedStatistics: function () {
        S.getScript("http://a.tbcdn.cn/apps/lz/hc.js?v=5");
        S.getScript("http://a.tbcdn.cn/s/tb-tracer-min.js?t=20110628")
    }, initISV: function () {
        ISVStat.init(this._context.isvParams)
    }, handleDesignEntr: function () {
        if (window.shop_config && window.login_config) {
            if (shop_config.userId == login_config.loginUserId) {
                DOM.removeClass("#J_DesignPage", "hidden")
            }
        }
    } 
    });
    Decoration.selector = "#content";
    Decoration.type = "decoration";
    return Decoration
}, { requires: ["core", "switchable", "overlay", "./compatible", "./countdown", "datalazyload", "./isv"] });
