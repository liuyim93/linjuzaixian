/**
 * Created with JetBrains WebStorm.
 * User: tangtang
 * Date: 13-2-3
 * Time: 下午10:04
 * To change this template use File | Settings | File Templates.
 */
/*pub-1|2013-01-15 17:19:40*/
KISSY.add("2012/mods/direct-promo",function (_kissy_t, O) {
        var _kissy = KISSY,
            _dom = _kissy.DOM,
            _delivery_url = "http://delta.taobao.com/home/delivery/AllContentByPage.do?resourceIds=",
            _str_J_DirectPromo = "J_DirectPromo",
            _str_J_DirectPromo_ = "J_DirectPromo_",
            _str_J_DirectPromoFloatBox = "J_DirectPromoFloatBox",
            _str_content_results = "__content_results",
            _reg_for_http = /^https?:\/\/\S+$/i,
            _reg_for_image = /^https?:\/\/\S+(png|jpg|gif)$/i,
            _window = window,
            D = false,
            _resid_dict = {},
            __content_results_array = [];
        var _config = _window.g_config;
        function _add_array(_array_to_be_added, _container_array) {
            var _index = _array_to_be_added.length, item;
            while (_index--) {
                item = _array_to_be_added[_index];
                if (!_kissy.inArray(item, _container_array))
                { _container_array.push(item) }
            }
            return _container_array
        }
        var DirectPromo = { init: function (_init_resid_array) {
            var _node_class_J_DirectPromo = _kissy.query("." + _str_J_DirectPromo),
                _resids = [],
                _resid; if (!_node_class_J_DirectPromo || _node_class_J_DirectPromo.length === 0) { return }
            _kissy.each(_node_class_J_DirectPromo, function (_node) {
                _resid = _node.getAttribute("data-resid");
                if (_resid) { _resids.push(_resid); _resid_dict[_resid] = _node }
            });
            _init_resid_array && (_resids = _add_array(_init_resid_array, _resids));
            this.request(_resids)
        }
            , request: function (_resids, V, T) {
                var _directpromo = this;
                var _url = _delivery_url + _resids.join(",") + "&t=" + +new Date;
                var _params = window.location.href.split("?")[1] || "";
                var _param_array = _kissy.unparam(_params);
                if (_param_array && _param_array.preview && _param_array.preview == "preview") {
                    _url += "&preview=preview"
                }
                _kissy.getScript(_url, function () {
                    var __content_result_object = _window[_str_content_results], _content, _index = 0; if (!__content_result_object || __content_result_object.length === 0) { return }
                    if (V && V > 0) {
                        for (; _index < V; _index++) {
                            _content = __content_result_object[_index].content;
                            if (_content && _reg_for_image.test(_content)) {
                                new Image().src = _content
                            }
                        }
                    }
                    __content_results_array = __content_results_array.concat(__content_result_object);
                    _directpromo.render(T);
                    MFP.fire("directSuccess", { data: _window[_str_content_results] })
                })
            }, render: function (T) {
                var _len = __content_results_array.length, __content_result, _dom_res, _id;
                while (_len--) {
                    __content_result = __content_results_array[_len];
                    _id = __content_result.id;
                    if (!_resid_dict[_id])
                    {
                        _dom_res = _kissy.get("#" + (_id === T ? _str_J_DirectPromoFloatBox : _str_J_DirectPromo_ + _id));
                        if (_dom_res)
                        {
                            _resid_dict[_id] = _dom_res
                        }
                        else
                        {
                            continue
                        }
                    }
                    __content_results_array.splice(_len, 1);
                    this._fill(__content_result)
                }
            }, detect: function (S) {
                var R = 100, V = 50, U = 0, T = this; if (D) { return } D = true;
                (function () {
                    var X, W; _kissy.each(__content_results_array, function (Z, Y) {
                            X = Z.id;
                            if (!_resid_dict[X]) {
                                W = _kissy.get("#" + (X === S ? _str_J_DirectPromoFloatBox : _str_J_DirectPromo_ + X));
                                if (W) { _resid_dict[X] = W }
                            }
                            if (_resid_dict[X]) {
                                T._fill(__content_results_array.splice(Y, 1)[0]);
                                return false
                            }
                        }
                    );
                    if (__content_results_array.length > 0 && ++U < V) { setTimeout(arguments.callee, R) } else { D = false }
                })()
            }, _fill: function (_content_result) {
                var _id = _resid_dict[_content_result.id], _content = _content_result.content, _link = _content_result.link, _str_html_snippet;
                if (!_id || !_content)
                { return }
                if (_reg_for_image.test(_content)) { _str_html_snippet = '<img src="' + _content + '" />' }
                else {
                    if (_content == "http://tms.tms.tms")
                    { return }
                    else {
                        if (_reg_for_http.test(_content)) {
                            _str_html_snippet = '<iframe src="' + _content + '" scrolling="no" frameborder="0" width="330" height="200"></iframe>';
                            _link = ""
                        }
                        else {
                            if (_content_result.id == 395) {
                                if (_content && _content == "chaoshi")
                                { _dom.show(_id) }
                                else
                                { _dom.remove(_id) }
                                return
                            }
                            else {
                                if (_content_result.id == 396) {
                                    var T = _dom.create(_content);
                                    if (_kissy.get("#J_Category")) {
                                        _dom.attr("#J_Category", "data-spm", _dom.attr(T, "data-spm"));
                                        _kissy.one("#j_Menu").html(_kissy.one("#j_Menu", T).html());
                                        _kissy.use("2012/mods/category", function (X, Y) {
                                            new Y("#J_Category",
                                                { viewId: "#J_SubCategory", subViews: ".j_SubView", triggers: ".j_MenuItem", bottomCl: ".j_BottomMenu", dataUrl: "http://" + location.host + "/go/rgn/mfp2012/all-cat-asyn.php"
                                                })
                                        })
                                    }
                                    return
                                }
                                else { _str_html_snippet = _content }
                            }
                        }
                    }
                }
                _id.innerHTML = _link ? '<a target="_blank" href="' + _link + '">' + _str_html_snippet + "</a>" : _str_html_snippet
            }
        };
        return DirectPromo
    }
);
