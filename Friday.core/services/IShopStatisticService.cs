using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IShopStatisticService
    {
        ShopStatistic Load(string id);
        void Save(ShopStatistic shopStatistic);
        void Update(ShopStatistic shopStatistic);
        void Delete(string id);
        IList<ShopStatistic> Search(List<DataFilter> termList);
        IList<ShopStatistic> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
