/*pub-1|2013-05-08 13:58:09*/
KISSY.add("tb-home/js/game/v2/auto-suggest", function (i, B, P, G, m) {
    var Q = window,
		e = P.Target,
		j = document,
		Y, o = B.get("head"),
		L = G.ie,
		q = (L === 6),
		n = (L >= 9),
		F = "KISSY.AutoSuggest.callback",
		r = "ks-suggest-",
		I = r + "style",
		s = r + "container",
		E = r + "key",
		h = r + "result",
		z = "ks-selected",
		X = "ks-odd",
		A = "ks-even",
		w = r + "content",
		p = r + "footer",
		l = r + "closebtn",
		U = r + "shim",
		ac = "beforeStart",
		H = "itemSelect",
		C = "beforeSubmit",
		t = "beforeDataRequest",
		Z = "dataReturn",
		J = "updateFooter",
		k = "beforeShow",
		O = "dataFilter",
		y = "dataHandle",
		d = 200,
		g = "",
		W = "hidden",
		a = "display",
		M = "none",
		v = "LI",
		K = "li",
		u = "<div>",
		ab = "result",
		V = "key",
		ad = "data-time",
		D = parseInt,
		f = /^(?:input|button|a)$/i,
		aa = {
		    containerCls: g,
		    resultFormat: "%result%",
		    closeBtnText: "\u5173\u95ed",
		    shim: q,
		    submitOnSelect: true,
		    offset: -1,
		    charset: "utf-8",
		    callbackName: "callback",
		    callbackFn: F,
		    queryName: "q",
		    dataType: 0
		};

    function b(ag, ah, af) {
        var ae = this,
			S;
        if (!(ae instanceof b)) {
            return new b(ag, ah, af)
        }
        ae.textInput = B.get(ag);
        ae.config = af = i.merge(aa, af);
        if (i.isString(ah)) {
            ah += (ah.indexOf("?") === -1) ? "?" : "&";
            ae.dataSource = ah + af.callbackName + "=" + (S = af.callbackFn);
            if (af.dataType === 2) {
                ae.config.dataType = 0
            }
            if (S !== F) {
                c(S)
            }
        } else {
            ae.dataSource = ah;
            ae.config.dataType = 2
        }
        ae.query = g;
        ae.queryParams = g;
        ae._dataCache = {};
        ae._init();
        return 0
    }
    i.augment(b, e, {
        _init: function () {
            var S = this;
            Y = j.body;
            S._initTextInput();
            S._initContainer();
            if (S.config.shim) {
                S._initShim()
            }
            S._initEvent()
        },
        _initTextInput: function () {
            var ae = this,
				S = ae.textInput,
				ag = false,
				af = 0;
            B.attr(S, "autocomplete", "off");
            if (ae.config.autoFocus) {
                S.focus()
            }
            P.on(S, "keydown", function (ah) {
                var ai = ah.keyCode;
                if (ai == 35 || ai == 36) {
                    if (!S.value) {
                        ah.halt();
                        return
                    }
                }
                if (ai === 27) {
                    ae.hide();
                    S.value = ae.query
                } else {
                    if (ai === 40 || ai === 38) {
                        if (af++ === 0) {
                            if (ae._isRunning) {
                                ae.stop()
                            }
                            ag = true;
                            ae._selectItem(ai === 40)
                        } else {
                            if (af == 3) {
                                af = 0
                            }
                        }
                        ah.preventDefault()
                    } else {
                        if (ai === 13) {
                            ae.hide();
                            if (ag) {
                                if (S.value == ae._getSelectedItemKey()) {
                                    if (ae.fire(H) === false) {
                                        return
                                    }
                                }
                            }
                        } else {
                            if (!ae._isRunning) {
                                ae.start()
                            }
                            ag = false
                        }
                    }
                }
                if (G.chrome) {
                    if (ae._keyTimer) {
                        ae._keyTimer.cancel()
                    }
                    ae._keyTimer = i.later(function () {
                        ae._keyTimer = m
                    }, 500)
                }
                ah.stopPropagation()
            });
            P.on(S, "keyup", function () {
                af = 0
            });
            P.on(S, "focus", function () {
                ae._focusing = false
            })
        },
        _initContainer: function () {
            var ae = this,
				ag = ae.config.containerCls,
				S = B.create(u),
				af = B.create(u, {
				    "class": w
				}),
				ah = B.create(u, {
				    "class": p
				});
            S.style.position = "absolute";
            S.style.visibility = "hidden";
            S.className = s + (ag ? " " + ag : g);
            S.appendChild(af);
            S.appendChild(ah);
            Y.insertBefore(S, Y.firstChild);
            ae.container = S;
            ae.content = af;
            ae.footer = ah;
            ae._initContainerEvent()
        },
        _setContainerRegion: function () {
            var af = this,
				ag = af.config,
				ae = af.textInput,
				ah = B.offset(ae),
				S = af.container;
            B.css(S, {
                left: (L == 7) ? (ah.left - 2) : ah.left,
                top: ah.top + ae.offsetHeight + ag.offset
            });
            if (q) {
                B.offset(S, {
                    left: ah.left,
                    top: ah.top + ae.offsetHeight + ag.offset
                })
            }
            B.width(S, ag.containerWidth || ae.offsetWidth - 2)
        },
        _initContainerEvent: function () {
            var af = this,
				ae = af.textInput,
				S = af.container,
				ah = af.content,
				aj = af.footer,
				ai, ag;
            P.on(ah, "mousemove", function (ak) {
                if (af._keyTimer) {
                    return
                }
                var al = ak.target;
                if (al.nodeName !== v) {
                    al = B.parent(al, K)
                }
                if (B.contains(ah, al)) {
                    if (al !== af.selectedItem) {
                        af._removeSelectedItem();
                        af._setSelectedItem(al)
                    }
                }
            });
            P.on(ah, "mousedown", function (ak) {
                var al = ak.target;
                if (al.nodeName !== v) {
                    al = B.parent(al, K)
                }
                ai = al
            });
            P.on(S, "mousedown", function (ak) {
                if (!f.test(ak.target.nodeName)) {
                    if (L && L < 9) {
                        ae.onbeforedeactivate = function () {
                            Q.event.returnValue = false;
                            ae.onbeforedeactivate = null
                        }
                    }
                    ak.preventDefault()
                }
            });
            P.on(ah, "mouseup", function (ak) {
                var am = ak.target;
                if (ak.which > 2) {
                    return
                }
                if (am.nodeName !== v) {
                    am = B.parent(am, K)
                }
                if (am != ai) {
                    return
                }
                if (B.contains(ah, am)) {
                    af._updateInputFromSelectItem(am);
                    if (af.fire(H) === false) {
                        return
                    }
                    try {
                        af.hide();
                        af.stop()
                    } catch (al) { }
                }
            });
            P.on(af.container, "mouseleave", function () {
                ag = true
            });
            P.on(aj, "click", function (ak) {
                if (B.hasClass(ak.target, l)) {
                    af.hide()
                }
            });
            i.each(["a", "span"], function (ak) {
                P.delegate(af.container, "blur", ak, function () {
                    i.later(function () {
                        if (!B.contains(af.container, document.activeElement) && document.activeElement.id !== af.textInput.id) {
                            af.hide()
                        }
                    }, 0, false, af)
                })
            })
        },
        _initShim: function () {
            var S = B.create("<iframe>", {
                src: "about:blank",
                "class": U,
                style: "position:absolute;visibility:hidden;border:none"
            });
            this.container.shim = S;
            Y.insertBefore(S, Y.firstChild)
        },
        _setShimRegion: function () {
            var ae = this,
				S = ae.container,
				af = S.style,
				ag = S.shim;
            if (ag) {
                B.css(ag, {
                    left: D(af.left),
                    top: af.top,
                    width: D(af.width) + 2,
                    height: B.height(S) - 2
                })
            }
        },
        _initEvent: function () {
            var S = this;
            P.on(Q, "resize", function () {
                S._setContainerRegion();
                S._setShimRegion()
            })
        },
        start: function () {
            var S = this;
            if (S.fire(ac) === false) {
                return
            }
            b.focusInstance = S;
            S._timer = i.later(function () {
                S._updateContent();
                S._timer = i.later(arguments.callee, d)
            }, d);
            S._isRunning = true
        },
        stop: function () {
            var S = this;
            b.focusInstance = m;
            if (S._timer) {
                S._timer.cancel()
            }
            S._isRunning = false
        },
        show: function () {
            var ae = this;
            ae._setContainerRegion();
            if (ae.isVisible()) {
                return
            }
            var S = ae.container,
				af = S.shim;
            x(S);
            if (af) {
                ae._setShimRegion();
                x(af)
            }
        },
        hide: function () {
            if (!this.isVisible()) {
                return
            }
            var S = this.container,
				ae = S.shim;
            if (ae) {
                R(ae)
            }
            R(S)
        },
        isVisible: function () {
            return this.container.style.visibility != W
        },
        _updateContent: function () {
            var ae = this,
				S = ae.textInput,
				af;
            if (S.value == ae.query) {
                return
            }
            af = ae.query = S.value;
            if (!i.trim(af)) {
                ae._fillContainer();
                ae.hide();
                ae.fire(y, {
                    status: false,
                    query: g
                });
                return
            }
            switch (ae.config.dataType) {
                case 0:
                    if (ae._dataCache[af] !== m) {
                        i.log("use cache");
                        ae._fillContainer(ae._dataCache[af]);
                        ae._displayContainer()
                    } else {
                        i.log("no cache, data from server");
                        ae._requestData()
                    }
                    break;
                case 1:
                    i.log("no cache, data always from server");
                    ae._requestData();
                    break;
                case 2:
                    if (ae._dataCache[af] !== m) {
                        i.log("use cache");
                        ae.fire(y, {
                            status: ae._dataCache[af] != "",
                            query: af
                        });
                        ae._fillContainer(ae._dataCache[af]);
                        ae._displayContainer()
                    } else {
                        i.log("use static datasource");
                        ae._handleResponse(ae.fire(O, {
                            source: ae.dataSource,
                            query: af
                        }))
                    }
                    break
            }
        },
        _requestData: function () {
            var ae = this,
				af = ae.config,
				S;
            if (!L || n) {
                ae.dataScript = m
            }
            if (!ae.dataScript) {
                S = j.createElement("script");
                S.charset = af.charset;
                S.async = true;
                o.insertBefore(S, o.firstChild);
                ae.dataScript = S;
                if (!L || n) {
                    var ag = i.now();
                    ae._latestScriptTime = ag;
                    B.attr(S, ad, ag);
                    P.on(S, "load", function () {
                        ae._scriptDataIsOut = B.attr(S, ad) != ae._latestScriptTime
                    })
                }
            }
            ae.queryParams = af.queryName + "=" + ae.query;
            if (ae.fire(t) === false) {
                return
            }
            ae.dataScript.src = ae.dataSource + "&" + ae.queryParams
        },
        _handleResponse: function (ae) {
            var am = this,
				ag, aj = g,
				af, ah, ai, al, ak, S;
            if (am._scriptDataIsOut) {
                return
            }
            am.returnedData = ae;
            if (am.fire(Z, {
                data: ae
            }) === false) {
                return
            }
            if (!am.config.contentRenderer) {
                aj = am._renderContent(ae)
            } else {
                aj = am.config.contentRenderer(ae)
            }
            am._fillContainer(aj);
            if (am.config.dataType != 1) {
                am._dataCache[am.query] = B.html(am.content)
            }
            am._displayContainer();
            am.fire(y, {
                status: ae.length,
                query: am.query
            })
        },
        _renderContent: function (ae) {
            var am = this,
				ag, aj = g,
				af, ah, ai, al, ak, S;
            ag = am.returnedData;
            if ((ah = ag.length) > 0) {
                ai = B.create("<ol>");
                for (af = 0; af < ah; ++af) {
                    S = ag[af];
                    al = am._formatItem((ak = S[V]));
                    B.attr(al, V, ak);
                    B.addClass(al, af % 2 ? A : X);
                    ai.appendChild(al)
                }
                aj = ai
            }
            return aj
        },
        _formatData: function (ai) {
            var ae = [],
				S, ah, ag, af = 0;
            if (!ai) {
                return ae
            }
            if (i.isArray(ai[ab])) {
                ai = ai[ab]
            }
            if (!(S = ai.length)) {
                return ae
            }
            for (ag = 0; ag < S; ++ag) {
                ah = ai[ag];
                if (i.isString(ah)) {
                    ae[af++] = {
                        key: ah
                    }
                } else {
                    if (i.isArray(ah) && ah.length > 1) {
                        ae[af++] = {
                            key: ah[0],
                            result: ah[1]
                        }
                    }
                }
            }
            return ae
        },
        _formatItem: function (af, ae) {
            var S = B.create("<li>"),
				ag;
            S.appendChild(B.create("<span>", {
                "class": E,
                html: af
            }));
            if (ae) {
                ag = this.config.resultFormat.replace("%result%", ae);
                if (i.trim(ag)) {
                    S.appendChild(B.create("<span>", {
                        "class": h,
                        html: ag
                    }))
                }
            }
            return S
        },
        _fillContainer: function (ae, af) {
            var S = this;
            S._fillContent(ae || g);
            S._fillFooter(af || g);
            setTimeout(function () {
                if (S.isVisible()) {
                    S._setShimRegion()
                }
            }, 0);
            if (S.fire(k) === false) {
                return
            }
        },
        _fillContent: function (S) {
            T(this.content, S);
            this.selectedItem = m
        },
        _fillFooter: function (af) {
            var ae = this,
				S = ae.config,
				ah = ae.footer,
				ag;
            T(ah, af);
            if (S.closeBtn) {
                ah.appendChild(B.create("<a>", {
                    "class": l,
                    text: S.closeBtnText,
                    href: "javascript: void(0)",
                    target: "_self"
                }))
            }
            ae.fire(J, {
                footer: ah,
                query: ae.query
            });
            B.css(ah, a, B.text(ah) ? g : M)
        },
        _displayContainer: function () {
            var S = this;
            if (i.trim(B.text(S.container))) {
                S.show()
            } else {
                S.hide()
            }
        },
        _selectItem: function (ag) {
            var af = this,
				ae = B.query(K, af.container),
				S;
            if (ae.length === 0) {
                return
            }
            if (!af.isVisible()) {
                af.show();
                return
            }
            if (!af.selectedItem) {
                S = ae[ag ? 0 : ae.length - 1]
            } else {
                S = ae[i.indexOf(af.selectedItem, ae) + (ag ? 1 : -1)];
                if (!S) {
                    af.textInput.value = af.query
                }
            }
            af._removeSelectedItem();
            if (S) {
                af._setSelectedItem(S);
                af._updateInputFromSelectItem()
            }
        },
        _removeSelectedItem: function () {
            B.removeClass(this.selectedItem, z);
            this.selectedItem = m
        },
        _setSelectedItem: function (S) {
            B.addClass(S, z);
            this.selectedItem = S
        },
        _getSelectedItemKey: function () {
            var S = this;
            if (!S.selectedItem) {
                return g
            }
            return B.attr(S.selectedItem, V)
        },
        _updateInputFromSelectItem: function () {
            var ae = this,
				S = ae.textInput;
            S.value = ae._getSelectedItemKey(ae.selectedItem) || ae.query
        }
    });

    function x(S) {
        S.style.visibility = g
    }
    function R(S) {
        S.style.visibility = W
    }
    function T(ae, S) {
        if (S.nodeType === 1) {
            B.html(ae, g);
            ae.appendChild(S)
        } else {
            B.html(ae, S)
        }
    }
    function c(ae) {
        var af = ae.split("."),
			S = af.length,
			ag;
        if (S > 1) {
            ae = ae.replace(/^(.*)\..+$/, "$1");
            ag = i.namespace(ae, true);
            ag[af[S - 1]] = N
        } else {
            Q[ae] = N
        }
    }
    function N(S) {
        if (!b.focusInstance) {
            return
        }
        i.later(function () {
            b.focusInstance._handleResponse(S)
        }, 0)
    }
    b.version = 1.1;
    b.callback = N;
    i.AutoSuggest = b;
    return b
}, {
    requires: ["dom", "event", "ua"]
});