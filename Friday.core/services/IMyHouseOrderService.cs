using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IMyHouseOrderService
    {
        MyHouseOrder Load(string id);
        void Save(MyHouseOrder myHouseOrder);
        void Update(MyHouseOrder myHouseOrder);
        void Delete(string id);
        IList<MyHouseOrder> Search(List<DataFilter> termList);
        IList<MyHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
