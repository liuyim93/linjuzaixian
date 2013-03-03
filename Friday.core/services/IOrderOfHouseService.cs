using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IOrderOfHouseService
    {
        OrderOfHouse Load(string id);
        void Save(OrderOfHouse orderOfHouse);
        void Update(OrderOfHouse orderOfHouse);
        void Delete(string id);
        IList<OrderOfHouse> Search(List<DataFilter> termList);
        IList<OrderOfHouse> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
