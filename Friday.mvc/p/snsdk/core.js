 /*pub-1|2013-03-28 14:32:31*/SNS = window.SNS || {};
SNS.provide = function(A) {
    if (typeof A === "function") {
        A = A()
    }
    for (var B in A) {
        if (this[B] === undefined) {
            this[B] = A[B]
        }
    }
    return this
};
SNS.provide({isFunction: function(A) {
        return Object.prototype.toString.call(A) === "[object Function]"
    },isArray: Array.isArray || function(A) {
        return Object.prototype.toString.call(A) === "[object Array]"
    },isPlainObject: function(A) {
        return A && Object.prototype.toString.call(A) === "[object Object]" && "isPrototypeOf" in A
    },mix: function(C, B, A) {
        if (!B || !C) {
            return C
        }
        for (var D in B) {
            if (SNS.isPlainObject(B[D])) {
                if (A) {
                    C[D] = this.mix(C[D] || {}, B[D])
                } else {
                    C[D] = B[D]
                }
            } else {
                if (B[D] !== undefined) {
                    C[D] = B[D]
                }
            }
        }
        return C
    },each: function(C, D) {
        if (SNS.isArray(C)) {
            for (var B = 0; B < C.length; B++) {
                D.call(C, C[B], B)
            }
        } else {
            for (var A in C) {
                D.call(C, C[A], A)
            }
        }
    },map: function(A, D) {
        var B = [];
        for (var C = 0; C < A.length; C++) {
            B[C] = D(A[C])
        }
        return B
    }});
if (!window.console) {
    window.console = {};
    window.console.log = function(A) {
    }
}
SNS.provide(function() {
    var B = location.search.indexOf("sns-debug") !== -1;
    var A = {log: function(C) {
            if (B) {
                window.console && console.log(C)
            }
        },isDebug: function() {
            return B
        },guid: function() {
            return "sns" + (Math.random() * (1 << 30)).toString(16).replace(".", "")
        }};
    A.extend = function(D, F) {
        var C = Object.create || function(G) {
            function H() {
            }
            H.prototype = G;
            return new H()
        };
        function E() {
            D.apply(this, arguments)
        }
        E.prototype = C(D.prototype);
        SNS.mix(E.prototype, F);
        E.prototype.constructor = E;
        E.superclass = D.prototype;
        E.extend = function(G) {
            return A.extend(this, G)
        };
        return E
    };
    A.buildURI = function() {
        var C = Array.prototype.slice.call(arguments);
        if (C.length < 2) {
            return C[0] || ""
        }
        var D = C.shift();
        D += D.indexOf("?") > 0 ? "&" : "?";
        return D + C.join("&").replace(/&+/g, "&")
    };
    A.addParams = A.buildURI;
    return A
});
SNS.provide(function() {
    var B = location.hostname.indexOf(".daily.") !== -1 || location.protocol == "file:";
    var A = {isDaily: function() {
            return B
        },domain: {assets: B ? "assets.daily.taobao.net" : "a.tbcdn.cn",server: B ? "daily.taobao.net" : "taobao.com"},isTBDomain: function() {
            return location.hostname.indexOf(".taobao.") !== -1
        },normalize: function(C) {
            if (A.isDaily()) {
                C = C.replace("a.tbcdn.cn", "assets.daily.taobao.net").replace("taobao.com", "daily.taobao.net")
            } else {
                C = C.replace("assets.daily.taobao.net", "a.tbcdn.cn").replace("daily.taobao.net", "taobao.com")
            }
            return C
        }};
    return A
});
SNS.provide(function() {
    var A = {SM: function() {
            if (!window.UA_Opt || !window.ua) {
                window.ua = "";
                window.UA_Opt = {LogVal: "ua",MaxMCLog: 2,MaxMPLog: 2,MaxKSLog: 2,Token: new Date().getTime() + ":" + Math.random(),SendMethod: 8,Flag: 14222};
                KISSY.getScript("http://acjs.aliyun.com/actionlog/js/ua.js", function() {
                    try {
                        UA_Opt.reload()
                    } catch (B) {
                    }
                }, "GBK")
            }
        },UA: function() {
            SNS.SM();
            var B = window.ua;
            UA_Opt.Token = new Date().getTime() + ":" + Math.random();
            UA_Opt.reload();
            return B
        }};
    return A
});
SNS.provide(function() {
    var K = SNS;
    var E = location.hostname.indexOf("taobao.net") > -1 ? "http://assets.daily.taobao.net/p" : "http://a.tbcdn.cn/p";
    var L = {base: "",alias: {base: E + "/snsdk",sns: E + "/snsdk/src"},map: [],load: [],timestamp: Math.floor(new Date().getTime() / 86400000 / 3),skin: true};
    var H = {};
    var I;
    function J(V, T) {
        if (K.isFunction(V)) {
            T = V;
            V = []
        }
        if (!T) {
            return
        }
        var R = B();
        var U = R ? R.src : I;
        var U = U || "";
        H[U] = H[U] || {};
        K.mix(H[U], {url: U,deps: V,factory: T})
    }
    function F(V, W, T) {
        if (K.isFunction(V)) {
            W = V;
            V = []
        } else {
            if (typeof V === "string") {
                V = V.replace(/\s+/g, "");
                V = V.split(",")
            }
        }
        if (!V || V.length == 0) {
            W && W();
            return
        }
        T = T || {url: location.href};
        var U = 0;
        var R = [];
        K.each(V, function(Y, X) {
            O(Y, function(Z) {
                R[X] = Z;
                if (++U === V.length) {
                    W && W.apply(undefined, R)
                }
            }, T)
        })
    }
    function O(X, W, V) {
        if (X == null) {
            return W(null)
        }
        for (var U = 0; U < L.load.length; U++) {
            if (L.load[U](X, W, V)) {
                return
            }
        }
        var R = P(X, V && V.url);
        var T = H[R] = H[R] || {url: R};
        if (T.callbacks) {
            if (T.state == "complete") {
                W && W(T.exports)
            } else {
                W && T.callbacks.push(W)
            }
            return
        }
        T.id = X;
        T.callbacks = [W];
        A(R, function() {
            if (H[""]) {
                K.mix(T, H[""]);
                H[""] = null
            }
            T.url = R;
            F(T.deps, function() {
                T.exports = C(T, arguments);
                T.state = "complete";
                K.each(T.callbacks, function(Y) {
                    Y(T.exports)
                })
            }, T)
        })
    }
    function C(U, T) {
        if (U.url.indexOf(".css") > -1) {
            return
        } else {
            if (K.isFunction(U.factory)) {
                var R = U.factory.apply(U, T);
                if (K.isFunction(R)) {
                    R.prototype.name = U.id.split("/").slice(-1).join("")
                }
                return R
            } else {
                return U.factory
            }
        }
    }
    function P(R, T) {
        T = T || D.base;
        if (R.indexOf("http://") === 0 || R.indexOf("https://") === 0) {
            return R
        }
        K.each(L.alias, function(V, U) {
            if (R == U) {
                R = V
            } else {
                if (R.indexOf(U + "/") == 0) {
                    R = R.replace(U, V)
                }
            }
        });
        K.each(L.map, function(V, U) {
            if (K.isFunction(V)) {
                R = V(R)
            } else {
                if (K.isArray(V)) {
                    R = R.replace(V[0], V[1])
                }
            }
        });
        if (R.indexOf("./") === 0) {
            arr = T.split("/");
            R = arr.slice(0, arr.length - 1).concat(R.slice(2)).join("/")
        }
        if (R.indexOf("../") === 0) {
            arr = T.split("/");
            R = arr.slice(0, arr.length - 2).concat(R.slice(2)).join("/")
        }
        if (R.indexOf("http") != 0) {
            R = L.base + R
        }
        R = R.replace(/([^:\/])\/+/g, "$1/");
        if (R.indexOf(".css") == -1 && R.indexOf("?") == -1 && R.indexOf("#") == -1) {
            R += ".js"
        }
        R += "?t=" + L.timestamp;
        return R
    }
    function A(R, T) {
        I = R;
        G(R, T);
        I = null
    }
    function B() {
        if (document.attachEvent) {
            var R = document.getElementsByTagName("script");
            for (i = R.length - 1; i >= 0; i--) {
                if (R[i].readyState === "interactive") {
                    return R[i]
                }
            }
        }
    }
    var N = document.getElementsByTagName("head")[0];
    function G(T, U) {
        if (T.indexOf(".css") > -1) {
            return M(T, U)
        }
        var R = document.createElement("script");
        R.type = "text/javascript";
        R.async = true;
        if (R.attachEvent) {
            R.attachEvent("onreadystatechange", function() {
                if (R.readyState === "loaded" || R.readyState === "complete") {
                    U && U()
                }
            })
        } else {
            R.addEventListener("load", U, false);
            R.addEventListener("error", U, false)
        }
        R.src = T;
        N.insertBefore(R, N.firstChild);
        return R
    }
    function M(T, V) {
        var R = typeof opera !== "undefined" && opera.toString() === "[object Opera]";
        var U = document.createElement("link");
        U.type = "text/css";
        U.rel = "stylesheet";
        if (U.attachEvent || R) {
            U.onload = U.onerror = V
        } else {
            Q(U, V)
        }
        U.href = T;
        N.appendChild(U)
    }
    function Q(V, X) {
        if (V.sheet) {
            V._checkCounter = V._checkCounter || 0;
            var W = document.styleSheets;
            for (var U = 0; U < W.length; U++) {
                var T = W[U];
                var R = T.ownerNode ? T.ownerNode : T.owningElement;
                if (R && R == V || V._checkCounter++ > 100) {
                    X();
                    return
                }
            }
        }
        window.setTimeout(Q, 10, V, X)
    }
    var D = function(R, V) {
        var U = {};
        if (arguments.length >= 2) {
            U[R] = V
        } else {
            if (K.isPlainObject(R)) {
                U = R
            } else {
                return L[R]
            }
        }
        for (var T in U) {
            if (K.isPlainObject(L[T])) {
                K.mix(L[T], U[T])
            } else {
                if (K.isArray(L[T])) {
                    L[T] = L[T].concat(U[T])
                } else {
                    L[T] = U[T]
                }
            }
        }
    };
    F.resolve = P;
    return {define: J,require: F,modules: H,configs: L,config: D}
});
(function() {
    SNS.config({load: function(A, B) {
            if (A.indexOf("kissy/") !== 0) {
                return
            }
            if (A == "kissy/overlay" && window.KISSY && KISSY.version < "1.2.0") {
                return
            }
            S.use(A.slice(6), function(D, C) {
                B(C)
            });
            return true
        }})
})();
(function() {
    SNS.config({load: function(C, B, A) {
            if (C.indexOf(".css") > -1 && A.skin === null) {
                B();
                return true
            }
        }})
})();
SNS.provide(function() {
    function B(D) {
        var C = this;
        C.__init(D)
    }
    B.extend = function(C) {
        return SNS.extend(B, C)
    };
    SNS.mix(B.prototype, {name: "widget",baseClassName: "sns",configs: {ui: {},callback: {}},__init: function(C) {
            this._createWidget(C)
        },_createWidget: function(C) {
            this._initConfigs(C);
            this._createElement(this.configs.element || this.configs.ui.element);
            this._create();
            this._trigger("create", this.configs);
            this._init();
            this._trigger("init", this.configs);
            this._addConfigListener()
        },_initConfigs: function(C) {
            var E = SNS.mix({}, B.prototype.configs, true);
            var D = SNS.mix(E, this.configs, true);
            this.configs = SNS.mix(D, C, true)
        },_setConfigs: function(E) {
            var C = this;
            for (var D in E) {
                C._setConfig(D, E[D])
            }
            return this
        },_setConfig: function(C, D) {
            this.configs[C] = D;
            return this
        },_createElement: function(C) {
            if (C && SNS.isFunction(C)) {
                this.element = C()
            } else {
                if (C) {
                    this.element = KISSY.DOM.get(C)
                }
            }
            if (this.element) {
                KISSY.DOM.addClass(this.element, "sns-" + this.name);
                KISSY.DOM.addClass(this.element, "sns-widget-ui")
            }
            this.element && (this.element.__sns_widget = this)
        },_create: function() {
        },_init: function() {
        },_addConfigListener: function() {
            var D = this.listeners;
            var E = this, G, I, F, C, H;
            for (var G in D) {
                C = D[G];
                (function(J, K) {
                    KISSY.Event.on(E.element, J, function() {
                        K.apply(E, arguments)
                    })
                })(G, C)
            }
        },destroy: function() {
            if (this.element) {
                KISSY.Event.detach(this.element);
                KISSY.DOM.removeData(this.element, "data-" + this.baseClassName);
                KISSY.DOM.removeClass(this.element, this.baseClassName)
            }
            this.hide();
            this._trigger("destroy")
        },config: function(C, D) {
            var E = C;
            if (arguments.length === 0) {
                return SNS.mix({}, this.configs)
            }
            if (typeof C === "string") {
                if (D === undefined) {
                    return this.configs[C]
                }
                E = {};
                E[C] = D
            }
            this._setConfigs(E);
            return this
        },show: function() {
            if (this.element) {
                this.element.style.display = ""
            }
            this._trigger("show")
        },hide: function() {
            if (this.element) {
                this.element.style.display = "none"
            }
            this._trigger("hide")
        },_trigger: function(C, D) {
            var E = this.configs.callback[C];
            SNS.isFunction(E) && E.call(this, D)
        },$: function(C) {
            return KISSY.all(this.element).all(C)
        }});
    var A = function(D, C) {
        if (SNS.isFunction(D)) {
            SNS.extend(D, C);
            return
        }
        return B.extend(D)
    };
    return {createWidget: A}
});
SNS.provide(function() {
    var A = function(C, E, F) {
        if (C == null) {
            return
        } else {
            if (!(/^sns/.test(C))) {
                C = "sns/widget/" + C
            }
        }
        if (SNS.isFunction(E)) {
            F = E;
            E = {}
        }
        E = SNS.mix({}, E, true);
        E.name = C;
        E.ui = E.ui || {};
        E.callback = E.callback || {};
        var D = E.element || E.ui.element || document.body;
        if (KISSY.DOM.test(D, "iframe") || E.ui.isIframe === true) {
            SNS.require(["sns/core/iframecross"], function(G) {
                G.crossByIframe(D, E, F)
            });
            return true
        }
        if (E.skin === null || E.ui.skin === null) {
            var B = SNS.require.resolve(E.name);
            SNS.modules[B] = SNS.modules[B] || {};
            SNS.modules[B].skin = null
        }
        SNS.require(C, function(G) {
            var H = new G(E);
            F && F(H)
        })
    };
    return {ui: A}
});
SNS.config("logintime", new Date().getTime());
SNS.provide({checkLogin: function() {
        if (location.href.indexOf("taobao") == -1) {
            return false
        }
        var C = function(F) {
            var E, D;
            if ((D = String(document.cookie).match(new RegExp("(?:^| )" + F + "(?:(?:=([^;]*))|;|$)")))) {
                E = D[1] ? decodeURIComponent(D[1]) : ""
            }
            return E
        };
        var B = C("_l_g_") && C("_nk_") || C("ck1") && C("tracknick");
        var A = (new Date().getTime() - SNS.config("logintime")) / (1000 * 60);
        if (A > 30) {
            B = false
        }
        return !!B
    },_getDOMToken: function() {
        var A = document.getElementsByName("_tb_token_")[0];
        if (A && A.value) {
            return A.value
        }
    },_setDOMToken: function(B) {
        var A = document.getElementsByName("_tb_token_");
        if (!A) {
            A = document.createElement("input");
            A.type = "hidden";
            A.name = "_tb_token_";
            document.body.appendChild(A)
        }
        A.value = B
    },fetchToken: function(F, E) {
        var C = "_tb_token_";
        var D = this;
        var B = SNS.config("token") || SNS._getDOMToken();
        if (B && !E) {
            F && F(B);
            return
        }
        if (SNS.isTBDomain() || E) {
            SNS.ajax({_fetchToken: true,url: "http://comment.jianghu.taobao.com/json/token.htm",success: function(G) {
                    G = G && G.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
                    SNS.config("token", G);
                    D._setDOMToken(G);
                    F && F(G)
                }})
        } else {
            if (!SNS.isTBDomain() || E) {
                var A;
                if ((location.hostname.indexOf(".daily.") !== -1) || location.protocol == "file:") {
                    A = "http://comment.jianghu.daily.taobao.net/json/token.htm"
                } else {
                    A = "http://comment.jianghu.taobao.com/json/token.htm"
                }
                SNS.ajax({use: "jsonp",dataType: "jsonp",url: A,data: {_fetchToken: true},success: function(H) {
                        var G = H.token;
                        SNS.config("token", G);
                        D._setDOMToken(G);
                        F && F(G)
                    }})
            } else {
                F && F("")
            }
        }
    },login: function(F, E) {
        var D = 340, A = 360, C, B;
        if (SNS.checkLogin() && !E) {
            F && F();
            return
        }
        if (!SNS.isTBDomain()) {
            B = true
        }
        SNS.ui("login", {logintime: SNS.config("logintime"),force: E || false,ui: {isIframe: B,type: "iframePopup",isIframeShow: false,width: D,height: A},callback: {check: function(G) {
                    if (G.isLogin) {
                        F && F()
                    } else {
                        if (C && C.style) {
                            C.style.display = "block"
                        }
                    }
                },success: function() {
                    F && F()
                }}}, function(G) {
            C = G
        })
    }});
SNS.provide(function() {
    var A = {};
    A.goldlog = function(B) {
        new Image().src = "http://log.mmstat.com/" + B + "?cache=" + new Date().getTime()
    };
    A.storage = function(B, C) {
        if (window.localStorage) {
            if (arguments.length > 1) {
                localStorage.setItem(B, C)
            } else {
                return localStorage.getItem(B)
            }
        } else {
            var E = document.documentElement;
            try {
                if (!E.style.behavior) {
                    E.style.behavior = "url(#default#userData)"
                }
                if (arguments.length > 1) {
                    E.setAttribute(B, C);
                    E.save("sns")
                } else {
                    E.load("sns");
                    return E.getAttribute(B)
                }
            } catch (D) {
            }
        }
    };
    A.removeStorage = function(B) {
        if (window.localStorage) {
            return localStorage.removeItem(B)
        } else {
            var D = document.documentElement;
            try {
                if (!D.style.behavior) {
                    D.style.behavior = "url(#default#userData)"
                }
                D.save("sns", false, -365)
            } catch (C) {
            }
        }
    };
    A.alert = function(E, F, D, B, C) {
        var C = C || {};
        SNS.ui("sns/core/alert", {msg: E,callback: F,autoHide: B,customCls: D,ui: {width: C.width || 900,height: C.height || 400,type: "iframePopup"}})
    };
    A.confirm = function(D, E, C, B) {
        var B = B || {};
        SNS.ui("sns/core/confirm", {msg: D,callback: E,customCls: C,ui: {width: B.width || 900,height: B.height || 400,type: "iframePopup"}})
    };
    A.fixHover = function(B, C) {
        if (KISSY.UA.ie <= 6) {
            C = C || "hover";
            KISSY.DOM.query(B).each(function(D) {
                KISSY.Event.on(D, "mouseenter", function() {
                    KISSY.DOM.addClass(D, C)
                });
                KISSY.Event.on(D, "mouseleave", function() {
                    KISSY.DOM.removeClass(D, C)
                })
            })
        }
    };
    SNS.each({api: "sns/core/api",ajax: "sns/core/ajax",get: "sns/core/ajax",post: "sns/core/ajax",overlayAdapt: "sns/core/overlay",placeholder: "placeholder" in document.createElement("input") ? "" : "sns/util/placeholder",maxlength: "maxLength" in document.createElement("textarea") ? "" : "sns/util/maxlength"}, function(C, B) {
        A[B] = function() {
            if (C == "") {
                return
            }
            var D = arguments;
            SNS.require(C, function(E) {
                var F = E[B] || E;
                F.apply(E, D)
            })
        }
    });
    return A
});
SNS.provide(function() {
    var READYTYPE = "sns-widget", WPTYPE = "J_TWidget", CLICKTYPE = "sns-widget-click";
    function initWidgetFun(configs) {
        return function(widget) {
            if (widget) {
                new widget(configs)
            }
        }
    }
    function safeEval(str) {
        var window, top, parent, self, document, location, SNS, KISSY, safeEval, open, XMLHttpRequest, ActiveXObject;
        return eval(str)
    }
    function active(target) {
        if (target._sns_widget_init) {
            return
        }
        target._sns_widget_init = true;
        var attrs = target.attributes;
        for (var j = 0; j < attrs.length; j++) {
            var attrName = attrs[j].name;
            var attrValue = attrs[j].value;
            if (/^data-/.test(attrName)) {
                var configs = attrValue && safeEval("(" + attrValue + ")");
                configs.element = target;
                SNS.ui(attrName.slice(5).replace("-", "/"), configs)
            }
        }
    }
    ready(function() {
        setTimeout(function() {
            var targets = getElementByClassName(READYTYPE);
            for (var i = 0; i < targets.length; i++) {
                active(targets[i])
            }
        })
    });
    function getElementByClassName(clazz) {
        if (document.getElementsByClassName) {
            return document.getElementsByClassName(clazz)
        } else {
            if (document.querySelectorAll) {
                return document.querySelectorAll("." + clazz)
            } else {
                var ret = [];
                var els = document.getElementsByTagName("*");
                for (var i = 0; i < els.length; i++) {
                    if (hasClass(els[i], clazz)) {
                        ret.push(els[i])
                    }
                }
                return ret
            }
        }
    }
    function hasClass(els, clazz) {
        return (" " + els.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + clazz + " ") > -1
    }
    function ready(callback) {
        var isReady = false;
        ready0(function() {
            if (isReady) {
                return
            }
            callback();
            isReady = true
        })
    }
    function ready0(callback) {
        var doc = document, win = window;
        if (doc.readyState === "complete") {
            callback()
        } else {
            if (doc.addEventListener) {
                doc.addEventListener("DOMContentLoaded", callback, false);
                win.addEventListener("load", callback, false)
            } else {
                function stateChange() {
                    if (doc.readyState === "complete") {
                        callback()
                    }
                }
                doc.attachEvent("onreadystatechange", stateChange);
                win.attachEvent("onload", callback);
                var doScroll = doc.documentElement.doScroll;
                if (doScroll) {
                    function readyScroll() {
                        try {
                            doScroll("left");
                            callback()
                        } catch (ex) {
                            setTimeout(readyScroll, 40)
                        }
                    }
                    readyScroll()
                }
            }
        }
    }
    return {active: active}
});
SNS.provide(function() {
    if (window.KISSY) {
        return
    }
    var B = ["require", "ui", "fixHover"];
    var G = {};
    SNS.each(B, function(H) {
        G[H] = SNS[H];
        SNS[H] = function() {
            var J = this, I = arguments;
            E(function() {
                G[H].apply(J, I)
            })
        }
    });
    var F = "http://a.tbcdn.cn/s/kissy/1.2.0/kissy-min.js";
    var D = null;
    function E(H) {
        if (window.KISSY) {
            C(H);
            return
        }
        if (D != null) {
            D.push(H);
            return
        }
        D = [H];
        setTimeout(function() {
            if (window.KISSY) {
                return C()
            }
            A(F, function() {
                KISSY.Config.base = F.substring(0, F.lastIndexOf("/") + 1);
                C()
            })
        }, 10)
    }
    function C(I) {
        SNS.each(B, function(J) {
            SNS[J] = G[J]
        });
        for (var H = 0; H < D.length; H++) {
            D[H]()
        }
        I && I()
    }
    function A(I, K) {
        var H = document.createElement("script");
        H.type = "text/javascript";
        H.charset = "utf-8";
        H.async = true;
        if (H.attachEvent) {
            H.attachEvent("onreadystatechange", function() {
                if (H.readyState === "loaded" || H.readyState === "complete") {
                    K && K()
                }
            })
        } else {
            H.addEventListener("load", K, false);
            H.addEventListener("error", K, false)
        }
        H.src = I;
        var J = document.getElementsByTagName("head")[0];
        J.insertBefore(H, J.firstChild);
        return H
    }
});
