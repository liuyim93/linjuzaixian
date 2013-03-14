
KISSY.add("malldetail/sku/skuLade", function (C, D, A) {
    var B = "#J_TladeProp li";
    return { init: function () {
        if (D.get("#J_TladeMode")) {
            var F = C.cfg();
            var E = F.frmBid.elements;
            A.on(B, "click", function (I) {
                I.preventDefault();
                var G = D.query("li", this.parentNode);
                if (!D.hasClass(this, "tb-selected")) {
                    D.removeClass(B, "tb-selected");
                    D.addClass(this, "tb-selected");
                    var H = D.attr(this, "etm");
                    if (H == "post") {
                        D.hide("#J_TladeDate")
                    } else {
                        D.show("#J_TladeDate")
                    }
                    if (E.etm) {
                        E.etm.value = H
                    }
                    if (!this.anchor) {
                        this.anchor = D.create("<i>");
                        this.appendChild(this.anchor)
                    }
                }
            })
        }
    } 
    }
}, { requires: ["dom", "event"] }); /*pub-1|2013-01-06 16:13:21*/