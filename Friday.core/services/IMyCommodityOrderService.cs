using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;
using friday.core.domain;

namespace friday.core.services
{
    public interface IMyCommodityOrderService
    {
        List<MyCommodityOrder> geMyCommodityOrdersBySystemUserID(string SystemUserID);
        MyCommodityOrder Load(string id);
        void Save(MyCommodityOrder myCommodityOrder);
        void Update(MyCommodityOrder myCommodityOrder);
        void Delete(string id);
        IList<MyCommodityOrder> Search(List<DataFilter> termList);
        IList<MyCommodityOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
