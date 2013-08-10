KISSY.add("malldetail/tabbar/tabbarAttr", function (D, J) {
    var I = window;
    var N = D.DOM,
		L = D.Event;
    var E;
    var A = null;
    var H = {
        index: 0,
        id: "",
        name: ""
    };
    var B;
    var F = function () {
        var O = A.isDaily ? "13975762416" : I.g_config.itemId;
        D.Asyn.add("tabbarAttr", {
            //url: "http://ald.taobao.com/recommend.htm",
            //url: "http://www.linjuzaixian.com/Merchant/Detail/Tab_Recommend",
            data: {
                appId: "09001",
                auctionId: O,
                refer: document.referrer
            },
            jsonpCallback: "jsonpBrandTagsCloud",
            success: function (P) {
                P = P || [{}];
                P = P[0];
                D.fire("AttrLoadedOk", P);
                B = P;
                if (!P.list || !P.list.length) {
                    return
                }
                M(P);
                D.cfg("tag").isHasAttr = true;
                D.sendAcAtpanel("tmalldetail.10.2", {
                    apply: "detail",
                    cod: "9.1.1"
                })
            }
        }).run()
    };
    var K = function (O) {
        O.hasBrand = !!(O.brand || O.brandLogo);
        O.brandUrl = "http://list.tmall.com/search_shopitem.htm?user_id=" + A.itemDO.userId + "&stype=search&brand=" + O.brandId + "&cat_ids=" + A.itemDO.categoryId;
        return O
    };
    var G = function (P) {
        P = K(P);
        var O = '{{#if hasBrand}}<div class="brandLogo">{{#if brandLogo}}<a class="J_EbrandLogo" target="_blank" href="{{brandUrl}}"><img src="{{brandLogo}}_80x40.jpg"></a>{{/if}}{{#if brand}}<a class="brandTitle J_EbrandLogo" target="_blank" href="{{brandUrl}}">{{brand}}</a>{{/if}}</div>{{/if}}<div class="J_brandTags clearFix"><a href="#" class="brandTagsFir J_EbrandTj cur" data-valueId="">\u5168\u90e8<s></s></a>{{#each list as tag}}<a href="#" class="J_EbrandTj" data-valueId="{{tag.valueId}}">{{tag.valueName}}<s></s></a>{{/each}}</div>';
        D.each(P.list, function (Q) {
            D.each(D.query("#J_AttrList li"), function (S) {
                var R = D.trim(S.title);
                if (R == Q.valueName) {
                    N.remove(S)
                }
            })
        });
        return J(O).render(P)
    };
    var M = function (P) {
        var O = G(P);
        D.each(E, function (Q) {
            D.one(Q).html(O).show()
        });
        C()
    };
    var C = function () {
        var O = {
            Tj: function (U, T) {
                var S = D.mods.TabBar;
                var Q = D.query(".J_EbrandTj", "#J_TabRecommends");
                var V = H.index;
                var R = D.indexOf(T, N.query("a", N.parent(T)));
                U.preventDefault();
                if (S.curIndex() == "description") {
                    S.switchTo("J_TabRecommends")
                }
                S.scrollIntoView();
                if (V != R) {
                    N.removeClass(Q[V], "cur");
                    N.addClass(Q[R], "cur");
                    D.fire("AttrTagChange", {})
                }
                H.id = N.attr(T, "data-valueId");
                H.index = R;
                H.name = N.text(Q[R]);
                var P = N.get("a", N.get("#J_TabBar .selected"));
                if (P) {
                    if (P.herf == "#reviews") {
                        //D.sendAtpanel("tmalldetail.10.9")
                    } else {
                        //D.sendAtpanel("tmalldetail.10.15")
                    }
                }
            },
            Logo: function () {
                var P = N.get("a", N.get("#J_TabBar .selected"));
                if (P) {
                    if (P.herf == "#reviews") {
                        //D.sendAtpanel("tmalldetail.10.8")
                    } else {
                        //D.sendAtpanel("tmalldetail.10.14")
                    }
                }
            }
        };
        L.on(E, "click", function (S) {
            var R = S.target,
				T = R.className,
				P = T.match(/J_Ebrand(\S+)/);
            var Q = R.tagName.toLowerCase();
            if (P) {
                O[P[1]](S, R)
            }
        })
    };
    return D.mods.tabbarAttr = {
        init: function () {
            if (!I.g_config.D950 || !D.mods.SKU || !D.inBucket("50%")) {
                return
            }
            E = D.query(".J_BrandAttr", "#mainwrap");
            if (!E || !E.length) {
                return
            }
            A = D.cfg();
            var O = [10285022731, 13550763740, 14406974772, 16199779428, 18683364612, 15708576996, 12738735995, 4581558320, 8217086571, 16674140877, 14475965445, 4556452748, 14267833446, 14684194749];
            D.each(O, function (P) {
                if (P == I.g_config.itemId) {
                    D.use("malldetail/common/util", function (R, Q) {
                        Q.loadAssets("s/tb-tracer-min.js", function () {
                            I._tb_tracer && I._tb_tracer.init("20120820-1517-761")
                        })
                    })
                }
            });
            F()
        },
        curTag: function () {
            return H
        }
    }
}, {
    requires: ["template", "malldetail/tabbar/localData"]
}); 