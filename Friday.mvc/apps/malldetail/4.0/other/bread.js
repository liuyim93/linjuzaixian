KISSY.add("malldetail/other/bread", function (_kissy_A) {
    function _populate_breadcrumb(_breadcrumb_stack, _dom_breadcrumb, _version) {
        var _breadcrumb_snippet = [];
        var _last_class_snippet = "";
        if (_dom_breadcrumb && _breadcrumb_stack.length) {
            for (var index = 0, _len = _breadcrumb_stack.length; index < _len; index++) {
                if (index == _len - 1) {
                    _last_class_snippet = ' class="last"'
                }
                if (_breadcrumb_stack[index].length == 2) {
                    _breadcrumb_snippet.push("<li" + _last_class_snippet + '><a href="' + _breadcrumb_stack[index][1] + '" target="_blank">' + _breadcrumb_stack[index][0] + "</a></li>")
                } else {
                    _breadcrumb_snippet.push("<li" + _last_class_snippet + ">" + _breadcrumb_stack[index][0] + "</li>")
                }
            }
            _breadcrumb_snippet = _breadcrumb_snippet.join("");
            if (_version = "new") {
                _breadcrumb_snippet = '<ul data-spm="1000995">' + _breadcrumb_snippet + "</ul>"
            }
            _dom_breadcrumb.append(_breadcrumb_snippet)
        }
    }
    return {
        init: function (_breadcrumbDO) {
            var _version = "old";
            var _breadcrumb = _kissy_A.one(".crumbs-patch") || _kissy_A.one(".hdNav");
            if (!_breadcrumb) {
                _breadcrumb = _kissy_A.one("#J_HeaderCrumb");
                _version = "new"
            }
            _breadcrumbDO = _breadcrumbDO || {};
            if (_breadcrumb) {
                if (_breadcrumbDO.breadCrumb) {
                    _populate_breadcrumb(_breadcrumbDO.breadCrumb, _breadcrumb, _version)
                }
            }
        }
    }
}, {
    requires: []
});