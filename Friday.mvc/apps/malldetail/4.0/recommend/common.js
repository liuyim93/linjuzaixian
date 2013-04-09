KISSY.add("malldetail/recommend/common", function (E) {
    var G = window,
		K = document;
    var B = {};
    var C = 1;
    var A = {
        skuRight: {
            appId: "03039",
            loaded: false,
            params: {}
        },
        tabklk: {
            appId: "03013",
            loaded: false,
            params: {}
        },
        soldOut: {
            appId: "03037"
        }
    };
    var F = KISSY,
		L = F.DOM;
    var D = G.g_config;
    var I = D.itemId;
    var J = {
        createDom: function (Q, M, P) {
            var S = L.create('<div id="ald-' + Q + '" class="ald-' + Q + '"></div>');
            var N;
            P = P || {};
            var R = K.body;
            if (M == "body") {
                R.insertBefore(S, R.firstChild)
            } else {
                N = F.query(M);
                var O = P.insert || "append";
                F.each(N, function (T) {
                    L[O](S, T)
                })
            }
        }
    };
    var H = {
        skuRight: function (N, M) {
            J.createDom(N, M, {
                insert: "prepend"
            });
            A[N]["params"] = {
                itemID: I
            }
        },
        tabklk: function (P, N) {
            J.createDom(P, N);
            var M = E.mods.TabBar.curIndex();
            var O = {
                J_TabRecommends: 1,
                description: 2,
                J_Reviews: 3,
                shopMod: 4
            };
            A[P]["params"] = {
                key: I,
                pageType: D.isSpu ? "spu" : "item",
                f: "new",
                from: O[M]
            };
            if (E.mods.TabBar && E.mods.TabBar.curIndex() == "description") {
                E.sendAcAtpanel("tmalldetail.4.4")
            }
        },
        soldOut: function (N, M) {
            J.createDom(N, M);
            A[N]["params"] = {
                itemID: I
            }
        }
    };
    if (!G.ALD) {
        G.ALD = {
            queue: [],
            load: function (M, N) {
                if (C) {
                    C = 0
                }
                this.queue.push([M, N])
            }
        }
    }
    F.mix(G.ALD, {
        init: function () {
            var M = this;
            L = F.DOM;
            F.getScript(G.g_config.assetsHost + "/apps/tmall/ald/??util.js,use.js,effect.js,mods/base.js,juicer.js,ald.js?t=" + E.t(), function () {
                if (E.cfg("tag").isRightRecommend && !D.isSpu && !D.offlineShop && G.screen.width > 1024) {
                    M.install("skuRight", "body")
                }
            })
        },
        install: function (N, _selector, Q) {
            var P = A[N];
            if (P && !P.loaded) {
                H[N](N, _selector);
                var O = E.cfg("itemDO");
                F.mix(P.params, {
                    categoryId: O.categoryId,
                    sellerId: O.userId,
                    shopId: E.cfg("rstShopId"),
                    brandId: O.brandId,
                    refer: document.referrer
                }, false);
                G.ALD.load({
                    params: P.params,
                    render: "#ald-" + N,
                    appId: P.appId
                });
                P.loaded = true
            }
        },
        statu: function () {
            return
        }
    });
    return G.ALD
}); 