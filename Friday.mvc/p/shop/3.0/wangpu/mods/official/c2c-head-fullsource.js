KISSY.add("wangpu/mods/official/c2c-head", function (S, Core, Overlay, Suggest) {
    var doc = document, DOM = S.DOM, Event = S.Event, IE = S.UA.ie, host = location.hostname.indexOf("taobao.com") != -1 ? "taobao.com" : "daily.taobao.net", defaultFormAction = "http://s." + host + "/search";
    function C2CHead(context) {
        var self = this;
        self._mod = context.mod;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(C2CHead, { _init: function () {
        S.log("C2CHead init start");
        this._initArchive();
        this._initSearch();
        this._someFix();
        S.log("C2CHead init start")
    }, _initArchive: function () {
        var self = this;
        self._initRankPopup();
        self._initShopStat()
    }, _initRankPopup: function () {
        new Overlay.Popup({ srcNode: "#shop-rank-popup", trigger: "#shop-rank", triggerType: "mouse", elStyle: { display: "block", visibility: "hidden", position: "absolute", left: "-9999px", top: "-9999px" }, align: { node: "#shop-rank", points: ["bc", "tl"], offset: [-20, 10]} })
    }, _initShopStat: function () {
        var el = DOM.get("#J_SCollCount"), config;
        if (!el || !(config = S.unparam(el.getAttribute("data-info")))) {
            return
        }
        window.setShopStat = function (data) {
            data = parseInt(data[config["param"]], 10);
            if (data > 0) {
                el.innerHTML = '<span>\u6536\u85cf\u4eba\u6c14\uff1a</span> <a href="' + config["mecuryUrl"] + '">' + data + "</a>"
            }
        };
        S.getScript(addTimeStamp(config["countUrl"]) + "&keys=" + config["param"] + "&callback=setShopStat")
    }, _initSearch: function () {
        this._inputHit("#shop-q");
        this._initTBSearch("#J_TBSearchForm")
    }, _inputHit: function (el) {
        el = DOM.get(el);
        if (!el) {
            return
        }
        var elemParent = el.parentNode, FOCUS = "focus", blurHandle = function () {
            "" !== el.value ? DOM.addClass(elemParent, FOCUS) : DOM.removeClass(elemParent, FOCUS)
        };
        Event.on(el, FOCUS, function (evt) {
            DOM.addClass(elemParent, FOCUS)
        });
        Event.on(el, "blur", blurHandle);
        setTimeout(blurHandle, 0)
    }, _initTBSearch: function (form) {
        if (!(form = DOM.get(form))) {
            return
        }
        var q = form["shop-q"], sourceId, appId;
        if (!q) {
            return
        }
        Event.on(DOM.query("button", form), "click", function (evt) {
            var curBtn = this;
            form.action = DOM.hasClass(curBtn, "searchtb") ? defaultFormAction : DOM.attr(curBtn, "data-action");
            form.submit()
        });
        var sug = new Suggest(q, "http://suggest.taobao.com/sug?code=utf-8", { resultFormat: "\u7ea6%result%\u4e2a\u5b9d\u8d1d", containerWidth: "312px" });
        if (window.g_config && (appId = window.g_config.appId)) {
            sourceId = 16 === appId ? "ratez" : "shopz";
            (function (sourceId) {
                var input = document.createElement("input");
                input.setAttribute("type", "hidden");
                input.setAttribute("name", "initiative_id");
                function retDate() {
                    var now = new Date;
                    var month = now.getMonth() + 1;
                    if (month < 10) {
                        month = "0" + month
                    }
                    var date = now.getDate();
                    if (date < 10) {
                        date = "0" + date
                    }
                    return [now.getFullYear(), month, date].join("")
                }
                input.value = sourceId + "_" + retDate();
                DOM.append(input, form)
            })(sourceId)
        }
    }, _someFix: function () {
        S.each(["#shop-info", "#shop-search .searchmy", "#shop-search .searchtb"], function (el) {
            fixIE6Hover(el)
        })
    } 
    });
    C2CHead.selector = "#shop-head";
    return C2CHead;
    function fixIE6Hover(el) {
        if (IE && 6 === IE) {
            el = DOM.get(el);
            if (!el) {
                return
            }
            Event.add(el, "mouseenter", function (evt) {
                DOM.addClass(this, "hover")
            });
            Event.add(el, "mouseleave", function (evt) {
                DOM.removeClass(this, "hover")
            })
        }
    }
    function addTimeStamp(url) {
        var now = S.now();
        return url + (url.indexOf("?") === -1 ? "?" : "&") + "t=" + now
    }
}, { requires: ["core", "overlay", "suggest"] });
