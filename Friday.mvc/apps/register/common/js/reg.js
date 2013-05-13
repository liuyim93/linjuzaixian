/*pub-1|2013-05-08 17:23:51*/
KISSY.add("Cache", function(a) {
	var b = function(c) {
		if (!(this instanceof b)) {
			return new b(c)
		}
		this._cache = []
	};
	a.augment(b, {
		init: function() {
			return this
		},
		set: function(d, c) {
			if (a.isString(c)) {
				this.del(c, d[c])
			}
			this._cache.push(d);
			return this
		},
		getIndex: function(d, e) {
			var c = 0;
			while (this._cache[c] && this._cache[c][d] !== e) {
				c++
			}
			return c >= this._cache.length ? -1 : c
		},
		get: function(e, f) {
			var d = this.getIndex(e, f);
			var c = d >= 0 ? this._cache[d] : null;
			return c
		},
		del: function(d, e) {
			var c = this.getIndex(d, e);
			if (c >= 0) {
				this._cache.splice(c, 1)
			}
		}
	});
	return b
});
KISSY.add("Message", function(c, d) {
	var e = c.all;
	var b = function(g, f) {
		if (c.isPlainObject(g) && g.type === 2) {
			return new d(g.msg, f)
		}
		this.wrapper = c.one(g);
		this.msg = this.wrapper && this.wrapper.one(".msg-default");
		if (!this.msg) {
			return new d(g, f)
		}
		this.title = this.wrapper && this.wrapper.one(".msg-title");
		this.content = this.wrapper && this.wrapper.one(".msg-content");
		this.source = c.isPlainObject(f) ? f : null;
		this.type = this._getType();
		this._isWeak = this.wrapper && this.wrapper.hasClass("msg-weak")
	};
	var a = function(g, f) {
		return new b(g, f)
	};
	c.augment(b, {
		change: function(g, f) {
			if (!this.msg) {
				return this
			}
			if (!this._isWeak) {
				this.wrapper.removeClass("msg-weak")
			}
			this.show();
			var g = g && g.toUpperCase() || "";
			switch (g) {
				case "OK":
				case "ERROR":
				case "TIPS":
				case "NOTICE":
				case "ATTENTION":
				case "QUESTION":
				case "STOP":
					this._changeType(g);
					break;
				default:
					break
			}
			this.type = this._getType();
			this._changeText(f);
			return this
		},
		_changeType: function(g) {
			var f = this.msg.attr("class"),
				h = /\bmsg-ok\b|\bmsg-error\b|\bmsg-tips\b|\bmsg-notice\b|\bmsg-attention\b|\bmsg-question\b|\bmsg-stop\b/g;
			if (f.match(h)) {
				this.msg.attr("class", f.replace(h, "msg-" + g.toLowerCase()))
			} else {
				this.msg.addClass("msg-" + g.toLowerCase())
			}
		},
		_changeTitle: function(f) {
			if (!this.title || !c.isString(f)) {
				return
			}
			this.title.html(f)
		},
		_changeContent: function(f) {
			if (!this.content || !c.isString(f)) {
				return
			}
			this.content.html(this.source ? this.source[f] || "" : f)
		},
		_changeText: function(f) {
			var h = c.isObject(f) && c.isString(f.title) ? f.title : "",
				g = c.isObject(f) && c.isString(f.content) ? f.content : (c.isString(f) ? f : "");
			this._changeTitle(h);
			this._changeContent(g);
			if (!h && !g && this.wrapper) {
				this.wrapper.addClass("msg-weak")
			}
		},
		ok: function(f) {
			this.change("ok", f);
			return this
		},
		error: function(f) {
			this.change("error", f);
			return this
		},
		tips: function(f) {
			this.change("tips", f);
			return this
		},
		notice: function(f) {
			this.change("notice", f);
			return this
		},
		attention: function(f) {
			this.change("attention", f);
			return this
		},
		question: function(f) {
			this.change("question", f);
			return this
		},
		stop: function(f) {
			this.change("stop", f);
			return this
		},
		weak: function() {
			this.msg.replace("msg", "msg_weak");
			this.msg.replace("msg_b", "msg_b_weak")
		},
		_getType: function() {
			var f = "";
			if (this.msg.hasClass("msg-error")) {
				f = "ERROR"
			} else {
				if (this.msg.hasClass("msg-tips")) {
					f = "TIPS"
				} else {
					if (this.msg.hasClass("msg-attention")) {
						f = "ATTENTION"
					} else {
						if (this.msg.hasClass("msg-notice")) {
							f = "NOTICE"
						} else {
							if (this.msg.hasClass("msg-ok")) {
								f = "OK"
							} else {
								if (this.msg.hasClass("msg-question")) {
									f = "QUESTION"
								} else {
									if (this.msg.hasClass("msg-stop")) {
										f = "STOP"
									}
								}
							}
						}
					}
				}
			}
			return f
		},
		isHide: function() {
			return this.wrapper.css("visibility") == "hidden" || this.wrapper.css("display") == "none"
		},
		hide: function() {
			this.wrapper.css("visibility", "hidden").removeClass("show").addClass("hide");
			return this
		},
		show: function() {
			this.wrapper.css("visibility", "visible").removeClass("hide").addClass("show");
			return this
		},
		laterHide: function(f) {
			c.later(this.hide, f || 2000, false, this);
			return this
		}
	});
	return a
}, {
	requires: ["Message2"]
});
KISSY.add("Message2", function(a) {
	var d = a.all;
	var b = function(f, e) {
		this.msg = a.one(f);
		if (!this.msg) {
			return
		}
		this.title = this.msg && this.msg.one(".msg-tit");
		this.content = this.msg && this.msg.one(".msg-cnt");
		this.source = a.isPlainObject(e) ? e : null;
		this.type = this._getType()
	};
	var c = function(f, e) {
		return new b(f, e)
	};
	a.augment(b, {
		change: function(f, e) {
			if (!this.msg) {
				return this
			}
			this.show();
			var f = f && f.toUpperCase() || "";
			switch (f) {
				case "OK":
				case "ERROR":
				case "TIPS":
				case "NOTICE":
				case "ATTENTION":
				case "QUESTION":
				case "STOP":
					this._changeType(f);
					break;
				default:
					break
			}
			this.type = this._getType();
			this._changeText(e);
			return this
		},
		_changeType: function(f) {
			var e = this.msg.attr("class"),
				g = /\bmsg-ok\b|\bmsg-error\b|\bmsg-tips\b|\bmsg-notice\b|\bmsg-attention\b|\bmsg-question\b|\bmsg-stop\b/g;
			if (e.match(g)) {
				this.msg.attr("class", e.replace(g, "msg-" + f.toLowerCase()))
			} else {
				this.msg.addClass("msg-" + f.toLowerCase())
			}
		},
		_changeTitle: function(e) {
			if (!this.title || !a.isString(e)) {
				return
			}
			this.title.html(e)
		},
		_changeContent: function(e) {
			if (!this.content || !a.isString(e)) {
				return
			}
			this.content.html(this.source ? this.source[e] || "" : e)
		},
		_changeText: function(e) {
			var g = a.isObject(e) && a.isString(e.title) ? e.title : "",
				f = a.isObject(e) && a.isString(e.content) ? e.content : (a.isString(e) ? e : "");
			this._changeTitle(g);
			this._changeContent(f);
			if (!g && !f && this.msg) {
				this.msg.addClass("msg-weak")
			}
		},
		ok: function(e) {
			this.change("ok", e);
			return this
		},
		error: function(e) {
			this.change("error", e);
			return this
		},
		tips: function(e) {
			this.change("tips", e);
			return this
		},
		notice: function(e) {
			this.change("notice", e);
			return this
		},
		attention: function(e) {
			this.change("attention", e);
			return this
		},
		question: function(e) {
			this.change("question", e);
			return this
		},
		stop: function(e) {
			this.change("stop", e);
			return this
		},
		weak: function() {
			this.msg.replaceClass("msg", "msg-weak");
			this.msg.replaceClass("msg-b", "msg-b-weak")
		},
		_getType: function() {
			var f = "",
				e = this.msg.attr("class");
			if (e.match(/\bmsg-(b-)?error\b/)) {
				f = "ERROR"
			} else {
				if (e.match(/\bmsg-(b-)?-tips\b/)) {
					f = "TIPS"
				} else {
					if (e.match(/\bmsg-(b-)?-attention\b/)) {
						f = "ATTENTION"
					} else {
						if (e.match(/\bmsg-(b-)?-notice\b/)) {
							f = "NOTICE"
						} else {
							if (e.match(/msg-ok|msg-b-ok/)) {
								f = "OK"
							} else {
								if (e.match(/\bmsg-(b-)?-question\b/)) {
									f = "QUESTION"
								} else {
									if (e.match(/\bmsg-(b-)?-stop\b/)) {
										f = "STOP"
									}
								}
							}
						}
					}
				}
			}
			return f
		},
		isHide: function() {
			return this.msg.css("visibility") == "hidden" || this.msg.css("display") == "none"
		},
		hide: function() {
			this.msg.css("visibility", "hidden").removeClass("show").addClass("hide");
			return this
		},
		show: function() {
			this.msg.css("visibility", "visible").removeClass("hide").addClass("show");
			return this
		},
		laterHide: function(e) {
			a.later(this.hide, e || 2000, false, this);
			return this
		}
	});
	return c
});
KISSY.add("TimeoutBtn", function(c) {
	var b = function(d) {
		this.btn = d.btn && c.one(d.btn);
		this.timeout = d.timeout ? (Number(d.timeout) || 0) : 0;
		this.callback = c.isFunction(d.callback) && d.callback || null;
		this.text = d.text || (this.btn ? this.btn.text() : "");
		this.waitText = d.waitText || "%t%秒后可重新操作";
		this.timeoutText = d.timeoutText || this.text;
		this.timeoutCls = d.timeoutCls || "";
		this.disabledCls = d.disabledCls || "";
		this.autoStart = !! d.autoStart;
		this._id = 0;
		this.autoStart && this.start()
	};
	var a = function(d) {
		return new b(d)
	};
	c.augment(b, {
		_counter: 0,
		start: function() {
			if (!this.btn || !this.timeout) {
				return
			}
			this._counter = 0;
			this.btn.prop("disabled", true);
			this.refresh();
			var d = this;
			if (this._id) {
				window.clearInterval(this._id)
			}
			this._id = setInterval(function() {
				d.disabled()
			}, 1000)
		},
		disabled: function() {
			this._counter++;
			if (this._counter == this.timeout) {
				this.clear();
				this.callback && this.callback()
			} else {
				this.refresh()
			}
		},
		clear: function() {
			window.clearInterval(this._id);
			this._id = "";
			this._counter = 0;
			this.btn.prop("disabled", false);
			this.btn.text(this.timeoutText);
			this.btn.removeClass(this.timeoutCls);
			this.btn.removeClass(this.disabledCls);
			this.btn.text(this.text)
		},
		refresh: function() {
			this.btn.text(this.waitText.replace("%t%", this.timeout - this._counter));
			this.btn.addClass(this.disabledCls)
		},
		reset: function() {
			this.clear()
		}
	});
	return a
});
KISSY.add("PlaceHolder", function(a) {
	var c = function(d) {
		this.input = d.input && a.one(d.input);
		this.placeholder = d.placeholder && a.one(d.placeholder);
		this.blurCls = d.blurCls || "ph_blur"
	};
	var b = function(d) {
		return new c(d)
	};
	a.augment(c, {
		init: function() {
			if (!this.input || !this.placeholder || this.input.val()) {
				return this
			}
			var d = this;
			this.placeholder.show();
			this.fix();
			this.placeholder.on("click", function() {
				d.input.fire("focus")
			});
			this.input.on("valuechange", function() {
				if (d.input.val().length) {
					d.placeholder.hide()
				} else {
					d.placeholder.show();
					d.fix();
					d.placeholder.addClass(d.blurCls)
				}
			}).on("blur", function() {
				if (!d.input.val().length) {
					d.placeholder.show();
					d.fix();
					d.placeholder.removeClass(d.blurCls)
				}
			}).on("focus", function() {
				if (d.input.val().length) {
					d.placeholder.hide()
				} else {
					d.placeholder.show();
					d.fix();
					d.placeholder.addClass(d.blurCls)
				}
			});
			a.one(window).on("resize", function() {
				d.fix()
			});
			return this
		},
		fix: function() {
			var d = this.input.offset();
			this.placeholder.css({
				position: "absolute",
				left: d.left + 7
			}).css({
				top: d.top + Math.floor((this.input[0].clientHeight + 2 - this.placeholder[0].clientHeight) / 2)
			})
		}
	});
	return b
});
KISSY.add("DynamicCheckCode", function(c, b, a) {
	var e = function(f) {
		this.trigger = f.trigger && c.one(f.trigger);
		this.triggerTip = f.triggerTip && c.one(f.triggerTip) ? b(f.triggerTip) : null;
		this.input = f.input && c.one(f.input);
		this.inputTip = f.inputTip && c.one(f.inputTip) ? b(f.inputTip) : null;
		this.errCls = c.isString(f.errCls) && f.errCls || "";
		this.on = f.on || "keyup blur";
		this.defaultOn = f.defaultOn || "";
		this.getUrl = f.getUrl || "";
		this.checkUrl = f.checkUrl || "";
		this.checkData = c.isPlainObject(f.checkData) || c.isFunction(f.checkData) ? f.checkData : {};
		this.checkCallback = c.isFunction(f.checkCallback) ? f.checkCallback : function() {};
		this.getData = c.isPlainObject(f.getData) || c.isFunction(f.getData) ? f.getData : {};
		this.defaultMsg = {
			error: "验证码发送失败\uff0c\u8bf7\u91cd\u8bd5\uff01",
			ok: "验证码已发送\uff0c\u8bf7\u67e5\u6536\uff01"
		};
		this.msg = f.msg || {};
		this.msg.error = this.msg.error || this.defaultMsg.error;
		this.msg.ok = this.msg.ok || this.defaultMsg.ok;
		this.defaultTriggerTip = f.defaultTriggerTip || null;
		this.defaultInputTip = f.defaultInputTip || null;
		this.msgTemplate = c.isObject(f.msgTemplate) ? f.msgTemplate : null;
		this.disabledBtnCls = f.disabledBtnCls || "";
		this.btnText = f.btnText || "免费获取验证码";
		this.btnWaitText = f.btnWaitText || "%t%秒后可重新发送";
		this.btnWaitCls = f.btnWaitCls || "";
		this.btnTimeoutText = f.btnTimeoutText || "重新发送";
		this.btnTimeoutCls = f.btnTimeoutCls || "";
		this.btnAutoStart = !! f.btnAutoStart;
		this.tobtn = null;
		this.disabledMsg = c.isString(f.disabledMsg) ? f.disabledMsg : "验证码错误";
		this.disabled = true;
		this.stat = {
			code: 0,
			msg: ""
		}
	};
	var d = function(f) {
		return new e(f)
	};
	c.augment(e, {
		ctype: "CHECKER",
		statusCode: {
			netError: {
				code: -1,
				msg: "网络错误"
			},
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "格式错误"
			},
			ajaxError: {
				code: 3,
				msg: "验证码错误"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.trigger || !this.input || !this.getUrl) {
				return this
			}
			var f = this;
			this.tobtn = a({
				btn: this.trigger,
				timeout: 60,
				disabledCls: f.disabledBtnCls,
				callback: function() {
					f.resetTriggerTip()
				},
				text: f.btnText,
				waitText: f.btnWaitText,
				waitCls: f.btnWaitCls,
				timeoutText: f.btnTimeoutText,
				timeoutCls: f.btnTimeoutCls,
				autoStart: f.btnAutoStart
			});
			this.trigger.on("click", function() {
				f.getCode()
			});
			this.defaultOn && (this.input.on(this.defaultOn, function() {
				!c.trim(f.input.val()) && f.resetInputTip()
			}));
			this.input.on(this.on, function() {
				f.validate()
			});
			this.validate(true);
			return this
		},
		validate: function(l) {
			if (!this.trigger || !this.input || !this.getUrl) {
				this.disabled = false;
				return this.disabled
			}
			var h = this;
			var f = arguments,
				g = c.isPlainObject(f[0]) ? f[0] : {
					def: !! f[0],
					async: !! f[1],
					callback: null,
					context: window
				};
			var l = g.def,
				k = g.async,
				m = g.callback,
				j = g.context;
			this.checkAble(function(n) {
				h.validateCallback(l);
				c.isFunction(m) && m.call(this, n)
			}, k, j)
		},
		validateCallback: function(f) {
			if (f && this.inputTip.type.toLowerCase() == "error" && !this.inputTip.isHide()) {
				return this.disabled
			}
			this.check(f);
			!f && this.checkCallback(this.disabled);
			return this.disabled
		},
		getCode: function() {
			var f = this;
			this.reset();
			c.io({
				url: f.getUrl,
				data: c.isFunction(f.getData) ? f.getData() : f.getData,
				type: "post",
				dataType: "json",
				success: function(g) {
					if (g.success) {
						if (f.triggerTip) {
							f.triggerTip.ok(g.msg || f.msg.ok || f.defaultMsg.ok)
						}
						f.input.fire("focus");
						f.tobtn.start()
					} else {
						f.disabledMsg = "请重新获取验证码\uff01";
						if (f.triggerTip) {
							f.triggerTip.attention(g.msg || f.msg.error || f.defaultMsg.error)
						}
					}
				},
				error: function() {
					f.disabledMsg = "请重新获取验证码\uff01";
					if (f.triggerTip) {
						f.triggerTip.error("验证码发送失败\uff0c\u8bf7\u91cd\u8bd5\uff01")
					}
				}
			})
		},
		check: function(f) {
			if (f && !c.trim(this.input.val())) {
				!this.defaultOn && this.resetInputTip();
				this.resetTriggerTip();
				return
			}
			switch (this.stat.code) {
				case -1:
				case 1:
				case 2:
				case 3:
					this.inputTip.error(this.stat.msg);
					this.input.removeClass(this.errCls);
					c.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.inputTip.hide();
					this.input.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function(l, j, h) {
			var g = this,
				k, f;
			var h = h || g,
				j = !! j,
				l = c.isFunction(l) && l || function() {};
			if (!c.trim(this.input.val()).length) {
				this.disabled = true;
				this.stat = this.statusCode.empty;
				l.call(h, g.disabled);
				return
			} else {
				if (this._checkAble()) {
					this.disabled = false;
					this.stat = this.statusCode.ok
				} else {
					this.disabled = true;
					this.stat = this.statusCode.formatError
				}
			}
			if (!this.checkUrl || g.disabled) {
				l.call(h, g.disabled);
				return
			}
			c.io({
				url: g.checkUrl,
				data: c.mix(c.isFunction(g.checkData) ? g.checkData() : g.checkData, {
					code: c.trim(g.input.val())
				}),
				type: "post",
				dataType: "json",
				success: function(m) {
					var n = m.msg || m.reason || "";
					n = g.msgTemplate ? g.msgTemplate[n] || n : n;
					if (m.success) {
						g.disalbed = false;
						g.stat = {
							code: g.statusCode.ok.code,
							msg: n || g.statusCode.ok.msg
						}
					} else {
						g.disabled = true;
						g.disabledMsg = "验证码错误";
						g.stat = {
							code: g.statusCode.ajaxError.code,
							msg: n || g.statusCode.ajaxError.msg
						}
					}
					l.call(h, g.disabled)
				},
				error: function() {
					l.call(h, g.disabled)
				}
			})
		},
		_checkAble: function() {
			return !!c.trim(this.input.val()).match(/^\d{6}$/)
		},
		reset: function(f) {
			if (f) {
				return this
			}
			this.disabled = true;
			this.tobtn && this.tobtn.reset();
			this.input && this.input.val("") && this.input.removeClass(this.errCls);
			this.resetTip();
			return this
		},
		resetTriggerTip: function() {
			if (!this.triggerTip) {
				return
			}
			if (this.defaultTriggerTip && this.defaultTriggerTip.type && this.defaultTriggerTip.msg) {
				this.triggerTip.change(this.defaultTriggerTip.type, this.defaultTriggerTip.msg)
			} else {
				this.triggerTip.hide()
			}
		},
		resetInputTip: function() {
			if (!this.inputTip) {
				return this
			}
			if (this.defaultInputTip && this.defaultInputTip.type && this.defaultInputTip.msg) {
				this.inputTip.change(this.defaultInputTip.type, this.defaultInputTip.msg)
			} else {
				this.inputTip.hide()
			}
			return this
		},
		resetTip: function() {
			this.input && this.input.val("");
			this.resetTriggerTip();
			this.resetInputTip();
			return this
		},
		timeoutStart: function() {
			this.tobtn && this.tobtn.start();
			return this
		}
	});
	return d
}, {
	requires: ["Message", "TimeoutBtn"]
});
KISSY.add("ImageCheckCode", function(b, a) {
	var d = function(e) {
		this.input = e.input && b.one(e.input);
		this.errCls = b.isString(e.errCls) && e.errCls || "";
		this.img = e.img && b.one(e.img);
		this.getUrl = e.getUrl || "";
		this.checkUrl = e.checkUrl || "";
		this.checkData = b.isPlainObject(e.checkData) && e.checkData || {};
		this.checkCallback = b.isFunction(e.checkCallback) ? e.checkCallback : function() {};
		this.trigger = e.trigger && b.one(e.trigger);
		this.tip = e.tip && b.one(e.tip) ? a(e.tip) : null;
		this.on = e.on || "keyup blur";
		this.defaultTip = e.defaultTip || null;
		this.disabledMsg = b.isString(e.disabledMsg) ? e.disabledMsg : "验证码格式有误\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this.stat = {
			code: 0,
			msg: ""
		}
	};
	var c = function(e) {
		return new d(e)
	};
	b.augment(d, {
		ctype: "CHECKER",
		statusCode: {
			netError: {
				code: -1,
				msg: "网络错误"
			},
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "验证码格式错误"
			},
			ajaxError: {
				code: 3,
				msg: "验证码错误"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.input || !this.img || !this.getUrl) {
				return this
			}
			var e = this;
			this.validate(true);
			if (this.trigger) {
				this.trigger.on("click", function(f) {
					f.halt();
					e.refresh()
				})
			}
			this.input.on(this.on, function() {
				e.validate()
			});
			this.img.on("click", function(f) {
				e.trigger.fire("click")
			});
			return this
		},
		validate: function(f) {
			if (!this.input) {
				this.disabled = false;
				return this.disabled
			}
			var g = this;
			var e = arguments,
				f = b.isPlainObject(e[0]) ? e[0] : {
					def: !! e[0],
					async: !! e[1],
					callback: null,
					context: window
				};
			var k = f.def,
				j = f.async,
				l = f.callback,
				h = f.context;
			this.checkAble(function(m) {
				g.validateCallback(k);
				b.isFunction(l) && l.call(this, m)
			}, j, h)
		},
		validateCallback: function(e) {
			if (e && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(e);
			!e && this.checkCallback(this.disabled);
			return this.disabled
		},
		check: function(e) {
			if (e && !b.trim(this.input.val())) {
				this.reset();
				return
			}
			switch (this.stat.code) {
				case 1:
				case 2:
				case 3:
					this.tip.error(this.stat.msg);
					this.input.removeClass(this.errCls);
					b.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tip.hide();
					this.input.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function(j, g, f) {
			var e = this,
				h;
			var f = f || e,
				g = !! g,
				j = b.isFunction(j) && j || function() {};
			if (!b.trim(this.input.val()).length) {
				this.disabled = true;
				this.disabledMsg = "验证码不能为空";
				this.stat = this.statusCode.empty;
				j.call(f, e.disabled);
				return
			} else {
				if (!b.trim(this.input.val()).match(/^[\da-zA-Z]{4}$/)) {
					this.disabled = true;
					this.disabledMsg = "验证码格式错误";
					this.stat = this.statusCode.formatError
				} else {
					this.disabled = false;
					this.stat = this.statusCode.ok
				}
			}
			j.call(f, e.disabled)
		},
		refresh: function() {
			this.img.attr("src", this.getUrl + (this.getUrl.indexOf("?") >= 0 ? "&t=" : "?t") + b.now());
			this.input.fire("focus")
		},
		reset: function() {
			this.input && this.input.val("") && this.input.removeClass(this.errCls);
			this.resetTip();
			return this
		},
		resetTip: function() {
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
		}
	});
	return c
}, {
	requires: ["Message"]
});
KISSY.add("CheckCode", function(b) {
	var a = b.DOM,
		o = b.Event,
		g = 1,
		k = /^[\da-zA-Z]{4}$/,
		e = navigator.userAgent.indexOf("Windows") !== -1,
		m = b.UA.ie,
		c = b.UA.firefox,
		l = ".{{prefixCls}}checkcode-img,.{{prefixCls}}checkcode-audio{width:175px;height:32px;line-height:32px;position:absolute;}.{{prefixCls}}checkcode-audio{display:none;}.{{prefixCls}}checkcode-img img,.{{prefixCls}}checkcode-audio audio{float:left;display:inline;width:100px;height:30px;border:1px solid #CDCDCD;cursor:pointer;}.{{prefixCls}}checkcode-refresh{display:none;width:100px;height:30px;vertical-align:middle;border:1px solid #CDCDCD;position:absolute;left:0;top:0;cursor:pointer;}.{{prefixCls}}audio-state{float:left;display:inline;width:100px;height:30px;border:1px solid #CDCDCD;position:relative;}.{{prefixCls}}audio-state-text{display:block;width:70px;height:30px;padding-left:30px;font-size:12px;color:#999;text-decoration:none;background:url(http://img01.taobaocdn.com/tps/i1/T1HVriXnVeXXbjRy2i-21-169.png) no-repeat 10px -93px;z-index:1;position:absolute;cursor:text;}.{{prefixCls}}audio-state-text:hover{text-decoration:none;}.{{prefixCls}}audio-state-progress{width:0;height:30px;background-color:#186BCA;position:absolute;left:0;top:0;z-index:0;}.{{prefixCls}}audio-over{width:100px;padding-left:0;color:#186BCA;text-align:center;background:none;cursor:pointer;}.{{prefixCls}}audio-over:hover{text-decoration:underline;}.{{prefixCls}}checkcode-refresher{float:left;display:inline;width:32px;height:32px;vertical-align:top;text-indent:-9999em;outline:none;border-right:1px solid #DDD;background:url(http://img01.taobaocdn.com/tps/i1/T1HVriXnVeXXbjRy2i-21-169.png) no-repeat 7px -145px;}.{{prefixCls}}checkcode-switcher{float:left;display:inline;width:32px;height:32px;vertical-align:top;text-indent:-9999em;outline:none;background:url(http://img01.taobaocdn.com/tps/i1/T1HVriXnVeXXbjRy2i-21-169.png) no-repeat 0 0;}.{{prefixCls}}checkcode-refresher,.{{prefixCls}}checkcode-switcher{filter:alpha(opacity=70);opacity:0.7;}.{{prefixCls}}checkcode-refresher:hover,.{{prefixCls}}checkcode-switcher:hover{filter:alpha(opacity=100);opacity:1;border-color:#EAEAEA;}.{{prefixCls}}audio-switcher{background-position:6px -40px;}.{{prefixCls}}img-switcher{background-position:5px 10px;}",
		f = {
			template: '<div class="{prefixCls}checkcode-img" id="J_ImgCode{uid}"><img id="J_CheckCodeImg{uid}" width="100" height="30" onmousedown="return false;"/><a href="#nogo" onmousedown="return false;" role="button" title="\u91cd\u65b0\u83b7\u53d6验证码" aria-label="\u91cd\u65b0\u83b7\u53d6验证码" id="J_ImgRefresher{uid}" class="{prefixCls}checkcode-refresher">\u91cd\u65b0\u83b7\u53d6验证码</a><a href="#nogo" onmousedown="return false;" role="button" title="\u83b7\u53d6\u8bed\u97f3验证码" aria-label="\u83b7\u53d6\u8bed\u97f3验证码" id="J_AudioSwitcher{uid}" class="{prefixCls}checkcode-switcher {prefixCls}audio-switcher">\u83b7\u53d6\u8bed\u97f3验证码</a></div><div class="{prefixCls}checkcode-audio" id="J_AudioCode{uid}"><span class="{prefixCls}audio-state" id="J_AudioState{uid}"><a href="#nogo" class="{prefixCls}audio-state-text" id="J_AudioStateText{uid}" onmousedown="return false;"></a><span class="{prefixCls}audio-state-progress" id="J_AudioStateProgress{uid}"></span></span><a href="#nogo" role="button" onmousedown="return false;" title="\u91cd\u65b0\u83b7\u53d6验证码" aria-label="\u91cd\u65b0\u83b7\u53d6验证码" id="J_AudioRefresher{uid}" class="{prefixCls}checkcode-refresher">\u91cd\u65b0\u83b7\u53d6验证码</a><a href="#nogo" role="button" onmousedown="return false;" title="\u83b7\u53d6\u56fe\u7247验证码" aria-label="\u83b7\u53d6\u56fe\u7247验证码" id="J_ImgSwitcher{uid}" class="{prefixCls}checkcode-switcher {prefixCls}img-switcher">\u83b7\u53d6\u56fe\u7247验证码</a></div>',
			getImgURL: "{apiserver}/get_img?identity={identity}&sessionid={sessionid}&kjtype=default",
			checkImgURL: "{apiserver}/check_img?identity={identity}&sessionid={sessionid}&delflag=0",
			getAudioURL: "{apiserver}/get_audio?identity={identity}&sessionid={sessionid}",
			checkAudioURL: "{apiserver}/check_audio?identity={identity}&sessionid={sessionid}&delflag=0"
		}, j = b.now(),
		d = b.now(),
		h = {};
	var n = function(p) {
		if (!(this instanceof n)) {
			return new n(p)
		}
		this.input = p.input && b.one(p.input);
		this.container = p.container && b.one(p.container);
		this.prefixCls = b.isString(p.prefixCls) ? p.prefixCls : "";
		this.identity = b.isString(p.identity) ? p.identity : "";
		this.sessionid = b.isString(p.sessionid) ? p.sessionid : "";
		this.apiserver = b.isString(p.apiserver) && p.apiserver ? p.apiserver : "http://pin.aliyun.com";
		this.checkedCode = "";
		this.uid = g++
	};
	b.augment(n, b.EventTarget, {
		init: function() {
			if (!this.container || !this.input || !this.identity || !this.sessionid) {
				return
			}
			if (this.INITED) {
				return this
			}
			this.createStyle();
			this.create();
			this.bind();
			this.INITED = true;
			return this
		},
		createStyle: function() {
			var p = l.replace(/{{prefixCls}}/g, this.prefixCls),
				q = a.create("<style>", {
					type: "text/css"
				});
			if (q.styleSheet) {
				q.styleSheet.cssText = p
			} else {
				q.appendChild(document.createTextNode(p))
			}
			a.append(q, "head")
		},
		create: function() {
			var r = this.uid;
			var q = b.substitute(f.template, {
				prefixCls: this.prefixCls,
				uid: r
			});
			this.container.html(q);
			this.imgCode = b.one("#J_ImgCode" + r);
			this.audioCode = b.one("#J_AudioCode" + r);
			this.imgSwitcher = b.one("#J_ImgSwitcher" + r);
			this.audioSwitcher = b.one("#J_AudioSwitcher" + r);
			this.refresher = b.all("." + this.prefixCls + "checkcode-refresher");
			this.img = b.one("#J_CheckCodeImg" + r);
			this.audioState = b.one("#J_AudioState" + r);
			this.audioStateText = b.one("#J_AudioStateText" + r);
			this.audioProgress = b.one("#J_AudioStateProgress" + r);
			var p = {
				apiserver: this.apiserver,
				identity: this.identity,
				sessionid: this.sessionid
			};
			this.getImgURL = b.substitute(f.getImgURL, p);
			this.checkImgURL = b.substitute(f.checkImgURL, p);
			this.getAudioURL = b.substitute(f.getAudioURL, p);
			this.checkAudioURL = b.substitute(f.checkAudioURL, p);
			this.CREATED = true
		},
		bind: function() {
			var p = this;
			this.bindImg();
			this.bindAudio();
			this.refresher.on("click", function(q) {
				q.halt();
				p.refresh();
				p.focus()
			});
			this.input.on("valuechange", function(q) {
				if ((!q.prevVal || q.prevVal.length === 0 || q.prevVal.length === 4) && q.newVal.length === 1) {
					d = b.now()
				}
			}).on("paste", function() {
				if (this.value.length !== 0) {
					return
				}
				d = b.now()
			})
		},
		bindImg: function() {
			if (!this.img) {
				return this
			}
			var p = this;
			this.img && this.img.on("click", function() {
				p.refresh();
				p.focus()
			}).on("load", function() {}).on("error", function() {
				p.log({
					e: "IMGERROR"
				})
			});
			this.imgSwitcher && this.imgSwitcher.on("click", function(q) {
				q.halt();
				p.switchTo("img");
				p.focus()
			});
			return this
		},
		bindAudio: function() {
			var p = this;
			this.audioSwitcher.on("click", function(q) {
				q.halt();
				p.switchTo("audio");
				p.refresh();
				p.focus()
			});
			this.audioStateText.on("click", function(q) {
				q.halt();
				if (!p.audioOver) {
					return
				}
				p.refresh();
				p.focus()
			});
			return this
		},
		bindAudioProgress: function() {
			var p = this;
			if (this.audioSupport) {
				this.audio.on("timeupdate", function() {
					if (c && (!this.duration || this.duration === Infinity)) {
						p.progress(100)
					} else {
						p.progress(parseInt(100 * this.currentTime / this.duration))
					}
				}, this.audio[0]).on("play", function() {}, this.audio[0]).on("ended", function() {
					p.progress(100)
				}, this.audio[0])
			}
		},
		switchTo: function(p) {
			if (!p || !b.isString(p)) {
				return this
			}
			var p = p.toUpperCase();
			if (p === "IMG") {
				this.audioCode.hide();
				this.stopAudio();
				this.imgCode.css({
					display: "block"
				});
				this.codeType = p
			} else {
				if (p === "AUDIO") {
					this.imgCode.hide();
					this.audioProgress.width(0);
					this.audioStateText.removeClass(this.prefixCls + "audio-replay");
					this.audioCode.css({
						display: "block"
					});
					this.codeType = p
				}
			}
			this.checkedCode = "";
			this.toggleRefresher();
			this.SHOWED = true;
			this.fire("switch");
			return this
		},
		toggleRefresher: function() {
			if (this.codeType !== "AUDIO") {
				this.refresher.show();
				return
			}
			if (!this.audioSupport || c) {
				this.refresher.hide()
			}
		},
		refreshImg: function() {
			if (!this.getImgURL) {
				return this
			}
			var p = this.getImgURL + (this.getImgURL.indexOf("?") >= 0 ? "&t=" : "?t=") + b.now();
			this.img.attr("src", p);
			return this
		},
		refreshAudio: function() {
			if (!this.getAudioURL) {
				return this
			}
			var p = this.getAudioURL + (this.getAudioURL.indexOf("?") >= 0 ? "&t=" : "?t=") + b.now();
			this.stopAudio();
			this.audioOver = false;
			if (this.audioSupport) {
				this.audioDuration = 0;
				this.audio = b.one(new Audio(p));
				this.audio[0].play();
				this.bindAudioProgress()
			} else {
				if (!m) {
					b.one("body").append('<embed src="' + p + '" id="J_EmbedSound' + this.uid + '"' + (e ? 'type="application/x-mplayer2"' : 'type="audio/x-wav"') + " autostart hidden />");
					this.player = b.one("#J_EmbedSound" + this.uid);
					this.progress("NOPROGRESS")
				} else {
					var q = a.create("<bgsound>", {
						autostart: true,
						id: "J_BgSound" + this.uid,
						src: p
					});
					a.append(q, "head");
					this.player = b.one("#J_BgSound" + this.uid);
					this.progress("NOPROGRESS")
				}
			}
			return this
		},
		refresh: function(p) {
			var p = b.isString(p) && p ? p.toUpperCase() : this.codeType;
			if (p === "IMG") {
				this.refreshImg()
			} else {
				if (p === "AUDIO") {
					this.refreshAudio()
				}
			}
			this.checkedCode = "";
			this.fire("refresh");
			j = d = b.now()
		},
		focus: function() {
			this.input[0].focus();
			this.input[0].select()
		},
		stopAudio: function() {
			if (this.audioSupport) {
				if (this.audio && this.audio[0]) {
					this.audio[0].pause()
				}
			} else {
				if (this.player) {
					this.player[0].src = "";
					this.player.remove();
					this.player = null
				}
			}
		},
		replayAudio: function() {
			if (!this.audioSupport || !this.audio) {
				return
			}
			this.audio[0].currentTime = 0;
			this.audio[0].pause();
			this.audio[0].play()
		},
		showImg: function() {
			this.switchTo("img");
			this.refresh();
			return this
		},
		showAudio: function() {
			this.switchTo("audio");
			return this
		},
		audioSupport: (function() {
			try {
				return "Audio" in window && (new Audio()).canPlayType("audio/x-wav")
			} catch (p) {
				return false
			}
		})(),
		progress: function(p) {
			switch (p) {
				case -1:
					this.audioStateText.text("正在加载");
					break;
				case 100:
				case "NOPROGRESS":
					this.audioOver = true;
					this.audioProgress.css({
						width: "0"
					});
					this.audioStateText.addClass(this.prefixCls + "audio-over").text("点击播放语音 ");
					break;
				default:
					this.audioStateText.removeClass(this.prefixCls + "audio-over").text("请仔细收听");
					this.audioProgress.css({
						width: p + "%"
					});
					break
			}
		},
		check: function(q) {
			var p = b.trim(this.input.val()),
				q = b.isFunction(q) ? q : function() {};
			if (!k.test(p)) {
				q({
					success: false,
					codeType: this.codeType
				});
				return
			}
			if (this.checkedCode && this.checkedCode === p) {
				q({
					success: true,
					codeType: this.codeType
				});
				return
			}
			h[p] = q;
			if (this.checkingCode) {
				if (this.checkingCode === p) {
					return
				} else {
					this.io && this.io.abort && this.io.abort()
				}
			}
			this.checkingCode = p;
			b.later(function() {
				this._check(q)
			}, 500, false, this)
		},
		_check: function(t) {
			var p = this.codeType == "IMG" ? this.checkImgURL : this.checkAudioURL,
				s = b.trim(this.input.val());
			var q = this;
			q.io = b.io({
				url: p,
				data: {
					code: s
				},
				dataType: "jsonp",
				success: function(u) {
					q.checkingCode = "";
					q.log({
						t1: b.now() - d,
						t2: b.now() - j,
						s: u && u.message === "SUCCESS.",
						t: q.codeType
					});
					if (u && u.message === "SUCCESS.") {
						q.progress(100);
						q.stopAudio();
						q.checkedCode = s;
						h[s] && h[s]({
							success: true,
							codeType: q.codeType
						})
					} else {
						r()
					}
				},
				error: function() {
					r()
				}
			});

			function r() {
				if (q.codeType === "IMG") {
					q.refresh()
				} else {
					q.progress(100);
					q.stopAudio()
				}
				q.checkedCode = "";
				h[s] && h[s]({
					success: false,
					codeType: q.codeType
				})
			}
		},
		log: function(q) {
			if (!q) {
				return
			}
			var p = new Image();
			p.src = "http://acjs.aliyun.com/captchaerror?" + b.param(q)
		}
	});
	b.checkcode = n;
	return n
});
KISSY.add("SuperCheckCode", function(d, b, c) {
	var a = function(e) {
		if (!(this instanceof a)) {
			return new a(e)
		}
		this.input = e.input && d.one(e.input);
		this.errCls = d.isString(e.errCls) && e.errCls || "";
		this.container = e.container && d.one(e.container);
		this.defaultType = d.isString(e.defaultType) ? e.defaultType : "img";
		this.apiserver = e.apiserver;
		this.identity = e.identity;
		this.sessionid = e.sessionid;
		this.prefixCls = d.isString(e.prefixCls) ? e.prefixCls : "";
		this.checkData = d.isPlainObject(e.checkData) && e.checkData || {};
		this.checkCallback = d.isFunction(e.checkCallback) ? e.checkCallback : function() {};
		this.tip = e.tip && d.one(e.tip) ? c(e.tip) : null;
		this.checkOn = e.on || "keyup blur";
		this.defaultTip = e.defaultTip || null;
		this.disabledMsg = d.isString(e.disabledMsg) ? e.disabledMsg : "验证码格式有\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this.stat = {
			code: 0,
			msg: ""
		};
		this.checkcode = null;
		this.codeType = ""
	};
	d.augment(a, d.Event.Target, {
		ctype: "CHECKER",
		statusCode: {
			netError: {
				code: -1,
				msg: "网络错误"
			},
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "验证码格式错误"
			},
			ajaxError: {
				code: 3,
				msg: "验证码错误"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.input || !this.container || !this.identity || !this.sessionid) {
				return this
			}
			var e = this;
			this.checkcode = b({
				input: e.input,
				container: e.container,
				apiserver: e.apiserver,
				identity: e.identity,
				sessionid: e.sessionid,
				prefixCls: e.prefixCls
			});
			this.validate(true);
			this.input.on(this.checkOn, function() {
				e.validate(false, true)
			});
			return this
		},
		validate: function(f) {
			var g = this;
			var e = arguments,
				f = d.isPlainObject(e[0]) ? e[0] : {
					def: !! e[0],
					async: !! e[1],
					callback: null,
					context: window
				};
			var k = f.def,
				j = f.async,
				l = f.callback,
				h = f.context;
			this.checkAble(function(m) {
				g.validateCallback(k);
				d.isFunction(l) && l.call(this, m)
			}, j, h)
		},
		validateCallback: function(e) {
			if (e && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(e);
			!e && this.checkCallback(this.disabled);
			return this.disabled
		},
		check: function(e) {
			if (e && !d.trim(this.input.val())) {
				this.reset();
				return
			}
			switch (this.stat.code) {
				case 1:
				case 2:
				case 3:
					this.tip.error(this.stat.msg);
					this.input.removeClass(this.errCls);
					d.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tip.ok();
					this.input.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function(j, g, f) {
			var e = this,
				h;
			var f = f || e,
				g = !! g,
				j = d.isFunction(j) && j || function() {};
			if (!d.trim(this.input.val()).length) {
				this.disabled = true;
				this.disabledMsg = "验证码不能为空";
				this.stat = this.statusCode.empty;
				j.call(f, e.disabled);
				return
			} else {
				if (!d.trim(this.input.val()).match(/^[\da-zA-Z]{4,6}$/)) {
					this.disabled = true;
					this.disabledMsg = "验证码格式错误";
					this.stat = this.statusCode.formatError
				} else {
					this.disabled = false;
					this.stat = this.statusCode.ok
				}
			}
			if (e.disabled || !g) {
				j.call(f, e.disabled);
				return
			}
			if (!this.checkcode || !this.checkcode.INITED || !this.checkcode.SHOWED) {
				j.call(f, e.disabled);
				return
			}
			this.checkcode.check(function(k) {
				if (k.success) {
					e.disabled = false;
					e.stat = e.statusCode.ok
				} else {
					e.disabled = true;
					e.stat = e.statusCode.ajaxError
				}
				j.call(f, e.disabled);
				e.checkCallback(e.disabled)
			})
		},
		reset: function() {
			this.input && this.input.val("") && this.input.removeClass(this.errCls);
			this.resetTip();
			return this
		},
		resetTip: function() {
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
		},
		showCode: function(f) {
			var f = f || this.defaultType,
				e = this;
			if (this.checkcode && !this.checkcode.SHOWED) {
				if (!this.checkcode.INITED) {
					this.checkcode.init();
					this.checkcode.on("switch", function() {
						e.disabled = true;
						e.tip.hide();
						e.codeType = this.codeType;
						e.fire("switch")
					}).on("refresh", function() {
						e.disabled = true;
						e.tip.hide();
						e.fire("refresh")
					})
				}
				if (f.toLowerCase() === "audio") {
					this.checkcode.showAudio()
				} else {
					this.checkcode.showImg()
				}
			}
			this.INITED = this.checkcode && this.checkcode.INITED;
			this.SHOWED = this.checkcode && this.checkcode.SHOWED
		}
	});
	return a
}, {
	requires: ["CheckCode", "Message"]
});
KISSY.add("AudioCheckCode", function(c) {
	var d = c.DOM;
	var b = function(e) {
		this.url = e.url || "";
		this.input = e.input && c.one(e.input);
		this.handle = e.handle && c.one(e.handle);
		this.player = null
	};
	var a = function(e) {
		return new b(e)
	};
	c.augment(b, {
		init: function() {
			if (!this.url || !this.input || !this.handle) {
				return this
			}
			var e = this;
			this.handle.on("click", function(f) {
				f.halt();
				e.play();
				c.later(function() {
					e.input[0].focus()
				}, 10)
			})
		},
		playHTML: function() {
			var f;
			var g = navigator.userAgent.indexOf("Windows") != -1;
			try {
				f = ("Audio" in window && (new Audio()).canPlayType("audio/x-wav;")) ? function() {
					return "<audio autoplay hidden></audio>"
				} : (c.UA.ie ? function() {
					return "<bgsound></bgsound>"
				} : function() {
					return "<embed " + (g ? 'type="application/x-mplayer2"' : 'type="audio/x-wav"') + ' autostart="true" hidden="true" />'
				})
			} catch (h) {
				f = c.UA.ie ? function() {
					return "<bgsound></bgsound>"
				} : function() {
					return "<embed " + (g ? 'type="application/x-mplayer2"' : 'type="audio/x-wav"') + ' autostart="true" hidden="true" />'
				}
			}
			this.playHTML = f;
			return f()
		},
		play: function() {
			this.player && this.player.parentNode.removeChild(this.player);
			this.player = d.create(this.playHTML(), {
				src: this.url + "&t=" + new Date().getTime()
			});
			d.append(this.player, document.body || document.documentElement)
		}
	});
	return a
});
KISSY.add("SimpleCheckCode", function(c, b, f, e) {
	var a = function(g) {
		this.input = g.input && c.one(g.input);
		this.errCls = c.isString(g.errCls) && g.errCls || "";
		this.checkUrl = g.checkUrl || "";
		this.checkData = c.isPlainObject(g.checkData) && g.checkData || {};
		this.checkCallback = c.isFunction(g.checkCallback) ? g.checkCallback : function() {};
		this.tip = g.tip && c.one(g.tip) ? b(g.tip) : null;
		this.pattern = g.pattern || null;
		this.on = g.on || "keyup blur";
		this.placeholder = g.placeholder && c.one(g.placeholder);
		this.defaultTip = g.defaultTip || null;
		this.disabledMsg = c.isString(g.disabledMsg) ? g.disabledMsg : "\u8f93\u5165\u683c\u5f0f\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this._placeholder = null;
		this.checked = false;
		this.stat = {
			code: 0,
			msg: ""
		};
		this.asyncRetData = null
	};
	var d = function(g) {
		return new a(g)
	};
	c.augment(a, {
		ctype: "CHECKER",
		statusCode: {
			netError: {
				code: -1,
				msg: "网络错误"
			},
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "\u683c\u5f0f\u9519\u8bef"
			},
			ajaxError: {
				code: 3,
				msg: "\u8f93\u5165\u9519\u8bef"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.input || !this.tip || !this.pattern) {
				return this
			}
			var g = this;
			this.validate(true);
			this.input.on(this.on, function() {
				g.validate()
			});
			if (this.placeholder) {
				this._placeholder = f({
					input: this.input,
					placeholder: this.placeholder
				}).init()
			}
			return this
		},
		validate: function(m) {
			if (!this.input) {
				this.disabled = false;
				return this.disabled
			}
			var j = this;
			var g = arguments,
				h = c.isPlainObject(g[0]) ? g[0] : {
					def: !! g[0],
					async: !! g[1],
					callback: null,
					context: window
				};
			var m = h.def,
				l = h.async,
				n = h.callback,
				k = h.context;
			this.checkAble(function(o) {
				j.validateCallback(m);
				c.isFunction(n) && n.call(this, o)
			}, l, k)
		},
		validateCallback: function(g) {
			if (g && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(g);
			!g && this.checkCallback(this.disabled);
			return this.disabled
		},
		check: function(g) {
			if (g && !c.trim(this.input.val())) {
				this.resetTip();
				return
			}
			switch (this.stat.code) {
				case 1:
				case 2:
				case 3:
					this.tip.error(this.stat.msg);
					this.input.removeClass(this.errCls);
					c.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tip.hide();
					this.input.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function(m, k, j) {
			var h = this,
				l, g;
			var j = j || h,
				k = !! k,
				m = c.isFunction(m) && m || function() {};
			if (!c.trim(this.input.val()).length) {
				h.disabled = true;
				h.stat = h.statusCode.empty;
				m.call(j, h.disabled);
				return
			} else {
				if (!h.cache || h.cache.getIndex("value", h.input.val()) == -1) {
					if (c.trim(this.input.val()).match(this.pattern)) {
						h.disabled = false;
						h.stat = h.statusCode.ok
					} else {
						h.disabled = true;
						h.stat = h.statusCode.formatError;
						m.call(j, h.disabled);
						return
					}
					if (!h.checkUrl || h.disabled || !k) {
						if (h.cache) {
							g = h._updateCache();
							h.cache.set(g, "value")
						}
						m.call(j, h.disabled);
						return
					}
					c.io({
						url: h.checkUrl,
						data: c.mix(h.checkData, {
							code: c.trim(h.input.val())
						}),
						type: "post",
						dataType: "json",
						success: function(n) {
							if (n.success) {
								h.disabled = false;
								h.stat = {
									code: h.statusCode.ok,
									msg: n.msg || h.statusCode.ajaxError
								}
							} else {
								h.disabled = true;
								h.stat = {
									code: h.statusCode.ajaxError,
									msg: n.msg || h.statusCode.ajaxError
								}
							}
							h.asyncRetData = n;
							m.call(j, h.disabled);
							if (h.cache) {
								g = h._updateCache();
								h.cache.set(g, "value")
							}
						},
						error: function() {
							h.asyncRetData = null;
							h.stat = {
								code: h.statusCode.netError.code,
								value: c.trim(h.input.val()),
								msg: h.statusCode.netError.msg
							};
							h.recommendNick = null;
							m.call(j, h.disabled)
						}
					})
				} else {}
			}
		},
		reset: function(g) {
			this._placeholder && this._placeholder.fix();
			if (g) {
				return this
			}
			this.disabled = true;
			this.input && this.input.val("").removeClass(this.errCls);
			this.tip && this.resetTip();
			return this
		},
		resetTip: function() {
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
			return this
		}
	});
	return d
}, {
	requires: ["Message", "PlaceHolder", "Cache"]
});
KISSY.add("SerectSecureCard", function(c, b) {
	var d = function(e) {
		this.input1 = e.input1 && c.one(e.input1);
		this.input2 = e.input2 && c.one(e.input2);
		this.errCls = c.isString(e.errCls) && e.errCls || "";
		this.checkUrl = e.checkUrl || "";
		this.checkData = c.isPlainObject(e.checkData) && e.checkData || {};
		this.checkCallback = c.isFunction(e.checkCallback) ? e.checkCallback : function() {};
		this.tip = e.tip && c.one(e.tip) ? b(e.tip) : null;
		this.on = e.on || "key blur";
		this.defaultTip = e.defaultTip || null;
		this.disabledMsg = c.isString(e.disabledMsg) ? e.disabledMsg : "验证码\u8f93\u5165\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this.stat = {
			code: 0,
			msg: ""
		}
	};
	var a = function(e) {
		return new d(e)
	};
	c.augment(d, {
		ctype: "CHECKER",
		statusCode: {
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "验证码格式错误"
			},
			ajaxError: {
				code: 3,
				msg: "验证码错误"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.input1 || !this.input2) {
				return this
			}
			var e = this;
			this.validate(true);
			this.input1.on(this.on, function() {
				e.validate()
			});
			this.input2.on(this.on, function() {
				e.validate()
			});
			return this
		},
		validate: function(e) {
			if (!this.input1 || !this.input2 || !this.tip) {
				this.disabled = false;
				return this.disabled
			}
			this.checkAble();
			if (e && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(e);
			e && this.checkCallback(this.disabled);
			return this.disabled
		},
		check: function(e) {
			if (e && !c.trim(this.input1.val()) && !c.trim(this.input2.val())) {
				this.resetTip();
				return
			}
			switch (this.stat.code) {
				case 1:
				case 2:
				case 3:
					this.tip.error(this.stat.msg);
					this.input1.removeClass(this.errCls);
					this.input2.removeClass(this.errCls);
					c.later(function() {
						this.input1.addClass(this.errCls);
						this.input2.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tip.hide();
					this.input1.removeClass(this.errCls);
					this.input2.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function() {
			var e = this;
			if (!c.trim(this.input1.val()) && !c.trim(this.input2.val())) {
				this.disabled = true;
				this.stat = this.statusCode.empty
			} else {
				if (this._checkAble()) {
					this.disabled = false;
					this.stat = this.statusCode.ok
				} else {
					this.disabled = true;
					this.stat = this.statusCode.formatError
				}
			}
			if (!this.checkUrl || this.disabled) {
				return
			}
			c.io({
				url: e.checkUrl,
				data: c.mix(e.checkData, {
					id: c.trim((e.input1.attr("data-id") || "") + (e.input2.attr("data-id"))),
					code: c.trim(e.input1.val() + e.input2.val())
				}),
				type: "post",
				dataType: "json",
				success: function(f) {
					if (f.success) {
						e.disabled = false;
						e.stat = {
							code: e.statusCode.ok.code,
							msg: f.msg || e.statusCode.ok.msg
						}
					} else {
						e.disabled = true;
						e.stat = {
							code: e.statusCode.ok.ajaxError,
							msg: f.msg || e.statusCode.ajaxError.msg
						}
					}
				}
			})
		},
		_checkAble: function() {
			var e = !! c.trim(this.input1.val()).match(/^\d{2,3}$/);
			cv2 = !! c.trim(this.input2.val()).match(/^\d{2,3}$/);
			return e && cv2
		},
		reset: function(e) {
			if (e) {
				return
			}
			this.input1 && this.input1.val("").removeClass(this.errCls);
			this.input2 && this.input2.val("").removeClass(this.errCls);
			this.tip && this.resetTip()
		},
		resetTip: function() {
			if (!this.tip) {
				return
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
		}
	});
	return a
}, {
	requires: ["Message"]
});
KISSY.add("QA", function(c, b) {
	var d = function(e) {
		this.a1 = e.a1 && c.one(e.a1);
		this.a1tip = e.a1tip && c.one(e.a1tip) ? b(e.a1tip) : null;
		this.a2 = e.a2 && c.one(e.a2);
		this.a2tip = e.a2tip && c.one(e.a2tip) ? b(e.a2tip) : null;
		this.a3 = e.a3 && c.one(e.a3);
		this.a3tip = e.a3tip && c.one(e.a3tip) ? b(e.a3tip) : null;
		this.errCls = c.isString(e.errCls) && e.errCls || "";
		this.a = [this.a1, this.a2, this.a3];
		this.tips = [this.a1tip, this.a2tip, this.a3tip];
		this.on = (e.on || "keyup blur");
		this.disabledMsg = c.isString(e.disabledMsg) ? e.disabledMsg : "\u5bc6\u4fdd\u95ee\u9898\u7b54\u6848\u683c\u5f0f\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this.stat = {
			code: 0,
			msg: ""
		}
	};
	var a = function(e) {
		return new d(e)
	};
	c.augment(d, {
		ctype: "CHECKER",
		statusCode: {
			empty: {
				code: 1,
				msg: "不能为空"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.a1 && !this.a2 && !this.a3) {
				return this
			}
			var e = this;
			this.checkAble(1, true);
			this.checkAble(2, true);
			this.checkAble(3, true);
			this.a1.on(this.on, function() {
				e.validate(1)
			});
			this.a2.on(this.on, function() {
				e.validate(2)
			});
			this.a3.on(this.on, function() {
				e.validate(3)
			});
			return this
		},
		validate: function(e) {
			if (!this.a1 && !this.a2 && !this.a3) {
				this.disabled = false;
				return this.disabled
			}
			this.checkAble(1);
			this.check(1, e);
			this.checkAble(2);
			this.check(2, e);
			this.checkAble(3);
			this.check(3, e);
			return this.disabled
		},
		check: function(e, f) {
			if (f && !c.trim(this.a[e - 1].val())) {
				return
			}
			switch (this.stat.code) {
				case 1:
					this.tips[e - 1].show();
					this.a[e - 1].removeClass(this.errCls);
					c.later(function() {
						this.a[e - 1].addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tips[e - 1].hide();
					this.a[e - 1].removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function(e) {
			if (this.a[e - 1]) {
				if (this.isEmpty(this.a[e - 1])) {
					this.stat = this.statusCode.empty
				} else {
					this.stat = this.statusCode.ok
				}
			}
			this.disabled = this.isEmpty(this.a1) || this.isEmpty(this.a2) || this.isEmpty(this.a3)
		},
		isEmpty: function(e) {
			return !c.trim(e.val()).length
		},
		reset: function(e) {
			if (e) {
				return
			}
			this.disabled = true;
			this.a1 && this.a1.val("").removeClass(this.errCls);
			this.a2 && this.a2.val("").removeClass(this.errCls);
			this.a3 && this.a3.val("").removeClass(this.errCls);
			this.a1tip && this.a1tip.hide();
			this.a2tip && this.a2tip.hide();
			this.a3tip && this.a3tip.hide()
		}
	});
	return a
}, {
	requires: ["Message"]
});
KISSY.add("UserName", function(b, a, f, d) {
	var c = function(g) {
		this.type = (g.type || "REG").toUpperCase();
		this.input = g.input && b.one(g.input);
		this.errCls = b.isString(g.errCls) && g.errCls || "";
		this.placeholder = g.placeholder && g.input ? f({
			input: g.input,
			placeholder: g.placeholder,
			blurCls: "ph_blur"
		}) : null;
		this.checkUrl = g.checkUrl || "";
		this.checkData = b.isPlainObject(g.checkData) && g.checkData || {};
		this.checkCallback = b.isFunction(g.checkCallback) ? g.checkCallback : function() {};
		this.tip = g.tip && b.one(g.tip) ? a(g.tip) : null;
		this.timeout = b.isNumber(g.timeout) ? g.timeout : 0;
		this.suggestNick = g.suggestNick && b.one(g.suggestNick);
		this.suggestNickList = g.suggestNickList && b.one(g.suggestNickList);
		this.suggestNickKey = b.isString(g.suggestNickKey) && g.suggestNickKey || "";
		this.suggestAutoClose = !! g.suggestAutoClose;
		this.recommendNick = null;
		this.suggestNickTemplate = '<li><input type="radio" name="chk-nick" class="i_radio_nick" value="{nick}" {checked} id="chk-{id}" /><label for="chk-{id}">{nick}</lable></li>';
		this.on = g.on || "keyup blur";
		this.defaultOn = g.defaultOn || "";
		this.defaultTip = g.defaultTip || null;
		this.tipMsg = b.isPlainObject(g.tipMsg) ? g.tipMsg : {};
		this.msgTemplate = b.isObject(g.msgTemplate) ? g.msgTemplate : null;
		this.disabledMsg = b.isString(g.disabledMsg) ? g.disabledMsg : "\u7528\u6237\u540d\u8f93\u5165\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this.stat = {
			code: 0,
			msg: ""
		};
		this.cache = !! g.cache ? d().init() : null;
		this.async = false;
		this.asyncRetData = null
	};
	var e = function(g) {
		return new c(g)
	};
	b.augment(c, {
		ctype: "CHECKER",
		statusCode: {
			netError: {
				code: -1,
				msg: "网络错误"
			},
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "\u7528\u6237\u540d\u683c\u5f0f\u9519\u8bef"
			},
			ajaxError: {
				code: 3,
				msg: "\u7528\u6237\u540d\u9519\u8bef"
			},
			sizeError: {
				code: 4,
				msg: "5-25\u4e2a\u5b57\u7b26"
			},
			allNumberError: {
				code: 5,
				msg: "\u4e0d\u80fd\u5168\u4e3a\u6570\u5b57"
			},
			illegalError: {
				code: 6,
				msg: "\u5305\u542b\u975e\u6cd5\u5b57\u7b26"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		regex: {
			illegal: /[~\uff5e]|[!\uff01]|[?\uff1f]|\.\.|--|__|\uff0d|\uff3f|\u203b|\u25b2|\u25b3|\u3000| |@/,
			allNumber: /^\d+$/
		},
		init: function() {
			if (!this.input || !this.tip) {
				return this
			}
			this.placeholder && this.placeholder.init();
			var g = this;
			this.validate(true, false);
			this.input.on(this.on, function() {
				b.later(function() {
					g.validate(false, true)
				}, g.timeout, false, this)
			});
			this.defaultOn && (this.input.on(this.defaultOn, function() {
				!b.trim(g.input.val()) && g.reset()
			}));
			this.suggestNickList && this.suggestNickKey && b.Event.delegate(document, "click", ".i_radio_nick", function(h) {
				g.input.val(h.currentTarget.value);
				if (g.suggestAutoClose) {
					g.suggestNick.hide()
				}
				g.validate()
			});
			return this
		},
		validate: function(h) {
			if (!this.input) {
				this.disabled = false;
				return this.disabled
			}
			var j = this;
			var g = arguments,
				h = b.isPlainObject(g[0]) ? g[0] : {
					def: !! g[0],
					async: !! g[1],
					callback: null,
					context: window
				};
			var m = h.def,
				l = h.async,
				n = h.callback,
				k = h.context;
			this.checkAble(function(o) {
				j.validateCallback(m);
				b.isFunction(n) && n.call(this, o)
			}, l, k)
		},
		validateCallback: function(g) {
			if (g && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(g);
			if (!this.recommendNick) {
				this.suggestNick && this.suggestNick.hide()
			} else {
				if (this.async) {
					this.updateSuggestList()
				}
			}
			this.async && this.updateSuggestList();
			!g && this.checkCallback(this.disabled, this.asyncRetData, this.recommendNick);
			return this.disabled
		},
		updateSuggestList: function() {
			if (!this.recommendNick) {
				return
			}
			var h = this.suggestNickTemplate,
				g = this;
			var j = "";
			b.each(this.recommendNick, function(k, l) {
				j += b.substitute(h, {
					id: "nick_" + l,
					nick: k,
					checked: k === g.input.val() ? "checked" : ""
				})
			});
			this.suggestNickList.html(j);
			this.suggestNick.show()
		},
		check: function(g) {
			if (g && !b.trim(this.input.val())) {
				!this.defaultOn && this.reset();
				return
			}
			switch (this.stat.code) {
				case -1:
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
					this.tip.error(this.stat.msg);
					this.input.removeClass(this.errCls);
					b.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tip.ok(this.tipMsg.ok || "");
					this.input.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function(m, k, j) {
			var h = this,
				l, g;
			var j = j || h,
				k = !! k,
				m = b.isFunction(m) && m || function() {};
			this.asyncRetData = null;
			this.recommendNick = null;
			h.async = k;
			if (!b.trim(h.input.val()).length) {
				h.disabled = true;
				h.stat = h.statusCode.empty;
				m.call(j, h.disabled);
				return
			} else {
				if (!h.cache || h.cache.getIndex("value", h.input.val()) == -1) {
					if (l = h._checkAble()) {
						h.disabled = true;
						if (h.type == "REG") {
							switch (l) {
								case 4:
									h.stat = h.statusCode.sizeError;
									break;
								case 5:
									h.stat = h.statusCode.allNumberError;
									break;
								case 6:
									h.stat = h.statusCode.illegalError;
									break;
								default:
									break
							}
						} else {
							h.stat = h.statusCode.formatError
						}
					} else {
						h.disabled = false;
						h.stat = h.statusCode.ok
					}
					if (!h.checkUrl || h.disabled || !k) {
						if (h.cache) {
							g = h._updateCache();
							h.cache.set(g, "value")
						}
						m.call(j, h.disabled);
						return
					}
					b.io({
						url: h.checkUrl,
						data: b.mix(h.checkData, {
							nick: b.trim(h.input.val())
						}),
						type: "post",
						dataType: "json",
						success: function(n) {
							var o = n.msg || n.reason || "";
							o = h.msgTemplate ? h.msgTemplate[o] || o : o;
							if (n.success) {
								h.disabled = false;
								h.stat = {
									code: h.statusCode.ok.code,
									msg: o || h.statusCode.ok.msg
								};
								h.recommendNick = null
							} else {
								h.disabled = true;
								h.stat = {
									code: h.statusCode.ajaxError.code,
									msg: o || h.statusCode.ajaxError.msg
								};
								h.recommendNick = h.suggestNick && h.suggestNickList && h.suggestNickKey ? n[h.suggestNickKey] : null
							}
							this.asyncRetData = n;
							m.call(j, h.disabled);
							if (h.cache) {
								g = h._updateCache();
								h.cache.set(g, "value")
							}
						},
						error: function() {
							this.asyncRetData = null;
							h.stat = {
								code: h.statusCode.netError.code,
								value: b.trim(h.input.val()),
								msg: h.statusCode.netError.msg
							};
							h.recommendNick = null;
							m.call(j, h.disabled)
						}
					})
				} else {
					g = h.cache.get("value", h.input.val());
					h.disabled = g.disabled;
					h.stat = g.stat;
					h.recommendNick = g.recommendNick;
					m.call(j, h.disabled)
				}
			}
		},
		_checkAble: function() {
			var h = 0,
				g;
			if (!this.matchSize()) {
				h = 4
			} else {
				if (this.type == "REG" && this.isAllNumber()) {
					h = 5
				} else {
					if (g = this.isIllegal()) {
						this.statusCode.illegalError = {
							code: 6,
							msg: "\u5305\u542b\u975e\u6cd5\u5b57\u7b26" + g
						};
						h = 6
					}
				}
			}
			return h
		},
		_updateCache: function() {
			return {
				value: b.trim(this.input.val()),
				disabled: this.disabled,
				stat: this.stat,
				recommendNick: this.recommendNick
			}
		},
		_updateRecommendNick: function() {
			if (!this.recommendNick || !this.recommendNick.length) {
				return this
			}
			var h = "",
				g = 0;
			while (g < this.recommendNick.length) {
				h += b.substitute(this.suggestNickListTemplate, {
					index: g,
					nick: this.recommendNick[g]
				});
				g++
			}
			this.suggestNickList.html(h);
			return this
		},
		isAllNumber: function() {
			return !!this.input.val().match(this.regex.allNumber)
		},
		isIllegal: function() {
			var g = this.input.val().match(this.regex.illegal);
			return g ? g.join(" ") : ""
		},
		size: function() {
			return b.trim(this.input.val()).replace(/[^\x00-\xff]/g, "**").length
		},
		matchSize: function() {
			var g = this.type == "REG" ? 5 : 2;
			return this.size() >= g && this.size() <= (this.type == "REG" ? 25 : 9999)
		},
		reset: function() {
			this.input && this.input.removeClass(this.errCls);
			this.resetTip();
			return this
		},
		resetTip: function() {
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
			return this
		}
	});
	return e
}, {
	requires: ["Message", "PlaceHolder", "Cache"]
});
KISSY.add("PasswordCore", function(b) {
	var a = function(d) {
		this.password = d || ""
	};
	var c = function(d) {
		return new a(d)
	};
	b.augment(a, {
		regex: {
			illegal: /[^-+=|,0-9a-zA-Z!@#$%^&*?_.~+/\\(){}\[\]<>]/g,
			allNumber: /^\d+$/,
			allLetter: /^[a-zA-Z]+$/,
			allCharacter: /^[-+=|,!@#$%^&*?_.~+/\\(){}\[\]<>]+$/,
			allSame: /^([\s\S])\1*$/,
			number: /\d/g,
			letter: /[a-zA-Z]/g,
			lowerAndUpperLetter: /[a-z][^A-Z]*[A-Z]|[A-Z][^a-z]*[a-z]/,
			numberAndLetter: /\d[^a-zA-Z]*[a-zA-Z]|[a-zA-Z][^\d]*\d/,
			character: /[-+=|,!@#$%^&*?_.~+/\\()|{}\[\]<>]/g
		},
		score: function() {
			var g = 0;
			if (this.isIllegal()) {
				return g
			}
			var j = this.size();
			if (j <= 4) {
				g += 5
			} else {
				if (j > 4 && j < 8) {
					g += 10
				} else {
					if (j >= 8) {
						g += 25
					}
				}
			}
			var f = this.hasLowerAndUpperLetter(),
				e = this.hasLetter();
			if (f) {
				g += 20
			} else {
				if (e) {
					g += 10
				}
			}
			var d = this.hasNumber();
			if (d >= 3) {
				g += 20
			} else {
				if (d) {
					g += 10
				}
			}
			var h = this.hasCharacter();
			if (h >= 3) {
				g += 25
			} else {
				if (h) {
					g += 10
				}
			}
			if (f && d && h) {
				g += 10
			} else {
				if (e && d && h) {
					g += 5
				} else {
					if ((e && d) || (e && h) || (d && h)) {
						g += 2
					}
				}
			}
			return g
		},
		level: function() {
			var e = 0;
			var d = Math.floor(this.score() / 10);
			switch (d) {
				case 10:
				case 9:
					e = 7;
					break;
				case 8:
					e = 6;
					break;
				case 7:
					e = 5;
					break;
				case 6:
					e = 4;
					break;
				case 5:
				case 4:
				case 3:
					e = 3;
					break;
				case 2:
					e = 2;
					break;
				default:
					e = 1;
					break
			}
			return e
		},
		size: function() {
			return this.password.length
		},
		isIllegal: function() {
			return !!this.password.match(this.regex.illegal)
		},
		isAllNumber: function() {
			return !!this.password.match(this.regex.allNumber)
		},
		isAllLetter: function() {
			return !!this.password.match(this.regex.allLetter)
		},
		isAllSame: function() {
			return !!this.password.match(this.regex.allSame)
		},
		hasNumber: function() {
			return (this.password.match(this.regex.number) || []).length
		},
		hasLetter: function() {
			return (this.password.match(this.regex.letter) || []).length
		},
		hasLowerAndUpperLetter: function() {
			return !!this.password.match(this.regex.lowerAndUpperLetter)
		},
		hasNumberAndLetter: function() {
			return !!this.password.match(this.regex.numberAndLetter)
		},
		hasCharacter: function() {
			return (this.password.match(this.regex.character) || []).length
		}
	});
	return c
});
KISSY.add("Similar", function(a) {
	var c = {
		_str1: null,
		_str3: null,
		_matrix: null,
		init: function(e, d) {
			if (!a.isString(e) || !a.isString(d)) {
				return
			}
			this._str1 = e;
			this._str2 = d;
			e.length && d.length && this._createMatrix(e.length + 1, d.length + 1);
			this._matrix && this._initMatrix();
			return this
		},
		get: function() {
			return 1 - this._getDistance() / Math.max(this._str1.length, this._str2.length)
		},
		_getDistance: function() {
			var g = this._str1.length,
				e = this._str2.length;
			if (!g || !e) {
				return Math.max(g, e)
			}
			var l = this._str1.split(""),
				k = this._str2.split("");
			var h = 0,
				f = 0,
				d = 0;
			while (h++ < g) {
				f = 0;
				while (f++ < e) {
					d = l[h - 1] === k[f - 1] ? 0 : 1;
					this._matrix[h][f] = Math.min(this._matrix[h - 1][f] + 1, this._matrix[h][f - 1] + 1, this._matrix[h - 1][f - 1] + d)
				}
			}
			return this._matrix[h - 1][f - 1]
		},
		_initMatrix: function() {
			var f = this._matrix[0].length,
				e = this._matrix.length;
			var d = Math.max(f, e);
			while (d--) {
				f - 1 >= d && (this._matrix[0][d] = d);
				e - 1 >= d && (this._matrix[d][0] = d)
			}
		},
		_createMatrix: function(e, d) {
			if (!a.isNumber(e) || !a.isNumber(d) || e < 1 || d < 1) {
				return
			}
			this._matrix = new Array(e), i = 0;
			while (i < e) {
				this._matrix[i++] = new Array(d)
			}
		}
	}, b = function(e, d) {
		return c.init(e, d).get()
	};
	return b
});
KISSY.add("Password", function(d, c, a, f) {
	var b = function(g) {
		this.input = g.input && d.one(g.input);
		this.reinput = g.reinput && d.one(g.reinput);
		this.strengthInput = g.strengthInput && d.one(g.strengthInput);
		this.timeout = d.isNumber(g.timeout) ? g.timeout : 0;
		this.errCls = d.isString(g.errCls) && g.errCls || "";
		this.checkCallback = d.isFunction(g.checkCallback) ? g.checkCallback : function() {};
		this.tip = g.tip && d.one(g.tip) ? a(g.tip) : null;
		this.retip = g.retip && d.one(g.retip) ? a(g.retip) : null;
		this.strength = g.strength && d.one(g.strength);
		this.strengthCls = g.strengthCls ? g.strengthCls : {
			weak: "weak",
			medium: "medium",
			strong: "strong"
		};
		this.on = g.on || "keyup blur";
		this.defaultOn = g.defaultOn || "";
		this.username = g.username && d.one(g.username);
		this.defaultTip = g.defaultTip || null;
		this.redefaultTip = g.redefaultTip || null;
		this.disabledMsg = d.isString(g.disabledMsg) ? g.disabledMsg : "\u5bc6\u7801\u6216\u91cd\u590d\u5bc6\u7801\u683c\u5f0f\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.password = null;
		this._disabled = true;
		this._redisabled = !! this.reinput;
		this.disabled = this._disabled || this._redisabled;
		this.stat = {
			code: 0,
			msg: ""
		};
		this.restat = {
			code: 0,
			msg: ""
		}
	};
	var e = function(g) {
		return new b(g)
	};
	d.augment(b, {
		ctype: "CHECKER",
		statusCode: {
			empty: {
				code: 1,
				msg: "不能为空"
			},
			size: {
				code: 2,
				msg: "\u957f\u5ea6\u5e94\u4e3a6-16\u4e2a\u5b57\u7b26"
			},
			illegal: {
				code: 3,
				msg: "\u4e0d\u80fd\u5305\u542b\u975e\u6cd5\u5b57\u7b26"
			},
			same: {
				code: 4,
				msg: "\u4e0d\u80fd\u4e3a\u540c\u4e00\u5b57\u7b26"
			},
			allLetter: {
				code: 5,
				msg: "\u4e0d\u80fd\u5168\u4e3a\u5b57\u6bcd"
			},
			allNumber: {
				code: 6,
				msg: "\u4e0d\u80fd\u5168\u4e3a\u6570\u5b57"
			},
			allCharacter: {
				code: 7,
				msg: "\u4e0d\u80fd\u5168\u4e3a\u7b26\u53f7"
			},
			weak: {
				code: 8,
				msg: "\u60a8\u7684\u5bc6\u7801\u5b89\u5168\u6027\u8f83\u4f4e\uff0c\u5efa\u8bae\u4f7f\u7528\u82f1\u6587\u5b57\u6bcd\u52a0\u6570\u5b57\u6216\u7b26\u53f7\u7ec4\u5408"
			},
			similar: {
				code: 9,
				msg: "\u5bc6\u7801\u548c\u8d26\u6237\u540d\u592a\u76f8\u4f3c"
			},
			reEmpty: {
				code: 10,
				msg: "\u518d\u8f93\u4e00\u6b21\u5bc6\u7801"
			},
			reError: {
				code: 11,
				msg: "\u4e24\u6b21\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4"
			},
			reOk: {
				code: 99,
				msg: ""
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.input || !this.tip) {
				return this
			}
			var g = this;
			this.validate(true);
			this.input.on("keyup", function() {
				g.checkPassword()
			}).on(this.on, function() {
				d.later(function() {
					g.checkPassword();
					g.check()
				}, g.timeout, false, g)
			});
			this.defaultOn && (this.input.on(this.defaultOn, function() {
				!g.input.val().length && g.reset()
			}));
			if (!this.reinput || !this.retip) {
				return this
			}
			this.reinput.on(this.on, function() {
				g.checkRePassword();
				g.checkRe()
			});
			this.defaultOn && (this.reinput.on(this.defaultOn, function() {
				!g.reinput.val().length && g.resetRe()
			}));
			return this
		},
		validate: function(h) {
			if (!this.input) {
				this.disabled = false;
				return this.disabled
			}
			var g = arguments,
				h = d.isPlainObject(g[0]) ? g[0] : {
					def: !! g[0],
					async: !! g[1],
					callback: null,
					context: window
				};
			var l = h.def,
				k = h.async,
				m = h.callback,
				j = h.context;
			this.checkPassword();
			this.checkRePassword();
			this.validateCallback(l);
			d.isFunction(m) && m.call(j, this.disabled)
		},
		validateCallback: function(g) {
			if (g && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(g);
			this.checkRe(g);
			!g && this.checkCallback(this.disabled);
			return this.disabled
		},
		check: function(g) {
			if (g && !this.input.val().length) {
				!this.defaultOn && this.reset();
				return
			}
			switch (this.stat.code) {
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
				case 8:
				case 9:
					this.tip.error(this.stat.msg);
					this.input.removeClass(this.errCls);
					d.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tip.ok();
					this.input.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkRe: function(g) {
			if (this.reinput.prop("disabled")) {
				return
			}
			if (g && !this.reinput.val().length) {
				!this.defaultOn && this.resetRe();
				return
			}
			switch (this.restat.code) {
				case 10:
				case 11:
					this.retip.error(this.restat.msg);
					this.reinput.removeClass(this.errCls);
					d.later(function() {
						this.reinput.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 99:
					this.retip.ok();
					this.reinput.removeClass(this.errCls);
				default:
					break
			}
		},
		checkPassword: function() {
			var g = this.password = c(this.input.val());
			if (g.size() == 0) {
				this._disabled = true;
				this.stat = this.statusCode.empty
			} else {
				if (g.isIllegal()) {
					this._disabled = true;
					this.stat = this.statusCode.illegal
				} else {
					if (g.isAllSame()) {
						this._disabled = true;
						this.stat = this.statusCode.same
					} else {
						if (g.isAllLetter()) {
							this._disabled = true;
							this.stat = this.statusCode.allLetter
						} else {
							if (g.isAllNumber()) {
								this._disabled = true;
								this.stat = this.statusCode.allNumber
							} else {
								if (g.size() < 6 && g.size() > 0 || g.size() > 16) {
									this._disabled = true;
									this.stat = this.statusCode.size
								} else {
									this._disabled = false;
									this.stat = this.statusCode.ok;
									if (this.username) {
										var h = f(d.trim(this.username.val()), this.input.val());
										if (h >= 0.8) {
											this._disabled = true;
											this.stat = this.statusCode.similar
										}
									}
								}
							}
						}
					}
				}
			}
			this.checkStrength();
			this.checkReDisabled();
			if (!this._disabled && this.reinput && !! this.reinput.val().length) {
				this.checkRePassword();
				this.checkRe()
			}
			return this
		},
		checkStrength: function() {
			if (!this.input || !this.strength) {
				return
			}
			var h = this.password,
				g = this.strengthCls,
				j = 1;
			var k = h.level();
			if (k >= 6) {
				this.strength.removeClass(g.weak).removeClass(g.medium).addClass(g.strong);
				j = 3
			} else {
				if (k > 2) {
					this.strength.removeClass(g.weak).removeClass(g.strong).addClass(g.medium);
					j = 2
				} else {
					this.strength.removeClass(g.strong).removeClass(g.medium).addClass(g.weak);
					j = 1
				}
			}
			if (!this._disabled && j <= 1) {
				this._disabled = true;
				this.stat = this.statusCode.weak
			}
			if (this.strengthInput) {
				this.strengthInput.val(j)
			}
			this.disabled = this._disabled || this._redisabled;
			return j
		},
		resetTip: function() {
			this.resetReTip();
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
			return this
		},
		reset: function() {
			this.input && this.input.val("") && this.input.removeClass(this.errCls);
			this.resetTip();
			return this
		},
		checkRePassword: function() {
			if (this.reinput.prop("disabled")) {
				return
			}
			if (!this.reinput.val().length) {
				this._redisabled = true;
				this.restat = this.statusCode.reEmpty
			} else {
				if (this.input.val() === this.reinput.val()) {
					this._redisabled = false;
					this.restat = this.statusCode.reOk
				} else {
					this._redisabled = true;
					this.restat = this.statusCode.reError
				}
			}
			this.disabled = this._disabled || this._redisabled;
			return this
		},
		checkReDisabled: function(g) {
			this.reinput && this.reinput.prop("disabled", d.isBoolean(g) ? g : this._disabled);
			this._disabled && this.resetReTip()
		},
		resetReTip: function() {
			if (!this.retip) {
				return this
			}
			if (this._disabled) {
				this.retip.hide()
			} else {
				if (this.redefaultTip && this.redefaultTip.type && this.redefaultTip.msg) {
					this.retip.change(this.redefaultTip.type, this.redefaultTip.msg)
				} else {
					this.retip.hide()
				}
			}
			return this
		},
		resetRe: function() {
			this.reinput && this.reinput.val("") && this.reinput.removeClass(this.errCls);
			this.resetReTip()
		}
	});
	return e
}, {
	requires: ["PasswordCore", "Message", "Similar"]
});
KISSY.add("PhoneCore", function(c) {
	var b = function(d) {
		this.phone = d || ""
	};
	var a = function(d) {
		return new b(d)
	};
	c.augment(b, {
		regex: {
			cm: /^(?:0?1)((?:3[56789]|5[0124789]|8[278])\d|34[0-8]|47\d)\d{7}$/,
			cu: /^(?:0?1)(?:3[012]|4[5]|5[356]|8[356]\d|349)\d{7}$/,
			ce: /^(?:0?1)(?:33|53|8[079])\d{8}$/,
			cn: /^(?:0?1)[3458]\d{9}$/,
			hk: /^(?:0?[1569])(?:\d{7}|\d{8}|\d{12})$/,
			macao: /^6\d{7}$/,
			tw: /^(?:0?[679])(?:\d{7}|\d{8}|\d{10})$/,
			kr: /^(?:0?[17])(?:\d{9}|\d{8})$/,
			jp: /^(?:0?[789])(?:\d{9}|\d{8})$/
		},
		defaultArea: ["cn"],
		check: function(f) {
			if (!this.phone) {
				return
			}
			var f = c.isArray(f) ? f : (c.isString(f) ? [f] : this.defaultArea);
			var d = f.length;
			while (d-- > 0) {
				var e = this.regex[f[d].toLowerCase()];
				if ( !! this.phone.match(e)) {
					return true
				}
			}
			return false
		}
	});
	return a
});
KISSY.add("Phone", function(d, a, c, f) {
	var e = function(g) {
		this.input = g.input && d.one(g.input);
		this.errCls = d.isString(g.errCls) && g.errCls || "";
		this.tipBox = g.tipBox && d.one(g.tipBox);
		this.tip = (g.tip && d.one(g.tip)) ? c(g.tip) : null;
		this.on = g.on || "keyup blur";
		this.defaultTip = g.defaultTip || null;
		this.checkUrl = g.checkUrl || "";
		this.checkData = d.isPlainObject(g.checkData) || d.isFunction(g.checkData) ? g.checkData : {};
		this.checkCallback = d.isFunction(g.checkCallback) ? g.checkCallback : function() {};
		this.checkUseCache = d.isFunction(g.checkUseCache) ? g.checkUseCache : function() {
			return true
		};
		this.timeout = d.isNumber(g.timeout) ? g.timeout : 0;
		this.select = g.select && d.one(g.select);
		this.area = g.area && d.one(g.area);
		this.type = "";
		this.retrieveTrigger = g.retrieveTrigger && d.one(g.retrieveTrigger);
		this.panel = g.panel && d.one(g.panel);
		this._showPanel = !! g.showPanel;
		this.ifrRetrieve = g.ifrRetrieve && d.one(g.ifrRetrieve);
		this._ifrRetrieveUrl = this.ifrRetrieve && this.ifrRetrieve.attr("data-src") || "";
		this.disabledMsg = d.isString(g.disabledMsg) ? g.disabledMsg : "\u624b\u673a\u53f7\u7801\u683c\u5f0f\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this.msgTemplate = d.isObject(g.msgTemplate) ? g.msgTemplate : null;
		this.stat = {
			code: 0,
			msg: ""
		};
		this._validated = false;
		this._retrieving = false;
		this.cache = !! g.cache ? f().init() : null;
		this.code = "";
		this.asyncRetData = null
	};
	var b = function(g) {
		return new e(g)
	};
	d.augment(e, {
		ctype: "CHECKER",
		areaCode: {
			cn: "86",
			hk: "852",
			macao: "853",
			tw: "886",
			kr: "82",
			jp: "81"
		},
		statusCode: {
			netError: {
				code: -1,
				msg: "网络错误"
			},
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "\u624b\u673a\u53f7\u7801\u9519\u8bef"
			},
			ajaxError: {
				code: 3,
				msg: "\u53f7\u7801\u4e0d\u53ef\u7528"
			},
			used: {
				code: 4,
				msg: "\u5df2\u88ab\u5360\u7528\uff0c\u8bf7\u66f4\u6362\u5176\u4ed6\u53f7\u7801\uff0c\u82e5\u60a8\u662f\u6b64\u53f7\u7801\u7684\u4f7f\u7528\u8005"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.input || !this.tip) {
				return this
			}
			this.type = this.getArea();
			var g = this;
			this.input.on(this.on, function() {
				d.later(function() {
					g.validate(false, true)
				}, g.timeout, false, g)
			});
			this.select && this.area && this.select.on("change", function() {
				g.type = g.getArea();
				g.code = g.areaCode[g.type] || "";
				g.area.html("+" + g.code);
				if (g._validated) {
					d.later(function() {
						g.validate(false, true)
					}, this.timeout, false, this)
				}
			}) && this.select.fire("change");
			this._showPanel && this.showPanel();
			this.retrieveTrigger && this.retrieveTrigger.on("click", function() {
				g.togglePanel()
			});
			this.validate(true, true);
			return this
		},
		validate: function(h) {
			if (!this.input) {
				this.disabled = false;
				return this.disabled
			}
			var j = this;
			var g = arguments,
				h = d.isPlainObject(g[0]) ? g[0] : {
					def: !! g[0],
					async: !! g[1],
					callback: null,
					context: window
				};
			var m = h.def,
				l = h.async,
				n = d.isFunction(h.callback) ? h.callback : function() {}, k = h.context;
			this.externalCallback = n;
			if (this.ajaxing) {
				if (this._getFullNumber() === this.ajaxingValue) {
					return
				} else {
					this.io && this.io.abort && this.io.abort()
				}
			}
			this.checkAble(function(o) {
				j.ajaxing = false;
				j.ajaxingValue = "";
				j.validateCallback(m);
				j.externalCallback.call(this, o)
			}, l, k)
		},
		validateCallback: function(g) {
			if (g && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(g);
			this.checkCallback(this.disabled, this.asyncRetData, g);
			return this.disabled
		},
		check: function(g) {
			if (g && !d.trim(this.input.val())) {
				this.resetTip();
				return
			}
			this._validated = true;
			switch (this.stat.code) {
				case -1:
				case 1:
				case 2:
				case 3:
					this.showTipBox({
						type: "error",
						msg: {
							content: this.stat.msg
						}
					});
					break;
				case 100:
					this.showTipBox({
						type: "ok"
					});
					break;
				default:
					break
			}
		},
		checkAble: function(m, k, j) {
			var h = this,
				l, g;
			var j = j || h,
				k = !! k,
				m = d.isFunction(m) && m || function() {};
			h.asyncRetData = null;
			if (this.isEmpty()) {
				this.disabled = true;
				this.stat = this.statusCode.empty;
				m.call(j, h.disabled)
			} else {
				if (!h.cache || h.cache.getIndex("value", h._getFullNumber()) == -1) {
					if (a(d.trim(this.input.val())).check(this.type)) {
						this.disabled = false;
						this.stat = this.statusCode.ok
					} else {
						this.disabled = true;
						this.stat = this.statusCode.formatError
					}
					if (!h.checkUrl || h.disabled || !k) {
						if (h.cache) {
							g = h._updateCache();
							h.cache.set(g, "value")
						}
						m.call(j, h.disabled);
						return
					}
					this.ajaxing = true;
					this.ajaxingValue = this._getFullNumber();
					this.io = d.io({
						url: h.checkUrl,
						data: d.mix(d.isFunction(h.checkData) ? h.checkData() : h.checkData, {
							mobile_area: h.select.val(),
							mobile: d.trim(h.input.val())
						}),
						type: "post",
						dataType: "json",
						complete: function(n) {
							h.asyncRetData = n;
							if (n) {
								var o = n.msg || n.reason || "";
								o = h.msgTemplate ? h.msgTemplate[o] || o : o;
								if (n.success) {
									h.disabled = false;
									h.stat = {
										code: h.statusCode.ok.code,
										msg: o || h.statusCode.ok.msg
									}
								} else {
									h.disabled = true;
									h.stat = {
										code: h.statusCode.ajaxError.code,
										msg: o || h.statusCode.ajaxError.msg
									}
								}
								if (h.cache) {
									g = h._updateCache();
									checkCache = h.checkUseCache(h.disabled, h.asyncRetData);
									if (checkCache) {
										h.cache.set(g, "value")
									} else {
										h.cache.del("value", g.value)
									}
								}
							} else {
								h.stat = {
									code: h.statusCode.netError.code,
									msg: h.statusCode.netError.msg,
									value: d.trim(h.input.val())
								}
							}
							m.call(j, h.disabled)
						}
					})
				} else {
					g = h.cache.get("value", this._getFullNumber());
					h.disabled = g.disabled;
					h.stat = g.stat;
					h.asyncRetData = g.data;
					m.call(j, h.disabled)
				}
			}
		},
		_updateCache: function() {
			return {
				value: this._getFullNumber(),
				disabled: this.disabled,
				data: this.asyncRetData,
				stat: this.stat
			}
		},
		_getFullNumber: function() {
			return (this.select ? this.select.val() + "-" : "") + d.trim(this.input.val())
		},
		getArea: function() {
			var g;
			if (!this.select) {
				g = "cn";
				return g
			}
			switch (this.select.val()) {
				case "1":
					g = "cn";
					break;
				case "2":
					g = "hk";
					break;
				case "3":
					g = "macao";
					break;
				case "4":
					g = "tw";
					break;
				case "5":
					g = "kr";
					break;
				case "6":
					g = "jp";
					break;
				default:
					break
			}
			return g
		},
		showPanel: function() {
			this.panel.show();
			this.retrieveTrigger.html("\u53d6\u6d88\u7533\u8bf7 \u25b2");
			this._retrieving = true;
			this.select.prop("disabled", true);
			this.input.prop("disabled", true);
			this._ifrRetrieveUrl && this.ifrRetrieve.attr("src", this._ifrRetrieveUrl)
		},
		hidePanel: function() {
			this.panel.hide();
			this.retrieveTrigger.html("\u7533\u8bf7\u7ed1\u5b9a\u6b64\u53f7\u7801 \u25bc");
			this._retrieving = false;
			this.select.prop("disabled", false);
			this.input.prop("disabled", false);
			this._ifrRetrieveUrl && this.ifrRetrieve.attr("src", "about:blank")
		},
		togglePanel: function() {
			this._retrieving ? this.hidePanel() : this.showPanel()
		},
		isEmpty: function() {
			return !d.trim(this.input.val()).length
		},
		showTipBox: function(g) {
			this.tipBox && this.tipBox.removeClass("hide").addClass("show");
			this.retrieveTrigger && this.retrieveTrigger.hide();
			if (!d.isPlainObject(g)) {
				return
			}
			switch (g.type.toLowerCase()) {
				case "error":
					this.tip.error(g.msg || "");
					this.input.removeClass(this.errCls);
					d.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case "tips":
					this.tip.tips(g.msg || "");
					break;
				case "attention":
					this.tip.attention(g.msg || "");
					break;
				case "ok":
					this.tip.ok(g.msg || "");
					this.input.removeClass(this.errCls);
					break;
				case "stop":
					this.tip.stop(g.msg || "");
					break;
				case "notice":
					this.tip.notice(g.msg || "");
					break;
				case "question":
					this.tip.question(g.msg || "");
					break;
				case "retrieve":
					this.tip.error(g.msg || "\u5df2\u88ab\u5360\u7528\uff0c\u8bf7\u66f4\u6362\u5176\u4ed6\u53f7\u7801\uff0c\u82e5\u60a8\u662f\u6b64\u53f7\u7801\u7684\u4f7f\u7528\u8005");
					this.retrieveTrigger && this.retrieveTrigger.show();
					break;
				default:
					break
			}
		},
		hideTipBox: function() {
			this.tipBox && this.tipBox.removeClass("show").addClass("hide");
			this.tip.hide();
			this.input.removeClass(this.errCls)
		},
		reset: function() {
			this.input && this.input.val("") && this.input.removeClass(this.errCls);
			this.resetTip();
			return this
		},
		resetTip: function() {
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
		}
	});
	return b
}, {
	requires: ["PhoneCore", "Message", "Cache"]
});
KISSY.add("EmailSuggest", function(b) {
	var a = function(d) {
		this.input = d.input && b.one(d.input) || null;
		this.host = b.isString(d.host) && [d.host] || b.isArray(d.host) && d.host || null;
		this.list = null;
		this.lis = null;
		this.current = -1;
		this.length = this.host && this.host.length || 0;
		this.events = {};
		this.ing = false
	};
	var c = function(d) {
		return new a(d)
	};
	b.augment(a, {
		suggest: null,
		bound: false,
		laterId: 0,
		init: function() {
			if (!this.input || !this.host) {
				return this
			}
			var d = this;
			this.input.on("focus", function() {
				d.show()
			}).on("keyup", function(e) {
				var f = e.keyCode;
				if (f != 13 && f != 40 && f != 38) {
					d.update();
					d.bind()
				} else {
					if (f == 38 && d.ing) {
						d.select(-1)
					} else {
						if (f == 40 && d.ing) {
							d.select(1)
						} else {
							if (f == 13 && d.ing) {
								d.complete()
							}
						}
					}
				}
			}).on("blur", function() {
				d.complete()
			});
			b.one(window).on("resize", function() {
				d.fix()
			});
			return this
		},
		show: function() {
			this.suggest || this.create();
			this.input.parent().append(this.suggest);
			this.fix();
			this.ing = true;
			if (!b.trim(this.input.val())) {
				this.hide()
			} else {
				this.update()
			}
		},
		hide: function() {
			this.suggest.hide();
			this.lis && this.lis.length && this.lis.item(this.current).removeClass("current");
			this.current = -1;
			this.ing = false;
			this.events.hide && this.events.hide()
		},
		complete: function() {
			if (!this.lis || !this.lis.length) {
				return
			}
			this.input.val(this.lis.item(this.current).text());
			this.hide();
			this.events.complete && this.events.complete(this.input.val())
		},
		bind: function() {
			if (!this.lis || !this.lis.length) {
				return
			}
			var d = this;
			this.lis.on("mouseover", function() {
				d.lis.item(d.current).removeClass("current");
				d.current = parseInt(b.DOM.attr(this, "data-index"));
				d.lis.item(d.current).addClass("current")
			})
		},
		create: function() {
			this.suggest = b.one(b.DOM.create("<div>", {
				"class": "nomad-email-suggest"
			}));
			this.suggest.append('<span class="nomad-email-suggest-title">\u8bf7\u9009\u62e9</span><ul></li>')
		},
		update: function() {
			if (this.input.val().indexOf("@") > -1 || !b.trim(this.input.val())) {
				this.hide();
				return
			}
			if (!this.list) {
				this.list = this.suggest.one("ul")
			}
			var j = this.lis || this.list.all("li");
			var g = j.length && j || "",
				f = b.trim(this.input.val());
			var e = this;
			if (!g) {
				for (var h = 0, d = this.host.length; h < d; h++) {
					g += '<li data-index="' + h + '">' + f + "@" + this.host[h] + "</li>"
				}
				this.list.html(g)
			} else {
				for (var h = 0, d = this.host.length; h < d; h++) {
					g.item(h).html(f + "@" + e.host[h])
				}
			}
			this.lis = this.lis || this.suggest.all("li");
			this.suggest.show();
			this.ing = true
		},
		fix: function() {
			var d = this.input.offset();
			this.suggest && this.suggest.css({
				position: "absolute",
				left: d.left,
				top: d.top + this.input[0].clientHeight,
				minWidth: this.input[0].clientWidth
			});
			if (b.UA.ie <= 6) {
				this.suggest.css("width", this.input[0].clientWidth)
			}
		},
		select: function(e) {
			if (!this.lis || !this.lis.length) {
				return
			}
			if (this.current >= 0) {
				this.lis.item(this.current).removeClass("current")
			}
			if (e > 0) {
				this.current = this.current + 1 >= this.length ? 0 : this.current + 1
			} else {
				if (e < 0) {
					this.current = this.current - 1 < 0 ? this.length - 1 : this.current - 1
				}
			}
			this.lis.item(this.current).addClass("current")
		},
		on: function(d, e) {
			if (!b.isString(d) || !b.isFunction(e)) {
				return this
			}
			switch (d.toLowerCase()) {
				case "hide":
					this.events.hide = e;
					break;
				case "complete":
					this.events.complete = e;
					break;
				default:
					break
			}
			return this
		}
	});
	return c
});
KISSY.add("Email", function(d, a, c, e) {
	var f = function(g) {
		this.input = g.input && d.one(g.input);
		this.errCls = d.isString(g.errCls) && g.errCls || "";
		this.tip = g.tip && d.one(g.tip) && a(g.tip);
		this.on = g.on || "keydown blur";
		this.checkUrl = g.checkUrl || "";
		this.checkData = d.isPlainObject(g.checkData) && g.checkData || {};
		this.checkCallback = d.isFunction(g.checkCallback) ? g.checkCallback : function() {};
		this.checkUseCache = d.isFunction(g.checkUseCache) ? g.checkUseCache : function() {
			return true
		};
		this.suggest = !! g.suggest;
		this.host = g.host || "";
		this.timeout = d.isNumber(g.timeout) ? g.timeout : 0;
		this.defaultTip = g.defaultTip || null;
		this.defaultOn = g.defaultOn || "";
		this.msgTemplate = d.isObject(g.msgTemplate) ? g.msgTemplate : null;
		this.disabledMsg = d.isString(g.disabledMsg) ? g.disabledMsg : "\u8f93\u5165\u683c\u5f0f\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.disabled = true;
		this.checked = false;
		this._suggest = null;
		this.stat = {
			code: 0,
			msg: ""
		};
		this.cache = !! g.cache ? e().init() : null;
		this.asyncRetData = null
	};
	var b = function(g) {
		return new f(g)
	};
	d.augment(f, {
		ctype: "CHECKER",
		pattern: /^[a-zA-Z\d][-\.\w]*@(?:[-\w]+\.)+(?:[a-zA-Z])+$/,
		statusCode: {
			netError: {
				code: -1,
				msg: "网络错误"
			},
			empty: {
				code: 1,
				msg: "不能为空"
			},
			formatError: {
				code: 2,
				msg: "\u683c\u5f0f\u9519\u8bef"
			},
			ajaxError: {
				code: 3,
				msg: "\u8f93\u5165\u9519\u8bef"
			},
			ok: {
				code: 100,
				msg: ""
			}
		},
		init: function() {
			if (!this.input || !this.tip || !this.pattern) {
				return this
			}
			var g = this;
			this.input.on(this.on, function() {
				d.later(function() {
					if (!g._suggest || !g._suggest.ing) {
						g.validate(false, true);
						g._inputValidated = true
					} else {
						g._inputValidated = false
					}
				}, g.timeout, false, g)
			});
			this.defaultOn && (this.input.on(this.defaultOn, function() {
				!d.trim(g.input.val()) && g.reset()
			}));
			if (this.suggest) {
				this._suggest = c({
					input: this.input,
					host: this.host
				}).init().on("complete", function() {
					if (!g._inputValidated) {
						g.validate(false, true)
					}
				})
			}
			this.validate(true, true);
			return this
		},
		validate: function(m) {
			if (!this.input) {
				this.disabled = false;
				return this.disabled
			}
			if (this.suggest && this._suggest && this._suggest.ing) {
				this.disabled = true;
				return this.disabled
			}
			var j = this;
			var g = arguments,
				h = d.isPlainObject(g[0]) ? g[0] : {
					def: !! g[0],
					async: !! g[1],
					callback: null,
					context: window
				}, m = h.def,
				l = h.async,
				n = d.isFunction(h.callback) ? h.callback : function() {}, k = h.context;
			this.externalCallback = n;
			if (this.ajaxing) {
				if (d.trim(this.input.val()) === this.ajaxingValue) {
					return
				} else {
					this.io && this.io.abort && this.io.abort()
				}
			}
			this.checkAble(function(o) {
				j.ajaxing = false;
				j.ajaxingValue = "";
				j.validateCallback(m);
				j.externalCallback.call(this, o)
			}, l, k)
		},
		validateCallback: function(g) {
			if (g && this.tip.type.toLowerCase() == "error" && !this.tip.isHide()) {
				return this.disabled
			}
			this.check(g);
			this.checkCallback(this.disabled, this.asyncRetData, g);
			return this.disabled
		},
		check: function(g) {
			if (g && !d.trim(this.input.val())) {
				!this.defaultOn && this.reset();
				return
			}
			switch (this.stat.code) {
				case -1:
				case 1:
				case 2:
				case 3:
					this.tip.error(this.stat.msg);
					this.input.removeClass(this.errCls);
					d.later(function() {
						this.input.addClass(this.errCls)
					}, 1, false, this);
					break;
				case 100:
					this.tip.ok();
					this.input.removeClass(this.errCls);
					break;
				default:
					break
			}
		},
		checkAble: function(n, k, j) {
			var h = this,
				l, g, j = j || this,
				k = !! k,
				n = d.isFunction(n) && n || function() {}, m = d.trim(this.input.val());
			if (!m.length) {
				this.disabled = true;
				this.stat = this.statusCode.empty;
				n.call(j, this.disabled);
				return
			} else {
				if (!this.cache || this.cache.getIndex("value", m) == -1) {
					if (m.match(this.pattern)) {
						this.disabled = false;
						this.stat = this.statusCode.ok
					} else {
						this.disabled = true;
						this.stat = this.statusCode.formatError
					}
					if (!this.checkUrl || this.disabled || !k) {
						if (this.cache) {
							g = this._updateCache();
							this.cache.set(g, "value")
						}
						this.asyncRetData = null;
						n.call(j, this.disabled);
						return
					}
					this.ajaxing = true;
					this.ajaxingValue = m;
					this.io = d.io({
						url: this.checkUrl,
						data: d.mix(this.checkData, {
							email: m
						}),
						type: "post",
						dataType: "json",
						complete: function(o) {
							h.asyncRetData = o;
							if (o) {
								var p = o.msg || o.reason || "";
								p = h.msgTemplate ? h.msgTemplate[p] || p : p;
								if (o.success) {
									h.disabled = false;
									h.stat = {
										code: h.statusCode.ok.code,
										msg: p || ""
									}
								} else {
									h.disabled = true;
									h.stat = {
										code: h.statusCode.ajaxError.code,
										msg: p || h.statusCode.ajaxError.msg
									}
								}
								if (h.cache) {
									g = h._updateCache();
									checkCache = h.checkUseCache(h.disabled, h.asyncRetData);
									if (checkCache) {
										h.cache.set(g, "value")
									} else {
										h.cache.del("value", g.value)
									}
								}
							} else {
								h.stat = {
									code: h.statusCode.netError.code,
									msg: h.statusCode.netError.msg,
									value: d.trim(h.input.val())
								}
							}
							n.call(j, h.disabled)
						}
					})
				} else {
					g = this.cache.get("value", m);
					this.disabled = g.disabled;
					this.stat = g.stat;
					this.asyncRetData = g.data;
					n.call(j, this.disabled)
				}
			}
		},
		_updateCache: function() {
			return {
				value: d.trim(this.input.val()),
				disabled: this.disabled,
				data: this.asyncRetData,
				stat: this.stat
			}
		},
		reset: function() {
			this.input && this.input.val("") && this.input.removeClass(this.errCls);
			this.resetTip();
			return this
		},
		resetTip: function() {
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
			return this
		}
	});
	return b
}, {
	requires: ["Message", "EmailSuggest", "Cache"]
});
KISSY.add("Email2Web", function(a) {
	var b = function(d) {
		this.email = d || ""
	};
	var c = function(d) {
		return new b(d)
	};
	a.augment(b, {
		loginUrls: {
			"gmail.com": "https://mail.google.com/",
			"live.com": "http://mail.live.com/",
			"live.cn": "http://mail.live.com/",
			"126.com": "http://www.126.com/",
			"163.com": "http://mail.163.com/",
			"163.net": "http://mail.163.net/",
			"188.com": "http://mail.188.com/",
			"sina.com": "http://mail.sina.com.cn/",
			"hotmail.com": "http://www.hotmail.com/",
			"yahoo.com.cn": "http://mail.cn.yahoo.com/",
			"yahoo.cn": "http://mail.cn.yahoo.com/",
			"sohu.com": "http://mail.sohu.com/",
			"21cn.com": "http://mail.21cn.com/",
			"eyou.com": "http://www.eyou.com/",
			"sina.com.cn": "http://mail.sina.com.cn/",
			"qq.com": "http://mail.qq.com/",
			"tom.com": "http://mail.tom.com/",
			"sogou.com": "http://mail.sogou.com/",
			"aol.com": "http://mail.aol.com/"
		},
		regexp: /[^@]+@(.+\.\w+)$/,
		getUrl: function(d) {
			this.email = !! d && d || "";
			if (!this.email) {
				return ""
			}
			var e = this.email.replace(this.regexp, "$1");
			return e && this.loginUrls[e] || ""
		}
	});
	return c
});
KISSY.add("SubmitForm", function(b, a) {
	var d = function(e) {
		this.form = e.form && b.one(e.form);
		this.off = !! e.off;
		this.tip = e.tip && b.one(e.tip) ? a(e.tip) : null;
		this.stopTip = !! e.stopTip;
		this.asyncURL = b.isString(e.asyncURL) ? e.asyncURL : "";
		this.async = !! e.asyncURL;
		this.asyncType = b.isString(e.asyncType) ? e.asyncType : "post";
		this.asyncDataType = b.isString(e.asyncDataType) ? e.asyncDataType : "";
		this.asyncExternalData = b.isFunction(e.asyncExternalData) || b.isPlainObject(e.asyncExternalData) ? e.asyncExternalData : {};
		this.trigger = e.trigger ? b.one(e.trigger) : null;
		this.stop = b.isBoolean(e.stop) && e.stop || true;
		this.checkers = b.isArray(e.checkers) && e.checkers || (b.isFunction(e.checkers) ? e.checkers : []);
		this.disabledMsg = b.isString(e.disabledMsg) ? e.disabledMsg : "\u4fe1\u606f\u8f93\u5165\u6709\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01";
		this.checkCallback = b.isFunction(e.checkCallback) ? e.checkCallback : null;
		this.asyncCallback = b.isFunction(e.asyncCallback) ? e.asyncCallback : null;
		this.checkerDisabledMsg = "";
		this.disabled = false
	};
	var c = function(e) {
		return new d(e)
	};
	b.augment(d, {
		init: function() {
			if (!this.form) {
				return
			}
			var e = this;
			if (this.trigger) {
				this.trigger.on("click", function() {
					e.validate()
				})
			}
			if (!e.off) {
				this.form.on("submit", function(f) {
					f.halt();
					e.validate()
				})
			}
			return this
		},
		validateCallback: function() {
			var e = this;
			if (e.disabled && e.stop && !e.stopTip) {
				e.tip && e.tip.error(e.checkerDisabledMsg || e.disabledMsg).laterHide(2000);
				return
			}
			if (e.checkCallback) {
				e.checkCallback(e.disabled);
				return
			}
			if (e.disabled && this.stop) {
				return
			}
			if (e.async && e.asyncURL) {
				var f = b.isFunction(e.asyncExternalData) ? e.asyncExternalData() : e.asyncExternalData;
				b.io({
					url: e.asyncURL,
					type: e.asyncType,
					data: b.mix(b.unparam(b.io.serialize(e.form)), f),
					dataType: e.asyncDataType,
					complete: function(h, g, j) {
						e.asyncCallback.call(e, h, g, j)
					}
				})
			} else {
				this.form[0].submit()
			}
		},
		validate: function() {
			this.disabled = false;
			var e = b.isFunction(this.checkers) ? this.checkers() : this.checkers;
			if (!e.length) {
				return
			}
			this.validateIndex = 0;
			this.checkers = e;
			if (b.isFunction(e[this.validateIndex].validate)) {
				b.isFunction(e[0].validate) && e[0].validate({
					async: true,
					callback: this._check,
					context: this
				})
			}
		},
		_check: function(e) {
			if (e) {
				this.disabled = true;
				if (this.checkers[this.validateIndex].disabledMsg) {
					this.checkerDisabledMsg = this.checkers[this.validateIndex].disabledMsg
				}
				this.validateCallback();
				return
			} else {
				if (this.checkers[++this.validateIndex] && b.isFunction(this.checkers[this.validateIndex].validate)) {
					this.checkers[this.validateIndex].validate({
						async: true,
						callback: this._check,
						context: this
					})
				} else {
					this.validateCallback()
				}
			}
		},
		resetTip: function() {
			if (!this.tip) {
				return this
			}
			if (this.defaultTip && this.defaultTip.type && this.defaultTip.msg) {
				this.tip.change(this.defaultTip.type, this.defaultTip.msg)
			} else {
				this.tip.hide()
			}
			return this
		},
		reset: function() {
			this.disabled = false;
			this.resetTip();
			return this
		}
	});
	return c
}, {
	requires: ["Message"]
});
KISSY.add("ATP", function(b) {
	var a = {
		fire: function(c, e) {
			var c = b.isString(c) ? c : "";
			if (!c) {
				return
			}
			var d = new Image(),
				e = !b.isPlainObject(e) && !b.isString(e) ? "" : (b.isPlainObject(e) ? b.param(e) : e);
			d.src = c + (c.indexOf("?") >= 0 ? "&" : "?") + e
		}
	};
	return a
});
KISSY.add("Agreement", function(a) {
	var b = function(c) {
		if (!(this instanceof b)) {
			return new b(c)
		}
		this.trigger = a.one(c.trigger);
		this.container = a.one(c.container);
		this.id = a.isString(c.id) ? c.id : "";
		this.url = a.isString(c.url) ? c.url : "";
		this.link = a.isString(c.link) ? c.link : "";
		this.getting = false;
		this.html = "";
		this.timestamp = a.isString(c.timestamp) ? c.timestamp : "";
		this.url += this.url.indexOf("?") >= 0 ? "&_=" + this.timestamp : "?_=" + this.timestamp
	};
	a.augment(b, {
		init: function() {
			if (!this.trigger || !this.url || !this.container) {
				return this
			}
			var c = this;
			this.trigger.on("click", function(d) {
				d.halt();
				if (c.container.data("trigger-id") !== c.trigger.attr("id")) {
					c.container.data("trigger-id", c.trigger.attr("id"));
					c.container.show()
				} else {
					if (!c.html) {
						c.container.show()
					} else {
						c.container.toggle()
					}
				}
				if (c.getting) {
					return
				}
				if (!c.html && c.supportLocalStorage && !c.checkStorageExpires()) {
					c.html = window.localStorage.getItem("agreement" + c.id)
				}
				if (c.html) {
					c.set()
				} else {
					c.get()
				}
			})
		},
		get: function() {
			var c = this;
			if (c.getting) {
				return
			}
			c.getting = true;
			a.io({
				url: c.url,
				type: "post",
				dataType: "text",
				success: function(d) {
					c.html = d;
					c.set();
					c.getting = false
				},
				error: function() {
					c.link && window.open(c.link, "");
					c.getting = false
				}
			})
		},
		set: function() {
			this.container.html(this.html);
			this.setLocalStorage()
		},
		supportLocalStorage: (function() {
			var c = window.localStorage;
			if (c && c.setItem && c.getItem) {
				return true
			}
			return false
		})(),
		setLocalStorage: function() {
			if (!this.supportLocalStorage) {
				return
			}
			window.localStorage.setItem("agreement" + this.id, this.html);
			this.timestamp && window.localStorage.setItem("agreementTimestamp" + this.id, this.timestamp)
		},
		checkStorageExpires: function() {
			if (!this.timestamp) {
				return false
			}
			var c = window.localStorage.getItem("agreementTimestamp" + this.id);
			return this.timestamp !== c
		}
	});
	return b
});
KISSY.add("Tip", function(b) {
	var a = function(c) {
		if (!(this instanceof a)) {
			return new a(c)
		}
		this.tip = c.tip && b.one(c.tip);
		this.offset = b.isPlainObject(c.offset) ? c.offset : {
			x: 0,
			y: 0
		};
		this.offsetX = this.offset.x;
		this.offsetY = this.offset.y;
		this.refer = c.refer && b.one(c.refer);
		this.trigger = c.trigger && b.one(c.trigger);
		this.on = c.on || "mouseover"
	};
	b.augment(a, {
		init: function() {
			if (!this.tip || !this.trigger) {
				return this
			}
			this.tip.css({
				position: "absolute"
			});
			var c = this;
			this.trigger.on(this.on, function(d) {
				c.show(d)
			}).on("mouseout", function() {
				c.hide()
			})
		},
		show: function(c) {
			this.tip.css({
				left: (this.refer ? this.refer.offset().left : c.pageX) + this.offsetX,
				top: (this.refer ? this.refer.offset().top : c.pageY) + this.offsetY
			}).show()
		},
		hide: function() {
			this.tip.hide()
		}
	});
	return a
});
KISSY.add("AlipayAgreement", function(b) {
	var a = function(c) {
		if (!(this instanceof a)) {
			return new a(c)
		}
		this.checkbox = c.checkbox && b.one(c.checkbox);
		this.defaultChecked = !! c.defaultChecked;
		this.checkedContent = c.checkedContent && b.one(c.checkedContent);
		this.uncheckedContent = c.uncheckedContent && b.one(c.uncheckedContent)
	};
	b.augment(a, {
		init: function() {
			if (!this.checkbox) {
				return this
			}
			var c = this;
			this.checkbox.prop("checked", this.defaultChecked);
			this.updateContent();
			this.checkbox.on("click", function() {
				c.updateContent()
			})
		},
		updateContent: function() {
			if (this.checkbox.prop("checked")) {
				this.checkedContent && this.checkedContent.show();
				this.uncheckedContent && this.uncheckedContent.hide()
			} else {
				this.checkedContent && this.checkedContent.hide();
				this.uncheckedContent && this.uncheckedContent.show()
			}
		}
	});
	return a
});
window.TRegister = window.TRegister || {};
window.TRegister.common = {
	pickDocumentDomain: function() {
		var a = arguments[1] || location.hostname;
		var b = a.split("."),
			d = b.length;
		var c = arguments[0] || (d < 3 ? 0 : 1);
		if (c >= d || d - c < 2) {
			c = d - 2
		}
		return b.slice(c).join(".")
	}
};
window.D = window.D || {
	get: function(a) {
		return document.getElementById(a)
	}
};
KISSY.ready(function(a) {
	(function() {
		var f = a.unparam(window.self.location.search.slice(1)).css_style || "",
			e = a.one(".J_From") && a.one(".J_From").val() || "",
			d = f === "b2b" || e === "b2b",
			b = f === "tmall" || e === "tmall",
			c = f === "hitao" || e === "hitao";
		if (!d && !b && !c && window.self != window.top) {
			window.top.location.href = window.self.location.href
		}
	})()
});