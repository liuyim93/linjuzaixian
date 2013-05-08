/**
* @fileoveview 此文件仅用于合并.
* @author nanzhi<nanzhienai@163.com>
*/
; (function () {
    if ('undefined' !== typeof Mpp) {
        return false;
    }
    /**
    * User: rentong
    * Date: 11-4-20
    * Time: 上午11:49
    * 前端的JS
    */
    Mpp = {
        debug: function (__debug) {
            this.DEBUG = __debug
        },
        add: function (__property, __element) {
            if (this.isFunction(__element)) {
                var __p = __element(this);
                if (__p) {
                    this[__element] = __p;
                }
            } else if (this.isPlainObject(__element)) {
                this[__property] = __element;
            }
        },
        isFunction: function (o) {
            //return typeof o === 'function';
            // Safari 下，typeof NodeList 也返回 function
            return Object.prototype.toString.call(o) === '[object Function]';
        },
        isPlainObject: function (o) {
            // Make sure that DOM nodes and window objects don't pass through.
            return o && Object.prototype.toString.call(o) === '[object Object]' && !o['nodeType'] && !o['setInterval'];
        },
        log: function (msg, cat, src) {
            if (this.DEBUG) {
                if (src) {
                    msg = src + ': ' + msg;
                }
                if (window['console'] !== undefined && console.log) {
                    console[cat && console[cat] ? cat : 'log'](msg);
                }
            }
        },
        DOMAIN: (function () {
            var host = location.hostname;
            if (host.indexOf("taobao.net") > -1) {
                host = 'taobao.net';
            } else if (host.indexOf("tmall.com") > -1) {
                host = 'tmall.com';
            } else if (host.indexOf("tmall.net") > -1) {
                host = 'tmall.net';
            } else {
                host = 'taobao.com';
            }
            return host;
        })()
    };
    Mpp.add('Config', function (Mpp) {
        //一个页面一个链接的应用
        var __isMultiConnectionApp = function () {
            if (window.g_config && window.g_config.appId) {
                var thisAppId = window.g_config.appId;
                return 1009 == thisAppId || 1011 == thisAppId;
            }
        },
            __notifyURL = function () {
                var host = location.hostname,
					isItem = -1 !== host.indexOf('item'),
					isTmall = -1 !== host.indexOf('tmall'),
					isDaily = -1 !== host.indexOf('daily');
                if (isDaily) {
                    if (__isMultiConnectionApp()) {
                        host = (isItem ? 'item.daily.taobao.net' : (isTmall ? 'detail.daily.tmall.net' : location.host)) + ':8080';
                    } else {
                        host = isTmall ? 'daily.tmall.net:8080' : 'daily.taobao.net:8080';
                    }
                } else {
                    if (__isMultiConnectionApp()) {
                        host = isItem ? 'item.taobao.com' : (isTmall ? 'detail.tmall.com' : location.host);
                    } else {
                        host = isTmall ? 'tmall.com' : 'taobao.com';
                    }
                }
                return 'http://mpp.' + host + '/connection.html?t=20110810&domain=' + document.domain;
            },
            __mppurl = __notifyURL();
        Mpp.Config = {
            //一个页面一个链接的应用
            isMultiConnectionApp: __isMultiConnectionApp,
            notifyURL: __mppurl
        }
    });


    Mpp.add('JSON', function (Mpp) {
        var JSON = {};

        function f(n) {
            // Format integers to have at least two digits.
            return n < 10 ? '0' + n : n;
        }

        if (typeof Date.prototype.toJSON !== 'function') {

            Date.prototype.toJSON = function (key) {

                return isFinite(this.valueOf()) ?
                    this.getUTCFullYear() + '-' +
                            f(this.getUTCMonth() + 1) + '-' +
                            f(this.getUTCDate()) + 'T' +
                            f(this.getUTCHours()) + ':' +
                            f(this.getUTCMinutes()) + ':' +
                            f(this.getUTCSeconds()) + 'Z' : null;
            };

            String.prototype.toJSON =
                Number.prototype.toJSON =
                        Boolean.prototype.toJSON = function (key) {
                            return this.valueOf();
                        };
        }

        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
            gap,
            indent,
            meta = {    // table of character substitutions
                '\b': '\\b',
                '\t': '\\t',
                '\n': '\\n',
                '\f': '\\f',
                '\r': '\\r',
                '"': '\\"',
                '\\': '\\\\'
            },
            rep;


        function quote(string) {

            // If the string contains no control characters, no quote characters, and no
            // backslash characters, then we can safely slap some quotes around it.
            // Otherwise we must also replace the offending characters with safe escape
            // sequences.

            escapable.lastIndex = 0;
            return escapable.test(string) ?
                '"' + string.replace(escapable, function (a) {
                    var c = meta[a];
                    return typeof c === 'string' ? c :
                            '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                }) + '"' :
                '"' + string + '"';
        }


        function str(key, holder) {

            // Produce a string from holder[key].

            var i,          // The loop counter.
                k,          // The member key.
                v,          // The member value.
                length,
                mind = gap,
                partial,
                value = holder[key];

            // If the value has a toJSON method, call it to obtain a replacement value.

            if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
                value = value.toJSON(key);
            }

            // If we were called with a replacer function, then call the replacer to
            // obtain a replacement value.

            if (typeof rep === 'function') {
                value = rep.call(holder, key, value);
            }

            // What happens next depends on the value's type.

            switch (typeof value) {
                case 'string':
                    return quote(value);

                case 'number':

                    // JSON numbers must be finite. Encode non-finite numbers as null.

                    return isFinite(value) ? String(value) : 'null';

                case 'boolean':
                case 'null':

                    // If the value is a boolean or null, convert it to a string. Note:
                    // typeof null does not produce 'null'. The case is included here in
                    // the remote chance that this gets fixed someday.

                    return String(value);

                    // If the type is 'object', we might be dealing with an object or an array or
                    // null.

                case 'object':

                    // Due to a specification blunder in ECMAScript, typeof null is 'object',
                    // so watch out for that case.

                    if (!value) {
                        return 'null';
                    }

                    // Make an array to hold the partial results of stringifying this object value.

                    gap += indent;
                    partial = [];

                    // Is the value an array?

                    if (Object.prototype.toString.apply(value) === '[object Array]') {

                        // The value is an array. Stringify every element. Use null as a placeholder
                        // for non-JSON values.

                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || 'null';
                        }

                        // Join all of the elements together, separated with commas, and wrap them in
                        // brackets.

                        v = partial.length === 0 ? '[]' :
                            gap ? '[\n' + gap +
                                    partial.join(',\n' + gap) + '\n' +
                                    mind + ']' :
                                    '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }

                    // If the replacer is an array, use it to select the members to be stringified.

                    if (rep && typeof rep === 'object') {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === 'string') {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    } else {

                        // Otherwise, iterate through all of the keys in the object.

                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }

                    // Join all of the member texts together, separated with commas,
                    // and wrap them in braces.

                    v = partial.length === 0 ? '{}' :
                        gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                                mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }

        // If the JSON object does not yet have a stringify method, give it one.

        if (typeof JSON.stringify !== 'function') {
            JSON.stringify = function (value, replacer, space) {

                // The stringify method takes a value and an optional replacer, and an optional
                // space parameter, and returns a JSON text. The replacer can be a function
                // that can replace values, or an array of strings that will select the keys.
                // A default replacer method can be provided. Use of the space parameter can
                // produce text that is more easily readable.

                var i;
                gap = '';
                indent = '';

                // If the space parameter is a number, make an indent string containing that
                // many spaces.

                if (typeof space === 'number') {
                    for (i = 0; i < space; i += 1) {
                        indent += ' ';
                    }

                    // If the space parameter is a string, it will be used as the indent string.

                } else if (typeof space === 'string') {
                    indent = space;
                }

                // If there is a replacer, it must be a function or an array.
                // Otherwise, throw an error.

                rep = replacer;
                if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                            typeof replacer.length !== 'number')) {
                    throw new Error('JSON.stringify');
                }

                // Make a fake root object containing our value under the key of ''.
                // Return the result of stringifying the value.

                return str('', { '': value });
            };
        }


        // If the JSON object does not yet have a parse method, give it one.

        if (typeof JSON.parse !== 'function') {
            JSON.parse = function (text, reviver) {

                // The parse method takes a text and an optional reviver function, and returns
                // a JavaScript value if the text is a valid JSON text.

                var j;

                function walk(holder, key) {

                    // The walk method is used to recursively walk the resulting structure so
                    // that modifications can be made.

                    var k, v, value = holder[key];
                    if (value && typeof value === 'object') {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v;
                                } else {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }


                // Parsing happens in four stages. In the first stage, we replace certain
                // Unicode characters with escape sequences. JavaScript handles many characters
                // incorrectly, either silently deleting them, or treating them as line endings.

                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return '\\u' +
                            ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }

                // In the second stage, we run the text against regular expressions that look
                // for non-JSON patterns. We are especially concerned with '()' and 'new'
                // because they can cause invocation, and '=' because it can cause mutation.
                // But just to be safe, we want to reject all unexpected forms.

                // We split the second stage into 4 regexp operations in order to work around
                // crippling inefficiencies in IE's and Safari's regexp engines. First we
                // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
                // replace all simple value tokens with ']' characters. Third, we delete all
                // open brackets that follow a colon or comma or that begin the text. Finally,
                // we look to see that the remaining characters are only whitespace or ']' or
                // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

                if (/^[\],:{}\s]*$/.
                    test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
                    replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
                    replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

                    // In the third stage we use the eval function to compile the text into a
                    // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
                    // in JavaScript: it can begin a block or an object literal. We wrap the text
                    // in parens to eliminate the ambiguity.

                    j = eval('(' + text + ')');

                    // In the optional fourth stage, we recursively walk the new structure, passing
                    // each name/value pair to a reviver function for possible transformation.

                    return typeof reviver === 'function' ?
                        walk({ '': j }, '') : j;
                }

                // If the text is not JSON parseable, then a SyntaxError is thrown.

                throw new SyntaxError('JSON.parse');
            };
        }
        Mpp.JSON = JSON;
    });
    Mpp.add('Cookie', function (Mpp) {
        Mpp.Cookie = {
            /**
            * 获取 cookie 值
            * @return {string} 如果 name 不存在，返回 undefined
            */
            get: function (name) {
                var ret, m;

                if (this.isNotEmptyString(name)) {
                    if ((m = document.cookie.match('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)'))) {
                        ret = m[1] ? decodeURIComponent(m[1]) : '';
                    }
                }
                return ret;
            },
            set: function (name, val, expires, domain, path, secure) {
                var text = encodeURIComponent(val), date = expires;

                // 从当前时间开始，多少天后过期
                if (typeof date === 'number') {
                    date = new Date();
                    date.setTime(date.getTime() + expires * 86400000);
                }
                // expiration date
                if (date instanceof Date) {
                    text += '; expires=' + date.toUTCString();
                }

                // domain
                if (this.isNotEmptyString(domain)) {
                    text += '; domain=' + domain;
                }

                // path
                if (this.isNotEmptyString(path)) {
                    text += '; path=' + path;
                }

                // secure
                if (secure) {
                    text += '; secure';
                }

                document.cookie = name + '=' + text;
            },

            remove: function (name) {
                // 立刻过期
                this.set(name, '', 0);
            },
            isNotEmptyString: function (val) {
                return typeof val === 'string' && val !== '';
            }
        };
    });

    Mpp.add('mpp-ua', function (Mpp) {

        var ua = navigator.userAgent,
            m,
            o = {
                webkit: 0,
                chrome: 0,
                safari: 0,
                gecko: 0,
                firefox: 0,
                ie: 0,
                opera: 0,
                mobile: '',
                safe: 0,
                sogo: 0,
                tt: 0,
                maxthon: 0
            },
            numberify = function (s) {
                var c = 0;
                // convert '1.2.3.4' to 1.234
                return parseFloat(s.replace(/\./g, function () {
                    return (c++ === 0) ? '.' : '';
                }));
            };

        // WebKit
        if ((m = ua.match(/AppleWebKit\/([\d.]*)/)) && m[1]) {
            o.webkit = numberify(m[1]);

            // Chrome
            if ((m = ua.match(/Chrome\/([\d.]*)/)) && m[1]) {
                o.chrome = numberify(m[1]);
            }
            // Safari
            else if ((m = ua.match(/\/([\d.]*) Safari/)) && m[1]) {
                o.safari = numberify(m[1]);
            }

            // Apple Mobile
            if (/ Mobile\//.test(ua)) {
                o.mobile = 'Apple'; // iPad, iPhone or iPod Touch
            }
            // Other WebKit Mobile Browsers
            else if ((m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
                o.mobile = m[0]; // Nokia N-series, Android, webOS, ex: NokiaN95
            }
        }
        // NOT WebKit
        else {
            // Opera
            if ((m = ua.match(/Opera\/.* Version\/([\d.]*)/)) && m[1]) {
                o.opera = numberify(m[1]);

                // Opera Mini
                if ((ua.match(/Opera Mini[^;]*/))) {
                    o.mobile = m[0]; // ex: Opera Mini/2.0.4509/1316
                }

                // NOT WebKit or Opera
            } else {
                // MSIE
                if ((m = ua.match(/MSIE\s([^;]*)/)) && m[1]) {
                    o.ie = numberify(m[1]);
                    //360safe
                    if ((m = ua.match(/360SE/))) {
                        o.safe = "360SE";
                    }
                    //sogo
                    if ((m = ua.match(/SE\s([^;]*)/)) && m[1]) {
                        o.sogo = numberify(m[1]);
                    }
                    //tt
                    if ((m = ua.match(/TencentTraveler\s([^;]*)/)) && m[1]) {
                        o.tt = numberify(m[1]);
                    }
                    //maxthon
                    try {
                        if (window.external && window.external.max_version) {
                            o.maxthon = numberify(window.external.max_version).toFixed(1);
                        }
                    } catch (e) {
                    }

                    // NOT WebKit, Opera or IE
                } else {
                    // Gecko
                    if ((m = ua.match(/Gecko/))) {
                        o.gecko = 1; // Gecko detected, look for revision
                        if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                            o.gecko = numberify(m[1]);
                        }

                        // Firefox
                        if ((m = ua.match(/Firefox\/([\d.]*)/)) && m[1]) {
                            o.firefox = numberify(m[1]);
                        }
                    }
                }
            }
        }

        Mpp.UA = o;
    });
    /**
    *Cookie中存放1消息状态2消息类型，长链接时间戳，本地时间戳
    * t=1&m=1#4#4$1#4#4&l=1&h=2
    */
    Mpp.add('Data', function (Mpp) {
        var cookieName = 'mpp', Cookie = Mpp.Cookie, __CREATE_CONNECTION_STATUS = -1, localHeart = 0;
        Mpp.Data = {
            CREATE_CONNECTION_STATUS: __CREATE_CONNECTION_STATUS, // 正在建立长边接的状态
            NOTIFY_STATUS: {
                LOGOUT: 0, //退出
                TIMEOUT: 1,   //超时没有新消息。
                MESSAGE: 2,   //有新消息。
                CLOSED: 3    //存在多个链接关闭掉。
            },
            init: function () {
                Cookie.set(cookieName, 't=1&m=&h=&l=' + new Date().getTime(), null, Mpp.DOMAIN, '/');
            },
            /**
            *type:1
            * message:[{1,2,4}]
            * heartTime:1324132412412343
            * localTime:1324132412341324
            */
            setData: function (d) {
                var v = '';
                v = 't=' + d.t + '&m=' + (d.m || '') + '&h=' + (d.h || 0) + '&l=' + (d.l || 0);
                Cookie.set('mpp', v, null, Mpp.DOMAIN, '/');
            },
            getData: function () {
                var v = Cookie.get(cookieName), result = { get: this.__get };
                if (v) {
                    var param = v.split("&");
                    for (var i = 0; i < param.length; i++) {
                        var one = param[i].split("=");
                        result[one[0]] = one[1];
                    }
                }
                return result;
            },
            setHeart: function (heart) {
                var v = '', d = this.getData();
                v = 't=' + d.t + '&m=' + d.m + '&h=' + heart + '&l=' + d.l;
                Cookie.set(cookieName, v, null, Mpp.DOMAIN, '/');
            },
            isCreatingConnection: function (heart) {
                return heart == __CREATE_CONNECTION_STATUS;
            },
            clear: function () {
                Cookie.set(cookieName, 't=0&m=&h=0&l=0', null, Mpp.DOMAIN, '/');
            },
            getUserNick: function () {
                var nickName = Cookie.get('_nk_') || '';
                return unescape(nickName.replace(/\\u/g, '%u'));
            },
            setLocalHeart: function () {
                var d = this.getData();
                d.l = localHeart = new Date().getTime();
                this.setData(d);
            },
            isNotNewFocused: function () {
                var d = this.getData();
                return localHeart == d.l;
            },
            __get: function () {
                if (this.__m) {
                    return this.__m;
                } else {
                    var result = [], v;
                    if (this.m) {
                        v = this.m.split('$');
                        for (var i = 0; i < v.length; i++) {
                            var param = v[i].split('#');
                            result.push({ t1: parseInt(param[0]), t2: parseInt(param[1]) });
                        }
                        this.__m = result;
                    }
                    return result;
                }
            }
        }
    });
    /**
    * User: rentong
    * Date: 11-4-20
    * Time: 下午2:17
    * 注册回调和回调
    */
    Mpp.add('Notify', function (Mpp) {
        var callbacks = {};
        Mpp.Notify = {
            /**
            *
            * @param c
            * c:{
            * appId:number,   应用ID号。
            * type:number,    消息类型。
            * callback:function   回调函数。
            * }
            */
            register: function (c) {
                if (!callbacks[c.appId]) {
                    callbacks[c.appId] = {};
                }
                if (!callbacks[c.appId][c.type]) {
                    callbacks[c.appId][c.type] = [];
                }
                callbacks[c.appId][c.type].push(c.callback);
            },
            __call: function (appId, type) {
                if (callbacks[appId] && callbacks[appId][type]) {
                    for (var i = 0; i < callbacks[appId][type].length; i++) {
                        var c = callbacks[appId][type][i];
                        setTimeout(c, 1);   //回调处理。
                    }
                }
            },
            /**
            * 带有参数的加调。
            * @param appId
            * @param type
            * @param data
            */
            notify: function (appId, type, data) {
                for (var i = 0; i < callbacks[appId][type].length; i++) {
                    var c = callbacks[appId][type][i];
                    setTimeout(function () {
                        c(data);
                    }, 1);
                }
            }
        };
    }); /**
 * User: rentong
 * Date: 11-4-20
 * Time: 下午2:32
 */
    Mpp.add('Heart', function (Mpp) {
        var Data = Mpp.Data, Config = Mpp.Config,
            LONG_REQUEST_HEART_TIMEOUT = 6000, isLongConnectionRuning = false, __connection = null, checkConnectionTimes = 0, errorRetryConnection = 18000, heartErrorTimes = 0
            , WAIT_CREATE_LONG_CONNECTION_TIMES = 3;
        Mpp.Heart = {
            start: function () {
                var __self = this;
                isLongConnectionRuning = true;
                heartErrorTimes = 0;

                __self.__checkHeart();

                Mpp.log('登录完成，开始长连接.');
            },
            restart: function () {
                var __self = this;
                isLongConnectionRuning = true;
                heartErrorTimes = 0;

                __self.__checkHeart();
            },
            stop: function () {
                var __self = this;
                if (isLongConnectionRuning) {
                    Mpp.log('停止外部长链接检查。');
                    if (__self.heartTimeoutTimer) {
                        clearTimeout(__self.heartTimeoutTimer);
                    }
                    isLongConnectionRuning = false;
                    heartErrorTimes = 0;
                }
            },
            /**
            * 建立远程连接。用Iframe实现。。。JSONP方式会一直显示加载中。。。
            */
            __createConnection: function () {
                try {
                    Data.setHeart(Data.CREATE_CONNECTION_STATUS);
                    __connection = document.createElement('iframe');
                    __connection.width = 0;
                    __connection.height = 0;
                    __connection.style.display = 'none';
                    __connection.src = Config.notifyURL;
                    var body = document.getElementsByTagName('body')[0];
                    body.appendChild(__connection, body.lastChild);
                } catch (e) {
                    Mpp.log('远程连接异常了……' + e);
                }
            },
            /**
            * 检查远程连接的心跳有没有超时。
            */
            __checkHeart: function () {
                var __self = this;
                if (__self.heartTimeoutTimer) {
                    clearTimeout(__self.heartTimeoutTimer);
                }
                if (isLongConnectionRuning && __self.__isLogin()) {
                    __self.heartTimeoutTimer = setTimeout(function () {
                        var heart = Data.getData();
                        Mpp.log('检查长链接，重新开始:' + (new Date().getTime() - heart.h > LONG_REQUEST_HEART_TIMEOUT) + ',' + (new Date().getTime() - heart.h)
                            + ',' + new Date().getTime() + ',' + heart.h);
                        if (heart.h == Data.CREATE_CONNECTION_STATUS || (new Date().getTime() - heart.h > LONG_REQUEST_HEART_TIMEOUT
                            && heart.h !== Data.CREATE_CONNECTION_STATUS && heart.t !== Data.NOTIFY_STATUS.LOGOUT)) {
                            if (heartErrorTimes < WAIT_CREATE_LONG_CONNECTION_TIMES) {
                                heartErrorTimes++;
                                if (__connection) {
                                    Mpp.log('长链接的frame已经存在。');
                                    __connection.src = Config.notifyURL;
                                } else {
                                    __self.__createConnection();
                                    Mpp.log('长链接的frame不已经存在。');
                                }
                                heart.h = new Date().getTime();
                                Data.setData(heart);
                                __self.__checkConnection();
                            } else {
                                __self.stop();
                                Mpp.Control.stop();
                            }
                        } else {
                            heartErrorTimes = 0;
                        }
                        __self.__checkHeart(); //链接建立后开始心跳检查。
                    }, LONG_REQUEST_HEART_TIMEOUT);
                }
            },
            /**
            * 检查是否连接真的建立起来了。
            */
            __checkConnection: function () {
                var __self = this;
                if (checkConnectionTimes++ < 4) {
                    setTimeout(function () {
                        if (Data.isCreatingConnection(Data.getData().h)) {//链接没有建立起来
                            if (__connection) {
                                Mpp.log('长链接的frame已经存在。');
                                __connection.src = Config.notifyURL;
                            } else {
                                __self.__createConnection();
                                Mpp.log('长链接的frame不已经存在。');
                            }
                        }
                    }, errorRetryConnection);
                }
            },
            __isLogin: function () {
                return !!Data.getUserNick();
            }
        };
    });
    /**
    * Created by IntelliJ IDEA.
    * User: rentong
    * Date: 11-4-20
    * Time: 上午11:51
    * To change this template use File | Settings | File Templates.
    */
    Mpp.add('Control', function (Mpp) {
        var Data = Mpp.Data, Heart = Mpp.Heart, Notify = Mpp.Notify,
            isFocused = false, isRunning = false, GET_TIME = 1500;

        Mpp.Control = {
            init: function () {
                this.__bindEvent();
            },
            start: function () {
                var __self = this;
                if (__self.__isLogin()) {
                    var d = Data.getData();
                    if (d.t) {
                        __self.readMessage();
                    } else {
                        Data.init();
                    }
                    isRunning = true;
                    isFocused = true;
                    Heart.start();
                    __self.fire();
                } else {
                    Data.clear();
                }
            },
            restart: function () {
                var __self = this;
                isRunning = true;
                isFocused = true;
                __self.fire();
            },
            stop: function () {
                isRunning = false;
                if (this.eventTimer) {
                    clearTimeout(this.eventTimer);
                }
                Heart.stop();
                Data.clear();
            },
            fire: function () {
                var __self = this;
                if (__self.eventTimer) {
                    clearTimeout(__self.eventTimer);
                }

                __self.eventTimer = setTimeout(function () {
                    if (isRunning && (isFocused || Data.isNotNewFocused())) {
                        __self.readMessage();
                    }
                }, GET_TIME);
            },
            readMessage: function () {
                var d = Data.getData(), type = parseInt(d.t), messages = d.get(), __self = Mpp.Control;
                d.m = '', d.t = Data.NOTIFY_STATUS.TIMEOUT;
                Data.setData(d);
                Mpp.log('local get data:' + type);
                switch (type) {
                    case Data.NOTIFY_STATUS.LOGOUT:
                        Mpp.log('logout mpp..................');
                        __self.stop();
                        Data.clear();
                        break;

                    case Data.NOTIFY_STATUS.MESSAGE:
                        for (var i = 0; i < messages.length; i++) {
                            Notify.__call(messages[i].t1, messages[i].t2);
                        }
                        __self.fire();
                        break;

                    default:
                        __self.fire();

                }
            },
            /**
            * 绑定事件到窗口
            */
            __bindEvent: function () {
                var __self = this;
                var __focus = function () {
                    Mpp.log('当前窗口获得焦点');
                    isFocused = true;
                    if (__self.__isLogin()) {
                        var d = Data.getData();
                        if (d.t == Data.NOTIFY_STATUS.LOGOUT) {
                            Data.init();
                        } else if (!Data.isNotNewFocused()) {
                            Data.setLocalHeart();
                        }
                        __self.restart();
                        Heart.restart();
                    } else {
                        __self.stop();
                    }
                };
                var __blur = function () {
                    Mpp.log('当前窗口失去焦点。');
                    isFocused = false;
                };

                if (Mpp.UA.ie) {
                    window.onfocus = __focus;
                    window.onblur = __blur;
                } else {
                    addEventListener("focus", __focus, false);
                    addEventListener("blur", __blur, false);
                }
            },
            __isLogin: function () {
                return !!Data.getUserNick();
            }
        };
    });
    Mpp.add('App', function (Mpp) {
        var Notify = Mpp.Notify, connection;
        Mpp.App = {
            init: function () {
                var gconfig = window['g_config'],
				host = location.hostname,
				detailReg = /detail|item/,
				appid;

                if (!gconfig) {
                    return false;
                }

                appid = gconfig['appId'];

                if (!appid) {
                    return false;
                }

                if ((1009 == appid && !detailReg.test(host)) || (1011 == appid && Mpp.UA.ie !== 6)) {
                    document.domain = host;
                }

                this.createConnection();
            },

            /**
            * 建立远程连接。用Iframe实现。。。JSONP方式会一直显示加载中。。。
            */
            createConnection: function () {
                try {
                    connection = document.createElement('iframe');
                    connection.width = 0;
                    connection.height = 0;
                    connection.style.display = 'none';
                    connection.src = Mpp.Config.notifyURL;
                    var body = document.getElementsByTagName('body')[0];
                    body.appendChild(connection, body.lastChild);
                } catch (e) {
                    Mpp.log('远程连接异常了……' + e);
                }
            },
            notify: function (appId, type, data) {
                Notify.notify(appId, type, data);
            },
            getAppParameter: function () {
                if (Mpp.Config.isMultiConnectionApp()) {
                    return {
                        appId: window.g_config.appId,
                        itemId: window.g_config.itemId,
                        c: (function () {
                            var host = location.hostname,
							isDaily = -1 !== host.indexOf('daily'),
							isTmall = -1 !== host.indexOf('tmall');

                            if (isDaily) {
                                if (Mpp.Config.isMultiConnectionApp()) {
                                    host = host + ':8080';
                                } else {
                                    host = isTmall ? 'daily.tmall.net:8080' : 'daily.taobao.net:8080';
                                }
                            } else {
                                if (Mpp.Config.isMultiConnectionApp()) {
                                    host = host;
                                } else {
                                    host = isTmall ? 'tmall.com' : 'taobao.com';
                                }
                            }
                            return 'http://mpp.' + host + '/buildconnection.do';
                        })()
                    };
                }
                return {};
            }
        };
    });
    Mpp.add('Load', function (Mpp) {
        Mpp.Load = {
            init: function () {
                // 如果 url 中含 mclose 参数, 则停止建立长连接
                if (/mclose/.test(location.search)) {
                    return false;
                }
                if (Mpp.Config.isMultiConnectionApp()) {//1009拍卖中心的应用ID号。
                    Mpp.App.init();
                } else {
                    Mpp.Control.init();
                    Mpp.Control.start();
                }
            }

        };
    });

    setTimeout(function () {
        try { //   Mpp.debug(true);
            Mpp.Load.init();
        } catch (e) {
            Mpp.log('load error.');
        }
    }, 100);


    /**
    * @fileoveview 此文件仅用于合并.
    * @author nanzhi<nanzhienai@163.com>
    */
})();
