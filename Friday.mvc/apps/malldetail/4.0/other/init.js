KISSY.add("malldetail/other/init", function (_kissy_F, _dom, _event, _ua, _malldetail_common_util, _malldetail_other_focusTime, _malldetail_other_Extension, _malldetail_other_staticMods, _malldetail_other_ishare, _malldetail_recommend_common, _malldetail_tabbar_tabbarAttr, _malldetail_common_tbskip) {
    return _kissy_F.mods.footinit = {
        init: function () {
            var _window = window;
            var _g_config = _window.g_config;
            //F.getScript("http://l.tbcdn.cn/apps/lz/hc.js?v=5");
            //2013-08-22 basilwang remove lz/hc
            //_kissy_F.getScript("http://www.linjuzaixian.com/apps/lz/hc.js?v=5");
            //2013-08-22 basilwang remove tb-tracer
            //_malldetail_common_util.loadAssets("s/tb-tracer-min.js?t=20110628");
            if (!_g_config.offlineShop) {
                if (typeof (TMall) != "undefined")
                    TMall.Head.init()
            }
            _malldetail_other_Extension.init();
            _malldetail_tabbar_tabbarAttr.init();
            _malldetail_other_staticMods.init();
            setTimeout(function () {
                if (_kissy_F.cfg("standardItem") && (!/spu_detail/.test(location.href)) && /standard=1/.test(location.search)) {
                    _kissy_F.use("malldetail/other/relate", function (Q, P) {
                        P.init()
                    })
                }
                _malldetail_other_focusTime.init();
                var O = _kissy_F.getUrlParams("tmdTest");
                if (O) {
                    _kissy_F.use("malldetail/other/test", function (Q, P) {
                        P.init(O)
                    })
                }
                _malldetail_other_ishare.init();
                _malldetail_common_tbskip.init();
                _malldetail_recommend_common.init();
                _kissy_F.use("anim", function () {
                    _kissy_F.use("tmall/mui/backtop/backtopv2", function () {
                        _kissy_F.onBDclick(function (Q, P) {
                            if (P.id == "J_ScrollTopBtn") {
                                //_kissy_F.sendAtpanel("tmalldetail.13.5")
                            }
                        })
                    })
                });
                //2013-08-22 basilwang 暂时不需要这个
//                if (!_g_config.offlineShop && (_kissy_F.cfg("itemDO").categoryId == "1512" || _g_config.D950)) {
//                    _kissy_F.use("malldetail/other/feedback", function (Q, P) {
//                        P.init()
//                    })
//                }
                if (_g_config.offlineShop || !_kissy_F.cfg("valItemInfo")) {
                    _g_config.closePoc = true
                } else {
                    if (!_g_config.isSpu) {
                        if (_ua.ipad) {
                            _window._poc.push(["_trackCustom", "tpl", "iPad"])
                        }
                    }
                }
                TB.Global && TB.Global.init && TB.Global.init()
            }, 50)
        }
    }
}, {
    requires: ["dom", "event", "ua", "malldetail/common/util", "malldetail/other/focusTime", "malldetail/other/Extension", "malldetail/other/staticMods", "malldetail/other/ishare", "malldetail/recommend/common", "malldetail/tabbar/tabbarAttr", "malldetail/common/tbskip"]
}); 