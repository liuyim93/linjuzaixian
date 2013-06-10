/*pub-1|2013-04-11 10:17:00*/
KISSY.add("cart/app", function (K, Q, O, E, N, L, D, G, B, F, M) {
    var P = D.isDaily();
    var I = P ? "daily.taobao.net" : "taobao.com";
    var A = {
        fav: "http://favorite." + I + "/json/add_collection_for_cart.htm",
        update: "/cart/updateCart.do",
        "delete": "/cart/deleteCart.do",
        check: "/cart/checkCart.do",
        undel: "/cart/undelCart.do",
        loginIndicator: "http://buy." + I + "/auction/buy.htm?from=cart",
        login: "https://login." + I + "/member/login.jhtml?from=buy&style=mini&redirect_url=http%3A%2F%2Fcart." + (P ? "daily.tmall.net" : "tmall.com") + "%2Fcart%2Flogin_success.htm%3Ffrom%3Dcart&is_ignore=false",
        //2013-05-06 basilwang use our own
        //go: "http://buy." + (P ? "daily.tmall.net" : "tmall.com") + "/order/confirm_order.htm?from=cart"
        go: "http://localhost:7525/Order/Home/ConfirmOrder?from=cart"
    };
    if ("jz" === D.mode) {
        A.go = A.go.replace("buy.", "obuy.")
    }
    var J = function () {
        var S = new Image();
        var T = [];
        var U = false;

        function R() {
            if (U) {
                return
            }
            var V = T.shift();
            if (V) {
                U = true;
                S.src = "http://log.mmstat.com/" + V + "&" + K.now()
            }
        }
        S.onload = S.onerror = function () {
            U = false;
            R()
        };
        return {
            log: function (V) {
                T.push(V);
                R()
            }
        }
    } ();
    var H = {
        init: function () {
            this.stat2("2.9?action=showcart");
            var R = window.cart_config;
            R.api = K.merge(A, R.api);
            D.setConfig(R);
            B.init();
            this.load({
                tip: "正在加载购物车，请稍候",
                callback: function () {
                    var S = P ? "assets.daily.taobao.net" : "a.tbcdn.cn";
                    B.floodwood(Q.get("#cashier"));
                    B.initGoTop();
                    if (Q.get("#J_Recommend")) {
                        K.use("cart/recommend", function (T, U) {
                            U.init()
                        })
                    }
                }
            });
            F.init();
            M.init({
                title: "给购物车提建议"
            })
        },
        stat: function (R) {
            this.stat2("2.7?" + R)
        },
        stat2: function (R) {
            J.log("tmalljy." + R)
        },
        load: function (S) {
            var a = this;
            var U = window;
            var T = 20;
            var W = setTimeout;
            var X = 12 * 60000 / T;
            var V = 0;
            var R = Q.get("#mcart");
            S = S || {};
            var Z = S.callback || function () { };
            if (S.tip) {
                Q.html("#J_MLoading", "<p>" + S.tip + "</p>")
            }
            G.reset();
            B.reset();
            R.className = "m-requeting";
            window.scrollTo(0, 0);
            if (!U.g_mcart_request) {
                lcd()
            }
            var Y = function () {
                if (V >= X) {
                    alert("请求超时，请稍候重试");
                    return Z()
                }
                var c = U.mcartdata;
                if (c) {
                    if (c.success) {
                        a.render(c);
                        R.className = "m-loaded";
                        Q.removeClass(document.body, "cartError");
                        Q.addClass(document.body, "cartReady")
                    } else {
                        var b = c.error || {};
                        B.renderError(b.errorMessage || "对不起，系统出错!");
                        R.className = "m-error";
                        Q.removeClass(document.body, "cartReady");
                        Q.addClass(document.body, "cartError")
                    }
                    U.mcartdata = null;
                    U.g_mcart_request = null;
                    return Z()
                }
                V++;
                setTimeout(Y, T)
            };
            Y()
        },
        render: function (V) {
            var Z = this;
            if (K.isArray(V.list) && V.list.length) {
                B.undoEl = null;
                var R = G.getCachedUnCheckedCarts();
                this._render(V.list, R);
                if (K.isEmptyObject(R)) {
                    B.updateCartCheckStatus(true)
                } else {
                    K.each(Q.query("table.m-trunk"), function (a) {
                        K.each(Q.query("input.m-chk", a), function (b) {
                            if (!b.checked) {
                                Q.attr(Q.get("input.m-chk-trunk", a), "checked", false);
                                return false
                            }
                        })
                    });
                    B.updateCartCheckStatus(false)
                }
            } else {
                B.showEmpty()
            }
            G.resetCod();
            G.calculate();
            var W = G.calculateStatusNum();
            B.updateStatus(W);
            if (W.invalid > 0) {
                Q.addClass("#cashier", "m-invalid-show")
            }
            var T = V.globalData;
            if (T && T.openNoAttenItem) {
                Z.clearNoAttention()
            }
            var S = Q.get("#mcart");
            Z.eles = {
                el: S,
                checkCartEls: Q.query("input.m-chk-all", S)
            };
            O.remove(S, "click");
            O.on(S, "click", function (b) {
                var d = b.target;
                var c = Q.attr(d, "data-job");
                var a = Q.attr(d, "data-log");
                if (a) {
                    Z.stat2(a)
                }
                if (c) {
                    if ("A" === d.nodeName) {
                        b.preventDefault()
                    }
                    Z[c] && Z[c](d)
                }
            });
            K.each(Q.query("div.m-amount", S), function (a) {
                var h = Q.attr(Q.parent(a, "tr"), "data-orderId");
                var c = Q.get("a.m-minus", a);
                var f = Q.get("a.m-plus", a);
                var d = Q.get("input.m-text", a);
                Q.addClass(Q.query("span", a), "m-jobin");
                Q.addClass([c, f], "m-jobout");
                var e = d.value;
                if (false === G.testAmount(h, {
                    container: a.parentNode,
                    amount: d,
                    minus: c,
                    plus: f,
                    doCorrect: false
                })) {
                    var b = d.value;
                    if (b != e) {
                        d.value = e
                    }
                }
                var g;
                O.on(d, "keyup", function () {
                    g && g.cancel();
                    g = K.later(function () {
                        Z.alterAmount(d, 0)
                    }, 300)
                })
            });
            O.on(Q.query(".m-promo-icon", S), "mouseenter mouseleave", function (a) {
                if ("mouseenter" === a.type) {
                    B.showBubbleMsg(this, Q.attr(this, "data-desc"))
                } else {
                    B.hideBubbleMsg(this)
                }
            });
            var U = /(_sum|_60x60|_80x80|_100x100)\.jpg/;
            var X = Q.create('<div class="m-magnifier"></div>');
            var Y;
            document.body.insertBefore(X, document.body.lastChild);
            O.on(X, "mouseenter mouseleave", function (a) {
                Y && Y.cancel();
                Y = K.later(function () {
                    X.style.visibility = "mouseenter" === a.type ? "visible" : "hidden"
                }, 180)
            });
            O.on(Q.query("a.m-img-trigger", S), "tap mouseenter mouseleave", function (a) {
                Y && Y.cancel();
                var c = "tap" === a.type;
                if (c) {
                    Q.removeAttr(this, "href");
                    X.style.visibility = "hidden"
                }
                if ("mouseenter" === a.type || c) {
                    var b = Q.get("img", this);
                    X.innerHTML = '<div class="m-box"><a href="' + b.parentNode.href + '" target="_blank"><img src="' + b.src.replace(U, "_160x160.jpg") + '" data-point-url="http://www.atpanel.com/jsclick?gwcsp=1" /></a></div><s></s>';
                    var d = Q.offset(this);
                    Q.css(X, {
                        visibility: "visible",
                        top: d.top - 58,
                        left: d.left + 65
                    })
                } else {
                    Y = K.later(function () {
                        X.style.visibility = "hidden"
                    }, 180)
                }
            });
            K.each(Q.query("div.m-scroll-promos", S), function (a) {
                if (1 < Q.query("li", a).length) {
                    K.later(function () {
                        K.use("switchable", function (c, b) {
                            new b.Slide(a, {
                                hasTriggers: false,
                                effect: "scrolly",
                                interval: 5,
                                duration: 0.5
                            })
                        })
                    }, Math.random() * 1500)
                }
            });
            O.on(Q.query("span.m-ww", S), "click", function () {
                Z.stat2("2.9?action=wangwang")
            })
        },
        goTop: function () {
            this.stat2("2.9?action=fanhui_dingbu");
            window.scrollTo(0, 0)
        },
        closeCodTip: function () {
            B.closeCodTip()
        },
        clearNoAttention: function () {
            var S = [];
            var R = this;
            R.stat2("2.9?clear=openbutton");
            K.each(G.getNoAttentionCartIds(), function (X, Z) {
                if (Z > 11) {
                    return false
                }
                var U = G.find("order/" + X);
                if (U) {
                    var Y = '<div id="J_NoAttentionItem' + X + '" class="item item-selected" data-skuid="' + U.skuId + '" data-itemid="' + U.itemId + '" data-cartid="' + X + '">';
                    Y += '<p class="item-img"><a href="' + U.url + '" target="_blank" title="' + U.title + '"><img src="' + U.pic.replace(/_\w+(\.\w+)$/, "_120x120$1") + '" /></a></p>';
                    Y += '<p class="item-title"><input type="checkbox" checked /><a target="_blank" title="' + U.title + '" href="' + U.url + '">' + U.title + "</a></p>";
                    var V = U.skus;
                    if (K.isPlainObject(V)) {
                        var c = "";
                        var a = "";
                        for (var W in V) {
                            var b = V[W];
                            c += "<span>" + b + "</span>";
                            a += W + "\uff1a" + b + " "
                        }
                        if (c) {
                            Y += '<p class="item-sku" title="' + a + '">' + c + "</p>"
                        }
                    }
                    S.push(Y + "</div>")
                }
            });
            if (S.length) {
                S = '<div id="J_ClearHelper"><h4>长期未关注商品</h4><div class="item-list">' + S.join("") + '</div><div class="options"><a class="delSelected" href="#">\u5220\u9664\u9009\u4e2d</a><a class="moveFav" href="#">\u79fb\u5165\u6536\u85cf\u5939</a></div>';
                var T = window.TML;
                if (T) {
                    if (!T.Overlay) {
                        isLoadingMods = true;
                        return K.getScript("http://a.tbcdn.cn/apps/tmall/tml/1.0/tml/overlay-min.js", function () {
                            isLoadingMods = false;
                            R.showClearHelper(S)
                        })
                    }
                } else {
                    isLoadingMods = true;
                    return K.getScript("http://a.tbcdn.cn/apps/tmall/tml/1.0/tml/??tml-min.js,overlay-min.js", function () {
                        isLoadingMods = false;
                        R.showClearHelper(S)
                    })
                }
                R.showClearHelper(S)
            }
        },
        recordClearedCarts: function (S) {
            var R = this._clearedCartIds || [];
            this._clearedCartIds = R.concat(S)
        },
        clearCart: function () {
            var R = this._clearedCartIds;
            if (R && R.length) {
                K.each(R, function (S) {
                    B.removeOrderFast(Q.get("#order_" + S))
                });
                G.removeOrders(R);
                this.afterDeleteCart()
            } else {
                this.stat2("2.9?clear=close")
            }
            this._clearedCartIds = []
        },
        showClearHelper: function (T) {
            var R = this;
            var S = R.clearHelperDialog;
            if (S) {
                S.set("bodyContent", T + '<span style="display:none">' + K.now() + "</span>");
                return S.show()
            }
            TML.use("overlay", function (V, X) {
                var Y = new X.Dialog({
                    elCls: "clear-overlay",
                    width: 878,
                    skin: "gray",
                    headerContent: "购物车清理助手",
                    bodyContent: T,
                    mask: true
                });
                R.clearHelperDialog = Y;
                var W = function (Z, a) {
                    R.recordClearedCarts(a);
                    var b = G.calculateStatusNum();
                    Y.set("bodyContent", '<div class="result"><s></s>清理成功！购物车剩余容量' + (b.total - a.length) + "件</div>");
                    setTimeout(function () {
                        Y.hide()
                    }, 3000)
                };
                var U = function (Z, a) {
                    var b = Q.create('<div class="err"></div>');
                    b.innerHTML = a + '<s class="icon"></s><s class="arrow"></s>';
                    Z.appendChild(b);
                    setTimeout(function () {
                        Q.remove(b)
                    }, 3000)
                };
                Y.on("show", function () {
                    R.stat2("2.9?clear=showdiv");
                    Y.center();
                    O.on(Q.query("input", "#J_ClearHelper div.item-list"), "click", function () {
                        R.stat2("2.9?clear=" + (this.checked ? "select" : "cancelselect"));
                        Q.toggleClass(Q.parent(this, "div.item"), "item-selected")
                    });
                    O.on(Q.query("a", "#J_ClearHelper div.options"), "click", function (c) {
                        c.halt();
                        Q.remove(Q.get("div.err", this.parentNode));
                        var b = [];
                        var Z = [];
                        var e = [];
                        var d = [];
                        K.each(Q.query("div.item-selected", "#J_ClearHelper"), function (f) {
                            Z.push(f);
                            e.push(Q.attr(f, "data-cartid"));
                            d.push(Q.attr(f, "data-itemid"));
                            b.push(Q.attr(f, "data-skuid"))
                        });
                        if (Q.hasClass(this, "delSelected")) {
                            R.stat2("2.9?clear=delete");
                            if (0 === e.length) {
                                return U(this, "请选择需要删除的商品")
                            }
                            G.async("delete", e, {
                                success: function () {
                                    W(Z, e)
                                }
                            })
                        } else {
                            if (Q.hasClass(this, "moveFav")) {
                                R.stat2("2.9?clear=removefav");
                                if (0 === e.length) {
                                    return U(this, "请选择需要移入收藏夹的商品")
                                }
                                var a = [];
                                K.each(d, function (g, f) {
                                    a.push(g + ":" + b[f])
                                });
                                K.jsonp("http://favorite." + (D.isDaily() ? "daily.taobao.net" : "taobao.com") + "/json/add_collection_for_cart.htm", {
                                    _tb_token_: D.getConfig("_tb_token_"),
                                    itemSkuList: a.join(",")
                                }, function (h) {
                                    var f = h.result;
                                    if (f) {
                                        var g = f.message;
                                        if (f.status || (8 === g.errorCode)) {
                                            G.async("delete", e, {
                                                success: function () {
                                                    W(Z, e)
                                                }
                                            })
                                        } else {
                                            alert(g.error)
                                        }
                                    } else {
                                        alert("系统错误，请稍后重试")
                                    }
                                })
                            }
                        }
                    })
                });
                Y.on("hide", function () {
                    R.clearCart()
                });
                Y.render();
                Y.show()
            })
        },
        _render: function (x, U) {
            var e = Q.get("#mcartlist");
            var Y = document.createElement("div");
            var f = new Date();
            for (var r = 0, s = x.length; r < s; r++) {
                var b = "";
                var Z = x[r];
                var z = Z.id || r;
                Z.id = z;
                Z.checked = true;
                var n = Z.type;
                var c = Z.title;
                var a = "";
                if ("combo" === n) {
                    a = '<span class="m-title">' + c + "</span>"
                } else {
                    a = '<a class="m-title" ' + ("shop" === n ? 'data-log="2.9?action=openshop"' : "") + ' target="_blank" href="' + Z.url + '" title="' + c + '">' + ("shop" === n ? "\u5e97\u94fa\uff1a" : "") + c + "</a>"
                }
                var u = "combo" === n ? (function () {
                    var i = 0;
                    K.each(Z.bundles, function (j) {
                        K.each(j.orders, function (m) {
                            i++;
                            if (m.services && m.services.length) {
                                i++
                            }
                        })
                    });
                    return i
                })() : -1;
                var T = "";
                var d = Z.scrollPromos;
                if (K.isArray(d) && d.length) {
                    var w = document.createElement("div");
                    T += '<div class="m-scroll-promos"><ul class="ks-switchable-content">';
                    for (var o = 0, R = d.length; o < R; o++) {
                        w.innerHTML = d[o];
                        var h = K.trim(Q.text(w));
                        T += '<li title="' + h + '"><span class="m-item">' + h + "</span></li>"
                    }
                    T += "</ul></div>";
                    w = null
                }
                b += '<table class="m-trunk m-host-' + Z.host + '" id="trunk_' + z + '" data-seller="' + (Z.seller || Z.id) + '"><colgroup><col class="m-col-chk" /><col class="m-col-title" /><col class="m-col-price" /><col class="m-col-amount" /><col class="m-col-agio" /><col class="m-col-total" /><col class="m-col-operate" /></colgroup><thead><tr class="m-trunk-head"><th colspan="2"><div class="m-head-cont"><div class="m-head-bd"><div class="m-head-static">{{trunkCheckHtml}}' + a + D.ww(Z.seller) + "</div>" + T + '</div></div></th><th>\u5355\u4ef7(\u5143)</th><th>\u6570\u91cf</th><th>\u4f18\u60e0\u65b9\u5f0f</th><th>\u5c0f\u8ba1(\u5143)</th><th>\u64cd\u4f5c</th></tr></thead><tbody class="m-split"><tr><td colspan="7"></td></tr></tbody>';
                var y = Z.bundles;
                var p = 0;
                var g = 0;
                for (var q = 0, k = y.length; q < k; q++) {
                    var l = y[q];
                    var V = l.id || (z + "_" + q);
                    l.id = V;
                    b += '<tbody id="bundle_' + l.id + '" class="m-bundle">';
                    var S = l.orders;
                    for (var o = 0, R = S.length; o < R; o++) {
                        var W = S[o];
                        if (!W.isValid) {
                            g++
                        }
                        p++;
                        W.id = W.cartId;
                        W.checked = !(W.id in U);
                        if (!W.checked) {
                            Z.checked = false
                        }
                        var X = W.amount;
                        var v = {
                            max: X.max,
                            val: X.max,
                            type: "stock",
                            limit: X.limit
                        };
                        if (X.limit && X.limit < X.max) {
                            v.val = X.limit;
                            v.type = "limit"
                        }
                        X.max = v;
                        G.fill("order", W, V);
                        G.calculateOrder(W.cartId);
                        b += B.renderOrder(W, {
                            idx: o,
                            host: Z.host,
                            type: n,
                            bigRowSpan: u
                        })
                    }
                    b += "</tbody>";
                    delete l.orders;
                    G.fill("bundle", l, z)
                }
                if (Z.gradeMessage) {
                    b += '<tbody class="m-grade-msg"><tr><td colspan="4"></td><td colspan="3" class="m-box">' + Z.gradeMessage + "</td></tr></tbody>"
                }
                delete Z.bundles;
                if (g === p) {
                    Z.isValid = false
                }
                b = b.replace("{{trunkCheckHtml}}", Z.isValid ? '<input data-job="selectTrunk" class="m-chk m-chk-trunk" type="checkbox" value="' + z + '" ' + (Z.checked ? "checked" : "") + ' data-point-url="http://www.atpanel.com/jsclick?cartlist=shopselected"/>' : ("combo" == n ? '<span class="m-invalid-tip" title="\u5546\u54c1\u88ab\u4e0b\u67b6\u3001\u5220\u9664\u3001\u5e93\u5b58\u4e0d\u8db3\uff0c\u6216\u5546\u5bb6\u5904\u4e8e\u88ab\u76d1\u7ba1\u6216\u51bb\u7ed3\u72b6\u6001">\u5931\u6548</span>' : ""));
                G.fill("trunk", Z);
                Y.innerHTML = b + "</table>";
                e.appendChild(Y.firstChild)
            }
            if (window.Light && Light.light) {
                Light.light(e)
            }
            K.mlog("render use " + (new Date() - f) + "ms")
        },
        filterCod: function (R) {
            this.stat2("2.9?action=useringcod");
            G.filterCod(R.checked)
        },
        clkPicLink: function () {
            this.stat2("2.9?action=openitem_pic")
        },
        go: function (a) {
            if (Q.hasClass(a, "m-ungo")) {
                return
            }
            this.stat(Q.hasClass(a.parentNode, "m-go-box") ? "action=check" : "action=topcheck");
            var T = G.prepareSubmit();
            if (this.isGoing) {
                return
            }
            if (0 == T.cartIds.length) {
                alert("\u8bf7\u9009\u62e9\u5546\u54c1");
                return
            }
            var R = {};
            var W = G.isCod();
            var c = T.hasMallItems;
            if (!c) {
                R = {
                    item: T.tbCartData.join(","),
                    buyer_from: "cart",
                    from: "mall"
                }
            } else {
                var U = T.cartIds;
                var S = T.delCartIds;
                if (U.length >= 30) {
                    for (var V = 0, Y = U.length; V < Y; V++) {
                        U[V] = (U[V] - 0).toString(32)
                    }
                }
                if (S.length >= 30) {
                    for (var V = 0, Y = S.length; V < Y; V++) {
                        S[V] = (S[V] - 0).toString(32)
                    }
                }
                R = {
                    cartId: U.join(","),
                    delCartIds: S.join(","),
                    use_cod: W ? 1 : "false",
                    _input_charset: "utf-8",
                    buy_from: "cart",
                    site: window.siteStyle || "tm"
                }
            }
            var b = this;
            var X = function (f) {
                b.isGoing = true;
                if (c) {
                    var g = Q.create("<form>");
                    g.method = "post";
                    g.action = f || D.getConfig("api/go");
                    g.target = "_self";
                    g.style.display = "none";
                    for (var e in R) {
                        var d = Q.create("<input>");
                        d.name = e;
                        d.value = R[e];
                        g.appendChild(d)
                    }
                    document.body.appendChild(g);
                    g.submit()
                } else {
                    location.href = "http://buy." + I + "/auction/order/confirm_order.htm?" + K.param(R)
                }
            };
            var Z = D.getConfig("api/loginIndicator");
            K.getScript(Z + (-1 === Z.indexOf("?") ? "?" : "&") + K.param({
                cartIds: T.cartIds.join(","),
                "var": "login_indicator",
                t: +new Date(),
                isCod: W ? "use_cod=true" : ""
            }), {
                success: function () {
                    var d = window.login_indicator;
                    if (!d) {
                        return X()
                    }
                    if ((d.success && d.hasLoggedIn) || !d.success) {
                        X()
                    } else {
                        if (!d.hasLoggedIn) {
                            R.buyer_from = "cart_guest";
                            if (d.isFastBuy) {
                                R.from = W ? "cart_cod" : "cart_buynow";
                                R.use_cod = W;
                                X(b.fastbuyAPI)
                            } else {
                                if (d.popupWindow) {
                                    window.TC = {
                                        mods: {
                                            Go: {
                                                go: function (e) {
                                                    X()
                                                }
                                            }
                                        }
                                    };
                                    b.showLogin()
                                } else {
                                    X()
                                }
                            }
                        }
                    }
                },
                error: X,
                timeout: 5,
                charset: "uff-8"
            })
        },
        showLogin: function (S) {
            var R = this;
            var T = '<div class="skin"><iframe width="410" height="270" frameborder="0" scrolling="no" src="' + D.getConfig("api/login") + '"></iframe><a href="#" style="background:transparent url(http://img01.taobaocdn.com/tps/i1/T1EedkXbY_yJNsaZzT-300-812.png) no-repeat scroll -245px -32px; display:block; height:17px; position:absolute; right:6px; top:6px; width:17px;" title="\u5173\u95ed"><span style="display:none">\u5173\u95ed</span></a></div>';
            K.use("overlay", function (V, U) {
                if (!R.popup) {
                    R.popup = new U({
                        elCls: "login-now",
                        elStyle: {
                            position: L.ie === 6 ? "absolute" : "fixed",
                            height: 272,
                            width: 412,
                            background: "#fff"
                        },
                        align: {
                            points: ["cc", "cc"]
                        }
                    });
                    O.on(window, L.ie === 6 ? "resize scroll" : "resize", function () {
                        R.popup.center()
                    })
                }
                R.popup.set("content", T);
                R.popup.show();
                V.one(R.popup.get("el")).delegate("click", "a", R.popup.hide, R.popup)
            })
        },
        fav: function (S) {
            var R = this;
            R.stat2("2.9?action=addfav");
            S = B.getOrderEl(S);
            var T = G.find("order/" + B.getOrderId(S));
            K.jsonp(D.getConfig("api/fav"), {
                _tb_token_: D.getConfig("_tb_token_"),
                itemSkuList: T.itemId + ":" + T.skuId
            }, function (Z) {
                if (K.isPlainObject(Z)) {
                    Z = Z.result;
                    var Y = document.createElement("div");
                    var V = "<s></s>";
                    var U = Z.status;
                    if (U) {
                        V += '<div class="msg fav-status"><p class="ok">成功移至收藏夹</p></div>'
                    } else {
                        var X = Z.message;
                        if (8 === X.errorCode) {
                            V += '<div class="msg fav-status"><p class="attention">' + X.error + "</p></div>"
                        } else {
                            V += '<div class="msg fav-status"><p class="error">' + X.error + "</p></div>"
                        }
                    }
                    Y.innerHTML = V;
                    Y.className = "m-fav-tip";
                    document.body.appendChild(Y);
                    B.setOrderMask(Y, S);
                    var W = Q.get("div.msg", Y);
                    Q.css(W, "top", (Q.height(Y) - Q.height(W)) / 2 + "px");
                    K.later(function () {
                        if (U) {
                            R._del([S], {
                                showUndoDel: false
                            }, function () {
                                Q.remove(Y)
                            })
                        } else {
                            Q.remove(Y)
                        }
                    }, 2000)
                }
            })
        },
        undoDel: function () {
            var S = G.getRecentDelOrderIds();
            if (!S.length) {
                return
            }
            var R = this;
            E({
                url: D.getConfig("api/undel"),
                type: "post",
                dataType: "json",
                data: {
                    cart_ids: S.join(","),
                    _input_charset: "utf-8",
                    _tb_token_: D.getConfig("_tb_token_")
                },
                success: function (U) {
                    if (U.success) {
                        if (U.globalData && U.globalData.sss) {
                            D.Event.fire("sss", U.globalData.sss)
                        }
                        R.load({
                            tip: "重新加载购物车中，请稍候",
                            callback: function () {
                                Q.scrollIntoView(Q.parent("#order_" + S[0], "table"))
                            }
                        })
                    } else {
                        var T = U.error;
                        alert(T.errorMessage || "撤销本次删除失败，请重试")
                    }
                },
                error: function () {
                    alert("撤销本次删除失败，请重试")
                },
                timeout: 5
            })
        },
        del: function (R) {
            this.stat2("2.9?action=deleteitem");
            R = B.getOrderEl(R);
            B.highlightOrder(R);
            if (confirm("确认要删除该宝贝吗？")) {
                this._del([R])
            } else {
                B.unHighlightOrder(R)
            }
        },
        delCombo: function (S) {
            var R = Q.parent(S, "table.m-trunk");
            B.highlightTrunk(R);
            this.stat2("2.9?action=deleteitem");
            if (confirm("确定要删除 选中 的宝贝吗？")) {
                this._del(Q.query("tr.m-order", R))
            }
            B.unHighlightTrunk(R)
        },
        delInvalid: function () {
            if (confirm("确定要清除失效的宝贝吗？")) {
                this.stat2("2.9?action=delunvalid");
                this._del(Q.query("tr.m-invalid"), {
                    type: "deleteInvalid"
                })
            }
        },
        batchDel: function () {
            var R = [];
            this.stat2("2.9?action=bulkdelete");
            G.find("order", function (S) {
                if (S.checked && S.isValid) {
                    R.push(Q.get("#order_" + S.id))
                }
            });
            if (0 === R.length) {
                alert("请选择宝贝");
                return
            }
            if (confirm("确认要删除选中的宝贝吗？")) {
                this._del(R)
            }
        },
        _del: function (S, U, V) {
            if (!K.isArray(S)) {
                return
            }
            var R = this;
            var T = [];
            K.each(S, function (W) {
                T.push(B.getOrderId(W))
            });
            if (K.isFunction(U)) {
                V = U;
                U = {}
            }
            V = K.isFunction(V) ? V : function () { };
            U = K.merge({
                showUndoDel: true
            }, U);
            G.async("delete", T, {
                success: function () {
                    G.removeOrders(T);
                    B.removeOrders(S, U);
                    V();
                    R.afterDeleteCart()
                }
            }, U)
        },
        afterDeleteCart: function () {
            if (G.isEmpty()) {
                B.showEmpty()
            } else {
                G.calculate();
                var R = G.calculateStatusNum();
                if (0 == R.invalid) {
                    Q.removeClass("#cashier", "m-invalid-show")
                }
                B.updateStatus(R)
            }
        },
        plus: function (R) {
            this.stat2("2.9?action=add_num");
            this.alterAmount(R, 1)
        },
        minus: function (R) {
            this.stat2("2.9?action=minus_num");
            this.alterAmount(R, -1)
        },
        alterAmount: function (V, T) {
            if (-1 < V.className.indexOf("-disable")) {
                return
            }
            var U = Q.parent(V, "div.m-amount");
            var S = Q.get("input.m-text", U);
            if (!S) {
                return
            }
            var X = B.getOrderId(U);
            var R = S.value;
            S.value = parseInt(S.value, 10) + T;
            if (false === G.testAmount(X, {
                container: U.parentNode,
                amount: S,
                minus: Q.get("a.m-minus", U),
                plus: Q.get("a.m-plus", U)
            })) {
                return
            }
            var W = S.value;
            G.async("update", [X], {
                success: function (Y) {
                    if (Y.success) {
                        S.value = W;
                        G.activeNoAttenItem(X);
                        if (K.isArray(Y.list)) {
                            K.each(Y.list, function (a) {
                                var Z = a.id;
                                if (K.isArray(a.orders)) {
                                    if (a.gradeMessage) {
                                        B.updateGradeMessage(Z, a.gradeMessage)
                                    }
                                    K.each(a.orders, function (b) {
                                        var c = b.id;
                                        if (c == X) {
                                            b.amount = {
                                                now: W
                                            }
                                        }
                                        G.updateOrder(c, b)
                                    })
                                }
                            })
                        }
                    } else {
                        S.value = R
                    }
                },
                error: function (Y) {
                    S.value = R
                }
            }, {
                id: X,
                quantity: W
            })
        },
        selectTrunk: function (S) {
            var R = this;
            var U = S.checked;
            var V = S.value;
            G.resetCod();
            G.updateTrunkCheckStatus(V, U);
            if (U) {
                var T = [];
                G.children(G.find("trunk/" + V), "order", function (W) {
                    if (W.isValid && W.checked) {
                        T.push(W.id)
                    }
                });
                G.async("check", T, {
                    success: function () {
                        G.calculate()
                    }
                })
            } else {
                G.calculate()
            }
            R.stat("action=" + (U ? "selectshop" : "cancelshop"))
        },
        selectOrder: function (T) {
            var S = this;
            var U = T.checked;
            var R = T.value;
            G.resetCod();
            G.updateOrderCheckStatus(R, U);
            if (G.isTrunkHasSelectedValidOrder(G.parent("order/" + R, "trunk"))) {
                G.async("check", [R], {
                    success: function () {
                        G.calculate()
                    },
                    error: function () {
                        G.calculate()
                    }
                })
            } else {
                G.calculate()
            }
            S.stat("action=" + (U ? "selectitem" : "cancelitem"))
        },
        selectCart: function (S) {
            var R = this;
            var T = S.checked;
            G.resetCod();
            G.updateCartCheckStatus(T);
            Q.attr(R.eles.checkCartEls, "checked", T);
            Q.attr(Q.query("input.m-chk", R.eles.el), "checked", T);
            G.calculate();
            R.stat("action=" + (T ? "selectall" : "cancelall"))
        },
        toggleService: function (R) {
            B.toggleService(R)
        }
    };
    var C = "http://cart." + (D.isDaily() ? "daily.taobao.net" : "taobao.com") + "/sss.htm";
    D.Event.on("sss", function (R) {
        if (R && R.quantity) {
            K.getScript(C + "?quantity=" + R.quantity + "&tk=" + R.token + "&" + K.now())
        }
    });
    return H
}, {
    requires: ["dom", "event", "ajax", "json", "ua", "cart/global", "cart/model", "cart/view", "cart/topsearch", "cart/feedback"]
});