/**
* @Description:
* @Author:     tiejun[at]taobao.com
* @Date:       11-11-22
* @Log:
*/

(function () {
    //namspaces
    //    window.TML = window.TML || {};

    //    //add mods to kissy
    //    var S = KISSY,i,
    //        BASE_PATH = location.host === 'fed.ued.taobao.net'?
    //            'http://fed.ued.taobao.net/tml/src/':'http://a.tbcdn.cn/p/mall/tml/',
    //        MODS = {
    //            'poptip':{},
    //            'thenfixed':{},
    //            'addfav':{}
    //        };
    //    if (S && S.add) {
    //        for(i in MODS){
    //            MODS[i].fullpath = MODS[i].fullpath || BASE_PATH + i +'.js';
    //            S.add('tml/'+i,MODS[i]);
    //        }
    //    }






    var TML_PREFIX = "tml",
        KISSY_PREFIX = "kissy";

    // fix require: kissy/mod to kissy native require
    function prefix(arr0) {
        var i, item, arr = arr0.concat([]);

        for (i = 0; item = arr[i]; i++) {
            item = item.split("/");
            if (item[0] == KISSY_PREFIX) {
                item.splice(0, 1);
                arr[i] = item.join("/");
            } else if (item[0] !== ".") {
                arr[i] = TML_PREFIX + "/" + item.join("/");
            }
        }
        return arr;
    }



    /**
    * @class TML
    * @static
    */

    window.TML = {
        /**
        * 娣诲姞tml妯″潡
        * @method add
        * @protected
        * @param name {String}
        * @param fn {Function}
        * @param [cfg] {Object}
        */
        add: function (name, fn, cfg) {

            if (cfg && cfg.requires) {
                if (typeof cfg.requires === "string") {
                    cfg.requires = [cfg.requires];
                }
                cfg.requires = prefix(cfg.requires);
            }

            KISSY.add(TML_PREFIX + "/" + name, function () {
                var a = [TML], i;

                for (i = 1; i < arguments.length; i++) {
                    a.push(arguments[i]);
                }

                return fn.apply(this, a);
            }, cfg);
        },
        /**
        * 浣跨敤tml妯″潡
        * @method use
        * @param name {String}
        * @param [fn] {Function}
        */
        use: function (name, fn) {

            name = prefix(name.split(","));

            KISSY.use(name.join(","), function () {
                var a = [TML], i;

                for (i = 1; i < arguments.length; i++) {
                    a.push(arguments[i]);
                }

                return fn.apply(this, a);
            });
        },
        version: "1.0"
    };


    KISSY.config && KISSY.config({
        packages: [
            {
                name: "tml",
                tag: "20130318",
                path: "http://a.tbcdn.cn/apps/tmall/tml/1.0/",
                charset: "utf-8"
            }
        ]
    });

})();
