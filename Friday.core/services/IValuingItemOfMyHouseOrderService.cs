using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IValuingItemOfMyHouseOrderService
    {
        ValuingItemOfMyHouseOrder Load(string id);
        void Save(ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder);
        void Update(ValuingItemOfMyHouseOrder valuingItemOfMyHouseOrder);
        void Delete(string id);
        IList<ValuingItemOfMyHouseOrder> GetAll();
    }
}
