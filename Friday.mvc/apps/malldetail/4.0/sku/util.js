KISSY.add("malldetail/sku/util", function (E) {
    var B = E.mods.SKU, F = KISSY, H = F.UA, L = F.DOM, G = window;
    function I(M) {
        while (M.lastChild) {
            M.removeChild(M.lastChild)
        }
    }
    function D(M) {
        alert(M);
        return false
    }
    function J(P, N, M) {
        var O = "http://asyncwebserver.monitor.taobao.com/item?";
        var Q = ["src=" + P, "type=" + N, "rq=" + encodeURIComponent(M), "t=" + (+new Date())];
        new Image().src = O + (O.lastIndexOf("?") != -1 ? "&" : "?") + Q.join("&")
    }
    function C(M, O) {
        var N = F.get(M);
        this.ele = N ? N : null;
        var O = (typeof O == "undefined") ? 3 : O;
        this.app = { init: O };
        this.curstatu = O
    }
    F.augment(C, { getStatu: function () {
        return this.curstatu
    }, statu: function (M, Q) {
        if (!this.ele) {
            return
        }
        var N = this;
        var P = null;
        var R = { show: 3, hide: 2, disabled: 1, enabled: 3 };
        var O = ["tb-hidden", "noPost"];
        function S() {
            var T;
            var U = 0;
            for (var V in N.app) {
                if (U > 0) {
                    T = T & N.app[V]
                } else {
                    T = N.app[V]
                }
                U++
            }
            return T
        }
        this.app[M] = R[Q];
        if (P) {
            clearTimeout(P)
        }
        P = setTimeout(function () {
            var U = S();
            if (U != N.curstatu) {
                var T = N.curstatu & parseInt(1, 2);
                var W = N.curstatu & parseInt(10, 2);
                var Y = U & parseInt(1, 2);
                var X = U & parseInt(10, 2);
                if (T !== Y) {
                    var V = L.parent(N.ele);
                    if (Y == 1) {
                        if (V) {
                            L.removeClass(V, "tb-hidden")
                        }
                    } else {
                        if (Y == 0) {
                            if (V) {
                                L.addClass(V, "tb-hidden")
                            }
                        }
                    }
                }
                if (W !== X) {
                    if (X == 2) {
                        L.removeClass(N.ele, "noPost")
                    } else {
                        L.addClass(N.ele, "noPost")
                    }
                }
                N.curstatu = U
            }
        }, 100)
    } 
    });
    function A(N) {
        var M = E.cfg("url").tbskip + "/json/get_tb_ck_ps.htm";
        F.use("cookie", function (P, O) {
            O = O || P.Cookie;
            var Q = O.get("t") || E.cfg("valCT");
            P.getScript(E.addTimeStamp(M) + "&varName=TB.Detail.TrackID", { success: function () {
                if (typeof TB.Detail.TrackID === "undefined") {
                    return N(Q)
                }
                E.cfg("valCartInfo").ct = TB.Detail.TrackID.ct;
                N(TB.Detail.TrackID.ct);
                delete TB.Detail.TrackID;
                E.flush()
            }, error: function () {
                N(Q)
            }, timeout: 100
            })
        })
    }
    function K(O, N) {
        if (O.indexOf("-") > -1) {
            return O
        }
        if (typeof O != "object") {
            O = new Date(parseInt(O))
        }
        N = N || "yyyy-MM-dd hh:mm:ss";
        var P = { "M+": O.getMonth() + 1, "d+": O.getDate(), "h+": O.getHours(), "m+": O.getMinutes(), "s+": O.getSeconds(), "q+": Math.floor((O.getMonth() + 3) / 3), S: O.getMilliseconds() };
        if (/(y+)/.test(N)) {
            N = N.replace(RegExp.$1, (O.getFullYear() + "").substr(4 - RegExp.$1.length))
        }
        for (var M in P) {
            if (new RegExp("(" + M + ")").test(N)) {
                N = N.replace(RegExp.$1, RegExp.$1.length == 1 ? P[M] : ("00" + P[M]).substr(("" + P[M]).length))
            }
        }
        return N
    }
    B.Util = function () {
        return { halt: D, clearNodes: I, monitorBuyServer: J, BuyLinkStatu: C, getTrackID: A, formatDate: K }
    } ()
}, { requires: [] }); /*pub-1|2013-02-20 11:13:13*/