(function (_kissy) {
    var _namespace_bottombar = "tgallery/tmall/common/bottombar";
    (!_kissy.config) && _kissy.add(_namespace_bottombar, { requires: ["core"] });
    _kissy.add(_namespace_bottombar, function (_kissy_imp, _dom, _event) {
        var _table_snippet, _set_bottombar_top, _is_ie6 = _kissy_imp.UA.ie == 6, _dom = _dom || _kissy_imp.DOM, _event = _event || _kissy_imp.Event;
        function _create_bottom_bar() {
            _dom.addStyleSheet('#J_CommonBottomBar{position:fixed;bottom:0;right:0;z-index:100002;_position:absolute;_bottom:auto;}#J_CommonBottomBar td{vertical-align:bottom;_position:relative;_overflow:hidden}.tm_cmbar_clearfix::after {clear: both;}.tm_cmbar_clearfix::after, .tm_cmbar_clearfix::before{display: table;content: "";overflow: hidden;}.tm_cmbar_clearfix {zoom: 1;}#J_CommonBottomBar .tm_cmbar{position:relative;}');
            _table_snippet = _dom.create('<table id="J_CommonBottomBar"><tr><td order="0"></td></tr></table>');
            _dom.hide(_table_snippet);
            setTimeout(function () {
                document.body.appendChild(_table_snippet)
            }, _is_ie6 ? 40 : 0);
            var L = 0;
            function K() {
                if (L > 150) {
                    return
                }
                if (_dom.get("#tstart .tstart-toolbar")) {
                    _dom.css(_table_snippet, { right: "25px" });
                    return
                }
                L++;
                setTimeout(K, 200)
            }
            K()
        }
        function _set_bottombar_top_wrapper() {
            if (_set_bottombar_top) {
                return
            }
            _set_bottombar_top = setTimeout(function () {
                var _scrollTop = document.body.scrollTop || document.documentElement.scrollTop || 0;
                var M = (document.body.scrollWidth - document.body.clientWidth > 0 ? 20 : 0);
                var _bottombar_top = (_scrollTop + _dom.viewportHeight(document)) - _dom.height(_table_snippet) - M;
                _dom.css(_table_snippet, "top", _bottombar_top);
                _set_bottombar_top = null
            }, 64)
        }
        return _kissy_imp[_namespace_bottombar] = _kissy_imp[_namespace_bottombar] || { add: function (P, N) {
            if (!_table_snippet) {
                _create_bottom_bar()
            }
            N = N || {};
            P = _dom.get(P);
            _dom.addClass(P, "tm_cmbar_clearfix");
            var L = N.order || _dom.attr(P, "order") || 0, Q = _table_snippet.rows[0], M = Q.cells, K;
            for (var O = 0; O < M.length; O++) {
                if (_dom.contains(M[O], P)) {
                    return
                }
                if (L < (_dom.attr(M[O], "order") || 0)) {
                    K = Q.insertCell(O);
                    break
                }
            }
            if (!K) {
                K = Q.insertCell(-1)
            }
            _dom.attr(K, "order", L);
            _dom.addClass(P, "tm_cmbar");
            _dom.append(P, K);
            this.refresh()
        }, remove: function (K) {
            _dom.remove(K);
            this.refresh()
        }, show: function () {
            _dom.show(_table_snippet);
            if (_is_ie6) {
                _event.on(window, "scroll", _set_bottombar_top_wrapper);
                _event.on(window, "resize", _set_bottombar_top_wrapper);
                setTimeout(_set_bottombar_top_wrapper, 32)
            }
        }, hide: function () {
            _dom.hide(_table_snippet);
            if (_is_ie6) {
                _event.remove(window, "scroll", _set_bottombar_top_wrapper);
                _event.remove(window, "resize", _set_bottombar_top_wrapper)
            }
        }, refresh: function () {
            if (_table_snippet.firstChild) {
                this.show()
            } else {
                this.hide()
            }
            if (_is_ie6) {
                setTimeout(_set_bottombar_top_wrapper, 32)
            }
        } 
        }
    }, { requires: ["dom", "event"] })
})(KISSY);
