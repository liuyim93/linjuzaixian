(function (A) {
    var D = function () {
        var F = [].slice.call(arguments);
        F.push(D.options);
        if (F[0].match(/^\s*#([\w:\-\.]+)\s*$/igm)) {
            F[0].replace(/^\s*#([\w:\-\.]+)\s*$/igm, function (I, J) {
                var G = document;
                var H = G && G.getElementById(J);
                F[0] = H ? (H.value || H.innerHTML) : I
            })
        }
        if (arguments.length == 1) {
            return D.compile.apply(D, F)
        }
        if (arguments.length >= 2) {
            return D.to_html.apply(D, F)
        }
    };
    var E = {
        escapehash: {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            '"': "&quot;",
            "'": "&#x27;",
            "/": "&#x2f;"
        },
        escapereplace: function (F) {
            return E.escapehash[F]
        },
        escaping: function (F) {
            return typeof (F) !== "string" ? F : F.replace(/[&<>"]/igm, this.escapereplace)
        },
        detection: function (F) {
            return typeof (F) === "undefined" ? "" : F
        }
    };
    var C = function (F) {
        if (console) {
            if (console.warn) {
                console.warn(F);
                return
            }
            if (console.log) {
                console.log(F);
                return
            }
        }
        throw (F)
    };
    var B = function (I, G) {
        I = I !== Object(I) ? {} : I;
        if (I.__proto__) {
            I.__proto__ = G;
            return I
        }
        var H = function () { };
        var J = Object.create ? Object.create(G) : new (H.prototype = G, H);
        for (var F in I) {
            if (I.hasOwnProperty(F)) {
                J[F] = I[F]
            }
        }
        return J
    };
    D.__cache = {};
    D.version = "0.5.2-stable";
    D.settings = {};
    D.tags = {
        operationOpen: "{@",
        operationClose: "}",
        interpolateOpen: "\\${",
        interpolateClose: "}",
        noneencodeOpen: "\\$\\${",
        noneencodeClose: "}",
        commentOpen: "\\{#",
        commentClose: "\\}"
    };
    D.options = {
        cache: true,
        strip: true,
        errorhandling: true,
        detection: true,
        _method: B({
            __escapehtml: E,
            __throw: C
        }, this)
    };
    D.tagInit = function () {
        var F = D.tags.operationOpen + "each\\s*([\\w\\.]*?)\\s*as\\s*(\\w*?)\\s*(,\\s*\\w*?)?" + D.tags.operationClose;
        var H = D.tags.operationOpen + "\\/each" + D.tags.operationClose;
        var I = D.tags.operationOpen + "if\\s*([^}]*?)" + D.tags.operationClose;
        var J = D.tags.operationOpen + "\\/if" + D.tags.operationClose;
        var N = D.tags.operationOpen + "else" + D.tags.operationClose;
        var O = D.tags.operationOpen + "else if\\s*([^}]*?)" + D.tags.operationClose;
        var K = D.tags.interpolateOpen + "([\\s\\S]+?)" + D.tags.interpolateClose;
        var L = D.tags.noneencodeOpen + "([\\s\\S]+?)" + D.tags.noneencodeClose;
        var M = D.tags.commentOpen + "[^}]*?" + D.tags.commentClose;
        var G = D.tags.operationOpen + "each\\s*(\\w*?)\\s*in\\s*range\\((\\d+?)\\s*,\\s*(\\d+?)\\)" + D.tags.operationClose;
        D.settings.forstart = new RegExp(F, "igm");
        D.settings.forend = new RegExp(H, "igm");
        D.settings.ifstart = new RegExp(I, "igm");
        D.settings.ifend = new RegExp(J, "igm");
        D.settings.elsestart = new RegExp(N, "igm");
        D.settings.elseifstart = new RegExp(O, "igm");
        D.settings.interpolate = new RegExp(K, "igm");
        D.settings.noneencode = new RegExp(L, "igm");
        D.settings.inlinecomment = new RegExp(M, "igm");
        D.settings.rangestart = new RegExp(G, "igm")
    };
    D.tagInit();
    D.set = function (G, J) {
        var I = this;
        var F = function (L) {
            return L.replace(/[\$\(\)\[\]\+\^\{\}\?\*\|\.]/igm, function (M) {
                return "\\" + M
            })
        };
        var K = function (M, N) {
            var L = M.match(/^tag::(.*)$/i);
            if (L) {
                I.tags[L[1]] = F(N);
                I.tagInit();
                return
            }
            I.options[M] = N
        };
        if (arguments.length === 2) {
            K(G, J);
            return
        }
        if (G === Object(G)) {
            for (var H in G) {
                if (G.hasOwnProperty(H)) {
                    K(H, G[H])
                }
            }
        }
    };
    D.register = function (H, G) {
        var F = this.options._method;
        if (F.hasOwnProperty(H)) {
            return false
        }
        return F[H] = G
    };
    D.unregister = function (G) {
        var F = this.options._method;
        if (F.hasOwnProperty(G)) {
            return delete F[G]
        }
    };
    D.template = function (F) {
        var G = this;
        this.options = F;
        this.__interpolate = function (H, M, K) {
            var J = H.split("|"),
				L = "",
				I;
            if (J.length > 1) {
                H = J.shift();
                I = J.shift().split(",");
                if (I.length > 1) {
                    L = "_method." + I.shift() + ".call({}, " + [H].concat(I) + ")"
                } else {
                    L = "_method." + I[0] + "(" + H + ")"
                }
            } else {
                L = H
            }
            return "<%= " + (M ? "_method.__escapehtml.escaping" : "") + "(" + (!K || K.detection !== false ? "_method.__escapehtml.detection" : "") + "(" + L + ")) %>"
        };
        this.__removeShell = function (I, H) {
            var J = 0;
            I = I.replace(D.settings.forstart, function (O, L, N, M) {
                var N = N || "value",
					M = M && M.substr(1);
                var K = "i" + J++;
                return "<% for(var " + K + "=0, l" + K + "=" + L + ".length;" + K + "<l" + K + ";" + K + "++) {var " + N + "=" + L + "[" + K + "];" + (M ? ("var " + M + "=" + K + ";") : "") + " %>"
            }).replace(D.settings.forend, "<% } %>").replace(D.settings.ifstart, function (K, L) {
                return "<% if(" + L + ") { %>"
            }).replace(D.settings.ifend, "<% } %>").replace(D.settings.elsestart, function (K) {
                return "<% } else { %>"
            }).replace(D.settings.elseifstart, function (K, L) {
                return "<% } else if(" + L + ") { %>"
            }).replace(D.settings.noneencode, function (L, K) {
                return G.__interpolate(K, false, H)
            }).replace(D.settings.interpolate, function (L, K) {
                return G.__interpolate(K, true, H)
            }).replace(D.settings.inlinecomment, "").replace(D.settings.rangestart, function (N, M, O, L) {
                var K = "j" + J++;
                return "<% for(var " + K + "=" + O + ";" + K + "<" + L + ";" + K + "++) {var " + M + "=" + K + "; %>"
            });
            if (!H || H.errorhandling !== false) {
                I = "<% try { %>" + I;
                I += '<% } catch(e) {_method.__throw("Juicer Render Exception: "+e.message);} %>'
            }
            return I
        };
        this.__toNative = function (I, H) {
            return this.__convert(I, !H || H.strip)
        };
        this.__lexicalAnalyze = function (K) {
            var J = [];
            var N = "";
            var H = ["if", "each", "break", "case", "catch", "continue", "debugger", "default", "delete", "do", "finally", "for", "function", "in", "instanceof", "new", "return", "switch", "this", "throw", "try", "typeof", "var", "void", "while", "with", "null", "typeof", "class", "enum", "export", "extends", "import", "super", "implements", "interface", "let", "package", "private", "protected", "public", "static", "yield", "const", "arguments", "true", "false", "undefined", "NaN"];
            var M = function (Q, P) {
                if (Array.prototype.indexOf && Q.indexOf === Array.prototype.indexOf) {
                    return Q.indexOf(P)
                }
                for (var O = 0; O < Q.length; O++) {
                    if (Q[O] === P) {
                        return O
                    }
                }
                return -1
            };
            var I = function (P, O) {
                O = O.match(/\w+/igm)[0];
                if (M(J, O) === -1 && M(H, O) === -1) {
                    if (window && typeof (window[O]) === "function" && window[O].toString().match(/^\s*?function \w+\(\) \{\s*?\[native code\]\s*?\}\s*?$/i)) {
                        return P
                    }
                    J.push(O)
                }
                return P
            };
            K.replace(D.settings.forstart, I).replace(D.settings.interpolate, I).replace(D.settings.ifstart, I).replace(D.settings.elseifstart, I).replace(/[\+\-\*\/%!\?\|\^&~<>=,\(\)]\s*([A-Za-z_]+)/igm, I);
            for (var L = 0; L < J.length; L++) {
                N += "var " + J[L] + "=_." + J[L] + ";"
            }
            return "<% " + N + " %>"
        };
        this.__convert = function (I, J) {
            var H = [].join("");
            H += "'use strict';";
            H += "var _=_||{};";
            H += "var _out=[];_out[_out.length]='";
            if (J !== false) {
                H += I.replace(/\\/g, "\\\\").replace(/[\r\t\n]/g, " ").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "';_out[_out.length]=$1;_out[_out.length]='").split("<%").join("';").split("%>").join("_out[_out.length]='") + "';return _out.join('');";
                return H
            }
            H += I.replace(/\\/g, "\\\\").replace(/[\r]/g, "\\r").replace(/[\t]/g, "\\t").replace(/[\n]/g, "\\n").replace(/'(?=[^%]*%>)/g, "\t").split("'").join("\\'").split("\t").join("'").replace(/<%=(.+?)%>/g, "';_out[_out.length]=$1;_out[_out.length]='").split("<%").join("';").split("%>").join("_out[_out.length]='") + "';return _out.join('').replace(/[\\r\\n]\\s+[\\r\\n]/g, '\\r\\n');";
            return H
        };
        this.parse = function (I, H) {
            var J = this;
            if (!H || H.loose !== false) {
                I = this.__lexicalAnalyze(I) + I
            }
            I = this.__removeShell(I, H);
            I = this.__toNative(I, H);
            this._render = new Function("_, _method", I);
            this.render = function (L, K) {
                if (!K || K !== G.options._method) {
                    K = B(K, G.options._method)
                }
                return J._render.call(this, L, K)
            };
            return this
        }
    };
    D.compile = function (G, F) {
        if (!F || F !== this.options) {
            F = B(F, this.options)
        }
        try {
            var H = this.__cache[G] ? this.__cache[G] : new this.template(this.options).parse(G, F);
            if (!F || F.cache !== false) {
                this.__cache[G] = H
            }
            return H
        } catch (I) {
            C("Juicer Compile Exception: " + I.message);
            return {
                render: function () { }
            }
        }
    };
    D.to_html = function (G, H, F) {
        if (!F || F !== this.options) {
            F = B(F, this.options)
        }
        return this.compile(G, F).render(H, F._method)
    };
    D.register("makeImg", function (L, K, H) {
        if (!L) {
            return "http://img02.taobaocdn.com/tps/i2/T18lznXj0qXXXe1I2r-1-1.png"
        } else {
            if (L.indexOf("taobaocdn") === -1) {
                var J = 0;
                for (var G = 0, F = L.length; G < F; G++) {
                    J += L.charCodeAt(G)
                }
                J %= 4;
                J += 1;
                L = "http://img0" + J + ".taobaocdn.com/" + (K || "") + "/i" + J + "/" + L
            }
            if ("number" === typeof K) {
                H = K
            }
            if (H) {
                L = L.replace(/(\.\w+)_\w+\1$/, "$1");
                var I = L.match(/(\.\w+)$/);
                L = L + "_" + H + "x" + H + (I.length ? I[1] : "")
            }
            return L
        }
    });
    D.register("plus", function (G, F) {
        if (typeof G == "number" && typeof F == "number") {
            return G + F
        }
        return ""
    });
    D.register("_escapeSPM", function (G, H, F) {
        A.escapeSPM(G, H, F);
        return ""
    });
    D.register("_splitByHtml", function (G, H, F) {
        if (H && H in G) {
            G[F] = G[H].replace(/[^\s]/g, function (I) {
                return '<span class="ald-word-spliter">' + I + "</span>"
            })
        }
        return ""
    });
    D.register("renderAtpanel", function (F, G, J, L, M) {
        if (!G) {
            return ""
        } else {
            if (!!L && !!M) {
                var N = G.split(","),
					K = N.length,
					H = function (P, O) {
					    if (typeof (P) === "number" && typeof (O) === "string") {
					        (P < K) && (N[P] = O)
					    }
					};
                if (L instanceof Array && M instanceof Array && L.length <= M.length) {
                    for (var I = 0; I < L.length; I++) {
                        H(L[I], M[I])
                    }
                } else {
                    H(L, M)
                }
                G = N.join(",")
            }
            F.idx = J + 1;
            return "atpanel='" + A.substitute(G, F) + "'"
        }
    });
    D.register("size", function (F) {
        return (F ? F.length : "") || ""
    });
    D.register("removeCharacter", function (G, F) {
        return ("" + G).replace(F, "")
    });
    A.juicer = D
})(ALD.util); 