/*pub-1|2013-06-05 17:41:07*/
KISSY.add("order/biz/addr", function (i, E, M, t, D, U, L, e, s) {
    var F = {};
    var V;
    var l = [];
    var X;
    var J;
    var K = "addr-cur";
    var r = "http://delivery." + (e.daily ? "daily.tmall.net" : "tmall.com") + "/";
    var O;
    var z;
    var p = "address-option-enable";
    var k = "address-option-binded";
    var T;
    var I;
    var w = "address-forward-enable";
    var j = 20;
    var n = i.mix({}, i.EventTarget);
    i.mix(n, { init: function (S, Y) {
        V = E.get("#J_addresses");
        V.innerHTML = '<h2>\u9009\u62e9\u6536\u8d27\u5730\u5740</h2><div class="list"></div><div class="control"></div>';
        S = i.merge({ valOptions: [] }, S);
        g(S, Y);
        if (Y && !Y.isBuyNow) {
            E.insertBefore(E.create('<div class="top-back-cart"></div>', { html: L.toBackCart("tmalljy.2.6?action=returncart_top") }), "#J_orders")
        }
        x()
    }, showAll: function () {
        E.removeClass(V, "addrMuch");
        E.remove(E.get("div.station-tip", V))
    }, getCurAddrData: function () {
        return J
    }, closeStation: d, addNewAddr: function (S) {
        var aa = E.get("div.list", V);
        var Y = E.create(N(S));
        E.prepend(Y, aa);
        var Z = E.get("div.moreAddr", V);
        if (Z) {
            E.prepend(E.prev(Z), Z)
        }
        l.push(Y);
        F[S.id] = S;
        J = S;
        x();
        q(Y);
        if (j === l.length) {
            E.addClass("#J_addresses", "addresses-full")
        }
    } 
    });
    function g(aa, Z) {
        var S = aa.valOptions.length;
        var ad = false;
        if (0 === S) {
            i.use("order/biz/addrmaker", function (ag, ah) {
                ah.open({ title: "\u521b\u5efa\u5730\u5740", closable: false })
            })
        } else {
            var ac = "";
            var Y = "";
            var ab = 0;
            i.each(aa.valOptions, function (ah) {
                if (ab === 3) {
                    ad = true;
                    ac += '<div class="moreAddr">'
                }
                var ag = N(ah);
                if (ah.isSelected) {
                    Y = ag
                } else {
                    ac += ag;
                    ab++
                }
                F[ah.id] = ah
            });
            ac = Y + ac;
            if (ad) {
                ac += "</div>"
            }
            E.get("div.list", V).innerHTML = ac + "</div>";
            v();
            l = E.query("div.addr", V)
        }
        var ae = "";
        if (ad) {
            ae += '<a class="showAll" data-evt="biz/addr:showAll">\u663e\u793a\u5168\u90e8\u5730\u5740</a>';
            E.addClass(V, "addrMuch")
        }
        if (S < j) {
            ae += '<button class="fn-btn createAddr" data-mm="tmalljy.2.6?action=new_address" type="button" data-evt="biz/addrmaker:show">\u4f7f\u7528\u65b0\u5730\u5740</button>'
        }
        var af = "http://member1." + (e.daily ? "daily.taobao.net" : "taobao.com") + "/member/fresh/deliver_address.htm";
        //2013-06-10 wanghaichuan
        //ae += '<a class="manageAddr" href="' + af + '" data-mm="tmalljy.2.6?action=manange_address">\u7ba1\u7406\u6536\u8d27\u5730\u5740</a>';
        E.get("div.control", V).innerHTML = ae
    }
    function N(Z) {
        var Y = "";
        var aa = Z.id;
        var S = ["addr"];
        if (Z.isSelected) {
            S.push("addr-cur")
        }
        if (Z.isDefault) {
            S.push("addr-def")
        }
        Y += '<div data-id="' + aa + '" class="' + S.join(" ") + '">';
        Y += '<div class="inner">' + b(Z) + "</div>";
        Y += '<ins class="curmarker"></ins>';
        Y += '<a class="setdefault">\u8bbe\u4e3a\u9ed8\u8ba4</a>';
        Y += '<ins class="deftip">\u9ed8\u8ba4\u5730\u5740</ins>';
        Y += '<div class="floater">' + P(Z) + "</div>";
        Y += '<div class="option">' + B() + "</div>";
        return Y + "</div>"
    }
    function P(Z) {
        var Y = "";
        if (Z.lgForwardId) {
            var aa = Z.district || "";
            if (aa) {
                aa = aa + " "
            }
            var S = Z.city + " " + aa + Z.street;
            Y += '<span class="forward-tip-container"><span class="forward-tip-title">\u8f6c\u8fd0\u4ed3\u5e93\uff1a</span><span>' + S + "</span><span> " + Z.forwardTel + '</span><s class="forward-tip-arrow"></s></span>'
        }
        return Y
    }
    function B(Y, ab, ac) {
        var aa = '<div class="container">';
        if (Y) {
            aa += '<input type="checkbox" class="option-checkbox use-station" /><span class="station-label">\u4ee3\u6536\u5305\u88f9</span>'
        }
        if (ab) {
            aa += '<input type="checkbox" class="option-checkbox use-shop" /><span class="shop-label">\u95e8\u5e97\u81ea\u63d0</span>';
            if (ac) {
                var Z = ac.discountValue;
                if (Z) {
                    aa += '<span class="shop-info-discount discount-' + Z + '">' + Z / 100 + "\u6298</span>"
                }
                var S = ac.postFree;
                if (S) {
                    aa += '<span class="shop-info-postage">\u5305\u90ae</span>'
                }
            }
        }
        return aa + "</div>"
    }
    function b(ab) {
        var aa = '<div class="addr-hd"><span class="prov">' + ab.provName + '</span><span class="city">' + ab.cityName + '</span><span>\uff08</span><span class="name">' + ab.name + "</span><span> \u6536\uff09</span></div>";
        var Z = "";
        var S = ab.addr;
        if (ab.lgStationId) {
            var ac = ab.stationData;
            Z += '<span class="addr-station"><em class="station-name">\u670d\u52a1\u7ad9(' + ac.stationName + ')</em><span class="street">' + ac.areaName + ac.address + "</span></span>";
            S = ac.address
        } else {
            if (ab.lgShopId) {
                var ac = ab.stationData;
                Z += '<span class="addr-station"><em class="station-name">' + ac.stationTpName + '</em><span class="street">' + ac.areaName + ac.address + "</span></span>";
                S = ac.address
            } else {
                if (ab.lgForwardId) {
                    var Y = ab.distName + " " + ab.addr;
                    Z += '<span class="forward-info">' + ab.companyName + "&nbsp;" + ab.province + '</span><span class="forward-flag">\u8f6c</span><span class="street">' + Y + "</span>"
                } else {
                    Z += "<span>" + (ab.distName || "") + '</span><span class="street">' + ab.addr + "</span>"
                }
            }
        }
        Z += '<span class="phone">' + (ab.mobi || ab.tele) + '</span><span class="last">&nbsp;</span>';
        aa += '<div title="' + S + '" class="addr-bd">' + Z + "</div>";
        aa += '<div class="addr-toolbar">';
        if (ab.lgStationId || ab.lgShopId) {
            aa += '<a href="#change" class="change-station">\u66f4\u6539</a>'
        } else {
            if (ab.lgForwardId) {
                aa += '<a href="#change" class="change-forward">\u66f4\u6539</a>';
                aa += '<a href="#cancel" class="cancel-forward">\u53d6\u6d88\u56fd\u9645\u8f6c\u8fd0</a>'
            } else {
                aa += '<a href="#change" class="change-station">\u66f4\u6539</a><a href="#forward" class="use-forward">\u4f7f\u7528\u56fd\u9645\u8f6c\u8fd0</a>'
            }
        }
        return aa + "</div>"
    }
    function h() {
        E.get("div.floater", X).innerHTML = P(J);
        E.get("div.inner", X).innerHTML = b(J)
    }
    function A(S, Y, Z) {
        E.get("div.option", X).innerHTML = B(S, Y, Z)
    }
    function x() {
        i.each(l, function (S) {
            M.remove(S, "mouseenter mouseleave click");
            M.on(S, "mouseenter mouseleave", function (Z) {
                var Y = "mouseenter" === Z.type;
                if (E.hasClass(this, K)) {
                    if (Y && !E.hasClass(this, "addr-def")) {
                        E.addClass(this, "addr-set")
                    } else {
                        E.removeClass(this, "addr-set")
                    }
                }
                E[Y ? "addClass" : "removeClass"](this, "addr-active")
            });
            M.on(S, "click", function (Z) {
                var aa = Z.target;
                if (E.hasClass(aa, "option-checkbox")) {
                    var Y = E.attr(aa, "checked");
                    E.attr(aa, "checked", Y ? false : true)
                } else {
                    Z.halt()
                }
                q(this, aa)
            });
            if (E.hasClass(S, K)) {
                H(S)
            }
        })
    }
    function q(Y, S) {
        if (S) {
            if (E.hasClass(S, "setdefault")) {
                return y()
            } else {
                if (E.hasClass(S, "use-station")) {
                    return R(S, "station")
                } else {
                    if (E.hasClass(S, "change-station")) {
                        return a()
                    } else {
                        if (E.hasClass(S, "use-shop")) {
                            return R(S, "shop")
                        } else {
                            if (E.hasClass(S, "change-shop")) {
                                return a()
                            } else {
                                if (E.hasClass(S, "use-forward")) {
                                    return Q()
                                } else {
                                    if (E.hasClass(S, "change-forward")) {
                                        return c()
                                    } else {
                                        if (E.hasClass(S, "cancel-forward")) {
                                            return u()
                                        } else {
                                            if (E.hasClass(S, "station-label")) {
                                                S = E.get("input.use-station", E.parent(S, "div.container"));
                                                return R(S, "station")
                                            } else {
                                                if (E.hasClass(S, "shop-label")) {
                                                    S = E.get("input.use-shop", E.parent(S, "div.container"));
                                                    return R(S, "shop")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (E.hasClass(Y, K)) {
            return
        }
        if (X) {
            E.removeClass(X, K);
            D(X, { height: "106" }, 0.3, function () {
                var Z = E.get("div.option", this.anim.domEl);
                E.css(Z, { bottom: "26" })
            }).run();
            E.removeClass(X, k)
        }
        E.addClass(Y, K);
        H(Y);
        U.set("shopPickUpData", null);
        U.set("forwardData", null);
        W()
    }
    function W() {
        E.removeClass(V, w);
        n.fire("change", { data: J })
    }
    function H(S) {
        X = S;
        J = F[E.attr(S, "data-id")]
    }
    function y() {
        t({ url: "http://buy." + (e.daily ? "daily.tmall.net" : "tmall.com") + "/order/address/update_address_selected_status.htm", dataType: "json", data: { addrid: J.id }, success: function (Z) {
            var S = E.get("ins.deftip", X);
            var Y;
            if ("success" === Z.status) {
                E.addClass(X, "addr-setsuccess");
                S.innerHTML = "\u8bbe\u7f6e\u6210\u529f";
                Y = function () {
                    S.innerHTML = "\u9ed8\u8ba4\u5730\u5740";
                    E.removeClass(l, "addr-def");
                    E.removeClass(X, "addr-setsuccess");
                    E.addClass(X, "addr-def")
                }
            } else {
                E.addClass(X, "addr-setfailure");
                S.innerHTML = "\u8bbe\u7f6e\u5931\u8d25";
                Y = function () {
                    E.removeClass(X, "addr-setfailure")
                }
            }
            setTimeout(Y, 2000)
        } 
        })
    }
    function m(Y, S) {
        J.stationData = null;
        J.lgStationId = "";
        J.lgShopId = "";
        curOptionType = S;
        var Z = E.query("input.option-checkbox", X);
        i.each(Z, function (aa) {
            E.attr(aa, "checked", false)
        });
        h();
        E.removeClass(X, k);
        W()
    }
    function R(ad, ab) {
        var ac = E.attr(ad, "checked");
        if (ac) {
            m(ad, ab)
        } else {
            curOptionType = ab;
            var Y = { addressId: J.id, t: i.now() };
            switch (ab) {
                case "station":
                    Y.serviceType = 101;
                    break;
                case "shop":
                    Y.serviceType = 103;
                    var S = E.attr(E.get(".grid-order"), "data-order");
                    var aa = U.find("order/" + S);
                    var Z = aa.sellerId;
                    Y.sellerId = Z;
                    break
            }
            t.jsonp(r + "/station/stationAddress.do", Y, function (ae) {
                if (ae.success) {
                    C(ae)
                } else {
                    a()
                }
            })
        }
    }
    function C(S) {
        if (!S.success) {
            return m()
        }
        switch (curOptionType) {
            case "station":
                J.lgShopId = "";
                J.lgStationId = S.stationId;
                J.stationData = S;
                curTarget = E.get("input.use-station", X);
                break;
            case "shop":
                J.lgShopId = S.stationId;
                J.lgStationId = "";
                J.stationData = S;
                curTarget = E.get("input.use-shop", X);
                break
        }
        E.addClass(X, k);
        E.attr(curTarget, "checked", true);
        var Y = i.all("input.option-checkbox", X);
        Y.each(function (Z) {
            if (E.get(Z) != curTarget) {
                E.attr(Z, "checked", false)
            }
        });
        h();
        W()
    }
    function a() {
        if (!O) {
            O = new s()
        }
        var Y;
        var ad;
        switch (curOptionType) {
            case "station":
                Y = "serviceType=101&areaId=" + J.dist + "&addressId=" + J.id + "&t=" + i.now();
                var ab = J.lgStationId;
                if (ab) {
                    Y += "&stationId=" + ab
                }
                var ac = r + "station/showStation.htm?" + Y;
                ad = { cls: "addr-station-popup", header: "\u9009\u62e9\u81ea\u63d0\u70b9\uff08\u4ee3\u6536\u5305\u88f9\uff09", content: '<iframe scrolling="no" frameborder="0" src="' + ac + '"></iframe>' };
                break;
            case "shop":
                var S = E.attr(E.get(".grid-order"), "data-order");
                var aa = U.find("order/" + S);
                var Z = aa.sellerId;
                Y = "serviceType=103&sellerId=" + Z + "&areaId=" + J.dist + "&addressId=" + J.id + "&t=" + i.now();
                var ab = J.lgShopId;
                if (ab) {
                    Y += "&stationId=" + ab
                }
                var ac = r + "station/showStation.htm?" + Y;
                ad = { cls: "addr-station-popup", header: "\u9009\u62e9\u81ea\u63d0\u70b9\uff08\u95e8\u5e97\u81ea\u63d0\uff09", content: '<iframe scrolling="no" frameborder="0" src="' + ac + '"></iframe>' };
                break
        }
        O.show(ad)
    }
    function d() {
        O && O.hide()
    }
    function Q() {
        if (!I) {
            I = new s()
        }
        var S = r + "consolidation/show_warehouse.htm?areaId=" + J.dist + "&addressId=" + J.id + "&companyName=tmall&t=" + i.now();
        I.show({ cls: "addr-forward-popup", header: "\u9009\u62e9\u8f6c\u8fd0\u5546", content: '<iframe scrolling="no" frameborder="0" src="' + S + '"></iframe>' })
    }
    function u() {
        t.jsonp(r + "/consolidation/updateAddRelation.do", { addressId: J.id, updateType: 1, warehouseId: J.lgForwardId, companyName: "tmall", _tb_token_: E.val("#F_tb_token") })
    }
    window.cancelForwardBind = function (S) {
        if (S.success) {
            U.set("forwardData", null);
            J.forwardData = null;
            J.lgForwardId = "";
            h();
            W()
        }
    };
    function c() {
        Q()
    }
    function G(S) {
        if (!S.success) {
            return Q()
        }
        J.lgForwardId = S.warehouseId;
        J.forwardData = S;
        W()
    }
    function f() {
        I && I.hide()
    }
    function v(S) {
        i.each(E.query("div.addr-bd", E.get(S) || V), function (Z) {
            var Y = E.get("span.last", Z);
            var aa = E.offset(Z).top + E.height(Z);
            var ab = E.get("span.street", Z);
            var ac = E.data(ab, "street");
            if (!ac) {
                ac = ab.innerHTML;
                E.data(ab, "street", ac)
            }
            ab.innerHTML = ac;
            while (E.offset(Y).top > aa) {
                ac = ac.substr(0, ac.length - 1);
                ab.innerHTML = ac + "..."
            }
        })
    }
    U.on("fillData", function () {
        var S = false;
        var Z = U.get("isShowStation");
        var ac = U.get("supportShopPickUp");
        var ab = U.get("shopPickUpData");
        S = Z || ac;
        if (S) {
            var ad = X;
            var ah = E.get(".addr-cur", V);
            var Y = E.get("div.option", ah);
            E.css(Y, { bottom: "0" });
            D(ah, { height: "138" }, 0.3).run()
        }
        var ag = E.get("input.option-checkbox", X);
        if (!ag && S) {
            A(Z, ac, ab);
            x()
        }
        E[S ? "addClass" : "removeClass"](V, p);
        var af = false;
        ag = i.all("input.option-checkbox", X);
        ag.each(function (aj) {
            var ai = E.attr(aj, "checked");
            if (ai) {
                af = true;
                return false
            }
        });
        E[af ? "addClass" : "removeClass"](X, k);
        var ae = U.get("supportForward");
        var aa = U.get("forwardData");
        if (ae && aa) {
            aa.forwardTel = aa.mobi || aa.phone;
            J.district = "";
            i.mix(J, aa);
            J.lgForwardId = aa.warehouseId;
            h();
            o()
        }
        E[ae ? "addClass" : "removeClass"](V, w);
        v()
    });
    function o() {
        var Y = E.get(".forward-info", X);
        var Z = E.get(".forward-tip-container", X);
        if (Y) {
            var S = "";
            M.on(Y, "mouseenter", function () {
                clearTimeout(S);
                E.css(Z, { display: "block" });
                var aa = E.parent(Z, "div.addr");
                E.css(aa, { "z-index": 3 })
            });
            M.on(Y, "mouseleave", function () {
                S = setTimeout(function () {
                    E.css(Z, { display: "none" })
                }, 50);
                var aa = E.parent(Z, "div.addr");
                E.css(aa, { "z-index": "" })
            });
            M.on(Z, "mouseenter", function () {
                clearTimeout(S);
                E.css(Z, { display: "block" });
                var aa = E.parent(Z, "div.addr");
                E.css(aa, { "z-index": 3 })
            });
            M.on(Z, "mouseleave", function () {
                S = setTimeout(function () {
                    E.css(Z, { display: "none" })
                }, 50);
                var aa = E.parent(Z, "div.addr");
                E.css(aa, { "z-index": "" })
            })
        }
    }
    window.TMB = { Address: { setFrame: function (Y, S) {
        if (O && Y && S) {
            E.css(E.get("iframe", O.el), { width: Y, height: S });
            E.css(O.el, { width: Y });
            O.center()
        }
    }, setStation: C, closeStation: d, setForwardFrame: function (Y, S) {
        if (I && Y && S) {
            E.css(E.get("iframe", I.el), { width: Y, height: S });
            E.css(I.el, { width: Y });
            I.center()
        }
    }, setForward: G, closeForward: f
    }
    };
    return n
}, { requires: ["dom", "event", "ajax", "anim", "order/model", "order/render/common", "order/util", "order/util/popup"] }); 