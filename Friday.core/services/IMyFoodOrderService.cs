using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IMyFoodOrderService
    {
        MyFoodOrder Load(string id);
        void Save(MyFoodOrder myFoodOrder);
        void Update(MyFoodOrder myFoodOrder);
        void Delete(string id);
        IList<MyFoodOrder> Search(List<DataFilter> termList);
        IList<MyFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
