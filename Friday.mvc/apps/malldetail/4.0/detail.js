﻿(function (_kissy) {
    //var F = document, E = window, A = E.g_config, C = A.assetsHost || "http://l.tbcdn.cn";
    var _document = document,
        _window = window,
        _g_config = _window.g_config,
        _url = _g_config.assetsHost || "http://www.linjuzaixian.com/";
    _g_config.t = _g_config.t + "d4";
    _kissy.config(
         { combine: false,
             map: [
                  [/(malldetail\/[0-9\.]+\/)malldetail\//, "$1"]
                ],
             packages:
               [
                   { name: "malldetail",
                       ignorePackageNameInUri: true,
                       tag: _g_config.t,
                       path: _url + "/apps/malldetail/" + _g_config.ver + "/",
                       charset: "gbk",
                       combine: true,
                       debug: true
                   }
               ]
         }
    );
    _kissy.config({ packages: [{ name: "wangpu", tag: "20130106", path: _url + "/p/shop/3.0/", charset: "utf-8"}] });
    //2013-08-22 basilwang 增加tmall namespace
    _kissy.config(
        { map:
           [
           ],
            packages: [{ name: "tmall", charset: "gbk", path: "../../apps/", tag: "20130106"}]
        }
         );
    
    //debugger
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
                        TMiniCart: { requires: ["TMiniCartModel", "TMiniCartView"] }
                    }
                  }
    );
    _kissy.namespace("mods", "widgets");
    _kissy.t = function () {
        return _g_config.t
    };


    _kissy.mix(_kissy,
        {
            isDetail: function () {
                return 1 === _g_config.appId
            },
            isMall: function () {
                return "b" === _g_config.type
            },
            isBid: function () {
                return "auction" === _g_config.pageType
            },
            addTimeStamp: function () {
                var _now = _kissy.now();
                return function (_url_t) {
                    return _url_t + (_url_t.indexOf("?") === -1 ? "?" : "&") + "t=" + _now
                }
            } (),
            _sendImage: function (H, J) {
                if (!H) {
                    return
                }
                var I = { catid: _kissy.cfg("itemDO").categoryId, itemId: _kissy.cfg("itemDO").itemId, pagetype: this.getPageType(), rn: this.getUrlParams("rn"), sellerId: _kissy.cfg("itemDO").userId };
                this._sendImage = function (K, L) {
                    var L = L || {};
                    L = _kissy.mix(L, I, false);
                    var N = "jsFeImage_" + _kissy.guid();
                    var M = _window[N] = new Image();
                    if (K.indexOf("?") == -1) {
                        K += "?" + _kissy.param(L)
                    } else {
                        K += "&" + _kissy.param(L)
                    }
                    M.onload = (M.onerror = function () {
                        _window[N] = null
                    });
                    M.src = K + "&_tm_cache=" + _kissy.now();
                    M = null
                };
                return this._sendImage(H, J)
            },
            getPageType: function () {
                var _url_t = location.href;
                switch (true) {
                    case (/spu_detail/.test(_url_t)):
                        return "spu";
                    case (/rate_detail/.test(_url_t)):
                        return "rate";
                    case (/meal_detail/.test(_url_t)):
                        return "meal";
                    default:
                        return "item"
                }
            },
//            sendAtpanel: function (I, J) {
//                var H = "http://localhost:7527/" + I;
//                this._sendImage(H, J)
//            },
            sendAcAtpanel: function (_tab_panel_id, J) {
                var H = "http://localhost:7527/" + _tab_panel_id;
                this._sendImage(H, J)
            },
            sendImg: function (H) {
                this._sendImage(H)
            },
            sendErr: function (H, I) {
                I = I || {};
                I.type = H;
                //this.sendAtpanel("tmalldetail.15.2", I)
            },
            scrollToElem: function (I) {
                var H = _kissy.DOM, J = H.offset(I).top;
                _document[_kissy.UA.webkit ? "body" : "documentElement"].scrollTop = J - 130
            },
            flush: ((0 < _kissy.UA.ie) ? CollectGarbage : (function () {
            })),
            inBucket: function (N) {
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
            },
            getUrlParams: function (I) {
                var H = _window.location.href.split("?")[1] || "";
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
            },
            onLogin: function (L, I) {
                var J = (_g_config.assetsHost.indexOf("taobao.net") != -1);
                var K = J ? "daily.tmall.net" : "tmall.com";
                //2013-05-06 basilwang use our own
                //var H = _kissy.mix({ proxyURL: "http://detail." + K + "/cross/x_cross_iframe.htm?type=minilogin&t=" + _kissy.t() }, I);
                var H = _kissy.mix({ proxyURL: "http://www.linjuzaixian.com/Account/Home/XCrossIframe?type=minilogin&t=" + _kissy.t() }, I);
                _kissy.use("tml/minilogin", function (M, N) {
                    N.show(L, H)
                })
            },
            addLazyCallback: function () {
                var _arguments = arguments;
                _kissy.use("malldetail/other/lazy", function (_kissy_J, _malldetail_other_lazy) {
                    _malldetail_other_lazy.addCallback.apply(_malldetail_other_lazy, _arguments)
                })
            },
            onMainBody: function () {
                var _arguments = arguments, _onMainBody = TShop.onMainBody;
                _kissy.use("malldetail/common/util", function (_kissy_imp_t, _malldetail_common_util) {
                    if (_onMainBody != TShop.onMainBody) {
                        return
                    }
                    TShop.onMainBody = _malldetail_common_util.createLoader(function (_filter_pipeline_dry_fn) {
                        _kissy_imp_t.use("malldetail/other/mainBody", function (_kissy_imp_t_t, _malldetail_other_mainBody) {
                            _malldetail_other_mainBody.init({ onTabBarReady: function () {
                                TShop.poc("tabbar")
                            }
                            });
                            _filter_pipeline_dry_fn(_malldetail_other_mainBody)
                        })
                    });
                    TShop.onMainBody.apply(null, _arguments)
                })
            },
            onLeftSlide: function () {
                var _arguments = arguments, _leftSlide = TShop.onLeftSlide;
                _kissy.use("malldetail/common/util", function (_kissy_J, _malldetail_common_util) {
                    if (_leftSlide != TShop.onLeftSlide) {
                        return
                    }
                    TShop.onLeftSlide = _malldetail_common_util.createLoader(function (_filter_pipeline_dry_fn) {
                        _kissy_J.use("malldetail/other/leftSlide", function (_kissy_N, _malldetail_other_leftSlide) {
                            _malldetail_other_leftSlide.init({ onReviewClick: function () {
                                TShop.onMainBody(function (_mainbody_o) {
                                    _mainbody_o.switchTab("J_Reviews")
                                })
                            }
                            });
                            _filter_pipeline_dry_fn(_malldetail_other_leftSlide)
                        })
                    });
                    TShop.onLeftSlide.apply(null, _arguments)
                })
            },
            loadMdskip: function (_url) {
                function _onMdskip(_defaultModelObject) {
                    window.onMdskip = null;
                    TShop.mdskipCallback = TShop.mdskipCallback ? TShop.mdskipCallback(_defaultModelObject, _now ? (_kissy.now - _now) : -1) : function (_data_setMdskip) {
                        _data_setMdskip(_defaultModelObject, _now ? (_kissy.now - _now) : -1)
                    }
                }
                if (-1 != location.href.indexOf("rate_detail.htm")) {
                    _onMdskip();
                    return
                }
                var _url_params_object = _kissy.getUrlParams(["ip", "campaignId", "key", "abt", "cat_id", "q", "u_channel"]);
                _url_params_object.ref = encodeURIComponent(_document.referrer);
                var _url_params = _kissy.param(_url_params_object), _now = _kissy.now();
                window.onMdskip = _onMdskip;
                _kissy.getScript(_url + "&callback=onMdskip&" + _url_params, { error: _onMdskip })
            },
            Setup: function (_config) {
                _kissy._TMD_Config = _config;
                if (_config.renderReq) {
                    new Image().src = _config.renderSystemServer + "/index.htm?keys=" + encodeURIComponent(_config.renderReq)
                }
                _kissy.namespace("mods.SKU");
                _kissy.loadMdskip(_config.initApi);
                _kissy.use(["event", "malldetail/data/data", "cookie", "datalazyload", "swf", "malldetail/sku/setup", "mod~global"], function (_kissy_m, _event, _malldetail_data_data) {
                    TShop.mdskipCallback = TShop.mdskipCallback ? TShop.mdskipCallback(_malldetail_data_data.setMdskip) : _malldetail_data_data.setMdskip;
                    _event.on(_document, "click tap", function (_e) {
                        var N = _kissy_m.bdClickFn || [];
                        for (var M = 0, L = N.length; M < L; M++) {
                            N[M](_e, _e.target)
                        }
                    });
                    TB.Global.writeLoginInfo();
                    _kissy_m.mix(_kissy_m, _kissy_m.EventTarget);
                    _config.onBuyEnable = function () {
                        TShop.poc("buyEnable")
                    };
                    _config.onReviewClick = function () {
                        TShop.onMainBody(function (L) {
                            L.switchTab("J_Reviews")
                        })
                    };
                    _kissy_m.mods.SKU.init(_config)
                })
            },
            onBDclick: function (H) {
                _kissy.bdClickFn = _kissy.bdClickFn || [];
                if (_kissy.isFunction(H)) {
                    _kissy.bdClickFn.push(H)
                }
            },
            cfg: function () {
                var I;
                var K;
                var _arguments = arguments;
                var _tmd_config = _kissy._TMD_Config || { api: {}, detail: {}, itemDO: {}, tag: {}, systemTime: new Date().getTime() };
                switch (typeof _arguments[0]) {
                    case "undefined":
                        return _tmd_config;
                        break;
                    case "string":
                        if (arguments.length == 2) {
                            I = _tmd_config[_arguments[0]];
                            if (I != _arguments[1]) {
                                _tmd_config[_arguments[0]] = _arguments[1];
                                _kissy.fire("TMDConfigChange", { oldVal: I, newVal: _arguments[1] })
                            }
                        } else {
                            return _tmd_config[_arguments[0]]
                        }
                        break;
                    case "object":
                        I = {};
                        _kissy.each(_arguments[0], function (M, L) {
                            I[L] = _tmd_config[L];
                            _tmd_config[L] = M
                        });
                        _kissy.fire("TMDConfigChange", { oldVal: I, newVal: _arguments[0] });
                        break
                }
            },
            Asyn: function () {
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
                        _kissy.mix(N.data, { categoryId: O.categoryId, sellerId: O.userId, shopId: _kissy.cfg("rstShopId"), brandId: O.brandId, refer: _document.referrer }, false)
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
        var _domain_split_array = _document.domain.split(".");
        //2013-04-30 basilwang strip www
        //_document.domain = _domain_split_array.slice(_domain_split_array.length - 2).join(".")
    } catch (D) {
    }
    TShop.poc = function (H) {
        var _window = window;
        var _g_config = _window.g_config;
        if (_g_config.offlineShop || _g_config.isOfflineShop) {
            return
        }
        if (_g_config.isSpu) {
            H += "_s"
        }
        (_window._poc = _window._poc || []).push(["_trackCustomTime", "tt_" + H, new Date().valueOf()])
    };
    TShop.initFoot = function (_foot_cfg) {
        _kissy.use(["dom", "malldetail/common/util", "malldetail/other/lazy", "malldetail/dc/dc", "malldetail/other/leftSlide", "malldetail/other/mainBody", "malldetail/other/init", "tmall/mui/bottombar","tmall/mui/brandbar"], function (_kissy_imp_t_x, _dom, _malldetail_common_util) {
            _malldetail_common_util.initHover();
            //            _malldetail_common_util.loadAssets("apps/tmall/common/tgallery.js?t=20121028");
            //            _malldetail_common_util.loadAssets("/apps/tmall/common/bottombar.js?t=20121028");
            //            _malldetail_common_util.loadAssets("/apps/department/common/brandbar.js?t=20121028");
            //            _malldetail_common_util.loadAssets("/p/mall/2.0/js/zeroclipboard.js");
            //            _malldetail_common_util.loadAssets("s/tb-tracer-min.js?t=20110628");
            //            _malldetail_common_util.loadAssets("cps/trace.js?t=20120618");
            //_kissy.getScript("http://www.linjuzaixian.com/apps/tmall/mui/bottombar.js");
            //_kissy.getScript("http://www.linjuzaixian.com/apps/tmall/mui/brandbar.js");
            var I = 0;
            var _urlparams = _kissy_imp_t_x.getUrlParams();
            var _is_selected = _urlparams.selected ||
                ((_urlparams.on_comment == 1
                    || -1 !== location.href.indexOf("rate_detail.htm")) ? "reviews" : "");
            if (_is_selected) {
                TShop.onMainBody(function (_malldetail_other_mainBody) {
                    _malldetail_other_mainBody.switchTab(_is_selected)
                })
            }
            var _dom_layout = _dom.get("#detail");
            if (_dom_layout) {
                for (_dom_layout = _dom_layout.nextSibling; _dom_layout; _dom_layout = _dom_layout.nextSibling) {
                    if (_dom_layout.nodeType != 1) {
                        continue
                    }
                    TShop.addLazyCallback(_dom_layout, function () {
                        TShop.onMainBody()
                    })
                }
            }
            TShop.addLazyCallback(_dom.get(".col-sub", "#content"), function () {
                TShop.onLeftSlide()
            });
            TShop.use("malldetail/dc/dc", function (_kissy_U, _malldetail_dc_dc) {
                var _TMD_Config_t = _kissy_U._TMD_Config,
                    _dc_cfg = { assetsHost: _url, pageType: "tmalldetail", lazyContainers: ["#hd"] };
                if (_TMD_Config_t && _TMD_Config_t.itemDO) {
                    _dc_cfg.isvParams = _kissy_U.mix({ nickName: _TMD_Config_t.itemDO.sellerNickName, userId: _TMD_Config_t.itemDO.userId, shopId: "", itemId: "", itemNumId: _TMD_Config_t.itemDO.itemId, shopStats: _TMD_Config_t.itemDO.feature, validatorUrl: _TMD_Config_t.itemDO.validatorUrl, templateName: _TMD_Config_t.itemDO.templateName, templateId: _TMD_Config_t.itemDO.templateId }, _TMD_Config_t.isv)
                }
                _malldetail_dc_dc.init({ wangpuConfig: _dc_cfg })
            });
            TShop.use("malldetail/other/init", function (_kissy_Q) {
                _kissy_Q.mix(_kissy_Q, _kissy_Q.EventTarget);
                _kissy_Q.mods.footinit.init()
            });
            //2013-05-01 basilwang below is no use , cause _foot_cfg is always null begin
            if (_foot_cfg.showShoplist) {
                _kissy_imp_t_x.use(["event", "dom"], function (T, W, X) {
                    W.delegate(document, "click", ".J_atpanelClick", function (Z) {
                        var S = Z.target;
                        document.createElement("img").src = "http://www.atpanel.com/mallsearch?" + _foot_cfg.aLog + "&itemid=" + S.getAttribute("itemId") + "&itemcat=" + S.getAttribute("categoryId") + "&itemspu=" + S.getAttribute("spuId") + "&machineid=" + _foot_cfg.trackid + "&type=1&clickid=" + S.getAttribute("itemId") + "&shopid=" + S.getAttribute("shopID");
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
            if (_foot_cfg.showRelativeSpus) {
                TShop.onLeftSlide(function (Q) {
                    Q.initRelative(_foot_cfg)
                }, 0)
            }
            if (_foot_cfg.showPaimaiBid) {
                _kissy_imp_t_x.use(["dom", "json"], function (R, U, Q) {
                    try {
                        if (window.TAOBAO_PAIMAI_BIDSAU) {
                            U.html("#J_BidRecord", Q.parse(window.TAOBAO_PAIMAI_BIDSAU.data).totalCnt)
                        }
                    } catch (T) {
                    }
                })
            }
            if (_foot_cfg.showTryDetail) {
                TShop.onMainBody(function (Q) {
                    Q.showTryDetail()
                }, 0)
            }
            if (_foot_cfg.setDomain) {
                var M = function (S) {
                    var R = S.split(".");
                    var Q = R.length;
                    if (Q < 2) {
                        return S
                    }
                    return R[Q - 2] + "." + R[Q - 1]
                };
                //document.domain = M(location.hostname)
                //document.domain = location.hostname
            }
            if (_foot_cfg.bidInit) {
                _kissy_imp_t_x.getScript(_url + "/apps/??auctionplatform/20111110/market/detail/module/bid_module.css,malldetail/" + _g_config.ver + "/css/auction.css?t=" + _kissy_imp_t_x.t());
                _kissy_imp_t_x.use("malldetail/bid/bid", function (R, Q) {
                    Q.init("#tbid-container", { isCustom: false, isMpp: true })
                })
            }
            //2013-05-01 basilwang below is no use , cause _foot_cfg is always null   end
        })
    }
})(KISSY);
