/*pub-1|2012-03-26 16:31:07*/
(function () {
    CPS = window.CPS || {};
    CPS.trace = function (G) {
        var B, A, I = [],
			F = encodeURIComponent,
			D = document.cookie,
			H = "tk_trace",
			E = "http://trace.cps.taobao.com/cpstrace.php";
        var C = true;
        if (location.hostname.indexOf(".taobao.com") > -1) {
            if (D.indexOf(" " + H + "=") > -1 || D.indexOf(H + "=") === 0) {
                C = true
            } else {
                C = false
            }
        } else {
            C = true
        }
        if (C) {
            for (B in G) {
                if (G.hasOwnProperty(B)) {
                    A = F(G[B]);
                    I.push(B + "=" + A)
                }
            }
            if (I.length > 0) {
                E = E + "?" + I.join("&");
                new Image().src = E
            }
        }
    }
})();