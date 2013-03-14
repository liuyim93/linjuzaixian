var TMall = window.TMall || {};
TMall.Head = function () {
    var F = KISSY, V = document;
    var H = !"0"[0], L = H && !window.XMLHttpRequest, N = !!window.ActiveXObject;
    var P = "mouseover", J = "mouseenter", G = "mouseleave";
    var I = ~location.host.indexOf(".net") ? "assets.daily.taobao.net" : "a.tbcdn.cn";
    var E = V.getElementsByTagName("script");
    var D = E[E.length - 1];
    var M = D.src || "";
    var C = M.substring(M.lastIndexOf("?") + 1, M.length);
    var B = "http://" + I + "/apps/tmall/header/shop/header.js?t=" + (C || "20120926");
    var T = "http://www.tmall.com/go/rgn/tmall/cat-nav-asyn.php";
    var A;
    var R = false;
    function U(S) {
        return V.getElementById(S)
    }
    function O(Y, X, W, S) {
        if (!Y) {
            return
        }
        if (Y.addEventListener) {
            Y.addEventListener(X, W, !!S)
        } else {
            if (Y.attachEvent) {
                Y.attachEvent("on" + X, W)
            }
        }
    }
    function Q(Y, X, W, S) {
        if (!Y) {
            return
        }
        if (Y.removeEventListener) {
            Y.removeEventListener(X, W, !!S)
        } else {
            if (Y.detachEvent) {
                Y.detachEvent("on" + X, W)
            }
        }
    }
    var K = function () {
        var S = 0;
        var c, W, f, b, Y;
        function d() {
            setTimeout(function () {
                if (c.value == "") {
                    f.style.visibility = "visible"
                }
            }, 100)
        }
        function X() {
            if (!F.DOM && S < 50) {
                setTimeout(arguments.callee, 200);
                S++;
                return
            }
            TMall.THeader ? TMall.THeader.init() : F.getScript(B, function () {
                TMall.THeader.init()
            });
            Q(A, P, X)
        }
        function a() {
            var h = U("J_shopSearchData");
            var g = !!h ? h.getAttribute("data-shopUrl") : c.getAttribute("data-current");
            O(Y, "click", function () {
                if ("" !== F.trim(c.value)) {
                    W.setAttribute("action", g);
                    Z(W, { search: "y", newHeader_b: "s_from", searcy_type: "item" })
                }
                b.click()
            })
        }
        function e() {
            var g = function () {
                var i = arguments[0] || win.event, h = i.keyCode;
                if (i.shiftKey && (h == 191 || h == 229)) {
                    F.getScript("http://" + I + "/apps/tmall/header/common/quick-search.css", function () {
                        F.getScript("http://" + I + "/apps/tmall/header/common/quick-search.js")
                    });
                    Q(V.body, "keydown", arguments.callee)
                }
            };
            O(V.body, "keydown", g)
        }
        function Z(j, k) {
            function g(i, l) {
                var m = V.createElement("input");
                m.setAttribute("type", "hidden");
                m.setAttribute("name", i);
                m.setAttribute("value", l);
                return m
            }
            for (var h in k) {
                if (!j[h]) {
                    j.appendChild(g(h, k[h]))
                } else {
                    j[h].value = k[h]
                }
            }
        }
        return { init: function () {
            A = U("tmallSearch") || U("mallSearch");
            if (!A) {
                return
            }
            c = U("mq");
            W = c.form;
            f = W.getElementsByTagName("label")[0];
            Y = U("J_CurrShopBtn");
            b = U("J_SearchBtn");
            d();
            O(A, P, X);
            a();
            e();
            R = true
        } 
        }
    } ();
    return { init: function () {
        if (R) {
            return
        }
        F.ready(function () {
            K.init();
            if (L) {
                var S = U("shop-info");
                O(S, J, function () {
                    S.className += " expanded"
                });
                O(S, G, function () {
                    S.className = S.className.replace("expanded", "")
                });
                var W = U("content"), X;
                if (W && ! ~W.className.indexOf("head-expand")) {
                    X = U("hd") || U("shop-hd");
                    if (X && X.offsetHeight && X.offsetHeight > 150) {
                        X.style.height = "150px"
                    }
                }
            }
        })
    } 
    }
} (); 