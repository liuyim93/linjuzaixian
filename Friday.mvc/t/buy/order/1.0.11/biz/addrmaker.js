/*pub-1|2013-06-09 15:49:16*/KISSY.add("order/biz/areaselector", function (b, d, a, e) {
    function c(f) {
        this.params = f;
        this.provEl = d.get(f.prov);
        this.cityEl = d.get(f.city);
        this.distEl = d.get(f.dist);
        this._initEvents();
        this._fillOption(this.provEl, e.children("1"))
    }
    b.augment(c, b.EventTarget, { select: function (f) {
        this._set(this.provEl, f.prov);
        this._set(this.cityEl, f.city);
        this._set(this.distEl, f.dist)
    }, result: function () {
        return b.merge({}, this._parseResult(this.provEl, "prov"), this._parseResult(this.cityEl, "city"), this._parseResult(this.distEl, "dist"))
    }, _parseResult: function (i, g) {
        var f = {};
        if (-1 < i.selectedIndex) {
            var h = i.options[i.selectedIndex];
            f[g] = h.value;
            f[g + "Name"] = h.innerHTML
        }
        return f
    }, _set: function (f, g) {
        d.val(f, g);
        this._linkage(f)
    }, _initEvents: function () {
        var f = this;
        a.on([f.provEl, f.cityEl, f.distEl], "change", function () {
            f._linkage(this)
        })
    }, _linkage: function (g) {
        var i = this._getElType(g);
        if (!i || "dist" === i) {
            return
        }
        var h = "prov" === i;
        var f = this[(h ? "city" : "dist") + "El"];
        this._fillOption(f, e.children(d.val(g)))
    }, _fillOption: function (i, h, g) {
        var f = this;
        i.options.length = 0;
        b.each(h, function (k) {
            var j = document.createElement("option");
            j.value = k.id;
            j.innerHTML = k.name;
            if (g === k.id) {
                j.selected = true
            }
            i.appendChild(j)
        });
        f._linkage(i)
    }, _getElType: function (f) {
        if (f === this.provEl) {
            return "prov"
        } else {
            if (f === this.cityEl) {
                return "city"
            } else {
                if (f === this.distEl) {
                    return "dist"
                }
            }
        }
    } 
    });
    c.create = function (f, h, g) {
        return new c({ prov: f, city: h, dist: g })
    };
    return c
}, { requires: ["dom", "event", "order/biz/district"] });
KISSY.add("order/biz/addrmaker", function (h, m, l, d, b, f, k) {
    var c;
    var i = { open: function (q) {
        this.isSubmiting = false;
        j();
        c.set(h.merge({ header: "\u4f7f\u7528\u65b0\u5730\u5740", closable: true }, q));
        var p = this.formEl.elements;
        h.each(p, a);
        var o = b.getCurAddrData();
        if (h.isPlainObject(o)) {
            this.areaSelector.select(o);
            m.val(p.addrZip, o.post);
            m.val(p.addrName, o.name);
            m.val(p.addrMobi, o.mobi)
        }
        m.val(p.addrMail, "");
        p.addrMail.focus()
    }, show: function () {
        this.open()
    }, hide: e
    };
    function j() {
        if (!c) {
            n()
        }
        c.show()
    }
    function e() {
        c && c.hide()
    }
    function n() {
        if (c) {
            return
        }
        var p = "<form><table><tbody>";
        p += "<tr>";
        p += "<th>\u7701\uff1a<em>*</em></th>";
        p += "<td>";
        p += '<select name="addrProv"></select>';
        p += '<span class="addrCity">\u5e02\uff1a<select name="addrCity"></select></span>';
        p += '<span class="addrDist">\u533a\uff1a<select name="addrDist"></select></span>';
        p += "</td></tr>";
        p += "<tr>";
        p += '<th><label for="amzipcode">\u90ae\u653f\u7f16\u7801\uff1a</label><em>*</em></th>';
        p += '<td><input type="text" class="text" name="addrZip" /></td>';
        p += "</tr>";
        p += "<tr>";
        p += '<th><label for="amaddr">\u8857\u9053\u5730\u5740\uff1a</label><em>*</em></th>';
        p += '<td><textarea id="amaddr" class="text" name="addrMail"></textarea></td>';
        p += "</tr>";
        p += "<tr>";
        p += '<th><label for="amname">\u6536\u8d27\u4eba\u59d3\u540d\uff1a</label><em>*</em></th>';
        p += '<td><input id="amname" type="text" class="text" name="addrName" /></td>';
        p += "</tr>";
        p += "<tr>";
        p += "<th>\u7535\u8bdd\uff1a<em></em></th>";
        p += '<td><input type="text" class="text" name="addrArea"/> - <input type="text" class="text" name="addrNum"/> - <input type="text" class="text" name="addrExt"/><span class="tip">\u683c\u5f0f\uff1a\u533a\u53f7 - \u7535\u8bdd\u53f7\u7801 - \u5206\u673a\u53f7</span></td>';
        p += "</tr>";
        p += "<tr>";
        p += '<th><label for="ammobi">\u624b\u673a\uff1a</label><em></em></th>';
        p += '<td><input id="ammobi" type="text" class="text" name="addrMobi" /><span class="tip">\u7535\u8bdd\u548c\u624b\u673a\u8bf7\u81f3\u5c11\u586b\u5199\u4e00\u4e2a</span></td>';
        p += "</tr>";
        p += "<tr><th></th>";
        p += '<td><button class="primary" type="submit">\u786e\u5b9a</button><button class="hide" type="button" data-evt="biz/addrmaker:hide">\u53d6\u6d88</button></td>';
        p += "</tr>";
        c = new k({ cls: "addrmaker", header: "\u4f7f\u7528\u65b0\u5730\u5740", content: p + "</tbody></table></form>" });
        var o = m.get("form", c.el);
        var s = o.elements;
        var r = f.create(s.addrProv, s.addrCity, s.addrDist);
        i.areaSelector = r;
        var q = { addrZip: function (v) {
            var w = h.trim(v.value);
            var t = r.result();
            var u = true;
            if (h.inArray(t.prov, ["710000", "810000", "820000", "990000"]) && w) {
                if (!/^[\d|a-zA-Z|\s|-]+$/.test(w)) {
                    g(v, "\u90ae\u653f\u7f16\u7801\u4ec5\u80fd\u7531\u6570\u5b57\u3001\u5b57\u6bcd\u3001\u7a7a\u683c\u548c\u8fde\u8bcd\u7b26\u7ec4\u6210");
                    u = false
                } else {
                    if (10 < w.length) {
                        g(v, "\u90ae\u653f\u7f16\u7801\u6700\u957f\u4e0d\u80fd\u8d85\u8fc710\u4e2a\u5b57");
                        u = false
                    }
                }
            } else {
                if (!w) {
                    g(v, "\u8bf7\u586b\u5199\u90ae\u653f\u7f16\u7801");
                    u = false
                } else {
                    if (!/^\d+$/.test(w)) {
                        g(v, "\u90ae\u653f\u7f16\u7801\u4ec5\u80fd\u7531\u6570\u5b57\u7ec4\u6210");
                        u = false
                    } else {
                        if (6 !== w.length) {
                            g(v, "\u8bf7\u8f93\u51656\u4f4d\u90ae\u653f\u7f16\u7801");
                            u = false
                        }
                    }
                }
            }
            if (!u) {
                return false
            }
            a(v);
            return w
        }, addrMail: function (u) {
            var v = h.trim(u.value);
            var t = true;
            if (!v) {
                g(u, "\u8bf7\u586b\u5199\u8857\u9053\u5730\u5740");
                t = false
            } else {
                if (/^[a-zA-Z]+$/.test(v)) {
                    g(u, "\u8857\u9053\u5730\u5740\u4e0d\u80fd\u5168\u4e3a\u5b57\u6bcd");
                    t = false
                } else {
                    if (/^\d+$/.test(v)) {
                        g(u, "\u8857\u9053\u5730\u5740\u4e0d\u80fd\u5168\u4e3a\u6570\u5b57");
                        t = false
                    } else {
                        if (60 < v.length) {
                            g(u, "\u8857\u9053\u5730\u5740\u4e0d\u80fd\u8d85\u8fc760\u4e2a\u5b57");
                            t = false
                        } else {
                            if (5 > v.length) {
                                g(u, "\u8857\u9053\u5730\u5740\u4e0d\u80fd\u5c11\u4e8e5\u4e2a\u5b57");
                                t = false
                            }
                        }
                    }
                }
            }
            if (!t) {
                return false
            }
            a(u);
            return v
        }, addrName: function (u) {
            var v = h.trim(u.value);
            var t = true;
            if (!v) {
                g(u, "\u8bf7\u586b\u5199\u6536\u8d27\u4eba\u59d3\u540d");
                t = false
            } else {
                if (-1 < v.toLowerCase().indexOf("null")) {
                    g(u, "\u6536\u8d27\u4eba\u59d3\u540d\u4e2d\u4e0d\u80fd\u542b\u6709null\u5b57\u6837");
                    t = false
                } else {
                    if (2 > v.length) {
                        g(u, "\u6536\u8d27\u4eba\u59d3\u540d\u4e0d\u80fd\u5c11\u4e8e2\u4e2a\u5b57");
                        t = false
                    } else {
                        if (15 < v.length) {
                            g(u, "\u6536\u8d27\u4eba\u59d3\u540d\u4e0d\u80fd\u8d85\u8fc715\u4e2a\u5b57");
                            t = false
                        }
                    }
                }
            }
            if (!t) {
                return false
            }
            a(u);
            return v
        }, addrMobi: function (v, t) {
            var w = h.trim(v.value);
            var u = true;
            if (w) {
                if (!/^\d+$/.test(w)) {
                    g(v, "\u624b\u673a\u53f7\u7801\u4ec5\u80fd\u7531\u6570\u5b57\u7ec4\u6210");
                    u = false
                } else {
                    if (11 < w.length) {
                        g(v, "\u624b\u673a\u53f7\u7801\u957f\u5ea6\u6700\u591a11\u4f4d");
                        u = false
                    }
                }
            } else {
                if (false !== t && !q.addrExt(v.form.elements.addrExt)) {
                    g(v, "\u7535\u8bdd\u548c\u624b\u673a\u8bf7\u81f3\u5c11\u586b\u5199\u4e00\u9879");
                    u = false
                }
            }
            if (!u) {
                return false
            }
            a(v);
            return w
        }, addrExt: function (v) {
            var x = v.form.elements;
            var w = x.addrExt;
            var A = h.trim(x.addrArea.value);
            var y = h.trim(x.addrNum.value);
            var t = h.trim(w.value);
            var z = [A, y, t].join("-").replace(/-+$/, "");
            var u = true;
            if (z) {
                if (!/^[\d-]+$/.test(z)) {
                    g(w, "\u7535\u8bdd\u53f7\u7801\u4ec5\u80fd\u7531\u6570\u5b57\u7ec4\u6210");
                    u = false
                } else {
                    if (!A || !y) {
                        g(w, "\u8bf7\u5b8c\u6574\u586b\u5199\u533a\u53f7\u548c\u7535\u8bdd\u53f7\u7801");
                        u = false
                    } else {
                        if (3 > A.length || 6 < A.length) {
                            g(w, "\u533a\u4f4d\u53f7\u7801\u957f\u5ea6\u6700\u5c113\u4f4d\uff0c\u6700\u591a6\u4f4d");
                            u = false
                        } else {
                            if (5 > y.length || 10 < y.length) {
                                g(w, "\u7535\u8bdd\u53f7\u7801\u957f\u5ea6\u6700\u5c115\u4f4d\uff0c\u6700\u591a10\u4f4d");
                                u = false
                            } else {
                                if (t && 6 < t.length) {
                                    g(w, "\u5206\u673a\u53f7\u7801\u957f\u5ea6\u6700\u591a6\u4f4d");
                                    u = false
                                }
                            }
                        }
                    }
                }
            }
            q.addrMobi(x.addrMobi, false);
            if (!u) {
                return false
            }
            a(w);
            return z
        } 
        };
        q.addrArea = q.addrExt;
        q.addrNum = q.addrExt;
        h.each(o.elements, function (v) {
            var t = v.name;
            if (t in q) {
                var u = q[t];
                l.on(v, "valuechange", function () {
                    u(this)
                })
            }
        });
        l.on(o, "submit", function (z) {
            z.halt();
            if (i.isSubmiting) {
                return
            }
            i.isSubmiting = true;
            var A = this.elements;
            var t = r.result();
            var y = q.addrZip(A.addrZip);
            var w = q.addrMail(A.addrMail);
            var x = q.addrName(A.addrName);
            var v = q.addrExt(A.addrExt);
            var u = q.addrMobi(A.addrMobi);
            if (!(y && w && x && (v || u))) {
                i.isSubmiting = false;
                return
            }
            d({ url: "/order/address/addBuyerAddress.htm?_input_charset=utf-8", type: "post", dataType: "json", data: { deliverPhoneBak: u, deliverPhone: v, deliverName: x, deliverAddress: w, postCode: y, divisionCode: t.dist || t.city, isDefaultDeliverAddress: false }, success: function (B) {
                if (1 !== B.is_success) {
                    i.isSubmiting = false;
                    return alert(({ "01": "\u60a8\u7684\u5730\u5740\u5e93\u5df2\u6ee1\uff0c\u65e0\u6cd5\u7ee7\u7eed\u6dfb\u52a0", "11": "\u8857\u9053\u5730\u5740\u6700\u5c11 5 \u4e2a\u5b57\uff0c\u6700\u591a\u4e0d\u80fd\u8d85\u8fc7 127 \u4e2a\u5b57", "12": "\u8857\u9053\u5730\u5740\u4e0d\u80fd\u5168\u662f\u6570\u5b57", "13": "\u6536\u8d27\u5730\u5740\u4e0d\u80fd\u5168\u662f\u5b57\u6bcd", "20": "\u8bf7\u9009\u62e9\u7701\u5e02\u533a", "30": "\u8bf7\u586b\u5199\u6536\u8d27\u4eba", "31": "\u6536\u8d27\u4eba\u59d3\u540d\u4e0d\u80fd\u8d85\u8fc7 25 \u4e2a\u5b57", "40": "\u8bf7\u586b\u5199\u90ae\u653f\u7f16\u7801", "41": "\u8bf7\u586b\u5199\u6b63\u786e\u7684\u90ae\u653f\u7f16\u7801", "50": "\u7535\u8bdd\u548c\u624b\u673a\u8bf7\u81f3\u5c11\u586b\u5199\u4e00\u9879", "60": "\u7531\u4e8e\u7cfb\u7edf\u5f02\u5e38\u800c\u5bfc\u81f4\u5730\u5740\u672a\u4fdd\u5b58\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5" })[B.error_code] || "\u7531\u4e8e\u672a\u77e5\u9519\u8bef\u5bfc\u81f4\u5730\u5740\u4fdd\u5b58\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5")
                }
                i.hide();
                b.addNewAddr(h.merge(t, { id: B.address_id, post: y, addr: w, name: x, tele: v, mobi: u }))
            } 
            })
        });
        i.formEl = o
    }
    function g(o, r) {
        var q = m.parent(o);
        var p = m.get("div.fn-feedback", q);
        if (!p) {
            p = m.create('<div class="fn-feedback"></div>');
            p.innerHTML = '<div class="feedback-inner"><div class="feedback-con feedback-error"><p></p><s class="feedback-icon"></s></div>';
            m.append(p, q)
        }
        m.html(m.get("p", p), r);
        p.style.visibility = "visible";
        m.addClass(q, "am-err")
    }
    function a(o) {
        var p = m.parent(o);
        m.css(m.get("div.fn-feedback", p), "visibility", "hidden");
        m.removeClass(p, "am-err")
    }
    return i
}, { requires: ["dom", "event", "ajax", "order/biz/addr", "order/biz/areaselector", "order/util/popup", "order/css/addrmaker.css"] });
