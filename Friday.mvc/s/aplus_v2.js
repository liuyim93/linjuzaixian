﻿/*pub-1|2013-05-02 15:25:04*/(function () {
    var at = window, N = document, W = (new Date()).getTime(), a = "g_tb_aplus_loaded";
    if (!N.getElementsByTagName("body").length) {
        setTimeout(arguments.callee, 50);
        return
    }
    if (at[a]) {
        return
    }
    at[a] = 1;
    var P = "http://a.tbcdn.cn/s/fdc/lsproxy.js?v=20130106";
    var aq = "7", j = location, F = "https:" == j.protocol, H = parent !== self, ab = 1, x = (ab ? "0.0" : ""), i = j.pathname, h = j.hostname, aV = (F ? "https://" : "http://") + "log.mmstat.com/", aI = aV + Y(j.hostname) + ".gif", K = [["logtype", H ? 0 : 1]], aB = location.href, ar = N.referrer, aH = F && (aB.indexOf("login.taobao.com") >= 0 || aB.indexOf("login.tmall.com") >= 0), aj = !!N.attachEvent, ao = "attachEvent", o = "addEventListener", aD = aj ? ao : o, g = false, aU = true, ac = "::-plain-::", av = "data-spm", aJ = "data-spm-protocol", aE = "goldlog_queue", L, au = w(), n, p, ay = y("cna"), Z = {}, B, ax = {}, T, J, l, aw, aM, an, v = g, aR = at._SPM_a, aQ = at._SPM_b, ad, aa, aL, t, E = g, z;
    ar = (function () {
        var a1, a0 = "wm_referrer", aZ = "refer_pv_id", aY = at.name || "", aW = R(aY), a2 = aW[a0], aX = aW.wm_old_value;
        a1 = N.referrer || c(a2);
        L = aW[aZ];
        if (!aH) {
            if (!G(aX)) {
                at.name = c(aX)
            } else {
                if (!G(a2)) {
                    at.name = aY.replace(/&?\bwm_referrer=[^&]*/g, "")
                }
            }
        }
        return a1
    })();
    function Y(a0) {
        if (H) {
            return "y"
        }
        var aW = "o", a1 = [["ju.taobao.com", "4"], ["juhuasuan.com", "4"], ["alipay.com", "5"], ["china.alibaba.com", "6"], ["1688.com", "6"], ["alibaba.com", "7"], ["aliloan.com", "8"], ["cnzz.com", "9"], ["net.cn", "a"], ["hichina.com", "a"], ["phpwind.com", "b"], ["aliyun.com", "c"], ["tao123.com", "d"], ["alimama.com", "e"], ["taobao.com", "1"], ["tmall.com", "2"], ["etao.com", "3"], ["*", aW]], aY = a1.length, aX, aZ;
        for (aX = 0; aX < aY; aX++) {
            aZ = a1[aX];
            if (aN(a0, aZ[0])) {
                return aZ[1]
            }
        }
        return aW
    }
    function aN(aX, aW) {
        return aX.indexOf(aW) > -1
    }
    function af(aX, aW) {
        return aX.indexOf(aW) == 0
    }
    function ah(aZ, aY) {
        var aX = aZ.length, aW = aY.length;
        return aX >= aW && aZ.indexOf(aY) == (aX - aW)
    }
    function aO(aW) {
        return aS(aW) ? aW.replace(/^\s+|\s+$/g, "") : ""
    }
    function c(aZ, aX) {
        var aW = aX || "";
        if (aZ) {
            try {
                aW = decodeURIComponent(aZ)
            } catch (aY) {
            }
        }
        return aW
    }
    function C(aZ) {
        var aW = [], aY, aX;
        for (aY in aZ) {
            if (aZ.hasOwnProperty(aY)) {
                aX = "" + aZ[aY];
                aW.push(af(aY, ac) ? aX : (aY + "=" + encodeURIComponent(aX)))
            }
        }
        return aW.join("&")
    }
    function az(aX) {
        var aY = [], a0, aZ, a1, aW = aX.length;
        for (a1 = 0; a1 < aW; a1++) {
            a0 = aX[a1][0];
            aZ = aX[a1][1];
            aY.push(af(a0, ac) ? aZ : (a0 + "=" + encodeURIComponent(aZ)))
        }
        return aY.join("&")
    }
    function aF(aX) {
        var aY = {}, aW;
        for (aW in aX) {
            if (aX.hasOwnProperty(aW)) {
                aY[aW] = aX[aW]
            }
        }
        return aY
    }
    function u(aY, aX) {
        for (var aW in aX) {
            if (aX.hasOwnProperty(aW)) {
                aY[aW] = aX[aW]
            }
        }
        return aY
    }
    function R(a1) {
        var aX = a1.split("&"), aY = 0, aW = aX.length, aZ, a0 = {};
        for (; aY < aW; aY++) {
            aZ = aX[aY].split("=");
            a0[aZ[0]] = c(aZ[1])
        }
        return a0
    }
    function U(aW) {
        return typeof aW == "number"
    }
    function G(aW) {
        return typeof aW == "undefined"
    }
    function aS(aW) {
        return typeof aW == "string"
    }
    function b(aW) {
        return Object.prototype.toString.call(aW) === "[object Array]"
    }
    function M(aW, aX) {
        return aW && aW.getAttribute ? (aW.getAttribute(aX) || "") : ""
    }
    function ae(aX) {
        var aW;
        try {
            aW = aO(aX.getAttribute("href", 2))
        } catch (aY) {
        }
        return aW || ""
    }
    function m() {
        var a0 = N.getElementById("tb-beacon-aplus");
        var aY = M(a0, "exparams");
        if (!aY) {
            return aY
        }
        var aX = ["taobao.com", "tmall.com", "etao.com", "hitao.com", "taohua.com", "juhuasuan.com", "alimama.com"];
        var aZ;
        var aW;
        if (H) {
            aW = aX.length;
            for (aZ = 0; aZ < aW; aZ++) {
                if (aN(h, aX[aZ])) {
                    return aY
                }
            }
            aY = aY.replace(/\buserid=\w*&?/, "")
        }
        aY = aY.replace(/\buserid=/, "uidaplus=");
        return aY
    }
    function d() {
        n = n || N.getElementsByTagName("head")[0];
        return p || (n ? (p = n.getElementsByTagName("meta")) : [])
    }
    function aT(a1, a3) {
        var aY = a1.split(";"), aZ, aX = aY.length, aW, a0;
        for (aZ = 0; aZ < aX; aZ++) {
            aW = aY[aZ].split("=");
            a0 = aO(aW[0]);
            if (a0) {
                a3[a0] = c(aO(aW[1]))
            }
        }
    }
    function y(aW) {
        var aX = N.cookie.match(new RegExp("\\b" + aW + "=([^;]+)"));
        return aX ? aX[1] : ""
    }
    function aA() {
        return Math.floor(Math.random() * 268435456).toString(16)
    }
    function X() {
        var aX, a0, aY = d(), aW = aY.length, aZ;
        for (aX = 0; aX < aW; aX++) {
            a0 = aY[aX];
            if (M(a0, "name") == "microscope-data") {
                aZ = M(a0, "content");
                aT(aZ, Z);
                E = aU
            }
        }
        B = C(Z);
        aM = Z.pageId;
        l = Z.shopId;
        aw = Z.siteInstanceId;
        an = Z.siteCategory;
        J = aw || l
    }
    function ai() {
        var aX, a0, aY = d(), aW = aY.length, aZ;
        for (aX = 0; aX < aW; aX++) {
            a0 = aY[aX];
            if (M(a0, "name") == "atp-beacon") {
                aZ = M(a0, "content");
                aT(aZ, ax)
            }
        }
        T = C(ax)
    }
    function aG() {
        var a0 = d(), aY, aX, aZ, aW;
        for (aY = 0, aX = a0.length; aY < aX; aY++) {
            aZ = a0[aY];
            aW = M(aZ, "name");
            if (aW == av) {
                ad = M(aZ, aJ)
            }
        }
    }
    function O(a1) {
        var a3 = d(), a0, aY, aX, a2, aW, aZ;
        if (a3) {
            for (a0 = 0, aY = a3.length; a0 < aY; a0++) {
                a2 = a3[a0];
                aW = M(a2, "name");
                if (aW == a1) {
                    aL = M(a2, "content");
                    if (aL.indexOf(":") >= 0) {
                        aX = aL.split(":");
                        ad = aX[0] == "i" ? "i" : "u";
                        aL = aX[1]
                    }
                    aZ = M(a2, aJ);
                    if (aZ) {
                        ad = (aZ == "i" ? "i" : "u")
                    }
                    t = af(aL, "110");
                    aa = (t ? x : aL);
                    return aU
                }
            }
        }
        return g
    }
    function aP() {
        if (!G(aa)) {
            return aa
        }
        if (aR && aQ) {
            aR = aR.replace(/^{(\w+)}$/g, "$1");
            aQ = aQ.replace(/^{(\w+)}$/g, "$1");
            v = aU;
            aa = aR + "." + aQ;
            aG();
            z.spm_ab = [aR, aQ];
            return aa
        }
        var aY = N.getElementsByTagName("head")[0], aX;
        O(av) || O("spm-id");
        aa = aa || x;
        if (!aa) {
            return aa
        }
        var aW = N.getElementsByTagName("body");
        var aZ;
        aX = aa.split(".");
        z.spm_ab = aX;
        aW = aW && aW.length ? aW[0] : null;
        if (aW) {
            aZ = M(aW, av);
            if (aZ) {
                aa = aX[0] + "." + aZ;
                z.spm_ab = [aX[0], aZ]
            }
        }
        return aa
    }
    function w() {
        var aW = "g_aplus_pv_id", aY = "", aX = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (!at[aW]) {
            while (aY.length < 6) {
                aY += aX.substr(Math.floor(Math.random() * 62), 1)
            }
            at[aW] = aY
        }
        return at[aW]
    }
    function al(aX) {
        aX = (aX || "").split("#")[0].split("?")[0];
        var aW = aX.length, aY = function (a2) {
            var a1, aZ = a2.length, a0 = 0;
            for (a1 = 0; a1 < aZ; a1++) {
                a0 = a0 * 31 + a2.charCodeAt(a1)
            }
            return a0
        };
        return aW ? aY(aW + "#" + aX.charCodeAt(aW - 1)) : -1
    }
    function s(aW) {
        var aX = at.KISSY;
        if (aX) {
            aX.ready(aW)
        } else {
            if (at.jQuery) {
                jQuery(N).ready(aW)
            } else {
                if (N.readyState === "complete") {
                    aW()
                } else {
                    V(at, "load", aW)
                }
            }
        }
    }
    function q() {
        if (H) {
            return
        }
        var aX = at.name || "", aY = aH ? (N.referrer || aB) : aB, aW = { refer_pv_id: au };
        if (F) {
            aW.wm_referrer = aY
        }
        if (aX.indexOf("=") == -1) {
            aW.wm_old_value = aX;
            at.name = C(aW)
        } else {
            if (aH && aX.match(/&?\bwm_referrer=[^&]+/)) {
                delete aW.wm_referrer
            }
            aX = R(aX);
            u(aX, aW);
            at.name = C(aX)
        }
    }
    function V(aX, aY, aW) {
        aX[aD]((aj ? "on" : "") + aY, function (a0) {
            a0 = a0 || at.event;
            var aZ = a0.target || a0.srcElement;
            aW(a0, aZ)
        }, g)
    }
    function aK() {
        var aX, aW, aZ = ["/theme/info/info", "/promo/co_header.php", "fast_buy.htm", "/add_collection.htm", "/taobao_digital_iframe", "/promo/co_header_taoinfo.php", "/list_forum", "/theme/info/info"];
        for (aX = 0, aW = aZ.length; aX < aW; aX++) {
            if (i.indexOf(aZ[aX]) != -1) {
                return aU
            }
        }
        var aY = /^https?:\/\/[\w\.]+\.taobao\.com/i;
        return !aY.test(ar)
    }
    function f() {
        var a0 = at[aE], aX, aZ, aW;
        if (!a0 || !b(a0) || !a0.length) {
            return
        }
        while (aX = a0.shift()) {
            if (!aX || !aX.action || !aS(aX.action) || !aX.arguments || !b(aX.arguments)) {
                continue
            }
            aW = aX.action.split(".");
            aZ = at;
            while (aW.length) {
                aZ = aZ[aW.shift()];
                if (!aZ) {
                    return
                }
            }
            if (typeof aZ == "function") {
                try {
                    aZ.apply(aZ, aX.arguments)
                } catch (aY) {
                }
            }
        }
    }
    function ap() {
        var aW = function () {
            f();
            setTimeout(aW, 200)
        };
        aW();
        V(at, "beforeunload", f)
    }
    function I(aW, aX) {
        if (!aX) {
            return
        }
        if (!r()) {
            return z.send(aW, aX)
        } else {
            return ak({ url: Q(aW, aX), js: P })
        }
    }
    function aC() {
        return ac + Math.random()
    }
    function S(aX) {
        var aW = aX.match(new RegExp("\\?.*spm=([\\w\\.\\-\\*]+)")), aY;
        return (aW && (aY = aW[1]) && aY.split(".").length == 5) ? aY : null
    }
    function k(a2, a1) {
        var aZ, aW = a1.length, a0, aY, aX;
        for (aZ = 0; aZ < aW; aZ++) {
            a0 = a1[aZ];
            aY = a0[0];
            aX = a0[1];
            if (aX) {
                a2.push([aY, aX])
            }
        }
    }
    function A() {
        if (Math.random() < 0.0001) {
            e("sample.js?v=120910")
        }
        var aW = ".tbcdn.cn/s/fdc/??spm.js,spmact.js?v=20130502";
        ag("http://a" + aW, "https://s" + aW);
        if (aw && l && (!an || an != "1")) {
            e("wp-beacon.js?v=121010")
        }
        if (Math.random() < 0.0001 && !H && aN(h, "www.taobao.com")) {
            e("exposure.js?v=121227")
        }
    }
    function ag(aY, aW) {
        var aX = N.createElement("script");
        aX.type = "text/javascript";
        aX.async = true;
        aX.src = F ? aW : aY;
        N.getElementsByTagName("head")[0].appendChild(aX)
    }
    function e(aY) {
        var aX = "http://a.tbcdn.cn/s/fdc/", aW = "https://s.tbcdn.cn/s/fdc/";
        ag(aX + aY, aW + aY)
    }
    function am(aZ, aX) {
        var aY = document.createElement("iframe");
        aY.style.width = "1px";
        aY.style.height = "1px";
        aY.style.position = "absolute";
        aY.style.display = "none";
        aY.src = aZ;
        if (aX) {
            aY.name = aX
        }
        var aW = document.getElementsByTagName("body")[0];
        aW.appendChild(aY);
        return aY
    }
    function r() {
        if (F) {
            return false
        }
        var aX = navigator.userAgent;
        var aW = aX.split(" Safari/");
        if (aW.length != 2) {
            return false
        }
        return at.localStorage && at.postMessage && aW[1].match(/[\d\.]+/) && aX.indexOf("AppleWebKit") > -1 && aX.match(/\bVersion\/\d+/) && !aX.match(/\bChrome\/\d+/)
    }
    function ak(aW) {
        var aX = "http://cdn.mmstat.com/aplus-proxy.html?v=20130115";
        am(aX, JSON.stringify(aW));
        if (at.addEventListener && at.JSON) {
            at.addEventListener("message", function (aY) {
                var a2 = aY.data;
                function a5() {
                    var a8 = h.split(".");
                    var a7 = a8.length;
                    if (a7 > 1) {
                        return a8[a7 - 2] + "." + a8[a7 - 1]
                    } else {
                        return h
                    }
                }
                try {
                    a2 = JSON.parse(a2)
                } catch (a4) {
                    return
                }
                var a6, aZ, a1;
                for (var a3 = 0, a0 = a2.length; a3 < a0; a3++) {
                    a6 = a2[a3];
                    a1 = a6.k;
                    aZ = encodeURIComponent(a1) + "=" + (a1 == "cna" ? a6.v : encodeURIComponent(a6.v)) + "; domain=." + a5() + "; path=/; expires=" + (new Date(a6.t)).toGMTString();
                    N.cookie = aZ
                }
            })
        }
    }
    function Q(aX, aZ) {
        var aY = aX.indexOf("?") == -1 ? "?" : "&", aW = aZ ? (b(aZ) ? az(aZ) : C(aZ)) : "";
        return aW ? (aX + aY + aW) : aX
    }
    z = { version: aq, pvid: au, referrer: ar, _d: {}, _microscope_data: Z, on: V, DOMReady: s, getCookie: y, tryToGetAttribute: M, tryToGetHref: ae, isNumber: U, send: function (aX, aY) {
        var aW = new Image(), a0 = "_img_" + Math.random(), aZ = Q(aX, aY);
        at[a0] = aW;
        aW.onload = aW.onerror = function () {
            at[a0] = null
        };
        aW.src = aZ;
        aW = null;
        return aZ
    }, emit: function (aZ, aY) {
        var aW, aX = "ued.1.1.2?type=9";
        if (b(aY)) {
            aW = ([["_gm:id", aZ]]).concat(aY)
        } else {
            aW = aF(aY);
            aW["_gm:id"] = aZ
        }
        return z.send(aV + aX, aW)
    }, record: function (a0, aZ, a3, a4) {
        a4 = arguments[3] || "";
        var aW, aY = "?", aX = g, a1;
        var a2 = "http://ac.atpanel.com/";
        if (a0 == "ac") {
            aW = a2 + "1.gif";
            aX = af(a4, "A") && (a4.substr(1) == al(a0))
        } else {
            if (af(a0, "ac-")) {
                aW = a2 + a0.substr(3);
                aX = af(a4, "A") && (a4.substr(1) == al(a0))
            } else {
                if (af(a0, "/")) {
                    aX = af(a4, "H") && (a4.substr(1) == al(a0));
                    aW = aV + a0.substr(1);
                    a1 = aU
                } else {
                    if (ah(a0, ".gif")) {
                        aW = aV + a0
                    } else {
                        return g
                    }
                }
            }
        }
        if (!aX && a4 != "%" && al(aB) != a4) {
            return g
        }
        aW += aY + "cache=" + aA() + "&gmkey=" + encodeURIComponent(aZ) + "&gokey=" + encodeURIComponent(a3) + "&cna=" + ay + "&isbeta=" + aq;
        if (a1) {
            aW += "&logtype=2"
        }
        if (!r()) {
            return z.send(aW)
        } else {
            return ak({ url: aW, js: P })
        }
    } 
    };
    at.goldlog = z;
    at.goldminer = { record: z.emit };
    if (!at[aE] || !b(at[aE])) {
        at[aE] = []
    }
    ap();
    X();
    aP();
    A();
    (function () {
        var a2, a0 = y("tracknick"), aZ = Z.prototypeId, a1 = S(aB), a3 = S(ar);
        if (!H || aK()) {
            a2 = [[aC(), "title=" + escape(N.title)], ["pre", ar], ["cache", aA()], ["scr", screen.width + "x" + screen.height], ["isbeta", aq]];
            if (ay) {
                a2.push([aC(), "cna=" + ay])
            }
            if (a0) {
                a2.push([aC(), "nick=" + a0])
            }
            k(a2, [["wm_pageid", aM], ["wm_prototypeid", aZ], ["wm_instanceid", aw], ["wm_sid", l], ["spm-url", a1], ["spm-pre", a3]]);
            if (ab) {
                a2.push(["spm-cnt", (aa || "0.0") + ".0.0." + au])
            } else {
                if (aa) {
                    a2.push(["spm-cnt", aa])
                }
            }
            K = K.concat(a2);
            K.push([aC(), m()]);
            at.g_aplus_pv_req = I(aI, K)
        }
        if (H) {
            ai();
            var aX, aW = ax.on, aY = (aW == "1" ? "http://ac.atpanel.com/y.gif" : aI);
            if ((aW == "1" || aW == "2") && (aX = ax.chksum) && aX === al(aB).toString()) {
                I(aY, K)
            }
        }
        if (aH) {
            q()
        } else {
            V(at, "beforeunload", function () {
                q()
            })
        }
    })();
    var D = (new Date()).getTime();
    setTimeout(function () {
        if (Math.random() > 0.0001) {
            return
        }
        z.emit("global_sample", { type: "timer", t: D - W })
    }, 1)
})();
