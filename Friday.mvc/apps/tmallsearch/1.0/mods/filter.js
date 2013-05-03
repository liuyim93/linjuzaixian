KISSY.add(V + "/mods/filter", function (J, Y) {
    var R = J.DOM,
		Q = J.Event,
		i = document,
		I = window,
		W = J.UA.ie == 6,
		d = J.get(".main"),
		K = J.get("#J_Filter"),
		G = J.get("#J_FForm"),
		P = "filter-fix",
		M = J.get("#J_FPrice"),
		C = J.query(".j_FPInput"),
		U = J.get("#J_FPEnter"),
		F = J.get("#J_FPCancel"),
		H = "fPrice-hover",
		Z = J.get("#J_FOriginArea"),
		O = J.get("#J_FOAInput"),
		b = J.get("form", Z),
		a = J.get("button", Z),
		e = J.get("#J_FDestArea"),
		B = J.get("#J_DestAreaForm"),
		g = "fA-text",
		T = "fA-list",
		A = "fAll-cities",
		L = "fAl-cur",
		N = "fAll-cities-cur",
		c = new Y(),
		h = J.get("#J_FMenu"),
		X = J.get(".j_FMcExpand");

    function f() {
        if (!(this instanceof f)) {
            return new f()
        }
        this.isPriceFocus = false;
        this._init()
    }
    J.augment(f, J.EventTarget, {
        _init: function () {
            if (!K) {
                return
            }
            LIST.msg.fire("ie6Hover", {
                classname: ["fArea", "fRange"]
            });
            this._priceInit();
            this._priceEvent();
            this._originAreaEvent();
            this._destAreaInit();
            this._destAreaEvent();
            this._menuInit();
            this._menuEvent();
            this._fix();
            this._tipCtrl(true);
            this._disctOpts()
        },
        _priceInit: function () {
            var D = function (E, k) {
                var j = location.search,
					S = j.match(new RegExp("\\b" + k + "=(\\d+)\\b"));
                S && (E.value = S[1])
            };
            D(C[0], "start_price");
            D(C[1], "end_price")
        },
        _priceEvent: function () {
            if (!M) {
                return
            }
            var D = this,
				E = null;
            Q.on(C, "blur", function () {
                E = setTimeout(function () {
                    D.isPriceFocus = false;
                    R.removeClass(M, H)
                }, 300)
            });
            Q.on(C, "focus", function () {
                clearTimeout(E);
                D.isPriceFocus = true;
                R.addClass(M, H)
            });
            Q.on(C, "keyup", function () {
                var S = this.value;
                if (!/^\d+\.?\d*$/.test(S)) {
                    S = Math.abs(parseFloat(S));
                    this.value = isNaN(S) ? "" : S
                }
            });
            Q.on(U, "click", function (S) {
                G.submit();
                J.log(G);
                S.preventDefault()
            });
            Q.on(F, "click", function (S) {
                R.val(C, "");
                C[0].focus();
                S.preventDefault()
            });
            Q.on(K, "keypress", function (S) {
                if (S.keyCode == 13 && D.isPriceFocus) {
                    G.submit()
                }
            })
        },
        _originAreaEvent: function () {
            if (!O) {
                return
            }
            var D = R.attr(O, "data-val") || "";
            if (O.value == "") {
                O.value = D
            }
            Q.on(O, "focus", function () {
                if (O.value == D) {
                    O.value = ""
                }
            });
            Q.on(O, "blur", function () {
                if (O.value == "") {
                    O.value = D
                }
            });
            Q.on(J.query("a", Z), "click", function (E) {
                E.preventDefault();
                var S = R.attr(this, "data-val") || R.html(this);
                O.value = S == "\u6240\u6709\u5730\u533a" ? "" : S;
                b.submit()
            });
            Q.on(a, "click", function () {
                if (O.value == D) {
                    O.value = ""
                }
            })
        },
        _updateDestAreaBoxHtml: function (j, S, E) {
            var l = ['<ul class="fAl-loc">'];
            for (var D in S) {
                l[l.length] = "<li" + ((E == D) ? ' class="' + L + '"' : "") + '><a href="" code="' + D + '" atpanel="3,' + S[D] + ',,,spu-toloc,20,toloc,">' + S[D] + "</a></li>"
            }
            l[l.length] = "</ul>";
            R.html(j, l.join(""))
        },
        _data: {},
        _destAreaInit: function () {
            if (!e) {
                return
            }
            var D = R.get("." + T, e),
				m = R.get("." + g, e),
				S = R.query("a", D),
				s = R.val(B.area_code),
				j = c[s];
            if (!j) {
                var n = s.replace(/([\d]{2})\d+/g, "$10000"),
					E = c[n],
					q = E && E.length == 2 ? E[1] : null,
					l;
                if (q) {
                    for (var k = 0, o = S.length; k < o; k++) {
                        var p = S[k];
                        if (R.attr(p, "code") == n) {
                            var r = p.parentNode;
                            l = R.next(r, "." + A);
                            this._updateDestAreaBoxHtml(l, q, s);
                            if (!R.get("i", p)) {
                                R.append(R.create('<i class="f-ico-triangle-mt" />'), p)
                            }
                            R.addClass(r, L);
                            R.addClass(l, N);
                            R.html(m, q[s]);
                            this._data.lastBox = l;
                            this._data.lastLi = r;
                            this._data.lastChildLi = R.get("." + L, l);
                            break
                        }
                    }
                }
            } else {
                for (var k = 0, o = S.length; k < o; k++) {
                    var p = S[k],
						r = p.parentNode;
                    if (R.attr(p, "code") == s) {
                        R.addClass(r, L);
                        this._data.lastLi = r;
                        break
                    }
                }
            }
        },
        _destAreaEvent: function () {
            if (!e) {
                return
            }
            var D = this,
				j = R.get("." + T, e),
				S = D._data.lastChildLi,
				k = D._data.lastLi,
				E = D._data.lastBox;
            Q.delegate(j, "click", "a", function (q) {
                var m = q.currentTarget,
					l = m.parentNode,
					n = R.attr(m, "code"),
					p = [],
					o = null;
                if (R.hasClass(l, A)) {
                    return
                }
                R.addClass(l, L);
                n && (p = c[n] || []);
                l.grade = p.length !== 0 ? 1 : 2;
                E && l.grade == 1 && R.removeClass(E, N);
                p.length == 2 && (function () {
                    if (o = R.next(l, "." + A)) {
                        D._updateDestAreaBoxHtml(o, p[1]);
                        if (!R.get("i", m)) {
                            R.append(R.create('<i class="f-ico-triangle-mt" />'), m)
                        }
                        R.addClass(o, N);
                        E = o
                    }
                })();
                switch (l.grade) {
                    case 1:
                        if (k != l) {
                            R.removeClass(k, L);
                            k = l
                        }
                        break;
                    case 2:
                        if (S != l) {
                            R.removeClass(S, L);
                            S = l
                        }
                        break
                }
                q.preventDefault();
                if (p.length !== 2) {
                    R.val(B.area_code, n);
                    B.submit()
                }
            })
        },
        _menuEvent: function () {
            if (!h) {
                return
            }
            Q.on(J.query("input", h), "click", function () {
                G.submit()
            })
        },
        _menuInit: function () {
            if (!h) {
                return
            }
            var S = "drop",
				E = R.children(h, function (k) {
				    return k.tagName == "INPUT" && k.type == "checkbox"
				}),
				D = E.length;
            for (var j = 3; j < D; j++) {
                if (E[j].checked) {
                    S = "expand";
                    break
                }
            }
            LIST.msg.fire("expand", {
                el: X,
                classname: "fMenu",
                status: S
            })
        },
        _fix: function () {
            var S = R.create('<div id="J_FilterPlaceholder" />', {
                css: {
                    height: R.outerHeight(K, true),
                    display: "none"
                }
            });
            R.insertAfter(S, K);
            this.needFixTop = true;
            var E = Math.max(R.offset(K).top, 130),
				D = function () {
				    var j = R.scrollTop(I);
				    if (j > E) {
				        if (!R.hasClass(K, P)) {
				            R.addClass(K, P);
				            R.show(S)
				        }
				        if (W) {
				            R.css(K, "top", j - 10 - R.offset(d).top)
				        }
				    } else {
				        R.removeClass(K, P);
				        R.hide(S);
				        E = Math.max(R.offset(K).top, 130)
				    }
				};
            D();
            Q.on(I, "scroll", D)
        },
        _tipCtrl: function (S) {
            if (S || !h) {
                return
            }
            var j = R.query("label", h);
            if (!j.length) {
                return
            }
            var E = [1, -1, 0, 0],
				D = E.length;
            J.query(".j_FTip").each(function (o) {
                var l = R.attr(o, "data-cfg"),
					k = E;
                if (l) {
                    k = l.split(",");
                    for (var n = 0; n < D; n++) {
                        k[n] = parseInt(k[n]) || E[n]
                    }
                }
                var m = j[k[0] - 1];
                if (m) {
                    var p = m.offsetLeft + R.outerWidth(m) / 2 - R.outerWidth(o) / 2;
                    R.css(o, "left", p + "px")
                }
                k[1] !== -1 && setTimeout(function () {
                    R.hide(".j_FTip")
                }, k[1] < 0 ? 0 : k[1]);
                k[2] && R.show(R.get(".j_FTCat", o));
                k[3] && R.show(R.get(".j_FTX", o));
                R.show(o)
            })
        },
        _disctOpts: function () {
            var D = "#J_FDisctOpts";
            if (!R.get(D)) {
                return
            }
            J.UA.ie == 7 && R.query(D + " a").each(function (E) {
                E.setAttribute("hideFocus", "true")
            });
            Q.delegate(D, "click", "a", function (j) {
                var S = j.target,
					E = "fDO-cur",
					k = "fDO-disable";
                if (R.hasClass(S, k)) {
                    return
                }
                R.query(D + " a").each(function (l) {
                    R.removeClass(l, E)
                });
                R.addClass(S, E)
            })
        }
    });
    return {
        init: function () {
            new f()
        }
    }
}, {
    requires: [V + "/city-codes"]
});