/*pub-1|2013-05-03 12:21:25*/
KISSY.add("tb-home/js/game/v2/app", function (d, k, p, h, l, w) {
    var b = {}, c = {}, u = function (A) {
        var y = [],
			z;
        d.each(A, function (B) {
            z = B.split(",");
            y.push({
                key: z[0],
                value: z[1]
            })
        });
        return y
    }, m = new p("#J-game-name", {
        containerCls: "game-goods",
        hotUrl: "http://game.taobao.com/json/getGamesWithCallback.htm",
        hotWidth: 430,
        hotAlign: "right"
    }),
		v = new h("#J-game-good", [], {
		    containerCls: "game-goods",
		    inputFocusCls: "select-focus"
		}),
		i = !("placeholder" in document.createElement("input")),
		s = new k("#J-game-name"),
		r = new k("#J-game-good"),
		o = s.triggerLabel,
		n = r.triggerLabel,
		a = d.one("#J-submit"),
		q, j, t = true,
		g = new RegExp("[A-Z]+", "g"),
		f = function () {
		    var y = v.getInput();
		    t = true;
		    y.value = "";
		    y.setAttribute("disabled", "disabled");
		    i && r.triggerLabel.show()
		}, e = d.Node.one("body").attr("data-spm") == "1000386" ? true : false;
    if (!e) {
        w.one("#J-submit").addClass("newBtn");
        d.Node.one("#game-goods .ad-link").addClass("newad-link")
    }
    i && o.css({
        left: "7px",
        top: "3px",
        color: "#bbbbbb"
    });
    i && n.css({
        left: "7px",
        top: "3px",
        color: "#bbbbbb"
    });
    m.on("dataFormat", function (I) {
        var H = [],
			G = [],
			F = [],
			D = [],
			C = [],
			B = [],
			A = [],
			z = [],
			J = [],
			R = "\u70ed\u95e8\u6e38\u620f",
			Q = "ABCD",
			P = "EFGH",
			O = "JKL",
			N = "MNOP",
			M = "QRS",
			L = "TUVW",
			K = "XYZ",
			y = function (S, T) {
			    d.each(S, function (U, Y) {
			        var aa = U.split(","),
						Z = aa[1],
						X = aa[0].replace("_", ""),
						W = l.get(Z),
						V = W.match(g);
			        S[Y] = {
			            type: T,
			            result: X,
			            key: Z,
			            _key: Z.substring(0, 7),
			            pinyin: W,
			            py: !V ? "" : V.join("")
			        };
			        b[Z] = X
			    });
			    return S
			}, E = function (T, S) {
			    if (T.dt > S.dt) {
			        return 1
			    }
			    return -1
			};
        d.each(I.data.data, function (U, T) {
            var S;
            if (Q.indexOf(T) >= 0) {
                S = G
            } else {
                if (P.indexOf(T) >= 0) {
                    S = F
                } else {
                    if (O.indexOf(T) >= 0) {
                        S = D
                    } else {
                        if (N.indexOf(T) >= 0) {
                            S = C
                        } else {
                            if (M.indexOf(T) >= 0) {
                                S = B
                            } else {
                                if (L.indexOf(T) >= 0) {
                                    S = A
                                } else {
                                    if (K.indexOf(T) >= 0) {
                                        S = z
                                    } else {
                                        S = H;
                                        T = ""
                                    }
                                }
                            }
                        }
                    }
                }
            }
            U = y(U, T);
            S.push({
                dt: T,
                dd: U
            });
            if (T != "") {
                J = J.concat(U)
            }
        });
        return {
            source: J,
            data: {
                results: [{
                    tabname: R,
                    tabdata: H,
                    title: "\u70ed\u95e8\u6e38\u620f"
                }, {
                    tabname: Q,
                    tabdata: G.sort(E),
                    title: "\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aA\u5230D\u7684\u6e38\u620f"
                }, {
                    tabname: P,
                    tabdata: F.sort(E),
                    title: "\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aE\u5230H\u7684\u6e38\u620f"
                }, {
                    tabname: O,
                    tabdata: D.sort(E),
                    title: "\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aJ\u5230L\u7684\u6e38\u620f"
                }, {
                    tabname: N,
                    tabdata: C.sort(E),
                    title: "\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aM\u5230P\u7684\u6e38\u620f"
                }, {
                    tabname: M,
                    tabdata: B.sort(E),
                    title: "\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aQ\u5230S\u7684\u6e38\u620f"
                }, {
                    tabname: L,
                    tabdata: A.sort(E),
                    title: "\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aT\u5230W\u7684\u6e38\u620f"
                }, {
                    tabname: K,
                    tabdata: z.sort(E),
                    title: "\u6e38\u620f\u540d\u62fc\u97f3\u9996\u5b57\u6bcd\u4e3aX\u5230Z\u7684\u6e38\u620f"
                }]
            }
        }
    });
    m.on("dataFilter", function (C) {
        var B = C.source,
			A = C.query.replace(/[^0-9a-zA-Z-_\\u00b7\(\)\/\u4E00-\u9FA5+]/g, ""),
			z = /^[a-zA-Z]{1}$/,
			D = z.test(A),
			A = A.toUpperCase(),
			y = d.filter(B, function (E) {
			    if (D) {
			        return E.type === A
			    } else {
			        return (E.key.toUpperCase().indexOf(A) == 0) || (E.py.toUpperCase().indexOf(A) == 0) || (E.pinyin.toUpperCase().indexOf(A) == 0)
			    }
			});
        return y.slice(0, 15)
    });
    m.on("dataError", function () {
        f()
    });
    m.on("itemSelect", function (z) {
        var y = this._inputNode.val();
        if (y == "" || !b[y]) {
            f();
            return
        }
        q = b[y];
        if (c[q] !== undefined) {
            v.reset(c[q])
        } else {
            d.io({
                dataType: "jsonp",
                url: "http://game.taobao.com/json/getAuctionTypeAndGameZoneWithCallback.htm?gn=" + q,
                jsonp: "callback",
                success: function (B) {
                    var A;
                    if (d.isObject(B)) {
                        A = c[q] = u(B.data.gameType)
                    } else {
                        A = c[q] = null
                    }
                    v.reset(A)
                }
            })
        }
        i && s.hide();
        a.attr("href", a.attr("href").replace(new RegExp("gn=([^&]*)(&|$)"), "gn=" + q + "&"))
    });
    v.on("contentReset", function (z) {
        var y = this.getInput();
        if (!z.data) {
            f()
        } else {
            y.removeAttribute("disabled");
            y.focus();
            t = false
        }
    });
    v.on("itemChange", function (y) {
        a.attr("href", a.attr("href").replace(new RegExp("pidvid=([^&]*)(&|$)"), "pidvid=" + y.key + "&"))
    });
    a.on("click", function (y) {
        if (t) {
            y.halt();
            m._inputNode[0].focus()
        }
    });
    var x = "#J_Notice .tab-nav li,#J_Convenience .tab-nav li,#J_Game .new-service-hd a, #J_NoticeBoard .tab-nav li, #J_QuickService .tab-nav li";
    d.Node.one("body").delegate("mouseover", x, function (z) {
        var y = d.Node(z.currentTarget);
        if (y.attr("tabindex") == -1) {
            m.hide()
        }
    })
}, {
    requires: ["tb-home/js/common/v2/placeholder", "tb-home/js/game/v2/auto-complete", "tb-home/js/game/v2/selectlike", "tb-home/js/game/v2/pinyin", "node"]
});