KISSY.add(V + "/mods/target", function (B) {
    var G = B.DOM,
		C = B.Event;
    var F = G.get("#J_Target"),
		A = "http://delta.taobao.com/home/delivery/AllContentByPage.do?resourceIds=372&ip=" + G.attr(F, "data-ip");
    return {
        init: function () {
            F && B.getScript(A, function () {
                var D = __content_results || [];
                D.length && B.each(D, function (E) {
                    G.html(F, E.content);
                    LIST.util.exposureFn(E.exposureParam)
                })
            })
        }
    }
});