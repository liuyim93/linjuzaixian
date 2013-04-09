(function (_kissy) {
    //var F = document, E = window, A = E.g_config, C = A.assetsHost || "http://l.tbcdn.cn";
    var F = document, E = window, A = E.g_config, C = A.assetsHost || "http://localhost:7525";
    A.t = A.t + "d4";
    _kissy.config({ combine: true, map: [[/(malldetail\/[0-9\.]+\/)malldetail\//, "$1"]], packages: [{ name: "malldetail", ignorePackageNameInUri: true, tag: A.t, path: C + "/apps/malldetail/" + A.ver + "/", charset: "gbk", combine: true, debug: true}] });
    _kissy.config({ packages: [{ name: "wangpu", tag: "20130106", path: C + "/p/shop/3.0/", charset: "utf-8"}] });
    TShop = _kissy;
    _kissy.add("tb-core", function () {
    });
    _kissy.add("backward/Tabs", function (_kissy_imp, _switchable) {
        _kissy_imp.Tabs = _switchable.Tabs
    }, { requires: ["switchable"] });
    _kissy.add("backward/Popup", function (_kissy_imp, _overlay) {
        _kissy_imp.Popup = function (K, J) {
            return new _overlay.Popup(K, J)
        }
    }, { requires: ["overlay"] });
    _kissy.config(
                  {
                    modules:
                    { "malldetail/other/lazy":
                                                 {
                                                   requires: ["datalazyload", "dom"]
                                                 },
                     "malldetail/other/mainBody":
                                                 {
                                                   requires: ["dom", "event", "malldetail/tabbar/tabbar", "malldetail/other/itemDesc"]
                                                 },
                     "malldetail/other/leftSlide":
                                                 {
                                                   requires: ["dom", "event", "ajax"]
                                                 },
                     "malldetail/sku/setup":
                                                 {
                                                     requires: ["cookie", "ua", "malldetail/sku/util", "malldetail/sku/fastlogin", "malldetail/sku/buylink", "malldetail/sku/thumbViewer", "malldetail/sku/skuFeatureIcon", "malldetail/sku/sellCount", "malldetail/sku/skuLade", "malldetail/sku/paymethods", "malldetail/sku/skuTmVip", "malldetail/sku/skuAmount", "malldetail/sku/editEntry", "malldetail/sku/freight", "malldetail/sku/stock", "malldetail/sku/basketAnim", "malldetail/sku/shiptime", "malldetail/sku/linkbasket", "malldetail/sku/popupsimulate", "malldetail/sku/promotion", "malldetail/sku/ifclocation", "malldetail/sku/common", "malldetail/sku/propertyHandler", "malldetail/sku/3c", "malldetail/sku/areaSell", "malldetail/sku/price", "malldetail/sku/service", "malldetail/sku/stat", "malldetail/sku/double11"]
                                                 },
                     "malldetail/dc/dc":
                                                 {
                                                     requires: ["malldetail/shop/shop"]
                                                 },
                     "malldetail/other/init": {
                                                     requires: ["malldetail/other/focusTime", "malldetail/other/attributes", "malldetail/tabbar/tabbarAttr", "malldetail/other/staticMods", "malldetail/other/ishare", "malldetail/recommend/common", "malldetail/common/tbskip"]
                                                 },
                     "malldetail/tabbar/tabbar":
                                                 {
                                                     requires: ["dom", "event", "malldetail/data/data"]
                                                 },
                     "malldetail/tabbar/newRecommend":
                                                 {
                                                     requires: ["template", "malldetail/common/util"]
                                                 },
                     "malldetail/recommend/waterfall":
                                                 {
                                                     requires: ["dom", "waterfall", "template", "malldetail/recommend/waterfall.css"]
                                                 },
                     "malldetail/other/atp":
                                                 {
                                                     requires: ["malldetail/tabbar/tabbar"]
                                                 },
                     "malldetail/data/data":
                                                 {
                                                     requires: ["ajax", "malldetail/common/util"]
                                                 },
                     "malldetail/tabbar/reviewsTmall":
                                                 {
                                                     requires: ["ajax", "dom", "event", "template", "json"]
                                                 },
                      "malldetail/tabbar/afterSale":
                                                 {
                                                     requires: ["dom"]
                                                 },
                      "malldetail/sku/buylink": { requires: ["template", "malldetail/sku/validator"] },
                      "malldetail/sku/thumbViewer": { requires: ["dom", "event", "malldetail/common/util", "imagezoom"] },
                      "malldetail/sku/skuFeatureIcon": { requires: ["dom"] },
                      "malldetail/sku/sellCount": { requires: ["dom"] },
                      "malldetail/sku/skuLade": { requires: ["dom", "event"] },
                      "malldetail/sku/paymethods": { requires: ["dom", "event"] },
                      "malldetail/sku/skuTmVip": { requires: ["template"] },
                      "malldetail/sku/skuAmount": { requires: ["malldetail/sku/validator"] },
                      "malldetail/sku/editEntry": { requires: ["template"] },
                      "malldetail/sku/freight": { requires: ["template"] },
                      "malldetail/sku/stock": { requires: ["template", "malldetail/sku/skuMsg"] },
                      "malldetail/sku/linkbasket": { requires: ["anim", "malldetail/sku/skuMsg", "malldetail/sku/validator"] },
                      "malldetail/sku/popupsimulate": { requires: ["malldetail/sku/validator"] },
                      "malldetail/sku/propertyHandler": { requires: ["malldetail/sku/validator"] },
                      "malldetail/sku/3c": { requires: ["malldetail/sku/areaSeletor", "malldetail/sku/freight", "malldetail/sku/stock", "malldetail/sku/skuMsg"] },
                      "malldetail/sku/price": { requires: ["template"] },
                      "malldetail/sku/service": { requires: ["template"] },
                      "malldetail/sku/stat": { requires: ["dom", "event", "ajax"] },
                      "malldetail/sku/double11": { requires: ["template"] },
                      "malldetail/sku/calculator": { requires: ["dom", "event"] },
                      "malldetail/combos/combos": { requires: ["cookie", "switchable", "malldetail/sku/areaSeletor", "json"] },
                      "malldetail/shop/shop": { requires: ["malldetail/common/util"] },
                      "malldetail/other/attributes": { requires: ["template"] },
                      "malldetail/tabbar/tabbarAttr": { requires: ["template", "malldetail/tabbar/localData"] },
                      "malldetail/other/staticMods": { requires: ["template", "malldetail/data/ajax", "json"] },
                      "malldetail/common/tbskip": { requires: ["cookie", "swf", "json"] },
                      "malldetail/sku/validator": { requires: ["malldetail/sku/skuMsg"] },
                      "malldetail/sku/skuMsg": { requires: ["template"] },
                      "malldetail/recommend/basketrecommend": { requires: ["malldetail/recommend/basketrecommend.css"] },
                      "malldetail/sku/areaSeletor": { requires: ["overlay", "template"] },
                      "malldetail/sku/regionSelectPopup": { requires: ["overlay"] },
                      "malldetail/data/ajax": { requires: ["dom"] },
                      "malldetail/other/relate": { requires: ["dom", "ajax"] },
                      TMiniCart: { requires: ["TMiniCartModel", "TMiniCartView"]}
                   }
                }
    );
    _kissy.namespace("mods", "widgets");
    _kissy.t = function () {
        return A.t
    };
    _kissy.mix(_kissy, { isDetail: function () {
        return 1 === A.appId
    }, isMall: function () {
        return "b" === A.type
    }, isBid: function () {
        return "auction" === A.pageType
    }, addTimeStamp: function () {
        var H = _kissy.now();
        return function (I) {
            return I + (I.indexOf("?") === -1 ? "?" : "&") + "t=" + H
        }
    } (), _sendImage: function (H, J) {
        if (!H) {
            return
        }
        var I = { catid: _kissy.cfg("itemDO").categoryId, itemId: _kissy.cfg("itemDO").itemId, pagetype: this.getPageType(), rn: this.getUrlParams("rn"), sellerId: _kissy.cfg("itemDO").userId };
        this._sendImage = function (K, L) {
            var L = L || {};
            L = _kissy.mix(L, I, false);
            var N = "jsFeImage_" + _kissy.guid();
            var M = E[N] = new Image();
            if (K.indexOf("?") == -1) {
                K += "?" + _kissy.param(L)
            } else {
                K += "&" + _kissy.param(L)
            }
            M.onload = (M.onerror = function () {
                E[N] = null
            });
            M.src = K + "&_tm_cache=" + _kissy.now();
            M = null
        };
        return this._sendImage(H, J)
    }, getPageType: function () {
        var H = location.href;
        switch (true) {
            case (/spu_detail/.test(H)):
                return "spu";
            case (/rate_detail/.test(H)):
                return "rate";
            case (/meal_detail/.test(H)):
                return "meal";
            default:
                return "item"
        }
    }, sendAtpanel: function (I, J) {
        var H = "http://log.mmstat.com/" + I;
        this._sendImage(H, J)
    }, sendAcAtpanel: function (I, J) {
        var H = "http://ac.atpanel.com/" + I;
        this._sendImage(H, J)
    }, sendImg: function (H) {
        this._sendImage(H)
    }, sendErr: function (H, I) {
        I = I || {};
        I.type = H;
        this.sendAtpanel("tmalldetail.15.2", I)
    }, scrollToElem: function (I) {
        var H = _kissy.DOM, J = H.offset(I).top;
        F[_kissy.UA.webkit ? "body" : "documentElement"].scrollTop = J - 130
    }, flush: ((0 < _kissy.UA.ie) ? CollectGarbage : (function () {
    })), inBucket: function (N) {
        var M, I = 20;
        N = parseFloat(N, 10);
        var J = Math.round(I * (N / 100));
        M = _kissy.Cookie.get("t") || "";
        var L = this.getUrlParams("bucket_id") || "";
        var K;
        function H(T) {
            var R = 0, S = 0;
            var P = T.length;
            for (var Q = 0; Q < P; Q++) {
                R = 31 * R + T.charCodeAt(S++);
                if (R > 2147483647 || R < 2147483648) {
                    R = R & 4294967295
                }
            }
            return R
        }
        function O(Q, P) {
            return (Q & 65535) % P
        }
        K = (L > 0) ? L : O(H(M), I);
        _kissy.log("bucket_id:" + K, "info");
        return K <= J
    }, getUrlParams: function (I) {
        var H = E.location.href.split("?")[1] || "";
        var K = {};
        var O = {};
        H = H.replace(/#.*$/, "").split("&");
        for (var M = 0, L = H.length; M < L; M++) {
            var N = H[M].indexOf("=");
            if (N > 0) {
                var Q = decodeURIComponent(H[M].substring(0, N));
                var J = H[M].substr(N + 1) || "";
                try {
                    J = decodeURIComponent(J)
                } catch (P) {
                }
                K[Q] = J
            }
        }
        if (typeof I == "string") {
            return K[I] || ""
        } else {
            if (_kissy.isArray(I)) {
                for (var M = 0, L = I.length; M < L; M++) {
                    var Q = I[M];
                    O[Q] = K[Q] || ""
                }
                return O
            } else {
                return K
            }
        }
    }, onLogin: function (L, I) {
        var J = (A.assetsHost.indexOf("taobao.net") != -1);
        var K = J ? "daily.tmall.net" : "tmall.com";
        var H = _kissy.mix({ proxyURL: "http://detail." + K + "/cross/x_cross_iframe.htm?type=minilogin&t=" + _kissy.t() }, I);
        _kissy.use("tml/minilogin", function (M, N) {
            N.show(L, H)
        })
    }, addLazyCallback: function () {
        var H = arguments;
        _kissy.use("malldetail/other/lazy", function (J, I) {
            I.addCallback.apply(I, H)
        })
    }, onMainBody: function () {
        var H = arguments, I = TShop.onMainBody;
        _kissy.use("malldetail/common/util", function (J, K) {
            if (I != TShop.onMainBody) {
                return
            }
            TShop.onMainBody = K.createLoader(function (L) {
                J.use("malldetail/other/mainBody", function (M, N) {
                    N.init({ onTabBarReady: function () {
                        TShop.poc("tabbar")
                    } 
                    });
                    L(N)
                })
            });
            TShop.onMainBody.apply(null, H)
        })
    }, onLeftSlide: function () {
        var H = arguments, I = TShop.onLeftSlide;
        _kissy.use("malldetail/common/util", function (J, K) {
            if (I != TShop.onLeftSlide) {
                return
            }
            TShop.onLeftSlide = K.createLoader(function (L) {
                J.use("malldetail/other/leftSlide", function (N, M) {
                    M.init({ onReviewClick: function () {
                        TShop.onMainBody(function (O) {
                            O.switchTab("J_Reviews")
                        })
                    } 
                    });
                    L(M)
                })
            });
            TShop.onLeftSlide.apply(null, H)
        })
    }, loadMdskip: function (L) {
        function K(M) {
            window.onMdskip = null;
            TShop.mdskipCallback = TShop.mdskipCallback ? TShop.mdskipCallback(M, J ? (_kissy.now - J) : -1) : function (N) {
                N(M, J ? (_kissy.now - J) : -1)
            }
        }
        if (-1 != location.href.indexOf("rate_detail.htm")) {
            K();
            return
        }
        var I = _kissy.getUrlParams(["ip", "campaignId", "key", "abt", "cat_id", "q", "u_channel"]);
        I.ref = encodeURIComponent(F.referrer);
        var H = _kissy.param(I), J = _kissy.now();
        window.onMdskip = K;
        _kissy.getScript(L + "&callback=onMdskip&" + H, { error: K })
    }, Setup: function (H) {
        _kissy._TMD_Config = H;
        if (H.renderReq) {
            new Image().src = H.renderSystemServer + "/index.htm?keys=" + encodeURIComponent(H.renderReq)
        }
        _kissy.namespace("mods.SKU");
        _kissy.loadMdskip(H.initApi);
        _kissy.use(["event", "malldetail/data/data", "cookie", "datalazyload", "swf", "malldetail/sku/setup", "mod~global"], function (K, I, J) {
            TShop.mdskipCallback = TShop.mdskipCallback ? TShop.mdskipCallback(J.setMdskip) : J.setMdskip;
            I.on(F, "click tap", function (O) {
                var N = K.bdClickFn || [];
                for (var M = 0, L = N.length; M < L; M++) {
                    N[M](O, O.target)
                }
            });
            TB.Global.writeLoginInfo();
            K.mix(K, K.EventTarget);
            H.onBuyEnable = function () {
                TShop.poc("buyEnable")
            };
            H.onReviewClick = function () {
                TShop.onMainBody(function (L) {
                    L.switchTab("J_Reviews")
                })
            };
            K.mods.SKU.init(H)
        })
    }, onBDclick: function (H) {
        _kissy.bdClickFn = _kissy.bdClickFn || [];
        if (_kissy.isFunction(H)) {
            _kissy.bdClickFn.push(H)
        }
    }, cfg: function () {
        var I;
        var K;
        var H = arguments;
        var J = _kissy._TMD_Config || { api: {}, detail: {}, itemDO: {}, tag: {}, systemTime: new Date().getTime() };
        switch (typeof H[0]) {
            case "undefined":
                return J;
                break;
            case "string":
                if (arguments.length == 2) {
                    I = J[H[0]];
                    if (I != H[1]) {
                        J[H[0]] = H[1];
                        _kissy.fire("TMDConfigChange", { oldVal: I, newVal: H[1] })
                    }
                } else {
                    return J[H[0]]
                }
                break;
            case "object":
                I = {};
                _kissy.each(H[0], function (M, L) {
                    I[L] = J[L];
                    J[L] = M
                });
                _kissy.fire("TMDConfigChange", { oldVal: I, newVal: H[0] });
                break
        }
    }, Asyn: function () {
        var J;
        var M;
        var H = { timeout: 30000, runCount: 0, jsonpCallback: "jsonp" + _kissy.now() + "_" + _kissy.guid(), pageCache: false };
        var L = {};
        function K(O, N) {
            this.key = O;
            _kissy.mix(this, N);
            this.thenCalls = [];
            _kissy.mix(this, _kissy.EventTarget)
        }
        function I(N) {
            if (N.url.indexOf("ald.taobao.com") != -1) {
                var O = _kissy.cfg("itemDO");
                _kissy.mix(N.data, { categoryId: O.categoryId, sellerId: O.userId, shopId: _kissy.cfg("rstShopId"), brandId: O.brandId, refer: F.referrer }, false)
            }
        }
        _kissy.augment(K, { run: function () {
            this._get();
            this.runCount++;
            this.thenCalls.push("get");
            return this
        }, then: function (N) {
            if (_kissy.isFunction(N)) {
                this.thenCalls.push(N)
            }
        }, _checkTime: function () {
            var N = this;
            if (_kissy.isFunction(this.error)) {
                var O = _kissy.now() - N._startTime;
                if (O >= N.timeout) {
                    if (N.errorTimer) {
                        clearTimeout(N.errorTimer)
                    }
                    if (!N._endTime) {
                        N._errorTime = _kissy.now();
                        N.error();
                        _kissy.log(N.key + " Aysn Timeout:" + N.url, "error")
                    }
                } else {
                    N.errorTimer = setTimeout(function () {
                        N._checkTime()
                    }, 200)
                }
            }
        }, _get: function () {
            var N = this;
            I(N);
            this._startTime = _kissy.now();
            this._checkTime();
            _kissy.use("ajax", function (P, O) {
                O = O || P.io;
                O({ url: N.url, data: N.data, jsonpCallback: N.jsonpCallback, success: function (Q, S, R) {
                    N._endTime = P.now();
                    if (N.errorTimer) {
                        clearTimeout(N.errorTimer)
                    }
                    N.xhrTime = N._endTime - N._startTime;
                    if (N.pageCache) {
                        N.xhrdata = Q
                    }
                    if (P.isFunction(N.success)) {
                        N.success.call(this, Q, S, R)
                    }
                }, dataType: "jsonp"
                })
            })
        } 
        });
        return { add: function (O, N) {
            if (!O) {
                return
            }
            N = N || {};
            _kissy.mix(N, H, false);
            if (_kissy.Config.debug) {
                N.jsonpCallback = "Jsonp" + O
            }
            if (!L[O]) {
                L[O] = new K(O, N)
            } else {
                _kissy.mix(L[O], N, true)
            }
            return L[O]
        }, get: function (N) {
            return L[N].xhrdata
        }, dir: function (N) {
            console.dir(L[N])
        }, then: function () {
        }, _apps: function () {
            console.dir(L)
        } 
        }
    } ()
    });
    TB.namespace("Detail");
    try {
        var G = F.domain.split(".");
        F.domain = G.slice(G.length - 2).join(".")
    } catch (D) {
    }
    TShop.poc = function (H) {
        var J = window;
        var I = J.g_config;
        if (I.offlineShop || I.isOfflineShop) {
            return
        }
        if (I.isSpu) {
            H += "_s"
        }
        (J._poc = J._poc || []).push(["_trackCustomTime", "tt_" + H, new Date().valueOf()])
    };
    TShop.initFoot = function (H) {
        _kissy.use(["dom", "malldetail/common/util", "malldetail/other/lazy", "malldetail/dc/dc", "malldetail/other/leftSlide", "malldetail/other/mainBody", "malldetail/other/init"], function (L, N, J) {
            J.initHover();
            J.loadAssets("apps/tmall/common/tgallery.js?t=20121028");
            J.loadAssets("/apps/tmall/common/bottombar.js?t=20121028");
            J.loadAssets("/apps/department/common/brandbar.js?t=20121028");
            J.loadAssets("/p/mall/2.0/js/zeroclipboard.js");
            J.loadAssets("s/tb-tracer-min.js?t=20110628");
            J.loadAssets("cps/trace.js?t=20120618");
            var I = 0;
            var K = L.getUrlParams();
            var O = K.selected || ((K.on_comment == 1 || -1 !== location.href.indexOf("rate_detail.htm")) ? "reviews" : "");
            if (O) {
                TShop.onMainBody(function (Q) {
                    Q.switchTab(O)
                })
            }
            var P = N.get("#detail");
            if (P) {
                for (P = P.nextSibling; P; P = P.nextSibling) {
                    if (P.nodeType != 1) {
                        continue
                    }
                    TShop.addLazyCallback(P, function () {
                        TShop.onMainBody()
                    })
                }
            }
            TShop.addLazyCallback(N.get(".col-sub", "#content"), function () {
                TShop.onLeftSlide()
            });
            TShop.use("malldetail/dc/dc", function (U, T) {
                var R = U._TMD_Config, Q = { assetsHost: C, pageType: "tmalldetail", lazyContainers: ["#hd"] };
                if (R && R.itemDO) {
                    Q.isvParams = U.mix({ nickName: R.itemDO.sellerNickName, userId: R.itemDO.userId, shopId: "", itemId: "", itemNumId: R.itemDO.itemId, shopStats: R.itemDO.feature, validatorUrl: R.itemDO.validatorUrl, templateName: R.itemDO.templateName, templateId: R.itemDO.templateId }, R.isv)
                }
                T.init({ wangpuConfig: Q })
            });
            TShop.use("malldetail/other/init", function (Q) {
                Q.mix(Q, Q.EventTarget);
                Q.mods.footinit.init()
            });
            if (H.showShoplist) {
                L.use(["event", "dom"], function (T, W, X) {
                    W.delegate(document, "click", ".J_atpanelClick", function (Z) {
                        var S = Z.target;
                        document.createElement("img").src = "http://www.atpanel.com/mallsearch?" + H.aLog + "&itemid=" + S.getAttribute("itemId") + "&itemcat=" + S.getAttribute("categoryId") + "&itemspu=" + S.getAttribute("spuId") + "&machineid=" + H.trackid + "&type=1&clickid=" + S.getAttribute("itemId") + "&shopid=" + S.getAttribute("shopID");
                        return true
                    });
                    var V = X.get(".shop-shoplist"), Y = X.query(".layer", V);
                    W.on(Y, "mouseover", function () {
                        X.addClass(this.parentNode, "hover")
                    });
                    W.on(Y, "mouseout", function () {
                        X.removeClass(this.parentNode, "hover")
                    });
                    var Q = location.href, U = "https://login.taobao.com/member/login.jhtml?TPL_redirect_url=" + Q, R = document.getElementById("J_Guestlogin");
                    if (R) {
                        R.href = U
                    }
                })
            }
            if (H.showRelativeSpus) {
                TShop.onLeftSlide(function (Q) {
                    Q.initRelative(H)
                }, 0)
            }
            if (H.showPaimaiBid) {
                L.use(["dom", "json"], function (R, U, Q) {
                    try {
                        if (window.TAOBAO_PAIMAI_BIDSAU) {
                            U.html("#J_BidRecord", Q.parse(window.TAOBAO_PAIMAI_BIDSAU.data).totalCnt)
                        }
                    } catch (T) {
                    }
                })
            }
            if (H.showTryDetail) {
                TShop.onMainBody(function (Q) {
                    Q.showTryDetail()
                }, 0)
            }
            if (H.setDomain) {
                var M = function (S) {
                    var R = S.split(".");
                    var Q = R.length;
                    if (Q < 2) {
                        return S
                    }
                    return R[Q - 2] + "." + R[Q - 1]
                };
                document.domain = M(location.hostname)
            }
            if (H.bidInit) {
                L.getScript(C + "/apps/??auctionplatform/20111110/market/detail/module/bid_module.css,malldetail/" + A.ver + "/css/auction.css?t=" + L.t());
                L.use("malldetail/bid/bid", function (R, Q) {
                    Q.init("#tbid-container", { isCustom: false, isMpp: true })
                })
            }
        })
    }
})(KISSY);
