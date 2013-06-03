/*pub-1|2013-04-11 10:17:01*/
(function (C) {
    var D = C.DOM;
    var E = -1 == location.hostname.indexOf(".com");
    var B = D.attr(D.query("script").pop(), "src");
    B = B.substr(0, B.lastIndexOf("/"));
    if (C.Config.debug || E || document.cookie.indexOf("ks-debug") > -1) {
        C.Config.debug = true
    }
    document.domain = document.domain.split(".").slice(-2).join(".");
    C.mlog = function (F) {
        C.log("\u55b5");
        C.log(F)
    };
    var A = function () {
        C.use("cart/app", function (G, H) {
            H.init()
        });
        //var F = "http://cart." + (E ? "daily.tmall.net" : "tmall.com") + "/cart/myCart.htm?from=btop";
        var F = "http://120.192.31.164:7525/CartPay/Home/MyCartPay?from=btop";
        C.each(D.query("#site-nav a"), function (G) {
            if (/\bmycart|my_cart\b\.htm\b/i.exec(G.href || "")) {
                C.Event.on(G, "click", function () {
                    this.href = F
                })
            }
        })
    };
    C.config({
        map: [
            [/\/([\d\.]+)\/cart\/([\w\/]+)(-min)?/, "/$1/$2"]
        ],
        packages: [{
            name: "cart",
            charset: "gbk",
            path: B,
            tag: ""
        }]
    });
    if (C.Config.debug) {
        A()
    } else {
        C.getScript(B + "/??global.js,app.js,model.js,view.js,topsearch.js,feedback.js", A)
    }
})(KISSY);