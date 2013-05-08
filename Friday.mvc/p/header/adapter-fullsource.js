/**
* @fileoverview toolbar.
* @author zilog, ziya<ziya@taobao.com>, shiran<shiran@taobao.com>
*/

; (function (S) {

    var 
    // 常用配置
        VERSION = '130307', // toolbar 发布版本号
        isDebug = -1 !== location.search.indexOf('ts-debug'),
        nick = S.Cookie.get('_nk_') || '',

        PATH = 'apps/stargate/tstart/release/' + (isDebug ? 'debug' : VERSION) + '/', // toolbar 路径
    // toolbar 插件
        PLUGINS = ['tstart'/*main*/, 'switch', 'xiami', 'u', 'wallet', 'trace', 'quanzi', 'news', 'nanny', 'deploy'],

        win = window, doc = document;

    // @TODO 取消全局变量
    win['_TOOLBAR_TIME_STAMP'] = { tstart: '20120406', tdog: '20110726', startTime: '2012/02/06', endTime: '2012/02/15' };

    /**
    * 检测是否是 daily.
    */
    function isDaily() {

        var reg = /daily/i;

        return reg.test(location.host);

    }

    /**
    * 获取配置项.
    */
    function getConfig() {

        return win['g_config'];

    }

    /**
    * 获取 toolbar 配置.
    */
    function getToolbarConfig() {

        var config = getConfig();

        if (!config) {
            return false;
        }

        return config['toolbar'];

    }

    /**
    * 获取 webww 配置.
    */
    function getWebwwConfig() {

        var config = getConfig();

        if (!config) {
            return false;
        }
        return config['webww'];
    }


    /**
    * 检测是否符合条件加载 Toolbar.
    */
    function isMatch() {

        var config = getConfig(),
            toolbar = getToolbarConfig(),
            topIframe = win.top || win.parent;

        if (topIframe && topIframe != win) {
            //判断是否是 iframe, iframe 内不加载
            return false;
        }

        if (
            !config
            || -1 !== location.search.indexOf('tclose')
            || 'undefined' !== typeof TStart/*防止重复加载*/
            || (S.isBoolean(toolbar) && !toolbar)
        ) {
            return false;
        }

        return true;

    }

    /**
    * 判断是否加载 webww.
    */
    function checkWebww() {

        var config = getConfig(),
            toolbar = getToolbarConfig(),
            webww = getWebwwConfig();

        if (
            (S.isBoolean(toolbar) && !toolbar)
            && (S.isBoolean(webww) && webww)
            && nick
        ) {
            return true;
        }

        return false;

    }

    /**
    * 配置 TStart.
    */
    function initTStart() {

        if ('undefined' === typeof TStart) {

            var isOnline = !isDaily();

            win['TStart'] = {

                isOnline: isOnline,

                isDebug: isDebug,

                cdnPath: 'http://' + (isOnline ? 'a.tbcdn.cn' : 'assets.daily.taobao.net') + '/' + PATH,

                version: VERSION

            };

        }

        return TStart;

    }

    /**
    * 加载脚本.
    */
    function loadScript(url) {

        if ('1.30' != S.version) {

            S.IO.getScript(url);

        } else {

            try {

                S.use('dom, event, ajax, anim, json', function (S, DOM, Event, IO, Anim, JSON) {

                    IO.getScript(url);

                });

            } catch (e) { };

        }

    }

    /**
    * 初始化 toolbar.
    */
    function initToolbar() {

        var toolbar = getToolbarConfig(),
            delay = toolbar ? (toolbar['delay'] || 1) : 1,
            T;

        //延迟加载
        setTimeout(function () {

            //初始化 TStart
            T = initTStart();

            if (!T._Loaded) {

                T._Loaded = true;

                loadScript(T.cdnPath + '??' + PLUGINS.join('.js,') + '.js');

            }

        }, (delay - 1) * 1000); // 默认延迟 1s, 加上用户定义

    }

    /**
    * 初始化 webww.
    */
    function initWebww() {

        //如果条件不成立 那么也不加载tstart
        if ('undefined' !== typeof Light && !Light.addonIsOK()) {

            // 覆写 PATH 和 PLUGINS
            PATH = 'apps/lifeas/js/tdog/';
            PLUGINS = ['tstart', 'deploy'];

            //初始化 webww 
            var T = initTStart();

            if (!T._Loaded) {

                T._Loaded = true;

                loadScript(T.cdnPath + '??' + PLUGINS.join('.js,') + '.js');

            }

        }

    }

    // 加载
    S.ready(function () {

        if (isMatch()) {
            //延时 1s 载入
            setTimeout(initToolbar, 1000);
        } else if (checkWebww()) {
            setTimeout(initWebww, 1000);
        }

    });

})(KISSY);
