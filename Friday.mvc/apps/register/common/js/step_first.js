/*pub-1|2013-05-08 17:23:51*/
KISSY.ready(function (a) {
    var e = a.unparam(window.self.location.search.slice(1)).css_style || "",
		d = a.one(".J_From") && a.one(".J_From").val(),
		b = e || d,
		c = b === "b2b";
    KISSY.use("UserName,Password,SuperCheckCode,SubmitForm,Agreement,ATP", function (n, u, i, o, r, h, y) {
        var p = "http://log.mmstat.com/member.1.1.";
        var z = u({
            type: "reg",
            input: "#J_Nick",
            tip: "#J_NickTip",
            on: "blur",
            errCls: "err-input",
            checkUrl: TRegister.INITDATA.userNameValidateUrl,
            defaultOn: "focus",
            defaultTip: {
                type: "tips",
                msg: {
                    content: "5-25\u4e2a\u5b57\u7b26\uff0c\u4e00\u4e2a\u6c49\u5b57\u4e3a\u4e24\u4e2a\u5b57\u7b26\uff0c\u63a8\u8350\u4f7f\u7528\u4e2d\u6587\u4f1a\u5458\u540d\u3002"
                }
            },
            suggestNick: "#J_NickSuggest",
            suggestNickList: "#J_NickSuggestList",
            suggestNickKey: "commandNick",
            cache: true,
            tipMsg: {
                ok: "\u4e00\u65e6\u6ce8\u518c\u6210\u529f\u4e0d\u80fd\u4fee\u6539"
            },
            msgTemplate: TRegister.CONSTANTS,
            checkCallback: function (B) {
                j("#J_NumTip");
                y.fire(p + "1", {
                    ok: B ? 0 : 1
                })
            }
        }).init();
        z.input && z.input.on("keyup", function () {
            j("#J_NumTip")
        });

        function j(D) {
            var D = D && n.one(D),
				B = n.one("#J_Nick");
            var C = n.trim(B.val()).replace(/[^\x00-\xff]/g, "**").length;
            if (!B || !D || !C) {
                D.css({
                    visibility: "hidden"
                });
                return
            }
            D.html(C + "\u4e2a\u5b57\u7b26").css({
                visibility: "visible"
            })
        }
        var s = c ? "http://club.china.alibaba.com/threadview/29787853.html" : "http://www.taobao.com/go/act/sale/mima.php";
        var g = i({
            input: "#J_Pwd",
            reinput: "#J_RePwd",
            username: "#J_Nick",
            errCls: "err-input",
            tip: "#J_PwdTip",
            retip: "#J_RePwdTip",
            timeout: 200,
            strengthInput: "#J_PwdStrengthInput",
            strength: "#J_PwdStrength",
            strengthCls: {
                weak: "pw-weak",
                medium: "pw-medium",
                strong: "pw-strong"
            },
            defaultOn: "focus",
            defaultTip: {
                type: "tips",
                msg: {
                    content: '6-16\u4e2a\u5b57\u7b26\uff0c\u8bf7\u4f7f\u7528\u5b57\u6bcd\u52a0\u6570\u5b57\u6216\u7b26\u53f7\u7684\u7ec4\u5408\u5bc6\u7801\uff0c\u4e0d\u80fd\u5355\u72ec\u4f7f\u7528\u5b57\u6bcd\u3001\u6570\u5b57\u6216\u7b26\u53f7\u3002<a href="' + s + '" tabindex="-1" target="_blank">\u5bc6\u7801\u8bbe\u7f6e\u6280\u5de7</a>'
                }
            },
            redefaultTip: {
                type: "tips",
                msg: {
                    content: "\u518d\u8f93\u4e00\u6b21\u5bc6\u7801"
                }
            },
            on: "blur",
            checkCallback: function (B) {
                y.fire(p + "2", {
                    ok: B ? 0 : 1
                })
            }
        }).init();
        var v = n.one("#J_CheckCode"),
			l = v ? v.attr("data-imgurl") || "" : "",
			m = n.unparam(l.substring(l.indexOf("?") + 1)),
			w = m.sessionid,
			A = m.identity,
			t = v.attr("data-apiserver") || "";
        var k = o({
            input: "#J_Code",
            container: "#J_CheckCode",
            prefixCls: "reg-",
            apiserver: t,
            identity: A,
            sessionid: w,
            on: "blur",
            errCls: "err-input",
            tip: "#J_CheckCodeTip",
            checkCallback: function (B) {
                y.fire(p + "3", {
                    ok: B ? 0 : 1
                })
            }
        }).init();
        k.on("switch", function () {
            if (this.codeType === "IMG") {
                y.fire(p + "5")
            } else {
                y.fire(p + "4")
            }
        });
        var x = function () {
            if (k) {
                n.one("#J_CheckCode") && n.one("#J_CheckCode").addClass("checkcode-v");
                k.showCode()
            }
        };
        n.all("#J_Step1Form").all("input").on("focus", function () {
            x()
        });
        r({
            form: "#J_Step1Form",
            checkers: [z, g, k]
        }).init();
        var q = n.one("#J_TbAgreementHandle") ? h({
            trigger: "#J_TbAgreementHandle",
            container: "#J_AgreementContainer",
            id: "_tb",
            url: n.one("#J_TbAgreementHandle").attr("data-url"),
            link: n.one("#J_TbAgreementHandle").attr("href"),
            timestamp: "201303201324"
        }).init() : null;
        var f = n.one("#J_HiTaoAgreementHandle") ? h({
            trigger: "#J_HiTaoAgreementHandle",
            container: "#J_AgreementContainer",
            id: "_hitao",
            url: n.one("#J_HiTaoAgreementHandle").attr("data-url"),
            link: n.one("#J_HiTaoAgreementHandle").attr("href"),
            timestamp: "201207121554"
        }).init() : null;
        q && n.one("#J_TbAgreementHandle").on("click", function () {
            y.fire(p + "7")
        });
        n.one("#J_BtnBasicInfoForm").on("click", function () {
            y.fire(p + "8")
        })
    })
});