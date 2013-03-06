KISSY.add("2012/mods/brand", function (D, W, H) {
    var D = KISSY,
		U = D.DOM,
		X = D.Event,
		C = window,
		Y = document,
		Q = (D.UA.ie == 6),
		E = C.g_config,
		B = window.g_config.isTestEnv,
		T = "mouseenter",
		I = "mouseleave",
		G = "click";
    var P = {
        container: "#J_Brand",
        brands: "#J_BrandAd a",
        marks: ".j_CollectBrand",
        brandExpand: ".j_BrandExpand",
        brandList: ".brand-list",
        bigBrand: ".greatBrand",
        temai: ".temai"
    };
    var V;
    var N = false;
    var M = "";
    var F = [];
    var K = false;
    var L = "http://" + (B ? "ald.taobao.com" : "ald.taobao.com") + "/recommend.htm?appId=12002";
    var O = "http://" + (B ? "brand.daily.tmall.net" : "brand.tmall.com") + "/ajax/brandAddToFav.htm";
    var J = "http://" + (B ? "brand.daily.tmall.net" : "brand.tmall.com") + "/ajax/homePageGetBrand.htm";
    var A = "http://" + (~location.host.indexOf(".net") ? "login.daily.taobao.net" : "login.taobao.com") + "/member/logout.jhtml";

    function R(Z) {
        var S = this;
        S.config = D.merge(P, Z || {});
        S._init()
    }
    D.mix(R.prototype, {
        brandRecommend: function () {
            var Z = D.unparam(Y.location.search.substring(1));
            var S = Z.uid || "";
            MFP.POC.add("ald_brand_start");
            D.jsonp(L, {
                uid: S,
                t: +new Date
            }, function (c) {
                MFP.POC.add("ald_brand_end");
                if (!c || !c.bBrands || !c.sBrands) {
                    return
                }
                if (c.atpanelUrl && c.atpanelUrl !== "") {
                    MFP.ATP.aldAc(c.atpanelUrl)
                }
                var b = c.bBrands;
                var a = c.sBrands;
                var e = 50,
					d = 50;
                D.each(U.query(V.brands), function (g) {
                    var o, k;
                    var j = U.children(g);
                    if (U.attr(g, "keep") == "true") {
                        return
                    }
                    if (U.hasClass(g, "brandAd-b")) {
                        o = b[0];
                        k = '<img width="130" height="225" src="' + H.randomImgUrl(o.logo) + '" alt="" />';
                        b.splice(0, 1)
                    } else {
                        if (U.hasClass(g, "brandAd-s")) {
                            o = a[0];
                            var f = o.logoPicType == "sBrand" ? "130" : "90";
                            var n = o.logoPicType == "sBrand" ? "82" : "45";
                            var m = o.logoPicType == "sBrand" ? "" : 'class="logo"';
                            k = "<img " + m + ' width="' + f + '" height="' + n + '" src="' + H.randomImgUrl(o.logo) + '" alt="" />';
                            a.splice(0, 1)
                        } else {
                            return
                        }
                    }
                    var i = o.actDesc !== "" ? o.actDesc : o.brandDesc;
                    var l = i !== "" ? i : o.brandName;
                    U.attr(g, "href", o.linkedUrl);
                    U.attr(g, "title", l);
                    U.attr(j[3], "data-brandid", o.brandId);
                    U.attr(j[3], "offset-brandfly", "17,0");
                    U.html(j[1], "[" + o.brandName + "]");
                    U.html(j[2], i);
                    if (o.isCol && N) {
                        U.removeClass(j[3], "mark j_CollectBrand");
                        U.html(U.get("b", j[3]), "\u60a8\u5df2\u5173\u6ce8\u8be5\u54c1\u724c")
                    } else {
                        U.addClass(j[3], "mark");
                        if (!U.get("b", j[3])) {
                            U.append(U.create("<b>\u5173\u6ce8</b>"), j[3])
                        }
                    }
                    var h = U.create(k);
                    U.prepend(h, g);
                    U.hide(h);
                    setTimeout(function () {
                        D.one(j[0]).fadeOut(0.5);
                        D.one(h).fadeIn(0.8)
                    }, e);
                    e += d
                })
            })
        },
        initBrandBar: function () {
            var S = 32;

            function Z() {
                if (!D.onTgalleryReady) {
                    if (S > 0) {
                        setTimeout(Z, 512)
                    }
                    S--;
                    return
                }
                D.use("tgallery/department/common/brandbar", function (a, c) {
                    var b = function (f) {
                        var d = U.get("s", f);
                        var e = U.get("b", f);
                        U.css(f, {
                            opacity: "0.9"
                        });
                        U.css(d, {
                            "background-color": "#b90000"
                        });
                        U.html(e, "\u60a8\u5df2\u5173\u6ce8\u8be5\u54c1\u724c");
                        U.removeClass(f, "mark");
                        X.detach(d, "click")
                    };
                    c.on("success", function (d) {
                        if (d.flyNode) {
                            b(d.flyNode)
                        }
                    });
                    c.on("error", function (d) {
                        if (d.code && d.code == "-1" && d.flyNode) {
                            b(d.flyNode)
                        }
                    })
                })
            }
            Z()
        },
        brandHover: function () {
            var S = this;
            D.each(U.query(V.brands), function (Z) {
                X.on(Z, "mouseenter mouseleave", function (b) {
                    var a = b.type === "mouseenter" ? 0.9 : 0;
                    var d = U.get("span", Z);
                    if (U.hasClass(d, "mark") && !d.isMarking && !E.closeExtra) {
                        b.halt();
                        if (d.hoverTimer) {
                            clearTimeout(d.hoverTimer)
                        }
                        d.hoverTimer = setTimeout(function () {
                            new D.Anim(d, {
                                opacity: a
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                    if (D.UA.ie) {
                        var c = b.type === "mouseenter" ? "#BD0000" : "#999";
                        if (Z.hoverTimer) {
                            clearTimeout(Z.hoverTimer)
                        }
                        Z.hoverTimer = setTimeout(function () {
                            new D.Anim(Z, {
                                color: c
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                })
            })
        },
        brandMark: function () {
            var S = this;
            D.each(U.query(V.marks), function (a) {
                var Z = U.get("s", a);
                X.on(a, "mouseenter mouseleave", function (b) {
                    var c = b.type === "mouseenter" ? "#b90000" : "#C3C3C3";
                    if (U.hasClass(a, "mark") && !a.isMarking && !E.closeExtra) {
                        if (Z.markTimer) {
                            clearTimeout(Z.markTimer)
                        }
                        Z.markTimer = setTimeout(function () {
                            new D.Anim(Z, {
                                "background-color": c
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                });
                X.on(Z, "mouseenter mouseleave", function (c) {
                    var d = c.type === "mouseenter" ? "108" : "10px";
                    var b = c.type === "mouseenter" ? "0.6" : "0";
                    if (!U.hasClass(a, "mark") && !a.isMarking && !E.closeExtra) {
                        if (Z.markTimer) {
                            clearTimeout(Z.markTimer)
                        }
                        Z.markTimer = setTimeout(function () {
                            new D.Anim(U.get("b", a), {
                                width: d,
                                opacity: b
                            }, 0.5, "easeOutStrong").run()
                        }, 200)
                    }
                })
            })
        },
        bigBrandHover: function () {
            X.on(V.bigBrand, "mouseenter mouseleave", function (Z) {
                var b = U.get("p", V.bigBrand);
                if (!D.UA.ie) {
                    U.toggleClass(b, "hovered")
                } else {
                    var S = Z.type === "mouseenter" ? 0 : 27;
                    var a = Z.type === "mouseenter" ? "#fff" : "#513a16";
                    if (b.moveTimer) {
                        clearTimeout(b.moveTimer)
                    }
                    b.moveTimer = setTimeout(function () {
                        D.Anim(U.get("b", b), {
                            color: a
                        }, 0.5, "easeOutStrong").run();
                        D.Anim(U.get("span", b), {
                            top: S
                        }, 0.5, "easeOutStrong").run()
                    }, 200)
                }
            })
        },
        temaiHover: function () {
            X.on(V.temai, "mouseenter mouseleave", function (a) {
                var S = U.get("p", V.temai);
                if (!D.UA.ie) {
                    U.toggleClass(S, "hovered")
                } else {
                    var Z = a.type === "mouseenter" ? 0 : 20;
                    if (S.moveTimer) {
                        clearTimeout(S.moveTimer)
                    }
                    S.moveTimer = setTimeout(function () {
                        D.Anim(U.get("span", S), {
                            top: Z
                        }, 0.5, "easeOutStrong").run()
                    }, 200)
                }
            })
        },
        _getLogin: function () {
            TB.Global.loginStatusReady(function (S) {
                N = S.isLogin;
                M = S.nick;
                if (M != "") {
                    U.html(".j_UserName", M)
                }
            })
        },
        _init: function () {
            var S = this;
            V = S.config;
            D.ready(function () {
                if (!E.closeExtra) {
                    S.brandRecommend()
                }
                S._getLogin();
                S.brandHover();
                S.initBrandBar();
                S.brandMark();
                S.bigBrandHover();
                S.temaiHover()
            })
        }
    });
    return R
}, {
    requires: ["template", "2012/util/util"]
});