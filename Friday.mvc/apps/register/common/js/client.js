/*pub-1|2013-01-31 00:29:31*/
KISSY.add("client", function (D) {
    var B = navigator,
		C = B.userAgent;
    var A = {
        ua: D.UA,
        screen: window.screen,
        lang: B.language,
        os: {
            windows: (function () {
                var E = /(?:.*?)windows nt (\d)\.(\d)(?:.*)/i;
                return E.test(C) ? C.replace(E, "$1.$2") : ""
            })(),
            macos: (function () {
                var E = /(?:.*?)mac os x (\d+)[\._](\d+)(?:[\._](\d+))?(?:.*)/i;
                return E.test(C) ? C.replace(E, "$1.$2$3") : ""
            })(),
            ios: (function () {
                var E = /cpu(?: iphone)? os (\d)_(\d)(?:_(\d))?/;
                return E.test(C) ? C.replace(E, "$1.$2$3") : ""
            })(),
            android: (function () {
                var E = /android (\d)\.(\d)/;
                return E.test(C) ? C.replace(E, "$1.$2") : ""
            })(),
            chromeos: (function () {
                var E = /cros i686 (\d+)\.(\d+)(?:\.(\d+))?/;
                return E.test(C) ? C.replace(E, "$1.$2$3") : ""
            })(),
            linux: (function () {
                return C.indexOf("linux") >= 0 ? "NOVER" : ""
            })(),
            windowsce: (function () {
                var E = C.indexOf("windows ce ") > 0 ? (/windows ce (\d)\.(\d)/) : "windows ce";
                if (D.isString(E)) {
                    return C.indexOf(E) >= 0 ? "NOVER" : ""
                } else {
                    return E.test(C) ? C.replace(E, "$1.$2") : ""
                }
            })(),
            symbian: (function () {
                var E = /symbianos\/(\d+)\.(\d+)/;
                return E.test(C) ? C.replace(E, "$1.$2") : ""
            })(),
            blackberry: (function () {
                return C.indexOf("blackberry") >= 0 ? "NOVER" : ""
            })()
        }
    };
    D.client = A;
    return A
});
KISSY.ready(function (A) {
    A.use("client", function (E, B) {
        var G, D, H = B.lang,
			F = B.screen.width + "*" + B.screen.height;
        E.each(B.os, function (I, J) {
            switch (J) {
                case "android":
                case "blackberry":
                case "chromeos":
                case "ios":
                case "linux":
                case "macos":
                case "symbian":
                case "windows":
                case "windowsce":
                    if (I) {
                        G = J + (I && I !== "NOVER" ? "|" + I : "")
                    }
                    break;
                default:
                    break
            }
        });
        E.each(B.ua, function (I, J) {
            switch (J) {
                case "ie":
                case "firefox":
                case "chrome":
                case "opera":
                case "safari":
                    if (I) {
                        D = J + (I ? "|" + I : "")
                    }
                    break;
                default:
                    break
            }
        });
        var C = [E.one("#J_Step1Form")];
        E.each(C, function (K) {
            var K = K ? K[0] : null;
            if (!K) {
                return
            }
            try {
                var I = K.elements.oslanguage,
					J = K.elements.sr,
					M = K.elements.osVer,
					N = K.elements.naviVer;
                I && H && (I.value = H);
                J && F && (J.value = F);
                M && G && (M.value = G);
                N && D && (N.value = D)
            } catch (L) { }
        })
    })
});