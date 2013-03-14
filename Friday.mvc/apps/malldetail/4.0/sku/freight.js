KISSY.add("malldetail/sku/freight", function (B, Z) {
    var K = B.mods.SKU, D = KISSY, R = D.DOM, b = D.Event;
    var A, L, E, I, C, Q, F, W, O, P, X = '<p><i class="i-prescription"></i>{{#if name}}<span class="tb-label">{{name}}</span>{{/if}}{{#if money}}<em>&yen;{{money}}\u5143</em> {{/if}}{{#if signText}}<b>{{signText}}</b>{{/if}}</p>', V = "{{#if name}}{{name}}: {{/if}}{{#if money}}{{money}}\u5143 {{/if}}{{#if signText}}<b>({{signText}})</b>{{/if}}", U = "<span>{{postage}}</span>";
    var a = document, H = a.body;
    function G() {
        if (!L || !L.deliverySkuMap) {
            return
        }
        var d = L.deliverySkuMap;
        var e = "";
        var T = U, g;
        c = K.selectSkuId;
        var S = c && d[c] ? c : "default";
        g = d[S];
        if (typeof g == "undefined") {
            for (var c in d) {
                if (typeof d[c] == "object") {
                    g = d[c];
                    break
                }
            }
        }
        if (g) {
            var f = g[0] ? g[0]["type"] : g.type;
            f == 1 && (T = X);
            if (g.length) {
                D.each(g, function (h) {
                    e += Z(T).render(h)
                })
            } else {
                e += Z(T).render(g)
            }
        }
        N(e)
    }
    function Y() {
        if (!P) {
            P = 1;
            if (!K.dqCity.getFirstAreaSold() || !K.areaSell.getFirstAreaSold()) {
                K.dqCity.notSell();
                return false
            }
        }
        if (!K.Price.getAreaSold(K.selectSkuId)) {
            K.dqCity.notSell()
        } else {
            if (K.Service.getHouseService()) {
                N("")
            } else {
                G()
            }
            K.dqCity.sell()
        }
    }
    function N(T, S) {
        if (A) {
            if (S) {
                C = T
            }
            Q = C || T;
            if (I) {
                clearTimeout(I)
            }
            I = setTimeout(function () {
                A.html(Q);
                C = null;
                Q = null;
                I = null
            }, 100)
        }
    }
    function J() {
        var S = D.one("#J_dqPostAgeCont");
        if (S) {
            var d = D.one("#friInfo");
            var T = D.one("#info");
            var c = S.parent();
            d.show();
            d.html("\u786e\u8ba4\u6536\u8d27\u5730\uff0c\u4ee5\u786e\u4fdd\u5728\u5546\u5bb6\u9500\u552e\u533a\u57df");
            T.hide();
            c.addClass(".tb-postLight");
            setTimeout(function () {
                c.removeClass(".tb-postLight");
                T.show();
                d.hide();
                c = d = T = null
            }, 4000)
        }
    }
    function M(e) {
        if (typeof e == "undefined") {
            L = {};
            return
        }
        L = e;
        W = B.cfg();
        E = K.selectSkuId;
        if (!A) {
            var d = D.one("#J_dqPostAgeCont") || D.one("#J_TreeSelectTrigger");
            if (d) {
                var c = D.one("#J_PostageToggleCont");
                c.html("<div id='friInfo'  style='display:none;'></div><div id='info' class='tmallPost'></div>");
                A = D.one("#info")
            } else {
                A = D.one("#info")
            }
        }
        Y();
        if (!O) {
            O = 1;
            K.PropertyHandler.onSkuChange(function () {
                if (W.isSupportCity) {
                    Y()
                }
            });
            if (A) {
                var T, f, S;
                var g = null;
                b.on(A, "mouseenter", function (i) {
                    var h = R.get("#J_Tmpost");
                    if (h) {
                        if (g) {
                            clearTimeout(g)
                        }
                        if (!T) {
                            T = R.create("<span>");
                            T.className = "coin-popup";
                            T.style.cssText = "top:" + (R.offset(h).top + 18) + "px;left:" + (R.offset(h).left - 24) + "px;display:none";
                            f = R.create("<span>");
                            f.className = "cor";
                            S = R.create("<span>");
                            S.className = "con";
                            S.innerHTML = '\u5168\u529b\u4e3a\u60a8\u51c6\u65f6\u9001\u8fbe~<a href="http://bbs.taobao.com/catalog/thread/567766-257748016.htm" target="_blank">\u66f4\u591a\u7269\u6d41\u4fdd\u969c&gt;&gt;</a>';
                            T.appendChild(f);
                            T.appendChild(S);
                            H.insertBefore(T, H.firstChild);
                            b.on(T, "mouseenter", function () {
                                if (g) {
                                    clearTimeout(g)
                                }
                                T.style.display = "inline"
                            });
                            b.on(T, "mouseleave", function () {
                                T.style.display = "none"
                            })
                        }
                        T.style.display = "inline"
                    }
                });
                b.on(A, "mouseleave", function () {
                    g = setTimeout(function () {
                        if (T) {
                            T.style.display = "none"
                        }
                    }, 100)
                })
            }
        }
        if (!F && W.isAreaSell && W.tradeType == 2) {
            J();
            F = true
        }
    }
    return { init: M, render: Y, renderNoSell: N }
}, { requires: ["template"] }); /*pub-1|2013-02-28 21:14:23*/