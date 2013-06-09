KISSY.add("order/model", function (b) {
    var a = {};
    var g = { bundle: { child: "main" }, main: { parent: "bundle", child: "order" }, order: { parent: "main"} };
    function f() {
    }
    b.augment(f, b.Base.Attribute, b.EventTarget, { fill: function (i) {
        var h = this;
        var k = i.globalData;
        if (k) {
            h.set(k);
            if (k.assocs) {
                var j = {};
                b.each(k.assocs, function (l) {
                    b.each(l, function (m) {
                        j[m] = l
                    })
                });
                h.set("assocs", j)
            }
        }
        a = { _list: [], _unvalid: [], bundle: {}, main: {}, order: {} };
        h._fill("root", { id: "root" });
        b.each(i.list, function (m) {
            if (!m.isValid) {
                return a._unvalid.push(m)
            }
            var l = m.id;
            a._list.push(l);
            h._fill("bundle", m);
            b.each(m.bundles, function (n) {
                var o = n.id;
                h._fill("main", n, l);
                b.each(n.orders, function (p) {
                    n.sellerId = p.sellerId;
                    h._fill("order", p, o)
                })
            })
        });
        h.calculate();
        h.set("_actualPaid", 0);
        h.fire("fillData")
    }, _fill: function (i, k, h) {
        var n = g[i];
        if (!n) {
            return
        }
        var m = k.id;
        var l = n.parent;
        if (l) {
            var j = a[l][h];
            k._parent = { id: h, type: l };
            j._childs.list.push(m);
            j._childs.num++
        }
        if (n.child) {
            k._childs = { num: 0, list: [], type: n.child }
        }
        a[i][m] = k;
        this.fire("fill" + e(i) + "Data", { data: k })
    }, dump: function () {
        b.trace(this.getAttrVals());
        b.trace(a)
    }, walk: function (i) {
        var h = this;
        b.each(a._list, function (j) {
            i(h.find("bundle/" + j))
        })
    }, walkUnvalid: function (h) {
        b.each(a._unvalid, h)
    }, find: function (h, l) {
        if (b.isPlainObject(h)) {
            return h
        }
        h = h.split("/");
        l = this._parseSelectorMethod(l);
        var k = h[0];
        var i = a[k];
        if (!i) {
            return null
        }
        if (h.length === 1) {
            var j = [];
            b.each(i, function (m) {
                if (false !== l(m)) {
                    j.push(m)
                }
            });
            return j
        } else {
            i = i[h[1]];
            if (false !== l(i)) {
                return i
            }
        }
    }, children: function (h, l) {
        var k = this.find(h);
        if (!b.isPlainObject(k) || !b.isPlainObject(k._childs)) {
            return null
        }
        l = this._parseSelectorMethod(l);
        var j = [];
        var i = a[k._childs.type];
        b.each(k._childs.list, function (o, m) {
            var n = i[o];
            if (n && false !== l(n, m)) {
                j.push(n)
            }
        });
        return j
    }, parent: function (h, j) {
        var i = this.find(h);
        if (!b.isPlainObject(i) || !b.isPlainObject(i._parent)) {
            return null
        }
        i = this.find(i._parent.type + "/" + i._parent.id);
        j = this._parseSelectorMethod(j);
        if (i && false !== j(i)) {
            return i
        }
        return null
    }, _parseSelectorMethod: function (h) {
        return b.isFunction(h) ? h : function () {
            return true
        }
    }, calculate: function () {
        var j = this;
        var k = 0;
        var m = 0;
        var i = 0;
        var l = "wrt" === this.get("mode") && "fullPay" !== this.get("subMode");
        var h = [];
        j.walk(function (o) {
            var n = d(o, "_promoFee", 0);
            var q = 0 - n - d(o, "discount", 0);
            var p = "act" === o.type ? o.id : "null";
            j.children(o, function (s) {
                var u = s.id;
                var v = 0;
                var t = 0;
                j.children(s, function (w) {
                    t += d(w, "_serviceFee", 0);
                    v += d(w, "price/sum", 0);
                    h.push([w.itemId, w.amount.now, w.skuId, w._selectedServiceList.join("-") || "null", p, w.id, w.sellerId || w.seller, w.cartId].join("_"))
                });
                if ("shareDiscount" in s) {
                    s._actualPaid = v - s.shareDiscount
                } else {
                    s._actualPaid = v - n - d(o, "discount", 0)
                }
                if (!l) {
                    v += t;
                    v += d(s, "_postageFee", 0)
                }
                v += d(s, "_insureFee", 0);
                s._serviceFee = t;
                s._totalFee = v;
                q += v;
                var r = s.point || {};
                m += r.obtain || 0;
                i += r.usable || 0;
                j.fire("calculateMainFee", { data: s })
            });
            k += q;
            o._totalFee = q;
            j.fire("calculateBundleFee", { data: o })
        });
        j.set("_totalFee", k);
        j.set("cartItems", h.join(","));
        j.set("_obtainPoints", m);
        j.set("_availablePoints", i);
        j.set("_maxUseablePoints", Math.min(i, j.get("totalPoint")));
        j.fire("calculate")
    }, merge: function (i) {
        var h = this;
        b.each(i, function (j) {
            h._bundleMerge(j)
        });
        h.fire("mergeData")
    }, _bundleMerge: function (i) {
        var h = this;
        var j = h.find("bundle/" + i.id);
        if (!j) {
            return
        }
        b.each(i.main, function (k) {
            h._mainMerge(k)
        });
        delete i.main;
        c(j, b.merge({ promos: null, _promoFee: 0 }, i));
        h.fire("beforeUpdateBundleData updateBundleData", { data: j })
    }, _mainMerge: function (j) {
        var i = this;
        var h = i.find("main/" + j.id);
        if (!h) {
            return
        }
        b.each(j.orders, function (k) {
            i._orderMerge(k)
        });
        delete j.orders;
        c(h, b.merge({ _promoFee: 0, _promoId: null, promos: null }, j));
        i.fire("beforeUpdateMainData updateMainData", { data: h })
    }, _orderMerge: function (i) {
        var h = this.find("order/" + i.id);
        if (!h) {
            return
        }
        c(h, b.merge({ _promoId: null, promos: null }, i));
        this.fire("beforeUpdateOrderData updateOrderData", { data: h })
    } 
    });
    function c(i, h) {
        b.mix(i, h, true)
    }
    function e(i) {
        var h = [];
        b.each(i.split("_"), function (j) {
            h.push(j.substr(0, 1).toUpperCase() + j.substr(1))
        });
        return h.join("")
    }
    function d(k, j, i) {
        if (!k) {
            return null
        }
        var h;
        j = j.split("/");
        while ((h = j.shift())) {
            if (h in k) {
                k = k[h]
            } else {
                return i
            }
        }
        return k
    }
    return new f()
}); 