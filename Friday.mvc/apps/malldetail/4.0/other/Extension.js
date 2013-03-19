KISSY.add("malldetail/other/Extension", function (D, A, C, B) {
    return {
        init: function E() {
            var F = D.cfg("initExtensionApi");
            var G = D.getUrlParams(["q", "cat_id"]);
            if (!F || -1 != window.location.href.indexOf("rate_detail.htm")) {
                return
            }
            A({
                url: F,
                data: G,
                dataType: "jsonp",
                jsonpCallback: "jsonpInitExtension",
                cache: true,
                success: function (H) {
                    if (H.success) {
                        B.init(H.breadCrumbDO);
                        C.init(H.spuMaintainerDO);
                        if (D.mods.SKU) {
                            D.mods.SKU.Promotion.Mjs(H.shopPromotionDO)
                        }
                    }
                }
            })
        }
    }
}, {
    requires: ["ajax", "malldetail/other/attributes", "malldetail/other/bread", ]
});