/*pub-1|2013-04-11 10:17:01*/
KISSY.add("cart/recommend", function (H, Q, M) {
    var L = "recentViewItemList";
    var E = "interestItemList";
    var P = "discountItemList";
    var J = "hotItemList";
    var D = "recentFavItemList";
    var A = H.Cookie.get("t");

    function K(V) {
        var T = 0,
            U = 0;
        var R = V.length;
        for (var S = 0; S < R; S++) {
            T = 31 * T + V.charCodeAt(U++);
            if (T > 2147483647 || T < 2147483648) {
                T = T & 4294967295
            }
        }
        return T
    }
    function C(S, R) {
        return (S & 65535) % R
    }
    var B = false;
    if (A) {
        B = C(K(A), 20) < 10
    } else {
        B = Math.floor(Math.random() * 1000) < 499
    }
    var O = B ? E : D;
    var N = function (V, U) {
        if (V.indexOf(".taobaocdn.") === -1) {
            var T = 0;
            for (var S = 0, R = V.length; S < R; S++) {
                T += V.charCodeAt(S)
            }
            T %= 4;
            T += 2;
//          V = "http://img0" + T + ".taobaocdn.com/" + (U || "tps") + "/i" + T + "/" + V
        }
        return V
    };
    var G = false;
    var I = false;
    var F = {
        init: function () {
            var a = this;
            a.container = Q.get("#J_Recommend");
            if (!a.container) {
                return
            }
            a.container.style.display = "none";
            //a.container.innerHTML = '<div class="hd"><h2><span>Tmall\u4e3a\u60a8\u63a8\u8350</span></h2><ul class="recommendNav"><li data-idx="0" class="' + D + '">\u6700\u8fd1\u6536\u85cf\u7684</li><li data-idx="1" class="' + L + '">\u6700\u8fd1\u6d4f\u89c8\u8fc7\u7684\u5546\u54c1</li><li data-idx="2" class="' + E + '">\u60a8\u53ef\u80fd\u611f\u5174\u8da3\u7684\u5546\u54c1</li><li data-idx="3" class="' + J + '">\u70ed\u5356\u5546\u54c1</li><li data-idx="4" class="' + P + '">\u4fc3\u9500\u4e2d\u7684\u5546\u54c1</li></ul></div><div class="bd"><div class="recommendCont ' + D + '"></div><div class="recommendCont ' + L + '"></div><div class="recommendCont ' + E + '"></div><div class="recommendCont ' + J + '"></div><div class="recommendCont ' + P + '"></div></div>';
            a.container.innerHTML = '<div class="hd"><h2><span>Tmall\u4e3a\u60a8\u63a8\u8350</span></h2><ul class="recommendNav"><li data-idx="0" class="' + D + '">\u6700\u7545\u9500\u7684\u5546\u54C1</li><li data-idx="1" class="' + L + '">\u6700\u65B0\u4E0A\u67B6\u7684\u5546\u54C1</li><li data-idx="2" class="' + E + '">\u60a8\u53ef\u80fd\u611f\u5174\u8da3\u7684\u5546\u54c1</li><li data-idx="3" class="' + J + '">\u70ed\u5356\u5546\u54c1</li><li data-idx="4" class="' + P + '">\u4fc3\u9500\u4e2d\u7684\u5546\u54c1</li></ul></div><div class="bd"><div class="recommendCont ' + D + '"></div><div class="recommendCont ' + L + '"></div><div class="recommendCont ' + E + '"></div><div class="recommendCont ' + J + '"></div><div class="recommendCont ' + P + '"></div></div>';
            a.carousels = [];
            a.triggers = Q.query("li", a.container);
            a.panels = Q.query("div.recommendCont", a.container);
            a.length = a.triggers.length;
            M.on(a.triggers, "click", function () {
                I = true;
                a.switchTo(Q.attr(this, "data-idx") - 0)
            });
            a.isMouseFocusInPanel = false;
            M.on(a.container, "mouseover", function () {
                a.isMouseFocusInPanel = true;
                M.remove(a.container, "mouseover", arguments.callee)
            });
            M.on(a.container, "mouseenter mouseleave", function (b) {
                a.isMouseFocusInPanel = "mouseenter" === b.type
            });
            var Y = Q.query("tr.m-order", "#mcartlist");
            var S = [];
            for (var V = 0; V < Y.length; V++) {
                if (!Q.hasClass(Y[V], "disable")) {
                    S.push(Q.attr(Y[V], "data-itemId"))
                }
            }
            a.loadedMod = {};
            var W = S.join(",");
            var X = +new Date();
            var Z = ["appId=03004&callback=recommend.renderRecentViewItemList", "appId=03006&itemID={itemids}&callback=recommend.renderHotItemList", "appId=03007&itemID={itemids}&callback=recommend.renderDiscountItemList"];
            var U = "appId=03038&callback=recommend.renderRecentFavList";
            var T = "appId=03005&itemID={itemids}&callback=recommend.renderInterestItemList";
            var R = location.href.match(/\bald=(\w+)\b/);
            if (R) {
                R = R[1];
                if ("all" === R) {
                    Z.push(U);
                    Z.push(T)
                } else {
                    if ("recent" === R) {
                        Z.push(U)
                    } else {
                        if ("interest" === R) {
                            Z.push(T)
                        }
                    }
                }
            } else {
                Z.push(O === D ? U : T)
            }
            H.each(Z, function (b) {
                //H.getScript("http://ald.taobao.com/recommend.htm?" + b.replace("{itemids}", W) + "&" + X + H.guid())
                H.getScript("http://www.linjuzaixian.com/CartPay/Home/Recommend?" + b.replace("{itemids}", W) + "&" + X + H.guid())
            });
            setTimeout(function () {
                if (G) {
                    return
                }
                for (var b in a.loadedMod) {
                    G = true;
                    a.container.style.display = "block";
                    a.switchTo(b);
                    I = true;
                    break
                }
            }, 5000)
        },
        renderRecentFavList: function (S) {
            var T = this.render(D, S);
            if (O === D) {
                if (T) {
                    this.switchTo(D);
                    G = true;
                    this.container.style.display = "block"
                } else {
                    for (var R in this.loadedMod) {
                        G = true;
                        this.container.style.display = "block";
                        this.switchTo(R);
                        I = true;
                        break
                    }
                }
            }
        },
        renderRecentViewItemList: function (R) {
            this.render(L, R)
        },
        renderInterestItemList: function (S) {
            var T = this.render(E, S);
            if (O === E) {
                if (T) {
                    this.switchTo(E);
                    G = true;
                    this.container.style.display = "block"
                } else {
                    for (var R in this.loadedMod) {
                        G = true;
                        this.container.style.display = "block";
                        this.switchTo(R);
                        I = true;
                        break
                    }
                }
            }
        },
        renderHotItemList: function (R) {
            this.render(J, R)
        },
        renderDiscountItemList: function (R) {
            this.render(P, R)
        },
        render: function (V, W) {
            if (!H.isArray(W) || W.length == 0) {
                return false
            }
            var S = this.container;
            var R = Q.get("div." + V, S);
            var U = Q.get("li." + V, S);
            R.innerHTML = "<textarea> " + this.renderList(W) + " </textarea>";
            R.style.display = "block";
            U.style.display = "block";
            Q.data(U, "loaded", true);
            var T = W[0].area_url;
            T && Q.attr(U, "data-area-url", T);
            this.loadedMod[V] = true;
            return true
        },
        switchTo: function (S) {
            if (typeof S == "string") {
                var U = Q.get("li." + S, this.container);
                if (U) {
                    S = Q.attr(U, "data-idx") - 0
                } else {
                    return
                }
            }
            if (S >= this.length || S == this.idx) {
                return
            }
            this.checkLazyload(S);
            if (this.prevTrigger) {
                Q.removeClass(this.prevTrigger, "curNav");
                this.prevPanel.style.display = "none"
            }
            this.prevTrigger = this.triggers[S];
            this.prevPanel = this.panels[S];
            this.idx = S;
            var X = this.carousels;
            for (var V = 0, R = X.length; V < R; V++) {
                var W = X[V];
                if (W.panelIdx === S) {
                    W.start()
                } else {
                    W.stop()
                }
            }
            Q.addClass(this.prevTrigger, "curNav");
            this.prevPanel.style.display = "block";
            var T = Q.attr(this.prevTrigger, "data-area-url");
            T && (new Image().src = T + "&" + +new Date)
        },
        autoNext: function () {
            if (this.isMouseFocusInPanel || !I) {
                return
            }
            var T = this.idx;
            var R = this.length;
            do {
                T++;
                if (T >= R) {
                    T = 0
                }
                var S = this.triggers[T];
                if (Q.data(S, "loaded")) {
                    break
                }
            } while (true);
            this.switchTo(T)
        },
        checkLazyload: function (R) {
            var U = this;
            var T = this.panels[R];
            var S = Q.get("textarea", T);
            if (!S) {
                return
            }
            T.innerHTML = S.value;
            if (Q.get("ul.ks-switchable-nav", T)) {
                H.use("switchable,datalazyload", function (X, W, Y) {
                    var Z = new W.Carousel(T, {
                        effect: "scrollx",
                        easing: "easeOutStrong",
                        viewSize: [915, 297],
                        circular: true,
                        prevBtnCls: "prev",
                        nextBtnCls: "next",
                        steps: 5,
                        interval: 5,
                        autoplay: true,
                        nativeAnim: false,
                        lazyDataType: "img-src"
                    });
                    Z.on("beforeSwitch", function (a) {
                        if (0 === a.toIndex && !U.isMouseFocusInPanel) {
                            U.autoNext()
                        }
                    });
                    Z.panelIdx = R;
                    U.carousels.push(Z)
                })
            } else {
                var V = {
                    panelIdx: R,
                    paused: false,
                    stop: function () {
                        if (this.timer) {
                            clearInterval(this.timer)
                        }
                        this.paused = true
                    },
                    start: function () {
                        var W = this;
                        W.stop();
                        W.paused = false;
                        W.timer = setInterval(function () {
                            if (!W.paused) {
                                U.autoNext()
                            }
                        }, 5000)
                    }
                };
                V.start();
                U.carousels.push(V)
            }
        },
        renderHeader: function (R) {
            return '<li data-url="#">' + R + "</li>"
        },
        renderList: function (W) {
            var X = [];
            for (var V = 0, S = W.length; V < S; V++) {
                var T = W[V];
                T.url = T.url.replace(".N", "." + V);
                var U = '<li><p class="img"><a target="_blank" href="' + T.url + '" title="' + T.title + '"><img ' + (V < 5 ? "src" : "data-ks-lazyload-custom") + '="' + N(T.img) + '" alt="' + T.title + '"/></a></p>';
                if (T.promotion_price) {
                    U += '<p class="price"><strong>' + T.promotion_price + "</strong><del>" + T.price + "</del>"
                } else {
                    U += '<p class="price"><strong>' + T.price + "</strong>"
                }
                U += "</p>";
                U += '<p class="title"><a target="_blank" href="' + T.url + '" title="' + T.title + '">' + T.title + "</a></p>";
                hasSellNum = "weekly_sell" in T;
                hasComment = "commentNum" in T;
                if (hasSellNum || hasComment) {
                    U += '<p class="summary">';
                    if (hasSellNum) {
                        U += "\u5468\u9500\u91cf:<b>" + T.weekly_sell + "</b>"
                    }
                    if (hasComment) {
                        U += '<a target="_blank" title="' + T.commentNum + '\u4e2a\u8bc4\u8bba" class="commentUrl" href="' + T.url + '&on_comment=1&J_TabBar">\u603b\u8bc4\u8bba:' + T.commentNum + "</a>"
                    }
                    U += "</p>"
                }
                U += "</li>";
                X.push(U)
            }
            X = '<div class="recommendList"><ul class="ks-switchable-content">' + X.join("") + "</ul></div>";
            if (5 < S) {
                var R = ['<li class="ks-active">&bull;</li>'],
                    S = Math.ceil(S / 5) - 1;
                while (S) {
                    S--;
                    R.push("<li>&bull;</li>")
                }
                X += '<div class="trigger prev"><s></s></div><div class="trigger next"><s></s></div><ul class="ks-switchable-nav">' + R.join("") + "</ul>"
            }
            return X
        }
    };
    window.recommend = F;
    return F
}, {
    requires: ["dom", "event"]
});