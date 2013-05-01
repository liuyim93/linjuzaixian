KISSY.add("malldetail/other/attributes", function (_kissy_A, _template, _dom) {
    return _kissy_A.mods.attributes = {
        init: function (_spuMaintainerDO) {
            var _dom_id_J_AttrList = _kissy_A.get("#J_AttrList");
            var _template_snippet = [];
            var _kv_set = [{
                k: "providerList",
                v: '<span data-spm="1000807">产品信息由 {{html}} {{#if len>1}}等{{/if}}发布</span>'
            }, {
                k: "reviewerList",
                v: '<span data-spm="1000808">由 {{html}} {{#if len>1}}等{{/if}}确认</span>'
            }, {
                k: "maintainerList",
                v: '<span data-spm="1000809">感谢由 {{html}} {{#if len>1}}等{{/if}}商家的维护</span>'
            }];
            if (!_dom_id_J_AttrList || !_spuMaintainerDO) {
                return
            }
            for (var _index = 0; _index < _kv_set.length; _index++) {
                var _kv_item = _kv_set[_index];
                if (_kv_item.k in _spuMaintainerDO) {
                    var _item_snippet = [];
                    var K = _spuMaintainerDO[_kv_item.k];
                    if (K.length) {
                        for (var _index_j = 0, _len = K.length; _index_j < _len; _index_j++) {
                            _item_snippet.push('<a href="' + K[_index_j].shopUrl + '" target="_blank">' + K[_index_j].shopName + "</a>")
                        }
                        _template_snippet.push(_template(_kv_item.v).render({
                            html: _item_snippet.join("、"),
                            len: _len
                        }))
                    }
                }
            }
            if (_template_snippet.length) {
                _dom_id_J_AttrList.innerHTML += '<div class="tm-attr-list-ft">' + _template_snippet.join("，") + "。</div>"
            }
        }
    }
}, {
    requires: ["template", "dom", "malldetail/other/attributes.css"]
}); 