
KISSY.add("malldetail/sku/propertyHandler", function (E, D) {
    var C = E.mods.SKU, G = KISSY, K = G.DOM, J = G.Event, H = G.UA, I = document, B = (0 < H.ie), F = (6 == H.ie), A = "";
    C.PropertyHandler = function () {
        var c = {}, R = [], P = [], W = [], L = 0, U = G.merge({}, G.EventTarget), a = "skuChange", M = "PropertyChange", T = [];
        var Y = 0;
        function Z() {
            var e = true, d = T.length;
            for (var f = 0; f < d; f++) {
                if (false === T[f]()) {
                    e = false;
                    break
                }
            }
            return e
        }
        var X = function (i) {
            var h = E.cfg("valItemInfo").skuMap;
            var g = i.length;
            var d = [];
            var j = function (k) {
                k.sort(function (m, l) {
                    m = parseInt(m.split(":")[0], 10);
                    l = parseInt(l.split(":")[0], 10);
                    return m - l || -1
                });
                return k.length ? k : ""
            };
            i = j(i);
            if (i.length) {
                var e = new RegExp(";" + i.join(";(-?\\d+:-?\\d+;)*") + ";");
                for (var f in h) {
                    if (e.test(f)) {
                        d.push(f)
                    }
                }
            } else {
                d = h
            }
            return d
        };
        var V = function (d) {
            if (K.hasClass(d, "tb-selected")) {
                O(d)
            }
            K.addClass(d, "tb-out-of-stock")
        };
        var O = function (e) {
            if (!!I.createEvent) {
                var d = I.createEvent("HTMLEvents");
                d.initEvent("click", false, true);
                e.children[0].dispatchEvent(d)
            } else {
                e.children[0].fireEvent("onclick")
            }
        };
        var S = function (m) {
            var l = 0;
            var k = false;
            var h = c.valItemInfo.skuMap;
            var g;
            var d = true;
            for (var f = 0, e = m.length; f < e; f++) {
                var g = m[f];
                l += h[g].stock;
                if (h[g]["type"] == 3) {
                    k = true
                }
            }
            if (m.length && (l > 0 || k)) {
                d = false
            }
            return d
        };
        var N = {};
        var Q = function () {
            L = c.elmProps.length;
            var t = c.valItemInfo.skuMap, AA = c.strPrice, v = [], AB = ("undefined" !== typeof W);
            W = c.valItemInfo.defSelected;
            var f = [], h, w;
            for (var s = L - 1; 0 <= s; s--) {
                var o = c.elmProps[s], g = R[s] = { prop: A, elmt: null, data: [], hasImg: null }, k = P[s] = { pvid: A, prop: A, name: A, elmt: null, oos: [] };
                var q = I.createElement("i");
                q.appendChild(I.createTextNode("\u5df2\u9009\u4e2d"));
                if (c.isWTContract && K.attr(o, "data-contract")) {
                    var l = K.query("li", o);
                    for (var n = 0; n < l.length; n++) {
                        f[n] = { wtSpan: K.get("span", l[n]), wtValue: K.attr(l[n], "data-value") }
                    }
                }
                g.prop = k.prop = o.getAttribute("data-property");
                g.elmt = K.prev(o.parentNode);
                g.hasImg = K.hasClass(o, "tb-img");
                var p = o.getElementsByTagName("span");
                for (var r = p.length - 1; 0 <= r; r--) {
                    var u = p[r], m = u.parentNode, z = m.parentNode, d = { name: u.firstChild ? u.firstChild.nodeValue : "", pvid: z.getAttribute("data-value"), elmt: z, img: A };
                    if (true === g.hasImg) {
                        var e = K.css(m, "background-image");
                        var x = window.g_config.D950 ? "460x460" : "310x310";
                        if (-1 !== e.indexOf("url(")) {
                            d.img = e.match(/url\("?([^\)^"]*)/)[1].replace("30x30", x)
                        }
                    }
                    g.data.unshift(d);
                    if (true === B) {
                        m.hideFocus = true
                    }
                    if (!G.inArray(d.pvid, W)) {
                        if (S(X([d.pvid]))) {
                            V(d.elmt)
                        }
                    }
                    (function () {
                        var AG = s, AD = g.prop, AF = o, j = u, y = z, AH = d, i = m, AC = k, AE = q;
                        var AI = function (Ab, Ag, AV) {
                            Ab && Ab.preventDefault();
                            if (Ab) {
                                E.sendAtpanel("tmalldetail.13.1")
                            }
                            if (K.hasClass(y, "tb-out-of-stock")) {
                                return
                            }
                            if (AC.pvid === AH.pvid && typeof Ag == "undefined") {
                                K.removeClass(y, "tb-selected");
                                AC.pvid = A;
                                AC.name = A;
                                AC.elmt = null;
                                if (c.isWTContract) {
                                    if (!K.attr(AF, "data-contract")) {
                                        var AK = y.getAttribute("data-value");
                                        for (var AU = 0; AU < f.length; AU++) {
                                            var AW = X([AK, f[AU]["wtValue"]])[0];
                                            var Af = t[AW];
                                            if (Af && Af.wtDesc) {
                                                K.html(f[AU]["wtSpan"], Af.origin)
                                            }
                                        }
                                        h = null
                                    } else {
                                        w = null
                                    }
                                    C.LinkAdd.statu("wt", "show");
                                    C.LinkBasket.statu("wt", "show");
                                    K.remove("#J_WTSkuId", c.frmBid);
                                    K.remove("#J_WTSkuPrice", c.frmBid)
                                }
                                var AO = K.query("#J_DetailMeta .tb-selected");
                                G.each(AO, function (Ah) {
                                    if (K.attr(Ah, "data-value") != undefined) {
                                    }
                                })
                            } else {
                                if (AC.elmt) {
                                    O(AC.elmt)
                                }
                                K.addClass(y, "tb-selected");
                                y.appendChild(AE);
                                AC.pvid = AH.pvid;
                                AC.name = AH.name;
                                AC.elmt = y;
                                if (c.isWTContract) {
                                    if (!K.attr(AF, "data-contract")) {
                                        var AK = y.getAttribute("data-value");
                                        if (h) {
                                            for (var AU = 0; AU < f.length; AU++) {
                                                var AW = X([h, f[AU]["wtValue"]])[0];
                                                var Af = t[AW];
                                                if (Af && Af.origin) {
                                                    K.html(f[AU]["wtSpan"], Af.origin)
                                                }
                                            }
                                        }
                                        for (var AU = 0; AU < f.length; AU++) {
                                            var AW = X([AK, f[AU]["wtValue"]])[0];
                                            var Af = t[AW];
                                            if (Af && Af.wtDesc) {
                                                K.html(f[AU]["wtSpan"], '<em class="icon-wt"></em>' + Af.wtDesc)
                                            }
                                        }
                                        h = AK
                                    } else {
                                        w = AH.pvid
                                    }
                                    if (h && w) {
                                        var AW = X([h, w])[0];
                                        var Af = t[AW];
                                        if (Af && Af.wtDesc) {
                                            C.LinkAdd.statu("wt", "hide");
                                            C.LinkBasket.statu("wt", "hide");
                                            var AN = K.get("#J_WTSkuId", c.frmBid);
                                            var AR = K.get("#J_WTSkuPrice", c.frmBid);
                                            if (!AN) {
                                                var AN = K.create('<input id="J_WTSkuId" type="hidden" name="wt_skuId" value="' + Af.skuId + '" />');
                                                c.frmBid.appendChild(AN)
                                            } else {
                                                K.attr(AN, "value", Af.skuId)
                                            }
                                            if (!AR) {
                                                var AR = K.create('<input id="J_WTSkuPrice" type="hidden" name="wt_skuPrice" value="' + Af.price + '" />');
                                                c.frmBid.appendChild(AR)
                                            } else {
                                                K.attr(AR, "value", Af.price)
                                            }
                                        } else {
                                            C.LinkAdd.statu("wt", "show");
                                            C.LinkBasket.statu("wt", "show");
                                            K.remove("#J_WTSkuId", c.frmBid);
                                            K.remove("#J_WTSkuPrice", c.frmBid)
                                        }
                                    }
                                }
                            }
                            if (A !== AH.img) {
                                G.use("malldetail/sku/thumbViewer", function (Ah, Ai) {
                                    Ai.show(AH.img)
                                })
                            }
                            var Ac = [];
                            for (var AY = 0; L > AY; AY++) {
                                var Ae = P[AY], AS = Ae.pvid;
                                if (A !== AS) {
                                    Ac.push(AS)
                                }
                            }
                            for (var AY = 0; L > AY; AY++) {
                                var Ae = P[AY], AS = Ae.pvid;
                                var AL = R[AY].data, AQ = AL.length;
                                for (var AX = 0; AX < AQ; AX++) {
                                    var AZ = AL[AX];
                                    var AJ = [].concat(Ac);
                                    if (AC.pvid === AH.pvid) {
                                        if (K.hasClass(AZ.elmt, "tb-out-of-stock")) {
                                            continue
                                        }
                                        if (A !== AS) {
                                            if (AS == AZ.pvid) {
                                                continue
                                            }
                                            var Ad = G.indexOf(AS, AJ);
                                            AJ = AJ.slice(0, Ad).concat(AJ.slice(1 + Ad, AJ.length))
                                        }
                                        AJ.push(AZ.pvid);
                                        AW = X(AJ);
                                        if (S(AW)) {
                                            V(AZ.elmt)
                                        }
                                    } else {
                                        if (!K.hasClass(AZ.elmt, "tb-out-of-stock")) {
                                            continue
                                        }
                                        if (A !== AS) {
                                            var Ad = G.indexOf(AS, AJ);
                                            AJ = AJ.slice(0, Ad).concat(AJ.slice(1 + Ad, AJ.length))
                                        }
                                        AJ.push(AZ.pvid);
                                        AW = X(AJ);
                                        if (!S(AW)) {
                                            K.removeClass(AZ.elmt, "tb-out-of-stock")
                                        }
                                    }
                                }
                            }
                            var AM;
                            if (Ac.length === L) {
                                var Aa = ";" + Ac.join(";") + ";";
                                if ("undefined" !== typeof t[Aa]) {
                                    AM = t[Aa];
                                    D.updatePointsBuyPrice((AM.price * 100).toFixed(0))
                                }
                            }
                            var AT = AM ? AM.skuId : "";
                            var AP = C.selectSkuId || "";
                            if (AP != AT) {
                                C.selectSkuId = AT;
                                C.inventoryType = AM ? AM.type : 0;
                                C.skuFlag = Aa;
                                U.fire(a, { price: K.text(AA), isSelectAll: Ac.length === L, skuId: AT, skuIdOld: AP, skuFlag: Aa || "" })
                            }
                            C.selArr = Ac;
                            E.fire(M, { selArr: Ac })
                        };
                        J.on(i, "click", AI);
                        N[AH.pvid] = function (AJ) {
                            AI(null, AJ)
                        };
                        if ((true === AB && G.inArray(d.pvid, W)) || (1 === p.length && typeof p[0] != undefined && p[0].parentNode.style.background == "")) {
                            v.push(AI)
                        }
                    })()
                }
            }
            G.each(v, function (i) {
                i(null, null, "22")
            });
            if (F) {
                J.on(c.divKeyProp, "mouseenter mouseleave", function (i) {
                    K[i.type === "mouseenter" ? "addClass" : "removeClass"](c.divKeyProp, "tb-key-hover")
                })
            }
        };
        var b = function () {
            var o = K.query("#J_DetailMeta .tb-selected");
            var q = C.PropertyHandler.getdataLinkList();
            var l;
            G.each(o, function (i) {
                if (K.attr(i, "data-value") != undefined) {
                    l = true;
                    q[K.attr(i, "data-value")](true)
                }
            });
            if (!l) {
                for (var k = 0, h = R.length; k < h; k++) {
                    var e = R[k]["data"];
                    for (var g = 0, f = e.length; g < f; g++) {
                        var d = e[g];
                        var p = d.pvid;
                        if (!G.inArray(p, W)) {
                            if (S(X([p]))) {
                                V(d.elmt)
                            } else {
                                K.removeClass(d.elmt, "tb-out-of-stock")
                            }
                        }
                    }
                }
            }
        };
        return { init: function () {
            if (!(c = E.cfg())) {
                return
            }
            Q()
        }, onSkuChange: function (d) {
            if (G.isFunction(d)) {
                U.on(a, d)
            }
        }, onPropertyChange: function (d) {
            if (G.isFunction(d)) {
                E.on(M, d)
            }
        }, getSeleProp: function () {
            return P
        }, getPropData: function () {
            return R
        }, propClick: function (d) {
            return O(d)
        }, getdataLinkList: function () {
            return N
        }, reset: function () {
            return b()
        }, onBeforeBuySubmitValidate: function (d) {
            if (G.isFunction(d)) {
                T.push(d)
            }
        }, beforeBuyValidateCheck: Z
        }
    } ()
}, { requires: ["malldetail/sku/price"] }); /*pub-1|2013-02-28 21:14:21*/