/*pub-1|2013-05-08 09:50:38*/
TStart.add("plugin~xiami", function (a) {
    a.addPlugin("xiami", {
        type: "drop",
        html: '<i class="icon-new"></i><a href="#">\u6211\u7684\u97f3\u4e50</a>',
        staticCode: "73.0.-1",
        Panel: {
            title: '<img src="http://img02.taobaocdn.com/tps/i2/T1GLBsXClfXXaSQP_X-16-16.png" width="16" height="16" style="vertical-align:top; margin-top:3px; margin-right:5px" />\u6211\u7684\u97f3\u4e50',
            width: 398,
            height: 273
        }
    })
});
TStart.add("xiami~light", function (c) {
    var d = KISSY,
		e = d.DOM,
		b = c.Plugins.xiami,
		a = false;
    c.ready(function () {
        b.on("open", function (f) {
            if (!a) {
                a = true;
                e.html(e.get(".tstart-drop-panel-bd", "#tstart-plugin-xiami"), '<iframe width="398" scrolling="no" height="273" frameborder="0" src="http://toolbar.taobao.xiami.com/app/tbtool/?redirect=' + encodeURIComponent(location.href) + '"></iframe>');
                b.hideLoading()
            }
        })
    })
});