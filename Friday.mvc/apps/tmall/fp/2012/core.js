/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-16
 * Time: 下午1:55
 * To change this template use File | Settings | File Templates.
 */

//2013-03-07 basilwang understood
//2013-02-19 basilwang still don't know what's this
(function() {
    var _str_tml = "tml", _str_kissy = "kissy";
    function _add_tml_prefix_namespace(_raw_requires_array) {
        //2013-03-04 basilwang copy and return new  array
        var index, _single_require, _copied_raw_requires_array = _raw_requires_array.concat([]);
        for (index = 0; _single_require = _copied_raw_requires_array[index]; index++) {
            _single_require = _single_require.split("/");
            if (_single_require[0] == _str_kissy) {
                _single_require.splice(0, 1);
                _copied_raw_requires_array[index] = _single_require.join("/")
            } else {
                if (_single_require[0] !== ".") {
                    _copied_raw_requires_array[index] = _str_tml + "/" + _single_require.join("/")
                }
            }
        }
        return _copied_raw_requires_array
    }
    window.TML = {add: function(_name, _fn, _config) {
        if (_config && _config.requires) {
            if (typeof _config.requires === "string") {
                _config.requires = [_config.requires]
            }
            _config.requires = _add_tml_prefix_namespace(_config.requires)
        }
        KISSY.add(_str_tml + "/" + _name, function() {
            var _argument_list_for_apply = [TML], _index;
            for (_index = 1; _index < arguments.length; _index++) {
                _argument_list_for_apply.push(arguments[_index])
            }
            return _fn.apply(this, _argument_list_for_apply)
        }, _config)
    },use: function(_requires, _fn) {
        _requires = _add_tml_prefix_namespace(_requires.split(","));
        KISSY.use(_requires.join(","), function() {
            var _argument_list_for_apply = [TML], _index;
            for (_index = 1; _index < arguments.length; _index++) {
                _argument_list_for_apply.push(arguments[_index])
            }
            return _fn.apply(this, _argument_list_for_apply)
        })
    },version: "1.0"};
    KISSY.config && KISSY.config({packages: [{name: "tml",tag: "20121030",path: "./apps/tmall/tml/1.0/",charset: "utf-8"}]})
})(); /*pub-1|2013-01-15 17:19:40*/
//2013-02-19 basilwang refactor variable name
(function(_kissy, _window) {
    var _config = _window.g_config = _window.g_config || {};
    var _host = location.host;
    var _is_test_env = _config.isTestEnv = ~_host.indexOf("tmall.net");
    var _url = _is_test_env ? "assets.daily.taobao.net" : "a.tbcdn.cn";
    _window.g_config.view = _kissy.DOM.viewportWidth() < 1210 ? 990 : 1190;
    _window.MFP = {};
    _kissy.mix(MFP, _kissy.EventTarget);
    if (_is_test_env && ~_host.indexOf("demo.")) {
        _url = "assets.demo.tmall.net";
        _config.isDemo = true
    }
    _config.assetsServer = _url;
    var _timestamp = _config.t || "20121130";
    var _version = _kissy.version == "1.30" ? "1.3.0" : "1.2.0";
    _kissy.config(
        { map:
           [
             [/(.+tmall\/.+)2012\/fp-min\.js(\?[^?]+)?$/, "$12012/??fp.js,mods/slide2.js,mods/category.js,mods/brand.js,mods/cate-fold.js,mods/floor.js,mods/direct-promo.js,mods/act.js,util/util.js,util/localstorage.js,act/winner/html.js,act/winner/winner.js$2.js"]
           , [/.+?(switchable|suggest|datalazyload|sizzle|template)-min\.js(\?[^?]+)?$/, "http://a.tbcdn.cn/s/kissy/" + _version + "/??switchable-min.js,suggest-min.js,datalazyload-min.js,template-min.js"],
             [/(.+tmall\/fp\/.+)-min.js(\?[^?]+)?$/, "$1.js$2"],
             [/(.+tmall\/fp\/.+)-min.css(\?[^?]+)?$/, "$1.css$2"]
           ],
                packages: [{ name: "2012", charset: "gbk", path: "./apps/tmall/fp/", tag: _timestamp}]
         }
         );
    //                packages: [{ name: "2012", charset: "gbk", path: "http://" + _url + "/apps/tmall/fp/", tag: _timestamp}]
    _window._poc = _window._poc || [];
    MFP.POC = {add: function(K) {
        _window._poc.push(["_trackCustomTime", "tt_" + K, +new Date])
    }};
    MFP.ATP = {log: function(L, M) {
        var K = "http://log.mmstat.com/tmallfp." + (L || "") + "." + (M || "") + "?cache=" + +new Date;
        new Image().src = K
    },ac: function(L, M) {
        var K = "http://ac.atpanel.com/tmallfp." + (L || "") + "." + (M || "") + "?cache=" + +new Date;
        new Image().src = K
    },aldAc: function(K) {
        new Image().src = K
    }};
    try {
        var F = document.domain.split(".");
        document.domain = F.slice(F.length - 2).join(".")
    } catch (E) {
    }
    if (typeof console === "undefined") {
        _window.console = {log: function() {
        }}
    }
})(KISSY, window);