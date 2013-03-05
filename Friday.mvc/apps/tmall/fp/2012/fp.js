/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-3
 * Time: 下午9:26
 * To change this template use File | Settings | File Templates.
 */
/*pub-1|2013-02-01 11:22:14*/
KISSY.add("2012/fp",function (_kissy, _slide2, _category) {
        var _dom = _kissy.DOM, _event = _kissy.Event, _browser = _kissy.UA;
        var _window = window, _document = document, _config = _window.g_config;
        function FP()
        { this._init() }
        _kissy.augment(FP,
            {
                _init: function () {
                    var _fp = this;
                    _fp._initMain();
                },
                _initMain: function () {
                    new _slide2();
                    //new P("#J_Category", { viewId: "#J_SubCategory", subViews: ".j_SubView", triggers: ".j_MenuItem", bottomCl: ".j_BottomMenu", dataUrl: "http://" + location.host + "/go/rgn/mfp2012/all-cat-asyn.php" });
                }

            }); return FP
    }, { requires: ["2012/mods/slide2","2012/mods/category"] });
