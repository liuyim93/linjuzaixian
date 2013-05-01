KISSY.add("malldetail/other/Extension", function (_kissy_D, _ajax, _malldetail_other_attributes, _malldetail_other_bread) {
    return {
        init: function E() {
            var _initExtensionApi = _kissy_D.cfg("initExtensionApi");
            var _data = _kissy_D.getUrlParams(["q", "cat_id"]);
            if (!_initExtensionApi || -1 != window.location.href.indexOf("rate_detail.htm")) {
                return
            }
            _ajax({
                url: _initExtensionApi,
                data: _data,
                dataType: "jsonp",
                jsonpCallback: "jsonpInitExtension",
                cache: true,
                success: function (_results) {
                    if (_results.success) {
                        _malldetail_other_bread.init(_results.breadCrumbDO);
                        _malldetail_other_attributes.init(_results.spuMaintainerDO);
                        if (_kissy_D.mods.SKU) {
                            _kissy_D.mods.SKU.Promotion.Mjs(_results.shopPromotionDO)
                        }
                    }
                }
            })
        }
    }
}, {
    requires: ["ajax", "malldetail/other/attributes", "malldetail/other/bread", ]
});