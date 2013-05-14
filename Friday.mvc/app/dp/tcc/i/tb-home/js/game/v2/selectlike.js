/*pub-1|2013-05-08 16:52:43*/
KISSY.add("tb-home/js/game/v2/selectlike", function (d, s, A, g) {
    var u = d.UA,
		D = window,
		b = A.Target,
		f = D.document,
		L, z = u.ie,
		h = (z === 6),
		j = "ks-selectlike-",
		w = j + "style",
		k = j + "container",
		o = j + "content",
		a = j + "item",
		q = j + "item-selected",
		G = j + "shim",
		E = "itemChange",
		e = "contentReset",
		c = "",
		H = "hidden",
		n = "<li>",
		y = "li",
		m = "<div>",
		K = "value",
		I = "key",
		t = parseInt,
		v = 13,
		x = 27,
		B = 9,
		C = 38,
		r = 40,
		J = 8,
		M = {
		    containerCls: c,
		    containerWidth: c,
		    shim: h,
		    submitOnSelect: true,
		    offset: -1,
		    inputFocusCls: c
		};

    function l(Q, N, P) {
        var O = this;
        if (!(O instanceof l)) {
            return new l(Q, N, P)
        }
        O.textInput = s.get(Q);
        O.config = P = d.merge(M, P);
        if (d.isArray(N)) {
            O.dataArray = N
        } else {
            O.dataArray = new Array(N)
        }
        O._init();
        return 0
    }
    d.augment(l, b, {
        _init: function () {
            var N = this;
            L = f.body;
            N._initTextInput();
            N._initContainer();
            N._initContent();
            if (N.config.shim) {
                N._initShim()
            }
            N._initStyle()
        },
        _initTextInput: function () {
            var O = this,
				Q, N = O.textInput,
				R = false,
				P = 0;
            O._initTextInputValue();
            s.attr(N, "readOnly", "true");
            A.on(N, "keydown", function (T) {
                if (s.attr(N, "disabled")) {
                    return
                }
                var S = T.keyCode;
                if (S == J) {
                    T.preventDefault()
                }
                if (S == B || S == v) {
                    O._updateInputFromSelectItem();
                    O.hide()
                } else {
                    if (S == x) {
                        O.hide()
                    } else {
                        if (S == C || S == r) {
                            O.show();
                            if (P++ === 0) {
                                R = true;
                                O._selectItem(O._getSelectItem(S === C))
                            } else {
                                if (P == 3) {
                                    P = 0
                                }
                            }
                            T.preventDefault()
                        } else {
                            R = false
                        }
                    }
                }
                T.stopPropagation()
            });
            A.on(N, "keyup", function () {
                R = false;
                P = 0
            });
            A.on(N, "blur", function () {
                O.hide();
                s.removeClass(N, O.config.inputFocusCls)
            });
            A.on(N, "click", function () {
                O.show()
            });
            A.on(N, "focus", function () {
                s.addClass(N, O.config.inputFocusCls)
            });
            A.on(N, "mousedown", function (S) {
                if (z == 7) {
                    N.onbeforedeactivate = function () {
                        D.event.returnValue = false;
                        N.onbeforedeactivate = null
                    }
                }
            });
            if (z <= 7) {
                d.one(N).next().on("click", function () {
                    try {
                        N.focus();
                        O.show()
                    } catch (S) { }
                })
            }
        },
        _initTextInputValue: function () {
            var O = this,
				R, N = O.textInput;
            if (O.dataArray.length) {
                R = O.dataArray[0];
                var P = R.key,
					Q = R.value;
                N.value = Q;
                N.setAttribute("rel", P);
                if (O.fire(E, {
                    key: P,
                    value: Q
                })) {
                    return
                }
            } else {
                N.value = "";
                N.setAttribute("rel", "")
            }
        },
        _initContainer: function () {
            var O = this,
				P = O.config.containerCls,
				N = s.create(m);
            N.style.position = "absolute";
            N.style.visibility = "hidden";
            N.className = k + (P ? " " + P : c);
            L.insertBefore(N, L.firstChild);
            O.container = N
        },
        _initContent: function () {
            var W = this,
				U = W.textInput,
				Q = W.dataArray,
				N = W.container,
				R, S, T, V, P, O;
            W.container.innerHTML = "";
            if ((S = Q.length) > 0) {
                T = s.create("<ol>");
                for (R = 0; R < S; ++R) {
                    P = Q[R];
                    V = W._formatItem(P[K]);
                    s.attr(V, I, P[I]);
                    s.attr(V, "aria-label", P[K]);
                    T.appendChild(V)
                }
                N.appendChild(T)
            }
            W._setRegion();
            A.on(N, "mouseover", function (Y) {
                var X = Y.target;
                if (X != W.activeItem) {
                    s.removeClass(W.activeItem, q)
                }
                s.addClass(X, q)
            });
            A.on(N, "mouseout", function (X) {
                s.removeClass(X.target, q)
            });
            A.on(N, "mousedown", function (X) {
                if (z && z < 9) {
                    U.onbeforedeactivate = function () {
                        D.event.returnValue = false;
                        U.onbeforedeactivate = null
                    }
                }
                X.preventDefault();
                O = X.target
            });
            A.on(N, "mouseup", function (Y) {
                var X = Y.target;
                if (Y.which > 2) {
                    return
                }
                if (X != O) {
                    return
                }
                if (s.contains(T, X)) {
                    W._selectItem(X);
                    W._updateInputFromSelectItem();
                    W.hide()
                }
            })
        },
        _setRegion: function (R) {
            var P = this,
				Q = P.config,
				O = P.textInput,
				S = s.offset(O),
				N = P.container;
            s.css(N, {
                left: (z == 7) ? (S.left - 2) : S.left,
                top: S.top + O.offsetHeight + Q.offset
            });
            if (h) {
                s.offset(N, {
                    left: S.left,
                    top: S.top + O.offsetHeight + Q.offset
                })
            }
            s.width(N, Q.containerWidth || O.offsetWidth - 2)
        },
        _initShim: function () {
            var N = this,
				O = s.create("<iframe>", {
				    src: "about:blank",
				    "class": G,
				    style: "position:absolute;visibility:hidden;border:none"
				});
            this.container.shim = O;
            L.insertBefore(O, L.firstChild);
            N._setShimRegion()
        },
        _setShimRegion: function () {
            var O = this,
				N = O.container,
				P = N.style,
				Q = N.shim;
            if (Q) {
                s.css(Q, {
                    left: t(P.left) - 2,
                    top: P.top,
                    width: t(P.width) + 2,
                    height: s.height(N) - 2
                })
            }
        },
        _formatItem: function (N) {
            return s.create(n, {
                "class": a,
                html: N
            })
        },
        _initStyle: function () {
            var N = s.get("#" + w);
            if (N) {
                return
            }
            s.addStyleSheet(".ks-selectlike-container{background:white;z-index:99999;border:1px solid #959595;border-bottom:3px solid #ccc;}.ks-selectlike-item{background:#fff;color:#333;line-height:25px;padding-left:10px;}.ks-selectlike-item-selected{background:#aaa;color:#fff;}.ks-selectlike-shim{z-index:99998}.ks-selectlike-container{*margin-left:2px;_margin-left:-2px;_margin-top:-3px}", w)
        },
        _getSelectItem: function (Q) {
            var P = this,
				O = s.query(y, P.container).length - 1,
				N = P.activeIndex,
				N = isNaN(N) ? -1 : N;
            if (O < 0) {
                return
            }
            N += (Q ? -1 : 1);
            if (N < 0) {
                N = O
            } else {
                if (N > O) {
                    N = 0
                }
            }
            return N
        },
        _selectItem: function (Q) {
            var O = this,
				N = s.query(y, O.container),
				R, P;
            if (isNaN(Q)) {
                R = Q;
                P = d.indexOf(Q, N)
            } else {
                R = N[Q];
                P = Q
            }
            O._removeSelectedItem();
            if (R) {
                O._setSelectedItem(R, P)
            }
        },
        _removeSelectedItem: function () {
            s.removeClass(this.activeItem, q);
            this.activeItem = g;
            this.activeIndex = NaN
        },
        _setSelectedItem: function (R, P) {
            var N = this.textInput,
				O = s.text(R),
				Q = s.attr(R, I);
            s.addClass(R, q);
            this.activeItem = R;
            this.activeIndex = P;
            N.value = O;
            N.focus()
        },
        _updateInputFromSelectItem: function () {
            var P = this,
				O = P.textInput,
				S = P.activeItem,
				Q = s.text(P.activeItem),
				N = O.value,
				R;
            if (!P.isVisible()) {
                return
            }
            R = s.attr(S, I);
            if (P.fire(E, {
                key: R,
                value: Q
            })) {
                return
            }
            O.value = Q;
            O.setAttribute("rel", R)
        },
        _highLightActive: function () {
            var Q = this,
				P = Q.textInput,
				S = P.value,
				N = Q.container,
				O = s.query(y, Q.container),
				R;
            for (i = 0; i < O.length; ++i) {
                R = O[i];
                if (s.text(R) === S) {
                    s.addClass(R, q);
                    Q.activeItem = R;
                    Q.activeIndex = i
                } else {
                    s.removeClass(R, q)
                }
            }
        },
        show: function () {
            var O = this;
            if (O.isVisible()) {
                return
            }
            var N = O.container,
				P = N.shim;
            O._highLightActive();
            p(N);
            if (P) {
                p(P)
            }
        },
        hide: function () {
            if (!this.isVisible()) {
                return
            }
            var N = this.container,
				O = N.shim;
            if (O) {
                F(O)
            }
            F(N)
        },
        isVisible: function () {
            return this.container.style.visibility != H
        },
        getActiveKey: function () {
            return this.textInput.getAttribute("rel")
        },
        getActiveValue: function () {
            return this.textInput.value
        },
        getInput: function () {
            return this.textInput
        },
        reset: function (N) {
            var O = this;
            if (!N) {
                O.dataArray = []
            } else {
                if (d.isArray(N)) {
                    O.dataArray = N
                } else {
                    O.dataArray = new Array(N)
                }
            }
            O._initTextInputValue();
            O._initContent();
            O._setShimRegion();
            O.fire(e, {
                data: N
            })
        },
        focus: function () {
            var Q = this,
				P = Q.textInput,
				N = P.value.length;
            if (P.createTextRange) {
                var O = P.createTextRange();
                O.moveStart("character", 0);
                O.moveEnd("character", N);
                O.select()
            } else {
                P.setSelectionRange(0, N)
            }
        }
    });

    function p(N) {
        N.style.visibility = c
    }
    function F(N) {
        N.style.visibility = H
    }
    l.version = 1;
    d.SelectLike = l;
    return l
}, {
    requires: ["dom", "event"]
});