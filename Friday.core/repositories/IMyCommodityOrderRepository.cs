using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IMyCommodityOrderRepository : IRepository<MyCommodityOrder>
    {
        List<MyCommodityOrder> geMyCommodityOrdersBySystemUserID(string SystemUserID);
        IList<MyCommodityOrder> Search(List<DataFilter> termList);
        IList<MyCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
