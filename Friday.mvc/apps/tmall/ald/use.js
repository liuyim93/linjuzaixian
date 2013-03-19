(function (A, C) {
    if (A.use) {
        return
    }
    var F = {
        common: {},
        "03028": {
            t: "20120711"
        },
        "03032": {
            t: "20121021"
        },
        "03013": {
            t: "20120710"
        },
        "03035": {
            t: "20120907"
        },
        "03036": {
            t: "20120718"
        },
        "03037": {
            t: "20120718"
        },
        "03031": {
            t: "20120713"
        },
        "07001": {
            t: "20120710"
        },
        "03039": {
            t: "20121024"
        },
        "03042": {
            t: "20121210"
        },
        "03044": {
            t: "20121021"
        },
        "03046": {
            t: "20121228"
        },
        "03047": {
            t: "20130116"
        },
        "03048": {
            t: "20130116"
        },
        "03054": {
            t: "20130203"
        }
    };
    var E = {};
    var B = A.TIMESTAMP;
    var D = A.BASEURL;
    var H = function (K) {
        var J = F[K];
        if (J && !J.configed) {
            var I = J.inherit;
            if (I in F) {
                H(I);
                J = C.merge(F[I], J)
            }
            if (!("render" in J)) {
                J.render = K
            }
            if (!("t" in J)) {
                J.t = B
            }
            J.configed = true;
            F[K] = J
        }
        return J
    };
    var G = function (J, L, N) {
        if (!J) {
            return
        }
        J = J + "." + L;
        if (J in E) {
            return
        }
        E[J] = true;
        var I = D + "/mods/" + J + "?" + N;
        var O = document;
        var M;
        if ("js" === L) {
            M = O.createElement("script");
            M.async = true;
            M.src = I
        } else {
            M = O.createElement("link");
            M.rel = "stylesheet";
            M.href = I
        }
        M.charset = "gbk";
        var K = O.getElementsByTagName("head")[0];
        K.insertBefore(M, K.firstChild)
    };
    A.use = function (J) {
        if (!(J in F)) {
            C.log("\u6307\u5b9a\u7684appId(" + J + ")\u672a\u914d\u7f6e\uff0c\u65e0\u6cd5use");
            return false
        }
        var I = H(J);
        G(I.style, "css", I.t);
        G(I.render, "js", I.t);
        return true
    };
    A.getModuleConfig = function (I) {
        return H(I)
    }
})(ALD.util, KISSY); 