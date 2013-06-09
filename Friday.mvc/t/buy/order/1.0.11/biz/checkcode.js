/*pub-1|2013-06-05 17:41:03*/
KISSY.add("order/biz/checkcode", function (c, i, h, a, b, f) {
    var d;
    var e = { alter: function () {
        i.attr(i.get("#R_Verify img"), "src", d + c.guid())
    }, render: function () {
        var k = a.get("checkCodeData");
        if (!k) {
            return ""
        }
        i.val("#F_sid", k.sid);
        i.val("#F_time", k.gmtCreate);
        i.val("#F_isCheckCode", k.needCheckCode);
        i.val("#F_encrypterString", k.encrypterString);
        if (!k.needCheckCode) {
            return ""
        }
        d = "http://" + (f.daily ? "new.checkcode.daily.taobao.net:8888" : "checkcode.taobao.com") + "/auction/checkcode?sessionID=" + k.encrypterString + "&" + c.now();
        var j = '<div id="R_Verify" class="verify">';
        j += '<div class="verify-code"><label for="R_VerifyCode">\u6821\u9a8c\u7801\uff1a</label><em>*</em><input id="R_VerifyCode" class="text" type="text" name="checkCode" autocomplete="off" /></div><div class="verify-img"><a data-evt="biz/checkcode:alter">\u770b\u4e0d\u6e05\u695a<br/>\u518d\u6362\u4e00\u5f20</a><img data-evt="biz/checkcode:alter" src="' + d + c.guid() + '"/></div>';
        j += b.toHidden({ id: "F_checkCode", name: "newCheckCode" });
        return j + "</div>"
    }, validate: function (n, k) {
        var l = i.get("#R_VerifyCode");
        if (!l) {
            return n()
        }
        var j = this;
        var m = c.trim(l.value);
        if ("" === m) {
            l.value = "";
            l.focus();
            g("\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801");
            return k()
        }
        c.IO({ url: i.val("#F_checkCodeUrl"), type: "get", dataType: "text", data: { isCheckCode: i.val("#F_isCheckCode"), encrypterString: i.val("#F_encrypterString"), sid: i.val("#F_sid"), gmtCreate: i.val("#F_time"), cartIds: i.val("#F_cartId"), buy_params: i.val("#F_buyParam"), checkCode: m, mealId: i.val("#F_mealId"), combo: i.val("#F_combo") }, success: function (o) {
            o = c.trim(o);
            if (o !== "error") {
                i.val("#F_checkCode", o);
                n()
            } else {
                j.alter();
                g("\u8bf7\u586b\u5199\u6b63\u786e\u7684\u6821\u9a8c\u7801");
                k()
            }
        } 
        })
    } 
    };
    function g(j) {
        alert(j)
    }
    return e
}, { requires: ["dom", "event", "order/model", "order/render/common", "order/util"] }); 