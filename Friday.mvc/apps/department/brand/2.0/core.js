var ASSETS_SERVER, DEV_EV, SERVER_URL;
(function (_window, _document, _kissy) {
    var _host, _t_in_search_params = "", _search_params, _old_host = location.host, _script = _document.getElementsByTagName("script"), _script_src = _script[_script.length - 1].src || "", _dom_a = _document.createElement("a");
    _dom_a.href = _script_src;
    _search_params = _kissy.unparam(_dom_a.search.substring(_dom_a.search.lastIndexOf("?") + 1, _dom_a.search.length));
    /*
    if (_old_host.indexOf("local.") != -1) {
        DEV_EV = "local";
        _host = "assets.local.tmall.net";
        SERVER_URL = "http://local.tmall.net"
    } else {
        if (_old_host.indexOf("demo.") != -1) {
            DEV_EV = "demo";
            _host = "assets.demo.tmall.net";
            SERVER_URL = "http://demo.tmall.net"
        } else {
            if (_old_host.indexOf("daily.") != -1) {
                DEV_EV = "daily";
                _host = "assets.daily.taobao.net";
                SERVER_URL = "http://brand.daily.tmall.net"
            } else {
                DEV_EV = "online";
                _host = "a.tbcdn.cn";
                SERVER_URL = "http://brand.tmall.com"
            }
        }
    }
    ASSETS_SERVER = _dom_a.host || _host;
    */
    SERVER_URL=DEV_EV=ASSETS_SERVER="http://120.192.31.164:7525";

    if ("t" in _search_params) {
        _t_in_search_params = _search_params.t
    }
    _kissy.config(
          {  packages: [
                           { name: "2.0",
                             tag: "20110531" + _t_in_search_params,
                             path: "./apps/department/brand/",
                             charset: "gbk"
                           }
          ],
          map: [
                 [/(.+\/brand\/.+)index-min.js(.*)$/, "$1??mods/dialog.js,mods/collect.js,mods/floor.js,mods/quick.js,index.js$2"],
                 [/(.+\/brand\/.+)(fav|cat)-min.js(.*)$/, "$1??mods/dialog.js,mods/collect.js,mods/item.js,$2.js$3"],
                 [/(.+\/brand\/.+)az-min.js(.*)$/, "$1??mods/dialog.js,mods/collect.js,az.js$2"],
                 [/(.+\/brand\/.+)-min.js(.*)$/, "$1.js$2"],
                 [/(.+\y\/.+)(?:datalazyload|switchable)-min.js(.+)$/, "http://a.tbcdn.cn/s/kissy/1.2.0/??datalazyload-min.js,overlay-min.js,component-min.js,uibase-min.js,switchable-min.js$2"],
                 [/(.+\y\/.+)(?:overlay|component|uibase)-min.js(.+)$/, "http://a.tbcdn.cn/s/kissy/1.2.0/??overlay-min.js,component-min.js,uibase-min.js$2"]
               ]
          }
    );
    if (DEV_EV === "online" || typeof console === "undefined") {
        _window.console = { log: function () {
        } 
        }
    }
    _kissy.ready(function () {
        TMall && TMall.THeader && TMall.THeader.setNav("map");
        _kissy.get(".brandShare") && _kissy.getScript("http://a.tbcdn.cn/p/mall/2.0/js/zeroclipboard.js", function () {
            _kissy.use("tml", function (L, K) {
                new K({ container: ".brandShare", title: document.title, url: location.href, style: "mini", dir: "left" })
            })
        });
        _kissy.Event.on("#J_BrandAddFav", "click", function () {
            var K = location.href;
            var O = document.title;
            var L = navigator.appVersion.indexOf("Mac") > -1;
            var N = _window.external;
            var M = _window.sidebar;
            this.setAttribute("rel", "sidebar");
            if (N && typeof N.AddFavorite != "undefined") {
                N.AddFavorite(K, O)
            } else {
                if (M && M.addPanel) {
                    this.href = K;
                    this.title = O
                } else {
                    alert("由于您的浏览器不支持自动设置功能 请按快捷键" + (L ? "Cmd" : "Ctrl") + "+D)手工收藏")
                }
            }
        })
    })
})(window, document, KISSY);
