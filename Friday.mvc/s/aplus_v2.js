/*pub-1|2013-03-15 09:32:18*/
(function() {
	var AS = window,
		n = document,
		w = (new Date()).getTime(),
		A = "g_tb_aplus_loaded";
	if (!n.getElementsByTagName("body").length) {
		setTimeout(arguments.callee, 50);
		return
	}
	if (AS[A]) {
		return
	}
	AS[A] = 1;
	var p = "http://a.tbcdn.cn/s/fdc/lsproxy.js?v=20130106";
	var AQ = "6",
		J = location,
		f = "https:" == J.protocol,
		h = parent !== self,
		AB = 1,
		X = (AB ? "0.0" : ""),
		I = J.pathname,
		H = J.hostname,
		Au = (f ? "https://" : "http://") + "log.mmstat.com/",
		Ah = Au + y(J.hostname) + ".gif",
		k = [
			["logtype", h ? 0 : 1]
		],
		Aa = location.href,
		AR = n.referrer,
		Ag = f && (Aa.indexOf("login.taobao.com") >= 0 || Aa.indexOf("login.tmall.com") >= 0),
		AJ = !! n.attachEvent,
		AO = "attachEvent",
		O = "addEventListener",
		Ac = AJ ? AO : O,
		G = false,
		At = true,
		AC = "::-plain-::",
		AU = "data-spm",
		Ai = "data-spm-protocol",
		Ad = "goldlog_queue",
		l, AT = W(),
		N, P, AX = Y("cna"),
		z = {}, b, AW = {}, t, j, L, AV, Al, AN, V = G,
		Aq = AS._SPM_a,
		Ap = AS._SPM_b,
		AD, AA, Ak, T, e = G,
		Z;
	AR = (function() {
		var A0, Az = "wm_referrer",
			Ay = "refer_pv_id",
			Ax = AS.name || "",
			Av = r(Ax),
			A1 = Av[Az],
			Aw = Av.wm_old_value;
		A0 = n.referrer || C(A1);
		l = Av[Ay];
		if (!Ag) {
			if (!g(Aw)) {
				AS.name = C(Aw)
			} else {
				if (!g(A1)) {
					AS.name = Ax.replace(/&?\bwm_referrer=[^&]*/g, "")
				}
			}
		}
		return A0
	})();

	function y(Az) {
		if (h) {
			return "y"
		}
		var Av = "o",
			A0 = [
				["ju.taobao.com", "4"],
				["juhuasuan.com", "4"],
				["alipay.com", "5"],
				["china.alibaba.com", "6"],
				["alibaba.com", "7"],
				["aliloan.com", "8"],
				["cnzz.com", "9"],
				["net.cn", "a"],
				["hichina.com", "a"],
				["phpwind.com", "b"],
				["aliyun.com", "c"],
				["tao123.com", "d"],
				["alimama.com", "e"],
				["taobao.com", "1"],
				["tmall.com", "2"],
				["etao.com", "3"],
				["*", Av]
			],
			Ax = A0.length,
			Aw, Ay;
		for (Aw = 0; Aw < Ax; Aw++) {
			Ay = A0[Aw];
			if (Am(Az, Ay[0])) {
				return Ay[1]
			}
		}
		return Av
	}
	function Am(Aw, Av) {
		return Aw.indexOf(Av) > -1
	}
	function AF(Aw, Av) {
		return Aw.indexOf(Av) == 0
	}
	function AH(Ay, Ax) {
		var Aw = Ay.length,
			Av = Ax.length;
		return Aw >= Av && Ay.indexOf(Ax) == (Aw - Av)
	}
	function An(Av) {
		return Ar(Av) ? Av.replace(/^\s+|\s+$/g, "") : ""
	}
	function C(Ay, Aw) {
		var Av = Aw || "";
		if (Ay) {
			try {
				Av = decodeURIComponent(Ay)
			} catch (Ax) {}
		}
		return Av
	}
	function c(Ay) {
		var Av = [],
			Ax, Aw;
		for (Ax in Ay) {
			if (Ay.hasOwnProperty(Ax)) {
				Aw = "" + Ay[Ax];
				Av.push(AF(Ax, AC) ? Aw : (Ax + "=" + encodeURIComponent(Aw)))
			}
		}
		return Av.join("&")
	}
	function AY(Aw) {
		var Ax = [],
			Az, Ay, A0, Av = Aw.length;
		for (A0 = 0; A0 < Av; A0++) {
			Az = Aw[A0][0];
			Ay = Aw[A0][1];
			Ax.push(AF(Az, AC) ? Ay : (Az + "=" + encodeURIComponent(Ay)))
		}
		return Ax.join("&")
	}
	function Ae(Aw) {
		var Ax = {}, Av;
		for (Av in Aw) {
			if (Aw.hasOwnProperty(Av)) {
				Ax[Av] = Aw[Av]
			}
		}
		return Ax
	}
	function U(Ax, Aw) {
		for (var Av in Aw) {
			if (Aw.hasOwnProperty(Av)) {
				Ax[Av] = Aw[Av]
			}
		}
		return Ax
	}
	function r(A0) {
		var Aw = A0.split("&"),
			Ax = 0,
			Av = Aw.length,
			Ay, Az = {};
		for (; Ax < Av; Ax++) {
			Ay = Aw[Ax].split("=");
			Az[Ay[0]] = C(Ay[1])
		}
		return Az
	}
	function u(Av) {
		return typeof Av == "number"
	}
	function g(Av) {
		return typeof Av == "undefined"
	}
	function Ar(Av) {
		return typeof Av == "string"
	}
	function B(Av) {
		return Object.prototype.toString.call(Av) === "[object Array]"
	}
	function m(Av, Aw) {
		return Av && Av.getAttribute ? (Av.getAttribute(Aw) || "") : ""
	}
	function AE(Aw) {
		var Av;
		try {
			Av = An(Aw.getAttribute("href", 2))
		} catch (Ax) {}
		return Av || ""
	}
	function M() {
		var Az = n.getElementById("tb-beacon-aplus");
		var Ax = m(Az, "exparams");
		if (!Ax) {
			return Ax
		}
		var Aw = ["taobao.com", "tmall.com", "etao.com", "hitao.com", "taohua.com", "juhuasuan.com", "alimama.com"];
		var Ay;
		var Av;
		if (h) {
			Av = Aw.length;
			for (Ay = 0; Ay < Av; Ay++) {
				if (Am(H, Aw[Ay])) {
					return Ax
				}
			}
			Ax = Ax.replace(/\buserid=\w*&?/, "")
		}
		return Ax
	}
	function D() {
		N = N || n.getElementsByTagName("head")[0];
		return P || (N ? (P = N.getElementsByTagName("meta")) : [])
	}
	function As(A0, A1) {
		var Ax = A0.split(";"),
			Ay, Aw = Ax.length,
			Av, Az;
		for (Ay = 0; Ay < Aw; Ay++) {
			Av = Ax[Ay].split("=");
			Az = An(Av[0]);
			if (Az) {
				A1[Az] = C(An(Av[1]))
			}
		}
	}
	function Y(Av) {
		var Aw = n.cookie.match(new RegExp("\\b" + Av + "=([^;]+)"));
		return Aw ? Aw[1] : ""
	}
	function AZ() {
		return Math.floor(Math.random() * 268435456).toString(16)
	}
	function x() {
		var Aw, Az, Ax = D(),
			Av = Ax.length,
			Ay;
		for (Aw = 0; Aw < Av; Aw++) {
			Az = Ax[Aw];
			if (m(Az, "name") == "microscope-data") {
				Ay = m(Az, "content");
				As(Ay, z);
				e = At
			}
		}
		b = c(z);
		Al = z.pageId;
		L = z.shopId;
		AV = z.siteInstanceId;
		AN = z.siteCategory;
		j = AV || L
	}
	function AI() {
		var Aw, Az, Ax = D(),
			Av = Ax.length,
			Ay;
		for (Aw = 0; Aw < Av; Aw++) {
			Az = Ax[Aw];
			if (m(Az, "name") == "atp-beacon") {
				Ay = m(Az, "content");
				As(Ay, AW)
			}
		}
		t = c(AW)
	}
	function Af() {
		var Az = D(),
			Ax, Aw, Ay, Av;
		for (Ax = 0, Aw = Az.length; Ax < Aw; Ax++) {
			Ay = Az[Ax];
			Av = m(Ay, "name");
			if (Av == AU) {
				AD = m(Ay, Ai)
			}
		}
	}
	function o(A0) {
		var A2 = D(),
			Az, Ax, Aw, A1, Av, Ay;
		if (A2) {
			for (Az = 0, Ax = A2.length; Az < Ax; Az++) {
				A1 = A2[Az];
				Av = m(A1, "name");
				if (Av == A0) {
					Ak = m(A1, "content");
					if (Ak.indexOf(":") >= 0) {
						Aw = Ak.split(":");
						AD = Aw[0] == "i" ? "i" : "u";
						Ak = Aw[1]
					}
					Ay = m(A1, Ai);
					if (Ay) {
						AD = (Ay == "i" ? "i" : "u")
					}
					T = AF(Ak, "110");
					AA = (T ? X : Ak);
					return At
				}
			}
		}
		return G
	}
	function Ao() {
		if (!g(AA)) {
			return AA
		}
		if (Aq && Ap) {
			Aq = Aq.replace(/^{(\w+)}$/g, "$1");
			Ap = Ap.replace(/^{(\w+)}$/g, "$1");
			V = At;
			AA = Aq + "." + Ap;
			Af();
			Z.spm_ab = [Aq, Ap];
			return AA
		}
		var Ax = n.getElementsByTagName("head")[0],
			Aw;
		o(AU) || o("spm-id");
		AA = AA || X;
		if (!AA) {
			return AA
		}
		var Av = n.getElementsByTagName("body");
		var Ay;
		Aw = AA.split(".");
		Z.spm_ab = Aw;
		Av = Av && Av.length ? Av[0] : null;
		if (Av) {
			Ay = m(Av, AU);
			if (Ay) {
				AA = Aw[0] + "." + Ay;
				Z.spm_ab = [Aw[0], Ay]
			}
		}
		return AA
	}
	function W() {
		var Av = "g_aplus_pv_id",
			Ax = "",
			Aw = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
		if (!AS[Av]) {
			while (Ax.length < 6) {
				Ax += Aw.substr(Mat...exOf("=") == -1) {
					Av.wm_old_value = Aw;
					AS.name = c(Av)
				} else {
					if (Ag && Aw.match(/&?\bwm_referrer=[^&]+/)) {
						delete Av.wm_referrer
					}
					Aw = r(Aw);
					U(Aw, Av);
					AS.name = c(Aw)
				}
			}
			function v(Aw, Ax, Av) {
				Aw[Ac]((AJ ? "on" : "") + Ax, function(Az) {
					Az = Az || AS.event;
					var Ay = Az.target || Az.srcElement;
					Av(Az, Ay)
				}, G)
			}
			function Aj() {
				var Aw, Av, Ay = ["/theme/info/info", "/promo/co_header.php", "fast_buy.htm", "/add_collection.htm", "/taobao_digital_iframe", "/promo/co_header_taoinfo.php", "/list_forum", "/theme/info/info"];
				for (Aw = 0, Av = Ay.length; Aw < Av; Aw++) {
					if (I.indexOf(Ay[Aw]) != -1) {
						return At
					}
				}
				var Ax = /^https?:\/\/[\w\.]+\.taobao\.com/i;
				return !Ax.test(AR)
			}
			function F() {
				var Az = AS[Ad],
					Aw, Ay, Av;
				if (!Az || !B(Az) || !Az.length) {
					return
				}
				while (Aw = Az.shift()) {
					if (!Aw || !Aw.action || !Ar(Aw.action) || !Aw.arguments || !B(Aw.arguments)) {
						continue
					}
					Av = Aw.action.split(".");
					Ay = AS;
					while (Av.length) {
						Ay = Ay[Av.shift()];
						if (!Ay) {
							return
						}
					}
					if (typeof Ay == "function") {
						try {
							Ay.apply(Ay, Aw.arguments)
						} catch (Ax) {}
					}
				}
			}
			function AP() {
				var Av = function() {
					F();
					setTimeout(Av, 200)
				};
				Av();
				v(AS, "beforeunload", F)
			}
			function i(Av, Aw) {
				if (!Aw) {
					return
				}
				if (!R()) {
					return Z.send(Av, Aw)
				} else {
					return AK({
						url: q(Av, Aw),
						js: p
					})
				}
			}
			function Ab() {
				return AC + Math.random()
			}
			function s(Aw) {
				var Av = Aw.match(new RegExp("\\?.*spm=([\\w\\.\\-\\*]+)")),
					Ax;
				return (Av && (Ax = Av[1]) && Ax.split(".").length == 5) ? Ax : null
			}
			function K(A1, A0) {
				var Ay, Av = A0.length,
					Az, Ax, Aw;
				for (Ay = 0; Ay < Av; Ay++) {
					Az = A0[Ay];
					Ax = Az[0];
					Aw = Az[1];
					if (Aw) {
						A1.push([Ax, Aw])
					}
				}
			}
			function a() {
				if (Math.random() < 0.0001) {
					E("sample.js?v=120910")
				}
				E("spm.js?v=121030");
				if (AV && L && (!AN || AN != "1")) {
					E("wp-beacon.js?v=121010")
				}
				if (Math.random() < 0.0001 && !h && Am(H, "www.taobao.com")) {
					E("exposure.js?v=121227")
				}
			}
			function AG(Ax, Av) {
				var Aw = n.createElement("script");
				Aw.type = "text/javascript";
				Aw.async = true;
				Aw.src = f ? Av : Ax;
				n.getElementsByTagName("head")[0].appendChild(Aw)
			}
			function E(Ax) {
				var Aw = "http://a.tbcdn.cn/s/fdc/",
					Av = "https://s.tbcdn.cn/s/fdc/";
				AG(Aw + Ax, Av + Ax)
			}
			function AM(Ay, Aw) {
				var Ax = document.createElement("iframe");
				Ax.style.width = "1px";
				Ax.style.height = "1px";
				Ax.style.position = "absolute";
				Ax.style.display = "none";
				Ax.src = Ay;
				if (Aw) {
					Ax.name = Aw
				}
				var Av = document.getElementsByTagName("body")[0];
				Av.appendChild(Ax);
				return Ax
			}
			function R() {
				if (f) {
					return false
				}
				var Aw = navigator.userAgent;
				var Av = Aw.split(" Safari/");
				if (Av.length != 2) {
					return false
				}
				return AS.localStorage && AS.postMessage && Av[1].match(/[\d\.]+/) && Aw.indexOf("AppleWebKit") > -1 && Aw.match(/\bVersion\/\d+/) && !Aw.match(/\bChrome\/\d+/)
			}
			function AK(Av) {
				var Aw = "http://cdn.mmstat.com/aplus-proxy.html?v=20130115";
				AM(Aw, JSON.stringify(Av));
				if (AS.addEventListener && AS.JSON) {
					AS.addEventListener("message", function(Ax) {
						var A1 = Ax.data;

						function A4() {
							var A7 = H.split(".");
							var A6 = A7.length;
							if (A6 > 1) {
								return A7[A6 - 2] + "." + A7[A6 - 1]
							} else {
								return H
							}
						}
						try {
							A1 = JSON.parse(A1)
						} catch (A3) {
							return
						}
						var A5, Ay, A0;
						for (var A2 = 0, Az = A1.length; A2 < Az; A2++) {
							A5 = A1[A2];
							A0 = A5.k;
							Ay = encodeURIComponent(A0) + "=" + (A0 == "cna" ? A5.v : encodeURIComponent(A5.v)) + "; domain=." + A4() + "; path=/; expires=" + (new Date(A5.t)).toGMTString();
							n.cookie = Ay
						}
					})
				}
			}
			function q(Aw, Ay) {
				var Ax = Aw.indexOf("?") == -1 ? "?" : "&",
					Av = Ay ? (B(Ay) ? AY(Ay) : c(Ay)) : "";
				return Av ? (Aw + Ax + Av) : Aw
			}
			Z = {
				version: AQ,
				pvid: AT,
				referrer: AR,
				_d: {},
				_microscope_data: z,
				on: v,
				DOMReady: S,
				getCookie: Y,
				tryToGetAttribute: m,
				tryToGetHref: AE,
				isNumber: u,
				send: function(Aw, Ax) {
					var Av = new Image(),
						Az = "_img_" + Math.random(),
						Ay = q(Aw, Ax);
					AS[Az] = Av;
					Av.onload = Av.onerror = function() {
						AS[Az] = null
					};
					Av.src = Ay;
					Av = null;
					return Ay
				},
				emit: function(Ay, Ax) {
					var Av, Aw = "ued.1.1.2?type=9";
					if (B(Ax)) {
						Av = ([
							["_gm:id", Ay]
						]).concat(Ax)
					} else {
						Av = Ae(Ax);
						Av["_gm:id"] = Ay
					}
					return Z.send(Au + Aw, Av)
				},
				record: function(Aw, A2, Ay, Av) {
					Av = arguments[3] || "";
					var Ax, A1 = "?",
						A0 = G,
						Az;
					if (Aw == "ac") {
						Ax = "http://ac.atpanel.com/1.gif";
						A0 = AF(Av, "A") && (Av.substring(1) == AL(A2))
					} else {
						if (AF(Aw, "/")) {
							A0 = AF(Av, "H") && (Av.substring(1) == AL(Aw));
							Ax = Au + Aw.substring(1);
							Az = At
						} else {
							if (AH(Aw, ".gif")) {
								Ax = Au + Aw
							} else {
								return G
							}
						}
					}
					if (!A0 && Av != "%" && AL(Aa) != Av) {
						return G
					}
					Ax += A1 + "cache=" + AZ() + "&gmkey=" + encodeURIComponent(A2) + "&gokey=" + encodeURIComponent(Ay) + "&cna=" + AX + "&isbeta=" + AQ;
					if (Az) {
						Ax += "&logtype=2"
					}
					if (!R()) {
						return Z.send(Ax)
					} else {
						return AK({
							url: Ax,
							js: p
						})
					}
				}
			};
			AS.goldlog = Z;
			AS.goldminer = {
				record: Z.emit
			};
			if (!AS[Ad] || !B(AS[Ad])) {
				AS[Ad] = []
			}
			AP();
			x();
			Ao();
			a();
			(function() {
				var A1, Az = Y("tracknick"),
					Ay = z.prototypeId,
					A0 = s(Aa),
					A2 = s(AR);
				if (!h || Aj()) {
					A1 = [
						[Ab(), "title=" + escape(n.title)],
						["pre", AR],
						["cache", AZ()],
						["scr", screen.width + "x" + screen.height],
						["isbeta", AQ]
					];
					if (AX) {
						A1.push([Ab(), "cna=" + AX])
					}
					if (Az) {
						A1.push([Ab(), "nick=" + Az])
					}
					K(A1, [
						["wm_pageid", Al],
						["wm_prototypeid", Ay],
						["wm_instanceid", AV],
						["wm_sid", L],
						["spm-url", A0],
						["spm-pre", A2]
					]);
					if (AB) {
						A1.push(["spm-cnt", (AA || "0.0") + ".0.0." + AT])
					} else {
						if (AA) {
							A1.push(["spm-cnt", AA])
						}
					}
					k = k.concat(A1);
					k.push([Ab(), M()]);
					AS.g_aplus_pv_req = i(Ah, k)
				}
				if (h) {
					AI();
					var Aw, Av = AW.on,
						Ax = (Av == "1" ? "http://ac.atpanel.com/y.gif" : Ah);
					if ((Av == "1" || Av == "2") && (Aw = AW.chksum) && Aw === AL(Aa).toString()) {
						i(Ax, k)
					}
				}
				if (Ag) {
					Q()
				} else {
					v(AS, "beforeunload", function() {
						Q()
					})
				}
			})();
			var d = (new Date()).getTime();
			setTimeout(function() {
				if (Math.random() > 0.0001) {
					return
				}
				Z.emit("global_sample", {
					type: "timer",
					t: d - w
				})
			}, 1)
		})();