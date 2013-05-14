/*pub-1|2013-05-08 09:50:39*/
TStart.add("plugin~u", function (a) {
    a.addPlugin("u", {
        type: "drop",
        html: '<a href="#">\u6211\u7684U\u7ad9</a>',
        staticCode: "37.0.-1",
        Panel: {
            title: "\u6211\u7684U\u7ad9",
            width: 363,
            height: 235
        },
        loginNotice: {
            name: "\u6211\u7684U\u7ad9",
            list: ["\u60a8\u6700\u8fd1\u6d4f\u89c8\u8fc7\u7684U\u7ad9\u90fd\u4f1a\u51fa\u73b0\u5728\u8fd9\u91cc\u54e6\uff0c\u65b9\u4fbf\u4e0b\u6b21\u53ef\u4ee5\u5feb\u901f\u8fdb\u5165"],
            staticCode: "14.10.1.1"
        }
    })
});
TStart.add("u~light", function (c) {
    var d = KISSY,
		b = c.Plugins.u,
		a = false;
    c.ready(function () {
        b.on("open", function (e) {
            if (!a) {
                a = true;
                c.fetchLater("u", true)
            }
        })
    })
});