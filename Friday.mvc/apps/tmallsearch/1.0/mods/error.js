KISSY.add(V + "/mods/error", function (B) {
    var G = B.DOM,
		F = B.Event;
    var C = G.get("#J_LRTCancel"),
		H = G.get("#J_Nav"),
		A = G.get("#J_ComboRec");
    return {
        init: function () {
            C && F.on(C, "click", function (D) {
                D.preventDefault();
                G.show(H);
                G.hide(A)
            })
        }
    }
});