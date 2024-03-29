﻿/*pub-1|2013-02-01 15:47:26*/
(function () {
    var D = KISSY,
		F = D.DOM,
		B = D.Event;
    if (D.UA.ie) {
        var A = ["header", "firgure", "article", "section", "aside", "footer", "nav"];
        D.each(A, function (H) {
            document.createElement(H)
        })
    }
    try {
        if (F.get("#J_ITouchDomain") || F.get("#J_quanzi")) {
            document.domain = location.host.indexOf("daily") > -1 ? "taobao.net" : "taobao.com"
        }
    } catch (E) { }
    D.namespace("MTB", true);
    MTB = {
        _version: "3.0",
        _description: "MyTaobao Namespace"
    };
    var C = {
        _getSearchURL: function (H) {
            switch (H) {
                case "shop":
                    return "http://shopsearch.taobao.com/search?q=%CB%B9%B5%D9%B7%D2i&initiative_id=staobaoz_20120831&spm=a230r.1.3.2&stat=40&shopf=newsearch";
                case "item":
                    return "http://s.taobao.com/search?q=%CB%B9%B5%D9%B7%D2i"
            }
        },
        _searchForm: function () {
            return F.get("#J_TSearchForm")
        }
    };
    var G = {
        _description: "Mytaobao Base Module",
        _searchType: "item",
        selectSideMenuItem: function (J) {
            var H, I;
            H = F.get("#" + J);
            if (!H) {
                return
            }
            if (H.nodeName.toUpperCase() !== "A") {
                H = F.get("A", H)
            }
            F.addClass(H, "selected");
            I = F.parent(H, ".J_MtSideTree");
            if (!I) {
                return
            }
            F.replaceClass(I, "fold", "unfold")
        },
        init: function () {
            var H = this;
            window.selectItem = H.selectSideMenuItem;
            D.available("#J_MtNotice", function () {
                H._initNotice()
            });
            D.available("#J_MtSideMenu", function () {
                H._initAvatar()
            });
            D.ready(function () {
                if (F.get("#J_quanzi")) {
                    H.myQuanziPop()
                }
                var I = F.query("LI", F.get("#J_MtMainNav"));
                H.fixHover(I, "hover");
                H._initNavMenu();
                H._initSearch();
                H._initMenu();
                H._initRecentApp();
                H._initRecommentApp()
            })
        },
        fixHover: function (H, I) {
            if (!H || !D.UA.ie) {
                return
            }
        },
        _initNavMenu: function () {
            var P = F.get("#J_MtMainNav"),
				O = F.query(".J_MtNavSubTrigger", P),
				N = F.query(".J_MtNavSub", P),
				H = null,
				L = "hide",
				J = "hover",
				S = "mt-nav-sub-wrap",
				K = 200,
				Q = null,
				M = 200;

            function R() {
                H && H.cancel && H.cancel()
            }
            function I() {
                Q && Q.cancel && Q.cancel()
            }
            B.on(O, "mouseenter", function (U) {
                var T = F.children(U.currentTarget, ".J_MtNavSub");
                F.removeClass(O, S);
                F.addClass(N, L);
                R();
                Q = D.later(function () {
                    F.addClass(U.currentTarget, S);
                    F.removeClass(T, L)
                }, M)
            });
            B.on(O, "mouseleave", function (U) {
                var T = F.children(U.currentTarget, ".J_MtNavSub");
                I();
                H = D.later(function () {
                    F.addClass(T, L);
                    F.removeClass(U.currentTarget, S)
                }, K)
            });
            B.on(N, "mouseenter", R);
            B.on(N, "mouseleave", function (V) {
                var T = this,
					U = F.parent(V.target, "LI");
                H = D.later(function () {
                    F.addClass(T, L);
                    F.removeClass(U, S)
                }, K)
            })
        },
        _initNotice: function () {
            if (!F.get("#system-announce")) {
                F.show("#J_MtNotice");
                F.addClass("body", "mt-notice-on")
            }
        },
        _initAvatar: function () {
            var J = F.get("#J_MtAvatarBox"),
				H = F.get("#J_MtAvatar"),
				I = F.get("#J_MtAvatarOperation"),
				K = "http://a.tbcdn.cn/app/sns/img/default/avatar-120.png";
            if (J) {
                B.on(J, "mouseenter", function (L) {
                    F.removeClass(I, "hide")
                });
                B.on(J, "mouseleave", function (L) {
                    F.addClass(I, "hide")
                })
            }
        },
        _initMenu: function () {
            var H = F.query(".J_MtIndicator"),
				J = "fold",
				I = "un" + J;
            B.on(H, "click", function (M) {
                M.preventDefault();
                var L = M.target,
					K = F.parent(L, "DD");
                F.hasClass(K, J) ? F.replaceClass(K, J, I) : F.replaceClass(K, I, J)
            })
        },
        _initSearch: function () {
            var K = F.get("#J_MtSearch"),
				J = F.get("FORM", K),
				I = F.get(".J_MtSearchQuery", J),
				L = F.attr(I, "placeholder"),
				H = this;
            if (D.UA.ie) {
                I.value = L;
                B.on(I, "focus", function () {
                    if (D.trim(I.value) === L) {
                        I.value = ""
                    }
                    F.addClass(K, "mt-focus")
                });
                B.on(I, "blur", function () {
                    if (D.trim(I.value) === "") {
                        I.value = L
                    }
                    F.removeClass(K, "mt-focus")
                })
            }
            B.on(J, "submit", function (O) {
                O.halt();
                var N = D.trim(I.value);
                if (N !== "" && N !== L) {
                    J.submit()
                } else {
                    D.use("overlay", function () {
                        var Q, P;
                        Q = '<div class="mt-overlay"><table class="mt-panel"><tbody><tr><td class="top_l"></td><td class="top_c"></td><td class="top_r"></td></tr><tr><td class="mid_l"></td><td class="mid_c"><div id="mt-content"><div id="mt-content-panel"><div class="hd"><h4>\u5c0f\u63d0\u793a</h4></div><div class="bd">\u8bf7\u8f93\u5165\u641c\u7d22\u5185\u5bb9</div><div class="ft"><a href="" id="J_MtBtnSure">\u786e\u5b9a</a></div></div><div id="J_MtBtnClose" class="mt-close"></div></div></td><td class="mid_r"></td></tr><tr><td class="bottom_l"></td><td class="bottom_c"></td><td class="bottom_r"></td></tr></tbody></table></div>';
                        P = new D.Overlay({
                            content: Q,
                            elCls: "mt-popup",
                            mask: false,
                            zIndex: 990,
                            align: {
                                points: ["cc", "cc"]
                            }
                        });
                        B.on(["#J_MtBtnClose", "#J_MtBtnSure"], "click", function (R) {
                            R.preventDefault();
                            P.destroy()
                        });
                        P.render()
                    })
                }
            });
            var M = function () {
                D.use("suggest", function () {
                    var N = new D.Suggest(I, "http://suggest.taobao.com/sug?code=utf-8", {
                        resultFormat: "",
                        containerCls: "mt-search-suggest"
                    });
                    N.on("beforeStart", function (O) {
                        if (H._searchType == "shop") {
                            return false
                        }
                        return true
                    })
                });
                B.remove(I, "focus", M)
            };
            B.on(I, "focus", M);
            this.initSearchType(".J_Type")
        },
        initSearchType: function (J) {
            var I = this,
				H = F.query(J, F.get("#J_MtSearch"))[0];
            if (!H) {
                return
            }
            B.on(H, "mouseenter mouseleave", function (K) {
                if (K.type == "mouseenter") {
                    F.addClass(this, "hover")
                } else {
                    F.removeClass(this, "hover")
                }
            });
            B.on(F.query("dt", H), "click", function (M) {
                var K = D.get("a", this),
					N = F.attr(K, "data-type"),
					L = C._getSearchURL(N);
                F.attr(C._searchForm(), "action", L);
                I._searchType = N;
                F.prepend(this, D.get("dl", H));
                F.removeClass(H, "hover")
            })
        },
        _initRecentApp: function () {
            var J = location.href,
				K = /daily/,
				P = K.test(J),
				I = P ? "http://yingyong.daily.taobao.net/json/menu/recent_apps.htm" : "http://yingyong.taobao.com/json/menu/recent_apps.htm",
				M = F.get("#J_MtRecentApp"),
				O = F.children(M)[0];
            if (!M) {
                return
            }
            function N() {
                D.later(function () {
                    var Q = F.query(".J_AppIcons", M);
                    D.each(Q, function (R) {
                        var S = F.attr(R, "data-background");
                        F.css(R, {
                            background: "url(" + S + ") no-repeat 4px 3px"
                        })
                    })
                }, 0)
            }
            var L = {
                success: function () {
                    var R = window._i_recents;
                    if (!D.isPlainObject(R)) {
                        return L.error()
                    }
                    var T = R.apps["list"],
						U = R.apps["size"];
                    if (!T.length) {
                        return L.error()
                    }
                    var V = document.createDocumentFragment(),
						Q = '<dd><a target="{target}" href="{url}" data-static="{data}" class="{className}"><s class="J_AppIcons" data-background="{icon}"></s>{name}</a></dd>';
                    for (var S = Math.min(U, T.length); S > 0; S--) {
                        var W = T[S - 1];
                        W = F.create(D.substitute(W.icon ? Q : Q, W));
                        F.prepend(W, V)
                    }
                    F.insertAfter(V, O);
                    V = null;
                    F.css("#recommend-app", {
                        height: "1%"
                    });
                    N()
                },
                error: function () {
                    N();
                    F.removeClass(F.query(".hide", M), "hide")
                },
                charset: "gbk",
                timeout: 10
            };
            D.getScript(I, L);
            var H = {
                "\u6211\u7684\u9996\u9875": "hp",
                "\u5173\u6ce8": "fw",
                "\u597d\u53cb": "fd",
                "\u627e\u4eba": "ffw",
                "\u627e\u5173\u6ce8": "ffd",
                flash: "flash",
                "\u8bd5\u7528\u65b0\u7248": "new",
                "\u8fd4\u56de\u65e7\u7248": "old",
                "\u7535\u5f71\u7968\u5728\u7ebf\u8ba2\u8d2d": "ticket",
                "\u5065\u5eb7\u52a9\u624b": "health",
                "\u80b2\u513f\u4e2d\u5fc3": "baby",
                "\u7f8e\u98df\u76d2\u5b50": "food",
                "\u65e5\u5fd7": "log",
                "\u76f8\u518c": "photo",
                "\u8f6c\u5e16": "zt",
                "\u53fd\u6b6a": "jy",
                "\u6295\u7968": "tp",
                "\u597d\u53cb\u5370\u8c61": "hyyx",
                "\u793c\u7269": "lw",
                "\u6dd8\u5e2e\u6d3e": "tbp",
                "\u5e2e\u6211\u6311": "bwt",
                "\u6253\u542c": "dt",
                "\u6dd8\u91d1\u5e01": "tjb",
                "\u5b9d\u8d1d\u5206\u4eab": "bbfx",
                "\u6dd8\u5b9d\u8fbe\u4eba": "tbdr",
                "\u805a\u5212\u7b97": "jhs",
                "\u5f00\u5fc3\u53a8\u623f": "kxcf",
                "\u5fb7\u514b\u8428\u65af\u6251\u514b": "zzpk",
                "\u5c0f\u6e38\u620f\u4e2d\u5fc3": "gc",
                "\u5feb\u4e50\u5c9b\u4e3b": "kldz",
                "\u697c\u4e00\u5e62": "lyz",
                "\u9633\u5149\u7267\u573a": "ygmc",
                "\u68a6\u60f3\u82b1\u56ed": "mxhy",
                "\u5b9d\u8d1d\u661f\u7403": "bbxq",
                "\u5c0f\u5c0f\u6218\u4e89": "xxzz",
                "\u5feb\u4e50\u63a2\u5b9d": "kltb",
                "\u5c0f\u5c0f\u591c\u5e97": "xxyd",
                "\u8054\u4f17\u68cb\u724c": "lzqp",
                "\u679c\u679c\u5e2e": "ggb",
                "\u6211\u662f\u4e70\u5bb6": "buyer",
                "\u6211\u662f\u5356\u5bb6": "seller",
                "\u8d26\u53f7\u7ba1\u7406": "account",
                "\u5e94\u7528\u4e2d\u5fc3": "app",
                "\u6211\u7684\u8d2d\u7269\u8f66": "cart",
                "\u5df2\u4e70\u5230\u7684\u5b9d\u8d1d": "buyauc",
                "\u7ade\u62cd\u7684\u5b9d\u8d1d": "paauc",
                "\u6211\u7684\u673a\u7968/\u9152\u5e97/\u4fdd\u9669": "airticket",
                "\u6211\u7684\u5f69\u7968": "lottery",
                "\u6211\u7684\u7f51\u6e38": "mom",
                "\u8d2d\u4e70\u8fc7\u7684\u5e97\u94fa": "buyshop",
                "\u6211\u7684\u6536\u85cf": "collect",
                "\u6211\u7684\u79ef\u5206": "ponit",
                "\u6211\u7684\u4f18\u60e0\u5361\u5238": "card",
                "\u6211\u7684\u4fe1\u7528\u7ba1\u7406": "credit",
                "\u9000\u6b3e\u7ba1\u7406": "refund",
                "\u7ef4\u6743\u7ba1\u7406": "weiquan",
                "\u4e3e\u62a5\u7ba1\u7406": "jubao",
                "\u54a8\u8be2/\u56de\u590d": "zixun",
                "\u6211\u8981\u4ed8\u6b3e": "alipay",
                "\u6c34\u7535\u7164\u7f34\u8d39": "sdm",
                "\u4fe1\u7528\u5361\u8fd8\u6b3e": "ccard",
                "\u7f16\u8f91\u5934\u50cf": "bjtx",
                "\u4e2a\u4eba\u8d44\u6599": "grzl",
                "\u9690\u79c1\u8bbe\u7f6e": "yssz",
                "\u4e2a\u4eba\u4e3b\u9875": "grzy",
                "\u4fe1\u7528\u7ba1\u7406": "xygl",
                "\u6211\u7684\u652f\u4ed8\u5b9d": "zfb",
                vip: "vip",
                "\u7279\u6743": "tq",
                "\u9886\u53d6\u5f53\u65e5\u6dd8\u91d1\u5e01": "lqtjb",
                "\u79ef\u5206": "jf",
                "\u5e97\u94fa\u4f18\u60e0\u5238": "dpyhq",
                "\u5f85\u4ed8\u6b3e": "dfk",
                "\u5f85\u786e\u8ba4\u6536\u8d27": "dqrsh",
                "\u5f85\u8bc4\u4ef7": "dpj",
                "\u63a8\u8350\u5e94\u7528": "recommend",
                "\u6dd8\u5b9d\u65b0\u9c9c\u4e8b": "news"
            };
            B.on(document, "click", function (U) {
                var V = U.target,
					T, S = "",
					R;
                if ("A" !== V.nodeName.toUpperCase()) {
                    T = F.parent(V, "A");
                    if (!T) {
                        return
                    }
                    V = T
                }
                if (F.attr(V, "data-analytics-key")) {
                    S = F.attr(V, "data-analytics-key")
                } else {
                    S = D.trim(F.html(V))
                }
                S = S.replace(/<\/?[a-z][a-z0-9]*[^<>]*>|\(|\)|\d+|^\s+|\s+$/gi, "");
                R = H[S];
                if (R) {
                    var Q = new Image();
                    Q.src = "http://log.mmstat.com/jsclick?mytaobao_sns=" + R + "&cache=" + D.guid();
                    Q = null
                }
            });
            B.on(document, "click", function (U) {
                var V = U.target,
					T = F.attr(V, "data-static"),
					S = (T || "a" === V.nodeName.toLowerCase()) ? V : F.parent(V, "a"),
					Q;
                if (S) {
                    T = F.attr(S, "data-static");
                    Q = new Image();
                    if (T) {
                        var R = function (X) {
                            if (!/^\d+\.\d+\.\d+$/.test(X)) {
                                return false
                            }
                            var Y = X.split(".");
                            var W = "http://log.mmstat.com/tbyy.2.1?modid=" + Y[0] + "&appid=" + Y[1] + "&catid=" + Y[2] + "&url=" + encodeURI(location.href.replace(location.hash, ""));
                            return W + new Date().getTime()
                        };
                        Q.src = R(T)
                    }
                    if (S.className.toLowerCase() === "mytaodan") {
                        Q.src = " http://log.mmstat.com/sns.2.7.2?tracelog=mytaobaomytaodan&cache=" + new Date().getTime()
                    }
                    Q = null
                }
            })
        },
        _initRecommentApp: function () {
            var H = D.get("#J_Recommend_App");
            if (!H) {
                return
            }
            var K = location.host.indexOf(".daily.") > -1 ? "assets.daily.taobao.net" : "a.tbcdn.cn";
            var J = F.attr(H, "data-timestamp");
            var L = "http://" + K + "/apps/stargate/appcenter/release/API/recommend.css?t=" + J + ".css",
				I = "http://" + K + "/apps/stargate/appcenter/release/API/recommend.js?t=" + J + ".js";
            D.getScript(L);
            D.getScript(I, function () {
                try {
                    APPCENTER.recommend.init(H)
                } catch (M) {
                    D.log("appcenter: recommend init failed")
                }
            })
        },
        myQuanziPop: function () {
            var I = this;
            var J;
            var H = {
                targetNode: F.get("#J_quanzi"),
                targetShowNode: F.query("dd", F.get("#J_quanzi"))[0],
                _mouseEventCallBack: function (K) {
                    if (K.type == "mouseenter") {
                        J && J.cancel();
                        H._mouseenter()
                    } else {
                        if (K.type == "mouseleave") {
                            J = D.later(function () {
                                H._mouseleave()
                            }, 300)
                        }
                    }
                },
                _clickEventCallBack: function (K) {
                    window.open("http://yiqi.taobao.com/plus/group_square.htm?tracelog=sns_yiqi_mytaobao4")
                },
                _mouseEnterLoadData: function (K) {
                    new Image().src = "http://log.mmstat.com/sns.17.5?cache=" + new Date().getTime();
                    I._loadQzData().getQzContData()
                },
                _mouseenter: function () {
                    F.show(this.targetShowNode);
                    F.addClass(this.targetNode, "myqz-hover")
                },
                _mouseleave: function () {
                    F.hide(this.targetShowNode);
                    F.removeClass(this.targetNode, "myqz-hover")
                }
            };
            if (H.targetNode) {
                B.on(H.targetNode, "mouseenter mouseleave", H._mouseEventCallBack);
                B.on(H.targetShowNode, "mouseenter mouseleave", H._mouseEventCallBack);
                B.on(F.query("dt", H.targetNode)[0], "click", H._clickEventCallBack)
            }
            B.on(H.targetNode, "mouseenter", H._mouseEnterLoadData)
        },
        _loadQzData: function () {
            var J = "GROUPLUS_567_" + F.attr(F.get("#J_quanzi"), "data-userid");
            var I = location.host.indexOf(".daily.") > -1 ? "count.config-vip.taobao.net:8888/counter3" : "count.tbcdn.cn/counter5";
            var H = {
                checkResult: false,
                emptyDataNode: F.get("#J_EmptyData"),
                targetNode: F.get("#J_GetData"),
                _ajaxCheck: "http://" + I + "?keys=" + J,
                _ajaxConURL: F.attr(F.get("#J_GetData"), "data-url-getcontent"),
                _ajaxCountURL: F.attr(F.get("#J_GetData"), "data-url-getupdatingcount"),
                _XHR: function (M, N, O, L) {
                    var K = this;
                    D.io({
                        url: M,
                        data: N,
                        carset: "gbk",
                        dataType: "jsonp",
                        jsonp: "callback",
                        success: function (Q) {
                            var P = Q;
                            O && O.call(K, P)
                        },
                        error: function (P) {
                            K._errorExe()
                        }
                    })
                },
                _errorExe: function () {
                    F.removeClass(this.emptyDataNode, "hide");
                    F.addClass(this.targetNode, "hide")
                },
                _requireConCallBack: function (K) {
                    if (K.code == 1 || K.code == "1") {
                        new Image().src = "http://log.mmstat.com/sns.17.23?cache=" + new Date().getTime();
                        F.html(this.targetNode, K.html);
                        F.html(F.get("#J_QzNum"), K.groupnum)
                    } else {
                        this._errorExe()
                    }
                },
                _requireCountCallBack: function (K) {
                    if (K.code == 1 || K.code == "1") {
                        if (K.updateCount == "0") {
                            return
                        }
                        F.html(F.get("#J_QzNum"), "(" + K.updateCount + ")")
                    } else {
                        this._errorExe()
                    }
                },
                _requireCheck: function (L) {
                    var K = this;
                    D.io({
                        url: K._ajaxCheck,
                        carset: "gbk",
                        dataType: "jsonp",
                        jsonp: "callback",
                        async: false,
                        success: function (M) {
                            if (M[J] == 0) {
                                K._errorExe();
                                return
                            }
                            if (L == "CountData") { } else {
                                if (L == "ContData") {
                                    K._XHR(K._ajaxConURL, null, K._requireConCallBack)
                                }
                            }
                            K.checkResult = true
                        },
                        error: function (M) {
                            K._errorExe()
                        }
                    })
                },
                initCountData: function () {
                    this._requireCheck("CountData")
                },
                getQzContData: function () {
                    this._requireCheck("ContData")
                }
            };
            return H
        }
    };
    MTB.mtBase = G;
    G.init()
})();