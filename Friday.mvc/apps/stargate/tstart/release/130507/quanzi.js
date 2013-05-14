/*pub-1|2013-05-08 09:50:39*/
TStart.add("plugin~quanzi", function (a) {
    a.addPlugin("quanzi", {
        type: "drop",
        html: '<a href="#">\u6211\u7684\u5c0f\u5206\u961f</a>',
        Panel: {
            title: "\u6211\u7684\u5c0f\u5206\u961f",
            width: 417,
            height: 255
        },
        loginNotice: {
            name: "\u6211\u7684\u5c0f\u5206\u961f",
            list: ["\u5feb\u6377\u7684\u67e5\u770b\u548c\u8fdb\u5165\u4f60\u7684\u5c0f\u5206\u961f", "\u53ca\u65f6\u4e86\u89e3\u4f60\u5173\u6ce8\u7684\u5c0f\u5206\u961f\u7684\u66f4\u65b0\u60c5\u51b5"]
        }
    })
});
TStart.add("quanzi~light", function (c) {
    var d = KISSY,
		a = d.Event,
		e = d.DOM,
		b = c.traceStore,
		f = c.Plugins.quanzi;
    c.ready(function () {
        f.on("open", function (g) {
            new Image().src = "http://log.mmstat.com/sns.17.81?cache=" + new Date().getTime();
            if (!c.getNick()) {
                return this.renderLoginNotice()
            }
            c.fetchLater("quanzi", true)
        })
    })
});