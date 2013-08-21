/*pub-1|2013-01-17 17:47:50*/
(function (_window, _kissy_J, _document) {
    var _event = _kissy_J.Event,
		_dom = _kissy_J.DOM,
		_anim = _kissy_J.Anim,
		_is_ie = _kissy_J.UA.ie && _kissy_J.UA.ie < 9,
		_is_ie6 = _is_ie && _kissy_J.UA.ie == 6,
		_str_J_ScrollTopBtn = "J_ScrollTopBtn",
		_str_ui_scrolltop_hidden = "ui-scrolltop-hidden";

    function _get_value_from_url(_key) {
        var _script_dom = _document.getElementsByTagName("script"),
			_url = _script_dom[_script_dom.length - 1].src || "",
			_regex = new RegExp("\\?(?:.+&)?" + _key + "=([^&]*)(&|$)", "i"),
			_matched_set = _url.match(_regex);
        return (_matched_set != null) ? unescape(_matched_set[1]) : null
    }
    function _get_value_from_attribute(_key) {
        var _script_dom = _document.getElementsByTagName("script"),
			_url = _script_dom[_script_dom.length - 1],
			_attribute = _url.getAttribute("data-st-" + _key);
        return _attribute ? _attribute : _get_value_from_url(_key)
    }
    var _options = {
        bottom: 200,
        right: 10,
        height: "60px",
        width: "60px",
        baseLine: 400,
        isAnim: false,
        type: 1
    }, _BackTop = {
        scrollEl: null,
        getValue: function () {
            return _window.pageYOffset || _document.body.scrollTop || _document.documentElement.scrollTop
        },
        updateValue: function (_step_index, _scrollTop, _offset, _step) {
            _window.scrollTo(0, -_offset * (_step_index /= _step) * (_step_index - 2) + _scrollTop)
        },
        scrollTop: function (_value) {
            var _backtop = this,
				_scrollTop = _backtop.getValue(),
				_fn = null,
				_interval_time = 5,
				_step_index = 0,
				_offset = 0,
				_step = parseInt(_scrollTop / 150);
            if (_value !== _scrollTop) {
                _offset = _value - _scrollTop;
                _fn = setInterval(function () {
                    if (_step_index <= _step) {
                        _backtop.updateValue(_step_index, _scrollTop, _offset, _step);
                        _step_index++
                    } else {
                        clearInterval(_fn)
                    }
                }, _interval_time)
            }
        },
        addCss: function () {
            var _str_class = ".ui-scrolltop{ display:block; position:fixed; _position:absolute; right:10px; bottom:200px; z-index: 9999; height:60px; width:60px; text-indent:-999999px; overflow: hidden; background:#000 url(http://localhost:7525/Images/up.png) 18px 21px no-repeat; *background-image:url(http://localhost:7525/Images/backtop.png);opacity:0.5; filter:alpha(opacity=50); cursor: pointer; -moz-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -webkit-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -o-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  transition: opacity 0.3s ease-in,opacity 0.3s ease-out; } .ui-scrolltop:hover{ opacity:1; filter:alpha(opacity=100); -moz-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -webkit-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -o-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  transition: opacity 0.3s ease-in,opacity 0.3s ease-out; } .ui-scrolltop-hidden{ visibility: hidden; _visibility:visible;_display:none;opacity:0; filter:alpha(opacity=0); -moz-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -webkit-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  -o-transition: opacity 0.3s ease-in,opacity 0.3s ease-out;  transition: opacity 0.3s ease-in,opacity 0.3s ease-out; }.ui-scrolltop-wb{ background-position:-25px 21px; background-color:#fff; }";
            return _str_class
        },
        createEl: function () {
            var _backtop = this,
				_str_class = _backtop.addCss(),
				_str_dom = '<a id="' + _str_J_ScrollTopBtn + '" class="ui-scrolltop ui-scrolltop-hidden ' + (_options.type == 2 ? "ui-scrolltop-wb" : "") + '" title="返回顶部">返回顶部</a>';
            el = _dom.create(_str_dom);
            _dom.addStyleSheet(_str_class);
            _dom.append(el, "body");
            return el
        },
        bindEvent: function () {
            var _backtop = this,
				_scrollEl = _backtop.scrollEl,
				_options_t = _options,
				_baseline = _options_t.baseLine;
            if (!_scrollEl) {
                return
            }
            _event.on(_scrollEl, "click", function (_event) {
                _event.preventDefault();
                if (_is_ie6) {
                    _dom.addClass(_scrollEl, _str_ui_scrolltop_hidden)
                }
                _options_t.isAnim ? _backtop.scrollTop(0) : _window.scrollTo(0, 0)
            });
            _event.on(_window, "scroll", S);
            if (_is_ie) {
                _event.on(_scrollEl, "mouseenter", function () {
                    _anim(_scrollEl, {
                        opacity: "1"
                    }, 0.2).run()
                });
                _event.on(_scrollEl, "mouseleave", function () {
                    _anim(_scrollEl, {
                        opacity: ".5"
                    }, 0.2).run()
                })
            }
            function S() {
                var _has_hidden_class = _dom.hasClass(_scrollEl, _str_ui_scrolltop_hidden),
					_scroll_top = parseInt(_dom.scrollTop(_document));
                if (_scroll_top > _baseline && _has_hidden_class) {
                    if (_is_ie) {
                        _anim(_scrollEl, {
                            opacity: "0.5"
                        }, 0.2).run()
                    }
                    _dom.removeClass(_scrollEl, _str_ui_scrolltop_hidden)
                } else {
                    if (_scroll_top < _baseline && !_has_hidden_class) {
                        if (_is_ie) {
                            _anim(_scrollEl, {
                                opacity: "0"
                            }, 0.2).run()
                        }
                        _dom.addClass(_scrollEl, _str_ui_scrolltop_hidden)
                    }
                }
                if (_is_ie6) {
                    var _viewportHeight = _dom.viewportHeight(_document),
						_top = (_scroll_top + _viewportHeight) - _options_t.bottom - _dom.height(_scrollEl);
                    _dom.css(_scrollEl, "top", _top)
                }
            }
        },
        init: function (A) {
            if (_kissy_J.get("#" + _str_J_ScrollTopBtn)) {
                return
            }
            var _backtop = this,
				_type_option = _get_value_from_attribute("type"),
				_anim_option = _get_value_from_attribute("anim");
            if (_type_option) {
                _options.type = _type_option
            }
            if (_anim_option) {
                _options.isAnim = _anim_option
            }
            _backtop.scrollEl = _backtop.createEl();
            _backtop.bindEvent()
        }
    };
    _kissy_J.ready(function () {
        _BackTop.init()
    })
})(window, KISSY, document);