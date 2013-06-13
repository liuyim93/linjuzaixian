KISSY.add("2012/fp", function(_kissy, _datalazyload, _slide2, _category, _brand, _catefold, _floor, _directpromo, _act,_brandcategory) {
    var _dom = _kissy.DOM,
        _event = _kissy.Event,
        _ua = _kissy.UA;
    var _window = window,
        _document = document,
        _g_config = _window.g_config;

    function FP() {
        this._init()
    }
    _kissy.augment(FP, {
        _init: function() {
            var _fp = this;
            _fp._initMain();
            _kissy.later(this._initExtra, 0, false, this);
            _kissy.ready(function() {
                !_g_config.closeCate && _ua.ie !== 6 && !_ua.mobile && new _catefold();
                _fp._loadBackTop();
                if (~location.href.indexOf("__tms__")) {
                    _kissy.later(function() {
                        _kissy.use("2012/tms/tms", function(_kissy_imp, _tms) {
                            new _tms()
                        })
                    }, 500)
                }
            })
        },
        _initMain: function() {

            new _slide2();
            new _brand();
            new _category("#J_Category", {
                viewId: "#J_SubCategory",
                subViews: ".j_SubView",
                triggers: ".j_MenuItem",
                bottomCl: ".j_BottomMenu",
                dataUrl: "http://" + location.host + "/category/home/all_cat_asyn"
            });

            ////2013-05-28 wanghaichuan get URL params
            (function ($) {
                $.getUrlParam = function (name) {
                    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
                    var r = window.location.search.substr(1).match(reg);
                    if (r != null) return unescape(r[2]); return null;
                }
            })(jQuery);

            //2013-05-28 wanghaichuan add _selectIP
            var _selectIP = $.getUrlParam('selectedSchool')
            //2013-06-14 basilwang 使用J_Category而不是之前的J_MallNavCon。原因是由于ie7下，对于同时使用了position=absolute的元素发生了层叠，设置z-index无效，后加载的元素在上面，而J_Category在图片幻灯之后加载，而之前使用的J_MallNavCon在图片幻灯之前加载   
            new _brandcategory("#J_Category", {
                viewId: "#J_BrandCategory",
                subViews: ".j_SubView",
                triggers: "li.slideDown",
                dataUrl: "http://" + location.host + "/category/home/brand_cat_asyn?selectIP=" + _selectIP
            });
            this._bindViewChange();
            MFP.POC.add("main")
        },
        _initExtra: function() {
            this._initHeader();
            var _lazyload = new _datalazyload({
                mod: "manual",
                diff: 50
            });
            //2013-02-19 basilwang don't use direct-promo
            //!_g_config.closeDirect && _directpromo.init([285, 333, 337, 315]);
            new _act();
            this._initQuickSearch();
            MFP.POC.add("extra")
        },
        _loadBackTop: function() {
            var _scroll_fn = function() {
                if (_dom.scrollTop(_document) > 400) {
                    _kissy.log("load backtop ...");
                    _kissy.getScript("http://a.tbcdn.cn/apps/tmall/mui/backtop/js/backtop.js");
                    _event.detach(_window, "scroll", _scroll_fn)
                }
            };
            _event.on(_window, "scroll", _scroll_fn)
        },
        _initHeader: function() {
            var _dom_id_mallSearch = _kissy.get("#mallSearch");
            var _dom_id_mq = _kissy.get("#mq");
            var _pre_dom_id_mq = _dom.prev(_dom_id_mq);
            var D = function() {
                setTimeout(function() {
                    if (_dom_id_mq.value == "") {
                        _pre_dom_id_mq.style.visibility = "visible"
                    }
                }, 100)
            };
            var U = function(V) {
                _kissy.log("init extra ...");
                _kissy.use("2012/mods/header", function(_kissy_imp, _header) {
                    _header.init()
                });
                _event.detach(_dom_id_mallSearch, "mouseenter", U);
                _event.detach(_dom_id_mq, "keydown", U)
            };
            D();
            _event.on(_dom_id_mallSearch, "mouseenter", U);
            _event.on(_dom_id_mq, "keydown", U)
        },
        _initQuickSearch: function() {
            _kissy.log("init quick search ...");
            var D = function() {
                var S = arguments[0] || _window.event,
                    E = S.keyCode;
                if (S.shiftKey && (E == 191 || E == 229)) {
                    _kissy.getScript("http://" + _g_config.assetsServer + "/apps/tmall/header/common/quick-search.css", function() {
                        _kissy.getScript("http://" + _g_config.assetsServer + "/apps/tmall/header/common/quick-search.js")
                    });
                    _event.detach(_document.body, "keydown", arguments.callee)
                }
            };
            _event.on(_document.body, "keydown", D)
        },
        _bindViewChange: function() {
            var D = _window.g_config.view;
            _event.on(_window, "resize", function() {
                var E = _dom.viewportWidth();
                var S = E < 1210 ? 990 : 1190;
                if (S !== D) {
                    MFP.fire("viewChange", {
                        viewprotWidth: E,
                        oldView: D,
                        newView: S
                    });
                    D = S
                }
            });
            _ua.ie < 9 && MFP.on("viewChange", function(S) {
                var _body = _document.body;
                _dom.removeClass(_body, "w" + S.oldView);
                _dom.addClass(_body, "w" + S.newView)
            })
        }
    });
    return FP
}, {
    requires: ["datalazyload", "2012/mods/slide2", "2012/mods/category", "2012/mods/brand", "2012/mods/cate-fold", "2012/mods/floor", "2012/mods/direct-promo", "2012/mods/act","2012/mods/brandcategory"]
}); 