KISSY.add("malldetail/sku/popupsimulate", function (_kissy_imp, _malldetail_sku_validator) {
    var _mods_SKU = _kissy_imp.mods.SKU, _kissy = KISSY, _dom = _kissy.DOM, _event = _kissy.Event, _document = document, _body = _document.body;
    _mods_SKU.PopupSimulate = function () {
        var _str_tb_act = "tb-act", _str_click = "click", _tb_attention = "tb-attention", _tb_btn_inbox = "tb-btn-inbox";
        var _has_divKeyProp_loaded = false;
        var _cfg;
        var _dom_div_class_KeyProp;
        var _add_tb_note_title = function () {
            var _dom_b_class_J_PanelCloser, _linkAdd = _cfg.linkAdd, _linkBasket = _cfg.linkBasket;
            if (!_dom_div_class_KeyProp) {
                return
            }
            var _dom_p = document.createElement("p");
            _dom_p.className = "tb-note-title";
            _dom_p.innerHTML = '请选择您要的商品信息<b class="J_PanelCloser">关闭</b>';
            var _dom_div_class_tb_skin = _kissy.query("div.tb-skin", _dom_div_class_KeyProp)[0];
            _dom_div_class_tb_skin.insertBefore(_dom_p, _dom_div_class_tb_skin.firstChild);
            _dom_b_class_J_PanelCloser = _kissy.query("b.J_PanelCloser", _dom_div_class_KeyProp);
            _kissy.each([_cfg.linkBuy, _linkAdd, _linkBasket], function (_dom_item) {
                if (_dom_item) {
                    _event.on(_dom_item, _str_click, function () {
                        _dom.removeClass(_kissy.query("a." + _str_tb_act, _dom_div_class_KeyProp), _str_tb_act);
                        _dom.addClass(this, _str_tb_act)
                    })
                }
            });
            _dom_div_class_KeyProp.close = function () {
                _dom.removeClass(_dom_div_class_KeyProp, _tb_attention);
                //2013-04-16 basilwang can't find tb-btn-inbox
                _dom.removeClass(_kissy.query("a." + _tb_btn_inbox, _dom_div_class_KeyProp), _tb_btn_inbox)
            };
            _event.on(_dom_b_class_J_PanelCloser, _str_click, _dom_div_class_KeyProp.close);
            if (_cfg.elmProps) {
                _kissy.each(_cfg.elmProps, function (_elmProp) {
                    _event.on(_elmProp, _str_click, _validator_run_when_attention)
                })
            }
        };
        function _validator_run_when_attention() {
            if (!_dom_div_class_KeyProp) {
                return
            }
            var _dom_a_class_tb_act = _kissy.query("a." + _str_tb_act, _dom_div_class_KeyProp);
            if (_dom.hasClass(_dom_div_class_KeyProp, _tb_attention)) {
                if (_malldetail_sku_validator.run()) {
                    _dom.addClass(_dom_a_class_tb_act, _tb_btn_inbox)
                } else {
                    _dom.removeClass(_dom_a_class_tb_act, _tb_btn_inbox)
                }
            }
        }
        function _get_divKeyProp() {
            _cfg = _kissy_imp.cfg();
            _dom_div_class_KeyProp = _cfg.divKeyProp;
            _has_divKeyProp_loaded = true
        }
        return { init: function () {
            if (!_has_divKeyProp_loaded) {
                _get_divKeyProp()
            }
            _add_tb_note_title()
        }, checkActs: function () {
            if (!_has_divKeyProp_loaded) {
                _get_divKeyProp()
            }
            _validator_run_when_attention()
        } 
        }
    } ()
}, { requires: ["malldetail/sku/validator"] }); /*pub-1|2013-01-06 16:13:20*/