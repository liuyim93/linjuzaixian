KISSY.add("malldetail/other/attributes", function (_kissy_A, _template, _dom) {
    return _kissy_A.mods.attributes = {
        init: function (F) {
            var _dom_id_J_AttrList = _kissy_A.get("#J_AttrList");
            var L = [];
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
            if (!_dom_id_J_AttrList || !F) {
                return
            }
            for (var _index = 0; _index < _kv_set.length; _index++) {
                var _kv_item = _kv_set[_index];
                if (_kv_item.k in F) {
                    var H = [];
                    var K = F[_kv_item.k];
                    if (K.length) {
                        for (var _index_j = 0, _len = K.length; _index_j < _len; _index_j++) {
                            H.push('<a href="' + K[_index_j].shopUrl + '" target="_blank">' + K[_index_j].shopName + "</a>")
                        }
                        L.push(_template(_kv_item.v).render({
                            html: H.join("、"),
                            len: _len
                        }))
                    }
                }
            }
            if (L.length) {
                _dom_id_J_AttrList.innerHTML += '<div class="tm-attr-list-ft">' + L.join("，") + "。</div>"
            }
        }
    }
}, {
    requires: ["template", "dom", "malldetail/other/attributes.css"]
}); 