var TMall = window.TMall || {};
TMall.THeader = function () {
    var f = KISSY, p = f.DOM, s = f.Event, r = false, l, e, h, i, c, g, a, k = ~location.host.indexOf("daily.") ? "assets.daily.taobao.net" : "a.tbcdn.cn", m = '<p><span class="j_MallSearchType" data-type="p">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5546\u54c1</em></span></p><p><span class="j_MallSearchType" data-type="s">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5e97\u94fa</em></span></p>', j = '<p class="quickSearchTip"><i></i>\u6309\u5feb\u6377\u952e <em>shift</em> + <em>?</em> \u53ef\u4ee5\u968f\u65f6\u6253\u5f00\u5feb\u6377\u641c\u7d22\u6846\uff0c\u8d76\u7d27\u8bd5\u8bd5\u5427~</p>';
    function q(x) {
        var u = "http://log.mmstat.com/mallsearch?", t = x.split(","), w = { q: t[0] || "", wq: t[1] || "", suggest: t[2] || "", stats: t[3] || "", pos: t[4] || "", itemid: t[5] || "", clickid: t[6] || "", page_type: t[7] || "", type: t[8] || "", combo: t[9] || "", active: "0", searchtype: "search" }, v = f.param(w);
        if (typeof __header_atpanel_param !== "undefined") {
            u = u + "&" + __header_atpanel_param
        }
        if (window.goldlog && window.goldlog.record) {
            goldlog.record("/mallsearch", "tmallsearch", v, "H1449172242")
        } else {
            new Image().src = u + "goldlog=undefined" + v
        }
    }
    function o() {
        var t, v = m, y;
        var x = p.attr(l, "data-page") == "3c";
        function w(A) {
            var z = document.createElement("div");
            z.className = "mallSearch-tip";
            z.innerHTML = A;
            return z
        }
        function u(B, A, E, z) {
            var G = A + "_" + E, C = p.create('<input type="hidden" value="' + G + '" name="xl" />'), F = "xl_" + z + "_suggest", D = p.create('<input type="hidden" value="' + F + '" name="from" />');
            p.append(C, B);
            p.append(D, B)
        }
        f.use("suggest", function (z, A) {
            var A = A || z.Suggest;
            if (!A) {
                return
            }
            g = new A(l, "http://suggest.taobao.com/sug?area=" + (x ? "3c" : "b2c") + "&code=utf-8", { containerCls: "mall-suggest-container", resultFormat: "", offset: 0 });
            t = g.container;
            g.on("beforeShow", function () {
                if (!g.returnedData || !g.returnedData.cat) {
                    return
                }
                var G = g.returnedData.cat;
                var E = "";
                var B = 2;
                for (var D = 0; D < (G.length < B ? G.length : B); D++) {
                    var F = G[D];
                    var C = F[2] || g.query;
                    E += '<li class="ks-suggest-extras-cate j_ExtrasCate" key="' + C + '" data-cateId="' + F[1] + '"><span class="ks-suggest-key">' + C + '</span><span class="ks-suggest-cate">\u5728<b>' + F[0] + "</b>\u5206\u7c7b\u4e0b\u641c\u7d22</span></li>"
                }
                if (E) {
                    p.prepend(p.create(E), g.content.firstChild)
                }
            });
            g.on("updateFooter", function (D) {
                var C = g.returnedData && g.returnedData.isShopName;
                v = C ? "" : m;
                if (!v) {
                    return
                }
                var B = v.replace(/{{keyword}}/g, g.query);
                g.footer.appendChild(w(B));
                g.footer.appendChild(p.create(j));
                if (z.UA.ie < 8) {
                    p.css(g.content, "display", "block");
                    if (!p.text(g.content)) {
                        p.css(g.content, "display", "none")
                    }
                }
                if (z.UA.ie < 7) {
                    z.each(z.query("b", z.get(".mallSearch-tip")), function (E) {
                        if (p.width(E) > 300) {
                            p.width(E, 300)
                        }
                    })
                }
            });
            if (!(y = p.get("#J_MallSearchStyle"))) {
                y = p.create('<input id="J_MallSearchStyle" type="hidden" value="" name="style" />');
                p.append(y, c)
            }
            s.on(g.footer, "click", function (G) {
                var E = G || window.event, F = E.target || E.srcElement, D = p.parent(F, function (J) {
                    return p.hasClass(J, "j_MallSearchType")
                });
                if (D || p.hasClass(F, "j_MallSearchType")) {
                    var B = D || F, C = p.attr(B, "data-type") || "p", I = l.value + "," + l.value + ",1_" + (C == "s" ? "2" : "1") + ",,1,topsearch," + (C == "s" ? "shopsearch" : "spusearch") + "," + C + ",20,suggest";
                    y.value = C == "s" ? "w" : "g";
                    q(I);
                    var H = (C == "s" ? "2" : "1");
                    u(c, l.value, H, H);
                    c.submit()
                }
                E.halt()
            });
            s.on(g.footer, "mouseenter mouseleave", function () {
                p.toggleClass(g.selectedItem, "ks-selected")
            });
            g.on("itemSelect", function () {
                var E = p.query("li", g.container), K = 0, H = 0, B = 0, G = "", I = g.query || "", J = e.value == "s" ? 2 : 1, C;
                for (var D = 0, F = E.length; D < F; D++) {
                    if (p.hasClass(E[D], "j_ExtrasCate")) {
                        H++
                    }
                    if (p.hasClass(E[D], "ks-selected")) {
                        B = K = D + 1;
                        G = p.text(E[D])
                    }
                }
                B = B - H;
                var L = p.attr(g.selectedItem, "data-cateId");
                if (L) {
                    h.value = L;
                    C = G + "," + I + ",2_" + K + ",2_" + K + "," + K + "," + G + ",catpre," + J + ",5,suggest";
                    u(c, I, K, 1)
                } else {
                    C = G + "," + I + ",0_" + B + ",0_" + B + "," + B + "," + G + "," + G + "," + J + ",5,suggest";
                    u(c, I, B, 1)
                }
                q(C)
            });
            s.on(l, "webkitspeechchange", function (B) {
                goldlog.emit("tmall_speech_change", { value: B.originalEvent.results[0].utterance })
            })
        })
    }
    function n(v, w) {
        function t(x, y) {
            var z = document.createElement("input");
            z.setAttribute("type", "hidden");
            z.setAttribute("name", x);
            z.setAttribute("value", y);
            return z
        }
        for (var u in w) {
            if (!(v[u] && v[u].nodeName)) {
                v.appendChild(t(u, w[u]))
            } else {
                v[u].value = w[u]
            }
        }
    }
    function b() {
        setTimeout(function () {
            i.innerHTML = "搜索 商品/店铺";
            if (l.value == "") {
                i.style.visibility = "visible"
            }
        }, 100)
    }
    var d = function (y) {
        if (!f.get("#mallSearch")) {
            return
        }
        var v = "", u = false, x = false;
       //debugger
        l = f.get("#mq");
        i = p.prev(l);
        e = f.get("#J_Type");
        h = f.get("#J_Cat");
        c = l.form;
        a = f.get("#mallSearch button");
        s.on(l, "focus", function (z) {
            i.style.color = "#ccc"
        });
        s.on(l, "blur", function (z) {
            if (this.value == "" && !u) {
                i.style.visibility = "visible";
                i.style.color = "#666"
            }
            u = false
        });
        s.on(l, "keydown", function (B) {
            var A = B.keyCode;
            if (A == 8 || A == 46) {
                i.style.visibility = "hidden"
            } else {
                if (A == 13) {
                    if (!r) {
                        r = true;
                        var z = e.value == "s" ? 2 : 1, C = l.value + "," + l.value + ",,,1,topsearch,topsearch," + z + ",20,searchbutton";
                        q(C)
                    }
                    t()
                } else {
                    if (A < 13 || (A > 41 && A < 112) || A > 123) {
                        i.style.visibility = "hidden"
                    }
                }
            }
        });
        s.on(l, "keyup", function (z) {
            if (z.keyCode == 191 || z.keyCode == 229) {
                this.value = this.value.replace(/[?,\uff1f]/g, "")
            }
        });
        s.on(l, "keypress", function (z) {
            if (x) {
                x = false;
                z.halt()
            }
        });
        s.on(l, "keyup", function (A) {
            var z = A.keyCode;
            if (this.value == "") {
                if (v != "" || !(z == 8 || z == 46)) {
                    i.style.visibility = "visible"
                }
            }
        });
        s.on(l, "mouseover", function (z) {
            if (this.value != "") {
                i.style.visibility = "hidden"
            }
        });
        s.on(c, "submit", function (z) {
            if ("" == f.trim(l.value)) {
                z.halt()
            }
        });
        c.submit = function () {
            w(this);
            a.click()
        };
        function w(z) {
            if (document.all) {
                z.fireEvent("onsubmit")
            } else {
                var A = document.createEvent("HTMLEvents");
                A.initEvent("submit", true, true);
                z.dispatchEvent(A)
            }
        }
        s.on(a, "click", function () {
            if (!r) {
                r = true;
                var z = e.value == "s" ? 2 : 1, A = l.value + "," + l.value + ",,,1,topsearch,topsearch," + z + ",20,searchbutton";
                q(A)
            }
            t()
        });
        function t() {
            if ("" == f.trim(l.value)) {
                i.innerHTML = "请输入关键字";
                i.style.visibility = "visible";
                A()
            }
            function A() {
                var B = { background: p.css(l, "background"), borderLeftColor: p.css(l, "border-left-color"), zIndex: p.css(l, "z-index") };
                p.css(l, { background: "none #fff", borderLeftColor: "#fdbd78", zIndex: (f.UA.ie < 8 ? -1 : 0) });
                z(l, 4, function () {
                    p.css(l, B)
                })
            }
            function z(C, B, D) {
                if (B <= 0) {
                    if (D) {
                        D.call()
                    }
                    return
                }
                new f.Anim(C, { backgroundColor: (B % 2 == 0 ? "#fdbd78" : "#fff") }, 0.3, "easeNone", function () {
                    z(C, --B, D)
                }).run()
            }
        }
        o();
        b();
        y && l.focus()
    };
    d.init = function (t) {
        d(t);
        if (f.UA.ie === 6) {
            f.get(".subLogo") && s.on(f.get(".subLogo"), "mouseenter mouseleave", function () {
                p.toggleClass(this, "subLogo-hover")
            })
        }
        var v = false;
        var u = function () {
            if (v) {
                return
            }
            var y = arguments[0] || window.event, x = y.keyCode;
            var w = y.target;
            if (w && (w.nodeName === "INPUT" || w.nodeName === "TEXTAREA") && w.id != "mq") {
                return
            }
            if (y.shiftKey && (x == 191 || x == 229)) {
                f.getScript("http://" + k + "/apps/tmall/header/common/quicksearch.css?t=20130426", function () {
                    f.getScript("http://" + k + "/apps/tmall/header/common/quicksearch.js?t=20130426", function () {
                        KISSY.use("tml/quickSearch", function (z) {
                            try {
                                new z.QuickSearch()
                            } catch (A) {
                            }
                        })
                    })
                });
                v = true;
                s.detach && s.detach(document.body, "keyup", arguments.callee)
            }
        };
        s.on(document.body, "keyup", u)
    };
    d.switchTo = function () {
    };
    d.setNav = function (t) {
        if (!p.get("#J_MallNavCon")) {
            return
        }
        f.each(p.query("#J_MallNavCon li"), function (u) {
            if (t == p.attr(u, "data-catId")) {
                u.className = "curChn";
                u.innerHTML = '<span class="item">' + p.text(u) + "</span>"
            }
        })
    };
    f.ready(function () {
        var t = p.query(".J_DirectPromo", ".subLogo-bd");
        if (t.length > 0) {
            KISSY.use("tml/directpromo", function (u, v) {
                v.on("success", function (w) {
                    if (w.data[0].content === "chaoshi") {
                        t[0].style.display = "block"
                    }
                });
                v.on("error", function () {
                });
                v.init([395])
            })
        }
    });
    return d
} (); 