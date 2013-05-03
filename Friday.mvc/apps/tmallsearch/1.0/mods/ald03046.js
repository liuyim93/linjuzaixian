KISSY.add(V + "/mods/ald03046", function (C) {
    var P = C.DOM,
		M = C.Event,
		A = window,
		Z = document,
		B = C.all,
		T = C.UA.ie == 6,
		Q = C.UA.ie < 9,
		R = C.UA.ie < 8;
    var N = 15,
		O = [4, 5, 6],
		H = function () {
		    var D = (A.g_config.view || 0) !== 0 && !!P.get(".hasAld");
		    return O[A.g_config.view || 0] - (D ? 1 : 0)
		}, K = H(),
		W = P.get("#J_ItemList"),
		I = P.query(".product", W),
		U = function (D) {
		    return Math.min((parseInt(D / K) + 1) * K - 1, I.length - 1)
		}, Y = null,
		L = function (l) {
		    var e = P.get(".productImg", l),
				g = l.lastSku = P.get(".proThumb-selected", l),
				h = g ? P.attr(g, "data-sku") : "",
				m = h ? h.split(":") : [],
				j = m.length ? m[1] : "",
				c = g ? P.get("img", g) : P.get("img", e),
				n = c ? c.src.substring(c.src.lastIndexOf("/") + 1).replace(/(_30x30\.jpg)|(_b\.jpg)/gi, "") : "";
		    if (!l.aldParams) {
		        var i = e.tagName == "A" ? e : P.get("a", e),
					E = P.attr(i, "atpanel"),
					f = (E || "").split(","),
					S = f.length == 8 ? {
					    itemId: f[1],
					    bakCatId: f[2],
					    shopId: f[7]
					} : {
					    itemId: "",
					    bakCatId: "",
					    shopId: ""
					}, b = P.get(".productAttrs", l),
					k = b ? P.query("a", b) : [],
					d = k.length ? k[0].href.match(/[?&]brand=(\d+)\b/i) : [],
					D = d.length ? d[1] : "";
		        l.aldParams = {
		            itemId: S.itemId,
		            catId: S.bakCatId,
		            brandId: D,
		            num: O[O.length - 1],
		            mods: N
		        }
		    }
		    return C.merge(l.aldParams, {
		        imgUrl: n,
		        skuId: j,
		        lastItemId: Y && Y.aldParams ? Y.aldParams.itemId : ""
		    })
		}, X = function (E) {
		    if (!A.ALD) {
		        C.getScript(ALD_INIT_JS_URL, function () {
		            X(E)
		        })
		    } else {
		        var D = "03046";
		        ALD.load(D, function (a) {
		            var b = {
		                params: L(E),
		                render: E.ald,
		                appId: D,
		                effect: "tab",
		                extra: {
		                    atpanel: "{idx},{itemId},,,item,1,,{shopId}"
		                }
		            };
		            ALD.util.mockup(b);
		            var S = new a(b);
		            !S.on && C.mix(S, C.EventTarget);
		            S.on("ald-" + b.appId + "Rendered", function (c) {
		                if (!!C.trim(P.html(P.get(".ald-03046", E.ald)))) {
		                    E.slideHeight = E.aldHeight
		                } else {
		                    E.slideHeight = 0
		                }
		                E.slideDown()
		            });
		            ALD.request(b, function (c, d) {
		                S.setData(c);
		                S.exec();
		                E.innerCssFix()
		            })
		        })
		    }
		}, G = {
		    aldHeight: 436,
		    vOffset: 0,
		    insertAldContainer: function () {
		        if (this.hasAldContainer) {
		            return
		        }
		        var D = this,
					E = this.vOffset = (function (S) {
					    return (P.offset(D.container).top - P.offset(D).top) + (P.outerHeight(D.container) - P.outerHeight(D)) + S
					})(25);
		        P.append(D.ald, D.container);
		        P.css(D.ald, {
		            display: "none",
		            clear: "both",
		            height: D.aldHeight,
		            position: "absolute",
		            top: P.outerHeight(D) + E,
		            minWidth: 1024
		        });
		        D.wrapperCssFix();
		        D.hasAldContainer = true
		    },
		    scrollIntoView: function () {
		        var E = (P.offset(I[this.refIdx]).top + P.outerHeight(I[this.refIdx]) - P.scrollTop(A)),
					D = P.viewportHeight(),
					e = Math.ceil((D - this.aldHeight) / 2),
					S = (E += (!!Y && Y.refIdx < this.refIdx) ? 0 : this.aldHeight) > D ? E + e - D : 0;
		        S && C.Anim(A, {
		            scrollTop: P.scrollTop(A) + S
		        }, {
		            queue: false
		        }).run()
		    },
		    slideDown: function () {
		        this.toggle = true;
		        P.addClass(this, "product-hover");
		        T && (this.disableHoverOut = true);
		        if (!!Y && Y !== this) {
		            P.removeClass(Y, "product-hover");
		            T && (Y.disableHoverOut = false)
		        }
		        if (Q) {
		            !!Y && (Y.refIdx !== this.refIdx) && (I[Y.refIdx].style.marginBottom = 0);
		            I[this.refIdx].style.marginBottom = (this.slideHeight || 0) + this.vOffset + "px";
		            this.ald.style.height = (this.slideHeight || 0) + "px";
		            this.ald.style.display = ""
		        } else {
		            !!Y && (Y.refIdx !== this.refIdx) && C.Anim(I[Y.refIdx], {
		                marginBottom: 0
		            }).run();
		            C.Anim(I[this.refIdx], {
		                marginBottom: (this.slideHeight || 0) + this.vOffset
		            }, 1, "easeOut").run(); !!this.slideHeight && B(this.ald).slideDown(1)
		        } !this.slideHeight && P.css(this.ald, {
		            display: "none"
		        });
		        Y = this
		    },
		    slideUp: function () {
		        this.toggle = false;
		        P.removeClass(this, "product-hover");
		        T && M.on(this, "mouseleave", function (S) {
		            var a = this._events.mouseleave;
		            for (var E = 0, D = a.length; E < D; E++) {
		                a[E].call(this)
		            }
		        });
		        if (Q) {
		            (!Y || Y == this) && (I[this.refIdx].style.marginBottom = "0px");
		            this.ald.style.height = "0px";
		            this.ald.style.display = "none"
		        } else {
		            (!Y || Y == this) && C.Anim(I[this.refIdx], {
		                marginBottom: 0
		            }, 1.2, "easeOut").run();
		            B(this.ald).slideUp(1)
		        }
		        Y = null
		    },
		    fadeIn: function () {
		        this.toggle = true;
		        B(this.ald).fadeIn(1)
		    },
		    fadeOut: function () {
		        this.toggle = false;
		        B(this.ald).fadeOut(1)
		    },
		    wrapperCssFix: function () {
		        P.css(this.ald, {
		            marginLeft: -P.offset(this).left - 5,
		            width: P.viewportWidth()
		        })
		    },
		    innerCssFix: function () {
		        P.css(P.get(".ald-inner", this), {
		            width: P.innerWidth(W)
		        });
		        P.css(P.get(".ald-arrow", this), {
		            left: (this.idx % K + 0.5) * P.outerWidth(this, true)
		        })
		    }
		}, J = function () {
		    LIST.msg.on("viewchange", function (S) {
		        K = H();
		        var E, D;
		        if (Y) {
		            E = I[Y.refIdx];
		            C.log("ref:" + Y.refIdx);
		            D = P.css(E, "marginBottom");
		            P.css(E, "marginBottom", "0")
		        }
		        C.log("width:" + P.viewportWidth() + " |" + P.innerWidth(W));
		        I.each(function (b, a) {
		            b.refIdx = U(a);
		            b.innerCssFix()
		        });
		        if (Y) {
		            E = I[Y.refIdx];
		            C.log("refIdx:" + Y.refIdx);
		            P.css(E, "marginBottom", D)
		        }
		    });
		    M.on(A, "resize", function (D) {
		        Y && Y.wrapperCssFix()
		    })
		};

    function F(E, S) {
        function D() {
            C.use(V + "/widget/featureguider", function (a, b) {
                S(b.create(E))
            })
        }
        if (!/showGuider=1/.test(location.href) && E && E.id) {
            C.use(V + "/widget/local-storage", function (b, c) {
                if (!c.getItem("ts_fg_" + E.id)) {
                    var a = E && E.onHide;
                    E.onHide = function () {
                        c.setItem("ts_fg_" + E.id, b.now());
                        a()
                    };
                    D()
                }
            })
        } else {
            D()
        }
    }
    return {
        init: function () {
            var D = this;
            C.ready(function () {
                if (!P.get(".j_MoreSimilar")) {
                    return
                }
                P.addStyleSheet(".j_SimilarRec .ald-03046{background:#EEEEEB;border:1px solid #dcdbda;box-shadow:inset 1px 1px 3px #E6E5E6;}.ald-03046 .ald-inner .ald-itemlist li{_display:inline;margin-left:8px;margin-right:8px;}");
                var a = function (g, d) {
                    var c = d.collapseAnim,
						f = P.get(".proThumb-selected", g); !!Y && Y != g && Y.toggle && a(Y, {
						    collapseAnim: "fadeOut"
						});
                    if (!g.toggle) {
                        g.scrollIntoView();
                        if (g.lastSku !== f) {
                            g.insertAldContainer();
                            X(g)
                        } else {
                            if (g.slideHeight) {
                                g.wrapperCssFix()
                            }
                            g.slideDown()
                        }
                    } else {
                        if (c == "fadeOut") {
                            g.fadeOut()
                        } else {
                            g.slideUp()
                        }
                    }
                    g.similarBtn.expandSwitchFn()
                };
                I.each(function (d, c) {
                    C.mix(d, C.merge(G, {
                        ald: P.create('<div class="j_SimilarRec">'),
                        container: P.children(d, "div"),
                        idx: c,
                        refIdx: U(c)
                    }));
                    LIST.msg.fire("expand", {
                        el: d.similarBtn = P.get(".j_MoreSimilar", d),
                        text: {
                            drop: "\u67e5\u770b\u76f8\u4f3c\u5546\u54c1 ",
                            expand: "\u6536\u8d77\u76f8\u4f3c\u5546\u54c1 "
                        },
                        debounce: {
                            threshold: 500,
                            execAsap: true
                        },
                        manual: true
                    });
                    M.delegate(d, "click", ".j_MoreSimilar", function (f) {
                        a(this, f);
                        f.preventDefault()
                    } .debounce(500, true), d);
                    M.delegate(d, "click", ".proThumb-img", function (g) {
                        var f = this,
							h = g.target;
                        if (!!Y && Y.toggle) {
                            if (Y != f) {
                                a(f, g)
                            } else {
                                if (f.lastSku !== h) {
                                    X(f)
                                }
                            }
                        }
                    } .debounce(500, true))
                });
                var S = function (c, d) {
                    return P.hasClass(c, d) || P.parent(c, "." + d)
                };
                M.on(Z.body, "click", function (d) {
                    var c = d.target;
                    if (!S(c, "j_MoreSimilar") && !S(c, "proThumb-img") && !S(c, "j_SimilarRec") && Y && Y.toggle) {
                        a(Y, d)
                    }
                });
                J();
                R && P.append(P.create('<div style="clear:both;">'), W);
                var E = P.get(".j_MoreSimilar"),
					b = P.parent(E, ".product");
                LIST.util.bindScrollAsync(E, function () {
                    F({
                        type: "image",
                        id: "moreSimilar_01",
                        imgSrc: "http://img03.taobaocdn.com/tps/i3/T1Ox.7XllhXXaIgN7P-230-159.png",
                        closeArea: {
                            coords: "80,117,149,140"
                        },
                        size: {
                            x: 230,
                            y: 159
                        },
                        anchor: {
                            x: 19,
                            y: 150
                        },
                        lazy: true,
                        spotLight: false,
                        onShow: function () {
                            P.addClass(b, "product-hover");
                            T && (b.disableHoverOut = true)
                        },
                        onHide: function () {
                            P.removeClass(b, "product-hover");
                            T && (b.disableHoverOut = false);
                            M.detach(A, "resize", E._fgShowFn)
                        }
                    }, function (d) {
                        function c() {
                            d.showAt(E, {
                                x: 150,
                                y: 13
                            })
                        }
                        c();
                        M.on(A, "resize", E._fgShowFn = c.debounce(100, true))
                    })
                }, 200, true)
            })
        }
    }
});