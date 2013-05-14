/*pub-1|2013-05-08 09:50:40*/
(function(d) {
	function e() {
		var l = 0,
			c = "ShockwaveFlash",
			k = navigator.mimeTypes["application/x-shockwave-flash"],
			b, m;
		if (k) {
			if ((m = k.enabledPlugin)) {
				l = f(m.description.replace(/\s[rd]/g, ".").replace(/[a-z\s]+/ig, "").split("."))
			}
		} else {
			try {
				b = new ActiveXObject(c + "." + c + ".6");
				b.AllowScriptAccess = "always"
			} catch (a) {
				if (b !== null) {
					l = 6
				}
			}
			if (l === 0) {
				try {
					l = f(new ActiveXObject(c + "." + c)["GetVariable"]("$version").replace(/[A-Za-z\s]+/g, "").split(","))
				} catch (a) {}
			}
		}
		return parseFloat(l)
	}
	function f(b) {
		var a = b[0] + ".";
		switch (b[2].toString().length) {
			case 1:
				a += "00";
				break;
			case 2:
				a += "0";
				break
		}
		return (a += b[2])
	}
	d.UA.flash = e()
})(KISSY);
(function(q) {
	var n = q.UA,
		p = q.now(),
		k = 10.22,
		s = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",
		o = "application/x-shockwave-flash",
		t = "http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?" + p,
		r = "KISSY.SWF.eventHandler",
		m = {
			align: "",
			allowNetworking: "",
			allowScriptAccess: "",
			base: "",
			bgcolor: "",
			menu: "",
			name: "",
			quality: "",
			salign: "",
			scale: "",
			tabindex: "",
			wmode: ""
		};

	function l(f, a, b) {
		var i = this,
			h = "ks-swf-" + p++,
			g = parseFloat(b.version) || k,
			A = n.flash >= g,
			B = n.flash >= 8,
			d = B && b.useExpressInstall && !A,
			j = (d) ? t : a,
			e = "YUISwfId=" + h + "&YUIBridgeCallback=" + r,
			C = "<object ";
		i.id = h;
		l.instances[h] = i;
		if ((f = q.get(f)) && (A || d) && j) {
			C += 'id="' + h + '" ';
			if (n.ie) {
				C += 'classid="' + s + '" '
			} else {
				C += 'type="' + o + '" data="' + j + '" '
			}
			C += 'width="100%" height="100%">';
			if (n.ie) {
				C += '<param name="movie" value="' + j + '"/>'
			}
			for (var D in b.fixedAttributes) {
				if (m.hasOwnProperty(D)) {
					C += '<param name="' + D + '" value="' + b.fixedAttributes[D] + '"/>'
				}
			}
			for (var z in b.flashVars) {
				var c = b.flashVars[z];
				if (typeof c === "string") {
					e += "&" + z + "=" + encodeURIComponent(c)
				}
			}
			C += '<param name="flashVars" value="' + e + '"/>';
			C += "</object>";
			f.innerHTML = C;
			i.swf = q.get("#" + h)
		}
	}
	l.instances = (q.SWF || {}).instances || {};
	l.eventHandler = function(b, a) {
		l.instances[b]._eventHandler(a)
	};
	q.augment(l, q.EventTarget);
	q.augment(l, {
		_eventHandler: function(a) {
			var c = this,
				b = a.type;
			if (b === "log") {
				q.log(a.message)
			} else {
				if (b) {
					setTimeout(function() {
						c.fire(b, a)
					}, 100)
				}
			}
		},
		callSWF: function(a, b) {
			var c = this;
			if (c.swf[a]) {
				return c.swf[a].apply(c.swf, b || [])
			}
		}
	});
	q.SWF = l
})(KISSY);
(function(n, j) {
	var l = n.UA,
		h = n.Cookie,
		m = "swfstore",
		k = document;

	function i(p, f, b, a) {
		var d = "other",
			c = h.get(m),
			g, e = this;
		b = (b !== j ? b : true) + "";
		a = (a !== j ? a : true) + "";
		if (l.ie) {
			d = "ie"
		} else {
			if (l.gecko) {
				d = "gecko"
			} else {
				if (l.webkit) {
					d = "webkit"
				} else {
					if (l.opera) {
						d = "opera"
					}
				}
			}
		}
		if (!c || c === "null") {
			h.set(m, (c = Math.round(Math.random() * Math.PI * 100000)))
		}
		g = {
			version: 9.115,
			useExpressInstall: false,
			fixedAttributes: {
				allowScriptAccess: "always",
				allowNetworking: "all",
				scale: "noScale"
			},
			flashVars: {
				allowedDomain: k.location.hostname,
				shareData: b,
				browser: c,
				useCompression: a
			}
		};
		if (!f) {
			f = k.body.appendChild(n.DOM.create('<div style="height:0;width:0;overflow:hidden"></div>'))
		}
		e.embeddedSWF = new n.SWF(f, p || "swfstore.swf", g);
		e.embeddedSWF._eventHandler = function(o) {
			n.SWF.prototype._eventHandler.call(e, o)
		}
	}
	n.augment(i, n.EventTarget);
	n.augment(i, {
		setItem: function(c, b) {
			if (typeof b === "string") {
				b = b.replace(/\\/g, "\\\\")
			} else {
				b = n.JSON.stringify(b) + ""
			}
			if ((c = n.trim(c + ""))) {
				try {
					return this.embeddedSWF.callSWF("setItem", [c, b])
				} catch (a) {
					this.fire("error", {
						message: a
					})
				}
			}
		},
		getItem: function(b) {
			try {
				return this.embeddedSWF.callSWF("getValueOf", [b])
			} catch (a) {}
		}
	});
	n.each(["getValueAt", "getNameAt", "getValueOf", "getItems", "getLength", "removeItem", "removeItemAt", "clear", "calculateCurrentSize", "hasAdequateDimensions", "setSize", "getModificationDate", "displaySettings"], function(a) {
		i.prototype[a] = function() {
			try {
				return this.embeddedSWF.callSWF(a, n.makeArray(arguments))
			} catch (b) {
				this.fire("error", {
					message: b
				})
			}
		}
	});
	n.SWFStore = i
})(KISSY);
(function(b, a) {
	b.mix(a, {
		_MODS: {},
		add: function(d, c) {
			return this._MODS[d] = c(a)
		},
		_Queue: [],
		_isReady: false,
		isTmall: -1 !== location.host.indexOf("tmall."),
		sendStatistic: function(c, d) {
			if (c) {
				new Image().src = "http://log.mmstat.com/" + (d || "tbapp") + "." + c + "?t=" + b.now() + "&url=" + encodeURI(location.href.replace(location.hash, ""))
			}
		},
		ready: function(c) {
			if (!this._isReady) {
				this._Queue.push(c)
			} else {
				c()
			}
		},
		log: function(c) {
			if (this.isDebug && "undefined" !== typeof console) {
				try {
					console.log(c)
				} catch (d) {}
			}
		}
	})
})(KISSY, TStart);
TStart.add("template", function(c) {
	var e = KISSY,
		g = {}, r = {
			"#": "start",
			"/": "end"
		}, a = "KS_TEMPL_STAT_PARAM",
		s = new RegExp(a, "g"),
		u = "KS_TEMPL",
		m = "KS_DATA_",
		k = "as",
		d = '");',
		l = u + '.push("',
		h = "KISSY.Template: Syntax Error. ",
		n = "KISSY.Template: Render Error. ",
		p = "var " + u + "=[]," + a + "=false;with(",
		v = "||{}){try{" + u + '.push("',
		b = '");}catch(e){' + u + '=["' + n + '" + e.message]}};return ' + u + '.join("");',
		j = function(w) {
			return w.replace(/\\"/g, '"')
		}, q = function(w) {
			return w.replace(/"/g, '\\"')
		}, o = e.trim,
		i = function(y) {
			var x, w;
			return q(o(y).replace(/[\r\t\n]/g, " ").replace(/\\/g, "\\\\")).replace(/\{\{([#/]?)(?!\}\})([^}]*)\}\}/g, function(E, F, z) {
				x = "";
				z = j(o(z));
				if (F) {
					w = z.indexOf(" ");
					z = w === -1 ? [z, ""] : [z.substring(0, w), z.substring(w)];
					var A = z[0],
						D, C = o(z[1]),
						B = f[A];
					if (B && r[F]) {
						D = B[r[F]];
						x = String(e.isFunction(D) ? D.apply(this, C.split(/\s+/)) : D.replace(s, C))
					}
				} else {
					x = u + ".push(typeof (" + z + ') ==="undefined"?"":' + z + ");"
				}
				return d + x + l
			})
		}, f = {
			"if": {
				start: "if(typeof (" + a + ') !=="undefined" && ' + a + "){",
				end: "}"
			},
			"else": {
				start: "}else{"
			},
			elseif: {
				start: "}else if(" + a + "){"
			},
			each: {
				start: function(B, x, z, y) {
					var w = "_ks_value",
						A = "_ks_index";
					if (x === k && z) {
						w = z || w;
						A = y || A
					}
					return "KISSY.each(" + B + ", function(" + w + ", " + A + "){"
				},
				end: "});"
			},
			"!": {
				start: "/*" + a + "*/"
			}
		};

	function t(x) {
		if (!(g[x])) {
			var y = e.guid(m),
				z, B, w = [p, y, v, B = i(x), b];
			try {
				z = new Function(y, w.join(""))
			} catch (A) {
				w[3] = d + l + h + "," + A.message + d + l;
				z = new Function(y, w.join(""))
			}
			g[x] = {
				name: y,
				o: B,
				parser: w.join(""),
				render: z
			}
		}
		return g[x]
	}
	e.mix(t, {
		log: function(w) {
			if (w in g) {
				if ("js_beautify" in window) {} else {
					e.log(g[w].parser, "info")
				}
			} else {
				t(w);
				this.log(w)
			}
		},
		addStatement: function(w, x) {
			if (e.isString(w)) {
				f[w] = x
			} else {
				e.mix(f, w)
			}
		}
	});
	c.Template = t
});
TStart.add("url", function(b) {
	var c = KISSY;

	function a(g) {
		var e = c.isString(g) ? g : g.join(","),
			d = e.split(/\.(?:css|js)/),
			f = "";
		if (d.length > 2) {
			f = "??"
		}
		return f + e
	}
	c.mix(b, {
		buildUri: function(f, h, d) {
			var g = b.checkQmark(f),
				e = "?";
			if (g) {
				e = "&"
			}
			return f + e + (c.isString(h) ? h : c.param(h)) + (d ? ("&t=" + c.now()) : "")
		},
		checkQmark: function(d) {
			return -1 !== d.indexOf("?")
		},
		getHost: function(e) {
			var f = -1 !== location.host.indexOf("daily"),
				d = -1 !== e.indexOf("alipay");
			if (!f) {
				return e.replace(/\{(\w+)\}/, "$1.com")
			} else {
				if (!d) {
					return e.replace(/\{(\w+)\}/, "daily.$1.net")
				} else {
					return e.replace(/\{(\w+)\}/, "$1.net")
				}
			}
		},
		getCdn: function(d) {
			var e = b.isOnline ? "a.tbcdn.cn" : "assets.daily.taobao.net";
			return "http://" + e + (d || "")
		},
		addTimeStamp: function(d) {
			return d + (b.checkQmark(d) ? "&" : "?") + "t=" + new Date().getTime()
		},
		combo: function(f, d) {
			var i = b.cdnPath + (f.path || ""),
				g = f.css || "",
				h = f.js || "",
				e;
			if (g) {
				b.addStyleSheet(i + a(g) + (d ? ("?t=" + d + ".css") : ""))
			}
			if (h) {
				b.IO.getScript(i + a(h) + (d ? ("?t=" + d + ".js") : ""))
			}
		}
	})
});
TStart.add("tstart~user", function(b) {
	var c = KISSY,
		d = c.DOM,
		a = c.Event,
		e = window;
	c.mix(b, {
		getNick: function() {
			return c.Cookie.get("_nk_")
		},
		openLogin: function() {
			location.href = b.getHost("https://login.{taobao}/member/login.jhtml?redirectURL=" + encodeURIComponent(location.href))
		},
		closeLogin: function() {
			var f = d.get("#tstartLogin");
			if (f) {
				d.css(f, "display", "none")
			}
		}
	})
});
TStart.add("hitch", function(a) {
	var c = KISSY;

	function b(g, j) {
		var e = arguments,
			h = c.makeArray(e, 2),
			f = g || window,
			d = c.isString(j) ? g[j] : j,
			i = Function.prototype.bind;
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
		var e = this,
			g = h._listener,
			d;
		if (!g) {
			g = h._listener = {}
		}
		d = g[i];
		if (!d) {
			d = g[i] = []
		}
		return d.push(f)
	}
	a.EventTarget = {
		on: function(e, d) {
			return c(this, e, d)
		},
		fire: function(i) {
			var e = this,
				d = b.makeArray(arguments),
				g = [],
				f = e._listener,
				h;
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
		}
	}
});
TStart.add("loader", function(a) {
	var b = KISSY,
		c = b.DOM;
	b.mix(a, {
		_DPLLoaded: false,
		addStyleSheet: function(f) {
			var e = b.get("head"),
				d;
			if (/\.css$/.test(f)) {
				d = document.createElement("link");
				c.attr(d, {
					rel: "stylesheet",
					href: f
				});
				c.append(d, c.get("head"))
			} else {
				b.DOM.addStyleSheet(f)
			}
		},
		IO: {
			getScript: b.IO.getScript,
			jsonp: function(d, f) {
				var e = this;
				if (b.isString(f)) {
					return e.getScript(d + (d.indexOf("?") > -1 ? "&" : "?") + "callback=" + f)
				}
				return b.IO.jsonp(d, f)
			}
		},
		loadDPL: function() {
			var d = this;
			if (!d._DPLLoaded) {
				d._DPLLoaded = true;
				d.addStyleSheet(d.cdnPath + "tstart.css")
			}
		},
		fetchLater: function(e, d) {
			var f = this,
				g = f.cdnPath + e + "/later.";
			f.loadDPL();
			if (d) {
				f.addStyleSheet(g + "css")
			}
			f.IO.getScript(g + "js")
		}
	})
});
TStart.add("core~config", function(a) {
	var b = KISSY,
		c = a.getCdn("/p/tstart/1.0/");
	a.traceStore = new b.SWFStore(c + "plugins/trace/swfstore.swf?t=20100629");
	a.store = a.traceStore;
	try {
		a.log("swfstore\uff1apreload swfstore!");
		a.traceStore.on("contentReady", function() {
			a.traceStore.isReady = true;
			a.log("swfstore\uff1aswfstore is ready!")
		})
	} catch (d) {
		a.log("trace: flash \u62a5\u9519, \u65e0\u6cd5\u5b8c\u6210 contentReady.")
	}
	a.Config = {
		timeStamp: window._TOOLBAR_TIME_STAMP || {},
		isOnline: a.isOnline,
		ASSETS_URL: c,
		hasFlash: !b.UA.flash || parseInt(b.UA.flash) < 9 ? false : true,
		DOMAIN: (function() {
			var e = location.hostname;
			if (e.indexOf("tmall.com") > 0) {
				e = "tmall.com"
			} else {
				if (e.indexOf("tmall.net") > 0) {
					e = "tmall.net"
				} else {
					e = location.hostname.indexOf("taobao.com") > 0 ? "taobao.com" : "taobao.net"
				}
			}
			return e
		})()
	}
});
TStart.add("tstart~container", function(d) {
	var e = KISSY,
		i = e.DOM,
		h = e.Event,
		f = d.Template,
		g = e.UA,
		b = new Date().getTime(),
		a, j = '<div class="tstart-toolbar"><div class="tstart-bd"><div class="tstart-areas">{{inner}}</div></div></div>',
		c = '<div id="tstart">' + j + "</div>";
	e.mix(d, d.EventTarget);
	d._Container = {
		render: function(n) {
			var o = this,
				m = "";
			if (!a) {
				if (n.first) {
					m += n.first
				}
				if (n.p.length) {
					m += '<span class="tstart-app">' + n.p.join("") + "</span>"
				}
				if (n.s.length) {
					m += '<span class="tstart-sys">' + n.s.join("") + "</span>"
				}
				a = i.get("#tstart");
				if (!a) {
					a = i.create(c.replace(/\{\{inner\}\}/, m));
					document.body.appendChild(a)
				} else {
					i.prepend(i.create(k.replace(/\{\{inner\}\}/, m)), a)
				}
				o.bindEvent();
				o._fix()
			} else {
				var k = i.get(".tstart-areas", a),
					l = i.get(".tstart-sys", k),
					p = i.get(".tstart-app", k);
				if (n.s.length) {
					l.appendChild(i.create(n.s.join("")))
				}
				if (n.p.length) {
					if (!p) {
						m = '<span class="tstart-app">'
					}
					m += n.p.join("");
					if (!p) {
						m += "</span>";
						return i.insertBefore(i.create(m), l)
					}
					i.append(i.create(m), p)
				}
			}
		},
		bindEvent: function() {
			var k = this;
			h.on("#tstart", "click", k.clickEvent, k);
			h.on("body", "click", function(l) {
				var m = l.target;
				if (!i.contains("#tstart", m)) {
					d.fire("closePanel")
				}
			})
		},
		clickEvent: function(q) {
			var t = this,
				o = q.target,
				m = i.parent(o, ".tstart-item") || o,
				n = i.parent(o, ".tstart-drop-panel") || i.hasClass(o, "tstart-drop-panel"),
				k, r = /tstart-plugin-/,
				l, s = i.attr(o, "data-ts-static"),
				p = i.attr(o, "data-ts-staticpre") || "tbtoolbar";
			if (s) {
				d.sendStatistic(s, p)
			}
			if (i.hasClass(o, "tstart-icon-close")) {
				l = m.id.replace(r, "");
				return d.fire("closePanel", l)
			}
			if (m && i.hasClass(m, "tstart-item")) {
				l = m.id.replace(r, "");
				if (i.hasClass(m, "tstart-drop-item") && !n) {
					q.preventDefault();
					k = !i.hasClass(m, "tstart-item-active");
					d.fire("closePanel");
					if (k) {
						d.fire("openPanel", l)
					}
					d.fire("sendStatistic", l)
				} else {
					if (!n && !i.contains("#tstart-plugin-tdog", o)) {
						d.fire("closePanel")
					}
				}
			}
			if (i.hasClass(o, "J_GotoLogin")) {
				q.preventDefault();
				setTimeout(function() {
					d.openLogin()
				}, 50)
			}
		},
		_fix: function() {
			var k = i.get("#tstart"),
				l;
			if (!k) {
				return false
			}
			if (g.ie < 7) {
				e.each(e.query("#tstart span.tstart-item"), function(m) {
					h.on(m, "mouseenter mouseleave", function() {
						i.toggleClass(m, "tstart-item-hover")
					})
				});
				h.on(window, "scroll resize", function() {
					if (l) {
						clearTimeout(l)
					}
					l = setTimeout(function() {
						var n = i.scrollTop(),
							p = i.viewportHeight(),
							m = i.scrollTop() + i.viewportHeight() - 28,
							o = parseInt(i.css(k, "top"), 10);
						if (o && m - o > 0 && m - o < 3) {
							return false
						}
						k.style.top = m + "px"
					}, 100)
				})
			}
		}
	}
});
TStart.add("Panel", function(a) {
	var b = KISSY,
		d = b.DOM,
		c = a.Template;

	function e(f) {}
	e.prototype = {
		constructor: e,
		renderPanel: function() {
			var k = '<div class="tstart-drop-panel" style="width:{{width+2}}px;right:{{right}}px"><div class="tstart-drop-panel-hd"><h2>{{title}}</h2></div><div class="tstart-drop-panel-bd tstart-panel-loading" style="width:{{width}}px;height:{{height}}px"></div><div class="ft">{{#if setting}}<a href="{{setting}}" target="_blank" class="tstart-icon tstart-icon-setting" title="\u8bbe\u7f6e">\u8bbe\u7f6e</a>{{/if}}<a class="tstart-icon tstart-icon-feedback" title="\u610f\u89c1\u53cd\u9988" href="http://ur.taobao.com/survey/view.htm?id=1244" target="_blank"></a><s class="tstart-icon tstart-icon-close" title="\u6700\u5c0f\u5316"></s></div>' + (6 === b.UA.ie ? '<iframe frameborder="0" scroolling="no" width="{{width}}" height="300" style="z-index:-1;position:absolute;left:0;top:0" src="about:blank"></iframe>' : "") + "</div>",
				n = this,
				m = n.Panel,
				i = n.getRoot(),
				j = d.offset(i),
				h = i.offsetWidth,
				l = document.body.offsetWidth,
				g = l - h - j.left,
				f = m.width - h;
			b.mix(m, {
				right: "-" + Math.min(g, f)
			});
			return i.appendChild(d.create(new c(k).render(m)))
		},
		openPanel: function() {
			var g = this,
				h = g.Panel,
				f = g.getRoot(),
				i;
			a.loadDPL();
			if (g.fire("beforeOpen", g)) {
				if (h) {
					i = d.get(".tstart-drop-panel", f);
					if (!i) {
						i = g.renderPanel()
					}
				}
				d.addClass(f, "tstart-item-active");
				g.fire("open", g)
			}
		},
		closePanel: function() {
			var g = this,
				f = g.getRoot();
			g.fire("beforeClose", g);
			d.removeClass(f, "tstart-item-active");
			g.fire("close", g)
		},
		createTabPanel: function(i, f) {
			var g = '<ul class="panel-tab">{{#each tabs as tab index}}<li class="{{#if tab.cls}}{{tab.cls}}{{/if}}"{{#if tab.config}} {{tab.config}}{{/if}}><span>{{tab.title}}</span></li>{{/each}}</ul><div class="panel-content">{{#each tabs as tab}}<div{{#if tab.cls}} class="{{tab.cls}}-panel"{{/if}}></div>{{/each}}</div>',
				h = new c(g).render(i);
			if (f) {
				f.innerHTML = h
			}
			return h
		},
		showLoading: function() {
			var f = d.get(".tstart-drop-panel-bd", this.getRoot());
			if (f) {
				d.addClass(f, "tstart-panel-loading")
			}
		},
		hideLoading: function() {
			var f = d.get(".tstart-panel-loading", this.getRoot());
			if (f) {
				d.removeClass(f, "tstart-panel-loading")
			}
		},
		renderLoginNotice: function(f) {
			var i = this,
				j = i.loginNotice,
				g = '<div class="login-notice"><div class="title">\u4eb2\uff0c\u60a8\u8fd8\u6ca1\u6709\u767b\u5f55\uff0c\u3010{{name}}\u3011\u9700\u8981<a href="" class="J_GotoLogin" data-ts-static="{{staticCode}}">\u767b\u5f55</a>\u624d\u53ef\u4ee5\u4f7f\u7528\u54e6</div><div class="intro"><dl><dt>\u5728\u8fd9\u91cc\u53ef\u4ee5\u5e72\u4ec0\u4e48\uff1f</dt>{{#each list as l}}<dd><i class="tstart-icon tstart-icon-rhombus"></i> {{l}}</dd>{{/each}}</dl><p class="goto"><a href="" class="J_GotoLogin" data-ts-static="{{staticCode}}">\u70b9\u51fb\u767b\u5f55</a></p></div></div>',
				h = new c(g).render(j);
			f = f || d.get(".tstart-drop-panel-bd", i.getRoot());
			d.html(f, h);
			i.hideLoading()
		}
	};
	return a.Panel = e
});
TStart.add("tstart~Plugin", function(a) {
	var b = KISSY,
		d = b.DOM;

	function c(f, e) {
		this._setup(f, e)
	}
	c._Plugins = [];
	c.Plugins = {};
	c.prototype = {
		constructor: c,
		_setup: function(g, e) {
			var h = c,
				f = b.merge({
					type: "normal",
					name: g.toString()
				}, this._formatPanel(e), {
					defaultConfig: e
				}, e.Panel ? new a.Panel() : {}, a.EventTarget);
			h._Plugins.push(this);
			b.mix(this, f);
			h.Plugins[g] = this
		},
		_formatPanel: function(e) {
			var f = b.merge({}, e),
				h = f.Panel;
			if (!h) {
				return e
			}
			if (b.isString(h)) {
				var g = h.split("*");
				f.Panel = {
					width: g[0] * 1,
					height: g[1] * 1
				}
			}
			if (!f.Panel.title) {
				f.Panel.title = e.html.replace(/<\/*[^>]+>/g, "")
			}
			return f
		},
		getRoot: function() {
			var f = this,
				e = f.root;
			if (e) {
				return e
			}
			return f.root = d.get("#tstart-plugin-" + f.name)
		},
		getDefaultConfig: function() {
			return this.defaultConfig
		},
		sendStatistic: function() {
			var e = this.staticCode;
			if (e) {
				a.sendStatistic(e)
			}
		}
	};
	a.Plugin = c;
	b.mix(a, c)
});
TStart.add("tstart~plugins", function(d) {
	var e = KISSY,
		g = e.DOM,
		b = e.Event,
		f = d.Template,
		c = d._Container,
		a = '<span class="tstart-item tstart-{{type}}-item" id="tstart-plugin-{{name}}">{{#if type !== "custom"}}<span class="tstart-{{type}}-trigger">{{html}}{{#if type === "drop"}}<i class="i-arrow"></i>{{/if}}</span>{{#else}}{{html}}{{/if}}</span>';
	e.mix(d, {
		addPlugin: function(h, i) {
			return new d.Plugin(h, i)
		},
		addCustomPlugin: function() {
			var l = window.g_config.toolbar;
			if (l && e.isObject(l) && l.plugins) {
				var j = l.plugins,
					h = j.length,
					k = 0,
					m;
				for (; k < h; k++) {
					if (k < 2) {
						m = j[k];
						d.addPlugin(m.name, m)
					} else {
						break
					}
				}
				d.initPlugins(null, "app")
			}
		},
		initPlugins: function(m, n) {
			var l = this,
				h = l._Plugins,
				k = [],
				j = {
					first: [],
					s: [],
					p: []
				}, i;
			if (!m) {
				e.each(h, function(o) {
					if (!o._installed) {
						i = new f(a).render(o);
						if ("switch" === o.name) {
							j.first.push(i)
						} else {
							if (!n || "system" === n) {
								j.s.push(i)
							} else {
								if ("app" === n) {
									j.p.push(i)
								}
							}
						}
						o._installed = true;
						if (o.init) {
							k.push([o.init, o])
						}
					}
				});
				c.render(j);
				d.fire("ready");
				if (k) {
					e.each(k, function(o) {
						o[0].call(o[1])
					})
				}
			} else {}
		},
		getConfig: function(j) {
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
		}
	})
});
TStart.add("tstart~panel", function(e) {
	var f = KISSY,
		h = f.DOM,
		d = f.Event,
		g = e.Template;

	function a(i) {
		return e.getConfig(i).openPanel()
	}
	function c(k) {
		var j = h.get("#tstart-plugin-" + k) || h.get(".tstart-item-active", "#tstart"),
			i = e.getConfig(j);
		if (!j || !i) {
			return false
		}
		return i.closePanel()
	}
	function b(i) {
		return e.getConfig(i).sendStatistic()
	}
	e.closePanel = c;
	e.on("openPanel", a);
	e.on("closePanel", c);
	e.on("sendStatistic", b)
});
TStart.add("style", function(a) {
	a.addStyleSheet("#tstart-plugin-switch .tstart-item-icon,.tstart-minimized .switch-mini,#tstart .i-arrow,#tstart .msg-count,#tstart .msg-count span,#tstart .icon-new,#tstart-plugin-news .t-msg-count .arrow,#tstart .switch-mini-tip{background-image:url(http://img03.taobaocdn.com/tps/i3/T1zYneXXlqXXaloVr4-167-122.png);background-repeat:no-repeat}body,#tstart h1,#tstart h2,#tstart h3,#tstart h4,#tstart h5,#tstart h6,#tstart hr,#tstart p,#tstart dl,#tstart dt,#tstart dd,#tstart ul,#tstart ol,#tstart li,#tstart pre,#tstart form,#tstart fieldset,#tstart legend,#tstart button,#tstart input,#tstart th,#tstart td{margin:0;padding:0}body,#tstart button,#start input,#tstart select{font:12px/1.5 tahoma,arial,\5b8b\4f53,sans-serif}#tstart h1,#tstart h2,#tstart h3,#tstart h4,#tstart h5,#tstart h6{font-size:100%}#tstart address,#tstart em{font-style:normal}#tstart code,#tstart pre{font-family:courier new,courier,monospace}#tstart small{font-size:12px}#tstart ul,#tstart ol{list-style:none}#tstart a{text-decoration:none}#tstart sup{vertical-align:text-top}#tstart sub{vertical-align:text-bottom}#tstart legend{color:#000}#tstart fieldset,#tstart img{border:0;margin:0;float:none}#tstart button,#tstart input,#tstart select{font-size:100%}#tstart .hidden,#tstart .tstart-hidden{display:none!important}#tstart .invisible,#tstart .tstart-invisible{visibility:hidden!important}#tstart{position:fixed;right:0;bottom:0;z-index:100000;height:28px;color:#3e3e3e;text-align:left;_position:absolute;_right:1px}#tstart .tstart-toolbar{height:28px;float:right;right:0}#tstart a{color:#000;text-decoration:none}#tstart .tstart-bd{height:28px;margin:0}#tstart .tstart-areas{position:relative;zoom:1;background-color:#e6e6e6;background-repeat:repeat-x;background-position:0 0;height:25px;line-height:25px;float:right;border:1px solid #d4d4d4;border-top:2px solid #f16101}#tstart .tstart-item{position:relative;zoom:1;float:left}#tstart .tstart-item{color:#000}#tstart .tstart-link-item a{float:left;padding:0 8px}#tstart a:hover{color:#f60;text-decoration:underline}#tstart .tstart-normal-trigger,#tstart .tstart-curstom-trigger,#tstart .tstart-drop-trigger{cursor:pointer;padding-left:8px}#tstart .tstart-normal-trigger a,#tstart .tstart-custom-trigger a,#tstart .tstart-drop-trigger a{display:inline-block}#tstart .i-arrow{width:5px;height:3px;background-position:-134px -59px;display:inline-block;vertical-align:middle;margin-left:2px}#tstart .tstart-item-active .i-arrow{visibility:hidden}#tstart i{background:0;display:inline-block;height:auto;line-height:1;margin:auto;overflow:hidden;text-indent:0;vertical-align:middle;width:auto}#tstart-plugin-switch{height:25px}#tstart-plugin-switch .toggle-area{cursor:pointer}#tstart-plugin-switch a{display:none}#tstart-plugin-switch .tstart-item-icon{display:inline-block;width:19px;height:25px;line-height:100px;overflow:hidden;zoom:1;background-position:0 -59px;vertical-align:middle;font-size:0;margin-top:0;vertical-align:top}.tstart-minimized #tstart-plugin-switch .tstart-item-icon{background-position:-18px -59px}#tstart .switch-mini-tip{display:none;width:135px;height:28px;overflow:hidden;position:absolute;top:-30px;margin-left:-160px;background-position:0 -94px}.tstart-minimized .hover .switch-mini-tip{display:inline-block!important}.tstart-minimized .switch-mini{display:inline-block!important;width:17px;height:17px;overflow:hidden;vertical-align:middle;margin:0 5px;background-position:-47px -59px;*margin-top:5px}.tstart-minimized .hover .switch-mini{background-position:-69px -59px}.tstart-minimized .tstart-bd{float:right;width:auto;display:inline}.tstart-minimized .tstart-areas{float:left;background:green}.tstart-minimized #tstart-plugin-tdog,.tstart-minimized #tstart-plugin-settings,.tstart-minimized #tstart-plugin-switch{display:block}.tstart-news-tip{position:absolute;bottom:0;left:0}#tstart-plugin-news .t-msg-count{position:absolute;bottom:-30px;right:5px;color:#fff;display:inline-block;text-align:right;*width:132px}#tstart-plugin-news .t-msg-count .tip{display:inline-block;text-decoration:none;border:1px solid #fbce67;background-color:#fee195;color:#3f4537;height:21px;line-height:21px;white-space:nowrap;padding:0 15px;font-weight:400;background-repeat:repeat-x;background-position:0 -134px}#tstart-plugin-news .t-msg-count em{color:#ff4300;font-weight:400;text-decoration:none;font-style:normal;margin:0 3px}#tstart-plugin-news .t-msg-count .arrow{width:11px;height:6px;right:10px;top:23px;position:absolute;z-index:2;background-position:-112px -59px}#tstart .tstart-item-active .t-msg-count{visibility:hidden}#tstart .msg-count,#tstart .msg-count span{display:inline-block;height:22px}#tstart .msg-count{padding-right:5px;background-position:right -32px;position:absolute;top:-15px;right:0;color:#fff;font-weight:600;line-height:16px}#tstart .msg-count span{padding-left:5px;background-position:0 0}#tstart .tstart-item-active .msg-count{display:none}#tstart-plugin-myapps .tip-intro{background:none repeat scroll 0 0 #ffffc5;border:1px solid #d4d4d4;height:24px;left:0;line-height:23px;overflow:visible;position:absolute;top:-30px;width:290px;z-index:60}#tstart-plugin-myapps .tip-intro i,#tstart-plugin-myapps .tip-intro .close,#tstart-plugin-myapps .tip-intro s{background:url(http://img04.taobaocdn.com/tps/i4/T1m4KGXi8jXXXXXXXX-120-213.png) no-repeat 0 0}#tstart-plugin-myapps .tip-intro i,#tstart-plugin-myapps .tip-intro .close{width:23px;height:23px;line-height:23px;display:inline-block}#tstart-plugin-myapps .tip-intro i{background-position:0 -190px}#tstart-plugin-myapps .tip-intro .close{background-position:-23px -190px;display:block;overflow:hidden;position:absolute;right:0;text-indent:-1000px;top:0;cursor:pointer}#tstart-plugin-myapps .tip-intro s{background-position:-46px -190px;display:block;height:13px;left:20px;position:absolute;top:24px;width:23px;z-index:100}#tstart-plugin-myapps .tip-intro a{color:#004d99}#tstart .icon-new{width:21px;height:16px;position:absolute;top:-7px;right:0;background-position:-96px -76px}#tstart .tstart-item-active .tip-new,#tstart .tstart-item-active .icon-new{display:none}#tstart .tstart-drop-panel{position:absolute}.tstart-toolbar .tstart-app{display:inline-block;border-right:1px solid #d2d4d4;padding-right:8px}.tstart-toolbar .tstart-sys{display:inline-block;padding-right:8px}.tstart-minimized .tstart-app,.tstart-minimized .tstart-sys{display:none}")
});
TStart.add("core~error", function(b) {
	var c = KISSY,
		a = c.Event,
		d = c.DOM;

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
		} catch (f) {}
		return false
	}
	b.Error = {
		init: function() {
			if (!c.UA.ie) {
				return false
			}
			c.ready(function() {
				var g = [],
					f = [];
				c.each(d.query("link"), function(i) {
					var h = i.href;
					if ("stylesheet" == i.getAttribute("rel") && -1 === h.indexOf("stargate/tstart") && !e(i)) {
						g.push(h);
						f.push(i)
					}
				});
				if (g.length) {
					new Image().src = "http://log.mmstat.com/tbapp.1025.0.0?stylesheet=" + g.join("|")
				}
			})
		}
	}
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
		a.addCustomPlugin("app");
		new Image().src = "http://ac.atpanel.com/tbapp.1000.0.0?t=" + b.now() + "&url=" + encodeURI(location.href.replace(location.hash, ""));
		a.Error.init()
	}
});