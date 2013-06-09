/*pub-1|2013-06-05 17:41:07*/
KISSY.add("order/util/gracetip", function (c, h, f) {
    var b;
    var i;
    var d;
    var e = { show: function (j) {
        if (!b) {
            g()
        }
        b.innerHTML = j;
        b.style.visibility = "visible";
        i.style.visibility = "visible";
        d = true;
        a()
    }, hide: function () {
        if (!b) {
            return
        }
        b.style.visibility = "hidden";
        i.style.visibility = "hidden"
    } 
    };
    function g() {
        var j = document.body.lastChild;
        i = h.create('<div class="order-msg-mask"></div>');
        h.insertBefore(i, j);
        b = h.create('<div class="order-msg"></div>');
        h.insertBefore(b, j);
        f.on(window, "scroll resize", a)
    }
    function a() {
        if (!b && !d) {
            return
        }
        var k = h.viewportWidth();
        var l = h.viewportHeight();
        var j = h.scrollTop();
        h.css(b, { top: (l - h.outerHeight(b)) * 5 / 11 + j, left: (k - h.outerWidth(b)) / 2 });
        h.css(i, { top: j, left: 0, width: k, height: l })
    }
    return e
}, { requires: ["dom", "event"] }); 