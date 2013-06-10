/*pub-1|2013-06-05 17:41:08*/KISSY.add("order/app", function (g, A, E, d, c, r, v, l, i, B, q, D, w, x, o, k, b, n, a, z, m, f) {
    var C;
    var u = { init: function () {
        var F = this;
        var H = g.now();
        m("tmalljy.2.6?action=showpage");
        y();
        var G = window.orderData;
        var I = G.globalData || {};
        if (false === I.isAuthToHK) {
            g.use("order/biz/authhk")
        }
        q.init(G.addrData, I);
        l.on("calculate", function (J) {
            A.val("#F_cartItems", this.get("cartItems"))
        });
        l.on("after_usedPointsChange calculate", function () {
            var J = l.get("_totalFee");
            J -= l.get("_usedPoints") || 0;
            this.set("_actualPaid", J);
            A.val("#F_totalFee", J);
            A.html("#J_ActualPaid", v.toMoney(J))
        });
        l.on("calculateBundleFee", function (J) {
            var K = J.data;
            A.html("#J_BundleSum" + K.id, v.toMoney(K._totalFee))
        });
        l.on("afterIsCodChange", function () {
            F.applyCod()
        });
        l.on("calculateMainFee", function (K) {
            var J = K.data;
            A.val(A.get("input.actualPaid", "#main" + J.id), J._actualPaid)
        });
        g.each({ num: x, itemPromo: o }, function (K, J) {
            K.on("change", function (L) {
                t({ id: L.orderData.id, type: J, mains: [L.mainData] })
            })
        });
        k.on("change", function (J) {
            t({ id: J.bundleData.id, type: "shopPromo", mains: l.children(J.bundleData) })
        });
        w.on("change", function () {
            l.calculate()
        });
        q.on("change", function (J) {
            m("tmalljy.2.6?action=address");
            u.reload(J.data)
        });
        p(G);
        m("initTime=" + (g.now() - H) + "&count=" + l.find("main").length + ":" + l.find("bundle").length + ":" + l.find("order").length + "&renderTime=" + C, true)
    }, reload: function (F) {
        B.show("\u52a0\u8f7d\u8ba2\u5355\u6570\u636e\u4e2d\uff0c\u8bf7\u7a0d\u5019");
        var H = { all: 1, dref: A.val("#F_dref"), hex: A.val("#F_hex"), combo: A.val("#F_combo"), cartId: A.val("#F_cartId"), useCod: A.val("#F_isCod"), buyParam: A.val("#F_buyParam"), extraParam: A.val("#F_globalExtraParameter"), deliveryId: F.id, lgStationId: F.lgStationId, lgShopId: F.lgShopId, lgForwardId: F.lgForwardId, divisionCode: F.dist || F.city, delivery_city_code: A.val("#F_deliveryCityCode"), delivery_zone_code: A.val("#F_deliveryZoneCode") };
        var G = A.get("#F_jhsKey");
        if (G) {
            H[G.name] = G.value
        }
        g.trace(H);
        d({ url: "/json/asyncRenderOrderV2.do", type: "post", data: H, dataType: "json", timeout: 12, success: function (I) {
            if (!I.success) {
                location.href = "/error.htm?errorCode=" + I.error.errorCode;
                return
            }
            l.fire("reRender");
            p(I);
            B.hide()
        }, error: function () {
            location.href = "/error.htm?errorCode=SYSTEM_ERROR&ajaxerr"
        }
        })
    }, applyCod: function () {
        var F = l.get("isCod");
        A[F ? "addClass" : "removeClass"](document.documentElement, "orders-cod");
        (function (G) {
            if (3 > G.length) {
                return
            }
            //2013-06-10 wanghaichuan 
            //A.html(A.get("div.step-name", G[l.get("isBuyNow") ? 1 : 2]), F ? "\u786e\u8ba4\u8d27\u5230\u4ed8\u6b3e\u8ba2\u5355\u4fe1\u606f" : "\u4ed8\u6b3e\u5230\u652f\u4ed8\u5b9d")
            A.html(A.get("div.step-name", G[l.get("isBuyNow") ? 1 : 2]), F ? "\u786e\u8ba4\u8d27\u5230\u4ed8\u6b3e\u8ba2\u5355\u4fe1\u606f" : "\u8BA2\u5355\u63D0\u4EA4")
        })(A.children(A.get("ol", "#J_Flowstep")));
        (function (G) {
            A.html(A.get("span.hd", G), F ? "\u5546\u54c1\u5408\u8ba1\uff08\u4e0d\u542b\u8fd0\u8d39\uff09\uff1a" : "\u5b9e\u4ed8\u6b3e\uff1a")
        })(A.get("p.pay-info", "#J_checkbar"));
        A.html(A.query("span.isIncPostage", "#J_orders"), F ? "(\u4e0d\u542b\u8fd0\u8d39)\uff1a" : "(\u542b\u8fd0\u8d39)");
        A.attr("#J_orderForm", "action", F ? ("http://delivery." + (i.daily ? "daily.tmall.net" : "tmall.com") + "/cod/cod_payway.htm") : "order_result.htm");
        A.val("#F_action", F ? "cod/codOrderSwitcherAction" : "/order/confirmOrderAction");
        A.attr("#F_doConfirm", "name", F ? "event_submit_do_codSwitcher" : "event_submit_do_confirm")
    }
    };
    function p(H) {
        l.fill(H);
        var F = q.getCurAddrData();
        if (!F) {
            return
        }
        l.set("_addrData", F);
        A.val("#F_deliveryName", F.name);
        A.val("#F_deliveryMobile", F.mobi || F.tele);
        A.val("#F_deliveryCode", F.dist);
        A.val("#F_deliveryAddr", F.addr);
        A.val("#F_deliveryPostCode", F.post);
        A.val("#F_deliveryId", F.id);
        A.val("#F_lgForwardId", F.lgForwardId);
        A.val("#F_lgStationId", F.lgStationId);
        A.val("#F_lgShopId", F.lgShopId);
        (function (I) {
            if (I) {
                return A.val("#F_globalExtraParameter", I)
            }
            l.set("extraParam", A.val("#F_globalExtraParameter"))
        })(l.get("extraParam"));
        (function (I) {
            if (I) {
                A.val("#F_neoEtaoParam", I)
            }
        })(l.get("neoEtaoParam"));
        A.val("#F_shopId", l.get("shopId"));
        A.val("#F_cartItems", l.get("cartItems"));
        A.val("#F_secret", l.get("secret"));
        u.applyCod();
        var G = g.now();
        e();
        C = g.now() - G;
        i.make();
        g.each([D, x, o, k, w, b, a], function (I) {
            I.init();
            g.trace("[" + I.name + "] inited")
        });
        l.calculate();
        setTimeout(function () {
            g.each(A.query("div.scroll-promos", "#J_orders"), function (I) {
                if (1 < A.query("div.promo-item", I).length) {
                    setTimeout(function () {
                        g.use("switchable", function (K, J) {
                            try {
                                var M = new J.Slide(I, { hasTriggers: false, effect: "scrolly", interval: 3, duration: 0.5 })
                            } catch (L) {
                            }
                        })
                    }, Math.random() * 1500)
                }
            })
        }, 3000);
        if (window.Light) {
            Light.light()
        }
        (function (I) {
            if (!I || !l.get("_hasValidOrder")) {
                return
            }
            I.style.visibility = "visible";
            setTimeout(function () {
                g.use("node", function (K, J) {
                    new J(I).fadeOut()
                })
            }, 5000)
        })(A.get("#R_reConfirmTip"))
    }
    function e() {
        var G = A.get("#J_orders");
        var K = false;
        var F = "";
        if (A.get("h2", G)) {
            F = '<span id="R_reConfirmTip" class="reconfirm-tip">\u66f4\u6362\u5730\u5740\u540e\uff0c\u60a8\u9700\u8981\u91cd\u65b0\u786e\u8ba4\u8ba2\u5355\u4fe1\u606f<s></s></span>'
        }
        var H = "<h2>\u786e\u8ba4\u8ba2\u5355\u4fe1\u606f" + F + "</h2>";
        if ("wrt" === l.get("mode")) {
            H = n.toAttention() + H;
            A.addClass(G, "wrt-list")
        } else {
            A.removeClass(G, "wrt-list")
        }
        var L = "";
        var J = "";
        var I = {};
        var N = true;
        l.walk(function (R) {
            var P = R.id;
            var O = R.type;
            var Q = '<table class="grid-bundle" data-bundle="' + P + '">';
            Q += r.toBundleHeader(R);
            l.children(R, function (S) {
                var T = S.id;
                Q += '<tbody><tr id="main' + T + '" class="grid-main" data-main="' + T + '">';
                Q += '<td colspan="5" class="tube-main"><table>';
                l.children(S, function (V, U) {
                    S.shopName = V.shopName;
                    Q += r.toOrder(V, { idx: U, type: O, mainId: T, bundleId: P })
                });
                Q += "</table></td>";

                //2013-06-10 wanghaichuan
                Q += '<td class="tube-postage" style="text-align:center">\u5FEB\u9012</td>';
                //Q += '<td class="tube-postage">';
                //Q += w.render(S);
                //Q += b.render(S);
                //Q += v.toHidden({ cls: "actualPaid", name: T + "|actualPaidFee", value: S._actualPaid });
                //Q += "</td>";

                Q += "</tr></tbody>";
                if (S.shopVipLevel && S.multiReturnPoint && !(S.sellerId in I)) {
                    I[S.sellerId] = true;
                    J += "<div" + (N ? ' class="first"' : "") + '><span title="' + S.shopName + '" class="name">' + S.shopName + '</span><span class="icon icon-' + S.shopVipLevel + '"></span><span class="multi">\u9001' + S.multiReturnPoint + "\u500d</span></div>";
                    N = false
                }
            });
            Q += r.toBundleFooter(R) + "</table>";
            L += '<div class="bundle">' + Q + "</div>";
            K = true
        });
        G.innerHTML = H + L;
        l.set("_shopVipHtml", J);
        var M = A.get("#J_checkbar");
        if (K) {
            A[l.get("isBuyNow") ? "addClass" : "removeClass"](G, "shine-list");
            M.innerHTML = r.toCheckbar();
            M.style.display = "block"
        } else {
            M.style.display = "none"
        }
        l.set("_hasValidOrder", K);
        (function (P, O) {
            P.innerHTML = O
        })(A.get("#J_unvalids"), r.toUnable());
        l.dump()
    }
    function y() {
        E.on(document, "click", function (G) {
            var H = G.target;
            m(A.attr(H, "data-mm"));
            if (A.hasClass(H.parentNode, "ww-light")) {
                m("tmalljy.2.6?action=wangwang")
            }
            var F = (A.attr(H, "data-evt") || "").split(":");
            if (2 != F.length) {
                return
            }
            if ("A" === H.nodeName) {
                G.preventDefault()
            }
            g.use("order/" + F[0], function (J, I) {
                I[F[1]](H, G.type)
            })
        })
    }
    function t(G) {
        var F = l.get("_addrData");
        var H = { list: h(G.mains), globalData: { id: G.id, type: G.type, useCod: A.val("#F_isCod"), isBuyNow: l.get("isBuyNow"), extraParam: l.get("extraParam"), deliveryId: F.id, lgStationId: F.lgStationId, lgForwardId: F.lgForwardId, lgShopId: F.lgShopId} };
        g.trace(H);
        d({ url: "../json/asyncRenderPartOrdersV2.do", type: "post", data: { json: c.stringify(H) }, dataType: "json", timeout: 6, success: function (I) {
            if (I.success) {
                var J = I.globalData;
                if (J) {
                    l.set("canUseTmallCouponCard", J.canUseTmallCouponCard)
                }
                l.merge(I.list);
                l.calculate()
            } else {
                s(I.error.errorMessage, G)
            }
        }, error: function () {
            s("\u8bf7\u6c42\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5", G)
        }
        })
    }
    function s(G, F) {
        B.show(G);
        g.later(function () {
            B.hide()
        }, 1000);
        l.fire("partError", { data: F })
    }
    function h(G) {
        var H = [];
        var F = {};
        g.each(G, function (L) {
            var I = g.isPlainObject(L) ? L : l.find("main/" + L);
            var J = I.id;
            if (J in F) {
                return
            }
            var M = l.get("assocs");
            if (g.isPlainObject(M)) {
                g.each(M[J], function (N) {
                    if (N in F) {
                        return
                    }
                    F[N] = true;
                    H.push(j(l.find("main/" + N)))
                })
            } else {
                var K = I.sellerId;
                l.find("main", function (N) {
                    if (N.sellerId !== K) {
                        return
                    }
                    F[N.id] = true;
                    H.push(j(N))
                })
            }
        });
        return H
    }
    function j(F) {
        var G = [];
        l.children(F, function (I) {
            G.push({ id: I.id, now: I.amount.__now || I.amount.now, cbid: I.cbid, skuId: I.skuId, cbopt: I.cbopt, itemId: I.itemId, promoId: I.__promoId || I._promoId || 0, extraParam: I.extraParam, selectedService: I._selectedServiceList })
        });
        var H = l.parent(F);
        return { id: F.id, orders: G, extraParam: F.extraParam, shopPromoId: H.__promoId || H._promoId || 0 }
    }
    window.Model = l;
    return u
}, { requires: ["dom", "event", "ajax", "json", "order/render/core", "order/render/common", "order/model", "order/util", "order/util/gracetip", "order/biz/addr", "order/biz/point", "order/biz/postage", "order/biz/amount", "order/biz/promo", "order/biz/shoppromo", "order/biz/insure", "order/biz/wrt", "order/biz/paytype", "order/biz/coupon", "order/biz/mmstat", "order/util/feedback"] }); 
