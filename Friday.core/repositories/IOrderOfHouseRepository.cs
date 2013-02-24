using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IOrderOfHouseRepository : IRepository<OrderOfHouse>
    {
        IList<OrderOfHouse> Search(List<DataFilter> termList);
        IList<OrderOfHouse> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
