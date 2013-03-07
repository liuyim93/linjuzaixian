using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.repositories
{
    public interface IValuingOfMyFoodOrderRepository : IRepository<ValuingOfMyFoodOrder>
    {
        IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList);
        IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
