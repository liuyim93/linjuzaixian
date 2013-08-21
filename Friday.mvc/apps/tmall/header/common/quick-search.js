/*pub-1|2013-02-22 10:39:34*/
(function () {
    var G = KISSY,
		A = G.DOM,
		P = G.Event,
		J = window,
		L = document,
		F = G.UA.ie == 6,
		M = location.host.indexOf(".daily") != -1,
		B = "http://ac.atpanel.com/1.gif?cache=[cache]&com=02&apply=list&cod=3.0.1&uid=&ver=&ip=&other=",
		I = '<div class="quickSearch" id="J_QuickSearch">   <div class="quickSearch-bg"></div>   <a href="" class="quickSearch-close"></a>   <div class="quickSearch-con">        <form target="_self" name="searchQuick" action="http://' + (M ? "list.daily.tmall.net" : "list.tmall.com") + '/search_dispatcher.htm">            <p class="quickSearch-line">                <input type="text" name="q" class="quickSearch-input" autocomplete="off" placeholder="\u641c\u7d22 \u5929\u732b \u5546\u54c1/\u5e97\u94fa" value="{query}">                <button type="submit" class="quickSearch-btn">\u63d0\u4ea4</button>            </p>            <input id="J_QuickSearchStyle" type="hidden" name="style" value="g">            <input type="hidden" name="cat" value="{cat}" >            <p class="j_SearchTips"></p>        </form>        <p class="quickSearch-footer">            [\u65b9\u5411\u952e]\u4e0a\u4e0b\u9009\u62e9\uff0c            [\u56de\u8f66\u952e]\u786e\u8ba4\u641c\u7d22\uff0c            [esc]\u9000\u51fa        </p>    </div><div>',
		C = '<a class="quickSearch-tips" data-type="g">\u641c\u7d22 \u201c<b>{keyword}</b>\u201d <em>\u5546\u54c1</em></a><a class="quickSearch-tips" data-type="w">\u641c\u7d22 \u201c<b>{keyword}</b>\u201d <em>\u5e97\u94fa</em></a>',
		N = "\u8bf7\u8f93\u5165\u5173\u952e\u5b57",
		O = {
		    sugUrl: "http://suggest.taobao.com/sug?area=b2c&code=utf-8",
		    sugCfg: {
		        containerCls: "quickSearch-suggest",
		        callbackFn: G.guid("suggest_callback"),
		        resultFormat: "",
		        containerWidth: "306px",
		        offset: 5
		    },
		    dataNum: 5
		};

    function H(S) {
        var E = "http://log.mmstat.com/mallsearch?",
			D = S.split(","),
			R = {
			    q: D[0] || "",
			    wq: D[1] || "",
			    suggest: D[2] || "",
			    stats: D[3] || "",
			    pos: D[4] || "",
			    itemid: D[5] || "",
			    clickid: D[6] || "",
			    page_type: D[7] || "",
			    type: D[8] || "",
			    combo: D[9] || "",
			    active: "0",
			    searchtype: "search"
			}, Q = G.param(R);
        if (typeof __header_atpanel_param !== "undefined") {
            Q += "&" + __header_atpanel_param
        }
        if (window.goldlog && window.goldlog.record) {
            goldlog.record("/mallsearch", "tmallsearch", Q, "H1449172242")
        } else {
            new Image().src = E + "goldlog=undefined&" + Q
        }
    }
    function K(D) {
        if (!(this instanceof K)) {
            return new K(D)
        }
        this.suggest = null;
        this.content = null;
        this.anim = null;
        this.els = {
            form: "form",
            button: "button",
            tips: ".j_SearchTips",
            input: ".quickSearch-input",
            close: ".quickSearch-close",
            type: "#J_QuickSearchStyle"
        };
        this.config = G.merge(O, D || {});
        this._init()
    }
    G.augment(K, G.EventTarget, {
        _init: function () {
            var E = this,
				D = E.config;
            E.content = E._addDom();
            for (var Q in E.els) {
                E.els[Q] = G.get(E.els[Q], E.content)
            }
            G.use("suggest", function (R, T) {
                var T = R.Suggest || T;
                E.suggest = new T(E.els.input, D.sugUrl, D.sugCfg);
                E._bindEvent();
                E._bindSugEvent();
                E.show()
            })
        },
        _addDom: function () {
            var Q = {}, E = "",
				D;
           //debugger
            Q.query = A.val("#mq") || "";
            Q.query = Q.query.replace(/[?,\uff1f]/g, "");
            Q.cat = A.val("#J_Cat") || "";
            E = G.substitute(I, Q);
            D = A.create(E);
            A.append(D, L.body);
            return D
        },
        show: function () {
            var D = this,
				T = D.content,
				Q = A.viewportWidth(),
				E = 350,
				S = (Q - E) / 2,
				R = 200;
            A.css(T, {
                left: S + "px",
                display: "block"
            });
            new G.Anim(T, G.UA.ie < 9 ? {
                top: R + "px"
            } : {
                top: R + "px",
                opacity: 1
            }, 0.4, "easeOutStrong", function () {
                try {
                    D.els.input.focus()
                } catch (U) { }
                D.els.input.value = G.trim(D.els.input.value)
            }).run();
            new Image().src = B.replace("[cache]", Math.random().toString().substr(2, 7))
        },
        hide: function () {
            var D = this,
				E = D.content;
            new G.Anim(E, G.UA.ie < 9 ? {
                top: "100px"
            } : {
                top: "100px",
                opacity: 0
            }, 0.4, "easeOutStrong", function () {
                A.hide(E);
                D.els.input.blur()
            }).run()
        },
        _slideTips: function () {
            new G.Anim(this.els.tips, {
                height: "0px"
            }, 0.3, "easeOutStrong").run()
        },
        _bindEvent: function () {
            var Q = this,
				D = Q.suggest,
				E = Q.els.input,
				T = Q.els.form,
				R = Q.els.button,
				U = false,
				V = false;
            emptySearch = function () {
                if (G.trim(E.value) == "" || G.trim(E.value) == N || G.trim(E.value) == A.attr(E, "placeholder")) {
                    E.value = N;
                    A.attr(E, "placeholder", N);
                    if (!U) {
                        U = true;

                        function W(Y, X) {
                            if (X <= 0) {
                                U = false;
                                return
                            }
                            new G.Anim(Y, {
                                backgroundColor: (X % 2 == 0 ? "#fdbd78" : "#fff")
                            }, 0.3, "easeNone", function () {
                                W(Y, --X)
                            }).run()
                        }
                        W(E, 4)
                    }
                    return true
                } else {
                    return false
                }
            };
            T.submit = function () {
                S(this);
                R.click()
            };
            var S = function (W) {
                if (document.all) {
                    W.fireEvent("onsubmit")
                } else {
                    var X = document.createEvent("HTMLEvents");
                    X.initEvent("submit", true, true);
                    W.dispatchEvent(X)
                }
            };
            P.on(T, "submit", function (W) {
                if (emptySearch()) {
                    W.halt()
                } else {
                    if (!V) {
                        V = true;
                        var X = E.value + "," + E.value + ",,minisearch:1,1,topsearch,topsearch,1,20,minisearch";
                        H(X)
                    }
                }
            });
            P.on(L.body, "keydown", function (Y) {
                var X = Y.keyCode;
                var W = Y.target;
                if (W && (W.nodeName === "INPUT" || W.nodeName === "TEXTAREA") && W.id != "mq") {
                    return
                }
                if (Y.shiftKey && (X == 191 || X == 229)) {
                    Q.show();
                    Y.halt()
                } else {
                    if (X == 27) {
                        Q.hide()
                    }
                }
            });
            P.on(E, "keydown", function (X) {
                var W = X.keyCode;
                if (W == 27) {
                    Q.hide()
                } else {
                    if ((X.ctrlKey || X.metaKey) && W == 13) {
                        Q.els.type.value = "w";
                        T.submit()
                    } else {
                        if (W == 13) {
                            Q._slideTips()
                        }
                    }
                }
            });
            P.on(E, "keyup", function (W) {
                if (W.keyCode == 191 || W.keyCode == 229) {
                    this.value = this.value.replace(/[?,\uff1f]/g, "")
                }
            });
            P.on(E, "blur", function () {
                Q._slideTips()
            });
            P.on(Q.els.close, "click", function (W) {
                W.preventDefault();
                Q.hide()
            });
            if (A.attr(E, "placeholder")) {
                if (G.trim(A.val(E)) == "") {
                    A.css(E, "color", "#BFBFBF");
                    A.val(E, A.attr(E, "placeholder"))
                }
                P.on(E, "focus", function (W) {
                    A.css(E, "color", "");
                    if (G.trim(A.val(E)) == A.attr(E, "placeholder")) {
                        A.val(E, " ")
                    }
                });
                P.on(E, "blur", function (W) {
                    if (G.trim(A.val(E)) == "") {
                        A.css(E, "color", "#BFBFBF");
                        A.val(E, A.attr(E, "placeholder"))
                    }
                })
            }
        },
        _bindSugEvent: function () {
            var Q = this,
				D = Q.suggest,
				U = Q.els.tips,
				T = Q.els.form,
				E = Q.els.input,
				S = Q.config.dataNum,
				R = function (W) {
				    var V = document.createElement("div");
				    V.className = "quickSearch-tip";
				    V.innerHTML = W;
				    return V
				};
            D.on("dataReturn", function (V) {
                if (V.data && V.data.result && V.data.result.length > S) {
                    V.data.result.splice(S, V.data.result.length - S)
                }
            });
            D.on("beforeShow", function () {
                A.css(D.container, {
                    position: F ? "absolute" : "fixed"
                })
            });
            D.on("updateFooter", function () {
                if (G.trim(Q.els.input.value) == "") {
                    Q._slideTips();
                    return
                }
                if (A.height(U) < A.height(D.container)) {
                    A.css(D.container, {
                        opacity: 0
                    })
                }
                var V = C.replace(/{keyword}/g, D.query);
                D.footer.appendChild(R(V));
                setTimeout(function () {
                    if (Q.anim) {
                        Q.anim.stop()
                    }
                    Q.anim = new G.Anim(U, {
                        height: A.height(D.container) + "px"
                    }, 0.3, "easeOutStrong", function () {
                        A.css(D.container, {
                            opacity: 1
                        })
                    }).run()
                }, 10);
                P.on(G.query("a", D.footer), "click", function () {
                    var W = A.attr(this, "data-type") || "";
                    Q.els.type.value = W;
                    var X = E.value + "," + E.value + "," + (W == "w" ? "2" : "1") + "_0,minisearch:1,1,topsearch,topsearch," + W + ",20,minisearch";
                    H(X);
                    Q.els.form.submit()
                });
                P.on(D.footer, "mouseenter mouseleave", function () {
                    A.toggleClass(D.selectedItem, "ks-selected")
                })
            });
            D.on("itemSelect", function () {
                Q._slideTips();
                var V = D.content,
					a = V.getElementsByTagName("li"),
					c = 0,
					d = "",
					f = D.query || "",
					g = 1;
                for (var Y = 0, e = a.length; Y < e; Y++) {
                    if (A.hasClass(a[Y], "ks-selected")) {
                        c = Y + 1;
                        d = A.text(a[Y])
                    }
                }
                var b = f + "_" + c + "_0",
					Z = A.create('<input type="hidden" value="' + b + '" name="xl" />'),
					h = "xl_" + g + "_suggest",
					X = A.create('<input type="hidden" value="' + h + '" name="from" />');
                A.append(Z, T);
                A.append(X, T);
                var W = d + "," + f + ",0_" + c + ",suggest:0_" + c + ";minisearch:1," + c + "," + d + "," + d + "," + g + ",5,suggest";
                H(W)
            })
        }
    });
    G.use("suggest", function () {
        new K()
    })
})();