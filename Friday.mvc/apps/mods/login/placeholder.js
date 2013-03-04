KISSY.add("login/placeholder", function (A) {
    function B(F, E) {
        var D = A.one(F), G = D.parent(), C = G.one("input");
        if (!D || !C) {
            return
        }
        D.on("click", function () {
            C[0].focus()
        });
        C.on("blur", function () {
            G.removeClass("ph-focus");
            if (C.val() === "") {
                G.removeClass("ph-hide")
            }
        }).on("focus", function () {
            G.addClass("ph-focus")
        }).on("keydown", function (H) {
            if (H && H.keyCode !== 9) {
                setTimeout(function () {
                    G.addClass("ph-hide")
                }, 0)
            }
        });
        if (C.val() === "") {
            G.removeClass("ph-hide")
        }
        setInterval(function () {
            if (C.val() !== "") {
                G.addClass("ph-hide")
            }
        }, 100)
    }
    return B
});