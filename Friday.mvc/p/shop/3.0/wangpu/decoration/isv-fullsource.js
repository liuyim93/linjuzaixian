KISSY.add("wangpu/decoration/isv", function (S) {
    TB.namespace("ISV");
    var isvArray = [{ isvParam: "u_name/u_visitor/u_item_id/u_item_num_id/u_aload_id/u_session/u_preurl/u_curl/u_title/u_time", isvUrl: "" }, { isvParam: "u_name/u_visitor/u_item_id/u_item_num_id/u_aload_id/u_session/u_preurl/u_curl/u_title/u_time", isvUrl: "http://tblog.tj.haodianpu.com/tj/tblog.php" }, { isvParam: "u_name/u_template_name/u_template_id/u_preurl/u_title", isvUrl: "http://c10.taobao.fenxi001.com/c"}];
    var S = KISSY, win = window, doc = document;
    var ISVStat = function () {
        var config = {}, urlPattern = /^http\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?$/;
        var halt = function (error) {
            if (true === config.debugMode) {
                alert(error)
            }
            return false
        };
        var getCookie = function (key) {
            if (0 < doc.cookie.length) {
                var cookies = doc.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
                return null === cookies ? "" : cookies[2]
            }
            return ""
        };
        var getSessionId = function () {
            return Math.ceil(Math.random() * 1E9).toString()
        };
        var getTimestamp = function () {
            return (+new Date).toString().substring(0, 10)
        };
        var getRef = function () {
            var refUrl = "";
            try {
                if ("" !== doc.referrer) {
                    refUrl = doc.referrer
                } else {
                    if (null !== win.opener && undefined !== win.opener) {
                        refUrl = (win.opener.document || 0).URL || ""
                    } else {
                        if (null !== win.parent) {
                            refUrl = win.parent.document.URL;
                            if (refUrl === doc.URL) {
                                refUrl = doc.referrer
                            }
                        }
                    }
                }
            } catch (e) {
            }
            return refUrl
        };
        var updateSession = function (result) {
            var curTimestamp = getTimestamp();
            var session = [getSessionId(), "0", curTimestamp];
            return session.join("_")
        };
        var getStatistics = function (result) {
            var queryArr = { u_name: config.nickName.toString(), u_item_id: config.itemId.toString(), u_item_num_id: config.itemNumId.toString(), u_template_name: config.templateName.toString(), u_template_id: config.templateId.toString(), u_visitor: getCookie(config.cnaCookieName), u_session: updateSession(result), u_preurl: encodeURIComponent(getRef()), u_curl: encodeURIComponent(doc.URL), u_title: encodeURIComponent(doc.title), u_aload_id: win.acookie_load_id || "", u_time: getTimestamp() };
            var loaderArr = [];
            for (var i = 0, j = result.length; i < j; i++) {
                var curItem = result[i];
                if (String === curItem.isvUrl.constructor && String === curItem.isvParam.constructor) {
                    if (true === urlPattern.test(curItem.isvUrl) && false !== curItem.isvParam.indexOf("_")) {
                        var paramArr = curItem.isvParam.toLowerCase().replace(/\s+/g, "").split("/");
                        if (0 < paramArr.length) {
                            var queryStr = "";
                            for (var p = 0, q = paramArr.length; p < q; p++) {
                                var curParam = paramArr[p];
                                if (undefined !== queryArr[curParam]) {
                                    queryStr += "&" + curParam + "=" + queryArr[curParam]
                                }
                            }
                            if ("" !== queryStr) {
                                queryStr = queryStr.replace("&", "?");
                                loaderArr[i] = new Image(1, 1);
                                loaderArr[i].src = curItem.isvUrl + queryStr;
                                loaderArr[i].onload = function () {
                                    return halt("Send Successfully")
                                }
                            }
                        }
                    } else {
                    }
                } else {
                }
            }
        };
        var fire = function () {
            if ("-1" === config.shopStats || "-2" == config.shopStats || isNaN(config.shopStats)) {
                S.log(config.validatorUrl + "?nickName=" + config.nickName.toString() + "&userId=" + config.userId.toString() + "&itemNumId=" + config.itemNumId.toString() + "&shopId=" + config.shopId.toString() + "&siteId=" + config.siteId.toString() + "&shopStats=" + config.shopStats.toString());
                S.getScript(config.validatorUrl + "?nickName=" + config.nickName.toString() + "&userId=" + config.userId.toString() + "&itemNumId=" + config.itemNumId.toString() + "&shopId=" + config.shopId.toString() + "&siteId=" + config.siteId.toString() + "&shopStats=" + config.shopStats.toString(), function () {
                    if (undefined === TB.ISV.Data || Array !== TB.ISV.Data.constructor || 0 === TB.ISV.Data.length) {
                        return halt("Cannot get the valid data")
                    }
                    var result = TB.ISV.Data;
                    delete TB.ISV.Data;
                    getStatistics(result)
                })
            } else {
                if (config.shopStats > 0) {
                    var result = [], i, intShopstat = parseInt(config.shopStats);
                    for (i = 0; i < isvArray.length; i++) {
                        if ((intShopstat & Math.pow(2, i)) > 0) {
                            result.push(isvArray[i])
                        }
                    }
                    getStatistics(result)
                }
            }
        };
        return { init: function (configuration) {
            config = configuration || {};
            S.mix(config, { nickName: "", userId: "", shopId: "", templateName: "", templateId: "", itemId: "", itemNumId: "", siteId: "", shopStats: "-2", cnaCookieName: "cna", sessionLife: 1400, validatorUrl: "http://store.taobao.com/tadget/shop_stats.htm", debugMode: false }, false);
            if ("" === config.itemId && -1 !== doc.URL.indexOf("?taomi=")) {
                var bidForm = $("J_FrmBid");
                if (null !== bidForm && bidForm.elements["item_id"]) {
                    config.itemId = bidForm.elements["item_id"].value
                }
            }
            switch (true) {
                case "" === config.nickName && "" === config.userId && "" === config.shopId:
                    return halt("nickName and userId and shopId are all null");
                    break;
                case "" === config.cnaCookieName:
                    return halt("cnaCookieName is null");
                    break;
                case Number !== config.sessionLife.constructor:
                    return halt("sessionLife is not a number");
                    break;
                case false === urlPattern.test(config.validatorUrl):
                    return halt("validatorUrl is not a valid url");
                    break
            }
            fire()
        } 
        }
    } ();
    return ISVStat
});
