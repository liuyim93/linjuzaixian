﻿TML.add("overlay/alert", function (g, d) {
    function e(a, i, j) {
        if (b.isString(a)) {
            var k = {};
            k.tip = a;
            a = k;
            if (b.isFunction(i))
                a.callback = i;
            if (b.isObject(j))
                a = b.merge(a, j)
        }
        a = b.merge(c, a);
        if (a.skin == "back")
            a.headerContent = "\u63d0\u793a";
        a.bodyContent = '<div class="ui-msg tml-dialog-cfmTitle"><div class="ui-msg-con ui-msg-{MSGTYPE}">' + a.tip + '<s class="ui-msg-icon"></s></div></div>';
        a.bodyContent = a.bodyContent.replace("{MSGTYPE}", a.msgType);
        a.footerContent = '<div class="tml-dialog-btnArea"><button class="tml-dialog-cfmOk ui-btn-m-primary">' +
        a.confirmBtn + "</button></div>";
        e.superclass.constructor.call(this, a);
        this.on("afterRenderUI", function () {
            var l = this;
            this.get("el").one(".tml-dialog-cfmOk").on("click", function () {
                a.callback && a.callback.call(null);
                l.hide()
            })
        })
    }
    var b = KISSY, c = { width: 360, height: "auto", headerContent: "", bodyContent: "", skin: "back", showCat: false, mask: true, zIndex: 10005, align: { points: ["cc", "cc"] }, tip: "", msgType: "attention", confirmBtn: "\u786e\u5b9a" };
    b.extend(e, d);
    return e
}, { requires: ["overlay/dialog", "overlay/css/overlay.css"] });
TML.add("overlay/confirm", function (g, d) {
    function e(a, i, j) {
        if (b.isString(a)) {
            var k = {};
            k.tip = a;
            a = k;
            if (b.isFunction(i))
                a.callback = i;
            if (b.isObject(j))
                a = b.merge(a, j)
        }
        a = b.merge(c, a);
        if (a.skin == "back")
            a.headerContent = "\u786e\u8ba4\u64cd\u4f5c";
        a.bodyContent = '<div class="ui-msg tml-dialog-cfmTitle"><div class="ui-msg-con ui-msg-{MSGTYPE}">' + a.tip + '<s class="ui-msg-icon"></s></div></div>';
        a.bodyContent = a.bodyContent.replace("{MSGTYPE}", a.msgType);
        a.footerContent = '<div class="tml-dialog-btnArea"><button class="tml-dialog-cfmOk ui-btn-m-primary">' +
        a.confirmBtn + '</button> <button class="tml-dialog-cfmCancel ui-btn-m">' + a.cancelBtn + "</button></div>";
        e.superclass.constructor.call(this, a);
        this.on("afterRenderUI", function () {
            var l = this, h = this.get("el"), n = h.one(".tml-dialog-cfmOk");
            h = h.one(".tml-dialog-cfmCancel");
            n.on("click", function () {
                a.callback && a.callback.call(null, true);
                l.hide()
            });
            h.on("click", function () {
                a.callback && a.callback(false);
                l.hide()
            })
        })
    }
    var b = KISSY, c = { width: 360, height: "auto", skin: "back", showCat: false, headerContent: "", bodyContent: "",
        mask: true, zIndex: 10005, align: { points: ["cc", "cc"] }, tip: "", msgType: "attention", confirmBtn: "\u786e\u8ba4", cancelBtn: "\u53d6\u6d88"
    };
    b.extend(e, d);
    return e
}, { requires: ["overlay/dialog", "overlay/css/overlay.css"] });
TML.add("overlay/dialog", function () {
    function g(e) {
        function b() {
            c.get("el").append("<div class='tml-dialog-skin' " + (d.UA.ie < 8 ? "style='height:expression(this.parentNode.clientHeight);'" : "") + "></div>" + (c.config.showCat ? "<i class='tml-dialog-cat'></i>" : ""));
            a = false
        }
        var c = this;
        c.config = d.merge(g.Config, e);
        c.config.elCls = c.config.elCls || "";
        c.config.elCls += c.config.skin ? " tml-dialog-" + c.config.skin : "";
        if (c.config.mask)
            c.config.elCls += " tml-dialog-hasmask";
        g.superclass.constructor.call(this, c.config);
        var a =
        true;
        d.version === "1.1.6" ? c.on("show", function () {
            a && b()
        }) : c.on("afterRenderUI", function () {
            b()
        })
    }
    var d = KISSY;
    g.Config = { prefixCls: "tml-", skin: "default", showCat: true };
    d.extend(g, d.FixedDialog || d.Dialog || d.Overlay.Dialog);
    window.TML = window.TML || {};
    window.TML.Overlay = window.TML.Overlay || {};
    return window.TML.Overlay.Dialog = g
}, { requires: ["kissy/overlay", "overlay/css/overlay.css"] });
TML.add("overlay", function (g, d, e, b, c) {
    return { Dialog: d, Confirm: e, Alert: b, Prompt: c }
}, { requires: ["overlay/dialog", "overlay/confirm", "overlay/alert", "overlay/prompt"] });
TML.add("overlay/prompt", function (g, d) {
    function e(a, i, j) {
        if (b.isString(a)) {
            var k = {};
            k.tip = a;
            a = k;
            if (b.isFunction(i))
                a.callback = i;
            if (b.isObject(j))
                a = b.merge(a, j)
        }
        a = b.merge(c, a);
        if (a.skin == "back")
            a.headerContent = "\u8bf7\u8f93\u5165";
        a.bodyContent = '<p class="tml-dialog-prtTip">' + a.tip + "</p>";
        a.bodyContent += '<textarea class="tml-dialog-prtInput" placeholder="' + a.placeholder + '"></textarea>';
        a.bodyContent += '<div class="ui-msg tml-dialog-prtError">                          <div class="ui-msg-con ui-msg-error">                            <p></p>                            <s class="ui-msg-icon"></s>                          </div>                        </div>';
        a.footerContent = '<div class="tml-dialog-btnArea"><button class="tml-dialog-cfmOk ui-btn-m-primary">' + a.confirmBtn + '</button> <button class="tml-dialog-cfmCancel ui-btn-m">' + a.cancelBtn + "</button></div>";
        e.superclass.constructor.call(this, a);
        this.on("afterRenderUI", function () {
            var l = this, h = this.get("el"), n = h.one(".tml-dialog-cfmOk"), q = h.one(".tml-dialog-cfmCancel"), r = h.one(".tml-dialog-prtInput"), o = h.one(".tml-dialog-prtError");
            n.on("click", function () {
                var p = b.trim(r.val()), m = "", f = a.valid;
                if (b.isArray(f.length))
                    if (p.length <
                    f.length[0] || f.length > f.length[1])
                        m = f.length[2] ? f.length[2] : "\u957f\u5ea6\u6700\u5c0f\u4e3a" + f.length[0] + "\u4e2a\u5b57\u7b26\uff0c\u4e14\u4e0d\u80fd\u8d85\u8fc7" + f.length[1] + "\u4e2a\u5b57\u7b26";
                if (!m && b.isArray(f.regex))
                    f.regex[0].exec(p) || (m = f.regex[1] || "\u8f93\u5165\u4e0d\u7b26\u5408\u683c\u5f0f");
                if (m) {
                    o.css("display", "inline-block");
                    6 === b.UA.ie && o.css("display", "inline");
                    o.one("p").html(m);
                    return false
                } else {
                    a.callback && a.callback.call(null, true, p);
                    l.hide()
                }
            });
            q.on("click", function () {
                a.callback &&
                a.callback.call(null, false);
                l.hide()
            })
        })
    }
    var b = KISSY, c = { width: 360, height: "auto", skin: "back", showCat: false, headerContent: "", bodyContent: "", mask: true, zIndex: 10005, align: { points: ["cc", "cc"] }, tip: "", placeholder: "", confirmBtn: "\u786e\u5b9a", cancelBtn: "\u53d6\u6d88", valid: { length: [5, 500]} };
    b.extend(e, d);
    return e
}, { requires: ["overlay/dialog", "overlay/css/overlay.css"] });
