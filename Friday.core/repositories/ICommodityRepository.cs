using System;
using friday.core.domain;
using friday.core.components;
using System.Collections.Generic;
namespace friday.core.repositories
{
    public interface ICommodityRepository:IRepository<Commodity>
    {
        IList<Commodity> GetHotCommodity(int num);
        IList<Commodity> GetRecentCommodity(int num);
        IList<Commodity> GetHotRecommendCommoditiesByKeyWord(string keyword);
        IList<Commodity> GetCommodityByShopIDOrderByMonthAmountDesc(string shopID);
        System.Collections.Generic.IList<Commodity> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<Commodity> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string goodTypeId, string orderType, int start, int limit, out int total);
        IList<Commodity> GetCommodityByShopIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string shopID, string merchantGoodTypeID, int start, int limit, out int total);
        IList<Commodity> GetCommodityByKeywordAndPrice(string page, string keyword, double price1, double price2, int start, int limit, out int total, string cat);
        int GetCommodityCountByFamily(string ParentID);
        List<Commodity> GetCommodityByGoodsType(string goodsTypeId);
    }
}
