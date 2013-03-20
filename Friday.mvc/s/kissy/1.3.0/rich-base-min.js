﻿/*
Copyright 2012, KISSY UI Library v1.30
MIT Licensed
build time: Dec 20 22:28
*/
KISSY.add("rich-base", function(d, n) {
	function l() {
		var b, c;
		n.apply(this, arguments);
		c = this.get("listeners");
		for (b in c) this.on(b, c[b]);
		this.callMethodByHierarchy("initializer", "constructor");
		this.constructPlugins();
		this.callPluginsMethod("initializer");
		this.bindInternal();
		this.syncInternal()
	}
	function p(b) {
		if (b.target == this) this[m + b.type.slice(5).slice(0, -6)](b.newVal, b)
	}
	var j = d.ucfirst,
		m = "_onSet",
		o = d.noop;
	d.extend(l, n, {
		collectConstructorChains: function() {
			for (var b = [], c = this.constructor; c;) b.push(c),
			c = c.superclass && c.superclass.constructor;
			return b
		},
		callMethodByHierarchy: function(b, c) {
			for (var a = this.constructor, e = [], h, d, f, g, i; a;) {
				i = [];
				if (g = a.__ks_exts) for (f = 0; f < g.length; f++) if (h = g[f]) "constructor" != c && (h = h.prototype.hasOwnProperty(c) ? h.prototype[c] : null), h && i.push(h);
				a.prototype.hasOwnProperty(b) && (d = a.prototype[b]) && i.push(d);
				i.length && e.push.apply(e, i.reverse());
				a = a.superclass && a.superclass.constructor
			}
			for (f = e.length - 1; 0 <= f; f--) e[f] && e[f].call(this)
		},
		callPluginsMethod: function(b) {
			var c = this,
				b = "plugin" + j(b);
			d.each(c.get("plugins"), function(a) {
				if (a[b]) a[b](c)
			})
		},
		constructPlugins: function() {
			var b = this.get("plugins");
			d.each(b, function(c, a) {
				d.isFunction(c) && (b[a] = new c)
			})
		},
		bindInternal: function() {
			var b = this.getAttrs(),
				c, a;
			for (c in b) if (a = m + j(c), this[a]) this.on("after" + j(c) + "Change", p)
		},
		syncInternal: function() {
			var b, c, a, e, h, d = {}, f = this.collectConstructorChains(),
				g;
			for (a = f.length - 1; 0 <= a; a--) if (e = f[a], g = e.ATTRS) for (h in g) d[h] || (d[h] = 1, e = m + j(h), (c = this[e]) && !1 !== g[h].sync && void 0 !== (b = this.get(h)) && c.call(this, b))
		},
		initializer: o,
		destructor: o,
		destroy: function() {
			this.callPluginsMethod("destructor");
			for (var b = this.constructor, c, a, e; b;) {
				b.prototype.hasOwnProperty("destructor") && b.prototype.destructor.apply(this);
				if (c = b.__ks_exts) for (e = c.length - 1; 0 <= e; e--)(a = c[e] && c[e].prototype.__destructor) && a.apply(this);
				b = b.superclass && b.superclass.constructor
			}
			this.fire("destroy");
			this.detach()
		},
		plug: function(b) {
			d.isFunction(b) && (b = new b);
			b.pluginInitializer && b.pluginInitializer(this);
			this.get("plugins").push(b);
			return this
		},
		unplug: function(b) {
			var c = [],
				a = this,
				e = "string" == typeof b;
			d.each(a.get("plugins"), function(d) {
				var k = 0,
					f;
				b && (e ? (f = d.get && d.get("pluginId") || d.pluginId, f != b && (c.push(d), k = 1)) : d != b && (c.push(d), k = 1));
				k || d.pluginDestructor(a)
			});
			a.setInternal("plugins", c);
			return a
		},
		getPlugin: function(b) {
			var c = null;
			d.each(this.get("plugins"), function(a) {
				if ((a.get && a.get("pluginId") || a.pluginId) == b) return c = a, !1
			});
			return c
		}
	}, {
		ATTRS: {
			plugins: {
				value: []
			},
			listeners: {
				value: []
			}
		}
	});
	d.mix(l, {
		extend: function c(a, e, h) {
			var k =
				"RichBaseDerived",
				f, g;
			f = d.makeArray(arguments);
			if (null == a || d.isObject(a)) h = e, e = a, a = [];
			if ("string" == typeof(f = f[f.length - 1])) k = f;
			e = e || {};
			e.hasOwnProperty("constructor") ? g = e.constructor : (g = function() {
				g.superclass.constructor.apply(this, arguments)
			}, d.Config.debug && eval("C=function " + k.replace(/[-./]/g, "_") + "(){ C.superclass.constructor.apply(this, arguments);}"));
			g.name = k;
			d.extend(g, this, e, h);
			if (a) {
				g.__ks_exts = a;
				var i = {}, j = {};
				d.each(a.concat(g), function(a) {
					if (a) {
						d.each(a.ATTRS, function(a, c) {
							var e = i[c] = i[c] || {};
							d.mix(e, a)
						});
						var a = a.prototype,
							c;
						for (c in a) a.hasOwnProperty(c) && (j[c] = a[c])
					}
				});
				g.ATTRS = i;
				d.augment(g, j)
			}
			g.extend = c;
			return g
		}
	});
	return l
}, {
	requires: ["base"]
});