﻿(function (C) {
    if (!C.onTgalleryReady) {
        var B = C.configTgallery || {}, D = B.isDaily !== undefined ? B.isDaily : (window.location.hostname.indexOf(".net") > -1), E = B.path || ("http://" + (D ? "assets.daily.taobao.net" : "a.tbcdn.cn") + "/apps/"), A = B.tag || "20121028";
        charset = B.charset || "GBK";
        if (C.config) {
            if (!C.config.tgallery) {
                C.Config.mappedRules = [[/^.*?\/tgallery\/(.*)$/, function (G, F) {
                    return E + F.replace(/-min/, "")
                } ]].concat(C.Config.mappedRules || []);
                C.config(C.config.tgallery = { packages: [{ name: "tgallery", tag: A, path: "/", charset: charset}] })
            }
            C.onTgalleryReady = C.use
        } else {
            C.onTgalleryReady = function (G, H) {
                if (!G || G.indexOf("tgallery") != 0 || C[G]) {
                    H && H(C, C[G]);
                    return
                }
                var F = G.replace("tgallery/", E);
                if (G.indexOf(".") < 0) {
                    F += ".js"
                }
                C.getScript(F + "?t=" + A, function () {
                    H && H(C, C[G])
                }, charset)
            }
        }
    }
    C.add("tgallery/tmall/common/tgallery", function () {
        return C
    })
})(KISSY);
