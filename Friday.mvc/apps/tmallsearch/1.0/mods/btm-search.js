﻿/*pub-1|2013-04-11 10:56:52*/
KISSY.add(V + "/mods/btm-search", function () {
    var G = KISSY,
		O = G.DOM,
		N = G.Event,
		Y = document,
		U = "active",
		J = G.UA.ie,
		M = navigator.appVersion.indexOf("Mac") > -1,
		X = false,
		L, K, F, I, B, H, P, Q = '<p><span class="j_MallSearchType" data-type="p">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5546\u54c1</em></span></p><p><span class="j_MallSearchType" data-type="s">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5e97\u94fa</em></span></p>';

    function W(b) {
        var D = b.split(","),
			a = {
			    q: D[0] || "",
			    wq: D[1] || "",
			    suggest: D[2] || "",
			    stats: D[3] || "",
			    pos: D[4] || "",
			    itemid: D[5] || "",
			    clickid: D[6] || "",
			    page_type: D[7] || "",
			    type: D[8] || "",
			    combo: D[9] || "",
			    active: "0",
			    searchtype: "search"
			}, Z = G.param(a);
        if (typeof __header_atpanel_param !== "undefined") {
            Z += "&" + __header_atpanel_param
        }
        if (typeof goldlog !== "undefined") {
            goldlog.record("/mallsearch", "tmallsearch", Z, "H1449172242")
        } else {
            var E = new Image(),
				S = "_img_" + Math.random();
            win[S] = E;
            E.onload = E.onerror = function () {
                win[S] = null
            };
            E.src = ("https:" == location.protocol ? "https:" : "http:") + "//log.mmstat.com/mallsearch?goldlog=undefined&" + Z;
            E = null
        }
    }
    function T() {
        var E, Z = Q,
			b, D = /(\?|\&)area=b2c(\&|$)/;

        function S() {
            return false
        }
        function c() {
            H.query = "";
            H._dataCache = {};
            H.detach("beforeStart", S)
        }
        function a(e) {
            var d = document.createElement("div");
            d.className = "mallSearch-tip";
            d.innerHTML = e;
            return d
        }
        if (G.Suggest && G.Suggest.version >= 1.1) {
            H = new G.Suggest(K, "http://suggest.taobao.com/sug?area=b2c&code=utf-8", {
                containerCls: "mall-suggest-container",
                resultFormat: "",
                offset: 0
            });
            E = H.container;
            H.on("updateFooter", function (e) {
                var d = Z.replace(/{{keyword}}/g, H.query);
                H.footer.appendChild(a(d));
                if (G.UA.ie < 8) {
                    O.css(H.content, "display", "block");
                    if (!O.text(H.content)) {
                        O.css(H.content, "display", "none")
                    }
                }
                if (G.UA.ie < 7) {
                    G.each(G.query("b", G.get(".mallSearch-tip")), function (f) {
                        if (O.width(f) > 300) {
                            O.width(f, 300)
                        }
                    })
                }
            });
            N.on(H.footer, "click", function (g) {
                var g = g || window.event,
					h = g.target || g.srcElement,
					f = O.parent(h, function (j) {
					    return O.hasClass(j, "j_MallSearchType")
					});
                if (f || O.hasClass(h, "j_MallSearchType")) {
                    var d = f || h,
						e = O.attr(d, "data-type") || "p",
						i = K.value + "," + K.value + "," + (e == "s" ? "2" : "1") + "_0,,1,topsearch,topsearch," + e + ",20,searchbutton";
                    W(i);
                    R(B, {
                        style: e == "s" ? "w" : "g"
                    });
                    B.submit()
                }
                g.halt()
            });
            N.on(H.footer, "mouseenter", function () {
                O.removeClass(H.selectedItem, "ks-selected")
            });
            N.on(H.footer, "mouseleave", function () {
                O.addClass(H.selectedItem, "ks-selected")
            });
            H.on("itemSelect", function () {
                var d = G.get(".mall-suggest-container"),
					j = d.getElementsByTagName("li"),
					l = 0,
					m = "",
					o = H.query || "",
					p = F.value == "s" ? 2 : 1;
                for (var g = 0, n = j.length; g < n; g++) {
                    if (O.hasClass(j[g], "ks-selected")) {
                        l = g + 1;
                        m = O.text(j[g])
                    }
                }
                var k = o + "_" + l + "_0",
					h = O.create('<input type="hidden" value="' + k + '" name="xl" />'),
					q = "xl_" + p + "_suggest",
					f = O.create('<input type="hidden" value="' + q + '" name="from" />');
                O.append(h, B);
                O.append(f, B);
                var e = m + "," + o + ",0_" + l + ",suggest:0_" + l + "," + l + "," + m + "," + m + "," + p + ",5,suggest";
                W(e)
            })
        }
    }
    function R(S, Z) {
        function D(a, b) {
            var c = document.createElement("input");
            c.setAttribute("type", "hidden");
            c.setAttribute("name", a);
            c.setAttribute("value", b);
            return c
        }
        for (var E in Z) {
            if (!(S[E] && S[E].nodeName)) {
                S.appendChild(D(E, Z[E]))
            } else {
                S[E].value = Z[E]
            }
        }
    }
    function A() {
        setTimeout(function () {
            if (K.value == "") {
                I.style.visibility = "visible"
            }
        }, 100)
    }
    var C = function (Z) {
        if (!G.get("#mallSearch")) {
            return
        }
        if (!G.get("#btm-mq")) {
            return
        }
        var E = "",
			b, D = false,
			S = false,
			a;
        K = G.get("#btm-mq");
        I = O.prev(K);
        F = G.get("#J_Type");
        B = K.form;
        button = G.get("#mallSearch button");
        N.on(K, "focus", function (c) {
            I.style.color = "#ccc"
        });
        N.on(K, "blur", function (c) {
            if (this.value == "" && !D) {
                I.style.visibility = "visible";
                I.style.color = "#666"
            }
            D = false
        });
        N.on(K, "keydown", function (h) {
            var g = h.keyCode,
				c, f;
            E = K.value;
            if (g == 8 || g == 46) {
                I.style.visibility = "hidden"
            } else {
                if (g == 13) {
                    if (!X) {
                        X = true;
                        var d = F.value == "s" ? 2 : 1,
							i = K.value + "," + K.value + ",,,1,topsearch,topsearch," + d + ",20,searchbutton";
                        W(i)
                    }
                } else {
                    if (g < 13 || (g > 41 && g < 112) || g > 123) {
                        I.style.visibility = "hidden"
                    }
                }
            }
        });
        N.on(K, "keypress", function (c) {
            if (S) {
                S = false;
                c.halt()
            }
        });
        N.on(K, "keyup", function (d) {
            var c = d.keyCode;
            if (this.value == "") {
                if (E != "" || !(c == 8 || c == 46)) {
                    I.style.visibility = "visible"
                }
            }
        });
        N.on(K, "mouseover", function (c) {
            if (this.value != "") {
                I.style.visibility = "hidden"
            }
        });
        N.on(B, "submit", function () {
            if (F.value === "taobao") {
                R(B, {
                    sort: "",
                    cat: "",
                    style: "grid"
                })
            } else {
                if (F.value === "item") {
                    R(B, {
                        search: "y",
                        newHeader_b: "s_from",
                        searcy_type: "item"
                    })
                }
            }
        });
        N.on(button, "click", function () {
            if (!X) {
                X = true;
                var c = F.value == "s" ? 2 : 1,
					d = K.value + "," + K.value + ",,,1,topsearch,topsearch," + c + ",20,searchbutton";
                W(d)
            }
        });
        T();
        A();
        Z && K.focus()
    };
    return {
        init: C
    }
});