/*pub-1|2012-12-19 14:15:56*/
(function (S) {
    var B = {
        init: function () {
            return B
        },
        watch: function () {
            return B
        }
    };
    if (Math.random() > 0.1) {
        S._tb_tracer = B;
        return
    }
    if (S._tb_tracer) {
        return
    }
    var f = document,
        Y = (new Date()).getTime(),
        b = null,
        I = S.g_hb_monitor_st,
        V = Y,
        F = 0,
        M = location.href,
        L = f.referrer,
        W = M.indexOf("tb-tracer-ignore=true") != -1,
        G = 0,
        P = 1024,
        E = "tps/i4/T1pkSfXexkXXXXXXXX-1-1.gif",
        J = 0,
        O = {}, Z = [],
        a = Math.random(),
        U = Y + "." + a,
        D = !!f.attachEvent,
        C = "attachEvent",
        K = "addEventListener",
        T = false,
        N = function (g) {
            return typeof g == "number"
        }, R = function (k, p) {
            var g, h, l, i, m = null,
                s, r = "",
                j, o = 0,
                q = 0,
                n = {};
            n.tpath = X(k);
            while (k) {
                j = k.tagName;
                if (j && j != "HTML") {
                    o = 1
                }
                if (j == "A" || j == "AREA") {
                    g = k.getAttribute("href", 2) || "";
                    q = 1;
                    s = j
                } else {
                    if (j == "IMG" || j == "BUTTON" || j == "INPUT" || j == "SELECT") {
                        q = 1
                    }
                }
                if (q) {
                    m = m || k;
                    s = s || j;
                    r = r || k.id || "-"
                }
                if ((k.id && (h = O[k.id])) || !(l = k.parentNode)) {
                    break
                }
                k = l
            }
            if (!o || (!h && J > 0)) {
                return
            }
            if (g) {
                n.href = g
            }
            if (s) {
                n.et = s
            }
            if (r && r != "-") {
                n.elid = r
            }
            n.pos = d(m, p).join(",");
            F++;
            n.cc = F;
            i = (new Date()).getTime();
            n.t = i - Y;
            n.t2 = i - V;
            V = i;
            c.send(n)
        }, d = function (h, m) {
            var o = f.compatMode == "BackCompat" ? f.body : f.documentElement,
                j = Math.max(o.scrollWidth, o.clientWidth),
                p = o.scrollTop,
                k = o.scrollLeft;
            var s = m.pageX,
                q = m.pageY;
            if (!N(s)) {
                s = m.clientX + k;
                q = m.clientY + p
            }
            var n = -1,
                l, g;
            if (h) {
                if (h.getBoundingClientRect) {
                    g = h.getBoundingClientRect();
                    n = g.left + k;
                    l = g.top + p
                } else { }
            } if (c.layout == 0) {
                var i = j >> 1;
                s -= i;
                n -= i
            }
            return N(l) ? [s, q, n, l, h.offsetWidth, h.offsetHeight] : [s, q]
        }, Q = function (i) {
            var g = [],
                h;
            for (h in i) {
                if (i.hasOwnProperty(h)) {
                    g.push(h + "=" + encodeURIComponent(i[h]))
                }
            }
            return g.join("&")
        }, A = function (n) {
            var h = n.split("&"),
                j = 0,
                g = h.length,
                k, m = {};
            for (; j < g; j++) {
                k = h[j].split("=");
                m[k[0]] = decodeURIComponent(k[1] || "")
            }
            return m
        }, X = function (j) {
            var h = [],
                i, k, g;
            while (j) {
                k = j.tagName;
                if (j.id) {
                    h.unshift(k + "#" + j.id);
                    break
                }
                if (k == "BODY" || k == "HTML") {
                    break
                }
                g = 0;
                i = j;
                while (i = i.previousSibling) {
                    if (i.tagName == k) {
                        g++
                    }
                }
                h.unshift(k + (g ? "[" + g + "]" : ""));
                j = j.parentNode
            }
            return h.join(" ")
        };

    function H(h, j) {
        var g = new Image(),
            k = "_img_" + Math.random(),
            i = h.indexOf("?") == -1 ? "?" : "&";
        S[k] = g;
        g.onload = g.onerror = function () {
            S[k] = null
        };
        g.src = (h) + i + Q(j);
        g = null
    }
    function e(n) {
        var q = {
            docw: 0,
            doch: 0,
            v_id: n.eid,
            g_id: n.tid
        }, o = ["type", "sw", "sh", "layout", "pvid", "cid", "referrer", "href", "cc", "t", "t2", "et", "tpath", "elid", "latency"],
            m, g, j, h, p;
        for (m = 0, g = o.length; m < g; m++) {
            j = o[m];
            h = n[j];
            if (h) {
                q[j] = h
            }
        }
        if (p = n.pos) {
            p = p.split(",");
            q.x = p[0];
            q.y = p[1];
            if (p.length > 2) {
                q.elx = p[2];
                q.ely = p[3];
                q.elw = p[4];
                q.elh = p[5]
            }
        }
        H("http://log.mmstat.com/uedxwj.1.1?cache=" + Math.random(), q)
    }
    var c = {
        init0: function () {
            if (W) {
                return
            }
            var g = D ? C : K;
            f[g]((D ? "on" : "") + "mousedown", function (i) {
                i = i || S.event;
                var h = i.target || i.srcElement;
                if (h) {
                    R(h, i)
                }
            }, T);
            if (I) {
                S[g]((D ? "on" : "") + "load", function () {
                    var h = {
                        type: 2,
                        loadtime: (new Date()).getTime() - I
                    };
                    c.send(h)
                }, T)
            }
            c.checkTrigger()
        },
        init: function (j, g, l) {
            G = 1;
            c.tid = j;
            c.eid = (g || 0).toString();
            c.cfg = N(l) ? {
                layout: l
            } : (l || {});
            c.layout = c.cfg.layout || 0;
            var h = parseFloat(c.cfg.sample_rate),
                k = f.cookie.match(new RegExp("\\b" + (c.cfg.cookie_id || "t") + "=([^;]+)")),
                i = {
                    type: "pv",
                    sw: S.screen.width,
                    sh: S.screen.height
                };
            if (L) {
                i.referrer = L
            }
            if (!isNaN(h) && a > h) {
                G = 2;
                return
            }
            c.cid = k ? k[1] : "";
            c.send(i)
        },
        watch: function (j) {
            for (var h = 0, g = j.length; h < g; h++) {
                O[j[h]] = 1
            }
            J += g
        },
        send: function (g) {
            if (G == 2) {
                return
            }
            var i = Math.random();
            g.f = "tb-tracer";
            g.pvid = U;
            g.tid = c.tid;
            g.eid = c.eid;
            g.r = i;
            g.url = M;
            if (c.layout) {
                g.layout = c.layout
            }
            if (c.cid) {
                g.cid = c.cid
            }
            if (S.performance && S.performance.timing) {
                g.latency = (new Date()).getTime() - performance.timing.navigationStart
            }
            if (G == 0) {
                Z.push(g)
            } else {
                if (G == 1) {
                    try {
                        e(g)
                    } catch (h) { }
                }
            }
        },
        checkTrigger: function () {
            if (G != 0 || P <= 0) {
                return
            }
            P--;
            var g = document.images,
                m = 0,
                h = g.length,
                k, j;
            for (; m < h; m++) {
                if ((k = g[m].src) && k.indexOf(E) != -1 && (k = k.split("?")[1]) && (j = k.match(/.*?\btracer=([\w\-\/]+)&?/)) && c.trigger(j[1].split("/"), A(k))) {
                    return
                }
            }
            setTimeout(c.checkTrigger, 200)
        },
        trigger: function (h, g) {
            c.init(h[0], h[1], g);
            g.hasOwnProperty("watch") && c.watch(g.watch.split(","));
            return 1
        }
    };
    c.init0();
    S._tb_tracer = {
        version: "0.1.1",
        init: function (h, g, i) {
            if (!h || W) {
                return
            }
            c.init(h, N(g) ? g : 0, i || (typeof g == "object" ? g : b));
            return this
        },
        watch: function (g) {
            c.watch([].slice.call(arguments, 0));
            return this
        }
    }
})(window);