KISSY.add("malldetail/shop/shop", function (B, E) {
    var C = KISSY;
    var A, D = {};
    D.onInit = E.createLoader(function (F) {
        C.use("wangpu/init", function (H, G) {
            G.init(A.wangpuConfig)
        })
    });
    D.init = function (F) {
        A = F;
        D.onInit(A && A.success)
    };
    return D
}, {
    requires: ["malldetail/common/util"]
}); 