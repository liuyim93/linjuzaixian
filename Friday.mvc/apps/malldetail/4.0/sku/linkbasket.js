KISSY.add("malldetail/sku/linkbasket", function (_kissy_A, _malldetail_sku_skuMsg, _malldetail_sku_validator) {
    var _mods_SKU = _kissy_A.mods.SKU;
    _mods_SKU.LinkBasket = new _mods_SKU.Util.BuyLinkStatu("#J_LinkBasket", 3);
    _mods_SKU.BasketHandler = function () {
        var _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _document = document, _body = _document.body,
            F = {}, E, _eventTarget = _kissy.merge({}, _kissy.EventTarget), L = false;
        var T = null;
        function Q() {
            if (!(F = _kissy_A.cfg()) || !(E = F.linkBasket)) {
                return
            }
            O(function () {
                _kissy_A.use("TMiniCart", function () {
                    _event.on(E, "click", M)
                })
            })
        }
        function O(V) {
            if (!_kissy.isFunction(V)) {
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
                        _mods_SKU.basketAnim.init();
                        V()
                    }
                } else {
                    _kissy_A.sendErr("Cart200")
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
                    _event.on(".Tms_Comm_Login", "click", function () {
                        _kissy.onLogin(function () {
                            K(U)
                        })
                    })
                }, 1024);
                if (F.divKeyProp) {
                    F.divKeyProp.close()
                }
                _kissy_A.flush();
                _kissy_A.use("malldetail/recommend/basketrecommend", function (V, W) {
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
                V = _dom.parent(V)
            }
            if (_dom.hasClass(V, "noPost")) {
                return
            }
            var S = function () {
                _dom.addClass(U, "tb-act");
                _kissy_A.sendAtpanel("tmalljy.1.1", { shopid: F.rstShopId, itemid: F.itemDO.itemId, pos: "detailclickadd" });
                if (L || !_malldetail_sku_validator.run(true) || !_mods_SKU.dqCity.getOrder()) {
                    return false
                }
                _eventTarget.fire("beforesubmit");
                var Y = F.frmBid, Z;
                var X = Y.buy_param.value;
                X = X.split("_");
                _kissy_A.mods.Token.onInited(function () {
                    var a = { _tb_token_: F.valToken, add: _kissy.mix({ deliveryCityCode: Y.destination.value, campaignId: F.varPromotionId, items: [{ itemId: X[0], skuId: X[2], quantity: X[1], serviceInfo: X[3] || ""}] }, F.addToCartParames) };
                    _mods_SKU.Util.getTrackID(function (b) {
                        a.tsid = b;
                        K(a)
                    })
                })
            };
            !!F.detail.loginBeforeCart ? _kissy_A.onLogin(S) : S();
            _kissy_A.sendAtpanel("tmalldetail.50.3")
        }
        function J(U) {
            if (U.error) {
                switch (U.errorCode) {
                    case "BuyerNeedLogin":
                        _kissy_A.onLogin(function () {
                            window.location.reload()
                        });
                        break;
                    case "TrackCartIsFull":
                        var S = U.error;
                        S = S.replace(/<a\s+[^>]+>登录<\/a>/, '<a class="Tms_Comm_Login" href="#">登录</a>');
                        _malldetail_sku_skuMsg.show(S);
                        break;
                    default:
                        _malldetail_sku_skuMsg.show(U.error);
                        break
                }
                return
            }
            _mods_SKU.basketAnim.run(E);
            if (U.warn) {
                _malldetail_sku_skuMsg.show(U.warn, "attention")
            }
        }
        return { onBeforeSubmit: function (S) {
            _eventTarget.on("beforesubmit", S)
        }, init: function () {
            _kissy.ready(function () {
                Q()
            })
        }, load: function (S) {
            O(S)
        } 
        }
    } ()
}, { requires: ["malldetail/sku/skuMsg", "malldetail/sku/validator"] }); /*pub-1|2013-01-06 16:13:21*/