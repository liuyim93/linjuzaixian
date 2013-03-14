KISSY.add("malldetail/data/data", function (D, C, I) {
    var B, G, J, F, E = I.createLoader(function (K) {
        B = B ? B(K) : K
    });
    function A(N) {
        var K = D.cfg(), L = N.itemPriceResultDO || {};
        var M = N.tradeResult;
        if (L.areaId) {
            K.destination = L.areaId
        }
        K.meizDO = N.meizDO;
        K.itemPriceResultDO = L;
        if (L && L.campaignInfo && L.campaignInfo.campaignId) {
            K.varPromotionId = L.campaignInfo.campaignId
        }
        if (M.cartEnable && M.cartType == 2 && (!(K.valMode & 2048))) {
            K.valMode += 2048
        }
        K.tradeType = M.tradeType;
        K.apparelDO = N.apparelDO;
        K.userInfoDO = N.userInfoDO;
        K.systemTime = N.miscDO["systemTime"];
        K.is1111 = (K.systemTime >= 1352563200000 && K.systemTime < 1352649600000)
    }
    var H = { setMdskip: function (L, K) {
        if (K >= 0) {
            if (L) {
                D.sendAcAtpanel("tmalldetail.15.1", { tl: K })
            } else {
                D.sendErr("mdskipTimeout", { tl: K })
            }
        }
        B = B ? B(L || {}) : function (M) {
            M(L || {})
        }
    }, onMdskip: E, setMdskipTimeout: function (K) {
        G = K
    }, onModel: function (L, K) {
        if (!J) {
            J = I.createAsyn(E, G || 3000);
            J(function (Q) {
                Q = Q || {};
                var S, P = D.cfg();
                if (Q.isSuccess) {
                    S = Q.defaultModel;
                    if (S.tradeResult) {
                        if (D.isUndefined(S.tradeResult.tradeType) || S.tradeResult.tradeType == null) {
                            S.tradeResult.tradeType = P.tradeType
                        }
                    }
                    if (D.cfg("detailMode") == "skipError") {
                        D.cfg("detailMode", "skipOkAfterError")
                    } else {
                        D.cfg("detailMode", "skipOk")
                    }
                    if (!P.detail.isDownShelf && S.inventoryDO && S.inventoryDO.totalQuantity == 0) {
                        D.cfg("detail").isDownFe = true
                    }
                    var R = S.gatewayDO.trade;
                    if (R) {
                        P.addToCartParames = R.addToCart;
                        if ("umpkey" in R.addToCart) {
                            P.isTmallComboSupport = false
                        }
                    }
                } else {
                    var O = D.getUrlParams("key");
                    var N = O ? true : false;
                    S = { itemPriceResultDO: { priceInfo: {}, promType: O ? 1 : 0 }, userInfoDO: {}, miscDO: {}, gatewayDO: {} };
                    D.mix(S, P.noSkipMode, true);
                    var M = D.getUrlParams("campaignId");
                    if (M) {
                        S.itemPriceResultDO.campaignInfo = {};
                        S.itemPriceResultDO.campaignInfo.campaignId = M
                    }
                    if (N) {
                        S.tradeResult.cartEnable = false
                    }
                    D.cfg("detailMode", "skipError")
                }
                A(S);
                D.log("TMLOG::detailMode:" + D.cfg("detailMode"), "info");
                S.isSuccess = Q.isSuccess;
                F = S
            }, 12)
        }
        J(function () {
            L && L(F)
        }, K)
    }, onPriceInfo: function (K, M, L) {
        K = K || {};
        H.onModel(function (N) {
            var O = N.itemPriceResultDO;
            if (K.areaId && O && K.areaId != O.areaId) {
                H.onLocationModel(K.areaId, function (P) {
                    M && M((P && P.itemPriceResultDO && P.itemPriceResultDO.priceInfo) || (O && O.priceInfo))
                });
                return
            }
            M && M(O && O.priceInfo)
        }, L)
    }, onLocationModel: function (L, M, K) {
        if (!H.locLM) {
            H.locLM = {}
        }
        if (!H.locCM) {
            H.locCM = {}
        }
        H.locLM[L] = H.locLM[L] || I.createLoader(function (N) {
            H.locCM[L] = H.locCM[L] ? H.locCM[L](N) : N
        });
        H.locLM[L](M, K)
    }, setLocationModel: function (L, K) {
        if (!H.locLM) {
            H.locLM = {}
        }
        if (!H.locCM) {
            H.locCM = {}
        }
        H.locCM[L] = H.locCM[L] ? H.locCM[L](K || {}) : function (M) {
            (typeof M == "function") && M(K || {})
        }
    }, onReviewCount: I.createLoader(function (P) {
        var L = D.cfg();
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
        C({ url: K, data: O, dataType: "jsonp", success: function (Q) {
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
    }), onSalesCount: I.createLoader(function (K) {
        D.use("dom", function (L, N) {
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
    return H
}, { requires: ["ajax", "malldetail/common/util"] });