KISSY.add("core/monitor", function(e, t, n) {
    var r = {}, i = location.search.indexOf("monitor-url=") > -1, s = "110.75.1.110";
    i && (s = location.search.split("monitor-url=")[1].split("&")[0]);
    var o = {init: function() {
            if (!i && parseInt(Math.random() * 300) != 0)
                return;
            var t = this;
            e.ready(function() {
                t.trace("domready"), e.later(function() {
                    var e = t._getData();
                    t._send(n.stringify(e))
                }, 3e3)
            })
        },trace: function(e) {
            r[e] = +(new Date)
        },_getData: function() {
            return {domready: r.domready - g_config.startTime,cartstart: r.InitStart - g_config.startTime,cartinit: r.InitEnd - r.InitStart,order: r.OrderEnd - r.OrderStart,ordertoend: r.InitEnd - r.OrderEnd,userready: r.UserReady - g_config.startTime}
        },_send: function(t) {
            var n = "http://" + s + "/monitor.htm?errortracer&monitorType=cartPerfMonitor", r = n;
            window.g_config && (r += "&appid=" + (window.g_config.appId || 0)), r += "&data=" + encodeURIComponent(t), r += "&t=" + e.now(), this.debug("monitor\nurlBase: %s\ndata: %s", n, t), window._cart_monitor_ = new Image, window._cart_monitor_.src = r
        }};
    return o
}, {requires: ["event", "json"]}), KISSY.add("core/ba-debug", function() {
    window.debug = function() {
        function c(t) {
            i && (s || !n || !n.log) && i.apply(e, t)
        }
        function h(e) {
            return o > 0 ? o > e : u.length + o <= e
        }
        var e = this, t = Array.prototype.slice, n = e.console, r = {}, i, s, o = 9, u = ["error", "warn", "info", "debug", "log"], a = "assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "), f = a.length, l = [];
        while (--f >= 0)
            (function(e) {
                r[e] = function() {
                    o !== 0 && n && n[e] && n[e].apply(n, arguments)
                }
            })(a[f]);
        f = u.length;
        while (--f >= 0)
            (function(i, s) {
                r[s] = function() {
                    var r = t.call(arguments), o = [s].concat(r);
                    if (!l || !l.push)
                        return;
                    l.push(o), c(o);
                    if (!n || !h(i))
                        return;
                    n.firebug ? n[s].apply(e, r) : n[s] ? n[s].apply(n, r) : n.log.apply(n, r)
                }
            })(f, u[f]);
        return r.setLevel = function(e) {
            o = typeof e == "number" ? e : 9
        }, r.setCallback = function() {
            var e = t.call(arguments), n = l.length, r = n;
            i = e.shift() || null, s = typeof e[0] == "boolean" ? e.shift() : !1, r -= typeof e[0] == "number" ? e.shift() : n;
            while (r < n)
                c(l[r++])
        }, r
    }()
}), KISSY.add("core/profile", function(e) {
    var t = {};
    return e.mix(t, {cache: {},time: function(e) {
            if (!e)
                return;
            this.cache[e] = [+(new Date)]
        },timeEnd: function(e) {
            if (!e in this.cache)
                return;
            var t = +(new Date);
            this.cache[e][2] = t - this.cache[e][0]
        },report: function() {
            var e = [];
            for (var t in this.cache)
                e.push(t + ": " + this.cache[t][2]);
            return e.join("\r\n")
        }}), t
}), KISSY.add("core/select", function(e) {
    var t = {_checkboxClickHandler: function(e) {
            var t = e.target.checked, n;
            t && (n = this.orderEl ? this : this._filterUnselectOrders(this.orders)), this.select(t), n && this.broadcast("updateOrders", {orders: n,updateType: "check"});
            var r = !1;
            for (var i = 0; i < this.items.length; i++)
                this.items[i].model && !this.items[i].model.isCod && (r = !0);
            this.broadcast("cleanCodHistory", {cancelCodSelect: r}), this.add_userpath(this.orderEl ? "c" : "d")
        },_filterUnselectOrders: function(t) {
            var n = [];
            try {
                e.each(e.makeArray(t), function(t) {
                    e.each(t.items, function(r) {
                        r && r.model && !r.model.isSelected && e.indexOf(t, n) === -1 && n.push(t)
                    })
                })
            } catch (r) {
                alert(r.message)
            }
            return n
        },_itemUpdateHandler: function(t) {
            this._itemUpdateTimer && this._itemUpdateTimer.cancel(), this._itemUpdateTimer = e.later(function() {
                this._itemUpdateHandlerMain(t)
            }, 50, !1, this)
        },_itemUpdateHandlerMain: function(e) {
            var t = {};
            "isSelected" in e && this._checkChildSelect(), this.fire("update", {isSelected: e.isSelected})
        },_checkChildSelect: function() {
            var t = !0;
            e.each(this.items, function(e) {
                e.model && !e.model.isSelected && (t = !1)
            }), this._setStatus(t)
        },select: function(t) {
            e.each(this.items, function(e) {
                e.model && e.model.set("isSelected", t)
            })
        },_setStatus: function(t) {
            var n = e.makeArray(this.checkboxEl);
            e.each(n, function(n) {
                n && e.one(n).attr("checked", t)
            })
        }};
    return t
}), KISSY.add("core/feedback", function(e, t, n, r, i) {
    var s = function(t) {
        return e.substitute(['<div id="J_Feedback" class="feedback J_Feedback" style="{style}">', '<span><a href="{href}" target="_blank">{title}</a><s></s></span>', "</div>"].join(""), t)
    }, o = [".feedback{background-repeat: repeat-y;background-color: #fff;width:25px;overflow:hidden;position: fixed;right:0;top:50%;z-index:90000;border: 1px solid #e8e8e8;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;_position:absolute;}", ".feedback:hover{right:2px;}", ".feedback span{display:block;}", ".feedback span a{display:block;word-wrap:break-word;word-break:normal;width:13px;text-align:center;color:#666;padding:8px 6px 10px;line-height:1.1em;}", ".feedback span a:hover{color: #f50;text-decoration:none;}", ".feedback span s {width: 0;height: 0;border: 3px solid #19377f;display: block;position: relative;top: -1px;right: -1px;border-color: #fff #19377f #19377f #fff;margin: -6px 0 0 19px;overflow: hidden;_margin-left: 17px;zoom: 1;}"].join(""), u = function(r) {
        r = e.one(r);
        var s = t.offset(r).top, o = t.height(r), u = 500, a = e.later(function() {
        }, 0), f = new i(r, {opacity: 1}, .2, "easeIn", null, !1);
        r.css("top", s + t.scrollTop()), n.on(window, "scroll resize", function(n) {
            var i = t.scrollTop();
            s = (t.viewportHeight() - o) / 2, a.cancel(), f.stop(), r.css("opacity", 0), a = e.later(function() {
                t.scrollTop() === i && (r.css("top", s + t.scrollTop()), e.later(function() {
                    f.run()
                }))
            }, u)
        })
    };
    return {init: function(n) {
            e.ready(function() {
                e.later(function() {
                    n = e.merge({title: "请说说您的感受"}, n), n.href = "http://ur.taobao.com/survey/view.htm?id=" + (n.feedbackId || 75);
                    var i = n.title.length * 6;
                    n.style = "margin-top: -" + i + "px;", t.addStyleSheet(o), e.one(t.create(s(n))).appendTo(document.body), r.ie === 6 && t.get("#J_Feedback") && u(t.get("#J_Feedback"))
                }, 2e3)
            })
        }}
}, {requires: ["dom", "event", "ua", "anim"]}), KISSY.add("core/makepoint", function(e, t, n) {
    var r = {_init: function() {
            this.containerEl = this.containerEl || document.body, this._bindEvents()
        },_bindEvents: function() {
            n.on(this.containerEl, "click", this._clickHandler, this), this.listen("makepoint", this._track, this)
        },_clickHandler: function(e) {
            if (!e || !e.target || !t.hasClass(e.target, "J_MakePoint"))
                return;
            var n = t.attr(e.target, "data-point-url");
            n && this._request(n)
        },_request: function(t) {
            t = t + (t.indexOf("?") === -1 ? "?" : "&") + "cache=" + e.now();
            var n = window["g_makepoint_" + e.now()] = new Image;
            n.src = t
        },_track: function(e) {
            if (!e || !e.data && !e.url)
                return;
            var t = e.data ? "http://log.mmstat.com/jsclick?" + e.data : e.url;
            this._request(t)
        }};
    return r
}, {requires: ["dom", "event"]}), KISSY.add("cart/order", function(e, t, n, r, i, s) {
    var o = {_init: function() {
            var t = this.orderEl;
            e.mix(this, {shopId: t.attr("data-shopid") || 0,comboId: t.attr("data-cbid") || 0,shopActId: t.attr("data-actid") || 0}), this.items = [], this.itemEls.each(function(e, t) {
                var n = new s({comboId: this.comboId,comboOption: e.attr("data-cboption") || 0,shopActId: this.shopActId,itemEl: e,cart: this.cart,favoriteAPI: this.favoriteAPI,order: this,index: this.index + "." + (t + 1)});
                n.on("update", this._itemUpdateHandler, this), n.on("checkboxClicked", this._itemCheckboxClickedHandler, this), this.items.push(n)
            }, this), this._bindEvents(), this.lazyload(t, e.bind(this._initPromoHint, this), this)
        },_bindEvents: function() {
            n.on(this.checkboxEl, "click", this._checkboxClickHandler, this)
        },_itemCheckboxClickedHandler: function() {
            var e = !1;
            for (var t = 0; t < this.items.length; t++)
                if (this.items[t].model && this.items[t].model.isSelected) {
                    e = !0;
                    break
                }
            e && this.broadcast("updateOrders", {orders: this,updateType: "check"})
        },_initPromoHint: function() {
            var e = this.headEl.one("ul.J_ScrollingPromoHint");
            if (!e)
                return;
            this.log("promohint init for order: %s (%s)", this.shopId, this.index);
            var t = e.all("li");
            t.length > 1 && r.Slide(e, {markupType: 2,panels: t,hasTriggers: !1,effect: "scrolly",interval: 3,duration: .5})
        },del: function() {
            var t = this.cart.orders;
            t.splice(e.indexOf(this, t), 1)
        }};
    return e.mix(o, i)
}, {requires: ["dom", "event", "switchable", "core/select", "mods/item/ui"]}), KISSY.add("mods/item/ui", function(e, t, n, r, i, s, o, u, a, f, l, c) {
    var h = e.Node.all, p = {_init: function() {
            var n = this, r = this.cart, i = this.itemEl, l = i.one("td.s-point"), h = i.one("input.J_CheckBoxItem"), p = i.one("td.s-title"), d = i.parent().hasClass("J_Combo"), v = i.hasClass(".redemption-item");
            e.mix(this, {isShowUodoMsg: !1,cartId: i.attr("data-cartid"),itemId: i.attr("data-itemid"),skuId: i.attr("data-skuid") || 0,isOverOneMonth: i.attr("data-one-month-ago") == "true",channelInfo: i.attr("data-channel") || 0,cnInfo: i.attr("data-cn") || 0,checkboxEl: h,isDisable: i.hasClass("disable"),isCod: !i.hasClass("uncod"),isSelected: d || v ? !0 : h && !!h.attr("checked"),titleEl: p,double11El: p.on(".icon-1111"),quantityEl: i.one("td.s-amount").one("input") || i.one("td.s-amount"),amountEl: i.one("td.s-total").one("em"),priceEl: i.one("td.s-price"),pointEl: l && l.one("em"),promoEl: i.one("td.s-agio"),isMallItem: i.hasAttr("data-istmall"),isComboItem: d,isRedemption: v,channelPromo: i.attr("data-ch") || 0,isCrossShopItem: this.shopActId > 0,imgUrl: i.one("img.itempic").attr("src")}), this.serviceList = e.all("tr.J_Service_" + this.cartId), this.util.once("a.fav", "click", function(e) {
                e.preventDefault(), new o({triggerEl: this.itemEl.one("a.fav"),favoriteAPI: this.favoriteAPI,item: this})
            }, this, this.itemEl), this.util.once("span.small2big-text", "mouseenter", function() {
                new a({imgEl: this.itemEl.one("img.itempic"),item: this})
            }, this, this.itemEl), e.later(function() {
                new u({triggerEl: this.itemEl.one("a.J_Del"),item: this}), this._initPromos()
            }, 100, !1, this);
            if (this.isDisable && !this.serviceList.length && !this.isRedemption)
                return;
            this.model = new s({quantity: e.trim(this.quantityEl[this.quantityEl[0].type == "text" ? "val" : "text"]()),amount: e.trim(this.amountEl.text()) || 0,promo: 0,isSelected: this.isSelected,isCod: this.isCod,isComboItem: this.isComboItem,equal: null,servicePrice: 0,singlePrice: e.one("em.J_Price", n.priceEl).text() * 1}), this.model.on("update", function(e) {
                if (!e.key)
                    return;
                var t = this[e.key + "El"];
                e.key == "equal" && (this.amountEl.attr("data-popstr", "活动优惠分摊后，价格为" + e.value), this.model.equal = e.value), t && (t[e.key === "quantity" ? "val" : "html"](decodeURI(e.value)), e.key === "promo" && this._initPromos());
                if (e.key === "isSelected" && this.checkboxEl && this.checkboxEl.attr("checked") !== e.value) {
                    var n = e.value ? "addClass" : "removeClass";
                    this.checkboxEl.attr("checked", e.value), this.itemEl[n]("selected"), this.serviceList.each(function(e) {
                        e[n]("selected")
                    }), this.fire("update", {isSelected: e.value})
                }
            }, this), this.lazyload(this.itemEl, function() {
                new f({inputEl: this.itemEl.one("input.text-amount"),quantity: this.model.quantity,item: this})
            }, this), r.serviceData && r.serviceData[this.cartId] && (this.serviceData = r.serviceData[this.cartId], this.serviceList.each(function(e) {
                t.hasClass(e, "collapse") ? n.serviceElCollapse = e : t.hasClass(e, "expanded") && (n.serviceElExpanse = e)
            }), this.serviceElCollapse && this.serviceElExpanse && (this.service = new c({item: this,data: this.serviceData,serviceElCollapse: this.serviceElCollapse,serviceElExpanse: this.serviceElExpanse}))), this._bindEvents()
        },_initPromos: function() {
            var t = !1;
            this.promos && this.promos.length && this._clearPromos(), this.promos = [], this.pricePromos = [], e.all(".J_Aigo", this.promoEl).each(function(e) {
                var n = e.attr("data-popstr");
                n && this.promos.push(new l({triggerEl: e,content: n})), t = !0
            }, this), e.all("img", this.double11El).each(function(e) {
                var t = e.attr("data-popstr");
                t && new l({triggerEl: e,content: t})
            }), e.all(".s-total em", this.itemEl).each(function(e) {
                var t = e.attr("data-popstr");
                t && this.pricePromos.push(new l({triggerEl: e,content: t}))
            }, this)
        },_clearPromos: function() {
            e.each(this.promos, function(e) {
                e.clear()
            })
        },_bindEvents: function() {
            n.on(this.checkboxEl, "click", this._checkboxClickHandler, this)
        },_checkboxClickHandler: function() {
            this.add_userpath("b");
            var e = !!this.checkboxEl.attr("checked");
            this.model.set("isSelected", e), this.broadcast("cleanCodHistory", {cancelCodSelect: !this.model.isCod}), this.fire("checkboxClicked")
        },del: function(e) {
            this._deleteFromCartAndOrder(), this._animHide(e)
        },_deleteFromCartAndOrder: function() {
            var t = this.cart;
            if (!t.delItems || t.delItems.length > 0)
                t.delItems = [];
            t.delItems.push(this), t.items.splice(e.indexOf(this, t.items), 1), this.order.items.splice(e.indexOf(this, this.order.items), 1), this.broadcast("cal")
        },_showUodoMsg: function() {
            if (!cart.isMemberCart)
                return !1;
            var e = this, n = h(".J_UndoMsg");
            n.length && n.remove(), n = e._createUodoMsg(), h(".J_UndoDel").on("click", function(t) {
                t.preventDefault(), e.undo()
            }), n.fadeIn(.5, function() {
                e.resetFloatbar();
                if (cart.undoItems.length > 1) {
                    var r = n.offset(), i = r.top;
                    t.scrollTop(i)
                }
            })
        },_createUodoMsg: function() {
            var t = this, n = h(t.itemEl), r = cart.undoItems.length, i, s = '<tr   class=" xcard undo-msg-wrapper J_UndoMsg hidden"><td colspan="8"><div class="undo-msg J_UndoMaxMsg">成功删除 <b>{num}</b> 件宝贝，如有误，可<a href="#undo" class="J_UndoDel">撤销本次删除</a></div></td></tr>';
            return n.length ? (i = h(e.substitute(s, {num: r})), i.insertBefore(n)) : !1
        },undo: function() {
            var n = this, r = "/undelete_cart_items.htm?shop_id=0", s = cart.undoItems, u = [];
            if (!e.isArray(s) && !s.length)
                return !1;
            e.each(s, function(e) {
                u.push(e.itemEl.attr("data-cartid"))
            }), e.io({type: "POST",url: r,data: {cart_ids: u.join(","),_input_charset: "utf-8",tk: t.val("#_tb_token_"),t: e.now()},success: function(t) {
                    if (/UserCartIsFull/.test(t)) {
                        h(".J_UndoMaxMsg").html('撤销删除失败，购物车已满，您可以收藏其他宝贝后再进行撤销删除，或把需恢复的宝贝<a href="#addFav" class="J_UndoMaxAddFav"  target="_blank">收藏至收藏夹</a>！ ');
                        var r = n.cart.undoItems;
                        return r.length > 0 && (r[0].itemEl = h(".J_UndoMsg")), new o({triggerEl: h(".J_UndoMaxAddFav"),favoriteAPI: n.favoriteAPI,item: r,isUndo: !0}), !1
                    }
                    t = i.parse(t);
                    if (!e.isPlainObject(t) || t.error)
                        return !1;
                    h(".J_UndoMsg").remove(), location.reload()
                },timeout: 5})
        },resetUndo: function() {
            this.isShowUodoMsg = !1, cart.undoItems = [], this.resetFloatbar()
        },_animHide: function(n) {
            var r = this, i = this.itemEl, s = this.itemEl.getDOMNode().parentNode, o = i.parent();
            i.attr("data-hiding", "true");
            var u = e.filter(e.query("tr.J_ItemBody", s), function(e) {
                return !t.attr(e, "data-hiding")
            }).length === 1 ? s : i;
            u === s && this.order.del(), i.fadeOut(.5, function() {
                var s = e.all(".J_Service_" + r.cartId, i.parent("tbody"));
                r.isShowUodoMsg && r._showUodoMsg(), r.resetFloatbar(), i.remove(), s.length && s.each(function(e) {
                    e.remove()
                }), o.children("tr.J_ItemBody").length || h(o.children("tr")).each(function(e) {
                    e.hasClass(".J_UndoMsg") || e.remove()
                }), r.cart.items.length === 0 && (t.addClass("#cart", "hidden"), t.removeClass("#empty", "hidden")), r.broadcast("calFloatbarPosition"), n && n.call(r)
            })
        },resetFloatbar: function() {
            t.data("#float-bar", "top", t.offset("#J_CartEnable").top + t.height("#J_CartEnable"))
        }};
    return p
}, {requires: ["dom", "event", "anim", "json", "mods/item/item", "mods/fav/ui", "mods/delete/item-ui", "mods/bigpic/ui", "mods/quantity/ui", "mods/promo/ui", "mods/service/ui"]}), KISSY.add("mods/item/item", function(e, t, n) {
    var r = ["price", "quantity", "promo", "point"], i = {_init: function() {
            this.update()
        },set: function(t, n) {
            if (e.isObject(t)) {
                e.each(t, function(e, t) {
                    this.set(t, e)
                }, this);
                return
            }
            this[t] = n, this.fire("update", {key: t,value: n}), (t === "amount" || t === "isSelected") && this.broadcast("cal")
        },update: function(e) {
            this.broadcast("cal")
        },_fix: function() {
            e.each(r, function(t) {
                this[t] = parseInt(e.trim(this[t] || 0), 10)
            })
        }};
    return i
}, {requires: ["dom", "event"]}), KISSY.add("mods/fav/ui", function(e, t, n) {
    var r = {_init: function() {
            this._bindEvents(), this.isUndo || this._clickHandler()
        },_bindEvents: function() {
            n.on(this.triggerEl, "click", this._clickHandler, this)
        },_clickHandler: function(e) {
            e && e.preventDefault(), this.add_userpath("j"), this._doFav(this.item)
        },_doFav: function(n) {
            var r = this;
            n = e.makeArray(n);
            var i = [];
            e.each(n, function(e) {
                i.push(e.itemId + ":" + e.skuId)
            });
            var s = {itemSkuList: i.join(","),_tb_token_: t.val("#_tb_token_")};
            e.jsonp(this.favoriteAPI, s, function(t) {
                e.isObject(t) && r._showTips(n, t.result.status, t.result.message)
            })
        },_showTips: function(n, r, i) {
            var s = n[0], o = s.itemEl, u = t.create('<div id="fav-lay-prefix-' + s.cartId + '" class="fav-box"></div>'), a = t.create('<div class="fav-lay"></div>');
            t.css(a, "height", o.height()), t.css(u, "top", o.offset().top), t.css(u, "left", o.offset().left);
            if (r)
                var f = t.create('<div class="msg fav-status"><p class="ok">成功移至收藏夹</p></div>');
            else
                i.errorCode === 8 ? f = t.create('<div class="msg fav-status"><p class="attention">' + i.error + "</p></div>") : f = t.create('<div class="msg fav-status"><p class="error">' + i.error + "</p></div>");
            t.css(f, "top", o.height() / 2 - 10), u.appendChild(a), u.appendChild(f), t.get("body").appendChild(u), r ? this.broadcast("deleteItem:" + s.cartId, {isFav: !0,item: s,isUndo: this.isUndo,success: function() {
                    t.remove(u)
                },error: function() {
                    t.remove(u)
                },delay: 2e3}) : e.later(function() {
                t.remove(u)
            }, 2e3)
        }};
    return r
}, {requires: ["dom", "event"]}), KISSY.add("mods/delete/item-ui", function(e, t, n) {
    var r = {_init: function() {
            this._bindEvents()
        },_bindEvents: function() {
            n.on(this.triggerEl, "click", this._clickHandler, this), this.listen("deleteItem:" + this.item.cartId, this._doDel, this)
        },_addHighlight: function() {
            this.log("add highlight"), this.highlightEl && this._removeHighlight();
            var e = this.item.itemEl, n = t.offset(e), r = t.width(e), i = t.height(e);
            this.log("itemEl's left: %s, top: %s, width: %s, height: %s", n.left, n.top, r, i), this.highlightEl = t.create('<div style="border:2px solid #ffaa56;">'), t.css(this.highlightEl, {position: "absolute",left: n.left,top: n.top,width: r - 4,height: i - 4}), t.appendTo(this.highlightEl, "body")
        },_removeHighlight: function() {
            this.log("remove highlight"), t.remove(this.highlightEl), this.highlightEl = null
        },_clickHandler: function() {
            this._addHighlight(), this._getLabsConfig("dontConfirm") || confirm("确认要删除该宝贝吗?") ? this._doDel() : this._removeHighlight(), this.add_userpath("f")
        },_doDel: function(t) {
            var n = this, r = n.item.cartId;
            this.broadcast("updateOrders", {updateType: "delete",operate: this.item,orders: this.item.order,success: function(i) {
                    n._removeHighlight(), i.status && (e.later(function() {
                        n.item.isShowUodoMsg = t && t.isFav ? !1 : !0, cart.undoItems = [n.item], n.item.del(t && t.success), (!t || !t.isUndo) && n.broadcast("updateStatus")
                    }, t && t.delay || 0), t || n.broadcast("recordUncoItems", {cartIds: r}))
                },error: t && t.error || function() {
                }})
        }};
    return r
}, {requires: ["dom", "event"]}), KISSY.add("mods/bigpic/ui", function(e, t, n, r) {
    var i = {_init: function() {
            e.mix(this, {triggerEl: e.one("span.small2big-text", this.imgEl.parent())}), this._bindEvents(), this._showImgPopup(), this.log("init for item: %s (%s)", this.item.itemId, this.item.index)
        },_bindEvents: function() {
            n.on(this.triggerEl, "click", function(e) {
                e.preventDefault()
            }), n.on(this.triggerEl, "mouseenter", this._showImgPopup, this)
        },_showImgPopup: function() {
            this.popup || (this._initPopup(), this.popup.show())
        },_initPopup: function() {
            var e = this._getLabsConfig("bigpic"), t = /(_sum|_60x60|_80x80|_100x100)\.jpg/, n = e ? "" : "_160x160.jpg", i = this.imgEl.getDOMNode().src.replace(t, n), s = this.imgEl.parent().attr("href");
            this.popup = new r.Popup({trigger: this.triggerEl,triggerType: "mouse",elCls: e ? "small2big-popup small2big-popup-310" : "small2big-popup",zIndex: 1e4,align: {offset: [2, 0],node: this.imgEl,points: ["tr", "tl"]},content: '<div><a href="' + s + '" target="_blank">' + '<img src="' + i + '" class="J_MakePoint"' + ' data-point-url="http://log.mmstat.com/jsclick?gwcsp=1" />' + "</a>" + "</div>"}), this.popup.on("show", this._showPopupHandler, this)
        },_showPopupHandler: function() {
            var n = this.popup.get("el"), r = t.get("span.arrow", n);
            r || (r = t.create('<span class="arrow"></span>'), n.append(r));
            var i = t.viewportHeight() + t.scrollTop(), s = n.height(), o = this.popup.get("y");
            o > i - s && (o = i - s), n.css("top", o), e.one(r).css("top", this.imgEl.offset().top - o + 55), this.broadcast("makepoint", {data: "gwcsp=3"})
        }};
    return i
}, {requires: ["dom", "event", "overlay"]}), KISSY.add("mods/quantity/ui", function(e, t, n) {
    var r = {_init: function() {
            this._initUI(), this._bindEvents(), this.log("inited for item: %s (%s)", this.item.itemId, this.item.index)
        },_initUI: function() {
            var e = this.quantity !== "1" ? "minus" : "no-minus";
            this.minusEl = t.create('<a href="#" class="' + e + '">-</a>'), t.insertBefore(this.minusEl, this.inputEl), this.plusEl = t.create('<a href="#" class="plus">+</a>'), t.insertAfter(this.plusEl, this.inputEl)
        },_bindEvents: function() {
            n.on(this.inputEl, "keydown", this._inputKeyDownHandler, this), n.on(this.minusEl, "click", this._minusClickHandler, this), n.on(this.plusEl, "click", this._plusClickHandler, this)
        },_inputKeyDownHandler: function() {
            this._check()
        },_minusClickHandler: function(n) {
            n && n.preventDefault();
            if (t.hasClass(this.minusEl, "no-minus"))
                return;
            var r = parseInt(e.trim(this.inputEl.val()), 10) - 1;
            this.inputEl.val(r), this._check()
        },_plusClickHandler: function(t) {
            t && t.preventDefault();
            var n = parseInt(e.trim(this.inputEl.val()), 10) + 1;
            this.inputEl.val(n), this._check()
        },_check: function() {
            this.timer && this.timer.cancel(), this.timer = e.later(this._doCheck, 500, !1, this)
        },_doCheck: function() {
            this.add_userpath("i");
            var n = this.inputEl, r = n.val(), i = parseInt(n.attr("data-max"), 10), s = parseInt(n.attr("data-stock"), 10) || i, o = parseInt(n.attr("data-now"), 10), u = !1;
            r.indexOf(".") > -1 && (n[0].value = r = r.replace(/\./g, " ")), r = e.trim(r * 1), s <= 3 && (u = !0), r <= 0 && (n[0].value = r = 1), t[r === 1 ? "removeClass" : "addClass"](this.minusEl, "minus"), t[r === 1 ? "addClass" : "removeClass"](this.minusEl, "no-minus"), t[r > i ? "removeClass" : "addClass"](this.plusEl, "plus"), t[r > i ? "addClass" : "removeClass"](this.plusEl, "no-plus");
            switch (!0) {
                case !/^\d+$/.test(r + ""):
                    n[0].value = o;
                    return;
                case s === 0:
                    this._addError("库存不足"), n[0].value = 0;
                    return;
                case r > i:
                    this._addError("最多只可购买" + i + "件"), n[0].value = i;
                    return;
                case o > i && r > i:
                    this._addError("最多只可购买" + i + "件"), n[0].value = i;
                    return
            }
            var a = this._removeError(), f = this;
            this.updateTimer && this.updateTimer.cancel(), this.updateTimer = e.later(function() {
                f.broadcast("updateOrders", {updateUnselect: !f.item.model.isSelected,updateType: "update",operate: this.item,quantity: r,orders: this.item.order,success: function(e) {
                        f.inputEl.attr("data-now", r), f.item.model.set("quantity", r), f.item.service && f.broadcast("updateService", {updateUnselect: !f.item.model.isSelected,updateType: "update",operate: f.item,quantity: r,orders: f.item.order,success: function(e) {
                                f.item.service.update(e)
                            },error: function() {
                            }})
                    },error: function(e) {
                        e.message && f._addError(e.message), f.inputEl.attr("data-now", r), f.item.model.set("quantity", r)
                    }})
            }, 300, !1, this);
            if (a || u) {
                var l = t.create('<em class="s-danger-text">供货紧张</em>');
                n.parent().append(l)
            }
        },_addError: function(e) {
            this._removeError();
            var n = t.create('<em class="error-msg">' + e + "</em>");
            this.inputEl.parent().append(n)
        },_removeError: function() {
            var e = !1, t = this.inputEl.parent().all("em");
            return e = t.hasClass("s-danger-text"), t.remove(), e
        }};
    return r
}, {requires: ["dom", "event"]}), KISSY.add("mods/promo/ui", function(e, t, n, r) {
    var i = {_init: function() {
            this._bindEvents()
        },_initPopup: function() {
            this.popup = new r({elCls: "promo-popup",align: {node: this.triggerEl,points: ["tl", "bl"],offset: [0, -8]},content: this.content + '<i class="promo-popup-arrow"></i>'})
        },_bindEvents: function() {
            n.on(this.triggerEl, "mouseenter mouseleave", this._mouseHandler, this)
        },_mouseHandler: function(e) {
            e.type === "mouseenter" && !this.popup && this._initPopup(), this.popup[e.type === "mouseenter" ? "show" : "hide"]()
        },clear: function() {
            n.remove(this.triggerEl, "mouseenter mouseleave", this._mouseHandler);
            if (!this.popup)
                return;
            var e = this.popup.get("el");
            e && t.remove(e)
        }};
    return i
}, {requires: ["dom", "event", "overlay"]}), KISSY.add("mods/service/ui", function(e, t, n) {
    function u(e, n) {
        var r = t.get("td.s-chk", t.prev(e, ".J_ItemBody")), i = parseInt(t.attr(r, "rowSpan"), 10);
        t.attr(r, "rowSpan", i + (n ? 1 : -1))
    }
    var r = '<li class="service-item"><a class="s-icon" target="_blank" href="{url}"><img src="{iconUrl}"></a><span class="s-name">{title}</span></li>', i = '<ul class="service-item clearfix"><li class="s-title"><a href="{url}" target="_blank" class="s-icon"><img src="{iconUrl}"></a><span class="s-name">{title}</span></li><li class="s-price">{price}</li><li class="s-amount">{amount}</li><li class="s-agio">{promo}</li><li class="s-total"><em class="J_ServiceSum">{totalPrice}</em></li></ul>', s = "hidden service-hidden", o = e.UA.ie < 8;
    return {_init: function() {
            this._render(), this._bindEvents()
        },_bindEvents: function() {
            e.one("h3.J_Expand", this.serviceElCollapse).on("click", function(e) {
                e.preventDefault();
                var n = t.parent(this, "tr"), r = t.next(n);
                t.addClass(n, s), t.removeClass(r, s), o && u(n, !0)
            }), e.one("h3.J_Collapse", this.serviceElExpanse).on("click", function(e) {
                e.preventDefault();
                var n = t.parent(this, "tr"), r = t.prev(n);
                t.addClass(n, s), t.removeClass(r, s), o && u(n)
            })
        },_render: function() {
            var n = this, s = [], o = [], u = n.data.services, a = n.item.model.quantity, f = t.get(".J_ServiceList", n.serviceElCollapse), l = t.get(".J_ServiceList", n.serviceElExpanse);
            n.data.serviceSum = 0, t.html(f, ""), t.html(l, ""), e.each(u, function(t, u) {
                var f = t.price, l = t.realPrice;
                s[s.length] = e.substitute(r, t), o[o.length] = e.substitute(i, {url: t.url,iconUrl: t.iconUrl,title: t.title,price: f == "-" ? "-" : (f * 1).toFixed(2),promo: t.agio || "-",amount: a,totalPrice: l == "-" ? "-" : (l * a).toFixed(2)}), n.data.serviceSum += l == "-" ? 0 : l * a * 1
            }), n.item.model.servicePrice = n.data.serviceSum, t.html(f, s.join("")), t.html(l, o.join("")), t.html(t.get(".J_ServiceSum", n.serviceElCollapse), n.data.serviceSum.toFixed(2))
        },update: function(t) {
            var n = this.data.services;
            e.each(t, function(e, t) {
                var r;
                t in n && (r = n[t], r.price = e.price, r.realPrice = e.realPrice)
            }), this._render(), this.broadcast("cal")
        }}
}, {requires: ["dom", "event", "anim"]}), KISSY.add("mods/totalpay/ui", function(e) {
    var t = {_init: function() {
            this.listen("cal", this._delayCal, this)
        },_delayCal: function() {
            this.timer && this.timer.cancel(), this.timer = e.later(e.bind(this._cal, this), 100)
        },_cal: function() {
            var t = 0;
            e.each(this.items, function(e) {
                if (e.isDisable || !e.model.isSelected)
                    return;
                t += parseFloat(e.model.amount, 10) + parseFloat(e.model.servicePrice, 10)
            });
            var n = t.toFixed(2);
            this.log("cal: %s, item count: %s", n, this.items.length), e.each(this.totalPayEls, function(e) {
                e.html(n)
            });
            var r = t > 0, i = e.one("#J_Go");
            e.one("#J_SelectCodContainer") && e.one("#J_SelectCodContainer")[r ? "removeClass" : "addClass"]("select-uncod"), i[r ? "removeClass" : "addClass"]("un-go"), e.one("#J_SmallGo") && e.one("#J_SmallGo")[r ? "removeClass" : "addClass"]("btn-small-un-go"), e.one("#J_SmallGo") && e.one("#J_SmallGo")[r ? "addClass" : "removeClass"]("btn-small-go"), r ? i.removeAttr("disabled") : i.attr("disabled", "disabled")
        }};
    return t
}, {requires: []}), KISSY.add("mods/submit/ui", function(e, t, n) {
    var r = {_init: function() {
            var e = this;
            e._bindEvents(), window.TC = {mods: {Go: {go: function(t) {
                            e.go(t)
                        }}}}
        },_bindEvents: function() {
            var e = this;
            n.on(e.submitEls, "click", function(n) {
                n.halt(), e.add_userpath("k");
                var r = n.target;
                if (t.hasClass(r, "un-go") || t.hasClass(r, "btn-small-un-go"))
                    return;
                e.go()
            })
        },go: function(n) {
            n = n || {};
            var r = e.one("#cart").attr("data-error");
            if (r)
                return alert(r), !1;
            var i = [], s = [], o = [], u = [], a = [], f = [], l = [], c = [];
            e.each(this.items, function(e) {
                if (e.itemEl.hasClass("disable") || !e.model || !e.model.isSelected)
                    return;
                var t = e.cartId, n = e.comboId, r = e.comboOption, a = e.itemId, h = e.shopActId, p = e.skuId, d = e.model.quantity, v = e.channelInfo, m = e.cnInfo;
                (e.service || e.channelPromo || e.isComboItem || e.isCrossShopItem) && c.push(t), e.isRedemption ? u.push([t, a, d, p, e.itemEl.attr("data-promoid")].join("|")) : (i.push([t, a, d, p, h, n, r].join("_")), f.push(t), v && s.push([a, p, v].join("|")), m && o.push(t), e.isCod && l.push(t))
            });
            if (!i.length)
                return alert("请选择宝贝"), !1;
            this.broadcast("cal");
            var h = {item: i.join(","),buyer_from: n.buyer_from || "cart"};
            s.length && (h.channelInfo = s.join(",")), o.length && (h.cnData = o.join(",")), u.length && (h.premium_item = u.join(","));
            var p = t.get("#J_SelectCod") && t.get("#J_SelectCod").checked;
            p && (h.use_cod = 1), h.serviceCartIds = c.join(":"), this.broadcast("checklogin", {params: h,cartIds: f,isCod: p})
        }};
    return r
}, {requires: ["dom", "event"]}), KISSY.add("mods/login/ui", function(e, t, n, r, i) {
    var s = {_init: function() {
            document.domain = location.hostname.split(".").slice(-2).join("."), this._bindEvents()
        },_bindEvents: function() {
            r.on(this.tempLoginEl, "click", this._initPopup, this), this.listen("checklogin", this.checkLogin, this)
        },_initPopup: function(n) {
            this.add_userpath("l"), n = typeof n == "string" ? n : this.loginAPI;
            var s = '<div class="skin"><iframe width="410" height="270" frameborder="0" scrolling="no" src="' + n + '"></iframe>' + '<a href="#" style="background:transparent url(http://img01.taobaocdn.com/tps/i1/T1EedkXbY_yJNsaZzT-300-812.png) no-repeat scroll -245px -32px; display:block; height:17px; position:absolute; right:6px; top:6px; width:17px;" title="关闭"><span style="display:none">关闭</span></a>' + "</div>";
            if (!this.popup) {
                this.popup = new i({elCls: "login-now",elStyle: {position: t.ie === 6 ? "absolute" : "fixed",height: 272,width: 412,background: "#fff"},align: {points: ["cc", "cc"]}});
                var o = this;
                r.on(window, t.ie === 6 ? "resize scroll" : "resize", function() {
                    o.popup.center()
                })
            }
            this.popup.set("content", s), this.popup.show(), e.one(this.popup.get("el")).delegate("click", "a", this.popup.hide, this.popup)
        },checkLogin: function(e) {
            function o(e) {
                var i = n.create("<form>");
                i.method = "post", i.action = e || t.goAPI1;
                for (var s in r) {
                    var o = n.create("<input>");
                    o.name = s, o.value = r[s], i.appendChild(o)
                }
                document.body.appendChild(i), i.submit()
            }
            var t = this, r = e.params, i = e.cartIds, s = e.isCod;
            TB && TB.Global && TB.Global.isLogin() || !TB || !TB.Global ? o(t.goAPI, r) : TB.Global.isLogin() || (r.buyer_from = "cart_guest", r.from = s ? "cart_cod" : "cart_buynow", r.use_cod = s, o(t.fastbuyAPI, r))
        }};
    return s
}, {requires: ["ua", "dom", "event", "overlay"]}), KISSY.add("mods/cod/ui", function(e, t, n) {
    var r = [], i = {_init: function() {
            this._unselect(), this._bindEvents(), this.listen("cleanCodHistory", this._cleanHistory, this)
        },_bindEvents: function() {
            n.on(this.checkboxEl, "click", function(t) {
                this.add_userpath("e"), e.one(t.target).attr("checked") ? this._select() : this._restore()
            }, this), this.hintEl.delegate("click", "a.close", this._hideHintEl, this)
        },_select: function() {
            var t = [], n = [];
            e.each(this.items, function(i) {
                i.model && !i.model.isCod && i.model.isSelected && !i.model.isComboItem && (i.model && i.model.set("isSelected", !1), r.push(i), e.indexOf(i.order, t) === -1 && t.push(i.order));
                if (i.model && i.model.isComboItem && i.model.isSelected && !i.model.isCod) {
                    var s = i.order;
                    e.inArray(s.items[0].cartId, n) || (n.push(s.items[0].cartId), e.each(s.items, function(n) {
                        n.model && n.model.set("isSelected", !1), r.push(n), e.indexOf(s, t) === -1 && t.push(s)
                    }))
                }
            }), t.length && this.broadcast("updateOrders", {orders: t,updateType: "check"}), r.length && (this.hintEl.one("span.J_UncodNum").html(r.length), this.hintEl.show())
        },_restore: function() {
            var t = [];
            e.each(r, function(n) {
                n.model && n.model.set("isSelected", !0), e.indexOf(n.order, t) === -1 && t.push(n.order)
            }), t.length && this.broadcast("updateOrders", {orders: t,updateType: "check"}), this._cleanHistory()
        },_unselect: function() {
            this.checkboxEl.attr("checked", !1)
        },_hideHintEl: function(e) {
            e && e.preventDefault(), this.hintEl.hide()
        },_cleanHistory: function(e) {
            r = [], this.hintEl.hide(), e && e.cancelCodSelect && this.checkboxEl.attr("checked", !1)
        }};
    return i
}, {requires: ["dom", "event"]}), KISSY.add("mods/status/ui", function(e, t, n, r, i) {
    var s = {_init: function() {
            var t = this.statusEl, n = this.statusTipsEl, r = t.one("div.J_StatusContent");
            e.mix(this, {contentEl: r,boxEl: r.one("div.box"),normalEl: t.one("div.normal"),disableEl: t.one("div.disable"),invalidEl: t.one("div.invalid"),fullTextEl: n.one(".J_FullText"),mostTextEl: n.one(".J_MostText"),invalidTextEl: t.one("span.J_InvalidText"),barEl: t.one("div.bar"),numEl: t.one("span.J_ToggleNum"),totalNumEl: t.all("span.J_TotalNum"),limitCount: parseInt(t.attr("data-limit"), 10),totalCount: parseInt(t.attr("data-total"), 10),delInvalidEl: e.one("#J_DelInvaid"),statusTipsCloseEl: n.one(".J_CloseStatusTips"),overOneMonthOpEl: n.one(".J_StatusTipsExtraOp")}), this.isTempCart = this.limitCount === -1, this._update(), this._bindEvents(), this.isShow && this._setText(), this._initRepeatBuyUI()
        },_initRepeatBuyUI: function() {
            if (!this.isShowRepeatBuy)
                return;
            this.repeatBuyUI || (this.repeatBuyUI = new n({statusContentEl: this.contentEl,repeatBuyAPI: this.repeatBuyAPI,ignoreCartAPI: this.ignoreCartAPI,addToCartAPI: this.addToCartAPI,userId: this.userId}))
        },_bindEvents: function() {
            var e = this;
            this.listen("updateStatus", this._update, this), this.listen("showRecommendOnly", this._showRecommendOnly, this), this.listen("hideStatusIfBoxIsHide", this._hideStatusIfBoxIsHide, this), t.on(e.statusTipsCloseEl, "click", function() {
                e.statusTipsEl.fadeOut()
            })
        },_showRecommendOnly: function() {
            this.contentEl.removeClass("hidden"), this.isShow || this.boxEl.addClass("hidden")
        },_hideStatusIfBoxIsHide: function() {
            this.boxEl.hasClass("hidden") && this.contentEl.addClass("hidden")
        },_update: function(t) {
            this.disableCount = this.normalCount = 0, e.each(this.items, function(e) {
                e.isDisable ? this.disableCount++ : this.normalCount++
            }, this), this.currentCount = this.disableCount + this.normalCount, this.disableCount || this.delInvalidEl.hide(), this._setWidth(), this._setCount(), (!t || !t.isUndo) && this._setText()
        },_setWidth: function() {
            var t = this.totalCount;
            e.each(["normal", "disable", "invalid"], function(e) {
                var n = this[e + "El"], r = this[e + "Count"];
                if (!n)
                    return;
                n.hide();
                if (r) {
                    var i = n.parent().width(), s = Math.ceil(r / t * i);
                    e == "normal" && (this.disableCount > 0 && (s -= 1), this.invalidCount > 0 && (s -= 1)), n.width(s + "px"), n.show()
                }
            }, this)
        },_setCount: function() {
            var e = this.currentCount;
            this.totalNumEl.html(e);
            try {
                TB.Global.setCartNum(e)
            } catch (t) {
            }
            this.isTempCart || this.barEl[e > this.limitCount ? "addClass" : "removeClass"]("warn")
        },_setText: function() {
            var e = this.currentCount;
            this.statusTipsEl.all("span.text").hide(), this.statusTipsEl.hide(), this.isTempCart || (e === this.totalCount ? this._showText("full") : e >= this.limitCount && this._showText("most"))
        },_showContent: function() {
            this.contentEl.removeClass("hidden")
        },_showText: function(t) {
            var n = this;
            switch (t) {
                case "full":
                case "most":
                    n.statusTipsEl.show();
                    var r = e.filter(n.items, function(e) {
                        return e.isOverOneMonth
                    });
                    r && r.length ? (n.overOneMonthOpEl.css("visibility", "visible"), !n.delOverOneMonth && n._initDelOverOneMonth(r), !n.favOverOneMonth && n._initFavOverOneMonth(r)) : n.overOneMonthOpEl.css("visibility", "hidden")
            }
            this[t + "TextEl"] && this[t + "TextEl"].show()
        },_initDelOverOneMonth: function() {
            var e = this, t = e.statusTipsEl.one(".J_DelItemsOneMonthAgo");
            t && t.length && !e.delOverOneMonth && (e.delOverOneMonth = new r({triggerEl: t,items: e.items}))
        },_initFavOverOneMonth: function() {
            var e = this, t = e.statusTipsEl.one(".J_FavItemsOneMonthAgo");
            t && t.length && !e.favOverOneMonth && (e.favOverOneMonth = new i({triggerEl: t,extraOpEl: e.overOneMonthOpEl,items: e.items,favoriteAPI: e.favoriteAPI}))
        }};
    return s
}, {requires: ["event", "mods/repeatbuy/ui", "mods/delete/del-over-one-month", "mods/fav/fav-over-one-month"]}), KISSY.add("mods/repeatbuy/ui", function(e, t, n, r, i, s, o, u) {
    function a(e) {
        for (var t = 0; t < e.length; t++)
            if (e[t].checked)
                return e[t];
        return null
    }
    var f = {_init: function() {
            this.trackerBase = "http://log.mmstat.com/tbcart.1.4?uid=" + this.userId, this._initTPL(), this._load(function(t) {
                this.log("callback data: %o", t), this._render(t), e.mix(this, {carouselEl: e.one("#J_RecommendCarousel"),prevEl: e.one("#J_RecommendCarouselPrev"),nextEl: e.one("#J_RecommendCarouselNext"),STEPS: 2}), this._initCarousel(), this._bindEvents()
            })
        },_initTPL: function() {
            var e = this.trackerBase + "&type=item&itemId={{item.itemId}}&catId={{item.catId}}", t = this.trackerBase + "&type=add&itemId={{item.itemId}}&catId={{item.catId}}", n = this.trackerBase + "&type=nope&itemId={{item.itemId}}&catId={{item.catId}}", r = this.trackerBase + "&type=prev", i = this.trackerBase + "&type=next";
            this.TPL = '<h3>温馨提示：你曾经购买了相关类目宝贝，现在是否还需要？</h3><div class="box-recommend-bd" id="J_RecommendCarousel"><ul class="ks-switchable-content">{{#each result as item}}  <li>    <div class="photo"><a class="J_MakePoint" href="{{item.href}}" data-point-url="' + e + '" target="_blank"><img src="{{item.img}}" /></a></div>' + '    <div class="title"><a class="J_MakePoint" href="{{item.href}}" data-point-url="' + e + '" target="_blank">{{item.title}}</a></div>' + '    <div class="sku">{{item.sku}}</div>' + '    <div class="price"><b>{{item.price}}</b></div>' + '    <div class="act">' + '      <a href="http://item.taobao.com/item.htm?id={{item.itemId}}" class="act-add J_MakePoint J_CartPluginTrigger" data-itemId="{{item.itemId}}" data-skuId="{{item.skuId}}" data-point-url="' + t + '">加入购物车</a>' + '      <a href="" class="act-nope J_MakePoint" data-itemId="{{item.itemId}}" data-point-url="' + n + '">不感兴趣</a>' + "    </div>" + "  </li>" + "{{/each}}" + "</ul>" + "</div>" + '<a href="" title="上一页" class="box-recommend-prev J_MakePoint" id="J_RecommendCarouselPrev" data-point-url="' + r + '">上一页</a>' + '<a href="" title="下一页" class="box-recommend-next J_MakePoint" id="J_RecommendCarouselNext" data-point-url="' + i + '">下一页</a>' + ""
        },_load: function(t) {
            this.log("start load, api is %s", this.repeatBuyAPI), r({url: this.repeatBuyAPI + "?t=" + +(new Date),success: e.bind(t, this),error: function() {
                },timeout: 5})
        },_render: function(n) {
            this.debug("load result: %s", n);
            try {
                n = s.parse(n)
            } catch (r) {
                throw new Error("json parse error in repeatbuy/ui")
            }
            if (!n.status) {
                this.error("error message: %s", n.message);
                return
            }
            if (n.status && n.result && n.result.length) {
                var o = e.map(n.result, function(e) {
                    return e.catId
                });
                this.broadcast("makepoint", {url: this.trackerBase + "&type=recommend&catId=" + o.join(",")}), this.broadcast("showRecommendOnly")
            }
            var u = i(this.TPL).render(n), a = this.containerEl = t.create('<div class="box-recommend" id="J_RecommendInStatusBox"></div>');
            a.innerHTML = u, t.append(a, this.statusContentEl), this._initCartPlugin()
        },_initCartPlugin: function() {
            var t = ~location.host.indexOf("taobao.com") ? "taobao.com" : "daily.taobao.net", n = "http://assets." + t + "/apps/cart/plugin/1.2/cartplugin.js?t=20111226.js";
            e.getScript(n, function() {
                typeof CartPlugin != "undefined" && (CartPlugin.init(null, {preventAll: !0,source: "repeatbuy"}), CartPlugin.on("addToCartSuccess", function() {
                    location.reload()
                }))
            })
        },_initCarousel: function() {
            this.carousel = new e.Carousel(this.carouselEl, {effect: "scrollx",hasTriggers: !1,easing: "easeOutStrong",viewSize: [922],steps: this.STEPS,circular: !1}), this._refreshBtnStatus(), this.carousel.on("beforeSwitch", this._refreshBtnStatus, this)
        },_bindEvents: function() {
            n.on(this.prevEl, "click", this._prevHandler, this), n.on(this.nextEl, "click", this._nextHandler, this), this.carouselEl.delegate("click", ".act-nope", this._nopeHandler, this)
        },_prevHandler: function(e) {
            e.preventDefault(), t.attr(e.target, "class").indexOf("gray") === -1 && this.carousel.prev()
        },_nextHandler: function(e) {
            e.preventDefault(), t.attr(e.target, "class").indexOf("gray") === -1 && this.carousel.next()
        },_addToCartHandler: function(n) {
            n.preventDefault();
            var i = n.target, u = t.attr(i, "data-itemId"), a = t.attr(i, "data-skuId");
            this.add_userpath("o"), this.log("add handler, itemId: %s", u), r({dataType: "text",url: this.addToCartAPI,data: {_input_charset: "utf-8",itemId: u,skuId: a,quantity: 1,rb: 1,t: +(new Date),ct: o.get("t")},success: e.bind(function(e) {
                    this.debug("addCart result: %s", e), e = s.parse(e), e.status ? location.reload() : this.error("addCart handler, result.status is false, message : %s", e.message)
                }, this),error: e.bind(function(e) {
                    this.log("nope handler error: %s", e)
                }, this)})
        },_nopeHandler: function(e) {
            e.preventDefault();
            var n = e.target, r = t.attr(n, "data-itemId");
            this._requestNope(r, null, n), this.add_userpath("p"), this.log("nope handler, itemId: %s", r)
        },_showNopePopup: function(e) {
            var n = t.offset(e).left + 400 > t.viewportWidth() - 30, r = new u.Popup({trigger: e,elCls: "nope-popup",align: {node: e,points: n ? ["tl", "tr"] : ["tr", "tl"]},content: '<form><h2>请选择原因</h2><ul><li><input type="radio" name="nopetype" value="1" /> 推荐的不错，但是我还没用完呢</li><li><input type="radio" name="nopetype" value="2" /> 推荐的不错，但是我刚买了新的了</li><li><input type="radio" name="nopetype" value="3" /> 推荐的宝贝不合我心意</li><li><input type="radio" name="nopetype" value="4" /> 其它原因<div><textarea></textarea></div></li></ul><div><button type="button">提交</button> 或 <span class="nope-popup-cancel">取消</span></div></form>'});
            return r.show(), r
        },_bindNopePopupEvents: function(e, r, i) {
            var s = e.get("el"), o = t.get("textarea", s);
            n.on(s, "click", function(n) {
                var u = n.target;
                if (u.nodeName === "BUTTON") {
                    this.log("submit");
                    var f = t.get("form", s), l = a(t.query("input", f)), c = l && l.value;
                    if (!c) {
                        alert("请选择理由");
                        return
                    }
                    var h = {text: c + (c === "4" ? "#" + o.value : "")};
                    this._requestNope(r, h, i, function() {
                        e.hide()
                    })
                } else
                    u.nodeName === "INPUT" && u.type.toUpperCase() === "RADIO" ? u.value === "4" ? (t.show(o), o.focus()) : t.hide(o) : t.hasClass(u, "nope-popup-cancel") && e.hide()
            }, this)
        },_requestNope: function(n, i, o, u) {
            this.log("request nope api"), r({dataType: "text",url: this.ignoreCartAPI,data: e.mix({_input_charset: "utf-8",itemId: n,t: +(new Date)}, i),success: e.bind(function(e) {
                    this.debug("nope result: %s", e), e = s.parse(e), e.status ? (this._deletePanel(t.parent(o, "li")), u && u()) : this.error("nope handler, result.status is false, message: %s", e.message)
                }, this),error: e.bind(function(e) {
                    this.log("nope handler error: %s", e)
                }, this)})
        },_deletePanel: function(n) {
            t.remove(n);
            var r = e.indexOf(n, this.carousel.panels);
            this.carousel.panels.splice(r, 1);
            var i = this.carousel.length = this.carousel.panels.length / this.STEPS;
            this._refreshBtnStatus(), i === 0 ? (t.remove(this.containerEl), this.broadcast("hideStatusIfBoxIsHide")) : i === Math.floor(i) && i === this.carousel.activeIndex && this.carousel.switchTo(this.carousel.activeIndex - 1)
        },_refreshBtnStatus: function(e) {
            if (!this.carousel)
                return;
            this.log("\ntoIndex: %s\nactiveIndex: %s\nlength: %s", e && e.toIndex, this.carousel.activeIndex, this.carousel.length);
            var t = e ? e.toIndex === 0 : this.carousel.activeIndex === 0, n = !1;
            (e ? e.toIndex : this.carousel.activeIndex) === Math.ceil(this.carousel.length) - 1 && (n = !0), this.prevEl[t ? "addClass" : "removeClass"]("box-recommend-prev-gray"), this.nextEl[n ? "addClass" : "removeClass"]("box-recommend-next-gray")
        }};
    return f
}, {requires: ["dom", "event", "ajax", "template", "json", "cookie", "overlay"]}), KISSY.add("mods/delete/del-over-one-month", function(e, t, n) {
    var r = "[del-over-one-month] ";
    return {_init: function() {
            this._bindEvents()
        },_bindEvents: function() {
            var e = this;
            n.on(e.triggerEl, "click", e._delHandler, e)
        },_delHandler: function() {
            var t = this;
            if (confirm("确认要删除这些宝贝吗？")) {
                var n = e.filter(t.items, function(e) {
                    return e.isOverOneMonth
                });
                t._doDel(n)
            }
        },_doDel: function(t) {
            var n = this;
            if (t && t.length) {
                var i = [], s = [];
                e.each(t, function(t) {
                    i.push(t.cartId), e.indexOf(t.order, s) === -1 && s.push(t.order)
                }), this.broadcast("updateOrders", {updateType: "deleteSome",operate: t,orders: s,success: function(s) {
                        s.status && (cart.undoItems = t, e.each(t, function(e, t) {
                            t === 0 && (e.isShowUodoMsg = !0), e.del()
                        }), n.broadcast("updateStatus"), i.length && n.broadcast("recordUncoItems", {cartIds: i}), e.log(r + "deleted items over one month."))
                    }})
            } else
                e.log(r + "no items over one month.")
        }}
}, {requires: ["dom", "event"]}), KISSY.add("mods/fav/fav-over-one-month", function(e, t, n) {
    var r = "[fav-over-one-month] ";
    return {_init: function() {
            this._bindEvents()
        },_bindEvents: function() {
            n.on(this.triggerEl, "click", this._favHandler, this)
        },_favHandler: function() {
            var t = this, n = e.filter(t.items, function(e) {
                return e.isOverOneMonth
            });
            confirm("将购物车中一个月前的商品全部移入收藏夹？") && (n.length ? t._doFav(n) : e.log(r + "no items over one month."))
        },_doFav: function(n) {
            var r = this;
            n = e.makeArray(n);
            var i = [];
            e.each(n, function(e) {
                i.push(e.itemId + ":" + e.skuId)
            });
            var s = {itemSkuList: i.join(","),_tb_token_: t.val("#_tb_token_")};
            e.jsonp(r.favoriteAPI, s, function(t) {
                e.isObject(t) && r._showTips(n, t.result.status, t.result.message)
            })
        },_showTips: function(n, r, i) {
            t.remove("#J_StatusBarFavOverOneMonthTips");
            var s = this, o = t.create('<div id="J_StatusBarFavOverOneMonthTips" class="fav-over-one-month-tips-box"></div>'), u;
            r ? u = t.create('<div class="msg fav-over-one-month-status"><p class="ok">成功移至收藏夹</p></div>') : i.errorCode === 8 ? u = t.create('<div class="msg fav-over-one-month-status"><p class="attention">' + i.error + "</p></div>") : u = t.create('<div class="msg fav-over-one-month-status"><p class="error">' + i.error + "</p></div>"), o.appendChild(u), t.insertAfter(o, s.extraOpEl);
            if (r) {
                var a = [], f = [];
                e.each(n, function(t) {
                    a.push(t.cartId), e.indexOf(t.order, f) === -1 && f.push(t.order)
                }), this.broadcast("updateOrders", {updateType: "deleteSome",operate: n,orders: f,success: function(t) {
                        t.status && (e.each(n, function(e) {
                            e.del()
                        }), e.later(function() {
                            s.broadcast("updateStatus")
                        }, 1500))
                    }})
            }
            e.later(function() {
                t.remove(o)
            }, 3e3)
        }}
}, {requires: ["dom", "event"]}), KISSY.add("mods/delete/cart-ui", function(e, t, n) {
    var r = {_init: function() {
            e.mix(this, {invalidHintEl: e.one("#J_CleanInvlid")}), this._bindEvents()
        },_bindEvents: function() {
            n.on(this.delSelectTriggerEl, "click", this._delSelectHandler, this), n.on(this.delInvalidTriggerEl, "click", this._delInvalidHandler, this)
        },_addHighlight: function(n) {
            if (!e.isArray(n) || !n.length)
                return;
            this.highlightEl && this._removeHighlight();
            var r = n[0].itemEl, i = t.offset(r), s = t.width(r), o = t.height(r), u = r;
            do {
                u = t.next(u, "tr");
                if (!u)
                    break;
                t.hasClass(u, "hidden") || (o += t.height(u))
            } while (!0);
            this.highlightEl = t.create('<div style="border:2px solid #ffaa56">'), t.css(this.highlightEl, {position: "absolute",left: i.left,top: i.top,width: s - 4,height: o - 4}), t.appendTo(this.highlightEl, "body")
        },_removeHighlight: function() {
            this.highlightEl && (t.remove(this.highlightEl), this.highlightEl = null)
        },_delSelectHandler: function() {
            var t = this, n = t.isComboDel, r = n ? t.items : e.filter(t.items, function(e) {
                return e.model && e.model.isSelected
            });
            t.add_userpath("g");
            if (!r.length) {
                alert("请选择宝贝");
                return
            }
            n && t._addHighlight(r), confirm("确定要删除 选中 的宝贝吗？") && t._batchDel(r), t._removeHighlight()
        },_delInvalidHandler: function() {
            this.add_userpath("h");
            var t = e.filter(cart.items, function(e) {
                return e.isDisable
            });
            confirm("确定要清除失效的宝贝吗？") && this._batchDel(t, "deleteInvalid")
        },_batchDel: function(t, n) {
            var r = this, i = [], s = [];
            e.each(t, function(t) {
                i.push(t.cartId), e.indexOf(t.order, s) === -1 && s.push(t.order)
            }), this.broadcast("updateOrders", {updateType: n || "deleteSome",operate: t,orders: s,success: function(s) {
                    s.status ? (cart.undoItems = t, e.each(t, function(e, t) {
                        t === 0 && (e.isShowUodoMsg = !0), e.del()
                    }), r.broadcast("updateStatus"), n === "deleteInvalid" ? r._showInvalidHint('<p class="ok">失效宝贝清除成功。</p>') : i.length && r.broadcast("recordUncoItems", {cartIds: i})) : n === "invalid" && r._showInvalidHint('<p class="error">失效宝贝清除失败。</p>')
                }})
        },_showInvalidHint: function(t) {
            var n = this.invalidHintEl;
            n.html(t), n.show();
            var r = this;
            e.later(function() {
                n.hide(), r.delInvalidTriggerEl.hide()
            }, 2e3)
        }};
    return r
}, {requires: ["dom", "event"]}), KISSY.add("mods/relative/ui", function(e, t, n, r, i, s) {
    var o = {"最近收藏的": "fav","最近浏览过的": "browser","猜你喜欢的": "like"}, u = '<p class="tip-nodata tip">暂无最近浏览过的宝贝</p>', a = '<p class="tip-nodata tip">暂无猜你喜欢的宝贝</p>', f = '<p class="tip-loading tip"><img src="http://img02.taobaocdn.com/tps/i2/T1Q2BUXaxFXXXXXXXX-32-32.gif" />数据加载中...</p>', l = {_init: function() {
            if (!this.containerEl)
                return;
            var t = e.one("#J_Auctions");
            e.mix(this, {auctionEl: t,panelEls: t.all("div.J_Panel"),triggerEls: t.all("li.J_Triggers"),clearEl: e.one("#interested a.J_ClearBrowse"),status: {}}), this._bindEvents(), this._loadData_fav(), this.log("inited")
        },_bindEvents: function() {
            this.containerEl.delegate("click", "li.J_Triggers a", this._preventDefault, this), n.on(this.clearEl, "click", this._clearBrowserHandler, this)
        },_preventDefault: function(e) {
            e && e.preventDefault()
        },_clearBrowserHandler: function(t) {
            t && t.preventDefault(), this.add_userpath("n"), TBskip.recentViewedItems.clear("f"), e.one(this.panelEls[this.tabs.activeIndex]).html(u), this._hideClearForever()
        },_hideClearForever: function() {
            this.clearEl.hide(), this.hideClearEl = !0
        },_initTabs: function() {
            this.tabs = new e.Tabs("#J_Auctions", {markupType: 2,activeTriggerCls: "current",triggers: this.triggerEls,panels: this.panelEls,autoplay: !0,interval: 5}), this.tabs.on("switch", function(e) {
                this._loadTabData(e.currentIndex)
            }, this)
        },_loadTabData: function(n) {
            var r = e.trim(t.text(this.triggerEls[n]));
            r = o[r], !this.hideClearEl && this.clearEl[r === "browser" ? "show" : "hide"]();
            if (this.status[n])
                return;
            this.status[n] = "loading", r && "_loadData_" + r in this && this["_loadData_" + r](n)
        },_loadData_fav: function(n) {
            n = n || 0;
            var r = this, i = function() {
                t.remove(r.triggerEls[n]), t.remove(r.panelEls[n]), Array.prototype.splice.call(r.triggerEls, 0, 1), Array.prototype.splice.call(r.panelEls, 0, 1), e.one(r.triggerEls[0]).addClass("current"), e.one(r.panelEls[0]).show(), r._initTabs(), r._loadTabData(0)
            };
            this._showLoading(n);
            if (!this.favoriteListAPI) {
                i();
                return
            }
            e.getScript(this.favoriteListAPI + "&t=" + e.now(), {success: function() {
                    var e = window.result;
                    if (!e || !e.collectList)
                        return i();
                    try {
                        var t = r._parseData(e.collectList, "fav");
                        t += '<a class="gotomyfav" href="http://favorite.taobao.com/collect_list.htm?scjjc=d2">去我的收藏夹 >></a>', r.panelEls[n].innerHTML = t, r._initTabs()
                    } catch (s) {
                        i()
                    }
                },error: i,timeout: 2})
        },_loadData_browser: function(t) {
            var n = this;
            this._showLoading(t), e.getScript("http://a.tbcdn.cn/p/recentview/index.js", function() {
                recentView && recentView.init({callback: function(e) {
                        var r;
                        e && e.length ? r = n._parseData(e.slice(0, 5), "browser") : (r = u, n._hideClearForever()), n.panelEls[t || 0].innerHTML = r
                    },type: "r"})
            })
        },_loadData_like: function(n) {
            if (t.get("#p4p-block")) {
                window.p4AsyncTrigger && window.p4AsyncTrigger();
                return
            }
            this._showLoading(n);
            var r = e.now();
            e.getScript(this.likeAPI + "&t=" + r + "&jsonp=KISSY.callback_" + r, {success: function() {
                },error: function() {
                    i.panelEls[n || 0].innerHTML = a
                },timeout: 2,charset: "gbk"});
            var i = this;
            e["callback_" + r] = function(e) {
                var t = e.list.length ? i._parseData(e.list, "like") : a;
                i.panelEls[n || 0].innerHTML = t
            }
        },_parseData: function(t, n) {
            "_formatData_" + n in this && (t = this["_formatData_" + n](t));
            var r = "&ad_id=&am_id=&cm_id=&pm_id=", i = {fav: r + "15001250084ca92e6beb",browser: r + "1500121087bd5308a47e",like: r + "150012108882a30a058e"}, o = /_sum\.jpg|_70x70\.jpg/;
            e.each(t, function(e) {
                e.detailUrl = n == "like" ? e.detailUrl : "http://ju.atpanel.com/?url=" + e.detailUrl + i[n], e.imageUrl = e.imageUrl.replace(o, "_160x160.jpg")
            }), t = {data: t};
            var u = s('<ul>{{#each data as item}}<li><a href="{{item.detailUrl}}" target="_blank" class="pic"><img src="{{item.imageUrl}}" /></a><a href="{{item.detailUrl}}" target="_blank" class="desc">{{item.title}}</a><span class="price g_price"><span>&yen;</span>{{item.price}}</span></li>{{/each}}</ul>');
            return u.render(t)
        },_formatData_browser: function(t) {
            var n = [];
            return e.each(t, function(e) {
                n.push({title: e.title || "",price: parseFloat(e.price / 100, 10).toFixed(2),detailUrl: e.url,imageUrl: e.pic + "_sum.jpg"})
            }), n
        },_formatData_like: function(t) {
            var n = [];
            return e.each(t, function(e) {
                n.push({title: e.name,price: parseInt(e.price, 10).toFixed(2),detailUrl: e.url,imageUrl: e.pic + "_160x160.jpg"})
            }), n
        },_showLoading: function(e) {
            this.panelEls[e].innerHTML = f
        }};
    return l
}, {requires: ["dom", "event", "switchable", "sizzle", "template"]}), KISSY.add("mods/floatbar/ui", function(e, t, n, r) {
    var i = 35, s = {_init: function() {
            this.goTopEl = n.get("i.goto", this.barEl), this._bindGoTopEvents();
            if (t.ie === 6)
                return;
            var r = this.barEl.offset().top;
            e.mix(this, {containerEl: n.create('<div style="position:relative;"></div>'),top: r}), n.data(this.barEl, "top", r), n.insertBefore(this.containerEl, this.barEl), this._bindOtherEvents(), this._posBar()
        },_bindGoTopEvents: function() {
            r.on(this.goTopEl, "click", this._goTopHandler, this), r.on(this.goTopEl, "mouseenter mouseleave", function() {
                n.toggleClass(this, "goto-hover")
            })
        },_bindOtherEvents: function() {
            r.on(window, "scroll", this._posBar, this), this.listen("calFloatbarPosition", this._calBarPos, this)
        },_goTopHandler: function() {
            window.scrollTo(0, 0)
        },_posBar: function() {
            var e = n.viewportHeight(), t = n.scrollTop(), r = n.data(this.barEl, "top"), s = r + i - e - t;
            s >= 0 ? (this.barEl.replaceClass("default", "fixed-bottom"), this.barEl.css("position", "fixed"), n.insertAfter(this.barEl, this.containerEl)) : (this.barEl.replaceClass("fixed-bottom", "default"), this.barEl.css("position", "static"), n.append(this.barEl, this.containerEl)), this._toggleGoTopEl()
        },_toggleGoTopEl: function() {
            n[n.scrollTop() ? "show" : "hide"](this.goTopEl)
        },_calBarPos: function() {
            this.top = e.one(this.containerEl).offset().top, this._posBar()
        }};
    return s
}, {requires: ["ua", "dom", "event"]}), KISSY.add("mods/update/ui", function(e, t, n, r, i) {
    var s = {_init: function() {
            this.listen("updateOrders", this._request, this)
        },_request: function(n) {
            this.log("start request, type: %s, data: %o", n.updateType, n);
            var s = [];
            e.each(e.makeArray(n.orders), function(e) {
                var t = this._getOrderData(e, n);
                t && s.push(t)
            }, this), this.log("[log] post data: %s", i.stringify(s));
            if (!s.length)
                return;
            r({type: "POST",dataType: "text",url: this.saveAPI,data: {_input_charset: "utf-8",tk: t.val("#_tb_token_"),data: i.stringify(s),shop_id: this.shopId,t: +(new Date)},success: e.bind(function(t) {
                    this.log("update result getted");
                    try {
                        t = i.parse(e.trim(t))
                    } catch (r) {
                        this.error("[err] message: %s", r && r.message), n.error();
                        return
                    }
                    this.debug("update result getted, status is: %s", t.status), this._successHandler(t, n)
                }, this),error: n && n.error || function() {
                },timeout: 5})
        },_getOrderData: function(t, n) {
            var r = {shopId: t.shopId,comboId: t.comboId,shopActId: t.shopActId,cart: [],operate: [],type: n.updateType}, i = n.updateUnselect ? e.makeArray(n.operate) : t.items, s = {}, o = !0;
            e.each(i, function(e) {
                s[e.cartId] = !0;
                if (e.model && (e.model.isSelected || e.cbId || e.isRedemption || e === n.operate)) {
                    var t = n.updateType === "update" && e === n.operate ? n.quantity : e.model.quantity;
                    r.cart.push({quantity: t,cartId: e.cartId}), o = !1
                }
            });
            if (o && n.updateType === "check")
                return;
            return e.each(e.makeArray(n.operate), function(e) {
                s[e.cartId] && r.operate.push(e.cartId)
            }), r
        },_successHandler: function(e, t) {
            e.status ? this._updateOrders(e) : t.updateType == "update" && t.error && t.error(e), t && t.success && t.success(e)
        },_updateOrders: function(t) {
            var n = this, r = n._formatItems(), i = t.cart, s = t.shopPromo;
            i && e.each(i, function(t, n) {
                e.each(t, function(e, n) {
                    e = r[n], e.model && e.model.set(t[n])
                })
            }), s && e.each(s, function(e, t) {
                n._updatePromoTip(t, e)
            }), n.broadcast("updateOrdersSuccess", t)
        },_updatePromoTip: function(t, n) {
            var r = e.one("#J_SaveInfo_" + t);
            if (!r)
                return;
            var i = r.parent("tr");
            n ? (r.html(n), i.show(), i.removeClass("hide-border")) : (i.hide(), i.addClass("hide-border"))
        },_formatItems: function() {
            var t = {};
            return e.each(this.items, function(e) {
                t[e.cartId] = e
            }), t
        }};
    return s
}, {requires: ["dom", "event", "ajax", "json"]}), KISSY.add("mods/update/service-ui", function(e, t, n, r, i) {
    function s(t) {
        var n = [];
        return e.each(t, function(e, t) {
            n.push(t.split("|")[0])
        }), n.join(",")
    }
    var o = {_init: function() {
            this.listen("updateService", this._request, this)
        },_request: function(t) {
            this.log("start request, type: %s, data: %o", t.updateType, t);
            var n = [];
            e.each(e.makeArray(t.orders), function(e) {
                var r = this._getOrderData(e, t);
                r && n.push(r)
            }, this), this.log("[log] post data: %s", i.stringify(n));
            if (!n.length)
                return;
            r({type: "POST",dataType: "text",url: this.serviceAPI,data: {cartId: t.operate.cartId,price: t.operate.model.singlePrice * 100,itemId: t.operate.itemId,skuId: t.operate.skuId,serviceId: s(t.operate.serviceData.services)},success: e.bind(function(n) {
                    this.log("get data: %s", e.trim(n));
                    try {
                        n = i.parse(e.trim(n)), this._successHandler(n, t)
                    } catch (r) {
                        this.error("[err] message: %s", r && r.message), t.error();
                        return
                    }
                }, this),error: t && t.error || function() {
                },timeout: 5})
        },_getOrderData: function(t, n) {
            var r = {shopId: t.shopId,cart: [],operate: [],type: n.updateType}, i = n.updateUnselect ? e.makeArray(n.operate) : t.items, s = {}, o = !0;
            e.each(i, function(e) {
                s[e.cartId] = !0;
                if (e.model && (e.model.isSelected || e === n.operate)) {
                    var t = n.updateType === "update" && e === n.operate ? n.quantity : e.model.quantity;
                    r.cart.push({quantity: t,cartId: e.cartId}), o = !1
                }
            });
            if (o && n.updateType === "check")
                return;
            return e.each(e.makeArray(n.operate), function(e) {
                s[e.cartId] && r.operate.push(e.cartId)
            }), r
        },_successHandler: function(e, t) {
            e.status && e.cart && this._updateOrders(e.cart), t && t.success && t.success(e)
        },_updateOrders: function(e) {
            var t = this._formatItems();
            for (var n in e)
                for (var r in e[n]) {
                    var i = t[r];
                    i && i.model && i.model.set(e[n][r])
                }
        },_formatItems: function() {
            var t = {};
            return e.each(this.items, function(e) {
                t[e.cartId] = e
            }), t
        }};
    return o
}, {requires: ["dom", "event", "ajax", "json"]}), KISSY.add("mods/topsearch/ui", function(e, t, n, r) {
    var i = "tsearch-tabs-active", s = [["item", "输入您想要的宝贝"], ["shop", "输入您想要的店铺名或掌柜名"]], o = {_init: function() {
            var t = e.one("#J_TSearchTabs"), n = e.one("#J_TSearchForm");
            if (!t || !n)
                return;
            e.mix(this, {containerEl: e.one("#J_TSearch"),formEl: n,tabEls: t.all("li"),inputEl: e.one("#q"),labelEl: n.one("label")}), this._bindEvents(), e.later(this._resetForm, 0, !1, this)
        },_bindEvents: function() {
            r.on(this.tabEls, "click", this._toggleTabHandler, this), r.on(this.formEl, "submit", this._submitHandler, this), r.on(this.inputEl, "focus", this._inputFocusHandler, this), r.on(this.inputEl, "blur", this._inputBlurHandler, this)
        },_toggleTabHandler: function(t) {
            t.preventDefault();
            var r = e.one(n.parent(t.target, "li"));
            if (!r.hasClass(i)) {
                this.tabEls.removeClass(i), r.addClass(i);
                var o = e.indexOf(r.getDOMNode(), this.tabEls);
                o !== -1 && (this.formEl.getDOMNode().search_type.value = s[o][0], this.labelEl.html(s[o][1]))
            }
            this._focusInput()
        },_submitHandler: function() {
            var e = this.formEl.getDOMNode();
            switch (e.search_type.value) {
                case "item":
                    q.value === "" && (form.action = "http://list.taobao.com/browse/cat-0.htm");
                    break;
                case "shop":
                    e.action = "http://shopsearch.taobao.com/browse/shop_search.htm"
            }
        },_inputFocusHandler: function() {
            this.labelEl.addClass("hidden")
        },_inputBlurHandler: function() {
            e.trim(this.inputEl.val()) === "" && this.labelEl.removeClass("hidden")
        },_focusInput: function() {
            this.inputEl.getDOMNode().focus(), e.UA.ie && this.inputEl.val(this.inputEl.val())
        },_resetForm: function() {
            var e = this.formEl.getDOMNode();
            e.search_type.value = "item"
        }};
    return o
}, {requires: ["ua", "dom", "event"]}), KISSY.add("mods/tiao/ui", function(e, t, n) {
    var r = 5, i = {_init: function() {
            this.triggerEl = this._render(), this._bindEvents(), this.log("inited")
        },_render: function() {
            var e = t.create('<span class="del-items mg-left">帮我挑</span>');
            return t.insertAfter(e, t.get("#J_DelSelect")), e
        },_bindEvents: function() {
            n.on(this.triggerEl, "click", this._loadTiaoScriptAndRenderPopup, this)
        },_loadTiaoScriptAndRenderPopup: function() {
            if (!this._validate()) {
                alert("请选择宝贝");
                return
            }
            this._loadTaoScript(e.bind(this._renderPopup, this))
        },_validate: function() {
            if (!this.items)
                return;
            var t = e.filter(this.items, function(e) {
                return e.model && e.model.isSelected
            });
            return t.length
        },_loadTaoScript: function(t) {
            this.log("load script"), e.getScript("http://a.tbcdn.cn/apps/matrix-tiao/js/tiao-module.js?t=20111128.js", function() {
                e.later(t, 100)
            }), this._loadTaoScript = function(e) {
                if (!window.Tiao)
                    return;
                e()
            }
        },_renderPopup: function() {
            this.log("render popup, Tiao is %o", window.Tiao);
            if (!window.Tiao)
                return;
            var e = window.Tiao;
            e._tb_token_ = t.get("#_tb_token_").value, e.param = {moduleId: 3};
            var n = this._getItemsObj();
            n && e.create(n)
        },_getItemsObj: function() {
            if (!this.items)
                return;
            var n = e.filter(this.items, function(e) {
                return e.model && e.model.isSelected
            }).slice(0, r);
            return e.map(n, function(e) {
                return {id: e.itemId,pic: t.get("img.itempic", e.itemEl).src.replace("_60x60.jpg", "")}
            })
        }};
    return i
}, {requires: ["dom", "event"]}), KISSY.add("mods/tmall/ui", function(e, t, n, r, i, s) {
    var o = '<tr class="tip-loading tip"><td colspan="8"><img src="http://img02.taobaocdn.com/tps/i2/T1Q2BUXaxFXXXXXXXX-32-32.gif" />数据加载中...</td></tr>', u = {_init: function() {
            if (!this.containerEl)
                return;
            this._bindEvents(), this._loadData(), this.log("inited")
        },_bindEvents: function() {
            var t = this;
            this.containerEl.delegate("mouseenter", "span.small2big-text", function(t) {
                var n = t.target || event.srcElement, r = e.one(n).parent("tr");
                new s({imgEl: r.one("img.itempic"),item: r})
            }), this.containerEl.delegate("click", ".J_Del", function(n) {
                t._preventDefault(n);
                var i = n.target || event.srcElement, s = e.one(i).parent("tr"), o = s.attr("data-cartid"), u = e.DOM.val("#_tb_token_");
                window.confirm("确认要删除该宝贝吗?") && e.io.post(t.delTmallSpecialAPI, {cartId: o,tk: u}, function(e) {
                    if (e && e.result === "true") {
                        t._addHighlight(s), t.quantity -= e.num, s.css("opacity", 1);
                        var n = r(s, {opacity: 0}, .5, "easeNone", function() {
                            s.remove(t.containerEl), t._removeHighlight(), t._updateSpecialAmount()
                        });
                        n.run()
                    } else
                        t._hideLoading()
                }, "json")
            })
        },_loadData: function() {
            var n = this, r = t.val("#isGrayUser");
            if (r !== "true")
                return;
            n._showLoading(), e.getScript(this.tmallListAPI, {success: function() {
                    var r = window.result;
                    if (!r || !r.cartInfo) {
                        n._hideLoading();
                        return
                    }
                    n.quantity = r.quantity;
                    var i = [], s = Math.random().toString().slice(2, 9);
                    (new Image).src = "http://ac.atpanel.com/tmbuy.1.1?cache=" + s, i.push('<tr class="shop"><td colspan="8">需天猫结算的商品</td></tr>'), e.each(r.cartInfo, function(t) {
                        var n = [], s = Math.random().toString().slice(2, 9);
                        n.push('<tr class="disable" data-cartid="{cartId}" data-itemid="{itemId}" data-skuid="{skuId}"><td class="s-chk"><a target="_blank" href="' + r.tmallCartUrl + (r.tmallCartUrl.indexOf("?") === -1 ? "?" : "&") + 'from=detail" title="含天猫特色服务，仅可在天猫购物袋结算">需天猫结算&nbsp;&rsaquo;&nbsp;</a></td><td class="s-title"><a href="{detailUrl}" target="_blank" class="J_MakePoint"><span class="small2big-text J_MakePoint">查看大图</span><img src="{pictUrl}" class="itempic J_MakePoint">{itemTitle}</a><div class="props">'), t.skuInfo && e.each(t.skuInfo, function(t) {
                            n.push(e.substitute("<span>{key}: {value}</span>", t))
                        }), n.push('</div></td><td class="s-point">-</td><td class="s-price ">-</td><td class="s-amount ">-</td><td class="s-agio">-</td><td class="s-total">-</td><td class="s-del"><a href="javascript:;" class="J_Del  J_MakePoint">删除</a></td></tr>'), i.push(e.substitute(n.join(""), t))
                    }), t.html(n.containerEl, i.join("")), t.data("#float-bar", "top", t.offset("#J_CartEnable").top + t.height("#J_CartEnable"))
                },error: function() {
                    n._hideLoading()
                },timeout: 2})
        },_updateSpecialAmount: function() {
            var e = t.html(t.query(".tip", ".box"));
            this.quantity ? (t.html(t.query(".tip", ".box"), e.replace(/\d+/g, this.quantity)), t.show(t.query(".tip", ".box"))) : t.hide(t.query(".tip", ".box"))
        },_addHighlight: function(e) {
            this.log("add highlight"), this.highlightEl && this._removeHighlight();
            var n = t.offset(e), r = t.width(e), i = t.height(e);
            this.log("itemEl's left: %s, top: %s, width: %s, height: %s", n.left, n.top, r, i), this.highlightEl = t.create('<div style="border:2px solid #ffaa56;">'), t.css(this.highlightEl, {position: "absolute",left: n.left,top: n.top,width: r - 4,height: i - 4}), t.appendTo(this.highlightEl, "body")
        },_removeHighlight: function() {
            this.log("remove highlight"), t.remove(this.highlightEl), this.highlightEl = null
        },_showLoading: function() {
            this.containerEl.html(o)
        },_hideLoading: function() {
            this.containerEl.html("")
        },_preventDefault: function(e) {
            e && e.preventDefault ? e.preventDefault() : event.returnValue = !1
        }};
    return u
}, {requires: ["dom", "event", "anim", "mods/delete/item-ui", "mods/bigpic/ui"]}), KISSY.add("mods/redemption/ui", function(e, t) {
    var n = e.Cookie, r = e.DOM, i = "lastRedemptionCartId";
    return {_init: function() {
            var s = this, o = r.get("#J_Item_" + n.get(i));
            o && s._scrollToLastedAddItem(o), s.listen("updateOrdersSuccess", function(t) {
                var n = t.redemption;
                if (!e.isPlainObject(n))
                    return;
                e.each(n, function(e, t) {
                    var n = s._getCurrentOrder(t);
                    if (!n)
                        return;
                    s._updateRedemptionItemStatus(e.items), s._updateRedeemedQuantity(n, parseInt(e.amount, 10)), s._updateShopTotalPrice(n, e.totalPrice), s._updateRedemptionAmount(n, e.totalAmount)
                })
            }), s.triggers.length && s.triggers.each(function(e) {
                new t({trigger: e,isAutoRender: o && e.parent("tbody").contains(o)})
            })
        },_scrollToLastedAddItem: function(e) {
            r.scrollTop(r.offset(e).top), n.remove(i)
        },_getCurrentOrder: function(t) {
            var n = e.all("#J_CartEnable .J_Order").filter(function(n) {
                return t === e.trim(r.attr(n, "data-shopid"))
            })[0];
            return n ? e.one(n) : n
        },_updateRedeemedQuantity: function(e, t) {
            var n = e.one(".J_Remain"), r = e.one(".J_RedemptionList");
            n && n.html(t), r && r[t ? "removeClass" : "addClass"]("disabled")
        },_updateRedemptionAmount: function(e, t) {
            var n = e.one(".J_TotalRedemptionAmount");
            n && n.html(t)
        },_updateShopTotalPrice: function(e, t) {
            var n = e.one(".J_TotalPrice");
            n && n.html(t)
        },_updateRedemptionItemStatus: function(t) {
            e.each(t, function(t, n) {
                var r = e.one("#J_Item_" + n);
                if (!r)
                    return;
                r.attr("data-promoid", t.promoId), r[t.isValid ? "removeClass" : "addClass"]("disable")
            })
        }}
}, {requires: ["./list"]}), KISSY.add("mods/redemption/list", function(e, t, n, r, i) {
    var s = e.DOM, o = '<div class="panels ks-switchable-content">{{#each data as curDataList curIndex}}<ul class="panel clearfix{{#if curIndex > 0}} hidden{{/if}}">{{#each curDataList as curData}}<li><div class="pic s100"><a href="{{curData.link}}" target="_blank"><img {{#if curIndex > 0}}data-ks-lazyload-custom{{#else}}src{{/if}}="{{curData.img}}" /></a></div><p class="title"><a href="{{curData.link}}" target="_blank" title="{{curData.title}}">{{curData.shortTitle}}</a></p><p class="price"><span class="origin-price"><i class="rmb">&yen;</i>{{curData.originPrice}}</span><span class="promo-price"><i class="rmb">&yen;</i>{{curData.promoPrice}}</span></p><a href="#" class="J_SelectSku select-sku" data-itemid="{{curData.itemId}}" data-url="{{curData.api}}">换购</a><i class="frame"></i></li>{{/each}}</ul>{{/each}}</div>', u = "redemption-expanded", a = "disabled";
    return {_init: function() {
            var t = this, n = t.trigger, r = n.parent("tr");
            e.mix(t, {rowBox: r,isRendered: !1,container: r.one(".J_RedemptionList")}), t._bindEvents(), t.on("rendered", function(e) {
                t.isRendered = !0, t.rowBox.addClass(u), e.isNeedPage && (t.container.addClass("multi-pages"), t._initPage()), t._initSku()
            }), t._isRedemptionAble() && t.container.addClass(a), t.isAutoRender && n.fire("click")
        },_isRedemptionAble: function() {
            var e = this.rowBox.one(".J_Remain");
            return parseInt(e.text(), 10) > 0
        },_initPage: function() {
            new e.Slide(this.container, {effect: "fade",navCls: "tabs",easing: "easeOutStrong",autoplay: !1,lazyDataType: "img-src"})
        },_initSku: function() {
            var e = this, t = e.container.all(".J_SelectSku");
            t.each(function(e) {
                new i({trigger: e})
            })
        },_bindEvents: function() {
            var e = this;
            e.trigger.on("click", function(t) {
                t.preventDefault(), e.container[e._isRedeedAble() ? "removeClass" : "addClass"]("disabled"), e.isRendered ? e.rowBox.toggleClass(u) : e._request()
            })
        },_isRedeedAble: function() {
            var e = parseInt(this.rowBox.one(".J_Remain").text(), 10);
            return e > 0
        },_request: function() {
            var t = this, n = t.redemptionAPI;
            e.io({type: "get",url: t.trigger.attr("data-url"),dataType: "json",success: function(n) {
                    if (!e.isPlainObject(n) || !n.status || !e.isArray(n.list) || !n.list.length)
                        return;
                    t._render(n.list)
                }})
        },_render: function(e) {
            var n = this, r = n._formatData(e), i = t(o).render({data: r});
            n.container.html(i), n.fire("rendered", {isNeedPage: r.length > 1})
        },_formatData: function(t) {
            var n = [], r = Math.ceil(t.length / 5);
            e.each(t, function(e) {
                var t = e.title;
                e.shortTitle = t.length > 10 ? t.substring(0, 10) + "..." : t
            });
            for (var i = 0; i < r; i++)
                n[i] = t.splice(0, 5);
            return n
        }}
}, {requires: ["template", "switchable", "datalazyload", "./sku"]}), KISSY.add("mods/redemption/sku", function(e, t) {
    var n = e.DOM, r = e.Cookie, i = '{{#each prop as curPropValues curPropName}}<dl class="prop clearfix J_Prop"><dt>{{curPropName}}：</dt><dd><ul class="clearfix">{{#each curPropValues as curPropValue curPvid}}{{#if curPvid != "pvId" && curPvid != "type"}}<li data-prop="{{curPropName}}" data-pvid="{{curPvid}}" class="{{#if curPvid == curPropValues.pvId}} selected{{/if}}{{#if curPropValue.length == 2}} img-mode {{/if}}" title="{{curPropValue[0]}}"><a href="javascript: void(0)" {{#if curPropValue.length == 2}}style="background:url({{curPropValue[1]}}) center no-repeat;"{{/if}}><span>{{curPropValue[0]}}</span></a><i></i></li>{{/if}}{{/each}}</ul></dd></dl>{{/each}}', s = '<dl class="amount clearfix"><dt>购买数量：</dt><dd><input type="text" value="1" class="J_Amount" /><span class="unit">件</span><span class="stock">（库存<em class="J_Stock" data-defstock="{{stock}}">{{stock}}</em>件）</span><div class="msg hidden-msg"><p class="error J_ErrorInfo"></p></div></dd></dl><p class="operate"><a href="#" class="add-cart J_AddCart {{#if hasSku}}btn-disabled{{/if}}">确定</a><a href="#" class="cancel J_Cancel">取消</a></p>', o = "sku-expanded", u = "selected";
    return {_init: function() {
            var t = this, n = t.trigger, r = n.parent("tr");
            e.mix(t, {rowBox: r,hasSku: !0,skuData: null,skuInfo: {prop: {},pvids: null},propAmount: 0,container: r.one(".J_SkuPanel")}), t._initMask(), t._bindEvents(), t.on("rendered", function() {
                var e = t.container;
                t.rowBox.addClass(o), t.mask.show(), n.parent("li").addClass(u), t.quantityInput = e.one(".J_Amount"), t.errorBox = e.one(".J_ErrorInfo"), t.hasSku && t._initSkuSelect(), t._initQuantity(), t._initBtnAddCart(), t._initBtnCancel()
            })
        },_initMask: function() {
            var t = this, r = t.rowBox.one(".J_Mask");
            r || (r = n.create('<div class="J_Mask mask"><i></i></div>'), t.container.parent().prepend(r)), t.mask = e.one(r)
        },_bindEvents: function() {
            var e = this, t = e.trigger;
            t.on("click", function(t) {
                t.preventDefault();
                if (!e._isRedemptionAble())
                    return;
                e.skuData ? e._render() : e._request()
            })
        },_isRedemptionAble: function() {
            var e = this.rowBox.one(".J_Remain");
            return parseInt(e.text(), 10) > 0
        },_request: function() {
            var t = this;
            e.io({url: t.trigger.attr("data-url"),dataType: "jsonp",jsonpCallback: "jsonpGetSkuInfo" + e.guid(),success: function(n) {
                    e.isPlainObject(n) && n.success && (t.skuData = n, t.hasSku = !!n.prop, t._render())
                },charset: "gbk"})
        },_render: function() {
            var e = this, n = e.skuData, r = "", o = t(s).render({hasSku: e.hasSku,stock: n.item.stock});
            e.hasSku && (r = t(i).render(n)), e.container.html(r + o), e.fire("rendered")
        },_initSkuSelect: function() {
            var t = this, n = t.container.all(".J_Prop");
            t.propAmount = n.length, n.each(function(n) {
                var r = n.all("li");
                r.on("click", function(n) {
                    n.preventDefault(), t._handleItemClick(e.one(this), r)
                })
            }), t.on("skuChange", function(e) {
                t._recordPropInfo(e), t._updateStock(), t._validateQuantity()
            })
        },_handleItemClick: function(e, t) {
            var n = this;
            e.hasClass(u) ? e.removeClass(u) : (t.each(function(e) {
                e.removeClass(u)
            }), e.addClass(u)), n.fire("skuChange", {isSelected: e.hasClass(u),prop: e.attr("data-prop"),pvid: e.attr("data-pvid")})
        },_isAllPropSelected: function() {
            var t = this, n = t.skuInfo.prop, r = 0;
            return e.each(n, function(e) {
                e && (r += 1)
            }), t.propAmount === r
        },_recordPropInfo: function(e) {
            var t = this, n = t.skuInfo, r = n.prop;
            e.isSelected ? r[e.prop] = e.pvid : delete r[e.prop], n.pvids = t._isAllPropSelected() ? t._getCurrentPvids() : null
        },_updateStock: function() {
            var e = this, t = e.skuData.skuMap, n = e.skuInfo.pvids, r = e.container.one(".J_Stock"), i = e._isAllPropSelected() ? t[n].stock : r.attr("data-defstock");
            r.html(i)
        },_getCurrentPvids: function() {
            var e = this, t = e.skuData.skuMap, n;
            for (n in t)
                if (t.hasOwnProperty(n) && e._isMatchThePvid(n))
                    break;
            return n
        },_isMatchThePvid: function(t) {
            var n = this, r = 0, i = n.skuInfo.prop;
            return e.each(i, function(e) {
                var n = new RegExp(e);
                n.test(t) && (r += 1)
            }), r === n.propAmount
        },_initQuantity: function() {
            var e = this;
            e.quantityInput.on("keyup", function() {
                e._validateQuantity()
            })
        },_validateQuantity: function() {
            var e = this, t = /^\d+$/, n = e.quantityInput, r = parseInt(n.val(), 10);
            e._hideErrorInfo();
            if (!t.test(n.val()))
                return n.val(""), e._showErrorInfo("请填写正确的宝贝数量！");
            var i = e._getRemainRedeemed(), s = e._getCurrentStock(), o = e._getCartRemainCapacity();
            return r > i ? e._showErrorInfo("还可以换购" + i + "件商品") : s ? r > s ? e._showErrorInfo("最多可购买" + s + "件商品") : r > o ? e._showErrorInfo("购物车已满，请整理购物车") : !0 : e._showErrorInfo("暂时缺货")
        },_showErrorInfo: function(e) {
            return this.errorBox.html(e).show(), !1
        },_hideErrorInfo: function() {
            this.errorBox.html("").hide()
        },_getRemainRedeemed: function() {
            var e = this.rowBox.one(".J_Remain");
            return parseInt(e.text(), 10)
        },_getCurrentStock: function() {
            var e = this.container.one(".J_Stock");
            return parseInt(e.text(), 10)
        },_getCartRemainCapacity: function(e) {
            var t = n.query("#J_CartEnable .J_ItemBody").length;
            return t < 50 ? 50 - t : 0
        },_initBtnAddCart: function() {
            var e = this, t = e.hasSku, n = e.trigger, r = e.container, i = n.attr("data-itemid"), s = r.one(".J_AddCart");
            e.on("skuChange", function() {
                s[e._isAllPropSelected() ? "removeClass" : "addClass"]("btn-disabled")
            }), s.on("click", function(n) {
                n.preventDefault();
                if (!e._isAllPropSelected() || !e._validateQuantity())
                    return;
                e._addToCart({item_id: i,outer_id: t ? e.skuData.skuMap[e.skuInfo.pvids].skuId : i,outer_id_type: t ? 2 : 1,quantity: e.quantityInput.val()})
            })
        },_addToCart: function(t) {
            var n = this;
            t.t = e.now(), e.io({type: "POST",url: n.rowBox.one(".J_Redemption").attr("data-cart-url"),dataType: "json",data: t,success: function(t) {
                    if (!e.isPlainObject(t))
                        return;
                    t.status ? (r.set("lastRedemptionCartId", t.cartId), location.reload()) : n._showErrorInfo(t.error || "系统出错")
                }})
        },_initBtnCancel: function() {
            var e = this, t = e.trigger, n = e.container;
            n.one(".J_Cancel").on("click", function(n) {
                n.preventDefault(), t.parent("li").removeClass(u), e.rowBox.removeClass(o), e.mask.hide()
            })
        }}
}, {requires: ["template"]}), KISSY.add("mods/fav/cart-ui", function(e, t, n) {
    var r = "[cart-ui] ";
    return {_init: function() {
            this._bindEvents()
        },_bindEvents: function() {
            n.on(this.favTriggerEl, "click", this._batchFavHandler, this)
        },_batchFavHandler: function() {
            var t = this, n = e.filter(t.items, function(e) {
                return e.model && e.model.isSelected
            });
            if (!n.length)
                return alert("请选择宝贝"), !1;
            t._doFav(n)
        },_doFav: function(n) {
            var r = this;
            n = e.makeArray(n);
            var i = [];
            e.each(n, function(e) {
                i.push(e.itemId + ":" + e.skuId)
            });
            var s = {itemSkuList: i.join(","),_tb_token_: t.val("#_tb_token_")};
            e.jsonp(r.favoriteAPI, s, function(t) {
                e.isObject(t) && r._showTips(n, t.result.status, t.result.message)
            })
        },_showTips: function(n, r, i) {
            t.remove("#fav-lay-prefix-batch");
            var s = this, o = t.create('<div id="fav-lay-prefix-batch" class="batch-fav-box"></div>'), u;
            r ? u = t.create('<div class="msg batch-fav-status"><p class="ok">成功移至收藏夹</p></div>') : i.errorCode === 8 ? u = t.create('<div class="msg batch-fav-status"><p class="attention">' + i.error + "</p></div>") : u = t.create('<div class="msg batch-fav-status"><p class="error">' + i.error + "</p></div>"), o.appendChild(u), t.insertAfter(o, s.favTriggerEl);
            if (r) {
                var a = [], f = [];
                e.each(n, function(t) {
                    a.push(t.cartId), e.indexOf(t.order, f) === -1 && f.push(t.order)
                }), this.broadcast("updateOrders", {updateType: "deleteSome",operate: n,orders: f,success: function(t) {
                        t.status && (e.each(n, function(e) {
                            e.del()
                        }), s.broadcast("updateStatus"))
                    }})
            }
            e.later(function() {
                t.remove(o)
            }, 2e3)
        }}
}, {requires: ["dom", "event"]}), KISSY.add("mods/share/ui", function(e, t, n, r, i) {
    return {_init: function() {
            this._bindEvents()
        },_bindEvents: function() {
            n.on(this.shareTriggerEl, "click", this._batchShareHandler, this)
        },_batchShareHandler: function() {
            var t = this, n = e.filter(t.items, function(e) {
                return e.model && e.model.isSelected
            });
            if (!n.length)
                return alert("请选择宝贝"), !1;
            t._doShare(n)
        },_doShare: function(n) {
            n = e.makeArray(n);
            var r = [];
            e.each(n, function(e) {
                r.push({itemId: e.itemId,skuId: e.skuId,quantity: e.model.quantity,imgUrl: e.imgUrl})
            }), window.Cart.SharePlugin.init({items: r,_tb_token_: t.get("#_tb_token_").value})
        }}
}, {requires: ["dom", "event", "ajax", "cookie"]}), KISSY.add("cart/cart", function(e, t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N) {
    var C = {_init: function() {
            var n = this;
            window.cart = this, t.scrollTop(0), window.cart.isMemberCart = t.val("#isMemberCart") == "true", r.trace("InitStart");
            var i = [e.one("#J_SelectAll"), e.one("#floatBarSelectAll")];
            e.mix(this, {cartEl: e.one("#J_CartEnable"),checkboxEl: i,floatBarEl: e.one("#float-bar"),selectCodEl: e.one("#J_SelectCod")}), this.orders = [], this.items = [], this.undoItems = [];
            var s = e.all("#J_CartEnable tbody.J_Order");
            r.trace("OrderStart"), s.each(function(e, t) {
                var r = e.one("tr.J_ItemHead"), i = r.one("input.J_forShop"), s = new f({orderEl: e,headEl: r,itemEls: e.all("tr.J_ItemBody"),checkboxEl: i,favoriteAPI: n.api.favoriteAPI,cart: n,index: t + 1});
                s.on("update", n._itemUpdateHandler, n), n.orders.push(s), n.items = n.items.concat(s.items)
            }), r.trace("OrderEnd"), new h({tempLoginEl: e.one("#J_TempLogin"),loginAPI: this.api.loginAPI,loginIndicatorAPI: this.api.loginIndicatorAPI,goAPI: this.api.goAPI,tmallGoAPI: this.api.tmallGoAPI,fastbuyAPI: this.api.fastbuyAPI});
            var o = e.one("#tmallList");
            o && new S({containerEl: o,tmallListAPI: this.api.tmallListAPI,delTmallSpecialAPI: this.api.delTmallSpecialAPI});
            var C = e.one("#interested");
            this.lazyload(C, function() {
                new m({containerEl: e.one("#interested"),favoriteListAPI: this.api.favoriteListAPI,likeAPI: this.api.likeAPI})
            }, this), new a, new w;
            if (!this.items.length)
                return;
            new l({totalPayEls: [e.one("#J_Total"), e.one("#J_Total2")],items: this.items}), new c({submitEls: [t.get("#J_Go"), t.get("#J_SmallGo")],items: this.items});
            var k = e.one("#J_SelectCod");
            k && new p({checkboxEl: k,hintEl: e.one("#J_UncodNumMessage"),items: this.items}), new y({items: this.items,saveAPI: this.api.save,shopId: this.shopId}), new b({items: this.items,serviceAPI: this.api.serviceAPI,shopId: this.shopId}), new x({triggers: e.all("#J_CartEnable .J_Redemption")});
            var L = e.one("#status-bar"), A = e.one("#J_StatusBarTips");
            new d({statusEl: L,statusTipsEl: A,favoriteAPI: n.api.favoriteAPI,items: this.items,isShow: this.status.isShow,repeatBuyAPI: this.api.repeatBuyAPI,addToCartAPI: this.api.addToCartAPI,ignoreCartAPI: this.api.ignoreCartAPI,userId: this.userId,isShowRepeatBuy: this.isShowRepeatBuy}), new v({delSelectTriggerEl: e.one("#J_DelSelect"),delInvalidTriggerEl: e.one("#J_DelInvaid"),items: this.items}), new T({favTriggerEl: e.one("#J_FavSelected"),items: this.items,favoriteAPI: n.api.favoriteAPI}), new N({shareTriggerEl: e.one("#J_ShareSelected"),items: this.items,shareAPI: n.api.shareAPI}), new g({barEl: e.one("#float-bar"),disableNum: this.status && this.status.disableNum}), e.each(e.all("a.J_ComboDel"), function(t) {
                var r = e.one(t), i = r.parent("tbody").attr("data-cbid"), s = [];
                e.all("tr", r.parent("tbody")).each(function(e) {
                    s.push(e.attr("data-cartid"))
                });
                var o = e.filter(n.items, function(t) {
                    return e.inArray(t.cartId, s)
                });
                new v({delSelectTriggerEl: r,items: o,isComboDel: !0})
            }), this.enableTiao && new E({items: this.items}), u.init({feedbackId: this.feedbackId,title: "给购物车提建议"}), this._bindEvents(), this.broadcast("cal"), this.add_userpath("a"), r.trace("InitEnd"), e.later(function() {
                r.trace("UserReady")
            }, 0), r.init()
        },_bindEvents: function() {
            e.each(this.checkboxEl, function(e) {
                n.on(e, "click", this._checkboxClickHandler, this)
            }, this)
        }};
    return e.mix(C, o)
}, {requires: ["dom", "event", "core/monitor", "core/ba-debug", "core/profile", "core/select", "core/feedback", "core/makepoint", "cart/order", "mods/totalpay/ui", "mods/submit/ui", "mods/login/ui", "mods/cod/ui", "mods/status/ui", "mods/delete/cart-ui", "mods/relative/ui", "mods/floatbar/ui", "mods/update/ui", "mods/update/service-ui", "mods/topsearch/ui", "mods/tiao/ui", "mods/tmall/ui", "mods/redemption/ui", "mods/fav/cart-ui", "mods/share/ui"]})
