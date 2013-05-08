using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface ICommodityService
    {
        IList<Commodity> GetCommodityByShopIDOrderByMonthAmountDesc(string shopID);
        Commodity Load(string id);
        void Save(Commodity commodity);
        void Update(Commodity commodity);
        void Delete(string id);
        IList<Commodity> Search(List<DataFilter> termList);
        IList<Commodity> Search(List<DataFilter> termList, int start, int limit, out long total);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string goodTypeId, string orderType, int start, int limit, out int total);
        IList<Commodity> GetCommodityByShopIDAndMerchantGoodsTypeIDOrderByMonthAmountDesc(string shopID, string merchantGoodTypeID, int start, int limit, out int total);
        IList<Commodity> GetCommodityByKeywordAndPrice(string page, string keyword, double price1, double price2, int start, int limit, out int total);
        IList<Commodity> GetHotCommodity(int num);
        IList<Commodity> GetRecentCommodity(int num);
        IList<Commodity> GetHotRecommendCommoditiesByKeyWord(string keyword);
    }
}
