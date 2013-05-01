KISSY.add("malldetail/other/bread", function (_kissy_A) {
    function B(_breadcrumb_stack, _dom_breadcrumb, _version) {
        var F = [];
        var _last_class_snippet = "";
        if (_dom_breadcrumb && _breadcrumb_stack.length) {
            for (var index = 0, _len = _breadcrumb_stack.length; index < _len; index++) {
                if (index == _len - 1) {
                    _last_class_snippet = ' class="last"'
                }
                if (_breadcrumb_stack[index].length == 2) {
                    F.push("<li" + _last_class_snippet + '><a href="' + _breadcrumb_stack[index][1] + '" target="_blank">' + _breadcrumb_stack[index][0] + "</a></li>")
                } else {
                    F.push("<li" + _last_class_snippet + ">" + _breadcrumb_stack[index][0] + "</li>")
                }
            }
            F = F.join("");
            if (_version = "new") {
                F = '<ul data-spm="1000995">' + F + "</ul>"
            }
            _dom_breadcrumb.append(F)
        }
    }
    return {
        init: function (_bread_cfg) {
            var _version = "old";
            var _breadcrumb = _kissy_A.one(".crumbs-patch") || _kissy_A.one(".hdNav");
            if (!_breadcrumb) {
                _breadcrumb = _kissy_A.one("#J_HeaderCrumb");
                _version = "new"
            }
            _bread_cfg = _bread_cfg || {};
            if (_breadcrumb) {
                if (_bread_cfg.breadCrumb) {
                    B(_bread_cfg.breadCrumb, _breadcrumb, _version)
                }
            }
        }
    }
}, {
    requires: []
});