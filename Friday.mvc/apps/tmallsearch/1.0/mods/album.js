KISSY.add(V + "/mods/album", function (e, a, l, d, i) {
    var j, k, g, b = -1,
		h = 3,
		f, c;
    return {
        switchView: function (p) {
            if (p === undefined) {
                p = j ? 0 : 1
            }
            if (p == j) {
                return
            }
            e.each(a.query(".count", k), function (s) {
                s.style.right = ""
            });
            e.each(a.query(".prod", k), function (s) {
                s.style.right = ""
            });
            j = p;
            if (j) {
                if (e.UA.ie) {
                    a.css(k, {
                        display: "none"
                    })
                } else {
                    a.css(k, {
                        overflow: "hidden",
                        height: a.height(k) + "px"
                    })
                }
                a.css(a.get("ul", k), {
                    height: "auto",
                    position: "static"
                });
                this.render(3);
                a.addClass(k, "open");
                a.addClass(a.get("i", a.get("#J_AlbumOpen", k)), "ui-more-expand-l-arrow");
                a.text(a.get("span", a.get("#J_AlbumOpen", k)), "\u6536\u8d77");

                function o() {
                    a.css(k, {
                        height: "auto",
                        overflow: "inherit",
                        display: "block"
                    })
                }
                if (e.UA.ie) {
                    o();
                    return
                }
                if (c) {
                    c.stop()
                }
                c = new i(k, {
                    height: k.scrollHeight + "px"
                }, 1.5, "easeBoth", o);
                c.run()
            } else {
                var r = g.list.slice(0, (b + 1) * h);
                window.atpanelFun("," + r[r.length - 1].subjectId + ",,,subject-close,7,subject-close,");
                if (c) {
                    c.stop()
                }
                var q = 225,
					m = a.height(k);

                function n() {
                    a.css(a.get("ul", k), {
                        height: "200px",
                        overflow: "hidden",
                        position: "relative"
                    });
                    a.removeClass(k, "open");
                    a.removeClass(a.get("i", a.get("#J_AlbumOpen", k)), "ui-more-expand-l-arrow");
                    a.text(a.get("span", a.get("#J_AlbumOpen", k)), "\u5c55\u5f00");
                    a.css(k, {
                        height: "auto",
                        overflow: "inherit",
                        marginTop: "0px"
                    });
                    a.scrollTop(a.scrollTop() - (m - q))
                }
                if (e.UA.ie) {
                    n();
                    return
                }
                c = new i(k, {
                    height: q + "px",
                    marginTop: (m - q) + "px"
                }, 0.5, "easeBoth", n);
                c.run()
            }
        },
        renderMore: function () {
            this.render(b + 4)
        },
        render: function (t, r) {
            var m = this;
            if (t <= b) {
                return
            }
            if (!f && g.list.length < (t + 1) * h && g.count > g.list.length) {
                f = true;
                e.use("ajax", function (w, u) {
                    var x = [];
                    w.each(g.list, function (y) {
                        x.push(y.subjectId)
                    });
                    var v = a.attr(k, "data-url");
                    u.jsonp(v, {
                        ids: x.join(",")
                    }, function (y) {
                        g.list = g.list.concat(y.list);
                        g.count = g.list.length;
                        m.render(t, r)
                    })
                });
                return
            }
            var n = '{{#each data as item index}} <li class="album{{#if (!fixed)}} autoHide{{/if}} grid{{((start+index)%4)}}"> <div class="mask"></div> <div class="cover"><a href="{{item.subjectUrl}}" target="_blank" atpanel="{{start+index}}-{{cellNum}},{{item.subjectId}},,,subject-thd,7,subject-thd,"><img src="{{item.coverPicUr}}"></a></div> <div class="prod"><a href="{{item.subjectUrl}}" target="_blank" atpanel="{{start+index}}-{{cellNum}},{{item.subjectId}},,,subject-thd,7,subject-thd,"><img src="{{item.productPicUrl}}"></a></div> <div class="title"><i></i><a href="{{item.subjectUrl}}" target="_blank" atpanel="{{start+index}}-{{cellNum}},{{item.subjectId}},,,subject-thd,7,subject-thd,">{{item.subjectTitle}}</a></div> <div class="brand"><img src="{{item.brandPicUrl}}"></div> <div class="count">{{item.itemCount}}</div> </li> {{/each}}';
            if (b >= 0) {
                a.css(k, {
                    overflow: "hidden",
                    height: a.height(k) + "px"
                })
            }
            var s = g.list.slice((b + 1) * h, (t + 1) * h),
				p = [];
            a.append(a.create(d(n).render({
                data: g.list.slice((b + 1) * h, (t + 1) * h),
                start: (b + 1) * h,
                cellNum: h,
                fixed: r
            })), a.get("ul", k));
            if (b >= 0) {
                if (c) {
                    c.stop()
                }
                c = new i(k, {
                    height: k.scrollHeight + "px"
                }, 2, "easeBoth", function () {
                    a.css(k, {
                        height: "auto",
                        overflow: "inherit"
                    })
                });
                c.run()
            }
            b = t;
            e.each(s, function (u) {
                p.push(u.subjectId)
            });
            var o = r ? "subject-fst" : "subject-more";
            window.atpanelFun("," + p.join("-") + ",,," + o + ",7," + o + ",,");
            try {
                new Image().src = "http://ac.atpanel.com/tmalllist.1.2?id=" + p.join(",")
            } catch (q) { }
            if ((t + 1) * h >= g.count) {
                a.css(a.get("#J_AlbumMore", k), {
                    display: "none"
                })
            }
        },
        init: function () {
            k = a.get("#J_AlbumPanel");
            if (a.width(a.parent(k)) >= 1390) {
                h = 4
            }
            g = window._albumData, animConf = {
                queue: false,
                duration: 0.5,
                easing: "easeNone"
            };
            l.delegate(document, "mouseenter", ".album", function (q) {
                var p = !a.parent(q.currentTarget, ".albumPanel") || a.hasClass(a.parent(q.currentTarget, ".albumPanel"), "open");
                var o = a.get("img", a.get(".cover", q.currentTarget));
                new i(o, {
                    left: "-80px",
                    top: "-40px",
                    width: "400px",
                    height: "400px"
                }, animConf).run();
                new i(a.get(".count", q.currentTarget), {
                    right: p ? "80px" : "48px"
                }, animConf).run();
                new i(a.get(".prod", q.currentTarget), {
                    right: "0px"
                }, animConf).run()
            });
            l.delegate(document, "mouseleave", ".album", function (p) {
                var o = !a.parent(p.currentTarget, ".albumPanel") || a.hasClass(a.parent(p.currentTarget, ".albumPanel"), "open");
                new i(a.get("img", a.get(".cover", p.currentTarget)), {
                    left: (o ? "-40px" : "0px"),
                    top: "0px",
                    width: "320px",
                    height: "320px"
                }, animConf).run();
                if (o) {
                    return
                }
                new i(a.get(".count", p.currentTarget), {
                    right: "-18px"
                }, animConf).run();
                new i(a.get(".prod", p.currentTarget), {
                    right: "-48px"
                }, animConf).run()
            });
            if (!k || !g || !g.list || !g.list.length) {
                return
            }
            var m = this,
				n = '<div class="spliter1"></div><ul class="clearfix"></ul> {{#if data.count>cellNum}} <a class="more" id="J_AlbumMore">\u52a0\u8f7d\u66f4\u591a\u4e13\u8f91</a> {{/if}} <div class="spliter"></div> {{#if data.count>cellNum}} <div class="open" id="J_AlbumOpen"><span>\u5c55\u5f00</span><i class="ui-more-drop-l-arrow"></i><s></s></div> {{/if}}';
            a.html(k, d(n).render({
                data: g,
                cellNum: h
            }));
            m.render(0, true);
            a.removeClass(k, "hidden");
            j = 0;
            l.on("#J_AlbumOpen", "click", function () {
                m.switchView()
            });
            l.on("#J_AlbumMore", "click", function () {
                m.renderMore()
            })
        }
    }
}, {
    requires: ["dom", "event", "template", "anim"]
});