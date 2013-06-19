/*pub-1|2013-05-17 16:18:00*/ var TMall = window.TMall || {};
TMall.THeader = function() {
    var b = KISSY,
        d = b.DOM,
        a = b.Event,
        g = b.UA.ie,
        e = document,
        c = "click";
    var f = function() {
        var t = false,
            o, p, q, r, i, s, m, l = '<p><span  class="j_MallSearchType" data-type="p">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5546\u54c1</em></span></p><p><span class="j_MallSearchType" data-type="s">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5e97\u94fa</em></span></p>',
            n = '<p class="quickSearchTip"><i></i>\u6309\u5feb\u6377\u952e <em>shift</em> + <em>?</em> \u53ef\u4ee5\u968f\u65f6\u6253\u5f00\u5feb\u6377\u641c\u7d22</p>';

        function k(y) {
            var v = "http://log.mmstat.com/mallsearch?",
                u = y.split(","),
                x = {
                    q: u[0] || "",
                    wq: u[1] || "",
                    suggest: u[2] || "",
                    stats: u[3] || "",
                    pos: u[4] || "",
                    itemid: u[5] || "",
                    clickid: u[6] || "",
                    page_type: u[7] || "",
                    type: u[8] || "",
                    combo: u[9] || "",
                    active: "0",
                    searchtype: "search"
                }, w = b.param(x);
            if (window.goldlog && window.goldlog.record) {
                goldlog.record("/mallsearch", "tmallsearch", w, "H1449172242")
            } else {
                new Image().src = v + "goldlog=undefined" + w
            }
        }
        function h() {
            var u, w = l,
                y;

            function x(A) {
                var z = document.createElement("div");
                z.className = "mallSearch-tip";
                z.innerHTML = A;
                return z
            }
            function v(B, A, E, z) {
                var G = A + "_" + E,
                    C = d.create('<input type="hidden" value="' + G + '" name="xl" />'),
                    F = "xl_" + z + "_suggest",
                    D = d.create('<input type="hidden" value="' + F + '" name="from" />');
                d.append(C, B);
                d.append(D, B)
            }
            b.use("suggest", function(z, A) {
                var A = A || z.Suggest;
                if (!A) {
                    return
                }
                s = new A(o, "http://suggest.taobao.com/sug?area=b2c&code=utf-8", {
                    containerCls: "mall-suggest-container",
                    resultFormat: "",
                    offset: 0
                });
                u = s.container;
                s.on("beforeShow", function() {
                    if (!s.returnedData || !s.returnedData.cat) {
                        return
                    }
                    var G = s.returnedData.cat;
                    var E = "";
                    var B = 2;
                    for (var D = 0; D < (G.length < B ? G.length : B); D++) {
                        var F = G[D];
                        var C = F[2] || s.query;
                        E += '<li class="ks-suggest-extras-cate j_ExtrasCate" key="' + C + '" data-cateId="' + F[1] + '"><span class="ks-suggest-key">' + C + '</span><span class="ks-suggest-cate">\u5728<b>' + F[0] + "</b>\u5206\u7c7b\u4e0b\u641c\u7d22</span></li>"
                    }
                    if (E) {
                        d.prepend(d.create(E), s.content.firstChild)
                    }
                });
                s.on("updateFooter", function(E) {
                    var D = s.returnedData && s.returnedData.isShopName;
                    var C = "";
                    w = (D ? "" : l) + (C ? '<p><span class="j_MallSearchArea j_MallSearchTaobao" data-url="' + C + '">\u641c\u7d22<em>\u6dd8\u5b9d\u7f51</em> \u201c<b>{{keyword}}</b>\u201d </span></p>' : "");
                    if (!w) {
                        return
                    }
                    var B = w.replace(/{{keyword}}/g, s.query);
                    s.footer.appendChild(x(B));
                    s.footer.appendChild(d.create(n));
                    if (z.UA.ie < 8) {
                        d.css(s.content, "display", "block");
                        if (!d.text(s.content)) {
                            d.css(s.content, "display", "none")
                        }
                    }
                    if (z.UA.ie < 7) {
                        z.each(z.query("b", z.get(".mallSearch-tip")), function(F) {
                            if (d.width(F) > 300) {
                                d.width(F, 300)
                            }
                        })
                    }
                });
                if (!(y = d.get("#J_MallSearchStyle"))) {
                    y = d.create('<input id="J_MallSearchStyle" type="hidden" value="" name="style" />');
                    d.append(y, i)
                }
                a.on(s.footer, "click", function(E) {
                    var J = E || window.event,
                        F = J.target || J.srcElement,
                        K = d.parent(F, function(M) {
                            return d.hasClass(M, "j_MallSearchType")
                        }),
                        G = d.parent(F, function(M) {
                            return d.hasClass(M, "j_MallSearchArea")
                        });
                    if (K || d.hasClass(F, "j_MallSearchType")) {
                        var B = K || F,
                            I = d.attr(B, "data-type") || "p",
                            H = o.value + "," + o.value + ",1_" + (I == "s" ? "2" : "1") + ",,1,topsearch," + (I == "s" ? "shopsearch" : "spusearch") + "," + I + ",20,suggest";
                        y.value = I == "s" ? "w" : "g";
                        k(H);
                        var D = (I == "s" ? "2" : "1");
                        v(i, o.value, D, D);
                        i.submit()
                    } else {
                        if (G || d.hasClass(F, "j_MallSearchArea")) {
                            var L = G || F,
                            debugger
                                C = d.attr(L, "data-url") || "http://list.tmall.com/search_dispatcher.htm";
                            i.setAttribute("action", C);
                            if (d.hasClass(L, "j_MallSearchTaobao")) {
                                j(i, {
                                    sort: "",
                                    cat: "",
                                    style: "grid"
                                })
                            }
                            i.submit()
                        }
                    }
                    J.halt()
                });
                a.on(s.footer, "mouseenter mouseleave", function() {
                    d.toggleClass(s.selectedItem, "ks-selected")
                });
                s.on("itemSelect", function() {
                    var E = d.query("li", s.container),
                        K = 0,
                        H = 0,
                        B = 0,
                        G = "",
                        I = s.query || "",
                        J = p.value == "s" ? 2 : 1,
                        C;
                    for (var D = 0, F = E.length; D < F; D++) {
                        if (d.hasClass(E[D], "j_ExtrasCate")) {
                            H++
                        }
                        if (d.hasClass(E[D], "ks-selected")) {
                            B = K = D + 1;
                            G = d.text(E[D])
                        }
                    }
                    B = B - H;
                    var L = d.attr(s.selectedItem, "data-cateId");
                    if (L) {
                        q.value = L;
                        C = G + "," + I + ",2_" + K + ",2_" + K + "," + K + "," + G + ",catpre," + J + ",5,suggest";
                        v(i, I, K, 1)
                    } else {
                        C = G + "," + I + ",0_" + B + ",0_" + B + "," + B + "," + G + "," + G + "," + J + ",5,suggest";
                        v(i, I, B, 1)
                    }
                    k(C)
                })
            })
        }
        function j(w, x) {
            function u(y, z) {
                var A = document.createElement("input");
                A.setAttribute("type", "hidden");
                A.setAttribute("name", y);
                A.setAttribute("value", z);
                return A
            }
            for (var v in x) {
                if (!w[v]) {
                    w.appendChild(u(v, x[v]))
                } else {
                    w[v].value = x[v]
                }
            }
        }
        return {
            init: function(A) {
                var z = b.get("#tmallSearch") || b.get("#mallSearch");
                if (!z) {
                    return
                }
                var w = "",
                    v = false,
                    y = false;
                    debugger
                o = b.get("#mq");
                r = d.prev(o);
                p = b.get("#J_Type");
                q = b.get("#J_Cat");
                i = o.form;
                m = b.get("#J_SearchBtn") || b.get("button", z);
                a.on(o, "focus", function() {
                    r.style.color = "#ccc"
                });
                a.on(o, "blur", function(B) {
                    if (this.value == "" && !v) {
                        r.style.visibility = "visible";
                        r.style.color = "#666"
                    }
                    v = false
                });
                a.on(o, "keydown", function(D) {
                    var C = D.keyCode;
                    if (C == 8 || C == 46) {
                        r.style.visibility = "hidden"
                    } else {
                        if (C == 13) {
                            if (!t) {
                                t = true;
                                var B = p.value == "s" ? 2 : 1,
                                    E = o.value + "," + o.value + ",,,1,topsearch,topsearch," + B + ",20,searchbutton";
                                k(E)
                            }
                            u()
                        } else {
                            if (C < 13 || (C > 41 && C < 112) || C > 123) {
                                r.style.visibility = "hidden"
                            }
                        }
                    }
                });
                a.on(o, "keyup", function(B) {
                    if (B.keyCode == 191 || B.keyCode == 229) {
                        this.value = this.value.replace(/[?,\uff1f]/g, "")
                    }
                });
                if (b.UA.opera) {
                    a.on(o, "keypress", function(B) {
                        if (y) {
                            y = false;
                            B.halt()
                        }
                    })
                }
                a.on(o, "keyup", function(C) {
                    var B = C.keyCode;
                    if (this.value == "") {
                        if (w != "" || !(B == 8 || B == 46)) {
                            r.style.visibility = "visible"
                        }
                    }
                });
                a.on(o, "mouseover", function(B) {
                    if (this.value != "") {
                        r.style.visibility = "hidden"
                    }
                });
                a.on(i, "submit", function(B) {
                    if ("" == b.trim(o.value)) {
                        B.halt()
                    }
                });
                i.submit = function() {
                    x(this);
                    m.click()
                };

                function x(B) {
                    if (document.all) {
                        B.fireEvent("onsubmit")
                    } else {
                        var C = document.createEvent("HTMLEvents");
                        C.initEvent("submit", true, true);
                        B.dispatchEvent(C)
                    }
                }
                a.on(m, "click", function() {
                    if (!t) {
                        t = true;
                        var C = p.value == "s" ? 2 : 1,
                            B = (i.search && i.search.value == "y") ? "topsearchshop" : "topsearch",
                            D = o.value + "," + o.value + ",,,1," + B + "," + B + "," + C + ",20,searchbutton";
                        k(D)
                    }
                    u()
                });

                function u() {
                    if ("" == b.trim(o.value)) {
                        r.innerHTML = "\u8bf7\u8f93\u5165\u5173\u952e\u5b57";
                        r.style.visibility = "visible";
                        C()
                    }
                    function C() {
                        var D = {
                            background: d.css(o, "background"),
                            borderLeftColor: d.css(o, "border-left-color"),
                            zIndex: d.css(o, "z-index")
                        };
                        d.css(o, {
                            background: "none #fff",
                            borderLeftColor: "#fdbd78",
                            zIndex: (b.UA.ie < 8 ? -1 : 0)
                        });
                        B(o, 4, function() {
                            d.css(o, D)
                        })
                    }
                    function B(E, D, F) {
                        if (D <= 0) {
                            if (F) {
                                F.call()
                            }
                            return
                        }
                        new b.Anim(E, {
                            backgroundColor: (D % 2 == 0 ? "#fdbd78" : "#fff")
                        }, 0.3, "easeNone", function() {
                            B(E, --D, F)
                        }).run()
                    }
                }
                h();
                A && o.focus()
            }
        }
    }();
    return f
}();