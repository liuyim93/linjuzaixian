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
                //2013-03-07 basilwang don't know what does this mean
                var M = (document.body.scrollWidth - document.body.clientWidth > 0 ? 20 : 0);
                var _bottombar_top = (_scrollTop + _dom.viewportHeight(document)) - _dom.height(_table_snippet) - M;
                _dom.css(_table_snippet, "top", _bottombar_top);
                _set_bottombar_top = null
            }, 64)
        }
        return _kissy_imp[_namespace_bottombar] = _kissy_imp[_namespace_bottombar] || { add: function (_dom_div_id_J_BrandBar, _options) {
            if (!_table_snippet) {
                _create_bottom_bar()
            }
            _options = _options || {};
            _dom_div_id_J_BrandBar = _dom.get(_dom_div_id_J_BrandBar);
            _dom.addClass(_dom_div_id_J_BrandBar, "tm_cmbar_clearfix");
            var _order = _options.order || _dom.attr(_dom_div_id_J_BrandBar, "order") || 0,
                _row0 = _table_snippet.rows[0],
                _cells = _row0.cells, _new_cell;
            for (var index = 0; index < _cells.length; index++) {
                if (_dom.contains(_cells[index], _dom_div_id_J_BrandBar)) {
                    return
                }
                if (_order < (_dom.attr(_cells[index], "order") || 0)) {
                    _new_cell = _row0.insertCell(index);
                    break
                }
            }
            if (!_new_cell) {
                _new_cell = _row0.insertCell(-1)
            }
            _dom.attr(_new_cell, "order", _order);
            _dom.addClass(_dom_div_id_J_BrandBar, "tm_cmbar");
            _dom.append(_dom_div_id_J_BrandBar, _new_cell);
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
