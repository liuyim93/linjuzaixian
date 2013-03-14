
KISSY.add("malldetail/sku/skuFeatureIcon", function (A, B) {
    return (function (F) {
        var D;
        var E;
        function C() {
            if (D && E) {
                B.html(E, "");
                if (D.children().length == 2) {
                    D.hide()
                }
            }
        }
        function G(J) {
            D = A.one("#J_guarantee");
            E = A.one("#J_SSLIcon");
            C();
            if (J && J.length > 0 && E) {
                D.show();
                var I = [];
                for (var H = 0; H < J.length; H++) {
                    I.push('<a class="j_guarantee" href="' + J[H].url + '" title="' + J[H].title + '" target="_blank" ><img class="guaranteeService" src="' + J[H].imgUrl + '"></a>')
                }
                E.append(I.join(""))
            }
        }
        return { init: G }
    })()
}, { requires: ["dom"] }); /*pub-1|2013-01-06 16:13:22*/