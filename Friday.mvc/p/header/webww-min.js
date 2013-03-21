﻿KISSY.add("cookie", function(a) {
	var e = document,
		c = encodeURIComponent,
		d = decodeURIComponent;
	a.Cookie = {
		get: function(h) {
			var g, f;
			if (b(h)) {
				if ((f = e.cookie.match("(?:^| )" + h + "(?:(?:=([^;]*))|;|$)"))) {
					g = f[1] ? d(f[1]) : ""
				}
			}
			return g
		},
		set: function(h, n, f, j, l, k) {
			var m = c(n),
				g = f;
			if (typeof g === "number") {
				g = new Date();
				g.setTime(g.getTime() + f * 86400000)
			}
			if (g instanceof Date) {
				m += "; expires=" + g.toUTCString()
			}
			if (b(j)) {
				m += "; domain=" + j
			}
			if (b(l)) {
				m += "; path=" + l
			}
			if (k) {
				m += "; secure"
			}
			e.cookie = h + "=" + m
		},
		remove: function(f) {
			this.set(f, "", 0)
		}
	};

	function b(f) {
		return typeof f === "string" && f !== ""
	}
});
KISSY.add("ajax", function(a) {
	var c = document,
		b = a.UA;
	a.Ajax = {
		request: function() {
			a.error("not implemented")
		},
		getScript: function(d, h, g) {
			var e = c.getElementsByTagName("head")[0] || c.documentElement,
				f = c.createElement("script");
			f.src = d;
			if (g) {
				f.charset = g
			}
			f.async = true;
			if (a.isFunction(h)) {
				if (b.ie) {
					f.onreadystatechange = function() {
						var j = f.readyState;
						if (j === "loaded" || j === "complete") {
							f.onreadystatechange = null;
							h()
						}
					}
				} else {
					f.onload = h
				}
			}
			e.appendChild(f)
		}
	}
});
(function() {
	var a = KISSY;
	a.use("cookie,ajax", function(k, c, q) {
		var B = k.DOM,
			G = k.Event,
			c = k.Cookie,
			D = k.UA,
			y = k.IO,
			J = window,
			l = document,
			h = encodeURIComponent,
			d = decodeURIComponent,
			Q = k.now(),
			I = unescape((c.get("_nk_") || "").replace(/\\u/g, "%u")),
			f = "x",
			M = J.navigator.userAgent,
			u, w = ((/Windows NT 6.2/g).test(M)),
			n = D.ie,
			p = ((/tablet/i).test(M)),
			A = J.g_config || {}, L = "J_WangWang",
			H = 1,
			E = 0,
			N = (function() {
				var R = location.hostname,
					S;
				if (R.indexOf("tmall.com") > -1) {
					S = "tmall.com";
					f = "otherx"
				} else {
					if (R.indexOf("daily.tmall.net") > 0) {
						S = "daily.tmall.net";
						f = "otherx"
					} else {
						if (R.indexOf("taobao.net") > 0) {
							S = "taobao.net"
						} else {
							S = "taobao.com"
						}
					}
				}
				return S
			})(),
			K = /daily/i,
			s = !(K.test(location.host)),
			x = (function() {
				if (s) {
					return "taobao.com"
				} else {
					return "daily.taobao.net"
				}
			})(),
			b = function() {
				return (c.get("_l_g_") ? true : false)
			}, O = 6,
			g = (J.g_config || 0).appId === 6,
			P = "http://www.taobao.com/webww/?ver=1&",
			t = "http://amos.alicdn.com/getcid.aw",
			e = "http://amos.alicdn.com/muliuserstatus.aw?beginnum=0&site=cntaobao&charset=utf-8&uids=",
			o = "http://amos.alicdn.com/getRealCid.aw?fromId=cntaobao" + h(I) + "&toId=",
			j = "http://www.atpanel.com/ww?cache=" + Q,
			v = {
				SNS: "\u6211\u5728\u7ebf\uff0c\u548c\u6211\u804a\u804a\u5427~",
				DEFAULT: "\u70b9\u6b64\u53ef\u4ee5\u76f4\u63a5\u548c\u5356\u5bb6\u4ea4\u6d41\u9009\u597d\u7684\u5b9d\u8d1d\uff0c\u6216\u76f8\u4e92\u4ea4\u6d41\u7f51\u8d2d\u4f53\u9a8c\uff0c\u8fd8\u652f\u6301\u8bed\u97f3\u89c6\u9891\u5662\u3002"
			}, r = ["ie", "firefox", "chrome", "safari", "opera"],
			F = location.hostname.indexOf("tmall"),
			z = [1, 2, 10, 8, 12, 12, 12],
			m = {
				addonIsOK: function() {
					if (!k.isBoolean(u)) {
						u = this._checkWangWangInstalled()
					}
					if (location.href.indexOf("topen") > -1) {
						return false
					}
					return u
				},
				data: {},
				lightedUsers: [],
				init: function() {
					var R = this;
					B.addStyleSheet(".ww-light{overflow:hidden;}.ww-block{display:block;margin-top:3px;}.ww-inline{display:inline-block;vertical-align:text-bottom;}.ww-light a{background:url(http://img04.taobaocdn.com/tps/i4/T1UPFAXnNfXXXXXXXX-130-60.gif) no-repeat 0 0;text-decoration:none!important;width:20px;height:20px;zoom:1;}.ww-large a{width:67px;}a.ww-offline{background-position:0 -20px;}a.ww-mobile{background-position:0 -40px;}.ww-small .ww-online{background-position:-80px 0;}.ww-small .ww-offline{background-position:-80px -20px;}.ww-small .ww-mobile{background-position:-80px -40px;}.ww-static .ww-online{background-position:-110px 0;}.ww-static .ww-offline{background-position:-110px -20px;}.ww-static .ww-mobile{background-position:-110px -40px;}.ww-light a span{display:none;}");
					R.light();
					for (var S = 0, T = r.length; S < T; ++S) {
						if (k.UA[r[S]]) {
							E = r[S] + k.UA[r[S]];
							break
						}
					}
				},
				initStart: function() {
					var R = this;
					if (g) {
						return
					}
					var S = k.unparam(location.search.substring(1));
					if ((("g_config" in J) && ("appId" in J.g_config) && J.g_config["appId"] != -1) || "tstart" in S || "tdog" in S) {
						k.ready(function() {
							var V = function(ae, af) {
								af = af || location.hostname;
								var ag = ".",
									ad = af.split(ag),
									ac = ad.length;
								if (ac <= 2) {
									return af
								}
								ae = ae || 1;
								if (ae > ac - 2) {
									ae = ac - 2
								}
								return ad.slice(ae).join(ag)
							};
							var Y = l.getElementsByTagName("head")[0] || l.documentElement,
								X = l.createElement("link"),
								Z = l.createElement("script"),
								W = V(2),
								U = /daily/i,
								T = !(U.test(location.host)),
								aa = T ? "a.tbcdn.cn" : "assets.daily.taobao.net",
								ab = "http://" + aa + "/p/header/adapter-min.js?t=" + Math.floor(new Date().getTime() / (1000 * 3600));
							if (W == "etao.com") {
								return
							}
							Z.src = ab;
							Y.insertBefore(Z, Y.firstChild);
							if (!R.addonIsOK() && J.g_config["toolbar"] && J.g_config["toolbar"]["delay"] && parseInt(J.g_config["toolbar"]["delay"]) > 3) {
								J.g_config["toolbar"]["delay"] = 3
							}
						})
					}
				},
				light: function(ae) {
					ae = k.get(ae) || l.body;
					var ah = this,
						af = k.query("." + L, ae),
						al = af.length;
					if (al === 0) {
						return
					}
					var am = [],
						Z = [],
						an, ai, ak;
					for (ak = 0; ak < al; ++ak) {
						ai = ah._getParamsFromData(af[ak]);
						am.push(ai);
						an = ai.nick;
						Z.push(h(an))
					}
					var X = 100,
						S = 1800,
						T = [],
						R = [],
						ad = [],
						ab = "",
						ag, aa = 0,
						ac = 0,
						W;
					for (ag = 0; ag < al; ++ag) {
						if (U(ab + Z[ag]) || ag >= X || ag === al - 1) {
							W = (ag === al - 1) ? al : ag;
							R[ac] = Z.slice(aa, W);
							T[ac] = af.slice(aa, W);
							ad[ac] = am.slice(aa, W);
							ab = "";
							aa = ag;
							ac++
						}
						ab += Z[ag] + ";"
					}
					V(0);
					var aj = 0;

					function V(ao) {
						Y(R[ao], T[ao], ad[ao], function() {
							aj++;
							if (aj < ac) {
								V(++ao)
							}
						})
					}
					function U(ao) {
						return n && (ao.length > S)
					}
					function Y(ao, aq, ar, ap) {
						J.online = [];
						y({
							dataType: "jsonp",
							url: e + ao.join(";"),
							data: {},
							jsonp: "callback",
							success: function(au) {
								var at = au.data;
								if (au.success) {
									k.each(aq, function(aw, av) {
										if (k.query("a", aw).length == 0) {
											ah._lightToken(aw, ar[av], at[av])
										}
									});
									if (ap) {
										ap()
									}
								}
							}
						})
					}
				},
				_lightToken: function(T, S, U) {
					var ab = this,
						Z = B.create('<a href="javascript: void(0);" target="_blank"></a>'),
						R = S.encode ? d(S.nick) : S.nick,
						X = S.from + R,
						Y = S.item,
						W = S.items,
						V = S.portal,
						aa = X;
					if (Y) {
						aa += "-{" + Y + "}"
					}
					ab.data[aa] = {
						key: aa,
						userName: R,
						userId: X,
						fromSite: S.from,
						status: z[U],
						itemId: Y,
						itemsId: W,
						portalId: V
					};
					T.className = "ww-light ww-" + S.icon;
					Z.className = "ww-" + S.display;
					if (U === 1) {
						B.addClass(Z, "ww-online");
						Z.title = v.DEFAULT;
						if (A.appId && A.appId == 4) {
							Z.title = v.SNS
						}
						Z.innerHTML = "<span>\u65fa\u65fa\u5728\u7ebf</span>"
					} else {
						if (U === 4 || U === 5) {
							B.addClass(Z, "ww-mobile");
							Z.innerHTML = "<span>\u624b\u673a\u5728\u7ebf</span>"
						} else {
							B.addClass(Z, "ww-offline");
							Z.innerHTML = "<span>\u65fa\u65fa\u79bb\u7ebf</span>"
						}
					}
					Z.href = P + ab._paramUserInfo(ab.data[aa], true);
					G.on(Z, "click", function(ae) {
						var ac = k.unparam(c.get(f)),
							ad = ab.data[aa],
							af = unescape((c.get("_nk_") || "").replace(/\\u/g, "%u"));
						if (ab.addonIsOK() || (ac && ac.e == 1)) {
							ae.preventDefault()
						}
						if (!ab.addonIsOK()) {
							ae.preventDefault();
							if (ab._isOtherHost()) {
								if (!w) {
									alert("\u4f60\u6ca1\u6709\u5b89\u88c5\u963f\u91cc\u65fa\u65fa,\u8bf7\u4e0b\u8f7d\u963f\u91cc\u65fa\u65fa!");
									window.open("http://www.taobao.com/wangwang")
								} else {
									J.location = "aliim:sendmsg?" + ab._paramUserInfo(ad, null, Z)
								}
								return
							}
						}
						if (!ad.dispatched && U < 4 && ad.userId.indexOf(":") == -1) {
							y.getScript(o + h(ad.userId) + "&charset=utf-8", function() {
								var ag = d(J.realcid);
								if (ag && ag !== ad.userId) {
									ad.userName = ag.substring(8);
									ad.userId = ag
								}
								ad.dispatched = true;
								ab._openChatDialog(ad, Z)
							}, "utf-8")
						} else {
							ab._openChatDialog(ad, Z)
						}
					});
					T.appendChild(Z)
				},
				_setCookie: function() {
					c.set(f, k.param(cookieX), 365, N, "/")
				},
				_directToTBLogin: function(R) {
					var W = location,
						T = W.protocol + "//" + W.host + W.pathname,
						Z = W.search,
						V = W.hash,
						S = W.href,
						X = "wwlight",
						Y = this,
						U = "https://login." + x + "/member/login.jhtml?f=top";
					Z = Z ? k.unparam(Z.substring(1)) : {};
					if (X in Z) {
						delete Z[X]
					}
					if (R) {
						Z[X] = R
					}
					Z = k.param(Z);
					Z = h(Z);
					S = T + "?" + Z + V;
					W.href = U + "?redirectUrl=" + S
				},
				_openTBLoginPopup: function(T) {
					var ad = location,
						Y = ad.protocol + "//" + ad.host + ad.pathname,
						ah = ad.search,
						ab = ad.hash,
						X = ad.href,
						ae = "wwlight",
						ag = this,
						W = location.hostname.indexOf("taobao.com") > -1,
						S, aa = "https://login." + x + "/member/login.jhtml?f=top";
					ah = ah ? k.unparam(ah.substring(1)) : {};
					if (ae in ah) {
						delete ah[ae]
					}
					if (T) {
						ah[ae] = T;
						if (ag.isSearch()) {
							S = ah.q;
							delete ah.q;
							ah[ae] = T
						} else {
							ah[ae] = T
						}
					}
					ah = k.param(ah);
					if (!this.isSearch()) {} else {
						if (S) {
							ah = "q=" + S + "&" + ah
						}
					}
					X = Y + "?" + ah + ab;
					var ad = location;
					B.addStyleSheet(".tstart-login{width:410px;height:300px;bottom:100px;left:200px;opacity:1;position:fixed;_position:absolute;z-index:5000;background-color:#fff;padding:0;overflow:hidden;-moz-border-radius-bottomleft:5px;-moz-border-radius-bottomright:5px;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;border:7px solid #BBB;}.tstart-login .hd{height:22px;line-height:22px;padding-left:8px;border-bottom:1px solid #D1D1D1;font-weight:bold;background-color:#fff;}.tstart-login .ft{background-color:#F5F5F5;}.tstart-login .ft .btn-close{color:#C9C9C9;font-family:Tahoma,sans;font-size:12px;font-weight:bold;position:absolute;right:8px;text-decoration:none;top:3px;}");
					var af = '<div id="tstartLogin" class="tstart-login"><div class="hd"><h3></h3></div><div class="bd" style="padding: 0px; overflow: hidden;"><iframe width="410" height="270" frameborder="0" scrolling="no" id="frameContent" name="frameContent" ></iframe></div><div class="ft"><a class="btn-close" title="\u5173\u95ed\u6b64\u7a97\u53e3" href="javascript:void(0)">x</a></div></div>',
						V = k.get(".tstart-login");

					function ac(ai) {
						B.css(ai, "left", parseInt(B.viewportWidth() / 2) - parseInt(V.offsetWidth / 2) + "px");
						B.css(ai, "top", parseInt(B.viewportHeight() / 2) - parseInt(V.offsetHeight / 2) + (k.UA.ie === 6 ? B.scrollTop() : 0) + "px")
					}
					if (!V) {
						V = k.DOM.create(af);
						document.body.appendChild(V);
						ac(V);
						G.on(k.get(".btn-close", V), "click", function() {
							B.css(V, "display", "none")
						});
						if (6 === k.UA.ie) {
							G.on(window, "scroll resize", function() {
								ac(V)
							})
						} else {
							G.on(window, "scroll resize", function() {
								B.css(V, "left", parseInt(B.viewportWidth() / 2) - parseInt(V.offsetWidth / 2) + "px")
							})
						}
						if (!W) {
							var R = "http://www.daily.taobao.net/go/act/share/loginsuccess.php"
						} else {
							var R = "http://www.taobao.com/go/act/share/loginsuccess.php"
						}
						var U = "https://login." + x + "/member/login.jhtml?style=mini&full_redirect=false&redirect_url=" + R;
						var Z = V.getElementsByTagName("iframe")[0];
						Z.src = U;
						G.on(Z, "load", function() {
							if (b()) {
								location.href = X
							}
						})
					} else {
						B.css(V, "display", "block");
						ac(V)
					}
				},
				_isOtherHost: function() {
					var T = location.hostname,
						R = ["tmall.net", "tmall.com", "taobao.com", "daily.taobao.net"],
						S = R.length;
					for (i = 0; i < S; i++) {
						if (T.indexOf(R[i]) > -1) {
							return false
						}
					}
					return true
				},
				isSearch: function() {
					var S = ["search.taobao.com", "sandbox.search.taobao.com", "search8.taobao.com", "search8.daily.taobao.net", "s.taobao.com", "list.mall.daily.taobao.net", "list.mall.taobao.com", "s8.taobao.com"],
						R, T = S.length,
						U = location;
					for (R = 0; R < T; R++) {
						if (U.host.indexOf(S[R] > -1)) {
							return true
						}
					}
				},
				_paramUserInfo: function(R, V, U) {
					var T = R.userId || R.siteid + R.touid,
						S = "";
					if (V) {
						T = h(T)
					}
					if (O != 6) {
						return "uid=" + T.split("cntaobao")[1] + "&tositeid=" + R.fromSite + "&status=" + R.status + "&suid=" + R.portalId
					} else {
						if (U && U.parentNode) {
							S = U.parentNode.getAttribute("data-items") || ""
						}
						return "&touid=" + T + "&siteid=" + (R.fromSite || R.siteid) + "&status=" + R.status + "&portalId=" + (R.portalId || "") + "&gid=" + (R.itemId || "") + "&itemsId=" + S
					}
				},
				_openChatDialog: function(S, U) {
					var T = this,
						R = 1;
					T.userInfo = S;
					T.link = U;
					if (T.addonIsOK()) {
						if (n) {
							try {
								(new ActiveXObject("AliIMX.WangWangX")).ExecCmd("Aliim:sendmsg?" + T._paramUserInfo(S, true, U))
							} catch (W) {
								J.location = "aliim:sendmsg?" + T._paramUserInfo(S, null, U)
							}
						} else {
							T._openChatDialogInUnIE(S, U)
						}
						R = 0
					} else {
						if (!w) {
							T._openWebWW();
							return
						} else {
							if (p) {
								T._openDialogBySelectionDialog(S, U, 2)
							} else {
								var V = k.unparam(c.get(f)).c;
								if (V > 1) {
									T._openDialogBySelectionDialog(S, U, V)
								} else {
									T._createSelectionDialog()
								}
							}
						}
					}
					C(j + "&uid=" + I + "&tid=" + S.userId + "&gid=" + S.itemId + "&ver=" + R + "&browse=" + E + "&playform=" + navigator.platform)
				},
				_openWebWW: function() {
					var T = this,
						S = T.userInfo,
						R = k.unparam(c.get(f)),
						U = unescape((c.get("_nk_") || "").replace(/\\u/g, "%u"));
					if (U == "") {
						if (N.indexOf("tmall") > -1) {
							T._directToTBLogin(S.key)
						} else {
							T._openTBLoginPopup(S.key)
						}
						return
					} else {
						if (R && R.e == 1 && TDog.EventCenter) {
							if (T._isOtherHost()) {} else {
								TDog.EventCenter.fire(TDog.EVENTS.CLICK_LIGHT_ICON, {
									userInfo: S
								})
							}
							C(j + "&uid=" + U + "&tid=" + S.userId + "&gid=" + S.itemId + "&ver=" + 2 + "&browse=" + E + "&playform=" + navigator.platform)
						}
					}
				},
				_openChatDialogInUnIE: function(R, U) {
					var S = this;
					if (S.plugin) {
						var W = S.numberify(S.plugin.NPWWVersion());
						if (D.webkit && W < 1.005) {
							J.location = "aliim:sendmsg?" + S._paramUserInfo(R, null, U)
						} else {
							try {
								var T = "aliim:sendmsg?" + S._paramUserInfo(R, true, U);
								S.plugin.SendCommand(T, 1)
							} catch (V) {
								J.location = "aliim:sendmsg?" + S._paramUserInfo(R, null, U)
							}
						}
					} else {
						J.location = "aliim:sendmsg?" + S._paramUserInfo(R, null, U)
					}
				},
				_createSelectionDialog: function() {
					var T = this,
						R = k.unparam(c.get(f));
					if (!T.selectionDialog) {
						B.addStyleSheet("#J_Windows8_Selection_Dialog{display:block;width:440px;height:270px;position:fixed;top: 50%;left:50%;margin:-134px 0 0 -220px;padding:0;z-index:10000;}#J_Windows8_Selection_Dialog_Bg{width:100%;height:100%;background:#000;opacity:0.2;filter:alpha(opacity=20);position:fixed;left:0;top:0;z-index:9999;}#J_Windows8_Selection_Dialog .win8-dialog-bg{display:block;width: 440px;height:270px;background:#000;opacity:0.2;filter:alpha(opacity=20);position:absolute;top:0;left:0;padding:0;margin:0;}#J_Windows8_Selection_Dialog .win8-dialog-con{display:block;margin:5px;width:390px;height:220px;background:#fff;position:absolute;top:0;left:0;font:14px/1.5 Microsoft YaHei;padding:20px;}#J_Windows8_Selection_Dialog h4{font-size:18px;font-weight:bold;padding:0;margin:0;color:#000;}#J_Windows8_Selection_Dialog ul{padding:15px 0 30px 20px;margin:10px 0 0 0;}#J_Windows8_Selection_Dialog li{padding:0 0 0 40px;margin:0;list-style:none;background:url('http://img02.taobaocdn.com/tps/i2/T1pEcjXdRhXXcCnGHx-30-300.png') no-repeat 0 2px;height:30px;line-height:30px;font-size: 16px;color: #000;cursor:pointer;}#J_Windows8_Selection_Dialog li.win8-slt{background-position: 0 -45px;}#J_Windows8_Selection_Dialog li.win8-tip{background:none;cursor:default;font-size:12px;color:#666;line-height:16px;height:16px;margin-bottom:5px;}#J_Windows8_Selection_Dialog .win8-btn{font-size:14px;padding:30px 0 0 0;border-top:1px solid #ddd;}#J_Windows8_Selection_Dialog .win8-cb{display:block;float:left;margin:5px 50px 0 0;padding:0;}#J_Windows8_Selection_Dialog .win8-cb input{vertical-align:-1px;margin-right:5px;}#J_Windows8_Selection_Dialog .win8-btn a{display: block;float:left;width:96px;height:28px;background:#fff;border:2px solid #ddd;color:#737373;text-decoration:none;text-align:center;line-height:28px;font-size:16px;margin-right:15px;overflow:hidden;}#J_Windows8_Selection_Dialog .win8-btn a:hover{background:#00ade8;color:#fff;text-decoration:none;}#J_Windows8_Btn_Close{display:block;width:40px;height:40px;background:url('http://img02.taobaocdn.com/tps/i2/T1pEcjXdRhXXcCnGHx-30-300.png') no-repeat 8px -113px;position:absolute;top:0;right:0;text-indent:-9999px;}#J_Windows8_Btn_Close:hover{background-position:8px -188px}");
						var S = '<div><div id="J_Windows8_Selection_Dialog_Bg" class="win8-bg"></div><div id="J_Windows8_Selection_Dialog"><div class="win8-dialog-bg"></div><div class="win8-dialog-con"><h4>\u8bf7\u9009\u62e9\u9700\u8981\u6253\u5f00\u7684\u65fa\u65fa\uff1a</h4><ul><li class="win8-slt J_Windows8_selection_item" data-value="2">\u963f\u91cc\u65fa\u65fa for Windows 8</li><li class="win8-tip">\u5982\u679c\u672a\u5b89\u88c5\uff0c\u8bf7\u5148\u5728\u5e94\u7528\u5546\u5e97\u4e0b\u8f7d\u5b89\u88c5</li><li class="J_Windows8_selection_item" data-value="3">\u963f\u91cc\u65fa\u65fa\u7f51\u9875\u7248</li></ul><div class="win8-btn"><label class="win8-cb"><input type="checkbox" id="J_Window8_remember" />\u8bb0\u4f4f\u6211\u7684\u9009\u62e9</label><a href="javascript:;" title="\u786e\u5b9a" id="J_Windows8_Btn_Yes">\u786e\u5b9a</a><a href="javascript:;" title="\u53d6\u6d88" id="J_Windows8_Btn_No">\u53d6\u6d88</a></div><a href="javascript:;" title="\u5173\u95ed" id="J_Windows8_Btn_Close">\u5173\u95ed</a></div></div></div>';
						var U = B.create(S);
						T.selectionDialog = U;
						l.body.appendChild(U);
						G.on(U, "click", function(V) {
							var X = V.target;
							if (X.id === "J_Windows8_Btn_Yes") {
								var W = B.attr(B.get(".win8-slt"), "data-value");
								if (B.get("#J_Window8_remember").checked) {
									R.c = parseInt(W);
									c.set(f, k.param(R), 365, N, "/");
									T._destorySelectionDialog()
								} else {
									U.style.display = "none"
								}
								T._openDialogBySelectionDialog(T.userInfo, T.link, W)
							} else {
								if (X.id === "J_Windows8_Btn_No" || X.id === "J_Windows8_Btn_Close") {
									U.style.display = "none"
								} else {
									if (B.hasClass(X, "J_Windows8_selection_item") && !B.hasClass("win8-slt")) {
										B.addClass(X, "win8-slt");
										B.removeClass(B.siblings(X), "win8-slt")
									}
								}
							}
						})
					} else {
						U = T.selectionDialog;
						U.style.display = "block"
					}
				},
				_destorySelectionDialog: function() {
					var R = this;
					B.remove(R.selectionDialog);
					G.remove(R.selectionDialog, "click");
					R.selectionDialog = null
				},
				_openDialogBySelectionDialog: function(R, T, U) {
					var S = this;
					if (U == 2) {
						J.location.href = "aliim:sendmsg?" + S._paramUserInfo(R, null, T)
					} else {
						if (U == 3) {
							S._openWebWW(R)
						}
					}
				},
				_checkWangWangInstalled: function() {
					var T = this,
						U = false,
						R = k.unparam(c.get(f)),
						W = (navigator.platform.indexOf("Mac") > -1) ? true : false;
					if (!W) {
						if (!U && n) {
							U = T._checkWangWangVersion()
						} else {
							var S = navigator.mimeTypes["application/ww-plugin"];
							if (S) {
								var V = l.createElement("embed");
								V.setAttribute("type", "application/ww-plugin");
								k.DOM.css(V, "visibility", "hidden");
								k.DOM.css(V, "width", 0);
								k.DOM.css(V, "height", 0);
								KISSY.ready(function(Y) {
									l.body.appendChild(V);
									var X = T.numberify(V.NPWWVersion());
									if (V.NPWWVersion && X >= 1.003) {
										U = true
									} else {
										U = false
									}
									T.plugin = V
								})
							}
						}
					} else {
						if (D.firefox || D.chrome || D.opera || D.safari) {
							var S = navigator.mimeTypes["application/ww-plugin"];
							if (S) {
								var V = l.createElement("embed");
								V.setAttribute("type", "application/ww-plugin");
								k.DOM.css(V, "visibility", "hidden");
								k.DOM.css(V, "width", 0);
								k.DOM.css(V, "height", 0);
								KISSY.ready(function() {
									l.body.appendChild(V);
									try {
										if (V.isMacWWInstalled()) {
											U = true
										}
									} catch (X) {}
									V.parentNode.removeChild(V)
								})
							}
						}
					}
					if (location.href.indexOf("topen") > -1) {
						U = false
					}
					return U
				},
				numberify: function(R) {
					var S = 0;
					return parseFloat(R.replace(/\./g, function() {
						return (S++ === 0) ? "." : ""
					}))
				},
				_checkWangWangVersion: function() {
					var T, S = true,
						R = k.unparam(c.get(f));
					try {
						T = new ActiveXObject("aliimx.wangwangx")
					} catch (U) {
						try {
							T = new ActiveXObject("WangWangX.WangWangObj");
							O = 5
						} catch (U) {
							S = false
						}
					} finally {
						T = null
					}
					return S
				},
				_getParamsFromData: function(S) {
					var T = B.attr(S, "data-encode") || false,
						R = B.attr(S, "data-nick") || "";
					if (T) {
						R = d(R)
					}
					return {
						nick: R,
						item: B.attr(S, "data-item") || (J.g_config || {})["itemId"] || "",
						items: B.attr(S, "data-items") || "",
						display: B.attr(S, "data-display") || "inline",
						icon: B.attr(S, "data-icon") || "large",
						from: B.attr(S, "data-from") || "cntaobao",
						portal: B.attr(S, "data-portal") || "",
						fromId: B.attr(S, "data-portal") || "",
						encode: h
					}
				}
			};

		function C(R) {
			try {
				new Image().src = R
			} catch (S) {}
		}
		window.Light = m;
		k.ready(function() {
			m.initStart();
			m.init()
		})
	})
})();