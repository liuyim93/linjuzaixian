KISSY.add("wangpu/decoration/isv", function (a) {
    TB.namespace("ISV");
    var e = [{
        isvParam: "u_name/u_visitor/u_item_id/u_item_num_id/u_aload_id/u_session/u_preurl/u_curl/u_title/u_time",
        isvUrl: ""
    }, {
        isvParam: "u_name/u_visitor/u_item_id/u_item_num_id/u_aload_id/u_session/u_preurl/u_curl/u_title/u_time",
        isvUrl: "http://tblog.tj.haodianpu.com/tj/tblog.php"
    }, {
        isvParam: "u_name/u_template_name/u_template_id/u_preurl/u_title",
        isvUrl: "http://c10.taobao.fenxi001.com/c"
    }];
    var a = KISSY,
		d = window,
		c = document;
    var b = function () {
        var i = {}, j = /^http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
        var k = function (p) {
            if (true === i.debugMode) {
                alert(p)
            }
            return false
        };
        var m = function (p) {
            if (0 < c.cookie.length) {
                var q = c.cookie.match(new RegExp("(^| )" + p + "=([^;]*)(;|$)"));
                return null === q ? "" : q[2]
            }
            return ""
        };
        var o = function () {
            return Math.ceil(Math.random() * 1000000000).toString()
        };
        var h = function () {
            return (+new Date).toString().substring(0, 10)
        };
        var n = function () {
            var p = "";
            try {
                if ("" !== c.referrer) {
                    p = c.referrer
                } else {
                    if (null !== d.opener && undefined !== d.opener) {
                        p = (d.opener.document || 0).URL || ""
                    } else {
                        if (null !== d.parent) {
                            p = d.parent.document.URL;
                            if (p === c.URL) {
                                p = c.referrer
                            }
                        }
                    }
                }
            } catch (q) { }
            return p
        };
        var g = function (p) {
            var q = h();
            var r = [o(), "0", q];
            return r.join("_")
        };
        var l = function (B) {
            var v = {
                u_name: i.nickName.toString(),
                u_item_id: i.itemId.toString(),
                u_item_num_id: i.itemNumId.toString(),
                u_template_name: i.templateName.toString(),
                u_template_id: i.templateId.toString(),
                u_visitor: m(i.cnaCookieName),
                u_session: g(B),
                u_preurl: encodeURIComponent(n()),
                u_curl: encodeURIComponent(c.URL),
                u_title: encodeURIComponent(c.title),
                u_aload_id: d.acookie_load_id || "",
                u_time: h()
            };
            var r = [];
            for (var y = 0, w = B.length; y < w; y++) {
                var A = B[y];
                if (String === A.isvUrl.constructor && String === A.isvParam.constructor) {
                    if (true === j.test(A.isvUrl) && false !== A.isvParam.indexOf("_")) {
                        var u = A.isvParam.toLowerCase().replace(/\s+/g, "").split("/");
                        if (0 < u.length) {
                            var x = "";
                            for (var t = 0, s = u.length; t < s; t++) {
                                var z = u[t];
                                if (undefined !== v[z]) {
                                    x += "&" + z + "=" + v[z]
                                }
                            }
                            if ("" !== x) {
                                x = x.replace("&", "?");
                                r[y] = new Image(1, 1);
                                r[y].src = A.isvUrl + x;
                                r[y].onload = function () {
                                    return k("Send Successfully")
                                }
                            }
                        }
                    } else { }
                } else { }
            }
        };
        var f = function () {
            if ("-1" === i.shopStats || "-2" == i.shopStats || isNaN(i.shopStats)) {
                a.log(i.validatorUrl + "?nickName=" + i.nickName.toString() + "&userId=" + i.userId.toString() + "&itemNumId=" + i.itemNumId.toString() + "&shopId=" + i.shopId.toString() + "&siteId=" + i.siteId.toString() + "&shopStats=" + i.shopStats.toString());
                a.getScript(i.validatorUrl + "?nickName=" + i.nickName.toString() + "&userId=" + i.userId.toString() + "&itemNumId=" + i.itemNumId.toString() + "&shopId=" + i.shopId.toString() + "&siteId=" + i.siteId.toString() + "&shopStats=" + i.shopStats.toString(), function () {
                    if (undefined === TB.ISV.Data || Array !== TB.ISV.Data.constructor || 0 === TB.ISV.Data.length) {
                        return k("Cannot get the valid data")
                    }
                    var s = TB.ISV.Data;
                    delete TB.ISV.Data;
                    l(s)
                })
            } else {
                if (i.shopStats > 0) {
                    var p = [],
						r, q = parseInt(i.shopStats);
                    for (r = 0; r < e.length; r++) {
                        if ((q & Math.pow(2, r)) > 0) {
                            p.push(e[r])
                        }
                    }
                    l(p)
                }
            }
        };
        return {
            init: function (q) {
                i = q || {};
                a.mix(i, {
                    nickName: "",
                    userId: "",
                    shopId: "",
                    templateName: "",
                    templateId: "",
                    itemId: "",
                    itemNumId: "",
                    siteId: "",
                    shopStats: "-2",
                    cnaCookieName: "cna",
                    sessionLife: 1400,
                    validatorUrl: "http://store.taobao.com/tadget/shop_stats.htm",
                    debugMode: false
                }, false);
                if ("" === i.itemId && -1 !== c.URL.indexOf("?taomi=")) {
                    var p = $("J_FrmBid");
                    if (null !== p && p.elements.item_id) {
                        i.itemId = p.elements.item_id.value
                    }
                }
                switch (true) {
                    case "" === i.nickName && "" === i.userId && "" === i.shopId:
                        return k("nickName and userId and shopId are all null");
                        break;
                    case "" === i.cnaCookieName:
                        return k("cnaCookieName is null");
                        break;
                    case Number !== i.sessionLife.constructor:
                        return k("sessionLife is not a number");
                        break;
                    case false === j.test(i.validatorUrl):
                        return k("validatorUrl is not a valid url");
                        break
                }
                f()
            }
        }
    } ();
    return b
});