﻿/*pub-1|2012-11-26 18:19:25*/
(function () {
    var _TRANSFORMERS_util_json_js = (function () {
        var json = window.JSON;
        return {
            parse: function (str) {
                if (json) {
                    return json.parse(str)
                }
                return eval("(" + str + ")")
            },
            stringify: function (obj) {
                if (json) {
                    return json.stringify(obj)
                }
                var i, str = "";
                for (i in obj) {
                    str += ',"' + i + '":"' + obj[i].toString() + '"'
                }
                return "{" + str.substr(1) + "}"
            }
        }
    })();
    var _TRANSFORMERS_type_date_now_js = (function () {
        function now() {
            return new Date().getTime()
        }
        return now
    })();
    var _TRANSFORMERS_type_lang_isArray_js = (function () {
        function isArray(it) {
            return it && ("array" === typeof it || it instanceof Array)
        }
        return isArray
    })();
    var _TRANSFORMERS_client_swfobject_js = (function () {
        var swfobject = function () {
            var UNDEF = "undefined",
				OBJECT = "object",
				SHOCKWAVE_FLASH = "Shockwave Flash",
				SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
				FLASH_MIME_TYPE = "application/x-shockwave-flash",
				EXPRESS_INSTALL_ID = "SWFObjectExprInst",
				win = window,
				doc = document,
				nav = navigator,
				plugin = false,
				regObjArr = [],
				objIdArr = [],
				listenersArr = [],
				storedFbContent, storedFbContentId, storedCallbackFn, storedCallbackObj, isExpressInstallActive = false,
				dynamicStylesheet, dynamicStylesheetMedia, autoHideShow = true,
				encodeURI_enabled = false,
				ua = function () {
				    var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
						u = nav.userAgent.toLowerCase(),
						p = nav.platform.toLowerCase(),
						windows = p ? /win/.test(p) : /win/.test(u),
						mac = p ? /mac/.test(p) : /mac/.test(u),
						webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false,
						ie = nav.appName === "Microsoft Internet Explorer",
						playerVersion = [0, 0, 0],
						d = null;
				    if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
				        d = nav.plugins[SHOCKWAVE_FLASH].description;
				        if (d && (typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) {
				            plugin = true;
				            ie = false;
				            d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				            playerVersion[0] = toInt(d.replace(/^(.*)\..*$/, "$1"));
				            playerVersion[1] = toInt(d.replace(/^.*\.(.*)\s.*$/, "$1"));
				            playerVersion[2] = /[a-zA-Z]/.test(d) ? toInt(d.replace(/^.*[a-zA-Z]+(.*)$/, "$1")) : 0
				        }
				    } else {
				        if (typeof win.ActiveXObject != UNDEF) {
				            try {
				                var a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
				                if (a) {
				                    d = a.GetVariable("$version");
				                    if (d) {
				                        ie = true;
				                        d = d.split(" ")[1].split(",");
				                        playerVersion = [toInt(d[0]), toInt(d[1]), toInt(d[2])]
				                    }
				                }
				            } catch (e) { }
				        }
				    }
				    return {
				        w3: w3cdom,
				        pv: playerVersion,
				        wk: webkit,
				        ie: ie,
				        win: windows,
				        mac: mac
				    }
				} ();

            function canExpressInstall() {
                return !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac) && !(ua.wk && ua.wk < 312)
            }
            function abstractFbContent(obj) {
                var ac = createElement("div");
                if (ua.win && ua.ie) {
                    ac.innerHTML = obj.innerHTML
                } else {
                    var nestedObj = obj.getElementsByTagName(OBJECT)[0];
                    if (nestedObj) {
                        var c = nestedObj.childNodes;
                        if (c) {
                            var cl = c.length;
                            for (var i = 0; i < cl; i++) {
                                if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
                                    ac.appendChild(c[i].cloneNode(true))
                                }
                            }
                        }
                    }
                }
                return ac
            }
            function createIeObject(url, param_str) {
                var div = createElement("div");
                div.innerHTML = "<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='" + url + "'>" + param_str + "</object>";
                return div.firstChild
            }
            function createSWF(attObj, parObj, id) {
                var r, el = getElementById(id);
                id = getId(id);
                if (ua.wk && ua.wk < 312) {
                    return r
                }
                if (el) {
                    var o = (ua.ie) ? createElement("div") : createElement(OBJECT),
						attr, attr_lower, param;
                    if (typeof attObj.id == UNDEF) {
                        attObj.id = id
                    }
                    for (param in parObj) {
                        if (parObj.hasOwnProperty(param) && param.toLowerCase() !== "movie") {
                            createObjParam(o, param, parObj[param])
                        }
                    }
                    if (ua.ie) {
                        o = createIeObject(attObj.data, o.innerHTML)
                    }
                    for (attr in attObj) {
                        if (attObj.hasOwnProperty(attr)) {
                            attr_lower = attr.toLowerCase();
                            if (attr_lower === "styleclass") {
                                o.setAttribute("class", attObj[attr])
                            } else {
                                if (attr_lower !== "classid" && attr_lower !== "data") {
                                    o.setAttribute(attr, attObj[attr])
                                }
                            }
                        }
                    }
                    if (ua.ie) {
                        objIdArr[objIdArr.length] = attObj.id
                    } else {
                        o.setAttribute("type", FLASH_MIME_TYPE);
                        o.setAttribute("data", attObj.data)
                    }
                    el.parentNode.replaceChild(o, el);
                    r = o
                }
                return r
            }
            function createObjParam(el, pName, pValue) {
                var p = createElement("param");
                p.setAttribute("name", pName);
                p.setAttribute("value", pValue);
                el.appendChild(p)
            }
            function removeSWF(id) {
                var obj = getElementById(id);
                if (obj && obj.nodeName == "OBJECT") {
                    if (ua.ie) {
                        obj.style.display = "none";
                        (function removeSWFInIE() {
                            if (obj.readyState == 4) {
                                for (var i in obj) {
                                    if (typeof obj[i] == "function") {
                                        obj[i] = null
                                    }
                                }
                                obj.parentNode.removeChild(obj)
                            } else {
                                setTimeout(removeSWFInIE, 10)
                            }
                        } ())
                    } else {
                        obj.parentNode.removeChild(obj)
                    }
                }
            }
            function isElement(id) {
                return (id && id.nodeType && id.nodeType === 1)
            }
            function getId(thing) {
                return (isElement(thing)) ? thing.id : thing
            }
            function getElementById(id) {
                if (isElement(id)) {
                    return id
                }
                var el = null;
                try {
                    el = doc.getElementById(id)
                } catch (e) { }
                return el
            }
            function createElement(el) {
                return doc.createElement(el)
            }
            function toInt(str) {
                return parseInt(str, 10)
            }
            function hasPlayerVersion(rv) {
                rv += "";
                var pv = ua.pv,
					v = rv.split(".");
                v[0] = toInt(v[0]);
                v[1] = toInt(v[1]) || 0;
                v[2] = toInt(v[2]) || 0;
                return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false
            }
            function setVisibility(id, isVisible) {
                if (!autoHideShow) {
                    return
                }
                var v = isVisible ? "visible" : "hidden",
					el = getElementById(id);
                if (el) {
                    el.style.visibility = v
                }
            }
            function urlEncodeIfNecessary(s) {
                var regex = /[\\\"<>\.;]/;
                var hasBadChars = regex.exec(s) != null;
                return hasBadChars && typeof encodeURIComponent != UNDEF ? encodeURIComponent(s) : s
            }
            var cleanup = function () {
                if (ua.ie) {
                    window.attachEvent("onunload", function () {
                        var ll = listenersArr.length;
                        for (var i = 0; i < ll; i++) {
                            listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2])
                        }
                        var il = objIdArr.length;
                        for (var j = 0; j < il; j++) {
                            removeSWF(objIdArr[j])
                        }
                        for (var k in ua) {
                            ua[k] = null
                        }
                        ua = null;
                        for (var l in swfobject) {
                            swfobject[l] = null
                        }
                        swfobject = null
                    })
                }
            } ();
            return {
                embedSWF: function (swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj, callbackFn) {
                    var id = getId(replaceElemIdStr),
						callbackObj = {
						    success: false,
						    id: id
						};
                    if (ua.w3 && !(ua.wk && ua.wk < 312) && swfUrlStr && replaceElemIdStr && widthStr && heightStr && swfVersionStr) {
                        setVisibility(id, false);
                        widthStr += "";
                        heightStr += "";
                        var att = {};
                        if (attObj && typeof attObj === OBJECT) {
                            for (var i in attObj) {
                                att[i] = attObj[i]
                            }
                        }
                        att.data = swfUrlStr;
                        att.width = widthStr;
                        att.height = heightStr;
                        var par = {};
                        if (parObj && typeof parObj === OBJECT) {
                            for (var j in parObj) {
                                par[j] = parObj[j]
                            }
                        }
                        if (flashvarsObj && typeof flashvarsObj === OBJECT) {
                            for (var k in flashvarsObj) {
                                if (flashvarsObj.hasOwnProperty(k)) {
                                    var key = (encodeURI_enabled) ? encodeURIComponent(k) : k,
										value = (encodeURI_enabled) ? encodeURIComponent(flashvarsObj[k]) : flashvarsObj[k];
                                    if (typeof par.flashvars != UNDEF) {
                                        par.flashvars += "&" + key + "=" + value
                                    } else {
                                        par.flashvars = key + "=" + value
                                    }
                                }
                            }
                        }
                        if (hasPlayerVersion(swfVersionStr)) {
                            var obj = createSWF(att, par, replaceElemIdStr);
                            if (att.id == id) {
                                setVisibility(id, true)
                            }
                            callbackObj.success = true;
                            callbackObj.ref = obj;
                            callbackObj.id = obj.id
                        } else {
                            if (xiSwfUrlStr && canExpressInstall()) {
                                att.data = xiSwfUrlStr;
                                return
                            } else {
                                setVisibility(id, true)
                            }
                        }
                        if (callbackFn) {
                            callbackFn(callbackObj)
                        }
                    } else {
                        if (callbackFn) {
                            callbackFn(callbackObj)
                        }
                    }
                },
                switchOffAutoHideShow: function () {
                    autoHideShow = false
                },
                ua: ua,
                createSWF: function (attObj, parObj, replaceElemIdStr) {
                    if (ua.w3) {
                        return createSWF(attObj, parObj, replaceElemIdStr)
                    } else {
                        return undefined
                    }
                },
                removeSWF: function (objElemIdStr) {
                    if (ua.w3) {
                        removeSWF(objElemIdStr)
                    }
                }
            }
        } ();
        return swfobject
    })();
    var _TRANSFORMERS_type_object_create_js = (function () {
        function create(o) {
            if (Object.create) {
                return Object.create.apply(null, arguments)
            }
            if (arguments.length > 1) {
                throw new Error("Object.create implementation only accepts the first parameter.")
            }
            function F() { }
            F.prototype = o;
            return new F
        }
        return create
    })();
    var _TRANSFORMERS_type_lang_isUndefined_js = (function () {
        function isUndefined(it) {
            return "undefined" === typeof it
        }
        return isUndefined
    })();
    var _TRANSFORMERS_type_lang_isString_js = (function () {
        function isString(it) {
            return it && ("string" === typeof it || it instanceof String)
        }
        return isString
    })();
    var _TRANSFORMERS_bom_browser_js = (function () {
        var win = window,
			doc = document,
			n = navigator,
			ua = n.userAgent,
			av = n.appVersion,
			tv = parseFloat(av),
			UNDEFINED = undefined,
			opera = win.opera,
			mode, browser = {};
        browser.isBrowser = true;
        browser.isOpera = opera ? parseFloat(opera.version()) : UNDEFINED;
        browser.isKhtml = av.indexOf("Konqueror") > -1 ? tv : UNDEFINED;
        browser.isWebKit = parseFloat(ua.split("WebKit/")[1]) || UNDEFINED;
        browser.isChrome = parseFloat(ua.split("Chrome/")[1]) || UNDEFINED;
        browser.isMaxthon = parseFloat(ua.split("Maxthon/")[1]) || UNDEFINED;
        if (browser.isWebKit && !browser.isChrome && !browser.isMaxthon && ua.indexOf("Safari") > -1) {
            browser.isSafari = parseFloat(ua.split("Version/")[1]) || UNDEFINED
        }
        browser.isGecko = browser.isMozilla = browser.isMoz = ua.indexOf("Gecko") > -1 && !browser.isWebKit && !browser.isKhtml ? tv : UNDEFINED;
        browser.isFirefox = browser.isFF = browser.isGecko ? parseFloat(ua.split("Firefox/")[1]) : UNDEFINED;
        if (doc.all && !browser.isOpera) {
            mode = doc.docMode;
            browser.isIE = mode && 5 !== mode ? mode : parseFloat(ua.split("MSIE ")[1])
        }
        browser.isQuirks = "BackCompat" === doc.compatMode;
        return browser
    })();
    var _TRANSFORMERS_type_object_toString_js = (function () {
        function toString(obj, symbol, needEncode) {
            var i, arr = [],
				sym = symbol || [":", ","];
            for (i in obj) {
                arr.push(i + sym[0] + (!needEncode ? obj[i] : escape(obj[i].toString())))
            }
            return arr.join(sym[1])
        }
        return toString
    })();
    var _TRANSFORMERS_type_lang_toArray_js = (function () {
        function toArray(obj, fromIndex) {
            return Array.prototype.slice.call(obj, fromIndex || 0)
        }
        return toArray
    })();
    var _TRANSFORMERS_type_object__mixin_js = (function () {
        function _mixin(target, source) {
            if (source) {
                var i, _s, name, extraNames = ["hasOwnProperty", "valueOf", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "constructor"],
					empty = {}, len = extraNames.length;
                for (name in source) {
                    _s = source[name];
                    if (!target[name] || target[name] != _s && (!(name in empty) || _s != empty[name])) {
                        target[name] = source[name]
                    }
                }
                for (i = 0; i < len; i++) {
                    name = extraNames[i];
                    _s = source[name];
                    if (!target[name] || target[name] != _s && (!(name in empty) || _s != empty[name])) {
                        target[name] = _s
                    }
                }
            }
            return target
        }
        return _mixin
    })();
    var _TRANSFORMERS_type_lang_isNumber_js = (function () {
        function isNumber(it) {
            if (isNaN(it)) {
                return false
            }
            return it && ("number" === typeof it || it instanceof Number)
        }
        return isNumber
    })();
    var _TRANSFORMERS_type_lang_isFunction_js = (function () {
        function isFunction(it) {
            return it && "[object Function]" === Object.prototype.toString.call(it)
        }
        return isFunction
    })();
    var _TRANSFORMERS_type_string_trim_js = (function () {
        function trim(str, isBigText) {
            if (String.prototype.trim) {
                return str.trim()
            }
            if (!isBigText) {
                return str.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
            }
            str = str.replace(/^\s+/, "");
            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.substring(0, i + 1);
                    break
                }
            }
            return str
        }
        return trim
    })();
    var _TRANSFORMERS_type_object_mixin_js = (function () {
        function mixin(obj, props) {
            var args = arguments,
				i = 1,
				o = obj || {}, len = args.length;
            for (; i < len; i++) {
                _TRANSFORMERS_type_object__mixin_js(o, args[i])
            }
            return o
        }
        return mixin
    })();
    var _TRANSFORMERS_oop_extend_js = (function () {
        function extend(r, s, px, sx) {
            if (!r) {
                return false
            }
            var sp, proto = {}, create = _TRANSFORMERS_type_object_create_js,
				mixin = _TRANSFORMERS_type_object_mixin_js;
            if (s) {
                sp = s.prototype;
                proto = create(sp);
                if (Object != s && s != sp.constructor) {
                    sp.constructor = s
                }
                r.superclass = sp
            }
            r.prototype = proto;
            proto.constructor = r;
            if (px) {
                mixin(proto, px)
            }
            if (sx) {
                mixin(r, sx)
            }
            return r
        }
        return extend
    })();
    var _TRANSFORMERS_io_script_js = (function () {
        var win = window,
			doc = document,
			isString = _TRANSFORMERS_type_lang_isString_js,
			isFunction = _TRANSFORMERS_type_lang_isFunction_js,
			isIE = _TRANSFORMERS_bom_browser_js.isIE,
			now = _TRANSFORMERS_type_date_now_js;
        return {
            get: function (cfg) {
                var host = this,
					result, url, node, success, failure, status = /loaded|complete/;
                if (isString(cfg)) {
                    url = cfg
                } else {
                    url = cfg.url;
                    success = cfg.success || function () { };
                    failure = cfg.failure || function () { }
                }
                node = host.create(url);
                result = {
                    when: function () {
                        return {
                            success: function (cb) {
                                if (node.addEventListener) {
                                    node.addEventListener("load", cb, false)
                                } else {
                                    node.onreadystatechange = function () {
                                        if (status.test(node.readyState)) {
                                            cb()
                                        }
                                    }
                                }
                                return result.when()
                            },
                            failure: function (cb) {
                                if (node.addEventListener) {
                                    node.addEventListener("error", cb, false)
                                } else { }
                                return result.when()
                            }
                        }
                    },
                    node: node
                };
                if (success && failure) {
                    result.when().success(success).failure(failure)
                }
                return result
            },
            create: function (url) {
                var s = doc.createElement("script"),
					head = doc.head || doc.getElementsByTagName("head")[0];
                s.type = "text/javascript";
                s.charset = "utf-8";
                s.src = url;
                return head.appendChild(s)
            },
            remove: function (node) {
                if (node) {
                    node.parentNode.removeChild(node)
                }
            },
            jsonp: function (cfg) {
                var host = this,
					result, url = cfg.url,
					success = cfg.success,
					failure = cfg.failure,
					jsonpName = cfg.jsonp || "callback",
					funcName = cfg.funcName || "nature_jsonp_",
					t = now(),
					id;
                if (isFunction(success)) {
                    id = funcName + t;
                    win[id] = success
                } else {
                    id = success
                }
                result = host.get(url + (url.indexOf("?") > -1 ? "&" : "?") + jsonpName + "=" + id + "&t=" + t).when().success(function () {
                    host.remove(result.node);
                    if (isFunction(success)) {
                        try {
                            delete win[id]
                        } catch (e) { }
                    }
                }).failure(function () {
                    failure && failure()
                })
            }
        }
    })();
    var _TRANSFORMERS_bom_uri_buildUri_js = (function () {
        function buildUri(url, params) {
            var mark = url.indexOf("?") > -1 ? "&" : "?",
				isObject = _TRANSFORMERS_type_lang_isObject_js,
				param = _TRANSFORMERS_bom_uri_param_js;
            return url + mark + (isObject(params) ? param(params) : params)
        }
        return buildUri
    })();
    var _TRANSFORMERS_type_function_bind_js = (function () {
        function bind(func, scope) {
            var toArray = _TRANSFORMERS_type_lang_toArray_js,
				hitch = _TRANSFORMERS_type_lang_hitch_js;
            return hitch.apply(null, [scope, func].concat(toArray(arguments, 2)))
        }
        return bind
    })();
    var _TRANSFORMERS_bom_cookie_js = (function () {
        var win = window,
			doc = document;
        return {
            get: function (name) {
                var cookie = doc.cookie,
					trim = _TRANSFORMERS_type_string_trim_js,
					reg = new RegExp("(?:^|;\\s*)" + unescape(trim(name)) + "=([^;]*)"),
					match = cookie.match(reg);
                return match ? decodeURIComponent(match[1]) : undefined
            },
            set: function (name, value, props) {
                props = props || {};
                var str = escape(name) + "=" + encodeURIComponent(value) + ";",
					toString = _TRANSFORMERS_type_object_toString_js,
					exp = props.expires,
					age = props["max-age"];
                if (exp) {
                    props.expires = exp.toUTCString()
                }
                if (age) {
                    props["max-age"] = age * 24 * 60 * 60
                }
                doc.cookie = str + toString(props, ["=", ";"])
            },
            isEnable: function () {
                var host = this,
					name = "_natureCookieTest",
					value = "_natureCookieAllowed",
					nav = win.navigator;
                if (!("cookieEnabled" in nav)) {
                    host.set(name, value);
                    nav.cookieEnabled = value === host.get(name);
                    if (nav.cookieEnabled) {
                        host.set(name, "", {
                            "max-age": -1
                        })
                    }
                }
                return nav.cookieEnabled
            }
        }
    })();
    var _TRANSFORMERS_client_connect_js = (function () {
        var script = _TRANSFORMERS_io_script_js,
			buildUri = _TRANSFORMERS_bom_uri_buildUri_js,
			extend = _TRANSFORMERS_oop_extend_js,
			mixin = _TRANSFORMERS_type_object_mixin_js,
			now = _TRANSFORMERS_type_date_now_js,
			bind = _TRANSFORMERS_type_function_bind_js,
			cookie = _TRANSFORMERS_bom_cookie_js,
			params = {
			    cmd: "conn"
			};

        function Connection(config) {
            if (config) {
                this.config(config)
            }
        }
        extend(Connection, null, {
            config: function (config) {
                var host = this;
                mixin(host, config);
                return host
            },
            build: function () {
                var host = this,
					nick = encodeURIComponent(unescape((cookie.get("_nk_") || "").replace(/\\u/g, "%u")));
                if (nick === host.nick) {
                    script.jsonp({
                        url: buildUri(host.url, params),
                        jsonp: "callback",
                        funcName: "jsonp",
                        success: bind(host._success, host),
                        failure: host._failure
                    })
                }
                return host
            },
            _success: function (data) {
                var host = this,
					cmd = data.cmd,
					status = data.status,
					d = data.data;
                if (status) {
                    host.callback(status)
                }
                if (d) {
                    host.sendType(d)
                }
                switch (cmd) {
                    case "polling":
                    case "reconn":
                        mixin(params, data);
                        host.build()
                }
            },
            _failure: function () { }
        });
        return new Connection()
    })();
    var _TRANSFORMERS_bom_uri_param_js = (function () {
        function param(obj) {
            return _TRANSFORMERS_type_object_toString_js(obj, ["=", "&"], true)
        }
        return param
    })();
    var _TRANSFORMERS_type_lang_isNull_js = (function () {
        function isNull(it) {
            return !_TRANSFORMERS_type_lang_isUndefined_js(it) && null === it
        }
        return isNull
    })();
    var _TRANSFORMERS_type_lang_isObject_js = (function () {
        function isObject(it) {
            return !_TRANSFORMERS_type_lang_isUndefined_js(it) && (_TRANSFORMERS_type_lang_isArray_js(it) || _TRANSFORMERS_type_lang_isFunction_js(it) || _TRANSFORMERS_type_lang_isNull_js(it) || "object" === typeof it)
        }
        return isObject
    })();
    var _TRANSFORMERS_client_message_js = (function () {
        var extend = _TRANSFORMERS_oop_extend_js,
			mixin = _TRANSFORMERS_type_object_mixin_js,
			isObject = _TRANSFORMERS_type_lang_isObject_js,
			isNumber = _TRANSFORMERS_type_lang_isNumber_js,
			browser = _TRANSFORMERS_bom_browser_js,
			now = _TRANSFORMERS_type_date_now_js,
			script = _TRANSFORMERS_io_script_js,
			JSON = _TRANSFORMERS_util_json_js;

        function Message(config) {
            if (config) {
                this.config(config)
            }
        }
        extend(Message, null, {
            config: function (config) {
                var host = this;
                mixin(host, config);
                return host
            },
            getItem: function (key) {
                var host = this,
					swf = host.swf,
					value = swf.getItem(key),
					expire = host.expire,
					time;
                if (value) {
                    value = JSON.parse(value);
                    time = value.t;
                    if (expire && now() - time > expire) {
                        value = -1
                    }
                } else {
                    value = -1
                }
                return value
            },
            getData: function (callback) {
                var host = this,
					swf = host.swf,
					time = new Date(),
					priceIdentity = host.identity + "_Price",
					priceDate = swf.getItem(priceIdentity),
					today = time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate(),
					priceParam = "last_date=" + today + "&op=item_price",
					storeData = {};
                if (priceDate && today === priceDate) {
                    priceParam = ""
                } else {
                    swf.setItem(priceIdentity, today)
                }
                script.jsonp({
                    url: host.url + priceParam,
                    success: function (data) {
                        if (!data) {
                            data = {
                                "-1": 0
                            }
                        }
                        for (var i in data) {
                            if (isNumber(i * 1)) {
                                storeData[i] = data[i]
                            }
                        }
                        if (swf) {
                            swf.setItem(host.identity, JSON.stringify(mixin(storeData, {
                                t: now()
                            })));
                            swf.fire(JSON.stringify(data))
                        } else {
                            if (callback) {
                                callback(data)
                            }
                        }
                    }
                })
            },
            notifyParent: function (data) {
                var host = this;
                if (window.postMessage && (!browser.isIE || browser.isIE > 8)) {
                    window.top.postMessage(isObject(data) ? JSON.stringify(data) : data, "*")
                } else {
                    if (host.originDomain === document.domain) {
                        try {
                            window.top.TStart.News.fire(isObject(data) ? data : (data ? JSON.parse(data) : data))
                        } catch (e) { }
                    } else {
                        try {
                            window.TraceSwf.setItem("SubMessage_" + host.identity, data)
                        } catch (e) { }
                    }
                }
            },
            notifyQuan: function (data) {
                var host = this;
                if (window.postMessage && (!browser.isIE || browser.isIE > 8)) {
                    window.top.postMessage(isObject(data) ? JSON.stringify(data) : data, "*")
                } else {
                    if (host.originDomain === document.domain) {
                        try {
                            window.top.TStart.News.fireQuan(data.quanmessage)
                        } catch (e) { }
                    } else {
                        try {
                            window.TraceSwf.setItem("SubMessage_Quan_" + host.identity, data.quanmessage)
                        } catch (e) { }
                    }
                }
            },
            render: function (value) {
                this.notifyParent(value)
            },
            show: function () {
                var host = this,
					value = host.getItem(host.identity);
                if (-1 != value) {
                    host.render(value)
                } else {
                    host.getData()
                }
            },
            hide: function () {
                this.container.style.visibility = "hidden"
            },
            clearNews: function (type) {
                var host = this,
					swf = host.swf,
					identity = host.identity,
					value = swf.getItem(identity),
					reduce;
                if ("*" === type || -1 === type * 1) {
                    return host.getData()
                }
                if (value) {
                    value = JSON.parse(value);
                    reduce = value[type];
                    if (reduce) {
                        value[type] = "0";
                        if ("8" != type) {
                            value["-1"] = value["-1"] - reduce
                        }
                        swf.setItem(identity, JSON.stringify(value))
                    }
                    swf.fire(JSON.stringify(value))
                }
            }
        });
        return new Message()
    })();
    var _TRANSFORMERS_type_lang_hitch_js = (function () {
        function hitch(scope, method) {
            var args = arguments,
				pre = _TRANSFORMERS_type_lang_toArray_js(args, 2),
				context = scope || window,
				fp = _TRANSFORMERS_type_lang_isString_js(method) ? scope[method] : method,
				bind = Function.prototype.bind;
            if (bind) {
                return bind.apply(fp, [scope].concat(pre))
            }
            return function () {
                var args = _TRANSFORMERS_type_lang_toArray_js(arguments);
                return fp && fp.apply(context, pre.concat(args))
            }
        }
        return hitch
    })();
    var cookie = _TRANSFORMERS_bom_cookie_js,
		browser = _TRANSFORMERS_bom_browser_js,
		bind = _TRANSFORMERS_type_function_bind_js,
		isObject = _TRANSFORMERS_type_lang_isObject_js,
		connect = _TRANSFORMERS_client_connect_js,
		message = _TRANSFORMERS_client_message_js,
		swfobject = _TRANSFORMERS_client_swfobject_js,
		script = _TRANSFORMERS_io_script_js;
    var nick = encodeURIComponent(unescape((cookie.get("_nk_") || "").replace(/\\u/g, "%u"))),
		n_config = window.n_config,
		flashvars = {
		    jsentry: "jsEntry",
		    swfid: nick,
		    group: nick + "_group"
		}, params = {
		    allowscriptaccess: "always"
		}, attributes = {}, doc = document,
		isOnline = -1 === location.host.indexOf("daily"),
		search = location.search,
		expireReg = /expire=(\d)/,
		expire = search.match(expireReg),
		messageSupport = window.postMessage && (!browser.isIE || browser.isIE > 8),
		originReg = /domain=(.+)/,
		originDomain = search.match(originReg)[1];

    function setDomain() {
        var host = location.host,
			arr = host.split("."),
			len = arr.length,
			ret = arr.slice(len - 2);
        //document.domain = ret.join(".")
    }
    function getHost(url) {
        if (!isOnline) {
            url = url.replace(/taobao\.com/, "daily.taobao.net")
        }
        return url
    }
    function receiveMessage() {
        if (messageSupport) {
            window.onmessage = function (ev) {
                message.clearNews(ev.data)
            }
        } else {
            var clearNews = /clearNews=(-?[\d\*]+)/,
				match = search.match(clearNews),
				clearType;
            if (match) {
                clearType = match[1]
            }
            if (clearType) {
                setTimeout(function () {
                    message.clearNews(match[1])
                }, 50);
                return true
            }
        }
        return false
    }
    window.jsEntry = function (swfid, msg) {
        var swf = document.clientObject,
			type = msg.type,
			_expire, data = msg.data;
        if (encodeURIComponent(swfid) === nick) {
            if ("master" === type) {
                connect.config({
                    swf: swf,
                    nick: nick,
                    url: getHost(n_config.push + "?nick=" + nick),
                    callback: bind(message.getData, message),
                    sendType: function (d) {
                        swf.fire({
                            quanmessage: d
                        })
                    }
                }).build()
            }
            if ("join" === type) {
                if (expire && expire[1]) {
                    _expire = expire[1]
                }
                message.config({
                    swf: swf,
                    identity: "Tmsg_" + nick,
                    expire: _expire * 60 * 60 * 1000,
                    container: doc.getElementById("J_Message"),
                    countEl: doc.getElementById("J_Count"),
                    url: getHost(n_config.unread),
                    originDomain: originDomain
                });
                if (receiveMessage()) {
                    return false
                }
                if (!_expire || "0" === _expire) {
                    message.getData()
                } else {
                    message.show()
                }
            }
            if ("message" === type) {
                if (data) {
                    var body = data.body;
                    if (isObject(body) && body.quanmessage) {
                        message.notifyQuan(body)
                    } else {
                        message.render(body)
                    }
                }
            }
        }
    };
    if (nick) {
        setDomain();
        var pv = swfobject.ua.pv;
        if (pv[0]) {
            if (!messageSupport && originDomain !== document.domain) {
                script.get("http://" + (isOnline ? "a.tbcdn.cn" : "assets.daily.taobao.net") + "/??s/kissy/1.1.6/kissy-min.js,apps/stargate/tstart/libs/kissy/swf-pkg.js,apps/stargate/tstart/plugins/news/message/commu.js")
            }
            swfobject.embedSWF(n_config.swfurl, "clientObject", "1", "1", "9.0.0", false, flashvars, params, attributes)
        } else {
            if (!browser.isIE) {
                message.config({
                    container: doc.getElementById("J_Message"),
                    countEl: doc.getElementById("J_Count"),
                    url: getHost(n_config.unread)
                });
                message.getData(function (data) {
                    message.render(data)
                })
            }
        }
    }
})();