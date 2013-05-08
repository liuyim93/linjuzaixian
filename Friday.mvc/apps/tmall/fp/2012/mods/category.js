/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-3
 * Time: 下午10:01
 * To change this template use File | Settings | File Templates.
 */
/*pub-1|2013-01-15 17:19:40*/
KISSY.add("2012/mods/category",function (_kissy_t, _directpromo) {
        var _kissy = KISSY,
            _dom = _kissy.DOM,
            _event = _kissy.Event,
            _window = window,
            _document = document,
            _is_ie6 = (_kissy.UA.ie == 6),
            _str_selected = "selected",
            _str_hidden = "hidden",
            _str_div = "DIV",
            _str_mouseenter = "mouseenter",
            _str_mouseleave = "mouseleave",
            _str_click = "click";
        var _g_config = _window.g_config;
        var _options = { showDelay: 0.1, hideDelay: 0.1, viewId: null, subViews: null, triggers: null, lazyload: true, dataUrl: null };
        var _viewer_final_width = "755px";
        var _subviewer_padding_height = 10;
        var _subviewer_shadow_padding_height_ = 10;
        var _is_hidden = true;
        var G = false;
        var I = _g_config.isTestEnv ? "http://110.75.14.52/recommend.htm?appId=12001&uid=100028393" : "http://ald.taobao.com/recommend.htm?appId=12001";
        function Category(_selector, _op) {
            var _category = this;
            if (!(_category instanceof Category))
            { return new Category(_selector, _op) }
            _category.container = _kissy.get(_selector);
            _category.config = _kissy.merge(_options, _op || {});
            _category.config.viewer = _kissy.get(_op.viewId, _category.container);
            _category.triggers = _dom.query(_op.triggers, _category.container);
            _category._init()
        }
        function _indexOf(_array, _item) {
            for (var i = 0; i < _array.length; i = i + 1)
            { if (_array[i] === _item) { return i } } return -1
        }
        _kissy.mix(Category.prototype, { changeTrigger:
            function (_index) {
                var _category = this;
                var _triggers = _category.triggers, _trigger_changed = _triggers[_index];
                _kissy.each(_triggers, function (_trigger) { _dom.removeClass(_trigger, _str_selected) });
                _dom.addClass(_trigger_changed, _str_selected);
                _category.triggerIdx = _index
            },
            changeView: function (_subView) {
                var _category = this;
                _kissy.each(_category.subViews, function (a) { _dom.addClass(a, _str_hidden) });
                _dom.removeClass(_subView, _str_hidden);
                var _subview_height = _dom.height(_subView);
                _dom.height(_category.viewer, (_subview_height + _subviewer_padding_height + _subviewer_shadow_padding_height_) + "px");
                _category.resetPostion();
                if (!_category.shadow) { _category.shadow = _dom.get(".shadow", _category.viewer) }
                _dom.height(_category.shadow, (_subview_height + _subviewer_shadow_padding_height_) + "px")
            }, show: function () {
                var _category = this, _config = _category.config;
                var _subViews = _category.subViews;
                var _idx = _config.idx;
                var _selected_subView = _category.isDataReady ? _subViews[_idx] : _subViews[0];
                var _viewer_width = _dom.width(_category.viewer);
                if (_category.hideTimer) { clearTimeout(_category.hideTimer) }
                if (_is_hidden && _viewer_width == 0) {
                    if (_category.expandTimer)
                    { clearTimeout(_category.expandTimer) }
                    _category.expandTimer = setTimeout(function () {
                            G = false;
                            _is_hidden = false;
                            _category.changeTrigger(_idx);
                            _category.changeView(_selected_subView);
                            if (!_is_ie6) {
                                new _kissy.Anim(_category.viewer, { width: _viewer_final_width }, 0.2, "linear").run()
                            }
                            else
                            { _dom.width(_category.viewer, _viewer_final_width) }
                        }
                        , _config.showDelay * 500)
                }
                else {
                    if (_category.resetTimer) {
                        clearTimeout(_category.resetTimer)
                    }
                    _category.resetTimer = setTimeout(function () {
                            if (_category.status == "visible") {
                                _category.changeTrigger(_idx);
                                _category.changeView(_selected_subView)
                            }
                        }
                        , _config.showDelay * 1000)
                }
            },
            hide: function (_index) {
                var _category = this, _config = _category.config, _triggers = _category.triggers, _trigger_to_hide = _triggers[_index];
                _category.status = "hidden";
                _is_hidden = true;
                _category.triggerIdx = null;
                if (_category.viewer) {
                    if (_category.expandTimer) { clearTimeout(_category.expandTimer) }
                    if (_category.hideTimer) { clearTimeout(_category.hideTimer) }
                    _category.hideTimer = setTimeout(function () {
                        _kissy.each(_triggers, function (_trigger) { _dom.removeClass(_trigger, _str_selected) });
                        _dom.css(_category.viewer, { width: "0" })
                    }, _config.hideDelay * 1000)
                }
            }, resetPostion: function () {
                var _trigger = this.triggers[this.config.idx],
                    _trigger_top = _dom.offset(_trigger).top,
                    _container_offset = _dom.offset(this.container),
                    _trigger_height = _dom.height(_trigger),
                    _viewer_height = _dom.height(this.viewer),
                    _trigger_width = _dom.width(_trigger),
                    _viewportHeight = _dom.viewportHeight(),
                    _scrollTop = _dom.scrollTop(),
                    _trigger_minus_scroll = _trigger_top - _scrollTop,
                    _space_if_minus_viewerheight_and_trigger_minus_scroll = _viewportHeight - _viewer_height - _trigger_minus_scroll,
                    _height_space_available_for_viewer = _viewportHeight - _trigger_minus_scroll,
                    _trigger_top_from_container_top = _trigger_top - _container_offset.top;
                if (_space_if_minus_viewerheight_and_trigger_minus_scroll <= 0)
                {
                    _space_if_minus_viewerheight_and_trigger_minus_scroll = Math.abs(_space_if_minus_viewerheight_and_trigger_minus_scroll);
                    var h = 20;
                    if (_height_space_available_for_viewer > _trigger_height)
                    {
                        var d = _height_space_available_for_viewer - _trigger_height;
                        if (d > h)
                        {
                            _trigger_top_from_container_top = _trigger_top_from_container_top - _space_if_minus_viewerheight_and_trigger_minus_scroll - h + 7
                        }
                        else
                        {
                            _trigger_top_from_container_top = _trigger_top_from_container_top - _space_if_minus_viewerheight_and_trigger_minus_scroll
                        }
                    }
                    else
                    {
                        _trigger_top_from_container_top = _trigger_top_from_container_top - _space_if_minus_viewerheight_and_trigger_minus_scroll + h + _height_space_available_for_viewer + 20
                    }
                }
                if (_trigger_top_from_container_top < 30)
                {
                    _trigger_top_from_container_top = 30
                }
                var c = _kissy.UA.ie ? 0 : _subviewer_padding_height;
                if (!_is_ie6 && G) { new _kissy.Anim(this.viewer, { top: (_trigger_top_from_container_top - c) + "px" }, 0.3, "easeOutStrong").run() }
                else {
                    this.viewer.style.top = (_trigger_top_from_container_top - c) + "px";
                    G = true
                }
            }, _load: function (_url) {
                var _category = this, _config = _category.config; _kissy.IO.get(_url, _is_ie6 ? { t: +new Date} : {}, function (_html_snippet) {
                        if (!_html_snippet)
                          { return }
                        newViewer = _dom.create(_html_snippet);
                        _dom.html(_category.viewer, _dom.html(newViewer));
                        _category.subViews = _dom.query(_config.subViews, _category.viewer);
                        _category.shadow = _dom.get(".shadow", _category.viewer);
                        _category.isDataReady = true;
                        if (_category.status == "visible") {
                            _is_hidden = false;
                            _category.show()
                        }
                        //2013-03-06 basiwang check direct-promo
                        //2013-02-03 TODO(basilwang) no direct-promo
                        _directpromo.render()
                    }
                    ,
                    "text")
            }
            , _init: function () {
                var _category = this, _config = _category.config;
                _kissy.each(_category.triggers, function (_trigger) {
                    _event.on(_trigger, "mouseenter tap", function (_event) {
                            _event.halt(); var _index = _indexOf(_category.triggers, _trigger);
                            _config.idx = _index; _category.status = "visible";
                            if (_event.type === "tap" && _index === _category.triggerIdx)
                            { _category.hide(_config.idx); return }
                            if (!_category.viewer) {
                                if (!_config.viewer && _config.lazyload) {
                                    _category.viewer = _dom.create('<div id="J_SubCategory" class="subCategory"><div class="shadow"></div><div class="subView j_SubView" style="height:520px; text-align:center; line-height:520px;">loading...</div></div>');
                                    _category.container.appendChild(_category.viewer);
                                    _category.subViews = _dom.query(_config.subViews, _category.viewer);
                                    _category.isDataReady = false;
                                    _category._load(_config.dataUrl)
                                }
                                else {
                                    _category.viewer = _config.viewer;
                                    _category.subViews = _dom.query(_config.subViews, _category.viewer);
                                    _category.isDataReady = true
                                }
                            }
                            _category.show()
                        }
                    )
                    ;
                    _event.on(_trigger, _str_mouseleave, function (_event) { _category.status = "triggerLeave" })
                });
                _event.on(_category.container, _str_mouseleave, function (_event) { _category.hide(_config.idx) });
                _event.on(_config.bottomCl, "mouseenter mouseleave", function (_event) {
                    _dom.toggleClass(_config.bottomCl, _str_selected);
                    if (_event.type === "mouseenter") { _category.hide(_config.idx) }
                });
                /*2013-03-07 basilwang 所有商品分类*/
                _event.on(".categoryHd", _str_mouseenter, function (_event) { _category.hide(_config.idx) })
            }, getRecData: function ()
            {
                var _category = this; _kissy.jsonp(I, { t: +new Date }, function (Y) { if (!Y) { return } _category.renderRecData(Y); _category.RecData = Y })
            },
            renderRecData: function (Z) {
                if (!Z) { return } var Y = this; var S = _dom.query("p.subItem-brand", Y.subViews[Y.config.idx]); _kissy.each(S, function (d) {
                    var b = _dom.attr(d, "recommend-id");
                    var a = ""; if (b && Z[b]) { for (var c = 0; c < Z[b].length; c++) { a += '<a href="' + Z[b][c].linkedUrl + '" target="_blank">' + Z[b][c].brandName + "</a>" } _dom.html(d, a) }
                })
            }
        });
        return Category
    }, { requires: ["2012/mods/direct-promo"] });