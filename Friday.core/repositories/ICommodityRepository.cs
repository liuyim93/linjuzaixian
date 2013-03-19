using System;
using friday.core.domain;
using friday.core.components;
using System.Collections.Generic;
namespace friday.core.repositories
{
    public interface ICommodityRepository:IRepository<Commodity>
    {
        IList<Commodity> GetCommodityByShopIDOrderByMonthAmountDesc(string shopID);
        System.Collections.Generic.IList<Commodity> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<Commodity> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType);
        IList<Commodity> GetCommodityByShopIDAndKeywordAndBetweenPriceOrderBy(string shopID, string keyword, double price1, double price2, string orderType, int start, int limit, out int total);
  
    }
}
