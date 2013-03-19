KISSY.add("malldetail/other/init", function (F, L, J, H, G, E, A, I, K, C, B, D) {
    return F.mods.footinit = {
        init: function () {
            var N = window;
            var M = N.g_config;
            //F.getScript("http://l.tbcdn.cn/apps/lz/hc.js?v=5");
            F.getScript("http://localhost:7525/apps/lz/hc.js?v=5");
            G.loadAssets("s/tb-tracer-min.js?t=20110628");
            if (!M.offlineShop) {
                TMall.Head.init()
            }
            A.init();
            B.init();
            I.init();
            setTimeout(function () {
                if (F.cfg("standardItem") && (!/spu_detail/.test(location.href)) && /standard=1/.test(location.search)) {
                    F.use("malldetail/other/relate", function (Q, P) {
                        P.init()
                    })
                }
                E.init();
                var O = F.getUrlParams("tmdTest");
                if (O) {
                    F.use("malldetail/other/test", function (Q, P) {
                        P.init(O)
                    })
                }
                K.init();
                D.init();
                C.init();
                F.use("anim", function () {
                    G.loadAssets("apps/tmall/mui/backtop/js/backtop.js", function () {
                        F.onBDclick(function (Q, P) {
                            if (P.id == "J_ScrollTopBtn") {
                                F.sendAtpanel("tmalldetail.13.5")
                            }
                        })
                    })
                });
                if (!M.offlineShop && (F.cfg("itemDO").categoryId == "1512" || M.D950)) {
                    F.use("malldetail/other/feedback", function (Q, P) {
                        P.init()
                    })
                }
                if (M.offlineShop || !F.cfg("valItemInfo")) {
                    M.closePoc = true
                } else {
                    if (!M.isSpu) {
                        if (H.ipad) {
                            N._poc.push(["_trackCustom", "tpl", "iPad"])
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