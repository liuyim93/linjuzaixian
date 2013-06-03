KISSY.add(V + "/mods/minisite", function (f, b, h) {
    var a = f.DOM,
		j = f.Event,
		c = f.Anim,
		g = f.UA.ie <= 9,
		d = f.UA.ie == 9,
		e = f.UA.ie == 6;
    var i = f.get("#J_Minisite") || f.get("#J_MiniSite");
    return {
        init: function () {
            if (i) {
                a.hasClass(i, "mv2") && (function () {
                    var v = this,
						q = v.anim,
						m = f.get(".j_MinisiteCon", i),
						p = f.get(".j_MinisitePrev", i),
						l = f.get(".j_MinisiteNext", i),
						o = "minisite-disable",
						s = a.query(".j_MinisitePanel", i),
						r = s.length,
						u = 0,
						t = 5,
						k = function () {
						    return a.innerWidth(i)
						}, n = function (y, w, x) {
						    var z = function () {
						        w = w || 0;
						        if (w == 0) {
						            a.addClass(p, o)
						        } else {
						            a.removeClass(p, o)
						        }
						        if (w == r - 1) {
						            a.addClass(l, o)
						        } else {
						            a.removeClass(l, o)
						        }
						    }, A = function () {
						        var C = k(),
									B = -(w || 0) * C;
						        a.css(m, {
						            width: (r * C + t) + "px"
						        });
						        s.each(function (D) {
						            a.css(D, {
						                width: C + "px"
						            })
						        });
						        if (y) {
						            a.css(m, {
						                left: B + "px"
						            });
						            z();
						            return
						        }
						        if (q) {
						            q.stop()
						        }
						        v.anim = f.Anim(m, {
						            left: B + "px"
						        }, 2, "easeOutStrong", function () {
						            z()
						        });
						        v.anim.run()
						    };
						    return !g || x ? A() : f.later(A, 600)
						};
                    if (r !== 1) {
                        j.on(p, "click", function (w) {
                            w.halt();
                            u !== 0 && n(false, --u, true)
                        });
                        j.on(l, "click", function (w) {
                            w.halt();
                            u !== r - 1 && n(false, ++u, true)
                        })
                    } else {
                        a.hide([p, l])
                    }
                    n();
                    LIST.msg.on("viewchange", function (w) {
                        n(false, u)
                    });
                    LIST.msg.fire("ie6Hover", {
                        classname: "mv2"
                    })
                })();
                a.hasClass(i, "mv3") && (function () {
                    function n() {
                        var r = a.get(".j_MinisiteShopsInner", i),
							t = a.innerWidth(r) - (parseInt(a.css(r, "paddingLeft") || 0) + parseInt(a.css(r, "paddingRight") || 0)),
							s = a.query(".j_MinisiteShop", i),
							q = 5;
                        (s.length > 1) && a.css([a.get(".j_MinisitePrev", i), a.get(".j_MinisiteNext", i)], {
                            visibility: "visible"
                        });
                        s.each(function (v) {
                            var u = 0;
                            f.each(v.children, function (w) {
                                if (w.tagName == "A") {
                                    u += a.outerWidth(w.children[0], true)
                                } else {
                                    if (w.tagName == "I") {
                                        u += a.outerWidth(w, true)
                                    }
                                }
                            });
                            a.css(a.get("ul", v), {
                                width: t - u - q
                            })
                        })
                    }
                    n();
                    f.use(V + "/widget/carousel", function (r, s) {
                        var q = new s(".minisite-shops", {
                            effect: "scrollx",
                            easing: "easeOutStrong",
                            steps: 1,
                            circular: false,
                            contentCls: "ks-switchable-content",
                            prevBtnCls: "j_MinisitePrev",
                            nextBtnCls: "j_MinisiteNext",
                            disableBtnCls: "minisite-btn-disable"
                        });
                        LIST.msg.on("viewchange", function (t) {
                            q.resetLayout();
                            n()
                        })
                    });
                    var k = a.get(".j_MinisiteBanner", i),
						l = a.get("img", k),
						p = a.get(".j_MinisiteBrandsiteName", i),
						o = a.get(".j_MinisiteLogo", i);
                    j.on([l, o], "mouseenter mouseleave", function (q) {
                        if (q.type == "mouseenter") {
                            a.css(p, {
                                textDecoration: "underline"
                            })
                        } else {
                            a.css(p, {
                                textDecoration: ""
                            })
                        }
                    });
                    f.use(V + "/widget/favbrand", function (q, r) {
                        new r({
                            container: i,
                            numEl: q.get(".j_CollectBrandNum", i),
                            cancelCls: "minisite-fav-collected"
                        })
                    });
                    if (e) {
                        var m = function (q) {
                            if (!(q && /.+\.png/.test(q.src))) {
                                return
                            }
                            a.css(q, {
                                filter: 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + q.src + '",enabled="true", sizinMethod="scale");',
                                position: "relative"
                            });
                            a.insert;
                            q.src = "http://120.192.31.164:7525/Images/spaceball.gif"
                        };
                        var o = a.get("img", a.get(".j_MinisiteLogo", i));
                        m(o);
                        LIST.msg.fire("ie6Hover", {
                            classname: "minisite-shops"
                        })
                    }
                })()
            }
        }
    }
}, {
    requires: ["switchable", "datalazyload"]
});