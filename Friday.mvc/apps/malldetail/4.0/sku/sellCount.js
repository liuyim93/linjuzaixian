
KISSY.add("malldetail/sku/sellCount", function (_kissy_imp, _dom) {
    var _cfg;
    function _init(_sellCountDO) {
        if (!_sellCountDO) {
            return
        }
        _cfg = _kissy_imp.cfg();
        if (typeof _sellCountDO.sellCount != "undefined" && _sellCountDO.sellCount != null) {
            var _sellCount = _sellCountDO.sellCount;
            _kissy_imp.cfg("valSaleNum", _sellCount);
            _kissy_imp.fire("data:saleNum:success", { monTotal: _sellCount });
            _kissy_imp.ready(function (I) {
                var J = I.get("#J_listBuyerOnView");
                if (J) {
                    var H = _dom.attr(J, "detail:params").split(",")[0];
                    if (_dom.attr(J, "data-checkSoldNum")) {
                        if (_sellCount > 0) {
                            H += "&sold_total_num=" + _sellCount
                        } else {
                            _cfg.isLoadDealRecord = false
                        }
                    } else {
                        H += "&sold_total_num=" + _sellCount
                    }
                    _dom.attr(J, "detail:params", H)
                }
            });
            var E = _dom.get(".J_MonSalesNum", "#detail");
            if (E) {
                _kissy_imp.use("malldetail/data/data", function (I, H) {
                    H.onSalesCount(function (J) {
                        E.innerHTML = J.monTotal;
                        _dom.show(".J_MonSales")
                    })
                })
            }
        }
    }
    return { init: _init }
}, { requires: ["dom"] }); /*pub-1|2013-01-06 16:13:22*/