﻿/* linezing page click data collect
* dingqiu@taobao
*/
(function () {
    function F() {
        if (!E) {
            E = 1; var a = new Date, b = a.getTime() + 90; for (; ; ) if ((new Date).getTime() > b) { E = 0; return }
        }
    }
    function D() { var a = window.innerWidth ? window.innerWidth : p && p.clientWidth ? p.clientWidth : q.offsetWidth, b = window.innerHeight ? window.innerHeight : p && p.clientHeight ? p.clientHeight : q.offsetHeight; return [a, b] }
    function C() {
        if (!(h.length <= 0)) {
            g = (new Date).getTime(); var a = D().join(":"); A({ linkid: "", linkurl: "", x: h.length, y: h.join(";"), ws: a }
), h.length = 0
        }
    }
    function B(a) {
        function c() {
            --z, b.onload = null; try { s.removeChild(b) }
            catch (a) { }
        }
        var b = o.createElement("img"); s.appendChild(b), b.onload = c, b.src = a, ++z, i("sending", a.replace(/&/g, "\n"))
    }
    function A(a) { var c = [], d, e; for (d in w) c.push(d + "=" + r(w[d])); if (a) for (d in a) c.push(d + "=" + r(a[d])); (!a || !a.rnd) && c.push("rnd=" + (Math.random() * 1e5 | 0)), (!a || !a.cna) && c.push("cna=" + r((o.cookie.match(/cna=([^;]+)/) || ["", ""])[1])), c = b + c.join("&"), B(c) }
    function y(b) {
        try {
            b || (b = window.event); if (!b) return; var d = b.target || b.srcElement, e = []; if (!d) return; ++w.ca; function f(a) { var b; return a && (b = a[n]) && b[m]() }
            e.unshift(d); if (f(d) !== "area") while (d && f(d) !== "a" && f(d) !== "html") d = d.parentNode, e.unshift(d); var g, h, j; t ? (g = b.clientX + Math.max(q.scrollLeft, p.scrollLeft), h = b.clientY + Math.max(q.scrollTop, p.scrollTop)) : (g = b.pageX, h = b.pageY), j = Math.max(p.scrollWidth, q.scrollWidth), g -= j / 2; function l(a) {
                var b = [], c, d, e; for (var g = 0, h = a.length; g < h; ++g) { c = a[g]; if (!c) continue; d = f(c), d === "div" && (d = ""), d += c.id ? "#" + c.id : "", e = c.className || c["class"], e && (e = e.replace(/^ +| +$/g, "").split(/ +/g), e && e.length && (d += "." + e.join("."))), b.push(d) }
                return b.join(">")
            }
            var o; if (d && f(d).match(/^area|a$/) && (o = d.href) && !o.match(/^javascript:/)) {
                var r = f(d); ++w.cl, function (a, b) { var c = 4 - a.length, b = a[0]; if (c > 1) while (c-- > 0 && (b = b.parentNode)) a.unshift(b); else a.unshift(b.parentNode) }
(e, d); var s = r + ":" + (d.__lid || function (a) { var b = q[k](r), c = b.length, d; for (var e = 0; e < c; ++e) d = b[e], d.__lid = "" + e; d = b = null; return a.__lid }
(d)); j = D().join(":"), i("link ws, x, y->", j, g, h), A({ linkid: s, linkurl: o, x: g, y: h, ws: j, el: l(e) }
), d = d.target, (!d || d == "_self" || d == "_top") && F()
            }
            else c && (j = D().join(":"), i("link ws, x, y->", j, g, h), A({ linkid: "", linkurl: "", x: g, y: h, ws: j, el: l(e.slice(-4)) }
)); e = null
        }
        catch (u) { if (a) throw u }
    }
    function x() {
        u || (u = +(new Date)); var a = +(new Date), b = o[l]("LineZing"); if (!b) a - u <= v && setTimeout(x, 100); else {
            s = b; if (s._init) { i("return"); return }
            s._init = 1; var c, d, e = ["shopid", "pagetype", "pageid", "tmplid", "itemid", "ssver"], f = [0, "index", "item", 0, "page"]; for (var g = 0, h = e.length; g < h; ++g) {
                c = e[g], d = j(s, c); if (!d) continue; if (c == "pagetype") { d = f[d]; if (!d) return }
                w[c] = d
            }
            c = d = null, i(w); if (!w.shopid) return; if (!w.pagetype.match(/^(?:index|page|item)$/)) return; w.url = location.href.replace(/#.*$/, ""), w.cl = 0, w.ca = 0, i("init", w), w.pagetype == "index" ? w.pageid = w.shopid : w.pagetype == "item" && (w.pageid = w.itemid), q.addEventListener ? q.addEventListener("click", y, !1) : q.attachEvent ? q.attachEvent("onclick", y) : q.onclick = y
        }
    }
    function j(a, b) {
        var c = "getAttributeNode"; return (a[c] ? (a[c](b) || {}
).nodeValue : a.getAttribute(b) || a[b]) || null
    }
    function i() {
        if (!!a) try { console.log.apply(console, arguments) }
        catch (b) { }
    }
    var a = !1, b = "http://hotclick.app.linezing.com/hotclick.gif?", c = !0, d = 10, e = 2e3, f, g = 0, h = [], k = "getElementsByTagName", l = "getElementById", m = "toLowerCase", n = "nodeName", o = document, p = o.documentElement, q = o.body, r = encodeURIComponent, s, t = !!navigator.userAgent.match(/msie (?:\d+)/i), u = 0, v = 6500, w = {}
, z = 0, E = 0; x()
}
)()
