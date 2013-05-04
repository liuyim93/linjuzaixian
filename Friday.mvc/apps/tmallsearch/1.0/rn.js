(function (a) {
    a.use("dom, sizzle", function (c) {
        var h = c.DOM,
			e = c.Event,
			g = window,
			f = g.document,
			d = f.body;
        var i = "data-rn";

        function b(m) {
            var j = m.currentTarget;
            if (j._rned) {
                return
            }
            var l = h.attr(this, i),
				k = j.href,
				n = j.search;
            if (k && /^https*:\/\/\b/.test(k)) {
                if (n == "") {
                    j.search += "rn=" + l
                } else {
                    !/\brn=\w+\b/g.test(n) && (j.search += "&rn=" + l)
                }
            }
            j._rned = true
        }
        e.delegate("[" + i + "]", "mouseenter", "a", b)
    })
} (KISSY));