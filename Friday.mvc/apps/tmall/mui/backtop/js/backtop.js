/*pub-1|2013-01-17 17:47:50*/
(function (K, J, N) {
    var Q = J.Event,
		B = J.DOM,
		C = J.Anim,
		L = J.UA.ie && J.UA.ie < 9,
		I = L && J.UA.ie == 6,
		P = "J_ScrollTopBtn",
		F = "ui-scrolltop-hidden";

    function O(D) {
        var A = N.getElementsByTagName("script"),
			S = A[A.length - 1].src || "",
			E = new RegExp("\\?(?:.+&)?" + D + "=([^&]*)(&|$)", "i"),
			R = S.match(E);
        return (R != null) ? unescape(R[1]) : null
    }
    function M(R) {
        var A = N.getElementsByTagName("script"),
			D = A[A.length - 1],
			E = D.getAttribute("data-st-" + R);
        return E ? E : O(R)
    }
    var H = {
        bottom: 200,
        right: 10,
        height: "60px",
        width: "60px",
        baseLine: 400,
        isAnim: false,
        type: 1
    }, G = {
        scrollEl: null,
        getValue: function () {
            return K.pageYOffset || N.body.scrollTop || N.documentElement.scrollTop
        },
        updateValue: function (D, A, R, E) {
            K.scrollTo(0, -R * (D /= E) * (D - 2) + A)
        },
        scrollTop: function (V) {
            var A = this,
				S = A.getValue(),
				U = null,
				D = 5,
				T = 0,
				E = 0,
				R = parseInt(S / 150);
            if (V !== S) {
                E = V - S;
                U = setInterval(function () {
                    if (T <= R) {
                        A.updateValue(T, S, E, R);
                        T++
                    } else {
                        clearInterval(U)
                    }
                }, D)
            }
        },
        addCss: function () {
            var A = ".ui-scrolltop{ display:block; position:fixed; _position:absolute; right:10px; bottom:200px; z-index: 9999; height:60px; width:60px; text-indent:-999999px; overflow: hidden; background:#000 url(http://localhost:7525/Images/up.png) 18px 21px no-repeat; *background-image:url(http://localhost:7525/Images/backtop.png);opacity:0.5; filter:alpha(opacity=50); cursor: pointer; -moz-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -webkit-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -o-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  transition: opacity 0.3s ease-in,opacity 0.3s ease-out; } .ui-scrolltop:hover{ opacity:1; filter:alpha(opacity=100); -moz-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -webkit-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -o-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  transition: opacity 0.3s ease-in,opacity 0.3s ease-out; } .ui-scrolltop-hidden{ visibility: hidden; _visibility:visible;_display:none;opacity:0; filter:alpha(opacity=0); -moz-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -webkit-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -o-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  transition: opacity 0.3s ease-in,opacity 0.3s ease-out; }.ui-scrolltop-wb{ background-position:-25px 21px; background-color:#fff; }";
            return A
        },
        createEl: function () {
            var D = this,
				E = D.addCss(),
				A = '<a id="' + P + '" class="ui-scrolltop ui-scrolltop-hidden ' + (H.type == 2 ? "ui-scrolltop-wb" : "") + '" title="\u8fd4\u56de\u9876\u90e8">\u8fd4\u56de\u9876\u90e8</a>';
            el = B.create(A);
            B.addStyleSheet(E);
            B.append(el, "body");
            return el
        },
        bindEvent: function () {
            var D = this,
				R = D.scrollEl,
				A = H,
				E = A.baseLine;
            if (!R) {
                return
            }
            Q.on(R, "click", function (T) {
                T.preventDefault();
                if (I) {
                    B.addClass(R, F)
                }
                A.isAnim ? D.scrollTop(0) : K.scrollTo(0, 0)
            });
            Q.on(K, "scroll", S);
            if (L) {
                Q.on(R, "mouseenter", function () {
                    C(R, {
                        opacity: "1"
                    }, 0.2).run()
                });
                Q.on(R, "mouseleave", function () {
                    C(R, {
                        opacity: ".5"
                    }, 0.2).run()
                })
            }
            function S() {
                var T = B.hasClass(R, F),
					W = parseInt(B.scrollTop(N));
                if (W > E && T) {
                    if (L) {
                        C(R, {
                            opacity: "0.5"
                        }, 0.2).run()
                    }
                    B.removeClass(R, F)
                } else {
                    if (W < E && !T) {
                        if (L) {
                            C(R, {
                                opacity: "0"
                            }, 0.2).run()
                        }
                        B.addClass(R, F)
                    }
                }
                if (I) {
                    var U = B.viewportHeight(N),
						V = (W + U) - A.bottom - B.height(R);
                    B.css(R, "top", V)
                }
            }
        },
        init: function (A) {
            if (J.get("#" + P)) {
                return
            }
            var D = this,
				E = M("type"),
				R = M("anim");
            if (E) {
                H.type = E
            }
            if (R) {
                H.isAnim = R
            }
            D.scrollEl = D.createEl();
            D.bindEvent()
        }
    };
    J.ready(function () {
        G.init()
    })
})(window, KISSY, document);