KISSY.add("malldetail/sku/thumbViewer", function (_kissy, _dom, _event, _imagezoom_t, _json, _malldetail_common_util) {
    var _body = document.body,
        _dom_id_J_ImgBooth,
        _dom_id_J_UlThumb,
        _dom_li_array,
        _later_fn,
        L = 100,
        _str_classname_tb_selected = "tb-selected",
        _STR_HIDDEN = "hidden",
        _zoomlevel,
        _size_config = (window.g_config.D950) ? { size: [460, 460], smallSize: [60, 60], bigSize: [477, 335]} : { size: [310, 310], smallSize: [40, 40], bigSize: [430, 310] };
    var _loader_fn_factory = _malldetail_common_util.createLoader(function (_filter_pipeline_dry_fn) {
        if ("ontouchstart" in document) {
            return
        }
        var _imagezoom_cfg = { imageNode: _dom_id_J_ImgBooth, width: _size_config.bigSize[0], height: _size_config.bigSize[1], bigImageWidth: 800, bigImageHeight: 800, align: { node: _dom.parent(_dom_id_J_ImgBooth), points: ["tr", "tl"], offset: [10, -1] }, hasZoom: !("ontouchstart" in document), preload: false, showIcon: true };
        var _imagezoom = new _imagezoom_t(_imagezoom_cfg);
        if (_imagezoom.lensIcon) {
            _event.on(_imagezoom.lensIcon, "mouseenter", function () {
                _dom.hide(this)
            })
        }
        _filter_pipeline_dry_fn(_imagezoom)
    });
    function C(_url, W, V) {
        var S = C.images || (C.images = {});
        S[_url] = S[_url] || (S[_url] = _malldetail_common_util.createLoader(function (_imagezoom_t) {
            var _images = new Image();
            _event.on(_images, "load", function () {
                _imagezoom_t(_images)
            });
            _images.src = _url;
            var Y = C.elem;
            if (!Y) {
                Y = C.elem = _dom.create('<div style="width:0;height:0;overflow:hidden;">');
                _body.insertBefore(Y, _body.firstChild)
            }
            Y.appendChild(_images)
        }));
        return S[_url](W, V)
    }
    function _remove_img_size_to_url(_img) {
        var _url = _img.src || _dom.attr(_img, "data-ks-lazyload");
        //return _url.replace(new RegExp("_" + _size_config.smallSize.join("x") + "\\.(jpg|png|gif)$"), "")
        //2013-05-01 basilwang don't filter _60*60
        return _url.replace(new RegExp("\\.(jpg|png|gif)$"), "")
    }
    return { init: function () {
        var _thumbviewer = this;
        if (!(_dom_id_J_ImgBooth = _dom.get("#J_ImgBooth")) || !(_dom_id_J_UlThumb = _dom.get("#J_UlThumb"))) {
            return
        }
        _dom_li_array = _dom.query("li", _dom_id_J_UlThumb);
        _zoomlevel = parseInt(_dom_id_J_ImgBooth.getAttribute("data-hasZoom"), 10);
        _thumbviewer._bindEvents();
        _kissy.ready(function () {
            var _dom_li_selected = _dom.query("." + _str_classname_tb_selected, _dom_id_J_UlThumb);
            if (_dom_li_selected && _dom_li_selected.length) {
                _thumbviewer._switchTo(_dom_li_selected[0])
            }
        })
    }, _bindEvents: function () {
        var _thumbviewer = this;
        _event.on(_dom_id_J_UlThumb, "click", function (_e) {
            _e.preventDefault()
        });
        _event.on(_dom_li_array, "mouseenter", function (_e) {
            _later_fn && _later_fn.cancel();
            _later_fn = _kissy.later(function () {
                _thumbviewer._switchTo(_e.target);
                _kissy.sendAtpanel("tmalldetail.13.6")
            }, L)
        });
        _event.on(_dom_li_array, "mouseleave", function () {
            _later_fn && _later_fn.cancel()
        })
    }, _switchTo: function (_dom_li) {
        if (!_dom_li) {
            return
        }
        if (_dom_li.tagName !== "LI") {
            _dom_li = _dom.parent(_dom_li, "li")
        }
        var _img = _dom_li.getElementsByTagName("img")[0];
        var _url_to_be_added_img_size = _remove_img_size_to_url(_img);
        if (!_url_to_be_added_img_size) {
            return
        }
        var _url = _url_to_be_added_img_size + "_" + _size_config.size.join("x") + ".jpg";
        var _data_size = _dom.attr(_dom_li, "data-size");
        var _set_zm = function (_data_size_attr) {
            if (_data_size_attr.zm) {
                _loader_fn_factory(function (_imagezoom_t) {
                    _imagezoom_t.set(_url);
                    _imagezoom_t.set("hasZoom", true);
                    _imagezoom_t.set("bigImageSrc", _url_to_be_added_img_size);
                    _imagezoom_t.set("bigImageWidth", _data_size_attr.w);
                    _imagezoom_t.set("bigImageHeight", _data_size_attr.h)
                })
            }
        };
        this.show(_url);
        _dom.addClass(_dom_li, _str_classname_tb_selected);
        _data_size = _json.parse(_data_size);
        if (_data_size) {
            _set_zm(_data_size)
        } else {
            C(_url_to_be_added_img_size, function (a) {
                Z.zm = (a.width >= _zoomlevel) ? 1 : 0;
                _dom.attr(_dom_li, { "data-size": _json.stringify(Z) });
                _set_zm(Z)
            })
        }
    }, show: function (_url) {
        if (!_dom_id_J_ImgBooth || !_dom_id_J_UlThumb) {
            _dom_id_J_ImgBooth = _dom_id_J_ImgBooth || _dom.get("#J_ImgBooth");
            _dom_id_J_UlThumb = _dom_id_J_UlThumb || _dom.get("#J_UlThumb")
        }
        if (!_dom_id_J_ImgBooth || !_dom_id_J_UlThumb) {
            return
        }
        _dom.removeClass(_dom_li_array, _str_classname_tb_selected);
        _dom_id_J_ImgBooth.src = _url;
        _loader_fn_factory(function (_imagezoom_t) {
            _imagezoom_t && _imagezoom_t.set("hasZoom", false)
        })
    } 
    }
}, { requires: ["dom", "event", "imagezoom", "json", "malldetail/common/util"] }); /*pub-1|2013-01-06 16:13:19*/