 /*pub-1|2013-04-19 17:24:11*/(function(d) {
    var e = d.all, f = d.JSON, c, b = {key: "tb_recent_viewed_items",maxCount: 6,flashUrl: "http://a.tbcdn.cn/app/tbskip/lsoSaver.swf?t=_1.swf",itemData: "",type: "r"}, a = {};
    d.mix(a, {init: function(g) {
            var h = this;
            h.config = d.merge(b, g);
            d.use("flash", function(i, j) {
                c = j;
                h.isRead = h.config.type.toLowerCase() == "r" ? true : false;
                h.initSwf()
            })
        },initSwf: function() {
            var h = this, g = h.config, j = parseInt(Math.random() * 10000).toString(32), i = 0;
            c.add(j + "-container", {src: g.flashUrl,attrs: {width: 1,height: 1},params: {allowScriptAccess: "always"},id: j}, function() {
                e("#" + j + "-container").css({height: "1px",width: "1px",position: "absolute",left: 0,top: 0});
                h.fl = c.get(j);
                if (h.fl && h.fl.read && h.fl.save) {
                    h.isRead ? h.readData() : h.saveData()
                } else {
                    if (i > 5) {
                    } else {
                        d.later(arguments.callee, 400);
                        i++
                    }
                }
            })
        },readData: function() {
            var i = this, g = i.config, h;
            h = i.fl.read(g.key);
            h = f.parse(h);
            h = i.format(h);
            g.callback && g.callback(h)
        },format: function(j) {
            var i = this, h = i.config, n = window.location.hostname.indexOf(".daily.") > -1 ? true : false, m = n ? "http://img0{x}.daily.taobaocdn.net/bao/uploaded/" : "http://img0{x}.taobaocdn.com/bao/uploaded/", l = "http://" + (n ? "item.daily.taobao.net" : "item.taobao.com") + "/item.htm?id=", g, k = [];
            d.each(j, function(p, o) {
                if (p.isDaily == n) {
                    d.each(p, function(r, q) {
                        p[q] = decodeURIComponent(r);
                        if (q == "pic") {
                            p[q] = i.filterChar(p[q]);
                            g = Math.ceil(Math.random() * 4);
                            p[q] = d.substitute(m, {x: g}) + p[q]
                        } else {
                            if (q == "itemId") {
                                if (isNaN(p[q])) {
                                    j.splice(o, 1);
                                    i.clear(p[q])
                                }
                            } else {
                                if (q == "title") {
                                    p[q] = i.filterChar(p[q])
                                }
                            }
                        }
                        if (j[o]) {
                            p.url = l + p.itemId;
                            j[o] = p
                        }
                    });
                    k.push(p)
                }
            });
            return k
        },filterChar: function(g) {
            return g.replace(/</g, "lt;").replace(/>/g, "gt;")
        },saveData: function() {
            var i = this, g = i.config, h, j = g.key;
            if (i.getCurrentItem()) {
                h = i.fl && i.fl.read(j)
            }
            if (!h) {
                h = f.stringify([].concat(i.currentItem));
                i.fl.save(j, h)
            } else {
                if (h && !i.isExsit(h)) {
                    h = f.parse(h);
                    while (h.length > g.maxCount) {
                        h.pop()
                    }
                    h.push(i.currentItem);
                    h = f.stringify(h);
                    i.fl.save(j, h)
                }
            }
            i.items = h;
            d.log("write data success")
        },clear: function(k) {
            var h = this, j = h.config.key, i = [];
            if (h.fl && (h.items = h.fl.read(j))) {
                var g = f.parse(h.items);
                if (arguments.length == 1) {
                    d.each(g, function(l) {
                        l.itemId != k && i.push(l)
                    });
                    h.items = i;
                    i = i.length > 0 ? f.stringify(i) : null;
                    h.fl.save(j, i)
                } else {
                    h.fl.save(j, null)
                }
                d.log("clear data success")
            }
        },isExsit: function(h) {
            var g = this;
            return h.indexOf(g.currentItem.itemId) == -1 ? false : true
        },getCurrentItem: function() {
            var h = this, g = h.config, i = g.itemData, j = window.location.hostname.indexOf(".daily.") > -1 ? true : false;
            if (i) {
                i = typeof i == "string" ? f.parse(i) : i;
                d.each(i, function(l, k) {
                    i[k] = encodeURIComponent(l)
                });
                i.isDaily = j
            }
            h.currentItem = i;
            return f.stringify(i)
        }});
    window.recentView = a
})(KISSY);
