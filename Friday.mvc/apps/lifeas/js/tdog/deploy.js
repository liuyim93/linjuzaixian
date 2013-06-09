/*pub-1|2013-01-28 10:26:22*/
TStart.add("plugin~deploy", function (B) {
    var C = KISSY, A = C.Cookie, D = { pickDomain: function (G, H) {
        H = H || location.hostname;
        var I = ".", F = H.split(I), E = F.length;
        if (E <= 2) {
            return H
        }
        G = G || 1;
        if (G > E - 2) {
            G = E - 2
        }
        return F.slice(G).join(I)
    } 
    };
    C.ready(function (J) {
        B.log("\u5f00\u59cb\u90e8\u7f72\u6dd8\u5b9d\u5de5\u5177\u6761");
        var I = B.Config.DOMAIN == "taobao.com" ? "x" : "otherx", M = location, H = C.merge({ e: 0, p: "*", s: 0, c: 0, f: 0, g: 0, t: 0 }, C.unparam(A.get(I))), L = window.g_config || {}, E = C.unparam(M.search.substring(1)), Q = (L.appId === J) ? -1 : parseInt(L.appId, 10), F = unescape((A.get("_nk_") || "").replace(/\\u/g, "%u")), N = A.get("_l_g_") && F, P = "\u98ce\u6e05\u626c,\u94c1\u6728\u771f,\u900d\u9065\u5b50,\u4e8c\u5f53\u5bb6,\u65e0\u5d16\u5b50,\u4ee4\u72d0\u51b2,\u9b3c\u811a\u4e03,\u6b65\u60ca\u4e91,\u4e0a\u5b98\u71d5,\u963f\u9aa8\u6253,\u957f\u5b59\u6cf0,\u516c\u5b59\u5b8f,\u6b27\u9633\u6e05,\u6b27\u9633\u73e0,\u4e0a\u5b98\u7ea8,\u53e4\u897f\u98ce,\u5954\u96f7\u624b,\u516c\u7f8a\u7fbd", G = D.pickDomain(2), O = function () {
            A.set(I, C.param(H), 365, G, "/")
        }, K = function (T, V) {
            T = encodeURIComponent(T + "");
            if (!(T = C.trim(T))) {
                return false
            }
            var S = 0, U = 0, R = T.length;
            for (; U < R; U++) {
                S += T.charCodeAt(U)
            }
            return S % 10 < V
        };
        H.e = 1;
        H.p = "*";
        O();
        B.init();
        B.loadDPL();
        B.addStyleSheet(B.Config.ASSETS_URL + "main.css");
        C.IO.getScript(B.Config.ASSETS_URL + "main.js");
        B.sendStatistic("1001.0.2")
    })
});
