KISSY.add("wangpu/decoration/countdown", function (d, e) {
    var h = d.DOM,
		i = {
		    d: 86400000,
		    h: 3600000,
		    m: 60000,
		    s: 1000,
		    i: 1
		}, c = ["d", "h", "m", "s", "i"];

    function f(l, k) {
        var j = this;
        cfg = {
            timeBegin: 0,
            collateurl: "",
            collateval: 0
        };
        j.timeStart = new Date;
        j.config = d.merge(cfg, k || {});
        j._countTime(l)
    }
    f.prototype = {
        _countTime: function (m) {
            var l = this,
				k = l.config,
				n = k.timeBegin,
				j = 0;
            if (/^(\d{4})\-(\d{1,2})\-(\d{1,2})(\s+)(\d{1,2}):(\d{1,2}):(\d{1,2})$/ig.test(m.replace(/\./g, "-"))) {
                var o = m.match(/\d+/g);
                m = new Date(o[0], o[1] - 1, o[2], o[3], o[4], o[5])
            } else {
                if (/^\d+&/.test(m)) {
                    m = parseInt(m)
                }
            }
            if (d.isNull(n) || isNaN(n) || n <= 0) {
                if (d.isDate(m)) {
                    j = m - new Date
                } else {
                    j = parseInt(m)
                }
            } else {
                j = typeof n == typeof m ? m - n : 0
            }
            if (!d.isNumber(j) || j < 0) {
                j = 0
            }
            l.timeRemain = j
        },
        getRemain: function () {
            var j = parseInt(this.timeRemain - (new Date - this.timeStart));
            if (isNaN(j) || j <= 0) {
                return 0
            } else {
                return j
            }
        },
        format: function (l) {
            var k = Array.prototype.slice.call(arguments, 1);
            var j = [];
            d.each(k, function (n) {
                if (i[n]) {
                    var m = Math.floor(l / i[n]);
                    l = l - m * i[n];
                    j.push(m)
                }
            });
            return j
        },
        fetch: function (k, m, l) {
            var j = this,
				n = setInterval(function () {
				    var o = j.getRemain();
				    if (o > 0) {
				        m && m.call(j, o)
				    } else {
				        m && m.call(j, 0);
				        l && l.call(j);
				        clearInterval(n)
				    }
				}, k)
        }
    };

    function a(l, n, m) {
        var k = {
            d: ".ks-d",
            h: ".ks-h",
            m: ".ks-m",
            s: ".ks-s",
            i: ".ks-i"
        }, o = {
            interval: 1000,
            timeUnitCls: k,
            minDigit: 2,
            timeRunCls: ".ks-countdown-run",
            timeEndCls: ".ks-countdown-end"
        }, j = d.merge(o, m);
        if (j.run && !d.isFunction(j.run)) {
            delete j.run
        }
        if (j.end && !d.isFunction(j.end)) {
            delete j.end
        }
        j.interval = parseInt(j.interval);
        if (isNaN(j.interval) || j.interval < 200) {
            j.interval = 200
        }
        a.superclass.constructor.call(this, n, j);
        this.counter(l)
    }
    d.extend(a, f, {
        counter: function (k) {
            var s = this,
				q = s.config,
				m = function (u) {
				    var t = [u].concat(r),
						v = s.format.apply(this, t);
				    d.each(j, function (x, w) {
				        x.text(v[w])
				    });
				    q.run && q.run.call(s, t, v)
				}, n = function () {
				    l.hide();
				    p.show();
				    q.end && q.end.call(s)
				}, o = q.timeUnitCls,
				k = d.one(k),
				l = k.all(q.timeRunCls),
				p = k.all(q.timeEndCls),
				j = [],
				r = [];
            d.each(c, function (t) {
                if (o[t] && k.one(o[t])) {
                    j.push(k.one(o[t]));
                    r.push(t)
                }
            });
            l.show();
            p.hide();
            s.fetch(q.interval, m, n)
        }
    });

    function g(j, l) {
        var k = function (m) {
            if (!d.isDate(m)) {
                m = new Date
            }
            if (d.isFunction(l)) {
                l(m)
            }
        };
        d.io({
            url: j,
            type: "HEAD",
            success: function (o, m, n) {
                k(new Date(n.getResponseHeader("date")))
            },
            error: function () {
                k(new Date)
            },
            cache: false
        })
    }
    function g(l, n) {
        var m = 0;

        function k(p, o) {
            if (p < 1000) {
                n(o)
            } else {
                if (m < 3) {
                    j()
                } else {
                    n(new Date(o.setMilliseconds(o.getMilliseconds() + p / 2)))
                }
            }
        }
        function j() {
            var o = new Date;
            m++;
            d.io({
                url: l,
                type: "HEAD",
                success: function (r, p, q) {
                    k(new Date - o, new Date(q.getResponseHeader("date")))
                },
                error: function () {
                    k()
                },
                cache: false
            })
        }
        j()
    }
    function b(m, j, k) {
        m = "." + (m || "J_TWidget");
        var l = function (n) {
            d.query(m, j).each(function (q) {
                var p = h.attr(q, "data-widget-type"),
					o = h.attr(q, "data-widget-config");
                if (p !== "Countdown") {
                    return
                }
                if (d.isNull(o)) {
                    o = {}
                } else {
                    o = JSON.parse(o.replace(/'/g, '"'))
                }
                if (n && d.isDate(n)) {
                    o.timeBegin = n
                }
                new d.Countdown(q, o.endTime, o)
            })
        };
        if (k) {
            g(k, l)
        } else {
            l()
        }
    }
    a.autoRender = b;
    a.Core = f;
    a.getServerTime = g;
    d.Countdown = a;
    return a
}, {
    requires: ["core"]
});