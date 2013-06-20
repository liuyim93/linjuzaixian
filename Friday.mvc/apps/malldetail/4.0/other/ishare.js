KISSY.add("malldetail/other/ishare", function (C, B, A) {
    return { init: function () {
        B.on("#J_IShare", "click", function (D) {
            D.preventDefault();
            C.use("tml/share", function (H, E) {
                var F = window.g_config;
                var G = { style: "none", id: 1, container: "#J_IShare", type: "item", showRecTip: false, key: F.itemId };
                new E(G).popup();
                //H.sendAtpanel("tmalldetail.13.11")
            })
        })
    } 
    }
}, { requires: ["event", "malldetail/common/util"] }); /*pub-1|2013-04-11 17:02:57*/