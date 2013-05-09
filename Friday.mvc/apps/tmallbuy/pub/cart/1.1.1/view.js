/*pub-1|2013-04-11 10:17:00*/
KISSY.add("cart/view", function (D, V, Y, B) {
    var Z = document;
    var K = Z.body;
    var M = D.isPlainObject;
    var J = D.isArray;
    var I = B.toHtml;
    var R = B.toMoney;
    var C = B.promos;
    var W = B.icons;
    var P = {
        init: function () {
            var S = V.get("#mcart");
            this.eles = {
                container: S,
                goEls: V.query("button.m-go", S),
                cartChkEls: V.query("input.m-chk-all", S)
            }
        },
        reset: function () {
            V.html("#mcartlist", "")
        },
        renderError: function (a) {
            var S = Z.createElement("div");
            S.innerHTML = '<div class="err-msg">' + a + "</div>";
            S.className = "err";
            this.eles.container.appendChild(S)
        },
        getOrderId: function (S) {
            S = this.getOrderEl(S);
            if (S) {
                return V.attr(S, "data-orderId")
            }
        },
        getOrderEl: function (S) {
            return V.test(S, "tr.m-order") ? S : V.parent(S, "tr.m-order")
        },
        renderOrder: function (d, c) {
            var j = this;
            var e = d.cartId;
            var i = d.isValid;
            var f = c.type;
            var a = '<tr id="order_' + e + '" data-itemId="' + d.itemId + '" data-orderId="' + e + '" class="m-order ' + (i ? "m-selected" : "m-invalid") + (d.services ? " m-order-has-service" : "") + '">';
            var g = "";
            if ("shop" !== f) {
                g += d.shopName ? ('<p class="m-shop-name"><a data-log="2.9?action=openshop" href="' + (d.shopUrl || B.toShopUrl(d.sellerId)) + '" target="_blank">' + d.shopName + "</a>" + B.ww(d.seller) + "</p>") : ""
            }
            a += '<td class="m-col-chk">' + Q(e, i, f, d.checked) + "</td>";
            if (!d.itemIcon) {
                var h = d.icons;
                if (d.trial) {
                    h = [{
                        type: "trial",
                        title: d.trial.message
                    }].concat(h)
                }
                if (d.energy) {
                    h.push({
                        type: "energy",
                        fee: R(d.energy)
                    })
                }
                a += '<td class="m-col-title"><div class="m-col-img"><a class="m-img-trigger" href="' + I(d.url) + '" target="_blank"><img height="50" class="m-order-img" src="' + d.pic + '" data-job="clkPicLink" /></a></div><div class="m-col-meta"><p class="m-title-p"><a class="m-title" data-log="2.9?action=openitem_txt" title="' + d.title + '" href="' + I(d.url) + '" target="_blank">' + d.title + "</a></p>" + G(d.skus) + L(d.shipTime) + D.substitute(A(h), d) + g + "</div></td>"
            } else {
                a += '<td class="m-col-title"><div class="m-col-img"><a class="m-img-trigger" href="' + I(d.url) + '" target="_blank"><img height="50" class="m-order-img" src="' + d.pic + '" data-job="clkPicLink" /></a></div><div class="m-col-meta"><p class="m-title-p"><a class="m-title" data-log="2.9?action=openitem_txt" title="' + d.title + '" href="' + I(d.url) + '" target="_blank">' + d.title + "</a></p>" + N(d.itemIcon) + G(d.skus) + L(d.shipTime) + g + "</div></td>"
            }
            var b = d.price || {};
            a += '<td class="m-col-price">' + (i ? U(b) : "-") + "</td>";
            var S = d.amount || {};
            if (i && "combo" !== f) {
                a += '<td class="m-col-amount"><div class="m-amount"><a href="#minus" class="m-minus" data-job="minus"></a><input type="text" value="' + S.now + '" class="m-text" autocomplete="off"><a href="#plus" class="m-plus" data-job="plus"></a></div></td>'
            } else {
                a += '<td class="m-col-amount">' + S.now + "</td>"
            }
            a += '<td class="m-col-agio"><div class="m-promo-list">' + (i ? j.renderPromos(d.promos) : "-") + "</div></td>";
            a += '<td class="m-col-total">' + (i ? X(b.sum) : "-") + "</em></td>";
            var k = T(d.services, {
                cartId: e,
                amount: S.now,
                serviceFee: b.service
            });
            if ("combo" === c.type) {
                if (0 === c.idx) {
                    a += '<td rowspan="' + c.bigRowSpan + '" class="m-col-operate"><p><a title="\u5220\u9664" data-job="delCombo" class="m-delCombo" href="#delCombo">\u5220\u9664\u5957\u9910</a></p></td>'
                }
            } else {
                a += '<td rowspan="' + (k ? "2" : "1") + '" class="m-col-operate"><p><a title="\u79fb\u81f3\u6536\u85cf\u5939" data-job="fav" class="m-fav" href="#fav">\u6536\u85CF\u5E97\u94FA</a></p><p><a title="\u5220\u9664" data-job="del" class="m-del" href="#del">\u5220\u9664</a></p></td>'
            }
            a += "</tr>";
            a += k;
            return a
        },
        renderPromos: function (f) {
            var d = "";
            if (J(f) && f.length) {
                for (var c = 0, a = f.length; c < a; c++) {
                    var b = f[c];
                    d += '<span class="m-promo-item">';
                    if (J(b)) {
                        for (var S = 0, e = b.length; S < e; S++) {
                            d += F(b[S])
                        }
                    } else {
                        d += F(b)
                    }
                    d += "</span>"
                }
            } else {
                d = "-"
            }
            return d
        },
        highlightOrder: function (a) {
            this.unHighlightOrder(a);
            var S = Z.createElement("div");
            S.className = "m-highlight";
            S.id = a.id + "_highlight";
            K.appendChild(S);
            this.setOrderMask(S, a)
        },
        highlightTrunk: function (S) {
            this.unHighlightTrunk(S);
            var a = Z.createElement("div");
            a.className = "m-highlight";
            a.id = S.id + "_highlight";
            K.appendChild(a);
            this.setTrunkMask(a, S)
        },
        unHighlightOrder: function (a) {
            var S = Z.getElementById(a.id + "_highlight");
            S && K.removeChild(S)
        },
        unHighlightTrunk: function (S) {
            var a = Z.getElementById(S.id + "_highlight");
            a && K.removeChild(a)
        },
        setTrunkMask: function (d, b) {
            var e = V.query("tbody.m-bundle", b);
            var f = V.offset(e[0]);
            var a = 0;
            for (var c = 0, S = e.length; c < S; c++) {
                a += V.height(e[c])
            }
            V.css(d, {
                top: f.top,
                left: f.left,
                width: V.width(e[0]) - 4,
                height: a - 4,
                position: "absolute"
            })
        },
        setOrderMask: function (c, b) {
            var d = V.offset(b);
            var S = V.height(b);
            var a = V.next(b);
            if (V.test(a, "tr.m-service")) {
                S += V.height(a)
            }
            V.css(c, {
                top: d.top,
                left: d.left,
                width: V.width(b) - 4,
                height: S - 4,
                position: "absolute"
            })
        },
        removeOrders: function (c, d) {
            if (!D.isArray(c)) {
                return
            }
            var S = c.length;
            if (0 === S) {
                return
            }
            var a = this;
            for (var b = S - 1; b > 0; b--) {
                a.removeOrder(c[b])
            }
            a.removeOrder(c[0], function (e) {
                if (d.showUndoDel) {
                    a.showUndoMsg(e, S)
                }
            })
        },
        removeOrder: function (a, b) {
            var S = this;
            S.unHighlightOrder(a);
            D.one(a).fadeOut(0.5, function () {
                b && b(a);
                S.removeOrderFast(a)
            })
        },
        removeOrderFast: function (b) {
            if (!b) {
                return
            }
            var S = V.parent(b, "table.m-trunk");
            var a = V.next(b);
            if (V.test(a, "tr.m-service")) {
                V.remove(a)
            }
            Y.remove(V.get("input.m-text", b), "keyup");
            V.remove(b);
            if (0 === V.query(".m-order", S).length) {
                V.remove(S)
            }
        },
        updateOrderCheckStatus: function (b, S) {
            var a = V.get("#order_" + b);
            V.attr(V.get("input.m-chk", a), "checked", S);
            V[S ? "addClass" : "removeClass"](a, "m-selected")
        },
        updateTrunkCheckStatus: function (b, a) {
            var S = V.get("#trunk_" + b);
            if (S) {
                V.attr(V.get("input.m-chk-trunk", S), "checked", a)
            }
        },
        updateCartCheckStatus: function (S) {
            V.attr(this.eles.cartChkEls, "checked", S)
        },
        updateGradeMessage: function (a, b) {
            var S = V.get("#trunk_" + a);
            if (S) {
                V.html(V.get("tbody.m-grade-msg td.m-box"), b)
            }
        },
        showUndoMsg: function (b, S) {
            var a = this.undoEl;
            var c;
            if (!a) {
                a = Z.createElement("tr");
                c = Z.createElement("td");
                c.colSpan = 7;
                a.appendChild(c);
                a.className = "m-undo-msg";
                this.undoEl = a
            } else {
                c = V.get("td", a)
            }
            c.innerHTML = "<p>\u6210\u529f\u5220\u9664 <b>" + (S || 1) + '</b> \u4ef6\u5b9d\u8d1d\uff0c\u5982\u6709\u8bef\uff0c\u53ef<a href="#undo" data-job="undoDel">\u64a4\u9500\u672c\u6b21\u5220\u9664</a></p>';
            V.insertBefore(a, b);
            return a
        },
        updatePrice: function (b, a) {
            var S = V.get("#order_" + b);
            if (!S || !a) {
                return
            }
            O(V.get("td.m-col-price", S), U(a));
            O(V.get("td.m-col-total", S), X(a.sum))
        },
        updatePromos: function (c, b) {
            var S = V.get("td.m-col-agio", "#order_" + c);
            if (!S || !b) {
                return
            }
            var a = V.get("div.m-promo-list", S);
            if (a) {
                Y.on(V.query(".m-promo-icon", a), "mouseenter mouseleave");
                O(a, this.renderPromos(b));
                Y.on(V.query(".m-promo-icon", a), "mouseenter mouseleave", function (d) {
                    if ("mouseenter" === d.type) {
                        P.showBubbleMsg(this, V.attr(this, "data-desc"))
                    } else {
                        P.hideBubbleMsg(this)
                    }
                })
            }
        },
        updateService: function (d, c, S) {
            var b = V.get("#order_" + d + "_service");
            if (!b) {
                return
            }
            var a = V.query("span.m-sum", b);
            if (a.length) {
                D.each(c, function (f, e) {
                    a[e].innerHTML = R(f.sum)
                })
            }
            V.html(V.query("em.m-amount", b), S.amount);
            V.html(V.get("em.m-sum", b), R(S.serviceFee))
        },
        updateSum: function (S) {
            O(V.query("em.m-total-fee", "#mcart"), R(S))
        },
        updateStatus: function (c) {
            var S = V.get("#J_StatusBar");
            if (!S) {
                return
            }
            D.each(["normal", "disable", "invalid"], function (e) {
                var f = V.get("div." + e, S);
                if (!f) {
                    return
                }
                var g = c[e];
                if (g) {
                    f.style.width = 100 * (g / 50) + "px";
                    f.title = V.attr(f, "data-title") + ":" + g + "\u4ef6";
                    V.css(f, "display", "block")
                } else {
                    V.css(f, "display", "none")
                }
            });
            V[c.total > 45 ? "addClass" : "removeClass"](S, "status-full");
            V.get("span.J_TotalNum", S).innerHTML = c.total;
            var b = c.isNotAttenItems;
            if (b && b.length) {
                if (!V.get("div.clear-box", S)) {
                    var a = V.create("<div></div>");
                    a.innerHTML = '\u8d2d\u7269\u8f66\u542b\u6709\u957f\u671f\u672a\u5173\u6ce8\u5546\u54c1 <span class="btn" data-job="clearNoAttention">\u4f7f\u7528\u6e05\u7406\u52a9\u624b</span>';
                    a.className = "clear-box";
                    V.get("div.status-box", S).appendChild(a)
                }
                V.addClass(S, "status-clear");
                new Image().src = "http://log.mmstat.com/tmalljy.2.9?clear=showbutton"
            } else {
                V.removeClass(S, "status-clear")
            }
            try {
                TB.Global.setCartNum(c.total)
            } catch (d) { }
        },
        toggleService: function (S) {
            var a = V.parent(S, "tr");
            var c = V.hasClass(a, "m-service-expand") ? T : E;
            var b = V.attr(a, "data-cartId");
            D.use("cart/model", function (d, f) {
                var e = f.find("order/" + b);
                if (!e) {
                    return
                }
                a.parentNode.replaceChild(V.create(c(e.services, {
                    cartId: b,
                    amount: e.amount.now,
                    serviceFee: e.price.service
                })), a)
            })
        },
        showBubbleMsg: function (S, c) {
            var a = this.bubbleEl;
            if (!a) {
                a = Z.createElement("div");
                a.className = "m-bubble-msg";
                K.appendChild(a);
                this.bubbleEl = a
            }
            a.innerHTML = c;
            a.style.display = "block";
            var b = V.offset(S);
            V.css(a, {
                top: b.top - a.offsetHeight - 2,
                left: b.left - 20
            })
        },
        hideBubbleMsg: function (S) {
            this.bubbleEl && (this.bubbleEl.style.display = "none")
        },
        floodwood: function (b) {
            if (6 === D.UA.ie || !b) {
                return
            }
            var d = Z.createElement("div");
            var a = b.offsetHeight;
            V.css(d, {
                height: a,
                padding: "5px 0"
            });
            V.insertBefore(d, b);
            d.appendChild(b);
            var c = false;
            var S = function () {
                if (V.scrollTop() + V.viewportHeight() - a < V.offset(d).top) {
                    if (!c) {
                        c = true;
                        V.addClass(b, "m-floodwood")
                    }
                } else {
                    c = false;
                    V.removeClass(b, "m-floodwood")
                }
            };
            S();
            Y.on(window, "scroll", S)
        },
        toggleFilterCod: function (S) {
            V[S ? "addClass" : "removeClass"]("#cashier", "m-show-cod")
        },
        toggleGoStatus: function (S) {
            V[S ? "removeClass" : "addClass"](this.eles.goEls, "m-ungo")
        },
        updateCart: function (S) {
            this.updateSum(S.sum);
            this.toggleFilterCod(S.hasCod);
            this.toggleGoStatus(S.checkedNum);
            V[S.checkedNum ? "removeClass" : "addClass"](this.eles.container, "m-none-select")
        },
        showEmpty: function () {
            V.html("#mcart", V.val("#J_EmptyHtml"))
        },
        showCodTip: function (a) {
            var S = this.codTipEl;
            if (!S) {
                S = Z.createElement("div");
                S.className = "m-cod-tip";
                S.innerHTML = '<div class="m-inner"><p></p></div><a href="#closeCodTip" class="m-close" data-job="closeCodTip"></a><s class="m-arrow"></s>';
                V.get("#cashier").appendChild(S);
                this.codTipEl = S
            }
            V.get("p", S).innerHTML = "<em>" + a.affectedNum + "</em>\u79cd\u5546\u54c1\u56e0\u4e0d\u652f\u6301\u8d27\u5230\u4ed8\u6b3e\uff0c\u672a\u88ab\u52fe\u9009";
            S.style.visibility = "visible"
        },
        closeCodTip: function () {
            this.codTipEl && (this.codTipEl.style.visibility = "hidden")
        },
        initGoTop: function () {
            var S = V.get("#cashier");
            if (S) {
                S.appendChild(V.create('<ins class="m-gotop" data-job="goTop" title="\u8fd4\u56de\u9876\u90e8" data-point-url="http://www.atpanel.com/jsclick?cartlist=fanhui_dingbu"></ins>'))
            }
        }
    };

    function E(k, c) {
        if (J(k) && k.length) {
            var g = "";
            var e = "";
            var S = "";
            var j = "";
            var h = "";
            for (var d = 0, f = k.length; d < f; d++) {
                var a = k[d];
                var b = 0 == d;
                g += '<div class="m-service-list">' + (b ? "<h3>\u552e\u540e\u670d\u52a1\uff1a</h3>" : "") + '<a data-log="2.9?action=opensic" class="m-item" href="' + a.url + '" target="_blank"><img data-log="2.9?action=opensic" src="' + a.icon + '" />' + a.title + "</a></div>";
                e += "<div>" + R(a.price) + "</div>";
                S += '<div><em class="m-amount">' + c.amount + "</em></div>";
                j += "<div>" + I(a.promo, "-") + "</div>";
                h += '<div><span class="m-sum">' + R(a.sum) + "</span>" + (b ? '<a class="m-ba" data-job="toggleService" href="#toggleService">\u6536\u8d77</a>' : "") + "</div>"
            }
            return '<tr id="order_' + c.cartId + '_service" data-cartId="' + c.cartId + '" class="m-service m-service-expand"><td></td><td class="m-col-title">' + g + '</td><td class="m-service-price">' + e + '</td><td class="m-service-amount">' + S + '</td><td class="m-service-promo">' + j + '</td><td class="m-col-total m-service-total">' + h + "</td></tr>"
        }
        return ""
    }

    function T(d, e) {
        if (J(d) && d.length) {
            var c = "";
            var f = "";
            for (var b = 0, S = d.length; b < S; b++) {
                var a = d[b];
                c += '<a class="m-item" data-log="2.9?action=opensic" href="' + a.url + '" target="_blank"><img data-log="2.9?action=opensic" src="' + a.icon + '" />' + a.title + "</a>"
            }
            return '<tr id="order_' + e.cartId + '_service" data-cartId="' + e.cartId + '" class="m-service"><td></td><td colspan="4"><div class="m-service-list"><h3>\u552e\u540e\u670d\u52a1\uff1a</h3><div class="m-service-summary">' + c + '</div></div></td><td class="m-col-total"><em class="m-sum">' + R(e.serviceFee) + '</em><a href="#toggleService" class="m-ba" data-job="toggleService">\u5c55\u5f00</a></td></tr>'
        }
        return ""
    }

    function G(b) {
        var a = "";
        if (M(b)) {
            for (var S in b) {
                if (S && b[S]) {
                    a += '<span class="m-sku-item">' + S + "\uff1a<em>" + b[S] + "</em></span>"
                }
            }
        }
        return a
    }

    function L(S) {
        return S ? ('<div class="shiptime"><span class="label">\u53d1\u8d27\u65f6\u95f4\uff1a</span><span>' + S + "</span></div>") : ""
    }

    function F(S) {
        var a = S.style;
        if (a in C) {
            return '<img class="m-promo-icon" src="' + C[a] + '" data-desc="' + I(S.title) + '" />'
        } else {
            return '<ins class="m-promo-icon m-promo_' + a + '" data-desc="' + I(S.title) + '"></ins>'
        }
    }

    function A(c) {
        var b = "";
        var f = "";
        if (J(c)) {
            for (var a = 0, S = c.length; a < S; a++) {
                var d = c[a];
                if ("string" === typeof d) {
                    if (d.indexOf("double12") > -1) {
                        var e = d.split(/\s+/g);
                        e.shift();
                        f = '<div class="m-icon-double12"><a href="' + e.shift() + '" target="_blank"><span>' + e.join(" ") + "</span></a></div>";
                        continue
                    }
                    b += W[d] || ""
                } else {
                    b += D.substitute(W[d.type], d)
                }
            }
        }
        b = b ? ('<span class="m-icon-list">' + b + "</span>") : "";
        return b + f
    }

    function U(S, a) {
        S = S || {};
        return (S.now < S.origin ? '<em class="m-price-origin">' + R(S.origin) + "</em>" : "") + (0 < S.now ? '<em class="m-price-now">' + R(S.now) + "</em>" : "") + (0 < S.save ? '<em class="m-price-save">\u7701' + R(S.save) + "</em>" : "") + (0 < S.descend ? '<em class="m-price-descend">\u964d' + R(S.descend) + "</em>" : "")
    }

    function X(S) {
        S = R(S);
        return S ? ('<em class="m-sum">' + S + "</em>") : ""
    }

    function Q(c, b, S, a) {
        if (b) {
            if ("combo" !== S) {
                return '<input class="m-chk" data-job="selectOrder" type="checkbox" ' + (a ? "checked" : "") + ' value="' + c + '" data-point-url="http://www.atpanel.com/jsclick?cartlist=itemselected" />'
            }
        } else {
            return '<span class="m-invalid-tip" title="\u5546\u54c1\u88ab\u4e0b\u67b6\u3001\u5220\u9664\u3001\u5e93\u5b58\u4e0d\u8db3\uff0c\u6216\u5546\u5bb6\u5904\u4e8e\u88ab\u76d1\u7ba1\u6216\u51bb\u7ed3\u72b6\u6001">\u5931\u6548</span>'
        }
        return ""
    }

    function O(a, S) {
        S && (V.html(a, S))
    }

    function H(S) {
        var a = '<a title="' + S.title + '"' + (S.link ? (' href="' + S.link + '"') : "") + '><img src="' + S.img + '" /></a>';
        if (S.name) {
            a += '<input type="hidden" name="' + S.name + '" value="' + (S.value || "") + '" />'
        }
        return a
    }

    function N(a) {
        var S = "";
        a = a || {};
        D.each([a.MALL_CART_XIAOBAO, a.PAYMENT, a.MALL_CART_IDENTITY, a.MALL_CART_YULIU, a.OTHER], function (c, b) {
            if (c) {
                S += '<span class="icon-group">';
                D.each(c, function (d) {
                    S += H(d)
                });
                S += "</span>"
            }
        });
        return S ? '<div class="iconlist">' + S + "</div>" : S
    }
    return P
}, {
    requires: ["dom", "event", "cart/global"]
}); 