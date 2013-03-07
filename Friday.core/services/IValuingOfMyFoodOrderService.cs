using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using friday.core.components;

namespace friday.core.services
{
    public interface IValuingOfMyFoodOrderService
    {
        ValuingOfMyFoodOrder Load(string id);
        void Save(ValuingOfMyFoodOrder valuingOfMyFoodOrder);
        void Update(ValuingOfMyFoodOrder valuingOfMyFoodOrder);
        void Delete(string id);
        IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList);
        IList<ValuingOfMyFoodOrder> Search(List<DataFilter> termList, int start, int limit, out long total);
    }
}
