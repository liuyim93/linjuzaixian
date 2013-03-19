KISSY.add("malldetail/other/attributes", function (A, C, B) {
    return A.mods.attributes = {
        init: function (F) {
            var M = A.get("#J_AttrList");
            var L = [];
            var I = [{
                k: "providerList",
                v: '<span data-spm="1000807">\u4ea7\u54c1\u4fe1\u606f\u7531 {{html}} {{#if len>1}}\u7b49{{/if}}\u53d1\u5e03</span>'
            }, {
                k: "reviewerList",
                v: '<span data-spm="1000808">\u7531 {{html}} {{#if len>1}}\u7b49{{/if}}\u786e\u8ba4</span>'
            }, {
                k: "maintainerList",
                v: '<span data-spm="1000809">\u611f\u8c22\u7531 {{html}} {{#if len>1}}\u7b49{{/if}}\u5546\u5bb6\u7684\u7ef4\u62a4</span>'
            }];
            if (!M || !F) {
                return
            }
            for (var G = 0; G < I.length; G++) {
                var J = I[G];
                if (J.k in F) {
                    var H = [];
                    var K = F[J.k];
                    if (K.length) {
                        for (var E = 0, D = K.length; E < D; E++) {
                            H.push('<a href="' + K[E].shopUrl + '" target="_blank">' + K[E].shopName + "</a>")
                        }
                        L.push(C(J.v).render({
                            html: H.join("\u3001"),
                            len: D
                        }))
                    }
                }
            }
            if (L.length) {
                M.innerHTML += '<div class="tm-attr-list-ft">' + L.join("\uff0c") + "\u3002</div>"
            }
        }
    }
}, {
    requires: ["template", "dom", "malldetail/other/attributes.css"]
}); 