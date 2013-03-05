using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface ICommodityStatisticService
    {
        CommodityStatistic Load(string id);
        void Save(CommodityStatistic commodityStatistic);
        void Update(CommodityStatistic commodityStatistic);
        void Delete(string id);

        IList<CommodityStatistic> Search(List<DataFilter> termList);
        IList<CommodityStatistic> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
