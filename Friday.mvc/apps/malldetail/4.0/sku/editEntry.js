KISSY.add("malldetail/sku/editEntry", function (B, E) {
    var C = KISSY, D = C.DOM;
    function A(K) {
        var I = C.get("#J_EditItem");
        var G = K.userInfoDO;
        var H = B.cfg();
        var M = [];
        var L = H.detail;
        var J = H.itemDO;
        var N = H.tag;
        var F = H.url;
        if (!I) {
            return
        }
        if (G.loginUserType == "seller") {
            if (L.canEditInItemDet) {
                if (J.isBidden) {
                    if (J.isInRepository) {
                        M.push('<a href="{{url.topUploadServerBaseUrl}}/auction/publish/edit.htm?item_num_id={{itemDO.itemId}}&auto={{itemDO.isAutoConsignment}}" target="_blank">\u7f16\u8f91</a>')
                    } else {
                        if (J.isAutoConsignment && J.auctionType == "b") {
                            M.push('<a href="{{url.topUploadServerBaseUrl}}/auction/goods/auto_edit.jhtml?id={{itemDO.itemId}}&auction_id={{itemDO.itemId}}" target="_blank" {{#if !detail.isAutoccUser}} onClick="alert(\'\u60a8\u7684\u81ea\u52a8\u53d1\u552e\u6743\u9650\u5df2\u88ab\u53d6\u6d88\uff0c\u4e0d\u80fd\u7f16\u8f91\u5df2\u6709\u51fa\u4ef7\u7684\u81ea\u52a8\u53d1\u552e\u5546\u54c1\'); return false;"{{/if}}>\u7f16\u8f91</a>')
                        } else {
                            M.push('<a href="{{url.topUploadServerBaseUrl}}/auction/publish/edit.htm?item_num_id={{itemDO.itemId}}&auto={{itemDO.isAutoConsignment}}" target="_blank">\u7f16\u8f91</a>')
                        }
                    }
                } else {
                    M.push('<a href="{{url.topUploadServerBaseUrl}}/auction/publish/edit.htm?item_num_id={{itemDO.itemId}}&auto={{itemDO.isAutoConsignment}}" target="_blank" {{#if itemDO.isAutoConsignment && itemDO.auctionType == "a" && !detail.isAutoccUser}} onClick="return confirm(\'\u60a8\u7684\u81ea\u52a8\u53d1\u552e\u6743\u9650\u5df2\u88ab\u53d6\u6d88\n\u5982\u8981\u7ee7\u7eed\u7f16\u8f91\uff0c\u5efa\u8bae\u4e8b\u5148\u5907\u4efd\u597d\u5361\u5bc6\uff0c\u5426\u5219\u5c06\u4e22\u5931\');"{{/if}}>\u7f16\u8f91</a>')
                }
            }
            if (L.isShowPreClosed) {
                if (L.goNewAuctionFlow) {
                    M.push('<a href="{{url.BIDRedirectionitemDomain}}/close_auction.htm?item_id={{itemDO.itemId}}">\u63d0\u524d\u6210\u4ea4</a>')
                } else {
                    M.push('<a href="{{url.tradeBaseUrl}}/close_auction.htm?auction_id={{itemDO.itemId}}">\u63d0\u524d\u6210\u4ea4</a>')
                }
            }
            if (C.get("#J_GoodsErrorSeller")) {
                D.removeClass("#J_GoodsErrorSeller", "tb-hidden")
            }
        } else {
            if (G.loginUserType == "xiaoer") {
                M.push('<a href="http://mckinley.admin.taobao.org/mckinley/auction/commodity/listAuction.htm?auction_id={{itemDO.itemId}}" target="_blank">\u5546\u54c1\u5904\u7406</a>');
                if (C.get("#J_GoodsErrorOther")) {
                    D.removeClass("#J_GoodsErrorOther", "tb-hidden")
                }
            } else {
                if (L.isAllowReport && !N.isMedical) {
                    if (!window.g_config.D950) {
                        M.push('\u4e3e\u62a5\u6b64\u5546\u54c1(<a href="http://archer.taobao.com/myservice/report/entry.htm?auction_num_id={{itemDO.itemId}}&display_type=3" target="_blank">\u4e3e\u62a5</a>)')
                    } else {
                        M.push('<a href="http://archer.taobao.com/myservice/report/entry.htm?auction_num_id={{itemDO.itemId}}&display_type=3" target="_blank">\u4e3e\u62a5</a>')
                    }
                }
                if (C.get("#J_GoodsErrorOther")) {
                    D.removeClass("#J_GoodsErrorOther", "tb-hidden")
                }
            }
        }
        if (M.length) {
            I.innerHTML = E(M.join(" | ")).render({ url: F, tag: N, itemDO: J, detail: L })
        }
    }
    return { init: function (F) {
        A(F)
    } 
    }
}, { requires: ["template"] }); /*pub-1|2013-01-25 14:16:02*/