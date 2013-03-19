KISSY.add("malldetail/other/bread", function (A) {
    function B(I, C, G) {
        var F = [];
        var H = "";
        if (C && I.length) {
            for (var E = 0, D = I.length; E < D; E++) {
                if (E == D - 1) {
                    H = ' class="last"'
                }
                if (I[E].length == 2) {
                    F.push("<li" + H + '><a href="' + I[E][1] + '" target="_blank">' + I[E][0] + "</a></li>")
                } else {
                    F.push("<li" + H + ">" + I[E][0] + "</li>")
                }
            }
            F = F.join("");
            if (G = "new") {
                F = '<ul data-spm="1000995">' + F + "</ul>"
            }
            C.append(F)
        }
    }
    return {
        init: function (E) {
            var D = "old";
            var C = A.one(".crumbs-patch") || A.one(".hdNav");
            if (!C) {
                C = A.one("#J_HeaderCrumb");
                D = "new"
            }
            E = E || {};
            if (C) {
                if (E.breadCrumb) {
                    B(E.breadCrumb, C, D)
                }
            }
        }
    }
}, {
    requires: []
});