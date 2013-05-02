KISSY.add("malldetail/data/data", function (_kissy, _ajax, _malldetail_common_util) {
    var _iterator_queue_fn_wrapper, _time, _createAsyn_wrapper, _global_defaultModel,
        _loader_fn_factory = _malldetail_common_util.createLoader(
               function (_filter_pipeline_dry_fn) {
                 _iterator_queue_fn_wrapper = _iterator_queue_fn_wrapper ? _iterator_queue_fn_wrapper(_filter_pipeline_dry_fn) : _filter_pipeline_dry_fn
               }
            );
    function _population_cfg(_defaultMode) {
        var _cfg = _kissy.cfg(), _itemPriceResultDO = _defaultMode.itemPriceResultDO || {};
        var _tradeResult = _defaultMode.tradeResult;
        if (_itemPriceResultDO.areaId) {
            _cfg.destination = _itemPriceResultDO.areaId
        }
        _cfg.meizDO = _defaultMode.meizDO;
        _cfg.itemPriceResultDO = _itemPriceResultDO;
        if (_itemPriceResultDO && _itemPriceResultDO.campaignInfo && _itemPriceResultDO.campaignInfo.campaignId) {
            _cfg.varPromotionId = _itemPriceResultDO.campaignInfo.campaignId
        }
        if (_tradeResult.cartEnable && _tradeResult.cartType == 2 && (!(_cfg.valMode & 2048))) {
            _cfg.valMode += 2048
        }
        _cfg.tradeType = _tradeResult.tradeType;
        _cfg.apparelDO = _defaultMode.apparelDO;
        _cfg.userInfoDO = _defaultMode.userInfoDO;
        _cfg.systemTime = _defaultMode.miscDO["systemTime"];
        _cfg.is1111 = (_cfg.systemTime >= 1352563200000 && _cfg.systemTime < 1352649600000)
    }
    var _malldetail_data_data = {
        setMdskip: function (_defaultModelObject, _elapsed_time) {
        if (_elapsed_time >= 0) {
            if (_defaultModelObject) {
                _kissy.sendAcAtpanel("tmalldetail.15.1", { tl: _elapsed_time })
            } else {
                _kissy.sendErr("mdskipTimeout", { tl: _elapsed_time })
            }
        }
        _iterator_queue_fn_wrapper = _iterator_queue_fn_wrapper ? _iterator_queue_fn_wrapper(_defaultModelObject || {}) : function (_iterator_queue_fn) {
            _iterator_queue_fn(_defaultModelObject || {})
        }
    },
        onMdskip: _loader_fn_factory,
        setMdskipTimeout: function (_timeout) {
        _time = _timeout
    },
        onModel: function (_success_callback_fn, _state) {
        if (!_createAsyn_wrapper) {
            _createAsyn_wrapper = _malldetail_common_util.createAsyn(_loader_fn_factory, _time || 3000);
            _createAsyn_wrapper(function (_defaultModelObject) {
                _defaultModelObject = _defaultModelObject || {};
                var _defaultModel, _sku_cfg = _kissy.cfg();    //the same with TShop.Setup(config)
                if (_defaultModelObject.isSuccess) {
                    _defaultModel = _defaultModelObject.defaultModel;
                    if (_defaultModel.tradeResult) {
                        if (_kissy.isUndefined(_defaultModel.tradeResult.tradeType) || _defaultModel.tradeResult.tradeType == null) {
                            _defaultModel.tradeResult.tradeType = _sku_cfg.tradeType
                        }
                    }
                    if (_kissy.cfg("detailMode") == "skipError") {
                        _kissy.cfg("detailMode", "skipOkAfterError")
                    } else {
                        _kissy.cfg("detailMode", "skipOk")
                    }
                    if (!_sku_cfg.detail.isDownShelf && _defaultModel.inventoryDO && _defaultModel.inventoryDO.totalQuantity == 0) {
                        _kissy.cfg("detail").isDownFe = true
                    }
                    var _trade = _defaultModel.gatewayDO.trade;
                    if (_trade) {
                        _sku_cfg.addToCartParames = _trade.addToCart;
                        if ("umpkey" in _trade.addToCart) {
                            _sku_cfg.isTmallComboSupport = false
                        }
                    }
                } else {
                    var O = _kissy.getUrlParams("key");
                    var N = O ? true : false;
                    _defaultModel = { itemPriceResultDO: { priceInfo: {}, promType: O ? 1 : 0 }, userInfoDO: {}, miscDO: {}, gatewayDO: {} };
                    _kissy.mix(_defaultModel, _sku_cfg.noSkipMode, true);
                    var M = _kissy.getUrlParams("campaignId");
                    if (M) {
                        _defaultModel.itemPriceResultDO.campaignInfo = {};
                        _defaultModel.itemPriceResultDO.campaignInfo.campaignId = M
                    }
                    if (N) {
                        _defaultModel.tradeResult.cartEnable = false
                    }
                    _kissy.cfg("detailMode", "skipError")
                }
                _population_cfg(_defaultModel);
                _kissy.log("TMLOG::detailMode:" + _kissy.cfg("detailMode"), "info");
                _defaultModel.isSuccess = _defaultModelObject.isSuccess;
                _global_defaultModel = _defaultModel
            }, 12)
        }
        _createAsyn_wrapper(function () {
            _success_callback_fn && _success_callback_fn(_global_defaultModel)
        }, _state)
    }, onPriceInfo: function (_areaObj, M, _state) {
        _areaObj = _areaObj || {};
        _malldetail_data_data.onModel(function (_defaultModelObject) {
            var _itemPriceResultDO = _defaultModelObject.itemPriceResultDO;
            if (_areaObj.areaId && _itemPriceResultDO && _areaObj.areaId != _itemPriceResultDO.areaId) {
                _malldetail_data_data.onLocationModel(_areaObj.areaId, function (P) {
                    M && M((P && P.itemPriceResultDO && P.itemPriceResultDO.priceInfo) || (_itemPriceResultDO && _itemPriceResultDO.priceInfo))
                });
                return
            }
            M && M(_itemPriceResultDO && _itemPriceResultDO.priceInfo)
        }, _state)
    }, onLocationModel: function (L, M, K) {
        if (!_malldetail_data_data.locLM) {
            _malldetail_data_data.locLM = {}
        }
        if (!_malldetail_data_data.locCM) {
            _malldetail_data_data.locCM = {}
        }
        _malldetail_data_data.locLM[L] = _malldetail_data_data.locLM[L] || _malldetail_common_util.createLoader(function (N) {
            _malldetail_data_data.locCM[L] = _malldetail_data_data.locCM[L] ? _malldetail_data_data.locCM[L](N) : N
        });
        _malldetail_data_data.locLM[L](M, K)
    }, setLocationModel: function (L, K) {
        if (!_malldetail_data_data.locLM) {
            _malldetail_data_data.locLM = {}
        }
        if (!_malldetail_data_data.locCM) {
            _malldetail_data_data.locCM = {}
        }
        _malldetail_data_data.locCM[L] = _malldetail_data_data.locCM[L] ? _malldetail_data_data.locCM[L](K || {}) : function (M) {
            (typeof M == "function") && M(K || {})
        }
    }, onReviewCount: _malldetail_common_util.createLoader(function (_filter_pipeline_dry_fn) {
        var _cfg = _kissy.cfg();
        var _url, _data = {};
        var _itemDO = _cfg.itemDO;
        if (_cfg.detail.dsrFromCounterEnable) {
            var M = "IM_102_im-" + _itemDO.itemId + ",IRT_104_irt-" + _itemDO.itemId;
            if (_cfg.isDaily) {
                _url = "http://count.config-vip.taobao.net:8888/counter7?keys=" + M
            } else {
                _url = "http://ratecount.tbcdn.cn/counter7?keys=" + M
            }
        } else {
            _url = _cfg.url.rate + "/Merchant/Detail/ListDsrInfo";
            _data = { itemId: _itemDO.itemId, spuId: _itemDO.spuId, sellerId: _itemDO.userId }
        }
        _ajax({ url: _url, data: _data, dataType: "jsonp", success: function (_results) {
            var _assemblyObject = {};
            if (_results.dsr) {
                _assemblyObject.grade = _results.dsr.gradeAvg;
                _assemblyObject.rateTotal = _results.dsr.rateTotal
            } else {
                var _itemid = _cfg.itemDO.itemId;
                _assemblyObject.grade = _results["IM_102_im-" + _itemid];
                _assemblyObject.rateTotal = _results["IRT_104_irt-" + _itemid]
            }
            _assemblyObject.gradeAvg = (_assemblyObject.grade + "").length > 2 ? (_assemblyObject.grade + "").substr(0, 3) : (_assemblyObject.grade + "");
            _filter_pipeline_dry_fn(_assemblyObject)
        } 
        })
    }), onSalesCount: _malldetail_common_util.createLoader(function (_filter_pipeline_dry_fn) {
        _kissy.use("dom", function (_kissy_L, _dom_N) {
            var _monSalesNum, _dom_class_J_MonSalesNum = _dom_N.get("#detail em.J_MonSalesNum");
            if (_dom_class_J_MonSalesNum && (_monSalesNum = _dom_class_J_MonSalesNum.innerHTML) && !(/[0\s]*/.test(_monSalesNum))) {
                _filter_pipeline_dry_fn({ monTotal: _monSalesNum });
                return
            }
            _monSalesNum = _kissy_L.cfg("valSaleNum");
            if (_kissy_L.isUndefined(_monSalesNum)) {
                _kissy_L.on("data:saleNum:success", _filter_pipeline_dry_fn)
            } else {
                _filter_pipeline_dry_fn({ monTotal: _monSalesNum })
            }
        })
    })
    };
    return _malldetail_data_data
}, { requires: ["ajax", "malldetail/common/util"] });