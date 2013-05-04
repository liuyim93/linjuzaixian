/*pub-1|2013-03-28 10:57:41*/
(function () {
    var H = window, W = document, L = location, N = L.href, R = H._alimm_spmact_on_;
    R = (typeof R == "undefined" || R == 0) ? 0 : 1;
    if (!R) {
        return
    }
    try {
        var A = H.g_SPM.getParam
    } catch (T) {
        A = function () {
            return { a: 0, b: 0, c: 0, d: 0, e: 0 }
        }
    }
    var I = true;
    try {
        I = (self.location != top.location)
    } catch (T) {
    }
    var U = "data-spm-act-id";
    var G = ["mclick.simba.taobao.com", "click.simba.taobao.com", "click.tanx.com", "click.mz.simba.taobao.com", "click.tz.simba.taobao.com", "redirect.simba.taobao.com", "rdstat.tanx.com", "stat.simba.taobao.com", "s.click.taobao.com"];
    var C = !!W.attachEvent;
    var B = "attachEvent";
    var M = "addEventListener";
    var E = C ? B : M;
    function Q(Y, Z, X) {
        Y[E]((C ? "on" : "") + Z, function (b) {
            b = b || H.event;
            var a = b.target || b.srcElement;
            X(b, a)
        }, false)
    }
    function O() {
        if (/&?\bspm=[^&#]*/.test(location.href)) {
            return location.href.match(/&?\bspm=[^&#]*/ig)[0].split("=")[1]
        }
        return ""
    }
    function V(Z, g) {
        if (Z && /&?\bspm=[^&#]*/.test(Z)) {
            Z = Z.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")
        }
        if (!g) {
            return Z
        }
        var h, d, f, e = "&", b, Y, X, c;
        if (Z.indexOf("#") != -1) {
            f = Z.split("#");
            Z = f.shift();
            d = f.join("#")
        }
        b = Z.split("?");
        Y = b.length - 1;
        f = b[0].split("//");
        f = f[f.length - 1].split("/");
        X = f.length > 1 ? f.pop() : "";
        if (Y > 0) {
            h = b.pop();
            Z = b.join("?")
        }
        if (h && Y > 1 && h.indexOf("&") == -1 && h.indexOf("%") != -1) {
            e = "%26"
        }
        Z = Z + "?spm=" + g + (h ? (e + h) : "") + (d ? ("#" + d) : "");
        c = X.indexOf(".") > -1 ? X.split(".").pop().toLowerCase() : "";
        if (c) {
            if (({ png: 1, jpg: 1, jpeg: 1, gif: 1, bmp: 1, swf: 1 }).hasOwnProperty(c)) {
                return 0
            }
            if (!h && Y <= 1) {
                if (!d && !({ htm: 1, html: 1, php: 1 }).hasOwnProperty(c)) {
                    Z += "&file=" + X
                }
            }
        }
        return Z
    }
    function D(Z) {
        var e = window.location.href;
        var Y = e.match(/mm_\d{0,24}_\d{0,24}_\d{0,24}/i);
        var c = e.match(/[&\?](pvid=[^&]*)/i);
        var a = new RegExp("%3Dmm_\\d+_\\d+_\\d+", "ig");
        var b = new RegExp("mm_\\d+_\\d+_\\d+", "ig");
        function d(f) {
            f = f.replace(/refpos[=(%3D)]\w*/ig, X).replace(a, "%3D" + Y + "%26" + c.replace("=", "%3D")).replace(b, Y);
            if (c.length > 0) {
                f += "&" + c
            }
            return f
        }
        if (c && c[1]) {
            c = c[1]
        } else {
            c = ""
        }
        var X = e.match(/(refpos=(\d{0,24}_\d{0,24}_\d{0,24})?(,[a-z]+)?)(,[a-z]+)?/i);
        if (X && X[0]) {
            X = X[0]
        } else {
            X = ""
        }
        if (Y) {
            Y = Y[0];
            return d(Z)
        }
        return Z
    }
    function K(X) {
        var Y = H.KISSY;
        if (Y) {
            Y.ready(X)
        } else {
            if (H.jQuery) {
                jQuery(W).ready(X)
            } else {
                if (W.readyState === "complete") {
                    X()
                } else {
                    Q(H, "load", X)
                }
            }
        }
    }
    function S(X, Y) {
        return X && X.getAttribute ? (X.getAttribute(Y) || "") : ""
    }
    function P(Y) {
        if (!Y) {
            return
        }
        var Z, X = G.length;
        for (Z = 0; Z < X; Z++) {
            if (Y.indexOf(G[Z]) > -1) {
                return true
            }
        }
        return false
    }
    function F(Z, g) {
        if (Z && /&?\bspm=[^&#]*/.test(Z)) {
            Z = Z.replace(/&?\bspm=[^&#]*/g, "").replace(/&{2,}/g, "&").replace(/\?&/, "?").replace(/\?$/, "")
        }
        if (!g) {
            return Z
        }
        var h, d, f, e = "&", b, Y, X, c;
        if (Z.indexOf("#") != -1) {
            f = Z.split("#");
            Z = f.shift();
            d = f.join("#")
        }
        b = Z.split("?");
        Y = b.length - 1;
        f = b[0].split("//");
        f = f[f.length - 1].split("/");
        X = f.length > 1 ? f.pop() : "";
        if (Y > 0) {
            h = b.pop();
            Z = b.join("?")
        }
        if (h && Y > 1 && h.indexOf("&") == -1 && h.indexOf("%") != -1) {
            e = "%26"
        }
        Z = Z + "?spm=" + g + (h ? (e + h) : "") + (d ? ("#" + d) : "");
        c = X.indexOf(".") > -1 ? X.split(".").pop().toLowerCase() : "";
        if (c) {
            if (({ png: 1, jpg: 1, jpeg: 1, gif: 1, bmp: 1, swf: 1 }).hasOwnProperty(c)) {
                return 0
            }
            if (!h && Y <= 1) {
                if (!d && !({ htm: 1, html: 1, php: 1 }).hasOwnProperty(c)) {
                    Z += "&__file=" + X
                }
            }
        }
        return Z
    }
    function J(Y) {
        if (P(Y.href)) {
            var Z = S(Y, U);
            if (!Z) {
                if (!A) {
                    return
                }
                var a = A(Y), b = [a.a, a.b, a.c, a.d, a.e].join(".");
                if (I) {
                    b = [a.a || "0", a.b || "0", a.c || "0", a.d || "0"].join(".");
                    b = (O() || "0.0.0.0.0") + "_" + b
                }
                var X = F(Y.href, b);
                Y.href = X;
                Y.setAttribute(U, b)
            }
        }
        Y = undefined
    }
    Q(W, "mousedown", function (Z, Y) {
        var a, X = 0;
        while (Y && (a = Y.tagName) && X < 5) {
            if (a == "A" || a == "AREA") {
                J(Y);
                break
            } else {
                if (a == "BODY" || a == "HTML") {
                    break
                }
            }
            Y = Y.parentNode;
            X++
        }
    });
    K(function () {
        var b = document.getElementsByTagName("iframe");
        var c, X;
        for (var a = 0; a < b.length; a++) {
            c = S(b[a], "mmsrc");
            X = S(b[a], "mmworked");
            var Z = A(b[a]);
            var Y = [Z.a || "0", Z.b || "0", Z.c || "0", Z.d || "0", Z.e || "0"].join(".");
            if (c && !X) {
                if (I) {
                    Y = [Z.a || "0", Z.b || "0", Z.c || "0", Z.d || "0"].join(".");
                    Y = O() + "_" + Y
                }
                b[a].src = V(D(c), Y);
                b[a].setAttribute("mmworked", "mmworked")
            } else {
                b[a].setAttribute(U, Y)
            }
        }
    })
})();