var TMall = window.TMall || {};
TMall.Head = function () {
    var _kissy = KISSY, _document = document;
    var _ie6_hack_judgement = !"0"[0],
        _is_ie6 = _ie6_hack_judgement && !window.XMLHttpRequest,
        _is_ie_may_need_fix = !!window.ActiveXObject;
    var _STR_MOUSEOVER = "mouseover",
        _STR_MOUSEENTER = "mouseenter",
        _STR_MOUSELEAVE = "mouseleave";
    //var _url = ~location.host.indexOf(".net") ? "assets.daily.taobao.net" : "a.tbcdn.cn";
    var _url="www.linjuzaixian.com";
    var _dom_scripts = _document.getElementsByTagName("script");
    var _last_dom_script = _dom_scripts[_dom_scripts.length - 1];
    var _script_src = _last_dom_script.src || "";
    var C = _script_src.substring(_script_src.lastIndexOf("?") + 1, _script_src.length);
    var B = "http://" + _url + "/apps/tmall/header/shop/header.js?t=" + (C || "20120926");
    var _cat_nav_asyn_url = "http://www.linjuzaixian.com/category/home/cat_nav_asyn";
    var _dom_id_mallSearch;
    var _is_loaded = false;
    function _getElementById(_id) {
        return _document.getElementById(_id)
    }
    function _addEventCombo(_object, _event, _function, _is_capture) {
        if (!_object) {
            return
        }
        if (_object.addEventListener) {
            _object.addEventListener(_event, _function, !!_is_capture)
        } else {
            if (_object.attachEvent) {
                _object.attachEvent("on" + _event, _function)
            }
        }
    }
    function _removeEventCombo(_object, _event, _function, _is_capture) {
        if (!_object) {
            return
        }
        if (_object.removeEventListener) {
            _object.removeEventListener(_event, _function, !!_is_capture)
        } else {
            if (_object.detachEvent) {
                _object.detachEvent("on" + _event, _function)
            }
        }
    }
    var K = function () {
        var S = 0;
        var _dom_search_input, _form, _label_for_search_tip, _dom_SearchBtn, _dom_CurrShopBtn;
        function _show_label_for_search_tip() {
            setTimeout(function () {
                if (_dom_search_input.value == "") {
                    _label_for_search_tip.style.visibility = "visible"
                }
            }, 100)
        }
        function X() {
            if (!_kissy.DOM && S < 50) {
                setTimeout(arguments.callee, 200);
                S++;
                return
            }
            TMall.THeader ? TMall.THeader.init() : _kissy.getScript(B, function () {
                TMall.THeader.init()
            });
            _removeEventCombo(_dom_id_mallSearch, _STR_MOUSEOVER, X)
        }
        function _search_form_submit() {
            var _dom_id_J_shopSearchData = _getElementById("J_shopSearchData");
            var _shop_url = !!_dom_id_J_shopSearchData ? _dom_id_J_shopSearchData.getAttribute("data-shopUrl") : _dom_search_input.getAttribute("data-current");
            _addEventCombo(_dom_CurrShopBtn, "click", function () {
                if ("" !== _kissy.trim(_dom_search_input.value)) {
                    _form.setAttribute("action", _shop_url);
                    _populate_search_form(_form, { search: "y", newHeader_b: "s_from", searcy_type: "item" })
                }
                _dom_SearchBtn.click()
            })
        }
        function _set_search_shortkey() {
            var _keydown_fn = function () {
                var _event = arguments[0] || win.event, _keycode = _event.keyCode;
                if (_event.shiftKey && (_keycode == 191 || _keycode == 229)) {
                    _kissy.getScript("http://" + _url + "/apps/tmall/header/common/quick-search.css", function () {
                        _kissy.getScript("http://" + _url + "/apps/tmall/header/common/quick-search.js")
                    });
                    _removeEventCombo(_document.body, "keydown", arguments.callee)
                }
            };
            _addEventCombo(_document.body, "keydown", _keydown_fn)
        }
        function _populate_search_form(_form_search_t, _form_search_cfg) {
            function _create_input_dom(_name, _value) {
                var _input_t = _document.createElement("input");
                _input_t.setAttribute("type", "hidden");
                _input_t.setAttribute("name", _name);
                _input_t.setAttribute("value", _value);
                return _input_t
            }
            for (var _cfg_item in _form_search_cfg) {
                if (!_form_search_t[_cfg_item]) {
                    _form_search_t.appendChild(_create_input_dom(_cfg_item, _form_search_cfg[_cfg_item]))
                } else {
                    _form_search_t[_cfg_item].value = _form_search_cfg[_cfg_item]
                }
            }
        }
        return { init: function () {
            _dom_id_mallSearch = _getElementById("tmallSearch") || _getElementById("mallSearch");
            if (!_dom_id_mallSearch) {
                return
            }
            _dom_search_input = _getElementById("mq");
            _form = _dom_search_input.form;
            _label_for_search_tip = _form.getElementsByTagName("label")[0];
            _dom_CurrShopBtn = _getElementById("J_CurrShopBtn");
            _dom_SearchBtn = _getElementById("J_SearchBtn");
            _show_label_for_search_tip();
            _addEventCombo(_dom_id_mallSearch, _STR_MOUSEOVER, X);
            _search_form_submit();
            _set_search_shortkey();
            _is_loaded = true
        } 
        }
    } ();
    return { init: function () {
        if (_is_loaded) {
            return
        }
        _kissy.ready(function () {
            K.init();
            if (_is_ie6) {
                var _dom_id_shop_info = _getElementById("shop-info");
                _addEventCombo(_dom_id_shop_info, _STR_MOUSEENTER, function () {
                    _dom_id_shop_info.className += " expanded"
                });
                _addEventCombo(_dom_id_shop_info, _STR_MOUSELEAVE, function () {
                    _dom_id_shop_info.className = _dom_id_shop_info.className.replace("expanded", "")
                });
                var _dom_id_content = _getElementById("content"), _dom_id_hd;
                if (_dom_id_content && ! ~_dom_id_content.className.indexOf("head-expand")) {
                    _dom_id_hd = _getElementById("hd") || _getElementById("shop-hd");
                    if (_dom_id_hd && _dom_id_hd.offsetHeight && _dom_id_hd.offsetHeight > 150) {
                        _dom_id_hd.style.height = "150px"
                    }
                }
            }
        })
    } 
    }
} (); 