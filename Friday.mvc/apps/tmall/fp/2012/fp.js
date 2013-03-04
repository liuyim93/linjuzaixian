/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-3
 * Time: 下午9:26
 * To change this template use File | Settings | File Templates.
 */
/*pub-1|2013-02-01 11:22:14*/
KISSY.add("2012/fp",function (H, C, P) {
        var A = H.DOM, Q = H.Event, K = H.UA;
        var J = window, O = document, F = J.g_config;
        function B()
        { this._init() }
        H.augment(B,
            {
                _init: function () {
                    var D = this;
                    D._initMain();
                },
                _initMain: function () {
                    new C();
                    //new P("#J_Category", { viewId: "#J_SubCategory", subViews: ".j_SubView", triggers: ".j_MenuItem", bottomCl: ".j_BottomMenu", dataUrl: "http://" + location.host + "/go/rgn/mfp2012/all-cat-asyn.php" });
                }

            }); return B
    }, { requires: ["2012/mods/slide2","2012/mods/category"] });
