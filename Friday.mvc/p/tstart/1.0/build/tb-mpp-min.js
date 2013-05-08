﻿(function () {
    if ("undefined" !== typeof Mpp) {
        return false
    }
    Mpp = {
        debug: function (__debug) {
            this.DEBUG = __debug
        },
        add: function (__property, __element) {
            if (this.isFunction(__element)) {
                var __p = __element(this);
                if (__p) {
                    this[__element] = __p
                }
            } else {
                if (this.isPlainObject(__element)) {
                    this[__property] = __element
                }
            }
        },
        isFunction: function (o) {
            return Object.prototype.toString.call(o) === "[object Function]"
        },
        isPlainObject: function (o) {
            return o && Object.prototype.toString.call(o) === "[object Object]" && !o.nodeType && !o.setInterval
        },
        log: function (msg, cat, src) {
            if (this.DEBUG) {
                if (src) {
                    msg = src + ": " + msg
                }
                if (window.console !== undefined && console.log) {
                    console[cat && console[cat] ? cat : "log"](msg)
                }
            }
        },
        DOMAIN: (function () {
            var host = location.hostname;
            if (host.indexOf("taobao.net") > -1) {
                host = "taobao.net"
            } else {
                if (host.indexOf("tmall.com") > -1) {
                    host = "tmall.com"
                } else {
                    if (host.indexOf("tmall.net") > -1) {
                        host = "tmall.net"
                    } else {
                        host = "taobao.com"
                    }
                }
            }
            return host
        })()
    };
    Mpp.add("Config", function (Mpp) {
        var __isMultiConnectionApp = function () {
            if (window.g_config && window.g_config.appId) {
                var thisAppId = window.g_config.appId;
                return 1009 == thisAppId || 1011 == thisAppId
            }
        }, __notifyURL = function () {
            var host = location.hostname,
				isItem = -1 !== host.indexOf("item"),
				isTmall = -1 !== host.indexOf("tmall"),
				isDaily = -1 !== host.indexOf("daily");
            if (isDaily) {
                if (__isMultiConnectionApp()) {
                    host = (isItem ? "item.daily.taobao.net" : (isTmall ? "detail.daily.tmall.net" : location.host)) + ":8080"
                } else {
                    host = isTmall ? "daily.tmall.net:8080" : "daily.taobao.net:8080"
                }
            } else {
                if (__isMultiConnectionApp()) {
                    host = isItem ? "item.taobao.com" : (isTmall ? "detail.tmall.com" : location.host)
                } else {
                    host = isTmall ? "tmall.com" : "taobao.com"
                }
            }
            return "http://mpp." + host + "/connection.html?t=20110810&domain=" + document.domain
        }, __mppurl = __notifyURL();
        Mpp.Config = {
            isMultiConnectionApp: __isMultiConnectionApp,
            notifyURL: __mppurl
        }
    });
    Mpp.add("JSON", function (Mpp) {
        var JSON = {};

        function f(n) {
            return n < 10 ? "0" + n : n
        }
        if (typeof Date.prototype.toJSON !== "function") {
            Date.prototype.toJSON = function (key) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
                return this.valueOf()
            }
        }
        var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
			gap, indent, meta = {
			    "\b": "\\b",
			    "\t": "\\t",
			    "\n": "\\n",
			    "\f": "\\f",
			    "\r": "\\r",
			    '"': '\\"',
			    "\\": "\\\\"
			}, rep;

        function quote(string) {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + string + '"'
        }
        function str(key, holder) {
            var i, k, v, length, mind = gap,
				partial, value = holder[key];
            if (value && typeof value === "object" && typeof value.toJSON === "function") {
                value = value.toJSON(key)
            }
            if (typeof rep === "function") {
                value = rep.call(holder, key, value)
            }
            switch (typeof value) {
                case "string":
                    return quote(value);
                case "number":
                    return isFinite(value) ? String(value) : "null";
                case "boolean":
                case "null":
                    return String(value);
                case "object":
                    if (!value) {
                        return "null"
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === "[object Array]") {
                        length = value.length;
                        for (i = 0; i < length; i += 1) {
                            partial[i] = str(i, value) || "null"
                        }
                        v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
                        gap = mind;
                        return v
                    }
                    if (rep && typeof rep === "object") {
                        length = rep.length;
                        for (i = 0; i < length; i += 1) {
                            k = rep[i];
                            if (typeof k === "string") {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    } else {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = str(k, value);
                                if (v) {
                                    partial.push(quote(k) + (gap ? ": " : ":") + v)
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
                    gap = mind;
                    return v
            }
        }
        if (typeof JSON.stringify !== "function") {
            JSON.stringify = function (value, replacer, space) {
                var i;
                gap = "";
                indent = "";
                if (typeof space === "number") {
                    for (i = 0; i < space; i += 1) {
                        indent += " "
                    }
                } else {
                    if (typeof space === "string") {
                        indent = space
                    }
                }
                rep = replacer;
                if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
                    throw new Error("JSON.stringify")
                }
                return str("", {
                    "": value
                })
            }
        }
        if (typeof JSON.parse !== "function") {
            JSON.parse = function (text, reviver) {
                var j;

                function walk(holder, key) {
                    var k, v, value = holder[key];
                    if (value && typeof value === "object") {
                        for (k in value) {
                            if (Object.hasOwnProperty.call(value, k)) {
                                v = walk(value, k);
                                if (v !== undefined) {
                                    value[k] = v
                                } else {
                                    delete value[k]
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value)
                }
                text = String(text);
                cx.lastIndex = 0;
                if (cx.test(text)) {
                    text = text.replace(cx, function (a) {
                        return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                    })
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                    j = eval("(" + text + ")");
                    return typeof reviver === "function" ? walk({
                        "": j
                    }, "") : j
                }
                throw new SyntaxError("JSON.parse")
            }
        }
        Mpp.JSON = JSON
    });
    Mpp.add("Cookie", function (Mpp) {
        Mpp.Cookie = {
            get: function (name) {
                var ret, m;
                if (this.isNotEmptyString(name)) {
                    if ((m = document.cookie.match("(?:^| )" + name + "(?:(?:=([^;]*))|;|$)"))) {
                        ret = m[1] ? decodeURIComponent(m[1]) : ""
                    }
                }
                return ret
            },
            set: function (name, val, expires, domain, path, secure) {
                var text = encodeURIComponent(val),
					date = expires;
                if (typeof date === "number") {
                    date = new Date();
                    date.setTime(date.getTime() + expires * 86400000)
                }
                if (date instanceof Date) {
                    text += "; expires=" + date.toUTCString()
                }
                if (this.isNotEmptyString(domain)) {
                    text += "; domain=" + domain
                }
                if (this.isNotEmptyString(path)) {
                    text += "; path=" + path
                }
                if (secure) {
                    text += "; secure"
                }
                document.cookie = name + "=" + text
            },
            remove: function (name) {
                this.set(name, "", 0)
            },
            isNotEmptyString: function (val) {
                return typeof val === "string" && val !== ""
            }
        }
    });
    Mpp.add("mpp-ua", function (Mpp) {
        var ua = navigator.userAgent,
			m, o = {
			    webkit: 0,
			    chrome: 0,
			    safari: 0,
			    gecko: 0,
			    firefox: 0,
			    ie: 0,
			    opera: 0,
			    mobile: "",
			    safe: 0,
			    sogo: 0,
			    tt: 0,
			    maxthon: 0
			}, numberify = function (s) {
			    var c = 0;
			    return parseFloat(s.replace(/\./g, function () {
			        return (c++ === 0) ? "." : ""
			    }))
			};
        if ((m = ua.match(/AppleWebKit\/([\d.]*)/)) && m[1]) {
            o.webkit = numberify(m[1]);
            if ((m = ua.match(/Chrome\/([\d.]*)/)) && m[1]) {
                o.chrome = numberify(m[1])
            } else {
                if ((m = ua.match(/\/([\d.]*) Safari/)) && m[1]) {
                    o.safari = numberify(m[1])
                }
            }
            if (/ Mobile\//.test(ua)) {
                o.mobile = "Apple"
            } else {
                if ((m = ua.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/))) {
                    o.mobile = m[0]
                }
            }
        } else {
            if ((m = ua.match(/Opera\/.* Version\/([\d.]*)/)) && m[1]) {
                o.opera = numberify(m[1]);
                if ((ua.match(/Opera Mini[^;]*/))) {
                    o.mobile = m[0]
                }
            } else {
                if ((m = ua.match(/MSIE\s([^;]*)/)) && m[1]) {
                    o.ie = numberify(m[1]);
                    if ((m = ua.match(/360SE/))) {
                        o.safe = "360SE"
                    }
                    if ((m = ua.match(/SE\s([^;]*)/)) && m[1]) {
                        o.sogo = numberify(m[1])
                    }
                    if ((m = ua.match(/TencentTraveler\s([^;]*)/)) && m[1]) {
                        o.tt = numberify(m[1])
                    }
                    try {
                        if (window.external && window.external.max_version) {
                            o.maxthon = numberify(window.external.max_version).toFixed(1)
                        }
                    } catch (e) { }
                } else {
                    if ((m = ua.match(/Gecko/))) {
                        o.gecko = 1;
                        if ((m = ua.match(/rv:([\d.]*)/)) && m[1]) {
                            o.gecko = numberify(m[1])
                        }
                        if ((m = ua.match(/Firefox\/([\d.]*)/)) && m[1]) {
                            o.firefox = numberify(m[1])
                        }
                    }
                }
            }
        }
        Mpp.UA = o
    });
    Mpp.add("Data", function (Mpp) {
        var cookieName = "mpp",
			Cookie = Mpp.Cookie,
			__CREATE_CONNECTION_STATUS = -1,
			localHeart = 0;
        Mpp.Data = {
            CREATE_CONNECTION_STATUS: __CREATE_CONNECTION_STATUS,
            NOTIFY_STATUS: {
                LOGOUT: 0,
                TIMEOUT: 1,
                MESSAGE: 2,
                CLOSED: 3
            },
            init: function () {
                Cookie.set(cookieName, "t=1&m=&h=&l=" + new Date().getTime(), null, Mpp.DOMAIN, "/")
            },
            setData: function (d) {
                var v = "";
                v = "t=" + d.t + "&m=" + (d.m || "") + "&h=" + (d.h || 0) + "&l=" + (d.l || 0);
                Cookie.set("mpp", v, null, Mpp.DOMAIN, "/")
            },
            getData: function () {
                var v = Cookie.get(cookieName),
					result = {
					    get: this.__get
					};
                if (v) {
                    var param = v.split("&");
                    for (var i = 0; i < param.length; i++) {
                        var one = param[i].split("=");
                        result[one[0]] = one[1]
                    }
                }
                return result
            },
            setHeart: function (heart) {
                var v = "",
					d = this.getData();
                v = "t=" + d.t + "&m=" + d.m + "&h=" + heart + "&l=" + d.l;
                Cookie.set(cookieName, v, null, Mpp.DOMAIN, "/")
            },
            isCreatingConnection: function (heart) {
                return heart == __CREATE_CONNECTION_STATUS
            },
            clear: function () {
                Cookie.set(cookieName, "t=0&m=&h=0&l=0", null, Mpp.DOMAIN, "/")
            },
            getUserNick: function () {
                var nickName = Cookie.get("_nk_") || "";
                return unescape(nickName.replace(/\\u/g, "%u"))
            },
            setLocalHeart: function () {
                var d = this.getData();
                d.l = localHeart = new Date().getTime();
                this.setData(d)
            },
            isNotNewFocused: function () {
                var d = this.getData();
                return localHeart == d.l
            },
            __get: function () {
                if (this.__m) {
                    return this.__m
                } else {
                    var result = [],
						v;
                    if (this.m) {
                        v = this.m.split("$");
                        for (var i = 0; i < v.length; i++) {
                            var param = v[i].split("#");
                            result.push({
                                t1: parseInt(param[0]),
                                t2: parseInt(param[1])
                            })
                        }
                        this.__m = result
                    }
                    return result
                }
            }
        }
    });
    Mpp.add("Notify", function (Mpp) {
        var callbacks = {};
        Mpp.Notify = {
            register: function (c) {
                if (!callbacks[c.appId]) {
                    callbacks[c.appId] = {}
                }
                if (!callbacks[c.appId][c.type]) {
                    callbacks[c.appId][c.type] = []
                }
                callbacks[c.appId][c.type].push(c.callback)
            },
            __call: function (appId, type) {
                if (callbacks[appId] && callbacks[appId][type]) {
                    for (var i = 0; i < callbacks[appId][type].length; i++) {
                        var c = callbacks[appId][type][i];
                        setTimeout(c, 1)
                    }
                }
            },
            notify: function (appId, type, data) {
                for (var i = 0; i < callbacks[appId][type].length; i++) {
                    var c = callbacks[appId][type][i];
                    setTimeout(function () {
                        c(data)
                    }, 1)
                }
            }
        }
    });
    Mpp.add("Heart", function (Mpp) {
        var Data = Mpp.Data,
			Config = Mpp.Config,
			LONG_REQUEST_HEART_TIMEOUT = 6000,
			isLongConnectionRuning = false,
			__connection = null,
			checkConnectionTimes = 0,
			errorRetryConnection = 18000,
			heartErrorTimes = 0,
			WAIT_CREATE_LONG_CONNECTION_TIMES = 3;
        Mpp.Heart = {
            start: function () {
                var __self = this;
                isLongConnectionRuning = true;
                heartErrorTimes = 0;
                __self.__checkHeart();
                Mpp.log("登录完成，开始长连接.")
            },
            restart: function () {
                var __self = this;
                isLongConnectionRuning = true;
                heartErrorTimes = 0;
                __self.__checkHeart()
            },
            stop: function () {
                var __self = this;
                if (isLongConnectionRuning) {
                    Mpp.log("停止外部长链接检查。");
                    if (__self.heartTimeoutTimer) {
                        clearTimeout(__self.heartTimeoutTimer)
                    }
                    isLongConnectionRuning = false;
                    heartErrorTimes = 0
                }
            },
            __createConnection: function () {
                try {
                    Data.setHeart(Data.CREATE_CONNECTION_STATUS);
                    __connection = document.createElement("iframe");
                    __connection.width = 0;
                    __connection.height = 0;
                    __connection.style.display = "none";
                    __connection.src = Config.notifyURL;
                    var body = document.getElementsByTagName("body")[0];
                    body.appendChild(__connection, body.lastChild)
                } catch (e) {
                    Mpp.log("远程连接异常了……" + e)
                }
            },
            __checkHeart: function () {
                var __self = this;
                if (__self.heartTimeoutTimer) {
                    clearTimeout(__self.heartTimeoutTimer)
                }
                if (isLongConnectionRuning && __self.__isLogin()) {
                    __self.heartTimeoutTimer = setTimeout(function () {
                        var heart = Data.getData();
                        Mpp.log("检查长链接，重新开始:" + (new Date().getTime() - heart.h > LONG_REQUEST_HEART_TIMEOUT) + "," + (new Date().getTime() - heart.h) + "," + new Date().getTime() + "," + heart.h);
                        if (heart.h == Data.CREATE_CONNECTION_STATUS || (new Date().getTime() - heart.h > LONG_REQUEST_HEART_TIMEOUT && heart.h !== Data.CREATE_CONNECTION_STATUS && heart.t !== Data.NOTIFY_STATUS.LOGOUT)) {
                            if (heartErrorTimes < WAIT_CREATE_LONG_CONNECTION_TIMES) {
                                heartErrorTimes++;
                                if (__connection) {
                                    Mpp.log("长链接的frame已经存在。");
                                    __connection.src = Config.notifyURL
                                } else {
                                    __self.__createConnection();
                                    Mpp.log("长链接的frame不已经存在。")
                                }
                                heart.h = new Date().getTime();
                                Data.setData(heart);
                                __self.__checkConnection()
                            } else {
                                __self.stop();
                                Mpp.Control.stop()
                            }
                        } else {
                            heartErrorTimes = 0
                        }
                        __self.__checkHeart()
                    }, LONG_REQUEST_HEART_TIMEOUT)
                }
            },
            __checkConnection: function () {
                var __self = this;
                if (checkConnectionTimes++ < 4) {
                    setTimeout(function () {
                        if (Data.isCreatingConnection(Data.getData().h)) {
                            if (__connection) {
                                Mpp.log("长链接的frame已经存在。");
                                __connection.src = Config.notifyURL
                            } else {
                                __self.__createConnection();
                                Mpp.log("长链接的frame不已经存在。")
                            }
                        }
                    }, errorRetryConnection)
                }
            },
            __isLogin: function () {
                return !!Data.getUserNick()
            }
        }
    });
    Mpp.add("Control", function (Mpp) {
        var Data = Mpp.Data,
			Heart = Mpp.Heart,
			Notify = Mpp.Notify,
			isFocused = false,
			isRunning = false,
			GET_TIME = 1500;
        Mpp.Control = {
            init: function () {
                this.__bindEvent()
            },
            start: function () {
                var __self = this;
                if (__self.__isLogin()) {
                    var d = Data.getData();
                    if (d.t) {
                        __self.readMessage()
                    } else {
                        Data.init()
                    }
                    isRunning = true;
                    isFocused = true;
                    Heart.start();
                    __self.fire()
                } else {
                    Data.clear()
                }
            },
            restart: function () {
                var __self = this;
                isRunning = true;
                isFocused = true;
                __self.fire()
            },
            stop: function () {
                isRunning = false;
                if (this.eventTimer) {
                    clearTimeout(this.eventTimer)
                }
                Heart.stop();
                Data.clear()
            },
            fire: function () {
                var __self = this;
                if (__self.eventTimer) {
                    clearTimeout(__self.eventTimer)
                }
                __self.eventTimer = setTimeout(function () {
                    if (isRunning && (isFocused || Data.isNotNewFocused())) {
                        __self.readMessage()
                    }
                }, GET_TIME)
            },
            readMessage: function () {
                var d = Data.getData(),
					type = parseInt(d.t),
					messages = d.get(),
					__self = Mpp.Control;
                d.m = "", d.t = Data.NOTIFY_STATUS.TIMEOUT;
                Data.setData(d);
                Mpp.log("local get data:" + type);
                switch (type) {
                    case Data.NOTIFY_STATUS.LOGOUT:
                        Mpp.log("logout mpp..................");
                        __self.stop();
                        Data.clear();
                        break;
                    case Data.NOTIFY_STATUS.MESSAGE:
                        for (var i = 0; i < messages.length; i++) {
                            Notify.__call(messages[i].t1, messages[i].t2)
                        }
                        __self.fire();
                        break;
                    default:
                        __self.fire()
                }
            },
            __bindEvent: function () {
                var __self = this;
                var __focus = function () {
                    Mpp.log("当前窗口获得焦点");
                    isFocused = true;
                    if (__self.__isLogin()) {
                        var d = Data.getData();
                        if (d.t == Data.NOTIFY_STATUS.LOGOUT) {
                            Data.init()
                        } else {
                            if (!Data.isNotNewFocused()) {
                                Data.setLocalHeart()
                            }
                        }
                        __self.restart();
                        Heart.restart()
                    } else {
                        __self.stop()
                    }
                };
                var __blur = function () {
                    Mpp.log("当前窗口失去焦点。");
                    isFocused = false
                };
                if (Mpp.UA.ie) {
                    window.onfocus = __focus;
                    window.onblur = __blur
                } else {
                    addEventListener("focus", __focus, false);
                    addEventListener("blur", __blur, false)
                }
            },
            __isLogin: function () {
                return !!Data.getUserNick()
            }
        }
    });
    Mpp.add("App", function (Mpp) {
        var Notify = Mpp.Notify,
			connection;
        Mpp.App = {
            init: function () {
                var gconfig = window.g_config,
					host = location.hostname,
					detailReg = /detail|item/,
					appid;
                if (!gconfig) {
                    return false
                }
                appid = gconfig.appId;
                if (!appid) {
                    return false
                }
                if ((1009 == appid && !detailReg.test(host)) || (1011 == appid && Mpp.UA.ie !== 6)) {
                    document.domain = host
                }
                this.createConnection()
            },
            createConnection: function () {
                try {
                    connection = document.createElement("iframe");
                    connection.width = 0;
                    connection.height = 0;
                    connection.style.display = "none";
                    connection.src = Mpp.Config.notifyURL;
                    var body = document.getElementsByTagName("body")[0];
                    body.appendChild(connection, body.lastChild)
                } catch (e) {
                    Mpp.log("远程连接异常了……" + e)
                }
            },
            notify: function (appId, type, data) {
                Notify.notify(appId, type, data)
            },
            getAppParameter: function () {
                if (Mpp.Config.isMultiConnectionApp()) {
                    return {
                        appId: window.g_config.appId,
                        itemId: window.g_config.itemId,
                        c: (function () {
                            var host = location.hostname,
								isDaily = -1 !== host.indexOf("daily"),
								isTmall = -1 !== host.indexOf("tmall");
                            if (isDaily) {
                                if (Mpp.Config.isMultiConnectionApp()) {
                                    host = host + ":8080"
                                } else {
                                    host = isTmall ? "daily.tmall.net:8080" : "daily.taobao.net:8080"
                                }
                            } else {
                                if (Mpp.Config.isMultiConnectionApp()) {
                                    host = host
                                } else {
                                    host = isTmall ? "tmall.com" : "taobao.com"
                                }
                            }
                            return "http://mpp." + host + "/buildconnection.do"
                        })()
                    }
                }
                return {}
            }
        }
    });
    Mpp.add("Load", function (Mpp) {
        Mpp.Load = {
            init: function () {
                if (/mclose/.test(location.search)) {
                    return false
                }
                if (Mpp.Config.isMultiConnectionApp()) {
                    Mpp.App.init()
                } else {
                    Mpp.Control.init();
                    Mpp.Control.start()
                }
            }
        }
    });
    setTimeout(function () {
        try {
            Mpp.Load.init()
        } catch (e) {
            Mpp.log("load error.")
        }
    }, 100)
})();