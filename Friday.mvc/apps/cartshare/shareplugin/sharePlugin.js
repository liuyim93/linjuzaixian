 /*pub-1|2013-03-29 17:34:36*/window.Cart = window.Cart || {};
var defaultCfg = {event: "click",mask: false,align: {points: ["cc", "cc"]}};
var isOnline = ~location.host.indexOf("taobao.com") || ~location.host.indexOf("tmall.com");
var domain = isOnline ? "taobao.com" : "daily.taobao.net";
var isLogin = TB.Global.isLogin();
var API_GET_CART_DATA = "http://mi." + domain + "/share/ajax/getCartShareInfo.htm?_input_charset=utf-8";
var API_ADD_TO_CART = "http://mi." + domain + "/share/ajax/addShareDetails.htm?_input_charset=utf-8";
var API_LINK_TO_CART = "http://mi." + domain + "/share/shareView.htm?";
var styles = '.hidden {dispaly:none}.m-cart-popup{width:400px;}.ks-overlay {position:absolute;left:-9999px;top:-9999px;}.ks-ext-mask {background-color: #000;opacity: 0.3; filter: alpha(opacity = 15);}.m-cart{width:400px;padding:0;background:#fff;}:root .m-cart{filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr="#00000000", EndColorStr="#00000000");}.m-cart .m-cart-content{background:#fff;}.m-cart h3{ display:none;font-size:14px;height:45px;line-height:45px;padding-left:18px;background-color:#f2f2f2;border-bottom:1px solid #b7b7b7;}.m-cart .m-btn{width:76px;height: 30px;margin-bottom: 25px; margin-left: 150px;background-color:#FF6800;color:#fff;font-weight:bold;border:none; border-radius: 2px;box-shadow: 1px 1px 2px #ddd;}.m-cart-popup .ks-ext-close{height: 18px;width: 19px;border: 1px solid transparent;right: 15px;top: 15px;vertical-align: middle;position: absolute;text-decoration: none;outline: none;_border-color: tomato;_filter: chroma(color = tomato);overflow: hidden;cursor: pointer;}.m-cart-popup .ks-ext-close .ks-ext-close-x {background: transparent url(http://img02.taobaocdn.com/tps/i2/T18yhsXuFbXXc_eAHa-19-18.png) no-repeat;height: 18px;width: 19px;display: block;text-indent: -9999px;margin:0;}.m-cart .m-create{margin-top: 15px;height: 65px;}::-webkit-input-placeholder { color:#aaa; }input:-moz-placeholder { color:#aaa; }.m-cart .create-link strong{font-weight:bolder}.m-cart .cart-name{width:306px;height:26px;line-height: 26px;box-shadow: 1px 1px 3px #DDD inset;}.m-cart .count-info{color: #999;margin-left: 10px;}.m-cart .count-info .count-alert{color: #FD6800;}.m-cart .name-alert{display: none;clear:both;color: #FD6800;padding-left: 20px;padding-top: 3px;background: url(http://a.tbcdn.cn/sys/common/img/msg_bg.png) no-repeat 0px 5px;}.m-cart .m-add-box{height:  110px;margin-top: 15px;background-color: #fff;padding-left:18px;}.m-cart .m-add-box .cart-sel{width:310px;height:30px;line-height: 30px;box-shadow: 1px 1px 3px #DDD inset;*height:auto;}body:not(:-moz-handler-blocked) .m-cart .m-add-box .cart-sel {padding: 5px 0;}.m-cart .m-add-box .create-link{color: #16A3E6;text-decoration: none;margin-left:7px;cursor:pointer;}.m-cart .m-add-box .pic-list{width:312px;height: 40px;margin-top: 7px;overflow: hidden;float: left;clear: both;}.m-cart .m-add-box .pic-list .pic{float: left;margin-right: 12px;}.m-cart .m-add-box .pic-list .pic img{width:40px;height:40px;}.m-cart .m-add-box .pic-list .last{margin-right: 0;}.m-cart .m-add-box .pic-num{float: left;width:38px;text-align:center;height: 38px;line-height: 38px;margin-top: 7px;margin-left: 5px;color: #fff;background-color: #ccc;}.m-cart .m-add-box .num-alert{display: none;color: #999;padding-left: 20px;padding-top: 5px;background: url(http://a.tbcdn.cn/sys/common/img/msg_bg.png) no-repeat 0px -143px;clear: both;}.m-cart .m-add-box .num-alert a{padding-bottom: 2px;border-bottom: 1px dashed #999;text-decoration: none;color: #999;}.m-cart .success{width:400px;text-align: center;}.m-cart .success .info{width:80px;height: 32px;line-height: 32px;padding-left: 40px;margin: 35px auto 0 auto;font-size:14px;font-weight:bold;background: url(http://a.tbcdn.cn/sys/common/img/msg_bg.png) no-repeat 0 -600px;}.m-cart .success .btn-go{display:inline-block;width:98px;height: 30px;line-height:30px;text-decoration: none;background-color:#FF6800;color: #fff; border: none;cursor:pointer;margin-top: 40px;margin-bottom: 40px; border-radius: 2px;box-shadow: 1px 1px 2px #ddd;}';
var isCart = ~location.host.indexOf("cart.taobao.com") || ~location.host.indexOf("cart.daily.taobao.net");
if (isCart) {
    styles = styles + '.m-cart{padding:7px;background-color: rgba(0, 0, 0, 0.3);filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr="#4c000000", EndColorStr="#4c000000");}.m-cart h3{display:block;}'
}
KISSY.DOM.addStyleSheet(styles);
KISSY.mix(window.Cart, {SharePlugin: {init: function(A) {
            KISSY.use("dom,ua,event,node,overlay,cookie", function(F, K, G, I, C, J, B) {
                var H = {_popup: null,_cartsNum: 0,_items: null,_config: null,init: function(D) {
                        var E = this;
                        E._config = F.merge(defaultCfg, D);
                        API_GET_CART_DATA = API_GET_CART_DATA + "&_tb_token_=" + D._tb_token_;
                        API_ADD_TO_CART = API_ADD_TO_CART + "&_tb_token_=" + D._tb_token_;
                        if (D.ct) {
                            API_ADD_TO_CART = API_ADD_TO_CART + "&ct=" + D.ct
                        }
                        if (E._config.trigger) {
                            I.on(E._config.trigger, E._config.event, function(L) {
                                L.preventDefault();
                                if (!isLogin) {
                                    alert("\u60a8\u8fd8\u672a\u767b\u5f55\uff0c\u8bf7\u5148\u767b\u5f55");
                                    return
                                }
                                E._init(E._config.items)
                            })
                        } else {
                            E._init(E._config.items)
                        }
                    },_init: function(D) {
                        this._items = D;
                        if (this._popup) {
                            this._popup.destroy();
                            this._popup = null
                        }
                        this._getMCartsData()
                    },_getMCartsData: function() {
                        var D = this;
                        F.IO({dataType: "jsonp",url: API_GET_CART_DATA,success: function(E) {
                                if (E.userCartShareLists) {
                                    D._userCartShareLists = E.userCartShareLists;
                                    D._getMCartsDataCallback(D._userCartShareLists)
                                } else {
                                    alert(E.errorMsg)
                                }
                            }})
                    },_getMCartsDataCallback: function(E) {
                        this._cartsNum = E.length;
                        var D = this._getPopupBodyContentFromData(E);
                        this._initPopup(D);
                        this._popup.show();
                        this._bindEvents()
                    },_getPopupBodyContentFromData: function(L) {
                        var P = this._items;
                        var E = "";
                        F.each(P, function(T) {
                            E += '<a class="pic"><img src="' + T.imgUrl + '" alt=""></a>'
                        });
                        var D;
                        if (L.length > 0) {
                            var N = "";
                            for (var M = 0, O = L.length; M < O; M++) {
                                N += '<option value="' + L[M].shareListId + '">' + L[M].shareListName + "</option>"
                            }
                            var S = "";
                            this._count = parseInt(L[0].itemCount) + P.length;
                            if (this._count > 50) {
                                S = 'style="display: block;"'
                            }
                            D = '<div class="m-cart"><div class="m-cart-content"><h3>\u52a0\u5165\u5bc6\u6dd8</h3><p style="padding-top: 20px;padding-left: 18px;">\u5bc6\u6dd8\u662f\u548c\u597d\u53cb\u4e00\u8d77\u6311\u5b9d\u8d1d\u62fc\u5355\u7684\u5730\u65b9\uff0c\u5c06\u5b9d\u8d1d\u52a0\u5165\u540e\u8bb0\u5f97\u9080\u8bf7\u5bc6\u53cb\u54e6\uff01</p><div class="m-add-box"><select class="cart-sel J_cartNames">' + N + '</select><a class="create-link J_createNewCart" ><strong>+</strong>\u521b\u5efa</a><div class="pic-list clearfix J_cartItems">' + E + '</div><div class="pic-num">\u5171<span class="J_itemNum">' + P.length + '</span>\u4e2a</div><span class="J_numAlert num-alert" ' + S + '>\u8be5\u5bc6\u6dd8\u4e3b\u9898\u7684\u7a7a\u95f4\u4e0d\u8db3\uff01<a href="' + API_LINK_TO_CART + "shareListId=" + L[0].shareListId + '">\u53bb\u5220\u9664\u4e00\u4e9b\u5b9d\u8d1d</a></span><span class="J_fullAlert num-alert">\u60a8\u52a0\u5165\u7684\u5bc6\u6dd8\u4e3b\u9898\u6ee15\u4e2a\u4e86\uff01<a href="' + API_LINK_TO_CART + "shareListId=" + L[0].shareListId + '">\u53bb\u5220\u9664\u4e0d\u7528\u7684</a></span><span class="name-alert J_nameAlert">\u8bf7\u586b\u5199\u540d\u79f0\uff0c\u8ba9\u5bc6\u53cb\u77e5\u9053\u8d2d\u7269\u4e3b\u9898\u662f\u5565</span></div><input type="button" value="\u786e \u5b9a" class="m-btn J_cartAddSubmit"/></div></div>'
                        } else {
                            var R = decodeURI(B.get("tracknick"));
                            R = F.fromUnicode(R);
                            if (R === "undefined") {
                                R = ""
                            }
                            if (R.length > 11) {
                                R = R.substring(0, 8) + "..."
                            }
                            var Q = R + "\u7ec4\u7ec7\u4e00\u8d77\u4e70";
                            D = '<div class="m-cart"><div class="m-cart-content"><h3>\u52a0\u5165\u5bc6\u6dd8</h3><p style="padding-top: 20px;padding-left: 18px;">\u5bc6\u6dd8\u662f\u548c\u597d\u53cb\u4e00\u8d77\u6311\u5b9d\u8d1d\u62fc\u5355\u7684\u5730\u65b9\uff0c\u5c06\u5b9d\u8d1d\u52a0\u5165\u540e\u8bb0\u5f97\u9080\u8bf7\u5bc6\u53cb\u54e6\uff01</p><div class="m-add-box"><input type="text" class="J_cartName cart-name" placeholder="\u8bf7\u8f93\u5165\u8d2d\u7269\u4e3b\u9898\uff0c\u5982\u4e00\u8d77\u56e2\u8d2d\u96f6\u98df" value=' + Q + '><span class="count-info"><em class="J_count">' + Q.length + '</em>/16</span><div class="pic-list clearfix J_cartItems">' + E + '</div><div class="pic-num">\u5171<span class="J_itemNum">' + P.length + '</span>\u4e2a</div><span class="name-alert J_nameAlert">\u8bf7\u586b\u5199\u540d\u79f0\uff0c\u8ba9\u5bc6\u53cb\u77e5\u9053\u8d2d\u7269\u4e3b\u9898\u662f\u5565</span></div><input type="button" value="\u786e \u5b9a" class="m-btn J_cartAddSubmit"/></div></div>'
                        }
                        return D
                    },_initPopup: function(E) {
                        var D = {elStyle: {position: G.ie == 6 ? "absolute" : "fixed"},elCls: ".m-cart-popup",bodyContent: E,mask: this._config.mask,zIndex: 99999,align: this._config.align,closable: true,closeAction: "destroy"};
                        if (!isCart) {
                            D.headerContent = "\u52a0\u5165\u5bc6\u6dd8"
                        }
                        this._popup = new J.Dialog(D)
                    },_bindEvents: function() {
                        var L = this._popup.container || this._popup.get("el");
                        var S = K.get(".J_cartNames", L);
                        var R = K.get(".J_numAlert", L);
                        var E = K.get(".J_cartAddSubmit", L);
                        var T = K.get(".J_createNewCart", L);
                        var M = K.get(".J_nameAlert", L);
                        var Q = K.get(".J_fullAlert", L);
                        var O = K.get(".ks-ext-close-x", L);
                        var P = K.get("a", R);
                        var U = this;
                        var N = function(W, V) {
                            I.on(W, "valuechange", function(Y) {
                                var X = Y.newVal.length;
                                if (X > 16) {
                                    K.addClass(V, "count-alert")
                                } else {
                                    K.removeClass(V, "count-alert")
                                }
                                V.innerHTML = X
                            })
                        };
                        if (K.get(".J_cartName", L)) {
                            N(K.get(".J_cartName", L), K.get(".J_count", L))
                        }
                        I.on(S, "change", function() {
                            U._count = parseInt(U._userCartShareLists[this.selectedIndex].itemCount) + U._items.length;
                            K.css(Q, "display", "none");
                            if (U._count > 50) {
                                K.css(R, "display", "block");
                                K.attr(P, {href: API_LINK_TO_CART + "shareListId=" + this.value})
                            } else {
                                K.css(R, "display", "none")
                            }
                        });
                        I.on(O, "mouseenter", function() {
                            K.css(O, {background: "url(http://img03.taobaocdn.com/tps/i2/T1rHltXAdXXXc_eAHa-19-18.png)"})
                        });
                        I.on(O, "mouseleave", function() {
                            K.css(O, {background: "url(http://img02.taobaocdn.com/tps/i2/T18yhsXuFbXXc_eAHa-19-18.png)"})
                        });
                        I.on(T, "click", function() {
                            if (U._cartsNum >= 5) {
                                K.css(R, "display", "none");
                                K.css(Q, "display", "block");
                                return
                            }
                            K.remove(".J_cartNames", L);
                            K.remove(".create-link", L);
                            K.remove(R);
                            K.prepend(K.create('<input type="text" class="J_cartName cart-name" placeholder="\u8bf7\u8f93\u5165\u8d2d\u7269\u4e3b\u9898\uff0c\u5982\u4e00\u8d77\u56e2\u8d2d\u96f6\u98df"><span class="count-info"><em class="J_count">0</em>/16</span>'), K.get(".m-add-box", L));
                            N(K.get(".J_cartName", L), K.get(".J_count", L))
                        });
                        I.on(E, "click", function() {
                            var V = K.get(".J_cartName", L);
                            var W;
                            var X;
                            if (V) {
                                W = F.trim(V.value);
                                if (W == "") {
                                    K.css(M, "display", "block");
                                    return
                                } else {
                                    if (K.hasClass(K.get(".J_count", L), "count-alert")) {
                                        return
                                    }
                                }
                            } else {
                                if (U._count > 50) {
                                    K.css(R, "display", "block");
                                    K.css(Q, "display", "none");
                                    return
                                }
                                X = S.value
                            }
                            D(W, X)
                        });
                        var D = function(X, Z) {
                            var Y = U._items;
                            var W = [];
                            F.each(Y, function(a) {
                                W.push(a.itemId + "_" + a.skuId + "_" + a.quantity)
                            });
                            var V = {};
                            V.items = W.join(",");
                            if (X) {
                                V.subject = X
                            } else {
                                V.shareListId = Z
                            }
                            F.IO({dataType: "jsonp",url: API_ADD_TO_CART,data: V,success: function(a) {
                                    var b = "\u53bb\u5bc6\u6dd8\u770b\u770b";
                                    if (U._cartsNum == 0) {
                                        b = "\u53bb\u9080\u8bf7\u5bc6\u53cb"
                                    }
                                    if (a && a.status == true) {
                                        K.get(".m-cart-content", L).innerHTML = '<h3>\u52a0\u5165\u5bc6\u6dd8</h3><div class="success"><div class="info">\u6dfb\u52a0\u6210\u529f\uff01</div><a href="' + a.viewUrl + '"  class="btn-go" target="_blank">' + b + "</a></div>"
                                    } else {
                                        alert(a.errorMsg)
                                    }
                                }})
                        }
                    }};
                H.init(A)
            })
        }}});
