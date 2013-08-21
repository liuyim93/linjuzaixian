/**
 * Created with JetBrains WebStorm.
 * User: basil
 * Date: 13-8-19
 * Time: 下午6:17
 * To change this template use File | Settings | File Templates.
 */
KISSY.add("tmall/mui/backtop/backtopv2", function (_kissy_J) {
    var _event = _kissy_J.Event,
		_dom = _kissy_J.DOM,
		_anim = _kissy_J.Anim,
        //2013-08-21 basilwang 加上_document和_window
        _document = document,
        _window  = window,
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
    };
    function BackTop() {
        if (!(this instanceof BackTop)) {
            return new BackTop()
        }
        this._init()
    }
    _kissy_J.augment(BackTop, {
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
            var _str_class = "ui-scrolltop";
            return _str_class
        },
        createEl: function () {
            var _backtop = this,
                _str_class = _backtop.addCss(),
                _str_dom = '<a id="' + _str_J_ScrollTopBtn + '" class="ui-scrolltop ui-scrolltop-hidden ' + (_options.type == 2 ? "ui-scrolltop-wb" : "") + '" title="返回顶部">返回顶部</a>';
            el = _dom.create(_str_dom);
            //_dom.addStyleSheet(_str_class);
            //2013-08-20 basilwang add class
            _dom.addClass(_str_class);
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
        _init: function (A) {
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
    });
    return {
        init: function () {
            new BackTop()
        }
    }
}, { requires: ["./backtopv2.css"]
});