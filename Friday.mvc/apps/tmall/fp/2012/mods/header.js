/*pub-1|2013-03-29 09:56:09*/KISSY.add("2012/mods/header", function (D) {
    var D = KISSY, Q = D.DOM, O = D.Event, P = false, J, K, L, M, B, N, G, F = '<p><span  class="j_MallSearchType" data-type="p">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5546\u54c1</em></span></p><p><span class="j_MallSearchType" data-type="s">\u641c\u7d22 \u201c<b>{{keyword}}</b>\u201d <em>\u5e97\u94fa</em></span></p>', I = '<p class="quickSearchTip"><i></i>\u6309\u5feb\u6377\u952e <em>shift</em> + <em>?</em> \u53ef\u4ee5\u968f\u65f6\u6253\u5f00\u5feb\u6377\u641c\u7d22\u6846\uff0c\u8d76\u7d27\u8bd5\u8bd5\u5427~</p>';
    function E(V) {
        var S = "http://log.mmstat.com/mallsearch?", R = V.split(","), U = { q: R[0] || "", wq: R[1] || "", suggest: R[2] || "", stats: R[3] || "", pos: R[4] || "", itemid: R[5] || "", clickid: R[6] || "", page_type: R[7] || "", type: R[8] || "", combo: R[9] || "", active: "0", searchtype: "search" }, T = D.param(U);
        if (window.goldlog && window.goldlog.record) {
            goldlog.record("/mallsearch", "tmallsearch", T, "H1449172242")
        } else {
            new Image().src = S + "goldlog=undefined" + T
        }
    }
    function A() {
        var R, T = F, V;
        function U(X) {
            var W = document.createElement("div");
            W.className = "mallSearch-tip";
            W.innerHTML = X;
            return W
        }
        function S(Y, X, b, W) {
            var d = X + "_" + b, Z = Q.create('<input type="hidden" value="' + d + '" name="xl" />'), c = "xl_" + W + "_suggest", a = Q.create('<input type="hidden" value="' + c + '" name="from" />');
            Q.append(Z, Y);
            Q.append(a, Y)
        }
        //2013-06-16 wanghaichuan hide suggest
        //if (D.Suggest && D.Suggest.version >= 1.1) {
        if(false){
            N = new D.Suggest(J, "http://suggest.taobao.com/sug?area=b2c&code=utf-8", { containerCls: "mall-suggest-container", resultFormat: "", offset: 0 });
            R = N.container;
            N.on("beforeShow", function () {
                if (!N.returnedData || !N.returnedData.cat) {
                    return
                }
                var b = N.returnedData.cat;
                var Z = "";
                var W = 2;
                for (var Y = 0; Y < (b.length < W ? b.length : W); Y++) {
                    var a = b[Y];
                    var X = a[2] || N.query;
                    Z += '<li class="ks-suggest-extras-cate j_ExtrasCate" key="' + X + '" data-cateId="' + a[1] + '"><span class="ks-suggest-key">' + X + '</span><span class="ks-suggest-cate">\u5728<b>' + a[0] + "</b>\u5206\u7c7b\u4e0b\u641c\u7d22</span></li>"
                }
                if (Z) {
                    Q.prepend(Q.create(Z), N.content.firstChild)
                }
            });
            N.on("updateFooter", function (Y) {
                var X = N.returnedData && N.returnedData.isShopName;
                T = X ? "" : F;
                if (!T) {
                    return
                }
                var W = T.replace(/{{keyword}}/g, N.query);
                N.footer.appendChild(U(W));
                N.footer.appendChild(Q.create(I));
                if (D.UA.ie < 8) {
                    Q.css(N.content, "display", "block");
                    if (!Q.text(N.content)) {
                        Q.css(N.content, "display", "none")
                    }
                }
                if (D.UA.ie < 7) {
                    D.each(D.query("b", D.get(".mallSearch-tip")), function (Z) {
                        if (Q.width(Z) > 300) {
                            Q.width(Z, 300)
                        }
                    })
                }
            });
            if (!(V = Q.get("#J_MallSearchStyle"))) {
                V = Q.create('<input id="J_MallSearchStyle" type="hidden" value="" name="style" />');
                Q.append(V, B)
            }
            O.on(N.footer, "click", function (b) {
                var Z = b || window.event, a = Z.target || Z.srcElement, Y = Q.parent(a, function (e) {
                    return Q.hasClass(e, "j_MallSearchType")
                });
                if (Y || Q.hasClass(a, "j_MallSearchType")) {
                    var W = Y || a, X = Q.attr(W, "data-type") || "p", d = J.value + "," + J.value + ",1_" + (X == "s" ? "2" : "1") + ",,1,topsearch," + (X == "s" ? "shopsearch" : "spusearch") + "," + X + ",20,suggest";
                    V.value = X == "s" ? "w" : "g";
                    E(d);
                    var c = (X == "s" ? "2" : "1");
                    S(B, J.value, c, c);
                    B.submit()
                }
                Z.halt()
            });
            O.on(N.footer, "mouseenter mouseleave", function () {
                Q.toggleClass(N.selectedItem, "ks-selected")
            });
            N.on("itemSelect", function () {
                var Z = Q.query("li", N.container), f = 0, c = 0, W = 0, b = "", d = N.query || "", e = K.value == "s" ? 2 : 1, X;
                for (var Y = 0, a = Z.length; Y < a; Y++) {
                    if (Q.hasClass(Z[Y], "j_ExtrasCate")) {
                        c++
                    }
                    if (Q.hasClass(Z[Y], "ks-selected")) {
                        W = f = Y + 1;
                        b = Q.text(Z[Y])
                    }
                }
                W = W - c;
                var g = Q.attr(N.selectedItem, "data-cateId");
                if (g) {
                    L.value = g;
                    X = b + "," + d + ",2_" + f + ",2_" + f + "," + f + "," + b + ",catpre," + e + ",5,suggest";
                    S(B, d, f, 1)
                } else {
                    X = b + "," + d + ",0_" + W + ",0_" + W + "," + W + "," + b + "," + b + "," + e + ",5,suggest";
                    S(B, d, W, 1)
                }
                E(X)
            })
        }
    }
    function C(T, U) {
        function R(V, W) {
            var X = document.createElement("input");
            X.setAttribute("type", "hidden");
            X.setAttribute("name", V);
            X.setAttribute("value", W);
            return X
        }
        for (var S in U) {
            if (!T[S]) {
                T.appendChild(R(S, U[S]))
            } else {
                T[S].value = U[S]
            }
        }
    }
    function H() {
        setTimeout(function () {
            if (J.value == "") {
                M.style.visibility = "visible"
            }
        }, 100)
    }
    return { init: function (W) {
        if (!D.get("#mallSearch")) {
            return
        }
        var T = "", S = false, V = false;
        debugger
        J = D.get("#mq");
        M = Q.prev(J);
        K = D.get("#J_Type");
        L = D.get("#J_Cat");
        B = J.form;
        G = D.get("#mallSearch button");
        H();
        O.on(J, "focus", function () {
            M.style.color = "#ccc"
        });
        O.on(J, "blur", function (X) {
            if (this.value == "" && !S) {
                M.style.visibility = "visible";
                M.style.color = "#666"
            }
            S = false
        });
        O.on(J, "keydown", function (Z) {
            var Y = Z.keyCode;
            if (Y == 8 || Y == 46) {
                M.style.visibility = "hidden"
            } else {
                if (Y == 13) {
                    if (!P) {
                        P = true;
                        var X = K.value == "s" ? 2 : 1, a = J.value + "," + J.value + ",,,1,topsearch,topsearch," + X + ",20,searchbutton";
                        E(a)
                    }
                    R()
                } else {
                    if (Y < 13 || (Y > 41 && Y < 112) || Y > 123) {
                        M.style.visibility = "hidden"
                    }
                }
            }
        });
        O.on(J, "keyup", function (X) {
            if (X.keyCode == 191 || X.keyCode == 229) {
                this.value = this.value.replace(/[?,\uff1f]/g, "")
            }
        });
        if (D.UA.opera) {
            O.on(J, "keypress", function (X) {
                if (V) {
                    V = false;
                    X.halt()
                }
            })
        }
        O.on(J, "keyup", function (Y) {
            var X = Y.keyCode;
            if (this.value == "") {
                if (T != "" || !(X == 8 || X == 46)) {
                    M.style.visibility = "visible"
                }
            }
        });
        O.on(J, "mouseover", function (X) {
            if (this.value != "") {
                M.style.visibility = "hidden"
            }
        });
        O.on(B, "submit", function (X) {
            if ("" == D.trim(J.value) && !B.redirect) {
                X.halt()
            }
        });
        B.submit = function () {
            U(this);
            G.click()
        };
        function U(X) {
            if (document.all) {
                X.fireEvent("onsubmit")
            } else {
                var Y = document.createEvent("HTMLEvents");
                Y.initEvent("submit", true, true);
                X.dispatchEvent(Y)
            }
        }
        O.on(G, "click", function (Y) {
            if (!P) {
                P = true;
                var X = K.value == "s" ? 2 : 1, Z = J.value + "," + J.value + ",,,1,topsearch,topsearch," + X + ",20,searchbutton";
                E(Z)
            }
            R()
        });
        function R() {
            if (J.value != "" && B.redirect) {
                Q.remove(B.redirect)
            }
            if ("" == D.trim(J.value) && !B.redirect) {
                M.innerHTML = "\u8bf7\u8f93\u5165\u5173\u952e\u5b57";
                M.style.visibility = "visible";
                Y()
            }
            function Y() {
                var Z = { background: Q.css(J, "background"), borderLeftColor: Q.css(J, "border-left-color"), zIndex: Q.css(J, "z-index") };
                Q.css(J, { background: "none #fff", borderLeftColor: "#fdbd78", zIndex: (D.UA.ie < 8 ? -1 : 0) });
                X(J, 4, function () {
                    Q.css(J, Z)
                })
            }
            function X(a, Z, b) {
                if (Z <= 0) {
                    if (b) {
                        b.call()
                    }
                    return
                }
                new D.Anim(a, { backgroundColor: (Z % 2 == 0 ? "#fdbd78" : "#fff") }, 0.3, "easeNone", function () {
                    X(a, --Z, b)
                }).run()
            }
        }
        A();
        W && J.focus()
    } 
    }
}, { requires: ["suggest"] });
