/*pub-1|2013-05-08 17:23:51*/
KISSY.ready(function (a) {
    KISSY.use("Phone,Tip,AlipayAgreement,DynamicCheckCode,Email,overlay,SubmitForm,ATP", function (c, l, s, n, k, v, t, f, u) {
        var e = "http://log.mmstat.com/member.1.2.";
        var o = c.unparam(window.self.location.search.slice(1)).css_style || "",
			p = c.one(".J_From") && c.one(".J_From").val(),
			r = o || p,
			b = r === "b2b";
        var m = c.one("#J_ChkAlipayAgreement"),
			j = c.one("#J_Alipay");
        if (m) {
            m.on("click", function () {
                j && j.val(m && m.prop("checked") || "false");
                u.fire(e + "2", {
                    ok: j.val() === "false" ? 0 : 1
                })
            })
        }
        j && j.val(m && m.prop("checked") || "false");
        var d = l({
            input: "#J_PhoneInput",
            tip: "#J_PhoneTip",
            on: "blur",
            select: "#J_Area",
            area: "#J_AreaCode",
            errCls: "err-input",
            cache: true,
            checkUrl: TRegister.INITDATA.phoneValidateUrl,
            msgTemplate: TRegister.CONSTANTS,
            checkData: {
                style: r
            },
            checkUseCache: function (w, x) {
                return true
            },
            checkCallback: function (x, y) {
                q && q.tip && q.tip.hide();
                u.fire(e + "1", {
                    ok: x ? 0 : 1
                });
                if (!y) {
                    return
                }
                var C = !c.isUndefined(y.alipay) ? y.alipay : true;
                if (!b && !C) { }
                m && m.prop("checked", C && !!y.success);
                j && j.val(m && m.prop("checked") || "false");
                var z = y.msg || y.reason;
                if (z === "ERROR_CELLPHONE_DIRTY" || z === "ERROR_CELLPHONE_MEMBER_FANGKE_ERROR") {
                    d.tip && d.tip.attention(TRegister.CONSTANTS[z] || z);
                    return
                }
                if (z === "ERROR_CELLPHONE_EXISTED") {
                    var B = d.tip && d.tip.msg && d.tip.msg.all("a"),
						w = B.attr("href"),
						A = "TPL_username=" + c.trim(d.input.val()) + "&disableQuickLogin=true";
                    B.attr("href", w + (w.indexOf("?") >= 0 ? "&" : "?") + A);
                    return
                }
            }
        }).init(),
			i = k({
			    trigger: "#J_PhoneCheckCodeTrigger",
			    triggerTip: "#J_PhoneCheckCodeTriggerTip",
			    input: "#J_PhoneCheckCode",
			    inputTip: "#J_PhoneCheckCodeTip",
			    defaultInputTip: {
			        type: "tips",
			        msg: "\u8bf7\u8f93\u5165\u60a8\u6536\u5230\u76846\u4f4d\u9a8c\u8bc1\u7801"
			    },
			    defaultOn: "focus",
			    btnTimeoutText: "\u91cd\u65b0\u53d1\u9001\u9a8c\u8bc1\u7801",
			    btnWaitText: "%t%\u79d2\u540e\u91cd\u65b0\u53d1\u9001",
			    on: "blur",
			    getData: function () {
			        u.fire(e + "7");
			        return {
			            mobile: d.input.val(),
			            userNumId: c.one("#J_UserNumId").val(),
			            userId: c.one("#J_UserId").val(),
			            mobile_area: d.select.val(),
			            alipay: j && j.val()
			        }
			    },
			    getUrl: TRegister.INITDATA.reSendCodeUrl,
			    checkCallback: function (w, x) {
			        g && g.tip && g.tip.hide();
			        u.fire(e + "4", {
			            ok: w ? 0 : 1
			        });
			        if (!x || x.alipay || alipay) {
			            return
			        }
			        j.val(x.alipay || false)
			    }
			}).init();
        s({
            trigger: "#J_AlipayTipTrigger",
            tip: "#J_AlipayTip",
            offset: {
                x: -15,
                y: -62
            },
            refer: "#J_AlipayTipTrigger"
        }).init();
        n({
            checkbox: "#J_ChkAlipayAgreement",
            defaultChecked: true,
            checkedContent: "#J_AlipayCreate",
            uncheckedContent: "#J_AlipayUncreate"
        }).init();
        var h;
        c.all("#J_RewritePhone").on("click", function (w) {
            w.halt();
            h && h.hide();
            d && d.input[0].focus();
            u.fire(e + "6")
        });
        var q = f({
            form: "#J_PhoneForm",
            checkers: [d],
            tip: "#J_PhoneFormTip",
            stopTip: true,
            asyncURL: TRegister.INITDATA.sendCodeUrl,
            asyncDataType: "json",
            asyncExternalData: function () {
                return {
                    mobile: d.input.val(),
                    mobile_area: d.select.val(),
                    alipay: j && j.val(),
                    userNumId: c.one("#J_UserNumId").val()
                }
            },
            asyncCallback: function (x) {
                c.one("#J_PhoneNum") && c.one("#J_PhoneNum").text(c.trim(d.input.val()));
                if (x && x.success) {
                    var w = c.one("#J_CheckPop");
                    if (w && !h) {
                        w.show();
                        h = new t({
                            width: 400,
                            srcNode: w,
                            mask: true,
                            closable: true,
                            align: {
                                points: ["cc", "cc"]
                            }
                        });
                        h.render();
                        h.on("hide", function () {
                            i && i.reset() && i.inputTip.hide();
                            g && g.reset()
                        }).on("show", function () {
                            i && i.input[0].focus()
                        });
                        c.one(window).on("scroll", function () {
                            h.center()
                        }).on("resize", function () {
                            h.center()
                        })
                    }
                    h && h.show();
                    i && i.timeoutStart();
                    this.tip && this.tip.hide();
                    u.fire(e + "3", {
                        ok: 1
                    })
                } else {
                    this.tip && this.tip.error(x && TRegister.CONSTANTS[x.reason] || "\u9a8c\u8bc1\u7801\u53d1\u9001\u5931\u8d25\uff01");
                    u.fire(e + "3", {
                        ok: 0
                    })
                }
            }
        }).init();
        var g = f({
            form: "#J_CheckForm",
            asyncURL: TRegister.INITDATA.checkCodeUrl,
            asyncDataType: "json",
            checkers: [i],
            tip: "#J_CheckFormTip",
            stopTip: true,
            asyncExternalData: function () {
                return {
                    mobile: d.input.val(),
                    mobile_area: d.select.val()
                }
            },
            asyncCallback: function (y) {
                var w = (d.code === "86" ? "" : "00" + d.code) + d.input.val();
                c.one("#J_MobilePhone") && c.one("#J_MobilePhone").val(w);
                if (y && y.success) {
                    var x = c.get("#J_CheckForm");
                    x && x.submit();
                    u.fire(e + "5", {
                        ok: 1
                    });
                    return
                }
                this.tip && this.tip.error(y && TRegister.CONSTANTS[y.reason] || "\u9a8c\u8bc1\u5931\u8d25\uff01");
                u.fire(e + "5", {
                    ok: 0
                })
            }
        }).init()
    })
});