﻿(function (s) {
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