using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IValuingOfMyHouseOrderRepository : IRepository<ValuingOfMyHouseOrder>
    {
        IList<ValuingOfMyHouseOrder> GetValuingOfMyHouseOrderByHouseID(string houseID);
        IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList);
        IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
