KISSY.add("malldetail/sku/paymethods", function (D, F, B) {
    var A, C, E = "pay-credit-hover";
    return { init: function (H) {
        var G = this;
        if (!(A = F.get("#J_Toggler"))) {
            return
        }
        C = F.parent(A);
        G._payCod(H);
        G._bindEvents()
    }, _toggleHandler: function (G) {
        G.preventDefault();
        F[F.hasClass(C, E) ? "removeClass" : "addClass"](C, E);
        D.sendAtpanel("tmalldetail.4.6")
    }, _payCod: function (K) {
        if (!K.deliveryDO || !K.deliveryDO.otherServiceList) {
            return
        }
        var G = K.deliveryDO.otherServiceList;
        var J = [];
        for (var I = 0, H = G.length; I < H; I++) {
            J.push('<a href="' + G[I]["url"] + '" target="_blank"><s style="background:url(' + G[I]["imgUrl"] + ') no-repeat center center"></s>' + G[I]["title"] + "</a>")
        }
        C.innerHTML = J.join("") + C.innerHTML
    }, _bindEvents: function () {
        B.on("#J_Toggler", "click", this._toggleHandler)
    } 
    }
}, { requires: ["dom", "event"] }); /*pub-1|2013-01-06 16:13:21*/