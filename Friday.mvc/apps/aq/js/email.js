﻿/*pub-1|2012-09-20 18:56:34*/
KISSY.add("Message", function (C, D) {
    var E = C.all;
    var B = function (F) {
        this.wrapper = C.one(F);
        this.msg = this.wrapper && this.wrapper.one(".msg-default");
        if (C.isPlainObject(F) && F.type === 2) {
            return new D(F.msg)
        } else {
            if (!this.msg) {
                return new D(F)
            }
        }
        this.title = this.wrapper && this.wrapper.one(".msg-title");
        this.content = this.wrapper && this.wrapper.one(".msg-content");
        this.type = this._getType();
        this._isWeak = this.wrapper && this.wrapper.hasClass("msg-weak")
    };
    var A = function (F) {
        return new B(F)
    };
    C.augment(B, {
        change: function (G, F) {
            if (!this.msg) {
                return this
            }
            if (!this._isWeak) {
                this.wrapper.removeClass("msg-weak")
            }
            this.show();
            var G = G && G.toUpperCase() || "";
            switch (G) {
                case "OK":
                case "ERROR":
                case "TIPS":
                case "NOTICE":
                case "ATTENTION":
                case "QUESTION":
                case "STOP":
                    this._changeType(G);
                    break;
                default:
                    break
            }
            this.type = this._getType();
            this._changeText(F);
            return this
        },
        _changeType: function (G) {
            var F = this.msg.attr("class"),
				H = /\bmsg-ok\b|\bmsg-error\b|\bmsg-tips\b|\bmsg-notice\b|\bmsg-attention\b|\bmsg-question\b|\bmsg-stop\b/g;
            if (F.match(H)) {
                this.msg.attr("class", F.replace(H, "msg-" + G.toLowerCase()))
            } else {
                this.msg.addClass("msg-" + G.toLowerCase())
            }
        },
        _changeTitle: function (F) {
            if (!this.title || !C.isString(F)) {
                return
            }
            this.title.html(F)
        },
        _changeContent: function (F) {
            if (!this.content || !C.isString(F)) {
                return
            }
            this.content.html(F)
        },
        _changeText: function (F) {
            var H = C.isObject(F) && C.isString(F.title) ? F.title : "",
				G = C.isObject(F) && C.isString(F.content) ? F.content : (C.isString(F) ? F : "");
            this._changeTitle(H);
            this._changeContent(G);
            if (!H && !G && this.wrapper) {
                this.wrapper.addClass("msg-weak")
            }
        },
        ok: function (F) {
            this.change("ok", F);
            return this
        },
        error: function (F) {
            this.change("error", F);
            return this
        },
        tips: function (F) {
            this.change("tips", F);
            return this
        },
        notice: function (F) {
            this.change("notice", F);
            return this
        },
        attention: function (F) {
            this.change("attention", F);
            return this
        },
        question: function (F) {
            this.change("question", F);
            return this
        },
        stop: function (F) {
            this.change("stop", F);
            return this
        },
        _getType: function () {
            var F;
            if (this.msg.hasClass("msg-error")) {
                F = "ERROR"
            } else {
                if (this.msg.hasClass("msg-tips")) {
                    F = "TIPS"
                } else {
                    if (this.msg.hasClass("msg-attention")) {
                        F = "ATTENTION"
                    } else {
                        if (this.msg.hasClass("msg-notice")) {
                            F = "NOTICE"
                        } else {
                            if (this.msg.hasClass("msg-ok")) {
                                F = "OK"
                            } else {
                                if (this.msg.hasClass("msg-question")) {
                                    F = "QUESTION"
                                } else {
                                    if (this.msg.hasClass("msg-stop")) {
                                        F = "STOP"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return F
        },
        isHide: function () {
            return this.wrapper.css("visibility") == "hidden" || this.wrapper.css("display") == "none"
        },
        hide: function () {
            this.wrapper.css("visibility", "hidden").removeClass("show").addClass("hide");
            return this
        },
        show: function () {
            this.wrapper.css("visibility", "visible").removeClass("hide").addClass("show");
            return this
        },
        laterHide: function (F) {
            C.later(this.hide, F, false, this);
            return this
        }
    });
    return A
}, {
    requires: ["Message2"]
});
KISSY.add("Message2", function (A) {
    var D = A.all;
    var B = function (E) {
        this.msg = A.one(E);
        this.title = this.msg && this.msg.one(".msg_tit");
        this.content = this.msg && this.msg.one(".msg_cnt");
        this.type = this._getType()
    };
    var C = function (E) {
        return new B(E)
    };
    A.augment(B, {
        change: function (F, E) {
            if (!this.msg) {
                return this
            }
            this.show();
            var F = F && F.toUpperCase() || "";
            switch (F) {
                case "OK":
                case "ERROR":
                case "TIPS":
                case "NOTICE":
                case "ATTENTION":
                case "QUESTION":
                case "STOP":
                    this._changeType(F);
                    break;
                default:
                    break
            }
            this.type = this._getType();
            this._changeText(E);
            return this
        },
        _changeType: function (F) {
            var E = this.msg.attr("class"),
				G = /\bmsg_ok\b|\bmsg_error\b|\bmsg_tips\b|\bmsg_notice\b|\bmsg_attention\b|\bmsg_question\b|\bmsg_stop\b/g;
            if (E.match(G)) {
                this.msg.attr("class", E.replace(G, "msg_" + F.toLowerCase()))
            } else {
                this.msg.addClass("msg_" + F.toLowerCase())
            }
        },
        _changeTitle: function (E) {
            if (!this.title || !A.isString(E)) {
                return
            }
            this.title.html(E)
        },
        _changeContent: function (E) {
            if (!this.content || !A.isString(E)) {
                return
            }
            this.content.html(E)
        },
        _changeText: function (E) {
            var G = A.isObject(E) && A.isString(E.title) ? E.title : "",
				F = A.isObject(E) && A.isString(E.content) ? E.content : (A.isString(E) ? E : "");
            this._changeTitle(G);
            this._changeContent(F);
            if (!G && !F && this.msg) {
                this.msg.addClass("msg-weak")
            }
        },
        ok: function (E) {
            this.change("ok", E);
            return this
        },
        error: function (E) {
            this.change("error", E);
            return this
        },
        tips: function (E) {
            this.change("tips", E);
            return this
        },
        notice: function (E) {
            this.change("notice", E);
            return this
        },
        attention: function (E) {
            this.change("attention", E);
            return this
        },
        question: function (E) {
            this.change("question", E);
            return this
        },
        stop: function (E) {
            this.change("stop", E);
            return this
        },
        _getType: function () {
            var F, E = this.msg.attr("class");
            if (E.match(/\bmsg_(b_)?error\b/)) {
                F = "ERROR"
            } else {
                if (E.match(/\bmsg_(b_)?_tips\b/)) {
                    F = "TIPS"
                } else {
                    if (E.match(/\bmsg_(b_)?_attention\b/)) {
                        F = "ATTENTION"
                    } else {
                        if (E.match(/\bmsg_(b_)?_notice\b/)) {
                            F = "NOTICE"
                        } else {
                            if (E.match(/msg_ok|msg_b_ok/)) {
                                F = "OK"
                            } else {
                                if (E.match(/\bmsg_(b_)?_question\b/)) {
                                    F = "QUESTION"
                                } else {
                                    if (E.match(/\bmsg_(b_)?_stop\b/)) {
                                        F = "STOP"
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return F
        },
        isHide: function () {
            return this.msg.css("visibility") == "hidden" || this.msg.css("display") == "none"
        },
        hide: function () {
            this.msg.css("visibility", "hidden").removeClass("show").addClass("hide");
            return this
        },
        show: function () {
            this.msg.css("visibility", "visible").removeClass("hide").addClass("show");
            return this
        },
        laterHide: function (E) {
            A.later(this.hide, E, false, this);
            return this
        }
    });
    return C
});
KISSY.add("TimeoutBtn", function (C) {
    var B = function (D) {
        this.btn = D.btn && C.one(D.btn);
        this.timeout = D.timeout ? (Number(D.timeout) || 0) : 0;
        this.callback = C.isFunction(D.callback) && D.callback || null;
        this.text = D.text || (this.btn ? this.btn.text() : "");
        this.waitText = D.waitText || "%t%\u79d2\u540e\u53ef\u91cd\u65b0\u64cd\u4f5c";
        this.timeoutText = D.timeoutText || this.text;
        this.timeoutCls = D.timeoutCls || "";
        this.disabledCls = D.disabledCls || "";
        this.autoStart = !!D.autoStart;
        this._id = 0;
        this.autoStart && this.start()
    };
    var A = function (D) {
        return new B(D)
    };
    C.augment(B, {
        _counter: 0,
        start: function () {
            if (!this.btn || !this.timeout) {
                return
            }
            this._counter = 0;
            this.btn.prop("disabled", true);
            this.refresh();
            var D = this;
            if (this._id) {
                window.clearInterval(this._id)
            }
            this._id = setInterval(function () {
                D.disabled()
            }, 1000)
        },
        disabled: function () {
            this._counter++;
            if (this._counter == this.timeout) {
                this.clear();
                this.callback && this.callback()
            } else {
                this.refresh()
            }
        },
        clear: function () {
            window.clearInterval(this._id);
            this._id = "";
            this._counter = 0;
            this.btn.prop("disabled", false);
            this.btn.text(this.timeoutText);
            this.btn.removeClass(this.timeoutCls);
            this.btn.removeClass(this.disabledCls);
            this.btn.text(this.text)
        },
        refresh: function () {
            this.btn.text(this.waitText.replace("%t%", this.timeout - this._counter));
            this.btn.addClass(this.disabledCls)
        },
        reset: function () {
            this.clear()
        }
    });
    return A
});
KISSY.add("PlaceHolder", function (A) {
    var C = function (D) {
        this.input = D.input && A.one(D.input);
        this.placeholder = D.placeholder && A.one(D.placeholder);
        this.blurCls = D.blurCls || "ph_blur"
    };
    var B = function (D) {
        return new C(D)
    };
    A.augment(C, {
        init: function () {
            if (!this.input || !this.placeholder || this.input.val()) {
                return this
            }
            var D = this;
            this.placeholder.show();
            this.fix();
            this.placeholder.on("click", function () {
                D.input.fire("focus")
            });
            this.input.on("valuechange", function () {
                if (D.input.val().length) {
                    D.placeholder.hide()
                } else {
                    D.placeholder.show();
                    D.fix();
                    D.placeholder.addClass(D.blurCls)
                }
            }).on("blur", function () {
                if (!D.input.val().length) {
                    D.placeholder.show();
                    D.fix();
                    D.placeholder.removeClass(D.blurCls)
                }
            }).on("focus", function () {
                if (D.input.val().length) {
                    D.placeholder.hide()
                } else {
                    D.placeholder.show();
                    D.fix();
                    D.placeholder.addClass(D.blurCls)
                }
            });
            A.one(window).on("resize", function () {
                D.fix()
            });
            return this
        },
        fix: function () {
            var D = this.input.offset();
            this.placeholder.css({
                position: "absolute",
                left: D.left + 7
            }).css({
                top: D.top + Math.floor((this.input[0].clientHeight + 2 - this.placeholder[0].clientHeight) / 2)
            })
        }
    });
    return B
});
KISSY.add("Email2Web", function (A) {
    var B = function (D) {
        this.email = D || ""
    };
    var C = function (D) {
        return new B(D)
    };
    A.augment(B, {
        loginUrls: {
            "gmail.com": "https://mail.google.com/",
            "live.com": "http://mail.live.com/",
            "live.cn": "http://mail.live.com/",
            "126.com": "http://www.126.com/",
            "163.com": "http://mail.163.com/",
            "163.net": "http://mail.163.net/",
            "188.com": "http://mail.188.com/",
            "sina.com": "http://mail.sina.com.cn/",
            "hotmail.com": "http://www.hotmail.com/",
            "yahoo.com.cn": "http://mail.cn.yahoo.com/",
            "yahoo.cn": "http://mail.cn.yahoo.com/",
            "sohu.com": "http://mail.sohu.com/",
            "21cn.com": "http://mail.21cn.com/",
            "eyou.com": "http://www.eyou.com/",
            "sina.com.cn": "http://mail.sina.com.cn/",
            "qq.com": "http://mail.qq.com/",
            "tom.com": "http://mail.tom.com/",
            "sogou.com": "http://mail.sogou.com/",
            "aol.com": "http://mail.aol.com/"
        },
        regexp: /[^@]+@(.+\.\w+)$/,
        getUrl: function (D) {
            this.email = !!D && D || "";
            if (!this.email) {
                return ""
            }
            var E = this.email.replace(this.regexp, "$1");
            return E && this.loginUrls[E] || ""
        }
    });
    return C
});
KISSY.add("DynamicCheckCode", function (C, B, A) {
    var E = function (F) {
        this.trigger = F.trigger && C.one(F.trigger);
        this.triggerTip = F.triggerTip && C.one(F.triggerTip) ? B(F.triggerTip) : null;
        this.input = F.input && C.one(F.input);
        this.inputTip = F.inputTip && C.one(F.inputTip) ? B(F.inputTip) : null;
        this.errCls = C.isString(F.errCls) && F.errCls || "";
        this.on = F.on || "keyup blur";
        this.getUrl = F.getUrl || "";
        this.checkUrl = F.checkUrl || "";
        this.getData = F.getData || {};
        this.checkData = C.isPlainObject(F.checkData) && F.checkData || {};
        this.defaultMsg = {
            error: "\u9a8c\u8bc1\u7801\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01",
            ok: "\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff0c\u8bf7\u67e5\u6536\uff01"
        };
        this.msg = F.msg || this.defaultMsg;
        this.defaultTriggerTip = F.defaultTriggerTip || null;
        this.inputTriggerTip = F.defaultTriggerTip || null;
        this.disabledBtnCls = F.disabledBtnCls || "";
        this.btnText = F.btnText || "\u514d\u8d39\u83b7\u53d6\u9a8c\u8bc1\u7801";
        this.btnWaitText = F.btnWaitText || "%t%\u79d2\u540e\u53ef\u91cd\u65b0\u53d1\u9001";
        this.btnWaitCls = F.btnWaitCls || "";
        this.btnTimeoutText = F.btnTimeoutText || "\u91cd\u65b0\u53d1\u9001";
        this.btnTimeoutCls = F.btnTimeoutCls || "";
        this.btnAutoStart = !!F.btnAutoStart;
        this.tobtn = null;
        this.disabledMsg = C.isString(F.disabledMsg) ? F.disabledMsg : "\u9a8c\u8bc1\u7801\u9519\u8bef";
        this.disabled = true;
        this.stat = {
            code: 0,
            msg: ""
        }
    };
    var D = function (F) {
        return new E(F)
    };
    C.augment(E, {
        ctype: "CHECKER",
        statusCode: {
            empty: {
                code: 1,
                msg: "\u4e0d\u80fd\u4e3a\u7a7a"
            },
            formatError: {
                code: 2,
                msg: "\u683c\u5f0f\u9519\u8bef"
            },
            ajaxError: {
                code: 3,
                msg: "\u9a8c\u8bc1\u7801\u9519\u8bef"
            },
            ok: {
                code: 100,
                msg: ""
            }
        },
        init: function () {
            if (!this.trigger || !this.input || !this.getUrl) {
                return this
            }
            var F = this;
            this.tobtn = A({
                btn: this.trigger,
                timeout: 60,
                disabledCls: F.disabledBtnCls,
                callback: function () {
                    F.resetTriggerTip()
                },
                text: F.btnText,
                waitText: F.btnWaitText,
                waitCls: F.btnWaitCls,
                timeoutText: F.btnTimeoutText,
                timeoutCls: F.btnTimeoutCls,
                autoStart: F.btnAutoStart
            });
            this.trigger.on("click", function () {
                F.getCode()
            });
            this.input.on(this.on, function () {
                F.validate()
            });
            this.validate(true);
            return this
        },
        validate: function (F) {
            if (!this.trigger || !this.input || !this.getUrl) {
                this.disabled = false;
                return this.disabled
            }
            this.checkAble();
            if (F && this.inputTip.type.toLowerCase() == "error" && !this.inputTip.isHide()) {
                return this.disabled
            }
            this.check(F);
            return this.disabled
        },
        getCode: function () {
            var F = this;
            this.reset();
            C.io({
                url: F.getUrl,
                data: F.getData,
                type: "post",
                dataType: "json",
                success: function (G) {
                    if (G.success) {
                        if (F.triggerTip) {
                            F.triggerTip.ok(G.msg || F.msg.ok || F.defaultMsg.ok)
                        }
                        F.input.fire("focus");
                        F.tobtn.start()
                    } else {
                        F.disabledMsg = "\u8bf7\u91cd\u65b0\u83b7\u53d6\u9a8c\u8bc1\u7801\uff01";
                        if (F.triggerTip) {
                            F.triggerTip.attention(G.msg || F.msg.error || F.defaultMsg.error)
                        }
                    }
                },
                error: function () {
                    F.disabledMsg = "\u8bf7\u91cd\u65b0\u83b7\u53d6\u9a8c\u8bc1\u7801\uff01";
                    if (F.triggerTip) {
                        F.triggerTip.error("\u9a8c\u8bc1\u7801\u53d1\u9001\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01")
                    }
                }
            })
        },
        check: function (F) {
            if (F && !C.trim(this.input.val())) {
                this.resetTip();
                return
            }
            switch (this.stat.code) {
                case 1:
                case 2:
                case 3:
                    this.inputTip.error(this.stat.msg);
                    this.input.removeClass(this.errCls);
                    C.later(function () {
                        this.input.addClass(this.errCls)
                    }, 1, false, this);
                    break;
                case 100:
                    this.inputTip.hide();
                    this.input.removeClass(this.errCls);
                    break;
                default:
                    break
            }
        },
        checkAble: function () {
            var F = this;
            if (!C.trim(this.input.val()).length) {
                this.disabled = true;
                this.stat = this.statusCode.empty
            } else {
                if (this._checkAble()) {
                    this.disabled = false;
                    this.stat = this.statusCode.ok
                } else {
                    this.disabled = true;
                    this.stat = this.statusCode.formatError
                }
            }
            if (!this.checkUrl || F.disabled) {
                return
            }
            C.io({
                url: F.checkUrl,
                data: C.mix(F.checkData, {
                    code: C.trim(F.input.val())
                }),
                type: "post",
                dataType: "json",
                success: function (G) {
                    if (G.success) {
                        F.disalbed = false;
                        F.stat = {
                            code: F.statusCode.ok.code,
                            msg: G.msg || F.statusCode.ok.msg
                        }
                    } else {
                        F.disabled = true;
                        F.disabledMsg = "\u9a8c\u8bc1\u7801\u9519\u8bef";
                        F.stat = {
                            code: F.statusCode.ajaxError.code,
                            msg: G.msg || F.statusCode.ajaxError.msg
                        }
                    }
                },
                error: function () { }
            })
        },
        _checkAble: function () {
            return !!C.trim(this.input.val()).match(/^\d{6}$/)
        },
        reset: function (F) {
            if (F) {
                return
            }
            this.disabled = true;
            this.tobtn && this.tobtn.reset();
            this.input && this.input.removeClass(this.errCls);
            this.resetTip()
        },
        resetTriggerTip: function () {
            if (!this.triggerTip) {
                return
            }
            if (this.defaultTriggerTip && this.defaultTriggerTip.type && this.defaultTriggerTip.msg) {
                this.triggerTip.change(this.defaultTriggerTip.type, this.defaultTriggerTip.msg)
            } else {
                this.triggerTip.hide()
            }
        },
        resetInputTip: function () {
            if (!this.inputTip) {
                return
            }
            if (this.defaultInputTip && this.defaultInputTip.type && this.defaultInputTip.msg) {
                this.inputTip.change(this.defaultInputTip.type, this.defaultInputTip.msg)
            } else {
                this.inputTip.hide()
            }
        },
        resetTip: function () {
            this.input && this.input.val("");
            this.resetTriggerTip();
            this.resetInputTip()
        }
    });
    return D
}, {
    requires: ["Message", "TimeoutBtn"]
});
KISSY.add("ImageCheckCode", function (B, A) {
    var D = function (E) {
        this.input = E.input && B.one(E.input);
        this.errCls = B.isString(E.errCls) && E.errCls || "";
        this.img = E.img && B.one(E.img);
        this.getUrl = E.getUrl || "";
        this.checkUrl = E.checkUrl || "";
        this.checkData = B.isPlainObject(E.checkData) && E.checkData || {};
        this.trigger = E.trigger && B.one(E.trigger);
        this.tip = E.tip && B.one(E.tip) ? A(E.tip) : null;
        this.on = E.on || "keyup blur";
        this.defaultTip = E.defaultTip || null;
        this.disabledMsg = B.isString(E.disabledMsg) ? E.disabledMsg : "\u9a8c\u8bc1\u7801\u683c\u5f0f\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
        this.disabled = true;
        this.stat = {
            code: 0,
            msg: ""
        }
    };
    var C = function (E) {
        return new D(E)
    };
    B.augment(D, {
        ctype: "CHECKER",
        statusCode: {
            empty: {
                code: 1,
                msg: "\u4e0d\u80fd\u4e3a\u7a7a"
            },
            formatError: {
                code: 2,
                msg: "\u9a8c\u8bc1\u7801\u683c\u5f0f\u9519\u8bef"
            },
            ajaxError: {
                code: 3,
                msg: "\u9a8c\u8bc1\u7801\u9519\u8bef"
            },
            ok: {
                code: 100,
                msg: ""
            }
        },
        init: function () {
            if (!this.input || !this.img || !this.getUrl) {
                return this
            }
            var E = this;
            this.checkAble(true);
            if (this.trigger) {
                this.trigger.on("click", function (F) {
                    F.halt();
                    E.refresh()
                })
            }
            this.input.on(this.on, function () {
                E.validate()
            });
            this.img.on("click", function (F) {
                E.trigger.fire("click")
            });
            return this
        },
        validate: function (E) {
            if (!this.input) {
                this.disabled = false;
                return this.disabled
            }
            this.checkAble();
            if (E && this.tip.type != "error" && !this.tip.isHide()) {
                return this.disabled
            }
            this.check(E);
            return this.disabled
        },
        check: function (E) {
            if (E && !B.trim(this.input.val())) {
                this.reset();
                return
            }
            switch (this.stat.code) {
                case 1:
                case 2:
                case 3:
                    this.tip.error(this.stat.msg);
                    this.input.removeClass(this.errCls);
                    B.later(function () {
                        this.input.addClass(this.errCls)
                    }, 1, false, this);
                    break;
                case 100:
                    this.tip.hide();
                    this.input.removeClass(this.errCls);
                    break;
                default:
                    break
            }
        },
        checkAble: function () {
            var E = this;
            if (!B.trim(this.input.val()).length) {
                this.disabled = true;
                this.disabledMsg = "\u9a8c\u8bc1\u7801\u4e0d\u80fd\u4e3a\u7a7a";
                this.stat = this.statusCode.empty
            } else {
                if (!B.trim(this.input.val()).match(/^[\da-zA-Z]{4}$/)) {
                    this.disabled = true;
                    this.disabledMsg = "\u9a8c\u8bc1\u7801\u683c\u5f0f\u9519\u8bef";
                    this.stat = this.statusCode.formatError
                } else {
                    this.disabled = false;
                    this.stat = this.statusCode.ok
                }
            }
            if (!this.checkUrl || E.disalbed) {
                return
            }
            B.io({
                url: E.checkUrl,
                data: B.mix(E.checkData, {
                    code: B.trim(E.input.val())
                }),
                type: "post",
                dataType: "json",
                success: function (F) {
                    if (F.success) {
                        E.disabled = false;
                        E.stat = {
                            code: E.statusCode.ok.code,
                            msg: F.msg || E.statusCode.ok.msg
                        }
                    } else {
                        E.disabled = true;
                        E.disabledMsg = "\u9a8c\u8bc1\u7801\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
                        E.refresh();
                        E.stat = {
                            code: E.statusCode.ajaxError.code,
                            msg: F.msg || E.statusCode.ajaxError.msg
                        }
                    }
                }
            })
        },
        refresh: function () {
            this.img.attr("src", this.getUrl + (this.getUrl.indexOf("?") >= 0 ? "&t=" : "?t") + B.now());
            this.input.fire("focus")
        },
        reset: function () {
            this.input && this.input.removeClass(this.errCls);
            this.resetTip()
        },
        resetTip: function () {
            if (!this.tip) {
                return
            }
            if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
                this.tip.change(this.defaultTip.type, this.defaultTip.msg)
            } else {
                this.tip.hide()
            }
        }
    });
    return C
}, {
    requires: ["Message"]
});
KISSY.add("SimpleCheckCode", function (C, B, E) {
    var A = function (F) {
        this.input = F.input && C.one(F.input);
        this.errCls = C.isString(F.errCls) && F.errCls || "";
        this.checkUrl = F.checkUrl || "";
        this.checkData = C.isPlainObject(F.checkData) && F.checkData || {};
        this.tip = F.tip && C.one(F.tip) ? B(F.tip) : null;
        this.pattern = F.pattern || null;
        this.on = F.on || "keyup blur";
        this.placeholder = F.placeholder && C.one(F.placeholder);
        this.defaultTip = F.defaultTip || null;
        this.disabledMsg = C.isString(F.disabledMsg) ? F.disabledMsg : "\u8f93\u5165\u683c\u5f0f\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
        this.disabled = true;
        this._placeholder = null;
        this.checked = false;
        this.stat = {
            code: 0,
            msg: ""
        }
    };
    var D = function (F) {
        return new A(F)
    };
    C.augment(A, {
        ctype: "CHECKER",
        statusCode: {
            empty: {
                code: 1,
                msg: "\u4e0d\u80fd\u4e3a\u7a7a"
            },
            formatError: {
                code: 2,
                msg: "\u683c\u5f0f\u9519\u8bef"
            },
            ajaxError: {
                code: 3,
                msg: "\u8f93\u5165\u9519\u8bef"
            },
            ok: {
                code: 100,
                msg: ""
            }
        },
        init: function () {
            if (!this.input || !this.tip || !this.pattern) {
                return this
            }
            var F = this;
            this.validate(true);
            this.input.on(this.on, function () {
                F.validate()
            });
            if (this.placeholder) {
                this._placeholder = E({
                    input: this.input,
                    placeholder: this.placeholder
                }).init()
            }
            return this
        },
        validate: function (F) {
            if (!this.input) {
                this.disabled = false;
                return this.disabled
            }
            this.checkAble();
            if (F && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
                return this.disabled
            }
            this.check(F);
            return this.disabled
        },
        check: function (F) {
            if (F && !C.trim(this.input.val())) {
                this.resetTip();
                return
            }
            switch (this.stat.code) {
                case 1:
                case 2:
                case 3:
                    this.tip.error(this.stat.msg);
                    this.input.removeClass(this.errCls);
                    C.later(function () {
                        this.input.addClass(this.errCls)
                    }, 1, false, this);
                    break;
                case 100:
                    this.tip.hide();
                    this.input.removeClass(this.errCls);
                    break;
                default:
                    break
            }
        },
        checkAble: function () {
            var F = this;
            if (!C.trim(this.input.val()).length) {
                F.disabled = true;
                F.stat = F.statusCode.empty;
                return
            } else {
                if (C.trim(this.input.val()).match(this.pattern)) {
                    F.disabled = false;
                    F.stat = F.statusCode.ok
                } else {
                    F.disabled = true;
                    F.stat = F.statusCode.formatError;
                    return
                }
            }
            if (!this.checkUrl || this.disabled) {
                return
            }
            C.io({
                url: F.checkUrl,
                data: C.mix(F.checkData, {
                    code: C.trim(F.input.val())
                }),
                type: "post",
                dataType: "json",
                success: function (G) {
                    if (G.success) {
                        F.disabled = false;
                        F.stat = {
                            code: F.statusCode.ok,
                            msg: G.msg || F.statusCode.ajaxError
                        }
                    } else {
                        F.disabled = true;
                        F.stat = {
                            code: F.statusCode.ajaxError,
                            msg: G.msg || F.statusCode.ajaxError
                        }
                    }
                }
            })
        },
        reset: function (F) {
            this._placeholder && this._placeholder.fix();
            if (F) {
                return
            }
            this.disabled = true;
            this.input && this.input.val("").removeClass(this.errCls);
            this.tip && this.resetTip()
        },
        resetTip: function () {
            if (!this.tip) {
                return
            }
            if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
                this.tip.change(this.defaultTip.type, this.defaultTip.msg)
            } else {
                this.tip.hide()
            }
        }
    });
    return D
}, {
    requires: ["Message", "PlaceHolder"]
});
KISSY.add("SerectSecureCard", function (C, B) {
    var D = function (E) {
        this.input1 = E.input1 && C.one(E.input1);
        this.input2 = E.input2 && C.one(E.input2);
        this.errCls = C.isString(E.errCls) && E.errCls || "";
        this.checkUrl = E.checkUrl || "";
        this.checkData = C.isPlainObject(E.checkData) && E.checkData || {};
        this.tip = E.tip && C.one(E.tip) ? B(E.tip) : null;
        this.on = E.on || "key blur";
        this.defaultTip = E.defaultTip || null;
        this.disabledMsg = C.isString(E.disabledMsg) ? E.disabledMsg : "\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
        this.disabled = true;
        this.stat = {
            code: 0,
            msg: ""
        }
    };
    var A = function (E) {
        return new D(E)
    };
    C.augment(D, {
        ctype: "CHECKER",
        statusCode: {
            empty: {
                code: 1,
                msg: "\u4e0d\u80fd\u4e3a\u7a7a"
            },
            formatError: {
                code: 2,
                msg: "\u9a8c\u8bc1\u7801\u683c\u5f0f\u9519\u8bef"
            },
            ajaxError: {
                code: 3,
                msg: "\u9a8c\u8bc1\u7801\u9519\u8bef"
            },
            ok: {
                code: 100,
                msg: ""
            }
        },
        init: function () {
            if (!this.input1 || !this.input2) {
                return this
            }
            var E = this;
            this.validate(true);
            this.input1.on(this.on, function () {
                E.validate()
            });
            this.input2.on(this.on, function () {
                E.validate()
            });
            return this
        },
        validate: function (E) {
            if (!this.input1 || !this.input2 || !this.tip) {
                this.disabled = false;
                return this.disabled
            }
            this.checkAble();
            if (E && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
                return this.disabled
            }
            this.check(E);
            return this.disabled
        },
        check: function (E) {
            if (E && !C.trim(this.input1.val()) && !C.trim(this.input2.val())) {
                this.resetTip();
                return
            }
            switch (this.stat.code) {
                case 1:
                case 2:
                case 3:
                    this.tip.error(this.stat.msg);
                    this.input1.removeClass(this.errCls);
                    this.input2.removeClass(this.errCls);
                    C.later(function () {
                        this.input1.addClass(this.errCls);
                        this.input2.addClass(this.errCls)
                    }, 1, false, this);
                    break;
                case 100:
                    this.tip.hide();
                    this.input1.removeClass(this.errCls);
                    this.input2.removeClass(this.errCls);
                    break;
                default:
                    break
            }
        },
        checkAble: function () {
            var E = this;
            if (!C.trim(this.input1.val()) && !C.trim(this.input2.val())) {
                this.disabled = true;
                this.stat = this.statusCode.empty
            } else {
                if (this._checkAble()) {
                    this.disabled = false;
                    this.stat = this.statusCode.ok
                } else {
                    this.disabled = true;
                    this.stat = this.statusCode.formatError
                }
            }
            if (!this.checkUrl || this.disabled) {
                return
            }
            C.io({
                url: E.checkUrl,
                data: C.mix(E.checkData, {
                    id: C.trim((E.input1.attr("data-id") || "") + (E.input2.attr("data-id"))),
                    code: C.trim(E.input1.val() + E.input2.val())
                }),
                type: "post",
                dataType: "json",
                success: function (F) {
                    if (F.success) {
                        E.disabled = false;
                        E.stat = {
                            code: E.statusCode.ok.code,
                            msg: F.msg || E.statusCode.ok.msg
                        }
                    } else {
                        E.disabled = true;
                        E.stat = {
                            code: E.statusCode.ok.ajaxError,
                            msg: F.msg || E.statusCode.ajaxError.msg
                        }
                    }
                }
            })
        },
        _checkAble: function () {
            var E = !!C.trim(this.input1.val()).match(/^\d{2,3}$/);
            cv2 = !!C.trim(this.input2.val()).match(/^\d{2,3}$/);
            return E && cv2
        },
        reset: function (E) {
            if (E) {
                return
            }
            this.input1 && this.input1.val("").removeClass(this.errCls);
            this.input2 && this.input2.val("").removeClass(this.errCls);
            this.tip && this.resetTip()
        },
        resetTip: function () {
            if (!this.tip) {
                return
            }
            if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
                this.tip.change(this.defaultTip.type, this.defaultTip.msg)
            } else {
                this.tip.hide()
            }
        }
    });
    return A
}, {
    requires: ["Message"]
});
KISSY.add("QA", function (C, B) {
    var D = function (E) {
        this.a1 = E.a1 && C.one(E.a1);
        this.a1tip = E.a1tip && C.one(E.a1tip) ? B(E.a1tip) : null;
        this.a2 = E.a2 && C.one(E.a2);
        this.a2tip = E.a2tip && C.one(E.a2tip) ? B(E.a2tip) : null;
        this.a3 = E.a3 && C.one(E.a3);
        this.a3tip = E.a3tip && C.one(E.a3tip) ? B(E.a3tip) : null;
        this.errCls = C.isString(E.errCls) && E.errCls || "";
        this.a = [this.a1, this.a2, this.a3];
        this.tips = [this.a1tip, this.a2tip, this.a3tip];
        this.on = (E.on || "keyup blur");
        this.disabledMsg = C.isString(E.disabledMsg) ? E.disabledMsg : "\u5bc6\u4fdd\u95ee\u9898\u7b54\u6848\u683c\u5f0f\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
        this.disabled = true;
        this.stat = {
            code: 0,
            msg: ""
        }
    };
    var A = function (E) {
        return new D(E)
    };
    C.augment(D, {
        ctype: "CHECKER",
        statusCode: {
            empty: {
                code: 1,
                msg: "\u4e0d\u80fd\u4e3a\u7a7a"
            },
            ok: {
                code: 100,
                msg: ""
            }
        },
        init: function () {
            if (!this.a1 && !this.a2 && !this.a3) {
                return this
            }
            var E = this;
            this.checkAble(1, true);
            this.checkAble(2, true);
            this.checkAble(3, true);
            this.a1.on(this.on, function () {
                E.validate(1)
            });
            this.a2.on(this.on, function () {
                E.validate(2)
            });
            this.a3.on(this.on, function () {
                E.validate(3)
            });
            return this
        },
        validate: function (E) {
            if (!this.a1 && !this.a2 && !this.a3) {
                this.disabled = false;
                return this.disabled
            }
            this.checkAble(1);
            this.check(1, E);
            this.checkAble(2);
            this.check(2, E);
            this.checkAble(3);
            this.check(3, E);
            return this.disabled
        },
        check: function (E, F) {
            if (F && !C.trim(this.a[E - 1].val())) {
                return
            }
            switch (this.stat.code) {
                case 1:
                    this.tips[E - 1].show();
                    this.a[E - 1].removeClass(this.errCls);
                    C.later(function () {
                        this.a[E - 1].addClass(this.errCls)
                    }, 1, false, this);
                    break;
                case 100:
                    this.tips[E - 1].hide();
                    this.a[E - 1].removeClass(this.errCls);
                    break;
                default:
                    break
            }
        },
        checkAble: function (E) {
            if (this.a[E - 1]) {
                if (this.isEmpty(this.a[E - 1])) {
                    this.stat = this.statusCode.empty
                } else {
                    this.stat = this.statusCode.ok
                }
            }
            this.disabled = this.isEmpty(this.a1) || this.isEmpty(this.a2) || this.isEmpty(this.a3)
        },
        isEmpty: function (E) {
            return !C.trim(E.val()).length
        },
        reset: function (E) {
            if (E) {
                return
            }
            this.disabled = true;
            this.a1 && this.a1.val("").removeClass(this.errCls);
            this.a2 && this.a2.val("").removeClass(this.errCls);
            this.a3 && this.a3.val("").removeClass(this.errCls);
            this.a1tip && this.a1tip.hide();
            this.a2tip && this.a2tip.hide();
            this.a3tip && this.a3tip.hide()
        }
    });
    return A
}, {
    requires: ["Message"]
});
KISSY.add("UserName", function (B, A, E) {
    var C = function (F) {
        this.type = (F.type || "REG").toUpperCase();
        this.input = F.input && B.one(F.input);
        this.errCls = B.isString(F.errCls) && F.errCls || "";
        this.placeholder = F.placeholder && F.input ? E({
            input: F.input,
            placeholder: F.placeholder,
            blurCls: "ph_blur"
        }) : null;
        this.checkUrl = F.checkUrl || "";
        this.checkData = B.isPlainObject(F.checkData) && F.checkData || {};
        this.tip = F.tip && B.one(F.tip) ? A(F.tip) : null;
        this.on = F.on || "keyup blur";
        this.defaultTip = F.defaultTip || null;
        this.disabledMsg = B.isString(F.disabledMsg) ? F.disabledMsg : "\u7528\u6237\u540d\u8f93\u5165\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
        this.disabled = true;
        this.stat = {
            code: 0,
            msg: ""
        }
    };
    var D = function (F) {
        return new C(F)
    };
    B.augment(C, {
        ctype: "CHECKER",
        statusCode: {
            empty: {
                code: 1,
                msg: "\u4e0d\u80fd\u4e3a\u7a7a"
            },
            formatError: {
                code: 2,
                msg: "\u7528\u6237\u540d\u683c\u5f0f\u9519\u8bef"
            },
            ajaxError: {
                code: 3,
                msg: "\u7528\u6237\u540d\u9519\u8bef"
            },
            ok: {
                code: 100,
                msg: ""
            }
        },
        regex: {
            illegal: /\.\.|--|__|\uff0d|\uff3f|\u203b|\u25b2|\u25b3|\u3000| /,
            allNumber: /^\d+$/
        },
        init: function () {
            if (!this.input || !this.tip) {
                return this
            }
            this.placeholder && this.placeholder.init();
            var F = this;
            this.validate(true);
            this.input.on(this.on, function () {
                F.validate()
            });
            return this
        },
        validate: function (F) {
            if (!this.input) {
                this.disabled = false;
                return this.disabled
            }
            this.checkAble();
            if (F && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
                return this.disabled
            }
            this.check(F);
            return this.disabled
        },
        check: function (F) {
            if (F && !B.trim(this.input.val())) {
                this.reset();
                return
            }
            switch (this.stat.code) {
                case 1:
                case 2:
                case 3:
                    this.tip.error(this.stat.msg);
                    this.input.removeClass(this.errCls);
                    B.later(function () {
                        this.input.addClass(this.errCls)
                    }, 1, false, this);
                    break;
                case 100:
                    this.tip.hide();
                    this.input.removeClass(this.errCls);
                    break;
                default:
                    break
            }
        },
        checkAble: function () {
            var F = this;
            if (!B.trim(this.input.val()).length) {
                this.disabled = true;
                this.stat = this.statusCode.empty
            } else {
                if (this._checkAble()) {
                    F.disabled = false;
                    this.stat = this.statusCode.ok
                } else {
                    F.disabled = true;
                    this.stat = this.statusCode.formatError
                }
            }
            if (!this.checkUrl || this.disabled) {
                return
            }
            B.io({
                url: F.checkUrl,
                data: B.mix(F.checkData, {
                    username: B.trim(F.input.val())
                }),
                type: "post",
                dataType: "json",
                success: function (G) {
                    if (G.success) {
                        F.disabled = false;
                        F.stat = {
                            code: F.statusCode.ok.code,
                            msg: G.msg || F.statusCode.ok.msg
                        }
                    } else {
                        F.disabled = true;
                        F.stat = {
                            code: F.statusCode.ajaxError.code,
                            msg: G.msg || F.statusCode.ajaxError.msg
                        }
                    }
                }
            })
        },
        _checkAble: function () {
            var F;
            if (this.type != "REG") {
                F = this.matchSize() && !this.isIllegal()
            } else {
                F = this.matchSize() && !this.isAllNumber() && !this.isIllegal()
            }
            return F
        },
        isAllNumber: function () {
            return !!this.input.val().match(this.regex.allNumber)
        },
        isIllegal: function () {
            return !!this.input.val().match(this.regex.illegal)
        },
        size: function () {
            return B.trim(this.input.val()).replace(/[^\x00-\xff]/g, "**").length
        },
        matchSize: function () {
            var F = this.type == "REG" ? 5 : 2;
            return this.size() >= F
        },
        reset: function () {
            this.input && this.input.removeClass(this.errCls);
            this.resetTip()
        },
        resetTip: function () {
            if (!this.tip) {
                return
            }
            if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
                this.tip.change(this.defaultTip.type, this.defaultTip.msg)
            } else {
                this.tip.hide()
            }
        }
    });
    return D
}, {
    requires: ["Message", "PlaceHolder"]
});
KISSY.add("SubmitForm", function (B, A) {
    var D = function (E) {
        this.form = E.form && B.one(E.form);
        this.tip = E.tip && B.one(E.tip) ? A(E.tip) : null;
        this.trigger = E.trigger && B.one(E.trigger) ? A(E.trigger) : null;
        this.stop = B.isBoolean(E.stop) && E.stop || true;
        this.checkers = B.isArray(E.checkers) && E.checkers || (B.isFunction(E.checkers) ? E.checkers : []);
        this.disabledMsg = B.isString(E.disabledMsg) ? E.disabledMsg : "\u4fe1\u606f\u8f93\u5165\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
        this.checkerDisabledMsg = "";
        this.disabled = false
    };
    var C = function (E) {
        return new D(E)
    };
    B.augment(D, {
        init: function () {
            if (!this.form) {
                return
            }
            var E = this;
            if (this.trigger) {
                this.trigger.on("click", function () {
                    E.form.fire("submit")
                })
            }
            this.form.on("submit", function () {
                E.check();
                if (E.disabled && E.stop) {
                    E.tip && E.tip.error(E.checkerDisabledMsg || this.disabledMsg).laterHide(2000);
                    return false
                }
                return true
            });
            return this
        },
        check: function () {
            this.disabled = false;
            var G = B.isFunction(this.checkers) ? this.checkers() : this.checkers;
            if (!G.length) {
                return
            }
            for (var F = 0, E = G.length; F < E; F++) {
                if (G[F].validate && G[F].validate()) {
                    this.disabled = true;
                    if (G[F].disabledMsg) {
                        this.checkerDisabledMsg = G[F].disabledMsg
                    }
                    break
                }
            }
        }
    });
    return C
}, {
    requires: ["Message"]
});
KISSY.add("CheckTypeSelect", function (A) {
    var B = function (D) {
        this.select = D.select && A.one(D.select);
        this.container = D.container && A.one(D.container);
        this.from = D.from && A.one(D.from);
        this.otherTrigger = D.otherTrigger && A.all(D.otherTrigger).length && A.all(D.otherTrigger) || null;
        this.tagInput = D.tagInput && A.one(D.tagInput);
        this.allCheckers = A.isObject(D.allCheckers) ? D.allCheckers : null;
        this.checkers = [];
        this.index = this.select && this.select[0].selectedIndex
    };
    var C = function (D) {
        return new B(D)
    };
    A.augment(B, {
        init: function () {
            if (!this.select || !this.container || !this.from || !this.allCheckers) {
                return this
            }
            var D = this;
            this.change(true);
            this.select.on("change", function () {
                D.change()
            });
            if (this.otherTrigger) {
                this.otherTrigger.on("click", function (E) {
                    E.halt();
                    D.next()
                })
            }
            return this
        },
        change: function (I) {
            this.back();
            var G = this.select.val().split("_");
            this.index = this.select[0].selectedIndex;
            var D = A.one(this.select[0].options[this.index]).attr("data-tag");
            var H = null;
            this.tagInput && !!D && this.tagInput.val(D);
            for (var F = 0, E = G.length; F < E; F++) {
                var J = this.allCheckers[G[F]] && A.one(this.allCheckers[G[F]].id);
                if (J) {
                    this.container.append(J);
                    this.checkers.push(this.allCheckers[G[F]].checker);
                    H = this.allCheckers[G[F]].faq
                }
            }
            A.all(".check_faq").hide();
            H && A.one(H) && A.one(H).show() || A.one("#J_CommonFAQ") && A.one("#J_CommonFAQ").show();
            this.resetChecker(I)
        },
        selectIndex: function (D) {
            if (!this.select[0].options.length) {
                return
            }
            this.select[0].selectedIndex = D;
            this.select.fire("change")
        },
        next: function () {
            if (!this.select[0].options.length) {
                return
            }
            var D = this.index < this.select[0].options.length - 1 ? this.index + 1 : 0;
            this.selectIndex(D)
        },
        prev: function () {
            if (!this.select[0].options.length) {
                return
            }
            var D = this.index > 0 ? this.index - 1 : this.select[0].options.length - 1;
            this.selectIndex(D)
        },
        back: function () {
            if (!this.allCheckers) {
                return
            }
            this.checkers = [];
            for (var D in this.allCheckers) {
                var F = this.allCheckers[D]["id"],
					E = F && A.one(F) || null;
                if (E) {
                    this.from.append(E)
                }
            }
        },
        resetChecker: function (E) {
            for (var D in this.allCheckers) {
                this.allCheckers[D].checker.reset(E)
            }
        },
        reset: function (D) {
            this.back();
            this.resetChecker(D)
        },
        getCheckers: function () {
            return this.checkers
        }
    });
    return C
});
KISSY.use("Message,CheckTypeSelect,Email2Web,PlaceHolder,DynamicCheckCode,QA,SimpleCheckCode,SerectSecureCard,SubmitForm", function (D, G, I, A, B, E, J, F, C, H) {
    KISSY.ready(function () {
        var O = D.all;
        var M = E({
            trigger: "#J_btn_phone_code",
            triggerTip: "#J_btn_phone_code_tip",
            input: "#J_phone_code_input",
            errCls: "err_input",
            inputTip: "#J_phone_code_input_tip",
            on: "blur",
            getUrl: O("#J_phone_send_checkcode_url").val(),
            checkUrl: "",
            getData: {},
            checkData: {},
            btnText: "\u514d\u8d39\u83b7\u53d6\u9a8c\u8bc1\u7801",
            btnWaitText: "%t%\u79d2\u540e\u53ef\u91cd\u65b0\u53d1\u9001",
            btnWaitCls: "btn_graylong_disabled",
            btnTimeoutCls: "btn_gray",
            btnTimeoutText: "\u91cd\u65b0\u53d1\u9001",
            disabledMsg: "\u9a8c\u8bc1\u7801\u9519\u8bef",
            msg: {
                ok: "\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff0c\u8bf7\u67e5\u6536\uff01"
            }
        }).init();
        var L = O("#J_email").length && A(O("#J_email").text()).getUrl();
        var Q = E({
            trigger: "#J_btn_email_code",
            triggerTip: "#J_btn_email_code_tip",
            input: "#J_email_code_input",
            errCls: "err_input",
            on: "blur",
            inputTip: "#J_email_code_input_tip",
            getUrl: O("#J_email_send_checkcode_url").val(),
            checkUrl: "",
            getData: {},
            checkData: {},
            btnText: "\u514d\u8d39\u83b7\u53d6\u9a8c\u8bc1\u7801",
            btnWaitText: "%t%\u79d2\u540e\u53ef\u91cd\u65b0\u53d1\u9001",
            btnWaitCls: "btn_graylong_disabled",
            btnTimeoutCls: "btn_gray",
            btnTimeoutText: "\u91cd\u65b0\u53d1\u9001",
            disabledMsg: "\u90ae\u7bb1\u9a8c\u8bc1\u7801\u683c\u5f0f\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01",
            msg: {
                ok: "\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\uff01" + (L ? '<a href="' + L + '" target="_blank">\u7acb\u5373\u767b\u5f55\u90ae\u7bb1</a>' : "")
            }
        }).init();
        var P = J({
            on: "blur",
            a1: "#J_qa1_input",
            a1tip: "#J_qa1_tip",
            a2: "#J_qa2_input",
            a2tip: "#J_qa2_tip",
            a3: "#J_qa3_input",
            a3tip: "#J_qa3_tip",
            errCls: "err_input",
            on: "blur"
        }).init();
        var N = F({
            input: "#J_ml_input",
            errCls: "err_input",
            tip: "#J_ml_tip",
            on: "blur",
            pattern: /^\d{6}$/,
            checkUrl: "",
            disabledMsg: "\u624b\u673a\u5bc6\u4ee4\u8f93\u5165\u6709\u8bef",
            defaultTip: {
                type: "tips",
                msg: {
                    content: "\u8bf7\u8f93\u5165\u624b\u673a\u5bc6\u4ee4\u9a8c\u8bc1\u7801"
                }
            }
        }).init();
        var T = F({
            input: "#J_alipayotp_input",
            errCls: "err_input",
            tip: "#J_alipayotp_tip",
            on: "blur",
            pattern: /^\d{6}$/,
            checkUrl: "",
            disabledMsg: "\u5b9d\u4ee4\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef",
            defaultTip: {
                type: "tips",
                msg: {
                    content: "\u8bf7\u8f93\u5165\u652f\u4ed8\u5b9d\u5b9d\u4ee4\u9a8c\u8bc1\u7801"
                }
            }
        }).init();
        var R = C({
            input1: "#J_ssc_input1",
            input2: "#J_ssc_input2",
            errCls: "err_input",
            on: "blur",
            tip: "#J_ssc_tip",
            checkUrl: "",
            disabledMsg: "\u5bc6\u4fdd\u5361\u9a8c\u8bc1\u7801\u8f93\u5165\u6709\u8bef",
            defaultTip: {
                type: "tips",
                msg: {
                    content: "\u8bf7\u8f93\u5165\u5bc6\u4fdd\u5361\u9a8c\u8bc1\u7801"
                }
            }
        }).init();
        var S = F({
            input: "#J_idc_input",
            errCls: "err_input",
            tip: "#J_idc_tip",
            on: "blur",
            placeholder: "#J_idc_ph",
            pattern: /^.+$/,
            checkUrl: "",
            disabledMsg: "\u8bc1\u4ef6\u53f7\u7801\u6709\u8bef",
            defaultTip: {
                type: "tips",
                msg: {
                    content: "\u8bf7\u8f93\u5165\u5b9e\u540d\u8ba4\u8bc1\u7684\u8bc1\u4ef6\u53f7\u7801"
                }
            }
        }).init();
        var K = I({
            select: "#J_type_select",
            container: "#J_type_container",
            typeCls: ".J_type_mod",
            from: "#J_check_types",
            tagInput: "#J_check_tag",
            otherTrigger: ".J_othercheck_trigger",
            allCheckers: {
                phone: {
                    id: "#J_phone_check",
                    checker: M,
                    faq: "#J_PhoneFAQ"
                },
                question: {
                    id: "#J_qa_check",
                    checker: P,
                    faq: "#J_QAFAQ"
                },
                email: {
                    id: "#J_email_check",
                    checker: Q,
                    faq: "#J_EmailFAQ"
                },
                dcode: {
                    id: "#J_ml_check",
                    checker: N,
                    faq: "#J_DCodeFAQ"
                },
                otp: {
                    id: "#J_alipayotp_check",
                    checker: T,
                    faq: "#J_OtpFAQ"
                },
                matrix: {
                    id: "#J_ssc_check",
                    checker: R,
                    faq: "#J_MatrixFAQ"
                },
                auth: {
                    id: "#J_idc_check",
                    checker: S,
                    faq: "#J_AuthFAQ"
                }
            }
        }).init();
        H({
            form: "#J_check_form",
            checkers: function () {
                return K.getCheckers()
            }
        }).init();
        D.each(O(".later_hide"), function (U) {
            D.later(function () {
                D.one(U).fadeOut()
            }, 3000)
        })
    })
});
KISSY.add("EmailSuggest", function (B) {
    var A = function (D) {
        this.input = D.input && B.one(D.input) || null;
        this.host = B.isString(D.host) && [D.host] || B.isArray(D.host) && D.host || null;
        this.list = null;
        this.lis = null;
        this.current = -1;
        this.length = this.host && this.host.length || 0;
        this.events = {};
        this.ing = false
    };
    var C = function (D) {
        return new A(D)
    };
    B.augment(A, {
        suggest: null,
        bound: false,
        laterId: 0,
        init: function () {
            if (!this.input || !this.host) {
                return this
            }
            var D = this;
            this.input.on("focus", function () {
                D.show()
            }).on("keyup", function (E) {
                var F = E.keyCode;
                if (F != 13 && F != 40 && F != 38) {
                    D.update();
                    D.bind()
                } else {
                    if (F == 38 && D.ing) {
                        D.select(-1)
                    } else {
                        if (F == 40 && D.ing) {
                            D.select(1)
                        } else {
                            if (F == 13 && D.ing) {
                                D.complete()
                            }
                        }
                    }
                }
            }).on("blur", function () {
                D.complete()
            });
            B.one(window).on("resize", function () {
                D.fix()
            });
            return this
        },
        show: function () {
            this.suggest || this.create();
            this.input.parent().append(this.suggest);
            this.fix();
            this.ing = true;
            if (!B.trim(this.input.val())) {
                this.hide()
            } else {
                this.update()
            }
        },
        hide: function () {
            this.suggest.hide();
            this.lis && this.lis.length && this.lis.item(this.current).removeClass("current");
            this.current = -1;
            this.ing = false;
            this.events.hide && this.events.hide()
        },
        complete: function () {
            this.input.val(this.lis.item(this.current).text());
            this.hide();
            this.events.complete && this.events.complete(this.input.val())
        },
        bind: function () {
            if (this.bound || !this.lis || !this.lis.length) {
                return
            }
            var D = this;
            this.lis.on("mouseover", function () {
                D.lis.item(D.current).removeClass("current");
                D.current = parseInt(B.DOM.attr(this, "data-index"));
                D.lis.item(D.current).addClass("current")
            })
        },
        create: function () {
            this.suggest = B.one(B.DOM.create("<div>", {
                "class": "nomad_email_suggest"
            }));
            this.suggest.append('<span class="nomad_email_suggest_title">\u8bf7\u9009\u62e9</span><ul></li>')
        },
        update: function () {
            if (this.input.val().indexOf("@") > -1 || !B.trim(this.input.val())) {
                this.hide();
                return
            }
            if (!this.list) {
                this.list = this.suggest.one("ul")
            }
            var I = this.lis || this.list.all("li");
            var G = I.length && I || "",
				F = B.trim(this.input.val());
            var E = this;
            if (!G) {
                for (var H = 0, D = this.host.length; H < D; H++) {
                    G += '<li data-index="' + H + '">' + F + "@" + this.host[H] + "</li>"
                }
                this.list.html(G)
            } else {
                for (var H = 0, D = this.host.length; H < D; H++) {
                    G.item(H).html(F + "@" + E.host[H])
                }
            }
            this.lis = this.lis || this.suggest.all("li");
            this.suggest.show();
            this.ing = true
        },
        fix: function () {
            var D = this.input.offset();
            this.suggest.css({
                position: "absolute",
                left: D.left,
                top: D.top + this.input[0].clientHeight,
                minWidth: this.input[0].clientWidth
            });
            if (B.UA.ie <= 6) {
                this.suggest.css("width", this.input[0].clientWidth)
            }
        },
        select: function (D) {
            if (!this.lis || !this.lis.length) {
                return
            }
            if (this.current >= 0) {
                this.lis.item(this.current).removeClass("current")
            }
            if (D > 0) {
                this.current = this.current + 1 >= this.length ? 0 : this.current + 1
            } else {
                if (D < 0) {
                    this.current = this.current - 1 < 0 ? this.length - 1 : this.current - 1
                }
            }
            this.lis.item(this.current).addClass("current")
        },
        on: function (D, E) {
            if (!B.isString(D) || !B.isFunction(E)) {
                return this
            }
            switch (D.toLowerCase()) {
                case "hide":
                    this.events.hide = E;
                    break;
                case "complete":
                    this.events.complete = E;
                    break;
                default:
                    break
            }
            return this
        }
    });
    return C
});
KISSY.add("Email", function (D, A, C) {
    var E = function (F) {
        this.input = F.input && D.one(F.input);
        this.errCls = D.isString(F.errCls) && F.errCls || "";
        this.tip = F.tip && D.one(F.tip) && A(F.tip);
        this.on = F.on || "keydown blur";
        this.checkUrl = F.checkUrl || "";
        this.checkData = D.isPlainObject(F.checkData) && F.checkData || {};
        this.suggest = !!F.suggest;
        this.host = F.host || "";
        this.defaultTip = F.defaultTip || null;
        this.disabledMsg = D.isString(F.disabledMsg) ? F.disabledMsg : "\u8f93\u5165\u683c\u5f0f\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
        this.disabled = true;
        this.checked = false;
        this._suggest = null;
        this.stat = {
            code: 0,
            msg: ""
        }
    };
    var B = function (F) {
        return new E(F)
    };
    D.augment(E, {
        ctype: "CHECKER",
        pattern: /^[a-zA-Z\d][-\.\w]*@(?:[-\w]+\.)+(?:[a-zA-Z])+$/,
        statusCode: {
            empty: {
                code: 1,
                msg: "\u4e0d\u80fd\u4e3a\u7a7a"
            },
            formatError: {
                code: 2,
                msg: "\u683c\u5f0f\u9519\u8bef"
            },
            ajaxError: {
                code: 3,
                msg: "\u8f93\u5165\u9519\u8bef"
            },
            ok: {
                code: 100,
                msg: ""
            }
        },
        init: function () {
            if (!this.input || !this.tip || !this.pattern) {
                return this
            }
            var F = this;
            this.input.on(this.on, function () {
                F.validate()
            });
            if (this.suggest) {
                this._suggest = C({
                    input: this.input,
                    host: this.host
                }).init().on("complete", function () {
                    F.validate()
                })
            }
            this.validate(true);
            return this
        },
        validate: function (F) {
            if (!this.input) {
                this.disabled = false;
                return this.disabled
            }
            if (this.suggest && this._suggest && this._suggest.ing) {
                this.disabled = true;
                return this.disabled
            }
            this.checkAble();
            if (F && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
                return this.disabled
            }
            this.check(F);
            return this.disabled
        },
        check: function (F) {
            if (F && !D.trim(this.input.val())) {
                this.reset();
                return
            }
            switch (this.stat.code) {
                case 1:
                case 2:
                case 3:
                    this.tip.error(this.stat.msg);
                    this.input.removeClass(this.errCls);
                    D.later(function () {
                        this.input.addClass(this.errCls)
                    }, 1, false, this);
                    break;
                case 100:
                    this.tip.hide();
                    this.input.removeClass(this.errCls);
                    break;
                default:
                    break
            }
        },
        checkAble: function () {
            var F = this;
            if (!D.trim(this.input.val()).length) {
                this.disabled = true;
                this.stat = this.statusCode.empty;
                return
            } else {
                if (D.trim(this.input.val()).match(this.pattern)) {
                    this.disabled = false;
                    this.stat = this.statusCode.ok
                } else {
                    this.disabled = true;
                    this.stat = this.statusCode.formatError;
                    return
                }
            }
            if (!this.checkUrl || this.disabled) {
                return
            }
            D.io({
                url: F.checkUrl,
                data: D.mix(F.checkData, {
                    email: D.trim(F.input.val())
                }),
                type: "post",
                dataType: "json",
                success: function (G) {
                    if (G.success) {
                        F.disabled = false;
                        F.stat = {
                            code: F.statusCode.ok,
                            msg: G.msg || F.statusCode.ajaxError
                        }
                    } else {
                        F.disabled = true;
                        F.stat = {
                            code: F.statusCode.ajaxError,
                            msg: G.msg || F.statusCode.ajaxError
                        }
                    }
                }
            })
        },
        reset: function () {
            this.input && this.input.removeClass(this.errCls);
            this.resetTip()
        },
        resetTip: function () {
            if (!this.tip) {
                return
            }
            if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
                this.tip.change(this.defaultTip.type, this.defaultTip.msg)
            } else {
                this.tip.hide()
            }
        }
    });
    return B
}, {
    requires: ["Message", "EmailSuggest"]
});
KISSY.use("Email,SubmitForm", function (A, C, B) {
    KISSY.ready(function (E) {
        var D = C({
            input: "#J_email_input",
            errCls: "err_input",
            on: "blur",
            tip: "#J_email_tip",
            suggest: true,
            host: ["", "163.com", "qq.com", "126.com", "hotmail.com", "gmail.com", "yahoo.com", "263.com", "sohu.com", "sina.com"],
            defaultTip: {
                type: "tips",
                msg: {
                    content: "\u6b64\u90ae\u7bb1\u53ef\u4f5c\u4e3a\u767b\u5f55\u8d26\u6237\uff0c\u8bf7\u9009\u62e9\u5e38\u7528\u90ae\u7bb1\uff0c\u907f\u514d\u9057\u5fd8"
                }
            }
        }).init();
        B({
            form: "#J_new_email_form",
            checkers: [D]
        }).init();
        B({
            form: "#J_email_check_form",
            checkers: [D]
        }).init()
    })
});