
KISSY.add("malldetail/sku/common", function (B) {
    var C = KISSY, D = C.DOM;
    function A(G) {
        C.log(G)
    }
    function E() {
        if (arguments.length < 2) {
            new A("process error");
            return false
        }
        var G = arguments[0], I = arguments[1];
        if (!F.hasOwnProperty(G) || typeof F[G][I] != "function") {
            new A(G + ":" + I + " Error");
            return false
        }
        var H = Array.prototype.slice.call(arguments, 2);
        return F[G][I].apply(this, H)
    }
    var F = {};
    F.feature = function () {
        function G(J) {
            var I = C.one("#J_guarantee");
            if (I) {
                I.append(J);
                var H = I.all("a");
                if (H.length) {
                    I.show()
                } else {
                    I.hide()
                }
            }
        }
        return { render: G }
    } ();
    return { process: E }
}); /*pub-1|2013-01-08 16:04:42*/