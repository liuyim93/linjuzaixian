(function (F, H, L) {
    var A = F.DOM,
		M = F.Event,
		K = F.get("#J_CoreJs"),
		I = A.attr(K, "data-type") || "",
		C = F.UA.ie == 6,
		B = "ontouchstart" in document;
    F.log("start init ... | page-type :" + I);
    Function.prototype.debounce = function (D, E) {
        var O = this,
			P;
        return function N() {
            var S = this,
				R = arguments;

            function Q() {
                if (!E) {
                    O.apply(S, R)
                }
                P = null
            }
            if (P) {
                clearTimeout(P)
            } else {
                if (E) {
                    O.apply(S, R)
                }
            }
            P = setTimeout(Q, D || 100)
        }
    };

    function G() {
        var D = "no-touch";
        if (B) {
            A.removeClass("body", D)
        } else {
            A.addClass("body", D)
        }
        G = function () { }
    }
    function J(D, P, E) {
        G();
        E = E || "hover";
        if (B || C) {
            P = C ? "mouse" : (P || "click");

            function O(S) {
                if (this.disableHoverIn) {
                    return
                }
                A.addClass(this, E)
            }
            function N(S) {
                if (this.disableHoverOut) {
                    return
                }
                A.removeClass(this, E)
            }
            var R = null;
            switch (P) {
                case "mouse":
                    R = function () {
                        M.on(this, "mouseenter", O);
                        M.on(this, "mouseleave", N)
                    };
                    break;
                case "click":
                    var Q = this;
                    pool = Q._hoverPool || (Q._hoverPool = []);
                    R = function () {
                        var S = this;
                        M.on(this, "mousedown touchstart", function (T) {
                            S._hoverCls = E;
                            pool[pool.length] = S;
                            O.call(S, T)
                        })
                    };
                    !this._bundDefHover4Doc && (M.on(L, "mousedown touchstart", function (X) {
                        var U = X.target;
                        for (var T = 0, S = pool.length; T < S; T++) {
                            var W = pool[T];
                            !(W == U || A.contains(W, U)) && (A.removeClass(W, W._hoverCls), pool.splice(T, 1), T--, S--)
                        }
                    }), this._bundDefHover4Doc = true);
                    break;
                default:
                    R = function () {
                        M.on(this, "touchstart", O);
                        M.on(this, "touchend", N)
                    }
            }
            F.log("bind hover events for ie6 or pad!");
            A.query(D).each(function (S) {
                if (C && S.tagName == "A") {
                    return
                }
                R.call(S)
            })
        }
    }
    LIST.msg.on("ie6Hover", function (Q) {
        var P = Q.classname,
			R = Q.id,
			D = P || R,
			O = R ? "#" : ".",
			E = Q.hoverType;
        if (!(D && (B || C))) {
            return
        }
        var N = function (T, S) {
            var U = ((S && Q.hoverCls) ? Q.hoverCls[S] : Q.hoverCls) || (T + "-hover");
            J(O + T, E, U)
        };
        if (F.isString(D)) {
            N(D)
        } else {
            if (F.isArray(D)) {
                F.each(D, function (T, S) {
                    N(T, S)
                })
            }
        }
    });
    LIST.msg.on("expand", function (Q) {
        var P = Q.el || null,
			D = Q.classname || "",
			N = D + "-expand",
			R = Q.text || {
			    drop: "\u66f4\u591a",
			    expand: "\u6536\u8d77"
			}, E = Q.status || "drop",
			S = Q.debounce || {
			    threshold: 100,
			    execAsap: true
			}, O = Q.manual;
        if (!P) {
            return
        }
        P.expandSwitchFn = function () {
            var T = A.attr(this, "data-status") || "drop",
				X = R[T],
				U = T == "drop" ? "expand" : "drop",
				W = R[U],
				Y = A.parent(this, "." + D);
            this.className = this.className.replace(T, U);
            this.innerHTML = this.innerHTML.replace(X, W);
            this.innerHTML = this.innerHTML.replace(T, U);
            A.attr(this, "data-status", U);
            T == "drop" ? A.addClass(Y, N) : A.removeClass(Y, N)
        };
        !O && M.on(P, "click", P.expandSwitchFn.debounce(S.threshold, S.execAsap));
        if (E !== (A.attr(P, "data-status") || "drop")) {
            P.expandSwitchFn()
        }
    });
    LIST.util.bindScrollAsync = function (E, P, N, O) {
        if (!(E && "function" === typeof P)) {
            return
        }
        E = A.query(E);
        if (!E.length) {
            return
        }
        var D = function (U) {
            var Z = A.viewportHeight(),
				Y = "number" === typeof N ? N : 0,
				T = E.length;
            if (!T) {
                M.detach(H, "scroll", D);
                return
            }
            for (var Q = 0; Q < T; Q++) {
                var X = A.scrollTop(),
					W = A.offset(E[Q]),
					S = W.top || 0,
					R = Z + Y + X;
                if (R >= S) {
                    F.log("Send scroll async request...");
                    P.call(E[Q]);
                    E.splice(Q--, 1);
                    T = E.length
                }
            }
        }; !!O && D();
        M.on(H, "scroll", D)
    };
    LIST.util.exposureFn = function (E) {
        var D = new Image(),
			N = "_img_" + Math.random();
        H[N] = D;
        D.onload = D.onerror = function () {
            H[N] = null
        };
        D.src = E;
        D = null
    };
    if (I == "spu") {
        F.use(V + "/spu/spu")
    } else {
        if (I == "list") {
            F.use(V + "/list")
        } else {
            if (I == "shop") {
                F.use(V + "/shop")
            } else {
                if (I == "shopItem") {
                    F.use(V + "/shop-item")
                }
            }
        }
    }
    F.ready(function (N) {
        var D = L.documentElement,
			E = "scroll:" + D.scrollWidth + "*" + D.scrollHeight + "-";
        E += "client:" + D.clientWidth + "*" + D.clientHeight + "-";
        E += "offset:" + D.offsetWidth + "*" + D.offsetHeight + "-";
        E += "screen:" + screen.width + "*" + screen.height;
        N.Cookie.set("res", E);
        N.later(function () {
            var P = {
                "id:7": "tmallsearch"
            };
            if (P["id:" + H.g_config.appId]) {
                N.getScript("http://a.tbcdn.cn/apps/tmall/mui/backtop/js/backtop.js");
                (function O() {
                    var S = "http://ur.taobao.com/survey/view.htm?id=187",
						R = '<a href="' + S + '" class="ui-feed" target="_blank"></a>',
						W, T = A.create(R);
                    A.append(T, "body");
                    if (C) {
                        var Q = function () {
                            var X = A.scrollTop(H) + A.viewportHeight() - 320;
                            A.css(T, "top", X);
                            A.show(T)
                        }, U = N.buffer(Q, 100);
                        Q();
                        M.on(H, "scroll", function () {
                            A.hide(T);
                            U()
                        })
                    }
                })()
            }
        }, 500)
    })
})(KISSY, window, document);