(function (D, A) {
    if (D.util) {
        return
    }
    var C = /(\bspm=(\d+.){3})\w+\b/g;
    var B = Object.prototype.toString;
    D.util = {
        BASEURL: D.dev ? "http://localhost/apps/tmall/ald" : "http://a.tbcdn.cn/apps/tmall/ald",
        TIMESTAMP: "20120623",
        renders: {},
        add: function (H, G) {
            var E = D.util;
            if (H in E.renders) {
                A.log("render(" + H + ")\u5df2\u7ecf\u5b58\u5728\uff0c\u4e0d\u80fd\u91cd\u590d\u6dfb\u52a0");
                return
            }
            function I(F) {
                I.superclass.constructor.call(this, F)
            }
            A.extend(I, E.BaseRender);
            if (A.isFunction(G)) {
                G(I, E, A)
            }
            E.renders[H] = I;
            if (I.template) {
                I.tpl = E.juicer(I.template.replace(/\bALDCLS\b/g, "ald-" + H))
            }
            I.cssText && E.addStyleSheet(I.cssText);
            D.fire("renderLoadSuccess", {
                render: H,
                renderFn: I
            })
        },
        mockup: function (E) {
            var G = A.DOM;
            if (E.el) {
                return true
            }
            var H = G.get(E.render || E.renderAfter || E.renderBefore);
            if (H || A.isFunction(E.renderFn)) {
                var F = G.data(H, "ald-render-el-" + E.appId);
                if (!F) {
                    F = document.createElement("div");
                    F.className = "ald" + (E.showLoading ? " ald-loading" : "");
                    G.data(F, "ald-inited", true);
                    if (E.showLoading) {
                        F.innerHTML = "\u6b63\u5728\u52a0\u8f7d\u4e2d..."
                    }
                    if (E.renderFn) {
                        E.renderFn(F)
                    } else {
                        if (E.render) {
                            H.appendChild(F)
                        } else {
                            if (E.renderAfter) {
                                G.insertAfter(F, H)
                            } else {
                                H.parentNode.insertBefore(F, H)
                            }
                        }
                    }
                    G.data(H, "ald-render-el-" + E.appId, F)
                }
                E.el = F;
                return true
            } else {
                A.log("ALD:\u6307\u5b9a\u7684\u6e32\u67d3\u4f4d\u7f6e\u4e0d\u5b58\u5728\uff0c\u4e5f\u6ca1\u6709\u6307\u5b9arenderFn\u51fd\u6570");
                return false
            }
        },
        invokeRender: function (G, F, E) {
            var H = D.util,
				M = A.DOM;
            var L = E.appId;
            var K = H.getModuleConfig(L);
            E.showLoading = E.showLoading || true;
            if (!H.mockup(E)) {
                return
            }
            var J = function (P) {
                var O = E.el;
                var N = M.data(O, "ald-render-obj-" + E.appId);
                if (!N) {
                    N = new P(E);
                    M.data(O, "ald-render-obj-" + E.appId, N)
                }
                N.setData(E.data);
                D.fire("beforeRender", {
                    config: E,
                    render: N
                });
                N.exec();
                D.fire("afterRender", {
                    render: N,
                    config: E
                })
            };
            var I = H.renders[K.render];
            I ? J(I) : D.on("renderLoadSuccess", function (N) {
                if (K.render === N.render) {
                    J(N.renderFn);
                    D.detach("renderLoadSuccess", arguments.callee)
                }
            })
        },
        combineDOM: function (I, G, L) {
            var H = A.DOM,
				E, K = [],
				J = [],
				F = {};
            if (!I || !G || !L || !H.get(".ald-" + I) || !H.get(".ald-" + G)) {
                return
            }
            E = H.get(".ald-" + G);
            A.each(H.query(".ald-" + G + "-act", E), function (N) {
                var M = H.attr(N, "data-sellerid");
                var O = H.attr(N, "title");
                if (M) {
                    F[M] = O
                }
            });
            if (L.datalist) {
                A.each(L.datalist, function (M) {
                    K.push(M.sellerId)
                });
                E = H.get(".ald-" + I);
                A.each(H.query(".ald-" + I + "-info", E), function (N) {
                    var M = H.attr(H.query("a", N), "data-sellerid");
                    if (M && A.inArray(M, K)) {
                        J.push(M);
                        H.append(H.create('<div class="ald-' + I + '-act"><strong>\u6d3b\u52a8: </strong><span>' + (typeof F[M] === "string" ? F[M].split("-")[0] : "") + "</span></div>"), N)
                    }
                });
                E = H.get(".ald-" + G);
                A.each(H.query(".ald-" + G + "-act", E), function (N) {
                    var M = H.attr(N, "data-sellerid");
                    if (M && A.inArray(M, J)) {
                        H.remove(H.parent(N, "li"), E)
                    }
                });
                if (!H.query("li", E).length) {
                    H.remove(E)
                }
            } else {
                if (L.shopByZscore) {
                    A.each(L.shopByZscore, function (M) {
                        K.push(M.sellerId)
                    });
                    E = H.get(".ald-" + G);
                    A.each(H.query(".ald-" + G + "-act", E), function (N) {
                        var M = H.attr(N, "data-sellerid");
                        if (M && A.inArray(M, K)) {
                            J.push(M);
                            H.remove(H.parent(N, "li"), E)
                        }
                    });
                    if (!H.query("li", E).length) {
                        H.remove(E)
                    }
                    E = H.get(".ald-" + I);
                    A.each(H.query(".ald-" + I + "-info", E), function (N) {
                        var M = H.attr(H.query("a", N), "data-sellerid");
                        if (M && A.inArray(M, J)) {
                            H.append(H.create('<div class="ald-' + I + '-act"><strong>\u6d3b\u52a8: </strong><span>' + (typeof F[M] === "string" ? F[M].split("-")[0] : "") + "</span></div>"), N)
                        }
                    })
                }
            }
        },
        escapeSPM: function (F, G, E) {
            if (A.isPlainObject(F) && A.isString(F[G])) {
                F[G] = F[G].replace(C, "$1" + (E + 1))
            }
        },
        substitute: function (F, E) {
            return F.replace(/{(\w+)}/g, function (H, G) {
                return E[G] || ""
            })
        },
        adjustImages: function (J, F, K) {
            if (!A.isArray(J)) {
                J = [J]
            }
            var I = this.fitImage;
            for (var H = 0, E = J.length; H < E; H++) {
                var G = J[H];
                if (G.complete) {
                    I(G, F, K)
                } else {
                    G.onload = function () {
                        I(this, F, K)
                    }
                }
            }
        },
        fitImage: function (H, F, J) {
            var G = H.width;
            var E = H.height;
            var I = false;
            if (!G || !E) {
                return
            }
            if (G > F) {
                E = E * F / G;
                G = F;
                I = true
            }
            if (E > J) {
                G = G * J / E;
                E = J;
                I = true
            }
            if (I) {
                H.width = G;
                H.height = E
            }
        },
        addStyleSheet: function (G) {
            var F = document.createElement("style"),
				E = document.getElementsByTagName("head")[0];
            E.appendChild(F);
            if (F.styleSheet) {
                F.styleSheet.cssText = G
            } else {
                F.appendChild(document.createTextNode(G))
            }
        },
        substr: function (G, F, H) {
            if (!G) {
                return ""
            }
            F = F - 0;
            if (!F) {
                return G
            }
            var E = G.length;
            return G.substr(0, F) + (G.length > F ? (H || "...") : "")
        },
        csubstr: function (J, F, K) {
            if (!J) {
                return ""
            }
            F = F - 0;
            if (!F) {
                return J
            }
            var I = "";
            var H = 0;
            for (var G = 0, E = J.length; G < E; G++) {
                H += J.charCodeAt(G) > 255 ? 2 : 1;
                if (H > F) {
                    I += K || "...";
                    break
                }
                I += J.charAt(G)
            }
            return I
        }
    };
    D.util.addStyleSheet(".ald-word-spliter{display:inline-block;} a:hover .ald-word-spliter{ cursor: pointer; } .ald-itemlist{ overflow: hidden; } .ald-itemlist .ald-item{ float: left; overflow: hidden; } .ald-itemlist .ald-item .ald-title{ height: 32px; line-height: 16px; margin: 4px 0; overflow: hidden; } .ald-itemlist .ald-item .ald-title a{ color: #666; } .ald-itemlist .ald-item .ald-price,.ald-itemlist .ald-item .ald-macketPrice{ font-family: arial; color: #b5b5b5; } .ald-itemlist .ald-item .ald-price{ color: #c00; margin-right:10px;  } .ald-itemlist .ald-item .ald-rmb{ margin-right:2px; font-weight: normal;  } .ald-itemlist .ald-item .ald-meta{ height: 18px; line-height: 18px; overflow: hidden; white-space: nowrap; } .ald-rate{ background:url(http://img02.taobaocdn.com/tps/i2/T1yaLsXk8kXXauxx.j-60-174.png) no-repeat; width: 60px; height: 12px; overflow: hidden; display: block; } .ald-rate em{ visibility: hidden; } .ald-rate-45,.ald-rate-46,.ald-rate-47,.ald-rate-48,.ald-rate-49{ background-position: 0 -16px; } .ald-rate-4,.ald-rate-41,.ald-rate-42,.ald-rate-43,.ald-rate-44{ background-position: 0 -32px; } .ald-rate-35,.ald-rate-36,.ald-rate-37,.ald-rate-38,.ald-rate-39{ background-position: 0 -49px; } .ald-rate-3,.ald-rate-31,.ald-rate-32,.ald-rate-33,.ald-rate-34{ background-position: 0 -66px; } .ald-rate-25,.ald-rate-26,.ald-rate-27,.ald-rate-28,.ald-rate-29{ background-position: 0 -83px; } .ald-rate-2,.ald-rate-21,.ald-rate-22,.ald-rate-23,.ald-rate-24{ background-position: 0 -99px; } .ald-rate-15,.ald-rate-16,.ald-rate-17,.ald-rate-18,.ald-rate-19{ background-position: 0 -115px; } .ald-rate-1,.ald-rate-11,.ald-rate-12,.ald-rate-13,.ald-rate-14{ background-position: 0 -131px; } .ald-rate-05,.ald-rate-06,.ald-rate-07,.ald-rate-08,.ald-rate-09{ background-position: 0 -147px; } .ald-rate-0,.ald-rate-01,.ald-rate-02,.ald-rate-03,.ald-rate-04{ background-position: 0 -163px; }     ")
})(ALD, KISSY); 