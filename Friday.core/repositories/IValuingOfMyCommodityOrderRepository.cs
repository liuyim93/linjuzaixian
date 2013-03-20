using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IValuingOfMyCommodityOrderRepository : IRepository<ValuingOfMyCommodityOrder>
    {
        IList<ValuingOfMyCommodityOrder> GetValuingOfMyCommodityOrderByCommodityID(string commodityID);
        IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList);
        IList<ValuingOfMyCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
