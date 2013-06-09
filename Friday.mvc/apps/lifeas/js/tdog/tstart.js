 /*pub-1|2013-05-10 10:57:24*/KISSY.add("swf-ua", function(b) {
    function a() {
        var f = 0, h = "ShockwaveFlash", g = navigator.mimeTypes["application/x-shockwave-flash"], i, d;
        if (g) {
            if ((d = g.enabledPlugin)) {
                f = c(d.description.replace(/\s[rd]/g, ".").replace(/[a-z\s]+/ig, "").split("."))
            }
        } else {
            try {
                i = new ActiveXObject(h + "." + h + ".6");
                i.AllowScriptAccess = "always"
            } catch (j) {
                if (i !== null) {
                    f = 6
                }
            }
            if (f === 0) {
                try {
                    f = c(new ActiveXObject(h + "." + h)["GetVariable"]("$version").replace(/[A-Za-z\s]+/g, "").split(","))
                } catch (j) {
                }
            }
        }
        return parseFloat(f)
    }
    function c(d) {
        var e = d[0] + ".";
        switch (d[2].toString().length) {
            case 1:
                e += "00";
                break;
            case 2:
                e += "0";
                break
        }
        return (e += d[2])
    }
    b.UA.flash = a()
});
KISSY.add("swf", function(d) {
    var g = d.UA, e = d.now(), j = 10.22, b = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000", f = "application/x-shockwave-flash", a = "http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?" + e, c = "KISSY.SWF.eventHandler", h = {align: "",allowNetworking: "",allowScriptAccess: "",base: "",bgcolor: "",menu: "",name: "",quality: "",salign: "",scale: "",tabindex: "",wmode: ""};
    function i(m, r, q) {
        var y = this, k = "ks-swf-" + e++, l = parseFloat(q.version) || j, v = g.flash >= l, u = g.flash >= 8, o = u && q.useExpressInstall && !v, x = (o) ? a : r, n = "YUISwfId=" + k + "&YUIBridgeCallback=" + c, t = "<object ";
        y.id = k;
        i.instances[k] = y;
        if ((m = d.get(m)) && (v || o) && x) {
            t += 'id="' + k + '" ';
            if (g.ie) {
                t += 'classid="' + b + '" '
            } else {
                t += 'type="' + f + '" data="' + x + '" '
            }
            t += 'width="100%" height="100%">';
            if (g.ie) {
                t += '<param name="movie" value="' + x + '"/>'
            }
            for (var s in q.fixedAttributes) {
                if (h.hasOwnProperty(s)) {
                    t += '<param name="' + s + '" value="' + q.fixedAttributes[s] + '"/>'
                }
            }
            for (var w in q.flashVars) {
                var p = q.flashVars[w];
                if (typeof p === "string") {
                    n += "&" + w + "=" + encodeURIComponent(p)
                }
            }
            t += '<param name="flashVars" value="' + n + '"/>';
            t += "</object>";
            m.innerHTML = t;
            y.swf = d.get("#" + k)
        }
    }
    i.instances = (d.SWF || {}).instances || {};
    i.eventHandler = function(k, l) {
        i.instances[k]._eventHandler(l)
    };
    d.augment(i, d.EventTarget);
    d.augment(i, {_eventHandler: function(m) {
            var k = this, l = m.type;
            if (l === "log") {
                d.log(m.message)
            } else {
                if (l) {
                    setTimeout(function() {
                        d.EventTarget.fire(l, m)
                    }, 100)
                }
            }
        },callSWF: function(m, l) {
            var k = this;
            if (k.swf[m]) {
                return k.swf[m].apply(k.swf, l || [])
            }
        }});
    d.SWF = i
});
KISSY.add("swfstore", function(c, g) {
    var e = c.UA, b = c.Cookie, d = "swfstore", f = document;
    function a(k, h, i, j) {
        c.use("swf", function() {
            var m = "other", n = b.get(d), p, l = this;
            i = (i !== g ? i : true) + "";
            j = (j !== g ? j : true) + "";
            if (e.ie) {
                m = "ie"
            } else {
                if (e.gecko) {
                    m = "gecko"
                } else {
                    if (e.webkit) {
                        m = "webkit"
                    } else {
                        if (e.opera) {
                            m = "opera"
                        }
                    }
                }
            }
            if (!n || n === "null") {
                b.set(d, (n = Math.round(Math.random() * Math.PI * 100000)))
            }
            p = {version: 9.115,useExpressInstall: false,fixedAttributes: {allowScriptAccess: "always",allowNetworking: "all",scale: "noScale"},flashVars: {allowedDomain: f.location.hostname,shareData: i,browser: n,useCompression: j}};
            if (!h) {
                h = f.body.appendChild(c.DOM.create('<div style="height:0;width:0;overflow:hidden"></div>'))
            }
            try {
                l.embeddedSWF = new c.SWF(h, k || "swfstore.swf", p);
                l.embeddedSWF._eventHandler = function(q) {
                    c.SWF.prototype._eventHandler.call(l, q)
                }
            } catch (o) {
            }
        })
    }
    c.augment(a, c.EventTarget);
    c.augment(a, {setItem: function(h, i) {
            if (typeof i === "string") {
                i = i.replace(/\\/g, "\\\\")
            } else {
                i = c.JSON.stringify(i) + ""
            }
            if ((h = c.trim(h + ""))) {
                try {
                    return this.embeddedSWF.callSWF("setItem", [h, i])
                } catch (j) {
                    this.fire("error", {message: j})
                }
            }
        },getItem: function(h) {
            try {
                return this.embeddedSWF.callSWF("getValueOf", [h])
            } catch (i) {
            }
        }});
    c.each(["getValueAt", "getNameAt", "getValueOf", "getItems", "getLength", "removeItem", "removeItemAt", "clear", "calculateCurrentSize", "hasAdequateDimensions", "setSize", "getModificationDate", "displaySettings"], function(h) {
        a.prototype[h] = function() {
            try {
                return this.embeddedSWF.callSWF(h, c.makeArray(arguments))
            } catch (i) {
                this.fire("error", {message: i})
            }
        }
    });
    c.SWFStore = a
});
(function(b, a) {
    b.mix(a, {_MODS: {},add: function(d, c) {
            return this._MODS[d] = c(a)
        },_Queue: [],_isReady: false,isTmall: -1 !== location.host.indexOf("tmall."),sendStatistic: function(c, d) {
            if (c) {
                new Image().src = "http://log.mmstat.com/" + (d || "tbapp") + "." + c + "?t=" + b.now() + "&url=" + encodeURI(location.href.replace(location.hash, ""))
            }
        },ready: function(c) {
            if (!this._isReady) {
                this._Queue.push(c)
            } else {
                c()
            }
        },log: function(c) {
            if (this.isDebug && "undefined" !== typeof console) {
                try {
                    console.log(c)
                } catch (d) {
                }
            }
        }})
})(KISSY, TStart);
TStart.add("template", function(c) {
    var e = KISSY, g = {}, r = {"#": "start","/": "end"}, a = "KS_TEMPL_STAT_PARAM", s = new RegExp(a, "g"), u = "KS_TEMPL", m = "KS_DATA_", k = "as", d = '");', l = u + '.push("', h = "KISSY.Template: Syntax Error. ", n = "KISSY.Template: Render Error. ", p = "var " + u + "=[]," + a + "=false;with(", v = "||{}){try{" + u + '.push("', b = '");}catch(e){' + u + '=["' + n + '" + e.message]}};return ' + u + '.join("");', j = function(w) {
        return w.replace(/\\"/g, '"')
    }, q = function(w) {
        return w.replace(/"/g, '\\"')
    }, o = e.trim, i = function(y) {
        var x, w;
        return q(o(y).replace(/[\r\t\n]/g, " ").replace(/\\/g, "\\\\")).replace(/\{\{([#/]?)(?!\}\})([^}]*)\}\}/g, function(E, F, z) {
            x = "";
            z = j(o(z));
            if (F) {
                w = z.indexOf(" ");
                z = w === -1 ? [z, ""] : [z.substring(0, w), z.substring(w)];
                var A = z[0], D, C = o(z[1]), B = f[A];
                if (B && r[F]) {
                    D = B[r[F]];
                    x = String(e.isFunction(D) ? D.apply(this, C.split(/\s+/)) : D.replace(s, C))
                }
            } else {
                x = u + ".push(typeof (" + z + ') ==="undefined"?"":' + z + ");"
            }
            return d + x + l
        })
    }, f = {"if": {start: "if(typeof (" + a + ') !=="undefined" && ' + a + "){",end: "}"},"else": {start: "}else{"},elseif: {start: "}else if(" + a + "){"},each: {start: function(B, x, z, y) {
                var w = "_ks_value", A = "_ks_index";
                if (x === k && z) {
                    w = z || w;
                    A = y || A
                }
                return "KISSY.each(" + B + ", function(" + w + ", " + A + "){"
            },end: "});"},"!": {start: "/*" + a + "*/"}};
    function t(x) {
        if (!(g[x])) {
            var y = e.guid(m), z, B, w = [p, y, v, B = i(x), b];
            try {
                z = new Function(y, w.join(""))
            } catch (A) {
                w[3] = d + l + h + "," + A.message + d + l;
                z = new Function(y, w.join(""))
            }
            g[x] = {name: y,o: B,parser: w.join(""),render: z}
        }
        return g[x]
    }
    e.mix(t, {log: function(w) {
            if (w in g) {
                if ("js_beautify" in window) {
                } else {
                    e.log(g[w].parser, "info")
                }
            } else {
                t(w);
                this.log(w)
            }
        },addStatement: function(w, x) {
            if (e.isString(w)) {
                f[w] = x
            } else {
                e.mix(f, w)
            }
        }});
    c.Template = t
});
TStart.add("url", function(b) {
    var c = KISSY;
    function a(g) {
        var e = c.isString(g) ? g : g.join(","), d = e.split(/\.(?:css|js)/), f = "";
        if (d.length > 2) {
            f = "??"
        }
        return f + e
    }
    c.mix(b, {buildUri: function(f, h, d) {
            var g = b.checkQmark(f), e = "?";
            if (g) {
                e = "&"
            }
            return f + e + (c.isString(h) ? h : c.param(h)) + (d ? ("&t=" + c.now()) : "")
        },checkQmark: function(d) {
            return -1 !== d.indexOf("?")
        },getHost: function(e) {
            var f = -1 !== location.host.indexOf("daily"), d = -1 !== e.indexOf("alipay");
            if (!f) {
                return e.replace(/\{(\w+)\}/, "$1.com")
            } else {
                if (!d) {
                    return e.replace(/\{(\w+)\}/, "daily.$1.net")
                } else {
                    return e.replace(/\{(\w+)\}/, "$1.net")
                }
            }
        },getCdn: function(d) {
            var e = b.isOnline ? "a.tbcdn.cn" : "assets.daily.taobao.net";
            return "http://" + e + (d || "")
        },addTimeStamp: function(d) {
            return d + (b.checkQmark(d) ? "&" : "?") + "t=" + new Date().getTime()
        },combo: function(f, d) {
            var i = b.cdnPath + (f.path || ""), g = f.css || "", h = f.js || "", e;
            if (g) {
                b.addStyleSheet(i + a(g) + (d ? ("?t=" + d + ".css") : ""))
            }
            if (h) {
                b.IO.getScript(i + a(h) + (d ? ("?t=" + d + ".js") : ""))
            }
        }})
});
TStart.add("tstart~user", function(b) {
    var c = KISSY, d = c.DOM, a = c.Event, e = window;
    c.mix(b, {getNick: function() {
            return c.Cookie.get("_nk_")
        },openLogin: function() {
            location.href = b.getHost("https://login.{taobao}/member/login.jhtml?redirectURL=" + encodeURIComponent(location.href))
        },closeLogin: function() {
            var f = d.get("#tstartLogin");
            if (f) {
                d.css(f, "display", "none")
            }
        }})
});
TStart.add("hitch", function(a) {
    var c = KISSY;
    function b(g, j) {
        var e = arguments, h = c.makeArray(e, 2), f = g || window, d = c.isString(j) ? g[j] : j, i = Function.prototype.bind;
        if (i) {
            return i.apply(d, [g].concat(h))
        }
        return function() {
            var k = c.makeArray(arguments);
            return d && d.apply(f, h.concat(k))
        }
    }
    return a.hitch = b
});
TStart.add("eventTarget", function(a) {
    var b = KISSY;
    function c(h, i, f) {
        h = h || win;
        var e = this, g = h._listener, d;
        if (!g) {
            g = h._listener = {}
        }
        d = g[i];
        if (!d) {
            d = g[i] = []
        }
        return d.push(f)
    }
    a.EventTarget = {on: function(e, d) {
            return c(this, e, d)
        },fire: function(i) {
            var e = this, d = b.makeArray(arguments), g = [], f = e._listener, h;
            if (f) {
                h = f[i];
                if (h && h.length) {
                    if (d.length > 1) {
                        g = d.slice(1)
                    }
                    b.each(h, function(j) {
                        j.apply(e, g)
                    })
                }
            }
            return true
        }}
});
TStart.add("loader", function(a) {
    var b = KISSY, c = b.DOM;
    b.mix(a, {_DPLLoaded: false,addStyleSheet: function(f) {
            var e = b.get("head"), d;
            if (/\.css$/.test(f)) {
                d = document.createElement("link");
                c.attr(d, {rel: "stylesheet",href: f});
                c.append(d, c.get("head"))
            } else {
                b.DOM.addStyleSheet(f)
            }
        },IO: {getScript: b.IO.getScript,jsonp: function(d, f) {
                var e = this;
                if (b.isString(f)) {
                    return e.getScript(d + (d.indexOf("?") > -1 ? "&" : "?") + "callback=" + f)
                }
                return b.IO.jsonp(d, f)
            }},loadDPL: function() {
            var d = this;
            if (!d._DPLLoaded) {
                d._DPLLoaded = true;
                d.addStyleSheet(d.cdnPath + "tstart.css")
            }
        },fetchLater: function(e, d) {
            var f = this, g = f.cdnPath + e + "/later.";
            f.loadDPL();
            if (d) {
                f.addStyleSheet(g + "css")
            }
            f.IO.getScript(g + "js")
        }})
});
TStart.add("core~config", function(a) {
    var b = KISSY, c = a.getCdn("/apps/lifeas/js/tdog/");
    a.Config = {timeStamp: window._TOOLBAR_TIME_STAMP || {},isOnline: a.isOnline,ASSETS_URL: c,hasFlash: !b.UA.flash || parseInt(b.UA.flash) < 9 ? false : true,DOMAIN: (function() {
            var d = location.hostname;
            if (d.indexOf("tmall.com") > 0) {
                d = "tmall.com"
            } else {
                if (d.indexOf("tmall.net") > 0) {
                    d = "tmall.net"
                } else {
                    d = location.hostname.indexOf("taobao.com") > 0 ? "taobao.com" : "taobao.net"
                }
            }
            return d
        })()};
    b.use("swfstore", function(f, d) {
        try {
            a.traceStore = new f.SWFStore(a.getCdn("/p/tstart/1.0/") + "plugins/trace/swfstore.swf?t=20100629");
            a.store = a.traceStore
        } catch (g) {
        }
        try {
            a.log("swfstore\uff1apreload swfstore!");
            a.traceStore.on("contentReady", function() {
                a.traceStore.isReady = true;
                a.log("swfstore\uff1aswfstore is ready!")
            })
        } catch (g) {
            a.log("trace: flash \u62a5\u9519, \u65e0\u6cd5\u5b8c\u6210 contentReady.")
        }
    })
});
TStart.add("tstart~container", function(c) {
    var d = KISSY, g = d.DOM, b = d.Event, f = c.Template, e = d.UA, a, h = '<div id="tstart"><div class="tstart-toolbar"><div class="tstart-bd"><div class="tstart-areas">{{inner}}</div></div></div></div>';
    d.mix(c, c.EventTarget);
    c._Container = {render: function(k, i) {
            var l = this;
            if (!a) {
                a = g.create(h.replace(/\{\{inner\}\}/, k));
                document.body.appendChild(a);
                l.bindEvent();
                l._fix()
            } else {
                var j = g.get(".tstart-areas", a);
                j.appendChild(g.create(k))
            }
        },bindEvent: function() {
            var i = this;
            b.on("#tstart", "click", i.clickEvent, i);
            b.on(document.body, "click", function(j) {
                var l = j.target, k = g.hasClass(l, "tdog-user-del");
                if (!k && !g.contains("#tstart", l)) {
                    c.fire("closePanel")
                }
            })
        },clickEvent: function(n) {
            var s = this, m = n.target, k = g.parent(m, ".tstart-drop-item") || m, l = g.parent(m, ".tstart-drop-panel") || g.hasClass(m, "tstart-drop-panel"), q = g.contains(".tdog-popup", m), i, o = /tstart-plugin-/, j, r = g.attr(m, "data-ts-static"), p = g.hasClass(m, "tdog-user-del");
            if (r) {
                c.sendStatistic(r, "tbtoolbar")
            }
            if (g.hasClass(m, "tstart-icon-close")) {
                j = k.id.replace(o, "");
                return c.fire("closePanel", j)
            }
            if (k && g.hasClass(k, "tstart-drop-item") && !l) {
                n.preventDefault();
                j = k.id.replace(o, "");
                i = !g.hasClass(k, "tstart-item-active");
                c.fire("closePanel");
                if (i) {
                    c.fire("openPanel", j)
                }
            } else {
                if (!p && !l && !q && !g.contains("#tstart-plugin-tdog", m)) {
                    c.fire("closePanel")
                }
            }
            if (g.hasClass(m, "J_GotoLogin")) {
                n.preventDefault();
                setTimeout(function() {
                    c.openLogin()
                }, 50)
            }
        },_fix: function() {
            var i = g.get("#tstart"), j;
            if (!i) {
                return false
            }
            if (e.ie < 7) {
                d.each(d.query("#tstart span.tstart-item"), function(k) {
                    b.on(k, "mouseenter mouseleave", function() {
                        g.toggleClass(k, "tstart-item-hover")
                    })
                });
                b.on(window, "scroll resize", function() {
                    if (j) {
                        clearTimeout(j)
                    }
                    j = setTimeout(function() {
                        var l = g.scrollTop(), n = g.viewportHeight(), k = g.scrollTop() + g.viewportHeight() - 40, m = parseInt(g.css(i, "top"), 10);
                        if (m && k - m > 0 && k - m < 3) {
                            return false
                        }
                        i.style.top = k + "px"
                    }, 100)
                })
            }
        }}
});
TStart.add("Panel", function(a) {
    var b = KISSY, d = b.DOM, c = a.Template;
    function e(f) {
    }
    e.prototype = {constructor: e,createTabPanel: function(i, f) {
            var g = '<ul class="panel-tab">{{#each tabs as tab index}}<li class="{{#if tab.cls}}{{tab.cls}}{{/if}}"{{#if tab.config}} {{tab.config}}{{/if}}><span>{{tab.title}}</span></li>{{/each}}</ul><div class="panel-content">{{#each tabs as tab}}<div{{#if tab.cls}} class="{{tab.cls}}-panel"{{/if}}></div>{{/each}}</div>', h = new c(g).render(i);
            if (f) {
                f.innerHTML = h
            }
            return h
        },showLoading: function() {
            var f = d.get(".tstart-drop-panel-bd", this.getRoot());
            if (f) {
                d.addClass(f, "tstart-panel-loading")
            }
        },hideLoading: function() {
            var f = d.get(".tstart-panel-loading", this.getRoot());
            if (f) {
                d.removeClass(f, "tstart-panel-loading")
            }
        },getRoot: function() {
            var g = this, f = g.root;
            if (f) {
                return f
            }
            return g.root = d.get("#tstart-plugin-" + g.name)
        },renderLoginNotice: function(f) {
            var i = this, j = i.loginNotice, g = '<div class="login-notice"><div class="title">\u4eb2\uff0c\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\uff0c\u3010{{name}}\u3011\u9700\u8981<a href="" class="J_GotoLogin" data-ts-static="{{staticCode}}">\u767b\u5f55</a>\u624d\u53ef\u4ee5\u4f7f\u7528\u54e6</div><div class="intro"><dl><dt>\u5728\u8fd9\u91cc\u53ef\u4ee5\u5e72\u4ec0\u4e48\uff1f</dt>{{#each list as l}}<dd><i class="tstart-icon tstart-icon-rhombus"></i> {{l}}</dd>{{/each}}</dl><p class="goto"><a href="" class="J_GotoLogin" data-ts-static="{{staticCode}}">\u70b9\u51fb\u767b\u5f55</a></p></div></div>', h = new c(g).render(j);
            f = f || d.get(".tstart-drop-panel-bd", i.getRoot());
            d.html(f, h);
            i.hideLoading()
        }};
    return a.Panel = e
});
TStart.add("tstart~Plugin", function(a) {
    var b = KISSY;
    function c(e, d) {
        this._setup(e, d)
    }
    c._Plugins = [];
    c.Plugins = {};
    c.prototype = {constructor: c,_setup: function(f, d) {
            var g = c, e = b.merge({type: "normal",name: f.toString()}, d, new a.Panel(), a.EventTarget);
            g._Plugins.push(e);
            g.Plugins[f] = e;
            return this.Config = e
        },getConfig: function() {
            return this.Config
        }};
    a.Plugin = c;
    b.mix(a, c)
});
TStart.add("tstart~plugins", function(d) {
    var e = KISSY, g = e.DOM, b = e.Event, f = d.Template, c = d._Container, a = '<span class="tstart-item tstart-{{type}}-item" id="tstart-plugin-{{name}}">{{#if type !== "custom"}}<span class="tstart-{{type}}-trigger">{{html}}</span>{{#else}}{{html}}{{/if}}</span>';
    e.mix(d, {addPlugin: function(h, i) {
            return new d.Plugin(h, i)
        },initPlugins: function(l) {
            var k = this, h = k._Plugins, j = [], i = [];
            if (!l) {
                e.each(h, function(m) {
                    if (!m._installed) {
                        i.push(new f(a).render(m));
                        m._installed = true;
                        if (m.init) {
                            j.push([m.init, m])
                        }
                    }
                });
                c.render(i.join(""));
                d.fire("ready");
                if (j) {
                    e.each(j, function(m) {
                        m[0].call(m[1])
                    })
                }
            } else {
            }
        },getConfig: function(j) {
            if (!j) {
                return false
            }
            var i, h;
            if (e.isString(j)) {
                i = j
            } else {
                h = g.parent(j, ".tstart-item") || j;
                i = h.id.replace("tstart-plugin-", "")
            }
            return this.Plugins[i]
        }})
});
TStart.add("tstart~panel", function(b) {
    var c = KISSY, h = c.DOM, g = c.Event, e = b.Template, d = '<div class="tstart-drop-panel" style="width:{{width+2}}px;right:{{right}}px"><div class="tstart-drop-panel-hd"><h2>{{title}}</h2></div><div class="tstart-drop-panel-bd tstart-panel-loading" style="width:{{width}}px;height:{{height}}px"></div><div class="ft">{{#if setting}}<a href="{{setting}}" target="_blank" class="tstart-icon tstart-icon-setting" title="\u8bbe\u7f6e">\u8bbe\u7f6e</a>{{/if}}<a class="tstart-icon tstart-icon-feedback" title="\u610f\u89c1\u53cd\u9988" href="http://ur.taobao.com/survey/view.htm?id=1244" target="_blank"></a><s class="tstart-icon tstart-icon-close" title="\u6700\u5c0f\u5316"></s></div>' + (6 === c.UA.ie ? '<iframe frameborder="0" scroolling="no" width="{{width}}" height="300" style="z-index:-1;position:absolute;left:0;top:0" src="about:blank"></iframe>' : "") + "</div>";
    function i(m, o) {
        var j = c.isString(m) ? h.get("#tstart-plugin-" + m) : m, q = h.offset(j), k = j.offsetWidth, l = document.body.offsetWidth, p = l - k - q.left, n = o.width - k;
        c.mix(o, {right: "-" + Math.min(p, n)});
        return j.appendChild(h.create(new e(d).render(o)))
    }
    function a(l) {
        var j = b.getConfig(l), m = j.Panel, k = j.getRoot(), n;
        if (j.staticCode) {
            b.sendStatistic(j.staticCode)
        }
        b.loadDPL();
        if (j.fire("beforeOpen", j)) {
            if (m) {
                n = h.get(".tstart-drop-panel", k);
                if (!n) {
                    n = i(l, m)
                }
            }
            h.addClass(k, "tstart-item-active");
            j.fire("open", j)
        }
    }
    function f(l) {
        var k = h.get("#tstart-plugin-" + l) || h.get(".tstart-item-active", "#tstart"), j = b.getConfig(k);
        if (!k || !j) {
            return false
        }
        j.fire("beforeClose", j);
        h.removeClass(k, "tstart-item-active");
        j.fire("close", j)
    }
    b.on("openPanel", a);
    b.on("closePanel", f);
    b.closePanel = f
});
TStart.add("style", function(a) {
    a.addStyleSheet("#tstart-plugin-switch .tstart-item-icon,.tstart-minimized .switch-mini,#tstart .i-arrow,#tstart .msg-count,#tstart .msg-count span,#tstart .icon-new,#tstart-plugin-news .t-msg-count .arrow,#tstart .switch-mini-tip{background-image:url(http://img03.taobaocdn.com/tps/i3/T1zYneXXlqXXaloVr4-167-122.png);background-repeat:no-repeat}body,#tstart h1,#tstart h2,#tstart h3,#tstart h4,#tstart h5,#tstart h6,#tstart hr,#tstart p,#tstart dl,#tstart dt,#tstart dd,#tstart ul,#tstart ol,#tstart li,#tstart pre,#tstart form,#tstart fieldset,#tstart legend,#tstart button,#tstart input,#tstart th,#tstart td{margin:0;padding:0}body,#tstart button,#start input,#tstart select{font:12px/1.5 tahoma,arial,\5b8b\4f53,sans-serif}#tstart h1,#tstart h2,#tstart h3,#tstart h4,#tstart h5,#tstart h6{font-size:100%}#tstart address,#tstart em{font-style:normal}#tstart code,#tstart pre{font-family:courier new,courier,monospace}#tstart small{font-size:12px}#tstart ul,#tstart ol{list-style:none}#tstart a{text-decoration:none}#tstart sup{vertical-align:text-top}#tstart sub{vertical-align:text-bottom}#tstart legend{color:#000}#tstart fieldset,#tstart img{border:0;margin:0;float:none}#tstart button,#tstart input,#tstart select{font-size:100%}#tstart .hidden,#tstart .tstart-hidden{display:none!important}#tstart .invisible,#tstart .tstart-invisible{visibility:hidden!important}#tstart{position:fixed;right:0;bottom:0;z-index:100000;_position:absolute;height:40px;color:#3e3e3e;text-align:left;_right:1px}#tstart .tstart-toolbar{height:40px;float:right;right:0}#tstart a{color:#000;text-decoration:none}#tstart .tstart-bd{height:40px;margin:0}#tstart .tstart-areas{position:relative;zoom:1;height:40px;line-height:40px;float:right;}#tstart .tstart-item{position:relative;zoom:1;float:left;display:block;height:40px;}#tstart .tstart-link-item a{float:left;padding:0 8px}#tstart a:hover{color:#f60;text-decoration:underline}#tstart .tstart-normal-trigger,#tstart .tstart-drop-trigger{cursor:pointer;padding:0 8px}#tstart .i-arrow{width:5px;height:3px;position:absolute;right:0;top:12px;background-position:-134px -59px}#tstart .tstart-item-active .i-arrow{display:none}#tstart i{background:0;display:inline-block;height:auto;line-height:1;margin:auto;overflow:hidden;text-indent:0;vertical-align:middle;width:auto}#tstart-plugin-switch{height:25px}#tstart-plugin-switch .toggle-area{cursor:pointer}#tstart-plugin-switch a{display:none}#tstart-plugin-switch .tstart-item-icon{display:inline-block;width:19px;height:25px;line-height:100px;overflow:hidden;zoom:1;background-position:0 -59px;vertical-align:middle;font-size:0;margin-top:0;vertical-align:top}.tstart-minimized #tstart-plugin-switch .tstart-item-icon{background-position:-18px -59px}#tstart .switch-mini-tip{display:none;width:135px;height:28px;overflow:hidden;position:absolute;top:-30px;margin-left:-160px;background-position:0 -94px}.tstart-minimized .hover .switch-mini-tip{display:inline-block!important}.tstart-minimized .switch-mini{display:inline-block!important;width:17px;height:17px;overflow:hidden;vertical-align:middle;margin:0 5px;background-position:-47px -59px;*margin-top:5px}.tstart-minimized .hover .switch-mini{background-position:-69px -59px}.tstart-minimized .tstart-bd{float:right;width:auto;display:inline}.tstart-minimized .tstart-areas{float:left;background:green}.tstart-minimized .tstart-item{display:none}.tstart-minimized #tstart-plugin-tdog,.tstart-minimized #tstart-plugin-settings,.tstart-minimized #tstart-plugin-switch{display:block}.tstart-news-tip{position:absolute;bottom:0;left:0}#tstart-plugin-news .t-msg-count{position:absolute;bottom:-30px;right:5px;color:#fff;display:inline-block;text-align:right;*width:132px}#tstart-plugin-news .t-msg-count .tip{display:inline-block;text-decoration:none;border:1px solid #fbce67;background-color:#fee195;color:#3f4537;height:21px;line-height:21px;white-space:nowrap;padding:0 15px;font-weight:400;background-repeat:repeat-x;background-position:0 -134px}#tstart-plugin-news .t-msg-count em{color:#ff4300;font-weight:400;text-decoration:none;font-style:normal;margin:0 3px}#tstart-plugin-news .t-msg-count .arrow{width:11px;height:6px;right:10px;top:23px;position:absolute;z-index:2;background-position:-112px -59px}#tstart .tstart-item-active .t-msg-count{visibility:hidden}#tstart .msg-count,#tstart .msg-count span{display:inline-block;height:22px}#tstart .msg-count{padding-right:5px;background-position:right -32px;position:absolute;top:-15px;right:0;color:#fff;font-weight:600;line-height:16px}#tstart .msg-count span{padding-left:5px;background-position:0 0}#tstart .tstart-item-active .msg-count{display:none}#tstart-plugin-myapps .tip-intro{background:none repeat scroll 0 0 #ffffc5;border:1px solid #d4d4d4;height:24px;left:0;line-height:23px;overflow:visible;position:absolute;top:-30px;width:290px;z-index:60}#tstart-plugin-myapps .tip-intro i,#tstart-plugin-myapps .tip-intro .close,#tstart-plugin-myapps .tip-intro s{background:url(http://img04.taobaocdn.com/tps/i4/T1m4KGXi8jXXXXXXXX-120-213.png) no-repeat 0 0}#tstart-plugin-myapps .tip-intro i,#tstart-plugin-myapps .tip-intro .close{width:23px;height:23px;line-height:23px;display:inline-block}#tstart-plugin-myapps .tip-intro i{background-position:0 -190px}#tstart-plugin-myapps .tip-intro .close{background-position:-23px -190px;display:block;overflow:hidden;position:absolute;right:0;text-indent:-1000px;top:0;cursor:pointer}#tstart-plugin-myapps .tip-intro s{background-position:-46px -190px;display:block;height:13px;left:20px;position:absolute;top:24px;width:23px;z-index:100}#tstart-plugin-myapps .tip-intro a{color:#004d99}#tstart .icon-new{width:21px;height:16px;position:absolute;top:-7px;right:0;background-position:-96px -76px}#tstart .tstart-item-active .tip-new{display:none}#tstart .tstart-drop-panel{position:absolute}")
});
TStart.add("core~error", function(b) {
    var c = KISSY, a = c.Event, d = c.DOM;
    function e(g) {
        try {
            if (g.styleSheet && g.styleSheet.rules.length > 0) {
                return true
            } else {
                if (g.sheet && g.sheet.cssRules.length > 0) {
                    return true
                } else {
                    if (g.innerHTML && g.innerHTML.length > 0) {
                        return true
                    }
                }
            }
        } catch (f) {
        }
        return false
    }
    b.Error = {init: function() {
            if (!c.UA.ie) {
                return false
            }
            c.ready(function() {
                var g = [], f = [];
                c.each(d.query("link"), function(i) {
                    var h = i.href;
                    if ("stylesheet" == i.getAttribute("rel") && -1 === h.indexOf("stargate/tstart") && !e(i)) {
                        g.push(h);
                        f.push(i)
                    }
                });
                if (g.length) {
                    new Image().src = "http://www.atpanel.com/tbapp.1025.0.0?stylesheet=" + g.join("|")
                }
            })
        }}
});
TStart.add("core~init", function(a) {
    var b = KISSY;
    a.init = function() {
        a.log("\u5f00\u59cb\u521d\u59cb\u5316\u6dd8\u5b9d\u5de5\u5177\u6761");
        a.on("ready", function(c) {
            if (a._Queue.length && !a._isReady) {
                b.each(a._Queue, function(d) {
                    d()
                });
                a._Queue = [];
                a._isReady = true
            }
        });
        a.initPlugins();
        new Image().src = "http://ac.atpanel.com/tbapp.1000.0.0?t=" + b.now() + "&url=" + encodeURI(location.href.replace(location.hash, ""));
        a.Error.init()
    }
}); 