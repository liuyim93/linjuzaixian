using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IValuingOfMyHouseOrderService
    {
        IList<ValuingOfMyHouseOrder> GetValuingOfMyHouseOrderByHouseID(string houseID);
        ValuingOfMyHouseOrder Load(string id);
        void Save(ValuingOfMyHouseOrder valuingOfMyHouseOrder);
        void Update(ValuingOfMyHouseOrder valuingOfMyHouseOrder);
        void Delete(string id);
        IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList);
        IList<ValuingOfMyHouseOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
