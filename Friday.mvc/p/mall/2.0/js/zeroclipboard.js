/*pub-1|2012-09-10 14:37:21*/
var ZeroClipboard = {
    version: "1.0.7",
    clients: {},
    moviePath: "ZeroClipboard.swf",
    nextId: 1,
    $: function (A) {
        if (typeof (A) == "string") {
            A = document.getElementById(A)
        }
        if (!A.addClass) {
            A.hide = function () {
                this.style.display = "none"
            };
            A.show = function () {
                this.style.display = ""
            };
            A.addClass = function (B) {
                this.removeClass(B);
                this.className += " " + B
            };
            A.removeClass = function (D) {
                var E = this.className.split(/\s+/);
                var B = -1;
                for (var C = 0; C < E.length; C++) {
                    if (E[C] == D) {
                        B = C;
                        C = E.length
                    }
                }
                if (B > -1) {
                    E.splice(B, 1);
                    this.className = E.join(" ")
                }
                return this
            };
            A.hasClass = function (B) {
                return !!this.className.match(new RegExp("\\s*" + B + "\\s*"))
            }
        }
        return A
    },
    setMoviePath: function (A) {
        this.moviePath = A
    },
    dispatch: function (D, B, C) {
        var A = this.clients[D];
        if (A) {
            A.receiveEvent(B, C)
        }
    },
    register: function (B, A) {
        this.clients[B] = A
    },
    getDOMObjectPosition: function (C, A) {
        var B = {
            left: 0,
            top: 0,
            width: C.width ? C.width : C.offsetWidth,
            height: C.height ? C.height : C.offsetHeight
        };
        while (C && (C != A)) {
            B.left += C.offsetLeft;
            B.top += C.offsetTop;
            C = C.offsetParent
        }
        return B
    },
    Client: function (A) {
        this.handlers = {};
        this.id = ZeroClipboard.nextId++;
        this.movieId = "ZeroClipboardMovie_" + this.id;
        ZeroClipboard.register(this.id, this);
        if (A) {
            this.glue(A)
        }
    }
};
ZeroClipboard.Client.prototype = {
    id: 0,
    ready: false,
    movie: null,
    clipText: "",
    handCursorEnabled: true,
    cssEffects: true,
    handlers: null,
    glue: function (D, B, E) {
        this.domElement = ZeroClipboard.$(D);
        var F = 99;
        if (this.domElement.style.zIndex) {
            F = parseInt(this.domElement.style.zIndex, 10) + 1
        }
        if (typeof (B) == "string") {
            B = ZeroClipboard.$(B)
        } else {
            if (typeof (B) == "undefined") {
                B = document.getElementsByTagName("body")[0]
            }
        }
        var C = ZeroClipboard.getDOMObjectPosition(this.domElement, B);
        this.div = document.createElement("div");
        var A = this.div.style;
        A.position = "absolute";
        A.left = "" + C.left + "px";
        A.top = "" + C.top + "px";
        A.width = "" + C.width + "px";
        A.height = "" + C.height + "px";
        A.zIndex = F;
        if (typeof (E) == "object") {
            for (addedStyle in E) {
                A[addedStyle] = E[addedStyle]
            }
        }
        B.appendChild(this.div);
        this.div.innerHTML = this.getHTML(C.width, C.height)
    },
    getHTML: function (D, A) {
        var C = "";
        var B = "id=" + this.id + "&width=" + D + "&height=" + A;
        if (navigator.userAgent.match(/MSIE/)) {
            var E = location.href.match(/^https/i) ? "https://" : "http://";
            C += '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="' + E + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="' + D + '" height="' + A + '" id="' + this.movieId + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="allowFullScreen" value="false" /><param name="movie" value="' + ZeroClipboard.moviePath + '" /><param name="loop" value="false" /><param name="menu" value="false" /><param name="quality" value="best" /><param name="bgcolor" value="#ffffff" /><param name="flashvars" value="' + B + '"/><param name="wmode" value="transparent"/></object>'
        } else {
            C += '<embed id="' + this.movieId + '" src="' + ZeroClipboard.moviePath + '" loop="false" menu="false" quality="best" bgcolor="#ffffff" width="' + D + '" height="' + A + '" name="' + this.movieId + '" align="middle" allowScriptAccess="always" allowFullScreen="false" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="' + B + '" wmode="transparent" />'
        }
        return C
    },
    hide: function () {
        if (this.div) {
            this.div.style.left = "-2000px"
        }
    },
    show: function () {
        this.reposition()
    },
    destroy: function () {
        if (this.domElement && this.div) {
            this.hide();
            this.div.innerHTML = "";
            var A = document.getElementsByTagName("body")[0];
            try {
                A.removeChild(this.div)
            } catch (B) { }
            this.domElement = null;
            this.div = null
        }
    },
    reposition: function (C) {
        if (C) {
            this.domElement = ZeroClipboard.$(C);
            if (!this.domElement) {
                this.hide()
            }
        }
        if (this.domElement && this.div) {
            var B = ZeroClipboard.getDOMObjectPosition(this.domElement);
            var A = this.div.style;
            A.left = "" + B.left + "px";
            A.top = "" + B.top + "px"
        }
    },
    setText: function (A) {
        this.clipText = A;
        if (this.ready) {
            this.movie.setText(A)
        }
    },
    addEventListener: function (A, B) {
        A = A.toString().toLowerCase().replace(/^on/, "");
        if (!this.handlers[A]) {
            this.handlers[A] = []
        }
        this.handlers[A].push(B)
    },
    setHandCursor: function (A) {
        this.handCursorEnabled = A;
        if (this.ready) {
            this.movie.setHandCursor(A)
        }
    },
    setCSSEffects: function (A) {
        this.cssEffects = !!A
    },
    receiveEvent: function (D, E) {
        D = D.toString().toLowerCase().replace(/^on/, "");
        switch (D) {
            case "load":
                this.movie = document.getElementById(this.movieId);
                if (!this.movie) {
                    var C = this;
                    setTimeout(function () {
                        C.receiveEvent("load", null)
                    }, 1);
                    return
                }
                if (!this.ready && navigator.userAgent.match(/Firefox/) && navigator.userAgent.match(/Windows/)) {
                    var C = this;
                    setTimeout(function () {
                        C.receiveEvent("load", null)
                    }, 100);
                    this.ready = true;
                    return
                }
                this.ready = true;
                this.movie.setText(this.clipText);
                this.movie.setHandCursor(this.handCursorEnabled);
                break;
            case "mouseover":
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass("hover");
                    if (this.recoverActive) {
                        this.domElement.addClass("active")
                    }
                }
                break;
            case "mouseout":
                if (this.domElement && this.cssEffects) {
                    this.recoverActive = false;
                    if (this.domElement.hasClass("active")) {
                        this.domElement.removeClass("active");
                        this.recoverActive = true
                    }
                    this.domElement.removeClass("hover")
                }
                break;
            case "mousedown":
                if (this.domElement && this.cssEffects) {
                    this.domElement.addClass("active")
                }
                break;
            case "mouseup":
                if (this.domElement && this.cssEffects) {
                    this.domElement.removeClass("active");
                    this.recoverActive = false
                }
                break
        }
        if (this.handlers[D]) {
            for (var B = 0, A = this.handlers[D].length; B < A; B++) {
                var F = this.handlers[D][B];
                if (typeof (F) == "function") {
                    F(this, E)
                } else {
                    if ((typeof (F) == "object") && (F.length == 2)) {
                        F[0][F[1]](this, E)
                    } else {
                        if (typeof (F) == "string") {
                            window[F](this, E)
                        }
                    }
                }
            }
        }
    }
};
(function (s) {
    var b = {
        init: function () {
            return b
        },
        watch: function () {
            return b
        }
    };
    if (Math.random() > 0.1) {
        s._tb_tracer = b;
        return
    }
    if (s._tb_tracer) {
        return
    }
    var F = document,
		y = (new Date()).getTime(),
		B = null,
		i = s.g_hb_monitor_st,
		v = y,
		f = 0,
		m = location.href,
		l = F.referrer,
		w = m.indexOf("tb-tracer-ignore=true") != -1,
		g = 0,
		p = 1024,
		e = "tps/i4/T1pkSfXexkXXXXXXXX-1-1.gif",
		j = 0,
		o = {}, z = [],
		A = Math.random(),
		u = y + "." + A,
		d = !!F.attachEvent,
		c = "attachEvent",
		k = "addEventListener",
		t = false,
		n = function (G) {
		    return typeof G == "number"
		}, r = function (K, P) {
		    var G, H, L, I, M = null,
				S, R = "",
				J, O = 0,
				Q = 0,
				N = {};
		    N.tpath = x(K);
		    while (K) {
		        J = K.tagName;
		        if (J && J != "HTML") {
		            O = 1
		        }
		        if (J == "A" || J == "AREA") {
		            G = K.getAttribute("href", 2) || "";
		            Q = 1;
		            S = J
		        } else {
		            if (J == "IMG" || J == "BUTTON" || J == "INPUT" || J == "SELECT") {
		                Q = 1
		            }
		        }
		        if (Q) {
		            M = M || K;
		            S = S || J;
		            R = R || K.id || "-"
		        }
		        if ((K.id && (H = o[K.id])) || !(L = K.parentNode)) {
		            break
		        }
		        K = L
		    }
		    if (!O || (!H && j > 0)) {
		        return
		    }
		    if (G) {
		        N.href = G
		    }
		    if (S) {
		        N.et = S
		    }
		    if (R && R != "-") {
		        N.elid = R
		    }
		    N.pos = D(M, P).join(",");
		    f++;
		    N.cc = f;
		    I = (new Date()).getTime();
		    N.t = I - y;
		    N.t2 = I - v;
		    v = I;
		    C.send(N)
		}, D = function (H, M) {
		    var O = F.compatMode == "BackCompat" ? F.body : F.documentElement,
				J = Math.max(O.scrollWidth, O.clientWidth),
				P = O.scrollTop,
				K = O.scrollLeft;
		    var R = M.pageX,
				Q = M.pageY;
		    if (!n(R)) {
		        R = M.clientX + K;
		        Q = M.clientY + P
		    }
		    var N = -1,
				L, G;
		    if (H) {
		        if (H.getBoundingClientRect) {
		            G = H.getBoundingClientRect();
		            N = G.left + K;
		            L = G.top + P
		        } else { }
		    } if (C.layout == 0) {
		        var I = J >> 1;
		        R -= I;
		        N -= I
		    }
		    return n(L) ? [R, Q, N, L, H.offsetWidth, H.offsetHeight] : [R, Q]
		}, q = function (I) {
		    var G = [],
				H;
		    for (H in I) {
		        if (I.hasOwnProperty(H)) {
		            G.push(H + "=" + encodeURIComponent(I[H]))
		        }
		    }
		    return G.join("&")
		}, a = function (L) {
		    var H = L.split("&"),
				I = 0,
				G = H.length,
				J, K = {};
		    for (; I < G; I++) {
		        J = H[I].split("=");
		        K[J[0]] = decodeURIComponent(J[1] || "")
		    }
		    return K
		}, x = function (J) {
		    var H = [],
				I, K, G;
		    while (J) {
		        K = J.tagName;
		        if (J.id) {
		            H.unshift(K + "#" + J.id);
		            break
		        }
		        if (K == "BODY" || K == "HTML") {
		            break
		        }
		        G = 0;
		        I = J;
		        while (I = I.previousSibling) {
		            if (I.tagName == K) {
		                G++
		            }
		        }
		        H.unshift(K + (G ? "[" + G + "]" : ""));
		        J = J.parentNode
		    }
		    return H.join(" ")
		};

    function h(H, J) {
        var G = new Image(),
			K = "_img_" + Math.random(),
			I = H.indexOf("?") == -1 ? "?" : "&";
        s[K] = G;
        G.onload = G.onerror = function () {
            s[K] = null
        };
        G.src = (H) + I + q(J);
        G = null
    }
    function E(K) {
        var N = {
            docw: 0,
            doch: 0,
            v_id: K.eid,
            g_id: K.tid
        }, L = ["type", "sw", "sh", "layout", "pvid", "cid", "referrer", "href", "cc", "t", "t2", "et", "tpath", "elid", "latency"],
			J, G, I, H, M;
        for (J = 0, G = L.length; J < G; J++) {
            I = L[J];
            H = K[I];
            if (H) {
                N[I] = H
            }
        }
        if (M = K.pos) {
            M = M.split(",");
            N.x = M[0];
            N.y = M[1];
            if (M.length > 2) {
                N.elx = M[2];
                N.ely = M[3];
                N.elw = M[4];
                N.elh = M[5]
            }
        }
        h("http://log.mmstat.com/uedxwj.1.1?cache=" + Math.random(), N)
    }
    var C = {
        init0: function () {
            if (w) {
                return
            }
            var G = d ? c : k;
            F[G]((d ? "on" : "") + "mousedown", function (I) {
                I = I || s.event;
                var H = I.target || I.srcElement;
                if (H) {
                    r(H, I)
                }
            }, t);
            if (i) {
                s[G]((d ? "on" : "") + "load", function () {
                    var H = {
                        type: 2,
                        loadtime: (new Date()).getTime() - i
                    };
                    C.send(H)
                }, t)
            }
            C.checkTrigger()
        },
        init: function (J, G, L) {
            g = 1;
            C.tid = J;
            C.eid = (G || 0).toString();
            C.cfg = n(L) ? {
                layout: L
            } : (L || {});
            C.layout = C.cfg.layout || 0;
            var H = parseFloat(C.cfg.sample_rate),
				K = F.cookie.match(new RegExp("\\b" + (C.cfg.cookie_id || "t") + "=([^;]+)")),
				I = {
				    type: "pv",
				    sw: s.screen.width,
				    sh: s.screen.height
				};
            if (l) {
                I.referrer = l
            }
            if (!isNaN(H) && A > H) {
                g = 2;
                return
            }
            C.cid = K ? K[1] : "";
            C.send(I)
        },
        watch: function (I) {
            for (var H = 0, G = I.length; H < G; H++) {
                o[I[H]] = 1
            }
            j += G
        },
        send: function (G) {
            if (g == 2) {
                return
            }
            var I = Math.random();
            G.f = "tb-tracer";
            G.pvid = u;
            G.tid = C.tid;
            G.eid = C.eid;
            G.r = I;
            G.url = m;
            if (C.layout) {
                G.layout = C.layout
            }
            if (C.cid) {
                G.cid = C.cid
            }
            if (s.performance && s.performance.timing) {
                G.latency = (new Date()).getTime() - performance.timing.navigationStart
            }
            if (g == 0) {
                z.push(G)
            } else {
                if (g == 1) {
                    try {
                        E(G)
                    } catch (H) { }
                }
            }
        },
        checkTrigger: function () {
            if (g != 0 || p <= 0) {
                return
            }
            p--;
            var G = document.images,
				K = 0,
				H = G.length,
				J, I;
            for (; K < H; K++) {
                if ((J = G[K].src) && J.indexOf(e) != -1 && (J = J.split("?")[1]) && (I = J.match(/.*?\btracer=([\w\-\/]+)&?/)) && C.trigger(I[1].split("/"), a(J))) {
                    return
                }
            }
            setTimeout(C.checkTrigger, 200)
        },
        trigger: function (H, G) {
            C.init(H[0], H[1], G);
            G.hasOwnProperty("watch") && C.watch(G.watch.split(","));
            return 1
        }
    };
    C.init0();
    s._tb_tracer = {
        version: "0.1.1",
        init: function (H, G, I) {
            if (!H || w) {
                return
            }
            C.init(H, n(G) ? G : 0, I || (typeof G == "object" ? G : B));
            return this
        },
        watch: function (G) {
            C.watch([].slice.call(arguments, 0));
            return this
        }
    }
})(window);