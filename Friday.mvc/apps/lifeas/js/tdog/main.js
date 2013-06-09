﻿/*pub-1|2013-06-04 10:09:06*/KISSY.add("dragdrop", function (c) {
    var n = c.Event, o = c.DOM, k = document, f = window, h = { axis: 0, region: false, handle: false, not: false, revert: false, snap: false, scroll: false, lock: false, circular: false, multi: false, resize: false, proxy: false, delay: false, resizefn: false, cursor: false }, m = false, d = function (s, q) {
        var r = s;
        var s = c.makeArray(c.query(s)), p = this, q = c.merge(h, q || {});
        c.each(s, function (t) {
            p._init(t, q, r)
        })
    }, a = function (r, q, p) {
        return (r > p ? p : r < q ? q : r)
    }, g = function (r) {
        var p = o.css(r, "position"), q;
        if (p.toLowerCase() == "absolute") {
            q = [r.offsetLeft, r.offsetTop]
        } else {
            if (p.toLowerCase() == "relative") {
                q = [parseInt(o.css(r, "left")) || 0, parseInt(o.css(r, "top")) || 0]
            }
        }
        return q
    }, b = function (s, r, t, v, q) {
        if (t.toLowerCase() === "left") {
            var u = "offsetWidth", x = 3, w = 1;
            if (c.UA.ie) {
                u = "clientWidth"
            }
        } else {
            var u = "offsetHeight", x = 0, w = 2, p = "clientHeight";
            if (c.UA.ie) {
                u = "clientHeight"
            }
        }
        if (r.region) {
            num = a(parseInt(s.style[t]) + v, r.region[x], r.region[w])
        } else {
            num = parseInt(s.style[t]) + v
        }
        return num
    }, e = function (q, p, r) {
        if (p.toLowerCase() === "left") {
            if (c.UA.ie) {
                num = a(parseInt(q.style[p]) + r, 0, c.DOM.viewportWidth() - q.clientWidth - 2)
            } else {
                num = a(parseInt(q.style[p]) + r, 0, c.DOM.viewportWidth() - q.clientWidth - 2 - 17)
            }
        } else {
            num = a(parseInt(q.style[p]) + r, parseInt(q.style[p]) - parseInt(o.offset(q).top) + (k.documentElement.scrollTop || k.body.scrollTop), 99999)
        }
        return num
    }, i = function (r, q) {
        if (c.isArray(q)) {
            for (var p = 0; p < q.length; p++) {
                if (o.hasClass(r, q[p].substr(1))) {
                    return true
                }
            }
        } else {
            if (o.hasClass(r, q.substr(1))) {
                return true
            }
        }
    }, l = function (q) {
        var p = q.cloneNode(true);
        k.body.appendChild(p);
        return p
    };
    setRegion = function (p, q) {
        q[0] = parseInt(o.css(p, "top")) - q[0];
        q[1] = parseInt(o.css(p, "left")) + q[1];
        q[2] = parseInt(o.css(p, "top")) + q[2];
        q[3] = parseInt(o.css(p, "left")) - q[3];
        return q
    };
    c.augment(d, { _init: function (F, G, t) {
        var C, B, x, v, D = false, E = false, u = this, w = false, y = G.snap, A = [0, 0];
        (function () {
            var I = false;
            if (c.isString(G.region) && G.region.toLowerCase() != "scroll") {
                var J = o.get(G.region);
                G.region = [o.offset(F).top - o.offset(J).top, (o.offset(J).left + J.offsetWidth) - (o.offset(F).left + F.offsetWidth), (o.offset(J).top + J.offsetHeight) - (o.offset(F).top + F.offsetHeight), o.offset(F).left - o.offset(J).left];
                I = true
            } else {
                if (c.isString(G.region) && G.region.toLowerCase() == "scroll") {
                    G.region = [o.offset(F).top, k.documentElement.clientWidth - o.offset(F).left - F.offsetWidth, k.documentElement.clientHeight - o.offset(F).top - F.offsetHeight, o.offset(F).left];
                    I = true
                } else {
                    if (G.region.length == 4 && c.isArray(G.region)) {
                    }
                }
            }
            if (I) {
                setRegion(F, G.region)
            }
            I = false
        })();
        if (G.circular) {
            var s = g(F, G)[0] + G.circular + 30, r = g(F, G)[1] + 30
        }
        var p = function (I) {
            if (G.islock) {
                m = true
            }
            if (G.not && i(I.target, G.not)) {
                return
            }
            w = true;
            A = g(F);
            x = I.clientX;
            v = I.clientY;
            if (!D && G.proxy) {
                E = F;
                D = l(F);
                F = D
            }
            o.css(F, "left", A[0] + "px");
            o.css(F, "top", A[1] + "px");
            if (G.cursor) {
                o.css(F, "cursor", G.cursor)
            }
            u.onStartDrag && u.onStartDrag(I, F, G)
        }, q = function (L) {
            if (!w || u.isLock(G)) {
                return
            }
            C = L.clientX - x;
            B = L.clientY - v;
            if (G.circular) {
                angle = Math.atan2(L.clientX - s, L.clientY - r);
                o.css(F, "left", s + Math.sin(angle) * G.circular - 30 + "px");
                o.css(F, "top", r + Math.cos(angle) * G.circular - 30 + "px")
            } else {
                if (G.snap) {
                    o.css(F, "left", parseInt(F.style.left) + Math.round(C / y[0]) * y[0] + "px");
                    o.css(F, "top", parseInt(F.style.top) + Math.round(B / y[1]) * y[1] + "px");
                    x = x + Math.round(C / y[0]) * y[0];
                    v = v + Math.round(B / y[1]) * y[1]
                } else {
                    if (G.resize) {
                        var I = parseInt(o.css(F, "width")), K = parseInt(o.css(F, "height"));
                        if (G.resizefn[0]) {
                            if (Math.max(20, I + C) > G.resizefn[0]) {
                                if (C > 0 && (L.clientX <= parseInt(o.offset(F).left) + I)) {
                                    C = 0
                                }
                                o.css(F, "width", Math.max(20, I + C) + "px")
                            }
                        }
                        if (G.resizefn[1]) {
                            if (Math.max(20, K + B) > G.resizefn[1]) {
                                if (B > 0 && (parseInt(L.clientY) <= parseInt(o.offset(F).top) + K - parseInt(k.documentElement.scrollTop || k.body.scrollTop))) {
                                    B = 0
                                } else {
                                    o.css(F, "height", Math.max(20, K + B) + "px")
                                }
                            }
                        }
                        x = L.clientX;
                        v = L.clientY
                    } else {
                        if (G.scroll) {
                            if (G.axis != "y") {
                                o.css(F, "left", e(F, "left", C) + "px")
                            }
                            if (G.axis != "x") {
                                o.css(F, "top", e(F, "top", B) + "px")
                            }
                            x = L.clientX;
                            v = L.clientY
                        } else {
                            if (G.multi && o.hasClass(F, "ks-multi")) {
                                var J = c.makeArray(c.query(".ks-multi"));
                                if (J == 0) {
                                    J = [F]
                                }
                            } else {
                                J = [F]
                            }
                            c.each(J, function (M) {
                                if (G.axis != "y") {
                                    o.css(M, "left", b(M, G, "left", C, A) + "px")
                                }
                                if (G.axis != "x") {
                                    o.css(M, "top", b(M, G, "top", B, A) + "px")
                                }
                            });
                            x = L.clientX;
                            v = L.clientY
                        }
                    }
                }
            }
            if (c.UA.chrome) {
                n.on(document, "selectstart", function (M) {
                    M.halt()
                })
            }
            f.getSelection ? f.getSelection().removeAllRanges() : k.selection.empty();
            u.onDrag && u.onDrag(L, F, G, C, B, t)
        }, H = function (I) {
            if (w != true) {
                return
            }
            w = false;
            n.remove(k, "mousemove", q);
            f.getSelection ? f.getSelection().removeAllRanges() : k.selection.empty();
            if (D && G.proxy) {
                o.css(E, "left", parseInt(D.style.left) + "px");
                o.css(E, "top", parseInt(D.style.top) + "px");
                F = E;
                D.parentNode.removeChild(D);
                D = false;
                E = false
            }
            if (G.revert) {
                o.css(F, "left", A[0] + "px");
                o.css(F, "top", A[1] + "px")
            }
            if (G.cursor) {
                o.css(F, "cursor", "default")
            }
            u.onEndDrag && u.onEndDrag(I, F, G);
            if (c.UA.chrome) {
                n.remove(document, "selectstart")
            }
        }, z = function (I) {
            if (!o.hasClass(F, "ks-multi")) {
                o.addClass(F, "ks-multi")
            } else {
                o.removeClass(F, "ks-multi")
            }
        };
        n.add(c.get(G.handle, F) || F, "mousedown", function (I) {
            p(I);
            n.add(k, "mousemove", q)
        });
        n.add(k, "mouseup", H);
        if (G.multi) {
            n.add(F, "dblclick", z)
        }
    }, onStartDrag: null, onDrag: null, onEndDrag: null, isLock: function () {
        return m
    } 
    });
    c.Drag = d;
    function j(u, s, p, w, r, q, v, t) {
        if (r >= p || q >= w || v <= u || t <= s) {
            return false
        } else {
            return true
        }
    }
    c.Drag.intersectRect = j
});
var TDog = (function (g) {
    var l = g.DOM, f = TStart, i = window, k = i.g_config && i.g_config["appId"], a = f.isOnline, b = f.Config.DOMAIN, j = (function () {
        var m = location.hostname;
        if (m.indexOf("tmall.com") > 0) {
            m = "webww.tmall.com"
        } else {
            if (m.indexOf("tmall.net") > 0) {
                m = "webww.daily.tmall.net:8080"
            } else {
                if (m.indexOf("taobao.net") > 0) {
                    m = "webww.daily.taobao.net:8080"
                } else {
                    m = "webwangwang.taobao.com"
                }
            }
        }
        return "http://" + m + "/"
    })(), e = (function () {
        var m = location.hostname;
        if (m.indexOf("tmall.com") > 0) {
            m = "webww.tmall.com"
        } else {
            if (m.indexOf("tmall.net") > 0) {
                m = "webww.daily.tmall.net:8080"
            } else {
                if (m.indexOf("taobao.net") > 0) {
                    m = "webww.daily.taobao.net:8080"
                } else {
                    m = "get.webwangwang.taobao.com"
                }
            }
        }
        return "http://" + m + "/"
    })(), d = ".do", h = "http://www.taobao.com/wangwang/2010_fp/buyer.php?tracelogww2010=webww", c = "http://www.taobao.com/wangwang/2010_fp/seller.php?tracelogww2010=webww";
    return { version: "1.0", _MODS: {}, add: function (n, m) {
        return this._MODS[n] = m(TDog)
    }, Config: { getTokenUrl: j + "gettoken" + d, loginUrl: j + "login" + d, getLoginResultUrl: j + "getloginresult" + d, startUrl: j + "start" + d, receiveUrl: j + "receive" + d, sendUrl: j + "send" + d, getUrl: j + "get" + d, notifyUrl: e + "connection.html?t=20110322", connectionURL: j + "buildconnection" + d, checkAutoLoginUrl: j + "usertag.do", getTalkUsers: j + "gettalkusers" + d, removeContact: j + "removecontact" + d, ackGetMessage: j + "ackgetmessage" + d, tbLoginUrl: "https://login." + b + "/member/login.jhtml?f=top", tmsAdUrl: "http://www.taobao.com/go/rgn/tdog/link-for-chat-window.php", tmsBulletinUrl: "http://www.taobao.com/go/rgn/webww/wangwang-bulletin.php", clearUrl: j + "clear.do", clearListUrl: j + "clear.do?act=2", setAutoLoginUrl: j + "usertag.do", TagKeyUrl: j + "tagkey.do", LIGHT_NICK: "wwlight", forceAutoLogin: false, appId: k, X: "x", NOTIFY_STATUS: { logout: { key: 0, value: -1 }, timeout: { key: 1, value: -2 }, message: { key: 2, value: -3 }, close: { key: 3, value: -4 }, notMessage: { key: 4, value: 0} }, downloadWangWangURLBuy: h, downloadWangWangURLSeller: c, DOMAIN: b, LOGIN_KEY: "login_key", hash: [9, 6, 7, 19, 15, 22, 2, 26, 18, 24, 21, 25, 16, 13, 25, 12] }, isReady: false, init: function (v, A) {
        g.log("\u5f00\u59cb\u521d\u59cb\u5316 Web \u65fa\u65fa");
        var w = this, t = w.Util, p = w.Config, q = w.Login, z = w.SysTips, s = w.DataManager, m = g.Cookie.get(p.X), r = g.get("#tstart");
        q.init();
        w.host = v;
        w.hostEl = A;
        z.init();
        w.StatusIcon.init();
        w.EventCenter.init();
        if (g.unparam(m).p === "tdog" || Light.addonIsOK() || !s.getNickName()) {
            g.log("\u63a7\u4ef6\u5b89\u88c5\u6b63\u5e38\u6216\u6dd8\u5b9d\u672a\u767b\u5f55\uff0cWeb \u65fa\u65fa\u9000\u51fa\u521d\u59cb\u5316");
            l.addClass(r, "tstart-tdog-disabled");
            return
        } else {
            if (Light.addonIsOK()) {
                g.log("\u63a7\u4ef6\u5b89\u88c5\u6b63\u5e38\uff0c\u5de5\u5177\u6761\u4e0a\u4e0d\u663e\u793a Web \u65fa\u65fa\uff0c\u9000\u51fa\u521d\u59cb\u5316");
                l.addClass(r, "tstart-tdog-disabled");
                return
            } else {
                if (Light.addonIsOK()) {
                    g.log("\u63a7\u4ef6\u5b89\u88c5\u6b63\u5e38\uff0c\u5de5\u5177\u6761\u4e0a\u4e0d\u663e\u793a Web \u65fa\u65fa\uff0c\u9000\u51fa\u521d\u59cb\u5316");
                    l.addClass(r, "tstart-tdog-disabled");
                    return
                }
            }
        }
        l.addClass(r, "tstart-tdog-enable");
        var y = location.search;
        if (y && (y = y.substring(1))) {
            var n = g.unparam(y), x = n[p.LIGHT_NICK];
            if (k === 0) {
                x = t.decode(n.touid || n.tid)
            }
            if (x) {
                g.log("wwlight = " + x);
                if (!t.hasSitePrefix(x)) {
                    x = "cntaobao" + x
                }
                Light.lightedUsers.push(x);
                p.forceAutoLogin = true
            }
        }
        if (k === 7 && r) {
            r.style.zIndex = 20001
        }
        u();
        function u() {
            s.init();
            w.WebServer.init();
            w.RecentList.init();
            w.ChatDialog.init();
            w.SysMessage.init();
            w.SysPopup.init();
            w.isReady = true;
            w.EventCenter.fire(w.EVENTS.TDOG_READY);
            t.tmalllog("ww.1.20.1.1.3")
        }
    }, EVENTS: { CLICK_LIGHT_ICON: "clickLightIcon", CLICK_STATUS_ICON: "clickStatusIcon", LOGIN_START: "loginStart", LOGIN_SUCCESS: "loginSuccess", ERROR_LOGIN_FAILED: "errorLoginFailed", SHOW_RECENT_LIST: "showRecentList", SHOW_CHAT_DIALOG: "showChatDialog", SHOW_CHAT_MSG: "showChatMsg", RECEIVE_CHAT_MESSAGE: "receiveChatMessage", RECEIVE_SUBSCRIBE_MESSAGE: "receiveSystemMessage", RECEIVE_POPUP_MESSAGE: "receivePopupMessage", RECEIVE_LOGINOUT_SIGNAL: "receiveLoginoutSignal", UPDATE_USER_STATUS: "updateUserStatus", UPDATE_STATUS_ICON: "updateStatusIcon", ERROR_GET_CHAT_INFO: "errorGetChatInfo", UPDATE_CHAT_INFO: "updateChatInfo", SEND_MESSAGE: "sendMessage", ERROR_GET_MESSAGE: "errorGetMessage", UPDATE_LOCAL_STATUS: "updateLocalStatus", DAEMON_FIRE: "daemonFire", TDOG_READY: "tdogReady" }, USER_STATUS: { 1: ["offline", "\u79bb\u7ebf"], 2: ["free", "\u5728\u7ebf"], 3: ["busy", "\u5fd9\u788c\u4e2d"], 4: ["away", "\u4e0d\u5728\u7535\u8111\u65c1"], 5: ["incall", "\u63a5\u542c\u7535\u8bdd\u4e2d"], 6: ["outofdinner", "\u5916\u51fa\u5c31\u9910"], 7: ["wait", "\u7a0d\u5019"], 8: ["invisible", ""], 9: ["offlinelogin", ""], 10: ["unknown", ""], 11: ["fakeonline", ""], 12: ["mobileonline", "\u624b\u673a\u5728\u7ebf"] }, WX_USER_STATUS: { 0: ["wxoffline", "\u65fa\u4fe1\u79bb\u7ebf"], 1: ["wxonline", "\u65fa\u4fe1\u5728\u7ebf"] }, ERROR_MESSAGE: { "0": "", "1": "\u8d26\u6237\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u6237\u540d\u3002", "2": "\u60a8\u8f93\u5165\u7684\u8d26\u6237\u540d\u548c\u5bc6\u7801\u4e0d\u5339\u914d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\u3002", "3": '\u60a8\u7684\u5e10\u53f7\u4e0d\u80fd\u767b\u5f55\u7f51\u9875\u7248\u65fa\u65fa\uff0c\u8bf7\u4f7f\u7528\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\uff0c<a target="_blank" class="tstart-item-tips-on" href="' + c + '">\u70b9\u6b64\u4e0b\u8f7d\uff01</a>', "4": "\u60a8\u7684\u8d26\u6237\u6743\u9650\u4e0d\u591f\u3002", "5": "\u60a8\u767b\u5f55\u7684\u5e10\u53f7\u6570\u91cf\u5df2\u8d85\u8fc7\u6700\u5927\u6570\u91cf\u3002", "6": '\u60a8\u662fE\u5ba2\u670d\u7528\u6237\uff0c\u53ea\u80fd\u4f7f\u7528\u963f\u91cc\u65fa\u65fa\uff0c<a target="_blank" class="tstart-item-tips-on" href="' + c + '">\u70b9\u6b64\u4e0b\u8f7d\uff01</a>', "-1": "\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "-2": "\u5bf9\u65b9\u8d26\u53f7\u4e0d\u5b58\u5728\uff0c\u8bf7\u68c0\u67e5\u3002", "-3": "\u8d26\u6237\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u6237\u540d\u3002", "-4": "\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002", "-5": "\u767b\u5f55\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002", "-6": "\u53d1\u9001\u6d88\u606f\u4e0d\u5141\u8bb8\u4e3a\u7a7a\u3002", "-7": "\u60a8\u53d1\u9001\u7684\u6d88\u606f\u8fc7\u957f\uff0c\u8bf7\u4e0b\u8f7d\u652f\u6301\u53d1\u9001\u8d85\u957f\u4fe1\u606f\u7684\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u3002", "-8": "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "-9": "\u8d26\u6237\u4e0d\u5b58\u5728\uff0c\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u8d26\u6237\u540d\u3002", "-10": "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "-11": "\u7cfb\u7edf\u9519\u8bef\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002", "-12": "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\u3002", "-14": "\u8bfb\u6d88\u606f\u51fa\u9519\uff0c\u8bf7\u91cd\u8bd5\u3002", "-15": "\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u5728\u7ebf\uff0c\u662f\u5426\u8e22\u6389\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u3002", "-16": "\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u5728\u7ebf\uff0c\u662f\u5426\u8e22\u6389\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u3002", "-17": "\u767b\u5f55\u5931\u8d25\uff0c\u975e\u6cd5\u8bf7\u6c42\u3002", "-100": "\u963f\u91cc\u65fa\u65fa\u5df2\u79bb\u7ebf\uff0c\u8bf7\u91cd\u65b0\u767b\u5f55\u3002", "-101": "\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\uff0c\u8bf7\u767b\u5f55\u3002", "-102": '\u60a8\u7684\u5e10\u53f7\u88ab\u7981\u6b62\u767b\u5f55WEB\u65fa\u65fa\uff0c\u8bf7\u4f7f\u7528\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef\u767b\u5f55\uff08<a target="_blank" class="tstart-item-tips-on" href="' + h + '">\u70b9\u6b64\u4e0b\u8f7d\uff01</a>\uff09\u3002', "-1000": "\u83b7\u53d6\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002", "-1001": "\u83b7\u53d6\u4fe1\u606f\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002", "-40000": '\u8981\u652f\u6301\u8be5\u529f\u80fd\uff0c\u8bf7\u4e0b\u8f7d <a  target="_blank" href="' + h + '">\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef</a>' }, MESSAGE_TYPE: { OFFLINE: 1, TALK: 2, STATUS: 3, LOGOUT: 4, SYSTEM: 5, SELF: 6 }, MESSAGE_SUBTYPE: { TALK_MESSAGE: 201, AUTO_BACK_TALK_MESSAGE: 202, NEED_AUTH: 204, FAIL_ACK: 205, FILE_MESSAGE: 206, PIC_MESSAGE: 207, GRAFFITI: 208, REMOTE_ASSIST: 209, AV: 210, FOLDER: 211, ILLEGALITY: 212, PEER_VERIFY: 213, NO_HEARTBEAT: 401, OTHER_LOGIN: 402, SESSION_TIMEOUT: 403, POPUP_MESSAGE: 501, SUBSCRIBE_MESSAGE: 502 }, UNSUPPORT_MSG: { 204: "\u5bf9\u65b9\u9700\u8981\u9a8c\u8bc1\uff0c\u6682\u65f6\u65e0\u6cd5\u53d1\u9001\u3002", 205: "\u53d1\u9001\u3010{content}\u3011\u6d88\u606f\u5931\u8d25\u3002", 206: "\u5bf9\u65b9\u6b63\u5411\u60a8\u4f20\u6587\u4ef6\u3002", 207: "\u5bf9\u65b9\u6b63\u5411\u60a8\u53d1\u56fe\u7247\u3002", 208: "\u5bf9\u65b9\u6b63\u9080\u8bf7\u60a8\u6d82\u9e26\u3002", 209: "\u5bf9\u65b9\u6b63\u9080\u8bf7\u60a8\u8fdc\u7a0b\u534f\u52a9\u3002", 210: "\u5bf9\u65b9\u6b63\u9080\u8bf7\u60a8\u8bed\u97f3\u89c6\u9891\u3002", 211: "\u5bf9\u65b9\u6b63\u5411\u60a8\u4f20\u6587\u4ef6\u5939\u3002", 212: "\u60a8\u53d1\u9001\u7684\u6d88\u606f\u4e2d\u53ef\u80fd\u5305\u542b\u4e86\u6076\u610f\u7f51\u5740\u3001\u8fdd\u89c4\u5e7f\u544a\u53ca\u5176\u4ed6\u7c7b\u5173\u952e\u8bcd\uff0c\u8bf7\u505c\u6b62\u53d1\u9001\u7c7b\u4f3c\u7684\u6d88\u606f\uff01", 213: "\u5bf9\u65b9\u9700\u8981\u9a8c\u8bc1\uff0c\u6682\u65f6\u65e0\u6cd5\u53d1\u9001\u3002" }, SITES: { TAOBAO: "cntaobao", YAHOO: "chnyahoo", WANGWANG: "wangwnag", CNALICHN: "cnalichn", ENALIINT: "enaliint", CNALIMAM: "cnalimam", CNKOUBEI: "cnkoubei", HTYAHOO: "htyahooo", CNWUJING: "cnwujing", CHNAIGOU: "chnaigou"}
    }
})(KISSY);
TDog.add("Util", function (a) {
    var c = KISSY, b = a.Config.DOMAIN;
    a.Util = { contains: function (d, e) {
        for (var f = d.length - 1; f >= 0; f--) {
            if (d[f].sendTime == e.sendTime && d[f].content == e.content) {
                return true
            }
        }
        return false
    }, uniqueArray: function (h) {
        var g = [], e = h.length;
        var d = function (j, l) {
            for (var k = 0, m = j.length; k < m; k++) {
                if (j[k] == l) {
                    return true
                }
            }
            return false
        };
        for (var f = 0; f < e; f++) {
            if (!d(g, h[f])) {
                g.push(h[f])
            }
        }
        return g
    }, css: function (d, f) {
        var e = KISSY.DOM;
        KISSY.each(d, function (g) {
            e.css(g[0], g[1], g[2])
        })
    }, getRandom: function (e, d) {
        return e + parseInt((d - e + 1) * Math.random(), 10)
    }, genUniqueName: function () {
        for (var d = 0, e = ""; d < 10; d++) {
            e += String.fromCharCode(this.getRandom(97, 122))
        }
        return "_" + e + (+new Date)
    }, decode: function (f) {
        if (!f) {
            return ""
        }
        var d = f;
        try {
            d = decodeURIComponent(f)
        } catch (e) {
        }
        return d
    }, SITES_REG: (function () {
        var e = [];
        for (var d in a.SITES) {
            e.push(a.SITES[d])
        }
        return new RegExp("^(" + e.join("|") + ")(.*)$", "i")
    })(), hasSitePrefix: function (d) {
        return a.Util.SITES_REG.test(d)
    }, getUserName: function (f) {
        if (!f) {
            return ""
        }
        var e = f, d = f.match(a.Util.SITES_REG);
        if (d && d[1]) {
            e = f.substr(d[1].length)
        }
        return e
    }, substitute: function (d, e) {
        return d.replace(/\{([^}]+)\}/g, function (f, g) {
            return e[g] || ""
        })
    }, escapeHTML: function (e) {
        var f = document.createElement("div"), d = document.createTextNode(e);
        f.appendChild(d);
        return f.innerHTML
    }, isTaobao: function () {
        return b === "taobao.com" || b === "taobao.net"
    }, formatDate: function (d) {
        var e = "";
        e += d.getFullYear() + "-";
        if (d.getMonth() + 1 < 10) {
            e += "0" + (d.getMonth() + 1) + "-"
        } else {
            e += (d.getMonth() + 1) + "-"
        }
        if (d.getDate() < 10) {
            e += "0" + (d.getDate()) + " "
        } else {
            e += (d.getDate()) + " "
        }
        if (d.getHours() < 10) {
            e += "0" + d.getHours()
        } else {
            e += d.getHours()
        }
        if (d.getMinutes() < 10) {
            e += ":0" + d.getMinutes()
        } else {
            e += ":" + d.getMinutes()
        }
        if (d.getSeconds() < 10) {
            e += ":0" + d.getSeconds()
        } else {
            e += ":" + d.getSeconds()
        }
        return e
    }, getTmsContent: function (f) {
        if (!f) {
            return
        }
        var d = this, e = KISSY;
        e.each(f, function (g) {
            var h = g;
            if (h.data) {
                e.isFunction(h.hasDate) && h.hasDate()
            }
            e.later(function () {
                a.Util.getScript(h.link + "?callback=" + h.callback + "&t=" + +new Date, { onSuccess: function () {
                    e.isFunction(d.hasDate) && h.success()
                }, scope: d, charset: a.Config.charset || "gbk"
                })
            }, 0)
        })
    }, charToFace: (function () {
        var d = { "/:^_^": ["\u5fae\u7b11", "0"], "/:^$^": ["\u5bb3\u7f9e", "1"], "/:Q": ["\u5410\u820c\u5934", "2"], "/:815": ["\u5077\u7b11", "3"], "/:809": ["\u7231\u6155", "4"], "/:^O^": ["\u5927\u7b11", "5"], "/:081": ["\u8df3\u821e", "6"], "/:087": ["\u98de\u543b", "7"], "/:086": ["\u5b89\u6170", "8"], "/:H": ["\u62b1\u62b1", "9"], "/:012": ["\u52a0\u6cb9", "10"], "/:806": ["\u80dc\u5229", "11"], "/:b": ["\u5f3a", "12"], "/:^x^": ["\u4eb2\u4eb2", "13"], "/:814": ["\u82b1\u75f4", "14"], "/:^W^": ["\u9732\u9f7f\u7b11", "15"], "/:080": ["\u67e5\u627e", "16"], "/:066": ["\u547c\u53eb", "17"], "/:807": ["\u7b97\u8d26", "18"], "/:805": ["\u8d22\u8ff7", "19"], "/:071": ["\u597d\u4e3b\u610f", "20"], "/:072": ["\u9b3c\u8138", "21"], "/:065": ["\u5929\u4f7f", "22"], "/:804": ["\u518d\u89c1", "23"], "/:813": ["\u6d41\u53e3\u6c34", "24"], "/:818": ["\u4eab\u53d7", "25"], "/:015": ["\u8272\u60c5\u72c2", "26"], "/:084": ["\u5446\u82e5\u6728\u9e21", "27"], "/:801": ["\u601d\u8003", "28"], "/:811": ["\u8ff7\u60d1", "29"], "/:?": ["\u7591\u95ee", "30"], "/:077": ["\u6ca1\u94b1\u4e86", "31"], "/:083": ["\u65e0\u804a", "32"], "/:817": ["\u6000\u7591", "33"], "/:!": ["\u5618", "34"], "/:068": ["\u5c0f\u6837", "35"], "/:079": ["\u6447\u5934", "36"], "/:028": ["\u611f\u5192", "37"], "/:026": ["\u5c34\u5c2c", "38"], "/:007": ["\u50bb\u7b11", "39"], "/:816": ["\u4e0d\u4f1a\u5427", "40"], "/:&apos;&quot;&quot;": ["\u65e0\u5948", "41"], "/:&#39;&quot;&quot;": ["\u65e0\u5948", "41"], '/:\'""': ["\u65e0\u5948", "41"], "/:802": ["\u6d41\u6c57", "42"], "/:027": ["\u51c4\u51c9", "43"], "/:(Zz...)": ["\u56f0\u4e86", "44"], "/:*&amp;*": ["\u6655", "45"], "/:*&*": ["\u6655", "45"], "/:810": ["\u5fe7\u4f24", "46"], "/:&gt;_&lt;": ["\u59d4\u5c48", "47"], "/:>_<": ["\u59d4\u5c48", "47"], "/:018": ["\u60b2\u6ce3", "48"], "/:&gt;O&lt;": ["\u5927\u54ed", "49"], "/:>O<": ["\u5927\u54ed", "49"], "/:020": ["\u75db\u54ed", "50"], "/:044": ["I\u670d\u4e86U", "51"], "/:819": ["\u5bf9\u4e0d\u8d77", "52"], "/:085": ["\u518d\u89c1", "53"], "/:812": ["\u76b1\u7709", "54"], "/:&quot;": ["\u597d\u7d2f", "55"], '/:"': ["\u597d\u7d2f", "55"], "/:&gt;M&lt;": ["\u751f\u75c5", "56"], "/:>M<": ["\u751f\u75c5", "56"], "/:&gt;@&lt;": ["\u5410", "57"], "/:>@<": ["\u5410", "57"], "/:076": ["\u80cc", "58"], "/:069": ["\u60ca\u8bb6", "59"], "/:O=O": ["\u8001\u5927", "70"], "/:O": ["\u60ca\u6115", "60"], "/:067": ["\u95ed\u5634", "61"], "/:043": ["\u6b20\u6241", "62"], "/:P": ["\u9119\u89c6\u4f60", "63"], "/:808": ["\u5927\u6012", "64"], "/:&gt;W&lt;": ["\u751f\u6c14", "65"], "/:>W<": ["\u751f\u6c14", "65"], "/:073": ["\u8d22\u795e", "66"], "/:008": ["\u5b66\u4e60\u96f7\u950b", "67"], "/:803": ["\u606d\u559c\u53d1\u8d22", "68"], "/:074": ["\u5c0f\u4e8c", "69"], "/:036": ["\u90aa\u6076", "71"], "/:039": ["\u5355\u6311", "72"], "/:045": ["CS", "73"], "/:046": ["\u9690\u5f62\u4eba", "74"], "/:048": ["\u70b8\u5f39", "75"], "/:047": ["\u60ca\u58f0\u5c16\u53eb", "76"], "/:girl": ["\u6f02\u4eaeMM", "77"], "/:man": ["\u5e05\u54e5", "78"], "/:052": ["\u62db\u8d22\u732b", "79"], "/:(OK)": ["\u6210\u4ea4", "80"], "/:8*8": ["\u9f13\u638c", "81"], "/:)-(": ["\u63e1\u624b", "82"], "/:lip": ["\u7ea2\u5507", "83"], "/:-F": ["\u73ab\u7470", "84"], "/:-W": ["\u6b8b\u82b1", "85"], "/:Y": ["\u7231\u5fc3", "86"], "/:qp": ["\u5fc3\u788e", "87"], "/:$": ["\u94b1", "88"], "/:%": ["\u8d2d\u7269", "89"], "/:(&amp;)": ["\u793c\u7269", "90"], "/:(&)": ["\u793c\u7269", "90"], "/:@": ["\u6536\u90ae\u4ef6", "91"], "/:~B": ["\u7535\u8bdd", "92"], "/:U*U": ["\u4e3e\u676f\u5e86\u795d", "93"], "/:clock": ["\u65f6\u949f", "94"], "/:R": ["\u7b49\u5f85", "95"], "/:C": ["\u5f88\u665a\u4e86", "96"], "/:plane": ["\u98de\u673a", "97"], "/:075": ["\u652f\u4ed8\u5b9d", "98"] }, f = "";
        for (var g in d) {
            f += "|" + g.substring(2)
        }
        f = f.substring(1);
        f = f.replace(/([\^?()\.\*\$])/g, "\\$1");
        var e = new RegExp("\\\\T/:(" + f + ")\\\\T", "g");
        f = new RegExp("/:(" + f + ")", "g");
        return function (i, k, h) {
            if (i) {
                if (k) {
                    var j = new RegExp("\\\\", "g");
                    i = i.replace(j, function (l) {
                        l = "\\\\";
                        return l
                    });
                    i = i.replace(f, function (l) {
                        if (d[l]) {
                            l = "\\T" + l + "\\T"
                        }
                        return l
                    })
                } else {
                    if (h) {
                        i = i.replace(e, function (l) {
                            var m = l.substring(2, l.length - 2);
                            if (d[m]) {
                                l = '<img src="http://a.tbcdn.cn/sys/wangwang/smiley/48x48/' + d[m][1] + '.gif" alt="' + d[m][0] + '" />'
                            }
                            return l
                        })
                    } else {
                        i = i.replace(f, function (l) {
                            if (d[l]) {
                                l = '<img src="http://a.tbcdn.cn/sys/wangwang/smiley/48x48/' + d[l][1] + '.gif" alt="' + d[l][0] + '" />'
                            }
                            return l
                        })
                    }
                }
            }
            return i
        }
    })(), faceToChar: function (f) {
        var d = ["/:^_^", "/:^$^", "/:Q", "/:815", "/:809", "/:^O^", "/:081", "/:087", "/:086", "/:H", "/:012", "/:806", "/:b", "/:^x^", "/:814", "/:^W^", "/:080", "/:066", "/:807", "/:805", "/:071", "/:072", "/:065", "/:804", "/:813", "/:818", "/:015", "/:084", "/:801", "/:811", "/:?", "/:077", "/:083", "/:817", "/:!", "/:068", "/:079", "/:028", "/:026", "/:007", "/:816", '/:\'""', "/:802", "/:027", "/:(Zz...)", "/:*&*", "/:810", "/:>_<", "/:018", "/:>O<", "/:020", "/:044", "/:819", "/:085", "/:812", '/:"', "/:>M<", "/:>@<", "/:076", "/:069", "/:O", "/:067", "/:043", "/:P", "/:808", "/:>W<", "/:073", "/:008", "/:803", "/:074", "/:O=O", "/:036", "/:039", "/:045", "/:046", "/:048", "/:047", "/:girl", "/:man", "/:052", "/:(OK)", "/:8*8", "/:)-(", "/:lip", "/:-F", "/:-W", "/:Y", "/:qp", "/:$", "/:%", "/:(&)", "/:@", "/:~B", "/:U*U", "/:clock", "/:R", "/:C", "/:plane", "/:075"];
        var e = d[parseInt(f, 10)];
        if (e) {
            e = e.replace("&gt;", ">").replace("&lt;", "<").replace("&amp;", "&").replace("&apos;", "'").replace("&quot;", '"').replace("&quot;", '"')
        }
        return e
    }, getScript: function (e, p, i) {
        var o = window.document, n = o.getElementsByTagName("head")[0] || o.documentElement, k = o.createElement("script").readyState ? function (s, t) {
            var r = s.onreadystatechange;
            s.onreadystatechange = function () {
                var u = s.readyState;
                if (u === "loaded" || u === "complete") {
                    s.onreadystatechange = null;
                    r && r();
                    t.call(this)
                }
            }
        } : function (r, s) {
            r.addEventListener("load", s, false)
        }, j = /\.css(?:\?|$)/i;
        var q = j.test(e), h = o.createElement(q ? "link" : "script"), g = p, l, m, f, d;
        if (c.isPlainObject(g)) {
            p = g.onSuccess;
            l = g.onFailure;
            d = g.onTimeout;
            m = g.timeout;
            i = g.charset
        }
        if (q) {
            h.href = e;
            h.rel = "stylesheet"
        } else {
            h.src = e;
            h.async = true
        }
        if (i) {
            h.charset = i
        }
        if (c.isFunction(p)) {
            if (q) {
                p.call(h)
            } else {
                k(h, function () {
                    if (f) {
                        f.cancel();
                        f = undefined
                    }
                    p.call(h);
                    c.later(function () {
                        n.removeChild(h);
                        h = undefined
                    }, 3000)
                })
            }
        }
        if (c.isFunction(d)) {
            f = c.later(function () {
                f = undefined;
                d()
            }, m || 3000)
        }
        n.insertBefore(h, n.firstChild);
        return h
    }, sendLog: function (d) {
        var e = "";
        if (c.UA.ie) {
            e = "ie" + c.UA.ie
        } else {
            if (c.UA.firefox) {
                e = "firefox" + c.UA.firefox
            } else {
                if (c.UA.chrome) {
                    e = "chrome" + c.UA.chrome
                } else {
                    if (c.UA.safari) {
                        e = "safari" + c.UA.safari
                    } else {
                        if (c.UA.opera) {
                            e = "opera" + c.UA.opera
                        }
                    }
                }
            }
        }
        c.later(function () {
            try {
                new Image().src = "http://log.mmstat.com/ww?cache=" + new Date().getTime() + "&browse=" + e + "&" + d
            } catch (f) {
            }
        }, 500)
    }, tmalllog: function (f) {
        if (window.location.host.indexOf(".tmall.") == -1) {
            return
        }
        var e = +new Date(), d = window[e] = new Image();
        d.src = "http://log.mmstat.com/" + f + "?cache=" + new Date().getTime() + "&nick=";
        d.onload = (d.onerror = function () {
            window[e] = null
        });
        d = null
    } 
    }
});
TDog.add("EventCenter", function (p) {
    var g = KISSY, e = p.EVENTS, h, j, r, b, c, i, k, a, q, n, m, f, o, d = { init: function () {
        g.log("init EventCenter");
        h = p.Util;
        j = p.Config;
        r = p.Login;
        k = p.DataManager;
        a = p.DataManager.Message;
        c = p.WebServer;
        i = p.Daemon;
        b = p.LocalStorage;
        q = p.SysTips;
        n = p.SysMessage;
        m = p.StatusIcon;
        f = p.RecentList;
        o = p.ChatDialog
    } 
    };
    g.mix(d, g.EventTarget);
    var l = function (s) {
        return typeof s !== "string" || s === ""
    };
    d.on(e.CLICK_STATUS_ICON, function () {
        g.log("\u70b9\u51fb\u72b6\u6001\u56fe\u6807");
        if (r.canTalk()) {
            if (!f.isOpen()) {
                m.online()
            } else {
                if (k.getTotalUnreadMsgCount() > 0) {
                    m.getmessage()
                }
            }
            if (k.getTotalUnreadMsgCount() > 0) {
                if (!f.isOpen()) {
                    if (k.getTotalUnreadMsgCount() === 1) {
                        d.fire(e.SHOW_CHAT_DIALOG, { haveUser: { userName: "donotknow"} });
                        return false
                    }
                }
            }
            return true
        } else {
            return false
        }
    });
    d.on(e.CLICK_LIGHT_ICON, function (t) {
        g.log("\u70b9\u51fb\u4eae\u706f\u56fe\u6807");
        var s = t.userInfo;
        if (r.canTalk(s.key, true)) {
            s.fromLight = true;
            d.fire(p.EVENTS.SHOW_CHAT_DIALOG, t)
        }
    });
    d.on(e.LOGIN_START, function () {
        if (p.Login.online == false) {
        } else {
            m.onlogin();
            p.Login.online = false
        }
    });
    d.on(e.LOGIN_SUCCESS, function () {
        g.log("\u767b\u5f55\u6210\u529f");
        q.hide();
        p.Login.ready = false;
        var x = Light.lightedUsers, v, s;
        while (x.length) {
            v = x.shift();
            g.log("\u81ea\u52a8\u6253\u5f00\u548c " + v + " \u7684\u804a\u5929\u7a97\u53e3");
            if (v) {
                if (!(s = Light.data[v])) {
                    var w = g.unparam(location.search.substring(1)), u = w.touid || w.tid;
                    if (u) {
                        s = { key: v, userName: h.getUserName(u), userId: u, status: w.status || 1, itemId: w.gid, subscribed: false }
                    }
                    Light.data[v] = s
                }
                if (s) {
                    s.fromLight = true;
                    g.later(function () {
                        d.fire(p.EVENTS.SHOW_CHAT_DIALOG, { userInfo: s })
                    }, 1000)
                }
            }
        }
        var t = k.getTotalUnreadMsgCount();
        if (t > 0) {
            g.log("\u5b58\u5728\u672a\u8bfb\u6d88\u606f " + t);
            m.getmessage()
        } else {
            m.online()
        }
    });
    d.on(e.ERROR_LOGIN_FAILED, function (u) {
        g.log("\u767b\u5f55\u5931\u8d25");
        var s = u.error || {}, t = parseInt(s.code, 10);
        if (t === -100 || t === -101) {
            r.directToTBLogin()
        } else {
            m.offline();
            q.show(p.ERROR_MESSAGE[t] || s.errorMessage || p.ERROR_MESSAGE[-1], 200)
        }
    });
    d.on(e.SHOW_RECENT_LIST, function (s) {
        g.log("\u6253\u5f00\u6700\u8fd1\u8054\u7cfb\u4eba");
        if (!p.DataManager.isLogin()) {
            return
        }
        c.getTalkUsers();
        g.DOM.removeClass(g.DOM.get(".tstart-tdog-panel-bd", "#tstart-plugin-tdog"), "tstart-panel-loading");
        h.tmalllog("ww.1.20.1.1.2")
    });
    d.on(e.SHOW_CHAT_DIALOG, function (v) {
        g.log("\u6253\u5f00\u804a\u5929\u7a97\u53e3");
        if (v.haveUser && v.haveUser.userName) {
            c.startChat("", "", { onSuccess: function () {
                g.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5b8c\u6210\u3002")
            }, onTimeout: function () {
                g.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5931\u8d25", "warn");
                q.show(p.ERROR_MESSAGE[-1000])
            } 
            }, false)
        } else {
            var s = v.userInfo || {}, w = s.userName || "", u = s.userId || s.key || "", x = s.itemId || "";
            s.status = s.status || 1;
            if ((!w || l(w)) && (!u || l(u))) {
                q.show("\u7f51\u7edc\u51fa\u73b0\u9519\u8bef\uff0c\u8bf7\u5237\u65b0\u3002", 140, 2);
                return
            }
            g.log("\u548c " + w + " \u5f00\u59cb\u804a\u5929 fromLight = " + s.fromLight);
            if (w == k.getNickName()) {
                alert("\u4e0d\u80fd\u9009\u62e9\u81ea\u5df1\u54e6\u3002");
                return
            }
            if (s.fromLight) {
                if (s.subscribed) {
                    var t = k.getUser(u);
                    s.status = (t || {})["statusType"] || s.status || 1
                } else {
                    Light.data[s.key].subscribed = true
                }
            }
            p.ChatDialog.show(s, u.indexOf("cntaobao") === 0);
            c.startChat(u, x, { onSuccess: function () {
                g.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5b8c\u6210\u3002")
            }, onTimeout: function () {
                g.log("\u83b7\u53d6\u5f00\u59cb\u804a\u5929\u6570\u636e\u5931\u8d25", "warn");
                o.showSysTip("<p>" + p.ERROR_MESSAGE[-14] + "</p>", true)
            } 
            }, s.fromLight)
        }
    });
    d.on(e.RECEIVE_CHAT_MESSAGE, function (t) {
        var s = t.unreadMsgPersonCount;
        g.log("\u6536\u5230" + s + "\u4e2a\u4eba\u7684\u6d88\u606f");
        if (f.isOpen()) {
            f.update();
            o.isOpen()
        } else {
            d.fire(e.UPDATE_STATUS_ICON, { data: { mSize: s} })
        }
    });
    d.on(e.RECEIVE_SUBSCRIBE_MESSAGE, function (s) {
        g.log("\u63a5\u6536\u5230\u7cfb\u7edf\u63d0\u9192");
        n.show(s.data)
    });
    d.on(e.RECEIVE_LOGINOUT_SIGNAL, function (s) {
        g.log("\u63a5\u6536\u5230\u65fa\u65fa\u9000\u51fa\u901a\u77e5");
        m.offline();
        p.SysTips.hide();
        i.stop();
        p.NotifyDaemon.stop();
        k.clearAll();
        f.close();
        o.closeDialog()
    });
    d.on(e.UPDATE_USER_STATUS, function (s) {
        g.log("\u66f4\u65b0\u7528\u6237\u72b6\u6001\u4fe1\u606f");
        var t = s.data;
        if (f.isOpen()) {
            f.update()
        }
        if (o.isOpen()) {
            o.updateUserStatus(h.getUserName(t.changedUserId), t.status)
        }
    });
    d.on(e.UPDATE_STATUS_ICON, function (t) {
        var u = t.data, s;
        g.log("\u66f4\u65b0\u72b6\u6001\u56fe\u6807");
        if (u) {
            s = u.mSize
        } else {
            s = k.getTotalUnreadMsgCount()
        }
        if (s > 0) {
            g.log("\u6709\u591a\u5c11\u4eba\u672a\u8bfb\uff1a " + s);
            m.getmessage()
        } else {
            m.online()
        }
    });
    d.on(e.ERROR_GET_CHAT_INFO, function () {
        o.showSysTip("<p>" + p.ERROR_MESSAGE[-1000] + "</p>", true)
    });
    d.on(e.SEND_MESSAGE, function (t) {
        var s = t.content, u = t.userName;
        g.log("\u7ed9 " + u + " \u53d1\u9001\u4ee5\u4e0b\u6d88\u606f\uff1a" + s, "info");
        c.send(u, s, t.callback)
    });
    d.on(e.ERROR_GET_MESSAGE, function (u) {
        g.log("\u53d6\u670d\u52a1\u7aef\u4fe1\u606f\u5931\u8d25");
        var s = u.error, t = parseInt(s.code, 10);
        if (t === -100 || t === -101) {
            d.fire(e.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} });
            i.stop();
            p.NotifyDaemon.stop()
        } else {
            q.show(p.ERROR_MESSAGE[t] || s.errorMessage || p.ERROR_MESSAGE[-1])
        }
    });
    d.on(p.EVENTS.DAEMON_FIRE, function () {
        c.get()
    });
    p.EventCenter = d
});
TDog.add("Login", function (c) {
    var e = KISSY, b, d, a, f;
    c.Login = { online: false, ready: false, init: function () {
        e.log("init Login");
        b = c.Config;
        d = c.DataManager;
        a = c.StatusIcon;
        f = c.SysTips
    }, canTalk: function (h, g) {
        if (!d.getNickName()) {
            this.directToTBLogin(h);
            return false
        }
        if (a.isOffline() || !d.isLogin()) {
            if (g) {
                c.WebServer.login();
                f.showLoginTips(true)
            } else {
                f.showLoginTips(c.Login.ready)
            }
            if (h) {
                Light.lightedUsers.push(h)
            }
            return false
        }
        return true
    }, directToTBLogin: function (g) {
        var k = location, i = k.protocol + "//" + k.host + k.pathname, q = k.search, j = k.hash, h = k.href, n = k.hostname, m = b.LIGHT_NICK, p = (n.indexOf("daily.") > -1) ? true : false, o = (function () {
            if (p) {
                return n.indexOf("tmall") > -1 ? "daily.tmall.net" : "daily.taobao.net"
            } else {
                return n.indexOf("tmall") > -1 ? "tmall.com" : "taobao.com"
            }
        })(), l = o.indexOf("tmall") > -1 ? "http://login." + o + "?redirect_url=" : "https://login." + o + "/member/login.jhtml?f=top&redirectUrl=";
        q = q ? e.unparam(q.substring(1)) : {};
        if (m in q) {
            delete q[m]
        }
        if (g) {
            if (this.isSearch()) {
                q[m] = encodeURIComponent(g)
            } else {
                q[m] = g
            }
        }
        q = e.param(q);
        if (!this.isSearch()) {
            q = encodeURIComponent(q)
        }
        h = i + "?" + q + j;
        k.href = l + h
    }, isSearch: function () {
        var g = ["search.taobao.com", "sandbox.search.taobao.com", "search8.taobao.com", "search8.daily.taobao.net", "s.taobao.com"];
        if (e.indexOf(location.host, g) > -1) {
            return true
        }
    } 
    }
});
TDog.add("LocalStorage", function (m) {
    var f = KISSY, d = m.Util, e = TStart, b = f.Cookie, c = d.isTaobao ? "x" : "otherx", g = "otherx", j = "whl", n = 0, a = e.Config.DOMAIN, k, i = {}, l = "_ato", h = "__ll";
    m.LocalStorage = { init: function () {
        i = {};
        this.setCookieWHL("-1", "0", "0", "0")
    }, setItem: function (o, p) {
        i[o] = p
    }, getItem: function (o) {
        return i[o] || {}
    }, getItems: function () {
        var o = [];
        for (var p in i) {
            o.push([p, i[p]])
        }
        return o
    }, clear: function () {
        var o = f.unparam(b.get(c)), p = this;
        if (o[h] != "-1" || p.getCookieWHL().messageStatus === 0) {
            i = {};
            p.setCookieWHL("-1", "0", "0", "0");
            p.setCookieX(h, "-1");
            p.setCookieX(l, "0")
        }
    }, getCookieX: function (o) {
        return decodeURIComponent(f.unparam(b.get(c))[o])
    }, setCookieX: function (p, q) {
        var r = f.unparam(b.get(c));
        r[p] = encodeURIComponent(q);
        var o = f.param(r);
        b.set(c, o, 365, a, "/")
    }, setAndGetFocusTime: function (o) {
        if (o) {
            n = o
        }
        return n
    }, setCookieWHL: function (p, r, s, o) {
        var q = p + "&" + r + "&" + s + "&" + o;
        b.set(j, q, "", a, "/")
    }, setPublicKey: function (o) {
        k = o
    }, getPublicKey: function () {
        return k || ""
    }, getCookieWHL: function () {
        var p = b.get(j), o = null;
        if (p) {
            o = p.split("&");
            if (o.length !== 4) {
                o = [-1, 0, 0, 0]
            }
        } else {
            o = [-1, 0, 0, 0]
        }
        return { messageStatus: parseInt(o[0]), system: parseInt(o[1]), heartTime: parseInt(o[2]), focusTime: parseInt(o[3]) }
    } 
    }
});
TDog.add("DataManager", function (m) {
    var i = KISSY, b = i.Cookie, p = i.JSON, f = m.Config, n = m.Util, g, j, d, e, l, c = "x", h = "", a = TStart.Config.isOnline, o = { FIRST_RUN: "_first_run", LAST_LOGIN: "__ll", LAST_LOGIN_NAME: "_last_login_name", RECENT_LIST: "_recent_list", RECENT_LIST_NAME: "_recent_list_name", USER_LIST: "_user", MESSAGE_LIST: "_message_list" }, k = m.EVENTS;
    m.DataManager = { init: function () {
        var q = this, s, r;
        i.log("\u521d\u59cb\u5316 DataManager \u6a21\u5757");
        g = m.LocalStorage;
        j = m.EventCenter;
        d = m.WebServer;
        e = m.Daemon;
        l = q.Message;
        l.init()
    }, getRecentList: function () {
        return g.getItem(o.RECENT_LIST)
    }, getUser: function (q) {
        var r = g.getItem(o.RECENT_LIST);
        if (r) {
            return r[q]
        }
        return {}
    }, setRecentList: function (s) {
        var t = g.getItem(o.RECENT_LIST);
        for (var r = 0; r < s.length; r++) {
            var q = t[s[r].userId];
            t[s[r].userId] = s[r];
            if (q) {
                s[r].messageTime = q.messageTime
            }
        }
        g.setItem(o.RECENT_LIST, t)
    }, updateMessageTime: function (q, r) {
        var s = g.getItem(o.RECENT_LIST);
        if (s && s[q]) {
            s[q].messageTime = r
        }
    }, getMessageTime: function (q) {
        var r = (this.getUser(q) || {})["messageTime"] || "";
        i.log("message time :" + r);
        return r
    }, getTotalUnreadMsgCount: function () {
        var q = g.getCookieWHL();
        if (q.messageStatus) {
            return q.messageStatus
        }
        return 0
    }, saveStartChatData: function (t) {
        if (t.success.toLowerCase() == "true") {
            var q = t.result, s = q.item || {}, r = q.user;
            this.__checkOneUserMessage(q);
            this.__isTaobaoUser(r, s);
            this.__saveAndViewChatMessage(q);
            this.__updateNuberOfPeople(q)
        } else {
            if (t.result.error[0].code == -2) {
                m.ChatDialog.closeDialog();
                m.SysTips.show(m.ERROR_MESSAGE[-2], 150, 3)
            } else {
                if (t.result.error[0].code == -14) {
                    m.SysTips.show(m.ERROR_MESSAGE[-14], 0, true);
                    this.forcedUpdateNumberOfPeople(f.NOTIFY_STATUS.notMessage.value, 0)
                } else {
                    if (t.result.error[0].code == -100 || t.result.error[0].code == -101 || t.result.error[0].code == -12) {
                        j.fire(m.EVENTS.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} })
                    } else {
                        j.fire(k.ERROR_GET_CHAT_INFO, { data: t.result, method: "start" })
                    }
                }
            }
        }
    }, handleReceiveMessage: function (s) {
        var r = this;
        if (s.success.toLowerCase() == "true") {
            var q = s.result;
            q.user = { userChatId: q.talkUserStatus.userId };
            m.ChatDialog.updateUserStatus(q.talkUserStatus.userId, q.talkUserStatus.statusType, q.talkUserStatus.wangXinSatus);
            r.__saveAndViewChatMessage(q);
            r.__updateNuberOfPeople(q)
        } else {
            if (s.result.error[0].code == -2) {
                m.ChatDialog.closeDialog();
                m.SysTips.show(m.ERROR_MESSAGE[-2], 150, 3)
            } else {
                if (s.result.error[0].code == -14) {
                    m.SysTips.show(m.ERROR_MESSAGE[-14], 0, true);
                    this.forcedUpdateNumberOfPeople(f.NOTIFY_STATUS.notMessage.value, 0)
                } else {
                    if (s.result.error[0].code == -100 || s.result.error[0].code == -101 || s.result.error[0].code == -12) {
                        j.fire(m.EVENTS.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} })
                    } else {
                        j.fire(k.ERROR_GET_CHAT_INFO, { data: s.result, method: "start" })
                    }
                }
            }
        }
    }, clearAll: function () {
        m.ChatDialog.clearCurrentChatUserId();
        h = "";
        g.clear()
    }, getNickName: function () {
        var q = b.get("_nk_") || "";
        return unescape(q.replace(/\\u/g, "%u"))
    }, getNickUrlComponent: function () {
        if (h.length == 0) {
            h = encodeURIComponent(unescape((b.get("_nk_") || "").replace(/\\u/g, "%u")))
        }
        return h
    }, isLogin: function () {
        var q = this, s = !!q.getNickName(), r = g.getCookieX(o.LAST_LOGIN);
        if (a) {
            return s && (r == q.getCookieLastLoginTime())
        }
        return s
    }, getCookieLastLoginTime: function () {
        if (n.isTaobao()) {
            return (i.unparam(b.get("uc1"))["lltime"] + b.get("lastgetwwmsg")) || "-1"
        } else {
            return (b.get("t") + b.get("login")) || "-1"
        }
    }, setLastLoginTime: function () {
        g.setCookieX(o.LAST_LOGIN, this.getCookieLastLoginTime());
        g.setCookieWHL(0, 0, new Date().getTime(), new Date().getTime())
    }, resetLastLoginTime: function () {
        g.setCookieX(o.LAST_LOGIN, "0")
    }, haveNotFocusedPage: function () {
        return g.setAndGetFocusTime() === g.getCookieWHL().focusTime
    }, setNumberOfPeople: function (q, r) {
        var s = g.getCookieWHL();
        if (s.messageStatus != q) {
            r = 2 | r
        }
        g.setCookieWHL(q, r, s.heartTime, s.focusTime)
    }, forcedUpdateNumberOfPeople: function (q, r) {
        var s = g.getCookieWHL();
        g.setCookieWHL(q, r, s.heartTime, s.focusTime)
    }, setAndGetFocusTime: function (q) {
        if (q) {
            var r = g.getCookieWHL();
            g.setCookieWHL(r.messageStatus, r.system, r.heartTime, q);
            g.setAndGetFocusTime(q);
            return q
        }
        return g.setAndGetFocusTime()
    }, addMessage: function (r, t) {
        var s = g.getItem(o.MESSAGE_LIST);
        if (!s[r]) {
            s[r] = t
        } else {
            for (var q = 0; q < t.length; q++) {
                if (!n.contains(s[r], t[q])) {
                    s[r].push(t[q])
                }
            }
            while (s[r].length > 20) {
                s[r].shift()
            }
        }
    }, addAllMessage: function (r, s) {
        var q = g.getItem(o.MESSAGE_LIST);
        q[r] = s;
        g.setItem(o.MESSAGE_LIST, q);
        while (s.length > 20) {
            s.shift()
        }
    }, deleteMessage: function (q) {
        var r = g.getItem(o.MESSAGE_LIST);
        if (r[q]) {
            r[q] = []
        }
        g.setItem(o.MESSAGE_LIST, r)
    }, getAllMessages: function (q) {
        return g.getItem(o.MESSAGE_LIST)[q] || []
    }, getHeartTime: function () {
        return g.getCookieWHL().heartTime
    }, setHeartTime: function (r) {
        var q = g.getCookieWHL();
        g.setCookieWHL(q.messageStatus, q.system, r, q.focusTime)
    }, startHeartTime: function (r) {
        var q = g.getCookieWHL();
        g.setCookieWHL(q.messageStatus, q.system, r, q.focusTime)
    }, setMessageStatus: function (q, r) {
        var s = g.getCookieWHL();
        g.setCookieWHL(q, r, s.heartTime, s.focusTime)
    }, getCookieWHL: function () {
        return g.getCookieWHL()
    }, setCookieWHL: function (r, s, t, q) {
        g.setCookieWHL(r, s, t, q)
    }, getLoginKey: function () {
        return g.getPublicKey()
    }, setLoginKey: function (q) {
        g.setPublicKey(q)
    }, __checkOneUserMessage: function (q) {
        if (q.talkUserStatus && q.talkUserStatus.userId) {
            var s = q.talkUserStatus;
            if (q.single) {
                var r = { userName: q.user.nick, userId: s.userId, relation: s.relation, status: s.statusType, wangXinSatus: s.wangXinSatus };
                m.ChatDialog.show(r, r.userId.indexOf("cntaobao") === 0)
            } else {
                m.ChatDialog.updateUserStatus(q.user.nick, s.statusType, s.wangXinSatus)
            }
        }
    }, __isTaobaoUser: function (q, r) {
        if (q.userChatId.indexOf("cntaobao") === 0) {
            var s = r.title ? { user: q, item: r} : { user: q };
            m.ChatDialog.showInfo(s)
        }
    }, __saveAndViewChatMessage: function (q) {
        var r = q.user;
        this.updateMessageTime(r.userChatId, q.timeStamp);
        if (q.messages && q.messages.length) {
            if (q.all) {
                this.addAllMessage(r.userChatId, q.messages)
            } else {
                this.addMessage(r.userChatId, q.messages)
            }
        }
        m.ChatDialog.updateMsg()
    }, __updateNuberOfPeople: function (q) {
        this.forcedUpdateNumberOfPeople(q.size, 0);
        if (q.size == 0) {
            j.fire(k.UPDATE_STATUS_ICON, { data: { mSize: 0} })
        } else {
            j.fire(k.RECEIVE_CHAT_MESSAGE, { unreadMsgPersonCount: q.size })
        }
    }, hash: function () {
        return [2, 13, 28, 9, 18, 27, 23, 20, 17, 27, 7, 9, 29, 25, 5, 24]
    } 
    }
});
TDog.add("DataManager.Message", function (l) {
    var d = KISSY, c, e, b, i, h, a, k = l.DataManager, g = l.EVENTS, j = l.MESSAGE_SUBTYPE, f = l.MESSAGE_TYPE, m = { LAST_LOGIN: "_last_login", SYSTEM_MESSAGE: "_system_message", HAS_NEW_MESSAGE: "_have_new_message" };
    if (!d.isPlainObject(k)) {
        return
    }
    k.Message = { init: function () {
        d.log("\u521d\u59cb\u5316 Message \u6a21\u5757");
        c = l.LocalStorage;
        e = l.EventCenter;
        b = l.Daemon;
        i = l.NotifyDaemon;
        a = l.WebServer;
        h = l.ChatDialog
    }, saveGetData: function (o) {
        var u = this, t, s, v, n = 0;
        if (o.success.toLowerCase() == "true") {
            if (o.result.messages) {
                v = o.result.messages;
                n = o.result.size;
                for (var p = 0, r = v.length; p < r; p++) {
                    t = v[p];
                    s = parseInt(t.subType, 10);
                    switch (parseInt(t.type, 10)) {
                        case f.LOGOUT:
                            d.log("\u6536\u5230\u9000\u51fa\u901a\u77e5\uff0c\u505c\u6b62\u8bf7\u6c42\u8f6e\u8be2", "warn");
                            e.fire(g.RECEIVE_LOGINOUT_SIGNAL, { data: t });
                            return;
                            break;
                        case f.STATUS:
                            var q = t.changedUserId || "";
                            if (q) {
                                d.log("\u6536\u5230\u7528\u6237 " + q + " \u7684\u72b6\u6001\u66f4\u65b0\u4fe1\u606f");
                                e.fire(g.UPDATE_USER_STATUS, { data: t })
                            }
                            break;
                        case f.SYSTEM:
                            switch (s) {
                                case j.SUBSCRIBE_MESSAGE:
                                    e.fire(g.RECEIVE_SUBSCRIBE_MESSAGE, { data: t });
                                    break;
                                case j.POPUP_MESSAGE:
                                    e.fire(g.RECEIVE_POPUP_MESSAGE, { data: t });
                                    break
                            }
                            break;
                        case f.OFFLINE:
                        case f.SELF:
                        case f.TALK:
                            d.log("\u63a5\u53d7\u5230\u6b63\u5e38\u7684\u804a\u5929\u6570\u636e,ERROR`");
                            break
                    }
                }
            }
        }
    }, checkCurrentUserMessage: function (n, p) {
        var o = h.getCurrentChatUserId();
        if (o) {
            a.receiveMessage(o, p, n);
            return true
        }
        return false
    }, clearAll: k.clearAll
    }
});
TDog.add("Daemon", function (u) {
    var h = KISSY, x = h.Event, j, k, b, c, n, l, q, t, v, r, f, m = false, e = false, d = 800, o = 1200;
    u.Daemon = { init: function () {
        h.log("\u521d\u59cb\u5316 Daemon \u6a21\u5757");
        var y = this;
        j = u.Util;
        k = u.EventCenter;
        b = u.LocalStorage;
        c = u.WebServer;
        n = u.DataManager;
        l = u.Config;
        q = u.StatusIcon;
        v = u.SysTips;
        t = u.NotifyDaemon;
        r = u.ChatDialog;
        f = u.EVENTS;
        y._bindEvent()
    }, start: function () {
        var y = this;
        e = true;
        m = true;
        n.setAndGetFocusTime(new Date().getTime());
        y.fire()
    }, fire: function () {
        try {
            var z = this;
            if (z.timer) {
                z.timer.cancel()
            }
            var y = r.isOpen() ? d : o, B = null;
            if (e && m) {
                B = n.getCookieWHL();
                if (B.system > 0) {
                    n.setCookieWHL(B.messageStatus, 0, B.heartTime, B.focusTime);
                    if ((B.system & 1) == 1) {
                        k.fire(f.DAEMON_FIRE)
                    }
                    if ((B.system & 2) == 2) {
                        n.Message.checkCurrentUserMessage(false, true)
                    }
                }
            } else {
                if (z.notHaveFocusedPage()) {
                    B = n.getCookieWHL();
                    if ((B.system & 2) == 2) {
                        n.setCookieWHL(B.messageStatus, 0, B.heartTime, B.focusTime);
                        n.Message.checkCurrentUserMessage(false, false)
                    }
                }
            }
            z.execute(B, y)
        } catch (A) {
            h.log("\u8f6e\u8be2\u51fa\u9519\u4e86\u3002");
            if (z.timer) {
                z.timer.cancel()
            }
            z.timer = h.later(function () {
                z.fire()
            }, d)
        }
    }, execute: function (A, z) {
        var y = this;
        if (l.NOTIFY_STATUS.logout.value == A.messageStatus) {
            k.fire(f.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} });
            return
        } else {
            if (A.messageStatus > 0) {
                if ((!r.isOpen()) && (!q.onNewMessage())) {
                    k.fire(f.RECEIVE_CHAT_MESSAGE, { unreadMsgPersonCount: A.messageStatus })
                }
            }
        }
        y.timer = h.later(function () {
            y.fire()
        }, z)
    }, stop: function () {
        var y = this;
        if (e) {
            h.log("\u505c\u6b62\u672c\u5730\u8f6e\u8be2\u3002");
            if (y.timer) {
                y.timer.cancel()
            }
            e = false
        }
    }, notHaveFocusedPage: function () {
        return n.haveNotFocusedPage()
    }, isFocused: function () {
        return m
    }, _bindEvent: function () {
        var y = this, z = window;
        m = true;
        n.setAndGetFocusTime(new Date().getTime());
        x.on(z, "focus", function () {
            h.log("\u5f53\u524d\u7a97\u53e3\u83b7\u5f97\u7126\u70b9");
            m = true;
            if (n.isLogin()) {
                if (m) {
                    if (!y.notHaveFocusedPage()) {
                        n.setAndGetFocusTime(new Date().getTime());
                        n.Message.checkCurrentUserMessage(false, true)
                    } else {
                    }
                    y.start();
                    t.restart();
                    v.hide();
                    k.fire(f.RECEIVE_CHAT_MESSAGE, { unreadMsgPersonCount: n.getTotalUnreadMsgCount() })
                }
            } else {
                k.fire(u.EVENTS.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} })
            }
        });
        x.on(z, "blur", function () {
            h.log("\u5f53\u524d\u7a97\u53e3\u5931\u53bb\u7126\u70b9\u3002");
            m = false
        })
    } 
    };
    var a = 7000, s = false, w = -9, p = 15000, i = 1, g = undefined;
    u.NotifyDaemon = { init: function () {
        var y = this;
        y.restart();
        h.log("\u521d\u59cb\u5316\u957f\u8fde\u63a5\u90e8\u4efd.")
    }, start: function () {
        var y = this;
        s = true;
        n.startHeartTime(w);
        y.__createConnection();
        h.log("\u767b\u5f55\u5b8c\u6210\uff0c\u5f00\u59cb\u957f\u8fde\u63a5.")
    }, restart: function () {
        var y = this;
        s = true;
        y.__heartTimeout()
    }, stop: function () {
        var y = this;
        if (s) {
            h.log("\u505c\u6b62\u5916\u90e8\u957f\u94fe\u63a5\u68c0\u67e5\u3002");
            if (y.heartTimeoutTimer) {
                y.heartTimeoutTimer.cancel()
            }
            s = false
        }
    }, __createConnection: function () {
        var z = this;
        try {
            g = document.createElement("iframe");
            g.width = 0;
            g.height = 0;
            g.style.display = "none";
            g.src = l.notifyUrl;
            var y = document.getElementsByTagName("body")[0];
            y.appendChild(g, y.lastChild)
        } catch (A) {
            h.log("\u8fdc\u7a0b\u8fde\u63a5\u5f02\u5e38\u4e86\u2026\u2026" + A)
        }
    }, __heartTimeout: function () {
        var y = this;
        if (y.heartTimeoutTimer) {
            y.heartTimeoutTimer.cancel()
        }
        if (s) {
            y.heartTimeoutTimer = h.later(function () {
                var z = n.getCookieWHL();
                h.log("\u68c0\u67e5\u957f\u94fe\u63a5\uff0c\u91cd\u65b0\u5f00\u59cb:" + (new Date().getTime() - z.heartTime > a) + "," + (new Date().getTime() - z.heartTime) + "," + new Date().getTime() + "," + z.heartTime);
                if (z.heartTime == w || (new Date().getTime() - z.heartTime > a && z.heartTime !== w && z.messageStatus !== l.NOTIFY_STATUS.logout.value)) {
                    if (g) {
                        h.log("\u957f\u94fe\u63a5\u7684frame\u5df2\u7ecf\u5b58\u5728\u3002");
                        g.src = l.notifyUrl
                    } else {
                        y.__createConnection();
                        h.log("\u957f\u94fe\u63a5\u7684frame\u4e0d\u5df2\u7ecf\u5b58\u5728\u3002")
                    }
                    n.setHeartTime(w);
                    s = true;
                    y.__checkConnection()
                }
                y.__heartTimeout()
            }, a)
        }
    }, __checkConnection: function () {
        var y = this;
        if (i++ < 4) {
            h.later(function () {
                if (n.getHeartTime() === w) {
                    if (g) {
                        h.log("\u957f\u94fe\u63a5\u7684frame\u5df2\u7ecf\u5b58\u5728\u3002");
                        g.src = l.notifyUrl
                    } else {
                        y.__createConnection();
                        h.log("\u957f\u94fe\u63a5\u7684frame\u4e0d\u5df2\u7ecf\u5b58\u5728\u3002")
                    }
                }
            }, p)
        }
    } 
    }
});
TDog.add("WebServer", function (n) {
    var g = KISSY, b = g.Cookie, e = n.Config, m = n.DataManager, j = n.EVENTS, h = n.EventCenter, d = n.Daemon, i = 0, k = 5000, f = n.SITES, l = f.TAOBAO, a = 1, c = 0, o = { getToken: { url: e.getTokenUrl, callback: "TDog.WebServer.globalToken" }, login: { url: e.loginUrl, callback: "TDog.WebServer.prepareLogin" }, checkautologin: { url: e.checkAutoLogin, callback: "TDog.WebServer.decideAutoLogin" }, getloginresult: { url: e.getLoginResultUrl, callback: "TDog.WebServer.disposeLoginResult" }, setstrangermsg: { url: e.setAutoLoginUrl, callback: "TDog.WebServer.setStrangerMsgData" }, clearchatlist: { url: e.clearListUrl, callback: "TDog.WebServer.clearChatListData" }, removeContact: { url: e.removeContact, callback: "TDog.WebServer.clearSingleChatListData" }, clearchatmessage: { url: e.clearListUrl, callback: "TDog.WebServer.handClearChatMessage" }, setautologin: { url: e.setAutoLoginUrl, callback: "TDog.WebServer.setAutoLoginData" }, start: { url: e.startUrl, callback: "TDog.DataManager.saveStartChatData" }, receive: { url: e.startUrl, callback: "TDog.DataManager.handleReceiveMessage" }, send: { url: e.sendUrl, callback: "TDog.WebServer.handleSendResult" }, get: { url: e.getUrl, callback: "TDog.DataManager.Message.saveGetData" }, getTalkUsers: { url: e.getTalkUsers, callback: "TDog.WebServer.handleTalkUsers" }, ackGetMessage: { url: e.ackGetMessage, callback: "TDog.WebServer.handleAckResult" }, checkUserSeting: { url: e.ackGetMessage, callback: "TDog.WebServer.handUserSeting" }, getServerKey: { url: e, callback: "TDog.WebServer.handleLoginFirst"} };
    n.WebServer = { AUTO_LOGIN: { autoLoginAndTip: 1, autoLoginNotTip: 2, forcedLogin: 3 }, init: function () {
        var p = this;
        p.getTokenNum = 1;
        p.token = "";
        g.log("\u521d\u59cb\u5316 WebServer \u6a21\u5757");
        p.getToken()
    }, _request: function (p, s) {
        var r = m.getNickUrlComponent(), q = r.length == 0 ? "" : "&nkh=" + r;
        p = p + q + "&appId=" + e.appId;
        g.log("[" + (new Date()) + "] " + p + "&t=" + +new Date, "info");
        if (g.isFunction(s.onFailure)) {
            s.onFailure = s.onTimeout
        }
        n.Util.getScript(p + "&t=" + +new Date, { onSuccess: function () {
            if (g.isFunction(s.onSuccess)) {
                s.onSuccess.call(this)
            }
        }, onFailure: function () {
            if (g.isFunction(s.onFailure)) {
                s.onFailure.call(this)
            }
        }, onTimeout: function () {
            if (g.isFunction(s.onTimeout)) {
                s.onTimeout.call(this)
            }
        }, success: function () {
            if ("function" === typeof s.onSuccess) {
                s.onSuccess.call(this)
            }
        }, error: function () {
            if ("function" === typeof s.onFailure) {
                s.onFailure.call(this)
            }
        }, scope: this, charset: e.charset || "gbk", timeout: k
        })
    }, sitePrefix: (function () {
        var q = [], r = "";
        for (var p in f) {
            q.push(f[p])
        }
        return new RegExp("^(" + q.join("|") + ")(.*)$", "i")
    })(), formatNick: function (r) {
        var p = this, q = p.sitePrefix;
        if (q.test(r)) {
            return r
        }
        return l + r
    }, getNick: function (s) {
        if (!s) {
            return
        }
        var p = this, r = p.sitePrefix, q = s.match(r);
        if (q) {
            return ("undefined" != typeof q[2] && q[2]) ? q[2] : s
        }
        return s
    }, getToken: function () {
        var p = this, r = "getToken", q = g.param({ callback: o[r]["callback"] });
        p._request(e.getTokenUrl + "?" + q, {})
    }, setAutoLogin: function (q) {
        var p = this, s = "setautologin", r = g.param({ token: p.token, callback: o[s]["callback"] });
        p._request(e.setAutoLoginUrl + "?act=" + q + "&" + r, {})
    }, setAutoLoginData: function (p) {
        this.__handleErrorResult(p)
    }, setStrangerMsg: function (q) {
        var p = this, s = "setstrangermsg", r = g.param({ token: p.token, callback: o[s]["callback"] });
        p._request(e.setAutoLoginUrl + "?act=" + q + "&" + r, {})
    }, setStrangerMsgData: function (p) {
        this.__handleErrorResult(p)
    }, clearChatList: function () {
        var p = this, r = "clearchatlist", q = g.param({ token: p.token, callback: o[r]["callback"] });
        p._request(e.clearListUrl + "&" + q, {})
    }, clearChatListData: function (p) {
        this.__handleErrorResult(p)
    }, clearChatMessage: function (p) {
        var q = this, s = "clearchatmessage", r = g.param({ act: 1, targetNick: p, token: q.token, callback: o[s]["callback"] });
        q._request(e.clearUrl + "?" + r, {})
    }, handClearChatMessage: function (p) {
        this.__handleErrorResult(p)
    }, clearSingleChatList: function (s) {
        var p = this, r = "removeContact", q = g.param({ token: p.token, callback: o[r]["callback"] });
        p._request(e.removeContact + "?targetId=" + encodeURIComponent(s) + "&" + q, {})
    }, clearSingleChatListData: function (p) {
        this.__handleErrorResult(p)
    }, checkAutoLogin: function (s) {
        var p = this, r = "checkautologin", q = g.param({ token: p.token, callback: o[r]["callback"], check: "1" });
        p._request(e.checkAutoLoginUrl + "?cat=-1&" + q, s || {})
    }, checkUserSeting: function (s) {
        var p = this, r = "checkUserSeting", q = g.param({ token: p.token, callback: o[r]["callback"] });
        p._request(e.checkAutoLoginUrl + "?cat=-1&" + q, s || {})
    }, globalToken: function (q) {
        var p = this;
        if (p.getTokenNum > 3) {
            return
        }
        p.getTokenNum++;
        if (q.success.toLowerCase() === "true") {
            p.token = q.result.token;
            d.init();
            if (m.isLogin()) {
                h.fire(j.LOGIN_SUCCESS);
                n.NotifyDaemon.init();
                d.start()
            } else {
                if (m.getNickName()) {
                    n.LocalStorage.init();
                    p.checkAutoLogin()
                } else {
                    n.LocalStorage.init();
                    g.log("\u963f\u91cc\u65fa\u65fa\uff08\u672a\u767b\u5f55\uff09");
                    n.SysTips.setHoverTips("\u963f\u91cc\u65fa\u65fa\uff08\u672a\u767b\u5f55\uff09")
                }
            }
        } else {
            p.getToken()
        }
    }, handUserSeting: function (t) {
        var q = this;
        q.__handleErrorResult(t);
        if (t.success.toLowerCase() === "true") {
            var p = t.result, s = !(8192 & parseInt(p.tag, 10)), r = (16384 & parseInt(p.tag, 10));
            if (s) {
                g.get("#tstart .tstart-settings-login").checked = true
            } else {
                g.get("#tstart .tstart-settings-login").checked = false
            }
            if (r) {
                g.get("#tstart .tstart-settings-msg").checked = true
            } else {
                g.get("#tstart .tstart-settings-msg").checked = false
            }
        }
    }, decideAutoLogin: function (t) {
        var q = this;
        q.__handleErrorResult(t);
        if (t.success.toLowerCase() === "true") {
            if (t.result.tag == -1) {
                q.__completeLogin()
            } else {
                var p = t.result, s = !(8192 & parseInt(p.tag, 10)), r = n.Config.forceAutoLogin;
                if (s && g.UA.ie) {
                    q.login(q.AUTO_LOGIN.autoLoginNotTip)
                } else {
                    if (r) {
                        g.log("\u6ee1\u8db3\u81ea\u52a8\u767b\u5f55\u6761\u4ef6\uff0c\u53d1\u8d77\u767b\u5f55\u8bf7\u6c42");
                        q.login()
                    } else {
                        g.log("\u4e0d\u6ee1\u8db3\u81ea\u52a8\u767b\u5f55\u6761\u4ef6")
                    }
                }
            }
        }
    }, prepareLogin: function (r) {
        var p = this;
        if ("false" == r.success.toLowerCase()) {
            var q = parseInt((r.result.error[0] || {})["code"]) || 0;
            switch (q) {
                case -15:
                    n.SysTips.showClientOnlineTips();
                    n.Util.sendLog("wwweblog=logged");
                    break;
                case -16:
                    break;
                default:
                    h.fire(j.ERROR_LOGIN_FAILED, { error: r.result.error[0] })
            }
        } else {
            p.getLoginResult()
        }
    }, getLoginResult: function () {
        var p = this;
        g.log("\u767b\u5f55\u6210\u529f\uff0c\u8fc7 1 \u79d2\u949f\u83b7\u53d6\u767b\u5f55\u540e\u7684\u7ed3\u679c");
        g.later(function () {
            var q = g.param({ time: a, token: p.token, callback: o.getloginresult["callback"] });
            p._request(e.getLoginResultUrl + "?" + q, { onSuccess: function () {
                g.log("\u4e8c\u6b21\u8bf7\u6c42\u5f97\u5230\u767b\u5f55\u7ed3\u679c\u767b\u5f55\u5b8c\u6210");
                if (m.isLogin()) {
                    p.get();
                    n.NotifyDaemon.start();
                    d.start();
                    h.fire(j.LOGIN_SUCCESS);
                    n.SysTips.show("\u963f\u91cc\u65fa\u65fa - " + m.getNickName() + "(\u5728\u7ebf)", "150", 5);
                    i = new Date().getTime();
                    a = 1
                }
            }, onFailure: function () {
                h.fire(j.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} })
            }, onTimeout: function () {
                h.fire(j.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} })
            } 
            })
        }, a * 1000)
    }, disposeLoginResult: function (q) {
        var p = this;
        g.log("\u767b\u5f55:" + q.success);
        if (q.success.toLowerCase() === "true") {
            m.setLastLoginTime()
        } else {
            if (++a < 4 && q.result.error && q.result.error[0].code == -99) {
                p.getLoginResult()
            } else {
                a = 1;
                m.resetLastLoginTime();
                h.fire(j.ERROR_LOGIN_FAILED, { error: (q.result.error || [])[0] })
            }
        }
    }, login: function (r, u) {
        var p = this, t = "login", s, q = p.__encrypt();
        if (q) {
            s = g.param({ token: p.token, callback: o[t]["callback"], nickName: m.getNickName(), autoLogin: r || p.AUTO_LOGIN.autoLoginAndTip, loginTag: q });
            h.fire(j.LOGIN_START);
            g.log("\u8bf7\u6c42\u767b\u5f55\u5f00\u59cb");
            p._request(e.loginUrl + "?" + s, u || {})
        }
    }, startChat: function (r, t, v, q) {
        var p = this, u = "start", s;
        s = g.param({ token: p.token, callback: o[u]["callback"], userId: r, itemId: t || "", fromLight: q ? "true" : "false", time: m.getMessageTime(r) });
        p._request(e.startUrl + "?" + s, v || {})
    }, receiveMessage: function (s, p, r, v) {
        var q = this, u = "receive", t;
        t = g.param({ token: q.token, callback: o[u]["callback"], targetUserChatId: s, focused: p, update: r, time: m.getMessageTime(s) });
        q._request(e.receiveUrl + "?" + t, v || {})
    }, send: function (q, r, t) {
        var p = this, s;
        if (!q.length || !r.length) {
            return
        }
        q = p.formatNick(q);
        s = g.param({ token: p.token, callback: o.send["callback"], userId: q, content: r });
        p._request(e.sendUrl + "?" + s, t || {})
    }, handleSendResult: function (p) {
        this.__handleErrorResult(p)
    }, get: function (s) {
        var p = this, r = "get", q;
        g.log("\u8f6e\u8be2\u83b7\u53d6\u4fe1\u606f");
        q = g.param({ token: p.token, callback: o[r]["callback"] });
        p._request(e.getUrl + "?" + q, {})
    }, getTalkUsers: function (s) {
        var p = this, r = "getTalkUsers", q = g.param({ token: p.token, callback: o[r]["callback"] });
        p._request(e.getTalkUsers + "?" + q, s || {});
        g.log("\u53d6\u804a\u5929\u4eba\u5217\u8868\u3002")
    }, handleTalkUsers: (function () {
        var p = 1;
        return function (q) {
            var r = n.WebServer.__handleErrorResult(q);
            if (q.success == "true") {
                g.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868\u6210\u529f\uff1a" + p);
                n.RecentList.updateRecentlist(q.result.person);
                if (q.result.person.length > 0) {
                    m.setRecentList(q.result.person)
                }
                m.forcedUpdateNumberOfPeople(q.result.size, 0)
            } else {
                if (p++ < 4 && !r) {
                    g.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25\uff0c\u91cd\u8bd5\uff1a" + p);
                    n.WebServer.getTalkUsers({})
                } else {
                    g.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868\u5931\u8d25\uff0c\u91cd\u8bd5\u4e09\u6b21\u6216\u9000\u51fa\u767b\u5f55\u7ed3\u675f\u3002")
                }
            }
        }
    })(), ack: function (r, q, t) {
        var p = this, s;
        s = g.param({ token: p.token, callback: o.ackGetMessage["callback"], userId: r, num: q });
        p._request(e.ackGetMessage + "?" + s, t || {})
    }, handleAckResult: function (p) {
        g.log("\u6536\u5230\u6d88\u606f\u5e94\u7b54:" + p.success);
        this.__handleErrorResult(p)
    }, __handleErrorResult: function (p) {
        if (p.success === "false") {
            if (p.result.error[0]) {
                if (p.result.error[0].code == -100 || p.result.error[0].code == -101 || p.result.error[0].code == -12) {
                    h.fire(n.EVENTS.RECEIVE_LOGINOUT_SIGNAL, { data: { subType: 403} });
                    return true
                }
            }
        }
        return false
    }, __encrypt: function () {
        var p = this, q = m.getLoginKey();
        if (q.length) {
            return p.__encryptKey()
        }
        p.__getServerKey()
    }, __getServerKey: function () {
        var p = this, r = "getServerKey", q;
        q = g.param({ token: p.token, callback: o[r]["callback"] });
        p._request(e.TagKeyUrl + "?" + q, {})
    }, __encryptKey: function () {
        var v = [], p = "", r = this;
        var u = m.getLoginKey();
        var t = r.__make();
        for (var s = 0; s < t.length; s++) {
            p += u.charAt(t[s])
        }
        var q = encodeURIComponent(m.getNickName()).charAt(2);
        return q + p
    }, handleLoginFirst: function (q) {
        var p = this;
        if (q.success == "true") {
            m.setLoginKey(q.result.tagKey);
            if (c++ < 3) {
                p.login()
            }
        } else {
            h.fire(j.ERROR_LOGIN_FAILED, { error: q.result.error[0] })
        }
    }, __make: function () {
        var s = [];
        var r = m.hash();
        var p = e.hash;
        for (var q = 0; q < 16; q++) {
            s.push(Math.floor((r[q]) + (p[q]) / 7.3 * 100) % 32)
        }
        g.log("hash:" + s.join(","));
        return s
    }, __completeLogin: function () {
        g.log("\u5df2\u7ecf\u767b\u5f55\u8fc7\u540e\uff0c\u5b8c\u6210\u767b\u5f55\u3002");
        m.setLastLoginTime();
        if (m.isLogin()) {
            this.get();
            n.NotifyDaemon.start();
            d.start();
            h.fire(j.LOGIN_SUCCESS);
            i = new Date().getTime();
            a = 1
        }
    }, uptime: function () {
        return i
    } 
    }
});
TDog.add("RecentList", function (h) {
    var e = KISSY, k = e.DOM, j = e.Event, l = h.DataManager, b = h.EventCenter, g, i = h.Util, d, a, c = '<div class="tdog-recentlist"><ul>{ITEMS}</ul></div>', f = '<li class="tdog-recentlist-item tdog-status-{status}"><p><i></i><span class="tdog-user-name" id="{userId}">{userName}</span><span class="tdog-msg-count">{msgCount}</span></p><s class="tdog-user-del">del</s></li>';
    h.RecentList = { init: function () {
        d = h.hostEl;
        g = h.ChatDialog;
        a = e.get(".tstart-tdog-panel-bd", h.hostEl);
        this._bindUI()
    }, update: function () {
        h.WebServer.getTalkUsers()
    }, updateRecentlist: function (s) {
        var q, m = s.length, p = "";
        e.log("\u66f4\u65b0\u8054\u7cfb\u4eba\u5217\u8868");
        if (m === 0) {
            p = '<p class="tdog-recentlist-none">\u6682\u65e0\u8054\u7cfb\u4eba</p>';
            k.addClass(e.get(".tstart-tdog-panel-clearbtn", h.hostEl), "hidden")
        } else {
            k.removeClass(e.get(".tstart-tdog-panel-clearbtn", h.hostEl), "hidden")
        }
        for (q = m - 1; q >= 0; --q) {
            if (s[q].size == 0 || s[q].size == undefined || s[q].userId == g.getCurrentChatUserId()) {
                s[q].size = ""
            } else {
                s[q].size = "(" + s[q].size + ")"
            }
            s[q].userName = h.Util.getUserName(s[q].userId);
            s[q].status = s[q].statusType;
            var o, r = s[q].status, n = s[q].wangXinSatus;
            if ((r == 1 || r == 10) && n == 1) {
                o = h.WX_USER_STATUS[n][0]
            } else {
                o = h.USER_STATUS[r][0]
            }
            p += i.substitute(f, { status: o, userName: i.getUserName(s[q].userId), msgCount: s[q].size, userId: s[q].userId })
        }
        p = c.replace("{ITEMS}", p);
        a.innerHTML = p;
        k.removeClass(k.get(".tstart-tdog-panel-bd", "#tstart-plugin-tdog"), "tstart-panel-loading")
    }, close: function () {
        k.removeClass(h.hostEl, "tstart-item-active");
        if (h.DataManager.isLogin() && l.getTotalUnreadMsgCount() > 0) {
            h.StatusIcon.getmessage()
        }
    }, isOpen: function () {
        return k.hasClass(d, "tstart-item-active")
    }, _bindUI: function () {
        var o = function (q) {
            var p = q.target;
            if (p.parentNode.nodeName.toUpperCase() == "P") {
                return p.parentNode
            }
            if (p.nodeName.toUpperCase() == "P") {
                return p
            }
            return false
        }, m, n = this;
        j.on(a, "click", function (t) {
            var s = t.target;
            m = o(t);
            if (m) {
                var r = e.get(".tdog-user-name", m).id;
                if (h.ChatDialog.checkDialogOpen(r)) {
                    return
                }
                var p = l.getUser(r);
                if (p) {
                    b.fire(h.EVENTS.SHOW_CHAT_DIALOG, { userInfo: p });
                    e.get(".tdog-msg-count", m).innerHTML = ""
                }
            } else {
                if (k.hasClass(s, "tdog-user-del")) {
                    m = s.parentNode;
                    var q = e.get(".tdog-user-name", m).id;
                    h.WebServer.clearSingleChatList(q);
                    m.parentNode.removeChild(m)
                }
            }
        });
        j.on(a, "mouseover mouseout", function (s) {
            var r = s.target, p, q;
            if (r.parentNode.nodeName.toUpperCase() == "P") {
                p = r.parentNode.parentNode
            } else {
                if (r.parentNode.nodeName.toUpperCase() == "LI") {
                    p = r.parentNode
                } else {
                    if (k.hasClass(r, "tdog-recentlist-item")) {
                        p = r
                    }
                }
            }
            if (p && p.getAttribute("current") != "true") {
                q = k.get(".tdog-user-del", p);
                k.toggleClass(p, "tdog-recentlist-hover");
                k.toggleClass(q, "tdog-user-del-visible")
            }
        });
        j.on(a, "mousedown mouseup", function (p) {
            m = o(p);
            if (m) {
                k.toggleClass(m.parentNode, "tdog-recentlist-select")
            }
        });
        j.on(window, "click", function () {
            if (l.isLogin() && l.getTotalUnreadMsgCount() > 0) {
                h.StatusIcon.getmessage()
            }
        });
        j.on(h.hostEl, "click", function (p) {
            var q = p.target;
            if (k.hasClass(q, "tstart-tdog-panel-clearbtn")) {
                h.WebServer.clearChatList();
                e.get("#tstart .tdog-recentlist").innerHTML = '<ul><p class="tdog-recentlist-none">\u6682\u65e0\u8054\u7cfb\u4eba</p></ul>';
                k.addClass(e.get(".tstart-tdog-panel-clearbtn", h.hostEl), "hidden")
            }
            if (k.hasClass(q, "tstart-tdog-panel-closebtn") || ("img" === q.tagName.toLowerCase() && k.parent(q, ".tstart-tdog-panel-closebtn"))) {
                n.close()
            }
        })
    } 
    }
});
TDog.add("ChatDialog", function (r) {
    var h = KISSY, u = h.DOM, v = h.Event, e = TStart, i = encodeURIComponent, c = r.EventCenter, a = r.WebServer, n = r.Config, k = r.Util, w = document, g = window, b = e.Config.DOMAIN, o = e.Config.isOnline, q = [], l, m, s, d, p = null, j = null, t = '<div class="tdog-popup-tms-bullet"><div class="tdog-popup-tms-bulletin"></div></div>', f = '<div class="tdog-popup tdog-popup-blue ' + (h.UA.ie ? "tdog-ie" : "") + '" style="width:416px;bottom:40px;overflow:normal;"><div class="tdog-popup-head" ><div><i class="tdog-status-"></i><div><span class="tdog-popup-contact"></span></div></div><span class="tdog-popup-tools"><span title="\u5e2e\u52a9" class="tdog-popup-help"></span><span title="\u5173\u95ed" class="tdog-popup-close"></span></span></div><div class="tdog-popup-main"><div class="tdog-popup-talkleftouter"><div class="tdog-popup-talkleftinner"><div class="tdog-popup-talkcontainer">' + t + '<div class="tdog-popup-talkhistory"></div><div class="tdog-popup-talkbar">    <span title="\u8868\u60c5"></span>    <span class="tdog-popup-talkbar-clear" title="\u6e05\u7a7a\u804a\u5929\u8bb0\u5f55"></span>    <a title="\u804a\u5929\u8bb0\u5f55" href="#" target="_blank"><i></i>\u804a\u5929\u8bb0\u5f55</a></div><div class="tdog-popup-talkinput">    <textarea cols="5"></textarea></div><a title="\u9690\u85cf\u53f3\u8fb9\u680f" class="tdog-popup-pulloff" href="javascript:void(0);"><span></span></a></div><div class="tdog-popup-talkfoot"><span class="tdog-popup-tms-ad"></span>   <span class="tdog-popup-sendbut">     <span class="tdog-popup-send">\u53d1\u9001</span>     <span class="tdog-popup-changesend"></span><ul><li><i></i><span>\u6309Ctrl+Enter\u53d1\u9001</span></li><li class="tdog-send-mode"><i></i><span>\u6309Enter\u53d1\u9001</span></li></ul></span></div></div></div><div class="tdog-popup-talkright"></div><div class="tdog-popup-clear"></div></div><div class="tdog-popup-handle"></div><div class="tdog-popup-handle-x"></div><div class="tdog-popup-handle-y"></div></div>';
    r.ChatDialog = { init: function () {
    }, showAdLink: function (z, x) {
        var y = h.get("a.tdog-popup-tms-link", x);
        if (y && z.href && z.title) {
            y.innerHTML = z.title;
            u.attr(y, "href", z.href);
            p = z
        }
    }, showBulletin: function (x) {
        h.later(function () {
            var C = h.get("div.tdog-popup-tms-bulletin", m), A = h.get("div.tdog-popup-talkhistory", m), F = h.get("div.tdog-popup-talkright", m), z = F.style.display != "none" ? "tdog-popup-pulloff" : "tdog-popup-pullon", D = h.get("a." + z, m), y = h.get("span.tdog-popup-tms-ad", m), B;
            if (C && x.title && x.url && x.href) {
                var E = w.createElement("div");
                E.className = "tdog-popup-tms-bulletin-close";
                C.innerHTML = "<i></i><a href=" + x.url + " target='_blank'>" + x.title + "</a>";
                C.appendChild(E);
                if (x.href == "taobao" && b == "taobao.com") {
                    u.css(C.parentNode, "display", "block")
                } else {
                    if (x.href == "daily" && b == "taobao.net") {
                        u.css(C.parentNode, "display", "block")
                    }
                }
                B = (C.innerHTML && u.parent(C).style.display == "block") ? A.offsetHeight - 22 : A.offsetHeight;
                u.css(A, "height", B);
                j = x
            }
            if (y && x.adUrl && x.adText) {
                y.innerHTML = "<a href=" + x.adUrl + " target='_blank'>" + x.adText + "</a>"
            }
            if (A) {
                A.scrollTop = A.scrollHeight
            }
        }, 800, false)
    }, _create: function (z) {
        var x = a.formatNick(d.userId), K = this;
        if (!z) {
            var B = '<a title="\u9690\u85cf\u53f3\u8fb9\u680f" class="tdog-popup-pullon" style="display:none"></a></div></div><div class="tdog-popup-talkright" ></div>', J, C;
            J = f.replace(B, "</div></div>");
            l = u.create(J);
            u.css(l, "width", "253px");
            C = h.get("div.tdog-popup-talkleftinner", l);
            u.css(h.get("div.tdog-popup-talkright", l), "display", "none");
            u.css(C, "margin-right", "6px");
            u.css(h.get("div.tdog-popup-talkhistory", l), "width", "auto")
        } else {
            l = u.create(f)
        }
        q.push(new Array(x, l));
        h.get("#tstart").appendChild(l);
        if (!z) {
            h.get("a.tdog-popup-pulloff").style.display = "none"
        }
        u.css(l, "display", "block");
        this._bindUI(l);
        var F = h.get("div.tdog-popup-talkbar", l).getElementsByTagName("a")[0], E = i(i(i(r.DataManager.getNickName()))), y = i(i(i(x))), H = "http://www2.im.alisoft.com/webim/online/chat_record_search.htm?from_im=webwangwang&signmode=im&type=0&u_id=cntaobao" + E + "&t_id=" + y + "&sign_account=" + E;
        if (F) {
            F.href = "http://sign.im.alisoft.com/sign/aso?domain=taobao&target=" + H + "&_input_charset=utf-8"
        }
        var A = new h.Drag(l, { handle: ".tdog-popup-head", not: [".tdog-popup-help", ".tdog-popup-close"], scroll: true });
        A.onStartDrag = function (M, L) {
            u.css(L, "bottom", "auto")
        };
        v.on(h.get("div.tdog-popup-head", l), "selectstart", function (L) {
            L.halt()
        });
        DragFn = function (T, Q, P, W, V, aa) {
            var Z = aa, U = h.get("div.tdog-popup-talkhistory", Z), N = h.get("div.tdog-popup-talkright", Z), R = h.get("div.tdog-popup-main", Z), O = h.get("a.tdog-popup-pulloff", Z), X = h.get("span.tdog-popup-sendbut", Z), M = h.get("a.tdog-popup-pullon", Z), L = h.get("div.tdog-popup-tms-bullet", Z), S = L.style.display == "block" ? Q.offsetHeight - 163 + "px" : Q.offsetHeight - 141 + "px";
            if (u.hasClass(Z, "tdog-popup-visible")) {
                u.removeClass(Z, "tdog-popup-visible")
            }
            u.css(U, "width", "auto");
            u.css(U, "marginRight", "5px");
            u.css(R, "height", Q.offsetHeight - 28 + "px");
            if (u.css(N, "display") !== "none") {
                u.css(N, "height", Q.offsetHeight - 37 + "px")
            }
            u.css(U, "height", S);
            u.css((function () {
                return (O ? O : M)
            })(), "height", Q.offsetHeight - 141 + "px");
            if (6 === h.UA.ie) {
                u.addClass(X, "reflow-fix");
                u.removeClass(X, "reflow-fix")
            }
        };
        var I = new h.Drag(l, { resize: true, handle: ".tdog-popup-handle", resizefn: [417, 291] });
        I.onStartDrag = function (O, N, L) {
            var M = h.get("div.tdog-popup-talkright", l);
            L.resizefn = (u.css(M, "display") === "none") ? [270, 291] : [417, 291]
        };
        I.onDrag = function (Q, O, M, L, R, N) {
            var P = N;
            DragFn(Q, O, M, L, R, N)
        };
        var G = new h.Drag(l, { resize: true, handle: ".tdog-popup-handle-x", resizefn: [false, 291] });
        G.onDrag = function (Q, O, M, L, R, N) {
            var P = N;
            DragFn(Q, O, M, L, R, N)
        };
        var D = new h.Drag(l, { resize: true, handle: ".tdog-popup-handle-y", resizefn: [417, false] });
        D.onStartDrag = function (R, P, M, L, S, N) {
            var Q = N, O = h.get("div.tdog-popup-talkright", Q);
            M.resizefn = (u.css(O, "display") === "none") ? [270, false] : [417, false]
        };
        D.onDrag = function (P, O, M, L, Q, N) {
            DragFn(P, O, M, L, Q, N)
        };
        k.getTmsContent([{ data: j, link: n.tmsBulletinUrl, callback: "TDog.ChatDialog.showBulletin", success: function () {
            h.log("\u8bfb\u53d6 TMS \u6587\u5b57\u94fe\u8d44\u6e90\u6210\u529f")
        }, hasDate: null, notHasDate: null
        }]);
        return l
    }, show: function (C, B) {
        d = C;
        var J = this, y = a.formatNick(d.userId), H, E, z = false;
        for (var D = 0; D < q.length; D++) {
            if (q[D][0] == y) {
                q[D][1].style.display = "block";
                m = q[D][1];
                z = true
            } else {
                q[D][1].style.display = "none"
            }
        }
        if (!z) {
            h.use("dragdrop", function () {
                m = J._create(B);
                H = u.viewportWidth();
                E = (H - 440) / 2;
                m.style.left = E + "px"
            })
        }
        var G = h.get("div.tdog-popup-head", m), A, I = h.get("div", G), F = ((d.status == 1 || d.status == 10) && C.wangXinSatus == 1) ? true : false;
        if (d.status) {
            if (F) {
                A = " - " + r.WX_USER_STATUS[C.wangXinSatus][1]
            } else {
                A = " - " + r.USER_STATUS[C.status][1]
            }
        } else {
            A = ""
        }
        var x = d.relation ? "\u597d\u53cb" : "\u964c\u751f\u4eba";
        I.innerHTML = '<i></i><div class="tdog-contact-info"><span class="tdog-popup-contact">' + d.userName + "</span>" + A + "</div>";
        I.className = F ? "tdog-status-" + r.WX_USER_STATUS[C.wangXinSatus][0] : "tdog-status-" + r.USER_STATUS[C.status][0];
        k.tmalllog("ww.1.20.1.1.1");
        this.changeBut()
    }, closeDialog: function () {
        k.css([[m, "display", "none"], ["tdog-face-container", "display", "none"]]);
        m = false;
        d = ""
    }, showInfo: function (C) {
        var H = h.get("div.tdog-popup-talkright", m), x = (n.appId == 1);
        if (!H) {
            return
        }
        if (!x && C.item && C.item.id) {
            var I = C.item, G = '<div class="tdog-popup-goodsinfo"><p class="tdog-goodsinfo-head">\u5b9d\u8d1d\u63cf\u8ff0</p><div><div class="tdog-goodsinfo-pic"><p class="tdog-goodsinfo-img"><a href="http://item.taobao.com/item_detail-null-' + I.id + '.jhtml"  target = "_blank"><img src="' + I.imageUrl + '_80x80.jpg" title="' + I.title + '"/></a></p></div></div><p class="tdog-goodsinfo-title"><a href="http://item.taobao.com/item_detail-null-' + I.id + '.jhtml"  target = "_blank">' + I.title + '</a></p><p class="tdog-goodsinfo-price">\u4e00\u53e3\u4ef7\uff1a<span>' + I.price + '</span>\u5143</p><p><a href="http://buy.taobao.com/auction/buy_now.jhtml?auction_id=' + I.id + '" title="\u7acb\u523b\u8d2d\u4e70" class="tdog-goodsinfo-linkbuy" target = "_blank"></a></p></div>';
            u.css(H, "background-image", "none");
            H.innerHTML = G
        } else {
            if (C.user && C.user.nick) {
                var A = { nick: "", sex: "\u4fdd\u5bc6", from: "\u4fdd\u5bc6", registDate: "", visitDate: "\u6ca1\u6709\u767b\u5f55", sellNum: "", buyNum: "", certification: "", relation: "" };
                A = h.merge(A, C.user);
                switch (A.sex) {
                    case 1:
                        A.sex = "\u7537";
                        break;
                    case 2:
                        A.sex = "\u5973";
                        break;
                    default:
                        A.sex = "\u4fdd\u5bc6";
                        break
                }
                var E = A.sellNum, z = A.buyNum, B = (A.certification == "true");
                if (E != 0) {
                    E = '<img align="absmiddle" title="\u5356\u5bb6\u4fe1\u7528\u79ef\u5206" src="http://a.tbcdn.cn/sys/common/icon/rank/b_' + A.sellNum + '.gif" />'
                }
                if (z != 0) {
                    z = '<img align="absmiddle" title="\u4e70\u5bb6\u4fe1\u7528\u79ef\u5206" src="http://a.tbcdn.cn/sys/common/icon/rank/c_' + A.buyNum + '.gif" />'
                }
                if (B) {
                    B = '<img align="absmiddle" title="\u6dd8\u5b9d\u8ba4\u8bc1\u5546\u6237" src="http://a.tbcdn.cn/sys/common/icon/trade/mall_auth.png" />'
                }
                var y = "";
                if (C.user.suspended == 3) {
                    y = '<p class="tdog-userinfo-suspended">\u8be5\u7528\u6237\u5df2\u7ecf\u88ab\u67e5\u5c01</p>'
                }
                var D = '<div class="tdog-popup-userinfo">' + y + '<p class="tdog-userinfo-username">' + A.nick + '</p><p>\u6765\u81ea\uff1a<span class="tdog-popup-userinfo-from">' + A.from + "</span><br/> \u6027\u522b\uff1a" + A.sex + "</p><p>\u6ce8\u518c\u65f6\u95f4\uff1a" + A.registDate.split(" ")[0] + "</p><p>\u4e0a\u6b21\u767b\u5f55\uff1a" + A.visitDate.split(" ")[0] + "</p>" + (E != "" ? "<p>\u5356\u5bb6\uff1a" + E + "</p>" : "") + (z != "" ? "<p>\u4e70\u5bb6\uff1a" + z + "</p>" : "") + (B ? "<p>\u8ba4\u8bc1\uff1a" + B + "</p>" : "") + "</div>";
                u.css(H, "background-image", "none");
                H.innerHTML = D;
                A.relation == 1 ? (A.relation = "\u597d\u53cb") : (A.relation = "\u964c\u751f\u4eba");
                var F = h.get("div.tdog-popup-head", m);
                H = h.get("div", F);
                H.innerHTML = H.innerHTML.replace(/\u964c\u751f\u4eba/, A.relation)
            }
        }
    }, checkDialogOpen: function (x) {
        if (d) {
            return a.formatNick(x) == a.formatNick(d.userName)
        }
    }, isOpen: function () {
        return !!m
    }, getTargetUser: function () {
        return d.userName
    }, updateUserStatus: function (F, z, x) {
        if (a.formatNick(d.userName) != a.formatNick(F)) {
            return
        }
        var E = h.get("div.tdog-popup-head", m), G = h.get("div", E), A = "", D, y = /\u597d\u53cb/, C = ((z == 1 || z == 10) && x == 1) ? true : false, B;
        if (C) {
            A = " - " + r.WX_USER_STATUS[1][1]
        } else {
            B = r.USER_STATUS[z];
            (B != "") && (A = " - " + B[1])
        }
        if (y.test(G.innerHTML)) {
            D = "(\u597d\u53cb)"
        } else {
            D = "(\u964c\u751f\u4eba)"
        }
        G.innerHTML = '<i></i><div class="tdog-contact-info"><span class="tdog-popup-contact">' + d.userName + "</span>" + A + "</div>";
        G.className = C ? "tdog-status-" + r.WX_USER_STATUS[x][0] : "tdog-status-" + B[0]
    }, showMsg: function (C) {
        if (!h.isArray(C)) {
            return
        }
        var z = h.get("div.tdog-popup-talkhistory", m), x = h.get("div.tdog-popup-talkcontainer", l), y = 0, D = "", B, A;
        for (; y < C.length; y++) {
            D = D + this.__getMessageRealContent(C[y])
        }
        z.innerHTML += D;
        h.later(function () {
            z.scrollTop = z.scrollHeight
        }, 200, false)
    }, showSysTip: function (z, y) {
        if (!m) {
            return
        }
        var x;
        if (y) {
            x = h.get("div.tdog-popup-talkright", m);
            if (x) {
                u.css(x, "background-image", "none");
                x.innerHTML = z
            }
        } else {
            x = h.get("div.tdog-popup-talkhistory", m);
            if (x) {
                x.innerHTML += '<div class="tdog-talk-filetip"><i></i>' + z + "</div>";
                x.scrollTop = x.scrollHeight
            }
        }
    }, updateMsg: function () {
        if (!m) {
            return
        }
        var y = h.get("div.tdog-popup-talkhistory", m), x = r.DataManager.getAllMessages(d.userId);
        y.innerHTML = "";
        r.ChatDialog.showMsg(x);
        c.fire(r.EVENTS.UPDATE_STATUS_ICON)
    }, getCurrentChatUserId: function () {
        if (this.isOpen()) {
            return (d && d.userId) ? d.userId : ""
        }
        return ""
    }, getCurrentChatUserInfo: function () {
        if (this.isOpen()) {
            return d
        }
        return {}
    }, clearCurrentChatUserId: function () {
        if (d && d.userId) {
            d.userId = ""
        }
    }, sendMsg: function (x) {
        var z = r.DataManager.getNickName(), A = r.Util.charToFace(x.value, true);
        this.showMsg([{ fromId: this.getCurrentChatUserId(), userId: z, sendTime: r.Util.formatDate(new Date()), content: r.Util.escapeHTML(A), type: r.MESSAGE_TYPE.SELF}]);
        var y = a.formatNick(d.userId);
        c.fire(r.EVENTS.SEND_MESSAGE, { userName: y, content: A, callback: { onFailure: function () {
            r.ChatDialog.showSysTip("<p><span>\u7f51\u7edc\u539f\u56e0\uff0c\u6d88\u606f\u53d1\u9001\u5931\u8d25\uff01</span></p>")
        }, onTimeout: function () {
            r.ChatDialog.showSysTip("<p><span>\u7f51\u7edc\u8d85\u65f6\uff01</span></p>")
        } 
        }
        });
        x.value = ""
    }, changeBut: function () {
        var x = h.get("div.tdog-popup-talkinput", m).getElementsByTagName("textarea")[0], A = h.get("span.tdog-popup-sendbut", m), z = "tdog-popup-sendbut-off", y = x.value;
        if (y == "") {
            if (!u.hasClass(A, z)) {
                u.addClass(A, z)
            }
        } else {
            if (y != "") {
                if (u.hasClass(A, z)) {
                    u.removeClass(A, z)
                }
            }
        }
    }, _bindUI: function (M) {
        var y = h.get("span.tdog-popup-help", M), J = h.get("span.tdog-popup-close", M), H = h.get("a.tdog-popup-pulloff", M), z = h.get("div.tdog-popup-talkright", M), E = h.get("div.tdog-popup-talkleftinner", M), I = h.get("span.tdog-popup-changesend", M), A = h.get("div.tdog-popup-talkbar", M), D = h.get("span.tdog-popup-talkbar-clear", M), L = h.get("div.tdog-popup-talkhistory", M), B = h.get("div.tdog-popup-tms-bullet", M), F = u.children(A)[0], C = u.next(I), x = C.getElementsByTagName("li"), K = h.get("span.tdog-popup-send", M), G = h.get("div.tdog-popup-talkinput", M).getElementsByTagName("textarea")[0];
        v.on(M, "click", function (P) {
            var N = P.target;
            if (N != F) {
                u.css(s, "display", "none")
            }
            if (N.className == "tdog-popup-tms-bulletin-close") {
                var O = L.offsetHeight + 22;
                h.get("div.tdog-popup-tms-bulletin-close", M).parentNode.parentNode.style.display = "none";
                u.css([L, H], "height", O)
            }
        });
        v.on(y, "click", function () {
            var O = i(r.DataManager.getNickName()), N = i("\u95ee\u9898\u54a8\u8be2");
            g.open("http://im.robot.aliapp.com/all/aliqzg/webspace.jsp?id=4&userId=" + O + "&ask=" + N);
            r.Util.sendLog("wwweblog=checkww")
        });
        v.on(D, "click", function () {
            var N = r.ChatDialog.getCurrentChatUserId();
            L.innerHTML = "";
            r.DataManager.deleteMessage(N);
            a.clearChatMessage(N)
        });
        v.on(J, "click", function () {
            M.style.display = "none";
            u.css(s, "display", "none");
            L.innerHTML = "";
            m = false;
            d = ""
        });
        v.on(H, "click", function () {
            if (z.style.display != "none") {
                k.css([[z, "display", "none"], [M, "width", L.offsetWidth + (h.UA.ie ? 6 : 2) + "px"], [E, "margin-right", "auto"], [L, "width", "auto"], [L, "marginRight", "6px"]]);
                u.attr(H, "title", "\u663e\u793a\u4fa7\u8fb9\u680f");
                H.className = "tdog-popup-pullon";
                h.get("div.tdog-popup-handle-y", M).style.height = "38%"
            } else {
                k.css([[z, "display", "block"], [M, "width", M.offsetWidth + 147 + "px"], [E, "marginRight", "145px"]]);
                z.style.height = parseInt(M.offsetHeight) - 37 + "px";
                u.attr(H, "title", "\u9690\u85cf\u4fa7\u8fb9\u680f");
                H.className = "tdog-popup-pulloff";
                h.get("div.tdog-popup-handle-y", M).style.height = "95%"
            }
        });
        v.on(K, "click", function () {
            if (!r.ChatDialog.__checkLength(G.value)) {
                return
            }
            this.sendMsg(G);
            this.changeBut();
            u.css(C, "display", "none")
        }, this, true);
        v.on(I, "click", function () {
            if (u.css(C, "display") == "none") {
                u.css(C, "display", "block");
                u.addClass(M, "tdog-popup-visible");
                if (h.UA.ie == 6) {
                    u.css(M, "paddingBottom", "0")
                }
            } else {
                u.css(C, "display", "none");
                if (u.hasClass(M, "tdog-popup-visible")) {
                    u.removeClass(M, "tdog-popup-visible");
                    if (h.UA.ie == 6) {
                        u.css(M, "paddingBottom", "1px")
                    }
                }
            }
        });
        v.on(x[0], "click", function () {
            if (x[0].className == "") {
                x[0].className = "tdog-send-mode";
                x[1].className = ""
            }
            u.css(C, "display", "none")
        });
        v.on(x[1], "click", function () {
            if (x[1].className == "") {
                x[1].className = "tdog-send-mode";
                x[0].className = ""
            }
            u.css(C, "display", "none")
        });
        v.on(G, "mousedown", function (N) {
            this.changeBut()
        }, this, true);
        v.on(G, "paste", function (O) {
            var N = this;
            g.setTimeout(function () {
                N.changeBut()
            }, 100)
        }, this, true);
        v.on(G, "keyup", function () {
            this.changeBut()
        }, this, true);
        v.on(G, "keydown", function (T) {
            var R, P = this;
            if (T == null) {
                return
            }
            if (T.ctrlKey && T.keyCode == 13) {
                var S = G.value;
                if (x[0].className == "tdog-send-mode") {
                    if (!r.ChatDialog.__checkLength(S)) {
                        return
                    }
                    this.sendMsg(G)
                } else {
                    if (w.selection) {
                        var O = w.selection.createRange();
                        O.text = "\r\n"
                    } else {
                        var N = S.length, Q = N - G.selectionEnd;
                        G.value = S.substr(0, G.selectionStart) + "\r\n" + S.substring(G.selectionEnd, N);
                        G.selectionEnd = N - Q + 1
                    }
                }
            } else {
                if (T.keyCode == 13) {
                    if (x[1].className == "tdog-send-mode") {
                        T.preventDefault();
                        if (!r.ChatDialog.__checkLength(G.value)) {
                            return
                        }
                        this.sendMsg(G)
                    } else {
                    }
                }
            }
            if (T.keyCode == 27) {
                P.closeDialog()
            }
        }, this, true);
        v.on(F, "click", function () {
            r.ChatDialog.Face.show(F, G)
        });
        v.on(L, "click", function (R) {
            var N = R.target;
            if (N.nodeName.toUpperCase() == "A" && N.parentNode.className == "webww-msg-unsafe-link") {
                var O = h.get("div.tdog-popup-talkhistory", m);
                var P, Q = h.get("div.tdog-popup-tips");
                if (!Q) {
                    Q = '<div class="tdog-tips tdog-popup-tips"><div class="tdog-tipscontainer"><i class="tdog-tipsalert"></i><i class="tdog-tipsclose"></i><div class="tdog-tipsmain"><p>\u65e0\u6cd5\u786e\u8ba4\u94fe\u63a5\u7684\u5b89\u5168\u6027\uff0c\u8bf7\u53ea\u6253\u5f00\u6765\u6e90\u53ef\u9760\u7684\u7f51\u5740</p><p><a id="__last__webww_msg_unsafe_link" href="' + N.href + '" target="_blank">\u6253\u5f00\u94fe\u63a5</a>&nbsp;&nbsp;&nbsp;&nbsp;</p></div></div></div>';
                    Q = u.create(Q);
                    N.parentNode.appendChild(Q);
                    if (O.scrollHeight - 150 > 0) {
                        Q.style.top = O.offsetHeight + O.scrollTop - 150 + "px"
                    }
                    Q.style.zoom = 1;
                    P = h.get("i.tdog-tipsclose", Q);
                    v.on(P, "click", function () {
                        N.parentNode.removeChild(Q)
                    })
                } else {
                    Q.style.top = O.offsetHeight + O.scrollTop - 150 + "px";
                    h.get("#__last__webww_msg_unsafe_link").href = N.href
                }
                R.preventDefault()
            }
        })
    }, __getMessageRealContent: function (z) {
        var x = parseInt(z.type);
        if ("-" === z.userId) {
            z.userId = r.DataManager.getNickName()
        }
        switch (x) {
            case r.MESSAGE_TYPE.SELF:
                return this.__talkMessage(z, z.userId, true);
            case r.MESSAGE_TYPE.OFFLINE:
                return this.__talkMessage(z, z.fromId);
            case r.MESSAGE_TYPE.TALK:
                var y = "";
                var A = parseInt(z.subType);
                switch (A) {
                    case r.MESSAGE_SUBTYPE.FAIL_ACK:
                        y = r.UNSUPPORT_MSG[A].replace("{content}", z.content);
                        break;
                    case r.MESSAGE_SUBTYPE.ILLEGALITY:
                        y = z.content;
                        break;
                    case r.MESSAGE_SUBTYPE.NEED_AUTH:
                        return "";
                    case r.MESSAGE_SUBTYPE.FILE_MESSAGE:
                    case r.MESSAGE_SUBTYPE.PIC_MESSAGE:
                    case r.MESSAGE_SUBTYPE.GRAFFITI:
                    case r.MESSAGE_SUBTYPE.REMOTE_ASSIST:
                    case r.MESSAGE_SUBTYPE.AV:
                    case r.MESSAGE_SUBTYPE.FOLDER:
                    case r.MESSAGE_SUBTYPE.PEER_VERIFY:
                        y = r.UNSUPPORT_MSG[A] + "</br>" + r.ERROR_MESSAGE["-40000"];
                        break;
                    case r.MESSAGE_SUBTYPE.TALK_MESSAGE:
                        return this.__talkMessage(z, z.fromId, undefined, undefined, true);
                    case r.MESSAGE_SUBTYPE.AUTO_BACK_TALK_MESSAGE:
                        return this.__talkMessage(z, z.fromId, undefined, true, true);
                    default:
                        h.log("\u51fa\u73b0\u672a\u5b9a\u4e49\u7684\u6d88\u606f\u7c7b\u578b\uff1a" + z.subType, "warn");
                        return ""
                }
                return '<div class="tdog-talk-filetip"><i></i><p><span>' + y + "</span></p></div>"
        }
        h.log("\u6d88\u606f\u4e2d\u51fa\u73b0\u9519\u8bef:" + x, "warn");
        return ""
    }, __talkMessage: function (A, z, y, C) {
        var x = A.content, B = A.sendTime.length <= 19 ? A.sendTime : A.sendTime.substring(0, 19);
        x = r.Util.charToFace(A.content, null, y);
        x = x.replace(/\n/g, "<br />");
        return '<p class="tdog-talk-others"><span class="tdog-talk-username">' + r.Util.getUserName(z) + '</span><span class="tdog-talk-time">(' + B + '):</span></p><div class="tdog-talk-content">' + (C ? '<span class="tdog-auto-back-talk-message">[\u81ea\u52a8\u56de\u590d]</span>' : "") + x + "</div>"
    }, __checkLength: function (D) {
        var z, A, x = '<div class="tdog-tips tdog-popup-tips"><div class="tdog-tipscontainer"><s class="tdog-tipsext"></s><i class="tdog-tipsimg"></i><i class="tdog-tipsclose"></i><div class="tdog-tipsmain"><p>\u4f60\u53d1\u9001\u7684\u6d88\u606f\u8fc7\u957f\uff0c\u8bf7\u4e0b\u8f7d\u652f\u6301\u53d1\u9001\u8d85\u957f\u4fe1\u606f\u7684<a href="' + n.downloadWangWangURLBuy + '" target="_blank">\u963f\u91cc\u65fa\u65fa\u5ba2\u6237\u7aef</a></p></div></div></div>', y = h.get("div.tdog-popup-talkcontainer", l);
        A = 0;
        for (z = 0; z < D.length; z++) {
            if ((D.charCodeAt(z) >= 0) && (D.charCodeAt(z) <= 255)) {
                A = A + 1
            } else {
                A = A + 2
            }
        }
        if (A > 300) {
            if (h.query("div.tdog-popup-tips", y).length == 1) {
                return
            }
            var C = u.create(x), B;
            y.appendChild(C);
            B = h.get("i.tdog-tipsclose", C);
            v.on(B, "click", function () {
                y.removeChild(C)
            });
            return false
        } else {
            if (A == 0) {
                return false
            }
        }
        return true
    } 
    };
    r.ChatDialog.Face = { init: function (x) {
        s = w.createElement("div");
        s.id = "tdog-face-container";
        for (var y = 0; y < 99; y++) {
            s.innerHTML += '<span data-icon="' + y + '.gif"></span>'
        }
        h.get("#tstart").appendChild(s);
        this._bindUI()
    }, show: function (y, x) {
        if (!s) {
            this.init(x)
        } else {
            s.style.display = "block"
        }
        var z = [u.offset(y).left, u.offset(y).top - 237];
        u.offset(s, { left: z[0], top: z[1] });
        x.focus()
    }, _bindUI: function () {
        v.on(s, "click", function (D) {
            var y = h.get("div.tdog-popup-talkinput", m).getElementsByTagName("textarea")[0], x = D.target, C = u.attr(x, "data-icon");
            C = r.Util.faceToChar(C);
            y.focus();
            if (typeof w.selection != "undefined") {
                w.selection.createRange().text = C
            } else {
                var B = y.value, A = B.length, z = A - y.selectionEnd;
                y.value = B.substr(0, y.selectionStart) + C + B.substring(y.selectionEnd, y.value.length);
                y.selectionEnd = y.value.length - z
            }
            s.style.display = "none";
            r.ChatDialog.changeBut()
        })
    } 
    }
});
TDog.add("StatusIcon", function (b) {
    var d = KISSY, e = d.DOM, c, a = 0;
    b.StatusIcon = { init: function () {
        d.log("init StatusIcon");
        c = d.get("#tstart-plugin-tdog s.tstart-item-icon");
        this.offline()
    }, onlogin: function () {
        c.className = "tstart-item-icon tstart-tdog-login"
    }, isLogining: function () {
        return e.hasClass(c, "tstart-tdog-login")
    }, online: function () {
        if (c.className != "tstart-item-icon tstart-tdog-online") {
            c.className = "tstart-item-icon tstart-tdog-online"
        }
    }, offline: function () {
        c.className = "tstart-item-icon tstart-tdog-offline"
    }, isOffline: function () {
        return e.hasClass(c, "tstart-tdog-offline")
    }, getmessage: function () {
        if (c.className != "tstart-item-icon tstart-tdog-mess") {
            c.className = "tstart-item-icon tstart-tdog-mess"
        }
    }, onNewMessage: function () {
        return e.hasClass(c, "tstart-tdog-mess")
    }, showcount: function (f) {
        if (a === f) {
            return
        }
        if (f == 0) {
            c.innerHTML = "";
            this.online()
        } else {
            c.innerHTML = '<span class="tdog-toolbar-msgnum">' + f + "</span>";
            this.getmessage()
        }
        a = f
    }, removeicon: function () {
        c.className = "tstart-item-icon"
    } 
    }
});
TDog.add("SysMessage", function (h) {
    var e = KISSY, j = e.DOM, i = e.Event, d, b, c, g = "none", a = "block", f = '<div id="tdog-sys-message" class="tdog-simplepop" style="display:none;"><div class="tdog-simplepop-head"><span>\u7cfb\u7edf\u6d88\u606f</span><span class="tdog-closebut"></span></div><div class="tdog-simplepop-main"><div class="tdog-sysinfo"><dl></dl></div><div class="tdog-sysinfo-foot"></div></div></div>';
    h.SysMessage = { init: function () {
    }, _create: function () {
        d = j.create(f);
        e.get("#tstart").appendChild(d);
        b = e.get("dl", d);
        this._bindUI()
    }, show: function (k) {
        if (!b) {
            this._create()
        }
        this._loadData(k);
        d.style.display = a
    }, _loadData: function (l) {
        l.datetime = l.datetime.split(" ")[0];
        var k = (l.content || "").replace(/\r\n/ig, "<br />");
        b.innerHTML = '<dt><p><span class="tdog-info-mailicon"></span><span class="tdog-info-title">' + l.title + '</span><span class="tdog-info-time">' + l.datetime + '</span><span class="tdog-info-toolopen"></span></p></dt><dd style="display:none">' + k + "</dd>" + b.innerHTML
    }, _bindUI: function () {
        i.on("#tdog-sys-message .tdog-closebut", "click", function () {
            d.style.display = g
        });
        i.on(b, "click", function (m) {
            var n = m.target, l = n, k;
            while (l.nodeName !== "DT" && l !== b) {
                l = l.parentNode
            }
            if (l.nodeName === "DT") {
                if (c && c != l && e.get(".tdog-info-toolclose", c)) {
                    e.get(".tdog-info-toolclose", c).className = "tdog-info-toolopen";
                    c.nextSibling.style.display = g
                }
                k = l.nextSibling;
                if (k.style.display === a) {
                    e.get(".tdog-info-toolclose", l).className = "tdog-info-toolopen";
                    k.style.display = g
                } else {
                    e.get(".tdog-info-toolopen", l).className = "tdog-info-toolclose";
                    k.style.display = a
                }
                c = l
            }
        })
    } 
    }
});
TDog.add("SysPopup", function (c) {
    var d = KISSY, e = d.DOM, b = d.Event;
    POPUP_TEMP = '<div class="tdog-simplepop" style="width:225px;"><div class="tdog-simplepop-head"><span class="tdog-simplepop-icon"></span><span>{title}</span><span class="tdog-closebut"></span> </div><div class="tdog-simplepop-main"><div class="tdog-remind"><div class="tdog-remind-inner">{content}</div></div> <div class="tdog-remind-foot"><span>{time}</span></div></div></div>';
    c.SysPopup = { init: function () {
        var f = { content: "\u60a8\u7684\u6dd8\u5b9d\u8ba2\u9605\u6709\u66f4\u65b0<br>\u6d3b\u52a80 \u5546\u54c10 \u5e97\u94fa 0<br>\u67e5\u770b\u66f4\u65b0 \u7ba1\u7406\u8ddf\u65b0", style: "pos=3;width=225;height=150;format=1;staytime=18000001;showmode=0;title=\u7cfb\u7edf\u63d0\u793a;enablemove=0" }
    }, show: function (i) {
        if (!i.content) {
            return
        }
        var f = { title: "\u6dd8\u5b9d\u65fa\u65fa\u8ba2\u9605\u63d0\u9192", width: "225px", time: new Date(), staytime: 60000 };
        if (i.style) {
            var g = d.unparam(i.style, ";");
            f = Y.lang.merge(f, g)
        }
        if (i.time) {
            f.time = i.time
        }
        f.content = i.content;
        f.time = c.Util.formatDate(f.time);
        var h = e.create(a(POPUP_TEMP, f));
        d.get("#tstart").appendChild(h);
        this._bindUI(h);
        window.setTimeout(function () {
            if (h) {
                d.get("#tstart").removeChild(h)
            }
        }, f.staytime)
    }, _bindUI: function (g) {
        var f = d.get("span.tdog-closebut", g);
        b.on(f, "click", function (h) {
            d.get("#tstart").removeChild(g)
        })
    } 
    };
    function a(f, g) {
        return f.replace(/\{([^}]+)\}/g, function (h, i) {
            return g[i] || ""
        })
    }
});
TDog.add("SysTips", function (k) {
    var c = KISSY, m = c.DOM, l = c.Event, a, d, j, e = "tstart-item-hover-tips", b = "tstart-hidden", f = "tstart-tips-login-ok-btn", n = "tstart-client-oneline", g = "tstart-client-cancle-oneline", h = "tstart-client-help-oneline", i = '<span class="tstart-item-tips tdog-systips tstart-hidden"><i></i><s></s><div class="tdog-systips-content">{CONTENT}</div></span>';
    k.SysTips = { init: function () {
        c.log("init SysTips");
        var o = k.hostEl;
        d = m.create(i);
        j = c.get(".tdog-systips-content", d);
        o.appendChild(d);
        a = c.get(".tstart-tdog-trigger", o);
        this._bindUI()
    }, show: function (p, q, o) {
        d.style.width = (q || 120) + "px";
        j.innerHTML = p || k.ERROR_MESSAGE[-1];
        m.removeClass(d, e);
        m.removeClass(d, b);
        if (o) {
            c.later("hide", o * 1000, false, this, d)
        }
    }, setHoverTips: function (o) {
        j.innerHTML = o;
        m.addClass(d, e)
    }, hide: function () {
        m.addClass(d, b)
    }, _bindUI: function () {
        var o = this;
        l.on(d, "click", function (p) {
            var q = p.target;
            if (m.hasClass(q, f)) {
                k.WebServer.login()
            } else {
                if (m.hasClass(q, n)) {
                    k.Login.online = true;
                    k.Login.ready = true;
                    k.WebServer.login(k.WebServer.AUTO_LOGIN.forcedLogin);
                    k.Util.sendLog("&wwweblog=confirm")
                } else {
                    if (m.hasClass(q, h)) {
                        window.open("http://im.robot.aliapp.com/all/aliqzg/webspace.jsp?id=4&ask=%E5%AE%89%E8%A3%85%E4%BA%86%E9%98%BF%E9%87%8C%E6%97%BA%E6%97%BA%EF%BC%8C%E7%82%B9%E2%80%9C%E5%92%8C%E6%88%91%E8%81%94%E7%B3%BB%E2%80%9D%E6%9C%AA%E5%BC%B9%E5%87%BA%E8%81%8A%E5%A4%A9%E7%AA%97%E5%8F%A3%EF%BC%9F&page=kjts", "")
                    } else {
                        if (m.hasClass(q, g)) {
                            k.StatusIcon.offline();
                            k.Util.sendLog("&wwweblog=cancel")
                        } else {
                            if (q.nodeName === "A" && q.className != "tstart-item-tips-on") {
                                location.href = q.href
                            }
                        }
                    }
                }
            }
            o.hide()
        })
    }, showLoginTips: function (p) {
        if (p || k.StatusIcon.isLogining()) {
            this.show("\u963f\u91cc\u65fa\u65fa\u6b63\u5728\u767b\u5f55\uff0c\u8bf7\u7a0d\u5019\u2026\u2026", 110)
        } else {
            var o = k.DataManager.getNickName();
            this.show("\u548c\u5bf9\u65b9\u804a\u5929\uff0c\u9700\u8981\u767b\u5f55\u963f\u91cc\u65fa\u65fa\uff0c\u786e\u5b9a\u7528\u5e10\u53f7\uff08" + o + '\uff09\u767b\u5f55\u5417\uff1f<hr><span class="tstart-item-tips-btn ' + f + '">\u786e\u5b9a</span><span class="tstart-item-tips-btn">\u53d6\u6d88</span>', 200)
        }
    }, showClientOnlineTips: function () {
        var o = k.DataManager.getNickName(), p = "http://service.taobao.com/support/help-16380.htm";
        this.show("\u60a8\u7684\u5e10\u53f7\uff08" + o + '\uff09\u5df2\u7ecf\u767b\u5f55\u4e86\u963f\u91cc\u65fa\u65fa<br/>1\u3001\u70b9\u51fb\u3010\u786e\u5b9a\u3011\u7ee7\u7eed\u767b\u5f55\u7f51\u9875\u7248,\u767b\u5f55\u6210\u529f\u540e\u4f1a\u628a\u5df2\u767b\u5f55\u7684\u5ba2\u6237\u7aef\u8e22\u4e0b\u7ebf<br>2\u3001\u5982\u679c\u60a8\u5df2\u767b\u5f55\u5ba2\u6237\u7aef,\u70b9\u51fb\u3010<a target="_blank" class="tstart-item-tips-on" href=' + p + ' >\u5e2e\u52a9</a>\u3011,\u83b7\u53d6\u5982\u4f55\u7ee7\u7eed\u4f7f\u7528(\u4fee\u590d)\u5ba2\u6237\u7aef\u7684\u65b9\u6cd5<hr><span class="tstart-item-tips-btn ' + n + '">\u786e\u5b9a</span><span class="tstart-item-tips-btn ' + g + '">\u53d6\u6d88</span><span class="tstart-item-tips-btn ' + h + '">\u5e2e\u52a9</span>', 280)
    }, showLoginFailedTips: function (p) {
        var o = k.ERROR_MESSAGE[p] || "\u963f\u91cc\u65fa\u65fa\u6682\u65f6\u4e0d\u53ef\u7528\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5";
        this.show(o + '<hr><span class="tstart-item-tips-btn">\u786e\u5b9a</span>', 180)
    }, showLogoutTips: function (p) {
        p = p || -1;
        var o = "\u963f\u91cc\u65fa\u65fa\u73b0\u5728\u79bb\u7ebf\u4e86\u3002<hr>\u662f\u5426\u91cd\u65b0\u767b\u5f55\uff1f";
        if (p == "402") {
            o = "\u4f60\u7684\u5e10\u53f7(" + k.DataManager.getNickName() + ")\u5df2\u7ecf\u5728\u5176\u4ed6\u5730\u65b9\u767b\u5f55\uff01<hr>\u9700\u8981\u91cd\u65b0\u767b\u5f55\u5417\uff1f"
        }
        if (p != -1) {
            this.show(o + '<br /><span class="tstart-item-tips-btn ' + f + '">\u786e\u5b9a</span><span class="tstart-item-tips-btn">\u53d6\u6d88</span>', 180)
        }
    }, showWelcomeTips: function () {
        this.show("\u6b22\u8fce\u4f7f\u7528\u5168\u65b0\u963f\u91cc\u65fa\u65fa\u7f51\u9875\u7248\uff01", 100)
    }, showLastTips: function () {
        if (!m.hasClass(d, e)) {
            m.removeClass(d, b)
        }
    } 
    }
});
TStart.add("plugin~tdog", function (a) {
    var f = KISSY.DOM, c = KISSY.Event, g = a.PLUGIN_TYPE, b = TDog.EVENTS, d = TDog.EventCenter, e = '<div class="tstart-tdog-panel"><div class="tstart-tdog-panel-hd"><span>\u6700\u8fd1\u8054\u7cfb\u4eba</span><s class="tstart-tdog-panel-closebtn"><img src="http://img01.taobaocdn.com/tps/i1/T1R6pOXoRyXXXXXXXX-15-15.png"></s></div><div class="tstart-tdog-panel-bd tstart-panel-loading" style="width:160px;height:180px"></div></div>';
    a.addPlugin("tdog", { type: "custom", tips: "\u963f\u91cc\u65fa\u65fa", html: '<span class="tstart-tdog-trigger"><s class="tstart-item-icon"></s></span>' + e, init: function () {
        var j = this;
        function h(k) {
            if (f.hasClass(k.target, "tstart-item-icon")) {
                return d.fire(b.CLICK_STATUS_ICON)
            }
            return false
        }
        function i(k) {
            if (!TDog.DataManager.isLogin()) {
                return
            }
            TDog.WebServer.getTalkUsers();
            f.removeClass(f.get(".tstart-tdog-panel-bd", "#tstart-plugin-tdog"), "tstart-panel-loading");
            TDog.Util.tmalllog("ww.1.20.1.1.2")
        }
        c.on("#tstart-plugin-tdog", "click", function (l) {
            var m = l.target, k;
            if (f.hasClass(m, "tstart-item-icon")) {
                k = f.parent(m, ".tstart-item");
                if (f.hasClass(k, "tstart-item-active")) {
                    f.removeClass(k, "tstart-item-active")
                } else {
                    if (h(l)) {
                        a.fire("closePanel");
                        f.addClass(k, "tstart-item-active");
                        i(l)
                    }
                }
            }
        });
        TDog.init(a, f.get("#tstart-plugin-tdog"))
    } 
    })
});
TStart.initPlugins();