(function(c) {
    var l = c.DOM, j = c.Event, f = window, i = document, h, g = "about:blank", d = "http://img04.taobaocdn.com/tps/i4/T1jrqcXcxrXXXXXXXX-46-120.gif", b = "http://img01.taobaocdn.com/tps/i1/T1kbqcXcJrXXXXXXXX-46-120.gif", a = "46px", e = "120px";
    function k() {
        try {
            !!(window.external && window.external["max_version"]);
            return true
        } catch (m) {
            return false
        }
    }
    c.ready(function() {
        if (typeof MINERVA_POPUP_URL !== "undefined") {
            g = MINERVA_POPUP_URL
        }
        try {
            if (typeof (J_personal_minerva_config) != "undefined") {
                J_personal_minerva_config.picUrl && (d = J_personal_minerva_config.picUrl);
                J_personal_minerva_config.picHoverUrl && (b = J_personal_minerva_config.picHoverUrl);
                J_personal_minerva_config.picWidth && (a = J_personal_minerva_config.picWidth);
                J_personal_minerva_config.picHeight && (e = J_personal_minerva_config.picHeight)
            }
        } catch (p) {
        }
        var o = "#immediate-help-trigger{position:fixed;right:0;bottom:70%;cursor:pointer;z-index:10001;}#immediate-help-trigger a{display:block;width:" + a + ";height:" + e + ";background:url(" + d + ') no-repeat 0 0}body #immediate-help-trigger a{_background: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + d + '",sizingMethod="image");}#immediate-help-trigger a:hover{cursor: pointer;background:url(' + b + ') no-repeat 0 0;border:none;}body #immediate-help-trigger a:hover{_background: none;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + b + '",sizingMethod="image");}#immediate-help-trigger a:focus{outline: none;}';
        if (c.UA.ie == 6 || k()) {
            o += "#immediate-help-trigger{_position: absolute;_zoom: expression(function(el) {el.style.zoom = 1;window.onscroll = function() {el.className = el.className;};}(this));}"
        }
        l.addStyleSheet(o);
        var n = l.create("<div></div>");
        n.id = "immediate-help-trigger";
        var m = l.create("<a></a>");
        m.target = "_blank";
        m.href = g + "&sURL=" + encodeURIComponent(window.location.href);
        m.title = "\u5373\u65f6\u5e2e\u52a9";
        l.append(m, n);
        l.append(n, document.body);
        j.on(m, "click", function(q) {
            q.preventDefault();
            var r = q.target;
            var s;
            if (h && !h.closed) {
                h.focus()
            } else {
                h = window.open(MINERVA_POPUP_URL, "\u667a\u80fd\u6dd8\u5c0f\u4e8c", "width=970,height=580,location=no,resizable=yes,scrollbars=0")
            }
        })
    })
})(KISSY);
