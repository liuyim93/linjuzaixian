 /*pub-1|2013-04-11 11:08:13*/(function(I) {
    var N = I.DOM, D = I.Event, A = location && (location.search || ""), F = "";
    A.indexOf("is-debug=") !== -1 && (F = A.split("is-debug=")[1].split("&")[0]);
    var O = location.host.indexOf("daily.taobao.net") > -1, C = I.mix({}, I.EventTarget), M = I.merge({}, I.EventTarget, {listen: function(Q, P, R) {
            C.on(Q, P, R)
        },broadcast: function(Q, P) {
            C.fire(Q, P)
        }}), L = {a: "\u521d\u59cb\u5316\u5b8c\u6210",b: "\u5b9d\u8d1d checkbox \u70b9\u51fb",c: "\u5e97\u94fa checkbox \u70b9\u51fb",d: "\u5168\u9009 checkbox \u70b9\u51fb",e: "\u9009\u62e9 cod checkbox \u70b9\u51fb",f: "\u5220\u9664\u5b9d\u8d1d",g: "\u6279\u91cf\u5220\u9664",h: "\u6e05\u9664\u5931\u6548\u5b9d\u8d1d",i: "\u4fee\u6539\u6570\u91cf",j: "\u6536\u85cf\u5b9d\u8d1d",k: "\u7ed3\u7b97",l: "\u4e34\u65f6\u767b\u9646",m: "\u64a4\u9500\u5220\u9664",n: "\u6e05\u7a7a\u6d4f\u89c8\u8bb0\u5f55",o: "\u52a0\u5165\u8d2d\u7269\u8f66",p: "\u4e0d\u611f\u5174\u8da3"}, H = {add_userpath: function(P) {
            window._userpath && window._userpath.push(P), this.info && this.info("userpath: %s (%s)", L[P], P)
        }}, E = function() {
        var R = 5, V;
        F.charAt(1) === "s" && I.getScript("http://assets.daily.taobao.net/apps/cart/3.0/core/logviewer.js?t=" + +(new Date)), F && (V = parseInt(F, 10)) && (R = V);
        var S = ["error", "warn", "info", "debug", "log"], U = function() {
        }, Q = [];
        window.log_cache || (window.log_cache = Q);
        var P = {};
        for (var T = 0; T < S.length; T++) {
            (function() {
                var W = S[T];
                P[W] = T >= R ? U : function() {
                    var X = I.makeArray(arguments);
                    typeof X[0] == "string" && (X[0] = "[" + this.moduleName + "] " + X[0]), Q.length < 100 && Q.push([W].concat(X));
                    if (I.UA.ie || !("console" in window) || !console[W] || !O) {
                        return
                    }
                    console[W].apply(console, X)
                }
            })()
        }
        return P
    }(), K = function() {
        var P = [], S = 0, Y, Q = !1, X, W = function() {
            Y = N.viewportHeight() + +S + N.scrollTop()
        }, U = function(a) {
            var b = a[0], Z = N.offset(b).top <= Y;
            return Z && a[1].call(a[2]), !Z
        }, R = function() {
            if (!P.length) {
                return
            }
            W();
            var Z = P.length;
            P = I.filter(P, U), Z !== P.length && this.log("[lazyload] loadEls, old length: %s, new length: %s", Z, P.length || 0)
        }, V = function(a, d, Z) {
            if (!a) {
                d.call(Z);
                return
            }
            var b = I.makeArray(arguments);
            if (b.length < 2) {
                throw Error("lazyload arguments length should be >= 2")
            }
            W();
            var c = U(b);
            c && (P.push(b), T(this))
        }, T = function(Z) {
            if (Q) {
                return
            }
            D.on(window, "scroll", function() {
                X && X.cancel(), X = I.later(R, 100, !1, Z)
            }), Q = !0
        };
        return {lazyload: V}
    }(), G = function() {
        var P = {};
        return {_getLabsConfig: function(Q) {
                return P[Q]
            },_setLabsConfig: function(Q) {
                if (!Q) {
                    return
                }
                I.mix(P, Q)
            }}
    }(), B = {once: function(T, Q, S, P, R) {
            typeof T == "string" ? (R = R || document.body, D.delegate(R, Q, T, function(U) {
                S.call(P, U), D.undelegate(R, Q, T)
            })) : D.on(T, Q, function(U) {
                S.call(P, U), D.remove(T, Q)
            })
        }}, J = I.onRequire;
    I.onRequire = function(Q) {
        if (!Q) {
            return
        }
        var S = Q.name, R = J && J(Q);
        R === undefined && (R = Q.value);
        if (I.isPlainObject(R) && R._init) {
            var P = function(T) {
                I.mix(this, T), this.moduleName = S, this._init && this._init()
            };
            I.extend(P, I.Base), I.augment(P, I.EventTarget, M, H, E, K, G, {util: B}, R), Q.value = P
        } else {
            I.mix(Q.value, E), I.mix(Q.value, {moduleName: S})
        }
        return Q.value
    }, I.Cart = {setTimeStamp: function(Q, S, R) {
            if (!Q || I.Config.debug) {
                Q = "3.0"
            }
            var P = S + "apps/cart/" + Q + "/";
            return I.config({packages: [{name: "cart",path: P,charset: "gbk",tag: R || Q}, {name: "core",path: P,charset: "gbk",tag: R || Q}, {name: "mods",path: P,charset: "gbk",tag: R || Q}]}), I
        }}
})(KISSY);
