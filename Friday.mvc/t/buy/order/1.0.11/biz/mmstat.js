/*pub-1|2013-06-05 17:41:02*/
KISSY.add("order/biz/mmstat", function (d) {
    var a = [];
    var e = false;
    var c = new Image();
    c.onload = c.onerror = function () {
        e = false;
        b()
    };
    window["_tat_" + d.now()] = c;
    function b() {
        if (e) {
            return
        }
        var f = a.shift();
        if (!f) {
            return
        }
        e = true;
        c.src = "http://log.mmstat.com/" + f + (f.indexOf("?") > -1 ? "&" : "?") + d.now()
    }
    return function (g, f) {
        if (g) {
            if (f) {
                g = "ued.1.1.2?type=9&_gm:id=tmallorder&" + g
            }
            a.push(g);
            b()
        }
    }
}); 