﻿/*pub-1|2013-01-30 10:12:39*/
(function () {
    var AA = window,
    e = document,
    J = location,
    Aa = true,
    I = false;
    var AG = J.href;
    var V = "https:" == J.protocol;
    var Ab = (V ? "https://" : "http://") + "log.mmstat.com/";
    var H = I;
    var AW, AV, m;
    var Y = {};
    var AP;
    var P;
    var R = "0.0";
    var AB = false;
    var r = "::-plain-::";
    var AC;
    var x = !!e.attachEvent;
    var y = "attachEvent";
    var M = "addEventListener";
    var AJ = x ? y : M;
    var L;
    var N;
    var Q = I;
    var q = {};
    var AU = I;
    var t;
    var AD = "data-spm";
    var AO = "data-spm-protocol";
    var AQ;
    var w = "data-spm-wangpu-module-id";
    var a = "data-spm-anchor-id";
    function AK(Ad) {
        var Ac, Ag;
        try {
            Ac = [].slice.call(Ad);
            return Ac
        } catch (Af) {
            Ac = [];
            Ag = Ad.length;
            for (var Ae = 0; Ae < Ag; Ae++) {
                Ac.push(Ad[Ae])
            }
            return Ac
        }
    }
    function d(Ac, Ad) {
        return Ac && Ac.getAttribute ? (Ac.getAttribute(Ad) || "") : ""
    }
    function X(Ac, Af, Ad) {
        if (Ac && Ac.setAttribute) {
            try {
                Ac.setAttribute(Af, Ad)
            } catch (Ae) { }
        }
    }
    function p(Ac, Ae) {
        if (Ac && Ac.removeAttribute) {
            try {
                Ac.removeAttribute(Ae)
            } catch (Ad) {
                X(Ac, Ae, "")
            }
        }
    }
    function v(Ad, Ac) {
        return Ad.indexOf(Ac) == 0
    }
    function AX(Ac) {
        return typeof Ac == "string"
    }
    function k(Ac) {
        return typeof Ac == "number"
    }
    function D(Ac) {
        return Object.prototype.toString.call(Ac) === "[object Array]"
    }
    function AY(Ad, Ac) {
        return Ad.indexOf(Ac) >= 0
    }
    function AR(Ad, Ac) {
        return Ad.indexOf(Ac) > -1
    }
    function Z(Af, Ac) {
        for (var Ae = 0,
        Ad = Ac.length; Ae < Ad; Ae++) {
            if (AR(Af, Ac[Ae])) {
                return Aa
            }
        }
        return I
    }
    function AS(Ac) {
        return AX(Ac) ? Ac.replace(/^\s+|\s+$/g, "") : ""
    }
    function W(Ac) {
        return typeof Ac == "undefined"
    }
    function E() {
        L = L || e.getElementsByTagName("head")[0];
        return N || (L ? (N = L.getElementsByTagName("meta")) : [])
    }
    function AN() {
        var Ag = E(),
        Ae,
        Ad,
        Af,
        Ac;
        for (Ae = 0, Ad = Ag.length; Ae < Ad; Ae++) {
            Af = Ag[Ae];
            Ac = d(Af, "name");
            if (Ac == AD) {
                t = d(Af, AO)
            }
        }
    }
    function f(Ah) {
        var Aj = E(),
        Ag,
        Ae,
        Ad,
        Ai,
        Ac,
        Af;
        if (Aj) {
            for (Ag = 0, Ae = Aj.length; Ag < Ae; Ag++) {
                Ai = Aj[Ag];
                Ac = d(Ai, "name");
                if (Ac == Ah) {
                    AP = d(Ai, "content");
                    if (AP.indexOf(":") >= 0) {
                        Ad = AP.split(":");
                        t = Ad[0] == "i" ? "i" : "u";
                        AP = Ad[1]
                    }
                    Af = d(Ai, AO);
                    if (Af) {
                        t = (Af == "i" ? "i" : "u")
                    }
                    P = v(AP, "110");
                    m = (P ? R : AP);
                    return Aa
                }
            }
        }
        return I
    }
    function AF() {
        return Math.floor(Math.random() * 268435456).toString(16)
    }
    function T(Af) {
        var Ac = [],
        Ae,
        Ad;
        for (Ae in Af) {
            if (Af.hasOwnProperty(Ae)) {
                Ad = "" + Af[Ae];
                Ac.push(v(Ae, r) ? Ad : (Ae + "=" + encodeURIComponent(Ad)))
            }
        }
        return Ac.join("&")
    }
    function AE(Ad) {
        var Ae = [],
        Ag,
        Af,
        Ah,
        Ac = Ad.length;
        for (Ah = 0; Ah < Ac; Ah++) {
            Ag = Ad[Ah][0];
            Af = Ad[Ah][1];
            Ae.push(v(Ag, r) ? Af : (Ag + "=" + encodeURIComponent(Af)))
        }
        return Ae.join("&")
    }
    function u(Ad) {
        var Ac;
        try {
            Ac = AS(Ad.getAttribute("href", 2))
        } catch (Ae) { }
        return Ac || ""
    }
    function l(Ad, Ae, Ac) {
        Ad[AJ]((x ? "on" : "") + Ae,
        function (Ag) {
            Ag = Ag || AA.event;
            var Af = Ag.target || Ag.srcElement;
            Ac(Ag, Af)
        },
        I)
    }
    function O(Ac) {
        var Ad = AA.KISSY;
        if (Ad) {
            Ad.ready(Ac)
        } else {
            if (AA.jQuery) {
                jQuery(e).ready(Ac)
            } else {
                if (e.readyState === "complete") {
                    Ac()
                } else {
                    l(AA, "load", Ac)
                }
            }
        }
    }
    function h(Ae, Ag) {
        var Ad = new Image(),
        Ai = "_img_" + Math.random(),
        Af = Ae.indexOf("?") == -1 ? "?" : "&",
        Ah,
        Ac = Ag ? (D(Ag) ? AE(Ag) : T(Ag)) : "";
        AA[Ai] = Ad;
        Ad.onload = Ad.onerror = function () {
            AA[Ai] = null
        };
        Ad.src = Ah = Ac ? (Ae + Af + Ac) : Ae;
        Ad = null;
        return Ah
    }
    function AT() {
        if (!W(m)) {
            return m
        }
        if (AA._SPM_a && AA._SPM_b) {
            AW = AA._SPM_a.replace(/^{(\w+)}$/g, "$1");
            AV = AA._SPM_b.replace(/^{(\w+)}$/g, "$1");
            Q = Aa;
            m = AW + "." + AV;
            AN();
            return m
        }
        f(AD) || f("spm-id");
        if (!m) {
            AB = true;
            m = R;
            return R
        }
        var Ac = e.getElementsByTagName("body");
        var Ae;
        var Ad;
        Ac = Ac && Ac.length ? Ac[0] : null;
        if (Ac) {
            Ae = d(Ac, AD);
            if (Ae) {
                Ad = m.split(".");
                m = Ad[0] + "." + Ae
            }
        }
        if (!AR(m, ".")) {
            AB = true;
            m = R
        }
        return m
    }
    function AM(Ag) {
        var Ai = e.getElementsByTagName("*"),
        Ad,
        Af,
        Ae,
        Aj,
        Ah,
        Ac;
        for (Ad = []; Ag && Ag.nodeType == 1; Ag = Ag.parentNode) {
            if (Ag.hasAttribute("id")) {
                Ac = Ag.getAttribute("id");
                Aj = 0;
                for (Af = 0; Af < Ai.length; Af++) {
                    Ah = Ai[Af];
                    if (Ah.hasAttribute("id") && Ah.id == Ac) {
                        Aj++;
                        break
                    }
                }
                if (Aj == 1) {
                    Ad.unshift('id("' + Ac + '")');
                    return Ad.join("/")
                } else {
                    Ad.unshift(Ag.localName.toLowerCase() + '[@id="' + Ac + '"]')
                }
            } else {
                for (Af = 1, Ae = Ag.previousSibling; Ae; Ae = Ae.previousSibling) {
                    if (Ae.localName == Ag.localName) {
                        Af++
                    }
                }
                Ad.unshift(Ag.localName.toLowerCase() + "[" + Af + "]")
            }
        }
        return Ad.length ? "/" + Ad.join("/") : null
    }
    function B(Ac) {
        var Ad = q[AM(Ac)];
        return Ad ? Ad.spmc : ""
    }
    function AL(Ad) {
        var Ak, Ai, Ag, Ac, Aj, Ah = [],
        Al,
        Af,
        Ae;
        Ak = AK(Ad.getElementsByTagName("a"));
        Ai = AK(Ad.getElementsByTagName("area"));
        Ac = Ak.concat(Ai);
        for (Af = 0, Ae = Ac.length; Af < Ae; Af++) {
            Al = false;
            Aj = Ag = Ac[Af];
            while (Aj = Aj.parentNode) {
                if (Aj == Ad) {
                    break
                }
                if (d(Aj, AD)) {
                    Al = true;
                    break
                }
            }
            if (!Al) {
                Ah.push(Ag)
            }
        }
        return Ah
    }
    function c(Ad, Ae, Af) {
        var Al, Ah, An, Ac, Ak, Aq, Aj, Ai, Ag, Ap, Ao, As, Am, At, Ar;
        if (d(Ad, "data-spm-delay")) {
            Ad.setAttribute("data-spm-delay", "");
            return
        }
        Ae = Ae || Ad.getAttribute(AD) || "";
        if (!Ae) {
            return
        }
        Al = AL(Ad);
        An = Ae.split(".");
        As = (v(Ae, "110") && An.length == 3);
        if (As) {
            Am = An[2];
            At = Am.split("-");
            An[2] = "w" + ((At.length > 1) ? At[1] : "0");
            Ae = An.join(".")
        }
        if (AX(Ai = AT()) && Ai.match(/^[\w\-\*]+(\.[\w\-\*]+)?$/)) {
            if (!AY(Ae, ".")) {
                if (!AY(Ai, ".")) {
                    Ai += ".0"
                }
                Ae = Ai + "." + Ae
            } else {
                if (!v(Ae, Ai)) {
                    Ac = Ai.split(".");
                    An = Ae.split(".");
                    for (Ap = 0, Ag = Ac.length; Ap < Ag; Ap++) {
                        An[Ap] = Ac[Ap]
                    }
                    Ae = An.join(".")
                }
            }
        }
        if (!Ae.match || !Ae.match(/^[\w\-\*]+\.[\w\-\*]+\.[\w\-\*]+$/)) {
            return
        }
        Ar = parseInt(d(Ad, "data-spm-max-idx")) || 0;
        for (Ao = 0, Ak = Ar, Ag = Al.length; Ao < Ag; Ao++) {
            Ah = Al[Ao];
            Aq = u(Ah);
            if (!Aq) {
                continue
            }
            if (As) {
                Ah.setAttribute(w, Am)
            }
            if (Aj = Ah.getAttribute(a)) {
                S(Ah, Aj, Af);
                continue
            }
            Ak++;
            Aj = Ae + "." + (AZ(Ah) || Ak);
            S(Ah, Aj, Af)
        }
        Ad.setAttribute("data-spm-max-idx", Ak)
    }
    function A(Ae) {
        var Ad = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"],
        Af,
        Ac = Ad.length;
        for (Af = 0; Af < Ac; Af++) {
            if (Ae.indexOf(Ad[Af]) != -1) {
                return true
            }
        }
        return false
    }
    function AI(Ac) {
        return Ac ? (!!Ac.match(/^[^\?]*\balipay\.(?:com|net)\b/i)) : I
    }
    function G(Ac) {
        return Ac ? (!!Ac.match(/^[^\?]*\balipay\.(?:com|net)\/.*\?.*\bsign=.*/i)) : I
    }
    function i(Ad) {
        var Ac;
        while ((Ad = Ad.parentNode) && Ad.tagName != "BODY") {
            Ac = d(Ad, AO);
            if (Ac) {
                return Ac
            }
        }
        return ""
    }
    function o(Ae, Ak) {
        if (Ae && /&?\bspm=[^&#]*/.test(Ae)) {
            Ae = Ae.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")
        }
        if (!Ak) {
            return Ae
        }
        var Al, Ah, Aj, Ai = "&",
        Af, Ad, Ac, Ag;
        if (Ae.indexOf("#") != -1) {
            Aj = Ae.split("#");
            Ae = Aj.shift();
            Ah = Aj.join("#")
        }
        Af = Ae.split("?");
        Ad = Af.length - 1;
        Aj = Af[0].split("//");
        Aj = Aj[Aj.length - 1].split("/");
        Ac = Aj.length > 1 ? Aj.pop() : "";
        if (Ad > 0) {
            Al = Af.pop();
            Ae = Af.join("?")
        }
        if (Al && Ad > 1 && Al.indexOf("&") == -1 && Al.indexOf("%") != -1) {
            Ai = "%26"
        }
        Ae = Ae + "?spm=" + Ak + (Al ? (Ai + Al) : "") + (Ah ? ("#" + Ah) : "");
        Ag = AR(Ac, ".") ? Ac.split(".").pop().toLowerCase() : "";
        if (Ag) {
            if (({
                png: 1,
                jpg: 1,
                jpeg: 1,
                gif: 1,
                bmp: 1,
                swf: 1
            }).hasOwnProperty(Ag)) {
                return 0
            }
            if (!Al && Ad <= 1) {
                if (!Ah && !({
                    htm: 1,
                    html: 1,
                    php: 1
                }).hasOwnProperty(Ag)) {
                    Ae += "&file=" + Ac
                }
            }
        }
        return Ae
    }
    function K(Ac) {
        return Ac && (AG.split("#")[0] == Ac.split("#")[0])
    }
    function S(Ae, Ag, Af) {
        Ae.setAttribute(a, Ag);
        if (Af) {
            return
        }
        AC = AA.g_aplus_pv_id;
        if (AC) {
            Ag += "." + AC
        }
        if (!AC && (!m || m == R)) {
            return
        }
        var Ad = u(Ae);
        var Ah = (d(Ae, AO) || i(Ae) || t) == "i";
        var Ac = Ab + "tbspm.1.1?spm=";
        if (!Ad || A(Ad)) {
            return
        }
        if (!Ah && (v(Ad, "#") || K(Ad) || v(Ad.toLowerCase(), "javascript:") || AI(Ad) || G(Ad))) {
            return
        }
        if (Ah) {
            Ac += Ag + "&url=" + encodeURIComponent(Ad) + "&cache=" + AF();
            if (AQ == Ae) {
                h(Ac)
            }
        } else {
            if (!Af) {
                (Ad = o(Ad, Ag)) && b(Ae, Ad)
            }
        }
    }
    function b(Af, Ae) {
        var Ac, Ad = Af.innerHTML;
        if (Ad && Ad.indexOf("<") == -1) {
            Ac = e.createElement("b");
            Ac.style.display = "none";
            Af.appendChild(Ac)
        }
        Af.href = Ae;
        if (Ac) {
            Af.removeChild(Ac)
        }
    }
    function AZ(Ad) {
        var Af, Ac, Ae;
        if (AB) {
            Af = "0"
        } else {
            if (Q) {
                Ac = AM(Ad);
                Ae = q[Ac];
                if (Ae) {
                    Af = Ae.spmd
                }
            } else {
                Af = d(Ad, AD);
                if (!Af || !Af.match(/^d\w+$/)) {
                    Af = ""
                }
            }
        }
        return Af
    }
    function C(Ae) {
        var Af, Ad, Ac = Ae;
        while (Ae && Ae.tagName != "HTML" && Ae.tagName != "BODY" && Ae.getAttribute) {
            if (!Q) {
                Ad = Ae.getAttribute(AD)
            } else {
                Ad = B(Ae)
            }
            if (Ad) {
                Af = Ad;
                Ac = Ae;
                break
            }
            if (!(Ae = Ae.parentNode)) {
                break
            }
        }
        return {
            spm_c: Af,
            el: Ac
        }
    }
    function n(Ad) {
        var Ac;
        return (Ad && (Ac = Ad.match(/&?\bspm=([^&#]*)/))) ? Ac[1] : ""
    }
    function F(Af) {
        var Ae = e.getElementsByTagName("a"),
        Ac = Ae.length,
        Ad;
        for (Ad = 0; Ad < Ac; Ad++) {
            if (Ae[Ad] == Af) {
                return Ad + 1
            }
        }
        return 0
    }
    function j(Ah, Ae) {
        var Ac = u(Ah),
        Ag = n(Ac),
        Af = Ag ? Ag.split(".") : null,
        Aj,
        Ai,
        Ad = m && (Aj = m.split(".")).length == 2;
        if (Af && Af.length >= 4 && Af[3]) {
            if (Af[0] == "1003" || Af[0] == "2006") { } else {
                if (Ad) {
                    Af[0] = Aj[0];
                    Af[1] = Aj[1];
                    if (AB) {
                        Af[2] = "0"
                    }
                    Ai = AZ(Ah);
                    if (Ai) {
                        Af[3] = Ai
                    }
                }
            }
            S(Ah, Af.slice(0, 4).join("."), Ae);
            return
        } else {
            if (Ad) {
                Af = [m, 0, AZ(Ah) || F(Ah)];
                S(Ah, Af.join("."), Ae);
                return
            }
        }
        if (Ac && Ag) {
            Ah.href = " " + Ac.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "").replace(/\?#/, "#")
        }
    }
    function g(Ae, Ac) {
        AQ = Ae;
        var Ad = d(Ae, a),
        Af,
        Ag;
        if (!Ad) {
            Af = C(Ae.parentNode);
            Ag = Af.spm_c;
            if (!Ag) {
                j(Ae, Ac);
                return
            }
            if (AB) {
                Ag = "0"
            }
            c(Af.el, Ag, Ac)
        } else {
            S(Ae, Ad, Ac)
        }
    }
    function s(Ag) {
        if (!Ag || Ag.nodeType != 1) {
            return
        }
        p(Ag, "data-spm-max-idx");
        var Ad = AK(Ag.getElementsByTagName("a")),
        Af = AK(Ag.getElementsByTagName("area")),
        Ah = Ad.concat(Af),
        Ae,
        Ac = Ah.length;
        for (Ae = 0; Ae < Ac; Ae++) {
            p(Ah[Ae], a)
        }
    }
    function z(Ac) {
        var Ah = Ac.parentNode;
        if (!Ah) {
            return ""
        }
        var Af = Ac.getAttribute(AD);
        var Ad = C(Ah);
        var Ag = Ad.spm_c || 0;
        if (Ag && Ag.indexOf(".") != -1) {
            Ag = Ag.split(".");
            Ag = Ag[Ag.length - 1]
        }
        var Ae = m + "." + Ag;
        Af = Af || Y[Ae] || 0;
        if (k(Af)) {
            Af++;
            Y[Ae] = Af
        }
        return Ae + ".i" + Af
    }
    function U(Ad) {
        var Ae = Ad.tagName;
        var Ac;
        AC = AA.g_aplus_pv_id;
        if (Ae != "A" && Ae != "AREA") {
            Ac = z(Ad)
        } else {
            g(Ad, Aa);
            Ac = d(Ad, a)
        }
        Ac = (Ac || "0.0.0.0").split(".");
        return {
            a: Ac[0],
            b: Ac[1],
            c: Ac[2],
            d: Ac[3],
            e: AC
        }
    }
    function AH() {
        if (AU) {
            return
        }
        if (!AA.spmData) {
            if (!H) {
                setTimeout(arguments.callee, 100)
            }
            return
        }
        AU = Aa;
        var Af = AA.spmData["data"],
        Ae,
        Ac,
        Ag,
        Ad;
        if (!Af || !D(Af)) {
            return
        }
        for (Ae = 0, Ac = Af.length; Ae < Ac; Ae++) {
            Ag = Af[Ae];
            Ad = Ag.xpath;
            q[Ad] = {
                spmc: Ag.spmc,
                spmd: Ag.spmd
            }
        }
    }
    if (Z(AG, ["xiaobai.com", "admin.taobao.org"])) {
        return
    }
    O(function () {
        H = Aa
    });
    AT();
    AH();
    l(e, "mousedown",
    function (Ad, Ac) {
        var Ae;
        while (Ac && (Ae = Ac.tagName)) {
            if (Ae == "A" || Ae == "AREA") {
                g(Ac, I);
                break
            } else {
                if (Ae == "BODY" || Ae == "HTML") {
                    break
                }
            }
            Ac = Ac.parentNode
        }
    });
    AA.g_SPM = {
        resetModule: s,
        anchorBeacon: g,
        getParam: U
    }
})();