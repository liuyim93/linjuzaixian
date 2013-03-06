KISSY.add("2012/fp", function(_kissy, _datalazyload, _slide2, _category, _brand, _catefold, _floor, _directpromo, _act) {
    var A = _kissy.DOM,
        Q = _kissy.Event,
        K = _kissy.UA;
    var J = window,
        O = document,
        F = J.g_config;

    function B() {
        this._init()
    }
    _kissy.augment(B, {
        _init: function() {
            var D = this;
            D._initMain();
            _kissy.later(this._initExtra, 0, false, this);
            _kissy.ready(function() {
                !F.closeCate && K.ie !== 6 && !K.mobile && new _catefold();
                D._loadBackTop();
                if (~location.href.indexOf("__tms__")) {
                    _kissy.later(function() {
                        _kissy.use("2012/tms/tms", function(E, T) {
                            new T()
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
                dataUrl: "http://" + location.host + "/go/rgn/mfp2012/all-cat-asyn.php"
            });
            this._bindViewChange();
            MFP.POC.add("main")
        },
        _initExtra: function() {
            this._initHeader();
            var D = new _datalazyload({
                mod: "manual",
                diff: 50
            });
            !F.closeDirect && _directpromo.init([285, 333, 337, 315]);
            new _act();
            this._initQuickSearch();
            MFP.POC.add("extra")
        },
        _loadBackTop: function() {
            var D = function() {
                if (A.scrollTop(O) > 400) {
                    _kissy.log("load backtop ...");
                    _kissy.getScript("http://a.tbcdn.cn/apps/tmall/mui/backtop/js/backtop.js");
                    Q.detach(J, "scroll", D)
                }
            };
            Q.on(J, "scroll", D)
        },
        _initHeader: function() {
            var S = _kissy.get("#mallSearch");
            var T = _kissy.get("#mq");
            var E = A.prev(T);
            var D = function() {
                setTimeout(function() {
                    if (T.value == "") {
                        E.style.visibility = "visible"
                    }
                }, 100)
            };
            var U = function(V) {
                _kissy.log("init extra ...");
                _kissy.use("2012/mods/header", function(W, X) {
                    X.init()
                });
                Q.detach(S, "mouseenter", U);
                Q.detach(T, "keydown", U)
            };
            D();
            Q.on(S, "mouseenter", U);
            Q.on(T, "keydown", U)
        },
        _initQuickSearch: function() {
            _kissy.log("init quick search ...");
            var D = function() {
                var S = arguments[0] || J.event,
                    E = S.keyCode;
                if (S.shiftKey && (E == 191 || E == 229)) {
                    _kissy.getScript("http://" + F.assetsServer + "/apps/tmall/header/common/quick-search.css", function() {
                        _kissy.getScript("http://" + F.assetsServer + "/apps/tmall/header/common/quick-search.js")
                    });
                    Q.detach(O.body, "keydown", arguments.callee)
                }
            };
            Q.on(O.body, "keydown", D)
        },
        _bindViewChange: function() {
            var D = J.g_config.view;
            Q.on(J, "resize", function() {
                var E = A.viewportWidth();
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
            K.ie < 9 && MFP.on("viewChange", function(S) {
                var E = O.body;
                A.removeClass(E, "w" + S.oldView);
                A.addClass(E, "w" + S.newView)
            })
        }
    });
    return B
}, {
    requires: ["datalazyload", "2012/mods/slide2", "2012/mods/category", "2012/mods/brand", "2012/mods/cate-fold", "2012/mods/floor", "2012/mods/direct-promo", "2012/mods/act"]
}); 