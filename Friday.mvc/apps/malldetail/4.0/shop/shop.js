KISSY.add("malldetail/shop/shop", function (_kissy_B, _malldetail_common_util) {
    var _kissy = KISSY;
    var _config, Malldetail_shop_shop = {};
    Malldetail_shop_shop.onInit = _malldetail_common_util.createLoader(function (F) {
        _kissy.use("wangpu/init", function (_kissy_H, _wangpu_init) {
            _wangpu_init.init(_config.wangpuConfig)
        })
    });
    Malldetail_shop_shop.init = function (_config_t) {
        _config = _config_t;
        Malldetail_shop_shop.onInit(_config && _config.success)
    };
    return Malldetail_shop_shop
}, {
    requires: ["malldetail/common/util"]
}); 