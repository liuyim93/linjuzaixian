﻿KISSY.add("ajax", function (e, g, i) {
    function j(d, b, a, h, m) {
        e.isFunction(b) && (h = a, a = b, b = k);
        return i({
            type: m || "get",
            url: d,
            data: b,
            success: a,
            dataType: h
        })
    }
    var k = void 0;
    e.mix(i, {
        serialize: g.serialize,
        get: j,
        post: function (d, b, a, h) {
            e.isFunction(b) && (h = a, a = b, b = k);
            return j(d, b, a, h, "post")
        },
        jsonp: function (d, b, a) {
            e.isFunction(b) && (a = b, b = k);
            return j(d, b, a, "jsonp")
        },
        getScript: e.getScript,
        getJSON: function (d, b, a) {
            e.isFunction(b) && (a = b, b = k);
            return j(d, b, a, "json")
        },
        upload: function (d, b, a, h, m) {
            e.isFunction(a) && (m = h, h = a, a = k);
            return i({
                url: d,
                type: "post",
                dataType: m,
                form: b,
                data: a,
                success: h
            })
        }
    });
    e.mix(e, {
        Ajax: i,
        IO: i,
        ajax: i,
        io: i,
        jsonp: i.jsonp
    });
    return i
}, {
    requires: "ajax/form-serializer,ajax/base,ajax/xhr-transport,ajax/script-transport,ajax/jsonp,ajax/form,ajax/iframe-transport,ajax/methods".split(",")
});
KISSY.add("ajax/base", function (e, g, i, j) {
    function k(f) {
        var a = f.context;
        delete f.context;
        f = e.mix(e.clone(l), f, {
            deep: !0
        });
        f.context = a || f;
        var d, b = f.type,
			m = f.dataType,
			a = f.uri = n.resolve(f.url);
        f.uri.setQuery("");
        "crossDomain" in f || (f.crossDomain = !f.uri.isSameOriginAs(n));
        b = f.type = b.toUpperCase();
        f.hasContent = !c.test(b);
        if (f.processData && (d = f.data) && "string" != typeof d) f.data = e.param(d, j, j, f.serializeArray);
        m = f.dataType = e.trim(m || "*").split(h);
        !("cache" in f) && e.inArray(m[0], ["script", "jsonp"]) && (f.cache = !1);
        f.hasContent || (f.data && a.query.add(e.unparam(f.data)), !1 === f.cache && a.query.set("_ksTS", e.now() + "_" + e.guid()));
        return f
    }
    function d(f, c) {
        b.fire(f, {
            ajaxConfig: c.config,
            io: c
        })
    }
    function b(c) {
        function h(f) {
            return function (h) {
                if (g = a.timeoutTimer) clearTimeout(g), a.timeoutTimer = 0;
                var b = c[f];
                b && b.apply(j, h);
                d(f, a)
            }
        }
        var a = this;
        if (!(a instanceof b)) return new b(c);
        f.call(a);
        c = k(c);
        e.mix(a, {
            responseData: null,
            config: c || {},
            timeoutTimer: null,
            responseText: null,
            responseXML: null,
            responseHeadersString: "",
            responseHeaders: null,
            requestHeaders: {},
            readyState: 0,
            state: 0,
            statusText: null,
            status: 0,
            transport: null,
            _defer: new e.Defer(this)
        });
        var n;
        d("start", a);
        n = new (u[c.dataType[0]] || u["*"])(a);
        a.transport = n;
        c.contentType && a.setRequestHeader("Content-Type", c.contentType);
        var m = c.dataType[0],
			g, i, l = c.timeout,
			j = c.context,
			w = c.headers,
			v = c.accepts;
        a.setRequestHeader("Accept", m && v[m] ? v[m] + ("*" === m ? "" : ", */*; q=0.01") : v["*"]);
        for (i in w) a.setRequestHeader(i, w[i]);
        if (c.beforeSend && !1 === c.beforeSend.call(j, a, c)) return a;
        a.then(h("success"),
		h("error"));
        a.fin(h("complete"));
        a.readyState = 1;
        d("send", a);
        c.async && 0 < l && (a.timeoutTimer = setTimeout(function () {
            a.abort("timeout")
        }, 1E3 * l));
        try {
            a.state = 1, n.send()
        } catch (y) {
            2 > a.state && a._ioReady(-1, y.message)
        }
        return a
    }
    var a = /^(?:about|app|app\-storage|.+\-extension|file|widget)$/,
		h = /\s+/,
		m = function (f) {
		    return f
		}, f = e.Promise,
		c = /^(?:GET|HEAD)$/,
		n = new e.Uri((e.Env.host.location || {}).href),
		a = n && a.test(n.getScheme()),
		u = {}, l = {
		    type: "GET",
		    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		    async: !0,
		    serializeArray: !0,
		    processData: !0,
		    accepts: {
		        xml: "application/xml, text/xml",
		        html: "text/html",
		        text: "text/plain",
		        json: "application/json, text/javascript",
		        "*": "*/*"
		    },
		    converters: {
		        text: {
		            json: g.parse,
		            html: m,
		            text: m,
		            xml: e.parseXML
		        }
		    },
		    contents: {
		        xml: /xml/,
		        html: /html/,
		        json: /json/
		    }
		};
    l.converters.html = l.converters.text;
    e.mix(b, i.Target);
    e.mix(b, {
        isLocal: a,
        setupConfig: function (f) {
            e.mix(l, f, {
                deep: !0
            })
        },
        setupTransport: function (f, c) {
            u[f] = c
        },
        getTransport: function (f) {
            return u[f]
        },
        getConfig: function () {
            return l
        }
    });
    return b
}, {
    requires: ["json", "event"]
});
KISSY.add("ajax/form-serializer", function (e, g) {
    function i(a) {
        return a.replace(k, "\r\n")
    }
    var j = /^(?:select|textarea)/i,
		k = /\r?\n/g,
		d, b = /^(?:color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
    return d = {
        serialize: function (a, h) {
            return e.param(d.getFormData(a), void 0, void 0, h || !1)
        },
        getFormData: function (a) {
            var h = [],
				d = {};
            e.each(g.query(a), function (f) {
                f = f.elements ? e.makeArray(f.elements) : [f];
                h.push.apply(h, f)
            });
            h = e.filter(h, function (f) {
                return f.name && !f.disabled && (f.checked || j.test(f.nodeName) || b.test(f.type))
            });
            e.each(h, function (f) {
                var c = g.val(f),
					a;
                null !== c && (c = e.isArray(c) ? e.map(c, i) : i(c), (a = d[f.name]) ? (a && !e.isArray(a) && (a = d[f.name] = [a]), a.push.apply(a, e.makeArray(c))) : d[f.name] = c)
            });
            return d
        }
    }
}, {
    requires: ["dom"]
});
KISSY.add("ajax/form", function (e, g, i, j) {
    g.on("start", function (g) {
        var d, b, a, g = g.io.config;
        if (a = g.form) d = i.get(a), b = d.encoding || d.enctype, a = g.data, "multipart/form-data" != b.toLowerCase() ? (d = j.getFormData(d), g.hasContent ? (d = e.param(d, void 0, void 0, g.serializeArray), g.data = a ? g.data + ("&" + d) : d) : g.uri.query.add(d)) : (a = g.dataType, g = a[0], "*" == g && (g = "text"), a.length = 2, a[0] = "iframe", a[1] = g)
    });
    return g
}, {
    requires: ["./base", "dom", "./form-serializer"]
});
KISSY.add("ajax/iframe-transport", function (e, g, i, j) {
    function k(h) {
        var d = e.guid("io-iframe"),
			f = g.getEmptyIframeSrc(),
			h = h.iframe = g.create("<iframe " + (f ? ' src="' + f + '" ' : "") + ' id="' + d + '" name="' + d + '" style="position:absolute;left:-9999px;top:-9999px;"/>');
        g.prepend(h, a.body || a.documentElement);
        return h
    }
    function d(h, d, f) {
        var c = [],
			b, i, l, j;
        e.each(h, function (h, k) {
            b = e.isArray(h);
            i = e.makeArray(h);
            for (l = 0; l < i.length; l++) j = a.createElement("input"), j.type = "hidden", j.name = k + (b && f ? "[]" : ""), j.value = i[l], g.append(j,
			d), c.push(j)
        });
        return c
    }
    function b(a) {
        this.io = a
    }
    var a = e.Env.host.document;
    j.setupConfig({
        converters: {
            iframe: j.getConfig().converters.text,
            text: {
                iframe: function (a) {
                    return a
                }
            },
            xml: {
                iframe: function (a) {
                    return a
                }
            }
        }
    });
    e.augment(b, {
        send: function () {
            function a() {
                i.on(j, "load error", b._callback, b);
                o.submit()
            }
            var b = this,
				f = b.io,
				c = f.config,
				n, j, l, r = c.data,
				o = g.get(c.form);
            b.attrs = {
                target: g.attr(o, "target") || "",
                action: g.attr(o, "action") || "",
                method: g.attr(o, "method")
            };
            b.form = o;
            j = k(f);
            g.attr(o, {
                target: j.id,
                action: f._getUrlForSend(),
                method: "post"
            });
            r && (l = e.unparam(r));
            l && (n = d(l, o, c.serializeArray));
            b.fields = n;
            6 == e.UA.ie ? setTimeout(a, 0) : a()
        },
        _callback: function (a) {
            var d = this,
				f = d.form,
				c = d.io,
				a = a.type,
				b, j = c.iframe;
            if (j) if ("abort" == a && 6 == e.UA.ie ? setTimeout(function () {
                g.attr(f, d.attrs)
            }, 0) : g.attr(f, d.attrs), g.remove(this.fields), i.detach(j), setTimeout(function () {
                g.remove(j)
            }, 30), c.iframe = null, "load" == a) try {
                if ((b = j.contentWindow.document) && b.body) c.responseText = e.trim(g.text(b.body)), e.startsWith(c.responseText, "<?xml") && (c.responseText = void 0);
                c.responseXML = b && b.XMLDocument ? b.XMLDocument : b;
                b ? c._ioReady(200, "success") : c._ioReady(500, "parser error")
            } catch (l) {
                c._ioReady(500, "parser error")
            } else "error" == a && c._ioReady(500, "error")
        },
        abort: function () {
            this._callback({
                type: "abort"
            })
        }
    });
    j.setupTransport("iframe", b);
    return j
}, {
    requires: ["dom", "event", "./base"]
});
KISSY.add("ajax/jsonp", function (e, g) {
    var i = e.Env.host;
    g.setupConfig({
        jsonp: "callback",
        jsonpCallback: function () {
            return e.guid("jsonp")
        }
    });
    g.on("start", function (g) {
        var k = g.io,
			d = k.config,
			g = d.dataType;
        if ("jsonp" == g[0]) {
            var b, a = d.jsonpCallback,
				h = e.isFunction(a) ? a() : a,
				m = i[h];
            d.uri.query.set(d.jsonp, h);
            i[h] = function (a) {
                1 < arguments.length && (a = e.makeArray(arguments));
                b = [a]
            };
            k.fin(function () {
                i[h] = m;
                if (void 0 === m) try {
                    delete i[h]
                } catch (a) { } else b && m(b[0])
            });
            k = k.converters = k.converters || {};
            k.script = k.script || {};
            k.script.json = function () {
                return b[0]
            };
            g.length = 2;
            g[0] = "script";
            g[1] = "json"
        }
    });
    return g
}, {
    requires: ["./base"]
});
KISSY.add("ajax/methods", function (e, g, i) {
    function j(d) {
        var b = d.responseText,
			a = d.responseXML,
			h = d.config,
			g = h.converters,
			f = d.converters || {}, c, n, j = h.contents,
			l = h.dataType;
        if (b || a) {
            for (h = d.mimeType || d.getResponseHeader("Content-Type");
			"*" == l[0]; ) l.shift();
            if (!l.length) for (c in j) if (j[c].test(h)) {
                l[0] != c && l.unshift(c);
                break
            }
            l[0] = l[0] || "text";
            if ("text" == l[0] && b !== i) n = b;
            else if ("xml" == l[0] && a !== i) n = a;
            else {
                var k = {
                    text: b,
                    xml: a
                };
                e.each(["text", "xml"], function (c) {
                    var d = l[0];
                    return (f[c] && f[c][d] || g[c] && g[c][d]) && k[c] ? (l.unshift(c), n = "text" == c ? b : a, !1) : i
                })
            }
        }
        j = l[0];
        for (h = 1; h < l.length; h++) {
            c = l[h];
            var o = f[j] && f[j][c] || g[j] && g[j][c];
            if (!o) throw "no covert for " + j + " => " + c;
            n = o(n);
            j = c
        }
        d.responseData = n
    }
    var k = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg;
    e.extend(g, e.Promise, {
        setRequestHeader: function (d, b) {
            this.requestHeaders[d] = b;
            return this
        },
        getAllResponseHeaders: function () {
            return 2 === this.state ? this.responseHeadersString : null
        },
        getResponseHeader: function (d) {
            var b, a;
            if (2 === this.state) {
                if (!(a = this.responseHeaders)) for (a = this.responseHeaders = {}; b = k.exec(this.responseHeadersString); ) a[b[1]] = b[2];
                b = a[d]
            }
            return b === i ? null : b
        },
        overrideMimeType: function (d) {
            this.state || (this.mimeType = d);
            return this
        },
        abort: function (d) {
            d = d || "abort";
            this.transport && this.transport.abort(d);
            this._ioReady(0, d);
            return this
        },
        getNativeXhr: function () {
            var d;
            return (d = this.transport) ? d.nativeXhr : null
        },
        _ioReady: function (d, b) {
            if (2 != this.state) {
                this.state = 2;
                this.readyState = 4;
                var a;
                if (200 <= d && 300 > d || 304 == d) if (304 == d) b = "not modified", a = !0;
                else try {
                    j(this), b = "success", a = !0
                } catch (h) {
                    b =
						"parser error"
                } else 0 > d && (d = 0);
                this.status = d;
                this.statusText = b;
                this._defer[a ? "resolve" : "reject"]([this.responseData, b, this])
            }
        },
        _getUrlForSend: function () {
            var d = this.config,
				b = d.uri,
				a = e.Uri.getComponents(d.url).query || "";
            return b.toString(d.serializeArray) + (a ? (b.query.has() ? "&" : "?") + a : a)
        }
    })
}, {
    requires: ["./base"]
});
KISSY.add("ajax/script-transport", function (e, g, i, j) {
    function k(a) {
        if (!a.config.crossDomain) return new (g.getTransport("*"))(a);
        this.io = a;
        return this
    }
    var d = e.Env.host,
		b = d.document;
    g.setupConfig({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            text: {
                script: function (a) {
                    e.globalEval(a);
                    return a
                }
            }
        }
    });
    e.augment(k, {
        send: function () {
            var a = this,
				h, e = a.io,
				f = e.config,
				c = b.head || b.getElementsByTagName("head")[0] || b.documentElement;
            a.head = c;
            h = b.createElement("script");
            a.script = h;
            h.async = !0;
            f.scriptCharset && (h.charset = f.scriptCharset);
            h.src = e._getUrlForSend();
            h.onerror = h.onload = h.onreadystatechange = function (c) {
                c = c || d.event;
                a._callback((c.type || "error").toLowerCase())
            };
            c.insertBefore(h, c.firstChild)
        },
        _callback: function (a, d) {
            var b = this.script,
				f = this.io,
				c = this.head;
            if (b && (d || !b.readyState || /loaded|complete/.test(b.readyState) || "error" == a)) b.onerror = b.onload = b.onreadystatechange = null, c && b.parentNode && c.removeChild(b),
			this.head = this.script = j, !d && "error" != a ? f._ioReady(200, "success") : "error" == a && f._ioReady(500, "script error")
        },
        abort: function () {
            this._callback(0, 1)
        }
    });
    g.setupTransport("script", k);
    return g
}, {
    requires: ["./base", "./xhr-transport"]
});
KISSY.add("ajax/sub-domain-transport", function (e, g, i, j) {
    function k(a) {
        var b = a.config;
        this.io = a;
        b.crossDomain = !1
    }
    function d() {
        var b = this.io.config.uri.getHostname(),
			b = a[b];
        b.ready = 1;
        i.detach(b.iframe, "load", d, this);
        this.send()
    }
    var b = e.Env.host.document,
		a = {};
    e.augment(k, g.proto, {
        send: function () {
            var h = this.io.config,
				m = h.uri,
				f = m.getHostname(),
				c;
            c = a[f];
            var n = "/sub_domain_proxy.html";
            h.xdr && h.xdr.subDomain && h.xdr.subDomain.proxy && (n = h.xdr.subDomain.proxy);
            c && c.ready ? (this.nativeXhr = g.nativeXhr(0, c.iframe.contentWindow)) && this.sendInternal() : (c ? h = c.iframe : (c = a[f] = {}, h = c.iframe = b.createElement("iframe"), j.css(h, {
                position: "absolute",
                left: "-9999px",
                top: "-9999px"
            }), j.prepend(h, b.body || b.documentElement), c = new e.Uri, c.setScheme(m.getScheme()), c.setPort(m.getPort()), c.setHostname(f), c.setPath(n), h.src = c.toString()), i.on(h, "load", d, this))
        }
    });
    return k
}, {
    requires: ["./xhr-transport-base", "event", "dom"]
});
KISSY.add("ajax/xdr-flash-transport", function (e, g, i) {
    function j(a, c, d) {
        m || (m = !0, a = '<object id="' + b + '" type="application/x-shockwave-flash" data="' + a + '" width="0" height="0"><param name="movie" value="' + a + '" /><param name="FlashVars" value="yid=' + c + "&uid=" + d + '&host=KISSY.IO" /><param name="allowScriptAccess" value="always" /></object>', c = h.createElement("div"), i.prepend(c, h.body || h.documentElement), c.innerHTML = a)
    }
    function k(a) {
        this.io = a
    }
    var d = {}, b = "io_swf",
		a, h = e.Env.host.document,
		m = !1;
    e.augment(k, {
        send: function () {
            var f = this,
				c = f.io,
				b = c.config;
            j((b.xdr || {}).src || e.Config.base + "ajax/io.swf", 1, 1);
            a ? (f._uid = e.guid(), d[f._uid] = f, a.send(c._getUrlForSend(), {
                id: f._uid,
                uid: f._uid,
                method: b.type,
                data: b.hasContent && b.data || {}
            })) : setTimeout(function () {
                f.send()
            }, 200)
        },
        abort: function () {
            a.abort(this._uid)
        },
        _xdrResponse: function (a, c) {
            var b, e = c.id,
				h, g = c.c,
				j = this.io;
            if (g && (h = g.responseText)) j.responseText = decodeURI(h);
            switch (a) {
                case "success":
                    b = {
                        status: 200,
                        statusText: "success"
                    };
                    delete d[e];
                    break;
                case "abort":
                    delete d[e];
                    break;
                case "timeout":
                case "transport error":
                case "failure":
                    delete d[e], b = {
                        status: "status" in g ? g.status : 500,
                        statusText: g.statusText || a
                    }
            }
            b && j._ioReady(b.status, b.statusText)
        }
    });
    g.applyTo = function (a, c, b) {
        var a = c.split(".").slice(1),
			d = g;
        e.each(a, function (a) {
            d = d[a]
        });
        d.apply(null, b)
    };
    g.xdrReady = function () {
        a = h.getElementById(b)
    };
    g.xdrResponse = function (a, c) {
        var b = d[c.uid];
        b && b._xdrResponse(a, c)
    };
    return k
}, {
    requires: ["./base", "dom"]
});
KISSY.add("ajax/xhr-transport-base", function (e, g) {
    function i(a, b) {
        try {
            return new (b || k).XMLHttpRequest
        } catch (c) { }
    }
    function j(a) {
        var b;
        a.ifModified && (b = a.uri, !1 === a.cache && (b = b.clone(), b.query.remove("_ksTS")), b = b.toString());
        return b
    }
    var k = e.Env.host,
		d = 7 < e.UA.ie && k.XDomainRequest,
		b = {
		    proto: {}
		}, a = {}, h = {};
    g.__lastModifiedCached = a;
    g.__eTagCached = h;
    b.nativeXhr = k.ActiveXObject ? function (a, f) {
        var c;
        if (!b.supportCORS && a && d) c = new d;
        else if (!(c = !g.isLocal && i(a, f)))a: 
        {
            try {
                c = new (f || k).ActiveXObject("Microsoft.XMLHTTP");
                break a
            } catch (e) { }
            c = void 0
        }
        return c
    } : i;
    b._XDomainRequest = d;
    b.supportCORS = "withCredentials" in b.nativeXhr();
    e.mix(b.proto, {
        sendInternal: function () {
            var b = this,
				f = b.io,
				c = f.config,
				e = b.nativeXhr,
				g = c.type,
				i = c.async,
				k, o = f.mimeType,
				p = f.requestHeaders || {}, f = f._getUrlForSend(),
				t = j(c),
				q, s;
            if (t) {
                if (q = a[t]) p["If-Modified-Since"] = q;
                if (q = h[t]) p["If-None-Match"] = q
            } (k = c.username) ? e.open(g, f, i, k, c.password) : e.open(g, f, i);
            if (g = c.xhrFields) for (s in g) e[s] = g[s];
            o && e.overrideMimeType && e.overrideMimeType(o);
            p["X-Requested-With"] || (p["X-Requested-With"] = "XMLHttpRequest");
            if ("undefined" !== typeof e.setRequestHeader) for (s in p) e.setRequestHeader(s, p[s]);
            e.send(c.hasContent && c.data || null);
            !i || 4 == e.readyState ? b._callback() : d && e instanceof d ? (e.onload = function () {
                e.readyState = 4;
                e.status = 200;
                b._callback()
            }, e.onerror = function () {
                e.readyState = 4;
                e.status = 500;
                b._callback()
            }) : e.onreadystatechange = function () {
                b._callback()
            }
        },
        abort: function () {
            this._callback(0, 1)
        },
        _callback: function (b, f) {
            var c = this.nativeXhr,
				i = this.io,
				k, l, r, o, p, t = i.config;
            try {
                if (f || 4 == c.readyState) if (d && c instanceof d ? (c.onerror = e.noop, c.onload = e.noop) : c.onreadystatechange = e.noop, f) 4 !== c.readyState && c.abort();
                else {
                    k = j(t);
                    var q = c.status;
                    d && c instanceof d || (i.responseHeadersString = c.getAllResponseHeaders());
                    k && (l = c.getResponseHeader("Last-Modified"), r = c.getResponseHeader("ETag"), l && (a[k] = l), r && (h[r] = r));
                    if ((p = c.responseXML) && p.documentElement) i.responseXML = p;
                    i.responseText = c.responseText;
                    try {
                        o = c.statusText
                    } catch (s) {
                        o = ""
                    } !q && g.isLocal && !t.crossDomain ? q = i.responseText ? 200 : 404 : 1223 === q && (q = 204);
                    i._ioReady(q, o)
                }
            } catch (x) {
                c.onreadystatechange = e.noop, f || i._ioReady(-1, x)
            }
        }
    });
    return b
}, {
    requires: ["./base"]
});
KISSY.add("ajax/xhr-transport", function (e, g, i, j, k) {
    function d(d) {
        var g = d.config,
			f = g.crossDomain,
			c = g.xdr || {}, n = c.subDomain = c.subDomain || {};
        this.io = d;
        if (f) {
            g = g.uri.getHostname();
            if (b.domain && e.endsWith(g, b.domain) && !1 !== n.proxy) return new j(d);
            if (!i.supportCORS && ("flash" === "" + c.use || !a)) return new k(d)
        }
        this.nativeXhr = i.nativeXhr(f);
        return this
    }
    var b = e.Env.host.document,
		a = i._XDomainRequest;
    e.augment(d, i.proto, {
        send: function () {
            this.sendInternal()
        }
    });
    g.setupTransport("*", d);
    return g
}, {
    requires: ["./base",
		"./xhr-transport-base", "./sub-domain-transport", "./xdr-flash-transport"]
});