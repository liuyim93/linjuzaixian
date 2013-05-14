var MINERVA_POPUP_URL = "http://service.taobao.com/support/minerva/robot.htm";
KISSY.ready(function (c) {
    var a = c.DOM,
		i = c.Event,
		d = c.all;
    var f = "about:blank";
    if (typeof MINERVA_POPUP_URL !== "undefined") {
        f = MINERVA_POPUP_URL
    }
    var e = '#immediate-help-trigger{position:fixed;right:0;bottom:70%;cursor:pointer;z-index:10001;}#immediate-help-trigger a{display:block;width:46px;height:120px;background:url(http://img04.taobaocdn.com/tps/i4/T1jrqcXcxrXXXXXXXX-46-120.gif) no-repeat 0 0}body #immediate-help-trigger a{_background: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="http://img04.taobaocdn.com/tps/i4/T1jrqcXcxrXXXXXXXX-46-120.gif",sizingMethod="image");}#immediate-help-trigger a:hover{cursor: pointer;background:url(http://img01.taobaocdn.com/tps/i1/T1kbqcXcJrXXXXXXXX-46-120.gif) no-repeat 0 0;border:none;}body #immediate-help-trigger a:hover{_background: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="http://img01.taobaocdn.com/tps/i1/T1kbqcXcJrXXXXXXXX-46-120.gif",sizingMethod="image");}#immediate-help-trigger a:focus{outline: none;}';
    var h = !!(window.external && window.external["max_version"]);
    if ((c.UA.ie && c.UA.ie == 6) || h) {
        e += "#immediate-help-trigger{_position: absolute;_zoom: expression(function(el) {el.style.zoom = 1;window.onscroll = function() {el.className = el.className;};}(this));}"
    }
    a.addStyleSheet(e);
    var b = a.create('<div id="immediate-help-trigger">                        <a target="_blank" href="' + f + "&sURL=" + encodeURIComponent(window.location.href) + '" title="\u5373\u65f6\u5e2e\u52a9"></a>                    </div>');
    document.body.appendChild(b);
    var g;
    i.on(b, "click", function (j) {
        j.halt();
        if (g && !g.closed) {
            g.focus()
        } else {
            g = window.open(MINERVA_POPUP_URL, "\u667a\u80fd\u6dd8\u5c0f\u4e8c", "width=970,height=580,location=no,resizable=yes,scrollbars=0")
        }
    })
});