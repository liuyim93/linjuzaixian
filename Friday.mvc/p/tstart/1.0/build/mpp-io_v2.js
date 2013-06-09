 /*pub-1|2012-07-11 13:24:47*/var Mpp = {debug: function(A) {
        this.DEBUG = A
    },add: function(C, B) {
        if (this.isFunction(B)) {
            var A = B(this);
            if (A) {
                this[B] = A
            }
        } else {
            if (this.isPlainObject(B)) {
                this[C] = B
            }
        }
    },isFunction: function(A) {
        return Object.prototype.toString.call(A) === "[object Function]"
    },isPlainObject: function(A) {
        return A && Object.prototype.toString.call(A) === "[object Object]" && !A.nodeType && !A.setInterval
    },log: function(C, B, D) {
        try {
            if (this.DEBUG || window.top.document.location.href.indexOf("mppDebug") > -1) {
Blocked a frame with origin "http://mpp.tmall.com" from accessing a frame with origin "http://buy.tmall.com". The frame being accessed set "document.domain" to "tmall.com", but the frame requesting access did not. Both must set "document.domain" to the same value to allow access.
Blocked a frame with origin "http://mpp.tmall.com" from accessing a frame with origin "http://buy.tmall.com". The frame being accessed set "document.domain" to "tmall.com", but the frame requesting access did not. Both must set "document.domain" to the same value to allow access. (repeated 4 times)
                if (D) {
                    C = D + ": " + C
                }
                if (window.console !== undefined && console.log) {
                    console[B && console[B] ? B : "log"](C)
                }
            }
        } catch (A) {
        }
    },DOMAIN: (function() {
        var A = location.hostname;
        if (A.indexOf("taobao.net") > -1) {
            A = "taobao.net"
        } else {
            if (A.indexOf("tmall.com") > -1) {
                A = "tmall.com"
            } else {
                if (A.indexOf("tmall.net") > -1) {
                    A = "tmall.net"
                } else {
                    A = "taobao.com"
                }
            }
        }
        return A
    })(),NOTIFY_URL: (function() {
        var A = location.hostname;
        if (A.indexOf("taobao.net") > -1) {
            A = "daily.taobao.net:8080"
        } else {
            if (A.indexOf("tmall.com") > -1) {
                A = "tmall.com"
            } else {
                if (A.indexOf("tmall.net") > -1) {
                    A = "daily.tmall.net:8080"
                } else {
                    A = "taobao.com"
                }
            }
        }
        return "http://mpp." + A + "/buildconnection.do"
    })(),MAX_MESSAGE_LENGTH: 20};
Mpp.add("JSON", function(Mpp) {
    var JSON = {};
    function f(n) {
        return n < 10 ? "0" + n : n
    }
    if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function(key) {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key) {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b","\t": "\\t","\n": "\\n","\f": "\\f","\r": "\\r",'"': '\\"',"\\": "\\\\"}, rep;
    function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string) ? '"' + string.replace(escapable, function(a) {
            var c = meta[a];
            return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + string + '"'
    }
    function str(key, holder) {
        var i, k, v, length, mind = gap, partial, value = holder[key];
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
        JSON.stringify = function(value, replacer, space) {
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
            return str("", {"": value})
        }
    }
    if (typeof JSON.parse !== "function") {
        JSON.parse = function(text, reviver) {
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
                text = text.replace(cx, function(a) {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({"": j}, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
    Mpp.JSON = JSON
});
Mpp.add("Cookie", function(A) {
    A.Cookie = {get: function(C) {
            var D, B;
            if (this.isNotEmptyString(C)) {
                if ((B = document.cookie.match("(?:^| )" + C + "(?:(?:=([^;]*))|;|$)"))) {
                    D = B[1] ? decodeURIComponent(B[1]) : ""
                }
            }
            return D
        },set: function(H, C, B, G, E, F) {
            var D = encodeURIComponent(C), I = B;
            if (typeof I === "number") {
                I = new Date();
                I.setTime(I.getTime() + B * 86400000)
            }
            if (I instanceof Date) {
                D += "; expires=" + I.toUTCString()
            }
            if (this.isNotEmptyString(G)) {
                D += "; domain=" + G
            }
            if (this.isNotEmptyString(E)) {
                D += "; path=" + E
            }
            if (F) {
                D += "; secure"
            }
            document.cookie = H + "=" + D
        },remove: function(B) {
            this.set(B, "", 0)
        },isNotEmptyString: function(B) {
            return typeof B === "string" && B !== ""
        }}
});
Mpp.add("Data", function(A) {
    var C = "mpp", B = A.Cookie;
    A.Data = {NOTIFY_STATUS: {LOGOUT: 0,TIMEOUT: 1,MESSAGE: 2,CLOSED: 3},init: function() {
            B.set(C, "t=1&m=&h=0&l=" + (this.getData().l || 0), null, A.DOMAIN, "/")
        },setData: function(E) {
            var F = "", D = this.getData();
            if (D.len() >= A.MAX_MESSAGE_LENGTH) {
                A.log("The Cookie length is max error.", "error")
            } else {
                F = "t=" + E.type + "&m=" + this.__genMessage(E.message, D) + "&h=" + D.h + "&l=" + (D.l || 0);
                B.set("mpp", F, null, A.DOMAIN, "/")
            }
        },getData: function() {
            var G = B.get(C), H = {get: this.__get,len: this.__len};
            if (G) {
                var D = G.split("&");
                for (var E = 0; E < D.length; E++) {
                    var F = D[E].split("=");
                    H[F[0]] = F[1]
                }
            }
            return H
        },setHeart: function() {
            var E = "", D = this.getData();
            E = "t=" + D.t + "&m=" + D.m + "&h=" + new Date().getTime() + "&l=" + D.l;
            B.set(C, E, null, A.DOMAIN, "/")
        },getHeart: function() {
            return this.getData().h
        },clear: function() {
            B.set(C, "t=0&m=&h=" + new Date().getTime() + "&l=" + (this.getData().l || 0), null, A.DOMAIN, "/")
        },getUserNick: function() {
            var D = B.get("_nk_") || "";
            return unescape(D.replace(/\\u/g, "%u"))
        },__get: function() {
            if (this.__m) {
                return this.__m
            } else {
                var G = [], F;
                if (this.m) {
                    F = this.m.split("$");
                    for (var E = 0; E < F.length; E++) {
                        var D = F[E].split("#");
                        G.push({t1: D[0],t2: D[1]})
                    }
                    this.__m = G
                }
                return G
            }
        },__len: function() {
            if (this.__length == undefined && this.m) {
                this.__length = this.m.split("$")
            } else {
                this.__length = 0
            }
            return this.__length
        },__genMessage: function(D, K) {
            var H = "", I = K.get(), F = false, J = false;
            for (var E = 0; E < D.length; E++) {
                F = false;
                for (var G = 0; G < I.length; G++) {
                    if (I[G].t1 == D[E].t1 && I[G].t2 == D[E].t2) {
                        F = true;
                        break
                    }
                }
                if (!F) {
                    H += D[E].t1 + "#" + D[E].t2 + "$"
                }
            }
            if (K.m && K.m.length > 0) {
                H += K.m
            } else {
                H = H.substr(0, H.length - 1)
            }
            return H
        }}
});
Mpp.add("Connection", function(B) {
    var D = 35000, H = 10000, F = 5, A = 5000, G = 0, E = B.Data.NOTIFY_STATUS, C = B.Data, I = false;
    B.Connection = {start: function() {
            I = true;
            this.__heart();
            this.__createConnection()
        },stop: function() {
            I = false;
            if (this.heartTimer) {
                clearTimeout(this.heartTimer)
            }
        },__createConnection: function() {
            try {
                var K = this, L = C.getUserNick();
                if (L && L.length > 0) {
                    K.__request(B.NOTIFY_URL + "?nkh=" + encodeURIComponent(L) + "&t=" + new Date().getTime(), {onSuccess: function(M) {
                            var N = B.JSON.parse(M);
                            switch (parseInt(N.type)) {
                                case E.LOGOUT:
                                    C.setData({type: E.LOGOUT,message: []});
                                    K.stop();
                                    break;
                                case E.CLOSED:
                                    K.stop();
                                    break;
                                case E.TIMEOUT:
                                    K.__createConnection();
                                    break;
                                case E.MESSAGE:
                                    B.log("The have message:" + N.st.length);
                                    C.setData({type: E.MESSAGE,message: N.st});
                                    K.__createConnection();
                                    break
                            }
                        },onFailure: function() {
                            B.log("Comet\u94fe\u63a5\u51fa\u9519\u4e86");
                            K.__netErrorRetryConnection()
                        }})
                } else {
                    C.setData({type: E.LOGOUT,message: []});
                    K.stop()
                }
            } catch (J) {
                B.log("\u5efa\u7acb\u94fe\u63a5\u51fa\u9519:" + J);
                return false
            }
            return true
        },__netErrorRetryConnection: function() {
            var J = this;
            if (J.netErrorTimer) {
                clearTimeout(this.netErrorTimer)
            }
            J.netErrorTimer = setTimeout(function() {
                if (G++ < F) {
                    B.Connection.__createConnection()
                } else {
                    G = 0
                }
            }, H)
        },__request: function(L, N) {
            var K = this, M = K.__createHttpRequest();
            if (M) {
                if (M.overrideMimeType) {
                    M.overrideMimeType("text/javascript")
                }
                M.onreadystatechange = function() {
                    if (M.readyState === 4) {
                        if (J) {
                            clearTimeout(J);
                            J = undefined
                        }
                        if (M.status !== 304 && (M.status < 200 || M.status >= 300)) {
                            if (B.isFunction(N.onFailure)) {
                                B.log("\u51fa\u9519\u4e86\uff0c\u8fde\u63a5\u9519\u8bef\u3002");
                                N.onFailure()
                            }
                        } else {
                            if (B.isFunction(N.onSuccess)) {
                                if (M.responseText != undefined && M.responseText.length > 0) {
                                    N.onSuccess(M.responseText)
                                } else {
                                    N.onFailure()
                                }
                            }
                        }
                        M = undefined
                    }
                };
                M.open("GET", L, true);
                M.send(null);
                var J = setTimeout(function() {
                    B.log("\u8fde\u63a5\u8d85\u65f6........................");
                    try {
                        M.abort()
                    } catch (O) {
                        B.log("\u8fde\u63a5\u8d85\u65f6." + O)
                    }
                }, D)
            } else {
                alert("\u6d4f\u89c8\u5668\u592a\u8001\u4e0d\u652f\u6301Ajax\uff0c\u8bf7\u6362\u65b0\u7684\u6d4f\u89c8\u5668\u3002")
            }
        },__createHttpRequest: function() {
            var J = this;
            if (window.XMLHttpRequest) {
                return new XMLHttpRequest()
            } else {
                if (window.ActiveXObject) {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                }
            }
            return undefined
        },__heart: function() {
            var J = this;
            if (J.heartTimer) {
                clearTimeout(J.heartTimer)
            }
            if (I) {
                C.setHeart();
                J.heartTimer = setTimeout(function() {
                    J.__heart()
                }, A)
            }
            B.log("The comet heart.:" + I)
        }}
});
Mpp.add("App", function(H) {
    var D = H.Connection, C, G = 0, E = 10000, A = 3000, B = H.Data.NOTIFY_STATUS, F = {};
    H.App = {start: function(I) {
            C = {appId: I.appId,itemId: I.itemId,v: 0,c: I.c};
            if (Object.prototype.toString.apply(C.itemId) === "[object Array]") {
                var J = 0, K = C.itemId.length;
                C.v = [];
                for (; J < K; J++) {
                    F[C.itemId[J]] = J;
                    C.v.push(0)
                }
                C.itemId = C.itemId.join(",");
                C.v = C.v.join(",")
            } else {
                F[C.itemId] = 0
            }
            this.connection()
        },connection: function() {
            var I = this;
            D.__request(C.c + "?appId=" + C.appId + "&id=" + C.itemId + "&v=" + C.v + "&t=" + new Date().getTime(), {onSuccess: function(K) {
                    try {
                        var O = H.JSON.parse(K), M = C.v.toString().split(",");
                        switch (parseInt(O.type)) {
                            case B.LOGOUT:
                                break;
                            case B.CLOSED:
                                break;
                            case B.TIMEOUT:
                                I.connection();
                                break;
                            case B.MESSAGE:
                                for (var J = 0; J < O.st.length; J++) {
                                    var L = O.st[J];
                                    H.log("The have message:" + O.content);
                                    if (parseInt(M[F[L.i]]) < parseInt(L.v, "10")) {
                                        M[F[L.i]] = L.v;
                                        try {
                                            window.parent.Mpp.Notify.notify(L.t1, L.t2, H.JSON.parse(L.content))
                                        } catch (N) {
                                        }
                                    }
                                }
                                C.v = M.join(",");
                                H.log("new v:" + C.v);
                                if (G > 0) {
                                    G = 0
                                }
                                I.connection();
                                break
                        }
                    } catch (N) {
                        H.log("error:" + N.message);
                        if (G++ < E) {
                            I.connection()
                        }
                    }
                },onFailure: function() {
                    if (G++ < E) {
                        setTimeout(function() {
                            I.connection()
                        }, A)
                    }
                }})
        }}
});
Mpp.load = function() {
    var C = ["paimai.daily.taobao.net", "paimai.taobao.com", "sf.daily.taobao.net", "sf.taobao.com", "fee.ju.daily.taobao.net", "fee.ju.taobao.com", "item.daily.taobao.net", "item.taobao.com", "detail.daily.tmall.net", "detail.tmall.com"], D = /domain=([^=&]+\.[^&]+)/, G = location.search.match(D), B = ["taobao.net", "taobao.com", "tmall.net", "tmall.com"], H;
    if (G && G[1]) {
        H = G[1]
    }
    try {
        for (var F = 0; F < C.length; F++) {
            if (location.href.indexOf(C[F]) > 0) {
                if (F < 6) {
                    document.domain = C[F]
                } else {
                    document.domain = B[F - 6]
                }
                var A;
                if (!H || H !== document.domain) {
                    A = {}
                } else {
                    A = window.parent.Mpp.App.getAppParameter()
                }
                if (A.appId) {
                    Mpp.App.start(A);
                    return
                }
            }
        }
    } catch (E) {
        Mpp.log(E.message)
    }
    Mpp.Connection.start()
};
setTimeout(function() {
    try {
        Mpp.debug();
        Mpp.load()
    } catch (A) {
    }
}, 100);
