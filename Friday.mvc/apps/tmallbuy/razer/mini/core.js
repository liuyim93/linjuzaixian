﻿
/*pub-1|2013-01-18 10:51:20*/
(function (E) {
    if (window.TMiniCart) {
        return
    }
    var C = window.TShop ? window.TShop : KISSY,
         B = window.TShop ? "tb-core" : "core";
    C.use(B, function (I) {
        KISSY.add("TMiniCartModel", function (O) {
            var W = location.hostname.indexOf(".net") != -1,
                 X = W ? "http://cart.daily.tmall.net/" : "http://cart.tmall.com/",
                 J = W ? "http://cart.daily.taobao.net/" : "http://cart.taobao.com/",
                 Q = W ? "http://count.config-vip.taobao.net:8888/" : "http://count.tbcdn.cn/",
                 P = W ? "http://assets.daily.taobao.net/" : "http://a.tbcdn.cn/",
                 X = J = Q = P = "http://localhost:7525/",
                 L = {
                     //Query_Num: Q + "counter6?keys=TCART_234_{uid}_q&t=",
                     Query_Num: Q + "Account/Home/counter?keys=TCART_234_{uid}_q&t=",
                     //LOAD_API: X + "cart/mini/trailMiniCart.htm",
                     LOAD_API: X + "CartPay/Home/Render_Cart",
                     COMMONADD_API: X + "CartPay/Home/addCartItems",
                     ADD_API: X + "cart/addCartItem.htm?itemId={itemId}&skuId={skuId}&quantity={quantity}&proId={proId}&devisionCode={devisionCode}&serverId={serverId}&tsid={tsid}&umpkey={umpkey}&_tb_token_={_tb_token_}",
                     ADDCOMBO_API: X + "cart/addCombo.htm",
                     UPDATE_API: X + "cart/mini/updateMiniCart.htm?cartId={cartId}&quantity={quantity}&{tkKey}={tkVal}",
                     //REMOVE_API: X + "cart/mini/delMiniCart.htm?cartId=",
                     REMOVE_API: X + "CartPay/Home/deleteCart?cartId=",
                     ASSETS_PATH: P + "p/mall/TMiniCart/",
                     SSS_PATH: J + "sss.htm"
                 }, K, N;
            var V = (TB && TB.Global && TB.Global.setCartNum) ? TB.Global.setCartNum : function () { };
            var R = function (S) {
                S = S - 0;
                return "number" === typeof S ? S : 0
            };
            var T;
            var U = function (Z) {
                if ("success" in Z) {
                    Z.status = Z.success;
                    var Y = Z.globalData;
                    if (O.isPlainObject(Y)) {
                        Z.sss = Y.sss;
                        Z.cartnum = Y.totalSize
                    }
                    var S = Z.error;
                    if (O.isPlainObject(S)) {
                        Z.errType = S.errCode || S.errorCode;
                        Z.errMsg = S.errMessage || S.errorMessage
                    }
                }
            };

            function M(S) {
                L = O.mix(L, S);
                this.cartNum = 0
            }
            O.augment(M, O.EventTarget, {
                init: function () {
                    var S = this;
                    var Y = setTimeout(function () {
                        S.fire("loginInit", {
                            isLogin: false
                        })
                    }, 5000);
                    var Z = setTimeout(function () {
                        S.fire("numInit", {
                            num: -1
                        })
                    }, 8000);
                    TB.Global.loginStatusReady(function (a) {
                        var b = a.isLogin || false;
                        clearTimeout(Y);
                        S.fire("loginInit", {
                            isLogin: b
                        });
                        TB.Global.memberInfoReady(function (c) {
                            clearTimeout(Z);
                            var e = c.memberInfo;
                            var d;
                            b = e.login || false;
                            if (b) {
                                d = (e.cookies && e.cookies.unb) ? e.cookies.unb.value : ""
                            }
                            d = d || c.trackId;
                            if (d) {
                                N = d
                            }
                            S.loadNum(function (f) {
                                S.fire("numInit", {
                                    num: f,
                                    isLogin: b
                                })
                            })
                        })
                    })
                },
                loadNum: function (Y) {
                    var S = this;
                    H(L.Query_Num.replace("{uid}", N), {
                        success: function (a) {
                            var Z = R(a["TCART_234_" + N + "_q"]);
                            S.cartNum = Z;
                            V(Z);
                            Y.call(S, Z)
                        },
                        error: function () {
                            S.cartNum = -1;
                            V(-1);
                            Y.call(S, -1)
                        }
                    })
                },
                load: function (Y) {
                    var S = this;
                    H(L.LOAD_API, {
                        success: function (Z) {
                            U(Z);
                            if (Y) {
                                Y.call(S, Z)
                            }
                            if (Z.status) {
                                K = Z
                            }
                            S.cartNum = R(Z.cartnum);
                            V(S.cartNum)
                        },
                        error: function () {
                            if (Y) {
                                Y.call(S, {
                                    status: false,
                                    errType: "trailCartDegr"
                                })
                            }
                        }
                    })
                },
                sss: function (S) {
                    if (O.isPlainObject(S) && S.quantity) {
                        new Image().src = L.SSS_PATH + "?quantity=" + S.quantity + "&tk=" + S.token + "&" + O.now()
                    }
                },
                commonAdd: function (a, b) {
                //debugger
                    var Y = this;
                    var S = 0;
                    if ("string" === typeof a.add) {
                        a.ify = 1
                    } else {
                        a.add = O.JSON.stringify(a.add)
                    }
                    var Z = function () {
                        if (T) {
                            a._tb_token_ = T
                        }
                        H(L.COMMONADD_API + "?" + O.param(a) + (S > 0 ? ("&retry=" + S) : ""), {
                            success: function (c) {
                                if ("CsrfCheckFail" === c.errorCode && c.tk && S < 1) {
                                    S++;
                                    T = c.tk;
                                    return Z()
                                }
                                b.call(Y, c);
                                if (c.success) {
                                    Y.sss(O.JSON.parse(c.sss));
                                    Y.fire("addSuccess", {
                                        repeat: c.repeat || false,
                                        cartnum: c.cartNum
                                    });
                                    if (c.cartNum) {
                                        Y.cartNum = R(c.cartNum);
                                        V(Y.cartNum)
                                    }
                                }
                            },
                            error: function () {
                                b.call(Y, {
                                    //error: "\u670d\u52a1\u5668\u54cd\u5e94\u8d85\u65f6"
                                    error: "\u60A8\u5C1A\u672A\u767B\u5F55\uFF0C\u8BF7\u767B\u5F55\u540E\u518D\u8BD5\uFF01"
                                })
                            }
                        })
                    };
                    Z()
                },
                add: function (a, c) {
                    var Y = this,
                         b = {
                             itemId: a.itemId,
                             skuId: a.skuId || "",
                             quantity: a.quantity || 1,
                             proId: a.proId || "",
                             devisionCode: a.devisionCode || "",
                             serverId: a.serverId || "",
                             tsid: a.tsid || "",
                             umpkey: a.umpkey || "",
                             _tb_token_: a._tb_token_ || "notoken"
                         };
                    var S = 0;
                    var Z = function () {
                        if (T) {
                            b._tb_token_ = T
                        }
                        H(O.substitute(L.ADD_API, b) + (S > 0 ? ("&retry=" + S) : ""), {
                            success: function (d) {
                                if ("CsrfCheckFail" === d.errorCode && d.tk && S < 1) {
                                    S++;
                                    T = d.tk;
                                    return Z()
                                }
                                c.call(Y, d);
                                if (!d.error) {
                                    Y.sss(d.sss);
                                    Y.fire("addSuccess", {
                                        repeat: d.repeat || false,
                                        cartnum: d.cartnum
                                    });
                                    if (d.cartnum) {
                                        Y.cartNum = R(d.cartnum);
                                        V(Y.cartNum)
                                    }
                                }
                            },
                            error: function () {
                                c.call(Y, {
                                    error: "\u7cfb\u7edf\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5"
                                })
                            }
                        })
                    };
                    Z()
                },
                addCombo: function (a, b) {
                    var Y = this;
                    var S = 0;
                    var Z = function () {
                        if (T) {
                            a._tb_token_ = T
                        }
                        H(L.ADDCOMBO_API + "?" + O.param(a) + (S > 0 ? ("&retry=" + S) : ""), {
                            success: function (c) {
                                if ("CsrfCheckFail" === c.errorCode && c.tk && S < 1) {
                                    S++;
                                    T = c.tk;
                                    return Z()
                                }
                                b.call(Y, c);
                                if (c.success) {
                                    Y.sss(c.sss);
                                    Y.fire("addSuccess", {
                                        repeat: c.repeat || false,
                                        cartnum: c.cartnum
                                    });
                                    if (c.cartnum) {
                                        Y.cartNum = R(c.cartnum);
                                        V(Y.cartNum)
                                    }
                                }
                            },
                            error: function () {
                                b.call(Y, {
                                    error: "\u670d\u52a1\u5668\u54cd\u5e94\u8d85\u65f6"
                                })
                            }
                        })
                    };
                    Z()
                },
                update: function (Z, a) {
                    var S = this,
                         Y = {
                             cartId: Z.cartId,
                             quantity: Z.quantity,
                             tkKey: Z.tk[0] || "now",
                             tkVal: Z.tk[1] || O.now()
                         };
                    H(O.substitute(L.UPDATE_API, Y), function (b) {
                        U(b);
                        a.call(S, b)
                    })
                },
                remove: function (a, Z, b) {
                    var Y = this,
                         S = {};
                    S = {
                        url: L.REMOVE_API + a.join(","),
                        data: {},
                        dataType: "jsonp",
                        success: function (c) {
                            U(c);
                            Y.sss(c.sss);
                            Y.cartNum = Math.max(0, Y.cartNum - a.length);
                            c.cartnum = Y.cartNum;
                            V(Y.cartNum);
                            b.call(Y, c)
                        }
                    };
                    if (Z) {
                        S.data[Z[0]] = Z[1]
                    }
                    O.io(S)
                }
            });
            O.TMiniCartModel = M;
            return M
        });
        KISSY.add("TMiniCartView", function (w) {
            var AG = w.DOM,
                 n = w.Event,
                 y = w.Cookie,
                 a, AH = window,
                 e = document,
                 T, AS = w.Node,
                 Af = KISSY.UA.ie,
                 l = (Af == 6 ? true : false),
                 AC, u = location.hostname.indexOf(".net") > -1,
            //Ak = u ? "http://cart.daily.tmall.net/" : "http://cart.tmall.com/",
            //AQ = Ak + "cart/myCart.htm",
                Ak = "http://localhost:7525/",
                AQ = Ak + "CartPay/Home/MyCartPay",
                AT = u ? "{app}.daily.tmall.net" : "{app}.tmall.com",
            //d = u ? "http://cart.daily.taobao.net/" : "http://cart.taobao.com/",
                d = "http://localhost:7525/",
            //AJ = d + "my_cart.htm",
                AJ = d + "CartPay/Home/MyCartPay",
                 //AE = u ? "http://buy.daily.tmall.net/order/confirm_order.htm?from=mini&use_cod=false&_input_charset=UTF-8" : "http://buy.tmall.com/order/confirm_order.htm?from=mini&use_cod=false&_input_charset=UTF-8",
                 AR = AG.viewportHeight(e),
                 W, Ac, J, r, P, AK, t, Aa, AU, j, U, AP, AW, k, Ad, z, AN, Z = false,
                 Al = false,
                 Aj = false,
                 b = 62,
                 Y = 283,
                 AZ = false,
                 O, AF, AO, Q, AA;

            function AI(S) {
                AG.width(W, S);
                AG.css(U, "display", S === Y ? "block" : "none")
            }

            function Ag(An) {
                T = document.body;
                AA = w.mix({
                    El: "#J_TMiniCart",
                    handlerEl: ".tmMCHandler",
                    hdEl: ".tmMCHd",
                    bodyEl: ".tmMCBody",
                    conEl: ".tmMCCon",
                    groupEl: ".tmMCGroup",
                    groupPriceEl: ".tmMCGroupPrice",
                    groupCheckEl: ".tmMCGroupCheck",
                    allCheckEl: ".tmMCAllCheck",
                    itemEl: ".tmMCItem",
                    itemCheckEl: ".tmMCItemCheck",
                    itemPriceEl: ".tmMCItemPrice",
                    itemNumEl: ".tmMCItemQtyNum",
                    itemMinEl: ".tmMCItemMin",
                    itemAddEl: ".tmMCItemAdd",
                    numEl: ".tmMCNum",
                    priceEl: ".tmMCPrice",
                    goCheckEl: ".tmMCGo",
                    uncheckItems: "uncheckItems",
                    tmMCViewBtn: ".tmMCViewFull",
                    tmMCViewIcon: ".tmMCViewIcon",
                    loadingEl: ".tmMCLoading",
                    tmMCTipEl: ".tmMCTip",
                    ie6Iframe: ".tmMCIframe"
                }, An);
                var S = '<div class="tmMC" id="J_TMiniCart"><div class="tmMCHandler"><div class="tmMCTopBorder"></div><div class="tmMCBody"><div class="tmMCLoading">正在加载…</div><div class="tmMCCon"></div></div>' + (l ? "<div></div>" : "") + '<span class="tmMCBotLink"><span class="tmMCNum">0</span></span><div class="tmMCHdLeft"><a class="tmMCBotLink" title="\u67e5\u770b\u8d2d\u7269\u8f66" href="' + AQ + '?from=botlink" target="_blank"><span class="tmMCNum">0</span></a><span class="tmMCEx"></span></div></div><form method="POST" id="tmMCOrderForm"><input id="tmMCCartIds" type="hidden" name="cartId"/><input id="tmMCDelCartIds" type="hidden" name="delCartIds"/><input type="hidden" name="needMerge"/></form></div>';

                function Ap(Aq, At) {
                    function Ar() {
                        w.onTgalleryReady(Aq, At)
                    }
                    var As = location.hostname.indexOf(".daily.") > -1 ? "assets.daily.taobao.net" : "a.tbcdn.cn";
                    w.configTgallery = {
                        tag: "20121028",
                        path: "http://" + As + "/apps/"
                    };
                    //w.onTgalleryReady ? Ar() : w.getScript(w.configTgallery.path + "tmall/common/tgallery.js?t=" + w.configTgallery.tag, Ar)
                    w.onTgalleryReady ? Ar() : w.getScript("http://localhost:7525/apps/tmall/common/tgallery.js?t=" + w.configTgallery.tag, Ar)
                }
                var Ao = AG.create(S);
                Ap("tgallery/tmall/common/bottombar", function (Aq, Ar) {
                    Ar.add(Ao, {
                        order: 50
                    })
                });
                W = Ao;
                Ac = AG.get(AA.handlerEl, W);
                j = AG.get(AA.bodyEl, W);
                U = AG.get("div.tmMCTopBorder", W);
                J = AG.get(AA.conEl, W);
                r = AG.get(AA.footerEl, W);
                P = AG.query(AA.numEl, W);
                AP = AG.get(AA.goCheckEl, W);
                AW = AG.get(AA.loadingEl, W);
                Ad = AG.get(AA.tmMCViewIcon, W);
                if (l) {
                    ie6Iframe = AG.get(AA.ie6Iframe, W)
                }
                AO = false;
                AF = w.Anim(j, {
                    top: "-4px"
                }, 0.5, "easeOut", function () {
                    AA.onCustomEvent.fire(AA.EVT_ONSTOP)
                });
                O = w.Anim(j, {
                    top: "-40px"
                }, 0.5, "easeOut", function () {
                    if (!AO) {
                        AF.run()
                    }
                    AO = false
                }, false);
                Q = [w.substitute(AT, {
                    app: "vip"
                })]
            }
            w.augment(Ag, {
                bindModel: function (An) {
                    var S = this;
                    a = An;
                    a.on("loginInit", function (Ao) {
                        if (!Ao.isLogin) {
                            AG.addClass(Ac, "unlogin")
                        } else {
                            Al = true
                        }
                        S.bindEvent()
                    });
                    a.on("numInit", function (Ap) {
                        var Ao = Ap.hideNum ? "" : parseInt(Ap.num, 10);
                        AG.html(P, (Ao > 0 ? ("购物车 " + Ao) : (0 > Ao ? "购物车" : "0")));
                        if (0 != Ao) {
                            AG.addClass(Ac, "HdlOpen");
                            AG.addClass(Ac, "HdlShort");
                            AG.css(j, "display", "none");
                            AI(Y)
                        }
                        if (0 > Ao) {
                            AG.addClass(W, "tmMCErr")
                        }
                        AA.onCustomEvent.fire("cartReady", {
                            num: Ao
                        })
                    });
                    a.on("addSuccess", function (Ao) {
                        if (Z) {
                            Ae()
                        } else {
                            TShop.mods.SKU.basketAnim.onstop(function () {
                                if (!AO) {
                                    O.run();
                                    AO = false
                                }
                            });
                            o(Ao.cartnum);
                            AD()
                        }
                    })
                },
                bindEvent: function () {
                    var S = this;
                    n.on(Ac, "click", function () {
                        AH.TStart && TStart.closePanel && TStart.closePanel();
                        if (AZ || AG.hasClass(W, "tmMCErr")) {
                            return window.open(AQ, "_blank")
                        }
                        m();
                        x();
                        if (AG.hasClass(this, "unlogin") && P[0].innerHTML == 0) {
                            D(function (Ao) {
                                Ao.show(function () {
                                    if (TB && TB.Global && TB.Global.writeLoginInfo) {
                                        TB._isMemberInfoReady = false;
                                        TB._isLoginStatusReady = false;
                                        TB.Global.writeLoginInfo()
                                    }
                                    if (!Al && w.inArray(location.host, Q)) {
                                        location.reload();
                                        return false
                                    }
                                    AG.addClass(Ac, "HdlOpen");
                                    AI(Y);
                                    AG.removeClass(Ac, "unlogin");
                                    AG.attr(Ac, "title", "");
                                    Al = true;
                                    AB("handle", "&action=open");
                                    Z = true;
                                    Ae()
                                })
                            });
                            return false
                        }
                        if (!Z) {
                            S.stretchMyCart();
                            if (P[0].innerHTML != 0) { }
                        } else {
                            N(true)
                        }
                        x()
                    });
                    n.on(Ac, "mouseenter", function () {
                        if (AG.hasClass(this, "unlogin") && P[0].innerHTML == 0) {
                            AG.addClass(this, "unlogin_hover");
                            AG.attr(this, "title", "\u767b\u5f55\u8d2d\u7269\u8f66")
                        }
                    });
                    n.on(Ac, "mouseleave", function () {
                        AG.removeClass(this, "unlogin_hover")
                    });
                    n.on(AG.query("a.tmMCBotLink", W), "click", function (Ao) {
                        this.blur();
                        AB("botlink");
                        Ao.stopPropagation()
                    });
                    n.on(J, "click", function (Ar) {
                        var As = Ar.target,
                             At = As.className;
                        if (At == "tmMCItemAdd" || At == "tmMCItemMin") {
                            var Aw = Ah(As),
                                 Av = f(Aw);
                            S.updateQuantity(Aw, At, As)
                        } else {
                            if (AG.hasClass(As, "tmMCAllCheck")) {
                                var Aq = AG.query(AA.groupCheckEl, W);
                                setTimeout(function () {
                                    w.each(Aq, function (Ay) {
                                        Ay.checked = As.checked;
                                        var Az = f(Ay);
                                        var Ax = AG.query(AA.itemCheckEl, Az);
                                        setTimeout(function () {
                                            w.each(Ax, function (A1) {
                                                A1.checked = Ay.checked;
                                                var A0 = Ah(A1);
                                                AG.removeClass(A0, "tmMCUncheck");
                                                if (!Ay.checked) {
                                                    AG.addClass(A0, "tmMCUncheck")
                                                }
                                            });
                                            R()
                                        }, 200)
                                    })
                                }, 200)
                            } else {
                                if (AG.hasClass(As, "tmMCGroupCheck")) {
                                    var Av = f(As);
                                    var Ap = AG.query(AA.itemCheckEl, Av);
                                    setTimeout(function () {
                                        w.each(Ap, function (Ax) {
                                            Ax.checked = As.checked;
                                            var Ay = Ah(Ax);
                                            AG.removeClass(Ay, "tmMCUncheck");
                                            if (!As.checked) {
                                                AG.addClass(Ay, "tmMCUncheck")
                                            }
                                        });
                                        R()
                                    }, 200)
                                } else {
                                    if (AG.hasClass(As, "tmMCItemCheck")) {
                                        var Aw = Ah(As),
                                             Av = f(Aw);
                                        As.checked ? AG.removeClass(Aw, "tmMCUncheck") : AG.addClass(Aw, "tmMCUncheck");
                                        R()
                                    } else {
                                        if (AG.hasClass(As, "tmMCItemDel")) {
                                            var Aw = Ah(As),
                                                 Av = f(Aw);
                                            S.removeItem(Aw);
                                            return false
                                        } else {
                                            if (AG.hasClass(As, "tmMCGroupDel")) {
                                                var Av = f(As);
                                                S.removeItem(AG.query(AA.itemEl, f(As)));
                                                return false
                                            } else {
                                                if (AG.hasClass(As, "tmMCViewAll")) {
                                                    AB("viewAll");
                                                    D(function (Ax) {
                                                        Ax.show(function () {
                                                            if (!Al && w.inArray(location.host, Q)) {
                                                                location.reload();
                                                                return false
                                                            }
                                                            AG.removeClass(Ac, "unlogin");
                                                            Al = true;
                                                            Ae()
                                                        })
                                                    });
                                                    return false
                                                } else {
                                                    if (AG.hasClass(As, "tmMCViewFull")) {
                                                        var Ao = AG.attr(As, "href"),
                                                             Au = Ao.indexOf("from=upViewAll") !== -1;
                                                        As.blur();
                                                        if (Au) {
                                                            AB("upViewAll")
                                                        } else {
                                                            AB("viewbutton")
                                                        }
                                                    } else {
                                                        if (AG.hasClass(As, "tmMCLose")) {
                                                            AB("viewinvalid")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        Ar.stopPropagation()
                    });
                    n.on(W, "click", function (Ao) {
                        Ao.halt(true)
                    });

                    function An(Ar, Aq) {
                        var Ao = AG.height(Ar),
                             Ap = Ar.scrollHeight,
                             As;
                        if (Aq.wheelDelta) {
                            As = Aq.wheelDelta / 120
                        }
                        if (Aq.detail) {
                            As = -Aq.detail / 3
                        }
                        if (AG.css(Ar, "overflowY") == "scroll" && ((Ar.scrollTop == (Ap - Ao - 4) && As < 0) || (Ar.scrollTop == 0 && As > 0))) {
                            Aq.halt(true)
                        }
                    }
                    if (w.UA.gecko) {
                        n.on(J, "DOMMouseScroll", function (Ao) {
                            An(this, Ao)
                        })
                    } else {
                        n.on(J, "mousewheel", function (Ao) {
                            An(this, Ao)
                        })
                    }
                    n.on(AH, "resize", function (Ao) {
                        AR = AG.viewportHeight();
                        if (Z) {
                            !!!w.UA.ie ? p() : setTimeout(function () {
                                p()
                            }, 0)
                        }
                    });
                    n.on(T, "click", function (Ap) {
                        var Ao = Ap.target;
                        if (AG.hasClass(Ao, "tb-act")) {
                            return
                        }
                        if (AG.hasClass(Ao, "j_CloseTips")) {
                            return
                        }
                        if (AG.parent(Ao, ".j_TMMCGuide")) {
                            return
                        }
                        if (!AG.hasClass(Ac, "HdlOpen")) {
                            return
                        }
                        if (Z) {
                            N()
                        }
                    })
                },
                stretchMyCart: function () {
                    var An;
                    G("mini\u8d2d\u7269\u8f66-->\u5c55\u5f00");
                    AB("handle", "&action=open");
                    Z = true;
                    AG.addClass(Ac, "HdlOpen");
                    AI(Y);
                    if (AG.hasClass(Ac, "HdlShort")) {
                        AG.removeClass(Ac, "HdlShort");
                        AG.css(j, "top", -4);
                        AG.css(j, "display", "block");
                        var S = AG.height(j);
                        An = w.Anim(j, {
                            top: -S - 10 + "px"
                        }, 0.2, "easeOut", function () {
                            if (!AZ) {
                                Ae()
                            }
                        }, false);
                        An.run()
                    } else {
                        Ae(function () {
                            var Ao = AG.height(j);
                            AG.css(j, "top", -4);
                            AG.css(j, "display", "block");
                            An = w.Anim(j, {
                                top: -Ao - 10 + "px"
                            }, 0.2, "easeOut");
                            An.run()
                        })
                    }
                },
                updateQuantity: function (As, Ao, Aq) {
                    if (!As) {
                        return
                    }
                    var S = (Ao == "tmMCItemAdd" ? "add" : "minus");
                    var Ar = AG.get(AA.itemNumEl, As),
                         Ap = parseInt(Ar.innerHTML);
                    if (S == "add") {
                        var An = Ap + 1;
                        AG.addClass(Aq, ".disableAdd")
                    } else {
                        var An = Ap - 1;
                        AG.addClass(Aq, ".disableMin")
                    }
                    var At = AG.attr(As, "data-cartId");
                    a.update({
                        cartId: At,
                        quantity: An,
                        tk: AC
                    }, function (Au) {
                        if (Au.errMsg) {
                            G(Au.errMsg);
                            return false
                        }
                        Ar.innerHTML = Au.num;
                        s(As, Au.num, Au.inventory);
                        if (S == "add") {
                            AG.removeClass(Aq, ".disableAdd")
                        } else {
                            AG.removeClass(Aq, ".disableMin")
                        }
                    })
                },
                removeItem: function (Ar, As) {
                    var Ao = this;
                    var Aq = [];
                    Ar = w.isArray(Ar) ? Ar : [Ar];
                    w.each(Ar, function (At) {
                        Aq.push(AG.attr(At, "data-cartId"))
                    });
                    var Ap = f(Ar[0]),
                         An = AG.query(AA.itemEl, Ap);
                    var S = function (At) {
                        if (AG.query("div.tmMCItem", AA.El).length <= 2) {
                            AG.hide("span.tmMCAllCheckWp")
                        }
                        p();
                        At && o(At.cartnum)
                    };
                    a.remove(Aq, AC, function (Au) {
                        if (false === Au.status) {
                            return
                        }
                        if (An.length === Aq.length) {
                            AS(Ap).fadeOut(0.2, function () {
                                AG.remove(Ap);
                                S(Au)
                            })
                        } else {
                            var At = function () {
                                if (Ar.length === 0) {
                                    S(Au)
                                }
                                var Av = AS(Ar.shift());
                                Av.fadeOut(0.2, function () {
                                    Av.remove();
                                    At()
                                })
                            };
                            At()
                        }
                    })
                },
                getEl: function () {
                    return W
                }
            });

            function p() {
                AG.height(J, "auto");
                var Ap = AR - 150 - 32 - 18,
                     An = AG.height(J);
                if (An < Ap) {
                    AG.height(J, An);
                    AG.css(J, "overflowY", "hidden")
                } else {
                    An = Ap;
                    AG.height(J, Ap + 22);
                    AG.css(J, "overflowY", "scroll")
                }
                var S = AG.height(j),
                     Ao = -S - 10;
                AG.css(j, "top", Ao);
                if (l) {
                    AG.css(ie6Iframe, {
                        height: S + 20
                    })
                }
            }

            function m() {
                O.stop();
                AF.stop();
                AO = true;
                AA.onCustomEvent.fire(AA.EVT_ONSTOP)
            }

            function Ai() {
                Aa = AG.query(AA.itemEl, W);
                n.on(Aa, "mouseenter mouseleave", function () {
                    if (AG.hasClass(this, "hover")) {
                        AG.removeClass(this, "hover")
                    } else {
                        AG.addClass(this, "hover")
                    }
                })
            }

            function AX() {
                groupEl = AG.query(AA.groupEl, W);
                n.on(groupEl, "mouseenter mouseleave", function () {
                    if (AG.hasClass(this, "chover")) {
                        AG.removeClass(this, "chover")
                    } else {
                        AG.addClass(this, "chover")
                    }
                })
            }

            function Ae(Ap) {
                var S = this,
                     Ao = setTimeout(function () {
                         L(true);
                         p()
                     }, 1000);
                if (!Aj) {
                    L(true);
                    p()
                }
                var An = +(new Date());
                a.load(function (Aq) {
                    if ((+(new Date()) - An) < 1000 || l) {
                        if (Ao) {
                            clearTimeout(Ao)
                        }
                    }
                    if ("BUYER_IS_NULL" === Aq.errType) {
                        AG.addClass(Ac, "unlogin");
                        try {
                            Ac.click()
                        } catch (Ar) { }
                        return
                    }
                    if (Aq.status || (Aq.errType == "trailCartDegr")) {
                        if ((Aq.errType == "trailCartDegr")) {
                            AZ = true
                        }
                        h(Aq);
                        Ai();
                        AX();
                        AG.removeClass(AP, "cannotCheck");
                        L(false);
                        if (Z || (!Aj && !Z)) {
                            p();
                            Z = true
                        }
                        Aj = true;
                        if (Ap) {
                            Ap.call(S)
                        }
                    } else {
                        if (Aq.errMsg) {
                            alert(Aq.errMsg)
                        }
                        AG.hide(W);
                        setTimeout(function () {
                            AG.css(j, "display", "none");
                            AG.removeClass(Ac, "HdlOpen");
                            AG.html(P, 0);
                            AI(b);
                            AG.show(W);
                            p()
                        }, 0);
                        Z = false
                    }
                })
            }

            function R() {
                var S = AG.query(AA.itemCheckEl, W),
                     An = [];
                w.each(S, function (Ao) {
                    var Ap = Ah(Ao);
                    if (Ao.checked === false) {
                        An.push(AG.attr(Ap, "data-cartId"))
                    }
                });
                y.set(AA.uncheckItems, An.join(","))
            }

            function h(Ao) {
                if (Ao.status) {
                    if (Ao.groups) {
                        AC = Ao.tk || [];
                        var An = Ao.cartnum;
                        var S = c(Ao.groups, An, Ao.invalidnum, Ao.showTip)
                    } else {
                        var Ap = Ao.globalData;
                        var An = Ap.totalSize;
                        var S = c(Ao.list, An, Ap.invalidSize);
                        AC = Ap.tk || []
                    }
                    AG.html(P, (An > 0 ? ("\u8d2d\u7269\u8f66 " + An) : 0))
                } else {
                    var S = '<div class="tmMCBusy"><a class="tmMCViewFull" target="_blank" href="' + AQ + '"></a></div>'
                }
                J.innerHTML = S
            }

            function c(An, Ao, As, Ar) {
                An = An || [];
                var Aq = 0,
                     S = An.length,
                     Ap = "";
                if (Ao - As > 2) {
                    Ap += '<span class="tmMCAllCheckWp">';
                    Ap += '<a class="tmMCViewFull" target="_blank" href="' + AQ + '?from=upViewAll"></a>';
                    Ap += "</span>"
                }
                for (Aq; Aq < S; Aq++) {
                    Ap += AL(An[Aq])
                }
                if (!Al) {
                    Ap += '<div class="tmMCBtnArea"><a class="tmMCViewAll" href="javascript:;"></a></div>'
                }
                if (Al) {
                    Ap += '<div class="tmMCBtnArea">';
                    if (!!As) {
                        Ap += '<a class="tmMCLose" target="_blank" href="' + AQ + '">\u5931\u6548\u5546\u54c1(' + As + ")</a>"
                    }
                    Ap += '<a class="tmMCViewFull" target="_blank" href="' + AQ + '?from=viewbutton"></a>';
                    Ap += "</div>"
                }
                Ap += "</div>";
                return Ap
            }

            function v(S) {
                return ((S - 0) / 100).toFixed(2)
            }

            function X(An) {
                var S = "";
                if (An.isValid && w.isArray(An.bundles) && An.bundles.length) {
                    var Ao = "combo" === An.type;
                    S += '<div class="tmMCGroup' + (Ao ? " combo" : "") + '"><div class="tmMCGroupTitle"><label title="' + An.title + '" class="tmMCGroupName">' + An.title + "</label>" + (Ao ? ('<a class="tmMCGroupDel"' + (l ? ' href="javascript:void(0)"' : "") + "></a>") : "") + '</div><div class="tmMCItemWp">';
                    w.each(An.bundles, function (A0) {
                        var Aq = A0.orders;
                        for (var Ar = 0, Av = Aq.length; Ar < Av; Ar++) {
                            var Ax = Aq[Ar];
                            if (!Ax.isValid) {
                                continue
                            }
                            var As = Ax.amount.now;
                            var At = v(Ax.price.now);
                            var Au = Ax.skus;
                            var Az = 0;
                            var Ay = "";
                            for (var Aw in Au) {
                                if (Az > 1) {
                                    break
                                }
                                var Ap = Au[Aw];
                                Ay += '<span class="tmMCItemSku" title="' + Ap + '">' + Ap + "</span>";
                                Az++
                            }
                            S += '<div class="tmMCItem" id="cartItem-' + Ax.cartId + '" data-cartId="' + Ax.cartId + '" data-price="' + At + '" data-num="' + As + '"><a target="_blank" href="' + Ax.url + '" title="' + i(Ax.title) + '" class="tmMCItemImg"><img src="' + Ax.pic + '" alt="' + i(Ax.title) + '" width="50" height="50"/></a><div class="tmMCItemskuWp">' + Ay + '</div><span class="tmMCItemPrice">' + At + "</span>" + (l ? "<div></div>" : "") + (Ao ? "" : '<a class="tmMCItemDel"' + (l ? ' href="javascript:void(0);"' : "") + "></a>") + "</div>"
                        }
                    });
                    return S + "</div></div>"
                }
                return S
            }

            function AL(Ar) {
                if (Ar.bundles) {
                    return X(Ar)
                }
                var Ap = "";
                var An = Ar.items;
                var Ao = w.guid("cart");
                var S = y.get(AA.uncheckItems) ? y.get(AA.uncheckItems).split(",") : [];
                if (Ar.valid) {
                    var Aq = false;
                    w.each(An, function (At) {
                        if (w.inArray(At.cartId, S)) {
                            Aq = true
                        }
                    });
                    var As = Ar.name || Ar.shopName;
                    if (Ar.type) {
                        Ap += '<div class="tmMCGroup ' + Ar.type + '"><div class="tmMCGroupTitle"><label title="' + As + '" class="tmMCGroupName" for="group_id_' + (Ar.proId || Ao) + '">' + As + '</label><a class="tmMCGroupDel"' + (l ? ' href="javascript:void(0);"' : "") + "></a></div>"
                    } else {
                        Ap += '<div class="tmMCGroup"><div class="tmMCGroupTitle"><label title="' + As + '" class="tmMCGroupName" for="group_id_' + (Ar.proId || Ao) + '">' + As + "</label></div>"
                    }
                    Ap += Am(An);
                    Ap += "</div>"
                }
                return Ap
            }

            function Am(Ao) {
                var Aq = '<div class="tmMCItemWp">',
                     S = Ao.length,
                     Ap = 0,
                     An = y.get(AA.uncheckItems) ? y.get(AA.uncheckItems).split(",") : [];
                for (Ap; Ap < S; Ap++) {
                    var Ar = Ao[Ap];
                    if (Ar.valid) {
                        var As = w.inArray(Ar.cartId, An);
                        if (Ar.cbId) {
                            Aq += '<div class="tmMCItem' + (As ? " tmMCUncheck" : "") + '" id="cartItem-' + Ar.cartId + '" data-cartId="' + Ar.cartId + '" data-cbid="' + Ar.cbId + '" data-price="' + Ar.price + '" data-num="' + Ar.num + '"><a target="_blank" href="' + Ar.itemUrl + '" title="' + i(Ar.title) + '" class="tmMCItemImg"><img src="' + Ar.picUrl + '" alt="' + i(Ar.title) + '" width="50" height="50"/></a><div class="tmMCItemskuWp"><span class="tmMCItemSku" title="' + (Ar.sku[0] ? Ar.sku[0] : "") + '">' + (Ar.sku[0] ? Ar.sku[0] : "") + '</span><span class="tmMCItemSku" title="' + (Ar.sku[1] ? Ar.sku[1] : "") + '">' + (Ar.sku[1] ? Ar.sku[1] : "") + '</span></div><span class="tmMCItemPrice">' + Ar.price + "</span>" + (l ? "<div></div>" : "") + "</div>"
                        } else {
                            Aq += '<div class="tmMCItem' + (As ? " tmMCUncheck" : "") + '" id="cartItem-' + Ar.cartId + '" data-cartId="' + Ar.cartId + '" data-price="' + Ar.price + '" data-num="' + Ar.num + '"><a target="_blank" href="' + Ar.itemUrl + '" title="' + i(Ar.title) + '" class="tmMCItemImg"><img src="' + Ar.picUrl + '" alt="' + i(Ar.title) + '" width="50" height="50"/></a><div class="tmMCItemskuWp"><span class="tmMCItemSku" title="' + (Ar.sku[0] ? Ar.sku[0] : "") + '">' + (Ar.sku[0] ? Ar.sku[0] : "") + '</span><span class="tmMCItemSku" title="' + (Ar.sku[1] ? Ar.sku[1] : "") + '">' + (Ar.sku[1] ? Ar.sku[1] : "") + '</span></div><span class="tmMCItemPrice">' + Ar.price + "</span>" + (l ? "<div></div>" : "") + '<a class="tmMCItemDel"' + (l ? ' href="javascript:void(0);"' : "") + "></a></div>"
                        }
                    }
                }
                Aq += "</div>";
                return Aq
            }

            function Ab(Ao) {
                var An = document.createElement("div");
                (An.textContent != null) ? (An.textContent = Ao) : (An.innerText = Ao);
                var S = An.innerHTML;
                An = null;
                return S
            }

            function i(Ao) {
                var An = document.createElement("div");
                An.innerHTML = Ao;
                var S = An.innerText || An.textContent;
                An = null;
                return S
            }

            function Ah(S) {
                if (AG.hasClass(AG.parent(S), "tmMCItem")) {
                    return AG.parent(S)
                } else {
                    return Ah(AG.parent(S))
                }
            }

            function g(Ao) {
                var S = AG.get(AA.itemNumEl, Ao),
                     Ap = AG.attr(Ao, "data-price"),
                     An = parseInt(S.innerHTML),
                     Aq = (An * Ap).toFixed(2);
                AG.get(AA.itemPriceEl, Ao).innerHTML = Aq;
                return Aq
            }

            function s(An, S, Aq) {
                var Ap = AG.get(AA.itemAddEl, An),
                     Ao = AG.get(AA.itemMinEl, An);
                AG.removeClass(Ao, "disableMin");
                AG.removeClass(Ap, "disableAdd");
                if (parseInt(S) <= 1) {
                    AG.addClass(Ao, "disableMin")
                }
                if (S >= Aq) {
                    AG.addClass(Ap, "disableAdd")
                }
            }

            function f(S) {
                return AG.parent(S, ".tmMCGroup")
            }

            function V() { }

            function AV() {
                AG.removeClass(Ac, "HdlOpen");
                AI(b);
                AG.show(W);
                AG.css(j, "display", "none");
                AG.css(P[0], "visibility", "visible")
            }

            function AM() {
                return AG.hasClass(Ac, "HdlOpen")
            }

            function o(S) {
                S = S - 0;
                if (isNaN(S)) {
                    return -1
                }
                S = S > 0 ? S : 0;
                var An = S == 0;
                AG.html(P, An ? "0" : ("\u8d2d\u7269\u8f66" + S));
                if (An) {
                    AG.hide(W);
                    AG.css(P[0], "visibility", "hidden");
                    setTimeout(function () {
                        AV()
                    }, 0);
                    Z = false
                }
                return S
            }

            function q() {
                var An = 0,
                     S = AG.get(AA.El);
                w.each(AG.query(AA.groupEl, S), function (Aq, Ap) {
                    var Ao = AG.get(AA.groupPriceEl, Aq);
                    An += parseFloat(Ao.innerHTML)
                });
                An = An.toFixed(2);
                return An
            }

            function AD() {
                if (P.length) {
                    var S = parseInt(P[0].innerHTML.replace(/[^\d]/g, ""), 10);
                    if (S > 0 && !AG.hasClass(Ac, "HdlOpen")) {
                        AG.addClass(Ac, "HdlOpen");
                        AG.addClass(Ac, "HdlShort");
                        AG.css(j, "display", "none");
                        AI(Y)
                    }
                }
            }

            function M() {
                AG.addClass(AP, "cannotCheck")
            }

            function K() {
                var An = AG.query(AA.itemEl, W),
                     Ao = "";
                w.each(An, function (Aq) {
                    var Ap = AG.get(AA.itemCheckEl, Aq);
                    if (Ap.checked) {
                        Ao += (AG.attr(Aq, "data-cartId") + ",")
                    }
                });
                Ao = Ao.substring(0, Ao.lastIndexOf(","));
                var S = Ao.split(",");
                if (S.length >= 30) {
                    w.each(S, function (Aq, Ap) {
                        S[Ap] = (Aq * 1).toString(32)
                    });
                    Ao = "";
                    Ao = S.join(",")
                }
                return Ao
            }

            function L(S) {
                if (S) {
                    AG.show(AW)
                } else {
                    AG.hide(AW);
                    AG.css(AW, "marginTop", 5)
                }
            }

            function AB(Ar, S) {
                var An = "http://www.atpanel.com/tmalljy.1.1?shopid={shopId}&itemid={itemId}&pos=" + Ar + (S ? S : ""),
                     Aq = {
                         shopId: "",
                         itemId: ""
                     };
                if (window.TShop && window.TShop.mods && window.TShop.mods.SKU) {
                    try {
                        var Ao = TShop.mods.SKU.Setup.config();
                        Aq.shopId = Ao.rstShopId || "";
                        Aq.itemId = Ao.rstItemId || ""
                    } catch (Ap) { }
                }
                (new Image()).src = w.substitute(An, Aq)
            }

            function N(An) {
                if (An) {
                    AB("handle", "&action=close")
                }
                Z = false;
                var S = AG.height(j);
                anim = w.Anim(j, {
                    top: "-4px"
                }, 0.2, "easeOut", function () {
                    AG.css(j, "display", "none");
                    AG.addClass(Ac, "HdlShort")
                }, false);
                anim.run()
            }

            function x() {
                try {
                    if (window.getSelection) {
                        if (window.getSelection().empty) {
                            window.getSelection().empty()
                        } else {
                            if (window.getSelection().removeAllRanges) {
                                window.getSelection().removeAllRanges()
                            }
                        }
                    } else {
                        if (document.selection) {
                            document.selection.empty()
                        }
                    }
                } catch (S) { }
            }

            function AY(S) {
                new Image().src = S
            }
            w.TMiniCartView = Ag;
            return Ag
        });
        KISSY.add("TMiniCart", function (N, M, L) {
            //debugger

            var O = N.DOM,
                 K = N.Event,
                 P = {
                     loadUrl: "load.htm",
                     updateUrl: "updateItem.htm",
                     EVT_ONSTOP: "evt_stop",
                     onCustomEvent: N.merge({}, N.EventTarget)
                 };

            function J(Q) {
                var R = this;
                P = N.mix(P, Q);
                M = M || N.TMiniCartModel;
                var S = new M({
                    loadUrl: P.loadUrl,
                    updateUrl: P.updateUrl
                });
                L = L || N.TMiniCartView;
                var T = new L(P);
                T.bindModel(S);
                S.init();
                this.model = S;
                this.view = T
            }
            N.augment(J, {
                add: function (Q, R) {
                    this.model.commonAdd(Q, R)
                },
                addItem: function (Q, R) {
                    this.model.add(Q, R)
                },
                addCombo: function (Q, R) {
                    this.model.addCombo(Q, R)
                },
                getCartNums: function (Q) {
                    this.model.loadNum(Q)
                },
                miniLogin: function (Q) {
                    if (!N.MiniLogin) {
                        return
                    }
                    N.MiniLogin.show(function () {
                        if (Q) {
                            Q.call()
                        }
                    })
                },
                onstop: function (Q) {
                    if (N.isFunction(Q)) {
                        P.onCustomEvent.on(P.EVT_ONSTOP, Q)
                    }
                }
            });
            N.TMiniCart = J;
            return J
        }, {
            requires: ["TMiniCartModel", "TMiniCartView"]
        });
        E.use("TMiniCart", function (K, J) {
            K.ready(function () {
                if (!window.TMiniCart) {
                    J = J || K.TMiniCart;
                    window.TMiniCart = new J()
                }
            })
        })
    });

    function G() {
        KISSY.each(arguments, function (I) {
            KISSY.log(I)
        })
    }

    function H(I, O, L) {
        if (!I) {
            return
        }
        var M = typeof O;
        if (L) {
            if ("function" === typeof L) {
                L = {
                    success: L
                }
            }
        } else {
            if ("object" === M) {
                L = O
            }
        }
        if ("function" === M) {
            L = {
                success: O
            };
            O = {}
        }
        L = E.merge({
            timeout: 6
        }, L);
        var N = document.createElement("script");
        var R = document.getElementsByTagName("head")[0];
        var K;
        var S = function () {
            K && K.cancel();
            K = null
        };
        var V = false;
        var U = L.success || function () { };
        var P = L.error || function () { };
        H.idx = H.idx || 0;
        var T = "xpj" + H.idx++;
        window[T] = function () {
            V = true;
            S();
            U.apply(window, arguments);
            try {
                delete window[T]
            } catch (W) { }
        };
        if ("string" === typeof O) {
            O = E.unparam(O)
        }
        O.callback = T;
        N.src = I + (-1 < I.indexOf("?") ? "&" : "?") + E.param(O) + "&" + +new Date;
        N.async = true;
        if (L.charset) {
            N.charset = L.charset
        }
        var J = function () {
            if (!V) {
                S();
                P()
            }
        };
        if (N.addEventListener) {
            N.addEventListener("load", function () {
                J()
            }, false);
            N.addEventListener("error", function () {
                J()
            }, false)
        } else {
            N.onreadystatechange = function () {
                if (/loaded|complete/i.test(this.readyState)) {
                    J()
                }
            }
        }
        var Q = L.timeout;
        if (Q) {
            K = E.later(function () {
                U = function () { };
                S();
                P()
            }, Q * 1000)
        }
        R.insertBefore(N, R.firstChild)
    }
    var F;
    var A = false;

    function D(K) {
        if (A) {
            return
        }
        if (F) {
            return K(F)
        }
        A = true;
        var I = window.TML;
        var J = function (L) {
            A = false;
            F = L;
            K(F)
        };
        if (!I) {
            //_kissy.getScript("http://a.tbcdn.cn/apps/tmall/tml/1.0/tml/??tml-min.js,minilogin-min.js?t=20121022", function () {
            KISSY.getScript("http://localhost:7525/apps/tmall/tml/1.0/tml/minilogin.js?t=20121022", function () {
                window.TML.use("minilogin", function (M, L) {
                    J(L || M.MiniLogin)
                })
            })
        } else {
            if (I.MiniLogin) {
                I.use("minilogin", function (M, L) {
                    J(L || M.MiniLogin)
                })
            } else {
                //_kissy.getScript("http://a.tbcdn.cn/apps/tmall/tml/1.0/tml/minilogin-min.js?t=20121022", function () {
                KISSY.getScript("http://localhost:7525/apps/tmall/tml/1.0/tml/minilogin.js?t=20121022", function () {
                    I.use("minilogin", function (M, L) {
                        J(L || M.MiniLogin)
                    })
                })
            }
        }
    }
    (function () {
        if (false) {
            var I = document.getElementsByTagName("head")[0];
            var K = document.createElement("link");
            K.href = "http://assets.daily.taobao.net/apps/tmallbuy/razer/mini/core.css";
            K.rel = "stylesheet";
            I.insertBefore(K, I.firstChild)
        } else {
            var J = '.tml-overlay{position:absolute;left:-9999px;top:-9999px;}.tml-ext-mask{background-color:#000;opacity:.5;filter:alpha(opacity=50);}.tml-dialog .tml-stdmod-header,.tml-dialog .tml-ext-close{background:url(http://img01.taobaocdn.com/tps/i1/T1U6rrXlNqXXaZ_F7_-126-41.png) no-repeat;}.tml-dialog{padding:10px;}.tml-dialog-skin{background:#716564;opacity:.4;filter:alpha(opacity=40);position:absolute;height:100%;width:100%;_padding:0 20px 0 0;top:0;left:0;}.tml-dialog-hasmask .tml-dialog-skin{background:#fff;}.tml-contentbox{position:relative;z-index:2;height:100%;background:#fff;border:1px solid #908b8b;overflow:hidden;}.tml-dialog .tml-stdmod-header{height:35px;line-height:35px;padding-left:10px;border-bottom:1px solid #8c0400;background-color:#b6000c;background-position:20px 10px;font-size:14px;font-weight:700;}.tml-dialog .tml-stdmod-body{overflow:hidden;}.tml-dialog .tml-ext-close{outline:medium none;position:absolute;z-index:3;right:20px;top:20px;overflow:hidden;display:block;height:16px;width:16px;line-height:99em;background-position:0 -25px;}.tml-dialog .tml-ext-close:hover{background-position:-16px -25px;}.tml-dialog-cat{position:absolute;top:0;left:50%;margin:-10px 0 0 -23px;width:55px;height:50px;background:url(http://localhost:7525/Images/blackcathead-55-20.png) no-repeat;_filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled="true",sizinMethod="scale",src="http://localhost:7525/Images/blackcathead-55-20.png");_background:0;}.tml-dialog-default .tml-stdmod-header{background-image:none;color:#fff;}.tml-dialog-gray .tml-stdmod-header{background:#e6e6e6;border-bottom-color:#d9d9d9;}.tml-dialog-gray .tml-ext-close{background-position:-32px -25px;}.tml-dialog-gray .tml-ext-close:hover{background-position:-48px -25px;}body .tml-dialog-back{padding:0;border:1px solid #d5323d;}.tml-dialog-back .tml-stdmod-header{background:#fff9f9;border-bottom:1px solid #f5edec;line-height:25px;height:25px;}.tml-dialog-back .tml-contentbox{border:0;}.tml-dialog-back .tml-ext-close{background-position:-68px -25px;right:10px;top:6px;}.tml-dialog-back .tml-ext-close:hover{background-position:-84px -25px;}body .tml-dialog-back .tml-dialog-skin{padding:1px 1px 0 0;background:#999;left:2px;top:2px;}.tml-dialog-cfmTitle{margin:15px 5px 0 20px;border:0;background-color:#fff;color:#666;}.tml-dialog-btnArea{margin:10px 0 0 20px;padding:0 0 13px 0;}.tml-dialog-cfmOk,.tml-dialog-cfmCancel{margin:0 10px 0 0;padding-left:20px;padding-right:20px;}.tml-dialog-cfmTitle .ui-msg-con{border:0;background-color:#fff;}.tml-dialog-prtTip{margin:10px 0 0 20px;color:#666;}.tml-dialog-prtInput{width:318px;height:35px;display:block;margin:2px 0 0 20px;}.tml-dialog-prtError{margin:5px 0 0 20px;display:none;}.tmMCViewFull,.tmMCViewAll,.tmMCGroup.combo .tmMCGroupDel,.tmMCItemDel,.tmMCItemAdd,.tmMCItemMin,.tmMCGroupSlogon,.tmMCHandler .cannotCheck,.tmMCGo,.tmMCPrice,.tmMCViewIcon,.HdlOpen .tmMCHdLeft,.tmMCEx{background:url(http://localhost:7525/Images/shop_cart-300-210.png) no-repeat;}.tmMCHandler{background:url(http://localhost:7525/Images/login_cart-67-64.png) no-repeat;}.ui-msg-icon,.ui-msg-close,.ui-msg-arrow{background-image:url(http://localhost:7525/Images/msg.png);background-repeat:no-repeat;}.ui-msg{position:relative;display:inline-block;*display:inline;*zoom:1;border:1px solid #e1e1e1;border-radius:2px;background:#f5f5f5;padding-left:24px;box-shadow:1px 1px 1px #f5f5f5;}.ui-msg-block{display:block;}.ui-msg-con{line-height:16px;color:#666;background:#fbfbfb;padding:3px 10px 3px 5px;border:1px solid #efefef;border-left:1px solid #e7e7e7;margin:-1px;}.ui-msg-orange .ui-msg-con{color:#f19000;}.ui-msg-red .ui-msg-con{color:#b10000;}.ui-msg-arrow,.ui-msg-close,.ui-msg-icon{position:absolute;}.ui-msg-close{width:18px;height:18px;top:0;right:0;background-position:-21px 2px;cursor:pointer;}.ui-msg-close:hover{background-position:-40px 1px;}.ui-msg-arrow{width:5px;height:8px;left:-5px;top:7px;}.ui-msg-arrow-top,.ui-msg-arrow-down{width:8px;height:5px;background-position:-5px 0;top:-5px;left:7px;}.ui-msg-arrow-down{background-position:-13px 0;top:auto;bottom:-5px;}.ui-msg-icon{width:23px;height:22px;top:0;left:0;}.ui-msg-error .ui-msg-icon{background-position:-61px -26px;}.ui-msg-stop .ui-msg-icon{background-position:-61px -1px;}.ui-msg-ok .ui-msg-icon{background-position:-61px -51px;}.ui-msg-tip .ui-msg-icon{background-position:-61px -103px;}.ui-msg-attention .ui-msg-icon{background-position:-61px -79px;}.ui-msg-question .ui-msg-icon{background-position:-61px -126px;}.ui-msg-alert .ui-msg-icon{background-position:-61px -153px;}.ui-msg-notice .ui-msg-icon{background-position:-61px -177px;}.ui-msg-clean,.ui-msg-clean .ui-msg-clean{border:none;background:none;box-shadow:none;}.ui-msg-clean .ui-msg-con{padding-left:0;border:none;}.ui-page-tip{background:#fbfbfb;border-color:#efefef;}.ui-page-tip .ui-msg-con{border-left:1px solid #fbfbfb;padding-left:0;}.ui-top-tip{padding-left:58px;}.ui-top-tip .ui-msg-con{line-height:20px;padding:18px 28px 18px 12px;font-weight:bold;font-size:14px;}.ui-top-tip .ui-msg-icon{width:57px;height:56px;}.ui-top-tip .ui-msg-error .ui-msg-icon{background-position:11px -20px;}.ui-top-tip .ui-msg-stop .ui-msg-icon{background-position:11px -1px;}.ui-top-tip .ui-msg-ok .ui-msg-icon{background-position:11px -66px;}.ui-top-tip .ui-msg-tip .ui-msg-icon{background-position:11px -114px;}.ui-top-tip .ui-msg-attention .ui-msg-icon{background-position:11px -165px;}.ui-top-tip .ui-msg-question .ui-msg-icon{background-position:11px -215px;}.ui-top-tip .ui-msg-alert .ui-msg-icon{background-position:11px -265px;}.ui-top-tip .ui-msg-notice .ui-msg-icon{background-position:13px -315px;}.ui-top-tip .ui-msg-stop .ui-msg-icon{background-position:12px -362px;}.ui-msg-empty,.ui-msg-empty .ui-msg-con{background:none;border:none;padding:1px;box-shadow:none;}.ui-msg-empty .ui-msg-icon{position:static;display:inline-block;}.tmMC{margin-right:4px;color:#fff;z-index:100100;width:66px;zoom:1;position:relative;}.tmMC-proxy{padding-right:7px;height:31px;}.tmMCHandler{width:66px;height:31px;overflow:hidden;cursor:pointer;position:relative;z-index:100001;}.HdlShort:hover .tmMCEx,.tmMC .hdlHover .tmMCEx{background-image:-220px -100px;}.tmMCHandler .tmMCNum{padding-left:38px;_display:inline;}.HdlOpen .tmMCNum{padding-left:34px;display:inline-block;}.tmMC .unlogin_hover{background-position:0 -32px;}.tmMC .unlogin_hover .tmMCNum{display:none;}.tmMCEx{display:none;float:left;background-position:-220px -98px;width:15px;height:9px;overflow:hidden;margin:13px 0 0 32px;}.HdlShort .tmMCEx{background-position:-220px -108px;}.tmMCHdLeft{display:none;float:left;position:relative;z-index:100000;width:284px;height:31px;overflow:hidden;opacity:.9;filter:alpha(opacity=90);cursor:pointer;}.HdlOpen .tmMCHdLeft{background-position:0 -64px;}.tmMCHdLeft:hover{filter:alpha(opacity=95);opacity:.95;}.HdlShort .tmMCHdLeft{width:284px;}.HdlShort .tmMCHdLeft:hover .tmMCEx,.HdlShort .tmMCHandler .hover .tmMCEx{background-position:-235px -108px;}.tmMCHdLeft:hover .tmMCEx,.tmMCHandler .hover .tmMCEx{background-position:-235px -98px;}.tmMCPrice{float:left;margin-left:10px;}.tmMC .HdlOpen{width:283px;overflow:visible;background:none;cursor:default;}.HdlOpen .tmMCBody,.HdlOpen .tmMCHdLeft,.HdlOpen .tmMCGo{display:block;}.HdlOpen .tmMCNum{display:none;}.HdlOpen .tmMCHdLeft .tmMCNum{display:inline-block;}.tmMC .tmMCBotLink{margin-top:1px;float:left;color:#000;height:31px;position:relative\9;z-index:1000010\9;line-height:33px;cursor:pointer;}.tmMC .tmMCBotLink:hover{color:#FEB1B2;text-decoration:underline;}.tmMCViewIcon{width:15px;height:15px;background-position:-188px -32px;position:absolute;top:3px;right:2px;display:none;}.tmMCViewIcon:hover{background-position:-203px -32px;}.tmMCPrice{margin-top:2px;float:right;padding-right:8px;height:31px;line-height:31px;font-weight:bold;background-position:-286px -24px;font-family:"Arial";padding-left:15px;}.tmMCGo{display:none;position:relative;z-index:100000;float:right;width:65px;height:31px;overflow:hidden;background-position:-67px 0;text-indent:-999px;cursor:pointer;}.HdlShort .tmMCGo{display:none;}.tmMCHandler .cannotCheck{background-position:-67px -32px;cursor:default;}.tmMCHandler .cannotCheck:hover{background-position:-67px -32px;}.tmMCGo:hover{background-position:-67px 0;}.tmMCNum span{display:block;}.tmMCBody,.tmMCTopBorder{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAMAAAC6sdbXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAlQTFRF7u7u5ubm6urqYPTI0gAAAB9JREFUeNoUiLERAAAMRLD/0Pk0HGSChSOLP/HqBBgAAfcAItOjOxwAAAAASUVORK5CYII=");*background-image:url(http://img01.taobaocdn.com/tps/i1/T1PRWJXX4rXXXXXXXX-5-5.png);border:1px solid #d6d6d6;background-color:#f2f2f2;position:absolute;width:275px;}.tmMCTopBorder{height:33px;top:-4px;left:3px;display:none;}.tmMCBody{padding-top:8px;padding-bottom:20px;display:none;color:#000;text-align:left;margin:0 auto -4px auto;-webkit-box-shadow:0 0 3px rgba(0,0,0,0.2);-moz-box-shadow:0 0 3px rgba(0,0,0,0.2);box-shadow:0 0 3px rgba(0,0,0,0.2);filter:progid:DXImageTransform.Microsoft.Shadow(color="#e5e5e5",Direction=90,Strength=1);top:-30px;left:3px;}.tmMCLoading{display:none;background:url("data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH5BAkKAAAAIf4aQ3JlYXRlZCB3aXRoIGFqYXhsb2FkLmluZm8AIf8LTkVUU0NBUEUyLjADAQAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOw==") 50% 50% no-repeat;*background:url(http://img03.taobaocdn.com/tps/i3/T1W3mKXdJXXXXXXXXX-16-16.gif) 50% 50% no-repeat;width:100%;height:20px;text-indent:-999px;overflow:hidden;}.tmMCTip{margin:0 auto 7px;width:165px;display:block;}.tmMCTip .ui-msg-con{background-color:transparent;}.tmMCTip .ui-msg-con a{color:#2953A6;margin-left:1px;}.HdlShort .tmMCCon{margin-top:5px;}.tmMCCon{width:265px;overflow:hidden;position:relative;margin:0 auto 0 9px;padding-bottom:4px;}.tmMCCon::-webkit-scrollbar-track-piece{background-color:rgba(0,0,0,0);-webkit-border-radius:0;}.tmMCCon::-webkit-scrollbar{width:6px;height:8px;}.tmMCCon::-webkit-scrollbar-thumb{height:50px;background-color:rgba(0,0,0,0.4);-webkit-border-radius:4px;}.tmMCCon::-webkit-scrollbar-thumb:hover{height:50px;background-color:rgba(0,0,0,0.5);-webkit-border-radius:4px;}.tmMCGroup{width:257px;overflow:hidden;_zoom:1;}.tmMCGroupTitle{height:18px;line-height:18px;vertical-align:bottom;}.tmMCAllCheckWp{position:relative;float:left;color:#808080;margin:0 5px 0 6px;width:250px;height:38px;*margin-left:2px;_display:inline;}.tmMCAllCheckWp label,.tmMCAllCheck{position:relative;top:10px;}.tmMCAllCheck{vertical-align:middle;margin:0 5px 0 0!important;margin-top:-2px!important;margin-bottom:1px!important;}.tmMCGroupCheckWp{float:left;margin-right:5px;}.tmMCGroupCheck{vertical-align:middle;margin:0!important;margin-top:-2px!important;margin-bottom:1px!important;}.tmMCGroupName{color:#808080;float:left;white-space:nowrap;width:220px;text-overflow:ellipsis;height:18px;overflow:hidden;}.tmMCGroupPrice{float:right;color:#999;padding-right:14px;}.tmMCGroupSlogon{float:left;background-position:-157px -45px;background-position:-151px -47px\9;color:#fff;height:19px;width:69px;line-height:20px;overflow:hidden;font-family:\5B8B\4F53;padding-left:5px;margin:0 0 0 3px;}.tmMCSlogonItem{display:block;}.tmMCItemWp{border:1px solid #E3E3E3;width:255px;border-bottom:none;background:#fff;cursor:default;margin:2px 0 5px 0;}.tmMCItemWp .tmMCUncheck{background:#f5f5f4;}.tmMCUnCheck{background:#fff url(http://img02.taobaocdn.com/tps/i2/T1JFuKXbhgXXXXXXXX-5-5.png);}.tmMCItem{width:100%;height:56px;margin:0 auto;overflow:hidden;border-bottom:1px solid #E3E3E3;position:relative;_zoom:1;}.tmMCItemCheckWp,.tmMCItemImg,.tmMCItemDesc,.tmMCItemPrice,.tmMCItemDel{float:left;}.tmMCItemCheckWp{font-weight:normal;width:12px;height:60px;margin:0 5px;*margin:0 9px 0 1px;_margin:0 1px;color:#fff;}#J_TMiniCart input[type="checkbox"]{margin:0;}#J_TMiniCart .tmMCItemCheck{margin-top:20px!important;*margin-top:18px!important;}.tmMCBody .check{color:#000;}.tmMCItemImg{margin:3px 0 auto 3px;display:table-cell;vertical-align:middle;text-align:center;*display:block;*font-size:44px;*font-family:Arial;width:50px;height:50px;}.tmMCItemImg{vertical-align:middle;}.tmMCItemskuWp{float:left;width:108px;height:40px;margin-left:8px;padding-top:10px;}.tmMCItemSku{display:block;width:100%;color:#999;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;}.tmMCItemDesc{width:50px;margin:20px 0 0 0;overflow:hidden;}.tmMCItemQty{text-align:center;}.tmMCItemAdd,.tmMCItemMin{visibility:hidden;float:left;width:16px;height:16px;background-position:-284px -88px;cursor:pointer;}.tmMCItemAdd{width:16px;}.tmMCItemAdd{background-position:-284px -120px;}.tmMCItemMin:hover{background-position:-284px -104px;}.tmMCItemAdd:hover{background-position:-284px -152px;}.tmMCItemQtyNum{float:left;margin:-1px 2px 0;*margin-top:0;color:#999;_display:inline;width:14px;line-height:16px;word-wrap:break-word;word-break:break-all;}.tmMCItem .disableMin{background-position:-284px -72px;width:16px;cursor:default;}.tmMCItem .disableAdd{background-position:-284px -136px;cursor:default;}.tmMCItemPrice{margin:20px 0 0 0;color:#666;width:72px;text-align:right;word-wrap:break-word;word-break:break-all;}.tmMCItemDel{color:#f00;cursor:pointer;background-position:-251px -32px;display:block;width:14px;height:14px;position:absolute;right:11px;top:4px;}.tmMCItemDel:hover{background-position:-237px -32px;}.tmMCItem:hover .tmMCItemCheckWp,.tmMCBody .hover .tmMCItemCheckWp{display:inline-block;}.tmMCItem:hover .tmMCItemDel,.tmMCBody .hover .tmMCItemDel{display:block;}.tmMCItem:hover .tmMCItemAdd,.tmMCBody .hover .tmMCItemAdd,.tmMCItem:hover .tmMCItemMin,.tmMCBody .hover .tmMCItemMin{visibility:visible;}.tmMCGroup.combo{position:relative;}.tmMCGroup.combo .tmMCGroupDel{color:#f00;cursor:pointer;background-position:-250px -32px;display:block;width:14px;height:14px;position:absolute;right:12px;top:24px;z-index:999;}.tmMCGroup.combo.chover .tmMCGroupDel{display:block;}.tmMCGroup.combo.chover .tmMCGroupDel:hover{background-position:-236px -32px;}.tmMCGroup.combo .tmMCItemCheckWp{visibility:hidden;}.tmMCGroup.combo .tmMCItemMin{visibility:hidden;_display:none;}.tmMCGroup.combo .tmMCItemAdd{visibility:hidden;_display:none;}.tmMCGroup.combo .tmMCItemQtyNum{_margin-left:16px;}.tmMCViewMore{cursor:pointer;}.tmMCViewAll{cursor:pointer;display:block;width:257px;height:26px;margin:5px auto 0 -4px;background-position:0 -154px;}.tmMCViewAll:hover{background-position:0 -180px;}.tmMCBtnArea{width:256px;height:30px;margin:5px auto 0;position:relative;}.tmMCLose,.tmMCLose:hover,.tmMCLose:visited{color:#999;text-decoration:none;}.tmMCViewFull{position:absolute;display:block;right:1px;top:0;width:112px;height:26px;overflow:hidden;background-position:0 -128px;}.tmMCViewFull:hover{background-position:-113px -128px;}.tmMCBusy,.tmMCBusy:hover{width:190px;margin:5px auto 0;height:20px;line-height:20px;color:#999;}.tmMCTryFull,.tmMCTryFull:hover,.tmMCTryFull:visited{color:#2953A6;text-decoration:none;}.tmMCIframe{position:absolute;width:275px;z-index:-1;border:0;top:0;}#tm-minLogin{border:1px solid #c30009;background:#FAFAFA;width:412px;height:272px;overflow:hidden;position:fixed;_position:absolute;left:50%;top:50%;margin:-136px 0 0 -206px;z-index:10000000;}.tmml-close,.tmml-title{background:url(http://img02.taobaocdn.com/tps/i2/T13h1uXgdEXXXXXXXX-90-16.png) no-repeat;}.tmml-hd{position:relative;background:#fff8f7;border-bottom:1px solid #f3e9e7;}.tmml-title{line-height:99em;height:24px;overflow:hidden;background-position:0 4px;margin:0 0 0 5px;width:82px;}.tmml-close{position:absolute;top:8px;right:10px;width:8px;height:8px;line-height:99em;overflow:hidden;background-position:-82px -2px;cursor:pointer;}.tmml-mask{position:absolute;width:50px;background:#FAFAFA;height:100%;}#tm-minLogin iframe{margin-top:-39px;margin-left:43px;}.tmMCGuide{opacity:0;position:fixed;_position:absolute;bottom:0;right:176px;z-index:99999;}.guideHepler{position:absolute;bottom:5px;right:120px;z-index:99;}.confirmGuide{position:absolute;padding:90px 115px;right:110px;bottom:0;_padding:0;_width:230px;_height:180px;background:url(http://img02.taobaocdn.com/tps/i2/T1KznpXh8dXXaYREvd-155-79.png) no-repeat;_background-image:url(http://img01.taobaocdn.com/tps/i1/T1WM_jXmFuXXaYREvd-155-79.png);cursor:pointer;z-index:100;}.closeGuide{position:absolute;background:url(about:blank);display:block;text-indent:-100em;width:30px;height:20px;top:33px;left:95px;}.guideDetail{opacity:0;display:none\9;position:relative;}:root .guideDetail{display:block\9;}.endGuide{position:absolute;background:url(about:blank);display:block;text-indent:-100em;width:35px;height:35px;top:2px;left:4px;cursor:pointer;z-index:99;}.guideDetailBg{position:absolute;width:666px;height:280px;right:0;bottom:0;background:url(http://img01.taobaocdn.com/tps/i1/T1vSYpXjdgXXXgxU2b-666-280.png) no-repeat;_background-image:url(http://img04.taobaocdn.com/tps/i4/T1EbDpXXXkXXXgxU2b-666-280.png);}.guideCarousel{position:absolute;width:370px;height:160px;top:50px;left:60px;z-index:100;}.guidePrev,.guideNext{position:absolute;text-indent:-100em;width:30px;height:30px;z-index:9999;cursor:pointer;outline:none;top:55px;}.guidePrev{background:url(http://img02.taobaocdn.com/tps/i2/T1V1PnXnNtXXbSBwfc-30-30.png) no-repeat;left:-40px;}.guideNext{left:370px;background:url(http://img01.taobaocdn.com/tps/i1/T1kAbjXlxuXXbSBwfc-30-30.png) no-repeat;}.guideDisable{display:none;}.guideScroller{position:relative;width:370px;height:160px;overflow:hidden;}.guideConten{position:absolute;width:1110px;}.guideContent li{float:left;width:370px;height:160px;display:block;}.guideContent img{vertical-align:middle;margin-right:10px;}';
            KISSY.DOM.addStyleSheet(J)
        }
    })()
})(KISSY);