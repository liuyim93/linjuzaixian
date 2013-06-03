
var TB = window.TB || {};
TB.namespace = TB.namespace || function() {
    KISSY.namespace.apply(TB, arguments)
};
(function() {
    var g = KISSY, l = !"0"[0], L = l && !window.XMLHttpRequest, q = !!window.ActiveXObject, j = document, I = window, H, p, b = " ", B = "hover", d, s = "g_config" in I ? ("appId" in I.g_config ? parseInt(I.g_config["appId"]) : undefined) : undefined, M = "mini-cart", o = "mini-cart-no-layer", v = location.hostname.split("."), x = j.domain, C = x.indexOf("tmall.com") > -1, J = ~location.hostname.indexOf("daily.taobao.net") || ~location.hostname.indexOf("daily.tmall.net"), y = J ? ".daily.taobao.net" : ".taobao.com", f = "", u = false, A = null, G = (j.location.href.indexOf("https://") === 0), r = {}, k = {siteNav: function() {
            if (!d) {
                return
            }
            d.setAttribute("role", "navigation");
            g.each(z("menu", "*", d), function(T) {
                TB.Global._addMenu(T)
            });
            var S = j.forms.topSearch;
            m(S, "submit", function() {
                if (S.q.value == f) {
                    S.action = "http://list.taobao.com/browse/cat-0.htm"
                }
            });
            var i = z("cart", "li", d)[0];
            m(i, "click", function(U) {
                var T = U.target || U.srcElement;
                if (T.nodeName != "A" && T.parentNode.nodeName === "A") {
                    T = T.parentNode
                }
                if (T.nodeName === "A" && T.href.indexOf("my_cart.htm") > -1) {
                    F(U);
                    w(i, "hover");
                    TB.Cart && TB.Cart.redirect(T, T.href);
                    if (I.MiniCart) {
                        I.MiniCart._clicked = false
                    }
                }
            });
            var O = "g_mytaobao_set_dynamic_count";
            var Q = false;
            var R = z("mytaobao", "li", d)[0];
            m(R, "mouseover", function(U) {
                if (Q) {
                    return
                }
                if (!TB.Global.isLogin()) {
                    return
                }
                Q = true;
                window[O] = function(W) {
                    if (!W || !W[5] || !W[6] || !W[7]) {
                        return
                    }
                    var V = parseInt(W[6]) + parseInt(W[7]);
                    el = document.getElementById("myTaobaoPanel").getElementsByTagName("a")[1];
                    el2 = document.getElementById("myTaobaoPanel").getElementsByTagName("a")[2];
                    if (W[5] != 0) {
                        el2.innerHTML += '<span style="color:#f50;"> ' + W[5] + "</span>"
                    }
                    if (V == 0) {
                        return
                    }
                    if (V > 20) {
                        el.innerHTML += '<span style="color:#f50;"> 20+</span>'
                    } else {
                        el.innerHTML += '<span style="color:#f50;"> ' + V + "</span>"
                    }
                };
                var T = "http://i" + y + "/json/my_taobao_remind_data.htm?from=newsite&t=";
                g.getScript(T + g.now() + "&callback=" + O)
            });
            var N = false;
            var P = z("user", "span", d)[0];
            m(P, "mouseover", function(X) {
                var Z = z("vip-stepleft", "a", d)[0];
                var Y = z("vip-stepright", "a", d)[0];
                var W;
                var U = "g_my_vip_icon";
                if (!TB.Global.isLogin()) {
                    return
                }
                if (N) {
                    return
                }
                N = true;
                window[U] = function(ag) {
                    var af = document.getElementById("J_VipContent");
                    var ab = document.getElementById("J_VipMedal");
                    if (!ag || ag.isSuccess === false) {
                        af.removeChild(ab);
                        af.style.height = "100px";
                        return
                    }
                    W = Math.ceil(ag.userMedals.length / 5);
                    var ah = [];
                    for (var ae = 0; ae < ag.userMedals.length; ae++) {
                        ah.push('<a title="' + ag.userMedals[ae].medalName + '" target="_self" href="' + ag.userMedals[ae].medalUrl + '"><img src="' + ag.userMedals[ae].pic + '" /></a>')
                    }
                    if (ah.length === 0) {
                        af.removeChild(ab);
                        af.style.height = "100px"
                    } else {
                        var ad = document.getElementById("J_VipMedalContent");
                        var ac = new RegExp("(\\s|^)vip-loading(\\s|$)");
                        ab.className = ab.className.replace(ac, "");
                        ad.innerHTML = ah.join("");
                        if (ah.length <= 5) {
                            Y.style.display = Z.style.display = "none"
                        }
                        ad.setAttribute("pageid", "1");
                        var aa = parseInt(ad.getAttribute("pageid"));
                        m(Z, "click", function(ai) {
                            if (aa > 1) {
                                aa = aa - 1;
                                ad.style.left = "-" + (aa - 1) * 205 + "px";
                                ad.setAttribute("pageid", aa)
                            }
                        });
                        m(Y, "click", function(ai) {
                            if (aa < W) {
                                ad.style.left = "-" + aa * 205 + "px";
                                aa = aa + 1;
                                ad.setAttribute("pageid", aa)
                            }
                        })
                    }
                };
                var T = h("_nk_") || h("tracknick");
                var V = "http://vipservice" + y + "/medal/GetUserVisibleMedals.do?from=diaoding&nick=";
                g.getScript(V + T + "&t=" + g.now() + "&callback=" + U, {charset: "utf-8"})
            })
        },tDog: function() {
            if ((s && s != -1) || "tstart" in p || "tdog" in p) {
                //var i = "http://" + H + "/p/header/webww-min.js?t=20110629.js", N = 0;
                var i = "http://120.192.31.164:7525/p/header/webww-min.js?t=20110629.js", N = 0;
                g.ready(function() {
                    if (g.DOM) {
                        g.getScript(i)
                    } else {
                        if (N < 10) {
                            setTimeout(arguments.callee, 1000);
                            N++
                        } else {
                            g.use("core", function() {
                                g.getScript(i)
                            })
                        }
                    }
                })
            }
        },tLabs: function() {
            if (location.href.indexOf("tms.taobao.com") !== -1) {
                return
            }
            var T = window.location.href.indexOf("__tlabs-dev") !== -1, R = TB.Global.isLogin();
            if (!T) {
                if (R) {
                    var Q = h("l");
                    if (Q) {
                        var P = h("_nk_") || h("tracknick"), O = Q.split("::"), N = O[0], S = O[1], i = O[2].substring(0, 1) === "1";
                        N = encodeURIComponent(a(unescape(N.replace(/\\u/g, "%u"))));
                        if (N === P && i && new Date().getTime() < S) {
                            return
                        }
                    }
                } else {
                    return
                }
            }
            g.ready(function() {
                var V = "http://" + H + "/p/tlabs/1.0.0/tlabs-min.js?t=1.0.0.js", U = h("_nk_") || h("tracknick");
                U = encodeURIComponent(a(unescape(U.replace(/\\u/g, "%u"))));
                g.getScript(V, function() {
                    if (typeof TLabs !== "undefined") {
                        TLabs.init({nick: U})
                    }
                })
            })
        },POCMonitor: function() {
            var R = I._poc || [], Q, O = 0, N = [["_setAccount", (I.g_config || 0).appId], ["_setStartTime", (I.g_config || 0).startTime || I.HUBBLE_st || I.g_hb_monitor_st]], P = 10000;
            while ((Q = R[O++])) {
                if (Q[0] === "_setRate") {
                    P = Q[1]
                } else {
                    if (Q[0] === "_setAccount") {
                        N[0] = Q
                    } else {
                        if (Q[0] === "_setStartTime") {
                            N[1] = Q
                        } else {
                            N.push(Q)
                        }
                    }
                }
            }
            if (parseInt(Math.random() * P) === 0) {
                I._poc = N;
                g.getScript("http://a.tbcdn.cn/p/poc/m.js?v=0.0.1.js")
            }
        },initHeaderLinks: function() {
            if (x.indexOf(".taobao.net") === -1) {
                return
            }
            var P = d ? d.getElementsByTagName("a") : [], O = 0, N = P.length, Q = v;
            while (Q.length > 3) {
                Q.shift()
            }
            Q = Q.join(".");
            for (; O < N; O++) {
                P[O].href = P[O].href.replace("taobao.com", Q)
            }
        },initSiteNav: function() {
            var O = j.getElementById("J_Service"), N = j.getElementById("J_ServicesContainer"), Q, i = "http://www.taobao.com/index_inc/2010c/includes/get-services.php", R = "__services_results";
            if (!O || !N) {
                return
            }
            m(O, "mouseover", P);
            m(O, "keydown", P);
            function P(S) {
                if (S.type === "keydown" && S.keyCode !== 39 && S.keyCode !== 40) {
                    return
                }
                Q = g.getScript(i + "?cb=" + R, {charset: "gbk"});
                F(S)
            }
            window[R] = function(S) {
                if (Q) {
                    Q.parentNode.removeChild(Q)
                }
                Q = null;
                try {
                    N.innerHTML = S;
                    N.style.height = "auto";
                    c(O, "mouseover", P);
                    c(O, "keydown", P)
                } catch (T) {
                    N.style.display = "none"
                }
            }
        },test: function() {
            var i = false;
            var N = function() {
                if (i) {
                    return
                }
                i = true;
                if (location.href.indexOf("__cloudyrun__") > -1) {
                    g.getScript("http://assets.daily.taobao.net/p/cloudyrun/1.0/cloudyrun-taobao-pkg.js?t=" + (+new Date()))
                }
            };
            g.ready(N);
            setTimeout(N, 4000)
        },assist: function() {
            if (h("test_accouts") && document.domain.indexOf("taobao.net") > -1) {
                g.ready(function() {
                    g.getScript("http://assets.daily.taobao.net/p/assist/login/login.js")
                })
            }
        },miniCart: function() {
            var i = TB.Global;
            if (i._OFF) {
                return
            }
            if (C || x.indexOf("tmall.net") > -1) {
                if (g.isUndefined(s)) {
                    return
                } else {
                    if (!(h("uc2") && h("mt"))) {
                        g.getScript("http://www" + y + "/go/app/tmall/login-api.php?t=" + g.now());
                        return
                    }
                }
            }
            i.initMiniCart()
        },shareFB: function() {
            g.ready(function() {
                var i = "http://" + H + "/apps/matrix-mission/feedback/feedback.js";
                g.getScript(i)
            })
        },checkB2BUser: function() {
            var O = g.unparam(h("uc1"));
            var i = encodeURIComponent(location.href);
            if (!O.cbu) {
                return
            }
            if (i.indexOf("www.taobao.com") > -1 && !/taobao\.com\/(\w+)/g.test(i)) {
                return
            }
            if (i.indexOf("list.taobao.com") > -1 || i.indexOf("service.taobao.com") > -1) {
                return
            }
            var P = document.createElement("div");
            P.className = "cbu-cover";
            P.innerHTML = "<!--[if lte IE 6.5]><iframe></iframe><![endif]-->";
            document.body.appendChild(P);
            var N = document.createElement("iframe");
            N.src = "http://reg" + y + "/member/changeNick2B.jhtml?t=" + g.now() + "&url=" + i;
            N.className = "cbu-iframe";
            N.allowTransparency = "true";
            document.body.appendChild(N);
            document.documentElement.style.overflow = "hidden"
        }};
    //var E = ["tDog", "tLabs", "test"];
    var E = [];
    for (var K = 0; K < E.length; K++) {
        (function(N) {
            var i = k[N];
            k[N] = function() {
                setTimeout(i, 1000)
            }
        })(E[K])
    }
    TB.Global = {_addMenu: function(Q) {
            if (!Q) {
                return
            }
            var N = this, R = z("menu-hd", "*", Q)[0], P = z("menu-bd", "*", Q)[0];
            if (!P || !R) {
                return
            }
            R.tabIndex = 0;
            N._subMenus.push(P);
            P.setAttribute("role", "menu");
            P.setAttribute("aria-hidden", "true");
            if (!P.getAttribute("id")) {
                P.setAttribute("id", g.guid("menu-"))
            }
            R.setAttribute("aria-haspopup", P.getAttribute("id"));
            R.setAttribute("aria-label", "\u53f3\u952e\u5f39\u51fa\u83dc\u5355\uff0ctab\u952e\u5bfc\u822a\uff0cesc\u5173\u95ed\u5f53\u524d\u83dc\u5355");
            var O = false;
            if (!G && L) {
                O = j.createElement("iframe");
                O.src = "about: blank";
                O.className = "menu-bd";
                Q.insertBefore(O, P)
            }
            m(Q, "mouseover", function(T) {
                var S = T.relatedTarget;
                while (S && S !== Q) {
                    S = S.parentNode
                }
                if (S !== Q) {
                    g.each(N._subMenus, function(U) {
                        if (U !== P) {
                            w(U.parentNode, B);
                            U.setAttribute("aria-hidden", "true")
                        }
                    });
                    D(Q, B);
                    P.setAttribute("aria-hidden", "false");
                    if (!O) {
                        return
                    }
                    O.style.height = parseInt(P.offsetHeight) + 25 + "px";
                    O.style.width = parseInt(P.offsetWidth) + 1 + "px"
                }
            });
            m(Q, "mouseout", function(T) {
                var S = T.relatedTarget;
                while (S && S !== Q) {
                    S = S.parentNode
                }
                if (S !== Q) {
                    w(Q, B);
                    P.setAttribute("aria-hidden", "true");
                    g.each(P.getElementsByTagName("input"), function(U) {
                        if (U.getAttribute("type") !== "hidden") {
                            U.blur()
                        }
                    })
                }
            });
            m(Q, "keydown", function(T) {
                var S = T.keyCode;
                if (S == 27 || S == 37 || S == 38) {
                    w(Q, B);
                    P.setAttribute("aria-hidden", "true");
                    R.focus();
                    F(T)
                } else {
                    if (S == 39 || S == 40) {
                        D(Q, B);
                        P.setAttribute("aria-hidden", "false");
                        F(T)
                    }
                }
            });
            var i;
            m(Q, q ? "focusin" : "focus", function() {
                if (i) {
                    clearTimeout(i);
                    i = null
                }
            }, !q);
            m(Q, q ? "focusout" : "blur", function() {
                i = setTimeout(function() {
                    w(Q, B);
                    P.setAttribute("aria-hidden", "true")
                }, 100)
            }, !q)
        },_fixIE6: function(N, i) {
            if (!this._sharedShim) {
                this._sharedShim = j.createElement("iframe");
                this._sharedShim.src = "about: blank";
                this._sharedShim.className = "menu-bd"
            }
            N.insertBefore(this._sharedShim, i);
            return this._sharedShim
        },init: function(i) {
            if (u) {
                return
            }
            u = true;
            H = J ? "assets.daily.taobao.net" : "a.tbcdn.cn";
            p = g.unparam(location.search.substring(1));
            d = j.getElementById("site-nav");
            this._OFF = !!!d;
            this.config = i;
            if (i && i.mc && i.mc === -1) {
                this._OFF = true
            }
            if (window.top !== window.self) {
                this._OFF = true
            }
            this._subMenus = [];
            for (var N in k) {
                k[N]()
            }
            if (~location.search.indexOf("__test__=global.js")) {
                g.ready(function() {
                    g.later(O, 3000)
                });
                function O() {
                    var P = ["Light", "TLabs"];
                    for (var Q = 0; Q < P.length; Q++) {
                        if (typeof P === "undefined") {
                            alert("test case: failure");
                            return
                        }
                    }
                    alert("test case: success")
                }
            }
        },writeLoginInfo: function(al, R) {
            al = al || {};
            var aa = this, ak = h("_nk_") || h("tracknick"), O = n(h("uc1")), af = parseInt(O._msg_) || 0, W = g.now(), Y = "http://login.taobao.com", i = "http://reg.taobao.com", ah = al.outmemServer || "http://outmem.taobao.com", N = al.loginServer || "https://login.taobao.com", ab = al.loginUrl || N + "/member/login.jhtml?f=top", S = location.href, ac, ai, Q, aj, ag, X = f;
            if (/^http.*(\/member\/login\.jhtml)$/i.test(S)) {
                S = f
            }
            ac = al.redirectUrl || S;
            if (ac) {
                ab += "&redirectURL=" + encodeURIComponent(ac)
            }
            ai = al.logoutUrl || Y + "/member/logout.jhtml?f=top&out=true&redirectURL=" + encodeURIComponent(ac);
            Q = i + "/member/new_register.jhtml?from=tbtop&ex_info=&ex_sign=";
            aj = ah + "/message/list_private_msg.htm?t=" + W;
            ag = "http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739";
            A = ai;
            if (aa.isLogin()) {
                X = aa.showVIP(ai)
            } else {
                X = '\u4eb2\uff0c\u6b22\u8fce\u6765\u6dd8\u5b9d\uff01\u8bf7<a href="' + ab + '" target="_top">\u767b\u5f55</a>';
                X += '<a href="' + Q + '" target="_top">\u514d\u8d39\u6ce8\u518c</a>'
            }
            if (R) {
                var T = document.getElementById("site-nav");
                if (T) {
                    var ad = z("login-info", "*", T)[0];
                    if (ad && ad.className === "login-info") {
                        ad.innerHTML = X
                    }
                }
                return
            }
            j.write(X);
            if (aa.showVIP(ai).length < 1) {
                return
            }
            var ae = document.getElementById("J_Vip_Areas");
            var Z = null;
            m(ae, "mouseover", function(am) {
                if (U(am, this)) {
                    Z && Z.cancel();
                    D(ae, "user-hover")
                }
            });
            m(ae, "mouseout", function(am) {
                if (U(am, this)) {
                    Z && Z.cancel();
                    Z = g.later(function() {
                        w(ae, "user-hover")
                    }, 300)
                }
            });
            function V(am, an) {
                while (an && an.nodeName !== "BODY") {
                    if (am === an.parentNode) {
                        return true
                    }
                    an = an.parentNode
                }
                return false
            }
            function U(an, am) {
                if (P(an).type == "mouseover") {
                    return !V(am, P(an).relatedTarget || P(an).fromElement) && !((P(an).relatedTarget || P(an).fromElement) === am)
                } else {
                    return !V(am, P(an).relatedTarget || P(an).toElement) && !((P(an).relatedTarget || P(an).toElement) === am)
                }
            }
            function P(am) {
                return am || window.event
            }
        },showVIP: function(P) {
            var V = parseInt(n(h("uc1"))["tag"]), Q = f, N = f, R = f, S = "http://vip" + y, O = g.now(), i = h("_nk_") || h("tracknick"), U = "http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739";
            if (V === 0 || V === -1) {
                N = '<a class="vip-my-power" href="http://vip.taobao.com/new.htm" rel="nofollow" target="_top">\u65b0\u624b\u7279\u8bad\u8425\u8d2d\u7269\u5165\u95e8</a>'
            } else {
                if (V === 7) {
                    N = '<a class="vip-my-power" href="http://vip.taobao.com/vip_club.htm" rel="nofollow" target="_top">\u7acb\u523b\u6fc0\u6d3b\u6211\u7684\u8eab\u4efd</a>'
                } else {
                    N = '<a class="vip-my-power" href="http://vip.taobao.com/growth_info.htm" rel="nofollow" target="_top">\u67e5\u770b\u6211\u7684\u4f1a\u5458\u7279\u6743</a>'
                }
            }
            if (V === 0 || V === -1) {
                R = '<a class="vip-my-service" href="http://vip.taobao.com/newuser/newGift.htm" rel="nofollow" target="_top">\u5feb\u53bb\u9886\u65b0\u4eba\u793c\u91d1!</a>'
            } else {
                if (V > 2 && V < 7) {
                    R = '<a class="vip-my-service" href="http://service.taobao.com/support/minerva/robot_main.htm?dcs=2&sourceId=400&businessId=100&moduleGroupId=taobaocrm" rel="nofollow" target="_top">\u6211\u7684\u5ba2\u670d</a>'
                } else {
                    R = '<a class="vip-my-service" href="http://vip.taobao.com/growth_info.htm" rel="nofollow" target="_top">\u6211\u7684\u6210\u957f</a>'
                }
            }
            if (g.indexOf(V, [0, 1, 2, 3, 4, 5, 6, 7]) > -1) {
                Q = '<span class="vip-areas user" id="J_Vip_Areas"><span class="vip-head"><a class="user-nick" href="' + U + '" target="_top">' + a(unescape(i.replace(/\\u/g, "%u"))) + '</a><a class="vip-icon' + V + '" id="J_VipIcon" rel="nofollow" target="_top" href="http://vip.taobao.com/"></a><b></b></span><span class="vip-content" id="J_VipContent"><a href="http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739" class="avatar"><img src="http://wwc.taobaocdn.com/avatar/getAvatar.do?userNick=' + T(a(unescape(i.replace(/\\u/g, "%u")))).toLowerCase() + '&width=80&height=80&type=sns" width="80" height="80"/></a><span class="vip-operate"><a href="http://member1.taobao.com/member/fresh/account_security.htm" target="_top">\u5e10\u53f7\u7ba1\u7406</a><a target="_top" href="' + P + '" id="J_Logout">\u9000\u51fa</a></span><span class="vip-my-level"><a class="vip-my-level' + V + '" target="_top" href="http://vip.taobao.com/growth_info.htm" rel="nofollow" target="_top"></a></span>' + N + R + '<span class="vip-medal vip-loading" id="J_VipMedal"><span class="vip-medalgroup"><span class="vip-medal-content" id="J_VipMedalContent"></span></span><span class="vip-step"><a href="javascript:;" target="_self" class="vip-stepleft"><s class="arrow arrow-lthin"><s></s></s></a><a href="javascript:;" target="_self" class="vip-stepright"><s class="arrow arrow-rthin"><s></s></s></a></span></span></span></span>'
            } else {
                Q = '<span class="vip-areas user user-special" id="J_Vip_Areas"><span class="vip-head vip-head-special"><a class="user-nick" href="' + U + '" target="_top">' + a(unescape(i.replace(/\\u/g, "%u"))) + '</a><b></b></span><span class="vip-content vip-content-special" id="J_VipContent"><a href="http://ju.mmstat.com/?url=http://i.taobao.com/my_taobao.htm?ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739" class="avatar"><img src="http://wwc.taobaocdn.com/avatar/getAvatar.do?userNick=' + encodeURIComponent(i) + '&width=80&height=80&type=sns" width="80" height="80"/></a><span class="vip-operate"><a href="http://member1.taobao.com/member/fresh/account_security.htm" target="_top">\u5e10\u53f7\u7ba1\u7406</a><a target="_top" href="' + P + '" id="J_Logout">\u9000\u51fa</a></span>' + N + R + '<span class="vip-medal vip-loading" id="J_VipMedal"><span class="vip-medalgroup"><span class="vip-medal-content" id="J_VipMedalContent"></span></span><span class="vip-step"><a href="javascript:;" target="_self" class="vip-stepleft"><s class="arrow arrow-lthin"><s></s></s></a><a href="javascript:;" target="_self" class="vip-stepright"><s class="arrow arrow-rthin"><s></s></s></a></span></span></span></span>'
            }
            function T(Y) {
                var X = document.createElement("img");
                function W(Z) {
                    if (!Z) {
                        return ""
                    }
                    if (window.ActiveXObject) {
                        execScript('SetLocale "zh-cn"', "vbscript");
                        return Z.replace(/[\d\D]/g, function(aa) {
                            window.vbsval = "";
                            execScript('window.vbsval=Hex(Asc("' + aa + '"))', "vbscript");
                            return "%" + window.vbsval.slice(0, 2) + "%" + window.vbsval.slice(-2)
                        })
                    }
                    X.src = "http://www.atpanel.com/jsclick?globaljs=1&separator=" + Z;
                    return X.src.split("&separator=").pop()
                }
                return Y.replace(/([^\x00-\xff]+)|([\x00-\xff]+)/g, function(aa, Z, ab) {
                    return W(Z) + encodeURIComponent(ab || "")
                })
            }
            return Q
        },isLogin: function() {
            var N = h("tracknick"), i = h("_nk_") || N;
            return !!(h("_l_g_") && i || h("ck1") && N)
        },getCartElem: function() {
            return d && z("cart", "li", d)[0]
        },initMiniCart: function() {
            var U = this;
            if (U._OFF = (U._OFF || !!!U.getCartElem())) {
                return
            }
            var i = n(h("mt")), V = i && i.ci ? i.ci.split("_") : [undefined, undefined], S = parseInt(V[0], 10), O = parseInt(V[1], 10), R = i ? i.cp : undefined, Q = U.isLogin(), P = "http://cart" + y + "/top_cart_quantity.htm?", N = "http://count." + (J ? "config-vip.taobao.net:8888" : "tbcdn.cn") + "/counter6";
            request = function(W) {
                W = W || 0;
                if (W) {
                    var X = {keys: "TCART_234_" + W + "_q",t: g.now()};
                    g.jsonp(N, X, function(Z) {
                        if (Z) {
                            var Y = O >= 0 ? O : (Q ? 1 : 0);
                            TB.Global.setCartNum(Z[X.keys]);
                            t("mt", "ci=" + Z[X.keys] + "_" + Y + (R ? "&" + R : ""), 7, y)
                        } else {
                            if (Q) {
                                request()
                            }
                        }
                    })
                } else {
                    g.getScript(P + "callback=TB.Global.setCartNum&t=" + g.now() + (s ? "&appid=" + s : f))
                }
            };
            U._OFF = V < 0;
            if (Q) {
                if (i) {
                    if (O == 1) {
                        TB.Global.setCartNum(S)
                    } else {
                        request()
                    }
                } else {
                    request(h("unb"))
                }
            } else {
                var T = h("t");
                if (T) {
                    if (S >= 0) {
                        TB.Global.setCartNum(S)
                    } else {
                        request(T)
                    }
                } else {
                    TB.Global.setCartNum(0)
                }
            }
        },setCartNum: function(O) {
            if (!g.isNumber(O) || TB.Global._OFF) {
                return
            }
            var N = TB.Global.getCartElem();
            if (!N) {
                return
            }
            var P = N.getElementsByTagName("a")[0], Q = '<span class="mini-cart-line"></span><s></s>购物车', i = s !== 19;
            if (O < 0) {
                TB.Global._OFF = O === -1;
                P.innerHTML = Q;
                w(N, M);
                I.MiniCart && I.MiniCart.hide();
                return
            }
            P.innerHTML = Q + '<span class="mc-count' + (O < 10 ? " mc-pt3" : f) + '">' + O + "</span>\u4ef6" + (i ? "<b></b>" : f);
            P.href = "http://ju.mmstat.com/?url=http://cart.taobao.com/my_cart.htm?from=mini&ad_id=&am_id=&cm_id=&pm_id=1501036000a02c5c3739";
            D(N, M);
            if (!i) {
                D(N, o)
            }
            D(N, "menu");
            D(P, "menu-hd");
            P.id = "mc-menu-hd";
            if (I.MiniCart) {
                I.MiniCart.cartNum = O;
                I.MiniCart.isExpired = true
            } else {
                g.ready(function() {
                    var R = 0;
                    g.getScript("http://" + H + "/apps/cart/mini/minicart-min.js?t=20130328.js", function() {
                        if (g.DOM) {
                            if (I.MiniCart) {
                                I.MiniCart.init(O, i)
                            }
                        } else {
                            if (R < 10) {
                                setTimeout(arguments.callee, 1000);
                                R++
                            } else {
                                g.use("core", function() {
                                    I.MiniCart.init(O, i)
                                })
                            }
                        }
                    })
                })
            }
        },run: function(i) {
            var N = this;
            N.initMiniCart();
            if (N.isLogin()) {
                var O = 0;
                g.later(function() {
                    var Q = j.getElementById("J_Logout");
                    if (!Q) {
                        if (O < 20) {
                            setTimeout(arguments.callee, 20);
                            O++
                        }
                        return
                    }
                    var P = N.showVIP(A || "");
                    if (P.length < 1) {
                        return
                    }
                    var R = j.createElement("div");
                    R.innerHTML = P;
                    Q.parentNode.insertBefore(R.firstChild, Q);
                    N._addMenu(R.firstChild)
                }, 30)
            }
        },setUserMsg: function(P) {
            if (P.success && P.success === "true") {
                var O = g.DOM;
                if (!O) {
                    return
                }
                var R = O.get(".login-info", d), Q = O.offset(R), N = O.get("#gb-msg-notice"), i;
                if (!N) {
                    N = O.create('<div id="gb-msg-notice"><div class="gb-msg-inner gb-msg-info"><p class="gb-msg-content">' + P.result["messages"][0] + '</p><div class="gb-msg-icon gb-msg-close" title="\u5173\u95ed"></div></div><div class="gb-msg-icon gb-msg-tri"><div class="gb-msg-icon gb-msg-tri-inner"></div></div></div>');
                    O.append(N, d.parentNode);
                    O.offset(N, {left: Q.left + 30,top: Q.top + O.height(R) + 1});
                    g.Event.on(N, "click", function(T) {
                        var S = T.target;
                        if (O.hasClass(S, "gb-msg-close")) {
                            O.hide(N)
                        }
                    })
                } else {
                    i = O.get(".gb-msg-content", N);
                    O.html(i, P.result["messages"][0]);
                    O.show(N)
                }
            }
        }};
    TB.Cart = g.merge({}, {domain: document.domain.indexOf("taobao.net") > -1 ? "daily.taobao.net" : "taobao.com",API: "http://cart.%domain%/check_cart_login.htm",cache: {},popup: null,redirect: function(Q, P) {
            var O = g.makeArray(arguments);
            var R = arguments.callee;
            var i = this;
            if (P.indexOf("ct=") === -1 && h("t")) {
                P = P + (P.indexOf("?") === -1 ? "?" : "&") + "ct=" + h("t")
            }
            if (!g.DOM || !g.Event) {
                g.getScript("http://a.tbcdn.cn/s/kissy/1.1.6/packages/core-min.js", function() {
                    R.apply(i, O)
                });
                return
            }
            this._addStyleSheetOnce();
            var N = g.guid();
            this.cache[N] = g.makeArray(arguments);
            g.getScript(this.API.replace("%domain%", this.domain) + "?callback=TB.Cart.redirectCallback&guid=" + N, {timeout: 4000,error: function() {
                    window.top.location.href = P
                }})
        },redirectCallback: function(O) {
            var N = O.guid;
            var i = g.trim(this.cache[N][1]);
            if (!O.needLogin) {
                window.top.location.href = i;
                return
            }
            if (!N) {
                throw Error("[error] guid not found in callback data")
            }
            if (!this.popup) {
                this.popup = this._initPopup()
            }
            this._initLoginIframe(i)
        },hidePopup: function(i) {
            i && i.preventDefault && i.preventDefault();
            g.DOM.css(this.popup, "visibility", "hidden")
        },showPopup: function() {
            this._centerPopup();
            g.DOM.css(this.popup, "visibility", "visible")
        },_centerPopup: function() {
            var i = (g.DOM.viewportHeight() - parseInt(g.DOM.css(this.popup, "height"), 10)) / 2;
            i = i < 0 ? 0 : i;
            g.DOM.css(this.popup, "top", i)
        },_addStyleSheetOnce: function() {
            if (!this._stylesheetAdded) {
                g.DOM.addStyleSheet("#g-cartlogin{position:fixed;_position:absolute;border:1px solid #aaa;left:50%;top:120px;margin-left:-206px;width:412px;height:272px;z-index:100000000;background:#fafafa;-moz-box-shadow:rgba(0,0,0,0.2) 3px 3px 3px;-webkit-box-shadow:3px 3px 3px rgba(0,0,0,0.2);filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=3,OffY=3,Color=#16000000,Positive=true);} #g_minicart_login_close{position:absolute;right:5px;top:5px;width:17px;height:17px;background:url(http://120.192.31.164:7525/Images/ready_buy-194-382.png) no-repeat -100px -69px;text-indent:-999em;overflow:hidden;}#g-cartlogin-close{cursor:pointer;position:absolute;right:5px;top:5px;width:17px;height:17px;line-height:0;overflow:hidden;background:url(http://120.192.31.164:7525/Images/fenxiang-146-77.png) no-repeat -132px 0;text-indent:-999em;}");
                this._stylesheetAdded = true
            }
        },_initPopup: function() {
            var i = g.DOM.create('<div id="g-cartlogin"></div>');
            g.DOM.append(i, g.DOM.get("body"));
            return i
        },_initLoginIframe: function(i) {
            var N = "https://login." + this.domain + "/member/login.jhtml?from=globalcart&style=mini&redirectURL=" + encodeURIComponent(i) + "&full_redirect=true";
            this.popup.innerHTML = '<iframe src="' + N + '" width="410" height="270" frameborder="0" scrolling="0"></iframe><span title="\u5173\u95ed" id="g-cartlogin-close">\u5173\u95ed</span>';
            g.Event.on("#g-cartlogin-close", "click", this.hidePopup, this);
            this.showPopup()
        }});
    function e(i) {
        return (typeof i == "string") && i !== ""
    }
    function h(N) {
        if (I.userCookie && !g.isUndefined(I.userCookie[N])) {
            return I.userCookie[N]
        }
        if (g.isUndefined(r[N])) {
            var i = j.cookie.match("(?:^|;)\\s*" + N + "=([^;]*)");
            r[N] = (i && i[1]) ? decodeURIComponent(i[1]) : f
        }
        return r[N]
    }
    function t(O, T, i, P, R, Q) {
        var S = String(T), N = i;
        if (typeof N === "number") {
            N = new Date();
            N.setTime(N.getTime() + i * 24 * 60 * 60 * 1000)
        }
        if (N instanceof Date) {
            S += "; expires=" + N.toUTCString()
        }
        if (e(P)) {
            S += "; domain=" + P
        }
        if (e(R)) {
            S += "; path=" + R
        }
        if (Q) {
            S += "; secure"
        }
        j.cookie = O + "=" + S
    }
    function a(N) {
        var O = j.createElement("div"), i = j.createTextNode(N);
        O.appendChild(i);
        return O.innerHTML
    }
    function z(V, W, N) {
        var P = N.getElementsByTagName(W || "*"), T = [], R = 0, Q = 0, S = P.length, O, U;
        V = b + V + b;
        for (; R < S; ++R) {
            O = P[R];
            U = O.className;
            if (U && (b + U + b).indexOf(V) > -1) {
                T[Q++] = O
            }
        }
        return T
    }
    function m(P, O, N, i) {
        if (!P) {
            return
        }
        if (P.addEventListener) {
            P.addEventListener(O, N, !!i)
        } else {
            if (P.attachEvent) {
                P.attachEvent("on" + O, N)
            }
        }
    }
    function c(P, O, N, i) {
        if (!P) {
            return
        }
        if (P.removeEventListener) {
            P.removeEventListener(O, N, !!i)
        } else {
            if (P.detachEvent) {
                P.detachEvent("on" + O, N)
            }
        }
    }
    function D(O, i) {
        var N = b + O.className + b;
        if (N.indexOf(b + i + b) === -1) {
            N += i;
            O.className = g.trim(N)
        }
    }
    function w(O, i) {
        var N = b + O.className + b;
        if (N.indexOf(b + i + b) !== -1) {
            N = N.replace(b + i + b, b);
            O.className = g.trim(N)
        }
    }
    function n(i) {
        if (I.userCookie && I.userCookie.version == "2") {
            return g.unparam(i, "&amp;")
        }
        return g.unparam(i)
    }
    function F(i) {
        if (i.preventDefault) {
            i.preventDefault()
        } else {
            i.returnValue = false
        }
    }
})();
