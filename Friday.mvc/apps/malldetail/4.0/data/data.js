KISSY.add("malldetail/data/data", function (_kissy, _ajax, _malldetail_common_util) {
    var _iterator_queue_fn_wrapper, _time, _createAsyn_wrapper, _global_defaultModel,
        _loader_fn = _malldetail_common_util.createLoader(
               function (_iterator_queue) {
                 _iterator_queue_fn_wrapper = _iterator_queue_fn_wrapper ? _iterator_queue_fn_wrapper(_iterator_queue) : _iterator_queue
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
    var _malldetail_data_data = { setMdskip: function (_defaultModelObject, _num_i_dont_konw) {
        if (_num_i_dont_konw >= 0) {
            if (_defaultModelObject) {
                _kissy.sendAcAtpanel("tmalldetail.15.1", { tl: _num_i_dont_konw })
            } else {
                _kissy.sendErr("mdskipTimeout", { tl: _num_i_dont_konw })
            }
        }
        _iterator_queue_fn_wrapper = _iterator_queue_fn_wrapper ? _iterator_queue_fn_wrapper(_defaultModelObject || {}) : function (_iterator_queue_fn) {
            _iterator_queue_fn(_defaultModelObject || {})
        }
    }, onMdskip: _loader_fn, setMdskipTimeout: function (K) {
        _time = K
    }, onModel: function (_success_callback_fn, _num_dont_know) {
        if (!_createAsyn_wrapper) {
            _createAsyn_wrapper = _malldetail_common_util.createAsyn(_loader_fn, _time || 3000);
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
                    var R = _defaultModel.gatewayDO.trade;
                    if (R) {
                        _sku_cfg.addToCartParames = R.addToCart;
                        if ("umpkey" in R.addToCart) {
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
        }, _num_dont_know)
    }, onPriceInfo: function (K, M, L) {
        K = K || {};
        _malldetail_data_data.onModel(function (N) {
            var O = N.itemPriceResultDO;
            if (K.areaId && O && K.areaId != O.areaId) {
                _malldetail_data_data.onLocationModel(K.areaId, function (P) {
                    M && M((P && P.itemPriceResultDO && P.itemPriceResultDO.priceInfo) || (O && O.priceInfo))
                });
                return
            }
            M && M(O && O.priceInfo)
        }, L)
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
    }, onReviewCount: _malldetail_common_util.createLoader(function (P) {
        var L = _kissy.cfg();
        var K, O = {};
        var N = L.itemDO;
        if (L.detail.dsrFromCounterEnable) {
            var M = "IM_102_im-" + N.itemId + ",IRT_104_irt-" + N.itemId;
            if (L.isDaily) {
                K = "http://count.config-vip.taobao.net:8888/counter7?keys=" + M
            } else {
                K = "http://ratecount.tbcdn.cn/counter7?keys=" + M
            }
        } else {
            K = L.url.rate + "/list_dsr_info.htm";
            O = { itemId: N.itemId, spuId: N.spuId, sellerId: N.userId }
        }
        _ajax({ url: K, data: O, dataType: "jsonp", success: function (Q) {
            var S = {};
            if (Q.dsr) {
                S.grade = Q.dsr.gradeAvg;
                S.rateTotal = Q.dsr.rateTotal
            } else {
                var R = L.itemDO.itemId;
                S.grade = Q["IM_102_im-" + R];
                S.rateTotal = Q["IRT_104_irt-" + R]
            }
            S.gradeAvg = (S.grade + "").length > 2 ? (S.grade + "").substr(0, 3) : (S.grade + "");
            P(S)
        } 
        })
    }), onSalesCount: _malldetail_common_util.createLoader(function (K) {
        _kissy.use("dom", function (L, N) {
            var M, O = N.get("#detail em.J_MonSalesNum");
            if (O && (M = O.innerHTML) && !(/[0\s]*/.test(M))) {
                K({ monTotal: M });
                return
            }
            M = L.cfg("valSaleNum");
            if (L.isUndefined(M)) {
                L.on("data:saleNum:success", K)
            } else {
                K({ monTotal: M })
            }
        })
    })
    };
    return _malldetail_data_data
}, { requires: ["ajax", "malldetail/common/util"] });