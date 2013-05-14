/*pub-1|2013-03-13 14:30:38*/
KISSY.add("dragdrop", function (M) {
    var B = M.Event,
		A = M.DOM,
		E = document,
		J = window,
		H = {
		    axis: 0,
		    region: false,
		    handle: false,
		    not: false,
		    revert: false,
		    snap: false,
		    scroll: false,
		    lock: false,
		    circular: false,
		    multi: false,
		    resize: false,
		    proxy: false,
		    delay: false,
		    resizefn: false,
		    cursor: false
		}, C = false,
		L = function (P, R) {
		    var Q = P;
		    var P = M.makeArray(M.query(P)),
				S = this,
				R = M.merge(H, R || {});
		    M.each(P, function (T) {
		        S._init(T, R, Q)
		    })
		}, O = function (P, Q, R) {
		    return (P > R ? R : P < Q ? Q : P)
		}, I = function (P) {
		    var R = A.css(P, "position"),
				Q;
		    if (R.toLowerCase() == "absolute") {
		        Q = [P.offsetLeft, P.offsetTop]
		    } else {
		        if (R.toLowerCase() == "relative") {
		            Q = [parseInt(A.css(P, "left")) || 0, parseInt(A.css(P, "top")) || 0]
		        }
		    }
		    return Q
		}, N = function (X, P, W, U, Q) {
		    if (W.toLowerCase() === "left") {
		        var V = "offsetWidth",
					S = 3,
					T = 1;
		        if (M.UA.ie) {
		            V = "clientWidth"
		        }
		    } else {
		        var V = "offsetHeight",
					S = 0,
					T = 2,
					R = "clientHeight";
		        if (M.UA.ie) {
		            V = "clientHeight"
		        }
		    }
		    if (P.region) {
		        num = O(parseInt(X.style[W]) + U, P.region[S], P.region[T])
		    } else {
		        num = parseInt(X.style[W]) + U
		    }
		    return num
		}, K = function (Q, R, P) {
		    if (R.toLowerCase() === "left") {
		        if (M.UA.ie) {
		            num = O(parseInt(Q.style[R]) + P, 0, M.DOM.viewportWidth() - Q.clientWidth - 2)
		        } else {
		            num = O(parseInt(Q.style[R]) + P, 0, M.DOM.viewportWidth() - Q.clientWidth - 2 - 17)
		        }
		    } else {
		        num = O(parseInt(Q.style[R]) + P, parseInt(Q.style[R]) - parseInt(A.offset(Q).top) + (E.documentElement.scrollTop || E.body.scrollTop), 99999)
		    }
		    return num
		}, G = function (P, Q) {
		    if (M.isArray(Q)) {
		        for (var R = 0; R < Q.length; R++) {
		            if (A.hasClass(P, Q[R].substr(1))) {
		                return true
		            }
		        }
		    } else {
		        if (A.hasClass(P, Q.substr(1))) {
		            return true
		        }
		    }
		}, D = function (P) {
		    var Q = P.cloneNode(true);
		    E.body.appendChild(Q);
		    return Q
		};
    setRegion = function (Q, P) {
        P[0] = parseInt(A.css(Q, "top")) - P[0];
        P[1] = parseInt(A.css(Q, "left")) + P[1];
        P[2] = parseInt(A.css(Q, "top")) + P[2];
        P[3] = parseInt(A.css(Q, "left")) - P[3];
        return P
    };
    M.augment(L, {
        _init: function (W, U, a) {
            var d, f, R, V, c = false,
				Z = false,
				X = this,
				T = false,
				Q = U.snap,
				h = [0, 0];
            (function () {
                var k = false;
                if (M.isString(U.region) && U.region.toLowerCase() != "scroll") {
                    var j = A.get(U.region);
                    U.region = [A.offset(W).top - A.offset(j).top, (A.offset(j).left + j.offsetWidth) - (A.offset(W).left + W.offsetWidth), (A.offset(j).top + j.offsetHeight) - (A.offset(W).top + W.offsetHeight), A.offset(W).left - A.offset(j).left];
                    k = true
                } else {
                    if (M.isString(U.region) && U.region.toLowerCase() == "scroll") {
                        U.region = [A.offset(W).top, E.documentElement.clientWidth - A.offset(W).left - W.offsetWidth, E.documentElement.clientHeight - A.offset(W).top - W.offsetHeight, A.offset(W).left];
                        k = true
                    } else {
                        if (U.region.length == 4 && M.isArray(U.region)) { }
                    }
                }
                if (k) {
                    setRegion(W, U.region)
                }
                k = false
            })();
            if (U.circular) {
                var b = I(W, U)[0] + U.circular + 30,
					e = I(W, U)[1] + 30
            }
            var i = function (j) {
                if (U.islock) {
                    C = true
                }
                if (U.not && G(j.target, U.not)) {
                    return
                }
                T = true;
                h = I(W);
                R = j.clientX;
                V = j.clientY;
                if (!c && U.proxy) {
                    Z = W;
                    c = D(W);
                    W = c
                }
                A.css(W, "left", h[0] + "px");
                A.css(W, "top", h[1] + "px");
                if (U.cursor) {
                    A.css(W, "cursor", U.cursor)
                }
                X.onStartDrag && X.onStartDrag(j, W, U)
            }, g = function (j) {
                if (!T || X.isLock(U)) {
                    return
                }
                d = j.clientX - R;
                f = j.clientY - V;
                if (U.circular) {
                    angle = Math.atan2(j.clientX - b, j.clientY - e);
                    A.css(W, "left", b + Math.sin(angle) * U.circular - 30 + "px");
                    A.css(W, "top", e + Math.cos(angle) * U.circular - 30 + "px")
                } else {
                    if (U.snap) {
                        A.css(W, "left", parseInt(W.style.left) + Math.round(d / Q[0]) * Q[0] + "px");
                        A.css(W, "top", parseInt(W.style.top) + Math.round(f / Q[1]) * Q[1] + "px");
                        R = R + Math.round(d / Q[0]) * Q[0];
                        V = V + Math.round(f / Q[1]) * Q[1]
                    } else {
                        if (U.resize) {
                            var m = parseInt(A.css(W, "width")),
								k = parseInt(A.css(W, "height"));
                            if (U.resizefn[0]) {
                                if (Math.max(20, m + d) > U.resizefn[0]) {
                                    if (d > 0 && (j.clientX <= parseInt(A.offset(W).left) + m)) {
                                        d = 0
                                    }
                                    A.css(W, "width", Math.max(20, m + d) + "px")
                                }
                            }
                            if (U.resizefn[1]) {
                                if (Math.max(20, k + f) > U.resizefn[1]) {
                                    if (f > 0 && (parseInt(j.clientY) <= parseInt(A.offset(W).top) + k - parseInt(E.documentElement.scrollTop || E.body.scrollTop))) {
                                        f = 0
                                    } else {
                                        A.css(W, "height", Math.max(20, k + f) + "px")
                                    }
                                }
                            }
                            R = j.clientX;
                            V = j.clientY
                        } else {
                            if (U.scroll) {
                                if (U.axis != "y") {
                                    A.css(W, "left", K(W, "left", d) + "px")
                                }
                                if (U.axis != "x") {
                                    A.css(W, "top", K(W, "top", f) + "px")
                                }
                                R = j.clientX;
                                V = j.clientY
                            } else {
                                if (U.multi && A.hasClass(W, "ks-multi")) {
                                    var l = M.makeArray(M.query(".ks-multi"));
                                    if (l == 0) {
                                        l = [W]
                                    }
                                } else {
                                    l = [W]
                                }
                                M.each(l, function (n) {
                                    if (U.axis != "y") {
                                        A.css(n, "left", N(n, U, "left", d, h) + "px")
                                    }
                                    if (U.axis != "x") {
                                        A.css(n, "top", N(n, U, "top", f, h) + "px")
                                    }
                                });
                                R = j.clientX;
                                V = j.clientY
                            }
                        }
                    }
                }
                if (M.UA.chrome) {
                    B.on(document, "selectstart", function (n) {
                        n.halt()
                    })
                }
                J.getSelection ? J.getSelection().removeAllRanges() : E.selection.empty();
                X.onDrag && X.onDrag(j, W, U, d, f, a)
            }, S = function (j) {
                if (T != true) {
                    return
                }
                T = false;
                B.remove(E, "mousemove", g);
                J.getSelection ? J.getSelection().removeAllRanges() : E.selection.empty();
                if (c && U.proxy) {
                    A.css(Z, "left", parseInt(c.style.left) + "px");
                    A.css(Z, "top", parseInt(c.style.top) + "px");
                    W = Z;
                    c.parentNode.removeChild(c);
                    c = false;
                    Z = false
                }
                if (U.revert) {
                    A.css(W, "left", h[0] + "px");
                    A.css(W, "top", h[1] + "px")
                }
                if (U.cursor) {
                    A.css(W, "cursor", "default")
                }
                X.onEndDrag && X.onEndDrag(j, W, U);
                if (M.UA.chrome) {
                    B.remove(document, "selectstart")
                }
            }, P = function (j) {
                if (!A.hasClass(W, "ks-multi")) {
                    A.addClass(W, "ks-multi")
                } else {
                    A.removeClass(W, "ks-multi")
                }
            };
            B.add(M.get(U.handle, W) || W, "mousedown", function (j) {
                i(j);
                B.add(E, "mousemove", g)
            });
            B.add(E, "mouseup", S);
            if (U.multi) {
                B.add(W, "dblclick", P)
            }
        },
        onStartDrag: null,
        onDrag: null,
        onEndDrag: null,
        isLock: function () {
            return C
        }
    });
    M.Drag = L;

    function F(R, T, W, P, U, V, Q, S) {
        if (U >= W || V >= P || Q <= R || S <= T) {
            return false
        } else {
            return true
        }
    }
    M.Drag.intersectRect = F
});
var TDog = (function (F) {
    var A = F.DOM,
		G = TStart,
		D = window,
		B = D.g_config && D.g_config.appId,
		L = G.isOnline,
		K = G.Config.DOMAIN,
		C = (function () {
		    var M = location.hostname;
		    if (M.indexOf("tmall.com") > 0) {
		        M = "webww.tmall.com"
		    } else {
		        if (M.indexOf("tmall.net") > 0) {
		            M = "webww.daily.tmall.net:8080"
		        } else {
		            if (M.indexOf("taobao.net") > 0) {
		                M = "webww.daily.taobao.net:8080"
		            } else {
		                M = "webwangwang.taobao.com"
		            }
		        }
		    }
		    return "http://" + M + "/"
		})(),
		H = (function () {
		    var M = location.hostname;
		    if (M.indexOf("tmall.com") > 0) {
		        M = "webww.tmall.com"
		    } else {
		        if (M.indexOf("tmall.net") > 0) {
		            M = "webww.daily.tmall.net:8080"
		        } else {
		            if (M.indexOf("taobao.net") > 0) {
		                M = "webww.daily.taobao.net:8080"
		            } else {
		                M = "get.webwangwang.taobao.com"
		            }
		        }
		    }
		    return "http://" + M + "/"
		})(),
		I = ".do",
		E = "http://www.taobao.com/wangwang/2010_fp/buyer.php?tracelogww2010=webww",
		J = "http://www.taobao.com/wangwang/2010_fp/seller.php?tracelogww2010=webww";
    return {
        version: "1.0",
        _MODS: {},
        add: function (N, M) {
            return this._MODS[N] = M(TDog)
        },
        Config: {
            getTokenUrl: C + "gettoken" + I,
            loginUrl: C + "login" + I,
            getLoginResultUrl: C + "getloginresult" + I,
            startUrl: C + "start" + I,
            receiveUrl: C + "receive" + I,
            sendUrl: C + "send" + I,
            getUrl: C + "get" + I,
            notifyUrl: H + "connection.html?t=20110322",
            connectionURL: C + "buildconnection" + I,
            checkAutoLoginUrl: C + "usertag.do",
            getTalkUsers: C + "gettalkusers" + I,
            ackGetMessage: C + "ackgetmessage" + I,
            tbLoginUrl: "https://login." + K + "/member/login.jhtml?f=top",
            tmsAdUrl: "http://www.taobao.com/go/rgn/tdog/link-for-chat-window.php",
            tmsBulletinUrl: "http://www.taobao.com/go/rgn/webww/wangwang-bulletin.php",
            clearUrl: C + "clear.do",
            clearListUrl: C + "clear.do?act=2",
            setAutoLoginUrl: C + "usertag.do",
            TagKeyUrl: C + "tagkey.do",
            LIGHT_NICK: "wwlight",
            forceAutoLogin: false,
            appId: B,
            X: "x",
            NOTIFY_STATUS: {
                logout: {
                    key: 0,
                    value: -1
                },
                timeout: {
                    key: 1,
                    value: -2
                },
                message: {
                    key: 2,
                    value: -3
                },
                close: {
                    key: 3,
                    value: -4
                },
                notMessage: {
                    key: 4,
                    value: 0
                }
            },
            downloadWangWangURLBuy: E,
            downloadWangWangURLSeller: J,
            DOMAIN: K,
            LOGIN_KEY: "login_key",
            hash: [9, 6, 7, 19, 15, 22, 2, 26, 18, 24, 21, 25, 16, 13, 25, 12]
        },
        isReady: false,
        init: function (W, P) {
            F.log("\u5f00\u59cb\u521d\u59cb\u5316 Web \u65fa\u65fa");
            var V = this,
				Z = V.Util,
				O = V.Config,
				N = V.Login,
				S = V.SysTips,
				a = V.DataManager,
				R = F.Cookie.get(O.X),
				M = F.get("#tstart");
            N.init();
            V.host = W;
            V.hostEl = P;
            S.init();
            V.StatusIcon.init();
            V.EventCenter.init();
            if (F.unparam(R).p === "tdog" || Light.addonIsOK() || !a.getNickName()) {
                F.log("\u63a7\u4ef6\u5b89\u88c5\u6b63\u5e38\u6216\u6dd8\u5b9d\u672a\u767b\u5f55\uff0cWeb \u65fa\u65fa\u9000\u51fa\u521d\u59cb\u5316");
                A.addClass(M, "tstart-tdog-disabled");
                return
            } else {
                if (Light.addonIsOK()) {
                    F.log("\u63a7\u4ef6\u5b89\u88c5\u6b63\u5e38\uff0c\u5de5\u5177\u6761\u4e0a\u4e0d\u663e\u793a Web \u65fa\u65fa\uff0c\u9000\u51fa\u521d\u59cb\u5316");
                    A.addClass(M, "tstart-tdog-disabled");
                    return
                } else {
                    if (Light.addonIsOK()) {
                        F.log("\u63a7\u4ef6\u5b89\u88c5\u6b63\u5e38\uff0c\u5de5\u5177\u6761\u4e0a\u4e0d\u663e\u793a Web \u65fa\u65fa\uff0c\u9000\u51fa\u521d\u59cb\u5316");
                        A.addClass(M, "tstart-tdog-disabled");
                        return
                    }
                }
            }
            A.addClass(M, "tstart-tdog-enable");
            var T = location.search;
            if (T && (T = T.substring(1))) {
                var Q = F.unparam(T),
					U = Q[O.LIGHT_NICK];
                if (B === 0) {
                    U = Z.decode(Q.touid || Q.tid)
                }
                if (U) {
                    F.log("wwlight = " + U);
                    if (!Z.hasSitePrefix(U)) {
                        U = "cntaobao" + U
                    }
                    Light.lightedUsers.push(U);
                    O.forceAutoLogin = true
                }
            }
            if (B === 7 && M) {
                M.style.zIndex = 20001
            }
            X();

            function X() {
                a.init();
                V.WebServer.init();
                V.RecentList.init();
                V.ChatDialog.init();
                V.SysMessage.init();
                V.SysPopup.init();
                V.isReady = true;
                V.EventCenter.fire(V.EVENTS.TDOG_READY)
            }
        },
        EVENTS: {
            CLICK_LIGHT_ICON: "clickLightIcon",
            CLICK_STATUS_ICON: "clickStatusIcon",
            LOGIN_START: "loginStart",
            LOGIN_SUCCESS: "loginSuccess",
            ERROR_LOGIN_FAILED: "errorLoginFailed",
            SHOW_RECENT_LIST: "showRecentList",
            SHOW_CHAT_DIALOG: "showChatDialog",
            SHOW_CHAT_MSG: "showChatMsg",
            RECEIVE_CHAT_MESSAGE: "receiveChatMessage",
            RECEIVE_SUBSCRIBE_MESSAGE: "receiveSystemMessage",
            RECEIVE_POPUP_MESSAGE: "receivePopupMessage",
            RECEIVE_LOGINOUT_SIGNAL: "receiveLoginoutSignal",
            UPDATE_USER_STATUS: "updateUserStatus",
            UPDATE_STATUS_ICON: "updateStatusIcon",
            ERROR_GET_CHAT_INFO: "errorGetChatInfo",
            UPDATE_CHAT_INFO: "updateChatInfo",
            SEND_MESSAGE: "sendMessage",
            ERROR_GET_MESSAGE: "errorGetMessage",
            UPDATE_LOCAL_STATUS: "updateLocalStatus",
            DAEMON_FIRE: "daemonFire",
            TDOG_READY: "tdogReady"
        },
        USER_STATUS: {
            1: ["offline", "\u79bb\u7ebf"],
            2: ["free", "\u5728\u7ebf"],
            3: ["busy", "\u5fd9\u788c\u4e2d"],
            4: ["away", "\u4e0d\u5728\u7535\u8111\u65c1"],
            5: ["incall", "\u63a5\u542c\u7535\u8bdd\u4e2d"],
            6: ["outofdinner", "\u5916\u51fa\u5c31\u9910"],
            7: ["wait", "\u7a0d\u5019"],
            8: ["invisible", ""],
            9: ["offlinelogin", ""],
            10: ["unknown", ""],
            11: ["fakeonline", ""],
            12: ["mobileonline", "\u624b\u673a\u5728\u7ebf"]
        },
        ERROR_MESSAGE: {
            "0": "",
            "1": "\u8d26\u6237\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u6237\u540d\u3002",
            "2": "\u60a8\u8f93\u5165\u7684\u8d26\u6237\u540d\u548c\u5bc6\u7801\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002",
            "3": '\u60a8\u7684\u5e10\u53f7\u4e0d\u80fd\u767b\u5f55\u7f51\u9875\u7248\u65fa\u65fa\uff0c\u8bf7\u4f7f\u7528\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\uff0c<a target="_blank" class="tstart-item-tips-on" href="' + J + '">\u70b9\u6b64\u4e0b\u8f7d\uff01</a>',
            "4": "\u60a8\u7684\u8d26\u6237\u6743\u9650\u4e0d\u591f\u3002",
            "5": "\u60a8\u767b\u5f55\u7684\u5e10\u53f7\u6570\u91cf\u5df2\u8d85\u8fc7\u6700\u5927\u6570\u91cf\u3002",
            "6": '\u60a8\u662fE\u5ba2\u670d\u7528\u6237\uff0c\u53ea\u80fd\u4f7f\u7528\u963f\u91cc\u65fa\u65fa\uff0c<a target="_blank" class="tstart-item-tips-on" href="' + J + '">\u70b9\u6b64\u4e0b\u8f7d\uff01</a>',
            "-1": "\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002",
            "-2": "\u5bf9\u65b9\u8d26\u53f7\u4e0d\u5b58\u5728\uff0c\u8bf7\u68c0\u67e5\u3002",
            "-3": "\u8d26\u6237\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u6237\u540d\u3002",
            "-4": "\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002",
            "-5": "\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002",
            "-6": "\u53d1\u9001\u6d88\u606f\u4e0d\u5141\u8bb8\u4e3a\u7a7a\u3002",
            "-7": "\u60a8\u53d1\u9001\u7684\u6d88\u606f\u8fc7\u957f\uff0c\u8bf7\u4e0b\u8f7d\u652f\u6301\u53d1\u9001\u8d85\u957f\u4fe1\u606f\u7684\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u3002",
            "-8": "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002",
            "-9": "\u8d26\u6237\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u6237\u540d\u3002",
            "-10": "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002",
            "-11": "\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002",
            "-12": "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002",
            "-14": "\u8bfb\u6d88\u606f\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5\u3002",
            "-15": "\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u5728\u7ebf\uff0c\u662f\u5426\u8e22\u6389\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u3002",
            "-16": "\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u5728\u7ebf\uff0c\u662f\u5426\u8e22\u6389\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u3002",
            "-17": "\u767b\u5f55\u5931\u8d25\uff0c\u975e\u6cd5\u8bf7\u6c42\u3002",
            "-100": "\u963f\u91cc\u65fa\u65fa\u5df2\u79bb\u7ebf\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002",
            "-101": "\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\uff0c\u8bf7\u767b\u5f55\u3002",
            "-102": '\u60a8\u7684\u5e10\u53f7\u88ab\u7981\u6b62\u767b\u5f55WEB\u65fa\u65fa\uff0c\u8bf7\u4f7f\u7528\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u767b\u5f55\uff08<a target="_blank" class="tstart-item-tips-on" href="' + E + '">\u70b9\u6b64\u4e0b\u8f7d\uff01</a>\uff09\u3002',
            "-1000": "\u83b7\u53d6\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002",
            "-1001": "\u83b7\u53d6\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002",
            "-40000": '\u8981\u652f\u6301\u8be5\u529f\u80fd\uff0c\u8bf7\u4e0b\u8f7d <a  target="_blank" href="' + E + '">\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef</a>'
        },
        MESSAGE_TYPE: {
            OFFLINE: 1,
            TALK: 2,
            STATUS: 3,
            LOGOUT: 4,
            SYSTEM: 5,
            SELF: 6
        },
        MESSAGE_SUBTYPE: {
            TALK_MESSAGE: 201,
            AUTO_BACK_TALK_MESSAGE: 202,
            NEED_AUTH: 204,
            FAIL_ACK: 205,
            FILE_MESSAGE: 206,
            PIC_MESSAGE: 207,
            GRAFFITI: 208,
            REMOTE_ASSIST: 209,
            AV: 210,
            FOLDER: 211,
            ILLEGALITY: 212,
            PEER_VERIFY: 213,
            NO_HEARTBEAT: 401,
            OTHER_LOGIN: 402,
            SESSION_TIMEOUT: 403,
            POPUP_MESSAGE: 501,
            SUBSCRIBE_MESSAGE: 502
        },
        UNSUPPORT_MSG: {
            204: "\u5bf9\u65b9\u9700\u8981\u9a8c\u8bc1\uff0c\u6682\u65f6\u65e0\u6cd5\u53d1\u9001\u3002",
            205: "\u53d1\u9001\u3010{content}\u3011\u6d88\u606f\u5931\u8d25\u3002",
            206: "\u5bf9\u65b9\u6b63\u5411\u60a8\u4f20\u6587\u4ef6\u3002",
            207: "\u5bf9\u65b9\u6b63\u5411\u60a8\u53d1\u56fe\u7247\u3002",
            208: "\u5bf9\u65b9\u6b63\u9080\u8bf7\u60a8\u6d82\u9e26\u3002",
            209: "\u5bf9\u65b9\u6b63\u9080\u8bf7\u60a8\u8fdc\u7a0b\u534f\u52a9\u3002",
            210: "\u5bf9\u65b9\u6b63\u9080\u8bf7\u60a8\u8bed\u97f3\u89c6\u9891\u3002",
            211: "\u5bf9\u65b9\u6b63\u5411\u60a8\u4f20\u6587\u4ef6\u5939\u3002",
            212: "\u60a8\u53d1\u9001\u7684\u6d88\u606f\u4e2d\u53ef\u80fd\u5305\u542b\u4e86\u6076\u610f\u7f51\u5740\u3001\u8fdd\u89c4\u5e7f\u544a\u53ca\u5176\u4ed6\u7c7b\u5173\u952e\u8bcd\uff0c\u8bf7\u505c\u6b62\u53d1\u9001\u7c7b\u4f3c\u7684\u6d88\u606f\uff01",
            213: "\u5bf9\u65b9\u9700\u8981\u9a8c\u8bc1\uff0c\u6682\u65f6\u65e0\u6cd5\u53d1\u9001\u3002"
        },
        SITES: {
            TAOBAO: "cntaobao",
            YAHOO: "chnyahoo",
            WANGWANG: "wangwnag",
            CNALICHN: "cnalichn",
            ENALIINT: "enaliint",
            CNALIMAM: "cnalimam",
            CNKOUBEI: "cnkoubei",
            HTYAHOO: "htyahooo",
            CNWUJING: "cnwujing",
            CHNAIGOU: "chnaigou"
        }
    }
})(KISSY);
TDog.add("Util", function (B) {
    var C = KISSY,
		A = B.Config.DOMAIN;
    B.Util = {
        contains: function (F, E) {
            for (var D = F.length - 1; D >= 0; D--) {
                if (F[D].sendTime == E.sendTime && F[D].content == E.content) {
                    return true
                }
            }
            return false
        },
        uniqueArray: function (D) {
            var E = [],
				G = D.length;
            var H = function (L, J) {
                for (var K = 0, I = L.length; K < I; K++) {
                    if (L[K] == J) {
                        return true
                    }
                }
                return false
            };
            for (var F = 0; F < G; F++) {
                if (!H(E, D[F])) {
                    E.push(D[F])
                }
            }
            return E
        },
        css: function (F, D) {
            var E = KISSY.DOM;
            KISSY.each(F, function (G) {
                E.css(G[0], G[1], G[2])
            })
        },
        getRandom: function (D, E) {
            return D + parseInt((E - D + 1) * Math.random(), 10)
        },
        genUniqueName: function () {
            for (var E = 0, D = ""; E < 10; E++) {
                D += String.fromCharCode(this.getRandom(97, 122))
            }
            return "_" + D + (+new Date)
        },
        decode: function (D) {
            if (!D) {
                return ""
            }
            var F = D;
            try {
                F = decodeURIComponent(D)
            } catch (E) { }
            return F
        },
        SITES_REG: (function () {
            var D = [];
            for (var E in B.SITES) {
                D.push(B.SITES[E])
            }
            return new RegExp("^(" + D.join("|") + ")(.*)$", "i")
        })(),
        hasSitePrefix: function (D) {
            return B.Util.SITES_REG.test(D)
        },
        getUserName: function (D) {
            if (!D) {
                return ""
            }
            var E = D,
				F = D.match(B.Util.SITES_REG);
            if (F && F[1]) {
                E = D.substr(F[1].length)
            }
            return E
        },
        substitute: function (E, D) {
            return E.replace(/\{([^}]+)\}/g, function (G, F) {
                return D[F] || ""
            })
        },
        escapeHTML: function (E) {
            var D = document.createElement("div"),
				F = document.createTextNode(E);
            D.appendChild(F);
            return D.innerHTML
        },
        isTaobao: function () {
            return A === "taobao.com" || A === "taobao.net"
        },
        formatDate: function (E) {
            var D = "";
            D += E.getFullYear() + "-";
            if (E.getMonth() + 1 < 10) {
                D += "0" + (E.getMonth() + 1) + "-"
            } else {
                D += (E.getMonth() + 1) + "-"
            }
            if (E.getDate() < 10) {
                D += "0" + (E.getDate()) + " "
            } else {
                D += (E.getDate()) + " "
            }
            if (E.getHours() < 10) {
                D += "0" + E.getHours()
            } else {
                D += E.getHours()
            }
            if (E.getMinutes() < 10) {
                D += ":0" + E.getMinutes()
            } else {
                D += ":" + E.getMinutes()
            }
            if (E.getSeconds() < 10) {
                D += ":0" + E.getSeconds()
            } else {
                D += ":" + E.getSeconds()
            }
            return D
        },
        getTmsContent: function (D) {
            if (!D) {
                return
            }
            var F = this,
				E = KISSY;
            E.each(D, function (H) {
                var G = H;
                if (G.data) {
                    E.isFunction(G.hasDate) && G.hasDate()
                }
                E.later(function () {
                    B.Util.getScript(G.link + "?callback=" + G.callback + "&t=" + +new Date, {
                        onSuccess: function () {
                            E.isFunction(F.hasDate) && G.success()
                        },
                        scope: F,
                        charset: B.Config.charset || "gbk"
                    })
                }, 0)
            })
        },
        charToFace: (function () {
            var G = {
                "/:^_^": ["\u5fae\u7b11", "0"],
                "/:^$^": ["\u5bb3\u7f9e", "1"],
                "/:Q": ["\u5410\u820c\u5934", "2"],
                "/:815": ["\u5077\u7b11", "3"],
                "/:809": ["\u7231\u6155", "4"],
                "/:^O^": ["\u5927\u7b11", "5"],
                "/:081": ["\u8df3\u821e", "6"],
                "/:087": ["\u98de\u543b", "7"],
                "/:086": ["\u5b89\u6170", "8"],
                "/:H": ["\u62b1\u62b1", "9"],
                "/:012": ["\u52a0\u6cb9", "10"],
                "/:806": ["\u80dc\u5229", "11"],
                "/:b": ["\u5f3a", "12"],
                "/:^x^": ["\u4eb2\u4eb2", "13"],
                "/:814": ["\u82b1\u75f4", "14"],
                "/:^W^": ["\u9732\u9f7f\u7b11", "15"],
                "/:080": ["\u67e5\u627e", "16"],
                "/:066": ["\u547c\u53eb", "17"],
                "/:807": ["\u7b97\u8d26", "18"],
                "/:805": ["\u8d22\u8ff7", "19"],
                "/:071": ["\u597d\u4e3b\u610f", "20"],
                "/:072": ["\u9b3c\u8138", "21"],
                "/:065": ["\u5929\u4f7f", "22"],
                "/:804": ["\u518d\u89c1", "23"],
                "/:813": ["\u6d41\u53e3\u6c34", "24"],
                "/:818": ["\u4eab\u53d7", "25"],
                "/:015": ["\u8272\u60c5\u72c2", "26"],
                "/:084": ["\u5446\u82e5\u6728\u9e21", "27"],
                "/:801": ["\u601d\u8003", "28"],
                "/:811": ["\u8ff7\u60d1", "29"],
                "/:?": ["\u7591\u95ee", "30"],
                "/:077": ["\u6ca1\u94b1\u4e86", "31"],
                "/:083": ["\u65e0\u804a", "32"],
                "/:817": ["\u6000\u7591", "33"],
                "/:!": ["\u5618", "34"],
                "/:068": ["\u5c0f\u6837", "35"],
                "/:079": ["\u6447\u5934", "36"],
                "/:028": ["\u611f\u5192", "37"],
                "/:026": ["\u5c34\u5c2c", "38"],
                "/:007": ["\u50bb\u7b11", "39"],
                "/:816": ["\u4e0d\u4f1a\u5427", "40"],
                "/:&apos;&quot;&quot;": ["\u65e0\u5948", "41"],
                "/:&#39;&quot;&quot;": ["\u65e0\u5948", "41"],
                '/:\'""': ["\u65e0\u5948", "41"],
                "/:802": ["\u6d41\u6c57", "42"],
                "/:027": ["\u51c4\u51c9", "43"],
                "/:(Zz...)": ["\u56f0\u4e86", "44"],
                "/:*&amp;*": ["\u6655", "45"],
                "/:*&*": ["\u6655", "45"],
                "/:810": ["\u5fe7\u4f24", "46"],
                "/:&gt;_&lt;": ["\u59d4\u5c48", "47"],
                "/:>_<": ["\u59d4\u5c48", "47"],
                "/:018": ["\u60b2\u6ce3", "48"],
                "/:&gt;O&lt;": ["\u5927\u54ed", "49"],
                "/:>O<": ["\u5927\u54ed", "49"],
                "/:020": ["\u75db\u54ed", "50"],
                "/:044": ["I\u670d\u4e86U", "51"],
                "/:819": ["\u5bf9\u4e0d\u8d77", "52"],
                "/:085": ["\u518d\u89c1", "53"],
                "/:812": ["\u76b1\u7709", "54"],
                "/:&quot;": ["\u597d\u7d2f", "55"],
                '/:"': ["\u597d\u7d2f", "55"],
                "/:&gt;M&lt;": ["\u751f\u75c5", "56"],
                "/:>M<": ["\u751f\u75c5", "56"],
                "/:&gt;@&lt;": ["\u5410", "57"],
                "/:>@<": ["\u5410", "57"],
                "/:076": ["\u80cc", "58"],
                "/:069": ["\u60ca\u8bb6", "59"],
                "/:O=O": ["\u8001\u5927", "70"],
                "/:O": ["\u60ca\u6115", "60"],
                "/:067": ["\u95ed\u5634", "61"],
                "/:043": ["\u6b20\u6241", "62"],
                "/:P": ["\u9119\u89c6\u4f60", "63"],
                "/:808": ["\u5927\u6012", "64"],
                "/:&gt;W&lt;": ["\u751f\u6c14", "65"],
                "/:>W<": ["\u751f\u6c14", "65"],
                "/:073": ["\u8d22\u795e", "66"],
                "/:008": ["\u5b66\u4e60\u96f7\u950b", "67"],
                "/:803": ["\u606d\u559c\u53d1\u8d22", "68"],
                "/:074": ["\u5c0f\u4e8c", "69"],
                "/:036": ["\u90aa\u6076", "71"],
                "/:039": ["\u5355\u6311", "72"],
                "/:045": ["CS", "73"],
                "/:046": ["\u9690\u5f62\u4eba", "74"],
                "/:048": ["\u70b8\u5f39", "75"],
                "/:047": ["\u60ca\u58f0\u5c16\u53eb", "76"],
                "/:girl": ["\u6f02\u4eaeMM", "77"],
                "/:man": ["\u5e05\u54e5", "78"],
                "/:052": ["\u62db\u8d22\u732b", "79"],
                "/:(OK)": ["\u6210\u4ea4", "80"],
                "/:8*8": ["\u9f13\u638c", "81"],
                "/:)-(": ["\u63e1\u624b", "82"],
                "/:lip": ["\u7ea2\u5507", "83"],
                "/:-F": ["\u73ab\u7470", "84"],
                "/:-W": ["\u6b8b\u82b1", "85"],
                "/:Y": ["\u7231\u5fc3", "86"],
                "/:qp": ["\u5fc3\u788e", "87"],
                "/:$": ["\u94b1", "88"],
                "/:%": ["\u8d2d\u7269", "89"],
                "/:(&amp;)": ["\u793c\u7269", "90"],
                "/:(&)": ["\u793c\u7269", "90"],
                "/:@": ["\u6536\u90ae\u4ef6", "91"],
                "/:~B": ["\u7535\u8bdd", "92"],
                "/:U*U": ["\u4e3e\u676f\u5e86\u795d", "93"],
                "/:clock": ["\u65f6\u949f", "94"],
                "/:R": ["\u7b49\u5f85", "95"],
                "/:C": ["\u5f88\u665a\u4e86", "96"],
                "/:plane": ["\u98de\u673a", "97"],
                "/:075": ["\u652f\u4ed8\u5b9d", "98"]
            }, E = "";
            for (var D in G) {
                E += "|" + D.substring(2)
            }
            E = E.substring(1);
            E = E.replace(/([\^?()\.\*\$])/g, "\\$1");
            var F = new RegExp("\\\\T/:(" + E + ")\\\\T", "g");
            E = new RegExp("/:(" + E + ")", "g");
            return function (J, H, K) {
                if (J) {
                    if (H) {
                        var I = new RegExp("\\\\", "g");
                        J = J.replace(I, function (L) {
                            L = "\\\\";
                            return L
                        });
                        J = J.replace(E, function (L) {
                            if (G[L]) {
                                L = "\\T" + L + "\\T"
                            }
                            return L
                        })
                    } else {
                        if (K) {
                            J = J.replace(F, function (M) {
                                var L = M.substring(2, M.length - 2);
                                if (G[L]) {
                                    M = '<img src="http://a.tbcdn.cn/sys/wangwang/smiley/48x48/' + G[L][1] + '.gif" alt="' + G[L][0] + '" />'
                                }
                                return M
                            })
                        } else {
                            J = J.replace(E, function (L) {
                                if (G[L]) {
                                    L = '<img src="http://a.tbcdn.cn/sys/wangwang/smiley/48x48/' + G[L][1] + '.gif" alt="' + G[L][0] + '" />'
                                }
                                return L
                            })
                        }
                    }
                }
                return J
            }
        })(),
        faceToChar: function (D) {
            var F = ["/:^_^", "/:^$^", "/:Q", "/:815", "/:809", "/:^O^", "/:081", "/:087", "/:086", "/:H", "/:012", "/:806", "/:b", "/:^x^", "/:814", "/:^W^", "/:080", "/:066", "/:807", "/:805", "/:071", "/:072", "/:065", "/:804", "/:813", "/:818", "/:015", "/:084", "/:801", "/:811", "/:?", "/:077", "/:083", "/:817", "/:!", "/:068", "/:079", "/:028", "/:026", "/:007", "/:816", '/:\'""', "/:802", "/:027", "/:(Zz...)", "/:*&*", "/:810", "/:>_<", "/:018", "/:>O<", "/:020", "/:044", "/:819", "/:085", "/:812", '/:"', "/:>M<", "/:>@<", "/:076", "/:069", "/:O", "/:067", "/:043", "/:P", "/:808", "/:>W<", "/:073", "/:008", "/:803", "/:074", "/:O=O", "/:036", "/:039", "/:045", "/:046", "/:048", "/:047", "/:girl", "/:man", "/:052", "/:(OK)", "/:8*8", "/:)-(", "/:lip", "/:-F", "/:-W", "/:Y", "/:qp", "/:$", "/:%", "/:(&)", "/:@", "/:~B", "/:U*U", "/:clock", "/:R", "/:C", "/:plane", "/:075"];
            var E = F[parseInt(D, 10)];
            if (E) {
                E = E.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&").replace("&apos;", "'").replace("&quot;", '"').replace("&quot;", '"')
            }
            return E
        },
        getScript: function (P, E, L) {
            var F = window.document,
				G = F.getElementsByTagName("head")[0] || F.documentElement,
				J = F.createElement("script").readyState ? function (S, R) {
				    var T = S.onreadystatechange;
				    S.onreadystatechange = function () {
				        var U = S.readyState;
				        if (U === "loaded" || U === "complete") {
				            S.onreadystatechange = null;
				            T && T();
				            R.call(this)
				        }
				    }
				} : function (S, R) {
				    S.addEventListener("load", R, false)
				}, K = /\.css(?:\?|$)/i;
            var D = K.test(P),
				M = F.createElement(D ? "link" : "script"),
				N = E,
				I, H, O, Q;
            if (C.isPlainObject(N)) {
                E = N.onSuccess;
                I = N.onFailure;
                Q = N.onTimeout;
                H = N.timeout;
                L = N.charset
            }
            if (D) {
                M.href = P;
                M.rel = "stylesheet"
            } else {
                M.src = P;
                M.async = true
            }
            if (L) {
                M.charset = L
            }
            if (C.isFunction(E)) {
                if (D) {
                    E.call(M)
                } else {
                    J(M, function () {
                        if (O) {
                            O.cancel();
                            O = undefined
                        }
                        E.call(M);
                        C.later(function () {
                            G.removeChild(M);
                            M = undefined
                        }, 3000)
                    })
                }
            }
            if (C.isFunction(Q)) {
                O = C.later(function () {
                    O = undefined;
                    Q()
                }, H || 3000)
            }
            G.insertBefore(M, G.firstChild);
            return M
        },
        sendLog: function (E) {
            var D = "";
            if (C.UA.ie) {
                D = "ie" + C.UA.ie
            } else {
                if (C.UA.firefox) {
                    D = "firefox" + C.UA.firefox
                } else {
                    if (C.UA.chrome) {
                        D = "chrome" + C.UA.chrome
                    } else {
                        if (C.UA.safari) {
                            D = "safari" + C.UA.safari
                        } else {
                            if (C.UA.opera) {
                                D = "opera" + C.UA.opera
                            }
                        }
                    }
                }
            }
            C.later(function () {
                try {
                    new Image().src = "http://log.mmstat.com/ww?cache=" + new Date().getTime() + "&browse=" + D + "&" + E
                } catch (F) { }
            }, 500)
        }
    }
});
TDog.add("EventCenter", function (C) {
    var L = KISSY,
		N = C.EVENTS,
		K, I, A, Q, P, J, H, R, B, E, F, M, D, O = {
		    init: function () {
		        L.log("init EventCenter");
		        K = C.Util;
		        I = C.Config;
		        A = C.Login;
		        H = C.DataManager;
		        R = C.DataManager.Message;
		        P = C.WebServer;
		        J = C.Daemon;
		        Q = C.LocalStorage;
		        B = C.SysTips;
		        E = C.SysMessage;
		        F = C.StatusIcon;
		        M = C.RecentList;
		        D = C.ChatDialog
		    }
		};
    L.mix(O, L.EventTarget);
    var G = function (S) {
        return typeof S !== "string" || S === ""
    };
    O.on(N.CLICK_STATUS_ICON, function () {
        L.log("\u70b9\u51fb\u72b6\u6001\u56fe\u6807");
        if (A.canTalk()) {
            if (!M.isOpen()) {
                F.online()
            } else {
                if (H.getTotalUnreadMsgCount() > 0) {
                    F.getmessage()
                }
            }
            if (H.getTotalUnreadMsgCount() > 0) {
                if (!M.isOpen()) {
                    if (H.getTotalUnreadMsgCount() === 1) {
                        O.fire(N.SHOW_CHAT_DIALOG, {
                            haveUser: {
                                userName: "donotknow"
                            }
                        });
                        return false
                    }
                }
            }
            return true
        } else {
            return false
        }
    });
    O.on(N.CLICK_LIGHT_ICON, function (S) {
        L.log("\u70b9\u51fb\u4eae\u706f\u56fe\u6807");
        var T = S.userInfo;
        if (A.canTalk(T.key, true)) {
            T.fromLight = true;
            O.fire(C.EVENTS.SHOW_CHAT_DIALOG, S)
        }
    });
    O.on(N.LOGIN_START, function () {
        if (C.Login.online == false) { } else {
            F.onlogin();
            C.Login.online = false
        }
    });
    O.on(N.LOGIN_SUCCESS, function () {
        L.log("\u767b\u5f55\u6210\u529f");
        B.hide();
        C.Login.ready = false;
        var S = Light.lightedUsers,
			U, X;
        while (S.length) {
            U = S.shift();
            L.log("\u81ea\u52a8\u6253\u5f00\u548c " + U + " \u7684\u804a\u5929\u7a97\u53e3");
            if (U) {
                if (!(X = Light.data[U])) {
                    var T = L.unparam(location.search.substring(1)),
						V = T.touid || T.tid;
                    if (V) {
                        X = {
                            key: U,
                            userName: K.getUserName(V),
                            userId: V,
                            status: T.status || 1,
                            itemId: T.gid,
                            subscribed: false
                        }
                    }
                    Light.data[U] = X
                }
                if (X) {
                    X.fromLight = true;
                    L.later(function () {
                        O.fire(C.EVENTS.SHOW_CHAT_DIALOG, {
                            userInfo: X
                        })
                    }, 1000)
                }
            }
        }
        var W = H.getTotalUnreadMsgCount();
        if (W > 0) {
            L.log("\u5b58\u5728\u672a\u8bfb\u6d88\u606f " + W);
            F.getmessage()
        } else {
            F.online()
        }
    });
    O.on(N.ERROR_LOGIN_FAILED, function (S) {
        L.log("\u767b\u5f55\u5931\u8d25");
        var U = S.error || {}, T = parseInt(U.code, 10);
        if (T === -100 || T === -101) {
            A.directToTBLogin()
        } else {
            F.offline();
            B.show(C.ERROR_MESSAGE[T] || U.errorMessage || C.ERROR_MESSAGE[-1], 200)
        }
    });
    O.on(N.SHOW_RECENT_LIST, function (S) {
        L.log("\u6253\u5f00\u6700\u8fd1\u8054\u7cfb\u4eba");
        if (!C.DataManager.isLogin()) {
            return
        }
        P.getTalkUsers();
        L.DOM.removeClass(L.DOM.get(".tstart-tdog-panel-bd", "#tstart-plugin-tdog"), "tstart-panel-loading")
    });
    O.on(N.SHOW_CHAT_DIALOG, function (U) {
        L.log("\u6253\u5f00\u804a\u5929\u7a97\u53e3");
        if (U.haveUser && U.haveUser.userName) {
            P.startChat("", "", {
                onSuccess: function () {
                    L.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5b8c\u6210\u3002")
                },
                onTimeout: function () {
                    L.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5931\u8d25", "warn");
                    B.show(C.ERROR_MESSAGE[-1000])
                }
            }, false)
        } else {
            var X = U.userInfo || {}, T = X.userName || "",
				V = X.userId || X.key || "",
				S = X.itemId || "";
            X.status = X.status || 1;
            if ((!T || G(T)) && (!V || G(V))) {
                B.show("\u7f51\u7edc\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u5237\u65b0\u3002", 140, 2);
                return
            }
            L.log("\u548c " + T + " \u5f00\u59cb\u804a\u5929 fromLight = " + X.fromLight);
            if (T == H.getNickName()) {
                alert("\u4e0d\u80fd\u9009\u62e9\u81ea\u5df1\u54e6\u3002");
                return
            }
            if (X.fromLight) {
                if (X.subscribed) {
                    var W = H.getUser(V);
                    X.status = (W || {})["statusType"] || X.status || 1
                } else {
                    Light.data[X.key].subscribed = true
                }
            }
            C.ChatDialog.show(X, V.indexOf("cntaobao") === 0);
            P.startChat(V, S, {
                onSuccess: function () {
                    L.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5b8c\u6210\u3002")
                },
                onTimeout: function () {
                    L.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5931\u8d25", "warn");
                    D.showSysTip("<p>" + C.ERROR_MESSAGE[-14] + "</p>", true)
                }
            }, X.fromLight)
        }
    });
    O.on(N.RECEIVE_CHAT_MESSAGE, function (S) {
        var T = S.unreadMsgPersonCount;
        L.log("\u6536\u5230" + T + "\u4e2a\u4eba\u7684\u6d88\u606f");
        if (M.isOpen()) {
            M.update();
            D.isOpen()
        } else {
            O.fire(N.UPDATE_STATUS_ICON, {
                data: {
                    mSize: T
                }
            })
        }
    });
    O.on(N.RECEIVE_SUBSCRIBE_MESSAGE, function (S) {
        L.log("\u63a5\u6536\u5230\u7cfb\u7edf\u63d0\u9192");
        E.show(S.data)
    });
    O.on(N.RECEIVE_LOGINOUT_SIGNAL, function (S) {
        L.log("\u63a5\u6536\u5230\u65fa\u65fa\u9000\u51fa\u901a\u77e5");
        F.offline();
        C.SysTips.hide();
        J.stop();
        C.NotifyDaemon.stop();
        H.clearAll();
        M.close();
        D.closeDialog()
    });
    O.on(N.UPDATE_USER_STATUS, function (T) {
        L.log("\u66f4\u65b0\u7528\u6237\u72b6\u6001\u4fe1\u606f");
        var S = T.data;
        if (M.isOpen()) {
            M.update()
        }
        if (D.isOpen()) {
            D.updateUserStatus(K.getUserName(S.changedUserId), S.status)
        }
    });
    O.on(N.UPDATE_STATUS_ICON, function (T) {
        var S = T.data,
			U;
        L.log("\u66f4\u65b0\u72b6\u6001\u56fe\u6807");
        if (S) {
            U = S.mSize
        } else {
            U = H.getTotalUnreadMsgCount()
        }
        if (U > 0) {
            L.log("\u6709\u591a\u5c11\u4eba\u672a\u8bfb\uff1a " + U);
            F.getmessage()
        } else {
            F.online()
        }
    });
    O.on(N.ERROR_GET_CHAT_INFO, function () {
        D.showSysTip("<p>" + C.ERROR_MESSAGE[-1000] + "</p>", true)
    });
    O.on(N.SEND_MESSAGE, function (T) {
        var U = T.content,
			S = T.userName;
        L.log("\u7ed9 " + S + " \u53d1\u9001\u4ee5\u4e0b\u6d88\u606f\uff1a" + U, "info");
        P.send(S, U, T.callback)
    });
    O.on(N.ERROR_GET_MESSAGE, function (S) {
        L.log("\u53d6\u670d\u52a1\u7aef\u4fe1\u606f\u5931\u8d25");
        var U = S.error,
			T = parseInt(U.code, 10);
        if (T === -100 || T === -101) {
            O.fire(N.RECEIVE_LOGINOUT_SIGNAL, {
                data: {
                    subType: 403
                }
            });
            J.stop();
            C.NotifyDaemon.stop()
        } else {
            B.show(C.ERROR_MESSAGE[T] || U.errorMessage || C.ERROR_MESSAGE[-1])
        }
    });
    O.on(C.EVENTS.DAEMON_FIRE, function () {
        P.get()
    });
    C.EventCenter = O
});
TDog.add("Login", function (F) {
    var D = KISSY,
		A, E, B, C;
    F.Login = {
        online: false,
        ready: false,
        init: function () {
            D.log("init Login");
            A = F.Config;
            E = F.DataManager;
            B = F.StatusIcon;
            C = F.SysTips
        },
        canTalk: function (G, H) {
            if (!E.getNickName()) {
                this.directToTBLogin(G);
                return false
            }
            if (B.isOffline() || !E.isLogin()) {
                if (H) {
                    F.WebServer.login();
                    C.showLoginTips(true)
                } else {
                    C.showLoginTips(F.Login.ready)
                }
                if (G) {
                    Light.lightedUsers.push(G)
                }
                return false
            }
            return true
        },
        directToTBLogin: function (Q) {
            var M = location,
				O = M.protocol + "//" + M.host + M.pathname,
				G = M.search,
				N = M.hash,
				P = M.href,
				J = M.hostname,
				K = A.LIGHT_NICK,
				H = (J.indexOf("daily.") > -1) ? true : false,
				I = (function () {
				    if (H) {
				        return J.indexOf("tmall") > -1 ? "daily.tmall.net" : "daily.taobao.net"
				    } else {
				        return J.indexOf("tmall") > -1 ? "tmall.com" : "taobao.com"
				    }
				})(),
				L = I.indexOf("tmall") > -1 ? "http://login." + I + "?redirect_url=" : "https://login." + I + "/member/login.jhtml?f=top&redirectUrl=";
            G = G ? D.unparam(G.substring(1)) : {};
            if (K in G) {
                delete G[K]
            }
            if (Q) {
                if (this.isSearch()) {
                    G[K] = encodeURIComponent(Q)
                } else {
                    G[K] = Q
                }
            }
            G = D.param(G);
            if (!this.isSearch()) {
                G = encodeURIComponent(G)
            }
            P = O + "?" + G + N;
            M.href = L + P
        },
        isSearch: function () {
            var G = ["search.taobao.com", "sandbox.search.taobao.com", "search8.taobao.com", "search8.daily.taobao.net", "s.taobao.com"];
            if (D.indexOf(location.host, G) > -1) {
                return true
            }
        }
    }
});
TDog.add("LocalStorage", function (B) {
    var I = KISSY,
		K = B.Util,
		J = TStart,
		M = I.Cookie,
		L = K.isTaobao ? "x" : "otherx",
		H = "otherx",
		E = "whl",
		A = 0,
		N = J.Config.DOMAIN,
		D, F = {}, C = "_ato",
		G = "__ll";
    B.LocalStorage = {
        init: function () {
            F = {};
            this.setCookieWHL("-1", "0", "0", "0")
        },
        setItem: function (P, O) {
            F[P] = O
        },
        getItem: function (O) {
            return F[O] || {}
        },
        getItems: function () {
            var P = [];
            for (var O in F) {
                P.push([O, F[O]])
            }
            return P
        },
        clear: function () {
            var P = I.unparam(M.get(L)),
				O = this;
            if (P[G] != "-1" || O.getCookieWHL().messageStatus === 0) {
                F = {};
                O.setCookieWHL("-1", "0", "0", "0");
                O.setCookieX(G, "-1");
                O.setCookieX(C, "0")
            }
        },
        getCookieX: function (O) {
            return decodeURIComponent(I.unparam(M.get(L))[O])
        },
        setCookieX: function (Q, P) {
            var O = I.unparam(M.get(L));
            O[Q] = encodeURIComponent(P);
            var R = I.param(O);
            M.set(L, R, 365, N, "/")
        },
        setAndGetFocusTime: function (O) {
            if (O) {
                A = O
            }
            return A
        },
        setCookieWHL: function (R, P, O, S) {
            var Q = R + "&" + P + "&" + O + "&" + S;
            M.set(E, Q, "", N, "/")
        },
        setPublicKey: function (O) {
            D = O
        },
        getPublicKey: function () {
            return D || ""
        },
        getCookieWHL: function () {
            var O = M.get(E),
				P = null;
            if (O) {
                P = O.split("&");
                if (P.length !== 4) {
                    P = [-1, 0, 0, 0]
                }
            } else {
                P = [-1, 0, 0, 0]
            }
            return {
                messageStatus: parseInt(P[0]),
                system: parseInt(P[1]),
                heartTime: parseInt(P[2]),
                focusTime: parseInt(P[3])
            }
        }
    }
});
TDog.add("DataManager", function (D) {
    var H = KISSY,
		O = H.Cookie,
		A = H.JSON,
		K = D.Config,
		C = D.Util,
		J, G, M, L, E, N = "x",
		I = "",
		P = TStart.Config.isOnline,
		B = {
		    FIRST_RUN: "_first_run",
		    LAST_LOGIN: "__ll",
		    LAST_LOGIN_NAME: "_last_login_name",
		    RECENT_LIST: "_recent_list",
		    RECENT_LIST_NAME: "_recent_list_name",
		    USER_LIST: "_user",
		    MESSAGE_LIST: "_message_list"
		}, F = D.EVENTS;
    D.DataManager = {
        init: function () {
            var S = this,
				Q, R;
            H.log("\u521d\u59cb\u5316 DataManager \u6a21\u5757");
            J = D.LocalStorage;
            G = D.EventCenter;
            M = D.WebServer;
            L = D.Daemon;
            E = S.Message;
            E.init()
        },
        getRecentList: function () {
            return J.getItem(B.RECENT_LIST)
        },
        getUser: function (R) {
            var Q = J.getItem(B.RECENT_LIST);
            if (Q) {
                return Q[R]
            }
            return {}
        },
        setRecentList: function (R) {
            var Q = J.getItem(B.RECENT_LIST);
            for (var S = 0; S < R.length; S++) {
                var T = Q[R[S].userId];
                Q[R[S].userId] = R[S];
                if (T) {
                    R[S].messageTime = T.messageTime
                }
            }
            J.setItem(B.RECENT_LIST, Q)
        },
        updateMessageTime: function (S, R) {
            var Q = J.getItem(B.RECENT_LIST);
            if (Q && Q[S]) {
                Q[S].messageTime = R
            }
        },
        getMessageTime: function (R) {
            var Q = (this.getUser(R) || {})["messageTime"] || "";
            H.log("message time :" + Q);
            return Q
        },
        getTotalUnreadMsgCount: function () {
            var Q = J.getCookieWHL();
            if (Q.messageStatus) {
                return Q.messageStatus
            }
            return 0
        },
        saveStartChatData: function (Q) {
            if (Q.success.toLowerCase() == "true") {
                var T = Q.result,
					R = T.item || {}, S = T.user;
                this.__checkOneUserMessage(T);
                this.__isTaobaoUser(S, R);
                this.__saveAndViewChatMessage(T);
                this.__updateNuberOfPeople(T)
            } else {
                if (Q.result.error[0].code == -2) {
                    D.ChatDialog.closeDialog();
                    D.SysTips.show(D.ERROR_MESSAGE[-2], 150, 3)
                } else {
                    if (Q.result.error[0].code == -14) {
                        D.SysTips.show(D.ERROR_MESSAGE[-14], 0, true);
                        this.forcedUpdateNumberOfPeople(K.NOTIFY_STATUS.notMessage.value, 0)
                    } else {
                        if (Q.result.error[0].code == -100 || Q.result.error[0].code == -101 || Q.result.error[0].code == -12) {
                            G.fire(D.EVENTS.RECEIVE_LOGINOUT_SIGNAL, {
                                data: {
                                    subType: 403
                                }
                            })
                        } else {
                            G.fire(F.ERROR_GET_CHAT_INFO, {
                                data: Q.result,
                                method: "start"
                            })
                        }
                    }
                }
            }
        },
        handleReceiveMessage: function (Q) {
            var R = this;
            if (Q.success.toLowerCase() == "true") {
                var S = Q.result;
                S.user = {
                    userChatId: S.talkUserStatus.userId
                };
                D.ChatDialog.updateUserStatus(S.talkUserStatus.userId, S.talkUserStatus.statusType);
                R.__saveAndViewChatMessage(S);
                R.__updateNuberOfPeople(S)
            } else {
                if (Q.result.error[0].code == -2) {
                    D.ChatDialog.closeDialog();
                    D.SysTips.show(D.ERROR_MESSAGE[-2], 150, 3)
                } else {
                    if (Q.result.error[0].code == -14) {
                        D.SysTips.show(D.ERROR_MESSAGE[-14], 0, true);
                        this.forcedUpdateNumberOfPeople(K.NOTIFY_STATUS.notMessage.value, 0)
                    } else {
                        if (Q.result.error[0].code == -100 || Q.result.error[0].code == -101 || Q.result.error[0].code == -12) {
                            G.fire(D.EVENTS.RECEIVE_LOGINOUT_SIGNAL, {
                                data: {
                                    subType: 403
                                }
                            })
                        } else {
                            G.fire(F.ERROR_GET_CHAT_INFO, {
                                data: Q.result,
                                method: "start"
                            })
                        }
                    }
                }
            }
        },
        clearAll: function () {
            D.ChatDialog.clearCurrentChatUserId();
            I = "";
            J.clear()
        },
        getNickName: function () {
            var Q = O.get("_nk_") || "";
            return unescape(Q.replace(/\\u/g, "%u"))
        },
        getNickUrlComponent: function () {
            if (I.length == 0) {
                I = encodeURIComponent(unescape((O.get("_nk_") || "").replace(/\\u/g, "%u")))
            }
            return I
        },
        isLogin: function () {
            var S = this,
				Q = !!S.getNickName(),
				R = J.getCookieX(B.LAST_LOGIN);
            if (P) {
                return Q && (R == S.getCookieLastLoginTime())
            }
            return Q
        },
        getCookieLastLoginTime: function () {
            if (C.isTaobao()) {
                return (H.unparam(O.get("uc1"))["lltime"] + O.get("lastgetwwmsg")) || "-1"
            } else {
                return (O.get("t") + O.get("login")) || "-1"
            }
        },
        setLastLoginTime: function () {
            J.setCookieX(B.LAST_LOGIN, this.getCookieLastLoginTime());
            J.setCookieWHL(0, 0, new Date().getTime(), new Date().getTime())
        },
        resetLastLoginTime: function () {
            J.setCookieX(B.LAST_LOGIN, "0")
        },
        haveNotFocusedPage: function () {
            return J.setAndGetFocusTime() === J.getCookieWHL().focusTime
        },
        setNumberOfPeople: function (S, R) {
            var Q = J.getCookieWHL();
            if (Q.messageStatus != S) {
                R = 2 | R
            }
            J.setCookieWHL(S, R, Q.heartTime, Q.focusTime)
        },
        forcedUpdateNumberOfPeople: function (S, R) {
            var Q = J.getCookieWHL();
            J.setCookieWHL(S, R, Q.heartTime, Q.focusTime)
        },
        setAndGetFocusTime: function (R) {
            if (R) {
                var Q = J.getCookieWHL();
                J.setCookieWHL(Q.messageStatus, Q.system, Q.heartTime, R);
                J.setAndGetFocusTime(R);
                return R
            }
            return J.setAndGetFocusTime()
        },
        addMessage: function (S, Q) {
            var R = J.getItem(B.MESSAGE_LIST);
            if (!R[S]) {
                R[S] = Q
            } else {
                for (var T = 0; T < Q.length; T++) {
                    if (!C.contains(R[S], Q[T])) {
                        R[S].push(Q[T])
                    }
                }
                while (R[S].length > 20) {
                    R[S].shift()
                }
            }
        },
        addAllMessage: function (R, Q) {
            var S = J.getItem(B.MESSAGE_LIST);
            S[R] = Q;
            J.setItem(B.MESSAGE_LIST, S);
            while (Q.length > 20) {
                Q.shift()
            }
        },
        deleteMessage: function (R) {
            var Q = J.getItem(B.MESSAGE_LIST);
            if (Q[R]) {
                Q[R] = []
            }
            J.setItem(B.MESSAGE_LIST, Q)
        },
        getAllMessages: function (Q) {
            return J.getItem(B.MESSAGE_LIST)[Q] || []
        },
        getHeartTime: function () {
            return J.getCookieWHL().heartTime
        },
        setHeartTime: function (Q) {
            var R = J.getCookieWHL();
            J.setCookieWHL(R.messageStatus, R.system, Q, R.focusTime)
        },
        startHeartTime: function (Q) {
            var R = J.getCookieWHL();
            J.setCookieWHL(R.messageStatus, R.system, Q, R.focusTime)
        },
        setMessageStatus: function (S, R) {
            var Q = J.getCookieWHL();
            J.setCookieWHL(S, R, Q.heartTime, Q.focusTime)
        },
        getCookieWHL: function () {
            return J.getCookieWHL()
        },
        setCookieWHL: function (S, R, Q, T) {
            J.setCookieWHL(S, R, Q, T)
        },
        getLoginKey: function () {
            return J.getPublicKey()
        },
        setLoginKey: function (Q) {
            J.setPublicKey(Q)
        },
        __checkOneUserMessage: function (S) {
            if (S.talkUserStatus && S.talkUserStatus.userId) {
                var Q = S.talkUserStatus;
                if (S.single) {
                    var R = {
                        userName: S.user.nick,
                        userId: Q.userId,
                        relation: Q.relation,
                        status: Q.statusType
                    };
                    D.ChatDialog.show(R, R.userId.indexOf("cntaobao") === 0)
                } else {
                    D.ChatDialog.updateUserStatus(S.user.nick, Q.statusType)
                }
            }
        },
        __isTaobaoUser: function (S, R) {
            if (S.userChatId.indexOf("cntaobao") === 0) {
                var Q = R.title ? {
                    user: S,
                    item: R
                } : {
                    user: S
                };
                D.ChatDialog.showInfo(Q)
            }
        },
        __saveAndViewChatMessage: function (R) {
            var Q = R.user;
            this.updateMessageTime(Q.userChatId, R.timeStamp);
            if (R.messages && R.messages.length) {
                if (R.all) {
                    this.addAllMessage(Q.userChatId, R.messages)
                } else {
                    this.addMessage(Q.userChatId, R.messages)
                }
            }
            D.ChatDialog.updateMsg()
        },
        __updateNuberOfPeople: function (Q) {
            this.forcedUpdateNumberOfPeople(Q.size, 0);
            if (Q.size == 0) {
                G.fire(F.UPDATE_STATUS_ICON, {
                    data: {
                        mSize: 0
                    }
                })
            } else {
                G.fire(F.RECEIVE_CHAT_MESSAGE, {
                    unreadMsgPersonCount: Q.size
                })
            }
        },
        hash: function () {
            return [2, 13, 28, 9, 18, 27, 23, 20, 17, 27, 7, 9, 29, 25, 5, 24]
        }
    }
});
TDog.add("DataManager.Message", function (B) {
    var J = KISSY,
		K, I, L, E, F, M, C = B.DataManager,
		G = B.EVENTS,
		D = B.MESSAGE_SUBTYPE,
		H = B.MESSAGE_TYPE,
		A = {
		    LAST_LOGIN: "_last_login",
		    SYSTEM_MESSAGE: "_system_message",
		    HAS_NEW_MESSAGE: "_have_new_message"
		};
    if (!J.isPlainObject(C)) {
        return
    }
    C.Message = {
        init: function () {
            J.log("\u521d\u59cb\u5316 Message \u6a21\u5757");
            K = B.LocalStorage;
            I = B.EventCenter;
            L = B.Daemon;
            E = B.NotifyDaemon;
            M = B.WebServer;
            F = B.ChatDialog
        },
        saveGetData: function (Q) {
            var T = this,
				U, V, S, R = 0;
            if (Q.success.toLowerCase() == "true") {
                if (Q.result.messages) {
                    S = Q.result.messages;
                    R = Q.result.size;
                    for (var P = 0, N = S.length; P < N; P++) {
                        U = S[P];
                        V = parseInt(U.subType, 10);
                        switch (parseInt(U.type, 10)) {
                            case H.LOGOUT:
                                J.log("\u6536\u5230\u9000\u51fa\u901a\u77e5\uff0c\u505c\u6b62\u8bf7\u6c42\u8f6e\u8be2", "warn");
                                I.fire(G.RECEIVE_LOGINOUT_SIGNAL, {
                                    data: U
                                });
                                return;
                                break;
                            case H.STATUS:
                                var O = U.changedUserId || "";
                                if (O) {
                                    J.log("\u6536\u5230\u7528\u6237 " + O + " \u7684\u72b6\u6001\u66f4\u65b0\u4fe1\u606f");
                                    I.fire(G.UPDATE_USER_STATUS, {
                                        data: U
                                    })
                                }
                                break;
                            case H.SYSTEM:
                                switch (V) {
                                    case D.SUBSCRIBE_MESSAGE:
                                        I.fire(G.RECEIVE_SUBSCRIBE_MESSAGE, {
                                            data: U
                                        });
                                        break;
                                    case D.POPUP_MESSAGE:
                                        I.fire(G.RECEIVE_POPUP_MESSAGE, {
                                            data: U
                                        });
                                        break
                                }
                                break;
                            case H.OFFLINE:
                            case H.SELF:
                            case H.TALK:
                                J.log("\u63a5\u53d7\u5230\u6b63\u5e38\u7684\u804a\u5929\u6570\u636e,ERROR`");
                                break
                        }
                    }
                }
            }
        },
        checkCurrentUserMessage: function (P, N) {
            var O = F.getCurrentChatUserId();
            if (O) {
                M.receiveMessage(O, N, P);
                return true
            }
            return false
        },
        clearAll: C.clearAll
    }
});
TDog.add("Daemon", function (D) {
    var Q = KISSY,
		A = Q.Event,
		O, N, W, V, K, M, H, E, C, G, S, L = false,
		T = false,
		U = 800,
		J = 1200;
    D.Daemon = {
        init: function () {
            Q.log("\u521d\u59cb\u5316 Daemon \u6a21\u5757");
            var Z = this;
            O = D.Util;
            N = D.EventCenter;
            W = D.LocalStorage;
            V = D.WebServer;
            K = D.DataManager;
            M = D.Config;
            H = D.StatusIcon;
            C = D.SysTips;
            E = D.NotifyDaemon;
            G = D.ChatDialog;
            S = D.EVENTS;
            Z._bindEvent()
        },
        start: function () {
            var Z = this;
            T = true;
            L = true;
            K.setAndGetFocusTime(new Date().getTime());
            Z.fire()
        },
        fire: function () {
            try {
                var a = this;
                if (a.timer) {
                    a.timer.cancel()
                }
                var c = G.isOpen() ? U : J,
					b = null;
                if (T && L) {
                    b = K.getCookieWHL();
                    if (b.system > 0) {
                        K.setCookieWHL(b.messageStatus, 0, b.heartTime, b.focusTime);
                        if ((b.system & 1) == 1) {
                            N.fire(S.DAEMON_FIRE)
                        }
                        if ((b.system & 2) == 2) {
                            K.Message.checkCurrentUserMessage(false, true)
                        }
                    }
                } else {
                    if (a.notHaveFocusedPage()) {
                        b = K.getCookieWHL();
                        if ((b.system & 2) == 2) {
                            K.setCookieWHL(b.messageStatus, 0, b.heartTime, b.focusTime);
                            K.Message.checkCurrentUserMessage(false, false)
                        }
                    }
                }
                a.execute(b, c)
            } catch (Z) {
                Q.log("\u8f6e\u8be2\u51fa\u9519\u4e86\u3002");
                if (a.timer) {
                    a.timer.cancel()
                }
                a.timer = Q.later(function () {
                    a.fire()
                }, U)
            }
        },
        execute: function (Z, a) {
            var b = this;
            if (M.NOTIFY_STATUS.logout.value == Z.messageStatus) {
                N.fire(S.RECEIVE_LOGINOUT_SIGNAL, {
                    data: {
                        subType: 403
                    }
                });
                return
            } else {
                if (Z.messageStatus > 0) {
                    if ((!G.isOpen()) && (!H.onNewMessage())) {
                        N.fire(S.RECEIVE_CHAT_MESSAGE, {
                            unreadMsgPersonCount: Z.messageStatus
                        })
                    }
                }
            }
            b.timer = Q.later(function () {
                b.fire()
            }, a)
        },
        stop: function () {
            var Z = this;
            if (T) {
                Q.log("\u505c\u6b62\u672c\u5730\u8f6e\u8be2\u3002");
                if (Z.timer) {
                    Z.timer.cancel()
                }
                T = false
            }
        },
        notHaveFocusedPage: function () {
            return K.haveNotFocusedPage()
        },
        isFocused: function () {
            return L
        },
        _bindEvent: function () {
            var a = this,
				Z = window;
            L = true;
            K.setAndGetFocusTime(new Date().getTime());
            A.on(Z, "focus", function () {
                Q.log("\u5f53\u524d\u7a97\u53e3\u83b7\u5f97\u7126\u70b9");
                L = true;
                if (K.isLogin()) {
                    if (L) {
                        if (!a.notHaveFocusedPage()) {
                            K.setAndGetFocusTime(new Date().getTime());
                            K.Message.checkCurrentUserMessage(false, true)
                        } else { }
                        a.start();
                        E.restart();
                        C.hide();
                        N.fire(S.RECEIVE_CHAT_MESSAGE, {
                            unreadMsgPersonCount: K.getTotalUnreadMsgCount()
                        })
                    }
                } else {
                    N.fire(D.EVENTS.RECEIVE_LOGINOUT_SIGNAL, {
                        data: {
                            subType: 403
                        }
                    })
                }
            });
            A.on(Z, "blur", function () {
                Q.log("\u5f53\u524d\u7a97\u53e3\u5931\u53bb\u7126\u70b9\u3002");
                L = false
            })
        }
    };
    var X = 7000,
		F = false,
		B = -9,
		I = 15000,
		P = 1,
		R = undefined;
    D.NotifyDaemon = {
        init: function () {
            var Z = this;
            Z.restart();
            Q.log("\u521d\u59cb\u5316\u957f\u8fde\u63a5\u90e8\u4efd.")
        },
        start: function () {
            var Z = this;
            F = true;
            K.startHeartTime(B);
            Z.__createConnection();
            Q.log("\u767b\u5f55\u5b8c\u6210\uff0c\u5f00\u59cb\u957f\u8fde\u63a5.")
        },
        restart: function () {
            var Z = this;
            F = true;
            Z.__heartTimeout()
        },
        stop: function () {
            var Z = this;
            if (F) {
                Q.log("\u505c\u6b62\u5916\u90e8\u957f\u94fe\u63a5\u68c0\u67e5\u3002");
                if (Z.heartTimeoutTimer) {
                    Z.heartTimeoutTimer.cancel()
                }
                F = false
            }
        },
        __createConnection: function () {
            var a = this;
            try {
                R = document.createElement("iframe");
                R.width = 0;
                R.height = 0;
                R.style.display = "none";
                R.src = M.notifyUrl;
                var b = document.getElementsByTagName("body")[0];
                b.appendChild(R, b.lastChild)
            } catch (Z) {
                Q.log("\u8fdc\u7a0b\u8fde\u63a5\u5f02\u5e38\u4e86\u2026\u2026" + Z)
            }
        },
        __heartTimeout: function () {
            var Z = this;
            if (Z.heartTimeoutTimer) {
                Z.heartTimeoutTimer.cancel()
            }
            if (F) {
                Z.heartTimeoutTimer = Q.later(function () {
                    var a = K.getCookieWHL();
                    Q.log("\u68c0\u67e5\u957f\u94fe\u63a5\uff0c\u91cd\u65b0\u5f00\u59cb:" + (new Date().getTime() - a.heartTime > X) + "," + (new Date().getTime() - a.heartTime) + "," + new Date().getTime() + "," + a.heartTime);
                    if (a.heartTime == B || (new Date().getTime() - a.heartTime > X && a.heartTime !== B && a.messageStatus !== M.NOTIFY_STATUS.logout.value)) {
                        if (R) {
                            Q.log("\u957f\u94fe\u63a5\u7684frame\u5df2\u7ecf\u5b58\u5728\u3002");
                            R.src = M.notifyUrl
                        } else {
                            Z.__createConnection();
                            Q.log("\u957f\u94fe\u63a5\u7684frame\u4e0d\u5df2\u7ecf\u5b58\u5728\u3002")
                        }
                        K.setHeartTime(B);
                        F = true;
                        Z.__checkConnection()
                    }
                    Z.__heartTimeout()
                }, X)
            }
        },
        __checkConnection: function () {
            var Z = this;
            if (P++ < 4) {
                Q.later(function () {
                    if (K.getHeartTime() === B) {
                        if (R) {
                            Q.log("\u957f\u94fe\u63a5\u7684frame\u5df2\u7ecf\u5b58\u5728\u3002");
                            R.src = M.notifyUrl
                        } else {
                            Z.__createConnection();
                            Q.log("\u957f\u94fe\u63a5\u7684frame\u4e0d\u5df2\u7ecf\u5b58\u5728\u3002")
                        }
                    }
                }, I)
            }
        }
    }
});
TDog.add("WebServer", function (B) {
    var I = KISSY,
		N = I.Cookie,
		K = B.Config,
		C = B.DataManager,
		F = B.EVENTS,
		H = B.EventCenter,
		L = B.Daemon,
		G = 0,
		E = 5000,
		J = B.SITES,
		D = J.TAOBAO,
		O = 1,
		M = 0,
		A = {
		    getToken: {
		        url: K.getTokenUrl,
		        callback: "TDog.WebServer.globalToken"
		    },
		    login: {
		        url: K.loginUrl,
		        callback: "TDog.WebServer.prepareLogin"
		    },
		    checkautologin: {
		        url: K.checkAutoLogin,
		        callback: "TDog.WebServer.decideAutoLogin"
		    },
		    getloginresult: {
		        url: K.getLoginResultUrl,
		        callback: "TDog.WebServer.disposeLoginResult"
		    },
		    setstrangermsg: {
		        url: K.setAutoLoginUrl,
		        callback: "TDog.WebServer.setStrangerMsgData"
		    },
		    clearchatlist: {
		        url: K.clearListUrl,
		        callback: "TDog.WebServer.clearChatListData"
		    },
		    clearchatmessage: {
		        url: K.clearListUrl,
		        callback: "TDog.WebServer.handClearChatMessage"
		    },
		    setautologin: {
		        url: K.setAutoLoginUrl,
		        callback: "TDog.WebServer.setAutoLoginData"
		    },
		    start: {
		        url: K.startUrl,
		        callback: "TDog.DataManager.saveStartChatData"
		    },
		    receive: {
		        url: K.startUrl,
		        callback: "TDog.DataManager.handleReceiveMessage"
		    },
		    send: {
		        url: K.sendUrl,
		        callback: "TDog.WebServer.handleSendResult"
		    },
		    get: {
		        url: K.getUrl,
		        callback: "TDog.DataManager.Message.saveGetData"
		    },
		    getTalkUsers: {
		        url: K.getTalkUsers,
		        callback: "TDog.WebServer.handleTalkUsers"
		    },
		    ackGetMessage: {
		        url: K.ackGetMessage,
		        callback: "TDog.WebServer.handleAckResult"
		    },
		    checkUserSeting: {
		        url: K.ackGetMessage,
		        callback: "TDog.WebServer.handUserSeting"
		    },
		    getServerKey: {
		        url: K,
		        callback: "TDog.WebServer.handleLoginFirst"
		    }
		};
    B.WebServer = {
        AUTO_LOGIN: {
            autoLoginAndTip: 1,
            autoLoginNotTip: 2,
            forcedLogin: 3
        },
        init: function () {
            var P = this;
            P.getTokenNum = 1;
            I.log("\u521d\u59cb\u5316 WebServer \u6a21\u5757");
            P.getToken()
        },
        _request: function (S, P) {
            var Q = C.getNickUrlComponent(),
				R = Q.length == 0 ? "" : "&nkh=" + Q;
            S = S + R + "&appId=" + K.appId;
            I.log("[" + (new Date()) + "] " + S + "&t=" + +new Date, "info");
            if (I.isFunction(P.onFailure)) {
                P.onFailure = P.onTimeout
            }
            B.Util.getScript(S + "&t=" + +new Date, {
                onSuccess: function () {
                    if (I.isFunction(P.onSuccess)) {
                        P.onSuccess.call(this)
                    }
                },
                onFailure: function () {
                    if (I.isFunction(P.onFailure)) {
                        P.onFailure.call(this)
                    }
                },
                onTimeout: function () {
                    if (I.isFunction(P.onTimeout)) {
                        P.onTimeout.call(this)
                    }
                },
                success: function () {
                    if ("function" === typeof P.onSuccess) {
                        P.onSuccess.call(this)
                    }
                },
                error: function () {
                    if ("function" === typeof P.onFailure) {
                        P.onFailure.call(this)
                    }
                },
                scope: this,
                charset: K.charset || "gbk",
                timeout: E
            })
        },
        sitePrefix: (function () {
            var Q = [],
				P = "";
            for (var R in J) {
                Q.push(J[R])
            }
            return new RegExp("^(" + Q.join("|") + ")(.*)$", "i")
        })(),
        formatNick: function (P) {
            var R = this,
				Q = R.sitePrefix;
            if (Q.test(P)) {
                return P
            }
            return D + P
        },
        getNick: function (P) {
            if (!P) {
                return
            }
            var S = this,
				Q = S.sitePrefix,
				R = P.match(Q);
            if (R) {
                return ("undefined" != typeof R[2] && R[2]) ? R[2] : P
            }
            return P
        },
        getToken: function () {
            var R = this,
				P = "getToken",
				Q = I.param({
				    callback: A[P]["callback"]
				});
            R._request(K.getTokenUrl + "?" + Q, {})
        },
        setAutoLogin: function (R) {
            var S = this,
				P = "setautologin",
				Q = I.param({
				    token: S.token,
				    callback: A[P]["callback"]
				});
            S._request(K.setAutoLoginUrl + "?act=" + R + "&" + Q, {})
        },
        setAutoLoginData: function (P) {
            this.__handleErrorResult(P)
        },
        setStrangerMsg: function (R) {
            var S = this,
				P = "setstrangermsg",
				Q = I.param({
				    token: S.token,
				    callback: A[P]["callback"]
				});
            S._request(K.setAutoLoginUrl + "?act=" + R + "&" + Q, {})
        },
        setStrangerMsgData: function (P) {
            this.__handleErrorResult(P)
        },
        clearChatList: function () {
            var R = this,
				P = "clearchatlist",
				Q = I.param({
				    token: R.token,
				    callback: A[P]["callback"]
				});
            R._request(K.clearListUrl + "&" + Q, {})
        },
        clearChatListData: function (P) {
            this.__handleErrorResult(P)
        },
        clearChatMessage: function (S) {
            var R = this,
				P = "clearchatmessage",
				Q = I.param({
				    act: 1,
				    targetNick: S,
				    token: R.token,
				    callback: A[P]["callback"]
				});
            R._request(K.clearUrl + "?" + Q, {})
        },
        handClearChatMessage: function (P) {
            this.__handleErrorResult(P)
        },
        checkAutoLogin: function (P) {
            var S = this,
				Q = "checkautologin",
				R = I.param({
				    token: S.token,
				    callback: A[Q]["callback"],
				    check: "1"
				});
            S._request(K.checkAutoLoginUrl + "?cat=-1&" + R, P || {})
        },
        checkUserSeting: function (P) {
            var S = this,
				Q = "checkUserSeting",
				R = I.param({
				    token: S.token,
				    callback: A[Q]["callback"]
				});
            S._request(K.checkAutoLoginUrl + "?cat=-1&" + R, P || {})
        },
        globalToken: function (P) {
            var Q = this;
            if (Q.getTokenNum > 3) {
                return
            }
            Q.getTokenNum++;
            if (P.success.toLowerCase() === "true") {
                Q.token = P.result.token;
                L.init();
                if (C.isLogin()) {
                    H.fire(F.LOGIN_SUCCESS);
                    B.NotifyDaemon.init();
                    L.start()
                } else {
                    if (C.getNickName()) {
                        B.LocalStorage.init();
                        Q.checkAutoLogin()
                    } else {
                        B.LocalStorage.init();
                        I.log("\u963f\u91cc\u65fa\u65fa\uff08\u672a\u767b\u5f55\uff09");
                        B.SysTips.setHoverTips("\u963f\u91cc\u65fa\u65fa\uff08\u672a\u767b\u5f55\uff09")
                    }
                }
            } else {
                Q.getToken()
            }
        },
        handUserSeting: function (P) {
            var S = this;
            S.__handleErrorResult(P);
            if (P.success.toLowerCase() === "true") {
                var T = P.result,
					Q = !(8192 & parseInt(T.tag, 10)),
					R = (16384 & parseInt(T.tag, 10));
                if (Q) {
                    I.get("#tstart .tstart-settings-login").checked = true
                } else {
                    I.get("#tstart .tstart-settings-login").checked = false
                }
                if (R) {
                    I.get("#tstart .tstart-settings-msg").checked = true
                } else {
                    I.get("#tstart .tstart-settings-msg").checked = false
                }
            }
        },
        decideAutoLogin: function (P) {
            var S = this;
            S.__handleErrorResult(P);
            if (P.success.toLowerCase() === "true") {
                if (P.result.tag == -1) {
                    S.__completeLogin()
                } else {
                    var T = P.result,
						Q = !(8192 & parseInt(T.tag, 10)),
						R = B.Config.forceAutoLogin;
                    if (Q && I.UA.ie) {
                        S.login(S.AUTO_LOGIN.autoLoginNotTip)
                    } else {
                        if (R) {
                            I.log("\u6ee1\u8db3\u81ea\u52a8\u767b\u5f55\u6761\u4ef6\uff0c\u53d1\u8d77\u767b\u5f55\u8bf7\u6c42");
                            S.login()
                        } else {
                            I.log("\u4e0d\u6ee1\u8db3\u81ea\u52a8\u767b\u5f55\u6761\u4ef6")
                        }
                    }
                }
            }
        },
        prepareLogin: function (P) {
            var R = this;
            if ("false" == P.success.toLowerCase()) {
                var Q = parseInt((P.result.error[0] || {})["code"]) || 0;
                switch (Q) {
                    case -15:
                        B.SysTips.showClientOnlineTips();
                        B.Util.sendLog("wwweblog=logged");
                        break;
                    case -16:
                        break;
                    default:
                        H.fire(F.ERROR_LOGIN_FAILED, {
                            error: P.result.error[0]
                        })
                }
            } else {
                R.getLoginResult()
            }
        },
        getLoginResult: function () {
            var P = this;
            I.log("\u767b\u5f55\u6210\u529f\uff0c\u8fc7 1 \u79d2\u949f\u83b7\u53d6\u767b\u5f55\u540e\u7684\u7ed3\u679c");
            I.later(function () {
                var Q = I.param({
                    time: O,
                    token: P.token,
                    callback: A.getloginresult.callback
                });
                P._request(K.getLoginResultUrl + "?" + Q, {
                    onSuccess: function () {
                        I.log("\u4e8c\u6b21\u8bf7\u6c42\u5f97\u5230\u767b\u5f55\u7ed3\u679c\u767b\u5f55\u5b8c\u6210");
                        if (C.isLogin()) {
                            P.get();
                            B.NotifyDaemon.start();
                            L.start();
                            H.fire(F.LOGIN_SUCCESS);
                            B.SysTips.show("\u963f\u91cc\u65fa\u65fa - " + C.getNickName() + "(\u5728\u7ebf)", "150", 5);
                            G = new Date().getTime();
                            O = 1
                        }
                    },
                    onFailure: function () {
                        H.fire(F.RECEIVE_LOGINOUT_SIGNAL, {
                            data: {
                                subType: 403
                            }
                        })
                    },
                    onTimeout: function () {
                        H.fire(F.RECEIVE_LOGINOUT_SIGNAL, {
                            data: {
                                subType: 403
                            }
                        })
                    }
                })
            }, O * 1000)
        },
        disposeLoginResult: function (P) {
            var Q = this;
            I.log("\u767b\u5f55:" + P.success);
            if (P.success.toLowerCase() === "true") {
                C.setLastLoginTime()
            } else {
                if (++O < 4 && P.result.error && P.result.error[0].code == -99) {
                    Q.getLoginResult()
                } else {
                    O = 1;
                    C.resetLastLoginTime();
                    H.fire(F.ERROR_LOGIN_FAILED, {
                        error: (P.result.error || [])[0]
                    })
                }
            }
        },
        login: function (S, P) {
            var U = this,
				Q = "login",
				R, T = U.__encrypt();
            if (T) {
                R = I.param({
                    token: U.token,
                    callback: A[Q]["callback"],
                    nickName: C.getNickName(),
                    autoLogin: S || U.AUTO_LOGIN.autoLoginAndTip,
                    loginTag: T
                });
                H.fire(F.LOGIN_START);
                I.log("\u8bf7\u6c42\u767b\u5f55\u5f00\u59cb");
                U._request(K.loginUrl + "?" + R, P || {})
            }
        },
        startChat: function (T, R, P, U) {
            var V = this,
				Q = "start",
				S;
            S = I.param({
                token: V.token,
                callback: A[Q]["callback"],
                userId: T,
                itemId: R || "",
                fromLight: U ? "true" : "false",
                time: C.getMessageTime(T)
            });
            V._request(K.startUrl + "?" + S, P || {})
        },
        receiveMessage: function (S, V, T, P) {
            var U = this,
				Q = "receive",
				R;
            R = I.param({
                token: U.token,
                callback: A[Q]["callback"],
                targetUserChatId: S,
                focused: V,
                update: T,
                time: C.getMessageTime(S)
            });
            U._request(K.receiveUrl + "?" + R, P || {})
        },
        send: function (S, R, P) {
            var T = this,
				Q;
            if (!S.length || !R.length) {
                return
            }
            S = T.formatNick(S);
            Q = I.param({
                token: T.token,
                callback: A.send.callback,
                userId: S,
                content: R
            });
            T._request(K.sendUrl + "?" + Q, P || {})
        },
        handleSendResult: function (P) {
            this.__handleErrorResult(P)
        },
        get: function (P) {
            var S = this,
				Q = "get",
				R;
            I.log("\u8f6e\u8be2\u83b7\u53d6\u4fe1\u606f");
            R = I.param({
                token: S.token,
                callback: A[Q]["callback"]
            });
            S._request(K.getUrl + "?" + R, {})
        },
        getTalkUsers: function (P) {
            var S = this,
				Q = "getTalkUsers",
				R = I.param({
				    token: S.token,
				    callback: A[Q]["callback"]
				});
            S._request(K.getTalkUsers + "?" + R, P || {});
            I.log("\u53d6\u804a\u5929\u4eba\u5217\u8868\u3002")
        },
        handleTalkUsers: (function () {
            var P = 1;
            return function (R) {
                var Q = B.WebServer.__handleErrorResult(R);
                if (R.success == "true") {
                    I.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868\u6210\u529f\uff1a" + P);
                    B.RecentList.updateRecentlist(R.result.person);
                    if (R.result.person.length > 0) {
                        C.setRecentList(R.result.person)
                    }
                    C.forcedUpdateNumberOfPeople(R.result.size, 0)
                } else {
                    if (P++ < 4 && !Q) {
                        I.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25\uff0c\u91cd\u8bd5\uff1a" + P);
                        B.WebServer.getTalkUsers({})
                    } else {
                        I.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25\uff0c\u91cd\u8bd5\u4e09\u6b21\u6216\u9000\u51fa\u767b\u5f55\u7ed3\u675f\u3002")
                    }
                }
            }
        })(),
        ack: function (R, S, P) {
            var T = this,
				Q;
            Q = I.param({
                token: T.token,
                callback: A.ackGetMessage.callback,
                userId: R,
                num: S
            });
            T._request(K.ackGetMessage + "?" + Q, P || {})
        },
        handleAckResult: function (P) {
            I.log("\u6536\u5230\u6d88\u606f\u5e94\u7b54:" + P.success);
            this.__handleErrorResult(P)
        },
        __handleErrorResult: function (P) {
            if (P.success === "false") {
                if (P.result.error[0]) {
                    if (P.result.error[0].code == -100 || P.result.error[0].code == -101 || P.result.error[0].code == -12) {
                        H.fire(B.EVENTS.RECEIVE_LOGINOUT_SIGNAL, {
                            data: {
                                subType: 403
                            }
                        });
                        return true
                    }
                }
            }
            return false
        },
        __encrypt: function () {
            var Q = this,
				P = C.getLoginKey();
            if (P.length) {
                return Q.__encryptKey()
            }
            Q.__getServerKey()
        },
        __getServerKey: function () {
            var R = this,
				P = "getServerKey",
				Q;
            Q = I.param({
                token: R.token,
                callback: A[P]["callback"]
            });
            R._request(K.TagKeyUrl + "?" + Q, {})
        },
        __encryptKey: function () {
            var P = [],
				V = "",
				T = this;
            var Q = C.getLoginKey();
            var R = T.__make();
            for (var S = 0; S < R.length; S++) {
                V += Q.charAt(R[S])
            }
            var U = encodeURIComponent(C.getNickName()).charAt(2);
            return U + V
        },
        handleLoginFirst: function (P) {
            var Q = this;
            if (P.success == "true") {
                C.setLoginKey(P.result.tagKey);
                if (M++ < 3) {
                    Q.login()
                }
            } else {
                H.fire(F.ERROR_LOGIN_FAILED, {
                    error: P.result.error[0]
                })
            }
        },
        __make: function () {
            var P = [];
            var Q = C.hash();
            var S = K.hash;
            for (var R = 0; R < 16; R++) {
                P.push(Math.floor((Q[R]) + (S[R]) / 7.3 * 100) % 32)
            }
            I.log("hash:" + P.join(","));
            return P
        },
        __completeLogin: function () {
            I.log("\u5df2\u7ecf\u767b\u5f55\u8fc7\u540e\uff0c\u5b8c\u6210\u767b\u5f55\u3002");
            C.setLastLoginTime();
            if (C.isLogin()) {
                this.get();
                B.NotifyDaemon.start();
                L.start();
                H.fire(F.LOGIN_SUCCESS);
                G = new Date().getTime();
                O = 1
            }
        },
        uptime: function () {
            return G
        }
    }
});
TDog.add("RecentList", function (E) {
    var H = KISSY,
		B = H.DOM,
		C = H.Event,
		A = E.DataManager,
		K = E.EventCenter,
		F, D = E.Util,
		I, L, J = '<div class="tdog-recentlist"><ul>{ITEMS}</ul></div>',
		G = '<li class="tdog-recentlist-item tdog-status-{status}"><i></i><span class="tdog-user-name" id="{userId}">{userName}</span><span class="tdog-msg-count">{msgCount}</span></li>';
    E.RecentList = {
        init: function () {
            I = E.hostEl;
            F = E.ChatDialog;
            L = H.get(".tstart-tdog-panel-bd", E.hostEl);
            this._bindUI()
        },
        update: function () {
            E.WebServer.getTalkUsers()
        },
        updateRecentlist: function (N) {
            var O, M = N.length,
				P = "";
            H.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868");
            if (M === 0) {
                P = '<p class="tdog-recentlist-none">\u6682\u65e0\u8054\u7cfb\u4eba</p>';
                B.addClass(H.get(".tstart-tdog-panel-clearbtn", E.hostEl), "hidden")
            } else {
                B.removeClass(H.get(".tstart-tdog-panel-clearbtn", E.hostEl), "hidden")
            }
            for (O = M - 1; O >= 0; --O) {
                if (N[O].size == 0 || N[O].size == undefined || N[O].userId == F.getCurrentChatUserId()) {
                    N[O].size = ""
                } else {
                    N[O].size = "(" + N[O].size + ")"
                }
                N[O].userName = E.Util.getUserName(N[O].userId);
                N[O].status = N[O].statusType;
                P += D.substitute(G, {
                    status: E.USER_STATUS[N[O].status][0],
                    userName: D.getUserName(N[O].userId),
                    msgCount: N[O].size,
                    userId: N[O].userId
                })
            }
            P = J.replace("{ITEMS}", P);
            L.innerHTML = P;
            B.removeClass(B.get(".tstart-tdog-panel-bd", "#tstart-plugin-tdog"), "tstart-panel-loading")
        },
        close: function () {
            B.removeClass(E.hostEl, "tstart-item-active");
            if (E.DataManager.isLogin() && A.getTotalUnreadMsgCount() > 0) {
                E.StatusIcon.getmessage()
            }
        },
        isOpen: function () {
            return B.hasClass(I, "tstart-item-active")
        },
        _bindUI: function () {
            var N = function (P) {
                var Q = P.target;
                if (Q.parentNode.nodeName.toUpperCase() == "LI") {
                    Q = Q.parentNode
                }
                if (Q.nodeName.toUpperCase() == "LI") {
                    return Q
                }
                return false
            }, M, O = this;
            C.on(L, "click", function (P) {
                M = N(P);
                if (M) {
                    var Q = H.get(".tdog-user-name", M).id;
                    if (E.ChatDialog.checkDialogOpen(Q)) {
                        return
                    }
                    var R = A.getUser(Q);
                    if (R) {
                        K.fire(E.EVENTS.SHOW_CHAT_DIALOG, {
                            userInfo: R
                        });
                        H.get(".tdog-msg-count", M).innerHTML = ""
                    }
                }
            });
            C.on(L, "mouseover mouseout", function (P) {
                M = N(P);
                if (M && M.getAttribute("current") != "true") {
                    B.toggleClass(M, "tdog-recentlist-hover")
                }
            });
            C.on(L, "mousedown mouseup", function (P) {
                M = N(P);
                if (M) {
                    B.toggleClass(M, "tdog-recentlist-select")
                }
            });
            C.on(window, "click", function () {
                if (A.isLogin() && A.getTotalUnreadMsgCount() > 0) {
                    E.StatusIcon.getmessage()
                }
            });
            C.on(E.hostEl, "click", function (Q) {
                var P = Q.target;
                if (B.hasClass(P, "tstart-tdog-panel-clearbtn")) {
                    E.WebServer.clearChatList();
                    H.get("#tstart .tdog-recentlist").innerHTML = '<ul><p class="tdog-recentlist-none">\u6682\u65e0\u8054\u7cfb\u4eba</p></ul>';
                    B.addClass(H.get(".tstart-tdog-panel-clearbtn", E.hostEl), "hidden")
                }
                if (B.hasClass(P, "tstart-tdog-panel-closebtn") || ("img" === P.tagName.toLowerCase() && B.parent(P, ".tstart-tdog-panel-closebtn"))) {
                    O.close()
                }
            })
        }
    }
});
TDog.add("ChatDialog", function (F) {
    var P = KISSY,
		C = P.DOM,
		B = P.Event,
		S = TStart,
		O = encodeURIComponent,
		U = F.EventCenter,
		W = F.WebServer,
		J = F.Config,
		M = F.Util,
		A = document,
		Q = window,
		V = S.Config.DOMAIN,
		I = S.Config.isOnline,
		G = [],
		L, K, E, T, H = null,
		N = null,
		D = '<div class="tdog-popup-tms-bullet"><div class="tdog-popup-tms-bulletin"></div></div>',
		R = '<div class="tdog-popup tdog-popup-blue ' + (P.UA.ie ? "tdog-ie" : "") + '" style="width:416px;bottom:40px;overflow:normal;"><div class="tdog-popup-head" ><div><i class="tdog-status-"></i><div><span class="tdog-popup-contact"></span></div></div><span class="tdog-popup-tools"><span title="\u5e2e\u52a9" class="tdog-popup-help"></span><span title="\u5173\u95ed" class="tdog-popup-close"></span></span></div><div class="tdog-popup-main"><div class="tdog-popup-talkleftouter"><div class="tdog-popup-talkleftinner"><div class="tdog-popup-talkcontainer">' + D + '<div class="tdog-popup-talkhistory"></div><div class="tdog-popup-talkbar">    <span title="\u8868\u60c5"></span>    <span class="tdog-popup-talkbar-clear" title="\u6e05\u7a7a\u804a\u5929\u8bb0\u5f55"></span>    <a title="\u804a\u5929\u8bb0\u5f55" href="#" target="_blank"><i></i>\u804a\u5929\u8bb0\u5f55</a></div><div class="tdog-popup-talkinput">    <textarea cols="5"></textarea></div><a title="\u9690\u85cf\u53f3\u8fb9\u680f" class="tdog-popup-pulloff" href="javascript:void(0);"><span></span></a></div><div class="tdog-popup-talkfoot"><span class="tdog-popup-tms-ad"></span>   <span class="tdog-popup-sendbut">     <span class="tdog-popup-send">\u53d1\u9001</span>     <span class="tdog-popup-changesend"></span><ul><li><i></i><span>\u6309Ctrl+Enter\u53d1\u9001</span></li><li class="tdog-send-mode"><i></i><span>\u6309Enter\u53d1\u9001</span></li></ul></span></div></div></div><div class="tdog-popup-talkright"></div><div class="tdog-popup-clear"></div></div><div class="tdog-popup-handle"></div><div class="tdog-popup-handle-x"></div><div class="tdog-popup-handle-y"></div></div>';
    F.ChatDialog = {
        init: function () { },
        showAdLink: function (Z, X) {
            var a = P.get("a.tdog-popup-tms-link", X);
            if (a && Z.href && Z.title) {
                a.innerHTML = Z.title;
                C.attr(a, "href", Z.href);
                H = Z
            }
        },
        showBulletin: function (X) {
            P.later(function () {
                var e = P.get("div.tdog-popup-tms-bulletin", K),
					Z = P.get("div.tdog-popup-talkhistory", K),
					a = P.get("div.tdog-popup-talkright", K),
					d = a.style.display != "none" ? "tdog-popup-pulloff" : "tdog-popup-pullon",
					c = P.get("a." + d, K),
					g = P.get("span.tdog-popup-tms-ad", K),
					f;
                if (e && X.title && X.url && X.href) {
                    var b = A.createElement("div");
                    b.className = "tdog-popup-tms-bulletin-close";
                    e.innerHTML = "<i></i><a href=" + X.url + " target='_blank'>" + X.title + "</a>";
                    e.appendChild(b);
                    if (X.href == "taobao" && V == "taobao.com") {
                        C.css(e.parentNode, "display", "block")
                    } else {
                        if (X.href == "daily" && V == "taobao.net") {
                            C.css(e.parentNode, "display", "block")
                        }
                    }
                    f = (e.innerHTML && C.parent(e).style.display == "block") ? Z.offsetHeight - 22 : Z.offsetHeight;
                    C.css(Z, "height", f);
                    N = X
                }
                if (g && X.adUrl && X.adText) {
                    g.innerHTML = "<a href=" + X.adUrl + " target='_blank'>" + X.adText + "</a>"
                }
                if (Z) {
                    Z.scrollTop = Z.scrollHeight
                }
            }, 800, false)
        },
        _create: function (c) {
            var g = W.formatNick(T.userId),
				e = this;
            if (!c) {
                var a = '<a title="\u9690\u85cf\u53f3\u8fb9\u680f" class="tdog-popup-pullon" style="display:none"></a></div></div><div class="tdog-popup-talkright" ></div>',
					f, Z;
                f = R.replace(a, "</div></div>");
                L = C.create(f);
                C.css(L, "width", "253px");
                Z = P.get("div.tdog-popup-talkleftinner", L);
                C.css(P.get("div.tdog-popup-talkright", L), "display", "none");
                C.css(Z, "margin-right", "6px");
                C.css(P.get("div.tdog-popup-talkhistory", L), "width", "auto")
            } else {
                L = C.create(R)
            }
            G.push(new Array(g, L));
            P.get("#tstart").appendChild(L);
            if (!c) {
                P.get("a.tdog-popup-pulloff").style.display = "none"
            }
            C.css(L, "display", "block");
            this._bindUI(L);
            var k = P.get("div.tdog-popup-talkbar", L).getElementsByTagName("a")[0],
				l = O(O(O(F.DataManager.getNickName()))),
				d = O(O(O(g))),
				i = "http://www2.im.alisoft.com/webim/online/chat_record_search.htm?from_im=webwangwang&signmode=im&type=0&u_id=cntaobao" + l + "&t_id=" + d + "&sign_account=" + l;
            if (k) {
                k.href = "http://sign.im.alisoft.com/sign/aso?domain=taobao&target=" + i + "&_input_charset=utf-8"
            }
            var b = new P.Drag(L, {
                handle: ".tdog-popup-head",
                not: [".tdog-popup-help", ".tdog-popup-close"],
                scroll: true
            });
            b.onStartDrag = function (n, m) {
                C.css(m, "bottom", "auto")
            };
            B.on(P.get("div.tdog-popup-head", L), "selectstart", function (m) {
                m.halt()
            });
            DragFn = function (s, v, w, p, q, m) {
                var n = m,
					r = P.get("div.tdog-popup-talkhistory", n),
					y = P.get("div.tdog-popup-talkright", n),
					u = P.get("div.tdog-popup-main", n),
					x = P.get("a.tdog-popup-pulloff", n),
					o = P.get("span.tdog-popup-sendbut", n),
					z = P.get("a.tdog-popup-pullon", n),
					AA = P.get("div.tdog-popup-tms-bullet", n),
					t = AA.style.display == "block" ? v.offsetHeight - 163 + "px" : v.offsetHeight - 141 + "px";
                if (C.hasClass(n, "tdog-popup-visible")) {
                    C.removeClass(n, "tdog-popup-visible")
                }
                C.css(r, "width", "auto");
                C.css(r, "marginRight", "5px");
                C.css(u, "height", v.offsetHeight - 28 + "px");
                if (C.css(y, "display") !== "none") {
                    C.css(y, "height", v.offsetHeight - 37 + "px")
                }
                C.css(r, "height", t);
                C.css((function () {
                    return (x ? x : z)
                })(), "height", v.offsetHeight - 141 + "px");
                if (6 === P.UA.ie) {
                    C.addClass(o, "reflow-fix");
                    C.removeClass(o, "reflow-fix")
                }
            };
            var h = new P.Drag(L, {
                resize: true,
                handle: ".tdog-popup-handle",
                resizefn: [417, 291]
            });
            h.onStartDrag = function (n, o, m) {
                var p = P.get("div.tdog-popup-talkright", L);
                m.resizefn = (C.css(p, "display") === "none") ? [270, 291] : [417, 291]
            };
            h.onDrag = function (o, q, s, m, n, r) {
                var p = r;
                DragFn(o, q, s, m, n, r)
            };
            var j = new P.Drag(L, {
                resize: true,
                handle: ".tdog-popup-handle-x",
                resizefn: [false, 291]
            });
            j.onDrag = function (o, q, s, m, n, r) {
                var p = r;
                DragFn(o, q, s, m, n, r)
            };
            var X = new P.Drag(L, {
                resize: true,
                handle: ".tdog-popup-handle-y",
                resizefn: [417, false]
            });
            X.onStartDrag = function (o, q, t, m, n, s) {
                var p = s,
					r = P.get("div.tdog-popup-talkright", p);
                t.resizefn = (C.css(r, "display") === "none") ? [270, false] : [417, false]
            };
            X.onDrag = function (o, p, r, m, n, q) {
                DragFn(o, p, r, m, n, q)
            };
            M.getTmsContent([{
                data: N,
                link: J.tmsBulletinUrl,
                callback: "TDog.ChatDialog.showBulletin",
                success: function () {
                    P.log("\u8bfb\u53d6 TMS \u6587\u5b57\u94fe\u8d44\u6e90\u6210\u529f")
                },
                hasDate: null,
                notHasDate: null
            }]);
            return L
        },
        show: function (Z, a) {
            T = Z;
            var f = this,
				d = W.formatNick(T.userId),
				h, j, c = false;
            for (var X = 0; X < G.length; X++) {
                if (G[X][0] == d) {
                    G[X][1].style.display = "block";
                    K = G[X][1];
                    c = true
                } else {
                    G[X][1].style.display = "none"
                }
            }
            if (!c) {
                P.use("dragdrop", function () {
                    K = f._create(a);
                    h = C.viewportWidth();
                    j = (h - 440) / 2;
                    K.style.left = j + "px"
                })
            }
            var i = P.get("div.tdog-popup-head", K),
				b, g = P.get("div", i);
            if (T.status) {
                b = " - " + F.USER_STATUS[Z.status][1]
            } else {
                b = ""
            }
            var e = T.relation ? "\u597d\u53cb" : "\u964c\u751f\u4eba";
            g.innerHTML = '<i></i><div class="tdog-contact-info"><span class="tdog-popup-contact">' + T.userName + "</span>" + b + "</div>";
            g.className = "tdog-status-" + F.USER_STATUS[Z.status][0];
            this.changeBut()
        },
        closeDialog: function () {
            M.css([
				[K, "display", "none"],
				["tdog-face-container", "display", "none"]
			]);
            K = false;
            T = ""
        },
        showInfo: function (Z) {
            var g = P.get("div.tdog-popup-talkright", K),
				e = (J.appId == 1);
            if (!g) {
                return
            }
            if (!e && Z.item && Z.item.id) {
                var f = Z.item,
					h = '<div class="tdog-popup-goodsinfo"><p class="tdog-goodsinfo-head">\u5b9d\u8d1d\u63cf\u8ff0</p><div><div class="tdog-goodsinfo-pic"><p class="tdog-goodsinfo-img"><a href="http://item.taobao.com/item_detail-null-' + f.id + '.jhtml"  target = "_blank"><img src="' + f.imageUrl + '_80x80.jpg" title="' + f.title + '"/></a></p></div></div><p class="tdog-goodsinfo-title"><a href="http://item.taobao.com/item_detail-null-' + f.id + '.jhtml"  target = "_blank">' + f.title + '</a></p><p class="tdog-goodsinfo-price">\u4e00\u53e3\u4ef7\uff1a<span>' + f.price + '</span>\u5143</p><p><a href="http://buy.taobao.com/auction/buy_now.jhtml?auction_id=' + f.id + '" title="\u7acb\u523b\u8d2d\u4e70" class="tdog-goodsinfo-linkbuy" target = "_blank"></a></p></div>';
                C.css(g, "background-image", "none");
                g.innerHTML = h
            } else {
                if (Z.user && Z.user.nick) {
                    var b = {
                        nick: "",
                        sex: "\u4fdd\u5bc6",
                        from: "\u4fdd\u5bc6",
                        registDate: "",
                        visitDate: "\u6ca1\u6709\u767b\u5f55",
                        sellNum: "",
                        buyNum: "",
                        certification: "",
                        relation: ""
                    };
                    b = P.merge(b, Z.user);
                    switch (b.sex) {
                        case 1:
                            b.sex = "\u7537";
                            break;
                        case 2:
                            b.sex = "\u5973";
                            break;
                        default:
                            b.sex = "\u4fdd\u5bc6";
                            break
                    }
                    var j = b.sellNum,
						c = b.buyNum,
						a = (b.certification == "true");
                    if (j != 0) {
                        j = '<img align="absmiddle" title="\u5356\u5bb6\u4fe1\u7528\u79ef\u5206" src="http://a.tbcdn.cn/sys/common/icon/rank/b_' + b.sellNum + '.gif" />'
                    }
                    if (c != 0) {
                        c = '<img align="absmiddle" title="\u4e70\u5bb6\u4fe1\u7528\u79ef\u5206" src="http://a.tbcdn.cn/sys/common/icon/rank/c_' + b.buyNum + '.gif" />'
                    }
                    if (a) {
                        a = '<img align="absmiddle" title="\u6dd8\u5b9d\u8ba4\u8bc1\u5546\u6237" src="http://a.tbcdn.cn/sys/common/icon/trade/mall_auth.png" />'
                    }
                    var d = "";
                    if (Z.user.suspended == 3) {
                        d = '<p class="tdog-userinfo-suspended">\u8be5\u7528\u6237\u5df2\u7ecf\u88ab\u67e5\u5c01</p>'
                    }
                    var X = '<div class="tdog-popup-userinfo">' + d + '<p class="tdog-userinfo-username">' + b.nick + '</p><p>\u6765\u81ea\uff1a<span class="tdog-popup-userinfo-from">' + b.from + "</span><br/> \u6027\u522b\uff1a" + b.sex + "</p><p>\u6ce8\u518c\u65f6\u95f4\uff1a" + b.registDate.split(" ")[0] + "</p><p>\u4e0a\u6b21\u767b\u5f55\uff1a" + b.visitDate.split(" ")[0] + "</p>" + (j != "" ? "<p>\u5356\u5bb6\uff1a" + j + "</p>" : "") + (c != "" ? "<p>\u4e70\u5bb6\uff1a" + c + "</p>" : "") + (a ? "<p>\u8ba4\u8bc1\uff1a" + a + "</p>" : "") + "</div>";
                    C.css(g, "background-image", "none");
                    g.innerHTML = X;
                    b.relation == 1 ? (b.relation = "\u597d\u53cb") : (b.relation = "\u964c\u751f\u4eba");
                    var i = P.get("div.tdog-popup-head", K);
                    g = P.get("div", i);
                    g.innerHTML = g.innerHTML.replace(/\u964c\u751f\u4eba/, b.relation)
                }
            }
        },
        checkDialogOpen: function (X) {
            if (T) {
                return W.formatNick(X) == W.formatNick(T.userName)
            }
        },
        isOpen: function () {
            return !!K
        },
        getTargetUser: function () {
            return T.userName
        },
        updateUserStatus: function (c, Z) {
            if (W.formatNick(T.userName) != W.formatNick(c)) {
                return
            }
            var b = P.get("div.tdog-popup-head", K),
				a = P.get("div", b),
				e = "",
				d, X = /\u597d\u53cb/;
            Z = F.USER_STATUS[Z];
            if (Z[1] != "") {
                e = " - " + Z[1]
            }
            if (X.test(a.innerHTML)) {
                d = "(\u597d\u53cb)"
            } else {
                d = "(\u964c\u751f\u4eba)"
            }
            a.innerHTML = '<i></i><div class="tdog-contact-info"><span class="tdog-popup-contact">' + T.userName + "</span>" + e + "</div>";
            a.className = "tdog-status-" + Z[0]
        },
        showMsg: function (c) {
            if (!P.isArray(c)) {
                return
            }
            var b = P.get("div.tdog-popup-talkhistory", K),
				Z = P.get("div.tdog-popup-talkcontainer", L),
				e = 0,
				a = "",
				d, X;
            for (; e < c.length; e++) {
                a = a + this.__getMessageRealContent(c[e])
            }
            b.innerHTML += a;
            P.later(function () {
                b.scrollTop = b.scrollHeight
            }, 200, false)
        },
        showSysTip: function (Z, a) {
            if (!K) {
                return
            }
            var X;
            if (a) {
                X = P.get("div.tdog-popup-talkright", K);
                if (X) {
                    C.css(X, "background-image", "none");
                    X.innerHTML = Z
                }
            } else {
                X = P.get("div.tdog-popup-talkhistory", K);
                if (X) {
                    X.innerHTML += '<div class="tdog-talk-filetip"><i></i>' + Z + "</div>";
                    X.scrollTop = X.scrollHeight
                }
            }
        },
        updateMsg: function () {
            if (!K) {
                return
            }
            var Z = P.get("div.tdog-popup-talkhistory", K),
				X = F.DataManager.getAllMessages(T.userId);
            Z.innerHTML = "";
            F.ChatDialog.showMsg(X);
            U.fire(F.EVENTS.UPDATE_STATUS_ICON)
        },
        getCurrentChatUserId: function () {
            if (this.isOpen()) {
                return (T && T.userId) ? T.userId : ""
            }
            return ""
        },
        getCurrentChatUserInfo: function () {
            if (this.isOpen()) {
                return T
            }
            return {}
        },
        clearCurrentChatUserId: function () {
            if (T && T.userId) {
                T.userId = ""
            }
        },
        sendMsg: function (Z) {
            var a = F.DataManager.getNickName(),
				X = F.Util.charToFace(Z.value, true);
            this.showMsg([{
                fromId: this.getCurrentChatUserId(),
                userId: a,
                sendTime: F.Util.formatDate(new Date()),
                content: F.Util.escapeHTML(X),
                type: F.MESSAGE_TYPE.SELF
            }]);
            var b = W.formatNick(T.userId);
            U.fire(F.EVENTS.SEND_MESSAGE, {
                userName: b,
                content: X,
                callback: {
                    onFailure: function () {
                        F.ChatDialog.showSysTip("<p><span>\u7f51\u7edc\u539f\u56e0\uff0c\u6d88\u606f\u53d1\u9001\u5931\u8d25\uff01</span></p>")
                    },
                    onTimeout: function () {
                        F.ChatDialog.showSysTip("<p><span>\u7f51\u7edc\u8d85\u65f6\uff01</span></p>")
                    }
                }
            });
            Z.value = ""
        },
        changeBut: function () {
            var Z = P.get("div.tdog-popup-talkinput", K).getElementsByTagName("textarea")[0],
				X = P.get("span.tdog-popup-sendbut", K),
				a = "tdog-popup-sendbut-off",
				b = Z.value;
            if (b == "") {
                if (!C.hasClass(X, a)) {
                    C.addClass(X, a)
                }
            } else {
                if (b != "") {
                    if (C.hasClass(X, a)) {
                        C.removeClass(X, a)
                    }
                }
            }
        },
        _bindUI: function (c) {
            var g = P.get("span.tdog-popup-help", c),
				i = P.get("span.tdog-popup-close", c),
				k = P.get("a.tdog-popup-pulloff", c),
				e = P.get("div.tdog-popup-talkright", c),
				n = P.get("div.tdog-popup-talkleftinner", c),
				j = P.get("span.tdog-popup-changesend", c),
				b = P.get("div.tdog-popup-talkbar", c),
				X = P.get("span.tdog-popup-talkbar-clear", c),
				d = P.get("div.tdog-popup-talkhistory", c),
				a = P.get("div.tdog-popup-tms-bullet", c),
				m = C.children(b)[0],
				Z = C.next(j),
				h = Z.getElementsByTagName("li"),
				f = P.get("span.tdog-popup-send", c),
				l = P.get("div.tdog-popup-talkinput", c).getElementsByTagName("textarea")[0];
            B.on(c, "click", function (o) {
                var q = o.target;
                if (q != m) {
                    C.css(E, "display", "none")
                }
                if (q.className == "tdog-popup-tms-bulletin-close") {
                    var p = d.offsetHeight + 22;
                    P.get("div.tdog-popup-tms-bulletin-close", c).parentNode.parentNode.style.display = "none";
                    C.css([d, k], "height", p)
                }
            });
            B.on(g, "click", function () {
                var o = O(F.DataManager.getNickName()),
					p = O("\u95ee\u9898\u54a8\u8be2");
                Q.open("http://im.robot.aliapp.com/all/aliqzg/webspace.jsp?id=4&userId=" + o + "&ask=" + p);
                F.Util.sendLog("wwweblog=checkww")
            });
            B.on(X, "click", function () {
                var o = F.ChatDialog.getCurrentChatUserId();
                d.innerHTML = "";
                F.DataManager.deleteMessage(o);
                W.clearChatMessage(o)
            });
            B.on(i, "click", function () {
                c.style.display = "none";
                C.css(E, "display", "none");
                d.innerHTML = "";
                K = false;
                T = ""
            });
            B.on(k, "click", function () {
                if (e.style.display != "none") {
                    M.css([
						[e, "display", "none"],
						[c, "width", d.offsetWidth + (P.UA.ie ? 6 : 2) + "px"],
						[n, "margin-right", "auto"],
						[d, "width", "auto"],
						[d, "marginRight", "6px"]
					]);
                    C.attr(k, "title", "\u663e\u793a\u4fa7\u8fb9\u680f");
                    k.className = "tdog-popup-pullon";
                    P.get("div.tdog-popup-handle-y", c).style.height = "38%"
                } else {
                    M.css([
						[e, "display", "block"],
						[c, "width", c.offsetWidth + 147 + "px"],
						[n, "marginRight", "145px"]
					]);
                    e.style.height = parseInt(c.offsetHeight) - 37 + "px";
                    C.attr(k, "title", "\u9690\u85cf\u4fa7\u8fb9\u680f");
                    k.className = "tdog-popup-pulloff";
                    P.get("div.tdog-popup-handle-y", c).style.height = "95%"
                }
            });
            B.on(f, "click", function () {
                if (!F.ChatDialog.__checkLength(l.value)) {
                    return
                }
                this.sendMsg(l);
                this.changeBut();
                C.css(Z, "display", "none")
            }, this, true);
            B.on(j, "click", function () {
                if (C.css(Z, "display") == "none") {
                    C.css(Z, "display", "block");
                    C.addClass(c, "tdog-popup-visible");
                    if (P.UA.ie == 6) {
                        C.css(c, "paddingBottom", "0")
                    }
                } else {
                    C.css(Z, "display", "none");
                    if (C.hasClass(c, "tdog-popup-visible")) {
                        C.removeClass(c, "tdog-popup-visible");
                        if (P.UA.ie == 6) {
                            C.css(c, "paddingBottom", "1px")
                        }
                    }
                }
            });
            B.on(h[0], "click", function () {
                if (h[0].className == "") {
                    h[0].className = "tdog-send-mode";
                    h[1].className = ""
                }
                C.css(Z, "display", "none")
            });
            B.on(h[1], "click", function () {
                if (h[1].className == "") {
                    h[1].className = "tdog-send-mode";
                    h[0].className = ""
                }
                C.css(Z, "display", "none")
            });
            B.on(l, "mousedown", function (o) {
                this.changeBut()
            }, this, true);
            B.on(l, "paste", function (o) {
                var p = this;
                Q.setTimeout(function () {
                    p.changeBut()
                }, 100)
            }, this, true);
            B.on(l, "keyup", function () {
                this.changeBut()
            }, this, true);
            B.on(l, "keydown", function (o) {
                var q, s = this;
                if (o == null) {
                    return
                }
                if (o.ctrlKey && o.keyCode == 13) {
                    var p = l.value;
                    if (h[0].className == "tdog-send-mode") {
                        if (!F.ChatDialog.__checkLength(p)) {
                            return
                        }
                        this.sendMsg(l)
                    } else {
                        if (A.selection) {
                            var t = A.selection.createRange();
                            t.text = "\r\n"
                        } else {
                            var u = p.length,
								r = u - l.selectionEnd;
                            l.value = p.substr(0, l.selectionStart) + "\r\n" + p.substring(l.selectionEnd, u);
                            l.selectionEnd = u - r + 1
                        }
                    }
                } else {
                    if (o.keyCode == 13) {
                        if (h[1].className == "tdog-send-mode") {
                            o.preventDefault();
                            if (!F.ChatDialog.__checkLength(l.value)) {
                                return
                            }
                            this.sendMsg(l)
                        } else { }
                    }
                } if (o.keyCode == 27) {
                    s.closeDialog()
                }
            }, this, true);
            B.on(m, "click", function () {
                F.ChatDialog.Face.show(m, l)
            });
            B.on(d, "click", function (o) {
                var s = o.target;
                if (s.nodeName.toUpperCase() == "A" && s.parentNode.className == "webww-msg-unsafe-link") {
                    var r = P.get("div.tdog-popup-talkhistory", K);
                    var q, p = P.get("div.tdog-popup-tips");
                    if (!p) {
                        p = '<div class="tdog-tips tdog-popup-tips"><div class="tdog-tipscontainer"><i class="tdog-tipsalert"></i><i class="tdog-tipsclose"></i><div class="tdog-tipsmain"><p>\u65e0\u6cd5\u786e\u8ba4\u94fe\u63a5\u7684\u5b89\u5168\u6027\uff0c\u8bf7\u53ea\u6253\u5f00\u6765\u6e90\u53ef\u9760\u7684\u7f51\u5740</p><p><a id="__last__webww_msg_unsafe_link" href="' + s.href + '" target="_blank">\u6253\u5f00\u94fe\u63a5</a>&nbsp;&nbsp;&nbsp;&nbsp;</p></div></div></div>';
                        p = C.create(p);
                        s.parentNode.appendChild(p);
                        if (r.scrollHeight - 150 > 0) {
                            p.style.top = r.offsetHeight + r.scrollTop - 150 + "px"
                        }
                        p.style.zoom = 1;
                        q = P.get("i.tdog-tipsclose", p);
                        B.on(q, "click", function () {
                            s.parentNode.removeChild(p)
                        })
                    } else {
                        p.style.top = r.offsetHeight + r.scrollTop - 150 + "px";
                        P.get("#__last__webww_msg_unsafe_link").href = s.href
                    }
                    o.preventDefault()
                }
            })
        },
        __getMessageRealContent: function (a) {
            var Z = parseInt(a.type);
            switch (Z) {
                case F.MESSAGE_TYPE.SELF:
                    return this.__talkMessage(a, a.userId, true);
                case F.MESSAGE_TYPE.OFFLINE:
                    return this.__talkMessage(a, a.fromId);
                case F.MESSAGE_TYPE.TALK:
                    var b = "";
                    var X = parseInt(a.subType);
                    switch (X) {
                        case F.MESSAGE_SUBTYPE.FAIL_ACK:
                            b = F.UNSUPPORT_MSG[X].replace("{content}", a.content);
                            break;
                        case F.MESSAGE_SUBTYPE.ILLEGALITY:
                            b = a.content;
                            break;
                        case F.MESSAGE_SUBTYPE.NEED_AUTH:
                            return "";
                        case F.MESSAGE_SUBTYPE.FILE_MESSAGE:
                        case F.MESSAGE_SUBTYPE.PIC_MESSAGE:
                        case F.MESSAGE_SUBTYPE.GRAFFITI:
                        case F.MESSAGE_SUBTYPE.REMOTE_ASSIST:
                        case F.MESSAGE_SUBTYPE.AV:
                        case F.MESSAGE_SUBTYPE.FOLDER:
                        case F.MESSAGE_SUBTYPE.PEER_VERIFY:
                            b = F.UNSUPPORT_MSG[X] + "</br>" + F.ERROR_MESSAGE["-40000"];
                            break;
                        case F.MESSAGE_SUBTYPE.TALK_MESSAGE:
                            return this.__talkMessage(a, a.fromId, undefined, undefined, true);
                        case F.MESSAGE_SUBTYPE.AUTO_BACK_TALK_MESSAGE:
                            return this.__talkMessage(a, a.fromId, undefined, true, true);
                        default:
                            P.log("\u51fa\u73b0\u672a\u5b9a\u4e49\u7684\u6d88\u606f\u7c7b\u578b\uff1a" + a.subType, "warn");
                            return ""
                    }
                    return '<div class="tdog-talk-filetip"><i></i><p><span>' + b + "</span></p></div>"
            }
            P.log("\u6d88\u606f\u4e2d\u51fa\u73b0\u9519\u8bef:" + Z, "warn");
            return ""
        },
        __talkMessage: function (Z, a, c, b) {
            var X = Z.content;
            X = F.Util.charToFace(Z.content, null, c);
            X = X.replace(/\n/g, "<br />");
            return '<p class="tdog-talk-others"><span class="tdog-talk-username">' + F.Util.getUserName(a) + '</span><span class="tdog-talk-time">(' + Z.sendTime + '):</span></p><div class="tdog-talk-content">' + (b ? '<span class="tdog-auto-back-talk-message">[\u81ea\u52a8\u56de\u590d]</span>' : "") + X + "</div>"
        },
        __checkLength: function (a) {
            var c, Z, X = '<div class="tdog-tips tdog-popup-tips"><div class="tdog-tipscontainer"><s class="tdog-tipsext"></s><i class="tdog-tipsimg"></i><i class="tdog-tipsclose"></i><div class="tdog-tipsmain"><p>\u4f60\u53d1\u9001\u7684\u6d88\u606f\u8fc7\u957f\uff0c\u8bf7\u4e0b\u8f7d\u652f\u6301\u53d1\u9001\u8d85\u957f\u4fe1\u606f\u7684<a href="' + J.downloadWangWangURLBuy + '" target="_blank">\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef</a></p></div></div></div>',
				e = P.get("div.tdog-popup-talkcontainer", L);
            Z = 0;
            for (c = 0; c < a.length; c++) {
                if ((a.charCodeAt(c) >= 0) && (a.charCodeAt(c) <= 255)) {
                    Z = Z + 1
                } else {
                    Z = Z + 2
                }
            }
            if (Z > 300) {
                if (P.query("div.tdog-popup-tips", e).length == 1) {
                    return
                }
                var b = C.create(X),
					d;
                e.appendChild(b);
                d = P.get("i.tdog-tipsclose", b);
                B.on(d, "click", function () {
                    e.removeChild(b)
                });
                return false
            } else {
                if (Z == 0) {
                    return false
                }
            }
            return true
        }
    };
    F.ChatDialog.Face = {
        init: function (X) {
            E = A.createElement("div");
            E.id = "tdog-face-container";
            for (var Z = 0; Z < 99; Z++) {
                E.innerHTML += '<span data-icon="' + Z + '.gif"></span>'
            }
            P.get("#tstart").appendChild(E);
            this._bindUI()
        },
        show: function (a, X) {
            if (!E) {
                this.init(X)
            } else {
                E.style.display = "block"
            }
            var Z = [C.offset(a).left, C.offset(a).top - 237];
            C.offset(E, {
                left: Z[0],
                top: Z[1]
            });
            X.focus()
        },
        _bindUI: function () {
            B.on(E, "click", function (a) {
                var e = P.get("div.tdog-popup-talkinput", K).getElementsByTagName("textarea")[0],
					Z = a.target,
					c = C.attr(Z, "data-icon");
                c = F.Util.faceToChar(c);
                e.focus();
                if (typeof A.selection != "undefined") {
                    A.selection.createRange().text = c
                } else {
                    var d = e.value,
						X = d.length,
						b = X - e.selectionEnd;
                    e.value = d.substr(0, e.selectionStart) + c + d.substring(e.selectionEnd, e.value.length);
                    e.selectionEnd = e.value.length - b
                }
                E.style.display = "none";
                F.ChatDialog.changeBut()
            })
        }
    }
});
TDog.add("StatusIcon", function (A) {
    var D = KISSY,
		C = D.DOM,
		E, B = 0;
    A.StatusIcon = {
        init: function () {
            D.log("init StatusIcon");
            E = D.get("#tstart-plugin-tdog s.tstart-item-icon");
            this.offline()
        },
        onlogin: function () {
            E.className = "tstart-item-icon tstart-tdog-login"
        },
        isLogining: function () {
            return C.hasClass(E, "tstart-tdog-login")
        },
        online: function () {
            if (E.className != "tstart-item-icon tstart-tdog-online") {
                E.className = "tstart-item-icon tstart-tdog-online"
            }
        },
        offline: function () {
            E.className = "tstart-item-icon tstart-tdog-offline"
        },
        isOffline: function () {
            return C.hasClass(E, "tstart-tdog-offline")
        },
        getmessage: function () {
            if (E.className != "tstart-item-icon tstart-tdog-mess") {
                E.className = "tstart-item-icon tstart-tdog-mess"
            }
        },
        onNewMessage: function () {
            return C.hasClass(E, "tstart-tdog-mess")
        },
        showcount: function (F) {
            if (B === F) {
                return
            }
            if (F == 0) {
                E.innerHTML = "";
                this.online()
            } else {
                E.innerHTML = '<span class="tdog-toolbar-msgnum">' + F + "</span>";
                this.getmessage()
            }
            B = F
        },
        removeicon: function () {
            E.className = "tstart-item-icon"
        }
    }
});
TDog.add("SysMessage", function (C) {
    var F = KISSY,
		A = F.DOM,
		B = F.Event,
		G, I, H, D = "none",
		J = "block",
		E = '<div id="tdog-sys-message" class="tdog-simplepop" style="display:none;"><div class="tdog-simplepop-head"><span>\u7cfb\u7edf\u6d88\u606f</span><span class="tdog-closebut"></span></div><div class="tdog-simplepop-main"><div class="tdog-sysinfo"><dl></dl></div><div class="tdog-sysinfo-foot"></div></div></div>';
    C.SysMessage = {
        init: function () { },
        _create: function () {
            G = A.create(E);
            F.get("#tstart").appendChild(G);
            I = F.get("dl", G);
            this._bindUI()
        },
        show: function (K) {
            if (!I) {
                this._create()
            }
            this._loadData(K);
            G.style.display = J
        },
        _loadData: function (K) {
            K.datetime = K.datetime.split(" ")[0];
            var L = (K.content || "").replace(/\r\n/ig, "<br />");
            I.innerHTML = '<dt><p><span class="tdog-info-mailicon"></span><span class="tdog-info-title">' + K.title + '</span><span class="tdog-info-time">' + K.datetime + '</span><span class="tdog-info-toolopen"></span></p></dt><dd style="display:none">' + L + "</dd>" + I.innerHTML
        },
        _bindUI: function () {
            B.on("#tdog-sys-message .tdog-closebut", "click", function () {
                G.style.display = D
            });
            B.on(I, "click", function (K) {
                var N = K.target,
					L = N,
					M;
                while (L.nodeName !== "DT" && L !== I) {
                    L = L.parentNode
                }
                if (L.nodeName === "DT") {
                    if (H && H != L && F.get(".tdog-info-toolclose", H)) {
                        F.get(".tdog-info-toolclose", H).className = "tdog-info-toolopen";
                        H.nextSibling.style.display = D
                    }
                    M = L.nextSibling;
                    if (M.style.display === J) {
                        F.get(".tdog-info-toolclose", L).className = "tdog-info-toolopen";
                        M.style.display = D
                    } else {
                        F.get(".tdog-info-toolopen", L).className = "tdog-info-toolclose";
                        M.style.display = J
                    }
                    H = L
                }
            })
        }
    }
});
TDog.add("SysPopup", function (E) {
    var D = KISSY,
		C = D.DOM,
		A = D.Event;
    POPUP_TEMP = '<div class="tdog-simplepop" style="width:225px;"><div class="tdog-simplepop-head"><span class="tdog-simplepop-icon"></span><span>{title}</span><span class="tdog-closebut"></span> </div><div class="tdog-simplepop-main"><div class="tdog-remind"><div class="tdog-remind-inner">{content}</div></div> <div class="tdog-remind-foot"><span>{time}</span></div></div></div>';
    E.SysPopup = {
        init: function () {
            var F = {
                content: "\u60a8\u7684\u6dd8\u5b9d\u8ba2\u9605\u6709\u66f4\u65b0<br>\u6d3b\u52a80 \u5546\u54c10 \u5e97\u94fa 0<br>\u67e5\u770b\u66f4\u65b0 \u7ba1\u7406\u8ddf\u65b0",
                style: "pos=3;width=225;height=150;format=1;staytime=18000001;showmode=0;title=\u7cfb\u7edf\u63d0\u793a;enablemove=0"
            }
        },
        show: function (F) {
            if (!F.content) {
                return
            }
            var I = {
                title: "\u6dd8\u5b9d\u65fa\u65fa\u8ba2\u9605\u63d0\u9192",
                width: "225px",
                time: new Date(),
                staytime: 60000
            };
            if (F.style) {
                var H = D.unparam(F.style, ";");
                I = Y.lang.merge(I, H)
            }
            if (F.time) {
                I.time = F.time
            }
            I.content = F.content;
            I.time = E.Util.formatDate(I.time);
            var G = C.create(B(POPUP_TEMP, I));
            D.get("#tstart").appendChild(G);
            this._bindUI(G);
            window.setTimeout(function () {
                if (G) {
                    D.get("#tstart").removeChild(G)
                }
            }, I.staytime)
        },
        _bindUI: function (F) {
            var G = D.get("span.tdog-closebut", F);
            A.on(G, "click", function (H) {
                D.get("#tstart").removeChild(F)
            })
        }
    };

    function B(G, F) {
        return G.replace(/\{([^}]+)\}/g, function (I, H) {
            return F[H] || ""
        })
    }
});
TDog.add("SysTips", function (D) {
    var L = KISSY,
		B = L.DOM,
		C = L.Event,
		N, K, E, J = "tstart-item-hover-tips",
		M = "tstart-hidden",
		I = "tstart-tips-login-ok-btn",
		A = "tstart-client-oneline",
		H = "tstart-client-cancle-oneline",
		G = "tstart-client-help-oneline",
		F = '<span class="tstart-item-tips tdog-systips tstart-hidden"><i></i><s></s><div class="tdog-systips-content">{CONTENT}</div></span>';
    D.SysTips = {
        init: function () {
            L.log("init SysTips");
            var O = D.hostEl;
            K = B.create(F);
            E = L.get(".tdog-systips-content", K);
            O.appendChild(K);
            N = L.get(".tstart-tdog-trigger", O);
            this._bindUI()
        },
        show: function (P, O, Q) {
            K.style.width = (O || 120) + "px";
            E.innerHTML = P || D.ERROR_MESSAGE[-1];
            B.removeClass(K, J);
            B.removeClass(K, M);
            if (Q) {
                L.later("hide", Q * 1000, false, this, K)
            }
        },
        setHoverTips: function (O) {
            E.innerHTML = O;
            B.addClass(K, J)
        },
        hide: function () {
            B.addClass(K, M)
        },
        _bindUI: function () {
            var O = this;
            C.on(K, "click", function (Q) {
                var P = Q.target;
                if (B.hasClass(P, I)) {
                    D.WebServer.login()
                } else {
                    if (B.hasClass(P, A)) {
                        D.Login.online = true;
                        D.Login.ready = true;
                        D.WebServer.login(D.WebServer.AUTO_LOGIN.forcedLogin);
                        D.Util.sendLog("&wwweblog=confirm")
                    } else {
                        if (B.hasClass(P, G)) {
                            window.open("http://im.robot.aliapp.com/all/aliqzg/webspace.jsp?id=4&ask=%E5%AE%89%E8%A3%85%E4%BA%86%E9%98%BF%E9%87%8C%E6%97%BA%E6%97%BA%EF%BC%8C%E7%82%B9%E2%80%9C%E5%92%8C%E6%88%91%E8%81%94%E7%B3%BB%E2%80%9D%E6%9C%AA%E5%BC%B9%E5%87%BA%E8%81%8A%E5%A4%A9%E7%AA%97%E5%8F%A3%EF%BC%9F&page=kjts", "")
                        } else {
                            if (B.hasClass(P, H)) {
                                D.StatusIcon.offline();
                                D.Util.sendLog("&wwweblog=cancel")
                            } else {
                                if (P.nodeName === "A" && P.className != "tstart-item-tips-on") {
                                    location.href = P.href
                                }
                            }
                        }
                    }
                }
                O.hide()
            })
        },
        showLoginTips: function (O) {
            if (O || D.StatusIcon.isLogining()) {
                this.show("\u963f\u91cc\u65fa\u65fa\u6b63\u5728\u767b\u5f55\uff0c\u8bf7\u7a0d\u5019\u2026\u2026", 110)
            } else {
                var P = D.DataManager.getNickName();
                this.show("\u548c\u5bf9\u65b9\u804a\u5929\uff0c\u9700\u8981\u767b\u5f55\u963f\u91cc\u65fa\u65fa\uff0c\u786e\u5b9a\u7528\u5e10\u53f7\uff08" + P + '\uff09\u767b\u5f55\u5417\uff1f<hr><span class="tstart-item-tips-btn ' + I + '">\u786e\u5b9a</span><span class="tstart-item-tips-btn">\u53d6\u6d88</span>', 200)
            }
        },
        showClientOnlineTips: function () {
            var P = D.DataManager.getNickName(),
				O = "http://service.taobao.com/support/help-16380.htm";
            this.show("\u60a8\u7684\u5e10\u53f7\uff08" + P + '\uff09\u5df2\u7ecf\u767b\u5f55\u4e86\u963f\u91cc\u65fa\u65fa<br/>1\u3001\u70b9\u51fb\u3010\u786e\u5b9a\u3011\u7ee7\u7eed\u767b\u5f55\u7f51\u9875\u7248,\u767b\u5f55\u6210\u529f\u540e\u4f1a\u628a\u5df2\u767b\u5f55\u7684\u5ba2\u6237\u7aef\u8e22\u4e0b\u7ebf<br>2\u3001\u5982\u679c\u60a8\u5df2\u767b\u5f55\u5ba2\u6237\u7aef,\u70b9\u51fb\u3010<a target="_blank" class="tstart-item-tips-on" href=' + O + ' >\u5e2e\u52a9</a>\u3011,\u83b7\u53d6\u5982\u4f55\u7ee7\u7eed\u4f7f\u7528(\u4fee\u590d)\u5ba2\u6237\u7aef\u7684\u65b9\u6cd5<hr><span class="tstart-item-tips-btn ' + A + '">\u786e\u5b9a</span><span class="tstart-item-tips-btn ' + H + '">\u53d6\u6d88</span><span class="tstart-item-tips-btn ' + G + '">\u5e2e\u52a9</span>', 280)
        },
        showLoginFailedTips: function (O) {
            var P = D.ERROR_MESSAGE[O] || "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5";
            this.show(P + '<hr><span class="tstart-item-tips-btn">\u786e\u5b9a</span>', 180)
        },
        showLogoutTips: function (O) {
            O = O || -1;
            var P = "\u963f\u91cc\u65fa\u65fa\u73b0\u5728\u79bb\u7ebf\u4e86\u3002<hr>\u662f\u5426\u91cd\u65b0\u767b\u5f55\uff1f";
            if (O == "402") {
                P = "\u4f60\u7684\u5e10\u53f7(" + D.DataManager.getNickName() + ")\u5df2\u7ecf\u5728\u5176\u4ed6\u5730\u65b9\u767b\u5f55\uff01<hr>\u9700\u8981\u91cd\u65b0\u767b\u5f55\u5417\uff1f"
            }
            if (O != -1) {
                this.show(P + '<br /><span class="tstart-item-tips-btn ' + I + '">\u786e\u5b9a</span><span class="tstart-item-tips-btn">\u53d6\u6d88</span>', 180)
            }
        },
        showWelcomeTips: function () {
            this.show("\u6b22\u8fce\u4f7f\u7528\u5168\u65b0\u963f\u91cc\u65fa\u65fa\u7f51\u9875\u7248\uff01", 100)
        },
        showLastTips: function () {
            if (!B.hasClass(K, J)) {
                B.removeClass(K, M)
            }
        }
    }
});
TStart.add("plugin~tdog", function (B) {
    var D = KISSY.DOM,
		G = KISSY.Event,
		C = B.PLUGIN_TYPE,
		A = TDog.EVENTS,
		F = TDog.EventCenter,
		E = '<div class="tstart-tdog-panel"><div class="tstart-tdog-panel-hd"><span>\u6700\u8fd1\u8054\u7cfb\u4eba</span><s class="tstart-tdog-panel-clearbtn"></s><s class="tstart-tdog-panel-closebtn"><img src="http://img01.taobaocdn.com/tps/i1/T1R6pOXoRyXXXXXXXX-15-15.png"></s></div><div class="tstart-tdog-panel-bd tstart-panel-loading" style="width:160px;height:160px"></div></div>';
    B.addPlugin("tdog", {
        type: "custom",
        tips: "\u963f\u91cc\u65fa\u65fa",
        html: '<span class="tstart-tdog-trigger"><s class="tstart-item-icon"></s></span>' + E,
        init: function () {
            var H = this;

            function J(K) {
                if (D.hasClass(K.target, "tstart-item-icon")) {
                    return F.fire(A.CLICK_STATUS_ICON)
                }
                return false
            }
            function I(K) {
                if (!TDog.DataManager.isLogin()) {
                    return
                }
                TDog.WebServer.getTalkUsers();
                D.removeClass(D.get(".tstart-tdog-panel-bd", "#tstart-plugin-tdog"), "tstart-panel-loading")
            }
            G.on("#tstart-plugin-tdog", "click", function (L) {
                var K = L.target,
					M;
                if (D.hasClass(K, "tstart-item-icon")) {
                    M = D.parent(K, ".tstart-item");
                    if (D.hasClass(M, "tstart-item-active")) {
                        D.removeClass(M, "tstart-item-active")
                    } else {
                        if (J(L)) {
                            B.fire("closePanel");
                            D.addClass(M, "tstart-item-active");
                            I(L)
                        }
                    }
                }
            });
            TDog.init(B, D.get("#tstart-plugin-tdog"))
        }
    })
});
TStart.add("plugin~settings", function (G) {
    var F = KISSY,
		E = F.DOM,
		A = F.Event,
		C = G.PLUGIN_TYPE,
		D = "tstart-item-active",
		B = G.Config.isOnline ? "taobao.com" : "daily.taobao.net";
    G.addPlugin("settings", {
        type: "custom",
        html: '<span class="tstart-settings-trigger" title="\u8bbe\u7f6e web \u65fa\u65fa"><s></s></span><div class="tstart-settings-panel"><div class="tstart-settings-panel-hd"></div><div class="tstart-settings-panel-bd"><p><input type="checkbox" class="tstart-settings-login"/><label>\u81ea\u52a8\u767b\u5f55</label></p><p><input type="checkbox" class="tstart-settings-msg"/><label>\u63a5\u53d7\u964c\u751f\u4eba\u6d88\u606f</label></p></div></div>',
        init: function () {
            var J = E.get("#tstart-plugin-settings"),
				L = E.get(".tstart-settings-panel", J),
				H = E.get(".tstart-settings-login", J),
				I = E.get("#tstart-plugin-tdog"),
				K = E.get(".tstart-settings-msg", J);
            A.on(J, "click", function (M) {
                if (!E.hasClass(J, D)) {
                    TDog.WebServer.checkUserSeting()
                }
                if (E.hasClass(I, D)) {
                    E.removeClass(I, D)
                }
                TStart.fire("closePanel");
                E.toggleClass(J, D);
                M.stopPropagation()
            });
            A.on(L, "click", function (M) {
                M.stopPropagation()
            });
            A.on(document, "click", function () {
                E.removeClass(J, D)
            });
            A.on(H, "click", function () {
                var M = -1;
                if (H.checked) {
                    M = 2
                } else {
                    M = 1
                }
                TDog.WebServer.setAutoLogin(M)
            });
            A.on(K, "click", function () {
                var M = -1;
                if (K.checked) {
                    M = 3
                } else {
                    M = 4
                }
                TDog.WebServer.setStrangerMsg(M)
            })
        }
    })
});
TStart.initPlugins();