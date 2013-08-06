/**
* 鍏ㄥ眬妯″潡
* @desc 浠呭鐞嗛《閫氬拰涓€浜涘叏灞€鍔熻兘鐨勮浇鍏�
* @creater sorrycc@gmail.com(yunqian)
* @depends tb-core
*/

TB.add('mod~global', function () {

    var S = KISSY, DOM = S.DOM, Event = S.Event, UA = S.UA,
        doc = document, win = window, assetsHost, urlConfig,

    // 鍒濆鍖栧嚱鏁伴槦鍒�
        runItems = {

            /**
            * 椤堕€�
            */
            siteNav: function () {
                // 瀹炵幇 ie6 閲岀殑涓嬫媺鑿滃崟鍔熻兘
                if (UA.ie === 6) {
                    S.each(DOM.query('#site-nav div.menu'), function (el) {
                        if (el && DOM.get('div.menu-bd', el)) {
                            Event.on(el, 'mouseenter mouseleave', function () {
                                DOM.toggleClass(this.parentNode, 'hover');
                            });
                        }
                    });
                }

                // 鐩戝惉椤堕儴鎼滅储鎻愪氦
                Event.on(document.forms['topSearch'], 'submit', function () {
                    if (form['q'].value == '') { // 绌烘悳绱紝璺宠浆鍒版垜瑕佷拱
                        form.action = 'http://list.taobao.com/browse/cat-0.htm';
                    }
                });
            },

           

            /**
            * 涓诲姩鎼滅储鐩戞帶
            */
            searchMonitor: function () { }
        };


    TB.mods.Global = {
        /**
        * 鍒濆鍖� Global 妯″潡
        */
        init: function () {
            // get assets host
            var hostname = location.hostname.split('.'),
            //domain = hostname.slice(hostname.length - 2).join('.');
            domain = location.hostname;
            assetsHost = (domain.indexOf('taobao.com') > -1 || domain.indexOf('tmall.com') > -1)
                    ? 'a.tbcdn.cn' : 'assets.daily.taobao.net';
            urlConfig = S.unparam(location.search.substring(1));

            // run
            for (var k in runItems) {
                runItems[k]();
            }
        }
    };

    //////////////////////////////////////////////////////
    // Utilities

    function getCookie(name) {
        var m = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
        return (m && m[1]) ? decodeURIComponent(m[1]) : '';
    }

});
