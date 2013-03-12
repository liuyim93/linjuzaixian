/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-16
 * Time: 下午1:55
 * To change this template use File | Settings | File Templates.
 */
var TB = KISSY.app ? KISSY.app("TB") : KISSY;
TB.add("mod~global", function () {
    var _kissy = KISSY;
    TB.loginHttp = "https";
    TB._isLoginStatusReady = false;
    TB._loginStatusReadyFnList = [];
    TB._isMemberInfoReady = false;
    TB._memberInfoReadyFnList = [];
    TB.userInfo = { memberInfo: {} };
    TB.environment = { isTmall: window.location.hostname.indexOf("tmall.com") > -1 || window.location.hostname.indexOf("tmall.net") > -1, isDaily: window.location.hostname.indexOf(".net") > -1, isHttps: window.location.href.indexOf("https://") === 0 };
    window.g_config = window.g_config || {};
    window.g_config.tmallConfig =
    { commonJS:
        { tDog: { off: false, timestamp: "20120608" },
            tLabs: { off: false, timestamp: "20120608" },
            mpp: { off: false, timestamp: "20120608" },
            miniCart: { off: false },
            brandBar: { off: false, timestamp: "20121106" },
            miniBag: { off: false, timestamp: "20130109",
                blacklist: ["taohua.com", "chaoshi.tmall.com", "buy.tmall.com", "cart.tmall.com", "refund.tmall.com", "rights.tmall.com", "obuy.tmall.com", "taobao.com", "daily.taohua.net", "chaoshi.daily.tmall.net", "buy.daily.tmall.net", "cart.daily.tmall.net", "refund.daily.tmall.net", "rights.daily.tmall.net", "obuy.daily.tmall.net", "daily.taobao.net"]
            },
            checkB2BUser: { off: false },
            shareFB: { off: false, timestamp: "20121116" }
        }
    };
    var _tmall_config = window.g_config.tmallConfig;
    //2013-02-19 basilwang !"0"[0] is false  in chrome   K is false, m is false  O is false
    var _ie6_hack_judgement = !"0"[0],
    //2013-02-20 basilwang m (K is true && doesn't have window.XMLHttpRequest) is true in ie6  (still need test in ie7)
        _is_ie6 = _ie6_hack_judgement && !window.XMLHttpRequest,
    //2013-02-21 basilwang seems ie  TODO still don't know why?
        _is_ie_may_need_fix = !!window.ActiveXObject;
    var _window = window, _document = document, _domain = _document.domain, _div_named_site_nav;
    //2013-02-17 basilwang local env    _is_tmall is false, _is_own is true  X is .daily.taobao.net g is assets.daily.taobao.net   _appid is 2000
    var _is_tmall = _domain.indexOf("tmall.com") > -1,
        _is_own = !(_domain.indexOf("taobao.com") > -1 || _is_tmall),
    //2013-03-06 basilwang use our own
    //_own_domain = _is_own ? ".daily.taobao.net" : ".taobao.com";
        _own_domain = _is_own ? "localhost:7525" : ".taobao.com";
    //var g = _is_own ? "assets.daily.taobao.net" : "a.tbcdn.cn",
    var _own_domain_1 = _is_own ? "localhost:7525" : "a.tbcdn.cn",
        _param_array = _kissy.unparam(location.search.substring(1)),
        _appid = "g_config" in _window ? ("appId" in _window.g_config ? parseInt(_window.g_config["appId"]) : undefined) : undefined;
    //2013-02-20 basilwang is Https or not
    var _is_https = (_document.location.href.indexOf("https://") === 0);
    var _space_char = " ", _event_constant_hover = "hover", _no_class = "", _str_class_mini_cart = "mini-cart";
    var _user_info_bag = {};
    var CommonJS = { siteNav: function () {
        if (!_div_named_site_nav) {
            return
        }
        _div_named_site_nav.setAttribute("role", "navigation");
        _kissy.each(_findChildElementsByClassNameAndType("sn-menu", "*", _div_named_site_nav), function (_div_named_sn_menu) {
            TB.Global._addMenu(_div_named_sn_menu)
        });
        var _li_class_named_cart = _findChildElementsByClassNameAndType("cart", "li", _div_named_site_nav)[0];
        _addEventCombo(_li_class_named_cart, "click", function (_event) {
            var _element_to_be_operated = _event.target || _event.srcElement;
            if (_element_to_be_operated.nodeName != "A" && _element_to_be_operated.parentNode.nodeName === "A") {
                _element_to_be_operated = _element_to_be_operated.parentNode
            }
            if (_element_to_be_operated.nodeName === "A" && _element_to_be_operated.href.indexOf("myCart.htm") > -1) {
                _preventPropagation(_event);
                _removeClassName(_li_class_named_cart, "hover");
                TB.Cart && TB.Cart.redirect(_element_to_be_operated, _element_to_be_operated.href);
                if (_window.MiniCart) {
                    _window.MiniCart._clicked = false
                }
            }
        });
        TB.Global.memberInfoReady(function (_userinfo) {
            //2013-03-09 basilwnag if it's mallSeller  show SellerCenter, but we should let seller login in another entrance
            if (_userinfo.isLogin && _userinfo.memberInfo.mallSeller) {
                var _dom_class_j_MyTaobao = _findChildElementByClassName("j_MyTaobao", _div_named_site_nav);
                var _dom_class_j_SellerCenter = _findChildElementByClassName("j_SellerCenter", _div_named_site_nav);
                _addClassName(_dom_class_j_MyTaobao, "hidden");
                _removeClassName(_dom_class_j_SellerCenter, "hidden")
            }
        });
        //2013-02-19 basilwang asyn add  j_MallCateHoverTrigger
        _kissy.ready(function () {
            _kissy.use("event", function (_kissy_imp, _event) {
                _event = _event || _kissy_imp.Event;
                var _url = "http://localhost:7525/category/home/cat_nav_asyn";
                var _j_mall_cate = document.getElementById("J_MallCate");
                var _div_named_sn_menu = _findChildElementByClassName("sn-menu", _j_mall_cate);
                if (_j_mall_cate && _div_named_sn_menu) {
                    var _div_load = document.createElement("div");
                    _div_load.className = "sn-mcate-bd sn-mcate-unready j_MallCateHoverTrigger";
                    document.body.insertBefore(_div_load, document.body.lastChild);
                    _div_load.innerHTML = "努力加载中...";
                    _div_load.style.top = (_getOffsetTotal(_div_named_site_nav) + 30) + "px";
                    var _later_fn, _is_entered = false, _is_later_fn_excuted = false;
                    _event.on(_j_mall_cate, "mouseenter", function () {
                        _is_entered = true;
                        _later_fn = _kissy_imp.later(function () {
                            _addClassName(_div_named_sn_menu, "hover");
                            _div_load.style.display = "block";
                            _is_later_fn_excuted = true
                        }, 300)
                    });
                    _event.on(_j_mall_cate, "mouseleave", function (x) {
                        _is_entered = false;
                        if (_is_later_fn_excuted) {
                            _removeClassName(_div_named_sn_menu, "hover");
                            _div_load.style.display = "none";
                            _is_later_fn_excuted = false
                        } else {
                            _later_fn && _later_fn.cancel()
                        }
                    });
                    _event.on(_div_load, "mouseenter", function () {
                        _addClassName(_div_named_sn_menu, "hover");
                        _div_load.style.display = "block"
                    });
                    _event.on(_div_load, "mouseleave", function () {
                        _kissy_imp.later(function () {
                            if (!_is_entered) {
                                _removeClassName(_div_named_sn_menu, "hover");
                                _div_load.style.display = "none"
                            }
                        }, 100)
                    });
                    window._mallCateCtnHandler = function (x) {
                        _div_load.innerHTML = x;
                        _removeClassName(_div_load, "sn-mcate-unready");
                        _kissy_imp.getScript("http://a.tbcdn.cn/p/mall/2.0/js/direct-promo.js")
                    };
                    _addEventCombo(_j_mall_cate, "mouseover", function () {
                        var _dom_id_J_MallCateCtnCon = document.getElementById("J_MallCateCtnCon");
                        if (_dom_id_J_MallCateCtnCon) {
                            return
                        }
                        _kissy_imp.getScript(_url + "?callback=window._mallCateCtnHandler&t=" + _kissy_imp.now(), { timeout: 5, error: function () {
                            _div_load.innerHTML = "加载失败，请稍后重试！";
                            _addClassName(_div_load, "sn-mcate-unready")
                        } 
                        })
                    })
                }
            })
        })
    }, tDog: function () {
        _kissy.ready(function () {
            if (window.g_config.closeWW && _tmall_config.commonJS.tDog.off) {
                return
            }
            window.g_config = window.g_config || {};
            window.g_config.toolbar = false;
            window.g_config.webww = true;
            if ((_appid && _appid != -1 && _appid != 2000) || "tstart" in _param_array || "tdog" in _param_array) {
                var S = "http://" + _own_domain_1 + "/p/header/webww-min.js?t=" + _tmall_config.commonJS.tDog.timestamp, i = 0;
                _kissy.ready(function () {
                    if (_kissy.DOM) {
                        _kissy.getScript(S)
                    } else {
                        if (i < 10) {
                            setTimeout(arguments.callee, 1000);
                            i++
                        } else {
                            _kissy.use("core", function () {
                                _kissy.getScript(S)
                            })
                        }
                    }
                })
            }
        })
    }, tLabs: function () {
        _kissy.ready(function () {
            if (window.g_config.closeLab && _tmall_config.commonJS.tLabs.off) {
                return
            }
            if (location.href.indexOf("tms.taobao.com") !== -1) {
                return
            }
            /* 2013-03-09 basilwang  _get_user_cookie_value use regex  i.e.  document.cookie is
            "guid=e25096ef-0d12-4b1c-b730-55efb51a6e0b; V5ShopUserTemp=0aSdh2/ZTt2eFIdgRWWDSWQMI2cDtfGc9Bu66/QaPE4=; VerifyCodeArticle=5857; V5ShopLoginID=l8xdI386HMEGGWe2SEZhm0NGFIBI5hqXamBWHyYgl0E=; cq=ccp%3D1"
            _document.cookie.match("(?:^|;)\\s*cq=([^;]*)")
            match results are ["; cq=ccp%3D1", "ccp%3D1"]

            */
            var _tlab_url = "http://" + _own_domain_1 + "/p/tlabs/1.0.0/tlabs-min.js?t=" + _tmall_config.commonJS.tLabs.timestamp,
                _nick = _get_user_cookie_value("_nk_") || _get_user_cookie_value("tracknick");
            _nick = encodeURIComponent(_get_newly_created_div_innerHTML(unescape(_nick.replace(/\\u/g, "%u"))));
            _kissy.getScript(_tlab_url, function () {
                if (typeof TLabs !== "undefined") {
                    TLabs.init({ nick: _nick })
                }
            })
        })
    }, POCMonitor: function () {
        if (window.g_config.closePoc) {
            return
        }
        var s = _window._poc || [], r, p = 0, S = [["_setAccount", (_window.g_config || 0).appId], ["_setStartTime", (_window.g_config || 0).startTime || _window.HUBBLE_st || _window.g_hb_monitor_st]], q = 10000;
        while ((r = s[p++])) {
            if (r[0] === "_setRate") {
                q = r[1]
            } else {
                if (r[0] === "_setAccount") {
                    S[0] = r
                } else {
                    if (r[0] === "_setStartTime") {
                        S[1] = r
                    } else {
                        S.push(r)
                    }
                }
            }
        }
        if (parseInt(Math.random() * q) === 0) {
            _window._poc = S;
            _kissy.getScript("http://a.tbcdn.cn/p/poc/m.js?v=0.0.1.js")
        }
    }, initHeaderLinks: function () {
        if (!TB.environment.isDaily) {
            return
        }
        var _doms_a = _div_named_site_nav ? _div_named_site_nav.getElementsByTagName("a") : [];
        for (var _index = 0; _index < _doms_a.length; _index++) {
            if (_doms_a[_index].href.indexOf("register") === -1 && _doms_a[_index].href.indexOf(".php")) {
                _doms_a[_index].href = _doms_a[_index].href.replace("taobao.com", "daily.taobao.net").replace("tmall.com", "daily.tmall.net")
            }
        }
    }, initLogout: function () {
        var _dom_id_J_Logout = _document.getElementById("#J_Logout");
        if (!_dom_id_J_Logout) {
            return
        }
        _addEventCombo(_dom_id_J_Logout, "click", function (_event) {
            _event.halt();
            var _logout_url = _dom_id_J_Logout.href;
            /*2013-03-09 basilwang what does this main?*/
            new Image().src = "//taobao.alipay.com/user/logout.htm";
            setTimeout(function () {
                location.href = _logout_url
            }, 20)
        })
    },
        //2013-03-09 basilwang don't think we need this
        /*
        test: function() {
        var S = false;
        var i = function() {
        if (S) {
        return
        }
        S = true;
        if (location.href.indexOf("__cloudyrun__") > -1) {
        _kissy.getScript("http://assets.daily.taobao.net/p/cloudyrun/1.0/cloudyrun-taobao-pkg.js?t=" + (+new Date()))
        }
        };
        _kissy.ready(i);
        setTimeout(i, 4000)
        },
        */
        /*
        assist: function() {
        if (_get_user_cookie_value("test_accouts") && document.domain.indexOf("taobao.net") > -1) {
        _kissy.ready(function() {
        _kissy.getScript("http://assets.daily.taobao.net/p/assist/login/login.js")
        })
        }
        },*/
        /*
        collect: function() {
        !~location.host.indexOf(".net") && !~location.host.indexOf("tms.taobao.com") && Math.random() * 1000 < 1 && _kissy.ready(function() {
        _kissy.later(function() {
        var S = document.getElementById("server-num");
        _window.goldlog && _window.goldlog.emit && _window.goldlog.emit("mall_app", {kissy: _kissy.version,host: location.host,url: location.host + location.pathname,tbra: !!_window.YAHOO,back: 0,appname: S && S.innerHTML ? S.innerHTML.split(".")[0].replace(/\d+/g, "") : "php"})
        }, 2000)
        })
        },
        */
        mpp: function () {
            _kissy.ready(function () {
                if (window.g_config.closeMpp && _tmall_config.commonJS.mpp.off) {
                    return
                }
                //2013-03-12 basilwang use node.js and socket.io
                /*
                _kissy.getScript("http://" + _own_domain_1 + "/p/tstart/1.0/build/tb-mpp.js?t=" + _tmall_config.commonJS.mpp.timestamp, {success: function() {
                _kissy.ready(function() {
                if (!TB.Global.isLogin()) {
                return
                }
                Mpp.Notify.register({appId: 1010,type: 1,callback: function() {
                _kissy.getScript("http://" + (_is_own ? "webww.daily.taobao.net:8080" : "webwangwang.taobao.com") + "/getOtherSystem.do?callback=TB.Global.setUserMsg&t=" + _kissy.now())
                }})
                })
                }})
                */
                //_kissy.ready(function () {
//                    if (!TB.Global.isLogin()) {
//                        return
//                    }
                    var socket;
                    var firstconnect = true;
                    window.__message=function(data) {
                        document.getElementById('message').innerHTML = "Server says"+data ;
                    }
                    window.__status_update=function(txt){
                    document.getElementById('status').innerHTML = txt;
                    }
                    
 
                    //(function () {
                        if (firstconnect) {
                            socket = io.connect("http://localhost:8080");

                            socket.on('message', function (data) {
                                __message(data);
                             });
                            socket.on('connect', function () {
                                __status_update("Connected to Server");
                            });
                            socket.on('register', function (data) {
                                
                                __status_update(data.sid);

                            });
                            socket.on('notify', function (data)
                            { __status_update(data.notifymsg); });
                            socket.on('disconnect', function () {
                                __status_update("Disconnected from Server");
                              });
                            socket.on('reconnect', function () {
                                __status_update("Reconnected to Server");
                             });
                            socket.on('reconnecting', function (nextRetry) {
                                __status_update("Reconnecting in " + nextRetry + " seconds");
                            });
                            socket.on('reconnect_failed', function () { __message("Reconnect Failed"); });
                            firstconnect = false;
                        } else {
                            socket.socket.reconnect();
                        }
                    //})();

               // })
            })
        }, checkB2BUser: function () {
            _kissy.ready(function () {
                if (window.g_config.closeB2BUser || _is_tmall_fn() || _tmall_config.commonJS.checkB2BUser.off) {
                    return
                }
                TB.Global.memberInfoReady(function (p) {
                    if (p.isLogin) {
                        if (p.memberInfo.cookies && p.memberInfo.cookies.uc1) {
                            var q = _kissy.unparam(p.memberInfo.cookies.uc1.value);
                            if (q && q.cbu) {
                                _kissy.ready(function () {
                                    _create_panel_for_B2B_user()
                                })
                            }
                        }
                    }
                })
            });
            function _create_panel_for_B2B_user() {
                //2013-03-07 basilwang use our own domain
                //_kissy.getScript("http://a.tbcdn.cn/apps/tmall/tml/1.0/tml/overlay/css/overlay-min.css?t=20120903");
                _kissy.getScript("http://" + _own_domain + "apps/tmall/tml/1.0/tml/overlay/css/overlay.css");
                var _div_for_mask = document.createElement("div");
                _div_for_mask.className = "tml-ext-mask tml-mask-b2b";
                _div_for_mask.innerHTML = "<!--[if lte IE 6.5]><iframe></iframe><![endif]-->";
                document.body.appendChild(_div_for_mask);
                //2013-03-06 basilwang use our own domain
                //var s = "http://member1" + _own_domain + "/member/changeNick2B.jhtml?t=" + _kissy.now() + "&from=tmall&url=" + encodeURIComponent(window.location.href);
                var _b2b_url = "http://" + _own_domain + "/member/changeNick2B.jhtml?t=" + _kissy.now() + "&from=tmall&url=" + encodeURIComponent(window.location.href);
                var _div_snippet = ['<div class="tml-contentbox">', '   <div class="tml-stdmod-header"></div>', '   <div class="tml-stdmod-body">', '       <iframe height="335" width="100%" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" allowtransparency="true" scrolling="no" src="' + _b2b_url + '"></iframe>', "   </div>", '   <div class="tml-stdmod-footer"></div>', "</div>", '<div class="tml-dialog-skin"></div>', '<i class="tml-dialog-cat"></i>'].join("");
                var _div = document.createElement("div");
                _div.className = "tml-dialog-hasmask tml-dialog tml-ext-position tml-dialog-b2b";
                _div.innerHTML = _div_snippet;
                document.body.appendChild(_div);
                document.documentElement.style.overflow = "hidden"
            }
            function _is_tmall_fn() {
                if ((document.location.host + document.location.pathname) === "www.tmall.com/") {
                    return true
                }
                var _array = ["/go/act/", "list.tmall.com", "list.daily.tmall.net"];
                if (!_array) {
                    return false
                }
                for (var index = 0; index < _array.length; index++) {
                    if (window.location.href.indexOf(_array[index]) > -1) {
                        return true
                    }
                }
                return false
            }
        }, minBag: function () {
            _kissy.ready(function () {
                TB.Global.miniBag()
            })
        }, brandBar: function () {
            _kissy.ready(function () {
                if (window.g_config.closeBrandBar || _if_we_can_try() || _tmall_config.commonJS.brandBar.off) {
                    return
                }
                function _use(_namespace, _fn) {
                    function _onReady() {
                        _kissy.onTgalleryReady(_namespace, _fn)
                    }
                    _kissy.configTgallery = { tag: _tmall_config.commonJS.brandBar.timestamp, path: "http://" + _own_domain_1 + "/apps/" };
                    _kissy.onTgalleryReady ? _onReady() : _kissy.getScript(_kissy.configTgallery.path + "tmall/common/tgallery.js?t=" + _kissy.configTgallery.tag, _onReady)
                }
                _use("tgallery/department/common/brandbar", function (_kissy_tmp, _brandbar) {
                    //2013-03-08 basilwang use our own
                    //var q = TB.environment.isDaily ? "brand.daily.tmall.net" : "brand.tmall.com";
                    var q = "localhost:7525";
                    _brandbar.show({ urlMyBrand: "http://" + q + "/myBrandsIndex.htm", newWindow: true });
                    //2013-03-08 basilwang use our own
                    //_brandbar.bindEl(".j_CollectBrand", {addServer: "http://" + q + "/ajax/brandAddToFav.htm"})
                    _brandbar.bindEl(".j_CollectBrand", { addServer: "http://" + q + "/Favorite/AddToFav" })
                })
            })
        }, shareFB: function () {
            _kissy.ready(function () {
                if (window.g_config.closeShareFB && _tmall_config.commonJS.shareFB.off) {
                    return
                }
                var S = "http://" + _own_domain_1 + "/apps/matrix-mission/feedback/feedback.js?t=" + _tmall_config.commonJS.shareFB.timestamp;
                _kissy.getScript(S)
            })
        } 
    };
    //2013-03-09 element in _commonjs_array will be replaced by setTimeout function wrapper
    var _commonjs_array = ["tDog", "tLabs", "test", "mpp", "minBag", "brandBar", "shareFB"];
    for (var _name_index = 0; _name_index < _commonjs_array.length; _name_index++) {
        (function (_name) {
            var _selected_function = CommonJS[_name];
            //2013-03-09 basilwang just set the setTimeout function to CommonJS element. the setTimeout function will
            //be excuted when TB.Global.init()
            CommonJS[_name] = function () {
                setTimeout(_selected_function, 1000)
            }
        })(_commonjs_array[_name_index])
    }
    TB.Global = { init: function () {
        _div_named_site_nav = _document.getElementById("site-nav");
        this._subMenus = [];
        for (var _single_commonjs in CommonJS) {
            CommonJS[_single_commonjs]()
        }
    }, writeLoginInfo: function (_options) {
        _div_named_site_nav = _document.getElementById("site-nav");
        if (!_div_named_site_nav) {
            return
        }
        var _default_options =
           {
               isApp: false,
               passCookie: true,
               loginServer: "member/login.jhtml",
               logoutServer: "http://login.taobao.com/member/logout.jhtml",
               registerServer: "http://register.tmall.com/",
               spaceServer: "http://jianghu.taobao.com/admin/home.htm"
               /*
               loginServer: "http://login.tmall.com",
               logoutServer: "http://login.taobao.com/member/logout.jhtml",
               registerServer: "http://register.tmall.com/",
               spaceServer: "http://jianghu.taobao.com/admin/home.htm"
               */
           };
        _options = _kissy.merge(_default_options, _options);
        TB.environment.isApp = _options.isApp;
        TB.environment.passCookie = _options.passCookie;
        var _tb_global = TB.Global;
        _tb_global.loginStatusReady(function (_user_info) {
            var _loginserver = _options.loginServer;
            var _url_redirect = window.location.href;
            /*2013-03-09 basilwang if member or login , we don't need redirect*/
            if (/^http.*(\/member\/login\.jhtml)$/i.test(_url_redirect)) {
                _url_redirect = ""
            }
            var _real_url_redirect = _options.redirectUrl || _url_redirect;
            if (_real_url_redirect) {
                _loginserver += "?redirect_url=" + encodeURIComponent(_real_url_redirect)
            }
            var _spaceserver = _options.spaceServer;
            var _registerserver = _options.registerServer;
            var _logoutserver = _options.logoutServer + "?f=top&redirectURL=http://login.tmall.com/?redirect_url=" + encodeURIComponent("" + encodeURIComponent(_real_url_redirect));
            if (TB.environment.isDaily) {
                _loginserver = "http://login.daily.taobao.net/?redirect_url=" + encodeURIComponent(_real_url_redirect);
                _spaceserver = "http://jianghu.daily.taobao.net/admin/home.htm";
                _registerserver += "?isDaily=1";
                _logoutserver = "http://login.daily.taobao.net/member/logout.jhtml?f=top&redirectURL=http://login.daily.taobao.net/member/login.jhtml?redirect_url%3D" + encodeURIComponent("" + encodeURIComponent(_real_url_redirect))
            }
            _spaceserver += "?t=" + _kissy.now();
            var _dom_id_login_info = document.getElementById("login-info");
            if (!_dom_id_login_info) {
                return
            }
            var _user_info_snippet = "";
            if (_user_info.isLogin) {
                _user_info_snippet = 'HI,<a target="_top" href="' + _spaceserver + '" class="j_UserNick sn-user-nick">' + _user_info.nick + '</a>\uff01<a class="j_Identity sn-identity hidden" target="_top"></a><a class="j_Point sn-point hidden" target="_top" href="http://jifen.tmall.com/?from=top&scm=1027.1.1.4">积分<em class="j_PointValue sn-point-value">0</em></a><span class="j_Message sn-message hidden"><a target="_top" href="http://vip.tmall.com/vip/message_box.htm?from=messagebox&scm=1027.1.1.5" class="j_MessageText">消息<em class="j_MessageNum sn-msg-num">0</em></a><span class="sn-msg-box  j_MesssageBox hidden"><i class="sn-msg-hd"></i><span class="sn-msg-bd"><a href="#" class="j_MessageTitle sn-msg-title">加入Tmall俱乐部</a><b class="j_CloseMessage sn-msg-close">&times;</b></span></span></span><a class="sn-logout" target="_top" href="' + _logoutserver + '" id="J_Logout">退出</a><i class="sn-separator"></i>';
                _dom_id_login_info.innerHTML = _user_info_snippet;
                if (_is_ie6) {
                    var _elem = _findChildElementByClassName("j_UserNick", _div_named_site_nav);
                    if (_elem.offsetWidth > 90) {
                        _elem.style.width = 90
                    }
                }
                _tb_global.memberInfoReady(function (AK) {
                    var _memberInfo = AK.memberInfo;
                    if (!_memberInfo || !_memberInfo.login) {
                        return
                    }
                    if (_memberInfo.activeStatus != -99) {
                        var AE = _findChildElementByClassName("j_Identity", _div_named_site_nav);
                        if (_memberInfo.activeStatus >= 1) {
                            _addClassName(AE, "sn-vip" + _memberInfo.activeStatus);
                            AE.href = "http://vip.tmall.com/vip/index.htm?from=top&scm=1027.1.1.2";
                            AE.title = "_getOffsetTotal" + _memberInfo.activeStatus + "\u5929\u732b\u8fbe\u4eba"
                        } else {
                            _addClassName(AE, "sn-vip-unactivated");
                            AE.href = "http://vip.tmall.com/vip/index.htm?layer=activation&from=top&scm=1027.1.1.3";
                            AE.title = "\u52a0\u5165Tmall\u4ff1\u4e50\u90e8\uff0c\u6210\u4e3a\u5929\u732b\u8fbe\u4eba"
                        }
                        _removeClassName(AE, "hidden")
                    }
                    if (_memberInfo.availablePoints != -99) {
                        var AJ = _findChildElementByClassName("j_PointValue", _div_named_site_nav);
                        AJ.innerHTML = AD(_memberInfo.availablePoints);
                        var AH = _findChildElementByClassName("j_Point", _div_named_site_nav);
                        _removeClassName(AH, "hidden")
                    }
                    if (_memberInfo.newMessage > 0 && _memberInfo.lastMessage && _memberInfo.lastMessageUrl) {
                        _findChildElementByClassName("j_MessageText", _div_named_site_nav).href = _memberInfo.lastMessageUrl + "&spm=2001.1.6.1";
                        _findChildElementByClassName("j_MessageNum", _div_named_site_nav).href = _memberInfo.lastMessageUrl + "&spm=2001.1.6.1"
                    }
                    if ((_memberInfo.newMessage || _memberInfo.newMessage == 0) && _memberInfo.newMessage != -99) {
                        var AF = _findChildElementByClassName("j_MessageNum", _div_named_site_nav);
                        if (_memberInfo.newMessage <= 99) {
                            AF.innerHTML = _memberInfo.newMessage
                        } else {
                            AF.innerHTML = "99+"
                        }
                        var AA = _findChildElementByClassName("j_Message", _div_named_site_nav);
                        _removeClassName(AA, "hidden")
                    }
                    if (_memberInfo.newMessage > 0 && _memberInfo.messagePopup && _memberInfo.lastMessage) {
                        var AC = _findChildElementByClassName("j_MesssageBox", _div_named_site_nav);
                        var AB = _findChildElementByClassName("j_MessageTitle", _div_named_site_nav);
                        var AG = _findChildElementByClassName("j_CloseMessage", _div_named_site_nav);
                        AB.innerHTML = _memberInfo.lastMessage;
                        AB.href = _memberInfo.lastMessageUrl;
                        _addEventCombo(AG, "click", function (AM) {
                            var AL = "http://tmm.taobao.com/member/close_message_popup.do";
                            if (TB.environment.isDaily) {
                                AL = "http://tmm.daily.taobao.net/member/close_message_popup.do"
                            }
                            AL += "?callback=_closeMessageCallback&t=" + _kissy.now();
                            window._closeMessageCallback = function () {
                                _addClassName(AC, "hidden")
                            };
                            _kissy.getScript(AL)
                        });
                        if (_memberInfo.taskId) {
                            h("http://log.mmstat.com/messagebox.1.1?taskid=" + _memberInfo.taskId)
                        }
                        _removeClassName(AC, "hidden")
                    }
                    function AD(AL) {
                        var AM = "";
                        if (AL >= 0 && AL < 10000) {
                            AM = AL
                        } else {
                            if (AL == 10000) {
                                AM = "1万"
                            } else {
                                if (AL < 100000) {
                                    AM = parseInt(AL / 1000) / 10 + "万";
                                    if (AL % 1000 > 0) {
                                        AM += "+"
                                    }
                                } else {
                                    if (AL < 1000000) {
                                        AM = parseInt(AL / 10000) + "万";
                                        if (AL % 10000 > 0) {
                                            AM += "+"
                                        }
                                    } else {
                                        if (AL < 10000000) {
                                            AM = parseInt(AL / 1000000) + "百万";
                                            if (AL % 1000000 > 0) {
                                                AM += "+"
                                            }
                                        } else {
                                            if (AL < 100000000) {
                                                AM = parseInt(AL / 10000000) + "千万";
                                                if (AL % 10000000 > 0) {
                                                    AM += "+"
                                                }
                                            } else {
                                                AM = parseInt(AL / 100000000) + "亿";
                                                if (AL % 100000000 > 0) {
                                                    AM += "+"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        return AM
                    }
                });
                _tb_global._initMemberInfo()
            } else {
                _user_info_snippet = '欢迎来邻居网<a class="sn-login" href="' + _loginserver + '" target="_top">请登录</a><a class="sn-register" href="' + _registerserver + '" target="_top">免费注册</a><i class="sn-separator"></i>';
                _dom_id_login_info.innerHTML = _user_info_snippet;
                _tb_global._fireMemberInfoReadyFnList()
            }
        });
        _tb_global._initLoginStatus()
    }, _initLoginStatus: function () {
        var _tb_global = TB.Global;
        if (TB.environment.isApp && TB.environment.passCookie) {
            TB.userInfo.nick = _get_newly_created_div_innerHTML(unescape(_get_user_cookie_value("_nk_").replace(/\\u/g, "%u")));
            TB.userInfo.tracknick = _get_newly_created_div_innerHTML(unescape(_get_user_cookie_value("tracknick").replace(/\\u/g, "%u")));
            TB.userInfo.isLogin = !!((_get_user_cookie_value("login") == "true" || _get_user_cookie_value("_l_g_")) && TB.userInfo.nick);
            TB.userInfo.trackId = _get_user_cookie_value("t");
            _tb_global._fireLoginStatusReadyFnList()
        } else {
            //2013-03-09 basilwang use our own domain
            // after call query_cookie_info  , below is return
            // var userCookie={_nk_:'',uc1:'',mt:'',l:'',version:''};TB && TB.Global && TB.Global.run && TB.Global.run();
            var _login_url = "http://localhost:7525/Account/Home/query_cookie_info";
            /*
            var _login_url = "http://www.taobao.com/go/app/tmall/login-api.php";
            if (TB.environment.isDaily) {
            _login_url = "http://www.daily.taobao.net/go/app/tmall/login-api.php"
            }
            */
            _login_url += "?" + Math.random();
            _kissy.getScript(_login_url, function () {
                TB.userInfo.nick = _get_newly_created_div_innerHTML(unescape((userCookie._nk_).replace(/\\u/g, "%u")));
                //2013-02-16 basilwang TODO  temporiaily comment this which can cause problem . VERY IMPORTANT!!
                // TB.userInfo.tracknick = A(unescape((userCookie.tracknick).replace(/\\u/g, "%u")));
                //2013-03-09 basilwang maybe we can get user status from form authenticaton when calling query_cookie_info
                TB.userInfo.isLogin = !!(userCookie._l_g_ && TB.userInfo.nick);
                TB.userInfo.trackId = userCookie.t;
                _tb_global._fireLoginStatusReadyFnList()
            })
        }
    }, loginStatusReady: function (_fn_login_status_ready) {
        if (TB._isLoginStatusReady) {
            _fn_login_status_ready.call(window, TB.userInfo)
        } else {
            if (TB._loginStatusReadyFnList) {
                TB._loginStatusReadyFnList.push(_fn_login_status_ready)
            }
        }
    }, _fireLoginStatusReadyFnList: function () {
        if (TB._isLoginStatusReady) {
            return
        }
        TB._isLoginStatusReady = true;
        if (TB._loginStatusReadyFnList) {
            for (var index = 0; index < TB._loginStatusReadyFnList.length; index++) {
                TB._loginStatusReadyFnList[index].call(window, TB.userInfo)
            }
        }
    }, _initMemberInfo: function () {
        var _tb_global = TB.Global;
        var _member_url = "http://tmm.taobao.com/member/query_member_top.do";
        if (TB.environment.isDaily) {
            _member_url = "http://tmm.daily.taobao.net/member/query_member_top.do"
        }
        _member_url += "?callback=_initMemberInfoCallback&t=" + _kissy.now();
        window._initMemberInfoCallback = function (p) {
            TB.userInfo.memberInfo = p;
            _tb_global._fireMemberInfoReadyFnList()
        };
        _kissy.getScript(_member_url)
    }, memberInfoReady: function (_fn_member_info_ready) {
        if (TB._isMemberInfoReady) {
            _fn_member_info_ready.call(window, TB.userInfo)
        } else {
            if (TB._memberInfoReadyFnList) {
                TB._memberInfoReadyFnList.push(_fn_member_info_ready)
            }
        }
    }, _fireMemberInfoReadyFnList: function () {
        if (TB._isMemberInfoReady) {
            return
        }
        TB._isMemberInfoReady = true;
        if (TB._memberInfoReadyFnList) {
            for (var _index = 0; _index < TB._memberInfoReadyFnList.length; _index++) {
                TB._memberInfoReadyFnList[_index].call(window, TB.userInfo)
            }
        }
    }, _addMenu: function (_div_named_sn_menu) {
        if (!_div_named_sn_menu) {
            return
        }
        var _tb_global = this,
            _div_named_menu_hd = _findChildElementsByClassNameAndType("menu-hd", "*", _div_named_sn_menu)[0],
            _div_named_menu_bd = _findChildElementsByClassNameAndType("menu-bd", "*", _div_named_sn_menu)[0];
        if (!_div_named_menu_bd || !_div_named_menu_hd) {
            return
        }
        _div_named_menu_hd.tabIndex = 0;
        _tb_global._subMenus.push(_div_named_menu_bd);
        _div_named_menu_bd.setAttribute("role", "menu");
        _div_named_menu_bd.setAttribute("aria-hidden", "true");
        if (!_div_named_menu_bd.getAttribute("id")) {
            _div_named_menu_bd.setAttribute("id", _kissy.guid("menu-"))
        }
        _div_named_menu_hd.setAttribute("aria-haspopup", _div_named_menu_bd.getAttribute("id"));
        //2013-02-19 basilwang don't think we need this 右键弹出菜单，tab键导航，esc关闭当前菜单
        //_div_named_menu_hd.setAttribute("aria-label", "\u53f3\u952e\u5f39\u51fa\u83dc\u5355\uff0ctab\u952e\u5bfc\u822a\uff0cesc\u5173\u95ed\u5f53\u524d\u83dc\u5355");
        _div_named_menu_hd.setAttribute("aria-label", "");
        var _iframe_menu_bd = false;
        //2013-02-20 basilwang don't need this if other than ie6
        if (!_is_https && _is_ie6) {
            _iframe_menu_bd = _document.createElement("iframe");
            _iframe_menu_bd.src = "about: blank";
            _iframe_menu_bd.className = "menu-bd";
            _div_named_sn_menu.insertBefore(_iframe_menu_bd, _div_named_menu_bd)
        }
        _addEventCombo(_div_named_sn_menu, "mouseover", function (_event) {
            var t = _event.relatedTarget;
            while (t && t !== _div_named_sn_menu) {
                t = t.parentNode
            }
            if (t !== _div_named_sn_menu) {
                _kissy.each(_tb_global._subMenus, function (v) {
                    if (v !== _div_named_menu_bd) {
                        _removeClassName(v.parentNode, _event_constant_hover);
                        v.setAttribute("aria-hidden", "true")
                    }
                });
                _addClassName(_div_named_sn_menu, _event_constant_hover);
                _div_named_menu_bd.setAttribute("aria-hidden", "false");
                if (!_iframe_menu_bd) {
                    return
                }
                _iframe_menu_bd.style.height = parseInt(_div_named_menu_bd.offsetHeight) + 25 + "px";
                _iframe_menu_bd.style.width = parseInt(_div_named_menu_bd.offsetWidth) + 1 + "px"
            }
        });
        _addEventCombo(_div_named_sn_menu, "mouseout", function (_event) {
            var t = _event.relatedTarget;
            while (t && t !== _div_named_sn_menu) {
                t = t.parentNode
            }
            if (t !== _div_named_sn_menu) {
                _removeClassName(_div_named_sn_menu, _event_constant_hover);
                _div_named_menu_bd.setAttribute("aria-hidden", "true");
                _kissy.each(_div_named_menu_bd.getElementsByTagName("input"), function (v) {
                    if (v.getAttribute("type") !== "hidden") {
                        v.blur()
                    }
                })
            }
        });
        _addEventCombo(_div_named_sn_menu, "keydown", function (_event) {
            var _keycode = _event.keyCode;
            if (_keycode == 27 || _keycode == 37 || _keycode == 38) {
                _removeClassName(_div_named_sn_menu, _event_constant_hover);
                _div_named_menu_bd.setAttribute("aria-hidden", "true");
                _div_named_menu_hd.focus();
                _preventPropagation(_event)
            } else {
                if (_keycode == 39 || _keycode == 40) {
                    _addClassName(_div_named_sn_menu, _event_constant_hover);
                    _div_named_menu_bd.setAttribute("aria-hidden", "false");
                    _preventPropagation(_event)
                }
            }
        });
        var _timeout_function;
        _addEventCombo(_div_named_sn_menu, _is_ie_may_need_fix ? "focusin" : "focus", function () {
            if (_timeout_function) {
                clearTimeout(_timeout_function);
                _timeout_function = null
            }
        }, !_is_ie_may_need_fix);
        _addEventCombo(_div_named_sn_menu, _is_ie_may_need_fix ? "focusout" : "blur", function () {
            _timeout_function = setTimeout(function () {
                _removeClassName(_div_named_sn_menu, _event_constant_hover);
                _div_named_menu_bd.setAttribute("aria-hidden", "true")
            }, 100)
        }, !_is_ie_may_need_fix)
    }, run: function () {
    }, isLogin: function () {
        var i = _get_user_cookie_value("tracknick"), S = _get_user_cookie_value("_nk_") || i;
        return !!(_get_user_cookie_value("_l_g_") && S || _get_user_cookie_value("ck1") && i)
    }, getCartElem: function () {
        return _div_named_site_nav && _findChildElementsByClassNameAndType("cart", "li", _div_named_site_nav)[0]
    }, miniBag: function () {
        TB.Global.loginStatusReady(function (_userinfo) {
            var i = _kissy.unparam(_get_user_cookie_value("cq"));
            if (!_userinfo.isLogin) {
                i.ccp = "1";
                R("cq", _kissy.param(i), 365);
                TB.Global.initMiniBag()
            } else {
                if (_userinfo.isLogin && i && i.ccp === "1") {
                    window._syncCallback = function (q) {
                        TB.Global.initMiniBag();
                        i.ccp = "0";
                        R("cq", _kissy.param(i), 365);
                        if (q && _kissy.isPlainObject(q.sss) && q.sss.quantity && q.sss.token) {
                            new Image().src = "http://" + (TB.environment.isDaily ? "cart.daily.taobao.net" : "cart.taobao.com") + "/sss.htm?quantity=" + q.sss.quantity + "&tk=" + q.sss.token
                        }
                    };
                    var p = "http://" + (TB.environment.isDaily ? "cart.daily.tmall.net" : "cart.tmall.com") + "/cart/syncCart.htm?callback=_syncCallback&t=" + _kissy.now();
                    _kissy.getScript(p, { error: function () {
                        TB.Global.initMiniBag()
                    }, timeout: 5
                    })
                } else {
                    TB.Global.initMiniBag()
                }
            }
        })
    }, initMiniBag: function () {
        if (window.g_config.closeMiniBag || _if_we_can_try() || _tmall_config.commonJS.miniBag.off) {
            TB.Global.initMiniCart();
            return
        }
        var _corejs_url = "http://" + _own_domain_1 + "/apps/tmallbuy/razer/mini/core.js";
        _kissy.getScript(_corejs_url + "?t=" + _tmall_config.commonJS.miniBag.timestamp)
    }, initMiniCart: function () {
        if (window.g_config.closeMiniCart || _tmall_config.commonJS.miniCart.off || !TB.Global.getCartElem()) {
            return
        }
        var _trackid, _count_url = "http://" + (TB.environment.isDaily ? "count.config-vip.taobao.net:8888" : "count.tbcdn.cn") + "/counter3";
        TB.Global.memberInfoReady(function (_userinfo) {
            if (_userinfo.isLogin) {
                _trackid = (_userinfo.memberInfo.cookies && _userinfo.memberInfo.cookies.unb) ? _userinfo.memberInfo.cookies.unb.value : _userinfo.trackId
            } else {
                _trackid = _userinfo.trackId
            }
            _count_url += "?keys=TCART_234_" + _trackid + "_q&callback=_loadCartNumCallback&t=" + _kissy.now();
            window._loadCartNumCallback = function (r) {
                var _cart_num = r["TCART_234_" + _trackid + "_q"] || 0;
                TB.Global.setCartNum(_cart_num)
            };
            _kissy.getScript(_count_url)
        })
    }, setCartNum: function (_cart_num) {
        if (!_kissy.isNumber(_cart_num)) {
            return
        }
        /* 2013-03-09 basilwang for now _cart_elem is  li.cart mini-cart menu */
        var _cart_elem = TB.Global.getCartElem();
        if (!_cart_elem) {
            return
        }
        var _dom_a = _cart_elem.getElementsByTagName("a")[0], _snippet = '<span class="mini-cart-line"></span><s></s>购物车';
        if (_cart_num < 0) {
            _dom_a.innerHTML = _snippet;
            _removeClassName(_cart_elem, _str_class_mini_cart);
            return
        }
        _dom_a.innerHTML = _snippet + '<span class="mc-count' + (_cart_num < 10 ? " mc-pt3" : _no_class) + '">' + _cart_num + "</span>件";
        _dom_a.href = "http://" + (TB.environment.isDaily ? "cart.daily.tmall.net" : "cart.tmall.com") + "/cart/myCart.htm?from=btop";
        _addClassName(_cart_elem, _str_class_mini_cart);
        _addClassName(_cart_elem, "menu");
        _addClassName(_dom_a, "menu-hd");
        _dom_a.id = "mc-menu-hd"
    }, updateLoginInfo: function () {
        TB._isLoginStatusReady = false;
        TB._isMemberInfoReady = false;
        TB.Global.writeLoginInfo({ isApp: false })
    }, setUserMsg: function (q) {
        if (q.success && q.success === "true") {
            var p = _kissy.DOM;
            if (!p) {
                return
            }
            var s = p.get(".login-info", _div_named_site_nav), r = p.offset(s), i = p.get("#gb-msg-notice"), S;
            if (!i) {
                i = p.create('<div id="gb-msg-notice"><div class="gb-msg-inner gb-msg-info"><p class="gb-msg-content">' + q.result["messages"][0] + '</p><div class="gb-msg-icon gb-msg-close" title="\u5173\u95ed"></div></div><div class="gb-msg-icon gb-msg-tri"><div class="gb-msg-icon gb-msg-tri-inner"></div></div></div>');
                p.append(i, _div_named_site_nav.parentNode);
                p.offset(i, { left: r.left + 30, top: r.top + p.height(s) + 1 });
                _kissy.Event.on(i, "click", function (v) {
                    var u = v.target;
                    if (p.hasClass(u, "gb-msg-close")) {
                        p.hide(i)
                    }
                })
            } else {
                S = p.get(".gb-msg-content", i);
                p.html(S, q.result["messages"][0]);
                p.show(i)
            }
        }
    } 
    };
    TB.Cart = _kissy.merge({},
               {
                   domain: (document.domain.indexOf("taobao.com") > -1 || document.domain.indexOf("tmall.com") > -1) ? "taobao.com" : "localhost:7525",
                   API: "http://%domain%/check_cart_login.htm",
                   cache: {},
                   popup: null,
                   redirect: function (_element, _url) {
                       var _arguments = _kissy.makeArray(arguments);
                       var _callee = arguments.callee;
                       var _tb_cart = this;
                       //2013-02-21 basilwang if DOM or Event still have not been loaded, load them and call redirect again
                       if (!_kissy.DOM || !_kissy.Event) {
                           _kissy.use("core", function () {
                               _callee.apply(_tb_cart, _arguments)
                           });
                           return
                       }
                       /*
                       this._addStyleSheetOnce();
                       var _guid = _kissy.guid();
                       this.cache[_guid] = _kissy.makeArray(arguments);
                       _kissy.getScript(this.API.replace("%domain%", this.domain) + "?callback=TB.Cart.redirectCallback&guid=" + _guid,
                       {
                       timeout: 4,
                       error: function() {
                       location.href = _url
                       }
                       })
                       */
                       _kissy.use("tml/minilogin,tml/overlay/css/overlay.css", function (u, _minilogin) {
                           _minilogin && _minilogin.show(function () {
                               document.location.href = _url
                           }, { needRedirect: false, check: true })
                       })
                   }
                   //2013-03-09 basilwang we don't think we need this
                   /*
                   ,redirectCallback: function(p) {
                   var _guid = p.guid;
                   var _mycart_url = _kissy.trim(this.cache[_guid][1]);
                   if (!p.needLogin) {
                   location.href = _mycart_url;
                   return
                   }
                   if (!_guid) {
                   throw Error("[error] guid not found in callback data")
                   }
                   if (!this.popup) {
                   this.popup = this._initPopup()
                   }
                   this._initLoginIframe(_mycart_url)
                   },hidePopup: function(S) {
                   S && S.preventDefault && S.preventDefault();
                   _kissy.DOM.css(this.popup, "display", "none")
                   },showPopup: function() {
                   var _date = new Date();
                   _date.setDate(_date.getDate() - 1);
                   document.cookie = "cookie2=;expires=" + _date.toGMTString() + ";path=/;domain=.tmall.com";
                   this._centerPopup();
                   _kissy.DOM.css(this.popup, "display", "block")
                   },_centerPopup: function() {
                   var _top = (_kissy.DOM.viewportHeight() - parseInt(_kissy.DOM.css(this.popup, "height"), 10)) / 2;
                   _top = _top < 0 ? 0 : _top;
                   _kissy.DOM.css(this.popup, "top", _top)
                   },_addStyleSheetOnce: function() {
                   if (!this._stylesheetAdded) {
                   _kissy.DOM.addStyleSheet("#g-cartlogin{position:fixed;_position:absolute;border:1px solid #aaa;left:50%;top:120px;margin-left:-206px;width:412px;height:272px;z-index:90010;background:#fafafa;-moz-box-shadow:rgba(0,0,0,0.2) 3px 3px 3px;-webkit-box-shadow:3px 3px 3px rgba(0,0,0,0.2);filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=3,OffY=3,Color=#16000000,Positive=true);} #g_minicart_login_close{position:absolute;right:5px;top:5px;width:17px;height:17px;background:url(images/194-382.png) no-repeat -100px -69px;text-indent:-999em;overflow:hidden;}#g-cartlogin-close{cursor:pointer;position:absolute;right:5px;top:5px;width:17px;height:17px;line-height:0;overflow:hidden;background:url(images/146-77.png) no-repeat -132px 0;text-indent:-999em;}");
                   this._stylesheetAdded = true
                   }
                   },_initPopup: function() {
                   var _dom_div_id_g_cartlogin = _kissy.DOM.create('<div id="g-cartlogin"></div>');
                   _kissy.DOM.append(_dom_div_id_g_cartlogin, _kissy.DOM.get("body"));
                   return _dom_div_id_g_cartlogin
                   },_initLoginIframe: function(_mycart_url) {
                   var _url = "http://" + this.domain + "/member/login.jhtml?from=globalcart&style=mini&redirectURL=" + encodeURIComponent(_mycart_url) + "&full_redirect=true";
                   this.popup.innerHTML = '<iframe src="' + _url + '" width="410" height="270" frameborder="0" scrolling="0"></iframe><span title="关闭" id="g-cartlogin-close">关闭</span>';
                   _kissy.Event.on("#g-cartlogin-close", "click", this.hidePopup, this);
                   this.showPopup()
                   }
                   */
               });
    function _if_we_can_try() {
        var _blacklist = _tmall_config.commonJS.miniBag.blacklist;
        if (!_blacklist) {
            return false
        }
        for (var p = 0; p < _blacklist.length; p++) {
            if (document.location.href.indexOf(_blacklist[p]) > -1) {
                return true
            }
        }
        return _param_array.frm && _param_array.frm == "tmalltiyan"
    }
    /* 2013-03-09 basilwang  _get_user_cookie_value use regex  i.e.  document.cookie is
    "guid=e25096ef-0d12-4b1c-b730-55efb51a6e0b; V5ShopUserTemp=0aSdh2/ZTt2eFIdgRWWDSWQMI2cDtfGc9Bu66/QaPE4=; VerifyCodeArticle=5857; V5ShopLoginID=l8xdI386HMEGGWe2SEZhm0NGFIBI5hqXamBWHyYgl0E=; cq=ccp%3D1"
    _document.cookie.match("(?:^|;)\\s*cq=([^;]*)")
    match results are ["; cq=ccp%3D1", "ccp%3D1"]

    */
    function _get_user_cookie_value(_key) {
        if (_window.userCookie && !_kissy.isUndefined(_window.userCookie[_key])) {
            return _window.userCookie[_key]
        }
        if (_kissy.isUndefined(_user_info_bag[_key])) {
            var _match_results = _document.cookie.match("(?:^|;)\\s*" + _key + "=([^;]*)");
            _user_info_bag[_key] = (_match_results && _match_results[1]) ? decodeURIComponent(_match_results[1]) : _no_class
        }
        return _user_info_bag[_key]
    }
    function R(i, q, p, s, v, S) {
        var t = 24 * 60 * 60 * 1000;
        var u = String(encodeURIComponent(q)), r = p;
        if (typeof r === "number") {
            r = new Date();
            r.setTime(r.getTime() + p * t)
        }
        if (r instanceof Date) {
            u += "; expires=" + r.toUTCString()
        }
        if (_is_empty_string(s)) {
            u += "; domain=" + s
        }
        if (_is_empty_string(v)) {
            u += "; path=" + v
        }
        if (S) {
            u += "; secure"
        }
        document.cookie = i + "=" + u
    }
    function h(S) {
        if (!S) {
            return
        }
        new Image().src = S
    }
    function _is_empty_string(_str) {
        return _kissy.isString(_str) && _str !== ""
    }
    function _get_newly_created_div_innerHTML(_text) {
        var _dom_div = _document.createElement("div"), _dom_text_node = _document.createTextNode(_text);
        _dom_div.appendChild(_dom_text_node);
        return _dom_div.innerHTML
    }
    function _findChildElementsByClassNameAndType(_selected_class_name, _type_selector, _parent_element) {
        var _elems = _parent_element.getElementsByTagName(_type_selector || "*"), _filtered_elems = [], _index = 0, r = 0, _elems_length = _elems.length, _element, _class_name;
        _selected_class_name = _space_char + _selected_class_name + _space_char;
        for (; _index < _elems_length; ++_index) {
            _element = _elems[_index];
            _class_name = _element.className;
            if (_class_name && (_space_char + _class_name + _space_char).indexOf(_selected_class_name) > -1) {
                _filtered_elems[r++] = _element
            }
        }
        return _filtered_elems
    }
    function _findChildElementByClassName(_class_name, _element) {
        if (!_element) {
            _element = document
        }
        return _findChildElementsByClassNameAndType(_class_name, "*", _element)[0]
    }
    //2013-02-19 basilwang use _addEventCombo
    function _addEventCombo(_object, _event, _function, _is_capture) {
        if (!_object) {
            return
        }
        if (_object.addEventListener) {
            _object.addEventListener(_event, _function, !!_is_capture)
        } else {
            if (_object.attachEvent) {
                _object.attachEvent("on" + _event, _function)
            }
        }
    }
    //2013-02-19 basilwang use _removeEventCombo
    function _removeEventCombo(_object, _event, _function, _is_capture) {
        if (!_object) {
            return
        }
        if (_object.removeEventListener) {
            _object.removeEventListener(_event, _function, !!_is_capture)
        } else {
            if (_object.detachEvent) {
                _object.detachEvent("on" + _event, _function)
            }
        }
    }
    function _addClassName(_object, _class_name_to_be_added) {
        if (!_object) {
            return
        }
        var _class_name_to_be_matched = _space_char + _object.className + _space_char;
        if (_class_name_to_be_matched.indexOf(_space_char + _class_name_to_be_added + _space_char) === -1) {
            _class_name_to_be_matched += _class_name_to_be_added;
            _object.className = _kissy.trim(_class_name_to_be_matched)
        }
    }
    function _removeClassName(_object, _class_name_to_be_replaced) {
        if (!_object) {
            return
        }
        var _class_name_to_be_matched = _space_char + _object.className + _space_char;
        if (_class_name_to_be_matched.indexOf(_space_char + _class_name_to_be_replaced + _space_char) !== -1) {
            _class_name_to_be_matched = _class_name_to_be_matched.replace(_space_char + _class_name_to_be_replaced + _space_char, _space_char);
            _object.className = _kissy.trim(_class_name_to_be_matched)
        }
    }
    function M(S) {
        if (_window.userCookie && _window.userCookie.version == "2") {
            return _kissy.unparam(S, "&amp;")
        }
        return _kissy.unparam(S)
    }
    function _preventPropagation(_event) {
        if (_event.preventDefault) {
            _event.preventDefault()
        } else {
            _event.returnValue = false
        }
    }
    function _getOffsetTotal(_elem, _direction) {
        var i = 0;
        while (_elem != null) {
            i += _elem["offset" + (_direction ? "Left" : "Top")];
            _elem = _elem.offsetParent
        }
        return i
    }
});
TB.use("mod~global");
//2013-03-07 basilwang understood
//2013-02-19 basilwang still don't know what's this
(function() {
    var _str_tml = "tml", _str_kissy = "kissy";
    function _add_tml_prefix_namespace(_raw_requires_array) {
        //2013-03-04 basilwang copy and return new  array
        var index, _single_require, _copied_raw_requires_array = _raw_requires_array.concat([]);
        for (index = 0; _single_require = _copied_raw_requires_array[index]; index++) {
            _single_require = _single_require.split("/");
            if (_single_require[0] == _str_kissy) {
                _single_require.splice(0, 1);
                _copied_raw_requires_array[index] = _single_require.join("/")
            } else {
                if (_single_require[0] !== ".") {
                    _copied_raw_requires_array[index] = _str_tml + "/" + _single_require.join("/")
                }
            }
        }
        return _copied_raw_requires_array
    }
    window.TML = {add: function(_name, _fn, _config) {
        if (_config && _config.requires) {
            if (typeof _config.requires === "string") {
                _config.requires = [_config.requires]
            }
            _config.requires = _add_tml_prefix_namespace(_config.requires)
        }
        KISSY.add(_str_tml + "/" + _name, function() {
            var _argument_list_for_apply = [TML], _index;
            for (_index = 1; _index < arguments.length; _index++) {
                _argument_list_for_apply.push(arguments[_index])
            }
            return _fn.apply(this, _argument_list_for_apply)
        }, _config)
    },use: function(_requires, _fn) {
        _requires = _add_tml_prefix_namespace(_requires.split(","));
        KISSY.use(_requires.join(","), function() {
            var _argument_list_for_apply = [TML], _index;
            for (_index = 1; _index < arguments.length; _index++) {
                _argument_list_for_apply.push(arguments[_index])
            }
            return _fn.apply(this, _argument_list_for_apply)
        })
    },version: "1.0"};
    KISSY.config && KISSY.config({packages: [{name: "tml",tag: "20121030",path: "./apps/tmall/tml/1.0/",charset: "utf-8"}]})
})(); /*pub-1|2013-01-15 17:19:40*/
//2013-02-19 basilwang refactor variable name
(function(_kissy, _window) {
    var _config = _window.g_config = _window.g_config || {};
    var _host = location.host;
    var _is_test_env = _config.isTestEnv = ~_host.indexOf("tmall.net");
    var _url = _is_test_env ? "assets.daily.taobao.net" : "a.tbcdn.cn";
    _window.g_config.view = _kissy.DOM.viewportWidth() < 1210 ? 990 : 1190;
    _window.MFP = {};
    _kissy.mix(MFP, _kissy.EventTarget);
    if (_is_test_env && ~_host.indexOf("demo.")) {
        _url = "assets.demo.tmall.net";
        _config.isDemo = true
    }
    _config.assetsServer = _url;
    var _timestamp = _config.t || "20121130";
    var _version = _kissy.version == "1.30" ? "1.3.0" : "1.2.0";
    _kissy.config(
        { map:
           [
             [/(.+tmall\/.+)2012\/fp-min\.js(\?[^?]+)?$/, "$12012/??fp.js,mods/slide2.js,mods/category.js,mods/brand.js,mods/cate-fold.js,mods/floor.js,mods/direct-promo.js,mods/act.js,util/util.js,util/localstorage.js,act/winner/html.js,act/winner/winner.js$2.js"]
           , [/.+?(switchable|suggest|datalazyload|sizzle|template)-min\.js(\?[^?]+)?$/, "http://a.tbcdn.cn/s/kissy/" + _version + "/??switchable-min.js,suggest-min.js,datalazyload-min.js,template-min.js"],
             [/(.+tmall\/fp\/.+)-min.js(\?[^?]+)?$/, "$1.js$2"],
             [/(.+tmall\/fp\/.+)-min.css(\?[^?]+)?$/, "$1.css$2"]
           ],
                packages: [{ name: "2012", charset: "gbk", path: "./apps/tmall/fp/", tag: _timestamp}]
         }
         );
    //                packages: [{ name: "2012", charset: "gbk", path: "http://" + _url + "/apps/tmall/fp/", tag: _timestamp}]
    _window._poc = _window._poc || [];
    MFP.POC = {add: function(K) {
        _window._poc.push(["_trackCustomTime", "tt_" + K, +new Date])
    }};
    MFP.ATP = {log: function(L, M) {
        var K = "http://log.mmstat.com/tmallfp." + (L || "") + "." + (M || "") + "?cache=" + +new Date;
        new Image().src = K
    },ac: function(L, M) {
        var K = "http://ac.atpanel.com/tmallfp." + (L || "") + "." + (M || "") + "?cache=" + +new Date;
        new Image().src = K
    },aldAc: function(K) {
        new Image().src = K
    }};
    try {
        var F = document.domain.split(".");
        document.domain = F.slice(F.length - 2).join(".")
    } catch (E) {
    }
    if (typeof console === "undefined") {
        _window.console = {log: function() {
        }}
    }
})(KISSY, window);