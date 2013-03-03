using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.domain;
using friday.core.components;

namespace friday.core.services
{
    public interface IOrderOfFoodService
    {
        OrderOfFood Load(string id);
        void Save(OrderOfFood orderOfFood);
        void Update(OrderOfFood orderOfFood);
        void Delete(string id);
        IList<OrderOfFood> Search(List<DataFilter> termList);
        IList<OrderOfFood> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
