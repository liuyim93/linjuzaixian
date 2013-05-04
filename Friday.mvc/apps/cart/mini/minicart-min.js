(function(p) {
    var q = "#site-nav .cart", r = "hover", s = "menu-bd", i = "mini-cart-";
    if (TB.Global.version === "2.0") {
        q = "#J_GHeadCart";
        r = "g_head-menu-hover";
        s = "g_head-menu-bd";
        i = "g_head-minicart-"
    }
    var f = KISSY, A = window, l = document, B = !"0"[0] && !window.XMLHttpRequest, t = l.domain, u = !(t.indexOf("taobao.com") > -1 || t.indexOf("tmall.com") > -1) ? ".daily.taobao.net" : ".taobao.com", m = "http://cart" + u + "/", C = m + "trail_mini_cart.htm?", D = m + "del_mini_cart.htm?";
    i = i;
    var E = i + "hd", n = i + "bd", F = i + "img", v = i + "count", w = i + "del", x = i + "title", G = i + 
    "info", y = i + "ft", H = i + "price", z = i + "bt", I = i + "content", o = i + "ready", J = function(a) {
        var b = a.match(/&#[0-9]{1,5};/g);
        if (b != null) {
            var d, c, e;
            for (e = 0; e < b.length; e++) {
                d = b[e];
                c = d.substring(2, d.length - 1);
                a = c >= -32768 && c <= 65535 ? a.replace(d, String.fromCharCode(c)) : a.replace(d, "")
            }
        }
        return a.replace("<", "&lt;").replace(">", "&gt;")
    }, K = function(a) {
        a.css({"white-space": "nowrap",overflow: "hidden"});
        if ("textOverflow" in l.documentElement.style || "OTextOverflow" in l.documentElement.style)
            a.css({"text-overflow": "ellipsis","-o-text-overflow": "ellipsis"});
        else {
            a.data("text") || a.data("text", a.text());
            var b = a.attr("text") || a.text(), d = a.width(), c = 0, e = b.length, g = e, h = (new f.Node(a[0].cloneNode(true))).insertAfter(a);
            a.text(b);
            h.text(b).css({position: "absolute",width: "auto",visibility: "hidden",overflow: "hidden"});
            if (h.width() > d) {
                for (; (g = Math.floor((e + c) / 2)) > c; ) {
                    h.text(b.substr(0, g) + "\u2026");
                    if (h.width() > d)
                        e = g;
                    else
                        c = g
                }
                a.text(b.substr(0, g) + "\u2026");
                a.attr("title") || a.attr("title", b)
            }
            h.remove()
        }
    }, k = function() {
    };
    A.MiniCart = {init: function(a, b) {
            var d = this;
            a = parseInt(a);
            if (!(isNaN(a) || a < 0)) {
                d.cartNum = a;
                var c = function() {
                    d._rendUI();
                    b && d._bindUI()
                };
                f.Node ? c() : f.use("node", function() {
                    c()
                })
            }
        },_rendUI: function() {
            this.trigger = f.one(q);
            this.elem = new f.Node(this.trigger.children()[0]);
            this.content = (new f.Node("<div>")).addClass(I).appendTo(this.trigger);
            this.content.addClass(s)
        },_bindUI: function() {
            var a = this, b = a.content;
            TB.Global._addMenu(a.trigger[0]);
            a.elem.on("mouseenter", function(d) {
                if (!TB.Global._OFF) {
                    var c = (new f.Node(d.target))[0].tagName.toLowerCase();
                    c === "b" || c === 
                    "span" || c === "s" ? d.halt() : a.show()
                }
            }).on("click", function() {
                if (!TB.Global._OFF) {
                    a._clicked = true;
                    k("topclick")
                }
            }).on("keydown", function(d) {
                TB.Global._OFF || d.keyCode !== 39 && d.keyCode !== 40 || a.show()
            });
            b.on("click", function(d) {
                if (!TB.Global._OFF) {
                    var c = new f.Node(d.target), e;
                    if (c[0].tagName.toLowerCase() === "a") {
                        e = c.parent();
                        if (e.hasClass(w)) {
                            d.preventDefault();
                            d.halt();
                            if (c.html() !== "\u6b63\u5728\u5220\u9664\u4e2d") {
                                k("delete");
                                c.html("\u6b63\u5728\u5220\u9664\u4e2d");
                                f.getScript(D + "callback=MiniCart.remove&del_id=" + e.parent().attr("data-cartId") + "&t=" + 
                                f.now(), function() {
                                    c.html("\u5220\u9664");
                                    this.parentNode.removeChild(this)
                                })
                            }
                        } else
                            e.hasClass(z) && k("showmycart")
                    }
                }
            })
        },remove: function(a) {
            var b = this;
            if (a)
                if (a.status) {
                    var d = b.content.one("." + n);
                    f.each(d.children(), function(c) {
                        c = new f.Node(c);
                        if (c.attr("data-cartId") == a.delCart) {
                            var e = function() {
                                c.remove ? c.remove() : c[0].parentNode.removeChild(c[0]);
                                b.setData(a);
                                b.cartNum === 0 && b.hide()
                            };
                            if (B)
                                e();
                            else
                                c.animate ? c.animate("opacity: 0", 1, "easeOut", e) : e();
                            return false
                        }
                    })
                } else
                    alert(a.errMsg)
        },show: function() {
            var a = 
            this, b = a.content, d = function(c) {
                a.setData({status: false,errMsg: c})
            };
            k("popup");
            a._isRequesting = false;
            if ((!a._data || a.isExpired) && !a._isRequesting) {
                b.html("").removeClass(o);
                if (a.cartNum < 1) {
                    d("\u60a8\u8d2d\u7269\u8f66\u91cc\u8fd8\u6ca1\u6709\u4efb\u4f55\u5b9d\u8d1d\u3002");
                    b.addClass(o)
                } else {
                    a._isRequesting = true;
                    f.later(function() {
                        if (!a._clicked && a._isShowing()) {
                            f.getScript(C + "callback=MiniCart.setData&t=" + f.now(), function() {
                                b.addClass(o);
                                this.parentNode.removeChild(this)
                            });
                            a._setTimeout(function() {
                                d("\u7cfb\u7edf\u76ee\u524d\u7e41\u5fd9\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5\u3002")
                            })
                        }
                    }, 300)
                }
            }
        },hide: function() {
            var a = this;
            f.later(function() {
                a.trigger.removeClass(r)
            }, 
            2E3)
        },_isShowing: function() {
            return this.content.css("display") === "block"
        },_parseItem: function(a) {
            var b = "", d = a.item, c = d ? d.length : 0, e = 0;
            if (c > 0) {
                e = a.num - c;
                b += '<div class="' + E + '">\u6700\u8fd1\u52a0\u5165\u7684\u5b9d\u8d1d:</div><ul class="' + n + '">';
                f.each(d, function(g) {
                    var h = "http://item" + u + "/item.htm?id=" + g.itemId, j = J(g.title);
                    b += '<li data-cartId="' + g.cartId + '"><div class="' + F + '"><a target="_top" href="' + h + '"><img src="' + g.picUrl + '" alt="' + j + '" /></a></div><div class="' + v + '">&yen;<strong class="' + H + '">' + g.price + '</strong></div><div class="' + 
                    x + '"><a target="_top" href="' + h + '" title="' + j + '">' + j + "</a></div>" + (g.sku && g.sku.length ? '<div class="' + G + '"><span>' + g.sku.join("</span><span>") + "</span></div>" : "") + '<div class="' + w + '"><a href="#">\u5220\u9664</a></div></li>'
                });
                b += "</ul>"
            }
            if (e > 0)
                b += '<div class="' + y + '">' + this._parseRest(e, a.num) + "</div>";
            return b
        },_parseRest: function(a) {
            if (a > 0)
                return "\u8d2d\u7269\u8f66\u91cc\u8fd8\u6709" + a + "\u4ef6\u5b9d\u8d1d";
            return ""
        },_parseMsg: function(a) {
            var b = "";
            b += '<div class="' + z + '"><a target="_top" href="http://ju.atpanel.com/?url=' + m + 'my_cart.htm?from=mini&ad_id=&am_id=&cm_id=&pm_id=150042785330be233161">\u67e5\u770b\u6211\u7684\u8d2d\u7269\u8f66</a>' + 
            (a || "") + "</div>";
            return b
        },_setTimeout: function(a) {
            var b = this;
            if (!b._timeout)
                b._timeout = f.later(function() {
                    a();
                    b._timeout = p
                }, 1E4)
        },_clearTimeout: function() {
            this._timeout && this._timeout.cancel();
            this._timeout = p
        },setData: function(a) {
            var b = this, d = "", c = b.content;
            b._clearTimeout();
            if (a) {
                if (a.status) {
                    var e = a.num, g = false;
                    if (f.isNumber(e) && e === -2) {
                        e = b.cartNum - 1;
                        g = true
                    }
                    TB.Global.setCartNum(e);
                    b._data = a;
                    if (e > 0)
                        if (a.item && a.item.length)
                            d = b._parseItem(a) + b._parseMsg("");
                        else if (g) {
                            d = c.one("." + y);
                            if (g = c.one("." + 
                            n).all("li").length) {
                                d && d.html(b._parseRest(e - g, e));
                                d = c.html()
                            } else {
                                d = b._parseMsg(d ? "\u60a8\u8d2d\u7269\u8f66\u91cc\u7684\u5b9d\u8d1d\u5747\u5df2\u5931\u6548\u3002" : "\u60a8\u8d2d\u7269\u8f66\u91cc\u8fd8\u6ca1\u6709\u4efb\u4f55\u5b9d\u8d1d\u3002");
                                b.hide()
                            }
                        } else {
                            d = b._parseMsg("\u60a8\u8d2d\u7269\u8f66\u91cc\u7684\u5b9d\u8d1d\u5747\u5df2\u5931\u6548\u3002");
                            b.hide()
                        }
                    else if (e === 0)
                        d = b._parseMsg("\u60a8\u8d2d\u7269\u8f66\u91cc\u8fd8\u6ca1\u6709\u4efb\u4f55\u5b9d\u8d1d\u3002");
                    b.isExpired = false;
                    setTimeout(function() {
                        b.isExpired = true
                    }, 3E4)
                } else
                    d = b._parseMsg(a.errMsg);
                if (a.num !== -1) {
                    c.html(d);
                    (a = c.prev("iframe")) && a.offset(c.offset()).width(c.width() + 30).height(c.height() + 20);
                    f.each(f.all("." + x), function(h) {
                        h = new f.Node(h);
                        var j = 280 - h.prev("." + v).width() - 70;
                        h = h.one("a");
                        h.width(j);
                        K(h)
                    })
                }
            }
        }}
})();
