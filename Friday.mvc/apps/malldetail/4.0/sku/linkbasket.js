KISSY.add("malldetail/sku/linkbasket", function (A, C, B) {
    var D = A.mods.SKU;
    D.LinkBasket = new D.Util.BuyLinkStatu("#J_LinkBasket", 3);
    D.BasketHandler = function () {
        var H = KISSY, R = H.DOM, P = H.Event, N = document, I = N.body, F = {}, E, G = H.merge({}, H.EventTarget), L = false;
        var T = null;
        function Q() {
            if (!(F = A.cfg()) || !(E = F.linkBasket)) {
                return
            }
            O(function () {
                A.use("TMiniCart", function () {
                    P.on(E, "click", M)
                })
            })
        }
        function O(V) {
            if (!H.isFunction(V)) {
                V = function () {
                    return
                }
            }
            var U = 0;
            var S = function () {
                if (U < 1000) {
                    if (typeof window.TMiniCart == "undefined") {
                        U++;
                        setTimeout(arguments.callee, 200)
                    } else {
                        D.basketAnim.init();
                        V()
                    }
                } else {
                    A.sendErr("Cart200")
                }
            };
            S()
        }
        function K(S) {
            L = true;
            window.TMiniCart.add(S, function (U) {
                L = false;
                J(U);
                setTimeout(function () {
                    P.on(".Tms_Comm_Login", "click", function () {
                        H.onLogin(function () {
                            K(U)
                        })
                    })
                }, 1024);
                if (F.divKeyProp) {
                    F.divKeyProp.close()
                }
                A.flush();
                A.use("malldetail/recommend/basketrecommend", function (V, W) {
                    if (T) {
                        clearTimeout(T)
                    }
                    T = setTimeout(function () {
                        W.load()
                    }, 2500)
                })
            })
        }
        function M(W) {
            W.preventDefault();
            var V = W.target;
            var U = this;
            if (V.tagName == "B") {
                V = R.parent(V)
            }
            if (R.hasClass(V, "noPost")) {
                return
            }
            var S = function () {
                R.addClass(U, "tb-act");
                A.sendAtpanel("tmalljy.1.1", { shopid: F.rstShopId, itemid: F.itemDO.itemId, pos: "detailclickadd" });
                if (L || !B.run(true) || !D.dqCity.getOrder()) {
                    return false
                }
                G.fire("beforesubmit");
                var Y = F.frmBid, Z;
                var X = Y.buy_param.value;
                X = X.split("_");
                A.mods.Token.onInited(function () {
                    var a = { _tb_token_: F.valToken, add: H.mix({ deliveryCityCode: Y.destination.value, campaignId: F.varPromotionId, items: [{ itemId: X[0], skuId: X[2], quantity: X[1], serviceInfo: X[3] || ""}] }, F.addToCartParames) };
                    D.Util.getTrackID(function (b) {
                        a.tsid = b;
                        K(a)
                    })
                })
            };
            !!F.detail.loginBeforeCart ? A.onLogin(S) : S();
            A.sendAtpanel("tmalldetail.50.3")
        }
        function J(U) {
            if (U.error) {
                switch (U.errorCode) {
                    case "BuyerNeedLogin":
                        A.onLogin(function () {
                            window.location.reload()
                        });
                        break;
                    case "TrackCartIsFull":
                        var S = U.error;
                        S = S.replace(/<a\s+[^>]+>\u767b\u5f55<\/a>/, '<a class="Tms_Comm_Login" href="#">\u767b\u5f55</a>');
                        C.show(S);
                        break;
                    default:
                        C.show(U.error);
                        break
                }
                return
            }
            D.basketAnim.run(E);
            if (U.warn) {
                C.show(U.warn, "attention")
            }
        }
        return { onBeforeSubmit: function (S) {
            G.on("beforesubmit", S)
        }, init: function () {
            H.ready(function () {
                Q()
            })
        }, load: function (S) {
            O(S)
        } 
        }
    } ()
}, { requires: ["malldetail/sku/skuMsg", "malldetail/sku/validator"] }); /*pub-1|2013-01-06 16:13:21*/