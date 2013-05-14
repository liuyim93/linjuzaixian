/*pub-1|2012-12-25 17:03:37*/
KISSY.add("tb-home/js/common/v1/placeholder", function (B) {
    var D = B.all,
		F = '<div class="placeholder" style="position: relative;display:' + (B.UA.ie > 7 ? "inline-block" : "inline") + ';zoom:1;"></div>',
		A = '<label style="display: none;position:absolute;left:0;top:0;">{tip}</label>',
		C = "placeholder" in document.createElement("input");

    function E(K, G) {
        if (C) {
            return
        }
        var I = this,
			H = {
			    wrap: true
			};
        if (I instanceof E) {
            var J = B.merge(H, G);
            I._init(K, J)
        } else {
            return new E(K, G)
        }
    }
    B.augment(E, {
        _init: function (I, G) {
            var H = this;
            if (!I) {
                B.log("[placeholder] has no target to decorate");
                return
            }
            I = D(I);
            var K = I.attr("placeholder");
            if (!K) {
                return
            }
            function J() {
                var N = B.substitute(A, {
                    tip: K
                });
                var M = H.triggerLabel = D(N);
                M.css("width", I.css("width"));
                if (I.attr("id")) {
                    M.attr("for", I.attr("id"))
                } else {
                    M.on("click", function () {
                        I[0].focus()
                    })
                }
                var L = D(F);
                L.appendTo(I.parent()).append(I);
                M.insertBefore(I);
                B.later(function () {
                    if (!I.val()) {
                        M.show()
                    }
                }, 100)
            }
            I.on("focus", function (L) {
                H.triggerLabel.hide()
            });
            I.on("blur", function (L) {
                if (!I.val()) {
                    H.triggerLabel.show()
                }
            });
            J()
        },
        text: function (G) {
            this.triggerLabel.text(G)
        },
        hide: function () {
            this.triggerLabel.hide()
        },
        show: function () {
            this.triggerLabel.show()
        }
    });
    return E
});