KISSY.add(V + "/mods/crumb", function (j, g, w) {
    var s = j.DOM,
		q = j.Event,
		G = document,
		i = window,
		x = j.UA.ie == 6,
		r = s.get("#J_CrumbSlide"),
		o = s.get("#J_CrumbSlideCon"),
		l = s.get("#J_CrumbSlidePrev"),
		z = s.get("#J_CrumbSlideNext"),
		f = function () {
		    return s.innerWidth(r)
		}, v = f(),
		b = s.get("#J_CrumbSearchInuput"),
		h = s.get("#J_CrumbSearchBtn"),
		k = s.get("#J_CrumbSearchForm"),
		u = "crumbDrop-hover",
		e = s.get("#J_MallNavMore"),
		d = s.get("#J_MallNavHover"),
		p = "mm-menu-hover",
		t = ["\u5728\u672c\u5e97\u641c\u7d22", "\u5728\u5f53\u524d\u6761\u4ef6\u4e0b\u641c\u7d22"],
		B = ".crumbSearch",
		F = ".crumbAttr",
		y = ".crumbArrow",
		n = s.get(B),
		C = s.parent(B),
		a = s.get(F),
		m = true;

    function c() {
        if (!(this instanceof c)) {
            return new c()
        }
        this.searchType = s.attr(b, "data-type") || null;
        this.liWidth = 0;
        this.offsetLeft = 0;
        this.aWidth = 5;
        this.anim = null;
        this._init()
    }
    j.augment(c, j.EventTarget, {
        _init: function () {
            var A = this;
            if (!o) {
                return
            }
            if (b.value == "") {
                b.value = this.searchType == "s" ? t[0] : t[1]
            }
            j.each(s.query("li", o), function (D) {
                A.liWidth += s.outerWidth(D, true)
            });
            j.log(A.liWidth);
            A._bindEvent();
            A._setBtnType();
            A._resetListPos(true)
        },
        _bindEvent: function () {
            var D = this;
            q.on(h, "click", function (H) {
                var H = H || i.event;
                H.stopPropagation || (H.cancelBubble = true)
            });
            if (e) {
                q.on(e, "mouseenter", function () {
                    s.addClass(this, p);
                    s.show(d)
                });
                q.on(e, "mouseleave", function () {
                    s.removeClass(this, p);
                    s.hide(d)
                })
            }
            var A = this.searchType == "s" ? t[0] : t[1],
				E = s.val(b);
            q.on(b, "focus", function () {
                s.addClass([this, this.parentNode], "focus");
                if (s.val(this) == A) {
                    s.val(this, "")
                } else {
                    this.select()
                }
            });
            q.on(b, "blur", function () {
                s.removeClass([this, this.parentNode], "focus");
                if (s.val(this) == "") {
                    s.val(this, A)
                }
            });
            q.on(k, "submit", function (H) {
                var I = j.trim(s.val(b));
                if (I == A) {
                    s.val(b, "")
                } else {
                    if (I == E) {
                        H.halt()
                    }
                }
            });
            q.on(G.body, "click", function (I) {
                var J = s.val(b),
					H = I.target;
                if (J && J != E && H.id != h.id && H.id != b.id) {
                    s.val(b, E)
                }
            });
            q.on([l, z], "click", function (H) {
                H.halt();
                D._resetListPos(false, true)
            });
            LIST.msg.fire("ie6Hover", {
                classname: ["crumbAttr", "mallNav-more", "crumbSearch-btn"]
            });
            LIST.msg.fire("ie6Hover", {
                id: "mallCate",
                hoverCls: "hover"
            });
            LIST.msg.on("viewchange", function (H) {
                v = f();
                D._resetListPos()
            });
            D._dropdown()
        },
        _setBtnType: function () {
            var A = this;
            l.style.visibility = z.style.visibility = "hidden";
            if (A.liWidth <= v) {
                !m && A._crumbAnim();
                m = true;
                return
            }
            var D = parseInt(s.css(o, "left"));
            (D !== 0) && (l.style.visibility = "visible");
            (D === 0) && (z.style.visibility = "visible")
        },
        _resetListPos: function (K, M, I) {
            var L = this,
				D = L.anim,
				A = parseInt(s.css(o, "left")),
				E = L.liWidth - v,
				H = Math.min(-E, 0),
				H = M ? (A == 0 ? -E : 0) : H,
				H = H + (I || 0),
				J = (A == H) ? true : false;
            if (J) {
                L._setBtnType.call(L);
                return
            }
            if (K) {
                s.css(o, {
                    left: H + "px"
                });
                L._setBtnType.call(L);
                return
            }
            time = (time = Math.abs(H / 400)) == 0 ? 0.1 : time;
            if (D) {
                D.stop()
            }
            L.anim = j.Anim(o, {
                left: H + "px"
            }, time, "easeOutStrong", function () {
                L._setBtnType.call(L)
            });
            L.anim.run()
        },
        _dropdown: function () {
            var D = this,
				E = '{{#each data as val idx}}{{#if idx%6 == 0}}<ul>{{/if}}<li><a {{#if idx == 0}}class="crumbDrop-disable"{{/if}} atpanel="{{val.atp}}" href="{{val.href}}" title="{{val.title}}">{{val.title}}</a></li>{{#if idx%6 == 5}}</ul>{{/if}}{{/each}}',
				A = null;
            s.query(".j_CrumbDrop", o).each(function (K) {
                var J = s.get(".j_CrumbDropHd", K),
					I = s.get(".j_CrumbDropBd", K),
					H = function (Q) {
					    var P = {
					        href: "javascript:;",
					        title: J.text || J.textContent || J.innerText,
					        atp: "0,cat-dropdown,,,," + (J.search.match(/\bcat=\d+/) || [""])[0] + ",rightnav,"
					    };
					    Q.unshift(P);
					    s.html(I, g(E).render({
					        data: Q
					    }))
					}, O = function (P, Q) {
					    var T = s.outerWidth(P),
							U = s.innerWidth(Q),
							R = s.offset(P).left,
							W = s.offset(Q).left;
					    var S = 0;
					    if (T <= U) {
					        S = Math.max(W - R, 0) || Math.min((W + U) - (R + T), 0)
					    } else { }
					    S && D._resetListPos(false, false, S)
					}, N = function (P) {
					    if (K.hover) {
					        s.addClass(K, u);
					        O(J, r);
					        var R = I.step || (I.step = s.outerWidth(s.get("ul", I))),
								Q = s.offset(r).left + v - s.offset(J).left;
					        P = Math.min(Math.floor(Q / R), P);
					        I._initWidth = P * R || I._initWidth || Q;
					        s.css(I, "width", I._initWidth);
					        A = K
					    }
					}, M = function (P) {
					    P.hover = false;
					    s.removeClass(P, u);
					    A = null
					}, L = "/ajax/getAllBrotherCats.htm" + J.search;
                if (I) {
                    j.UA.ie == 7 && J.setAttribute("hideFocus", "true");
                    q.on(s.get("i", K), "click", function (P) {
                        if (!K.hover) {
                            K.hover = true;
                            A && M(A);
                            if (!!I.rendered) {
                                N()
                            } else {
                                j.io.get(L, {
                                    t: x ? +new Date : 0
                                }, function (Q) {
                                    if (Q && Q.length) {
                                        H(Q);
                                        N(Math.ceil(Q.length / 6))
                                    } else {
                                        s.hide(I);
                                        N()
                                    }
                                    I.rendered = true
                                }, "json")
                            }
                        } else {
                            M(K)
                        }
                        P.preventDefault()
                    });
                    q.on(I, "mouseleave", function (P) {
                        j.later(function () {
                            M(K)
                        }, 300)
                    })
                }
            })
        },
        _crumbAnim: function () {
            var E = false,
				A = 0,
				D = s.query("li", C);
            D.each(function (H) {
                A += H.offsetWidth;

                function I() {
                    if (H.className.indexOf("crumbSearch") === -1 && E) {
                        s.hide(H);
                        s.css(H, "opacity", "0")
                    }
                }
                a ? H.className.indexOf("crumbAttr") > -1 && (s.hide(H), s.css(H, "opacity", "0")) : I();
                E = true
            });
            s.hide(s.prev(n));
            s.css(n, {
                position: "absolute",
                left: n.offsetLeft,
                visibility: "visible"
            });
            w(B, {
                left: A - n.offsetWidth + (a ? 10 : 0)
            }, 0.6, "easeNone", function () {
                D.each(function (H) {
                    s.show(H);
                    s.css([s.get("a", H), s.get(y, H)], {
                        visibility: "visible"
                    });
                    w(H, {
                        opacity: "1"
                    }, 1, "easeNone", undefined).run()
                })
            }).run()
        }
    });
    return {
        init: function () {
            new c()
        }
    }
}, {
    requires: ["template", "anim"]
}); 