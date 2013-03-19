/*
Copyright 2013, KISSY UI Library v1.30
MIT Licensed
build time: Feb 17 19:29
*/
var KISSY = function(a) {
	var k = this,
		h, m = 0;
	h = {
		__BUILD_TIME: "20130217192945",
		Env: {
			host: k,
			nodejs: "function" == typeof require && "object" == typeof exports
		},
		Config: {
			debug: "",
			fns: {}
		},
		version: "1.30",
		config: function(e, c) {
			var i, b, o = this,
				d, p = h.Config,
				g = p.fns;
			h.isObject(e) ? h.each(e, function(a, f) {
				(d = g[f]) ? d.call(o, a) : p[f] = a
			}) : (i = g[e], c === a ? b = i ? i.call(o) : p[e] : i ? b = i.call(o, c) : p[e] = c);
			return b
		},
		log: function(e, c, i) {
			if (h.Config.debug && (i && (e = i + ": " + e), k.console !== a && console.log)) console[c && console[c] ? c : "log"](e)
		},
		error: function(a) {
			if (h.Config.debug) throw a instanceof Error ? a : Error(a);
		},
		guid: function(a) {
			return (a || "") + m++
		}
	};
	h.Env.nodejs && (h.KISSY = h, module.exports = h);
	return h
}();
(function(a, k) {
	function h() {}
	function m(a, f) {
		var j;
		d ? j = d(a) : (h.prototype = a, j = new h);
		j.constructor = f;
		return j
	}
	function e(n, f, j, l, d, b) {
		if (!f || !n) return n;
		j === k && (j = o);
		var g = 0,
			e, p, h;
		f[i] = n;
		b.push(f);
		if (l) {
			h = l.length;
			for (g = 0; g < h; g++) e = l[g], e in f && c(e, n, f, j, l, d, b)
		} else {
			p = a.keys(f);
			h = p.length;
			for (g = 0; g < h; g++) e = p[g], e != i && c(e, n, f, j, l, d, b)
		}
		return n
	}
	function c(n, f, j, l, d, b, g) {
		if (l || !(n in f) || b) {
			var c = f[n],
				j = j[n];
			if (c === j) c === k && (f[n] = c);
			else if (b && j && (a.isArray(j) || a.isPlainObject(j))) j[i] ? f[n] = j[i] : (b = c && (a.isArray(c) || a.isPlainObject(c)) ? c : a.isArray(j) ? [] : {}, f[n] = b, e(b, j, l, d, o, g));
			else if (j !== k && (l || !(n in f))) f[n] = j
		}
	}
	var i = "__MIX_CIRCULAR",
		b = this,
		o = !0,
		d = Object.create,
		p = !{
			toString: 1
		}.propertyIsEnumerable("toString"),
		g = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toString,toLocaleString,valueOf".split(",");
	(function(a, f) {
		for (var j in f) a[j] = f[j]
	})(a, {
		stamp: function(d, f, j) {
			if (!d) return d;
			var j = j || "__~ks_stamped",
				l = d[j];
			if (!l && !f) try {
				l = d[j] = a.guid(j)
			} catch (b) {
				l = k
			}
			return l
		},
		keys: function(a) {
			var f = [],
				j, l;
			for (j in a) f.push(j);
			if (p) for (l = g.length - 1; 0 <= l; l--) j = g[l], a.hasOwnProperty(j) && f.push(j);
			return f
		},
		mix: function(a, f, j, l, d) {
			"object" === typeof j && (l = j.whitelist, d = j.deep, j = j.overwrite);
			var b = [],
				g = 0;
			for (e(a, f, j, l, d, b); f = b[g++];) delete f[i];
			return a
		},
		merge: function(d) {
			var d = a.makeArray(arguments),
				f = {}, j, l = d.length;
			for (j = 0; j < l; j++) a.mix(f, d[j]);
			return f
		},
		augment: function(d, f) {
			var j = a.makeArray(arguments),
				l = j.length - 2,
				b = 1,
				g = j[l],
				c = j[l + 1];
			a.isArray(c) || (g = c, c = k, l++);
			a.isBoolean(g) || (g = k, l++);
			for (; b < l; b++) a.mix(d.prototype, j[b].prototype || j[b], g, c);
			return d
		},
		extend: function(d, f, j, l) {
			if (!f || !d) return d;
			var b = f.prototype,
				g;
			g = m(b, d);
			d.prototype = a.mix(g, d.prototype);
			d.superclass = m(b, f);
			j && a.mix(g, j);
			l && a.mix(d, l);
			return d
		},
		namespace: function() {
			var d = a.makeArray(arguments),
				f = d.length,
				j = null,
				l, g, c, e = d[f - 1] === o && f--;
			for (l = 0; l < f; l++) {
				c = ("" + d[l]).split(".");
				j = e ? b : this;
				for (g = b[c[0]] === j ? 1 : 0; g < c.length; ++g) j = j[c[g]] = j[c[g]] || {}
			}
			return j
		}
	})
})(KISSY);
(function(a, k) {
	var h = Array.prototype,
		m = h.indexOf,
		e = h.lastIndexOf,
		c = h.filter,
		i = h.every,
		b = h.some,
		o = h.map;
	a.mix(a, {
		each: function(d, b, g) {
			if (d) {
				var n, f, j = 0;
				n = d && d.length;
				f = n === k || "function" === a.type(d);
				g = g || null;
				if (f) for (f = a.keys(d); j < f.length && !(n = f[j], !1 === b.call(g, d[n], n, d)); j++);
				else for (f = d[0]; j < n && !1 !== b.call(g, f, j, d); f = d[++j]);
			}
			return d
		},
		indexOf: m ? function(a, b) {
			return m.call(b, a)
		} : function(a, b) {
			for (var g = 0, n = b.length; g < n; ++g) if (b[g] === a) return g;
			return -1
		},
		lastIndexOf: e ? function(a, b) {
			return e.call(b,
			a)
		} : function(a, b) {
			for (var g = b.length - 1; 0 <= g && b[g] !== a; g--);
			return g
		},
		unique: function(d, b) {
			var g = d.slice();
			b && g.reverse();
			for (var n = 0, f, j; n < g.length;) {
				for (j = g[n];
				(f = a.lastIndexOf(j, g)) !== n;) g.splice(f, 1);
				n += 1
			}
			b && g.reverse();
			return g
		},
		inArray: function(d, b) {
			return -1 < a.indexOf(d, b)
		},
		filter: c ? function(a, b, g) {
			return c.call(a, b, g || this)
		} : function(b, c, g) {
			var n = [];
			a.each(b, function(f, a, l) {
				c.call(g || this, f, a, l) && n.push(f)
			});
			return n
		},
		map: o ? function(a, b, g) {
			return o.call(a, b, g || this)
		} : function(a, b, g) {
			for (var n = a.length, f = Array(n), j = 0; j < n; j++) {
				var l = "string" == typeof a ? a.charAt(j) : a[j];
				if (l || j in a) f[j] = b.call(g || this, l, j, a)
			}
			return f
		},
		reduce: function(a, b, g) {
			var n = a.length;
			if ("function" !== typeof b) throw new TypeError("callback is not function!");
			if (0 === n && 2 == arguments.length) throw new TypeError("arguments invalid");
			var f = 0,
				j;
			if (3 <= arguments.length) j = arguments[2];
			else {
				do {
					if (f in a) {
						j = a[f++];
						break
					}
					f += 1;
					if (f >= n) throw new TypeError;
				} while (1)
			}
			for (; f < n;) f in a && (j = b.call(k, j, a[f], f, a)), f++;
			return j
		},
		every: i ? function(a,
		b, g) {
			return i.call(a, b, g || this)
		} : function(a, b, g) {
			for (var n = a && a.length || 0, f = 0; f < n; f++) if (f in a && !b.call(g, a[f], f, a)) return !1;
			return !0
		},
		some: b ? function(a, c, g) {
			return b.call(a, c, g || this)
		} : function(a, b, g) {
			for (var n = a && a.length || 0, f = 0; f < n; f++) if (f in a && b.call(g, a[f], f, a)) return !0;
			return !1
		},
		makeArray: function(b) {
			if (null == b) return [];
			if (a.isArray(b)) return b;
			if ("number" !== typeof b.length || b.alert || "string" == typeof b || a.isFunction(b)) return [b];
			for (var c = [], g = 0, n = b.length; g < n; g++) c[g] = b[g];
			return c
		}
	})
})(KISSY);
(function(a, k) {
	function h(a) {
		var b = typeof a;
		return null == a || "object" !== b && "function" !== b
	}
	function m() {
		if (o) return o;
		var b = c;
		a.each(i, function(a) {
			b += a + "|"
		});
		b = b.slice(0, -1);
		return o = RegExp(b, "g")
	}
	function e() {
		if (d) return d;
		var g = c;
		a.each(b, function(a) {
			g += a + "|"
		});
		g += "&#(\\d{1,5});";
		return d = RegExp(g, "g")
	}
	var c = "",
		i = {
			"&amp;": "&",
			"&gt;": ">",
			"&lt;": "<",
			"&#x60;": "`",
			"&#x2F;": "/",
			"&quot;": '"',
			"&#x27;": "'"
		}, b = {}, o, d, p = /[\-#$\^*()+\[\]{}|\\,.?\s]/g;
	(function() {
		for (var a in i) b[i[a]] = a
	})();
	a.mix(a, {
		urlEncode: function(a) {
			return encodeURIComponent("" + a)
		},
		urlDecode: function(a) {
			return decodeURIComponent(a.replace(/\+/g, " "))
		},
		fromUnicode: function(a) {
			return a.replace(/\\u([a-f\d]{4})/ig, function(a, f) {
				return String.fromCharCode(parseInt(f, 16))
			})
		},
		escapeHTML: function(a) {
			return (a + "").replace(m(), function(a) {
				return b[a]
			})
		},
		escapeRegExp: function(a) {
			return a.replace(p, "\\$&")
		},
		unEscapeHTML: function(a) {
			return a.replace(e(), function(a, f) {
				return i[a] || String.fromCharCode(+f)
			})
		},
		param: function(b, d, f, j) {
			if (!a.isPlainObject(b)) return c;
			d = d || "&";
			f = f || "=";
			a.isUndefined(j) && (j = !0);
			var l = [],
				e, o, i, m, p, t = a.urlEncode;
			for (e in b) if (p = b[e], e = t(e), h(p)) l.push(e), p !== k && l.push(f, t(p + c)), l.push(d);
			else if (a.isArray(p) && p.length) {
				o = 0;
				for (m = p.length; o < m; ++o) i = p[o], h(i) && (l.push(e, j ? t("[]") : c), i !== k && l.push(f, t(i + c)), l.push(d))
			}
			l.pop();
			return l.join(c)
		},
		unparam: function(b, d, f) {
			if ("string" != typeof b || !(b = a.trim(b))) return {};
			for (var f = f || "=", j = {}, l, c = a.urlDecode, b = b.split(d || "&"), e = 0, o = b.length; e < o; ++e) {
				l = b[e].indexOf(f);
				if (-1 == l) d = c(b[e]), l = k;
				else {
					d = c(b[e].substring(0, l));
					l = b[e].substring(l + 1);
					try {
						l = c(l)
					} catch (i) {}
					a.endsWith(d, "[]") && (d = d.substring(0, d.length - 2))
				}
				d in j ? a.isArray(j[d]) ? j[d].push(l) : j[d] = [j[d], l] : j[d] = l
			}
			return j
		}
	})
})(KISSY);
(function(a) {
	function k(a, m, e) {
		var c = [].slice,
			i = c.call(arguments, 3),
			b = function() {}, o = function() {
				var d = c.call(arguments);
				return m.apply(this instanceof b ? this : e, a ? d.concat(i) : i.concat(d))
			};
		b.prototype = m.prototype;
		o.prototype = new b;
		return o
	}
	a.mix(a, {
		noop: function() {},
		bind: k(0, k, null, 0),
		rbind: k(0, k, null, 1),
		later: function(h, m, e, c, i) {
			var m = m || 0,
				b = h,
				o = a.makeArray(i),
				d;
			"string" == typeof h && (b = c[h]);
			h = function() {
				b.apply(c, o)
			};
			d = e ? setInterval(h, m) : setTimeout(h, m);
			return {
				id: d,
				interval: e,
				cancel: function() {
					this.interval ? clearInterval(d) : clearTimeout(d)
				}
			}
		},
		throttle: function(h, m, e) {
			m = m || 150;
			if (-1 === m) return function() {
				h.apply(e || this, arguments)
			};
			var c = a.now();
			return function() {
				var i = a.now();
				i - c > m && (c = i, h.apply(e || this, arguments))
			}
		},
		buffer: function(h, m, e) {
			function c() {
				c.stop();
				i = a.later(h, m, 0, e || this, arguments)
			}
			m = m || 150;
			if (-1 === m) return function() {
				h.apply(e || this, arguments)
			};
			var i = null;
			c.stop = function() {
				i && (i.cancel(), i = 0)
			};
			return c
		}
	})
})(KISSY);
(function(a, k) {
	function h(b, d, e) {
		var g = b,
			n, f, j, l;
		if (!b) return g;
		if (b[i]) return e[b[i]].destination;
		if ("object" === typeof b) {
			l = b.constructor;
			if (a.inArray(l, [Boolean, String, Number, Date, RegExp])) g = new l(b.valueOf());
			else if (n = a.isArray(b)) g = d ? a.filter(b, d) : b.concat();
			else if (f = a.isPlainObject(b)) g = {};
			b[i] = l = a.guid();
			e[l] = {
				destination: g,
				input: b
			}
		}
		if (n) for (b = 0; b < g.length; b++) g[b] = h(g[b], d, e);
		else if (f) for (j in b) if (j !== i && (!d || d.call(b, b[j], j, b) !== c)) g[j] = h(b[j], d, e);
		return g
	}
	function m(c, d, i, g) {
		if (c[b] === d && d[b] === c) return e;
		c[b] = d;
		d[b] = c;
		var n = function(f, a) {
			return null !== f && f !== k && f[a] !== k
		}, f;
		for (f in d)!n(c, f) && n(d, f) && i.push("expected has key '" + f + "', but missing from actual.");
		for (f in c)!n(d, f) && n(c, f) && i.push("expected missing key '" + f + "', but present in actual.");
		for (f in d) f != b && (a.equals(c[f], d[f], i, g) || g.push("'" + f + "' was '" + (d[f] ? d[f].toString() : d[f]) + "' in expected, but was '" + (c[f] ? c[f].toString() : c[f]) + "' in actual."));
		a.isArray(c) && a.isArray(d) && c.length != d.length && g.push("arrays were not the same length");
		delete c[b];
		delete d[b];
		return 0 === i.length && 0 === g.length
	}
	var e = !0,
		c = !1,
		i = "__~ks_cloned",
		b = "__~ks_compared";
	a.mix(a, {
		equals: function(b, d, c, g) {
			c = c || [];
			g = g || [];
			return b === d ? e : b === k || null === b || d === k || null === d ? null == b && null == d : b instanceof Date && d instanceof Date ? b.getTime() == d.getTime() : "string" == typeof b && "string" == typeof d || a.isNumber(b) && a.isNumber(d) ? b == d : "object" === typeof b && "object" === typeof d ? m(b, d, c, g) : b === d
		},
		clone: function(b, c) {
			var e = {}, g = h(b, c, e);
			a.each(e, function(a) {
				a = a.input;
				if (a[i]) try {
					delete a[i]
				} catch (f) {
					a[i] = k
				}
			});
			e = null;
			return g
		},
		now: Date.now || function() {
			return +new Date
		}
	})
})(KISSY);
(function(a, k) {
	var h = /^[\s\xa0]+|[\s\xa0]+$/g,
		m = String.prototype.trim,
		e = /\\?\{([^{}]+)\}/g;
	a.mix(a, {
		trim: m ? function(a) {
			return null == a ? "" : m.call(a)
		} : function(a) {
			return null == a ? "" : (a + "").replace(h, "")
		},
		substitute: function(a, i, b) {
			return "string" != typeof a || !i ? a : a.replace(b || e, function(a, b) {
				return "\\" === a.charAt(0) ? a.slice(1) : i[b] === k ? "" : i[b]
			})
		},
		ucfirst: function(a) {
			a += "";
			return a.charAt(0).toUpperCase() + a.substring(1)
		},
		startsWith: function(a, e) {
			return 0 === a.lastIndexOf(e, 0)
		},
		endsWith: function(a, e) {
			var b = a.length - e.length;
			return 0 <= b && a.indexOf(e, b) == b
		}
	})
})(KISSY);
(function(a, k) {
	var h = {}, m = Object.prototype.toString;
	a.mix(a, {
		isBoolean: 0,
		isNumber: 0,
		isString: 0,
		isFunction: 0,
		isArray: 0,
		isDate: 0,
		isRegExp: 0,
		isObject: 0,
		type: function(a) {
			return null == a ? "" + a : h[m.call(a)] || "object"
		},
		isNull: function(a) {
			return null === a
		},
		isUndefined: function(a) {
			return a === k
		},
		isEmptyObject: function(a) {
			for (var c in a) if (c !== k) return !1;
			return !0
		},
		isPlainObject: function(e) {
			if (!e || "object" !== a.type(e) || e.nodeType || e.window == e) return !1;
			try {
				if (e.constructor && !Object.prototype.hasOwnProperty.call(e,
					"constructor") && !Object.prototype.hasOwnProperty.call(e.constructor.prototype, "isPrototypeOf")) return !1
			} catch (c) {
				return !1
			}
			for (var i in e);
			return i === k || Object.prototype.hasOwnProperty.call(e, i)
		}
	});
	a.each("Boolean,Number,String,Function,Array,Date,RegExp,Object".split(","), function(e, c) {
		h["[object " + e + "]"] = c = e.toLowerCase();
		a["is" + e] = function(e) {
			return a.type(e) == c
		}
	})
})(KISSY);
(function(a, k) {
	function h(a, f, b) {
		if (a instanceof i) return b(a[p]);
		var l = a[p];
		if (a = a[g]) a.push([f, b]);
		else if (e(l)) h(l, f, b);
		else return f && f(l);
		return k
	}
	function m(a) {
		if (!(this instanceof m)) return new m(a);
		this.promise = a || new c
	}
	function e(a) {
		return a && a instanceof c
	}
	function c(a) {
		this[p] = a;
		a === k && (this[g] = [])
	}
	function i(a) {
		if (a instanceof i) return a;
		c.apply(this, arguments);
		return k
	}
	function b(a, f, b) {
		function l(a) {
			try {
				return f ? f(a) : a
			} catch (b) {
				return new i(b)
			}
		}
		function d(a) {
			try {
				return b ? b(a) : new i(a)
			} catch (f) {
				return new i(f)
			}
		}

		function e(a) {
			o || (o = 1, g.resolve(l(a)))
		}
		var g = new m,
			o = 0;
		a instanceof c ? h(a, e, function(a) {
			o || (o = 1, g.resolve(d(a)))
		}) : e(a);
		return g.promise
	}
	function o(a) {
		return !d(a) && e(a) && a[g] === k && (!e(a[p]) || o(a[p]))
	}
	function d(a) {
		return e(a) && a[g] === k && a[p] instanceof i
	}
	var p = "__promise_value",
		g = "__promise_pendings";
	m.prototype = {
		constructor: m,
		resolve: function(b) {
			var f = this.promise,
				j;
			if (!(j = f[g])) return k;
			f[p] = b;
			j = [].concat(j);
			f[g] = k;
			a.each(j, function(a) {
				h(f, a[0], a[1])
			});
			return b
		},
		reject: function(a) {
			return this.resolve(new i(a))
		}
	};
	c.prototype = {
		constructor: c,
		then: function(a, f) {
			return b(this, a, f)
		},
		fail: function(a) {
			return b(this, 0, a)
		},
		fin: function(a) {
			return b(this, function(f) {
				return a(f, !0)
			}, function(f) {
				return a(f, !1)
			})
		},
		isResolved: function() {
			return o(this)
		},
		isRejected: function() {
			return d(this)
		}
	};
	a.extend(i, c);
	KISSY.Defer = m;
	KISSY.Promise = c;
	c.Defer = m;
	a.mix(c, {
		when: b,
		isPromise: e,
		isResolved: o,
		isRejected: d,
		all: function(a) {
			var f = a.length;
			if (!f) return a;
			for (var j = m(), l = 0; l < a.length; l++)(function(l, d) {
				b(l, function(b) {
					a[d] = b;
					0 === --f && j.resolve(a)
				}, function(a) {
					j.reject(a)
				})
			})(a[l], l);
			return j.promise
		}
	})
})(KISSY);
(function(a) {
	function k(a, c) {
		for (var i = 0, b = a.length - 1, h = [], d; 0 <= b; b--) d = a[b], "." != d && (".." === d ? i++ : i ? i-- : h[h.length] = d);
		if (c) for (; i--; i) h[h.length] = "..";
		return h = h.reverse()
	}
	var h = /^(\/?)([\s\S]+\/(?!$)|\/)?((?:\.{1,2}$|[\s\S]+?)?(\.[^.\/]*)?)$/,
		m = {
			resolve: function() {
				var e = "",
					c, i = arguments,
					b, h = 0;
				for (c = i.length - 1; 0 <= c && !h; c--) b = i[c], "string" == typeof b && b && (e = b + "/" + e, h = "/" == b.charAt(0));
				e = k(a.filter(e.split("/"), function(a) {
					return !!a
				}), !h).join("/");
				return (h ? "/" : "") + e || "."
			},
			normalize: function(e) {
				var c =
					"/" == e.charAt(0),
					h = "/" == e.slice(-1),
					e = k(a.filter(e.split("/"), function(a) {
						return !!a
					}), !c).join("/");
				!e && !c && (e = ".");
				e && h && (e += "/");
				return (c ? "/" : "") + e
			},
			join: function() {
				var e = a.makeArray(arguments);
				return m.normalize(a.filter(e, function(a) {
					return a && "string" == typeof a
				}).join("/"))
			},
			relative: function(e, c) {
				var e = m.normalize(e),
					c = m.normalize(c),
					h = a.filter(e.split("/"), function(a) {
						return !!a
					}),
					b = [],
					o, d, k = a.filter(c.split("/"), function(a) {
						return !!a
					});
				d = Math.min(h.length, k.length);
				for (o = 0; o < d && h[o] == k[o]; o++);
				for (d = o; o < h.length;) b.push(".."), o++;
				b = b.concat(k.slice(d));
				return b = b.join("/")
			},
			basename: function(a, c) {
				var i;
				i = (a.match(h) || [])[3] || "";
				c && i && i.slice(-1 * c.length) == c && (i = i.slice(0, -1 * c.length));
				return i
			},
			dirname: function(a) {
				var c = a.match(h) || [],
					a = c[1] || "",
					c = c[2] || "";
				if (!a && !c) return ".";
				c && (c = c.substring(0, c.length - 1));
				return a + c
			},
			extname: function(a) {
				return (a.match(h) || [])[4] || ""
			}
		};
	a.Path = m
})(KISSY);
(function(a, k) {
	function h(f) {
		f._queryMap || (f._queryMap = a.unparam(f._query))
	}
	function m(a) {
		this._query = a || ""
	}
	function e(a, b) {
		return encodeURI(a).replace(b, function(a) {
			a = a.charCodeAt(0).toString(16);
			return "%" + (1 == a.length ? "0" + a : a)
		})
	}
	function c(f) {
		if (f instanceof c) return f.clone();
		var b = this;
		a.mix(b, {
			scheme: "",
			userInfo: "",
			hostname: "",
			port: "",
			path: "",
			query: "",
			fragment: ""
		});
		f = c.getComponents(f);
		a.each(f, function(f, d) {
			f = f || "";
			if ("query" == d) b.query = new m(f);
			else {
				try {
					f = a.urlDecode(f)
				} catch (c) {}
				b[d] = f
			}
		});
		return b
	}
	var i = /[#\/\?@]/g,
		b = /[#\?]/g,
		o = /[#@]/g,
		d = /#/g,
		p = RegExp("^(?:([\\w\\d+.-]+):)?(?://(?:([^/?#@]*)@)?([\\w\\d\\-\\u0100-\\uffff.+%]*|\\[[^\\]]+\\])(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),
		g = a.Path,
		n = {
			scheme: 1,
			userInfo: 2,
			hostname: 3,
			port: 4,
			path: 5,
			query: 6,
			fragment: 7
		};
	m.prototype = {
		constructor: m,
		clone: function() {
			return new m(this.toString())
		},
		reset: function(a) {
			this._query = a || "";
			this._queryMap = null;
			return this
		},
		count: function() {
			var f = 0,
				b = this._queryMap,
				l;
			h(this);
			for (l in b) a.isArray(b[l]) ? f += b[l].length : f++;
			return f
		},
		has: function(f) {
			var b;
			h(this);
			b = this._queryMap;
			return f ? f in b : !a.isEmptyObject(b)
		},
		get: function(a) {
			var b;
			h(this);
			b = this._queryMap;
			return a ? b[a] : b
		},
		keys: function() {
			h(this);
			return a.keys(this._queryMap)
		},
		set: function(f, b) {
			var l;
			h(this);
			l = this._queryMap;
			"string" == typeof f ? this._queryMap[f] = b : (f instanceof m && (f = f.get()), a.each(f, function(a, f) {
				l[f] = a
			}));
			return this
		},
		remove: function(a) {
			h(this);
			a ? delete this._queryMap[a] : this._queryMap = {};
			return this
		},
		add: function(f, b) {
			var l = this,
				d, c;
			a.isObject(f) ? (f instanceof m && (f = f.get()), a.each(f, function(a, f) {
				l.add(f, a)
			})) : (h(l), d = l._queryMap, c = d[f], c = c === k ? b : [].concat(c).concat(b), d[f] = c);
			return l
		},
		toString: function(f) {
			h(this);
			return a.param(this._queryMap, k, k, f)
		}
	};
	c.prototype = {
		constructor: c,
		clone: function() {
			var f = new c,
				b = this;
			a.each(n, function(a, d) {
				f[d] = b[d]
			});
			f.query = f.query.clone();
			return f
		},
		resolve: function(f) {
			"string" == typeof f && (f = new c(f));
			var b = 0,
				l, d = this.clone();
			a.each("scheme,userInfo,hostname,port,path,query,fragment".split(","),

			function(c) {
				if (c == "path") if (b) d[c] = f[c];
				else {
					if (c = f.path) {
						b = 1;
						if (!a.startsWith(c, "/")) if (d.hostname && !d.path) c = "/" + c;
						else if (d.path) {
							l = d.path.lastIndexOf("/");
							l != -1 && (c = d.path.slice(0, l + 1) + c)
						}
						d.path = g.normalize(c)
					}
				} else if (c == "query") {
					if (b || f.query.toString()) {
						d.query = f.query.clone();
						b = 1
					}
				} else if (b || f[c]) {
					d[c] = f[c];
					b = 1
				}
			});
			return d
		},
		getScheme: function() {
			return this.scheme
		},
		setScheme: function(a) {
			this.scheme = a;
			return this
		},
		getHostname: function() {
			return this.hostname
		},
		setHostname: function(a) {
			this.hostname = a;
			return this
		},
		setUserInfo: function(a) {
			this.userInfo = a;
			return this
		},
		getUserInfo: function() {
			return this.userInfo
		},
		setPort: function(a) {
			this.port = a;
			return this
		},
		getPort: function() {
			return this.port
		},
		setPath: function(a) {
			this.path = a;
			return this
		},
		getPath: function() {
			return this.path
		},
		setQuery: function(b) {
			"string" == typeof b && (a.startsWith(b, "?") && (b = b.slice(1)), b = new m(e(b, o)));
			this.query = b;
			return this
		},
		getQuery: function() {
			return this.query
		},
		getFragment: function() {
			return this.fragment
		},
		setFragment: function(b) {
			a.startsWith(b,
				"#") && (b = b.slice(1));
			this.fragment = b;
			return this
		},
		isSameOriginAs: function(a) {
			return this.hostname.toLowerCase() == a.hostname.toLowerCase() && this.scheme.toLowerCase() == a.scheme.toLowerCase() && this.port.toLowerCase() == a.port.toLowerCase()
		},
		toString: function(f) {
			var j = [],
				l, c;
			if (l = this.scheme) j.push(e(l, i)), j.push(":");
			if (l = this.hostname) {
				j.push("//");
				if (c = this.userInfo) j.push(e(c, i)), j.push("@");
				j.push(encodeURIComponent(l));
				if (c = this.port) j.push(":"), j.push(c)
			}
			if (c = this.path) l && !a.startsWith(c, "/") && (c = "/" + c), c = g.normalize(c), j.push(e(c, b));
			if (f = this.query.toString.call(this.query, f)) j.push("?"), j.push(f);
			if (f = this.fragment) j.push("#"), j.push(e(f, d));
			return j.join("")
		}
	};
	c.Query = m;
	c.getComponents = function(b) {
		var j = (b || "").match(p) || [],
			d = {};
		a.each(n, function(a, b) {
			d[b] = j[a]
		});
		return d
	};
	a.Uri = c
})(KISSY);
(function(a, k) {
	var h = a.Env.host,
		m = h.document,
		h = (h = h.navigator) && h.userAgent || "",
		e, c = "",
		i = "",
		b, o = [6, 9],
		d = m && m.createElement("div"),
		p = [],
		g = KISSY.UA = {
			webkit: k,
			trident: k,
			gecko: k,
			presto: k,
			chrome: k,
			safari: k,
			firefox: k,
			ie: k,
			opera: k,
			mobile: k,
			core: k,
			shell: k,
			phantomjs: k,
			os: k,
			ipad: k,
			iphone: k,
			ipod: k,
			ios: k,
			android: k,
			nodejs: k
		}, n = function(a) {
			var b = 0;
			return parseFloat(a.replace(/\./g, function() {
				return 0 === b++ ? "." : ""
			}))
		};
	d && (d.innerHTML = "<\!--[if IE {{version}}]><s></s><![endif]--\>".replace("{{version}}", ""), p = d.getElementsByTagName("s"));
	if (0 < p.length) {
		i = "ie";
		g[c = "trident"] = 0.1;
		if ((b = h.match(/Trident\/([\d.]*)/)) && b[1]) g[c] = n(b[1]);
		b = o[0];
		for (o = o[1]; b <= o; b++) if (d.innerHTML = "<\!--[if IE {{version}}]><s></s><![endif]--\>".replace("{{version}}", b), 0 < p.length) {
			g[i] = b;
			break
		}
	} else if ((b = h.match(/AppleWebKit\/([\d.]*)/)) && b[1]) {
		g[c = "webkit"] = n(b[1]);
		if ((b = h.match(/Chrome\/([\d.]*)/)) && b[1]) g[i = "chrome"] = n(b[1]);
		else if ((b = h.match(/\/([\d.]*) Safari/)) && b[1]) g[i = "safari"] = n(b[1]);
		if (/ Mobile\//.test(h) && h.match(/iPad|iPod|iPhone/)) {
			g.mobile =
				"apple";
			if ((b = h.match(/OS ([^\s]*)/)) && b[1]) g.ios = n(b[1].replace("_", "."));
			e = "ios";
			if ((b = h.match(/iPad|iPod|iPhone/)) && b[0]) g[b[0].toLowerCase()] = g.ios
		} else if (/ Android/.test(h)) {
			if (/Mobile/.test(h) && (e = g.mobile = "android"), (b = h.match(/Android ([^\s]*);/)) && b[1]) g.android = n(b[1])
		} else if (b = h.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/)) g.mobile = b[0].toLowerCase();
		if ((b = h.match(/PhantomJS\/([^\s]*)/)) && b[1]) g.phantomjs = n(b[1])
	} else if ((b = h.match(/Presto\/([\d.]*)/)) && b[1]) {
		if (g[c = "presto"] = n(b[1]), (b = h.match(/Opera\/([\d.]*)/)) && b[1]) {
			g[i = "opera"] = n(b[1]);
			if ((b = h.match(/Opera\/.* Version\/([\d.]*)/)) && b[1]) g[i] = n(b[1]);
			if ((b = h.match(/Opera Mini[^;]*/)) && b) g.mobile = b[0].toLowerCase();
			else if ((b = h.match(/Opera Mobi[^;]*/)) && b) g.mobile = b[0]
		}
	} else if ((b = h.match(/MSIE\s([^;]*)/)) && b[1]) {
		if (g[c = "trident"] = 0.1, g[i = "ie"] = n(b[1]), (b = h.match(/Trident\/([\d.]*)/)) && b[1]) g[c] = n(b[1])
	} else if (b = h.match(/Gecko/)) {
		g[c = "gecko"] = 0.1;
		if ((b = h.match(/rv:([\d.]*)/)) && b[1]) g[c] = n(b[1]);
		if ((b = h.match(/Firefox\/([\d.]*)/)) && b[1]) g[i = "firefox"] = n(b[1])
	}
	e || (/windows|win32/i.test(h) ? e = "windows" : /macintosh|mac_powerpc/i.test(h) ? e = "macintosh" : /linux/i.test(h) ? e = "linux" : /rhino/i.test(h) && (e = "rhino"));
	if ("object" === typeof process) {
		var f, j;
		if ((f = process.versions) && (j = f.node)) e = process.platform, g.nodejs = n(j)
	}
	g.os = e;
	g.core = c;
	g.shell = i;
	g._numberify = n;
	e = "webkit,trident,gecko,presto,chrome,safari,firefox,ie,opera".split(",");
	var m = m && m.documentElement,
		l = "";
	m && (a.each(e, function(a) {
		var b = g[a];
		if (b) {
			l = l + (" ks-" + a + (parseInt(b) + ""));
			l = l + (" ks-" + a)
		}
	}), a.trim(l) && (m.className = a.trim(m.className + l)))
})(KISSY);
(function(a) {
	var k = a.Env,
		h = k.host,
		m = a.UA,
		e = h.document || {}, c = "ontouchstart" in e && !m.phantomjs,
		i = (e = e.documentMode) || m.ie,
		b = (k.nodejs && "object" === typeof global ? global : h).JSON;
	e && 9 > e && (b = 0);
	a.Features = {
		isTouchSupported: function() {
			return c
		},
		isDeviceMotionSupported: function() {
			return !!h.DeviceMotionEvent
		},
		isHashChangeSupported: function() {
			return "onhashchange" in h && (!i || 7 < i)
		},
		isNativeJSONSupported: function() {
			return b
		}
	}
})(KISSY);
(function(a) {
	function k(a) {
		this.runtime = a
	}
	k.Status = {
		INIT: 0,
		LOADING: 1,
		LOADED: 2,
		ERROR: 3,
		ATTACHED: 4
	};
	a.Loader = k;
	a.Loader.Status = k.Status
})(KISSY);
(function(a) {
	function k(a, e, c) {
		a = a[h] || (a[h] = {});
		c && (a[e] = a[e] || []);
		return a[e]
	}
	a.namespace("Loader");
	var h = "__events__" + a.now();
	KISSY.Loader.Target = {
		on: function(a, e) {
			k(this, a, 1).push(e)
		},
		detach: function(m, e) {
			var c, i;
			if (m) {
				if (c = k(this, m)) e && (i = a.indexOf(e, c), -1 != i && c.splice(i, 1)), (!e || !c.length) && delete(this[h] || (this[h] = {}))[m]
			} else delete this[h]
		},
		fire: function(a, e) {
			var c = k(this, a) || [],
				h, b = c.length;
			for (h = 0; h < b; h++) c[h].call(null, e)
		}
	}
})(KISSY);
(function(a) {
	function k(a) {
		if ("string" == typeof a) return h(a);
		for (var b = [], d = 0, c = a.length; d < c; d++) b[d] = h(a[d]);
		return b
	}
	function h(a) {
		"/" == a.charAt(a.length - 1) && (a += "index");
		return a
	}
	function m(b, j, d) {
		var b = b.Env.mods,
			c, g, j = a.makeArray(j);
		for (g = 0; g < j.length; g++) if (c = b[j[g]], !c || c.status !== d) return 0;
		return 1
	}
	var e = a.Loader,
		c = a.Path,
		i = a.Env.host,
		b = a.startsWith,
		o = e.Status,
		d = o.ATTACHED,
		p = o.LOADED,
		g = a.Loader.Utils = {}, n = i.document;
	a.mix(g, {
		docHead: function() {
			return n.getElementsByTagName("head")[0] || n.documentElement
		},
		normalDepModuleName: function(a, j) {
			var d = 0,
				e;
			if (!j) return j;
			if ("string" == typeof j) return b(j, "../") || b(j, "./") ? c.resolve(c.dirname(a), j) : c.normalize(j);
			for (e = j.length; d < e; d++) j[d] = g.normalDepModuleName(a, j[d]);
			return j
		},
		createModulesInfo: function(b, j) {
			a.each(j, function(a) {
				g.createModuleInfo(b, a)
			})
		},
		createModuleInfo: function(b, j, d) {
			var j = h(j),
				c = b.Env.mods,
				g = c[j];
			return g ? g : c[j] = g = new e.Module(a.mix({
				name: j,
				runtime: b
			}, d))
		},
		isAttached: function(a, b) {
			return m(a, b, d)
		},
		isLoaded: function(a, b) {
			return m(a, b,
			p)
		},
		getModules: function(b, j) {
			var c = [b],
				e, h, i, n, k = b.Env.mods;
			a.each(j, function(j) {
				e = k[j];
				if (!e || "css" != e.getType()) h = g.unalias(b, j), (i = a.reduce(h, function(a, b) {
					n = k[b];
					return a && n && n.status == d
				}, !0)) ? c.push(k[h[0]].value) : c.push(null)
			});
			return c
		},
		attachModsRecursively: function(a, b, d) {
			var d = d || [],
				c, e = 1,
				h = a.length,
				i = d.length;
			for (c = 0; c < h; c++) e = g.attachModRecursively(a[c], b, d) && e, d.length = i;
			return e
		},
		attachModRecursively: function(b, j, c) {
			var e, h = j.Env.mods[b];
			if (!h) return 0;
			e = h.status;
			if (e == d) return 1;
			if (e != p) return 0;
			if (a.Config.debug) {
				if (a.inArray(b, c)) return c.push(b), 0;
				c.push(b)
			}
			return g.attachModsRecursively(h.getNormalizedRequires(), j, c) ? (g.attachMod(j, h), 1) : 0
		},
		attachMod: function(a, b) {
			if (b.status == p) {
				var c = b.fn;
				c && (b.value = c.apply(b, g.getModules(a, b.getRequiresWithAlias())));
				b.status = d;
				a.getLoader().fire("afterModAttached", {
					mod: b
				})
			}
		},
		getModNamesAsArray: function(a) {
			"string" == typeof a && (a = a.replace(/\s+/g, "").split(","));
			return a
		},
		normalizeModNames: function(a, b, d) {
			return g.unalias(a, g.normalizeModNamesWithAlias(a,
			b, d))
		},
		unalias: function(a, b) {
			for (var d = [].concat(b), c, g, e, h = 0, i, n = a.Env.mods; !h;) {
				h = 1;
				for (c = d.length - 1; 0 <= c; c--) if ((g = n[d[c]]) && (e = g.alias)) {
					h = 0;
					for (i = e.length - 1; 0 <= i; i--) e[i] || e.splice(i, 1);
					d.splice.apply(d, [c, 1].concat(k(e)))
				}
			}
			return d
		},
		normalizeModNamesWithAlias: function(a, b, d) {
			var a = [],
				c, e;
			if (b) {
				c = 0;
				for (e = b.length; c < e; c++) b[c] && a.push(k(b[c]))
			}
			d && (a = g.normalDepModuleName(d, a));
			return a
		},
		registerModule: function(b, d, c, e) {
			var h = b.Env.mods,
				i = h[d];
			if (!i || !i.fn) g.createModuleInfo(b, d), i = h[d], a.mix(i, {
				name: d,
				status: p,
				fn: c
			}), a.mix(i, e)
		},
		getMappedPath: function(a, b, d) {
			for (var a = d || a.Config.mappedRules || [], c, d = 0; d < a.length; d++) if (c = a[d], b.match(c[0])) return b.replace(c[0], c[1]);
			return b
		}
	})
})(KISSY);
(function(a) {
	function k(a, c) {
		return c in a ? a[c] : a.runtime.Config[c]
	}
	function h(b) {
		a.mix(this, b)
	}
	function m(b) {
		this.status = c.Status.INIT;
		a.mix(this, b)
	}
	var e = a.Path,
		c = a.Loader,
		i = c.Utils;
	a.augment(h, {
		getTag: function() {
			return k(this, "tag")
		},
		getName: function() {
			return this.name
		},
		getBase: function() {
			return k(this, "base")
		},
		getPrefixUriForCombo: function() {
			var a = this.getName();
			return this.getBase() + (a && !this.isIgnorePackageNameInUri() ? a + "/" : "")
		},
		getBaseUri: function() {
			return k(this, "baseUri")
		},
		isDebug: function() {
			return k(this,
				"debug")
		},
		isIgnorePackageNameInUri: function() {
			return k(this, "ignorePackageNameInUri")
		},
		getCharset: function() {
			return k(this, "charset")
		},
		isCombine: function() {
			return k(this, "combine")
		}
	});
	c.Package = h;
	a.augment(m, {
		setValue: function(a) {
			this.value = a
		},
		getType: function() {
			var a = this.type;
			a || (this.type = a = ".css" == e.extname(this.name).toLowerCase() ? "css" : "js");
			return a
		},
		getFullPath: function() {
			var a, c, d, h, g;
			if (!this.fullpath) {
				d = this.getPackage();
				c = d.getBaseUri();
				g = this.getPath();
				if (d.isIgnorePackageNameInUri() && (h = d.getName())) g = e.relative(h, g);
				c = c.resolve(g);
				(a = this.getTag()) && c.query.set("t", a);
				this.fullpath = i.getMappedPath(this.runtime, c.toString())
			}
			return this.fullpath
		},
		getPath: function() {
			var a;
			if (!(a = this.path)) {
				a = this.name;
				var c = "." + this.getType(),
					d = "-min";
				a = e.join(e.dirname(a), e.basename(a, c));
				this.getPackage().isDebug() && (d = "");
				a = this.path = a + d + c
			}
			return a
		},
		getValue: function() {
			return this.value
		},
		getName: function() {
			return this.name
		},
		getPackage: function() {
			var b;
			if (!(b = this.packageInfo)) {
				b = this.runtime;
				var c = this.name,
					d = b.config("packages"),
					e = "",
					g;
				for (g in d) a.startsWith(c, g) && g.length > e.length && (e = g);
				b = this.packageInfo = d[e] || b.config("systemPackage")
			}
			return b
		},
		getTag: function() {
			return this.tag || this.getPackage().getTag()
		},
		getCharset: function() {
			return this.charset || this.getPackage().getCharset()
		},
		getRequiredMods: function() {
			var b = this.runtime.Env.mods;
			return a.map(this.getNormalizedRequires(), function(a) {
				return b[a]
			})
		},
		getRequiresWithAlias: function() {
			var a = this.requiresWithAlias,
				c = this.requires;
			if (!c || 0 == c.length) return c || [];
			a || (this.requiresWithAlias = a = i.normalizeModNamesWithAlias(this.runtime, c, this.name));
			return a
		},
		getNormalizedRequires: function() {
			var a, c = this.normalizedRequiresStatus,
				d = this.status,
				e = this.requires;
			if (!e || 0 == e.length) return e || [];
			if ((a = this.normalizedRequires) && c == d) return a;
			this.normalizedRequiresStatus = d;
			return this.normalizedRequires = i.normalizeModNames(this.runtime, e, this.name)
		}
	});
	c.Module = m
})(KISSY);
(function(a) {
	function k() {
		for (var i in c) {
			var b = c[i],
				o = b.node,
				d, p = 0;
			if (m.webkit) o.sheet && (p = 1);
			else if (o.sheet) try {
				o.sheet.cssRules && (p = 1)
			} catch (g) {
				d = g.name, "NS_ERROR_DOM_SECURITY_ERR" == d && (p = 1)
			}
			p && (b.callback && b.callback.call(o), delete c[i])
		}
		e = a.isEmptyObject(c) ? 0 : setTimeout(k, h)
	}
	var h = 30,
		m = a.UA,
		e = 0,
		c = {};
	a.mix(a.Loader.Utils, {
		pollCss: function(a, b) {
			var h;
			h = c[a.href] = {};
			h.node = a;
			h.callback = b;
			e || k()
		}
	})
})(KISSY);
(function(a) {
	var k = a.Env.host.document,
		h = a.Loader.Utils,
		m = a.Path,
		e = {}, c = 536 > a.UA.webkit;
	a.mix(a, {
		getScript: function(i, b, o) {
			var d = b,
				p = 0,
				g, n, f, j;
			a.startsWith(m.extname(i).toLowerCase(), ".css") && (p = 1);
			a.isPlainObject(d) && (b = d.success, g = d.error, n = d.timeout, o = d.charset, f = d.attrs);
			d = e[i] = e[i] || [];
			d.push([b, g]);
			if (1 < d.length) return d.node;
			var b = h.docHead(),
				l = k.createElement(p ? "link" : "script");
			f && a.each(f, function(a, b) {
				l.setAttribute(b, a)
			});
			p ? (l.href = i, l.rel = "stylesheet") : (l.src = i, l.async = !0);
			d.node = l;
			o && (l.charset = o);
			var y = function(b) {
				var c;
				if (j) {
					j.cancel();
					j = void 0
				}
				a.each(e[i], function(a) {
					(c = a[b]) && c.call(l)
				});
				delete e[i]
			}, o = !p;
			p && (o = c ? !1 : "onload" in l);
			o ? (l.onload = l.onreadystatechange = function() {
				var a = l.readyState;
				if (!a || a == "loaded" || a == "complete") {
					l.onreadystatechange = l.onload = null;
					y(0)
				}
			}, l.onerror = function() {
				l.onerror = null;
				y(1)
			}) : h.pollCss(l, function() {
				y(0)
			});
			n && (j = a.later(function() {
				y(1)
			}, 1E3 * n));
			p ? b.appendChild(l) : b.insertBefore(l, b.firstChild);
			return l
		}
	})
})(KISSY);
(function(a, k) {
	function h(b) {
		"/" != b.charAt(b.length - 1) && (b += "/");
		i ? b = i.resolve(b) : (a.startsWith(b, "file:") || (b = "file:" + b), b = new a.Uri(b));
		return b
	}
	var m = a.Loader,
		e = m.Utils,
		c = a.Env.host.location,
		i, b, o = a.Config.fns;
	if (!a.Env.nodejs && c && (b = c.href)) i = new a.Uri(b);
	o.map = function(a) {
		var b = this.Config;
		return !1 === a ? b.mappedRules = [] : b.mappedRules = (b.mappedRules || []).concat(a || [])
	};
	o.mapCombo = function(a) {
		var b = this.Config;
		return !1 === a ? b.mappedComboRules = [] : b.mappedComboRules = (b.mappedComboRules || []).concat(a || [])
	};
	o.packages = function(b) {
		var c, e = this.Config,
			i = e.packages = e.packages || {};
		return b ? (a.each(b, function(b, d) {
			c = b.name || d;
			var e = h(b.base || b.path);
			b.name = c;
			b.base = e.toString();
			b.baseUri = e;
			b.runtime = a;
			delete b.path;
			i[c] = new m.Package(b)
		}), k) : !1 === b ? (e.packages = {}, k) : i
	};
	o.modules = function(b) {
		var c = this,
			g = c.Env;
		b && a.each(b, function(b, f) {
			e.createModuleInfo(c, f, b);
			a.mix(g.mods[f], b)
		})
	};
	o.base = function(a) {
		var b = this.Config;
		if (!a) return b.base;
		a = h(a);
		b.base = a.toString();
		b.baseUri = a;
		return k
	}
})(KISSY);
(function(a) {
	var k = a.Loader,
		h = a.UA,
		m = k.Utils;
	a.augment(k, k.Target, {
		__currentMod: null,
		__startLoadTime: 0,
		__startLoadModName: null,
		add: function(e, c, i) {
			var b = this.runtime;
			if ("string" == typeof e) m.registerModule(b, e, c, i);
			else if (a.isFunction(e)) if (i = c, c = e, h.ie) {
				var e = a.Env.host.document.getElementsByTagName("script"),
					k, d, p;
				for (d = e.length - 1; 0 <= d; d--) if (p = e[d], "interactive" == p.readyState) {
					k = p;
					break
				}
				e = k ? k.getAttribute("data-mod-name") : this.__startLoadModName;
				m.registerModule(b, e, c, i);
				this.__startLoadModName = null;
				this.__startLoadTime = 0
			} else this.__currentMod = {
				fn: c,
				config: i
			}
		}
	})
})(KISSY);
(function(a, k) {
	function h(b) {
		a.mix(this, {
			fn: b,
			waitMods: {},
			requireLoadedMods: {}
		})
	}
	function m(a, c, d) {
		var h, i = c.length;
		for (h = 0; h < i; h++) {
			var k = a,
				n = c[h],
				m = d,
				o = k.runtime,
				q = void 0,
				s = void 0,
				q = o.Env.mods,
				r = q[n];
			r || (b.createModuleInfo(o, n), r = q[n]);
			q = r.status;
			q != f && (q === g ? m.loadModRequires(k, r) : (s = m.isModWait(n), s || (m.addWaitMod(n), q <= p && e(k, r, m))))
		}
	}
	function e(c, f, e) {
		function g() {
			f.fn ? (d[i] || (d[i] = 1), e.loadModRequires(c, f), e.removeWaitMod(i), e.check()) : f.status = n
		}
		var h = c.runtime,
			i = f.getName(),
			m = f.getCharset(),
			t = f.getFullPath(),
			w = 0,
			q = o.ie,
			s = "css" == f.getType();
		f.status = p;
		q && !s && (c.__startLoadModName = i, c.__startLoadTime = Number(+new Date));
		a.getScript(t, {
			attrs: q ? {
				"data-mod-name": i
			} : k,
			success: function() {
				if (f.status == p) if (s) b.registerModule(h, i, a.noop);
				else if (w = c.__currentMod) {
					b.registerModule(h, i, w.fn, w.config);
					c.__currentMod = null
				}
				a.later(g)
			},
			error: g,
			charset: m
		})
	}
	var c, i, b, o, d = {}, p, g, n, f;
	c = a.Loader;
	i = c.Status;
	b = c.Utils;
	o = a.UA;
	p = i.LOADING;
	g = i.LOADED;
	n = i.ERROR;
	f = i.ATTACHED;
	h.prototype = {
		check: function() {
			var b = this.fn;
			b && a.isEmptyObject(this.waitMods) && (b(), this.fn = null)
		},
		addWaitMod: function(a) {
			this.waitMods[a] = 1
		},
		removeWaitMod: function(a) {
			delete this.waitMods[a]
		},
		isModWait: function(a) {
			return this.waitMods[a]
		},
		loadModRequires: function(a, b) {
			var c = this.requireLoadedMods,
				f = b.name;
			c[f] || (c[f] = 1, c = b.getNormalizedRequires(), m(a, c, this))
		}
	};
	a.augment(c, {
		use: function(a, c, f) {
			var d, e = new h(function() {
				b.attachModsRecursively(d, g);
				c && c.apply(g, b.getModules(g, a))
			}),
				g = this.runtime,
				a = b.getModNamesAsArray(a),
				a = b.normalizeModNamesWithAlias(g,
				a);
			d = b.unalias(g, a);
			m(this, d, e);
			f ? e.check() : setTimeout(function() {
				e.check()
			}, 0);
			return this
		}
	})
})(KISSY);
(function(a, k) {
	function h(b, c, d) {
		var e = b && b.length;
		e ? a.each(b, function(b) {
			a.getScript(b, function() {
				--e || c()
			}, d)
		}) : c()
	}
	function m(b) {
		a.mix(this, {
			runtime: b,
			queue: [],
			loading: 0
		})
	}
	function e(a) {
		if (a.queue.length) {
			var b = a.queue.shift();
			i(a, b)
		}
	}
	function c(a, b) {
		a.queue.push(b)
	}
	function i(c, d) {
		function e() {
			q && w && (n.attachModsRecursively(k, u) ? m.apply(null, n.getModules(u, g)) : i(c, d))
		}
		var g = d.modNames,
			k = d.unaliasModNames,
			m = d.fn,
			p, v, t, w, q, s, r, u = c.runtime;
		c.loading = 1;
		p = c.calculate(k);
		n.createModulesInfo(u, p);
		p = c.getComboUrls(p);
		v = p.css;
		s = 0;
		for (r in v) s++;
		w = 0;
		q = !s;
		for (r in v) h(v[r], function() {
			if (!--s) {
				for (r in v) a.each(v[r].mods, function(b) {
					n.registerModule(u, b.name, a.noop)
				});
				b(v);
				q = 1;
				e()
			}
		}, v[r].charset);
		t = p.js;
		o(t, function(a) {
			(w = a) && b(t);
			e()
		})
	}
	function b(b) {
		if (a.Config.debug) {
			var c = [],
				d, e = [];
			for (d in b) e.push.apply(e, b[d]), a.each(b[d].mods, function(a) {
				c.push(a.name)
			})
		}
	}
	function o(b, c) {
		var d, e, i = 0;
		for (d in b) i++;
		if (i) for (d in e = 1, b)(function(d) {
			h(b[d], function() {
				a.each(b[d].mods, function(a) {
					return !a.fn ? (a.status = g.ERROR, e = 0, !1) : k
				});
				e && !--i && c(1)
			}, b[d].charset)
		})(d);
		else c(1)
	}
	function d(b, c, e) {
		var g = b.runtime,
			h, i;
		h = b.runtime.Env.mods[c];
		var k = e[c];
		if (k) return k;
		e[c] = k = {};
		if (h && !n.isAttached(g, c)) {
			c = h.getNormalizedRequires();
			for (h = 0; h < c.length; h++) i = c[h], !n.isLoaded(g, i) && !n.isAttached(g, i) && (k[i] = 1), i = d(b, i, e), a.mix(k, i)
		}
		return k
	}
	var p = a.Loader,
		g = p.Status,
		n = p.Utils;
	a.augment(m, p.Target);
	a.augment(m, {
		clear: function() {
			this.loading = 0
		},
		use: function(a, b, d) {
			var g = this,
				h = g.runtime,
				a = n.getModNamesAsArray(a),
				a = n.normalizeModNamesWithAlias(h, a),
				i = n.unalias(h, a);
			n.isAttached(h, i) ? b && (d ? b.apply(null, n.getModules(h, a)) : setTimeout(function() {
				b.apply(null, n.getModules(h, a))
			}, 0)) : (c(g, {
				modNames: a,
				unaliasModNames: i,
				fn: function() {
					setTimeout(function() {
						g.loading = 0;
						e(g)
					}, 0);
					b && b.apply(this, arguments)
				}
			}), g.loading || e(g))
		},
		add: function(a, b, c) {
			n.registerModule(this.runtime, a, b, c)
		},
		calculate: function(b) {
			var c = {}, e, g, h, i = this.runtime,
				k = {};
			for (e = 0; e < b.length; e++) g = b[e], n.isAttached(i, g) || (n.isLoaded(i, g) || (c[g] = 1), a.mix(c,
			d(this, g, k)));
			b = [];
			for (h in c) b.push(h);
			return b
		},
		getComboUrls: function(b) {
			var c = this,
				d, e = c.runtime,
				g = e.Config,
				h = {};
			a.each(b, function(a) {
				var a = c.runtime.Env.mods[a],
					b = a.getPackage(),
					d = a.getType(),
					e, f = b.getName();
				h[f] = h[f] || {};
				if (!(e = h[f][d])) e = h[f][d] = h[f][d] || [], e.packageInfo = b;
				e.push(a)
			});
			var i = {
				js: {},
				css: {}
			}, k, m, o, b = g.comboPrefix,
				p = g.comboSep,
				s = g.comboMaxFileNum,
				r = g.comboMaxUrlLength;
			for (m in h) for (o in h[m]) {
				k = [];
				var u = h[m][o],
					z = u.packageInfo,
					C = (d = z.getTag()) ? "?t=" + encodeURIComponent(d) : "",
					F = C.length,
					A, x, D, B = z.getPrefixUriForCombo();
				i[o][m] = [];
				i[o][m].charset = z.getCharset();
				i[o][m].mods = [];
				A = B + b;
				D = A.length;
				var E = function() {
					i[o][m].push(n.getMappedPath(e, A + k.join(p) + C, g.mappedComboRules))
				};
				for (d = 0; d < u.length; d++) if (x = u[d].getFullPath(), i[o][m].mods.push(u[d]), !z.isCombine() || !a.startsWith(x, B)) i[o][m].push(x);
				else if (x = x.slice(B.length).replace(/\?.*$/, ""), k.push(x), k.length > s || D + k.join(p).length + F > r) k.pop(), E(), k = [], d--;
				k.length && E()
			}
			return i
		}
	});
	p.Combo = m
})(KISSY);
(function(a, k) {
	function h() {
		var b = /^(.*)(seed|kissy)(?:-min)?\.js[^/]*/i,
			c = /(seed|kissy)(?:-min)?\.js/i,
			d, h, g = e.host.document.getElementsByTagName("script"),
			i = g[g.length - 1],
			g = i.src,
			i = (i = i.getAttribute("data-config")) ? (new Function("return " + i))() : {};
		d = i.comboPrefix = i.comboPrefix || "??";
		h = i.comboSep = i.comboSep || ",";
		var f, j = g.indexOf(d); - 1 == j ? f = g.replace(b, "$1") : (f = g.substring(0, j), "/" != f.charAt(f.length - 1) && (f += "/"), g = g.substring(j + d.length).split(h), a.each(g, function(a) {
			return a.match(c) ? (f += a.replace(b,
				"$1"), !1) : k
		}));
		return a.mix({
			base: f
		}, i)
	}
	a.mix(a, {
		add: function(a, c, d) {
			this.getLoader().add(a, c, d)
		},
		use: function(a, c) {
			var d = this.getLoader();
			d.use.apply(d, arguments)
		},
		getLoader: function() {
			var a = this.Env;
			return this.Config.combine && !a.nodejs ? a._comboLoader : a._loader
		},
		require: function(a) {
			return c.getModules(this, [a])[1]
		}
	});
	var m = a.Loader,
		e = a.Env,
		c = m.Utils,
		i = a.Loader.Combo;
	a.Env.nodejs ? a.config({
		charset: "utf-8",
		base: __dirname.replace(/\\/g, "/").replace(/\/$/, "") + "/"
	}) : a.config(a.mix({
		comboMaxUrlLength: 2E3,
		comboMaxFileNum: 40,
		charset: "utf-8",
		tag: "20130217192945"
	}, h()));
	a.config("systemPackage", new m.Package({
		name: "",
		runtime: a
	}));
	e.mods = {};
	e._loader = new m(a);
	i && (e._comboLoader = new i(a))
})(KISSY);
(function(a, k) {
	function h() {
		c && l(m, f, h);
		o.resolve(a)
	}
	var m = a.Env.host,
		e = a.UA,
		c = m.document,
		i = c && c.documentElement,
		b = m.location,
		o = new a.Defer,
		d = o.promise,
		p = /^#?([\w-]+)$/,
		g = /\S/,
		n = !(!c || !c.addEventListener),
		f = "load",
		j = n ? function(a, b, c) {
			a.addEventListener(b, c, !1)
		} : function(a, b, c) {
			a.attachEvent("on" + b, c)
		}, l = n ? function(a, b, c) {
			a.removeEventListener(b, c, !1)
		} : function(a, b, c) {
			a.detachEvent("on" + b, c)
		};
	a.mix(a, {
		isWindow: function(a) {
			return null != a && a == a.window
		},
		parseXML: function(a) {
			if (a.documentElement) return a;
			var b;
			try {
				m.DOMParser ? b = (new DOMParser).parseFromString(a, "text/xml") : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = !1, b.loadXML(a))
			} catch (c) {
				b = k
			}!b || !b.documentElement || b.getElementsByTagName("parsererror");
			return b
		},
		globalEval: function(a) {
			a && g.test(a) && (m.execScript || function(a) {
				m.eval.call(m, a)
			})(a)
		},
		ready: function(a) {
			d.then(a);
			return this
		},
		available: function(b, d) {
			var b = (b + "").match(p)[1],
				e = 1,
				f, g = a.later(function() {
					((f = c.getElementById(b)) && (d(f) || 1) || 500 < ++e) && g.cancel()
				}, 40, !0)
		}
	});
	if (b && -1 !== (b.search || "").indexOf("ks-debug")) a.Config.debug = !0;
	(function() {
		if (!c || "complete" === c.readyState) h();
		else if (j(m, f, h), n) {
			var a = function() {
				l(c, "DOMContentLoaded", a);
				h()
			};
			j(c, "DOMContentLoaded", a)
		} else {
			var b = function() {
				"complete" === c.readyState && (l(c, "readystatechange", b), h())
			};
			j(c, "readystatechange", b);
			var d, e = i && i.doScroll;
			try {
				d = null === m.frameElement
			} catch (g) {
				d = !1
			}
			if (e && d) {
				var k = function() {
					try {
						e("left"), h()
					} catch (a) {
						setTimeout(k, 40)
					}
				};
				k()
			}
		}
	})();
	if (e.ie) try {
		c.execCommand("BackgroundImageCache", !1, !0)
	} catch (y) {}
})(KISSY, void 0);
(function(a) {
	a.config({
		packages: {
			gallery: {
				base: a.Config.baseUri.resolve("../").toString()
			}
		},
		modules: {
			core: {
				alias: "dom,event,ajax,anim,base,node,json,ua".split(",")
			}
		}
	})
})(KISSY);
(function(a, k, h) {
	a({
		ajax: {
			requires: ["dom", "json", "event"]
		}
	});
	a({
		anim: {
			requires: ["dom", "event"]
		}
	});
	a({
		base: {
			requires: ["event/custom"]
		}
	});
	a({
		button: {
			requires: ["component/base", "event"]
		}
	});
	a({
		calendar: {
			requires: ["node", "event"]
		}
	});
	a({
		color: {
			requires: ["base"]
		}
	});
	a({
		combobox: {
			requires: ["dom", "component/base", "node", "menu", "ajax"]
		}
	});
	a({
		"component/base": {
			requires: ["rich-base", "node", "event"]
		}
	});
	a({
		"component/extension": {
			requires: ["dom", "node"]
		}
	});
	a({
		"component/plugin/drag": {
			requires: ["rich-base", "dd/base"]
		}
	});
	a({
		"component/plugin/resize": {
			requires: ["resizable"]
		}
	});
	a({
		datalazyload: {
			requires: ["dom", "event", "base"]
		}
	});
	a({
		dd: {
			alias: ["dd/base", "dd/droppable"]
		}
	});
	a({
		"dd/base": {
			requires: ["dom", "node", "event", "rich-base", "base"]
		}
	});
	a({
		"dd/droppable": {
			requires: ["dd/base", "dom", "node", "rich-base"]
		}
	});
	a({
		"dd/plugin/constrain": {
			requires: ["base", "node"]
		}
	});
	a({
		"dd/plugin/proxy": {
			requires: ["node", "base", "dd/base"]
		}
	});
	a({
		"dd/plugin/scroll": {
			requires: ["dd/base", "base", "node", "dom"]
		}
	});
	a({
		dom: {
			alias: ["dom/base", 9 > h.ie ?
				"dom/ie" : ""]
		}
	});
	a({
		"dom/ie": {
			requires: ["dom/base"]
		}
	});
	a({
		editor: {
			requires: ["htmlparser", "component/base", "core"]
		}
	});
	a({
		event: {
			alias: ["event/base", "event/dom", "event/custom"]
		}
	});
	a({
		"event/custom": {
			requires: ["event/base"]
		}
	});
	a({
		"event/dom": {
			alias: ["event/dom/base", k.isTouchSupported() ? "event/dom/touch" : "", k.isDeviceMotionSupported() ? "event/dom/shake" : "", k.isHashChangeSupported() ? "" : "event/dom/hashchange", 9 > h.ie ? "event/dom/ie" : "", h.ie ? "" : "event/dom/focusin"]
		}
	});
	a({
		"event/dom/base": {
			requires: ["dom", "event/base"]
		}
	});
	a({
		"event/dom/focusin": {
			requires: ["event/dom/base"]
		}
	});
	a({
		"event/dom/hashchange": {
			requires: ["event/dom/base", "dom"]
		}
	});
	a({
		"event/dom/ie": {
			requires: ["event/dom/base", "dom"]
		}
	});
	a({
		"event/dom/shake": {
			requires: ["event/dom/base"]
		}
	});
	a({
		"event/dom/touch": {
			requires: ["event/dom/base", "dom"]
		}
	});
	a({
		imagezoom: {
			requires: ["node", "overlay"]
		}
	});
	a({
		json: {
			requires: [KISSY.Features.isNativeJSONSupported() ? "" : "json/json2"]
		}
	});
	a({
		kison: {
			requires: ["base"]
		}
	});
	a({
		menu: {
			requires: ["component/extension", "node", "component/base",
				"event"]
		}
	});
	a({
		menubutton: {
			requires: ["node", "menu", "button", "component/base"]
		}
	});
	a({
		mvc: {
			requires: ["event", "base", "ajax", "json", "node"]
		}
	});
	a({
		node: {
			requires: ["dom", "event/dom", "anim"]
		}
	});
	a({
		overlay: {
			requires: ["node", "component/base", "component/extension", "event"]
		}
	});
	a({
		resizable: {
			requires: ["node", "rich-base", "dd/base"]
		}
	});
	a({
		"rich-base": {
			requires: ["base"]
		}
	});
	a({
		separator: {
			requires: ["component/base"]
		}
	});
	a({
		"split-button": {
			requires: ["component/base", "button", "menubutton"]
		}
	});
	a({
		stylesheet: {
			requires: ["dom"]
		}
	});
	a({
		swf: {
			requires: ["dom", "json", "base"]
		}
	});
	a({
		switchable: {
			requires: ["dom", "event", "anim", KISSY.Features.isTouchSupported() ? "dd/base" : ""]
		}
	});
	a({
		tabs: {
			requires: ["button", "toolbar", "component/base"]
		}
	});
	a({
		toolbar: {
			requires: ["component/base", "node"]
		}
	});
	a({
		tree: {
			requires: ["node", "component/base", "event"]
		}
	});
	a({
		waterfall: {
			requires: ["node", "base"]
		}
	});
	a({
		xtemplate: {
			alias: ["xtemplate/facade"]
		}
	});
	a({
		"xtemplate/compiler": {
			requires: ["xtemplate/runtime"]
		}
	});
	a({
		"xtemplate/facade": {
			requires: ["xtemplate/runtime",
				"xtemplate/compiler"]
		}
	})
})(function(a) {
	KISSY.config("modules", a)
}, KISSY.Features, KISSY.UA);
(function(a) {
	a.add("empty", a.noop);
	a.add("promise", function() {
		return a.Promise
	});
	a.add("ua", function() {
		return a.UA
	});
	a.add("uri", function() {
		return a.Uri
	});
	a.add("path", function() {
		return a.Path
	})
})(KISSY);
(function() {
	var c = "tml",
		a = "kissy";

	function b(f) {
		var e, g, d = f.concat([]);
		for (e = 0; g = d[e]; e++) {
			g = g.split("/");
			if (g[0] == a) {
				g.splice(0, 1);
				d[e] = g.join("/")
			} else {
				if (g[0] !== ".") {
					d[e] = c + "/" + g.join("/")
				}
			}
		}
		return d
	}
	window.TML = {
		add: function(e, f, d) {
			if (d && d.requires) {
				if (typeof d.requires === "string") {
					d.requires = [d.requires]
				}
				d.requires = b(d.requires)
			}
			KISSY.add(c + "/" + e, function() {
				var g = [TML],
					h;
				for (h = 1; h < arguments.length; h++) {
					g.push(arguments[h])
				}
				return f.apply(this, g)
			}, d)
		},
		use: function(d, e) {
			d = b(d.split(","));
			KISSY.use(d.join(","), function() {
				var f = [TML],
					g;
				for (g = 1; g < arguments.length; g++) {
					f.push(arguments[g])
				}
				return e.apply(this, f)
			})
		},
		version: "1.0"
	};
	KISSY.config && KISSY.config({
		packages: [{
			name: "tml",
			tag: "20120318",
			path: "http://a.tbcdn.cn/apps/tmall/tml/1.0/",
			charset: "utf-8"
		}]
	})
})(); /*pub-1|2013-02-27 11:14:39*/
var TB = KISSY.app ? KISSY.app("TB") : KISSY;
TB.add("mod~global", function() {
	var G = KISSY;
	TB.loginHttp = "https";
	TB._isLoginStatusReady = false;
	TB._loginStatusReadyFnList = [];
	TB._isMemberInfoReady = false;
	TB._memberInfoReadyFnList = [];
	TB.userInfo = {
		memberInfo: {}
	};
	TB.environment = {
		isTmall: window.location.hostname.indexOf("tmall.com") > -1 || window.location.hostname.indexOf("tmall.net") > -1,
		isDaily: window.location.hostname.indexOf(".net") > -1,
		isHttps: window.location.href.indexOf("https://") === 0
	};
	window.g_config = window.g_config || {};
	window.g_config.tmallConfig = {
		commonJS: {
			tDog: {
				off: false,
				timestamp: "20120608"
			},
			tLabs: {
				off: false,
				timestamp: "20120608"
			},
			mpp: {
				off: false,
				timestamp: "20120608"
			},
			miniCart: {
				off: false
			},
			brandBar: {
				off: false,
				timestamp: "20121106"
			},
			miniBag: {
				off: false,
				timestamp: "20130109",
				blacklist: ["taohua.com", "chaoshi.tmall.com", "buy.tmall.com", "cart.tmall.com", "refund.tmall.com", "rights.tmall.com", "obuy.tmall.com", "taobao.com", "daily.taohua.net", "chaoshi.daily.tmall.net", "buy.daily.tmall.net", "cart.daily.tmall.net", "refund.daily.tmall.net", "rights.daily.tmall.net", "obuy.daily.tmall.net", "daily.taobao.net"]
			},
			checkB2BUser: {
				off: false
			},
			shareFB: {
				off: false,
				timestamp: "20121116"
			}
		}
	};
	var d = window.g_config.tmallConfig;
	var K = !"0" [0],
		m = K && !window.XMLHttpRequest,
		O = !! window.ActiveXObject;
	var j = window,
		I = document,
		W = I.domain,
		D;
	var a = W.indexOf("tmall.com") > -1,
		k = !(W.indexOf("taobao.com") > -1 || a),
		X = k ? ".daily.taobao.net" : ".taobao.com";
	var g = k ? "assets.daily.taobao.net" : "a.tbcdn.cn",
		N = G.unparam(location.search.substring(1)),
		Q = "g_config" in j ? ("appId" in j.g_config ? parseInt(j.g_config["appId"]) : undefined) : undefined;
	var f = (I.location.href.indexOf("https://") === 0);
	var B = " ",
		Z = "hover",
		F = "",
		o = "mini-cart";
	var P = {};
	var J = {
		siteNav: function() {
			if (!D) {
				return
			}
			D.setAttribute("role", "navigation");
			G.each(Y("sn-menu", "*", D), function(i) {
				TB.Global._addMenu(i)
			});
			var S = Y("cart", "li", D)[0];
			L(S, "click", function(p) {
				var i = p.target || p.srcElement;
				if (i.nodeName != "A" && i.parentNode.nodeName === "A") {
					i = i.parentNode
				}
				if (i.nodeName === "A" && i.href.indexOf("myCart.htm") > -1) {
					if (document.location.host.indexOf(".tmall.") > -1) {
						e(p);
						TB.Cart && TB.Cart.redirect(i, i.href)
					}
				}
			});
			TB.Global.memberInfoReady(function(p) {
				if (p.isLogin && p.memberInfo.mallSeller) {
					var i = n("j_MyTaobao", D);
					var q = n("j_SellerCenter", D);
					b(i, "hidden");
					V(q, "hidden")
				}
			});
			G.ready(function() {
				G.use("core", function(r) {
					var u = r.Event;
					var p = "http://www.tmall.com/go/rgn/tmall/cat-nav-asyn.php";
					var s = document.getElementById("J_MallCate");
					var i = n("sn-menu", s);
					if (s && i) {
						var q = document.createElement("div");
						q.className = "sn-mcate-bd sn-mcate-unready j_MallCateHoverTrigger";
						document.body.insertBefore(q, document.body.lastChild);
						q.innerHTML = "\u52aa\u529b\u52a0\u8f7d\u4e2d...";
						q.style.top = (T(D) + 30) + "px";
						var t, w = false,
							v = false;
						u.on(s, "mouseenter", function() {
							w = true;
							t = r.later(function() {
								b(i, "hover");
								q.style.display = "block";
								v = true
							}, 300)
						});
						u.on(s, "mouseleave", function(x) {
							w = false;
							if (v) {
								V(i, "hover");
								q.style.display = "none";
								v = false
							} else {
								t && t.cancel()
							}
						});
						u.on(q, "mouseenter", function() {
							b(i, "hover");
							q.style.display = "block"
						});
						u.on(q, "mouseleave", function() {
							r.later(function() {
								if (!w) {
									V(i, "hover");
									q.style.display = "none"
								}
							}, 100)
						});
						window._mallCateCtnHandler = function(x) {
							q.innerHTML = x;
							V(q, "sn-mcate-unready");
							r.getScript("http://a.tbcdn.cn/p/mall/2.0/js/direct-promo.js")
						};
						L(s, "mouseover", function() {
							var x = document.getElementById("J_MallCateCtnCon");
							if (x) {
								return
							}
							r.getScript(p + "?callback=window._mallCateCtnHandler&t=" + r.now(), {
								timeout: 5,
								error: function() {
									q.innerHTML = "\u55b5~\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5\uff01";
									b(q, "sn-mcate-unready")
								}
							})
						})
					}
				})
			})
		},
		tDog: function() {
			G.ready(function() {
				if (window.g_config.closeWW && d.commonJS.tDog.off) {
					return
				}
				window.g_config = window.g_config || {};
				window.g_config.toolbar = false;
				window.g_config.webww = true;
				if ((Q && Q != -1 && Q != 2000) || "tstart" in N || "tdog" in N) {
					var S = "http://" + g + "/p/header/webww-min.js?t=" + d.commonJS.tDog.timestamp,
						i = 0;
					G.ready(function() {
						if (G.DOM) {
							G.getScript(S)
						} else {
							if (i < 10) {
								setTimeout(arguments.callee, 1000);
								i++
							} else {
								G.use("core", function() {
									G.getScript(S)
								})
							}
						}
					})
				}
			})
		},
		tLabs: function() {
			G.ready(function() {
				if (window.g_config.closeLab && d.commonJS.tLabs.off) {
					return
				}
				if (location.href.indexOf("tms.taobao.com") !== -1) {
					return
				}
				var i = "http://" + g + "/p/tlabs/1.0.0/tlabs-min.js?t=" + d.commonJS.tLabs.timestamp,
					S = H("_nk_") || H("tracknick");
				S = encodeURIComponent(A(unescape(S.replace(/\\u/g, "%u"))));
				G.getScript(i, function() {
					if (typeof TLabs !== "undefined") {
						TLabs.init({
							nick: S
						})
					}
				})
			})
		},
		POCMonitor: function() {
			if (window.g_config.closePoc) {
				return
			}
			var s = j._poc || [],
				r, p = 0,
				S = [
					["_setAccount", (j.g_config || 0).appId],
					["_setStartTime", (j.g_config || 0).startTime || j.HUBBLE_st || j.g_hb_monitor_st]
				],
				q = 10000;
			while ((r = s[p++])) {
				if (r[0] === "_setRate") {
					q = r[1]
				} else {
					if (r[0] === "_setAccount") {
						S[0] = r
					} else {
						if (r[0] === "_setStartTime") {
							S[1] = r
						} else {
							S.push(r)
						}
					}
				}
			}
			if (parseInt(Math.random() * q) === 0) {
				j._poc = S;
				G.getScript("http://a.tbcdn.cn/p/poc/m.js?v=0.0.1.js")
			}
		},
		initHeaderLinks: function() {
			if (!TB.environment.isDaily) {
				return
			}
			var p = D ? D.getElementsByTagName("a") : [];
			for (var S = 0; S < p.length; S++) {
				if (p[S].href.indexOf("register") === -1 && p[S].href.indexOf(".php")) {
					p[S].href = p[S].href.replace("taobao.com", "daily.taobao.net").replace("tmall.com", "daily.tmall.net")
				}
			}
		},
		initLogout: function() {
			var S = I.getElementById("#J_Logout");
			if (!S) {
				return
			}
			L(S, "click", function(p) {
				p.halt();
				var i = S.href;
				new Image().src = "//taobao.alipay.com/user/logout.htm";
				setTimeout(function() {
					location.href = i
				}, 20)
			})
		},
		test: function() {
			var S = false;
			var i = function() {
				if (S) {
					return
				}
				S = true;
				if (location.href.indexOf("__cloudyrun__") > -1) {
					G.getScript("http://assets.daily.taobao.net/p/cloudyrun/1.0/cloudyrun-taobao-pkg.js?t=" + (+new Date()))
				}
			};
			G.ready(i);
			setTimeout(i, 4000)
		},
		assist: function() {
			if (H("test_accouts") && document.domain.indexOf("taobao.net") > -1) {
				G.ready(function() {
					G.getScript("http://assets.daily.taobao.net/p/assist/login/login.js")
				})
			}
		},
		collect: function() {
			!~location.host.indexOf(".net") && !~location.host.indexOf("tms.taobao.com") && Math.random() * 1000 < 1 && G.ready(function() {
				G.later(function() {
					var S = document.getElementById("server-num");
					j.goldlog && j.goldlog.emit && j.goldlog.emit("mall_app", {
						kissy: G.version,
						host: location.host,
						url: location.host + location.pathname,
						tbra: !! j.YAHOO,
						back: 0,
						appname: S && S.innerHTML ? S.innerHTML.split(".")[0].replace(/\d+/g, "") : "php"
					})
				}, 2000)
			})
		},
		mpp: function() {
			G.ready(function() {
				if (window.g_config.closeMpp && d.commonJS.mpp.off) {
					return
				}
				G.getScript("http://" + g + "/p/tstart/1.0/build/tb-mpp-min.js?t=" + d.commonJS.mpp.timestamp, {
					success: function() {
						G.ready(function() {
							if (!TB.Global.isLogin()) {
								return
							}
							Mpp.Notify.register({
								appId: 1010,
								type: 1,
								callback: function() {
									G.getScript("http://" + (k ? "webww.daily.taobao.net:8080" : "webwangwang.taobao.com") + "/getOtherSystem.do?callback=TB.Global.setUserMsg&t=" + G.now())
								}
							})
						})
					}
				})
			})
		},
		checkB2BUser: function() {
			G.ready(function() {
				if (window.g_config.closeB2BUser || i() || d.commonJS.checkB2BUser.off) {
					return
				}
				TB.Global.memberInfoReady(function(p) {
					if (p.isLogin) {
						if (p.memberInfo.cookies && p.memberInfo.cookies.uc1) {
							var q = G.unparam(p.memberInfo.cookies.uc1.value);
							if (q && q.cbu) {
								G.ready(function() {
									S()
								})
							}
						}
					}
				})
			});

			function S() {
				G.getScript("http://a.tbcdn.cn/apps/tmall/tml/1.0/tml/overlay/css/overlay-min.css?t=20120903");
				var r = document.createElement("div");
				r.className = "tml-ext-mask tml-mask-b2b";
				r.innerHTML = "<!--[if lte IE 6.5]><iframe></iframe><![endif]-->";
				document.body.appendChild(r);
				var s = "http://member1" + X + "/member/changeNick2B.jhtml?t=" + G.now() + "&from=tmall&url=" + encodeURIComponent(window.location.href);
				var p = ['<div class="tml-contentbox">', '   <div class="tml-stdmod-header"></div>', '   <div class="tml-stdmod-body">', '       <iframe height="335" width="100%" marginwidth="0" framespacing="0" marginheight="0" frameborder="0" allowtransparency="true" scrolling="no" src="' + s + '"></iframe>', "   </div>", '   <div class="tml-stdmod-footer"></div>', "</div>", '<div class="tml-dialog-skin"></div>', '<i class="tml-dialog-cat"></i>'].join("");
				var q = document.createElement("div");
				q.className = "tml-dialog-hasmask tml-dialog tml-ext-position tml-dialog-b2b";
				q.innerHTML = p;
				document.body.appendChild(q);
				document.documentElement.style.overflow = "hidden"
			}
			function i() {
				if ((document.location.host + document.location.pathname) === "www.tmall.com/") {
					return true
				}
				var p = ["/go/act/", "list.tmall.com", "list.daily.tmall.net"];
				if (!p) {
					return false
				}
				for (var q = 0; q < p.length; q++) {
					if (window.location.href.indexOf(p[q]) > -1) {
						return true
					}
				}
				return false
			}
		},
		minBag: function() {
			G.ready(function() {
				TB.Global.miniBag()
			})
		},
		brandBar: function() {
			G.ready(function() {
				if (window.g_config.closeBrandBar || U() || d.commonJS.brandBar.off) {
					return
				}
				function S(i, q) {
					function p() {
						G.onTgalleryReady(i, q)
					}
					G.configTgallery = {
						tag: d.commonJS.brandBar.timestamp,
						path: "http://" + g + "/apps/"
					};
					G.onTgalleryReady ? p() : G.getScript(G.configTgallery.path + "tmall/common/tgallery.js?t=" + G.configTgallery.tag, p)
				}
				S("tgallery/department/common/brandbar", function(p, i) {
					var q = TB.environment.isDaily ? "brand.daily.tmall.net" : "brand.tmall.com";
					i.show({
						urlMyBrand: "http://" + q + "/myBrandsIndex.htm",
						newWindow: true
					});
					i.bindEl(".j_CollectBrand", {
						addServer: "http://" + q + "/ajax/brandAddToFav.htm"
					})
				})
			})
		},
		shareFB: function() {
			G.ready(function() {
				if (window.g_config.closeShareFB && d.commonJS.shareFB.off) {
					return
				}
				var S = "http://" + g + "/apps/matrix-mission/feedback/feedback.js?t=" + d.commonJS.shareFB.timestamp;
				G.getScript(S)
			})
		}
	};
	var c = ["tDog", "tLabs", "test", "mpp", "minBag", "brandBar", "shareFB"];
	for (var l = 0; l < c.length; l++) {
		(function(i) {
			var S = J[i];
			J[i] = function() {
				setTimeout(S, 1000)
			}
		})(c[l])
	}
	TB.Global = {
		init: function() {
			D = I.getElementById("site-nav");
			this._subMenus = [];
			for (var S in J) {
				J[S]()
			}
		},
		writeLoginInfo: function(i) {
			D = I.getElementById("site-nav");
			if (!D) {
				return
			}
			var S = {
				isApp: false,
				passCookie: true,
				loginServer: "http://login.tmall.com",
				logoutServer: "http://login.taobao.com/member/logout.jhtml",
				registerServer: "http://register.tmall.com/",
				spaceServer: "http://jianghu.taobao.com/admin/home.htm"
			};
			i = G.merge(S, i);
			TB.environment.isApp = i.isApp;
			TB.environment.passCookie = i.passCookie;
			var p = TB.Global;
			p.loginStatusReady(function(AA) {
				var w = i.loginServer;
				var r = window.location.href;
				if (/^http.*(\/member\/login\.jhtml)$/i.test(r)) {
					r = ""
				}
				var q = i.redirectUrl || r;
				if (q) {
					w += "?redirect_url=" + encodeURIComponent(q)
				}
				var z = i.spaceServer;
				var s = i.registerServer;
				var v = i.logoutServer + "?f=top&redirectURL=http://login.tmall.com/?redirect_url=" + encodeURIComponent("" + encodeURIComponent(q));
				if (TB.environment.isDaily) {
					w = "http://login.daily.taobao.net/?redirect_url=" + encodeURIComponent(q);
					z = "http://jianghu.daily.taobao.net/admin/home.htm";
					s += "?isDaily=1";
					v = "http://login.daily.taobao.net/member/logout.jhtml?f=top&redirectURL=http://login.daily.taobao.net/member/login.jhtml?redirect_url%3D" + encodeURIComponent("" + encodeURIComponent(q))
				}
				z += "?t=" + G.now();
				var t = document.getElementById("login-info");
				if (!t) {
					return
				}
				var u = "";
				if (AA.isLogin) {
					u = 'HI\uff0c<a target="_top" href="' + z + '" class="j_UserNick sn-user-nick" title="' + AA.nick + '">' + AA.nick + '</a>\uff01<a class="j_Identity sn-identity hidden" target="_top"></a><a class="j_Point sn-point hidden" target="_top" href="http://jifen.tmall.com/?from=top&scm=1027.1.1.4">\u79ef\u5206<em class="j_PointValue sn-point-value">0</em></a><span class="j_Message sn-message hidden"><a target="_top" href="http://vip.tmall.com/vip/message_box.htm?from=messagebox&scm=1027.1.1.5" class="j_MessageText">\u6d88\u606f<em class="j_MessageNum sn-msg-num">0</em></a><span class="sn-msg-box  j_MesssageBox hidden"><i class="sn-msg-hd"></i><span class="sn-msg-bd"><a href="#" class="j_MessageTitle sn-msg-title">\u52a0\u5165Tmall\u4ff1\u4e50\u90e8</a><b class="j_CloseMessage sn-msg-close">&times;</b></span></span></span><a class="sn-logout" target="_top" href="' + v + '" id="J_Logout">\u9000\u51fa</a><i class="sn-separator"></i>';
					t.innerHTML = u;
					var AB = document.getElementById("sn-bd");
					var y = n("j_UserNick", D);
					var x = 85;
					if (AB && AB.offsetWidth < 990) {
						x = 40;
						y.style.maxWidth = x + "px"
					}
					if (K) {
						if (y.offsetWidth > x) {
							y.style.width = x
						}
					}
					p.memberInfoReady(function(AM) {
						var AK = AM.memberInfo;
						if (!AK || !AK.login) {
							return
						}
						if (AK.activeStatus != -99) {
							var AG = n("j_Identity", D);
							if (AK.activeStatus >= 1) {
								b(AG, "sn-vip" + AK.activeStatus);
								AG.href = "http://vip.tmall.com/vip/index.htm?from=top&scm=1027.1.1.2";
								AG.title = "T" + AK.activeStatus + "\u5929\u732b\u8fbe\u4eba"
							} else {
								b(AG, "sn-vip-unactivated");
								AG.href = "http://vip.tmall.com/vip/index.htm?layer=activation&from=top&scm=1027.1.1.3";
								AG.title = "\u52a0\u5165Tmall\u4ff1\u4e50\u90e8\uff0c\u6210\u4e3a\u5929\u732b\u8fbe\u4eba"
							}
							V(AG, "hidden")
						}
						if (AK.availablePoints != -99) {
							var AL = n("j_PointValue", D);
							AL.innerHTML = AF(AK.availablePoints);
							var AJ = n("j_Point", D);
							V(AJ, "hidden")
						}
						if (AK.newMessage > 0 && AK.lastMessage && AK.lastMessageUrl) {
							n("j_MessageText", D).href = AK.lastMessageUrl + "&spm=2001.1.6.1";
							n("j_MessageNum", D).href = AK.lastMessageUrl + "&spm=2001.1.6.1"
						}
						if ((AK.newMessage || AK.newMessage == 0) && AK.newMessage != -99) {
							var AH = n("j_MessageNum", D);
							if (AK.newMessage <= 99) {
								AH.innerHTML = AK.newMessage
							} else {
								AH.innerHTML = "99+"
							}
							var AC = n("j_Message", D);
							V(AC, "hidden")
						}
						if (AK.newMessage > 0 && AK.messagePopup && AK.lastMessage) {
							var AE = n("j_MesssageBox", D);
							var AD = n("j_MessageTitle", D);
							var AI = n("j_CloseMessage", D);
							AD.innerHTML = AK.lastMessage;
							AD.href = AK.lastMessageUrl;
							L(AI, "click", function(AO) {
								var AN = "http://tmm.taobao.com/member/close_message_popup.do";
								if (TB.environment.isDaily) {
									AN = "http://tmm.daily.taobao.net/member/close_message_popup.do"
								}
								AN += "?callback=_closeMessageCallback&t=" + G.now();
								window._closeMessageCallback = function() {
									b(AE, "hidden")
								};
								G.getScript(AN)
							});
							if (AK.taskId) {
								h("http://log.mmstat.com/messagebox.1.1?taskid=" + AK.taskId)
							}
							V(AE, "hidden")
						}
						function AF(AN) {
							var AO = "";
							if (AN >= 0 && AN < 10000) {
								AO = AN
							} else {
								if (AN == 10000) {
									AO = "1\u4e07"
								} else {
									if (AN < 100000) {
										AO = parseInt(AN / 1000) / 10 + "\u4e07";
										if (AN % 1000 > 0) {
											AO += "+"
										}
									} else {
										if (AN < 1000000) {
											AO = parseInt(AN / 10000) + "\u4e07";
											if (AN % 10000 > 0) {
												AO += "+"
											}
										} else {
											if (AN < 10000000) {
												AO = parseInt(AN / 1000000) + "\u767e\u4e07";
												if (AN % 1000000 > 0) {
													AO += "+"
												}
											} else {
												if (AN < 100000000) {
													AO = parseInt(AN / 10000000) + "\u5343\u4e07";
													if (AN % 10000000 > 0) {
														AO += "+"
													}
												} else {
													AO = parseInt(AN / 100000000) + "\u4ebf";
													if (AN % 100000000 > 0) {
														AO += "+"
													}
												}
											}
										}
									}
								}
							}
							return AO
						}
					});
					p._initMemberInfo()
				} else {
					u = '\u55b5\uff0c\u6b22\u8fce\u6765\u5929\u732b\uff01<a class="sn-login" href="' + w + '" target="_top">\u8bf7\u767b\u5f55</a><a class="sn-register" href="' + s + '" target="_top">\u514d\u8d39\u6ce8\u518c</a><i class="sn-separator"></i>';
					t.innerHTML = u;
					p._fireMemberInfoReadyFnList()
				}
			});
			p._initLoginStatus()
		},
		_initLoginStatus: function() {
			var i = TB.Global;
			if (TB.environment.isApp && TB.environment.passCookie) {
				TB.userInfo.nick = A(unescape(H("_nk_").replace(/\\u/g, "%u")));
				TB.userInfo.tracknick = A(unescape(H("tracknick").replace(/\\u/g, "%u")));
				TB.userInfo.isLogin = !! ((H("login") == "true" || H("_l_g_")) && TB.userInfo.nick);
				TB.userInfo.trackId = H("t");
				i._fireLoginStatusReadyFnList()
			} else {
				var S = "http://www.taobao.com/go/app/tmall/login-api.php";
				if (TB.environment.isDaily) {
					S = "http://www.daily.taobao.net/go/app/tmall/login-api.php"
				}
				S += "?" + Math.random();
				G.getScript(S, function() {
					TB.userInfo.nick = A(unescape((userCookie._nk_).replace(/\\u/g, "%u")));
					TB.userInfo.tracknick = A(unescape((userCookie.tracknick).replace(/\\u/g, "%u")));
					TB.userInfo.isLogin = !! (userCookie._l_g_ && TB.userInfo.nick);
					TB.userInfo.trackId = userCookie.t;
					i._fireLoginStatusReadyFnList()
				})
			}
		},
		loginStatusReady: function(S) {
			if (TB._isLoginStatusReady) {
				S.call(window, TB.userInfo)
			} else {
				if (TB._loginStatusReadyFnList) {
					TB._loginStatusReadyFnList.push(S)
				}
			}
		},
		_fireLoginStatusReadyFnList: function() {
			if (TB._isLoginStatusReady) {
				return
			}
			TB._isLoginStatusReady = true;
			if (TB._loginStatusReadyFnList) {
				for (var S = 0; S < TB._loginStatusReadyFnList.length; S++) {
					TB._loginStatusReadyFnList[S].call(window, TB.userInfo)
				}
			}
		},
		_initMemberInfo: function() {
			var S = TB.Global;
			var i = "http://tmm.taobao.com/member/query_member_top.do";
			if (TB.environment.isDaily) {
				i = "http://tmm.daily.taobao.net/member/query_member_top.do"
			}
			i += "?callback=_initMemberInfoCallback&t=" + G.now();
			window._initMemberInfoCallback = function(p) {
				TB.userInfo.memberInfo = p;
				S._fireMemberInfoReadyFnList()
			};
			G.getScript(i)
		},
		memberInfoReady: function(S) {
			if (TB._isMemberInfoReady) {
				S.call(window, TB.userInfo)
			} else {
				if (TB._memberInfoReadyFnList) {
					TB._memberInfoReadyFnList.push(S)
				}
			}
		},
		_fireMemberInfoReadyFnList: function() {
			if (TB._isMemberInfoReady) {
				return
			}
			TB._isMemberInfoReady = true;
			if (TB._memberInfoReadyFnList) {
				for (var S = 0; S < TB._memberInfoReadyFnList.length; S++) {
					TB._memberInfoReadyFnList[S].call(window, TB.userInfo)
				}
			}
		},
		_addMenu: function(q) {
			if (!q) {
				return
			}
			var i = this,
				s = Y("menu-hd", "*", q)[0],
				r = Y("menu-bd", "*", q)[0];
			if (!r || !s) {
				return
			}
			s.tabIndex = 0;
			i._subMenus.push(r);
			r.setAttribute("role", "menu");
			r.setAttribute("aria-hidden", "true");
			if (!r.getAttribute("id")) {
				r.setAttribute("id", G.guid("menu-"))
			}
			s.setAttribute("aria-haspopup", r.getAttribute("id"));
			s.setAttribute("aria-label", "\u53f3\u952e\u5f39\u51fa\u83dc\u5355\uff0ctab\u952e\u5bfc\u822a\uff0cesc\u5173\u95ed\u5f53\u524d\u83dc\u5355");
			var p = false;
			if (!f && m) {
				p = I.createElement("iframe");
				p.src = "about: blank";
				p.className = "menu-bd";
				q.insertBefore(p, r)
			}
			L(q, "mouseover", function(u) {
				var t = u.relatedTarget;
				while (t && t !== q) {
					t = t.parentNode
				}
				if (t !== q) {
					G.each(i._subMenus, function(v) {
						if (v !== r) {
							V(v.parentNode, Z);
							v.setAttribute("aria-hidden", "true")
						}
					});
					b(q, Z);
					r.setAttribute("aria-hidden", "false");
					if (!p) {
						return
					}
					p.style.height = parseInt(r.offsetHeight) + 25 + "px";
					p.style.width = parseInt(r.offsetWidth) + 1 + "px"
				}
			});
			L(q, "mouseout", function(u) {
				var t = u.relatedTarget;
				while (t && t !== q) {
					t = t.parentNode
				}
				if (t !== q) {
					V(q, Z);
					r.setAttribute("aria-hidden", "true");
					G.each(r.getElementsByTagName("input"), function(v) {
						if (v.getAttribute("type") !== "hidden") {
							v.blur()
						}
					})
				}
			});
			L(q, "keydown", function(u) {
				var t = u.keyCode;
				if (t == 27 || t == 37 || t == 38) {
					V(q, Z);
					r.setAttribute("aria-hidden", "true");
					s.focus();
					e(u)
				} else {
					if (t == 39 || t == 40) {
						b(q, Z);
						r.setAttribute("aria-hidden", "false");
						e(u)
					}
				}
			});
			var S;
			L(q, O ? "focusin" : "focus", function() {
				if (S) {
					clearTimeout(S);
					S = null
				}
			}, !O);
			L(q, O ? "focusout" : "blur", function() {
				S = setTimeout(function() {
					V(q, Z);
					r.setAttribute("aria-hidden", "true")
				}, 100)
			}, !O)
		},
		run: function() {},
		isLogin: function() {
			var i = H("tracknick"),
				S = H("_nk_") || i;
			return !!(H("_l_g_") && S || H("ck1") && i)
		},
		getCartElem: function() {
			return D && Y("cart", "li", D)[0]
		},
		miniBag: function() {
			TB.Global.loginStatusReady(function(S) {
				var i = G.unparam(H("cq"));
				if (!S.isLogin) {
					i.ccp = "1";
					R("cq", G.param(i), 365);
					TB.Global.initMiniBag()
				} else {
					if (S.isLogin && i && i.ccp === "1") {
						window._syncCallback = function(q) {
							TB.Global.initMiniBag();
							i.ccp = "0";
							R("cq", G.param(i), 365);
							if (q && G.isPlainObject(q.sss) && q.sss.quantity && q.sss.token) {
								new Image().src = "http://" + (TB.environment.isDaily ? "cart.daily.taobao.net" : "cart.taobao.com") + "/sss.htm?quantity=" + q.sss.quantity + "&tk=" + q.sss.token
							}
						};
						var p = "http://" + (TB.environment.isDaily ? "cart.daily.tmall.net" : "cart.tmall.com") + "/cart/syncCart.htm?callback=_syncCallback&t=" + G.now();
						G.getScript(p, {
							error: function() {
								TB.Global.initMiniBag()
							},
							timeout: 5
						})
					} else {
						TB.Global.initMiniBag()
					}
				}
			})
		},
		initMiniBag: function() {
			if (window.g_config.closeMiniBag || U() || d.commonJS.miniBag.off) {
				TB.Global.initMiniCart();
				return
			}
			var S = "http://" + g + "/apps/tmallbuy/razer/mini/core.js";
			G.getScript(S + "?t=" + d.commonJS.miniBag.timestamp)
		},
		initMiniCart: function() {
			if (window.g_config.closeMiniCart || d.commonJS.miniCart.off || !TB.Global.getCartElem()) {
				return
			}
			var S, i = "http://" + (TB.environment.isDaily ? "count.config-vip.taobao.net:8888" : "count.tbcdn.cn") + "/counter3";
			TB.Global.memberInfoReady(function(p) {
				if (p.isLogin) {
					S = (p.memberInfo.cookies && p.memberInfo.cookies.unb) ? p.memberInfo.cookies.unb.value : p.trackId
				} else {
					S = p.trackId
				}
				i += "?keys=TCART_234_" + S + "_q&callback=_loadCartNumCallback&t=" + G.now();
				window._loadCartNumCallback = function(r) {
					var q = r["TCART_234_" + S + "_q"] || 0;
					TB.Global.setCartNum(q)
				};
				G.getScript(i)
			})
		},
		setCartNum: function(i) {
			if (!G.isNumber(i)) {
				return
			}
			var S = TB.Global.getCartElem();
			if (!S) {
				return
			}
			var p = S.getElementsByTagName("a")[0],
				q = '<span class="mini-cart-line"></span><s></s>\u8d2d\u7269\u8f66';
			if (i < 0) {
				p.innerHTML = q;
				V(S, o);
				return
			}
			p.innerHTML = q + '<span class="mc-count' + (i < 10 ? " mc-pt3" : F) + '">' + i + "</span>\u4ef6";
			p.href = "http://" + (TB.environment.isDaily ? "cart.daily.tmall.net" : "cart.tmall.com") + "/cart/myCart.htm?from=btop";
			b(S, o);
			b(S, "menu");
			b(p, "menu-hd");
			p.id = "mc-menu-hd"
		},
		updateLoginInfo: function() {
			TB._isLoginStatusReady = false;
			TB._isMemberInfoReady = false;
			TB.Global.writeLoginInfo({
				isApp: false
			})
		},
		setUserMsg: function(q) {
			if (q.success && q.success === "true") {
				var p = G.DOM;
				if (!p) {
					return
				}
				var s = p.get(".login-info", D),
					r = p.offset(s),
					i = p.get("#gb-msg-notice"),
					S;
				if (!i) {
					i = p.create('<div id="gb-msg-notice"><div class="gb-msg-inner gb-msg-info"><p class="gb-msg-content">' + q.result["messages"][0] + '</p><div class="gb-msg-icon gb-msg-close" title="\u5173\u95ed"></div></div><div class="gb-msg-icon gb-msg-tri"><div class="gb-msg-icon gb-msg-tri-inner"></div></div></div>');
					p.append(i, D.parentNode);
					p.offset(i, {
						left: r.left + 30,
						top: r.top + p.height(s) + 1
					});
					G.Event.on(i, "click", function(v) {
						var u = v.target;
						if (p.hasClass(u, "gb-msg-close")) {
							p.hide(i)
						}
					})
				} else {
					S = p.get(".gb-msg-content", i);
					p.html(S, q.result["messages"][0]);
					p.show(i)
				}
			}
		}
	};
	TB.Cart = G.merge({}, {
		domain: (document.domain.indexOf("taobao.com") > -1 || document.domain.indexOf("tmall.com") > -1) ? "taobao.com" : "daily.taobao.net",
		API: "http://cart.%domain%/check_cart_login.htm",
		cache: {},
		popup: null,
		redirect: function(s, r) {
			var q = G.makeArray(arguments);
			var t = arguments.callee;
			var p = this;
			if (!G.DOM || !G.Event) {
				G.use("core", function() {
					t.apply(p, q)
				});
				return
			}
			if (G.version === "1.1.6") {
				if ("undefined" == typeof TML || !TML || !TML.MiniLogin) {
					var S = "http://" + g + "/apps/tmall/tml/1.0/tml/overlay/css/overlay-min.css";
					var i = "http://" + g + "/apps/tmall/tml/1.0/tml/??tml-min.js,minilogin-min.js";
					G.getScript(S);
					G.getScript(i, function() {
						TML && TML.MiniLogin && TML.MiniLogin.show(function() {
							document.location.href = r
						}, {
							needRedirect: false,
							check: true
						})
					})
				} else {
					TML.MiniLogin.show(function() {
						document.location.href = r
					}, {
						needRedirect: false,
						check: true
					})
				}
			} else {
				G.use("tml/minilogin,tml/overlay/css/overlay.css", function(u, v) {
					v && v.show(function() {
						document.location.href = r
					}, {
						needRedirect: false,
						check: true
					})
				})
			}
		},
		redirectCallback: function(p) {
			var i = p.guid;
			var S = G.trim(this.cache[i][1]);
			if (!p.needLogin) {
				location.href = S;
				return
			}
			if (!i) {
				throw Error("[error] guid not found in callback data")
			}
			if (!this.popup) {
				this.popup = this._initPopup()
			}
			this._initLoginIframe(S)
		},
		hidePopup: function(S) {
			S && S.preventDefault && S.preventDefault();
			G.DOM.css(this.popup, "display", "none")
		},
		showPopup: function() {
			var S = new Date();
			S.setDate(S.getDate() - 1);
			document.cookie = "cookie2=;expires=" + S.toGMTString() + ";path=/;domain=.tmall.com";
			this._centerPopup();
			G.DOM.css(this.popup, "display", "block")
		},
		_centerPopup: function() {
			var S = (G.DOM.viewportHeight() - parseInt(G.DOM.css(this.popup, "height"), 10)) / 2;
			S = S < 0 ? 0 : S;
			G.DOM.css(this.popup, "top", S)
		},
		_addStyleSheetOnce: function() {
			if (!this._stylesheetAdded) {
				G.DOM.addStyleSheet("#g-cartlogin{position:fixed;_position:absolute;border:1px solid #aaa;left:50%;top:120px;margin-left:-206px;width:412px;height:272px;z-index:90010;background:#fafafa;-moz-box-shadow:rgba(0,0,0,0.2) 3px 3px 3px;-webkit-box-shadow:3px 3px 3px rgba(0,0,0,0.2);filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=3,OffY=3,Color=#16000000,Positive=true);} #g_minicart_login_close{position:absolute;right:5px;top:5px;width:17px;height:17px;background:url(http://img01.taobaocdn.com/tps/i1/T1krl0Xk8zXXXXXXXX-194-382.png) no-repeat -100px -69px;text-indent:-999em;overflow:hidden;}#g-cartlogin-close{cursor:pointer;position:absolute;right:5px;top:5px;width:17px;height:17px;line-height:0;overflow:hidden;background:url(http://img03.taobaocdn.com/tps/i1/T1k.tYXadGXXXXXXXX-146-77.png) no-repeat -132px 0;text-indent:-999em;}");
				this._stylesheetAdded = true
			}
		},
		_initPopup: function() {
			var S = G.DOM.create('<div id="g-cartlogin"></div>');
			G.DOM.append(S, G.DOM.get("body"));
			return S
		},
		_initLoginIframe: function(S) {
			var i = "https://login." + this.domain + "/member/login.jhtml?from=globalcart&style=mini&redirectURL=" + encodeURIComponent(S) + "&full_redirect=true";
			this.popup.innerHTML = '<iframe src="' + i + '" width="410" height="270" frameborder="0" scrolling="0"></iframe><span title="\u5173\u95ed" id="g-cartlogin-close">\u5173\u95ed</span>';
			G.Event.on("#g-cartlogin-close", "click", this.hidePopup, this);
			this.showPopup()
		}
	});

	function U() {
		var S = d.commonJS.miniBag.blacklist;
		if (!S) {
			return false
		}
		for (var p = 0; p < S.length; p++) {
			if (document.location.href.indexOf(S[p]) > -1) {
				return true
			}
		}
		return N.frm && N.frm == "tmalltiyan"
	}
	function H(i) {
		if (j.userCookie && !G.isUndefined(j.userCookie[i])) {
			return j.userCookie[i]
		}
		if (G.isUndefined(P[i])) {
			var S = I.cookie.match("(?:^|;)\\s*" + i + "=([^;]*)");
			P[i] = (S && S[1]) ? decodeURIComponent(S[1]) : F
		}
		return P[i]
	}
	function R(i, q, p, s, v, S) {
		var t = 24 * 60 * 60 * 1000;
		var u = String(encodeURIComponent(q)),
			r = p;
		if (typeof r === "number") {
			r = new Date();
			r.setTime(r.getTime() + p * t)
		}
		if (r instanceof Date) {
			u += "; expires=" + r.toUTCString()
		}
		if (E(s)) {
			u += "; domain=" + s
		}
		if (E(v)) {
			u += "; path=" + v
		}
		if (S) {
			u += "; secure"
		}
		document.cookie = i + "=" + u
	}
	function h(S) {
		if (!S) {
			return
		}
		new Image().src = S
	}
	function E(S) {
		return G.isString(S) && S !== ""
	}
	function A(i) {
		var p = I.createElement("div"),
			S = I.createTextNode(i);
		p.appendChild(S);
		return p.innerHTML
	}
	function Y(x, y, S) {
		var q = S.getElementsByTagName(y || "*"),
			v = [],
			s = 0,
			r = 0,
			u = q.length,
			p, w;
		x = B + x + B;
		for (; s < u; ++s) {
			p = q[s];
			w = p.className;
			if (w && (B + w + B).indexOf(x) > -1) {
				v[r++] = p
			}
		}
		return v
	}
	function n(S, i) {
		if (!i) {
			i = document
		}
		return Y(S, "*", i)[0]
	}
	function L(q, p, i, S) {
		if (!q) {
			return
		}
		if (q.addEventListener) {
			q.addEventListener(p, i, !! S)
		} else {
			if (q.attachEvent) {
				q.attachEvent("on" + p, i)
			}
		}
	}
	function C(q, p, i, S) {
		if (!q) {
			return
		}
		if (q.removeEventListener) {
			q.removeEventListener(p, i, !! S)
		} else {
			if (q.detachEvent) {
				q.detachEvent("on" + p, i)
			}
		}
	}
	function b(p, S) {
		if (!p) {
			return
		}
		var i = B + p.className + B;
		if (i.indexOf(B + S + B) === -1) {
			i += S;
			p.className = G.trim(i)
		}
	}
	function V(p, S) {
		if (!p) {
			return
		}
		var i = B + p.className + B;
		if (i.indexOf(B + S + B) !== -1) {
			i = i.replace(B + S + B, B);
			p.className = G.trim(i)
		}
	}
	function M(S) {
		if (j.userCookie && j.userCookie.version == "2") {
			return G.unparam(S, "&amp;")
		}
		return G.unparam(S)
	}
	function e(S) {
		if (S.preventDefault) {
			S.preventDefault()
		} else {
			S.returnValue = false
		}
	}
	function T(p, S) {
		var i = 0;
		while (p != null) {
			i += p["offset" + (S ? "Left" : "Top")];
			p = p.offsetParent
		}
		return i
	}
});
TB.use("mod~global"); /*pub-1|2013-03-15 21:45:17*/
var TMall = window.TMall || {};
TMall.Head = function() {
	var F = KISSY,
		V = document;
	var H = !"0" [0],
		L = H && !window.XMLHttpRequest,
		N = !! window.ActiveXObject;
	var P = "mouseover",
		J = "mouseenter",
		G = "mouseleave";
	var I = ~location.host.indexOf(".net") ? "assets.daily.taobao.net" : "a.tbcdn.cn";
	var E = V.getElementsByTagName("script");
	var D = E[E.length - 1];
	var M = D.src || "";
	var C = M.substring(M.lastIndexOf("?") + 1, M.length);
	var B = "http://" + I + "/apps/tmall/header/shop/header.js?t=" + (C || "20120926");
	var T = "http://www.tmall.com/go/rgn/tmall/cat-nav-asyn.php";
	var A;
	var R = false;

	function U(S) {
		return V.getElementById(S)
	}
	function O(Y, X, W, S) {
		if (!Y) {
			return
		}
		if (Y.addEventListener) {
			Y.addEventListener(X, W, !! S)
		} else {
			if (Y.attachEvent) {
				Y.attachEvent("on" + X, W)
			}
		}
	}
	function Q(Y, X, W, S) {
		if (!Y) {
			return
		}
		if (Y.removeEventListener) {
			Y.removeEventListener(X, W, !! S)
		} else {
			if (Y.detachEvent) {
				Y.detachEvent("on" + X, W)
			}
		}
	}
	var K = function() {
		var S = 0;
		var c, W, f, b, Y;

		function d() {
			setTimeout(function() {
				if (c.value == "") {
					f.style.visibility = "visible"
				}
			}, 100)
		}
		function X() {
			if (!F.DOM && S < 50) {
				setTimeout(arguments.callee, 200);
				S++;
				return
			}
			TMall.THeader ? TMall.THeader.init() : F.getScript(B, function() {
				TMall.THeader.init()
			});
			Q(A, P, X)
		}
		function a() {
			var h = U("J_shopSearchData");
			var g = !! h ? h.getAttribute("data-shopUrl") : c.getAttribute("data-current");
			O(Y, "click", function() {
				if ("" !== F.trim(c.value)) {
					W.setAttribute("action", g);
					Z(W, {
						search: "y",
						newHeader_b: "s_from",
						searcy_type: "item"
					})
				}
				b.click()
			})
		}
		function e() {
			var g = function() {
				var i = arguments[0] || win.event,
					h = i.keyCode;
				if (i.shiftKey && (h == 191 || h == 229)) {
					F.getScript("http://" + I + "/apps/tmall/header/common/quick-search.css", function() {
						F.getScript("http://" + I + "/apps/tmall/header/common/quick-search.js")
					});
					Q(V.body, "keyup", arguments.callee)
				}
			};
			O(V.body, "keyup", g)
		}
		function Z(j, k) {
			function g(i, l) {
				var m = V.createElement("input");
				m.setAttribute("type", "hidden");
				m.setAttribute("name", i);
				m.setAttribute("value", l);
				return m
			}
			for (var h in k) {
				if (!j[h]) {
					j.appendChild(g(h, k[h]))
				} else {
					j[h].value = k[h]
				}
			}
		}
		return {
			init: function() {
				A = U("tmallSearch") || U("mallSearch");
				if (!A) {
					return
				}
				c = U("mq");
				W = c.form;
				f = W.getElementsByTagName("label")[0];
				Y = U("J_CurrShopBtn");
				b = U("J_SearchBtn");
				d();
				O(A, P, X);
				a();
				e();
				R = true
			}
		}
	}();
	return {
		init: function() {
			if (R) {
				return
			}
			F.ready(function() {
				K.init();
				if (L) {
					var S = U("shop-info");
					O(S, J, function() {
						S.className += " expanded"
					});
					O(S, G, function() {
						S.className = S.className.replace("expanded", "")
					});
					var W = U("content"),
						X;
					if (W && !~W.className.indexOf("head-expand")) {
						X = U("hd") || U("shop-hd");
						if (X && X.offsetHeight && X.offsetHeight > 150) {
							X.style.height = "150px"
						}
					}
				}
			})
		}
	}
}();