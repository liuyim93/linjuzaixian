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
            * WebWW (tdog)
            */
            tDog: function () {
                // 鍔犺浇 webww js 鐨勫紑鍏筹細
                // 锛坲rl 涓湁 tstart/tdog 鍙傛暟锛� 鎴� 锛堟湁 g_config 鍏ㄥ眬鍙橀噺锛屼笖 appId 鍊间笉涓� -1锛�
                if ((('g_config' in win) && ('appId' in win['g_config']) && win['g_config']['appId'] != -1)
                    || 'tstart' in urlConfig || 'tdog' in urlConfig) {
                    S.ready(function () {
                        var url = 'http://' + assetsHost + '/p/header/webww-min.js?t=20110629.js';
                        S.getScript(url);
                    });
                }
            },

            /**
            * 娣樺疂瀹為獙瀹�
            */
            tLabs: function () {
                if (!getCookie('l')) return;

                S.ready(function () {
                    var url = 'http://' + assetsHost + '/p/tlabs/??' +
                            'tlabs.js,base64.js,cookie.js,validator.js,loader.js,util.js,top.js?t=20101012.js';
                    if ('ks-local' in urlConfig) {
                        url = 'http://test.taobao.com/code/fed/2010/tlabs/combo.php?b=src&' +
                                'f=tlabs.js,base64.js,cookie.js,validator.js,loader.js,util.js,top.js';
                    }
                    S.getScript(url, function () {
                        if (typeof TLabs !== 'undefined') {
                            var IS_DAILY = !(document.domain.indexOf('taobao.com') > -1 || document.domain.indexOf('tmall.com') > -1);
                            TLabs.init(IS_DAILY ? { baseUrl: 'http://dev.labs.daily.taobao.net/l?b=/f/&f='} : {});
                        }
                    });
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
