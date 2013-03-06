using System;
using friday.core.domain;
using friday.core.components;
namespace friday.core.repositories
{
    public interface IShopStatisticRepository:IRepository<ShopStatistic>
    {

        System.Collections.Generic.IList<ShopStatistic> Search(System.Collections.Generic.List<DataFilter> termList);
        System.Collections.Generic.IList<ShopStatistic> Search(System.Collections.Generic.List<DataFilter> termList, int start, int limit, out long total);
    }
}
