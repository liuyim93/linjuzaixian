using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IOrderOfCommodityRepository : IRepository<OrderOfCommodity>
    {
        List<OrderOfCommodity> geOrderOfCommoditysByMyCommodityOrderID(string MyCommodityOrderID);
        IList<OrderOfCommodity> Search(List<DataFilter> termList);
        IList<OrderOfCommodity> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
