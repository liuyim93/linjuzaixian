KISSY.add("wangpu/base", function (S, Core, Overlay) {
    var doc = document, DOM = S.DOM, Event = S.Event;
    function Base(context) {
        var self = this;
        self._mod = context.mod;
        self._context = context;
        if (!self._mod) {
            return
        }
        self._init()
    }
    S.augment(Base, { _init: function () {
        S.log("Base init start");
        var self = this, pageType = self._context.pageType;
        self._changeDomain();
        self._updateToken();
        if (pageType != "cdetail") {
            self._initCollectDialog()
        }
        S.log("Base init end")
    }, _changeDomain: function () {
        try {
            var d = document.domain.split(".");
            document.domain = d.slice(d.length - 2).join(".")
        } catch (e) {
        }
    }, _updateToken: function () {
        var tokenField = DOM.get("#J_TokenField");
        if (!tokenField) {
            return
        }
        var REG_TOKEN = /_tb_token_=[^&]*/i, collectLinks = DOM.query("a.J_TokenSign", doc), curToken = "_tb_token_=" + tokenField.value;
        S.each(collectLinks, function (link) {
            var curHref = link.href;
            if (REG_TOKEN.test(curHref)) {
                link.href = curHref.replace(REG_TOKEN, curToken)
            } else {
                link.href += (curHref.lastIndexOf("&") !== -1 ? "&" : "?") + curToken
            }
        })
    }, _initCollectDialog: function () {
        var container, isTMall = location.hostname.indexOf("tmall.com") !== -1 || location.hostname.indexOf("tmall.net") !== -1;
        container = DOM.create('<div id="popupPanel">');
        doc.body.appendChild(container);
        S.each(DOM.query(".J_TDialogTrigger"), function (trigger) {
            var width = trigger.getAttribute("data-width"), height = trigger.getAttribute("data-height"), dialog = new Overlay.Dialog({ srcNode: container, width: width, height: height, closable: false, elStyle: { display: "block", visibility: "hidden", position: "absolute", left: "-9999px", top: "-9999px"} });
            Event.on(trigger, "click", function (e) {
                e.preventDefault();
                dialog.hide();
                DOM.show(container);
                dialog.show()
            });
            dialog.on("show", function () {
                var self = this, targetURL = addTimeStamp(trigger.href) + (isTMall ? "&isTmall=1" : ""), html = '<a class="close-btn" href="javascript:void(0)"' + 'style="position: absolute; top: 5px; right: 4px; outline: none;' + 'display: block; width: 15px; height: 15px; background: url(http://localhost:7525/Images/close_btn.png) no-repeat; text-decoration: none; text-indent: -99999px">X</a>' + '<iframe src="' + targetURL + '" width="' + width + '" height="' + height + '" name="popupIframe" frameborder="0" scrolling="no"></iframe>';
                self.set("width", width);
                self.set("height", height);
                DOM.html(container, html);
                dialog.center();
                Event.on(DOM.get(".close-btn", container), "click", function () {
                    dialog.hide()
                });
                if (DOM.hasClass(trigger, "collection") && window.g_config.type == "b") {
                    (new Image).src = "http://www.atpanel.com/jsclick?cache=" + +new Date + "&auc_detail=b_collect_item"
                }
                DOM.removeClass("#shop-info", "expanded")
            })
        })
    } 
    });
    function addTimeStamp(url) {
        var now = S.now();
        return url + (url.indexOf("?") === -1 ? "?" : "&") + "t=" + now
    }
    Base.selector = "body";
    Base.type = "base";
    return Base
}, { requires: ["core", "overlay"] });
