(function (b) {
    b.Config.debug = false;
    b.trace = window.console ? function (d) {
        console.log(d)
    } : function () {
    };
    document.domain = document.domain.substr(document.domain.indexOf(".tmall.") + 1);
    var c = b.DOM;
    var a = c.attr(c.query("script").pop(), "src");
    a = a.substr(0, a.indexOf("??"));
    b.config({ map: [[/\/([\d\.]+)\/order\/([\w\/]+)(-min)?/, "/$1/$2"]], packages: { order: { tag: "", path: a, charset: "gbk"}} });
    b.use("order/app", function (d, e) {
        e.init()
    })
})(KISSY);
