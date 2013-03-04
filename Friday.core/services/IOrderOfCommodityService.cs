using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IOrderOfCommodityService
    {
        OrderOfCommodity Load(string id);
        void Save(OrderOfCommodity orderOfCommodity);
        void Update(OrderOfCommodity orderOfCommodity);
        void Delete(string id);
        IList<OrderOfCommodity> Search(List<DataFilter> termList);
        IList<OrderOfCommodity> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
