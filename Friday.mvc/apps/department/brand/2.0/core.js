﻿var ASSETS_SERVER, DEV_EV, SERVER_URL;
(function (_window, _document, _kissy) {
    var G, F = "", I, J = location.host, B = _document.getElementsByTagName("script"), A = B[B.length - 1].src || "", C = _document.createElement("a");
    C.href = A;
    I = _kissy.unparam(C.search.substring(C.search.lastIndexOf("?") + 1, C.search.length));
    if (J.indexOf("local.") != -1) {
        DEV_EV = "local";
        G = "assets.local.tmall.net";
        SERVER_URL = "http://local.tmall.net"
    } else {
        if (J.indexOf("demo.") != -1) {
            DEV_EV = "demo";
            G = "assets.demo.tmall.net";
            SERVER_URL = "http://demo.tmall.net"
        } else {
            if (J.indexOf("daily.") != -1) {
                DEV_EV = "daily";
                G = "assets.daily.taobao.net";
                SERVER_URL = "http://brand.daily.tmall.net"
            } else {
                DEV_EV = "online";
                G = "a.tbcdn.cn";
                SERVER_URL = "http://brand.tmall.com"
            }
        }
    }
    ASSETS_SERVER = C.host || G;
    if ("t" in I) {
        F = I.t
    }
    _kissy.config(
          {  packages: [
                           { name: "2.0",
                             tag: "20110531" + F,
                             path: "http://" + ASSETS_SERVER + "/apps/department/brand/",
                             charset: "gbk"
                           }
          ],
          map: [
                 [/(.+\/brand\/.+)index-min.js(.*)$/, "$1??mods/dialog.js,mods/collect.js,mods/floor.js,mods/quick.js,index.js$2"],
                 [/(.+\/brand\/.+)(fav|cat)-min.js(.*)$/, "$1??mods/dialog.js,mods/collect.js,mods/item.js,$2.js$3"],
                 [/(.+\/brand\/.+)az-min.js(.*)$/, "$1??mods/dialog.js,mods/collect.js,az.js$2"],
                 [/(.+\/brand\/.+)-min.js(.*)$/, "$1.js$2"],
                 [/(.+\/kissy\/.+)(?:datalazyload|switchable)-min.js(.+)$/, "http://a.tbcdn.cn/s/kissy/1.2.0/??datalazyload-min.js,overlay-min.js,component-min.js,uibase-min.js,switchable-min.js$2"],
                 [/(.+\/kissy\/.+)(?:overlay|component|uibase)-min.js(.+)$/, "http://a.tbcdn.cn/s/kissy/1.2.0/??overlay-min.js,component-min.js,uibase-min.js$2"]
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
            _kissy.use("tml/share", function (L, K) {
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
                    alert("\u7531\u4e8e\u60a8\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u81ea\u52a8\u8bbe\u7f6e\u529f\u80fd\n\u8bf7\u6309\u5feb\u6377\u952e" + (L ? "Cmd" : "Ctrl") + "+D)\u624b\u5de5\u6536\u85cf")
                }
            }
        })
    })
})(window, document, KISSY);