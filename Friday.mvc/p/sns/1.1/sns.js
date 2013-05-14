/*pub-1|2012-12-24 20:54:08*/
(function (C, A) {
    var B = function (D, E, F) {
        B.Loader.run(D, E, F);
        return B
    };
    A.mix(B, {
        version: 1.1,
        add: function (D, F, E) {
            if (A.isFunction(F)) {
                E = F;
                F = []
            }
            if (!D) {
                throw new Error("name is null")
            }
            B.Loader.run(D, E, F)
        },
        use: function (D, E) {
            if (A.isFunction(D)) {
                D(this);
                return
            }
            E = E ? E : function () { };
            B.Loader.run(E, D, true)
        },
        namespace: function () {
            return A.namespace.apply(this, arguments)
        },
        log: function (E, D) {
            A.log(arguments)
        }
    });
    B.namespace("util", "data", "widget", "sys", "app", "tool");
    B.defaultConfig = {
        isDebug: false,
        basePath: "http://a.tbcdn.cn/p/sns/1.1",
        combo: true,
        preloads: {},
        timestamp: false
    };
    C.SNS = B
})(window, KISSY);
(function (G, O) {
    var N = 1,
		H = 2,
		D = 4,
		J = 0,
		L = {
		    production: "http://a.tbcdn.cn",
		    daily: "http://assets.daily.taobao.net"
		}, Q = SNS.defaultConfig.basePath + "/timestamp.js?" + new Date().getTime() + ".js";

    function P(K) {
        if (location.hostname.indexOf("daily") !== -1) {
            return K.replace(L.production, L.daily)
        } else {
            return K
        }
    }
    function M(R, S) {
        var K = window.localStorage,
			U = document.documentElement;
        if (K) {
            if (S) {
                K.setItem(R, S)
            } else {
                return K.getItem(R)
            }
        } else {
            try {
                if (!U.style.behavior) {
                    U.style.behavior = "url(#default#userData)"
                }
                if (S) {
                    U.setAttribute(R, S);
                    U.save("sns")
                } else {
                    U.load("sns");
                    return U.getAttribute(R)
                }
            } catch (T) { }
        }
    }
    function F(K) {
        return 20121224
    }
    function C(K) {
        if (K) {
            M("snsInterval", K)
        } else {
            return M("snsInterval") || 1
        }
    }
    function E(T) {
        var R = M("snsLastModifiy"),
			S = new Date().getTime(),
			K = C();
        if (!R || (R && ((S - R) > 1000 * 60 * K))) {
            O.getScript(P(Q), {
                success: function () {
                    T();
                    M("snsLastModifiy", S)
                },
                error: function () {
                    T()
                }
            })
        } else {
            T()
        }
    }
    function I(K, R, S) {
        this.fn = R || function () { };
        this.childs = S || [];
        this.parents = [];
        this.name = K || "MOD[" + (J++) + "]";
        this.status = N
    }
    I.prototype = {
        addParent: function (K) {
            if (K.name == this.name) {
                return
            }
            this.parents.push(K);
            K.childs.push(this)
        },
        hasParent: function () {
            return this.parents.length > 0
        },
        _notify: function () {
            var S, R, K = this.parents.length;
            for (R = 0; R < K; R++) {
                S = this.parents[R];
                S.complete()
            }
        },
        isReady: function () {
            var R, S, K = true;
            for (R = 0; R < this.childs.length; R++) {
                S = this.childs[R];
                if (!S.isAttached()) {
                    K = false;
                    break
                }
            }
            return K
        },
        ready: function () {
            this.run();
            this._notify()
        },
        complete: function () {
            this.status = H;
            if (this.isReady()) {
                this.ready()
            }
        },
        isAttached: function () {
            return this.status == D
        },
        run: function () {
            KISSY.log(this.name + " run");
            this.status = D;
            this.fn(SNS, KISSY)
        }
    };
    var A = {
        mods: {},
        add: function (K) {
            var R = this.get(K.name);
            if (R) {
                R.fn = K.fn;
                R.mixed = true
            } else {
                R = K;
                this.mods[K.name] = R
            }
            return R
        },
        get: function (K) {
            return this.mods[K]
        }
    };
    var B = {
        run: function (K, R, S) {
            if (SNS.defaultConfig.timestamp) {
                E(function () {
                    B._run(K, R, S)
                })
            } else {
                B._run(K, R, S)
            }
        },
        _run: function (R, V, X) {
            var a, S, Y = [],
				W, K, U, T, Z = this;
            if (O.isFunction(R)) {
                X = V;
                V = R;
                R = undefined
            }
            if (!V) {
                return
            }
            R && (R = R.toLowerCase());
            X = X ? X : [];
            if (O.isString(X)) {
                X = X.split(",")
            }
            a = A.add(new I(R, V));
            for (U = 0; U < X.length; U++) {
                W = X[U].toLowerCase();
                if (O.trim(W) == "") {
                    continue
                }
                S = A.get(W);
                if (S) {
                    S.addParent(a)
                } else {
                    S = A.add(new I(W));
                    S.addParent(a);
                    Y.push(W)
                }
            }
            if (Y.length != 0) {
                if (SNS.defaultConfig.combo && Y.length != 1) {
                    K = Z.combo(Y);
                    Z._load(K)
                } else {
                    for (T = 0; T < Y.length; T++) {
                        K = Z.nameToPath(Y[T]);
                        Z._load(K)
                    }
                }
            }
            if (!a.isAttached()) {
                a.complete()
            }
        },
        _load: function (K) {
            window.setTimeout(function () {
                O.getScript(P(K), {
                    success: function () { },
                    failure: function () {
                        O.log(K + " is failure")
                    },
                    timeout: function () {
                        O.log(K + " is timeout")
                    }
                })
            }, 0)
        },
        nameToPath: function (R) {
            var K = R.split(".");
            if (K[0].toLowerCase() === "sns") {
                K.splice(0, 1)
            }
            var S = F();
            return SNS.defaultConfig.basePath + "/" + K.join("/") + ".js?t=" + S + ".js"
        },
        combo: function (U) {
            var R, T = F(),
				K = SNS.defaultConfig.basePath + "/??";
            for (var S = 0; S < U.length; S++) {
                R = U[S].split(".");
                if (R[0].toLowerCase() === "sns") {
                    R.splice(0, 1)
                }
                K += R.join("/") + ".js";
                if (S == U.length - 1) {
                    K += "?t=" + T + ".js"
                } else {
                    K += ","
                }
            }
            return K
        }
    };
    G.Loader = B;
    G.timeStamp = F;
    G.interval = C
})(SNS, KISSY);
KISSY.ready(function (A) {
    A.later(function () {
        SNS.use(["SNS.Preload"])
    })
});